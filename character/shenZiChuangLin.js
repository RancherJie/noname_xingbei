import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenZiChuangLin',
		connect:true,
        characterSort:{
            shenZiChuangLin:{
                'FAQ':['FAQ_jinGuiZhiNv','FAQ_shenMiXueZhe'],
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
            jieJieShi:['jieJieShi_name','huanGroup',5,['jieJieYiShi','huangShenZhiLi','huangShenJiYi','jinMoJing','liuLiJing','jueJie','fuMoJing','jieJie','jiX'],],
            shenMiXueZhe:['shenMiXueZhe_name','yongGroup',4,['yanLingShu','shouHuLing','zhenYanShu','jinJiMiFa','yaoJingMiShu','zhenYanYaZhi','yanLing','miShu'],],
            ranWuZhe:['ranWuZhe_name','xueGroup',4,['shenQiZhiYi','liRuQuanYong','kuangLiZhiXin','kuangLiZhiTi','shenZhiWuRan','niuQuZhiAi','liQi'],],

            FAQ_jinGuiZhiNv:['jinGuiZhiNv_name','yongGroup',3,['gaoLingZhiHua','FAQ_moFaRuMen','Magic','qiangYuYuanXing','FAQ_youQingJiBan'],['character:jinGuiZhiNv']],
            FAQ_shenMiXueZhe:['shenMiXueZhe_name','yongGroup',4,['yanLingShu','FAQ_shouHuLing','zhenYanShu','jinJiMiFa','yaoJingMiShu','zhenYanYaZhi','yanLing','miShu'],['character:shenMiXueZhe']],
		},
        characterIntro:{
            jinGuiZhiNv:`身为一位魔法的初学者，艾丽卡施法总是让人提心吊胆，因为连她自己也不知道会发生什么事情。然而她似乎无法体会身旁人的种种暗示，依然我行我素。这样的大小姐，需要队友的多多包容与帮忙`,
            nvPuZhang:`谁能想到完美潇洒的女仆长背后身份则是隐藏于黑暗中的忍者呢？`,
            jieJieShi:`结界师的能力自然体现在他的结界上，适当的布置好结界能够有效的增幅队友，而不适当的结界则只会帮助你的对手`,
            shenMiXueZhe:`操弄言灵进行攻击，从不直接与对手对线，正是神秘学者给人的战斗体验。身为队友协同作战时总得聚精会神，因为说不准被打飞四散的言灵会往你头上飞来`,
            ranWuZhe:`染污者操弄体内戾气，迸发强烈的力量。靠近她的人都会被她蔓延的戾气伤害，人人望而生畏。背弃神，诅咒神，婕姬海德没有宽恕，她品尝着最真实的痛楚`,
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
                            await target.draw();
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
                trigger:{player:['moFaRuMenEnd']},
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

            //结界师
            jieJieYiShi:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return !player.getExpansions('jieJie').length>0;
                },
                selectCard:2,
                discard:false,
                filterCard:true,
                content:function(){
                    'step 0'
                    player.addToExpansion('draw',cards,'log').gaintag.add('jieJie');
                    'step 1'
                    player.showCards(cards);
                    'step 2'
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
                trigger:{global:'gongJiMingZhong'},
                filter:function(event,player){
                    var cards=player.getExpansions('jieJie');
                    if(cards.length==0) return false;
                    for(var i of cards){
                        if(get.xiBie(event.card)==get.xiBie(i)) return true;
                    }
                    return false;
                },
                content:function(){
                    trigger.changeDamageNum(1);
                },
                
            },
            huangShenJiYi:{
                trigger:{global:'gongJiShi'},
                filter:function(event,player){
                    if(!get.is.zhuDongGongJi(event)) return false;
                    var cards=player.getExpansions('jieJie');
                    if(cards.length==0) return false;
                    for(var i of cards){
                        if(get.xiBie(event.card)==get.xiBie(i)) return true;
                    }
                    return false;
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('jiX');
                    'step 1'
                    if(player.countZhiShiWu('jiX')>=3){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否额外移除3点<span class='hong'>【祭】</span>，你弃1张牌，移除1个【结界】并[横置][持续]`).set('ai',function(){
                            var player=_status.event.player;
                            if(player.isHengZhi()) return 1;
                            else return 0;
                        });
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
                    player.discard(result.links,'jieJie').set('visible',true);
                    'step 6'
                    player.hengZhi();
                }
            },
            jinMoJing:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('jiX')>0;
                },
                filterTarget:function(card,player,target){
                    if(target.hasZhiShiWu('jueJieX')) return false;
                    return true;
                },
                selectTarget:1,
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('jiX');

                    if(player.storage.jueJie_target){
                        await player.storage.jueJie_target.removeZhiShiWu('jueJieX');
                        await player.storage.jueJie_target.removeSkill('jueJieX');
                    }
                    player.storage.jueJie_target=event.target;
                    event.target.addSkill('jueJieX');
                    await event.target.addZhiShiWu('jueJieX');
                    event.target.storage.jueJie_player=player;
                    'step 4'
                    if(player.countCards('h')>0){
                        await player.chooseToDiscard(1,true);
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
                    return event.side==player.side&&event.num<0&&player.isHengZhi();
                },
                content:function(){
                    'step 0'
                    player.chongZhi();
                    'step 1'
                    player.addZhanJi('baoShi');
                    'step 2'
                    player.chooseTarget('目标角色弃1张牌[展示]',true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side) return 1;
                        return -1;
                    });
                    'step 3'
                    event.target=result.targets[0];
                    if(event.target.countCards('h')>0){
                        event.target.chooseToDiscard('h',true,'showCards');
                    }
                    'step 4'
                    event.cards=result.cards;
                    'step 5'
                    if(player.getExpansions('jieJie').length>=2){
                        event.finish();
                    }else{
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否将${get.translation(event.cards)}作为【结界】`).set('ai',function(){
                            var player=_status.event.player;
                            if(player.getExpansions('jieJie').length==0) return 1;
                            else return 0;
                        });
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
                    <span class='tiaoJian'>(若你拥有【绝界】，你的[攻击行动]结束时发动)</span>结界师+1<span class='hong'>【祭】</span>，你将1个【结界】加入手牌[强制]。<br>
                    <span class="greentext">[被动]虚空境</span><br>
                    <span class='tiaoJian'>(若你拥有【绝界】)</span>你拥有的基础效果无法触发。`,
                },
                markimage:'image/card/zhuanShu/juejie.png',
                onremove:'storage',
                group:['jueJieX_zero','jueJieX_remove','jueJieX_attack','jueJieX_wuFa'],
                subSkill:{
                    zero:{
                        forced:true,
                        trigger:{global:['discard']},
                        filter:function(event,player){
                            return event.gaiPai=='jieJie'&&player.storage.jueJie_player.getExpansions('jieJie').length==0;
                        },
                        content:function(){
                            'step 0'
                            player.storage.jueJie_player.hengZhi();
                            'step 1'
                            player.removeZhiShiWu('jueJieX');
                            'step 2'
                            player.removeSkill('jueJieX');
                        }   
                    },
                    remove:{
                        forced:true,
                        trigger:{player:'phaseEndBefore'},
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
                            player.storage.jueJie_player.discard(result.links,'jieJie').set('visible',true);
                        }
                    },
                    attack:{
                        trigger:{player:'gongJiEnd'},
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
                    wuFa:{
                        trigger:{player:'triggerSkill'},
                        forced:true,
                        filter:function(event,player){
                            if(event.skill=='jueJieX_wuFa') return false;
                            var list=player.jiChuXiaoGuoList();
                            return list.includes(event.skill);
                        },
                        content:function(){
                            trigger.cancelled=true;
                        }
                    }
                }
            },
            fuMoJing:{
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function(event,player){
                    return event.zhiShiWu=='jiX'&&event.num>0&&player.canBiShaShuiJing();
                },
                async cost(event,trigger,player){
                    event.result=player.chooseTarget(function(card,player,target){
                        var player=_status.event.player;
                        if(target.side==player.side) return false;
                        return true;
                    })
                    .set('prompt',get.prompt('fuMoJing'))
                    .set('prompt2',lib.translate.fuMoJing_info)
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.storage.fuMoJing=false;
                    event.target=event.targets[0];
                    'step 1'
                    player.removeBiShaShuiJing();
                    'step 2'
                    event.target.faShuDamage(1,player).set('fuMoJing',true);
                    'step 3'
                    var list=get.zhanJi(player.side);
                    if(player.storage.fuMoJing&&list.length>0){
                        var listx=[];
                        for(var i=0;i<list.length;i++){
                            listx.push([list[i],get.translation(list[i])]);
                        }
                        var next=player.chooseButton([
                            '是否移除1个星石，你+1[水晶]',
                            [listx,'tdnodes'],
                        ]);
                        next.set('selectButton',1);
                    }else{
                        event.finish();
                    }
                    'step 4'
                    if(result.bool){
                        if(result.links[0]=='baoShi'){
                            player.removeZhanJi("baoShi");
                        }else{
                            player.removeZhanJi("shuiJing");
                        }
                    }else{
                        event.finish();
                    }
                    'step 5'
                    player.addNengLiang('shuiJing');
                },
                group:'fuMoJing_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
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
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
            jiX:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //神秘学者
            yanLingShu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                selectCard:[1,2],
                filterCard:true,
                discard:false,
                content:function(){
                    'step 0'
                    player.addToExpansion('draw',cards,'log').gaintag.add('yanLing');
                    'step 1'
                    player.showCards(cards);
                    'step 2'
                    player.draw();
                    'step 3'
                    var yanLing=player.getExpansions('yanLing');
                    var xiBie=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(!xiBie.includes(get.xiBie(yanLing[i]))){
                            xiBie.push(get.xiBie(yanLing[i]));
                        }
                    }
                    var next=player.chooseToDiscard('h','是否额外弃1张与现存【言灵】系别相同的牌【展示】',function(card){
                        var xiBie=_status.event.xiBie;
                        return xiBie.includes(get.xiBie(card));
                    }).set('xiBie',xiBie);
                    next.set('ai',function(card){
                        return 7-get.value(card);
                    });
                    'step 4'
                    if(result.bool){
                        player.showCards(result.cards);
                    }else{
                        event.finish();
                    }
                    'step 5'
                    player.addZhiShiWu('miShu');
                },
                ai:{
                    order:3.8,
                    result:{
                        player:function(player){
                            var cards=player.getExpansions('yanLing');
                            if(cards.length==0) return 1;
                            if(cards.length==1) return 1.5;
                            if(cards.length==2) return 0;
                            return 0;
                        }
                    }
                }
            },
            shouHuLing:{
                forced:true,
                trigger:{target:'gongJiMingZhong'},
                firstDo:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.getParent())&&player.getExpansions('yanLing').length>0;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('yanLing');
                    player.chooseCardButton(cards,true,'移除1个【言灵】').set('ai',function(){
                        return Math.random();
                    });
                    'step 1'
                    player.discard(result.links,'yanLing');
                    'step 2'
                    if(player.countZhiShiWu('miShu')>0){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否额外移除1点<span class='hong'>【秘术】</span>，将1张手牌面朝上放置在你角色旁[展示]作为【言灵】`);
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(result.control=='是'){
                        player.removeZhiShiWu('miShu');
                    }else{
                        event.finish();
                    }
                    'step 4'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',true,'将1张手牌面朝上放置在你的角色旁【展示】作为【言灵】');
                    }
                    'step 5'
                    player.showCards(result.cards);
                    event.cards=result.cards;
                    'step 6'
                    player.addToExpansion('draw',event.cards,'log').gaintag.add('yanLing');
                }
            },
            zhenYanShu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    var yanLing=player.getExpansions('yanLing');
                    var cards=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(get.xiBie(yanLing[i])!='guang') cards.push(yanLing[i]);
                    }
                    return cards.length>0;
                },
                content:function(){
                    'step 0'
                    var yanLing=player.getExpansions('yanLing');
                    player.chooseCardButton(yanLing,true,'选择1个除光系外的【言灵】视为手牌使用').set('ai',function(card){
                        return Math.random();
                    }).set('filterButton',function(button){
                        return get.xiBie(button)!='guang';
                    });
                    'step 1'
                    player.storage.zhenYanShu=result.links[0];
                    'step 2'
                    player.chooseUseTarget(player.storage.zhenYanShu,true);
                },
                contentAfter:function(){
                    'step 0'
                    var card=player.storage.zhenYanShu;
                    var type=get.type(card);
                    var mingGe=get.mingGe(card);
                    var bool=false;
                    if(mingGe=='yong'||type=='faShu'){
                        bool=true;
                        event.bool=true;
                    }
                    if(!bool&&player.countZhiShiWu('miShu')>0){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否额外移除1点<span class='hong'>【秘术】</span>，对目标对手造成1点法术伤害③`);
                    }else if(!bool){
                        event.finish();
                    }
                    'step 1'
                    if(result.control=='是'){
                        player.removeZhiShiWu('miShu');
                    }
                    if(event.bool||result.control=='是'){
                        player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                            return player.side!=target.side;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,1);
                        });
                    }else{
                        event.finish();
                    }
                    'step 2'
                    var target=result.targets[0];
                    target.faShuDamage(1,player);
                },
                ai:{
                    order:3.9,
                    result:{
                        player:1,
                    }
                }
            },
            jinJiMiFa:{
                trigger:{player:'phaseBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('miShu')>=3;
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('miShu',3);
                    var targets=await player.chooseTarget(2,true).set('ai',function(target){
                        var player=_status.event.player;
                        if(target.countCards('h')==0) return -1;
                        return player.side==target.side?1:0.5;
                    }).forResultTargets();
                    targets=targets.sortBySeat(player);
                    game.log(player,'选择了',targets);
                    for(var target of targets){
                        if(target.countCards('h')>0){
                            let cards=await target.chooseToDiscard('h',true).forResultCards();
                            await player.showCards(cards);
                            await player.addToExpansion('draw',cards,'log').gaintag.add('yanLing'); 
                        }
                    }
                }
            },
            yaoJingMiShu:{
                usable:1,
                trigger:{player:['zhenYanShuContentAfterAfter','zhenYanYaZhiAfter']},
                filter:function(event,player){
                    return !event.selected;
                },
                content:function(){
                    'step 0'
                    trigger.selected=true;
                    player.addTempSkill('yaoJingMiShu_gongJi');
                    player.gongJi().set('bool',true);
                },
                subSkill:{
                    gongJi:{
                        trigger:{player:'gongJiMingZhong'},
                        filter:function(event,player){
                            return event.getParent().bool;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            player.addZhiShiWu('miShu',2);
                            player.removeSkill('yaoJingMiShu_gongJi');
                        }
                    }
                }
            },
            zhenYanYaZhi:{
                trigger:{player:'zhenYanShuContentAfterAfter'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(event.selected) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    trigger.selected=true;
                    player.removeBiShaShuiJing();
                    player.chooseTarget(true,'对目标角色造成1点法术伤害③ ').set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 1'
                    var target=result.targets[0];
                    target.faShuDamage(1,player);
                    'step 2'
                    var yanLing=player.getExpansions('yanLing');
                    var cards=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(get.xiBie(yanLing[i])!='guang') cards.push(yanLing[i]);
                    }
                    var list=['是','否'];
                    if(cards.length>0){
                        player.chooseControl(list).set('prompt','是否立即执行一次【真言术】');
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(result.control=='是'){
                        player.useSkill('zhenYanShu');
                    }
                }
            },
            yanLing:{
                intro:{
					content:'expansion',
					markcount:'expansion',
				},
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                direct:true,
                trigger:{player:'addToExpansionEnd'},
                filter:function(event,player){
                    return player.getExpansions('yanLing').length>3;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('yanLing');
                    var next=player.chooseCardButton(cards,true,cards.length-3,`舍弃${cards.length-3}张【言灵】`);
                    'step 1'
                    player.discard(result.links);
                }
            },
            miShu:{
                intro:{
                    content:'mark',
                    max:4,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //染污者
            shenQiZhiYi:{
                group:['shenQiZhiYi_kaiShi','shenQiZhiYi_huoDe','shenQiZhiYi_shangHai','shenQiZhiYi_shiYong'],
                subSkill:{
                    kaiShi:{
                        trigger:{global:'gameStart'},
                        forced:true,
                        content:function(){
                            player.addNengLiang('shuiJing',1);
                        }
                    },
                    huoDe:{
                        trigger:{player:"changeZhiLiaoBefore"},
                        forced:true,
                        filter:function(event,player){
                            return event.num>=0&&(!event.zhuanYi);
                        },
                        content:function(){
                            trigger.cancel();
                        }
                    },
                    shangHai:{
                        trigger:{source:"zaoChengShangHai"},
                        forced:true,
                        filter:function(event,player){
                            return event.player.zhiLiao>0;
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    shiYong:{
                        trigger:{player:'zhiLiao'},
                        firstDo:true,
                        forced:true,
                        content:function(){
                            trigger.cancel();
                        }
                    },
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return 0;
                    },
                    aiOrder:function(player,item,num){
                        if(get.type(item)!='faShu') return;
                        if(item.name=='zhongDu') return num+=0.5;
                        else return;
                    },
                },
                ai:{
                    noZhiLiao:true,
                }
            },
            liRuQuanYong:{
                usable:1,
                trigger:{player:['gongJiAfter','faShuAfter']},
                filter:function(event,player,name){
                    if(player.isHengZhi()) return false;
                    if(player.countZhiShiWu('liQi')>=2) return false;
                    if(name=='gongJiAfter') return get.is.gongJiXingDong(event);
                    else return true;
                },
                content:function(){
                    player.addZhiShiWu('liQi');
                    player.addGongJi();
                },
                check:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi')>0;
                }
            },
            kuangLiZhiXin:{
                trigger:{player:['phaseBegin','chengShouShangHaiAfter']},
                forced:true,
                filter:function(event,player){
                    if(player.isHengZhi()) return false;
                    var num=get.info('liQi').intro.max;
                    return player.countZhiShiWu('liQi')>=num;
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'h',true);
                    'step 1'
                    var next=player.chooseTarget(1,true,'移除目标角色2点[治疗]');
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side) return -1;
                        return target.zhiLiao;
                    });
                    'step 2'
                    result.targets[0].changeZhiLiao(-2);
                    'step 3'
                    player.hengZhi();
                },
                group:['kuangLiZhiXin_shangHai','kuangLiZhiXin_chongZhi'],
                subSkill:{
                    shangHai:{
                        trigger:{source:"zaoChengShangHai"},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            trigger.changeDamageNum(1);
                        }
                    },
                    chongZhi:{
                        trigger:{player:"phaseEnd"},
                        forced:true,
                        filter:function(event,player){
                            return player.isHengZhi()&&player.countZhiShiWu('liQi')==0;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            if(player.countNengLiang('shuiJing')>0){
                                player.removeNengLiang('shuiJing');
                            }else{
                                event.finish();
                            }
                            'step 2'
                            player.addNengLiang('baoShi',1);
                        }
                    }
                },
                mod:{
                    cardEnabled:function(card,player){
                        if(player.isHengZhi()&&card.name=='shengGuang'){
                            return false;
                        }else{
                            return;
                        }
                    }
                },

            },
            kuangLiZhiTi:{
                trigger:{player:'zaoChengShangHai'},
                forced:true,
                priority:-1,
                filter:function(event,player){
                    return event.source&&player.isHengZhi()&&player.countZhiShiWu('liQi')>0;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('liQi');
                    'step 1'
                    trigger.changeDamageNum(1);
                    if(trigger.num>4){
                        trigger.num=4;
                    }
                }
            },
            shenZhiWuRan:{
                trigger:{source:'zaoChengShangHai'},
                priority:-2,
                filter:function(event,player){
                    return event.source&&player.isHengZhi()&&player.countZhiShiWu('liQi')>0;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('liQi');
                    'step 1'
                    trigger.changeDamageNum(1);
                    trigger.canZhiLiao=false;
                }
            },
            niuQuZhiAi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var list=['普通形态','狂戾形态'];
                    player.chooseControl(list).set('prompt','选择你的形态');
                    'step 2'
                    if(result.control=='狂戾形态'){
                        if(!player.isHengZhi()) player.hengZhi();
                    }else{
                        if(player.isHengZhi()) player.chongZhi();
                    }
                    'step 3'
                    var list=['弃2张牌','摸2张牌'];
                    player.chooseControl(list).set('prompt','选择你的行动').set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')>=3) return '弃2张牌';
                        else return '摸2张牌';
                    });
                    'step 4'
                    if(result.control=='弃2张牌'){
                        player.chooseToDiscard(2,'h',true);
                    }else{
                        player.draw(2);
                    }
                    'step 5'
                    var list=[0,1,2];
                    player.chooseControl(list).set('prompt',`选择<span class='hong'>【戾气】</span>的数量`).set('ai',function(){
                        return 1;
                    });
                    'step 6'
                    player.setZhiShiWu('liQi',result.control);
                },
                check:function(event,player){
                    return Math.random()<0.5;
                },
                ai:{
                    baoShi:1,
                }
            },
            liQi:{
                intro:{
                    content:'mark',
                    max:2,
                },
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            FAQ_moFaRuMen:{
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
                        event.targets=targets.slice();
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
                    }
                    if(event.bool){
                        for(var target of event.targets){
                            await target.draw();
                        }
                    }
                    await event.trigger('moFaRuMenEnd');
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
            FAQ_youQingJiBan:{
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

            FAQ_shouHuLing:{
                forced:true,
                trigger:{target:'gongJiMingZhong'},
                firstDo:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.getParent())&&(player.getExpansions('yanLing').length>0||player.countZhiShiWu('miShu')>0);
                },
                content:function(){
                    'step 0'
                    if(player.getExpansions('yanLing').length>0){
                        var cards=player.getExpansions('yanLing');
                        player.chooseCardButton(cards,true,'移除1个【言灵】').set('ai',function(){
                            return Math.random();
                        });
                    }else event.goto(2);
                    'step 1'
                    player.discard(result.links,'yanLing');
                    'step 2'
                    if(player.countZhiShiWu('miShu')>0){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt',`是否移除1点<span class='hong'>【秘术】</span>，将1张手牌面朝上放置在你角色旁[展示]作为【言灵】`);
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(result.control=='是'){
                        player.removeZhiShiWu('miShu');
                    }else{
                        event.finish();
                    }
                    'step 4'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',true,'将1张手牌面朝上放置在你的角色旁【展示】作为【言灵】');
                    }
                    'step 5'
                    player.showCards(result.cards);
                    event.cards=result.cards;
                    'step 6'
                    player.addToExpansion('draw',event.cards,'log').gaintag.add('yanLing');
                }
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
            jieJieYiShi_info:"<span class='tiaoJian'>(将2张手牌面朝上放置在你角色旁[展示]作为【结界】)</span>你+1<span class='hong'>【祭】</span>。",
            huangShenZhiLi:"[被动]荒神之力",
            huangShenZhiLi_info:"<span class='tiaoJian'>(当【结界】在场时)</span>所有与【结界】系别相同的攻击伤害额外+1。",
            huangShenJiYi:"[响应]荒神祭仪",
            huangShenJiYi_info:"<span class='tiaoJian'>(目标角色主动攻击时①，若攻击的系别与【结界】相同)</span>你+1<span class='hong'>【祭】</span>；<span class='tiaoJian'>(若你额外移除3点</span><span class='hong'>【祭】</span><span class='tiaoJian'>)</span>你弃1张牌，移除1个【结界】并[横置][持续]。",
            jinMoJing:"[法术]禁魔境",
            jinMoJing_info:"<span class='tiaoJian'>(移除1点</span><span class='hong'>【祭】</span><span class='tiaoJian'>)</span>将【绝界】转移或放置在目标角色前，你弃1张牌。",
            liuLiJing:"[响应]琉璃境",
            liuLiJing_info:"<span class='tiaoJian'>(我方士气下降时，若你已[横置])</span>[重置]，我方【战绩区】+1[宝石]，指定1名目标角色弃1张牌[展示]，你可将弃牌面朝上放置在你角色旁作为【结界】。",
            jueJie:"(专属)绝界",
            jueJie_info:`
            <span class="greentext">[被动]灭界破散</span><br>
            <span class='tiaoJian'>(结界师的【结界】为0时)</span>结界师[横置]，移除【绝界】。 <span class='tiaoJian'>(拥有此卡的角色回合结束前)</span>结界师移除1个【结界】。<br>
            <span class="greentext">[响应]白二羯磨</span><br>
            <span class='tiaoJian'>(若你拥有【绝界】，你的[攻击行动]结束时发动)</span>结界师+1<span class='hong'>【祭】</span>，你将1个【结界】加入手牌[强制]。<br>
            <span class="greentext">[被动]虚空境</span><br>
            <span class='tiaoJian'>(若你拥有【绝界】)</span>你拥有的基础效果无法触发。`,
            jueJieX_zero:"[被动]灭界破散",
            jueJieX_remove:"[响应]灭界破散",
            jueJieX_attack:"[响应]白二羯磨",
            jueJieX_wuFa:"[被动]虚空境",
            fuMoJing:"[响应]伏魔境",
            fuMoJing_info:"[水晶]<span class='tiaoJian'>(每当你</span><span class='hong'>【祭】</span><span class='tiaoJian'>增加时发动)</span>对目标对手造成1点法术伤害③；<span class='tiaoJian'>(若因此造成对方士气下降，移除我方【战绩区】1星石)</span>你+1[水晶]。",
            jieJie:"结界",
            jieJie_info:"【结界】为结界师专有展示盖牌，上限为2，不可替换；若【结界】>0，则不能发动【结界仪式】",
            jiX:"祭",
            jiX_info:"<span class='hong'>【祭】</span>为结界师专有指示物，上限为3。",

            //神秘学者
            yanLingShu:"[法术]言灵术",
            yanLingShu_info:"<span class='tiaoJian'>(将1-2张手牌面朝上放置在你角色旁[展示]作为【言灵】)</span>你摸1张牌[强制]；<span class='tiaoJian'>(摸牌后，若你额外弃1张与现存【言灵】系别相同的牌[展示])</span>你+1<span class='hong'>【秘术】</span>。",
            shouHuLing:"[被动]守护灵",
            shouHuLing_info:"<span class='tiaoJian'>(你被主动攻击命中时②，其他角色结算效果前)</span>移除1个【言灵】；<span class='tiaoJian'>(若你额外移除1点</span><span class='hong'>【秘术】</span><span class='tiaoJian'>)</span>将1张手牌面朝上放置在你角色旁[展示]作为【言灵】。",
            zhenYanShu:"[法术]真言术",
            zhenYanShu_backup:'[法术]真言术',
            zhenYanShu_info:"<span class='tiaoJian'>(将1个除光系外的【言灵】视为手牌使用)</span>执行相应的行动；<span class='tiaoJian'>(若使用的【言灵】为咏类命格或法术牌，或你额外移除1点</span><span class='hong'>【秘术】</span><span class='tiaoJian'>)</span>本次相应行动执行完成后，对目标对手造成1点法术伤害③。",
            jinJiMiFa:"[响应]禁忌秘法",
            jinJiMiFa_info:"<span class='tiaoJian'>(你的回合开始前，移除3点</span><span class='hong'>【秘术】</span><span class='tiaoJian'>发动)</span>指定2名目标角色各弃1张牌，你将弃牌面朝上放置在你角色旁[展示]作为【言灵】。",
            yaoJingMiShu:"[响应]妖精秘术[回合限定]",
            yaoJingMiShu_info:"<span class='tiaoJian'>(【真言术】或【真言压制】结算后发动)</span>立即执行一次[攻击行动]；<span class='tiaoJian'>(若本次执行的攻击命中②)</span>你+2<span class='hong'>【秘术】</span>。",
            zhenYanYaZhi:"[响应]真言压制",
            zhenYanYaZhi_info:"[水晶]<span class='tiaoJian'>(【真言术】结算后发动)</span>对目标角色造成1点法术伤害③，你可立即执行一次【真言术】。",
            yanLing:"言灵",
            yanLing_info:"【言灵】为神秘学者专有展示盖牌，上限为3。",
            miShu:"秘术",
            miShu_info:"<span class='hong'>【秘术】</span>为神秘学者专有指示物，上限为4。",

            //染污者
            shenQiZhiYi:"[被动]神弃之裔",
            shenQiZhiYi_info:"游戏初始时，你+1[水晶]。你的[治疗]上限为0[恒定]，你始终无法获得或使用[治疗]，你对拥有[治疗]的角色伤害额外+1。",
            liRuQuanYong:"[响应]戾如泉涌[回合限定]",
            liRuQuanYong_info:"<span class='tiaoJian'>(仅【普通形态】下且你</span><span class='hong'>【戾气】</span></span class='tiaoJian'>数<2，[攻击行动]或[法术行动]结束后发动)</span>你+1<span class='hong'>【戾气】</span>，额外+1[攻击行动]。",
            kuangLiZhiXin:"[被动]狂戾之心[持续]",
            kuangLiZhiXin_info:"<span class='tiaoJian'>(你的回合开始时或承受伤害时⑥，且</span><span class='hong'>【戾气】</span></span class='tiaoJian'>达到上限时)</span>你弃1张牌，指定目标角色移除2[治疗]，[横置]转为【狂戾形态】，此形态下你无法使用[圣光]，你造成的伤害额外+1。 <span class='tiaoJian'>(你的回合结束时若</span><span class='hong'>【戾气】</span></span class='tiaoJian'>数为0)</span>[转正]脱离【狂戾形态】，将你的1[水晶]转换为1[宝石]。",
            kuangLiZhiTi:"[被动]狂戾之体",
            kuangLiZhiTi_info:"<span class='tiaoJian'>(仅【狂戾形态】下且你</span><span class='hong'>【戾气】</span></span class='tiaoJian'>数>0，目标角色对你造成伤害时③)</span>移除1点<span class='hong'>【戾气】</span>，本次伤害额外+1，但伤害最高为4。",
            shenZhiWuRan:"[响应]神智污染",
            shenZhiWuRan_info:"<span class='tiaoJian'>(仅【狂戾形态】下，你对目标角色造成伤害时发动③，移除1点</span><span class='hong'>【戾气】</span></span class='tiaoJian'>)</span>本次伤害额外+1，本次你造成的伤害无法以[治疗]抵御。",
            niuQuZhiAi:"[启动]扭曲之爱",
            niuQuZhiAi_info:"[宝石]调整你的形态为【普通形态】或【狂戾形态】，你弃2张牌或摸2张牌[强制]，并任意调整你的<span class='hong'>【戾气】</span>数。",
            liQi:"戾气",
            liQi_info:"<span class='hong'>【戾气】</span>为污染者专有指示物，上限为2。",

            FAQ_jinGuiZhiNv:"FAQ矜贵之女",
            FAQ_jinGuiZhiNv_prefix: "FAQ",
            FAQ_moFaRuMen:"[法术]魔法入门",
            FAQ_moFaRuMen_info:"你摸1张牌[强制][展示]，根据所展示的牌依序触发相应效果：<span class='tiaoJian'>(若有法术牌)</span>对2名目标对手各造成1点法术伤害③，<span class='tiaoJian'>(若有X张咏类命格)</span>你对X名目标角色各造成1点法术伤害③，<span class='tiaoJian'>(若有X张水系牌)</span>指定X名目标角色各+1[治疗]。",
            FAQ_youQingJiBan:"[响应]友情羁绊[回合限定]",
            FAQ_youQingJiBan_info:"[宝石]<span class='tiaoJian'>(发动【魔法入门】时发动)</span>将“你摸1张牌[强制][展示]”改为“我方2名角色各弃1张牌[强制][展示]”，语句最后增加“各摸1张牌[强制]”。",

            FAQ_shenMiXueZhe:'FAQ神秘学者',
            FAQ_shenMiXueZhe_prefix:'FAQ',
            FAQ_shouHuLing:'[被动]守护灵',
            FAQ_shouHuLing_info:"<span class='tiaoJian'>(你被主动攻击命中时②，其他角色结算效果前)</span>移除1个【言灵】。<span class='tiaoJian'>(你被主动攻击命中时②，其他角色结算效果前，若你移除1点</span><span class='hong'>【秘术】</span><span class='tiaoJian'>)</span>将1张手牌面朝上放置在你角色旁[展示]作为【言灵】。",
        },
	};
});
