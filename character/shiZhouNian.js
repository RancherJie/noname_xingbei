'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shiZhouNian',
		connect:true,
        characterSort:{
            shiZhouNian:{
                "3星":['fengZhiJianSheng','kuangZhanShi','shenJianShou','fengYinShi','anShaZhe','shengNv','tianShi','moFaShaoNv'],
                "3.5星":['moJianShi','shengQiangQiShi','yuanSuShi','maoXianJia','wenYiFaShi','zhongCaiZhe','jingLingSheShou','nvWuShen'],
                "4星":['shenGuan','yingLingRenXing','yinYangShi','moGong','xianZhe','lingFuShi','cangYanMoNv','moQiang','xueSeJianLing','qiDaoShi','hongLianQiShi'],
                "4.5星":['lingHunShuShi','yongZhe','yinYouShiRen','geDouJia','shengGong','shouLingWuShi',"jianDi"],
                "5星":["yueZhiNvShen",'xueZhiWuNv','dieWuZhe'],
            }
        },
		character:{
			fengZhiJianSheng:['male','ji',3,['fengNuZhuiJi','shengJian','lieFengJi','jiFengJi','jianYing'],],
            kuangZhanShi:['male','xue',3,['kuangHua','xueYingKuangDao','xueXingPaoXiao','siLie'],],
            shenJianShou:['female','ji',3,['shanDianJian','guanChuanSheJi','shanGuangXianJing','jingZhunSheJi','juJi'],],
            fengYinShi:['female','huan',3,['faShuJiDang','diZhiFengYin','shuiZhiFengYin','huoZhiFengYin','fengZhiFengYin','leiZhiFengYin','wuXiShuFu','fengYinPoSui'],],
            anShaZhe:['male','ji',3,['fanShi','shuiYing','qianXing'],],
            shengNv:['female','sheng',3,['bingShuangDaoYan','zhiLiaoShu','zhiYuZhiGuang','lianMin','shengLiao'],],
            tianShi:['female','sheng',3,['fengZhiJieJing','tianShiZhuFu','tianShiJiBan','tianShiZhiQiang','tianShiZhiGe','shenZhiBiHu'],],
            moFaShaoNv:['female','yong',3,['moBaoChongJi','moDanZhangWo','moDanRongHe','huiMieFengBao'],],
            moJianShi:['female','huan','3/4',['xiuLuoLianZhan','anYingNingJu','anYingZhiLi','anYingKangJu','anYingLiuXing','huangQaunZhenChan'],],
            shengQiangQiShi:['female','sheng','3/4',['shengShengQiShi','huiYao','chengJie','shengJi','tianQiang','diQiang','shengGuangQiYu'],],
            yuanSuShi:['male','yong','3/4',['yuanSuXiShou','yuanSuDianRan','yunShi','bingDong','huoQou','fengRen','leiJi','yueGuang','yuanSu'],],
            maoXianJia:['female','huan','3/4',['qiZha','qiangYun','diXiaFaZe','maoXianJiaTianTang','touTianHuanRi'],],
            wenYiFaShi:['male','huan','3/4',['buXiu','shengDu','wenYi','siWangZhiChu','juDuXinXing'],],
            zhongCaiZhe:['female','xue','3/4',['zhongCaiFaZe','yiShiZhongDuan','moRiShenPan','shenPanLangChao','zhongCaiYiShi','panJueTianPing','shenPan'],],
            shenGuan:['female','sheng',4,['shenShengQiShi','shenShengQiFu','shuiZhiShenLi','shengShiShouHu','shenShengQiYue','shenShengLingYu'],],
            qiDaoShi:['female','yong',4,['guangHuiXinYang','heiAnZuZhou','weiLiCiFu','xunJieCiFu','qiDao','faLiChaoXi','qiDaoFuWen'],],
            //xianZhe:['male','yong',6,['jianxiong'],],
            //lingFuShi:['female','yong',6,['jianxiong'],],
            //jianDi:['female','ji',6,['jianxiong'],],
            //geDouJia:['female','ji',6,['jianxiong'],],
            //yongZhe:['male','xue',6,['jianxiong'],],
            //lingHunShuShi:['female','huan',6,['jianxiong'],],
            //xueZhiWuNv:['female','xue',6,['jianxiong'],],
            //dieWuZhe:['female','yong',6,['jianxiong'],],
            nvWuShen:['female','sheng','3/4',['shenShengZhuiJi','zhiXuZhiYin','hePingXingZhe','junShenWeiGuan','yingLingZhaoHuan'],],
            //moGong:['female','huan',6,['jianxiong'],],
            hongLianQiShi:['female','xue',4,['xingHongShengYue','xingHongXinYang','xueXingDaoYan','shaLuShengYan','reXueFeiTeng','jieJiaoJieZao','xingHongShiZi','xueYin'],],
            yingLingRenXing:['female','yong',4,['zhanWenZhangWo','nuHuoYaZhi','zhanWenSuiJi','moWenRongHe','fuWenGaiZao','shuangChongHuiXiang','zhanWen','moWen'],],
            //moQiang:['female','huan',6,['jianxiong'],],
            cangYanMoNv:['female','xue',4,['cangYanFaDian','tianHuoDianKong','moNvZhiNu','tiShenWanOu','yongShengYinShiJi','tongKuLianJie','moNengFanZhuan','chongSheng'],],
            //yinYouShiRen:['male','huan',6,['jianxiong'],],
            jingLingSheShou:['female','ji','3/4',['yuanSuSheJi','dongWuHuoBan','jingLingMiYi','chongWuQiangHua','zhuFu'],],
            yinYangShi:['female','huan',4,['shiShenJiangLin','yinYangZhanHuan','shiShenZhuanHuan','heiAnJiLi','shiShenZhouShu','shengMingJieJie','guiHuo'],],
            xueSeJianLing:['female','xue',4,['xueSeJingJi','chiSeYiShan','xueRanQiangWei','xueQiPingZhang','xueQiangWeiTingYuan','sanHuaLunWu','xianXue'],],
            yueZhiNvShen:['female','sheng',5,['xinYueBiHu','anYueZuZhou','meiDuShaZhiYan','yueZhiLunHui','yueDu','anYueZhan','cangBaiZhiYue','xinYue','shiHua','anYue'],],
            //shouLingWuShi:['female','ji',6,['jianxiong'],],
            //shengGong:['male','sheng',6,['jianxiong'],],
		},
		
		
		skill:{
            //风之剑圣
            fengNuZhuiJi:{
                usable:1,
                trigger:{player:"useCardAfter"},
                priority:1,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)=='gongJi'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(player){
                    "step 0"
					var str='风怒追击：风系攻击行动';
					var next=player.gongJi(function(card,player,event){
                        if(get.xiBie(card)!='feng') return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					},str);
					next.autodelay=true;
                }
            },
            shengJian:{
                forced:true,
                trigger:{player:"useCardToPlayer"},
                group:['shengJian2','shengJian3','shengJian_draw_discard'],
                priority:1,
                filter:function(event,player){
                    if(get.type(event.card)=='gongJi'){
                        return player.storage.zhuDongGongJi==3;
                    }else{
                        return false
                    }
                },
                content:function(){
                    trigger.parent.canYingZhan=false;
                    trigger.parent.canShengGuang=false;
                    trigger.parent.canShengDun=false;
                },
                subSkill:{
                    draw_discard:{
                        forced:true,
                        trigger:{player:'useCardEnd'},
                        filter:function(event,player){
                            if(event.card!=player.storage.shengJian) return false;
                            return true;
                        },
                        content:function(){
                            "step 0"
                            var list=[0,1,2,3];
                            player.chooseControl(list).set('prompt','圣剑：摸X张牌并弃置X张牌').set('ai',function(){return 0;});
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
            shengJian2:{//圣剑记数
                forced:true,
                priority:2,
                trigger:{player:"useCardToPlayer"},
                filter:function(event,player){
                    if(event.parent.yingZhan==true) return false;
                    if(get.type(event.card)=='gongJi'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(event,player){
                    if(typeof player.storage.zhuDongGongJi!='number'){
                        player.storage.zhuDongGongJi=1;
                    }else{
                        player.storage.zhuDongGongJi++;
                    }
                    if(player.storage.zhuDongGongJi==3){
                        player.storage.shengJian=trigger.card;
                    }
                    //game.log('圣剑记数',player.storage.zhuDongGongJi);//测试用
                }
            },
            shengJian3:{//圣剑重置记数
                forced:true,
                trigger:{player:"phaseEnd"},
                filter:function(){
                    return true;
                },
                content:function(event,player){
                    player.storage.zhuDongGongJi=0;
                }
            },
            lieFengJi:{
                trigger:{player:"useCardToPlayer"},
                filter:function(event,target){
                    if(event.card.hasNature('lieFengJi')){
                        return event.target.hasExpansions('_shengDun');
                    }
                    return false;
                },
                content:function(){
                    trigger.parent.canShengDun=false;
                    trigger.parent.canYingZhan=false;
                }
            },
            jiFengJi:{
                trigger:{player:"useCard"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('jiFengJi');
                },
                content:function(event,target){
                    player.storage.gongJi++;
                }
            },
            jianYing:{
                usable:1,
                trigger:{player:'useCardAfter'},
                priority:0,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)=='gongJi'){
                        return player.canBiShaShuiJing();
                    }else{
                        return false;
                    }
                },
                content:function(player){
                    player.removeBiShaShuiJing();
                    player.storage.gongJi++;
                }
            },

            //狂战士
            kuangHua:{
                forced:true,
                trigger:{player:'useCardToTargeted'},
				filter:function(event){
					if(event.card&&get.type(event.card)=='gongJi'){
						return true;
					}
					return false;
				},
				firstDo:true,
				content:function(){
					trigger.getParent().baseDamage++;
                    if(player.countCards('h')>3){
                        trigger.getParent().baseDamage++;
                    }
				},
            },
            
            xueYingKuangDao:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('xueYingKuangDao');
                },
                content:function(){
                    player.addTempSkill('xueYingKuangDao2',{player:['useCardBefore','phaseEnd']});
                }
            },
            xueYingKuangDao2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.hasNature('xueYingKuangDao');
                },
                content:function(){
                    var target=trigger.target;
                    if(target.countCards('h')==2){
                        trigger.getParent().baseDamage++;//这样加伤，比较简单，注意时机必须是useCradTo
                        trigger.getParent().baseDamage++;
                    }else if(target.countCards('h')==3){
                        trigger.getParent().baseDamage++;
                    }
                }
            },
            xueXingPaoXiao:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('xueXingPaoXiao');
                },
                content:function(){
                    player.addTempSkill('xueXingPaoXiao2',{player:['useCardBefore','phaseEnd']});
                }
            },
            xueXingPaoXiao2:{
                forced:true,
                trigger:{player:'useCardToPlayer'},
                filter:function(event,player){
                    return event.card.hasNature('xueXingPaoXiao');
                },
                content:function(){
                    var target=trigger.target;
                    if(target.zhiLiao==2){//三者合一为强制命中，注意触发时机
                        trigger.parent.canYingZhan=false;
                        trigger.parent.canShengGuang=false;
                        trigger.parent.canShengDun=false;
                    }
                }
            },
            siLie:{
                trigger:{player:'useCardToTargeted'},
                lastDo:true,
                filter:function(event,player){
                    if(get.type(event.card)=='gongJi'){
                        return player.canBiShaBaoShi();
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    trigger.getParent().baseDamage++;
                    trigger.getParent().baseDamage++;
                }
            },

            //圣女
            bingShuangDaoYan:{
                forced:true,
                trigger:{player:'useCard'},
                filter:function(event){
                    return get.xiBie(event.card)=='shui'||get.name(event.card)=='shengGuang';
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('冰霜祷言：选择一名角色+1[治疗]',true).set('ai',function(target){
						if(target.side==player.side&&target.zhiLiao<target.getZhiLiaoLimit()){
                            return 1;
                        }else if(target.side==player.side&&target.zhiLiao>=target.getZhiLiaoLimit()){
                            return 0;
                        }else if(target.side!=player.side){
                            return -1;
                        }else{
                            return 1;
                        }
					});
                    'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'blue');
						target.changeZhiLiao();
					}
                },
            },
            zhiLiaoShu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('zhiLiaoShu');
				},
				position:'h',
				//viewAs:{name:'faShu',nature:'zhiLiaoShu'},
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('zhiLiaoShu');
                    });
				},
				prompt:'目标角色+2[治疗]。',
                filterTarget:true,
                selectTarget:1,
                discard:false,
                prepare:'useCard',
                content:function(){
                    target.changeZhiLiao(2);
                }
            },
            zhiYuZhiGuang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('zhiYuZhiGuang');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('zhiYuZhiGuang');
                    });
				},
				prompt:'指定最多3名角色各+1[治疗]。',
                filterTarget:true,
                selectTarget:[1,3],
                discard:false,
                prepare:'useCard',
                content:function(){
                    target.changeZhiLiao(1);
                }
            },
            lianMin:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    if(!player.isLinked()) player.link();
                    player.addNengLiang('b');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isLinked()) return 7
                    }
                }
            },
            shengLiao:{
                type:'faShu',
                usable:1,
                enable:['chooseToUse','faShu'],
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
                        target.changeZhiLiao(3);
                        event.finish();
                    }else if(targets.length==3||player.storage.shengLiao==2){
                        target.changeZhiLiao(1);
                        event.finish();
                    }else if(player.storage.shengLiao==1){
                        target.changeZhiLiao(2);
                        event.finish();
                    }else{
                        var list=['1','2'];
                        var name=get.translation(target)
                        player.chooseControl(list).set('prompt',name+'获得1[治疗]或2[治疗]');
                    }
                    'step 1'
                    if(result.control=='1'){
                        target.changeZhiLiao(1);
                        player.storage.shengLiao=1;
                    }else if(result.control=='2'){
                        target.changeZhiLiao(2);
                        player.storage.shengLiao=2;
                    }
                },
                contentAfter:function(){
                    player.storage.shengLiao=0;
                    player.chooseToUse();
                }
            },

            //暗杀者
            fanShi:{
                trigger:{player:"damageEnd"},
                forced:true,
                filter:function(event){
                    return event.faShu!=true;
                },
                content:function(){
                    trigger.source.draw();
                }
            },
            shuiYing:{
                trigger:{player:'drawBegin'},
                filter:function(event,player){
                    return event.yuanYin!="teShuXingDong"&&player.countCards('h')>0;
                },
                direct:true,
                content:function(event,player){
                    'step 0'
                    var next=player.chooseToDiscard([1,Infinity],function(card){
                        return get.xiBie(card)=='shui';
                    });
                    next.set('prompt',get.prompt('shuiYing'));
                    next.set('prompt2',lib.translate.shuiYing_info);
                    next.ai=function(card){
						return 1;
					}
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.showCards(result.cards);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(!player.isLinked()) event.finish();
                    'step 3'
                    var next=player.chooseToDiscard(1,'水影：选择要弃置的法术牌',function(card){
                        return get.type(card)=='faShu';
                    });
                    next.ai=function(card){
						return 1;
					}
                    'step 4'
                    if(result.bool){
                        player.showCards(result.cards);
                    }

                }
            },
            qianXing:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    var list=['是','否'];
                    player.chooseControl(list).set('prompt','潜行：是否摸一张牌');
                    'step 1'
                    if(result.control=='是'){
                        player.draw();
                    }
                    'step 2'
                    if(!player.isLinked()) player.link();
                    'step 3'
                    var num=player.needsToDiscard();
                    if(num>0){
						player.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
					}
                    'step 4'
                    player.addSkill('qianXing2');
                },
                ai:{
                    order:10,
                    result:{
                        player:5,
                    }
                },
                mod:{
                    maxHandcardBase:function(player,num){
                        if(player.isLinked()) return num-1;
                    },
                    targetEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi'&&target.isLinked()) return false;
                    }
                },
            },
            qianXing2:{
                group:['qianXing2_shangHai','qianXing2_wuFaYingZhan','qianXing2_chongZhi'],
                subSkill:{
                    shangHai:{
                        forced:true,
                        trigger:{player:"useCardToTargeted"},
                        filter:function(event,player){
                            if(event.parent.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            var num=player.countMark('_tiLian_r')+player.countMark('_tiLian_b');
                            trigger.getParent().baseDamage+=num;
                        }
                    },
                    wuFaYingZhan:{
                        forced:true,
                        trigger:{player:'useCardToPlayer'},
                        filter:function(event,player){
                            if(event.parent.yingZhan==true) return false;
                            if(get.type(event.card)=='gongJi') return true;
                        },
                        content:function(){
                            trigger.parent.canYingZhan=false;
                        }
                    },
                    chongZhi:{
                        direct:true,
                        priority:1,
                        trigger:{player:'phaseUseBegin'},
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            if(player.isLinked()) player.link();
                            'step 1'
                            player.removeSkill('qianXing2');
                        }
                    }
                }
            },
            
            //封印师
            faShuJiDang:{
                group:['faShuJiDang_1','faShuJiDang_2'],
                subSkill:{
                    1:{
                        trigger:{player:'useCardAfter'},
                        filter:function(event,player){
                            return get.type(event.card)=='faShu'&&get.is.xiDong(event.parent);
                        },
                        content:function(){
                            player.storage.gongJi++;
                        }
                    },
                    2:{
                        trigger:{player:'useSkillAfter'},
                        filter:function(event){
                            var info=get.info(event.skill);
                            return info.type=='faShu';
                        },
                        content:function(player){
                            player.storage.gongJi++;
                        }
                    },
                },
            },
            diZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('diZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('diZhiFengYin');
                    })
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('diZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
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
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('diZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(get.xiBie(card)=='di'){
                                    return true;
                                }
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('diZhiFengYin_xiaoGuo'));
                            player.removeSkill('diZhiFengYin_xiaoGuo')
                        }
                    },
                }
            },
            shuiZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('shuiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('shuiZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('shuiZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
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
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('shuiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(get.xiBie(card)=='shui'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('shuiZhiFengYin_xiaoGuo'));
                            player.removeSkill('shuiZhiFengYin_xiaoGuo')
                        }
                    },
                }
            },
            huoZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('huoZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('huoZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('huoZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
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
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('huoZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(get.xiBie(card)=='huo'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('huoZhiFengYin_xiaoGuo'));
                            player.removeSkill('huoZhiFengYin_xiaoGuo')
                        }
                    },
                }
            },
            fengZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('fengZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('fengZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('fengZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
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
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('fengZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(get.xiBie(card)=='feng'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('fengZhiFengYin_xiaoGuo'));
                            player.removeSkill('fengZhiFengYin_xiaoGuo')
                        }
                    },
                }
            },
            leiZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('leiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('leiZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('leiZhiFengYin_xiaoGuo')
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
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('leiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(get.xiBie(card)=='lei'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('leiZhiFengYin_xiaoGuo'));
                            player.removeSkill('leiZhiFengYin_xiaoGuo')
                        }
                    },
                }
            },
            wuXiShuFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    return true;
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.addSkill('wuXiShuFu_xiaoGuo')
					target.addMark('wuXiShuFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        priority:2,
                        trigger:{player:'phaseUseBefore'},
                        forced:true,
                        markimage:'image/card/wuXiShuFu.png',
                        intro:{
                            content:'(将【五系束缚】放置于目标对手面前)该对手跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸(2+X)张牌来取消【五系束缚】的效果。X为场上封印的数量，X最高为2。无论效果是否发动，触发后移除此牌。',
                        },
                        filter:function(event,player){
                            return player.hasMark('wuXiShuFu_xiaoGuo');
                        },
                        content:function(event,player){
                            'step 0'
                            event.x=0;
                            for(var p of game.players){
                                if(event.x>=2){
                                    event.x=2;
                                    break;
                                }
                                for(var xiaoGuo of game.jiChuXiaoGuo.fengYinShi){
                                    if(p.hasExpansions(xiaoGuo)){
                                        event.x++;
                                    }
                                }
                            }
                            var list=[`摸2+${event.x}张牌`,'跳过行动阶段'];
                            if(player.hasExpansions('_xuRuo')){
                                list[0]=`摸2+3+${event.x}张牌`;
                            }
                            player.chooseControl().set('choiceList',list).set('prompt','五系束缚：选择一项').set('ai',function(){return 1;});
                            'step 1'
                            if(result.index==1){
                                trigger.cancel();
                            }else if(result.index==0){
                                if(player.hasExpansions('_xuRuo')){
                                    player.draw(2+3+event.x);
                                }else{
                                    player.draw(2+event.x);
                                }
                               
                            }
                            player.removeMark('wuXiShuFu_xiaoGuo');
                            if(player.hasExpansions('_xuRuo')){
                                player.loseToDiscardpile(player.getExpansions('_xuRuo')); 
                            }
                            player.removeSkill('wuXiShuFu_xiaoGuo');
                        },
                    }
                }
            },
            fengYinPoSui:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    for(var p of game.players){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(p.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                },
                filterTarget:function(card,player,target){
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                return true;
                            }
                        }
                    }
                },
                selectTarget:1,
                content:function(player,event){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var list=[];
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                list.push(xiaoGuo);
                            }
                        }
                    }
                    player.chooseControl(list).set('prompt','选择要获得的基础效果');
                    'step 2'
                    if(result.control=='_zhongDu'){
                        player.chooseCardButton(target.getExpansions('_zhongDu'),true,'选择要获得的中毒')
                    }else{
                        player.gain(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.finish();
                    }
                    'step 3'
                    var card=result.links[0];
                    var list=target.getExpansions('_zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    player.gain(card);
                }
            },

            //天使
            fengZhiJieJing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.countCards('h',function(card){
                        return get.xiBie(card)=='feng';
                    })){
                        return false;
                    }
                    for(var p of game.players){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(p.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                },
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                return true;
                            }
                        }
                    }
                },
                prepare:'showCards',
                content:function(){
                    'step 0'
                    var list=[];
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                list.push(xiaoGuo);
                            }
                        }
                    }
                    player.chooseControl(list).set('prompt','选择要移除的基础效果');
                    'step 1'
                    if(result.control=='_zhongDu'){
                        player.chooseCardButton(target.getExpansions('_zhongDu'),true,'选择要移除的中毒')
                    }else{
                        target.loseToDiscardpile(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.trigger('yiChuJiChuXiaoGuo');
                        event.finish();
                    }
                    'step 2'
                    var card=result.links[0];
                    var list=target.getExpansions('_zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    target.loseToDiscardpile(card);
                    event.trigger('yiChuJiChuXiaoGuo');
                }
            },
            tianShiZhuFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',function(card){
                        return get.xiBie(card)=='shui';
                    });
                },
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                selectCard:1,
                selectTarget:[1,2],
                filterTarget:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        if(target.countCards('h')>=2){
                            target.chooseCard('交给守护天使2张牌',true,2);
                        }else if(target.countCards('h')==1){
                            target.chooseCard('交给守护天使1张牌',true,1);
                        }else if(target.countCards('h')==0){
                            event.finish();
                        }
                    }else if(targets.length==2){
                        if(target.countCards('h')>=1){
                            target.chooseCard('交给守护天使1张牌',true,1);
                        }else{
                            event.finish();
                        }
                    }
                    'step 1'
                    target.give(result.cards,player,'give');
                }
            },
            tianShiJiBan:{
                group:['tianShiJiBan_1','tianShiJiBan_2'],
                subSkill:{
                    1:{
                        trigger:{player:'yiChuJiChuXiaoGuo'},
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chooseTarget('天使羁绊：选择一名角色+1[治疗]',true).set('ai',function(target){
                                if(target.side==player.side&&target.zhiLiao<target.getZhiLiaoLimit()){
                                    return 2;
                                }else if(target.side==player.side&&target.zhiLiao==target.getZhiLiaoLimit()){
                                    return 1;
                                }else{
                                    return -1;
                                }
                            });
                            'step 1'
                            if(result.bool){
                                var target=result.targets[0];
                                player.line(target,'blue');
                                target.changeZhiLiao();
                            }
                        }
                    },
                    2:{
                        trigger:{player:'useCard'},
                        filter:function(event){
                            return event.card.name=='shengDun';
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chooseTarget('天使羁绊：选择一名角色+1[治疗]',true).set('ai',function(target){
                                if(target.side==player.side&&target.zhiLiao<target.getZhiLiaoLimit()){
                                    return 2;
                                }else if(target.side==player.side&&target.zhiLiao==target.getZhiLiaoLimit()){
                                    return 1;
                                }else{
                                    return -1;
                                }
                            });
                            'step 1'
                            if(result.bool){
                                var target=result.targets[0];
                                player.line(target,'blue');
                                target.changeZhiLiao();
                            }
                        }
                    },
                }
            },
            tianShiZhiQiang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('tianShiZhiQiang');
				},
				position:'h',
				viewAs:{name:'shengDun'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('tianShiZhiQiang');
                    });
				},
            },
            tianShiZhiGe:{
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    for(var p of game.players){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(p.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget('天使之歌：选择1个有基础效果的目标角色',function(card,player,target){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(target.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    },true);
                    'step 2'
                    if(result.bool){
                        var target=result.targets[0];
                        event.target=target;
                        var list=[];
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(target.hasExpansions(xiaoGuo)){
                                    list.push(xiaoGuo);
                                }
                            }
                        }
                        player.chooseControl(list).set('prompt','选择要移除的基础效果');
                    }
                    'step 3'
                    if(result.control=='_zhongDu'){
                        player.chooseButton(target.getExpansions('_zhongDu'),true,'选择要移除的中毒')
                    }else{
                        target.loseToDiscardpile(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.trigger('yiChuJiChuXiaoGuo');
                        event.finish();
                    }
                    'step 4'
                    var card=result.links[0];
                    var list=target.getExpansions('_zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    target.loseToDiscardpile(card);
                    event.trigger('yiChuJiChuXiaoGuo');
                }
            },
            shenZhiBiHu:{
                trigger:{global:'changeShiQi2'},
                filter:function(event,player){
                    if(event.side!=player.side){
                        return false;
                    }
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    if(event.yuanYin!="damage"){
                        return false;
                    }
                    if(event.faShu!=true){
                        return false;
                    }
                    if(event.num>=0){//只有小于0为士气降低
                        return false;
                    }
                    return true;
                },
                direct:true,
                content:function(player){
                    'step 0'
                    var list=[];
                    for(var i=0;i<player.countMark('_tiLian_r');i++){
                        list.push('宝石');
                    }
                    for(var i=0;i<player.countMark('_tiLian_b');i++){
                        list.push('水晶');
                    }
                    var next=player.chooseButton(['是否发动【神之庇护】'+lib.translate.shenZhiBiHu_info,[list,'tdnodes']]);
                    next.set('selectButton',[1,-trigger.num])
                    'step 1'
                    if(result.bool){
                        var num=result.links.length;
                        player.logSkill(event.name);
                        if(num>0){
                            trigger.num+=num;
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='宝石'){
                                    player.removeMark('_tiLian_r');
                                }else if(result.links[i]=='水晶'){
                                    player.removeMark('_tiLian_b');
                                }
                            }
                        }  
                    }else{
                        event.finish();
                    }
                }
            },
            
            //神箭手
            shanDianJian:{
                forced:true,
                trigger:{player:"useCardToPlayer"},
                filter:function(event){
                    if(get.xiBie(event.card)=='lei'&&get.type(event.card)=='gongJi'){
                        return true;
                    }
                    return false;
                },
                content:function(){
                    trigger.parent.canYingZhan=false;
                }
            },
            guanChuanSheJi:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(_status.connectMode) return true;
                    if(player.countCards('h',card=>get.type(card)=='faShu')>0){
                        return true;
                    }else{
                        return false;
                    }
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard(1,function(card){
                        return get.type(card)=='faShu';
                    });
                    next.set('prompt',get.prompt('guanChuanSheJi'));
                    next.set('prompt2',lib.translate.guanChuanSheJi_info);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.player);
                        player.showCards(result.cards);
                        var next=trigger.player.damage(2,player);
                        next.faShu=true;
                    }else{
                        event.finish();
                    }
                    
                    
                }
            },
            shanGuangXianJing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('shanGuangXianJing');
				},
                selectCard:1,
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('shanGuangXianJing');
                    });
				},
                selectTarget:1,
                filterTarget:true,
                useCard:true,
                content:function(){
                    target.damageFaShu(2,player);
                }
            },
            jingZhunSheJi:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    return event.card.hasNature('jingZhunSheJi');
                },
                content:function(){
                    player.addTempSkill('jingZhunSheJi2',{player:['useCardBefore','phaseEnd']});
                }
            },
            jingZhunSheJi2:{
                forced:true,
                trigger:{player:'useCardToPlayer'},
                content:function(){
                    trigger.parent.canShengDun=false;
                    trigger.parent.canShengGuang=false;
                    trigger.parent.canYingZhan=false;
                    trigger.parent.baseDamage--;
                },
            },
            juJi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.drawTo(5);
                    player.gongJi('狙击：攻击行动');
                }
            },
            
            //魔法少女
            moBaoChongJi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='faShu');
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                contentBefore:function(){
                    if(player.side==true){
                        if(game.hongZhanJi.length<5){
                            player.changeZhanJi('r',1);
                        }
                    }else if(player.side==false){
                        if(game.lanZhanJi.length<5){
                            player.changeZhanJi('r',1);
                        }
                    }
                },
                content:function(){
                    'step 0'
                    target.chooseToDiscard(1,function(card){
                        return get.type(card)=='faShu';
                    }).set('ai',function(){
                        return 1;
                    })
                    'step 1'
                    if(result.bool){
                        target.showCards(result.cards);
                    }else{
                        var next=target.damage(2,player);
                        next.faShu=true;
                        if(player.countCards('h')>=1){
                            player.chooseToDiscard(1,true);
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
                        if(player.side==player.getNext().side){
                            return false;
                        }else{
                            return true;
                        }
                    }
                    return range_l<range_r;
                },
                content:function(){
                    game.broadcastAll(function(){
                        game.moDan_shunShiZhen=true;
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
                enable:['chooseToUse','faShu','chooseToUse_qiTa'],
				filterCard:function(card){
                    return get.xiBie(card)=='di'||get.xiBie(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return get.xiBie(card)=='di'||get.xiBie(card)=='huo';
                    });
				},
            },
            huiMieFengBao:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
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
                    var next=target.damage(2,player);
                    next.faShu=true;
                }
            },

            //女武神
            shenShengZhuiJi:{
                group:['shenShengZhuiJi_1','shenShengZhuiJi_2'],
                subSkill:{
                    1:{
                        trigger:{player:'useCardAfter'},
                        filter:function(event,player){
                            if(get.type(event.card)=='gongJi'){
                                if(event.yingZhan==true) return false;
                            }else if(get.type(event.card)=='faShu'){
                                if(event.parent.name=='chooseToUse_qiTa') return false;
                            }
                            return player.zhiLiao>=1;
                        },
                        content:function(){
                            player.changeZhiLiao(-1);
                            player.storage.gongJi++;
                        }
                    },
                    2:{
                        trigger:{player:'useSkillAfter'},
                        filter:function(event,player){
                            var info=get.info(event.skill);
                            return info.type=='faShu'&&player.zhiLiao>=1;
                        },
                        content:function(player){
                            player.changeZhiLiao(-1);
                            player.storage.gongJi++;
                        }
                    },
                }
            },
            zhiXuZhiYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.changeZhiLiao(1);
                    player.addNengLiang('b');
                }
            },
            hePingXingZhe:{
                group:'hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                filter:function(event,player){
                    if(_status.currentPhase!=player) return false;
                    return !player.isLinked();
                },
                content:function(){
                    player.storage.yingLingXingTai=true;
                    if(!player.isLinked()) player.link();
                },
                subSkill:{
                    chongZhi:{
                        forced:true,
                        trigger:{player:'useCardToPlayer'},
                        priority:99,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(get.type(event.card)!= 'gongJi') return false;
                            if(event.parent.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            if(player.isLinked()){
                                player.link();
                            }
                            
                        }
                    }
                }
            },
            junShenWeiGuan:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.isLinked();
                },
                content:function(){
                    'step 0'
                    var choiceList=['你+1[治疗]，[重置]脱离【英灵形态】','(移除我方【战绩区】X个星石，X<3)目标角色+X[治疗]'];
                    var choices=['选择一'];
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else if(player.side==false){
                        var list=game.lanZhanJi;
                    }
                    if(list.length>=1){
                        choices.push('选项二');
                    }
                    player.chooseControl(choices).set('prompt','军光神威：选择一项').set('choiceList',choiceList);
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        if(player.isLinked()){
                            player.link();
                        }
                        event.finish();
                    }else if(result.index==1){
                        if(player.side==true){
                            var list=game.hongZhanJi;
                        }else{
                            var list=game.lanZhanJi;
                        }
                        var next=player.chooseButton([
                            '移除X个星石，X<3',
                            [list,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('selectButton',[1,2]);
                    }
                    'step 2'
                    event.number=result.links.length;
                    var number=event.number;
                    for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='宝石'){
							player.changeZhanJi('r',-1);
						}else if(result.links[i]=='水晶'){
							player.changeZhanJi('b',-1);
						}
					}
                    player.chooseTarget(1,true,'选择一个目标角色+'+number+'[治疗]');
                    'step 3'
                    result.targets[0].changeZhiLiao(event.number);
                }
            },
            yingLingZhaoHuan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.parent.baseDamage+=1;
                    'step 2'
                    player.chooseToDiscard(1,'英灵召唤：弃置1张法术牌[展示]，目标角色+1[治疗]',function(card){
                        return get.type(card)=='faShu';
                    });
                    'step 3'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.chooseTarget(1,'英灵召唤：目标角色+1[治疗]',true);
                    }
                    'step 4'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1);
                    }
                    'step 5'
                    event.player=player;
                    event.trigger('yingLingZhaoHuan')
                }
            },

            //元素师
            yuanSuXiShou:{
                trigger:{source:'damageBegin'},
                filter:function(event,player){
                    if(player.countMark('yuanSu')>=3) return false;
                    if(event.faShu!=true) return false;
                    if(player.storage.yuanSuDianRan==true) return false;
                    return true;
                },
                content:function(){
                    player.addMark('yuanSu');
                }
            },
            yuanSuDianRan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countMark('yuanSu')>=3
                },
                content:function(){
                    'step 0'
                    player.storage.yuanSuDianRan=true;
                    player.removeMark('yuanSu',3);
                    'step 1'
                    player.chooseTarget(1,'元素点燃：选择1名目标角色造成2点法术伤害',true);
                    'step 2'
                    if(result.bool){
                        var target=result.targets[0];
                        var next=target.damage(2,player);
                        next.faShu=true;
                    }
                    'step 3'
                    player.faShu('元素点燃：法术行动');
                    player.storage.yuanSuDianRan=false;
                }
            },
            yunShi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('yunShi');
				},
                selectCard:1,
				position:'h',
                useCard:true,
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('yunShi');
                    });
				},
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,card=>get.xiBie(card)=='di','是否额外弃1张地系牌[展示]');
                    'step 1'
                    var num=1;
                    if(result.bool){
                        player.showCards(result.cards);
                        num+=1;
                    }
                    target.damageFaShu(num,player);
                    'step 2'
                    player.faShu('陨石：法术行动');
                },
            },
            bingDong:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filterCard:function(card){
                    return card.hasNature('bingDong');
				},
                selectCard:1,
				position:'h',
                useCard:true,
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('bingDong');
                    });
				},
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,card=>get.xiBie(card)=='shui','是否额外弃1张水系牌[展示]');
                    'step 1'
                    var num=1;
                    if(result.bool){
                        player.showCards(result.cards);
                        num+=1;
                    }
                    target.damage(num,player).set('faShu',true);
                    'step 2'
                    player.chooseTarget(1,'冰冻：选择1名角色+1[治疗]',true);
                    'step 3'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1);
                    }
                }
            },
            huoQou:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('huoQou');
				},
                selectCard:1,
				position:'h',
                useCard:true,
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('huoQou');
                    });
				},
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,card=>get.xiBie(card)=='huo','是否额外弃1张火系牌[展示]');
                    'step 1'
                    var num=2;
                    if(result.bool){
                        player.showCards(result.cards);
                        num+=1;
                    }
                    target.damage(num,player).set('faShu',true);
                }
            },
            fengRen:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('fengRen');
				},
                selectCard:1,
				position:'h',
                useCard:true,
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('fengRen');
                    });
				},
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,card=>get.xiBie(card)=='feng','是否额外弃1张风系牌[展示]');
                    'step 1'
                    var num=1;
                    if(result.bool){
                        player.showCards(result.cards);
                        num+=1;
                    }
                    target.damage(num,player).set('faShu',true);
                    'step 2'
                    player.gongJi('风刃：攻击行动');
                }
            },
            leiJi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('leiJi');
				},
                selectCard:1,
				position:'h',
                useCard:true,
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('leiJi');
                    });
				},
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,card=>get.xiBie(card)=='lei','是否额外弃1张雷系牌[展示]');
                    'step 1'
                    var num=1;
                    if(result.bool){
                        player.showCards(result.cards);
                        num+=1;
                    }
                    target.damage(num,player).set('faShu',true);
                    'step 2'
                    if(player.side==true){
                        if(game.hongZhanJi.length<5){
                            player.changeZhanJi('r',1);
                        }
                    }else if(player.side==false){
                        if(game.lanZhanJi.length<5){
                            player.changeZhanJi('b',1);
                        }
                    }
                }
            },
            yueGuang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                selectTarget:1,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var num=player.countNengLiang('r')+player.countNengLiang('b')+1;
                    event.num=num;
                    'step 2'
                    var next=target.damage(event.num,player);
                    next.faShu=true;
                }
            },
            yuanSu:{
                intro:{
                    name:'元素',
                    content:'mark',
                },
                markimage:'image/card/hong.png',
            },

            //月之女神
            xinYueBiHu:{
                trigger:{global:'changeShiQi2'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    if(event.side!=player.side) return false;
                    if(event.num>=0) return false;
                    if(event.yuanYin!='damage') return false;
                    if(!event.parent.result.cards) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    if(!player.isLinked()){
                        player.link();
                    }
                    'step 1'
                    var cards=trigger.parent.result.cards;
                    if(cards){
                        player.addToExpansion('giveAuto',trigger.parent.result.cards).gaintag.add('anYue');
                    }
                    'step 2'
                    trigger.cancel();
                }
            },
            anYueZuZhou:{
                trigger:{player:'yiChuAnYue'},
                forced:true,
                content:function(){
                    'step 0'
                    player.changeShiQi(-1);
                    'step 1'
                    if(player.getExpansions('anYue').length==0){
                        if(player.isLinked()){
                            player.link();
                        }
                    }
                }
            },
            meiDuShaZhiYan:{
                trigger:{global:'useCard'},
                lastDo:true,
                filter:function(event,player){
                    if(event.player.side==player.side) return false;
                    if(get.itemtype(event.cards)!='cards') return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(event.targets.length<=0) return false;
                    var anYue=player.getExpansions('anYue');
                    if(_status.connectMode&&anYue.length>0) return true;
                    for(var i=0;i<anYue.length;i++){
                        if(get.xiBie(anYue[i])==get.xiBie(event.card)) return true;
                    }
                    return false;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('anYue');
                    var next=player.chooseCardButton(cards,'是否发动【美杜莎之眼】'+lib.translate.meiDuShaZhiYan_info);
                    next.set('filterButton',function(button){
                        return get.xiBie(button)==get.xiBie(_status.event.trigger_card);
                    });
                    next.set('trigger_card',trigger.card);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        var card=result.links[0];
                        event.card=card;
                        player.loseToDiscardpile(card);
                        player.showCards(card).set('gaiPai',true);
                        event.trigger('yiChuAnYue');
                    }else{
                        event.finish();
                    }
                    
                    'step 2'
                    player.changeZhiLiao(1);
                    if(player.countMark('shiHua')<3){
                        player.addMark('shiHua');
                    }
                    'step 3'
                    if(get.type(event.card)=='faShu'){
                        if(player.countCards('h')>0){
                            player.chooseToDiscard('h',true);
                        }
                    }else{
                        event.finish();
                    }
                    'step 4'
                    player.chooseTarget(1,'暗月：目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 5'
                    if(result.bool){
                        result.targets[0].damage(1,player).set('faShu',true);
                    }
                }

            },
            yueZhiLunHui:{
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    return player.zhiLiao>0||player.getExpansions('anYue').length>0;
                },
                content:function(){
                    'step 0'
                    var choices=[];
                    var choiceList=['<span class="tiaoJian">(移除1个【暗月】)</span>目标角色+1[治疗]',"<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【</span>新月<span class='hong'>】</span>"];
                    if(player.getExpansions('anYue').length>0){
                        choices.push('选项一');
                    }
                    if(player.zhiLiao>0){
                        choices.push("选项二");
                    }
                    player.chooseControl(choices).set('prompt',"月之轮回：选择以下一项发动").set('choiceList',choiceList);
                    'step 1'
                    if(result.control=='选项一'){
                        event.goto(2);
                    }else if(result.control=="选项二"){
                        event.goto(6);
                    }
                    'step 2'
                    var anYue=player.getExpansions('anYue');
                    player.chooseCardButton(anYue,true,'移除1个【暗月】目标角色+1[治疗]');
                    'step 3'
                    var card=result.links[0];
                    event.card=card;
                    player.loseToDiscardpile(card);
                    event.trigger('yiChuAnYue');
                    'step 4'
                    player.chooseTarget(1,'目标角色+1[治疗]',true);
                    'step 5'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1);
                    }
                    event.finish();
                    'step 6'
                    player.changeZhiLiao(-1);
                    if(player.countMark('xinYue')<2){
                        player.addMark('xinYue');
                    }
                    event.finish();
                }
            },
            yueDu:{
                usable:1,
                trigger:{source:'damageAfter'},
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
                        result.targets[0].damage(1,player).set('faShu',true);
                    }
                }
            },
            anYueZhan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.isLinked()&&player.canBiShaShuiJing()&&player.getExpansions('anYue').length>0&&get.type(event.card)=='gongJi';
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var cards=player.getExpansions('anYue');
                    player.chooseCardButton(cards,true,'暗月斩：移除X个【暗月】(x<3)本次攻击伤害额外+X',[1,2]);
                    'step 2'
                    if(result.links.length>0){
                        event.num=result.links.length;
                        player.loseToDiscardpile(result.links);
                        event.trigger('yiChuAnYue');
                    }else{
                        event.finish();
                    }
                    'step 3'
                    trigger.parent.baseDamage+=event.num;
                }
            },
            cangBaiZhiYue:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var choiceList=['<span class="tiaoJian">(移除3个【石化】)</span>你的下次主动攻击对手无法应战，额外+1攻击行动。你额外获得一个回合',"移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③"];
                    var choices=['选项二']
                    if(player.countMark('shiHua')>=3){
                        choices.unshift('选项一');
                    }
                    player.chooseControl(choices).set('prompt','苍白之月：选择以下一项发动').set('choiceList',choiceList);
                    'step 2'
                    if(result.control=='选项一'){
                        event.goto(3);
                    }else if(result.control=="选项二"){
                        event.goto(6);
                    }
                    'step 3'
                    player.removeMark('shiHua',3);
                    player.addSkill('cangBaiZhiYue1');
                    player.gongJi('攻击行动');
                    'step 4'
                    player.insertPhase();
                    'step 5'
                    event.finish();
                    
                    'step 6'
                    var list=[];
                    var num=player.countMark('xinYue');
                    for(var i=0;i<=num;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt',"移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③").set('ai',function(){return list.length-1;});
					"step 7"
					var num=result.control;
                    event.num=num;
					if(num>0){
						player.removeMark('xinYue',num);
					}
                    player.addMark('shiHua');
                    if(player.countCards('h')>0){
                        player.chooseToDiscard(1,'h',true);
                    }
                    'step 8'
                    player.chooseTarget(1,'对目标对手造成('+event.num+'+1)点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 9'
                    if(result.bool){
                        result.targets[0].damage(event.num+1,player).set('faShu',true);
                    }
                },
                 
            },
            cangBaiZhiYue1:{
                trigger:{player:'useCardToPlayer'},
                forced:true,
                filter:function(event,player){
                    return event.parent.yingZhan!=true&&get.type(event.card)=="gongJi";
                },
                content:function(){
                    'step 0'
                    trigger.parent.canYingZhan=false;
                    'step 1'
                    player.removeSkill('cangBaiZhiYue1');
                }
            },
            xinYue:{
                intro:{
                    name:'新月',
                    content:'mark',
                },
                markimage:'image/card/hong.png',
            },
            shiHua:{
                intro:{
                    name:'石化',
                    content:'mark',
                },
                markimage:'image/card/lan.png',
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
            },

            //仲裁者
            zhongCaiFaZe:{
                trigger:{global:"enterGame"},
                forced:true,
                content:function(){
                    player.changeNengLiang('b',2);
                }
            },
            yiShiZhongDuan:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.canTeShu==false) return false;
                    return player.isLinked();
                },
                content:function(){
                    player.link();
                    player.addZhanJi('r',1)
                }
            },
            moRiShenPan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('shenPan')>0;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    event.num=player.countZhiShiWu('shenPan');
                    'step 1'
                    player.removeZhiShiWu('shenPan',event.num);
                    target.damageFaShu(event.num,player);
                },
                group:'moRiShenPan_biXu',
                subSkill:{
                    biXu:{
                        trigger:{player:'phaseUseBegin'},
                        forced:true,
                        lastDo:true,
                        filter:function(event,player){
                            return player.countZhiShiWu('shenPan')>=get.info('shenPan').intro.max;
                        },
                        content:function(){
                            'step 0'
                            player.chooseTarget('末日宣告：选择一个目标',true).set('ai',function(target){
                                return target.side!=player.side;
                            });
                            'step 1'
                            player.useSkill('moRiShenPan',result.targets).set('action',true);
                        }
                    }
                }
            },
            shenPanLangChao:{
                forced:true,
                trigger:{player:'damageEnd'},
                content:function(){
                    player.addZhiShiWu('shenPan',1);
                },
            },
            zhongCaiYiShi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.canTeShu==false) return false;
                    return player.canBiShaBaoShi()&&!player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    var num=player.needsToDiscard();
                    if(num>0){
						player.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
					}
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isLinked()) return 5;
                    }
                },
                group:'zhongCaiYiShi_shenPan',
                subSkill:{
                    shenPan:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.addZhiShiWu('shenPan',1);
                        }
                    }
                }
            },
            panJueTianPing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('shenPan',1);
                    var list=['弃掉所有手牌','将你的手牌补到上限[强制]，我方战绩区+1[宝石]'];
                    player.chooseControl().set('prompt','判决天平：选择一项').set('choiceList',list);
                    'step 2'
                    if(result.control=='选项一'){
                        player.discard(player.getCards());
                    }
                    else if(result.control=='选项二'){
                        var num=player.getHandcardLimit();
                        player.drawTo(num);
                        player.addZhanJi('r',1);
                    }
                }
            },
            shenPan:{
                intro:{
                    name:'审判',
                    content:'mark',
                    max:4,
                },
                markimage:'image/card/lan.png',
            },

            //冒险家
            qiZha:{
                enable:['chooseToUse','gongJi'],
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var type=get.xiBie(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return false;
                },
                selectCard:[2,3],
                prepare:'showCards',
                filterCard:function(card){
                    if(!ui.selected.cards.length){
                        return true;
                    }
                    var xiBie=get.xiBie(card);
                    if(get.xiBie(ui.selected.cards[0])!=xiBie){
                        return false;
                    }
                    return true;
                },
                complexCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:function(){
                    'step 0'
                    var length=cards.length;
                    var list=['shui','huo','feng','lei','di'];
                    if(length==2){
                        var next=player.chooseControl(list).set('prompt','选择攻击系别');
                    }else if(length==3){
                        event.goto(2);
                    }
                    'step 1'
                    var xiBie=result.control;
                    var name;
                    switch(xiBie){
                        case'shui':name='shuiLianZhan';break;
                        case 'huo':name='huoYanZhan';break;
                        case 'feng':name='fengShenZhan';break;
                        case 'lei':name='leiGuangZhan';break;
                        case 'di':name='diLieZhan';break;
                    }
                    var card={name:name,xiBie:xiBie,isCard:true};
                    player.useCard(card,target).set('action',true);
                    event.finish();
                    'step 2'
                    var card={name:'anMie',xiBie:'an',isCard:true};
                    player.useCard(card,target).set('action',true);
                    event.finish();
                },
                
            },
            qiangYun:{
                trigger:{player:'useSkill'},
                filter:function(event,player){
                    return event.skill=='qiZha';
                },
                forced:true,
                content:function(){
                    player.addNengLiang('b');
                }
            },
            diXiaFaZe:{
                trigger:{player:'gouMai'},
                forced:true,
                content:function(){
                    player.addZhanJi('r',2);
                    trigger.finish();
                }
            },
            maoXianJiaTianTang:{
                enable:'phaseUse',
                type:'teShu',
                filter:function(event,player){
                    var side=player.side
                    if(side==true){
                        if(game.hongZhanJi.length==0) return false;
                    }else if(side==false){
                        if(game.lanZhanJi.length==0) return false;
                    }
                    for(var i=0;i<game.players.length;i++){
                        if(side!=game.players[i].side) continue;
                        if(game.players[i].countNengLiangAll()<game.players[i].getNengLiangLimit()){
                            return true;
                        }
                    }
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return player.side==target.side&&target.countNengLiangAll()<target.getNengLiangLimit();
                },
                content:function(){
                    'step 0'
                    var num=target.getNengLiangLimit()-target.countNengLiangAll();
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else if(player.side==false){
                        var list=game.lanZhanJi;
                    }
					var next=player.chooseButton([
                        '选择提炼的星石',
                        [list,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('selectButton',[1,num]);
                    'step 1'
                    for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='宝石'){
							target.addMark('_tiLian_r');
							player.changeZhanJi('r',-1);
						}else if(result.links[i]=='水晶'){
							target.addMark('_tiLian_b');
							player.changeZhanJi('b',-1);
                        }
                    }
                    'step 2'
                    if(player.countNengLiangAll()>0){
                        if(player.canBiShaShuiJing()){
                            player.removeBiShaShuiJing();
                        }
                    }
                }
            },
            touTianHuanRi:{
                type:'faShu',
                usable:1,
                enable:['chooseToUse','faShu'],
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
                            if(player.side==true){
                                return game.lanZhanJi.includes('宝石');
                            }else if(player.side==false){
                                return game.hongZhanJi.includes('宝石');
                            }
                        }
                        if(link=='huan'){
                            return true;
                        }
                    },
                    backup:function(links,player){
                        player.removeBiShaShuiJing();
                        if(links[0]=='tou'){
                            var next=get.copy(lib.skill['touTianHuanRi_tou']);
                        }else if(links[0]=='huan'){
                            var next=get.copy(lib.skill['touTianHuanRi_huan']);
                        }
						return next;
					},
                },
                subSkill:{
                    tou:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            var side=player.side;
                            player.changeZhanJi('r',-1,!side)
                            player.addZhanJi('r',1);
                            'step 1'
                            player.storage.all++;
                        }
                    },
                    huan:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            if(player.side==true){
                                var list=game.hongZhanJi.slice();
                            }else if(player.side==false){
                                var list=game.lanZhanJi.slice();
                            }
                            for(var i=0;i<list.length;i++){
                                if(list[i]=='水晶'){
                                    player.removeZhanJi('b',1);
                                    player.addZhanJi('r',1);
                                }
                            }
                            'step 1'
                            player.storage.all++;
                        }
                    }
                }

            },
            
            //圣枪骑士
            shengShengQiShi:{
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
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='shui');
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                prepare:'showCards',
                selectTarget:-1,
                filterTarget:true,
                content:function(){
                    target.changeZhiLiao(1);
                },
                contentAfter:function(){
                    player.storage.gongJi++;
                }
            },
            chengJie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.countCards('h',card=>get.type(card)=='faShu')) return false;
                    var players=game.players;
                    for(var i=0;i<players.length;i++){
                        if(players[i]==player) continue;
                        if(players[i].zhiLiao) return true;
                    }
                    return false;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                selectTarget:1,
				filterTarget:function(card,player,target){
                    if(target.zhiLiao<1) return false;
					return target!=player;
				},
                content:function(){
                    if(target.zhiLiao){
                        target.changeZhiLiao(-1);
                        player.changeZhiLiao(1);
                    } 
                },
                contentAfter:function(){
                    player.storage.gongJi++;
                }
            },
            shengJi:{
                trigger:{player:'useCardToTargeted'},
                forced:true,
                filter:function(event,player){
                    return get.type(event.card)=="gongJi"&&event.parent.shengJi!=false;
                },
                content:function(){
                    player.changeZhiLiao();
                }
            },
            tianQiang:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return get.type(event.card)=="gongJi"&&event.yingZhan!=true&&player.storage.tianQiang!=false&&player.zhiLiao>=2;
                },
                content:function(){
                    'step 0'
                    trigger.shengJi=false;
                    player.changeZhiLiao(-2);
                    'step 1'
                    player.addSkill('tianQiang_x');
                },
                subSkill:{
                    x:{
                        trigger:{player:'useCardToPlayer'},
                        forced:true,
                        content:function(){
                            'step 0'
                            trigger.parent.canYingZhan=false;
                            'step 1'
                            player.removeSkill('tianQiang_x')
                        }
                    },
                }

            },
            diQiang:{
                trigger:{player:'useCardToTargeted'},
                firstDo:true,
                filter:function(event,player){
                    if(player.zhiLiao<1) return false;
                    return get.type(event.card)=="gongJi"&&event.parent.yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    trigger.parent.shengJi=false;
                    'step 1'
                    var list=[];
                    var num=4;
                    for(var i=1;i<=player.zhiLiao;i++){
                        if(i<=num){
                            list.push(i);
                        }
                    }
                    player.chooseControl(list).set('prompt','选择移除的[治疗]数量').set('ai',function(){
                        return list.length-1;
                    });
                    'step 2'
                    var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.getParent().baseDamage+=zhiLiaonum;
						player.changeZhiLiao(-zhiLiaonum);
					}
                }
            },
            shengGuangQiYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.changeZhiLiao(2,5);
                    player.storage.tianQiang=false;
                    'step 2'
                    player.storage.gongJi++;
                },
                group:'shengGuangQiYu_tianQiang',
            },
            shengGuangQiYu_tianQiang:{
                trigger:{player:'phaseEnd'},
                forced:true,
                content:function(){
                    player.storage.tianQiang=true;
                }
            },

            //精灵射手
            yuanSuSheJi:{
                trigger:{player:'useCard1'},
                usable:1,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(get.xiBie(event.card)=='an') return false;
                    if(player.countCards('h')==0&&player.countCards('s',card=>card.hasGaintag('zhuFu'))==0) return false;
                    if(_status.connectMode) return true;
                    return player.countCards('h',card=>get.type(card)=='faShu')>0||player.getCards('s',card=>card.hasGaintag('zhuFu')).length>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    player.storage.yuanSuSheJi=trigger.card;
                    var str='弃置1张法术牌[展示]';
                    if(player.getCards('s',card=>card.hasGaintag('zhuFu')).length>0){
                        str+='或移除1个【祝福】'
                    }
                    var next=player.chooseCard('hs',function(card){
                        if(get.position(card)=='h'){
                            return get.type(card)=='faShu';
                        }else if(get.position(card)=='s'){
                            return card.hasGaintag('zhuFu');
                        }
                    });
                    next.set('prompt',get.prompt('yuanSuSheJi'));
                    next.set('prompt2',lib.translate.yuanSuSheJi_info);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        if(get.position(result.cards[0])=='h'){
                            var flag=true;
                        }
                        player.discard(result.cards);
                        if(flag){
                            player.showCards(result.cards);
                        }
                        switch(get.xiBie(player.storage.yuanSuSheJi)){
                            case 'huo':
                                player.addTempSkill('yuanSuSheJi_huo');
                                break;
                            case'shui':
                                player.addTempSkill('yuanSuSheJi_shui');
                                break;
                            case 'feng':
                                player.addTempSkill('yuanSuSheJi_feng');
                                break;
                            case 'lei':
                                player.addTempSkill('yuanSuSheJi_lei');
                                break;
                            case 'di':
                                player.addTempSkill('yuanSuSheJi_di');
                                break;
                        }
                    }else{
                        event.finish();
                    }

                },
                subSkill:{
                    huo:{
                        trigger:{player:'useCard'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi;
                        },
                        content:function(){
                            trigger.baseDamage++;
                        }
                    },
                    shui:{
                        trigger:{player:'useCardToTargeted'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi&&event.parent.yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            player.chooseTarget('目标角色+1[治疗]',true);
                            'step 1'
                            result.targets[0].changeZhiLiao(1);
                        }
                    },
                    feng:{
                        trigger:{player:'useCardAfter'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi;
                        },
                        content:function(){
                            player.storage.gongJi++;
                        }
                    },
                    lei:{
                        trigger:{player:'useCardToPlayer'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi;
                        },
                        content:function(){
                            trigger.parent.canYingZhan=false;
                        }
                    },
                    di:{
                        trigger:{player:'useCardToTargeted'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi&&event.parent.yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            var next=player.chooseTarget('对目标角色造成1点法术伤害',true);
                            next.ai=function(target){
                                return target.side!=player.side;
                            }
                            'step 1'
                            result.targets[0].damageFaShu(1,player);
                        }
                    }
                }

            },
            dongWuHuoBan:{
                trigger:{source:'damageAfter'},
                filter:function(event,player){
                    return _status.currentPhase==player;
                },
                content:function(){
                    'step 0'
                    event.trigger('dongWuHuoBan');
                    'step 1'
                    player.draw(1);
                    'step 2'
                    player.chooseToDiscard('h',true,1);
                }
            },
            jingLingMiYi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&!player.isLinked(); 
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                    'step 1'
                    var cards=get.cards(3)
                    player.loseToSpecial(cards,'zhuFu',player);
                    player.markSkill('zhuFu');
                },
                group:'jingLingMiYi_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            }); 
                            if(cards.length>0){
                                return false;
                            }
                            return true;
                        },
                        content:function(){
                           'step 0'
                           player.chongZhi();
                           player.unmarkSkill('zhuFu');
                           player.chooseTarget('对目标角色造成2点法术伤害',true);
                           'step 1'
                           result.targets[0].damageFaShu(2,player); 
                        }
                    }
                }
            },
            chongWuQiangHua:{
                trigger:{player:'dongWuHuoBan'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget('目标角色摸1张牌[强制]，弃1张牌',true);
                    'step 2'
                    result.targets[0].draw(1);
                    result.targets[0].chooseToDiscard('h',true,1);
                    'step 3'
                    trigger.finish();
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
            },

            //瘟疫法师
            buXiu:{
                group:['buXiu_1','buXiu_2'],
                subSkill:{
                    1:{
                        trigger:{player:'useSkillEnd'},
                        filter:function(event,player){
                            if(event.skill=='siWangZhiChu_backup') return false;
                            if(get.info(event.skill).type!='faShu') return false;
                            return true;
                        },
                        content:function(){
                            player.changeZhiLiao(1);
                        }
                    },
                    2:{
                        trigger:{player:'useCardEnd'},
                        filter:function(event,player){
                            if(event.parent.name!='chooseToUse'&&event.parent.name!='faShu') return false;
                            if(get.type(event.card)!='faShu') return false;
                            return true;
                        },
                        content:function(){
                            player.changeZhiLiao(1);
                        }
                    }
                }
            },
            shengDu:{
                trigger:{player:'zhiLiao'},
                firstDo:true,
                filter:function(event,player){
                    return get.type(event.card)=='gongJi';
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
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='di');
                },
                prepare:'showCards',
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                content:function(){
                    target.damageFaShu(1,player);
                },
            },
            siWangZhiChu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.zhiLiao<2) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var type=get.xiBie(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return false;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog('死亡之触：移除a点[治疗]','hidden');
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
                            selectTarget:1,
                            filterTarget:true,
                            selectCard:[2,Infinity],
                            prepare:'showCards',
                            filterCard:function(card){
                                if(!ui.selected.cards.length){
                                    return true;
                                }
                                var xiBie=get.xiBie(card);
                                if(get.xiBie(ui.selected.cards[0])!=xiBie){
                                    return false;
                                }
                                return true;
                            },
                            complexCard:true,
							content:function(){
								'step 0'
								event.links=lib.skill.siWangZhiChu_backup.links;
                                event.a=event.links[0];
                                event.b=cards.length;
                                player.changeZhiLiao(-event.a);
                                'step 1'
                                target.damageFaShu(event.a+event.b-3,player);
							},
						}
					},
                    prompt:function(links,player){
						return '弃置b张同系牌[展示]至少2张，对目标角色造成(a+b-3)点伤害。';
					},
                }
            },
            juDuXinXing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
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
                    target.damageFaShu(2,player);
                },
                contentAfter:function(){
                    player.changeZhiLiao(1);
                }
            },
            
            //魔剑士
            xiuLuoLianZhan:{
                usable:1,
                trigger:{player:"useCardAfter"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)=='gongJi'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(player){
					var str='修罗连斩：火系攻击行动';
					var next=player.gongJi('h',function(card,player,event){
                        if(get.xiBie(card)!='huo') return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					},str);
                }
            },
            anYingNingJu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return !player.isLinked(); 
                },
                content:function(){
                    'step 0'
                    player.damageFaShu(1,player);
                    'step 1'
                    player.hengZhi();                 
                },
                group:'anYingNingJu_chongZhi',
                subSkill:{
                    chongZhi:{
                        direct:true,
                        priority:1,
                        trigger:{player:'phaseUseBegin'},
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            if(player.isLinked()) player.link();
                        }
                    }
                }
            },
            anYingZhiLi:{
                forced:true,
                firstDo:true,
                trigger:{player:'useCardToTargeted'},
				filter:function(event,player){
                    if(!player.isLinked()) return false;
					if(event.card&&get.type(event.card)=='gongJi'){
						return true;
					}
					return false;
				},
				content:function(){
					trigger.getParent().baseDamage++;
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
                enable:['chooseToUse','faShu'],
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectTarget:1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    return player.countCards('h',card=>get.type(card)=='faShu')>=2;
                },
                prepare:'showCards',
                content:function(){
                    'step 0'
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else{
                        var list=game.lanZhanJi;
                    }
                    var next=player.chooseButton([
                        '是否额外移除2个星石',
                        [list,'tdnodes'],
                    ]);
                    next.set('selectButton',[2,2]);
                    'step 1'
                    target.damageFaShu(2,player);
                    if(result.bool){
                        for(var i=0;i<result.links.length;i++){
                            if(result.links[i]=='宝石'){
                                player.changeZhanJi('r',-1);
                            }else if(result.links[i]=='水晶'){
                                player.changeZhanJi('b',-1);
                            }
                        }
                        player.chongZhi();
                        player.addNengLiang('r');
                    }
                }
            },
            huangQaunZhenChan:{
                usable:1,
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    return true;
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.storage.huangQaunZhenChan=trigger.card;
                    trigger.canYingZhan=false;
                    player.addTempSkill('huangQaunZhenChan_mingZhong');

                },
                subSkill:{
                    mingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        forced:true,
                        filter:function(event,player){
                            if(event.card!=player.storage.huangQaunZhenChan) return false;
                            return true;
                        },
                        content:function(){
                            var num=player.getHandcardLimit();
                            player.drawTo(num);
                            player.chooseToDiscard('h',true,2);
                        }
                    }
                }
            },
            
            //血色剑灵
            xueSeJingJi:{
                trigger:{player:'useCardToTargeted'},
                forced:true,
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('xianXue');
                }
            },
            chiSeYiShan:{
                trigger:{player:'useCardAfter'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(player.countZhiShiWu('xianXue')<1) return false;
                    return true;
                },
                content:function(){
                    player.removeZhiShiWu('xianXue');
                    player.damageFaShu(2,player);
                    player.storage.gongJi++;
                },
                check:function(event,player){
                    if(player.side==true){
                        var shiQi=game.hongShiQi;
                    }else if(player.side==false){
                        var shiQi=game.lanShiQi;
                    }
                    return shiQi>5;
                }

            },
            xueRanQiangWei:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('xianXue')>=2;
                },
				selectTarget:1,
                filterTarget:true,
                contentBefore:function(){
                    player.removeZhiShiWu('xianXue',2);
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('将我方角色[能量区]的1[水晶]翻面为[宝石]',true,function(card,player,target){
                        return player.side==target.side;
                    })
                    target.changeZhiLiao(-2);
                    'step 1'
                    if(result.bool){
                        if(result.targets[0].countNengLiang('b')){
                            result.targets[0].removeNengLiang('b');
                            result.targets[0].addNengLiang('r');
                        }
                    }
                },
                contentAfter:function(){
                    'step 0'
                    if(player.hasMark('xueQiangWeiTingYuan')){
                        event.flag=true;
                        event.num=0;
                        event.targets=game.filterPlayer();
                    }
                    'step 1'
                    if(event.flag){
                        if(event.num<event.targets.length){
                            event.targets[event.num].damageFaShu(1,player);
                            event.num++;
                            event.redo();
					    }
                    }
                }
            },
            xueQiPingZhang:{
                trigger:{player:'damageBegin'},
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
                    })
                    'step 2'
                    if(result.bool){
                        result.targets[0].damageFaShu(1,player);
                    }
                }
            },
            xueQiangWeiTingYuan:{
                intro:{
                    name:'血蔷薇庭院',
                    content:'mark',
                },
                markimage:'image/card/xueQiangWeiTingYuan.png',
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    return player.hasMark('xueQiangWeiTingYuan');
                },
                content:function(){
                    player.removeZhiShiWu('xueQiangWeiTingYuan');
                }
            },
            sanHuaLunWu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    var list=["[水晶]将【血蔷薇庭院】放置于场上，你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>","[宝石]将【血蔷薇庭院】放置于场上，无视你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>上限为你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>但你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>数最高为4，你弃到4张牌。"];
                    var choices=['选项一'];
                    if(player.canBiShaBaoShi()){
                        choices.push('选项二');
                    }
                    player.chooseControl(choices).set('choiceList',list);
                    'step 1'
                    if(result.control=='选项一'){
                        player.removeBiShaShuiJing();
                        player.addZhiShiWu('xueQiangWeiTingYuan');
                        player.addZhiShiWu('xianXue',2);
                    }else if(result.control=='选项二'){
                        player.removeBiShaBaoShi();
                        player.addZhiShiWu('xueQiangWeiTingYuan');
                        player.addZhiShiWu('xianXue',2,4);
                        if(player.countCards('h')>4){
                            var num=player.countCards('h')-4;
                            player.chooseToDiscard('h',true,num);
                        }
                    }
                },
            },
            xianXue:{
                intro:{
                    name:'鲜血',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //祈祷师
            guangHuiXinYang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                selectTarget:1,
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
                    player.addZhanJi('r',1);
                    'step 3'
                    target.changeZhiLiao(1);
                }
            },
            heiAnZuZhou:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    target.damageFaShu(2,player);
                    'step 2'
                    player.damageFaShu(2,player);
                }
            },
            weiLiCiFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>card.hasNature('weiLiCiFu'))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return card.hasNature('weiLiCiFu');
                },
                useCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    if(target.hasExpansions('weiLiCiFu_xiaoGuo')) return false;
                    return target.side==player.side;
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
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            if(event.card!='gongJi') return false;
                            return player.hasExpansions('weiLiCiFu_xiaoGuo');
                        },
                        content:function(){
                            player.loseToDiscardpile(player.getExpansions('weiLiCiFu_xiaoGuo'));
                            trigger.parent.baseDamage+=2;
                            player.removeSkill('weiLiCiFu_xiaoGuo');
                        }
                    }
                }
            },
            xunJieCiFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>card.hasNature('xunJieCiFu'))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return card.hasNature('xunJieCiFu');
                },
                useCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    if(target.hasExpansions('xunJieCiFu_xiaoGuo')) return false;
                    return target.side==player.side;
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
                        trigger:{player:['useCardAfter','useSkillAfter']},
                        filter:function(event,player){
                            if(!player.hasExpansions('xunJieCiFu_xiaoGuo')) return false;
                            if(event.name=='useCard'){
                                return !(event.parent.name=='chooseToUse_qiTa'||event.parent.name=='chooseToUse_yingZhan');
                            }else if(event.name=='useSkill'){
                                var info=get.info(event.skill);
                                return info.type=='faShu';
                            }
                        },
                        content:function(){
                            player.loseToDiscardpile(player.getExpansions('xunJieCiFu_xiaoGuo'));
                            player.storage.gongJi++;
                            player.removeSkill('xunJieCiFu_xiaoGuo');
                        }
                    }
                }
            },
            qiDao:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                },
                group:'qiDao_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        forced:true,
                        trigger:{player:'useCard'},
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(get.type(event.card)!='gongJi') return false;
                            if(event.targets.length==0) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            player.addZhiShiWu('qiDaoFuWen',2);
                        }
                    }
                }
            },
            faLiChaoXi:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                usable:1,
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(event.name=='useCard'){
                        return get.type(event.card)=='faShu'&&event.parent.name!='chooseToUse_qiTa';
                    }else if(event.name=='useSkill'){
                        var info=get.info(event.skill);
                        return info.type=='faShu';
                    }
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    player.storage.faShu++;
                }
            },
            qiDaoFuWen:{
                intro:{
                    name:'祈祷符文',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //红莲骑士
            xingHongShengYue:{
                usable:1,
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    if(event.yingZhan==true) return false;
                    return true;
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            xingHongXinYang:{
                trigger:{player:'zhiLiao'},
                firstDo:true,
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
                trigger:{player:'phaseUseBegin'},
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
                    player.damageFaShu(result.control,player);
                    player.storage.xueXingDaoYan=result.control;
                    'step 2'
                    event.links=[player.storage.xueXingDaoYan];
                    player.chooseTarget(function(card,player,target){
                        if(target==player) return false;
                        return target.side==player.side;
                    },[1,2],true,'选择1~2个目标队友');
                    'step 3'
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.links[0]);
                        event.goto(7);
                    }
                    'step 4'
                    result.targets.sortBySeat();
                    event.target=result.targets[0];
                    var list=[];
                    for(var i=1;i<=event.links[0]-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.target);
                    var str=name+'获得几点治疗';
                    player.chooseControl(list).set('prompt',str);
                    'step 5'
                    event.target.changeZhiLiao(result.control);
                    event.links[0]-=result.control;
                    'step 6'
                    event.target=result.targets[1];
                    event.target.changeZhiLiao(event.links[0]);
                    'step 7'
                    player.addZhiShiWu('xueYin');
                },
            },
            shaLuShengYan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    if(event.yingZhan==true) return false;
                    return player.countZhiShiWu('xueYin')>0;
                },
                content:function(){
                    player.removeZhiShiWu('xueYin');
                    player.damageFaShu(4,player);
                    trigger.parent.baseDamage+=2;
                }
            },
            reXueFeiTeng:{
                forced:true,
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    if(event.parent.player!=player) return false;
                    if(event.num>=0) return false;
                    if(event.yuanYin!='damage') return false;
                    return true;
                },
                content:function(){
                    player.hengZhi();
                },
                group:['reXueFeiTeng_xiaoGuo','reXueFeiTeng_chongZhi'],
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'damageBegin'},
                        forced:true,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            return true;
                        },
                        content:function(){
                            trigger.shiQiXiaJiang=false;
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.chongZhi();
                            player.changeZhiLiao(2);
                        }
                    }
                }
            },
            jieJiaoJieZao:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(!player.isLinked()) return false;
                    if(event.name=='useCard'){
                        return !(event.parent.name=='chooseToUse_qiTa'||event.parent.name=='chooseToUse_yingZhan');
                    }else if(event.name=='useSkill'){
                        var info=get.info(event.skill);
                        return info.type=='faShu';
                    }
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    player.storage.all++;
                }
                
            },
            xingHongShiZi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(player.countZhiShiWu('xueYin')<=0) return false;
                    if(player.countCards('h',card=>get.type(card)=='faShu')<2) return false;
                    return true;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                selectTarget:1,
                filterTarget:true,
                contentBefore:function(){
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('xueYin');
                },
                content:function(){
                    'step 0'
                    player.damageFaShu(4,player);
                    'step 1'
                    target.damageFaShu(3,player);
                }
            },
            xueYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                markimage:'image/card/hong.png',
            },

            //英灵人形
            zhanWenZhangWo:{
                trigger:{global:'enterGame'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('zhanWen',3);
                }
            },
            nuHuoYaZhi:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.countZhiShiWu('zhanWen')>=1;
                },
                content:function(){
                    player.removeZhiShiWu('zhanWen');
                    player.addZhiShiWu('moWen'); 
                    trigger.cancel();
                }
            },
            zhanWenSuiJi:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    if(player.countZhiShiWu('zhanWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    if(!player.countCards('h')>1) return false;
                    if(_status.connectMode) return true;
                    var cards=player.getCards('h');
                    var dict={};
                    for(var i=0;i<cards.length;i++){
                        var xiBie=get.xiBie(cards[i]);
                        dict[xiBie]=(dict[xiBie]||0)+1;
                    }
                    for(var xiBie in dict){
                        if(dict[xiBie]>1) return true;
                    }
                    return false;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',[2,Infinity],function(card){
                        if(!ui.selected.cards.length) return true;
                        return get.xiBie(card)==get.xiBie(ui.selected.cards[0])
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('zhanWenSuiJi'));
                    next.set('prompt2',lib.translate.zhanWenSuiJi_info);

                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.target);
                        player.removeZhiShiWu('zhanWen');
                        player.addZhiShiWu('moWen');
                        player.showCards(result.cards);
                        event.num=result.cards.length-1;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(player.isLinked()){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('zhanWen');i++){
                            list.push(i);
                        }
                        player.chooseControl(list).set('prompt','额外翻转战纹数量');
                    }else{
                        event.goto(4);
                    }
                    'step 3'
                    if(result.control){
                        player.removeZhiShiWu('zhanWen',result.control);
                        player.addZhiShiWu('moWen',result.control);
                        event.num+=result.control;
                    }
                    'step 4'
                    trigger.parent.baseDamage+=event.num;
                }
            },
            moWenRongHe:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(player.countZhiShiWu('moWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    if(!player.countCards('h')>1) return false;
                    if(_status.connectMode) return true;
                    var cards=player.getCards('h');
                    var dict={};
                    for(var i=0;i<cards.length;i++){
                        var xiBie=get.xiBie(cards[i]);
                        dict[xiBie]=(dict[xiBie]||0)+1;
                    }
                    return Object.keys(dict).length>1;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',[2,Infinity],function(card){
                        if(!ui.selected.cards.length) return true;
                        for(var i=0;i<ui.selected.cards.length;i++){
                            if(get.xiBie(ui.selected.cards[i])==get.xiBie(card)) return false;
                        }
                        return true;
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('moWenRongHe'));
                    next.set('prompt2',lib.translate.moWenRongHe_info);

                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.player);
                        player.removeZhiShiWu('moWen');
                        player.addZhiShiWu('zhanWen');
                        player.showCards(result.cards);
                        event.num=result.cards.length-1;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(player.isLinked()){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('moWen');i++){
                            list.push(i);
                        }
                        player.chooseControl(list).set('prompt','额外翻转魔纹数量');
                    }else{
                        event.goto(4);
                    }
                    'step 3'
                    if(result.control){
                        player.removeZhiShiWu('moWen',result.control);
                        player.addZhiShiWu('zhanWen',result.control);
                        event.num+=result.control;
                    }
                    'step 4'
                    trigger.player.damageFaShu(event.num,player);
                    trigger.cancel();
                }
            },
            fuWenGaiZao:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
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
                    player.removeZhiShiWu('zhanWen',player.countZhiShiWu('zhanWen'));
                    player.removeZhiShiWu('moWen',player.countZhiShiWu('moWen'));
                    'step 4'
                    var list=[];
                    for(var i=0;i<=3;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','选择战纹数量');
                    'step 5'
                    if(result.control>0){
                        player.addZhiShiWu('zhanWen',result.control);
                    }
                    if(3-result.control>0){
                        player.addZhiShiWu('moWen',3-result.control);
                    }
                },
                group:['fuWenGaiZao_xiaoGuo','fuWenGaiZao_chongZhi'],
                subSkill:{
                    xiaoGuo:{
                        mod:{
                            maxHandcard:function(player,num){
                                if(player.isLinked()) return num+1;
                            }
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            var num=player.needsToDiscard();
                            if(num>0){
                                player.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
                            }
                        }
                    },
                }
            },
            shuangChongHuiXiang:{
                usable:1,
                trigger:{source:'damageBegin'},
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
                    }).set('trigger_player',trigger.player);
                    'step 3'
                    if(result.bool){
                        var next=result.targets[0].damage(event.num,player);
                        next.set('faShu',true);
                        next.set('shiQiXiaJiang',false);
                    }
                }
            },
            zhanWen:{
                marktext:'战',
                intro:{
                    name:'战纹',
                    content:'mark',
                },
                markimage:'image/card/zhanWen.png',
            },
            moWen:{
                marktext:'魔',
                intro:{
                    name:'魔纹',
                    content:'mark',
                },
                markimage:'image/card/moWen.png',
            },

            //神官
            shenShengQiShi:{
                trigger:{player:'useSkillEnd'},
                filter:function(event,player){
                    var info=get.info(event.skill);
                    return info.type=='teShu';
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            shenShengQiFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='faShu')>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                content:function(){
                    player.changeZhiLiao(2);
                }
            },
            shuiZhiShenLi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='shui')>=1;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                prepare:'showCards',
                selectTarget:1,
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
                    target.changeZhiLiao(1);
                }
            },
            shengShiShouHu:{
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+4;
                    }
                },
                trigger:{player:'zhiLiao'},
                firstDo:true,
                forced:true,
                content:function(){
                    'step 0'
                    var list=[0,1];
                    player.chooseControl(list).set('prompt','使用的治疗数量').set('ai',function(){return list.length-1;});
                    'step 1'
                    var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.parent.num-=zhiLiaonum;
						game.log(player,'的治疗抵挡了'+zhiLiaonum+'点伤害');
						player.changeZhiLiao(-zhiLiaonum).type='damage';
					}
                    'step 2'
                    trigger.cancel();
                }
                
            },
            shenShengQiYue:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','转移[治疗]数量');
                    'step 1'
                    event.zhiLiaonum=result.control;
                    player.chooseTarget('目标队友+'+event.zhiLiaonum+'[治疗]',true,function(card,player,target){
                        return target.side==player.side&&target!=player;
                    });
                    'step 2'
                    var target=result.targets[0];
					if(event.zhiLiaonum>0){
						player.changeZhiLiao(-event.zhiLiaonum);
                        target.changeZhiLiao(event.zhiLiaonum,4);
					}
                }
                
            },
            shenShengLingYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.chooseToDiscard(2,true,'h');
                    'step 1'
                    var choiceList=["<span class='tiaoJian'>(移除你的1[治疗])</span>对目标角色造成2点法术伤害③","你+2[治疗]，目标队友+1[治疗]"];
                    var list=['选项二'];
                    if(player.zhiLiao>0){
                        list.unshift('选项一');
                    }
                    player.chooseControl(list).set('prompt','神圣领域').set('choiceList',choiceList);
                    'step 2'
                    if(result.control=='选项一'){
                        event.goto(3);
                    }else{
                        event.goto(5);
                    }
                    'step 3'
                    player.changeZhiLiao(-1);
                    player.chooseTarget('对目标角色造成2点法术伤害③',true);
                    'step 4'
                    if(result.bool){
                        result.targets[0].damageFaShu(2,player);
                        event.finish();
                    }
                    'step 5'
                    player.changeZhiLiao(2);
                    player.chooseTarget('目标队友+1[治疗]',true,function(card,player,target){
                        return target.side==player.side&&target!=player;
                    });
                    'step 6'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1);
                        event.finish(); 
                    }
                },       
            },

            //阴阳师
            shiShenJiangLin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var type=get.mingGe(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return false;
                },
                prepare:'showCards',
                selectCard:2,
                filterCard:function(card,player){
                    if(ui.selected.cards.length==0) return true;
                    if(get.mingGe(card)==get.mingGe(ui.selected.cards[0])) return true;
                    return false;
                },
                complexCard:true,
                content:function(){
                    player.hengZhi();
                    player.addZhiShiWu('guiHuo');
                    player.storage.gongJi++;
                }
            },
            yinYangZhanHuan:{
                enable:['chooseToUse_yingZhan'],
                filter:function(event,player){
                    var mingGe=get.mingGe(event.trigger_card);
                    return player.countCards('h',card=>get.mingGe(card)==mingGe&&get.type(card)=='gongJi')>0;
                },
                filterCard:function(card,player,event){
                    event=event||_status.event;
                    var mingGe=get.mingGe(event.trigger_card);
                    return get.mingGe(card)==mingGe&&get.type(card)=='gongJi';
                },
                position:'h',
                viewAs:function(cards,player){
                    var event=_status.event;
					return {name:get.name(event.trigger_card),xiBie:get.xiBie(event.trigger_card)}
				},
                group:['yinYangZhanHuan_xiaoGuo'],
            },
            yinYangZhanHuan_xiaoGuo:{
                trigger:{player:'useCard1'},
                firstDo:true,
                direct:true,
                filter:function(event,player){
					if(event.skill!='yinYangZhanHuan') return false;
					return true;
				},
                content:function(){
                    'step 0'
                    player.addZhiShiWu('guiHuo');
                    game.setXiBie(trigger.card,get.xiBie(trigger.cards[0]));
                    console.log(trigger);
                    'step 1'
                    event.player=player;
                    event.trigger('yinYangZhanHuan');
                    'step 2'
                    if(player.isLinked()){
                        player.chongZhi();
                    }else{
                        event.finish();
                    }
                    'step 3'
                    trigger.baseDamage=player.countZhiShiWu('guiHuo');
                }
            },
            shiShenZhuanHuan:{
                trigger:{player:'yinYangZhanHuan'},
                content:function(){
                    player.draw(1);
                    player.addZhiShiWu('guiHuo');
                }
            },
            heiAnJiLi:{
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    return player.countZhiShiWu('guiHuo')>=3;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('guiHuo',player.countZhiShiWu('guiHuo'));
                    'step 1'
                    player.chooseTarget('对目标角色造成2点法术伤害③',true);
                    'step 2'
                    if(result.bool){
                        result.targets[0].damageFaShu(2,player);
                    }
                }
            },
            shiShenZhouShu:{
                trigger:{global:'useCardToTarget'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(get.xiBie(event.card)=='an') return false;
                    if(event.target.side!=player.side) return false;
                    if(event.target==player) return false;
                    if(event.parent.canYingZhan==false) return false;
                    if(!player.isLinked()) return false;
                    if(player.side==true){
                        if(game.hongZhanJi.length<2) return false;
                        const count=game.hongZhanJi.filter(xingShi=>xingShi=='宝石');
                        if(count==0) return false;
                    }else if(player.side==false){
                        if(game.lanZhanJi.length<2) return false;
                        const count=game.lanZhanJi.filter(xingShi=>xingShi=='宝石');
                        if(count==0) return false;
                    }
                    return true;
                },
                direct:true,
                content:function(){
					'step 0'
					event.source=trigger.player;
					event.yingZhan=trigger.parent.yingZhan;
					var name=get.translation(event.source);
					var propmt=`受到${name}的`;
					if(event.yingZhan){
						propmt+='应战攻击，';
					}else{
						propmt+='主动攻击，';
					}
					propmt+=get.translation(get.name(trigger.card));
					var next=player.chooseToUse_yingZhan();
                    next.set('filterCard',function(card,player,event){
                        if(get.type(card)!='gongJi') return false;
                        if(card.name!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.trigger_card)) return false;
						return lib.filter.cardEnabled(card,player,'forceEnable');
					});
					next.set('filterTarget',function(card,player,target){
						if(ui.selected.cards.length){
							if(get.type(ui.selected.cards[0])=='gongJi'){
								return target!=_status.event.trigger_player&&target.side!=player.side;
							}else{
								return false;
							}
						}
                    });
					next.set('trigger_card',trigger.card);
                    next.set('trigger_player',event.source);
                    next.set('yingZhan',true);
					next.set('canYingZhan',trigger.parent.canYingZhan);
					next.set('canShengGuang',trigger.parent.canShengGuang);
                    next.set('prompt',get.prompt('shiShenZhouShu')+propmt);
                    next.set('prompt2',lib.translate.shiShenZhouShu_info);
					'step 1'
                    if(result.bool){
                        trigger.getParent().targets.remove(trigger.target);
                        trigger.cancel();
                    }
                },
                group:'shiShenZhouShu_tiaoJian',
                subSkill:{
                    tiaoJian:{
                        trigger:{player:'useCard1'},
                        direct:true,
                        firstDo:true,
                        priority:10,
                        filter:function(event,player){
                            if(event.parent.parent.name!='shiShenZhouShu') return false;
                            return true;
                        },
                        firstDo:true,
                        content:function(){
                            'step 0'
                            player.logSkill(event.name);
                            if(player.side==true){
                                var list=game.hongZhanJi;
                            }else{
                                var list=game.lanZhanJi;
                            }
                            var next=player.chooseButton([
                                '移除1[宝石]1[水晶]',
                                [list,'tdnodes'],
                            ]);
                            next.set('forced',true);
                            next.set('selectButton',2);
                            next.set('filterOk',function(){
                                console.log(ui.selected.buttons);
                                for(var i in ui.selected.buttons){
                                    if(ui.selected.buttons[i].link=='宝石') return true;
                                }
                            });
                            'step 1'
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='宝石'){
                                    player.changeZhanJi('r',-1);
                                }else if(result.links[i]=='水晶'){
                                    player.changeZhanJi('b',-1);
                                }
                            }
                        }
                    }
                }
            },
            shengMingJieJie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('生命结界','hidden');
                        var list=[['1',"目标队友+1[宝石]并+1[治疗]；然后对自己造成X点法术伤害③，X为你的<span class='hong'>【</span>鬼火<span class='hong'>】</span>数。(若X为3)本次法术伤害③不会造成我方士气下降"],['2',"<span class='tiaoJian'>(仅【式神形态】下，弃2张命格相同的手牌[展示])</span>[重置]脱离【式神形态】目标队友弃1张牌"]]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            if(!player.isLinked()) return false;
                            var dict={};
                            var hs=player.getCards('h');
                            for(var i=0;i<hs.length;i++){
                                var type=get.mingGe(hs[i]);
                                if(!dict[type]) dict[type]=0;
                                dict[type]++;
                            }
                            for(var i in dict){
                                if(dict[i]>1){
                                    return true;
                                }
                            }
                            return false;
                        }
                    },
                    backup:function(links,player){
                        player.removeBiShaShuiJing();
                        player.addZhiShiWu('guiHuo');
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
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        content:function(){
                            'step 0'
                            target.addNengLiang('r');
                            target.changeZhiLiao(1);
                            'step 1'
                            var num=player.countZhiShiWu('guiHuo');
                            var next=player.damage(num,player);
                            next.set('faShu',true);
                            if(num==3){
                                next.set('shiQiXiaJiang',false);
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
                            if(ui.selected.cards.length==0) return true;
                            if(get.mingGe(card)==get.mingGe(ui.selected.cards[0])) return true;
                            return false;
                        },
                        complexCard:true,
                        prepare:'showCards',
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            target.chooseToDiscard(1,true);
                        }
                    }
                }
            },
            guiHuo:{
                intro:{
                    name:'鬼火',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //苍炎魔女
            cangYanFaDian:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='huo')>0;
                },
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    player.damageFaShu(2,player);
                    'step 1'
                    target.damageFaShu(2,player);
                }
            },
            tianHuoDianKong:{
                type:'faShu',
                priority:1,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.countZhiShiWu('chongSheng')<1&&!player.isLinked()) return false;
                    return player.countCards('h',card=>get.xiBie(card)=='huo')>1;
                },
                selectCard:2,
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectTarget:1,
                filterTarget:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    if(!player.isLinked()){
                        player.removeZhiShiWu('chongSheng');
                    }
                    event.num=3;
                    if(player.side==true){
                        var player_shiQi=game.hongShiQi;
                    }else{
                        var player_shiQi=game.lanShiQi;
                    }
                    if(target.side==true){
                        var target_shiQi=game.hongShiQi;
                    }else{
                        var target_shiQi=game.lanShiQi;
                    }
                    if(player_shiQi<target_shiQi){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                    'step 2'
                    player.damageFaShu(event.num,player);
                }
            },
            moNvZhiNu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return player.countCards('h')<4;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addSkill('moNvZhiNu_xiBie');
                    var list=[0,1,2];
                    player.chooseControl(list).set('prompt','魔女之怒：摸几张牌');
                    'step 1'
                    if(result.control>0){
                        player.draw(result.control);
                    }
                    'step 2'
                    player.qiPai();
                },
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isLinked()){
                            return num+player.countZhiShiWu('chongSheng')-2;
                        }
                    },
                },
                group:'moNvZhiNu_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseUseBefore'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.chongZhi();
                            player.removeSkill('moNvZhiNu_xiBie');
                        }
                    },
                    xiBie:{
                        mod:{
                            xiBie:function(card,xiBie,owner){
                                if(get.type(card)!='gongJi') return;
                                if(xiBie=='an') return;
                                if(xiBie=='shui') return;
                                return 'huo';
                            }
                        }
                    }
                }
            },
            tiShenWanOu:{
                trigger:{player:'damageBegin'},
                filter:function(event,player){
                    return get.is.gongJiShangHai(event)&&player.countCards('h')>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',card=>get.type(card)=='faShu');
                    next.set('prompt',get.prompt('tiShenWanOu'));
                    next.set('prompt2',lib.translate.tiShenWanOu_info);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.showCards(result.cards);
                        player.chooseTarget('目标队友摸1张牌',true,function(card,player,target){
                            return target!=player&&target.side==player.side;
                        });
                    }else{
                        event.finish();
                    }
                    'step 2'
                    result.targets[0].draw(1);
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
                enable:['chooseToUse','faShu'],
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
                    target.damageFaShu(1,player);
                    'step 1'
                    player.damageFaShu(1,player);
                    'step 2'
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,player.countCards('h')-3);
                    }
                }
            },
            moNengFanZhuan:{
                trigger:{player:'damageBegin'},
                direct:true,
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.countCards('h')>1;
                },
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',[2,3],card=>get.type(card)=='faShu');
                    next.set('prompt',get.prompt('moNengFanZhuan'));
                    next.set('prompt2',lib.translate.moNengFanZhuan_info);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        event.num=result.cards.length-1;
                        player.showCards(result.cards);
                        player.chooseTarget(true,function(card,player,target){
                            return target.side!=player.side;
                        });
                    }else{
                        event.finish();
                    }
                    'step 2'
                    result.targets[0].damageFaShu(event.num,player);
                }

            },
            chongSheng:{
                intro:{
                    content:'mark',
                    name:'重生',
                    max:4,
                },
                markimage:'image/card/hong.png',

            },
            
		},
		
		translate:{
            //角色排序
            '3星':'3星',
            '3.5星':'3.5星',
            '4星':'4星',
            '4.5星':'4.5星',
            '5星':'5星',
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
            zhanDouFaShi:"战斗法师",
            xingZhuiNvWu:"星坠巫女",
            shengTingJianChaShi:"圣庭监察士",
            lieWuRen:"猎巫人",
            shengDianQiShi:"圣殿骑士",
            yuanChuZhiGong:"原初之弓",


            
            
            //风之剑圣
            fengNuZhuiJi:'[响应]风怒追击[回合限定]',
            fengNuZhuiJi_info:"<span class='tiaoJian'>(攻击行动结束后发动)</span>额外+1风系攻击行动",
            shengJian:'[被动]圣剑',
            shengJian_info:"若你的主动攻击为本次行动阶段的第3次攻击行动，则此攻击强制命中。本次攻击行动结束时，你摸X张牌，弃X张牌（X<4）。",
            lieFengJi:"(独)[响应]烈风技",
            lieFengJi_info:"<span class='tiaoJian'>(攻击的目标拥有圣盾时发动)</span>无视对手圣盾的效果,且此攻击对手无法应战。",
            jiFengJi:"(独)[响应]疾风技",
            jiFengJi_info:"<span class='tiaoJian'>(作为主动攻击打出后发动)</span>额外+1攻击行动。",
            jianYing:"[响应]剑影[回合限定]",
            jianYing_info:"[水晶]<span class='tiaoJian'>(攻击行动结束后发动)</span>额外+1攻击行动。",

            //狂战士
            kuangHua:"[被动]狂化",
            kuangHua_info:"你发动的所有攻击伤害额外+1；<span class='tiaoJian'>(攻击命中时②，若你的手牌数>3)</span>本次攻击伤害额外+1。",
            xueYingKuangDao:"(独)[响应]血影狂刀",
            xueYingKuangDao_info:"<span class='tiaoJian'>(作为主动攻击打出时发动)</span><br>·若命中手牌为2的对手②，本次攻击伤害额外+2；<br>·若命中手牌为3的对手②，本次攻击伤害额外+1。",
            xueXingPaoXiao:"(独)[响应]血腥咆哮",
            xueXingPaoXiao_info:'<span class="tiaoJian">(作为主动攻击打出时发动)</span>若攻击的目标拥有的治疗为2，则本次攻击强制命中。',
            siLie:"撕裂",
            siLie_info:"[宝石]<span class='tiaoJian'>(攻击命中后发动②)</span>本次攻击伤害额外+2。",

            //圣女
            bingShuangDaoYan:"[被动]冰霜祷言",
            bingShuangDaoYan_info:"<span class='tiaoJian'>(每当你使用水系牌或【圣光】时发动时发动)</span>目标角色+1[治疗]。",
            zhiLiaoShu:"[法术]治疗术",
            zhiLiaoShu_info:"目标角色+2[治疗]。",
            zhiYuZhiGuang:"[法术]治愈之光",
            zhiYuZhiGuang_info:"指定最多3名角色各+1[治疗]。",
            lianMin:"[启动]怜悯[持续]",
            lianMin_info:"[宝石][横置]你的手牌上限恒定为7[持续]，你+1[水晶]。",
            shengLiao:"[法术]圣疗[回合限定]",
            shengLiao_info:"[水晶]任意分配3[治疗]给1~3名角色，额外+1攻击行动或法术行动。",

            //暗杀者
            fanShi:"[被动]反噬",
            fanShi_info:"<span class='tiaoJian'>(承受攻击伤害时发动⑥)</span>攻击你的对手摸1张牌[强制]。",
            shuiYing:"[响应]水影",
            shuiYing_info:"<span class='tiaoJian'>(除【特殊行动】外，当你摸牌前发动)</span>弃X张水系牌[展示]；<span class='tiaoJian'>(若你处于【潜行】效果下)</span>你可额外弃1张法术牌[展示]。",
            qianXing:"[启动]潜行",
            qianXing_info:"[宝石]你可选择摸1张牌，[横置]持续到你的下个行动阶段开始，你的手牌上限-1；你不能成为主动攻击的目标；你的主动攻击对手无法应战且伤害额外+X，X为你剩余的【能量】数。【潜行】的效果结束时[重置]。",

            //封印师
            faShuJiDang:"[响应]法术激荡",
            faShuJiDang_info:"<span class='tiaoJian'>(法术行动结束后发动)</span>额外+1攻击行动。",
            diZhiFengYin:"(独)[法术]地之封印",
            diZhiFengYin_info:"<span class='tiaoJian'>(将【地之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出地系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            shuiZhiFengYin:"(独)[法术]水之封印",
            shuiZhiFengYin_info:"<span class='tiaoJian'>(将【水之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出水系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            huoZhiFengYin:"(独)[法术]火之封印",
            huoZhiFengYin_info:"<span class='tiaoJian'>(将【火之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出火系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            fengZhiFengYin:"(独)[法术]风之封印",
            fengZhiFengYin_info:"<span class='tiaoJian'>(将【风之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出风系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            leiZhiFengYin:"(独)[法术]雷之封印",
            leiZhiFengYin_info:"<span class='tiaoJian'>(将【雷之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出雷系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            wuXiShuFu:"(专)[法术]五系束缚",
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
            tianShiZhiGe:"[响应]天使之歌(回合限定)",
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
            juJi_info:"[水晶]目标角色手牌补到5张[强制]，额外+1攻击行动",

            //魔法少女
            moBaoChongJi:'[法术]魔爆冲击',
            moBaoChongJi_info:'<span class="tiaoJian">(弃1张法术牌[展示])</span>我方[战绩区]+1[水晶]。2名目标对手各弃一张法术牌[展示]，每有人不如此做，你对他造成2点法术伤害③，你弃一张牌。',
            moDanZhangWo:'[响应]魔弹掌握',
            moDanZhangWo_info:'你主动使用【魔弹】时可以选择逆向传递。',
            moDanRongHe:'[响应]魔弹融合',
            moDanRongHe_info:'你的地系或火系牌可以当【魔弹】使用。',
            huiMieFengBao:'[法术]毁灭风暴',
            huiMieFengBao_info:'[宝石]对2名目标对手各造成2点法术伤害③。',

            //女武神
            shenShengZhuiJi:"[响应]神圣追击",
            shenShengZhuiJi_info:"<span class='tiaoJian'>(攻击或法术行动结束后，移除你的1[治疗])</span>额外+1攻击行动。",
            zhiXuZhiYin:"[法术]秩序之印",
            zhiXuZhiYin_info:"<span class='tiaoJian'>(摸2张牌[强制])</span>你加+1[治疗]并+1[水晶]。",
            hePingXingZhe:"[被动]和平行者",
            hePingXingZhe_info:"<span class='tiaoJian'>(你的回合内，发动【英灵召唤】后强制触发[强制])</span>[横置]，转入【英灵形态】；<span class='tiaoJian'>(每当你执行主动攻击时发动①)</span>[重置]脱离【英灵形态】。",
            junShenWeiGuan:"[被动]军神威光",
            junShenWeiGuan_info:"<span class='tiaoJian'>(回合开始时，若你处于【英灵形态】)</span>选择以下1项发动：<br>·你+1[治疗]，[重置]脱离【英灵形态】；<br>·<span class='tiaoJian'>(移除我方【战绩区】X个星石，X<3)</span>目标角色+X[治疗]。",
            yingLingZhaoHuan:"[响应]英灵召唤",
            yingLingZhaoHuan_info:"[水晶]<span class='tiaoJian'>(攻击命中时发动②)</span>本次攻击伤害额外+1，<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>目标角色+1[治疗]",   

            //元素师
            yuanSuXiShou:'[响应]元素吸收',
            yuanSuXiShou_info:'<span class="tiaoJian">(对目标角色造成法术伤害时发动③)</span>你+1<span class="hong">【</span>元素<span class="hong">】</span>。',
            yuanSuDianRan:'[法术]元素点燃',
            yuanSuDianRan_info:'<span class="tiaoJian">(移除3点</span><span class="hong">【</span>元素<span class="hong">】</span><span class="tiaoJian">)</span>对目标角色造成2点法术伤害③，额外+1法术行动；不能与【元素吸收】同时发动。',
            yunShi:'(独)[法术]陨石',
            yunShi_info:'对目标角色造成1点法术伤害③，额外+1法术行动；<span class="tiaoJian">(若你额外弃1张地系牌[展示]①)</span>本次伤害额外+1。',
            bingDong:'(独)[法术]冰冻',
            bingDong_info:'对目标角色造成1点法术伤害③，并指定1名角色+1[治疗]<span class="tiaoJian">(若你额外弃1张水系牌[展示]①)</span>本次伤害额外+1。',
            huoQou:'(独)[法术]火球',
            huoQou_info:'对目标角色造成2点法术伤害③，<span class="tiaoJian">(若你额外弃1张火系牌[展示]①)</span>本次伤害额外+1。',
            fengRen:'(独)[法术]风刃',
            fengRen_info:'对目标角色造成1点法术伤害③，额外+1攻击行动；<span class="tiaoJian">(若你额外弃1张风系牌[展示]①)</span>本次伤害额外+1。',
            leiJi:'(独)[法术]雷击',
            leiJi_info:'对目标角色造成1点法术伤害③，我方【战绩区】+1[宝石]；<span class="tiaoJian">(若你额外弃1张雷系牌[展示]①)</span>本次伤害额外+1。',
            yueGuang:'[法术]月光',
            yueGuang_info:'[宝石]对目标角色造成(X+1)点法术伤害③，X为你剩余的【能量】数。',
            yuanSu:'元素',
            yuanSu_info:'</span><span class="hong">【</span>元素<span class="hong">】</span>为元素师专有指示物，上限为3。',

            //月之女神
            xinYueBiHu:"[响应]新月庇护[持续]",
            xinYueBiHu_info:"<span class='tiaoJian'>(我方角色因承受伤害造成手牌数超过手牌上限，导致士气即将下降时)</span>[横置]转为【暗月形态】，将因此而造成的弃牌面朝下放置于角色旁，作为【暗月】。本次士气不会下降。",
            anYueZuZhou:"[被动]暗月诅咒",
            anYueZuZhou_info:"<span class='tiaoJian'>(你每次移除【暗月】)</span>我方士气-1；<span class='tiaoJian'>(你的【暗月】数为0时)</span>[重置]脱离暗【暗月形态】。",
            meiDuShaZhiYan:"[响应]美杜莎之眼",
            meiDuShaZhiYan_info:"<span class='tiaoJian'>(目标对手攻击时①，移除1个与攻击牌系别相应的系别的【暗月】[展示])</span>你+1[治疗]，你+1<span class='lan'>【</span>石化<span class='lan'>】</span>。<span class='tiaoJian'>(若该【暗月】为法术牌)</span>你弃1张牌，对目标对手造成1点法术伤害③。",
            yueZhiLunHui:"[响应]月之轮回",
            yueZhiLunHui_info:"<span class='tiaoJian'>(你的回合结束时)</span>选择以下一项发动：<br>·<span class='tiaoJian'>(移除1个【暗月】)</span>目标角色+1[治疗]；<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【</span>新月<span class='hong'>】</span>。",
            yueDu:"[响应]月渎[回合限定]",
            yueDu_info:"<span class='tiaoJian'>(目标角色承受你造成的法术伤害⑥后，移除你的1[治疗])</span>对目标对手造成1点法术伤害③。",
            anYueZhan:"[响应]暗月斩",
            anYueZhan_info:"[水晶]<span class='tiaoJian'>(仅【暗月形态】下可发动，主动攻击命中时②，移除X个【暗月】(x<3))</span>本次攻击伤害额外+X。",
            cangBaiZhiYue:"[法术]苍白之月",
            cangBaiZhiYue_info:"[宝石]选择以下一项发动：<br>·<span class='tiaoJian'>(移除3点</span><span class='lan'>【</span>石化<span class='lan'>】</span><span class='tiaoJian'>)</span>你的下次主动攻击对手无法应战，额外+1攻击行动。你额外获得一个回合；<br>·移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③。",
            xinYue:"新月",
            xinYue_info:"<span class='hong'>【</span>新月<span class='hong'>】</span>为月之女神专有指示物，上限为2。",
            shiHua:"石化",
            shiHua_info:"<span class='lan'>【</span>石化<span class='lan'>】</span>为月之女神专有指示物，上限为3。",
            anYue:"暗月",
            anYue_info:"【暗月】为月之女神专用盖牌，无上限。",
            
            //仲裁者
            zhongCaiFaZe:"[被动]仲裁法则",
            zhongCaiFaZe_info:"游戏初始时。你加+2[水晶]。",
            yiShiZhongDuan:"[启动]仪式中断",
            yiShiZhongDuan_info:"<span class='tiaoJian'>(仅【审判形态】下发动)</span>[重置]脱离【审判形态】，我方【战绩区】+1[宝石]。",
            moRiShenPan:"[法术]末日宣告",
            moRiShenPan_info:"<span class='tiaoJian'>(移除所有</span><span class='hong'>【</span>审判<span class='hong'>】</span><span class='tiaoJian'>)</span>对目标角色造成等量的法术伤害③；在记得行动阶段开始时，若你的<span class='hong'>【</span>审判<span class='hong'>】</span>已达到上限，该行动阶段你必须发动【末日宣告】。",
            shenPanLangChao:"[被动]审判浪潮",
            shenPanLangChao_info:"<span class='tiaoJian'>(你每承受一次伤害⑥)</span>你+1<span class='hong'>【</span>审判<span class='hong'>】</span>。",
            zhongCaiYiShi:"[启动]仲裁仪式[持续]",
            zhongCaiYiShi_info:"[宝石][横置]转为【审判形态】，你的手牌上限恒定为5[恒定]；每次你的回合开始时，你+1<span class='hong'>【</span>审判<span class='hong'>】</span>。",
            panJueTianPing:"[法术]判决天平",
            panJueTianPing_info:"[水晶]你+1<span class='hong'>【</span>审判<span class='hong'>】</span>，再选择一下一项发动：<br>·弃掉所有手牌。<br>·将你的手牌补到上限[强制]，我方战绩区+1[宝石]。",
            shenPan:"审判",
            shenPan_info:"<span class='hong'>【</span>审判<span class='hong'>】</span>为仲裁者专有指示物，上限为4。",

            //冒险家
            qiZha:"[响应]欺诈",
            qiZha_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次除暗系以外的任意系的主动攻击，该系由你决定；或<span class='tiaoJian'>(弃3张同系牌[展示])</span>视为一次暗系的主动攻击。",
            qiangYun:"[被动]强运",
            qiangYun_info:"<span class='tiaoJian'>(当你发动【欺诈】时)</span>你+1[水晶]。",
            diXiaFaZe:"[被动]地下法则",
            diXiaFaZe_info:"<span class='tiaoJian'>(你执行【购买】时)</span>改为【战绩区】+2[宝石]。",
            maoXianJiaTianTang:"[响应]冒险者天堂",
            maoXianJiaTianTang_info:"你执行【提炼】时，将提炼出的[宝石]和[水晶]全部交给目标队友。然后移除你的1[能量]",
            touTianHuanRi:"[法术]偷天换日[回合限定]",
            touTianHuanRi_backup:"[法术]偷天换日[回合限定]",
            touTianHuanRi_info:"[水晶]将对方【战绩区】的1[宝石]转移到我方【战绩区】，或将我方【战绩区】的[水晶]全部转换为[宝石]，额外+1攻击行动或法术行动。",

            //圣枪骑士
            shengShengQiShi:"[被动]神圣启示",
            shengShengQiShi_info:"<span class='tiaoJian'>(我方[星杯区]的[星杯]数不小于对方时)</span>你的[治疗]上限+1。",
            huiYao:"[法术]辉耀",
            huiYao_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>所有角色各+1[治疗]，额外+1攻击行动。",
            chengJie:"[法术]惩戒",
            chengJie_info:"<span class='tiaoJian'>(弃1张法术牌[展示])</span>将其他角色的1[治疗]转移给你，额外+1攻击行动。",
            shengJi:"[被动]圣击",
            shengJi_info:"<span class='tiaoJian'>(攻击命中后发动②)</span>你+1[治疗]。",
            tianQiang:"[响应]天枪",
            tianQiang_info:"<span class='tiaoJian'>(主动攻击前发动①，移除你的2[治疗])</span>本次攻击对手无法应战，不能和【圣击】同时发动。",
            diQiang:"[响应]地枪",
            diQiang_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除你的X[治疗])</span>本次攻击伤害额外+X，X最高为4；不能和【圣击】同时发动。",
            shengGuangQiYu:"[法术]圣光祈愈",
            shengGuangQiYu_info:"[宝石]无视你的[治疗]上限为你+2[治疗]，但你的[治疗]最高为5，额外+1攻击行动；本回合你不能再发动天枪。",
            
            //精灵射手
            yuanSuSheJi:"[响应]元素射击[回合限定]",
            yuanSuSheJi_info:"<span class='tiaoJian'>(主动攻击时①，若攻击牌非暗系，弃1张法术牌[展示]或移除1个[祝福])</span>根据攻击牌类别附加以下【元素箭】效果：<br>【火之矢】：本次攻击伤害额外+1。<br>【水之矢】：<span class='tiaoJian'>(主动攻击命中时)</span>目标角色+1[治疗]。<br>【风之矢】：<span class='tiaoJian'>(攻击行动结束后)</span>额外+1攻击行动。<br>【雷之矢】：本次攻击无法应战。<br>【地之矢】：<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③。",
            dongWuHuoBan:"[响应]动物伙伴",
            dongWuHuoBan_info:"<span class='tiaoJian'>(你的回合内，目标角色承受你造成的伤害⑥后)</span>你摸1张牌[强制]，你弃1张牌。",
            jingLingMiYi:"[启动]精灵秘仪[持续]",
            jingLingMiYi_info:"[宝石][横置]转为【精灵祝福形态】，将牌堆顶的3张牌面朝下放置于角色旁作为【祝福】。此形态下你的【祝福】可视为手牌使用或打出。<span class='tiaoJian'>(你的回合结束时，若你未拥有【祝福】)</span>[重置]脱离【精灵祝福形态】，对目标角色造成2点法术伤害。",
            chongWuQiangHua:"[响应]宠物强化",
            chongWuQiangHua_info:"[水晶]<span class='tiaoJian'>(触发【动物伙伴时】)</span>效果改为“目标角色摸1张牌[强制]，弃1张牌”。",
            zhuFu:"祝福",
            zhuFu_info:"【祝福】为精灵射手专有盖牌，上限为3。",

            //瘟疫法师
            buXiu:"[响应]不朽",
            buXiu_info:"<span class='tiaoJian'>(法术行动结束时发动)</span>你+1[治疗]。",
            shengDu:"[被动]圣渎",
            shengDu_info:"你的[治疗]不能抵御攻击伤害，你的[治疗]上限+3。",
            wenYi:"[法术]瘟疫",
            wenYi_info:"<span class='tiaoJian'>(弃1张地系牌[展示])</span>对所有其他角色各造成1点法术伤害③。",
            siWangZhiChu:"[法术]死亡之触",
            siWangZhiChu_info:"<span class='tiaoJian'>(移除你的a[治疗]并弃b张同系牌，a，b的数值由你决定，但每项最少为2)</span>对目标角色造成(a+b-3)点伤害③，不能和【不朽】同时发动。",
            siWangZhiChu_backup:"[法术]死亡之触",
            juDuXinXing:"[法术]剧毒新星",
            juDuXinXing_info:"[宝石]对其他角色各造成2点法术伤害③，你+1[治疗]。",

            //魔剑士
            xiuLuoLianZhan:"[响应]修罗连斩[回合限定]",
            xiuLuoLianZhan_info:"<span class='tiaoJian'>(攻击行动结束后发动)</span>额外+1火系攻击行动。",
            anYingNingJu:"[启动]暗影凝聚",
            anYingNingJu_info:"<span class='tiaoJian'>(对自己造成1点法术伤害③)</span>[横置]持续到你的下个行动阶段开始，你都处于【暗影形态】，脱离【暗影形态】时[重置]。",
            anYingZhiLi:"[被动]暗影之力",
            anYingZhiLi_info:"<span class='tiaoJian'>(仅【暗影形态】下发动)</span>你发动的所有攻击伤害额外+1。",
            anYingKangJu:"[被动]暗影抗拒",
            anYingKangJu_info:"在你的行动阶段你始终不能使用法术牌。",
            anYingLiuXing:"[法术]暗影流星",
            anYingLiuXing_info:"<span class='tiaoJian'>(仅【暗影形态】下发动，弃2张法术牌[展示])</span>对目标角色造成2点法术伤害③；<span class='tiaoJian'>(若你额外移除我方【战绩区】2星石)</span>[重置]脱离[暗影型态]，你+1[宝石]。",
            huangQaunZhenChan:"[响应]黄泉震颤[回合限定]",
            huangQaunZhenChan_info:"[宝石]<span class='tiaoJian'>(主动攻击前发动①)</span>本次攻击对手不能应战，<span class='tiaoJian'>（若命中②）</span>你将手牌补至上限，然后弃2张牌。",

            //血色剑灵
            xueSeJingJi:"[被动]血色荆棘",
            xueSeJingJi_info:"<span class='tiaoJian'>(攻击命中时②)你+1</span><span class='hong'>【</span>鲜血<span class='hong'>】</span>。",
            chiSeYiShan:"[响应]赤色一闪",
            chiSeYiShan_info:"<span class='tiaoJian'>(攻击行动结束后，移除1点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>，对自己造成2点法术伤害③)</span>额外+1攻击行动。",
            xueRanQiangWei:"[法术]血染蔷薇",
            xueRanQiangWei_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>)</span>移除目标角色2[治疗]，将我方角色[能量区]的1[水晶]翻面为[宝石]。<span class='tiaoJian'>(若【血蔷薇庭院】在场)</span>额外对所有角色造成1点法术伤害。",
            xueQiPingZhang:"[响应]血气屏障",
            xueQiPingZhang_info:"<span class='tiaoJian'>(目标角色对你造成法术伤害③时，移除1点<span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>)</span>本次法术伤害-1③，对目标对手造成1点法术伤害③。",
            xueQiangWeiTingYuan:"(专)[被动]血蔷薇庭院",
            xueQiangWeiTingYuan_info:"<span class='tiaoJian'>(此卡在场时)</span>所有角色的[治疗]无法用于抵御伤害；<span class='tiaoJian'>(血色剑灵的回合结束时)</span>移除此卡。",
            sanHuaLunWu:"[启动]散华轮舞",
            sanHuaLunWu_info:"你选择以下一项发动：<br>·[水晶]将【血蔷薇庭院】放置于场上，你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>；<br>·[宝石]将【血蔷薇庭院】放置于场上，无视你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>上限为你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>但你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>数最高为4，你弃到4张牌。",
            xianXue:"鲜血",
            xianXue_info:"<span class='hong'>【</span>鲜血<span class='hong'>】</span>为血色剑灵专有指示物，上限为3。",

            //祈祷师
            guangHuiXinYang:"[法术]光辉信仰",
            guangHuiXinYang_info:"<span class='tiaoJian'>(仅在【祈祷形态】下发动，移除1点</span><span class='hong'>【</span>祈祷符文<span class='hong'>】</span><span class='tiaoJian'>)</span>你弃2张牌，我方【战绩区】+1[宝石]，目标队友+1[治疗]。",
            heiAnZuZhou:"[法术]黑暗诅咒",
            heiAnZuZhou_info:"<span class='tiaoJian'>(仅在【祈祷形态】下发动，移除1点</span><span class='hong'>【</span>祈祷符文<span class='hong'>】</span><span class='tiaoJian'>)</span>对目标角色和自己各造成2点法术伤害③。",
            weiLiCiFu:"(独)[法术]威力赐福",
            weiLiCiFu_info:"<span class='tiaoJian'>(将威力赐福放置于目标队友面前)</span>该队友获得<span class='tiaoJian'>(攻击命中后可以移除此牌发动②)</span>本次攻击伤害额外+2。",
            xunJieCiFu:"(独)[法术]迅捷赐福",
            xunJieCiFu_info:"<span class='tiaoJian'>(将迅捷赐福放置于目标队友面前)</span>该队友获得<span class='tiaoJian'>(法术行动或攻击行动结束时可以移除此牌发动)</span>额外+1攻击行动。",
            qiDao:"[启动]祈祷[持续]",
            qiDao_info:"[宝石][横置]转为【祈祷形态】，在此形态下，你每发动一次主动攻击①，你+2<span class='hong'>【</span>祈祷符文<span class='hong'>】</span>。",
            faLiChaoXi:"[响应]法力潮汐[回合限定]",
            faLiChaoXi_info:"[水晶]<span class='tiaoJian'>(法术行动结束时发动)</span>额外+1法术行动。",
            qiDaoFuWen:"祈祷符文",
            qiDaoFuWen_info:"<span class='hong'>【</span>祈祷符文<span class='hong'>】</span>为祈祷师专有指示物，其上限为3。",
            
            //红莲骑士
            xingHongShengYue:"[响应]腥红圣约[回合限定]",
            xingHongShengYue_info:"[水晶]<span class='tiaoJian'>(主动攻击时发动①)</span>你+1[治疗]。",
            xingHongXinYang:"[被动]猩红信仰",
            xingHongXinYang_info:"你的[治疗]只能抵御自己造成的伤害，你的治疗上限+2。",
            xueXingDaoYan:"[启动]血腥祷言",
            xueXingDaoYan_info:"<span class='tiaoJian'>(移除你的X[治疗]，对自己造成X点法术伤害③)</span>任意分配X[治疗]给1~2名队友，你+1<span class='hong'>【</span>血印<span class='hong'>】</span>。",
            shaLuShengYan:"[响应]杀戮盛宴",
            shaLuShengYan_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除1点</span><span class='hong'>【</span>血印<span class='hong'>】</span><span class='tiaoJian'>对自己造成4点法术伤害③)</span>本次攻击伤害额外+2。",
            reXueFeiTeng:"[被动]热血沸腾",
            reXueFeiTeng_info:"<span class='tiaoJian'>(当你因承受伤害而导致我方士气下降时强制发动[强制])</span>[横置]转发【热血沸腾状态】，该形态你因承受伤害不会导致我方士气下降[强制]。在你的回合结束阶段，若你处于此形态，[重置]并脱离此形态[强制],你+2[治疗]。",
            jieJiaoJieZao:"[响应]戒骄戒躁",
            jieJiaoJieZao_info:"[水晶]<span class='tiaoJian'>(仅【热血沸腾状态】下，攻击行动或结束行动结束时发动)</span>[重置]并脱离此形态，额外+1攻击行动或法术行动。",
            xingHongShiZi:"[法术]猩红十字",
            xingHongShiZi_info:"[宝石]<span class='tiaoJian'>(移除1点</span><span class='hong'>【</span>血印<span class='hong'>】</span><span class='tiaoJian'>弃2张法术牌[展示]，对自己造成4点法术伤害)</span>对目标角色造成3点法术伤害③。",
            xueYin:"血印",
            xueYin_info:"<span class='hong'>【</span>血印<span class='hong'>】</span>为红莲骑士专有指示物，其上限为2。",

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
            shenShengQiYue_info:"[水晶]将你的X[治疗]转移给目标队友，以此法所转移的[治疗]无视他的[治疗]上限，但他的治疗最高为4。",
            shenShengLingYu:"[法术]神圣领域",
            shenShengLingYu_info:"[水晶]你弃2张牌，再选择以下一项发动：<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>对目标角色造成2点法术伤害③。<br>·你+2[治疗]，目标队友+1[治疗]。",
            
            //阴阳师
            shiShenJiangLin:"[法术]式神降临[持续]",
            shiShenJiangLin_info:"<span class='tiaoJian'>(弃2张命格相同的手牌[展示])</span>[横置]转为【式神形态】，你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>。",
            yinYangZhanHuan:"[响应]阴阳转换",
            yinYangZhanHuan_info:"<span class='tiaoJian'>(应战攻击时①，打出1张与攻击牌命格相同的攻击牌[展示])</span>你应战此次攻击，并将本次攻击系别转为与此牌相同，你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>。<span class='tiaoJian'>(若处于【式神形态】，[重置]脱离【式神形态】)</span>本次攻击伤害为X，X为你的<span class='hong'>【</span>鬼火<span class='hong'>】</span>数。",
            shiShenZhuanHuan:"[响应]式神转换",
            shiShenZhuanHuan_info:"<span class='tiaoJian'>(与【阴阳转换】同时发动)</span>你摸1张牌[强制]，你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>。",
            heiAnJiLi:"[被动]黑暗祭礼",
            heiAnJiLi_info:"<span class='tiaoJian'>(你的回合结束时，若</span><span class='hong'>【</span>鬼火<span class='hong'>】</span><span class='tiaoJian'>)</span>移除所有<span class='hong'>【</span>鬼火<span class='hong'>】</span>，对目标角色造成2点法术伤害③。",
            shiShenZhouShu:"[响应]式神咒束",
            shiShenZhouShu_info:"<span class='tiaoJian'>(目标队友受到主动攻击时①，若此攻击可应战且你处于【式神形态】，打出1张合理的应战攻击牌[展示]，移除我方【战绩区】1[宝石]1[水晶])</span>将本次攻击目标变更为你，且视为你使用此牌执行应战攻击。",
            shengMingJieJie:"[法术]生命结界",
            shengMingJieJie_backup:"[法术]生命结界",
            shengMingJieJie_info:"[水晶]你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>，选择以下一项发动：<br>·目标队友+1[宝石]并+1[治疗]；然后对自己造成X点法术伤害③，X为你的<span class='hong'>【</span>鬼火<span class='hong'>】</span>数。(若X为3)本次法术伤害③不会造成我方士气下降。<br>·<span class='tiaoJian'>(仅【式神形态】下，弃2张命格相同的手牌[展示])</span>[重置]脱离【式神形态】目标队友弃1张牌。",
            guiHuo:"鬼火",
            guiHuo_info:"<span class='hong'>【</span>鬼火<span class='hong'>】</span>为阴阳师专有指示物，上限为3。",
            
            //苍炎魔女
            cangYanFaDian:"[法术]苍炎法典",
            cangYanFaDian_info:"<span class='tiaoJian'>(弃1张火系牌[展示])</span>对目标角色和自己造成2点法术伤害③。",
            tianHuoDianKong:"[法术]天火断空",
            tianHuoDianKong_info:"<span class='tiaoJian'>(弃2张火系牌[展示]，移除1点【重生】)</span>对目标角色和自己造成3点火焰伤害③，<span class='tiaoJian'>(若我方士气落后于该目标)</span>本次法术伤害额外+1[强制]。",
            moNvZhiNu:"[启动]魔女之怒",
            moNvZhiNu_info:"<span class='tiaoJian'>(手牌<4张时)</span>[横置]摸0-2张牌，数值由你决定，持续到你的下个行动阶段开始前，你都处于【烈焰形态】，在此形态下你的所有除水系和暗系外的攻击牌均视为火系[强制]，你释放【天火断空】是无需消耗【重生】,你的手牌上限+X(X-2)(X为你的【重生】数量)；脱离【烈焰形态】时[重置]。",
            tiShenWanOu:"[响应]替身玩偶",
            tiShenWanOu_info:"<span class='tiaoJian'>(任何人对你造成攻击伤害时③，弃1张法术牌[展示])</span>，目标队友摸1张牌[强制]。",
            yongShengYinShiJi:"[被动]永生银时计",
            yongShengYinShiJi_info:"<span class='tiaoJian'>(当你因承受法术伤害而造成士气下降时)</span>，你+1【重生】",
            tongKuLianJie:"[法术]痛苦链接",
            tongKuLianJie_info:"[水晶]对目标对手和自己各造成1点法术伤害③，然后你弃到3张牌。",
            moNengFanZhuan:"[响应]魔能反转",
            moNengFanZhuan_info:"[水晶]<span class='tiaoJian'>(任何人对你造成法术伤害时③，弃X张法术牌[展示](X>1))</span>，对目标对手造成(X-1)点法术伤害。",
            chongSheng:"重生",
            chongSheng_info:"<span class='hong'>【</span>重生<span class='hong'>】</span>为苍炎魔女专有指示物，上限为4。",

		},
	};
});
