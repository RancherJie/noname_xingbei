game.import("extension", function(lib, game, ui, get, ai, _status) {
    return {
        "name": "电啸龙吟",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            var actionAudioSkill = 'dianXiaoLongYin_actionAudio';
            if(!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    trigger: { player: ['gouMai', 'heCheng', 'tiLian'] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function(event, player) {
                        return ['dianGunOtto', 'yongChuTaFei', 'naiLong']
                            .some(function(id) {
                                return player.name == id ||
                                    player.name1 == id ||
                                    player.name2 == id;
                            });
                    },
                    content: function(event, trigger, player) {
                        var action = event.triggername || trigger.name;
                        if(!['gouMai', 'heCheng', 'tiLian'].includes(action)) {
                            return;
                        }
                        var character = [
                            'dianGunOtto',
                            'yongChuTaFei',
                            'naiLong',
                        ].find(function(id) {
                            return player.name == id ||
                                player.name1 == id ||
                                player.name2 == id;
                        });
                        if(!character) return;
                        var path = 'ext:电啸龙吟/audio/action/' + character +
                            '/' + action + '.mp3';
                        game.broadcastAll(function(audioPath, speaker) {
                            if(!lib.config.background_speak) return;
                            game.playAudio({
                                path: audioPath,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, path, player);
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
                    "naiLong": [
                        null,
                        "shengGroup",
                        3,
                        [
                            "woShiNaiLong",
                            "buShiZhuangTangShiZhenTang",
                            "naiLongDaXiao",
                        ],
                        [
                            "des:总能以离谱笑声搅乱战局的显眼包，胡闹之中也会照顾同伴。他把技能弃牌转化为治疗，并用临场摸牌改写攻击的应战与伤害。",
                            "ext:电啸龙吟/naiLong.jpg",
                        ],
                    ],
                    "dianGunOtto": [
                        null,
                        "xueGroup",
                        3.5,
                        [
                            "baiYinWanQi",
                            "shuaiOttoShuai",
                            "zunNiHuoJia",
                            "dianGunShengJing",
                            "hongWen",
                            "fangGuan",
                        ],
                        [
                            "des:在压力与失控之间不断升温的红温主播，把每次受伤都记成新的怒火。红温爆表后，他进入白银晚期，将加剧的伤害倾泻给所有对手。",
                            "ext:电啸龙吟/otto.jpg",
                        ],
                    ],
                    "yongChuTaFei": [
                        null,
                        "shengGroup",
                        4.5,
                        [
                            "suanFaTuiJian",
                            "guoQiZhuBao",
                            "guanZhuTaFeiMiao",
                            "qianShiHeiTaoYing",
                            "qianShiYiBaoShuTiaoXiXi",
                            "yuanShengYao",
                            "yongChuTaFeiLiuLiang",
                            "yongChuTaFeiShuTiao",
                        ],
                        [
                            "des:追逐热榜与流量的王牌主包，把整片战场都变成直播素材。她记录全场行动、用薯条缓存手牌，并在热度顶峰连续开启额外回合。",
                            "ext:电啸龙吟/yongChuTaFei.jpg",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "电啸龙吟": "电啸龙吟",
                    "naiLong": "奶龙",
                    "dianGunOtto": "电棍Otto",
                    "yongChuTaFei": "永雏塔菲",
                },
            },
            "card": {
                "card": {},
                "translate": {},
                "list": [],
            },
            "skill": {
                "skill": {
                    "woShiNaiLong": {
                        "isNaiLongDiscard": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 8) {
                        if(current.naiLongSkillSource == player.playerid) {
                            return true;
                        }
                        current = current.getParent && current.getParent();
                        guard++;
                    }
                    return false;
                },
                        "group": [
                            "woShiNaiLong_kaiChang",
                            "woShiNaiLong_qiPaiZhiLiao",
                            "woShiNaiLong_gongJiMingZhong",
                        ],
                        "subSkill": {
                            "kaiChang": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            game.broadcastAll(function(speaker) {
                                if(!lib.config.background_speak) return;
                                game.playAudio({
                                    path: 'ext:电啸龙吟/audio/skill/naiLong/' +
                                        'woShiNaiLong.mp3',
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, player);
                        },
                            },
                            "qiPaiZhiLiao": {
                                "audio": "ext:电啸龙吟/audio/skill/naiLong/woShiNaiLong.mp3",
                                "trigger": {
                                    "global": "discard",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.player &&
                                event.nun > 0 &&
                                lib.skill.woShiNaiLong
                                    .isNaiLongDiscard(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            await trigger.player.changeZhiLiao(1, player);
                        },
                            },
                            "gongJiMingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "filter": function(event, player) {
                            return game.hasPlayer(function(current) {
                                return current != player &&
                                    current.side == player.side;
                            });
                        },
                                "cost": async function(event, trigger, player) {
                            event.result = await player.chooseTarget(
                                '【我是奶龙】：选择一名队友令其弃置1张手牌',
                                function(card, player, target) {
                                    return target != player &&
                                        target.side == player.side;
                                }
                            ).set('ai', function(target) {
                                var player = _status.event.player;
                                var canDiscard = target.countCards('h', function(card) {
                                    return lib.filter.cardDiscardable(card, target);
                                }) > 0;
                                return canDiscard && get.attitude(player, target) > 0 ? 1 : 0;
                            }).forResult();
                        },
                                "content": async function(event, trigger, player) {
                            var target = event.targets[0];
                            if(!target || !target.isIn()) return;
                            var discardable = target.countCards('h', function(card) {
                                return lib.filter.cardDiscardable(card, target);
                            }) > 0;
                            if(!discardable) return;
                            var next = target.chooseToDiscard(
                                'h',
                                1,
                                true,
                                '【我是奶龙】：弃置1张手牌'
                            ).set('filterCard', function(card, target) {
                                return lib.filter.cardDiscardable(card, target);
                            }).set('naiLongSkillSource', player.playerid);
                            await next;
                        },
                            },
                        },
                    },
                    "buShiZhuangTangShiZhenTang": {
                        "audio": "ext:电啸龙吟/audio/skill/naiLong/buShiZhuangTangShiZhenTang.mp3",
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.target == player &&
                        !!event.player &&
                        event.player != player;
                },
                        "content": async function(event, trigger, player) {
                    var cards = await player.draw(1).forResult();
                    if(cards.length) {
                            await player.showCards(
                                cards,
                                '【不是装唐，是真唐】：展示摸到的牌'
                            );
                            var card = cards[0];
                            if(get.xiBie(card) == get.xiBie(trigger.card)) {
                                trigger.wuFaYingZhan();
                            } else {
                                await player.discard([card])
                                    .set(
                                        'naiLongSkillSource',
                                        player.playerid
                                    );
                                trigger.changeDamageNum(-1);
                            }
                    }
                },
                    },
                    "naiLongDaXiao": {
                        "audio": "ext:电啸龙吟/audio/skill/naiLong/naiLongDaXiao.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    var targets = [];
                    var current = player;
                    var guard = 0;
                    do {
                        targets.push(current);
                        current = current.getNext();
                        guard++;
                    } while(
                        current &&
                        current != player &&
                        guard < game.players.length
                    );

                    for(var target of targets) {
                        if(!target || !target.isIn()) continue;
                        if(target.countCards('h', function(card) {
                            return lib.filter.cardDiscardable(card, target);
                        }) <= 0) continue;
                        var next = target.chooseToDiscard(
                            'h',
                            1,
                            true,
                            '【奶龙大笑】：弃置1张手牌'
                        ).set('filterCard', function(card, target) {
                            return lib.filter.cardDiscardable(card, target);
                        }).set('ai', function(card) {
                            var target = _status.event.player;
                            var type = get.type(card, target);
                            var actionCards = target.countCards('h', function(current) {
                                var currentType = get.type(current, target);
                                return (currentType == 'gongJi' || currentType == 'faShu') && target.hasUseTarget(current);
                            });
                            if(target === _status.event.player && target.playerid === _status.event.naiLongSkillSource && target.hasUseTarget(card) && actionCards <= 1) {
                                return -20;
                            }
                            return 8 - get.value(card, target);
                        }).set('naiLongSkillSource', player.playerid);
                        await next;
                    }
                },
                        "check": function(event, player) {
                    var discardableHand = player.countCards('h', function(card) {
                        return lib.filter.cardDiscardable(card, player);
                    });
                    if(discardableHand <= 2) return false;
                    var hand = player.getCards('h');
                    var usable = hand.filter(function(card) { return player.hasUseTarget(card); });
                    if(!usable.length || !hand.some(function(card) {
                        return lib.filter.cardDiscardable(card, player) && usable.some(function(keep) { return keep !== card; });
                    })) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target.countCards('h') <= 0) return;
                        var needsHealing = target.zhiLiao <
                            target.getZhiLiaoLimit();
                        if(target.side == player.side) {
                            score += needsHealing ? 1 : 0.2;
                        } else {
                            score += needsHealing ? 0 : 0.8;
                        }
                    });
                    return score >= 1.5;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "baiYinWanQi": {
                        "enterState": async function(player, relatedEvent) {
                    if(!player || player.hasSkill('baiYinWanQiZhuangTai')) {
                        return;
                    }
                    var count = player.countZhiShiWu('hongWen');
                    if(count > 0) {
                        await player.removeZhiShiWu('hongWen', count);
                    }
                    var actionPhase = relatedEvent &&
                        typeof relatedEvent.getParent == 'function' &&
                        relatedEvent.getParent('xingDong');
                    player.storage.baiYinWanQiSkipCurrent =
                        !!actionPhase &&
                        actionPhase.name == 'xingDong' &&
                        actionPhase.player == player;
                    player.addSkill('baiYinWanQiZhuangTai');
                    game.broadcastAll(function(speaker) {
                        if(!lib.config.background_speak) return;
                        game.playAudio({
                            path: 'ext:电啸龙吟/audio/skill/dianGunOtto/' +
                                'baiYinWanQi.mp3',
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, player);
                    await player.hengZhi();
                },
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !player.hasSkill('baiYinWanQiZhuangTai') &&
                        !player.isZhiShiWuMax('hongWen');
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu('hongWen', 1);
                    if(player.countZhiShiWu('hongWen') >= 3) {
                        await lib.skill.baiYinWanQi.enterState(
                            player,
                            trigger
                        );
                    }
                },
                        "group": "baiYinWanQi_zhuCeFangGuan",
                        "subSkill": {
                            "zhuCeFangGuan": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "content": function() {
                            [
                                'fangGuan',
                                'fangGuan_gongJiJieShu',
                                'fangGuan_xingDongJieShu',
                            ].forEach(function(skill) {
                                game.addGlobalSkill(skill);
                            });
                        },
                            },
                        },
                    },
                    "shuaiOttoShuai": {
                        "audio": "ext:电啸龙吟/audio/skill/dianGunOtto/shuaiOttoShuai.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【帅otto帅】，对自己造成1点法术伤害并令本次攻击伤害额外+2？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger && trigger.target;
                        if(!target || target.side == player.side) return false;
                        var selfDamage = player.hasSkill(
                            'baiYinWanQiZhuangTai'
                        ) ? 3 : 1;
                        var score = get.damageEffect2(
                            target, player, 2
                        ) + get.damageEffect2(
                            player, player, selfDamage
                        );
                        if(player.countZhiShiWu('hongWen') >= 2 &&
                            !player.hasSkill('baiYinWanQiZhuangTai')) {
                            score += 1.2;
                        }
                        return score > 0;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.faShuDamage(1, player);
                    trigger.changeDamageNum(2);
                },
                    },
                    "zunNiHuoJia": {
                        "audio": "ext:电啸龙吟/audio/skill/dianGunOtto/zunNiHuoJia.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return get.type(card) == 'faShu' &&
                        lib.filter.cardDiscardable(card, player);
                },
                        "filter": function(event, player) {
                    if(!player.countCards('h', function(card) {
                        return lib.skill.zunNiHuoJia
                            .filterCard(card, player);
                    })) return false;
                    return game.hasPlayer(function(current) {
                        return current.side != player.side &&
                            current.countZhiShiWu('fangGuan') == 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side &&
                        target.countZhiShiWu('fangGuan') == 0;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    target.storage.fangGuanSource = player.playerid;
                    target.syncStorage('fangGuanSource');
                    await target.addZhiShiWu('fangGuan', 1, true);
                    if(target.countZhiShiWu('fangGuan') == 0) {
                        delete target.storage.fangGuanSource;
                        target.syncStorage('fangGuanSource');
                    }
                },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "target": -1,
                            },
                        },
                    },
                    "dianGunShengJing": {
                        "audio": "ext:电啸龙吟/audio/skill/dianGunOtto/dianGunShengJing.mp3",
                        "trigger": {
                            "player": "changeShiQiEnd",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.player == player &&
                        event.num < 0 &&
                        event.cause == 'damage' &&
                        player.hasSkill('baiYinWanQiZhuangTai') &&
                        player.canBiShaBaoShi() &&
                        game.hasPlayer(function(current) {
                            return current.side != player.side;
                        });
                },
                        "cost": async function(event, trigger, player) {
                    var targets = (await player.chooseTarget(
                        '是否发动【电棍圣经】，指定一名对手？',
                        function(card, player, target) {
                            return target.side != player.side;
                        }
                    ).set('ai', function(target) {
                        return get.damageEffect2(
                            target,
                            _status.event.player,
                            Math.max(
                                1,
                                -_status.event.getTrigger().num
                            )
                        );
                    }).forResultTargets() || []);
                    event.result = {
                        bool: targets.length > 0,
                        targets: targets,
                        cost_data: Math.max(0, -trigger.num),
                    };
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var primary = event.targets[0];
                    var damage = Math.max(0, event.cost_data || 0);
                    if(primary && primary.isIn()) {
                        await primary.faShuDamage(damage, player);
                    }
                    var others = game.filterPlayer(function(current) {
                        return current.side != player.side &&
                            current != primary;
                    }).sortBySeat(player);
                    for(var target of others) {
                        if(target.isIn()) {
                            await target.faShuDamage(1, player);
                        }
                    }
                    await player.chongZhi();
                    player.removeSkill('baiYinWanQiZhuangTai');
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "hongWen": {
                        "intro": {
                            "name": "红温",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/电啸龙吟/mark_hongWen.png",
                    },
                    "fangGuan": {
                        "charlotte": true,
                        "intro": {
                            "name": "专属卡【房管】",
                            "content": "下个行动阶段内首次主动攻击只能指定电棍Otto；攻击行动结束后移除。行动阶段结束时仍存在，则电棍Otto对拥有者造成2点法术伤害。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_fangGuan.png",
                        "mod": {
                            "playerEnabled": function(card, source, target) {
                        if(!source ||
                            source.countZhiShiWu('fangGuan') == 0 ||
                            get.type(card) != 'gongJi') return;
                        var current = _status.event;
                        var guard = 0;
                        while(current && guard < 20) {
                            if(current.name == '_yingZhan') return;
                            if(typeof current.getParent != 'function') break;
                            var parent = current.getParent();
                            if(!parent || parent == current) break;
                            current = parent;
                            guard++;
                        }
                        var id = source.storage.fangGuanSource;
                        var otto = game.players.find(function(current) {
                            return current.playerid == id;
                        });
                        if(!otto || !otto.isIn() || target != otto) {
                            return false;
                        }
                    },
                        },
                        "onremove": function(player) {
                    delete player.storage.fangGuan;
                    delete player.storage.fangGuanSource;
                    player.syncStorage('fangGuanSource');
                },
                        "subSkill": {
                            "gongJiJieShu": {
                                "trigger": {
                                    "global": "gongJiEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event || !event.player ||
                                event.player.countZhiShiWu('fangGuan') == 0 ||
                                event.yingZhan == true) return false;
                            var phase = event.getParent &&
                                event.getParent('xingDong');
                            return !!phase &&
                                phase.name == 'xingDong' &&
                                phase.player == event.player;
                        },
                                "content": async function(event, trigger, player) {
                            var holder = trigger.player;
                            var count = holder.countZhiShiWu('fangGuan');
                            if(count > 0) {
                                await holder.removeZhiShiWu(
                                    'fangGuan',
                                    count
                                );
                            }
                            delete holder.storage.fangGuanSource;
                            holder.syncStorage('fangGuanSource');
                        },
                            },
                            "xingDongJieShu": {
                                "trigger": {
                                    "global": "xingDongEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                !!event.player &&
                                event.player.countZhiShiWu('fangGuan') > 0;
                        },
                                "content": async function(event, trigger, player) {
                            var holder = trigger.player;
                            var id = holder.storage.fangGuanSource;
                            var source = game.players.find(function(current) {
                                return current.playerid == id;
                            });
                            if(holder.isIn()) {
                                if(source && source.isIn()) {
                                    await holder.faShuDamage(2, source);
                                } else {
                                    await holder.faShuDamage(2, 'nosource');
                                }
                            }
                            var count = holder.countZhiShiWu('fangGuan');
                            if(count > 0) {
                                await holder.removeZhiShiWu(
                                    'fangGuan',
                                    count
                                );
                            }
                            delete holder.storage.fangGuanSource;
                            holder.syncStorage('fangGuanSource');
                        },
                            },
                        },
                    },
                    "baiYinWanQiZhuangTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "温",
                        "intro": {
                            "name": "白银晚期",
                            "content": "造成和承受的伤害额外+1，不能获得【红温】；持续到下个行动阶段结束。",
                        },
                        "group": [
                            "baiYinWanQiZhuangTai_zaoCheng",
                            "baiYinWanQiZhuangTai_chengShou",
                            "baiYinWanQiZhuangTai_jinZhiHongWen",
                            "baiYinWanQiZhuangTai_qingChu",
                        ],
                        "onremove": function(player) {
                    delete player.storage.baiYinWanQiSkipCurrent;
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
                            "jinZhiHongWen": {
                                "trigger": {
                                    "player": "changeZhiShiWuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.zhiShiWu == 'hongWen' &&
                                event.num > 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.num = 0;
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "xingDongEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "content": async function(event, trigger, player) {
                            if(player.storage.baiYinWanQiSkipCurrent) {
                                player.storage.baiYinWanQiSkipCurrent = false;
                                return;
                            }
                            await player.chongZhi();
                            player.removeSkill('baiYinWanQiZhuangTai');
                        },
                            },
                        },
                    },
                    "suanFaTuiJian": {
                        "playAudio": function(file, player) {
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_speak) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, 'ext:电啸龙吟/audio/skill/yongChuTaFei/' +
                        file + '.mp3', player);
                },
                        "hotSkill": function(type) {
                    return {
                        gongJi: 'gongJiReBang',
                        faShu: 'faShuReBang',
                        teShu: 'teShuReBang',
                    }[type];
                },
                        "eventActionType": function(event, triggername) {
                    if(!event) return null;
                    var name=triggername || event.triggername;
                    if(name=='gongJiEnd') return 'gongJi';
                    if(name=='faShuEnd') return 'faShu';
                    if(name=='teShuEnd') return 'teShu';
                    name=event.name;
                    if(name=='gongJi'||name=='gongJiEnd') return 'gongJi';
                    if(name=='faShu'||name=='faShuEnd') return 'faShu';
                    if(name=='teShu'||name=='teShuEnd') return 'teShu';
                    return null;
                },
                        "isCompletedAction": function(event, triggername) {
                    if(!event || !event.player) return false;
                    var type=lib.skill.suanFaTuiJian
                        .eventActionType(event, triggername);
                    if(type=='gongJi' &&
                        event.yingZhan == true) {
                        return false;
                    }
                    if(type=='teShu') return true;
                    return !!type&&_status.currentPhase==event.player;
                },
                        "actionType": function(event, triggername) {
                    return lib.skill.suanFaTuiJian
                        .eventActionType(event, triggername);
                },
                        "setHot": async function(player, type) {
                    var old = player.storage.yongChuTaFeiReBang;
                    var oldSkill = lib.skill.suanFaTuiJian.hotSkill(old);
                    if(oldSkill && player.countZhiShiWu(oldSkill) > 0) {
                        await player.removeZhiShiWu(
                            oldSkill,
                            player.countZhiShiWu(oldSkill)
                        );
                    }
                    player.storage.yongChuTaFeiReBang = type;
                    player.syncStorage('yongChuTaFeiReBang');
                    var skill = lib.skill.suanFaTuiJian.hotSkill(type);
                    if(skill) await player.addZhiShiWu(skill, 1, true);
                },
                        "clearHot": async function(player) {
                    var old = player.storage.yongChuTaFeiReBang;
                    var skill = lib.skill.suanFaTuiJian.hotSkill(old);
                    if(skill && player.countZhiShiWu(skill) > 0) {
                        await player.removeZhiShiWu(
                            skill,
                            player.countZhiShiWu(skill)
                        );
                    }
                    delete player.storage.yongChuTaFeiReBang;
                    player.syncStorage('yongChuTaFeiReBang');
                },
                        "trigger": {
                            "global": "phaseEnd",
                        },
                        "forced": true,
                        "priority": 10,
                        "filter": function(event, player) {
                    return !!event.player &&
                        !!event.player.storage.yongChuTaFeiLastAction;
                },
                        "content": async function(event, trigger, player) {
                    var actor = trigger.player;
                    var type = actor.storage.yongChuTaFeiLastAction;
                    var hot = player.storage.yongChuTaFeiReBang;
                    if(!hot) {
                        await lib.skill.suanFaTuiJian.setHot(player, type);
                        return;
                    }
                    if(hot != type) {
                        if(actor != player &&
                            player.countZhiShiWu(
                                'yongChuTaFeiLiuLiang'
                            ) >= 3) {
                            player.logSkill('guanZhuTaFeiMiao', actor);
                            lib.skill.suanFaTuiJian.playAudio(
                                'guanZhuTaFeiMiao', player
                            );
                            await actor.faShuDamage(2, player);
                        } else {
                            await lib.skill.suanFaTuiJian.setHot(
                                player,
                                type
                            );
                        }
                        return;
                    }
                    if(actor != player) {
                        await player.addZhiShiWu(
                            'yongChuTaFeiLiuLiang',
                            1
                        );
                        await actor.changeZhiLiao(1, player);
                    }
                },
                        "group": [
                            "suanFaTuiJian_jiLuGongJi",
                            "suanFaTuiJian_jiLuFaShu",
                            "suanFaTuiJian_jiLuTeShu",
                            "suanFaTuiJian_chongZhi",
                            "suanFaTuiJian_kaiJu",
                            "suanFaTuiJian_liuLiangYinXiao",
                        ],
                        "subSkill": {
                            "jiLuGongJi": {
                                "trigger": {
                                    "global": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event.player&&
                                event.player==_status.currentPhase&&
                                event.yingZhan!=true;
                        },
                                "content": function(event, trigger, player) {
                            trigger.player.storage
                                .yongChuTaFeiLastAction='gongJi';
                            trigger.player.syncStorage(
                                'yongChuTaFeiLastAction'
                            );
                        },
                            },
                            "jiLuFaShu": {
                                "trigger": {
                                    "global": "faShuEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "filter": function(event,player){
                            return !!event.player&&
                                event.player==_status.currentPhase;
                        },
                                "content": function(event,trigger,player){
                            trigger.player.storage
                                .yongChuTaFeiLastAction='faShu';
                            trigger.player.syncStorage(
                                'yongChuTaFeiLastAction'
                            );
                        },
                            },
                            "jiLuTeShu": {
                                "trigger": {
                                    "global": "teShuEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "filter": function(event,player){
                            return !!event.player;
                        },
                                "content": function(event,trigger,player){
                            trigger.player.storage
                                .yongChuTaFeiLastAction='teShu';
                            trigger.player.syncStorage(
                                'yongChuTaFeiLastAction'
                            );
                        },
                            },
                            "chongZhi": {
                                "trigger": {
                                    "global": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            delete trigger.player.storage
                                .yongChuTaFeiLastAction;
                            trigger.player.syncStorage(
                                'yongChuTaFeiLastAction'
                            );
                        },
                            },
                            "kaiJu": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": async function(event, trigger, player) {
                            await lib.skill.suanFaTuiJian
                                .clearHot(player);
                        },
                            },
                            "liuLiangYinXiao": {
                                "trigger": {
                                    "player": "changeZhiShiWuAfter",
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!event &&
                                event.zhiShiWu ==
                                    'yongChuTaFeiLiuLiang' &&
                                event.num > 0 &&
                                player.countZhiShiWu(
                                    'yongChuTaFeiLiuLiang'
                                ) == 3;
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.suanFaTuiJian.playAudio(
                                'suanFaTuiJian', player
                            );
                        },
                            },
                        },
                    },
                    "guoQiZhuBao": {
                        "trigger": {
                            "player": "phaseEnd",
                        },
                        "forced": true,
                        "priority": -10,
                        "filter": function(event, player) {
                    return player.countZhiShiWu(
                        'yongChuTaFeiLiuLiang'
                    ) > 0;
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.suanFaTuiJian.playAudio('guoQiZhuBao', player);
                    await player.removeZhiShiWu(
                        'yongChuTaFeiLiuLiang',
                        1
                    );
                    await player.changeZhiLiao(1, player);
                },
                    },
                    "guanZhuTaFeiMiao": {
                        "charlotte": true,
                    },
                    "qianShiHeiTaoYing": {
                        "findYingZhan": function(event) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 12) {
                        if(current.name == 'yingZhan') return current;
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return null;
                },
                        "isDirectResponseToActiveAttack": function(yingZhan, player) {
                    if(!yingZhan || yingZhan.source != player) return false;
                    var parent = typeof yingZhan.getParent == 'function' ?
                        yingZhan.getParent() : null;
                    return !!parent && parent.yingZhan != true;
                },
                        "findBoundAttack": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 16) {
                        if(current.qianShiHeiTaoYingOwner ==
                            player.playerid) return current;
                        if(current.type=='gongJi'||
                            (current.name=='useCard'&&current.card&&
                                get.type(current.card)=='gongJi')){
                            return null;
                        }
                        if(typeof current.getParent != 'function') break;
                        var parent = current.getParent();
                        if(!parent || parent == current) break;
                        current = parent;
                        guard++;
                    }
                    return null;
                },
                        "group": [
                            "qianShiHeiTaoYing_bangDing",
                            "qianShiHeiTaoYing_mingZhong",
                            "qianShiHeiTaoYing_weiMingZhong",
                            "qianShiHeiTaoYing_zhuanYi",
                        ],
                        "subSkill": {
                            "bangDing": {
                                "trigger": {
                                    "global": "gongJiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event || event.yingZhan != true) return false;
                            var yingZhan = lib.skill.qianShiHeiTaoYing
                                .findYingZhan(event);
                            return lib.skill.qianShiHeiTaoYing
                                .isDirectResponseToActiveAttack(
                                    yingZhan,
                                    player
                                );
                        },
                                "content": async function(event, trigger, player) {
                            trigger.qianShiHeiTaoYingOwner =
                                player.playerid;
                            if(trigger.target && trigger.target.isIn()) {
                                await trigger.target.changeZhiLiao(
                                    1,
                                    player
                                );
                            }
                        },
                            },
                            "mingZhong": {
                                "trigger": {
                                    "global": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!lib.skill.qianShiHeiTaoYing
                                .findBoundAttack(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            lib.skill.suanFaTuiJian.playAudio(
                                'qianShiHeiTaoYing', player
                            );
                            await player.addZhiShiWu(
                                'yongChuTaFeiLiuLiang',
                                1
                            );
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "global": "gongJiEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !event.gongJiMingZhong &&
                                !!lib.skill.qianShiHeiTaoYing
                                    .findBoundAttack(event, player);
                        },
                                "content": async function(event, trigger, player) {
                            await player.changeZhiLiao(1, player);
                        },
                            },
                            "zhuanYi": {
                                "trigger": {
                                    "global": "chengShouShangHai",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                            if(!event || event.faShu == true ||
                                event.player == player ||
                                event.qianShiHeiTaoYingTransfer ||
                                !(event.num > 0)) {
                                return false;
                            }
                            var attack=lib.skill.qianShiHeiTaoYing
                                .findBoundAttack(event,player);
                            return !!attack&&event.player==attack.target&&
                                (!event.source||event.source==attack.player);
                        },
                                "content": async function(event, trigger, player) {
                            var num = Math.max(0, trigger.num || 0);
                            var source = trigger.source;
                            trigger.num = 0;
                            if(num > 0 && player.isIn()) {
                                await player.damage(num, source)
                                    .set('step', 6)
                                    .set(
                                        'qianShiHeiTaoYingTransfer',
                                        true
                                    );
                            }
                        },
                            },
                        },
                    },
                    "qianShiYiBaoShuTiaoXiXi": {
                        "trigger": {
                            "player": "phaseBegin",
                        },
                        "filter": function(event, player) {
                    return player.countZhiShiWu(
                        'yongChuTaFeiLiuLiang'
                    ) > 0 &&
                        player.countCards('h') > 0;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseCard(
                        'h',
                        1,
                        '【前世·一包薯条嘻嘻】：移除1【流量】，将1张手牌面朝下置于角色旁作为【薯条】'
                    ).set('ai', function(card) {
                        return 6 - get.value(card);
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.suanFaTuiJian.playAudio(
                        'qianShiYiBaoShuTiaoXiXi', player
                    );
                    await player.removeZhiShiWu(
                        'yongChuTaFeiLiuLiang',
                        1
                    );
                    await player.loseToSpecial(
                        event.cards,
                        'yongChuTaFeiShuTiao',
                        player
                    );
                    player.markSkill('yongChuTaFeiShuTiao');
                },
                    },
                    "yongChuTaFeiShuTiao": {
                        "markimage": "extension/电啸龙吟/mark_taFeiShuTiao.png",
                        "intro": {
                            "name": "薯条",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getCards('s', function(card) {
                            return card.hasGaintag && card.hasGaintag(
                                'yongChuTaFeiShuTiao'
                            );
                        });
                        if(!cards.length) return;
                        if(player.isUnderControl(true)) {
                            dialog.addAuto(cards);
                        } else {
                            return '共有' + cards.length + '张牌';
                        }
                    },
                            "markcount": function(storage, player) {
                        return player.getCards('s', function(card) {
                            return card.hasGaintag && card.hasGaintag(
                                'yongChuTaFeiShuTiao'
                            );
                        }).length;
                    },
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getCards('s', function(card) {
                        return card.hasGaintag && card.hasGaintag(skill);
                    });
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                    },
                    "yuanShengYao": {
                        "trigger": {
                            "global": [
                                "gongJiEnd",
                                "faShuEnd",
                                "teShuEnd",
                            ],
                        },
                        "filter": function(event, player, triggername) {
                    return !!event && event.player == player &&
                        lib.skill.suanFaTuiJian
                        .isCompletedAction(event, triggername) &&
                        player.storage.yongChuTaFeiReBang ==
                            lib.skill.suanFaTuiJian.actionType(
                                event,
                                triggername
                            ) &&
                        player.countZhiShiWu(
                            'yongChuTaFeiLiuLiang'
                        ) >= 3 &&
                        player.canBiShaShuiJing();
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否发动【原生摇】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        if(lib.skill._heCheng &&
                            lib.skill._heCheng.filter(
                                _status.event,
                                player
                            ) && (get.shiQi(!player.side) <= 1 ||
                                get.xingBei(player.side) + 1 >=
                                    game.xingBeiMax)) {
                            return false;
                        }
                        var overflow = Math.max(0,
                            player.countCards('h') + 1 -
                            player.getHandcardLimit());
                        if(overflow >= get.shiQi(player.side)) return false;
                        return overflow <= 1;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    var phase = trigger.getParent &&
                        trigger.getParent('phase');
                    lib.skill.suanFaTuiJian.playAudio('yuanShengYao', player);
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu(
                        'yongChuTaFeiLiuLiang',
                        3
                    );
                    await player.draw(1);
                    await lib.skill.suanFaTuiJian.clearHot(player);
                    player.storage.yongChuTaFeiExtraTurn = true;
                    player.insertPhase('yuanShengYao', true);
                    if(phase && phase.player == player) phase.finish();
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "yongChuTaFeiLiuLiang": {
                        "intro": {
                            "name": "流量",
                            "content": "mark",
                            "max": 3,
                        },
                        "onremove": "storage",
                        "markimage": "extension/电啸龙吟/mark_taFeiLiuLiang.png",
                    },
                    "gongJiReBang": {
                        "charlotte": true,
                        "intro": {
                            "name": "攻击热榜",
                            "content": "当前【热榜】为【攻击行动】。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_gongJiReBang.png",
                    },
                    "faShuReBang": {
                        "charlotte": true,
                        "intro": {
                            "name": "法术热榜",
                            "content": "当前【热榜】为【法术行动】。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_faShuReBang.png",
                    },
                    "teShuReBang": {
                        "charlotte": true,
                        "intro": {
                            "name": "特殊热榜",
                            "content": "当前【热榜】为【特殊行动】。",
                            "max": 1,
                        },
                        "markimage": "extension/电啸龙吟/mark_teShuReBang.png",
                    },
                },
                "translate": {
                    "hongWen": "红温",
                    "hongWen_info": "电棍Otto的专属指示物，上限为3。",
                    "baiYinWanQi": "被动【白银晚期】",
                    "baiYinWanQi_info": "<span class='tiaoJian'>（承受实际伤害后⑤）</span>+1<span class='hong'>【红温】</span>。<br><span class='tiaoJian'>（</span><span class='hong'>【红温】</span><span class='tiaoJian'>达到上限时）</span>移除全部<span class='hong'>【红温】</span>并【横置】，进入【白银晚期】状态：你造成和承受的伤害额外+1，且不能获得<span class='hong'>【红温】</span>。<span class='tiaoJian'>（下个行动阶段结束）</span>【重置】。",
                    "baiYinWanQiZhuangTai": "白银晚期",
                    "baiYinWanQiZhuangTai_info": "你造成和承受的伤害额外+1；你不能获得<span class='hong'>【红温】</span>。持续到你的下个行动阶段结束。",
                    "shuaiOttoShuai": "响应【帅otto帅】",
                    "shuaiOttoShuai_info": "<span class='tiaoJian'>（主动攻击前①）</span>对自己造成1点法术伤害③，本次攻击伤害额外+2。",
                    "zunNiHuoJia": "法术【尊尼获加】",
                    "zunNiHuoJia_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>对1名目标对手施加【房管】。",
                    "fangGuan": "专属【房管】",
                    "fangGuan_info": "持有者下个行动阶段内主动攻击只能以电棍Otto为目标，该【攻击行动】结束后移除。<span class='tiaoJian'>（其行动阶段结束时）</span>若【房管】仍存在，电棍Otto对其造成2点法术伤害③，移除此卡。",
                    "dianGunShengJing": "响应【电棍圣经】",
                    "dianGunShengJing_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（【白银晚期】下，因承受伤害导致士气下降时）</span>对目标对手造成X点法术伤害③，对其他所有对手各造成1点法术伤害③，然后【重置】，X为本次士气下降数。",
                    "woShiNaiLong": "被动【我是奶龙】",
                    "woShiNaiLong_info": "<span class='tiaoJian'>（目标角色因你的技能弃牌后）</span>该角色+1【治疗】；<br><span class='tiaoJian'>（你的攻击命中后②）</span>令1名队友弃置1张手牌。",
                    "buShiZhuangTangShiZhenTang": "响应【不是装唐，是真唐】",
                    "buShiZhuangTangShiZhenTang_info": "<span class='tiaoJian'>（成为其他角色攻击的目标时①）</span>摸1张牌【强制】并展示：<span class='tiaoJian'>（若与本次攻击同系）</span>保留该牌且本次攻击无法应战；否则弃置该牌，本次攻击伤害-1。",
                    "naiLongDaXiao": "启动【奶龙大笑】",
                    "naiLongDaXiao_info": "<span class='lan'>【水晶】</span>从你开始，每名角色按座次依次弃置1张手牌。",
                    "suanFaTuiJian": "被动【算法推荐】",
                    "suanFaTuiJian_info": "游戏开始时没有【热榜】。<span class='tiaoJian'>（角色回合结束时）</span>记录其本回合最后完成的行动类型：<span class='tiaoJian'>（没有【热榜】或类型不同时）</span>放置或替换为对应【热榜】；<span class='tiaoJian'>（类型相同且该角色不是你时）</span>你+1<span style=\"color:#B33D75\">【流量】</span>，其+1【治疗】。",
                    "guoQiZhuBao": "被动【过气主包】",
                    "guoQiZhuBao_info": "<span class='tiaoJian'>（回合结束时，若</span><span style=\"color:#B33D75\">【流量】</span><span class='tiaoJian'>＞0）</span>移除1点，你+1【治疗】。",
                    "guanZhuTaFeiMiao": "被动【关注塔菲喵】",
                    "guanZhuTaFeiMiao_info": "<span class='tiaoJian'>（拥有3</span><span style=\"color:#B33D75\">【流量】</span><span class='tiaoJian'>时，其他角色回合结束后）</span>若其最后完成的行动类型与【热榜】不同，不替换【热榜】，改为对其造成2点法术伤害③。",
                    "qianShiHeiTaoYing": "被动【前世·黑桃影】",
                    "qianShiHeiTaoYing_info": "<span class='tiaoJian'>（你的主动攻击被成功应战时）</span>应战攻击的目标+1【治疗】。<span class='tiaoJian'>（本次应战攻击命中时）</span>其实际伤害由你承受，你+1<span style=\"color:#B33D75\">【流量】</span>；<span class='tiaoJian'>（未命中时）</span>你+1【治疗】。",
                    "qianShiYiBaoShuTiaoXiXi": "响应【前世·一包薯条嘻嘻】",
                    "qianShiYiBaoShuTiaoXiXi_info": "<span class='tiaoJian'>（你的回合开始时）</span>移除1<span style=\"color:#B33D75\">【流量】</span>，将1张手牌面朝下置于角色旁，作为【薯条】。你可以将【薯条】如手牌般打出或使用。",
                    "yuanShengYao": "响应【原生摇】",
                    "yuanShengYao_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（拥有3</span><span style=\"color:#B33D75\">【流量】</span><span class='tiaoJian'>时，完整结算1个与【热榜】同类型的合法行动后，移除3</span><span style=\"color:#B33D75\">【流量】</span><span class='tiaoJian'>）</span>摸1张牌【强制】，移除【热榜】，结束当前回合并立即开始1个新的完整回合。",
                    "yongChuTaFeiLiuLiang": "流量",
                    "yongChuTaFeiLiuLiang_info": "永雏塔菲的专属指示物，上限为3。",
                    "gongJiReBang": "专属【攻击热榜】",
                    "gongJiReBang_info": "记录【攻击行动】；3种【热榜】合计上限为1。",
                    "faShuReBang": "专属【法术热榜】",
                    "faShuReBang_info": "记录【法术行动】；3种【热榜】合计上限为1。",
                    "teShuReBang": "专属【特殊热榜】",
                    "teShuReBang_info": "记录【特殊行动】；3种【热榜】合计上限为1。",
                    "yongChuTaFeiShuTiao": "专属【薯条】",
                    "yongChuTaFeiShuTiao_info": "永雏塔菲的专属牌，面朝下置于角色旁且仅自己可见。",
                },
            },
            "intro": "添加角色奶龙、电棍Otto、永雏塔菲。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "1.5",
        },
        "files": {
            "character": [
                "naiLong.jpg",
                "otto.jpg",
                "yongChuTaFei.jpg",
            ],
            "card": [],
            "skill": [
                "mark_hongWen.png",
                "mark_fangGuan.png",
                "mark_taFeiLiuLiang.png",
                "mark_taFeiShuTiao.png",
                "mark_gongJiReBang.png",
                "mark_faShuReBang.png",
                "mark_teShuReBang.png",
            ],
            "audio": [
                "audio/skill/dianGunOtto/baiYinWanQi.mp3",
                "audio/skill/dianGunOtto/shuaiOttoShuai.mp3",
                "audio/skill/dianGunOtto/zunNiHuoJia.mp3",
                "audio/skill/dianGunOtto/dianGunShengJing.mp3",
                "audio/action/dianGunOtto/gouMai.mp3",
                "audio/action/dianGunOtto/heCheng.mp3",
                "audio/action/dianGunOtto/tiLian.mp3",
                "audio/skill/naiLong/woShiNaiLong.mp3",
                "audio/skill/naiLong/buShiZhuangTangShiZhenTang.mp3",
                "audio/skill/naiLong/naiLongDaXiao.mp3",
                "audio/action/naiLong/gouMai.mp3",
                "audio/action/naiLong/heCheng.mp3",
                "audio/action/naiLong/tiLian.mp3",
                "audio/skill/yongChuTaFei/suanFaTuiJian.mp3",
                "audio/skill/yongChuTaFei/guoQiZhuBao.mp3",
                "audio/skill/yongChuTaFei/guanZhuTaFeiMiao.mp3",
                "audio/skill/yongChuTaFei/qianShiHeiTaoYing.mp3",
                "audio/skill/yongChuTaFei/qianShiYiBaoShuTiaoXiXi.mp3",
                "audio/skill/yongChuTaFei/yuanShengYao.mp3",
                "audio/action/yongChuTaFei/gouMai.mp3",
                "audio/action/yongChuTaFei/heCheng.mp3",
                "audio/action/yongChuTaFei/tiLian.mp3",
                "audio/skill/naiLong/woShiNaiLong.mp3",
                "audio/skill/naiLong/buShiZhuangTangShiZhenTang.mp3",
                "audio/skill/naiLong/naiLongDaXiao.mp3",
                "audio/action/naiLong/gouMai.mp3",
                "audio/action/naiLong/heCheng.mp3",
                "audio/action/naiLong/tiLian.mp3",
            ],
        },
        "connect": true,
    };
});
