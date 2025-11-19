import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
    return {
        name:'poXiao',
        connect:true,
        characterSort:{
            poXiao:{
                "1xing":['youXia','tianmaqishi','shengtangcike','dasiji','lianjinshushi','xuetianshi','shouwangzhe'],
                "1.5xing":['fengbaozhizhengguan','longqitongshuai'],
                "2xing":['zhanXingJia','jianwuzhe','wudoujia','qumozhe','xingwenshi','anzhiwangnv','huangjiashiwei','zhoushushi','beifangzhuzhe','youhunfashi','dadiwushi'],
                "2.5xing": ['longzhiqiyuezhe','zhangejisi'],
                "3xing":['shuangxuegongzhu','longyuzhe'],
                "3.5xing":['caijuezhe'],
                "4xing":['xinlingsushi','zhenLongNvWang'],
            }
        },
        character: {
            youXia: ["youXia_name","jiGroup",1,["zhuiFengJi","zhuRiJian","lingDongZhiWu"]],
            zhanXingJia: ["zhanXingJia_name","yongGroup",2,["zhanPuWeiLai","lieHuoFenShen","hanBingHuTi","leiTingZhiNu","guangYingJiaoCuo","daYuYanShu"]],
            tianmaqishi: ["tianmaqishi_name","jiGroup",1,["jianta","zhuixing"]],
            shengtangcike: ["shengtangcike_name","jiGroup",1,["zhuiYingJi","tiGu"]],
            dasiji: ["dasiji_name","shengGroup",1,["shengGuangShanYao","jiuShu","shenShengCaiJue"]],
            lianjinshushi: ["lianjinshushi_name","yongGroup",1,["tanLanZhiXin","wanWuYanMie"]],
            xuetianshi: ["xuetianshi_name","xueGroup",1,["lieDiMaiChong","lianLeiDiYu","shiXueZhiXin"]],
            xinlingsushi: ["xinlingsushi_name","huanGroup",4,["huanXiangChongJi","xinLingFengBao","zhenShiHuanJue","gaiBianShiJie"]],
            zhenLongNvWang: ["zhenLongNvWang_name","longGroup",4,["yuanGuJinZhi","zhenLongJueXing","longHunShouHu","longShenEnHui","longWangZhiLi","shengLongWeiYa","baiWanLongYan","longZuFuXing","longKuangMiSuo","longMaiShuFu","longYuFengYin","yuLongJieJie"]],
            caijuezhe: ["caijuezhe_name","shengGroup","3/4",["zhengYiZhuiJi","caiJueZhiXin","zhenLiCaiJue","songZhongDaoFeng","wuJinZhiRen"]],
            jianwuzhe: ["jianwuzhe_name","yongGroup",2,["weiJianErSheng","duiJianErShi","jianWuYiShi"]],
            shuangxuegongzhu: ["shuangxuegongzhu_name","shengGroup",3,["bingShuangLingYu","shuiJingDaoQiang","lingFengZhuFu","shuangYuZhiHuan"]],
            shouwangzhe: ["shouwangzhe_name","shengGroup",1,["huJiaoZhiXin","wuJinZhuiJi","jingZhunJuJi"]],
            wudoujia: ["wudoujia_name","jiGroup",2,["zhiYueZhiHuan","sheShenZhiDao","jianRenZhiZhi"]],
            fengbaozhizhengguan: ["fengbaozhizhengguan_name","jiGroup","1/2",["baoFengLingYu","yiZheng","jiFengZhouYu"]],
            longzhiqiyuezhe: ["longzhiqiyuezhe_name","longGroup","2/3",["juLongZhiLi","longZuZunYan","longXueQinYe","longXueZhuoShao","xingHongBaiLongBa"]],
            longqitongshuai: ["longqitongshuai_name","longGroup","1/2",["xiaoTianLongQiang","juLongBenTeng"]],
            qumozhe: ["qumozhe_name","huanGroup",2,["xieMoXiaoSan","jingHuaDaDi","yuanSuChongSheng"]],
            longyuzhe: ["longyuzhe_name","longGroup",3,["longZuZhenYan","shangGuMiYu","longHunNingShi"]],
            youhunfashi: ["youhunfashi_name","huanGroup",2,["zhaiBian","mingHuo","fuShi","youHunFenShen"]],
            dadiwushi: ["dadiwushi_name","xueGroup",2,["diMaiZhiLi","poXieZhan","shengShengBuXi","gaiYaHuaShen"]],
            beifangzhuzhe: ['beifangzhuzhe_name',"huanGroup",2,["xiaoChouDeBaXi","wuTaiMoShuShi","guiPai"]],
            xingwenshi: ["xingwenshi_name","huanGroup",2,["xingChenShouHu","mingYunDiaoKe","xingWenYongDong"]],
            anzhiwangnv: ["anzhiwangnv_name","xueGroup",2,["anZhiWanGe","zhenHunQu","eShaGuangMing"]],
            huangjiashiwei: ["huangjiashiwei_name","shengGroup",2,["xiSheng","shenShengHuWei","shenShengBiHu","jueDiFanJi"]],
            zhoushushi: ["zhoushushi_name","xueGroup",2,["lingHunShouGe","zhouShuJiDang","zhouFu"]],
            zhangejisi: ["zhangejisi_name","yongGroup","2/3",["zhanZhengGeYao","zhanYiGongMing","xiWangZhiGe","yingXiongZhanGe"]]
        },
        characterIntro: {
            youXia: "与活跃于正面战场之上的其他作战部队不同，人数不多的丛林守护者作为战技殿堂的特种精英部队基本都是担负着特种作战和游击侦查的任务，极夜之战中恰恰是这支不起眼的力量反而成为了敌人后方梦魇般的存在。因为作战的特殊性质，这支部队在快速机动和单兵作战能力上非常突出，温蒂斯作为丛林守护者部队的首领更是将这种特点发挥到了极致，同时继承了精灵血脉和神兵弗雷斯特的她就像一柄最锋利的匕首，每次都能毫无偏差的插入敌人最薄弱的地方。",
            zhanXingJia: "作为咏歌城的首席占星家，蒂雅拥有着令人难以想象的天赋，由他所创造的快速占卜法术让占星家真正有了在战场上正面作战的能力，这对于星象法术的贡献可谓是居功至伟。但由于深知关于命运法术的难测与危险性，与其兄斯通的分歧日益严重，并最终因他错误的决定导致了两人反目成仇。而斯通的叛逃，一直是蒂雅心中最大的阴影。",
            tianmaqishi: "骑士，一个古老的称号，比起这个称号所具有的实际意义，更重要的是对于这个称号被授予人的肯定和赞扬。虽然随着古老帝国的没落和衰亡，这个名词似乎已经只能在历史书中见到了，但无论从任何方面来说，伊莎贝拉都是能够而且应当承担的起这个古老而又光荣的称号的，为人正直，锄强扶弱，对部下爱护有加，信奉公平与正义的信念，最重要的是在战场上身先士卒的精神和百战不殆的意志，让她成为了战技殿堂无比坚实的利刃，碾碎一切敢于阻挡在她面前的敌人。",
            shengtangcike: "残月明面上作为类似外交官的存在，暗地里却执行着裁决者一样的任务，作为战技殿堂最高战力之一，本身却是出身于神圣教廷这种奇怪的问题，其中的知情者却都对此讳莫如深，残月的真实身份这也成为了两个超级势力之间最顶级的机密之一。残月在暗杀术上的天赋和造诣高的惊人，加上她本身作为圣战士时便练就的高超技艺，以及擅长正面战斗的风格，为刺客这个职业开创了一个崭新的时代。",
            dasiji: "罗德里格斯是神圣教廷中极为罕见的另类天才，他作为一名圣战士在教廷的战场上立下赫赫战功，但在少年得意时突然转职为纯粹的神职人员，在经过十几年的默默无闻之后，他又在教廷危难之际挺身而出，一出手便发挥了决定性的逆转作用，并被教皇授予“圣·罗德里格斯”的封号。如今的他虽然退居幕后，成为了神圣教廷的神职者们导师一般的角色，但大家依然相信，在教廷遭遇危机之时，他必然会毫不犹豫地再次出手，缔造新的传奇。",
            lianjinshushi: "咏歌城向来以怪才层出著名，但即使这样，被成为怪异学者的“陶”也是其中极为特殊的存在。单独一人研习上次大战之中，由异次元传入的被称为科学的奇异法术，并且成功开发了像万物湮灭这样的超越禁咒的法术，让人不禁怀疑他那沉静腼腆的外表之下究竟有着多么疯狂而躁动的内心。",
            xuetianshi: "对于神圣教廷来说，希拉的堕落是个彻头彻尾的悲剧，没有谁比曾经作为最杰出的战斗天使的她更了解神圣教廷战斗序列的弱点和缺陷了。虽然就连她的召唤者也不敢相信自己能够召唤这位经历过那场传奇战役的传说般的存在，但这件事情就是这样毫无逻辑的发生了。希拉在平静的状态下几乎看不出一丁点堕落天使的样子，但在战斗的时候那浓郁的毁灭气息几乎都能够让她的对手直接窒息。",
            xinlingsushi: "对于胜利为主要目的而不择手段的人，被称之为胜负师，而将这一切运用到极致的艾莉西娅，完全无愧于命运胜负师的这一称号。对于心灵魔法下属的魅惑魔法、暗示魔法、命令魔法以及支配魔法全部精通的她来说，利用这些能力将他人操纵于鼓掌之中甚至已经成为了一种习惯。对于这次的龙族入侵，艾西莉娅自然不会放弃这个为自己和幻影联盟谋取利益的绝好机会，没人知道她究竟有什么打算，但所有人都相信，她的所作所为会永远的改变整个世界。",
            zhenLongNvWang: "通过血统革命推翻龙族长老会的统治的领军人物，并且担任龙魂帝国的第一任女王，虽然是人类和龙族的混血种，但她却拥有着连纯血种龙族也无可比拟的天赋，让帝国达到了前所未有的昌盛，为了给帝国带来新的繁荣，决定跨越祖先所设置的界线，重新向帝国的发源地，阿斯特莱雅大陆进军。索菲亚本质上是个非常单纯的人，战斗所取得的辉煌战果让民众对她十分信赖，但进军阿斯特莱雅的决定和这种不顾一切的性格也让很多人感到十分的不满。",
            caijuezhe: "仲裁厅一直是神圣教廷内部最为神秘的部门，如果说光辉神殿的使命是向世人散布神的荣光和怜悯，那么仲裁厅便是他冷酷而无情的另一面。仲裁厅的执行人员，主要负责处理『神秘遗物』以及处理相关的事件以及清除拥有危险力量的渎神者和叛教者。仲裁厅所属的人员包括圣殿骑士和战争祭司，总人数极少，由被称为『裁决者』的十余名特别骑士所管辖。面对突如其来的龙族入侵，这个神秘而特殊的机构终于将他的面目展露在世人面前，这次事件中带队的裁决者的代号为“路西菲尔”。",
            jianwuzhe: "来自极北荒原上的古老剑舞者部落，为了寻找早年失散的弟弟，独身一人的她不顾族内的禁律，在经过血腥的试炼之后，孤身南下来到阿斯特莱雅。黛循着一路上零星的消息南下来到了埃格塔尔，大陆上智者云集的咏歌城，希望在这里能够找到自己弟弟的消息。在咏歌城她意外地遭遇了龙族入侵的突发状况，剑舞者血脉中灵敏的直觉让她意识到对于急需援手的她来说这无疑是一个大好时机，当机立断之下黛加入了咏歌城的卫戍部队，凭借着惊艳绝伦的剑舞和传承的剑咏力量，在这个危机万分的时机成为了咏歌城不可或缺的核心战力。",
            shuangxuegongzhu: "性格活泼天然，从来不知道怀疑别人，像是大自然所孕育出的妖精一般。她在幼年的时候被罗格所救，因此很亲近人类。后来，更是在罗格的指导下学会了将神圣能量融入了自己所熟悉的冰霜之中，萨纹蕾缇的善良和纯洁得到了神圣教廷的认可，并被大家亲切地称为“霜雪公主”。 在这次龙族入侵的危机之中，为营救出访咏歌城而意外被困的大司祭罗格，加入了路西菲尔所带领的特别队伍，决心为报答罗格的恩情而贡献出自己的力量。",
            fengbaozhizhengguan: "莱茵哈特作为伊瑞西亚传奇英雄剑帝卡特琳娜的得意弟子，并没有完全继承他的师父在剑术之道上的精深造诣，但是却近乎完美地继承了师父的政治理念和治国之道，拥有着完美的政治嗅觉和执行力的他在作为伊瑞西亚行政主体的执政议会中，担任权力金字塔顶尖的执政官这一职务，这对于他的年龄来说几乎是个不可能的奇迹。作为伊瑞西亚新兴一代的代表人物，莱茵哈特既继承着如他师父一般准确而又精妙的判断和决策能力，又没有像卡特琳娜一样在风云突变的混乱生涯中所结下的诸多羁绊和顾虑。",
            qumozhe: "即使是在幻影联盟之中，来历不明的克里欧斯也是一个格格不入的独行者，他拥有驱动强大的力量，却过着苦行僧一般的生活，人们对他的了解仅仅限于那个沉默寡言和对于魔法的极端厌恶的身影，在这片战火纷飞的大陆上，没有人知道他在哪里能够找到自己的归宿。",
            longyuzhe: "龙魂帝国元帅崔凡克的独生女，作为拥有稀有的才能“完全记忆能力”的天才，在龙魂帝国中她也是已知的“龙语者”这个神秘职业唯一传承者。因为曾见闻过的事物就绝对不会忘记的记忆力，使得在那次天翻地覆的血统革命中在自己眼前惨死的母亲的一幕一直清晰地留在她记忆里，一直封闭着自己的过去，不过最终因为洛萨温柔而直率的性格重新打开了自己的心灵，因此决定一辈子都跟随洛萨，现在作为他的副官，与洛萨同甘共苦，一道作为进军阿斯特莱雅的先锋而战斗着。",
            youhunfashi: "艾莉西娅的贴身法师，作为艾莉西娅的影子而存在着。对于她是如何和在召唤法术上没有什么造诣的艾莉西娅相遇并且心甘情愿的侍奉她这个问题，从来没有人能够一探究竟。",
            xingwenshi: "斯通本来被誉为咏歌城有史以来最具有天赋的占星家，他和其胞妹蒂雅在星辰法术上的杰出造诣，让他们获得了命运的双子星这个称号，但他最终也因为和蒂雅在星纹法术上的分歧和误解而分道扬镳，在一次意外事故中被蒂雅认为是使用了禁用法术而导致大半个星辰圣所崩塌的理由监禁起来。最终他利用伪造的星纹法术躲开了监视叛逃到幻影联盟，并在那里完善着自己的星纹法术，没有人愿意和自己的命运作对，因此他也成为了绝大多数人最想拥有的队友和最不愿面对的敌人。",
            anzhiwangnv: "如同大部分鲜血议会的成员一样，辛德蕾拉的过去是完全的不为人知的禁忌，身为夜之眷族的她虽然外貌是个清秀弱气的女孩子，但是这幅容貌已经有一百多年没有丝毫变化了。作为鲜血议会的元老成员，辛德蕾拉从来只是自己单独行动，而且从未失手，传闻她的那把“哀恸悲歌”是死神曾经所使用过的。",
            huangjiashiwei: "皇家侍卫自从帝国覆灭之后便再也未曾出现过，直到贝拉维恩，这位帝国历史上最强大的皇家侍卫长，被王室的后裔所召唤，在新一轮的大陆争霸中为神圣教廷而战，英灵化的贝拉维拉能用星石维持自己的形态和日常消耗，在战斗中作为教廷最坚固的盾永远冲锋在战场的最前线。",
            zhoushushi: "沉睡百年的少女，不变的是那颗执着于仇恨的心，虽然她的仇人早已消失在历史之中，但被仇恨蒙蔽了双眼的奈落却将复仇的对象转向了他们的后裔。奈落使用传承自部落的古老邪恶巫术，在与现代的魔法体系格格不入的同时也异常难以破解，无论敌人是谁，奈落都会让他们体会到深渊一般的痛苦与绝望。",
            zhangejisi: "战歌祭司是一种将魔力融入自己的歌声之中，从而提高队友的战斗力量的职业，虽然自身孱弱，但却十分被队友所依赖。在法师众多的咏歌城之中法芙娜一直被狂热的歌迷所追捧，但作为歌姬的她更希望能够在战场上展现自己所拥有的力量，当龙族入侵发生时，法芙娜第一时间赶到受灾最重的重灾区，加入了对抗龙魂帝国的一线部队。"
        },
        skill: {
            zhuiFengJi: {
                forced: true,
                trigger: {
                    player: "gongJiSheZhi",
                },
                filter: function(event, player) {
                    return get.xiBie(event.card) === 'feng';
                },
                content: function() {
                    trigger.wuFaYingZhan();
                },
                mod: {
                    aiOrder: function(player, card, num) {
                        if (get.xiBie(card) === 'feng' && get.type(card) === 'gongJi') {
                            return num - 0.3;
                        }
                    },
                },
                "_priority": 0,
            },
            zhuRiJian: {
                type: "faShu",
                enable: "faShu",
                filter: function(event, player) {
                    return player.hasCard(function(card) {
                        return get.xiBie(card) === 'huo';
                    });
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) === 'huo';
                },
                selectTarget: 1,
                filterTarget: function(card, player, target) {
                    return target.side !== player.side;
                },
                discard: true,
                showCards: true,
                content: function() {
                    // 对目标造成2点法术伤害
                    target.faShuDamage(2, player);
                },
                ai: {
                    order: 3.5,
                    result: {
                        target: function(player, target) {
                            // 基础伤害收益
                            let value = get.damageEffect(target, 2);
                            // 如果目标没有治疗，优先选择
                            if (target.zhiLiao == 0) value += 0.3;
                            // 如果目标手牌多，优先选择（可以爆士气）
                            if (target.countCards('h') > 4) value += 0.5;
                            return value;
                        },
                    },
                },
                "_priority": 0,
            },
            lingDongZhiWu: {
                usable: 1,  // 回合限定
                trigger: {
                    player: "gongJiAfter",
                },
                filter: function(event, player) {
                    return player.canBiShaShuiJing() && !event.yingZhan;
                },
                content: function() {
                    'step 0'
                    // 消耗水晶
                    player.removeBiShaShuiJing();
                    
                    'step 1'
                    // 获得额外法术行动
                    player.addFaShu();
                },
                ai: {
                    order: 9.5,
                    useful: function(player) {
                        // 有可用法术牌时优先使用
                        if (player.hasCard(card => get.type(card) === 'faShu')) {
                            return true;
                        }
                        // 手牌多优先跑牌
                        if (player.countCards('h') > 3) {
                            return true;
                        }
                        // 中后期必用
                        if (get.shiQi(player.side) < 10) {
                            return true;
                        }
                        return false;
                    },
                    shuiJing: true,
                },
                "_priority": 0,
            },
            jianta: {
                trigger: {
                    player: "gongJiSheZhi",
                },
                charlotte: true,
                forced: true,
                filter: function (event, player) {
                    return get.type(event.card) === 'gongJi'; // 所有攻击伤害
                },
                content: function () {
                    trigger.changeDamageNum(1);
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.type(card) === 'gongJi') return [1, 2]; // 提升攻击威胁
                        },
                    },
                },
                "_priority": 0,
            },
            zhuixing: {
                trigger: {
                    player: "gongJiBefore",
                },
                filter: function (event, player) {
                    return get.type(event.card) === 'gongJi' && player.canBiShaShuiJing();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.wuFaYingZhan();
                },
                ai: {
                    order: 10,
                    result: {
                        target: function (player, target) {
                            return -1; // 倾向压制敌方
                        },
                    },
                },
                "_priority": 0,
            },
            zhuiYingJi: {
                trigger: {
                    player: "gongJiAfter",
                },
                usable: 1,
                filter: function (event, player) {
                    if (event.yingZhan) return false;
                    return event.targets && event.targets.length > 0;
                },
                content: function () {
                    // 记录本回合已主动攻击过的目标
                    if (!player.storage.zhuiYingJiTargets) {
                        player.storage.zhuiYingJiTargets = [];
                    }
                    player.storage.zhuiYingJiTargets.addArray(trigger.targets);

                    player.storage.extraXingDong.push({
                        xingDong: 'gongJi',
                        filterTarget: function (card, player, target) {
                            return player.storage.zhuiYingJiTargets.includes(target);
                        },
                        prompt: '追影击：攻击本回合主动攻击过的对手',
                    });
                },
                group: "zhuiYingJi_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseAfter",
                        },
                        silent: true,
                        content: function () {
                            delete player.storage.zhuiYingJiTargets;
                        },
                        sub: true,
                        sourceSkill: "zhuiYingJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                ai: {
                    combo: "gongJi",
                    order: 10,
                },
                "_priority": 0,
            },
            tiGu: {
                trigger: {
                    source: "gongJiMingZhong",
                },
                usable: 1,
                filter: function (event, player) {
                    return player.countNengLiang('baoShi') > 0;
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi(); // 移除1个宝石
                    'step 1'
                    trigger.changeDamageNum(2); // 额外+2伤害
                },
                ai: {
                    baoShi: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (tag == 'baoShi' && player.countNengLiang('baoShi') == 0) return false;
                    },
                    effect: {
                        target: function (card, player, target, current) {
                            if (card.name == 'gongJi' && get.attitude(player, target) < 0) {
                                return [1, 3];
                            }
                        },
                    },
                },
                "_priority": 0,
            },
            tanLanZhiXin: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card, player, selected) {
                    return get.xuanZeTongXiPai(card)
                },
                position: "h",
                selectCard: 2,
                discard: true,
		        showCards: true,
                selectTarget: 1,
                filter: function (event, player) {
                    return player.countTongXiPai() >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.isEnemyOf(player);
                },
                content: function () {
                    'step 0'
                    const result = target.chooseToDiscard(1,'弃置一张【暗灭】或【圣光】，否则受到2点法术伤害', 'h', "showCards", function (card) {
                        return get.name(card) === 'anMie' || get.name(card) === 'shengGuang';
                    }).set('ai', function (card) {
                        return 100 - get.value(card);;
                    });
                    'step 1'
                    if (!result.bool) {
                        target.faShuDamage(2, player);
                    }
                },
                ai: {
                    order: 6,
                    result: {
                        target: function (player, target) {
                            return -2;
                        },
                    },
                },
                "_priority": 0,
            },
            wanWuYanMie: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaBaoShi();
                },
                content: function () {
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var targets = game.filterPlayer(p => p != player && p.isEnemyOf(player));
                    for (let i = 0; i < targets.length; i++) {
                        targets[i].faShuDamage(2, player);
                    }
                },
                ai: {
                    baoShi: true,
                    order: 8,
                    result: {
                        player: function (player) {
                            return 6;
                        },
                    },
                },
                "_priority": 0,
            },
            zhanPuWeiLai: {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                content: async function (event,trigger,player) {
                    var cards = get.cards(2);
                    await player.showHiddenCards(cards, '展示预兆牌');
                    game.cardsGotoOrdering(cards);
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        game.log(player, '翻开', card, '作为【预兆】');
                        game.broadcastAll(function (card) {
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            card.style.display = 'block';
                            card.style.transform = 'none';
                        }, card);
                        player.loseToSpecial([card], '预兆', player);
                        if(get.xiBie(card)=="shui"){
                            await event.trigger("yuZhaoCardAdded")
                        }else if(["guang","an"].includes(get.xiBie(card))){
                            await event.trigger("guangAnYuZhaoCardAdded")
                        }
                    }
                },
                group: "zhanPuWeiLai_endClear",
                subSkill: {
                    endClear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        forced: true,
                        content: function () {
                            var cards = player.getCards('s');
                            if (cards.length) {
                                player.discard(cards, '预兆');
                                game.log(player, '弃置全部【预兆】');
                            }
                        },
                        sub: true,
                        sourceSkill: "zhanPuWeiLai",
                        "_priority": 0,
                    },
                },
                mod: {
                    "cardEnabled2": function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                    cardUsable: function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                    cardRespondable: function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                    cardSavable: function (card, player) {
                        if (card.hasGaintag('预兆')) return false;
                    },
                },
                "_priority": 0,
            },
            lieHuoFenShen: {
                forced: true,
                trigger: {
                    player: "gongJiMingZhong",
                },
                filter: function(event, player) {
                    return !event.yingZhan && player.getCards('s', card => card.hasGaintag('预兆') && get.xiBie(card) == 'huo'); // 仅主动攻击
                },
                content: function() {
                    // 计算火系预兆数量
                    var huo_count = player.getCards('s', card => card.hasGaintag('预兆') && get.xiBie(card) == 'huo').length;
                    if (huo_count > 0) {
                        trigger.changeDamageNum(huo_count);
                        game.log(player, `烈焰焚身：火系预兆${huo_count}个，伤害+${huo_count}`);
                    }
                },
                "_priority": 0,
            },
            hanBingHuTi: {
                trigger: {
                    global: "yuZhaoCardAdded",
                },
                forced: true,
                content: function() {
                    'step 0'
                    player.chooseTarget(true,'【寒冰护体】：选择1名角色增加1点[治疗]').set('ai', function (target) {
                        var player = _status.event.player;
                        let value = get.zhiLiaoEffect2(target, player, 1);
                        return get.zhiLiaoEffect2(target, player, 1);
                    });
                    'step 1'
                    if (result.bool && result.targets.length) {
                        result.targets[0].changeZhiLiao(1, player);
                    }
                },
                "_priority": 0,
            },
            leiTingZhiNu: {
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                filter: function (event, player) {
                    return player.getCards('s', card => card.hasGaintag('预兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card))).length > 0;
                },
                content: function () {
                    'step 0'
                    var count = player.getCards('s', card => {
                        return card.hasGaintag('预兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card));
                    }).length;
                    player.chooseTarget(true,'雷霆之怒：选择一名对手造成' + count + '点法术伤害③', function (card, player, target) {
                        return target.side != player.side;
                    }).set('ai', function (target) {
                        var player=_status.event.player;
                        let value = get.damageEffect(target,player,count);
                        // 如果目标没有治疗，优先选择
                        if (target.zhiLiao == 0) value += 0.3;
                        // 如果目标手牌多，优先选择（可以爆士气）
                        if (target.countCards('h') > 4) value += 0.5;
                        return value;
                    });
                    'step 1'
                    var count = player.getCards('s', card => {
                        return card.hasGaintag('预兆') && ['lei', 'guang', 'an'].includes(get.xiBie(card));
                    }).length;
                    if (result.bool && result.targets.length) {
                        result.targets[0].faShuDamage(count, player);
                    }
                },
                "_priority": 1,
            },
            guangYingJiaoCuo: {
                trigger: {
                    global: "guangAnYuZhaoCardAdded",
                },
                forced: true,
                content: async function (event,trigger,player) {
                    var card = get.cards(1)[0];
                    await player.showHiddenCards(card, '展示预兆牌');
                    game.log(player, '因【光影交错】额外翻开', card, '作为【预兆】');
                    game.broadcastAll(function (card) {
                        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                        card.style.display = 'block';
                        card.style.transform = 'none';
                    }, card);
                    player.loseToSpecial([card], '预兆', player);
                    if(get.xiBie(card)=="shui"){
                        await event.trigger("yuZhaoCardAdded")
                    }else if(["guang","an"].includes(get.xiBie(card))){
                        await event.trigger("guangAnYuZhaoCardAdded")
                    }
                },
                "_priority": 0,
            },
            daYuYanShu: {
                type: "faShu",
                enable: "faShu",
                filter: function(event, player) {
                    return player.canBiShaBaoShi();
                },
                content: async function (event,trigger,player) {
                    // 消耗宝石
                    await player.removeBiShaBaoShi();
                    var cards = get.cards(2);
                    await player.showHiddenCards(cards, '展示预兆牌');
                    game.cardsGotoOrdering(cards);
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        game.log(player, '翻开', card, '作为【预兆】');
                        game.broadcastAll(function (card) {
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                            card.style.display = 'block';
                            card.style.transform = 'none';
                        }, card);
                        player.loseToSpecial([card], '预兆', player);
                        if(get.xiBie(card)=="shui"){
                            await event.trigger("yuZhaoCardAdded")
                        }else if(["guang","an"].includes(get.xiBie(card))){
                            await event.trigger("guangAnYuZhaoCardAdded")
                        }
                    }
                    await player.addGongJiOrFaShu();
                },
                ai: {
                    baoShi: true,
                    order: 4,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            shengGuangShanYao: {
                type: "faShu",
                enable: "faShu",
                duYou: "shengGuangShanYao",
                filterCard: function (card) {
                    return get.type(card) == 'faShu';
                },
                position: "h",
                filter: function (event, player) {
                    return player.countCards('h', card => get.type(card) == 'faShu') > 0;
                },
                selectCard: 1,
                discard: true,
                showCards: true,
                prompt: "任意分配3点[治疗]给目标角色",
                content: function () {
                    'step 0'
                    event.count = 0;
                    event.nextStep = function () {
                        if (event.count >= 3) return event.finish();
                        player.chooseTarget('第' + (event.count + 1) + '次：选择治疗目标（剩余' + (3 - event.count) + '）', true,function(card, player, target){
                            return target.side == player.side;
                        }).set('ai', function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        });
                    };
                    event.nextStep();
                    'step 1'
                    if (result.bool && result.targets && result.targets.length) {
                        result.targets[0].changeZhiLiao(1, player);
                    }
                    event.count++;
                    if (event.count < 3) {
                        event.nextStep();
                        event.goto(1);
                    }
                },
                ai: {
                    order: 4,
                    result: {
                        target: function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        },
                        player: function (player) {
                            let zhiliao_num = 0;
                            let targets = game.filterPlayer(p => !p.isEnemyOf(player));
                            for (let target of targets) {
                                let num = target.getZhiLiaoLimit()-target.ZhiLiao;
                                zhiliao_num += num;
                            }
                            console.log(zhiliao_num - 2);
                            return zhiliao_num - 2;
                        },
                    },
                },
                "_priority": 0,
            },
            jiuShu: {
                type: "faShu",
                enable: "faShu",
                filterTarget: function (card, player, target) {
                    return target != player && target.side == player.side;
                },
                selectTarget: 1,
                content: function () {
                    'step 0'
                    player.draw();
                    'step 1'
                    player.changeZhiLiao(1);
                    target.changeZhiLiao(1);
                },
                ai: {
                    order: 3.6,
                    result: {
                        target: function (target) {
                            return get.zhiLiaoEffect(target, 1);
                        },
                        player: function (player) {
                            if(player.countCards("h")>5) {
                                console.log("满手，不发动")
                                return -1;
                            }
                            // 
                            if(player.ZhiLiao==2) {
                                console.log("自己满治疗，不发动")
                                return -1;
                            }
                            return get.zhiLiaoEffect(player, 1);
                        },
                    },
                },
                "_priority": 0,
            },
            shenShengCaiJue: {
                type: "faShu",
                enable: "faShu",
                filter: function (event, player) {
                    return player.canBiShaShuiJing();
                },
                selectTarget: 1,
                filterTarget: function (card, player, target) {
                    return true;
                },
                content: async function (event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    var options = ['你们各弃2张牌', '你们各摸2张牌'];
                    var res = await player.chooseControl(['选项一', '选项二'])
                        .set('choiceList', options)
                        .set('prompt', '选择神圣裁决的效果')
                        .set('ai', function(target) {
                            var player = _status.event.player;
                            if (player.countCards('h') > 4) return '选项一';
                            return '选项二';
                        })
                        .forResult();

                    event.effect = res.control;
                    var target = _status.event.target;
                    if (event.effect == '选项一') {
                        await player.chooseToDiscard('h', 2, true);
                        await target.chooseToDiscard('h', 2, true);
                    } else {
                        await player.draw(2);
                        await target.draw(2);
                    }
                },
                ai: {
                    shuiJing: true,
                    order: 4,
                    result: {
                        target: function (player, target) {
                            if (player.countCards('h') <= 4 && target.countCards('h') > 4) return -2;
                            if (player.countCards('h') > 4) return 1;
                            return -1;
                        },
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            lieDiMaiChong: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return get.xiBie(card) == 'lei' || get.xiBie(card) == 'di';
                },
                selectCard: 1,
                discard: true,
                showCards: true,
                selectTarget: 1,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'lei' || get.xiBie(card) == 'di') > 0;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.side != player.side;
                },
                content: function () {
                    target.faShuDamage(1, player);
                },
                ai: {
                    order: 3,
                    result: {
                        target: function (target) {
                            return get.damageEffect(target, player, 1);
                        },
                    },
                },
                "_priority": 0,
            },
            lianLeiDiYu: {
                type: "faShu",
                enable: "faShu",
                filterCard: function (card) {
                    return (get.xiBie(card) === 'lei' || get.xiBie(card) === 'di') && get.xuanZeTongXiPai(card);  // 两张必须同系
                },
                position: "h",
                selectCard: 2,
                discard: true,
                showCards: true,
                filter: function (event, player) {
                    return player.countCards('h', card => get.xiBie(card) == 'lei') >= 2 || player.countCards('h', card => get.xiBie(card) == 'di') >= 2;
                },
                filterTarget: function (card, player, target) {
                    return target != player && target.side != player.side;
                },
                selectTarget: 1,
                content: function () {
                    target.faShuDamage(2, player);
                },
                ai: {
                    order: 6,
                    result: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, 2);
                        },
                    },
                },
                "_priority": 0,
            },
            shiXueZhiXin: {
                trigger: {
                    source: "zaoChengShangHai",
                },
                filter: function (event, player) {
                    return !player.storage._shiXueUsed && event.faShu && player.canBiShaBaoShi();
                },
                content: async function (event,trigger,player) {
                    await player.removeBiShaBaoShi();  // 消耗1颗宝石
                    await trigger.changeDamageNum(2);  //增加两点法术伤害
                    player.storage._shiXueUsed = true;
                },
                group: "shiXueZhiXin_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        silent: true,
                        content: function () {
                            player.storage._shiXueUsed = false;
                        },
                        sub: true,
                        sourceSkill: "shiXueZhiXin",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                ai: {
                    baoShi: true,
                    effect: {
                        target: function (player, target) {
                            return get.damageEffect(target, player, 2);
                        },
                    },
                },
                "_priority": 0,
            },
            huanXiangChongJi: {
                enable: "gongJi",
                filter: function(event, player) {
                    // 手牌至少要有3张才能发动
                    return player.countCards('h') >= 3;
                },
                selectCard: 3,
                filterCard:function(card){
                    return true;
                },
                discard:true,
                selectTarget: 1,
                filterTarget: function(card, player, target){
                    return target.side != player.side;
                },
                content: async function(event, trigger, player) {
                    player.storage.hiddenCards = event.cards;
                    var target = event.target;
                    var options = ['翻开', '不翻开'];
                    var fankai = await target.chooseControl(['选项一', '选项二'])
                        .set('choiceList', options)
                        .set('prompt', '受到3点暗灭伤害，是否选择翻开暗置牌？<br>翻开对方的暗置牌，若为同系，对方额外选择一名队友+1宝石<br>若否，本次攻击无效且对方受到5点法术伤害，你+1治疗。')
                        .set('ai',function(){
                            //ai随机选择翻开和不翻开
                            var num=Math.random();
                            if(num>0.5) return "选项一";
                            else return "选项二";
                        }).forResult('control');
                    
                    event.effect = fankai;
                    if (event.effect == '选项一') {
                        // 选择翻开，先将暗置的牌展示出来
                        await player.showCards(player.storage.hiddenCards);
                        // 判断三同系
                        const xiBie = get.xiBie(player.storage.hiddenCards[0]);
                        if(player.storage.hiddenCards.every(card => get.xiBie(card) === xiBie)){
                            // 三同系，玩家选择一个队友加1宝石，正常结算三点暗灭伤害
                            var card={name:'anMie',xiBie:'an'};
                            await player.useCard(card,target).set('damageNum',3).set('action',true);
                            var xingshi = await player.chooseTarget(1,true,'选择一个队友加1宝石',true,function(card, player, target){
                                return player != target && target.side == player.side;
                            }).forResult();
                            var xingshi_target = xingshi.targets[0];
                            await xingshi_target.changeNengLiang('baoShi',1);
                        }else{
                            //否，伤害无效，玩家受到5点法术伤害，目标加1治疗
                            await player.faShuDamage(5,player);
                            await event.trigger("anZhiFail");
                            await target.changeZhiLiao(1);
                        }
                    } else {
                        // 不选择翻开，正常结算三点暗灭伤害
                        var card={name:'anMie',xiBie:'an'};
                        await player.useCard(card,target).set('damageNum',3).set('action',true);
                        await await event.set("source","huanXiangChongJi").set("target",target).trigger("anZhiSuccess");;
                    }
                },
                "_priority": 0,
            },
            xinLingFengBao: {
                type: "faShu",
                enable: "faShu",
                selectCard: 2,
                filterCard: function(card) {
                    return true;
                },
                filterTarget: function(card, player, target){
                    return target.side != player.side;
                },
                filter: function(event, player) {
                    // 手牌至少要有2张才能发动
                    return player.countCards('h') >= 2;
                },
                content: async function(event, trigger, player) {
                    player.storage.hiddenCards = event.cards;
                    var target = event.target;
                    var zhiliao = await player.chooseTarget(1,"选择任意角色+1治疗", true).forResult();
                    zhiliao.targets[0].changeZhiLiao(1,player);
                    var options = ['翻开', '不翻开'];
                    var fankai = await target.chooseControl(['选项一', '选项二'])
                        .set('choiceList', options)
                        .set('prompt', '受到1点法术伤害，是否选择翻开暗置牌？<br>翻开对方的暗置牌，若都为法术，本次法术伤害额外+1，对方额外为任意角色+1治疗<br>若否，本次法术无效且对方受到5点法术伤害，我方战绩区+1宝石。')
                        .set('ai',function(){
                            //ai随机选择翻开和不翻开
                            var num=Math.random();
                            if(num>0.5) return "选项一";
                            else return "选项二";
                        }).forResult('control');
                    
                    event.effect = fankai;
                    if (event.effect == '选项一') {
                        // 选择翻开，先将暗置的牌展示出来
                        await player.showCards(player.storage.hiddenCards);
                        // 判断是否都为法术
                        if(player.storage.hiddenCards.every(card => get.type(card) === 'faShu')){
                            // 都为法术，再选择一个角色加1治疗，结算2点法术伤害
                            target.faShuDamage(2,player);
                            var zhiliao = await player.chooseTarget(1,"额外选择任意角色+1治疗", true).forResult();
                            zhiliao.targets[0].changeZhiLiao(1,player);
                        }else{
                            //否，伤害无效，玩家受到5点法术伤害，目标战绩区加1宝石
                            await player.faShuDamage(5,player);
                            await event.trigger("anZhiFail");
                            await target.changeZhanJi('baoShi',1,target.side);
                        }
                    } else {
                        // 不选择翻开，结算1点法术伤害
                        target.faShuDamage(1,player);
                        await event.set("source","xinLingFengBao").set("target",target).trigger("anZhiSuccess");
                    }
                },
                "_priority": 0,
            },
            zhenShiHuanJue: {
                trigger: {
                    player: "anZhiFail",
                },
                filter: function(event, player) {
                    return !player.storage._huanJueUsed;
                },
                content: function() {
                    player.addGongJiOrFaShu();
                    player.storage._huanJueUsed = true;
                },
                group: "zhenShiHuanJue_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        silent: true,
                        content: function () {
                            player.storage._huanJueUsed = false;
                        },
                        sub: true,
                        sourceSkill: "zhenShiHuanJue",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                "_priority": 0,
            },
            gaiBianShiJie: {
                trigger: {
                    player: "anZhiSuccess",
                },
                filter: function(event, player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    var trigger_name = event.getTrigger().name;
                    var target = event.getTrigger().target;
                    if(trigger_name === "huanXiangChongJi"){
                        var xingshi = await player.chooseTarget(1,true,'选择一个队友加1宝石',true,function(card, player, target){
                            return player != target && target.side == player.side;
                        }).forResult();
                        var xingshi_target = xingshi.targets[0];
                        await xingshi_target.changeNengLiang('baoShi',1);
                    }else if(trigger_name === "xinLingFengBao"){
                        target.faShuDamage(1,player);
                        var zhiliao = await player.chooseTarget(1,"额外选择任意角色+1治疗", true).forResult();
                        zhiliao.targets[0].changeZhiLiao(1,player);
                    }
                },
                "_priority": 0,
            },
            yuanGuJinZhi: {
                trigger:{
                    global: "gameStart"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    if (!player.storage.longZuFuXing_removed)
                        player.storage.longZuFuXing_removed = [];
                    await player.addZhiShiWu("longKuangMiSuo");
                    await player.addZhiShiWu("longMaiShuFu");
                    await player.addZhiShiWu("longYuFengYin");
                    await player.addZhiShiWu("yuLongJieJie");
                },
                "_priority": 0,
            },
            zhenLongJueXing: {
                trigger: {
                    global: ["changeShiQiAfter","heCheng"]
                },
                forced: true,
                filter:function(event,player){
                    // 四张全翻就无需再询问
                    if(player.hasZhiShiWu("baiWanLongYan") &&
                    player.hasZhiShiWu("longWangZhiLi") &&
                    player.hasZhiShiWu("longShenEnHui") &&
                    player.hasZhiShiWu("shengLongWeiYa")) return false;
                    // 改变士气增加判断是否我方士气下降
                    if(event.name === "changeShiQi") return player.side==event.side && event.num<0;
                    // 合杯则一定执行
                    else return true;
                },
                content: async function(event,trigger,player) {
                    var skillMap = {
                        "龙狂迷锁": {
                            id: "baiWanLongYan",
                            text: "龙狂迷锁=>百万龙炎:(摸0-2张牌，弃X张同系牌)对自己和任一对手各造成X点法术伤害"
                        },
                        "龙脉束缚": {
                            id: "longWangZhiLi",
                            text: "龙脉束缚=>龙王之力:(攻击命中后弃X张异系牌)本次伤害额外+X"
                        },
                        "龙语封印": {
                            id: "longShenEnHui",
                            text: "龙语封印=>龙神恩惠:(攻击行动结束后发动)额外获得1个法术行动"
                        },
                        "驭龙结界": {
                            id: "shengLongWeiYa",
                            text: "驭龙结界=>圣龙威压:你的攻击不能被应战，你也不能应战攻击"
                        }
                    };
                    var options = [];
                    var buttons = [];
                    for (var key in skillMap) {
                        if (!player.hasZhiShiWu(skillMap[key].id)) {
                            options.push(skillMap[key].text);
                            buttons.push(key);
                        }
                    }
                    var jinzhi = await player.chooseControl(buttons)
                        .set('choiceList', options)
                        .set('prompt', '翻转任意一张【禁制】牌')
                        .set('ai',function(){
                            //优先龙狂迷锁和龙脉束缚，其次龙语封印，最后驭龙结界
                            var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                            for (var id of ids) {
                                if (!player.hasZhiShiWu(id)) {
                                    if(id == "baiWanLongYan") return "龙狂迷锁";
                                    if(id == "longWangZhiLi") return "龙脉束缚";
                                    if(id == "longShenEnHui") return "龙语封印";
                                    if(id == "shengLongWeiYa") return "驭龙结界";
                                }
                            }
                        }).forResult('control');
                    
                    if (jinzhi == '龙狂迷锁') {
                        await player.setZhiShiWu("longKuangMiSuo",0);
                        await player.setZhiShiWu("baiWanLongYan",1);
                    }else if(jinzhi == '龙脉束缚') {
                        await player.setZhiShiWu("longMaiShuFu",0);
                        await player.setZhiShiWu("longWangZhiLi",1);
                    }else if(jinzhi == '龙语封印') {
                        await player.setZhiShiWu("longYuFengYin",0);
                        await player.setZhiShiWu("longShenEnHui",1);
                    }else if(jinzhi == '驭龙结界') {
                        await player.setZhiShiWu("yuLongJieJie",0);
                        await player.setZhiShiWu("shengLongWeiYa",1);
                    }
                },
                group: "zhenLongJueXing_clear",
                subSkill: {
                    //回合结束强制翻回所有禁制牌
                    clear: {
                        trigger:{
                            player: "phaseEnd"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            if (!player.storage.longZuFuXing_removed.includes("baiWanLongYan")) {
                                await player.setZhiShiWu("baiWanLongYan",0);
                                await player.setZhiShiWu("longKuangMiSuo",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("longWangZhiLi")) {
                                await player.setZhiShiWu("longWangZhiLi",0);
                                await player.setZhiShiWu("longMaiShuFu",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("longShenEnHui")) {
                                await player.setZhiShiWu("longShenEnHui",0);
                                await player.setZhiShiWu("longYuFengYin",1);
                            }
                            if (!player.storage.longZuFuXing_removed.includes("shengLongWeiYa")) {
                                await player.setZhiShiWu("shengLongWeiYa",0);
                                await player.setZhiShiWu("yuLongJieJie",1);
                            }
                        },
                        silent: true,
                        sub: true,
                        sourceSkill: "zhenLongJueXing",
                        popup: false,
                        "_priority": 0,
                    }
                },
                "_priority": 0,
            },
            longHunShouHu: {
                trigger: {
                    player: "faShuEnd"
                },
                forced: true,
                content: function() {
                    player.changeZhiLiao(1);
                },
                "_priority": 0,
            },
            longShenEnHui: {
                intro:{
                    name:'龙神恩惠',
                    content:"<span class='tiaoJian'>(攻击行动结束后发动)</span>额外获得1个法术行动，<span class='greentext'>【龙语封印】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longShenEnHui.jpg',
                trigger:{
                    player: "gongJiEnd"
                },
                forced: true,
                filter: function(event, player) {
                    return player.hasZhiShiWu('longShenEnHui');
                },
                content: function() {
                    player.addFaShu();
                },
                "_priority": 0,
            },
            longWangZhiLi: {
                intro:{
                    name:'龙王之力',
                    content:"<span class='tiaoJian'>(攻击命中后弃X张异系牌)</span>本次伤害额外+X，<span class='greentext'>【龙脉束缚】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longWangZhiLi.jpg',
                trigger:{
                    player: "gongJiMingZhong"
                },
                filter: function(event, player) {
                    return player.hasZhiShiWu('longWangZhiLi') && player.countYiXiPai() >=2;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([2,Infinity],'h', card => get.xuanZeYiXiPai(card))
                    .set('prompt',"龙王之力：攻击命中后弃X张异系牌,本次伤害额外+X")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    if(event.cards){
                        await player.discard(event.cards).set('showCards',true);
                        await trigger.changeDamageNum(event.cards.length);
                    }
                },
                "_priority": 0,
            },
            shengLongWeiYa: {
                intro:{
                    name:'圣龙威压',
                    content:"你的攻击不能被应战，你也不能应战攻击，<span class='greentext'>【驭龙结界】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/shengLongWeiYa.jpg',
                trigger:{
                    global: "gongJiShi"
                },
                forced: true,
                filter: function(event, player) {
                    if(!player.hasZhiShiWu('shengLongWeiYa')) return false;
                    return event.source==player || event.target==player;
                },
                content: function() {
                    trigger.wuFaYingZhan();
                },
                "_priority": 0,
            },
            baiWanLongYan: {
                intro:{
                    name:'百万龙炎',
                    content:"<span class='tiaoJian'>(摸0-2张牌，弃X张同系牌)</span>对自己和任一对手各造成X点法术伤害，<span class='greentext'>【龙狂迷锁】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/baiWanLongYan.jpg',
                type: 'faShu',
                enable: 'faShu',
                filter: function(event, player) {
                    return player.hasZhiShiWu('baiWanLongYan');
                },
                content: async function(event,trigger,player) {
                    // 选择摸0-2张牌
                    var list=[];
                    for(var i=0;i<3;i++){
                        list.push(i);
                    }
                    var mopai_num = await player.chooseControl(list).set('prompt','选择摸0-2张牌').set('ai',function(){
                        if(player.countCards('h')<=4) return 2;
                        else if(player.countCards('h') == 5) return 1;
                        else return 0;
                    }).forResult('control');
                    await player.draw(mopai_num);
                    if(player.countTongXiPai()<2) return;
                    // 弃X张同系
                    var qiPai = await player.chooseCard([2,Infinity],'h', card => get.xuanZeTongXiPai(card))
                    .set('prompt',"百万龙炎：弃X张同系牌,对自己和任一对手各造成X点法术伤害")
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                    // 各造成X点法术伤害
                    if(qiPai.bool){
                        await player.discard(qiPai.cards).set('showCards',true);
                        var duishou = await player.chooseTarget(1,'选择任意对手，各造成X点法术伤害',true,function(card, player, target){
                                return player != target && target.side != player.side;
                        }).forResult();
                        var target = duishou.targets[0];
                        await target.faShuDamage(qiPai.cards.length,player);
                        await player.faShuDamage(qiPai.cards.length,player);
                    }
                },
                "_priority": 0,
            },
            longZuFuXing: {
                trigger: {
                    player: "phaseEnd"
                },
                filter: function(event, player) {
                    if (player.canBiShaBaoShi()) {
                        var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                        for (var id of ids) {
                            if (player.hasZhiShiWu(id) && !player.storage.longZuFuXing_removed.includes(id)) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    await player.removeBiShaBaoShi();
                    var skillMap = {
                        "龙狂迷锁": {
                            id: "baiWanLongYan",
                            text: "龙狂迷锁=>百万龙炎:(摸0-2张牌，弃X张同系牌)对自己和任一对手各造成X点法术伤害"
                        },
                        "龙脉束缚": {
                            id: "longWangZhiLi",
                            text: "龙脉束缚=>龙王之力:(攻击命中后弃X张异系牌)本次伤害额外+X"
                        },
                        "龙语封印": {
                            id: "longShenEnHui",
                            text: "龙语封印=>龙神恩惠:(攻击行动结束后发动)额外获得1个法术行动"
                        },
                        "驭龙结界": {
                            id: "shengLongWeiYa",
                            text: "驭龙结界=>圣龙威压:你的攻击不能被应战，你也不能应战攻击"
                        }
                    };
                    var options = [];
                    var buttons = [];
                    for (var key in skillMap) {
                        if (player.hasZhiShiWu(skillMap[key].id) && !player.storage.longZuFuXing_removed.includes(skillMap[key].id)) {
                            options.push(skillMap[key].text);
                            buttons.push(key);
                        }
                    }
                    var toRemove = await player.chooseControl(buttons)
                    .set('choiceList', options)
                    .set('prompt', '选择一张【禁制】永久移除')
                    .set('ai', function(){
                        var ids = ["baiWanLongYan", "longWangZhiLi", "longShenEnHui", "shengLongWeiYa"];
                        for (var id of ids) {
                            if (player.hasZhiShiWu(id) && !player.storage.longZuFuXing_removed.includes(id)) {
                                if(id == "baiWanLongYan") return "龙狂迷锁";
                                if(id == "longWangZhiLi") return "龙脉束缚";
                                if(id == "longShenEnHui") return "龙语封印";
                                if(id == "shengLongWeiYa") return "驭龙结界";
                            }
                        }
                    }).forResult('control');
                    player.storage.longZuFuXing_removed.push(skillMap[toRemove].id);
                    lib.skill[skillMap[toRemove].id].intro.name = lib.skill[skillMap[toRemove].id].intro.name + "  <span class='hong'>【禁制】已永久移除</span>";
                },
                "_priority": 1,
            },
            longKuangMiSuo:{
                intro:{
                    name:'龙狂迷锁',
                    content:"<span class='tiaoJian'>(摸0-2张牌，弃X张同系牌)</span>对自己和任一对手各造成X点法术伤害，<span class='greentext'>【龙狂迷锁】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longKuangMiSuo.jpg'
            },
            longMaiShuFu:{
                intro:{
                    name:'龙脉束缚',
                    content:"<span class='tiaoJian'>(攻击命中后弃X张异系牌)</span>本次伤害额外+X，<span class='greentext'>【龙脉束缚】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longMaiShuFu.jpg'
            },
            longYuFengYin:{
                intro:{
                    name:'龙语封印',
                    content:"<span class='tiaoJian'>(攻击行动结束后发动)</span>额外获得1个法术行动，<span class='greentext'>【龙语封印】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/longYuFengYin.jpg'
            },
            yuLongJieJie:{
                intro:{
                    name:'驭龙结界',
                    content:"你的攻击不能被应战，你也不能应战攻击，<span class='greentext'>【驭龙结界】</span>存在时不能发动该技能。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/yuLongJieJie.jpg'
            },
            zhengYiZhuiJi: {
                trigger: {
                    global: "changeShiQiAfter"
                },
                forced: true,
                filter: function(event, player) {
                    if(event.getParent().name =="_heCheng_backup" && event.getParent().player==player) 
                        return true; //合杯必定掉对面士气，先触发
                    //正常打伤害的触发判定
                    if(event.side==player.side) return false;    //改变自己方士气不发动
                    if(event.num>=0) return false;  //增加士气不发动
                    return player.storage._zhuiJi;
                },
                group: ["zhengYiZhuiJi_start","zhengYiZhuiJi_end"],
                subSkill: {
                    start: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        silent: true,
                        content: function () {
                            player.storage._zhuiJi = true;
                        },
                        sub: true,
                        sourceSkill: "zhengYiZhuiJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                    end: {
                        trigger: {
                            player: "phaseEnd"
                        },
                        silent: true,
                        content: function () {
                            player.storage._zhuiJi = false;
                        },
                        sub: true,
                        sourceSkill: "zhengYiZhuiJi",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    }
                },
                content: function() {
                    player.insertPhase();
                },
                "_priority": 0
            },
            caiJueZhiXin: {
                trigger: {
                    global: "gameStart",
                    player: "changeXingBeiBegin"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    if(event.triggername === "gameStart"){
                        player.changeNengLiang("shuiJing",2)
                    }else if (event.triggername === "changeXingBeiBegin"){
                        trigger.cancel();
                    }
                },
                "_priority": 0

            },
            zhenLiCaiJue: {
                trigger: {
                    global: "zhiLiaoSheZhi"
                },
                forced: true,
                filter: function(event, player){
                    var damage_event = event.getParent("damage");   //获取造成此次治疗的伤害事件
                    return damage_event.source == player;   // 并判断伤害是否玩家产生
                },
                content: function(){
                    trigger.zhiLiaoLimit = 1;   // 限制治疗使用量为1
                },
                "_priority": 0
            },
            songZhongDaoFeng: {
                trigger: {
                    player: "gongJiBefore"
                },
                filter:function(event,player){
                    return player.canBiShaShuiJing() && !event.yingZhan;
                }, 
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards('h') + 1 <= trigger.target.countCards('h')){
                        trigger.changeDamageNum(1);
                    }
                    if(player.countCards('h') + 1 >= trigger.target.countCards('h')){
                        trigger.wuFaYingZhan();
                    }
                },
                "_priority": 0
            },
            wuJinZhiRen: {
                type: "faShu",
                enable: "faShu",
                filter:function(event,player){
                    return player.canBiShaShuiJing() && (player.countCards('h',card => get.type(card)=="faShu")>=2 || player.countTongXiPai()>=3);
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards('h',card => get.type(card)=="faShu")>=2 && player.countTongXiPai()>=3){
                        event.qiPaiWay = await player.chooseControl(["弃2张法术","弃3张同系"])
                        .set('prompt', '弃2张法术牌或3张同系牌')
                        .set('ai', function(){
                            return "弃3张同系";
                        }).forResult('control');
                    }else if (player.countCards('h',card => get.type(card)=="faShu")>=2){
                        event.qiPaiWay = "弃2张法术";
                    }else if (player.countTongXiPai()>=3){
                        event.qiPaiWay = "弃3张同系";
                    }
                    if(event.qiPaiWay == "弃2张法术"){
                        event.qipai = await player.chooseToDiscard(2,'h', "showCards", true, card => get.type(card)=="faShu")
                        .set('prompt',"弃2张法术牌")
                        .set('complexCard',true)
                        .set('ai',function(card){
                                return 1;
                        }).forResult();
                    }else if (event.qiPaiWay == "弃3张同系") {
                        event.qipai = await player.chooseToDiscard(3,'h', "showCards", true, card => get.xuanZeTongXiPai(card))
                        .set('prompt',"弃3张同系牌")
                        .set('complexCard',true)
                        .set('ai',function(card){
                                return 1;
                        }).forResult();
                    }
                    var duishou = await player.chooseTarget(1,'选择任意玩家，各造成2点法术伤害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                    await player.faShuDamage(2,player);
                },
                "_priority": 0
            },
            weiJianErSheng: {
                trigger:{
                    source: "gongJiWeiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.countCards('h',card => get.type(card)=='faShu') > 0;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.type(card) == 'faShu';
                    })
                    .set('prompt',get.prompt('weiJianErSheng'))
                    .set('prompt2',lib.translate.weiJianErSheng_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    var choose = await player.chooseTarget(1,"选择除本次攻击的角色以外的另一角色造成X点伤害", true, function(card, player, target) {
                        const targetx = _status.event.targetx;
                        return targetx != target && player.side != target.side;
                    }).set("targetx",trigger.player).forResult();
                    await choose.targets[0].faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            duiJianErShi: {
                trigger:{
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.countTongXiPai() >=2;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,Infinity],function(card){
                        return get.xuanZeTongXiPai(card);
                    })
                    .set('prompt',get.prompt('duiJianErShi'))
                    .set('prompt2',lib.translate.duiJianErShi_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set('showCards',true);
                    var choose = await player.chooseTarget(1,"选择除本次攻击的角色以外的另一角色造成X点伤害", true, function(card, player, target) {
                        const targetx = _status.event.targetx;
                        return targetx != target && player.side !=target.side;
                    }).set("targetx",trigger.target).forResult();
                    await choose.targets[0].faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            jianWuYiShi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                    await player.draw(3);
                    await player.addGongJi();
                },
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isHengZhi()) return num+3;
                    },
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi') return num+1;
                    }
                },
                group:['jianWuYiShi_clear'],
                subSkill:{
                    clear:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:async function(event,trigger,player) {
                            await player.chongZhi();
                            await player.qiPai();
                        },
                        "_priority": 1
                    },
                },
                ai:{
                    baoShi:true,
                },
                "_priority": 0
            },
            bingShuangLingYu: {
                trigger: {
                    global: "gameStart"
                },
                forced: true,
                content: function() {
                    var targets = game.filterPlayer(p => p.side == player.side);
                    for (let i = 0; i < targets.length; i++) {
                        targets[i].changeZhiLiao(1, player);
                    }
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                },
                "_priority": 0
            },
            shuiJingDaoQiang: {
                trigger: {
                    source: "gongJiEnd"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.zhiLiao > 0 && event.gongJiMingZhong;
                },
                content: async function(event,trigger,player){
                    // 选择消耗的治疗量
                    var list=[];
                    for(var i=0;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    var zhiLiao_num = await player.chooseControl(list).set('prompt','选择移除X点治疗,额外造成X点法术伤害').set('ai',function(){
                        return player.zhiLiao;
                    }).forResult('control');
                    await player.changeZhiLiao(zhiLiao_num*(-1));
                    await trigger.target.faShuDamage(zhiLiao_num,player);
                },
                "_priority": 0
            },
            lingFengZhuFu: {
                trigger: {
                    source: "gongJiWeiMingZhong"
                },
                forced: true,
                filter: function(event,player) {
                    return ['feng','shui'].includes(get.xiBie(event.card));
                },
                content: async function(event,trigger,player){
                    var zhiliao = await player.chooseTarget(1,"攻击未命中，选择任意角色+1治疗，若其没有治疗，额外+1治疗", true).forResult();
                    if(zhiliao.targets[0].zhiLiao == 0) {
                        await zhiliao.targets[0].changeZhiLiao(2,player);
                    }else{
                        await zhiliao.targets[0].changeZhiLiao(1,player);
                    }
                },
                "_priority": 0
            },
            shuangYuZhiHuan: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    var targets = game.filterPlayer(p => p.side == player.side && p.zhiLiao == 0);
                    for (let i = 0; i < targets.length; i++) {
                        await targets[i].changeZhiLiao(2, player);
                    }
                    await player.addGongJiOrFaShu();
                },
                "_priority": 0
            },
            huJiaoZhiXin: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: function() {
                    player.changeZhiLiao(1);
                },
                "_priority": 0
            },
            wuJinZhuiJi: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return player.zhiLiao > 0 && !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    await player.changeZhiLiao(-1);
                    await player.addGongJi();
                },
                "_priority": 1
            },
            jingZhunJuJi: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.addSkill('jingZhunJuJi_wuFaYingZhan');
                    await player.addGongJi();
                },
                subSkill:{
                    wuFaYingZhan:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return !event.yingZhan;
                        },
                        content:function(){
                            'step 0'
                            trigger.wuFaYingZhan();
                            'step 1'
                            player.removeSkill('jingZhunJuJi_wuFaYingZhan');
                        }
                    }
                },
                "_priority": 0
            },
            zhiYueZhiHuan: {
                trigger: {
                    source: "gongJiBefore"
                },
                filter: function(event,player){
                    return player.countTongXiPai() >=2;
                },
                content: async function(event,trigger,player) {
                    await player.addSkill('zhiYueZhiHuan_weiMingZhong');
                    await player.chooseToDiscard(2,'h', "showCards", true, card => get.xuanZeTongXiPai(card))
                    .set('prompt',"弃2张同系牌")
                    .set('complexCard',true);
                },
                group: "zhiYueZhiHuan_mingZhong",
                subSkill:{
                    mingZhong: {
                        trigger: {
                            source: "gongJiMingZhong"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            await player.removeSkill('zhiYueZhiHuan_weiMingZhong');
                        },
                        "_priority": 1
                    },
                    weiMingZhong: {
                        trigger: {
                            source: "gongJiWeiMingZhong"
                        },
                        forced: true,
                        content: async function(event,trigger,player) {
                            await player.faShuDamage(4);
                            await player.removeSkill('zhiYueZhiHuan_weiMingZhong');
                        },
                        "_priority": 1
                    }
                },
                "_priority": 1
            },
            sheShenZhiDao: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    // 选择摸2-4张牌
                    var list=[];
                    for(var i=2;i<=4;i++){
                        list.push(i);
                    }                       // [0] 2  [1] 3 [2] 4
                    var mopai_num = await player.chooseControl(list).set('prompt','摸2-4张牌，本次攻击伤害额外+X-1').set('ai',function(){
                        if(player.countCards('h')<=2) return 2;
                        else if(player.countCards('h') == 3) return 1;
                        else return 0;
                    }).forResult('control');
                    await player.draw(mopai_num);
                    await trigger.changeDamageNum(mopai_num-1);
                },
                ai: {
                    order(item,player){
                        if(player.countCards('h') > 4) return 1;
                        else return 4;
                    }
                },
                "_priority": 0
            },
            jianRenZhiZhi: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.canBiShaBaoShi() && event.faShu;
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    trigger.num = 0;
                },
                "_priority": 0
            },
            baoFengLingYu: {
                forced: true,
                trigger: {
                    source: "gongJiSheZhi"
                },
                filter: function(event,player) {
                    return ['feng','lei'].includes(get.xiBie(event.card));
                },
                content: function(){
                    trigger.changeDamageNum(1);
                },
                "_priority": 0
            },
            yiZheng: {
                enable: "faShu",
                type: "faShu",
                selectTarget: 1,
                filterTarget: function(card,player,target) {
                    return player.side == target.side && player != target;
                },
                content: async function(event,trigger,player) {
                    event.giveWay = await player.chooseControl(["你给目标1张牌","目标给你1张牌"])
                    .set('prompt', '你选择一项发动：<br>将1张牌交给目标队友<br>目标队友给你1张牌')
                    .set('ai', function(){
                        return "你给目标1张牌";
                    }).forResult('control');
                    if(event.giveWay == "你给目标1张牌") {
                        if(player.countCards('h')>0){
                            const giveCard = await player.chooseCard('h',"将1张牌交给目标队友",true,1).forResult();
                            await player.give(giveCard.cards[0],event.target);
                        }
                    }else {
                        if(event.target.countCards('h')>0) {
                            const giveCard = await event.target.chooseCard('h',"将1张牌交给目标队友",true,1).forResult()
                            await event.target.give(giveCard.cards[0],player);
                        }
                    }
                    await player.addGongJi();
                },
                "_priority": 0
            },
            jiFengZhouYu: {
                trigger: {
                    player: "gongJiAfter"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.addGongJi();
                },
                "_priority": 0
            },
            juLongZhiLi: {
                trigger: {
                    source: "gongJiSheZhi"
                },
                forced: true,
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: function() {
                    const handCardNum = player.countCards("h");
                    trigger.changeDamageNum(handCardNum-1);
                },
                "_priority": 0
            },
            longZuZunYan: {
                trigger:{global:'gameStart'},
                forced: true,
                content: function() {

                },
                mod:{
                    playerEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi' && player.countCards("h")<target.countCards("h") && !player.isHengZhi()){
                            if(_status.event.yingZhan!=true) return false;
                        }
                    }
                },
                "_priority": 0
            },
            longXueQinYe: {
                enable: "faShu",
                type: "faShu",
                content: async function(event,trigger,player) {
                    await player.draw(1);
                    var duishou = await player.chooseTarget(1,'选择任意角色造成1点法术伤害',true)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    })
                    .forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(1,player);
                },
                check: function(event,player) {
                    if(player.countCards("h") == 6) return false;
                    return true;
                },
                ai: {
                    order: 3,
                    result:{
                        player: 1
                    }
                },
                "_priority": 0
            },
            longXueZhuoShao: {
                enable: "faShu",
                type: "faShu",
                content: async function(event,trigger,player) {
                    await player.draw(3);
                    var duishou = await player.chooseTarget(1,'选择任意角色造成2点法术伤害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                    if(player.isHengZhi()){
                        await player.addGongJi();
                    }
                },
                check: function(event,player) {
                    if(player.countCards("h") > 3) return false;
                    return true;
                },
                ai: {
                    order: 3,
                    target:function(player,target){
                        return get.damageEffect(target, 2);
                    }
                },
                "_priority": 0
            },
            xingHongBaiLongBa: {
                trigger: {
                    player: "phaseBegin"
                },
                filter: function(event,player) {
                    return player.canBiShaBaoShi() && !player.isHengZhi();
                },
                content: async function(event,trigger,player) {
                    player.storage.huaLongFlag = true;
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                },
                group: ["xingHongBaiLongBa_tag","xingHongBaiLongBa_clear"],
                subSkill: {
                    tag: {
                        trigger:{player:['faShuBefore','teShuBefore']},
                        direct:true,
                        content:function(){
                            player.storage.huaLongFlag = false;
                        },
                        "_priority": 0
                    },
                    clear: {
                        trigger:{player:['phaseEnd']},
                        filter:function(event,player){
                            return player.isHengZhi() && !player.storage.huaLongFlag;
                        }, 
                        direct:true,
                        content:function(){
                            player.chongZhi();
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            xiaoTianLongQiang: {
                trigger: {
                    source: "gongJiWeiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([1,2],'h', function(card) {
                        if(ui.selected.cards.length==0) return get.type(card) =="gongJi";
                        // 接法术牌
                        else
                            return get.type(card) =="faShu";
                    }).set('filterOk',function(){
                        return ui.selected.cards.some(card => get.type(card)=="gongJi");
                    })
                    .set('prompt',get.prompt('xiaoTianLongQiang'))
                    .set('prompt2',lib.translate.xiaoTianLongQiang_info)
                    .set('complexCard',true).forResult();
                },
                content: async function(event,trigger,player) {
                    if(event.cards){
                        await player.discard(event.cards).set("showCards",true);
                        if(event.cards.length == 2) {
                            await trigger.player.faShuDamage(3,player);
                        } else {
                            await trigger.player.faShuDamage(2,player);
                        }
                        await player.faShuDamage(2,player);
                    }
                },
                "_priority": 0
            },
            juLongBenTeng: {
                enable: "faShu",
                type: "faShu",
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    const duishou = await player.chooseTarget(2,true)
                    .set('prompt',get.prompt('juLongBenTeng'))
                    .set('prompt2',lib.translate.juLongBenTeng_info)
                    .set('filterTarget',function(card,player,target){
                        if(ui.selected.targets.length == 0) return true;
                        else return target.side != ui.selected.targets[0].side;
                    }).set('complexTarget',true).forResult();
                    for(let target of duishou.targets) {
                        if(target.countCards('h')>5){
                            await target.chooseToDiscard(true,target.countCards('h')-5);
                        }else if(target.countCards('h')<5){
                            await target.draw(5-target.countCards('h'));
                        }
                    }
                    await player.addGongJiOrFaShu();
                },
                "_priority": 0
            },
            xieMoXiaoSan: {
                enable: "faShu",
                type: "faShu",
                filter: function(event,player) {
                    const bool1 = game.hasPlayer(function(current){
                        return lib.skill.xieMoXiaoSan.filterTarget('','',current);
                    });
                    const bool2 = player.hasCard(card => ["feng","shui"].includes(get.xiBie(card)))
                    return bool1 && bool2;
                },
                selectCard: 1,
                filterCard: function(card) {
                    return ["feng","shui"].includes(get.xiBie(card));
                },
                discard: true,
                showCards: true,
                filterTarget:function(card,player,target){
                    return target.hasJiChuXiaoGuo() || target.zhiLiao > 0;
                },
                content: async function(event,trigger,player) {
                    if(event.target.hasJiChuXiaoGuo() && event.target.zhiLiao > 0) {
                        // 选择
                        event.yiChuWay = await player.chooseControl(["基础效果","治疗"])
                        .set('prompt', '选择移除基础效果或治疗')
                        .set('ai', function(){
                            return "基础效果";
                        }).forResult('control');
                    }else if(event.target.hasJiChuXiaoGuo()){
                        event.yiChuWay = "基础效果";
                    }else if(event.target.zhiLiao > 0){
                        event.yiChuWay = "治疗";
                    }
                    if(event.yiChuWay == "基础效果"){
                        player.removeJiChuXiaoGuo(event.target);
                    }else if (event.yiChuWay == "治疗") {
                        event.target.removeZhiLiao(1);
                    }
                    var duishou = await player.chooseTarget(1,'对一名对手造成2点法术伤害',true,function(card,player,target){
                        return player!=target && player.side != target.side;
                    }).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(2,player);
                },
                "_priority": 0
            },
            jingHuaDaDi: {
                enable: "faShu",
                type: "faShu",
                filter: function(event,player) {
                    return player.hasCard(card => get.xiBie(card)=="di");
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card)=="di";
                },
                discard: true,
                showCards: true,
                content: async function(event,trigger,player) {
                    const enemy_targets = game.filterPlayer(p => p.side != player.side);
                    for (let target of enemy_targets) {
                        await target.faShuDamage(1,player);
                    }
                    const friend_targets = game.filterPlayer(p => p != player && p.side == player.side);
                    for (let target of friend_targets) {
                        await target.changeZhiLiao(1);
                    }
                },
                "_priority": 0
            },
            yuanSuChongSheng: {
                enable: "faShu",
                type: "faShu",
                usable: 1,
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard('h',true,3);
                    await player.draw(3);
                    await player.addFaShu();
                },
                "_priority": 0
            },
            longZuZhenYan: {
                trigger: {
                    player: "gongJiEnd"
                },
                usable: 1,
                filter: function(event,player) {
                    return !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    if(event.gongJiMingZhong) {
                        player.storage.lastTarget = trigger.target;
                    } else {
                        player.storage.lastTarget = trigger.targets[0];
                    }
                    await player.addGongJi();
                },
                mod: {
                    playerEnabled: function(card,player,target){
                        if(target == player.storage.lastTarget) return false;
                    }
                },
                group: "longZuZhenYan_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        silent: true,
                        content: function () {
                            if(player.storage.lastTarget){
                                player.storage.lastTarget = undefined;
                            }
                        },
                        sub: true,
                        sourceSkill: "longZuZhenYan",
                        forced: true,
                        popup: false,
                        "_priority": 1,
                    },
                },
                "_priority": 0
            },
            shangGuMiYu: {
                trigger: {
                    player: "gongJiSheZhi"
                },
                forced: true,
                filter: function(event,player) {
                    if(event.yingZhan) return false;
                    return player.storage.damageFaShu || player.storage.damageGongJi;
                },
                content: function() {
                    // 本回合造成过法术伤害，攻击无法应战
                    if(player.storage.damageFaShu) trigger.wuFaYingZhan();
                    // 本回合造成过攻击伤害，本次攻击伤害+1
                    if(player.storage.damageGongJi) trigger.changeDamageNum(1);
                },
                group: ["shangGuMiYu_damage","shangGuMiYu_clear"],
                subSkill: {
                    damage: {
                        trigger: {
                            source:'zaoChengShangHai'
                        },
                        direct: true,
                        content: async function(event,trigger,player){
                            if(trigger.faShu) {
                                player.storage.damageFaShu = true;
                            } else {
                                player.storage.damageGongJi = true;
                            }
                        },
                    },
                    clear: {
                        trigger: {
                            player: ["phaseBegin","phaseEnd"]
                        },
                        direct: true,
                        content: function() {
                            player.storage.damageFaShu = false;
                            player.storage.damageGongJi = false;
                        },
                        silent: true,
                        popup: false
                    }
                },
            },
            longHunNingShi: {
                trigger: {
                    source: "gongJiBefore"
                },
                filter: function(event,player){
                    return get.zhanJi(player.side).length > 0 && !event.yingZhan;
                },
                content: async function(event,trigger,player) {
                    var list=[];
                    const zhanJi = get.zhanJi(player.side);
                    for(var i=0;i<zhanJi.length;i++){
                        list.push([zhanJi[i],get.translation(zhanJi[i])]);
                    }
                    var next=player.chooseButton([
                        `龙魂凝视：移除我方【战绩区】1星石`,
                        [list,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('ai',function(button){
                        if(button.link=='baoShi') return 0.5;
                        else return 1;
                    });
                    var links=await next.forResultLinks();
                    await player.removeZhanJi(links[0],1);
                    await player.addTempSkill('longHunNingShi_gongJi');
                },
                subSkill:{
                    gongJi:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return !event.yingZhan;
                        },
                        direct:true,
                        content: async function(event,trigger,player){
                            // 攻击命中造成1点法术伤害
                            if(trigger.gongJiMingZhong){
                                await trigger.target.faShuDamage(1,player);
                            }
                            // 无论是否命中都应该移除此技能效果，避免本次没有命中后续攻击命中也能触发1点法术伤害
                            await player.removeSkill('longHunNingShi_gongJi');
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            zhaiBian: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.hasCard(card=> get.xiBie(card)=="di");
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) == "di";
                },
                discard: true,
                showCards: true,
                content: async function(event,trigger,player) {
                    if(!event.cards || event.cards.length == 0){
                        const qipai = await player.chooseCard(1,'h', true, function(card){
                            return get.xiBie(card) == "di";
                        })
                        .set('prompt',get.prompt('zhaiBian'))
                        .set('prompt2',lib.translate.zhaiBian_info)
                        .set('complexCard',true)
                        .set('ai',function(card){
                            return 1;
                        }).forResult();
                        event.cards = qipai.cards;
                        await player.discard(event.cards).set('showCards',true);
                    }
                    if(event.cards){
                        var targets = game.filterPlayer(p => p != player && p.isEnemyOf(player));
                        for (let i = 0; i < targets.length; i++) {
                            await targets[i].faShuDamage(1, player);
                        }
                        // 清空本轮的弃牌再按需触发大招
                        event.cards = undefined;
                        await event.trigger("faDongJiNeng_youHun");
                    }
                },
                "_priority": 0
            },
            mingHuo: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.hasCard(card=> get.xiBie(card)=="huo");
                },
                selectCard: 1,
                filterCard: function(card) {
                    return get.xiBie(card) == "huo";
                },
                discard: true,
                showCards: true,
                selectTarget: 1,
                filterTarget: true,
                content: async function(event,trigger,player) {
                    if(!event.cards || event.cards.length == 0) {
                        const qipai = await player.chooseCard(1,'h', true, function(card){
                            return get.xiBie(card) == "huo";
                        })
                        .set('prompt',get.prompt('mingHuo'))
                        .set('prompt2',lib.translate.mingHuo_info)
                        .set('complexCard',true)
                        .set('ai',function(card){
                            return 1;
                        }).forResult();
                        event.cards = qipai.cards;
                        await player.discard(event.cards).set('showCards',true);
                    }
                    if(event.cards){
                        if(!event.targets || event.targets.length == 0){
                            var choose = await player.chooseTarget(1,"对任意角色造成2点法术伤害", true).forResult();
                            event.targets = choose.targets;
                        }
                        await event.targets[0].faShuDamage(2,player);
                        // 清空本轮的弃牌和目标再按需触发大招
                        event.cards = undefined;
                        event.targets = undefined;
                        await event.trigger("faDongJiNeng_youHun");
                    }
                },
                "_priority": 0
            },
            fuShi: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.hasCard(card=> get.xiBie(card)=="shui");
                },
                content: async function(event,trigger,player) {
                    // 响应技取消了就没有反悔了
                    const qipai = await player.chooseCard(1,'h',function(card){
                        return get.xiBie(card) == "shui";
                    })
                    .set('prompt',get.prompt('fuShi'))
                    .set('prompt2',lib.translate.fuShi_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 1;
                    }).forResult();
                    if(qipai.cards){
                        await player.discard(qipai.cards).set('showCards',true);
                        var choose = await player.chooseTarget(1,"对任意角色造成1点法术伤害", true)
                        .set('ai',function(target){
                            const player = _status.event.player;
                            return get.damageEffect2(target,player,1);
                        }).forResult();
                        await choose.targets[0].faShuDamage(1,player);
                        await event.trigger("faDongJiNeng_youHun");
                    }
                },
                "_priority": 0
            },
            youHunFenShen: {
                trigger: {
                    player: "faDongJiNeng_youHun"
                },
                usable: 1,
                filter: function(event,player) {
                    return lib.skill[event.name].filter(event,player) && player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    // 额外发动一次技能,并且表明是大招发动的,不给予反悔
                    await player.useSkill(trigger.name);
                },
                "_priority": 0
            },
            diMaiZhiLi: {
                trigger: {
                    player: "gongJiSheZhi"
                },
                forced: true,
                filter: function(event,player) {
                    return ["di","an"].includes(get.xiBie(event.card));
                },
                content: async function(event,trigger,player) {
                    await trigger.changeDamageNum(1);
                },
                "_priority": 0
            },
            poXieZhan: {
                enable:'gongJi',
                filter:function(event,player){
                    if(player.isHengZhi() && player.countCards("h")>=2){
                        // 盖亚化身形态内，且牌数大于等于2即可发动（形态内所有牌均可视为地裂斩）
                        return player.storage.poXieZhan_enabled;
                    }
                    var bool1=player.countTongXiPai()>=2;
                    var bool2=game.hasPlayer(current=>lib.skill.qiZha.filterTarget('',player,current));
                    return bool1&&bool2 && player.storage.poXieZhan_enabled;
                },
                selectCard:[2,3],
                filterCard:function(card,player,event){
                    if(player.isHengZhi()){
                        // 盖亚化身形态内无视同系条件
                        return true;
                    }
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:async function(event, trigger, player){
                    // 判断同系
                    if(player.isHengZhi()){
                        const qiPai_xiBie = get.xiBie(event.cards[0]);
                        if(event.cards.every(card => get.xiBie(card) === qiPai_xiBie)){
                            // 由玩家选择是否转化为地裂斩
                            var zhuanhua = await player.chooseControl(['是', '否'])
                                .set('prompt', '是否将同系牌全部转化为地裂斩？')
                                .set('ai', function () {
                                    return '是';
                                })
                                .forResult();
                            if (zhuanhua.control == '是') {
                                for(let card of event.cards) {
                                    await game.broadcastAll(function(card) {
                                        game.setXiBie(card,"di");
                                        card.name = "diLieZhan";
                                    },card);
                                }
                            }
                        } else {
                            // 存在异系，强制转化为地裂斩
                            for(let card of event.cards) {
                                await game.broadcastAll(function(card) {
                                    game.setXiBie(card,"di");
                                    card.name = "diLieZhan";
                                },card);
                            }
                        }
                    }
                    await player.discard(event.cards).set("showCards",true);
                    var length=event.cards.length;
                    var xiBie,name;
                    if(length==2){
                        xiBie = "di";
                        name = "diLieZhan";
                    }else if(length==3){
                        xiBie='an';
                        name='anMie';
                    }
                    var card={name:name,xiBie:xiBie};
                    await player.useCard(card,event.target).set('action',true);
                },
                "_priority": 0
            },
            shengShengBuXi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.countCards('h') > 0;
                },
                selectCard: 1,
                filterCard: true,
                discard: true,
                content: async function(event,trigger,player) {
                    await player.draw(2);
                    player.storage.poXieZhan_enabled = false;
                    await player.addGongJi();
                },
                group: "shengShengBuXi_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseBegin"
                        },
                        forced: true,
                        content: function() {
                            player.storage.poXieZhan_enabled = true;
                        },
                        silent: true,
                        popup: false,
                        sub: true,
                        sourceSkill: "shengShengBuXi",
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            gaiYaHuaShen: {
                trigger: {
                    player: "phaseEnd"
                },
                filter: function(event,player) {
                    return !player.isHengZhi() && player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    await player.hengZhi();
                },
                group: ["gaiYaHuaShen_gongJi","gaiYaHuaShen_clear","gaiYaHuaShen_mods"],
                subSkill: {
                    gongJi: {
                        trigger: {
                            player: "gongJiSheZhi"
                        },
                        forced: true,
                        filter: function(event,player) {
                            return player.isHengZhi();
                        },
                        content: async function(event,trigger,player) {
                            await trigger.changeDamageNum(1);
                        },
                        "_priority": 1
                    },
                    clear: {
                        trigger: {
                            player: "chengShouShangHai"
                        },
                        forced: true,
                        filter: function(event,player) {
                            return !event.faShu && player.isHengZhi();
                        },
                        content: async function(event,trigger,player) {
                            await player.chongZhi();
                        },
                        "_priority": 1
                    },
                    mods: {
                        enable:['gongJi','yingZhan'],
                        filter:function(event,player){
                            var event=event||_status.event;
                            // 可以应战
                            if(event.name=='yingZhan') return player.isHengZhi() && event.canYingZhan;
                            // 主动攻击
                            return player.isHengZhi();
                        },
                        filterCard:function(card,player,event){
                            var event=event||_status.event;
                            if(event.name=='yingZhan'){
                                // 地系可以用所有基础牌应战，否则要用相同系应战
                                return get.xiBie(event.card)=="di";
                            }
                            return true;
                        },
                        position:'h',
                        viewAs:function(cards,player){
                            if(cards.length==0) return;
                            var dict={name:"diLieZhan",xiBie:"di"};
                            return dict;
                        }
                    }
                },
                "_priority": 0
            },
            xiaoChouDeBaXi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return get.zhanJi(player.side).includes("baoShi");
                },
                content: async function(event,trigger,player) {
                    await player.changeZhanJi("baoShi",-1);
                    await player.changeZhanJi("shuiJing",1);
                    var duishou = await player.chooseTarget(1,'选择目标角色造成1点法术伤害',true).forResult();
                    var target = duishou.targets[0];
                    await target.faShuDamage(1,player);
                    await player.addGongJi();
                },
                "_priority": 0
            },
            wuTaiMoShuShi: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return get.zhanJi(player.side).includes("shuiJing") || get.zhanJi(!player.side).includes("shuiJing");
                },
                content: async function(event,trigger,player) {
                    var zhanJi=get.zhanJi(player.side).slice();
                    var zhanJi2=get.zhanJi(!player.side).slice();
                    var num=0;
                    var num2=0;
                    for(var xingShi of zhanJi){
                        if(xingShi == 'shuiJing') num++;
                    }
                    for(var xingShi of zhanJi2) {
                        if(xingShi == 'shuiJing') num2++;
                    }
                    if(num>0){
                        await player.changeZhanJi('shuiJing',-num,player.side);
                        await player.changeZhanJi('baoShi',num,player.side);
                    }
                    if(num2>0){
                        await player.changeZhanJi('shuiJing',-num2,!player.side);
                        await player.changeZhanJi('baoShi',num2,!player.side);
                    }
                    await player.chooseToDiscard("h",true,num+num2);
                },
                "_priority": 0
            },
            guiPai: {
                enable: "yingZhan",
                filter:function(event,player){
                    var event=event||_status.event;
                    // 可以应战
                    return event.canYingZhan && player.canBiShaShuiJing();
                },
                filterCard:function(card,player,event){
                    return true;
                },
                position:'h',
                discard: true,
                filterTarget:function(card,player,target){
                    var yingZhan_event=_status.event.getParent("_yingZhan");
                    // 只能应战敌方角色，且不能是本次攻击的来源
                    return player != target && player.side != target.side && target != yingZhan_event.source;
                },
                viewAs:function(cards,player){
                    if(cards.length==0) return;
                    const trigger = _status.event;
                    trigger.source = player;
                    return trigger.card;
                },
                group: "guiPai_xiaoGuo",
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'gongJiBefore'},
                        firstDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.skill=='guiPai';
                        },
                        content: async function(event,trigger,player) {
                            await player.removeBiShaShuiJing();
                            await player.changeZhanJi("baoShi",1,player.side);
                        },
                        "_priority": 1
                   }
                },
                "_priority": 1
            },
            xingChenShouHu: {
                trigger: {
                    player: "shouDaoShangHai"
                },
                filter: function(event,player) {
                    return player.hasCard(card => get.xiBie(card)=="shui");
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.xiBie(card)=="shui";
                    })
                    .set('prompt',get.prompt('xingChenShouHu'))
                    .set('prompt2',lib.translate.xingChenShouHu_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    if(event.cards){
                        await player.discard(event.cards).set("showCards",true);
                    }
                },
                "_priority": 0
            },
            mingYunDiaoKe: {
                type: "faShu",
                enable: "faShu",
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return player.side == target.side && player != target;
                },
                content: async function(event,trigger,player) {
                    if(event.target.countCards("h") >= 2) {
                        event.giveCard = await event.target.chooseCard('h',"将2张牌交给目标队友",true,2).forResult();
                        await event.target.give(event.giveCard.cards,player);
                    }else if(event.target.countCards("h") == 1) {
                        event.giveCard = await event.target.chooseCard('h',"将1张牌交给目标队友",true,1).forResult();
                        await event.target.give(event.giveCard.cards,player);
                    }
                    if(player.countCards("h") >= 2) {
                        event.lendCard = await player.chooseCard('h',"将2张牌交给目标队友",true,2).forResult();
                        const lendTarget = await player.chooseTarget(1,true,function(card,player,target){
                            return player.side == target.side && player != target;
                        }).forResult();
                        await player.give(event.lendCard.cards,lendTarget.targets[0]);
                    }else if(player.countCards("h") == 1){
                        event.lendCard = await player.chooseCard('h',"将1张牌交给目标队友",true,1).forResult();
                        const lendTarget = await player.chooseTarget(1,true,function(card,player,target){
                            return player.side == target.side && player != target;
                        }).forResult();
                        await player.give(event.lendCard.cards,lendTarget.targets[0]);
                    }
                    await player.changeZhanJi("baoShi", 1, player.side);
                },
                "_priority": 0
            },
            xingWenYongDong: {
                trigger: {
                    player: "faShuEnd"
                },
                filter: function(event,player) {
                    return player.canBiShaShuiJing();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    if(player.countCards("h")>0){
                        await player.chooseToDiscard("h",1,true);
                    }
                    await player.addFaShu();
                },
                "_priority": 0
            },
            anZhiWanGe: {
                enable:['gongJi','yingZhan'],
                filter:function(event,player){
                    var event=event||_status.event;
                    // 可以应战
                    if(event.name=='yingZhan') return event.canYingZhan && player.hasCard(card => get.xiBie(card)=="guang");
                    // 主动攻击
                    return player.hasCard(card => get.xiBie(card)=="guang");
                },
                filterCard:function(card,player,event){
                    return get.xiBie(card)=="guang";
                },
                position:'h',
                viewAs:function(cards,player){
                    if(cards.length==0) return;
                    var dict={name:"anMie",xiBie:"an"};
                    return dict;
                },
                "_priority": 0
            },
            zhenHunQu: {
                trigger: {
                    player: "gongJiMingZhong"
                },
                filter: function(event,player){
                    return !event.yingZhan && player.countCards('h', card => get.type(card) == 'faShu') > 0;
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[1,Infinity],function(card){
                        return get.type(card) == 'faShu';
                    })
                    .set('prompt',get.prompt('zhenHunQu'))
                    .set('prompt2',lib.translate.zhenHunQu_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.discard(event.cards).set("showCards",true);
                    await trigger.target.faShuDamage(event.cards.length,player);
                    await player.faShuDamage(event.cards.length,player);
                },
                "_priority": 0
            },
            eShaGuangMing: {
                trigger: {
                    player: "gongJiMingZhong"
                },
                filter: function(event,player){
                    return !event.yingZhan && player.countTongXiPai() >= 2 && player.canBiShaShuiJing();
                },
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,Infinity],function(card){
                        return get.xuanZeTongXiPai(card);
                    })
                    .set('prompt',get.prompt('eShaGuangMing'))
                    .set('prompt2',lib.translate.eShaGuangMing_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cards).set("showCards",true);
                    await trigger.changeDamageNum(event.cards.length);
                },
                "_priority": 2
            },
            xiSheng: {
                trigger: {
                    player: "phaseBegin"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    await player.draw(1);
                },
                "_priority": 2
            },
            shenShengHuWei: {
                trigger: {
                    global: "changeShiQiAfter"
                },
                forced: true,
                filter: function(event,player) {
                    if(event.getParent().name =="_heCheng_backup") return false;    // 过滤合杯导致的士气下降
                    if(event.cause != "damage") return false;   // 过滤非伤害导致的士气下降
                    if(event.side!=player.side) return false;    // 改变对方士气不发动
                    if(event.num>=0) return false;  // 增加士气不发动
                    return true;
                },
                content: async function(event,trigger,player) {
                    await trigger.player.changeZhiLiao(1,player);
                },
                "_priority": 0
            },
            shenShengBiHu: {
                trigger: {
                    player: "shouDaoShangHaiAfter"
                },
                forced: true,
                content: async function(event,trigger,player) {
                    await player.changeZhiLiao(1,player);
                },
                "_priority": 0
            },
            jueDiFanJi: {
                trigger: {
                    player: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    const targets = game.filterPlayer(p => p.side == player.side);
                    return player.canBiShaBaoShi() && !event.yingZhan && targets.some(p => p.zhiLiao > 0);
                },
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    // 移除我方所有治疗
                    let zhiLiaoSum = 0;
                    var targets = game.filterPlayer(p => p.side == player.side);
                    for (let target of targets) {
                        zhiLiaoSum += target.zhiLiao;
                        await target.changeZhiLiao(-target.zhiLiao,player);
                    }
                    await trigger.changeDamageNum(zhiLiaoSum + 1);
                },
                "_priority": 0
            },
            lingHunShouGe: {
                trigger: {
                    player: "gongJiEnd"
                },
                filter:function(event,player){
                    return !event.yingZhan && event.gongJiMingZhong && player.hasCard(card => get.xiBie(card)=="shui");
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard(1,'h', card => get.xiBie(card) == "shui")
                    .set('prompt',get.prompt('lingHunShouGe'))
                    .set('prompt2',lib.translate.lingHunShouGe_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player){
                    await player.discard(event.cards).set("showCards",true);
                    if(trigger.target.countNengLiangAll() > 0){
                        var choicelist=[`额外移除其1点能量`,'对其造成1点法术伤害'];
                        event.result = await player.chooseControl().set('choiceList',choicelist).set('prompt','灵魂收割：选择一项').set('ai',function(){
                            return 1;
                        }).forResult();
                    }
                    if(!event.result) {
                        await trigger.target.faShuDamage(1,player);
                    }else {
                        if(event.result.index==1){
                            await trigger.target.faShuDamage(1,player);
                        }else if(event.result.index==0){
                            // 统计对方能量情况
                            let list=[];
                            for(let i=0;i<trigger.target.countNengLiang('baoShi');i++){
                                list.push(['baoShi','宝石']);
                            }
                            for(let i=0;i<trigger.target.countNengLiang('shuiJing');i++){
                                list.push(['shuiJing','水晶']);
                            }
                            const result = await player.chooseButton(["额外移除其1点能量",[list,'tdnodes']])
                            .set('selectButton',1)
                            .set('forced',true)
                            .forResult();
                            await trigger.target.changeNengLiang(result.links[0],-1);
                        }
                    }
                },
                "_priority": 1
            },
            zhouShuJiDang: {
                trigger:{player:'faShuAfter'},
                content:function(){
                    player.addGongJi();
                },
                "_priority": 0
            },
            zhouFu: {
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.canBiShaShuiJing();
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.zhouFu.filterTarget('',player,current);
                    });
                    return bool1&&bool2
                },
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    event.target.storage.zhouFuSource=player;   // 存储咒缚来源对象
                    await event.target.addSkill('zhouFu_xiaoGuo');
					await event.target.addMark('zhouFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        priority:2,
                        trigger:{player:'phaseBefore'},
                        forced:true,
                        markimage:'image/card/zhuanShu/zhouFu.jpg',
                        intro:{
                            content: `[水晶]将【咒缚】放置于目标对手前，<span class='tiaoJian'>(拥有此卡的角色回合开始前)</span>他选择以下一项发动:<br>
                            跳过他的回合<br>
                            你对他造成3点法术伤害③，继续他的回合。<br>
                            触发后移除此卡。<br>
                            【咒缚】为咒术师的专属牌，上限为1。`,
                            nocount:true,
                        },
                        onremove:'storage',
                        filter:function(event,player){
                            return player.hasZhiShiWu('zhouFu_xiaoGuo');
                        },
                        content: async function(event,trigger,player){
                            var list=[`受到3点法术伤害`,'跳过本回合'];
                            var result = await player.chooseControl().set('choiceList',list).set('prompt','咒缚：选择一项').set('ai',function(){
                                var player=_status.event.player;
                                if(player.countCards('h') + 3 <= player.getHandcardLimit() + player.ZhiLiao){
                                    return 0;
                                }else{
                                    return 1;
                                }
                            }).forResult();
                            if(result.index==1){
                                await trigger.cancel();
                            }else if(result.index==0){
                                await player.faShuDamage(3,player.storage.zhouFuSource); 
                            }
                            delete player.storage.zhouFuSource;
                            await player.removeZhiShiWu('zhouFu_xiaoGuo');
                            await player.removeSkill('zhouFu_xiaoGuo');
                        },
                    }
                },
                ai:{
                    shuiJing: true,
					order:function(item,player){
						var num=game.filterPlayer(function(current){
							return current.side != player.side && current.countCards('h') + 3 > current.getHandcardLimit() + current.ZhiLiao;
						});
						if(num.length>=1){
							return 3.4;
						}else{
							return 3;
						}
					},
					basic:{
						useful:[4,1],
						value:[5,3,1],
					},
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					}
				},
                "_priority": 0
            },
            zhanZhengGeYao: {
                type: "faShu",
                enable: "faShu",
                selectTarget: 1,
                filterTarget: function(card,player,target) {
                    return player.side != target.side;
                },
                content: async function(event,trigger,player) {
                    await event.target.draw(1);
                    await player.draw(1);
                    var targets = game.filterPlayer(p => p != player && p.side == player.side);
                    for (let target of targets) {
                        await target.chooseToDiscard("h",1)
                        .set("prompt","战争歌谣：你可以选择弃1张牌")
                        .set('ai',function(){
                            return 1;
                        });
                    }
                },
                "_priority": 0
            },
            zhanYiGongMing: {
                trigger: {
                    source: "gongJiMingZhong"
                },
                filter: function(event,player) {
                    return !event.yingZhan && player.hasCard(card=> get.xiBie(card)==get.xiBie(event.card));
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard(1,'h', card => get.xiBie(card) == get.xiBie(trigger.card))
                    .set('prompt',get.prompt('zhanYiGongMing'))
                    .set('prompt2',lib.translate.zhanYiGongMing_info)
                    .set('complexCard',true)
                    .set('ai',function(card){
                            return 1;
                    }).forResult();
                },
                content: async function(event,trigger,player) {
                    await player.showCards(event.cards);
                    const result = await player.chooseTarget(1,'选择1名你的队友获得此同系牌',true,function(card,player,target){
                        return player.side == target.side && player != target;
                    }).forResult();
                    const target = result.targets[0];
                    await player.give(event.cards,target);
                    await player.changeZhanJi("baoShi",1);
                },
                "_priority": 0
            },
            xiWangZhiGe: {
                markimage:'image/card/zhuanShu/xiWangZhiGe.jpg',
                intro:{
                    name:'(专)希望之歌',
                    content: `
                        <span class="greentext">[响应]斗志激昂</span><br>
                        <span class='tiaoJian'>(拥有此卡的角色获得，攻击命中时②，移除此卡)</span>本次攻击伤害额外+2。<br>
                        <span class="greentext">[被动]坚毅不屈</span><br>
                        <span class='tiaoJian'>(拥有此卡的角色获得，回合结束时)</span>+1[治疗]。<br>
                    `,
                    nocount:true,
                },
                onremove:'storage',
                group:["xiWangZhiGe_douZhiJiAng","xiWangZhiGe_jianYiBuQu"],
                subSkill: {
                    douZhiJiAng: {
                        trigger: {
                            player: "gongJiMingZhong"
                        },
                        filter: function(event,player){
                            return player.hasZhiShiWu('xiWangZhiGe');
                        },
                        content: async function(event,trigger,player) {
                            await trigger.changeDamageNum(2);
                            // 移除希望之歌及其效果
                            await player.removeZhiShiWu('xiWangZhiGe');
                            await player.update();
                        },
                        "_priority": 1
                    },
                    jianYiBuQu: {
                        trigger: {
                            player: "phaseEnd"
                        },
                        forced: true,
                        filter: function(event,player){
                            return player.hasZhiShiWu('xiWangZhiGe');
                        },
                        content: async function(event,trigger,player) {
                            await player.changeZhiLiao(1);
                        },
                        "_priority": 1
                    }
                },
                "_priority": 0
            },
            yingXiongZhanGe: {
                type: "faShu",
                enable: "faShu",
                filter: function(event,player) {
                    return player.canBiShaBaoShi();
                },
                selectTarget: 1,
                filterTarget: true,
                content: async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    console.log(player.storage.xiWangZhiGe);
                    
                    // 先判断是否已经放置过希望之歌,回收
                    var players=game.filterPlayer((function(current){
                        return current.hasZhiShiWu('xiWangZhiGe');
                    }));
                    if(players.length > 0) {
                        await players[0].removeZhiShiWu('xiWangZhiGe');
                        await players[0].update();
                    }
                    if(!event.target.hasSkill('xiWangZhiGe')) {
                        await event.target.addSkill('xiWangZhiGe');
                    }
					await event.target.addZhiShiWu('xiWangZhiGe');
                    await event.target.update();
                    await player.addGongJi();
                },
                "_priority": 0
            }
        },
        translate: {
            youXia: "游侠",
            youXia_name: "温蒂",
            zhanXingJia: "占星家",
            zhanXingJia_name: "蒂雅",
            tianmaqishi: "天马骑士",
            tianmaqishi_name: "伊莎贝拉",
            shengtangcike: "圣堂刺客",
            shengtangcike_name: "残月",
            dasiji: "大司祭",
            dasiji_name: "罗格",
            lianjinshushi: "炼金术士",
            lianjinshushi_name: "陶",
            xuetianshi: "血天使",
            xuetianshi_name: "茜拉",
            xinlingsushi: "心灵塑师",
            xinlingsushi_name: "艾莉西娅",
            zhenLongNvWang: "真龙女王",
            zhenLongNvWang_name: "索菲亚",
            caijuezhe: "裁决者",
            caijuezhe_name: "路西菲尔",
            jianwuzhe: "剑舞者",
            jianwuzhe_name: "黛",
            shuangxuegongzhu: "霜雪公主",
            shuangxuegongzhu_name: "萨纹蕾缇",
            shouwangzhe: "守望者",
            shouwangzhe_name: "米莉塔",
            wudoujia: "武斗家",
            wudoujia_name: "孟克",
            fengbaozhizhengguan: "风暴执政官",
            fengbaozhizhengguan_name: "莱茵哈特",
            longzhiqiyuezhe: "龙之契约者",
            longzhiqiyuezhe_name: "洛萨",
            longqitongshuai: "龙骑统帅",
            longqitongshuai_name: "崔凡克",
            qumozhe: "驱魔者",
            qumozhe_name: "克里欧斯",
            longyuzhe: "龙语者",
            longyuzhe_name: "亚斯塔露",
            youhunfashi: "幽魂法师",
            youhunfashi_name: "维罗妮卡",
            dadiwushi: "大地武士",
            dadiwushi_name: "阿基特",
            beifangzhuzhe: "被放逐者",
            beifangzhuzhe_name: "阿帕蒂",
            xingwenshi: "星纹师",
            xingwenshi_name: "斯通",
            anzhiwangnv: "暗之王女",
            anzhiwangnv_name: "辛德蕾拉",
            huangjiashiwei: "皇家侍卫",
            huangjiashiwei_name: "贝拉维恩",
            zhoushushi: "咒术师",
            zhoushushi_name: "奈落",
            zhangejisi: "战歌祭司",
            zhangejisi_name: "法芙娜",


            zhuiFengJi: "[被动]追风技",
            "zhuiFengJi_info": "你的风系攻击无法应战。",
            zhuRiJian: "[法术]逐日箭",
            "zhuRiJian_info": "<span class='tiaoJian'>(弃一张火系牌[展示])</span>对目标对手造成2点法术伤害③。",
            lingDongZhiWu: "[响应]灵动之舞",
            "lingDongZhiWu_info": "[水晶]<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[法术行动]。",
            zhanPuWeiLai: "[被动]占卜未来",
            "zhanPuWeiLai_info": "回合开始时，翻开2张牌库顶的牌，将其面朝上放置在你的角色旁作为【预兆】。回合结束时移除所有【预兆】。",
            lieHuoFenShen: "[被动]烈焰焚身",
            "lieHuoFenShen_info": "你的主动攻击伤害额外+X(X为火系【预兆】数)。",
            hanBingHuTi: "[被动]寒冰护体",
            "hanBingHuTi_info": "<span class='tiaoJian'>(你获得一个水系【预兆】时)</span>目标角色+1【治疗】",
            leiTingZhiNu: "[被动]雷霆之怒",
            "leiTingZhiNu_info": "<span class='tiaoJian'>(你的回合结束前)</span>对目标角色造成X点法术伤害③(X为雷系、光系、暗系【预兆】的数之和)。",
            guangYingJiaoCuo: "[被动]光影交错",
            "guangYingJiaoCuo_info": "<span class='tiaoJian'>(你获得光系或者暗系【预兆】时)</span>额外翻开牌库顶1张牌，将其面朝上放置在你的角色旁作为【预兆】。",
            daYuYanShu: "[法术]大预言术",
            "daYuYanShu_info": "[宝石]翻开2张牌库顶的牌，将其面朝上放置在你的角色旁作为【预兆】。额外+1[攻击行动]或[法术行动]。",
            jianta: "[被动]践踏",
            "jianta_info": "你发动的所有攻击伤害额外+1。",
            zhuixing: "[响应]坠星",
            "zhuixing_info": "[水晶]<span class='tiaoJian'>(攻击前①)</span>本次攻击无法应战。",
            zhuiYingJi: "[响应]追影击",
            "zhuiYingJi_info": "[回合限定]<span class='tiaoJian'>(主动攻击结束后)</span>额外+1[攻击行动]，你的下次主动攻击只能攻击本回合主动攻击过的对手。",
            tiGu: "[响应]剔骨",
            "tiGu_info": "[回合限定][宝石]<span class='tiaoJian'>(攻击命中时②)</span>本次攻击伤害额外+2。",
            shengGuangShanYao: "[法术]圣光闪耀",
            "shengGuangShanYao_info": "<span class='tiaoJian'>(弃1张法术牌[展示])</span>任意分配3[治疗]给X名角色，X最高为3，最低为1。",
            jiuShu: "[法术]救赎",
            "jiuShu_info": "<span class='tiaoJian'>(摸1张牌[强制])</span>你和目标队友各+1[治疗]。",
            shenShengCaiJue: "[法术]神圣裁决",
            "shenShengCaiJue_info": `[水晶]你选择以下一项发动:<br>
            你和目标角色各弃2张牌<br>
            你和目标角色各摸2张牌[强制]<br>`,
            tanLanZhiXin: "[法术]贪婪之心",
            "tanLanZhiXin_info": "<span class='tiaoJian'>(弃2张同系牌[展示])</span>目标对手弃1张【暗灭】或【圣光】[展示];若其不如此做，则你对他造成2点法术伤害③。",
            wanWuYanMie: "[法术]万物湮灭",
            "wanWuYanMie_info": "[宝石]你对所有对手各造成2点法术伤害③。",
            lieDiMaiChong: "[法术]裂地脉冲",
            "lieDiMaiChong_info": "<span class='tiaoJian'>(弃1张雷系或地系牌[展示])</span>对目标对手造成1点法术伤害③。",
            lianLeiDiYu: "[法术]炼雷地狱",
            "lianLeiDiYu_info": "<span class='tiaoJian'>(弃2张雷系或地系牌[展示])</span>对目标对手造成2点法术伤害③。",
            shiXueZhiXin: "[响应]嗜血之心",
            "shiXueZhiXin_info": "[宝石]<span class='tiaoJian'>(对目标角色造成法术伤害③时)</span>本次法术伤害③额外+2。",
            huanXiangChongJi: "[响应]幻象冲击",
            "huanXiangChongJi_info": `<span class='tiaoJian'>(主动攻击前①,暗置三张牌)</span>攻击目标选择以下一项发动:<br>
            <span class='tiaoJian'>(不翻开暗置牌)</span>该攻击视为一次3点伤害的暗系攻击<br>
            <span class='tiaoJian'>(翻开暗置牌)</span>根据翻开暗置牌的结果，心灵塑师选择以下一项发动:<br>
            <span class='tiaoJian'>(若暗置牌为同系)</span>该攻击视为一次3点伤害的暗系攻击，目标队友+1[宝石]<br>
            <span class='tiaoJian'>(若暗置牌不为同系)</span>本次攻击无效且你对自己造成5点法术伤害③，攻击目标+1[治疗]。`,
            xinLingFengBao: "[法术]心灵风暴",
            "xinLingFengBao_info": `<span class='tiaoJian'>(暗置两张牌[强制])</span>目标对手选择以下一项发动:<br>
            <span class='tiaoJian'>(不翻开暗置牌)</span>心灵塑师对该对手造成1点法术伤害③，目标角色+1[治疗]<br>
            <span class='tiaoJian'>(翻开暗置牌)</span>根据翻开暗置牌的结果，心灵塑师选择以下一项发动:<br>
            <span class='tiaoJian'>(若暗置牌均为法术牌)</span>心灵塑师对该对手造成2点法术伤害③，分配2[治疗]给X名角色，X最高为2，最低为1<br>
            <span class='tiaoJian'>(若暗置牌不均为法术牌)</span>本次法术无效且你对自己造成5点法术伤害③，对方【战绩区】+1[宝石]。`,
            zhenShiHuanJue: "[响应]真实幻觉",
            "zhenShiHuanJue_info": "[回合限定]<span class='tiaoJian'>([攻击行动]或[法术行动]结束时,若你因【幻象冲击】或【心灵风暴】对自己造成法术伤害③)</span>额外+1[攻击行动]或[法术行动]。",
            gaiBianShiJie: "[响应]改变世界",
            "gaiBianShiJie_info": `[水晶]选择以下一项发动:<br>
            <span class='tiaoJian'>(发动【幻象冲击】时攻击目标选择“不翻开暗置牌”)</span>改为他选择“翻开暗置牌”且你选择“若暗置牌为同系”这一效果执行<br>
            <span class='tiaoJian'>(发动【心灵风暴】时该对手选择“不翻开暗置牌”)</span>改为他选择“翻开暗置牌”且你选择“若暗置牌均为法术牌”这一效果执行。`,
            yuanGuJinZhi: "[被动]远古禁制",
            "yuanGuJinZhi_info": "游戏初始时,你拥有<span class='greentext'>【龙语封印】</span>,<span class='greentext'>【驭龙结界】</span>,<span class='greentext'>【龙狂迷锁】</span>,<span class='greentext'>【龙脉束缚】</span>4种<span class='hong'>【禁制】</span>。",
            zhenLongJueXing: "[被动]真龙觉醒",
            "zhenLongJueXing_info": "<span class='tiaoJian'>(我方士气下降或场上有【星杯】合成时)</span>翻转任意1张<span class='hong'>【禁制】</span>牌。<span class='tiaoJian'>(你的回合结束时)</span>重新翻回所有<span class='hong'>【禁制】</span>牌。",
            longHunShouHu: "[被动]龙魂守护",
            "longHunShouHu_info": "<span class='tiaoJian'>([法术行动]结束后)</span>你+1[治疗]。",
            longShenEnHui: "(专)[被动]龙神恩惠",
            longShenEnHui_xiaoGuo: "龙神恩惠",
            "longShenEnHui_info": "<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[法术行动]。<span class='greentext'>【龙语封印】</span>存在时不能发动该技能。",
            longWangZhiLi: "(专)[响应]龙王之力",
            longWangZhiLi_xiaoGuo: "龙王之力",
            "longWangZhiLi_info": "<span class='tiaoJian'>(攻击命中时②,弃X张异系牌[展示])</span>本次攻击伤害额外+X。<span class='greentext'>【龙脉束缚】</span>存在时不能发动该技能。",
            shengLongWeiYa: "(专)[被动]圣龙威压",
            shengLongWeiYa_xiaoGuo: "圣龙威压",
            "shengLongWeiYa_info": "你的攻击无法应战，你也不能执行应战攻击。<span class='greentext'>【驭龙结界】</span>存在时不能发动该技能。",
            baiWanLongYan: "(专)[法术]百万龙炎",
            baiWanLongYan_xiaoGuo: "百万龙炎",
            "baiWanLongYan_info": "<span class='tiaoJian'>(摸X张牌[强制]，X最高为2，最低为0，然后弃Y张同系牌[展示])</span>对自己和目标角色各造成Y点法术伤害③。<span class='greentext'>【龙狂迷锁】</span>存在时不能发动该技能。",
            longZuFuXing: "[响应]龙族复兴",
            "longZuFuXing_info": "[回合限定][宝石]<span class='tiaoJian'>(回合结束时翻回任一<span class='hong'>【禁制】</span>时发动)</span>该<span class='hong'>【禁制】</span>永久翻转。",
            longKuangMiSuo: "龙狂迷锁",
            longMaiShuFu: "龙脉束缚",
            longYuFengYin: "龙语封印",
            yuLongJieJie: "驭龙结界",
            zhengYiZhuiJi: "[被动]正义追击",
            "zhengYiZhuiJi_info": "<span class='tiaoJian'>(你的回合结束时，若本回合对方士气下降)</span>你额外获得一个回合。",
            caiJueZhiXin: "[被动]裁决之心",
            "caiJueZhiXin_info": "游戏初始时，你+2[水晶]；你执行【合成】时我方[星杯区]不会增加[星杯]。",
            zhenLiCaiJue: "[被动]真理裁决",
            "zhenLiCaiJue_info": "你造成的所有伤害只能被最多1点[治疗]抵御。",
            songZhongDaoFeng: "[响应]送终刀锋",
            "songZhongDaoFeng_info": `[水晶]<span class='tiaoJian'>(主动攻击前①)</span>选择以下一项发动:<br>
            <span class='tiaoJian'>(若你的手牌数小于攻击目标的手牌数)</span>本次攻击伤害额外+1;<br>
            <span class='tiaoJian'>(若你的手牌数大于攻击目标的手牌数)</span>本次攻击无法应战;<br>
            <span class='tiaoJian'>(若你的手牌数等于攻击目标的手牌数)</span>本次攻击伤害额外+1且无法应战。`,
            wuJinZhiRen: "[法术]无尽之刃",
            "wuJinZhiRen_info": "[水晶]<span class='tiaoJian'>(弃2张法术牌或3张同系牌[展示])</span>对目标角色和自己各造成2点法术伤害③。",
            weiJianErSheng: "[响应]为剑而生",
            "weiJianErSheng_info": "<span class='tiaoJian'>(主动攻击未命中时②,弃X张法术牌[展示])</span>对攻击目标以外的目标角色造成X点法术伤害③。",
            duiJianErShi: "[响应]对剑而誓",
            "duiJianErShi_info": "<span class='tiaoJian'>(主动攻击命中时②,弃X张同系牌[展示])</span>对攻击目标以外的目标角色造成X点法术伤害③。",
            jianWuYiShi: "[法术]剑舞仪式",
            "jianWuYiShi_info": "[宝石][横置]直到你的回合结束前,你的手牌上限+3;摸3张牌[强制];额外+1[攻击行动]。【剑舞仪式】的效果结束时[重置]。",
            bingShuangLingYu: "[被动]冰霜领域",
            "bingShuangLingYu_info": "你的[治疗]上限+1;游戏开始时本方所有角色+1治疗。",
            shuiJingDaoQiang: "[响应]水晶刀墙",
            "shuiJingDaoQiang_info": "<span class='tiaoJian'>(主动攻击命中后②，移除你的X[治疗])</span>对攻击的角色造成额外X点法术伤害。",
            lingFengZhuFu: "[被动]凛风祝福",
            "lingFengZhuFu_info": `<span class='tiaoJian'>(攻击未命中时②,若攻击为风系或水系)</span>选择以下一项发动:<br>
            <span class='tiaoJian'>(目标角色拥有[治疗]时)</span>他+1[治疗]<br>
            <span class='tiaoJian'>(目标角色无[治疗]时)</span>他+2[治疗]。`,
            shuangYuZhiHuan: "[法术]霜语之环",
            "shuangYuZhiHuan_info": "[水晶]我方所有没有[治疗]的角色各+2[治疗]。额外+1[攻击行动]或[法术行动]。",
            huJiaoZhiXin: "[响应]护教之心",
            "huJiaoZhiXin_info": "<span class='tiaoJian'>(主动攻击命中时②)</span>你+1[治疗]。",
            wuJinZhuiJi: "[响应]无尽追击",
            "wuJinZhuiJi_info": "<span class='tiaoJian'>([攻击行动]结束后,移除你的1[治疗])</span>额外+1[攻击行动]。",
            jingZhunJuJi: "[响应]精准射击",
            "jingZhunJuJi_info": "[水晶]<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动],你的下次主动攻击无法应战。",
            zhiYueZhiHuan: "[响应]制约之环",
            "zhiYueZhiHuan_info": "<span class='tiaoJian'>(攻击时①,弃2张同系牌[展示])</span>若本次攻击未命中②,你对自己造成4点法术伤害③",
            sheShenZhiDao: "[响应]舍身之道",
            "sheShenZhiDao_info": "<span class='tiaoJian'>(主动攻击命中时②,摸X张牌[强制],X最高为4,最低为2)</span>本次攻击伤害额外+(X-1)。",
            jianRenZhiZhi: "[响应]坚忍之志",
            "jianRenZhiZhi_info": "[宝石]<span class='tiaoJian'>(受到法术伤害③时)</span>本次法术伤害③数值为0。",
            baoFengLingYu: "[被动]暴风领域",
            "baoFengLingYu_info": "你的雷系攻击和风系攻击的攻击伤害额外+1。",
            yiZheng: "[法术]议政",
            "yiZheng_info": "你选择以下一项发动：<br>将1张牌交给目标队友,你额外+1[攻击行动]<br>目标队友给你1张牌,你额外+1[攻击行动]。",
            jiFengZhouYu: "[响应]疾风骤雨",
            "jiFengZhouYu_info":"[水晶]<span class='tiaoJian'>([攻击行动]结束时)</span>额外+1[攻击行动]。",
            juLongZhiLi: "[被动]巨龙之力",
            "juLongZhiLi_info": "<span class='tiaoJian'>(主动攻击时①)</span>你的主动攻击伤害为你的手牌数+1。",
            longZuZunYan: "[被动]龙族尊严",
            "longZuZunYan_info": "<span class='tiaoJian'>(仅【普通形态】下)</span>你不能主动攻击手牌大于你的角色。",
            longXueQinYe: "[法术]龙血倾曳",
            "longXueQinYe_info": "<span class='tiaoJian'>(摸1张牌[强制])</span>对目标角色造成1点法术伤害③。",
            longXueZhuoShao: "[法术]龙血灼烧",
            "longXueZhuoShao_info": "<span class='tiaoJian'>(摸3张牌[强制])</span>对目标角色造成2点法术伤害③;<span class='tiaoJian'>(若你处于【化龙形态】)</span>额外+1[攻击行动]。",
            xingHongBaiLongBa: "[响应]猩红百龙霸",
            "xingHongBaiLongBa_info": "[宝石]<span class='tiaoJian'>(回合开始时)</span>[横置]转为【化龙形态】。此形态下你只能执行[攻击行动];否则回合结束时[重置]脱离【化龙形态】。",
            xiaoTianLongQiang: "[响应]啸天龙枪",
            "xiaoTianLongQiang_info":"<span class='tiaoJian'>(主动攻击未命中时②,弃1张攻击牌[展示])</span>对攻击目标和自己各造成2点法术伤害③;<span class='tiaoJian'>(若你额外弃1张法术牌[展示])</span>本次对攻击目标的法术伤害③额外+1。",
            juLongBenTeng: "[法术]巨龙奔腾",
            "juLongBenTeng_info": "[水晶]我方目标角色和目标对手的手牌数目调整至5[强制]，额外+1[攻击行动]或[法术行动]",
            xieMoXiaoSan: "[法术]邪魔消散",
            "xieMoXiaoSan_info": "<span class='tiaoJian'>(弃1张风系或水系牌[展示])</span>移除场上1个基础效果或1[治疗],对目标对手造成2点法术伤害③。",
            jingHuaDaDi: "[法术]净化大地",
            "jingHuaDaDi_info": "<span class='tiaoJian'>(弃1张地系牌[展示])</span>对所有对手各造成1点法术伤害③，所有队友各+1[治疗]。",
            yuanSuChongSheng: "[法术]元素重生",
            "yuanSuChongSheng_info": "[回合限定][水晶]弃3张牌，摸3张牌[强制]，额外获得1个[法术行动]。",
            longZuZhenYan: "[响应]龙族真言",
            "longZuZhenYan_info": "[回合限定]<span class='tiaoJian'>([攻击行动]结束时)</span>额外+1[攻击行动]。你的下次主动攻击无法主动攻击和应战攻击本回合攻击过的对手。",
            shangGuMiYu: "[被动]上古秘语",
            "shangGuMiYu_info": "<span class='tiaoJian'>(主动攻击时①)</span>若本回合你已造成过法术伤害③，本次攻击无法应战。若本回合你已造成过攻击伤害，本次攻击伤害额外+1。",
            longHunNingShi: "[响应]龙魂凝视",
            "longHunNingShi_info": "<span class='tiaoJian'>(主动攻击前①，移除我方【战绩区】1星石)</span>若本次攻击命中②，攻击目标造成1点法术伤害③",
            zhaiBian: "[法术]灾变",
            "zhaiBian_info": "<span class='tiaoJian'>(弃1张地系牌[展示])</span>对所有对手各造成1点法术伤害③。",
            mingHuo: "[法术]冥火",
            "mingHuo_info": "<span class='tiaoJian'>(弃1张火系牌[展示])</span>对目标角色造成2点法术伤害③。",
            fuShi: "[响应]腐蚀",
            "fuShi_info": "<span class='tiaoJian'>(目标角色对你造成伤害③时，弃1张水系牌[展示])</span>对目标角色造成1点法术伤害③。",
            youHunFenShen: "[响应]幽魂分身",
            "youHunFenShen_info": `[回合限定][宝石]你选择以下一项发动:<br>
            <span class='tiaoJian'>(【灾变】结算完成后，弃1张地系牌[展示])</span>对所有对手各造成1点法术伤害③<br>
            <span class='tiaoJian'>(【冥火】结算完成后，弃1张火系牌[展示])</span>对目标角色造成2点法术伤害③<br>
            <span class='tiaoJian'>(【腐蚀】结算完成后，弃1张水系牌[展示])</span>对目标角色造成1点法术伤害③。`,
            diMaiZhiLi: "[被动]地脉之力",
            "diMaiZhiLi_info": "你的地系攻击和暗系攻击的伤害额外+1",
            poXieZhan: "[响应]破邪斩",
            "poXieZhan_info": `<span class='tiaoJian'>(主动攻击时①)</span>你选择以下一项发动:<br>
            <span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次地系主动攻击。<br>
            <span class='tiaoJian'>(弃3张同系牌[展示])</span>视为一次暗系的主动攻击。`,
            shengShengBuXi: "[法术]生生不息",
            "shengShengBuXi_info": "<span class='tiaoJian'>(弃1张牌[强制])</span>摸2张牌[强制]，额外获得1个[攻击行动]。本回合你不能发动【破邪斩】。",
            gaiYaHuaShen: "[响应]盖亚化身",
            "gaiYaHuaShen_info": "[宝石]<span class='tiaoJian'>(回合结束时)</span>[横置]转为【盖亚化身】形态。此形态下，你所有的不为专属手牌的基础牌都可以视为地裂斩，你发动的所有攻击伤害额外+1。<span class='tiaoJian'>(目标角色对你造成攻击伤害时③)</span>[重置]脱离【盖亚化身】形态。",
            xiaoChouDeBaXi: "[法术]小丑的把戏",
            "xiaoChouDeBaXi_info": "<span class='tiaoJian'>(将我方【战绩区】1颗[宝石]转换成[水晶])</span>对目标角色造成1点法术伤害，你额外获得1个[攻击行动]。",
            wuTaiMoShuShi: "[法术]舞台魔术师",
            "wuTaiMoShuShi_info": "<span class='tiaoJian'>(将双方【战绩区】所有[水晶]转换成[宝石])</span>你弃X张牌，X为以此法转换的[水晶]数。",
            guiPai: "[响应]鬼牌",
            "guiPai_info": "[水晶]<span class='tiaoJian'>(应战攻击时①，弃1张牌[强制])</span>视为应战此次攻击且系别不变，我方【战绩区】+1[宝石]",
            gaiYaHuaShen_mods: "[响应]盖亚化身-地裂斩",
            "gaiYaHuaShen_mods_info": "【盖亚化身】形态下，你所有的不为专属手牌的基础牌都可以视为地裂斩。",
            xingChenShouHu: "[响应]星辰守护",
            "xingChenShouHu_info": "<span class='tiaoJian'>(目标角色对你造成伤害③时)</span>弃X张水系牌[展示]。",
            mingYunDiaoKe: "[法术]命运雕刻",
            "mingYunDiaoKe_info": "目标队友给你2张牌，之后你给任意队友2张牌。我方【战绩区】+1[宝石]。",
            xingWenYongDong: "[响应]星纹涌动",
            "xingWenYongDong_info": "[水晶]<span class='tiaoJian'>([法术行动]结束时)</span>弃1张牌[强制]，额外+1[法术行动]。",
            anZhiWanGe: "[响应]暗之挽歌",
            "anZhiWanGe_info": "你的【圣光】可视为【暗灭】。",
            zhenHunQu: "[响应]镇魂曲",
            "zhenHunQu_info": "<span class='tiaoJian'>([攻击行动]结束时，若此次主动攻击命中②，弃X张法术牌[展示])</span>对攻击目标和你各造成X点法术伤害③。",
            eShaGuangMing: "[响应]扼杀光明",
            "eShaGuangMing_info": "[水晶]<span class='tiaoJian'>(主动攻击命中②，弃X张同系牌[展示])</span>本次攻击伤害额外+X。",
            xiSheng: "[被动]牺牲",
            "xiSheng_info": "<span class='tiaoJian'>(你的回合开始时)</span>你摸1张牌[强制]。",
            shenShengHuWei: "[被动]神圣护卫",
            "shenShengHuWei_info": "<span class='tiaoJian'>(我方角色因承受伤害⑥而造成士气下降时)</span>他+1[治疗]。",
            shenShengBiHu: "[被动]神圣庇护",
            "shenShengBiHu_info": "<span class='tiaoJian'>(目标角色对你造成伤害③时)</span>伤害结算完成时你+1[治疗]。",
            jueDiFanJi: "[响应]绝地反击",
            "jueDiFanJi_info": "[宝石]<span class='tiaoJian'>(主动攻击命中时②)</span>移除我方所有[治疗];本次攻击伤害额外+(X+1),X为移除的[治疗]数目。",
            lingHunShouGe: "[响应]灵魂收割",
            "lingHunShouGe_info": `<span class='tiaoJian'>([攻击行动]结束时，若此次主动攻击命中②，弃1张水系牌[展示])</span>你选择以下一项发动:<br>
            移除攻击目标【能量区】的1【能量】<br>
            对攻击目标造成1点法术伤害③`,
            zhouShuJiDang: "[响应]咒术激荡",
            "zhouShuJiDang_info": "<span class='tiaoJian'>([法术行动]结束后)</span>额外+1[攻击行动]。",
            zhouFu: "[法术]咒缚",
            "zhouFu_info": `[水晶]将【咒缚】放置于目标对手前，<span class='tiaoJian'>(拥有此卡的角色回合开始前)</span>他选择以下一项发动:<br>
            跳过他的回合<br>
            你对他造成3点法术伤害③，继续他的回合。<br>
            触发后移除此卡。<br>
            【咒缚】为咒术师的专属牌，上限为1。`,
            zhanZhengGeYao: "[法术]战争歌谣",
            "zhanZhengGeYao_info": "你和目标对手各摸1张牌[强制]，你的队友各可以选择弃1张牌。",
            zhanYiGongMing: "[响应]战意共鸣",
            "zhanYiGongMing_info": "<span class='tiaoJian'>(主动攻击命中后②，弃1张与该攻击牌同系的牌[展示])</span>目标队友获得此弃牌，我方【战绩区】额外+1[宝石]。",
            xiWangZhiGe: "(专)希望之歌",
            "xiWangZhiGe_info": `
            <span class="greentext">[响应]斗志激昂</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得，攻击命中时②，移除此卡)</span>本次攻击伤害额外+2。<br>
            <span class="greentext">[被动]坚毅不屈</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得，回合结束时)</span>+1[治疗]。<br>
            【希望之歌】为战歌祭司的专属卡，上限为1。`,
            yingXiongZhanGe: "[法术]英雄战歌",
            "yingXiongZhanGe_info": "[宝石]将【希望之歌】放置在目标角色面前，额外+1[攻击行动]。"
        },
    }
});
