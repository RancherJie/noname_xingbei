game.import("extension", function(lib, game, ui, get, ai, _status) {
    // 临时效果牌：创建时不带destroyed标记；必须在效果结算(挂到目标面前)完成后再打标记，
    // 否则addToExpansion会把带destroyed的牌从结算中剔除，导致效果不触发。
    lib.xiaGuHuanYinUseTemporaryEffectCard = async function(player, name, target, nolog) {
        const card = game.createCard(name);
        await player.useCard(card, target, nolog);
        card.destroyed = 'discardPile';
        return card;
    };
    var suoNaYuYinSkills = [
        'suoNaYingYongYuYin',
        'suoNaJianYiYuYin',
        'suoNaXunJieYuYin',
    ];
    var suoNaSongData = {
        yingYongZanMeiShi: {
            name: '英勇赞美诗',
            unique: ['weiLiCiFu'],
            echo: 'suoNaYingYongYuYin',
        },
        jianYiYongTanDiao: {
            name: '坚毅咏叹调',
            unique: ['zhiLiaoShu', 'zhiYuZhiGuang'],
            echo: 'suoNaJianYiYuYin',
        },
        xunJieZouMingQu: {
            name: '迅捷奏鸣曲',
            unique: ['xunJieCiFu'],
            echo: 'suoNaXunJieYuYin',
        },
    };
    function suoNaHasUnique(card, ids) {
        if(!card || typeof card.hasDuYou != 'function') return false;
        return ids.some(function(id) { return card.hasDuYou(id); });
    }
    function suoNaDiscardableCount(player) {
        return player.countCards('h', function(card) {
            return lib.filter.cardDiscardable(card, player);
        });
    }
        lib["峡谷幻音_callbacks"] = lib["峡谷幻音_callbacks"] || {};
        lib["峡谷幻音_callbacks"]["online_suoNaDiscardableCount_872"] = suoNaDiscardableCount;

    function suoNaWillEmpower(player, song) {
        return player.storage.suoNaLastSong != song &&
            player.countZhiShiWu('suoNaHeXian') >= 2;
    }
        lib["峡谷幻音_callbacks"] = lib["峡谷幻音_callbacks"] || {};
        lib["峡谷幻音_callbacks"]["online_suoNaWillEmpower_1051"] = suoNaWillEmpower;

    function suoNaMatchingUniqueCount(player, song) {
        var data = suoNaSongData[song];
        if(!data) return 0;
        return player.countCards('h', function(card) {
            return lib.filter.cardDiscardable(card, player) &&
                suoNaHasUnique(card, data.unique);
        });
    }
    function suoNaSongOrder(player, song, base) {
        var data = suoNaSongData[song];
        var matching = suoNaMatchingUniqueCount(player, song);
        var shareUseful = data && suoNaShareValue(player, data.echo);
        var value = base;
        if(matching > 0) {
            value += 2.6 + Math.min(2, matching - 1) * 0.4;
            if(shareUseful) value += 1.2;
        }
        else if(player.hasSkill('jiXingBianZou') &&
            player.canBiShaShuiJing() &&
            shareUseful) {
            value += 0.7;
        }
        if(suoNaWillEmpower(player, song)) return value + 2.2;
        if(player.storage.suoNaLastSong != song) {
            var chord = player.countZhiShiWu('suoNaHeXian');
            return value + 1.1 + chord * 0.3;
        }
        return value - 1.4;
    }
        lib["峡谷幻音_callbacks"] = lib["峡谷幻音_callbacks"] || {};
        lib["峡谷幻音_callbacks"]["online_suoNaSongOrder_1521"] = suoNaSongOrder;

    async function suoNaPrepareSong(event, player, song) {
        var parent = event.getParent();
        var different = player.storage.suoNaLastSong != song;
        player.storage.suoNaLastSong = song;
        player.syncStorage('suoNaLastSong');
        parent.suoNaSong = song;
        parent.suoNaEmpowered = false;
        if(different) {
            await player.addZhiShiWu('suoNaHeXian', 1);
            if(player.countZhiShiWu('suoNaHeXian') >= 3) {
                await player.removeZhiShiWu(
                    'suoNaHeXian',
                    player.countZhiShiWu('suoNaHeXian')
                );
                parent.suoNaEmpowered = true;
                game.broadcastAll(function(speaker) {
                    if(!lib.config.background_audio) return;
                    game.playAudio({
                        path: 'ext:峡谷幻音/audio/skill/suoNa/' +
                            'qinYinGongMing.mp3',
                        spatialPlayer: speaker,
                        addVideo: false,
                        onError: function() {},
                    });
                }, player);
            }
        }
    }
    function suoNaSetEcho(target, echo) {
        suoNaYuYinSkills.forEach(function(skill) {
            if(skill != echo && target.hasSkill(skill)) target.removeSkill(skill);
        });
        if(!target.hasSkill(echo)) target.addSkill(echo);
    }
    function suoNaShareScore(player, echo) {
        game.filterPlayer(function(current) {
            return current != player && current.side == player.side;
        }).forEach(function(current) {
            suoNaSetEcho(current, echo);
        });
    }
    function suoNaShareValue(player, echo) {
        var allies = game.filterPlayer(function(current) {
            return current != player && current.side == player.side;
        });
        if(echo == 'suoNaYingYongYuYin') {
            return allies.some(function(current) {
                return current.countCards('h', function(card) {
                    return get.type(card, current) == 'gongJi';
                }) > 0;
            });
        }
        if(echo == 'suoNaJianYiYuYin') {
            return allies.some(function(current) {
                return current.countCards('h') >= current.getHandcardLimit() - 1 ||
                    current.zhiLiao <= 1;
            });
        }
        return allies.some(function(current) {
            return current.countCards('h') >= 3;
        });
    }
        lib["峡谷幻音_callbacks"] = lib["峡谷幻音_callbacks"] || {};
        lib["峡谷幻音_callbacks"]["online_suoNaShareValue_4078"] = suoNaShareValue;

    async function suoNaChooseShare(player, song) {
        var data = suoNaSongData[song];
        var uniqueCards = player.getCards('h', function(card) {
            return lib.filter.cardDiscardable(card, player) &&
                suoNaHasUnique(card, data.unique);
        });
        var canImprovise = player.hasSkill('jiXingBianZou') &&
            player.canBiShaShuiJing();
        if(!uniqueCards.length && !canImprovise) return false;
        var controls = ['不追加'];
        if(uniqueCards.length) controls.push('弃置指定独有技牌');
        if(canImprovise) controls.push('发动【即兴变奏】');
        var result = await player.chooseControl(controls)
            .set('prompt', data.name + '：是否为队友附加对应余音？')
            .set('ai', function() {
                        var suoNaShareValue = lib["峡谷幻音_callbacks"]["online_suoNaShareValue_4078"];

                var player = _status.event.player;
                var controls = _status.event.controls;
                if(!suoNaShareValue(player, _status.event.echo)) return '不追加';
                if(controls.includes('弃置指定独有技牌')) return '弃置指定独有技牌';
                return controls.includes('发动【即兴变奏】') ?
                    '发动【即兴变奏】' : '不追加';
            }).set('echo', data.echo).forResult();
        if(!result || result.control == '不追加') return false;
        if(result.control == '弃置指定独有技牌') {
            var cards = await player.chooseToDiscard(
                'h', 1, true, data.name + '：弃置指定独有技牌',
                function(card) {
                    if(!lib.filter.cardDiscardable(card, _status.event.player) ||
                        !card || typeof card.hasDuYou != 'function') return false;
                    var uniqueIds = _status.event.uniqueIds || [];
                    for(var i = 0; i < uniqueIds.length; i++) {
                        if(card.hasDuYou(uniqueIds[i])) return true;
                    }
                    return false;
                }
            ).set('uniqueIds', data.unique).set('visible', true)
                .set('ai', function(card) { return 8 - get.value(card); })
                .forResultCards() || [];
            if(!cards.length) return false;
        } else {
            await player.removeBiShaShuiJing();
            player.logSkill('jiXingBianZou');
        }
        suoNaShareScore(player, data.echo);
        if(result.control == '发动【即兴变奏】' && suoNaDiscardableCount(player) >= 2) {
            await player.chooseToDiscard(
                'h', 2, true, '即兴变奏：弃置2张手牌',
                function(card) {
                    return lib.filter.cardDiscardable(card, _status.event.player);
                }
            ).set('ai', function(card) {
                return 8 - get.value(card);
            });
        }
        return true;
    }
    async function suoNaFinishSong(event, player, song) {
        var parent = event.getParent();
        suoNaSetEcho(player, suoNaSongData[song].echo);
        if(parent.suoNaEmpowered === true) player.addGongJi();
        delete parent.suoNaSong;
        delete parent.suoNaEmpowered;
    }
    // 巴德：实体专属记录来源，行动限制只作用于对应的行动。
    function bardOpen(target) {
        return !!target && target.isIn();
    }
    function bardCards(target, tag, owner) {
        return target.getExpansions(tag).filter(card =>
            !owner || card.storage.baDeOwner === owner.playerid);
    }
    async function bardRemove(target, card, tag) {
        await target.lose(card, ui.special).set('type', 'exclusiveCardRemove').set('getlx', false);
        if(!bardCards(target, tag).length) target.unmarkSkill(tag);
    }
    async function bardPlace(target, card, tag) {
        game.addGlobalSkill(tag);
        const next = target.addToExpansion(card, 'gain2');
        next.gaintag.add(tag);
        await next;
        return bardCards(target, tag).includes(card);
    }
    function bardInstall() {
        if(lib.skill.baDeManager.installed) return;
        lib.skill.baDeManager.installed = true;
        // 本体主动技能没有skillEnabled模组入口；只过滤凝滞者的行动选择。
        const original = lib.filter.filterEnable;
        lib.filter.filterEnable = function(event, player, skill, ...rest) {
            if(player.hasSkill('baDeNingZhi') && lib.skill.baDeManager.actionChoice(event, player) &&
                lib.skill[skill]?.type !== 'teShu') return false;
            return original.call(this, event, player, skill, ...rest);
        };
        ['youShenShengTanEffect', 'shenQiLvChengEffect'].forEach(skill => game.addGlobalSkill(skill));
    }
    const bardSkills = {
        baDeManager: {
            trigger: {global: 'gameStart', player: 'phaseBegin'}, forced: true, popup: false,
            firstDo: true, priority: 100,
            open: bardOpen, cards: bardCards, removeCard: bardRemove, placeCard: bardPlace, install: bardInstall,
            actionChoice: function(event, player) {
                for(let current = event, seen = new Set(); current && !seen.has(current);) {
                    seen.add(current);
                    if(current.yingZhan === true || current.name === 'chooseToRespond') return false;
                    if(current.player === player && current.action === true &&
                        ['gongJi', 'faShu', 'gongJiOrFaShu'].includes(current.name)) return true;
                    if(current.name === 'xingDong') return false;
                    current = current.getParent && current.getParent();
                }
                return false;
            },
            bindDamage: function(event, player) {
                const token = player.storage.baDeBindToken;
                if(!token) return null;
                for(let current = event, seen = new Set(); current && !seen.has(current);) {
                    seen.add(current);
                    if(current.baDeBindToken === token) return current;
                    current = current.getParent ? current.getParent() : current.parent;
                }
                return null;
            },
            canSpecial: function(player, phase) {
                const choice = {name: 'gongJiOrFaShu', player, action: true, type: 'phase',
                    firstAction: true, canTeShu: phase.canTeShu, getParent: () => phase};
                return game.expandSkills(player.getSkills('invisible').concat(lib.skill.global)).some(id =>
                    lib.skill[id]?.type === 'teShu' && lib.filter.filterEnable(choice, player, id));
            },
            content: async function(event, trigger, player) {
                lib.skill.baDeManager.install();
                if(event.triggername !== 'phaseBegin') return;
                for(const target of game.filterPlayer()) {
                    for(const card of lib.skill.baDeManager.cards(target, 'shenQiLvChengEffect', player))
                        await lib.skill.baDeManager.removeCard(target, card, 'shenQiLvChengEffect');
                    if(!target.hasSkill('baDeNingZhi')) continue;
                    const owners = (target.storage.baDeNingZhiOwners || []).filter(id => id !== player.playerid);
                    target.storage.baDeNingZhiOwners = owners;
                    target.syncStorage('baDeNingZhiOwners');
                    if(!owners.length) target.removeSkill('baDeNingZhi');
                }
            },
        },
        muLing: {
            intro: {name: '木灵', content: 'mark', max: 3},
            markimage: 'extension/峡谷幻音/mark_baDeMuLing.webp', onremove: 'storage',
        },
        youShenShengTanInfo: {markimage: 'extension/峡谷幻音/mark_baDeYouShenShengTan.webp'},
        shenQiLvChengInfo: {markimage: 'extension/峡谷幻音/mark_baDeShenQiLvCheng.webp'},
        baDeNingZhiInfo: {markimage: 'extension/峡谷幻音/mark_baDeNingZhi.webp'},
        lvZheDeZhaoHuan: {
            audio: 'ext:峡谷幻音/audio/skill/baDe/lvZheDeZhaoHuan.mp3',
            trigger: {global: 'gameStart', player: 'faShuEnd'}, forced: true,
            filter: (event, player, timing) => player.countZhiShiWu('muLing') < 3 &&
                (timing === 'gameStart' || get.is.xingDong(event)),
            content: async function(event, trigger, player) { await player.addZhiShiWu('muLing', 1); },
        },
        muLingZhuiJi: {
            audio: 'ext:峡谷幻音/audio/skill/baDe/muLingZhuiJi.mp3',
            trigger: {player: 'gongJiSheZhi'},
            filter: (event, player) => event.yingZhan !== true && player.countZhiShiWu('muLing') > 0,
            cost: async function(event, trigger, player) {
                const choices = Array.from({length: player.countZhiShiWu('muLing')}, (_, i) => String(i + 1));
                const control = await player.chooseControl(...choices, '取消')
                    .set('prompt', '木灵追击：选择移除的木灵数量')
                    .set('baDeAttack', trigger).set('baDeChoices', choices)
                    .set('ai', function() {
                        const attack = _status.event.baDeAttack;
                        return get.damageEffect2(attack.target, _status.event.player, 1) > 0 ?
                            _status.event.baDeChoices.at(-1) : '取消';
                    }).forResultControl();
                event.result = {bool: choices.includes(control), cost_data: Number(control)};
            },
            content: async function(event, trigger, player) {
                const count = event.cost_data;
                if(!Number.isInteger(count) || count < 1 || count > player.countZhiShiWu('muLing')) return;
                await player.removeZhiShiWu('muLing', count);
                trigger.changeDamageNum(count);
            },
        },
        xingJieShuFu: {
            audio: 'ext:峡谷幻音/audio/skill/baDe/xingJieShuFu.mp3',
            type: 'faShu', enable: 'faShu', position: 'h', selectCard: 1, discard: true, showCards: true,
            filter: (event, player) => player.countCards('h', card => get.type(card) === 'faShu') > 0 &&
                game.hasPlayer(target => target.side !== player.side && lib.skill.baDeManager.open(target)),
            filterCard: card => get.type(card) === 'faShu',
            filterTarget: (card, player, target) => lib.skill.baDeManager.open(target) && target.side !== player.side,
            content: async function(event, trigger, player) {
                const target = event.target;
                const token = player.playerid + ':' + (lib.skill.baDeManager.bindSequence =
                    (lib.skill.baDeManager.bindSequence || 0) + 1);
                const previous = player.storage.baDeBindToken;
                player.storage.baDeBindToken = token;
                const damage = target.faShuDamage(1, player, 'nocard').set('baDeBindToken', token);
                try { await damage; }
                finally {
                    if(previous) player.storage.baDeBindToken = previous;
                    else delete player.storage.baDeBindToken;
                }
                if(!damage.baDeBindMoraleLost) return;
                const neighbours = [target.getPrevious(), target.getNext()].filter(p => p !== target);
                if(!neighbours.some(p => lib.skill.baDeManager.open(p))) return;
                const picked = await player.chooseTarget(true, '星界束缚：选择首目标相邻的1名角色',
                    (card, source, p) => lib.skill.baDeManager.open(p) && _status.event.baDeNeighbours.includes(p))
                    .set('baDeNeighbours', neighbours).set('ai', function(p) {
                        return get.damageEffect2(p, _status.event.player, 2);
                    }).forResultTargets() || [];
                if(picked.length) await picked[0].faShuDamage(2, player, 'nocard');
            },
            group: 'xingJieShuFu_morale',
            subSkill: {morale: {
                trigger: {global: 'changeShiQiEnd'}, forced: true, popup: false, lastDo: true,
                filter: (event, player) => event.num < 0 &&
                    lib.skill.baDeManager.bindDamage(event, player)?.player.side === event.side,
                content: function(event, trigger, player) {
                    const damage = lib.skill.baDeManager.bindDamage(trigger, player);
                    if(damage) damage.baDeBindMoraleLost = true;
                },
            }},
            ai: {order: 4, result: {target: -2}},
        },
        youShenShengTan: {
            audio: 'ext:峡谷幻音/audio/skill/baDe/youShenShengTan.mp3',
            type: 'faShu', enable: 'faShu', position: 'h', selectCard: 1, discard: true,
            filter: (event, player) => player.countCards('h', card =>
                card.hasDuYou('zhiLiaoShu') || card.hasDuYou('zhiYuZhiGuang')) > 0 &&
                game.hasPlayer(target => target.side === player.side && lib.skill.baDeManager.open(target) &&
                    !lib.skill.baDeManager.cards(target, 'youShenShengTanEffect', player).length),
            filterCard: card => card.hasDuYou('zhiLiaoShu') || card.hasDuYou('zhiYuZhiGuang'),
            filterTarget: (card, player, target) => lib.skill.baDeManager.open(target) && target.side === player.side &&
                !lib.skill.baDeManager.cards(target, 'youShenShengTanEffect', player).length,
            content: async function(event, trigger, player) {
                const card = game.createCard2('youShenShengTanKa');
                card.storage.baDeOwner = player.playerid;
                card.storage.baDeCharged = false;
                await lib.skill.baDeManager.placeCard(event.target, card, 'youShenShengTanEffect');
            },
            group: 'youShenShengTan_charge',
            subSkill: {charge: {
                trigger: {player: 'phaseBegin'}, forced: true, priority: 10,
                content: function(event, trigger, player) {
                    for(const target of game.filterPlayer()) {
                        for(const card of lib.skill.baDeManager.cards(target, 'youShenShengTanEffect', player))
                            game.broadcastAll(function(card) { card.storage.baDeCharged = true; }, card);
                        target.updateMarks();
                    }
                },
            }},
            ai: {order: 3, result: {target: 1}},
        },
        youShenShengTanEffect: {
            charlotte: true, intro: {name: '游神圣坛', content: 'expansion', markcount: 'expansion'},
            trigger: {player: 'phaseBegin', target: 'gongJiMingZhong'}, forced: true, popup: false,
            filter: (event, player, timing) => lib.skill.baDeManager.cards(player, 'youShenShengTanEffect').length > 0 &&
                (timing === 'phaseBegin' || (event.source && event.source.side !== player.side)),
            content: async function(event, trigger, player) {
                const destroy = event.triggername === 'gongJiMingZhong';
                for(const card of lib.skill.baDeManager.cards(player, 'youShenShengTanEffect')) {
                    if(!destroy) {
                        const yes = await player.chooseBool('是否使用游神圣坛？' +
                            (card.storage.baDeCharged ? '（已充能）' : '（未充能）'))
                            .set('ai', function() { return _status.event.player.zhiLiao < _status.event.player.getZhiLiaoLimit(); })
                            .forResultBool();
                        if(!yes) continue;
                    }
                    const charged = card.storage.baDeCharged;
                    await lib.skill.baDeManager.removeCard(player, card, 'youShenShengTanEffect');
                    if(destroy) continue;
                    await player.changeZhiLiao(charged ? 2 : 1);
                    if(charged && player.countCards('h') > 0)
                        await player.chooseToDiscard('h', 1, true, '游神圣坛：弃置1张手牌');
                }
            },
        },
        shenQiLvCheng: {
            audio: 'ext:峡谷幻音/audio/skill/baDe/shenQiLvCheng.mp3',
            type: 'faShu', enable: 'faShu', selectTarget: 2, multitarget: true, multiline: true,
            filter: (event, player) => player.canBiShaShuiJing() &&
                game.hasPlayer(target => target.side === player.side && lib.skill.baDeManager.open(target) &&
                    !lib.skill.baDeManager.cards(target, 'shenQiLvChengEffect', player).length) &&
                game.hasPlayer(target => target.side !== player.side && lib.skill.baDeManager.open(target) &&
                    !lib.skill.baDeManager.cards(target, 'shenQiLvChengEffect', player).length),
            filterTarget: (card, player, target) => lib.skill.baDeManager.open(target) &&
                !lib.skill.baDeManager.cards(target, 'shenQiLvChengEffect', player).length &&
                (!ui.selected.targets.length || ui.selected.targets[0].side !== target.side),
            content: async function(event, trigger, player) {
                await player.removeBiShaShuiJing();
                for(const target of event.targets) {
                    const card = game.createCard2('shenQiLvChengKa');
                    card.storage.baDeOwner = player.playerid;
                    await lib.skill.baDeManager.placeCard(target, card, 'shenQiLvChengEffect');
                }
            },
            ai: {shuiJing: true, order: 3.2, result: {target: (player, target) => target.side === player.side ? 1 : -0.5}},
        },
        shenQiLvChengEffect: {
            charlotte: true, intro: {name: '神奇旅程', content: 'expansion', markcount: 'expansion'},
            trigger: {player: ['gongJiEnd', 'faShuEnd', 'teShuEnd']}, forced: true, popup: false, usable: 1,
            filter: (event, player) => event.yingZhan !== true && get.is.xingDong(event) &&
                lib.skill.baDeManager.cards(player, 'shenQiLvChengEffect').length > 0,
            content: function(event, trigger, player) {
                player.addExtraXingDong({xingDong: 'gongJi', baDePortalAction: true,
                    prompt: '神奇旅程：只能攻击神奇旅程的拥有者',
                    filterTarget: function(card, source, target) {
                        return target !== source && lib.skill.baDeManager.cards(target, 'shenQiLvChengEffect').length > 0 &&
                            lib.filter.filterTarget(card, source, target);
                    },
                });
            },
        },
        tiaoHeMingYun: {
            audio: 'ext:峡谷幻音/audio/skill/baDe/tiaoHeMingYun.mp3',
            type: 'faShu', enable: 'faShu',
            filter: (event, player) => player.canBiShaBaoShi(),
            filterTarget: (card, player, target) => lib.skill.baDeManager.open(target),
            content: async function(event, trigger, player) {
                await player.removeBiShaBaoShi();
                const targets = [...new Set([event.target, event.target.getPrevious(), event.target.getNext()])];
                for(const target of targets) {
                    if(!lib.skill.baDeManager.open(target)) continue;
                    const owners = target.storage.baDeNingZhiOwners || [];
                    if(!owners.includes(player.playerid)) owners.push(player.playerid);
                    target.storage.baDeNingZhiOwners = owners;
                    target.syncStorage('baDeNingZhiOwners');
                    target.addSkill('baDeNingZhi');
                }
            },
            ai: {baoShi: true, order: 4.5, result: {target: (player, target) => target.side === player.side ? 0.5 : -1}},
        },
        baDeNingZhi: {
            charlotte: true, mark: true, markimage: 'extension/峡谷幻音/mark_baDeNingZhi.webp', marktext: '滞',
            intro: {content: '受到的伤害恒为0；行动阶段只能执行特殊行动，否则跳过。巴德回合开始时移除。'},
            onremove: function(player) { delete player.storage.baDeNingZhiOwners; },
            mod: {cardEnabled: function(card, player) {
                if(lib.skill.baDeManager.actionChoice(_status.event, player) && get.type(card) !== 'teShu') return false;
            }},
            trigger: {player: ['damageBefore', 'shouDaoShangHai', 'chanShengShangHai', 'chengShouShangHai', 'xingDongBefore']},
            forced: true, popup: false, lastDo: true, priority: -10000,
            content: function(event, trigger, player) {
                if(event.triggername === 'xingDongBefore') {
                    trigger.canQiDong = false;
                    trigger.qiDongGuo = true;
                    if(!lib.skill.baDeManager.canSpecial(player, trigger)) {
                        event.trigger('xingDongSkipped');
                        trigger.cancel();
                    }
                    return;
                }
                trigger.num = 0;
                trigger.shouDaoShangHaiMax = trigger.chanShengShangHaiMax = trigger.chengShouShangHaiMax = 0;
            },
        },
    };
    return {
        "name": "峡谷幻音",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            var actionAudioSkill = 'xiaGuHuanYin_actionAudio';
            if(!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    trigger: { player: ['gouMai', 'heCheng', 'tiLian'] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function(event, player) {
                        return ['baDe', 'tiMo', 'suoNa', 'yaTuoKeSi'].some(function(id) {
                            return player.name == id || player.name1 == id ||
                                player.name2 == id;
                        });
                    },
                    content: function(event, trigger, player) {
                        var action = event.triggername || trigger.name;
                        if(!['gouMai', 'heCheng', 'tiLian'].includes(action)) {
                            return;
                        }
                        var character = ['baDe', 'tiMo', 'suoNa', 'yaTuoKeSi']
                            .find(function(id) {
                                return player.name == id || player.name1 == id ||
                                    player.name2 == id;
                            });
                        if(!character) return;
                        var audioPath = 'ext:峡谷幻音/audio/action/' +
                            character + '/' + action + '.mp3';
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
                    "baDe": [null, "yongGroup", 5, ["baDeManager", "lvZheDeZhaoHuan", "muLingZhuiJi", "xingJieShuFu", "youShenShengTan", "shenQiLvCheng", "tiaoHeMingYun", "muLing", "youShenShengTanInfo", "shenQiLvChengInfo", "baDeNingZhiInfo"], ["des:穿行诸界的星界游神，召集木灵强化攻击，布置圣坛与旅程，并以凝滞调和战场。"]],
                    "tiMo": [
                        null,
                        "huanGroup",
                        4,
                        [
                            "yinXingDeChiBang",
                            "zhiMangChuiJian",
                            "xiaoMoKuaiPao",
                            "duXingSheJi",
                            "moGuFangZhi",
                            "zhongMoGu",
                            "tiMoZhuanShu",
                            "tiMoMoGu",
                            "tiMoZhiMang",
                            "tiMoZhongMoGuKa",
                            "tiMoZhongMoGuPai",
                        ],
                        [
                            "des:班德尔城最机敏的迅捷斥候，以笑容掩藏致命伏击。他隐身侦察、吹箭致盲，并把蘑菇埋在对手最意想不到的落脚处。",
                            "ext:峡谷幻音/tiMo.jpg",
                        ],
                    ],
                    "suoNa": [
                        null,
                        "yongGroup",
                        4,
                        [
                            "qinYinGongMing",
                            "yingYongZanMeiShi",
                            "jianYiYongTanDiao",
                            "xunJieZouMingQu",
                            "liLiangHeXian",
                            "jiXingBianZou",
                            "kuangWuZhongLeZhang",
                            "suoNaHeXian",
                        ],
                        [
                            "des:以琴音连接众人心灵的琴瑟仙女，让旋律成为无声的号令。她轮换三种乐章积累和弦，将余音分享给队友，并以终曲左右战局。",
                            "ext:峡谷幻音/suoNa.jpg",
                        ],
                    ],
                    "yaTuoKeSi": [
                        null,
                        "xueGroup",
                        5,
                        [
                            "mieJueXingTai",
                            "ciSiJianQi",
                            "anYiLiRen",
                            "eHuoShuLian",
                            "anYingChongJue",
                            "daMie",
                            "xueRen",
                            "xueJi",
                        ],
                        [
                            "des:渴望终结一切的暗裔剑魔，以鲜血与战意维系灭绝形态。他挥动暗裔利刃积累血刃，用恶火束链困住猎物，再展开不死不休的追击。",
                            "ext:峡谷幻音/yaTuoKeSi.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "峡谷幻音": "峡谷幻音",
                    "tiMo": "提莫",
                    "baDe": "巴德",
                    "suoNa": "娑娜",
                    "yaTuoKeSi": "亚托克斯",
                },
            },
            "card": {
                "card": {
                    "youShenShengTanKa": {hidden: true, type: 'special', enable: false},
                    "shenQiLvChengKa": {hidden: true, type: 'special', enable: false},
                },
                "translate": {
                    "youShenShengTanKa": "游神圣坛",
                    "youShenShengTanKa_info": "<span class='tiaoJian'>（拥有者回合开始时）</span>可以移除此卡：+1【治疗】；已充能时改为+2【治疗】，弃置1张手牌。<br><span class='tiaoJian'>（对手攻击命中拥有者后②）</span>移除此卡，不结算上述效果。",
                    "shenQiLvChengKa": "神奇旅程",
                    "shenQiLvChengKa_info": "【回合限定】<span class='tiaoJian'>（拥有者行动结束后）</span>+1【攻击行动】，但只能以<span style=\"color:#8E44AD\">【神奇旅程】</span>的拥有者为目标。<br><span class='tiaoJian'>（巴德的回合开始时）</span>移除此卡。",
                },
                "list": [],
            },
            "skill": {
                "skill": {
                    ...bardSkills,
                    "qinYinGongMing": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/qinYinGongMing.mp3",
                        "locked": true,
                        "onremove": function(player) {
                            delete player.storage.suoNaLastSong;
                        },
                    },
                    "yingYongZanMeiShi": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/yingYongZanMeiShi.mp3",
                        "logAudio": function(event, player) {
                            if(player && suoNaWillEmpower(player, 'yingYongZanMeiShi')) return false;
                            return "ext:峡谷幻音/audio/skill/suoNa/yingYongZanMeiShi.mp3";
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": function() {
                            var player = _status.event.player;
                            return suoNaWillEmpower(player, 'yingYongZanMeiShi') ?
                                [1, 2] : 1;
                        },
                        "filterTarget": function(card, player, target) {
                            return target.side != player.side;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await suoNaPrepareSong(event, player, 'yingYongZanMeiShi');
                            await suoNaChooseShare(player, 'yingYongZanMeiShi');
                        },
                        "content": async function(event, trigger, player) {
                            if(event.target && event.target.isIn()) {
                                await event.target.faShuDamage(1, player, 'nocard');
                            }
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await suoNaFinishSong(event, player, 'yingYongZanMeiShi');
                        },
                        "ai": {
                            "order": function(item, player) {
                        var suoNaSongOrder = lib["峡谷幻音_callbacks"]["online_suoNaSongOrder_1521"];

                                return suoNaSongOrder(
                                    player, 'yingYongZanMeiShi', 4.8
                                );
                            },
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "jianYiYongTanDiao": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/jianYiYongTanDiao.mp3",
                        "logAudio": function(event, player) {
                            if(player && suoNaWillEmpower(player, 'jianYiYongTanDiao')) return false;
                            return "ext:峡谷幻音/audio/skill/suoNa/jianYiYongTanDiao.mp3";
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                            return target.side == player.side;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await suoNaPrepareSong(event, player, 'jianYiYongTanDiao');
                            await suoNaChooseShare(player, 'jianYiYongTanDiao');
                        },
                        "content": async function(event, trigger, player) {
                            var parent = event.getParent();
                            var amount = parent.suoNaEmpowered === true ? 2 : 1;
                            await event.target.changeZhiLiao(amount, player);
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await suoNaFinishSong(event, player, 'jianYiYongTanDiao');
                        },
                        "ai": {
                            "order": function(item, player) {
                        var suoNaSongOrder = lib["峡谷幻音_callbacks"]["online_suoNaSongOrder_1521"];

                                return suoNaSongOrder(
                                    player, 'jianYiYongTanDiao', 5
                                );
                            },
                            "result": {
                                "target": function(player, target) {
                                    var missing = Math.max(0, 2 - target.zhiLiao);
                                    if(!missing) return 0;
                                    var value = 0.8 + missing;
                                    if(player.storage.suoNaLastSong !=
                                        'jianYiYongTanDiao') value += 0.5;
                                    return target.side == player.side ? value : -1;
                                },
                            },
                        },
                    },
                    "xunJieZouMingQu": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/xunJieZouMingQu.mp3",
                        "logAudio": function(event, player) {
                            if(player && suoNaWillEmpower(player, 'xunJieZouMingQu')) return false;
                            return "ext:峡谷幻音/audio/skill/suoNa/xunJieZouMingQu.mp3";
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                        var suoNaWillEmpower = lib["峡谷幻音_callbacks"]["online_suoNaWillEmpower_1051"];
                        var suoNaDiscardableCount = lib["峡谷幻音_callbacks"]["online_suoNaDiscardableCount_872"];

                            var count = suoNaWillEmpower(player, 'xunJieZouMingQu') ?
                                2 : 1;
                            return target.side == player.side &&
                                suoNaDiscardableCount(target) >= count;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await suoNaPrepareSong(event, player, 'xunJieZouMingQu');
                            await suoNaChooseShare(player, 'xunJieZouMingQu');
                        },
                        "content": async function(event, trigger, player) {
                            var parent = event.getParent();
                            var empowered = parent.suoNaEmpowered === true;
                            var amount = empowered ? 2 : 1;
                            var discarded = await event.target.chooseToDiscard(
                                'h', amount, true,
                                '迅捷奏鸣曲：弃置' + amount + '张手牌',
                                function(card) {
                                    return lib.filter.cardDiscardable(
                                        card, _status.event.player
                                    );
                                }
                            ).set('ai', function(card) {
                                return 8 - get.value(card);
                            }).forResultCards() || [];
                            if(discarded.length < amount) return;
                            if(empowered && event.target.isIn()) {
                                await event.target.draw(1);
                            }
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await suoNaFinishSong(event, player, 'xunJieZouMingQu');
                        },
                        "ai": {
                            "order": function(item, player) {
                        var suoNaSongOrder = lib["峡谷幻音_callbacks"]["online_suoNaSongOrder_1521"];

                                return suoNaSongOrder(
                                    player, 'xunJieZouMingQu', 4.8
                                );
                            },
                            "result": {
                                "target": function(player, target) {
                        var suoNaWillEmpower = lib["峡谷幻音_callbacks"]["online_suoNaWillEmpower_1051"];

                                    if(target.side != player.side) return -1;
                                    var excess = target.countCards('h') -
                                        target.getHandcardLimit();
                                    var value = 0.6 +
                                        target.countCards('h') * 0.15 +
                                        Math.max(0, excess) * 1.8;
                                    if(player.storage.suoNaLastSong !=
                                        'xunJieZouMingQu') value += 0.6;
                                    if(suoNaWillEmpower(
                                        player, 'xunJieZouMingQu'
                                    )) value += 0.3;
                                    return value;
                                },
                            },
                        },
                    },
                    "liLiangHeXian": {
                        "locked": true,
                    },
                    "jiXingBianZou": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/jiXingBianZou.mp3",
                        "locked": true,
                        "ai": { "shuiJing": true },
                    },
                    "suoNaYingYongYuYin": {
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/峡谷幻音/mark_suoNaYingYongYuYin.webp",
                        "marktext": "勇",
                        "intro": { "content": "攻击命中时，本次攻击伤害额外+1，随后移除。" },
                        "trigger": { "source": "gongJiMingZhong" },
                        "forced": true,
                        "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                            player.removeSkill('suoNaYingYongYuYin');
                        },
                    },
                    "suoNaJianYiYuYin": {
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/峡谷幻音/mark_suoNaJianYiYuYin.webp",
                        "marktext": "毅",
                        "intro": { "content": "承受伤害时，该伤害-1，随后移除。" },
                        "trigger": { "player": "chengShouShangHaiBefore" },
                        "forced": true,
                        "filter": function(event, player) {
                            return event && event.num > 0;
                        },
                        "content": function(event, trigger, player) {
                            trigger.changeDamageNum(-1);
                            player.removeSkill('suoNaJianYiYuYin');
                        },
                    },
                    "suoNaXunJieYuYin": {
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/峡谷幻音/mark_suoNaXunJieYuYin.webp",
                        "marktext": "迅",
                        "intro": { "content": "执行【特殊行动】后，弃置1张牌，随后移除。" },
                        "trigger": { "player": "teShuEnd" },
                        "forced": true,
                        "content": async function(event, trigger, player) {
                            var amount = Math.min(1, suoNaDiscardableCount(player));
                            if(amount > 0) {
                                (await player.chooseToDiscard(
                                    'h', amount, true,
                                    '迅捷余音：弃置' + amount + '张手牌',
                                    function(card) {
                                        return lib.filter.cardDiscardable(
                                            card, _status.event.player
                                        );
                                    }
                                ).set('ai', function(card) {
                                    return 8 - get.value(card);
                                }).forResultCards() || []);
                            }
                            player.removeSkill('suoNaXunJieYuYin');
                        },
                    },
                    "suoNaHeXian": {
                        "charlotte": true,
                        "intro": { "content": "当前有#点【和弦】。", "max": 3 },
                        "markimage": "extension/峡谷幻音/mark_suoNaHeXian.webp",
                    },
                    "kuangWuZhongLeZhang": {
                        "audio": "ext:峡谷幻音/audio/skill/suoNa/kuangWuZhongYueZhang.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countNengLiang('baoShi') >= 2 &&
                                game.hasPlayer(function(current) {
                                    return current.side != player.side;
                                });
                        },
                        "selectTarget": [1, 2],
                        "filterTarget": function(card, player, target) {
                            return target.side != player.side;
                        },
                        "contentBefore": async function(event, trigger, player) {
                            await player.removeNengLiang('baoShi', 2);
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.target;
                            if(!target || !target.isIn()) return;
                            await target.faShuDamage(1, player, 'nocard');
                            if(target.isIn()) {
                                await lib.xiaGuHuanYinUseTemporaryEffectCard(player, 'xuRuo', target, false);
                            }
                        },
                        "ai": {
                            "baoShi": true,
                            "order": 7.5,
                            "result": {
                                "target": function(player, target) {
                                    var score = get.damageEffect2(target, player, 1);
                                    if(!target.hasJiChuXiaoGuo('_xuRuo')) score += 1.5;
                                    return score;
                                },
                            },
                        },
                    },
                    "yinXingDeChiBang": {
                        "group": [
                            "yinXingDeChiBang_teShu",
                            "yinXingDeChiBang_huiHeKaiShi",
                            "yinXingDeChiBang_xingDong",
                            "yinXingDeChiBang_gongJi",
                            "yinXingDeChiBang_shouShang",
                            "yinXingDeChiBang_qingChu",
                        ],
                        "subSkill": {
                            "teShu": {
                                "audio": "ext:峡谷幻音/audio/skill/tiMo/yinXingDeChiBang.mp3",
                                "trigger": {
                                    "player": "teShuEnd",
                                },
                                "forced": true,
                                "content": async function(event, trigger, player) {
                            if(player.storage.tiMoYinXingExtraGongJiPending == true) {
                                if(typeof player.storage.gongJi == 'number' &&
                                    player.storage.gongJi > 0) {
                                    player.storage.gongJi--;
                                }
                                delete player.storage.tiMoYinXingExtraGongJiPending;
                            }
                            if(!player.isHengZhi()) {
                                await player.hengZhi();
                            }
                            player.storage.tiMoYinXingPhase = player.phaseNumber || 0;
                            player.addSkill('tiMoYinXing');
                        },
                            },
                            "huiHeKaiShi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.isHengZhi();
                        },
                                "content": async function(event, trigger, player) {
                            await player.chongZhi();
                            // 行动数会在随后进入xingDong时初始化，因此这里只记录奖励。
                            player.storage.tiMoYinXingExtraGongJi = true;
                        },
                            },
                            "xingDong": {
                                "trigger": {
                                    "player": "xingDongBefore",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.storage.tiMoYinXingExtraGongJi == true;
                        },
                                "content": function(event, trigger, player) {
                            delete player.storage.tiMoYinXingExtraGongJi;
                            player.storage.tiMoYinXingExtraGongJiPending = true;
                            player.addGongJi();
                        },
                            },
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.storage.tiMoYinXingExtraGongJiPending == true &&
                                get.is.gongJiXingDong(event);
                        },
                                "content": function(event, trigger, player) {
                            delete player.storage.tiMoYinXingExtraGongJiPending;
                        },
                            },
                            "shouShang": {
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event && event.num > 0 && player.isHengZhi();
                        },
                                "content": async function(event, trigger, player) {
                            await player.chongZhi();
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return player.hasSkill('tiMoYinXing') &&
                                typeof player.storage.tiMoYinXingPhase == 'number' &&
                                player.phaseNumber > player.storage.tiMoYinXingPhase;
                        },
                                "content": function() {
                            player.removeSkill('tiMoYinXing');
                        },
                            },
                        },
                    },
                    "zhiMangChuiJian": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/zhiMangChuiJian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "selectCard": 1,
                        "position": "h",
                        "discard": false,
                        "lose": false,
                        "filter": function(event, player) {
                    if(!player.hasCard(function(card) {
                        return get.type(card) == 'faShu';
                    }, 'h')) return false;
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            !current.hasJiChuXiaoGuo('tiMoZhiMang');
                    });
                },
                        "filterCard": function(card, player) {
                    return get.type(card) == 'faShu';
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side &&
                        !target.hasJiChuXiaoGuo('tiMoZhiMang');
                },
                        "content": async function(event, trigger, player) {
                    if(!event.cards || !event.cards.length || !event.target) return;
                    await player.discard(event.cards).set('showCards', true);
                    await event.target.addJiChuXiaoGuo(
                        event.cards,
                        player,
                        'tiMoZhiMang'
                    );
                },
                        "check": function(card) {
                    return 6 - get.value(card);
                },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "target": function(player, target) {
                            return -2;
                        },
                            },
                        },
                    },
                    "xiaoMoKuaiPao": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/xiaoMoKuaiPao.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": -1,
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return player.countCards('h') > 2;
                },
                        "filterTarget": function(card, player, target) {
                    return target == player;
                },
                        "content": async function(event, trigger, player) {
                    await player.draw();
                    await player.chooseToDiscard(
                        'h',
                        2,
                        true,
                        '小莫快跑：面朝下弃置2张牌'
                    );
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.xiaoMoKuaiPao
                            .isSafeForAi(player) ? 3.6 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.xiaoMoKuaiPao
                                .isSafeForAi(player) ? 0.5 : -100;
                        },
                            },
                        },
                    },
                    "duXingSheJi": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/duXingSheJi.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event && event.target && event.target.isIn();
                },
                        "content": async function(event, trigger, player) {
                    await trigger.target.faShuDamage(1, player);
                },
                    },
                    "moGuFangZhi": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/moGuShengCheng.mp3",
                        "trigger": {
                            "player": "loseEnd",
                        },
                        "filter": function(event, player) {
                    if(!event || event.type != 'discard' || !Array.isArray(event.cards)) {
                        return false;
                    }
                    if(player.countNengLiang('baoShi') < 1) return false;
                    var discardEvent = event.getParent && event.getParent('discard', true);
                    if(discardEvent && (
                        discardEvent.showCards ||
                        discardEvent.showHiddenCards ||
                        discardEvent.visible
                    )) return false;
                    var hasCard = event.cards.some(function(card) {
                        return get.position(card, true) == 'd';
                    });
                    if(!hasCard) return false;
                    return player.countGaiPai('tiMoMoGu') < 3;
                },
                        "cost": async function(event, trigger, player) {
                    var cards = trigger.cards.filter(function(card) {
                        return get.position(card, true) == 'd';
                    });
                    var capacity = Math.max(
                        0,
                        3 - player.countGaiPai('tiMoMoGu')
                    );
                    var count = Math.min(cards.length, capacity);
                    var selected = [];
                    if(count <= 0) {
                        event.result = { bool: false };
                        return;
                    }
                    if(cards.length <= capacity) {
                        selected = cards.slice();
                    } else {
                        selected = (await player.chooseCardButton(
                            cards,
                            true,
                            count,
                            '蘑菇生成：选择' + count +
                                '张本次弃置的牌作为【蘑菇】'
                        ).set('ai', function(button) {
                            return 6 - get.value(button.link);
                        }).forResultLinks() || []);
                    }
                    event.result = {
                        bool: selected.length > 0,
                        targets: [player],
                        cards: selected,
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(!event.cards || !event.cards.length) return;
                    await player.addGaiPai(
                        event.cards,
                        player,
                        'tiMoMoGu'
                    );
                },
                    },
                    "zhongMoGu": {
                        "audio": "ext:峡谷幻音/audio/skill/tiMo/zhongMoGu.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "getHolder": function() {
                    var players = game.players.slice();
                    if(game.dead) players.addArray(game.dead);
                    return players.find(function(current) {
                        return current && current.hasZhiShiWu &&
                            current.hasZhiShiWu('tiMoZhongMoGuKa');
                    });
                },
                        "getLooseHolders": function() {
                    return game.players.filter(function(current) {
                        return current.countGaiPai('tiMoMoGu') > 0;
                    });
                },
                        "filter": function(event, player) {
                    if(!player.canBiShaShuiJing()) return false;
                    if(!lib.skill.zhongMoGu.getLooseHolders().length) return false;
                    var holder = lib.skill.zhongMoGu.getHolder();
                    if(holder && holder.countGaiPai('tiMoZhongMoGuPai') >= 2) {
                        return false;
                    }
                    return game.hasPlayer(function(current) {
                        return lib.skill.zhongMoGu.filterTarget(null, player, current);
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    var looseHolders = lib.skill.zhongMoGu.getLooseHolders();
                    if(!looseHolders.length || !event.target ||
                        (event.target.isIn && !event.target.isIn())) return;

                    var mushroomHolder;
                    if(looseHolders.length == 1) {
                        mushroomHolder = looseHolders[0];
                    } else {
                        var targets = (await player.chooseTarget(
                            true,
                            '种蘑菇：选择一名拥有【蘑菇】的角色',
                            function(card, player, target) {
                                return target.countGaiPai('tiMoMoGu') > 0;
                            }
                        ).set('ai', function(target) {
                            var player = _status.event.player;
                            return target == player ? 2 : 1;
                        }).forResultTargets() || []);
                        mushroomHolder = targets[0];
                    }
                    if(!mushroomHolder) return;

                    var looseCards = mushroomHolder.getGaiPai('tiMoMoGu');
                    var mushroom;
                    if(looseCards.length == 1) {
                        mushroom = looseCards[0];
                    } else {
                        var links = (await player.chooseCardButton(
                            looseCards,
                            true,
                            '种蘑菇：选择置于专属卡上的1个【蘑菇】'
                        ).set('ai', function(button) {
                            return 6 - get.value(button.link);
                        }).forResultLinks() || []);
                        mushroom = links[0];
                    }
                    if(!mushroom) return;

                    var receiver = event.target;
                    var oldHolder = lib.skill.zhongMoGu.getHolder();
                    var attached = oldHolder ?
                        oldHolder.getGaiPai('tiMoZhongMoGuPai').slice() : [];

                    if(oldHolder && oldHolder != receiver) {
                        await oldHolder.removeZhiShiWu('tiMoZhongMoGuKa');
                        delete oldHolder.storage.tiMoZhongMoGuSource;
                    }

                    if(mushroomHolder == receiver) {
                        receiver.removeGaintag('tiMoMoGu', [mushroom]);
                        receiver.addGaintag([mushroom], 'tiMoZhongMoGuPai');
                        if(receiver.countGaiPai('tiMoMoGu') > 0) {
                            receiver.markSkill('tiMoMoGu');
                        } else {
                            receiver.unmarkSkill('tiMoMoGu');
                        }
                        receiver.markSkill('tiMoZhongMoGuPai');
                    } else {
                        await receiver.addToExpansion(mushroom)
                            .set('gaintag', ['tiMoZhongMoGuPai'])
                            .set('log', true);
                    }

                    if(attached.length && oldHolder != receiver) {
                        await receiver.addToExpansion(attached)
                            .set('gaintag', ['tiMoZhongMoGuPai'])
                            .set('log', true);
                    }

                    await receiver.addZhiShiWu('tiMoZhongMoGuKa', 1, true);
                    receiver.storage.tiMoZhongMoGuSource = player;
                    game.log(player, '将【种蘑菇】转移给了', receiver);
                },
                        "ai": {
                            "shuiJing": true,
                            "order": 3.5,
                            "result": {
                                "target": function(player, target) {
                            return -2;
                        },
                            },
                        },
                    },
                    "tiMoZhuanShu": {
                        "charlotte": true,
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "popup": false,
                        "content": function() {
                    [
                        'tiMoMoGu',
                        'tiMoZhiMang',
                        'tiMoZhiMang_jianShang',
                        'tiMoZhiMang_qingChu',
                        'tiMoZhongMoGuKa',
                        'tiMoZhongMoGuPai',
                    ].forEach(function(skill) {
                        game.addGlobalSkill(skill);
                    });
                },
                    },
                    "tiMoMoGu": {
                        "intro": {
                            "name": "蘑菇",
                            "markcount": "gaiPai",
                            "content": "gaiPai",
                            "max": 3,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                    },
                    "tiMoZhiMang": {
                        "intro": {
                            "name": "致盲",
                            "content": "jiChuXiaoGuo",
                            "max": 1,
                        },
                        "tag": {
                            "jiChuXiaoGuo": true,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getJiChuXiaoGuo(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "group": [
                            "tiMoZhiMang_jianShang",
                            "tiMoZhiMang_qingChu",
                        ],
                        "subSkill": {
                            "jianShang": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event &&
                                player.hasJiChuXiaoGuo('tiMoZhiMang');
                        },
                                "content": function() {
                            trigger.changeDamageNum(trigger.yingZhan == true ? -1 : -2);
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasJiChuXiaoGuo('tiMoZhiMang');
                        },
                                "content": async function(event, trigger, player) {
                            var cards = player.getJiChuXiaoGuo('tiMoZhiMang').slice();
                            if(cards.length) {
                                await player.discard(cards, 'tiMoZhiMang').set('visible', true);
                            }
                        },
                            },
                        },
                    },
                    "tiMoZhongMoGuKa": {
                        "intro": {
                            "name": "种蘑菇",
                            "nocount": true,
                            "max": 1,
                            "content": function(storage, player) {
                        return '专属卡上共有' +
                            player.countGaiPai('tiMoZhongMoGuPai') +
                            '个【蘑菇】；打出或展示同系牌时触发。';
                    },
                        },
                        "markimage": "extension/峡谷幻音/mark_tiMoZhongMoGuKa.webp",
                        "getMatchingCards": function(event, player) {
                    if(!event) return [];
                    var xiBies = [];
                    if(event.card) {
                        var cardXiBie = get.xiBie(event.card);
                        if(cardXiBie) xiBies.add(cardXiBie);
                    }
                    if(Array.isArray(event.cards)) {
                        event.cards.forEach(function(card) {
                            var xiBie = get.xiBie(card);
                            if(xiBie) xiBies.add(xiBie);
                        });
                    }
                    return player.getGaiPai('tiMoZhongMoGuPai').filter(function(card) {
                        return xiBies.includes(get.xiBie(card));
                    }).slice(0, 1);
                },
                        "trigger": {
                            "player": [
                                "daChuPai",
                                "showCardsEnd",
                            ],
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return player.hasZhiShiWu('tiMoZhongMoGuKa') &&
                        lib.skill.tiMoZhongMoGuKa.getMatchingCards(event, player).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var cards = lib.skill.tiMoZhongMoGuKa
                        .getMatchingCards(trigger, player);
                    if(!cards.length) return;
                    await player.discard(cards, 'tiMoZhongMoGuPai').set('visible', true);
                    var source = player.storage.tiMoZhongMoGuSource;
                    if(source && source.isIn && source.isIn()) {
                        game.broadcastAll(function(speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: 'ext:峡谷幻音/audio/skill/tiMo/' +
                                    'zhongMoGu_trigger.mp3',
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, source);
                    }
                    if(source && source.isIn && source.isIn()) {
                        await player.faShuDamage(3, source);
                    } else {
                        await player.faShuDamage(3, 'nosource');
                    }
                },
                    },
                    "tiMoZhongMoGuPai": {
                        "intro": {
                            "name": "种蘑菇上的蘑菇",
                            "markcount": "gaiPai",
                            "max": 2,
                            "mark": function(dialog, storage, player) {
                        var cards = player.getGaiPai('tiMoZhongMoGuPai');
                        if(!cards.length) return "没有【蘑菇】";
                        var source = player.storage.tiMoZhongMoGuSource;
                        var viewer = game.me;
                        var canSee = source && viewer && (
                            source == viewer ||
                            source._trueMe == viewer ||
                            viewer._trueMe == source
                        );
                        if(canSee) {
                            dialog.addText("仅提莫可见的【蘑菇】");
                            dialog.addAuto(cards);
                            return false;
                        }
                        return "共有" + cards.length + "张牌";
                    },
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                    },
                    "mieJueXingTai": {
                        "group": [
                            "mieJueXingTai_zhuCeShuLian",
                            "mieJueXingTai_gongJi",
                            "mieJueXingTai_jinZhiZhiLiao",
                            "mieJueXingTai_xueJi",
                            "mieJueXingTai_weiChi",
                        ],
                        "subSkill": {
                            "zhuCeShuLian": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            [
                                'eHuoShuLianKa',
                                'eHuoShuLianKa_yingZhan',
                                'eHuoShuLianKa_qingChu',
                                'eHuoShuLianKa_biaoJiQingLi',
                            ].forEach(function(skill) {
                                game.addGlobalSkill(skill);
                            });
                        },
                            },
                            "gongJi": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                            "jinZhiZhiLiao": {
                                "trigger": {
                                    "player": "zhiLiao",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                                "content": function(event, trigger, player) {
                            trigger.cancel();
                        },
                            },
                            "xueJi": {
                                "trigger": {
                                    "global": "changeShiQiEnd",
                                },
                                "usable": 1,
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            ) &&
                                _status.currentPhase == player &&
                                event &&
                                event.num < 0 &&
                                event.side != player.side &&
                                event.source == player &&
                                !player.isZhiShiWuMax('xueJi');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu('xueJi', 1);
                        },
                            },
                            "weiChi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return player.hasSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                                "content": async function(event, trigger, player) {
                            if(player.countZhiShiWu('xueJi') > 0) {
                                await player.removeZhiShiWu('xueJi', 1);
                                return;
                            }
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            game.broadcastAll(function(speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: 'ext:峡谷幻音/audio/skill/' +
                                        'yaTuoKeSi/mieJueXingTai_end.mp3',
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, player);
                            player.removeSkill(
                                'mieJueXingTaiZhuangTai'
                            );
                        },
                            },
                        },
                    },
                    "ciSiJianQi": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/ciSiJianQi.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event &&
                        event.yingZhan != true &&
                        !!event.target;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【赐死剑气】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var healingGain = player.countZhiLiao() <
                            player.getZhiLiaoLimit() ? 1 : 0;
                        var attackGain = target.countZhiLiao() > 0 ? 1 :
                            get.damageEffect2(target, player, 1);
                        return healingGain + attackGain > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.changeZhiLiao(1, player);
                    var target = trigger.target;
                    if(target && target.isIn() && target.zhiLiao > 0) {
                        await target.changeZhiLiao(-1, player);
                    } else if(target && target.zhiLiao == 0) {
                        trigger.changeDamageNum(1);
                    }
                },
                    },
                    "anYiLiRen": {
                        "audio": false,
                        "getAttackEvent": function(event) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.name == 'useCard' &&
                            current.type == 'gongJi') {
                            return current;
                        }
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return null;
                },
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【暗裔利刃】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var tier = Math.min(
                            3,
                            player.countZhiShiWu('xueRen') + 1
                        );
                        var bonus = tier >= 3 ? 2 : 1;
                        var selfDamage = player.countZhiLiao() == 0 ? 2 : 1;
                        var score = get.damageEffect2(
                            target, player, bonus
                        ) + get.damageEffect2(
                            player, player, selfDamage
                        );
                        if(tier == 2 && target.hasSkill('eHuoShuLian')) {
                            score += 1.5;
                        }
                        if(tier == 3) score += 0.8;
                        return score > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.faShuDamage(1, player, 'nocard');
                    await player.addZhiShiWu('xueRen', 1);
                    var tier = player.countZhiShiWu('xueRen');
                    trigger.anYiLiRenTier = tier;
                    var tierAudio = 'anYiLiRen_' + (
                        tier >= 3 ? 'third' :
                            tier == 2 ? 'second' : 'first'
                    ) + '.mp3';
                    game.broadcastAll(function(file, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: 'ext:峡谷幻音/audio/skill/yaTuoKeSi/' + file,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, tierAudio, player);
                    trigger.anYiLiRenTargetId =
                        trigger.target && trigger.target.playerid;
                    if(tier == 1 || tier == 2) {
                        trigger.changeDamageNum(1);
                    } else if(tier >= 3) {
                        trigger.changeDamageNum(2);
                    }
                },
                        "group": [
                            "anYiLiRen_jiLuShangHai",
                            "anYiLiRen_jieShu",
                        ],
                        "subSkill": {
                            "jiLuShangHai": {
                                "trigger": {
                                    "source": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event || event.num <= 0 ||
                                event.faShu === true) return false;
                            var attack = lib.skill.anYiLiRen
                                .getAttackEvent(event);
                            return !!attack &&
                                attack.player == player &&
                                !!attack.anYiLiRenTier &&
                                event.player == attack.target;
                        },
                                "content": function(event, trigger, player) {
                            var attack = lib.skill.anYiLiRen
                                .getAttackEvent(trigger);
                            if(attack) {
                                attack.anYiLiRenDidDamage = true;
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
                            return !!event && !!event.anYiLiRenTier;
                        },
                                "content": async function(event, trigger, player) {
                            var tier = trigger.anYiLiRenTier;
                            if(tier >= 3) {
                                var count =
                                    player.countZhiShiWu('xueRen');
                                if(count > 0) {
                                    await player.removeZhiShiWu(
                                        'xueRen',
                                        count
                                    );
                                }
                                if(trigger.anYiLiRenDidDamage) {
                                    await player.addZhiShiWu('xueJi', 1);
                                }
                                return;
                            }
                            if(tier != 2 ||
                                !trigger.anYiLiRenDidDamage) return;
                            var target = trigger.target;
                            if(!target || !target.isIn() ||
                                target.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) <= 0) return;
                            player.storage.anYiLiRenZhuiJiTarget =
                                target.playerid;
                            player.syncStorage(
                                'anYiLiRenZhuiJiTarget'
                            );
                            player.addSkill('anYiLiRenZhuiJi');
                            if(!Array.isArray(
                                player.storage.extraXingDong
                            )) {
                                player.storage.extraXingDong = [];
                            }
                            player.storage.extraXingDong.push({
                                xingDong: 'gongJi',
                                anYiLiRenZhuiJi: true,
                                anYiLiRenTargetId: target.playerid,
                            });
                        },
                            },
                        },
                    },
                    "eHuoShuLian": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/eHuoShuLian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "usable": 1,
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return player.countCards('h', function(card) {
                        return get.type(card, player) == 'faShu';
                    }) > 0 && !game.hasPlayer(function(current) {
                        return current.countZhiShiWu(
                            'eHuoShuLianKa'
                        ) > 0;
                    }) && game.hasPlayer(function(current) {
                        return current.side != player.side;
                    });
                },
                        "filterCard": function(card, player) {
                    return get.type(card, player) == 'faShu';
                },
                        "check": function(card) {
                    return 8 - get.value(card);
                },
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "content": async function(event, trigger, player) {
                    await player.draw(2);
                    var targets = (await player.chooseTarget(
                        '恶火束链：选择一名对手',
                        true,
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('ai', function(target) {
                        return get.damageEffect2(
                            target,
                            _status.event.player,
                            1
                        );
                    }).forResultTargets() || []);
                    var target = targets[0];
                    if(!target || !target.isIn()) return;
                    await target.faShuDamage(1, player);
                    if(!target.isIn()) return;
                    target.storage.eHuoShuLianSource =
                        player.playerid;
                    target.syncStorage('eHuoShuLianSource');
                    await target.addZhiShiWu(
                        'eHuoShuLianKa',
                        1,
                        true
                    );
                    player.addGongJi();
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.eHuoShuLian
                            .isSafeForAi(player) ? 4 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.eHuoShuLian
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "anYingChongJue": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/anYingChongJue.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "usable": 1,
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【暗影冲决】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var xiBie = get.xiBie(trigger.card);
                        var canRespond = target.countCards('h', function(card) {
                            return get.type(card, target) == 'gongJi' &&
                                (get.xiBie(card) == xiBie ||
                                    get.xiBie(card) == 'an');
                        }) > 0;
                        if(!canRespond) return false;
                        var currentDamage = Math.max(0, trigger.damageNum || 2);
                        var reducedDamage = Math.max(0, currentDamage - 2);
                        var pressure = target.countCards('h') + reducedDamage >
                            target.getHandcardLimit();
                        return reducedDamage > 0 || pressure ||
                            get.shiQi(!player.side) <= 2;
                    }).forResult();
                },
                        "content": function(event, trigger, player) {
                    trigger.wuFaYingZhan();
                    trigger.changeDamageNum(-2);
                },
                    },
                    "daMie": {
                        "audio": "ext:峡谷幻音/audio/skill/yaTuoKeSi/daMie.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        player.countZhiShiWu('xueJi') > 0 &&
                        !player.hasSkill(
                            'mieJueXingTaiZhuangTai'
                        ) &&
                        !player.isHengZhi();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                    player.addSkill('mieJueXingTaiZhuangTai');
                },
                        "check": function(event, player) {
                    if(player.countZhiShiWu('xueJi') <= 0) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return player.countCards('h', function(card) {
                        return get.type(card, player) == 'gongJi';
                    }) > 0;
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "xueRen": {
                        "intro": {
                            "name": "血刃",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/峡谷幻音/mark_xueRen.webp",
                    },
                    "xueJi": {
                        "intro": {
                            "name": "血祭",
                            "content": "mark",
                            "max": 2,
                        },
                        "onremove": "storage",
                        "markimage": "extension/峡谷幻音/mark_xueJi.webp",
                    },
                    "tiMoYinXing": {
                        "mark": true,
                        "intro": {
                            "content": "持续到你的下个回合结束；你不能成为主动攻击的目标。",
                        },
                        "onremove": function(player) {
                    delete player.storage.tiMoYinXingPhase;
                    delete player.storage.tiMoYinXingExtraGongJi;
                    delete player.storage.tiMoYinXingExtraGongJiPending;
                },
                        "mod": {
                            "targetEnabled": function(card, player, target) {
                        if(get.type(card) != 'gongJi') return;
                        if(!_status.event || _status.event.yingZhan != true) return false;
                    },
                        },
                    },
                    "mieJueXingTaiZhuangTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "灭",
                        "intro": {
                            "name": "灭绝形态",
                            "content": "攻击伤害额外+1，无法以【治疗】抵御伤害；自身回合首次令对方士气下降后获得1【血祭】。",
                        },
                    },
                    "anYiLiRenZhuiJi": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "追",
                        "isPursuitAction": function(player) {
                    var current = _status.event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.name == 'gongJi' &&
                            current.player == player &&
                            current.action === true &&
                            current.anYiLiRenZhuiJi === true) {
                            return true;
                        }
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return false;
                },
                        "intro": {
                            "name": "暗裔利刃·断空",
                            "content": function(storage, player) {
                        var id =
                            player.storage.anYiLiRenZhuiJiTarget;
                        var target = game.players.find(function(current) {
                            return current.playerid == id;
                        });
                        return '下一次额外【攻击行动】只能主动攻击' +
                            (target ? get.translation(target) : '原目标');
                    },
                        },
                        "mod": {
                            "playerEnabled": function(card, source, target) {
                        if(!source ||
                            !source.hasSkill('anYiLiRenZhuiJi') ||
                            !lib.skill.anYiLiRenZhuiJi
                                .isPursuitAction(source) ||
                            get.type(card) != 'gongJi') return;
                        var id =
                            source.storage.anYiLiRenZhuiJiTarget;
                        if(!target ||
                            target.playerid != id ||
                            target.countZhiShiWu(
                                'eHuoShuLianKa'
                            ) <= 0) {
                            return false;
                        }
                    },
                        },
                        "group": [
                            "anYiLiRenZhuiJi_quXiao",
                            "anYiLiRenZhuiJi_qingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.anYiLiRenZhuiJiTarget;
                    player.syncStorage('anYiLiRenZhuiJiTarget');
                },
                        "subSkill": {
                            "quXiao": {
                                "trigger": {
                                    "player": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            if(!player.hasSkill(
                                'anYiLiRenZhuiJi'
                            ) ||
                                event.anYiLiRenZhuiJi !== true) {
                                return false;
                            }
                            var id =
                                player.storage.anYiLiRenZhuiJiTarget;
                            var target = game.players.find(
                                function(current) {
                                    return current.playerid == id;
                                }
                            );
                            return !target ||
                                !target.isIn() ||
                                target.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) <= 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.cancel();
                            player.removeSkill('anYiLiRenZhuiJi');
                            game.log(
                                player,
                                '的【暗裔利刃·断空】追击被取消'
                            );
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "gongJiAfter",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!player.hasSkill(
                                'anYiLiRenZhuiJi'
                            )) return false;
                            if(event.anYiLiRenZhuiJi === true) {
                                return true;
                            }
                            var action = event.getParent &&
                                event.getParent('gongJi');
                            return !!action &&
                                action.anYiLiRenZhuiJi === true;
                        },
                                "content": function(event, trigger, player) {
                            player.removeSkill('anYiLiRenZhuiJi');
                        },
                            },
                        },
                    },
                    "eHuoShuLianKa": {
                        "charlotte": true,
                        "intro": {
                            "name": "专属卡【恶火束链】",
                            "content": "应战攻击伤害-1；拥有者回合结束时移除。",
                            "max": 1,
                        },
                        "markimage": "extension/峡谷幻音/mark_eHuoShuLianKa.webp",
                        "group": [
                            "eHuoShuLianKa_yingZhan",
                            "eHuoShuLianKa_qingChu",
                            "eHuoShuLianKa_biaoJiQingLi",
                        ],
                        "onremove": function(player) {
                    delete player.storage.eHuoShuLianKa;
                    delete player.storage.eHuoShuLianSource;
                    player.syncStorage('eHuoShuLianSource');
                },
                        "subSkill": {
                            "yingZhan": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return event.yingZhan === true &&
                                player.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) > 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(-1);
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            return player.countZhiShiWu(
                                'eHuoShuLianKa'
                            ) > 0;
                        },
                                "content": async function(event, trigger, player) {
                            var count = player.countZhiShiWu(
                                'eHuoShuLianKa'
                            );
                            await player.removeZhiShiWu(
                                'eHuoShuLianKa',
                                count
                            );
                            delete player.storage.eHuoShuLianSource;
                            player.syncStorage(
                                'eHuoShuLianSource'
                            );
                        },
                            },
                            "biaoJiQingLi": {
                                "trigger": {
                                    "player": "changeZhiShiWuAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return event.zhiShiWu ==
                                'eHuoShuLianKa' &&
                                player.countZhiShiWu(
                                    'eHuoShuLianKa'
                                ) == 0 &&
                                !!player.storage
                                    .eHuoShuLianSource;
                        },
                                "content": function(event, trigger, player) {
                            delete player.storage.eHuoShuLianSource;
                            player.syncStorage(
                                'eHuoShuLianSource'
                            );
                        },
                            },
                        },
                    },
                },
                "translate": {
                    "lvZheDeZhaoHuan": "被动【旅者的召唤】",
                    "lvZheDeZhaoHuan_info": "<span class='tiaoJian'>（游戏开始时）</span>+1<span style=\"color:#537D28\">【木灵】</span>。<span class='tiaoJian'>（【法术行动】结束后）</span>+1<span style=\"color:#537D28\">【木灵】</span>。",
                    "muLingZhuiJi": "响应【木灵追击】",
                    "muLingZhuiJi_info": "<span class='tiaoJian'>（主动攻击前①，移除X<span style=\"color:#537D28\">【木灵】</span>）</span>本次攻击伤害+X。",
                    "xingJieShuFu": "法术【星界束缚】",
                    "xingJieShuFu_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>对1名对手造成1点法术伤害；<span class='tiaoJian'>（若此次伤害造成士气下降）</span>选择其相邻的1名角色，造成2点法术伤害。",
                    "youShenShengTan": "法术【游神圣坛】",
                    "youShenShengTan_info": "<span class='tiaoJian'>（弃置1张【治疗术】或【治愈之光】）</span>选择1名我方角色，放置<span style=\"color:#9A7027\">【游神圣坛】</span>。<br><span class='tiaoJian'>（你的回合开始时）</span>已有的<span style=\"color:#9A7027\">【游神圣坛】</span>全部充能。",
                    "shenQiLvCheng": "法术【神奇旅程】",
                    "shenQiLvCheng_info": "<span style=\"color:#0C9CE6\">【水晶】</span>选择1名我方角色与1名对手，各放置<span style=\"color:#8E44AD\">【神奇旅程】</span>。",
                    "tiaoHeMingYun": "法术【调和命运】",
                    "tiaoHeMingYun_info": "<span style=\"color:#E02B17\">【宝石】</span>指定1名角色，令其与其左右相邻角色各获得<span style=\"color:#666666\">【凝滞】</span>。",
                    "muLing": "专属【木灵】",
                    "muLing_info": "巴德的专属指示物，上限为3。",
                    "youShenShengTanInfo": "专属【游神圣坛】",
                    "youShenShengTanInfo_info": "<span class='tiaoJian'>（拥有者回合开始时）</span>可以移除此卡：+1【治疗】；已充能时改为+2【治疗】，弃置1张手牌。<br><span class='tiaoJian'>（对手攻击命中拥有者后②）</span>移除此卡，不结算上述效果。",
                    "shenQiLvChengInfo": "专属【神奇旅程】【回合限定】",
                    "shenQiLvChengInfo_info": "<span class='tiaoJian'>（拥有者行动结束后）</span>+1【攻击行动】，但只能以<span style=\"color:#8E44AD\">【神奇旅程】</span>的拥有者为目标。<br><span class='tiaoJian'>（巴德的回合开始时）</span>移除此卡。",
                    "baDeNingZhiInfo": "专属【凝滞】",
                    "baDeNingZhiInfo_info": "拥有者受到的伤害恒为0，行动阶段只能执行【特殊行动】，否则直接跳过行动阶段。<br><span class='tiaoJian'>（巴德的回合开始时）</span>移除此状态。",
                    "baDeManager": "星界游神",
                    "youShenShengTanEffect": "游神圣坛",
                    "shenQiLvChengEffect": "神奇旅程",
                    "baDeNingZhi": "凝滞",
                    "qinYinGongMing": "被动【琴音共鸣】",
                    "qinYinGongMing_info": "<span class='tiaoJian'>（你演奏1种乐章时）</span>若与上一次演奏的乐章不同，+1<span style=\"color:#98527B\">【和弦】</span>。<span class='tiaoJian'>（若因此达到3）</span>移除全部<span style=\"color:#98527B\">【和弦】</span>，强化本次乐章，并在结算后+1【攻击行动】。",
                    "yingYongZanMeiShi": "法术【英勇赞美诗】",
                    "yingYongZanMeiShi_info": "对目标对手造成1点法术伤害③；<span class='tiaoJian'>（若你额外弃置1张【威力赐福】）</span>为其他所有我方角色附加【英勇余音】。<span class='tiaoJian'>（受到【琴音共鸣】强化时）</span>改为指定至多2名对手各造成1点法术伤害③。",
                    "jianYiYongTanDiao": "法术【坚毅咏叹调】",
                    "jianYiYongTanDiao_info": "目标我方角色+1【治疗】；<span class='tiaoJian'>（若你额外弃置1张【治疗术】或【治愈之光】）</span>为其他所有我方角色附加【坚毅余音】。<span class='tiaoJian'>（受到【琴音共鸣】强化时）</span>改为目标我方角色+2【治疗】。",
                    "xunJieZouMingQu": "法术【迅捷奏鸣曲】",
                    "xunJieZouMingQu_info": "目标我方角色弃置1张手牌【强制】；<span class='tiaoJian'>（若你额外弃置1张【迅捷赐福】）</span>为其他所有我方角色附加【迅捷余音】。<span class='tiaoJian'>（受到【琴音共鸣】强化时）</span>改为令目标弃置2张手牌【强制】，然后令其摸1张牌。",
                    "liLiangHeXian": "被动【力量和弦】",
                    "liLiangHeXian_info": "娑娜的3种乐章结算后，根据此次乐章获得对应余音。余音只能存在1种，释放其他乐章时会被替换。<br>【英勇余音】：<span class='tiaoJian'>（攻击命中时）</span>本次攻击伤害额外+1，随后移除。<br>【坚毅余音】：<span class='tiaoJian'>（承受伤害时）</span>该伤害-1⑤，随后移除。<br>【迅捷余音】：<span class='tiaoJian'>（执行【特殊行动】后）</span>弃置1张牌，随后移除。",
                    "jiXingBianZou": "响应【即兴变奏】",
                    "jiXingBianZou_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（演奏乐章需要额外弃置指定独有技牌时）</span><span style=\"color:#00B0F0\">视为已经弃置，弃置2张手牌。</span>",
                    "suoNaYingYongYuYin": "英勇余音",
                    "suoNaYingYongYuYin_info": "<span class='tiaoJian'>（攻击命中时）</span>本次攻击伤害额外+1，随后移除。",
                    "suoNaJianYiYuYin": "坚毅余音",
                    "suoNaJianYiYuYin_info": "<span class='tiaoJian'>（承受伤害时）</span>该伤害-1⑤，随后移除。",
                    "suoNaXunJieYuYin": "迅捷余音",
                    "suoNaXunJieYuYin_info": "<span class='tiaoJian'>（执行【特殊行动】后）</span>弃置1张牌，随后移除。",
                    "suoNaHeXian": "<span style=\"color:#98527B\">【和弦】</span>",
                    "suoNaHeXian_info": "娑娜的专属指示物，上限为3。",
                    "kuangWuZhongLeZhang": "法术【狂舞终乐章】",
                    "kuangWuZhongLeZhang_info": "<span style=\"color:#E02B17\">【宝石】</span>×2，指定1至2名对手，依次对其各造成1点法术伤害③，并为其使用1张【虚弱】。",
                    "yinXingDeChiBang": "被动【隐形的翅膀】",
                    "yinXingDeChiBang_info": "<span class='tiaoJian'>（【特殊行动】结束后）</span>【横置】；直到你的下个回合结束，你不能成为主动攻击的目标。<span class='tiaoJian'>（你的回合开始时，若你【横置】）</span>【重置】，本回合额外+1【攻击行动】。<span class='tiaoJian'>（你在【横置】时受到伤害后）</span>【重置】。",
                    "tiMoYinXing": "隐形",
                    "tiMoYinXing_info": "持续到提莫的下个回合结束，不能成为主动攻击的目标。",
                    "zhiMangChuiJian": "法术【致盲吹箭】",
                    "zhiMangChuiJian_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>对目标对手施加【致盲】。",
                    "tiMoZhiMang": "专属【致盲】",
                    "tiMoZhiMang_info": "持有者主动攻击伤害-2、应战攻击伤害-1；<span class='tiaoJian'>（其回合结束后）</span>移除。",
                    "xiaoMoKuaiPao": "法术【小莫快跑】",
                    "xiaoMoKuaiPao_info": "<span class='tiaoJian'>（手牌数大于2时）</span>摸1张牌【强制】，然后面朝下弃置2张牌。",
                    "duXingSheJi": "被动【毒性射击】",
                    "duXingSheJi_info": "<span class='tiaoJian'>（攻击命中时）</span>对攻击目标额外造成1点法术伤害。",
                    "moGuFangZhi": "响应【蘑菇生成】",
                    "moGuFangZhi_info": "<span class='tiaoJian'>（你的能量区有</span><span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>且你面朝下弃牌时）</span>将弃牌置于自己角色旁作为<span style=\"color:#8B5E3C\">【蘑菇】</span>，最多放置至上限。",
                    "tiMoMoGu": "<span style=\"color:#8B5E3C\">【蘑菇】</span>",
                    "tiMoMoGu_info": "提莫的专属盖牌；自己角色旁上限为3。",
                    "zhongMoGu": "法术【种蘑菇】",
                    "zhongMoGu_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（移除场上1个</span><span style=\"color:#8B5E3C\">【蘑菇】</span><span class='tiaoJian'>）</span>将其置于专属卡【种蘑菇】上，然后将该卡转移给目标对手；其上最多有2个<span style=\"color:#8B5E3C\">【蘑菇】</span>。",
                    "tiMoZhongMoGuKa": "专属卡【种蘑菇】",
                    "tiMoZhongMoGuKa_info": "<span style=\"color:#8B5E3C\">【蘑菇】</span>仅提莫可见。<span class='tiaoJian'>（持有者打出或展示与其中1个</span><span style=\"color:#8B5E3C\">【蘑菇】</span><span class='tiaoJian'>同系的牌时）</span>移除该<span style=\"color:#8B5E3C\">【蘑菇】</span>【展示】，提莫对其造成3点法术伤害③。",
                    "tiMoZhongMoGuPai": "种蘑菇上的蘑菇",
                    "tiMoZhongMoGuPai_info": "置于专属卡【种蘑菇】上的<span style=\"color:#8B5E3C\">【蘑菇】</span>，上限为2；实体牌仅提莫可见。",
                    "xueRen": "<span class='hong'>【血刃】</span>",
                    "xueRen_info": "亚托克斯的专属指示物，上限为3。",
                    "xueJi": "<span class='hong'>【血祭】</span>",
                    "xueJi_info": "亚托克斯的专属指示物，上限为2。",
                    "mieJueXingTai": "被动【灭绝形态】",
                    "mieJueXingTai_info": "<span class='tiaoJian'>（【灭绝形态】下）</span>攻击伤害额外+1；不能以【治疗】抵御伤害；<span class='tiaoJian'>（你的回合内首次令对方士气下降后）</span>+1<span class='hong'>【血祭】</span>。<span class='tiaoJian'>（你的回合开始时）</span>若有<span class='hong'>【血祭】</span>，移除1<span class='hong'>【血祭】</span>；否则【重置】并退出该形态。",
                    "mieJueXingTaiZhuangTai": "灭绝形态",
                    "mieJueXingTaiZhuangTai_info": "攻击伤害额外+1；不能以【治疗】抵御伤害；自身回合首次令对方士气下降后+1<span class='hong'>【血祭】</span>。",
                    "ciSiJianQi": "响应【赐死剑气】【回合限定】",
                    "ciSiJianQi_info": "<span class='tiaoJian'>（主动攻击命中后②）</span>+1【治疗】；（若目标有【治疗】）移除其1【治疗】；否则本次攻击伤害+1。",
                    "anYiLiRen": "响应【暗裔利刃】",
                    "anYiLiRen_info": "<span class='tiaoJian'>（主动攻击前①）</span>对自己造成1点法术伤害③，然后+1<span class='hong'>【血刃】</span>并按其数量结算：<br>1层：本次攻击伤害额外+1。<br>2层：本次攻击伤害额外+1；若对【恶火束链】持有者造成实际伤害，行动结束后额外+1【攻击行动】，只能攻击该角色。<br>3层：本次攻击伤害额外+2；行动结束后移除全部<span class='hong'>【血刃】</span>，<span class='tiaoJian'>（若造成过实际伤害）</span>+1<span class='hong'>【血祭】</span>。",
                    "anYiLiRenZhuiJi": "暗裔利刃·断空",
                    "anYiLiRenZhuiJi_info": "下一次额外【攻击行动】只能主动攻击本次【暗裔利刃·断空】命中的【恶火束链】拥有者。",
                    "eHuoShuLian": "法术【恶火束链】",
                    "eHuoShuLian_info": "【回合限定】<span class='tiaoJian'>（弃置1张法术牌）</span>摸2张牌【强制】，指定1名对手，对其造成1点法术伤害③，并将【恶火束链】放置于其面前，然后额外+1【攻击行动】。",
                    "eHuoShuLianKa": "专属【恶火束链】",
                    "eHuoShuLianKa_info": "持有者应战攻击伤害-1；<span class='tiaoJian'>（其回合结束时）</span>移除。",
                    "anYingChongJue": "响应【暗影冲决】",
                    "anYingChongJue_info": "【回合限定】<span class='tiaoJian'>（主动攻击前①）</span>本次攻击无法应战，攻击伤害-2。",
                    "daMie": "启动【大灭】",
                    "daMie_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（【普通形态】下，</span><span class='hong'>【血祭】</span><span class='tiaoJian'>＞0）</span>【横置】并进入【灭绝形态】。",
                },
            },
            "intro": "添加角色提莫、娑娜、亚托克斯、巴德。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "1.10",
        },
        "files": {
            "character": [
                "baDe.jpg",
                "tiMo.jpg",
                "suoNa.jpg",
                "yaTuoKeSi.jpg",
            ],
            "card": [],
            "skill": [
                "mark_baDeMuLing.webp",
                "mark_baDeYouShenShengTan.webp",
                "mark_baDeShenQiLvCheng.webp",
                "mark_baDeNingZhi.webp",
                "mark_tiMoZhongMoGuKa.webp",
                "mark_suoNaHeXian.webp",
                "mark_suoNaYingYongYuYin.webp",
                "mark_suoNaJianYiYuYin.webp",
                "mark_suoNaXunJieYuYin.webp",
                "mark_xueRen.webp",
                "mark_xueJi.webp",
                "mark_eHuoShuLianKa.webp",
            ],
            "audio": [
                "audio/skill/baDe/lvZheDeZhaoHuan.mp3",
                "audio/skill/baDe/muLingZhuiJi.mp3",
                "audio/skill/baDe/xingJieShuFu.mp3",
                "audio/skill/baDe/youShenShengTan.mp3",
                "audio/skill/baDe/shenQiLvCheng.mp3",
                "audio/skill/baDe/tiaoHeMingYun.mp3",
                "audio/action/baDe/gouMai.mp3",
                "audio/action/baDe/heCheng.mp3",
                "audio/action/baDe/tiLian.mp3",
                "audio/skill/tiMo/yinXingDeChiBang.mp3",
                "audio/skill/tiMo/zhiMangChuiJian.mp3",
                "audio/skill/tiMo/xiaoMoKuaiPao.mp3",
                "audio/skill/tiMo/duXingSheJi.mp3",
                "audio/skill/tiMo/moGuShengCheng.mp3",
                "audio/skill/tiMo/zhongMoGu.mp3",
                "audio/skill/tiMo/zhongMoGu_trigger.mp3",
                "audio/action/tiMo/gouMai.mp3",
                "audio/action/tiMo/heCheng.mp3",
                "audio/action/tiMo/tiLian.mp3",
                "audio/skill/suoNa/qinYinGongMing.mp3",
                "audio/skill/suoNa/yingYongZanMeiShi.mp3",
                "audio/skill/suoNa/jianYiYongTanDiao.mp3",
                "audio/skill/suoNa/xunJieZouMingQu.mp3",
                "audio/skill/suoNa/jiXingBianZou.mp3",
                "audio/skill/suoNa/kuangWuZhongYueZhang.mp3",
                "audio/action/suoNa/gouMai.mp3",
                "audio/action/suoNa/heCheng.mp3",
                "audio/action/suoNa/tiLian.mp3",
                "audio/skill/yaTuoKeSi/ciSiJianQi.mp3",
                "audio/skill/yaTuoKeSi/anYiLiRen_first.mp3",
                "audio/skill/yaTuoKeSi/anYiLiRen_second.mp3",
                "audio/skill/yaTuoKeSi/anYiLiRen_third.mp3",
                "audio/skill/yaTuoKeSi/eHuoShuLian.mp3",
                "audio/skill/yaTuoKeSi/anYingChongJue.mp3",
                "audio/skill/yaTuoKeSi/daMie.mp3",
                "audio/skill/yaTuoKeSi/mieJueXingTai_end.mp3",
                "audio/action/yaTuoKeSi/gouMai.mp3",
                "audio/action/yaTuoKeSi/heCheng.mp3",
                "audio/action/yaTuoKeSi/tiLian.mp3",
            ],
        },
        "connect": true,
    };
});
