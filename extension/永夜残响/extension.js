game.import("extension", function(lib, game, ui, get, ai, _status) {
    // <diy-form-preview>
    // Copies stay inside each standalone expansion; the shared UI hook installs once.
    function installDiyFormPreview(groups, routes) {
        var preview = lib.diyFormPreview;
        if(!preview) {
            preview = lib.diyFormPreview = { groups: Object.create(null) };
        }
        groups.forEach(function(group) {
            group.forEach(function(id) { preview.groups[id] = group.slice(); });
        });
        preview.routes = preview.routes || Object.create(null);
        Object.assign(preview.routes, routes || {});
        if(preview.installed) return;
        var createCharacter = ui.create.buttonPresets.character;
        var characterCard = ui.click.charactercard;
        preview.installed = true;
        preview.forms = function(id) {
            return (preview.groups[id] || []).filter(function(name) {
                return !!lib.character[name] || Object.keys(lib.characterPack).some(function(pack) {
                    return !!lib.characterPack[pack][name];
                });
            });
        };
        function listen(button, action) {
            button.setAttribute('role', 'button');
            button.tabIndex = 0;
            function activate(event) {
                event.preventDefault();
                event.stopPropagation();
                ui.click.touchpop();
                action();
            }
            button.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', activate);
            button.addEventListener('keydown', function(event) {
                if(event.key === 'Enter' || event.key === ' ') activate(event);
            });
        }
        ui.create.buttonPresets.character = function() {
            var node = createCharacter.apply(this, arguments);
            var forms = node && preview.forms(node.link);
            if(!node) return node;
            var existing = node.querySelector('.diy-form-preview');
            if((!forms || forms.length < 2) && !preview.routes[node.link]) {
                if(existing) existing.remove();
                return node;
            }
            if(existing) return node;
            var button = ui.create.div('.button.replaceButton.diy-form-preview', node);
            button.textContent = preview.routes[node.link] ? '武器预览' : '形态预览';
            Object.assign(button.style, { width: 'auto', padding: '0 5px', fontSize: '13px' });
            listen(button, function() {
                var list = preview.forms(node.link);
                if(preview.routes[node.link]) {
                    ui.click.charactercard(node.link, null, true);
                } else if(list.length > 1) {
                    ui.click.charactercard(list[(list.indexOf(node.link) + 1) % list.length], null, true);
                }
            });
            return node;
        };
        ui.click.charactercard = function(name, source, noedit, resume) {
            var previous = ui.window.lastElementChild;
            var result = characterCard.apply(this, arguments);
            var layer = ui.window.lastElementChild;
            var forms = preview.forms(name);
            var routes = preview.routes[name];
            if(layer === previous || !layer || (forms.length < 2 && !routes)) return result;
            var panel = layer.querySelector('.charactercard');
            if(!panel) return result;
            var portrait = panel.querySelector('.ava');
            if(!portrait) return result;
            var button = ui.create.div('.menubutton.large.diy-form-preview', portrait);
            button.textContent = routes ? '切换预览武器' : '切换预览形态';
            Object.assign(button.style, { position: 'absolute', left: '0', bottom: '0', width: '100%', height: '30px', lineHeight: '30px', margin: '0', fontSize: '16px', zIndex: '3' });
            var caption = ui.create.div('.diy-form-preview-caption', portrait);
            caption.textContent = name === forms[0] ? '初始形态' : '转化形态，无法直接开局';
            Object.assign(caption.style, { position: 'absolute', left: '0', bottom: '34px', width: '100%', textAlign: 'center', fontSize: '13px', lineHeight: '22px', color: '#fff', background: 'rgba(0,0,0,0.65)', pointerEvents: 'none', zIndex: '3' });
            if(routes && routes.length) {
                var index = 0;
                var skills = panel.querySelector('.characterskill');
                var intro = panel.querySelector('.intro2');
                var routeButton = skills && ui.create.div('.menubutton.large.diy-weapon-route', skills);
                if(routeButton) skills.prepend(routeButton);
                function showRoute() {
                    var route = routes[index];
                    (portrait.querySelector('.avatar') || portrait).setBackgroundImage('extension/轮回遗梦/' + route.image);
                    caption.textContent = route.name + '预览，开局仍需选剑';
                    if(routeButton) routeButton.textContent = route.name + '专属与路线';
                    if(intro) {
                        if(skills) {
                            var active = skills.querySelector('.active');
                            if(active) active.classList.remove('active');
                        }
                        if(routeButton) routeButton.classList.add('active');
                        intro.innerHTML = route.content();
                        intro.scrollTop = 0;
                    }
                }
                if(routeButton) listen(routeButton, showRoute);
                listen(button, function() {
                    index = (index + 1) % routes.length;
                    showRoute();
                });
                showRoute();
                return result;
            }
            listen(button, function() {
                var next = forms[(forms.indexOf(name) + 1) % forms.length];
                // Only the independent detail panel changes. The source card,
                // selection IDs, player and skin settings are never passed in.
                var oldLayer = ui.window.lastElementChild;
                ui.click.charactercard(next, null, true, resume);
                if(ui.window.lastElementChild !== oldLayer) layer.remove();
            });
            return result;
        };
    }
    // </diy-form-preview>
    // One manager owns both forms; all nested feather operations finish before switching.
    const oz = lib.yongYeZheZhiHelpers = {
        light: 'zheZhiGuangYu', dark: 'zheZhiHeiYu',
        normal: p => [p.name, p.name1, p.name2].includes('yuanYiZheZhi'),
        inverse: p => [p.name, p.name1, p.name2].includes('fanZhuanZheZhi'),
        count: (p, mark) => p.countZhiShiWu(mark),
        players: () => game.players.filter(p => p.isIn()),
        limit(p, mark) {
            if(mark === this.light) return this.normal(p) || this.inverse(p) ? (p.storage.ozLightMax ?? 4) : 2;
            return this.inverse(p) ? (p.storage.ozDarkMax ?? 8) : 8;
        },
        room(p, mark) { return p.isIn() && this.count(p, mark) < this.limit(p, mark); },
        sync(p, key, value) {
            p.storage[key] = value;
            p.syncStorage(key);
            p.update();
            if(key === 'ozLightMax') this.keepLightMark(p);
        },
        keepLightMark(p) {
            if(this.normal(p) && typeof p.markSkill === 'function') p.markSkill(this.light);
        },
        play(p, form, file) {
            if(!p || !file || !lib.config || !lib.config.background_audio) return;
            const path = 'ext:永夜残响/audio/skill/' + form + '/' + file;
            game.broadcastAll(function(audioPath, speaker) {
                if(!lib.config || !lib.config.background_audio) return;
                game.playAudio({
                    path: audioPath,
                    spatialPlayer: speaker,
                    addVideo: false,
                    onError: function() {},
                });
            }, path, p);
        },
        async add(p, mark, n) {
            n = Math.min(n, Math.max(0, this.limit(p, mark) - this.count(p, mark)));
            if(n > 0) await p.addZhiShiWu(mark, n, true);
        },
        async move(from, to, mark) {
            if(!from?.isIn() || !to?.isIn() || from === to || !this.count(from, mark) || !this.room(to, mark)) return false;
            const before = this.count(to, mark);
            await this.add(to, mark, 1);
            if(this.count(to, mark) <= before) return false;
            await from.removeZhiShiWu(mark, 1);
            if(mark === this.light) this.keepLightMark(from);
            return true;
        },
        async choose(p, prompt, candidates, score, optional) {
            if(!candidates.length) return null;

            const ids=candidates
                .filter(function(target){return target&&target.isIn();})
                .map(function(target){return target.playerid;});
            if(!ids.length) return null;

            const scoreMap={};
            for(const target of candidates) {
                if(!target||!target.isIn()||!target.playerid) continue;
                let value=0;
                try {
                    value=typeof score==='function' ? score(target) : 0;
                } catch(err) {}
                scoreMap[target.playerid]=
                    typeof value==='number'&&isFinite(value) ? value : 0;
            }

            const targets=(await p.chooseTarget(
                prompt,
                !optional,
                function(card,player,target) {
                    var ids=_status.event.ozCandidateIds||[];
                    return !!target&&ids.indexOf(target.playerid)!==-1;
                }
            )
            .set('ozCandidateIds',ids)
            .set('ozScoreMap',scoreMap)
            .set('ai',function(target) {
                var map=_status.event.ozScoreMap||{};
                if(!target||!target.playerid) return 0;
                var value=map[target.playerid];
                return typeof value==='number' ? value : 0;
            })
            .forResultTargets() || []);

            return targets&&targets.length ? targets[0] : null;
        },
        damageScore(p, t, n) {
            if(!t?.isIn()) return 0;
            n += this.inverse(p) ? 1 : 0;
            n += this.inverse(t) ? 1 : 0;
            const raw = Math.max(0, n - (t.zhiLiao || 0));
            return (t.side === p.side ? -1 : 1) * (raw + Math.max(0, t.countCards('h') + raw - t.getHandcardLimit()) + 0.2 * Math.min(n, t.zhiLiao || 0));
        },
        async hit(p,t,n) {
            // Core stops a zero-damage event before source modifiers can run.
            // Seed only our own +1 in that case and suppress its duplicate trigger.
            const seeded = n === 0 && this.inverse(p);
            const next = t.faShuDamage(seeded ? 1 : n,p,'nocard');
            if(seeded) next.ozSourceApplied = true;
            await next;
        },
        deployScore(p, t) { return (t.side !== p.side ? 2 : -2) + this.count(t, this.light) * 0.7; },
        async batch(p, fn) {
            p.storage.ozDepth = (p.storage.ozDepth || 0) + 1;
            try { return await fn(); }
            finally {
                p.storage.ozDepth--;
                if(!p.storage.ozDepth) await this.settle(p);
            }
        },
        async collect(p, mark) {
            const rows = this.players().filter(t => t !== p).sortBySeat(p)
                .map(t => ({target:t, num:this.count(t, mark)})).filter(r => r.num > 0);
            for(const r of rows) await r.target.removeZhiShiWu(mark, r.num);
            await this.add(p, mark, rows.reduce((n,r) => n+r.num, 0));
            return rows;
        },
        async cannon(p) {
            const rows = await this.collect(p, this.light);
            for(const r of rows) if(r.target.isIn()) await r.target.faShuDamage(r.num, p, 'nocard');
            const target = await this.choose(p, '炮冠：选择原有2枚光羽的角色追加2点伤害',
                rows.filter(r => r.num === 2 && r.target.isIn()).map(r => r.target), t => this.damageScore(p,t,2));
            if(target?.isIn()) await target.faShuDamage(2, p, 'nocard');
        },
        async annihilate(p) {
            const rows = await this.collect(p, this.dark);
            for(const r of rows) if(r.target.isIn()) await r.target.faShuDamage(Math.ceil(r.num/2), p, 'nocard');
            const total = rows.reduce((n,r) => n+r.num, 0);
            if(p.isIn()) await this.hit(p,p,Math.ceil(total/2));
        },
        async clear(mark) {
            for(const t of [...game.players, ...(game.dead || [])]) {
                const n = this.count(t,mark);
                if(n) await t.removeZhiShiWu(mark,n);
            }
        },
        async cleanup(p) {
            p.storage.ozSwitching=true;
            try {
                await this.clear(this.dark);
                await this.clear(this.light);
            } finally {
                ['ozLightMax','ozDarkMax','ozReturn','ozDepth','ozSwitching'].forEach(k=>delete p.storage[k]);
            }
        },
        async settle(p) {
            if(!p.isIn() || p.storage.ozDepth || p.storage.ozSwitching) return;
            p.storage.ozSwitching = true;
            try {
                if(this.normal(p) && p.storage.ozLightMax === 0) {
                    p.logSkill('zheZhiPaoGuan');
                    await this.cannon(p);
                    if(!p.isIn()) return;
                    await p.reinitCharacter('yuanYiZheZhi', 'fanZhuanZheZhi');
                    this.sync(p,'ozDarkMax',8);
                    delete p.storage.ozReturn;
                    const excess = Math.max(0, (p.zhiLiao || 0) - p.getZhiLiaoLimit());
                    if(excess) await p.changeZhiLiao(-excess);
                    await this.add(p,this.dark,8);
                    this.play(p,'fanZhuanZheZhi','zheZhiFanLingZhuang.mp3');
                } else if(this.inverse(p) && (p.storage.ozReturn || this.count(p,this.dark) === 0)) {
                    p.logSkill('zheZhiYiShiHuiGui');
                    p.logSkill('zheZhiJueMie');
                    await this.annihilate(p);
                    if(!p.isIn()) return;
                    await this.clear(this.dark);
                    await this.clear(this.light);
                    this.sync(p,'ozLightMax',4);
                    await p.reinitCharacter('fanZhuanZheZhi','yuanYiZheZhi');
                    delete p.storage.ozReturn;
                    await this.add(p,this.light,4);
                    this.play(p,'fanZhuanZheZhi','zheZhiYiShiHuiGui.mp3');
                }
            } finally { delete p.storage.ozSwitching; }
        },
        blastScore(p, dark) {
            const mark = dark ? this.dark : this.light;
            const rows = this.players().filter(t => t !== p && this.count(t,mark));
            let score = rows.reduce((s,t) => s+this.damageScore(p,t,dark ? Math.ceil(this.count(t,mark)/2) : this.count(t,mark)),0);
            if(dark) score += this.damageScore(p,p,Math.ceil(rows.reduce((s,t)=>s+this.count(t,mark),0)/2));
            else {
                const choices=rows.filter(t=>this.count(t,mark)===2).map(t=>this.damageScore(p,t,2));
                if(choices.length) score+=Math.max(...choices);
            }
            return score-1.5;
        },
    };
    const origamiSkills = {
        zheZhiManager: {
            charlotte:true,manager:oz,
            trigger:{player:'dieAfter'},forced:true,forceDie:true,popup:false,
            content:async function(e,tr,p){await oz.cleanup(p);},
            onremove:function(player) {
                if(player.storage.ozSwitching || oz.normal(player) || oz.inverse(player)) return;
                const next=game.createEvent('zheZhiCleanup');
                next.player=player;
                next.setContent(async function(event,trigger,player){await oz.cleanup(player);});
            },
        },
        zheZhiGuangYu: {
            init:function(player) { oz.keepLightMark(player); },
            markimage:'extension/永夜残响/mark_zheZhiGuangYu.png',
            intro:{name:'光羽',content:(storage,p)=>'光羽：'+oz.count(p,oz.light)+'；当前上限：'+oz.limit(p,oz.light),max:p=>oz.limit(p,oz.light)},
            trigger:{source:'gongJiMingZhong'}, forced:true,
            filter:(e,p)=>!!e && oz.count(p,oz.light)>0 && oz.players().some(t=>t!==p&&oz.room(t,oz.light)),
            content:async function(e,tr,p) {
                const t=await oz.choose(p,'光羽：转移1枚并造成1点法术伤害',oz.players().filter(t=>t!==p&&oz.room(t,oz.light)),t=>oz.damageScore(p,t,1));
                if(t && await oz.move(p,t,oz.light)) {
                    if(oz.normal(p)) oz.play(p,'yuanYiZheZhi','zheZhiGuangYu.mp3');
                    await t.faShuDamage(1,p,'nocard');
                }
            },
        },
        zheZhiHeiYu: {markimage:'extension/永夜残响/mark_zheZhiHeiYu.png',intro:{name:'黑羽',content:(storage,p)=>'黑羽：'+oz.count(p,oz.dark)+'；当前上限：'+oz.limit(p,oz.dark),max:p=>oz.limit(p,oz.dark)}},
        zheZhiLimitGuard: {
            trigger:{player:'changeZhiShiWuBefore'},forced:true,popup:false,firstDo:true,priority:100,
            filter:e=>!!e && e.num>0 && [oz.light,oz.dark].includes(e.zhiShiWu),
            content:async function(e,tr,p) { tr.num=Math.min(tr.num,Math.max(0,oz.limit(p,tr.zhiShiWu)-oz.count(p,tr.zhiShiWu))); },
        },
        zheZhiLingZhuang: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiLingZhuang.mp3',
            trigger:{global:'gameStart'},forced:true,
            content:async function(e,tr,p) {
                ['zheZhiGuangYu','zheZhiHeiYu','zheZhiLimitGuard'].forEach(s=>game.addGlobalSkill(s));
                oz.sync(p,'ozLightMax',4);
                await oz.add(p,oz.light,4);
            },
        },
        zheZhiJueMieTianShi: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiJueMieTianShi.mp3',
            trigger:{player:['gongJiEnd','faShuEnd']},
            filter:(e,p)=>!!e && !e.yingZhan && get.is.xingDong(e) && oz.count(p,oz.light)>0 && oz.players().some(t=>t.side!==p.side&&oz.room(t,oz.light)),
            cost:async function(e,tr,p) {
                const candidates=oz.players().filter(function(target){
                    return target.side!==p.side&&oz.room(target,oz.light);
                });
                const ids=candidates.map(function(target){return target.playerid;});
                const scoreMap={};
                for(const target of candidates) {
                    scoreMap[target.playerid]=oz.deployScore(p,target);
                }

                e.result=await p.chooseTarget(
                    '绝灭天使：将1枚光羽放于对手面前',
                    function(card,player,target) {
                        var ids=_status.event.ozCandidateIds||[];
                        return !!target&&ids.indexOf(target.playerid)!==-1;
                    }
                )
                .set('ozCandidateIds',ids)
                .set('ozScoreMap',scoreMap)
                .set('ai',function(target) {
                    var map=_status.event.ozScoreMap||{};
                    return target&&target.playerid&&typeof map[target.playerid]==='number'
                        ? map[target.playerid] : 0;
                })
                .forResult();
            },
            content:async function(e,tr,p) { if(e.targets?.[0]) await oz.move(p,e.targets[0],oz.light); },
        },
        zheZhiJueWang: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiJueWang.mp3',
            trigger:{player:'chengShouShangHaiAfter'},forced:true,
            filter:(e,p)=>!!e && e.num>0 && oz.normal(p) && !oz.count(p,oz.light) && oz.limit(p,oz.light)>0,
            content:async function(e,tr,p) {
                oz.sync(p,'ozLightMax',Math.max(0,oz.limit(p,oz.light)-1));
                if(p.storage.ozLightMax===0) tr.ozInversion=true;
                await oz.settle(p);
            },
        },
        zheZhiGuangJian: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiGuangJian.mp3',
            type:'faShu',enable:'faShu',position:'h',selectCard:1,discard:true,
            filter:(e,p)=>p.countCards('h',c=>get.type(c)==='faShu'&&lib.filter.cardDiscardable(c,p))>0&&
                game.hasPlayer(t=>t.side!==p.side&&oz.count(t,oz.light)>0),
            filterCard:(c,p)=>get.type(c)==='faShu'&&lib.filter.cardDiscardable(c,p),
            filterTarget:function(card,player,target){
                return target.side!==player.side&&
                    target.countZhiShiWu('zheZhiGuangYu')>0;
            },
            loseTo:'discardPile',visible:true,
            content:async function(e,tr,p) {
                if(e.cards?.length) await p.showCards(e.cards,'光剑：展示费用牌');
                await oz.batch(p,async()=>{
                    const t=e.target;
                    await t.faShuDamage(oz.count(t,oz.light)===2?2:1,p,'nocard');
                    if(!t.isIn()||!oz.count(t,oz.light)) return;
                    const other=await oz.choose(p,'光剑：将目标1枚光羽移给另一对手',oz.players().filter(x=>x!==t&&x.side!==p.side&&oz.room(x,oz.light)),x=>oz.deployScore(p,x));
                    if(other) await oz.move(t,other,oz.light);
                });
            },
            check:c=>6-get.value(c),ai:{order:4,result:{target:(p,t)=>{ var oz = lib.yongYeZheZhiHelpers; return get.damageEffect(t,oz.count(t,oz.light)===2?2:1); }}},
        },
        zheZhiTianYi: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiTianYi.mp3',
            trigger:{player:'chengShouShangHai'},
            filter:(e,p)=>!!e && oz.count(p,oz.light)>0 && p.countCards('h',c=>lib.filter.cardDiscardable(c,p))>0 && oz.players().some(t=>t!==p&&t.side===p.side&&oz.room(t,oz.light)),
            cost:async function(e,tr,p) {
                const candidates=oz.players().filter(function(target){
                    return target!==p&&target.side===p.side&&oz.room(target,oz.light);
                });
                const ids=candidates.map(function(target){return target.playerid;});
                const scoreMap={};
                const selfScore=oz.damageScore(p,p,1);
                for(const target of candidates) {
                    scoreMap[target.playerid]=
                        -selfScore+oz.damageScore(p,target,1)-0.4;
                }

                e.result=await p.chooseCardTarget({
                    prompt:'天翼：弃1牌，将1光羽移给队友，伤害-1并对其造成1法术伤害',
                    position:'h',
                    selectCard:1,
                    filterCard:function(card,player) {
                        return lib.filter.cardDiscardable(card,player);
                    },
                    filterTarget:function(card,player,target) {
                        var ids=_status.event.ozCandidateIds||[];
                        return !!target&&ids.indexOf(target.playerid)!==-1;
                    },
                    ai1:function(card) {
                        return 6-get.value(card,_status.event.player);
                    },
                    ai2:function(target) {
                        var map=_status.event.ozScoreMap||{};
                        return target&&target.playerid&&typeof map[target.playerid]==='number'
                            ? map[target.playerid] : 0;
                    }
                })
                .set('ozCandidateIds',ids)
                .set('ozScoreMap',scoreMap)
                .forResult();
            },
            content:async function(e,tr,p) {
                await oz.batch(p,async()=>{
                    const t=e.targets?.[0];
                    if(!t||!oz.room(t,oz.light)||!oz.count(p,oz.light)) return;
                    await p.discard(e.cards);
                    if(await oz.move(p,t,oz.light)) {tr.changeDamageNum(-1);await t.faShuDamage(1,p,'nocard');}
                });
            },
        },
        zheZhiRiLun: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiRiLun.mp3',
            type:'faShu',enable:'faShu',selectTarget:-1,filterTarget:lib.filter.opponent,multitarget:true,multiline:true,
            filter:(e,p)=>p.canBiShaShuiJing(),
            content:async function(e,tr,p) {
                await p.removeBiShaShuiJing();
                await oz.batch(p,async()=>{
                    for(const t of e.targets.slice().sortBySeat(p)) if(t.isIn()) await t.faShuDamage(1,p,'nocard');
                    const lightCount=oz.count(p,oz.light);
                    for(let i=0;i<lightCount;i++) {
                        const t=await oz.choose(p,'日轮：分配1枚光羽',oz.players().filter(t=>t.side!==p.side&&oz.room(t,oz.light)),t=>oz.deployScore(p,t));
                        if(!t) break;
                        if(t!==p&&!await oz.move(p,t,oz.light)) break;
                    }
                });
            },
            ai:{shuiJing:true,order:4.5,result:{player:p=>{ var oz = lib.yongYeZheZhiHelpers; return oz.count(p,oz.light)*0.3-0.7; },target:(p,t)=>get.damageEffect(t,1)}},
        },
        zheZhiPaoGuan: {
            audio:'ext:永夜残响/audio/skill/yuanYiZheZhi/zheZhiPaoGuan.mp3',
            type:'faShu',enable:'faShu',selectTarget:-1,filterTarget:(c,p,t)=>p===t,
            filter:(e,p)=>!oz.count(p,oz.light)&&p.canBiShaBaoShi(),
            content:async function(e,tr,p) {await p.removeBiShaBaoShi();await oz.batch(p,()=>oz.cannon(p));},
            ai:{baoShi:true,order:5,result:{player:p=>{ var oz = lib.yongYeZheZhiHelpers; return oz.blastScore(p,false); }}},
        },
        zheZhiFanLingZhuang: {
            mod:{maxZhiLiao:(p,n)=>Math.max(0,n-2)},
            group:['zheZhiFanLingZhuang_source','zheZhiFanLingZhuang_target'],
            subSkill:{
                source:{trigger:{source:'zaoChengShangHai'},forced:true,firstDo:true,filter:e=>!e.ozSourceApplied,content:async function(e,tr){tr.changeDamageNum(1);}},
                target:{trigger:{player:'chengShouShangHaiBefore'},forced:true,firstDo:true,content:async function(e,tr){tr.changeDamageNum(1);}},
            },
        },
        zheZhiJuJue: {
            audio:'ext:永夜残响/audio/skill/fanZhuanZheZhi/zheZhiJuJue.mp3',
            trigger:{player:'chengShouShangHaiAfter'},forced:true,
            filter:(e,p)=>!!e && !e.ozInversion && e.num>0 && e.source && e.source!==p && e.source.isIn(),
            content:async function(e,tr,p) {
                await oz.batch(p,async()=>{
                    const sourceHadDark = oz.count(tr.source,oz.dark)>0;
                    await oz.move(p,tr.source,oz.dark);
                    const friend=await oz.choose(p,'拒绝：选择一名队友承接黑羽与伤害',oz.players().filter(t=>t!==p&&t.side===p.side),t=>oz.damageScore(p,t,1+(oz.count(t,oz.dark)>0?1:0)));
                    const friendHadDark = friend && oz.count(friend,oz.dark)>0;
                    if(friend) await oz.move(p,friend,oz.dark);
                    if(tr.source.isIn()) await tr.source.faShuDamage(1+(sourceHadDark?1:0),p,'nocard');
                    if(friend?.isIn()) await friend.faShuDamage(1+(friendHadDark?1:0),p,'nocard');
                });
            },
        },
        zheZhiHeiYuShu: {
            audio:'ext:永夜残响/audio/skill/fanZhuanZheZhi/zheZhiHeiYuShu.mp3',
            type:'faShu',enable:'faShu',position:'h',selectCard:1,discard:true,visible:true,
            filter:(e,p)=>p.countCards('h',c=>get.type(c)==='faShu'&&lib.filter.cardDiscardable(c,p))>0&&
                game.hasPlayer(t=>t.side!==p.side),
            filterCard:(c,p)=>get.type(c)==='faShu'&&lib.filter.cardDiscardable(c,p),filterTarget:lib.filter.opponent,
            content:async function(e,tr,p) {
                if(e.cards?.length) await p.showCards(e.cards,'黑羽：展示费用牌');
                await oz.batch(p,async()=>{await oz.hit(p,e.target,oz.count(e.target,oz.dark));await oz.move(p,e.target,oz.dark);});
            },
            check:c=>6-get.value(c),ai:{order:4,result:{target:(p,t)=>{ var oz = lib.yongYeZheZhiHelpers; return get.damageEffect(t,oz.count(t,oz.dark)+1); }}},
        },
        zheZhiJueMie: {
            audio:'ext:永夜残响/audio/skill/fanZhuanZheZhi/zheZhiJueMie.mp3',
            type:'faShu',enable:'faShu',selectTarget:-1,filterTarget:(c,p,t)=>p===t,
            filter:(e,p)=>p.canBiShaBaoShi(),
            content:async function(e,tr,p) {await p.removeBiShaBaoShi();await oz.batch(p,()=>oz.annihilate(p));},
            ai:{baoShi:true,order:5,result:{player:p=>{ var oz = lib.yongYeZheZhiHelpers; return oz.blastScore(p,true); }}},
        },
        zheZhiYiShiHuiGui: {
            trigger:{player:'changeZhiShiWuAfter'},forced:true,popup:false,
            filter:(e,p)=>!!e && e.zhiShiWu===oz.dark && e.num<0 && oz.inverse(p),
            content:async function(e,tr,p) {
                oz.sync(p,'ozDarkMax',Math.max(0,oz.limit(p,oz.dark)+tr.num));
                if(!oz.count(p,oz.dark)) p.storage.ozReturn=true;
                await oz.settle(p);
            },
        },
    };
    return {
        "name": "永夜残响",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            installDiyFormPreview([["yeDaoShenShiXiang","fanZhuanShiXiang"],["yuanYiZheZhi","fanZhuanZheZhi"]]);
            var siMiNaiAudio = {
                bingJieTuXi: "bingJieTuXi.mp3",
                bingZhiShouHu: "bingZhiShouHu.mp3",
                siMiNaiDeEZuoJu: "siMiNaiDeEZuoJu.mp3",
                bingZhiQiYuan: "bingZhiQiYuan.mp3",
                bingJieKuiLeiSaDan: "bingJieKuiLeiSaDan.mp3",
            };
            Object.keys(siMiNaiAudio).forEach(function(skill) {
                if(!lib.skill[skill]) return;
                lib.skill[skill].audio = "ext:永夜残响/audio/skill/siMiNai/" +
                    siMiNaiAudio[skill];
            });
            var shiQiKuangSanAudio = {
                keKeDi: "keKeDi.mp3",
                baZhiDan: "baZhiDan.mp3",
                yiZhiDan: "yiZhiDan.mp3",
                erZhiDan: "erZhiDan.mp3",
                siZhiDan: "siZhiDan.mp3",
                qiZhiDan: "qiZhiDan.mp3",
                shiShiZhiCheng: "shiShiZhiCheng.mp3",
            };
            Object.keys(shiQiKuangSanAudio).forEach(function(skill) {
                if(!lib.skill[skill]) return;
                lib.skill[skill].audio =
                    "ext:永夜残响/audio/skill/shiQiKuangSan/" +
                    shiQiKuangSanAudio[skill];
            });
            var wuHeQinLiAudio = {
                qinLiYanLing: "qinLiYanLing.mp3",
                lingLiShiKong: "lingLiShiKong.mp3",
                yanMoXianXian: "yanMoXianXian.mp3",
                meiMeiXingTai: "meiMeiXingTai.mp3",
                siLingXingTai: "siLingXingTai.mp3",
                siLingDiaoDu: "siLingDiaoDu.mp3",
            };
            Object.keys(wuHeQinLiAudio).forEach(function(skill) {
                if(!lib.skill[skill]) return;
                lib.skill[skill].audio =
                    "ext:永夜残响/audio/skill/wuHeQinLi/" +
                    wuHeQinLiAudio[skill];
            });
            var yeDaoShenShiXiangAudio = {
                shenWeiLingZhuangShiFan: "shenWeiLingZhuangShiFan.mp3",
                wangZuoXianXian: "wangZuoXianXian.mp3",
                lingZhuangHuBi: "lingZhuangHuBi.mp3",
                gongZhuJiangLin: "gongZhuJiangLin.mp3",
                aoShaGong: "aoShaGong.mp3",
                huangDouFenMianBao: "huangDouFenMianBao.mp3",
                aoShaGongZuiHouZhiJian: "aoShaGongZuiHouZhiJian.mp3",
                jueWangFanZhuan: "jueWangFanZhuan.mp3",
            };
            Object.keys(yeDaoShenShiXiangAudio).forEach(function(skill) {
                if(!lib.skill[skill]) return;
                lib.skill[skill].audio =
                    "ext:永夜残响/audio/skill/yeDaoShenShiXiang/" +
                    yeDaoShenShiXiangAudio[skill];
            });
            var fanZhuanShiXiangAudio = {
                huiMieChongDong: "huiMieChongDong.mp3",
                baoNueGong: "baoNueGong.mp3",
                baoNueGongZhongYanZhiJian:
                    "baoNueGongZhongYanZhiJian.mp3",
                yiShiHuiGui: "yiShiHuiGui.mp3",
            };
            Object.keys(fanZhuanShiXiangAudio).forEach(function(skill) {
                if(!lib.skill[skill]) return;
                lib.skill[skill].audio =
                    "ext:永夜残响/audio/skill/fanZhuanShiXiang/" +
                    fanZhuanShiXiangAudio[skill];
            });
            var actionAudioSkill = "yongYeCanXiang_actionAudio";
            if(!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    trigger: { player: ["gouMai", "heCheng", "tiLian"] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function(event, player) {
                        return player.name == "siMiNai" ||
                            player.name1 == "siMiNai" ||
                            player.name2 == "siMiNai" ||
                            player.name == "shiQiKuangSan" ||
                            player.name1 == "shiQiKuangSan" ||
                            player.name2 == "shiQiKuangSan" ||
                            player.name == "wuHeQinLi" ||
                            player.name1 == "wuHeQinLi" ||
                            player.name2 == "wuHeQinLi" ||
                            player.name == "yeDaoShenShiXiang" ||
                            player.name1 == "yeDaoShenShiXiang" ||
                            player.name2 == "yeDaoShenShiXiang" ||
                            player.name == "fanZhuanShiXiang" ||
                            player.name1 == "fanZhuanShiXiang" ||
                            player.name2 == "fanZhuanShiXiang" ||
                            player.name == "yuanYiZheZhi" ||
                            player.name1 == "yuanYiZheZhi" ||
                            player.name2 == "yuanYiZheZhi" ||
                            player.name == "fanZhuanZheZhi" ||
                            player.name1 == "fanZhuanZheZhi" ||
                            player.name2 == "fanZhuanZheZhi";
                    },
                    content: function(event, trigger, player) {
                        var files = {
                            gouMai: "gouMai.mp3",
                            heCheng: "heCheng.mp3",
                            tiLian: "tiLian.mp3",
                        };
                        var action = event.triggername || trigger.name;
                        var file = files[action];
                        if(!file || !lib.config.background_audio) return;
                        var character = player.name == "shiQiKuangSan" ||
                            player.name1 == "shiQiKuangSan" ||
                            player.name2 == "shiQiKuangSan" ?
                            "shiQiKuangSan" : "siMiNai";
                        if(player.name == "wuHeQinLi" ||
                            player.name1 == "wuHeQinLi" ||
                            player.name2 == "wuHeQinLi") {
                            character = "wuHeQinLi";
                        }
                        if(player.name == "yeDaoShenShiXiang" ||
                            player.name1 == "yeDaoShenShiXiang" ||
                            player.name2 == "yeDaoShenShiXiang") {
                            character = "yeDaoShenShiXiang";
                        }
                        if(player.name == "fanZhuanShiXiang" ||
                            player.name1 == "fanZhuanShiXiang" ||
                            player.name2 == "fanZhuanShiXiang") {
                            character = "fanZhuanShiXiang";
                        }
                        if(player.name == "yuanYiZheZhi" ||
                            player.name1 == "yuanYiZheZhi" ||
                            player.name2 == "yuanYiZheZhi") {
                            character = "yuanYiZheZhi";
                        }
                        if(player.name == "fanZhuanZheZhi" ||
                            player.name1 == "fanZhuanZheZhi" ||
                            player.name2 == "fanZhuanZheZhi") {
                            character = "fanZhuanZheZhi";
                        }
                        var audioPath = "ext:永夜残响/audio/action/" +
                            character + "/" + file;
                        game.broadcastAll(function(path, speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: path,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, audioPath, player);
                    },
                };
            }
            game.addGlobalSkill(actionAudioSkill);
},
        "help": {},
        "config": {},
        "package": {
            "character": {
                "connect": true,
                "character": {
                    "yuanYiZheZhi": [null,"yongGroup",4,["zheZhiManager","zheZhiLingZhuang","zheZhiJueMieTianShi","zheZhiJueWang","zheZhiGuangJian","zheZhiTianYi","zheZhiRiLun","zheZhiPaoGuan","zheZhiGuangYu"],["des:驾驭绝灭天使的冷静术师，以光羽编织精密火力网。她不断分散与回收羽翼；当希望耗尽，绝望将令灵装彻底反转。","ext:永夜残响/yuanYiZheZhi.png"]],
                    "fanZhuanZheZhi": [null,"yongGroup",4,["zheZhiManager","zheZhiFanLingZhuang","zheZhiJuJue","zheZhiHeiYuShu","zheZhiJueMie","zheZhiYiShiHuiGui","zheZhiHeiYu"],["unseen","forbidai","des:绝望侵蚀后的鸢一折纸，以救世魔王散布象征拒绝的黑羽。她在伤害中转移灾厄，待黑羽耗尽便强制绝灭一切，唤回原本意识。","ext:永夜残响/fanZhuanZheZhi.png"]],
                    "wuHeQinLi": [
                        null,
                        "huanGroup",
                        4,
                        [
                            "shuangSeFaDai",
                            "qinLiBaiSeFaDaiInfo",
                            "qinLiHeiSeFaDaiInfo",
                            "qinLiYanLing",
                            "lingLiShiKong",
                            "zhuoLanJianGui",
                            "yanMoXianXian",
                            "qinLiLingLi",
                        ],
                        [
                            "des:统率空中舰队的炎之精灵，以双色发带切换妹妹与司令姿态。她积蓄灵力驾驭灼烂歼鬼，在治疗重生与炽烈炮击之间掌控节奏。",
                            "ext:永夜残响/wHeQingLi.jpg",
                        ],
                    ],
                    "yeDaoShenShiXiang": [
                        null,
                        "jiGroup",
                        4,
                        [
                            "shenWeiLingZhuangShiFan",
                            "jueWangFanZhuan",
                            "wangZuoXianXian",
                            "lingZhuangHuBi",
                            "gongZhuJiangLin",
                            "aoShaGong",
                            "huangDouFenMianBao",
                            "aoShaGongZuiHouZhiJian",
                            "shiXiangLingLi",
                            "fanZhuanLingLi",
                        ],
                        [
                            "des:持有鏖杀公的精灵公主，以纯粹意志守护珍视之人。她在王座与剑刃形态间转换，积蓄灵力强化防御、斩击与最后之剑。",
                            "ext:永夜残响/shiXiang.jpg",
                        ],
                    ],
                    "fanZhuanShiXiang": [
                        null,
                        "jiGroup",
                        4,
                        [
                            "fanLingZhuangShiFan",
                            "huiMieChongDong",
                            "baoNueGong",
                            "baoNueGongZhongYanZhiJian",
                            "yiShiHuiGui",
                            "shiXiangLingLi",
                        ],
                        [
                            "des:灵力彻底反转后的夜刀神十香，手中鏖杀公亦化为暴虐公。她以反转灵力换取毁灭性连击，在伤敌与自伤的边缘追击，直至意识回归。",
                            "ext:永夜残响/fanZhuanShiXiang.png",
                            "unseen",
                            "forbidai",
                        ],
                    ],
                    "siMiNai": [
                        null,
                        "shengGroup",
                        3.5,
                        [
                            "shenWeiLingZhuangSiFan",
                            "bingJieTuXi",
                            "bingZhiShouHu",
                            "siMiNaiDeEZuoJu",
                            "bingZhiQiYuan",
                            "bingJieKuiLeiSaDan",
                            "siMiNaiBingJing",
                            "siMiNaiDongJie",
                        ],
                        [
                            "des:温柔而胆怯的冰之精灵，借助手偶四糸奈传达勇气。她召唤冰结傀儡·撒旦守护同伴，在治疗、减伤与冻结额外行动之间调度寒气。",
                            "ext:永夜残响/siMiNai.jpg",
                        ],
                    ],
                    "shiQiKuangSan": [
                        null,
                        "xueGroup",
                        5,
                        [
                            "keKeDi",
                            "baZhiDan",
                            "yiZhiDan",
                            "erZhiDan",
                            "siZhiDan",
                            "qiZhiDan",
                            "shiShiZhiCheng",
                            "shiCha",
                            "shiJianJingZhi",
                        ],
                        [
                            "des:游走于无数时间线的梦魇，以刻刻帝夺取并支配时间。她把伤害化为时差，在治疗、增伤与时间静止之间精密交换每一秒。",
                            "ext:永夜残响/shiQiKuangSan.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "永夜残响": "永夜残响",
                    "yuanYiZheZhi": "鸢一折纸",
                    "fanZhuanZheZhi": "反转·折纸",
                    "wuHeQinLi": "五河琴里",
                    "yeDaoShenShiXiang": "夜刀神十香",
                    "fanZhuanShiXiang": "反转·十香",
                    "siMiNai": "四糸乃",
                    "shiQiKuangSan": "时崎狂三",
                },
            },
            "card": {
                "card": {},
                "translate": {},
                "list": [],
            },
            "skill": {
                "skill": {
                    ...origamiSkills,
                    "qinLiBaiSeFaDaiInfo": {"charlotte": true, "nopop": true, "popup": false},
                    "qinLiHeiSeFaDaiInfo": {"charlotte": true, "nopop": true, "popup": false},
                    "shuangSeFaDai": {
                        "getForm": function(player) {
                    if(player.hasSkill('heiSeFaDai')) return 'heiSeFaDai';
                    if(player.hasSkill('baiSeFaDai')) return 'baiSeFaDai';
                    return null;
                },
                        "setForm": function(player, form) {
                    if(!player) return;
                    if(form != 'baiSeFaDai' && form != 'heiSeFaDai') return;
                    var current =
                        lib.skill.shuangSeFaDai.getForm(player);
                    if(current == form) return;
                    var other = form == 'baiSeFaDai' ?
                        'heiSeFaDai' : 'baiSeFaDai';
                    if(player.hasSkill(other)) player.removeSkill(other);
                    if(!player.hasSkill(form)) player.addSkill(form);
                    var audioPath = 'ext:永夜残响/audio/skill/wuHeQinLi/' +
                        (form == 'baiSeFaDai' ?
                            'shuangSeFaDaiBai.mp3' :
                            'shuangSeFaDaiHei.mp3');
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, audioPath, player);
                    game.log(
                        player,
                        '将【双色发带】翻至',
                        form == 'baiSeFaDai' ?
                            '#g【白色发带】' : '#y【黑色发带】'
                    );
                },
                        "flip": function(player) {
                    var form = lib.skill.shuangSeFaDai.getForm(player);
                    lib.skill.shuangSeFaDai.setForm(
                        player,
                        form == 'heiSeFaDai' ?
                            'baiSeFaDai' : 'heiSeFaDai'
                    );
                },
                        "group": [
                            "shuangSeFaDai_chuShi",
                            "shuangSeFaDai_fanMian",
                        ],
                        "onremove": function(player) {
                    player.removeSkill('baiSeFaDai');
                    player.removeSkill('heiSeFaDai');
                },
                        "subSkill": {
                            "chuShi": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            lib.skill.shuangSeFaDai.setForm(
                                player,
                                'baiSeFaDai'
                            );
                        },
                            },
                            "fanMian": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "cost": async function(event, trigger, player) {
                            var current = lib.skill.shuangSeFaDai
                                .getForm(player);
                            var target = current == 'heiSeFaDai' ?
                                '【白色发带】' : '【黑色发带】';
                            event.result = await player.chooseBool(
                                '是否将【双色发带】翻至' + target + '？'
                            ).set('ai', function() {
                                var player = _status.event.player;
                                return player.zhiLiao <
                                    player.getZhiLiaoLimit();
                            }).forResult();
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shuangSeFaDai.flip(player);
                        },
                            },
                        },
                    },
                    "qinLiYanLing": {
                        "audio": "ext:永夜残响/audio/skill/wuHeQinLi/qinLiYanLing.mp3",
                        "group": [
                            "qinLiYanLing_zaoCheng",
                            "qinLiYanLing_chengShou",
                        ],
                        "subSkill": {
                            "zaoCheng": {
                                "audio": "ext:永夜残响/audio/skill/wuHeQinLi/qinLiYanLing.mp3",
                                "trigger": {
                                    "source": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                !!event.player &&
                                !player.isZhiShiWuMax('qinLiLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('qinLiLingLi', 1);
                        },
                            },
                            "chengShou": {
                                "audio": "ext:永夜残响/audio/skill/wuHeQinLi/qinLiYanLing.mp3",
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                !player.isZhiShiWuMax('qinLiLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('qinLiLingLi', 1);
                        },
                            },
                        },
                    },
                    "lingLiShiKong": {
                        "audio": "ext:永夜残响/audio/skill/wuHeQinLi/lingLiShiKong.mp3",
                        "group": [
                            "lingLiShiKong_manLingLiChengShou",
                        ],
                        "trigger": {
                            "player": "changeZhiShiWuAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.zhiShiWu == 'qinLiLingLi' &&
                        event.num > 0 &&
                        player.countZhiShiWu('qinLiLingLi') >= 4;
                },
                        "content": async function(event, trigger, player) {
                    var form = lib.skill.shuangSeFaDai.getForm(player);
                    if(form == 'heiSeFaDai') {
                        lib.skill.shuangSeFaDai.setForm(
                            player,
                            'baiSeFaDai'
                        );
                        return;
                    }
                    lib.skill.shuangSeFaDai.setForm(
                        player,
                        'baiSeFaDai'
                    );
                    await player.faShuDamage(1, player);
                    if(player.isIn() &&
                        player.countZhiShiWu('qinLiLingLi') > 0) {
                        await player.removeZhiShiWu('qinLiLingLi', 1);
                    }
                },
                        "subSkill": {
                            "manLingLiChengShou": {
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                !!event.source &&
                                event.source != player &&
                                player.hasSkill('baiSeFaDai') &&
                                player.countZhiShiWu('qinLiLingLi') >= 4 &&
                                !player.storage.qinLiLingLiOverloading;
                        },
                                "content": async function(event, trigger, player) {
                            player.storage.qinLiLingLiOverloading = true;
                            await player.faShuDamage(1, player);
                            if(player.isIn() &&
                                player.countZhiShiWu('qinLiLingLi') > 0) {
                                await player.removeZhiShiWu(
                                    'qinLiLingLi', 1
                                );
                            }
                            delete player.storage.qinLiLingLiOverloading;
                        },
                            },
                        },
                    },
                    "zhuoLanJianGui": {
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    if(!event || event.yingZhan == true) return false;
                    return player.hasSkill('yanMoXingTai') ||
                        player.countZhiShiWu('qinLiLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var candidates = game.filterPlayer(function(current) {
                        return current.isIn() &&
                            current.side != player.side &&
                            current != trigger.target;
                    });
                    if(player.hasSkill('yanMoXingTai')) {
                        if(!candidates.length) {
                            var activate = await player.chooseBool(
                                '是否发动【灼烂歼鬼·斧】，令本次攻击伤害+1？'
                            ).set('ai', function() {
                                var player = _status.event.player;
                                var trigger = _status.event.getTrigger();
                                return !!trigger.target &&
                                    trigger.target.side != player.side &&
                                    get.damageEffect2(
                                        trigger.target, player, 1
                                    ) > 0;
                            }).forResult();
                            event.result = {
                                bool: !!activate.bool,
                                cost_data: {
                                    axe: true,
                                    cannon: false,
                                },
                            };
                            return;
                        }
                        var targets = (await player.chooseTarget(
                            '是否发动【灼烂歼鬼】，选择炮击目标？',
                            function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return target.side != player.side &&
                                    target != trigger.target;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                2
                            );
                        }).forResultTargets() || []);
                        event.result = {
                            bool: targets.length > 0,
                            targets: targets,
                            cost_data: {
                                axe: true,
                                cannon: targets.length > 0,
                            },
                        };
                        return;
                    }
                    var controls = ['灼烂歼鬼·斧'];
                    if(candidates.length) controls.push('灼烂歼鬼·炮');
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【灼烂歼鬼】？')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var trigger = _status.event.getTrigger();
                            var axe = trigger.target ? get.damageEffect2(
                                trigger.target,
                                player,
                                1
                            ) : -100;
                            var cannon = -100;
                            game.filterPlayer(function(target) {
                                return target.side != player.side &&
                                    target != trigger.target;
                            }).forEach(function(target) {
                                cannon = Math.max(cannon,
                                    get.damageEffect2(target, player, 2));
                            });
                            if(cannon > axe + 0.5) return '灼烂歼鬼·炮';
                            if(axe > 0) return '灼烂歼鬼·斧';
                            return 'cancel2';
                        })
                        .forResultControl();
                    if(!control || control == 'cancel2') {
                        event.result = { bool: false };
                        return;
                    }
                    if(control == '灼烂歼鬼·炮') {
                        var targets = (await player.chooseTarget(
                            true,
                            '灼烂歼鬼·炮：指定攻击目标以外的一名对手',
                            function(card, player, target) {
                                var trigger = _status.event.getTrigger();
                                return target.side != player.side &&
                                    target != trigger.target;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                2
                            );
                        }).forResultTargets() || []);
                        event.result = {
                            bool: targets.length > 0,
                            targets: targets,
                            cost_data: {
                                axe: false,
                                cannon: targets.length > 0,
                            },
                        };
                        return;
                    }
                    event.result = {
                        bool: true,
                        cost_data: {
                            axe: true,
                            cannon: false,
                        },
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(!player.hasSkill('yanMoXingTai')) {
                        await player.removeZhiShiWu('qinLiLingLi', 1);
                    }
                    var data = event.cost_data || {};
                    var audioPath =
                        'ext:永夜残响/audio/skill/wuHeQinLi/' +
                        (data.cannon ?
                            'zhuoLanJianGuiPao.mp3' :
                            'zhuoLanJianGuiFu.mp3');
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, audioPath, player);
                    if(data.axe) trigger.changeDamageNum(1);
                    if(data.cannon && event.targets && event.targets[0]) {
                        trigger.customArgs = trigger.customArgs || {};
                        trigger.customArgs.zhuoLanJianGuiPao =
                            event.targets[0].playerid;
                    }
                },
                        "group": "zhuoLanJianGui_pao",
                        "subSkill": {
                            "pao": {
                                "trigger": {
                                    "source": "gongJiMingZhongAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.customArgs &&
                                !!event.customArgs.zhuoLanJianGuiPao;
                        },
                                "content": async function(event, trigger, player) {
                            var id = trigger.customArgs.zhuoLanJianGuiPao;
                            var target = game.players.find(function(current) {
                                return current.playerid == id;
                            });
                            if(target && target.isIn()) {
                                await target.faShuDamage(2, player);
                            }
                        },
                            },
                        },
                    },
                    "yanMoXianXian": {
                        "audio": "ext:永夜残响/audio/skill/wuHeQinLi/yanMoXianXian.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return !player.hasSkill('yanMoXingTai') &&
                        player.canBiShaShuiJing() &&
                        player.countZhiShiWu('qinLiLingLi') >= 3;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('qinLiLingLi', 3);
                    player.addGongJi();
                    await player.hengZhi();
                    player.addSkill('yanMoXingTai');
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    if(!player.countCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    })) return false;
                    return game.hasPlayer(function(target) {
                        return target.side != player.side;
                    });
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "qinLiLingLi": {
                        "intro": {
                            "name": "灵力",
                            "content": "mark",
                            "max": 4,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_qinLiLingLi.png",
                    },
                    "shenWeiLingZhuangShiFan": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/shenWeiLingZhuangShiFan.mp3",
                        "getForm": function(player) {
                    if(player.hasSkill('aoShaGongJianRen')) {
                        return 'aoShaGongJianRen';
                    }
                    if(player.hasSkill('aoShaGongWangZuo')) {
                        return 'aoShaGongWangZuo';
                    }
                    return null;
                },
                        "setForm": function(player, form) {
                    if(!player ||
                        !['aoShaGongWangZuo', 'aoShaGongJianRen']
                            .includes(form)) return;
                    var other = form == 'aoShaGongWangZuo' ?
                        'aoShaGongJianRen' : 'aoShaGongWangZuo';
                    if(player.hasSkill(other)) player.removeSkill(other);
                    if(!player.hasSkill(form)) player.addSkill(form);
                },
                        "group": [
                            "shenWeiLingZhuangShiFan_chuShi",
                            "shenWeiLingZhuangShiFan_wangZuo",
                            "shenWeiLingZhuangShiFan_jianRen",
                        ],
                        "onremove": function(player) {
                    player.removeSkill('aoShaGongWangZuo');
                    player.removeSkill('aoShaGongJianRen');
                },
                        "subSkill": {
                            "chuShi": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "content": async function(event, trigger, player) {
                            game.trySkillAudio(
                                'shenWeiLingZhuangShiFan', player, true
                            );
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongWangZuo'
                            );
                            await player.addZhiShiWu('shiXiangLingLi', 2);
                        },
                            },
                            "wangZuo": {
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                player.hasSkill('aoShaGongWangZuo') &&
                                !player.isZhiShiWuMax('shiXiangLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('shiXiangLingLi', 1);
                        },
                            },
                            "jianRen": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                player.hasSkill('aoShaGongJianRen') &&
                                !player.isZhiShiWuMax('shiXiangLingLi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('shiXiangLingLi', 1);
                        },
                            },
                        },
                    },
                    "wangZuoXianXian": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/wangZuoXianXian.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan == true &&
                        player.hasSkill('aoShaGongWangZuo') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除1【灵力】发动【王座显现】，令本次应战攻击伤害额外+1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        return !!trigger.target &&
                            trigger.target.side != player.side &&
                            get.damageEffect2(
                                trigger.target, player, 1
                            ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('shiXiangLingLi', 1);
                    trigger.changeDamageNum(1);
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.wangZuoXianXian = true;
                },
                        "group": "wangZuoXianXian_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan == true &&
                                !!event.target &&
                                !!event.customArgs &&
                                event.customArgs.wangZuoXianXian === true;
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongJianRen'
                            );
                        },
                            },
                        },
                    },
                    "lingZhuangHuBi": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/lingZhuangHuBi.mp3",
                        "trigger": {
                            "player": "chengShouShangHaiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event && event.num > 0 && player.hasSkill('aoShaGongWangZuo') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var max = Math.min(2, player.countZhiShiWu('shiXiangLingLi'));
                    if(max < 1) { event.result = {bool: false}; return; }
                    var controls = [];
                    for(var i = 1; i <= max; i++) controls.push('X=' + i);
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【灵装护壁】？')
                        .set('ai', function() {
                            var current = _status.event;
                            var useful = Math.min(2, current.player.countZhiShiWu('shiXiangLingLi'), current.getTrigger().num);
                            return 'X=' + Math.max(1, useful);
                        }).forResultControl();
                    var x = controls.includes(control) && control !== 'cancel2' ? parseInt(control.slice(2)) : 0;
                    event.result = {bool: x > 0, cost_data: x};
                },
                        "content": async function(event, trigger, player) {
                    var x = event.cost_data;
                    if(!Number.isInteger(x) || x < 1 || x > 2 || player.countZhiShiWu('shiXiangLingLi') < x) return;
                    await player.removeZhiShiWu('shiXiangLingLi', x);
                    if(player.countCards('he') >= x) {
                        await player.chooseToDiscard('he', x, true, '灵装护壁：弃置' + x + '张牌');
                    }
                    trigger.changeDamageNum(-x);
                },
                    },
                    "gongZhuJiangLin": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/gongZhuJiangLin.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.hasSkill('aoShaGongWangZuo') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('shiXiangLingLi', 1);
                    lib.skill.shenWeiLingZhuangShiFan.setForm(
                        player,
                        'aoShaGongJianRen'
                    );
                    player.addGongJi();
                },
                        "ai": {
                            "order": function(item, player) {
                    if(!player.countCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    })) return 0;
                    return game.hasPlayer(function(target) {
                        return target.side != player.side;
                    }) ? 4 : 0;
                },
                            "result": {
                                "player": 1,
                            },
                        },
                    },
                    "aoShaGong": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/aoShaGong.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        event.aoShaGongZuiHouZhiJian !== true &&
                        !player.hasSkill('zuiHouZhiJianXingDong') &&
                        player.hasSkill('aoShaGongJianRen') &&
                        player.countZhiShiWu('shiXiangLingLi') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    var controls = ['X=1'];
                    if(player.countZhiShiWu('shiXiangLingLi') >= 2) {
                        controls.push('X=2');
                    }
                    controls.push('cancel2');
                    var control = await player.chooseControl(controls)
                        .set('prompt', '是否发动【鏖杀公】？')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var trigger = _status.event.getTrigger();
                            var target = trigger && trigger.target;
                            if(player.countZhiShiWu('shiXiangLingLi') >= 2 &&
                                target) {
                                var hasShield = target.hasJiChuXiaoGuo &&
                                    target.hasJiChuXiaoGuo('_shengDun');
                                var hasSpecialDefense = target.countCards(
                                    'h',
                                    function(card) {
                                        return get.name(card) == 'shengGuang' ||
                                            get.name(card) == 'anMie';
                                    }
                                ) > 0;
                                if(hasShield || hasSpecialDefense) return 'X=2';
                            }
                            return 'X=1';
                        })
                        .forResultControl();
                    var x = control == 'X=2' ? 2 :
                        (control == 'X=1' ? 1 : 0);
                    event.result = {
                        bool: x > 0,
                        cost_data: x,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var x = event.cost_data;
                    await player.removeZhiShiWu('shiXiangLingLi', x);
                    if(x == 1) {
                        trigger.changeDamageNum(1);
                    } else {
                        trigger.wuFaShengDun();
                        trigger.wuFaShengGuang();
                        trigger.wuFaAnMie();
                    }
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.aoShaGong = true;
                },
                        "group": "aoShaGong_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.customArgs &&
                                event.customArgs.aoShaGong === true &&
                                player.countZhiShiWu('shiXiangLingLi') == 0 &&
                                player.hasSkill('aoShaGongJianRen');
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongWangZuo'
                            );
                        },
                            },
                        },
                    },
                    "huangDouFenMianBao": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/huangDouFenMianBao.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countCards('he', function(card) {
                            return lib.filter.cardDiscardable(card, player);
                        }) > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(
                        'he',
                        1,
                        true,
                        '黄豆粉面包：弃置1张牌'
                    );
                    var control = await player.chooseControl([
                        '+1【治疗】',
                        '+2【灵力】',
                    ]).set('prompt', '黄豆粉面包：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.zhiLiao <
                                player.getZhiLiaoLimit() ?
                                '+1【治疗】' : '+2【灵力】';
                        })
                        .forResultControl();
                    if(control == '+1【治疗】') {
                        await player.changeZhiLiao(1, player);
                    } else {
                        await player.addZhiShiWu('shiXiangLingLi', 2);
                    }
                },
                        "check": function(event, player) {
                    // AI必须保留至少1张手牌，避免启动后0牌直接判负。
                    if(player.countCards('h') <= 1) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return player.zhiLiao < player.getZhiLiaoLimit() ||
                        player.countZhiShiWu('shiXiangLingLi') < 5;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "aoShaGongZuiHouZhiJian": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/aoShaGongZuiHouZhiJian.mp3",
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event, player) {
                    if(!event ||
                        event.aoShaGongZuiHouZhiJian === true ||
                        player.hasSkill('zuiHouZhiJianXingDong') ||
                        !player.hasSkill('aoShaGongJianRen') ||
                        player.countZhiShiWu('shiXiangLingLi') < 3 ||
                        !player.canBiShaBaoShi()) return false;
                    var phase = event.getParent &&
                        event.getParent('xingDong');
                    return !!phase &&
                        phase.name == 'xingDong' &&
                        phase.player == player;
                },
                        "cost": async function(event, trigger, player) {
                    var activate = await player.chooseBool(
                        '是否发动【鏖杀公·最后之剑】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var hasAttack = player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi';
                        }) > 0;
                        if(!hasAttack) return false;
                        var enemies = game.filterPlayer(function(target) {
                            return target.side != player.side;
                        });
                        if(!enemies.length) return false;
                        var maxHand = Math.max.apply(null, enemies.map(
                            function(target) {
                                return target.countCards('h');
                            }
                        ));
                        return enemies.length >= 2 || maxHand >= 2 ||
                            get.shiQi(!player.side) <= 3;
                    }).forResult();
                    if(!activate.bool) {
                        event.result = { bool: false };
                        return;
                    }
                    var all = ['剑锋', '斩空', '剑压'];
                    var first = await player.chooseControl(all)
                        .set('prompt', '最后之剑：选择第一项效果')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var enemies = game.filterPlayer(function(target) {
                                return target.side != player.side;
                            });
                            var maxHand = enemies.reduce(function(max, target) {
                                return Math.max(max, target.countCards('h'));
                            }, 0);
                            var scores = {
                                '剑锋': 1.5,
                                '斩空': maxHand >= 3 ? 2.4 : 1.1,
                                '剑压': Math.max(0, enemies.length - 1) * 1.4,
                            };
                            return _status.event.controls.slice().sort(
                                function(a, b) {
                                    return scores[b] - scores[a];
                                }
                            )[0];
                        })
                        .forResultControl();
                    var remaining = all.filter(function(current) {
                        return current != first;
                    });
                    var second = await player.chooseControl(remaining)
                        .set('prompt', '最后之剑：选择第二项效果')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var enemies = game.filterPlayer(function(target) {
                                return target.side != player.side;
                            });
                            var maxHand = enemies.reduce(function(max, target) {
                                return Math.max(max, target.countCards('h'));
                            }, 0);
                            var scores = {
                                '剑锋': 1.5,
                                '斩空': maxHand >= 3 ? 2.4 : 1.1,
                                '剑压': Math.max(0, enemies.length - 1) * 1.4,
                            };
                            return _status.event.controls.slice().sort(
                                function(a, b) {
                                    return scores[b] - scores[a];
                                }
                            )[0];
                        })
                        .forResultControl();
                    event.result = {
                        bool: !!first && !!second,
                        cost_data: [first, second],
                    };
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.removeZhiShiWu('shiXiangLingLi', 3);
                    var effects = event.cost_data.slice();
                    if(!Array.isArray(player.storage.extraXingDong)) {
                        player.storage.extraXingDong = [];
                    }
                    player.storage.aoShaGongZuiHouZhiJianEffects =
                        effects.slice();
                    player.addSkill('zuiHouZhiJianXingDong');
                    game.log(
                        player,
                        '为【鏖杀公·最后之剑】选择了',
                        '#y【' + effects[0] + '】',
                        '和',
                        '#y【' + effects[1] + '】'
                    );
                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        aoShaGongZuiHouZhiJian: true,
                        aoShaGongZuiHouZhiJianEffects: effects.slice(),
                    });
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "jueWangFanZhuan": {
                        "audio": "ext:永夜残响/audio/skill/yeDaoShenShiXiang/jueWangFanZhuan.mp3",
                        "group": [
                            "jueWangFanZhuan_jiLu",
                            "jueWangFanZhuan_bianShen",
                        ],
                        "subSkill": {
                            "jiLu": {
                                "trigger": {
                                    "player": "changeZhiShiWuEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                                    return !!event &&
                                        event.zhiShiWu == 'shiXiangLingLi' &&
                                        event.num < 0;
                                },
                                "content": async function(event, trigger, player) {
                                    await player.addZhiShiWu(
                                        'fanZhuanLingLi',
                                        -trigger.num
                                    );
                                },
                            },
                            "bianShen": {
                                "trigger": {
                                    "player": "changeShiQiEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                                    return !!event &&
                                        event.player == player &&
                                        event.side == player.side &&
                                        event.num < 0 &&
                                        event.cause == 'damage' &&
                                        player.countZhiShiWu(
                                            'fanZhuanLingLi'
                                        ) >= 5;
                                },
                                "content": async function(event, trigger, player) {
                                    game.trySkillAudio(
                                        'jueWangFanZhuan', player, true
                                    );
                                    if(player.zhiLiao > 0) {
                                        await player.changeZhiLiao(
                                            -player.zhiLiao,
                                            player
                                        );
                                    }
                                    var reverse = player.countZhiShiWu(
                                        'fanZhuanLingLi'
                                    );
                                    if(reverse > 0) {
                                        await player.removeZhiShiWu(
                                            'fanZhuanLingLi', reverse
                                        );
                                    }
                                    await player.reinitCharacter(
                                        'yeDaoShenShiXiang',
                                        'fanZhuanShiXiang'
                                    );
                                    await player.setZhiShiWu(
                                        'shiXiangLingLi', 5
                                    );
                                },
                            },
                        },
                    },
                    "fanZhuanLingLi": {
                        "intro": {
                            "name": "反转灵力",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_fanZhuanLingLi.png",
                    },
                    "fanLingZhuangShiFan": {
                        "group": [
                            "fanLingZhuangShiFan_zaoCheng",
                            "fanLingZhuangShiFan_chengShou",
                        ],
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                                return Math.max(0, num - 2);
                            },
                        },
                        "subSkill": {
                            "zaoCheng": {
                                "trigger": {
                                    "source": "zaoChengShangHai",
                                },
                                "forced": true,
                                "firstDo": true,
                                "content": function(event, trigger, player) {
                                    trigger.changeDamageNum(1);
                                },
                            },
                            "chengShou": {
                                "trigger": {
                                    "player": "chengShouShangHaiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "content": function(event, trigger, player) {
                                    trigger.changeDamageNum(1);
                                },
                            },
                        },
                    },
                    "huiMieChongDong": {
                        "audio": "ext:永夜残响/audio/skill/fanZhuanShiXiang/huiMieChongDong.mp3",
                        "trigger": {
                            "global": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "usable": 1,
                        "filter": function(event, player) {
                            return !!event && event.num > 0 &&
                                event.source == player &&
                                event.faShu !== true &&
                                !!event.card &&
                                get.type(event.card) == 'gongJi';
                        },
                        "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('shiXiangLingLi', 1);
                            player.addGongJi();
                        },
                    },
                    "baoNueGong": {
                        "audio": "ext:永夜残响/audio/skill/fanZhuanShiXiang/baoNueGong.mp3",
                        "firstDo": true,
                        "priority": 100,
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                            return !!event && event.yingZhan != true &&
                                event.baoNueGongZhongYan !== true &&
                                (!event.customArgs ||
                                    event.customArgs
                                        .shiXiangInverseAttackChoice ===
                                            undefined) &&
                                player.countZhiShiWu('shiXiangLingLi') > 0;
                        },
                        "cost": async function(event, trigger, player) {
                            if(trigger.baoNueGongZhongYan === true ||
                                trigger.customArgs &&
                                trigger.customArgs
                                    .shiXiangInverseAttackChoice !==
                                        undefined) {
                                event.result = { bool: false };
                                return;
                            }
                            var max = Math.min(
                                2,
                                player.countZhiShiWu('shiXiangLingLi')
                            );
                            var controls = [];
                            for(var i = 1; i <= max; i++) {
                                controls.push('X=' + i);
                            }
                            controls.push('cancel2');
                            var control = await player.chooseControl(controls)
                                .set('prompt', '是否发动【暴虐公】？')
                                .set('ai', function() {
                                    return 'X=' + Math.min(
                                        2,
                                        _status.event.player.countZhiShiWu(
                                            'shiXiangLingLi'
                                        )
                                    );
                                })
                                .forResultControl();
                            var x = control && control.startsWith('X=') ?
                                parseInt(control.slice(2)) : 0;
                            event.result = {
                                bool: x > 0,
                                cost_data: x,
                            };
                        },
                        "content": async function(event, trigger, player) {
                            trigger.customArgs = trigger.customArgs || {};
                            if(trigger.customArgs
                                .shiXiangInverseAttackChoice !== undefined) {
                                return;
                            }
                            trigger.customArgs.shiXiangInverseAttackChoice =
                                'baoNueGong';
                            var x = event.cost_data || 0;
                            await player.removeZhiShiWu(
                                'shiXiangLingLi', x
                            );
                            trigger.changeDamageNum(x);
                            trigger.customArgs.baoNueGong = true;
                        },
                        "group": "baoNueGong_jieShu",
                        "subSkill": {
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                                    return !!event && !!event.customArgs &&
                                        event.customArgs.baoNueGong === true;
                                },
                                "content": async function(event, trigger, player) {
                                    await player.faShuDamage(1, player);
                                },
                            },
                        },
                    },
                    "baoNueGongZhongYanZhiJian": {
                        "audio": "ext:永夜残响/audio/skill/fanZhuanShiXiang/baoNueGongZhongYanZhiJian.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                            return !!event && event.yingZhan != true &&
                                (!event.customArgs ||
                                    event.customArgs
                                        .shiXiangInverseAttackChoice ===
                                            undefined) &&
                                player.countZhiShiWu('shiXiangLingLi') >= 3 &&
                                player.canBiShaBaoShi();
                        },
                        "cost": async function(event, trigger, player) {
                            if(trigger.customArgs &&
                                trigger.customArgs
                                    .shiXiangInverseAttackChoice !==
                                        undefined) {
                                event.result = { bool: false };
                                return;
                            }
                            event.result = await player.chooseBool(
                                '是否发动【暴虐公·终焉之剑】？'
                            ).set('ai', function() {
                                var trigger = _status.event.getTrigger();
                                return !!trigger.target &&
                                    trigger.target.side !=
                                        _status.event.player.side;
                            }).forResult();
                        },
                        "content": async function(event, trigger, player) {
                            trigger.customArgs = trigger.customArgs || {};
                            if(trigger.customArgs
                                .shiXiangInverseAttackChoice !== undefined) {
                                return;
                            }
                            trigger.customArgs.shiXiangInverseAttackChoice =
                                'baoNueGongZhongYanZhiJian';
                            await player.removeBiShaBaoShi();
                            player.storage.shiXiangZhongYanPaying = true;
                            await player.removeZhiShiWu(
                                'shiXiangLingLi', 3
                            );
                            delete player.storage.shiXiangZhongYanPaying;
                            trigger.changeDamageNum(2);
                            trigger.wuFaYingZhan();
                            trigger.wuFaShengDun();
                            trigger.baoNueGongZhongYan = true;
                            trigger.customArgs.baoNueGongZhongYan = true;
                        },
                        "group": [
                            "baoNueGongZhongYanZhiJian_mingZhong",
                            "baoNueGongZhongYanZhiJian_jieShu",
                        ],
                        "subSkill": {
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhongAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                                    return !!event && !!event.customArgs &&
                                        event.customArgs
                                            .baoNueGongZhongYan === true;
                                },
                                "content": function(event, trigger, player) {
                                    trigger.customArgs
                                        .baoNueGongZhongYanMingZhong = true;
                                },
                            },
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                                    return !!event && !!event.customArgs &&
                                        event.customArgs
                                            .baoNueGongZhongYan === true;
                                },
                                "content": async function(event, trigger, player) {
                                    var hit = !!trigger.customArgs
                                        .baoNueGongZhongYanMingZhong;
                                    if(hit && trigger.target) {
                                        var targets = game.filterPlayer(
                                            function(current) {
                                                return current.side !=
                                                        player.side &&
                                                    current != trigger.target;
                                            }
                                        ).sortBySeat(player);
                                        for(var target of targets) {
                                            await target.faShuDamage(1, player);
                                        }
                                    }
                                    if(hit) {
                                        await player.faShuDamage(2, player);
                                    }
                                    if((hit ||
                                        player.countZhiShiWu('shiXiangLingLi') == 0) &&
                                        (player.name == 'fanZhuanShiXiang' ||
                                        player.name1 == 'fanZhuanShiXiang' ||
                                        player.name2 == 'fanZhuanShiXiang')) {
                                        await lib.skill.yiShiHuiGui
                                            .returnToPrincess(player, true);
                                    }
                                },
                            },
                        },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "yiShiHuiGui": {
                        "audio": "ext:永夜残响/audio/skill/fanZhuanShiXiang/yiShiHuiGui.mp3",
                        "returnToPrincess": async function(player, playAudio) {
                            if(playAudio) {
                                game.trySkillAudio(
                                    'yiShiHuiGui', player, true
                                );
                            }
                            delete player.storage.shiXiangZhongYanPaying;
                            await player.reinitCharacter(
                                'fanZhuanShiXiang',
                                'yeDaoShenShiXiang'
                            );
                            await player.setZhiShiWu(
                                'shiXiangLingLi', 0
                            );
                            lib.skill.shenWeiLingZhuangShiFan.setForm(
                                player,
                                'aoShaGongWangZuo'
                            );
                        },
                        "trigger": {
                            "player": "changeZhiShiWuEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                            return !!event &&
                                event.zhiShiWu == 'shiXiangLingLi' &&
                                event.num < 0 &&
                                !player.storage.shiXiangZhongYanPaying &&
                                player.countZhiShiWu('shiXiangLingLi') == 0;
                        },
                        "content": async function(event, trigger, player) {
                            await lib.skill.yiShiHuiGui
                                .returnToPrincess(player);
                        },
                    },
                    "shiXiangLingLi": {
                        "intro": {
                            "name": "灵力",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_shiXiangLingLi.png",
                    },
                    "shenWeiLingZhuangSiFan": {
                        "audio": false,
                        "trigger": {
                            "global": "gameStart",
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "filter": function(event, player, name) {
                    if(name == 'gameStart') {
                        return !player.isZhiShiWuMax('siMiNaiBingJing');
                    }
                    return !player.isZhiShiWuMax('siMiNaiBingJing');
                        },
                        "content": async function(event, trigger, player) {
                    var isGameStart = event.triggername == 'gameStart';
                    if(isGameStart) {
                        game.trySkillAudio(
                            'shenWeiLingZhuangSiFanVoice', player, true
                        );
                    }
                    var num = isGameStart ? 2 : 1;
                    await player.addZhiShiWu('siMiNaiBingJing', num);
                },
                    },
                    "shenWeiLingZhuangSiFanVoice": {
                        "audio": "ext:永夜残响/audio/skill/siMiNai/shenWeiLingZhuangSiFan.mp3",
                    },
                    "bingJieTuXi": {
                        "audio": "ext:永夜残响/audio/skill/siMiNai/bingJieTuXi.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return lib.filter.cardDiscardable(card, player) &&
                        ['shui', 'guang'].includes(get.xiBie(card));
                },
                        "filter": function(event, player) {
                    if(!player.countCards('h', function(card) {
                        return lib.skill.bingJieTuXi.filterCard(card, player);
                    })) return false;
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            current.countZhiShiWu('siMiNaiDongJie') == 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side &&
                        target.countZhiShiWu('siMiNaiDongJie') == 0;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    await target.faShuDamage(1, player);
                    if(target && target.isIn()) {
                        await lib.skill.siMiNaiDongJie.addDongJie(player, target);
                    }
                },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "target": function(player, target) {
                            return get.damageEffect(target, 1) - 1;
                        },
                            },
                        },
                    },
                    "bingZhiShouHu": {
                        "audio": "ext:永夜残响/audio/skill/siMiNai/bingZhiShouHu.mp3",
                        "trigger": {
                            "global": "chengShouShangHaiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        event.player &&
                        event.player != player &&
                        event.player.side == player.side;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【冰之守护】，摸1张牌并令' +
                        get.translation(trigger.player) +
                        '受到的伤害-1？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.player;
                        if(!target || get.attitude(player, target) <= 0) {
                            return false;
                        }
                        var prevented = Math.min(1, trigger.num || 0);
                        var drawOverflow = Math.max(0,
                            player.countCards('h') + 1 -
                            player.getHandcardLimit());
                        if(prevented >= get.shiQi(target.side)) return true;
                        return get.damageEffect2(target, player, prevented) +
                            1.2 - drawOverflow * 2 > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.draw(1);
                    trigger.changeDamageNum(-1);
                },
                    },
                    "siMiNaiDeEZuoJu": {
                        "audio": "ext:永夜残响/audio/skill/siMiNai/siMiNaiDeEZuoJu.mp3",
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.target == player &&
                        event.player &&
                        event.player != player &&
                        event.yingZhan != true &&
                        player.countZhiShiWu('siMiNaiBingJing') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除1【冰晶】，发动【四糸奈的恶作剧】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var attacker = trigger && trigger.player;
                        if(!attacker || attacker.side == player.side) {
                            return false;
                        }
                        var xiBie = get.xiBie(trigger.card);
                        return player.countCards('h', function(card) {
                            return get.type(card, player) == 'gongJi' &&
                                (get.xiBie(card) == xiBie ||
                                    get.xiBie(card) == 'an');
                        }) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('siMiNaiBingJing', 1);
                    trigger.customArgs = trigger.customArgs || {};
                    trigger.customArgs.siMiNaiDeEZuoJu = player.playerid;
                },
                        "group": "siMiNaiDeEZuoJu_weiMingZhong",
                        "subSkill": {
                            "weiMingZhong": {
                                "trigger": {
                                    "global": "gongJiWeiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan != true &&
                                event.player == player &&
                                event.source &&
                                event.source != player &&
                                event.customArgs &&
                                event.customArgs.siMiNaiDeEZuoJu == player.playerid;
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.addDongJie(
                                player,
                                trigger.source
                            );
                        },
                            },
                        },
                    },
                    "bingZhiQiYuan": {
                        "audio": "ext:永夜残响/audio/skill/siMiNai/bingZhiQiYuan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "useCard": true,
                        "filterCard": function(card) {
                    return !!card &&
                        typeof card.hasDuYou == 'function' &&
                        (
                            card.hasDuYou('zhiLiaoShu') ||
                            card.hasDuYou('zhiYuZhiGuang')
                        );
                },
                        "filter": function(event, player) {
                    return player.hasCard(function(card) {
                        return lib.skill.bingZhiQiYuan.filterCard(card);
                    }, 'h');
                },
                        "filterTarget": function(card, player, target) {
                    return true;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    var cards = [];
                    if(target.countCards('h') > 0) {
                        cards = (await target.chooseCard(
                            'h',
                            1,
                            '冰之祈愿：选择1张手牌',
                            true
                        ).set('ai', function(card) {
                            var xiBie = get.xiBie(card);
                            if(['shui', 'guang'].includes(xiBie)) {
                                return 7 - get.value(card);
                            }
                            return 5 - get.value(card);
                        }).forResultCards() || []);
                    }
                    var card = cards[0];
                    var enhanced = !!card && ['shui', 'guang'].includes(get.xiBie(card));
                    if(enhanced) {
                        await target.showCards(
                            [card],
                            '冰之祈愿：展示水系或光系牌'
                        );
                    }
                    await target.changeZhiLiao(1, player);
                    if(card) await target.discard([card]).set('visible', true);
                    if(enhanced) await target.changeZhiLiao(1, player);
                    await player.addZhiShiWu('siMiNaiBingJing', 1);
                },
                        "ai": {
                            "order": 3.4,
                            "result": {
                                "target": function(player, target) {
                            if(target.side != player.side) return 0;
                            return get.zhiLiaoEffect2(target, player, 1) - 0.5;
                        },
                            },
                        },
                    },
                    "bingJieKuiLeiSaDan": {
                        "audio": "ext:永夜残响/audio/skill/siMiNai/bingJieKuiLeiSaDan.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countZhiShiWu('siMiNaiBingJing') >= 2;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu('siMiNaiBingJing', 2);
                    var control = await player.chooseControl([
                        '冰结结界',
                        '极寒风暴',
                    ]).set('prompt', '冰结傀儡·撒旦：选择一项发动')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var weakAllies = game.countPlayer(function(current) {
                                return current.side == player.side &&
                                    current.zhiLiao < current.getZhiLiaoLimit();
                            });
                            return weakAllies >= 2 ? '冰结结界' : '极寒风暴';
                        })
                        .forResultControl();
                    if(control == '冰结结界') {
                        var allies = game.filterPlayer(function(current) {
                            return current.side == player.side;
                        }).sortBySeat(player);
                        for(var target of allies) {
                            if(!target.isIn()) continue;
                            var canDiscard = target.countCards('he', function(card) {
                                return lib.filter.cardDiscardable(card, target);
                            }) > 0;
                            var choice;
                            if(canDiscard) {
                                choice = await target.chooseControl([
                                    '弃置1张牌',
                                    '+1【治疗】',
                                ]).set('prompt', '冰结结界：选择一项')
                                    .set('ai', function() {
                                        return '+1【治疗】';
                                    })
                                    .forResultControl();
                            } else choice = '+1【治疗】';
                            if(choice == '+1【治疗】') {
                                await target.changeZhiLiao(1, player);
                            } else {
                                await target.chooseToDiscard(
                                    'he',
                                    1,
                                    true,
                                    '冰结结界：弃置1张牌'
                                );
                            }
                        }
                    } else {
                        var targets = (await player.chooseTarget(
                            [1, 2],
                            true,
                            '极寒风暴：指定1至2名对手',
                            function(card, player, target) {
                                return target.side != player.side;
                            }
                        ).set('ai', function(target) {
                            var count = target.countZhiShiWu('siMiNaiDongJie');
                            return -get.attitude(_status.event.player, target) +
                                count * 2;
                        }).forResultTargets() || []);
                        for(var target of targets) {
                            await lib.skill.siMiNaiDongJie.addDongJie(
                                player,
                                target
                            );
                        }
                    }
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            current.countZhiShiWu('siMiNaiDongJie') > 0;
                    }) || game.countPlayer(function(current) {
                        return current.side == player.side &&
                            current.zhiLiao < current.getZhiLiaoLimit();
                    }) >= 2;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "siMiNaiBingJing": {
                        "charlotte": true,
                        "intro": {
                            "name": "冰晶",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/永夜残响/mark_siMiNaiBingJing.png",
                    },
                    "siMiNaiDongJie": {
                        "charlotte": true,
                        "intro": {
                            "name": "(专)【冻结】",
                            "content": "mark",
                            "max": 1,
                        },
                        "markimage": "extension/永夜残响/mark_siMiNaiDongJie.png",
                        "global": [
                            "siMiNaiDongJie_gongJiOrFaShu",
                            "siMiNaiDongJie_gongJi",
                            "siMiNaiDongJie_faShu",
                        ],
                        "addDongJie": async function(source, target) {
                    if(!target || !target.isIn()) return;
                    if(target.countZhiShiWu('siMiNaiDongJie') > 0) {
                        await target.faShuDamage(2, source || 'nosource');
                        return;
                    }
                    await target.addZhiShiWu('siMiNaiDongJie', 1, true);
                },
                        "clearDongJie": async function(target) {
                    if(!target) return;
                    var num = target.countZhiShiWu('siMiNaiDongJie');
                    if(num > 0) {
                        await target.removeZhiShiWu('siMiNaiDongJie', num);
                    }
                },
                        "isExtraAction": function(event, action, player) {
                    if(!event || typeof event.getParent != 'function') {
                        return false;
                    }
                    var phase = event.getParent('xingDong');
                    if(!phase || phase.name != 'xingDong') return false;
                    if(!player ||
                        event.player != player ||
                        phase.player != player ||
                        event.yingZhan === true) {
                        return false;
                    }
                    if(event.extraXingDongType == action) return true;
                    if(event.action !== true) return false;
                    if(action == 'gongJiOrFaShu') {
                        return phase.extraXingDong === true ||
                            event.firstAction !== true;
                    }
                    return phase.xingDong == action;
                },
                        "cancelExtraAction": async function(trigger, player) {
                    await lib.skill.siMiNaiDongJie.clearDongJie(player);
                    var phase = trigger.getParent('xingDong');
                    if(phase && phase.name == 'xingDong') {
                        phase.skipped = true;
                    }
                    trigger.cancel();
                    game.log(player, '的额外行动被【冻结】取消，本回合结束');
                },
                        "onremove": function(player) {
                    delete player.storage.siMiNaiDongJie;
                },
                        "subSkill": {
                            "gongJiOrFaShu": {
                                "trigger": {
                                    "player": "gongJiOrFaShuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('siMiNaiDongJie') == 1 &&
                                lib.skill.siMiNaiDongJie.isExtraAction(
                                    event,
                                    'gongJiOrFaShu',
                                    player
                                );
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.cancelExtraAction(
                                trigger,
                                player
                            );
                        },
                            },
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('siMiNaiDongJie') == 1 &&
                                lib.skill.siMiNaiDongJie.isExtraAction(
                                    event,
                                    'gongJi',
                                    player
                                );
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.cancelExtraAction(
                                trigger,
                                player
                            );
                        },
                            },
                            "faShu": {
                                "trigger": {
                                    "player": "faShuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('siMiNaiDongJie') == 1 &&
                                lib.skill.siMiNaiDongJie.isExtraAction(
                                    event,
                                    'faShu',
                                    player
                                );
                        },
                                "content": async function(event, trigger, player) {
                            await lib.skill.siMiNaiDongJie.cancelExtraAction(
                                trigger,
                                player
                            );
                        },
                            },
                        },
                    },
                    "keKeDi": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/keKeDi.mp3",
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.player &&
                        event.player.isIn() &&
                        !event.player.isZhiShiWuMax('shiCha');
                },
                        "content": async function(event, trigger, player) {
                    await trigger.player.addZhiShiWu('shiCha', 1, true);
                },
                    },
                    "baZhiDan": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/baZhiDan.mp3",
                        "trigger": {
                            "player": "chengShouShangHaiBefore",
                        },
                        "forced": true,
                        "firstDo": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !player.isZhiShiWuMax('shiCha');
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu('shiCha', 1, true);
                    trigger.changeDamageNum(-1);
                },
                    },
                    "yiZhiDan": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/yiZhiDan.mp3",
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.player &&
                        !!event.target &&
                        event.player.side == player.side &&
                        event.target.side != player.side &&
                        event.target.countZhiShiWu('shiCha') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除' + get.translation(trigger.target) +
                            '的1【时差】，发动【一之弹】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var attack = _status.event.getTrigger();
                        if(!attack || !attack.target) return false;
                        var target = attack.target;
                        var source = attack.player;
                        var targetWillOverflow = target.countCards('h') + 1 >
                            target.getHandcardLimit();
                        if(source == player) {
                            return targetWillOverflow ||
                                get.damageEffect2(target, player, 1) > 0;
                        }
                        if(player.countCards('h') + 2 >
                            player.getHandcardLimit()) return false;
                        return targetWillOverflow &&
                            get.attitude(player, source) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var source = trigger.player;
                    var target = trigger.target;
                    await target.removeZhiShiWu('shiCha', 1);
                    await target.draw(1);
                    trigger.changeDamageNum(1);
                    if(source != player) {
                        await player.faShuDamage(
                            2,
                            player,
                            'nocard'
                        );
                        if(source && source.isIn()) {
                            await source.addZhiShiWu('shiCha', 2, true);
                        }
                    }
                },
                    },
                    "erZhiDan": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/erZhiDan.mp3",
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "lastDo": true,
                        "priority": -100,
                        "filter": function(event, player) {
                    return !!event &&
                        !!event.target &&
                        (!event.customArgs ||
                            !event.customArgs.shiQiKuangSanMingZhong);
                },
                        "cost": async function(event, trigger, player) {
                    if(trigger.customArgs &&
                        trigger.customArgs.shiQiKuangSanMingZhong) {
                        event.result = { bool: false };
                        return;
                    }
                    var damage = Math.max(
                        0,
                        typeof trigger.damageNum == 'number' ?
                            trigger.damageNum : 0
                    );
                    var result = await player.chooseBool(
                        '是否发动【二之弹】，取消本次攻击伤害并放置' +
                        (damage + 1) + '【时差】？'
                    ).set('ai', function() {
                        var trigger = _status.event.getTrigger();
                        var target = trigger.target;
                        var damage = Math.max(
                            0,
                            typeof trigger.damageNum == 'number' ?
                                trigger.damageNum : 0
                        );
                        var capacity = Math.max(
                            0,
                            5 - target.countZhiShiWu('shiCha')
                        );
                        return capacity > 0;
                    }).forResult();
                    event.result = {
                        bool: !!result.bool,
                        cost_data: damage,
                    };
                },
                        "content": async function(event, trigger, player) {
                    trigger.customArgs = trigger.customArgs || {};
                    if(trigger.customArgs.shiQiKuangSanMingZhong) return;
                    trigger.customArgs.shiQiKuangSanMingZhong = 'erZhiDan';
                    var damage = Math.max(0, event.cost_data || 0);
                    trigger.setDamageNum(0);
                    if(trigger.target && trigger.target.isIn()) {
                        await trigger.target.addZhiShiWu(
                            'shiCha',
                            damage + 1,
                            true
                        );
                    }
                },
                    },
                    "siZhiDan": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/siZhiDan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.countZhiShiWu('shiCha') >= 2;
                },
                        "content": async function(event, trigger, player) {
                    var controls = ['1'];
                    if(player.countZhiShiWu('shiCha') >= 4) {
                        controls.push('2');
                    }
                    var control = await player.chooseControl(controls)
                        .set('prompt', '四之弹：选择X，移除2X【时差】并获得X【治疗】')
                        .set('ai', function() {
                            var player = _status.event.player;
                            if(player.countZhiShiWu('shiCha') >= 4 &&
                                player.zhiLiao + 1 <
                                    player.getZhiLiaoLimit()) {
                                return '2';
                            }
                            return '1';
                        })
                        .forResultControl();
                    var count = parseInt(control);
                    if(count != 1 && count != 2) return;
                    await player.removeZhiShiWu('shiCha', count * 2);
                    await player.changeZhiLiao(count, player);
                },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "player": function(player) {
                            return player.zhiLiao <
                                player.getZhiLiaoLimit() ? 2 : 0.2;
                        },
                            },
                        },
                    },
                    "qiZhiDan": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/qiZhiDan.mp3",
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "lastDo": true,
                        "priority": -100,
                        "filter": function(event, player) {
                    return !!event &&
                        !!event.target &&
                        event.target.countZhiShiWu('shiJianJingZhi') == 0 &&
                        (!event.customArgs ||
                            !event.customArgs.shiQiKuangSanMingZhong);
                },
                        "cost": async function(event, trigger, player) {
                    if(trigger.customArgs &&
                        trigger.customArgs.shiQiKuangSanMingZhong) {
                        event.result = { bool: false };
                        return;
                    }
                    event.result = await player.chooseBool(
                        '是否受到2点法术伤害，对' +
                        get.translation(trigger.target) +
                        '发动【七之弹】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        if(target.countZhiShiWu('shiCha') >= 4) return false;
                        return player.countZhiShiWu('shiCha') < 5 ||
                            player.countZhiLiao() > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    trigger.customArgs = trigger.customArgs || {};
                    if(trigger.customArgs.shiQiKuangSanMingZhong) return;
                    trigger.customArgs.shiQiKuangSanMingZhong = 'qiZhiDan';
                    await player.faShuDamage(
                        2,
                        player,
                        'nocard'
                    );
                    if(trigger.target &&
                        trigger.target.isIn() &&
                        trigger.target.countZhiShiWu('shiJianJingZhi') == 0) {
                        await trigger.target.addZhiShiWu(
                            'shiJianJingZhi',
                            1,
                            true
                        );
                    }
                },
                    },
                    "shiShiZhiCheng": {
                        "audio": "ext:永夜残响/audio/skill/shiQiKuangSan/shiShiZhiCheng.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing();
                },
                        "content": async function(event, trigger, player) {
                    var beforeBaoShi =
                        player.countNengLiang('baoShi');
                    await player.removeBiShaShuiJing();
                    var usedBaoShi =
                        player.countNengLiang('baoShi') < beforeBaoShi;
                    var targets = game.players.slice().sortBySeat(player);
                    for(var target of targets) {
                        if(target && target.isIn()) {
                            await target.faShuDamage(
                                1,
                                player,
                                'nocard'
                            );
                        }
                    }
                    if(usedBaoShi) {
                        for(var target of targets) {
                            if(target && target.isIn()) {
                                await target.addZhiShiWu(
                                    'shiCha',
                                    1,
                                    true
                                );
                            }
                        }
                    }
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    var score = 0;
                    game.countPlayer(function(target) {
                        score += get.damageEffect2(target, player, 1);
                    });
                    return score > 0;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "shiCha": {
                        "charlotte": true,
                        "intro": {
                            "name": "时差",
                            "content": "mark",
                            "max": 5,
                        },
                        "markimage": "extension/永夜残响/mark_shiCha.png",
                        "global": "shiCha_huiHe",
                        "subSkill": {
                            "huiHe": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('shiCha') > 0 &&
                                event.shiJianJingZhiSkipShiCha !== true;
                        },
                                "content": async function(event, trigger, player) {
                            var count = player.countZhiShiWu('shiCha');
                            if(count >= 5) {
                                await player.removeZhiShiWu('shiCha', count);
                                await player.draw(3);
                            } else {
                                await player.removeZhiShiWu('shiCha', 1);
                                await player.draw(1);
                            }
                        },
                            },
                        },
                    },
                    "shiJianJingZhi": {
                        "charlotte": true,
                        "intro": {
                            "name": "专属卡【时间静止】",
                            "content": "拥有者回合结束时，移除【时间静止】并+1【时差】；若增加后【时差】未达到上限，本次不结算【时差】。",
                            "max": 1,
                        },
                        "markimage": "extension/永夜残响/mark_shiJianJingZhi.png",
                        "global": "shiJianJingZhi_huiHe",
                        "subSkill": {
                            "huiHe": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.countZhiShiWu('shiJianJingZhi') > 0;
                        },
                                "content": async function(event, trigger, player) {
                            var count = player.countZhiShiWu('shiJianJingZhi');
                            await player.removeZhiShiWu('shiJianJingZhi', count);
                            var kuangSan = game.filterPlayer(function(current) {
                                return current.name == 'shiQiKuangSan' ||
                                    current.name1 == 'shiQiKuangSan' ||
                                    current.name2 == 'shiQiKuangSan';
                            })[0];
                            if(kuangSan) {
                                var audioPath =
                                    'ext:永夜残响/audio/skill/' +
                                    'shiQiKuangSan/' +
                                    'shiJianJingZhiJieChu.mp3';
                                game.broadcastAll(function(path, speaker) {
                                    if(!lib.config.background_audio) return;
                                    game.playAudio({
                                        path: path,
                                        spatialPlayer: speaker,
                                        addVideo: false,
                                        onError: function() {},
                                    });
                                }, audioPath, kuangSan);
                            }
                            await player.addZhiShiWu('shiCha', 1, true);
                            if(player.countZhiShiWu('shiCha') < 5) {
                                trigger.shiJianJingZhiSkipShiCha = true;
                            }
                        },
                            },
                        },
                    },
                    "baiSeFaDai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "白",
                        "intro": {
                            "name": "专属【白色发带】",
                            "content": function() { return lib.translate.baiSeFaDai_info; },
                        },
                        "group": "meiMeiXingTai",
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                        return num + 1;
                    },
                        },
                    },
                    "heiSeFaDai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "黑",
                        "intro": {
                            "name": "专属【黑色发带】",
                            "content": function() { return lib.translate.heiSeFaDai_info; },
                        },
                        "group": [
                            "siLingXingTai",
                            "siLingDiaoDu",
                        ],
                    },
                    "yanMoXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "炎",
                        "intro": {
                            "name": "炎魔形态",
                            "content": "发动【灼烂歼鬼】无需移除【灵力】，斧与炮同时生效；攻击每造成一次实际伤害，+1【治疗】。",
                        },
                        "group": [
                            "yanMoXingTai_zhiLiao",
                            "yanMoXingTai_qingChu",
                        ],
                        "subSkill": {
                            "zhiLiao": {
                                "trigger": {
                                    "source": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                event.faShu !== true &&
                                !!event.card &&
                                get.type(event.card) == 'gongJi';
                        },
                                "content": async function(event, trigger, player) {
                            await player.changeZhiLiao(1, player);
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "content": async function(event, trigger, player) {
                            await player.chongZhi();
                            player.removeSkill('yanMoXingTai');
                        },
                            },
                        },
                    },
                    "aoShaGongWangZuo": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "座",
                        "intro": {
                            "name": "专属【鏖杀公·王座形态】",
                            "content": "承受实际伤害后，+1【灵力】；可以发动王座形态技能。",
                        },
                    },
                    "aoShaGongJianRen": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "剑",
                        "intro": {
                            "name": "专属【鏖杀公·剑刃形态】",
                            "content": "攻击命中后，+1【灵力】；可以发动剑刃形态技能。",
                        },
                    },
                    "zuiHouZhiJianXingDong": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "终",
                        "intro": {
                            "name": "鏖杀公·最后之剑",
                            "content": function(storage, player) {
                        var effects =
                            player.storage.aoShaGongZuiHouZhiJianEffects ||
                            [];
                        return '下一次额外【攻击行动】获得：' +
                            effects.join('、');
                    },
                        },
                        "cleanup": function(player) {
                    delete player.storage.aoShaGongZuiHouZhiJianEffects;
                    lib.skill.shenWeiLingZhuangShiFan.setForm(
                        player,
                        'aoShaGongWangZuo'
                    );
                    player.removeSkill('zuiHouZhiJianXingDong');
                },
                        "group": [
                            "zuiHouZhiJianXingDong_sheZhi",
                            "zuiHouZhiJianXingDong_jieShu",
                            "zuiHouZhiJianXingDong_xingDongJieShu",
                            "zuiHouZhiJianXingDong_houBeiQingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.aoShaGongZuiHouZhiJianEffects;
                },
                        "subSkill": {
                            "sheZhi": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            if(!event) return false;
                            var action = event.getParent &&
                                event.getParent('gongJi');
                            return !!action &&
                                action.name == 'gongJi' &&
                                action.player == player &&
                                action.aoShaGongZuiHouZhiJian === true;
                        },
                                "content": function(event, trigger, player) {
                            var action = trigger.getParent &&
                                trigger.getParent('gongJi');
                            var effects =
                                action &&
                                    action
                                        .aoShaGongZuiHouZhiJianEffects ||
                                player.storage
                                    .aoShaGongZuiHouZhiJianEffects ||
                                [];
                            trigger.aoShaGongZuiHouZhiJian = true;
                            trigger.aoShaGongZuiHouZhiJianEffects =
                                effects.slice();
                            if(effects.includes('剑锋')) {
                                trigger.changeDamageNum(1);
                            }
                            if(effects.includes('斩空')) {
                                trigger.wuFaYingZhan();
                            }
                        },
                            },
                            "jieShu": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.aoShaGongZuiHouZhiJian === true;
                        },
                                "content": async function(event, trigger, player) {
                            var effects =
                                trigger.aoShaGongZuiHouZhiJianEffects ||
                                player.storage
                                    .aoShaGongZuiHouZhiJianEffects ||
                                [];
                            if(effects.includes('剑压') &&
                                trigger.target) {
                                var targets = game.filterPlayer(
                                    function(current) {
                                        return current.side != player.side &&
                                            current != trigger.target;
                                    }
                                ).sortBySeat(player);
                                for(var target of targets) {
                                    if(target.isIn()) {
                                        await target.faShuDamage(2, player);
                                    }
                                }
                            }
                            lib.skill.zuiHouZhiJianXingDong.cleanup(player);
                        },
                            },
                            "xingDongJieShu": {
                                "trigger": {
                                    "player": "gongJiAfter",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.name == 'gongJi' &&
                                event.aoShaGongZuiHouZhiJian === true &&
                                player.hasSkill(
                                    'zuiHouZhiJianXingDong'
                                );
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.zuiHouZhiJianXingDong.cleanup(player);
                        },
                            },
                            "houBeiQingChu": {
                                "trigger": {
                                    "player": "xingDongEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'zuiHouZhiJianXingDong'
                            );
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.zuiHouZhiJianXingDong.cleanup(player);
                        },
                            },
                        },
                    },
                    "meiMeiXingTai": {
                        "audio": "ext:永夜残响/audio/skill/wuHeQinLi/meiMeiXingTai.mp3",
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.source &&
                        event.source != player;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【妹妹形态】，弃置1张牌并+1【治疗】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        if(player.countZhiLiao() >=
                            player.getZhiLiaoLimit()) return false;
                        var cards = player.getCards('he').filter(
                            function(card) {
                                return lib.filter.cardDiscardable(card, player);
                            }
                        );
                        if(!cards.length) return true;
                        return Math.min.apply(null, cards.map(function(card) {
                            return get.value(card);
                        })) < 7;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    if(player.countCards('he', function(card) {
                        return lib.filter.cardDiscardable(card, player);
                    }) > 0) {
                        await player.chooseToDiscard(
                            'he',
                            1,
                            true,
                            '妹妹形态：弃置1张牌'
                        );
                    }
                    await player.changeZhiLiao(1, player);
                },
                    },
                    "siLingXingTai": {
                        "audio": "ext:永夜残响/audio/skill/wuHeQinLi/siLingXingTai.mp3",
                        "trigger": {
                            "global": [
                                "gongJiEnd",
                                "faShuEnd",
                            ],
                        },
                        "filter": function(event, player, name) {
                    if(!event || !event.player ||
                        event.player == player ||
                        event.player.side != player.side ||
                        player.countZhiShiWu('qinLiLingLi') < 3) {
                        return false;
                    }
                    var phase = event.getParent &&
                        event.getParent('xingDong');
                    if(!phase || phase.name != 'xingDong' ||
                        phase.player != event.player) return false;
                    return name == 'gongJiEnd' || name == 'faShuEnd';
                },
                        "cost": async function(event, trigger, player) {
                    var type = event.triggername == 'gongJiEnd' ?
                        '攻击行动' : '法术行动';
                    event.result = await player.chooseBool(
                        '是否移除3【灵力】，令' +
                        get.translation(trigger.player) +
                        '额外+1【' + type + '】？'
                    ).set('ai', function() {
                        return get.attitude(
                            _status.event.player,
                            _status.event.getTrigger().player
                        ) > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('qinLiLingLi', 3);
                    var target = trigger.player;
                    if(!Array.isArray(target.storage.extraXingDong)) {
                        target.storage.extraXingDong = [];
                    }
                    var action = event.triggername == 'gongJiEnd' ?
                        'gongJi' : 'faShu';
                    target.storage.extraXingDong.push({
                        xingDong: action,
                        qinLiSiLingXingTai: true,
                    });
                    game.log(
                        target,
                        '因',
                        player,
                        '的【司令形态】额外获得1个【' +
                            (action == 'gongJi' ?
                                '攻击行动' : '法术行动') +
                            '】'
                    );
                    lib.skill.shuangSeFaDai.flip(player);
                },
                    },
                    "siLingDiaoDu": {
                        "audio": "ext:永夜残响/audio/skill/wuHeQinLi/siLingDiaoDu.mp3",
                        "trigger": {
                            "global": "drawAfter",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    if(!event || !event.player ||
                        event.player == player ||
                        event.player.side != player.side) return false;
                    return true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【司令调度】？'
                    ).set('prompt2', '你弃置1张牌，然后令其弃1张牌，摸1张牌【强制】。')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.countCards('h') <
                                player.getHandcardLimit();
                        }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var target = trigger.player;
                    if(player.countCards('he', function(card) {
                        return lib.filter.cardDiscardable(card, player);
                    }) > 0) {
                        await player.chooseToDiscard(
                            'he', 1, true, '司令调度：弃置1张牌'
                        ).set('filterCard', function(card, player) {
                            return lib.filter.cardDiscardable(card, player);
                        }).set('ai', function(card) {
                            return 6 - get.value(card);
                        });
                    }
                    if(target && target.isIn() && target.countCards('he', function(card) {
                        return lib.filter.cardDiscardable(card, target);
                    }) > 0) {
                        await target.chooseToDiscard(
                            'he', 1, true, '司令调度：弃置1张牌'
                        ).set('filterCard', function(card, target) {
                            return lib.filter.cardDiscardable(card, target);
                        }).set('ai', function(card) {
                            return 6 - get.value(card);
                        });
                    }
                    if(target && target.isIn()) await target.draw(1);
                },
                    },
                },
                "translate": {
                    "siMiNaiBingJing": "冰晶",
                    "zheZhiManager": "羽阵管理",
                    "zheZhiGuangYu": "光羽",
                    "zheZhiGuangYu_info": "鸢一折纸专属指示物。自身初始上限4，其他角色上限2。<span class='tiaoJian'>（拥有者攻击命中后②）</span>将自身1枚<span style=\"color:#9A7027\">【光羽】</span>移给另一名未满角色，再由拥有者对其造成1点法术伤害③。",
                    "zheZhiHeiYu": "黑羽",
                    "zheZhiHeiYu_info": "反转折纸专属指示物，上限8。",
                    "zheZhiLingZhuang": "被动【神威灵装·一番】",
                    "zheZhiLingZhuang_info": "<span class='tiaoJian'>（游戏开始时）</span>+4<span style=\"color:#9A7027\">【光羽】</span>。",
                    "zheZhiJueMieTianShi": "响应【绝灭天使】",
                    "zheZhiJueMieTianShi_info": "<span class='tiaoJian'>（【攻击行动】或【法术行动】结束后）</span>将自身1枚<span style=\"color:#9A7027\">【光羽】</span>移给目标对手。",
                    "zheZhiJueWang": "被动【绝望反转】",
                    "zheZhiJueWang_info": "<span class='tiaoJian'>（承受实际伤害后⑤，且自身没有</span><span style=\"color:#9A7027\">【光羽】</span><span class='tiaoJian'>）</span>自身<span style=\"color:#9A7027\">【光羽】</span>上限-1。<span class='tiaoJian'>（</span><span style=\"color:#9A7027\">【光羽】</span><span class='tiaoJian'>上限降至0）</span>强制释放【绝灭天使·炮冠】，结算后变为【反转·折纸】，将<span style=\"color:#655078\">【黑羽】</span>上限重置为8，你+8<span style=\"color:#655078\">【黑羽】</span>。",
                    "zheZhiGuangJian": "法术【绝灭天使·光剑】",
                    "zheZhiGuangJian_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>对1名拥有<span style=\"color:#9A7027\">【光羽】</span>的对手造成1点法术伤害③。<span class='tiaoJian'>（目标有2枚</span><span style=\"color:#9A7027\">【光羽】</span><span class='tiaoJian'>）</span>本次伤害+1。然后将其1枚<span style=\"color:#9A7027\">【光羽】</span>移给另一名对手。",
                    "zheZhiTianYi": "响应【绝灭天使·天翼】",
                    "zheZhiTianYi_info": "<span class='tiaoJian'>（承受伤害时④，弃置1张牌，将自身1枚</span><span style=\"color:#9A7027\">【光羽】</span><span class='tiaoJian'>移给目标队友）</span>本次伤害-1，你对该队友造成1点法术伤害③。",
                    "zheZhiRiLun": "法术【绝灭天使·日轮】",
                    "zheZhiRiLun_info": "<span class='lan'>【水晶】</span>对所有对手各造成1点法术伤害③；伤害结算后，由你将自身<span style=\"color:#9A7027\">【光羽】</span>任意分配给目标对手。",
                    "zheZhiPaoGuan": "法术【绝灭天使·炮冠】",
                    "zheZhiPaoGuan_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（自身没有</span><span style=\"color:#9A7027\">【光羽】</span><span class='tiaoJian'>）</span>回收其他角色的全部<span style=\"color:#9A7027\">【光羽】</span>，依座次对原持有者造成等同于其原有<span style=\"color:#9A7027\">【光羽】</span>数量的法术伤害③；再对其中1名原有2枚<span style=\"color:#9A7027\">【光羽】</span>的角色额外造成2点法术伤害③。",
                    "zheZhiFanLingZhuang": "被动【反灵装·一番】",
                    "zheZhiFanLingZhuang_info": "你的【治疗】上限-2；你造成与承受的所有伤害+1。",
                    "zheZhiJuJue": "被动【救世魔王·拒绝】",
                    "zheZhiJuJue_info": "<span class='tiaoJian'>（其他角色对你造成实际伤害后⑤）</span>将自身1枚<span style=\"color:#655078\">【黑羽】</span>移给伤害来源，再将1枚移给目标队友；然后由你对两者各造成1点法术伤害③。<span class='tiaoJian'>（目标在本次转移前已有</span><span style=\"color:#655078\">【黑羽】</span><span class='tiaoJian'>）</span>其本次伤害+1。",
                    "zheZhiHeiYuShu": "法术【救世魔王·黑羽】",
                    "zheZhiHeiYuShu_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>对1名对手造成等同于其<span style=\"color:#655078\">【黑羽】</span>数量的法术伤害③，再将自身1枚<span style=\"color:#655078\">【黑羽】</span>移给该角色。",
                    "zheZhiJueMie": "法术【救世魔王·绝灭】",
                    "zheZhiJueMie_info": "<span style=\"color:#E02B17\">【宝石】</span>回收其他角色的全部<span style=\"color:#655078\">【黑羽】</span>，依座次对原持有者造成其原有<span style=\"color:#655078\">【黑羽】</span>数量一半（向上取整）的法术伤害③；然后对自己造成<span style=\"color:#655078\">【黑羽】</span>总数一半（向上取整）的法术伤害③。",
                    "zheZhiYiShiHuiGui": "被动【意识回归】",
                    "zheZhiYiShiHuiGui_info": "自身每实际减少1枚<span style=\"color:#655078\">【黑羽】</span>，自身<span style=\"color:#655078\">【黑羽】</span>上限同步-1。<span class='tiaoJian'>（自身</span><span style=\"color:#655078\">【黑羽】</span><span class='tiaoJian'>降为0）</span>在当前技能完整结算后免费强制释放【救世魔王·绝灭】，将<span style=\"color:#9A7027\">【光羽】</span>上限恢复至4并获得4枚<span style=\"color:#9A7027\">【光羽】</span>，变回普通折纸。",
                    "siMiNaiBingJing_info": "四糸乃的专属指示物，上限为5。",
                    "siMiNaiDongJie": "专属【冻结】",
                    "siMiNaiDongJie_info": "四糸乃专属标记<br><span class='tiaoJian'>（拥有者即将开始额外【攻击行动】或【法术行动】时）</span>移除<span style=\"color:#666666\">【冻结】</span>，取消该行动并结束其回合；",
                    "shenWeiLingZhuangSiFan": "被动【神威灵装·四番】",
                    "shenWeiLingZhuangSiFan_info": "<span class='tiaoJian'>（游戏开始时）</span>+2<span style=\"color:#8C6AA6\">【冰晶】</span>。<span class='tiaoJian'>（发动【冰之祈愿】或执行【特殊行动】后）</span>+1<span style=\"color:#8C6AA6\">【冰晶】</span>。",
                    "bingJieTuXi": "法术【冰结吐息】",
                    "bingJieTuXi_info": "<span class='tiaoJian'>（弃置1张水系或光系牌【展示】）</span>对1名没有<span style=\"color:#666666\">【冻结】</span>的目标对手造成1点法术伤害③，然后对其施加<span style=\"color:#666666\">【冻结】</span>。",
                    "bingZhiShouHu": "响应【冰之守护】",
                    "bingZhiShouHu_info": "<span class='tiaoJian'>（1名其他队友即将承受伤害时④）</span>摸1张牌【强制】，使本次伤害-1。",
                    "siMiNaiDeEZuoJu": "响应【四糸奈的恶作剧】",
                    "siMiNaiDeEZuoJu_info": "<span class='tiaoJian'>（成为其他角色主动攻击的目标时①，移除1</span><span style=\"color:#8C6AA6\">【冰晶】</span><span class='tiaoJian'>）</span>若该攻击未命中，对攻击者施加<span style=\"color:#666666\">【冻结】，</span><span class='tiaoJian'>（若其已有冻结）</span><span style=\"color:#666666\">对其造成2点法术伤害</span>。",
                    "bingZhiQiYuan": "法术【冰之祈愿】【独】",
                    "bingZhiQiYuan_info": "可以将带有独有技【治疗术】或【治愈之光】的手牌作为本技能使用。目标角色+1【治疗】并弃置1张牌；<span class='tiaoJian'>（若其弃置水系或光系牌【展示】）</span>令其额外+1【治疗】。",
                    "bingJieKuiLeiSaDan": "启动【冰结傀儡·撒旦】",
                    "bingJieKuiLeiSaDan_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（移除2</span><span style=\"color:#8C6AA6\">【冰晶】</span><span class='tiaoJian'>）</span>选择一项：<br>·【冰结结界】：所有我方角色各选择弃置1张牌或+1【治疗】；<br>·【极寒风暴】：对1至2名目标对手各施加<span style=\"color:#666666\">【冻结】，</span><span class='tiaoJian'>（若其已有冻结）</span><span style=\"color:#666666\">对其造成2点法术伤害</span>。",
                    "shiCha": "时差",
                    "shiCha_info": "时崎狂三的专属指示物，每名角色上限为5。<span class='tiaoJian'>（拥有者回合结束时）</span>：<br>·未满：移除1<span class='hong'>【时差】</span>，摸1张牌【强制】；<br>·已满：移除全部<span class='hong'>【时差】</span>，摸3张牌【强制】。",
                    "shiJianJingZhi": "专属【时间静止】",
                    "shiJianJingZhi_info": "<span class='tiaoJian'>（拥有者回合结束时）</span>移除【时间静止】并+1<span class='hong'>【时差】</span>；<span class='tiaoJian'>（若</span><span class='hong'>【时差】</span><span class='tiaoJian'>未满）</span>本次不结算其回合结束效果。",
                    "keKeDi": "被动【刻刻帝】",
                    "keKeDi_info": "<span class='tiaoJian'>（对1名角色造成实际伤害后⑤）</span>令其<span class='hong'>【时差】</span>+1。",
                    "baZhiDan": "被动【八之弹】",
                    "baZhiDan_info": "<span class='tiaoJian'>（你承受伤害时④）</span>若<span class='hong'>【时差】</span>未满，+1【时差】，使本次伤害-1。",
                    "yiZhiDan": "响应【一之弹】",
                    "yiZhiDan_info": "<span class='tiaoJian'>（我方角色主动攻击拥有</span><span class='hong'>【时差】</span><span class='tiaoJian'>的对手时①）</span>移除攻击目标1<span class='hong'>【时差】，</span>并令其摸1张牌【强制】，本次攻击伤害额外+1；<span class='tiaoJian'>（若攻击来源不是你）</span>你承受2点法术伤害③，然后对攻击来源施加2<span class='hong'>【时差】</span>。",
                    "erZhiDan": "响应【二之弹】",
                    "erZhiDan_info": "<span class='tiaoJian'>（攻击命中后②）</span>取消本次攻击伤害，改为对目标施加X+1<span class='hong'>【时差】</span>；X为本次攻击原本的实际伤害。不能与【七之弹】同时发动。",
                    "siZhiDan": "法术【四之弹】",
                    "siZhiDan_info": "<span class='tiaoJian'>（移除2X</span><span class='hong'>【时差】</span><span class='tiaoJian'>）</span>+X【治疗】。",
                    "qiZhiDan": "响应【七之弹】",
                    "qiZhiDan_info": "<span class='tiaoJian'>（攻击命中后②）</span>对自己造成2点法术伤害③，对目标施加【时间静止】。不能与【二之弹】同时发动。",
                    "shiShiZhiCheng": "启动【噬时之城】",
                    "shiShiZhiCheng_info": "<span class='lan'>【水晶】</span>对所有角色各造成1点法术伤害③；<span class='tiaoJian'>（若实际支付</span><span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>）</span>伤害全部结算后对所有角色各施加1<span class='hong'>【时差】</span>。",
                    "qinLiLingLi": "灵力",
                    "qinLiLingLi_info": "五河琴里的专属指示物，上限为4。",
                    "qinLiBaiSeFaDaiInfo": "专属【白色发带】",
                    "qinLiBaiSeFaDaiInfo_info": "【治疗】上限+1。<br><span class='greentext'>响应【妹妹形态】【回合限定】</span><br><span class='tiaoJian'>（承受其他角色造成的实际伤害后⑤）</span>你弃置1张牌；+1【治疗】。",
                    "qinLiHeiSeFaDaiInfo": "专属【黑色发带】",
                    "qinLiHeiSeFaDaiInfo_info": "<span class='greentext'>响应【司令形态】</span><br><span class='tiaoJian'>（队友的【攻击行动】或【法术行动】结束后，移除3<span style=\"color:#8E44AD\">【灵力】</span>）</span>令其获得1个同类型额外行动，然后翻面。<br><span class='greentext'>响应【司令调度】【回合限定】</span><br><span class='tiaoJian'>（队友摸牌后）</span>你弃置1张牌，然后令其弃1张牌，摸1张牌【强制】。",
                    "shuangSeFaDai": "被动【双色发带】",
                    "shuangSeFaDai_info": "<span class='tiaoJian'>（游戏开始时）</span>以【白色发带】放置，反面为【黑色发带】。<span class='tiaoJian'>（你的回合开始时）</span>可以翻面。",
                    "baiSeFaDai": "专属【白色发带】",
                    "baiSeFaDai_info": "【治疗】上限+1。<br><span class='greentext'>响应【妹妹形态】【回合限定】</span><br><span class='tiaoJian'>（承受其他角色造成的实际伤害后⑤）</span>你弃置1张牌；+1【治疗】。",
                    "heiSeFaDai": "专属【黑色发带】",
                    "heiSeFaDai_info": "<span class='greentext'>响应【司令形态】</span><br><span class='tiaoJian'>（队友的【攻击行动】或【法术行动】结束后，移除3<span style=\"color:#8E44AD\">【灵力】</span>）</span>令其获得1个同类型额外行动，然后翻面。<br><span class='greentext'>响应【司令调度】【回合限定】</span><br><span class='tiaoJian'>（队友摸牌后）</span>你弃置1张牌，然后令其弃1张牌，摸1张牌【强制】。",
                    "qinLiYanLing": "被动【炎灵】",
                    "qinLiYanLing_info": "<span class='tiaoJian'>（你每次造成或受到实际伤害后⑤）</span>+1<span style=\"color:#8E44AD\">【灵力】</span>。",
                    "lingLiShiKong": "被动【灵力失控】",
                    "lingLiShiKong_info": "<span class='tiaoJian'>（</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>达到上限时）</span>将【双色发带】翻至【白色发带】；<span class='tiaoJian'>（若已经是该形态）</span>承受1点法术伤害③，然后移除1<span style=\"color:#8E44AD\">【灵力】</span>。",
                    "zhuoLanJianGui": "响应【灼烂歼鬼】",
                    "zhuoLanJianGui_info": "<span class='tiaoJian'>（主动攻击前①，移除1</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>选择一项：<br>·【斧】：本次攻击伤害额外+1；<br>·【炮】：指定攻击目标以外的1名对手；<span class='tiaoJian'>（若本次攻击命中）</span>对其造成2点法术伤害③。",
                    "yanMoXianXian": "启动【炎魔显现】",
                    "yanMoXianXian_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（移除3</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>额外+1【攻击行动】，然后【横置】并进入【炎魔形态】。<br><span class='tiaoJian'>（处于【炎魔形态】时）</span>你发动【灼烂歼鬼】无需移除<span style=\"color:#8E44AD\">【灵力】</span>，两个效果同时生效，<span class='tiaoJian'>（你的攻击造成伤害后③）</span>你+1【治疗】。<br><span class='tiaoJian'>（回合结束时）</span>你【重置】，脱离【炎魔形态】。",
                    "yanMoXingTai": "炎魔形态",
                    "yanMoXingTai_info": "【灼烂歼鬼】无需移除<span style=\"color:#8E44AD\">【灵力】</span>且两项同时生效。<span class='tiaoJian'>（主动或应战攻击每造成1次实际伤害）</span>+1【治疗】。<span class='tiaoJian'>（回合结束时）</span>【重置】并退出。",
                    "meiMeiXingTai": "响应【妹妹形态】【回合限定】",
                    "meiMeiXingTai_info": "<span class='tiaoJian'>（承受其他角色造成的实际伤害后⑤）</span>你弃置1张牌；+1【治疗】。",
                    "siLingXingTai": "响应【司令形态】",
                    "siLingXingTai_info": "<span class='tiaoJian'>（队友的【攻击行动】或【法术行动】结束后，移除3<span style=\"color:#8E44AD\">【灵力】</span>）</span>令其获得1个同类型额外行动，然后翻面。",
                    "siLingDiaoDu": "响应【司令调度】【回合限定】",
                    "siLingDiaoDu_info": "<span class='tiaoJian'>（队友摸牌后）</span>你弃置1张牌，然后令其弃1张牌，摸1张牌【强制】。",
                    "shiXiangLingLi": "灵力",
                    "shiXiangLingLi_info": "夜刀神十香与反转·十香的专属指示物，上限为5。",
                    "fanZhuanLingLi": "反转灵力",
                    "fanZhuanLingLi_info": "夜刀神十香的专属指示物，上限为5。",
                    "shenWeiLingZhuangShiFan": "被动【神威灵装·十番】",
                    "shenWeiLingZhuangShiFan_info": "<span class='tiaoJian'>（游戏开始时）</span>将【鏖杀公】以【王座形态】放置，并+2<span style=\"color:#8E44AD\">【灵力】</span>。<br>·【王座形态】：承受实际伤害后⑤，+1<span style=\"color:#8E44AD\">【灵力】</span>；<br>·【剑刃形态】：攻击命中后②，+1<span style=\"color:#8E44AD\">【灵力】</span>。",
                    "aoShaGongWangZuo": "专属【鏖杀公·王座形态】",
                    "aoShaGongWangZuo_info": "<span class='tiaoJian'>（承受实际伤害后⑤）</span>+1<span style=\"color:#8E44AD\">【灵力】</span>；可以发动【王座显现】【灵装护壁】与【公主降临】。",
                    "aoShaGongJianRen": "专属【鏖杀公·剑刃形态】",
                    "aoShaGongJianRen_info": "<span class='tiaoJian'>（攻击命中后②）</span>+1<span style=\"color:#8E44AD\">【灵力】</span>；可以发动【鏖杀公】与【鏖杀公·最后之剑】。",
                    "wangZuoXianXian": "响应【王座显现】",
                    "wangZuoXianXian_info": "<span class='tiaoJian'>（【王座形态】下，应战攻击前①，移除1</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>本次攻击伤害额外+1；<span class='tiaoJian'>（若命中）</span>攻击结算结束后翻至【剑刃形态】。",
                    "lingZhuangHuBi": "响应【灵装护壁】",
                    "lingZhuangHuBi_info": "<span class='tiaoJian'>（【王座形态】下，即将承受伤害时④，移除X<span style=\"color:#8E44AD\">【灵力】</span>，X最大为2）</span>弃置X张牌，使本次伤害-X。",
                    "gongZhuJiangLin": "法术【公主降临】",
                    "gongZhuJiangLin_info": "<span class='tiaoJian'>（【王座形态】下，移除1</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>将【鏖杀公】翻至【剑刃形态】，然后额外+1【攻击行动】。",
                    "aoShaGong": "响应【鏖杀公】",
                    "aoShaGong_info": "<span class='tiaoJian'>（【剑刃形态】下，主动攻击前①，选择并移除X</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>，X最大为2）</span><br>·X=1：本次攻击伤害额外+1；<br>·X=2：本次攻击无视【圣盾】，且目标无法使用【圣光】或【暗灭】。<br><span class='tiaoJian'>（【攻击行动】结束后）</span>若<span style=\"color:#8E44AD\">【灵力】</span>为0，翻至【王座形态】。",
                    "huangDouFenMianBao": "启动【黄豆粉面包】",
                    "huangDouFenMianBao_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（弃置1张牌）</span>选择+1【治疗】或+2<span style=\"color:#8E44AD\">【灵力】</span>。",
                    "aoShaGongZuiHouZhiJian": "响应【鏖杀公·最后之剑】",
                    "aoShaGongZuiHouZhiJian_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（【剑刃形态】下，【攻击行动】结束后，移除3</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>从【剑锋】【斩空】【剑压】中选择两项，然后额外+1【攻击行动】,本次攻击行动不能发动【鏖杀公】：<br>·【剑锋】：主动攻击伤害额外+1；<br>·【斩空】：主动攻击无法被应战；<br>·【剑压】：<span class='tiaoJian'>（主动攻击命中并结算后）</span>对攻击目标以外的所有对手各造成2点法术伤害③。<br><span class='tiaoJian'>（行动结束后）</span>将【鏖杀公】翻至【王座形态】。",
                    "jueWangFanZhuan": "响应【绝望反转】",
                    "jueWangFanZhuan_info": "每当消耗<span style=\"color:#8E44AD\">【灵力】</span>时，获得等量<span class='hong'>【反转灵力】</span>。<span class='tiaoJian'>（【反转灵力】达到上限，你承受实际伤害导致己方士气下降后⑤）</span>移除你全部【治疗】与<span class='hong'>【反转灵力】</span>，将<span style=\"color:#8E44AD\">【灵力】</span>调整至5，然后变为【反转·十香】。",
                    "fanLingZhuangShiFan": "被动【反灵装·十番】",
                    "fanLingZhuangShiFan_info": "你的【治疗】上限-2；你造成与承受的所有伤害额外+1。",
                    "huiMieChongDong": "被动【毁灭冲动】【回合限定】",
                    "huiMieChongDong_info": "<span class='tiaoJian'>（你攻击造成实际伤害后⑤）</span>+1<span style=\"color:#8E44AD\">【灵力】</span>，额外+1【攻击行动】。",
                    "baoNueGong": "响应【暴虐公】",
                    "baoNueGong_info": "<span class='tiaoJian'>（主动攻击前①，移除至多2</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>每移除1<span style=\"color:#8E44AD\">【灵力】</span>，本次攻击伤害额外+1。<span class='tiaoJian'>（【攻击行动】结束后）</span>对自己造成1点法术伤害③。与【暴虐公·终焉之剑】不能同时发动。",
                    "baoNueGongZhongYanZhiJian": "响应【暴虐公·终焉之剑】",
                    "baoNueGongZhongYanZhiJian_info": "<span style=\"color:#E02B17\">【宝石】</span>×1<span class='tiaoJian'>（主动攻击前①，移除3</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>）</span>本次攻击无法被应战、无视【圣盾】，攻击伤害额外+2。<span class='tiaoJian'>（若命中）</span>对其余所有对手各造成1点法术伤害③，对自己造成2点法术伤害③，并结束【反转形态】。与【暴虐公】不能同时发动。",
                    "yiShiHuiGui": "被动【意识回归】",
                    "yiShiHuiGui_info": "<span class='tiaoJian'>（你的</span><span style=\"color:#8E44AD\">【灵力】</span><span class='tiaoJian'>降为0）</span>结束【反转形态】，将<span style=\"color:#8E44AD\">【灵力】</span>调整至0，并以【王座形态】放置【鏖杀公】。",
                    "zuiHouZhiJianXingDong": "鏖杀公·最后之剑",
                    "zuiHouZhiJianXingDong_info": "下一次额外【攻击行动】获得最后之剑所选择的两项效果；该行动结束或被取消后翻至【王座形态】并清除效果。",
                },
            },
            "intro": "添加角色五河琴里、夜刀神十香、四糸乃、时崎狂三、鸢一折纸；含隐藏反转形态。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "2.3",
        },
        "files": {
            "character": [
                "wHeQingLi.jpg",
                "yuanYiZheZhi.png",
                "fanZhuanZheZhi.png",
                "shiXiang.jpg",
                "fanZhuanShiXiang.png",
                "siMiNai.jpg",
                "shiQiKuangSan.jpg",
            ],
            "card": [],
            "skill": [
                "mark_qinLiLingLi.png",
                "mark_zheZhiGuangYu.png",
                "mark_zheZhiHeiYu.png",
                "mark_shiXiangLingLi.png",
                "mark_fanZhuanLingLi.png",
                "mark_siMiNaiBingJing.png",
                "mark_siMiNaiDongJie.png",
                "mark_shiCha.png",
                "mark_shiJianJingZhi.png",
            ],
            "audio": [
                "audio/skill/siMiNai/shenWeiLingZhuangSiFan.mp3",
                "audio/skill/siMiNai/bingJieTuXi.mp3",
                "audio/skill/siMiNai/bingZhiShouHu.mp3",
                "audio/skill/siMiNai/siMiNaiDeEZuoJu.mp3",
                "audio/skill/siMiNai/bingZhiQiYuan.mp3",
                "audio/skill/siMiNai/bingJieKuiLeiSaDan.mp3",
                "audio/action/siMiNai/gouMai.mp3",
                "audio/action/siMiNai/heCheng.mp3",
                "audio/action/siMiNai/tiLian.mp3",
                "audio/skill/shiQiKuangSan/keKeDi.mp3",
                "audio/skill/shiQiKuangSan/baZhiDan.mp3",
                "audio/skill/shiQiKuangSan/yiZhiDan.mp3",
                "audio/skill/shiQiKuangSan/erZhiDan.mp3",
                "audio/skill/shiQiKuangSan/siZhiDan.mp3",
                "audio/skill/shiQiKuangSan/qiZhiDan.mp3",
                "audio/skill/shiQiKuangSan/shiShiZhiCheng.mp3",
                "audio/skill/shiQiKuangSan/shiJianJingZhiJieChu.mp3",
                "audio/action/shiQiKuangSan/gouMai.mp3",
                "audio/action/shiQiKuangSan/heCheng.mp3",
                "audio/action/shiQiKuangSan/tiLian.mp3",
                "audio/skill/wuHeQinLi/shuangSeFaDaiBai.mp3",
                "audio/skill/wuHeQinLi/shuangSeFaDaiHei.mp3",
                "audio/skill/wuHeQinLi/qinLiYanLing.mp3",
                "audio/skill/wuHeQinLi/lingLiShiKong.mp3",
                "audio/skill/wuHeQinLi/zhuoLanJianGuiFu.mp3",
                "audio/skill/wuHeQinLi/zhuoLanJianGuiPao.mp3",
                "audio/skill/wuHeQinLi/yanMoXianXian.mp3",
                "audio/skill/wuHeQinLi/meiMeiXingTai.mp3",
                "audio/skill/wuHeQinLi/siLingXingTai.mp3",
                "audio/skill/wuHeQinLi/siLingDiaoDu.mp3",
                "audio/action/wuHeQinLi/gouMai.mp3",
                "audio/action/wuHeQinLi/heCheng.mp3",
                "audio/action/wuHeQinLi/tiLian.mp3",
                "audio/skill/yeDaoShenShiXiang/shenWeiLingZhuangShiFan.mp3",
                "audio/skill/yeDaoShenShiXiang/wangZuoXianXian.mp3",
                "audio/skill/yeDaoShenShiXiang/lingZhuangHuBi.mp3",
                "audio/skill/yeDaoShenShiXiang/gongZhuJiangLin.mp3",
                "audio/skill/yeDaoShenShiXiang/aoShaGong.mp3",
                "audio/skill/yeDaoShenShiXiang/huangDouFenMianBao.mp3",
                "audio/skill/yeDaoShenShiXiang/aoShaGongZuiHouZhiJian.mp3",
                "audio/skill/yeDaoShenShiXiang/jueWangFanZhuan.mp3",
                "audio/action/yeDaoShenShiXiang/gouMai.mp3",
                "audio/action/yeDaoShenShiXiang/heCheng.mp3",
                "audio/action/yeDaoShenShiXiang/tiLian.mp3",
                "audio/skill/fanZhuanShiXiang/huiMieChongDong.mp3",
                "audio/skill/fanZhuanShiXiang/baoNueGong.mp3",
                "audio/skill/fanZhuanShiXiang/baoNueGongZhongYanZhiJian.mp3",
                "audio/skill/fanZhuanShiXiang/yiShiHuiGui.mp3",
                "audio/action/fanZhuanShiXiang/gouMai.mp3",
                "audio/action/fanZhuanShiXiang/heCheng.mp3",
                "audio/action/fanZhuanShiXiang/tiLian.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiLingZhuang.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiJueMieTianShi.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiJueWang.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiGuangJian.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiTianYi.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiRiLun.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiPaoGuan.mp3",
                "audio/skill/yuanYiZheZhi/zheZhiGuangYu.mp3",
                "audio/action/yuanYiZheZhi/gouMai.mp3",
                "audio/action/yuanYiZheZhi/heCheng.mp3",
                "audio/action/yuanYiZheZhi/tiLian.mp3",
                "audio/skill/fanZhuanZheZhi/zheZhiFanLingZhuang.mp3",
                "audio/skill/fanZhuanZheZhi/zheZhiJuJue.mp3",
                "audio/skill/fanZhuanZheZhi/zheZhiHeiYuShu.mp3",
                "audio/skill/fanZhuanZheZhi/zheZhiJueMie.mp3",
                "audio/skill/fanZhuanZheZhi/zheZhiYiShiHuiGui.mp3",
                "audio/skill/fanZhuanZheZhi/zheZhiHeiYu.mp3",
                "audio/action/fanZhuanZheZhi/gouMai.mp3",
                "audio/action/fanZhuanZheZhi/heCheng.mp3",
                "audio/action/fanZhuanZheZhi/tiLian.mp3",
            ],
        },
        "connect": true,
    };
});
