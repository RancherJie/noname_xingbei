game.import('extension', function(lib, game, ui, get, ai, _status) {
    'use strict';
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
    const menuTrack='ext:轮回遗梦/audio/bgm/yuJianJiangHu.mp3';
    const sharedMenuKey='lhym_suMing_menu_random';
    const sharedMenuTracks=['ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3',menuTrack];
    lib.lhymMenuMusicKey=sharedMenuKey;
    lib.lhymBattleMusic={
        tracks:function(){
            const tracks=[];
            const matches=(id)=>game.hasPlayer(p=>p.isIn()&&[p.name,p.name1,p.name2].includes(id));
            const add=(src)=>{if(!tracks.includes(src))tracks.push(src);};
            if(matches('jingTian'))add('ext:轮回遗梦/audio/bgm/yuManTang.mp3');
            if(matches('longKui')){
                const red=game.hasPlayer(p=>p.isIn()&&[p.name,p.name1,p.name2].includes('longKui')&&p.storage.lhym_red===true);
                add('ext:轮回遗梦/audio/bgm/'+(red?'zhuShaBian':'qingYuAn')+'.mp3');
            }
            if(matches('xueJian'))add('ext:轮回遗梦/audio/bgm/huanHunCao.mp3');
            if(matches('xieLing'))add('ext:轮回遗梦/audio/bgm/linWeiBianDiao.mp3');
            else if(matches('xieJianXian'))add('ext:轮回遗梦/audio/bgm/linWei.mp3');
            return tracks;
        },
        chooseTrack:function(){
            const tracks=this.tracks();
            return tracks.length?tracks[Math.floor(Math.random()*tracks.length)]:null;
        },
        playTrack:function(src){
            game.broadcastAll(function(track){
                if(!_status.lhymBgmStarted){
                    _status.lhymHadTempMusic=Object.prototype.hasOwnProperty.call(_status,'tempMusic');
                    _status.lhymOriginalTempMusic=_status.tempMusic;
                }
                _status.lhymBgmStarted=true;
                _status.tempMusic=track;
                game.playBackgroundMusic();
                if(ui.backgroundMusic&&lib.config.background_music!=='music_off'){
                    ui.backgroundMusic.loop=true;
                    ui.backgroundMusic.currentTime=0;
                    const playing=ui.backgroundMusic.play();
                    if(playing?.catch)playing.catch(function(){});
                }
            },src);
        },
    };
    // Explicit speech queue: standard skill audio remains false to prevent double playback.
    const V=lib.lhymVoice={
        files:["audio/skill/jingTian/choose_magic.mp3","audio/skill/jingTian/choose_sword.mp3","audio/skill/jingTian/yongAn.mp3","audio/skill/jingTian/dianDang.mp3","audio/skill/jingTian/feiLong.mp3","audio/skill/jingTian/zhuJian.mp3","audio/skill/jingTian/huiYan.mp3","audio/skill/jingTian/yinDan.mp3","audio/skill/jingTian/renJian.mp3","audio/skill/jingTian/jingHua.mp3","audio/skill/jingTian/canYing.mp3","audio/skill/jingTian/complete_magic.mp3","audio/skill/jingTian/recipe_0.mp3","audio/skill/jingTian/recipe_1.mp3","audio/skill/jingTian/recipe_2.mp3","audio/skill/jingTian/recipe_3.mp3","audio/skill/jingTian/recipe_4.mp3","audio/skill/jingTian/recipe_5.mp3","audio/skill/jingTian/recipe_6.mp3","audio/skill/jingTian/recipe_7.mp3","audio/skill/jingTian/recipe_8.mp3","audio/skill/jingTian/recipe_9.mp3","audio/skill/jingTian/recipe_10.mp3","audio/skill/jingTian/zhaoDan.mp3","audio/skill/jingTian/forge_1.mp3","audio/skill/jingTian/forge_2.mp3","audio/skill/jingTian/forge_3.mp3","audio/skill/jingTian/fengMang.mp3","audio/skill/jingTian/houFa.mp3","audio/skill/jingTian/poZhen.mp3","audio/skill/jingTian/lianZhan.mp3","audio/skill/jingTian/leiDong.mp3","audio/skill/jingTian/baHuang.mp3","audio/skill/jingTian/gift_snow.mp3","audio/skill/jingTian/gift_kui.mp3","audio/skill/jingTian/take_snow.mp3","audio/skill/jingTian/take_kui.mp3","audio/skill/jingTian/flower.mp3","audio/skill/jingTian/resonance.mp3","audio/skill/jingTian/gouMai.mp3","audio/skill/jingTian/heCheng.mp3","audio/skill/xueJian/huaYing.mp3","audio/skill/xueJian/huZhu.mp3","audio/skill/xueJian/wuDu.mp3","audio/skill/xueJian/wuDu_pearl.mp3","audio/skill/xueJian/lvBo.mp3","audio/skill/xueJian/tianLing.mp3","audio/skill/xueJian/shenShu.mp3","audio/skill/xueJian/gift.mp3","audio/skill/xueJian/take.mp3","audio/skill/xueJian/flower.mp3","audio/skill/xueJian/complete_sword.mp3","audio/skill/xueJian/gouMai.mp3","audio/skill/xueJian/heCheng.mp3","audio/skill/xueJian/tiLian.mp3","audio/skill/longKui/start_blue.mp3","audio/skill/longKui/cangFeng.mp3","audio/skill/longKui/moJianHuTi.mp3","audio/skill/longKui/twin_blue.mp3","audio/skill/longKui/qianNian_blue.mp3","audio/skill/longKui/qianNian_red.mp3","audio/skill/longKui/youLan.mp3","audio/skill/longKui/twin_reply.mp3","audio/skill/longKui/daiJun.mp3","audio/skill/longKui/buYuan.mp3","audio/skill/longKui/twin_red.mp3","audio/skill/longKui/huanGui.mp3","audio/skill/longKui/hongYing.mp3","audio/skill/longKui/gift_blue.mp3","audio/skill/longKui/take_blue.mp3","audio/skill/longKui/gift_red.mp3","audio/skill/longKui/take_red.mp3","audio/skill/longKui/resonance_blue.mp3","audio/skill/longKui/resonance_red.mp3","audio/skill/longKui/complete_blue.mp3","audio/skill/longKui/complete_red.mp3","audio/skill/longKui/gouMai_blue.mp3","audio/skill/longKui/heCheng_blue.mp3","audio/skill/longKui/tiLian_blue.mp3","audio/skill/longKui/gouMai_red.mp3","audio/skill/longKui/heCheng_red.mp3","audio/skill/longKui/tiLian_red.mp3"],
        seen:new WeakMap(),sequence:0,received:new Set(),queue:[],busy:false,maxWait:5000,maxPlayback:20000,
        say(p,key,event){this.batch(p,[key],event);},
        batch(p,keys,event){
            if(event&&typeof event==='object'){
                let used=this.seen.get(event);if(!used)this.seen.set(event,used=new Set());
                const key=(p.playerid||p.name||'')+':'+keys.join('|');
                if(used.has(key))return;used.add(key);
            }
            game.broadcastAll(function(token,lines,queuedAt){
                const v=lib.lhymVoice;if(!v||!lib.config.background_speak||v.received.has(token))return;
                v.received.add(token);if(v.received.size>2048)v.received.delete(v.received.values().next().value);
                v.queue.push(...lines.map(key=>({key,queuedAt})));v.pump();
            },Date.now()+':'+(++this.sequence),keys,Date.now());
        },
        pump(){
            if(this.busy||!this.queue.length)return;
            if(!lib.config.background_speak){this.queue.length=0;return;}
            let item=this.queue.shift();
            while(item&&Date.now()-item.queuedAt>this.maxWait)item=this.queue.shift();
            if(!item)return;
            this.busy=true;const key=item.key;let done=false,timer;
            const next=()=>{if(done)return;done=true;clearTimeout(timer);this.busy=false;this.pump();};
            try{
                const audio=game.playAudio({path:'ext:轮回遗梦/audio/skill/'+key+'.mp3'});
                if(!audio||!audio.addEventListener){next();return;}
                audio.addEventListener('ended',next,{once:true});audio.addEventListener('error',next,{once:true});
                timer=setTimeout(()=>{audio.pause();audio.remove();next();},this.maxPlayback);
            }catch(error){next();}
        },
        transfer(p,t,kind,event){
            const snow=[t.name,t.name1,t.name2].includes('xueJian');
            this.batch(p,['jingTian/'+kind+'_'+(snow?'snow':'kui'),snow?'xueJian/'+kind:'longKui/'+kind+'_'+(C.red(t)?'red':'blue')],event);
        },
        complete(p,event){
            const s=H.state(p);if(s.weapon!=='魔剑'||s.faces.length!==10||s.voiceComplete)return;
            s.voiceComplete=true;p.syncStorage('lhym_sword');
            const kui=game.players.find(t=>t.side===p.side&&t.hasSkill('lhym_jianZhongRen'));
            this.batch(p,['jingTian/complete_magic',...(kui?['longKui/complete_'+(C.red(kui)?'red':'blue')]:[])],event);
        },
        forge(p,event){
            const s=H.state(p);if(s.stage<1||s.stage>3)return;
            const keys=['jingTian/forge_'+s.stage];
            if(s.stage===3&&!s.voiceComplete){
                s.voiceComplete=true;p.syncStorage('lhym_sword');
                if(game.players.some(t=>t.side===p.side&&t.hasSkill('lhym_huaYing')))keys.push('xueJian/complete_sword');
            }
            this.batch(p,keys,event);
        },
    };
    // 独立命名空间；不依赖宿命挽歌或修改本体原型。
    const H = lib.lunHuiYiMeng = {
        elements: ['shui', 'huo', 'lei', 'feng', 'di'],
        labels: {shui:'水', huo:'火', lei:'雷', feng:'风', di:'地'},
        recipes: [
            ['凝寒雪',['shui'], '对一名对手造成1点法术伤害③，指定一名我方角色+1【治疗】。'],
            ['燎天火',['huo'], '对一名对手造成2点法术伤害③。'],
            ['惊魂雷',['lei'], '对一名对手造成1点法术伤害③，你+1【宝石】。'],
            ['乱刃风',['feng'], '对一名对手造成1点法术伤害③，你+1【攻击行动】。'],
            ['裂地岩',['di'], '对一名对手造成1点法术伤害③，你+1【法术行动】。'],
            ['幻水惊雷',['shui','lei'], '我方所有角色获得【威力赐福】，你额外+1【攻击行动】。'],
            ['风水流转',['shui','feng'], '移除我方所有角色面前的【中毒】和【虚弱】，你额外+1【攻击行动】或【法术行动】。'],
            ['流光诛仙斩',['feng','huo','lei'], '对所有对手各造成3点法术伤害③。'],
            ['万灵还神光',['shui','feng','di'], '我方所有角色无视上限各+2【治疗】。'],
            ['极咒返阴阳',['shui','lei','feng','di'], '移除我方所有角色面前的【中毒】和【虚弱】，我方所有角色无视上限各+2【治疗】，你额外+1【攻击行动】或【法术行动】。'],
            ['天地元灵斩',['shui','huo','lei','feng','di'], '对所有对手各造成4点法术伤害③。'],
        ],
        branches: [
            ['lhym_fengMang','lhym_houFa'],
            ['lhym_poZhen','lhym_lianZhan'],
            ['lhym_leiDong','lhym_baHuang'],
        ],
        state(p) { return p.storage.lhym_sword || {weapon:null, faces:[], stage:0, branches:[]}; },
        sync(p) {
            p.syncStorage('lhym_sword');
            H.syncMarks(p);
            if(typeof C!=='undefined') C.refreshAllBonds();
        },
        lampState(p, element) {
            const faces=H.state(p).faces;
            const yin=faces.includes(element+'_yin'), yang=faces.includes(element+'_yang');
            return yin ? (yang ? 'both' : 'yin') : (yang ? 'yang' : 'empty');
        },
        lampText(p, element) {
            const faces=H.state(p).faces;
            return H.labels[element]+'灵灯：阴面'+(faces.includes(element+'_yin')?'已激活':'未激活')+
                '；阳面'+(faces.includes(element+'_yang')?'已激活':'未激活')+'。';
        },
        syncMarks(p) {
            const state=H.state(p), desired=[];
            if(state.weapon==='魔剑') {
                desired.push('lhym_moJianMark');
                desired.push('lhym_moRoute');
                for(const element of H.elements) desired.push('lhym_wuLing_'+element+'_'+H.lampState(p,element));
            } else if(state.weapon==='镇妖剑') {
                desired.push('lhym_zhenYaoJianMark');
                desired.push('lhym_zhenRoute');
            }
            const all=['lhym_moRoute','lhym_zhenRoute','lhym_moJianMark','lhym_zhenYaoJianMark'];
            for(const element of H.elements) for(const status of ['empty','yin','yang','both']) all.push('lhym_wuLing_'+element+'_'+status);
            for(const id of all) {
                if(desired.includes(id)) {
                    if(!p.hasSkill(id)) p.addSkill(id);
                    p.markSkill(id);
                } else if(p.hasSkill(id)) p.removeSkill(id);
            }
            const lamps=desired.filter(id=>id.startsWith('lhym_wuLing_'));
            game.broadcastAll(function(player, ids) {
                if(!player?.node || !player.marks) return;
                let box=player.node.lhymWuLingMarks;
                if(!ids.length) {
                    if(box) box.remove();
                    delete player.node.lhymWuLingMarks;
                    return;
                }
                if(!box) {
                    box=ui.create.div('.lhym-wuLing-marks',player);
                    player.node.lhymWuLingMarks=box;
                    Object.assign(box.style,{
                        position:'absolute',left:'50%',top:'5px',width:'142px',height:'26px',zIndex:'4',
                        transform:'translateX(-50%)',
                        pointerEvents:'none',
                    });
                }
                ids.forEach(function(id,index) {
                    const node=player.marks[id];
                    if(!node) return;
                    node.classList.add('lhym-wuLing-mark');
                    node.classList.remove('drawinghidden');
                    if(node.parentNode!==box) box.appendChild(node);
                    Object.assign(node.style,{
                        position:'absolute',left:'0',top:'0',margin:'0',width:'26px',height:'26px',
                        transform:'translateX('+(index*29)+'px)',pointerEvents:'auto',opacity:'1',
                    });
                });
            },p,lamps);
        },
        enemies(p) { return game.filterPlayer(t => t.side !== p.side); },
        team(p) { return game.filterPlayer(t => t.side === p.side); },
        souls(p) { return p.getExpansions('lhym_soul'); },
        setPortrait(p, file, character='jingTian', fade=false) {
            game.broadcastAll(function(target, image, characterId, withFade) {
                const setNode = function(node) {
                    if(node) node.setBackgroundImage('extension/轮回遗梦/' + image);
                };
                const nodes=[];
                if(target.name === characterId || target.name1 === characterId) {
                    if(target.node?.avatar) nodes.push(target.node.avatar);
                }
                if(target.name2 === characterId) {
                    if(target.node?.avatar2) nodes.push(target.node.avatar2);
                }
                const syncFake=function(node) {
                    if(target === game.me && ui.fakeme && node) {
                        ui.fakeme.style.backgroundImage=node.style.backgroundImage;
                    }
                };
                if(!withFade) {
                    nodes.forEach(function(node){setNode(node);syncFake(node);});
                    return;
                }
                nodes.forEach(function(node) {
                    const token=(node._lhymPortraitFadeToken||0)+1;
                    node._lhymPortraitFadeToken=token;
                    node.style.transition='opacity 140ms ease-in';
                    node.style.opacity='0';
                    setTimeout(function() {
                        if(node._lhymPortraitFadeToken!==token) return;
                        setNode(node);
                        syncFake(node);
                        node.style.transition='opacity 220ms ease-out';
                        node.style.opacity='1';
                        setTimeout(function() {
                            if(node._lhymPortraitFadeToken!==token) return;
                            node.style.removeProperty('transition');
                            node.style.removeProperty('opacity');
                        },230);
                    },145);
                });
            }, p, file, character, fade);
        },
        material(card, face) {
            const [element, side] = face.split('_');
            if(side === 'yin' && get.name(card) === 'anMie') return true;
            if(side === 'yang' && get.name(card) === 'shengGuang') return true;
            return get.xiBie(card) === element && get.type(card) === (side === 'yin' ? 'gongJi' : 'faShu');
        },
        faces(p, cards) {
            const done = H.state(p).faces;
            return H.elements.flatMap(x => [x+'_yin', x+'_yang'])
                .filter(f => !done.includes(f) && (!cards || cards.some(c => H.material(c,f))));
        },
        faceLabel(f) { const [x,y] = f.split('_'); return H.labels[x]+(y==='yin'?'阴面':'阳面'); },
        useful(p,card) {
            const s = H.state(p);
            return s.weapon === '魔剑' ? H.faces(p,[card]).length > 0 :
                s.weapon === '镇妖剑' && s.stage < 3 && get.xiBie(card) === 'lei';
        },
        canForge(p) {
            const s = H.state(p), n = s.stage;
            return s.weapon === '镇妖剑' && n < 3 &&
                p.countZhiShiWu('lhym_longJing') >= [1,1,2][n] &&
                p.countCards('h', c => get.xiBie(c)==='lei') >= n+1;
        },
        unlocked(p,r) { return r[1].every(x => ['yin','yang'].every(y => H.state(p).faces.includes(x+'_'+y))); },
        available(p) {
            return H.recipes.filter(r => H.unlocked(p,r) &&
                r[1].every(x => H.souls(p).some(c => get.xiBie(c) === x)) &&
                (r[1].length === 1 || p.countCards('h') > 0));
        },
        damageScore(p,t,n) {
            const actual=Math.max(0,n-(t.zhiLiao||0));
            const spill = Math.max(0,t.countCards('h') + actual - t.getHandcardLimit());
            const forge=actual>0 && H.state(p).weapon==='魔剑' && H.faces(p).length && p.countZhiShiWu('lhym_longJing')<4;
            return spill*2 + Math.min(n,t.zhiLiao||0)*0.3 + actual*0.2 + (forge?1.5:0);
        },
        materialNeed(p,c) {
            if(!H.useful(p,c)) return 0;
            if(H.state(p).weapon==='镇妖剑') return 6;
            return Math.max(0,...H.faces(p,[c]).map(f=>{
                const [x,y]=f.split('_');
                return (H.state(p).faces.includes(x+'_'+(y==='yin'?'yang':'yin'))?12:4)+
                    (x==='di'?3:x==='feng'?2:0);
            }));
        },
        afterRecipe(p,r) {
            const souls=H.souls(p).slice(),hand=p.getCards('h').slice();
            for(const x of r[1]) { const i=souls.findIndex(c=>get.xiBie(c)===x); if(i>=0)souls.splice(i,1); }
            if(r[1].length>1 && hand.length) {
                hand.sort((a,b)=>H.handCost(p,b)-H.handCost(p,a));hand.shift();
            }
            const attacks=hand.filter(c=>get.type(c)==='gongJi');
            const attack=Math.max(0,...attacks.flatMap(c=>H.enemies(p).map(t=>H.comboHit(p,t,c)*H.damageScore(p,t,2))));
            const another=H.recipes.some(next=>H.unlocked(p,next) && next[1].every(x=>souls.some(c=>get.xiBie(c)===x)) &&
                (next[1].length===1||hand.length>0));
            const damageCard=hand.some(c=>['moDan','zhongDu'].includes(get.name(c)) && H.enemies(p).some(t=>H.forgeDamageScore(p,t,c)>0));
            return {attack:Math.min(2,attack),spell:another?1.5:damageCard?1:0,souls};
        },
        shouldBoost(p,r) {
            const base=r[0]==='燎天火'?2:1, enemies=H.enemies(p);
            if(r[0]==='裂地岩') return !enemies.some(t=>(t.zhiLiao||0)<base) && enemies.some(t=>(t.zhiLiao||0)<base+1);
            const now=Math.max(0,...enemies.map(t=>H.damageScore(p,t,base+1)-H.damageScore(p,t,base)));
            const remaining=H.souls(p).filter(c=>get.xiBie(c)===r[1][0]).length;
            return now>(remaining<=2?2.5:1.5);
        },
        healScore(t,n) { return Math.max(0,Math.min(n,t.getZhiLiaoLimit()-(t.zhiLiao||0))); },
        recipeScore(p,r) {
            const name=r[0], team=H.team(p), enemies=H.enemies(p);
            const hit=n => Math.max(0,...enemies.map(t=>H.damageScore(p,t,n)));
            const {attack,spell}=H.afterRecipe(p,r);
            const clean = team.reduce((v,t)=>v+t.getExpansions('_zhongDu').length+t.getExpansions('_xuRuo').length*2,0);
            const heal=(n,unlimited)=>team.reduce((v,t)=>v+(unlimited?n:H.healScore(t,n)),0);
            if(name==='凝寒雪') return hit(1)+Math.max(0,...team.map(t=>H.healScore(t,1)));
            if(name==='燎天火') return hit(2);
            if(name==='惊魂雷') return hit(1)+(p.countEmptyNengLiang()>0?1.5:0);
            if(name==='乱刃风') return hit(1)+attack;
            if(name==='裂地岩') return hit(1)+spell;
            if(name==='幻水惊雷') return team.filter(t=>!t.hasJiChuXiaoGuo('weiLiCiFu_xiaoGuo')&&!t.hasJiChuXiaoGuo('lhym_weiLiBlessing')).length*1.5+attack-0.4;
            if(name==='风水流转') return clean+Math.max(attack,spell)-0.4;
            if(name==='万灵还神光') return heal(2,true)-0.4;
            if(name==='极咒返阴阳') return clean+heal(2,true)+Math.max(attack,spell)-0.6;
            return enemies.reduce((v,t)=>v+H.damageScore(p,t,name==='天地元灵斩'?4:3),0)-0.6;
        },
        faceScore(p,f) {
            const [x,y]=f.split('_');
            const other=x+'_'+(y==='yin'?'yang':'yin');
            const half=H.state(p).faces.includes(other), hand=p.getCards('h');
            const pair=p.countZhiShiWu('lhym_longJing')>=2 && hand.some(c=>H.material(c,f) &&
                hand.some(d=>d!==c&&H.material(d,other)));
            return (half?80:pair?40:0) +
                Math.min(5,H.souls(p).filter(c=>get.xiBie(c)===x).length) + ({huo:2,lei:1.8,feng:10,di:12,shui:1.4}[x]);
        },
        preferPurify(p) {
            return H.state(p).weapon==='魔剑' && p.countZhiShiWu('lhym_longJing')>=1 &&
                H.faces(p,p.getCards('h')).length>0 && H.startupSafe(p,1);
        },
        startupSafe(p,n) {
            if(p.countNengLiang&&H.canSilver(p)) return true;
            if(H.state(p).weapon==='魔剑'&&H.available(p).some(r=>r[1].length===1)) return true;
            // 保守预留：即使费用全部取自可行动牌，也至少剩下一张合法行动牌。
            return p.getCards('h').filter(c=>H.isActionCard(c)&&get.name(c)!=='shengGuang'&&
                lib.filter.cardEnabled(c,p)&&[p,...H.enemies(p)].some(t=>p.canUseXingBei(c,t))).length>n;
        },
        comboReady(p) {
            // 仅规划本人主动行动；已有专用法术行动时先兑现，不再为了连招延后施法。
            const e=_status.event;
            return _status.currentPhase===p && !e?.yingZhan && !e?.getParent?.('_yingZhan',true) &&
                H.state(p).weapon==='魔剑' && !(p.storage.faShu>0) &&
                H.available(p).some(r=>H.recipeScore(p,r)>0);
        },
        needsForgeDamage(p) {
            const e=_status.event;
            return _status.currentPhase===p && !e?.yingZhan && !e?.getParent?.('_yingZhan',true) &&
                H.state(p).weapon==='魔剑' && H.faces(p).length>0 && p.countZhiShiWu('lhym_longJing')<4;
        },
        magicTurn(p) {
            const e=_status.event;
            return _status.currentPhase===p && H.state(p).weapon==='魔剑' &&
                !e?.yingZhan && e?.name!=='_yingZhan' && !e?.getParent?.('_yingZhan',true);
        },
        isActionCard(c) {
            // effect.player也会收到技能ID/技能载荷；cardEnabled只接受存在卡牌定义的牌。
            return !!c && typeof c==='object' && !!lib.card[get.name(c)];
        },
        reserveYang(p,c) {
            if(!H.isActionCard(c)) return false;
            if(!['shengDun','xuRuo'].includes(get.name(c))) return false;
            const face=get.xiBie(c)+'_yang';
            return H.elements.includes(get.xiBie(c)) && !H.state(p).faces.includes(face) &&
                !p.getCards('h').some(other=>other!==c && get.name(other)!=='shengGuang' &&
                    get.xiBie(other)===get.xiBie(c) && get.type(other)==='faShu');
        },
        hasDamageSpell(p) {
            const e=_status.event;
            // 专用攻击行动不能改成法术；不得因此把所有攻击都压成零分。
            if(e?.name==='gongJi'||e?.getParent?.('gongJi',true)) return false;
            return H.silverForge(p) || H.available(p).some(r=>(r[1].length===1 || ['流光诛仙斩','天地元灵斩'].includes(r[0])) && H.recipeScore(p,r)>0) || p.getCards('h').some(c=>
                ['moDan','zhongDu'].includes(get.name(c)) &&
                H.enemies(p).some(t=>H.forgeDamageScore(p,t,c)>0));
        },
        bestHit(p,c) { return Math.max(0,...H.enemies(p).map(t=>H.comboHit(p,t,c))); },
        reserveAttack(p,c) {
            const x=get.xiBie(c);
            if(get.type(c)!=='gongJi'||!['di','feng'].includes(x)||H.state(p).faces.includes(x+'_yin')) return false;
            if(p.getCards('h').some(o=>o!==c&&get.type(o)==='gongJi'&&get.xiBie(o)===x)) return false;
            if(H.bestHit(p,c)<0.7) return true;
            return p.getCards('h').some(o=>o!==c&&get.type(o)==='gongJi'&&
                (!['di','feng'].includes(get.xiBie(o))||H.state(p).faces.includes(get.xiBie(o)+'_yin'))&&H.bestHit(p,o)>=0.7);
        },
        silverForge(p) {
            return !!p.countNengLiang && H.canSilver(p) && H.state(p).weapon==='魔剑' &&
                H.faces(p).length>0 && p.countZhiShiWu('lhym_longJing')<4 &&
                H.enemies(p).some(t=>(t.zhiLiao||0)<p.countNengLiang('shuiJing'));
        },
        attackScore(p,t,c) {
            const hit=H.comboHit(p,t,c);
            if(!hit) return 0;
            const blind=p.getExpansions('tiMoZhiMang').length>0;
            const damage=blind?0:H.damageScore(p,t,2);
            const follow=H.comboReady(p)?1.5:0;
            return hit*(damage+follow+0.2);
        },
        forgeDamageScore(p,t,c) {
            if(!H.isActionCard(c)) return 0;
            if(!t || !t.isIn() || t.side===p.side || !lib.filter.cardEnabled(c,p) || !p.canUseXingBei(c,t)) return 0;
            const treatment=Math.max(0,t.zhiLiao||0), name=get.name(c);
            if(get.type(c)==='gongJi') return treatment>=2?0:H.comboHit(p,t,c);
            if(name==='moDan') {
                // 魔弹可能被传走；只按保守预期加分，保留本体的方向与目标限制。
                if(t.getExpansions('_shengDun').length) return 0;
                return treatment>=(game.moDan||2)?0.25:0.65;
            }
            // 中毒延后结算，不等同于当场获得龙精石；已有毒时降低重复投资。
            if(name==='zhongDu') return (treatment<1?0.55:0.25)/(1+t.getExpansions('_zhongDu').length);
            return 0;
        },
        comboHit(p,t,c) {
            if(!H.isActionCard(c)) return 0;
            if(!t || !t.isIn() || t.side===p.side || get.type(c)!=='gongJi' ||
                !lib.filter.cardEnabled(c,p) || !p.canUseXingBei(c,t)) return 0;
            // 只读公开圣盾与手牌张数，不检查敌方隐藏手牌。暗灭不能应战，但仍可能被圣光抵挡。
            if(t.getExpansions('_shengDun').length) return 0;
            const n=t.countCards('h');
            if(n===0) return 0.95;
            if(get.xiBie(c)==='an') return Math.max(0.55,0.9-n*0.045);
            return n===1?0.8:n===2?0.65:0.5*Math.pow(0.75,n-3);
        },
        handCost(p,c) { return 8-get.value(c,p)-H.materialNeed(p,c)+(p.countCards('h')>=p.getHandcardLimit()?2:0); },
        materialValue(p,c) {
            if(!c || !H.useful(p,c)) return 0;
            const s=H.state(p);
            if(s.weapon==='镇妖剑') return p.countCards('h',card=>get.xiBie(card)==='lei')<=s.stage+1?2:0.5;
            const faces=H.faces(p,[c]);
            return faces.some(f=>H.faceScore(p,f)>=40)?2:0.7;
        },
        canSilver(p) {
            const a=p.countNengLiang('baoShi');
            return a>0 && p.countNengLiang('shuiJing')>0 && H.enemies(p).length>=a;
        },
        async target(p,prompt,n) {
            const ts=(await p.chooseTarget(prompt,true,(c,p,t)=>t.side!==p.side)
                .set('ai',t=>{ var H = lib.lunHuiYiMeng; var p = _status.event["online_9304_p"]; var n = _status.event["online_9304_n"]; return H.damageScore(p,t,n); }).set("online_9304_p", p).set("online_9304_n", n).forResultTargets() || []);
            return ts && ts[0];
        },
        async clear(t) {
            for(const tag of ['_zhongDu','_xuRuo']) {
                const cards=t.getExpansions(tag);
                if(cards.length) await t.discard(cards,tag);
            }
            // 核心毒来源以实体牌为键保存，移除后清理悬空来源。
            if(!t.getExpansions('_zhongDu').length) t.storage.zhongDu=[];
        },
        async bless(t,p) {
            if(t.hasJiChuXiaoGuo('weiLiCiFu_xiaoGuo')||t.hasJiChuXiaoGuo('lhym_weiLiBlessing')) return;
            const effect=lib.skill.weiLiCiFu_xiaoGuo?'weiLiCiFu_xiaoGuo':'lhym_weiLiBlessing';
            if(!t.hasSkill(effect)) t.addSkill(effect);
            // 本体【威力赐福】以盖牌为基础效果；生成即逝标记牌以复用原效果。
            const card=game.createCard('shengGuang');
            await t.addJiChuXiaoGuo(card,p,effect);
        },
        async cast(p,r,boost) {
            const name=r[0];V.say(p,'jingTian/recipe_'+H.recipes.findIndex(x=>x[0]===name),_status.event);
            // 具体配方已支付完费用：同步显示实际招式，不额外触发 logSkill 的发动事件。
            p.trySkillAnimate('lhym_moJianJi',name);
            game.log(p,'发动', '【'+name+'】');
            if(r[1].length===1) {
                const n=(name==='燎天火'?2:1)+(boost?1:0);
                const target=await H.target(p,name+'：选择对手',n);
                if(target) await target.faShuDamage(n,p,'nocard');
                if(name==='凝寒雪') {
                    const ts=(await p.chooseTarget('凝寒雪：一名我方角色+1治疗',true,(c,p,t)=>t.side===p.side)
                        .set('ai',t=>{ var H = lib.lunHuiYiMeng; return H.healScore(t,1); }).forResultTargets() || []);
                    if(ts?.[0]) await ts[0].changeZhiLiao(1,p);
                }
                if(name==='惊魂雷') await p.addNengLiang('baoShi',1);
                if(name==='乱刃风') p.addGongJi();
                if(name==='裂地岩') p.addFaShu();
                return;
            }
            if(name==='流光诛仙斩'||name==='天地元灵斩') {
                for(const t of H.enemies(p).sortBySeat(p)) if(t.isIn()) await t.faShuDamage(name==='天地元灵斩'?4:3,p,'nocard');
                return;
            }
            for(const t of H.team(p).sortBySeat(p)) {
                if(name==='风水流转'||name==='极咒返阴阳') await H.clear(t);
                if(name==='幻水惊雷') await H.bless(t,p);
                if(name==='万灵还神光'||name==='极咒返阴阳') await t.changeZhiLiao(2,Infinity,p);
            }
            if(name==='幻水惊雷') p.addGongJi();
            if(name==='风水流转'||name==='极咒返阴阳') p.addGongJiOrFaShu();
        },
        skillText(id, title) {
            return "<span class='greentext'>" + (title || get.translation(id)) + '</span><br>' +
                get.translation(id + '_info').replace(/^(【回合限定】)/, '');
        },
        routeText(p) {
            const s=H.state(p);
            if(s.weapon==='魔剑') return ['lhym_renJian','lhym_jingHua','lhym_moJianJi','lhym_canYing','lhym_yinYang','lhym_jianPo','lhym_qianNianGongMing'].map(id=>H.skillText(id)).join('<br><br>');
            if(s.weapon==='镇妖剑') {
                const items=['lhym_zhaoDan','lhym_chongZhu','lhym_shenShuZhaoDan'].map(id=>H.skillText(id));
                items.push('<b>当前修复</b>：'+s.stage+'/3阶段');
                for(const id of s.branches) items.push(H.skillText(id, get.translation(id)));
                return items.join('<br><br>');
            }
            return '尚未选择武器';
        },
        async collect(p,cards) {
            cards=[...new Set(cards)].filter(c=>get.position(c,true)==='d' && H.elements.includes(get.xiBie(c)));
            if(!cards.length || !p.hasSkill('lhym_soul')) return;
            cards=cards.filter(c=>get.position(c,true)==='d');
            if(!cards.length) return;
            p.logSkill('lhym_renJian');V.say(p,'jingTian/renJian',_status.event);
            await p.addGaiPai(cards,'lhym_soul');
            const all=H.souls(p);
            if(all.length>10) {
                const overflow=all.length-10;
                const drop=(await p.chooseCardButton(all,'剑魂上限10：选择丢弃的'+overflow+'张',overflow,true)
                    .set('ai',b=>{
                        var H = lib.lunHuiYiMeng;
                        var p = _status.event["online_13554_p"];

                        const same=H.souls(p).filter(c=>get.xiBie(c)===get.xiBie(b.link)).length;
                        return same*0.6 + get.value(b.link,p)*0.08;
                    }).set("online_13554_p", p).forResultLinks() || []);
                if(drop?.length===overflow) await p.discard(drop,'lhym_soul');
            }
            H.sync(p);
        },
    };
    const skill = {
        lhym_weiLiBlessing:{
            mark:true,marktext:'威',intro:{content:'jiChuXiaoGuo'},
            tag:{jiChuXiaoGuo:true},
            onremove:function(player,skill){
                const cards=player.getGaiPai(skill);
                if(cards.length) player.loseToDiscardpile(cards);
            },
            trigger:{source:'gongJiMingZhong'},priority:-1,forced:true,
            filter:function(event,player){return player.hasGaiPai('lhym_weiLiBlessing');},
            content:async function(event,trigger,player){
                await player.discard(player.getGaiPai('lhym_weiLiBlessing'),'lhym_weiLiBlessing').set('visible',true);
                trigger.changeDamageNum(2);
                player.removeSkill('lhym_weiLiBlessing');
            },
        },
        lhym_bgm:{
            charlotte:true,trigger:{global:'gameStart'},forced:true,popup:false,
            firstDo:true,priority:90,
            filter:function(){return !_status.suMingWanGeBgmStarted&&!_status.lhymBgmStarted&&
                !!lib.lhymBattleMusic.chooseTrack();},
            content:function(){
                const music=lib.lhymBattleMusic.chooseTrack();
                if(music)lib.lhymBattleMusic.playTrack(music);
            },
        },
        lhym_actionVoice:{
            trigger:{player:['gouMai','heCheng','tiLian','_tiLian_backupAfter']},forced:true,popup:false,charlotte:true,firstDo:true,
            filter:function(event,player){return [player.name,player.name1,player.name2].some(function(id){return id==='jingTian'||id==='xueJian'||id==='longKui'||id==='xieJianXian'||id==='xieLing';});},
            content:function(event,trigger,player){
                var action=event.triggername||trigger.name;
                var ids=[player.name,player.name1,player.name2];
                var companion=ids.includes('xueJian')||ids.includes('longKui');
                if(action==='tiLian'&&companion)return;
                if(action==='_tiLian_backupAfter'){
                    if(!companion||trigger.lhym_feiLongTaken)return;
                    action='tiLian';
                }
                if(!['gouMai','heCheng','tiLian'].includes(action))return;
                if(ids.includes('jingTian')){
                    lib.lhymVoice.say(player,action==='tiLian'?'jingTian/zhuJian':'jingTian/'+action,event);
                }else if(ids.includes('xueJian')){
                    lib.lhymVoice.say(player,'xueJian/'+action,event);
                }else if(ids.includes('longKui')){
                    lib.lhymVoice.say(player,'longKui/'+action+'_'+(lib.lhymCompanion.red(player)?'red':'blue'),event);
                }else if(ids.includes('xieJianXian')||ids.includes('xieLing')){
                    lib.lhymVoice.say(player,'xieJianXian/'+action,event);
                }
            },
        },
        lhym_shuangJian: {
            trigger:{global:'gameStart'}, forced:true, priority:5,
            filter:(e,p)=>!H.state(p).weapon,
            content:async function(event,trigger,player) {
                const weapon=await player.chooseControl('魔剑','镇妖剑').set('prompt','双剑宿缘：选择本局武器（不可更改）')
                    .set('ai',()=>{ var player=_status.event.online_14250_player; return game.players.some(function(current){ return current.side===player.side&&[current.name,current.name1,current.name2].includes('xueJian'); })?'镇妖剑':'魔剑'; }).set('online_14250_player',player).forResultControl();
                player.storage.lhym_sword={weapon,faces:[],stage:0,branches:[]};V.say(player,weapon==='魔剑'?'jingTian/choose_magic':'jingTian/choose_sword',event);
                if(!player.hasSkill('lhym_sword')) player.addSkill('lhym_sword');
                // 路线技能由“魔剑/镇妖剑”专属剑容器通过 group 承载，
                // 不再逐个 addSkill 到角色技能列表，避免角色面板重复显示。
                if(weapon === '镇妖剑') H.setPortrait(player, 'jingTian_zhenYaoJian.webp');
                H.sync(player);
            },
        },
        lhym_yongAn: {
            mod:{maxNengLiang:(p,n)=>n+2},
            trigger:{player:'teShuEnd'},forced:true,group:'lhym_yongAnStart',
            content:async function(event,trigger,player) { V.say(player,'jingTian/yongAn',event);
                await player.addNengLiang('baoShi',1);
            },
            ai:{baoShi:true,shuiJing:true},
        },
        lhym_yongAnStart: {
            trigger:{global:'gameStart'},forced:true,popup:false,
            content:async function(event,trigger,player) { V.say(player,'jingTian/yongAn',event); await player.addNengLiang('shuiJing',2); },
        },
        lhym_dianDang: {
            trigger:{player:'changeNengLiangBefore'},direct:true,priority:10,
            filter:(e,p)=>e.xingShi==='baoShi'&&e.num>0,
            content:async function(event,trigger,player) {
                const count=trigger.num;
                let converted=0;
                for(let i=0;i<count;i++) {
                    const yes=await player.chooseBool('典当：将第'+(i+1)+'颗宝石改为2水晶？')
                        .set('ai',()=>{ var player = _status.event["online_15765_player"]; return player.countEmptyNengLiang()>=2 && player.countNengLiang('shuiJing')<3 &&
                            (player.countNengLiang('baoShi')+_status.event.lhymKept>0); }).set("online_15765_player", player).set('lhymKept',i-converted)
                        .forResultBool();
                    if(yes) converted++;
                }
                trigger.num=count-converted;
                if(converted) {
                    player.logSkill('lhym_dianDang');
                    // 先保留未典当宝石的容量，避免先加水晶挤占后令原事件超上限。
                    const capacity=Math.max(0,player.countEmptyNengLiang()-trigger.num);
                    let grant=converted*2, gifted=false;
                    if(player.hasSkill('lhym_suYuan')&&game.hasPlayer(t=>t!==player&&C.isCompanion(t)&&t.countEmptyNengLiang()>0)){
                        const targets=await player.chooseTarget('宿缘相应：将本次典当的1颗水晶给予雪见或龙葵？',
                            (c,p,t)=>t!==p&&lib.lhymCompanion.isCompanion(t)&&t.countEmptyNengLiang()>0)
                            .set('ai',t=>t.side===_status.event.player.side?2:-2).forResultTargets()||[];
                        if(targets[0]){player.logSkill('lhym_suYuan',targets[0]);await targets[0].addNengLiang('shuiJing',1);grant--;gifted=true;V.transfer(player,targets[0],'gift',event);}
                    }
                    if(!gifted)V.say(player,'jingTian/dianDang',event);
                    if(capacity>0&&grant>0) await player.addNengLiang('shuiJing',Math.min(capacity,grant));
                }
            },
        },
        lhym_feiLong: {
            init:p=>p.tempBanSkill('_tiLian','forever'),
            onremove:p=>{delete p.storage.temp_ban__tiLian;},
            trigger:{global:'_tiLian_backupEnd'},forced:true,
            filter:(e,p)=>e.player!==p && p.countEmptyNengLiang()>0 &&
                ['baoShi','shuiJing'].some(x=>(e.lhym_refined?.[x]||0)>0 && e.player.countNengLiang(x)>0),
            content:async function(event,trigger,player) {
                if(!(player.hasSkill('lhym_suYuan')&&lib.lhymCompanion.isCompanion(trigger.player))){
                    V.say(player,'jingTian/feiLong',event);
                    const cards=get.cards(1);
                    await player.showCards(cards,'飞龙探云手');
                    await game.cardsDiscard(cards);
                    if(!cards[0]||get.type(cards[0])!=='faShu') return;
                }
                const types=['baoShi','shuiJing'].filter(x=>(trigger.lhym_refined?.[x]||0)>0 && trigger.player.countNengLiang(x)>0);
                if(!types.length||player.countEmptyNengLiang()<1) return;
                const x=types.length===1 ? types[0] :
                    await player.chooseControl(types).set('prompt','飞龙探云手：选择取得本次提炼所得的1颗星石')
                        .set('ai',()=>{ var types = _status.event["online_17510_types"]; return types.includes('shuiJing')?'shuiJing':types[0]; }).set("online_17510_types", types).forResultControl();
                if(!types.includes(x)) return;
                const before=trigger.player.countNengLiang(x);
                await trigger.player.removeNengLiang(x,1);
                await player.addNengLiang(x,1);
                if(C.isCompanion(trigger.player)&&trigger.player.countNengLiang(x)<before)
                    trigger.lhym_feiLongTaken=true;
                if(player.hasSkill('lhym_suYuan')&&C.isCompanion(trigger.player))V.transfer(player,trigger.player,'take',event);
            },
        },
        // 提炼事务账本：只记提炼本体直接产生的实际增量；后续支出优先扣该批。
        lhym_refineBegin: {
            trigger:{global:'tiLian'},forced:true,popup:false,priority:100,
            filter:(e,p)=>e.player===p,
            content:async function(event,trigger,player) {
                trigger.lhym_refined={baoShi:0,shuiJing:0};
                trigger.player._lhym_refine=trigger;
            },
        },
        lhym_energyBefore: {
            trigger:{global:'changeNengLiangBefore'},forced:true,popup:false,priority:100,
            filter:(e,p)=>e.player===p,
            content:async function(event,trigger,player) {
                trigger._lhym_before=trigger.player.countNengLiang(trigger.xingShi);
            },
        },
        lhym_energyAfter: {
            trigger:{global:'changeNengLiangAfter'},forced:true,popup:false,priority:100,
            filter:(e,p)=>e.player===p&&!!e.player._lhym_refine,
            content:async function(event,trigger,player) {
                const txn=trigger.player._lhym_refine, x=trigger.xingShi;
                const delta=trigger.player.countNengLiang(x)-(trigger._lhym_before??trigger.player.countNengLiang(x));
                if(delta>0&&trigger.getParent()===txn) txn.lhym_refined[x]+=delta;
                else if(delta<0) txn.lhym_refined[x]=Math.max(0,txn.lhym_refined[x]+delta);
            },
        },
        lhym_refineEnd: {
            trigger:{global:'_tiLian_backupAfter'},forced:true,popup:false,lastDo:true,
            filter:(e,p)=>e.player===p,
            content:async function(event,trigger,player) { delete trigger.player._lhym_refine; },
        },
        lhym_zhuJian: {
            group:'lhym_longJing',
            mod:{aiOrder:function(player,card,num) {
                var H=lib.lunHuiYiMeng;
                if(!H.magicTurn(player)) return;
                if(card==='lhym_moJianJi') return Math.max(num,5.2);
                if(!H.isActionCard(card)) return;
                if(H.reserveYang(player,card)) return -1;
                if(H.reserveAttack(player,card)) return -1;
                if(['shengDun','xuRuo'].includes(get.name(card))&&H.hasDamageSpell(player)) return 0.5;
                if(get.type(card)==='gongJi') {
                    if(H.bestHit(player,card)>=0.7 && H.enemies(player).some(t=>H.comboHit(player,t,card)>=0.7&&H.attackScore(player,t,card)>0.5)) return Math.max(num,6);
                    if(H.hasDamageSpell(player)) return 1;
                    return;
                }
                var score=Math.max(0,...H.enemies(player).map(t=>H.forgeDamageScore(player,t,card)));
                if(score>0) return Math.max(num,get.name(card)==='moDan'?5:4.8);
            }},
            ai:{effect:{player:function(card,player,target) {
                var H=lib.lunHuiYiMeng;
                if(!H.isActionCard(card)||!H.magicTurn(player)) return;
                if(H.reserveYang(player,card)) return 'zeroplayertarget';
                if(H.reserveAttack(player,card)) return 'zeroplayertarget';
                if(['shengDun','xuRuo'].includes(get.name(card))&&H.hasDamageSpell(player)) return 'zeroplayertarget';
                if(get.type(card)==='gongJi') {
                    var hit=H.comboHit(player,target,card),best=H.bestHit(player,card);
                    if(best>=0.7) return hit>=0.7?[0,H.attackScore(player,target,card),0,0]:'zeroplayertarget';
                    if(H.hasDamageSpell(player)) return 'zeroplayertarget';
                    // 低命中后备不能退回本体的爆牌收益评分。
                    var candidates=H.enemies(player).filter(t=>H.comboHit(player,t,card)>0);
                    var fewest=Math.min(...candidates.map(t=>t.countCards('h')));
                    if(!hit || target.countCards('h')!==fewest) return 'zeroplayertarget';
                    return [0,H.attackScore(player,target,card),0,0];
                }
                var score=H.forgeDamageScore(player,target,card);
                if(score>0) return [1,4+3*score];
            }}},
            init:p=>{
                if(!p.hasSkill('lhym_longJing')) p.addSkill('lhym_longJing');
            },
            trigger:{source:'chengShouShangHaiAfter'},forced:true,
            filter:(e,p)=>e.num>0&&p.countZhiShiWu('lhym_longJing')<4,
            content:async function(event,trigger,player) { V.say(player,'jingTian/zhuJian',event);
                if(!player.hasSkill('lhym_longJing')) player.addSkill('lhym_longJing');
                await player.addZhiShiWu('lhym_longJing',1);
            },
        },
        lhym_longJing:{
            charlotte:true,mark:true,
            markimage:'extension/轮回遗梦/mark_longJingShi.webp',
            intro:{name:'龙精石',content:'持有#枚龙精石（上限4）',max:4}
        },
        lhym_sword:{charlotte:true,init:p=>H.syncMarks(p)},
        lhym_huiYan: {
            type:'qiDong',trigger:{player:'qiDong'},
            filter:(e,p)=>!!H.state(p).weapon&&p.canBiShaShuiJing()&&game.hasPlayer(t=>{
                const linked=H.state(p).weapon==='魔剑'&&t.hasSkill('lhym_qianNian');
                return t!==p&&(t.countCards('h')>0||(linked&&t.getExpansions('lhym_canYingPai').length>0));
            }),
            check:(e,p)=>{ var H = lib.lunHuiYiMeng; return p.getCards('h').some(c=>p.hasUseTarget(c)) && !H.preferPurify(p) && p.countCards('h')<p.getHandcardLimit()-1 &&
                (H.state(p).weapon==='魔剑'?H.faces(p).length>0:H.state(p).stage<3); },
            content:async function(event,trigger,player) { V.say(player,'jingTian/huiYan',event);
                const ts=(await player.chooseTarget('慧眼识珍：选择交牌的角色',true,(c,p,t)=>{
                    const linked=lib.lunHuiYiMeng.state(p).weapon==='魔剑'&&t.hasSkill('lhym_qianNian');
                    return t!==p&&(t.countCards('h')>0||(linked&&t.getExpansions('lhym_canYingPai').length>0));
                })
                    .set('ai',t=>t.countCards('h')).forResultTargets() || []);
                const target=ts?.[0]; if(!target) return;
                await player.removeBiShaShuiJing();
                let shadows=[];
                if(H.state(player).weapon==='魔剑'&&target.hasSkill('lhym_qianNian')&&C.shadows(target).length){
                    shadows=await C.pick(target,C.shadows(target),'千年相随：可用1张残影替代慧眼交牌',1,target.countCards('h')===0);
                    if(shadows.length)target.logSkill('lhym_qianNian',player);
                }
                const cards=shadows.length?shadows:(await target.chooseCard('h',1,true,'慧眼识珍：选择交给景天的牌【展示】')
                    .set('ai',c=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_21080_player"]; var target = _status.event["online_21080_target"]; return H.materialNeed(player,c)*3+H.handCost(target,c); }).set("online_21080_player", player).set("online_21080_target", target).forResultCards() || []);
                if(!cards?.length) return;
                const reward=H.useful(player,cards[0]);
                await target.showCards(cards,'慧眼识珍');
                await target.give(cards,player);
                if(shadows.length){V.say(target,'longKui/qianNian_'+(C.red(target)?'red':'blue'),event);await C.lightFace(player,cards[0]);}
                if(reward) await target.addNengLiang('baoShi',1);
            },
        },
        lhym_yinDan: {
            type:'faShu',enable:'faShu',filter:(e,p)=>H.canSilver(p),
            filterTarget:(c,p,t)=>p.side!==t.side,
            selectTarget:()=>_status.event.player.countNengLiang('baoShi'),multitarget:true,multiline:true,
            content:async function(event,trigger,player) { V.say(player,'jingTian/yinDan',event);
                const a=player.countNengLiang('baoShi'), b=player.countNengLiang('shuiJing');
                if(!H.canSilver(player)||event.targets?.length!==a) return;
                await player.removeNengLiang('baoShi',a);
                await player.removeNengLiang('shuiJing',b);
                for(const t of event.targets.slice().sortBySeat(player)) if(t.isIn()) await t.faShuDamage(b,player,'nocard');
            },
            ai:{order:4.8,baoShi:true,shuiJing:true,result:{target:(p,t)=>{ var H = lib.lunHuiYiMeng; return -H.damageScore(p,t,p.countNengLiang('shuiJing')); },
                player:p=>H.silverForge(p)||p.countNengLiang('shuiJing')>=2?1:-1}},
        },
        lhym_soul:{
            charlotte:true,
            markimage:'extension/轮回遗梦/mark_jianHun.webp',
            intro:{name:'剑魂',markcount:'gaiPai',mark:function(dialog,storage,owner){
                const cards=H.souls(owner);
                const isJingTian=[owner.name,owner.name1,owner.name2].includes('jingTian');
                const dragonViewer=isJingTian&&game.players.some(p=>p.isIn()&&
                    [p.name,p.name1,p.name2].includes('longKui')&&C.localViewer(p));
                if(cards.length&&(C.localViewer(owner)||dragonViewer)){
                    dialog.addText('角色专有盖牌');
                    dialog.addAuto(cards);
                    return false;
                }
                return cards.length?'共有'+cards.length+'张牌':'没有卡牌';
            }},
            mod:{cardEnabled2:(c,p)=>{if(c.hasGaintag?.('lhym_soul')) return false;}},
            onremove:p=>{const cards=H.souls(p); if(cards.length) p.loseToDiscardpile(cards);},
        },
        lhym_renJian: {
            charlotte:true,
            trigger:{player:'loseAfter'},forced:true,popup:false,
            filter:e=>e.hs?.length>0&&(e.type==='discard'||e.getParent().name==='useCard'||e.getParent().name==='respond'),
            content:async function(event,trigger,player) {
                const cards=trigger.hs.filter(c=>H.elements.includes(get.xiBie(c)));
                if(!cards.length) return;
                // 放到所属用牌/弃牌事件的 after 队列，确保实体牌结算结束；只携带本次失去的手牌。
                const parent=trigger.getParent();
                const next=game.createEvent('lhym_collectSoul',false);
                next.player=player; next.cards=cards;
                next.setContent(async function(event,trigger,player) { await lib.lunHuiYiMeng.collect(player,event.cards); });
                _status.event.next.remove(next);
                parent.after.push(next);
            },
        },
        lhym_jingHua: {
            charlotte:true,
            type:'qiDong',trigger:{player:'qiDong'},
            filter:(e,p)=>p.countZhiShiWu('lhym_longJing')>0&&H.faces(p,p.getCards('h')).length>0,
            check:(e,p)=>H.startupSafe(p,1),
            content:async function(event,trigger,player) { V.say(player,'jingTian/jingHua',event);
                for(let i=0;i<2;i++) {
                    const faces=H.faces(player,player.getCards('h'));
                    if(!faces.length||player.countZhiShiWu('lhym_longJing')<1) break;

                    const labels=faces.map(H.faceLabel);
                    const controls=i?labels.concat('cancel2'):labels;

                    // 联机客户端会重新执行 chooseControl/chooseCard 的 AI 与过滤函数。
                    // 不让这些回调捕获 H / faces / face / player 等外层变量，
                    // 所需数据统一通过事件字段传入。
                    const bestFace=faces.slice().sort((a,b)=>H.faceScore(player,b)-H.faceScore(player,a))[0];
                    const bestControl=i&&!H.startupSafe(player,1)?'cancel2':H.faceLabel(bestFace);

                    const f=await player.chooseControl(controls)
                        .set('prompt','魔剑净化：选择第'+(i+1)+'面（每面1龙精石+1匹配手牌）')
                        .set('lhymBestControl',bestControl)
                        .set('ai',function() {
                            return _status.event.lhymBestControl;
                        })
                        .forResultControl();

                    if(f==='cancel2') break;

                    const face=faces[labels.indexOf(f)];
                    if(!face) break;

                    const cards=(await player.chooseCard('h',1,true,'净化'+f+'：弃置匹配手牌【展示】')
                        .set('lhymFace',face)
                        .set('filterCard',function(card,player) {
                            var face=_status.event.lhymFace;
                            if(!face) return false;

                            var parts=face.split('_');
                            var element=parts[0];
                            var side=parts[1];

                            if(side==='yin' && get.name(card,player)==='anMie') return true;
                            if(side==='yang' && get.name(card,player)==='shengGuang') return true;

                            return get.xiBie(card,player)===element &&
                                get.type(card,player)===(side==='yin' ? 'gongJi' : 'faShu');
                        })
                        .set('ai',function(card) {
                            var player=_status.event.player;
                            var value=get.value(card,player);
                            var hand=player.countCards('h');
                            var limit=player.getHandcardLimit();
                            var wildcard=['anMie','shengGuang'].includes(get.name(card,player));
                            return 8-value+(hand>=limit?2:0)-(wildcard?12:0);
                        })
                        .forResultCards() || []);

                    if(!cards?.length) break;

                    await player.removeZhiShiWu('lhym_longJing',1);
                    await player.discard(cards).set('showCards',true);
                    H.state(player).faces.push(face);V.complete(player,event);
                    H.sync(player);
                }
            },
        },
        lhym_moJianJi: {
            charlotte:true,
            type:'faShu',enable:'faShu',filter:(e,p)=>H.available(p).length>0,
            group:['lhym_yinYang','lhym_jianPo'],
            selectTarget:-1,filterTarget:(c,p,t)=>p===t,
            content:async function(event,trigger,player) {
                const recipes=H.available(player); if(!recipes.length) return;
                const name=await player.chooseControl(recipes.map(r=>r[0])).set('prompt','魔剑技：选择已解锁且有剑魂的配方')
                    .set('choiceList',recipes.map(r=>r[1].map(x=>H.labels[x]).join('、')+'：'+r[2]))
                    .set('ai',()=>{ var recipes = _status.event["online_27329_recipes"]; var H = lib.lunHuiYiMeng; var player = _status.event["online_27329_player"]; return recipes.slice().sort((a,b)=>H.recipeScore(player,b)-H.recipeScore(player,a))[0][0]; }).set("online_27329_recipes", recipes).set("online_27329_player", player).forResultControl();
                const r=recipes.find(r=>r[0]===name); if(!r) return;
                const paid=[];
                for(const x of r[1]) {
                    const pool=H.souls(player).filter(c=>get.xiBie(c)===x&&!paid.includes(c));
                    const cs=(await player.chooseCardButton(pool,'移除1张'+H.labels[x]+'系剑魂',1,true).set('ai',b=>{ var player = _status.event["online_27911_player"]; return 8-get.value(b.link,player); }).set("online_27911_player", player).forResultLinks() || []);
                    if(!cs?.length) return; paid.push(cs[0]);
                }
                let boost=false, extraHand=[];
                if(r[1].length===1) {
                    const pool=H.souls(player).filter(c=>get.xiBie(c)===r[1][0]&&!paid.includes(c));
                    if(pool.length) {
                        const cs=(await player.chooseCardButton(pool,'可额外移除1张同系剑魂，法术伤害+1',1)
                            .set('ai',function(){ return _status.event.lhymBoost?1:0; }).set('lhymBoost',H.shouldBoost(player,r)).forResultLinks() || []);
                        if(cs?.length) {paid.push(cs[0]); boost=true;}
                    }
                } else {
                    extraHand=(await player.chooseCard('h',1,true,'多属性魔剑技：另弃置1张手牌')
                        .set('ai',c=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_28715_player"]; return H.handCost(player,c); }).set("online_28715_player", player).forResultCards() || []);
                    if(!extraHand?.length) return;
                }
                await player.discard(paid,'lhym_soul');
                if(extraHand.length) await player.discard(extraHand);
                await H.cast(player,r,boost); H.sync(player);
            },
            ai:{order:4.5,result:{player:p=>{ var H = lib.lunHuiYiMeng; return Math.max(0,...H.available(p).map(r=>H.recipeScore(p,r))); }}},
        },
        lhym_canYing: {
            charlotte:true,
            trigger:{source:'gongJiMingZhong'},forced:true,filter:e=>!e.yingZhan,
            content:async function(event,trigger,player) { V.say(player,'jingTian/canYing',event); player.addFaShu(); },
        },
        lhym_yinYang:{
            charlotte:true,},
        lhym_jianPo:{
            charlotte:true,},
        lhym_zhaoDan: {
            charlotte:true,
            trigger:{player:'gongJiBefore'},priority:20,
            filter:e=>!e.yingZhan&&get.xiBie(e.card)!=='lei',
            check:(e,p)=>get.xiBie(e.card)!=='an' || (p.hasSkill('lhym_leiDong')&&p.hasSkill('lhym_poZhen')&&p.canBiShaShuiJing()),
            content:async function(event,trigger,player) { V.say(player,'jingTian/zhaoDan',event);
                trigger.card={name:trigger.card.name,xiBie:'lei',mingGe:trigger.card.mingGe,duYou:trigger.card.duYou,
                    isCard:true,cards:trigger.cards.slice()};
            },
        },
        lhym_chongZhu: {
            charlotte:true,
            type:'qiDong',trigger:{player:'qiDong'},filter:(e,p)=>H.canForge(p),check:(e,p)=>H.startupSafe(p,H.state(p).stage+1),
            content:async function(event,trigger,player) {
                const s=H.state(player), stage=s.stage;
                if(!H.canForge(player)) return;
                const options=H.branches[stage], labels=options.map(x=>get.translation(x));
                const label=await player.chooseControl(labels).set('prompt',['续接剑身','重铸剑锋','神剑复明'][stage]+'：选择永久强化')
                    .set('choiceList',options.map(x=>get.translation(x+'_info')))
                    .set('ai',()=>{ var labels = _status.event["online_30576_labels"]; var stage = _status.event["online_30576_stage"]; var player = _status.event["online_30576_player"]; var H = lib.lunHuiYiMeng; return labels[stage===0?0:stage===1?(player.countCards('h',c=>get.type(c)==='gongJi')>=stage+3?1:0):(H.enemies(player).length>1?1:0)]; }).set("online_30576_labels", labels).set("online_30576_stage", stage).set("online_30576_player", player)
                    .forResultControl();
                const branch=options[labels.indexOf(label)]; if(!branch) return;
                const cards=(await player.chooseCard('h',stage+1,true,'神剑重铸：弃置'+(stage+1)+'张雷系牌【展示】')
                    .set('filterCard',c=>get.xiBie(c)==='lei').set('ai',c=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_31059_player"]; return H.handCost(player,c); }).set("online_31059_player", player).forResultCards() || []);
                if(cards?.length!==stage+1) return;
                await player.removeZhiShiWu('lhym_longJing',[1,1,2][stage]);
                await player.discard(cards).set('showCards',true);
                s.stage++; s.branches.push(branch); H.sync(player);V.forge(player,event);
            },
        },
        lhym_fengMang: {
            charlotte:true,
            trigger:{player:'gongJiSheZhi'},forced:true,filter:(e,p)=>!e.yingZhan&&H.state(p).branches.includes('lhym_fengMang'),
            content:async function(event,trigger,player) { V.say(player,'jingTian/fengMang',event); trigger.changeDamageNum(1); },
        },
        lhym_houFa: {
            charlotte:true,
            trigger:{player:'gongJiSheZhi'},forced:true,filter:(e,p)=>!!e.yingZhan&&H.state(p).branches.includes('lhym_houFa'),
            content:async function(event,trigger,player) { V.say(player,'jingTian/houFa',event); trigger.changeDamageNum(2); },
        },
        lhym_poZhen: {
            charlotte:true,
            trigger:{player:'gongJiBefore'},filter:(e,p)=>H.state(p).branches.includes('lhym_poZhen')&&!e.yingZhan&&p.canBiShaShuiJing(),
            check:(e,p)=>get.xiBie(e.card)!=='an' && e.target?.countCards('h')>0 &&
                !e.target.hasExpansions('_shengDun'),
            content:async function(event,trigger,player) { V.say(player,'jingTian/poZhen',event); await player.removeBiShaShuiJing(); trigger.wuFaYingZhan(); },
        },
        lhym_lianZhan: {
            charlotte:true,
            trigger:{player:'gongJiEnd'},usable:1,forced:true,filter:(e,p)=>H.state(p).branches.includes('lhym_lianZhan')&&!e.yingZhan,
            content:async function(event,trigger,player) { V.say(player,'jingTian/lianZhan',event); player.addGongJi(); },
        },
        lhym_leiDong: {
            charlotte:true,
            trigger:{player:'gongJiSheZhi'},forced:true,filter:(e,p)=>H.state(p).branches.includes('lhym_leiDong')&&get.xiBie(e.card)==='lei',
            content:async function(event,trigger,player) { V.say(player,'jingTian/leiDong',event); trigger.changeDamageNum(1); },
        },
        lhym_baHuang: {
            charlotte:true,
            trigger:{source:'gongJiMingZhong'},
            filter:(e,p)=>H.state(p).branches.includes('lhym_baHuang')&&e.damageNum>0&&H.enemies(p).some(t=>t!==e.target),
            check:()=>true,
            content:async function(event,trigger,player) { V.say(player,'jingTian/baHuang',event);
                const n=trigger.damageNum;
                const ts=(await player.chooseTarget('剑荡八荒：对另一名对手造成'+n+'点攻击伤害',true,(c,p,t)=>t.side!==p.side&&t.playerid!==_status.event.onlineSwordExcludedId).set('onlineSwordExcludedId', trigger.target && trigger.target.playerid)
                    .set('ai',t=>{ var H = lib.lunHuiYiMeng; var player = _status.event["online_33540_player"]; var n = _status.event["online_33540_n"]; return H.damageScore(player,t,n); }).set("online_33540_player", player).set("online_33540_n", n).forResultTargets() || []);
                if(ts?.[0]) await ts[0].damage(n,player,'nocard').set('lhym_sweep',true);
            },
        },
        lhym_moRoute:{
            charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_route_moJian.webp',intro:{content:()=>H.recipes.map(r=>"<span class='greentext'>法术【"+r[0]+"】</span><br>（"+r[1].map(x=>H.labels[x]).join('、')+'）：'+colorResourceKeywords(r[2])).join('<br>')}},
        lhym_zhenRoute:{
            charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_route_zhenYaoJian.webp',intro:{content:()=>H.branches.map((bs,i)=>'<b>'+['续接剑身','重铸剑锋','神剑复明'][i]+'</b>：'+[1,1,2][i]+'龙精石＋'+(i+1)+'雷系手牌。二选一：<br>'+bs.map(x=>H.skillText(x,get.translation(x))).join('<br>')).join('<br><br>')}},
    };
    skill.lhym_moJianMark={
        charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_moJian.webp',
        group:['lhym_soul','lhym_renJian','lhym_jingHua','lhym_moJianJi','lhym_canYing','lhym_yinYang','lhym_jianPo','lhym_qianNianGongMing'],
        intro:{name:'专属【魔剑】',content:(s,p)=>H.routeText(p)}
    };
    skill.lhym_zhenYaoJianMark={
        charlotte:true,mark:true,markimage:'extension/轮回遗梦/mark_zhenYaoJian.webp',
        group:['lhym_zhaoDan','lhym_chongZhu','lhym_fengMang','lhym_houFa','lhym_poZhen','lhym_lianZhan','lhym_leiDong','lhym_baHuang','lhym_shenShuZhaoDan'],
        intro:{name:'专属【镇妖剑】',content:(s,p)=>H.routeText(p)}
    };
    const lampFileElement={shui:'shui',huo:'huo',lei:'lei',feng:'feng',di:'tu'};
    for(const element of H.elements) for(const status of ['empty','yin','yang','both']) {
        skill['lhym_wuLing_'+element+'_'+status]={
            charlotte:true,
            mark:true,
            markimage:'extension/轮回遗梦/mark_wuLing_'+lampFileElement[element]+'_'+status+'.webp',
            intro:{name:H.labels[element]+'灵阴阳灯',content:(s,p)=>H.lampText(p,element)},
        };
    }
    skill.lhym_sword.mod={
        aiValue:(p,c,n)=>n+H.materialValue(p,c),
        aiUseful:(p,c,n)=>n+H.materialValue(p,c),
    };
    const descriptions = {
        lhym_shuangJian:['被动【双剑宿缘】','（游戏开始时）选择魔剑或镇妖剑，获得对应武器及专属技能；本局不能更改。'],
        lhym_yongAn:['被动【永安当】',"<!--diy-skill-description-->能量上限+2。<span style=\"color:#E6B85C\">（游戏开始时）</span>+2<span class='lan'>【水晶】</span>。<span style=\"color:#E6B85C\">（执行【特殊行动】后）</span>+1<span style=\"color:#E02B17\">【宝石】</span>。"],
        lhym_dianDang:['响应【典当】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（获得<span style=\"color:#E02B17;font-weight:bold\">【宝石】</span>时）</span>将每颗<span style=\"color:#E02B17;font-weight:bold\">【宝石】</span>改为2<span class=\"lan\">【水晶】</span>。"],
        lhym_feiLong:['被动【飞龙探云手】',"<!--diy-skill-description-->你无法执行【提炼】。<span style=\"color:#E6B85C\">（其他角色提炼结算后）</span>翻开并弃置牌库顶1张牌【展示】；若为法术牌，取得该角色此次提炼获得且仍持有的1颗星石。"],
        lhym_zhuJian:['被动【铸剑】','（造成实际伤害后）+1【龙精石】。'],
        lhym_longJing:["专属【龙精石】","<!--diy-skill-description-->上限4，用于【魔剑净化】或镇妖剑修复。"],
        lhym_sword:['双剑宿缘','本局武器及永久培养记录。'],
        lhym_huiYan:['启动【慧眼识珍】',"<!--diy-skill-description--><span class=\"lan\">【水晶】</span>选择1名有手牌的其他角色，其选择1张手牌交给你【展示】；<br><span style=\"color:#e6b85c\">（若该牌符合魔剑未激活面或镇妖剑下一阶段材料要求）</span>该角色+1<span style=\"color:#E02B17;font-weight:bold\">【宝石】</span>。"],
        lhym_yinDan:['法术【倾国银弹波】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（至少1</span><span style=\"color:#E02B17\">【宝石】</span><span style=\"color:#FFC000\">1</span><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">）</span>移除全部能量，选择<span style=\"color:#E02B17\">【宝石】</span>数名不同对手，各造成<span class='lan'>【水晶】</span>数点法术伤害③。"],
        lhym_soul:["专属【剑魂】","<!--diy-skill-description-->暗置实体牌，上限10，超出时选择弃置的<span style=\"color:#9b72e8;font-weight:bold\">【剑魂】</span>；操控龙葵的玩家也可以查看牌面。"],
        lhym_renJian:['被动【人剑相应】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（你使用或弃置非光暗实体手牌后）</span>若该牌结算后仍在弃牌区，暗置为【剑魂】。"],
        lhym_jingHua:['启动【魔剑净化】','选择1至2个未激活面；每面移除1【龙精石】并展示弃置1张匹配手牌。攻击牌激活阴面，法术牌激活阳面；【暗灭】可激活任意阴面，【圣光】可激活任意阳面。'],
        lhym_moJianJi:['法术【魔剑技】',"<!--diy-skill-description-->移除配方所需<span style=\"color:#9b72e8;font-weight:bold\">【剑魂】</span>，发动对应魔剑技。详见魔剑路线。<br>单系可额外移除1张同系<span style=\"color:#9b72e8;font-weight:bold\">【剑魂】</span>，使法术伤害+1；多系另弃置1张手牌。"],
        lhym_canYing:['被动【残影剑】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击命中时）</span>+1【法术行动】。"],
        lhym_yinYang:['被动【阴阳五灵】','魔剑有水、火、雷、风、地五系阴阳十面，初始全部未激活；同系双面激活后永久解锁该属性。'],
        lhym_jianPo:['被动【剑魄通灵】','（配方涉及属性全部解锁后）可发动对应魔剑技。'],
        lhym_zhaoDan:['响应【神剑照胆】','（主动攻击时）将本次攻击视为雷系。'],
        lhym_chongZhu:['启动【神剑重铸】','支付修复费用，完成该阶段修复，并从两项强化中选择一项永久获得。详见镇妖剑路线。'],
        lhym_fengMang:['被动【锋芒毕露】','（主动攻击时）攻击伤害+1。'],
        lhym_houFa:['被动【后发制人】','（应战攻击时）攻击伤害+2。'],
        lhym_poZhen:['响应【镇妖破阵】',"<!--diy-skill-description--><span class=\"lan\">【水晶】</span><span style=\"color:#e6b85c\">（主动攻击前①）</span>本次攻击无法应战。"],
        lhym_lianZhan:["响应【御剑追锋】【回合限定】","<!--diy-skill-description--><span style=\"color:#E6B85C\">（【攻击行动】结束后）</span>+1【攻击行动】。"],
        lhym_leiDong:['被动【九霄雷动】','你的雷系攻击伤害+1。'],
        lhym_baHuang:['响应【剑荡八荒】','（攻击命中后②）对另一名对手造成等额攻击伤害。'],
        lhym_moRoute:["专属【魔剑路线】",'五灵配方与效果，点击标记查看。'],
        lhym_zhenRoute:["专属【镇妖剑路线】",'三阶段材料与二选一强化，点击标记查看。'],
    };
    // 仙剑三同伴：实体盖牌始终挂在其所有者名下，花楹持有者只保存公开引用。
    const C=lib.lhymCompanion={
        blueSkills:['lhym_cangFeng','lhym_moJianHuTi','lhym_youLan'],
        redSkills:['lhym_daiJun','lhym_buYuan','lhym_huanGui','lhym_hongYing'],
        bondSkills:['lhym_qianNian','lhym_youLan','lhym_hongYing'],
        isCompanion:p=>[p.name,p.name1,p.name2].some(id=>id==='xueJian'||id==='longKui'),
        localViewer:p=>{
            const viewer=game.me;
            return !!viewer&&!!p&&(viewer===p||viewer._trueMe===p||p._trueMe===viewer||
                !!viewer._trueMe&&viewer._trueMe===p._trueMe);
        },
        magicJings:()=>game.players.filter(t=>H.state(t).weapon==='魔剑'),
        refreshBond(p){
            if(!p?.isIn()||!p.hasSkill('lhym_jianZhongRen'))return;
            const key='lhym_longKuiBond',active=C.magicJings().length>0;
            if(p.additionalSkills?.[key]?.length)p.removeAdditionalSkill(key);
            for(const id of C.bondSkills){
                if(active&&!p.hasSkill(id))p.addSkill(id);
                else if(!active&&p.hasSkill(id))p.removeSkill(id);
            }
            C.syncFormSkills(p,C.red(p));
        },
        refreshAllBonds(){for(const p of game.players.filter(t=>t.hasSkill('lhym_jianZhongRen')))C.refreshBond(p);},
        async lightFace(p,card){
            const faces=H.faces(p,[card]);if(!faces.length)return;
            const best=faces.slice().sort((a,b)=>H.faceScore(p,b)-H.faceScore(p,a))[0];
            const face=faces.length===1?faces[0]:await p.chooseControl(faces).set('prompt','千年相随：选择免费激活的属性面')
                .set('choiceList',faces.map(H.faceLabel)).set('lhymBestFace',best).set('ai',()=>_status.event.lhymBestFace).forResultControl();
            if(!faces.includes(face)||H.state(p).faces.includes(face))return;
            H.state(p).faces.push(face);H.sync(p);V.complete(p,_status.event);game.log(p,'通过【千年相随】激活',H.faceLabel(face));
        },
        dew:p=>p.getExpansions('lhym_huaLu'),
        shadows:p=>p.getExpansions('lhym_canYingPai'),
        red:p=>p.storage.lhym_red===true,
        canTwin:p=>C.shadows(p).length>0||C.shadows(p).length<4&&p.countCards('h',c=>get.type(c)==='gongJi')>0,
        async twin(p,free=false){
            if(!C.canTwin(p)||(!free&&!p.canBiShaShuiJing()))return;
            const red=C.red(p);if(!free)await p.removeBiShaShuiJing();C.form(p,!red);
            V.batch(p,free?['longKui/resonance_'+(red?'red':'blue')]:red?['longKui/twin_red']:['longKui/twin_blue','longKui/twin_reply'],_status.event);
            const opts=[];
            if(C.shadows(p).length<4&&p.countCards('h',c=>get.type(c)==='gongJi')>0)opts.push('收入残影');
            if(C.shadows(p).length>0)opts.push('取回残影');
            const choice=opts.length===1?opts[0]:await p.chooseControl(opts).set('prompt','双生：选择转形后的效果').set('ai',()=>0).forResultControl();
            if(choice==='收入残影'){
                const cs=await p.chooseCard('h',1,true,c=>get.type(c)==='gongJi').set('ai',c=>8-get.value(c)).forResultCards()||[];
                if(cs.length)await p.addGaiPai(cs,'lhym_canYingPai');
            }else if(choice==='取回残影'){
                const cs=await C.pick(p,C.shadows(p),'双生：将1张残影收入手牌',1,true);
                if(cs.length)await p.gain(cs,'gain2');
            }
        },
        syncFormSkills(p,red){
            game.broadcastAll(function(target,isRed,blueSkills,redSkills){
                target.enableSkill('lhym_longKuiForm');
                target.disableSkill('lhym_longKuiForm',isRed?blueSkills:redSkills);
            },p,red,C.blueSkills,C.redSkills);
        },
        form(p,red){
            const switching=typeof p.storage.lhym_red==='boolean'&&p.storage.lhym_red!==red;
            p.storage.lhym_red=red;p.syncStorage('lhym_red');
            if(p.marks?.lhym_jianZhongRen)p.unmarkSkill('lhym_jianZhongRen');
            H.setPortrait(p,red?'longKui_red.webp':'longKui_blue.webp','longKui',switching);
            C.refreshBond(p);
        },
        holder(p){return game.players.find(t=>t.playerid===p.storage.lhym_flowerHolder)||p;},
        refreshFlower(p){
            if(!p)return;
            const holder=C.holder(p);
            if(holder&&holder.isIn&&holder.isIn()&&holder.hasSkill('lhym_flowerGuest')){
                holder.markSkill('lhym_flowerGuest');
            }
        },
        move(p,t){
            const old=C.holder(p);if(old!==t&&[t.name,t.name1,t.name2].includes('jingTian'))V.say(p,'xueJian/flower',_status.event);
            old.unmarkSkill('lhym_flowerGuest');
            p.storage.lhym_flowerHolder=t.playerid;p.syncStorage('lhym_flowerHolder');
            t.storage.lhym_flowerGuest=p.playerid;t.syncStorage('lhym_flowerGuest');t.markSkill('lhym_flowerGuest');
            C.refreshFlower(p);
            game.log(p,'将【花楹】移至',t);
        },
        jing(p,weapon){return game.players.filter(t=>t!==p&&t.side===p.side&&H.state(t).weapon===weapon);},
        async pick(p,cards,prompt,n=1,forced=false){
            if(!cards.length)return [];
            return await p.chooseCardButton(cards,prompt,n,forced).set('ai',b=>8-get.value(b.link,_status.event.player)).forResultLinks()||[];
        },
        async friend(p,prompt){return (await p.chooseTarget(prompt,true,(c,p,t)=>t.side===p.side)
            .set('ai',t=>Math.max(0,t.getZhiLiaoLimit()-(t.zhiLiao||0))+t.countCards('h')*.1).forResultTargets()||[])[0];},
        async healMove(p,n){const t=await C.friend(p,'选择花楹的新持有者');if(t){C.move(p,t);await t.changeZhiLiao(n,p);}},
        async spend(p,cards,tag){
            if(!cards.length)return;
            await p.showCards(cards);
            await p.loseToDiscardpile(cards);
            if(tag==='lhym_huaLu')C.refreshFlower(p);
        },
        async counter(p,e,card){
            const targets=await p.chooseTarget('魔剑护体：选择应战目标',true,(c,p,t)=>t.side!==p.side&&t.playerid!==_status.event.lhymExcluded&&lib.filter.targetEnabled(_status.event.lhymCard,p,t))
                .set('lhymExcluded',e.player.playerid).set('lhymCard',card).set('ai',t=>-t.countCards('h')).forResultTargets()||[];
            if(!targets.length)return;
            await p.showCards([card]);e.weiMingZhong();
            const next=p.useCard(card,[card],targets);next.yingZhan=true;next.lhym_shadow=true;
            await next;if(p.isIn())C.form(p,true);
        },
    };
    V.files.push(
        ...['wuXie','wuXie_gain','liuJie','chuQiao','liHun','xieJian','sheXin','miTian','wuXing','qinTi','gouMai','heCheng','tiLian']
            .map(name=>'audio/skill/xieJianXian/'+name+'.mp3')
    );
    const X=lib.lhymXieJianXian={
        isCharacter(p,id){return !!p&&[p.name,p.name1,p.name2].includes(id);},
        syncThoughtMark(p){
            if(!p)return;
            game.broadcastAll(function(target){
                if(!target)return;
                if(target.hasSkill&&target.hasSkill('lhym_xieNian')){
                    target.markSkill('lhym_xieNian');
                }else if(target.unmarkSkill){
                    target.unmarkSkill('lhym_xieNian');
                }
            },p);
        },
        isBasicTag(tag){
            if(!tag)return false;
            if(lib.skill[tag]?.tag?.jiChuXiaoGuo)return true;
            return Object.values(game.jiChuXiaoGuo||{}).some(list=>Array.isArray(list)&&list.includes(tag));
        },
        thought(p){return p?.countZhiShiWu?.('lhym_xieNian')||0;},
        // Shared, read-only AI estimates. Never call get.effect here: these methods
        // also run from effect.player and would recurse through the same skill.
        ai:{
            manual(p){
                return !!(p.isOnline?.()||(p.isUnderControl?.(true)&&!_status.auto));
            },
            people(){return game.players.filter(t=>t.isIn());},
            sign(p,t){return p.side===t.side?1:-1;},
            thoughts(p){return lib.lhymXieJianXian.thought(p);},
            attacks(p,exclude){
                return p.getCards('h').filter(c=>c!==exclude&&get.type(c)==='gongJi'&&
                    lib.filter.cardEnabled(c,p)&&game.players.some(t=>t.isIn()&&t.side!==p.side&&p.canUseXingBei(c,t)));
            },
            bonus(n,spell=true){return (n>30?1:0)+(n>(spell?15:10)?1:0);},
            value(p,n,viewer=p){
                const A=lib.lhymXieJianXian.ai;
                n=Math.max(0,Math.min(99,n));
                // Only inspect our own cards; another player's hand size is public.
                const own=p===viewer;
                const attacks=own?A.attacks(p).length:Math.min(2,p.countCards('h'));
                const fresh=!p.storage.lhym_xieNianFirstAttackUsed||_status.currentPhase!==p;
                let v=n*.12;
                if(n>5)v+=attacks?(fresh?2.8:.8):.4;
                if(n>10)v+=attacks?2+Math.min(2,attacks)*.7:.6;
                if(n>15)v+=2.8;
                if(n>20)v+=attacks>1?3:1;
                const next=n-(p.hasSkill('lhym_wuXingWuZhi')?1:0);
                if(next>25)v+=p.countEmptyNengLiang()>0?2: .6;
                if(n>30)v+=3.5;
                if(p.hasSkill('lhym_xieLingQinTi')){
                    v+=Math.min(n,6)*.35;
                    if(next>5)v+=2; // A rescue can pay five and retain the skill.
                }
                return v;
            },
            delta(p,from,to,viewer=p){return lib.lhymXieJianXian.ai.value(p,to,viewer)-lib.lhymXieJianXian.ai.value(p,from,viewer);},
            snapshot(){
                const people=lib.lhymXieJianXian.ai.people();
                const state=new Map(people.map(t=>[t,{hand:t.countCards('h'),heal:t.zhiLiao||0,thought:lib.lhymXieJianXian.thought(t)}]));
                state.morale=new Map(people.map(t=>[t.side,get.shiQi(t.side)]));
                return state;
            },
            damage(p,t,n,state,bonus=0){
                if(n<=0)return 0;
                const A=lib.lhymXieJianXian.ai, s=state.get(t);
                if(!s)return 0;
                // Core treatment precedes chengShouShangHaiBefore. Thought bonus
                // only applies if damage remains, then LiHun reduces it by one.
                const heal=Math.min(s.heal,n);
                s.heal-=heal;
                n-=heal;
                if(n>0)n+=bonus;
                if(n>=2&&s.thought>0&&t.hasSkill('lhym_xieQiLiHun')){
                    n--;
                    if(t!==p){s.thought--;state.get(p).thought=Math.min(99,state.get(p).thought+1);}
                }
                const actual=Math.max(0,n);
                const spill=Math.max(0,s.hand+actual-t.getHandcardLimit());
                s.hand=Math.min(t.getHandcardLimit(),s.hand+actual);
                // Conservative: do not assume a complete QinTi rescue chain in estimates.
                let cost=actual*.25+heal*.2+spill*2.5;
                if(t.hasSkillTag('noShiQiXiaJiang'))cost=actual*.15+heal*.2;
                else if(spill>0){
                    const morale=state.morale.get(t.side);
                    if(spill>=morale)cost+=30;
                    else if(morale<=7)cost*=1.6;
                    state.morale.set(t.side,Math.max(0,morale-spill));
                }
                return -A.sign(p,t)*cost;
            },
            basic(p,t,name,state,sourceThought){
                const A=lib.lhymXieJianXian.ai;
                if(t.hasSkill('lhym_liuJieZhiWai')||t.hasSkill('lhym_wuXingWuZhi'))return 0;
                if(name==='zhongDu')return .8*A.damage(p,t,1,state,A.bonus(sourceThought));
                if(name==='xuRuo'){
                    if(t.hasJiChuXiaoGuo('_xuRuo'))return 0;
                    const room=t.getHandcardLimit()-state.get(t).hand;
                    // Weakness can refill an empty hand, or cost the action phase.
                    const cost=room>=3?(state.get(t).hand<=1?-.6:.2):1.8;
                    return -A.sign(p,t)*cost;
                }
                return 0;
            },
            hit(p,t,c,n,afterFirst=false){
                if(!p.canUseXingBei(c,t))return 0;
                if(t.hasJiChuXiaoGuo('_shengDun'))return .15;
                const unavoidable=n>20||(n>5&&!afterFirst&&!p.storage.lhym_xieNianFirstAttackUsed)||get.name(c)==='anMie';
                // Unanswerable attacks can still be stopped by Holy Light/shields.
                return unavoidable?.9:Math.max(.25,.75-t.countCards('h')*.05);
            },
            nextAttack(p,n,exclude,afterFirst=false){
                const A=lib.lhymXieJianXian.ai;
                return Math.max(0,...A.attacks(p,exclude).flatMap(c=>A.people().filter(t=>t.side!==p.side).map(t=>
                    A.hit(p,t,c,n,afterFirst)*A.damage(p,t,2,A.snapshot(),A.bonus(n,false)))));
            },
            slash(p,t,exclude){
                const A=lib.lhymXieJianXian.ai,old=A.thoughts(p),count=A.thoughts(t);
                if(!count)return -100;
                const n=Math.min(99,old+(t===p?0:1)),enhanced=t===p||count>1;
                const state=A.snapshot();state.get(p).thought=n;
                // 预估攻击时扣除仍在手中的出牌；命中响应时牌已离手，不重复扣除。
                const spent=exclude?p.getCards('h').filter(c=>c===exclude||exclude.cards?.includes(c)).length:0;
                state.get(p).hand=Math.max(0,state.get(p).hand-spent);
                const selfHand=state.get(p).hand;
                if(t!==p)state.get(t).thought--;
                const damage=enhanced?2:1;
                const dealt=A.damage(p,t,damage,state,A.bonus(n));
                let score=dealt+A.delta(p,old,n);
                if(t!==p)score+=A.sign(p,t)*A.delta(t,count,count-1,p);
                const follow=enhanced?A.nextAttack(p,n,exclude,true):0;
                // Existing attack actions already cover some/all remaining cards.
                const action=_status.event?.getParent?.('xingDong',true);
                // xingDong decrements the current action AFTER attack responses.
                const pending=action&&!action.extraXingDong&&['gongJi','gongJiOrFaShu'].includes(action.xingDong)?1:0;
                const spare=Math.max(0,(p.storage.gongJi||0)+(p.storage.gongJiOrFaShu||0)-pending);
                const cards=A.attacks(p,exclude).length;
                const extra=cards>spare?follow*.9:0;
                if(t===p){
                    const drawn=state.get(p).hand-selfHand;
                    // 无爆牌时，自伤摸牌本身有收益，且新牌可能兑现追加攻击。
                    // 不要求手里预留下一张攻击牌，也不因低士气一律拒绝。
                    if(state.morale.get(p.side)<get.shiQi(p.side))return -100;
                    const drawValue=Math.max(0,drawn)*1.5;
                    const freshAttack=drawn>0&&cards<=spare ? .6 : 0;
                    if(!extra&&!drawValue)return -100;
                    score+=drawValue+freshAttack;
                }
                return score+extra;
            },
            isBasic(c){return !!c&&typeof c==='object'&&Object.values(game.jiChuXiaoGuo||{}).some(list=>Array.isArray(list)&&list.includes(get.name(c)));},
            sheXin(p,cards){
                const A=lib.lhymXieJianXian.ai;
                cards=cards||p.getCards('h').filter(c=>get.type(c)==='faShu');
                if(!cards.length||!p.canBiShaShuiJing())return -100;
                const rounds=new Set(cards.map(c=>get.name(c,p))).size,weak=cards.length>2?1:0;
                const old=A.thoughts(p),human=p.hasSkill('lhym_liuJieZhiWai');
                const n=Math.min(99,old+(human?rounds+weak:0));
                const state=A.snapshot();state.get(p).hand-=cards.length;state.get(p).thought=n;
                // Startup preserves the normal attack/spell action; favour using
                // available material instead of waiting indefinitely for more names.
                let score=-.8-(p.countNengLiang('shuiJing')?0:.4);
                score-=cards.reduce((v,c)=>v+Math.max(0,get.value(c,p))*.15,0);
                score+=Math.min(cards.length,Math.max(0,p.countCards('h')-p.getHandcardLimit()+2))*.35;
                const returned=human?Math.min(rounds+weak,Math.max(0,p.countEmptyNengLiang()+1)):0;
                if(human){
                    score+=A.delta(p,old,n);
                    score+=returned*1.5;
                }
                for(let i=0;i<rounds;i++)for(const t of A.people())score+=A.basic(p,t,'zhongDu',state,n);
                if(weak)for(const t of A.people())score+=A.basic(p,t,'xuRuo',state,n);
                if(state.morale.get(p.side)<=0)return -100;
                const gem=p.countNengLiang('baoShi')-(p.countNengLiang('shuiJing')>0?0:1)+returned;
                // _qiDong disables special actions, so do not discard the only
                // actionable cards and then rely on purchase/refine/synthesis.
                const legalAttack=A.attacks(p).some(c=>!cards.includes(c)&&A.people().some(t=>t!==p&&p.canUseXingBei(c,t)));
                const legalRecall=A.miTian(p)>0&&A.miTian(p,{thought:n,gem,hand:Math.max(0,p.countCards('h')-cards.length)})>0;
                if(!legalAttack&&!legalRecall)return -100;
                return score+(human?1.5:1);
            },
            miTian(p,preview){
                const A=lib.lhymXieJianXian.ai,others=A.people().filter(t=>t!==p&&A.thoughts(t)>0);
                if(!(preview?preview.gem>0:p.canBiShaBaoShi())||!others.length)return -100;
                const old=preview?preview.thought:A.thoughts(p),n=Math.min(99,old+others.reduce((v,t)=>v+A.thoughts(t),0));
                const state=A.snapshot();state.get(p).thought=n;
                if(preview)state.get(p).hand=preview.hand;
                for(const t of others)state.get(t).thought=0;
                const action=_status.event?.getParent?.('xingDong',true);
                const dedicated=action?.xingDong==='faShu'||(!action&&p.storage.faShu>0);
                const remainingAttacks=(p.storage.gongJi||0)+Math.max(0,(p.storage.gongJiOrFaShu||0)-(dedicated?0:1));
                // Banking the 11-thought attack tier is not an immediate attack:
                // paying for recall usually consumes this turn's common action.
                const resourceWeight=remainingAttacks>0&&A.attacks(p).length?1:.35;
                let score=A.delta(p,old,n)*resourceWeight-2;
                for(const t of others){
                    const count=A.thoughts(t);
                    score+=A.sign(p,t)*A.delta(t,count,0,p);
                    score+=A.damage(p,t,Math.min(3,count),state,A.bonus(n));
                }
                // Compare the immediate attack chain against recalling first. A
                // dedicated spell action need not compete with an attack action.
                if(!(p.storage.faShu>0)){
                    const attack=A.nextAttack(p,old);
                    const chain=Math.max(0,...others.filter(t=>t.side!==p.side&&A.thoughts(t)>1).map(t=>A.slash(p,t)));
                    score-=Math.min(5,attack+chain*.5);
                    if(!p.storage.lhym_xieNianFirstAttackUsed&&old<=5&&n>5)score+=A.nextAttack(p,n);
                }
                if((p.hasSkill('lhym_xieLingChuQiao')&&get.shiQi(p.side)<=9)||
                    (p.hasSkill('lhym_xieLingQinTi')&&get.shiQi(p.side)<=2))score-=1.5;
                return score;
            },
        },
        async add(p,n=1){
            if(!p?.isIn?.()||n<=0)return;
            if(!p.hasSkill('lhym_xieNian'))p.addSkill('lhym_xieNian');
            await p.addZhiShiWu('lhym_xieNian',n);
            lib.lhymXieJianXian.syncThoughtMark(p);
        },
        async remove(p,n=1){
            const count=Math.min(n,lib.lhymXieJianXian.thought(p));
            if(count>0){
                await p.removeZhiShiWu('lhym_xieNian',count);
                lib.lhymXieJianXian.syncThoughtMark(p);
            }
            return count;
        },
        async move(from,to,n=1){
            const count=await lib.lhymXieJianXian.remove(from,n);
            if(count>0)await lib.lhymXieJianXian.add(to,count);
            return count;
        },
        async effect(source,name,target){
            if(!source?.isIn?.()||!target?.isIn?.())return;
            const card=game.createCard(name);
            await source.useCard(card,target,false);
            card.destroyed='discardPile';
        },
        async miTian(player,free=false){
            if(!player?.isIn?.())return false;
            if(!free){
                if(!player.canBiShaBaoShi())return false;
                await player.removeBiShaBaoShi();
            }
            lib.lhymVoice.say(player,'xieJianXian/miTian',_status.event);
            const records=[];
            for(const target of game.players.filter(t=>t!==player&&t.isIn()).sortBySeat(player)){
                const count=lib.lhymXieJianXian.thought(target);
                if(count>0){records.push([target,count]);await lib.lhymXieJianXian.move(target,player,count);}
            }
            for(const [target,count] of records){
                if(!target.isIn())continue;
                await target.faShuDamage(Math.min(3,count),player,'nocard');
            }
            return true;
        },
    };
    Object.assign(skill,{
        lhym_xieNian:{
            mark:true,
            marktext:'邪',
            markimage:'extension/轮回遗梦/mark_xieNian.webp',
            intro:{
                name:'专属【邪念】',
                max:99,
                markcount:function(storage,player){
                    return player&&player.countZhiShiWu ? player.countZhiShiWu('lhym_xieNian') : 0;
                },
                content:function(storage,player){
                    var count=player&&player.countZhiShiWu ? player.countZhiShiWu('lhym_xieNian') : 0;
                    return '当前持有'+count+'枚【邪念】<br>'+
                        '＞5：每回合首次主动攻击无法应战<br>'+
                        '＞10：攻击伤害+1<br>'+
                        '＞15：法术伤害+1<br>'+
                        '＞20：攻击无法应战<br>'+
                        '＞25：回合开始时+1【宝石】<br>'+
                        '＞30：所有伤害额外+1';
                },
            },
            group:['lhym_xieNian_attack','lhym_xieNian_damage','lhym_xieNian_phase'],
            ai:{effect:{player:function(card,player,target){
                if(!card||typeof card!=='object'||get.type(card)!=='gongJi'||!target||target.side===player.side||
                    _status.currentPhase!==player||_status.event?.yingZhan||_status.event?.getParent?.('_yingZhan',true))return;
                const A=lib.lhymXieJianXian.ai,n=A.thoughts(player);
                const damage=A.damage(player,target,2,A.snapshot(),A.bonus(n,false));
                const base=A.damage(player,target,2,A.snapshot());
                const follow=player.hasSkill('lhym_xieJianZhan')?Math.max(0,...A.people().map(t=>A.slash(player,t,card))):0;
                return [1,Math.max(0,(damage-base)+follow*.65)*A.hit(player,target,card,n)];
            }}},
            subSkill:{
                attack:{
                    trigger:{player:'gongJiSheZhi'},forced:true,popup:false,priority:30,
                    filter:(e,p)=>!e.yingZhan||lib.lhymXieJianXian.thought(p)>20,
                    content:function(event,trigger,player){
                        const active=!trigger.yingZhan;
                        if(lib.lhymXieJianXian.thought(player)>20||(active&&lib.lhymXieJianXian.thought(player)>5&&!player.storage.lhym_xieNianFirstAttackUsed))trigger.wuFaYingZhan();
                        if(active){player.storage.lhym_xieNianFirstAttackUsed=true;player.syncStorage('lhym_xieNianFirstAttackUsed');}
                    },
                },
                damage:{
                    trigger:{global:'chengShouShangHaiBefore'},forced:true,popup:false,priority:20,
                    filter:(e,p)=>e.source===p&&e.num>0&&lib.lhymXieJianXian.thought(p)>10,
                    content:function(event,trigger,player){
                        const count=lib.lhymXieJianXian.thought(player);
                        let bonus=count>30?1:0;
                        if(trigger.faShu===true){if(count>15)bonus++;}
                        else bonus++;
                        if(bonus>0)trigger.changeDamageNum(bonus);
                    },
                },
                phase:{
                    trigger:{player:'phaseBegin'},forced:true,popup:false,priority:30,
                    content:async function(event,trigger,player){
                        delete player.storage.lhym_xieNianFirstAttackUsed;player.syncStorage('lhym_xieNianFirstAttackUsed');
                        if(lib.lhymXieJianXian.thought(player)>25)await player.addNengLiang('baoShi',1);
                    },
                },
            },
        },
        lhym_wuXieJuXing:{
            trigger:{global:['gameStart','changeShiQiEnd']},forced:true,
            filter:(e,p)=>{
                if(_status.event?.triggername==='gameStart'||e.name==='gameStart')return !p.storage.lhym_wuXieStarted;
                return e.num<0&&e.cause==='damage'&&e.player?.isIn?.()&&e.source?.isIn?.();
            },
            content:async function(event,trigger,player){
                if(event.triggername==='gameStart'||trigger.name==='gameStart'){
                    player.storage.lhym_wuXieStarted=true;player.syncStorage('lhym_wuXieStarted');
                    lib.lhymVoice.say(player,'xieJianXian/wuXie',event);await lib.lhymXieJianXian.add(player,5);return;
                }
                lib.lhymVoice.say(player,'xieJianXian/wuXie_gain',event);await lib.lhymXieJianXian.add(trigger.source,1);await lib.lhymXieJianXian.add(trigger.player,1);
            },
        },
        lhym_liuJieZhiWai:{
            trigger:{player:'addJiChuXiaoGuoBefore'},forced:true,priority:20,
            ai:{effect:{target:function(card,player,target){
                const A=lib.lhymXieJianXian.ai;
                if(!A.isBasic(card))return;
                const n=A.thoughts(target);
                return [0,A.delta(target,n,Math.min(99,n+1),player),1,player.countEmptyNengLiang()>0?1.2:0];
            }}},
            filter:(e,p)=>lib.lhymXieJianXian.isBasicTag(e.jiChuXiaoGuo||e.gaintag?.[0]),
            content:async function(event,trigger,player){
                lib.lhymVoice.say(player,'xieJianXian/liuJie',event);const source=trigger.source;trigger.cancel();await lib.lhymXieJianXian.add(player,1);
                if(source?.isIn?.())await source.addNengLiang('baoShi',1);
            },
        },
        lhym_xieLingChuQiao:{
            trigger:{global:'changeShiQiEnd'},forced:true,lastDo:true,
            filter:(e,p)=>!p.storage.lhym_xieLingChanged&&e.num<0&&e.side===p.side&&get.shiQi(p.side)<=7,
            content:async function(event,trigger,player){
                lib.lhymVoice.say(player,'xieJianXian/chuQiao',event);
                player.storage.lhym_xieLingChanged=true;player.syncStorage('lhym_xieLingChanged');
                await player.reinitCharacter('xieJianXian','xieLing');
                if(!player.hasSkill('lhym_xieNian'))player.addSkill('lhym_xieNian');
                lib.lhymBattleMusic.playTrack('ext:轮回遗梦/audio/bgm/linWeiBianDiao.mp3');
                await lib.lhymXieJianXian.miTian(player,true);
            },
        },
        lhym_xieQiLiHun:{
            trigger:{player:'chengShouShangHaiBefore'},forced:true,
            filter:(e,p)=>e.num>=2&&e.source?.isIn?.()&&lib.lhymXieJianXian.thought(p)>0,
            content:async function(event,trigger,player){
                if(await lib.lhymXieJianXian.move(player,trigger.source,1)){lib.lhymVoice.say(player,'xieJianXian/liHun',event);trigger.changeDamageNum(-1);}
            },
        },
        lhym_xieJianZhan:{
            trigger:{source:'gongJiMingZhong'},direct:true,
            filter:(e,p)=>!e.yingZhan&&game.hasPlayer(t=>t.isIn()&&lib.lhymXieJianXian.thought(t)>0),
            content:async function(event,trigger,player){
                const targets=await player.chooseTarget('邪剑斩：选择一名角色，收回其1【邪念】并对其造成法术伤害',
                    (card,p,target)=>target.isIn()&&lib.lhymXieJianXian.thought(target)>0)
                    .set('ai',target=>lib.lhymXieJianXian.ai.slash(_status.event.player,target))
                    .forResultTargets()||[];
                const target=targets[0];
                if(!target||!await lib.lhymXieJianXian.move(target,player,1))return;
                player.logSkill('lhym_xieJianZhan',target);lib.lhymVoice.say(player,'xieJianXian/xieJian',event);
                const enhanced=lib.lhymXieJianXian.thought(target)>0;
                await target.faShuDamage(enhanced?2:1,player,'nocard');
                if(enhanced&&player.isIn())player.addGongJi();
            },
        },
        lhym_sheXinShu:{
            type:'qiDong',trigger:{player:'qiDong'},
            filter:(e,p)=>p.canBiShaShuiJing()&&p.countCards('h',c=>get.type(c)==='faShu')>0,
            check:(e,p)=>lib.lhymXieJianXian.ai.sheXin(p)>0,
            content:async function(event,trigger,player){
                const cards=player.getCards('h',c=>get.type(c)==='faShu');
                if(!cards.length)return;
                lib.lhymVoice.say(player,'xieJianXian/sheXin',event);await player.removeBiShaShuiJing();await player.discard(cards);
                const names=Array.from(new Set(cards.map(c=>get.name(c,player))));
                for(let i=0;i<names.length;i++)for(const target of game.players.filter(t=>t.isIn()).sortBySeat(player))await lib.lhymXieJianXian.effect(player,'zhongDu',target);
                if(cards.length>2)for(const target of game.players.filter(t=>t.isIn()).sortBySeat(player))await lib.lhymXieJianXian.effect(player,'xuRuo',target);
            },ai:{shuiJing:true,order:5,result:{player:p=>lib.lhymXieJianXian.ai.sheXin(p)}},
        },
        lhym_xieLingMiTian:{
            type:'faShu',enable:'faShu',filter:function(e,p){
                if(!p.canBiShaBaoShi())return false;
                const A=lib.lhymXieJianXian.ai;
                // Both AI packs add 100000 to ai1/ai2. Non-positive order/result
                // is not a veto there; remove the candidate before scoring it.
                return A.manual(p)||A.miTian(p)>0;
            },
            content:async function(event,trigger,player){await lib.lhymXieJianXian.miTian(player,false);},
            ai:{baoShi:true,order:(item,p)=>lib.lhymXieJianXian.ai.miTian(p)>0?6:0,
                result:{player:p=>lib.lhymXieJianXian.ai.miTian(p)}},
        },
        lhym_wuXingWuZhi:{
            forced:true,group:['lhym_wuXingWuZhi_cancel','lhym_wuXingWuZhi_end'],
            ai:{effect:{target:function(card){if(lib.lhymXieJianXian.ai.isBasic(card))return 'zerotarget';}}},
            subSkill:{
                cancel:{trigger:{player:'addJiChuXiaoGuoBefore'},forced:true,priority:20,filter:(e,p)=>lib.lhymXieJianXian.isBasicTag(e.jiChuXiaoGuo||e.gaintag?.[0]),content:function(event,trigger,player){lib.lhymVoice.say(player,'xieJianXian/wuXing',event);trigger.cancel();}},
                end:{trigger:{player:'phaseEnd'},forced:true,lastDo:true,filter:(e,p)=>lib.lhymXieJianXian.thought(p)>0,content:async function(event,trigger,player){await lib.lhymXieJianXian.remove(player,1);}},
            },
        },
        lhym_xieLingQinTi:{
            trigger:{global:['changeShiQiBefore','lhymShiQiTransferBefore']},forced:true,priority:30,
            filter:(e,p)=>e.side===p.side&&e.num<0&&get.shiQi(p.side)+e.num<=0,
            content:async function(event,trigger,player){
                // 队友爆牌优先保底1士气，不消耗侵体的邪念与恢复次数。
                if(trigger.baoPai===true&&trigger.player&&trigger.player!==player&&trigger.player.side===player.side){
                    trigger.num=Math.min(0,1-get.shiQi(player.side));
                    return;
                }
                trigger.num=0;
                if(trigger.zhuanYi&&trigger.result){trigger.result.num=0;trigger.result.cancel=true;}
                // 免费祢天可触发反伤；外层尚未回血时只保命，不递归再开祢天。
                if(player._lhymQinTiResolving)return;
                player._lhymQinTiResolving=true;
                try{
                    lib.lhymVoice.say(player,'xieJianXian/qinTi',event);
                    await lib.lhymXieJianXian.miTian(player,true);
                    await lib.lhymXieJianXian.remove(player,5);
                    await player.addShiQi(5);
                    if(lib.lhymXieJianXian.thought(player)===0)player.removeSkill('lhym_xieLingQinTi');
                }finally{
                    delete player._lhymQinTiResolving;
                }
            },
        },
        lhym_suYuan:{},
        lhym_shenShuZhaoDan:{trigger:{source:'gongJiMingZhong'},direct:true,
            filter:(e,p)=>!e.yingZhan&&H.state(p).weapon==='镇妖剑'&&game.hasPlayer(t=>t.hasSkill('lhym_huaYing')),
            content:async function(event,trigger,player){
                if(!await player.chooseBool('宿缘相应·神树照胆：花楹移至你面前并+1治疗？').set('ai',()=>true).forResultBool())return;
                const snow=game.players.find(t=>t.hasSkill('lhym_huaYing'));if(!snow)return;
                player.logSkill('lhym_suYuan');V.say(player,'jingTian/flower',event);C.move(snow,player);await player.changeZhiLiao(1,player);
            }},
        lhym_qianNianGongMing:{trigger:{player:'lhym_moJianJiAfter'},direct:true,
            filter:(e,p)=>H.state(p).weapon==='魔剑'&&game.hasPlayer(t=>t.hasSkill('lhym_shuangSheng')&&C.canTwin(t)),
            content:async function(event,trigger,player){
                for(const kui of game.players.filter(t=>t.hasSkill('lhym_shuangSheng')&&C.canTwin(t))){
                    if(await kui.chooseBool('宿缘相应·千年共鸣：无水晶费用发动双生？').set('ai',()=>true).forResultBool()){
                        player.logSkill('lhym_suYuan',kui);V.say(player,'jingTian/resonance',event);kui.logSkill('lhym_shuangSheng');await C.twin(kui,true);
                    }
                }
            }},
        lhym_huaYing:{
            trigger:{global:'gameStart'},forced:true,
            derivation:['lhym_flowerGuest','lhym_huaLu','lhym_huaYingEnd'],
            content:async function(event,trigger,player){ V.say(player,'xueJian/huaYing',event);lib.lhymCompanion.move(player,player);},
            group:['lhym_huaLu','lhym_huaYingEnd'],
        },
        lhym_flowerGuest:{
            charlotte:true,
            derivation:['lhym_huaLu','lhym_huaYingEnd'],
            mark:true,
            marktext:'楹',
            markimage:'extension/轮回遗梦/mark_huaYing.webp',
            intro:{
                name:'花楹',
                markcount:function(storage,owner){
                    var snow=null;
                    if(owner&&owner.storage&&owner.storage.lhym_flowerGuest){
                        snow=game.players.find(function(current){
                            return current.playerid===owner.storage.lhym_flowerGuest;
                        });
                    }
                    return snow&&snow.getExpansions?snow.getExpansions('lhym_huaLu').length:0;
                },
                mark:function(dialog,storage,owner){
                    var snow=null;
                    if(owner&&owner.storage&&owner.storage.lhym_flowerGuest){
                        snow=game.players.find(function(current){
                            return current.playerid===owner.storage.lhym_flowerGuest;
                        });
                    }
                    var cards=snow&&snow.getExpansions?snow.getExpansions('lhym_huaLu'):[];
                    var count=cards.length;
                    var flower='<span style="color:#f08fbd;font-weight:bold">【花露】</span>';

                    dialog.addText(get.translation('lhym_flowerGuest_info'));
                    dialog.addText('当前携带'+count+'/2张'+flower+'。');

                    if(count){
                        var canView=!!(snow&&lib.lhymCompanion&&lib.lhymCompanion.localViewer&&
                            lib.lhymCompanion.localViewer(snow));
                        if(canView){
                            dialog.addText(flower);
                            dialog.addAuto(cards);
                        }else{
                            // The canonical dew description below defines visibility.
                        }
                    }

                    dialog.addText(get.translation('lhym_huaLu_info'));
                    dialog.addText(get.translation('lhym_huaYingEnd_info'));
                    return false;
                }
            }
        },
        lhym_huaLu:{
            charlotte:true,
            popup:false,
            nopop:true,
            onremove:p=>{
                const cards=C.dew(p);
                if(cards.length)p.loseToDiscardpile(cards);
            }
        },
        lhym_huaYingEnd:{trigger:{player:'phaseEnd'},forced:true,
            filter:(e,p)=>C.dew(p).length>0||C.holder(p)===p,
            content:async function(event,trigger,player){
                if(C.dew(player).length){const cards=await C.pick(player,C.dew(player),'花楹：丢弃1张花露，己方士气-1',1,true);if(cards.length){await player.loseToDiscardpile(cards);C.refreshFlower(player);await player.changeShiQi(-1);}}
                if(player.isIn()&&C.holder(player)===player)await player.changeZhiLiao(1,player);
            }},
        lhym_huZhu:{trigger:{global:'discardBefore'},direct:true,
            filter:(e,p)=>e.baoPai===true&&e.cards?.length>0&&e.player===C.holder(p)&&C.dew(p).length<2&&!e.lhym_flowerSaved,
            content:async function(event,trigger,player){
                if(!(await player.chooseBool('花楹护主：收取1张爆牌弃牌，避免其士气损失？').set('ai',()=>true).forResultBool()))return;
                if(trigger.lhym_flowerSaved)return;
                const cards=await C.pick(trigger.player,trigger.cards,'花楹护主：选择1张已选弃牌交给雪见暗置',1,true);
                if(!cards.length)return;trigger.lhym_flowerSaved=true;player.logSkill('lhym_huZhu',trigger.player);V.say(player,'xueJian/huZhu',event);
                trigger.cards.remove(cards[0]);await player.addGaiPai(cards,'lhym_huaLu');C.refreshFlower(player);
            }},
        lhym_wuDuGuiYuan:{type:'faShu',enable:'faShu',filter:(e,p)=>C.dew(p).length>0,filterTarget:(c,p,t)=>t.side===p.side,
            content:async function(event,trigger,player){
                const t=event.target;V.say(player,t.hasZhiShiWu('wuDuZhu')?'xueJian/wuDu_pearl':'xueJian/wuDu',event);C.move(player,t);const pool=C.dew(player);
                if(pool.length){const bad=t.getExpansions('_zhongDu').concat(t.getExpansions('_xuRuo'));
                    const opts=[];if(bad.length)opts.push('净化');if(t.countCards('h')>=2)opts.push('弃牌收入');
                    if(opts.length){const choice=opts.length===1?opts[0]:await t.chooseControl(opts).set('ai',()=>0).forResultControl();
                        const cards=await C.pick(player,pool,'五毒归元：选择花露',1,true);
                        if(choice==='净化'){await player.loseToDiscardpile(cards);C.refreshFlower(player);const remove=await C.pick(t,bad,'移除1张中毒或虚弱',1,true);if(remove.length)await t.discard(remove,t.getExpansions('_zhongDu').includes(remove[0])?'_zhongDu':'_xuRuo');if(!t.getExpansions('_zhongDu').length)t.storage.zhongDu=[];}
                        else{await t.chooseToDiscard('h',2,true);await t.gain(cards,player,'giveAuto');C.refreshFlower(player);}
                    }
                }
                if(t.hasZhiShiWu('wuDuZhu'))await t.changeZhiLiao(2,player);
            },ai:{order:5,result:{target:(p,t)=>C.dew(p).length?(t.getExpansions('_zhongDu').length+t.getExpansions('_xuRuo').length+1):t.hasZhiShiWu('wuDuZhu')?H.healScore(t,2):0}}},
        lhym_lvBo:{trigger:{player:'gongJiSheZhi'},direct:true,filter:(e,p)=>!!e.card&&C.dew(p).length>0,
            content:async function(event,trigger,player){const cs=await C.pick(player,C.dew(player),'绿波红露斩：展示并移除1张花露');if(!cs.length)return;
                player.logSkill('lhym_lvBo');V.say(player,'xueJian/lvBo',event);const same=get.xiBie(cs[0])===get.xiBie(trigger.card);await C.spend(player,cs,'lhym_huaLu');
                if(same)trigger.changeDamageNum(1);else trigger.lhym_flowerMove=true;
            },group:'lhym_lvBoHit'},
        lhym_lvBoHit:{trigger:{source:'gongJiMingZhong'},forced:true,filter:e=>e.lhym_flowerMove===true,
            content:async function(event,trigger,player){await C.healMove(player,1);}},
        lhym_tianLing:{type:'faShu',enable:'faShu',filter:(e,p)=>p.canBiShaShuiJing(),filterTarget:(c,p,t)=>p.side!==t.side,
            content:async function(event,trigger,player){ V.say(player,'xueJian/tianLing',event);await player.removeBiShaShuiJing();let n=1,count=0;const cards=C.dew(player).slice();
                if(cards.length&&await player.chooseBool('天灵千裂破：移除全部花露追加效果？').set('ai',()=>true).forResultBool()){
                    count=cards.length;n+=count===2&&get.xiBie(cards[0])===get.xiBie(cards[1])?2:1;await C.spend(player,cards,'lhym_huaLu');
                }await event.target.faShuDamage(n,player,'nocard');if(player.isIn())await C.healMove(player,1);
            },ai:{order:5.5,shuiJing:true,result:{target:(p,t)=>{const cards=C.dew(p);return -H.damageScore(p,t,cards.length===2&&get.xiBie(cards[0])===get.xiBie(cards[1])?3:cards.length?2:1);}}}},
        lhym_shenShu:{type:'faShu',enable:'faShu',filter:(e,p)=>!p.storage.lhym_shenShu&&game.hasPlayer(t=>H.state(t).weapon==='镇妖剑'&&H.state(t).stage<3),
            filterTarget:(c,p,t)=>t!==p&&H.state(t).weapon==='镇妖剑'&&H.state(t).stage<3,
            content:async function(event,trigger,player){ V.say(player,'xueJian/shenShu',event);const t=event.target,s=H.state(t);if(s.stage>=3||player.storage.lhym_shenShu)return;
                const opts=H.branches[s.stage];const branch=await t.chooseControl(opts).set('ai',()=>0).forResultControl();if(!opts.includes(branch))return;
                player.storage.lhym_shenShu=true;player.syncStorage('lhym_shenShu');s.stage++;s.branches.push(branch);H.sync(t);V.forge(t,event);
            },mod:{maxHandcard:(p,n)=>n-(p.storage.lhym_shenShu?2:0)},ai:{order:6,result:{target:2,player:-.5}}},
        lhym_jianZhongRen:{charlotte:true,nopop:true,popup:false,
            trigger:{global:'gameStart'},forced:true,content:async function(event,trigger,player){ V.say(player,'longKui/start_blue',event);C.form(player,false);},group:['lhym_canYingPai','lhym_longKuiBondWatch']},
        lhym_longKuiBondWatch:{charlotte:true,trigger:{global:['dieAfter','phaseBefore']},forced:true,popup:false,lastDo:true,
            filter:(e,p)=>p.isIn(),content:async function(event,trigger,player){C.refreshBond(player);}},
        lhym_canYingPai:{marktext:'影',markimage:'extension/轮回遗梦/mark_canYing.webp',intro:{name:'剑中残影',content:'gaiPai',markcount:'gaiPai'},
            onremove:p=>{const cards=C.shadows(p);if(cards.length)p.loseToDiscardpile(cards);}},
        lhym_cangFeng:{trigger:{player:'gongJiEnd'},direct:true,
            filter:(e,p)=>!C.red(p)&&!e.target&&!e.lhym_shadow&&!e.lhym_borrowed&&!e.getParent?.('useCard',true)?.lhym_shadow&&C.shadows(p).length<4&&e.cards?.some(c=>get.type(c)==='gongJi'&&['o','d'].includes(get.position(c,true))),
            content:async function(event,trigger,player){const cs=await C.pick(player,trigger.cards.filter(c=>get.type(c)==='gongJi'&&['o','d'].includes(get.position(c,true))),'藏锋：收取未命中的攻击牌');if(cs.length){player.logSkill('lhym_cangFeng');V.say(player,'longKui/cangFeng',event);await player.addGaiPai(cs,'lhym_canYingPai');}}},
        lhym_moJianHuTi:{trigger:{global:'shouDaoGongJiBefore'},direct:true,
            filter:(e,p)=>!C.red(p)&&e.target!==p&&e.target?.side===p.side&&e.canYingZhan!==false&&C.shadows(p).some(c=>(get.xiBie(c)===get.xiBie(e.card)||(get.name(c)==='anMie'&&e.canAnMie!==false))&&lib.filter.cardEnabled(c,p,'forceEnable'))&&game.hasPlayer(t=>t.side!==p.side&&t!==e.player),
            content:async function(event,trigger,player){const pool=C.shadows(player).filter(c=>(get.xiBie(c)===get.xiBie(trigger.card)||(get.name(c)==='anMie'&&trigger.canAnMie!==false))&&lib.filter.cardEnabled(c,player,'forceEnable'));
                const cards=await C.pick(player,pool,'魔剑护体：选择残影代队友应战');if(cards.length){player.logSkill('lhym_moJianHuTi',trigger.target);V.say(player,'longKui/moJianHuTi',event);await C.counter(player,trigger,cards[0]);}
            }},
        lhym_shuangSheng:{type:'qiDong',trigger:{player:'qiDong'},filter:(e,p)=>p.canBiShaShuiJing()&&C.canTwin(p),
            check:(e,p)=>C.shadows(p).length>0||p.countCards('h')>1,
            content:async function(event,trigger,player){await lib.lhymCompanion.twin(player,false);},ai:{shuiJing:true}},
        lhym_daiJun:{type:'gongJi',enable:'gongJi',filter:(e,p)=>C.red(p)&&C.shadows(p).length>0,
            chooseButton:{dialog:(e,p)=>ui.create.dialog('代君出鞘',[lib.lhymCompanion.shadows(p),'card']),check:b=>6-get.value(b.link),
                backup:links=>({type:'gongJi',selectCard:-1,filterCard:()=>false,viewAs:{name:get.name(links[0]),xiBie:get.xiBie(links[0]),isCard:true},
                    lhymShadowCard:links[0],precontent:async function(event,trigger,player){const c=lib.skill.lhym_daiJun_backup.lhymShadowCard;event.result.cards=[c];event.result.card.cards=[c];event.result.card.lhym_shadow=true;}})},ai:{order:5,result:{target:-1}}},
        lhym_daiJunChoice:{trigger:{player:'gongJiSheZhi'},forced:true,filter:e=>!e.yingZhan&&e.card?.lhym_shadow===true,
            content:async function(event,trigger,player){ V.say(player,'longKui/daiJun',event);trigger.lhym_shadow=true;const choices=['原系增伤',...H.elements,'an'];const x=await player.chooseControl(choices).set('ai',()=>0).forResultControl();
                trigger.lhym_returnBlue=true;
                if(x==='原系增伤')trigger.changeDamageNum(1);else{trigger.card={...trigger.card,xiBie:x};if(x==='an')trigger.canYingZhan=false;}
            }},
        lhym_buYuan:{trigger:{source:'gongJiMingZhong'},direct:true,filter:(e,p)=>C.red(p)&&!e.yingZhan&&e.lhym_shadow&&C.shadows(p).length<4&&p.countCards('h',c=>get.type(c)==='gongJi')>0,
            content:async function(event,trigger,player){const cs=await player.chooseCard('h',1,'不愿归去：暗置1张攻击牌为残影',c=>get.type(c)==='gongJi').set('ai',c=>7-get.value(c)).forResultCards()||[];
                if(cs.length){player.logSkill('lhym_buYuan');V.say(player,'longKui/buYuan',event);await player.addGaiPai(cs,'lhym_canYingPai');trigger.lhym_returnBlue=false;}
            }},
        lhym_guiLan:{trigger:{player:'gongJiEnd'},forced:true,popup:false,filter:e=>e.lhym_returnBlue===true,content:async function(event,trigger,player){C.form(player,false);}},
        lhym_huanGui:{type:'faShu',enable:'faShu',filter:(e,p)=>C.red(p)&&p.canBiShaBaoShi()&&C.shadows(p).length>0,
            content:async function(event,trigger,player){ V.say(player,'longKui/huanGui',event);const cs=await C.pick(player,C.shadows(player),'幻鬼三叠杀：移除1至2残影',[1,Math.min(2,H.enemies(player).length)],true);if(!cs.length)return;
                const ts=await player.chooseTarget('选择等量不同对手',cs.length,true,(c,p,t)=>t.side!==p.side).set('ai',t=>get.damageEffect2(t,_status.event.player,2)).forResultTargets()||[];if(ts.length!==cs.length)return;
                await player.removeBiShaBaoShi();await C.spend(player,cs,'lhym_canYingPai');
                for(const t of ts.sortBySeat(player))if(t.isIn())await t.faShuDamage(2,player,'nocard');
                if(cs.length===2&&get.xiBie(cs[0])===get.xiBie(cs[1])&&H.enemies(player).some(t=>!ts.includes(t))){const extra=await player.chooseTarget('同系追加：另一名对手',true,(c,p,t)=>t.side!==p.side&&!_status.event.lhymExcluded.includes(t.playerid)).set('lhymExcluded',ts.map(t=>t.playerid)).set('ai',t=>get.damageEffect2(t,_status.event.player,2)).forResultTargets()||[];if(extra[0])await extra[0].faShuDamage(2,player,'nocard');}
            },ai:{order:6,baoShi:true,result:{player:2}}},
        lhym_youLan:{trigger:{player:'phaseBegin'},direct:true,filter:(e,p)=>!C.red(p)&&p.countCards('h',c=>H.elements.includes(get.xiBie(c)))>0&&C.magicJings().some(t=>H.souls(t).length),
            content:async function(event,trigger,player){const pool=C.magicJings().filter(t=>H.souls(t).length);if(!pool.length)return;
                const jt=pool[0];
                const own=await player.chooseCard('h',1,'幽蓝理魂：交换一张非光暗手牌',c=>lib.lunHuiYiMeng.elements.includes(get.xiBie(c))).set('ai',c=>5-get.value(c)).forResultCards()||[];if(!own.length)return;
                const soul=await C.pick(jt,H.souls(jt),'幽蓝理魂：选择与龙葵交换的剑魂',1,true);if(!soul.length)return;
                player.logSkill('lhym_youLan',jt);V.say(player,'longKui/youLan',event);await player.showCards(own);await jt.showCards(soul);await player.gain(soul,jt,'giveAuto');await jt.addGaiPai(own,'lhym_soul');
            }},
        lhym_qianNian:{charlotte:true},
        lhym_hongYing:{type:'faShu',enable:'faShu',usable:1,filter:(e,p)=>C.red(p)&&C.magicJings().some(t=>H.souls(t).some(c=>get.type(c)==='gongJi')),
            content:async function(event,trigger,player){ V.say(player,'longKui/hongYing',event);const pool=C.magicJings().filter(t=>H.souls(t).some(c=>get.type(c)==='gongJi'));if(!pool.length)return;
                const jt=pool[0];
                const agreed=await jt.chooseBool('红影借锋：是否为龙葵展示并借出1张攻击牌剑魂？')
                    .set('lhymBorrowerSide',player.side).set('ai',()=>_status.event.player.side===_status.event.lhymBorrowerSide).forResultBool();
                if(!agreed){player.addGongJiOrFaShu();return;}
                const cs=await C.pick(jt,H.souls(jt).filter(c=>get.type(c)==='gongJi'),'红影借锋：选择借给龙葵的攻击牌',1,true);if(!cs.length)return;
                const ts=await player.chooseTarget('红影借锋：选择攻击目标',true,(c,p,t)=>t.side!==p.side&&p.canUseXingBei(_status.event.lhymCard,t)).set('lhymCard',cs[0]).set('ai',t=>-t.countCards('h')).forResultTargets()||[];if(!ts.length)return;
                await jt.showCards(cs);
                const virtual={name:get.name(cs[0]),xiBie:get.xiBie(cs[0]),isCard:true,cards:cs,lhym_shadow:true};
                const next=player.useCard(virtual,cs,ts);next.lhym_borrowed=true;next.lhym_shadow=true;await next;
            },ai:{order:4.5,result:{player:1}}},
    });
    skill.lhym_daiJun.group=['lhym_daiJunChoice','lhym_guiLan'];
    Object.assign(descriptions,{
        lhym_xieNian:['专属【邪念】',"<!--diy-skill-description-->上限99，可置于任意角色面前。按持有数量获得以下累计效果：<br>＞5：每回合首次主动攻击无法应战；<br>＞10：攻击伤害+1；<br>＞15：法术伤害+1；<br>＞20：所有攻击无法应战；<br>＞25：回合开始时+1<span style=\"color:#E02B17;font-weight:bold\">【宝石】</span>；<br>＞30：所有伤害额外+1。"],
        lhym_wuXieJuXing:['被动【五邪聚形】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（游戏开始时）</span>你+5<span style=\"color:#C58AF0\">【邪念】</span>。<br><span style=\"color:#E6B85C\">（1名角色因伤害导致士气下降后）</span>伤害来源与该角色各+1<span style=\"color:#C58AF0\">【邪念】</span>。"],
        lhym_liuJieZhiWai:['被动【六界之外】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（你即将获得【基础效果】时）</span>取消该效果，你+1<span style=\"color:#C58AF0\">【邪念】</span>，施加者+1<span style=\"color:#E02B17\">【宝石】</span>。"],
        lhym_xieLingChuQiao:['被动【邪灵出壳】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（己方士气下降至7或以下后）</span>转化为【邪灵】，保留场上所有<span style=\"color:#C58AF0\">【邪念】</span>，无条件发动1次【邪灵祢天】。"],
        lhym_xieQiLiHun:['被动【邪气离魂】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（你即将受到有来源的至少2点伤害时）</span>将你面前1<span style=\"color:#c58af0;font-weight:bold\">【邪念】</span>移至伤害来源面前，本次伤害-1⑤。"],
        lhym_xieJianZhan:['响应【邪剑斩】',"<!--diy-skill-description--><span class='tiaoJian'>（你的主动攻击命中后②）</span>指定1名有<span style=\"color:#C58AF0\">【邪念】</span>的角色，将其1<span style=\"color:#C58AF0\">【邪念】</span>移至你面前；<span class='tiaoJian'>（若转移后其仍有<span style=\"color:#C58AF0\">【邪念】</span>）</span>对其造成2点法术伤害③，你+1【攻击行动】；否则对其造成1点法术伤害③。"],
        lhym_sheXinShu:['启动【摄心术】',"<!--diy-skill-description--><span class='lan'>【水晶】</span><span class='tiaoJian'>（</span><span style=\"color:#E6B85C\">手中有法术牌）</span>弃置所有法术手牌。每有一种不同牌名，对所有角色各施加1层【中毒】；若弃置超过2张牌，再对所有角色施加【虚弱】。"],
        lhym_xieLingMiTian:['法术【邪灵祢天】',"<!--diy-skill-description--><span style=\"color:#E02B17\">【宝石】</span>将其他角色的<span style=\"color:#C58AF0\">【邪念】</span>全部移至你面前，对这些角色各造成X点法术伤害③，X为其原有<span style=\"color:#C58AF0\">【邪念】</span>数量，最多为3。"],
        lhym_wuXingWuZhi:['被动【无形无质】','你不能获得【基础效果】。<br>（你的回合结束时）你-1【邪念】。'],
        lhym_xieLingQinTi:['被动【邪灵侵体】',"<!--diy-skill-description-->己方其他角色爆牌时，己方士气最低为1。<br><span style=\"color:#E6B85C\">（己方士气即将降至0或以下时）</span>取消此次士气下降，无条件发动1次【邪灵祢天】；然后你-5<span style=\"color:#C58AF0\">【邪念】</span>，己方士气+5。<span style=\"color:#E6B85C\">（若结算后你没有</span><span style=\"color:#C58AF0\">【邪念】</span><span style=\"color:#E6B85C\">）</span>失去本技能。"],
        lhym_daiJunChoice:['被动【代君出鞘】',"<!--diy-skill-description-->残影与借来【剑魂】发动主动攻击时，选择原系增伤或改系；无论选择哪项，攻击结束后均转为蓝葵。"],
        lhym_flowerGuest:["专属【花楹】","<!--diy-skill-description-->唯一专属，通常在我方角色间移动；【镇妖剑·神树照胆】可将其跨阵营移至景天面前。"],
        lhym_lvBoHit:['绿波红露斩·移花',"<!--diy-skill-description-->异系【花露】强化的攻击命中后，移动【花楹】并治疗。"],
        lhym_suYuan:['响应【宿缘相应】','（你发动【典当】时）你可以将其中1枚星石给予【雪见】或【龙葵】。<br>（【雪见】或【龙葵】【提炼】后）你可以获得其本次提炼所得且仍持有的1枚星石。'],
        lhym_shenShuZhaoDan:["响应【镇妖剑·神树照胆】",'（任意阵营雪见在场）（你的主动攻击命中时②）你可以将【花楹】移至你的角色面前，然后你+1【治疗】。'],
        lhym_qianNianGongMing:["响应【魔剑·千年共鸣】","<!--diy-skill-description--><span style=\"color:#E6B85C\">（龙葵在场）（你的【魔剑技】结算结束后）</span>【龙葵】可以无消耗发动1次【双生】。"],
        lhym_huaYing:['被动【花楹】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（游戏开始时）</span>将<span style=\"color:#e5b94f;font-weight:bold\">【花楹】</span>置于你面前。<br><span style=\"color:#e6b85c\">（你的回合结束时）</span>若<span style=\"color:#e5b94f;font-weight:bold\">【花楹】</span>在你面前，你+1【治疗】。"],
        lhym_huaLu:["专属【花露】","<!--diy-skill-description-->暗置实体牌，上限2；随<span style=\"color:#e5b94f;font-weight:bold\">【花楹】</span>移动，仅雪见可以查看。"],
        lhym_huZhu:['响应【花楹护主】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（</span><span style=\"color:#E5B94F\">【花楹】</span><span style=\"color:#E6B85C\">持有者爆牌时）</span>将其1张应弃置手牌暗置为<span style=\"color:#F08FBD\">【花露】</span>，该牌不令己方士气下降。"],
        lhym_huaYingEnd:['花楹·散露',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（雪见的回合结束时）</span>若<span style=\"color:#F08FBD\">【花露】</span>不为0，由雪见选择弃置1张<span style=\"color:#F08FBD\">【花露】</span>，然后己方士气-1。"],
        lhym_wuDuGuiYuan:['法术【五毒归元】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（</span><span style=\"color:#F08FBD\">【花露】</span><span style=\"color:#E6B85C\">不为0时）</span>将<span style=\"color:#E5B94F\">【花楹】</span>移至1名我方角色面前，该角色选择一项：<br>·移除1张<span style=\"color:#F08FBD\">【花露】</span>，并移除自身1个【中毒】或【虚弱】<br>·弃置2张牌，将1张<span style=\"color:#F08FBD\">【花露】</span>加入手牌<br><span style=\"color:#E6B85C\">（若其拥有</span><span style=\"color:#62C96B\">【五毒珠】</span><span style=\"color:#E6B85C\">）</span>其+2【治疗】。"],
        lhym_lvBo:['响应【绿波红露斩】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（你攻击时①）</span>展示并移除1张<span style=\"color:#F08FBD\">【花露】</span>：<br><span style=\"color:#E6B85C\">（若其与本次攻击系别相同）</span>本次攻击伤害+1；<br><span style=\"color:#E6B85C\">（若不同，本次攻击命中后②）</span>将<span style=\"color:#E5B94F\">【花楹】</span>移至1名我方角色面前，该角色+1【治疗】。"],
        lhym_tianLing:['法术【天灵千裂破】',"<!--diy-skill-description--><span class='lan'>【水晶】</span>对1名对手造成1点法术伤害③，将<span style=\"color:#E5B94F\">【花楹】</span>移至1名我方角色面前，该角色+1【治疗】；<span class='tiaoJian'>（若你额外展示并移除全部<span style=\"color:#F08FBD\">【花露】</span>）</span>本次法术伤害+1；<span class='tiaoJian'>（移除2张且同系时）</span>本次法术伤害+2。"],
        lhym_shenShu:['法术【神树献灵】','（每局限1次）（景天选择镇妖剑且尚未完成第三阶段）免除全部材料费用，使其完成下一锻造阶段并选择分支；你的手牌上限永久-2。'],
        lhym_cangFeng:['被动【藏锋】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（仅蓝葵形态下）</span><span style=\"color:#e6b85c\">（攻击未命中）</span>你可以将本次使用的攻击牌置为<span style=\"color:#7652cc;font-weight:bold\">【剑中残影】</span>。"],
        lhym_moJianHuTi:['响应【魔剑护体】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（仅蓝葵形态下）</span><span style=\"color:#e6b85c\">（其他队友成为攻击目标时①）</span>展示并打出1张符合正常应战条件的<span style=\"color:#7652cc;font-weight:bold\">【剑中残影】</span>，代其应战，然后你转为红葵。此次攻击无法发动【藏锋】。"],
        lhym_daiJun:['被动【代君出鞘】',"<!--diy-skill-description--><span style=\"color:#E6B85C\">（仅红葵形态下）</span>你可以使用残影执行主动攻击。（<span style=\"color:#E6B85C\">以残影主动攻击时①）</span>选择一项：<br>·保留原系别，本次攻击伤害+1<br>·将本次攻击视为任意系，伤害不变<br>此次攻击结束后转为蓝葵。"],
        lhym_buYuan:['响应【不愿归去】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（仅红葵形态下）</span><span style=\"color:#e6b85c\">（你以<span style=\"color:#7652cc;font-weight:bold\">【剑中残影】</span>发动的主动攻击命中后②）</span>将1张手中攻击牌置为<span style=\"color:#7652cc;font-weight:bold\">【剑中残影】</span>，并取消【代君出鞘】的转为蓝葵效果。"],
        lhym_shuangSheng:['启动【双生】',"<!--diy-skill-description--><span class='lan'>【水晶】</span>转为另一形态，然后选择一项：<br>·将手牌1张攻击牌收入<span style=\"color:#7652CC\">【剑中残影】</span><br>·将1张残影加入手牌"],
        lhym_huanGui:['法术【幻鬼三叠杀】',"<!--diy-skill-description--><span style=\"color:#E02B17\">【宝石】</span><span style=\"color:#E6B85C\">（仅红葵形态下）</span>展示并移除1至2张<span style=\"color:#7652CC\">【剑中残影】</span>，指定等量的不同对手，对其各造成2点法术伤害③。<br><span style=\"color:#E6B85C\">（若移除的2张牌系别相同）</span>再对另一名未被指定的对手造成2点法术伤害③。"],
        lhym_qianNian:['响应【千年相随】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（景天对你发动【慧眼识珍】时）</span>展示并交付1张<span style=\"color:#7652cc;font-weight:bold\">【剑中残影】</span>代替手牌，并免费激活其对应属性面。"],
        lhym_youLan:['响应【幽蓝理魂】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（仅蓝葵形态下）</span><span style=\"color:#e6b85c\">（你的回合开始时）</span>展示1张非光暗手牌，与景天交换1张<span style=\"color:#9b72e8;font-weight:bold\">【剑魂】</span>。"],
        lhym_hongYing:['法术【红影借锋】【回合限定】',"<!--diy-skill-description--><span style=\"color:#e6b85c\">（仅红葵形态下）</span>景天可以展示1张攻击牌<span style=\"color:#9b72e8;font-weight:bold\">【剑魂】</span>，由你使用该牌发动本次攻击；若景天拒绝，你+1【攻击行动】或【法术行动】。本次攻击视为以<span style=\"color:#7652cc;font-weight:bold\">【剑中残影】</span>发动。"],
        lhym_canYingPai:['专属【剑中残影】','暗置实体牌，上限为4。'],
    });
    const conditionColor = '#e6b85c';
    const colorConditions = text => String(text).replace(/（[^）]+）/g, function(condition) {
        return '<span style="color:'+conditionColor+'">'+condition+'</span>';
    });
    const exclusiveResourceColors={
        '【龙精石】':'#43cfe8',
        '【剑魂】':'#9b72e8',
        '【花楹】':'#e5b94f',
        '【花露】':'#f08fbd',
        '【五毒珠】':'#62c96b',
        '【剑中残影】':'#7652cc',
        '【邪念】':'#c58af0',
    };
    const colorResourceKeywords = text => String(text).replace(/【[^】]+】/g, function(keyword) {
        if(keyword==='【水晶】')return '<span class="lan">'+keyword+'</span>';
        if(keyword==='【宝石】')return '<span style="color:#E02B17;font-weight:bold">'+keyword+'</span>';
        if(exclusiveResourceColors[keyword])return '<span style="color:'+exclusiveResourceColors[keyword]+';font-weight:bold">'+keyword+'</span>';
        return keyword;
    });
    const translate={};
    for(const [id,[name,info]] of Object.entries(descriptions)) {
        translate[id]=name;
        translate[id+'_info']=(info.startsWith('<!--diy-skill-description-->') ? info.slice(28) : colorResourceKeywords(colorConditions(info)));
    }
    translate.lhym_jianZhongRen='剑中人';
    translate.lhym_weiLiBlessing='威力赐福';
    translate.lhym_weiLiBlessing_info='下一次攻击命中时，本次攻击伤害+2，然后移除此效果。';
    translate.lhym_moJianMark='专属【魔剑】';
    translate.lhym_zhenYaoJianMark='专属【镇妖剑】';
    for(const element of H.elements) for(const status of ['empty','yin','yang','both']) {
        translate['lhym_wuLing_'+element+'_'+status]=H.labels[element]+'灵阴阳灯';
    }
    for(const s of Object.values(skill)) if(s.audio===undefined) s.audio=false;
    const markFiles=[
        'mark_moJian.webp','mark_longJingShi.webp','mark_jianHun.webp','mark_zhenYaoJian.webp',
        'mark_route_moJian.webp','mark_route_zhenYaoJian.webp','mark_huaYing.webp','mark_canYing.webp','mark_xieNian.webp',
    ];
    for(const element of ['shui','huo','lei','feng','tu']) for(const status of ['empty','yin','yang','both']) {
        markFiles.push('mark_wuLing_'+element+'_'+status+'.webp');
    }
    // 转移跳过本体的普通士气触发；仅补发侵体专用事件，不改变其他技能规则。
    function installQinTiTransferHook(){
        const content=lib.element?.content;
        if(!content||content.changeShiQi?._lhymQinTiTransferHook)return;
        const original=content.changeShiQi;
        if(typeof original!=='function')return;
        const source=original.toString();
        const anchor=/if\s*\(!event\.zhuanYi\)\s*event\.trigger\(['"]changeShiQiBefore['"]\);/;
        if(!anchor.test(source))throw new Error('侵体转移保护：士气结算接口已变化');
        const patched=source.replace(anchor,"$& else event.trigger('lhymShiQiTransferBefore');");
        // 原内容为本体 step 函数，保留分步标记，由引擎照常编译。
        content.changeShiQi=new Function('return ('+patched+')')();
        content.changeShiQi._lhymQinTiTransferHook=true;
    }
    return {
        name:'轮回遗梦',connect:true,config:{},
        arenaReady:function() { for(const id of ['lhym_refineBegin','lhym_energyBefore','lhym_energyAfter','lhym_refineEnd','lhym_actionVoice','lhym_bgm']) game.addGlobalSkill(id); },
        content:function(){},
        precontent:function(){
            installDiyFormPreview([["xieJianXian","xieLing"]], {
                jingTian: [
                    {name:'魔剑', image:'jingTian_moJian.webp', content:function() {
                        return '<b>专属【魔剑】</b><br><br>' +
                            get.translation('lhym_longJing') + '：' + get.translation('lhym_longJing_info') + '<br><br>' +
                            get.translation('lhym_soul') + '：' + get.translation('lhym_soul_info') + '<br><br>' +
                            H.routeText({storage:{lhym_sword:{weapon:'魔剑',faces:[],stage:0,branches:[]}}}) +
                            '<br><br><b>魔剑技配方与效果</b><br>' + skill.lhym_moRoute.intro.content();
                    }},
                    {name:'镇妖剑', image:'jingTian_zhenYaoJian.webp', content:function() {
                        return '<b>专属【镇妖剑】</b><br><br>' +
                            get.translation('lhym_longJing') + '：' + get.translation('lhym_longJing_info') + '<br><br>' +
                            ['lhym_zhaoDan','lhym_chongZhu','lhym_shenShuZhaoDan'].map(id=>H.skillText(id)).join('<br><br>') +
                            '<br><br><b>三阶段修复与二选一强化</b><br>' + skill.lhym_zhenRoute.intro.content();
                    }},
                ],
            });
            installQinTiTransferHook();
            lib.config.all.background_music.add(menuTrack);
            lib.configMenu.audio.config.background_music.item[menuTrack]='御剑江湖';
            if(lib.config.extension_宿命挽歌_enable){
                lib.config.all.background_music.add(sharedMenuKey);
                lib.configMenu.audio.config.background_music.item[sharedMenuKey]='云谷鹤峰／御剑江湖（随机）';
            }else if(lib.config.background_music===sharedMenuKey){
                game.saveConfig('background_music',menuTrack);
            }
            if(!lib.lhymMenuMusicWrapped){
                lib.lhymMenuMusicWrapped=true;
                const originalPlay=game.playBackgroundMusic;
                game.playBackgroundMusic=function(){
                    if(lib.config.background_music!==sharedMenuKey||_status.tempMusic||_status._aozhan)
                        return originalPlay.apply(this,arguments);
                    const selected=sharedMenuTracks[Math.floor(Math.random()*sharedMenuTracks.length)];
                    _status.tempMusic=selected;
                    try{return originalPlay.apply(this,arguments);}
                    finally{delete _status.tempMusic;}
                };
            }
            if(!lib.config.extension_轮回遗梦_menuMusicInstalled){
                if(['music_default',menuTrack,
                    'ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3'].includes(lib.config.background_music)){
                    game.saveConfig('background_music',
                        lib.config.extension_宿命挽歌_enable?sharedMenuKey:menuTrack);
                }
                game.saveConfig('extension_轮回遗梦_menuMusicInstalled',true);
                if(ui.backgroundMusic)game.playBackgroundMusic();
            }else if(lib.config.extension_宿命挽歌_enable&&
                !lib.config.extension_轮回遗梦_sharedMenuMusicInstalled&&
                [menuTrack,'ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3'].includes(lib.config.background_music)){
                game.saveConfig('background_music',sharedMenuKey);
                if(ui.backgroundMusic)game.playBackgroundMusic();
            }
            if(lib.config.extension_宿命挽歌_enable)
                game.saveConfig('extension_轮回遗梦_sharedMenuMusicInstalled',true);
            if(!lib.lhymBgmRestoreRegistered){
                lib.lhymBgmRestoreRegistered=true;
                lib.onover.push(function(){
                    if(!_status.lhymBgmStarted)return;
                    if(ui.backgroundMusic)ui.backgroundMusic.loop=false;
                    if(_status.lhymHadTempMusic)_status.tempMusic=_status.lhymOriginalTempMusic;
                    else delete _status.tempMusic;
                    delete _status.lhymBgmStarted;
                    delete _status.lhymHadTempMusic;
                    delete _status.lhymOriginalTempMusic;
                    game.playBackgroundMusic();
                });
            }
            // 新安装默认启用独立角色包；后续尊重角色包菜单中的手动开关。
            const characterPackName = 'lunHuiYiMeng';
            lib.config.all.characters.add(characterPackName);
            if (!lib.config.extension_轮回遗梦_characterPackDefaultInitialized) {
                if (!lib.config.characters.includes(characterPackName)) {
                    lib.config.characters.add(characterPackName);
                    game.saveConfig('characters', lib.config.characters);
                }
                game.saveConfig('extension_轮回遗梦_characterPackDefaultInitialized', true);
            }
            // 真正的联机角色包注册。外层扩展 connect:true 只代表扩展允许联机，
            // 角色本身还需要作为 connect:true 的 character pack 注册，才能稳定进入联机选将。
            if(!lib.characterPack?.lunHuiYiMeng && !(lib.imported?.character?.lunHuiYiMeng)) {
                game.import('character', function(lib, game, ui, get, ai, _status) {
                    return {
                        name:'lunHuiYiMeng',
                        connect:true,
                        character:{
                            xieJianXian:[null,'jiGroup',4.5,['lhym_wuXieJuXing','lhym_liuJieZhiWai','lhym_xieLingChuQiao','lhym_xieQiLiHun','lhym_xieJianZhan','lhym_sheXinShu','lhym_xieLingMiTian','lhym_xieNian'],['des:蜀山五长老排出的邪念聚合体，士气低落时脱壳化为邪灵。','ext:轮回遗梦/xieJianXian.webp']],
                            xieLing:[null,'jiGroup',4.5,[
                                'lhym_wuXingWuZhi',
                                'lhym_xieLingQinTi',
                                'lhym_xieQiLiHun',
                                'lhym_xieJianZhan',
                                'lhym_sheXinShu',
                                'lhym_xieLingMiTian',
                                'lhym_xieNian'
                            ],['unseen','forbidai','des:邪剑仙的脱壳形态，只能由【邪灵出壳】转化。','ext:轮回遗梦/xieLing.webp']],
                            xueJian:[null,'jiGroup',4.5,['lhym_huaYing','lhym_huZhu','lhym_wuDuGuiYuan','lhym_lvBo','lhym_tianLing','lhym_shenShu'],['des:出身唐门却向往江湖的任性千金，与五毒兽花楹彼此守护。她收集花露化解爆牌，以毒珠、绿波和天灵千裂破反制强敌，并能助景天重铸镇妖剑。','ext:轮回遗梦/xueJian.webp']],
                            longKui:[null,'huanGroup',4.5,['lhym_jianZhongRen','lhym_cangFeng','lhym_moJianHuTi','lhym_daiJun','lhym_buYuan','lhym_shuangSheng','lhym_huanGui','lhym_qianNian','lhym_youLan','lhym_hongYing','lhym_canYingPai'],['des:守候魔剑千年的姜国公主，以蓝葵的温柔与红葵的决绝守护王兄。她收纳攻击为剑中残影，在双形态间切换，并与魔剑路线的景天共鸣。','ext:轮回遗梦/longKui_blue.webp']],
                            jingTian:[
                                null,
                                'huanGroup',
                                5,
                                ['lhym_shuangJian','lhym_yongAn','lhym_dianDang','lhym_feiLong','lhym_zhuJian','lhym_huiYan','lhym_yinDan','lhym_suYuan'],
                                ['des:永安当里梦想成为大侠的少年，因双剑宿缘卷入六界纷争。开局选择魔剑或镇妖剑，收集龙精石、剑魂与五灵材料，走向不同的永久成长路线。','ext:轮回遗梦/jingTian_moJian.webp']
                            ],
                        },
                        translate:{
                            lunHuiYiMeng:'轮回遗梦',
                            jingTian:'景天',
                            jingTian_ab:'景天',
                            xieJianXian:'邪剑仙',xieLing:'邪灵',
                            xueJian:'雪见',longKui:'龙葵',
                        },
                        characterTitle:{
                            jingTian:'永安少侠',
                            xieJianXian:'六界邪念',xieLing:'五邪离魂',
                            xueJian:'唐门千金',longKui:'千年剑灵',
                        },
                        characterIntro:{
                            jingTian:'永安当里梦想成为大侠的少年，因双剑宿缘卷入六界纷争。开局选择魔剑或镇妖剑，收集龙精石、剑魂与五灵材料，走向不同的永久成长路线。',
                            xieJianXian:'蜀山五长老修炼禁术后排出的邪念聚合体，不在六界之中。',
                            xieLing:'邪剑仙脱去人形后的邪灵，只能通过【邪灵出壳】进入。',
                            xueJian:'出身唐门却向往江湖的任性千金，与五毒兽花楹彼此守护。她收集花露化解爆牌，以毒珠、绿波和天灵千裂破反制强敌，并能助景天重铸镇妖剑。',
                            longKui:'守候魔剑千年的姜国公主，以蓝葵的温柔与红葵的决绝守护王兄。她收纳攻击为剑中残影，在双形态间切换，并与魔剑路线的景天共鸣。',
                        },
                    };
                });
            }
            lib.translate.lunHuiYiMeng_character_config='轮回遗梦';
        },
        package:{
            // 景天已在 precontent 中以 connect:true 的独立 character pack 注册；
            // 这里保持为空，避免单机/联机出现双份武将定义。
            character:{character:{},translate:{},characterTitle:{},characterIntro:{}},
            card:{card:{},translate:{},list:[]},skill:{skill,translate},
            intro:'仙剑奇侠传三主题角色包：景天、雪见、龙葵、邪剑仙。',author:'蒙牛',version:'1.3',diskURL:'',forumURL:'',
        },
        files:{character:['jingTian_moJian.webp','jingTian_zhenYaoJian.webp','xueJian.webp','longKui_blue.webp','longKui_red.webp','xieJianXian.webp','xieLing.webp'],card:[],skill:markFiles,audio:V.files.concat(['audio/bgm/yuJianJiangHu.mp3','audio/bgm/yuManTang.mp3','audio/bgm/qingYuAn.mp3','audio/bgm/zhuShaBian.mp3','audio/bgm/huanHunCao.mp3','audio/bgm/linWei.mp3','audio/bgm/linWeiBianDiao.mp3'])},
    };
});
