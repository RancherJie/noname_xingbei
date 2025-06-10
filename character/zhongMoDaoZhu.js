import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'zhongMoDaoZhu',
		connect:true,
        characterSort:{
            zhongMoDaoZhu:{
                "4xing":['yiJiaoTu',],
                '4.5xing':['jiLuZhe','chuanJiaoShi',],
                "5xing":['zhuLvZhe','hongYiZhuJiao'],
            }
        },
        characterReplace:{
            zhuLvZhe:['zhuLvZhe','hongYiZhuJiao'],
            hongYiZhuJiao:['hongYiZhuJiao','zhuLvZhe'],
        },
		character:{
            zhuLvZhe:['zhuLvZhe_name','xueGroup',5,['shenLvFengSuo','shengXueZhiJi','wangCheYiWei','zuiDuanHuoMian','shengYinSongEn','wangQuanBaoZhu','xinYangChongZhu','shengYiWu','yinZhiZiDan'],['forbidai']],
            hongYiZhuJiao:['zhuLvZhe_name','shengGroup',5,['shengYueYinQi','quMoShi','daoGaoShi','quanNengNiWei','shenXuanDaoYan','shengDian','shengYiWu','yinZhiZiDan']],
            jiLuZhe:['jiLuZhe_name','huanGroup','4/5',['chuanShuoZhiDi','zhiXingHeYi','jiGuShiDian','yiJiLunPo','xuanCuiJingLian','miJingWanXiang','shiShu','guJinHuzheng','yiJi','shiLiao']],
            chuanJiaoShi:['chuanJiaoShi_name','shengGroup','4/5',['shenDeWenTu','xinYangZhiLu','chuanDao','qiShi','shiFeng','luBiao','shuLingEnCi','miSa','qianCheng']],
            yiJiaoTu:['yiJiaoTu_name','huanGroup',4,['yiDuanXieShuo','shenPanYJT','xianJi','moRiYuYan','fangZhu','tanLan','yuYan']],
		},
        characterIntro: {
            zhuLvZhe:`红衣主教对于教义的理解总是那么深刻，有的时候是一人之下万人之上的红衣主教，而有的时候却是铁血暗流的铸律者。而他真正的目的，只有他自己知晓~`,
            hongYiZhuJiao:`有的时候是一人之下万人之上的红衣主教，而有的时候却是铁血暗流的铸律者。而他真正的目的，只有他自己知晓~`,
            jiLuZhe:`多拉贡幻，一个落后于时代的记录者罢了~想要了解么？尝试读懂字里行间的意义吧`,
            chuanJiaoShi:`侍奉、弥撒、启示、传道，伊丽莎白在自己的信仰之路上永不停歇。她坚信自己虔诚的路标不会改变。`,
            yiJiaoTu:`神的使者终究会降临到这个世界，这个世界终究毁灭，只有坚定的信徒才能跟着神使前往新的世界。`,
		},
        card: {
            shiShuCard:{
                //type: "gongJi",
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
            }
        },
        
        skill: {
            chuanShuoZhiDi:{
                trigger:{global:'gameStart'},
                forced:true,
                content:async function (event,trigger,player){
                    for(var current of game.players) current.update();
                    var cards=get.cards(3);
                    await player.addToExpansion('draw',cards,'log').set('gaintag',['yiJi']);
                    await player.showHiddenCards(cards);
                }
            },
            zhiXingHeYi:{
                type:'faShu',
                enable:'faShu',
                content:async function (event,trigger,player){
                    var cards=get.cards(2);
                    game.cardsGotoOrdering(cards);
                    await player.showHiddenCards(cards);
                    var next=player.chooseCardButton(cards);
                    next.set('prompt','你可选择1张牌打出，并弃1张牌');
                    next.set('filterButton',function(button){
                        var player=_status.event.player;
                        for(var current of game.players){
                            if(player.canUseXingBei(button.link,current)) return true;
                        }
                        return false;
                    });
                    next.set('ai',function(button){
                        return get.value(button.link);
                    });
                    var result=await next.forResult();
                    if(result.bool){
                        cards.remove(result.links[0]);
                        await player.chooseToDiscard('h',true);
                        await player.chooseUseTarget(result.links[0],true);
                    }
                    await player.addZhiShiWu('shiLiao',cards.length);
                },
                ai:{
                    order:3.4,
                    result:{
                        player:1,
                    }
                }
            },
            jiGuShiDian:{
                trigger:{player:'changeZhiShiWuAfter'},
                forced:true,
                filter:function (event,player){
                    return event.zhiShiWu=='shiLiao'&&player.countZhiShiWu('shiLiao')>=lib.skill.shiLiao.intro.max;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('shiLiao',player.countZhiShiWu('shiLiao'));
                    await player.chooseToDiscard('h',true);
                    if(!player.hasSkill('shiShuX')){
                        player.addSkill('shiShuX');
                    }
                    if(!player.hasCard(card=>get.name(card)=='shiShuCard')){
                        var card=game.createCard('shiShuCard','','');
                        game.broadcastAll(function(card){
                            card.$init(['di','huan',card.name]);
                        },card);
                        await player.gain(card,'gain2').set('skill','jiGuShiDian');
                    }
                }
            },
            yiJiLunPo:{
                usable:1,
                trigger:{player:'gongJiShi'},
                filter:function (event,player){
                    return player.getExpansions('yiJi').length>0&&event.yingZhan!=true;s
                },
                cost: async function (event,trigger,player){
                    event.list=player.getExpansions('yiJi');
                    event.chuLi=[];
                    for(var card of event.list){
                        let fakeCard=game.createCard(card.name,card.xiBie,card.mingGe,card.duYou);
                        fakeCard.storage.oriCard=card;
                        event.chuLi.push(fakeCard);
                    }
                    event.xiBie=get.xiBie(trigger.card);
                    await event.trigger('yiJiLunPo');
                    let num=0;
                    for(var card of event.chuLi){
                        if(get.xiBie(card)==_status.event.xiBie) num++;
                    }
                    let type='';
                    if(event.length==1) type='one';
                    else if(num>1) type='tongXi';
                    var next=player.chooseCardButton(event.chuLi,[1,Infinity],`是否发动【遗迹论破】<br><span class='tiaoJian'>(移除与攻击牌同系的X个【遗迹】)</span>本次攻击伤害额外+(X-1)；<span class='tiaoJian'>(若X>1)</span>额外+1[法术行动]；<span class='tiaoJian'>(若因此使【遗迹】数减少为0)</span>我方【战绩区】+1[宝石]。`);
                    next.set('select',[1,Infinity]);
                    next.set('filterButton',function(button){
                        return get.xiBie(button.link)==_status.event.xiBie;
                    });
                    next.set('xiBie',event.xiBie);
                    next.set('ai',function(button){
                        var type=_status.event.type;
                        if(type=='one') return 1;
                        else if(type=='tongXi') return 1;
                        else return 0;
                    });
                    next.set('type',type);
                    var result=await next.forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links,
                    }
                },
                content:async function (event,trigger,player){
                    var list=[];
                    for(var card of event.cost_data){
                        list.push(card.storage.oriCard);
                    }
                    await player.discard(list,'yiJi');
                    var num=event.cost_data.length;
                    if(num>1){
                        trigger.changeDamageNum(num-1);
                        player.addFaShu();
                    }
                    if(player.getExpansions('yiJi').length==0) await player.addZhanJi('baoShi');
                }
            },
            xuanCuiJingLian:{
                trigger:{player:'yiJiLunPo'},
                getIndex(event,player) {
                    const cards = event.chuLi;
                    var list=[];
                    for(var card of cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='an'||xiBie=='guang') list.push(card);
                    }
                    return list;
                },
                filter:function (event,player){
                    const cards = event.chuLi;
                    var list=[];
                    for(var card of cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='an'||xiBie=='guang') list.push(card);
                    }
                    return list.length>0; 
                },
                cost: async function (event,trigger,player){
                    var list=lib.xiBie.slice();
                    list.push('cancel2');
                    var dialog = ["选淬精炼：选择视为的系别",[[event.indexedData], "card"]];
                    var next=player.chooseControl(list);
                    next.set('dialog',dialog);
                    next.set('xiBie',trigger.xiBie);
                    next.set('ai',function(){
                        var xiBie=_status.event.xiBie;
                        return xiBie;
                    })
                    var control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    }
                },
                content:async function (event,trigger,player){
                    game.broadcastAll(function(card,xiBie){
                        game.setXiBie(card,xiBie);
                        card.$init([card.xiBie,card.mingGe,card.name,card.duYou]);
                    },event.indexedData,event.cost_data);
                }
            },
            miJingWanXiang:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    return player.hasCard(function(card){
                        return get.name(card)=='shiShuCard';
                    });
                },
                content:async function (event,trigger,player){
                    var card=player.getCards('h',function(card){
                        return get.name(card)=='shiShuCard';
                    })[0];
                    await player.lose(card);
                    card.fix();
                    card.remove();
                    card.destroyed = true;
                    game.log(card, "被移除了");
                    await player.discard(player.getExpansions('yiJi'),'yiJi');
                    var cards=[];
                    while(!(get.countTongXiPai(cards)>=2)){
                        let card=get.cards()[0];
                        await player.showHiddenCards([card]);
                        cards.push(card);
                    }
                    await player.addToExpansion('draw',cards,'log').set('gaintag',['yiJi']);
                    if(cards.length>3){
                        var targets=await player.chooseTarget(true,cards.length-3,`对${cards.length-3}名目标角色造成2点法术伤害③。`).set('ai',function(target){
                            var player=_status.event.player;
                            return get.damageEffect2(target,player,2);
                        }).forResultTargets();
                        targets.sortBySeat();
                        for(var target of targets){
                            await target.faShuDamage(2,player);
                        }
                    }
                },
                ai:{
                    order:3.4,
                    result:{
                        player:function(player){
                            if(player.getExpansions('yiJi').length<=3) return 1;
                            else return 0;
                        }
                    }
                }
            },
            shiShu:{},
            shiShuX:{
                group:['shiShuX_yiShiWeiJing','shiShuX_yinJiBianJian','shiShuX_mod'],
                subSkill:{
                    mod:{
                        priority:-1,
                        mod:{
                            cardType:function(card,player,type){
                                if(card.name=='shiShuCard') return 'gongJi';
                            },
                            cardMingGe:function(card,player,mingGe){
                                if(card.name=='shiShuCard') return 'huan';
                            },
                            cardXiBie:function(card,player,xiBie){
                                if(card.name=='shiShuCard') return 'di';
                            },
                        },
                    }, 
                    yiShiWeiJing:{
                        forced:true,
                        trigger:{player:['daChuPai','discard','addToExpansionEnd'],global:'gainEnd'},
                        getIndex(event, player) {
							const cards = [];
							for(let i = 0; i < event.cards.length; i++) {
                                if(get.name(event.cards[i]) == 'shiShuCard') {
                                    if(event.cards[i].destroyed) continue;
                                    cards.push(event.cards[i]);
                                }
                            }
							return cards;
						},
                        filter: function(event,player,name){
                            var bool=false;
                            for(var card of event.cards){
                                if(get.name(card)=='shiShuCard'){
                                    bool=true;
                                    break;
                                }
                            }
                            if(bool&&name=='gainEnd'&&event.player==player) return false;
                            
                            return bool;
                        },
                        content: async function(event, trigger, player){
                            trigger.cards.remove(event.indexedData);
                            game.broadcastAll(function(card){
                                card.fix();
                                card.remove();
                                card.destroyed = true;
                            }, event.indexedData);
                            game.log(event.indexedData, "被移除了");
                        }
                    },
                    yinJiBianJian:{
                        trigger:{player:'gongJiShi'},
                        filter:function (event,player){
                            return get.name(event.card)=='shiShuCard'&&event.yingZhan!=true;
                        },
                        content:async function (event,trigger,player){
                            var cards=await trigger.target.chooseCard('h',true).forResultCards();
                            if(cards.length>0){
                                let next=player.addToExpansion('draw',cards,'log');
                                next.set('gaintag',['yiJi']);
                                await next;
                            }

                            var cards=player.getExpansions('yiJi');
                            if(player.countCards('h')==0||cards.length==0) return;
                            var next = player.chooseToMove("引稽编鉴：是否将手上X张牌与X个【遗迹】交换，X<3");
                            next.set("list", [
                                ["遗迹", cards],
                                ["手牌", player.getCards("h")],
                            ]);
                            next.set("filterMove", function (from, to, moved) {
                                if (typeof to == "number") return false;
                                var player = _status.event.player;
                                var hs = player.getCards("h");
                                var changed = hs.filter(function (card) {
                                    return !moved[1].includes(card);
                                });
                                var changed2 = moved[1].filter(function (card) {
                                    return !hs.includes(card);
                                });
                                if (changed.length < 2) return true;
                                var pos1 = moved[0].includes(from.link) ? 0 : 1,
                                    pos2 = moved[0].includes(to.link) ? 0 : 1;
                                if (pos1 == pos2) return true;
                                if (pos1 == 0) {
                                    if (changed.includes(from.link)) return true;
                                    return changed2.includes(to.link);
                                }
                                if (changed2.includes(from.link)) return true;
                                return changed.includes(to.link);
                            });
                            var result=await next.forResult();
                            if(!result.moved) return;
                            var pushs = result.moved[0],
                                gains = result.moved[1];
                            pushs.removeArray(player.getExpansions("yiJi"));
                            gains.removeArray(player.getCards("h"));
                            if (!pushs.length || pushs.length != gains.length) return;
                            await player.lose(pushs);
                            await player.lose(gains);
                            await player.addToExpansion(pushs, "draw",'log').set('gaintag',['yiJi']);
                            game.log(player,`获得了${gains.length}张牌`);
                            await player.gain(gains, "draw");
                        }
                    }
                }
            },
            guJinHuzheng:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.addZhiShiWu('shiLiao',2);
                    if(player.countCards('h')>=2&&player.getExpansions('yiJi').length>0){
                        var cards=player.getExpansions('yiJi');
                            var next = player.chooseToMove("古今互鉴：是否将2张手牌与X个【遗迹】交换，X>0");
                            next.set("list", [
                                ["遗迹", cards],
                                ["手牌", player.getCards("h")],
                            ]);
                            next.set("filterMove", function (from, to, moved) {
                                var player = _status.event.player;
                                //交换前
                                if (moved[0].length < 2||moved.length==0) return true;
                                var h=player.getCards("h");
                                var yiJi = player.getExpansions("yiJi");
                                if(typeof to != "number"){
                                    //交换回去
                                    if((moved[0].includes(from.link)&&moved[1].includes(to.link))||moved[0].includes(to.link)&&moved[1].includes(from.link)) return true;
                                    //遗迹间交换
                                    if(yiJi.includes(from.link)&&yiJi.includes(to.link)) return true;
                                    //手牌间交换
                                    if (h.includes(from.link) == h.includes(to.link)) return true;
                                    //移动后，移动的牌在遗迹区交换
                                    if(moved[0].includes(from.link)&&yiJi.includes(to.link)) return true;
                                    if(moved[0].includes(to.link)&&yiJi.includes(from.link)) return true;
                                    //移动后，移动的牌在手牌区交换
                                    if(moved[1].includes(from.link)&&h.includes(to.link)) return true;
                                    if(moved[1].includes(to.link)&&h.includes(from.link)) return true;
                                }else if(to==1){
                                    return true;
                                }else if(to==0){//移动到遗迹区
                                    if(yiJi.includes(from.link)) return true;
                                    return moved[0].length <2
                                }
                            });
                            next.set('filterOk',function(moved){
                                var player=_status.event.player;
                                var pushs = moved[0],
                                    gains = moved[1];
                                pushs.removeArray(player.getExpansions("yiJi"));
                                gains.removeArray(player.getCards("h"));
                                return pushs.length==2&&gains.length>0;
                            });
                            var result=await next.forResult();
                            if(!result.moved) return;
                            var pushs = result.moved[0],
                                gains = result.moved[1];
                            if (!pushs.length) return;
                            await player.lose(pushs);
                            await player.lose(gains);
                            await player.addToExpansion(pushs, player, "giveAuto").set('gaintag',['yiJi']);
                            await player.gain(gains, "draw");
                    }
                },
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }

            },
            yiJi:{
                intro:{
                    content:'expansion',
                    markcount:'expansion',
                },
                trigger:{player:'addToExpansionAfter'},
                direct:true,
                filter:function (event,player){
                    return event.gaintag.includes('shiShu')&&player.getExpansions('shiShu').length>8;
                },
                content:async function (event,trigger,player){
                    var list=player.getExpansions('shiShu');
                    var next=player.chooseCardButton(list,true,list.length-8);
                    next.set('prompt',`舍弃${list.length-8}张【遗迹】`);
                    var result=await next.forResult();
                    player.discard(result.links);
                }
            },
            shiLiao:{
                intro:{
                    max:3,
                    content:'mark',
                },
                markimage:'image/card/zhiShiWu/hong.png',
                onremove:'storage',
            },

            shenLvFengSuo:{
                trigger:{player:'changeZhiLiaoEnd'},
                forced:true,
                filter:function (event,player){
                    return event.num>0;
                },
                content:function (){
                    var shiQi=get.shiQi(player.side);
                    if(shiQi>1){
                        player.changeShiQi(-1);
                    }
                },
                global:'shenLvFengSuo_zhiLiao',
                init:function(player,skill){
                    for(var current of game.players){
                        current.storage['shenLvFengSuo']=player;
                    }
                },
                subSkill:{
                    zhiLiao:{
                        mod:{
                            maxHandcard:function (player,num){
                                if(player.storage.shenLvFengSuo.zhiLiao<player.storage.shenLvFengSuo.getZhiLiaoLimit()&&player.zhiLiao==0){
                                    return num-1;
                                }
                            
                            }
                        }
                    }
                }
            },
            shengXueZhiJi:{
                trigger:{source:'gongJiMingZhong'},
                forced:true,
                filter:function (event,player){
                    return event.yingZhan!=true;
                },
                content:function (){
                    trigger.changeDamageNum(1);
                    player.changeZhiLiao(1);
                }
            },
            wangCheYiWei:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2;
                },
                selectTarget:[1,2],
                filterTarget:function (card,player,target){
                    return target.zhiLiao>0;
                },
                filterOk:function (){
                    var num=0;
                    var players=ui.selected.targets;
                    for(var player of players){
                        num+=player.zhiLiao;
                    }
                    return num>=2;
                },
                contentBefore:function (){
                    player.addZhiShiWu('yinZhiZiDan',2);
                },
                content:function (){
                    if(targets.length==1){
                        target.changeZhiLiao(-2);
                    }else if(targets.length==2){
                        target.changeZhiLiao(-1);
                    }
                },
                contentAfter:async function (event,trigger,player){
                    var list=player.jiChuXiaoGuoList();
                    if(list.length>0){
                        for(var xiaoGuo of list){
                            let cards=player.getExpansions(xiaoGuo);
                            await player.loseToDiscardpile(cards);
                            if(xiaoGuo=='_zhongDu') player.storage.zhongDu=[];
                        }
                    }
                    if(player.zhiLiao>0) await player.changeZhiLiao(-player.zhiLiao);
                    await player.reinitCharacter(player.name1,'hongYiZhuJiao');
                    player.addGongJi();
                },
                ai:{
                    order:3.1,
                    result:{
                        target:function(player,target){
                            return -target.zhiLiao;
                        },
                    }
                }
            },
            zuiDuanHuoMian:{
                trigger:{global:'changeShiQiBefore'},
                filter:function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                cost: async function (event,trigger,player){
                    var list=[];
                    for(var i=1;i<=player.countZhiShiWu('shengYiWu');i++){
                        if(i>-trigger.num) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var next=player.chooseControl(list);
                    next.set('prompt',get.prompt('zuiDuanHuoMian'));
                    next.set('prompt2',lib.translate.zuiDuanHuoMian_info);
                    next.set('num',list.length);
                    next.set('ai',function(){
                        return _status.event.num-2;
                    });
                    var control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    };
                },
                content:async function (event,trigger,player){
                    trigger.num+=event.cost_data;
                    await player.changeZhiShiWu('shengYiWu',-event.cost_data);
                    await player.addZhiShiWu('yinZhiZiDan',event.cost_data);
                }
            },
            shengYinSongEn:{
                trigger:{player:'gongJiEnd'},
                usable:1,
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2&&event.yingZhan!=true;
                },
                cost: async function (event,trigger,player){
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('shengYinSongEn'));
                    next.set('prompt2',lib.translate.shengYinSongEn_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    player.addGongJi();
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    await event.targets[0].changeZhiLiao(1);
                }
            },
            wangQuanBaoZhu:{},
            wangQuanBaoZhuX:{
                global:['wangQuanBaoZhuX_biaoJi','wangQuanBaoZhuX_shengLvWeiYa','wangQuanBaoZhuX_shenYanYongZan1','wangQuanBaoZhuX_shenYanYongZan2'],
                subSkill:{
                    biaoJi:{
                        intro:{
                            content:'expansion',
                            nocount:true,
                        },
                        markimage:'image/card/zhuanShu/wangQuanBaoZhu.png',
                    },
                    shengLvWeiYa:{
                        trigger:{player:'addToExpansionAfter'},
                        filter:function (event,player){
                            return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        forced:true,
                        content:async function (event,trigger,player){
                            if(player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0){
                                var type=get.type(trigger.cards[0]);
                                var next=player.chooseCard('h',card=>get.type(card)==_status.event.type);
                                next.set('ai',function(card){
                                    var player=_status.event.player;
                                    if(player.side!=player.storage.wangQuanBaoZhuX_player.side&&player.countCards('h')+2<=player.getHandcardLimit()) return 0;
                                    return 8-get.value(card);
                                });
                                next.set('type',type);
                                next.set('prompt','请选择一张与【王权宝珠】上牌种类相同的牌,弃置之[展示],否则摸2张牌，铸律者阵营士气-1，若【圣遗物】数<1移除此卡');
                                var result=await next.forResult();
                            }else var result={bool:false};
                            
                            if(result.bool){
                                await player.discard(result.cards[0],'showCards');
                            }else{
                                await player.draw(2);
                                await player.changeShiQi(-1,player.storage.wangQuanBaoZhuX_player.side);
                                if(player.storage.wangQuanBaoZhuX_player.countZhiShiWu('shengYiWu')<1){
                                    await player.loseToDiscardpile(player.getExpansions('wangQuanBaoZhuX_biaoJi'));
                                    player.storage.wangQuanBaoZhuX_player.removeSkill('wangQuanBaoZhuX');
                                }
                            }
                        }
                    },
                    shenYanYongZan1:{
                        trigger:{player:'wangQuanBaoZhuX_shengLvWeiYaAfter'},
                        forced:true,
                        filter:function (event,player){
                            return player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0;
                        },
                        content:async function (event,trigger,player){
                            await player.getNext().addToExpansion(player.getExpansions('wangQuanBaoZhuX_biaoJi'),player,'gain2').set('type','zhuanYi').set('gaintag',['wangQuanBaoZhuX_biaoJi']).set('special',true); 
                        },
                    },
                    shenYanYongZan2:{
                        trigger:{player:'addToExpansionEnd'},
                        forced:true,
                        filter:function (event,player){
                            return event.gaintag.includes('wangQuanBaoZhuX_biaoJi')&&player.getExpansions('wangQuanBaoZhuX_biaoJi').length>0&&event.type=='zhuanYi'&&player.name=='zhuLvZhe';
                        },
                        content:async function (event,trigger,player){
                            var choiceList=["将角色卡替换为【红衣主教】，然后移除此卡","<span class='tiaoJian'>(移除X点</span><span class='hong'>【银制子弹】</span><span class='tiaoJian'>，X<3)</span>目标角色摸X张牌[强制]，然后移除此卡"];
                            var list=['选项一'];
                            if(player.hasZhiShiWu('yinZhiZiDan')) list.push('选项二');
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                if(_status.event.bool) {
                                    var num=Math.random();
                                    if(num<0.5) return 0;
                                    return 1;
                                }
                                return 0;
                            });
                            next.set('bool',list.length>1);
                            var control=await next.forResultControl();
                            if(control=='选项一'){
                                await player.reinitCharacter(player.name1,'hongYiZhuJiao');
                            }else if(control=='选项二'){
                                let list=[];
                                for(let i=1;i<=player.countZhiShiWu('yinZhiZiDan');i++){
                                    if(i>=3) break;
                                    list.push(i);
                                }
                                let control=await player.chooseControl(list).set('prompt','移除X点【银制子弹】，目标角色摸X张牌').forResultControl();
                                await player.changeZhiShiWu('yinZhiZiDan',-control);
                                var targets=await player.chooseTarget(true,`目标角色摸${control}张牌`).set('ai',function(target){
                                    var player=_status.event.player;
                                    if(player.side==target.side) return 0;
                                    else return target.countCards('h');
                                }).forResultTargets();
                                await targets[0].draw(control); 
                            }
                            await player.loseToDiscardpile(player.getExpansions('wangQuanBaoZhuX_biaoJi'));
                            player.storage.wangQuanBaoZhuX_player.removeSkill('wangQuanBaoZhuX');
                        },
                    }
                },
                
            },
            xinYangChongZhu:{
                trigger:{player:'phaseEnd'},
                filter:function (event,player){
                    return player.canBiShaShuiJing()&&!event.teShu&&player.countCards('h')>0;
                },
                async cost(event,trigger,player){
                    var next=player.chooseCard('h');
                    next.set('ai',function(card){
                        return 8-get.value(card);
                    });
                    next.set('prompt',get.prompt('xinYangChongZhu'));
                    next.set('prompt2',lib.translate.xinYangChongZhu_info);
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.lose(event.cards);
                    await player.showCards(event.cards);
                    await player.draw();
                    await player.addZhiShiWu('shengYiWu',2);
                    if(!player.hasSkill('wangQuanBaoZhuX')) player.addSkill('wangQuanBaoZhuX');
                    for(var current of game.players) current.storage.wangQuanBaoZhuX_player=player;
                    await player.addToExpansion(event.cards,player,'gain2').set('type','fangZhi').set('gaintag',['wangQuanBaoZhuX_biaoJi']).set('special',true);
                },
                group:'xinYangChongZhu_teShu',
                subSkill:{
                    teShu:{
                        trigger:{player:'teShuAfter'},
                        direct:true,
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            shengYiWu:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/lan.png',
            },
            yinZhiZiDan:{
                intro:{
                    content:'mark',
                    max:3,
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/hong.png',
            },

            shengYueYinQi:{
                forced:true,
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function (event,player,name){
                    if(name=='gongJiEnd') return event.yingZhan!=true;
                    return true;
                },
                content:function (){
                    player.addZhiShiWu('yinZhiZiDan');
                }
            },
            quMoShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>=2;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan',2);
                    var targets=await player.chooseTarget(true,'我方目标角色弃1张牌',function(card,player,target){
                        return player.side==target.side;
                    }).set('ai',function(target){
                        return target.countCards('h');
                    }).forResultTargets();
                    var cards=await targets[0].chooseToDiscard('he',true,'showCards').forResultCards();
                    if(get.mingGe(cards[0])=='sheng'){
                        await player.changeZhiLiao(1);
                        await player.draw();
                    }
                },
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                }
            },
            daoGaoShi:{
                trigger:{player:'gongJiBefore'},
                filter:function (event,player){
                    return player.countZhiShiWu('yinZhiZiDan')>0&&event.yingZhan!=true;
                },
                cost: async function (event,trigger,player){
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('daoGaoShi'));
                    next.set('prompt2',lib.translate.daoGaoShi_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('yinZhiZiDan');
                    await event.targets[0].changeZhiLiao(1);
                }
            },
            quanNengNiWei:{
                type:'faShu',
                enable:'faShu',
                filter:function (event,player){
                    var num=0;
                    for(var current of game.players){
                        num+=current.zhiLiao;
                    }
                    return num>=2||player.countZhiShiWu('yinZhiZiDan')>=1;
                },
                selectTarget:[0,2],
                filterTarget:function (card,player,target){
                    return target.zhiLiao>0&&player.side==target.side;
                },
                filterOk:function (){
                    if(ui.selected.targets.length==0){
                        var player=_status.event.player;
                        return player.countZhiShiWu('yinZhiZiDan')>=1;
                    }else{
                        var num=0;
                        var players=ui.selected.targets;
                        for(var player of players){
                            num+=player.zhiLiao;
                        }
                        return num>=2;
                    }
                },
                content:async function (event,trigger,player){
                    if(event.targets.length==0){
                        await player.removeZhiShiWu('yinZhiZiDan');
                    }else if(event.targets.length==1){
                        await event.target.changeZhiLiao(-2);
                    }else if(event.targets.length==2){
                        await event.target.changeZhiLiao(-1);
                    }
                },
                contentAfter:async function (event,trigger,player){
                    await player.addZhiShiWu('shengYiWu',2);
                    var list=player.jiChuXiaoGuoList();
                    if(list.length>0){
                        for(var xiaoGuo of list){
                            let cards=player.getExpansions(xiaoGuo);
                            await player.loseToDiscardpile(cards);
                            if(xiaoGuo=='_zhongDu') player.storage.zhongDu=[];
                        }
                    }
                    if(player.zhiLiao>0) await player.changeZhiLiao(-player.zhiLiao);
                    if(player.countCards('h')>4) player.chooseToDiscard('h',true,player.countCards('h')-4);
                    await player.reinitCharacter(player.name1,'zhuLvZhe');
                },
                ai:{
                    order:3.1,
                    result:{
                        player:1
                    }
                }
            },
            shenXuanDaoYan:{
                trigger:{global:'changeShiQiBefore'},
                filter:function (event,player){
                    if(event.side!=player.side) return false;
                    return player.hasZhiShiWu('shengYiWu')&&event.num<0&&event.cause!='damage';
                },
                content:async function (event,trigger,player){
                    trigger.num+=1;
                    await player.changeZhiShiWu('shengYiWu',-1);
                    await player.addZhiShiWu('yinZhiZiDan',1);
                }
            },
            shengDian:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    for(var current of game.players){
                        if(current.zhiLiao==0&&current.side==player.side) await current.changeZhiLiao(1);
                    }
                },
                check:function (event,player){
                    return player.canGongJi()||player.canFaShu();
                },
                ai:{
                    shuiJing:true,
                }
            },

            shenDeWenTu:{
                getPrevious:function (player){
                    var target=player;
                    for (var i = 0; i < game.players.length - 1; i++) {
                        target=target.getPrevious();
                        if(!target.hasSkillTag('noLuBiao')) return target;
                    }
                    return null;
                },
                trigger:{global:'phaseOver'},
                forced:true,
                filter:function (event,player){
                    return player.storage.luBiaoTarget&&event.player==player.storage.luBiaoTarget;
                },
                content:function (){
                    player.phase('shenDeWenTu');
                },
                group:['shenDeWenTu_phaseBefore','shenDeWenTu_ban'],
                subSkill:{
                    phaseBefore:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        filter:function (event,player){
                            return player.storage.luBiaoTarget&&event.skill!='shenDeWenTu';
                        },
                        content:function (){
                            trigger.cancel()
                        }
                    },
                    ban:{
                        trigger:{global:'gameStart'},
                        direct:true,
                        filter:function (event,player){
                            return game.players.length==4;
                        },
                        content:function (){
                            player.tempBanSkill('shenDeWenTu','forever');
                        }
                    }
                },
                ai:{
                    noLuBiao:true,
                    skillTagFilter:function (player,tag){
                        if(tag=='noLuBiao'&&game.players.length==4){
                            return false;
                        }
                    }
                }
            },
            xinYangZhiLu:{
                trigger:{player:'phaseBegin'},
                forced:true,
                filter:function (event,player){
                    return player.phaseNumber == 1;
                },
                content:async function (event,trigger,player){
                    var target=lib.skill.shenDeWenTu.getPrevious(player);
                    game.addGlobalSkill('luBiaoX');
                    for(var current of game.players){
                        current.storage.luBiaoPlayer=player;
                    }
                    player.storage.luBiaoTarget=target;
                    await target.addZhiShiWu('luBiaoX').set('type','fangZhi');
                },
                group:['xinYangZhiLu_teShu','xinYangZhiLu_zhuanYi'],
                subSkill:{
                    teShu:{
                        trigger:{player:'teShuAfter'},
                        direct:true,
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    },
                    zhuanYi:{
                        forced:true,
                        trigger:{player:'phaseEnd'},
                        filter:function(event,player){
                            return !event.teShu;
                        },
                        content:async function (event,trigger,player){
                            await event.trigger('luBiaoXZhuanYi');
                            if(event.zhuanYi!=false){
                                await player.storage.luBiaoTarget.removeZhiShiWu('luBiaoX');
                                var target=lib.skill.shenDeWenTu.getPrevious(player.storage.luBiaoTarget);
                                player.storage.luBiaoTarget=target;
                                await target.addZhiShiWu('luBiaoX').set('type','zhuanYi');
                            }
                        }
                    }
                },
            },
            chuanDao:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                content:async function (event,trigger,player){
                    var h_num=player.countCards('h');
                    if(h_num>0){
                        await player.chooseDraw(1);
                    }else if(h_num==0){
                        await player.draw();
                    }
                    var cards1=await player.chooseToDiscard('h',true,1,'showCards').set('selfSkil',true).set('shiFeng',false).forResultCards();
                    await player.addZhiShiWu('qianCheng',1);
                    var cards2=await player.storage.luBiaoTarget.chooseToDiscard('h',true,1,'showCards').forResultCards();
                    if(cards2.length>0){
                        await player.gain(cards2);
                        if(get.xiBie(cards1[0])==get.xiBie(cards2[0])||get.mingGe(cards1[0])==get.mingGe(cards2[0])){
                            await player.addZhiShiWu('qianCheng',1);
                        }
                    }
                    event.cards=cards1;
                    await event.trigger('chuanDao');
                },
                check:function (event,player){
                    if(player.storage.luBiaoTarget.countCards('h')==0) return false;
                    return player.countCards('h')>1&&(player.canGongJi()||player.canFaShu());
                }
            },
            qiShi:{
                trigger:{global:'luBiaoXZhuanYi'},
                filter:function (event,player){
                    return player.countZhiShiWu('qianCheng')>=2;
                },
                content:async function (event,trigger,player){
                    await player.removeZhiShiWu('qianCheng',2);
                    var next=player.chooseTarget(`目标角色+1[治疗]，否则你摸1张牌[强制][展示]。<span class='tiaoJian'>(若该牌为法术牌或者圣类命格)</span>取消本次转移并移除【路标】，然后将【路标】放置在目标角色面前`);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(player.countCards('h')+1>=player.getHandcardLimit()&&player.side==target.side) return 0.5;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    var result=await next.forResult();
                    if(result.bool){
                        await result.targets[0].changeZhiLiao(1);
                    }else{
                        var cards=await player.draw().forResult();
                        await player.showCards(cards);
                        if(get.type(cards[0])=='faShu'||get.mingGe(cards[0])=='sheng'){
                            trigger.zhuanYi=false;
                            await player.storage.luBiaoTarget.removeZhiShiWu('luBiaoX');
                            var targets=await player.chooseTarget(true,'将【路标】放置在目标角色面前',function(card,player,target){
                                return !target.hasSkillTag('noLuBiao');
                            }).set('ai',function(target){
                                var player=_status.event.player.storage.luBiaoTarget;
                                if(target==player.getNext()) return 1;
                                else return 0.5;
                            }).forResultTargets();
                            player.storage.luBiaoTarget=targets[0];
                            await targets[0].addZhiShiWu('luBiaoX').set('type','fangZhi');
                        }
                    }
                },
            },
            shiFeng:{
                trigger:{player:['loseAfter','chuanDao','miSa']},
                filter:function (event,player,name){
                    if(name=='loseAfter'){
                        if (event.type != "discard") return false;
                        if(event.getParent('chooseToDiscard').shiFeng==false) return false;
                        return player.zhiLiao>0&&event.getParent('chooseToDiscard').selfSkil&&get.position(event.cards[0], true) === "d";
                    }else if(name=='chuanDao' || name=='miSa'){
                        return player.zhiLiao>0&&event.cards.length>0;
                    }
                },
                content:async function (event,trigger,player){
                    console.log(trigger.name);
                    await player.changeZhiLiao(-1);
                    game.log(player.storage.luBiaoTarget,'获得了1张牌',);
                    await player.storage.luBiaoTarget.gain(trigger.cards,'draw').set('shiFeng',true);
                    if(!event.bool){
                        var targets=await player.chooseTarget('指定除你外的目标角色+1[治疗]',true,function(card,player,target){
                            return player!=target;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            return get.zhiLiaoEffect2(target,player,1);
                        }).forResultTargets();
                        await targets[0].changeZhiLiao(1);
                    }
                },
                group:'shiFeng_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('gain').shiFeng==true&&event.num<0;
                        },
                        content:function(){
                            event.getParent('shiFeng').bool=true;
                        }
                    },
                }
            },
            luBiao:{},
            luBiaoX:{
                intro:{
                    name:'路标',
                    nocount:true,
                    content:`
                    <span class="greentext">[响应]告解式[回合限定]</span><br>
                    <span class='tiaoJian'>(此卡被转移至你面前时，你摸2张牌[强制])</span>我方【战绩区】+1[水晶]，然后将此卡转移至你左手边最近的角色面前，传教士弃1张牌。
                    `,
                },
                markimage:'image/card/zhuanShu/luBiao.png',
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function (event,player){
                    return event.zhiShiWu=='luBiaoX'&&event.type=='zhuanYi'&&event.gaoJieShi!=true;
                },
                content:async function (event,trigger,player){
                    await player.draw(2);
                    await player.addZhanJi('shuiJing',1);
                    await event.trigger('luBiaoXZhuanYi');
                    if(event.zhuanYi!=false){
                        await player.removeZhiShiWu('luBiaoX');
                        var target=lib.skill.shenDeWenTu.getPrevious(player);
                        player.storage.luBiaoPlayer.storage.luBiaoTarget=target;
                        await target.addZhiShiWu('luBiaoX').set('type','zhuanYi').set('gaoJieShi',true);
                    }
                    await player.storage.luBiaoPlayer.chooseToDiscard('h',1,true,'告解式：弃1张牌').set('selfSkil',true)
                },
                check:function (event,player){
                    if(player.countCards('h')+2>player.getHandcardLimit()) return false;
                    else return true;
                }
            },
            shuLingEnCi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.changeZhiLiao(1);
                    await player.chooseToDiscard('h',true,1).set('selfSkil',true);
                },
                check:function (event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi'||(get.name(card)=='moDan'||get.name(card)=='xuRuo')||get.name(card)=='shengDun')>1;
                },
                ai:{
                    shuiJing:true,
                }
            },
            miSa:{
                trigger:{global:'changeZhiShiWuAfter'},
                filter:function (event,player){
                    return event.zhiShiWu=='luBiaoX'&&(event.type=='fangZhi'||event.type=='zhuanYi')&&player.canBiShaShuiJing()&&event.player.hasZhiShiWu('luBiaoX');
                },
                logTarget:'player',
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.addZhiShiWu('qianCheng',1);
                    var choiceList=["弃1张牌[展示]。<span class='tiaoJian'>(若盖牌为【虚弱】、【中毒】或【中毒】)</span>将该牌放置在拥有【路标】的角色面前作为基础效果","·<span class='tiaoJian'>(将拥有【路标】的角色面前一张基础效果牌收入自己手中)</span>你+1<span class='hong'>【虔诚】</span>"];
                    var list=['选项一'];
                    if(player.storage.luBiaoTarget.hasJiChuXiaoGuo()) list.push('选项二');
                    var next=player.chooseControl(list);
                    next.set('choiceList',choiceList);
                    next.set('ai',function(){
                        var player=_status.event.player;
                        var target=player.storage.luBiaoTarget;
                        if(player.countCards('h')+1>=player.getHandcardLimit()) return '选项一';
                        if(target.hasJiChuXiaoGuo()){
                            if(player.side==target.side){
                                var effect=-get.jiChuXiaoGuoEffect(target);
                            }else{
                                var effect=get.jiChuXiaoGuoEffect(target);
                            }
                            if(effect>0) return '选项一';
                            else if(effect<0) return '选项二';
                        }else{
                            return '选项一';
                        }
                    });
                    var control=await next.forResultControl();
                    if(control=='选项一'){
                        if(player.countCards('h')==0) return;
                        var cards=await player.chooseToDiscard('h','showCards',1,true).set('selfSkil',true).set('shiFeng',false).set('ai',function(card){
                            var player=_status.event.player;
                            if(player.side==player.storage.luBiaoTarget.side){
                                if(get.name(card)=='shengDun') return 1;
                                else if(get.name(card)=='xuRuo'||get.name(card)=='zhongDu') return 0.2;
                                else return 0.5;
                            }else{
                                if(get.name(card)=='xuRuo'||get.name(card)=='zhongDu') return 1;
                                else return 0.5;
                            }
                        }).forResultCards();
                        var name=get.name(cards[0]);
                        if(((name=='xuRuo'||name=='shengDun')&&player.storage.luBiaoTarget.getExpansions("_"+name).length==0)||name=='zhongDu'){
                            await player.storage.luBiaoTarget.addToExpansion(cards,player,'gain2').set('gaintag',["_"+name]);
                            if(name=='zhongDu') player.storage.luBiaoTarget.storage.zhongDu.push(player);
                            cards=[];
                        }
                        event.cards=cards;
                        await event.trigger('miSa');
                    }else if(control=='选项二'){
                        await player.gainJiChuXiaoGuo(player.storage.luBiaoTarget);
                        await player.addZhiShiWu('qianCheng',1);
                    }
                },
                check:function (event,player){
                    return player.countCards('h')>=3
                }
            },
            qianCheng:{
                intro:{
                    max:4,
                    content:'mark',
                },
                markimage:'image/card/zhiShiWu/hong.png',
            },

            yiDuanXieShuo:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function (){
                    player.addNengLiang('shuiJing');
                },
                mod:{
                    maxHandcard:function (player,num){
                        if(player.hasExpansions('yuYan')) return num-1;
                    }
                }
            },
            shenPanYJT:{
                trigger:{player:'phaseEnd'},
                filter:function (event,player){
                    return player.storage.shenPanYJT.length>0;
                },
                cost:async function (event,trigger,player){
                    var next=player.chooseTarget(function(card,player,target){
                        return player.storage.shenPanYJT.includes(target);
                    });
                    next.set('prompt',get.prompt('shenPanYJT'));
                    next.set('prompt2',lib.translate.shenPanYJT_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(player.countCards('h',card=>get.value(card)<3.5)>0) return target.countCards('h');
                        else return 0;
                    });
                    event.result=await next.forResult();
                },
                content:async function (event,trigger,player){
                    var players=game.filterPlayer(function(current){
                        return player.side==current.side;
                    })
                    players.sortBySeat();
                    var cards=[];
                    for(let current of players){
                        let card=await current.chooseToDiscard('h',true,1,'showCards').forResultCards();
                        if(card.length>0&&!card[0].destroyed){
                            cards.push(card[0]);
                        }
                    }
                    for(let current of players){
                        await current.draw();
                    }
                    var name=get.colorName(event.targets[0]);
                    if(cards.length>0){
                        let card=await player.chooseCardButton(cards,true,`选择1张弃牌加入${name}的手牌`).set('ai',function(button){
                            return 6-get.value(button.link);
                        }).forResultLinks();
                        game.log(event.targets[0],'获得了1张牌');
                        await event.targets[0].gain(card,'draw');
                        cards.remove(card[0]);
                    }
                    if(player.getExpansions('yuYan').length>=6) return;
                    if(player.hasExpansions('yuYan')&&cards.length>0){
                        cards.randomSort();
                        if(cards.length+player.countExpansions('yuYan')>6){
                            cards=cards.randomGets(6-player.getExpansions('yuYan').length);
                        }
                        game.log(player,`将${cards.length}张牌 加入`,`#g【预言】`);
                        await player.addToExpansion(cards,'draw').set('gaintag',["yuYan"]).set('special',true);
                    }
                    
                },
                group:['shenPanYJT_chongZhi','shenPanYJT_zaoChengShangHai'],
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:1,
                        content:function (){
                            player.storage.shenPanYJT=[];
                        }
                    },
                    zaoChengShangHai:{
                        trigger:{source:'zaoChengShangHai'},
                        direct:true,
                        filter:function (event,player){
                            return event.player.side!=player.side&&Array.isArray(player.storage.shenPanYJT);
                        },
                        content:function (){
                            player.storage.shenPanYJT.push(trigger.player);
                        }
                    }
                }
            },
            xianJi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function (event,player){
                    return player.hasExpansions('yuYan');
                },
                content:async function (event,trigger,player){
                    var list=lib.xiBie.slice();
                    var xiBie=await player.chooseControl(list).set('prompt',`指定1个系别，与【预言】堆顶的牌比较`).set('ai',function(){
                        var num=Math.random();
                        if(num>0.1){
                            var player=_status.event.player;
                            var cards=player.getExpansions('yuYan');
                            var card=cards[cards.length-1];
                            return get.xiBie(card);
                        }else{
                            var list=lib.xiBie.slice();
                            return list.randomGet();
                        }
                    }).forResultControl();
                    game.log(player,`指定了${get.translation(xiBie)}系`);
                    player.popup(get.translation(xiBie));
                    var yuYan=player.getExpansions('yuYan');
                    var card=player.getExpansions('yuYan')[yuYan.length-1];
                    player.showHiddenCards(card);
                    var xiBie2=get.xiBie(card);
                    if(xiBie==xiBie2){
                        await player.discard(card,'yuYan');
                        await player.addZhanJi('baoShi');
                        await event.trigger('xianJi');
                    }
                    else{
                        let cards=get.cards();
                        game.log(player,`将${cards.length}张牌加入`,`#g【预言】`);
                        await player.addToExpansion(cards,'draw').set('gaintag',["yuYan"]).set('special',true);
                        game.log(player,`将1张牌加入手牌`);
                        await player.gain(card);
                    }
                },
                check:function (event,player){
                    return player.canFaShu()||player.canGongJi();
                }
            },
            moRiYuYan:{},
            fangZhu:{
                type:'faShu',
                enable:'faShu',
                usable:1,
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    player.storage.fangZhu=true;

                    var list=[6,7,8];
                    var num=await player.chooseControl(list).set('prompt',`无视手牌上限摸6-8张牌`).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')+2>=5) return 0;
                        else if(player.countCards('h')+4>=5) return 1;
                        else if(player.countCards('h')+5>=5) return 2;
                        else return 1;
                    }).forResultControl();
                    await player.draw(num);
                    await player.discard(player.getExpansions('yuYan'));
                    player.removeSkill('yuYan_zero');

                    list=[];
                    if(!player.hasZhiShiWu('yuYan_tianLeiJieHuo')) list.push('yuYan_tianLeiJieHuo');
                    if(!player.hasZhiShiWu('yuYan_diLieBoTao')) list.push('yuYan_diLieBoTao');
                    if(list.length==0) return;
                    var moRi=await player.chooseControl(list).set('prompt',`选择1个【末日预言】放置到场上`).forResultControl();
                    player.storage.moRiYuYan=moRi;
                    player.addSkill('yuYan_zero');
                    player.markSkill('yuYan');
                    var cards=await player.chooseCard('h',true,6,'将6张手牌面朝下洗混放置到【末日预言】上作为【预言】').set('ai',function(card){
                        return 8-get.value(card);
                    }).forResultCards();
                    cards=cards.randomSort();
                    game.log(player,`将${cards.length}张牌加入`,`#g【预言】`);
                    await player.addToExpansion(cards,'draw').set('gaintag',["yuYan"]).set('special',true);

                    player.addGongJiOrFaShu();
                    player.storage.fangZhu=false;
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        if(!player.hasExpansions('yuYan')) return 4;
                        else return 3;
                    },
                    result:{
                        player:1,
                    }
                },
                mod:{
                    maxHandcardWuShi:function(player,num){
                        if(player.storage.fangZhu) return Infinity;
                    },
                    aiOrder:function(player,item,num){
                        if(item=='_tiLian'&&player.hasExpansions('yuYan')<=1&&player.countNengLiang()<1) return num+1;
                    }
                },
            },
            tanLan:{
                trigger:{player:'yuYanJieGuo'},
                filter:function (event,player){
                    return player.canBiShaShuiJing();
                },
                content:async function (event,trigger,player){
                    await player.removeBiShaShuiJing();
                    trigger.bool=true;
                },
                check:function (event,player){
                    return player.countCards('h')>=3;
                }
            },
            yuYan:{
                intro:{
                    name:'预言',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('yuYan');
                        if(!cards||!cards.length) return;
						if(player.isUnderControl(true)) dialog.addAuto(get.translation(player.storage.moRiYuYan));
                        dialog.addText(`<span class="greentext">[被动]末日预言</span><br>
                        <span class='tiaoJian'>(此卡在场时，每当有角色因承受伤害而摸牌时)</span>本次摸牌的第1张牌改为自【预言】处获得。<span class='tiaoJian'>(此卡上最后1张【预言】被移除或获得，且结算完后)</span>将此卡翻面。可变为【天雷劫火】或【地裂波涛】。【末日预言】的【预言】上限为6。`,false);
						return '共有'+cards.length+'张牌';
					},
                    markcount:'expansion',
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions('yuYan');
                    if (cards.length) player.discard(cards);
                },
                markimage:'image/card/zhuanShu/moRiYuYan.png',
                trigger:{global:'gainBefore'},
                forced:true,
                filter:function (event,player){
                    return player.hasExpansions('yuYan')&&event.cause=='damage';
                },
                content:async function (event,trigger,player){
                    game.log(player,`移除了1张`,`#g【预言】`);
                    trigger.cards.pop();
                    var cards=player.getExpansions('yuYan');
                    trigger.cards.unshift(cards[0]);
                },
                group:['yuYan_tianLeiJieHuo','yuYan_diLieBoTao','yuYan_caiYangZhiXi'],
                subSkill:{
                    zero:{
                        trigger:{global:'damageAfter',player:'xianJi'},
                        forced:true,
                        filter:function (event,player){
                            return !player.hasExpansions('yuYan');
                        },
                        content:async function (event,trigger,player){
                            player.removeSkill('yuYan_zero');
                            await player.unmarkSkill('yuYan');
                            await player.addZhiShiWu(player.storage.moRiYuYan);
                        }
                    },
                    tianLeiJieHuo:{
                        intro:{
                            name:'天雷劫火',
                            content:`<span class="greentext">[被动]天雷劫火</span><br>
                            <span class='tiaoJian'>(此卡展示时)</span>异教徒选择以下一项发动：<br>
                            ·弃X张雷系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张雷系牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
                            ·弃X张火系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张火系牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
                            <span class="greentext">[被动]灾殃止息</span><br>
                            <span class='tiaoJian'>(异教徒的回合开始时)</span>移除此卡。`,
                            nocount:true,
                        },
                        markimage:'image/card/zhuanShu/tianLeiJieHuo.png',
                        forced:true,
                        trigger:{player:'changeZhiShiWuAfter'},
                        filter:function (event,player){
                            return event.zhiShiWu=='yuYan_tianLeiJieHuo'&&event.num>0;
                        },
                        content:async function (event,trigger,player){
                            await event.trigger('yuYanJieGuo');
                            var choiceList=["弃X张雷系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张雷系牌[展示]，然后你对他造成(X+1)点法术伤害③","弃X张火系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张火系牌[展示]，然后你对他造成(X+1)点法术伤害③"];
                            var list=['选项一','选项二'];
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                var player=_status.event.player;
                                var num1=player.countCards('h',card=>get.xiBie(card)=='lei');
                                var num2=player.countCards('h',card=>get.xiBie(card)=='huo');
                                if(num1>num2){
                                    return '选项一';
                                }else{
                                    return '选项二';
                                }
                            });
                            if(event.bool){
                                next.set('prompt',`选择前发动的选项`);
                            }else{
                                next.set('prompt',`选择以下一项发动`);
                            }
                            var control=await next.forResultControl();
                            if(control=='选项一'){
                                var xiBieList=['lei'];
                                if(event.bool) xiBieList.push('huo');
                            }else{
                                var xiBieList=['huo'];
                                if(event.bool) xiBieList.push('lei');
                            }
                            
                            for(var xiBie of xiBieList){
                                var xiBieName=get.translation(xiBie);
                                var cards=await player.chooseToDiscard('h',true,[0,4],'showCards',card=>get.xiBie(card)==_status.event.xiBie,`弃X张${xiBieName}系牌[展示]，摸X张牌，X最大为4`).set('ai',function(card){
                                    return 1;
                                }).set('xiBie',xiBie).forResultCards();
                                var num=cards.length;
                                if(num>0) await player.draw(num);
                                var targets=await player.chooseTarget(true,`选择1个目标角色弃Y张${xiBieName}系牌[展示]，然后你对他造成(${num}+1)点法术伤害③`).set('ai',function(target){
                                    var player=_status.event.player;
                                    var num=_status.event.num;
                                    return get.damageEffect2(target,player,num+1);
                                }).set('num',num).forResultTargets();
                                var target=targets[0];
                                await target.chooseToDiscard('h',true,[0,Infinity],'showCards',card=>get.xiBie(card)==_status.event.xiBie,`弃Y张${xiBieName}系牌[展示]`).set('ai',function(card){
                                    return 1;
                                }).set('xiBie',xiBie);
                                await target.faShuDamage(num+1,player);
                            }
                        }
                    },
                    diLieBoTao:{
                        intro:{
                            name:'地裂波涛',
                            content:`<span class="greentext">[被动]地裂波涛</span><br>
                            <span class='tiaoJian'>(此卡展示时)</span>异教徒选择以下一项发动：<br>
                            ·弃X张地系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张系地牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
                            ·弃X张水系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张系水牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
                            <span class="greentext">[被动]灾殃止息</span><br>
                            <span class='tiaoJian'>(异教徒的回合开始时)</span>移除此卡。`,
                            nocount:true,
                        },
                        markimage:'image/card/zhuanShu/diLieBoTao.png',
                        forced:true,
                        trigger:{player:'changeZhiShiWuAfter'},
                        filter:function (event,player){
                            return event.zhiShiWu=='yuYan_diLieBoTao'&&event.num>0;
                        },
                        content:async function (event,trigger,player){
                            await event.trigger('yuYanJieGuo');
                            var choiceList=["弃X张地系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张地系牌[展示]，然后你对他造成(X+1)点法术伤害③","弃X张水系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张水系牌[展示]，然后你对他造成(X+1)点法术伤害③"];
                            var list=['选项一','选项二'];
                            var next=player.chooseControl(list);
                            next.set('choiceList',choiceList);
                            next.set('ai',function(){
                                var player=_status.event.player;
                                var num1=player.countCards('h',card=>get.xiBie(card)=='lei');
                                var num2=player.countCards('h',card=>get.xiBie(card)=='huo');
                                if(num1>num2){
                                    return '选项一';
                                }else{
                                    return '选项二';
                                }
                            });
                            if(event.bool){
                                next.set('prompt',`选择前发动的选项`);
                            }else{
                                next.set('prompt',`选择以下一项发动`);
                            }
                            var control=await next.forResultControl();
                            if(control=='选项一'){
                                var xiBieList=['di'];
                                if(event.bool) xiBieList.push('shui');
                            }else{
                                var xiBieList=['shui'];
                                if(event.bool) xiBieList.push('di');
                            }
                            
                            for(var xiBie of xiBieList){
                                var xiBieName=get.translation(xiBie);
                                var cards=await player.chooseToDiscard('h',true,[0,4],'showCards',card=>get.xiBie(card)==_status.event.xiBie,`弃X张${xiBieName}系牌[展示]，摸X张牌，X最大为4`).set('ai',function(card){
                                    return 1;
                                }).set('xiBie',xiBie).forResultCards();
                                var num=cards.length;
                                if(num>0) await player.draw(num);
                                var targets=await player.chooseTarget(true,`选择1个目标角色弃Y张${xiBieName}系牌[展示]，然后你对他造成(${num}+1)点法术伤害③`).set('ai',function(target){
                                    var player=_status.event.player;
                                    var num=_status.event.num;
                                    return get.damageEffect2(target,player,num+1);
                                }).set('num',num).forResultTargets();
                                var target=targets[0];
                                await target.chooseToDiscard('h',true,[0,Infinity],'showCards',card=>get.xiBie(card)==_status.event.xiBie,`弃Y张${xiBieName}系牌[展示]`).set('ai',function(card){
                                    return 1;
                                }).set('xiBie',xiBie);
                                await target.faShuDamage(num+1,player);
                            }
                        }
                    },
                    caiYangZhiXi:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        filter:function (event,player){
                            return player.hasZhiShiWu('yuYan_diLieBoTao')||player.hasZhiShiWu('yuYan_tianLeiJieHuo');
                        },
                        content:async function (event,trigger,player){
                            if(player.hasZhiShiWu('yuYan_diLieBoTao')) await player.removeZhiShiWu('yuYan_diLieBoTao');
                            if(player.hasZhiShiWu('yuYan_tianLeiJieHuo')) await player.removeZhiShiWu('yuYan_tianLeiJieHuo');
                        }
                    }
                }
            },
        },
		
		translate: {
            zhuLvZhe:'铸律者',
            hongYiZhuJiao:'红衣主教',
            zhuLvZhe_name:'阿斯兰',
            jiLuZhe:'记录者',
            jiLuZhe_name:'多拉贡幻',
            chuanJiaoShi:'传教士',
            chuanJiaoShi_name:'伊丽莎白',
            yiJiaoTu:'异教徒',
            yiJiaoTu_name:'克里斯蒂安娜',

            shiShuCard:'史书',
            shiShuCard_info:`
            <span class="greentext">[被动]以史为镜</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得)</span>此卡视为地系的幻类命格攻击牌。<span class='tiaoJian'>(此卡被使用、打出、弃置、或者转移拥有者，或因技能放置在角色旁)</span>移除此卡。<br>
            <span class="greentext">[响应]引稽编鉴</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得，使用此卡进行主动攻击时①)</span>指定攻击目标将1张手牌加入【遗迹】，然后将你手上X张牌与X个【遗迹】交换，X<3。
            `,

            shenLvFengSuo:'[被动]神律封锁',
            shenLvFengSuo_info:"<span class='tiaoJian'>(你的[治疗]数未达到上限时)</span>所有未拥有[治疗]的角色手牌上限-1。<span class='tiaoJian'>(每次你[治疗]数增加时)</span>我方士气-1，但至少为1(强制)。",
            shengXueZhiJi:'[被动]圣血之击',
            shengXueZhiJi_info:"<span class='tiaoJian'>(主动攻击命中时②)</span>本次攻击伤害额外+1，你+1[治疗]。",
            wangCheYiWei:'[法术]王车易位',
            wangCheYiWei_info:"<span class='tiaoJian'>(移除场上合计2[治疗])</span>你+2<span class='hong'>【银制子弹】</span>，移除你的所有基础效果和[治疗]，将你的角色卡替换为【红衣主教】并额外+1[攻击行动]。",
            zuiDuanHuoMian:'[响应]罪断豁免',
            zuiDuanHuoMian_info:"<span class='tiaoJian'>(我方非因承受伤害而导致士气下降时，移除X点</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>)</span>抵御X点士气下降，你+X<span class='hong'>【银制子弹】</span>。",
            shengYinSongEn:'[响应]圣银颂恩[回合限定]',
            shengYinSongEn_info:"<span class='tiaoJian'>([攻击行动]结束时，移除2点</span><span class='hong'>【银制子弹】</span><span class='tiaoJian'>)</span>额外+1[攻击行动]，目标角色+1[治疗]。",
            wangQuanBaoZhu:'(专)王权宝珠',
            wangQuanBaoZhu_info:`
            <span class="greentext">[被动]圣律威压</span><br>
            <span class='tiaoJian'>(此卡转移或放置到你面前是)</span>选择一下一项发动：<br>·<span class='tiaoJian'>(选择1张与此卡上牌种类相同的牌)</span>弃置之[展示]。<br>·摸2张牌[强制]，铸律者阵营士气-1。<span class='tiaoJian'>(若</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>数<1)</span>移除此卡。<br>
            <span class="greentext">[被动]神言咏赞</span><br>
            <span class='tiaoJian'>(【圣律威压】结算完后)</span>将此卡转移到你右手边最近的玩家面前。<span class='tiaoJian'>(若因此转移至铸律者面前)</span>【铸律者】选择以下一项发动：<br>·将角色卡替换为【红衣主教】，然后移除此卡。<br>·<span class='tiaoJian'>(移除X点</span><span class='hong'>【银制子弹】</span><span class='tiaoJian'>，X<3)</span>目标角色摸X张牌[强制]，然后移除此卡。
            `,
            wangQuanBaoZhuX:'(专)王权宝珠',
            wangQuanBaoZhuX_shengLvWeiYa:'[被动]圣律威压',
            wangQuanBaoZhuX_shenYanYongZan1:'[被动]神言咏赞',
            wangQuanBaoZhuX_shenYanYongZan2:'[被动]神言咏赞',
            xinYangChongZhu:'[响应]信仰重铸[回合限定]',
            xinYangChongZhu_info:"[水晶]<span class='tiaoJian'>(你的回合结束时，若本回合你未执行【特殊行动】，将1张手牌面朝上放置在【王权宝珠】上[展示][强制])</span>你摸1张牌[强制]，你+2<span class='lan'>【圣遗物】</span>，将【王权宝珠】放置在你面前。",
            shengYiWu:'圣遗物',
            shengYiWu_info:"<span class='lan'>【圣遗物】</span>为红衣主教与铸律者共有指示物，上限为3。",
            yinZhiZiDan:'银制子弹',
            yinZhiZiDan_info:"<span class='hong'>【银制子弹】</span>为红衣主教与铸律者共有指示物，上限为3。",

            shengYueYinQi:"[被动]圣约银契",
            shengYueYinQi_info:"<span class='tiaoJian'>([攻击行动]或[法术行动]结束时)</span>你+1<span class='hong'>【银制子弹】</span>。",
            quMoShi:"[启动]驱魔式",
            quMoShi_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【银制子弹】</span><span class='tiaoJian'>)</span>我方目标角色弃1张牌[展示]。<span class='tiaoJian'>(若该弃牌为圣类命格)</span>你+1[治疗]，摸1张牌[强制]。",
            daoGaoShi:"[响应]祷告式",
            daoGaoShi_info:"<span class='tiaoJian'>(主动攻击前①，移除1点</span><span class='hong'>【银制子弹】</span><span class='tiaoJian'>)</span>目标角色+1[治疗]。",
            quanNengNiWei:"[法术]权能逆位",
            quanNengNiWei_info:"<span class='tiaoJian'>(移除1点</span><span class='hong'>【银制子弹】</span><span class='tiaoJian'>或我方角色合计2[治疗])</span>你+2<span class='lan'>【圣遗物】</span>，移除你的所有基础效果与[治疗]，将手牌弃到4张，然后将你的角色卡替换为【铸律者】。",
            shenXuanDaoYan:"[响应]神宣祷言",
            shenXuanDaoYan_info:"<span class='tiaoJian'>(我方非因承受伤害而导致士气下降时，移除1点</span><span class='lan'>【圣遗物】</span><span class='tiaoJian'>)</span>抵御1点士气下降，你+1<span class='hong'>【银制子弹】</span>。",
            shengDian:"[启动]圣典",
            shengDian_info:"[水晶]我方所有未拥有[治疗]的角色各+1[治疗]。",

            chuanShuoZhiDi:"[被动]传说之地",
            chuanShuoZhiDi_info:"游戏初始时，将牌库顶3张牌面朝上放置在你角色旁[展示]，作为【遗迹】。",
            zhiXingHeYi:"[法术]知行合一",
            zhiXingHeYi_info:"展示牌堆顶2张牌[展示]；你可选择其中1张牌，将此牌作为相应行动发出并弃1张牌。<span class='tiaoJian'>(结算完成后)</span>将以此法展示的剩余X张牌弃掉，你+X<span class='hong'>【史料】</span>。",
            jiGuShiDian:"[被动]稽古识典",
            jiGuShiDian_info:"<span class='tiaoJian'>(</span><span class='hong'>【史料】</span><span class='tiaoJian'>达到上限时)</span>移除所有<span class='hong'>【史料】</span>，你弃1张牌，将【史书】加入手牌[强制]。",
            yiJiLunPo:"[响应]遗迹论破[回合限定]",
            yiJiLunPo_info:"<span class='tiaoJian'>(主动攻击时①，移除与攻击牌同系的X个【遗迹】)</span>本次攻击伤害额外+(X-1)；<span class='tiaoJian'>(若X>1)</span>额外+1[法术行动]；<span class='tiaoJian'>(若因此使【遗迹】数减少为0)</span>我方【战绩区】+1[宝石]。",
            xuanCuiJingLian:"[响应]选淬精炼",
            xuanCuiJingLian_info:"<span class='tiaoJian'>(每当你移除【遗迹】时)</span>将光系与暗系的【遗迹】视为任意系别。",
            miJingWanXiang:"[法术]秘境万象",
            miJingWanXiang_info:"<span class='tiaoJian'>(移除【史书】)</span>移除所有【遗迹】，展示牌堆顶牌[展示]直至展示牌中有同系牌为止；将以此法展示的所有X张牌面朝上放置在你角色旁[展示]，作为【遗迹】。<span class='tiaoJian'>(若X>3)</span>对(X-3)名目标角色造成2点法术伤害③。",
            shiShu:"(专)史书",
            shiShu_info:`
            <span class="greentext">[被动]以史为镜</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得)</span>此卡视为地系的幻类命格攻击牌。<span class='tiaoJian'>(此卡被使用、打出、弃置、或者转移拥有者，或因技能放置在角色旁)</span>移除此卡。<br>
            <span class="greentext">[响应]引稽编鉴</span><br>
            <span class='tiaoJian'>(拥有此卡的角色获得，使用此卡进行主动攻击时①)</span>指定攻击目标将1张手牌加入【遗迹】，然后将你手上X张牌与X个【遗迹】交换，X<3。
            `,
            shiShuX_yiShiWeiJing:'[被动]以史为镜',
            shiShuX_yinJiBianJian:'[响应]引稽编鉴',
            guJinHuzheng:"[启动]古今互鉴",
            guJinHuzheng_info:"[水晶]你+2<span class='hong'>【史料】</span>；<span class='tiaoJian'>(若你手牌数>1)</span>你可将2张手牌与X个【遗迹】交换，X>0。",
            yiJi:'遗迹',
            yiJi_info:"【遗迹】为记录者专有展示盖牌，上限为8。",
            shiLiao:'史料',
            shiLiao_info:"<span class='hong'>【史料】</span>为记录者专有指示物，上限为3。",

            shenDeWenTu:"[被动]神的门徒",
            shenDeWenTu_info:"你无法成为【路标】的目标[恒定]，你的行动顺序改为拥有【路标】的角色之后。2V2中此技能无效。",
            xinYangZhiLu:"[被动]信仰之路",
            xinYangZhiLu_info:"<span class='tiaoJian'>(你的第一回合开始时)</span>将【路标】放置在你左手边最近的角色面前。<span class='tiaoJian'>(你的回合结束时，若本回合你未执行【特殊行动】)</span>将【路标】转移到拥有者左手边最近的角色面前。",
            chuanDao:"[启动]传道",
            chuanDao_info:"<span class='tiaoJian'>(你摸0-1张牌，弃1张牌[强制][展示])</span>你+1<span class='hong'>【虔诚】</span>，拥有【路标】的角色弃1张牌[展示]，你获得该牌[强制]。<span class='tiaoJian'>(若该牌与你的弃牌系别或者命格相同)</span>你额外+1<span class='hong'>【虔诚】</span>。",
            qiShi:"[响应]启示",
            qiShi_info:"<span class='tiaoJian'>(【路标】转移前，移除2点</span><span class='hong'>【虔诚】</span><span class='tiaoJian'>)</span>选择以下一项发动：<br>·目标角色+1[治疗]。<br>·你摸1张牌[强制][展示]。<span class='tiaoJian'>(若该牌为法术牌或者圣类命格)</span>取消本次转移并移除【路标】，然后将【路标】放置在目标角色面前。",
            shiFeng:"[响应]事奉",
            shiFeng_info:"<span class='tiaoJian'>(你因自身技能弃的牌置入弃牌堆时，移除你1[治疗])</span>将该弃牌加入拥有【路标】的角色手牌[强制]。<span class='tiaoJian'>(若没有因此造成对方士气下降)</span>指定除你外的目标角色+1[治疗]。",
            luBiao:"(专)路标",
            luBiao_info:`
            <span class="greentext">[响应]告解式[回合限定]</span><br>
            <span class='tiaoJian'>(此卡被转移至你面前时，你摸2张牌[强制])</span>我方【战绩区】+1[水晶]，然后将此卡转移至你左手边最近的角色面前，传教士弃1张牌。
            `,
            luBiaoX:"[响应]告解式[回合限定]",
            luBiaoX_info:"<span class='tiaoJian'>(此卡被转移至你面前时，你摸2张牌[强制])</span>我方【战绩区】+1[水晶]，然后将此卡转移至你左手边最近的角色面前，传教士弃1张牌。",
            shuLingEnCi:"[启动]属灵恩赐",
            shuLingEnCi_info:"[水晶]你+1[治疗]，弃1张牌。",
            miSa:"[响应]弥撒",
            miSa_info:"[水晶]<span class='tiaoJian'>(【路标】转移或放置后)</span>你+1<span class='hong'>【虔诚】</span>，选择以下一项发动：<br>·弃1张牌[展示]。<span class='tiaoJian'>(若该牌为【虚弱】、【中毒】或【圣盾】)</span>将该牌放置在拥有【路标】的角色面前作为基础效果。<br>·<span class='tiaoJian'>(将拥有【路标】的角色面前一张基础效果牌收入自己手中)</span>你+1<span class='hong'>【虔诚】</span>。",
            qianCheng:"虔诚",
            qianCheng_info:"<span class='hong'>【虔诚】</span>为传教士专有指示物，上限为4。",


            yiDuanXieShuo:"[被动]异端邪说",
            yiDuanXieShuo_info:"游戏初始时，你+1[水晶]。<span class='tiaoJian'>(【末日预言】在场时)</span>你的手牌上限-1。",
            shenPanYJT:"[响应]审判",
            shenPanYJT_info:"<span class='tiaoJian'>(你的回合结束时，若本回合你对目标对手造成伤害③)</span>我方所有角色各弃1张牌[展示]，然后各摸1张牌[强制]，你将其中1张弃牌加入该对手手牌[强制]。<span class='tiaoJian'>(若【末日预言】在场)</span>将其余弃牌面朝下洗混放置到【末日预言】的【预言】堆顶部作为【预言】。",
            xianJi:"[启动]献祭",
            xianJi_info:"<span class='tiaoJian'>(仅【末日预言】在场时，指定1种系别)</span>展示【预言】堆顶部1张【预言】[展示]；<span class='tiaoJian'>(若该【预言】与你指定的系别相同)</span>移除该【预言】，我方【战绩区】+1[宝石]；<span class='tiaoJian'>(若不同)</span>将牌堆顶1张牌与该【预言】交换，然后将该【预言】加入你手牌[强制]。",
            moRiYuYan:"(专)末日预言",
            moRiYuYan_info:`
            <span class="greentext">[被动]末日预言</span><br>
            <span class='tiaoJian'>(此卡在场时，每当有角色因承受伤害而摸牌时)</span>本次摸牌的第1张牌改为自【预言】处获得。<span class='tiaoJian'>(此卡上最后1张【预言】被移除或获得，且结算完后)</span>将此卡翻面。可变为【天雷劫火】或【地裂波涛】。【末日预言】的【预言】上限为6。<br>
            <span class="greentext">[被动]天雷劫火</span><br>
            <span class='tiaoJian'>(此卡展示时)</span>异教徒选择以下一项发动：<br>
            ·弃X张雷系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张雷系牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
            ·弃X张火系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张火系牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
            <span class="greentext">[被动]地裂波涛</span><br>
            <span class='tiaoJian'>(此卡展示时)</span>异教徒选择以下一项发动：<br>
            ·弃X张地系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张系地牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
            ·弃X张水系牌[展示]，摸X张牌[强制]，X最高为4；目标对手弃Y张系水牌[展示]，然后你对他造成(X+1)点法术伤害③。<br>
            <span class="greentext">[被动]灾殃止息</span><br>
            <span class='tiaoJian'>(异教徒的回合开始时，若存在【天雷劫火】或【地裂波涛】)</span>移除此卡。
            `,
            fangZhu:"[法术]放逐[回合限定]",
            fangZhu_info:"[水晶]<span class='tiaoJian'>(无视你的手牌上限摸6-8张牌[强制])</span>移除场上所有【末日预言】和【预言】，将1个【末日预言】放置入场，然后将6张手牌面朝下洗混放置到【末日预言】上作为【预言】，额外+1[攻击行动]或者[法术行动]。",
            tanLan:"[响应]贪婪",
            tanLan_info:"[水晶]<span class='tiaoJian'>(与【天雷劫火】或【地裂波涛】同时发动)</span>将“选择以下一项发动”改为“发动以下项目，顺序由你决定”。",
            yuYan:"[被动]末日预言",
            yuYan_tianLeiJieHuo:"[被动]天雷劫火",
            yuYan_diLieBoTao:"[被动]地裂波涛",
            yuYan_caiYangZhiXi:"[被动]灾殃止息",
        },
	};
});
