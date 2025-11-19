import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
    return {
        name:'teDian',
        connect:true,
        characterSort:{
            'teDian':{
               moFaShaoNv_name:['jieRiMoDao','tanLanShaoNv','nong_baoShiShaoNv','daiDuoShaoNv','jiDuShaoNv'],
               trick:['trick_shengGong','trick_maoXianJia','daoDanLuoLi'],
               shiTu:['jianZhiMoNv','jianZhiZi'],
            }
        },
        character:{
            jianZhiMoNv: ["jianZhiMoNv_name", "jiGroup", '3/4', ["jiZhiJianYi", "yiXiangJian", "mengXiangJian", "jianYingDuanNian"], ['des:最快的招式，就是最难以应付的招式。悟出此道的剑之魔女，剑招以快取胜，每一招都是进攻，不需要防守。因为只要够快，敌人就永远追不上她进攻的脚步。“在下一路走来，只有风伴我随行”当此句传入耳中时，你已中招倒地。']],
            jieRiMoDao:["moFaShaoNv_name","yongGroup",3,["moDanZhangWo","moDanRongHe","jiRi_moBaoChongJie","faLiHuDun","huiMieFengBao"],['des:小范围的区域伤害是魔法少女的特长，她更可以把魔弹随意的使用和施放。在积累了一定的能量之后，强大的“毁灭风暴”更是可以让所有对手都品尝到何为魔法的洗礼和冲击']],
            tanLanShaoNv: ["moFaShaoNv_name", "yongGroup", 3, ["tanYuHeiDong", "lianJinMoFa", "lianJinShu", "wangNvJinKu"], ['des:贪婪少女对于星石的贪婪可谓突破天际，无论是宝石还是水晶，都是她的涉猎目标。但是这还是比不上她以前金库的一厘一分。']],
            lingXiZhiChao: [
                "lingXiZhiChao_name",
                "huanGroup",
                "3/4",
                ["lingZhiZhiYi", "xieLingTuiSan", "banXiangHunLing", "boYongZhiLi", "nuChaoHuangTao", "haiShenYuWu", "lingYong"],
                [
                    `des:灵熙之潮对于基础效果有着很敏锐的感受，通过不断触发基础效果获得灵涌，让这个世界的人体验一下怒潮狂涛的威力吧`,
                ],
            ],
            youJiShi: [
                "youJiShi_name",
                "jiGroup",
                "3/4",
                ["jingLingZengLi", "yuanSuSheJi*sora", "erChongJianYing", "fuMoZhiShu",  "jingLingDeJianWu","ziDan"],
                [
                    `des:精灵的赠礼对于索拉来说至关重要，“好的开始是成功的一半”这句名言在她的身上得到了最好的体现。`,
                ],
            ],
            nong_baoShiShaoNv: [
                "moFaShaoNv_name",
                "yongGroup",
                3,
                ["tianDianChongJi", "shiYuDeHeiDong", "meiWeiRongHe", "sanMiaoYuanZe", "meiShiFengBao"],
                [
                    "des:暴食少女除了能够像魔法少女一样肆意运用魔弹和毁灭风暴这样的强大法术以外；作为喜爱甜点的她更加为了满足自己的食欲而开发出了更加“食用”的魔法。<br>因机制问题，无法完全符合faq。",
                ],
            ],
            zhouFuShi: [
                "zhouFuShi_name",
                "yongGroup",
                4,
                ["zhouFuHuoLi", "zhouFuDongTian", "zhouFu_nianZhou", "chiMeiWangLiang", "zhouLiChongSu", "zhouFu_yaoLi"],
                [
                    `des:狐神降神于风音身体，融合了风音的意识，自称“铃音”。由于狐神天性喜爱捉弄人，咒符师更倾向灵动的配合队友。“咒符不是用以伤害敌人，而是帮助队友解决困扰”，不要将胜负扛在肩上，更相信队友才是致胜之道`,
                ],
            ],
            yuanChuZhiGong:[
                'shengGong_name',
                'shengGroup',
                '4/5',
                ['yuanChu_tianZhiGong','yuanChu_shengXieJuBao','yuanChu_shengHuangJiangLin','yuanChu_shengGuangBaoLie','liuXingShengDan','yuanChu_shengHuangHuiGuangPao','yuanChu_shengHuangYuHui','yuanChu_ziDongTianChong','yuanChu_xinYang'],
                [
                    `des:圣弓的最终形态，虽有一颗和平之心，但因遇见强敌而觉醒。其拥有强大的机动性，但因为消耗信仰作为能量且需要的能量巨大，所以一般需要队友支援。一旦能量充填完毕，原初之弓就会显现出最终武器的恐怖形态，无论多么劣势都能看到翻盘的希望`,
                ],
            ],
            daoDanLuoLi: [
                "daoDanLuoLi_name",
                "huanGroup",
                4,
                ["tianShi?", "panNiZhiQiang", "shenMiFuBi", "T-r-i-c-k-y!", "trickOrTreat", "suprise"],
                [
                    `des:既然如此了，就不用拿圣盾用来保护队友了，不如来大闹一场吧~连自己也不一定掌控的tricky，简直是太刺激了~ 到底是trick还是treat？一场盛大的surprise正在上演~`,
                ],
            ],
            trick_shengGong:['shengGong_name','shengGroup','4/5',['trick_tianZhiGong','shengXieJuBao','trick_shengHuangJiangLin','trick_shengGuangBaoLie','liuXingShengDan','trick_shengHuangHuiGuangPao','trick_ziDongTianChong','xinYang','shengHuangHuiGuangPaoX'],['character:shengGong']],
            trick_maoXianJia:['maoXianJia_name','huanGroup','3/4',['trick_qiZha','qiangYun','diXiaFaZe','trick_maoXianJiaTianTang','touTianHuanRi'],['character:maoXianJia']],
            luoLiFanZhang: ["luoLiFanZhang_name", "xueGroup", 3, ["xuanHuaShangDeng", "yeLuSiKu", "aiSiTianLiu", "mieChaKuCha"], [`des:暂无介绍`]],
            jianXiZhiPian: [
                "jianXiZhiPian_name",
                "yongGroup",
                "3/4",
                ["yuanZiXiShou", "yuanZiChongSu", "yuanSuXueTu", "leiJiBianYi", "yueYun", "yuanZi"],
                ["des:暂无介绍"],
            ],
            daiDuoShaoNv: [
                "moFaShaoNv_name",
                "shengGroup",
                3,
                ["bieFanWo", "rangWoTangPing", "xiangYongMoDan", "buXiangTiLian", "zaiShuiYiXia"],
                ["des:暂无介绍"],
            ],
            jiDuShaoNv: [
                "moFaShaoNv_name",
                "jiGroup",
                3,
                ["cuYiXiuXin", "xuRongZhangWo", "xiangSiBing", "jiDuZhuiFang"],
                ["des:暂无介绍"],
            ],
            jianZhiZi:[
                "fengZhiJianSheng_name",
                "jiGroup",
                3,
                ["qingMu", "fengZhiJian", "jianShouShiYan", "jianCanYing"],
                ["des:暂无介绍"],
            ],
            moGongEX:[
                'moGong_name',
                'jiGroup',
                3,
                ["shenFengShi", "jiFengZhuiShe", "gongShenHouBu", "juJi"],
                ["des:其精准的射击总是能令对手防不胜防。作为本作命中数一数二的职业，往往是团队攻击链最后致命一击的缔造者。她的必杀技更是控场神技，总是能令对方的如意算盘全部落空"],
            ],
            sheng_zhongCaiZhe:[
                'sheng_zhongCaiZhe_name',
                'shengGroup',
                '4/5',
                ['shenZhiTianPing','shanEBiJi','tianPingQingDao','shenZhiShenPan','tianPing','tianZui','zuiChiBiDao','zui'],
                ["des:新的裁判钟声已经敲响，不知道是新生的喜悦钟声，还是赴死的丧钟。咚，咚，咚。。。"],
            ],
        },

        characterIntro: {

        },
        card: {
            tricky: {
                filterTarget: function (card, player, target) {
                    return !target.hasJiChuXiaoGuo("tricky_xiaoGuo");
                },
            },
        },
        skill: {
            //剑之魔女
            jiZhiJianYi:{
                trigger:{player:"gongJiEnd"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.mingGe(card)!='ji'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'技之剑意：技类[攻击行动]',
                    });
                },
                check:function(event,player){
                    var num=player.countCards('h',card=>get.mingGe(card)=='ji'&&get.type(card)=='gongJi');
                    return num>0
                },
                mod:{
                    aiOrder:function(player,card,num){
                        if(get.type(card)!='gongJi') return;
                        if(get.mingGe(card)=='ji') return num-0.3;
                    }
                }
            },
            yiXiangJian: {
                trigger: {source:'gongJiMingZhong'},
                usable: 1,
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                content: async function (event, trigger, player) {
                    var result = await trigger.target.chooseToDiscard('h', 1, true).set('ai', function(card) {
                        if(get.type(card) == 'gongJi') {
                            return 6 - get.value(card);
                        }else if(get.type(card)=='faShu'){
                            return 8- get.value(card);
                        }else return 0
                    }).set('showCards', true).forResult();

                    if (!result.cards.length) return;

                    var discarded = result.cards[0];

                    if (get.type(discarded) == 'gongJi') {
                        var list=['是','否'];
                        var control = await player.chooseControl(list).set('prompt','是否获得攻击牌')
                        .set('ai', function() {
                            var player = _status.event.player;
                            if(player.countCards('h', card => get.type(card) == 'gongJi') > 1)return '否';
                            else return '是';
                        }).forResult('control');
                        if (control =='是') {
                            await player.gain(discarded);
                        }
                        player.addGongJi();
                    } else if (get.type(discarded) == 'faShu') {
                        trigger.changeDamageNum(2);
                    }
                },
            },
            mengXiangJian: {
                forced:true,
                trigger:{player:"gongJiAfter"},
                filter: function (event, player) {
                    var num= player.getStat('gongJi').zhuDong.length;
                    return event.yingZhan!=true&&(num==1||num==2||num==4);
                },
                content: function () {
                    player.addTempSkill('mengXiangJian_gongJiSheZhi');
                },
                subSkill:{
                    gongJiSheZhi:{
                        direct:true,
                        trigger:{player:'gongJiSheZhi'},
                        filter: function(event, player) {
                            var num= player.getStat('gongJi').zhuDong.length;
                            return event.yingZhan!=true&&num>1;
                        },
                        content: function() {
                            var num= player.getStat('gongJi').zhuDong.length;
                            if(num>1) trigger.wuFaShengDun();
                            if(num>2) trigger.wuFaYingZhan();
                            if(num>4) trigger.qiangZhiMingZhong();
                        }
                    },
                }
            },
            jianYingDuanNian: {
                trigger:{player:'gongJiEnd'},
                usable: 1,
                filter: function (event, player) {
                    return player.canBiShaBaoShi()&&event.yingZhan!=true;
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.chooseToDiscard(2, true);
                    'step 1'
                    player.draw();
                    player.addGongJi();
                },
                ai:{
                    baoShi:true,
                }
            },

            //节日魔导
            jiRi_moBaoChongJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.jiRi_moBaoChongJie.filterCard(card));
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                contentBefore:function(){
                    player.changeZhanJi('baoShi',1);
                },
                content:function(){
                    'step 0'
                    var name=get.colorName(player);
                    target.chooseToDiscard(`弃置1张法术牌，否则${name}对你造成2点法术伤害③`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                    }
                },
                check:function(card){
                    return 6- get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            var chaZhi=target.getHandcardLimit()-target.countCards('h');
                            if(chaZhi<=1) return -2;
                            else return -0.1;
                        }
                    }
                }
            },
            faLiHuDun:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([1,Infinity],function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt('faLiHuDun'))
                    .set('prompt2',lib.translate.faLiHuDun_info)
                    .set('ai',function(card){
                        return 4-get.value(card);
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                },
            },

            //贪婪少女
            tanYuHeiDong:{
                type:'faShu',
                enable:'faShu',
                usable: 1,
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.tanYuHeiDong.filterCard(card));
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                contentBefore:function(){
                    player.changeZhanJi('shuiJing',1);
                },
                content:function(){
                    'step 0'
                    var name=get.colorName(player);
                    target.chooseToDiscard(`弃置1张法术牌，否则${name}对你造成2点法术伤害③`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                        player.addFaShu();
                    }
                },
                check:function(card){
                    return 6- get.value(card);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            var chaZhi=target.getHandcardLimit()-target.countCards('h');
                            if(chaZhi<=1) return -2;
                            else return -0.1;
                        }
                    }
                }
            },
            lianJinMoFa: {
                trigger:{source:'chengShouShangHaiAfter'},
                filter: function(event, player){
                    return event.card && event.card.name === 'moDan';
                },
                content: function(){
                    player.changeZhanJi('shuiJing',1);
                },
            },
            lianJinShu:{
                enable:['faShu','moDan'],
				filterCard:function(card){
                    return get.xiBie(card)=='lei'||get.xiBie(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.lianJinShu.filterCard(card);
                    });
				},
                ai:{
                    order:3.2,
                }
            },
            wangNvJinKu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing() && player.countSkill('tanYuHeiDong') < 1;
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                contentBefore:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    player.storage.wangNvJinKu_num = 0;
                    player.storage.wangNvJinKu_baoshi = 0;
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length>0){
                        var list=['是','否'];
                        var control=await player.chooseControl(list).set('prompt','是否额外移除【战绩区】所有星石').set('ai', function(){
                            var player= _status.event.player;
                            var zhanJi=get.zhanJi(player.side);
                            var shiQi=get.shiQi(!player.side);
                            if(shiQi>1 && zhanJi.includes('baoShi')) return '是';
                            if(zhanJi.length>3) return '是';
                            return '否';
                        }).forResult('control');
                        if (control =='是') {
                            var xlist = get.zhanJi(player.side).slice();
                            for (var i of xlist){
                                if(i == 'baoShi'){
                                    player.storage.wangNvJinKu_baoshi++;
                                }
                                await player.removeZhanJi(i,1);
                            }
                            var num=xlist.length;
                            player.storage.wangNvJinKu_num = Math.floor(num/2);
                        }
                    }else return;  
                },
                content:function(){
                    'step 0'
                    target.faShuDamage(1+player.storage.wangNvJinKu_num,player);

                },
                contentAfter:async function(event, trigger, player){
                    if(player.storage.wangNvJinKu_baoshi > 1 && get.shiQi(!player.side) > 1){
                        await player.changeShiQi(-1,!player.side).set('zhuanYi',true);
                        await player.changeShiQi(1).set('zhuanYi',true);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            var zhanJiNum=get.zhanJi(player.side).length;
                            return get.damageEffect(target,player,1+zhanJiNum);
                        }
                    }
                }
            },

            // 灵汐之潮
            lingZhiZhiYi: {
                mod: {
                    targetEnabled: function (card, player, target) {
                        if (game.jiChuXiaoGuo.all.includes(get.name(card))) {
                            return false;
                        }
                    },
                },
            },
            xieLingTuiSan: {
                trigger: {source: "addJiChuXiaoGuoAfter",},
                filter: function (event, player) {
                    return game.jiChuXiaoGuo.all_xiaoGuo.includes(event.jiChuXiaoGuo);
                },
                async cost(event, trigger, player) {
                    event.result= await player.chooseTarget("对目标对手造成1点法术伤害③", true, function (card, player, target) {
                        return player.side != target.side;
                    })
                    .set("ai", function (target) {
                        var player = _status.event.player;
                        return get.damageEffect2(target, player, 1);
                    })
                    .set('prompt', get.prompt('xieLingTuiSan'))
                    .set('prompt2', lib.translate.xieLingTuiSan_info)
                    .forResult();
                },
                content: async function (event, trigger, player) {
                    if(event.targets[0]) await event.targets[0].faShuDamage(1, player);
                },
            },
            banXiangHunLing: {
                trigger: { global: "changeShiQiEnd" },
                usable: 1,
                filter: function (event, player) {
                    if (event.side == player.side) return false;
                    if (event.cause != "damage") return false;
                    if (event.num >= 0) return false;
                    if (event.source !== player) return false;
                    if (_status.currentPhase != player) return false;
                    return true;
                },
                content: async function (event, trigger, player) {
                    var targets = game
                        .filterPlayer(function (current) {
                            return current.side != player.side && current != trigger.player;
                        })
                        .sortBySeat(player);
                    for (var target of targets) {
                        await target.faShuDamage(1, player);
                    }
                },
            },
            boYongZhiLi: {
                trigger: {global: "triggerEnd",},
                forced: true,
                filter: function (event, player) {
                    var skill = get.info(event.skill);
                    if (skill.tag && skill.tag.jiChuXiaoGuo) return true;
                    return false;
                },
                content: async function (event, trigger, player) {
                    player.addZhiShiWu("lingYong");
                },
            },
            nuChaoHuangTao: {
                trigger: { player: "phaseEnd" },
                forced: true,
                filter: function (event, player) {
                    return player.countZhiShiWu("lingYong") >= 4;
                },
                content: async function (event, trigger, player) {
                    await player.removeZhiShiWu("lingYong", 4);
                    var targets = await player
                        .chooseTarget("对4名目标角色造成1点法术伤害③，<span class='tiaoJian'>(若目标角色拥有X个基础效果)</span>本次对他的法术伤害额外+X点", 4, true)
                        .set("ai", function (target) {
                            var player = _status.event.player;
                            var length = target.jiChuXiaoGuoList().length;
                            return get.damageEffect2(target, player, 1+length);
                        })
                        .forResultTargets();
                    for (var target of targets.sortBySeat(player)) {
                        var length = target.jiChuXiaoGuoList().length;
                        await target.faShuDamage(1 + length, player);
                    }
                },
            },
            haiShenYuWu: {
                type: "faShu",
                enable: "faShu",
                position: "h",
                filter: function (event, player) {
                    var bool0 = player.canBiShaShuiJing();
                    var skills = [
                        lib.skill.diZhiFengYin,
                        lib.skill.shuiZhiFengYin,
                        lib.skill.fengZhiFengYin,
                        lib.skill.huoZhiFengYin,
                        lib.skill.leiZhiFengYin,
                        lib.skill.weiLiCiFu,
                        lib.skill.xunJieCiFu,
                    ];
                    var bool1 = player.hasCard(function (card) {
                        return !!skills.find(function (skill) {
                            return skill.filterCard(card);
                        });
                    });
                    var bool2 = game.hasPlayer(function (current) {
                        return !!skills.find(function (skill) {
                            return skill.filterTarget("", player, current);
                        });
                    });
                    return bool0 && bool1 && bool2;
                },
                selectCard: 1,
                filterCard: function (card) {
                    return !!["diZhiFengYin", "shuiZhiFengYin", "huoZhiFengYin", "fengZhiFengYin", "leiZhiFengYin", "weiLiCiFu", "xunJieCiFu"].find(
                        x => {
                            return card.hasDuYou(x);
                        }
                    );
                },
                useCard: true,
                filterTarget: function (card, player, target) {
                    if (card.hasDuYou("weiLiCiFu")) {
                        if (target == player || target.side != player.side) return false;
                        return lib.filter.targetEnabled({ name: "weiLiCiFu" }, player, target);
                    }
                    if (card.hasDuYou("xunJieCiFu")) {
                        if (target == player || target.side != player.side) return false;
                        return lib.filter.targetEnabled({ name: "xunJieCiFu" }, player, target);
                    }
                    if (card.hasDuYou("diZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "diZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("shuiZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "shuiZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("huoZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "huoZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("fengZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "fengZhiFengYin" }, player, target);
                    }
                    if (card.hasDuYou("leiZhiFengYin")) {
                        if (target.side == player.side) return false;
                        return lib.filter.targetEnabled({ name: "leiZhiFengYin" }, player, target);
                    }
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    var card = event.cards[0];
                    var target = event.target;
                    ["diZhiFengYin", "shuiZhiFengYin", "huoZhiFengYin", "fengZhiFengYin", "leiZhiFengYin", "weiLiCiFu", "xunJieCiFu"].forEach(async function(name){
                        if (card.hasDuYou(name)) {
                            if(name.includes('FengYin')) {
                                var fengYin=`${name}_xiaoGuo`;
                                target.addFengYin(fengYin,[card],player);
                            }else{
                                if (!target.hasSkill(`${name}_xiaoGuo`)) {
                                    target.addSkill(`${name}_xiaoGuo`);
                                }
                                await target.addJiChuXiaoGuo(`${name}_xiaoGuo`, player,[card]);
                            }
                            
                        }
                    });
                    await player.chooseToDiscard(1, "h", true);
                },
                ai:{
                    shuiJing: true,
                    order: 3.4,
                    result:{
                        target:function(player,target){
                            if(player.side==target.side) return target.countCards('h');
                            else return -player.countCards('h');
                        }
                    }
                },
            },
            lingYong: {
                intro: {
                    name: "灵涌",
                    markcount: "mark",
                    max: 4,
                    content: "mark",
                },
                onremove: "storage",
                markimage: "image/card/zhiShiWu/hong.png",
            },

            // 游击士
            jingLingZengLi: {
                trigger: { global: "gameStart" },
                forced: true,
                content: function (event, trigger, player) {
                    var cards = get.cards(6);
                    player.addGaiPai(cards,'ziDan');
                },
            },
            "yuanSuSheJi*sora": {
                trigger: { player: "gongJiShi" },
                filter: function (event, player) {
                    if (event.yingZhan == true) return false;
                    return player.getGaiPai("ziDan").length > 0;
                },
                async cost(event, trigger, player) {
                    var result = await player
                        .chooseCardButton(player.getGaiPai("ziDan"), "是否发动【元素射击*SORA】移除一个【子弹】？")
                        .set("ai", function () {
                            return 0.7 - Math.random();
                        })
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content: async function (event, trigger, player) {
                    //trigger.customArgs.yuanSuSheJi = true;
                    await player.discard(event.cost_data, "ziDan", "showHiddenCards");
                    var xiBie = get.xiBie(event.cost_data);
                    if (xiBie === "guang" || xiBie === "an") {
                        var choiceList = ["火系：本次攻击伤害额外+1", "水系：<span class='tiaoJian'>(主动攻击命中时②)</span>目标角色+1[治疗]", "风系：<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动]", "雷系：本次攻击无法应战", "地系：<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③"];
                        var choices = ["火系", "水系", "风系", "雷系", "地系"];
                        let next = player
                            .chooseControl(choices)
                            .set("prompt", "元素射击：选择一项")
                            .set("choiceList", choiceList)
                            .set("ai", function () {
                                return "雷系";
                            });
                        var control = await next.forResultControl();
                        switch (control) {
                            case "火系":
                                xiBie = "huo";
                                break;
                            case "水系":
                                xiBie = "shui";
                                break;
                            case "风系":
                                xiBie = "feng";
                                break;
                            case "雷系":
                                xiBie = "lei";
                                break;
                            case "地系":
                                xiBie = "di";
                                break;
                        }
                    }
                    switch (xiBie) {
                        case "huo":
                            player.logSkill("yuanSuSheJi*sora_huo");
                            trigger.changeDamageNum(1);
                            break;
                        case "shui":
                            trigger.customArgs.yuanSuSheJi = 'shui';
                            player.addTempSkill("yuanSuSheJi*sora_shui");
                            break;
                        case "feng":
                            trigger.customArgs.yuanSuSheJi = 'feng';
                            player.addTempSkill("yuanSuSheJi*sora_feng");
                            break;
                        case "lei":
                            player.logSkill("yuanSuSheJi*sora_lei");
                            trigger.wuFaYingZhan();
                            break;
                        case "di":
                            trigger.customArgs.yuanSuSheJi = 'di';
                            player.addTempSkill("yuanSuSheJi*sora_di");
                            break;
                    }
                },
                group:["yuanSuSheJi*sora_shui",'yuanSuSheJi*sora_feng', 'yuanSuSheJi*sora_di'],
                subSkill: {
                    huo: {},
                    lei: {},
                    shui: {
                        trigger: { source: "gongJiMingZhong" },
                        //direct:true,
                        filter: function (event, player) {
                            return event.customArgs.yuanSuSheJi == 'shui' && event.yingZhan != true;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player
                                .chooseTarget("水之弹：目标角色+1[治疗]", true)
                                .set("ai", function (target) {
                                    var player = _status.event.player;
                                    return get.zhiLiaoEffect2(target, player, 1);
                                })
                                .forResult();
                        },
                        content: async function (event, trigger, player) {
                            "step 0";
                            event.targets[0].changeZhiLiao(1);
                        },
                    },
                    feng: {
                        trigger: { player: "gongJiAfter" },
                        forced: true,
                        filter: function (event, player) {
                            return event.customArgs.yuanSuSheJi == 'feng';
                        },
                        content: async function (event, trigger, player) {
                            player.addGongJi();
                        },
                    },
                    di: {
                        trigger: { source: "gongJiMingZhong" },
                        //direct:true,
                        filter: function (event, player) {
                            return event.customArgs.yuanSuSheJi == 'di' && event.yingZhan != true;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player
                                .chooseTarget("地之弹：对目标角色造成1点法术伤害", true)
                                .set("ai", function (target) {
                                    var player = _status.event.player;
                                    return get.damageEffect2(target, player, 1);
                                })
                                .forResult();
                        },
                        content: async function (event, trigger, player) {
                            "step 0";
                            event.targets[0].faShuDamage(1, player);
                        },
                    },
                },
            },
            erChongJianYing: {
                usable: 1,
                trigger: { source: "gongJiEnd" },
                filter: function (event, player) {
                    return event.yingZhan != true&&event.gongJiMingZhong;
                },
                check: function (event, player) {
                    return player.hasCard(card=>get.type(card)=='gongJi'&&get.xiBie(card)==get.xiBie(event.card));
                },
                content: function (event, trigger, player) {
                    var xiBie = get.xiBie(trigger.card);
                    const name = get.translation(xiBie);
                    player.storage.extraXingDong.push({
                        xingDong: "gongJi",
                        xiBie: xiBie,
                        filterCard: function (card, player, event) {
                            if (get.xiBie(card) != this.xiBie || get.type(card) != "gongJi") return false;
                            return lib.filter.cardEnabled(card, player, "forceEnable");
                        },
                        prompt: `【二重剑影】:${name}系[攻击行动]`,
                    });
                },
            },
            fuMoZhiShu: {
                trigger: { player: "_tiLian_backupEnd" },
                filter: function (event, player) {
                    return player.countCards("h") > 0 && player.getGaiPai("ziDan").length == 0 && event;
                },
                async cost(event, trigger, player) {
                    event.result = await player.chooseCard("h", 1)
                    .set('prompt',get.prompt('fuMoZhiShu'))
                    .set('prompt2', lib.translate.fuMoZhiShu_info)
                    .set('ai', function (card) {
                        if(card.xiBie=='lei') return 6;
                        return 6 - get.value(card);
                    })
                    .forResult();
                },
                content: async function (event, trigger, player) {
                    var list=trigger.links;
                    if (list.includes('baoShi')&&list.includes('shuiJing')) {
                        await player.removeBiShaShuiJing();
                    }else{
                        await player.removeNengLiang(list[0]);
                    }
                    if (event.cards && event.cards.length) {
                        await player.addGaiPai(event.cards, "ziDan");
                    }
                },
            },
            jingLingDeJianWu: {
                trigger:{player:'gongJiBefore'},
                filter: function (event, player) {
                    return event.yingZhan != true && player.canBiShaShuiJing();
                },
                content: async function (event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    game.broadcastAll(function(card){
                        game.setXiBie(card,'feng');
                    },trigger.card)
                },
                check: function (event, player) {
                    return player.hasCard(card => get.xiBie(card) == 'feng' && get.type(card) == 'gongJi');
                },
            },
            ziDan: {
                intro: {
                    name: "子弹",
                    markcount: "gaiPai",
                    content: "gaiPai",
                },
                onremove: function (player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                trigger: { player: "addGaiPaiAfter" },
                filter: function (event, player) {
                    return event.gaiPai=="ziDan" && player.countGaiPai("ziDan") > 6;
                },
                direct: true,
                content: function (event, trigger, player) {
                    "step 0";
                    var cards = player.getGaiPai("ziDan");
                    player.chooseCardButton(cards, "舍弃" + (cards.length - 6) + "张【子弹】", true, cards.length - 6);
                    "step 1";
                    if (result.links) {
                        player.discard(result.links);
                    }
                },
            },

            //暴食少女
            tianDianChongJi: {
                inherit:'moBaoChongJi'
            },
            shiYuDeHeiDong: {
                trigger: { global: "chengShouShangHai" },
                filter: function (event, player) {
                    return event.player.side == player.side &&player.countCards('h')>0;
                },
                async cost(event, trigger, player) {
                    var result = await player
                        .chooseToDiscard(function (card) {
                            return get.name(card) == "moDan";
                        })
                        .set("ai", function (card) {
                            var player=_status.event.triggerPlayer;
                            if (player.countCards('h') + _status.event.trigger.num>player.getHandcardLimit()) return 6 - get.value(card);
                            return 0;
                        })
                        .set("prompt",get.prompt("shiYuDeHeiDong"))
                        .set("prompt2", lib.translate.shiYuDeHeiDong_info)
                        .set("showCards", true)
                        .set('triggerPlayer', trigger.player)
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cards: result.cards,
                    };
                },
                content: function (event, trigger, player) {
                    trigger.player = player;
                    trigger.shiQiXiaJiang = false;
                },
            },
            meiWeiRongHe: {
                enable: ["faShu", "moDan"],
                filterCard: function (card) {
                    return get.xiBie(card) == "shui" || get.xiBie(card) == "huo";
                },
                position: "h",
                viewAs: { name: "moDan" },
                viewAsFilter: function (player) {
                    return player.hasCard(function (card) {
                        return lib.skill.meiWeiRongHe.filterCard(card);
                    });
                },
                ai: {
                    order: 3.5,
                },
            },
            sanMiaoYuanZe: {
                init: function (player, skill) {
                    player.storage[skill] = [];
                },
                trigger:{global:'cardsDiscardBefore'},
                filter: function (event, player) {
                    for(var card of event.cards){
                        if(player.storage.sanMiaoYuanZe.includes(card)) return true;
                    }
                    return false;
                },
                content:async function (event, trigger, player) {
                    await player.chooseToDiscard(1,true);
                    var cards=[];
                    for(var card of trigger.cards.slice()){
                        if(player.storage.sanMiaoYuanZe.includes(card)){
                            cards.push(card);
                            trigger.cards.remove(card);
                            player.storage.sanMiaoYuanZe.remove(card);
                        }
                    }
                    await player.gain(cards,'gain2');
                },
                check: function (event,player) {
                    return player.countCards('h') < player.getHandcardLimit();
                },
                group: 'sanMiaoYuanZe_discard',
                subSkill:{
                    discard:{
                        trigger:{global: "loseEnd"},
                        direct: true,
                        filter: function (event, player) {
                            return event.player.side==player.side&&event.player!=player &&((event.type=='discard'&&(event.getParent().showCards||event.getParent().showHiddenCards)) || (event.type=='use'));
                        },
                        content:async function (event, trigger, player) {
                            for (var card of trigger.cards) {
                                if (get.name(card) == "moDan" && ['h','x'].includes(card.original)&&!player.storage.sanMiaoYuanZe.includes(card)&&get.position(card)=='d') {
                                    player.storage.sanMiaoYuanZe.push(card);
                                    //game.log(player, "将", "#g【魔弹】", "加入了", "#y【三妙原则】");
                                }
                            }
                            if(player.storage.sanMiaoYuanZe.length) game.cardsGotoOrdering(player.storage.sanMiaoYuanZe);
                        }
                    } 
                },

            },
            meiShiFengBao: {
                inherit:'huiMieFengBao',
            },
            
            //咒符师
            zhouFuHuoLi: {
                type: "faShu",
                enable: ["faShu"],
                filter: function (event, player) {
                    return player.countCards("h", card => lib.skill.zhouFuHuoLi.filterCard(card)) > 0;
                },
                selectCard: 1,
                filterCard: function (card) {
                    return get.xiBie(card) == "huo";
                },
                discard: true,
                showCards: true,
                content: async function (event, trigger, player) {
                    if(event.getParent().nianZhou!=false) await event.trigger("zhouFu");
                    await event.trigger("zhouFuStart");
                    var charNum=event.getParent().charNum || 1;
                    var baseNum= event.getParent().baseNum || 1;
                    var targets=await player.chooseTarget(charNum, `对${charNum}名角色造成${baseNum}点法术伤害`, true)
                    .set("ai", function (target) {
                        var player = _status.event.player;
                        return get.damageEffect2(target, player, baseNum);
                    }).forResultTargets();
                    for(var target of targets.sortBySeat(player)){
                        target.faShuDamage(baseNum, player);
                    }
                    await player.draw(1);
                    await player.chooseToDiscard(1, "h", true);
                },
                ai:{
                    order: 3.3,
                },
                check: function (card) {
                    return 6 - get.value(card);
                }
            },
            zhouFuDongTian: {
                type: "faShu",
                enable: ["faShu"],
                filter: function (event, player) {
                    return player.countCards("h", card => lib.skill.zhouFuDongTian.filterCard(card)) > 0;
                },
                selectCard: 1,
                filterCard: function (card) {
                    return get.xiBie(card) == "shui";
                },
                discard: true,
                showCards: true,
                content: async function (event, trigger, player) {
                    if(event.getParent().nianZhou!=false) await event.trigger("zhouFu");
                    await event.trigger("zhouFuStart");
                    var charNum=event.getParent().charNum || 1;
                    var baseNum= event.getParent().baseNum || 1;
                    var targets=await player.chooseTarget(charNum, `选取${charNum}名角色弃${baseNum}张牌`, true)
                    .set("ai", function (target) {
                        var player = _status.event.player;
                        if(target.side!= player.side) return 0;
                        return 10-(target.getHandcardLimit()-target.countCards("h"));
                    }).forResultTargets();
                    for(var target of targets.sortBySeat(player)){
                        await target.chooseToDiscard(baseNum, "h", true);
                    }
                    var targets = await player.chooseTarget(`选取${charNum}名角色，将他的1点[治疗]转移给你`, charNum, true,current=>current!=_status.event.player).set("ai", function (target) {
                        var player = _status.event.player;
                        if(target.side== player.side) return 0;
                        return target.zhiLiao;
                    }).forResultTargets();
                    for (var target of targets.sortBySeat(player)) {
                        if (target.zhiLiao > 0) {
                            await target.changeZhiLiao(-1);
                            await player.changeZhiLiao(1);
                        }
                    }
                },
                ai:{
                    order: function(item, player) {
                        var num=3.3;
                        var zhiLiao=game.hasPlayer(function(current){
                            return player.side!= current.side && current.zhiLiao>0;
                        });
                        if(zhiLiao) num+=0.1;
                        return num;
                    },
                },
                check: function (card) {
                    return 6 - get.value(card);
                }
            },
            zhouFu_nianZhou: {
                trigger: { player: "zhouFu" },
                filter: function (event, player) {
                    return player.countCards("h") > 0 && player.getGaiPai("zhouFu_yaoLi").length < 2;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseCard("h")
                        .set("prompt", get.prompt('zhouFu_nianZhou'))
                        .set('prompt2',lib.translate.zhouFu_nianZhou_info)
                        .set("ai", function (card) {
                            var xiBie = get.xiBie(card);
                            if (xiBie == "di") return 8;
                            else return 6-get.value(card);
                        })
                        .forResult();
                },
                content: function (event, trigger, player) {
                    player.addGaiPai(event.cards, "zhouFu_yaoLi");
                },
            },
            chiMeiWangLiang: {
                trigger: { source: "gongJiMingZhong" },
                filter: function (event, player) {
                    if (event.yingZhan == true) return false;
                    return player.getGaiPai("zhouFu_yaoLi").length > 0;
                },
                async cost(event, trigger, player) {
                    var result = await player
                        .chooseCardButton(
                            player.getGaiPai("zhouFu_yaoLi"),
                            "是否发动【魑魅魍魎】移除1个【妖力】<br>视为发动【咒符-火璃】或【咒符-冻天】"
                        )
                        .set('ai', function (button) {
                            if(get.xiBie(button.link)=='di') return 1;
                            else return 0.5;
                        })
                        .forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content: async function (event, trigger, player) {
                    var card = event.cost_data[0];
                    await player.discard(card, "zhouFu_yaoLi");
                    var baseNum=1;
                    var bool = await player
                        .chooseCardButton([card], `是否展示地系【妖力】，使得该次【咒符】的伤害或弃牌效果+1`, 1)
                        .set("filterButton", function (button) {
                            return get.xiBie(button.link) == "di";
                        })
                        .set("ai", function () {
                            return 1;
                        })
                        .forResultBool();
                    if (bool) {
                        await player.showHiddenCards(card);
                        baseNum++;
                    }
                    var choicesList = [
                        `发动【咒符-火璃】，对1名目标角色造成${baseNum}点法术伤害,<br>你摸1张牌，弃1张牌`,
                        `发动【咒符-冻天】，指定1名目标角色弃${baseNum}张牌，将除你外1名目标角色的1[治疗]转移给你`,
                    ];
                    var choices = ["zhouFuHuoLi", "zhouFuDongTian"];
                    let next = player
                        .chooseControl(choices)
                        .set("prompt", "魑魅魍魎：选择一项")
                        .set("choiceList", choicesList)
                        .set("ai", function () {
                            if (0.5 - Math.random() > 0) return "zhouFuHuoLi";
                            return "zhouFuDongTian";
                        });
                    var control = await next.forResultControl();
                    if (control == "zhouFuHuoLi") {
                        var skill= player.useSkill("zhouFuHuoLi");
                    } else if (control == "zhouFuDongTian") {
                        var skill= player.useSkill("zhouFuDongTian");
                    }
                    await skill.set('nianZhou', false).set('baseNum', baseNum);
                },
            },
            zhouLiChongSu: {
                trigger: { player: ["zhouFuStart"] },
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                content: function (event, trigger, player) {
                    player.removeBiShaShuiJing();
                    trigger.getParent().charNum=2;
                },
                ai: {
                    shuiJing: true,
                },
            },
            zhouFu_yaoLi: {
                intro: {
                    name: "妖力",
                    markcount: "gaiPai",
                    content:'gaiPai',
                },
                onremove: function (player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },

            //原初之弓
            yuanChu_tianZhiGong:{
                inherit: 'tianZhiGong',
                content: async function (event, trigger, player) {
                    await player.addZhiShiWu('yuanChu_shengHuangHuiGuangPao');
                },
                group:['yuanChu_tianZhiGong_zhuDongGongJi','yuanChu_tianZhiGong_zhuDongGongJiMingZhong'],
                subSkill:{
                    zhuDongGongJi:{
                        trigger:{player:'gongJiShi'},
                        forced:true,
                        filter:function(event,player){
                            return event.yingZhan!=true&&get.mingGe(event.card)!='sheng';
                        },
                        content:function(){
                            trigger.changeDamageNum(-1);
                        }
                    },
                    zhuDongGongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return get.mingGe(event.card)=='sheng';
                        },
                        content:function(){
                            player.addZhiShiWu('yuanChu_xinYang')
                        }
                    }
                }
            },
            yuanChu_shengXieJuBao: {
                inherit: 'shengXieJuBao',
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                filterCard: function (card) {
                    return get.xuanZeTongXiPai(card);
                },
                content:function(){
                    if(get.name(cards[0])=='shengGuang') var xiBie='an';
                    else var xiBie=get.xiBie(cards[0]);
                    var name;
                    switch(xiBie){
                        case 'shui':name='shuiLianZhan';break;
                        case 'huo':name='huoYanZhan';break;
                        case 'feng':name='fengShenZhan';break;
                        case 'lei':name='leiGuangZhan';break;
                        case 'di':name='diLieZhan';break;
                        case 'an':name='anMie';break;
                    }

                    player.useCard({name:name,xiBie:xiBie,mingGe:'sheng',shengXieJuBao:true},target);
                },
            },
            yuanChu_shengHuangJiangLin:{
                inherit:'shengHuangJiangLin',
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.zhiLiao>=2||player.countZhiShiWu('yuanChu_xinYang')>=2;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog(`圣煌降临：移除2点[治疗]或2点<span class='hong'>【信仰】</span>`,'hidden');
                        var list=[];
                        if(player.zhiLiao>=2){
                            list.push('治疗');
                        }
                        if(player.countZhiShiWu('yuanChu_xinYang')>=2){
                            list.push('信仰');
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
							content:function(){
                                'step 0'
								event.links=lib.skill.yuanChu_shengHuangJiangLin_backup.links;
                                if(event.links[0]=='治疗'){
                                    player.changeZhiLiao(-2);
                                }else if(event.links[0]=='信仰'){
                                    player.removeZhiShiWu('yuanChu_xinYang',2);
                                }
                                'step 1'
                                player.hengZhi();
                                player.addFaShu();
							},
						}
					},
                    mod:{
                        aiaiOrder:function(player,item,num){
                            if(get.info(item).type=='teShu'&&player.isHengZhi()) return num-0.5;
                        },
                    }
                },
                group:"yuanChu_shengHuangJiangLin_chongZhi",
                subSkill:{
                    chongZhi:{
                        trigger:{player:'teShuBefore'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return true;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.changeZhiLiao(1)
                        }
                    }
                },
            },
            yuanChu_shengGuangBaoLie: {
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.isHengZhi()&&player.zhiLiao>0;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('圣光爆裂','hidden');
                        var list=[['1',"<span class='tiaoJian'>(移除你的1[治疗])</span>摸1张牌[强制]，对手牌数小于你的目标对手造成2点攻击伤害③，你+1<span class='hong'>【信仰】</span>"],['2',"<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害，Y为目标数中拥有[治疗]的人数，你+X<span class='hong'>【信仰】</span>"]];
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return player.zhiLiao>=1;
                        }
                        if(link=='2'){
                            var bool=game.hasPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                            });
                            return bool;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['yuanChu_shengGuangBaoLie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['yuanChu_shengGuangBaoLie_2']);
                        }
						return next;
					},
                    check:function(button){
                        var player=_status.event.player;
                        var link=button.link;
                        if(link=='1'){
                            return player.countEmptyCards();
                        }else if(link=='2'){
                            return 1.1;
                        }
                        return 0.1;
                    },
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        content:async function(event,trigger,player){
                            await player.changeZhiLiao(-1);
                            await player.draw(1);
                            var bool=game.hasPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<player.countCards('h');
                            });

                            if(bool){
                                var targets=await player.chooseTarget(true,function(card,player,target){
                                    return player.side!=target.side&&target.countCards('h')<player.countCards('h');
                                })
                                .set('ai',function(target){
                                    var player=_status.event.player;
                                    return get.damageEffect2(target,player,2);
                                })
                                .forResultTargets();
                                if(targets.length>0) await targets[0].damage(2,player);
                            }

                            await player.addZhiShiWu('yuanChu_xinYang');
                        },
                    },
                    2:{
                        type:'faShu',
                        content:async function(event,trigger,player){
                            var targets=game.filterPlayer(function(current){
                                return current.side!=player.side;
                            });
                            //获取对手中手牌数最小的角色的手牌数
                            var num=Infinity;
                            for(var i=0;i<targets.length;i++){
                                if(targets[i].countCards('h')<num) num=targets[i].countCards('h');
                            }
                            var cha=player.countCards('h')-num;
                            var list=[];
                            for(var i=1;i<=player.zhiLiao;i++){
                                if(i>cha) break;
                                list.push(i);
                            }

                            var result=await player.chooseButtonTarget({
                                createDialog:[
                                    `<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害， Y为目标数中拥有[治疗]的人数，你+X<span class='hong'>【信仰】</span>。`,
                                    [list,'tdnodes'],
                                ],
                                forced:true,
                                selectTarget(){
                                    if(!ui.selected.buttons.length) return 0;
                                    else return [1,ui.selected.buttons[0].link];
                                },
                                filterTarget:function(card,player,target){
                                    return target.countCards('h')<=player.countCards('h')-ui.selected.buttons[0].link&&target.side!=player.side;
                                },
                                ai1:function(button){
                                    return button.link;
                                },
                                ai2:function(target){
                                    var damageEffect= get.damageEffect2(target,player,2);
                                    if(target.zhiLiao>0) damageEffect+=0.5;
                                    return damageEffect;
                                },
                            }).forResult();

                            var num=result.links[0];
                            var targets=result.targets.sortBySeat(player);
                            await player.changeZhiLiao(-num);
                            game.log(player,'选择了',targets);
                            await player.chooseToDiscard(true,'h',num);

                            var damageNum=2;
                            for(var i=0;i<targets.length;i++){
                                if(targets[i].zhiLiao>0) damageNum++;
                            }
                            for(var i=0;i<targets.length;i++){
                                await targets[i].damage(damageNum,player);
                            }
                            await player.addZhiShiWu('yuanChu_xinYang',num);
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var bool=game.hasPlayer(function(current){
                            return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                        });
                        if(bool&&player.zhiLiao>0){
                            return player.countCards('h')-2;
                        }else return 8-player.countCards('h');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yuanChu_shengHuangHuiGuangPao:{
                markimage:'image/card/zhuanShu/yuanChu_shengHuangHuiGuangPao.png',
                intro:{
                    content:`<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除4点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然后移除等同我方落后士气的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>数)</span>所有角色将手牌调整为4张，我方【星杯区】+1[星杯]，然后将一方[士气]调整与另一方相同,我方所有角色各+1[治疗]，你额外+1[攻击行动]或[法术行动]并将【圣煌辉光炮】翻面。`,
                    nocount:true,
                },
                onremove:'storage',
                type:'faShu',
                enable:'faShu',
                selectTarget:-1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.hasZhiShiWu('yuanChu_shengHuangHuiGuangPao')) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    num+=Math.max(0,shiQiCha);
                    return player.countZhiShiWu('yuanChu_xinYang')>=num;
                },
                contentBefore:async function(event,trigger,player){
                    await player.removeZhiShiWu('yuanChu_xinYang',4);
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    if(shiQiCha>0) await player.removeZhiShiWu('yuanChu_xinYang',shiQiCha);
                },
                content:async function(event,trigger,player){
                    var target=event.target;
                    await target.tiaoZhengShouPai(4);
                },
                contentAfter:async function(event,trigger,player){
                    await player.changeXingBei(1);
                    var choiceList=['红方士气设置为蓝方士气','蓝方士气设置为红方士气'];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '选项一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '选项二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '选项一';
                        else return '选项二';
                    }).forResultControl();
                    if(control=='选项一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                    for(var current of game.players){
                        if(current.side==player.side){
                            await current.addZhiLiao();
                        }
                    }
                    player.addGongJiOrFaShu();
                    await player.removeZhiShiWu('yuanChu_shengHuangHuiGuangPao');
                    await player.addZhiShiWu('yuanChu_shengHuangYuHui');
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 5;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 5;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yuanChu_shengHuangYuHui:{
                markimage:'image/card/zhuanShu/yuanChu_shengHuangYuHui.png',
                intro:{
                    content:`<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除4点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然后移除等同我方落后士气的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>数)</span>所有角色将手牌调整为4张，我方【星杯区】+1[星杯]，然后将一方[士气]调整与另一方相同，然后移除【圣煌余辉】。`,
                    nocount:true,
                },
                onremove:'storage',
                type:'faShu',
                enable:'faShu',
                selectTarget:-1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.hasZhiShiWu('yuanChu_shengHuangYuHui')) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    num+=Math.max(0,shiQiCha);
                    return player.countZhiShiWu('yuanChu_xinYang')>=num;
                },
                contentBefore:async function(event,trigger,player){
                    await player.removeZhiShiWu('yuanChu_xinYang',4);
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi; 
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                    }
                    await player.removeZhiShiWu('yuanChu_xinYang',shiQiCha);
                },
                content:async function(event,trigger,player){ 
                    var target=event.target;
                    await target.tiaoZhengShouPai(4);
                },
                contentAfter:async function(event,trigger,player){
                    await player.changeXingBei(1);
                    var choiceList=['红方士气设置为蓝方士气','蓝方士气设置为红方士气'];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '选项一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '选项二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '选项一';
                        else return '选项二';
                    }).forResultControl();
                    if(control=='选项一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                    await player.removeZhiShiWu('yuanChu_shengHuangYuHui');
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 5;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 5;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yuanChu_ziDongTianChong:{
                inherit: 'ziDongTianChong',
                content:async function(event,trigger,player){
                    var choiceList=[`[水晶]你+1<span class='hong'>【信仰】</span>或+1[治疗]`,`[宝石]你+1[水晶]，+2<span class='hong'>【信仰】</span>或+2[治疗]`];
                    var list=['选项一'];
                    if(player.canBiShaBaoShi()){
                        list.push('选项二');
                    }
                    var control=await player.chooseControl(list).set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '选项二';
                        return '选项一';
                    }).forResultControl();
                    if(control=='选项一'){
                        await player.removeBiShaShuiJing();
                        var num=1;
                    }else{
                        await player.removeBiShaBaoShi();
                        await player.addNengLiang('shuiJing',1);
                        var num=2;
                    }
                    var list=['信仰','治疗'];
                    control=await player.chooseControl(list).set('prompt','+'+num+"点<span class='hong'>【信仰】</span>或[治疗]").forResultControl();
                    'step 3'
                    if(control=='治疗'){
                        await player.changeZhiLiao(num);
                    }else if(control=='信仰'){
                        await player.addZhiShiWu('yuanChu_xinYang',num);
                    }
                },
            },
            yuanChu_xinYang:{
                inherit: 'xinYang',
            },

            // 捣蛋萝莉
            'tianShi?': {
                inherit: "tianShiZhiQiang",
                mod:{
                    aiValue(player, card, num) {
				        if (card.hasDuYou('tianShiZhiQiang')) return num + 1.2;
			        },
                }
            },
            panNiZhiQiang: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return get.name(card) == "shengDun";
                },
                lose:false,
                discard: false,
                showCards: true,
                filter: function (event, player) {
                    var bool1 = player.hasCard(function (card) {
                        return lib.skill.panNiZhiQiang.filterCard(card);
                    });
                    var bool2 = game.hasPlayer(function (current) {
                        return lib.skill.panNiZhiQiang.filterTarget("", "", current);
                    });
                    return bool1 && bool2;
                },
                filterTarget: function (card, player, target) {
                    return target.hasJiChuXiaoGuo();
                },
                content: async function (event, trigger, player) {
                    var target = event.target;
                    var list = target.jiChuXiaoGuoList();
                    if (list.length == 0) {
                        return;
                    }
                    if (list.includes("_shengDun")) {
                        // 如果目标角色拥有【圣盾】，因为圣盾只能存在1个，只能选择【圣盾】
                        var control = "_shengDun";
                    }else if(list.length==1){
                        var control = list[0];
                    }
                    else{
                        var control = await player
                        .chooseControl(list)
                        .set("prompt", "选择要获得的基础效果")
                        .set("targetX", target)
                        .set("listX", list)
                        .set('ai', function () {
                            var list= _status.event.listX;
                            if(list.length==1) return list[0];
                            if(list.includes("_xuRuo")) return "_xuRuo";
                            for(var xiaoGuo of game.jiChuXiaoGuo['fengYinShi_xiaoGuo']){
                                if(target.hasJiChuXiaoGuo(xiaoGuo)){
                                    return xiaoGuo;
                                }
                            }
                            return list[0];
                        })
                        .forResultControl();
                    }
                    
                    var card;
                    if (control == "_zhongDu" && target.getJiChuXiaoGuo("_zhongDu").length != 1) {
                        var zhongDu = await player.chooseCardButton(target.getJiChuXiaoGuo("_zhongDu"), true, "选择要获得的中毒").forResultLinks();
                        card = zhongDu[0];
                        var list = target.getJiChuXiaoGuo("_zhongDu");
                        var index = list.indexOf(card);
                        target.storage.zhongDu.splice(index, 1);
                    } else {
                        card = target.getJiChuXiaoGuo(control);
                        if (control == "_zhongDu") target.storage.zhongDu = [];
                    }
                    await target.lose(card,ui.ordering);
                    //await game.cardsGotoOrdering(card);
                    await target.addJiChuXiaoGuo('_shengDun', player,event.cards);
                    //game.log(player, "获得了", card);
                    await player.gain(card,'gain2');
                    if (!game.jiChuXiaoGuo.pai_xiaoGuo.includes(control)) {
                        target.removeSkill(control);
                    }
                    await player.chooseToDiscard(1, "h", true);
                },
                ai:{
                    order:3.25,
                    result: {
                        target: function (player, target) {
                            if(target.side!= player.side) return 0;
                            return Math.max(0,get.jiChuXiaoGuoEffect(target));
                        }
                    }
                }
            },
            tricky: {
                subSkill: {
                    xiaoGuo: {
                        marktext: "T",
                        intro: {
                            content: "jiChuXiaoGuo",
                            mark:function (dialog, content, player) {
                                dialog.addText("基础效果");
                            },
                        },
                        onremove: function (player, skill) {
                            const cards = player.hasJiChuXiaoGuo(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        tag: {
                            jiChuXiaoGuo: true,
                        },
                    },
                },
            },
            shenMiFuBi: {
                trigger: { player: "faShuAfter" },
                forced: true,
                filter: function (event, player) {
                    return game.hasPlayer(function (current) {
                        return !current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                    });
                },
                content: async function (event, trigger, player) {
                    const targets = await player
                        .chooseTarget("神秘伏笔：将牌库顶1-2张牌放置于X名目标角色旁，作为【Tricky】", true, [1, 2], function (card, player, target) {
                            return lib.filter.targetEnabled({ name: "tricky" }, player, target);
                        })
                        .set('ai', function (target) {
                            var player = _status.event.player;
                            if(player.side == target.side) return 0.1;
                            else return 1;
                        })
                        .forResultTargets();
                    for (var target of targets) {
                        if (!target.hasSkill("tricky_xiaoGuo")) {
                            target.addSkill("tricky_xiaoGuo");
                        }
                        var cards = await get.cards();
                        await target.addJiChuXiaoGuo('tricky_xiaoGuo', player, cards).set('animate','draw');
                    }
                },
            },
            'T-r-i-c-k-y!': {
                trigger: { source: "gongJiWeiMingZhong" },
                filter: function (event, player) {
                    if (event.yingZhan == true) return false;
                    if (
                        !game.hasPlayer(function (current) {
                            return current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                        })
                    )
                        return false;
                    return true;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseTarget(function (card, player, target) {
                            return target.hasJiChuXiaoGuo("tricky_xiaoGuo");
                        })
                        .set("ai", function (target) {
                            var player = _status.event.player;
                            return get.damageEffect2(target, player, 2);
                        })
                        .set('prompt',get.prompt('T-r-i-c-k-y!'))
                        .set('prompt2',lib.translate['T-r-i-c-k-y!_info'])
                        .forResult(); 
                },
                content: async function (event, trigger, player) {
                    for (var target of event.targets) {
                        var cards = target.getJiChuXiaoGuo("tricky_xiaoGuo");
                        var card = cards[0];
                        var xiBie = get.xiBie(card);
                        var dialog = ["T-r-i-c-k-y!：移除该【Tricky】[展示]并额外弃1张同系牌[展示]",[[card], "card"]];

                        var result = await player
                            .chooseCard(card=> get.xiBie(card) == _status.event.xiBie)
                            .set("xiBie", xiBie)
                            .set('dialog', dialog)
                            .set('ai',function(card){
                                return 5- get.value(card);
                            })
                            .forResult();
                        if (result.bool) {
                            await target.discard(target.getJiChuXiaoGuo("tricky_xiaoGuo"), "tricky_xiaoGuo").set("visible", true);
                            target.removeSkill("tricky_xiaoGuo");
                            await player.discard(result.cards,'showHiddenCards');
                            await target.faShuDamage(2, player);
                        }
                    }
                },
            },
            trickOrTreat: {
                forced: true,
                trigger: { player: "xingDongEnd" },
                filter: function (event, player) {
                    let x = 0;
                    for (var p of game.players) {
                        if (p.hasJiChuXiaoGuo("tricky_xiaoGuo")) {
                            x++;
                        }
                    }
                    return x > 4;
                },
                content: async function (event, trigger, player) {
                    var woFang = 0;
                    var duiFang = 0;
                    var cards= [];
                    var players = game.filterPlayer(function (current) {
                        return current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                    }).sortBySeat(player);
                    for (var p of players) {
                        cards.push(p.getJiChuXiaoGuo("tricky_xiaoGuo")[0]);
                    }
                    await player.showHiddenCards(cards);
                    
                    for(var p of players){
                        var card= p.getJiChuXiaoGuo("tricky_xiaoGuo")[0];
                        var name=get.colorName(player);
                        var dialog = [`弃1张与面前【Tricky】对应属性的牌[展示]<br>否则${name}对你造成2点法术伤害③`,[[card], "card"]];
                        var result = await p.chooseToDiscard(1, "h",'showCards',card=> get.xiBie(card) == _status.event.xiBie)
                            .set("xiBie", get.xiBie(card))
                            .set('dialog', dialog)
                            .set('ai',function(card){
                                return 6- get.value(card);
                            })
                            .forResult();
                        if(result.bool){
                            if(player.side== p.side) woFang++;
                            else duiFang++;
                        }else{
                            await p.faShuDamage(2, player);
                        }
                    }

                    for(var p of players){
                        await p.discard(p.getJiChuXiaoGuo("tricky_xiaoGuo"), "tricky_xiaoGuo").set("visible", true);
                        p.removeSkill("tricky_xiaoGuo");
                    }

                    if (woFang > duiFang) {
                        const choiceList = ["【战绩区】+1[水晶]，并且你+1[水晶]", "弃1张牌并额外获得一个回合"];
                        const choices = ["选项一", "选项二"];
                        let next = player.chooseControl(choices).set("prompt", "我方弃牌>对方：选择一项").set("choiceList", choiceList);
                        var control = await next.forResultControl();
                        if (control == "选项一") {
                            await player.changeZhanJi("shuiJing", 1);
                            await player.addNengLiang("shuiJing", 1);
                        } else {
                            await player.chooseToDiscard(1, "h", true);
                            player.insertPhase();
                        }
                    } else if (woFang < duiFang) {
                        await player.changeZhanJi("baoShi", 1, !player.side);
                    }
                },
            },
            suprise: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaShuiJing() && player.countCards("h") > 0;
                },
                selectCard: 1,
                filterCard: true,
                discard: true,
                async content(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    player.addTempSkill("suprise_sheZhi", { player: "phaseEndBefore" });
                    var cards=[];
                    var players = game.filterPlayer(function (current) {
                        return current.hasJiChuXiaoGuo("tricky_xiaoGuo");
                    }).sortBySeat(player);
                    for (var p of players) {
                        if (p.hasJiChuXiaoGuo("tricky_xiaoGuo")) {
                            var tricky = p.getJiChuXiaoGuo("tricky_xiaoGuo");
                            cards.addArray(tricky);
                        }
                    }
                    await player.gain(cards);
                    for(var p of players){
                        p.removeSkill("tricky_xiaoGuo");
                    }

                    var bool=game.hasPlayer(function(current){
                        return lib.filter.targetEnabled({ name: "tricky" }, player, current);
                    });

                    while (player.countCards("h") > 0 && bool) {
                        var result = await player
                            .chooseCardTarget({
                                filterCard:true,
                                filterTarget:function (card, player, target) {
                                    return lib.filter.targetEnabled({ name: "tricky" }, player, target);
                                },
                                prompt:"选择1名目标角色，将1张手牌作为基础效果【Tricky】放置",
                                ai1(card) {
                                    return 6- get.value(card);
                                },
                                ai2(target) {
                                    var player = _status.event.player;
                                    if(player.side == target.side) return 0.1;
                                    else return 1;
                                },
                            }).forResult();

                        if (!result.bool) {
                            break;
                        }
                        var target = result.targets[0];
                        var cards = result.cards;

                        if (!target.hasSkill("tricky_xiaoGuo")) {
                            target.addSkill("tricky_xiaoGuo");
                        }
                        await target.addJiChuXiaoGuo('tricky_xiaoGuo', player, cards).set('animate','draw');
                        bool=game.hasPlayer(function(current){
                            return lib.filter.targetEnabled({ name: "tricky" }, player, current);
                        });
                    }
                },
                subSkill: {
                    sheZhi: {
                        mod: {
                            maxHandcard: function (player, num) {
                                return num + 5;
                            },
                        },
                    },
                },
            },

            //trick圣弓
            trick_tianZhiGong:{
                inherit: 'tianZhiGong',
                content:function(){
                    player.addNengLiang('baoShi',2);
                }
            },
            trick_shengHuangJiangLin:{
                inherit:'shengHuangJiangLin',
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog(`圣煌降临：移除2点[治疗]或2点<span class='hong'>【信仰】</span>`,'hidden');
                        var list=[];
                        if(player.zhiLiao>=2){
                            list.push('治疗');
                        }
                        if(player.countZhiShiWu('xinYang')>=2){
                            list.push('信仰');
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
							content:function(){
                                'step 0'
								event.links=lib.skill.trick_shengHuangJiangLin_backup.links;
                                if(event.links[0]=='治疗'){
                                    player.changeZhiLiao(-2);
                                }else if(event.links[0]=='信仰'){
                                    player.removeZhiShiWu('xinYang',2);
                                }
                                'step 1'
                                player.hengZhi();
                                player.addFaShu();
							},
						}
					},
                    mod:{
                        aiaiOrder:function(player,item,num){
                            if(get.info(item).type=='teShu'&&player.isHengZhi()) return num-0.5;
                        },
                    }
                },
                group:"trick_shengHuangJiangLin_chongZhi",
                subSkill:{
                    chongZhi:{
                        trigger:{player:'teShuBefore'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return true;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.changeZhiLiao(1)
                        }
                    }
                },
            },
            trick_shengGuangBaoLie:{
                inherit: 'shengGuangBaoLie',
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('圣光爆裂','hidden');
                        var list=[['1',"移除你的1点[治疗]，摸1张牌[强制]，你+1<span class='hong'>【信仰】</span>，目标队友+1[治疗]"],['2',"<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害。 Y为目标数中拥有[治疗]的人数"]];
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            var bool=game.hasPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                            })
                            return player.zhiLiao>0&&bool;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['trick_shengGuangBaoLie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['shengGuangBaoLie_2']);
                        }
						return next;
					},
                    prompt:function(links,player){
                        if(links[0]=='1'){
                            return '目标队友+1[治疗]';
                        }else if(links[0]=='2'){
                            return;
                        }
                        
                    },
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        filterCard:true,
                        selectCard:0,//让ai可以发动
                        content:function(){
                            'step 0'
                            if(player.zhiLiao>0){
                                player.changeZhiLiao(-1);
                            }
                            'step 1'
                            player.draw(1);
                            'step 2'
                            player.addZhiShiWu('xinYang');
                            'step 3'
                            target.changeZhiLiao(1);
                        },
                        ai:{
                            result:{
                                target:function(target,player){
                                    return get.zhiLiaoEffect(target,1);
                                }
                            }
                        }
                    },
                },
            },
            trick_shengHuangHuiGuangPao:{
                inherit: 'shengHuangHuiGuangPao',
                contentAfter:async function(event,trigger,player){
                    await player.changeXingBei(1);
                    var choiceList=['红方士气设置为蓝方士气','蓝方士气设置为红方士气'];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return '选项一';
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return '选项二';
                        }
                        var num=Math.random();
                        if(num<0.5) return '选项一';
                        else return '选项二';
                    }).forResultControl();
                    if(control=='选项一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                    for(var current of game.players){
                        if(current.side==player.side){
                            await current.addZhiLiao();
                        }
                    }
                },
            },
            trick_ziDongTianChong:{
                inherit: 'ziDongTianChong',
                content:async function(event,trigger,player){
                    var choiceList=[`[水晶]你+1<span class='hong'>【信仰】</span>或+1[治疗]，然后+1【圣煌辉光炮】`,`[宝石]你+1[水晶]，+2<span class='hong'>【信仰】</span>或目标角色+2[治疗]`];
                    var list=['选项一'];
                    if(player.canBiShaBaoShi()){
                        list.push('选项二');
                    }
                    var control=await player.chooseControl(list).set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '选项二';
                        return '选项一';
                    }).forResultControl();
                    if(control=='选项一'){
                        await player.removeBiShaShuiJing();
                        var num=1;
                    }else{
                        await player.removeBiShaBaoShi();
                        await player.addNengLiang('shuiJing',1);
                        var num=2;
                    }
                    var list=['信仰','治疗'];
                    var add=await player.chooseControl(list).set('prompt','+'+num+"点<span class='hong'>【信仰】</span>或[治疗]").forResultControl();

                    if(add=='治疗'){
                        if(control=='选项二'){
                            var targets=await player.chooseTarget(`选择目标角色+2[治疗]`).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,2);
                            }).forResultTargets();
                            var target=targets[0];
                            await target.changeZhiLiao(2);
                        }else await player.changeZhiLiao(num);
                    }else if(add=='信仰'){
                        await player.addZhiShiWu('xinYang',num);
                    }
                    if(control=='选项一'){
                        await player.addZhiShiWu('shengHuangHuiGuangPaoX');
                    }
                },
            },

            //trick冒险家
            trick_qiZha:{
                inherit: 'qiZha',
                selectCard:2,
                content:async function(event, trigger, player){
                    await event.trigger('qiZha');
                    var length=event.cards.length;
                    var xiBie,name;
                    if(length==2){
                        var list=['shui','huo','feng','lei','di'];
                        var random=list.randomGet();
                        var control=await player.chooseControl(list).set('prompt','选择攻击系别').set('ai',function(){
                            return _status.event.random;
                        }).set('random',random).forResult('control');
                        xiBie=control;
                        switch(xiBie){
                            case'shui':name='shuiLianZhan';break;
                            case 'huo':name='huoYanZhan';break;
                            case 'feng':name='fengShenZhan';break;
                            case 'lei':name='leiGuangZhan';break;
                            case 'di':name='diLieZhan';break;
                        }
                    }
                    var card={name:name,xiBie:xiBie};
                    await player.useCard(card,event.target).set('action',true);
                },
            },
            trick_maoXianJiaTianTang:{
                enable:'xingDong',
                type:'teShu',
                filter: function(event, player) {
                    return player.canBiShaShuiJing()&&get.zhanJi(player.side).length>0;
                },
                chooseButton:{
                    dialog: function(event, player) {
                        var dialog=ui.create.dialog('冒险家天堂：移除自身X[能量]','hidden');
                        var list=[];
                        for(var i=0;i<player.countNengLiang('baoShi');i++){
                            list.push('宝石');
                        }
                        for(var i=0;i<player.countNengLiang('shuiJing');i++){
                            list.push('水晶');
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
                    },
                    select:[1,Infinity],
                    backup:function(links,player){
						return{
							links:links,
							type:'teShu',
							content:async function(event,trigger,player){
                                var links=lib.skill.trick_maoXianJiaTianTang_backup.links;
                                var tiLian=[];
                                //移除能量
                                var baoShi=links.filter(function(xingShi){
                                    return xingShi=='宝石';
                                }).length;
                                var shuiJing=links.filter(function(xingShi){
                                    return xingShi=='水晶';
                                }).length;
                                if(baoShi>0){
                                    await player.removeNengLiang('baoShi',baoShi);
                                }
                                if(shuiJing>0){
                                    await player.removeNengLiang('shuiJing',shuiJing);
                                }
                                //提炼
                                var zhanJi=get.zhanJi(player.side);
                                var list=[];
                                for(var i=0;i<zhanJi.length;i++){
                                    list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                };
                                var next=player.chooseButton([
                                    '选择提炼的星石',
                                    [list,'tdnodes'],
                                ]);
                                next.set('forced',true);
                                next.set('selectButton',[1,2]);
                                next.set('ai',function(button){
                                    if(button.link=='baoShi'){
                                        return 1;
                                    }else return 0.5;
                                });

                                tiLian= await next.forResultLinks();
                                var tiLianBaoShi= tiLian.filter(function(xingShi){
                                    return xingShi=='baoShi';
                                }).length;
                                var tiLianShuiJing= tiLian.filter(function(xingShi){
                                    return xingShi=='shuiJing';
                                }).length;
                                if(tiLianBaoShi>0){
                                    await player.removeZhanJi('baoShi',tiLianBaoShi);
                                }
                                if(tiLianShuiJing>0){
                                    await player.removeZhanJi('shuiJing',tiLianShuiJing);
                                }
                                //额外提炼水晶
                                var zhanJi= get.zhanJi(player.side);
                                var zhanJiShuiJing=zhanJi.filter(function(xingShi){
                                    return xingShi=='shuiJing';
                                });
                                var num=links.length;
                                if(num>zhanJiShuiJing.length){
                                    num=zhanJiShuiJing.length;
                                }
                                if(num>0){
                                    tiLian.addArray(zhanJiShuiJing);
                                    await player.removeZhanJi('shuiJing',num);
                                }
                                //分配提炼结果
                                var range=[0,2];
                                if(tiLian.length==1) range=[0,1];
                                var select=player.chooseTarget(`将提炼的星石分配给至多${range[1]}名目标队友`,true,range,function(card, player, target) {
                                    if(target==player) return false;
                                    return target.side==player.side;
                                }).set('ai', function (target) {
                                    return target.countEmptyNengLiang()+0.5;//防止0
                                });
                                var targets= await select.forResultTargets();
                                if(targets.length==0) return;
                                else if(targets.length==1){
                                    var target=targets[0];
                                    var baoShi=tiLian.filter(function(xingShi){
                                        return xingShi=='baoShi';
                                    }).length;
                                    var shuiJing=tiLian.filter(function(xingShi){
                                        return xingShi=='shuiJing';
                                    }).length;
                                    if(baoShi>0){
                                        await target.addNengLiang('baoShi',baoShi);
                                    }
                                    if(shuiJing>0){
                                        await target.addNengLiang('shuiJing',shuiJing);
                                    }
                                }else if(targets.length==2){
                                    var target1=targets[0];
                                    var target2=targets[1];
                                    var name=get.colorName(target1);
                                    var tiLianTarget1=[];
                                    var tiLianTarget2=[];
                                    var baoShi=0;
                                    var shuiJing=0;

                                    var list=[];
                                    for(var i=0;i<tiLian.length;i++){
                                        list.push([tiLian[i],get.translation(tiLian[i])]);
                                    };
                                    tiLianTarget1= await player.chooseButton([
                                        `选择分配给${name}的星石`,
                                        [list,'tdnodes'],
                                    ])
                                    .set('forced',true)
                                    .set('selectButton',[1,tiLian.length-1])
                                    .set('ai',function(button){
                                        var target=_status.event.target;
                                        if(ui.selected.buttons.length>=target.countEmptyNengLiang()) return 0;
                                        if(button.link[0]=='baoShi'){
                                            return 1;
                                        }else return 0.5;
                                    })
                                    .set('target',target1).forResultLinks();

                                    tiLian.removeArray(tiLianTarget1);
                                    baoShi=tiLianTarget1.filter(function(xingShi){
                                        return xingShi=='baoShi';
                                    }).length;
                                    shuiJing=tiLianTarget1.filter(function(xingShi){
                                        return xingShi=='shuiJing';
                                    }).length;
                                    if(baoShi>0){
                                        await target1.addNengLiang('baoShi',baoShi);
                                    }
                                    if(shuiJing>0){
                                        await target1.addNengLiang('shuiJing',shuiJing);
                                    }

                                    var baoShi=tiLian.filter(function(xingShi){
                                        return xingShi=='baoShi';
                                    }).length;
                                    var shuiJing=tiLian.filter(function(xingShi){
                                        return xingShi=='shuiJing';
                                    }).length;
                                    if(baoShi>0){
                                        await target2.addNengLiang('baoShi',baoShi);
                                    }
                                    if(shuiJing>0){
                                        await target2.addNengLiang('shuiJing',shuiJing);
                                    }
                                }
                                
							},
						}
					},
                    check: function (button) {
                        var num=0;
                        var player=_status.event.player;
                        for(var current of game.players){
                            if(player.side==current.side){
                                num+=current.countEmptyNengLiang();
                            }
                        }
                        if(button.link<=num){
                            return button.link;
                        }else return 0;
                    },
                },
                ai:{
                    order: 3.3,
                    result:{
                        player: function(player){
                            var num=0;
                            for(var current of game.players){
                                if(player.side==current.side){
                                    num+=current.countEmptyNengLiang();
                                }
                            }
                            if(num<=1) return 0;
                            var zhanJi= get.zhanJi(player.side).length;
                            if(zhanJi<2) return 0;
                            else return 1;
                        }
                    }
                }
            },

            //萝莉番长
            xuanHuaShangDeng: {
                trigger: { player: "gongJiMingZhong" },
                forced: true,
                content: async function (event, trigger, player) {
                    let num = 0;
                    for (; num < 3;) {
                        num++;
                        let cards = await get.cards();
                        await player.showHiddenCards(cards);
                        const card = cards[0];
                        if (get.mingGe(card) !== "xue" && get.type(card) !== "faShu") {
                            break;
                        }
                    }
                    trigger.changeDamageNum(num);
                },
            },
            yeLuSiKu:{
                group: ['yeLuSiKu_xueYingKuangDao','yeLuSiKu_xueXingPaoXiao','xueYingKuangDao_gongJiMingZhong'],
                subSkill:{
                    xueYingKuangDao:{
                        inherit: 'xueYingKuangDao',
                    },
                    xueXingPaoXiao:{
                        inherit: 'xueXingPaoXiao',
                    },
                },
                trigger:{player:['logSkillBegin']},
                forced:true,
                filter:function(event,player){
                    return event.skill&&event.skill.startsWith('yeLuSiKu_');
                },
                content: async function(event,trigger,player){
                },
            },
            aiSiTianLiu:{
                trigger:{player:'yeLuSiKu_xueXingPaoXiaoBegin'},
                forced:true,
                content: async function(event,trigger,player){
                    if(trigger.getParent("useCard").target.zhiLiao>0){
                        trigger.getParent("useCard").wuFaAnMie();
                        trigger.getParent("useCard").wuFaShengGuang();
                    }
                    trigger.cancel();
                },
            },
            mieChaKuCha:{
                trigger: { source: "gongJiMingZhongAfter" },
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                async cost(event, trigger, player) {
                    var list = ["[宝石]本次攻击伤害额外+2。", "[水晶]本次攻击伤害额外+1。"];
                    var choices = ["选项二",'取消'];
                    if (player.canBiShaBaoShi()) {
                        choices.unshift("选项一");
                    }
                    let next = player
                        .chooseControl(choices)
                        .set("prompt", get.prompt("mieChaKuCha"))
                        .set("prompt2", lib.translate["mieChaKuCha_info"])
                        .set("choiceList", list)
                        .set("ai", function () {
                            return 0;
                        });
                    var control = await next.forResultControl();
                    event.result={
                        bool: control != '取消',
                        cost_data:control,
                    }
                },
                content: async function (event, trigger, player) {
                    var control = event.cost_data;
                    if (control == "选项一") {
                        await player.removeBiShaBaoShi();
                        trigger.changeDamageNum(2);
                    } else if (control == "选项二") {
                        await player.removeBiShaShuiJing();
                        trigger.changeDamageNum(1);
                    }
                },
            },

            // 见习制片
            yuanZiXiShou: {
                inherit:'yuanSuXiShou',
                content: function (event, trigger, player) {
                    player.addZhiShiWu("yuanZi");
                },
            },
            yuanZiChongSu: {
                type: "faShu",
                enable: "faShu",
                selectCard: [0, 3],
                filterCard: true,
                filter: function (event, player) {
                    return player.countMark("yuanZi") >= 2;
                },
                content: async function (event, trigger, player) {
                    await player.removeZhiShiWu("yuanZi", 2);
                    var cards = event.cards;
                    if(cards.length>0){
                        await player.draw(cards.length);
                    }
                    player.addFaShu();
                },
                check: function (card) {
                    var value = get.value(card);
                    var duYouList=get.duYouList(card);
                    if(duYouList&&(duYouList.includes('bingDong')||duYouList.includes('yunShi')||duYouList.includes('huoQou')||duYouList.includes('fengRen')||duYouList.includes('leiJi'))){
                        value += 1.5;
                    }
                    return 5 - value;
                },
                ai: {
                    order: function (item, player) {
                        return (
                            2 +
                            0.5 *
                            Math.max(
                                player.countCards(
                                    "h",
                                    card => get.mingGe(card) != "yong" || (get.type(card) == "faShu" && get.name(card) !== "moDan")
                                ),
                                3
                            )
                        );
                    },
                },
            },
            yuanSuXueTu: {
                subSkill:{
                    yunShi:{
                        inherit:'yunShi',
                    },
                    bingDong:{
                        inherit:'bingDong',
                    },
                    huoQou:{
                        inherit:'huoQou',
                    },
                    fengRen:{
                        inherit:'fengRen',
                    },
                    leiJi:{
                        inherit:'leiJi',
                    }
                },
                group: ['yuanSuXueTu_yunShi', 'yuanSuXueTu_bingDong', 'yuanSuXueTu_huoQou', 'yuanSuXueTu_fengRen', 'yuanSuXueTu_leiJi'],
                trigger:{player:['logSkillBegin']},
                forced:true,
                filter:function(event,player){
                    return event.skill&&event.skill.startsWith('yuanSuXueTu_');
                },
                content: async function(event,trigger,player){
                },
            },
            leiJiBianYi: {
                trigger:{player:'yuanSuXueTu_leiJiBegin'},
                forced:true,
                content: function(){
                    'step 0'
                    var cards=trigger.cards;
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    var target=trigger.target;
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.addZhiShiWu('yuanZi',1);
                    trigger.cancel();
                },
            },
            yueYun: {
                inherit:'yueGuang',
            },
            yuanZi: {
                intro: {
                    name: "元子",
                    content: "mark",
                    max: 3,
                },
                onremove: "storage",
                markimage: "image/card/zhiShiWu/hong.png",
            },

            //怠惰少女
            bieFanWo:{
                type:'faShu',
                enable:'faShu',
                selectTarget:-1,
                filter: function (event, player) {
                    return player.countCards('h') > 0;
                },
                filterTarget: function (card, player, target) {
                    var muBiao=player;
                    while(muBiao.side!=player.side||muBiao==player){
                        muBiao=muBiao.getNext();
                    }
                    return target==muBiao;
                },
                content: async function(event, trigger, player) {
                    var card=player.getCards('h').randomGet();
                    if(card){
                        await player.discard(card,event.target,'notBySelf');
                    }
                    var targets=await event.target.chooseTarget('选择1名目标对手摸1张牌',true,function(card, player, target) {
                        return target.side!=player.side;
                    }).set('ai', function (target) {
                        return target.countCards('h') + 0.5;
                    }).forResultTargets();
                    var target=targets[0];
                    if(target){
                        await target.draw(1);
                    }
                    await player.addZhanJi('shuiJing', 1);

                    var colorName= get.colorName(event.target);
                    var result = await target.chooseToDiscard('h','showCards', 1, `弃1张法术牌[展示]，否则你摸1张牌、${colorName}加1[治疗]`,function(card) {
                        return get.type(card) == 'faShu';
                    }).set('ai',function(card) {
                        return 6-get.value(card);
                    }).forResult();
                    if(!result.bool){
                        await target.draw(1);
                        await event.target.changeZhiLiao(1);
                    }
                },
                ai:{
                    order: 3.2,
                    result:{
                        player: function(player) {
                            var zhanJi=get.zhanJi(player.side);
                            if(zhanJi.length<game.zhanJiMax) return 1;
                            var targets=game.filterPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')+1>=current.getHandcardLimit();
                            });
                            if(targets.length>0) return 1;
                            return 0;
                        },
                    }
                }
            },
            rangWoTangPing: {
                trigger: { player: "phaseBegin" },
                filter: function (event, player) {
                    return player.countCards('h') > 3;
                },
                async cost(event, trigger, player) {
                    var next= player.chooseTarget(1,function(card, player, target) {
                        return target.side==player.side&& target!=player;
                    });
                    next.set('prompt',get.prompt('rangWoTangPing'));
                    next.set('prompt2',lib.translate['rangWoTangPing_info']);
                    next.set('ai', function (target) {
                        return get.zhiLiaoEffect(target, 1);
                    });
                    event.result = await next.forResult();
                },
                content: async function(event, trigger, player) {
                    await event.targets[0].changeZhiLiao(1);
                    //player.skip('xingDong');
                    trigger.xuRuo=true;
                },
            },
            xiangYongMoDan: {
                enable:['faShu','moDan'],
                type:'faShu',
                selectCard:2,
                filterCard: function(card) {
                    return get.xuanZeTongXiPai(card);
                },
                complexCard: true,
                discard: true,
                showCards: true,
                viewAs:{name:'moDan'},
                viewAsFilter: function(player) {
                    return player.countTongXiPai() >=2;
                },
                ai: {
                    order:3.1,
                    result:{
                        player:1,
                    }
                },
                check: function(card) {
                    return 5-get.value(card);
                },
            },
            buXiangTiLian: {
                init:function(player){
                    player.tempBanSkill('_tiLian','forever');
                },
                onremove:function(player){
                    delete player.storage.temp_ban__tiLian;
                },
                trigger:{global:'_tiLian_backupEnd'},
                forced:true,
                filter:function(event,player){
                    return event.player.side==player.side&&event.player!=player;
                },
                content: async function(event, trigger, player) {
                    await player.addNengLiang('baoShi', 1);
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length>0){
                        var list=[];
                        for(var i=0;i<zhanJi.length;i++){
                            list.push([zhanJi[i],get.translation(zhanJi[i])]);
                        }
                        var next=player.chooseButton([
                            `不想提炼：移除我方【战绩区】1星石`,
                            [list,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('ai',function(button){
                            if(button.link=='baoShi') return 0.5;
                            else return 1;
                        });
                        var links=await next.forResultLinks();
                        await player.removeZhanJi(links[0],1);
                    }
                },
            },
            zaiShuiYiXia:{
                trigger: { player: "xingDongSkipped" },
                forced: true,
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    await player.chooseToDiscard(1,true,'在睡一下：弃1张牌');
                    player.addSkill('zaiShuiYiXia_yiChu');
                    event.yiChu=false;
                    for(var current of game.players){
                        if(current!=player&&player.side==current.side){
                            await current.changeZhiLiao(1).set('zaiShuiYiXia',true);
                        }
                    }
                    player.removeSkill('zaiShuiYiXia_yiChu');
                    if(event.yiChu){
                        await player.changeShiQi(1);
                    }
                },
                subSkill:{
                    yiChu:{
                        trigger:{global:'zhiLiaoYiChu'},
                        direct:true,
                        filter:function(event,player){
                            return event.zaiShuiYiXia&&event.player.side==player.side&&event.player!=player;
                        },
                        content: async function(event, trigger, player) {
                            event.getParent('zaiShuiYiXia').yiChu=true;
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },

            //嫉妒少女
            cuYiXiuXin: {
                trigger: { source: "gongJiWeiMingZhong" },
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                async cost(event, trigger, player) {
                    var next= player.chooseTarget(1);
                    next.set('prompt',get.prompt('cuYiXiuXin'));
                    next.set('prompt2',lib.translate['cuYiXiuXin_info']);
                    next.set('ai', function (target) {
                        var player=_status.event.player;
                        return get.damageEffect2(target, player, 1);
                    });
                    event.result = await next.forResult();
                },
                content: async function(event, trigger, player) {
                    var target=event.targets[0];
                    var colorName=get.colorName(player);
                    var result=await target.chooseToDiscard('h','showCards', 1, `弃1张法术牌[展示]，否则${colorName}对你造成2点法术伤害③、我方【战绩区】+1[水晶]`,function(card) {
                        return get.type(card) == 'faShu';
                    })
                    .set('ai',function(card) {
                        return 6-get.value(card);
                    }).forResult();
                    if(!result.bool){
                        await target.faShuDamage(2,player);
                        await player.addZhanJi('shuiJing', 1);
                    }
                },
            },
            xuRongZhangWo:{
                trigger: { player: "gongJiMingZhong" },
                filter: function (event, player) {
                    return event.yingZhan!=true;
                },
                content: async function(event, trigger, player) {
                    player.storage.extraXingDong.push({
                        xingDong:'faShu',
                        filterCard:function(card,player,event){
                            if(get.name(card)!='moDan') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        filterTarget:function(card, player, target){
                            if(get.name(card)=='moDan'){
                                var mubiao=player.getPrevious();
                                while(mubiao.side==player.side){
                                    mubiao=mubiao.getPrevious();
                                }
                                if(target==mubiao) return true;
                                var mubiao=player.getNext();
                                while(mubiao.side==player.side){
                                    mubiao=mubiao.getNext();
                                }
                                if(target==mubiao) return true;
                            }
                        },
                        prompt:'虚荣掌握：魔弹[法术行动]',
                    });
                },
                group: ['xuRongZhangWo_zuoChuan'],
                subSkill:{
                    zuoChuan:{
                        trigger:{player:'useCardBefore'},
                        direct:true,
                        filter:function(event,player){
                            if(player.hasMark('_moDan')) return false;
                            if(get.name(event.card)!='moDan') return false;
                            var range_l=0,range_r=0;
                            var target=player;
                            while(target!=event.targets[0]){
                                target=target.getPrevious();
                                range_l++;
                            }
                            target=player;
                            while(target!=event.targets[0]){
                                target=target.getNext();
                                range_r++;
                            }
                            if(range_l==range_r){
                                return !(player.side==player.getNext().side);
                            }
                            return range_l<range_r;
                        },
                        content:function(){
                            game.broadcastAll(function(){
                                game.moDanFangXiang='zuo';
                            });
                        },
                    }
                },
            },
            xiangSiBing:{
                enable:['faShu','moDan'],
				filterCard:function(card){
                    return get.xiBie(card)=='di'||get.xiBie(card)=='feng';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.xiangSiBing.filterCard(card);
                    });
				},
                ai:{
                    order:3.2,
                }
            },
            jiDuZhuiFang:{
                usable:1,
                trigger: { player:['faShuAfter','gongJiAfter'] },
                filter: function (event, player) {
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        filterTarget:function(card, player, target){
                            if(get.type(card)=='gongJi'){
                                return target.side!=player.side&&target.countCards('h')>player.countCards('h');
                            }
                        },
                        prompt:'嫉妒追访：攻击手牌数大于你的对手[攻击行动]',
                    });
                },
                check:function(event,player){
                    var targets= game.filterPlayer(function(current){
                        return current.side!=player.side&&current.countCards('h')>player.countCards('h');
                    });
                    return targets.length>0;
                },
                ai:{
                    shuiJing:true
                }
            },
            

            //剑之子
            qingMu:{
                trigger: {global:'gameStart'},
                forced: true,
                filter: function (event, player) {
                    for(var current of game.players){
                        if(current.name1=='jianZhiMoNv') return true;
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    player.tempBanSkill('jianShouShiYan','forever');
                    player.addSkill(['jianYingDuanNian','mengXiangJian']);
                }
            },
            fengZhiJian:{
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    if(event.yingZhan) return false;
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length<=0) return false;
                    if(event.card.hasDuYou('lieFengJi')&&event.target.hasJiChuXiaoGuo('_shengDun')) return true;
                    else if(event.card.hasDuYou('jiFengJi')) return true;
                    return false;
                },
                async cost(event, trigger, player) {
                    var zhanJi=get.zhanJi(player.side);
                    var list=[];
                    for(var i=0;i<zhanJi.length;i++){
                        list.push([zhanJi[i],get.translation(zhanJi[i])]);
                    }
                    var next=player.chooseButton([
                        `风之剑：是否移除我方【战绩区】1星石发动攻击牌上剑圣独有技`,
                        [list,'tdnodes'],
                    ]);
                    var result=await next.forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content: async function(event, trigger, player) {
                    await player.removeZhanJi(event.cost_data[0], 1);
                    if(trigger.card.hasDuYou('lieFengJi')){
                        player.logSkill('lieFengJi');
                        trigger.wuFaShengDun();
                        trigger.wuFaYingZhan();
                    }else if(trigger.card.hasDuYou('jiFengJi')){
                        player.logSkill('jiFengJi');
                        player.addGongJi();
                    }
                }
            },
            jianShouShiYan:{
                trigger: { global: "phaseAfter" },
                filter: function (event, player) {
                    return event.jianShouShiYan==true;
                },
                content: async function(event, trigger, player) {
                    var num=get.xingBei(true)+ get.xingBei(false)+1;
                    var cards=get.cards(num);
                    await player.discard(cards,'showHiddenCards');
                    var result=await player.chooseCardButton('剑守誓言：可以选择1张牌加入手牌',cards).set('ai',function(button){
                        var player=_status.event.player;
                        if(player.countCards('h')>=player.getHandcardLimit()) return 0;
                        var card=button.link;
                        var value=get.value(card);
                        if(get.type(card)=='gongJi'&&get.mingGe(card)=='ji') value+=1;
                        if(value<6) return 0;
                        return value;
                    }).forResult();
                    if(result.bool){
                        game.log(player,'获得了',result.links);
                        await player.gain(result.links);
                    }
                    var bool=false;
                    for(var card of cards){
                        if(get.type(card)=='faShu'){
                            bool=true;
                            break;
                        }
                    }
                    if(bool){
                        await player.addNengLiang('shuiJing',2);
                        player.insertPhase('jianShouShiYan');
                        player.addSkill('jianShouShiYan_huiHeKaiShi');
                        await player.reinitCharacter(player.name1,'fengZhiJianSheng');
                    }
                },
                group: ['jianShouShiYan_tiaoJian'],
                subSkill:{
                    shangHai:{
                        trigger: {source:'zaoChengShangHai'},
                        direct:true,
                        filter:function(event,player){
                            return event.faShu!=true;
                        },
                        content: async function(event, trigger, player) {
                            trigger.changeDamageNum(1);
                        }
                    },
                    huiHeKaiShi:{
                        trigger: { player: "phaseBegin" },
                        direct:true,
                        priority:0.1,
                        filter:function(event,player){
                            return event.skill=='jianShouShiYan';
                        },
                        content: async function(event, trigger, player) {
                            player.addTempSkill('jianShouShiYan_shangHai');
                            player.removeSkill('jianShouShiYan_huiHeKaiShi');
                        }
                    },
                    tiaoJian:{
                        trigger:{source:'gongJiMingZhong',global:'changeXingBeiEnd'},
                        direct:true,
                        filter:function(event,player,name){
                            if(name=='gongJiMingZhong'){
                                return event.yingZhan!=true;
                            }else if(name=='changeXingBeiEnd'){
                                return event.num>0;
                            }
                        },
                        content: async function(event, trigger, player) {
                            event.getParent('phase').jianShouShiYan=true;
                        }
                    }
                },
            },
            jianCanYing:{
                usable: 1,
                trigger: { player: "gongJiAfter" },
                filter: function (event, player) {
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();

                    var targets=await player.chooseTarget('剑残影：选择1名目标对手弃1张牌<br>你下次攻击只能攻击他',true,function(card, player, target) {
                        return target.side!=player.side;
                    }).set('ai', function (target) {
                        return target.countCards('h');
                    }).forResultTargets();
                    var target=targets[0];
                    await target.chooseToDiscard('h',1,'剑残影：弃1张牌',true);
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        target:target,
                        filterTarget: function(card, player, target) {
                            if(get.type(card) =='gongJi'){
                                return target==_status.event.target;
                            }
                        },
                    });
                },
                ai:{
                    shuiJing:true,
                }
            },

            //魔弓EX
            shenFengShi:{
                inherit:'shanDianJian',
                filter:function(event){
                    return get.xiBie(event.card)=='feng';
                },
            },
            jiFengZhuiShe:{
                inherit:'guanChuanSheJi',
            },
            gongShenHouBu:{
                subSkill:{
                    shanGuangXianJing:{inherit:'shanGuangXianJing'},
                    jingZhunSheJi:{inherit:'jingZhunSheJi'}
                },
                group:['gongShenHouBu_shanGuangXianJing','gongShenHouBu_jingZhunSheJi'],
                trigger:{player:['logSkillBegin']},
                forced:true,
                filter:function(event,player){
                    return event.skill&&event.skill.startsWith('gongShenHouBu_');
                },
                content: async function(event,trigger,player){
                },
            }, 

            //圣仲裁者
            shenZhiTianPing:{
                trigger: {global:'gameStart'},
                forced: true,
                content: async function(event, trigger, player) {
                    player.addSkill('tianPing_you');
                    player.addSkill('tianPing_zuo');
                },
            },
            shanEBiJi:{
                usable:1,
                trigger: {global:'damageAfter'},
                filter: function (event, player) {
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    if(zuo_cards.length>=3&&you_cards.length>=3) return false;
                    return event.player.side==player.side&&event.shanEBiJi&&player.countCards('h',card=>lib.inpile.includes(card.name))>0;
                },
                async cost(event, trigger, player) {
                    var next= player.chooseCard('h',1,card=>lib.inpile.includes(card.name));
                    next.set('prompt',get.prompt('shanEBiJi'));
                    next.set('prompt2',lib.translate['shanEBiJi_info']);
                    next.set('ai', function (card) {
                        return 6-get.value(card);
                    });
                    event.result = await next.forResult();
                },
                content: async function(event, trigger, player) {
                    await player.lose(event.cards,ui.ordering);
                    await player.showCards(event.cards);

                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    if(zuo_cards.length>=3&&you_cards.length>=3) return;
                    else if(zuo_cards.length>=3&&you_cards.length<3) var position='you';
                    else if(zuo_cards.length<3&&you_cards.length>=3) var position='zuo';
                    else {
                        let dialog=['善恶必计：选择1个位置将牌置于其上',[event.cards,'card']];
                        let list=['tianPingZuo','tianPingYou'];
                        let control=await player.chooseControl(list).set('dialog',dialog).set('ai',function(){
                            var player=_status.event.player;
                            var zuo_cards=player.getExpansions('tianPingZuo');
                            var you_cards=player.getExpansions('tianPingYou');
                            if(zuo_cards.length>=you_cards.length) return 'tianPingYou';
                            else return 'tianPingZuo';
                        }).forResultControl();
                        var position=control=='tianPingZuo'?'zuo':'you';
                    }
                    await lib.skill.tianPing.addPai(player,event.cards,position);
                    await player.draw();
                },
                group:'shanEBiJi_set',
                subSkill:{
                    set:{
                        trigger:{global:'chengShouShangHai'},
                        direct:true,
                        filter:function(event,player){
                            return event.player.side==player.side;
                        },
                        content: async function(event, trigger, player) {
                            trigger.shanEBiJi=true;
                        },
                    }
                }
            },
            tianPingQingDao:{
                forced:true,
                trigger:{player:['phaseBegin','phaseEnd']},
                filter:function(event,player){
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    return Math.abs(zuo_cards.length-you_cards.length)>1;
                },
                content: async function(event, trigger, player) {
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    if(zuo_cards.length>you_cards.length){
                        await player.discard(zuo_cards,'tianPing_zuo').set('sheQi',true);
                    }else{
                        await player.discard(you_cards,'tianPing_you').set('sheQi',true);
                    }
                    var cards=get.cards(4);
                    await player.showHiddenCards(cards);
                    var next=player.chooseCardButton(cards,2,true,'天平倾倒：选择2张牌加入手牌');
                    next.set('ai', function (button) {
                        return get.value(button.link);
                    });
                    var cards=await next.forResultLinks();
                    await player.gain(cards,'gain2','log');

                    await player.addHong(1);

                    var targets=await player.chooseTarget('天平倾倒：选择目标队友+2[治疗]',lib.filter.teammate,true).set('ai',function(target){
                        return get.zhiLiaoEffect(target,2);
                    }).forResultTargets();
                    var target=targets[0];
                    if(target) await target.changeZhiLiao(2);
                },
            },
            shenZhiShenPan:{
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    return zuo_cards.length>2&&you_cards.length>2;
                },
                content: async function(event, trigger, player) {
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    await player.discard(zuo_cards,'tianPing_zuo').set('sheQi',true);
                    await player.discard(you_cards,'tianPing_you').set('sheQi',true);
                    var targets=await player.chooseTarget('神之审判：对2名目标对手各造成2点攻击伤害③',2,lib.filter.opponent,true).set('ai',function(target){
                        return get.damageEffect2(target, _status.event.player, 2);
                    }).forResultTargets();
                    targets=targets.sortBySeat(player);
                    for(var target of targets){
                        await target.damage(2,player);
                    }
                },
            },
            tianPing:{
                addPai:async function(player,cards,position){
                    if(!cards||cards.length==0) return;
                    if(position!='zuo'&&position!='you') return;
                    //await player.lose(cards,ui.ordering);
                    //await player.showCards(cards);
                    var gaintag=['tianPing_'+position];
                    game.log(player,'将',cards,'置于',`【${position=='zuo'?'天平·左':'天平·右'}】`,`上`);
                    var next=player.addToExpansion(cards).set('gaintag',gaintag).set('log',false).set('position',position);
                    await next;
                },
                group: ['tianPing_fangZhi'],
                subSkill:{
                    zuo:{
                        mark:true,
                        intro:{
                            name:'天平·左',
                            content:'expansion',
                            markcount:'expansion',
                            mark:function(dialog,storage,player){
                                var cards=player.getExpansions('tianPing_zuo');
                                if(cards.length>0) dialog.addAuto(cards);
                                return `<span class='greentext'>[被动]罪灭之左</span><br>
                                    <span class='tiaoJian'>(每当本卡上的牌数增加，且增加后本卡上的牌数>1)</span>对(X-1)名目标对手造成1点攻击伤害③，X为本卡上的牌数。`;
                            },
                        },
                        markimage: 'image/card/zhuanShu/tianPing_zuo.png',
                        trigger:{player:'addToExpansionAfter'},
                        forced:true,
                        filter:function(event,player){
                            if(event.position!='zuo') return false;
                            return player.countExpansions('tianPing_zuo')>1;
                        },
                        content: async function(event, trigger, player) {
                            var cards=player.getExpansions('tianPing_zuo');
                            var num=cards.length-1;
                            var targets=await player.chooseTarget(`对${num}名目标对手造成1点攻击伤害③`,lib.filter.opponent,true,num).set('ai',function(target){
                                return get.damageEffect2(target, _status.event.player, 1);
                            }).forResultTargets();
                            targets=targets.sortBySeat(player);
                            for(var target of targets){
                                await target.damage(1,player);
                            }
                        },
                    },
                    you:{
                        mark:true,
                        intro:{
                            name:'天平·右',
                            content:'expansion',
                            markcount:'expansion',
                            mark:function(dialog,storage,player){
                                var cards=player.getExpansions('tianPing_you');
                                if(cards.length>0) dialog.addAuto(cards);
                                return `<span class='greentext'>[被动]圣方之右</span><br>
                                    <span class='tiaoJian'>(每当本卡上的牌被弃掉且弃牌数>1)</span>你+1[治疗]。`;
                            },
                        },
                        markimage: 'image/card/zhuanShu/tianPing_you.png',
                        trigger:{player:'discard'},
                        forced:true,
                        filter:function(event,player){
                            if(event.gaiPai!='tianPing_you') return false;
                            return event.cards.length>1;
                        },
                        content: async function(event, trigger, player) {
                            await player.changeZhiLiao(1);
                        }
                    },
                    fangZhi:{
                        trigger:{player:'addToExpansionBefore'},
                        forced:true,
                        filter:function(event,player){
                            if(event.position!='zuo'&&event.position!='you') return false;
                            var newCard=event.cards[0];
                            var cards=player.getExpansions('tianPing_'+event.position);
                            for(var card of cards){
                                if(get.xiBie(card)!=get.xiBie(newCard)) return true;
                            }
                            return false;
                        },
                        content:async function(event, trigger, player) {
                            var position='tianPing_'+trigger.position;
                            var cards=player.getExpansions(position);
                            await player.discard(cards,position);
                            await player.addHong(1);
                        },
                    },
                },
            },
            tianZui:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    await player.addHong(1);
                    await player.hengZhi();
                    player.addTempSkill('tianZui_gongJi','phaseEnd');
                },
                check:function(event,player){
                    if(!player.canGongJi()) return false;
                    if(player.countCards('h',card=>lib.inpile.includes(card.name))<3) return false;
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');
                    return zuo_cards.length<=2||you_cards.length<=2;
                },
                group:['tianZui_chongZhi'],
                ai:{
                    shuiJing:true,
                },
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        priority:0.1,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content: async function(event, trigger, player) {
                            await player.chongZhi();
                        }
                    },
                    gongJi:{
                        trigger:{player:'gongJiMingZhong'},
                        filter:function(event,player){
                            var num=0;
                            var zuo_cards=player.getExpansions('tianPing_zuo');
                            var you_cards=player.getExpansions('tianPing_you');
                            if(zuo_cards.length<3) num++;
                            if(you_cards.length<3) num++;
                            if(num==0) return false;
                            return player.countCards('h',card=>lib.inpile.includes(card.name))>=num;
                        },
                        async cost(event, trigger, player){
                            var zuo_cards=player.getExpansions('tianPing_zuo');
                            var you_cards=player.getExpansions('tianPing_you');
                            var num=0;
                            if(zuo_cards.length<3) num++;
                            if(you_cards.length<3) num++;
                            var str=`是否将手牌中${num}张基本牌面朝上`;
                            if(num==2) str+='分别置于【天平·左】和【天平·右】上';
                            else if(zuo_cards.length<3) str+='置于【天平·左】上';
                            else if(you_cards.length<3) str+='置于【天平·右】上';

                            var next= player.chooseCard('h',num,card=>lib.inpile.includes(card.name));
                            next.set('prompt',get.prompt('tianZui'));
                            next.set('prompt2',str);
                            next.set('ai', function (card) {
                                return 6-get.value(card);
                            });
                            event.result = await next.forResult();
                        },
                        content: async function(event, trigger, player) {
                            await player.lose(event.cards,ui.ordering);
                            await player.showCards(event.cards);
                            var zuo_cards=player.getExpansions('tianPing_zuo');
                            var you_cards=player.getExpansions('tianPing_you');
                            if(zuo_cards.length<3&&you_cards.length<3&&event.cards.length==2){
                                var next=player.chooseToMove('天罪：安排2张牌在【天平·左】和【天平·右】上的位置');
                                next.set("list", [
                                    ["天平·左", [event.cards[0]]],
                                    ["天平·右", [event.cards[1]]],
                                ]);
                                next.set("filterMove", function (from, to, moved) {
                                    if (typeof to == "number") return false;
                                    return true;
                                });
                                var result=await next.forResult();

                                if(!result.moved){
                                    var zuo=event.cards[0];
                                    var you=event.cards[1];
                                }else{
                                    var zuo=result.moved[0];
                                    var you=result.moved[1];
                                }
                                await lib.skill.tianPing.addPai(player,zuo,'zuo');
                                await lib.skill.tianPing.addPai(player,you,'you');
                            }else{
                                if(zuo_cards.length<3) var position='zuo';
                                else if(you_cards.length<3) var position='you';
                                await lib.skill.tianPing.addPai(player,event.cards,position);
                            }
                        },
                    },
                },
            },
            zuiChiBiDao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                async content(event, trigger, player) {
                    await player.removeBiShaShuiJing();
                    player.addTempSkill('zuiChiBiDao_noHong','phaseAfter');
                    var num=player.countZhiShiWu('zui');
                    if(num>0) await player.removeHong(num);
                    else return;
                    var zuo_cards=player.getExpansions('tianPing_zuo');
                    var you_cards=player.getExpansions('tianPing_you');

                    while((zuo_cards.length<3||you_cards.length<3)&&player.countCards('h',card=>lib.inpile.includes(card.name)>0)&&num>0){
                        let str=`罪迟比到：是否将手牌中1张基本牌面朝上放置到`;
                        str+='【天平·左】或【天平·右】上';
                        str+=`，剩余${num}次`;

                        let list=[];
                        if(zuo_cards.length<3) list.push(['zuo','天平·左']);
                        if(you_cards.length<3) list.push(['you','天平·右']);

                        let dialog=[str,[player.getCards('h',card=>lib.inpile.includes(card.name)),'card'],[list,'tdnodes']];
                        let next=player.chooseButton(
                            dialog,
                            true,
                            true,
                            2,
                            function(button){
                                var link=button.link;
                                var player=_status.event.player;
                                if(typeof link=='string'){
                                    if(link=='zuo') return 5- player.getExpansions('tianPing_zuo').length;
                                    else return 5- player.getExpansions('tianPing_you').length;
                                }else if(get.itemtype(link)=='card'){
                                    return 8-get.value(link);
                                }
                                return 0.1;
                            },
                            function(button,player){
                                if(ui.selected.buttons.length==0) return true;
                                var link=button.link;
                                var old=ui.selected.buttons[0].link;
                                return typeof link!=typeof old;
                            },
                        );
                        let links=await next.forResultLinks();
                        let pos,card;
                        for(let link of links){
                            if(typeof link=='string') pos=link;
                            else if(get.itemtype(link)=='card') card=link;
                        }
                        if(pos&&card) await lib.skill.tianPing.addPai(player,[card],pos);
                        num--;
                        var zuo_cards=player.getExpansions('tianPing_zuo');
                        var you_cards=player.getExpansions('tianPing_you');
                    }
                },
                ai:{
                    order:function(item, player){
                        if(player.isHengZhi()) return 0;
                        if(player.countCards('h',card=>lib.inpile.includes(card.name))<=1) return 0;
                        return 1.2+player.countZhiShiWu('zui');
                    },
                    shuiJing:true,
                },
                subSkill:{
                    noHong:{
                        trigger:{player:'changeZhiShiWuBegin'},
                        direct:true,
                        filter:function(event,player){
                            return event.num>0&&event.zhiShiWu=='zui';
                        },
                        content:function(){
                            trigger.cancel();
                        },
                    }
                },
            },
            zui:{
                intro: {
                    max:3,
                    content:'mark',
                },
                onremove: "storage",
                markimage: 'image/card/zhiShiWu/hong.png',
            },
        },
        
        translate:{
            //角色名字
            trick: "trick",
            shiTu: "师徒",
			jianZhiMoNv:"剑之魔女",
            jieRiMoDao:"节日魔导",
            tanLanShaoNv:"贪婪少女",
            lingXiZhiChao: "灵汐之潮",
            youJiShi: "游击士",
            nong_baoShiShaoNv: "农暴食少女",
            nong_baoShiShaoNv_prefix: "农",
            zhouFuShi: "咒符师",
            yuanChuZhiGong: "原初之弓",
            daoDanLuoLi: "捣蛋萝莉",
            trick_shengGong:"trick圣弓",
            trick_shengGong_prefix: "trick",
            trick_maoXianJia:"trick冒险家",
            trick_maoXianJia_prefix: "trick",
            luoLiFanZhang: "萝莉番长",
            jianXiZhiPian: "见习制片",
            daiDuoShaoNv: "怠惰少女",
            jiDuShaoNv: "嫉妒少女",
            jianZhiZi:'剑之子',
            moGongEX: "魔弓EX",
            sheng_zhongCaiZhe:'圣仲裁者',

            jianZhiMoNv_name:"席拉",
            lingXiZhiChao_name: "濯香姬",
            youJiShi_name: "索拉",
            zhouFuShi_name: "铃音",
            daoDanLuoLi_name: "萝绮",
            luoLiFanZhang_name: "柠歌",
            jianXiZhiPian_name: "惕惕子",
            sheng_zhongCaiZhe_name: "恩布拉",

            //技能
            //剑之魔女
            jiZhiJianYi: "[响应]技之剑意",
            jiZhiJianYi_info: "<span class='tiaoJian'>([攻击行动]结束时发动)</span>额外+1技类[攻击行动]。",

            yiXiangJian: "[响应]臆想剑[回合限定]",
            yiXiangJian_info: "<span class='tiaoJian'>(主动攻击命中时发动②)</span>攻击目标弃1张牌[强制][展示]。若为攻击牌，你可以获得该牌，额外+1[攻击行动]。(若为法术牌)，本次攻击伤害+2。",

            mengXiangJian: "[被动]梦想剑",
            mengXiangJian_info: "<span class='tiaoJian'>(本回合第一次[攻击行动]后)</span>回合内你的主动攻击无视【圣盾】。<span class='tiaoJian'>(本回合第二次[攻击行动]后)</span>回合内你的主动攻击对方无法应战。<span class='tiaoJian'>(本回合第四次[攻击行动]后)</span>回合内你的主动攻击强制命中。",

            jianYingDuanNian: "[响应]剑影*断念[回合限定]",
            jianYingDuanNian_info: "[宝石]<span class='tiaoJian'>([攻击行动]结束时发动)</span>弃2张牌，摸1张牌[强制]，额外+1攻击行动。",
            
            //节日魔导
            jiRi_moBaoChongJie:"[法术]魔爆冲击",
            jiRi_moBaoChongJie_info:"<span class='tiaoJian'>(弃1张法术牌[展示])</span>我方【战绩区】+1【宝石】。目标对手弃1张法术牌[展示]，若他不如此做，你对他造成2点法术伤害③。",
            faLiHuDun:"[响应]法力护盾",
            faLiHuDun_info:"<span class='tiaoJian'>(任何人对你造成伤害时发动③)</span>弃X张法术牌[展示]。",

            //贪婪少女
            tanYuHeiDong:"[法术]贪欲黑洞[回合限定]",
            tanYuHeiDong_info:"<span class='tiaoJian'>(弃1张法术牌[展示])</span>我方战绩区+1[水晶]。目标对手弃1张法术牌[展示]；若他不如此做，你对其造成2点法术伤害③，你+1[法术行动]。本回合你无法发动【亡女的金库】。",
            lianJinMoFa:"[响应]殓金魔法",
            lianJinMoFa_info:"<span class='tiaoJian'>(你使用【魔弹】造成伤害后发动⑥)</span>我方战绩区+1[水晶]。",
            lianJinShu:"[响应]炼金术",
            lianJinShu_info:"你的雷系或火系牌可以当【魔弹】使用。",
            wangNvJinKu:"[法术]亡女的金库",
            wangNvJinKu_info:"[水晶]对2名目标对手各造成1点法术伤害③。<span class='tiaoJian'>(若你额外移除【战绩区】所有星石)</span>每移除2星石，伤害+1；<span class='tiaoJian'>(若本次移除的星石中[宝石]>1，伤害结算完成后)将对方1点士气转移给我方。",

            // 灵汐之潮
            lingZhiZhiYi: "[被动]灵枝旨意",
            lingZhiZhiYi_info: "你无法成为基础效果的目标。",
            xieLingTuiSan: "[响应]邪灵退散",
            xieLingTuiSan_info: "<span class='tiaoJian'>(你放置基础效果后)</span>对目标对手造成1点法术伤害③。",
            banXiangHunLing: "[响应]伴响魂灵[回合限定]",
            banXiangHunLing_info:
                "<span class='tiaoJian'>(你回合内目标对手承受你造成的伤害而导致士气下降时)</span>对除他外所有目标对手各造成1点法术伤害③。",
            boYongZhiLi: "[被动]波涌之力",
            boYongZhiLi_info: "<span class='tiaoJian'>(目标角色触发基础效果并结算完成后)</span>你+1<span class='hong'>【灵涌】</span>。",
            nuChaoHuangTao: "[被动]怒潮荒涛",
            nuChaoHuangTao_info:
                "<span class='tiaoJian'>(你的回合结束时，若</span><span class='hong'>【灵涌】</span><span class='tiaoJian'>已达到上限)</span>移除所有<span class='hong'>【灵涌】</span>，对4名目标角色各造成1点法术伤害③；<span class='tiaoJian'>(若目标角色拥有X个基础效果)</span>本次对他的法术伤害额外+X点。",
            haiShenYuWu: "[法术]海神御巫",
            haiShenYuWu_info: "[水晶](使用一张封印师或祈祷师的独有技)你弃一张牌。",
            lingYong: "灵涌",
            lingYong_info: "<span class='hong'>【灵涌】</span>为灵汐之潮专有的指示物，上限为4。",

            // 游击士
            jingLingZengLi: "[被动]精灵赠礼",
            jingLingZengLi_info: "游戏初始时, 将牌库顶6张牌牌面朝下放置于你的角色旁，作为【子弹】。",
            "yuanSuSheJi*sora": "[响应]元素射击*SORA",
            "yuanSuSheJi*sora_info":
                "<span class='tiaoJian'>(主动攻击时①,移除1个子弹)</span>根据【子弹】系别附加以下效果：<br>【火系】：本次攻击伤害额外+1。<br>【水系】：<span class='tiaoJian'>(主动攻击命中时②)</span>目标角色+1[治疗]。<br>【风系】：<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动]。<br>【雷系】：本次攻击无法应战。<br>【地系】：<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③。<br>【光系或暗系】：视为任一系别的【子弹】。",
            'yuanSuSheJi*sora_huo':'火之弹',
            'yuanSuSheJi*sora_feng':'风之弹',
            'yuanSuSheJi*sora_lei':'雷之弹',
            'yuanSuSheJi*sora_shui':'水之弹',
            'yuanSuSheJi*sora_di':'地之弹',
            erChongJianYing: "[响应]二重剑影[回合限定]",
            erChongJianYing_info: "<span class='tiaoJian'>([攻击行动]结束时，若本次攻击命中②)</span>额外加1系别相同的[攻击行动]。",
            fuMoZhiShu: "[响应]附魔之术",
            fuMoZhiShu_info:
                "<span class='tiaoJian'>(你执行【提炼】时，若你未拥有【子弹】)</span>消耗你提炼的1能量，将1张手牌面朝下置于你的角色旁，作为【子弹】。",
            jingLingDeJianWu: "[响应]精灵的剑舞",
            jingLingDeJianWu_info: "[水晶]<span class='tiaoJian'>(主动攻击前①)</span>本次你的攻击牌系别视为风系。",
            ziDan: "子弹",
            ziDan_info: "【子弹】为游击士专有盖牌，上限为6。",

            // 暴食少女
            tianDianChongJi: "[法术]甜点冲击",
            tianDianChongJi_info:
                "<span class='tiaoJian'>(弃1张法术牌[展示])</span>我方【战绩区】+1[宝石]。2名目标对手各弃1张法术牌，每有人不如此做，你对他造成2点法术伤害③、你弃1张牌。",
            shiYuDeHeiDong: "[响应]食欲的黑洞",
            shiYuDeHeiDong_info: "<span class='tiaoJian'>(当我方承受伤害时⑥，你弃1张【魔弹】[展示])</span>改由你承受此伤害。你不会因此造成士气下降。",
            meiWeiRongHe: "[响应]美味融合",
            meiWeiRongHe_info: "你的水系或火系牌可以当[魔弹]传递。",
            sanMiaoYuanZe: "[响应]三秒原则",
            sanMiaoYuanZe_info: "<span class='tiaoJian'>(目标队友手牌或盖牌中的【魔弹】正面朝上进入弃牌前)</span>你弃1张牌，你获得该【魔弹】[强制]。<span class='tiaoJian'>(因机制问题，无法完全符合faq)</span>",
            meiShiFengBao: "[法术]美食风暴",
            meiShiFengBao_info: "[宝石]对2名目标对手各造成2点法术伤害③。",

            // 咒符师
            zhouFuHuoLi: "[法术]咒符-火璃",
            zhouFuHuoLi_info: "<span class='tiaoJian'>(弃1张火系牌①)</span>对1名目标角色造成1点法术伤害③，你摸1张牌，弃1张牌。",
            zhouFuDongTian: "[法术]咒符-冻天",
            zhouFuDongTian_info: "<span class='tiaoJian'>(弃1张水系牌①)</span>指定1名目标角色弃1张牌，将除你外1名目标角色的1[治疗]转移给你。",
            zhouFu_nianZhou: "[响应]念咒",
            zhouFu_nianZhou_info: "每当你发动【咒符】，可将自己的1张手牌面朝下放置在你的角色旁，作为【妖力】。",
            chiMeiWangLiang: "[响应]魑魅魍魎",
            chiMeiWangLiang_info:
                "<span class='tiaoJian'>(主动攻击命中后发动②，移除1个【妖力】)</span>视为无条件发动一次【咒符-火璃】或【咒符-冻天】，但无法发动念咒；(若【妖力】为地系牌，可展示之[展示])该次【火璃】的伤害或【冻天】的弃牌效果+1。",
            zhouLiChongSu: "[响应]咒力重塑",
            zhouLiChongSu_info: "[水晶]<span class='tiaoJian'>(发动【咒符-火璃】或【咒符-冻天】时发动)</span>将“1名目标角色”改为“2名目标角色”。",
            zhouFu_yaoLi: "妖力",
            zhouFu_yaoLi_info: "【妖力】为咒符师专有盖牌，上限为2；若【妖力】达到上限，则不能发动【念咒】。",

            // 原初之弓
            yuanChu_tianZhiGong: "[被动]天之弓",
            yuanChu_tianZhiGong_info: "游戏初始时，你拥有【圣煌辉光炮】，你的[治疗]上限+1。<span class='tiaoJian'>(主动攻击时，若攻击牌不为圣类命格)</span>本次攻击伤害-1；<span class='tiaoJian'>(攻击命中时②，若攻击牌为圣类命格)</span>你+1<span class='hong'>【信仰】</span>。",
            yuanChu_shengXieJuBao: "[法术]圣屑飓暴",
            yuanChu_shengXieJuBao_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次圣类命格的该系主动攻击；<span class='tiaoJian'>(若该弃牌为【圣光】)</span>则视为一次圣类命格的暗系主动攻击； <span class='tiaoJian'>(若攻击未命中②，移除X点[治疗]，X最高为2)</span>目标队友弃X张牌。",
            yuanChu_shengHuangJiangLin: "[法术]圣煌降临[持续]",
            yuanChu_shengHuangJiangLin_backup:'[法术]圣煌降临[持续]',
            yuanChu_shengHuangJiangLin_info: "<span class='tiaoJian'>(移除你的2个[治疗]或2点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>)</span>[横置]，转为【圣煌形态】，额外+1[法术行动]。此形态下，你若执行【特殊行动】，则[重置]脱离【圣煌形态】并+1[治疗]。",
            yuanChu_shengGuangBaoLie: "[法术]圣光爆裂",
            yuanChu_shengGuangBaoLie_backup:'[法术]圣光爆裂',
            yuanChu_shengGuangBaoLie_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动)</span>你选择以下一项发动：<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>摸1张牌[强制]，对手牌数小于你的目标对手造成2点攻击伤害，你+1<span class='hong'>【信仰】</span>。 <br>·<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害， Y为目标数中拥有[治疗]的人数，你+X<span class='hong'>【信仰】</span>。",
            yuanChu_shengHuangHuiGuangPao: "(专)[法术]圣煌辉光炮",
            yuanChu_shengHuangHuiGuangPao_info: "<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除4点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然后移除等同我方落后[士气]的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>数)</span>所有角色将手牌调整为4张，我方【星杯区】+1[星杯]，然后将一方[士气]调整与另一方相同，我方所有角色各+1[治疗]，你额外+1[攻击行动]或[法术行动]并将【圣煌辉光炮】翻面。",
            yuanChu_shengHuangYuHui: "(专)[法术]圣煌余辉",
            yuanChu_shengHuangYuHui_info: "<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除4点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，然后移除等同我方落后[士气]的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>数)</span>所有角色将手牌调整为4张，我方【星杯区】+1[星杯]，然后将一方[士气]调整与另一方相同，然后移除【圣煌余辉】。",
            yuanChu_xinYang: "信仰",
            yuanChu_xinYang_info: "<span class='hong'>【信仰】</span>为原初之弓专有的指示物，上限为10。",

            // 捣蛋萝莉
            'tianShi?': "[响应]天使？",
            'tianShi?_info': "你可将有【天使之墙】的基础牌作为【圣盾】使用。",
            panNiZhiQiang: "[法术]叛逆之墙",
            panNiZhiQiang_info: "<span class='tiaoJian'>(将手牌的1个【圣盾】[展示]与场上的1个基础效果交换)</span>你弃1张牌。",
            shenMiFuBi: "[被动]神秘伏笔",
            shenMiFuBi_info: "<span class='tiaoJian'>([法术行动]结束后)</span>将牌库顶1-2张牌面朝下放置于X名目标角色面前，视为基础效果【Tricky】。",
            tricky_xiaoGuo: "Tricky",
            "T-r-i-c-k-y!": "[响应]T-r-i-c-k-y!",
            'T-r-i-c-k-y!_info':
                "<span class='tiaoJian'>(主动攻击未命中时发动②)</span>查看1个【Tricky】。(若你移除该【Tricky】并额外弃1张同系牌)对原拥有该【Tricky】的目标角色造成2点法术伤害③。",
            trickOrTreat: "[被动]Trick or Treat",
            trickOrTreat_info:
                "<span class='tiaoJian'>(你的行动阶段结束时,若场上存在的【Tricky】>4,展示所有【Tricky】)</span>所有人各弃1张与面前【Tricky】同系的牌，然后移除所有【Tricky】。（每有人不如此做）你对他造成2点法术伤害③。<span class='tiaoJian'>(若我方对应【Tricky】弃牌>对方)</span>我方【战绩区】+1[水晶]且你+1[水晶]，或你弃1张牌并额外获得一个回合；<span class='tiaoJian'>(若我方对应【Tricky】弃牌<对方)</span>对方【战绩区】+1[宝石]。",
            suprise: "[法术]Surprise!",
            suprise_info:
                "[水晶]<span class='tiaoJian'>(你弃1张牌)</span>本回合结束前你的手牌上限+5， 将场上所有【Tricky】加入手牌，然后将X张手牌面朝下放置于X名目标角色面前，视为基础效果【Tricky】。",

            // trick圣弓
            trick_tianZhiGong:"[被动]天之弓",
            trick_tianZhiGong_info:"游戏初始时，你+2[宝石]。你的[治疗]上限+1。<span class='tiaoJian'>（主动攻击时①，若该次攻击不为圣类命格）</span>本次攻击伤害-1；<span class='tiaoJian'>（主动攻击命中时②，若该次攻击为圣类命格）</span>你+1【信仰】。",
            trick_shengHuangJiangLin:"[法术]圣煌降临[持续]",
            trick_shengHuangJiangLin_backup:"[法术]圣煌降临[持续]",
            trick_shengHuangJiangLin_info:"<span class='tiaoJian'>(移除你的2点[治疗]或2点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>)</span>[横置]，转为【圣煌形态】，额外+1[法术行动]。此形态下，你若执行【特殊行动】，则[重置]脱离【圣煌形态】并+1[治疗]。",
            trick_shengGuangBaoLie:"[法术]圣光爆裂",
            trick_shengGuangBaoLie_backup:"[法术]圣光爆裂",
            trick_shengGuangBaoLie_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动)</span>你选择以下一项发动：<br>·移除你的1点[治疗]，摸1张牌[强制]，你+1<span class='hong'>【信仰】</span>，目标队友+1[治疗]。 <br>·<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害。 Y为目标数中拥有[治疗]的人数。",
            trick_shengHuangHuiGuangPao:"[法术]圣煌辉光炮",
            trick_shengHuangHuiGuangPao_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除1点</span><span class='lan'>【圣煌辉光炮】</span><span class='tiaoJian'>，移除4点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，并额外移除等同我方落后士气的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>数)</span>所有角色将手牌调整为4张，我方【星杯区】+1[星杯]，然后将一方[士气]调整与另一方相同，我方所有角色各+1[治疗]。",
            trick_ziDongTianChong:"[被动]自动填充",
            trick_ziDongTianChong_info:"<span class='tiaoJian'>(你的回合结束时，若你未执行【特殊行动】)</span>你选择以下一项发动：<br>·[水晶]你+1<span class='hong'>【信仰】</span>或+1[治疗]，然后+1<span class='lan'>【圣煌辉光炮】</span>。 <br>·[宝石]你+2<span class='hong'>【信仰】</span>或目标角色+2[治疗]。",

            // trick冒险家
            trick_qiZha:"[响应]欺诈",
            trick_qiZha_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次除暗系以外的任意系的主动攻击，该系由你决定",
            trick_maoXianJiaTianTang:"[响应]冒险者天堂",
            trick_maoXianJiaTianTang_backup:"[响应]冒险者天堂",
            trick_maoXianJiaTianTang_info:"<span class='tiaoJian'>(你执行【提炼】时，移除自身X[能量])</span>额外提炼X[水晶]，然后将提炼出的[宝石]和[水晶]全部交给目标队友。",

            // 萝莉番长
            xuanHuaShangDeng: "[被动]喧哗上等",
            xuanHuaShangDeng_info:
                "<span class='tiaoJian'>(攻击命中时②)</span>持续移除牌库顶牌[展示]，直到移除的牌非血类命格或非法术牌，或累积移除三张牌。本次攻击伤害额外+X，X为此法移除的牌库顶牌数。",
            yeLuSiKu: "[响应]夜露死苦",
            yeLuSiKu_xueYingKuangDao: "[响应]血影狂刀",
            yeLuSiKu_xueXingPaoXiao: "[响应]血腥咆哮",
            yeLuSiKu_info: `你可以使用狂战士的独有技。<br>
                <span class="greentext">(独)[响应]血影狂刀</span><br>
                <span class='tiaoJian'>(作为主动攻击打出时发动)</span><br>·若命中手牌为2的对手②，本次攻击伤害额外+2；<br>·若命中手牌为3的对手②，本次攻击伤害额外+1。<br>
                <span class="greentext">(独)[响应]血腥咆哮</span><br>
                <span class="tiaoJian">(作为主动攻击打出时发动)</span>若攻击的目标拥有的[治疗]为2，则本次攻击强制命中。
            `,
            aiSiTianLiu: "[被动]爱死天流",
            aiSiTianLiu_info:
                "<span class='tiaoJian'>(你发动【血腥咆哮】时)</span>“若攻击的目标拥有的[治疗]为2，则本次攻击强制命中”改为“若攻击的目标拥有[治疗]，则本次攻击无法用【暗灭】应战或使用【圣光】抵挡”。",
            mieChaKuCha: "[响应]灭茶苦茶",
            mieChaKuCha_info:
                "<span class='tiaoJian'>(攻击命中后发动②)</span>选择以下一项：<br>[宝石]本次攻击伤害额外+2。<br>[水晶]本次攻击伤害额外+1。",
            
            // 见习制片
            yuanZiXiShou: "[响应]元子吸收",
            yuanZiXiShou_info: `<span class="tiaoJian">(对目标角色造成法术伤害时发动③)</span>你+1<span class="hong">【元子】</span>。`,
            yuanZiChongSu: "[法术]元子重塑",
            yuanZiChongSu_info: "<span class='tiaoJian'>(移除2点【元子】)</span>你弃X张牌，摸X张牌（X<4），额外+1[法术行动]。",
            yuanSuXueTu: "[响应]元素学徒",
            yuanSuXueTu_bingDong: "[法术]冰冻",
            yuanSuXueTu_yunShi: "[法术]陨石",
            yuanSuXueTu_huoQou: "[法术]火球",
            yuanSuXueTu_fengRen: "[法术]风刃",
            yuanSuXueTu_leiJi: "[法术]雷击",
            yuanSuXueTu_info: "你可以使用元素师的独有技。",
            leiJiBianYi: "[被动]雷击变异",
            leiJiBianYi_info: "<span class='tiaoJian'>(你发动【雷击】时)</span>将“我方【战绩区】+1[宝石]”改为“你+1<span class='hong'>【元子】</span>”",
            yueYun: "[法术]月陨",
            yueYun_info: "[宝石]对目标角色造成(X+1)点法术伤害③，X为你剩余的【能量】数。",
            yuanZi: "元子",
            yuanZi_info: "<span class='hong'>【元子】</span>为见习制片专有的指示物，上限为3。",

            //怠惰少女
            bieFanWo:"[法术]别烦我……",
            bieFanWo_info:"<span class='tiaoJian'>(你右手边最近的队友随机丢弃你1张手牌并指定目标对手摸1张牌[强制])</span>我方【战绩区】+1[水晶]，该对手弃1张法术牌[展示]；<span class='tiaoJian'>(若该对手不如此做)</span>他摸1张牌[强制]，你右手边最近的队友+1[治疗]。",
            rangWoTangPing:"[响应]让我躺平",
            rangWoTangPing_info:"<span class='tiaoJian'>(你的回合开始时，若你手牌>3)</span>目标队友+1[治疗]，然后跳过你的行动阶段。",
            xiangYongMoDan:"[响应]想用魔弹",
            xiangYongMoDan_info:"<span class='tiaoJian'>(你需要使用魔弹时，弃2张同系牌[展示])</span>视为使用【魔弹】。",
            buXiangTiLian:"[被动]不想提炼",
            buXiangTiLian_info:"你无法执行【提炼】。<span class='tiaoJian'>(目标队友指定【提炼】时)</span>你+1[宝石]，移除我方【战绩区】1星石",
            zaiShuiYiXia:"[被动]再睡一下",
            zaiShuiYiXia_info:"[宝石]<span class='tiaoJian'>(你跳过行动阶段后强制触发[强制])</span>弃1张牌，所有队友各+1[治疗]。<span class='tiaoJian'>(若如此导致有队友[治疗]溢出)</span>我方+1【士气】。",

            //嫉妒少女
            cuYiXiuXin: "[响应]醋意羞心",
            cuYiXiuXin_info: "<span class='tiaoJian'>(主动攻击未命中时②)</span>目标角色弃1张法术牌[展示]；<span class='tiaoJian'>(若他不如此做)</span>你对他造成2点法术伤害③，我方【战绩区】+1[水晶]。",
            xuRongZhangWo:"[响应]虚荣掌握",
            xuRongZhangWo_info: "<span class='tiaoJian'>(主动攻击命中时②)</span>额外+1[法术行动]，本次法术行动只能使用【魔弹】且可以选择逆向传递。",
            xiangSiBing:"[响应]相思病",
            xiangSiBing_info:"你的地系牌或风系牌可以当【魔弹】使用。",
            jiDuZhuiFang:"[响应]嫉妒追放[回合限定]",
            jiDuZhuiFang_info:"[水晶]<span class='tiaoJian'>([攻击行动]或[法术行动]后)</span>额外+1[攻击行动]，本次攻击行动只能攻击手牌数大于你的目标对手。",

            //剑之子
            qingMu:"[被动]倾慕",
            qingMu_info:"<span class='tiaoJian'>(若【剑之魔女】在场)</span>你无法发动【剑守誓言】，你获得【剑之魔女】的【剑影*断念】、【梦想剑】。",
            fengZhiJian:"[响应]风之剑",
            fengZhiJian_info:"<span class='tiaoJian'>(你使用技类命格牌作为主动攻击打出时，移除我方【战绩区】1星石)</span>视为你发动该牌上的剑圣的独有技。",
            jianShouShiYan:"[响应]剑守誓言",
            jianShouShiYan_info:"<span class='tiaoJian'>(你有主动攻击命中②或任意一方【星杯区】星杯数增加的回合结束后)</span>弃置牌堆顶(X+1)张牌[展示]，X为双方【星杯区】星杯数之和，你可选择其中1张加入你手牌。<span class='tiaoJian'>(若弃牌中有法术牌)</span>你+2[水晶]，立即执行1个你的额外回合，该回合你的攻击伤害额外+1，永久将你的角色卡替换为【风之剑圣】。",
            jianCanYing:"[响应]剑残影[回合限定]",
            jianCanYing_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束后发动)</span>目标对手弃1张牌，额外+1[攻击行动]。本回合你的下次主动攻击只能攻击该目标对手。",

            //魔弓EX
            shenFengShi:"[被动]神风矢",
            shenFengShi_info:"你的风系攻击牌对手无法应战",
            jiFengZhuiShe:"[被动]疾风追射",
            //jiFengZhuiShe_info:"",
            gongShenHouBu:"[被动]弓神候补",
            gongShenHouBu_info:`你可以使用神箭手的独有技。<br>
                <span class="greentext">(独)[法术]闪光陷阱</span><br>
                对目标角色造成2点法术伤害③。<br>
                <span class="greentext">(独)[响应]精准射击</span><br>
                此攻击强制命中，但本次攻击伤害-1。`,
            gongShenHouBu_jingZhunSheJi:"[响应]精准射击",
            gongShenHouBu_shanGuangXianJing:"[法术]闪光陷阱",

            //圣仲裁者
            shenZhiTianPing:"[被动]神之天平",
            shenZhiTianPing_info:"游戏初始时你拥有【天平·左】与【天平·右】。",
            shanEBiJi:"[响应]善恶必计",
            shanEBiJi_info:"[回合限定]<span class='tiaoJian'>(我方角色承受伤害⑥并结算完毕后，你将手牌中1张基础牌面朝上[展示]放到【天平·左】或【天平·右】上)</span>你摸1张牌[强制]。",
            tianPingQingDao:"[被动]天平倾倒",
            tianPingQingDao_info:"<span class='tiaoJian'>(你的回合开始时或你的回合结束时，若【天平·左】和【天平·右】上的牌差>1，舍弃牌数多的一方上所有牌)</span>展示牌堆顶4张牌[展示]，你将其中2张加入手牌[强制]并弃掉另外2张牌，你+1<span class='hong'>【罪】</span>，然后目标队友+2[治疗]。",
            shenZhiShenPan:"[响应]神之审判",
            shenZhiShenPan_info:"<span class='tiaoJian'>(你的回合结束时，若【天平·左】和【天平·右】上的牌数都>2)</span>舍弃【天平·左】与【天平·右】上的所有牌，然后对2名目标角色各造成2点攻击伤害③。",
            tianPing:"(专)天平",
            tianPingZuo:"天平·左",
            tianPingYou:"天平·右",
            tianPing_zuo:"[被动]罪灭之左",
            tianPing_you:"[被动]圣方之右",
            tianPing_fangZhi:"[被动]替罪羔羊",
            tianPing_info:`<span class='greentext'>[被动]替罪羔羊</span><br>
            <span class='tiaoJian'>(每当有新牌将被放置在本卡上时，若该卡与本卡上的牌不同系)</span>移除本卡上所有卡，你+1<span class='hong'>【罪】</span>。<br>
            <span class='greentext'>[被动]罪灭之左</span><br>
            <span class='tiaoJian'>(每当本卡上的牌数增加，且增加后本卡上的牌数>1)</span>对(X-1)名目标对手造成1点攻击伤害③，X为本卡上的牌数。<br>
            <span class='greentext'>[被动]圣方之右</span><br>
            <span class='tiaoJian'>(每当本卡上的牌被移除且移除牌数>1)</span>你+1[治疗]。
            `,
            tianZui:"[启动]天罪", 
            tianZui_info:"[水晶]你+1<span class='hong'>【罪】</span>。[横置]持续到本回合结束时，你主动攻击命中时②，可将手牌中2张基本牌面朝上[展示]分别放到【天平·左】和【天平·右】上。【天罪】的效果结束时[重置]。",
            zuiChiBiDao:"[法术]罪迟必到",
            zuiChiBiDao_info:"[水晶]本回合你无法获得<span class='hong'>【罪】</span>。<span class='tiaoJian'>(你移除所有</span><span class='hong'>【罪】</span><span class='tiaoJian'>)</span>你可将手牌中X张基本牌面朝上[展示]依次放到【天平·左】或【天平·右】上，X为移除的<span class='hong'>【罪】</span>数量",
            zui:'罪',
            zui_info:"<span class='hong'>【罪】</span>为仲裁者专有指示物，上限为3。",
        },
    };
});
