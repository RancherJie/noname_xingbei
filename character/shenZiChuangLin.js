import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenZiChuangLin',
		connect:true,
        characterSort:{
            shenZiChuangLin:{
                "3xing":['jinGuiZhiNv'],
                "3.5xing":[],
                "4xing":['shenMiXueZhe','ranWuZhe'],
                "4.5xing":[],
                '5xing':['nvPuZhang','jieJieShi'],
            }
        },
		character:{
            jinGuiZhiNv:['jinGuiZhiNv_name','yongGroup',3,['gaoLingZhiHua','moFaRuMen','Magic','qiangYuYuanXing','youQingJiBan'],],
            nvPuZhang:['nvPuZhang_name','jiGroup',5,['yingZhiXue','miShuMuYing','shun','yingFeng','shiFengZhiDao','jinShu','fengXue','zhen','ying','mi'],],
            jieJieShi:['jieJieShi_name','huanGroup',5,[],],
            shenMiXueZhe:['shenMiXueZhe_name','yongGroup',4,[],],
            ranWuZhe:['ranWuZhe_name','xueGroup',4,[],],
		},
        characterIntro:{
            jinGuiZhiNv:`身为一位魔法的初学者，艾丽卡施法总是让人提心吊胆，因为连她自己也不知道会发生什么事情。然而她似乎无法体会身旁人的种种暗示，依然我行我素。这样的大小姐，需要队友的多多包容与帮忙`,
            nvPuZhang:`谁能想到完美潇洒的女仆长背后身份则是隐藏于黑暗中的忍者呢？`,
            jieJieShi:`结界师的能力自然体现在他的结界上，适当的布置好结界能够有效的增幅队友，而不适当的结界则只会帮助你的对手`,
            shenMiXueZhe:`操弄言灵进行攻击，从不直接与对手对线，正是神秘学者给人的战斗体验。身为队友协同作战时总得聚精会神，因为说不准被打飞四散的言灵会往你头上飞来`,
            wuRanZhe:`染污者操弄体内戾气，迸发强烈的力量。靠近她的人都会被她蔓延的戾气伤害，人人望而生畏。背弃神，诅咒神，婕姬海德没有宽恕，她品尝着最真实的痛楚`,
        },
		
		skill:{
            //矜贵之女
            gaoLingZhiHua:{
                trigger:{player:'_tiLian_backupEnd'},
                forced:true,
                filter:function(event,player){
                    return event.links.includes('baoShi');
                },
                content:function(){
                    player.addNengLiang('shuiJing');
                }
            },
            moFaRuMen:{
                type:'faShu',
                enable:['faShu'],
                content:async function(event,trigger,player){
                    var cards=[];
                    if(event.bool){
                        let targets=await player.chooseTarget('我方2名角色各弃置1张牌',2,true,function(card,player,target){
                            return player.side==target.side;
                        }).set('ai',function(target){
                            return Math.random();
                        }).forResultTargets();
                        game.log(player,'选择了',targets);
                        for(var target of targets){
                            let card=await target.chooseToDiscard('h',true,'showCards')
                            .set('ai',function(card){
                                var num=0;
                                if(get.type(card)=='faShu') num++;
                                if(get.mingGe(card)=='yong') num++;
                                if(get.xiBie(card)=='shui') num++;
                                return num;
                            }).forResultCards();
                            if(card.length>0) cards.push(card[0]);
                        }
                        for(var target of targets){
                            target.draw();
                        }
                    }else{
                        let card=await player.draw().forResult();
                        await player.showCards(card);
                        cards.push(card[0]);
                    }

                    if(cards.length>0){
                        event.faShu=false;
                        event.yong=0;
                        event.shui=0;

                        for(var card of cards){
                            if(!event.faShu&&get.type(card)=='faShu') event.faShu=true;
                            if(get.mingGe(card)=='yong') event.yong++;
                            if(get.xiBie(card)=='shui') event.shui++;
                        }
                        if(event.faShu){
                            let targets=await player.chooseTarget('对2名目标对手各造成1点法术伤害③',2,true,function(card,player,target){
                                return target.side!=player.side;
                            }).set('ai',function(target){
                                return -get.damageEffect(target,1);
                            }).forResultTargets();
                            game.log(player,'选择了',targets);
                            for(var target of targets){
                                await target.faShuDamage(1,player);
                            }
                        }
                        if(event.yong>0){
                            let targets=await player.chooseTarget(`对${event.yong}名目标角色各造成1点法术伤害③`,true,event.yong).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            game.log(player,'选择了',targets);
                            for(var target of targets){
                                await target.faShuDamage(1,player);
                            }
                        }
                        if(event.shui>0){
                            let targets=await player.chooseTarget(`${event.shui}名目标角色各+1点[治疗]`,true,event.shui).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            }).forResultTargets();
                            game.log(player,'选择了',targets);
                            for(var target of targets){
                                target.changeZhiLiao(1,player);
                            }
                        }
                    }else{
                        return;
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
                        player.addFaShu();
                    }else{
                        player.chooseToDiscard(2,true);
                    }
                    'step 1'
                    if(player.countSkill('moFaRuMen')==3){
                        player.addZhanJi('baoShi',2);
                    }
                },
                check:function(event,player){
                    var num=player.countSkill('moFaRuMen');
                    if(num==3) return true;
                    return player.countSkill('moFaRuMen')<4;
                }
            },
            qiangYuYuanXing:{
                type:'qiDong',
                trigger:{player:'qiDong'},
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
                    var list=get.zhanJi(player.side);
                    if(list.length>0){
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '是否移除1个星石<br>将一名其他角色手牌调整为4张[强制]',
                            [listx,'tdnodes'],
                        ]);
                        next.set('selectButton',1);
                        next.set('ai',function(button){
                            return -1;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(result.bool){
                        if(result.links[0]=='baoShi'){
                            player.removeZhanJi("baoShi");
                        }else{
                            player.removeZhanJi("shuiJing");
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
                trigger:{player:'qiDong'},
                filter:function(event,player){
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
                    if(player.storage.fengXue_target){
                        var target=player.storage.fengXue_target;
                        target.removeZhiShiWu('fengXueX');
                        target.removeSkill('fengXueX');
                    }
                    'step 3'
                    var target=event.target;
                    player.storage.fengXue_target=target;
                    target.storage.fengXue_player=player;
                    target.addSkill('fengXueX');
                    'step 4'
                    target.addZhiShiWu('fengXueX');
                    'step 5'
                    event.target.chooseToDiscard(true);
                },
                check:function(event,player){
                    var bool=game.hasPlayer(function(current){
                        return current.hasZhiShiWu('fengXueX');
                    });
                    return player.countCards('h')>0&&!bool&&(player.canFaShu()||player.canGongJi());
                }
            },
            miShuMuYing:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&!player.usedSkill('shun');
                },
                content:function(){
                    'step 0'
                    player.addToExpansion('draw',trigger.cards,'log').gaintag.add('ying');
                }
            },
            shun:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&player.getExpansions('ying').length>0;
                },
                usable:1,
                async cost(event,trigger,player){
                    var cards=player.getExpansions('ying');
                    var result=await player.chooseCardButton(cards,'是否移除1个【影】，发动【瞬·影·杀】,额外+1[攻击行动]，本回合你的主动攻击无法应战但无法发动【秘术·摹影】').set('ai',function(button){
                        var bool=_status.event.bool;
                        if(bool) return Math.random();
                        else return 0;
                    }).set('bool',player.canGongJi()).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'ying');
                    player.addGongJi();
                    player.addTempSkill('shun_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'gongJiSheZhi'},
                        direct:true,
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            trigger.wuFaYingZhan();
                        }
                    }
                },
            },
            yingFeng:{
                trigger:{global:'phaseBegin'},
                filter:function(event,player){
                    return event.player.hasZhiShiWu('fengXueX')&&player.countZhiShiWu('mi')>0;;
                },
                async cost(event,trigger,player){
                    var num=player.countZhiShiWu('mi');
                    var list=[];
                    for(var i=1;i<=num;i++){
                        if(i>=4) break;
                        list.push(i)
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list).set('prompt',`是否发动【影缝】,移除X点<span class='hong'>【糸】</span><br>他弃X张牌,你观看并将其中1张弃牌面朝下放置在你角色旁作为【影】；<span class='tiaoJian'>(若因此弃牌数小于X)</span>对方士气-1`).set('ai',function(){
                        return _status.event.x;
                    }).set('x',list.length-2).forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('mi',event.cost_data);
                    event.num=event.cost_data;
                    'step 1'
                    trigger.player.chooseToDiscard(true,event.num);
                    'step 2'
                    event.cards=result.cards;
                    if(event.cards.length>0){
                        player.chooseCardButton(event.cards,true,1,'你观看并将其中1张弃牌面朝下放置在你角色旁作为【影】').set('ai',function(button){
                            return Math.random();
                        });
                    }else{
                        event.goto(4);
                    }
                    'step 3'
                    player.addToExpansion('draw',result.links,'log').gaintag.add('ying');
                    'step 4'
                    if(event.num>event.cards.length){
                        trigger.player.changeShiQi(-1);
                    }
                }
            },
            shiFengZhiDao:{
                trigger:{player:'phaseEnd'},
                filter:function(event,player){
                    return player.getExpansions('ying').length>=2;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('ying');
                    var result=await player.chooseCardButton(cards,2,`是否发动【侍奉之道】，移除2张【影】[展示]<br>你+1<span class='hong'>【糸】</span>；<span class='tiaoJian'>(若移除的【影】系别相同)</span>将其中1个【影】交给目标角色[强制]，然后你[横置][持续]`).set('ai',function(button){
                        return 0.5-Math.random();
                    }).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    };
                },
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'ying',"showHiddenCards");
                    event.cards=event.cost_data;
                    'step 1'
                    player.addZhiShiWu('mi');
                    'step 2'
                    var xiBie1=get.xiBie(event.cards[0]);
                    var xiBie2=get.xiBie(event.cards[1]);
                    if(xiBie1==xiBie2){
                        player.chooseCardButton(event.cards,true,1,'将其中1个【影】交给目标角色[强制]').set('ai',function(button){
                            return Math.random();
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    event.card=result.links[0];
                    player.chooseTarget('将【'+get.translation(event.card)+'】交给目标角色',true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side){
                            if(target.countCards('h')>=target.getHandcardLimit()) return -1;
                            else Math.random();
                        }else{
                            if(target.countCards('h')>=target.getHandcardLimit()) return 2;
                            else Math.random();
                        }
                    });
                    'step 4'
                    game.log(player,'交给了',result.targets[0],event.card);
                    result.targets[0].gain(event.card,'draw');
                    'step 5'
                    player.hengZhi();
                },
                check:function(event,player){
                    var num=Math.random();
                    if(player.isHengZhi()) return num>0.1;
                    var cards=player.getExpansions('ying');
                    var num=get.countTongXiPai(cards);
                    if(num>=2) return true;
                    else return false;
                }
            },
            jinShu:{
                trigger:{global:'teShuEnd'},
                filter:function(event,player){
                    return event.player!=player;
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('mi');
                    'step 1'
                    if(player.countZhiShiWu('mi')>=3&&player.isHengZhi()){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否额外移除3点<span class='hong'>【糸】</span><br>[重置]，对目标对手造成2点法术伤害③或指定目标队友弃1张牌`);
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
                        target.faShuDamage(2,player);
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
                    <span class='tiaoJian'>(若你拥有【风穴】，当你主动攻击命中的攻击牌置入弃牌堆时)</span>将该牌面朝下放置在女仆长角色旁作为【影】。 <span class='tiaoJian'>(你每次[攻击行动]结束时)</span>女仆长+1<span class='hong'>【糸】</span>。<br>
                    <span class="greentext">[响应]风止</span><br>
                    <span class='tiaoJian'>(若你拥有【风穴】，你的回合结束时发动)</span>将手牌补到上限[强制]，弃2张牌，将弃牌面朝下放置在女仆长角色旁作为【影】，然后移除【风穴】。
                    `,
                    nocount:true,
                },
                markimage:'image/card/zhuanShu/fengXue.png',
                onremove:'storage',
                global:'fengXueX_yingZhiFeng1_1',
                group:['fengXueX_yingZhiFeng1_1','fengXueX_yingZhiFeng1_2','fengXueX_yingZhiFeng2','fengXueX_fengZhi'],
                subSkill:{
                    yingZhiFeng1_1:{
                        trigger:{player:'gongJiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.hasZhiShiWu('fengXueX')) return false;
                            return get.is.zhuDongGongJi(event)&&event.cards.length>0;
                        },
                        content:function(){
                            player.storage.yingZhiFengCard=trigger.cards[0];
                        }
                    },
                    yingZhiFeng1_2:{
                        trigger:{global:'cardsDiscardAfter'},
                        getIndex(event) {
                            const cards = event.getd();
                            if (!cards.length) return [];
                            return cards;
                        },
                        filter(event, player, triggername, card) {
                            if(!player.hasZhiShiWu('fengXueX')) return false;
                            if(player.storage.yingZhiFengCard!=card) return false;
                            return get.position(card, true) === "d";
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            const cards = event.indexedData;
                            player.storage.fengXue_player.addToExpansion('draw',cards,'log').gaintag.add('ying');
                            'step 1'
                            delete player.storage.yingZhiFengCard;
                        }
                    },
                    yingZhiFeng2:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event)&&player.hasZhiShiWu('fengXueX');
                        },
                        forced:true,
                        content:function(){
                            player.storage.fengXue_player.addZhiShiWu('mi');
                        }
                    },
                    fengZhi:{
                        trigger:{player:'phaseEnd'},
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
                            if(result.cards.length>0){
                                player.storage.fengXue_player.addToExpansion('draw',result.cards,'log').gaintag.add('ying');
                            }
                            'step 3'
                            player.removeZhiShiWu('fengXueX');
                            'step 4'
                            player.removeSkill('fengXueX');
                        }
                    },
                }
            },
            zhen:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
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
                    return player.countCards('h')>3&&player.countExpansions('ying')<=1;
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
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
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
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },
        },
		
		translate:{
            jinGuiZhiNv:'矜贵之女',
            nvPuZhang:'女仆长',
            jieJieShi:'结界师',
            shenMiXueZhe:'神秘学者',
            ranWuZhe:'染污者',

            jinGuiZhiNv_name:'艾丽卡',
            nvPuZhang_name:'千代（胧）',
            jieJieShi_name:'时音',
            shenMiXueZhe_name:'梅丽珊卓',
            ranWuZhe_name:'婕姬海德',

            //矜贵之女
            gaoLingZhiHua:"[被动]高岭之花",
            gaoLingZhiHua_info:"<span class='tiaoJian'>(你执行[提炼]时，若至少包含1[宝石])</span>你+1[水晶]。",
            moFaRuMen:"[法术]魔法入门",
            moFaRuMen_info:"你摸1张牌[强制][展示]，根据所展示的牌依序触发相应效果：<span class='tiaoJian'>(若有法术牌)</span>对2名目标对手各造成1点法术伤害③，<span class='tiaoJian'>(若有X张咏类命格)</span>你对X名目标角色各造成1点法术伤害③，<span class='tiaoJian'>(若有X张水系牌)</span>指定X名目标角色各+1[治疗]。",
            Magic:"[响应]Magic!",
            Magic_info:"<span class='tiaoJian'>(【魔法入门】展示牌触发效果时发动)</span>你弃2张牌；<span class='tiaoJian'>([魔法入门]展示牌未触发任何效果时发动)</span>你额外+1[法术行动]。 <span class='tiaoJian'>(本回合第3次[魔法入门]结算时发动)</span>我方[战绩区]+2[宝石]。",
            qiangYuYuanXing:"[启动]强予愿行",
            qiangYuYuanXing_info:"[水晶]将你的手牌调整为4张[强制]；<span class='tiaoJian'>(若你额外移除我方[战绩区]1星石)</span>将一名其他角色手牌调整为4张[强制]。",
            youQingJiBan:"[响应]友情羁绊[回合限定]",
            youQingJiBan_info:"[宝石]<span class='tiaoJian'>(发动【魔法入门】时发动)</span>将“你摸1张牌[强制][展示]”改为“我方2名角色各弃1张牌[强制][展示]，然后各摸1张牌[强制]”。",

            //女仆长
            yingZhiXue:"[启动]影之穴",
            yingZhiXue_info:"<span class='tiaoJian'>(移除1点</span><span class='hong'>【糸】</span><span class='tiaoJian'>)</span>将【风穴】转移或放置于目标对手前，他弃1张牌。",
            miShuMuYing:"[响应]秘术·摹影",
            miShuMuYing_info:"<span class='tiaoJian'>(主动攻击命中时发动②)</span>将本次攻击牌面朝下放置在你角色旁作为【影】。",
            shun:"[响应]瞬·影·杀[回合限定]",
            shun_info:"<span class='tiaoJian'>(主动攻击未命中时发动②，移除1个【影】)</span>额外+1[攻击行动]，本回合你的主动攻击无法应战但无法发动【秘术·摹影】。",
            yingFeng:"[响应]影缝",
            yingFeng_info:"<span class='tiaoJian'>(持有【风穴】的目标对手回合开始时发动，移除X点</span><span class='hong'>【糸】</span><span class='tiaoJian'>，X<4)</span>他弃X张牌，你观看并将其中1张弃牌面朝下放置在你角色旁作为【影】；<span class='tiaoJian'>(若因此弃牌数小于X)</span>对方士气-1。",
            shiFengZhiDao:"[响应]侍奉之道",
            shiFengZhiDao_info:"<span class='tiaoJian'>(你的回合结束时发动，移除2个【影】[展示])</span>你+1<span class='hong'>【糸】</span>；<span class='tiaoJian'>(若移除的【影】系别相同)</span>将其中1个【影】交给目标角色[强制]，然后你[横置][持续]。",
            jinShu:"[响应]禁术·影牢",
            jinShu_info:"<span class='tiaoJian'>(其他角色[特殊行动]结束时发动)</span>你+1<span class='hong'>【糸】</span>；<span class='tiaoJian'>(若你已[横置]，额外移除3点</span><span class='hong'>【糸】</span><span class='tiaoJian'>)</span>[重置]，对目标对手造成2点法术伤害③或指定目标队友弃1张牌。",
            fengXue:"(专)风穴",
            fengXue_info:`
            <span class="greentext">[被动]影之风</span><br>
            <span class='tiaoJian'>(若你拥有【风穴】，当你主动攻击命中的攻击牌置入弃牌堆时)</span>将该牌面朝下放置在女仆长角色旁作为【影】。 <span class='tiaoJian'>(你每次[攻击行动]结束时)</span>女仆长+1<span class='hong'>【糸】</span>。<br>
            <span class="greentext">[响应]风止</span><br>
            <span class='tiaoJian'>(若你拥有【风穴】，你的回合结束时发动)</span>将手牌补到上限[强制]，弃2张牌，将弃牌面朝下放置在女仆长角色旁作为【影】，然后移除【风穴】。
            `,
            zhen:"[启动]真·摹影",
            zhen_info:"[宝石]将2张手牌面朝下放置在你角色旁作为【影】。",
            ying:"影",
            ying_info:"【影】为女仆长专有盖牌，上限为3。",
            mi:"糸",
            mi_info:"<span class='hong'>【糸】</span>为女仆长专有指示物，上限为4。",
            fengXueX_yingZhiFeng1_1:"",
            fengXueX_yingZhiFeng1_2:"影之风",
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

            //神秘学者
            yanLingShu:"[法术]言灵术",
            yanLingShu_info:"<span class='tiaoJian'>(将1-2张手牌面朝上放置在你角色旁[展示]作为【言灵】)</span>你摸1张牌[强制]︔<span class='tiaoJian'>(摸牌后，若你额外弃1张与现存【言灵】系别相同的牌[展示])</span>你+1【秘术】。",
            shouHuLing:"[被动]守护灵",
            shouHuLing_info:"<span class='tiaoJian'>(你被主动攻击命中时②，其他角色结算效果前)</span>移除1个【言灵】；<span class='tiaoJian'>(若你额外移除1点【秘术】)</span>将1张手牌面朝上放置在你角色旁[展示]作为【言灵】。",
            zhenYanShu:"[法术]真言术",
            zhenYanShu_backup:'[法术]真言术',
            zhenYanShu_info:"<span class='tiaoJian'>(将1个除光系外的【言灵】视为手牌使用)</span>执行相应的行动；<span class='tiaoJian'>(若使用的【言灵】为咏类命格或法术牌，或你额外移除1点【秘术】)</span>本次相应行动执行完成后，对目标对手造成1点法术伤害③。",
            jinJiMiFa:"[响应]禁忌秘法",
            jinJiMiFa_info:"<span class='tiaoJian'>(你的回合开始前，移除3点【秘术】发动)</span>指定2名目标角色各弃1张牌，你将弃牌面朝上放置在你角色旁[展示]作为【言灵】。",
            yaoJingMiShu:"[响应]妖精秘术[回合限定]",
            yaoJingMiShu_info:"<span class='tiaoJian'>(【真言术】或【真言压制】结算后发动)</span>立即执行一次[攻击行动]︔<span class='tiaoJian'>(若本次执行的攻击命中②)</span>你+2【秘术】。",
            zhenYanYaZhi:"[响应]真言压制",
            zhenYanYaZhi_info:"[水晶]<span class='tiaoJian'>(【真言术】结算后发动)</span>对目标角色造成1点法术伤害③，你可立即执行一次【真言术】。",
            yanLing:"言灵",
            yanLing_info:"【言灵】为神秘学者专有展示盖牌，上限为3。",
            miShu:"秘术",
            miShu_info:"【秘术】为神秘学者专有指示物，上限为4。",

            //染污者
            shenQiZhiYi:"[被动]神弃之裔",
            shenQiZhiYi_info:"游戏初始时，你+1[水晶]。你的[治疗]上限为0[恒定]，你始终无法获得或使用[治疗]，你对拥有[治疗]的角色伤害额外+1。",
            liRuQuanYong:"[响应]戾如泉涌[回合限定]",
            liRuQuanYong_info:"<span class='tiaoJian'>(仅【普通形态】下且你【戾气】数<2，[攻击行动]或[法术行动]结束后发动)</span>你+1【戾气】，额外+1[攻击行动]。",
            kuangLiZhiXin:"[被动]狂戾之心[持续]",
            kuangLiZhiXin_info:"<span class='tiaoJian'>(你的回合开始时或承受伤害时⑥，且【戾气】达到上限时)</span>你弃1张牌，指定目标角色移除2[治疗]，[横置]转为【狂戾形态】，此形态下你无法使用[圣光]，你造成的伤害额外+1。 <span class='tiaoJian'>(你的回合结束时若【戾气】数为0)</span>[转正]脱离【狂戾形态】，将你的1[水晶]转换为1[宝石]。",
            kuangLiZhiTi:"[被动]狂戾之体",
            kuangLiZhiTi_info:"<span class='tiaoJian'>(仅【狂戾形态】下且你【戾气】数>0，目标角色对你造成伤害时③)</span>移除1点【戾气】，本次伤害额外+1，但伤害最高为4。",
            shenZhiWuRan:"[响应]神智污染",
            shenZhiWuRan_info:"<span class='tiaoJian'>(仅【狂戾形态】下，你对目标角色造成伤害时发动③，移除1点【戾气】)</span>本次伤害额外+1，本次你造成的伤害无法以[治疗]抵御。",
            niuQuZhiAi:"[启动]扭曲之爱",
            niuQuZhiAi_info:"[宝石]调整你的形态为【普通形态】或【狂戾形态】，你弃2张牌或摸2张牌[强制]，并任意调整你的【戾气】数。",
            liQi:"戾气",
            liQi_info:"【戾气】为污染者专有指示物，上限为2。",
        },
	};
});
