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
            //moJianShi:['female','huan',6,['jianxiong'],],
            //shengQiangQiShi:['female','sheng',6,['jianxiong'],],
            yuanSuShi:['male','yong','3/4',['yuanSuXiShou','yuanSuDianRan','yunShi','bingDong','huoQou','fengRen','leiJi','yueGuang','yuanSu'],],
            //maoXianJia:['female','huan',6,['jianxiong'],],
            //wenYiFaShi:['male','huan',6,['jianxiong'],],
            //zhongCaiZhe:['female','xue',6,['jianxiong'],],
            //shenGuan:['female','sheng',6,['jianxiong'],],
            //qiDaoShi:['female','yong',6,['jianxiong'],],
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
            //hongLianQiShi:['female','xue',6,['jianxiong'],],
            //yingLingRenXing:['female','yong',6,['jianxiong'],],
            //moQiang:['female','huan',6,['jianxiong'],],
            //cangYanMoNv:['female','xue',6,['jianxiong'],],
            //yinYouShiRen:['male','huan',6,['jianxiong'],],
            //jingLingSheShou:['female','ji',6,['jianxiong'],],
            //yinYangShi:['female','huan',6,['jianxiong'],],
            //xueSeJianLing:['female','xue',6,['jianxiong'],],
            //yueZhiNvShen:['female','sheng',6,['jianxiong'],],
            //shouLingWuShi:['female','ji',6,['jianxiong'],],
            //shengGong:['male','sheng',6,['jianxiong'],],
		},
		
		
		skill:{
            _shouPaiShangXian:{
                mod:{
                    maxHandcardBase:function(player,num){
                        return 6;
                    }
                }
            },
            _zhiLiao:{
                trigger:{player:"zhiLiao"},
                forced:true,
                priority:1,
                filter:function(event,player){
                    if(event.zhiLiao==false) return false;
                    if(player.zhiLiao<=0) return false;
                    return true;
                },
                content:function(){
                    "step 0"
                    var num=trigger.num;
                    var list=[];
                    for(var i=0;i<=player.zhiLiao;i++){
                        if(i>num) break;
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','使用的治疗数量').set('ai',function(){return list.length-1;});
					"step 1"
					var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.num-=zhiLiaonum;
						game.log(player,'的治疗抵挡了'+zhiLiaonum+'点伤害');
						player.changeZhiLiao(-zhiLiaonum).type='damage';
					}
                }
            },
            _faShu:{
                mod:{
                    cardEnabled:function(card){
                        if(_status.event.name=='faShu'){
                            if(get.type(card)!='faShu') return false;
                        }
                    }
                },
            },
            _gongJi:{
                mod:{
                    cardEnabled:function(card){
                        if(_status.event.name=='gongJi'){
                            if(get.type(card)!='gongJi') return false;
                        }
                    }    
                }
            },
            _qiDong:{
                forced:true,
                trigger:{player:'useSkillAfter'},
                filter:function(event){
                    var info=get.info(event.skill);
                    return info.qiDong;
                },
                content:function(){
                    player.chooseToUse();
                }
            },

            _xuRuo:{
                priority:1,//优先级大的先执行
                trigger:{player:'phaseUseBefore'},
                forced:true,
                //marktext:"虚",
                markimage:'image/card/xuRuo.png',
                intro:{
					content:'expansion',
				},
                filter:function(event,player){
                    return player.hasExpansions('_xuRuo');
                },
                content:function(event,player){
                    'step 0'
                    var list=['摸三张牌','跳过行动阶段'];
                    player.chooseControl().set('choiceList',list).set('prompt','虚弱：选择一项').set('ai',function(){return 1;});
                    'step 1'
					if(result.index==1){
						trigger.cancel();
					}else if(result.index==0){
						player.draw(3);
					}
                    player.loseToDiscardpile(player.getExpansions('_xuRuo'));
                },
            },
            _zhongDu:{
                priority:3,
                //marktext:"毒",
                markimage:'image/card/zhongDu.png',
                intro:{
					content:'expansion',
					markcount:'expansion',
				},
                trigger:{player:'phaseUseBefore'},
                forced:true,
                filter:function(event,player){
                    return player.hasExpansions('_zhongDu');
                },
                content:function(event){
                    var target;
                    while(player.storage.zhongDu.length){
                        target=player.storage.zhongDu.pop();
                        var next=player.damage(target);
                        next.faShu=true;
                    }
                    player.loseToDiscardpile(player.getExpansions('_zhongDu'));
                }
            },
            _shengDun:{
                //marktext:"盾",
                markimage:'image/card/shengDun.png',
                intro:{
					content:'expansion',
				},
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.parent.canShengDun==false) return false;
                    if(get.type(event.card)=='gongJi'||event.card.name=='moDan'){
                        return player.hasExpansions('_shengDun');
                    }
                },
                content:function(){
                    player.loseToDiscardpile(player.getExpansions('_shengDun'));
                    trigger.getParent().targets.remove(player);
                    if(get.type(card)=='gongJi'){
                        event.source=trigger.player;
                        event.trigger('gongJiUnhirt');
                    }else if(trigger.card.name=='moDan') game.resetMoDan();
                    trigger.cancel();
                }
            },
            _yingZhan:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.parent.canYingZhan==false) return false;
                    if(get.type(event.card)=='gongJi'){
                        if(get.name(event.card)=='anMie'){
                            return false;
                        }else{
                            return true;
                        }
                    }
                }, 
                content:function(){
                    'step 0'
                    event.source=trigger.player;
					var next=player.gongJi('h');
                    next.set('filterCard',function(card,player,event){
                        if(card.name!='anMie'&&card.name!=get.name(_status.event.trigger_card)) return false;
						return lib.filter.cardEnabled(card,player,'forceEnable');
					});
                    next.set('ai',function(card){
                        return 1;
                    });
                    next.set('prompt','是否使用一张同元素攻击牌或者暗灭');
                    next.set('filterTarget',function(card,player,target){
                        return target!=_status.event.trigger_player&&target.side!=player.side;
                    });
                    next.set('trigger_card',trigger.card);
                    next.set('trigger_player',event.source);
                    next.set('yingZhan',true);
                    'step 1'
                    if(result.bool){
                        //game.log(player.name,'应战完毕');//调试用
                        trigger.getParent().targets.remove(player);
                        trigger.cancel();
                    }
                }
            },
            _yingZhan_weiMingZhong:{
                trigger:{player:'useCard'},
                forced:true,
                filter:function(event,player){
                    return event.parent.parent.name=='_yingZhan';
                },
                content:function(){
                    event.source=trigger.parent.parent.source;
                    event.player=trigger.parent.player;
                    event.trigger('gongJiUnhirt');
                }
            },
            _yingZhan_sheZhi:{
                trigger:{player:'useCard1'},
                forced:true,
                priority:99,
                filter:function(event,player){
                    return event.parent.parent.name=='_yingZhan';
                },
                content:function(){
                    trigger.yingZhan=true;
                }
            },

            _shengGuang:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.parent.canShengGuang==false) return false;
                    if(get.type(event.card)=='gongJi'||event.card.name=='moDan'){
                        return true;
                    }
                },
                content:function(){
					"step 0"
					var str='是否使用圣光';
					var next=player.chooseToRespond('h',str).set('filterCard',function(card,player,event){
						if(card.name!="shengGuang") return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					},str);
					next.ai=function(card){
						return 1;
					};
					"step 1"
					if(result.bool){
                        trigger.getParent().targets.remove(player);
						if(get.type(card)=='gongJi'){
                            event.source=trigger.player;
                            event.trigger('gongJiUnhirt');
                        }else if(trigger.card.name=='moDan') game.resetMoDan();
                        trigger.cancel();
					}
				},
            },
            _quXiao:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(player.hasExpansions('_shengDun')) return false;//有圣盾不触发
                    if(event.parent.canYingZhan==false&&event.parent.canShengDun==false&&event.parent.canShengGuang==false) return false;//强制命中不触发
                    if(event.parent.canYingZhan==false&&event.parent.canShengGuang==false&&!player.hasExpansions('_shengDun')) return false;//无法应战无法圣光无圣盾不触发
                    if(get.type(event.card)=='gongJi'||event.card.name=='moDan'){
                        return true;
                    }
                },
                content:function(){
                    trigger.cancel(); 
                }
            },


            _moDan:{
                group:['moDan2','moDan3'],
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
				content:function(){
					"step 0"
                    player.storage.moDan=true;//回合外判断使用法术
					var str='是否使用魔弹'; 
					var next=player.chooseToUse('h',function(card,player,event){
						if(card.name!=get.name(trigger.card)) return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					},str);
					next.ai=function(card){
						return 1;
					}
					next.autodelay=true; 
                    game.broadcastAll(function(){
                        game.moDan++;
                    });
					"step 1"
					if(result.bool){
                        trigger.getParent().targets.remove(player);
                        trigger.cancel();
					}else{
                        game.broadcastAll(function(){
                            game.moDan--;
                        });
                    }
                    player.storage.moDan=false;
				},
				ai:{
					result:{
						player:2,
					},
				}
			},
            moDan2:{//第一个使用魔弹的角色增加魔弹标记
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(player.storage.moDan==false&&event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.storage.moDan=true;
                }
            },
            moDan3:{//第一个使用魔弹的角色删除魔弹标记
                trigger:{player:'useCardEnd'},
                filter:function(event,player){
                    if(player.storage.moDan==true&&event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.storage.moDan=false;
                }
            },
            _gouMai:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')+3<=player.getHandcardLimit();
				},
				content:function(event,player){
					var list=['宝石','水晶']
					player.draw(3).set('type','teShuXingDong');
					if(player.side==true){
						if(game.hongZhanJi.length<=3){
							player.changeZhanJi('r',1);
							player.changeZhanJi('b',1);
						}else if(game.hongZhanJi.length==4){
							player.chooseControl(list,function(event,player){
								return '宝石';
							}).set('prompt','选择获得的星石');
							if(result.control=='宝石'){
								player.changeZhanJi('r',1);
							}else{
								player.changeZhanJi('b',1);
							}
						}
					}else if(player.side==false){
						if(game.lanZhanJi.length<=3){
							player.changeZhanJi('r',1);
							player.changeZhanJi('b',1);
						}else if(game.lanZhanJi.length==4){
							player.chooseControl(list,function(event,player){
								return '宝石';
							}).set('prompt','选择获得的星石');
							if(result.control=='宝石'){
								player.changeZhanJi('r',1);
							}else{
								player.changeZhanJi('b',1);
							}
						}
					}
					
				},
				ai:{
					order:5,
					result:{
						player:2,
					},
					maixie:true,
				}
			},
			_heCheng:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(player.side==true){
						return game.hongZhanJi.length>=3&&player.countCards('h')+3<=player.getHandcardLimit();
					}else if(player.side==false){
						return game.lanZhanJi.length>=3&&player.countCards('h')+3<=player.getHandcardLimit();
					}
				},
				content:function(event,player){
					"step 0"
					if(player.side==true){
						var list=game.hongZhanJi;
					}else{
						var list=game.lanZhanJi;
					}
					var next=player.chooseButton([
						'合成请选择三个星石',
						[list,'tdnodes'],
					]);
					next.set('forced',true);
					next.set('selectButton',3);
					next.set('ai',function(button){
						switch(button.link){
							case 0:{
								return 1;
							}
							case 1:{
								return 1;
							}
							case 2:{
								return 1;;
							}
						}
					});
					"step 1"
					for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='宝石'){
							player.changeZhanJi('r',-1);
						}else if(result.links[i]=='水晶'){
							player.changeZhanJi('b',-1);
						}
					}
					player.draw(3).set('type','teShuXingDong');
					player.changeXingBei(1);
					if(!result.links.contains(0)) event.finish();
				},
				ai:{
					order:50,
					result:{
						player:function(player){
                            if(player.side){
                                if(game.hongZhanJi.length>=3){
                                    return 3;
                                }
                            }else{
                                if(game.lanZhanJi.length>=3){
                                    return 3;
                                }
                            }
                        },
					},
					maixie:true,
				}
			},
			_tiLian:{
				subSkill:{
					r:{
						//marktext:'石',
						intro:{
							name:'宝石',
							content:'mark',
						},
                        markimage:'image/card/r.png',
					},
					b:{
						//marktext:'晶',
						intro:{
							name:'水晶',
							content:'mark',
						},
                        markimage:'image/card/b.png',
					},
				},
				enable:'phaseUse',
				usable:1,

				filter:function(event,player){
                    var nengLiang_num=player.countMark('_tiLian_r')+player.countMark('_tiLian_b');
                    var empty_nengliang=player.storage.nengLiang_max-nengLiang_num;
					if(player.side==true){
						return game.hongZhanJi.length>=1&&empty_nengliang>=1;
					}else if(player.side==false){
						return game.lanZhanJi.length>=1&&empty_nengliang>=1;
					}
				},
				content:function(event,player){
                    var nengLiang_num=player.countMark('_tiLian_r')+player.countMark('_tiLian_b');
					if(player.storage.nengLiang_max-nengLiang_num==1){
						var num=1;
					}else if(player.storage.nengLiang_max-nengLiang_num>=2){
						var num=2;
					}
					"step 0"
					if(player.side==true){
						var list=game.hongZhanJi;
					}else{
						var list=game.lanZhanJi;
					}
					var next=player.chooseButton([
						'请选择提炼的星石',
						[list,'tdnodes'],
					]);
					next.set('forced',true);
					next.set('selectButton',[1,num]);
					next.set('filterButton',function(button){
						if(button.link==0){
							return _status.event.bool1;
						};
						return true;
					});
					//next.set('bool1',lib.skill.xinbenxi.filterx(trigger,player));
					next.set('ai',function(button){
						switch(button.link){
							case 0:{
								return 1;
							}
							case 1:{
								return 1;
							}
						}
					});
					"step 1"
					for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='宝石'){
							player.addMark('_tiLian_r');
							player.changeZhanJi('r',-1);
						}else if(result.links[i]=='水晶'){
							player.addMark('_tiLian_b');
							player.changeZhanJi('b',-1);
						}
					}
					
				},
			},
			_gongJiXingShi:{//攻击获得星石
				trigger:{source:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					if(player.side==true){
						return game.hongZhanJi.length<5&&get.type(event.card)=="gongJi";
					}else if(player.side==false){
						return game.lanZhanJi.length<5&&get.type(event.card)=="gongJi";
					}
				},
				content:function(event,player){
					if(trigger.parent.parent.yingZhan==true){
						player.changeZhanJi('b',1)
					}else{
						player.changeZhanJi('r',1)
                    }
				},
			},
            //风之剑圣
            fengNuZhuiJi:{
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
                    "step 0"
					var str='风怒追击：是否使用发动风系攻击';
					var next=player.gongJi('h',function(card,player,event){
                        if(get.suit(card)!='feng') return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					},str);
					next.ai=function(card){
						return 1;
					}
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
                            player.chooseControl(list).set('prompt','剑影：摸几张牌并弃置同样的数量').set('ai',function(){return 0;});
                            "step 1"
                            event.number=result.control;
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
                trigger:{player:"useCard1"},
                filter:function(event,target){
                    if(event.card.hasNature('lieFengJi')){
                        return target.hasExpansions('shengDun');
                    }
                    return false;
                },
                content:function(event,target){
                    player.addTempSkill('lieFengJi2',{player:['useCardBefore','phaseEnd']});
                }
            },
            lieFengJi2:{
                forced:true,
                trigger:{player:"useCardToPlayer"},
                filter:function(event,target){
                    if(event.card.hasNature('lieFengJi')){
                        return target.hasExpansions('shengDun');
                    }
                    return false;
                },
                content:function(){
                    trigger.parent.canShengDun=false;
                    trigger.parent.canYingZhan=false;
                }
            },
            jiFengJi:{
                trigger:{player:"useCard1"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('jiFengJi');
                },
                content:function(event,target){
                    player.addSkill('jiFengJi2');
                }
            },
            jiFengJi2:{
                forced:true,
                trigger:{player:'useCardAfter'},
                filter:function(event,player){
                    return event.card.hasNature('jiFengJi');
                },
                content:function(){
                    "step 0"
                    player.removeSkill('jiFengJi2');
					var str='疾风技：是否发动攻击';
					var next=player.gongJi('h',str);
					next.ai=function(card){
						return 1;
					}
					next.autodelay=true;
                   
                }
            },
            jianYing:{
                usable:1,
                enable:'phaseUse',
                trigger:{player:'useCardAfter'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)=='gongJi'){
                        return player.canBiShaShuiJing();
                    }else{
                        return false;
                    }
                },
                content:function(player){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
					var str='剑影：是否发动攻击';
					var next=player.gongJi('h',str);
					next.ai=function(card){
						return 1;
					}
					next.autodelay=true;
                }
            },

            //狂战士
            kuangHua:{
                group:"kuangHua_1",
                forced:true,
                trigger:{player:'useCardToPlayer'},
				filter:function(event){
					if(event.card&&get.type(event.card)=='gongJi'){
						return true;
					}
					return false;
				},
				forced:true,
				content:function(){
					trigger.getParent().baseDamage++;
				},
                subSkill:{
                    1:{
                        forced:true,
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return player.countCards('h')>3;
                        },
                        content:function(event,player){
                            trigger.getParent().baseDamage++;
                        }
                    }
                }
            },
            
            xueYingKuangDao:{
                trigger:{player:'useCard1'},
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
                trigger:{player:'useCard1'},
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
                group:'bingShuangDaoYan_shengGuang',
                forced:true,
                trigger:{player:['useCardBegin']},
                filter:function(event){
                    return get.suit(event.card)=='shui';
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('选择一名角色+1[治疗]',true).set('ai',function(target){
						if(target.side==player.side&&target.zhiLiao<target.storage.zhiLiaoMax){
                            return 1;
                        }else if(target.side==player.side&&target.zhiLiao>=target.storage.zhiLiaoMax){
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
                subSkill:{
                    shengGuang:{
                        forced:true,
                        trigger:{player:'respondAfter'},
                        filter:function(event,player){
                            return get.name(event.card)=='shengGuang';
                        },
                        content:function(){
                            'step 0'
                            player.chooseTarget('选择一名角色+1[治疗]',true).set('ai',function(target){
                                if(target.side==player.side&&target.zhiLiao<target.storage.zhiLiaoMax){
                                    return 1;
                                }else if(target.side==player.side&&target.zhiLiao>=target.storage.zhiLiaoMax){
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
                    }
                }
            },
            zhiLiaoShu:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('zhiLiaoShu');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'zhiLiaoShu'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('zhiLiaoShu');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张治疗术',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('zhiLiaoShu')){
                            range[0]=1;
                            range[1]=1;
                        }
					}
				},
                group:['zhiLiaoShu2'],
            },
            zhiLiaoShu2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('zhiLiaoShu');
                },
                content:function(trigger){
                    trigger.targets[0].changeZhiLiao(2);
                }
            },
            zhiYuZhiGuang:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('zhiYuZhiGuang');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'zhiYuZhiGuang'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('zhiYuZhiGuang');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张治愈之光',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('zhiYuZhiGuang')){
                            range[0]=1;
                            range[1]=3;
                        }
					}
				},
                group:['zhiYuZhiGuang2'],
            },
            zhiYuZhiGuang2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('zhiYuZhiGuang');
                },
                content:function(trigger){
                    for(var target of trigger.targets){
                        target.changeZhiLiao(1);
                    }
                }
            },
            lianMin:{
                qiDong:true,
                enable:'phaseUse',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.link();
                    player.storage.lianMin=true;
                    player.changeNengLiang('b');
                },
                mod:{
                    maxHandcard:function(player,num){
                        if(player.storage.lianMin==true) return 7
                    }
                }
            },
            shengLiao:{
                faShu:true,
                usable:1,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return _status.currentPhase==player&&player.canBiShaShuiJing();
                },
                content:function(event,player){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(typeof player.storage.shengLiao!='number'){
                        player.storage.shengLiao=0;
                    }
                    player.chooseTarget('选择一名角色+1[治疗]',true).set('ai',function(target){
						if(target.side==player.side&&target.zhiLiao<target.storage.zhiLiaoMax){
                            return 1;
                        }else if(target.side==player.side&&target.zhiLiao>=target.storage.zhiLiaoMax){
                            return 0;
                        }else if(target.side!=player.side){
                            return -1;
                        }else{
                            return 1;
                        }
					});
                    'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'blue');
						target.changeZhiLiao();
                        player.storage.shengLiao+=1;
                        if(player.storage.shengLiao<=2){
                            event.goto(1);
                        }
					}
                    'step 3'
                    player.storage.shengLiao=0
                    var next=player.chooseToUse();
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
                    return event.type!="teShuXingDong";
                },
                content:function(event,player){
                    'step 0'
                    var next=player.chooseToDiscard([0,3],true,'请选择的要弃置水系牌',function(card){
                        return get.suit(card)=='shui';
                    });
                    next.ai=function(card){
						return 1;
					}
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                    }
                    'step 2'
                    if(player.storage.qianXing!=true) event.finish();
                    'step 3'
                    var next=player.chooseToDiscard(1,'请选择的要弃置法术牌',function(card){
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
                qiDong:true,
                enable:"phaseUse",
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&player.storage.qianXing!=true;
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
                    player.link();
                    player.storage.qianXing=true;
                    'step 3'
                    var num=player.needsToDiscard();
                    if(num>0){
						player.chooseToDiscard(num,true).set('useCache',true);
						player.changeShiQi(-num);
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
                    maxHandcard:function(player,num){
                        if(player.storage.qianXing==true) return num-1;
                    },
                    targetEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi'&&target.storage.qianXing==true) return false;
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
                            if(get.type(event.card)=='gongJi') return true;
                        },
                        content:function(){
                            trigger.parent.canYingZhan=false;
                        }
                    },
                    chongZhi:{
                        forced:true,
                        trigger:{player:'phaseUseBegin'},
                        filter:function(event,player){
                            return player.storage.qianXing;
                        },
                        content:function(){
                            'step 0'
                            player.link();
                            player.storage.qianXing=false;
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
                            if(event.yingZhan==true) return false;
                            return get.type(event.card)=='faShu';
                        },
                        content:function(){
                            player.gongJi();
                        }
                    },
                    2:{
                        trigger:{player:'useSkillAfter'},
                        filter:function(event){
                            var info=get.info(event.skill);
                            return info.faShu;
                        },
                        content:function(player){
                            player.gongJi()
                        }
                    },
                },
            },
            diZhiFengYin:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('diZhiFengYin');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'diZhiFengYin'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('diZhiFengYin');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张地之封印',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('diZhiFengYin')){
                            range[0]=1;
                            range[1]=1;
                        }
					},
					playerEnabled:function (card,player,target){
                        if(card.name=='faShu'&&card.hasNature('diZhiFengYin')&&(target.side==player.side||target.hasExpansions('diZhiFengYin_xiaoGuo'))){
                            return false;
                        }
                    }

				},
                group:['diZhiFengYin_zhiXing'],
                subSkill:{
                    xiaoGuo:{
                        marktext:"地",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard2','showCardsBegin']},
                        filter:function(event,player){
                            if(!player.hasExpansions('diZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                return get.suit(card)=='di'&&player.hasExpansions('diZhiFengYin_xiaoGuo');
                            }
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
            diZhiFengYin_zhiXing:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event){
                    return event.card.name=='faShu'&&event.card.hasNature('diZhiFengYin');
                },
                content:function(trigger){
                    'step 0'
                    var target=trigger.targets[0];
                    if(!target.hasSkill('diZhiFengYin_xiaoGuo')){
                        target.addSkill('diZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    var target=trigger.targets[0];
                    target.storage.fengYin=player;
                    target.addToExpansion(trigger.cards,'gain2',player).gaintag.add('diZhiFengYin_xiaoGuo');
                },
            },
            shuiZhiFengYin:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('shuiZhiFengYin');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'shuiZhiFengYin'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('shuiZhiFengYin');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张水之封印',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('shuiZhiFengYin')){
                            range[0]=1;
                            range[1]=1;
                        }
					},
					playerEnabled:function (card,player,target){
                        if(card.name=='faShu'&&card.hasNature('shuiZhiFengYin')&&(target.side==player.side||target.hasExpansions('shuiZhiFengYin_xiaoGuo'))){
                            return false;
                        }
                    }

				},
                group:['shuiZhiFengYin_zhiXing'],
                subSkill:{
                    xiaoGuo:{
                        marktext:"水",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard2','showCardsBegin']},
                        filter:function(event,player){
                            if(!player.hasExpansions('shuiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                return get.suit(card)=='shui'&&player.hasExpansions('shuiZhiFengYin_xiaoGuo');
                            }
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
            shuiZhiFengYin_zhiXing:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event){
                    return event.card.name=='faShu'&&event.card.hasNature('shuiZhiFengYin');
                },
                content:function(trigger){
                    'step 0'
                    var target=trigger.targets[0];
                    if(!target.hasSkill('shuiZhiFengYin_xiaoGuo')){
                        target.addSkill('shuiZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    var target=trigger.targets[0];
                    target.storage.fengYin=player;
                    target.addToExpansion(trigger.cards,'gain2',player).gaintag.add('shuiZhiFengYin_xiaoGuo');
                },
            },
            huoZhiFengYin:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('huoZhiFengYin');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'huoZhiFengYin'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('huoZhiFengYin');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张火之封印',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('huoZhiFengYin')){
                            range[0]=1;
                            range[1]=1;
                        }
					},
					playerEnabled:function (card,player,target){
                        if(card.name=='faShu'&&card.hasNature('huoZhiFengYin')&&(target.side==player.side||target.hasExpansions('huoZhiFengYin_xiaoGuo'))){
                            return false;
                        }
                    }

				},
                group:['huoZhiFengYin_zhiXing'],
                subSkill:{
                    xiaoGuo:{
                        marktext:"火",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard2','showCardsBegin']},
                        filter:function(event,player){
                            if(!player.hasExpansions('huoZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                return get.suit(card)=='huo'&&player.hasExpansions('huoZhiFengYin_xiaoGuo');
                            }
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
            huoZhiFengYin_zhiXing:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event){
                    return event.card.name=='faShu'&&event.card.hasNature('huoZhiFengYin');
                },
                content:function(trigger){
                    'step 0'
                    var target=trigger.targets[0];
                    if(!target.hasSkill('huoZhiFengYin_xiaoGuo')){
                        target.addSkill('huoZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    var target=trigger.targets[0];
                    target.storage.fengYin=player;
                    target.addToExpansion(trigger.cards,'gain2',player).gaintag.add('huoZhiFengYin_xiaoGuo');
                },
            },
            fengZhiFengYin:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('fengZhiFengYin');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'fengZhiFengYin'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('fengZhiFengYin');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张风之封印',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('fengZhiFengYin')){
                            range[0]=1;
                            range[1]=1;
                        }
					},
					playerEnabled:function (card,player,target){
                        if(card.name=='faShu'&&card.hasNature('fengZhiFengYin')&&(target.side==player.side||target.hasExpansions('fengZhiFengYin_xiaoGuo'))){
                            return false;
                        }
                    }

				},
                group:['fengZhiFengYin_zhiXing'],
                subSkill:{
                    xiaoGuo:{
                        marktext:"风",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard2','showCardsBegin']},
                        filter:function(event,player){
                            if(!player.hasExpansions('fengZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                return get.suit(card)=='feng'&&player.hasExpansions('fengZhiFengYin_xiaoGuo');
                            }
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
            fengZhiFengYin_zhiXing:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event){
                    return event.card.name=='faShu'&&event.card.hasNature('fengZhiFengYin');
                },
                content:function(trigger){
                    'step 0'
                    var target=trigger.targets[0];
                    if(!target.hasSkill('fengZhiFengYin_xiaoGuo')){
                        target.addSkill('fengZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    var target=trigger.targets[0];
                    target.storage.fengYin=player;
                    target.addToExpansion(trigger.cards,'gain2',player).gaintag.add('fengZhiFengYin_xiaoGuo');

                },
            },
            leiZhiFengYin:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('leiZhiFengYin');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'leiZhiFengYin'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('leiZhiFengYin');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张雷之封印',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('leiZhiFengYin')){
                            range[0]=1;
                            range[1]=1;
                        }
					},
					playerEnabled:function (card,player,target){
                        if(card.name=='faShu'&&card.hasNature('leiZhiFengYin')&&(target.side==player.side||target.hasExpansions('leiZhiFengYin_xiaoGuo'))){
                            return false;
                        }
                    }

				},
                group:['leiZhiFengYin_zhiXing'],
                subSkill:{
                    xiaoGuo:{
                        marktext:"雷",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard2','showCardsBegin']},
                        filter:function(event,player){
                            if(!player.hasExpansions('leiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            for(var card of event.cards){
                                return get.suit(card)=='lei'&&player.hasExpansions('leiZhiFengYin_xiaoGuo');
                            }
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
            leiZhiFengYin_zhiXing:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event){
                    return event.card.name=='faShu'&&event.card.hasNature('leiZhiFengYin');
                },
                content:function(trigger){
                    'step 0'
                    var target=trigger.targets[0];
                    if(!target.hasSkill('leiZhiFengYin_xiaoGuo')){
                        target.addSkill('leiZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    var target=trigger.targets[0];
                    target.storage.fengYin=player;
                    target.addToExpansion(trigger.cards,'gain2',player).gaintag.add('leiZhiFengYin_xiaoGuo');
                },
            },
            wuXiShuFu:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(_status.currentPhase!=player) return false;
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    return true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget(true,'选择【五系束缚】的目标对手',function(card,player,target){
                        if(target.side!=player.side){
                            return true;
                        }});
                    'step 2'
                    if(result.bool){
						var target=result.targets[0];
						player.line(target,'blue');
                        target.addSkill('wuXiShuFu_xiaoGuo')
						target.addMark('wuXiShuFu_xiaoGuo');
					}
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
                            var x=0;
                            for(var p of game.players){
                                if(x>=2){
                                    x=2;
                                    break;
                                }
                                for(var xiaoGuo of game.jiChuXiaoGuo.fengYinShi){
                                    if(p.hasExpansions(xiaoGuo)){
                                        x++;
                                    }
                                }
                            }
                            var list=[`摸2+${x}张牌`,'跳过行动阶段'];
                            if(player.hasExpansions('xuRuo')){
                                list[0]=`摸2+3+${x}张牌`;
                            }
                            player.chooseControl().set('choiceList',list).set('prompt','五系束缚：选择一项').set('ai',function(){return 1;});
                            'step 1'
                            if(result.index==1){
                                trigger.cancel();
                            }else if(result.index==0){
                                player.draw(2+3+x);
                            }
                            player.removeMark('wuXiShuFu_xiaoGuo');
                            if(player.hasExpansions('xuRuo')){
                                player.loseToDiscardpile(player.getExpansions('xuRuo')); 
                            }
                            player.removeSkill('wuXiShuFu_xiaoGuo');
                        },
                    }
                }
            },
            fengYinPoSui:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(_status.currentPhase!=player) return false;
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
                content:function(player,event){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget('选择1个有基础效果的目标角色',function(card,player,target){
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
                        player.chooseControl(list).set('prompt','选择要移的除基础效果');
                    }
                    'step 3'
                    if(result.control=='zhongDu'){
                        player.chooseCardButton(target.getExpansions('zhongDu'),true,'选择要移除的中毒')
                    }else{
                        player.gain(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.finish();
                    }
                    'step 4'
                    var card=result.links[0];
                    var list=target.getExpansions('zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    player.gain(card);
                }
            },

            //守护天使
            fengZhiJieJing:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(_status.currentPhase!=player){
                        return false;
                    }
                    if(!player.countCards('h',function(card){
                        return get.suit(card)=='feng';
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
                content:function(){
                    'step 0'
                    player.chooseToDiscard('h','弃置1张风系牌',true,function(card){
                        return get.suit(card)=='feng';
                    })
                    'step 1'
                    player.showCards(result.cards);
                    if(!function(){
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
                    }){
                        event.finish();
                    }
                    if(result.bool){
                        player.chooseTarget('选择1个有基础效果的目标角色',function(card,player,target){
                            for(var xiaoGuoList in game.jiChuXiaoGuo){
                                for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                    if(target.hasExpansions(xiaoGuo)){
                                        return true;
                                    }
                                }
                            }
                        },true);
                    }
                    'step 2'
                    if(result.bool){
                        event.target=result.targets[0];
                        var target=event.target;
                        var list=[];
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(target.hasExpansions(xiaoGuo)){
                                    list.push(xiaoGuo);
                                }
                            }
                        }
                        player.chooseControl(list).set('prompt','选择要移的除基础效果');
                    }
                    'step 3'
                    if(result.control=='zhongDu'){
                        player.chooseCardButton(target.getExpansions('zhongDu'),true,'选择要移除的中毒')
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
                    var list=target.getExpansions('zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    target.loseToDiscardpile(card);
                    event.trigger('yiChuJiChuXiaoGuo');
                }
            },
            tianShiZhuFu:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',function(card){
                        return get.suit(card)=='shui';
                    })&&_status.currentPhase==player;
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard('h','弃置1张水系牌',true,function(card){
                        return get.suit(card)=='shui';
                    })
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.chooseTarget([1,2],'选择要给你牌的目标角色',true);
                    }
                    'step 2'
                    if(result.bool){
                        player.storage.tianShiZhuFu=result.targets.sortBySeat();
                        if(player.storage.tianShiZhuFu.length==1){
                            event.goto(3);
                        }else if(player.storage.tianShiZhuFu.length==2){
                            event.goto(5);
                        }
                    }else{
                        event.finish();
                    }
                    'step 3'
                    var target=player.storage.tianShiZhuFu[0];
                    if(target.countCards('h')>=2){
                        target.chooseCard('交给守护天使2张牌',true,2);
                    }else if(target.countCards('h')==1){
                        target.chooseCard('交给守护天使1张牌',true,1);
                    }else{
                        event.finish();
                    }
                    'step 4'
                    var target=player.storage.tianShiZhuFu[0];
                    target.give(result.cards,player,'give');
                    event.finish();

                    'step 5'
                    var target=player.storage.tianShiZhuFu[0];
                    if(target.countCards('h')>=1){
                        target.chooseCard('交给守护天使1张牌',true,1);
                    }else{
                        event.goto(7);
                    }
                    'step 6'
                    var target=player.storage.tianShiZhuFu[0];
                    target.give(result.cards,player,'give');
                    'step 7'
                    var target=player.storage.tianShiZhuFu[1];
                    if(target.countCards('h')>=1){
                        target.chooseCard('交给守护天使1张牌',true,1);
                    }else{
                        event.finish();
                    }
                    'step 8'
                    var target=player.storage.tianShiZhuFu[1];
                    target.give(result.cards,player,'give');
                    event.finish();
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
                            player.chooseTarget('选择一名角色+1[治疗]',true).set('ai',function(target){
                                if(target.side==player.side&&target.zhiLiao<target.storage.zhiLiaoMax){
                                    return 1;
                                }else if(target.side==player.side&&target.zhiLiao==target.storage.zhiLiaoMax){
                                    return 0;
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
                        }
                    },
                    2:{
                        trigger:{player:'useCard1'},
                        filter:function(event){
                            return event.card.name=='shengDun';
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chooseTarget('选择一名角色+1[治疗]',true).set('ai',function(target){
                                if(target.side==player.side&&target.zhiLiao<target.storage.zhiLiaoMax){
                                    return 1;
                                }else if(target.side==player.side&&target.zhiLiao==target.storage.zhiLiaoMax){
                                    return 0;
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
                        }
                    },
                }
            },
            tianShiZhiQiang:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('tianShiZhiQiang');
				},
				position:'h',
				viewAs:{name:'shengDun'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('tianShiZhiQiang');
                    })&&_status.currentPhase==player;
				},
            },
            tianShiZhiGe:{
                enable:['phaseUse'],
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
                    player.chooseTarget('选择1个有基础效果的目标角色',function(card,player,target){
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
                        player.chooseControl(list).set('prompt','选择要移的除基础效果');
                    }
                    'step 3'
                    if(result.control=='zhongDu'){
                        player.chooseButton(target.getExpansions('zhongDu'),true,'选择要移除的中毒')
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
                    var list=target.getExpansions('zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    target.loseToDiscardpile(card);
                    event.trigger('yiChuJiChuXiaoGuo');
                }
            },
            shenZhiBiHu:{
                trigger:{global:'changeShiQiBegin'},
                filter:function(event,player){
                    if(event.side!=player.side){
                        return false;
                    }
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    if(event.type!='damage'){
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
                content:function(player){
                    'step 0'
                    var list=[];
                    for(var i=0;i<player.countMark('_tiLian_r');i++){
                        list.push('宝石');
                    }
                    for(var i=0;i<player.countMark('_tiLian_b');i++){
                        list.push('水晶');
                    }
                    var next=player.chooseButton([
						'使用多少星石来抵挡等量的士气下降',
						[list,'tdnodes'],
					]);
					next.set('forced',true);
					next.set('selectButton',[0,-trigger.num]);
					next.set('ai',function(button){
						return 1;
					});
                    'step 1'
                    var num=result.links.length;
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
                }
            },
            
            //神箭手
            shanDianJian:{
                forced:true,
                trigger:{player:"useCardToPlayer"},
                filter:function(event){
                    if(get.suit(event.card)=='lei'&&get.type(event.card)=='gongJi'){
                        return true;
                    }
                    return false;
                },
                content:function(){
                    trigger.parent.canYingZhan=false;
                }
            },
            guanChuanSheJi:{
                trigger:{source:"gongJiUnhirt"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(player.countCards(card=>card.type=='faShu')){
                        return true;
                    }
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,true,'弃置1张法术牌',function(card){
                        return get.type(card)=='faShu';
                    })
                    'step 1'
                    player.showCards(result.cards);
                    var next=trigger.player.damage(2,player);
                    next.faShu=true;
                    
                }
            },
            shanGuangXianJing:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('shanGuangXianJing');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'shanGuangXianJing'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('shanGuangXianJing');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张闪光陷阱',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('shanGuangXianJing')){
                            range[0]=1;
                            range[1]=1;
                        }
					},
				},
                group:['shanGuangXianJing_zhiXing'],
            },
            shanGuangXianJing_zhiXing:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event){
                    return event.card.name=='faShu'&&event.card.hasNature('shanGuangXianJing');
                },
                content:function(trigger){
                    var next=trigger.target.damage(2,player);
                    next.faShu=true;
                },
            },
            jingZhunSheJi:{
                trigger:{player:'useCard1'},
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
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&_status.currentPhase==player;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget(1,true,'选择【狙击】的目标角色');
                    'step 2'
                    result.targets[0].drawTo(5);
                    player.gongJi();
                }
            },
            
            //魔法少女
            moBaoChongJi:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='faShu')&&_status.currentPhase==player;
                },
                content:function(player){
                    'step 0'
                    player.chooseToDiscard(1,'弃置1张法术牌',true,function(card){
                        return get.type(card)=='faShu';
                    });
                    'step 1'
                    player.showCards(result.cards);
                    if(player.side==true){
                        if(game.hongZhanJi.length<5){
                            player.changeZhanJi('r',1);
                        }
                    }else if(player.side==false){
                        if(game.lanZhanJi.length<5){
                            player.changeZhanJi('r',1);
                        }
                    }
                    player.chooseTarget(2,'选择2名目标对手',true,function(card,player,target){
                        if(target.side!=player.side){
                            return true;
                        };
                    });
                    'step 2'
                    player.storage.moBaoChongJi=result.targets.sortBySeat();
                    'step 3'
                    var target=player.storage.moBaoChongJi[0];
                    target.chooseToDiscard(1,function(card){
                        return get.type(card)=='faShu';
                    }).set('ai',function(){
                        return 1;
                    })
                    'step 4'
                    if(result.bool){
                        var target=player.storage.moBaoChongJi[0];
                        target.showCards(result.cards);
                    }else{
                        var target=player.storage.moBaoChongJi[0];
                        var next=target.damage(2,player);
                        next.faShu=true;
                        if(player.countCards('h')>=1){
                            player.chooseToDiscard(1,true);
                        }
                    }
                    'setp 5'
                    var target=player.storage.moBaoChongJi[1];
                    target.chooseToDiscard(1,function(card){
                        return get.type(card)=='faShu';
                    }).set('ai',function(){
                        return 1 ;
                    })
                    'step 6'
                    if(result.bool){
                        var target=player.storage.moBaoChongJi[1];
                        target.showCards(result.cards);
                    }else{
                        var target=player.storage.moBaoChongJi[1];
                        var next=target.damage(2,player);
                        next.faShu=true;
                        if(player.countCards('h')>=1){
                            player.chooseToDiscard(1,true);
                        }
                    }
                }
            },
            moDanZhangWo:{
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(game.moDan_shunShiZhen==true){
                        return false;
                    }
                    if(player.countCards('h',function(card){
                        return get.name(card)=='moDan'||get.suit(card)=='di'||get.suit(card)=='huo';
                    })){
                        return true;
                    }
                    return false;
                },
                content:function(){
                    'step 0' 
                    game.broadcastAll(function(){
                        game.moDan_shunShiZhen=true;
                    });
                    player.storage.moDan=true;
                    'step 1'
                    player.chooseToUse(function(card){
                        return card.name=='moDan';
                    });
                    'step 2'
                    player.storage.moDan=false;
                    if(!result.bool){
                        game.broadcastAll(function(){
                            game.moDan_shunShiZhen=false;
                        });
                        player.chooseToUse(true);
                    }
                }
            },
            moDanRongHe:{
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return get.suit(card)=='di'||get.suit(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return get.suit(card)=='di'||get.suit(card)=='huo';
                    });
				},
				prompt:'将地系或火系牌当作【魔弹】',
            },
            huiMieFengBao:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&_status.currentPhase==player;
                },
                content:function(player){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.chooseTarget(2,'选择2名目标对手',true,function(card,player,target){
                        if(target.side!=player.side){
                            return true;
                        };
                    });
                    'step 2'
                    for(var target of result.targets.sortBySeat()){
                        var next=target.damage(2,player);
                        next.faShu=true;
                    }
                }
            },

            //女武神
            shenShengZhuiJi:{
                group:['shenShengZhuiJi_1','shenShengZhuiJi_2'],
                subSkill:{
                    1:{
                        trigger:{player:'usCardAfter'},
                        filter:function(event,player){
                            if(get.type(event.card)=='gongJi'){
                                if(event.yingZhan==true) return false;
                            }else if(get.type(event.card)=='faShu'){
                                if(_status.currentPhase!=player) return false;
                            }
                            return player.zhiLiao>=1;
                        },
                        content:function(){
                            player.changeZhiLiao(-1);
                            player.gongJi();
                        }
                    },
                    2:{
                        trigger:{player:'useSkillAfter'},
                        filter:function(event,player){
                            var info=get.info(event.skill);
                            return info.faShu&&player.zhiLiao>=1;
                        },
                        content:function(player){
                            player.changeZhiLiao(-1);
                            player.gongJi()
                        }
                    },
                }
            },
            zhiXuZhiYin:{
                faShu:true,
                enable:['chooseToUse','faShu'],
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.changeZhiLiao(1);
                    player.changeNengLiang('b');
                }
            },
            hePingXingZhe:{
                group:'hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                content:function(){
                    player.storage.yingLingXingTai=true;
                    player.link();
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
                                player.storage.yingLingXingTai=false;
                            }
                            
                        }
                    }
                }
            },
            junShenWeiGuan:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.storage.yingLingXingTai==true;
                },
                content:function(){
                    'step 0'
                    var list=['你+1[治疗]，[重置]脱离【英灵形态】','(移除我方【战绩区】X个星石，X<3)目标角色+X[治疗]'];
                    player.chooseControl(list).set('prompt','军光神威：选择一项');
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        if(player.isLinked()){
                            player.link();
                            player.storage.yingLingXingTai=false;
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
                        next.set('selectButton',[0,2]);
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
                    player.chooseToDiscard(1,'英灵召唤：弃置1张法术牌[展示]，本次攻击伤害额外+1',function(card){
                        return get.type(card)=='faShu';
                    });
                    'step 3'
                    if(result.bool){
                        player.showCards(result.cards);
                        trigger.parent.baseDamage+=1;
                    }
                    'step 4'
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
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countMark('yuanSu')>=3&&_status.currentPhase==player;
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
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('yunShi');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'yunShi'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('yunShi');
                    })&&_status.currentPhase==player;
				},
				prompt:'对目标角色造成1点法术伤害③，额外+1法术行动',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('yunShi')){
                            range[0]=1;
                            range[1]=1;
                        }
					}
				},
                group:['yunShi1','yunShi2','yunShi3'],
            },
            yunShi1:{
                forced:true,
                trigger:{player:"useCard1"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('yunShi');
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'陨石：弃置一张地系牌[展示]本次伤害额外+1。',function(card){
                        return get.suit(card)=='di';
                    });
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.storage.yunShi=true;
                    }
                }
            },
            yunShi2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('yunShi');
                },
                content:function(){
                    var num=1;
                    if(player.storage.yunShi==true){
                        num+=1;
                        player.storage.yunShi=false;
                    }
                    trigger.targets[0].damage(num,player).set('faShu',true);
                }
            },
            yunShi3:{
                trigger:{player:'useCardAfter'},
                forced:true,
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('yunShi');
                },
                content:function(){
                    player.faShu('陨石：法术行动');
                }
            },
            bingDong:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('bingDong');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'bingDong'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('bingDong');
                    })&&_status.currentPhase==player;
				},
				prompt:'对目标角色造成1点法术伤害③，并指定1名角色+1[治疗]',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('bingDong')){
                            range[0]=1;
                            range[1]=1;
                        }
					}
				},
                group:['bingDong1','bingDong2'],
            },
            bingDong1:{
                forced:true,
                trigger:{player:"useCard1"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('bingDong');
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'冰冻：弃置一张水系牌[展示]本次伤害额外+1。',function(card){
                        return get.suit(card)=='shui';
                    });
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.storage.bingDong=true;
                    }
                }
            },
            bingDong2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('bingDong');
                },
                content:function(){
                    'step 0'
                    var num=1;
                    if(player.storage.bingDong==true){
                        num+=1;
                        player.storage.bingDong=false;
                    }
                    trigger.targets[0].damage(num,player).set('faShu',true);
                    'step 1'
                    player.chooseTarget(1,'冰冻：选择1名角色+1[治疗]',true);
                    'step 2'
                    if(result.bool){
                        result.targets[0].changeZhiLiao(1);
                    }
                }
            },
            huoQou:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('huoQou');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'huoQou'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('huoQou');
                    })&&_status.currentPhase==player;
				},
				prompt:'对目标角色造成2点法术伤害③',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('huoQou')){
                            range[0]=1;
                            range[1]=1;
                        }
					}
				},
                group:['huoQou1','huoQou2'],
            },
            huoQou1:{
                forced:true,
                trigger:{player:"useCard1"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('huoQou');
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'火球：弃置一张火系牌[展示]本次伤害额外+1。',function(card){
                        return get.suit(card)=='huo';
                    });
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.storage.huoQou=true;
                    }
                }
            },
            huoQou2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('huoQou');
                },
                content:function(){
                    var num=2;
                    if(player.storage.huoQou==true){
                        num+=1;
                        player.storage.huoQou=false;
                    }
                    trigger.targets[0].damage(num,player).set('faShu',true);
                }
            },
            fengRen:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('fengRen');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'fengRen'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('fengRen');
                    })&&_status.currentPhase==player;
				},
				prompt:'对目标角色造成1点法术伤害③，额外+1攻击行动',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('fengRen')){
                            range[0]=1;
                            range[1]=1;
                        }
					}
				},
                group:['fengRen1','fengRen2','fengRen3'],
            },
            fengRen1:{
                forced:true,
                trigger:{player:"useCard1"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('fengRen');
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'风刃：弃置一张风系牌[展示]本次伤害额外+1。',function(card){
                        return get.suit(card)=='feng';
                    });
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.storage.fengRen=true;
                    }
                }
            },
            fengRen2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('fengRen');
                },
                content:function(){
                    var num=1;
                    if(player.storage.fengRen==true){
                        num+=1;
                        player.storage.fengRen=false;
                    }
                    trigger.targets[0].damage(num,player).set('faShu',true);
                }
            },
            fengRen3:{
                trigger:{player:'useCardAfter'},
                forced:true,
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('fengRen');
                },
                content:function(){
                    player.gongJi('风刃：攻击行动');
                }
            },
            leiJi:{
                faShu:true,
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('leiJi');
				},
				position:'h',
				viewAs:{name:'faShu',nature:'leiJi'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('leiJi');
                    })&&_status.currentPhase==player;
				},
				prompt:'打出一张雷击',
                mod:{
					selectTarget:function(card,player,range){
                        if(card.name=='faShu'&&card.hasNature('leiJi')){
                            range[0]=1;
                            range[1]=1;
                        }
					}
				},
                group:['leiJi1','leiJi2'],
            },
            leiJi1:{
                forced:true,
                trigger:{player:"useCard1"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('leiJi');
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'雷击：弃置一张雷系牌[展示]本次伤害额外+1。',function(card){
                        return get.suit(card)=='lei';
                    });
                    'step 1'
                    if(result.bool){
                        player.showCards(result.cards);
                        player.storage.leiJi=true;
                    }
                }
            },
            leiJi2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.name=='faShu'&&event.card.hasNature('leiJi');
                },
                content:function(){
                    var num=1;
                    if(player.storage.leiJi==true){
                        num+=1;
                        player.storage.leiJi=false;
                    }
                    trigger.targets[0].damage(num,player).set('faShu',true);
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
                faShu:true,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return _status.currentPhase==player&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var num=player.countNengLiang('r')+player.countNengLiang('b')+1;
                    event.num=num;
                    player.chooseTarget(1,'月光：选择1名角色造成'+num+'点法术伤害',true);
                    'step 2'
                    if(result.bool){
                        var target=result.targets[0];
                        var next=target.damage(event.num,player);
                        next.faShu=true;
                    }
                }
            },
            yuanSu:{
                intro:{
                    name:'元素',
                    content:'mark',
                },
                markimage:'image/card/hong.png',
            }

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

            //公共技能
            _xuRuo:"虚弱",
            _zhongDu:"中毒",
            _shengDun:"圣盾",
            _shengGuang:"圣光",
            _yingZhan:"应战",
            _moDan:"魔弹",
            _heCheng:"合成",
            _gouMai:"购买",
            _tiLian:"提炼",
            _gongJiXingShi:"攻击星石",
            _quXiao:'取消',

            //牌可转化的技能
            'xueYingKuangDao|xueZhiBeiMing':"血影狂刀<br>血之悲鸣",
            'jiFengJi|shanGuangXianJing':"疾风技<br>闪光陷阱",
            'weiLiCiFu|bingDong':"威力赐福<br>冰冻",
            'zhiYuZhiGuang|tianShiZhiQiang':"治愈之光<br>天使之墙",
            'shuiZhiFengYin|lingHunFuYu':"水之封印<br>灵魂赋予",
            'shuiZhiFengYin|lingHunZhenBao':"水之封印<br>灵魂震爆",
            'huoZhiFengYin|lingHunZhenBao':"火之封印<br>灵魂震爆",
            'xueXingPaoXiao|xueZhiBeiMing':"血腥咆哮<br>血之悲鸣",
            'jiFengJi|shanGuangXianJing':"疾风技<br>闪光陷阱",
            'weiLiCiFu|huoQou':"威力赐福<br>火球",
            'zhiLiaoShu|tianShiZhiQiang':'治疗术<br>天使之墙',
            'fengZhiFengYin|lingHunFuYu':"风之封印<br>灵魂赋予",
            'lieFengJi|jingZhunSheJi':"烈风技<br>精准射击",
            'jiFengJi|jingZhunSheJi':"疾风技<br>精准射击",
            'xunJieCiFu|fengRen':"迅捷赐福<br>风刃",
            'leiZhiFengYin|linHunZhenBao':"雷之封印<br>灵魂震爆",
            'xunJieCiFu|leiJi':"迅捷赐福<br>雷击",
            'weiLiCiFu|yunShi':"威力赐福<br>陨石",
            'xunJieCiFu|yunShi':"迅捷赐福<br>陨石",
            'diZhiFengYin|lingHunZhenBao':"地之封印<br>灵魂震爆",
            'zhiLiaoShu':"治疗术",
            'diZhiFengYin|lingHunFuYu':"地之封印<br>灵魂赋予",
            
            //风之剑圣
            fengNuZhuiJi:'[响应]风怒追击[回合限定]',
            fengNuZhuiJi_info:"(攻击行动结束后发动)额外+1风系攻击行动",
            shengJian:'[被动]圣剑',
            shengJian_info:"若你的主动攻击为本次行动阶段的第3次攻击行动，则此攻击强制命中。本次攻击行动结束时，你摸X张牌，弃X张牌（X<4）。",
            lieFengJi:"(独)[响应]烈风技",
            lieFengJi_info:"(攻击的目标拥有圣盾时发动)无视对手圣盾的效果,且此攻击对手无法应战。",
            jiFengJi:"(独)[响应]疾风技",
            jiFengJi_info:"(作为主动攻击打出后发动)额外+1攻击行动。",
            jianYing:"[响应]剑影[回合限定]",
            jianYing_info:"[水晶](攻击行动结束后发动)额外+1攻击行动。",

            //狂战士
            kuangHua:"[被动]狂化",
            kuangHua_info:"你发动的所有攻击伤害额外+1；(攻击命中时②，若你的手牌数>3)本次攻击伤害额外+1。",
            xueYingKuangDao:"(独)[响应]血影狂刀",
            xueYingKuangDao_info:"(作为主动攻击打出时发动)<br>·若命中手牌为2的对手②，本次攻击伤害额外+2；<br>·若命中手牌为3的对手②，本次攻击伤害额外+1。",
            xueXingPaoXiao:"(独)[响应]血腥咆哮",
            xueXingPaoXiao_info:'(作为主动攻击打出时发动)若攻击的目标拥有的治疗为2，则本次攻击强制命中。',
            siLie:"撕裂",
            siLie_info:"[宝石](攻击命中后发动②)本次攻击伤害额外+2。",

            //圣女
            bingShuangDaoYan:"[被动]冰霜祷言",
            bingShuangDaoYan_info:"(每当你使用水系牌或【圣光】时发动时发动)目标角色+1[治疗]。",
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
            fanShi_info:"(承受攻击伤害时发动⑥)攻击你的对手摸1长牌[强制]。",
            shuiYing:"[响应]水影",
            shuiYing_info:"(除【特殊行动】外，当你摸牌前发动)弃X张水系牌[展示]；(若你处于【潜行】效果下)你可额外弃1张法术牌[展示]。",
            qianXing:"[启动]潜行",
            qianXing_info:"[宝石]你可选择摸1张牌，[横置]持续到你的下个行动阶段开始，你的手牌上限-1；你不能成为主动攻击的目标；你的主动攻击对手无法应战且伤害额外+X，X为你剩余的【能量】数。【潜行】的效果结束时[重置]。",

            //封印师
            faShuJiDang:"[响应]法术激荡",
            faShuJiDang_info:"(法术行动结束后发动)额外+1攻击行动。",
            diZhiFengYin:"(独)[法术]地之封印",
            diZhiFengYin_info:"(将【地之封印】放置于目标对手面前)该对手获得(直到他从手中打出或展示出地系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            shuiZhiFengYin:"(独)[法术]水之封印",
            shuiZhiFengYin_info:"(将【水之封印】放置于目标对手面前)该对手获得(直到他从手中打出或展示出水系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            huoZhiFengYin:"(独)[法术]火之封印",
            huoZhiFengYin_info:"(将【火之封印】放置于目标对手面前)该对手获得(直到他从手中打出或展示出火系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            fengZhiFengYin:"(独)[法术]风之封印",
            fengZhiFengYin_info:"(将【风之封印】放置于目标对手面前)该对手获得(直到他从手中打出或展示出风系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            leiZhiFengYin:"(独)[法术]雷之封印",
            leiZhiFengYin_info:"(将【雷之封印】放置于目标对手面前)该对手获得(直到他从手中打出或展示出雷系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            wuXiShuFu:"(专)[法术]五系束缚",
            wuXiShuFu_info:"[水晶](将【五系束缚】放置于目标对手面前)该对手跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸(2+X)张牌来取消【五系束缚】的效果。X为场上封印的数量，X最高为2。无论效果是否发动，触发后移除此牌。",
            fengYinPoSui:"[法术]封印破碎",
            fengYinPoSui_info:"[水晶]将场上任意一张基础效果牌收入自己手中。",

            
            //天使
            fengZhiJieJing:'[法术]风之洁净',
            fengZhiJieJing_info:"(弃1张风系牌[展示])移除场上任意一个基础效果。",
            tianShiZhuFu:"[法术]天使祝福",
            tianShiZhuFu_info:"(弃1张水系牌[展示])目标角色给你2张牌或指定2名角色各给你1张牌。",
            tianShiJiBan:"[被动]天使羁绊",
            tianShiJiBan_info:"(每当你移除场上任意一个基础效果或使用【圣盾】时)目标角色+1[治疗]。",
            tianShiZhiQiang:"(独)[法术]天使之墙",
            tianShiZhiQiang_info:"可作为【圣盾】使用。",
            tianShiZhiGe:"[响应]天使之歌(回合限定)",
            tianShiZhiGe_info:"[水晶](在你的回合开始内发动)移除场上任意一个基础效果。",
            shenZhiBiHu:"[响应]神之庇护",
            shenZhiBiHu_info:"X[水晶]为我方抵御X点因法术伤害而造成的士气下降。",

            //神箭手
            shanDianJian:"[被动]闪电箭",
            shanDianJian_info:"你的雷系攻击对手无法应战。",
            guanChuanSheJi:"[响应]贯穿射击",
            guanChuanSheJi_info:"(主动攻击未命中时发动①，弃1张法术牌[展示])对你所攻击的目标造成2点法术伤害③。",
            shanGuangXianJing:'(独)[法术]闪光陷阱',
            shanGuangXianJing_info:"对目标角色造成2点法术伤害③。",
            jingZhunSheJi:"(独)[响应]精准射击",
            jingZhunSheJi_info:"此攻击强制命中，但本次攻击伤害-1。",
            juJi:"[法术]狙击",
            juJi_info:"[水晶]目标角色手牌补到5张[强制]，额外+1攻击行动",

            //魔法少女
            moBaoChongJi:'[法术]魔爆冲击',
            moBaoChongJi_info:'(弃1张法术牌[展示])我方[战绩区]+1[水晶]。2名目标对手各弃一张法术牌[展示]，每有人不如此做，你对他造成2点法术伤害③，你弃一张牌。',
            moDanZhangWo:'[响应]魔弹掌握',
            moDanZhangWo_info:'你主动使用【魔弹】时可以选择逆向传递。',
            moDanRongHe:'[响应]魔弹融合',
            moDanRongHe_info:'你的地系或火系牌可以当【魔弹】使用。',
            huiMieFengBao:'[法术]毁灭风暴',
            huiMieFengBao_info:'[宝石]对2名目标对手各造成2点法术伤害③。',

            //女武神
            shenShengZhuiJi:"[响应]神圣追击",
            shenShengZhuiJi_info:"(攻击或法术行动结束后，移除你的1[治疗])额外+1攻击行动。",
            zhiXuZhiYin:"[法术]秩序之印",
            zhiXuZhiYin_info:"(摸2张牌[强制])你加+1[治疗]并+1[水晶]。",
            hePingXingZhe:"[被动]和平行者",
            hePingXingZhe_info:"(发动【英灵召唤】后强制触发[强制])[横置]，转入【英灵形态】；(每当你执行主动攻击时发动①)[重置]脱离【英灵形态】。",
            junShenWeiGuan:"[被动]军神威光",
            junShenWeiGuan_info:"(回合开始时，若你处于【英灵形态】)选择以下1项发动：<br>·你+1[治疗]，[重置]脱离【英灵形态】；<br>·(移除我方【战绩区】X个星石，X<3)目标角色+X[治疗]。",
            yingLingZhaoHuan:"[响应]英灵召唤",
            yingLingZhaoHuan_info:"[水晶](攻击命中时发动②)本次攻击伤害额外+1，(若你额外弃置1张法术牌[展示])本次攻击伤害额外+1。",

            //元素师
            yuanSuXiShou:'[响应]元素吸收',
            yuanSuXiShou_info:'(对目标角色造成法术伤害时发动③)你+1【元素】。',
            yuanSuDianRan:'[法术]元素点燃',
            yuanSuDianRan_info:'(移除3点【元素】)对目标角色造成2点法术伤害③，额外+1法术行动；不能与【元素吸收】同时发动。',
            yunShi:'(独)[法术]陨石',
            yunShi_info:'对目标角色造成1点法术伤害③，额外+1法术行动；(若你额外弃1张地系牌[展示]①)本次伤害额外+1。',
            bingDong:'(独)[法术]冰冻',
            bingDong_info:'对目标角色造成1点法术伤害③，并指定1名角色+1[治疗](若你额外弃1张水系牌[展示]①)本次伤害额外+1。',
            huoQou:'(独)[法术]火球',
            huoQou_info:'对目标角色造成2点法术伤害③，(若你额外弃1张火系牌[展示]①)，本次伤害额外+1。',
            fengRen:'(独)[法术]风刃',
            fengRen_info:'对目标角色造成1点法术伤害③，额外+1攻击行动；(若你额外弃1张风系牌[展示]①)本次伤害额外+1。',
            leiJi:'(独)[法术]雷击',
            leiJi_info:'对目标角色造成1点法术伤害③，我方【战绩区】+1[宝石]；(若你额外弃1张雷系牌[展示]①)本次伤害额外+1。',
            yueGuang:'[法术]月光',
            yueGuang_info:'[宝石]对目标角色造成(X+1)点法术伤害③，X为你剩余的【能量】数。',
            yuanSu:'元素',
            yuanSu_info:'【元素】为元素师专有指示物，上限为3。',
		},
	};
});
