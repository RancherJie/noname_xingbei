import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shiZhouNian',
		connect:true,
        characterSort:{
            shiZhouNian:{
                "3xing":['fengZhiJianSheng','kuangZhanShi','shenJianShou','fengYinShi','anShaZhe','shengNv','tianShi','moFaShaoNv'],
                "3.5xing":['moJianShi','shengQiangQiShi','yuanSuShi','maoXianJia','wenYiFaShi','zhongCaiZhe','jingLingSheShou','nvWuShen'],
                "4xing":['shenGuan','yingLingRenXing','yinYangShi','moGong','xianZhe','lingFuShi','cangYanMoNv','moQiang','xueSeJianLing','qiDaoShi','hongLianQiShi'],
                "4.5xing":['lingHunShuShi','yongZhe','yinYouShiRen','geDouJia','shengGong','shouLingWuShi',"jianDi"],
                "5xing":["yueZhiNvShen",'xueZhiWuNv','dieWuZhe'],
            }
        },
		character:{
			fengZhiJianSheng:['fengZhiJianSheng_name','jiGroup',3,['fengNuZhuiJi','shengJian','lieFengJi','jiFengJi','jianYing'],],
            kuangZhanShi:['kuangZhanShi_name','xueGroup',3,['kuangHua','xueYingKuangDao','xueXingPaoXiao','siLie'],],
            shenJianShou:['shenJianShou_name','jiGroup',3,['shanDianJian','guanChuanSheJi','shanGuangXianJing','jingZhunSheJi','juJi'],],
            fengYinShi:['fengYinShi_name','huanGroup',3,['faShuJiDang','diZhiFengYin','shuiZhiFengYin','huoZhiFengYin','fengZhiFengYin','leiZhiFengYin','wuXiShuFu','fengYinPoSui'],],
            anShaZhe:['anShaZhe_name','jiGroup',3,['fanShi','shuiYing','qianXing'],],
            shengNv:['shengNv_name','shengGroup',3,['bingShuangDaoYan','zhiLiaoShu','zhiYuZhiGuang','lianMin','shengLiao'],],
            tianShi:['tianShi_name','shengGroup',3,['fengZhiJieJing','tianShiZhuFu','tianShiJiBan','tianShiZhiQiang','tianShiZhiGe','shenZhiBiHu'],],
            moFaShaoNv:['moFaShaoNv_name','yongGroup',3,['moBaoChongJi','moDanZhangWo','moDanRongHe','huiMieFengBao'],],
            moJianShi:['moJianShi_name','huanGroup','3/4',['xiuLuoLianZhan','anYingNingJu','anYingZhiLi','anYingKangJu','anYingLiuXing','huanQuanZhengChan'],],
            shengQiangQiShi:['shengQiangQiShi_name','shengGroup','3/4',['shenShengXinYang','huiYao','chengJie','shengJi','tianQiang','diQiang','shengGuangQiYu'],],
            yuanSuShi:['yuanSuShi_name','yongGroup','3/4',['yuanSuXiShou','yuanSuDianRan','yunShi','bingDong','huoQou','fengRen','leiJi','yueGuang','yuanSu'],],
            maoXianJia:['maoXianJia_name','huanGroup','3/4',['qiZha','qiangYun','diXiaFaZe','maoXianJiaTianTang','touTianHuanRi'],],
            wenYiFaShi:['wenYiFaShi_name','huanGroup','3/4',['buXiu','shengDu','wenYi','siWangZhiChu','juDuXinXing'],],
            zhongCaiZhe:['zhongCaiZhe_name','xueGroup','3/4',['zhongCaiFaZe','yiShiZhongDuan','moRiShenPan','shenPanLangChao','zhongCaiYiShi','panJueTianPing','shenPan'],],
            shenGuan:['shenGuan_name','shengGroup',4,['shenShengQiShi','shenShengQiFu','shuiZhiShenLi','shengShiShouHu','shenShengQiYue','shenShengLingYu'],],
            qiDaoShi:['qiDaoShi_name','yongGroup',4,['guangHuiXinYang','heiAnZuZhou','weiLiCiFu','xunJieCiFu','qiDao','faLiChaoXi','qiDaoFuWen'],],
            xianZhe:['xianZhe_name','yongGroup',4,['zhiHuiFaDian','faShuFanTan','moDaoFaDian','shengJieFaDian'],],
            lingFuShi:['lingFuShi_name','yongGroup',4,['lingFu_leiMing','lingFu_fengXing','nianZhou','baiGuiYeXing','lingLiBengJie','yaoLi'],],
            jianDi:['jianDi_name','jiGroup','4/5',['jianHunShouHu','yangGong','jianQiZhan','tianShiZhiHun','eMoZhiHun','buQuYiZhi','jianHun','jianQi'],],
            geDouJia:['geDouJia_name','jiGroup','4/5',['nianQiLiChang','xuLiYiji','nianDan','baiShiHuanLongQuan','qiJueBengJi','douShenTianQu','douQi'],],
            yongZhe:['yongZhe_name','xueGroup','4/5',['yongZheZhiXin','nuHou','jinPiLiJin','mingJingZhiShui','tiaoXin','jinDuanZhiLi','siDou','nuQi','zhiXing'],],
            lingHunShuShi:['lingHunShuShi_name','huanGroup','4/5',["lingHunTunShi","lingHunZhaoHuan",'lingHunZhuanHuan',"lingHunJingXiang","lingHunZhenBao","lingHunFuYu","lingHunLianJie","lingHunZengFu","huangSeLingHun","lanSeLingHun"],],
            xueZhiWuNv:['xueZhiWuNv_name','xueGroup',5,['xueZhiAiShang','liuXue','niLiu','xueZhiBeiMing','tongShengGongSi','xueZhiZuZhou'],],
            dieWuZhe:['dieWuZhe_name','yongGroup',5,['shengMingZhiHuo','wuDong','duFen','chaoSheng','jingHuaShuiYue','diaoLing','yongHua','daoNiZhiDie','jian','DWZyong'],],
            nvWuShen:['nvWuShen_name','shengGroup','3/4',['shenShengZhuiJi','zhiXuZhiYin','hePingXingZhe','junShenWeiGuan','yingLingZhaoHuan'],],
            moGong:['moGong_name','huanGroup',4,['moGuanChongJi','leiGuangSanShe','duoChongSheJi','chongNeng','moYan','chongNengPai'],],
            hongLianQiShi:['hongLianQiShi_name','xueGroup',4,['xingHongShengYue','xingHongXinYang','xueXingDaoYan','shaLuShengYan','reXueFeiTeng','jieJiaoJieZao','xingHongShiZi','xueYin'],],
            yingLingRenXing:['yingLingRenXing_name','yongGroup',4,['zhanWenZhangWo','nuHuoYaZhi','zhanWenSuiJi','moWenRongHe','fuWenGaiZao','shuangChongHuiXiang','zhanWen','moWen'],],
            moQiang:['moQiang_name','huanGroup',4,['anZhiJieFang','huanYingXingChen','heiAnShuFu','anZhiZhangBi','chongYing','qiHeiZhiQiang'],],
            cangYanMoNv:['cangYanMoNv_name','xueGroup',4,['cangYanFaDian','tianHuoDuanKong','moNvZhiNu','tiShenWanOu','yongShengYinShiJi','tongKuLianJie','moNengFanZhuan','chongSheng'],],
            yinYouShiRen:['yinYouShiRen_name','huanGroup','4/5',['chenLunXieZouQu','buXieHeXian','jinJiShiPian','yongHengYueZhangX','xiWangFuGeQu','lingGan'],],
            jingLingSheShou:['jingLingSheShou_name','jiGroup','3/4',['yuanSuSheJi','dongWuHuoBan','jingLingMiYi','chongWuQiangHua','zhuFu'],],
            yinYangShi:['yinYangShi_name','huanGroup',4,['shiShenJiangLin','yinYangZhanHuan','shiShenZhuanHuan','heiAnJiLi','shiShenZhouShu','shengMingJieJie','guiHuo'],],
            xueSeJianLing:['xueSeJianLing_name','xueGroup',4,['xueSeJingJi','chiSeYiShan','xueRanQiangWei','xueQiPingZhang','xueQiangWeiTingYuan','sanHuaLunWu','xianXue'],],
            yueZhiNvShen:['yueZhiNvShen_name','shengGroup',5,['xinYueBiHu','anYueZuZhou','meiDuShaZhiYan','yueZhiLunHui','yueDu','anYueZhan','cangBaiZhiYue','xinYue','shiHua','anYue'],],
            shouLingWuShi:['shouLingWuShi_name','jiGroup','4/5',['wuZheCanXin','yiJiWuNian','shouHunYiNian','shouHunJingJie','shouFan','yuHunLiuJuHeXingTai','niFanJuHeZhan','yuHunLiuJuHeShi','shouHun','canXin'],],
            shengGong:['shengGong_name','shengGroup','4/5',['tianZhiGong','shengXieJuBao','shengHuangJiangLin','shengGuangBaoLie','liuXingShengDan','shengHuangHuiGuangPao','ziDongTianChong','xinYang','shengHuangHuiGuangPaoX'],],

		},

        characterIntro: {
			fengZhiJianSheng:"风之剑圣有着极高的攻击频率，一旦得到了风的强力赐福，更可以让他打出无数绚丽的连击和伤害。再加上其本身拥有的“圣剑”，在伤害输出上不容小觑，更是团队【宝石】获得的得力助手",
            kuangZhanShi:"狂战士毋庸置疑的拥有本作最强大的物理攻击输出能力，特别是对于防御力弱和拥有治疗的角色更是能制造出绝对的碾压和毁灭伤害。其唯一的弱点就是命中率，因此由队友掩护攻击或攻击防御薄弱的角色是狂战取胜之道",
            shenJianShou:"其精准的射击总是能令对手防不胜防。作为本作命中数一数二的职业，神箭手往往是团队攻击链最后致命一击的缔造者。她的必杀技更是控场神技，总是能令对方的如意算盘全部落空",
            fengYinShi:"封印师是唯一一个能将法术和攻击如此完美结合在一起的职业，再加上她强有力的五种封印和“五系束缚”，相信所有与她敌对的角色都会痛苦不堪",
            anShaZhe:"没有人会去主动惹暗杀者的麻烦，因为他的反击总是会让你后悔刚才做出的决定；也没有人会把他当做一个默默无闻的路人甲，因为当他亮出匕首的时候，你就再也无法闪躲了",
            shengNv:`外表弱小的圣女有着极强的防御和治疗能力。在她的保护下，很多需要厚积薄发的职业能得到全面的呵护成长，更是许多爆发性职业的全职奶妈`,
            tianShi:`守护天使的治疗能力虽不是圣类职业中最强的，但是她对于团队的辅助作用却是全职业中效果最为显著的。“天使之墙”和“风之洁净”能大大的提高团队的防御能力，而在其强大的必杀技“神之庇护”面前，法术系职业往往无可奈何`,
            moFaShaoNv:`小范围的区域伤害是魔法少女的特长，她更可以把魔弹随意的使用和施放。在积累了一定的能量之后，强大的“毁灭风暴”更是可以让所有对手都品尝到何为魔法的洗礼和冲击`,
            moJianShi:"借助暗影之力的魔剑士，既无法使用法术，更是会受到黑暗的侵蚀。但这种双刃剑施放在对手身上的时候，又是无比的震撼和爽快，在烈火永生的黄泉面前，生与死只在一念之间",
            shengQiangQiShi:`治疗对于圣枪骑士而言，既是优秀的防御源泉，也是攻击的伤害利器。强大的圣枪骑士总是能运用场上的所有治疗为她所用，狠狠地发泄到她的对手身上。她的天枪和地枪总是让每个对手都胆战心惊`,
            yuanSuShi:`元素师对于元素有着近乎疯狂的挚爱，他能从每种元素中提炼出独特的能力并加以使用，在积累一定的元素能量后还能额外释放出强大的追加效果`,
            maoXianJia:"在这样一个危险的大陆还敢冒险的人一定具备着以下三种素质：近乎难以置信的运气、让大家都有利可图的能力、遇到危险时跑的足够快",
            wenYiFaShi:"拥有者不死之躯的瘟疫法师对于法术有着近乎免疫的强大抵抗能力，对人类意味着重生和保护的治疗能在瘟疫法师的手里转变为死亡和毁灭的邪恶力量",
            zhongCaiZhe:"以眼还眼以牙还牙，仲裁者会把所有对她造成的伤害转化为强大的审判力量，通过末日审判来裁决这一切。每一个她的敌人都设法逃脱，但审判终将到来",
            shenGuan:"神官作为一个拥有坚定信念的神职人员拥有者几乎可以让人起死回生的强大复生能力。在其坚定的神圣信仰下，她的敌人都终将被消灭而她的队友一个都不会倒下",
            qiDaoShi:"祈祷师能激发出她队友内心强大的力量和惊人的速度。此外，在她的祈祷之下，连光明与黑暗的力量都将为她所用",
            xianZhe:`睿智博学的贤者拥有能改变命运的三本魔法法典：智慧、圣洁和魔道。每一本都积攒着前人对奥术能量的深厚研究，而贤者是唯一一个能够完全利用它们的人`,
            lingFuShi:"风与雷之中总是蕴含着能被灵符师利用的强大能量，甚至是在灵符使用完毕之后还能抽取其中的妖力为自己所用，在特定的情形下再度爆发",
            jianDi:`传说中剑帝有一把可以相互转化的符文剑：在帮助善良人的时候它会透出圣洁的光芒；而在斩杀恶魔时，那把剑会散发出比恶魔更邪恶的力量来`,
            geDouJia:`格斗家天生的念气体魄让其拥有足以击碎岩石的巨大力量，但其唯一的弱点就是需要积攒的时间和落空时对自己巨大的反噬伤害，不过幸好她还有强大的念气力场来保护自己`,
            yongZhe:"怒气与知性这一对仿佛不可调和的矛盾却在勇者身上被炼化为一致。拥有怒气时的超强爆发与使用知性时的百发百中让勇者成为星杯传说中的强者",
            lingHunShuShi:"控制并利用灵魂是灵魂术士一族所独具的强大能力，错综多样的灵魂类别会使得很多学徒级的灵魂术士手忙脚乱。而对于精通利用灵魂的大师级灵魂术士而言，却能把每一个灵魂都发挥出最大的利用价值和使用效率",
            xueZhiWuNv:`被鲜血诅咒的血之巫女原本是一个试验品，现在她带着充满毁灭的鲜血能力来进行她的复仇计划。流淌在她全身的每一滴鲜血都是武器，这种武器有时候连她都完全没法控制`,
            dieWuZhe:"蝶舞者是一位能够操纵灵蝶的幻术师，从灵蝶身上散布的毒粉会慢慢渗透到敌人的肌肤里产生剧毒，它们有着强大的繁衍能力，随着其数量的不断增加，所有人都会被其吞噬殆尽",
            nvWuShen:`米涅瓦：力量对于她来说是一种艺术，每一种技巧和武艺对于她来说同样是一种艺术，将各种各样的艺术融会贯通，铸就了女武神不败的威名<br>
            栞蒂：作为“女武神计划”的最终产物，她拥有的技巧和实力几乎完美再现了当年女武神的威风`,
            moGong:`魔弓为了超越她的姐姐，舍弃了原本应当追寻技巧与速度的弓之奥义，而将所有的箭术魔化为强大的充能能量，力求在爆发力与AOE上做到极致与完美`,
            hongLianQiShi:"背弃原初信仰的红莲骑士，在被神诅咒着的同时也掌握了破坏力更为强大的堕落力量，让敌人溺毙在自己的鲜血之中是令她最为愉悦的杀戮手段",
            yingLingRenXing:"纯粹为战斗而生的人形，自诞生之日便掌握神秘的纹章力量，并运用这种力量将前进道路上的障碍统统粉碎",
            moQiang:`被幻之星尘同化的魔枪在获得了新的意志和形态后，体内涌出一股无与伦比的力量。这种力量极大地提高了她的打击能力和爆发力，但也使得她再也无法使用那些基本的法术了`,
            cangYanMoNv:`拥有千奇百怪魔法道具的她总是让敌人无可奈何，然而苍炎魔女真正的杀招，是隐藏于血脉之中的苍炎之力<br>
            将身躯奉献给苍炎之力的苍炎魔女，觉醒其体内完全的魔力。烈炎之痕烙印在她的身躯上，为了心中的执念，她已不顾任何毁灭性的后果。是什么让她如此奋不顾身？也许答案已不言而喻。。。`,
            yinYouShiRen:`吟游诗人不仅仅依凭自己的直觉和灵感进行着战斗，他弹奏的一个个音符能大幅增强自身和队友的实力，同样也能对敌人造成极大的伤害`,
            jingLingSheShou:"穿梭于丛林之中，游走于动物伙伴之间，精灵秘仪的力量祝福者她和她的动物伙伴在战场上战无不胜",
            yinYangShi:`阴阳师通过式神的帮助，于虚实之间转移对手注意力并造成伤害。由于阴阳师与式神之间捉摸不定的特性，往往使得对手疲于奔命`,
            xueSeJianLing:`将鲜血之力与剑技完美融合，血色剑灵拥有着匹敌于魔剑的爆发性和机动性。任何敌人若踏进她的鲜血领域，那么他将必死无疑”`,
            yueZhiNvShen:`月之女神以新月庇佑队友，吸纳队友伤痛作为自己的力量。她是相信“力量即为一切”的对手的梦魇，会在积累足够的伤痛后进行反击。然而对于另一种不擅长以伤害取胜的对手，她还是疲于应付`,
            shouLingWuShi:`御魂流是一种奇妙的剑道，通过兽魂的不同，可以一击必中，也可以卸掉对手的攻势让其无处使劲。最为奇妙的当属其中奥义【逆反居合斩】，还没有人能准确描述中了此招后的感受。。。因为。。。`,
            shengGong:"因尚未充填完毕，圣弓的伤害仍然受到束缚。然而即使如此，也能隐隐约约感受到其作为能量炮的恐怖之处。若给她足够的时间积蓄力量，她能够一瞬间重置战场甚至逆转战局，是不可忽视的因素",
		},
		card:{
            diZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('diZhiFengYin_xiaoGuo');
                }
            },
            shuiZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('shuiZhiFengYin_xiaoGuo');
                }
            },
            huoZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('huoZhiFengYin_xiaoGuo');
                }
            },
            fengZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('fengZhiFengYin_xiaoGuo');
                }
            },
            leiZhiFengYin:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('leiZhiFengYin_xiaoGuo');
                }
            },
            weiLiCiFu:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('weiLiCiFu_xiaoGuo');
                }
            },
            xunJieCiFu:{
                filterTarget:function(card,player,target){
                    return !target.hasExpansions('xunJieCiFu_xiaoGuo');
                }
            }
        },

		skill:{
            //风之剑圣
            fengNuZhuiJi:{
                usable:1,
                trigger:{player:"gongJiAfter"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.xiBie(card)!='feng'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'风怒追击：风系[攻击行动]',
                    });
                },
                check:function(event,player){
                    var num=player.countCards('h',card=>get.xiBie(card)=='feng'&&get.type(card)=='gongJi');
                    return num>0
                },
                mod:{
                    aiOrder:function(player,card,num){
                        if(get.type(card)!='gongJi') return;
                        if(get.xiBie(card)=='feng') return num-0.3;
                    }
                }
            },
            shengJian:{
                forced:true,
                trigger:{player:"gongJiSheZhi"},
                group:['shengJian_drawAndDiscard'],
                priority:1,
                filter:function(event,player){
                    return event.yingZhan!=true&&player.getStat('gongJi').zhuDong==3;
                },
                content:function(){
                    trigger.qiangZhiMingZhong();
                    trigger.customArgs.shengJian=true;
                },
                subSkill:{
                    drawAndDiscard:{
                        direct:true,
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return event.customArgs.shengJian==true;
                        },
                        content:function(){
                            "step 0"
                            var list=[0,1,2,3];
                            player.chooseControl(list).set('prompt','圣剑：摸X张牌并弃置X张牌').set('ai',function(){
                                var player=_status.event.player;
                                var num=player.getHandcardLimit()-player.countCards('h');
                                if(num>3) num=3;
                                return num;
                            });
                            "step 1"
                            if(result.control==0){
                                event.finish();
                            }else{
                                event.number=result.control;
                            }
                            "step 2"
                            player.draw(event.number);
                            "step 3"
                            player.chooseToDiscard(event.number,true);
                        }
                    }
                },
            },
            lieFengJi:{
                duYou:'lieFengJi',
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.card.hasDuYou('lieFengJi')&&event.target.hasExpansions('_shengDun');
                },
                content:function(){
                    'step 0'
                    trigger.wuFaShengDun();
                    trigger.wuFaYingZhan();
                },
            },
            jiFengJi:{
                duYou:'jiFengJi',
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.card.hasDuYou('jiFengJi')&&event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    player.addGongJi();
                },
            },
            jianYing:{
                trigger:{player:'gongJiAfter'},
                usable:1,
                filter:function(event,player){
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addGongJi();
                },
                check:function(event,player){
                    if(player.storage.gongJi.zhuDong>=3) return false;
                    return player.canGongJi();
                },
                ai:{
                    shuiJing:true,
                }
            },
            //狂战士
            kuangHua:{
                trigger:{player:'gongJiSheZhi'},
                forced:true,
                group:['kuangHua_gongJiMingZhong'],
                content:function(){
                    'step 0'
                    trigger.changeDamageNum(1);
                },
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return player.countCards('h')>3;
                        },
                        content:function(){
                            'step 0'
                            trigger.changeDamageNum(1);
                        }
                    }
                }
            },
            xueYingKuangDao:{
                duYou:'xueYingKuangDao',
                trigger:{player:'gongJiShi'},
                group:['xueYingKuangDao_gongJiMingZhong'],
                filter:function(event,player){
                    return event.yingZhan!=true&&event.card.hasDuYou('xueYingKuangDao');
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.xueYingKuangDao=true;
                },
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.xueYingKuangDao==true&&(event.target.countCards('h')==2||event.target.countCards('h')==3);
                        },
                        content:function(){
                            'step 0'
                            if(trigger.target.countCards('h')==2){
                                trigger.changeDamageNum(2);
                            }else if(trigger.target.countCards('h')==3){
                                trigger.changeDamageNum(1);
                            }
                        }
                    }
                },
            },
            xueXingPaoXiao:{
                duYou:'xueXingPaoXiao',
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.card.hasDuYou('xueXingPaoXiao')&&event.yingZhan!=true&&event.target.zhiLiao==2;
                },
                content:function(){
                    'step 0'
                    trigger.qiangZhiMingZhong();
                }
            },
            siLie:{
                trigger:{source:'gongJiMingZhongAfter'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    trigger.changeDamageNum(2);
                }
            },
            //圣女
            bingShuangDaoYan:{
                trigger:{player:'daChuPai'},
                forced:true,
                filter:function(event,player){
                    return get.xiBie(event.card)=='shui' || event.card.name=='shengGuang';
                },
                content:function(){
                    'step 0'
                    var next=player.chooseTarget(true,'目标角色+1[治疗]').set('ai',function(target){
                        var player=_status.event.player;
						return get.zhiLiaoEffect2(player,target,1);
					});
                    'step 1'
					if(result.bool){
						var target=result.targets[0];
						target.changeZhiLiao(1,player);
					}
                }
            },
            zhiLiaoShu:{
                enable:'faShu',
                type:'faShu',
                filterTarget:true,
                prompt:'目标角色+2[治疗]',
                position:'h',
                duYou:'zhiLiaoShu',
                useCard:true,
                filterCard:function(card){
                    return card.hasDuYou('zhiLiaoShu');
                },
                filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.zhiLiaoShu.filterCard(card);
                    });
				},
                content:function(){
                    return target.changeZhiLiao(2,player);
                },
                ai: {
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
					},
					order: 3.2,
				},
            },
            zhiYuZhiGuang:{
                type:'faShu',
                enable:'faShu',
                duYou:'zhiYuZhiGuang',
				filterCard:function(card){
                    return card.hasDuYou('zhiYuZhiGuang');
				},
				position:'h',
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.zhiYuZhiGuang.filterCard(card);
                    });
				},
				prompt:'指定最多3名角色各+1[治疗]。',
                filterTarget:true,
                selectTarget:[1,3],
                useCard:true,
                content:function(){
                    if(target){
                        target.changeZhiLiao(1,player);
                    }
                },
                ai: {
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
					},
					order: 3.2,
				},
            },
            lianMin:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    player.addNengLiang('shuiJing');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 7
                    }
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    return !player.isHengZhi();
                },
                ai:{
                    baoShi:true,
                    skillTagFilter:function(player,tag,arg){
                        if(tag=='baoShi'&&player.isHengZhi()) return false;
                    }
                }
            },
            shengLiao:{
                type:'faShu',
                usable:1,
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:[1,3],
                filterTarget:true,
                contentBefore:function(){
                    player.removeBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        target.changeZhiLiao(3,player);
                        event.finish();
                    }else if(targets.length==3||player.storage.shengLiao==2){
                        target.changeZhiLiao(1,player);
                        event.finish();
                    }else if(player.storage.shengLiao==1){
                        target.changeZhiLiao(2,player);
                        event.finish();
                    }else{
                        var list=[1,2];
                        var name=get.translation(target)
                        var next=player.chooseControl(list).set('prompt',name+'获得X点[治疗]');
                        var chaZhi=target.getZhiLiaoLimit()-target.zhiLiao;
                        if(chaZhi<=1) var num=0;
                        else var num=1;
                        next.set('num',num);
                        next.set('ai',function(){
                            return _status.event.num;
                        });
                    }
                    'step 1'
                    var num=result.control;
                    target.changeZhiLiao(num,player);
                    player.storage.shengLiao=num;
                },
                contentAfter:function(){
                    player.storage.shengLiao=0;
                    player.addGongJiOrFaShu();
                },
                ai: {
                    shuiJing:true,
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
					},
					order: 3.5,
				},
            },
            //暗杀者
            fanShi:{
                trigger:{player:"chengShouShangHai"},
                forced:true,
                filter:function(event){
                    return event.faShu!=true;
                },
                logTarget:'source',
                content:function(){
                    trigger.source.draw(player);
                }
            },
            shuiYing:{
                trigger:{player:'drawBefore'},
                filter:function(event,player){
                    return event.cause!="teShuXingDong"&&player.countCards('h')>0;
                },
                async cost(event, trigger, player) {
					event.result = await player
						.chooseCard("水影：弃X张水系牌",[1,Infinity],function(card){
                            return get.xiBie(card)=='shui';
                        })
						.set("ai",function(card){
							return 6 - get.value(card);
						})
						.forResult();
				},
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    'step 2'
                    if(!player.isHengZhi()) event.finish();
                    'step 3'
                    var next=player.chooseToDiscard(1,'水影：选择要弃置的法术牌',function(card){
                        return get.type(card)=='faShu';
                    });
                    next.set('ai',function(card){
                        return 6 - get.value(card);
                    });
                    next.set('showCards',true);
                }
            },
            qianXing:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.chooseDraw(1);
                    'step 3'
                    player.hengZhi();
                },
                mod:{
                    maxHandcardBase:function(player,num){
                        if(player.isHengZhi()) return num-1;
                    },
                    targetEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi'&&target.isHengZhi()){
                            if(_status.event.yingZhan!=true) return false;
                        }
                    },
                    aiOrder:function(player,card,num){
                        if(player.isHengZhi()&&get.type(card)=='gongJi') return num+0.5;
                    }
                },
                group:['qianXing_chongZhi','qianXing_xiaoGuo'],
                subSkill:{
                    chongZhi:{
                        direct:true,
                        trigger:{player:'xingDongBegin'},
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                    xiaoGuo:{
                        direct:true,
                        trigger:{player:"gongJiSheZhi"},
                        filter:function(event,player){
                            return event.yingZhan!=true&&player.isHengZhi();
                        },
                        content:function(){
                            var num=player.countNengLiangAll();
                            if(num>0) trigger.changeDamageNum(num);
                            trigger.wuFaYingZhan();
                        }
                    }
                },
                ai:{
                    baoShi:true,
                },
                check:function(event,player){
                    if(!player.canGongJi()) return false;
                    if(player.countCards('h')>=player.getHandcardLimit()) return false;
                    if(player.countNengLiangAll()<=1) return false;
                    return true;
                },
            },
            //封印师
            faShuJiDang:{
                trigger:{player:'faShuAfter'},
                content:function(){
                    player.addGongJi();
                }
            },
            diZhiFengYin:{
                type:'faShu',
                enable:'faShu',
				position:'h',
                duYou:'diZhiFengYin',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.diZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.diZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterCard:function(card){
                    return card.hasDuYou('diZhiFengYin');
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'diZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('diZhiFengYin_xiaoGuo')){
                        target.addSkill('diZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('diZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"地",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.hasExpansions('diZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='di'){
                                    return true;
                                }
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('diZhiFengYin_xiaoGuo'),'diZhiFengYin_xiaoGuo').set('visible',true);
                            'step 1'
                            player.removeSkill('diZhiFengYin_xiaoGuo');
                            'step 2'
                            player.faShuDamage(player.storage.fengYin,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            shuiZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'shuiZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('shuiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.shuiZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.shuiZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'shuiZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('shuiZhiFengYin_xiaoGuo')){
                        target.addSkill('shuiZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('shuiZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"水",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.hasExpansions('shuiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='shui'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('shuiZhiFengYin_xiaoGuo'),'shuiZhiFengYin_xiaoGuo').set('visible',true);
                            'step 1'
                            player.removeSkill('shuiZhiFengYin_xiaoGuo');
                            'step 2'
                            player.faShuDamage(player.storage.fengYin,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            huoZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'huoZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('huoZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.huoZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.huoZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'huoZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('huoZhiFengYin_xiaoGuo')){
                        target.addSkill('huoZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('huoZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"火",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.hasExpansions('huoZhiFengYin_xiaoGuo')){
                                return false
                            }

                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='huo'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('huoZhiFengYin_xiaoGuo'),'huoZhiFengYin_xiaoGuo').set('visible',true);
                            'step 1'
                            player.removeSkill('huoZhiFengYin_xiaoGuo');
                            'step 2'
                            player.faShuDamage(player.storage.fengYin,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            fengZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'fengZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('fengZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.fengZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.fengZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'fengZhiFengYin'},player,target);
                },
                useCard:true,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('fengZhiFengYin_xiaoGuo')){
                        target.addSkill('fengZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('fengZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"风",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.hasExpansions('fengZhiFengYin_xiaoGuo')){
                                return false
                            }
   
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='feng'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('fengZhiFengYin_xiaoGuo'),'fengZhiFengYin_xiaoGuo').set('visible',true);
                            'step 1'
                            player.removeSkill('fengZhiFengYin_xiaoGuo');
                            'step 2'
                            player.faShuDamage(player.storage.fengYin,3); 
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            leiZhiFengYin:{
                type:'faShu',
                enable:'faShu',
                duYou:'leiZhiFengYin',
				filterCard:function(card){
                    return card.hasDuYou('leiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.leiZhiFengYin.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.leiZhiFengYin.filterTarget('',player,current);
                    });
                    return bool1&&bool2
				},
                filterTarget:function(card,player,target){
                    if(target.hasExpansions('leiZhiFengYin_xiaoGuo')) return false;
                    if(target.side==player.side) return false;
                    return lib.filter.targetEnabled({name:'leiZhiFengYin'},player,target);
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('leiZhiFengYin_xiaoGuo')){
                        target.addSkill('leiZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('leiZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"雷",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{player:['daChuPai','showCardsEnd']},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.hasExpansions('leiZhiFengYin_xiaoGuo')){
                                return false
                            }

                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='lei'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('leiZhiFengYin_xiaoGuo'),'leiZhiFengYin_xiaoGuo').set('visible',true);
                            'step 1'
                            player.removeSkill('leiZhiFengYin_xiaoGuo');
                            'step 2'
                            player.faShuDamage(player.storage.fengYin,3);
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            wuXiShuFu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.canBiShaShuiJing();
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.wuXiShuFu.filterTarget('',player,current);
                    });
                    return bool1&&bool2
                },
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.addSkill('wuXiShuFu_xiaoGuo')
                    'step 2'
					target.addMark('wuXiShuFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        priority:2,
                        trigger:{player:'xingDongBefore'},
                        forced:true,
                        markimage:'image/card/zhuanShu/wuXiShuFu.png',
                        intro:{
                            content:'(将【五系束缚】放置于目标对手面前)该对手跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸(2+X)张牌来取消【五系束缚】的效果。X为场上封印的数量，X最高为2。无论效果是否发动，触发后移除此牌。',
                            nocount:true,
                        },
                        onremove:'storage',
                        filter:function(event,player){
                            return player.hasZhiShiWu('wuXiShuFu_xiaoGuo');
                        },
                        content:function(){
                            'step 0'
                            var x=0;
                            for(var p of game.players){
                                for(var xiaoGuo of game.jiChuXiaoGuo.fengYinShi){
                                    if(p.hasExpansions(xiaoGuo)){
                                        x++;
                                    }
                                }
                                if(x>=2){
                                    x=2;
                                    break;
                                }
                            }
                            event.num;
                            event.num=2+x;

                            var list=[`摸2+${x}张牌`,'跳过行动阶段'];
                            if(player.hasExpansions('_xuRuo')){
                                list[0]=`摸2+3+${x}张牌`;
                                event.num+=3;
                            }
                            player.chooseControl().set('choiceList',list).set('prompt','五系束缚：选择一项').set('ai',function(){
                                var player=_status.event.player;
                                var num=_status.event.num;
                                if(player.countCards('h')+num>player.getHandcardLimit()){
                                    return 1;
                                }else{
                                    return 0;
                                }
                            }).set('num',event.num);
                            'step 1'
                            if(result.index==1){
                                trigger.xuRuo=true;
                            }else if(result.index==0){
                                player.draw(event.num); 
                            }
                            'step 2'
                            player.removeZhiShiWu('wuXiShuFu_xiaoGuo');
                            'step 3'
                            if(player.hasExpansions('_xuRuo')){
                                player.discard(player.getExpansions('_xuRuo'),'_xuRuo').set('visible',true); 
                            }
                            'step 4'
                            player.removeSkill('wuXiShuFu_xiaoGuo');
                        },
                    }
                },
                ai:{
                    shuiJing:true,
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>4) return -3;
                            return -1;
                        }
                    }
                }
            },
            fengYinPoSui:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.canBiShaShuiJing();
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.fengYinPoSui.filterTarget('','',current)
                    });
                    return bool1&&bool2;
                },
                filterTarget:function(card,player,target){
                    return target.hasJiChuXiaoGuo();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.gainJiChuXiaoGuo(target);
                },
                ai:{
                    shuiJing:true,
                    order:3.5,
                    result:{
                        target:function(player,target){
                            var shiQi=get.shiQi(player.side);
                            if(shiQi<=5&&player.countEmptyCards<=0) return false; 

                            return get.jiChuXiaoGuoEffect(target);
                        }
                    }
                }
            },
            //天使
            fengZhiJieJing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool1=player.hasCard(function(card){
                        return lib.skill.fengZhiJieJing.filterCard(card);
                    });
                    var bool2=game.hasPlayer(function(current){
                        return lib.skill.fengZhiJieJing.filterTarget('','',current);
                    });
                    return bool1&&bool2;
                },
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                discard:true,
                showCards:true,
                filterTarget:function(card,player,target){
                    return target.hasJiChuXiaoGuo();
                },
                content:function(){
                    'step 0'
                    player.removeJiChuXiaoGuo(target);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.jiChuXiaoGuoEffect(target);
                        }
                    }
                }
            },
            tianShiZhuFu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.tianShiZhuFu.filterCard(card);
                    });
                },
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                selectTarget:[1,2],
                filterTarget:true,
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        if(target.countCards('h')>=2){
                            target.chooseToGive('交给守护天使2张牌',true,2,player).set('visibleMove',true);
                        }else if(target.countCards('h')==1){
                            target.chooseToGive('交给守护天使1张牌',true,1,player).set('visibleMove',true);
                        }else if(target.countCards('h')==0){
                            event.finish();
                        }
                    }else if(targets.length==2){
                        if(target.countCards('h')>=1){
                            target.chooseToGive('交给守护天使1张牌',true,1,player).set('visibleMove',true);
                        }else{
                            event.finish();
                        }
                    }
                },
                ai:{
                    order:3,
                    result:{
                        target:function(player,target){
                            return 1;
                        },
                        player:0,
                    }
                }
            },
            tianShiJiBan:{
                trigger:{player:['removeJiChuXiaoGuo','daChuPai']},
                forced:true,
                filter:function(event,player){
                    if(event.name == 'useCard') return event.card.name=='shengDun';
                    else return true;
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('天使羁绊：选择一名角色+1[治疗]',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 1'
                    if(result.bool){
                        var target=result.targets[0];
                        target.changeZhiLiao(1,player);
                    }
                },
            },
            tianShiZhiQiang:{
                type:'faShu',
                enable:'faShu',
                duYou:'tianShiZhiQiang',
				filterCard:function(card){
                    return card.hasDuYou('tianShiZhiQiang');
				},
				position:'h',
				viewAs:{name:'shengDun'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.tianShiZhiQiang.filterCard(card);
                    });
				},
                ai:{
                    order:3.8,
                }
            },
            tianShiZhiGe:{
                trigger:{player:'phaseBefore'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    return game.hasPlayer(function(current){
                        return current.hasJiChuXiaoGuo();
                    });
                },
                async cost(event, trigger, player) {
                    event.result = await player.chooseTarget(function(card,player,target){
                        return target.hasJiChuXiaoGuo();
                    })
                    .set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side){
                            return get.jiChuXiaoGuoEffect(target);
                        }else{
                            return -get.jiChuXiaoGuoEffect(target);
                        }
                    })
                    .set('prompt',get.prompt('tianShiZhiGe'))
                    .set('prompt2',lib.translate.tianShiZhiGe_info)
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.removeJiChuXiaoGuo(event.targets[0]);
                },
                check:function(event,player){
                    var hasPlayer=game.hasPlayer(function(current){
                        if(player.side==current.side) return get.jiChuXiaoGuoEffect(target)>0;
                        else return -get.jiChuXiaoGuoEffect()>0;
                    });
                    return hasPlayer;
                },
                ai:{
                    shuiJing:true,
                }
            },
            shenZhiBiHu:{
                trigger:{global:'changeShiQiBefore'},
                filter:function(event,player){
                    if(event.side!=player.side) return false;
                    return player.canBiShaShuiJing()&&event.num<0&&event.cause=='damage'&&event.faShu==true;
                },
                async cost(event, trigger, player) {
                    var list=[];
                    for(var i=0;i<player.countNengLiang('baoShi');i++){
                        list.push(['baoShi','宝石']);
                    }
                    for(var i=0;i<player.countNengLiang('shuiJing');i++){
                        list.push(['shuiJing','水晶']);
                    }
                    var result = await player.chooseButton(['是否发动【神之庇护】<br>'+lib.translate.shenZhiBiHu_info,[list,'tdnodes']])
                    .set('selectButton',[1,-trigger.num])
                    .forResult();
                    event.result = {
						bool: result.bool,
						cost_data: result.links,
					};
                },
                content:function(){
                    'step 0'
                    var links=event.cost_data;
                    var num=links.length;
                    if(num>0){
                        trigger.num+=num;
                        var dict={baoShi:0,shuiJing:0};
                        for(var i=0;i<links.length;i++){
                            if(links[i]=='baoShi'){
                                dict['baoShi']++;
                            }else if(links[i]=='shuiJing'){
                                dict['shuiJing']++;
                            }
                        }
                        if(dict['baoShi']>0) player.changeNengLiang('baoShi',-dict['baoShi']);
                        if(dict['shuiJing']>0) player.changeNengLiang('shuiJing',-dict['shuiJing']);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            //神箭手
            shanDianJian:{
                forced:true,
                trigger:{player:"gongJiSheZhi"},
                filter:function(event){
                    return get.xiBie(event.card)=='lei';
                },
                content:function(){
                    trigger.wuFaYingZhan();
                }
            },
            guanChuanSheJi:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>0;
                },
                logTarget:'target',
                async cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt('guanChuanSheJi'))
                    .set('prompt2',lib.translate.guanChuanSheJi_info)
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    'step 1'
                    trigger.player.faShuDamage(2,player);
                }
            },
            shanGuangXianJing:{
                type:'faShu',
                enable:'faShu',
                duYou:'shanGuangXianJing',
				filterCard:function(card){
                    return card.hasDuYou('shanGuangXianJing');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return lib.skill.shanGuangXianJing.filterCard(card);
                    });
				},
                filterTarget:true,
                useCard:true,
                content:function(){
                    target.faShuDamage(2,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            jingZhunSheJi:{
                trigger:{player:'gongJiShi'},
                duYou:'jingZhunSheJi',
                filter:function(event,player){
                    return event.card.hasDuYou('jingZhunSheJi');
                },
                content:function(){
                    trigger.qiangZhiMingZhong();
                    trigger.changeDamageNum(-1);
                },
                check:function(event,player){
                    return event.targets[0].countCards('h')>3;
                }
            },
            juJi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.drawTo(5);
                    player.addGongJi();
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            var num=target.countCards('h');
                            if(num<5&&player.canGongJi()) return -5;
                            else return 0;
                        },
                    }
                }
            },
            //魔法少女
            moBaoChongJi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.moBaoChongJi.filterCard(card));
                },
                selectTarget:2,
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
                    target.chooseToDiscard(`弃置1张法术牌，否则${name}对你造成2点法术伤害③、${name}弃一张牌`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(){
                        return 1;
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                        if(player.countCards('h')>=1){
                            player.chooseToDiscard(1,true);
                        }
                    }
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
            moDanZhangWo:{
                trigger:{player:'useCardBefore'},
                forced:true,
                filter:function(event,player){
                    if(player.storage.moDan==true) return false;
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
                mod:{
                    playerEnabled:function(card,player,target){
                        if(player.storage.moDan==true) return;
                        if(get.name(card)=='moDan'){
                            var mubiao=player.getPrevious();
                            while(mubiao.side==player.side){
                                mubiao=mubiao.getPrevious();
                                while(mubiao.storage.moDan==true){
                                    mubiao=mubiao.getPrevious();
                                }
                            }
						    if(target==mubiao) return true;
                        }
                    }
                }
            },
            moDanRongHe:{
                enable:['faShu','moDan'],
				filterCard:function(card){
                    return get.xiBie(card)=='di'||get.xiBie(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.hasCard(function(card){
                        return lib.skill.moDanRongHe.filterCard(card);
                    });
				},
                ai:{
                    order:3.5,
                }
            },
            huiMieFengBao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    target.faShuDamage(2,player);
                },
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,player,2);
                        }
                    }
                }
            },
            //女武神
            shenShengZhuiJi:{
                trigger:{player:['gongJiAfter','faShuAfter']},
                filter:function(event,player){
                    return player.zhiLiao>0&&event.yingZhan!=true;
                },
                content:function(){
                    player.changeZhiLiao(-1);
                    player.addGongJi();
                }
            },
            zhiXuZhiYin:{
                type:'faShu',
                enable:'faShu',
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.changeZhiLiao(1);
                    player.addNengLiang('shuiJing');
                },
                ai:{
                    order:4,
                    result:{
                        player:function(player, target){
                            if(player.isHengZhi()) return -1;
                            if(player.countCards('h')+2>player.getHandcardLimit()) return -1;
                            else return 1;
                        },
                    }
                }
            },
            hePingXingZhe:{
                group:'hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                filter:function(event,player){
                    if(_status.currentPhase!=player) return false;
                    return !player.isHengZhi();
                },
                content:function(){
                    player.hengZhi();
                },
                subSkill:{
                    chongZhi:{
                        forced:true,
                        trigger:{player:'gongJiShi'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            player.chongZhi();
                            
                        }
                    }
                }
            },
            junShenWeiGuan:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    var choiceList=['你+1[治疗]，[重置]脱离【英灵形态】','(移除我方【战绩区】X个星石，X<3)目标角色+X[治疗]'];
                    var choices=['选项一'];
                    var list=get.zhanJi(player.side);
                    if(list.length>=1){
                        choices.push('选项二');
                    }
                    player.chooseControl(choices).set('prompt','军神威光：选择一项').set('choiceList',choiceList);
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        player.chongZhi();
                        event.finish();
                    }else if(result.index==1){
                        var list=get.zhanJi(player.side);
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '移除X个星石，X<3',
                            [listx,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('selectButton',[1,2]);
                    }
                    'step 2'
                    event.number=result.links.length;
                    var number=event.number;
                    var dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='baoShi'){
                            dict['baoShi']++;
						}else if(result.links[i]=='shuiJing'){
                            dict['shuiJing']++;
						}
					}
                    if(dict['baoShi']>0){
                        var next=player.removeZhanJi('baoShi',dict['baoShi']);
                    }
                    if(dict['shuiJing']>0){
                        var next=player.removeZhanJi('shuiJing',dict['shuiJing']);
                    }
                    'step 3'
                    var number=event.number;
                    player.chooseTarget(1,true,'选择一个目标角色+'+number+'点[治疗]').set('ai',function(target){
                        var player=_status.event.player;
                        var number=_status.event.number;
                        return get.zhiLiaoEffect2(target,player,number);
                    }).set('number',number);
                    'step 4'
                    result.targets[0].changeZhiLiao(event.number,player);
                }
            },
            yingLingZhaoHuan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.changeDamageNum(1);
                    'step 2'
                    player.chooseCardTarget({
                        filterCard:function(card){
                            return get.type(card)=='faShu';
                        },
                        filterTarget:true,
                        prompt:"<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>目标角色+1[治疗]",
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2(target) {
                            return get.zhiLiaoEffect2(target,player,1);
                        },
                    });
                    'step 3'
                    if(result.bool){
                        player.discard(result.cards).set('showCards',true);
                        event.target=result.targets[0];
                    }else{
                        event.goto(5);
                    }
                    'step 4'
                    event.target.changeZhiLiao(1);
                    'step 5'
                    event.trigger('yingLingZhaoHuan')
                },
                ai:{
                    shuiJing:true,

                }
            },
            //元素师
            yuanSuXiShou:{
                trigger:{source:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(event.yuanSuDianRan==true) return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('yuanSu');
                }
            },
            yuanSuDianRan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countMark('yuanSu')>=3
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('yuanSu',3);
                    'step 1'
                    target.damage(2,player).set('faShu',true).set('yuanSuDianRan',true);
                    'step 2'
                    player.addFaShu();
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            yunShi:{
                type:'faShu',
                enable:'faShu',
                selectCard:[1,2],
                duYou:'yunShi',
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('yunShi');
                    }else{
                        return get.xiBie(card)=='di'
                    }
                },
                discard:false,
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('yunShi')
                },
                complexCard:true,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.yunShi.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.addFaShu();
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            bingDong:{
                type:'faShu',
                enable:'faShu',
                duYou:'bingDong',
                selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('bingDong');
                    }else{
                        return get.xiBie(card)=='shui'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('bingDong');
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.bingDong.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.chooseTarget(1,'冰冻：选择1名角色+1点[治疗]',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 3'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1,player);
                    }
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            huoQou:{
                type:'faShu',
                enable:'faShu',
                duYou:'huoQou',
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('huoQou');
                    }else{
                        return get.xiBie(card)=='huo'
                    }
                },
                filterOk:function(){
                    if(ui.selected.cards[0].hasDuYou('huoQou')){
                        return true;
                    }else{
                        return false;
                    }
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.huoQou.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=2;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            fengRen:{
                type:'faShu',
                enable:'faShu',
                duYou:'fengRen',
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('fengRen');
                    }else{
                        return get.xiBie(card)=='feng'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('fengRen')
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.fengRen.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.addGongJi();
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            leiJi:{
                type:'faShu',
                enable:'faShu',
                duYou:'leiJi',
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('leiJi');
                    }else{
                        return get.xiBie(card)=='lei'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasDuYou('leiJi')
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.discard(cards[1]).set('showCards',true);;
                    }
                },
				position:'h',
                filterTarget:true,
				filter:function(event,player){
                    return player.hasCard(function(card){
                        return lib.skill.leiJi.filterCard(card);
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.changeZhanJi('baoShi',1);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            yueGuang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var num=player.countNengLiangAll()+1;
                    event.num=num;
                    'step 2'
                    target.faShuDamage(event.num,player);
                },
                ai:{
                    baoShi:true,
                    order:function(item,player){
                        return 3.4+(player.countNengLiangAll()-1)*0.1;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            yuanSu:{
                intro:{
                    name:'元素',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //月之女神
            xinYueBiHu:{
                trigger:{global:'changeShiQiBefore'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    if(event.side!=player.side) return false;
                    if(event.num>=0) return false;
                    if(event.cause!='damage') return false;
                    if(!event.cards) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    var cards=trigger.cards;
                    if(cards){
                        player.addToExpansion('draw',trigger.cards,'log').gaintag.add('anYue');
                    }
                    'step 2'
                    trigger.cancel();
                }
            },
            anYueZuZhou:{
                trigger:{player:'discard'},
                forced:true,
                filter:function(event,player){
                    return event.cards.length>0&&event.gaiPai=='anYue';
                },
                content:function(){
                    'step 0'
                    player.changeShiQi(-1);
                    'step 1'
                    if(player.getExpansions('anYue').length==0){
                        player.chongZhi();
                    }
                }
            },
            meiDuShaZhiYan:{
                trigger:{global:'gongJiShi'},
                filter:function(event,player){
                    if(event.player.side==player.side) return false;
                    if(!event.card.isCard) return false;
                    var anYue=player.getExpansions('anYue');
                    return anYue.length>0;
                },
                async cost(event, trigger, player) {
                    var result = await player.chooseCardButton(player.getExpansions('anYue'),'是否发动【美杜莎之眼】<br>'+lib.translate.meiDuShaZhiYan_info)
                    .set('filterButton',function(button){
                        return get.xiBie(button.link)==_status.event.xiBie;
                    })
                    .set('xiBie',get.xiBie(trigger.card)).forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    }
                },
                content:function(){
                    'step 0'
                    var card=event.cost_data[0];
                    event.card=card;
                    player.discard(card,'anYue').set('showHiddenCards',true);
                    'step 1'
                    player.changeZhiLiao(1);
                    'step 2'
                    player.addZhiShiWu('shiHua');
                    'step 3'
                    if(get.type(event.card)=='faShu'){
                        if(player.countCards('h')>0){
                            player.chooseToDiscard('h',true);
                        }
                    }else event.finish();
                    'step 4'
                    var next=player.chooseTarget(1,'美杜莎之眼：目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 5'
                    if(result.bool){
                        result.targets[0].damage(1,player).set('faShu',true);
                    }
                }

            },
            yueZhiLunHui:{
                trigger:{player:'phaseEnd'},
                priority:1,
                filter:function(event,player){
                    return player.zhiLiao>0||player.getExpansions('anYue').length>0;
                },
                async cost(event, trigger, player) {
                    var choices=[];
                    var choiceList=['<span class="tiaoJian">(移除1个【暗月】)</span>目标角色+1[治疗]',"<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【</span>新月<span class='hong'>】</span>"];
                    if(player.getExpansions('anYue').length>0){
                        choices.push('选项一');
                    }
                    if(player.zhiLiao>0){
                        choices.push("选项二");
                    }
                    choices.push('cancel2');
                    var result=await player.chooseControl(choices).set('prompt',"月之轮回：选择以下一项发动").set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.zhiLiao>0) return "选项二";
                        if(player.getExpansions('anYue').length>0) return "选项一";
                        return 'cancel2';
                    }).forResult();
                    event.result = {
                        bool: result.control!='cancel2',
                        cost_data: result.control,
                    };
                },
                content:async function(event, trigger, player){
                    if(event.cost_data=='选项一'){
                        var anYue=player.getExpansions('anYue');
                        var links=await player.chooseCardButton(anYue,true,'移除1个【暗月】目标角色+1[治疗]').forResult('links');
                        await player.discard(links,'anYue');
                        var targets=await player.chooseTarget(1,'月之轮回：选择1名目标角色+1[治疗]',true).forResult('targets');
                        targets[0].changeZhiLiao(1,player);
                    }else if(event.cost_data=="选项二"){
                        await player.changeZhiLiao(-1);
                        await player.addZhiShiWu('xinYue');
                    }
                }
            },
            yueDu:{
                usable:1,
                trigger:{source:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    return event.faShu==true&&player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-1);
                    'step 1'
                    player.chooseTarget(1,true,'对目标对手造成1点法术伤害③',function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    if(result.bool){
                        result.targets[0].faShuDamage(1,player);
                    }
                }
            },
            anYueZhan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.isHengZhi()&&player.canBiShaShuiJing()&&player.getExpansions('anYue').length>0;
                },
                async cost(event, trigger, player) {
                    var result=await player.chooseCardButton(player.getExpansions('anYue'),'是否发动【暗月斩】<br>'+lib.translate.anYueZhan_info,[1, 2]).forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 2'
                    event.num=event.cost_data.length;
                    player.discard(event.cost_data,'anYue');
                    'step 3'
                    trigger.changeDamageNum(event.num);
                },
                ai:{
                    shuiJing:true,
                }
            },
            cangBaiZhiYue:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaBaoShi();

                    var choiceList=["<span class='tiaoJian'>(移除3个</span><span class='lan'>【石化】</span><span class='tiaoJian'>)</span>你的下次主动攻击对手无法应战，额外+1[攻击行动]。你额外获得一个回合","移除X点<span class='hong'>【新月】</span>，你+1点<span class='lan'>【石化】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③"];
                    var choices=['选项二']
                    if(player.countZhiShiWu('shiHua')>=3){
                        choices.unshift('选项一');
                    }
                    var control=await player.chooseControl(choices).set('prompt','苍白之月：选择以下一项发动').set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countZhiShiWu('shiHua')>=3) return "选项一";
                        return "选项二";
                    }).forResult('control');
                    if(control=='选项一'){
                        await player.removeZhiShiWu('shiHua',3);
                        player.addSkill('cangBaiZhiYue_wuFaYingZhan');
                        player.addGongJi();
                        player.insertPhase();
                    }else if(control=="选项二"){
                        var list=[];
                        var xinYue=player.countZhiShiWu('xinYue');
                        for(var i=0;i<=xinYue;i++){
                            list.push(i);
                        }
                        var num=await player.chooseControl(list).set('prompt',"移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③").set('ai',function(){return _status.event.num;}).set('num',list.length-1).forResult('control');
                        if(num>0){
                            await player.removeMark('xinYue',num);
                        }
                        await player.addZhiShiWu('shiHua');
                        if(player.countCards('h')>0){
                            await player.chooseToDiscard(1,'h',true);
                        }
                        var targets=await player.chooseTarget(1,`对目标对手造成${num+1}点法术伤害③`,true,function(card,player,target){
                            return target.side!=player.side;
                        }).forResult('targets');
                        await targets[0].faShuDamage(num+1,player);
                    }
                },
                subSkill:{
                    wuFaYingZhan:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            trigger.wuFaYingZhan();
                            'step 1'
                            player.removeSkill('cangBaiZhiYue_wuFaYingZhan');
                        }
                    }
                },
                ai:{
                    baoShi:true,
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            xinYue:{
                intro:{
                    name:'新月',
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            shiHua:{
                intro:{
                    name:'石化',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            anYue:{
                intro:{
                    name:'暗月',
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('anYue');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            //仲裁者
            zhongCaiFaZe:{
                trigger:{global:"gameStart"},
                forced:true,
                content:function(){
                    player.changeNengLiang('shuiJing',2);
                }
            },
            yiShiZhongDuan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.chongZhi();
                    'step 1'
                    player.addZhanJi('baoShi',1)
                },
                check:function(event,player){
                    return player.countZhiShiWu('shenPan')>=3;
                }
            },
            moRiShenPan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('shenPan')>0;
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    event.num=player.countZhiShiWu('shenPan');
                    player.removeZhiShiWu('shenPan',event.num);
                    'step 1'
                    target.faShuDamage(event.num,player);
                },
                group:'moRiShenPan_sheZhi',
                subSkill:{
                    sheZhi:{
                        trigger:{player:'xingDongBegin'},
                        direct:true,
                        priority:1,
                        filter:function(event,player){
                            return player.countZhiShiWu('shenPan')>=get.info('shenPan').intro.max;
                        },
                        content:function(){
                            trigger.canTeShu=false;
                            player.addTempSkill('moRiShenPan_biXu',{player:'useSkill'});
                        }
                    },
                    biXu:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker:function(skill,player){
                            var info=get.info(skill);
                            return skill!='moRiShenPan'&&info.type=='faShu';
                        },
                        mod:{
                            cardEnabled:function(card,player){
                                return false;
                            }
                        },

                    }
                },
                ai:{
					order:function(item,player){
						return 1.5+player.countZhiShiWu('shenPan');
					},
					result:{
						target:function(player,target){
							return get.damageEffect(target,player.countZhiShiWu('shenPan'));
						}
					},
				},
            },
            shenPanLangChao:{
                forced:true,
                trigger:{player:'chengShouShangHai'},
                content:function(){
                    player.addZhiShiWu('shenPan',1);
                },
            },
            zhongCaiYiShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(event.qiDong==true) return false;
                    return player.canBiShaBaoShi()&&!player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 5;
                    }
                },
                group:'zhongCaiYiShi_shenPan',
                subSkill:{
                    shenPan:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            player.addZhiShiWu('shenPan',1);
                        }
                    }
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    baoShi:true,
                }
            },
            panJueTianPing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('shenPan',1);
                    var list=['弃掉所有手牌','将你的手牌补到上限[强制]，我方【战绩区】+1[宝石]'];
                    player.chooseControl().set('prompt','判决天平：选择一项').set('choiceList',list).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')>3) return '选项一';
                        return '选项二';
                    });
                    'step 2'
                    if(result.control=='选项一'){
                        player.discard(player.getCards('h'));
                    }
                    else if(result.control=='选项二'){
                        var num=player.getHandcardLimit();
                        player.drawTo(num);
                        player.addZhanJi('baoShi',1);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.6,
                    result:{
                        player:1,
                    }
                }
            },
            shenPan:{
                intro:{
                    name:'审判',
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //冒险家
            qiZha:{
                enable:'gongJi',
                filter:function(event,player){
                    var bool1=player.countTongXiPai()>=2;
                    var bool2=game.hasPlayer(current=>lib.skill.qiZha.filterTarget('',player,current));
                    return bool1&&bool2;
                },
                selectCard:[2,3],
                showCards:true,
                discard:true,
                filterCard:function(card){
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
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
                    }else if(length==3){
                        xiBie='an';
                        name='anMie';
                    }
                    var card={name:name,xiBie:xiBie};
                    await player.useCard(card,event.target).set('action',true);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:-1,
                    }
                },
                check: function (card) {
					return 6 - get.value(card);
				},
            },
            qiangYun:{
                trigger:{player:'qiZha'},
                forced:true,
                content:function(){
                    player.addNengLiang('shuiJing');
                }
            },
            diXiaFaZe:{
                trigger:{player:'gouMai'},
                forced:true,
                content:function(){
                    'step 0'
                    player.draw(3).set('cause','teShuXingDong');
                    'step 1'
                    player.addZhanJi('baoShi',2);
                    trigger.finish();
                }
            },
            maoXianJiaTianTang:{
                enable:'phaseUse',
                type:'teShu',
                filter:function(event,player){
                    var side=player.side;
                    var zhanJi=get.zhanJi(side);
                    if(zhanJi.length==0) return false;
                    for(var i=0;i<game.players.length;i++){
                        if(side!=game.players[i].side) continue;
                        if(game.players[i].countNengLiangAll()<game.players[i].getNengLiangLimit()){
                            return true;
                        }
                    }
                },
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return player.side==target.side&&target.countNengLiangAll()<target.getNengLiangLimit();
                },
                content:function(){
                    'step 0'
                    var num=target.getNengLiangLimit()-target.countNengLiangAll();
                    num=Math.min(num,2);
                    var list=get.zhanJi(player.side);
                    var listx=[];
                    for(var i=0;i<list.length;i++){
                        listx.push([list[i],get.translation(list[i])]);
                    };
					var next=player.chooseButton([
                        '选择提炼的星石',
                        [listx,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('selectButton',[1,num]);
                    next.set('ai',function(button){
                        var player=_status.event.target;
						if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
							if(button.link=='baoShi') return 5;
							else return -1;
						}
						if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
							if(button.link=='shuiJing') return 5;
							else return 2;
						}
						//既有水晶也有宝石
						return 2;
                    });
                    next.set('target',target);
                    'step 1'
                    event.dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<result.links.length;i++){
                        if(result.links[i]=='baoShi') event.dict.baoShi++;
                        else if(result.links[i]=='shuiJing') event.dict.shuiJing++;
                    }
                    if(event.dict.baoShi>0) player.changeZhanJi('baoShi',-event.dict.baoShi);
                    if(event.dict.shuiJing>0) player.changeZhanJi('shuiJing',-event.dict.shuiJing);
                    'step 2'
                    if(event.dict.baoShi>0) target.addNengLiang('baoShi',event.dict.baoShi);
                    if(event.dict.shuiJing>0) target.addNengLiang('shuiJing',event.dict.shuiJing);
                    'step 3'
                    if(player.countNengLiangAll()>0){
                        player.removeBiShaShuiJing();
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(!(target.hasSkillTag('baoShi')||target.hasSkillTag('shuiJing'))) return 0;
                            var list=get.zhanJi(player.side);
                            if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')&&!list.includes('baoShi')){
                                return 0;
                            }
							var num=target.getNengLiangLimit()-target.countNengLiangAll();
							if(num>=2) return 2;
							return 0;
                        },
                    }
                }
            },
            touTianHuanRi:{
                type:'faShu',
                usable:1,
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('偷天换日','hidden');
                        var list=[['tou','将对方【战绩区】的1[宝石]转移到我方【战绩区】'],['huan','将我方【战绩区】的[水晶]全部转换为[宝石]']]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='tou'){
                            var zhanJi=get.zhanJi(!player.side);
                            return zhanJi.includes('baoShi');
                        }
                        if(link=='huan'){
                            return true;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='tou'){
                            var next=get.copy(lib.skill['touTianHuanRi_tou']);
                        }else if(links[0]=='huan'){
                            var next=get.copy(lib.skill['touTianHuanRi_huan']);
                        }
						return next;
					},
                    check:function(button){
                        var player=_status.event.player;
                        if(button.link=='tou'){
                            var zhanJi=get.zhanJi(!player.side);
                            return zhanJi.includes('baoShi');
                        }
                        if(button.link=='huan'){
                            return Math.random()*3;
                        }
                    }
                },
                subSkill:{
                    tou:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            'step 1'
                            var side=player.side;
                            player.changeZhanJi('baoShi',-1,!side)
                            player.addZhanJi('baoShi',1);
                            'step 2'
                            player.addGongJiOrFaShu();
                        }
                    },
                    huan:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            'step 1'
                            var zhanJi=get.zhanJi(player.side).slice();
                            event.num=0;
                            for(var i=0;i<zhanJi.length;i++){
                                event.num++;
                            }
                            'step 2'
                            if(event.num>0){
                                player.changeZhanJi('shuiJing',-event.num);
                            }
                            'step 3'
                            if(event.num>0){
                                player.changeZhanJi('baoShi',event.num);
                            }
                            'step 4'
                            player.addGongJiOrFaShu();
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:function(player){
                            if(player.side==true){
                                if(game.hongZhanJi.includes('shuiJing')||game.lanZhanJi.includes('baoShi')) return 1;
                                else return 0;
                            }else{
                                if(game.lanZhanJi.includes('shuiJing')||game.hongZhanJi.includes('baoShi')) return 1;
                                else return 0;
                            }
                        },
                    }
                }

            },
            //圣枪骑士
            shenShengXinYang:{
                mod:{
                    maxZhiLiao:function(player,num){
                        var side=player.side;
                        if(side==true){
                            if(game.hongXingBei>=game.lanXingBei) return num+1;
                        }else if(side==false){
                            if(game.lanXingBei>=game.hongXingBei) return num+1;
                        }
                    }
                }
            },
            huiYao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.huiYao.filterCard(card));
                },
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                selectTarget:-1,
                filterTarget:true,
                content:function(){
                    target.changeZhiLiao(1);
                },
                contentAfter:function(){
                    player.addGongJi();
                },
                ai:{
                    order:3.6,
                    result:{
                        target:1,
                    }
                }
            },
            chengJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.hasCard(card=>lib.skill.chengJie.filterCard(card))) return false;
                    var bool=game.hasPlayer(current=>lib.skill.chengJie.filterTarget('',player,current));
                    return bool;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                selectTarget:1,
				filterTarget:function(card,player,target){
                    if(target.zhiLiao<1) return false;
					return target!=player;
				},
                content:function(){
                    'step 0'
                    target.changeZhiLiao(-1);
                    'step 1'
                    player.changeZhiLiao(1);
                },
                contentAfter:function(){
                    player.addGongJi();
                },
                ai:{
                    order:3.8,
                    result:{
                        target:-1,
                        player:2,
                    }
                }
            },
            shengJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                filter:function(event,player){
                    return event.customArgs.shengJi!=false;
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            tianQiang:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(event.getParent('phaseUse').tianQiang===false) return false;
                    return event.yingZhan!=true&&player.zhiLiao>=2;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-2);
                    'step 1'
                    trigger.wuFaYingZhan();
                    trigger.customArgs.shengJi=false;
                },
                check:function(event,player){
                    var num=Math.random();
                    return num>0.25;
                }
            },
            diQiang:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return event.yingZhan!=true&&player.zhiLiao>=1;
                },
                priority:1,
                async cost(event, trigger, player) {
                    var zhiLiao=player.zhiLiao;
                    var list=[];
                    for(var i=1;i<=zhiLiao;i++){
                        if(i>4) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var result=await player.chooseControl(list).set('prompt',"是否发动【地枪】<br>"+lib.translate.diQiang_info).set('ai',function(){
                        var num=_status.event.num;
                        if(num==2) return 'cancel2';
                        else return num-2;
                    }).set('num',list.length).forResult();
                    event.result = {
                        bool: result.control!='cancel2',
                        cost_data: result.control,
                    }
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-event.cost_data);
                    trigger.changeDamageNum(event.cost_data);
                    trigger.customArgs.shengJi=false;
                },
            },
            shengGuangQiYu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.changeZhiLiao(2,5);
                    event.getParent('phaseUse').tianQiang=false;
                    'step 2'
                    player.addGongJi();
                },
                ai:{
                    baoShi:true,
                    order:4,
                    result:{
                        player:2.5,
                    }
                }
            },
            //精灵射手
            yuanSuSheJi:{
                trigger:{player:'gongJiShi'},
                usable:1,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.xiBie(event.card)=='an') return false;
                    return player.countCards('h')>0||player.getCards('s',card=>card.hasGaintag('zhuFu')).length>0;
                },
                async cost(event, trigger, player) {
                    var prompt2="弃1张法术牌[展示]或移除1个【祝福】";
                    switch(get.xiBie(trigger.card)){
                        case 'huo':
                            prompt2+='本次攻击伤害额外+1';
                            break;
                        case'shui':
                            prompt2+="<span class='tiaoJian'>(主动攻击命中时)</span>目标角色+1[治疗]";
                            break;
                        case 'feng':
                            prompt2+="<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动]";
                            break;
                        case 'lei':
                            prompt2+="本次攻击无法应战";
                            break;
                        case 'di':
                            prompt2+="<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③";
                            break;
                    }
                    event.result=await player.chooseCard('hs',function(card){
                        if(get.position(card)=='h'){
                            return get.type(card)=='faShu';
                        }else if(get.position(card)=='s'){
                            return card.hasGaintag('zhuFu');
                        }
                    })
                    .set('prompt',get.prompt('yuanSuSheJi'))
                    .set('prompt2',prompt2)
                    .forResult();
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.yuanSuSheJi=true;
                    if(get.position(event.cards[0])=='h'){
                        var flag=true;
                    }    
                    if(flag){
                        player.discard(event.cards).set('showCards',true);
                    }else{
                        player.discard(event.cards,'zhuFu');
                    }
                    switch(get.xiBie(trigger.card)){
                        case 'huo':
                            player.logSkill('yuanSuSheJi_huo');
                            trigger.changeDamageNum(1);
                            break;
                        case'shui':
                            player.addTempSkill('yuanSuSheJi_shui');
                            break;
                        case 'feng':
                            player.addTempSkill('yuanSuSheJi_feng');
                            break;
                        case 'lei':
                            player.logSkill('yuanSuSheJi_lei');
                            trigger.wuFaYingZhan();
                            break;
                        case 'di':
                            player.addTempSkill('yuanSuSheJi_di');
                            break;
                    }

                },
                subSkill:{
                    huo:{},
                    lei:{},
                    shui:{
                        trigger:{source:'gongJiMingZhong'},
                        //direct:true,
                        filter:function(event,player){
                            return event.customArgs.yuanSuSheJi==true&&event.yingZhan!=true;
                        },
                        async cost(event, trigger, player){
                            event.result=await player.chooseTarget('水之矢：目标角色+1[治疗]',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            event.targets[0].changeZhiLiao(1);
                        }
                    },
                    feng:{
                        trigger:{player:'gongJiAfter'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.yuanSuSheJi==true;
                        },
                        content:function(){
                            player.addGongJi();
                        }
                    },
                    di:{
                        trigger:{source:'gongJiMingZhong'},
                        //direct:true,
                        filter:function(event,player){
                            return event.customArgs.yuanSuSheJi==true&&event.yingZhan!=true;
                        },
                        async cost(event, trigger, player){
                            event.result=await player.chooseTarget('地之矢：对目标角色造成1点法术伤害',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            event.targets[0].faShuDamage(1,player);
                        }
                    }
                }

            },
            dongWuHuoBan:{
                trigger:{source:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    return _status.currentPhase==player;
                },
                content:async function(event, trigger, player){
                    await event.trigger('dongWuHuoBan');
                    var target=player;
                    if(event.chongWuQiangHua){
                        var targets=await player.chooseTarget('目标角色摸1张牌[强制]，弃1张牌',true).set('ai',function(target){
                            var player=_status.event.player;
                            var num=target.countCards('h')-target.getHandcardLimit();
                            return target.side!=player.side&&num>=0;
                        }).forResult('targets');
                        target=targets[0];
                    }
                    await target.draw(1);
                    await target.chooseToDiscard(1,'h',true);
                },
                check:function(event,player){
                    if(player.canBiShaShuiJing()){
                        var bool=game.hasPlayer(function(current){
                            if(current.side==player.side) return false;
                            let num=current.countCards('h')-current.getHandcardLimit();
                            return num>=0;
                        });
                        if(bool) return true;
                    }
                    var num=player.getHandcardLimit()-player.countCards('h');
                    return num>0;
                }
            },
            jingLingMiYi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&!player.isHengZhi(); 
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    game.log(player,'将牌堆顶3张牌作为','【祝福】');
                    var cards=get.cards(3);
                    player.loseToSpecial(cards,'zhuFu',player);
                    player.markSkill('zhuFu');
                },
                group:['jingLingMiYi_chongZhi','jingLingMiYi_wuFaXingDongBefore','jingLingMiYi_wuFaXingDongAfter'],
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        //forced:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            return cards.length==0;
                        },
                        async cost(event, trigger, player) {
                            event.result=await player.chooseTarget("精灵秘仪：对目标角色造成2点法术伤害",true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,2);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            player.unmarkSkill('zhuFu');
                            'step 1'
                            event.targets[0].faShuDamage(2,player); 
                        }
                    },
                    wuFaXingDongBefore:{
                        trigger:{player:'wuFaXingDongBefore'},
                        direct:true,
                        filter:function(event,player){
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            return cards.length>0;
                        },
                        content:function(){
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            trigger.contentx[1].concat(cards);
                        },
                    },
                    wuFaXingDongAfter:{
                        trigger:{player:'wuFaXingDongAfter'},
                        direct:true,
                        filter:function(event,player){
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            return cards.length>0;
                        },
                        content:async function(event, trigger, player){
                            var zhuFu=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            });
                            await player.discard(zhuFu,'zhuFu');
                            game.log(player,`将牌堆顶${zhuFu.length}张牌作为`,'【祝福】');
                            var cards=get.cards(zhuFu.length);
                            await player.loseToSpecial(cards,'zhuFu',player);
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            chongWuQiangHua:{
                trigger:{player:'dongWuHuoBan'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    trigger.chongWuQiangHua=true;
                },
                check:function(event,player){
                    var bool=game.hasPlayer(function(current){
                        var num=current.countCards('h')-current.getHandcardLimit();
                        return current.side!=player.side&&num>=0;
                    });
                    return bool;
                }
            },
            zhuFu:{
                intro:{
                    mark:function(dialog,storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('zhuFu');
						});
                        if(!cards||!cards.length) return ;
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
					markcount:function(storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('zhuFu');
						});
                        return cards.length;
					},
                    
                },
                onremove:function(player, skill) {
                    const cards = player.getCards('s',function(card){
                        return card.hasGaintag('zhuFu');
                    });
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            //瘟疫法师
            buXiu:{
                trigger:{player:'faShuEnd'},
                filter:function(event,player){
                    return event.skill!='siWangZhiChu_backup';
                },
                content:function(){
                    player.changeZhiLiao(1);
                },
            },
            shengDu:{
                trigger:{player:'zhiLiao'},
                filter:function(event,player){
                    return !event.faShu;
                },
                forced:true,
                content:function(){
                    trigger.cancel();
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+3;
                    }
                }
            },
            wenYi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.wenYi.filterCard(card));
                },
                discard:true,
                showCards:true,
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                content:async function(event, trigger, player){
                    var shiQiListBefore=[get.shiQi(true),get.shiQi(false)];
                    await event.target.faShuDamage(1,player).set('wenYi',true);
                    var shiQiAfter=[get.shiQi(true),get.shiQi(false)];
                    if(shiQiListBefore[0]!=shiQiAfter[0]||shiQiListBefore[1]!=shiQiAfter[1]){
                        player.addTempSkill('wenYi_zhiLiao');
                    }
                },
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        content:function(){
                            player.changeZhiLiao(1);
                            player.removeSkill('wenYi_zhiLiao');
                        }
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:-0.5,
                    }
                }
            },
            siWangZhiChu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.zhiLiao<2) return false;
                    return player.countTongXiPai()>=2;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog('死亡之触：移除X点[治疗]','hidden');
                        var list=[];
                        for(var i=0;i<=player.zhiLiao;i++){
                            if(i<2) continue;
                            list.push(i);
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
                            filterTarget:true,
                            selectCard:[2,Infinity],
                            lose:false,
                            discard:false,
                            filterCard:function(card){
                                return get.xuanZeTongXiPai(card);
                            },
                            complexCard:true,
							content:function(){
								'step 0'
								event.links=lib.skill.siWangZhiChu_backup.links;
                                event.a=event.links[0];
                                event.b=cards.length;
                                player.changeZhiLiao(-event.a);
                                'step 1'
                                player.discard(cards).set('showCards',true);
                                'step 2'
                                target.faShuDamage(event.a+event.b-3,player);
							},
                            ai:{
                                result:{
                                    target:function(player, target){
                                        return get.damageEffect(target,2);
                                    }
                                }
                            }
						}
					},
                    prompt:function(links,player){
                        var num=links.length;
						return `弃置Y张同系牌[展示]至少2张，对目标角色造成(${num}+Y-3)点伤害`;
					},
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 1.3+player.zhiLiao;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            juDuXinXing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    target.faShuDamage(2,player);
                },
                contentAfter:function(){
                    player.changeZhiLiao(1);
                },
                ai:{
                    baoShi:true,
                    order:3.7,
                    result:{
                        target:function(player, target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            //魔剑士
            xiuLuoLianZhan:{
                usable:1,
                trigger:{player:"gongJiAfter"},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        filterCard:function(card,player,event){
                            if(get.xiBie(card)!='huo'||get.type(card)!='gongJi') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },
                        prompt:'修罗连斩：火系[攻击行动]',
                    });
                },
                check:function(event,player){
                    return player.hasCard(card=>get.xiBie(card)=='huo');
                },
                mod:{
                    aiUseful(player, card, num) {
                        if (get.xiBie(card, player) === "huo"&&get.type(card) === "gongJi") {
                            return num + 1;
                        }
                    },
                    aiOrder:function(player,card,num){
                        if(get.xiBie(card,player)=='huo'&&get.type(card)=='gongJi'){
                            return num-0.2;
                        }
                    }
                }
            },
            anYingNingJu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return !player.isHengZhi(); 
                },
                content:function(){
                    'step 0'
                    player.faShuDamage(1,player);
                    'step 1'
                    player.hengZhi();                 
                },
                check:function(event,player){
                    if(player.countCards('h',card=>get.type(card)=='faShu')==player.countCards('h')) return true;
                    var num=player.getHandcardLimit()-player.countCards('h');
                    return num>0;
                },
                group:'anYingNingJu_chongZhi',
                subSkill:{
                    chongZhi:{
                        direct:true,
                        trigger:{player:'xingDongBegin'},
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            player.chongZhi();
                        }
                    }
                }
            },
            anYingZhiLi:{
                forced:true,
                trigger:{player:'gongJiShi'},
				filter:function(event,player){
                   return player.isHengZhi();
				},
				content:function(){
					trigger.changeDamageNum(1);
				},
            },
            anYingKangJu:{
                mod:{
                    cardEnabled:function(card,player){
                        if(_status.currentPhase==player&&get.type(card)=='faShu'){
                            return false;
                        }
                    }
                }
            },
            anYingLiuXing:{
                type:'faShu',
                enable:'faShu',
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectTarget:1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    return player.countCards('h',card=>lib.skill.anYingLiuXing.filterCard(card))>=2;
                },
                discard:true,
                showCards:true,
                content:async function(event, trigger, player){
                    await event.target.faShuDamage(2,player);
                    var list=get.zhanJi(player.side);
                    if(list.length<2) return;
                    var listx=[];
                    for(var i=0;i<list.length;i++){
                        listx.push([list[i],get.translation(list[i])]);
                    }
                    var bool=list.includes('shuiJing')||list.length>=3;
                    var result=await player.chooseButton([
                        '是否额外移除2个星石',
                        [listx,'tdnodes'],
                    ])
                    .set('bool',bool)
                    .set('selectButton',[2,2])
                    .set('ai',function(button){
                        var bool=_status.event.bool;
                        if(!bool) return 0;
                        if(button.link=='shuiJing'){
                            return 5;
                        }else{
                            return 2;
                        }
                    }).forResult();
                    if(!result.bool) return;

                    var dict={shuiJing:0,baoShi:0};
                    for(var i=0;i<result.links.length;i++){
                        dict[result.links[i]]++;
                    }
                    if(dict.shuiJing>0) await player.changeZhanJi('shuiJing',-dict.shuiJing);
                    if(dict.baoShi>0) await player.changeZhanJi('baoShi',-dict.baoShi);
                    await player.chongZhi();
                    await player.addNengLiang('baoShi');
                },
                group:'anYingLiuXing_wuFaXingDong',
                subSkill:{
                    wuFaXingDong:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='anYingLiuXing_wuFaXingDong') return false;//需要排除自身，防止嵌套
                            if(player.countCards('h',card=>get.type(card)=='faShu')!=player.countCards('h')) return false;
                            return get.info('_wuFaXingDong').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                },
                ai:{
					order:function(item,player){
                        return 1.5+player.countCards('h');
                    },
					result:{
						target:function(player,target){
							return get.damageEffect(target,2);
						}
					},
				},
            },
            huanQuanZhengChan:{
                usable:1,
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    trigger.customArgs.huanQuanZhengChan=true;
                    trigger.wuFaYingZhan();
                },
                group:'huanQuanZhengChan_mingZhong',
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.huanQuanZhengChan==true;
                        },
                        content:function(){
                            'step 0'
                            var num=player.getHandcardLimit();
                            player.drawTo(num);
                            'step 1'
                            player.chooseToDiscard('h',true,2);
                        }
                    }
                },
                check:function(event,player){
                    if(get.xiBie(event.card)=='an') return false;
                    var target=event.targets[0];
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length<game.zhanJiMax) return true;
                    var minus=target.getHandcardLimit()-target.countCards('h');
                    var num=Math.random();
                    if(minus<2) return num>0.1;
                    else return num>0.5;
                },
                ai:{
                    baoShi:true,
                }
            },
            //血色剑灵
            xueSeJingJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('xianXue');
                }
            },
            chiSeYiShan:{
                trigger:{player:'gongJiAfter'},
                filter:function(event,player){
                    return player.countZhiShiWu('xianXue')>=1&&event.yingZhan!=true;
                },
                content:async function(event, trigger, player){
                    await player.removeZhiShiWu('xianXue');
                    await player.faShuDamage(2,player);
                    player.addGongJi();
                },
                check:function(event,player){
                    var shiQi=get.shiQi(player.side);
                    return shiQi>5;
                }

            },
            xueRanQiangWei:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('xianXue')>=2;
                },
                filterTarget:true,
                contentBefore:function(){
                    player.removeZhiShiWu('xianXue',2);
                },
                content:function(){
                    'step 0'
                    target.changeZhiLiao(-2);
                    'step 1'
                    player.chooseTarget('将我方角色[能量区]的1[水晶]翻面为[宝石]',true,function(card,player,target){
                        return player.side==target.side;
                    }).set('ai',function(target){
                        if(target.countNengLiang('shuiJing')>0) return 2;
                        else return 1;
                    });
                    'step 2'
                    if(result.bool){
                        event.target=result.targets[0];
                        if(result.targets[0].countNengLiang('shuiJing')){
                            event.target.removeNengLiang('shuiJing');
                        }else event.finish();
                    }else event.finish()
                    'step 3'
                    event.target.addNengLiang('baoShi');
                },
                contentAfter:function(){
                    'step 0'
                    if(player.hasMark('xueQiangWeiTingYuan')){
                        event.flag=true;
                        event.num=0;
                        event.targets=game.filterPlayer().sortBySeat(player);
                    }
                    'step 1'
                    if(event.flag){
                        if(event.num<event.targets.length){
                            event.targets[event.num].faShuDamage(1,player);
                            event.num++;
                            event.redo();
					    }
                    }
                },
                ai:{
                    order:function(item,player){
                        return 6-player.countCards('h');
                    },
                    result:{
                        target:function(player,target){
                            if(target.zhiLiao) return -target.zhiLiao;
                            return -0.1;
                        }
                    }
                }
            },
            xueQiPingZhang:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return player.countZhiShiWu('xianXue')>=1;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('xianXue');
                    trigger.num--;
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    }).set('ai',function(target){
                        return -get.damageEffect(target,1);
                    })
                    'step 2'
                    if(result.bool){
                        result.targets[0].faShuDamage(1,player);
                    }
                },
                check:function(event,player){
                    return player.countZhiShiWu('xianXue')>1;
                }
            },
            xueQiangWeiTingYuan:{
                intro:{
                    content:"<span class='tiaoJian'>(此卡在场时)</span>所有角色的[治疗]无法用于抵御伤害；<span class='tiaoJian'>(血色剑灵的回合结束时)</span>移除此卡。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/xueQiangWeiTingYuan.png',
                trigger:{global:'zhiLiao'},
                filter:function(event,player){
                    return player.hasZhiShiWu('xueQiangWeiTingYuan');
                },
                forced:true,
                firstDo:true,
                content:function(){
                    trigger.cancel();
                },
                group:'xueQiangWeiTingYuan_yiChu',
                subSkill:{
                    yiChu:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.hasZhiShiWu('xueQiangWeiTingYuan');
                        },
                        content:function(){
                            player.removeZhiShiWu('xueQiangWeiTingYuan');
                        },
                    }
                }
            },
            sanHuaLunWu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    var list=["[水晶]将【血蔷薇庭院】放置于场上，你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>","[宝石]将【血蔷薇庭院】放置于场上，无视你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>上限为你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>但你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>数最高为4，你弃到4张牌。"];
                    var choices=['选项一'];
                    if(player.canBiShaBaoShi()){
                        choices.push('选项二');
                    }
                    var result=await player.chooseControl(choices).set('choiceList',list).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '选项二';
                        return '选项一';
                    }).forResult();
                    if(result.control=='选项一'){
                        await player.removeBiShaShuiJing();
                        await player.addZhiShiWu('xueQiangWeiTingYuan');
                        await player.addZhiShiWu('xianXue',2);
                    }else if(result.control=='选项二'){
                        await player.removeBiShaBaoShi();
                        await player.addZhiShiWu('xueQiangWeiTingYuan');
                        await player.addZhiShiWu('xianXue',2,4);
                        if(player.countCards('h')>4){
                            var num=player.countCards('h')-4;
                            await player.chooseToDiscard('h',true,num);
                        }
                    }
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    if(player.countZhiShiWu('xianXue')+2>=3&&!player.canBiShaBaoShi()) return false;
                    return true;
                },
                ai:{
                    baoShi:true,
                    shuiJing:true,
                }
            },
            xianXue:{
                intro:{
                    name:'鲜血',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //祈祷师
            guangHuiXinYang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return target.side==player.side;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    if(player.countCards('h')>=2){
                        player.chooseToDiscard('h',true,2);
                    }else if(player.countCards('h')==1){
                        player.chooseToDiscard('h',true,1);
                    }
                    'step 2'
                    player.addZhanJi('baoShi',1);
                    'step 3'
                    target.changeZhiLiao(1);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.zhiLiaoEffect2(target,player,1);
                        },
                        player:function(player){
                            if(player.countCards('h')>=4) return 2;
                            else return 1;
                        }
                    }
                }
            },
            heiAnZuZhou:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    target.faShuDamage(2,player);
                    'step 2'
                    player.faShuDamage(2,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        },
                        player:function(player){
                            if(player.countCards('h')+2-player.zhiLiao>=player.getHandcardLimit()) return -1;
                            else return 1;
                        }
                    }
                }
            },
            weiLiCiFu:{
                type:'faShu',
                enable:'faShu',
                duYou:'weiLiCiFu',
                filter:function(event,player){
                    var bool1=player.hasCard(card=>lib.skill.weiLiCiFu.filterCard(card));
                    var bool2=game.hasPlayer(current=>lib.skill.weiLiCiFu.filterTarget("",player,current));
                    return bool1&&bool2;
                },
                selectCard:1,
                filterCard:function(card){
                    return card.hasDuYou('weiLiCiFu');
                },
                useCard:true,
                filterTarget:function(card,player,target){
                    if(target==player || target.side!=player.side) return false;
                    return lib.filter.targetEnabled({name:'weiLiCiFu'},player,target);
                },
                content:function(){
                    'step 0'
                    if(!target.hasSkill('weiLiCiFu_xiaoGuo')){
                        target.addSkill('weiLiCiFu_xiaoGuo');
                    }
                    'step 1'
                    target.addToExpansion(cards,'gain2',player).gaintag.add('weiLiCiFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"威",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        trigger:{source:'gongJiMingZhong'},
                        priority:-1,
                        filter:function(event,player){
                            return player.hasExpansions('weiLiCiFu_xiaoGuo');
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('weiLiCiFu_xiaoGuo'),'weiLiCiFu_xiaoGuo').set('visible',true);
                            trigger.changeDamageNum(2);
                            'step 1'
                            player.removeSkill('weiLiCiFu_xiaoGuo');
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        target:1,
                    }
                }
            },
            xunJieCiFu:{
                type:'faShu',
                enable:'faShu',
                duYou:"xunJieCiFu",
                filter:function(event,player){
                    var bool1=player.hasCard(card=>lib.skill.xunJieCiFu.filterCard(card));
                    var bool2=game.hasPlayer(current=>lib.skill.xunJieCiFu.filterTarget("",player,current));
                    return bool1&&bool2;
                },
                filterCard:function(card){
                    return card.hasDuYou('xunJieCiFu');
                },
                useCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player || target.side!=player.side) return false;
                    return lib.filter.targetEnabled({name:'xunJieCiFu'},player,target);
                },
                content:function(){
                    'step 0'
                    if(!target.hasSkill('xunJieCiFu_xiaoGuo')){
                        target.addSkill('xunJieCiFu_xiaoGuo');
                    }
                    'step 1'
                    target.addToExpansion(cards,'gain2',player).gaintag.add('xunJieCiFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"迅",
                        intro:{
                            content:'expansion',
                        },
                        onremove:function(player, skill) {
                            const cards = player.getExpansions(skill);
                            if (cards.length) player.loseToDiscardpile(cards);
                        },
                        //priority:1,
                        trigger:{player:['gongJiEnd','faShuEnd']},
                        filter:function(event,player){
                            if(event.yingZhan==true) return false;
                            return player.hasExpansions('xunJieCiFu_xiaoGuo');
                        },
                        content:function(){
                            'step 0'
                            player.discard(player.getExpansions('xunJieCiFu_xiaoGuo'),'xunJieCiFu_xiaoGuo').set('visible',true);
                            player.addGongJi();
                            'step 1'
                            player.removeSkill('xunJieCiFu_xiaoGuo');
                        },
                        check:function(event,player){
                            return player.canGongJi();
                        },
                        tag:{
                            jiChuXiaoGuo:true,
                        }
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        target:1,
                    }
                }
            },
            qiDao:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                },
                group:'qiDao_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        forced:true,
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            player.addZhiShiWu('qiDaoFuWen',2);
                        }
                    }
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    baoShi:true,
                    skillTagFilter:function(player,tag,arg){
                        if(tag=='baoShi'&&player.isHengZhi()) return false;
                    }
                }
            },
            faLiChaoXi:{
                trigger:{player:['faShuEnd']},
                usable:1,
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    player.addFaShu();
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    return player.canFaShu();
                }
            },
            qiDaoFuWen:{
                intro:{
                    name:'祈祷符文',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //红莲骑士
            xingHongShengYue:{
                usable:1,
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            xingHongXinYang:{
                trigger:{player:'zhiLiao'},
                forced:true,
                filter:function(event,player){
                    return event.source!=player;
                },
                content:function(){
                    trigger.cancel();
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+2;
                    }
                }
            },
            xueXingDaoYan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','血腥祷言：移除X点[治疗]，对自己造成X点法术伤害');
                    'step 1'
                    player.changeZhiLiao(-result.control);
                    player.faShuDamage(result.control,player);
                    player.storage.xueXingDaoYan=result.control;
                    'step 2'
                    event.links=[player.storage.xueXingDaoYan];
                    if(event.links[0]>1){
                        var num=2;
                        var propmt='选择1~2个目标队友';
                    }else{
                        var num=1;
                        var prompt='选择1个目标队友';
                    }
                    player.chooseTarget(function(card,player,target){
                        if(target==player) return false;
                        return target.side==player.side;
                    },[1,num],true,prompt).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 3'
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.links[0]);
                        event.goto(7);
                    }else{
                        result.targets.sortBySeat(player);
                        event.targets=result.targets;
                        event.target=event.targets[0];
                    }
                    'step 4'
                    var list=[];
                    for(var i=1;i<=event.links[0]-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.target);
                    var str=name+'获得几点[治疗]';
                    player.chooseControl(list).set('prompt',str);
                    'step 5'
                    event.target.changeZhiLiao(result.control);
                    event.links[0]-=result.control;
                    'step 6'
                    event.target=event.targets[1];
                    event.target.changeZhiLiao(event.links[0]);
                    'step 7'
                    player.addZhiShiWu('xueYin');
                },
                check:function(event,player){
                    if(player.countZhiShiWu('xueYin')>=lib.skill.xueYin.intro.max) return false;
                    var zhiLiaoPlayer=game.filterPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.zhiLiao<current.getZhiLiaoLimit();
                    });
                    return zhiLiaoPlayer.length>0;
                }
            },
            shaLuShengYan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.countZhiShiWu('xueYin')>0;
                },
                content:function(){
                    player.removeZhiShiWu('xueYin');
                    player.faShuDamage(4,player);
                    trigger.changeDamageNum(2);
                }
            },
            reXueFeiTeng:{
                forced:true,
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;//是否已经横置
                    if(event.player!=player) return false;
                    if(event.num>=0) return false;//增加士气无法发发动
                    if(event.cause!='damage') return false;//判断原因
                    return true;
                },
                content:function(){
                    player.hengZhi();
                },
                group:['reXueFeiTeng_xiaoGuo','reXueFeiTeng_chongZhi'],
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'chengShouShangHai'},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            trigger.shiQiXiaJiang=false;
                        },
                        ai:{
                            noShiQiXiaJiang:true,
                            skillTagFilter:function(player,tag,arg){
                                if(tag=='noShiQiXiaJiang'&&!player.isHengZhi()) return false;
                            }
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.changeZhiLiao(2);
                        }
                    }
                }
            },
            jieJiaoJieZao:{
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(!player.canBiShaShuiJing()) return false;
                    if(!player.isHengZhi()) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    player.addGongJiOrFaShu();
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
                
            },
            xingHongShiZi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(player.countZhiShiWu('xueYin')<1) return false;
                    if(player.countCards('h',card=>lib.skill.xingHongShiZi.filterCard(card))<2) return false;
                    return true;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:false,
                lose:false,
                filterTarget:true,
                contentBefore:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('xueYin');
                    'step 1'
                    player.discard(cards).set('showCards',true);
                },
                content:function(){
                    'step 0'
                    player.faShuDamage(4,player);
                    'step 1'
                    target.faShuDamage(3,player);
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        var num=3.1;
                        if(player.isHengZhi()) num+=2;
                        return num;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        },
                        player:function(player){
                            return get.damageEffect(player,4);
                        },
                    }
                }
            },
            xueYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //英灵人形
            zhanWenZhangWo:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('zhanWen',3);
                },
                fanZhuanZhanWen:function(player,num){
                    var num=num||1;
                    if(!player.hasZhiShiWu('zhanWen')) return;
                    var next=game.createEvent('fanZhuanZhanWen');
                    next.player=player;
                    if(num>player.countZhiShiWu('zhanWen')) num=player.countZhiShiWu('zhanWen');
                    next.num=num;
                    next.setContent(function(){
                        'step 0'
                        player.removeZhiShiWu('zhanWen',event.num);
                        'step 1'
                        player.addZhiShiWu('moWen',event.num);
                    });
                    return next;
                },
                fanZhuanMoWen:function(player,num){
                    var num=num||1;
                    if(!player.hasZhiShiWu('moWen')) return;
                    var next=game.createEvent('fanZhuanMoWen');
                    next.player=player;
                    if(num>player.countZhiShiWu('moWen')) num=player.countZhiShiWu('moWen');
                    next.num=num;
                    next.setContent(function(){
                        'step 0'
                        player.removeZhiShiWu('moWen',event.num);
                        'step 1'
                        player.addZhiShiWu('zhanWen',event.num);
                    });
                    return next;
                }

            },
            nuHuoYaZhi:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(event.nuHuoYaZhi==false) return false;
                    return player.countZhiShiWu('zhanWen')>=1;
                },
                content:function(){
                    lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player,1);
                    trigger.moWenRongHe=false
                },
                check:function(event,player){
                    var moWen=player.countZhiShiWu('moWen');
                    if(moWen==0) return true;
                    if(player.countYiXiPai()>=1) return false;
                    var zhanWen=player.countZhiShiWu('zhanWen');
                    if(zhanWen==1) return false;
                    return true;
                }
            },
            zhanWenSuiJi:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(player.countZhiShiWu('zhanWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',[2,Infinity],card=>get.xuanZeTongXiPai(card))
                        .set('complexCard',true)
                        .set('prompt',get.prompt('zhanWenSuiJi'))
                        .set('prompt2',lib.translate.zhanWenSuiJi_info)
                        .set('ai',function(card){
                            return 1;
                        })
                        .forResult();
                },
                content:async function(event, trigger, player){
                    var num=event.cards.length-1;
                    var zhanWenNum=1;
                    if(player.isHengZhi()&&player.countZhiShiWu('zhanWen')>1){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('zhanWen')-1;i++){
                            list.push(i);
                        }
                        var control=await player.chooseControl(list).set('prompt',`额外翻转Y个【战纹】，本次攻击伤害额外+(${num}+Y)`).set('ai',function(){
                            return list.length;
                        }).set('num',list.length).forResultControl();
                        if(control>0){
                            num+=control;
                            zhanWenNum+=control;
                        }
                    }
                    await lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player,zhanWenNum);
                    await player.discard(event.cards).set('showCards',true);
                    trigger.changeDamageNum(num);
                }
            },
            moWenRongHe:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.moWenRongHe==false) return false;
                    if(player.countZhiShiWu('moWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    return player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',[2,Infinity],card=>get.xuanZeYiXiPai(card))
                        .set('complexCard',true)
                        .set('prompt',get.prompt('moWenRongHe'))
                        .set('prompt2',lib.translate.moWenRongHe_info)
                        .set('ai',function(card){
                            return 1;
                        })
                        .forResult();
                },
                content:async function(event, trigger, player){
                    trigger.nuHuoYaZhi=false;
                    var num=event.cards.length-1;
                    var moWenNum=1;
                    if(player.isHengZhi()&&player.countZhiShiWu('moWen')>1){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('moWen')-1;i++){
                            list.push(i);
                        }
                        var control=await player.chooseControl(list).set('prompt',`额外翻转Y个【魔纹】，本次法术伤害为${num}+Y`).set('ai',function(){
                            return list.length;
                        }).set('num',list.length).forResultControl();
                        if(control>0){
                            num+=control;
                            moWenNum+=control;
                        }
                    }
                    await lib.skill.zhanWenZhangWo.fanZhuanMoWen(player,moWenNum);
                    await player.discard(event.cards).set('showCards',true);
                    await trigger.player.faShuDamage(num,player);
                }
            },
            fuWenGaiZao:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    player.draw(1);
                    'step 3'
                    var list=[];
                    for(var i=0;i<=3;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','选择【战纹】数量').set('ai',function(){
                        var num=Math.random();
                        if(num>0.5) return 1;
                        else return 2;
                    });
                    'step 4'
                    var num=result.control;
                    if(player.countZhiShiWu('zhanWen')>num){
                        lib.skill.zhanWenZhangWo.fanZhuanZhanWen(player,player.countZhiShiWu('zhanWen')-num);
                    }else if(player.countZhiShiWu('zhanWen')<num){
                        lib.skill.zhanWenZhangWo.fanZhuanMoWen(player,num-player.countZhiShiWu('zhanWen'));
                    }
                },
                check:function(event,player){
                    return player.canGongJi();
                },
                group:['fuWenGaiZao_chongZhi'],
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isHengZhi()) return num+1;
                    },
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi'&&player.isHengZhi()) return num+1;
                    }
                },
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                },
                ai:{
                    baoShi:true,
                }
            },
            shuangChongHuiXiang:{
                usable:1,
                trigger:{source:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(trigger.num>3){
                        event.num=3;
                    }else{
                        event.num=trigger.num;
                    }
                    'step 2'
                    var str='对另一名目标角色造成'+event.num+'点法术伤害';
                    player.chooseTarget(str,true,function(card,player,target){
                        return target!=_status.event.trigger_player;
                    }).set('trigger_player',trigger.player).set('ai',function(target){
                        return -get.attitude(player, target);
                    });
                    'step 3'
                    if(result.bool){
                        var next=result.targets[0].faShuDamage(event.num,player);
                        next.set('shiQiXiaJiang',false);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            zhanWen:{
                intro:{
                    name:'战纹',
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/zhanWen.png',
            },
            moWen:{
                intro:{
                    name:'魔纹',
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/moWen.png',
            },
            //神官
            shenShengQiShi:{
                trigger:{player:'teShuEnd'},
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            shenShengQiFu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.shenShengQiFu.filterCard(card))>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                discard:true,
                showCards:true,
                content:function(){
                    player.changeZhiLiao(2);
                },
                ai:{
                    order:3.6,
                    result:{
                        player:function(player){
                            return get.zhiLiaoEffect(player,2);
                        },
                    }
                }
            },
            shuiZhiShenLi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.shuiZhiShenLi.filterCard(card))>=1;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                discard:true,
                showCards:true,
                filterTarget:function(card,player,target){
                    return target.side==player.side&&target!=player;
                },
                content:function(){
                    'step 0'
                    if(player.countCards('h')>0){
                        player.chooseCard('h','交给目标队友1张牌',true,1);
                    }
                    'step 1'
                    if(result.bool){
                        player.give(result.cards[0],target);
                    }
                    'step 2'
                    player.changeZhiLiao(1);
                    'step 3'
                    target.changeZhiLiao(1,player);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')+1<=target.getHandcardLimit()){
                                return 1.5;
                            }else{
                                return -1;
                            }
                        },
                        player:1,
                    }
                }
            },
            shengShiShouHu:{
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+4;
                    }
                },
                trigger:{player:'zhiLiaoSheZhi'},
                forced:true,
                content:function(){
                    trigger.zhiLiaoLimit=1;
                }
                
            },
            shenShengQiYue:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.zhiLiao>0;
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    var control=await player.chooseControl(list).set('prompt','转移[治疗]数量').set('num',list.length-1).set('ai',function(){
                        var num=_status.event.num;
                        if(num>3) return 3;
                        return _status.event.num;
                    }).forResultControl();

                    var targets=await player.chooseTarget('目标队友+'+control+'点[治疗]',true,function(card,player,target){
                        return target.side==player.side&&target!=player;
                    }).set('ai',function(target){
                        var num=_status.event.control;
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,num);
                    }).set('num',control).forResultTargets();
                    var target=targets[0];
					if(control>0){
						await player.changeZhiLiao(-control);
                        await target.changeZhiLiao(control,4,player).set('zhuanYi',true);
					}
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    if(player.zhiLiao<=1) return false;
                    if(player.getCards('h')==0&&player.countNengLiangAll()<=1) return false;
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    return game.hasPlayer(function(current){
                        if(current.side!=player.side) return false;
                        if(current.zhiLiao+2<=4) return true;
                        return false;
                    });
                }
            },
            shenShengLingYu:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event, trigger, player){
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(2,true,'h');
                    var choiceList=["<span class='tiaoJian'>(移除你的1[治疗])</span>对目标角色造成2点法术伤害③","你+2[治疗]，目标队友+1[治疗]"];
                    var list=['选项二'];
                    if(player.zhiLiao>0){
                        list.unshift('选项一');
                    }
                    var control=await player.chooseControl(list).set('prompt','神圣领域').set('choiceList',choiceList).set('ai',function(event,player){
                        if(player.zhiLiao+2>=player.getZhiLiaoLimit()) return '选项一';
                        else return '选项二';
                    }).forResultControl();
                    'step 2'
                    if(control=='选项一'){
                        await player.changeZhiLiao(-1);
                        var targets=await player.chooseTarget('对目标角色造成2点法术伤害③',true).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,2);
                        }).forResultTargets();
                        var target=targets[0];
                        await target.faShuDamage(2,player);
                    }else if(control=='选项二'){
                        await player.changeZhiLiao(2);
                        var targets=await player.chooseTarget('目标队友+1[治疗]',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            return get.zhiLiaoEffect2(target,player,1);
                        }).forResultTargets();
                        var target=targets[0];
                        await target.changeZhiLiao(1,player);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }       
            },
            //阴阳师
            shiShenJiangLin:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.countTongMingPai()>=2;
                },
                discard:true,
                showCards:true,
                selectCard:2,
                filterCard:function(card,player){
                    return get.xuanZeTongMingPai(card);
                },
                complexCard:true,
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.addZhiShiWu('guiHuo');
                    player.addGongJi();
                },
                ai:{
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            yinYangZhanHuan:{
                enable:['yingZhan'],
                filter:function(event,player){
                    var event=_status.event;
                    if(event.canYingZhan==false) return false;
                    var mingGe=get.mingGe(event.card);
                    return player.hasCard(card=>get.mingGe(card)==mingGe&&get.type(card)=='gongJi');
                },
                filterCard:function(card,player,event){
                    var event=_status.event;
                    var mingGe=get.mingGe(event.card);
                    return get.mingGe(card)==mingGe&&get.type(card)=='gongJi';
                },
                position:'h',
                viewAs:function(cards,player){
                    var event=_status.event;
					return {name:get.name(event.card),xiBie:get.xiBie(event.card),isCard:true};
				},
                group:['yinYangZhanHuan_xiaoGuo'],
                ai:{
                    order:5,
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'gongJiBefore'},
                        firstDo:true,
                        direct:true,
                        priority:1,
                        filter:function(event,player){
                            return event.skill=='yinYangZhanHuan';
                        },
                        content:function(){
                            'step 0'
                            player.addZhiShiWu('guiHuo');
                            game.setXiBie(trigger.card,get.xiBie(trigger.cards[0]));
                            'step 1'
                            event.trigger('yinYangZhanHuan');
                            'step 2'
                            if(player.isHengZhi()){
                                player.chongZhi();
                            }else{
                                event.finish();
                            }
                            'step 3'
                            trigger.damageNum=player.countZhiShiWu('guiHuo');
                        }
                   } 
                }
            },
            shiShenZhuanHuan:{
                trigger:{player:'yinYangZhanHuan'},
                content:function(){
                    player.draw(1);
                    player.addZhiShiWu('guiHuo');
                },
                check:function(event,player){
                    if(player.countZhiShiWu('guiHuo')>2) return false;
                    if(player.countCards('h')+1<=player.getHandcardLimit()) return true;
                    return false;
                }
            },
            heiAnJiLi:{
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    return player.countZhiShiWu('guiHuo')>=get.info('guiHuo').intro.max;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('guiHuo',player.countZhiShiWu('guiHuo'));
                    'step 1'
                    player.chooseTarget('对目标角色造成2点法术伤害③',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target, player, 2);
                    });
                    'step 2'
                    if(result.bool){
                        result.targets[0].faShuDamage(2,player);
                    }
                }
            },
            shiShenZhouShu:{
                trigger:{global:'shouDaoGongJiBefore'},
                filter:function(event,player){
                    if(player.countCards('h')==0) return false;
                    if(event.yingZhan==true) return false;
                    if(event.target.side!=player.side) return false;
                    if(event.target==player) return false;
                    if(event.canYingZhan==false) return false;
                    if(!player.isHengZhi()) return false;
                    var zhanJi=get.zhanJi(player.side);
                    if(zhanJi.length<2) return false;
                    var count=zhanJi.filter(xingShi=>xingShi=='baoShi').length;
                    if(count==0) return false;
                    return true;
                },
                popup:false,
                async cost(event,trigger,player){
                    event.source=trigger.player;
					event.yingZhan=trigger.yingZhan;
					event.card=trigger.card;
					var name=get.translation(event.source);
                    var name2=get.translation(trigger.target);
					var propmt=`${name2}受到${name}的`;
					propmt+=get.translation(get.xiBie(event.card))+'系主动攻击，';
					propmt+=get.prompt('shiShenZhouShu');
					event.result=await player.yingZhan(propmt)
                    .set('filterCard',function(card,player,event){
						if(get.type(card)=='gongJi'){
							if(_status.event.canYingZhan==false) return false;//不能应战设置
							if(get.name(card)!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.card)) return false;
						}else if(get.type(card)=='faShu'){
                            return false;
                        }
						return lib.filter.cardEnabled(card,player,'forceEnable');
					})
					.set('filterTarget',function(card,player,target){
						if(target==_status.event.source) return false;
						if(target.side==player.side) return false;
						return lib.filter.targetEnabled(card,player,target);
                    })
					.set('card',event.card)
                    .set('source',event.source)
                    .set('yingZhan',true)
					.set('canYingZhan',trigger.canYingZhan)
					.set('canShengGuang',trigger.canShengGuang)
                    .set('shiShenZhouShu',true)
                    .set('prompt2',lib.translate.shiShenZhouShu_info)
                    .forResult();
                },
                content:function(){
                    trigger.weiMingZhong();
                },
                group:'shiShenZhouShu_tiaoJian',
                subSkill:{
                    tiaoJian:{
                        trigger:{player:'gongJiBefore'},
                        direct:true,
                        firstDo:true,
                        filter:function(event,player){
                            return event.getParent().shiShenZhouShu==true;
                        },
                        content:function(){
                            'step 0'
                            player.logSkill('shiShenZhouShu');
                            var list=get.zhanJi(player.side);
                            var listx=[];
                            for(var i=0;i<list.length;i++){
                                listx.push([list[i],get.translation(list[i])]);
                            }
                            var next=player.chooseButton([
                                '移除1[宝石]1[水晶]',
                                [listx,'tdnodes'],
                            ]);
                            next.set('forced',true);
                            next.set('selectButton',2);
                            next.set('filterOk',function(){
                                for(var i in ui.selected.buttons){
                                    if(ui.selected.buttons[i].link=='baoShi') return true;
                                }
                            });
                            'step 1'
                            event.dict={baoShi:0,shuiJing:0};
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='baoShi'){
                                    event.dict.baoShi++;
                                }else if(result.links[i]=='shuiJing'){
                                    event.dict.shuiJing++;
                                }
                            }
                            if(event.dict.baoShi>0){
                                player.removeZhanJi('baoShi',event.dict.baoShi);
                            }
                            if(event.dict.shuiJing>0){
                                player.removeZhanJi('shuiJing',event.dict.shuiJing);
                            }
                        }
                    }
                }
            },
            shengMingJieJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('生命结界','hidden');
                        var list=[['1',"目标队友+1[宝石]并+1[治疗]；然后对自己造成X点法术伤害③，X为你的<span class='hong'>【鬼火】</span>数。(若X为3)本次法术伤害③不会造成我方士气下降"],['2',"<span class='tiaoJian'>(仅【式神形态】下，弃2张命格相同的手牌[展示])</span>[重置]脱离【式神形态】目标队友弃1张牌"]]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            if(!player.isHengZhi()) return false;
                            return player.countTongMingPai()>=2;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['shengMingJieJie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['shengMingJieJie_2']);
                        }
						return next;
					},
                    prompt:function(links,player){
                        if(links[0]=='1'){
                            return '目标队友+1[宝石]并+1[治疗]'
                        }else{
                            return '弃2张命格相同的手牌[展示]，目标队友弃1张牌'
                        }  
                    },
                    check:function(button){
                        return Math.random();
                    }
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        content:async function(event, trigger, player){
                            await player.removeBiShaShuiJing();
                            await player.addZhiShiWu('guiHuo');
                            var target=event.target;
                            await target.addNengLiang('baoShi');
                            await target.changeZhiLiao(1);
                            var num=player.countZhiShiWu('guiHuo');
                            if(num==3){
                                await player.faShuDamage(num,player)
                                .set('shiQiXiaJiang',false);
                            }else{
                                await player.faShuDamage(num,player);
                            }
                        },
                        ai:{
                            result:{
                                target:function(player,target){
                                    return target.getNengLiangLimit()-target.countNengLiangAll();
                                }
                            }
                        }
                    },
                    2:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        selectCard:2,
                        filterCard:function(card,player){
                            return get.xuanZeTongMingPai(card);
                        },
                        complexCard:true,
                        discard:false,
                        lose:false,
                        content:async function(event, trigger, player){
                            await player.removeBiShaShuiJing();
                            await player.addZhiShiWu('guiHuo');
                            await player.discard(event.cards).set('showCards',true);
                            await player.chongZhi();
                            await event.target.chooseToDiscard(1,true);
                        },
                        ai:{
                            result:{
                                target:function(player,target){
                                    return target.countCards('h')-1;
                                }
                            }
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            guiHuo:{
                intro:{
                    name:'鬼火',
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //苍炎魔女
            cangYanFaDian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.cangYanFaDian.filterCard(card));
                },
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                discard:true,
                showCards:true,
                content:function(){
                    'step 0'
                    target.faShuDamage(2,player);
                    'step 1'
                    player.faShuDamage(2,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            tianHuoDuanKong:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.countZhiShiWu('chongSheng')<1&&!player.isHengZhi()) return false;
                    return player.countCards('h',card=>lib.skill.tianHuoDuanKong.filterCard(card))>1;
                },
                selectCard:2,
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectTarget:1,
                filterTarget:true,
                discard:true,
                showCards:true,
                content:function(){
                    'step 0'
                    if(!player.isHengZhi()){
                        player.removeZhiShiWu('chongSheng');
                    }
                    event.num=3;
                    var shiQi1=get.shiQi(player.side);
                    var shiQi2=get.shiQi(target.side);
                    if(shiQi1<shiQi2){
                        event.num++;
                    }
                    'step 1'
                    target.faShuDamage(event.num,player);
                    'step 2'
                    player.faShuDamage(event.num,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        }
                    }
                }
            },
            moNvZhiNu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.countCards('h')<4;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.chooseDraw(2,true);
                },
                check:function(event,player){
                    var num=player.countCards('h',function(card){
                        if(get.type(card)!='gongJi') return false;
                        var xiBie=get.xiBie(card);
                        if(xiBie=='shui'||xiBie=='an') return false;
                        return true;
                    });
                    if(num>=2){
                        var players=game.filterPlayer(function(current){
                            if(current.side==player.side) return false;
                            let num=current.getHandcardLimit()-current.countCards('h');
                            return num<=2;
                        });
                        return players.length>0;
                    }
                    return false;
                },
                group:['moNvZhiNu_chongZhi','moNvZhiNu_showCards','moNvZhiNu_mod'],
                subSkill:{
                    mod:{
                        mod:{
                            maxHandcard:function(player,num){
                                if(player.isHengZhi()){
                                    return num+player.countZhiShiWu('chongSheng')-2;
                                }
                            },
                            cardXiBie:function(card,player,xiBie){
                                if(get.type(card)!='gongJi'||!player.isHengZhi()) return;
                                if(xiBie=='an' ||xiBie=='shui') return;
                                return 'huo';
                            }
                        },
                    },
                    chongZhi:{
                        trigger:{player:'xingDongBefore'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    },
                    showCards:{
                        trigger:{player:'showCardsBefore'},
                        filter:function(event,player){
                            return event.cards.length>0&&player.isHengZhi()&&event.getParent().name=='discard'&&event.getParent().player==player;
                        },
                        direct:true,
                        content:async function(event, trigger, player){
                            var cards=[];
                            for(var card of trigger.cards){
                                if (get.type(card,player) != 'gongJi' || ['shui', 'an', 'huo'].includes(get.xiBie(card,player))) {
                                    cards.push(card);
                                    continue;
                                }
                                var tempCard=game.createCard(card.name,'huo',get.mingGe(card,player),card.duYou);
                                cards.push(tempCard);
                            }
                            trigger.cards=cards;
                        }
                    }
                }
            },
            tiShenWanOu:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return event.faShu!=true&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCardTarget({
                        filterCard:function(card){
                            return get.type(card)=='faShu';
                        },
                        selectCard:1,
                        filterTarget:function(card,player,target){
                            return target!=player&&target.side==player.side;
                        },
                        prompt:get.prompt('tiShenWanOu'),
                        prompt2:lib.translate.tiShenWanOu_info,
                        ai1:function(card){
                            return 6-get.value(card);
                        },
                        ai2:function(target){
                            if(target.getHandcardLimit()-target.countCards('h')>=1){
                                return 1;
                            }else{
                                return 0;
                            }
                        }
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                    event.target=event.targets[0];
                    'step 2'
                    event.target.draw(1);
                }
            },
            yongShengYinShiJi:{
                forced:true,
                trigger:{player:'changeShiQiEnd'},
                filter:function(event,player){
                    if(event.player!=player) return false;
                    if(event.num>=0) return false;
                    if(event.faShu!=true) return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('chongSheng');
                }
            },
            tongKuLianJie:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.faShuDamage(1,player);
                    'step 2'
                    player.faShuDamage(1,player);
                    'step 3'
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,player.countCards('h')-3);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,1);
                        },
                        player:function(player){
                            if(player.countCards('h')>3) return 1;
                        },
                    }
                }
            },
            moNengFanZhuan:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    return player.canBiShaShuiJing()&&player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCardTarget({
                        selectCard:[2,Infinity],
                        filterCard:function(card){
                            return get.type(card)=='faShu'
                        },
                        filterTarget:function(card,player,target){
                            return target.side!=player.side;
                        },
                        prompt:get.prompt('moNengFanZhuan'),
                        prompt2:lib.translate.moNengFanZhuan_info,
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    event.num=event.cards.length-1;
                    player.discard(event.cards).set('showCards',true);
                    event.target=event.targets[0];
                    'step 2'
                    event.target.faShuDamage(event.num,player);
                },
                ai:{
                    shuiJing:true,
                }
            },
            chongSheng:{
                intro:{
                    content:'mark',
                    name:'重生',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',

            },
            //贤者
            zhiHuiFaDian:{
                mod:{
                    maxNengLiang:function(player,num){
                        return num+1;
                    }
                },
                forced:true,
                trigger:{player:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return event.num>3;
                },
                content:function(){
                    'step 0'
                    player.addNengLiang('baoShi',2);
                    'step 1'
                    if(player.countCards('h')>0){
                        player.chooseToDiscard('h',true);
                    }
                }
            },
            faShuFanTan:{
                trigger:{player:'chengShouShangHaiAfter'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(event.num!=1) return false;
                    return player.countCards('h')>1;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCardTarget({
                        filterCard:function(card){
                            if(ui.selected.cards.length==0) return true;
                            if(get.xiBie(card)==get.xiBie(ui.selected.cards[0])) return true;
                            return false;
                        },
                        selectCard:[2,Infinity],
                        filterTarget:true,
                        complexCard:true,
                        prompt:get.prompt('faShuFanTan'),
                        prompt2:lib.translate.faShuFanTan_info,
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2:function(target){
							var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
						},
                    }).forResult();
                },
                content:function(){
                   'step 0'
                    player.discard(event.cards).set('showCards',true);
                    event.num=event.cards.length;
                    event.target=event.targets[0];
                    'step 2'
                    event.target.faShuDamage(event.num-1,player);
                    'step 3'
                    player.faShuDamage(event.num,player);
                },
                ai:{
                    one_damage:true,
                }
            },
            moDaoFaDian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return player.countYiXiPai()>1;
                },
                selectTarget:1,
                filterTarget:true,
                selectCard:[2,Infinity],
                filterCard:function(card,player){
                    return get.xuanZeYiXiPai(card);
                },
                complexCard:true,
                discard:false,
                lose:false,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.discard(cards).set('showCards',true);
                    'step 2'
                    target.damageFaShu(cards.length-1,player);
                    'step 3'
                    player.damageFaShu(cards.length-1,player);
                },
                ai:{
                    baoShi:true,
                    order:3.7,
                    result:{
                        target:function(player,target){
                            if(player.countTongXiPai()<3) return 0;
                            return get.damageEffect(target,2);
                        },
                    }
                }
            },
            shengJieFaDian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return player.countYiXiPai()>2;
                },
                filterCard:function(card,player){
                    return get.xuanZeYiXiPai(card);
                },
                selectCard:[3,Infinity],
                complexCard:true,
                discard:false,
                lose:false,
                selectTarget:function(){
                    return [1,ui.selected.cards.length-2];
                },
                filterTarget:true,
                filterOk:function(event,player){
                    return ui.selected.targets.length<=ui.selected.cards.length-2;
                },
                contentBefore:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.discard(cards).set('showCards',true);
                },
                content:function(){
                    if(target){
                        target.changeZhiLiao(2);
                    }
                },
                contentAfter:function(){
                    player.faShuDamage(cards.length-1,player);
                },
                ai:{
                    baoShi:true,
                    order:3.3,
                    result:{
                        target:function(player,target){
                            if(player.side!=target.side) return 0;
                            return get.zhiLiaoEffect(target,2)-0.1;
                        },
                    }
                }
            },
            //魔弓
            moGuanChongJi:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length==0) return false;
                    if(event.yingZhan==true) return false;
                    if(event.getParent('phaseUse').moGuanChongJi==false) return false;
                    if(event.targets[0].countCards('h')>=event.targets[0].getHandcardLimit()) return false;
                    return true;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('chongNengPai');
                    var result=await player.chooseCardButton(cards,'是否发动【魔贯冲击】，弃1张火系【充能】,本次攻击伤害额外+1')
                        .set('filterButton',function(button){
                            return get.xiBie(button.link)=='huo';
                        })
                        .set('ai',function(button){
                            if(get.xiBie(button.link)=='huo') return 1;
                            return 0;
                        }).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'chongNengPai').set('showHiddenCards',true);
                    trigger.changeDamageNum(1);
                    trigger.customArgs.moGuanChongJi=true;
                    trigger.getParent('phaseUse').duoChongSheJi=false;
                },
                group:['moGuanChongJi_mingZhong','moGuanChongJi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            if(event.customArgs.moGuanChongJi!=true) return false;
                            var cards=player.getExpansions('chongNengPai');
                            if(cards.length==0) return false;
                            return true; 
                        },
                        async cost(event,trigger,player){
                            var cards=player.getExpansions('chongNengPai');
                            var result=await player.chooseCardButton(cards,'是否发动【魔贯冲击】，移除1张火系【充能】,本次攻击伤害额外+1')
                                .set('filterButton',function(button){
                                    return get.xiBie(button.link)=='huo';
                                })
                                .set('ai',function(button){
                                    if(get.xiBie(button.link)=='huo') return 1;
                                    return 0;
                                }).forResult();
                            event.result={
                                bool:result.bool,
                                cost_data:result.links,
                            };
                        },
                        content:function(){
                            'step 0'
                            player.discard(event.cost_data,'chongNengPai').set('showHiddenCards',true);
                            trigger.changeDamageNum(1);
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return event.customArgs.moGuanChongJi;
                        },
                        direct:true,
                        content:function(){
                            trigger.player.faShuDamage(3,player);
                        }
                    }
                }

            },
            leiGuangSanShe:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(event.getParent('phaseUse').leiGuangSanShe==false) return false;
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='lei') return true;
                    }
                    return false;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('雷光散射：移除1+X个雷系【充能】[展示]','hidden');
                        var cards=player.getExpansions('chongNengPai');
                        dialog.add(cards);
                        return dialog;
                    },
                    select:[1,Infinity],
                    filter:function(button,player){
                        return get.xiBie(button.link)=='lei';
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:-1,
                            filterTarget:function(card,player,target){
                                return player.side!=target.side;
                            },
                            contentBefore:function(){
                                'step 0'
                                event.links=lib.skill.leiGuangSanShe_backup.links;
                                player.discard(event.links,'chongNengPai').set('showHiddenCards',true);
                                for(var target of targets){
                                    target.storage.leiGuangSanShe=1;
                                }
                                'step 1'
                                event.num=event.links.length-1;
                                if(event.num>0){
                                    player.chooseTarget('对其造成的伤害额外+'+event.num,true,function(card,player,target){
                                        return target.side!=player.side;
                                    }).set('ai',function(target){
                                        return -get.damageEffect(target,2);
                                    });
                                }else{
                                    event.finish();
                                }
                                'step 2'
                                game.log(player,'选择了',result.targets[0],'伤害额外+'+event.num);
                                result.targets[0].storage.leiGuangSanShe+=event.num;
                            },
                            content:function(){
                                target.faShuDamage(target.storage.leiGuangSanShe,player);

                            },
                            contentAfter:function(){
                                for(var target of targets){
                                    delete target.storage.leiGuangSanShe;
                                }
                            }
                        }
                    },
                    check:function(button){
                        if(get.xiBie(button.link)=='lei') return 1;
                        return 0;
                    }
                },
                ai:{
                    order:function(item,player){
                        var cards=player.getExpansions('chongNengPai');
                        var num=1.5;
                        for(var i=0;i<cards.length;i++){
                            if(get.xiBie(cards[i])=='lei') num+=0.7;
                        }
                        return num;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            duoChongSheJi:{
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length==0) return false;
                    if(event.yingZhan==true) return false;
                    if(event.getParent('phaseUse').duoChongSheJi==false) return false;
                    return true;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('chongNengPai');
                    var result=await player.chooseCardButton(cards,'是否发动【多重射击】')
                        .set('filterButton',function(button){
                            return get.xiBie(button.link)=='feng';
                        })
                        .set('ai',function(button){
                            if(get.xiBie(button.link)=='feng') return 1;
                            return 0;
                        }).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'chongNengPai').set('showHiddenCards',true);
                    trigger.getParent('phaseUse').moGuanChongJi=false;
                    var bool=game.hasPlayer(function(current){
                        if(current==trigger.oriTarget) return false;
                        return player.canUse('anMie',current);
                    });
                    if(bool){
                        player.chooseTarget(true,function(card,player,target){
                            if(target==_status.event.trigger_target) return false;
                            return player.canUse('anMie',target);
                        }).set('trigger_target',trigger.oriTarget);
                    }else event.finish();
                    'step 1'
                    if(result.targets){
                        player.useCard({name:'anMie',xiBie:'an'},result.targets[0]).set('duoChongSheJi',true);
                    }
                },
                group:['duoChongSheJi_1'],
                subSkill:{
                    1:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return event.duoChongSheJi==true;
                        },
                        content:function(){
                            trigger.changeDamageNum(-1);
                        }
                    }

                }
            },
            chongNeng:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(player.countCards('h')>4){
                        player.chooseToDiscard(true,player.countCards('h')-4);
                    }
                    'step 2'
                    player.chooseDraw(4,true);
                    'step 3'
                    event.num=result.control;
                    if(event.num==0){
                        event.goto(6);
                    }
                    'step 4'
                    player.chooseCard('h',[1,event.num]).set('prompt',`将至多${event.num}张手牌作为充能`).set('ai',function(card){
                        var player=_status.event.player;
                        if(ui.selected.cards.length+1>=player.countCards('h')) return 0;
                        var xiBie=get.xiBie(card);
                        if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                        return 0;
                    });
                    'step 5'
                    if(result.cards){
                        player.addToExpansion('draw',result.cards,'log').gaintag.add('chongNengPai');
                    }
                    'step 6'
                    trigger.moGuanChongJi=false;
                    trigger.leiGuangSanShe=false;
                },
                check:function(event,player){
                    if(player.countNengLiang('baoShi')>0) return false;
                    if(player.countCards('h',function(card){
                        var xiBie=get.xiBie(card);
                        if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return true;
                        return false;
                    })<3) return true;
                    return true;
                },
                ai:{
                    shuiJing:true,
                }
            },
            moYan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var choiceList=['目标角色弃1张牌','你摸3张牌[强制]'];
                    player.chooseControl().set('prompt','魔眼').set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')<2){
                            return '选项二'
                        }else{
                            return '选项一'
                        }
                    });
                    'step 2'
                    if(result.control=='选项一'){
                        event.goto(3);
                    }else{
                        event.goto(5);
                    }
                    'step 3'
                    player.chooseTarget(true,'目标角色弃1张牌').set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side){
                            return 5;
                        }
                        return target.countCards('h');
                    });
                    'step 4'
                    result.targets[0].chooseToDiscard('h',true);
                    event.goto(6);

                    'step 5'
                    player.draw(3);
                    'step 6'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',1,true).set('prompt','将自己1张手牌作为充能').set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                            return 0;
                        });
                    }else{
                        event.goto(8);
                    }
                    'step 7'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('chongNengPai');
                    'step 8'
                    player.addNengLiang('shuiJing',1);
                },
                ai:{
                    baoShi:true,
                }
            },
            chongNengPai:{
                intro:{
                    name:'充能',
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('chongNengPai');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                trigger:{player:'addToExpansionAfter'},
                filter:function(event,player){
                    return event.gaintag.includes('chongNengPai')&&player.getExpansions('chongNengPai').length>8;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('chongNengPai');
                    player.chooseCardButton(cards,'舍弃'+(cards.length-8)+'张【充能】',true,cards.length-8);
                    'step 1'
                    if(result.links){
                        player.discard(result.links,'chongNengPai').set('sheQi',true);
                    }
                }
            },
            //魔枪
            anZhiJieFang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return !player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addTempSkill('anZhiJieFang_shangHai');
                    trigger.qiHeiZhiQiang=false;
                    trigger.chongYing=false;
                    player.storage.anZhiJieFang=false;
                },
                check:function(event,player){
					return player.canGongJi();
				},
                subSkill:{
                    shangHai:{
                        trigger:{player:"gongJiShi"},
                        direct:true,
                        filter:function(event,player){
                            if(player.storage.anZhiJieFang==true) return false;
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                            player.storage.anZhiJieFang=true;
                        }
                    }
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 5;
                    }
                }
            },
            huanYingXingChen:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.storage.huanYingXingChen=true;
                    player.addTempSkill('huanYingXingChen_shiQiXiaJiang');
                    player.faShuDamage(2,player).set('huanYingXingChen',true);
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    if(player.storage.huanYingXingChen){
                        player.chooseTarget('对目标角色造成2点法术伤害③',true).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,2);
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    result.targets[0].faShuDamage(2,player);
                },
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{player:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').huanYingXingChen==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.huanYingXingChen=false;
                        }
                    },
                },
                check:function(event,player){
                    if(get.shiQi(player.side)<=4) return false;
                    if(game.hasPlayer(function(current){
                        if(current.side==player.side) return false;
                        var num=current.countCards('h');
                        var bool=(num==1||num==2)&&player.canUse('anMie',current)&&player.canBiShaShuiJing()&&current.getExpansions('_shengDun').length==0;
                        return bool;
                    })) return false;
                    if(player.getHandcardLimit()-player.countCards('h')>=2) return true;
                    return false;
                }
            },
            heiAnShuFu:{
                mod:{
                    cardEnabled:function(card,player){
                        if(get.type(card)=='faShu') return false;
                    }
                }
            },
            anZhiZhangBi:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard([1,Infinity],function(card){
                        if(ui.selected.cards.length==0) return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                        var dict={'faShu':0,'lei':0};
                        for(var i=0;i<ui.selected.cards.length;i++){
                            if(get.type(ui.selected.cards[i])=='faShu') dict[get.type(ui.selected.cards[i])]++;
                            if(get.xiBie(ui.selected.cards[i])=='lei') dict[get.xiBie(ui.selected.cards[i])]++;
                        }
                        if(dict['faShu']==dict['lei']){
                            return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                        }else if(dict['faShu']>dict['lei']){
                            return get.type(card)=='faShu'
                        }else if(dict['lei']>dict['faShu']){
                            return get.xiBie(card)=='lei';
                        }
                        
                    })
                    .set('complexCard',true)
                    .set('prompt',get.prompt('anZhiZhangBi'))
                    .set('prompt2',lib.translate.anZhiZhangBi_info)
                    .set('ai',function(card){
                        if(get.type(card)=='faShu') return 10;
                        return 1;
                    }).forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                }
            },
            chongYing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(event.getParent('phaseUse').chongYing==false) return false;
                    return player.countCards('h',card=>lib.skill.chongYing.filterCard(card))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                },
                selectTarget:-1,
                filterTarget:true,
                discard:true,
                showCards:true,
                contentBefore:function(){
                    player.storage.chongYing=0;
                },
                content:function(){
                    'step 0'
                    if(target.countCards('h')>0){
                        if(player.side==target.side){
                            target.chooseToDiscard('h').set('ai',function(card){
                                if(get.type(card)=='faShu'||get.xiBie(card)=='lei') return 1;
                                return 0;
                            }).set('showCards',true);
                        }else{
                            target.chooseToDiscard('h',true).set('ai',function(card){
                                if(get.type(card)=='faShu'||get.xiBie(card)=='lei') return 0;
                                return 1;
                            }).set('showCards',true);
                        }
                    }
                    'step 1'
                    if(result.bool){
                        if((get.type(result.cards[0])=='faShu'||get.xiBie(result.cards[0])=='lei')&&target!=player){
                            player.storage.chongYing+=1;
                        }
                    }
                },
                contentAfter:function(){
                    player.addTempSkill('chongYing_shangHai');
                    player.addGongJi();
                },
                subSkill:{
                    shangHai:{
                        trigger:{player:"gongJiBefore"},
                        direct:true,
                        filter:function(event,player){
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            trigger.changeDamageNum(player.storage.chongYing);
                            player.removeSkill('chongYing_shangHai');
                        }   
                    }
                },
                ai:{
					order:4,
					result:{
						player:2,
					},
				},
            },
            qiHeiZhiQiang:{
                trigger:{source:"gongJiMingZhong"},
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(event.getParent('phaseUse').qiHeiZhiQiang==false) return false;
                    if(!player.canBiShaShuiJing()) return false;
                    if(event.yingZhan==true) return false;
                    return event.target.countCards('h')==1||event.target.countCards('h')==2;
                },
                async cost(event,trigger,player){
                    var list=[];
                    for(var i=0;i<player.countNengLiang('baoShi');i++){
                        list.push(['baoShi',get.translation('baoShi')]);
                    }
                    for(var i=0;i<player.countNengLiang('shuiJing');i++){
                        list.push(['shuiJing',get.translation('shuiJing')]);
                    }
                    var result=await player.chooseButton(['本次攻击伤害额外+(X+2)',[list,'tdnodes']])
                    .set('selectButton',[1,Infinity]).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    var num=event.cost_data.length;
                    trigger.changeDamageNum(num+2);
                    event.dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<event.cost_data.length;i++){
                        event.dict[event.cost_data[i]]++;
                    }
                    if(event.dict.baoShi>0) player.removeNengLiang('baoShi',event.dict.baoShi);
                    if(event.dict.shuiJing>0) player.removeNengLiang('shuiJing',event.dict.shuiJing);
                },
                ai:{
                    shuiJing:true,
                }
            },
            //灵符师
            lingFu_leiMing:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.lingFu_leiMing.filterCard(card))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='lei';
                },
                selectTarget:2,
                filterTarget:true,
                discard:true,
                showCards:true,
                contentBefore:function(){
                    'step 0'
                    player.storage.lingFu_leiMing=1;
                    'step 1'
                    event.trigger('lingFu');
                    'step 2'
                    event.trigger('lingFu_leiMing');
                },
                content:function(){
                    target.faShuDamage(player.storage.lingFu_leiMing,player);
                },
                ai:{
                    order:function(item,player){
                        var num=2.5;
                        num+=player.countCards('h',card=>get.xiBie(card)=='lei')*0.4;
                        if(player.countCards('h')>2) num+=0.3;
                        return num;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,1);
                        },
                    }
                }
            },
            lingFu_fengXing:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countCards('h',card=>lib.skill.lingFu_fengXing.filterCard(card))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                selectTarget:2,
                filterTarget:true,
                discard:true,
                showCards:true,
                contentBefore:function(){
                    event.trigger('lingFu');
                },
                content:function(){
                    target.chooseToDiscard('h',true);
                },
                ai:{
                    order:function(item,player){
                        var num=2.5;
                        num+=player.countCards('h',card=>get.xiBie(card)=='feng')*0.4;
                        if(player.countCards('h')>3) num+=0.3;
                        return num;
                    },
                    result:{
                        target:1,
                    }
                }
            },
            nianZhou:{
                trigger:{player:'lingFu'},
                filter:function(event,player){
                    return player.countCards('h')>0&&player.getExpansions('yaoLi').length<2;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h')
                        .set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='huo') return 2;
                            else return 1;
                        }).forResult();
                },
                content:function(){
                    player.addToExpansion('draw',event.cards,'log').gaintag.add('yaoLi');
                }
            },
            baiGuiYeXing:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.getExpansions('yaoLi').length>0;
                },
                async cost(event,trigger,player){
                    var result=await player.chooseCardButton(player.getExpansions('yaoLi'),'是否发动【百鬼夜行】，移除1张【妖力】,对目标角色造成1点法术伤害③').forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:async function(event,trigger,player){
                    var card=event.cost_data[0];
                    await player.discard(card,'yaoLi');

                    player.storage.baiGuiYeXing=1;
                    await event.trigger('baiGuiYeXing');

                    var bool=await player.chooseCardButton([card],`是否展示火系【妖力】,改为指定2名角色，对除他们以外的其他所有角色各造成${player.storage.baiGuiYeXing}点法术伤害③`,1).set('filterButton',function(button){
                        return get.xiBie(button.link)=='huo';
                    }).set('ai',function(){
                        return 1;
                    }).forResultBool();
                    if(bool){
                        await player.showHiddenCards(card);
                        var targets=await player.chooseTarget('选取不受伤害的2名角色',2,true).set('ai',function(target){
                            var player=_status.event.player;
                            var num=_status.event.num;
                            return -get.damageEffect2(target,player,num);
                        }).set('num',player.storage.baiGuiYeXing).forResultTargets();
                        targets=game.filterPlayer(function(current){
                            return !targets.includes(current);
                        }).sortBySeat(player);
                    }else{
                        var targets=await  player.chooseTarget(`对目标角色造成${player.storage.baiGuiYeXing}点法术伤害③`,1,true).set('ai',function(target){
                            var player=_status.event.player;
                            var num=_status.event.num;
                            return get.damageEffect2(target,player,num);
                        }).set('num',player.storage.baiGuiYeXing).forResultTargets();
                    }
                    for(var target of targets){
                        target.faShuDamage(player.storage.baiGuiYeXing,player);
                    }
                }
            },
            lingLiBengJie:{
                trigger:{player:['baiGuiYeXing','lingFu_leiMing']},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.storage.baiGuiYeXing++;
                    player.storage.lingFu_leiMing++;
                },
                ai:{
                    shuiJing:true,
                }
            },
            yaoLi:{
                intro:{
                    name:'妖力',
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('yaoLi');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            //吟游诗人
            chenLunXieZouQu:{
                trigger:{global:'damageAfter'},//该时机不会因为治疗而被抵消
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    if(!(event.player.side!=player.side&&event.source.side==player.side)) return false; 
                    return player.storage.chenLunXieZouQu.length>=2;
                },
                usable:1,
                async cost(event,trigger,player){
                    if(trigger.getParent().name=='yongHengYueZhang_jiAngKuangXiangQu'){
                        await event.trigger('yongHengYueZhang');
                        trigger.getParent().bool=true;
                        if(player.isHengZhi()) return event.result={bool:false};
                    }
                    event.result=await player.chooseCard('h',2)
                    .set('complexCard',true)
                    .set('filterCard',function(card){return get.xuanZeTongXiPai(card)})
                    .set('prompt',get.prompt('chenLunXieZouQu'))
                    .set('prompt2',lib.translate.chenLunXieZouQu_info)
                    .set('ai',function(card){return 6-get.value(card)})
                    .forResult();
                },
                content:async function(event,trigger,player){
                    await player.discard(event.cards).set('showCards',true);
                    await player.addZhiShiWu('lingGan');
                    var flag=false;
                    for(var i=0;i<event.cards.length;i++){
                        if(get.type(event.cards[i])=='faShu'){
                            flag=true;
                            break;
                        }
                    }
                    if(flag){
                        var targets=await player.chooseTarget('对目标对手造成1点法术伤害',true,function(card,player,target){
                            return player.side!=target.side;
                        })
                        .set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
                        })
                        .forResultTargets();
                        await targets[0].faShuDamage(1,player);
                    }
                },
                group:['chenLunXieZouQu_chongZhi','chenLunXieZouQu_jiShu'],
                subSkill:{
                    chongZhi:{
                        trigger:{global:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function(){
                            player.storage.chenLunXieZouQu=[];
                        }
                    },
                    jiShu:{
                        trigger:{global:'zaoChengShangHai'},
                        filter:function(event,player){
                            if(event.faShu!=true) return false;
                            if(player.storage.chenLunXieZouQu.includes(event.player)) return false;
                            return event.player.side!=player.side&&event.source.side==player.side;
                        },
                        direct:true,
                        content:function(){
                            player.storage.chenLunXieZouQu.add(trigger.player);
                        }
                    }
                }
            },
            buXieHeXian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('lingGan')>1;
                },
                chooseButton:{
                    check:function (button) {
                        var player = _status.event.player;
                        if(typeof button.link=="number"){
                            var num=player.getHandcardLimit()-player.countCards('h');
                            if(num>=button.link-1) return button.link;
                        }else if(typeof button.link=="string"){
                            var num=player.getHandcardLimit()-player.countCards('h');
                            if(num>=2&&button.link=='摸'){
                                return 1;
                            }
                            if(num<2&&button.link=='弃'){
                                return 1;
                            }
                        }
                        return 0.5;
                    },

                    dialog:function(event,player){
						var dialog=ui.create.dialog(`不谐和弦：移除X点<span class='hong'>【灵感】</span>,摸/弃(X-1)张牌`,'hidden');
                        var list=[];
                        for(var i=2;i<=player.countZhiShiWu('lingGan');i++){
                            list.push(i);
                        }
						dialog.add([list,'tdnodes']);
                        dialog.add([['摸','弃'],'tdnodes'])
						return dialog;
					},
                    filter:function(button,player){
                        if (ui.selected.buttons.length>0) return typeof ui.selected.buttons[0].link != typeof button.link;
                        else return true;
                    },
                    select:2,
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
                            selectTarget:1,
                            filterTarget:true,
                            selectCard: 0,
                            filterCard: true,
                            contentBefore:async function(event,trigger,player){
                                var links=lib.skill.buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        var num=links[i];
                                        break
                                    }
                                }
                                if(player.isHengZhi()) await player.chongZhi();
                                await player.removeZhiShiWu('lingGan',num);
                            },
							content:async function(event,trigger,player){
                                var links=lib.skill.buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        var num=links[i]-1;
                                    }else if(typeof links[i]=='string'){
                                        var action=links[i];
                                    }
                                }
								if(action=='摸'){
                                    await player.draw(num);
                                    await event.target.draw(num);
                                }else{
                                    await player.chooseToDiscard('h',num,true);
                                    await event.target.chooseToDiscard('h',num,true); 
                                }
							},
                            ai:{
                                result:{
                                    target:function(player,target){

                                        var num=player.getHandcardLimit()-player.countCards('h');
                                        if(num>=2) return -target.countCards('h');
                                        else return target.countCards('h');
                                    }
                                }
                            }
						}
					},
                    prompt:function(links,player){
                        for(var i=0;i<links.length;i++){
                            if(typeof links[i]=='number'){
                                var num=links[i]-1;
                            }else if(typeof links[i]=='string'){
                                var action=links[i];
                            }
                        }
                        if(action=='摸'){
                            return `你和目标角色各摸${num}张牌[强制]`
                        }else{
                            return `你和目标角色各弃${num}张牌[强制]`
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var num=30+player.countZhiShiWu('lingGan')*0.5;
                        return num;
                    },
                    result:{
                        player:1,
                    }
                }
                
            },
            jinJiShiPian:{
                trigger:{global:'yongHengYueZhang'},
                forced:true,
                filter:function(event,player){
                    return event.player==player.storage.yongHengYueZhang_target||event.player==player;
                },
                content:async function(event,trigger,player){
                    var info=get.info('lingGan');
                    if(player.countZhiShiWu('lingGan')<info.intro.max){
                        await player.addZhiShiWu('lingGan');
                        await player.storage.yongHengYueZhang_target.removeZhiShiWu('yongHengYueZhang');
                        player.storage.yongHengYueZhang_target=undefined;
                    }else{
                        await player.faShuDamage(3,player);
                        await player.hengZhi();
                    }
                }
            },
            xiWangFuGeQu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.chooseDraw(1,true);

                    var players=game.filterPlayer((function(current){
                        return current.side==player.side&&current.hasZhiShiWu('yongHengYueZhang');
                    }));

                    if(players.length>0){
                        var targets=await player.chooseTarget('将【永恒乐章】转移给我方另一名目标角色',true,function(card,player,target){
                            var targetx=_status.event.targetx;
                            return target.side==player.side&&targetx!=target;
                        }).set('targetx',players[0]).forResultTargets();
                    }else{
                        var targets=await player.chooseTarget('将【永恒乐章】放置于目标队友面前',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).forResultTargets();
                    }

                    if(players.length>0) await players[0].removeZhiShiWu('yongHengYueZhang');
                    var target=targets[0];
                    if(!target.hasSkill('yongHengYueZhang')){
                        await target.addSkill('yongHengYueZhang');
                    }

                    await target.addZhiShiWu('yongHengYueZhang');
                    player.storage.yongHengYueZhang_target=target;
                    target.storage.yongHengYueZhang_player=player;
                    
                    if(players.length>0){
                        if(player.countCards('h')>0){
                            await player.chooseToDiscard(1,true);
                        }
                        var list=['zhiLiao','lingGan'];
                        var control=await player.chooseControl(list).set('prompt',`选择+1[治疗]或<span class='hong'>【灵感】</span>`).forResultControl();
                        if(control=='zhiLiao') await player.changeZhiLiao();
                        else if(control=='lingGan') await player.addZhiShiWu('lingGan');
                    }
                },
                check:function(event,player){
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    return player.hasZhiShiWu('lingGan')<3;
                },
                ai:{
                    shuiJing:true,
                }
            },
            lingGan:{
                intro:{
                    name:'灵感',
                    markcount:'mark',
                    max:3,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png'
            },
            yongHengYueZhangX:{},
            yongHengYueZhang:{
                intro:{
                    name:'(专)永恒乐章',
                    content:"[响应]激昂狂想曲：<span class='tiaoJian'>(回合开始时若你拥有【永恒乐章】)</span>选择以下一项执行：<br>·吟游诗人对2名目标对手各造成1点法术伤害③。 <br>·你弃2张牌。<br>[响应]胜利交响诗：<span class='tiaoJian'>(回合结束时若你拥有【永恒乐章】)</span>选择以下一项执行<br>·将我方【战绩区】的1个星石提炼成为你的能量。<br>·为我方【战绩区】+1[宝石]，你+1[治疗]。",
                    nocount:true,
                },
                onremove:'storage',
                group:['yongHengYueZhang_jiAngKuangXiangQu','yongHengYueZhang_shengLiJiaoXiangShi'],
                markimage:'image/card/zhuanShu/yongHengYueZhang.png',
                subSkill:{
                    jiAngKuangXiangQu:{
                        trigger:{player:'phaseBegin'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('yongHengYueZhang');
                        },
                        content:function(){
                            'step 0'
                            var choiceList=['吟游诗人对2名目标对手各造成1点法术伤害③','你弃2张牌'];
                            player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                                var player=_status.event.player;
                                if(player.storage.yongHengYueZhang_player.countCards('h')>2) return '选项一';
                                else return '选项二';
                            });
                            'step 1'
                            if(result.control=='选项一'){
                                player.storage.yongHengYueZhang_player.chooseTarget(2,'对2名目标对手各造成1点法术伤害③',true,function(card,player,target){
                                    return target.side!=player.side;
                                });
                            }else{
                                player.chooseToDiscard(2,true);
                                event.goto(4);
                            }
                            'step 2'
                            event.targets=result.targets.sortBySeat(player);
                            event.targets[0].faShuDamage(1,player.storage.yongHengYueZhang_player);
                            'step 3'
                            event.targets[1].faShuDamage(1,player.storage.yongHengYueZhang_player);
                            'step 4'
                            if(!event.bool) event.trigger('yongHengYueZhang');
                        },
                        check:function(event,player){
                            var bool1=player.storage.yongHengYueZhang_player.countCards('h')>2;
                            var bool2=player.countCards('h')>=5;
                            return bool1||bool2;
                        }
                    },
                    shengLiJiaoXiangShi:{
                        trigger:{player:'phaseEnd'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('yongHengYueZhang');
                        },
                        content:async function(event,trigger,player){
                            var zhanJi=get.zhanJi(player.side);
                            if(zhanJi.length>0&&player.countEmptyNengLiang()>0){
                                var list=[];
                                for(var i=0;i<zhanJi.length;i++){
                                    list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                }
                                var result=await player.chooseButton([
                                    '提炼我方【战绩区】的1个星石或者为我方【战绩区】+1[宝石]、你+1[治疗]',
                                    [list,'tdnodes'],
                                ]).set('selectButton',[1,1]).set('ai',function(button){
                                    var player=_status.event.player;
                                    var zhanJi=get.zhanJi(player.side);
                                    if(zhanJi.length>3){
                                        if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
                                            if(button.link=='baoShi') return 5;
                                            else return -1;
                                        }else if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
                                            if(button.link=='shuiJing') return 5;
                                            else return 2;
                                        }else if(player.hasSkillTag('shuiJing')&&player.hasSkillTag('baoShi')){
                                            return 2;
                                        }
                                    }else{
                                        return -1;
                                    }
                                }).forResult();
                            }else var result={bool:false};

                            if(result.bool){
                                await player.changeZhanJi(result.links[0],-1);
                                await player.addNengLiang(result.links[0],1);
                            }else{
                                await player.addZhanJi('baoShi');
                                await player.changeZhiLiao(1);
                            }
                            await event.trigger('yongHengYueZhang');
                        }
                    }
                }
            },
            //勇者
            yongZheZhiXin:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    player.addNengLiang('shuiJing',2);
                }
            },
            nuHou:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('nuQi')) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('nuQi');
                    trigger.changeDamageNum(2);
                    trigger.customArgs.nuHou=true;
                    'step 1'
                    player.chooseDraw();
                },
                group:"nuHou_weiMingZhong",
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return event.customArgs.nuHou;
                        },
                        direct:true,
                        content:function(){
                            player.addZhiShiWu('zhiXing');
                        }
                    }
                }
            },
            jinPiLiJin:{
                trigger:{player:'jinDuanZhiLi'},
                forced:true,
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addGongJi();
                },
                group:'jinPiLiJin_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'xingDongBegin'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.faShuDamage(3,player);
                        },
                    }
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isHengZhi()) return 4;
                    }
                }
            },
            mingJingZhiShui:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(player.countZhiShiWu('zhiXing')<4) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.removeZhiShiWu('zhiXing',4);
                    trigger.wuFaYingZhan();
                    trigger.customArgs.mingJingZhiShui=true;
                },
                group:'mingJingZhiShui_jieShu',
                subSkill:{
                    jieShu:{
                        trigger:{player:'gongJiEnd'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.mingJingZhiShui;
                        },
                        content:function(){
                           player.addNengLiang('shuiJing');
                        },
                    }
                }
            },
            tiaoXin:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    var bool=game.hasPlayer(function(current){
                        return player.side!=current.side&&current.hasZhiShiWu('tiaoXinX');
                    });
                    return player.hasZhiShiWu('nuQi')&&!bool;
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player.side!=target.side;
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('nuQi');
                    await player.addZhiShiWu('zhiXing');
                    var target=event.target;
                    if(!target.hasSkill('tiaoXinX')){
                        target.addSkill('tiaoXinX');
                    }
                    await target.addZhiShiWu('tiaoXinX');
                    target.storage.tiaoXinX_player=player;
                },
                ai:{
                    order:3.8,
                    result:{
                        target:-1,
                    }
                }
            },
            tiaoXinX:{
                intro:{
                    name:"(专)[法术]挑衅",
                    content:'你在下个行动阶段必须且只能主动攻击勇者，否则你跳过该行动阶段，触发后移除此牌。',
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/tiaoXin.png',

                filterx:function(event,player,num){
                    //无可启动技，跳过启动前后挑衅
                    if(event.name=='phaseUse'&&num==1){
						if(event.canQiDong==false) return false;
					}
					return player.hasZhiShiWu('tiaoXinX');
				},
                filter:function(event,player){
                    return lib.skill.tiaoXinX.filterx(event,player);
                },
                enable:'wuFaXingDong',
				type:'wuFaXingDong',
                content:function(){
                    player.removeZhiShiWu('tiaoXinX')
                    var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
                    player.removeSkill('tiaoXinX');
                },
                group:['tiaoXinX_qiDongQian','tiaoXinX_qiDongHou','tiaoXinX_kaiShi','tiaoXinX_sheZhi','tiaoXinX_yiChu','tiaoXinX_wuFaXingDong'],
                subSkill:{
                    qiDongQian:{
						trigger:{player:'qiDong'},
						priority:2,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player,1);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            var list=['继续回合','跳过回合'];
                            var control=await player.chooseControl(list).set('prompt','启动前：你被挑衅了').forResultControl();
                            if(control=='跳过回合'){
                                await player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    qiDongHou:{
						trigger:{player:'qiDong'},
                        priority:-1,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player,1);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            var list=['继续回合','跳过回合'];
                            var control=await player.chooseControl(list).set('prompt','启动前：你被挑衅了').forResultControl();
                            if(control=='跳过回合'){
                                await player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    kaiShi:{
						trigger:{player:'phaseBegin'},
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            var list=['继续回合','跳过回合'];
                            var control=await player.chooseControl(list).set('prompt','行动开始：你被挑衅了').forResultControl();
                            if(control=='跳过回合'){
                                await player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    sheZhi:{
                        trigger:{player:'xingDongBegin'},
						lastDo:true,
                        direct:true,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        content:function(){
                            trigger.canTeShu=false;
                            player.addTempSkill('tiaoXinX_xianZhi');
                        },
                    },
                    yiChu:{
                        trigger:{player:'xingDongAfter'},
                        filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        direct:true,
                        content:async function(event,trigger,player){
                            await player.removeZhiShiWu('tiaoXinX')
                            player.removeSkill('tiaoXinX');
                        },
                    },
                    xianZhi:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker:function(skill,player){
                            var info=get.info(skill);
                            return info.type=='faShu'||info.type=='teShu';
                        },
                        mod:{
                            playerEnabled:function(card,player,target){
                                if(!player.hasZhiShiWu('tiaoXinX')) return;
                                if(_status.event.yingZhan==true) return;
                                if(player.storage.tiaoXinX_player!=target) return false;
                            },
                            cardEnabled:function(card,player){
                                if(!player.hasZhiShiWu('tiaoXinX')) return;
                                if(_status.event.yingZhan==true) return;
                                if(get.type(card)=='faShu') return false;
                            },
                        }
                    },
                    wuFaXingDong:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='tiaoXinX_wuFaXingDong') return false;//需要排除自身，防止嵌套
                            return get.info('_wuFaXingDong').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                }, 
            },
            jinDuanZhiLi:{
                group:['jinDuanZhiLi_mingZhong','jinDuanZhiLi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            if(!player.canBiShaShuiJing()) return false;
                            return event.yingZhan!=true;
                        },
                        content:async function(event,trigger,player){
                            await player.removeBiShaShuiJing();
                            var cards=player.getCards('h');
                            await player.discard(cards).set('showCards',true);
                            var num=0;
                            var nuQi=0;
                            for(var i=0;i<cards.length;i++){
                                if(get.type(cards[i])=='faShu'){
                                    nuQi++;
                                }
                                if(get.xiBie(cards[i])=='huo'){
                                    num++;
                                }
                            };
                            if(nuQi>0){
                                await player.addZhiShiWu('nuQi',nuQi);
                            }
                            if(num>0){
                                trigger.changeDamageNum(num);
                                await player.faShuDamage(num,player);
                            }
                            await event.trigger('jinDuanZhiLi');
                        },
                        check:function(event,player){
                            var num=player.countCards('h',card=>get.xiBie(card)=='huo');
                            return num>0;
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            if(!player.canBiShaShuiJing()) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:async function(event,trigger,player){
                            await player.removeBiShaShuiJing();
                            var cards=player.getCards('h');
                            await player.discard(cards).set('showCards',true);
                            var nuQi=0;
                            var zhiXing=0;
                            for(var i=0;i<cards.length;i++){
                                if(get.type(cards[i])=='faShu'){
                                    nuQi++;
                                }
                                if(get.xiBie(cards[i])=='shui'){
                                    zhiXing++;
                                }
                            };
                            if(nuQi>0) await player.addZhiShiWu('nuQi',nuQi);
                            if(zhiXing>0) await player.addZhiShiWu('zhiXing',zhiXing);
                            await event.trigger('jinDuanZhiLi');
                        },
                        check:function(event,player){
                            var nuQi=player.isZhiShiWuMax('nuQi');
                            var zhiXing=player.isZhiShiWuMax('zhiXing');
                            var num1=player.countCards('h',card=>get.type(card)=='faShu');
                            var num2=player.countCards('h',card=>get.xiBie(card)=='shui');
                            return (num1>0&&num2>0)&&(!(nuQi&&zhiXing));
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },
            siDou:{
                trigger:{player:'chengShouShangHai'},
                lastDo:true,
                filter:function(event,player){
                    return event.faShu&&player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.addZhiShiWu('nuQi',3);
                    trigger.shiQiMax=-1;
                },
                check:function(event,player){
                    if(event.num+player.countCards('h')>player.getHandcardLimit()){
                        return true;
                    }else{
                        return player.countZhiShiWu('nuQi')<=2;
                    }
                },
                ai:{
                    baoShi:true
                }
            },
            nuQi:{
                intro:{
                    max:4,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            zhiXing:{
                intro:{
                    max:4,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            //格斗家
            nianQiLiChang:{
                trigger:{player:"zaoChengShangHai"},
                filter:function(event,player){
                    return event.num>4;
                },
                forced:true,
                content:function(){
                    trigger.zaoChengShangHaiMax=4
                }
            },
            xuLiYiji:{
                trigger:{player:"gongJiBefore"},
                filter:function(event,player){
                    if(!player.hasSkill('douQi')) return false;
                    if(player.countZhiShiWu('douQi')>=lib.skill.douQi.intro.max) return false;
                    if(event.customArgs.qiJueBengJi) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.addZhiShiWu('douQi');
                    trigger.changeDamageNum(1);
                    trigger.customArgs.xuLiYiji=true;
                },
                check:function(event,player){
                    if(!player.isHengZhi()) return true;
                    if(event.target.countCards('h')>3) return false;
                    if(player.countZhiShiWu('douQi')>=3) return false;
                    var num=Math.random();
                    return num>0.5;
                },
                group:'xuLiYiji_weiMingZhong',
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.xuLiYiji;
                        },
                        content:function(){
                            player.faShuDamage(player.countZhiShiWu('douQi'),player);
                        }
                    },
                    
                }
            },
            nianDan:{
                trigger:{player:['faShuEnd']},
                filter:function(event,player){
                    if(!player.hasSkill('douQi')) return false;
                    if(player.countZhiShiWu('douQi')>=lib.skill.douQi.intro.max) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('douQi');
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    event.target=result.targets[0];
                    if(event.target.zhiLiao==0){
                        event.flag=true;
                    }
                    'step 3'
                    event.target.faShuDamage(1,player);
                    'step 4'
                    if(event.flag){
                        player.faShuDamage(player.countZhiShiWu('douQi'),player);
                    }
                    
                },
                check:function(event,player){
                    return player.countZhiShiWu('douQi')+player.countCards('h')<=player.getHandcardLimit();
                },
            },
            baiShiHuanLongQuan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.countZhiShiWu('douQi')>=3;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('douQi',3);
                    'step 1'
                    if(!player.isHengZhi()) player.storage.baiShiHuanLongQuan=[];
                    player.hengZhi();
                },
                group:['baiShiHuanLongQuan_zhuDong','baiShiHuanLongQuan_yingZhan','baiShiHuanLongQuan_faShuAndTeShu','baiShiHuanLongQuan_gongJi','baiShiHuanLongQuan_xuLiYiji'],
                mod:{
                    aiOrder:function(player,card,num){
                        if(get.type(card)=='gongJi'&&player.isHengZhi()) return num+1;
                    }
                },
                subSkill:{
                    zhuDong:{
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        priority:-1,
                        direct:true,
                        content:function(){
                            trigger.changeDamageNum(2);
                        }
                    },
                    yingZhan:{
                        trigger:{player:'gongJiBefore'},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan==true;
                        },
                        priority:-1,
                        direct:true,
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    faShuAndTeShu:{
                        trigger:{player:['faShuBefore','teShuBefore']},
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return true;
                        }, 
                        direct:true,
                        content:function(){
                            player.chongZhi();
                            player.storage.baiShiHuanLongQuan=[];
                        }
                    },
                    gongJi:{
                        trigger:{player:'gongJiBefore'},
                        direct:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            return event.yingZhan!=true;
                        },
                        content:function(){
                            if(player.storage.baiShiHuanLongQuan.length==0){
                                player.storage.baiShiHuanLongQuan.push(trigger.targets[0]);
                            }else{
                                if(!player.storage.baiShiHuanLongQuan.includes(trigger.targets[0])){
                                    player.chongZhi();
                                    player.storage.baiShiHuanLongQuan=[];
                                }
                            }
                        }
                    },
                    xuLiYiji:{
                        trigger:{player:"xuLiYijiBegin"},
                        direct:true,
                        content:function(){
                            player.chongZhi();
                            player.storage.baiShiHuanLongQuan=[];
                        }
                    }
                },
                check:function(event,player){
                    return player.canGongJi();
                }


            },
            qiJueBengJi:{
                trigger:{player:"gongJiBefore"},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('douQi')) return false;
                    if(event.customArgs.xuLiYiji) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.qiJueBengJi=true;
                    player.removeZhiShiWu('douQi');
                    trigger.wuFaYingZhan();
                    'step 1'
                    player.faShuDamage(player.countZhiShiWu('douQi'),player);
                },
                check:function(event,player){
                    if(event.canYingZhan==false) return false;
                    if(player.countZhiShiWu('douQi')-1+player.countCards('h')>=player.getHandcardLimit()) return false;
                    else return true;
                }
            },
            douShenTianQu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,'h',player.countCards('h')-3);
                    };
                    'step 2'
                    player.changeZhiLiao(2);
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    if(player.zhiLiao>=player.getZhiLiaoLimit()) return false;
                    if(player.countCards('h')<=4) return false;
                    return player.canXingDong();
                }
            },
            douQi:{
                intro:{
                    content:'mark',
                    max:6,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //圣弓
            tianZhiGong:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    'step 0'
                    player.addZhiShiWu('shengHuangHuiGuangPaoX');
                    'step 1'
                    player.addNengLiang('shuiJing',2);
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                },
                group:['tianZhiGong_zhuDongGongJi','tianZhiGong_zhuDongGongJiMingZhong'],
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
                            return event.yingZhan!=true&&get.mingGe(event.card)=='sheng';
                        },
                        content:function(){
                            player.addZhiShiWu('xinYang')
                        }
                    }
                }
            },
            shengXieJuBao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countTongXiPai('gongJi')>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    if(get.type(card)!='gongJi') return false;
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                discard:true,
                showCards:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player.canUseXingBei('anMie',target);
                },
                content:function(){
                    var xiBie=get.xiBie(cards[0]);
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
                group:'shengXieJuBao_gongJiWeiMingZhong',
                subSkill:{
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return player.zhiLiao>0&&event.card.shengXieJuBao;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            if(player.zhiLiao>1){
                                var list=[1,2,'cancel2'];
                            }else{
                                var list=[1,'cancel2'];
                            }
                            var next=player.chooseControl(list);
                            next.set('prompt','是否移除X点[治疗]，目标队友弃X张牌');
                            next.set('ai',function(){
                                return 'cancel2';
                            });
                            'step 1'
                            if(result.control=='cancel2'){
                                event.finish();
                            }else{
                                event.num=result.control;
                                player.changeZhiLiao(-event.num);
                                player.chooseTarget(true,function(card,player,target){
                                    return target!=player&&target.side==player.side;
                                });
                            }
                            'step 2'
                            result.targets[0].chooseToDiscard('h',true,event.num);
                        }
                    }
                },
                ai:{
                    order:3.4,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            shengHuangJiangLin:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    return player.zhiLiao>=2||player.countZhiShiWu('xinYang')>=2;
                },
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
								event.links=lib.skill.shengHuangJiangLin_backup.links;
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
                group:"shengHuangJiangLin_chongZhi",
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
                            var list=['治疗','信仰'];
                            player.chooseControl(list).set('prompt',`+1点[治疗]或<span class='hong'>【信仰】</span>`);
                            'step 2'
                            if(result.control=='治疗'){
                                player.changeZhiLiao(1);
                            }else if(result.control=='信仰'){
                                player.addZhiShiWu('xinYang',1);
                            }
                        }
                    }
                },
                ai:{
                    order:7,
                    result:{
                        player:1,
                    }
                }
            },
            shengGuangBaoLie:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.isHengZhi();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('圣光爆裂','hidden');
                        var list=[['1',"摸1张牌[强制]，移除你的1点[治疗]，你+1<span class='hong'>【信仰】</span>，目标队友+1[治疗]"],['2',"<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害。 Y为目标数中拥有[治疗]的人数"]];
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
                            var next=get.copy(lib.skill['shengGuangBaoLie_1']);
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
                            player.draw(1);
                            'step 1'
                            if(player.zhiLiao>0){
                                player.changeZhiLiao(-1);
                            }
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
                    2:{
                        type:'faShu',
                        content:function(){
                            'step 0'
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
                            player.chooseControl(list).set('prompt','移除你的X[治疗]');
                            'step 1'
                            event.x=result.control;
                            player.changeZhiLiao(-result.control);
                            'step 2'
                            player.chooseTarget(true,[1,event.x],function(card,player,target){
                                return target.countCards('h')<=player.countCards('h')-_status.event.x&&target.side!=player.side;
                            }).set('x',event.x);
                            'step 3'
                            event.targets=result.targets.sortBySeat(player);
                            game.log(player,'选择了',event.targets);;
                            player.chooseToDiscard(true,'h',event.x);
                            'step 4'
                            event.num=2;
                            for(var i=0;i<event.targets.length;i++){
                                if(event.targets[i].zhiLiao>0) event.num++;
                            }
                            'step 5'
                            var target=event.targets.shift();
                            target.damage(event.num,player);
                            if(event.targets.length>0){
                                event.redo();
                            }
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        return 8-player.countCards('h');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            liuXingShengDan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    return event.yingZhan!=true&&(player.zhiLiao>0||player.countZhiShiWu('xinYang')>0);
                },
                async cost(event,trigger,player){
                    var list=[];
                    if(player.zhiLiao>0){
                        list.push('zhiLiao');
                    }
                    if(player.countZhiShiWu('xinYang')>0){
                        list.push('xinYang');
                    }
                    list.push('cancel2');
                    var bool=game.hasPlayer(function(current){
                        return current.side==player.side&&current.zhiLiao<current.getZhiLiaoLimit();
                    });

                    var control=await player.chooseControl(list).set('prompt','是否发动【流星圣弹】，移除1点[治疗]或1点<span class="hong">【信仰】</span>，我方目标角色+1[治疗]').set('ai',function(){
                        var player=_status.event.player;
                        var bool=_status.event.bool;
                        if(player.hasZhiShiWu('shengHuangHuiGuangPaoX')){
                            if(player.zhiLiao==0) return 'cancel2';
                            else return 'zhiLiao';
                        }else{
                            if(player.countZhiShiWu('xinYang')>0) return 'xinYang';
                            if(player.zhiLiao>0) return 'zhiLiao';
                            return 'cancel2';
                        }
                    }).set('bool',bool).forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:function(){
                    'step 0'
                    if(event.cost_data=='zhiLiao'){
                        player.changeZhiLiao(-1);
                    }else if(event.cost_data=='xinYang'){
                        player.removeZhiShiWu('xinYang',1);
                    }
                    'step 1'
                    player.chooseTarget(true,function(card,player,target){
                        return target.side==player.side;
                    }).set('prompt','我方目标角色+1[治疗]').set('ai',function(target){
                        return get.zhiLiaoEffect(target,1);
                    });
                    'step 2'
                    result.targets[0].changeZhiLiao(1,player);
                }
            },
            shengHuangHuiGuangPao:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    if(!player.isHengZhi()) return false;
                    if(player.countZhiShiWu('shengHuangHuiGuangPaoX')<1) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi;
                        num+=Math.max(0,shiQiCha);
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                        num+=Math.max(0,shiQiCha);
                    }
                    return player.countZhiShiWu('xinYang')>=num;
                },
                selectTarget:-1,
                filterTarget:true,
                contentBefore:function(){
                    'step 0'
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi;
                        num+=Math.max(0,shiQiCha);
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                        num+=Math.max(0,shiQiCha);
                    }
                    event.num=num;
                    'step 1'
                    player.removeZhiShiWu('shengHuangHuiGuangPaoX',1);
                    'step 2'
                    player.removeZhiShiWu('xinYang',event.num);
                },
                content:function(){
                    if(target.countCards('h')>4){
                        target.chooseToDiscard(true,'h',target.countCards('h')-4);
                    }else if(target.countCards('h')<4&&target.getHandcardLimit()>=4){
                        target.drawTo(4);
                    }else if(target.countCards('h')<4&&target.getHandcardLimit()<4&&target.countCards('h')<target.getHandcardLimit()){
                        target.drawTo(target.getHandcardLimit());
                    }
                },
                contentAfter:function(){
                    'step 0'
                    player.changeXingBei(1);
                    'step 1'
                    var choiceList=['红方士气设置为蓝方士气','蓝方士气设置为红方士气'];
                    var list=['选项一','选项二']
                    player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var num=Math.random();
                        if(num<0.5) return '选项一';
                        else return '选项二';
                    });
                    'step 2'
                    if(result.control=='选项一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 10;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 10;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            ziDongTianChong:{
                forced:true,
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&!event.teShu;
                },
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
                        await player.addZhiShiWu('xinYang',num);
                    }
                },
                group:'ziDongTianChong_teShu',
                subSkill:{
                    teShu:{
                        trigger:{player:'teShuAfter'},
                        direct:true,
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    baoShi:true,
                }
            },
            xinYang:{
                intro:{
                    content:'mark',
                    max:10,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            shengHuangHuiGuangPaoX:{
                intro:{
                    content:'mark',
                    max:1,
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            //剑帝
            jianHunShouHu:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.customArgs.tianShiZhiHun) return false;
                    if(event.customArgs.eMoZhiHun) return false;
                    return event.yingZhan!=true&&player.getExpansions('jianHun').length<lib.skill.jianHun.intro.max;
                },
                forced:true,
                content:function(){
                    player.addToExpansion('draw',trigger.card.cards,player,'log').gaintag.add('jianHun');
                }
            },
            yangGong:{
                trigger:{source:'gongJiWeiMingZhong'},
                forced:true,
                priority:-1,
                filter:function(event,player){
                    return !event.yingZhan;
                },
                content:function(){
                    player.addZhiShiWu('jianQi');
                }
            },
            jianQiZhan:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return event.yingZhan!=true&&player.countZhiShiWu('jianQi')>0;
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('jianQi');
                    for(var i=1;i<=num;i++){
                        if(i>3) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var result=await player.chooseControl(list)
                    .set('prompt',get.prompt('jianQiZhan'))
                    .set('prompt2',lib.translate.jianQiZhan_info)
                    .set('ai',function(){
                        return _status.event.num;
                    })
                    .set('num',list.length-2)
                    .forResultControl();
                    event.result={
                        bool:result!='cancel2',
                        cost_data:result,
                    }
                },
                content:function(){
                    'step 0'
                    event.num=event.cost_data;
                    player.removeZhiShiWu('jianQi',event.num);
                    'step 1'
                    var targetx=trigger.target;
                    var name=get.translation(targetx);
                    var next=player.chooseTarget(`对除${name}以外的任意一名角色造成${event.num}点法术伤害③`,true,function(card,player,target){
                        return target!=_status.event.targetx;
                    });
                    next.set('targetx',targetx);
                    next.set('num',event.num);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        var num=_status.event.num;
                        return get.damageEffect2(target,player,num);
                    });
                    'step 2'
                    result.targets[0].faShuDamage(event.num,player);
                }

            },
            tianShiZhiHun:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return event.yingZhan!=true&&lib.skill.jianHun.tianShiZhiHun(player)>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('jianHun');
                    var result=await player.chooseCardButton(cards,'是否发动【天使之魂】').forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jianHun');
                    trigger.customArgs.tianShiZhiHun=true;
                },
                group:['tianShiZhiHun_gongJiMingZhong','tianShiZhiHun_gongJiWeiMingZhong'],
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            return event.customArgs.tianShiZhiHun;
                        },
                        direct:true,
                        content:function(){
                            player.changeZhiLiao(2);
                        }
                    },
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.tianShiZhiHun;
                        },
                        content:function(){
                            player.changeShiQi(1);
                        }
                    },
                }
            },
            eMoZhiHun:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return event.yingZhan!=true&&lib.skill.jianHun.eMoZhiHun(player)>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('jianHun');
                    var result=await player.chooseCardButton(cards,'是否发动【恶魔之魂】').forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jianHun');
                    trigger.customArgs.eMoZhiHun=true;
                    trigger.changeDamageNum(1);
                },
                group:['eMoZhiHun_gongJiWeiMingZhong'],
                subSkill:{
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.customArgs.eMoZhiHun;
                        },
                        content:function(){
                           player.addZhiShiWu('jianQi',2);
                        }
                    },
                }
            },
            buQuYiZhi:{
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    return event.yingZhan!=true&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.draw();
                    'step 2'
                    player.addZhiShiWu('jianQi',1);
                    player.addGongJi();
                },
            },
            jianHun:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('jianHun');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                    max:3,
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                tianShiZhiHun:function(player){
                    if(player.countNengLiangAll()==0) return 0;
                    else if(player.countNengLiangAll()%2==1) return player.getExpansions('jianHun').length;
                    else return 0;
                },
                eMoZhiHun:function(player){
                    if(player.countNengLiangAll()==0) return 0;
                    else if(player.countNengLiangAll()%2==0) return player.getExpansions('jianHun').length;
                    else return 0;
                },
                mod:{
                    aiaiOrder:function(player,item,num){
                        if(item=='_tiLian'&&player.countNengLiangAll()<=1) return num+0.3;
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            jianQi:{
                intro:{
                    content:'mark',
                    max:5,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //兽灵武士
            wuZheCanXin:{
                usable:1,
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    return get.is.gongJiXingDong(event);
                },
                content:function(){
                    player.addZhiShiWu('canXin',1);
                }
            },
            yiJiWuNian:{
                trigger:{player:'gongJiAfter'},
                filter:function(event,player){
                    return get.is.gongJiXingDong(event)&&player.countZhiShiWu('canXin')>=4;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('canXin',4);
                    player.addGongJi();
                    player.storage.yiJiWuNian=false;
                    player.addTempSkill('yiJiWuNian_1');
                },
                subSkill:{
                    1:{
                        trigger:{player:'gongJiSheZhi'},
                        filter:function(event,player){
                            return player.storage.yiJiWuNian==false&&get.is.gongJiXingDong(event);
                        },
                        direct:true,
                        content:function(){
                            player.storage.yiJiWuNian=true;
                            if(get.mingGe(trigger.card)=='ji'){
                                trigger.qiangZhiMingZhong();
                            }else{
                                trigger.wuFaShengDun();
                                trigger.wuFaShengGuang();
                            }
                        }
                    }
                }
            },
            shouHunYiNian:{
                forced:true,
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function(event,player){
                    return event.zhiShiWu=='shouHun'&&event.num<0;
                },
                content:function(){
                    player.addZhiShiWu('canXin',-trigger.num);
                },
                group:'shouHunYiNian_zhuDongGongJiMingZhong',
                subSkill:{
                    zhuDongGongJiMingZhong:{
                        forced:true,
                        trigger:{source:'gongJiMingZhong'},
                        filter:function(event,player){
                            return (!player.isHengZhi())&&get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            player.addZhiShiWu('shouHun',1);
                        }
                    }
                }

            },
            shouHunJingJie:{
                trigger:{global:'hengZhiAfter'},
                filter:function(event,player){
                    if(player.storage.shouHunJingJie_insert==true) return false;
                    return event.player!=player&&player.countZhiShiWu('shouHun')>0&&(!player.isHengZhi());
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('shouHun');
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    var next=player.chooseTarget(true,"目标角色弃1张牌[展示]").set('ai',function(target){return Math.random();});
                    'step 3'
                    event.target=result.targets[0];
                    event.target.chooseToDiscard('h',true).set('showCards',true);
                    'step 4'
                    if(get.type(result.cards[0])=='faShu'){
                        player.addZhiShiWu('shouHun');
                    }
                },

            },
            shouFan:{
                trigger:{player:'zaoChengShangHai'},
                filter:function(event,player){
                    return get.is.faShuShangHai(event)&&player.countZhiShiWu('shouHun')>0&&event.source;
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('shouHun');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list)
                    .set('prompt',get.prompt('shouFan'))
                    .set('prompt2',lib.translate.shouFan_info)
                    .forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                logTarget:'source',
                content:function(){
                    'step 0'
                    event.num=event.cost_data;
                    player.removeZhiShiWu('shouHun',event.num);
                    'step 1'
                    player.chooseToDiscard('h',true,event.num);
                    'step 2'
                    if(trigger.source.countCards('h')>0) trigger.source.chooseToDiscard('h',true).set('showCards',true);
                    else event.finish();
                    'step 3'
                    if(get.type(result.cards[0])=='faShu'){
                        player.addZhiShiWu('shouHun');
                    }
                }

            },
            yuHunLiuJuHeXingTai:{
                group:['yuHunLiuJuHeXingTai_shangHai','yuHunLiuJuHeXingTai_shouHunJianShao','yuHunLiuJuHeXingTai_shangHaiTuoLi','yuHunLiuJuHeXingTai_shouHunTuoLi'],
                subSkill:{
                    shangHai:{
                        trigger:{source:'zaoChengShangHai'},
                        filter:function(event,player){
                            return player.isHengZhi()&&event.player.isHengZhi()&&event.faShu!=true;
                        },
                        forced:true,
                        content:function(){
                            trigger.num++;
                        }
                    },
                    shouHunJianShao:{
                        trigger:{player:'phaseEndBefore'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi()&&player.countZhiShiWu('shouHun')>0;
                        },
                        content:function(){
                            player.removeZhiShiWu('shouHun');
                        }
                    },
                    shangHaiTuoLi:{
                        trigger:{source:'chengShouShangHai'},
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        forced:true,
                        content:function(){
                            player.chongZhi();
                        }
                    },
                    shouHunTuoLi:{
                        trigger:{player:'phaseEnd'},
                        priority:0,
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi()&&player.countZhiShiWu('shouHun')==0;
                        },
                        content:function(){
                            player.chongZhi();
                        }
                    }
                }
            },
            niFanJuHeZhan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return player.isHengZhi()&&event.target.countCards('h')<4;
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('shouHun');
                    for(var i=0;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list)
                    .set('prompt',get.prompt('niFanJuHeZhan'))
                    .set('prompt2',lib.translate.niFanJuHeZhan_info)
                    .forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:function(){
                    'step 0'
                    trigger.customArgs.niFanJuHeZhan_num=event.cost_data;
                    if(event.cost_data>0){
                        player.removeZhiShiWu('shouHun',event.cost_data);
                    }
                },
                group:'niFanJuHeZhan_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        trigger:{source:'gongJiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return typeof event.customArgs.niFanJuHeZhan_num=='number';
                        },
                        content:function(){
                            'step 0'
                            trigger.target.chooseToDiscard('h',true,trigger.customArgs.niFanJuHeZhan_num+2);
                            'step 1'
                            if(result.cards.length<trigger.customArgs.niFanJuHeZhan_num+2){
                                trigger.target.changeShiQi(-1);
                            }
                            'step 2'
                            trigger.weiMingZhong();
                        }
                    }
                }
            },
            yuHunLiuJuHeShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('shouHun',1,Infinity);
                    'step 2'
                    var list=['摸','弃','放弃'];
                    player.chooseControl(list).set('prompt','摸或弃1张牌').set('ai',function(){
                        var player=_status.event.player;
                        var cards=player.getCards('h');
                        var bool=false;
                        for(var card of cards){
                            if(player.hasUseTargetXingBei(card)) bool=true;
                            if(bool) break;
                        }
                        if(!bool) return '摸';
                        if(player.countCards('h')+1>=player.getHandcardLimit()) return '弃';
                        if(player.countCards('h')<player.getHandcardLimit()-2) return '摸';
                        return '放弃';
                    });
                    'step 3'
                    if(result.control=='摸'){
                        player.draw();
                    }else if(result.control=='弃'){
                        player.chooseToDiscard('h',true,1);
                    }
                    'step 4'
                    if(player.isHengZhi()){
                        player.addZhiShiWu('canXin');
                    }else{
                        player.hengZhi();
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            shouHun:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            canXin:{
                intro:{
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            //灵魂术士
            lingHunTunShi:{
                forced:true,
                trigger:{global:'changeShiQiAfter'},
                filter:function(event,player){
                    return player.side==event.side&&event.num<0;
                },
                content:function(){
                    player.addZhiShiWu('huangSeLingHun',Math.abs(trigger.num));
                }
            },
            lingHunZhaoHuan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.lingHunZhaoHuan.filterCard(card))>0;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectCard:[1,Infinity],
                discard:true,
                showCards:true,
                content:function(){
                    player.addZhiShiWu('lanSeLingHun',cards.length);
                },
                ai:{
                    order:function(item,player){
                        return 2.1+player.countCards('h',card=>lib.skill.lingHunZhaoHuan.filterCard(card))*0.7;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            lingHunZhuanHuan:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&(player.hasZhiShiWu('huangSeLingHun')||player.hasZhiShiWu('lanSeLingHun'));
                },
                content:async function(event,trigger,player){
                    var lanSe=player.hasZhiShiWu('lanSeLingHun');
                    var huangSe=player.hasZhiShiWu('huangSeLingHun');
                    if(lanSe&&huangSe){
                        var list=['黄色->蓝色','蓝色->黄色'];
                        var control=await player.chooseControl(list).set('prompt','选择转换的灵魂').set('ai',function(){
                            var player=_status.event.player;
                            if(player.countZhiShiWu('lanSeLingHun')>=player.countZhiShiWu('huangSeLingHun')) return '黄色->蓝色';
                            else return '蓝色->黄色';
                        }).forResultControl();
                        if(control=='黄色->蓝色'){
                            await player.removeZhiShiWu('huangSeLingHun');
                            await player.addZhiShiWu('lanSeLingHun');
                        }else if(control=='蓝色->黄色'){
                            await player.removeZhiShiWu('lanSeLingHun');
                            await player.addZhiShiWu('huangSeLingHun');
                        }
                    }else if(lanSe){
                        await player.removeZhiShiWu('lanSeLingHun');
                        await player.addZhiShiWu('huangSeLingHun');
                    }else if(huangSe){
                        await player.removeZhiShiWu('huangSeLingHun');
                        await player.addZhiShiWu('lanSeLingHun');
                    }
                }
            },
            lingHunJingXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('huangSeLingHun')>=2;
                },
                selectTarget:1,
                filterTarget:true,
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('huangSeLingHun',2);
                    await player.chooseToDiscard('h',true,2);

                    var chaZhi=event.target.getHandcardLimit()-event.target.countCards('h');
                    var num=Math.min(2,chaZhi);
                    await event.target.draw(num);
                },
                ai:{
                    order:function(item,player){
                        return 4-(player.getHandcardLimit()-player.countCards('h'))*0.6;
                    },
                    result:{
                        target:-1,
                    }
                }
            },
            lingHunZhenBao:{
                type:'faShu',
                enable:['faShu'],
                duYou:'lingHunZhenBao',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.lingHunZhenBao.filterCard(card))&&player.countZhiShiWu('huangSeLingHun')>=3;
                },
                useCard:true,
                filterCard:function(card){
                    return card.hasDuYou('lingHunZhenBao');
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('huangSeLingHun',3);
                    'step 1'
                    var num=3;
                    if(target.countCards('h')<3&&target.getHandcardLimit()>5){
                        num+=2;
                    }
                    target.faShuDamage(num,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        },
                    }
                }
            },
            lingHunFuYu:{
                type:'faShu',
                enable:['faShu'],
                duYou:'lingHunFuYu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.lingHunFuYu.filterCard(card))&&player.countZhiShiWu('lanSeLingHun')>=3
                },
                useCard:true,
                filterCard:function(card){
                    return card.hasDuYou('lingHunFuYu');
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('lanSeLingHun',3);
                    'step 1'
                    target.addNengLiang('baoShi',2);
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.getHandcardLimit()-target.countNengLiangAll()>=2){
                                return 2;
                            }else if(target.getHandcardLimit()-target.countNengLiangAll()>=1){
                                return 1;
                            }else{
                                return 0;
                            }
                        }
                    }
                }
            },
            lingHunLianJie:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    if(game.players.length==4) return false;
                    if(player.storage.lingHunLianJieTarget) return false;
                    return player.hasZhiShiWu('huangSeLingHun')&&player.hasZhiShiWu('lanSeLingHun');
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('huangSeLingHun');
                    await player.removeZhiShiWu('lanSeLingHun'); 
                    var target=await player.chooseTarget('将【灵魂链接】放置于一名队友面前',true,function(card,player,target){
                        return target!=player&&target.side==player.side;
                    }).forResultTargets();
                    target=target[0];

                    player.storage.lingHunLianJieTarget=target;
                    await target.addZhiShiWu('lingHunLianJie',true);
                },
                intro:{
                    name:'[专属]灵魂链接',
                    content:"<span class='tiaoJian'>(每当你们之间有人承受伤害时⑥，移除X点</span><span class='lan'>【蓝色灵魂】</span><span class='tiaoJian'>)</span>将X点伤害转移给另1人，转移后的伤害为法术伤害⑥。",  
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/lingHunLianJie.png',
                group:'lingHunLianJie_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'chengShouShangHai'},
                        filter:function(event,player){
                            if(event.lingHunLianJie) return false;
                            if(!player.storage.lingHunLianJieTarget) return false;
                            if(!(event.player==player.storage.lingHunLianJieTarget||event.player==player)) return false;
                            return player.hasZhiShiWu('lanSeLingHun');
                        },
                        async cost(event,trigger,player){
                            var num=player.countZhiShiWu('lanSeLingHun');
                            var list=[];
                            for(var i=1;i<=num;i++){
                                if(i>trigger.num) break;
                                list.push(i);
                            }
                            list.push('cancel2');
                            //计算移除量
                            var num1=player.getHandcardLimit()-player.countCards('h');
                            var num2=player.storage.lingHunLianJieTarget.getHandcardLimit()-player.storage.lingHunLianJieTarget.countCards('h');
                            if(trigger.player==player){
                                var yiChu=trigger.num-num1;
                                yiChu=Math.min(yiChu,list.length-1);
                                yiChu=Math.min(yiChu,num2);
                            }else{
                                var yiChu=trigger.num-num2;
                                yiChu=Math.min(yiChu,list.length-1);
                                yiChu=Math.min(yiChu,num1);
                            }
                            yiChu=Math.max(yiChu,1);

                            if(event.player.name=='xianZhe'&&event.faShu==true){
                                if(event.num==1||event.num==4) yiChu='cancel2';
                            }
                            var num1=player.getHandcardLimit()-player.countCards('h');
                            var num2=player.storage.lingHunLianJieTarget.getHandcardLimit()-player.storage.lingHunLianJieTarget.countCards('h');
                            if(event.player==player){ 
                                if(event.num<=num1) yiChu='cancel2';
                            }else{
                                if(event.num<=num2) yiChu='cancel2';
                            }


                            var name=get.translation(trigger.player);
                            var str=`<br>${name}承受了${trigger.num}点伤害`;
                            var control=await player.chooseControl(list)
                            .set('prompt',get.prompt('lingHunLianJie')+str)
                            .set('prompt2',lib.translate.lingHunLianJie_info)
                            .set('ai',function(player){
                                var yiChu=_status.event.yiChu;
                                if(yiChu=='cancel2') return 'cancel2';
                                else return yiChu-1;
                            })
                            .set('yiChu',yiChu)
                            .forResultControl();
                            event.result={
                                bool:control!='cancel2',
                                cost_data:control,
                            }
                        },
                        content:function(){
                            'step 0'
                            event.num=event.cost_data;
                            player.removeZhiShiWu('lanSeLingHun',event.num)
                            trigger.num-=event.num;
                            'step 1'
                            var list=[player,player.storage.lingHunLianJieTarget];
                            list.sortBySeat(_status.currentPhase);
                            if(list[0]==player){
                                if(trigger.player==player){
                                    trigger.insertAfter(function(){
                                        player.faShuDamage(num,source).set('step',4).set('lingHunLianJie',true);
                                    },{
                                        player:player.storage.lingHunLianJieTarget,
                                        num:event.num,
                                        source:player,
                                    });
                                }else{
                                    player.faShuDamage(event.num,player).set('step',4).set('lingHunLianJie',true);
                                }
                            }else{
                                if(trigger.player==player){
                                    player.storage.lingHunLianJieTarget.faShuDamage(event.num,player).set('step',4).set('lingHunLianJie',true);
                                }else{
                                    trigger.insertAfter(function(){
                                        player.faShuDamage(num,player).set('step',4).set('lingHunLianJie',true);
                                    },{
                                        player:player,
                                        num:event.num,
                                    }) 
                                }
                            }
                        },
                    }
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                }
            },
            lingHunZengFu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('huangSeLingHun',2);
                    'step 2'
                    player.addZhiShiWu('lanSeLingHun',2);
                },
                ai:{
                    baoShi:true,
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                }
            },
            huangSeLingHun:{
                intro:{
                    content:'mark',
                    max:6
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
            lanSeLingHun:{
                intro:{
                    content:'mark',
                    max:6
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/lan.png',
            },
            //血之巫女
            xueZhiAiShang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.storage.tongShengGongSi_use;
                },
                content:async function(event,trigger,player){
                    await player.faShuDamage(2,player);

                    var result=await player.chooseTarget('转移【同生共死】目标，取消则移除【同生共死】',function(card,player,target){
                        return target!=_status.event.targetX;
                    })
                    .set('targetX',player.storage.tongShengGongSi_target)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        if(target==player) return -1;
                        if(target.side==player.side) return -1;
                        else return 1;
                    }).forResult();
                    
                    if(result.bool){
                        await player.storage.tongShengGongSi_target.removeZhiShiWu('tongShengGongSi_xiaoGuo');
                        var target=result.targets[0];
                        if(!target.hasSkill('tongShengGongSi_xiaoGuo')){
                            target.storage.tongShengGongSi_player=player;
                            target.addSkill('tongShengGongSi_xiaoGuo');                
                        }
                        player.storage.tongShengGongSi_target=target;
                        await target.addZhiShiWu('tongShengGongSi_xiaoGuo');
                    }else{
                        await player.storage.tongShengGongSi_target.removeZhiShiWu('tongShengGongSi_xiaoGuo');
                        player.storage.tongShengGongSi_use=false;
                        player.storage.tongShengGongSi_target=undefined;
                    }
                },
                check:function(event,player){
                    if(player.isHengZhi()&&player.storage.tongShengGongSi_target.side==player.side) return false;
                    if(!(player.canGongJi()||player.canFaShu())) return false;
                    var minus=player.getHandcardLimit()-player.countCards('h');
                    return minus>=2;
                }
            },
            liuXue:{
                forced:true,
                trigger:{player:'changeShiQiEnd'},
                filter:function(event,player){
                    return event.num<0&&event.cause=='damage'&&!player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.changeZhiLiao(1);
                },
                group:['liuXue_shangHai','liuXue_chongZhi'],
                subSkill:{
                    shangHai:{
                        trigger:{player:'phaseBegin'},
                        direct:true,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            player.faShuDamage(1,player);
                        }
                    },
                    chongZhi:{
                        trigger:{
                            player:'loseAfter',
                            global:['gainAfter','loseAsyncAfter','addToExpansionAfter'],
                        },
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            if(event.name=='gain'&&event.player==player) return false;
                            var evt=event.getl(player);
                            return evt&&evt.cards2&&evt.cards2.length>0&&player.countCards('h')<3;
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chongZhi();
                        }
                    }
                }
            },
            niLiu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.isHengZhi();
                },
                selectCard:2,
                filterCard:true,
                discard:true,
                content:function(){
                    'step 0'
                    player.changeZhiLiao(1);
                },
                ai:{
                    order:3.6,
                    result:{
                        player:2,
                    }
                }
            },
            xueZhiBeiMing:{
                type:'faShu',
                enable:['faShu'],
                duYou:'xueZhiBeiMing',
                filter:function(event,player){
                    return player.isHengZhi()&&player.hasCard(card=>lib.skill.xueZhiBeiMing.filterCard(card));
                },
                filterCard:function(card){
                    return card.hasDuYou('xueZhiBeiMing');
                },
                selectCard:1,
                useCard:true,
                filterTarget:true,
                selectTarget:1,
                contentBefore:function(){
                    'step 0'
                    var list=[0,1,2];
                    player.chooseControl(list).set('prompt','对目标角色和自己各造成(X+1)点法术伤害③').set('ai',function(){
                        var num=Math.random();
                        if(num>0.5) return 1;
                        else if(num>0.2) return 2;
                        else return 0;
                    });
                    'step 1'
                    player.storage.xueZhiBeiMin=result.control+1;
                },
                content:function(){
                    'step 0'
                    target.faShuDamage(player.storage.xueZhiBeiMin,player);
                    'step 1'
                    player.faShuDamage(player.storage.xueZhiBeiMin,player);
                },
                ai:{
                    order:function(card,player){
                        return 7-player.countCards('h');
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2)
                        }
                    }
                }
            },
            tongShengGongSi:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return !player.storage.tongShengGongSi_use;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.storage.tongShengGongSi_target=target;
                    player.storage.tongShengGongSi_use=true;
                    
                    if(!target.hasSkill('tongShengGongSi_xiaoGuo')){
                        target.storage.tongShengGongSi_player=player;
                        target.addSkill('tongShengGongSi_xiaoGuo');
                    }
                    'step 2'
                    target.addZhiShiWu('tongShengGongSi_xiaoGuo');
                },
                group:'tongShengGongSi_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        intro:{
                            content:"<span class='tiaoJian'>(在【普通形态】下)</span>你和他手牌上限各-2。 <span class='tiaoJian'>(在【流血形态】下)</span>你和他手牌上限各+1。",
                            nocount:true,
                        },
                        onremove:'storage',
                        markimage:'image/card/zhuanShu/tongShengGongSi.png',

                        mod:{
                            maxHandcard:function(player,num){
                                if(player.storage.tongShengGongSi_use){
                                    if(player.isHengZhi()){
                                        return num+1;
                                    }else{
                                        return num-2;
                                    }
                                }else if(player.hasZhiShiWu('tongShengGongSi_xiaoGuo')){
                                        if(player.storage.tongShengGongSi_player.isHengZhi()){
                                            return num+1;
                                        }else{
                                            return num-2;
                                    }
                                }
                            }
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var num=0;
                        if(player.isHengZhi()) num+=2;
                        return 7-player.countCards('h')+num;
                    },
                    result:{
                        target:function(player,target){
                            return -target.countCards('h');
                        },
                    }
                }
            },
            xueZhiZuZhou:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                selectTarget:1,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    target.faShuDamage(2,player);
                    'step 2'
                    player.chooseToDiscard(3,true,'h');
                },
                ai:{
                    baoShi:true,
                    order:function(card,player){
                        return 1.7+player.countCards('h')*0.5;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2)
                        }
                    }
                }
            },
            //蝶舞者
            shengMingZhiHuo:{
                mod:{
                    maxHandcardFinal:function(player,num){
                        var x=player.countZhiShiWu('DWZyong');
                        var n=num-x;
                        if(n<=3){
                            return 3;
                        }else{
                            return n
                        }
                    }
                }
            },
            wuDong:{
                type:"faShu",
                enable:['faShu'],
                selectCard:[0,1],
                filterCard:true,
                content:function(){
                    'step 0'
                    if(cards.length==0){
                        player.draw();
                    }
                    'step 1'
                    var cards=get.cards();
                    player.addToExpansion('draw',cards,'log').gaintag.add('jian');
                },
                ai:{
                    order:3.6,
                    result:{
                        player:function(player){
                            return player.getExpansions('jian').length<=6?1:0;
                        },
                    }
                },
                mod:{
                    aiOrder:function(player,item,num){
                        if(item=='_tiLian'&&player.getExpansions('jian').length>4) return num+1;
                    }
                }
            },
            duFen:{
                trigger:{global:'chanShengShangHai'},
                filter:function(event,player){
                    return event.num==1&&event.faShu==true&&player.getExpansions('jian').length>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('jian');
                    var name=get.colorName(trigger.player);
                    var result=await player.chooseCardButton(cards,"是否发动【毒粉】,移除1个【茧】,该次伤害额外+1，目标"+name)
                    .set('ai',function(button){
                        if(_status.event.bool) return 0;
                        return 1;
                    })
                    .set('bool',trigger.player.side==player.side)
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jian').set('jian',true);
                    'step 1'
                    trigger.changeDamageNum(1);
                },
            },
            chaoSheng:{
                trigger:{player:'chengShouShangHai'},
                filter:function(event,player){
                    return event.num>0&&player.getExpansions('jian').length>0;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('jian');
                    var result=await player.chooseCardButton(cards,"是否发动【朝圣】,移除1个【茧】,抵御1点该来源的伤害,目前伤害量"+trigger.num)
                    .set('ai',function(button){
                        return 0;
                    })
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jian').set('jian',true);
                    'step 2'
                    trigger.changeDamageNum(-1);
                }
            },
            jingHuaShuiYue:{
                trigger:{global:'chengShouShangHai'},
                filter:function(event,player){
                    return event.num==2&&event.faShu==true&&player.getExpansions('jian').length>1;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('jian');
                    var name=get.colorName(trigger.player);
                    var result=await player.chooseCardButton(cards,2,"是否发动【镜花水月】，移除2张同系【茧】，目标"+name)
                    .set('filterButton',function(button){
                        if(ui.selected.buttons.length==0) return true;
                        var xiBie=get.xiBie(button.link);
                        if(xiBie==get.xiBie(ui.selected.buttons[0].link)) return true;
                        else return false;
                    })
                    .set('ai',function(button){
                        if(_status.event.bool) return 0;
                        return 1;
                    })
                    .set('bool',trigger.player.side==player.side)
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'jian').set('jian',true).set('showHiddenCards',true);
                    'step 1'
                    trigger.num=0;
                    'step 2'
                    trigger.player.faShuDamage(1,player);
                    'step 3'
                    trigger.player.faShuDamage(1,player);
                },
            },
            diaoLing:{
                trigger:{player:'discard'},
                filter:function(event,player){
                    return event.jian;
                },
                async cost(event,trigger,player){
                    var cards=trigger.cards;
                    var result=await player.chooseCardButton(cards,[1,Infinity],"是否发动【凋零】,展示法术【茧】")
                    .set('filterButton',function(button){
                        return get.type(button)=='faShu';
                    })
                    .set('ai',function(button){
                        var player=_status.event.player;
                        if(player.countSkill('diaoLing')==1) return 0;
                        var num=player.getHandcardLimit()-player.countCards('h');
                        if(num>2) return 1;
                        else return 0;
                    })
                    .forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:async function(event,trigger,player){
                    if(!player.hasSkill('diaoLing_xiaoGuo')) player.addTempSkill('diaoLing_xiaoGuo',{player:'phaseBefore'});
                    await player.showHiddenCards(event.cost_data);
                    var target,targets;
                    for(var i=0;i<event.cost_data.length;i++){
                        targets=await player.chooseTarget('对目标角色造成1点法术伤害',true)
                        .set('ai',function(target){
                            var player=_status.event.player;
                            return target.side!=player.side;
                        }).forResultTargets();
                        target=targets[0];
                        await target.faShuDamage(1,player);
                        await player.faShuDamage(2,player);    
                    }
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'changeShiQiJudge'},
                        filter:function(event,player){
                            if(event.num>0) return false;
                            if(player.side==event.side) return false;
                            var shiQi=get.shiQi(!player.side);
                            return shiQi+event.num<1;
                        },
                        direct:true,
                        content:function(){
                            var shiQi=get.shiQi(!player.side);
                            var num=1-shiQi;
                            trigger.num=num;
                        }
                    }
                }
            },
            yongHua:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    if(!player.hasSkill('DWZyong')) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('DWZyong');
                    'step 2'
                    var card=get.cards(4);
                    player.addToExpansion('draw',card,'log').gaintag.add('jian');
                },
                ai:{
                    baoShi:true,
                    order:function(card,player){
                        return 9-player.getExpansions('jian').length;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            daoNiZhiDie:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.chooseToDiscard(2,true);
                    var choiceList=['对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御',"<span class='tiaoJian'>(移除2个【茧】或对自己造成4点法术伤害③)</span>移除1个<span class='hong'>【蛹】</span>"];
                    var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        return '选项一';
                    }).forResultControl();

                    if(control=='选项一'){
                        var targets=await player.chooseTarget("对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御",true)
                        .set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
                        }).forResultTargets();
                        var target=targets[0];
                        await target.faShuDamage(1,player).set('canZhiLiao',false);
                    }else if(control=='选项二'){
                        var cards=player.getExpansions('jian');
                        if(cards.length>0){
                            var result=await player.chooseCardButton(cards,2,'移除2个【茧】或对自己造成4点法术伤害③').forResult();
                        }else{
                            var result={bool:false};
                        }
                        if(result.bool){
                            await player.discard(result.links,'jian').set('jian',true);
                        }else{
                            await player.faShuDamage(4,player);
                        }
                        await player.removeZhiShiWu('DWZyong');
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.5,
                    result:{
                        player:1,
                    }
                }
            },
            jian:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('jian');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                trigger:{player:'addToExpansionAfter'},
                filter:function(event,player){
                    return event.gaintag.includes('jian')&&player.getExpansions('jian').length>8;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var num=player.getExpansions('jian').length;
                    var cards=player.getExpansions('jian');
                    player.chooseCardButton(num-8,true,cards,`舍弃${num-8}张【茧】`);
                    'step 1'
                    player.discard(result.links,'jian').set('sheQi',true);
                }
            },
            DWZyong:{
                intro:{
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png'
            },
        },
		
		translate:{
            //角色名字
			fengZhiJianSheng:"风之剑圣",
            kuangZhanShi:"狂战士",
            shenJianShou:"神箭手",
            fengYinShi:"封印师",
            anShaZhe:"暗杀者",
            shengNv:"圣女",
            tianShi:"天使",
            moFaShaoNv:"魔法少女",
            moJianShi:"魔剑士",
            shengQiangQiShi:"圣枪骑士",
            yuanSuShi:"元素师",
            maoXianJia:"冒险家",
            wenYiFaShi:"瘟疫法师",
            zhongCaiZhe:"仲裁者",
            shenGuan:"神官",
            qiDaoShi:"祈祷师",
            xianZhe:"贤者",
            lingFuShi:"灵符师",
            jianDi:"剑帝",
            geDouJia:"格斗家",
            yongZhe:"勇者",
            lingHunShuShi:"灵魂术士",
            xueZhiWuNv:"血之巫女",
            dieWuZhe:"蝶舞者",
            nvWuShen:"女武神",
            moGong:"魔弓",
            hongLianQiShi:"红莲骑士",
            yingLingRenXing:"英灵人形",
            moQiang:"魔枪",
            cangYanMoNv:"苍炎魔女",
            yinYouShiRen:"吟游诗人",
            jingLingSheShou:"精灵射手",
            yinYangShi:"阴阳师",
            xueSeJianLing:"血色剑灵",
            yueZhiNvShen:"月之女神",
            shouLingWuShi:"兽灵武士",
            shengGong:"圣弓",

            fengZhiJianSheng_name:"威斯特姆",
            kuangZhanShi_name:"阿基特",
            shenJianShou_name:"安娜",
            fengYinShi_name:"帕蒂",
            anShaZhe_name:"无念",
            shengNv_name:"艾丽卡",
            tianShi_name:"玛利亚",
            moFaShaoNv_name:"妮娅",
            moJianShi_name:"美狄亚",
            shengQiangQiShi_name:"斯庇尔",
            yuanSuShi_name:"索尔斯",
            maoXianJia_name:"莉莉安娜",
            wenYiFaShi_name:"塔格奥",
            zhongCaiZhe_name:"赛尔娜",
            shenGuan_name:"丽格蕾朵",
            qiDaoShi_name:"珐珞",
            xianZhe_name:"诺雷杰",
            lingFuShi_name:"风音",
            jianDi_name:"卡特琳娜",
            geDouJia_name:"凌薇",
            yongZhe_name:"尤里乌斯",
            lingHunShuShi_name:"狄亚娜",
            xueZhiWuNv_name:"紫苑",
            dieWuZhe_name:"华胥",
            nvWuShen_name:"米涅瓦/栞蒂",
            moGong_name:"泰罗莎",
            hongLianQiShi_name:"斯卡雷特",
            yingLingRenXing_name:"零",
            moQiang_name:"菲欧娜",
            cangYanMoNv_name:"莉莉丝",
            yinYouShiRen_name:"詹姆",
            jingLingSheShou_name:"波阿狄西亚",
            yinYangShi_name:"轮&环",
            xueSeJianLing_name:"罗丝菲莉",
            yueZhiNvShen_name:"尤瑞艾莉",
            shouLingWuShi_name:"菖蒲",
            shengGong_name:"萨哈魁尔",

            
            
            //风之剑圣
            fengNuZhuiJi:'[响应]风怒追击[回合限定]',
            fengNuZhuiJi_info:"<span class='tiaoJian'>([攻击行动]结束后发动)</span>额外+1风系[攻击行动]",
            shengJian:'[被动]圣剑',
            shengJian_info:"若你的主动攻击为本次行动阶段的第3次[攻击行动]，则此攻击强制命中。本次[攻击行动]结束时，你摸X张牌，弃X张牌(X<4)。",
            lieFengJi:"(独)[响应]烈风技",
            lieFengJi_info:"<span class='tiaoJian'>(攻击的目标拥有圣盾时发动)</span>无视对手圣盾的效果,且此攻击对手无法应战。",
            jiFengJi:"(独)[响应]疾风技",
            jiFengJi_info:"<span class='tiaoJian'>(作为主动攻击打出后发动)</span>额外+1[攻击行动]。",
            jianYing:"[响应]剑影[回合限定]",
            jianYing_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束后发动)</span>额外+1[攻击行动]。",

            //狂战士
            kuangHua:"[被动]狂化",
            kuangHua_info:"你发动的所有攻击伤害额外+1；<span class='tiaoJian'>(攻击命中时②，若你的手牌数>3)</span>本次攻击伤害额外+1。",
            xueYingKuangDao:"(独)[响应]血影狂刀",
            xueYingKuangDao_info:"<span class='tiaoJian'>(作为主动攻击打出时发动)</span><br>·若命中手牌为2的对手②，本次攻击伤害额外+2；<br>·若命中手牌为3的对手②，本次攻击伤害额外+1。",
            xueXingPaoXiao:"(独)[响应]血腥咆哮",
            xueXingPaoXiao_info:'<span class="tiaoJian">(作为主动攻击打出时发动)</span>若攻击的目标拥有的[治疗]为2，则本次攻击强制命中。',
            siLie:"[响应]撕裂",
            siLie_info:"[宝石]<span class='tiaoJian'>(攻击命中后发动②)</span>本次攻击伤害额外+2。",

            //圣女
            bingShuangDaoYan:"[被动]冰霜祷言",
            bingShuangDaoYan_info:"<span class='tiaoJian'>(每当你使用水系牌或【圣光】时发动)</span>目标角色+1[治疗]。",
            zhiLiaoShu:"(独)[法术]治疗术",
            zhiLiaoShu_info:"目标角色+2[治疗]。",
            zhiYuZhiGuang:"(独)[法术]治愈之光",
            zhiYuZhiGuang_info:"指定最多3名角色各+1[治疗]。",
            lianMin:"[启动]怜悯[持续]",
            lianMin_info:"[宝石][横置]你的手牌上限恒定为7[持续]，你+1[水晶]。",
            shengLiao:"[法术]圣疗[回合限定]",
            shengLiao_info:"[水晶]任意分配3[治疗]给1~3名角色，额外+1[攻击行动]或[法术行动]。",

            //暗杀者
            fanShi:"[被动]反噬",
            fanShi_info:"<span class='tiaoJian'>(承受攻击伤害时发动⑥)</span>攻击你的对手摸1张牌[强制]。",
            shuiYing:"[响应]水影",
            shuiYing_info:"<span class='tiaoJian'>(除【特殊行动】外，当你摸牌前发动)</span>弃X张水系牌[展示]；<span class='tiaoJian'>(若你处于【潜行】效果下)</span>你可额外弃1张法术牌[展示]。",
            qianXing:"[启动]潜行",
            qianXing_info:"[宝石]你可选择摸1张牌，[横置]持续到你的下个行动阶段开始，你的手牌上限-1；你不能成为主动攻击的目标；你的主动攻击对手无法应战且伤害额外+X，X为你剩余的【能量】数。【潜行】的效果结束时[重置]。",

            //封印师
            faShuJiDang:"[响应]法术激荡",
            faShuJiDang_info:"<span class='tiaoJian'>([法术行动]结束后发动)</span>额外+1[攻击行动]。",
            diZhiFengYin:"(独)[法术]地之封印",
            diZhiFengYin_xiaoGuo:'地之封印',
            diZhiFengYin_info:"<span class='tiaoJian'>(将【地之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出地系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            shuiZhiFengYin:"(独)[法术]水之封印",
            shuiZhiFengYin_xiaoGuo:"水之封印",
            shuiZhiFengYin_info:"<span class='tiaoJian'>(将【水之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出水系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            huoZhiFengYin:"(独)[法术]火之封印",
            huoZhiFengYin_xiaoGuo:"火之封印",
            huoZhiFengYin_info:"<span class='tiaoJian'>(将【火之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出火系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            fengZhiFengYin:"(独)[法术]风之封印",
            fengZhiFengYin_xiaoGuo:'风之封印',
            fengZhiFengYin_info:"<span class='tiaoJian'>(将【风之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出风系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            leiZhiFengYin:"(独)[法术]雷之封印",
            leiZhiFengYin_xiaoGuo:'雷之封印',
            leiZhiFengYin_info:"<span class='tiaoJian'>(将【雷之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出雷系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            wuXiShuFu:"(专)[法术]五系束缚",
            wuXiShuFu_xiaoGuo:"五系束缚",
            wuXiShuFu_info:"[水晶]<span class='tiaoJian'>(将【五系束缚】放置于目标对手面前)</span>该对手跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸(2+X)张牌来取消【五系束缚】的效果。X为场上封印的数量，X最高为2。无论效果是否发动，触发后移除此牌。",
            fengYinPoSui:"[法术]封印破碎",
            fengYinPoSui_info:"[水晶]将场上任意一张基础效果牌收入自己手中。",

            
            //天使
            fengZhiJieJing:'[法术]风之洁净',
            fengZhiJieJing_info:"<span class='tiaoJian'>(弃1张风系牌[展示])</span>移除场上任意一个基础效果。",
            tianShiZhuFu:"[法术]天使祝福",
            tianShiZhuFu_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>目标角色给你2张牌或指定2名角色各给你1张牌。",
            tianShiJiBan:"[被动]天使羁绊",
            tianShiJiBan_info:"<span class='tiaoJian'>(每当你移除场上任意一个基础效果或使用【圣盾】时)</span>目标角色+1[治疗]。",
            tianShiZhiQiang:"(独)[法术]天使之墙",
            tianShiZhiQiang_info:"可作为【圣盾】使用。",
            tianShiZhiGe:"[响应]天使之歌[回合限定]",
            tianShiZhiGe_info:"[水晶]<span class='tiaoJian'>(在你的回合开始前发动)</span>移除场上任意一个基础效果。",
            shenZhiBiHu:"[响应]神之庇护",
            shenZhiBiHu_info:"X[水晶]为我方抵御X点因法术伤害而造成的士气下降。",

            //神箭手
            shanDianJian:"[被动]闪电箭",
            shanDianJian_info:"你的雷系攻击对手无法应战。",
            guanChuanSheJi:"[响应]贯穿射击",
            guanChuanSheJi_info:"<span class='tiaoJian'>(主动攻击未命中时发动①，弃1张法术牌[展示])</span>对你所攻击的目标造成2点法术伤害③。",
            shanGuangXianJing:'(独)[法术]闪光陷阱',
            shanGuangXianJing_info:"对目标角色造成2点法术伤害③。",
            jingZhunSheJi:"(独)[响应]精准射击",
            jingZhunSheJi_info:"此攻击强制命中，但本次攻击伤害-1。",
            juJi:"[法术]狙击",
            juJi_info:"[水晶]目标角色手牌补到5张[强制]，额外+1[攻击行动]",

            //魔法少女
            moBaoChongJi:'[法术]魔爆冲击',
            moBaoChongJi_info:'<span class="tiaoJian">(弃1张法术牌[展示])</span>我方【战绩区】+1[宝石]。2名目标对手各弃一张法术牌[展示]，每有人不如此做，你对他造成2点法术伤害③、你弃1张牌。',
            moDanZhangWo:'[响应]魔弹掌握',
            moDanZhangWo_info:'你主动使用【魔弹】时可以选择逆向传递。',
            moDanRongHe:'[响应]魔弹融合',
            moDanRongHe_info:'你的地系或火系牌可以当【魔弹】使用。',
            huiMieFengBao:'[法术]毁灭风暴',
            huiMieFengBao_info:'[宝石]对2名目标对手各造成2点法术伤害③。',

            //女武神
            shenShengZhuiJi:"[响应]神圣追击",
            shenShengZhuiJi_info:"<span class='tiaoJian'>([攻击行动]或[法术行动]结束后，移除你的1[治疗])</span>额外+1[攻击行动]。",
            zhiXuZhiYin:"[法术]秩序之印",
            zhiXuZhiYin_info:"<span class='tiaoJian'>(摸2张牌[强制])</span>你加+1[治疗]并+1[水晶]。",
            hePingXingZhe:"[被动]和平行者",
            hePingXingZhe_info:"<span class='tiaoJian'>(你的回合内，发动【英灵召唤】后强制触发[强制])</span>[横置]，转入【英灵形态】；<span class='tiaoJian'>(每当你执行主动攻击时发动①)</span>[重置]脱离【英灵形态】。",
            junShenWeiGuan:"[被动]军神威光",
            junShenWeiGuan_info:"<span class='tiaoJian'>(回合开始时，若你处于【英灵形态】)</span>选择以下1项发动：<br>·你+1[治疗]，[重置]脱离【英灵形态】；<br>·<span class='tiaoJian'>(移除我方【战绩区】X个星石，X<3)</span>目标角色+X[治疗]。",
            yingLingZhaoHuan:"[响应]英灵召唤",
            yingLingZhaoHuan_info:"[水晶]<span class='tiaoJian'>(攻击命中时发动②)</span>本次攻击伤害额外+1，<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>目标角色+1[治疗]。",   

            //元素师
            yuanSuXiShou:'[响应]元素吸收',
            yuanSuXiShou_info:'<span class="tiaoJian">(对目标角色造成法术伤害时发动③)</span>你+1<span class="hong">【元素】</span>。',
            yuanSuDianRan:'[法术]元素点燃',
            yuanSuDianRan_info:'<span class="tiaoJian">(移除3点</span><span class="hong">【元素】</span><span class="tiaoJian">)</span>对目标角色造成2点法术伤害③，额外+1[法术行动]；不能与【元素吸收】同时发动。',
            yunShi:'(独)[法术]陨石',
            yunShi_info:'对目标角色造成1点法术伤害③，额外+1[法术行动]；<span class="tiaoJian">(若你额外弃1张地系牌[展示]①)</span>本次伤害额外+1。',
            bingDong:'(独)[法术]冰冻',
            bingDong_info:'对目标角色造成1点法术伤害③，并指定1名角色+1[治疗]<span class="tiaoJian">(若你额外弃1张水系牌[展示]①)</span>本次伤害额外+1。',
            huoQou:'(独)[法术]火球',
            huoQou_info:'对目标角色造成2点法术伤害③，<span class="tiaoJian">(若你额外弃1张火系牌[展示]①)</span>本次伤害额外+1。',
            fengRen:'(独)[法术]风刃',
            fengRen_info:'对目标角色造成1点法术伤害③，额外+1[攻击行动]；<span class="tiaoJian">(若你额外弃1张风系牌[展示]①)</span>本次伤害额外+1。',
            leiJi:'(独)[法术]雷击',
            leiJi_info:'对目标角色造成1点法术伤害③，我方【战绩区】+1[宝石]；<span class="tiaoJian">(若你额外弃1张雷系牌[展示]①)</span>本次伤害额外+1。',
            yueGuang:'[法术]月光',
            yueGuang_info:'[宝石]对目标角色造成(X+1)点法术伤害③，X为你剩余的【能量】数。',
            yuanSu:'元素',
            yuanSu_info:'</span><span class="hong">【元素】</span>为元素师专有指示物，上限为3。',

            //月之女神
            xinYueBiHu:"[响应]新月庇护[持续]",
            xinYueBiHu_info:"<span class='tiaoJian'>(我方角色因承受伤害造成手牌数超过手牌上限，导致士气即将下降时)</span>[横置]转为【暗月形态】，将因此而造成的弃牌面朝下放置于角色旁，作为【暗月】。本次士气不会下降。",
            anYueZuZhou:"[被动]暗月诅咒",
            anYueZuZhou_info:"<span class='tiaoJian'>(你每次移除【暗月】)</span>我方士气-1；<span class='tiaoJian'>(你的【暗月】数为0时)</span>[重置]脱离【暗月形态】。",
            meiDuShaZhiYan:"[响应]美杜莎之眼",
            meiDuShaZhiYan_info:"<span class='tiaoJian'>(目标对手攻击时①，移除1个与攻击牌系别相应的系别的【暗月】[展示])</span>你+1[治疗]，你+1<span class='lan'>【石化】</span>。<span class='tiaoJian'>(若该【暗月】为法术牌)</span>你弃1张牌，对目标对手造成1点法术伤害③。",
            yueZhiLunHui:"[响应]月之轮回",
            yueZhiLunHui_info:"<span class='tiaoJian'>(你的回合结束时)</span>选择以下一项发动：<br>·<span class='tiaoJian'>(移除1个【暗月】)</span>目标角色+1[治疗]；<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【新月】</span>。",
            yueDu:"[响应]月渎[回合限定]",
            yueDu_info:"<span class='tiaoJian'>(目标角色承受你造成的法术伤害⑥后，移除你的1[治疗])</span>对目标对手造成1点法术伤害③。",
            anYueZhan:"[响应]暗月斩",
            anYueZhan_info:"[水晶]<span class='tiaoJian'>(仅【暗月形态】下可发动，主动攻击命中时②，移除X个【暗月】(x<3))</span>本次攻击伤害额外+X。",
            cangBaiZhiYue:"[法术]苍白之月",
            cangBaiZhiYue_info:"[宝石]选择以下一项发动：<br>·<span class='tiaoJian'>(移除3点</span><span class='lan'>【石化】</span><span class='tiaoJian'>)</span>你的下次主动攻击对手无法应战，额外+1[攻击行动]。你额外获得一个回合；<br>·移除X点<span class='hong'>【新月】</span>，你+1点<span class='lan'>【石化】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③。",
            xinYue:"新月",
            xinYue_info:"<span class='hong'>【新月】</span>为月之女神专有指示物，上限为2。",
            shiHua:"石化",
            shiHua_info:"<span class='lan'>【石化】</span>为月之女神专有指示物，上限为3。",
            anYue:"暗月",
            anYue_info:"【暗月】为月之女神专用盖牌，无上限。",
            
            //仲裁者
            zhongCaiFaZe:"[被动]仲裁法则",
            zhongCaiFaZe_info:"游戏初始时。你加+2[水晶]。",
            yiShiZhongDuan:"[启动]仪式中断",
            yiShiZhongDuan_info:"<span class='tiaoJian'>(仅【审判形态】下发动)</span>[重置]脱离【审判形态】，我方【战绩区】+1[宝石]。",
            moRiShenPan:"[法术]末日审判",
            moRiShenPan_info:"<span class='tiaojian'>(移除所有</span><span class='hong'>【审判】</span><span class='tiaojian'>)</span>对目标角色造成等量的法术伤害③；在你的行动阶段开始时，若<span class='hong'>【审判】</span>已达到上限，该行动阶段你必须发动【末日审判】。",
            shenPanLangChao:"[被动]审判浪潮",
            shenPanLangChao_info:"<span class='tiaoJian'>(你每承受一次伤害⑥)</span>你+1<span class='hong'>【审判】</span>。",
            zhongCaiYiShi:"[启动]仲裁仪式[持续]",
            zhongCaiYiShi_info:"[宝石][横置]转为【审判形态】，你的手牌上限恒定为5[恒定]；每次你的回合开始时，你+1<span class='hong'>【审判】</span>。",
            panJueTianPing:"[法术]判决天平",
            panJueTianPing_info:"[水晶]你+1<span class='hong'>【审判】</span>，再选择一下一项发动：<br>·弃掉所有手牌。<br>·将你的手牌补到上限[强制]，我方【战绩区】+1[宝石]。",
            shenPan:"审判",
            shenPan_info:"<span class='hong'>【审判】</span>为仲裁者专有指示物，上限为4。",

            //冒险家
            qiZha:"[响应]欺诈",
            qiZha_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次除暗系以外的任意系的主动攻击，该系由你决定；或<span class='tiaoJian'>(弃3张同系牌[展示])</span>视为一次暗系的主动攻击。",
            qiangYun:"[被动]强运",
            qiangYun_info:"<span class='tiaoJian'>(当你发动【欺诈】时)</span>你+1[水晶]。",
            diXiaFaZe:"[被动]地下法则",
            diXiaFaZe_info:"<span class='tiaoJian'>(你执行【购买】时)</span>改为【战绩区】+2[宝石]。",
            maoXianJiaTianTang:"[响应]冒险者天堂",
            maoXianJiaTianTang_info:"<span class='tiaoJian'>(你执行【提炼】时)</span>将提炼出的[宝石]和[水晶]全部交给目标队友，然后移除你的1[能量]。",
            touTianHuanRi:"[法术]偷天换日[回合限定]",
            touTianHuanRi_backup:"[法术]偷天换日[回合限定]",
            touTianHuanRi_info:"[水晶]将对方【战绩区】的1[宝石]转移到我方【战绩区】，或将我方【战绩区】的[水晶]全部转换为[宝石]。额外+1[攻击行动]或[法术行动]。",

            //圣枪骑士
            shenShengXinYang:"[被动]神圣信仰",
            shenShengXinYang_info:"<span class='tiaoJian'>(我方[星杯区]的[星杯]数不小于对方时)</span>你的[治疗]上限+1。",
            huiYao:"[法术]辉耀",
            huiYao_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>所有角色各+1[治疗]，额外+1[攻击行动]。",
            chengJie:"[法术]惩戒",
            chengJie_info:"<span class='tiaoJian'>(弃1张法术牌[展示])</span>将其他角色的1[治疗]转移给你，额外+1[攻击行动]。",
            shengJi:"[被动]圣击",
            shengJi_info:"<span class='tiaoJian'>(攻击命中后发动②)</span>你+1[治疗]。",
            tianQiang:"[响应]天枪",
            tianQiang_info:"<span class='tiaoJian'>(主动攻击前发动①，移除你的2[治疗])</span>本次攻击对手无法应战，不能和【圣击】同时发动。",
            diQiang:"[响应]地枪",
            diQiang_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除你的X[治疗])</span>本次攻击伤害额外+X，X最高为4；不能和【圣击】同时发动。",
            shengGuangQiYu:"[法术]圣光祈愈",
            shengGuangQiYu_info:"[宝石]无视你的[治疗]上限为你+2[治疗]，但你的[治疗]最高为5，额外+1[攻击行动]；本回合你不能再发动【天枪】。",
            
            //精灵射手
            yuanSuSheJi:"[响应]元素射击[回合限定]",
            yuanSuSheJi_info:"<span class='tiaoJian'>(主动攻击时①，若攻击牌非暗系，弃1张法术牌[展示]或移除1个【祝福】)</span>根据攻击牌类别附加以下【元素箭】效果：<br>【火之矢】：本次攻击伤害额外+1。<br>【水之矢】：<span class='tiaoJian'>(主动攻击命中时②)</span>目标角色+1[治疗]。<br>【风之矢】：<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动]。<br>【雷之矢】：本次攻击无法应战。<br>【地之矢】：<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③。",
            yuanSuSheJi_huo:"火之矢",
            yuanSuSheJi_shui:"水之矢",
            yuanSuSheJi_feng:"风之矢",
            yuanSuSheJi_lei:"雷之矢",
            yuanSuSheJi_di:"地之矢",
            dongWuHuoBan:"[响应]动物伙伴",
            dongWuHuoBan_info:"<span class='tiaoJian'>(你的回合内，目标角色承受你造成的伤害⑥后)</span>你摸1张牌[强制]，你弃1张牌。",
            jingLingMiYi:"[启动]精灵秘仪[持续]",
            jingLingMiYi_info:"[宝石][横置]转为【精灵祝福形态】，将牌堆顶的3张牌面朝下放置于角色旁作为【祝福】。此形态下你的【祝福】可视为手牌使用或打出。<span class='tiaoJian'>(你的回合结束时，若你未拥有【祝福】)</span>[重置]脱离【精灵祝福形态】，对目标角色造成2点法术伤害。",
            chongWuQiangHua:"[响应]宠物强化",
            chongWuQiangHua_info:"[水晶]<span class='tiaoJian'>(触发【动物伙伴】时)</span>效果改为“目标角色摸1张牌[强制]，弃1张牌”。",
            zhuFu:"祝福",
            zhuFu_info:"【祝福】为精灵射手专有盖牌，上限为3。",

            //瘟疫法师
            buXiu:"[响应]不朽",
            buXiu_info:"<span class='tiaoJian'>([法术行动]结束时发动)</span>你+1[治疗]。",
            shengDu:"[被动]圣渎",
            shengDu_info:"你的[治疗]不能抵御攻击伤害，你的[治疗]上限+3。",
            wenYi:"[法术]瘟疫",
            wenYi_info:"<span class='tiaoJian'>(弃1张地系牌[展示])</span>对所有其他角色各造成1点法术伤害③；<span class='tiaoJian'>(若因此造成士气下降)</span>回合结束时，你+1[治疗]。",
            siWangZhiChu:"[法术]死亡之触",
            siWangZhiChu_info:"<span class='tiaoJian'>(移除你的X[治疗]并弃Y张同系牌[展示]，a，b的数值由你决定，但每项最少为2)</span>对目标角色造成(X+Y-3)点伤害③，不能和【不朽】同时发动。",
            siWangZhiChu_backup:"[法术]死亡之触",
            juDuXinXing:"[法术]剧毒新星",
            juDuXinXing_info:"[宝石]对其他角色各造成2点法术伤害③，你+1[治疗]。",

            //魔剑士
            xiuLuoLianZhan:"[响应]修罗连斩[回合限定]",
            xiuLuoLianZhan_info:"<span class='tiaoJian'>([攻击行动]结束后发动)</span>额外+1火系[攻击行动]。",
            anYingNingJu:"[启动]暗影凝聚",
            anYingNingJu_info:"<span class='tiaoJian'>(对自己造成1点法术伤害③)</span>[横置]持续到你的下个行动阶段开始，你都处于【暗影形态】，脱离【暗影形态】时[重置]。",
            anYingZhiLi:"[被动]暗影之力",
            anYingZhiLi_info:"<span class='tiaoJian'>(仅【暗影形态】下发动)</span>你发动的所有攻击伤害额外+1。",
            anYingKangJu:"[被动]暗影抗拒",
            anYingKangJu_info:"在你的行动阶段你始终不能使用法术牌。",
            anYingLiuXing:"[法术]暗影流星",
            anYingLiuXing_info:"<span class='tiaoJian'>(仅【暗影形态】下发动，弃2张法术牌[展示])</span>对目标角色造成2点法术伤害③；<span class='tiaoJian'>(若你额外移除我方【战绩区】2星石)</span>[重置]脱离【暗影形态】，你+1[宝石]。",
            huanQuanZhengChan:"[响应]黄泉震颤[回合限定]",
            huanQuanZhengChan_info:"[宝石]<span class='tiaoJian'>(主动攻击前发动①)</span>本次攻击对手不能应战，<span class='tiaoJian'>(若命中②)</span>你将手牌补至上限[强制]，然后弃2张牌。",

            //血色剑灵
            xueSeJingJi:"[被动]血色荆棘",
            xueSeJingJi_info:"<span class='tiaoJian'>(攻击命中时②)你+1</span><span class='hong'>【</span>鲜血<span class='hong'>】</span>。",
            chiSeYiShan:"[响应]赤色一闪",
            chiSeYiShan_info:"<span class='tiaoJian'>([攻击行动]结束后，移除1点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>，对自己造成2点法术伤害③)</span>额外+1[攻击行动]。",
            xueRanQiangWei:"[法术]血染蔷薇",
            xueRanQiangWei_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>)</span>移除目标角色2[治疗]，将我方角色[能量区]的1[水晶]翻面为[宝石]。<span class='tiaoJian'>(若【血蔷薇庭院】在场)</span>额外对所有角色造成1点法术伤害。",
            xueQiPingZhang:"[响应]血气屏障",
            xueQiPingZhang_info:"<span class='tiaoJian'>(目标角色对你造成法术伤害③时，移除1点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>)</span>本次法术伤害-1③，对目标对手造成1点法术伤害③。",
            xueQiangWeiTingYuan:"(专)[被动]血蔷薇庭院",
            xueQiangWeiTingYuan_info:"<span class='tiaoJian'>(此卡在场时)</span>所有角色的[治疗]无法用于抵御伤害；<span class='tiaoJian'>(血色剑灵的回合结束时)</span>移除此卡。",
            sanHuaLunWu:"[启动]散华轮舞",
            sanHuaLunWu_info:"你选择以下一项发动：<br>·[水晶]将【血蔷薇庭院】放置于场上，你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>；<br>·[宝石]将【血蔷薇庭院】放置于场上，无视你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>上限为你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>但你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>数最高为4，你弃到4张牌。",
            xianXue:"鲜血",
            xianXue_info:"<span class='hong'>【</span>鲜血<span class='hong'>】</span>为血色剑灵专有指示物，上限为3。",

            //祈祷师
            guangHuiXinYang:"[法术]光辉信仰",
            guangHuiXinYang_info:"<span class='tiaoJian'>(仅在【祈祷形态】下发动，移除1点</span><span class='hong'>【祈祷符文】</span><span class='tiaoJian'>)</span>你弃2张牌，我方【战绩区】+1[宝石]，目标队友+1[治疗]。",
            heiAnZuZhou:"[法术]黑暗诅咒",
            heiAnZuZhou_info:"<span class='tiaoJian'>(仅在【祈祷形态】下发动，移除1点</span><span class='hong'>【祈祷符文】</span><span class='tiaoJian'>)</span>对目标角色和自己各造成2点法术伤害③。",
            weiLiCiFu:"(独)[法术]威力赐福",
            weiLiCiFu_info:"<span class='tiaoJian'>(将威力赐福放置于目标队友面前)</span>该队友获得<span class='tiaoJian'>(攻击命中后可以移除此牌发动②)</span>本次攻击伤害额外+2。",
            xunJieCiFu:"(独)[法术]迅捷赐福",
            xunJieCiFu_info:"<span class='tiaoJian'>(将迅捷赐福放置于目标队友面前)</span>该队友获得<span class='tiaoJian'>([法术行动]或[攻击行动]结束时可以移除此牌发动)</span>额外+1[攻击行动]。",
            qiDao:"[启动]祈祷[持续]",
            qiDao_info:"[宝石][横置]转为【祈祷形态】，在此形态下，你每发动一次主动攻击①，你+2<span class='hong'>【祈祷符文】</span>。",
            faLiChaoXi:"[响应]法力潮汐[回合限定]",
            faLiChaoXi_info:"[水晶]<span class='tiaoJian'>([法术行动]结束时发动)</span>额外+1[法术行动]。",
            qiDaoFuWen:"祈祷符文",
            qiDaoFuWen_info:"<span class='hong'>【祈祷符文】</span>为祈祷师专有指示物，其上限为3。",
            
            //红莲骑士
            xingHongShengYue:"[响应]腥红圣约[回合限定]",
            xingHongShengYue_info:"<span class='tiaoJian'>(主动攻击时发动①)</span>你+1[治疗]。",
            xingHongXinYang:"[被动]猩红信仰",
            xingHongXinYang_info:"你的[治疗]只能抵御自己造成的伤害，你的[治疗]上限+2。",
            xueXingDaoYan:"[启动]血腥祷言",
            xueXingDaoYan_info:"<span class='tiaoJian'>(移除你的X[治疗]，对自己造成X点法术伤害③)</span>任意分配X[治疗]给1~2名队友，你+1<span class='hong'>【血印】</span>。",
            shaLuShengYan:"[响应]杀戮盛宴",
            shaLuShengYan_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除1点</span><span class='hong'>【血印】</span><span class='tiaoJian'>对自己造成4点法术伤害③)</span>本次攻击伤害额外+2。",
            reXueFeiTeng:"[被动]热血沸腾",
            reXueFeiTeng_info:"<span class='tiaoJian'>(当你因承受伤害而导致我方士气下降时强制发动[强制])</span>[横置]转发【热血沸腾状态】，该形态你因承受伤害不会导致我方士气下降[强制]。在你的回合结束阶段，若你处于此形态，[重置]并脱离此形态[强制],你+2[治疗]。",
            jieJiaoJieZao:"[响应]戒骄戒躁",
            jieJiaoJieZao_info:"[水晶]<span class='tiaoJian'>(仅【热血沸腾状态】下，[攻击行动]或[法术行动]结束时发动)</span>[重置]并脱离此形态，额外+1[攻击行动]或[法术行动]。",
            xingHongShiZi:"[法术]猩红十字",
            xingHongShiZi_info:"[水晶]<span class='tiaoJian'>(移除1点</span><span class='hong'>【血印】</span><span class='tiaoJian'>弃2张法术牌[展示]，对自己造成4点法术伤害)</span>对目标角色造成3点法术伤害③。",
            xueYin:"血印",
            xueYin_info:"<span class='hong'>【血印】</span>为红莲骑士专有指示物，其上限为2。",

            //英灵人形
            zhanWenZhangWo:"[被动]战纹掌握",
            zhanWenZhangWo_info:"游戏初始时，你拥有3个【战纹】。【战纹】和【魔纹】是英灵人性的专属指示物，上限之和为3。",
            nuHuoYaZhi:"[响应]怒火压制",
            nuHuoYaZhi_info:"<span class='tiaoJian'>(主动攻击未命中时②)</span>翻转1个【战纹】，不能与【魔纹融合】同时发动。",
            zhanWenSuiJi:"[响应]战纹碎击",
            zhanWenSuiJi_info:"<span class='tiaoJian'>(主动攻击命中时②，翻转1个【战纹】，弃X张同系牌[展示](X>1))</span>本次攻击伤害额外+(X-1)，<span class='tiaoJian'>(若你处于【蓄势迸发形态】下，额外翻转Y个【战纹】)</span>本次攻击伤害额外+Y。",
            moWenRongHe:"[响应]魔纹融合",
            moWenRongHe_info:"<span class='tiaoJian'>(主动攻击未命中时②，翻转1个【魔纹】，弃X张异系牌[展示](X>1))</span>对本次攻击的角色造成(X-1)点法术伤害③，<span class='tiaoJian'>(若你处于【蓄势迸发形态】下，额外翻转Y个【魔纹】)</span>本次法术伤害额外+Y。",
            fuWenGaiZao:"[启动]符文改造",
            fuWenGaiZao_info:"[宝石][横置]转为【蓄势迸发形态】，在此形态下你的手牌上限+1；摸1张牌[强制]并任意调整你的【战纹】和【魔纹】，在你回合结束阶段，[重置]并脱离此形态。",
            shuangChongHuiXiang:"[响应]双重回响[回合限定]",
            shuangChongHuiXiang_info:"[水晶]<span class='tiaoJian'>(对目标角色造成攻击或法术伤害时发动③)</span>对另一目标角色造成X点法术伤害③，X与本次伤害相同但最高为3。【双重回响】的伤害不会造成士气下降。",
            
            //神官
            shenShengQiShi:"[响应]神圣启示",
            shenShengQiShi_info:"<span class='tiaoJian'>(【特殊行动】结束时发动)</span>你+1[治疗]。",
            shenShengQiFu:"[法术]神圣祈福",
            shenShengQiFu_info:"<span class='tiaoJian'>(弃2张法术牌[展示])</span>你+2[治疗]。",
            shuiZhiShenLi:"[法术]水之神力",
            shuiZhiShenLi_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>将手中的1张牌交给目标队友[强制]，你和他各加+1[治疗]。",
            shengShiShouHu:"[被动]圣使守护",
            shengShiShouHu_info:"你的[治疗]上限+4，每当你用[治疗]抵挡伤害时，最多只能使用1点。",
            shenShengQiYue:"[启动]神圣契约",
            shenShengQiYue_info:"[水晶]将你的X[治疗]转移给目标队友，以此法所转移的[治疗]无视他的[治疗]上限，但他的[治疗]最高为4。",
            shenShengLingYu:"[法术]神圣领域",
            shenShengLingYu_info:"[水晶]你弃2张牌，再选择以下一项发动：<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>对目标角色造成2点法术伤害③。<br>·你+2[治疗]，目标队友+1[治疗]。",
            
            //阴阳师
            shiShenJiangLin:"[法术]式神降临[持续]",
            shiShenJiangLin_info:"<span class='tiaoJian'>(弃2张命格相同的手牌[展示])</span>[横置]转为【式神形态】，你+1<span class='hong'>【鬼火】</span>，额外+1[攻击行动]。",
            yinYangZhanHuan:"[响应]阴阳转换",
            yinYangZhanHuan_info:"<span class='tiaoJian'>(应战攻击时①，打出1张与攻击牌命格相同的攻击牌[展示])</span>你应战此次攻击，并将本次攻击系别转为与此牌相同，你+1<span class='hong'>【鬼火】</span>。<span class='tiaoJian'>(若处于【式神形态】，[重置]脱离【式神形态】)</span>本次攻击伤害为X，X为你的<span class='hong'>【鬼火】</span>数。",
            shiShenZhuanHuan:"[响应]式神转换",
            shiShenZhuanHuan_info:"<span class='tiaoJian'>(与【阴阳转换】同时发动)</span>你摸1张牌[强制]，你+1<span class='hong'>【鬼火】</span>。",
            heiAnJiLi:"[被动]黑暗祭礼",
            heiAnJiLi_info:"<span class='tiaoJian'>(你的回合结束时，若</span><span class='hong'>【鬼火】</span><span class='tiaoJian'>达到上限)</span>移除所有<span class='hong'>【鬼火】</span>，对目标角色造成2点法术伤害③。",
            shiShenZhouShu:"[响应]式神咒束",
            shiShenZhouShu_info:"<span class='tiaoJian'>(目标队友受到主动攻击时①，若此攻击可应战且你处于【式神形态】，打出1张合理的应战攻击牌[展示]，移除我方【战绩区】1[宝石]1[水晶])</span>将本次攻击目标变更为你，且视为你使用此牌执行应战攻击。",
            shengMingJieJie:"[法术]生命结界",
            shengMingJieJie_backup:"[法术]生命结界",
            shengMingJieJie_info:"[水晶]你+1<span class='hong'>【鬼火】</span>，选择以下一项发动：<br>·目标队友+1[宝石]并+1[治疗]；然后对自己造成X点法术伤害③，X为你的<span class='hong'>【鬼火】</span>数。(若X为3)本次法术伤害③不会造成我方士气下降。<br>·<span class='tiaoJian'>(仅【式神形态】下，弃2张命格相同的手牌[展示])</span>[重置]脱离【式神形态】目标队友弃1张牌。",
            guiHuo:"鬼火",
            guiHuo_info:"<span class='hong'>【鬼火】</span>为阴阳师专有指示物，上限为3。",
            
            //苍炎魔女
            cangYanFaDian:"[法术]苍炎法典",
            cangYanFaDian_info:"<span class='tiaoJian'>(弃1张火系牌[展示])</span>对目标角色和自己造成2点法术伤害③。",
            tianHuoDuanKong:"[法术]天火断空",
            tianHuoDuanKong_info:"<span class='tiaoJian'>(弃2张火系牌[展示]，移除1点</span><span class='hong'>【重生】</span><span class='tiaoJian'>)</span>对目标角色和自己造成3点火焰伤害③，<span class='tiaoJian'>(若我方士气落后于该目标)</span>本次法术伤害额外+1[强制]。",
            moNvZhiNu:"[启动]魔女之怒",
            moNvZhiNu_info:"<span class='tiaoJian'>(手牌<4张时)</span>[横置]摸0-2张牌，数值由你决定，持续到你的下个行动阶段开始前，你都处于【烈焰形态】，在此形态下你的所有除水系和暗系外的攻击牌均视为火系[强制]，你释放【天火断空】时无需消耗<span class='hong'>【重生】</span>，你的手牌上限+(X-2)(X为你的<span class='hong'>【重生】</span>数量)；脱离【烈焰形态】时[重置]。",
            tiShenWanOu:"[响应]替身玩偶",
            tiShenWanOu_info:"<span class='tiaoJian'>(任何人对你造成攻击伤害时③，弃1张法术牌[展示])</span>，目标队友摸1张牌[强制]。",
            yongShengYinShiJi:"[被动]永生银时计",
            yongShengYinShiJi_info:"<span class='tiaoJian'>(当你因承受法术伤害而造成士气下降时)</span>，你+1<span class='hong'>【重生】</span>",
            tongKuLianJie:"[法术]痛苦链接",
            tongKuLianJie_info:"[水晶]对目标对手和自己各造成1点法术伤害③，然后你弃到3张牌。",
            moNengFanZhuan:"[响应]魔能反转",
            moNengFanZhuan_info:"[水晶]<span class='tiaoJian'>(任何人对你造成法术伤害时③，弃X张法术牌[展示](X>1))</span>，对目标对手造成(X-1)点法术伤害。",
            chongSheng:"重生",
            chongSheng_info:"<span class='hong'>【重生】</span>为苍炎魔女专有指示物，上限为4。",

            //贤者
            zhiHuiFaDian:"[被动]智慧法典",
            zhiHuiFaDian_info:"你的【能量】上限+1；<span class='tiaoJian'>(你每次承受法术伤害⑥后，若该伤害>3)</span>你+2[宝石]并弃1张牌。",
            faShuFanTan:"[响应]法术反弹",
            faShuFanTan_info:"<span class='tiaoJian'>(你每次承受法术伤害⑥后，若该伤害仅为1点，则可以弃X张同系牌[展示](X>1))</span>对目标角色造成(X-1)点法术伤害③，并对自己造成X点法术伤害③。",
            moDaoFaDian:"[法术]魔道法典",
            moDaoFaDian_info:"[宝石]<span class='tiaoJian'>(弃X张异系牌[展示](X>1))</span>对目标角色和自己各造成(X-1)点法术伤害③。",
            shengJieFaDian:"[法术]圣洁法典",
            shengJieFaDian_info:"[宝石]<span class='tiaoJian'>(弃X张异系牌[展示](X>2))</span>最多(X-2)名角色各+2[治疗]，并对自己造成(X-1)点法术伤害③。",

            //魔弓
            moGuanChongJi:"[响应]魔贯冲击",
            moGuanChongJi_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1个火系【充能】[展示])</span>本次攻击伤害额外+1，不能攻击手牌达到上限的对手；<span class='tiaoJian'>(若命中②，额外移除1个火系【充能】[展示])</span>，本次攻击伤害额外+1；<span class='tiaoJian'>(若未命中②)</span>对对手造成3点法术伤害③。本回合你不能发动【多重射击】。",
            leiGuangSanShe:"[法术]雷光散射",
            leiGuangSanShe_backup:"[法术]雷光散射",
            leiGuangSanShe_info:"<span class='tiaoJian'>(移除1个雷系【充能】[展示])</span>对所有对手造成1点法术伤害③；<span class='tiaoJian'>(若你额外移除X个雷系【充能】[展示])</span>指定一名对手，本次对其攻击伤害额外+X③。",
            duoChongSheJi:"[响应]多重射击",
            duoChongSheJi_info:"<span class='tiaoJian'>([攻击行动]结束时发动，移除1个风系【充能】[展示])</span>视为一次暗系的主动攻击，但不能攻击上次的目标且本次攻击伤害-1；本回合你不能发动【魔贯冲击】。",
            chongNeng:"[启动]充能",
            chongNeng_info:"[水晶]你弃到4张牌，摸X张牌[强制]，可将自己至多X张手牌面朝下放置在你的角色旁，作为【充能】(X<5)；本回合你不能发动【魔贯冲击】和【雷光散射】。",
            moYan:"[启动]魔眼",
            moYan_info:"[宝石]目标角色弃1张牌或你摸3张牌[强制]，将自己1张手牌作为【充能】，你+1[水晶]。",
            chongNengPai:"充能",
            chongNengPai_info:"【充能】为魔弓专有盖牌，上限为8",

            //魔枪
            anZhiJieFang:"[启动]暗之解放",
            anZhiJieFang_info:"[横置]转为【幻影形态】，你的手牌上限恒定为5[恒定]；本回合你的下次主动攻击伤害额外+1，但不能发动【漆黑之枪】和【充盈】。",
            huanYingXingChen:"[启动]幻影星辰",
            huanYingXingChen_info:"<span class='tiaoJian'>(仅【幻影形态】下发动，对自己造成2点法术伤害③)</span>[重置]脱离【幻影形态】；若没有因此造成我方士气下降，则对目标角色造成2点法术伤害③。",
            heiAnShuFu:"[被动]黑暗束缚",
            heiAnShuFu_info:"你始终不能使用法术牌。",
            anZhiZhangBi:"[响应]暗之障壁",
            anZhiZhangBi_info:"<span class='tiaoJian'>(任何人对你造成伤害时发动③)</span>弃X张法术牌或雷系牌[展示]。",
            chongYing:"[法术]充盈",
            chongYing_info:"<span class='tiaoJian'>(弃1张法术牌或雷系牌[展示])</span>所有人各弃1张牌[展示]，我方角色可选择不如此做，除你以外每以此法弃1张法术牌或雷系牌，本回合你的下次主动攻击伤害额外+1；额外+1[攻击行动]。",
            qiHeiZhiQiang:"[响应]漆黑之枪",
            qiHeiZhiQiang_info:"X[水晶]<span class='tiaoJian'>(仅【幻影形态】下，主动攻击手牌为1或2的对手并命中后发动②)</span>本次攻击伤害额外+(X+2)。",

            //灵符师
            lingFu_leiMing:"[法术]灵符-雷鸣",
            lingFu_leiMing_info:"<span class='tiaoJian'>(弃1张雷系牌[展示])</span>对任意2名角色各造成1点法术伤害③。",
            lingFu_fengXing:"[法术]灵符-风行",
            lingFu_fengXing_info:"<span class='tiaoJian'>(弃1张风系牌[展示])</span>指定2名角色各弃1张牌。",
            nianZhou:"[响应]念咒",
            nianZhou_info:"每当你发动【灵符】，可将自己的1张手牌面朝下放置在你的角色旁，作为【妖力】。",
            baiGuiYeXing:"[响应]百鬼夜行",
            baiGuiYeXing_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除1个【妖力】)</span>对目标角色造成1点法术伤害③；<span class='tiaoJian'>(若【妖力】为火系牌，可展示之[展示])</span>改为指定2名角色，对除他们以外的其他所有角色各造成1点法术伤害③。",
            lingLiBengJie:"[响应]灵力崩解",
            lingLiBengJie_info:"[水晶]<span class='tiaoJian'>(和【灵符-雷鸣】或【百鬼夜行】同时发动)</span>你的本次【灵符-雷鸣】或【百鬼夜行】每次造成的伤害额外+1。",
            yaoLi:"妖力",
            yaoLi_info:"【妖力】为灵符师专有盖牌，上限为2；若【妖力】达到上限，则不能发动【念咒】。",

            //吟游诗人
            chenLunXieZouQu:"[响应]沉沦协奏曲[回合限定]",
            chenLunXieZouQu_info:"<span class='tiaoJian'>(仅【普通形态】下，一回合内我方对至少2名对手造成法术伤害③且结算之后，弃2张同系牌[展示])</span>你+1<span class='hong'>【灵感】</span>。<span class='tiaoJian'>(若弃牌中有法术牌)</span>对目标对手造成1点法术伤害③。",
            buXieHeXian:"[法术]不谐和弦",
            buXieHeXian_backup:"[法术]不谐和弦",
            buXieHeXian_info:"<span class='tiaoJian'>(移除X点</span><span class='hong'>【灵感】</span><span class='tiaoJian'>，X>1)(若你处于【永恒囚徒形态】，[重置]脱离【永恒囚徒形态】)</span>你选择以下一项发动：<br>·你和目标角色各摸(X-1)张牌[强制]。<br>·你和目标角色各弃(X-1)张牌。",
            jinJiShiPian:"[被动]禁忌诗篇",
            jinJiShiPian_info:"<span class='tiaoJian'>(【激昂狂想曲】或【胜利交响诗】的效果结算完后)</span>根据<span class='hong'>【灵感】</span>数量：<br>·(<span class='hong'>【灵感】</span>未达上限)你+1<span class='hong'>【灵感】</span>，移除【永恒乐章】。<br> ·(<span class='hong'>【灵感】</span>已达上限)对自己造成3点法术伤害③。<span class='tiaoJian'>(若你处于【普通形态】)</span>[横置]转为【永恒囚徒形态】。",
            yongHengYueZhangX:"(专)永恒乐章",
            yongHengYueZhangX_info:`
            <span class="greentext">[响应]激昂狂想曲</span><br>
            <span class='tiaoJian'><span class='tiaoJian'>(回合开始时若你拥有【永恒乐章】)</span>选择以下一项执行：<br>·吟游诗人对2名目标对手各造成1点法术伤害③。 <br>·你弃2张牌。<br>
            <span class="greentext">[响应]胜利交响诗</span><br>
            <span class='tiaoJian'><span class='tiaoJian'>(回合结束时若你拥有【永恒乐章】)</span>选择以下一项执行<br>·将我方【战绩区】的1个星石提炼成为你的能量。<br>·为我方【战绩区】+1[宝石]，你+1[治疗]。
            `,
            yongHengYueZhang_jiAngKuangXiangQu:"[响应]激昂狂想曲",
            yongHengYueZhang_shengLiJiaoXiangShi:"[响应]胜利交响诗",
            xiWangFuGeQu:"[启动]希望赋格曲",
            xiWangFuGeQu_info:"[水晶]你可以选择摸1张牌，如果【永恒乐章】不在场，则将【永恒乐章】放置于目标队友面前；否则将【永恒乐章】转移给我方另一名目标角色，你弃1张牌，+1[治疗]或+1<span class='hong'>【灵感】</span>。",
            lingGan:"灵感",
            lingGan_info:"<span class='hong'>【灵感】</span>为吟游诗人的专有指示物，上限为3。",

            //勇者
            yongZheZhiXin:"[被动]勇者之心",
            nuHou:"[响应]怒吼",
            jinPiLiJin:"[被动]精疲力竭",
            mingJingZhiShui:"[响应]明镜止水",
            tiaoXin:"(专)[法术]挑衅",
            tiaoXinX:"挑衅-结束回合",
            tiaoXinX_kaiShi:"挑衅-开始",
            tiaoXinX_qiDongQian:"挑衅-启动前",
            tiaoXinX_qiDongHou:"挑衅-启动后",
            jinDuanZhiLi:"[响应]禁断之力",
            siDou:"[响应]死斗",
            nuQi:"怒气",
            zhiXing:"知性",
            yongZheZhiXin_info:"游戏初始时，你+2[水晶]。",
            nuHou_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1点</span><span class='hong'>【怒气】</span><span class='tiaoJian'>)</span>你可以摸1张牌，本次攻击伤害额外+2；<span class='tiaoJian'>(若未命中②)</span>你+1<span class='lan'>【知性】</span>。",
            jinPiLiJin_info:"<span class='tiaoJian'>(发动【禁断之力】后强制触发[强制])</span>[横置]额外+1[攻击行动]；持续到你的下个行动阶段开始，你的手牌上限恒定为4[恒定]。 【精疲力竭】的效果结束时[重置]，并对自己造成3点法术伤害③。",
            mingJingZhiShui_info:"<span class='tiaoJian'>(主动攻击前发动①，移除4点</span><span class='lan'>【知性】</span><span class='tiaoJian'>)</span>本次攻击对手无法应战。<span class='tiaoJian'>(本次攻击结束时)</span>你+1[水晶]。",
            tiaoXin_info:"<span class='tiaoJian'>(移除1点</span><span class='hong'>【怒气】</span><span class='tiaoJian'>)</span>将【挑衅】放置于目标对手面前，你+1<span class='lan'>【知性】</span>；该对手在其下个行动阶段必须且只能主动攻击你，否则他跳过该行动阶段，触发后移除此牌。",
            jinDuanZhiLi_info:"[水晶]<span class='tiaoJian'>(主动攻击命中或未命中后发动②)</span>弃掉你所有手牌[展示]，其中每有1张法术牌，你+1<span class='hong'>【怒气】</span>；<span class='tiaoJian'>(若未命中②)</span>其中每有1张水系牌，你+1<span class='lan'>【知性】</span>；<span class='tiaoJian'>(若命中②)</span>其中每有1张火系牌，本次攻击伤害额外+1，并对自己造成等同于火系牌数量的法术伤害③。",
            siDou_info:"[宝石](每当你承受法术伤害时发动⑥)你+3<span class='hong'>【怒气】</span>；<span class='tiaoJian'>(若此伤害造成士气实际下降)</span>本次的士气下降值恒定为1[强制]。",
            nuQi_info:"<span class='hong'>【怒气】</span>为勇者专有指示物，上限为4。",
            zhiXing_info:"<span class='lan'>【知性】</span>为勇者专有指示物，上限为4。",

            //格斗家
            nianQiLiChang:"[被动]念气立场",
            xuLiYiji:"[响应]蓄力一击",
            nianDan:"[响应]念弹",
            baiShiHuanLongQuan:"[启动]百式幻龙拳",
            qiJueBengJi:"[响应]气绝崩击",
            douShenTianQu:"[启动]斗神天驱",
            douQi:"斗气",
            nianQiLiChang_info:"所有对你造成的伤害每次最高为4点③。",
            xuLiYiji_info:"<span class='tiaoJian'>(主动攻击前发动①，+1</span><span class='hong'>【斗气】</span><span class='tiaoJian'>)</span>本次攻击伤害额外+1；<span class='tiaoJian'>(若未命中②)</span>对自己造成X点法术伤害③，X为你所拥有的<span class='hong'>【斗气】</span>数；<span class='tiaoJian'>(若</span><span class='hong'>【斗气】</span><span class='tiaoJian'>已经达到上限)</span>你不能发动【蓄力一击】。",
            nianDan_info:"<span class='tiaoJian'>([法术行动]结束时发动，+1</span><span class='hong'>【斗气】</span><span class='tiaoJian'>)</span>，对目标对手造成1点法术伤害③，<span class='tiaoJian'>(若发动前对方的[治疗]为0)</span>对自己造成X点法术伤害③，X为你拥有的<span class='hong'>【斗气】</span>数；<span class='tiaoJian'>(若</span><span class='hong'>【斗气】</span><span class='tiaoJian'>已达到上限)</span>你不能发动【念弹】。",
            baiShiHuanLongQuan_info:"[持续]<span class='tiaoJian'>(移除3点</span><span class='hong'>【斗气】</span><span class='tiaoJian'>)</span>[横置]你的所有主动攻击伤害额外+2，所有应战攻击伤害额外+1 ；在你接下来的行动阶段，你不能执行[法术行动]和[特殊行动]；你的主动攻击必须以同一名角色为目标，并且不能发动【蓄力一击】；若不如此做，则取消【百式幻龙拳】的效果并[重置]。",
            qiJueBengJi_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1点</span><span class='hong'>【斗气】</span><span class='tiaoJian'>)</span>本次攻击对方无法应战，然后对自己造成X点法术伤害③，X为你的<span class='hong'>【斗气】</span>数；不能和【蓄力一击】同时发动。",
            douShenTianQu_info:"[水晶]你弃到3张牌，+2[治疗]。",
            douQi_info:"<span class='hong'>【斗气】</span>为格斗家专有指示物，上限为6",

            //圣弓
            tianZhiGong:"[被动]天之弓",
            shengXieJuBao:"[法术]圣屑飓暴",
            shengHuangJiangLin:"[法术]圣煌降临[持续]",
            shengHuangJiangLin_backup:"[法术]圣煌降临[持续]",
            shengGuangBaoLie:"[法术]圣光爆裂",
            shengGuangBaoLie_backup:"[法术]圣光爆裂",
            liuXingShengDan:"[响应]流星圣弹",
            shengHuangHuiGuangPao:"[法术]圣煌辉光炮",
            ziDongTianChong:"[被动]自动填充",
            xinYang:"信仰",
            shengHuangHuiGuangPaoX:"圣煌辉光炮",
            
            tianZhiGong_info:"游戏初始时，你+2[水晶]，你+1【圣煌辉光炮】。你的[治疗]上限+1。 <span class='tiaoJian'>(主动攻击时，若攻击牌不为圣类命格)</span>本次攻击伤害-1；<span class='tiaoJian'>(主动攻击命中时，若攻击牌为圣类命格)</span>你+1<span class='hong'>【信仰】</span>。",
            shengXieJuBao_info:"<span class='tiaoJian'>(弃2张同系攻击牌[展示])</span>视为一次圣类命格的该系主动攻击。 <span class='tiaoJian'>(若攻击未命中②，移除X点[治疗]，X最高为2)</span>目标队友弃X张牌。",
            shengHuangJiangLin_info:"<span class='tiaoJian'>(移除你的2个[治疗]或2点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>)</span>[横置]，转为【圣煌形态】，额外+1[法术行动]。此形态下，你若执行【特殊行动】，则[重置]脱离【圣煌形态】并+1[治疗]或+1<span class='hong'>【信仰】</span>。",
            shengGuangBaoLie_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动)</span>你选择以下一项发动：<br>·摸1张牌[强制]，移除你的1点[治疗]，你+1<span class='hong'>【信仰】</span>，目标队友+1[治疗]。 <br>·<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害。 Y为目标数中拥有[治疗]的人数。",
            liuXingShengDan_info:"<span class='tiaoJian'>(仅【圣煌形态】下，主动攻击前①，移除你的1点[治疗]或是1点<span class='hong'>【信仰】</span>)</span>我方目标角色+1[治疗]。",
            shengHuangHuiGuangPao_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除1点</span><span class='lan'>【圣煌辉光炮】</span><span class='tiaoJian'>，移除4点</span><span class='hong'>【信仰】</span><span class='tiaoJian'>，并额外移除等同我方落后士气的</span><span class='hong'>【信仰】</span><span class='tiaoJian'>数)</span>所有角色将手牌调整为4张，我方[星杯区]+1[星杯]，然后将一方[士气]调整与另一方相同。",
            ziDongTianChong_info:"<span class='tiaoJian'>(你的回合结束时，若你未执行【特殊行动】)</span>你选择以下一项发动：<br>·[水晶]你+1<span class='hong'>【信仰】</span>或+1[治疗]。 <br>·[宝石]你+1[水晶]，+2<span class='hong'>【信仰】</span>或+2[治疗]。",
            xinYang_info:"<span class='hong'>【信仰】</span>为圣弓专有指示物，上限为10。",
            shengHuangHuiGuangPaoX_info:"<span class='lan'>【圣煌辉光炮】</span>为圣弓专有指示物，上限为1。",

            //剑帝
            jianHunShouHu:"[被动]剑魂守护",
            yangGong:"[被动]佯攻",
            jianQiZhan:"[响应]剑气斩",
            tianShiZhiHun:"[响应]天使之魂",
            eMoZhiHun:"[响应]恶魔之魂",
            buQuYiZhi:"[响应]不屈意志",
            jianHun:"剑魂",
            jianQi:"剑气",
            jianHunShouHu_info:"<span class='tiaoJian'>(主动攻击未命中时发动②)</span>将本次打出的攻击牌作为面朝下放置在你的角色旁，作为【剑魂】。若你现有能量为单数，你的所有【剑魂】视为【天使之魂】；若为双数，视为【恶魔之魂】；若没有能量，则不属于任何一种。 <span class='tiaoJian'>(若【剑魂】达到上限)</span>你不能发动【剑魂守护】。",
            yangGong_info:"<span class='tiaoJian'>(主动攻击未命中时发动②)</span>你+1<span class='hong'>【剑气】</span>。",
            jianQiZhan_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除X点<span class='hong'>【剑气】</span>，X最高为3)</span>对除你所攻击的目标以外的任意一名角色造成X点法术伤害③。",
            tianShiZhiHun_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1张【天使之魂】)</span>本次攻击若命中②，你+2[治疗]；若未命中②，我方+1士气；不能和【剑魂守护】同时发动。",
            eMoZhiHun_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1张【恶魔之魂】)</span>本次攻击伤害额外+1；若未命中②，你+2<span class='hong'>【剑气】</span>；不能和【剑魂守护】同时发动。",
            buQuYiZhi_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束时发动)</span>你摸1张[强制]，+1<span class='hong'>【剑气】</span>，额外+1[攻击行动]。",
            jianHun_info:"【剑魂】为剑帝专有盖牌，上限为3。",
            jianQi_info:"<span class='hong'>【剑气】</span>为剑帝专有指示物，上限为5。",
          
            //兽灵武士
            wuZheCanXin:"[响应]武者残心[回合限定]",
            yiJiWuNian:"[响应]一击无念",
            shouHunYiNian:"[被动]兽魂意念",
            shouHunJingJie:"[响应]兽魂警戒[持续]",
            shouFan:"[响应]兽反",
            yuHunLiuJuHeXingTai:"[被动]御魂流居合形态",
            niFanJuHeZhan:"[响应]逆反居合斩",
            yuHunLiuJuHeShi:"[启动]御魂流居合形态[持续]",
            shouHun:"兽魂",
            canXin:"残心",
            
            wuZheCanXin_info:"<span class='tiaoJian'>([攻击行动]结束时)</span>你+1<span class='hong'>【残心】</span>。",
            yiJiWuNian_info:"<span class='tiaoJian'>([攻击行动]结束后，移除4点</span><span class='hong'>【残心】</span><span class='tiaoJian'>)</span>额外+1[攻击行动]，本次攻击无视【圣盾】且无法用【圣光】抵挡。 <span class='tiaoJian'>(若攻击牌为技类命格)</span>本次攻击强制命中。",
            shouHunYiNian_info:"<span class='tiaoJian'>(你每移除1点</span><span class='lan'>【兽魂】</span><span class='tiaoJian'>)</span>你+1<span class='hong'>【残心】</span>；<span class='tiaoJian'>(仅【普通形态】下，主动攻击命中时②)</span>你+1<span class='lan'>【兽魂】</span>。",
            shouHunJingJie_info:"<span class='tiaoJian'>(其他角色的[横置]效果结算完成后，移除1点</span><span class='lan'>【兽魂】</span><span class='tiaoJian'>，[横置]转为【御魂流居合形态】)</span>目标角色弃1张牌[展示]；<span class='tiaoJian'>(若弃牌为法术牌)</span>你+1<span class='lan'>【兽魂】</span>。",
            shouFan_info:"<span class='tiaoJian'>(目标角色对你造成法术伤害③时，移除X点</span><span class='lan'>【兽魂】</span><span class='tiaoJian'>)</span>你弃X张牌，他弃1张牌；<span class='tiaoJian'>(若他的弃牌为法术牌)</span>你+1<span class='lan'>【兽魂】</span>。",
            yuHunLiuJuHeXingTai_info:"在此形态下，你对[横置]的目标角色攻击伤害+1。你回合结束前-1<span class='lan'>【兽魂】</span>。 <span class='tiaoJian'>(其他角色承受你造成的伤害时⑥，或你的回合结束时</span><span class='lan'>【兽魂】</span><span class='tiaoJian'>为0)</span>[转正]脱离御魂流居合形态。",
            niFanJuHeZhan_info:"<span class='tiaoJian'>(仅【御魂流居合形态】下，攻击手牌<4的对手前①发动)</span>移除X点<span class='lan'>【兽魂】</span>。本次攻击命中时②，改为攻击目标弃置<span class='tiaoJian'>(X+2)</span>张手牌。 <span class='tiaoJian'>(若因此弃牌数小于X+2)</span>对方士气-1。",
            yuHunLiuJuHeShi_info:"[宝石]无视你的<span class='lan'>【兽魂】</span>上限+1<span class='lan'>【兽魂】</span>，你可选择摸或弃1张牌；<span class='tiaoJian'>(若你处于【御魂流居合形态】)</span>你+1<span class='hong'>【残心】</span>；<span class='tiaoJian'>(若你处于[普通型态])</span>[横置]转为【御魂流居合形态】。",
            shouHun_info:"<span class='lan'>【兽魂】</span>为兽灵武士专有指示物，上限为2。",
            canXin_info:"<span class='hong'>【残心】</span>为兽灵武士专有指示物，上限为4。",

            //灵魂术士
            lingHunTunShi:"[被动]灵魂吞噬",
            lingHunZhaoHuan:"[法术]灵魂召还",
            lingHunZhuanHuan:"[响应]灵魂转换",
            lingHunJingXiang:"[法术]灵魂镜像",
            lingHunZhenBao:"(独)[法术]灵魂震爆",
            lingHunFuYu:"(独)[法术]灵魂赋予",
            lingHunLianJie:"(专)[启动]灵魂链接",
            lingHunLianJie_xiaoGuo:"(专)灵魂链接",
            lingHunZengFu:"[启动]灵魂增幅",
            huangSeLingHun:"黄色灵魂",
            lanSeLingHun:"蓝色灵魂",

            lingHunTunShi_info:"<span class='tiaoJian'>(我方每有1点士气下降)</span>你+1<span class='hong'>【黄色灵魂】</span>。",
            lingHunZhaoHuan_info:"<span class='tiaoJian'>(弃X张法术牌[展示])</span>你+X点<span class='lan'>【蓝色灵魂】</span>。",
            lingHunZhuanHuan_info:"<span class='tiaoJian'>(你每发动1次主动攻击①)</span>可转换1点你拥有的[灵魂]的颜色。",
            lingHunJingXiang_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【黄色灵魂】</span><span class='tiaoJian'>)</span>你弃2张牌，目标角色摸2张牌[强制]，但最多补到其手牌上限。",
            lingHunZhenBao_info:"<span class='tiaoJian'>(移除3点</span><span class='hong'>【黄色灵魂】</span><span class='tiaoJian'>)</span>对目标角色造成3点法术伤害③，若他手牌<3且手牌上限>5，则本次伤害额外+2。",
            lingHunFuYu_info:"<span class='tiaoJian'>(移除3点</span><span class='lan'>【蓝色灵魂】</span><span class='tiaoJian'>)</span>目标角色+2[宝石]。",
            lingHunLianJie_info:"<span class='tiaoJian'>(若你队友数>1时可发动,移除1点</span><span class='hong'>【黄色灵魂】</span><span class='tiaoJian'>和1点【蓝色灵魂】)</span>将【灵魂链接】放置于一名队友面前，<span class='tiaoJian'>(每当你们之间有人承受伤害时⑥，移除X点</span><span class='lan'>【蓝色灵魂】</span><span class='tiaoJian'>)</span>将X点伤害转移给另1人，转移后的伤害为法术伤害⑥。",
            lingHunZengFu_info:"[宝石]你+2<span class='hong'>【黄色灵魂】</span>和2<span class='lan'>【蓝色灵魂】</span>。",
            huangSeLingHun_info:"<span class='hong'>【黄色灵魂】</span>为灵魂术士专有指示物，上限为6。",
            lanSeLingHun_info:"<span class='lan'>【蓝色灵魂】</span>为灵魂术士专有指示物，上限为6。",
            
            //血之巫女
            xueZhiAiShang:"[启动]血之哀伤",
            liuXue:"[被动]流血[持续]",
            niLiu:"[法术]逆流",
            xueZhiBeiMing:"(独)[法术]血之悲鸣",
            tongShengGongSi:"(专)[法术]同生共死",
            xueZhiZuZhou:"[法术]血之诅咒",

            xueZhiAiShang_info:"<span class='tiaoJian'>(对自己造成2点法术伤害③)</span>转移同生共死的目标或是移除【同生共死】。",
            liuXue_info:"[持续]<span class='tiaoJian'>(当你在【普通形态】下，因承受伤害而导致我方士气减少时强制发动[强制])</span>[横置]转为【流血形态】，你+1[治疗]。此形态下在你的每次回合开始时，对自己造成1点法术伤害③。 <span class='tiaoJian'>(自身手牌<3时强制发动[强制])</span>[重置]脱离【流血形态】。",
            niLiu_info:"<span class='tiaoJian'>(仅【流血形态】下发动)</span>你弃2张牌，你+1[治疗]。",
            xueZhiBeiMing_info:"<span class='tiaoJian'>(仅【流血形态】下发动)</span>对目标角色和自己各造成(X+1)点法术伤害③，X<3。",
            tongShengGongSi_info:"<span class='tiaoJian'>(你摸2张牌[强制])</span>将【同生共死】放置于目标角色面前。<span class='tiaoJian'>(在【普通形态】下)</span>你和他手牌上限各-2。<span class='tiaoJian'>(在【流血形态】下)</span>你和他手牌上限各+1。",
            xueZhiZuZhou_info:"[宝石]对目标角色造成2点法术伤害③，你弃3张牌。",

            //蝶舞者
            shengMingZhiHuo:"[被动]生命之火",
            wuDong:"[法术]舞动",
            duFen:"[响应]毒粉",
            chaoSheng:"[响应]朝圣",
            jingHuaShuiYue:"[响应]镜花水月",
            diaoLing:"[响应]凋零",
            diaoLing2:"[响应]凋零",
            yongHua:"[法术]蛹化",
            daoNiZhiDie:"[法术]倒逆之蝶",
            jian:"茧",
            DWZyong:"蛹",

            shengMingZhiHuo_info:"你的手牌上限-X，X为你拥有的<span class='hong'>【蛹】</span>的数量，但你的手牌上限最少为3。",
            wuDong_info:"<span class='tiaoJian'>(摸1张牌[强制]或弃 1 张牌[强制])</span>将牌库顶的1张牌面朝下放置在你角色旁，作为【茧】。",
            duFen_info:"<span class='tiaoJian'>(每当有角色产生1点实际法术伤害时发动⑤，移除1个【茧】)</span>该次伤害额外+1。",
            chaoSheng_info:"<span class='tiaoJian'>(每当你承受伤害时发动⑥，移除1个【茧】)</span>抵御1点该来源的伤害。",
            jingHuaShuiYue_info:"<span class='tiaoJian'>(每当有角色承受2点实际法术伤害时发动⑤，移除2张同系【茧】[展示])</span>抵御该次伤害，你对他造成2次法术伤害③，每次伤害为1点。",
            diaoLing_info:"<span class='tiaoJian'>(你每次移除【茧】时，若为法术牌，可展示之[展示])</span>你对目标角色造成1点法术伤害③，再对自己造成2点法术伤害③；此技能发动后，直到你下个回合开始前，对方的士气最少为1[强制]。",
            yongHua_info:"[宝石]<span class='tiaoJian'>(你+1</span><span class='hong'>【蛹】</span><span class='tiaoJian'>)</span>将牌库顶的4张牌面朝下放置在你角色旁，作为【茧】。",
            daoNiZhiDie_info:"[水晶]你弃2张牌，再选择以下1项发动：<br>·对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御。<br> ·<span class='tiaoJian'>(移除2个【茧】或对自己造成4点法术伤害③)</span>移除1个<span class='hong'>【蛹】</span>。",
            jian_info:"【茧】为蝶舞者专有盖牌，上限为8。",
            DWZyong_info:"<span class='hong'>【蛹】</span>为蝶舞者专有指示物，无上限。",
		},
	};
});
