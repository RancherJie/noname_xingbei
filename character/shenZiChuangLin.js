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
                '5xing':['nvPuZhang','jieJieShi','shiShenZhe'],
            }
        },
		character:{
            jinGuiZhiNv:['jinGuiZhiNv_name','yongGroup',3,['gaoLingZhiHua','moFaRuMen','Magic','qiangYuYuanXing','youQingJiBan'],],
            nvPuZhang:['nvPuZhang_name','jiGroup',5,['yingZhiXue','miShuMuYing','shun','yingFeng','shiFengZhiDao','jinShu','fengXue','zhen','ying','mi'],],
            jieJieShi:['jieJieShi_name','huanGroup',5,['jieJieYiShi','huangShenZhiLi','huangShenJiYi','jinMoJing','liuLiJing','jueJie','fuMoJing','jieJie','jiX'],],
            shenMiXueZhe:['shenMiXueZhe_name','yongGroup',4,['yanLingShu','shouHuLing','zhenYanShu','jinJiMiFa','yaoJingMiShu','zhenYanYaZhi','yanLing','miShu'],],
            ranWuZhe:['ranWuZhe_name','xueGroup',4,['shenQiZhiYi','liRuQuanYong','kuangLiZhiXin','kuangLiZhiTi','shenZhiWuRan','niuQuZhiAi','liQi'],],
            shiShenZhe: ["shiShenZhe_name","xueGroup",5,["yuRen","qingKe","shiMie","shangMie","tongDiao","ren","gongZhen","zhuShenZhongYan"],],
		},
        characterIntro:{
            jinGuiZhiNv:`身为一位魔法的初学者，艾丽卡施法总是让人提心吊胆，因为连她自己也不知道会发生什么事情。然而她似乎无法体会身旁人的种种暗示，依然我行我素。这样的大小姐，需要队友的多多包容与帮忙`,
            nvPuZhang:`谁能想到完美潇洒的女仆长背后身份则是隐藏于黑暗中的忍者呢？`,
            jieJieShi:`结界师的能力自然体现在他的结界上，适当的布置好结界能够有效的增幅队友，而不适当的结界则只会帮助你的对手`,
            shenMiXueZhe:`操弄言灵进行攻击，从不直接与对手对线，正是神秘学者给人的战斗体验。身为队友协同作战时总得聚精会神，因为说不准被打飞四散的言灵会往你头上飞来`,
            ranWuZhe:`染污者操弄体内戾气，迸发强烈的力量。靠近她的人都会被她蔓延的戾气伤害，人人望而生畏。背弃神，诅咒神，婕姬海德没有宽恕，她品尝着最真实的痛楚`,
            shiShenZhe:"耶梦加得与教廷的爱恨情仇，从她的招式上就可看得出来。她喜欢用手上双刃玩弄对手，将刀刃扎上身躯，然后享受拔出时鲜血狂喷的快感。战斗已经不是战斗，而是一场噬神者的个人表演。",
        },
        card: {
            moRen: {
                type: "gongJi",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                fullskin: true,
                content: function(){
                    "step 0"
                    target.damage(event.damageNum);
                },
                ai: {
                    basic: {
                        useful: 4,
                        value: [4,2,0],
                    },
                },
            },
            yiRen: {
                type: "gongJi",
                enable: true,
                selectTarget: 1,
                filterTarget: function(card,player,target){
                    return target.side!=player.side;
                },
                fullskin: true,
                content: function(){
                    "step 0"
                    target.damage(event.damageNum);
                },
                ai: {
                    basic: {
                        useful: 4,
                        value: [4,2,0],
                    },
                },
            },
        },
		
		skill:{
            //噬神者
            yuRen: {
                type: "qiDong",
                trigger: {player: "qiDong",},
                filter: function(event,player){
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;
                    return !(bool1&&bool2);
                },
                content: function(){
                    'step 0'
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;

                    var list=[];
                    if(!bool1){
                        list.push('moRen');
                    }
                    if(!bool2){
                        list.push('yiRen');
                    }
                    var next=player.chooseButton(['选择获得的【刃】',[list,'vcard']]);
                    next.set('selectButton',[1,1]);
                    next.set('forced',true);
                    'step 1'
                    var card;
                    if(result.links[0][2]=='moRen'){
                        card=game.createCard("moRen", "huo", 'xue');
                        player.storage.moRen=true;
                    }else if(result.links[0][2]=='yiRen'){
                        card=game.createCard("yiRen", "lei", 'xue');
                        player.storage.yiRen=true;
                    }
                    if(card){
                        card.storage.renMaster=player;
                        game.log(player, "获得了1张【刃】")
                        player.gain(card,'draw');
                    }
                },
                check: function(event,player){
                    return player.countCards('h')<player.getHandcardLimit();
                }
            },
            qingKe: {
                trigger: {source: "gongJiMingZhong",},
                filter: function(event,player){
                    return event.card.name=='moRen'||event.card.name=='yiRen';
                },
                content: function(){
                    var card;
                    if(trigger.card.name=='moRen'){
                        card=game.createCard("moRen", "huo", 'xue');
                        player.storage.moRen=true;
                    }else if(trigger.card.name=='yiRen'){
                        card=game.createCard("yiRen", "lei", 'xue');
                        player.storage.yiRen=true;
                    }
                    card.storage.renMaster=player;
                    game.log(trigger.target,'获得了',card);
                    trigger.target.gain(card,'draw');
                },
            },
            shiMie: {
                trigger: { player: "gongJiShi", },
                filter: function(event,player){
                    return event.card.name=='moRen'&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h',function(card){
                        var xiBie=get.xiBie(card);
                        return xiBie=='shui'||xiBie=='huo';
                    }).set('ai',function(){
                        var target=_status.event.target;
                        if(target.zhiLiao>0){
                            return Math.random();
                        }else{
                            return 0;
                        }
                    }).set('target',trigger.target);
                    next.set('prompt',get.prompt('shiMie'));
                    next.set('prompt2',lib.translate.shiMie_info);
                    event.result=await next.forResult();
                },
                content: function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    trigger.target.changeZhiLiao(-1);
                },
            },
            shangMie: {
                trigger: {player: "gongJiShi",},
                filter: function(event,player){
                    return event.card.name=='yiRen'&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var bool=game.hasPlayer(function(current){
                        return current.zhiLiao>0||current.side!=player.side;
                    });
                    var next=player.chooseCardTarget({
                        filterCard:function(card){
                            var xiBie=get.xiBie(card);
                            return xiBie=='feng'||xiBie=='lei';
                        },
                        filterTarget:function(card,player,target){
                            var targetx=_status.event.targetx;
                            return targetx!=target&&target.side!=player.side;
                        },
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2(target) {
                            var player=_status.event.player;
                            if(target.side==player.side) return 0;
                            return target.zhiLiao;
                        },
                    });
                    next.set('targetx',trigger.target);
                    next.set('prompt',get.prompt('shangMie'));
                    next.set('prompt2',lib.translate.shangMie_info);
                    event.result=await next.forResult();
                },
                content: function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    event.targets[0].changeZhiLiao(-1);
                },
            },
            tongDiao: {
                trigger: {player: "ren_daChuQiZhiBefore",},
                forced: true,
                content: function(){
                    trigger.num=1;
                },
            },
            ren: {
                global: ["ren_zhuanHuan1","ren_zhuanHuan2","ren_daChuQiZhi","ren_gaiPai"],
                contentx: function(){
                    for(var card of event.cards){
                        game.broadcastAll(function(card){
                            if(get.name(card)=='moRen'){
                                if(get.xiBie(card,false)=='huo') game.setXiBie(card,'shui');
                                else game.setXiBie(card,'huo');
                            }else if(get.name(card)=='yiRen'){
                                if(get.xiBie(card,false)=='lei') game.setXiBie(card,'feng');
                                else game.setXiBie(card,'lei');
                            }
                            card.$init([card.xiBie,card.mingGe,card.name]);
                        },card);
                    }
                },
                subSkill: {
                    biaoJi:{
                        intro: {
                            mark:function(dialog,storage,player){
                                var num=player.countCards('h',function(card){
                                    return get.name(card)=='moRen'||get.name(card)=='yiRen';
                                });
                                return '共有'+num+'张刃';
                            },
                            markcount:function(storage,player){
                                var num=player.countCards('h',function(card){
                                    return get.name(card)=='moRen'||get.name(card)=='yiRen';
                                });
                                return num;
                            },
                        },
                        trigger: {player:['loseAfter','gainAfter']},
                        direct: true,
                        content: function(){
                            if(player.hasCard(function(card){
                                return get.name(card)=='moRen'||get.name(card)=='yiRen';
                            })){
                                player.markSkill('ren_biaoJi');
                            }else{
                                player.unmarkSkill('ren_biaoJi');
                            }
                        }
                    },
                    zhuanHuan1: {
                        enable: ["gongJiOrFaShu"],
                        filter: function(event,player){
                            return player.hasCard(function(card){
                                return get.name(card)=='moRen'||get.name(card)=='yiRen';
                            });
                        },
                        filterCard: function(card){
                            return get.name(card)=='moRen'||get.name(card)=='yiRen';
                        },
                        selectCard: [1,2],
                        discard: false,
                        lose: false,
                        content: function(){
                            var next=game.createEvent('zhuanHuan');
                            next.cards=cards;
                            next.setContent(lib.skill.ren.contentx);
                            if(_status.currentPhase==player){
                                player.storage[event.getParent('phaseUse').xingDong]++;
                                if(event.getParent().firstAction) event.getParent('phaseUse').firstAction=true;
                            }
                        },
                    },
                    zhuanHuan2: {
                        trigger: {player: ["chooseToDiscardBefore","yingZhanBefore","chooseCardBefore"],},
                        filter: function(event,player){
                            if(event.zhuanHuan==true) return false;
                            return player.hasCard(function(card){
                                return get.name(card)=='moRen'||get.name(card)=='yiRen';
                            });
                        },
                        async cost(event,trigger,player){
                            var next=player.chooseCard('h',function(card){
                                return get.name(card)=='moRen'||get.name(card)=='yiRen';
                            });
                            next.set('prompt','是否转化【刃】的系别');
                            next.set('selectCard',[1,2]);
                            next.set('zhuanHuan',true);
                            if(event.triggername=='yingZhanBefore'){
                                next.set('yingZhan',event.triggername=='yingZhanBefore');
                                next.set('card',trigger.card);
                            }
                            next.set('ai',function(card){
                                if(_status.event.yingZhan){
                                    let xiBei1=get.xiBie(_status.event.card);
                                    if(get.name(card)=='moRen'&&(xiBei1=='huo'||xiBei1=='shui')){
                                        let xiBei2=get.xiBie(card);
                                        if(xiBei2==xiBei1) return 0;
                                        else return 1;
                                    }else if(get.name(card)=='yiRen'&&(xiBei1=='lei'||xiBei1=='feng')){
                                        let xiBei2=get.xiBie(card);
                                        if(xiBei2==xiBei1) return 0;
                                        else return 1;
                                    }
                                }
                                return 0.5;
                            });
                            event.result=await next.forResult();
                        },
                        content: function(){
                            var next=game.createEvent('zhuanHuan');
                            next.cards=event.cards;
                            next.setContent(lib.skill.ren.contentx);
                        },
                    },
                    daChuQiZhi: {
                        trigger: {player: ["daChuPai","discard"],},
                        forced: true,
                        priority:1,
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'moRen' || get.name(event.cards[i]) == 'yiRen') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='moRen'||get.name(card)=='yiRen'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: function(){
                            'step 0'
                            trigger.cards=trigger.cards.remove(event.indexedData);
                            player.faShuDamage(event.num||3,event.indexedData.storage.renMaster);
                            'step 1'
                            let name=get.name(event.indexedData);
                            event.indexedData.storage.renMaster.storage[name]=false;
                            event.indexedData.fix();
                            event.indexedData.remove();
                            event.indexedData.destroyed = true;
                            game.log(event.indexedData, "被移除了");
                        },
                    },
                    gaiPai: {
                        trigger: {player: "addToExpansionEnd",},
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'moRen' || get.name(event.cards[i]) == 'yiRen') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        forced: true,
                        filter: function(event,player){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='moRen'||get.name(card)=='yiRen'){
                                    bool=true;
                                    break;
                                }
                            }
                            return bool;
                        },
                        content: function(){
                            'step 0'
                            player.faShuDamage(1,event.indexedData.storage.renMaster);
                            'step 1'
                            let name=get.name(event.indexedData);
                            event.indexedData.storage.renMaster.storage[name]=false;
                            event.indexedData.fix();
                            event.indexedData.remove();
                            event.indexedData.destroyed = true;
                            game.log(event.indexedData, "被移除了");
                        },
                    },
                },
            },
            gongZhen: {
                trigger: {player: "zaoChengShangHai",},
                filter: function(event,player){
                    return player.canBiShaShuiJing()&&event.faShu;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h',[2,3],function(card){
                        return get.xuanZeTongXiPai(card);
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('gongZhen'));
                    next.set('prompt2',lib.translate.gongZhen_info);
                    next.set('ai',function(card){return 1;});
                    event.result=await next.forResult();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cards,'showCards');
                    var bool1,bool2;
                    if(player.storage.moRen) bool1=true;
                    if(player.storage.yiRen) bool2=true;
                    var list=[];
                    if(!bool1){
                        list.push('moRen');
                    }
                    if(!bool2){
                        list.push('yiRen');
                    }
                    if(list.length==0) return;
                    else{
                        var next=player.chooseButton(['选择获得的【刃】',[list,'vcard']]);
                        next.set('selectButton',[1,2]);
                        var result=await next.forResult();
                        if(result.bool){
                            let cards=[];
                            for(var i=0;i<result.links.length;i++){
                                let card;
                                if(result.links[i][2]=='moRen'){
                                    card=game.createCard('moRen','huo','xue');
                                    player.storage.moRen=true;
                                }else if(result.links[i][2]=='yiRen'){
                                    card=game.createCard('yiRen','lei','xue');
                                    player.storage.yiRen=true;
                                }
                                card.storage.renMaster=player;
                                cards.push(card);
                            }
                            game.log(player,`获得了${cards.length}张【刃】`);
                            await player.gain(cards,'draw');

                            var targets=await player.chooseTarget('对1名目标角色造成1点法术伤害③',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            await targets[0].faShuDamage(1,player);
                        }
                    }
                },
                check: function(event,player){
                    return !player.storage.moRen&&!player.storage.yiRen;
                },
                ai: {
                    shuiJing: true,
                },
            },
            zhuShenZhongYan: {
                type: "faShu",
                enable: ["faShu"],
                filter: function(event,player){
                    return player.canBiShaBaoShi();
                },
                content: async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await player.addNengLiang('shuiJing');
                    await player.faShuDamage(2,player);
                    var players=[];
                    for(var current of game.players){
                        var cards=current.getCards('h');
                        for(var j=0;j<cards.length;j++){
                            if(cards[j].name=='moRen'){
                                players.push(current);
                                player.storage.moRen=false;
                                let card=cards[j];
                                await current.lose(card);
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                                game.log(card, "被移除了");
                            }else if(cards[j].name=='yiRen'){
                                players.push(current);
                                player.storage.yiRen=false;
                                let card=cards[j];
                                await current.lose(card);
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                                game.log(card, "被移除了");
                            }
                            if(players.length>=2) break;
                        }
                        if(players.length>=2) break;
                    }
                    if(players.length==0) return;

                    players.sortBySeat(player);
                    for(var i=0;i<players.length;i++){
                        await players[i].faShuDamage(3,player);
                    }
                    if(players.length>=2){
                        var targets=await player.chooseTarget('对1名目标对手造成2点法术伤害③',true,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return get.damageEffect(target,player,2);
                        }).forResultTargets();
                        await targets[0].faShuDamage(2,player);
                    }
                    
                },
                ai: {
                    baoShi: true,
                    order: function(event,player){
                        var num=player.countCards('h',card=>card.nmae=='moRen'||card.name=='yiRen');
                        if(num>0) return 0;
                        if((!player.storage.yiRen)&&(!player.storage.moRen)) return 0;
                        return 3.6;
                    },
                    result: {
                        player: 1,
                    },
                },
            },

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
                },
                ai:{
                    order:function(card,player){
                        if(player.countCards('h')>=player.getHandcardLimit()) return 1;
                        return 4;
                    },
                    result:{
                        player:function(player){
                            if(player.countCards('h')>=player.getHandcardLimit()) return -1;
                            else return 1;
                        },
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
                    return num<4;
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
                    return player.canGongJi()||player.canFaShu();
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
                logTarget:'player',
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
                logTarget:'player',
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
                    player.chooseCard('h',2,true,'将2张手牌面朝下放置在你角色旁作为【影】').set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 2'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('ying');
                },
                check:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi')>3&&player.countExpansions('ying')<=1;
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
                trigger:{player:'addToExpansionAfter'},
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
                    return !player.getExpansions('jieJie').length>0&&player.hasSkill('jieJie');
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
                    event.target.storage.jueJie_player=player;
                    await event.target.addZhiShiWu('jueJieX');
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
                        trigger:{global:['discard','changeZhiShiWuAfter','gainAfter']},
                        filter:function(event,player,name){
                            if(name=='changeZhiShiWuAfter') return event.zhiShiWu=='jueJieX'&&player.storage.jueJie_player.getExpansions('jieJie').length==0;
                            else if(name=='discard') return event.gaiPai=='jieJie'&&player.storage.jueJie_player.getExpansions('jieJie').length==0;
                            else if(name=='gainAfter') return event.jieJie==true&&player.storage.jueJie_player.getExpansions('jieJie').length==0;
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
                    return player.countCards('h')>0&&player.hasSkill('yanLing');
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
                    return player.getExpansions('yanLing').length>0&&get.is.zhuDongGongJi(event.getParent())&&(player.getExpansions('yanLing').length>0||player.countZhiShiWu('miShu')>0);
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
                        player.removeZhiShiWu('miShu');
                    }else{
                        event.finish();
                    }
                    'step 3'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',true,'将1张手牌面朝上放置在你的角色旁【展示】作为【言灵】');
                    }else event.finish();
                    'step 4'
                    player.showCards(result.cards);
                    event.cards=result.cards;
                    'step 5'
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
                    player.storage.extraXingDong.push({
                        xingDong:'gongJi',
                        bool:true,
                        prompt:'妖精秘法：攻击行动',
                    });
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
                trigger:{player:'addToExpansionAfter'},
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
                        if(!(player.canGongJi()||player.canFaShu())) return '摸2张牌';
                        if(player.countCards('h')+2>=player.getHandcardLimit()) return '弃2张牌';
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
                    return player.canGongJi()||player.canFaShu();
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

        },
		
		translate:{
            jinGuiZhiNv:'矜贵之女',
            nvPuZhang:'女仆长',
            jieJieShi:'结界师',
            shenMiXueZhe:'神秘学者',
            ranWuZhe:'染污者',
            shiShenZhe: "噬神者",

            jinGuiZhiNv_name:'艾丽卡',
            nvPuZhang_name:'千代（胧）',
            jieJieShi_name:'时音',
            shenMiXueZhe_name:'梅丽珊卓',
            ranWuZhe_name:'婕姬海德',
            shiShenZhe_name: "耶梦加得",

            //噬神者
            moRen: "魔刃",
            moRen_info:"<span class=\"greentext\">[被动]魔刃</span><br> <span class='tiaoJian'>(此卡视为手牌，若你拥有【魔刃】，使用、打出或弃置【魔刃】时)</span>你选择此卡视为火系或水系的血类命格攻击牌。<br><span class=\"greentext\">[被动]渗蚀</span><br><span class='tiaoJian'>(若你拥有【刃】，使用、打出或弃置【刃】时)</span>噬神者对你造成3点法术伤害③，然后移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁时)</span>对该角色造成1点法术伤害③，然后移除【刃】。            ",
            yiRen: "异刃",
            yiRen_info:"<span class=\"greentext\">[被动]异刃</span><br><span class='tiaoJian'>(此卡视为手牌，若你拥有【异刃】，使用、打出或弃置【异刃】时)</span>你选择此卡视为雷系或风系的血类命格攻击牌。<br><span class=\"greentext\">[被动]渗蚀</span><br><span class='tiaoJian'>(若你拥有【刃】，使用、打出或弃置【刃】时)</span>噬神者对你造成3点法术伤害③，然后移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁时)</span>对该角色造成1点法术伤害③，然后移除【刃】",
            renSkill_moRen: "[被动]魔刃",
            renSkill_yiRen: "[被动]异刃",
            shenShi: "[被动]渗蚀",
            renSkill_addToExpansion: "[被动]渗蚀",
            yuRen: "[启动]御刃",
            "yuRen_info": "<span class='tiaoJian'>(当【魔刃】或【异刃】未在场时)</span>将【魔刃】或【异刃】加入你手牌[强制]。",
            qingKe: "[响应]侵刻",
            qingKe_info: "<span class='tiaoJian'>(使用【魔刃】或【异刃】攻击命中时发动②)</span>将该卡加入攻击目标手牌[强制]。",
            shiMie: "[响应]噬灭",
            shiMie_info: "<span class='tiaoJian'>(当你使用【魔刃】对目标角色攻击时发动①，额外弃1张水系或火系牌[展示])</span>移除该攻击目标1[治疗]。",
            shangMie: "[响应]殇灭",
            shangMie_info: "<span class='tiaoJian'>(当你使用【异刃】对目标角色攻击时发动①，额外弃1张风系或雷系牌[展示])</span>移除该攻击目标外1名敌方角色1[治疗]。",
            tongDiao: "[被动]同调",
            tongDiao_info: "<span class='tiaoJian'>(你触发【渗蚀】时)</span>3点法术伤害变更为1点法术伤害。",
            ren: "(专)刃",
            ren_zhuanHuan1: "转换刃系别",
            ren_zhuanHuan1_info: "转化【刃】的系别",
            ren_zhuanHuan2: "转换刃系别",
            ren_daChuQiZhi: "[被动]渗蚀",
            ren_biaoJi: "刃",
            ren_gaiPai: "[被动]渗蚀",
            ren_info: "<span class=\"greentext\">[被动]魔刃</span><br><span class='tiaoJian'>(此卡视为手牌，若你拥有【魔刃】，使用、打出或弃置【魔刃】时)</span>你选择此卡视为火系或水系的血类命格攻击牌。<br><span class=\"greentext\">[被动]异刃</span><br><span class='tiaoJian'>(此卡视为手牌，若你拥有【异刃】，使用、打出或弃置【异刃】时)</span>你选择此卡视为雷系或风系的血类命格攻击牌。<br><span class=\"greentext\">[被动]渗蚀</span><br><span class='tiaoJian'>(若你拥有【刃】，使用、打出或弃置【刃】时)</span>噬神者对你造成3点法术伤害③，然后移除【刃】。 <span class='tiaoJian'>(【刃】因技能放置在角色旁时)</span>对该角色造成1点法术伤害③，然后移除【刃】。",
            gongZhen: "[被动]共振",
            gongZhen_info: "[水晶]<span class='tiaoJian'>(任何人对你造成法术伤害时发动③，选择2-3张同系牌)</span>弃置之[展示]；<span class='tiaoJian'>(若你将未在场的【魔刃】和/或【异刃】加入你手牌[强制])</span>对目标角色造成1点法术伤害③。",
            zhuShenZhongYan: "[法术]诸神终焉",
            "zhuShenZhongYan_info": "[宝石]你+1[水晶]，对自己造成2点法术伤害③，将场上的【魔刃】和【异刃】同时移除，然后对原持有【魔刃】和【异刃】的目标角色各造成3点法术伤害③；<span class='tiaoJian'>(若以此法同时移除【魔刃】和【异刃】)</span>对1名目标对手造成2点法术伤害③。",


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
            youQingJiBan_info:"[宝石]<span class='tiaoJian'>(发动【魔法入门】时发动)</span>将“你摸1张牌[强制][展示]”改为“我方2名角色各弃1张牌[强制][展示]，技能效果结束前各摸1张牌[强制]”。",

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
            shouHuLing_info:"<span class='tiaoJian'>(若【言灵】数>0，你被主动攻击命中时②，其他角色结算效果前)</span>移除1个【言灵】；<span class='tiaoJian'>(若你</span><span class='hong'>【秘术】</span>数>0<span class='tiaoJian'>)</span>移除1点<span class='hong'>【秘术】</span>，将1张手牌面朝上放置在你角色旁[展示]作为【言灵】。",
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
        },
	};
});
