import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'sanBan',
		connect:true,
        characterSort:{
            sanBan:{
                "3xing":['san_fengZhiJianSheng','san_kuangZhanShi','san_anShaZhe','san_shengNv'],
                "3.5xing":['san_shengQiangQiShi','san_maoXianJia','san_nvWuShen'],
                "4xing":['san_yingLingRenXing','san_moGong','san_xianZhe','san_moQiang'],
                "4.5xing":['san_lingHunShuShi','san_yinYouShiRen','san_yongZhe'],
                "5xing":[],
            }
        },
		character:{
			san_fengZhiJianSheng:['fengZhiJianSheng_name','jiGroup',3,['fengNuZhuiJi','san_shengJian','lieFengJi','jiFengJi','jianYing'],['character:fengZhiJianSheng']],
            san_kuangZhanShi:['kuangZhanShi_name','xueGroup',3,['san_kuangHua','xueYingKuangDao','xueXingPaoXiao','siLie'],['character:kuangZhanShi']],
            san_anShaZhe:['anShaZhe_name','jiGroup',3,['fanShi','san_shuiYing','san_qianXing'],['character:anShaZhe']],
            san_shengNv:['shengNv_name','shengGroup',3,['san_bingShuangDaoYan','zhiLiaoShu','zhiYuZhiGuang','san_lianMin','shengLiao'],['character:shengNv']],
            san_shengQiangQiShi:['shengQiangQiShi_name','shengGroup','3/4',['san_shenShengXinYang','huiYao','chengJie','shengJi','tianQiang','diQiang','shengGuangQiYu'],['character:shengQiangQiShi']],
            san_maoXianJia:['maoXianJia_name','huanGroup','3/4',['qiZha','qiangYun','diXiaFaZe','san_maoXianJiaTianTang','touTianHuanRi'],['character:maoXianJia']],
            san_xianZhe:['xianZhe_name','yongGroup',4,['san_zhiHuiFaDian','faShuFanTan','moDaoFaDian','shengJieFaDian'],['character:xianZhe']],
            san_lingHunShuShi:['lingHunShuShi_name','huanGroup','4/5',["lingHunTunShi","san_lingHunZhaoHuan",'lingHunZhuanHuan',"san_lingHunJingXiang","lingHunZhenBao","lingHunFuYu","lingHunLianJie","lingHunZengFu","huangSeLingHun","lanSeLingHun"],['character:lingHunShuShi']],
            san_nvWuShen:['nvWuShen_name','shengGroup','3/4',['shenShengZhuiJi','zhiXuZhiYin','san_hePingXingZhe','san_junShenWeiGuan','san_yingLingZhaoHuan'],['character:nvWuShen']],
            san_yingLingRenXing:['yingLingRenXing_name','yongGroup',4,['zhanWenZhangWo','nuHuoYaZhi','zhanWenSuiJi','moWenRongHe','san_fuWenGaiZao','shuangChongHuiXiang','zhanWen','moWen'],['character:yingLingRenXing']],
            san_moQiang:['moQiang_name','huanGroup',4,['san_anZhiJieFang','huanYingXingChen','heiAnShuFu','anZhiZhangBi','chongYing','qiHeiZhiQiang'],['character:moQiang']],
            san_yinYouShiRen:['yinYouShiRen_name','huanGroup','4/5',['san_chenLunXieZouQu','san_buXieHeXian','geYongTianFu','baoFengQianZouQu','san_yongHengYueZhangX','san_xiWangFuGeQu','san_lingGan'],['character:yinYouShiRen']],
            san_yongZhe:['yongZhe_name','xueGroup','4/5',['yongZheZhiXin','san_nuHou','jinPiLiJin','san_mingJingZhiShui','tiaoXin','jinDuanZhiLi','san_siDou','nuQi','zhiXing'],['character:yongZhe']],
		},

        characterIntro: {
			san_fengZhiJianSheng:"风之剑圣有着极高的攻击频率，一旦得到了风的强力赐福，更可以让他打出无数绚丽的连击和伤害。再加上其本身拥有的“圣剑”，在伤害输出上不容小觑，更是团队【宝石】获得的得力助手",
            san_kuangZhanShi:"狂战士毋庸置疑的拥有本作最强大的物理攻击输出能力，特别是对于防御力弱和拥有治疗的角色更是能制造出绝对的碾压和毁灭伤害。其唯一的弱点就是命中率，因此由队友掩护攻击或攻击防御薄弱的角色是狂战取胜之道",
            san_anShaZhe:"没有人会去主动惹暗杀者的麻烦，因为他的反击总是会让你后悔刚才做出的决定；也没有人会把他当做一个默默无闻的路人甲，因为当他亮出匕首的时候，你就再也无法闪躲了",
            san_shengNv:`外表弱小的圣女有着极强的防御和治疗能力。在她的保护下，很多需要厚积薄发的职业能得到全面的呵护成长，更是许多爆发性职业的全职奶妈`,
            san_shengQiangQiShi:`治疗对于圣枪骑士而言，既是优秀的防御源泉，也是攻击的伤害利器。强大的圣枪骑士总是能运用场上的所有治疗为她所用，狠狠地发泄到她的对手身上。她的天枪和地枪总是让每个对手都胆战心惊`,
            san_maoXianJia:"在这样一个危险的大陆还敢冒险的人一定具备着以下三种素质：近乎难以置信的运气、让大家都有利可图的能力、遇到危险时跑的足够快",
            san_xianZhe:`睿智博学的贤者拥有能改变命运的三本魔法法典：智慧、圣洁和魔道。每一本都积攒着前人对奥术能量的深厚研究，而贤者是唯一一个能够完全利用它们的人`,
            san_lingHunShuShi:"控制并利用灵魂是灵魂术士一族所独具的强大能力，错综多样的灵魂类别会使得很多学徒级的灵魂术士手忙脚乱。而对于精通利用灵魂的大师级灵魂术士而言，却能把每一个灵魂都发挥出最大的利用价值和使用效率",
            san_nvWuShen:`米涅瓦：力量对于她来说是一种艺术，每一种技巧和武艺对于她来说同样是一种艺术，将各种各样的艺术融会贯通，铸就了女武神不败的威名<br>
            栞蒂：作为“女武神计划”的最终产物，她拥有的技巧和实力几乎完美再现了当年女武神的威风`,
            san_moGong:`魔弓为了超越她的姐姐，舍弃了原本应当追寻技巧与速度的弓之奥义，而将所有的箭术魔化为强大的充能能量，力求在爆发力与AOE上做到极致与完美`,
            san_yingLingRenXing:"纯粹为战斗而生的人形，自诞生之日便掌握神秘的纹章力量，并运用这种力量将前进道路上的障碍统统粉碎",
            san_moQiang:`被幻之星尘同化的魔枪在获得了新的意志和形态后，体内涌出一股无与伦比的力量。这种力量极大地提高了她的打击能力和爆发力，但也使得她再也无法使用那些基本的法术了`,
            san_yinYouShiRen:`吟游诗人不仅仅依凭自己的直觉和灵感进行着战斗，他弹奏的一个个音符能大幅增强自身和队友的实力，同样也能对敌人造成极大的伤害`,
            san_yongZhe:"怒气与知性这一对仿佛不可调和的矛盾却在勇者身上被炼化为一致。拥有怒气时的超强爆发与使用知性时的百发百中让勇者成为星杯传说中的强者",
		},
        skill:{
            san_shengJian:{
                forced:true,
                trigger:{player:"gongJiSheZhi"},
                priority:1,
                filter:function(event,player){
                    return event.yingZhan!=true&&player.getStat('gongJi').zhuDong==3;
                },
                content:function(){
                    trigger.qiangZhiMingZhong();
                    trigger.customArgs.shengJian=true;
                },
            },

            san_shuiYing:{
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
                        .set('showCards',true)
						.forResult();
				},
                content:function(){
                    'step 0'
                    player.discard(event.cards).set('showCards',true);
                }
            },
            san_qianXing:{
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
                group:['san_qianXing_chongZhi','san_qianXing_xiaoGuo'],
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
                    if(player.countNengLiangAll()<=1) return false;
                    return true;
                },
            },

            san_kuangHua:{
                trigger:{player:'gongJiSheZhi'},
                forced:true,
                content:function(){
                    'step 0'
                    trigger.changeDamageNum(1);
                },
            },

            san_nuHou:{
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
                },
                group:"san_nuHou_weiMingZhong",
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
            san_mingJingZhiShui:{
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
            },
            san_siDou:{
                trigger:{player:'chengShouShangHai'},
                lastDo:true,
                filter:function(event,player){
                    return event.faShu&&player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.addZhiShiWu('nuQi',3);
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

            san_bingShuangDaoYan:{
                trigger:{player:'daChuPai'},
                forced:true,
                filter:function(event,player){
                    return get.xiBie(event.card)=='shui';
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
            san_lianMin:{
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

            san_hePingXingZhe:{
                group:'san_hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                filter:function(event,player){
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
            san_junShenWeiGuan:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    var choiceList=['你+1[治疗]','(移除我方【战绩区】2星石)，你无视上限+2[治疗]'];
                    var choices=['选项一'];
                    var list=get.zhanJi(player.side);
                    if(list.length>=1){
                        choices.push('选项二');
                    }
                    player.chooseControl(choices).set('prompt','军神威光：选择一项').set('choiceList',choiceList);
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        event.finish();
                    }else if(result.index==1){
                        var list=get.zhanJi(player.side);
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '移除2个星石',
                            [listx,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('selectButton',[2,2]);
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
                    player.changeZhiLiao(2,Infinity,player);
                }
            },
            san_yingLingZhaoHuan:{
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
                        prompt:"<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>本次攻击伤害额外+1",
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
                        trigger.changeDamageNum(1);
                    }
                    'step 4'
                    event.trigger('yingLingZhaoHuan')
                },
                ai:{
                    shuiJing:true,

                }
            },

            san_shenShengXinYang:{
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                }
            },

            san_zhiHuiFaDian:{
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
                }
            },

            san_fuWenGaiZao:{
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
                    player.draw(2);
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
                group:['san_fuWenGaiZao_chongZhi'],
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isHengZhi()) return num+2;
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

            san_maoXianJiaTianTang:{
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

            san_anZhiJieFang:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return !player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addTempSkill('san_anZhiJieFang_shangHai');
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
                            trigger.changeDamageNum(2);
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
            
            san_lingHunZhaoHuan:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.hasCard(card=>lib.skill.san_lingHunZhaoHuan.filterCard(card))>0;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectCard:[1,Infinity],
                discard:true,
                showCards:true,
                content:function(){
                    player.addZhiShiWu('lanSeLingHun',cards.length+1);
                },
                ai:{
                    order:function(item,player){
                        return 2.1+player.countCards('h',card=>lib.skill.san_lingHunZhaoHuan.filterCard(card))*0.7;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            san_lingHunJingXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('huangSeLingHun')>=2;
                },
                selectTarget:1,
                filterTarget:true,
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('huangSeLingHun',2);
                    await player.chooseToDiscard('h',true,3);

                    var chaZhi=event.target.getHandcardLimit()-event.target.countCards('h');
                    var num=Math.min(3,chaZhi);
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

            san_chenLunXieZouQu:{
                trigger:{global:'damageAfter'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    if(!(event.player.side!=player.side&&event.source.side==player.side)) return false; 
                    return player.storage.chenLunXieZouQu.length>=2;
                },
                usable:1,
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',2)
                    .set('complexCard',true)
                    .set('filterCard',function(card){return get.xuanZeTongXiPai(card)})
                    .set('prompt',get.prompt('san_chenLunXieZouQu'))
                    .set('prompt2',lib.translate.san_chenLunXieZouQu_info)
                    .set('ai',function(card){return 6-get.value(card)})
                    .forResult();
                },
                content:async function(event,trigger,player){
                    await player.discard(event.cards).set('showCards',true);
                    await player.addZhiShiWu('lingGan');
                    var targets=await player.chooseTarget('对目标对手造成1点法术伤害',true,function(card,player,target){
                        return player.side!=target.side;
                    })
                    .set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    })
                    .forResultTargets();
                    await targets[0].faShuDamage(1,player);
                },
                group:['san_chenLunXieZouQu_chongZhi','san_chenLunXieZouQu_jiShu'],
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
            san_buXieHeXian:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.countZhiShiWu('san_lingGan')>1;
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
						var dialog=ui.create.dialog(`不谐和弦：移除X点<span class='hong'>【灵感】</span>,与目标角色摸(X-1)张牌或各弃X张牌`,'hidden');
                        var list=[];
                        for(var i=2;i<=player.countZhiShiWu('san_lingGan');i++){
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
                                var links=lib.skill.san_buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        var num=links[i];
                                        break
                                    }
                                }
                                await player.removeZhiShiWu('san_lingGan',num);
                            },
							content:async function(event,trigger,player){
                                var links=lib.skill.san_buXieHeXian_backup.links;
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
                                    await player.chooseToDiscard('h',num+1,true);
                                    await event.target.chooseToDiscard('h',num+1,true); 
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
                            return `你和目标角色各弃${num+1}张牌[强制]`
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
            san_xiWangFuGeQu:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    var players=game.filterPlayer((function(current){
                        return current.side==player.side&&current.hasZhiShiWu('san_yongHengYueZhang');
                    }));

                    var targets=await player.chooseTarget('将【永恒乐章】转移给我方一名角色面前',true,function(card,player,target){
                        var targetx=_status.event.targetx;
                        return target.side==player.side&&targetx!=target;
                    }).set('targetx',players[0]).forResultTargets();

                    await players[0].removeZhiShiWu('san_yongHengYueZhang');
                    
                    var target=targets[0];
                    if(!target.hasSkill('san_yongHengYueZhang')){
                        await target.addSkill('san_yongHengYueZhang');
                    }

                    await target.addZhiShiWu('san_yongHengYueZhang');
                    target.storage.yongHengYueZhang_player=player;
                },
                check:function(event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
            },
            san_lingGan:{
                intro:{
                    name:'灵感',
                    markcount:'mark',
                    max:4,
                    content:'mark',
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png'
            },
            san_yongHengYueZhangX:{},
            san_yongHengYueZhang:{
                intro:{
                    name:'(专)永恒乐章',
                    content:"[响应]激昂狂想曲：<span class='tiaoJian'>(回合开始时若你拥有【永恒乐章】，移除我方【战绩区】的2星石或将【永恒乐章】转移给吟游诗人)</span>选择以下一项执行：<br>·对2名目标对手各造成1点法术伤害③。 <br>·你弃2张牌。<br>[响应]胜利交响诗：<span class='tiaoJian'>(回合结束时若你拥有【永恒乐章】，对吟游诗人造成3点法术伤害③或将【永恒乐章】转移给吟游诗人)</span>选择以下一项执行<br>·将我方【战绩区】的1个星石提炼成为你的能量。<br>·为我方【战绩区】+1[宝石]，你+1[治疗]。",
                    nocount:true,
                },
                group:['san_yongHengYueZhang_jiAngKuangXiangQu','san_yongHengYueZhang_shengLiJiaoXiangShi'],
                onremove:'storage',
                markimage:'image/card/zhuanShu/yongHengYueZhang.png',
                subSkill:{
                    jiAngKuangXiangQu:{
                        trigger:{player:'phaseBegin'},
                        filter:function(event,player){
                            if(!player.hasZhiShiWu('san_yongHengYueZhang')) return false;
                            if(player.storage.yongHengYueZhang_player==player){
                                var zhanJi=get.zhanJi(player.side);
                                return zhanJi.length>=2;
                            }else{
                                return true;
                            }  
                        },
                        content:async function(event,trigger,player){
                            //条件
                            var zhanJi=get.zhanJi(player.side);
                            if(zhanJi.length>=2){
                                var list=[];
                                for(var i=0;i<zhanJi.length;i++){
                                    list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                }
                                if(player.storage.yongHengYueZhang_player==player){
                                    var result=await player.chooseButton([
                                        '移除我方【战绩区】的2星石或者将【永恒乐章】转移给吟游诗人',
                                        [list,'tdnodes'],
                                    ]).set('selectButton',[2,2]).set('forced',true).forResult();
                                }else{
                                    var result=await player.chooseButton([
                                        '移除我方【战绩区】的2星石或者将【永恒乐章】转移给吟游诗人',
                                        [list,'tdnodes'],
                                    ]).set('selectButton',[2,2]).forResult();
                                }
                                
                            }else var result={bool:false};
                            if(result.bool){
                                var dict={baoShi:0,shuiJing:0};
                                for(var i=0;i<result.links.length;i++){
                                    if(result.links[i]=='baoShi'){
                                        dict['baoShi']++;
                                    }else if(result.links[i]=='shuiJing'){
                                        dict['shuiJing']++;
                                    }
                                }
                                if(dict['baoShi']>0){
                                    await player.removeZhanJi('baoShi',dict['baoShi']);
                                }
                                if(dict['shuiJing']>0){
                                    await player.removeZhanJi('shuiJing',dict['shuiJing']);
                                }
                            }else{
                                await player.removeZhiShiWu('san_yongHengYueZhang');
                                await player.storage.yongHengYueZhang_player.addZhiShiWu('san_yongHengYueZhang');
                            }

                            //效果
                            var choiceList=['对2名目标对手各造成1点法术伤害③','弃2张牌'];
                            var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                                var player=_status.event.player;
                                if(player.storage.yongHengYueZhang_player.countCards('h')>2) return '选项一';
                                else return '选项二';
                            }).forResultControl();
                            
                            if(control=='选项一'){
                                var targets=await player.chooseTarget(2,'对2名目标对手各造成1点法术伤害③',true,function(card,player,target){
                                    return target.side!=player.side;
                                }).forResultTargets();
                                for(var i=0;i<targets.length;i++){
                                    await targets[i].faShuDamage(1,player);
                                }
                            }else{
                                await player.chooseToDiscard(2,true);
                            }

                            await event.trigger('san_yongHengYueZhang');
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
                            return player.hasZhiShiWu('san_yongHengYueZhang');
                        },
                        content:async function(event,trigger,player){
                            //条件
                            if(player.storage.yongHengYueZhang_player!=player){
                                var choiceList=['对吟游诗人造成3点法术伤害③','将【永恒乐章】转移给吟游诗人'];
                                var control=await player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                                    var target=_status.event.player.storage.yongHengYueZhang_player;
                                    if(target.countCards('h')+4>target.getHandcardLimit()) return '选项二';
                                    else return '选项一';
                                }).forResultControl();
                            }else var control='选项一';

                            if(control=='选项一'){
                                await player.storage.yongHengYueZhang_player.faShuDamage(3,player);
                            }else{
                                await player.removeZhiShiWu('san_yongHengYueZhang');
                                await player.storage.yongHengYueZhang_player.addZhiShiWu('san_yongHengYueZhang'); 
                            }

                            //效果
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

                            await event.trigger('san_yongHengYueZhang');
                        }
                    }
                }
            },
            geYongTianFu:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    'step 0'
                    player.addSkill('san_yongHengYueZhang');
                    'step 1'
                    player.addZhiShiWu('san_yongHengYueZhang');
                    player.storage.yongHengYueZhang_player=player;
                },
                group:['geYongTianFu_yongHengYueZhang','geYongTianFu_wuFa'],
                subSkill:{
                    yongHengYueZhang:{
                        trigger:{global:'san_yongHengYueZhang'},
                        forced:true,
                        content:function(){
                            player.addZhiShiWu('san_lingGan');
                        }
                    },
                    wuFa:{
                        trigger:{player:'triggerSkill'},
                        direct:true,
                        filter:function(event,player){
                            if(event.skill=='geYongTianFu_wuFa') return false;//需要排除自身，防止嵌套
                            return get.info('san_yongHengYueZhang').group.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                }
            },
            baoFengQianZouQu:{
                trigger:{player:'phaseBefore'},
                filter:function(event,player){
                    return player.hasZhiShiWu('san_lingGan');
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('san_lingGan');
                    'step 1'
                    player.tempBanSkill('geYongTianFu','phaseAfter');
                }
            },
        },
		
		translate:{
            //角色名字
			san_fengZhiJianSheng:"三版风之剑圣",
            san_fengZhiJianSheng_prefix: "三版",
            san_kuangZhanShi:"三版狂战士",
            san_kuangZhanShi_prefix: "三版",
            san_anShaZhe:"三版暗杀者",
            san_anShaZhe_prefix: "三版",
            san_shengNv:"三版圣女",
            san_shengNv_prefix: "三版",
            san_shengQiangQiShi:"三版圣枪骑士",
            san_shengQiangQiShi_prefix: "三版",
            san_maoXianJia:"三版冒险家",
            san_maoXianJia_prefix: "三版",
            san_xianZhe:"三版贤者",
            san_xianZhe_prefix: "三版",
            san_lingHunShuShi:"三版灵魂术士",
            san_lingHunShuShi_prefix: "三版",
            san_nvWuShen:"三版女武神",
            san_nvWuShen_prefix: "三版",
            san_yingLingRenXing:"三版英灵人形",
            san_yingLingRenXing_prefix: "三版",
            san_moQiang:"三版魔枪",
            san_moQiang_prefix: "三版",
            san_yinYouShiRen:"三版吟游诗人",
            san_yinYouShiRen_prefix: "三版",
            san_yongZhe:"三版勇者",
            san_yongZhe_prefix: "三版",

            san_shengJian:'[被动]圣剑',
            san_shengJian_info:"若你的主动攻击为本次行动阶段的第3次[攻击行动]，则此攻击强制命中。",

            san_shuiYing:"[响应]水影",
            san_shuiYing_info:"<span class='tiaoJian'>(除【特殊行动】外，当你摸牌前发动)</span>弃X张水系牌[展示]。",
            san_qianXing:"[启动]潜行",
            san_qianXing_info:"[宝石][横置]持续到你的下个行动阶段开始，你的手牌上限-1；你不能成为主动攻击的目标；你的主动攻击对手无法应战且伤害额外+X，X为你剩余的【能量】数。【潜行】的效果结束时[重置]。",

            san_kuangHua:"[被动]狂化",
            san_kuangHua_info:"你发动的所有攻击伤害额外+1。",

            san_nuHou:"[响应]怒吼",
            san_nuHou_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1点</span><span class='hong'>【怒气】</span><span class='tiaoJian'>)</span>本次攻击伤害额外+2；<span class='tiaoJian'>(若未命中②)</span>你+1<span class='lan'>【知性】</span>。",
            san_mingJingZhiShui:"[响应]明镜止水",
            san_mingJingZhiShui_info:"<span class='tiaoJian'>(主动攻击前发动①，移除4点</span><span class='lan'>【知性】</span><span class='tiaoJian'>)</span>本次攻击对手无法应战。",
            san_siDou:"[响应]死斗",
            san_siDou_info:"[宝石](每当你承受法术伤害时发动⑥)你+3<span class='hong'>【怒气】</span>。",

            san_bingShuangDaoYan:"[被动]冰霜祷言",
            san_bingShuangDaoYan_info:"<span class='tiaoJian'>(每当你使用水系牌发动)</span>目标角色+1[治疗]。",
            san_lianMin:"[启动]怜悯[持续]",
            san_lianMin_info:"[宝石][横置]你的手牌上限恒定为7[持续]。",

            san_hePingXingZhe:"[被动]和平行者",
            san_hePingXingZhe_info:"<span class='tiaoJian'>(发动【英灵召唤】后强制触发[强制])</span>[横置]，转入【英灵形态】；<span class='tiaoJian'>(每当你执行主动攻击时发动①)</span>[重置]脱离【英灵形态】。",
            san_junShenWeiGuan:"[被动]军神威光",
            san_junShenWeiGuan_info:"<span class='tiaoJian'>(回合开始时，若你处于【英灵形态】)</span>选择以下1项发动：<br>·你+1[治疗]，[重置]脱离【英灵形态】；<br>·<span class='tiaoJian'>(移除我方【战绩区】2星石)</span>你无视上限+2[治疗]。",
            san_yingLingZhaoHuan:"[响应]英灵召唤",
            san_yingLingZhaoHuan_info:"[水晶]<span class='tiaoJian'>(攻击命中时发动②)</span>本次攻击伤害额外+1，<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>本次攻击伤害额外+1。",
		
            san_shenShengXinYang:"[被动]神圣信仰",
            san_shenShengXinYang_info:"你的[治疗]上限+1。",

            san_zhiHuiFaDian:"[被动]智慧法典",
            san_zhiHuiFaDian_info:"你的【能量】上限+1；<span class='tiaoJian'>(你每次承受法术伤害时⑥，若该伤害>3)</span>你+2[宝石]。",

            san_fuWenGaiZao:"[启动]符文改造",
            san_fuWenGaiZao_info:"[宝石][横置]转为【蓄势迸发形态】，在此形态下你的手牌上限+2；摸2张牌[强制]并任意调整你的【战纹】和【魔纹】，在你回合结束阶段，[重置]并脱离此形态。",

            san_maoXianJiaTianTang:"[响应]冒险者天堂",
            san_maoXianJiaTianTang_info:"<span class='tiaoJian'>(你执行【提炼】时)</span>可将提炼出的[宝石]和[水晶]交给一名目标队友。",

            san_anZhiJieFang:"[启动]暗之解放",
            san_anZhiJieFang_info:"[横置]转为【幻影形态】，你的手牌上限恒定为5[恒定]；本回合你的下次主动攻击伤害额外+2，但不能发动【漆黑之枪】和【充盈】。",

            san_lingHunZhaoHuan:"[法术]灵魂召还",
            san_lingHunZhaoHuan_info:"<span class='tiaoJian'>(弃X张法术牌[展示])</span>你+(X+1)点<span class='lan'>【蓝色灵魂】</span>。",
            san_lingHunJingXiang:"[法术]灵魂镜像",
            san_lingHunJingXiang_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【黄色灵魂】</span><span class='tiaoJian'>)</span>你弃3张牌，目标角色摸3张牌[强制]，但最多补到其手牌上限。",

            san_chenLunXieZouQu:"[响应]沉沦协奏曲[回合限定]",
            san_chenLunXieZouQu_info:"<span class='tiaoJian'>(一回合内我方对至少2名对手造成法术伤害③且结算之后，弃2张同系牌[展示])</span>对目标对手造成1点法术伤害③。",
            san_buXieHeXian:"[法术]不谐和弦",
            san_buXieHeXian_backup:"[法术]不谐和弦",
            san_buXieHeXian_info:"<span class='tiaoJian'>(移除X点</span><span class='hong'>【灵感】</span><span class='tiaoJian'>，X>1)</span>你和目标角色各摸(X-1)张牌[强制]或各弃X张牌[强制]。",
            san_yongHengYueZhangX:"(专)永恒乐章",
            san_yongHengYueZhangX_info:`
            <span class="greentext">[响应]激昂狂想曲</span><br>
            <span class='tiaoJian'>(回合开始时若你拥有【永恒乐章】，移除我方【战绩区】的2星石或将【永恒乐章】转移给吟游诗人)</span>选择以下一项执行：<br>·对2名目标对手各造成1点法术伤害③。 <br>·你弃2张牌。<br>
            <span class="greentext">[响应]胜利交响诗</span><br>
            <span class='tiaoJian'>(回合结束时若你拥有【永恒乐章】，对吟游诗人造成3点法术伤害③或将【永恒乐章】转移给吟游诗人)</span>选择以下一项执行<br>·将我方【战绩区】的1个星石提炼成为你的能量。<br>·为我方【战绩区】+1[宝石]，你+1[治疗]。
            `,
            san_yongHengYueZhang_jiAngKuangXiangQu:"[响应]激昂狂想曲",
            san_yongHengYueZhang_shengLiJiaoXiangShi:"[响应]胜利交响诗",
            san_xiWangFuGeQu:"[启动]希望赋格曲",
            san_xiWangFuGeQu_info:"[宝石]将【永恒乐章】转移到一名我方角色面前。",
            san_lingGan:"灵感",
            san_lingGan_info:"<span class='hong'>【灵感】</span>为吟游诗人的专有指示物，上限为4。",
            geYongTianFu:"[被动]歌咏天赋",
            geYongTianFu_info:"游戏开始时你拥有【永恒乐章】。<span class='tiaoJian'>(每当【永恒乐章】被触发时)</span>你+1<span class='hong'>【灵感】</span>。吟游诗人不会触发【永恒乐章】的效果。",
            baoFengQianZouQu:"[响应]暴风前奏曲",
            baoFengQianZouQu_info:"<span class='tiaoJian'>(回合开始前，你移除1点</span><span class='hong'>【灵感】</span><span class='tiaoJian'>)</span>本回合无视你的【歌咏天赋】",
        },
	};
});
