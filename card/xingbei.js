'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'xingbei',
		connect:true,
		card:{
			damage:{
				ai:{
					result:{
						target:-1.5
					},
					tag:{
						damage:1
					}
				}
			},
			losehp:{
				ai:{
					result:{
						target:-1.5
					},
					tag:{
						loseHp:1
					}
				}
			},
			respondShan:{
				ai:{
					result:{
						target:-1.5,
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:1
					}
				}
			}, 
			anMie:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战其他攻击时打出。\n命中时造成2点攻击伤害。\n暗灭不能被应战。';
				},
				filterTarget:function(card,player,target){
					if(target.side!=player.side){
						return true;
					}
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=2;
					if(typeof event.extraDamage!='number') event.extraDamage=0;
					"step 1"
					event.trigger('gongJiHirt');
					target.damage(event.baseDamage+event.extraDamage);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						if(player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink&&player.hasSkill('jiu')){
									if(!target.hasSkillTag('filterDamage',null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					},
					tag:{
						respond:1,
						respondShan:1,
				},
			
			},
			shuiLianZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战水系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					if(target.side!=player.side){
						return true;
					}
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=2;
					if(typeof event.extraDamage!='number') event.extraDamage=0;
					"step 1"
					event.trigger('gongJiHirt');
					target.damage(event.baseDamage+event.extraDamage);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						if(player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink&&player.hasSkill('jiu')){
									if(!target.hasSkillTag('filterDamage',null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					},
					tag:{
						respond:1,
						respondShan:1,
				},
			},
			huoYanZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战火系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					if(target.side!=player.side){
						return true;
					}
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=2;
					if(typeof event.extraDamage!='number') event.extraDamage=0;
					"step 1"
					event.trigger('gongJiHirt');
					target.damage(event.baseDamage+event.extraDamage);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						if(player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink&&player.hasSkill('jiu')){
									if(!target.hasSkillTag('filterDamage',null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					},
					tag:{
						respond:1,
						respondShan:1,
				},
			},
			fengShenZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战风系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					if(target.side!=player.side){
						return true;
					}
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=2;
					if(typeof event.extraDamage!='number') event.extraDamage=0;
					"step 1"
					event.trigger('gongJiHirt');
					target.damage(event.baseDamage+event.extraDamage);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						if(player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink&&player.hasSkill('jiu')){
									if(!target.hasSkillTag('filterDamage',null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					},
					tag:{
						respond:1,
						respondShan:1,
				},
			},
			leiGuangZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战雷系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					if(target.side!=player.side){
						return true;
					}
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=2;
					if(typeof event.extraDamage!='number') event.extraDamage=0;
					"step 1"
					event.trigger('gongJiHirt');
					target.damage(event.baseDamage+event.extraDamage);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						if(player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink&&player.hasSkill('jiu')){
									if(!target.hasSkillTag('filterDamage',null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					},
					tag:{
						respond:1,
						respondShan:1,
				},
			},
			diLieZhan:{
				type:"gongJi",
				fullskin:true,
				enable:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战地系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					if(target.side!=player.side){
						return true;
					}
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=2;
					if(typeof event.extraDamage!='number') event.extraDamage=0;
					"step 1"
					event.trigger('gongJiHirt');
					target.damage(event.baseDamage+event.extraDamage);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						if(player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))){
							if(game.hasPlayer(function(current){
								return current!=player&&current.isLinked()&&player.canUse(item,current,null,true)&&get.effect(current,item,player,player)>0&&lib.card.sha.ai.canLink(player,current,item);
							})&&game.countPlayer(function(current){
								return current.isLinked()&&get.damageEffect(current,player,player,get.nature(item))>0;
							})>1) return 3.1;
							return 3;
						}
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(!isLink&&player.hasSkill('jiu')){
									if(!target.hasSkillTag('filterDamage',null,{
										player:player,
										card:card,
										jiu:true,
									})){
										if(get.attitude(player,target)>0){
											return -7;
										}
										else{
											return -4;
										}
									}
									return -0.5;
								}
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					},
					tag:{
						respond:1,
						respondShan:1,
				},
			},
			shengGuang:{
				type:"faShu",
				fullskin:true,
				content:function(){

				},
				ai:{
					order:3,
					basic:{
						useful:[7,5.1,2],
						value:[7,5.1,2],
					},
					result:{player:1},
				}
			},
			shengDun:{
				type:'faShu',
				fullskin:true,
				enable:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				filterTarget:function(event,player,target){
					if(target.hasExpansions('_shengDun')){
						return false;
					}else{
						return true;
					}
				},
				content:function(){
					target.addToExpansion(event.cards,'gain2').gaintag.add('_shengDun');

				},
				ai:{
					order:10,
					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								if(target.side==player.side){
									return 2;
								}
							};
							return eff;
						},
					},
				},
			},
			xuRuo:{
				type:'faShu',
				fullskin:true,
				enable:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				filterTarget:function(event,player,target){
					if(target.hasExpansions('_xuRuo')){
						return false;
					}else{
						return true;
					}
				},
				content:function(){
                    target.addToExpansion(event.cards,player,'gain2').gaintag.add('_xuRuo');

                },
				ai:{
					basic:{
						order:1,
						useful:1,
						value:8,
					},
					result:{
						ignoreStatus:true,
						target:function(player,target){
							var num=target.hp-target.countCards('h')-2;
							if(num>-1) return -0.01;
							if(target.hp<3) num--;
							if(target.isTurnedOver()) num/=2;
							var dist=get.distance(player,target,'absolute');
							if(dist<1) dist=1;
							return num/Math.sqrt(dist)*get.threaten(target,player);
						}
					},
					tag:{
						skip:'phaseUse'
					}
				}
			},
			zhongDu:{
				audio:true,
				fullskin:true,
				type:'faShu',
				enable:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				filterTarget:function(target){
					return true
				},
                content:function(){
					target.storage.zhongDu.push(player);
					target.addToExpansion(event.cards,player,'gain2').gaintag.add('_zhongDu');
				},
				ai:{
					result:{
                        target:function(target){
                            if(target.countCards('h')>=3){
                                return -2;
                            }
                            return -1;
                        }
					}
				}
			},
			moDan:{
				type:"faShu",
				enable:true,
				fullskin:true,
				updateUsable:'phaseUse',
				selectTarget:1,
				filterTarget:function(card,player,target){
					if(game.moDan_shunShiZhen==true||player.hasSkill('moDanZhangWo')){
						var mubiao=player.getPrevious();
						while(mubiao.side==player.side){
							mubiao=mubiao.getPrevious();
							if(mubiao.storage.moDan==true){
								mubiao=mubiao.getPrevious();
							}
						}
						if(target==mubiao) return true;
					}
					{
						var mubiao=player.getNext();
						while(mubiao.side==player.side){
							mubiao=mubiao.getNext();
							if(mubiao.storage.moDan==true){
								mubiao=mubiao.getPrevious();
							}
						}
						if(target==mubiao) return true;
					}
				},
				content:function(){
					"step 0"
					event.baseDamage=game.moDan;
					var next=target.damage(event.baseDamage);
					next.faShu=true;					
				},
				ai:{
					order:2,
					result:{
						target:-2,
					},
					tag:{
						respondShan:1,
					},
				}	
			},
			faShu:{
				fullskin:true,
				type:'faShu',
				enable:true,
				selectTarget:0,
				filterTarget:function(target){
					return true
				},
				content:function(){}
			}
		},
		translate:{
			anMie:"暗灭",
			anMie_info:"主动攻击或应战其他攻击时打出。\n命中时造成2点攻击伤害。\n暗灭不能被应战。",
			shuiLianZhan:"水涟斩",
			shuiLianZhan_info:"主动攻击或应战水系攻击时打出。\n命中时造成2点攻击伤害。",
			huoYanZhan:"火焰斩",
			huoYanZhan_info:"主动攻击或应战火系攻击时打出。\n命中时造成2点攻击伤害。",
			fengShenZhan:"风神斩",
			fengShenZhan_info:"主动攻击或应战风系攻击时打出。\n命中时造成2点攻击伤害。",
			leiGuangZhan:"雷光斩",
			leiGuangZhan_info:"主动攻击或应战雷系攻击时打出。\n命中时造成2点攻击伤害。",
			diLieZhan:"地裂斩",
			diLieZhan_info:"主动攻击或应战地系攻击时打出。\n命中时造成2点攻击伤害。",
			shengGuang:"圣光",
			shengGuang_info:"抵挡一次攻击或者【魔弹】。",
			xuRuo:"虚弱",
			xuRuo_info:"（将此牌放置在一名角色面前）改角色跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸3张牌来取消【虚弱】的效果。不论效果是否发动，触发后移除此牌。",
			zhongDu:'中毒',
			zhongDu_info:"（将此牌放置在一名角色面前）在他的下一个行动阶段开始前，对他造成1点魔法伤害③。触发后移除此牌。同一角色面前允许存在多个【中毒】。",
			shengDun:"圣盾",
			shengDun_info:"（将此牌放置在一名角色面前）在他遭受攻击或者【魔弹】时可以选择移除【圣盾】来抵消该次伤害，触发后移除此牌。（在有【圣盾】的情况下，他不能选择保留【圣盾】直接承受攻击或【魔弹】）。",
			moDan:"魔弹",
			moDan_info:"（将此牌传递给右手边最近的一名对手）若命中，对他造成2点法术伤害；对方可以选择打出一张【魔弹】将此效果传递下去，若如此做，则对他视为未命中且视为【魔弹】的传递者为他。每传递一次伤害额外+1。在同一轮传递中每一名角色只能参与一次。【魔弹】可以被【圣光】或【圣盾】抵挡，效果会因此终止。",

			faShu_info:"独有法术专用",

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
            'zhiLiaoShu|':"治疗术",
            'diZhiFengYin|lingHunFuYu':"地之封印<br>灵魂赋予",
		},
		list:[
			["an",'sheng',"anMie"],
			["an",'sheng',"anMie"],
			["an",'sheng',"anMie"],
			["an",'sheng',"anMie"],
			["an",'yong',"anMie"],
			["an",'yong',"anMie"],
			["shui",'xue',"shuiLianZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["shui",'xue',"shuiLianZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["shui",'xue',"shuiLianZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["shui",'xue',"shuiLianZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["shui",'ji',"shuiLianZhan",'jiFengJi|shanGuangXianJing'],
			["shui",'ji',"shuiLianZhan",'jiFengJi|shanGuangXianJing'],
			["shui",'ji',"shuiLianZhan",'jiFengJi|shanGuangXianJing'],
			["shui",'ji',"shuiLianZhan",'jiFengJi|shanGuangXianJing'],
			["shui",'yong',"shuiLianZhan",'weiLiCiFu|bingDong'],
			["shui",'yong',"shuiLianZhan",'weiLiCiFu|bingDong'],
			["shui",'yong',"shuiLianZhan",'weiLiCiFu|bingDong'],
			["shui",'yong',"shuiLianZhan",'weiLiCiFu|bingDong'], 
			["shui",'yong',"shuiLianZhan",'weiLiCiFu|bingDong'],
			["shui",'yong',"shuiLianZhan",'weiLiCiFu|bingDong'],
			["shui",'sheng',"shuiLianZhan",'zhiYuZhiGuang|tianShiZhiQiang'],
			["shui",'sheng',"shuiLianZhan",'zhiYuZhiGuang|tianShiZhiQiang'],
			["shui",'sheng',"shuiLianZhan",'zhiYuZhiGuang|tianShiZhiQiang'],
			["shui",'huan',"shuiLianZhan",'shuiZhiFengYin|lingHunZhenBao'],
			["shui",'huan',"shuiLianZhan",'shuiZhiFengYin|lingHunZhenBao'],
			["shui",'huan',"shuiLianZhan",'shuiZhiFengYin|lingHunFuYu'],
			["shui",'huan',"shuiLianZhan",'shuiZhiFengYin|lingHunFuYu'],
			["huo",'huan',"huoYanZhan",'huoZhiFengYin|lingHunZhenBao'],
			["huo",'huan',"huoYanZhan",'huoZhiFengYin|lingHunZhenBao'],
			["huo",'huan',"huoYanZhan",'huoZhiFengYin|lingHunZhenBao'],
			["huo",'huan',"huoYanZhan",'huoZhiFengYin|lingHunZhenBao'],
			["huo",'huan',"huoYanZhan",'huoZhiFengYin|lingHunZhenBao'],
			["huo",'xue',"huoYanZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["huo",'xue',"huoYanZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["huo",'xue',"huoYanZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["huo",'xue',"huoYanZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["huo",'ji',"huoYanZhan",'jiFengJi|shanGuangXianJing'],
			["huo",'ji',"huoYanZhan",'jiFengJi|shanGuangXianJing'],
			["huo",'ji',"huoYanZhan",'jiFengJi|shanGuangXianJing'],
			["huo",'ji',"huoYanZhan",'jiFengJi|shanGuangXianJing'],
			["huo",'yong',"huoYanZhan",'weiLiCiFu|huoQou'],
			["huo",'yong',"huoYanZhan",'weiLiCiFu|huoQou'],
			["huo",'yong',"huoYanZhan",'weiLiCiFu|huoQou'],
			["huo",'yong',"huoYanZhan",'weiLiCiFu|huoQou'],
			["huo",'sheng',"huoYanZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["huo",'sheng',"huoYanZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["huo",'sheng',"huoYanZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["huo",'sheng',"huoYanZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["feng",'huan',"fengShenZhan",'fengZhiFengYin|lingHunFuYu'],
			["feng",'huan',"fengShenZhan",'fengZhiFengYin|lingHunFuYu'],
			["feng",'huan',"fengShenZhan",'fengZhiFengYin|lingHunFuYu'],
			["feng",'huan',"fengShenZhan",'fengZhiFengYin|lingHunFuYu'],
			["feng",'xue',"fengShenZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["feng",'xue',"fengShenZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["feng",'xue',"fengShenZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["feng",'xue',"fengShenZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["feng",'ji',"fengShenZhan",'lieFengJi|jingZhunSheJi'],
			["feng",'ji',"fengShenZhan",'lieFengJi|jingZhunSheJi'],
			["feng",'ji',"fengShenZhan",'jiFengJi|jingZhunSheJi'],
			["feng",'ji',"fengShenZhan",'jiFengJi|jingZhunSheJi'],
			["feng",'ji',"fengShenZhan",'jiFengJi|jingZhunSheJi'],
			["feng",'yong',"fengShenZhan",'xunJieCiFu|fengRen'],
			["feng",'yong',"fengShenZhan",'xunJieCiFu|fengRen'],
			["feng",'yong',"fengShenZhan",'xunJieCiFu|fengRen'],
			["feng",'yong',"fengShenZhan",'xunJieCiFu|fengRen'],
			["feng",'yong',"fengShenZhan",'xunJieCiFu|fengRen'],
			["feng",'sheng',"fengShenZhan",'zhiYuZhiGuang|tianShiZhiQiang'],
			["feng",'sheng',"fengShenZhan",'zhiYuZhiGuang|tianShiZhiQiang'],
			["feng",'sheng',"fengShenZhan",'zhiYuZhiGuang|tianShiZhiQiang'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|linHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|linHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|linHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|linHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|linHunZhenBao'],
			["lei",'xue',"leiGuangZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["lei",'xue',"leiGuangZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["lei",'xue',"leiGuangZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["lei",'xue',"leiGuangZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["lei",'ji',"leiGuangZhan",'lieFengJi|jingZhunSheJi'],
			["lei",'ji',"leiGuangZhan",'lieFengJi|jingZhunSheJi'],
			["lei",'ji',"leiGuangZhan",'jiFengJi|jingZhunSheJi'],
			["lei",'ji',"leiGuangZhan",'jiFengJi|jingZhunSheJi'],
			["lei",'yong',"leiGuangZhan",'xunJieCiFu|leiJi'],
			["lei",'yong',"leiGuangZhan",'xunJieCiFu|leiJi'],
			["lei",'yong',"leiGuangZhan",'xunJieCiFu|leiJi'],
			["lei",'yong',"leiGuangZhan",'xunJieCiFu|leiJi'],
			["lei",'sheng',"leiGuangZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["lei",'sheng',"leiGuangZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["lei",'sheng',"leiGuangZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["lei",'sheng',"leiGuangZhan",'zhiLiaoShu|tianShiZhiQiang'],
			["di",'sheng',"diLieZhan",'zhiLiaoShu|'],
			["di",'sheng',"diLieZhan",'zhiLiaoShu|'],
			["di",'sheng',"diLieZhan",'zhiLiaoShu|'],
			["di",'ji',"diLieZhan",'lieFengJi|jingZhunSheJi'],
			["di",'ji',"diLieZhan",'lieFengJi|jingZhunSheJi'],
			["di",'ji',"diLieZhan",'lieFengJi|jingZhunSheJi'],
			["di",'ji',"diLieZhan",'lieFengJi|jingZhunSheJi'],
			["di",'ji',"diLieZhan",'lieFengJi|jingZhunSheJi'],
			["di",'xue',"diLieZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["di",'xue',"diLieZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["di",'xue',"diLieZhan",'xueYingKuangDao|xueZhiBeiMing'],
			["di",'xue',"diLieZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["di",'xue',"diLieZhan",'xueXingPaoXiao|xueZhiBeiMing'],
			["di",'yong',"diLieZhan",'weiLiCiFu|yunShi'],
			["di",'yong',"diLieZhan",'weiLiCiFu|yunShi'],
			["di",'yong',"diLieZhan",'xunJieCiFu|yunShi'],
			["di",'yong',"diLieZhan",'xunJieCiFu|yunShi'],
			["di",'huan',"diLieZhan",'diZhiFengYin|lingHunZhenBao'],
			["di",'huan',"diLieZhan",'diZhiFengYin|lingHunZhenBao'],
			["di",'huan',"diLieZhan",'diZhiFengYin|lingHunFuYu'],
			["di",'huan',"diLieZhan",'diZhiFengYin|lingHunFuYu'],

			["guang",'huan',"shengGuang"],
			["guang",'huan',"shengGuang"],
			["guang",'sheng',"shengGuang",'zhiLiaoShu|'],
			["guang",'xue',"shengGuang"],
			["guang",'xue',"shengGuang"],
			["guang",'xue',"shengGuang"],
			["guang",'ji',"shengGuang"],
			["guang",'ji',"shengGuang"],
			["guang",'ji',"shengGuang"],
			["guang",'sheng',"shengGuang",'zhiLiaoShu|'],
			["guang",'sheng',"shengGuang",'zhiLiaoShu|'],

			['shui','yong',"xuRuo"],
			['shui','xue',"xuRuo"],
			['huo','xue',"xuRuo"],
			['huo','sheng',"xuRuo"],
			['di','ji',"xuRuo"],
			['feng','huan',"xuRuo"],

			['shui','huan',"zhongDu"],
			['shui','ji',"zhongDu"],
			['shui','sheng',"zhongDu"],
			['di','yong',"zhongDu"],
			['feng','sheng',"zhongDu"],
			['lei','ji',"zhongDu"],

			['huo','xue',"shengDun"],
			['huo','ji',"shengDun"],
			['di','huan',"shengDun"],
			['di','yong',"shengDun"],
			['di','sheng',"shengDun"],
			['feng','xue',"shengDun"],
			['feng','yong',"shengDun"],
			['feng','sheng',"shengDun"],
			['lei','xue',"shengDun"],
			['lei','huan',"shengDun"],

			['shui','huan',"moDan"],
			['shui','xue',"moDan"],
			['huo','yong',"moDan"],
			['feng','huan',"moDan"],
			['lei','ji',"moDan"],
			['lei','sheng',"moDan"],	


		],
	};
});
