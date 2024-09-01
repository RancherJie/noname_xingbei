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
            jinGuiZhiNv:['female','yong',3,['gaoLingZhiHua','moFaRuMen','Magic','qiangYuYuanXing','youQingJiBan'],],
            nvPuZhang:['female','ji',5,['yingZhiXue','miShu','shun','yingFeng','shiFengZhiDao','jinShu','fengXue','zhen','ying','mi'],],
            jieJieShi:['female','huan',5,['jieJieYiShi','huangShenZhiLi','huangShenJiYi','jinMoJing','liuLiJing','jueJie','fuMoJing','jieJie','jiX'],],
            //shenMiXueZhe:['female','yong',4,[],],
            //wuRanZhe:['female','xue',4,[],],
		},
        characterIntro:{
            
        },
		
		skill:{
            //矜贵之女
            gaoLingZhiHua:{
                trigger:{player:'_tiLian_backupEnd'},
                forced:true,
                filter:function(event,player){
                    return event.links.includes('宝石');
                },
                content:function(){
                    player.addNengLiang('b');
                }
            },
            moFaRuMen:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                content:function(){
                    'step 0'
                    if(event.bool){
                        player.chooseTarget('我方2名角色各弃置1张牌',2,true,function(card,player,target){
                            return player.side==target.side;
                        }).set('ai',function(target){
                            return Math.random();
                        });
                    }else{
                        player.draw();
                    }
                    'step 1'
                    if(result.bool){
                        event.targets=result.targets.sortBySeat(player);
                        game.log(player,'选择了',event.targets);
                        event.cards=[];
                    }else{
                        event.cards=result;
                        player.showGaiPai(result);
                        event.goto(5);
                    }

                    'step 2'
                    event.target=event.targets.shift();
                    if(event.target){
                        if(event.target.countCards('h')>0){
                            event.target.chooseToDiscard('h',true).set('ai',function(card){
                                var num=0;
                                if(get.type(card)=='faShu') num++;
                                if(get.mingGe(card)=='yong') num++;
                                if(get.xiBie(card)=='shui') num++;
                                return num;
                            });
                        }
                    }
                    'step 3'
                    if(result.cards.length>0){
                        event.target.showCards(result.cards);
                        event.cards.push(result.cards[0]);
                    }
                    'step 4'
                    event.target.draw();
                    if(event.targets.length>0){
                        event.goto(2);
                    }

                    'step 5'
                    if(event.cards.length>0){
                        event.faShu=false;
                        event.yong=0;
                        event.shui=0;

                        for(var card of event.cards){
                            if(!event.faShu&&get.type(card)=='faShu') event.faShu=true;
                            if(get.mingGe(card)=='yong') event.yong++;
                            if(get.xiBie(card)=='shui') event.shui++;
                        }
                    }else{
                        event.finish();
                    }

                    'step 6'
                    if(event.faShu){
                        player.chooseTarget('对2名目标对手各造成1点法术伤害③',2,true,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return get.damageEffect(target,1);
                        });
                    }
                    'step 7'
                    if(event.faShu){
                        event.targets=result.targets.sortBySeat(player);
                        game.log(player,'选择了',event.targets);
                    }
                    'step 8'
                    if(event.faShu){
                        var target=event.targets.shift();
                        target.damageFaShu(1,player);
                        if(event.targets.length>0){
                            event.redo();
                        }
                    }

                    'step 9'
                    if(event.yong>0){
                        player.chooseTarget(`对${event.yong}名目标角色各造成1点法术伤害③`,true,event.yong).set('ai',function(target){
                            var player=_status.event.player;
                            if(player.side==target.side) return -1;
                            else return get.damageEffect(target,1);
                        });
                    }
                    'step 10'
                    if(event.yong>0){
                        event.targets=result.targets.sortBySeat(player);
                        game.log(player,'选择了',event.targets);
                    }
                    'step 11'
                    if(event.yong>0){
                        var target=event.targets.shift();
                        target.damageFaShu(1,player);
                        if(event.targets.length>0){
                            event.redo();
                        }
                    }

                    'step 12'
                    if(event.shui>0){
                        player.chooseTarget(`${event.shui}名目标角色各+1点[治疗]`,true,event.shui).set('ai',function(target){
                            var player=_status.event.player;
                            if(player.side!=target.side) return 0;
                            return get.zhiLiaoEffect(target,1);
                        });
                    }
                    'step 13'
                    if(event.shui>0){
                        event.targets=result.targets.sortBySeat(player);
                        game.log(player,'选择了',event.targets);
                    }
                    'step 14'
                    if(event.shui>0){
                        var target=event.targets.shift();
                        target.changeZhiLiao(1);
                        if(event.targets.length>0){
                            event.redo();
                        }
                    }
                },
                ai:{
                    order:function(card,player){
                        if(player.countCards('h')>=player.getHandcardLimit()) return 1;
                        return 4;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            Magic:{
                trigger:{player:'moFaRuMenEnd'},
                content:function(){
                    'step 0'
                    if(trigger.faShu==false&&trigger.yong==0&&trigger.shui==0){
                        player.storage.faShu++;
                    }else{
                        player.chooseToDiscard(2,true);
                    }
                    'step 1'
                    if(player.countSkill('moFaRuMen')==3){
                        player.addZhanJi('r',2);
                    }
                },
                check:function(event,player){
                    var num=player.countSkill('moFaRuMen');
                    if(num==3) return true;
                    return player.countSkill('moFaRuMen')<4&&(
                        event.faShu==false&&event.yong==0&&event.shui==0
                    );
                }
            },
            qiangYuYuanXing:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var num=player.countCards('h');
                    if(num>4){
                        player.chooseToDiscard(num-4,true);
                    }else if(num<4){
                        player.draw(4-num);
                    }
                    'step 2'
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else{
                        var list=game.lanZhanJi;
                    }
                    if(list.length>0){
                        var next=player.chooseButton([
                            '是否移除1个星石<br>将一名其他角色手牌调整为4张[强制]',
                            [list,'tdnodes'],
                        ]);
                        next.set('selectButton',1);
                        next.set('ai',function(button){
                            return Math.random()>0.7;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(result.bool){
                        if(result.links[0]=='宝石'){
                            player.removeZhanJi("r");
                        }else{
                            player.removeZhanJi("b");
                        }
                    }else{
                        event.finish();
                    }
                    'step 4'
                    player.chooseTarget('将一名其他角色手牌调整为4张[强制]',true,function(card,player,target){
                        return target!=player;
                    }).set('ai',function(target){
                        if(target.countCards('h')==4) return -1;
                        return Math.random();
                    });
                    'step 5'
                    var target=result.targets[0];
                    var num=target.countCards('h');
                    if(num>4){
                        target.chooseToDiscard(num-4,true);
                    }else if(num<4){
                        target.draw(4-num);
                    }
                },
                check:function(event,player){
                    if(player.countCards('h')==4) return false;
                },
                ai:{
                    shuiJing:true,
                }
            },
            youQingJiBan:{
                ai:{
                    baoShi:true,
                },
                trigger:{player:'moFaRuMenBegin'},
                usable:1,
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    trigger.bool=true;
                }
            },

            //女仆长
            yingZhiXue:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                priority:1,
                filter:function(event,player){
                    if(event.qiDong==true) return false;
                    return player.countZhiShiWu('mi')>=1;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('mi');
                    'step 1'
                    player.chooseTarget('将【风穴】转移或放置于目标对手前，他弃1张牌',true,function(card,player,target){
                        if(target.hasZhiShiWu('fengXueX')) return false;
                        return player.side!=target.side;
                    }).set('ai',function(target){
                        return Math.random();
                    });
                    'step 2'
                    event.target=result.targets[0];
                    game.log(player,'选择了',event.target);
                    if(player.storage.fengXue_target){
                        var target=player.storage.fengXue_target;
                        target.removeZhiShiWu('fengXueX');
                        target.removeSkill('fengXueX');
                    }
                    'step 3'
                    var target=event.target;
                    player.storage.fengXue_target=target;
                    target.storage.fengXue_player=player;
                    target.addZhiShiWu('fengXueX');
                    target.addSkill('fengXueX');
                    'step 4'
                    event.target.chooseToDiscard('弃置1张牌',true);
                },
                check:function(event,player){
                    return player.countCards('h')>0;
                }
            },
            miShu:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.getParent())&&!player.usedSkill('shun');
                },
                content:function(){
                    'step 0'
                    player.addToExpansion('draw',trigger.cards,'log').gaintag.add('ying');
                }
            },
            shun:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    return !event.yingZhan&&player.getExpansions('ying').length>0&&!player.usedSkill('shun');
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('ying');
                    player.chooseCardButton(cards,'是否移除1个【影】，发动【瞬·影·杀】？').set('ai',function(button){
                        return Math.random();
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'ying');
                        player.storage.gongJi++;
                        player.addTempSkill('shun_xiaoGuo');
                    }else{
                        event.finish();
                    }
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'useCardToPlayer'},
                        direct:true,
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event.getParent());
                        },
                        content:function(){
                            trigger.parent.canYingZhan=false;
                        }
                    }
                }
            },
            yingFeng:{
                trigger:{global:'phaseBegin'},
                priority:-1,
                filter:function(event,player){
                    return event.player.hasZhiShiWu('fengXueX')&&player.countZhiShiWu('mi')>0;;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var num=player.countZhiShiWu('mi');
                    var list=[];
                    for(var i=1;i<=num;i++){
                        if(i>=4) break;
                        list.push(i)
                    }
                    list.push('cancel2');
                    player.chooseControl(list).set('prompt','是否发动【影缝】？<br>移除X点【糸】，他弃x张牌').set('ai',function(){
                        return _status.event.x;
                    }).set('x',list.length-1);
                    'step 1'
                    if(result.control!='cancel2'){
                        player.logSkill(event.name,trigger.player);
                        player.removeZhiShiWu('mi',result.control);
                        event.num=result.control;
                    }else{
                        event.finish();
                    }

                    'step 2'
                    trigger.player.chooseToDiscard(`弃置${event.num}张牌`,true,event.num);
                    'step 3'
                    event.cards=result.cards;
                    if(event.cards.length>0){
                        player.chooseCardButton(event.cards,true,1,'你观看并将其中1张弃牌面朝下放置在你角色旁作为【影】').set('ai',function(button){
                            return Math.random();
                        });
                    }else{
                        event.goto(5);
                    }
                    'step 4'
                    player.addToExpansion('draw',result.links,'log').gaintag.add('ying');
                    'step 5'
                    if(event.num>event.cards.length){
                        trigger.player.changeShiQi(-1);
                    }

                }
            },
            shiFengZhiDao:{
                trigger:{player:'phaseEnd'},
                priority:-1,
                filter:function(event,player){
                    return player.getExpansions('ying').length>=2;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('ying');
                    player.chooseCardButton(cards,2,'是否发动【侍奉之道】，移除2张【影】[展示]？').set('ai',function(button){
                        return Math.random();
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'ying');
                        player.showGaiPai(result.links);
                        event.cards=result.links;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    player.addZhiShiWu('mi');
                    'step 3'
                    var xiBie1=get.xiBie(event.cards[0]);
                    var xiBie2=get.xiBie(event.cards[1]);
                    if(xiBie1==xiBie2){
                        player.chooseCardButton(event.cards,true,1,'将其中1个【影】交给目标角色[强制]').set('ai',function(button){
                            return Math.random();
                        });
                    }else{
                        event.finish();
                    }
                    
                    'step 4'
                    event.card=result.links[0];
                    player.chooseTarget('将【'+get.translation(event.card)+'】交给目标角色',true).set('ai',function(card,player,target){
                        if(target.side==player.side){
                            if(target.countCards('h')>=target.getHandcardLimit()) return -1;
                            return Math.random();
                        }else{
                            return Math.random()-0.1;
                        }
                    });
                    'step 5'
                    game.log(player,'交给了',result.targets[0],event.card);
                    result.targets[0].gain(event.card,'draw');
                    'step 6'
                    player.hengZhi();
                }
            },
            jinShu:{
                trigger:{global:'useSkillEnd'},
                filter:function(event,player){
                    if(event.player==player) return false;
                    var info=get.info(event.skill);
                    return info.type=='teShu';
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('mi');
                    'step 1'
                    if(player.countZhiShiWu('mi')>=3&&player.isLinked()){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt','是否额外移除3点【糸】');
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(result.control=='是'){
                        player.removeZhiShiWu('mi',3);
                    }else{
                        event.finish();
                    }
                    'step 3'
                    player.chongZhi();
                    'step 4'
                    player.chooseTarget('对目标对手造成2点法术伤害③或指定目标队友弃1张牌',true,function(card,player,target){
                        return target!=player;
                    }).set('ai',function(target){
                        return Math.random();
                    });
                    'step 5'
                    var target=result.targets[0];
                    if(target.side!=player.side){
                        target.damageFaShu(2,player);
                    }else{
                        target.chooseToDiscard(true);
                    }
                }
            },
            fengXue:{},
            fengXueX:{
                intro:{
                    name:"(专)风穴",
                    content:`
                    <span class="greentext">[被动]影之风</span><br>
                    <span class='tiaoJian'>(若你拥有【风穴】，当你主动攻击命中的攻击牌置入弃牌堆时)</span>将该牌面朝下放置在女仆长角色旁作为【影】。 <span class='tiaoJian'>(你每次[攻击行动]结束时)</span>女仆长+1【糸】。<br>
                    <span class="greentext">[响应]风止</span><br>
                    <span class='tiaoJian'>(若你拥有【风穴】，你的回合结束时发动)</span>将手牌补到上限[强制]，弃2张牌，将弃牌面朝下放置在女仆长角色旁作为【影】，然后移除【风穴】。
                    `,
                    nocount:true,
                },
                markimage:'image/card/fengXue.png',
                group:['fengXueX_yingZhiFeng1','fengXueX_yingZhiFeng2','fengXueX_fengZhi'],
                subSkill:{
                    yingZhiFeng1:{
                        trigger:{player:'useCardAfter'},
                        lastDo:true,
                        priority:-50,
                        filter:function(event,player){
                            if(!player.hasZhiShiWu('fengXueX')) return false;
                            return get.is.zhuDongGongJi(event)&&event.card.isCard&&event.targets.length>0;
                        },
                        forced:true,
                        content:function(){
                            player.storage.fengXue_player.addToExpansion('draw',trigger.cards,'log').gaintag.add('ying');
                        }
                    },
                    yingZhiFeng2:{
                        trigger:{player:'useCardAfter'},
                        lastDo:true,
                        priority:-20,
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event);
                        },
                        forced:true,
                        content:function(){
                            player.storage.fengXue_player.addZhiShiWu('mi');
                        }
                    },
                    fengZhi:{
                        trigger:{player:'phaseEnd'},
                        lastDo:true,
                        filter:function(event,player){
                            return player.hasZhiShiWu('fengXueX');
                        },
                        content:function(){
                            'step 0'
                            var num=player.getHandcardLimit();
                            player.drawTo(num);
                            'step 1'
                            player.chooseToDiscard(2,true);
                            'step 2'
                            player.storage.fengXue_player.addToExpansion('draw',result.cards,'log').gaintag.add('ying');
                            'step 3'
                            player.removeZhiShiWu('fengXueX');
                            player.removeSkill('fengXueX');
                        }
                    },
                }
            },
            zhen:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong==true) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.chooseCard('h',2,true,'将2张手牌面朝下放置在你角色旁作为【影】');
                    'step 2'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('ying');
                },
                check:function(event,player){
                    return player.countCards('h')>2;
                }
            },
            ying:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('ying');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                direct:true,
                trigger:{player:'addToExpansionEnd'},
                filter:function(event,player){
                    return player.getExpansions('ying').length>3;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('ying');
                    var next=player.chooseCardButton(cards,true,cards.length-3,`舍弃${cards.length-3}张【影】`);
                    'step 1'
                    player.discard(result.links);
                }
            },
            mi:{
                intro:{
                    content:'mark',
                    max:4,
                },
                markimage:'image/card/hong.png',
            },



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
                    target.addZhiShiWu('jueJieX').set('jieJie',true);
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
                    <span class='tiaoJian'>(结界师的【结界】为0时)</span>结界师[横置]，移除【绝界】。 <span class='tiaoJian'>(拥有此卡的角色回合结束前)</span>结界师移除1个【结界】。<br>
                    <span class="greentext">[响应]白二羯磨</span><br>
                    <span class='tiaoJian'>(若你拥有【绝界】，你的[攻击行动]结束时发动)</span>结界师+1【祭】，你将1个【结界】加入手牌[强制]。<br>
                    <span class="greentext">[被动]虚空境</span><br>
                    <span class='tiaoJian'>(若你拥有【绝界】)</span>你拥有的基础效果无法触发。`,
                },
                markimage:'image/card/juejie.png',
                group:['jueJieX_zero','jueJieX_remove','jueJieX_attack'],
                subSkill:{
                    zero:{
                        forced:true,
                        trigger:{global:['loseToDiscardpileEnd','gainEnd','addZhiShiWuEnd']},
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

            //矜贵之女
            gaoLingZhiHua:"[被动]高岭之花",
            gaoLingZhiHua_info:"<span class='tiaoJian'>(你执行[提炼]时，若至少包含1[宝石])</span>你+1[水晶]。",
            moFaRuMen:"[法术]魔法入门",
            moFaRuMen_info:"你摸1张牌[强制][展示]，根据所展示的牌依序触发相应效果：<span class='tiaoJian'>(若有法术牌)</span>对2名目标对手各造成1点法术伤害③，<span class='tiaoJian'>(若有X张咏类命格)</span>你对X名目标角色各造成1点法术伤害③，<span class='tiaoJian'>(若有X张水系牌)</span>指定X名目标角色各+1[治疗]。",
            Magic:"[响应]Magic!",
            Magic_info:"<span class='tiaoJian'>([魔法入门]展示牌触发效果时发动)</span>你弃2张牌；<span class='tiaoJian'>([魔法入门]展示牌未触发任何效果时发动)</span>你额外+1[法术行动]。 <span class='tiaoJian'>(本回合第3次[魔法入门]结算时发动)</span>我方[战绩区]+2[宝石]。",
            qiangYuYuanXing:"[启动]强予愿行",
            qiangYuYuanXing_info:"[水晶]将你的手牌调整为4张[强制]；<span class='tiaoJian'>(若你额外移除我方[战绩区]1星石)</span>将一名其他角色手牌调整为4张[强制]。",
            youQingJiBan:"[响应]友情羁绊[回合限定]",
            youQingJiBan_info:"[宝石]<span class='tiaoJian'>(发动[魔法入门]时发动)</span>将“你摸1张牌[强制][展示]”改为“我方2名角色各弃1张牌[强制][展示]，然后各摸1张牌[强制]”。",

            //女仆长
            yingZhiXue:"[启动]影之穴",
            yingZhiXue_info:"<span class='tiaoJian'>(移除1点【糸】)</span>将【风穴】转移或放置于目标对手前，他弃1张牌。",
            miShu:"[响应]秘术·摹影",
            miShu_info:"<span class='tiaoJian'>(主动攻击命中时发动②)</span>将本次攻击牌面朝下放置在你角色旁作为【影】。",
            shun:"[响应]瞬·影·杀[回合限定]",
            shun_info:"<span class='tiaoJian'>(主动攻击未命中时发动②，移除1个【影】)</span>额外+1[攻击行动]，本回合你的主动攻击无法应战但无法发动【秘术·摹影】。",
            yingFeng:"[响应]影缝",
            yingFeng_info:"<span class='tiaoJian'>(持有【风穴】的目标对手回合开始时发动，移除X点【糸】，X<4)</span>他弃X张牌，你观看并将其中1张弃牌面朝下放置在你角色旁作为【影】；<span class='tiaoJian'>(若因此弃牌数小于X)</span>对方士气-1。",
            shiFengZhiDao:"[响应]侍奉之道",
            shiFengZhiDao_info:"<span class='tiaoJian'>(你的回合结束时发动，移除2个【影】[展示])</span>你+1【糸】；<span class='tiaoJian'>(若移除的【影】系别相同)</span>将其中1个【影】交给目标角色[强制]，然后你[横置][持续]。",
            jinShu:"[响应]禁术·影牢",
            jinShu_info:"<span class='tiaoJian'>(其他角色[特殊行动]结束时发动)</span>你+1【糸】；<span class='tiaoJian'>(若你已[横置]，额外移除3点【糸】)</span>[重置]，对目标对手造成2点法术伤害③或指定目标队友弃1张牌。",
            fengXue:"(专)风穴",
            fengXue_info:`
            <span class="greentext">[被动]影之风</span><br>
            <span class='tiaoJian'>(若你拥有【风穴】，当你主动攻击命中的攻击牌置入弃牌堆时)</span>将该牌面朝下放置在女仆长角色旁作为【影】。 <span class='tiaoJian'>(你每次[攻击行动]结束时)</span>女仆长+1【糸】。<br>
            <span class="greentext">[响应]风止</span><br>
            <span class='tiaoJian'>(若你拥有【风穴】，你的回合结束时发动)</span>将手牌补到上限[强制]，弃2张牌，将弃牌面朝下放置在女仆长角色旁作为【影】，然后移除【风穴】。
            `,
            zhen:"[启动]真·摹影",
            zhen_info:"[宝石]将2张手牌面朝下放置在你角色旁作为【影】。",
            ying:"影",
            ying_info:"【影】为女仆长专有盖牌，上限为3。",
            mi:"糸",
            mi_info:"【糸】为女仆长专有指示物，上限为4。",
            fengXueX_yingZhiFeng1:"影之风",
            fengXueX_yingZhiFeng2:"影之风",
            fengXueX_fengZhi:"风止",



            //结界师
            jieJieYiShi:"[法术]结界仪式",
            jieJieYiShi_info:"<span class='tiaoJian'>(将2张手牌面朝上放置在你角色旁[展示]作为【结界】)</span>你+1【祭】。",
            huangShenZhiLi:"[被动]荒神之力",
            huangShenZhiLi_info:"<span class='tiaoJian'>(当【结界】在场时)</span>所有与【结界】系别相同的攻击伤害额外+1。",
            huangShenJiYi:"[响应]\u8352\u795e\u796d\u4eea",
            huangShenJiYi_info:"<span class='tiaoJian'>(目标角色主动攻击时①，若攻击的系别与【结界】相同)</span>你+1【祭】；<span class='tiaoJian'>(若你额外移除3点【祭】)</span>你弃1张牌，移除1个【结界】并[横置][持续]。",
            jinMoJing:"[法术]禁魔境",
            jinMoJing_info:"<span class='tiaoJian'>(移除1点【祭】)</span>将【绝界】转移或放置在目标角色前，你弃1张牌。",
            liuLiJing:"[响应]琉璃境",
            liuLiJing_info:"<span class='tiaoJian'>(我方士气下降时，若你已[横置])</span>[重置]，我方【战绩区】+1[宝石]，指定1名目标角色弃1张牌[展示]，你可将弃牌面朝上放置在你角色旁作为【结界】。",
            jueJie:"(专属)绝界",
            jueJie_info:`
            <span class="greentext">[被动]灭界破散</span><br>
            <span class='tiaoJian'>(结界师的【结界】为0时)</span>结界师[横置]，移除【绝界】。 <span class='tiaoJian'>(拥有此卡的角色回合结束前)</span>结界师移除1个【结界】。<br>
            <span class="greentext">[响应]白二羯磨</span><br>
            <span class='tiaoJian'>(若你拥有【绝界】，你的[攻击行动]结束时发动)</span>结界师+1【祭】，你将1个【结界】加入手牌[强制]。<br>
            <span class="greentext">[被动]虚空境</span><br>
            <span class='tiaoJian'>(若你拥有【绝界】)</span>你拥有的基础效果无法触发。`,
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
