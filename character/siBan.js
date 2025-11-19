import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'siBan',
		connect:true,
        characterSort:{
            siBan:{
                "3xing":['si_moFaShaoNv'],
                "3.5xing":['si_moJianShi',],
            }
        },
		character:{
            si_moFaShaoNv:['moFaShaoNv_name','yongGroup',3,['si_moBaoChongJi','moDanZhangWo','moDanRongHe','huiMieFengBao'],['character:moFaShaoNv']],
            si_moJianShi:['moJianShi_name','huanGroup','3/4',['xiuLuoLianZhan','anYingNingJu','anYingZhiLi','anYingKangJu','san_anYingLiuXing','si_huangQuanZhengChan'],['character:moJianShi']],
		},

        characterIntro: {
            si_moFaShaoNv:`小范围的区域伤害是魔法少女的特长，她更可以把魔弹随意的使用和施放。在积累了一定的能量之后，强大的“毁灭风暴”更是可以让所有对手都品尝到何为魔法的洗礼和冲击`,
            si_moJianShi:"借助暗影之力的魔剑士，既无法使用法术，更是会受到黑暗的侵蚀。但这种双刃剑施放在对手身上的时候，又是无比的震撼和爽快，在烈火永生的黄泉面前，生与死只在一念之间",
		},
        skill:{
            si_moBaoChongJi:{
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
                    player.storage.moBaoChongJi=false;
                },
                content:function(){
                    'step 0'
                    var name=get.translation(player);
                    target.chooseToDiscard(`弃置1张法术牌，否则${name}对你造成2点法术伤害③`,1,function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('showCards',true)
                    .set('ai',function(){
                        return 1;
                    });
                    'step 1'
                    if(!result.bool){
                        target.faShuDamage(2,player);
                        player.storage.moBaoChongJi=true;
                    }
                },
                contentAfter:function(){
                    'step 0'
                    if(player.storage.moBaoChongJi){
                        player.addZhanJi('baoShi',1);
                    }
                    'step 1'
                    player.chooseToDiscard(1,'h',true);
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

            san_anYingLiuXing:{
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
                subSkill:{
                    wuFaXingDong:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='san_anYingLiuXing_wuFaXingDong') return false;//需要排除自身，防止嵌套
                            if(player.countCards('h',card=>get.type(card)=='faShu')!=player.countCards('h')) return false;
                            return get.info('_wuFaXingDong').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                },
            },

            si_huangQuanZhengChan:{
                usable:1,
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return event.yingZhan!=true;
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    trigger.customArgs.huangQuanZhengChan=true;
                    trigger.wuFaYingZhan();
                },
                group:'si_huangQuanZhengChan_mingZhong',
                subSkill:{
                    mingZhong:{
                        trigger:{source:'gongJiMingZhong'},
                        forced:true,
                        filter:function(event,player){
                            return event.customArgs.huangQuanZhengChan==true;
                        },
                        content:function(){
                            'step 0'
                            player.tiaoZhengShouPai(4);
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
        },
		
		translate:{
            //角色名字
            si_moFaShaoNv:"四版魔法少女",
            si_moFaShaoNv_prefix: "四版",
            si_moJianShi:"四版魔剑士",
            si_moJianShi_prefix: "四版",

            si_moBaoChongJi:'[法术]魔爆冲击',
            si_moBaoChongJi_info:'<span class="tiaoJian">(弃1张法术牌[展示])</span>指定2名目标对手各弃一张法术牌[展示]，若其中有人不如此做，则对他造成2点法术伤害。只要有一名对手不如此做，我方【战绩区】+1[宝石]。你弃1张牌。',

            san_anYingLiuXing:"[法术]暗影流星",
            san_anYingLiuXing_info:"<span class='tiaoJian'>(仅【暗影形态】下发动，弃2张法术牌[展示])</span>对目标角色造成2点法术伤害③。",
            si_huangQuanZhengChan:"[响应]黄泉震颤[回合限定]",
            si_huangQuanZhengChan_info:"[宝石]<span class='tiaoJian'>(主动攻击前发动①)</span>本次攻击对手不能应战，<span class='tiaoJian'>(若命中②)</span>你将手牌调整为4[强制]。",
		},
	};
});
