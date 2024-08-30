'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenZiJiangLin',
		connect:true,
        characterSort:{
            shenZiJiangLin:{
                "3星":['jinGuiZhiNv'],
                "3.5星":[],
                "4星":['shenMiXueZhe','wuRanZhe'],
                "4.5星":[],
                '5星':['nvPuZhang','jieJieShi'],
            }
        },
		character:{
            //jinGuiZhiNv:['female','yong',3,[],],
            //nvPuZhang:['female','ji',5,[],],
            jieJieShi:['female','huan',5,['jieJieYiShi','huangShenZhiLi','huangShenJiYi','jinMoJing','liuLiJing','jueJie','fuMoJing','jieJie','jiX'],],
            //shenMiXueZhe:['female','yong',4,[],],
            //wuRanZhe:['female','xue',4,[],],
		},
        characterIntro:{
            
        },
		
		skill:{
            //结界师
            jieJieYiShi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return !player.getExpansions('jieJie').length>0;
                },
                selectCard:2,
                discard:false,
                filterCard:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    player.addToExpansion('draw',cards,'log').gaintag.add('jieJie');
                    'step 1'
                    player.addZhiShiWu('jiX');
                },
                ai:{
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            huangShenZhiLi:{
                forced:true,
                trigger:{global:'useCardToTargeted'},
                filter:function(event,player){
                    if(!get.is.gongJi(event.parent)) return false;

                    var cards=player.getExpansions('jieJie');
                    if(cards.length==0) return false;
                    for(var i of cards){
                        if(get.xiBie(event.card)==get.xiBie(i)) return true;
                    }
                    return false;
                },
                firstDo:true,
                priority:1,
                content:function(){
                    trigger.parent.baseDamage++;
                },
                
            },
            huangShenJiYi:{
                trigger:{global:'useCard'},
                filter:function(event,player){
                    if(!get.is.zhuDongGongJi(event)) return false;
                    var cards=player.getExpansions('jieJie');
                    if(cards.length==0) return false;
                    for(var i of cards){
                        if(get.xiBie(event.card)==get.xiBie(i)) return true;
                    }
                    return false;
                },
                lastDo:true,
                priority:1,
                content:function(){
                    'step 0'
                    player.addZhiShiWu('jiX');
                    'step 1'
                    if(player.countZhiShiWu('jiX')>=3){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt','是否额外移除3点【祭】');
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(result.control=='是'){
                        player.removeZhiShiWu('jiX',3);
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(player.countCards('h')>0){
                        player.chooseToDiscard(1,true);
                    }
                    'step 4'
                    var cards=player.getExpansions('jieJie');
                    player.chooseCardButton(cards,true,'移除1个【结界】');
                    'step 5'
                    //game.log(player,'移除了',result.links);
                    player.loseToDiscardpile(result.links).set('jieJie',true);
                    'step 6'
                    player.hengZhi();
                }
            },
            jinMoJing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('jiX')>0;
                },
                filterTarget:function(card,player,target){
                    if(target.hasZhiShiWu('jueJieX')) return false;
                    return true;
                },
                selectCard:1,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('jiX');
                    'step 1'
                    if(player.storage.jueJie_target){
                        player.storage.jueJie_target.removeSkill('jueJieX');
                        player.storage.jueJie_target.removeZhiShiWu('jueJieX');
                    }
                    'step 2'
                    player.storage.jueJie_target=target;
                    target.addSkill('jueJieX');
                    target.addZhiShiWu('jueJieX');
                    target.storage.jueJie_player=player;
                    'step 3'
                    if(player.countCards('h')>0){
                        player.chooseToDiscard(1,true);
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:1,
                    }
                }
            },
            liuLiJing:{
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    return event.side==player.side&&event.num<0&&player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.chongZhi();
                    'step 1'
                    player.addZhanJi('r');
                    'step 2'
                    player.chooseTarget('目标角色弃1张牌[展示]',true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side) return 1;
                        return -1;
                    });
                    'step 3'
                    event.target=result.targets[0];
                    if(event.target.countCards('h')>0){
                        event.target.chooseToDiscard('h',true);
                    }
                    'step 4'
                    event.cards=result.cards;
                    event.target.showCards(event.cards);
                    'step 5'
                    if(player.getExpansions('jieJie').length>=2){
                        event.finish();
                    }else{
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否将${get.translation(event.cards)}作为【结界】`);
                    }
                    'step 6'
                    if(result.control=='是'){
                        player.addToExpansion('draw',event.cards,'log').gaintag.add('jieJie');
                    }
                }
            },
            jueJie:{},
            jueJieX:{
                intro:{
                    name:'(专)绝界',
                    nocount:true,
                    content:`
                    <span class="greentext">[被动]灭界破散</span><br>
                    <span class='tiaoJian'>(结界师的【结界】为0时)</span>结界师[横置]，移除[绝界]。 <span class='tiaoJian'>(拥有此卡的角色回合结束前)</span>结界师移除1个【结界】。<br>
                    <span class="greentext">[响应]白二羯磨</span><br>
                    <span class='tiaoJian'>(若你拥有[绝界]，你的[攻击行动]结束时发动)</span>结界师+1【祭】，你将1个【结界】加入手牌[强制]。<br>
                    <span class="greentext">[被动]虚空境</span><br>
                    <span class='tiaoJian'>(若你拥有[绝界])</span>你拥有的基础效果无法触发。`,
                },
                markimage:'image/card/juejie.png',
                group:['jueJieX_zero','jueJieX_remove','jueJieX_attack'],
                subSkill:{
                    zero:{
                        forced:true,
                        trigger:{global:['loseToDiscardpileEnd','gainEnd']},
                        filter:function(event,player){
                            return event.jieJie==true&&player.storage.jueJie_player.getExpansions('jieJie').length==0;
                        },
                        content:function(){
                            'step 0'
                            player.storage.jueJie_player.hengZhi();
                            'step 1'
                            player.removeZhiShiWu('jueJieX');
                            player.removeSkill('jueJieX');
                        }   
                    },
                    remove:{
                        forced:true,
                        trigger:{player:'phaseEnd'},
                        filter:function(event,player){
                            return player.hasZhiShiWu('jueJieX');
                        },
                        content:function(){
                            'step 0'
                            var cards=player.storage.jueJie_player.getExpansions('jieJie');
                            if(cards.length>0){
                                player.storage.jueJie_player.chooseCardButton(cards,true,'移除1个【结界】');
                            }else{
                                event.finish();
                            }
                            'step 1'
                            //game.log(player,'移除了',result.links);
                            player.storage.jueJie_player.loseToDiscardpile(result.links).set('jieJie',true);
                        }
                    },
                    attack:{
                        trigger:{player:'useCardEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event)&&player.hasZhiShiWu('jueJieX');
                        },
                        content:function(){
                            'step 0'
                            player.storage.jueJie_player.addZhiShiWu('jiX');
                            'step 1'
                            var cards=player.storage.jueJie_player.getExpansions('jieJie');
                            if(cards.length>0){
                                player.chooseCardButton(cards,true,'将1个【结界】加入手牌[强制]');
                            }else{
                                event.finish();
                            }
                            'step 2'
                            game.log(player,'获得了',result.links);
                            player.gain(result.links,'draw').set('jieJie',true);
                        }
                    },
                }
            },
            fuMoJing:{
                trigger:{player:'addZhiShiWuEnd'},
                filter:function(event,player){
                    return event.zhiShiWu=='jiX'&&event.num>0&&player.canBiShaShuiJing();
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseTarget(function(card,player,target){
                        var player=_status.event.player;
                        if(target.side==player.side) return false;
                        return true;
                    });
                    next.set('prompt',get.prompt('fuMoJing'));
                    next.set('prompt2',lib.translate.fuMoJing_info);
                    'step 1'
                    if(result.bool){
                        player.storage.fuMoJing=false;
                        player.logSkill(event.name,result.targets);
                        event.target=result.targets[0];
                        player.removeBiShaShuiJing();
                    }else{
                        event.finish();
                    }
                    
                    'step 2'
                    event.target.damage(1,player).set('fuMoJing',true).set('faShu',true);
                    'step 3'
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else{
                        var list=game.lanZhanJi;
                    }
                    if(player.storage.fuMoJing&&list.length>0){
                        var next=player.chooseButton([
                            '是否移除1个星石',
                            [list,'tdnodes'],
                        ]);
                        //next.set('forced',true);
                        next.set('selectButton',1);
                    }else{
                        event.finish();
                    }
                    'step 4'
                    if(result.bool){
                        if(result.links[0]=='宝石'){
                            player.removeZhanJi("r");
                        }else{
                            player.removeZhanJi("b");
                        }
                    }else{
                        event.finish();
                    }
                    
                    'step 5'
                    player.addNengLiang('b');
                },
                group:'fuMoJing_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiEnd'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').fuMoJing==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.fuMoJing=true;
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },
            jieJie:{
                intro:{
					content:'expansion',
					markcount:'expansion',
				},
            },
            jiX:{
                intro:{
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

        },
		
		translate:{
            jinGuiZhiNv:'矜贵之女',
            nvPuZhang:'女仆长',
            jieJieShi:'结界师',
            shenMiXueZhe:'神秘学者',
            wuRanZhe:'污染者',

            //结界师
            jieJieYiShi:"[法术]结界仪式",
            jieJieYiShi_info:"<span class='tiaoJian'>(将2张手牌面朝上放置在你角色旁[展示]作为【结界】)</span>你+1【祭】。",
            huangShenZhiLi:"[被动]荒神之力",
            huangShenZhiLi_info:"<span class='tiaoJian'>(当【结界】在场时)</span>所有与【结界】系别相同的攻击伤害额外+1。",
            huangShenJiYi:"[响应]\u8352\u795e\u796d\u4eea",
            huangShenJiYi_info:"<span class='tiaoJian'>(目标角色主动攻击时①，若攻击的系别与【结界】相同)</span>你+1【祭】；<span class='tiaoJian'>(若你额外移除3点【祭】)</span>你弃1张牌，移除1个【结界】并[横置][持续]。",
            jinMoJing:"[法术]禁魔境",
            jinMoJing_info:"<span class='tiaoJian'>(移除1点【祭】)</span>将[绝界]转移或放置在目标角色前，你弃1张牌。",
            liuLiJing:"[响应]琉璃境",
            liuLiJing_info:"<span class='tiaoJian'>(我方士气下降时，若你已[横置])</span>[重置]，我方【战绩区】+1[宝石]，指定1名目标角色弃1张牌[展示]，你可将弃牌面朝上放置在你角色旁作为【结界】。",
            jueJie:"(专属)绝界",
            jueJie_info:`
            <span class="greentext">[被动]灭界破散</span><br>
            <span class='tiaoJian'>(结界师的【结界】为0时)</span>结界师[横置]，移除[绝界]。 <span class='tiaoJian'>(拥有此卡的角色回合结束前)</span>结界师移除1个【结界】。<br>
            <span class="greentext">[响应]白二羯磨</span><br>
            <span class='tiaoJian'>(若你拥有[绝界]，你的[攻击行动]结束时发动)</span>结界师+1【祭】，你将1个【结界】加入手牌[强制]。<br>
            <span class="greentext">[被动]虚空境</span><br>
            <span class='tiaoJian'>(若你拥有[绝界])</span>你拥有的基础效果无法触发。`,
            jueJieX_zero:"[响应]灭界破散",
            jueJieX_remove:"[响应]灭界破散",
            jueJieX_attack:"[响应]白二羯磨",
            fuMoJing:"[响应]伏魔境",
            fuMoJing_info:"[水晶]<span class='tiaoJian'>(每当你【祭】增加时发动)</span>对目标对手造成1点法术伤害③；<span class='tiaoJian'>(若因此造成对方士气下降，移除我方【战绩区】1星石)</span>你+1[水晶]。",
            jieJie:"结界",
            jieJie_info:"【结界】为结界师专有展示盖牌，上限为2，不可替换；若【结界】>0，则不能发动【结界仪式】",
            jiX:"祭",
            jiX_info:"【祭】为结界师专有指示物，上限为3。",

        },
	};
});
