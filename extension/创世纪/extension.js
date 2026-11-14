game.import("extension", function(lib, game, ui, get, ai, _status) {
    // 临时效果牌：创建时不带destroyed标记；必须在效果结算(挂到目标面前)完成后再打标记，
    // 否则addToExpansion会把带destroyed的牌从结算中剔除，导致效果不触发。
    lib.chuangShiJiUseTemporaryEffectCard = async function(player, name, target, nolog) {
        const card = game.createCard(name);
        await player.useCard(card, target, nolog);
        card.destroyed = 'discardPile';
        return card;
    };
    var extension = {
        "name": "创世纪",
        "arenaReady": function(){

},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            var actionAudioSkill = 'chuangShiJi_luMiYaActionAudio';
            if(!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    trigger: { player: ['gouMai', 'heCheng', 'tiLian'] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function(event, player) {
                        return [
                            'luMiYa',
                            'baiHuaLiaoLuan',
                            'beiyanadopushen',
                            'tianQiZhe',
                            'yuXueMoShen',
                            'xiLuFei',
                        ].some(function(id) {
                            return player.name == id ||
                                player.name1 == id ||
                                player.name2 == id;
                        });
                    },
                    content: function(event, trigger, player) {
                        var action = event.triggername ||
                            (trigger && trigger.name);
                        if(!['gouMai', 'heCheng', 'tiLian']
                            .includes(action)) return;
                        var character = [
                            'luMiYa',
                            'baiHuaLiaoLuan',
                            'beiyanadopushen',
                            'tianQiZhe',
                            'yuXueMoShen',
                            'xiLuFei',
                        ].find(function(id) {
                            return player.name == id ||
                                player.name1 == id ||
                                player.name2 == id;
                        });
                        if(!character) return;
                        var path = 'ext:创世纪/audio/action/' + character +
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
            var proto = lib.element && lib.element.Player &&
                lib.element.Player.prototype;
            if(!proto ||
                proto._tianQiZheBaoShiPatchedVersion == '1.9') return;
            proto._tianQiZheBaoShiPatched = true;
            proto._tianQiZheBaoShiPatchedVersion = '1.9';
            if(!proto._tianQiZheOriginalCanBiShaShuiJing) {
                proto._tianQiZheOriginalCanBiShaShuiJing =
                    proto.canBiShaShuiJing;
            }
            if(!proto._tianQiZheOriginalRemoveBiShaShuiJing) {
                proto._tianQiZheOriginalRemoveBiShaShuiJing =
                    proto.removeBiShaShuiJing;
            }
            if(!proto._tianQiZheOriginalCanBiShaBaoShi) {
                proto._tianQiZheOriginalCanBiShaBaoShi =
                    proto.canBiShaBaoShi;
            }
            if(!proto._tianQiZheOriginalRemoveBiShaBaoShi) {
                proto._tianQiZheOriginalRemoveBiShaBaoShi =
                    proto.removeBiShaBaoShi;
            }
            proto.canBiShaBaoShi = function() {
                if(proto._tianQiZheOriginalCanBiShaBaoShi.call(this)) {
                    return true;
                }
                return this.getExpansions(
                    'tianQiZheTianShiZhuFu'
                ).length > 0;
            };
            proto.canBiShaShuiJing = function() {
                return proto._tianQiZheOriginalCanBiShaShuiJing
                    .call(this) || this.getExpansions(
                        'tianQiZheTianShiZhuFu'
                    ).length > 0;
            };
            proto.removeBiShaBaoShi = function() {
                var player = this;
                var hasBlessing =
                    player.getExpansions(
                        'tianQiZheTianShiZhuFu'
                    ).length > 0;
                if(!hasBlessing) {
                    return proto._tianQiZheOriginalRemoveBiShaBaoShi
                        .call(player);
                }
                var next = game.createEvent(
                    'tianShiZhuFuPay',
                    false
                );
                next.player = player;
                next.setContent(async function(event, trigger, player) {
                    var useBlessing = !!player._tianQiZheForceBlessingPay ||
                        !player.hasNengLiang('baoShi');
                    if(!useBlessing) {
                        var control = await player.chooseControl([
                            '支付1【宝石】',
                            '发动【天使祝福】',
                        ]).set(
                            'prompt',
                            '请选择本次1【宝石】费用的支付方式'
                        ).set('ai', function() {
                            var player = _status.event.player;
                            var cards = player.getExpansions(
                                'tianQiZheTianShiZhuFu'
                            );
                            var expires = cards.some(function(card) {
                                return card.storage &&
                                    card.storage.tianQiZhiZhuToken;
                            });
                            return expires ||
                                player.countNengLiang('baoShi') <= 1 ?
                                '发动【天使祝福】' : '支付1【宝石】';
                        }).forResultControl();
                        useBlessing =
                            control == '发动【天使祝福】';
                    }
                    if(!useBlessing) {
                        await proto
                            ._tianQiZheOriginalRemoveBiShaBaoShi
                            .call(player);
                        return;
                    }
                    player.logSkill('tianQiZheTianShiZhuFu');
                    lib.skill.tianQiZheZhuFuManager.recordTrigger(
                        player,
                        'tianQiZheTianShiZhuFu'
                    );
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'tianQiZheTianShiZhuFu'
                    );
                    game.log(
                        player,
                        '以【天使祝福】视为支付了1个',
                        '#g【宝石】'
                    );
                });
                return next;
            };
            proto.removeBiShaShuiJing = function() {
                var player = this;
                if(!player.getExpansions(
                    'tianQiZheTianShiZhuFu'
                ).length) {
                    return proto._tianQiZheOriginalRemoveBiShaShuiJing
                        .call(player);
                }
                var next = game.createEvent('tianShiZhuFuPayShuiJing', false);
                next.player = player;
                next.setContent(async function(event, trigger, player) {
                    var useBlessing = !proto
                        ._tianQiZheOriginalCanBiShaShuiJing.call(player);
                    if(!useBlessing) {
                        var control = await player.chooseControl([
                            '按原规则支付1【水晶】',
                            '发动【天使祝福】',
                        ]).set('prompt', '请选择本次1【水晶】费用的支付方式')
                            .set('ai', function() {
                                var player = _status.event.player;
                                var cards = player.getExpansions(
                                    'tianQiZheTianShiZhuFu'
                                );
                                var expires = cards.some(function(card) {
                                    return card.storage &&
                                        card.storage.tianQiZhiZhuToken;
                                });
                                return expires ||
                                    !player.hasNengLiang('shuiJing') ?
                                    '发动【天使祝福】' :
                                    '按原规则支付1【水晶】';
                            }).forResultControl();
                        useBlessing = control == '发动【天使祝福】';
                    }
                    if(useBlessing) {
                        player._tianQiZheForceBlessingPay = true;
                        try {
                            await proto.removeBiShaBaoShi.call(player);
                        } finally {
                            delete player._tianQiZheForceBlessingPay;
                        }
                    } else {
                        await proto._tianQiZheOriginalRemoveBiShaShuiJing
                            .call(player);
                    }
                });
                return next;
            };
},
        "help": {},
        "config": {},
        "package": {
            "character": {
                "connect": true,
                "character": {
                    "beiyanadopushen": [
                        null,
                        "huanGroup",
                        4.5,
                        [
                            "moFaHuDun",
                            "xuanWenShengCheng",
                            "ziDongXuanWen",
                            "xuanWenFaShe",
                            "huangLongYanYue",
                            "bianShenBeiYaNa",
                            "xuanWenQiangYa",
                            "xuanWen",
                        ],
                        [
                            "des:以泰拉科技重塑自身的贝亚娜斗神，兼具贤者智慧与战神之力。她收集多系炫纹强化攻势，并在变身后以暗之力量压制全场。",
                            "ext:创世纪/beiyanadopushen.webp",
                            "die:ext:创世纪/audio/die/beiyanadopushen.mp3",
                        ],
                    ],
                    "baiHuaLiaoLuan": [
                        null,
                        "yongGroup",
                        5,
                        [
                            "nianQiHuanRao",
                            "guangZhiQinHe",
                            "nianQiBo",
                            "nianQiZhao",
                            "nianZhiAoYi",
                            "nianQi",
                        ],
                        [
                            "des:以念气淬炼身心的气功宗师，拳掌之间亦有守护之意。她在法术与援护中积蓄念气，并以念之奥义连续施展法术。",
                            "ext:创世纪/baiHuaLiaoLuan.webp",
                        ],
                    ],
                    "luMiYa": [
                        null,
                        "yongGroup",
                        5,
                        [
                            "faMiLiErShiYanShi",
                            "luMiYaShiYan",
                            "xingYunBangBangTang",
                            "gaiLiangMoFaXingDan",
                            "saoBaZhangWo",
                            "xuanZhuanSaoBa",
                            "rongYanYaoPing",
                            "suanYuYun",
                            "dianManPengZhuangJi",
                            "fanZhongLiZhuangZhi",
                            "jiYiRongHe",
                            "shiYanCaiLiao",
                            "luMiYaYanJiu",
                        ],
                        [
                            "des:沉迷危险实验的魔道学者，把每份材料都视作新发现的起点。她以研究修正随机结果，在魔弹、扫把、药剂与装置之间灵活应变。",
                            "ext:创世纪/luMiYa.webp",
                        ],
                    ],
                    "xiLuFei": [
                        null,
                        "yongGroup",
                        4,
                        [
                            "xiLuFeiShengLingFuWen",
                            "xiLuFeiJieKeBaoDan",
                            "xiLuFeiBingShuangXueRen",
                            "xiLuFeiGuangDianMan",
                            "xiLuFeiAnYingYeMao",
                            "xiLuFeiMoFaXiu",
                            "xiLuFeiYuanSuZhiMen",
                            "xiLuFeiDiLiuYuanSu",
                            "xiLuFeiFaShuCounter",
                            "xiLuFeiHuoZhiFuWen",
                            "xiLuFeiShuiZhiFuWen",
                            "xiLuFeiGuangZhiFuWen",
                            "xiLuFeiAnZhiFuWen",
                        ],
                        [
                            "des:以火、水、光、暗四枚圣灵符文切换元素法术的希露菲。点亮符文后施展对应高阶法术，并以魔法秀延续攻势。",
                            "ext:创世纪/xiLuFei.webp",
                        ],
                    ],
                    "tianQiZhe": [
                        null,
                        "shengGroup",
                        5,
                        [
                            "shouHuEnCi",
                            "lingHunXiSheng",
                            "guangZhiFuChou",
                            "tianQiZheZhuFu",
                            "shengYuZhiFeng",
                            "tianQiZhiZhu",
                            "tianQiZheZhuFuManager",
                            "rongYuZhuFu_description",
                            "shouHuHuiZhang_description",
                            "wuQiZhuFu_description",
                            "tianQiZheTianShiZhuFu_description",
                        ],
                        [
                            "des:聆听神谕的圣职者，以治疗与祝福庇护同伴。她将四重恩赐分予队友，并借天启之珠把被触发的祝福化作最终审判。",
                            "ext:创世纪/tianQiZhe.webp",
                        ],
                    ],
                    "yuXueMoShen": [
                        null,
                        "xueGroup",
                        5,
                        [
                            "xueQiWangSheng",
                            "xueQiHuanXing",
                            "shiHunZhiShou",
                            "shiHunFengMoZhan",
                            "siWangKangJu",
                            "bengShanLieDiZhan",
                            "moYuXueSha",
                            "yuXueMoShenXueQi",
                        ],
                        [
                            "des:主动解开鬼神束缚的浴血狂战，让伤痛化作沸腾血气。他以嗜血追击压迫战场，并将积蓄的力量凝为魔剑，宣告狱血魔神降临。",
                            "ext:创世纪/yuXueMoShen.webp",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "创世纪": "创世纪",
                    "beiyanadopushen": "贝亚娜斗神",
                    "baiHuaLiaoLuan": "百花缭乱",
                    "luMiYa": "露米娅",
                    "xiLuFei": "希露菲",
                    "tianQiZhe": "天启者",
                    "yuXueMoShen": "狱血魔神",
                },
            },
            "card": {
                "card": {
                    "tianQiZheRongYuZhuFuKa": {
                        "hidden": true,
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_rongYuZhuFu.webp",
                    },
                    "tianQiZheShouHuHuiZhangKa": {
                        "hidden": true,
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_shouHuHuiZhang.webp",
                    },
                    "tianQiZheWuQiZhuFuKa": {
                        "hidden": true,
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_wuQiZhuFu.webp",
                    },
                    "tianQiZheTianShiZhuFuKa": {
                        "hidden": true,
                        "type": "special",
                        "enable": false,
                        "fullskin": true,
                        "image": "ext:创世纪/mark_tianShiZhuFu.webp",
                    },
                },
                "translate": {
                    "tianQiZheRongYuZhuFuKa": "专属【荣誉祝福】",
                    "tianQiZheRongYuZhuFuKa_info": "<span class='greentext'>被动【荣誉祝福】</span><br><span class='tiaoJian'>（拥有者造成法术伤害时③）</span>移除此卡，本次伤害+1。",
                    "tianQiZheShouHuHuiZhangKa": "专属【守护徽章】",
                    "tianQiZheShouHuHuiZhangKa_info": "<span class='greentext'>被动【守护徽章】</span><br><span class='tiaoJian'>（拥有者被攻击命中时②）</span>移除此卡，本次攻击伤害-2。",
                    "tianQiZheWuQiZhuFuKa": "专属【武器祝福】",
                    "tianQiZheWuQiZhuFuKa_info": "<span class='greentext'>被动【武器祝福】</span><br><span class='tiaoJian'>（拥有者的攻击命中时②）</span>移除此卡，本次攻击伤害+2。",
                    "tianQiZheTianShiZhuFuKa": "专属【天使祝福】",
                    "tianQiZheTianShiZhuFuKa_info": "<span class='greentext'>响应【天使祝福】</span><br><span class='tiaoJian'>（拥有者支付技能的1</span><span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>或1</span><span class='lan'>【水晶】</span><span class='tiaoJian'>时）</span>移除此卡，视为已支付该费用。",
                },
                "list": [],
            },
            "skill": {
                "skill": {
                    "moFaHuDun": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/moFaHuDun.mp3",
                        "trigger": {
                            "player": "zaoChengShangHai",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    // 条件1：必须是法术伤害
                    if(event.faShu!=true) return false;
                    // 条件2：玩家拥有【圣盾】标记（使用hasExpansions检查）
                    return player.hasExpansions('_shengDun'); // 修改为hasExpansions检查
                },
                        "content": function() {
                    // 法术伤害-1
                    trigger.num--;
                },
                        "_priority": 0,
                    },
                    "xuanWenShengCheng": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/xuanWenShengCheng.mp3",
                        "trigger": {
                            "player": [
                                "gongJiMingZhong",
                                "daChuPai",
                            ],
                        },
                        "filter": function(event, player) {
                    // 条件1：炫纹小于9个
                    if( player.getExpansions('xuanWen').length >= 9)
                        return false;
                    // 条件2：水系或火系攻击命中
                    if(event.gongJiMingZhong)
                        return get.xiBie(event.card) == 'shui' || get.xiBie(event.card) == 'huo';
                    // 条件3：打出牌名为【暗灭】或【圣光】
                    return event.card.name=='anMie' || event.card.name=='shengGuang';
                },
                        "content": function() {
                    'step 0'
                    // 将触发牌转化为炫纹标记
                    player.addToExpansion('draw',trigger.card.cards,'log').gaintag.add('xuanWen');
                    'step 1'
                    // 展示生成的炫纹
                    player.showCards(trigger.card.cards);

                },
                        "intro": "当你的火系、水系攻击命中时或打出【暗灭】、【圣光】时，将攻击牌或生效牌面向上置于角色旁作为【炫纹】",
                        "_priority": 0,
                    },
                    "ziDongXuanWen": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/ziDongXuanWen.mp3",
                        "trigger": {
                            "global": "changeShiQiEnd",
                        },
                        "filter": function (event, player) {
                    if (event.side == player.side) return false;
                    if (event.num >= 0) return false;
                    if (player.countCards('h') == 0) return false;
                    if( player.getExpansions('xuanWen').length >= 9)
                        return false;
                    return true;
                },
                        "check": function(event, player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "content": function () {
                    'step 0'
                    // 将一张手牌转化为炫纹标记
                    player.chooseCard('h',true,'将1张手牌面朝下放置在你角色旁，作为【炫纹】')
                    'step 1'
                    // 添加炫纹标记
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('xuanWen');
                    'step 2'
                    player.draw(2);
                    // 抽一张牌
                },
                        "_priority": 0,
                    },
                    "xuanWenFaShe": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/xuanWenFaShe.mp3",
                        "trigger": {source:'chengShouShangHaiAfter'},
                        "filter": function(event,player){
                    if(!event || !(event.num > 0) || event.faShu || event.yingZhan === true || !event.card) return false;
                    var current=event, seen=new Set(), attack=null;
                    while(current && !seen.has(current)) {
                        seen.add(current);
                        if(current.name === 'useCard') { attack=current; break; }
                        current=typeof current.getParent === 'function' ? current.getParent() : current.parent;
                    }
                    return !!attack && attack.player === player && attack.card === event.card &&
                        get.type(attack.card) === 'gongJi' && attack.yingZhan !== true &&
                        player.getExpansions('xuanWen').length > 0;
                },
                        "content": async function(event,trigger,player){
                    var cards=player.getExpansions('xuanWen');
                    var card=cards[cards.length-1];
                    var xuanWenFaShe_xiBie=get.xiBie(card);
                    if(player.isHengZhi()) {
                        xuanWenFaShe_xiBie='an';
                    }
                    game.log(
                        player,
                        '发射了',
                        card,
                        '（'+get.translation(xuanWenFaShe_xiBie)+'系【炫纹】）'
                    );
                    await player.discard(card,'xuanWen').set('visible',true);
                    var target;
                    switch(xuanWenFaShe_xiBie){
                        case 'huo':
                            target = (await player.chooseTarget(
                                '火系炫纹：对目标角色造成1点法术伤害③',
                                true
                            ).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets() || []);
                            target = target[0];
                            if(target) await target.faShuDamage(1,player);
                            break;
                        case'shui':
                            target = (await player.chooseTarget(
                                '水系炫纹：令目标角色弃1张牌',
                                true,
                                function(card,player,target){
                                    return target.isIn();
                                }
                            ).set('ai',function(target){
                                var player = _status.event.player;
                                if(target.side != player.side) return 0;
                                return get.attitude(player, target);
                            }).forResultTargets() || []);
                            target = target[0];
                            if(target && target.isIn() && target.countCards('h') >= 1) {
                                await target.chooseToDiscard('h',true);
                            }
                            break;
                        case 'an':
                            target = (await player.chooseTarget(
                                '暗系炫纹：对目标角色造成2点法术伤害③',
                                true
                            ).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,2);
                            }).forResultTargets() || []);
                            target = target[0];
                            if(target) await target.faShuDamage(2,player);
                            break;
                        case 'guang':
                            await player.addGongJiOrFaShu();
                            break;
                    }
                },
                        "check": function(event, player) {
                    var cards = player.getExpansions('xuanWen');
                    if(!cards.length) return false;
                    var xiBie = player.isHengZhi() ?
                        'an' : get.xiBie(cards[cards.length - 1]);
                    if(xiBie != 'shui') return true;
                    return game.hasPlayer(function(target) {
                        return target.side == player.side &&
                            target.countCards('h') > 0;
                    });
                },
                        "_priority": 0,
                    },
                    "huangLongYanYue": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/huangLongYanYue.mp3",
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "usable": 1,
                        "filter": function(event,player){
                    if(event.yingZhan==true) return false; // 排除迎战攻击
                    //return player.getExpansions('xuanWen').length>0&&player.canBiShaShuiJing(); // 必须拥有炫纹标记和消耗水晶
                    var cards=player.getExpansions('xuanWen');
                    if(cards.length==0) return false;
                    if(player.isHengZhi()) return true;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='an'||get.xiBie(cards[i])=='guang') return true;
                    }
                    return false;

                },
                        "check": function(event, player) {
                    return !!event.target && event.target.side != player.side;
                },
                        "logTarget": "target",
                        "content": function(){
                    'step 0.'
                    //player.removeBiShaShuiJing();

                    'step 1'
                    var Damage_num=0;       // 光暗系牌计数
                    var Damage_num_max=2;   // 最大增伤
                    var cards=player.getExpansions('xuanWen');
                    if(player.isHengZhi())
                    {
                        for(var i=0;i<cards.length;i++){
                            if(Damage_num < Damage_num_max){
                                Damage_num++;
                            }
                        };
                    }
                    else {
                        for(var i=0;i<cards.length;i++){
                            if((get.xiBie(cards[i])=='an'||get.xiBie(cards[i])=='guang')&&(Damage_num < Damage_num_max)){
                                Damage_num++;
                            }
                        };
                    }
                    'step 2'

                    trigger.target.faShuDamage(Damage_num,player );
                },
                        "_priority": 0,
                    },
                    "bianShenBeiYaNa": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/bianShenBeiYaNa.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event,player){
                    if(player.isHengZhi()) return false;
                    var cards=player.getExpansions('xuanWen');
                    if(cards.length<2) return false;
                    return player.canBiShaShuiJing();
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.hengZhi();
                    'step 1'
                    var cards=player.getExpansions('xuanWen');
                    player.discard(cards[0],'xuanWen');
                    player.discard(cards[1],'xuanWen');
                },
                        "check": function(event,player){
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    if(!game.hasPlayer(function(target) {
                        return target.side != player.side;
                    })) return false;
                    return player.countCards('h', function(card) {
                        return get.type(card, player) == 'faShu';
                    }) > 0;
                },
                        "group": [
                            "bianShenBeiYaNa_chongZhi",
                            "bianShenBeiYaNa_zhuanHuan",
                        ],
                        "subSkill": {
                            "zhuanHuan": {
                                "enable": [
                                    "gongJi",
                                    "yingZhan",
                                ],
                                "filter": function(event,player){
                            //是否横置
                            if(!player.isHengZhi())return false;

                            var event=event||_status.event;
                            if(event.name=='yingZhan'){
                                if(event.canYingZhan==false) return false;
                                var cards=player.getCards('h');
                                for(var i=0;i<cards.length;i++){
                                    var card=cards[i];
                                    if(card.name!='shengGuang'&&get.type(card)=='faShu'){
                                        if(get.xiBie(card)==get.xiBie(event.card)) return true;
                                   }
                                }
                                return false;
                            }
                            return player.countCards('h',function(card){
                                return card.name!='shengGuang'&&get.type(card)=='faShu';
                            });
                        },
                                "filterCard": function(card,player,event){
                            if(card.name=='shengGuang'||get.type(card)!='faShu') return false;
                            var event=event||_status.event;
                            if(event.name=='yingZhan'){
                                return get.xiBie(card)==get.xiBie(event.card);
                            }
                        return card.name!='shengGuang'&&get.type(card)=='faShu';
                        },
                                "position": "h",
                                "viewAs": function(cards,player){
                            if(cards.length==0) return;
                            var xiBie=get.xiBie(cards[0]);
                            var name;
                            switch(xiBie){
                                case 'shui':
                                    name='shuiLianZhan';
                                    break;
                                case 'huo':
                                    name='huoYanZhan';
                                    break;
                                case 'feng':
                                    name='fengShenZhan';
                                    break;
                                case 'lei':
                                    name='leiGuangZhan';
                                    break;
                                case 'di':
                                    name='diLieZhan';
                                    break;
                                case 'an':
                                    name='anMie';
                                    break;
                            }
                            var dict={name:name,xiBie:xiBie};
                            return dict;
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "player": 1,
                                    },
                                },
                                "sub": true,
                                "sourceSkill": "bianShenBeiYaNa",
                                "_priority": 0,
                            },
                            "chongZhi": {
                                "trigger": {
                                    "global": "changeShiQiEnd",
                                },
                                "direct": true,
                                "filter": function(event,player){
                            if (event.num >= 0) return false;
                            if (event.side != player.side) return false;
                            return player.isHengZhi();
                        },
                                "content": function(){
                            'step 0'
                            player.chongZhi();
                            player.changeZhiLiao(1);
                        },
                                "sub": true,
                                "sourceSkill": "bianShenBeiYaNa",
                                "_priority": 0,
                            },
                        },
                        "mod": {
                            "cardEnabled": function(card, player) {
                        if(player.isHengZhi() && get.name(card) !== 'shengGuang' && get.type(card, player) === 'faShu') {
                            return false;
                        }
                    },
                        },
                        "_priority": 0,
                    },
                    "xuanWenQiangYa": {
                        "audio": "ext:创世纪/audio/skill/beiyanadopushen/xuanWenQiangYa.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                        "contentBefore": async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    var cards=player.getExpansions('xuanWen').slice();
                    player.storage.xuanWenQiangYa_damage=Math.ceil(cards.length / 2);
                    if(cards.length) await player.discard(cards,'xuanWen');
                },
                        "content": async function(event,trigger,player){
                    var amount=player.storage.xuanWenQiangYa_damage || 0;
                    var targets=game.filterPlayer(function(current){return current.side != player.side;});
                    for(var target of targets.sortBySeat(player)) {
                        if(amount > 0 && target.isIn()) await target.faShuDamage(amount,player);
                    }
                },
                        "contentAfter": function(event,trigger,player){
                    delete player.storage.xuanWenQiangYa_damage;
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                    var cards = player.getExpansions('xuanWen');
                    if(cards.length < 2) return 0;
                    var damage = Math.ceil(cards.length / 2);
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target.side != player.side) {
                            score += get.damageEffect2(
                                target, player, damage
                            );
                        }
                    });
                    return score > 0 ? 3.7 : 0;
                },
                            "result": {
                                "player": function(player) {
                    var damage = Math.ceil(
                        player.getExpansions('xuanWen').length / 2
                    );
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target.side != player.side) {
                            score += get.damageEffect2(
                                target, player, damage
                            );
                        }
                    });
                    return score;
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "xuanWen": {
                        "intro": {
                            "name": "炫纹",
                            "markcount": "expansion",
                            "mark": function(dialog,storage,player){
                        var cards=player.getExpansions('xuanWen');
                        if(player.isUnderControl(true)) dialog.addAuto(cards);
                        else return '共有'+cards.length+'张牌';
                    },
                            "show": true,
                        },
                        "onremove": function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                        "_priority": 0,
                    },
                    "nianQiHuanRao": {
                        "audio": "ext:创世纪/audio/skill/baiHuaLiaoLuan/nianQiHuanRao.mp3",
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !player.hasSkill('nianZhiAoYi_effect') &&
                        !player.isZhiShiWuMax('nianQi');
                },
                        "content": async function(event, trigger, player) {
                    await lib.skill.nianQi.addNianQi(player, 1);
                },
                    },
                    "guangZhiQinHe": {
                        "group": "guangZhiQinHe_kaiJu",
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                        return num + 1;
                    },
                            "targetEnabled": function(card, source, target) {
                        var name = get.name(card);
                        return name != 'xuRuo' && name != 'zhongDu';
                            },
                        },
                        "subSkill": {
                            "kaiJu": {
                                "audio": "ext:创世纪/audio/skill/baiHuaLiaoLuan/guangZhiQinHe.mp3",
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "firstDo": true,
                                "content": async function() {},
                            },
                        },
                    },
                    "nianQiBo": {
                        "audio": "ext:创世纪/audio/skill/baiHuaLiaoLuan/nianQiBo.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return lib.filter.cardDiscardable(card, player) &&
                        (get.type(card) == 'faShu' || get.mingGe(card) == 'yong');
                },
                        "filter": function(event, player) {
                    if(!game.hasPlayer(function(current) {
                        return current.side != player.side;
                    })) return false;
                    return player.countCards('h', function(card) {
                        return lib.filter.cardDiscardable(card, player) &&
                            (get.type(card) == 'faShu' || get.mingGe(card) == 'yong');
                    }) > 0;
                },
                        "filterTarget": function(card, player, target) {
                    return target.isIn() && target.side != player.side;
                },
                        "content": async function(event, trigger, player) {
                    var target = event.target;
                    await player.faShuDamage(2, player);
                    if(target && target.isIn()) {
                        await target.faShuDamage(2, player);
                    }
                    if(player.isIn()) {
                        await lib.skill.nianQi.addNianQi(player, 1);
                    }
                },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "player": function(player) {
                            return get.damageEffect2(player, player, 2) + 1;
                        },
                                "target": function(player, target) {
                            return get.damageEffect(target, 2);
                        },
                            },
                        },
                    },
                    "nianQiZhao": {
                        "audio": "ext:创世纪/audio/skill/baiHuaLiaoLuan/nianQiZhao.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    var canPay = player.countZhiShiWu('nianQi') >= 2 ||
                        player.countCards('h') + 2 <=
                            player.getHandcardLimit();
                    if(!canPay) return false;
                    return game.hasPlayer(function(target) {
                        return target.side == player.side &&
                            get.zhiLiaoEffect(target, 2) > 0;
                    });
                },
                        "filter": function(event, player) {
                    return game.hasPlayer(function(current) {
                        return current.side == player.side;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target.isIn() && target.side == player.side;
                },
                        "content": async function(event, trigger, player) {
                    var selectedTarget = event.target;
                    var controls = ['摸2张牌'];
                    if(player.countZhiShiWu('nianQi') >= 2) controls.unshift('移除2【念气】');
                    var control = await player.chooseControl(controls).set('prompt', '念气罩：选择一项').set('ai', function() {
                        var player = _status.event.player;
                        return player.countZhiShiWu('nianQi') >= 2 && player.countCards('h') + 2 > player.getHandcardLimit() ? '移除2【念气】' : '摸2张牌';
                    }).forResultControl();
                    if(control == '移除2【念气】') await player.removeZhiShiWu('nianQi', 2);
                    else await player.draw(2);
                    if(selectedTarget && selectedTarget.isIn()) await selectedTarget.changeZhiLiao(2, player);
                    if(selectedTarget && selectedTarget.isIn() && selectedTarget.countCards('h') >= 1) {
                        await selectedTarget.chooseToDiscard('h', 1, true, '念气罩：弃置1张牌');
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.nianQiZhao
                            .isSafeForAi(player) ? 3.6 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.nianQiZhao
                                .isSafeForAi(player) ? 0 : -100;
                        },
                                "target": function(player, target) {
                            return get.zhiLiaoEffect(target, 2);
                        },
                            },
                        },
                    },
                    "nianZhiAoYi": {
                        "audio": "ext:创世纪/audio/skill/baiHuaLiaoLuan/nianZhiAoYi.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        !player.hasSkill('nianZhiAoYi_effect');
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    if(player.zhiLiao > 0) {
                        await player.changeZhiLiao(-player.zhiLiao, player);
                    }
                    var drawNum = Math.max(
                        0,
                        player.getHandcardLimit() - player.countCards('h')
                    );
                    if(drawNum > 0) {
                        await player.draw(drawNum);
                    }
                    await player.hengZhi();
                    player.addSkill('nianZhiAoYi_effect');
                    player.addSkill('nianZhiAoYi_shiQi');
                },
                        "check": function(event, player) {
                    if(player.countZhiShiWu('nianQi') < 1 ||
                        !player.canFaShu()) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return true;
                },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "nianQi": {
                        "intro": {
                            "name": "念气",
                            "content": "mark",
                            "max": 8,
                        },
                        "onremove": "storage",
                        "markimage": "extension/创世纪/mark_nianQi.webp",
                        "addNianQi": async function(player, num) {
                    if(!player ||
                        player.hasSkill('nianZhiAoYi_effect')) return;
                    if(typeof num != 'number') num = 1;
                    if(num <= 0) return;
                    await player.addZhiShiWu('nianQi', num);
                },
                    },
                    "faMiLiErShiYanShi": {
                        "trigger": {
                            "global": "gameStart",
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "priority": 10,
                        "content": async function(event, trigger, player) {
                    if(event.triggername == 'gameStart') {
                        lib.skill.luMiYaShiYan.playAudio(
                            'faMiLiErShiYanShi',
                            player
                        );
                        for(var i = 0; i < 2; i++) {
                            await lib.skill.shiYanCaiLiao.addTopMaterial(
                                player
                            );
                        }
                    } else {
                        await lib.skill.shiYanCaiLiao.addTopMaterial(
                            player,
                            '法米利尔实验室：选择1张已有【实验材料】进行更换（取消则不更换）'
                        );
                    }
                },
                    },
                    "luMiYaShiYan": {
                        "playAudio": function(file, player) {
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, 'ext:创世纪/audio/skill/luMiYa/' +
                        file + '.mp3', player);
                },
                        "run": async function(player, material, sourceEvent, requiredSuits) {
                    if(!player || !material || !sourceEvent) return null;
                    lib.skill.luMiYaShiYan.playAudio(
                        'luMiYaShiYan',
                        player
                    );
                    await player.showHiddenCards(
                        [material],
                        '移除【实验材料】'
                    );
                    await player.lose([material], ui.ordering);
                    var cards = get.cards(1);
                    var judgeCard = cards && cards[0];
                    if(!judgeCard) {
                        await game.cardsDiscard([material]);
                        return null;
                    }
                    await player.showCards(
                        [judgeCard],
                        '实验判定'
                    );
                    var result;
                    requiredSuits = Array.isArray(requiredSuits) ?
                        requiredSuits : [get.xiBie(material)];
                    if(requiredSuits.includes(get.xiBie(judgeCard))) {
                        result = '大成功';
                    } else if(get.type(judgeCard) == 'faShu') {
                        result = '成功';
                    } else {
                        result = '失败';
                    }
                    sourceEvent.luMiYaShiYanResult = result;
                    sourceEvent.luMiYaShiYanInitialResult = result;
                    sourceEvent.luMiYaBangBangTangUsed = false;
                    sourceEvent.luMiYaShiYanMaterial = material;
                    sourceEvent.luMiYaShiYanJudgeCard = judgeCard;
                    sourceEvent.luMiYaShiYanRequiredSuits =
                        requiredSuits.slice(0);
                    game.log(
                        player,
                        '的实验初始结果为',
                        '#y' + result
                    );
                    await sourceEvent.trigger('luMiYaShiYanPanDing');
                    var finalAudio = {
                        '大成功': 'luMiYaShiYan_daChengGong',
                        '成功': 'luMiYaShiYan_chengGong',
                        '失败': 'luMiYaShiYan_shiBai',
                    }[sourceEvent.luMiYaShiYanResult];
                    if(finalAudio) {
                        lib.skill.luMiYaShiYan.playAudio(
                            finalAudio,
                            player
                        );
                    }
                    return {
                        result: sourceEvent.luMiYaShiYanResult,
                        initialResult:
                            sourceEvent.luMiYaShiYanInitialResult,
                        material: material,
                        judgeCard: judgeCard,
                    };
                },
                        "finish": async function(player, experiment) {
                    if(!experiment) return;
                    if(experiment.result == '失败' &&
                        !player.isZhiShiWuMax('luMiYaYanJiu')) {
                        await player.addZhiShiWu(
                            'luMiYaYanJiu',
                            1
                        );
                    }
                    var discardCards = [];
                    var material = experiment.material;
                    if(material &&
                        get.position(material, true) != 'd') {
                        discardCards.push(material);
                    }
                    var judgeCard = experiment.judgeCard;
                    if(judgeCard &&
                        get.position(judgeCard, true) != 'd') {
                        discardCards.push(judgeCard);
                    }
                    if(discardCards.length) {
                        await game.cardsDiscard(discardCards);
                    }
                },
                    },
                    "xingYunBangBangTang": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/xingYunBangBangTang.mp3",
                        "trigger": {
                            "player": "luMiYaShiYanPanDing",
                        },
                        "filter": function(event, player) {
                    if(!event ||
                        event.luMiYaBangBangTangUsed === true) {
                        return false;
                    }
                    if(event.luMiYaShiYanResult == '失败') {
                        return player.countZhiShiWu('luMiYaYanJiu') >= 1;
                    }
                    if(event.luMiYaShiYanResult == '成功') {
                        return player.countZhiShiWu('luMiYaYanJiu') >= 2;
                    }
                    return false;
                },
                        "cost": async function(event, trigger, player) {
                    var need =
                        trigger.luMiYaShiYanResult == '失败' ? 1 : 2;
                    var next =
                        trigger.luMiYaShiYanResult == '失败' ?
                            '成功' : '大成功';
                    event.result = await player.chooseBool(
                        '是否移除' + need +
                        '【研究】，将本次实验结果改为【' +
                        next + '】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var result = trigger.luMiYaShiYanResult;
                        var research = player.countZhiShiWu(
                            'luMiYaYanJiu'
                        );
                        if(result == '失败') {
                            // 失败通常带来负面结果；研究已满时更应立即使用，
                            // 避免实验结束时新增研究溢出。
                            return research >= 3 ||
                                player.countCards('h') >=
                                    player.getHandcardLimit() ||
                                trigger.name != 'suanYuYun';
                        }
                        if(result != '成功') return false;
                        if(research >= 3) return true;
                        if(trigger.name == 'xuanZhuanSaoBa') {
                            return game.countPlayer(function(current) {
                                return current.side != player.side &&
                                    current != trigger.target;
                            }) >= 2;
                        }
                        if(trigger.name == 'suanYuYun') {
                            return game.countPlayer(function(current) {
                                return current.side != player.side &&
                                    current.countCards('he') > 0;
                            }) >= 2;
                        }
                        if(trigger.name == 'dianManPengZhuangJi') {
                            return player.countCards('h', function(card) {
                                return get.type(card, player) == 'faShu';
                            }) > 0 && game.hasPlayer(function(current) {
                                return current.side != player.side;
                            });
                        }
                        if(trigger.name == 'fanZhongLiZhuangZhi') {
                            return game.hasPlayer(function(current) {
                                return current.side != player.side &&
                                    !current.hasJiChuXiaoGuo('_xuRuo');
                            });
                        }
                        // 熔岩药瓶从2点提升到3点时，仅在确有合适敌方
                        // 伤害目标时消耗两点研究。
                        if(trigger.name == 'rongYanYaoPing') {
                            return game.hasPlayer(function(current) {
                                return current.side != player.side &&
                                    get.damageEffect2(
                                        current,
                                        player,
                                        3
                                    ) > 0;
                            });
                        }
                        return false;
                    }).forResult();
                    event.result.cost_data = {
                        need: need,
                        result: next,
                    };
                },
                        "content": async function(event, trigger, player) {
                    var data = event.cost_data;
                    if(!data ||
                        trigger.luMiYaBangBangTangUsed === true ||
                        player.countZhiShiWu('luMiYaYanJiu') <
                            data.need) {
                        return;
                    }
                    await player.removeZhiShiWu(
                        'luMiYaYanJiu',
                        data.need
                    );
                    trigger.luMiYaShiYanResult = data.result;
                    trigger.luMiYaBangBangTangUsed = true;
                    game.log(
                        player,
                        '将实验结果改为',
                        '#y' + data.result
                    );
                },
                    },
                    "gaiLiangMoFaXingDan": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/gaiLiangMoFaXingDan.mp3",
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.num > 0 &&
                        !!event.card &&
                        get.name(event.card) == 'moDan';
                },
                        "cost": async function(event, trigger, player) {
                    var control = await player.chooseControl(
                        ['我方全体+1【治疗】', '所有对手受到1点法术伤害', '取消']
                    ).set('prompt', '改良魔法星弹：选择一项')
                        .set('ai', function() {
                            var player = _status.event.player;
                            var needHeal = game.countPlayer(
                                function(current) {
                                    return current.side == player.side &&
                                        current.zhiLiao <
                                            current.getZhiLiaoLimit();
                                }
                            );
                            return needHeal >= 2 ?
                                '我方全体+1【治疗】' :
                                '所有对手受到1点法术伤害';
                        }).forResultControl();
                    event.result = {
                        bool: control != '取消',
                        cost_data: control,
                    };
                },
                        "content": async function(event, trigger, player) {
                    if(event.cost_data == '我方全体+1【治疗】') {
                        var allies = game.filterPlayer(function(current) {
                            return current.side == player.side;
                        }).sortBySeat(player);
                        for(var ally of allies) {
                            if(ally.isIn()) {
                                await ally.changeZhiLiao(1, player);
                            }
                        }
                    } else {
                        var opponents = game.filterPlayer(
                            function(current) {
                                return current.side != player.side;
                            }
                        ).sortBySeat(player);
                        for(var target of opponents) {
                            if(target.isIn()) {
                                await target.faShuDamage(
                                    1,
                                    player,
                                    'nocard'
                                );
                            }
                        }
                    }
                },
                    },
                    "saoBaZhangWo": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/saoBaZhangWo.mp3",
                        "isBroomAttack": function(event, player) {
                    var current = event;
                    var guard = 0;
                    while(current && guard < 20) {
                        if(current.luMiYaSaoBaZhangWo === true &&
                            (!current.player || current.player == player)) {
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
                        "trigger": {
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "priority": 0,
                        "content": function(event, trigger, player) {
                    if(!Array.isArray(player.storage.extraXingDong)) {
                        player.storage.extraXingDong = [];
                    }
                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        luMiYaSaoBaZhangWo: true,
                    });
                },
                        "group": [
                            "saoBaZhangWo_jianShang",
                            "saoBaZhangWo_huiShou",
                        ],
                        "subSkill": {
                            "jianShang": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.yingZhan != true &&
                                lib.skill.saoBaZhangWo
                                    .isBroomAttack(event, player);
                        },
                                "content": function(event, trigger, player) {
                            trigger.luMiYaSaoBaZhangWo = true;
                            trigger.changeDamageNum(-1);
                        },
                            },
                            "huiShou": {
                                "trigger": {
                                    "player": "gongJiEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "filter": function(event, player) {
                            if(!event ||
                                event.yingZhan == true ||
                                !lib.skill.saoBaZhangWo
                                    .isBroomAttack(event, player) ||
                                !!event.target ||
                                !Array.isArray(event.cards)) {
                                return false;
                            }
                            return event.cards.some(function(card) {
                                return get.position(card, true) == 'd';
                            });
                        },
                                "content": async function(event, trigger, player) {
                            var card = trigger.cards.find(function(current) {
                                return get.position(current, true) == 'd';
                            });
                            if(!card) return;
                            await lib.skill.shiYanCaiLiao.addMaterial(
                                player,
                                card,
                                '扫把掌握：选择1张已有【实验材料】进行更换（取消则不收取攻击牌）'
                            );
                        },
                            },
                        },
                    },
                    "xuanZhuanSaoBa": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/xuanZhuanSaoBa.mp3",
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "filter": function(event,player){return !!event && !!event.target;},
                        "cost": async function(event,trigger,player){
                    event.result={bool:false,cards:[]};
                    var accepted=await player.chooseBool('是否发动【旋转扫把】？')
                        .set('ai',function(){
                            var player=_status.event.player, attack=_status.event.getTrigger();
                            return lib.skill.shiYanCaiLiao.getMatching(player,['feng']).length > 0 &&
                                Math.max(0,attack.damageNum || 0) > 0 && game.hasPlayer(function(current){
                                    return current.side !== player.side && current !== attack.target;
                                });
                        }).forResultBool();
                    if(!accepted) return;
                    var material=await lib.skill.shiYanCaiLiao.chooseMatching(player,['feng'],
                        '旋转扫把：选择1张风系【实验材料】',true,true);
                    event.result={bool:!!material,cards:material ? [material] : [],
                        cost_data:Math.max(0,typeof trigger.damageNum === 'number' ? trigger.damageNum : 0)};
                },
                        "content": async function(event, trigger, player) {
                    var material = event.cards && event.cards[0];
                    if(!material) return;
                    var amount = Math.max(0, event.cost_data || 0);
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['feng']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        if(amount > 0) {
                            await player.damage(
                                amount,
                                player,
                                'nocard'
                            );
                        }
                    } else {
                        var max = experiment.result == '大成功' ? 2 : 1;
                        var targets = (await player.chooseTarget(
                            [0, max],
                            '旋转扫把：指定至多' + max +
                                '名其他目标对手',
                            function(card, player, target) {
                                var attack =
                                    _status.event.getTrigger();
                                return target.side != player.side &&
                                    target != attack.target;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                _status.event.amount
                            );
                        }).set('amount', amount).forResultTargets() || []);
                        for(var target of targets.sortBySeat(player)) {
                            if(amount > 0 && target.isIn()) {
                                await target.damage(
                                    amount,
                                    player,
                                    'nocard'
                                );
                            }
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                    },
                    "rongYanYaoPing": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/rongYanYaoPing.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['huo', 'di']
                    ).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['huo', 'di'],
                            '熔岩药瓶：选择1张火系或地系【实验材料】',
                            true
                        );
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['huo', 'di']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                    } else {
                        var damage =
                            experiment.result == '大成功' ? 3 : 2;
                        var targets = (await player.chooseTarget(
                            true,
                            '熔岩药瓶：指定任意一名角色',
                            function() {
                                return true;
                            }
                        ).set('ai', function(target) {
                            return get.damageEffect2(
                                target,
                                _status.event.player,
                                _status.event.damage
                            );
                        }).set('damage', damage).forResultTargets() || []);
                        if(targets[0] && targets[0].isIn()) {
                            await targets[0].faShuDamage(
                                damage,
                                player,
                                'nocard'
                            );
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                        "ai": {
                            "order": 3.6,
                            "result": {
                                "player": 1,
                            },
                        },
                    },
                    "suanYuYun": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/suanYuYun.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['shui']
                    ).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['shui'],
                            '酸雨云：选择1张水系【实验材料】',
                            true
                        );
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['shui']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.draw(1);
                    } else {
                        var max = experiment.result == '大成功' ? 2 : 1;
                        var candidates = game.filterPlayer(function(current) {
                            return current.isIn();
                        });
                        if(candidates.length) {
                            var range = max == 1 ? 1 : [0, 2];
                            var targets = (await player.chooseTarget(
                                range,
                                max == 1,
                                '酸雨云：指定' +
                                    (max == 1 ? '1' : '至多2') +
                                    '名角色',
                                function(card, player, target) {
                                    return target.isIn();
                                }
                            ).set('ai', function(target) {
                                if(target.countCards('he') < 1) return 0;
                                return -get.attitude(
                                    _status.event.player,
                                    target
                                );
                            }).forResultTargets() || []);
                            for(var target of targets.sortBySeat(player)) {
                                var canDiscard = target.isIn() &&
                                    target.countCards('he') >= 1;
                                if(canDiscard) {
                                    await target.chooseToDiscard(
                                        'he',
                                        1,
                                        true,
                                        '酸雨云：弃置1张牌'
                                    );
                                }
                            }
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.suanYuYun
                            .isSafeForAi(player) ? 3.4 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.suanYuYun
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "dianManPengZhuangJi": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/dianManPengZhuangJi.mp3",
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "filter": function(event,player){return !!event;},
                        "cost": async function(event,trigger,player){
                    event.result={bool:false,cards:[]};
                    var accepted=await player.chooseBool('是否发动【电鳗碰撞机】？')
                        .set('ai',function(){
                            var player=_status.event.player;
                            var hasFollowUp=player.countCards('h',function(card){
                                var type=get.type(card,player);return type === 'gongJi' || type === 'faShu';
                            }) > 0 && game.hasPlayer(function(current){return current.side !== player.side;});
                            var safeFailure=player.countCards('h')+1 <= player.getHandcardLimit() ||
                                player.countZhiShiWu('luMiYaYanJiu') >= 1;
                            return lib.skill.shiYanCaiLiao.getMatching(player,['lei','guang']).length > 0 && hasFollowUp && safeFailure;
                        }).forResultBool();
                    if(!accepted) return;
                    var material=await lib.skill.shiYanCaiLiao.chooseMatching(player,['lei','guang'],
                        '电鳗碰撞机：选择1张雷系或光系【实验材料】',true,true);
                    event.result={bool:!!material,cards:material ? [material] : []};
                },
                        "content": async function(event, trigger, player) {
                    var material = event.cards && event.cards[0];
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['lei', 'guang']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.draw(1);
                    } else if(experiment.result == '成功') {
                        player.addGongJi();
                    } else {
                        player.addFaShu();
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                    },
                    "fanZhongLiZhuangZhi": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/fanZhongLiZhuangZhi.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "isSafeForAi": function(player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "filter": function(event, player) {
                    return lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        ['an']
                    ).length > 0;
                },
                        "content": async function(event, trigger, player) {
                    var material =
                        await lib.skill.shiYanCaiLiao.chooseMatching(
                            player,
                            ['an'],
                            '反重力装置：选择1张暗系【实验材料】',
                            true
                        );
                    if(!material) return;
                    var experiment = await lib.skill.luMiYaShiYan.run(
                        player,
                        material,
                        event,
                        ['an']
                    );
                    if(!experiment) return;
                    if(experiment.result == '失败') {
                        await player.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                        await player.draw(1);
                    } else if(experiment.result == '成功') {
                        var canUse = game.hasPlayer(function(current) {
                            return !current.hasJiChuXiaoGuo('_xuRuo');
                        });
                        if(canUse) {
                            var targets = (await player.chooseTarget(
                                true,
                                '反重力装置：指定任意一名没有【虚弱】的角色',
                                function(card, player, target) {
                                    return !target.hasJiChuXiaoGuo(
                                        '_xuRuo'
                                    );
                                }
                            ).set('ai', function(target) {
                                return -get.attitude(
                                    _status.event.player,
                                    target
                                );
                            }).forResultTargets() || []);
                            if(targets[0] && targets[0].isIn()) {
                                await lib.chuangShiJiUseTemporaryEffectCard(player, 'xuRuo', targets[0]);
                            }
                        }
                    } else {
                        var targets = (await player.chooseTarget(
                            true,
                            '反重力装置：指定任意一名角色摸3张牌',
                            function() {
                                return true;
                            }
                        ).set('ai', function(target) {
                            var player = _status.event.player;
                            if(target == player &&
                                target.countCards('h') + 3 >
                                    target.getHandcardLimit()) {
                                return -100;
                            }
                            return get.attitude(
                                player,
                                target
                            );
                        }).forResultTargets() || []);
                        if(targets[0] && targets[0].isIn()) {
                            await targets[0].draw(3);
                        }
                    }
                    await lib.skill.luMiYaShiYan.finish(
                        player,
                        experiment
                    );
                },
                        "ai": {
                            "order": function(item, player) {
                        return lib.skill.fanZhongLiZhuangZhi
                            .isSafeForAi(player) ? 3.3 : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.fanZhongLiZhuangZhi
                                .isSafeForAi(player) ? 1 : -100;
                        },
                            },
                        },
                    },
                    "jiYiRongHe": {
                        "audio": "ext:创世纪/audio/skill/luMiYa/jiYiRongHe.mp3",
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
                    var targets = game.filterPlayer(function(current) {
                        return current.side == player.side;
                    }).sortBySeat(player);
                    for(var target of targets) {
                        if(!target.isIn() ||
                            target.countCards('h') == 0) {
                            continue;
                        }
                        var result = await target.chooseToDiscard(
                            'h',
                            1,
                            true,
                            '技艺融合：弃置1张手牌'
                        ).forResult();
                        if(!result.bool ||
                            !result.cards ||
                            !result.cards.length) {
                            continue;
                        }
                        var card = result.cards && result.cards[0];
                        if(!card ||
                            get.position(card, true) != 'd') {
                            continue;
                        }
                        var links = await player.chooseCardButton(
                            [card],
                            1,
                            '是否将' + get.translation(target) +
                            '弃置的' + get.translation(card) +
                            '作为【实验材料】？'
                        ).set('ai', function(button) {
                            return 6 - get.value(button.link);
                        }).forResultLinks() || [];
                        var take = links.includes(card);
                        if(take &&
                            get.position(card, true) == 'd') {
                            await lib.skill.shiYanCaiLiao.addMaterial(
                                player,
                                card,
                                '技艺融合：选择1张已有【实验材料】进行更换（取消则不收取该牌）'
                            );
                        }
                    }
                    if(!player.isZhiShiWuMax('luMiYaYanJiu')) {
                        await player.addZhiShiWu(
                            'luMiYaYanJiu',
                            1
                        );
                    }
                    if(usedBaoShi) {
                        var count =
                            player.countZhiShiWu('luMiYaYanJiu');
                        if(count < 3) {
                            await player.addZhiShiWu(
                                'luMiYaYanJiu',
                                3 - count
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
                    return game.countPlayer(function(current) {
                        return current.side == player.side &&
                            current.countCards('h') > 0;
                    }) >= 2;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                    },
                    "shiYanCaiLiao": {
                        "intro": {
                            "name": "实验材料",
                            "markcount": "gaiPai",
                            "content": "gaiPai",
                            "max": 3,
                        },
                        "onremove": function(player, skill) {
                    var cards = player.getGaiPai(skill);
                    if(cards.length) player.loseToDiscardpile(cards);
                },
                        "makeRoom": async function(player, prompt) {
                    if(player.countGaiPai('shiYanCaiLiao') < 3) {
                        return true;
                    }
                    var cards = player.getGaiPai('shiYanCaiLiao');
                    var links = await player.chooseCardButton(
                        cards,
                        1,
                        prompt || '选择1张已有【实验材料】进行更换'
                    ).set('ai', function(button) {
                        return 6 - get.value(button.link);
                    }).forResultLinks() || [];
                    if(!links.length) return false;
                    await player.discard(
                        links,
                        'shiYanCaiLiao'
                    ).set('showHiddenCards', true);
                    return true;
                },
                        "addMaterial": async function(player, card, prompt) {
                    if(!player || !card) return false;
                    var canAdd = await lib.skill.shiYanCaiLiao.makeRoom(
                        player,
                        prompt
                    );
                    if(!canAdd) return false;
                    await player.addGaiPai(
                        [card],
                        player,
                        'shiYanCaiLiao'
                    );
                    return true;
                },
                        "addTopMaterial": async function(player, prompt) {
                    var canAdd = await lib.skill.shiYanCaiLiao.makeRoom(
                        player,
                        prompt
                    );
                    if(!canAdd) return false;
                    var cards = get.cards(1);
                    var card = cards && cards[0];
                    if(!card) return false;
                    await player.addGaiPai(
                        [card],
                        player,
                        'shiYanCaiLiao'
                    );
                    return true;
                },
                        "getMatching": function(player, xiBies) {
                    return player.getGaiPai('shiYanCaiLiao')
                        .filter(function(card) {
                            return xiBies.includes(get.xiBie(card));
                        });
                },
                        "chooseMatching": async function(
                    player,
                    xiBies,
                    prompt,
                    forced,
                    aiCanChoose
                ) {
                    var cards = lib.skill.shiYanCaiLiao.getMatching(
                        player,
                        xiBies
                    );
                    if(!cards.length) return null;
                    var choose = forced === true ?
                        player.chooseCardButton(
                            cards,
                            true,
                            1,
                            prompt
                        ) :
                        player.chooseCardButton(cards, 1, prompt);
                    var links = await choose.set('ai', function(button) {
                        if(_status.event.aiCanChoose === false) return 0;
                        return 6 - get.value(button.link);
                    }).set(
                        'aiCanChoose',
                        aiCanChoose !== false
                    ).forResultLinks() || [];
                    return links[0] || null;
                },
                    },
                    "luMiYaYanJiu": {
                        "charlotte": true,
                        "intro": {
                            "name": "研究",
                            "content": "mark",
                            "max": 3,
                        },
                        "markimage": "extension/创世纪/mark_luMiYaYanJiu.webp",
                    },
                    "nianZhiAoYi_effect": {
                        "charlotte": true,
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "forced": true,
                        "priority": -1,
                        "filter": function(event, player) {
                    return player.countZhiShiWu('nianQi') >= 1;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('nianQi', 1);
                    player.addFaShu();
                },
                        "group": [
                            "nianZhiAoYi_effect_jinZhiNianQi",
                            "nianZhiAoYi_effect_reset",
                        ],
                        "subSkill": {
                            "jinZhiNianQi": {
                                "trigger": {
                                    "player": "changeZhiShiWuBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                            return event.zhiShiWu == 'nianQi' &&
                                event.num > 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.num = 0;
                        },
                            },
                            "reset": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "lastDo": true,
                                "popup": false,
                                "content": async function(event, trigger, player) {
                            if(player.isHengZhi()) {
                                await player.chongZhi();
                            }
                            player.removeSkill('nianZhiAoYi_effect');
                        },
                            },
                        },
                    },
                    "nianZhiAoYi_shiQi": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "奥",
                        "intro": {
                            "content": "直到你的下个回合开始前，对方士气最少为1【强制】。",
                        },
                        "group": [
                            "nianZhiAoYi_shiQi_baoHu",
                            "nianZhiAoYi_shiQi_qingChu",
                        ],
                        "subSkill": {
                            "baoHu": {
                                "trigger": {
                                    "global": "changeShiQiBefore",
                                },
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "filter": function(event, player) {
                            if(!event ||
                                event.side == player.side ||
                                event.num >= 0) return false;
                            var current = get.shiQi(event.side);
                            return typeof current == 'number' &&
                                current + event.num < 1;
                        },
                                "content": function(event, trigger, player) {
                            var current = get.shiQi(trigger.side);
                            trigger.num = Math.min(0, 1 - current);
                            if(trigger.result) {
                                trigger.result.num = trigger.num;
                            }
                            game.log(
                                player,
                                '的【念之奥义】令对方士气最低为1'
                            );
                        },
                            },
                            "qingChu": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "content": function(event, trigger, player) {
                            player.removeSkill('nianZhiAoYi_shiQi');
                        },
                            },
                        },
                    },
                    "shouHuEnCi": {
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
                            path: 'ext:创世纪/audio/skill/tianQiZhe/' +
                                'shouHuEnCi.mp3',
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, player);
                },
                        "mod": {
                            "maxZhiLiao": function(player, num) {
                        return num + 2;
                    },
                        },
                    },
                    "lingHunXiSheng": {
                        "audio": "ext:创世纪/audio/skill/tianQiZhe/lingHunXiSheng.mp3",
                        "trigger": {
                            "player": "changeShiQiEnd",
                        },
                        "filter": function(event, player) {
                    return !!event &&
                        event.player == player &&
                        event.side == player.side &&
                        event.num < 0 &&
                        event.cause == 'damage' &&
                        game.hasPlayer(function(target) {
                            return target != player &&
                                target.side == player.side;
                        });
                },
                        "cost": async function(event, trigger, player) {
                    var targets = (await player.chooseTarget(
                        '是否发动【灵魂牺牲】，指定一名目标队友？',
                        function(card, player, target) {
                            return target != player &&
                                target.side == player.side;
                        }
                    ).set('ai', function(target) {
                        var player = _status.event.player;
                        var room = target.countEmptyNengLiang ?
                            target.countEmptyNengLiang() : 1;
                        var score = room > 0 ? 2.5 : -1;
                        if(target.countNengLiang('baoShi') == 0) {
                            score += 0.8;
                        }
                        score += Math.max(0,
                            target.getHandcardLimit() -
                            target.countCards('h')) * 0.15;
                        return get.attitude(player, target) > 0 ?
                            score : -score;
                    }).forResultTargets() || []);
                    event.result = {
                        bool: targets.length > 0,
                        targets: targets,
                    };
                },
                        "content": async function(event, trigger, player) {
                    await player.changeZhiLiao(1, player);
                    var target = event.targets[0];
                    if(target) {
                        await target.addNengLiang('shuiJing', 1);
                    }
                },
                    },
                    "guangZhiFuChou": {
                        "audio": "ext:创世纪/audio/skill/tianQiZhe/guangZhiFuChou.mp3",
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "filter": function(event,player){
                    return !!event && event.yingZhan !== true && !!event.player &&
                        !!event.target && event.target !== player && event.target.side === player.side;
                },
                        "cost": async function(event,trigger,player){
                    event.result={bool:false};
                    var accepted=await player.chooseBool('是否发动【光之复仇】？')
                        .set('ai',function(){
                            var player=_status.event.player, target=_status.event.getTrigger().player;
                            if(!target || target.side === player.side) return false;
                            var damage=get.damageEffect2(target,player,1);
                            if(get.shiQi(target.side) <= 1) damage+=6;
                            return player.countCards('h',function(card){
                                return get.type(card) === 'faShu' && damage-get.value(card)*0.65 > 0;
                            }) > 0;
                        }).forResultBool();
                    if(!accepted || !player.countCards('h',function(card){return get.type(card) === 'faShu';})) return;
                    event.result=await player.chooseToDiscard('h',1,true,
                        '光之复仇：展示并弃置1张法术牌',
                        function(card){return get.type(card) === 'faShu';}
                    ).set('showCards',true).set('ai',function(card){return 8-get.value(card);}).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await trigger.player.faShuDamage(1, player);
                },
                    },
                    "tianQiZheZhuFu": {
                        "audio": "ext:创世纪/audio/skill/tianQiZhe/tianQiZheZhuFu.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                    return get.mingGe(card) == 'sheng' &&
                        lib.filter.cardDiscardable(card, player);
                },
                        "check": function(card) {
                    var player = _status.event.player;
                    var best = lib.skill.tianQiZheZhuFu
                        .getAiBestBlessing(player);
                    if(!best) return -1;
                    return best.score - get.value(card) * 0.7;
                },
                        "filter": function(event, player) {
                    if(!player.countCards('h', function(card) {
                        return lib.skill.tianQiZheZhuFu.filterCard(
                            card,
                            player
                        );
                    })) return false;
                    return game.hasPlayer(function(target) {
                        return target != player &&
                            target.side == player.side &&
                            lib.skill.tianQiZheZhuFuManager
                                .getAvailableCards(target).length > 0;
                    });
                },
                        "filterTarget": function(card, player, target) {
                    return target != player &&
                        target.side == player.side &&
                        lib.skill.tianQiZheZhuFuManager
                            .getAvailableCards(target).length > 0;
                },
                        "getAiMinDiscardValue": function(player, sacredOnly) {
                    var value = Infinity;
                    player.getCards('h', function(card) {
                        return lib.filter.cardDiscardable(card, player) &&
                            (!sacredOnly || get.mingGe(card) == 'sheng');
                    }).forEach(function(card) {
                        value = Math.min(value, get.value(card, player));
                    });
                    return value == Infinity ? 10 : value;
                },
                        "hasAiBaoShiSkill": function(player) {
                    var skills = player.getSkills ?
                        player.getSkills() : (player.skills || []);
                    return skills.some(function(skill) {
                        var info = lib.skill[skill];
                        return info && info.ai && info.ai.baoShi;
                    });
                },
                        "getAiBlessingScore": function(player, target, skill) {
                    if(!target || target == player ||
                        target.side != player.side) return -100;
                    var hand = target.countCards('h');
                    var handLimit = target.getHandcardLimit();
                    var healing = target.zhiLiao || 0;
                    var healingLimit = target.getZhiLiaoLimit();
                    var healingRoom = Math.max(0, healingLimit - healing);
                    var attacks = target.countCards('h', function(card) {
                        return get.type(card, target) == 'gongJi';
                    });
                    var canAttack = !target.canGongJi || target.canGongJi();
                    if(skill == 'shouHuHuiZhang') {
                        return 3.2 + (healing == 0 ? 2 : 0) +
                            (get.shiQi(target.side) <= 4 ? 1.2 : 0) +
                            Math.max(0, hand - handLimit + 1) * 0.6;
                    }
                    if(skill == 'wuQiZhuFu') {
                        return 1.2 + Math.min(3, attacks) * 0.55 +
                            (healingRoom == 0 ? 0.4 : 0);
                    }
                    if(skill == 'rongYuZhuFu') {
                        return 1.3 + (canAttack ? 0.8 : -0.8) +
                            Math.min(3, attacks) * 0.9 +
                            (get.shiQi(!target.side) <= 4 ? 0.8 : 0);
                    }
                    if(skill == 'tianQiZheTianShiZhuFu') {
                        var needsGem = lib.skill.tianQiZheZhuFu
                            .hasAiBaoShiSkill(target);
                        var score = needsGem ? 4.5 : 0.4;
                        if(target.countNengLiang('baoShi') == 0) {
                            score += needsGem ? 1.5 : 0;
                        }
                        return score;
                    }
                    return 0;
                },
                        "getAiBestBlessing": function(player) {
                    var best = null;
                    game.filterPlayer(function(target) {
                        return target != player && target.side == player.side;
                    }).forEach(function(target) {
                        lib.skill.tianQiZheZhuFuManager
                            .getAvailableCards(target)
                            .forEach(function(skill) {
                                var score = lib.skill.tianQiZheZhuFu
                                    .getAiBlessingScore(
                                        player,
                                        target,
                                        skill
                                    );
                                if(!best || score > best.score) {
                                    best = {
                                        target: target,
                                        skill: skill,
                                        score: score,
                                    };
                                }
                            });
                    });
                    return best;
                },
                        "content": async function(event, trigger, player) {
                    var available =
                        lib.skill.tianQiZheZhuFuManager
                            .getAvailableCards(event.target);
                    if(!available.length) return;
                    var controls = available.map(function(skill) {
                        return get.translation(skill);
                    });
                    var choiceList = available.map(function(skill) {
                        var name = get.translation(skill);
                        var info = lib.translate[skill + '_info'] ||
                            get.translation(skill + '_info');
                        return '<span class="yellowtext">' + name +
                            '</span>：' + info;
                    });
                    var control = await player.chooseControl(
                        controls
                    ).set(
                        'prompt',
                        '【祝福】：选择置于' +
                            get.translation(event.target) +
                            '面前的专属卡'
                    ).set(
                        'choiceList',
                        choiceList
                    ).set(
                        'displayIndex',
                        false
                    ).set(
                        'blessingTarget',
                        event.target
                    ).set(
                        'availableBlessings',
                        available
                    ).set('ai', function() {
                        var controls = _status.event.controls;
                        var available =
                            _status.event.availableBlessings || [];
                        var target = _status.event.blessingTarget;
                        var player = _status.event.player;
                        var bestIndex = 0;
                        var bestScore = -Infinity;
                        for(var i = 0; i < available.length; i++) {
                            var score = lib.skill.tianQiZheZhuFu
                                .getAiBlessingScore(
                                    player,
                                    target,
                                    available[i]
                                );
                            if(score > bestScore) {
                                bestScore = score;
                                bestIndex = i;
                            }
                        }
                        return controls[bestIndex] || controls[0];
                    }).forResultControl();
                    var index = controls.indexOf(control);
                    if(index >= 0) {
                        await lib.skill.tianQiZheZhuFuManager.addCard(
                            event.target,
                            available[index]
                        );
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                        var best = lib.skill.tianQiZheZhuFu
                            .getAiBestBlessing(player);
                        if(!best) return 0;
                        return best.score >= 4 ? 7 : 4.5;
                    },
                            "result": {
                                "target": function(player, target) {
                            var available = lib.skill
                                .tianQiZheZhuFuManager
                                .getAvailableCards(target);
                            var best = -100;
                            for(var i = 0; i < available.length; i++) {
                                best = Math.max(
                                    best,
                                    lib.skill.tianQiZheZhuFu
                                        .getAiBlessingScore(
                                            player,
                                            target,
                                            available[i]
                                        )
                                );
                            }
                            var cost = lib.skill.tianQiZheZhuFu
                                .getAiMinDiscardValue(player, true);
                            return best - cost * 0.7;
                        },
                            },
                        },
                    },
                    "shengYuZhiFeng": {
                        "audio": "ext:创世纪/audio/skill/tianQiZhe/shengYuZhiFeng.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "getAiValue": function(player) {
                    var handRoom = player.getHandcardLimit() -
                        player.countCards('h');
                    var overflow = Math.max(0, 2 - Math.max(0, handRoom));
                    var healValue = 0;
                    game.filterPlayer(function(target) {
                        return target.side == player.side;
                    }).forEach(function(target) {
                        if(target.zhiLiao < target.getZhiLiaoLimit()) {
                            healValue += get.zhiLiaoEffect2(
                                target,
                                player,
                                1
                            );
                        }
                    });
                    var drawCost = 2.2 + overflow * 2.5;
                    return healValue - drawCost;
                },
                        "content": async function(event, trigger, player) {
                    await player.draw(2);
                    var targets = game.filterPlayer(function(target) {
                        return target.side == player.side;
                    });
                    for(var i = 0; i < targets.length; i++) {
                        await targets[i].changeZhiLiao(1, player);
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                        var value = lib.skill.shengYuZhiFeng
                            .getAiValue(player);
                        return value > 0.6 ? (value >= 3 ? 6.2 : 3.2) : 0;
                    },
                            "result": {
                                "player": function(player) {
                            return lib.skill.shengYuZhiFeng
                                .getAiValue(player) - 0.6;
                        },
                            },
                        },
                    },
                    "tianQiZhiZhu": {
                        "audio": "ext:创世纪/audio/skill/tianQiZhe/tianQiZhiZhu.mp3",
                        "type": "qiDong",
                        "mark": true,
                        "marktext": "启",
                        "markimage": "extension/创世纪/mark_tianQiZhiZhu.webp",
                        "intro": {
                            "content": function(storage, player) {
                        if(!player.storage.tianQiZhiZhuToken) {
                            return '【天启之珠】尚未发动。';
                        }
                        return '本次【天启之珠】已触发专属卡' +
                            (player.storage.tianQiZhiZhuCount || 0) +
                            '次。';
                    },
                        },
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return !player.storage.tianQiZhiZhuToken &&
                        player.countNengLiang('baoShi') >= 2;
                },
                        "check": function(event, player) {
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return lib.skill.tianQiZhiZhu.getAiValue(player) >= 5;
                },
                        "getAiValue": function(player) {
                    var enemies = game.filterPlayer(function(target) {
                        return target.side != player.side;
                    });
                    var aoeValue = 0;
                    enemies.forEach(function(target) {
                        aoeValue += Math.max(0,
                            get.damageEffect2(target, player, 1));
                    });
                    var expectedTriggers = 0;
                    var immediateValue = 0;
                    game.filterPlayer(function(target) {
                        return target.side == player.side;
                    }).forEach(function(target) {
                        var attacks = target.countCards('h', function(card) {
                            return get.type(card, target) == 'gongJi';
                        });
                        var active = (!target.canGongJi ||
                            target.canGongJi()) && attacks > 0 ? 0.7 : 0.15;
                        var response = attacks > 0 ? 0.35 : 0.1;
                        var shield = target.zhiLiao == 0 ? 0.7 : 0.45;
                        var angel = lib.skill.tianQiZheZhuFu
                            .hasAiBaoShiSkill(target) ? 0.65 : 0.05;
                        expectedTriggers += active + response +
                            shield + angel;
                        immediateValue += active * 2.2 + response * 1.7 +
                            shield * 2.3 + angel * 2;
                    });
                    var value = immediateValue +
                        expectedTriggers * aoeValue - 4.5;
                    if(expectedTriggers > 0 && enemies.some(function(target) {
                        return get.shiQi(target.side) <=
                            Math.max(1, Math.floor(expectedTriggers));
                    })) value += 8;
                    return value;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeNengLiang('baoShi', 2);
                    game.tianQiZhiZhuSerial =
                        (game.tianQiZhiZhuSerial || 0) + 1;
                    var token = player.playerid + '_' +
                        game.tianQiZhiZhuSerial;
                    player.storage.tianQiZhiZhuToken = token;
                    player.storage.tianQiZhiZhuCount = 0;
                    player.syncStorage('tianQiZhiZhuToken');
                    player.syncStorage('tianQiZhiZhuCount');
                    player.markSkill('tianQiZhiZhu');
                    var manager = lib.skill.tianQiZheZhuFuManager;
                    var targets = game.filterPlayer(function(target) {
                        return target.side == player.side;
                    }).sortBySeat(player);
                    for(var i = 0; i < targets.length; i++) {
                        for(var j = 0; j < manager.cardSkills.length; j++) {
                            await manager.addCard(
                                targets[i],
                                manager.cardSkills[j],
                                player,
                                token
                            );
                        }
                    }
                },
                        "group": "tianQiZhiZhu_jieSuan",
                        "subSkill": {
                            "jieSuan": {
                                "trigger": {"player": "phaseBegin"},
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                            return !!player.storage.tianQiZhiZhuToken;
                        },
                                "content": async function(event, trigger, player) {
                            var token = player.storage.tianQiZhiZhuToken;
                            var count = player.storage.tianQiZhiZhuCount || 0;
                            await lib.skill.tianQiZheZhuFuManager
                                .removeApocalypseCards(token);
                            delete player.storage.tianQiZhiZhuToken;
                            delete player.storage.tianQiZhiZhuCount;
                            player.syncStorage('tianQiZhiZhuToken');
                            player.syncStorage('tianQiZhiZhuCount');
                            player.unmarkSkill('tianQiZhiZhu');
                            if(count <= 0) return;
                            var targets = game.filterPlayer(function(target) {
                                return target.side != player.side;
                            }).sortBySeat(player);
                            for(var i = 0; i < targets.length; i++) {
                                await targets[i].faShuDamage(
                                    count,
                                    player,
                                    'nocard'
                                );
                            }
                        },
                            },
                        },
                        "ai": {
                            "baoShi": true,
                        },
                    },
                    "tianQiZheZhuFuManager": {
                        "charlotte": true,
                        "init": function() {
                    [
                        'rongYuZhuFu',
                        'shouHuHuiZhang',
                        'wuQiZhuFu',
                        'tianQiZheTianShiZhuFu',
                    ].forEach(function(skill) {
                        game.addGlobalSkill(skill);
                    });
                },
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "firstDo": true,
                        "popup": false,
                        "content": function() {
                    lib.skill.tianQiZheZhuFuManager.init();
                },
                        "cardSkills": [
                            "rongYuZhuFu",
                            "shouHuHuiZhang",
                            "wuQiZhuFu",
                            "tianQiZheTianShiZhuFu",
                        ],
                        "cardNames": {
                            "rongYuZhuFu": "tianQiZheRongYuZhuFuKa",
                            "shouHuHuiZhang": "tianQiZheShouHuHuiZhangKa",
                            "wuQiZhuFu": "tianQiZheWuQiZhuFuKa",
                            "tianQiZheTianShiZhuFu": "tianQiZheTianShiZhuFuKa",
                        },
                        "hasCard": function(player, skill) {
                    return !!player &&
                        player.getExpansions(skill).length > 0;
                },
                        "addCard": async function(player, skill, source, token) {
                    var manager = lib.skill.tianQiZheZhuFuManager;
                    if(!player) return false;
                    if(manager.hasCard(player, skill)) {
                        var existing = player.getExpansions(skill)[0];
                        if(token && existing) {
                            existing.storage = existing.storage || {};
                            existing.storage.tianQiZhiZhuToken = token;
                            existing.storage.tianQiZhiZhuOwner =
                                source && source.playerid;
                        }
                        return true;
                    }
                    var cardName = manager.cardNames[skill];
                    if(!cardName) return false;
                    var card = game.createCard2(cardName);
                    card.storage = card.storage || {};
                    if(token) {
                        card.storage.tianQiZhiZhuToken = token;
                        card.storage.tianQiZhiZhuOwner =
                            source && source.playerid;
                    }
                    var next = player.addToExpansion(card, 'gain2');
                    next.gaintag.add(skill);
                    await next;
                    return manager.hasCard(player, skill);
                },
                        "removeCard": async function(player, skill) {
                    if(!player) return false;
                    var cards = player.getExpansions(skill);
                    if(!cards.length) return false;
                    var next = player.lose(cards, ui.special);
                    next.set('type', 'tianQiZheZhuFuRemove');
                    next.set('getlx', false);
                    await next;
                    if(!player.getExpansions(skill).length) {
                        player.unmarkSkill(skill);
                    }
                    return true;
                },
                        "getAvailableCards": function(player) {
                    return lib.skill.tianQiZheZhuFuManager
                        .cardSkills.filter(function(skill) {
                            return !lib.skill.tianQiZheZhuFuManager
                                .hasCard(player, skill);
                        });
                },
                        "recordTrigger": function(player, skill) {
                    var cards = player.getExpansions(skill);
                    for(var i = 0; i < cards.length; i++) {
                        var storage = cards[i].storage || {};
                        var token = storage.tianQiZhiZhuToken;
                        if(!token || !storage.tianQiZhiZhuOwner) continue;
                        var owner = game.filterPlayer(function(current) {
                            return current.playerid ==
                                storage.tianQiZhiZhuOwner;
                        })[0];
                        if(owner && owner.storage.tianQiZhiZhuToken == token) {
                            owner.storage.tianQiZhiZhuCount =
                                (owner.storage.tianQiZhiZhuCount || 0) + 1;
                            owner.syncStorage('tianQiZhiZhuCount');
                            owner.markSkill('tianQiZhiZhu');
                            game.log(owner, '的【天启之珠】计数+1');
                            return true;
                        }
                    }
                    return false;
                },
                        "removeApocalypseCards": async function(token) {
                    var manager = lib.skill.tianQiZheZhuFuManager;
                    var players = game.filterPlayer();
                    for(var i = 0; i < players.length; i++) {
                        for(var j = 0; j < manager.cardSkills.length; j++) {
                            var skill = manager.cardSkills[j];
                            var cards = players[i].getExpansions(skill)
                                .filter(function(card) {
                                    return card.storage &&
                                        card.storage.tianQiZhiZhuToken == token;
                                });
                            if(!cards.length) continue;
                            var next = players[i].lose(cards, ui.special);
                            next.set('type', 'tianQiZhiZhuExpire');
                            next.set('getlx', false);
                            await next;
                            if(!players[i].getExpansions(skill).length) {
                                players[i].unmarkSkill(skill);
                            }
                        }
                    }
                },
                    },
                    "rongYuZhuFu": {
                        "charlotte": true,
                        "markimage": "extension/创世纪/mark_rongYuZhuFu.webp",
                        "trigger": { source: 'zaoChengShangHai' },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event && event.faShu === true && event.source == player &&
                        lib.skill.tianQiZheZhuFuManager.hasCard(player, 'rongYuZhuFu');
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.tianQiZheZhuFuManager.recordTrigger(player, 'rongYuZhuFu');
                    await lib.skill.tianQiZheZhuFuManager.removeCard(player, 'rongYuZhuFu');
                    trigger.changeDamageNum(1);
                },
                        "intro": {
                            "name": "荣誉祝福",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'rongYuZhuFu'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.rongYuZhuFu_info;
                    },
                        },
                    },
                    "shouHuHuiZhang": {
                        "charlotte": true,
                        "markimage": "extension/创世纪/mark_shouHuHuiZhang.webp",
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.tianQiZheZhuFuManager
                        .hasCard(player, 'shouHuHuiZhang') &&
                        event.target == player &&
                        typeof event.damageNum == 'number' &&
                        event.damageNum > 0;
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.tianQiZheZhuFuManager.recordTrigger(
                        player,
                        'shouHuHuiZhang'
                    );
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'shouHuHuiZhang'
                    );
                    trigger.changeDamageNum(
                        -Math.min(2, trigger.damageNum)
                    );
                },
                        "intro": {
                            "name": "守护徽章",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'shouHuHuiZhang'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.shouHuHuiZhang_info;
                    },
                        },
                    },
                    "wuQiZhuFu": {
                        "charlotte": true,
                        "markimage": "extension/创世纪/mark_wuQiZhuFu.webp",
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return lib.skill.tianQiZheZhuFuManager.hasCard(player, 'wuQiZhuFu') && event.player == player;
                },
                        "content": async function(event, trigger, player) {
                    lib.skill.tianQiZheZhuFuManager.recordTrigger(
                        player,
                        'wuQiZhuFu'
                    );
                    await lib.skill.tianQiZheZhuFuManager.removeCard(
                        player,
                        'wuQiZhuFu'
                    );
                    trigger.changeDamageNum(2);
                },
                        "intro": {
                            "name": "武器祝福",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'wuQiZhuFu'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate.wuQiZhuFu_info;
                    },
                        },
                    },
                    "tianQiZheTianShiZhuFu": {
                        "charlotte": true,
                        "markimage": "extension/创世纪/mark_tianShiZhuFu.webp",
                        "intro": {
                            "name": "天使祝福",
                            "content": "expansion",
                            "markcount": "expansion",
                            "mark": function(dialog, storage, player) {
                        var cards = player.getExpansions(
                            'tianQiZheTianShiZhuFu'
                        );
                        if(cards.length) dialog.addAuto(cards);
                        return lib.translate
                            .tianQiZheTianShiZhuFu_info;
                    },
                        },
                    },
                    "xueQiWangSheng": {
                        "audio": "ext:创世纪/audio/skill/yuXueMoShen/xueQiWangSheng.mp3",
                        "trigger": {
                            "player": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event && event.num > 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu(
                        'yuXueMoShenXueQi',
                        Math.min(2, trigger.num)
                    );
                },
                    },
                    "xueQiHuanXing": {
                        "group": [
                            "xueQiHuanXing_gongJi",
                            "xueQiHuanXing_chengShou",
                        ],
                        "subSkill": {
                            "gongJi": {
                                "audio": "ext:创世纪/audio/skill/yuXueMoShen/xueQiHuanXing.mp3",
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                player.countZhiLiao() == 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                            "chengShou": {
                                "audio": "ext:创世纪/audio/skill/yuXueMoShen/xueQiHuanXing.mp3",
                                "trigger": {
                                    "player": "chengShouShangHaiBefore",
                                },
                                "forced": true,
                                "firstDo": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                player.countZhiLiao() == 0;
                        },
                                "content": function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        },
                            },
                        },
                    },
                    "shiHunZhiShou": {
                        "audio": "ext:创世纪/audio/skill/yuXueMoShen/shiHunZhiShou.mp3",
                        "trigger": {
                            "source": "chengShouShangHaiAfter",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return !!event && event.num > 0 && !!event.card &&
                        get.type(event.card) == 'gongJi';
                },
                        "content": async function(event, trigger, player) {
                    var before = player.countZhiLiao();
                    if(before < player.getZhiLiaoLimit()) {
                        await player.changeZhiLiao(1, player);
                    }
                    if(player.countZhiLiao() <= before) {
                        await player.addZhiShiWu(
                            'yuXueMoShenXueQi',
                            1
                        );
                    }
                },
                    },
                    "shiHunFengMoZhan": {
                        "audio": "ext:创世纪/audio/skill/yuXueMoShen/shiHunFengMoZhan.mp3",
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "filter": function(event, player) {
                    return !!event && event.yingZhan != true && !!event.target && player.countZhiShiWu('yuXueMoShenXueQi') >= 2;
                },
                        "cost": async function(event, trigger, player) {
                    event.result = await player.chooseBool(
                        '是否移除2【血气】，发动【嗜魂封魔斩】？'
                    ).set('ai', function() {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var target = trigger.target;
                        if(!target || target.side == player.side) return false;
                        var xiBie = get.xiBie(trigger.card);
                        var likelyResponse = target.countCards(
                            'h',
                            function(card) {
                                return get.type(card, target) == 'gongJi' &&
                                    (get.xiBie(card) == xiBie ||
                                        get.xiBie(card) == 'an');
                            }
                        ) > 0;
                        var discardValue = target.countCards('h') > 0;
                        return likelyResponse || discardValue ||
                            get.shiQi(!player.side) <= 2;
                    }).forResult();
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('yuXueMoShenXueQi', 2);
                    trigger.changeDamageNum(1);
                    if(player.countZhiShiWu('yuXueMoShenXueQi') < 2) return;
                    var extra = await player.chooseBool('嗜魂封魔斩：是否再移除2【血气】，令本次攻击无法应战？').set('ai', function() {
                        var player = _status.event.player, attack = _status.event.getTrigger();
                        return !!attack.target && attack.target.side != player.side;
                    }).forResultBool();
                    if(extra && player.countZhiShiWu('yuXueMoShenXueQi') >= 2) {
                        await player.removeZhiShiWu('yuXueMoShenXueQi', 2);
                        trigger.wuFaYingZhan();
                    }
                },
                    },
                    "siWangKangJu": {
                        "audio": "ext:创世纪/audio/skill/yuXueMoShen/siWangKangJu.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.countZhiLiao() == 0 && player.countZhiShiWu('yuXueMoShenXueQi') >= 2;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeZhiShiWu('yuXueMoShenXueQi', 2);
                    await player.changeZhiLiao(2, player);
                    if(player.countCards('h') >= 2) await player.chooseToDiscard('h', 2, true, '【死亡抗拒】：弃置2张牌');
                },
                        "ai": {
                            "order": 6,
                            "result": {
                                "player": 2,
                            },
                        },
                    },
                    "bengShanLieDiZhan": {
                        "audio": "ext:创世纪/audio/skill/yuXueMoShen/bengShanLieDiZhan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "selectTarget": 1,
                        "filter": function(event, player) {
                    return player.canBiShaShuiJing() &&
                        player.countZhiShiWu(
                            'yuXueMoShenXueQi'
                        ) >= 4 &&
                        game.hasPlayer(function(target) {
                            return target.side != player.side;
                        });
                },
                        "filterTarget": function(card, player, target) {
                    return target.side != player.side;
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.removeZhiShiWu(
                        'yuXueMoShenXueQi',
                        4
                    );
                    var primary = event.target;
                    var targets = game.players.slice();
                    if(primary && primary.isIn()) {
                        await primary.faShuDamage(
                            2,
                            player,
                            'nocard'
                        );
                    }
                    for(var target of targets) {
                        if(!target || !target.isIn() ||
                            target == primary ||
                            target.side == player.side) {
                            continue;
                        }
                        await target.faShuDamage(
                            1,
                            player,
                            'nocard'
                        );
                    }
                    await player.faShuDamage(
                        1,
                        player,
                        'nocard'
                    );
                },
                        "ai": {
                            "order": 4,
                            "result": {
                                "target": function(player, target) {
                            return get.damageEffect(target, 2);
                        },
                            },
                            "shuiJing": true,
                        },
                    },
                    "moYuXueSha": {
                        "audio": "ext:创世纪/audio/skill/yuXueMoShen/moYuXueSha.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() &&
                        !player.hasSkill('xueShaXingTai');
                },
                        "content": async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var count = player.countZhiLiao();
                    if(count > 0) {
                        await player.changeZhiLiao(
                            -count,
                            player
                        );
                    }
                    player.addSkill('xueShaJinLiao');
                    if(!player.isHengZhi()) {
                        await player.hengZhi();
                    }
                    player.storage.xueShaXingTaiPhaseCount = 0;
                    player.syncStorage('xueShaXingTaiPhaseCount');
                    player.addSkill('xueShaXingTai');
                },
                        "check": function(event, player) {
                    if(player.hasSkill('xueShaXingTai')) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    var enemies = game.countPlayer(function(target) {
                        return target.side != player.side;
                    });
                    return player.countZhiShiWu('yuXueMoShenXueQi') +
                        player.countZhiLiao() + enemies >= 4;
                },
                        "ai": {
                            "baoShi": true,
                        },
                        "onremove": function(player) {
                    if(player.hasSkill('xueShaXingTai')) {
                        player.removeSkill('xueShaXingTai');
                    } else {
                        if(player.isHengZhi()) player.chongZhi();
                        player.removeSkill('xueShaJinLiao');
                    }
                },
                    },
                    "xueShaJinLiao": {
                        "charlotte": true,
                        "trigger": {
                            "player": "changeZhiLiaoBefore",
                        },
                        "forced": true,
                        "firstDo": true,
                        "priority": 100,
                        "popup": false,
                        "filter": function(event, player) {
                    return !!event && event.num > 0;
                },
                        "content": function(event, trigger, player) {
                    trigger.cancel();
                },
                    },
                    "xueShaXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "intro": {
                            "name": "血刹形态",
                            "content": "不能获得【治疗】；任意角色每次承受实际伤害后，你+1【血气】。持续至你的下下个回合开始并结算终结效果。",
                        },
                        "markimage": "extension/创世纪/mark_xueShaXingTai.webp",
                        "group": [
                            "xueShaXingTai_xueQi",
                            "xueShaXingTai_jieSuan",
                        ],
                        "onremove": function(player) {
                    if(player.storage.xueShaXingTaiFinishing !== true) {
                        if(player.isHengZhi()) player.chongZhi();
                        player.removeSkill('xueShaJinLiao');
                    }
                    delete player.storage.xueShaXingTaiFinishing;
                    delete player.storage.xueShaXingTaiPhaseCount;
                },
                        "subSkill": {
                            "xueQi": {
                                "trigger": {
                                    "global": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return !!event &&
                                event.num > 0 &&
                                player.hasSkill('xueShaXingTai');
                        },
                                "content": async function(event, trigger, player) {
                            await player.addZhiShiWu(
                                'yuXueMoShenXueQi',
                                1
                            );
                        },
                            },
                            "jieSuan": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "filter": function(event, player) {
                            return player.hasSkill('xueShaXingTai');
                        },
                                "content": async function(event, trigger, player) {
                            player.storage.xueShaXingTaiPhaseCount =
                                (player.storage.xueShaXingTaiPhaseCount || 0) + 1;
                            player.syncStorage('xueShaXingTaiPhaseCount');
                            if(player.storage.xueShaXingTaiPhaseCount < 2) {
                                return;
                            }
                            var removed = player.countZhiShiWu(
                                'yuXueMoShenXueQi'
                            );
                            if(removed > 0) {
                                await player.removeZhiShiWu(
                                    'yuXueMoShenXueQi',
                                    removed
                                );
                            }
                            var targets = (await player.chooseTarget(
                                '魔狱血刹：指定一名对手',
                                true,
                                function(card, player, target) {
                                    return target.side != player.side;
                                }
                            ).set('ai', function(target) {
                                return get.damageEffect2(
                                    target,
                                    _status.event.player,
                                    Math.ceil(_status.event.removed / 2)
                                );
                            }).set(
                                'removed',
                                removed
                            ).forResultTargets() || []);
                            var primary = targets[0];
                            var others = game.players.slice();
                            try {
                                var damage = Math.ceil(removed / 2);
                                if(primary && primary.isIn()) {
                                    await primary.faShuDamage(
                                        damage,
                                        player,
                                        'nocard'
                                    );
                                }
                                if(removed >= 6) {
                                    for(var target of others) {
                                        if(!target || !target.isIn() ||
                                            target == primary ||
                                            target.side == player.side) {
                                            continue;
                                        }
                                        await target.faShuDamage(
                                            1,
                                            player,
                                            'nocard'
                                        );
                                    }
                                }
                            } finally {
                                player.storage.xueShaXingTaiFinishing = true;
                                if(player.isHengZhi()) {
                                    await player.chongZhi();
                                }
                                player.removeSkill('xueShaXingTai');
                                delete player.storage.xueShaXingTaiFinishing;
                                player.removeSkill('xueShaJinLiao');
                            }
                        },
                            },
                        },
                    },
                    "yuXueMoShenXueQi": {
                        "intro": {
                            "name": "血气",
                            "content": "mark",
                            "max": 8,
                        },
                        "onremove": "storage",
                        "markimage": "extension/创世纪/mark_xueQi.webp",
                    },
                    "xiLuFeiShengLingFuWen": {
                        "audio": false,
                        "runeData": {
                            "huo": {
                                "mark": "xiLuFeiHuoZhiFuWen",
                                "displayName": "火之符文",
                                "litImage": "extension/创世纪/mark_huoZhiFuWen.webp",
                                "dimImage": "extension/创世纪/mark_huoZhiFuWen_dim.webp",
                                "low": "xiLuFeiJieKeBaoDan",
                                "high": "xiLuFeiJieKeJiangLin",
                            },
                            "shui": {
                                "mark": "xiLuFeiShuiZhiFuWen",
                                "displayName": "水之符文",
                                "litImage": "extension/创世纪/mark_shuiZhiFuWen.webp",
                                "dimImage": "extension/创世纪/mark_shuiZhiFuWen_dim.webp",
                                "low": "xiLuFeiBingShuangXueRen",
                                "high": "xiLuFeiJiBingShengYan",
                            },
                            "guang": {
                                "mark": "xiLuFeiGuangZhiFuWen",
                                "displayName": "光之符文",
                                "litImage": "extension/创世纪/mark_guangZhiFuWen.webp",
                                "dimImage": "extension/创世纪/mark_guangZhiFuWen_dim.webp",
                                "low": "xiLuFeiGuangDianMan",
                                "high": "xiLuFeiTianLei",
                            },
                            "an": {
                                "mark": "xiLuFeiAnZhiFuWen",
                                "displayName": "暗之符文",
                                "litImage": "extension/创世纪/mark_anZhiFuWen.webp",
                                "dimImage": "extension/创世纪/mark_anZhiFuWen_dim.webp",
                                "low": "xiLuFeiAnYingYeMao",
                                "high": "xiLuFeiYanMieHeiDong",
                            },
                        },
                        "ensureState": function(player) {
                            var state = player.storage.xiLuFeiFuWenState;
                            if(!state || typeof state != "object") {
                                state = {
                                    huo: false,
                                    shui: false,
                                    guang: false,
                                    an: false,
                                };
                                player.storage.xiLuFeiFuWenState = state;
                            }
                            return state;
                        },
                        "isLit": function(player, rune) {
                            var state = lib.skill.xiLuFeiShengLingFuWen
                                .ensureState(player);
                            return state[rune] === true;
                        },
                        "getRunes": function(player, lit) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var state = manager.ensureState(player);
                            return Object.keys(manager.runeData).filter(
                                function(rune) {
                                    return state[rune] === (lit === true);
                                }
                            );
                        },
                        "syncMarkImage": function(player, rune) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var data = manager.runeData[rune];
                            if(!data || !player) return;
                            var image = manager.isLit(player, rune) ?
                                data.litImage : data.dimImage;
                            var mark = player.marks && player.marks[data.mark];
                            if(mark) mark.setBackgroundImage(image);
                            game.broadcastAll(function(target, markName, path) {
                                if(target && target.marks && target.marks[markName]) {
                                    target.marks[markName].setBackgroundImage(path);
                                }
                            }, player, data.mark, image);
                        },
                        "hasCostCard": function(player, xiBie, skill) {
                            return player.countCards("h", function(card) {
                                return get.xiBie(card) === xiBie &&
                                    lib.filter.cardDiscardable(
                                        card,
                                        player,
                                        skill
                                    );
                            }) > 0;
                        },
                        "syncSpell": function(player, rune) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var data = manager.runeData[rune];
                            if(!data) return;
                            if(manager.isLit(player, rune)) {
                                if(player.hasSkill(data.low)) {
                                    player.removeSkill(data.low);
                                }
                                if(!player.hasSkill(data.high)) {
                                    player.addSkill(data.high);
                                }
                            } else {
                                if(player.hasSkill(data.high)) {
                                    player.removeSkill(data.high);
                                }
                                if(!player.hasSkill(data.low)) {
                                    player.addSkill(data.low);
                                }
                            }
                            if(player.hasSkill(data.mark)) {
                                player.markSkill(data.mark);
                                manager.syncMarkImage(player, rune);
                            }
                        },
                        "setLit": function(player, rune, lit) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var state = manager.ensureState(player);
                            if(!manager.runeData[rune]) return;
                            state[rune] = lit === true;
                            player.syncStorage("xiLuFeiFuWenState");
                            manager.syncSpell(player, rune);
                        },
                        "init": function(player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            manager.ensureState(player);
                            player.syncStorage("xiLuFeiFuWenState");
                            Object.keys(manager.runeData).forEach(
                                function(rune) {
                                    manager.syncSpell(player, rune);
                                }
                            );
                            if(typeof player.storage.xiLuFeiFaShuCount != "number") {
                                player.storage.xiLuFeiFaShuCount = 0;
                            }
                            player.syncStorage("xiLuFeiFaShuCount");
                        },
                        "trigger": {
                            "global": "gameStart",
                        },
                        "forced": true,
                        "popup": false,
                        "content": function(event, trigger, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            Object.keys(manager.runeData).forEach(
                                function(rune) {
                                    manager.syncSpell(player, rune);
                                }
                            );
                            game.broadcastAll(function(speaker) {
                                if(!lib.config.background_speak) return;
                                game.playAudio({
                                    path: 'ext:创世纪/audio/skill/xiLuFei/' +
                                        'shengLingFuWen.mp3',
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, player);
                        },
                        "onremove": function(player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            Object.keys(manager.runeData).forEach(
                                function(rune) {
                                    var data = manager.runeData[rune];
                                    player.removeSkill(data.high);
                                    if(!player.hasSkill(data.low)) {
                                        player.addSkill(data.low);
                                    }
                                }
                            );
                            delete player.storage.xiLuFeiFuWenState;
                            delete player.storage.xiLuFeiFaShuCount;
                        },
                    },
                    "xiLuFeiJieKeBaoDan": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/jieKeBaoDan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "huo" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiJieKeBaoDan"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return !manager.isLit(player, "huo") &&
                                manager.hasCostCard(
                                    player,
                                    "huo",
                                    "xiLuFeiJieKeBaoDan"
                                ) &&
                                game.hasPlayer(function(target) {
                                    return target.side !== player.side;
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn() && target.side !== player.side;
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.target;
                            if(target && target.isIn()) {
                                await target.faShuDamage(1, player, "nocard");
                            }
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "huo",
                                true
                            );
                        },
                        "ai": {
                            "order": 3.5,
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "xiLuFeiJieKeJiangLin": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/jieKeJiangLin.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "huo" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiJieKeJiangLin"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return manager.isLit(player, "huo") &&
                                manager.hasCostCard(
                                    player,
                                    "huo",
                                    "xiLuFeiJieKeJiangLin"
                                ) && game.hasPlayer(function(target) {
                                    return target.side !== player.side;
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn() && target.side !== player.side;
                        },
                        "content": async function(event, trigger, player) {
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "huo",
                                false
                            );
                            var target = event.target;
                            if(target && target.isIn()) {
                                await target.faShuDamage(1, player, "nocard");
                            }
                        },
                        "ai": {
                            "order": 4.2,
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "xiLuFeiBingShuangXueRen": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/bingShuangXueRen.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "shui" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiBingShuangXueRen"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return !manager.isLit(player, "shui") &&
                                manager.hasCostCard(
                                    player,
                                    "shui",
                                    "xiLuFeiBingShuangXueRen"
                                ) && game.hasPlayer(function(target) {
                                    return target.side === player.side;
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn() && target.side === player.side;
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.target;
                            if(target && target.isIn()) {
                                await target.changeZhiLiao(1, player);
                            }
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "shui",
                                true
                            );
                        },
                        "ai": {
                            "order": 3.4,
                            "result": {
                                "target": function(player, target) {
                                    return get.attitude(player, target) *
                                        get.zhiLiaoEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "xiLuFeiJiBingShengYan": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/jiBingShengYan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "shui" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiJiBingShengYan"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return manager.isLit(player, "shui") &&
                                manager.hasCostCard(
                                    player,
                                    "shui",
                                    "xiLuFeiJiBingShengYan"
                                ) && game.countPlayer(function(target) {
                                    return target.side !== player.side;
                                }) >= 2 && game.hasPlayer(function(target) {
                                    return target.side === player.side;
                                });
                        },
                        "selectTarget": 2,
                        "multitarget": true,
                        "filterTarget": function(card, player, target) {
                            return target.isIn() && target.side !== player.side;
                        },
                        "content": async function(event, trigger, player) {
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "shui",
                                false
                            );
                            var targets = Array.isArray(event.targets) ?
                                event.targets.slice() : [];
                            for(var i = 0; i < targets.length; i++) {
                                if(targets[i] && targets[i].isIn()) {
                                    await targets[i].faShuDamage(
                                        1,
                                        player,
                                        "nocard"
                                    );
                                }
                            }
                            var allies = await player.chooseTarget(
                                true,
                                "极冰盛宴：令1名我方角色+1【治疗】",
                                function(card, player, target) {
                                    return target.isIn() &&
                                        target.side === player.side;
                                }
                            ).set("ai", function(target) {
                                var player = _status.event.player;
                                return get.attitude(player, target) *
                                    get.zhiLiaoEffect2(target, player, 1);
                            }).forResultTargets();
                            var ally = allies && allies[0];
                            if(ally && ally.isIn()) {
                                await ally.changeZhiLiao(1, player);
                            }
                        },
                        "ai": {
                            "order": 4.1,
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "xiLuFeiGuangDianMan": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/guangDianMan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "guang" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiGuangDianMan"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return !manager.isLit(player, "guang") &&
                                manager.hasCostCard(
                                    player,
                                    "guang",
                                    "xiLuFeiGuangDianMan"
                                ) && game.hasPlayer(function(target) {
                                    return target.isIn();
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.target;
                            if(target && target.isIn()) {
                                await target.addNengLiang("shuiJing", 1);
                            }
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "guang",
                                true
                            );
                        },
                        "ai": {
                            "order": 3.7,
                            "result": {
                                "target": function(player, target) {
                                    return get.attitude(player, target) * 1.5;
                                },
                            },
                        },
                    },
                    "xiLuFeiTianLei": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/tianLei.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "guang" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiTianLei"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return manager.isLit(player, "guang") &&
                                manager.hasCostCard(
                                    player,
                                    "guang",
                                    "xiLuFeiTianLei"
                                ) && game.hasPlayer(function(target) {
                                    return target.side !== player.side;
                                }) && game.hasPlayer(function(target) {
                                    return target.side === player.side;
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn() && target.side !== player.side;
                        },
                        "content": async function(event, trigger, player) {
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "guang",
                                false
                            );
                            var target = event.target;
                            if(target && target.isIn()) {
                                await target.faShuDamage(2, player, "nocard");
                            }
                            var allies = await player.chooseTarget(
                                true,
                                "天雷：令1名我方角色+1【宝石】",
                                function(card, player, target) {
                                    return target.isIn() &&
                                        target.side === player.side;
                                }
                            ).set("ai", function(target) {
                                var player = _status.event.player;
                                return get.attitude(player, target) * 1.5;
                            }).forResultTargets();
                            var ally = allies && allies[0];
                            if(ally && ally.isIn()) {
                                await ally.addNengLiang("baoShi", 1);
                            }
                        },
                        "ai": {
                            "order": 4.2,
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 2);
                                },
                            },
                        },
                    },
                    "xiLuFeiAnYingYeMao": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/anYingYeMao.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "an" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiAnYingYeMao"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return !manager.isLit(player, "an") &&
                                manager.hasCostCard(
                                    player,
                                    "an",
                                    "xiLuFeiAnYingYeMao"
                                ) && game.hasPlayer(function(target) {
                                    return target.isIn();
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.target;
                            if(target && target.isIn()) await target.draw(2);
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "an",
                                true
                            );
                        },
                        "ai": {
                            "order": 3.2,
                            "result": {
                                "target": function(player, target) {
                                    return get.attitude(player, target) * 1.8;
                                },
                            },
                        },
                    },
                    "xiLuFeiYanMieHeiDong": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/yanMieHeiDong.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "showCards": true,
                        "filterCard": function(card, player) {
                            return get.xiBie(card) === "an" &&
                                lib.filter.cardDiscardable(
                                    card,
                                    player,
                                    "xiLuFeiYanMieHeiDong"
                                );
                        },
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return manager.isLit(player, "an") &&
                                manager.hasCostCard(
                                    player,
                                    "an",
                                    "xiLuFeiYanMieHeiDong"
                                ) && game.hasPlayer(function(target) {
                                    return target.side !== player.side &&
                                        !target.hasJiChuXiaoGuo("_xuRuo");
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn() &&
                                target.side !== player.side &&
                                !target.hasJiChuXiaoGuo("_xuRuo");
                        },
                        "content": async function(event, trigger, player) {
                            await lib.skill.xiLuFeiShengLingFuWen.setLit(
                                player,
                                "an",
                                false
                            );
                            var target = event.target;
                            if(!target || !target.isIn()) return;
                            await lib.chuangShiJiUseTemporaryEffectCard(
                                player,
                                "xuRuo",
                                target
                            );
                            if(target.isIn()) await target.draw(1);
                        },
                        "ai": {
                            "order": 4.1,
                            "result": {
                                "target": function(player, target) {
                                    return get.attitude(player, target) < 0 ? 2 : -2;
                                },
                            },
                        },
                    },
                    "xiLuFeiMoFaXiu": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/moFaXiu.mp3",
                        "trigger": {
                            "player": "faShuEnd",
                        },
                        "filter": function(event, player) {
                            return lib.skill.xiLuFeiShengLingFuWen
                                .getRunes(player, true).length >= 2;
                        },
                        "cost": async function(event, trigger, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var bright = manager.getRunes(player, true);
                            if(bright.length < 2) {
                                event.result = { bool: false };
                                return;
                            }
                            var confirm = await player.chooseBool(
                                "是否熄灭任意2枚明亮的【圣灵符文】，发动【魔法秀】？"
                            ).set("ai", function() {
                                return true;
                            }).forResult();
                            if(!confirm || !confirm.bool) {
                                event.result = { bool: false };
                                return;
                            }
                            var buttons = bright.map(function(rune) {
                                return [
                                    rune,
                                    manager.runeData[rune].displayName,
                                ];
                            });
                            var result = await player.chooseButton(
                                [
                                    "魔法秀：选择熄灭的2枚【圣灵符文】",
                                    [buttons, "tdnodes"],
                                ],
                                2,
                                true
                            ).set("ai", function() {
                                return 1;
                            }).forResult();
                            var runes = result && result.links || [];
                            event.result = {
                                bool: runes.length === 2,
                                cost_data: runes,
                            };
                        },
                        "content": async function(event, trigger, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var runes = Array.isArray(event.cost_data) ?
                                Array.from(new Set(event.cost_data)) : [];
                            runes = runes.filter(function(rune) {
                                return manager.isLit(player, rune);
                            });
                            if(runes.length !== 2) return;
                            for(var i = 0; i < runes.length; i++) {
                                await manager.setLit(player, runes[i], false);
                            }
                            await player.addFaShu();
                        },
                    },
                    "xiLuFeiYuanSuZhiMen": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/yuanSuZhiMen.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            return player.canBiShaShuiJing() &&
                                manager.getRunes(player, false).length > 0 &&
                                game.hasPlayer(function(target) {
                                    return target.side !== player.side;
                                });
                        },
                        "filterTarget": function(card, player, target) {
                            return target.isIn() && target.side !== player.side;
                        },
                        "content": async function(event, trigger, player) {
                            await player.removeBiShaShuiJing();
                            var target = event.target;
                            if(target && target.isIn()) {
                                await target.faShuDamage(1, player, "nocard");
                            }
                            var manager = lib.skill.xiLuFeiShengLingFuWen;
                            var dim = manager.getRunes(player, false);
                            if(!dim.length) return;
                            var buttons = dim.map(function(rune) {
                                return [
                                    rune,
                                    manager.runeData[rune].displayName,
                                ];
                            });
                            var result = await player.chooseButton(
                                [
                                    "元素之门：点亮1枚黯淡的【圣灵符文】",
                                    [buttons, "tdnodes"],
                                ],
                                1,
                                true
                            ).set("ai", function() {
                                return 1;
                            }).forResult();
                            var rune = result && result.links &&
                                result.links[0];
                            if(rune && dim.includes(rune)) {
                                await manager.setLit(player, rune, true);
                            }
                        },
                        "ai": {
                            "order": 3.9,
                            "result": {
                                "target": function(player, target) {
                                    return get.damageEffect2(target, player, 1);
                                },
                            },
                        },
                    },
                    "xiLuFeiFaShuCounter": {
                        "audio": false,
                        "charlotte": true,
                        "group": [
                            "xiLuFeiFaShuCounter_record",
                            "xiLuFeiFaShuCounter_reset",
                        ],
                        "subSkill": {
                            "record": {
                                "audio": false,
                                "charlotte": true,
                                "trigger": {
                                    "player": "faShuEnd",
                                },
                                "forced": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                                    player.storage.xiLuFeiFaShuCount =
                                        (player.storage.xiLuFeiFaShuCount || 0) + 1;
                                    player.syncStorage("xiLuFeiFaShuCount");
                                },
                            },
                            "reset": {
                                "audio": false,
                                "charlotte": true,
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "forced": true,
                                "popup": false,
                                "firstDo": true,
                                "content": function(event, trigger, player) {
                                    player.storage.xiLuFeiFaShuCount = 0;
                                    player.syncStorage("xiLuFeiFaShuCount");
                                },
                            },
                        },
                    },
                    "xiLuFeiDiLiuYuanSu": {
                        "audio": "ext:创世纪/audio/skill/xiLuFei/diLiuYuanSu.mp3",
                        "trigger": {
                            "player": "phaseEnd",
                        },
                        "filter": function(event, player) {
                            return (player.storage.xiLuFeiFaShuCount || 0) > 0 &&
                                player.canBiShaBaoShi() &&
                                game.hasPlayer(function(target) {
                                    return target.side !== player.side;
                                });
                        },
                        "cost": async function(event, trigger, player) {
                            var count = player.storage.xiLuFeiFaShuCount || 0;
                            if(count <= 0 || !player.canBiShaBaoShi()) {
                                event.result = { bool: false };
                                return;
                            }
                            var result = await player.chooseTarget(
                                "是否支付1【宝石】，发动【第六元素】？对1名对手造成" +
                                    count + "点法术伤害。",
                                function(card, player, target) {
                                    return target.isIn() &&
                                        target.side !== player.side;
                                }
                            ).set("xiLuFeiSpellCount", count).set(
                                "ai",
                                function(target) {
                                    var player = _status.event.player;
                                    var count = _status.event.xiLuFeiSpellCount;
                                    return get.damageEffect2(
                                        target,
                                        player,
                                        count
                                    );
                                }
                            ).forResult();
                            event.result = {
                                bool: !!(result && result.bool &&
                                    result.targets && result.targets.length),
                                targets: result && result.targets || [],
                                cost_data: count,
                            };
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.targets && event.targets[0];
                            var count = event.cost_data;
                            if(!target || !target.isIn() ||
                                typeof count !== "number" || count <= 0 ||
                                !player.canBiShaBaoShi()) return;
                            await player.removeBiShaBaoShi();
                            if(target.isIn()) {
                                await target.faShuDamage(count, player, "nocard");
                            }
                        },
                        "ai": {
                            "check": function(event, player) {
                                return (player.storage.xiLuFeiFaShuCount || 0) >= 2;
                            },
                        },
                    },
                    "xiLuFeiHuoZhiFuWen": {
                        "audio": false,
                        "charlotte": true,
                        "mark": true,
                        "marktext": "火",
                        "markimage": "extension/创世纪/mark_huoZhiFuWen.webp",
                        "intro": {
                            "name": "火之符文",
                            "content": function(storage, player) {
                                return lib.skill.xiLuFeiShengLingFuWen
                                    .isLit(player, "huo") ?
                                    "明亮：可以发动【杰克降临】。" :
                                    "黯淡：可以发动【杰克爆弹】。";
                            },
                        },
                    },
                    "xiLuFeiShuiZhiFuWen": {
                        "audio": false,
                        "charlotte": true,
                        "mark": true,
                        "marktext": "水",
                        "markimage": "extension/创世纪/mark_shuiZhiFuWen.webp",
                        "intro": {
                            "name": "水之符文",
                            "content": function(storage, player) {
                                return lib.skill.xiLuFeiShengLingFuWen
                                    .isLit(player, "shui") ?
                                    "明亮：可以发动【极冰盛宴】。" :
                                    "黯淡：可以发动【冰霜雪人】。";
                            },
                        },
                    },
                    "xiLuFeiGuangZhiFuWen": {
                        "audio": false,
                        "charlotte": true,
                        "mark": true,
                        "marktext": "光",
                        "markimage": "extension/创世纪/mark_guangZhiFuWen.webp",
                        "intro": {
                            "name": "光之符文",
                            "content": function(storage, player) {
                                return lib.skill.xiLuFeiShengLingFuWen
                                    .isLit(player, "guang") ?
                                    "明亮：可以发动【天雷】。" :
                                    "黯淡：可以发动【光电鳗】。";
                            },
                        },
                    },
                    "xiLuFeiAnZhiFuWen": {
                        "audio": false,
                        "charlotte": true,
                        "mark": true,
                        "marktext": "暗",
                        "markimage": "extension/创世纪/mark_anZhiFuWen.webp",
                        "intro": {
                            "name": "暗之符文",
                            "content": function(storage, player) {
                                return lib.skill.xiLuFeiShengLingFuWen
                                    .isLit(player, "an") ?
                                    "明亮：可以发动【湮灭黑洞】。" :
                                    "黯淡：可以发动【暗影夜猫】。";
                            },
                        },
                    },
                },
                "translate": {
                    "moFaHuDun": "被动【魔法护盾】",
                    "moFaHuDun_info": "<span class='tiaoJian'>（拥有【圣盾】时）</span>你承受的法术伤害-1⑤。",
                    "xuanWenShengCheng": "响应【炫纹生成】",
                    "xuanWenShengCheng_info": "<span class='tiaoJian'>（火系或水系攻击命中时②，或打出【暗灭】【圣光】时）</span>将对应牌面向上置于角色旁作为【炫纹】。",
                    "xuanWen": "炫纹",
                    "xuanWen_info": "贝亚娜斗神的专属牌，上限为9；达到上限后不能继续生成。",
                    "ziDongXuanWen": "响应【自动炫纹】",
                    "ziDongXuanWen_info": "<span class='tiaoJian'>（对方士气下降时）</span>将1张手牌置于角色旁作为【炫纹】，摸2张牌【强制】。",
                    "huangLongYanYue": "响应【煌龙偃月】",
                    "huangLongYanYue_info": "【回合限定】<span class='tiaoJian'>（主动攻击命中时②）</span>对攻击目标造成X点法术伤害③；X为你的暗系与光系【炫纹】数量之和，最多为2。",
                    "bianShenBeiYaNa": "启动【变身贝亚娜】",
                    "bianShenBeiYaNa_info": "【持续】<span class='lan'>【水晶】</span><span class='tiaoJian'>（移除2【炫纹】）</span>【横置】：所有【炫纹】视为暗系；不能执行【法术行动】；除【圣光】外，所有牌均视为对应系攻击牌【强制】。<span class='tiaoJian'>（我方士气下降时）</span>【重置】并+1【治疗】。",
                    "xuanWenQiangYa": "法术【炫纹强压】",
                    "xuanWenQiangYa_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（移除全部【炫纹】）</span>对所有对手各造成X点法术伤害③；X为移除数量的一半，向上取整。",
                    "xuanWenFaShe": "响应【炫纹发射】",
                    "xuanWenFaShe_info": "<span class='tiaoJian'>（主动攻击造成实际伤害时⑤，移除最新的1【炫纹】）</span>按其系别结算：<br>水：目标角色弃1张牌。<br>火：对目标角色造成1点法术伤害③。<br>暗：对目标角色造成2点法术伤害③。<br>光：+1【攻击行动】或【法术行动】。",
                    "nianQi": "念气",
                    "nianQi_info": "<span class='hong'>【念气】</span>为百花缭乱专属指示物，上限为8。",
                    "nianQiHuanRao": "被动【念气环绕】",
                    "nianQiHuanRao_info": "<span class='tiaoJian'>（你的【法术行动】结束后）</span>+1<span class='hong'>【念气】</span>。",
                    "guangZhiQinHe": "被动【光之亲和】",
                    "guangZhiQinHe_info": "你的【治疗】上限+1；你不能成为【虚弱】或【中毒】的目标。",
                    "nianQiBo": "法术【念气波】",
                    "nianQiBo_info": "<span class='tiaoJian'>（弃置1张法术牌或咏类命格牌【展示】）</span>你与目标对手各受到2点法术伤害③，然后+1<span class='hong'>【念气】</span>。",
                    "nianQiZhao": "法术【念气罩】",
                    "nianQiZhao_info": "选择1名我方角色，再选择一项：<br>·移除2<span class='hong'>【念气】</span>；<br>·摸2张牌【强制】。<br>随后目标+2【治疗】，弃1张牌。",
                    "nianZhiAoYi": "启动【念之奥义】",
                    "nianZhiAoYi_info": "【持续】<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（移除全部【治疗】）</span>将手牌补至上限【强制】，然后【横置】。<br><span class='tiaoJian'>（此形态下）</span>不能获得<span class='hong'>【念气】</span>，<span class='tiaoJian'>（【法术行动】结束后）</span>若有<span class='hong'>【念气】</span>，移除1<span class='hong'>【念气】</span>，+1【法术行动】；回合结束时【重置】。<br>直到你的下个回合开始前，对方士气最少为1【强制】。",
                    "nianZhiAoYi_effect": "念之奥义",
                    "nianZhiAoYi_effect_info": "不能获得【念气】；<span class='tiaoJian'>（每次【法术行动】结束后）</span>若有【念气】，移除1【念气】，额外+1【法术行动】；回合结束时【重置】。",
                    "nianZhiAoYi_shiQi": "念之奥义·士气保护",
                    "nianZhiAoYi_shiQi_info": "直到百花缭乱的下个回合开始前，对方士气最少为1【强制】。",
                    "shiYanCaiLiao": "实验材料",
                    "shiYanCaiLiao_info": "<span style=\"color:#80602C\">【实验材料】</span>为露米娅的专属盖牌，上限为3，材料已满时，可以选择弃置更换。",
                    "luMiYaYanJiu": "研究",
                    "luMiYaYanJiu_info": "<span class='hong'>【研究】</span>为露米娅的专属指示物，上限为3。",
                    "faMiLiErShiYanShi": "被动【法米利尔实验室】",
                    "faMiLiErShiYanShi_info": "<span class='tiaoJian'>（游戏开始时）</span>将牌库顶2张牌面朝下置为<span style=\"color:#80602C\">【实验材料】</span>。<br><span class='tiaoJian'>（【特殊行动】结束后）</span>放置牌库顶1张作为<span style=\"color:#80602C\">【实验材料】</span>。",
                    "luMiYaShiYan": "被动【实验】",
                    "luMiYaShiYan_info": "<span class='tiaoJian'>（进行实验时，移除并展示符合需求的1张</span><span style=\"color:#80602C\">【实验材料】</span><span class='tiaoJian'>）</span>再展示牌库顶1张牌：<br>与任一需求系别相同：【大成功】；<br>与需求系别不同的法术牌：【成功】；<br>与需求系别不同的攻击牌：【失败】。<br>按最终结果结算；若仍为【失败】，+1<span class='hong'>【研究】</span>。",
                    "xingYunBangBangTang": "响应【幸运棒棒糖】",
                    "xingYunBangBangTang_info": "<span class='tiaoJian'>（实验的初始结果确定后）</span>每次实验限1次，选择一个效果发动：<br>移除1<span class='hong'>【研究】</span>，将【失败】改为【成功】；<br>移除2<span class='hong'>【研究】</span>，将【成功】改为【大成功】。",
                    "gaiLiangMoFaXingDan": "响应【改良魔法星弹】",
                    "gaiLiangMoFaXingDan_info": "<span class='tiaoJian'>（你的【魔弹】造成实际伤害后）</span>选择一项：<br>所有我方角色各+1【治疗】；<br>对所有对手各造成1点法术伤害③。",
                    "saoBaZhangWo": "被动【扫把掌握】",
                    "saoBaZhangWo_info": "<span class='tiaoJian'>（【特殊行动】结束后）</span>+1【攻击行动】：此次攻击伤害-1，<span class='tiaoJian'>（若未命中）</span>将攻击牌面朝下置为<span style=\"color:#80602C\">【实验材料】</span>。",
                    "xuanZhuanSaoBa": "响应【旋转扫把】",
                    "xuanZhuanSaoBa_info": "<span class='tiaoJian'>（主动攻击或应战攻击命中后②，移除1张风系</span><span style=\"color:#80602C\">【实验材料】</span><span class='tiaoJian'>）</span>进行实验，Y为本次攻击伤害：<br>失败：对自己造成Y点攻击伤害。<br>成功：对至多1名原目标以外的对手造成Y点攻击伤害。<br>大成功：对至多2名原目标以外的对手各造成Y点攻击伤害。",
                    "rongYanYaoPing": "法术【熔岩药瓶】",
                    "rongYanYaoPing_info": "<span class='tiaoJian'>（移除1张火系或地系</span><span style=\"color:#80602C\">【实验材料】</span><span class='tiaoJian'>）</span>进行实验：<br>失败：对自己造成1点法术伤害③。<br>成功：对目标角色造成2点法术伤害③。<br>大成功：对目标角色造成3点法术伤害③。",
                    "suanYuYun": "法术【酸雨云】",
                    "suanYuYun_info": "<span class='tiaoJian'>（移除1张水系</span><span style=\"color:#80602C\">【实验材料】</span><span class='tiaoJian'>）</span>进行实验：<br>失败：摸1张牌【强制】。<br>成功：目标角色弃置1张牌。<br>大成功：至多选择2名角色各弃置1张牌。",
                    "dianManPengZhuangJi": "响应【电鳗碰撞机】",
                    "dianManPengZhuangJi_info": "<span class='tiaoJian'>（【法术行动】结束后，移除1张雷系或光系</span><span style=\"color:#80602C\">【实验材料】</span><span class='tiaoJian'>）</span>进行实验：<br>失败：你摸1张牌【强制】。<br>成功：+1【攻击行动】。<br>大成功：+1【法术行动】。",
                    "fanZhongLiZhuangZhi": "法术【反重力装置】",
                    "fanZhongLiZhuangZhi_info": "<span class='tiaoJian'>（移除1张暗系</span><span style=\"color:#80602C\">【实验材料】</span><span class='tiaoJian'>）</span>进行实验：<br>失败：对自己造成1点法术伤害③，摸1张牌【强制】。<br>成功：对合法目标角色使用1张【虚弱】。<br>大成功：目标角色摸3张牌【强制】。",
                    "jiYiRongHe": "启动【技艺融合】",
                    "jiYiRongHe_info": "<span class='lan'>【水晶】</span>从你开始，我方角色按座次依次弃置1张手牌。每张弃牌均可面朝下置为<span style=\"color:#80602C\">【实验材料】</span>。然后你+1<span class='hong'>【研究】</span>；若实际支付<span style=\"color:#E02B17\">【宝石】</span>，额外将<span class='hong'>【研究】</span>补至上限。",
                    "shouHuEnCi": "被动【守护恩赐】",
                    "shouHuEnCi_info": "你的【治疗】上限+2。",
                    "lingHunXiSheng": "响应【灵魂牺牲】",
                    "lingHunXiSheng_info": "<span class='tiaoJian'>（你因承受伤害令我方士气下降时）</span>你+1【治疗】，然后令1名其他队友+1<span class='lan'>【水晶】</span>。",
                    "guangZhiFuChou": "响应【光之复仇】",
                    "guangZhiFuChou_info": "<span class='tiaoJian'>（其他队友被主动攻击命中时②，弃置1张法术牌【展示】）</span>对攻击来源造成1点法术伤害③。",
                    "tianQiZheZhuFu": "法术【祝福】",
                    "tianQiZheZhuFu_info": "<span class='tiaoJian'>（展示并弃置1张圣类牌）</span>将1张【荣誉祝福】【守护徽章】【武器祝福】或【天使祝福】置于目标队友面前。",
                    "shengYuZhiFeng": "法术【圣愈之风】",
                    "shengYuZhiFeng_info": "摸2张牌【强制】，我方所有角色各+1【治疗】。",
                    "tianQiZhiZhu": "启动【天启之珠】",
                    "tianQiZhiZhu_info": "<span style=\"color:#E02B17\">【宝石】</span>×2，为所有我方角色放置【荣誉祝福】【守护徽章】【武器祝福】【天使祝福】，持续到你的下个回合开始，并记录这些专属卡触发的次数为X。你的下个回合开始时，对所有对方角色各造成X点法术伤害③。",
                    "rongYuZhuFu": "专属【荣誉祝福】",
                    "rongYuZhuFu_info": "<span class='greentext'>被动【荣誉祝福】</span><br><span class='tiaoJian'>（拥有者造成法术伤害时③）</span>移除此卡，本次伤害+1。",
                    "shouHuHuiZhang": "专属【守护徽章】",
                    "shouHuHuiZhang_info": "<span class='greentext'>被动【守护徽章】</span><br><span class='tiaoJian'>（拥有者被攻击命中时②）</span>移除此卡，本次攻击伤害-2。",
                    "wuQiZhuFu": "专属【武器祝福】",
                    "wuQiZhuFu_info": "<span class='greentext'>被动【武器祝福】</span><br><span class='tiaoJian'>（拥有者的攻击命中时②）</span>移除此卡，本次攻击伤害+2。",
                    "tianQiZheTianShiZhuFu": "专属【天使祝福】",
                    "tianQiZheTianShiZhuFu_info": "<span class='greentext'>响应【天使祝福】</span><br><span class='tiaoJian'>（拥有者支付技能的1</span><span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>或1</span><span class='lan'>【水晶】</span><span class='tiaoJian'>时）</span>移除此卡，视为已支付该费用。",
                    "yuXueMoShenXueQi": "血气",
                    "yuXueMoShenXueQi_info": "<span class='hong'>【血气】</span>为狱血魔神的专属指示物，上限为8。",
                    "xueQiWangSheng": "被动【血气旺盛】",
                    "xueQiWangSheng_info": "<span class='tiaoJian'>（承受实际伤害后⑤）</span>+X<span class='hong'>【血气】</span>，X为实际伤害，至多为2。",
                    "xueQiHuanXing": "被动【血气唤醒】",
                    "xueQiHuanXing_info": "<span class='tiaoJian'>（没有【治疗】时）</span>你的攻击伤害+1；承受的所有伤害+1。",
                    "shiHunZhiShou": "被动【嗜魂之手】",
                    "shiHunZhiShou_info": "<span class='tiaoJian'>（攻击造成实际伤害后⑤）</span>+1【治疗】；若未实际获得【治疗】，改为+1<span class='hong'>【血气】</span>。",
                    "shiHunFengMoZhan": "响应【嗜魂封魔斩】",
                    "shiHunFengMoZhan_info": "<span class='tiaoJian'>（主动攻击前①，移除2</span><span class='hong'>【血气】</span><span class='tiaoJian'>）</span>本次攻击伤害+1；<span class='tiaoJian'>（若再额外移除2【血气】）</span>本次攻击无法应战。",
                    "siWangKangJu": "法术【死亡抗拒】",
                    "siWangKangJu_info": "<span class='tiaoJian'>（你没有【治疗】，移除2</span><span class='hong'>【血气】</span><span class='tiaoJian'>）</span>+2【治疗】，然后弃置2张牌。",
                    "bengShanLieDiZhan": "法术【崩山裂地斩】",
                    "bengShanLieDiZhan_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（移除4</span><span class='hong'>【血气】</span><span class='tiaoJian'>）</span>对1名对手造成2点法术伤害③，对其他对手各造成1点法术伤害③，然后对自己造成1点法术伤害③。",
                    "moYuXueSha": "启动【魔狱血刹】",
                    "moYuXueSha_info": "【持续】<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（移除全部【治疗】）</span>【横置】并进入【血刹形态】；<br><span class='tiaoJian'>（此形态下）</span>不能获得【治疗】；<span class='tiaoJian'>（任意角色承受实际伤害后）</span>你+1<span class='hong'>【血气】</span>。<br><span class='tiaoJian'>（你的下下个回合开始时）</span>移除全部<span class='hong'>【血气】</span>并选择1名对手，对其造成X点法术伤害③，X为移除数的一半（向上取整）；若移除数≥6，再对其他对手各造成1点法术伤害③。全部伤害结算后【重置】。",
                    "xueShaXingTai": "血刹形态",
                    "xueShaXingTai_info": "<span class='tiaoJian'>（【血刹形态】下）</span>不能获得【治疗】；<span class='tiaoJian'>（任意角色承受实际伤害后）</span>你+1<span class='hong'>【血气】</span>。持续至你的下下个回合开始并结算【魔狱血刹】。",
                    "xiLuFeiShengLingFuWen": "被动【圣灵符文】",
                    "xiLuFeiShengLingFuWen_info": "<span class='tiaoJian'>（游戏开始时）</span>你获得四枚黯淡的符文；<br><span class='tiaoJian'>（当符文被点亮时）</span>将对应的低阶法术替换为高阶法术：【杰克爆弹】→【杰克降临】；【冰霜雪人】→【极冰盛宴】；【光电鳗】→【天雷】；【暗影夜猫】→【湮灭黑洞】。",
                    "xiLuFeiJieKeBaoDan": "法术【杰克爆弹】",
                    "xiLuFeiJieKeBaoDan_info": "<span class='tiaoJian'>（弃置1张火系牌【展示】）</span>对1名目标对手造成1点法术伤害③，点亮【火之符文】。",
                    "xiLuFeiJieKeJiangLin": "法术【杰克降临】",
                    "xiLuFeiJieKeJiangLin_info": "<span class='tiaoJian'>（弃置1张火系牌【展示】，熄灭【火之符文】）</span>对1名对手造成2点法术伤害③。",
                    "xiLuFeiBingShuangXueRen": "法术【冰霜雪人】",
                    "xiLuFeiBingShuangXueRen_info": "<span class='tiaoJian'>（弃置1张水系牌【展示】）</span>目标我方角色+1【治疗】，点亮【水之符文】。",
                    "xiLuFeiJiBingShengYan": "法术【极冰盛宴】",
                    "xiLuFeiJiBingShengYan_info": "<span class='tiaoJian'>（弃置1张水系牌【展示】，熄灭【水之符文】）</span>对2名目标对手各造成1点法术伤害③，令1名我方角色+1【治疗】。",
                    "xiLuFeiGuangDianMan": "法术【光电鳗】",
                    "xiLuFeiGuangDianMan_info": "<span class='tiaoJian'>（弃置1张光系牌【展示】）</span>目标角色+1<span class='lan'>【水晶】</span>③，点亮【光之符文】。",
                    "xiLuFeiTianLei": "法术【天雷】",
                    "xiLuFeiTianLei_info": "<span class='tiaoJian'>（弃置1张光系牌【展示】，熄灭【光之符文】）</span>对1名对手造成1点法术伤害③，目标我方角色+1<span style=\"color:#E02B17\">【宝石】</span>。",
                    "xiLuFeiAnYingYeMao": "法术【暗影夜猫】",
                    "xiLuFeiAnYingYeMao_info": "<span class='tiaoJian'>（弃置1张暗系牌【展示】）</span>目标角色摸2张牌【强制】，点亮【暗之符文】。",
                    "xiLuFeiYanMieHeiDong": "法术【湮灭黑洞】",
                    "xiLuFeiYanMieHeiDong_info": "<span class='tiaoJian'>（弃置1张暗系牌【展示】，熄灭【暗之符文】）</span>视为对1名对手使用【虚弱】，并令其摸1张牌。",
                    "xiLuFeiMoFaXiu": "响应【魔法秀】",
                    "xiLuFeiMoFaXiu_info": "<span class='tiaoJian'>（【法术行动】结束后，熄灭任意2枚明亮的【圣灵符文】）</span>+1【法术行动】。",
                    "xiLuFeiYuanSuZhiMen": "法术【元素之门】",
                    "xiLuFeiYuanSuZhiMen_info": "<span class='lan'>【水晶】</span>对1名对手造成1点法术伤害③，点亮任意1枚黯淡的【圣灵符文】。",
                    "xiLuFeiDiLiuYuanSu": "响应【第六元素】",
                    "xiLuFeiDiLiuYuanSu_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（回合结束时）</span>对1名对手造成X点法术伤害③，X为本回合你进行的【法术行动】。",
                    "xiLuFeiHuoZhiFuWen": "专属【火之符文】",
                    "xiLuFeiHuoZhiFuWen_info": "<span class='greentext'>法术【杰克降临】</span><span class='tiaoJian'><br>（弃置1张火系牌【展示】，熄灭【火之符文】）</span>对1名对手造成2点法术伤害③。",
                    "xiLuFeiShuiZhiFuWen": "专属【水之符文】",
                    "xiLuFeiShuiZhiFuWen_info": "<span class='greentext'>法术【极冰盛宴】</span><span class='tiaoJian'><br>（弃置1张水系牌【展示】，熄灭【水之符文】）</span>对2名目标对手各造成1点法术伤害③，令1名我方角色+1【治疗】。",
                    "xiLuFeiGuangZhiFuWen": "专属【光之符文】",
                    "xiLuFeiGuangZhiFuWen_info": "<span class='greentext'>法术【天雷】</span><span class='tiaoJian'><br>（弃置1张光系牌【展示】，熄灭【光之符文】）</span>对1名对手造成1点法术伤害③，目标我方角色+1<span style=\"color:#E02B17\">【宝石】</span>。",
                    "xiLuFeiAnZhiFuWen": "专属【暗之符文】",
                    "xiLuFeiAnZhiFuWen_info": "<span class='greentext'>法术【湮灭黑洞】</span><span class='tiaoJian'><br>（弃置1张暗系牌【展示】，熄灭【暗之符文】）</span>视为对1名对手使用【虚弱】，并令其摸1张牌。",
                },
            },
            "intro": "添加角色贝亚娜斗神、百花缭乱、露米娅、希露菲、天启者、狱血魔神。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
            "version": "2.6",
        },
        "files": {
            "character": [
                "beiyanadopushen.webp",
                "baiHuaLiaoLuan.webp",
                "luMiYa.webp",
                "tianQiZhe.webp",
                "yuXueMoShen.webp",
                "xiLuFei.webp",
            ],
            "card": [
                "mark_rongYuZhuFu.webp",
                "mark_shouHuHuiZhang.webp",
                "mark_wuQiZhuFu.webp",
                "mark_tianShiZhuFu.webp",
                "mark_tianQiZhiZhu.webp",
            ],
            "skill": [
                "mark_nianQi.webp",
                "mark_luMiYaYanJiu.webp",
                "mark_xueQi.webp",
                "mark_xueShaXingTai.webp",
                "mark_huoZhiFuWen.webp",
                "mark_huoZhiFuWen_dim.webp",
                "mark_shuiZhiFuWen.webp",
                "mark_shuiZhiFuWen_dim.webp",
                "mark_guangZhiFuWen.webp",
                "mark_guangZhiFuWen_dim.webp",
                "mark_anZhiFuWen.webp",
                "mark_anZhiFuWen_dim.webp",
            ],
            "audio": [
                "audio/skill/baiHuaLiaoLuan/nianQiHuanRao.mp3",
                "audio/skill/baiHuaLiaoLuan/guangZhiQinHe.mp3",
                "audio/skill/baiHuaLiaoLuan/nianQiBo.mp3",
                "audio/skill/baiHuaLiaoLuan/nianQiZhao.mp3",
                "audio/skill/baiHuaLiaoLuan/nianZhiAoYi.mp3",
                "audio/action/baiHuaLiaoLuan/gouMai.mp3",
                "audio/action/baiHuaLiaoLuan/heCheng.mp3",
                "audio/action/baiHuaLiaoLuan/tiLian.mp3",
                "audio/skill/luMiYa/faMiLiErShiYanShi.mp3",
                "audio/skill/luMiYa/luMiYaShiYan.mp3",
                "audio/skill/luMiYa/luMiYaShiYan_daChengGong.mp3",
                "audio/skill/luMiYa/luMiYaShiYan_chengGong.mp3",
                "audio/skill/luMiYa/luMiYaShiYan_shiBai.mp3",
                "audio/skill/luMiYa/xingYunBangBangTang.mp3",
                "audio/skill/luMiYa/gaiLiangMoFaXingDan.mp3",
                "audio/skill/luMiYa/saoBaZhangWo.mp3",
                "audio/skill/luMiYa/xuanZhuanSaoBa.mp3",
                "audio/skill/luMiYa/rongYanYaoPing.mp3",
                "audio/skill/luMiYa/suanYuYun.mp3",
                "audio/skill/luMiYa/dianManPengZhuangJi.mp3",
                "audio/skill/luMiYa/fanZhongLiZhuangZhi.mp3",
                "audio/skill/luMiYa/jiYiRongHe.mp3",
                "audio/action/luMiYa/gouMai.mp3",
                "audio/action/luMiYa/heCheng.mp3",
                "audio/action/luMiYa/tiLian.mp3",
                "audio/skill/beiyanadopushen/moFaHuDun.mp3",
                "audio/skill/beiyanadopushen/xuanWenShengCheng.mp3",
                "audio/skill/beiyanadopushen/ziDongXuanWen.mp3",
                "audio/skill/beiyanadopushen/xuanWenFaShe.mp3",
                "audio/skill/beiyanadopushen/huangLongYanYue.mp3",
                "audio/skill/beiyanadopushen/bianShenBeiYaNa.mp3",
                "audio/skill/beiyanadopushen/xuanWenQiangYa.mp3",
                "audio/action/beiyanadopushen/gouMai.mp3",
                "audio/action/beiyanadopushen/heCheng.mp3",
                "audio/action/beiyanadopushen/tiLian.mp3",
                "audio/skill/tianQiZhe/shouHuEnCi.mp3",
                "audio/skill/tianQiZhe/lingHunXiSheng.mp3",
                "audio/skill/tianQiZhe/guangZhiFuChou.mp3",
                "audio/skill/tianQiZhe/tianQiZheZhuFu.mp3",
                "audio/skill/tianQiZhe/shengYuZhiFeng.mp3",
                "audio/skill/tianQiZhe/tianQiZhiZhu.mp3",
                "audio/action/tianQiZhe/gouMai.mp3",
                "audio/action/tianQiZhe/heCheng.mp3",
                "audio/action/tianQiZhe/tiLian.mp3",
                "audio/skill/yuXueMoShen/xueQiWangSheng.mp3",
                "audio/skill/yuXueMoShen/xueQiHuanXing.mp3",
                "audio/skill/yuXueMoShen/shiHunZhiShou.mp3",
                "audio/skill/yuXueMoShen/shiHunFengMoZhan.mp3",
                "audio/skill/yuXueMoShen/siWangKangJu.mp3",
                "audio/skill/yuXueMoShen/bengShanLieDiZhan.mp3",
                "audio/skill/yuXueMoShen/moYuXueSha.mp3",
                "audio/action/yuXueMoShen/gouMai.mp3",
                "audio/action/yuXueMoShen/heCheng.mp3",
                "audio/action/yuXueMoShen/tiLian.mp3",
                "audio/skill/xiLuFei/shengLingFuWen.mp3",
                "audio/skill/xiLuFei/jieKeBaoDan.mp3",
                "audio/skill/xiLuFei/jieKeJiangLin.mp3",
                "audio/skill/xiLuFei/bingShuangXueRen.mp3",
                "audio/skill/xiLuFei/jiBingShengYan.mp3",
                "audio/skill/xiLuFei/guangDianMan.mp3",
                "audio/skill/xiLuFei/tianLei.mp3",
                "audio/skill/xiLuFei/anYingYeMao.mp3",
                "audio/skill/xiLuFei/yanMieHeiDong.mp3",
                "audio/skill/xiLuFei/moFaXiu.mp3",
                "audio/skill/xiLuFei/yuanSuZhiMen.mp3",
                "audio/skill/xiLuFei/diLiuYuanSu.mp3",
                "audio/action/xiLuFei/gouMai.mp3",
                "audio/action/xiLuFei/tiLian.mp3",
                "audio/action/xiLuFei/heCheng.mp3",
            ],
        },
        "connect": true,
    };
    // 选将说明复用正式专属文案；空技能只展示，不赋予卡牌效果。
    [
        'rongYuZhuFu',
        'shouHuHuiZhang',
        'wuQiZhuFu',
        'tianQiZheTianShiZhuFu',
    ].forEach(function(id) {
        var displayId = id + '_description';
        extension.package.skill.skill[displayId] = {};
        extension.package.skill.translate[displayId] =
            extension.package.skill.translate[id];
        extension.package.skill.translate[displayId + '_info'] =
            extension.package.skill.translate[id + '_info'];
        var cardId = extension.package.skill.skill
            .tianQiZheZhuFuManager.cardNames[id];
        extension.package.card.translate[cardId] =
            extension.package.skill.translate[id];
        extension.package.card.translate[cardId + '_info'] =
            extension.package.skill.translate[id + '_info'];
    });
    return extension;
});
