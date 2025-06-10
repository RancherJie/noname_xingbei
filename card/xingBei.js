'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'xingBei',
		connect:true,
		card:{
			anMie:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战其他攻击时打出。\n命中时造成2点攻击伤害。\n暗灭不能被应战。';
				},
				filterTarget:function(card,player,target){
					return target.side!=player.side;
				},
				content:function(){
					"step 0"
					target.damage(event.damageNum);
				},
				ai:{
					basic:{
						useful:[8,3,1],
						value:[6,4,3],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
				},
			},
			shuiLianZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战水系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					return target.side!=player.side;
				},
				content:function(){
					"step 0"
					target.damage(event.damageNum);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
				},
			},
			huoYanZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战火系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					return target.side!=player.side;
				},
				content:function(){
					"step 0"
					target.damage(event.damageNum);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
				},
			},
			fengShenZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战风系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					return target.side!=player.side;
				},
				content:function(){
					"step 0"
					target.damage(event.damageNum);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
				},
			},
			leiGuangZhan:{
				type:"gongJi",
				enable:true,
				fullskin:true,
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战雷系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					return target.side!=player.side;
				},
				content:function(){
					"step 0"
					target.damage(event.damageNum);
				},
				ai:{

					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
				},
			},
			diLieZhan:{
				type:"gongJi",
				fullskin:true,
				enable:true,
				selectTarget:1,
				cardPrompt:function(card){
					return '主动攻击或应战地系攻击时打出。\n命中时造成2点攻击伤害。';
				},
				filterTarget:function(card,player,target){
					return target.side!=player.side;
				},
				content:function(){
					"step 0"
					target.damage(event.damageNum);
				},
				ai:{
					basic:{
						useful:[5,3,1],
						value:[5,3,1],
					},
					order:function(item,player){
						return 3.05;
					},
					result:{
						target:function(player,target,card,isLink){
							return get.damageEffect(target,2);
						},
					},
				},
			},
			shengGuang:{
				type:"faShu",
				fullskin:true,
				notarget:true,
				content:function(){

				},
				ai:{
					order:3,
					basic:{
						useful:[7,4,2],
						value:[7,4,2],
					},
					result:{player:1},
				}
			},
			shengDun:{
				type:'faShu',
				fullskin:true,
				enable:true,
				selectTarget:1,
				filterTarget:function(event,player,target){
					if(target.hasExpansions('_shengDun')){
						return false;
					}else{
						return true;
					}
				},
				content:function(){
					target.addToExpansion(event.cards,'gain2',player).gaintag.add('_shengDun');
				},
				ai:{
					order:function(item,player){
						var num=game.filterPlayer(function(current){
							return current.side==player.side&&current.countCards('h')+2>=current.getHandcardLimit();
						});
						if(num.length>=1){
							return 3.4;
						}else{
							return 3;
						}
					},
					basic:{
						useful:4,
						value:[3,2,0],
					},
					result:{
						target:function(player,target,card,isLink){
							return 10-(target.getHandcardLimit()-target.countCards('h'));
						},
					},
				},
			},
			xuRuo:{
				type:'faShu',
				fullskin:true,
				enable:true,
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
					order:function(item,player){
						var num=game.filterPlayer(function(current){
							return current.side!=player.side&&current.countCards('h')+3>=current.getHandcardLimit();
						});
						if(num.length>=1){
							return 3.4;
						}else{
							return 3;
						}
					},
					basic:{
						useful:[4,2,1],
						value:[5,3,1],
					},
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					},
				}
			},
			zhongDu:{
				audio:true,
				fullskin:true,
				type:'faShu',
				enable:true,
				selectTarget:1,
				filterTarget:function(target){
					return true
				},
                content:function(){
					target.storage.zhongDu.push(player);
					target.addToExpansion(event.cards,player,'gain2').gaintag.add('_zhongDu');
				},
				ai:{
					order:3,
					basic:{
						useful:3,
						value:[3,2,0],
					},
					result:{
                        target:function(player,target){
							if(target.getHandcardLimit()-3-1<=target.countCards('h')) return -2;
							return -1;
                        }
					}
				}
			},
			moDan:{
				type:"faShu",
				enable:true,
				fullskin:true,
				selectTarget:1,
				filterTarget:function(card,player,target){
					if(game.moDanFangXiang=='zuo'){
						var mubiao=player;
						while(mubiao.storage.moDan==true||mubiao.side==player.side){
							mubiao=mubiao.getPrevious();
						}
						if(target==mubiao){
							return true;
						}
					}else if(game.moDanFangXiang=='you'){
						var mubiao=player;
						while(mubiao.storage.moDan==true||mubiao.side==player.side){
							mubiao=mubiao.getNext();
						}
						if(target==mubiao){
							return true;
						}
					}
					return false;
				},
				content:function(){
					"step 0"
					var next=target.damage(game.moDan);
					next.faShu=true;
					'step 1'
					game.resetMoDan();
				},
				ai:{
					basic:{
						useful:4,
						value:[4,2,0],
					},
					order:function(item,player){
						return 3;
					},
					result:{
						target:function(player,target,card,isLink){
							return -1;
						}
					},
				}	
			},
		},
		translate:{
			an:'暗',
			guang:'光',
			shui:'水',
			huo:'火',
			feng:'风',
			lei:'雷',
			di:'地',
			xue:'血',
			ji:'技',
			yong:'咏',
			huan:'幻',
			sheng:'圣',
			gongJi:'攻击',
			faShu:'法术',

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
            'leiZhiFengYin|lingHunZhenBao':"雷之封印<br>灵魂震爆",
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
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|lingHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|lingHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|lingHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|lingHunZhenBao'],
			["lei",'huan',"leiGuangZhan",'leiZhiFengYin|lingHunZhenBao'],
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
