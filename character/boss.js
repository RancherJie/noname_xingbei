import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
    return {
        name:'boss',
        disable:true,
        connect:true,
        characterSort:{},
        character:{
            boss_mingJie1: {
                hp:5,
                sex:"mingJie_name",
                group: "DIY",
                skills: ['mingYueXianYing','zhangQiShouHu','poFangXingTai','yuHeng','lingYiSheQu','tianJie','tianQian','shunYingTuXi','zhangQi','hunZhiLi'],
                isBoss: true,
                isBossAllowed: false,
                img:'image/mode/boss/character/boss_mingJie1.jpg',
            },
            boss_mingJie2: {
                hp:5,
                sex:"mingJie_name",
                group: "DIY",
                skills: ['xueMaiFengYin','anYingZaiSheng','zhangQiShouHu','poFangXingTai','yuHeng','lingYiSheQu','mingJie','mingQian','shunYingTuXi','zhangQi','hunZhiLi'],
                isBoss: true,
                isBossAllowed: false,
                img:'image/mode/boss/character/boss_mingJie2.jpg',
            },
            boss_mingJie_zuoQuan: {
                hp:5,
                sex:"mingJie_name",
                group: "DIY",
                skills: ['qianYingZhuanHuan','zhangQiZhiLi','xieQuanFangHu','baoLieLianDa'],
                isBoss: true,
                isBossAllowed: false,
                img:'image/mode/boss/character/boss_mingJie_zuoQuan.jpg',
            },
            boss_mingJie_youQuan: {
                hp:5,
                sex:"mingJie_name",
                group: "DIY",
                skills: ['qianYingZhuanHuan','zhangQiZhiLi','tanWang','mingFuDuShen'],
                isBoss: true,
                isBossAllowed: false,
                img:'image/mode/boss/character/boss_mingJie_youQuan.jpg',
            },
        },
        card:{
            buff_A:{
                fullskin: true,
                modeimage:'boss',
            },
            buff_B:{
                fullskin: true,
                modeimage:'boss',
            },
            buff_C:{
                fullskin: true,
                modeimage:'boss',
            },
            buff_D:{
                fullskin: true,
                modeimage:'boss',
            },
            buff_E:{
                fullskin: true,
                modeimage:'boss',
            },
        },
        skill:{
            huoDeXingBei:{
                trigger:{player:'changeXingBeiAfter'},
                direct:true,
                filter:function(event,player){
                    return event.num>0&&player.side==false&&get.xingBei(player)<=3;
                },
                content:async function(event,trigger,player){
                    let list=['buff_A','buff_B','buff_C','buff_D','buff_E'];
                    list=list.filter(i=>!_status.buffList.includes(i));
                    let next=player.chooseButton(true,[
                        '选择获得一个场地BUFF',
                        [list,'vcard'],
                    ]);
                    next.set('ai',function(button){
                        return Math.random();
                    });
                    let result=await next.forResult();
                    let buff=result.links[0][2];
                    game.log(player,'获得了场地BUFF',get.translation(buff));
                    _status.buffList.push(buff);
                    player.addSkill(buff);
                },
            },
            buff:{
                subSkill:{
                    A:{
                        trigger:{global:'phaseBefore'},
                        forced:true,
                        filter:function(event,player){
                            return event.player.name=='boss_mingJie1'||event.player.name=='boss_mingJie2';
                        },
                        content:async function(event,trigger,player){
                            let list=['+1[宝石]','+2[水晶]'];
                            let next=player.chooseControl(list);
                            next.set('prompt','选择我方战绩区获得的【星石】');
                            next.set('ai',function(){
                                if(get.zhanJi(false).length<=3) return 1;
                                else return 0;
                            });
                            let control=await next.forResultControl();
                            if(control=='+1[宝石]'){
                                player.addZhanJi('baoShi',1);
                            }else if(control=='+2[水晶]'){
                                player.addZhanJi('shuiJing',2);
                            }
                        },
                        mark:true,
                        intro:{
                            name:'[被动]炼金术',
                            content:`
                            <span class='tiaoJian'>(本体的回合开始前)</span>选择以下一项发动：<br>
                            ·我方【战绩区】+1[宝石]；<br>
                            ·我方【战绩区】+2[水晶]。`,
                        },
                        markimage:'image/mode/boss/mark/buff_A.png',
                    },
                    B:{
                        trigger:{global:'phaseBefore'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return event.player.name=='boss_mingJie1'||event.player.name=='boss_mingJie2';
                        },
                        content:async function(event,trigger,player){
                            player.addShiQi(1);
                        },
                        mark:true,
                        intro:{
                            name:'[被动]圣洁药水',
                            content:`<span class='tiaoJian'>(本体的回合开始前)</span>我方+1【士气】。`,
                        },
                        markimage:'image/mode/boss/mark/buff_B.png',
                    },
                    C:{
                        trigger:{global:'changeShiQiBefore'},
                        filter:function(event,player){
                            if(event.player.side==false) return false;
                            if(event.num>=0) return false;
                            if(get.zhanJi(false).length==0) return false;
                            return event.cause=='damage'&&event.faShu==true;
                        },
                        cost:async function(event,trigger,player){
                            let zhanJiList=get.zhanJi(false);
                            let list=[];
                            if(zhanJiList.includes('baoShi')) list.push('baoShi');
                            if(zhanJiList.includes('shuiJing')) list.push('shuiJing');
                            list.push('cancel2');

                            let next=player.chooseControl(list);
                            next.set('prompt','是否发动[响应]先驱法杖');
                            next.set('prompt2','移除我方【战绩区】1【星石】使本次士气额外-1');
                            next.set('ai',function(){
                                let zhanJiList=get.zhanJi(false);
                                if(zhanJiList.includes('shuiJing')) return 'shuiJing';
                                if(zhanJiList.length<=3) return 'cancel2';
                                return 'baoShi';
                            });
                            let control=await next.forResultControl();
                            event.result={
                                bool:control!='cancel2',
                                cost_data:control,
                            }
                        },
                        content:async function(event,trigger,player){
                            await player.removeZhanJi(event.cost_data,1);
                            trigger.num-=1;
                        },
                        mark:true,
                        intro:{
                            name:'[响应]先驱法杖',
                            content:`<span class='tiaoJian'>(敌方角色因承受法术伤害导致士气下降时，移除我方【战绩区】1【星石】)</span>本次士气额外-1。`,
                        },
                        markimage:'image/mode/boss/mark/buff_C.png',
                    },
                    D:{
                        trigger:{global:'changeShiQiBefore'},
                        filter:function(event,player){
                            if(event.player.side==false) return false;
                            if(event.num>=0) return false;
                            if(get.zhanJi(false).length==0) return false;
                            return event.cause=='damage'&&event.faShu!=true;
                        },
                        cost:async function(event,trigger,player){
                            let zhanJiList=get.zhanJi(false);
                            let list=[];
                            if(zhanJiList.includes('baoShi')) list.push('baoShi');
                            if(zhanJiList.includes('shuiJing')) list.push('shuiJing');
                            list.push('cancel2');

                            let next=player.chooseControl(list);
                            next.set('prompt','是否发动[响应]攻击号令');
                            next.set('prompt2','移除我方【战绩区】1【星石】使本次士气额外-1');
                            next.set('ai',function(){
                                let zhanJiList=get.zhanJi(false);
                                if(zhanJiList.includes('shuiJing')) return 'shuiJing';
                                if(zhanJiList.length<=3) return 'cancel2';
                                return 'baoShi';
                            });
                            let control=await next.forResultControl();
                            event.result={
                                bool:control!='cancel2',
                                cost_data:control,
                            }
                        },
                        content:async function(event,trigger,player){
                            await player.removeZhanJi(event.cost_data,1);
                            trigger.num-=1;
                        },
                        mark:true,
                        intro:{
                            name:'[响应]攻击号令',
                            content:`<span class='tiaoJian'>(敌方角色因承受攻击伤害导致士气下降时，移除我方【战绩区】1【星石】)</span>本次士气额外-1。`,
                        },
                        markimage:'image/mode/boss/mark/buff_D.png',
                    },
                    E:{
                        mark:true,
                        intro:{
                            name:'[被动]刻之咒符',
                            content:`左拳或右拳发动【潜影转换】时，选择的目标角色手牌数需与其自身手牌数具有相同奇偶性；本体无法发动【御衡】。`,
                        },
                        markimage:'image/mode/boss/mark/buff_E.png',
                        init:function(player){
                            _status.boss.tempBanSkill('yuHeng','forever');
                        },
                    },
                },
            },
            mingYueXianYing:{
                trigger:{global:'gameStart'},
                firstDo:true,
                forced:true,
                content:async function(event,trigger,player){
                    //初始化数据
                    game.shiQiMaxHong=8;
                    _status.bossStage=1;//一阶段
                    var difficulty=get.config('difficulty');
                    if(_status.connectMode) difficulty=lib.configOL.difficulty;
                    _status.difficulty=difficulty;
                    if(difficulty=='easy') game.shiQiMaxLan=18;
                    else game.shiQiMaxLan=15;
                    if(difficulty!='hard') game.addGlobalSkill('zhangQiZhiLi_pai');

                    game.zhanJiMaxHong=5;
                    game.zhanJiMaxLan=5;
                    game.xingBeiMax=Infinity;
                    _status.buffList=[];

                    let zuoQuan = game.addPlayerOL(player,'boss_mingJie_zuoQuan');
                    
                    let youQuan = game.addPlayerOL(player,'boss_mingJie_youQuan',null,true);
                    
                    let quanList=[zuoQuan,youQuan];
                    _status.quanList=quanList;
                    zuoQuan.useSkill('_init');
                    youQuan.useSkill('_init');

                    zuoQuan.setSide(true);
                    youQuan.setSide(true);

                    game.addGlobalSkill('huoDeXingBei');
                    game.removeGlobalSkill('_heCheng');
                    game.removeGlobalSkill('_gouMai');
                    game.addGlobalSkill('mingJie_heCheng');
                    game.addGlobalSkill('mingJie_gouMai');

                    
                    await player.addZhiShiWu('zhangQi',6).set('mingYueXianYing',true);
                    
                    lib.skill.zhangQiShouHu.addRuoDian();

                    await lib.skill.mingYueXianYing.swapSeat(player);
                },
                group:['mingYueXianYing_secondStage'],
                subSkill:{
                    secondStage:{
                        trigger:{global:'phaseAfter'},
                        direct:true,
                        filter:function(event,player){
                            return player.name=='boss_mingJie1'&&get.shiQi(player.side)<=0;
                        },
                        content:async function(event,trigger,player){
                            game.log(player,'进入二阶段');
                            await player.reinitCharacter(player.name1,'boss_mingJie2');
                            player.update();
                            _status.bossStage=2;//二阶段
                            game.shiQiMaxHong=12;
                            game.changeShiQi(game.shiQiMaxHong-get.shiQi(player),true,false);

                            await event.trigger('mingYueXianYingSecondStage');
                        },
                    },
                },
                swapSeat:async function(player){
                    var next=game.createEvent('quanPhase',false);
                    next.player=player;
                    next.setContent(async function (event,trigger,player){
                        for(let i=0;i<_status.quanList.length;i++){
                            let quan=_status.quanList[i];
                            let name=get.colorName(quan);
                            let targets =await player.chooseTarget(`选择将${name}置于目标角色下家`,1,true,function(card,player,target){
                                return target!=_status.event.quan;
                            }).set('quan',quan).set('ai',function(target){
                                return Math.random();
                            }).forResultTargets();
                            let target=targets[0];
                            if(target){
                                game.broadcastAll(function(quan,target){
                                    game.swapSeat(quan,target,true,true);
                                },quan,target);
                            }
                        }
                    });
                    return next;
                },
            },
            zhangQiShouHu:{
                addRuoDian:function(){
                    let ruoDianList=['huo','shui','feng','lei','di'];
                    let ruoDianFunction=function(ruoDianList,num){
                        let ruoDian=ruoDianList.randomRemove(num);
                        return [ruoDian,ruoDian.map(i=>'zhangQiShouHu_'+i)];
                    };
                    let addRuoDian=function(player,num){
                        let list=ruoDianFunction(ruoDianList,num);
                        player.addSkill(list[1]);
                        game.log(player,'获得了弱点',list[0]);
                    };

                    addRuoDian(_status.boss,1);
                    addRuoDian(_status.quanList[0],2);
                    addRuoDian(_status.quanList[1],2);
                },
                removeRuoDian:function(){
                    let list=[_status.boss];
                    list=list.concat(_status.quanList);
                    for(var i=0;i<list.length;i++){
                        let player=list[i];
                        let ruoDianList=['huo','shui','feng','lei','di'];
                        for(var j=0;j<ruoDianList.length;j++){
                            if(player.hasSkill('zhangQiShouHu_'+ruoDianList[j])){
                                player.removeSkill('zhangQiShouHu_'+ruoDianList[j]);
                            }
                        }
                    }
                },
                group:['zhangQiShouHu_gongJi','zhangQiShouHu_faShu'],
                subSkill:{
                    huo:{
                        mark:true,
                        intro:{
                            name:'弱点-火',
                            content:`<span class='tiaoJian'>(承受火系的攻击造成的攻击伤害⑥后)</span>移除X点<span class='hong'>【瘴气】</span>，X与本次伤害相同`,
                        },
                        markimage:'image/mode/boss/mark/huo.png',
                        mod:{
                            aiValue(player, card, num) {
                                if (get.xiBie(card)=='huo') return num + 1;
                            },
                        },
                    },
                    shui:{
                        mark:true,
                        intro:{
                            name:'弱点-水',
                            content:`<span class='tiaoJian'>(承受水系的攻击造成的攻击伤害⑥后)</span>移除X点<span class='hong'>【瘴气】</span>，X与本次伤害相同`,
                        },
                        markimage:'image/mode/boss/mark/shui.png',
                        mod:{
                            aiValue(player, card, num) {
                                if (get.xiBie(card)=='shui') return num + 1;
                            },
                        },
                    },
                    feng:{
                        mark:true,
                        intro:{
                            name:'弱点-风',
                            content:`<span class='tiaoJian'>(承受风系的攻击造成的攻击伤害⑥后)</span>移除X点<span class='hong'>【瘴气】</span>，X与本次伤害相同`,
                        },
                        markimage:'image/mode/boss/mark/feng.png',
                        mod:{
                            aiValue(player, card, num) {
                                if (get.xiBie(card)=='feng') return num + 1;
                            },
                        },
                    },
                    lei:{
                        mark:true,
                        intro:{
                            name:'弱点-雷',
                            content:`<span class='tiaoJian'>(承受雷系的攻击造成的攻击伤害⑥后)</span>移除X点<span class='hong'>【瘴气】</span>，X与本次伤害相同`,
                        },
                        markimage:'image/mode/boss/mark/lei.png',
                        mod:{
                            aiValue(player, card, num) {
                                if (get.xiBie(card)=='lei') return num + 1;
                            },
                        },
                    },
                    di:{
                        marktext:'地',
                        mark:true,
                        intro:{
                            name:'弱点-地',
                            content:`<span class='tiaoJian'>(承受地系的攻击造成的攻击伤害⑥后)</span>移除X点<span class='hong'>【瘴气】</span>，X与本次伤害相同`,
                        },
                        markimage:'image/mode/boss/mark/di.png',
                        mod:{
                            aiValue(player, card, num) {
                                if (get.xiBie(card)=='di') return num + 1;
                            },
                        },
                    },
                    gongJi:{
                        trigger:{global:'shouDaoShangHaiAfter'},
                        filter:function(event,player){
                            if(player.isHengZhi()) return false;
                            if(player.countZhiShiWu('zhangQi')<=0) return false;
                            if(!event.card) return false;
                            let xiBie=get.xiBie(event.card);
                            return event.player.side==player.side&&event.player.hasSkill('zhangQiShouHu_'+xiBie);
                        },
                        forced:true,
                        content:async function(event,trigger,player){
                            await player.removeZhiShiWu('zhangQi',trigger.num);
                        },
                    },
                    faShu:{
                        trigger:{global:'shouDaoShangHaiAfter'},
                        filter:function(event,player){
                            if(player.isHengZhi()) return false;
                            if(player.countZhiShiWu('zhangQi')<=0) return false;
                            if(event.player.side!=player.side) return false;
                            if(!event.faShu) return false;
                            let history=event.player.getHistory('lose');
                            if(history.length==0) return false;
                            for(var i=0;i<history.length;i++){
                                let curr=history[i];
                                if(curr.type=='discard'&&curr.getParent(2).name=='chooseToDiscard'&&curr.getParent(5)==event){
                                    return true;
                                }
                            }
                            return false;
                        },
                        forced:true,
                        content:async function(event,trigger,player){
                            let evt;
                            let history=trigger.player.getHistory('lose');
                            for(var i=0;i<history.length;i++){
                                let curr=history[i];
                                if(curr.type=='discard'&&curr.getParent(2).name=='chooseToDiscard'&&curr.getParent(5)==trigger){
                                    evt=curr.getParent(2);
                                    break;
                                }
                            }
                            let num=evt.selectCard[0];
                            
                            await player.removeZhiShiWu('zhangQi',num);
                        },
                    },
                },
                trigger:{global:'damageAfter'},
                forced:true,
                filter:function(event,player){
                    return player.countZhiShiWu('zhangQi')<=0&&!player.isHengZhi();
                },
                content:async function(event,trigger,player){
                    await player.hengZhi();
                    lib.skill.zhangQiShouHu.removeRuoDian();
                    //移除暂时被移除的弱点列表
                    delete player.storage.tianJie_shui;
                    if(_status.difficulty=='hard') game.addGlobalSkill('zhangQiZhiLi_pai');
                },
            },
            poFangXingTai:{
                trigger:{player:'xingDongBefore'},
                filter:function(event,player){
                    return player.isHengZhi();
                },
                forced:true,
                content:async function(event,trigger,player){
                    trigger.xuRuo=true;
                },
                group:['poFangXingTai_recover','poFangXingTai_chongZhi'],
                subSkill:{
                    recover:{
                        trigger:{global:'phaseEnd'},
                        forced:true,
                        lastDo:true,
                        filter:function(event,player){
                            return event.player.side!=player.side&&player.isHengZhi();
                        },
                        content:async function(event,trigger,player){
                            await player.addZhiShiWu('zhangQi',2);
                        },
                    },
                    chongZhi:{
                        trigger:{player:'changeZhiShiWuAfter'},
                        filter:function(event,player){
                            if(event.mingYueXianYing) return false;
                            return event.zhiShiWu=='zhangQi'&&player.countZhiShiWu('zhangQi')>=player.getZhiShiWuLimit('zhangQi')&&event.num>0;
                        },
                        forced:true,
                        content:async function(event,trigger,player){
                            await player.chongZhi();
                            if(_status.difficulty=='hard') game.removeGlobalSkill('zhangQiZhiLi_pai');

                            if(player.countCards('h')>4){
                                await player.chooseToDiscard('h',player.countCards('h')-4,true);
                            }
                            lib.skill.zhangQiShouHu.addRuoDian();

                            let bool=await player.chooseBool('是否调整【双拳】的位置').forResultBool();
                            if(bool){
                                await lib.skill.mingYueXianYing.swapSeat(player);
                            }
                        },
                    },
                },
            },
            yuHeng:{
                trigger:{global:['heCheng','gouMai']},
                filter:function(event,player){
                    if(event.yuHeng) return false;
                    if(game.hasPlayer(function(current){
                        return current.hasSkill('buff_E');
                    })) return false;
                    if(event.player.side!=player.side) return false;
                    let teammates=game.filterPlayer(function(current){
                        return current!=event.player&&current.side===event.player.side&&current.countEmptyCards()>=1;
                    });
                    return teammates.length>=2;
                },
                content:async function(event,trigger,player){
                    trigger.yuHeng=true;
                },
                check:function(event,player){
                    if(event.player.countEmptyCards()>3) return false;
                    return Math.random()<0.5;   
                },
            },
            lingYiSheQu:{
                trigger:{global:'changeXingBeiEnd'},
                forced:true,
                filter:function(event,player){
                    return player.side==event.player.side&&event.num>0;
                },
                content:async function(event,trigger,player){
                    await player.addZhiShiWu('hunZhiLi',trigger.num);
                },
            },
            tianJie:{
                usable:1,
                type:'faShu',
                enable:'faShu',
                content:async function(event,trigger,player){
                    await player.addZhiShiWu('hunZhiLi',1);

                    await event.trigger('tianJie');
                    event.cards=get.cards(1);
                    let guangNum=0;
                    await player.loseToDiscardpile(event.cards);
                    await player.showHiddenCards(event.cards);
                    if(event.tianQian){
                        let cards=await player.chooseToDiscard('h',true,'天劫：弃1张牌[展示]','showCards').forResultCards();
                        if(cards.length>0) event.cards=event.cards.addArray(cards);
                    }
                    
                    for(let card of event.cards){
                        let xiBie=get.xiBie(card);
                        if(xiBie=='shui'){
                            if(!player.storage.tianJie_shui) player.storage.tianJie_shui=[];
                            let list=['shui','feng','huo','lei','di'];
                            let next=player.chooseControl(list);
                            next.set('prompt','直到下回合开始移除1个元素弱点');
                            next.set('ai',function(){
                                return Math.floor(Math.random()*_status.event.length);
                            }).set('length',list.length);
                            let control=await next.forResultControl();
                            let target;
                            for(let i=0;i<game.players.length;i++){
                                let current=game.players[i];
                                if(current.hasSkill('zhangQiShouHu_'+control)){
                                    target=current;
                                    break;
                                }
                            }
                            if(target){
                                target.removeSkill('zhangQiShouHu_'+control);
                                player.storage.tianJie_shui.push([target,control]);
                                game.log(target,'暂时失去了弱点',get.translation(control));
                            }
                        }else if(xiBie=='feng'){
                            let targets=await player.chooseTarget(1,true,function(card,player,target){
                                return target.side==player.side;
                            },'天劫：我方目标角色弃1张牌').set('ai',function(target){
                                return target.countCards('h');
                            }).forResultTargets();
                            let target=targets[0];
                            await target.chooseToDiscard('h',true,'天劫：弃1张牌').forResultCards();
                        }else if(xiBie=='huo'){
                            let targets=await player.chooseTarget(1,true,function(card,player,target){
                                return target.side!=player.side;
                            },'天劫：目标对手摸1张牌').set('ai',function(target){
                                return target.countCards('h');
                            }).forResultTargets();
                            let target=targets[0];
                            await target.draw();
                        }else if(xiBie=='lei'){
                            let zhanJiList=get.zhanJi(!player.side);
                            if(zhanJiList.length>0){
                                let list=[];
                                let control;
                                if(zhanJiList.includes('baoShi')) list.push('baoShi');
                                if(zhanJiList.includes('shuiJing')) list.push('shuiJing');
                                if(list.length>1){
                                    let next=player.chooseControl(list);
                                    next.set('prompt','天劫：移除敌方【战绩区】的1【星石】');
                                    next.set('ai',function(){
                                        return 0;
                                    });
                                    control=await next.forResultControl();
                                }else control=list[0];
                                await player.changeZhanJi(control,-1,!player.side);
                            }
                        }else if(xiBie=='di'){
                            await player.addZhiShiWu('zhangQi',2);
                        }else if(xiBie=='an'){
                            await player.addZhiShiWu('hunZhiLi',1);
                        }else if(xiBie=='guang'){
                            guangNum++;
                        }
                    }
                    if(event.tianQian&&guangNum>0) await player.changeXingBei(guangNum);
                },
                group:['tianJie_ruoDian'],
                subSkill:{
                    ruoDian:{
                        trigger:{player:'phaseBegin'},
                        direct:true,
                        filter:function(event,player){
                            return player.storage.tianJie_shui&&player.storage.tianJie_shui.length>0;
                        },
                        content:async function(event,trigger,player){
                            while(player.storage.tianJie_shui.length>0){
                                let list=player.storage.tianJie_shui.shift();
                                list[0].addSkill('zhangQiShouHu_'+list[1]);
                                game.log(list[0],'恢复了弱点',get.translation(list[1]));
                            }
                            delete player.storage.tianJie_shui;
                        },
                    },
                },
                ai:{
                    order:function(item,player){
                        let num=3.2;
                        let diff=player.getZhiShiWuLimit('hunZhiLi')-player.countZhiShiWu('hunZhiLi');
                        num+=diff*0.15;
                        return num;
                    },
                    result:{
                        player:1,
                    },
                }
            },
            tianQian:{
                trigger:{player:'tianJie'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                prompt2:'[宝石]额外弃1张牌[展示]，每有1张光系牌，+1【星杯】',
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    trigger.tianQian=true;
                },
                check:function(event,player){
                    return Math.random()>0.3;
                },
                ai:{
                    baoShi:true,
                },
            },
            shunYingTuXi:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:1,
                filterTarget:lib.filter.teammate,
                content:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    event.target.insertPhase('shunYingTuXi');
                    await player.addZhiLiao(1);
                    await event.target.addZhiLiao(1);
                },
                ai:{
                    baoShi:true,
                    order:3.34,
                    result:{
                        target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
                    },
                },
            },
            zhangQi:{
                intro:{
                    max:function(player){
                        if(player.name=='boss_mingJie1') return 6;
                        if(player.name=='boss_mingJie2') return 8;
                    },
                    content:'zhiShiWu',
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/hong.png'
            },
            hunZhiLi:{
                intro:{
                    max:function(player){
                        if(player.name=='boss_mingJie1') return 3;
                        if(player.name=='boss_mingJie2') return 4;
                    },
                    content:'zhiShiWu',
                },
                onremove:function (player,skill){
                    if(!lib.character[player.name][3].includes(skill)){
                        delete player.storage[skill];
                    }else{
                        player.markSkill(skill);
                    }
                },
                markimage:'image/card/zhiShiWu/lan.png'
            },
            xueMaiFengYin:{
                mod:{
                    maxHandcard:function(player,num){
                        let xingBei=get.xingBei(!player.side);
                        return num+2-xingBei;
                    },
                }
            },
            anYingZaiSheng:{
                trigger:{player:'mingYueXianYingSecondStage'},
                filter:function(event,player){
                    return player.isHengZhi()&&player.countZhiShiWu('hunZhiLi')>0;
                },
                cost:async function(event,trigger,player){
                    let list=[];
                    let num=player.countZhiShiWu('hunZhiLi');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    let ai=0;
                    let zhangQi=player.countZhiShiWu('zhangQi');
                    let zhangQiLimit=player.getZhiShiWuLimit('zhangQi');
                    ai=Math.floor((zhangQiLimit-zhangQi)/2);
                    ai=Math.min(ai,num);
                    let next=player.chooseControl(list);
                    next.set('prompt',get.prompt('anYingZaiSheng'));
                    next.set('prompt2',`移除X点的<span class='lan'>【魂之力】</span>+2X<span class='hong'>【瘴气】</span>`);
                    next.set('ai',function(){
                        return ai-1;
                    }).set('num',ai);
                    let control=await next.forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control,
                    };
                },
                content:async function(event,trigger,player){
                    await player.removeZhiShiWu('hunZhiLi',event.cost_data);
                    await player.addZhiShiWu('zhangQi',event.cost_data*2);
                },
            },
            mingJie:{
                type:'faShu',
                enable:'faShu',
                usable:1,
                filter:function(event,player){
                    if(player.hasSkill('mingQian')&&player.canBiShaBaoShi()){
                        let group=[];
                        for(var i=0;i<game.players.length;i++){
                            let current=game.players[i];
                            if(current.side!=player.side) group.push(current.group.replace('Group',''));
                        }
                        let cards=player.getCards('h');
                        for(let i=0;i<cards.length;i++){
                            let mingGe=get.mingGe(cards[i]);
                            if(group.includes(mingGe)) return true;
                        }
                    }
                    return player.countTongMingPai()>=2;
                },
                onChooseToUse:function(event){
                    let player=_status.event.player;
                    let bool1=false,bool2=false;
                    if(player.hasSkill('mingQian')&&player.canBiShaBaoShi()){
                        let group=[];
                        for(var i=0;i<game.players.length;i++){
                            let current=game.players[i];
                            if(current.side!=player.side) group.push(current.group.replace('Group',''));
                        }
                        let cards=player.getCards('h');
                        for(let i=0;i<cards.length;i++){
                            let mingGe=get.mingGe(cards[i]);
                            if(group.includes(mingGe)) bool1=true;
                        }
                    }
                    if(player.countTongMingPai()) bool2=true;
                    event.set('bool1',bool1);
                    event.set('bool2',bool2);
                },
                complexSelect:true,
                showCards:true,
                selectCard:function(){
                    let num=[2,2];
                    if(_status.event.bool1) num[0]=1;
                    if(!_status.event.bool2) num[1]=1;
                    return num;
                },
                filterCard:function(card, player, event){
                    if(ui.selected.cards.length==0){
                        let list=[];
                        if(_status.event.bool1){
                            for(var i=0;i<game.players.length;i++){
                                let current=game.players[i];
                                if(current.side!=player.side) list.push(current.group.replace('Group',''));
                            }
                        }
                        if(list.includes(get.mingGe(card))) return true;
                        if(_status.event.bool2){
                            return true;
                        }
                        return false;
                    }else if(ui.selected.cards.length==1){
                        if(_status.event.bool2){
                            return get.xuanZeTongMingPai(card);
                        }
                        return false;
                    }
                },
                selectTarget:function(){
                    if(ui.selected.cards.length==2) return 0;
                    let num=[0,0];
                    if(_status.event.bool1) num[1]=1;
                    if(!_status.event.bool2) num[0]=1;
                    return num;
                },
                filterTarget:function(card,player,target){
                    if(_status.event.bool1){
                        let group=target.group.replace('Group','');
                        return get.mingGe(card)==group;
                    }
                    return false;
                },
                filterOk:function(){
                    return (ui.selected.cards.length==2&&ui.selected.targets.length==0) || (ui.selected.cards.length==1 && ui.selected.targets.length==1);
                },
                contentBefore:async function(event,trigger,player){
                    if(event.cards.length==1){
                        player.logSkill('mingQian');
                        await player.removeBiShaBaoShi();
                    }
                },
                content:async function(event,trigger,player){
                    await player.addZhiShiWu('hunZhiLi',1);
                    let mingGe=get.mingGe(event.cards[0]);
                    if(mingGe=='sheng'){
                        let ourSide=game.filterPlayer(function(current){return current.side==player.side}).sortBySeat();
                        for(var i=0;i<ourSide.length;i++){
                            let current=ourSide[i];
                            if(current.zhiLiao<current.getZhiLiaoLimit()){
                                await current.addZhiLiao(current.getZhiLiaoLimit()-current.zhiLiao);
                            }
                        }
                    }else if(mingGe=='ji' || mingGe=='yong'){
                        let quan=mingGe=='ji'?_status.quanList[0]:_status.quanList[1];
                        if(quan){
                            let targets=[];
                            if(quan.previous.side!=player.side) targets.push(quan.priority);
                            if(quan.next.side!=player.side) targets.push(quan.next);

                            let str=mingGe=='ji'?'对左拳相邻的目标对手造成3点攻击伤害':'对右拳相邻的目标对手造成3点攻击伤害';
                            let choose=await player.chooseTarget(str,true,function(card,player,target){
                                return _status.event.list.includes(target);
                            }).set('ai',function(target){
                                let player=_status.event.player;
                                return get.damageEffect2(target,player,3);
                            }).set('list',targets).forResultTargets();
                            if(choose.length>0) await choose[0].faShuDamage(3,player);
                        }
                    }else if(mingGe=='huan'){
                        await player.addZhanJi('baoShi',3);
                    }else if(mingGe=='xue'){
                        let num=3;
                        while(num>0&&game.hasPlayer(function(current){
                            return current.side!=player.side&&current.zhiLiao>0;
                        })){
                            let targets=await player.chooseTarget(`冥劫：尽可能移除敌方角色${num}点[治疗]`,true,function(card,player,target){
                                return target.side!=player.side&&target.zhiLiao>0;
                            }).set('ai',function(target){
                                return target.zhiLiao;
                            }).forResultTargets();
                            let target=targets[0];
                            if(target.zhiLiao==1){
                                await target.removeZhiLiao(1);
                                num-=1;
                            }else{
                                let control;
                                if(num<target.zhiLiao){
                                    control=num;
                                }else{
                                    let list=[];
                                    for(var i=1;i<=target.zhiLiao;i++){
                                        if(i>num) break;
                                        list.push(i);
                                    }
                                    let next=player.chooseControl(list);
                                    next.set('prompt',`冥劫：选择移除${get.colorName(target)}的治疗数`);
                                    next.set('ai',function(){
                                        return _status.event.controls.length;
                                    });
                                    control=await next.forResultControl();
                                }
                                await target.removeZhiLiao(control);
                                num-=control;
                            }
                        }
                        if(num>0){
                            await player.changeShiQi(-num,!player.side);
                            while(num>0&&game.hasPlayer(function(current){
                                return current.side==player.side&&current.zhiLiao>0;
                            })){
                                let targets=await player.chooseTarget(`冥劫：尽可能移除我方角色${num}点[治疗]`,true,function(card,player,target){
                                    return target.side==player.side&&target.zhiLiao>0;
                                }).set('ai',function(target){
                                    return target.zhiLiao;
                                }).forResultTargets();
                                let target=targets[0];
                                if(target.zhiLiao==1){
                                    await target.removeZhiLiao(1);
                                    num-=1;
                                }else{
                                    let control;
                                    if(num<target.zhiLiao){
                                        control=num;
                                    }else{
                                        let list=[];
                                        for(var i=1;i<=target.zhiLiao;i++){
                                            if(i>num) break;
                                            list.push(i);
                                        }
                                        let next=player.chooseControl(list);
                                        next.set('prompt',`冥劫：选择移除${get.colorName(target)}的治疗数`);
                                        next.set('ai',function(){
                                            return _status.event.controls.length;
                                        });
                                        control=await next.forResultControl();
                                    }
                                    await target.removeZhiLiao(control);
                                    num-=control;
                                }
                            }
                        }
                    }
                },
                contentAfter:async function(event,trigger,player){
                    if(event.cards.length==1&&get.type(event.cards[0])=='faShu'){
                        await player.changeXingBei(1);
                        player.addGongJiOrFaShu();
                    }
                },
                check:function(card){
                    return 7-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        let num=3.3;
                        return num+player.countCards('h')*0.1;
                    },
                    result:{
                        target:-1,
                    }
                },  
            },
            mingQian:{
                ai:{
                    baoShi:true,
                }
            },

            qianYingZhuanHuan:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    let buff=game.hasPlayer(function(current){
                        return current.hasSkill('buff_E');
                    });
                    if(buff){
                        return player.countCards('h')>0&&game.hasPlayer(function(current){
                            if(current.countCards('h')==0) return false;
                                return current!=player&&current.side==player.side&&current.countCards('h')%2==player.countCards('h')%2;
                            });
                    }else{
                        return player.countCards('h')>0&&game.hasPlayer(function(current){
                            if(current.countCards('h')==0) return false;
                                return current!=player&&current.side==player.side;
                            });
                    }
                },
                content:async function(event,trigger,player){
                    let result=await player.chooseCardTarget({
                        filterCard:true,
                        filterTarget:function(card,player,target){
                            if(target.countCards('h')==0) return false;
                            if(game.hasPlayer(function(current){})){
                                return target!=player&&target.side==player.side&&target.countCards('h')%2==player.countCards('h')%2;
                            }else return target!=player&&target.side==player.side;
                        },
                        prompt:'选择目标队友交换1张手牌',
                        forced:true,
                        ai1:function(card){
                            return 7-get.value(card);
                        },
                        ai2:function(target){
                            let num=target.countYiXiPai('gongJi');
                            return 8-num;
                        },
                    }).forResult();

                    let target=result.targets[0];
                    let cards1=result.cards;

                    let cards2=await target.chooseCard('h',true,`与${get.translation(player.name)}交换1张手牌`).forResultCards();

                    await player.swapHandcards(target,cards1,cards2);
                },
                check:function(event,player){
                    if(player.countCards('h')<=2) return false;
                    if(!player.canXingDong()) return false;
                    return Math.random()<0.5;
                },
            },
            zhangQiZhiLi:{
                mod:{
                    maxHandcard:function(player,num){
                        return num-1;
                    },
                },
                group:['zhangQiZhiLi_puTong','zhangQiZhiLi_poFang'],
                subSkill:{
                    puTong:{
                        trigger:{player:'chengShouShangHai'},
                        filter:function(event,player){
                            let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');

                            return !boss.isHengZhi();
                        },
                        forced:true,
                        content:async function(event,trigger,player){
                            trigger.shiQiXiaJiang=false;
                        },
                        ai:{
                            noShiQiXiaJiang:true,
                            skillTagFilter:function(player,tag,arg){
                                let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');
                                if(boss.isHengZhi()) return false;
                            }
                        }
                    },
                    poFang:{
                        trigger:{player:'xingDongBefore'},
                        filter:function(event,player){
                            let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');
                            return boss.isHengZhi();
                        },
                        forced:true,
                        content:async function(event,trigger,player){
                            trigger.xuRuo=true;
                        },
                    },
                    pai:{
                        ai:{
                            viewHandcard:true,
                            skillTagFilter:function(player,tag,target){
                                return target.name=='boss_mingJie_zuoQuan'||target.name=='boss_mingJie_youQuan';
                            },
                        },
                    },
                },
            },
            xieQuanFangHu:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event);
                },
                cost:async function(event,trigger,player){
                    let next=player.chooseTarget();
                    next.set('prompt',get.prompt('xieQuanFangHu'));
                    next.set('prompt2','目标角色+1[治疗]');
                    next.set('ai',function(target){
                        let player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    event.result=await next.forResult();
                },
                content:async function(event,trigger,player){
                    event.targets[0].addZhiLiao(1);
                },
            },
            baoLieLianDa:{
                trigger:{player:'teShuEnd'},
                filter:function(event,player){
                    let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');
                    return boss.countZhiShiWu('hunZhiLi')>0&&player.canBiShaShuiJing();
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await _status.boss.removeZhiShiWu('hunZhiLi',1);
                    player.addGongJi();
                    player.addTempSkill('baoLieLianDa_yingZhan');
                    player.addTempSkill('baoLieLianDa_shangHai');
                },
                subSkill:{
                    yingZhan:{
                        trigger:{player:'gongJiSheZhi'},
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event);
                        },
                        direct:true,
                        content:async function(event,trigger,player){
                            trigger.wuFaYingZhan();
                            player.removeSkill('baoLieLianDa_yingZhan');
                        },
                    },
                    shangHai:{
                        trigger:{player:'gongJiMingZhong'},
                        filter:function(event,player){
                            return player.countCards('h')>0&&get.is.zhuDongGongJi(event);
                        },
                        cost:async function(event,trigger,player){
                            let xiBie=get.xiBie(trigger.card);
                            let next=player.chooseCard('h',function(card){
                                return get.xiBie(card)==_status.event.xiBie;
                            });
                            next.set('prompt',get.prompt('baoLieLianDa'));
                            next.set('prompt2',`弃1张${get.translation(xiBie)}系牌[展示],本次攻击伤害额外+1`);
                            next.set('ai',function(card){
                                return 5-get.value(card);
                            });
                            next.set('xiBie',xiBie);
                            event.result=await next.forResult();
                        },
                        content:async function(event,trigger,player){
                            await player.discard(event.cards,'showCards');
                            player.removeSkill('baoLieLianDa_shangHai');
                            trigger.changeDamageNum(1);
                        }
                    },
                },
                check:function(event,player){
                    return player.canGongJi();
                },
                ai:{
                    shuiJing:true,
                }
            },
            tanWang:{
                group:['tanWang_team','tanWang_enemy'],
                subSkill:{
                    team:{
                        forced:true,
                        trigger:{global:'zhanJiYiChu'},
                        filter:function(event,player){
                            return event.player.side==player.side;
                        },
                        content:async function(event,trigger,player){
                            await player.addNengLiang('baoShi',1);
                        },
                    },
                    enemy:{
                        forced:true,
                        trigger:{global:'zhanJiYiChu'},
                        filter:function(event,player){
                            return event.player.side!=player.side;
                        },
                        content:async function(event,trigger,player){
                            let targets=await player.chooseTarget('贪妄：目标队友+1[宝石]',function(card,player,target){
                                return target.side==player.side&&target!=player;
                            }).set('ai',function(target){
                                return 10-player.countNengLiangAll();
                            }).forResultTargets();

                            await targets[0].addNengLiang('baoShi',1);
                        },
                    },
                },
                
            },
            mingFuDuShen:{
                type:'faShu',
                enable:'faShu',
                filter:function(event,player){
                    let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');
                    return boss.countZhiShiWu('hunZhiLi')>0&&player.canBiShaBaoShi()&&player.countCards('h',card=>get.type(card)=='faShu')>0;
                },
                selectCard:[1,3],
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                showCards:true,
                selectTarget:function(card,player,target){
                    if(ui.selected.cards.length==0) return 1;
                    return [1,ui.selected.cards.length];
                },
                filterTarget:lib.filter.opponent,
                filterOk:function(){
                    return ui.selected.cards.length>=ui.selected.targets.length;
                },
                contentBefore:async function(event,trigger,player){
                    await player.removeBiShaBaoShi();
                    await _status.boss.removeZhiShiWu('hunZhiLi',1);
                },
                content:async function(event,trigger,player){
                    let num=event.cards.length;
                    await event.target.faShuDamage(num,player);
                },
                check:function(card){
                    return 7-get.value(card);
                },
                ai:{
                    baiShi:true,
                    order:3.4,
                    target:function(player, target){
                        return get.damageEffect(target,player,player.countCards('h',card=>get.type(card)=='faShu'));
                    },
                }
            },
            
            mingJie_gouMai:{
                enable:'xingDong',
                type:'teShu',
                filter:function(event,player){
                    let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');

                    if(player.side===boss.side&&boss.hasSkill('yuHeng')&&!boss.isTempBanned('yuHeng')){
                        let bool1=player.countEmptyCards()>=3;
                        let teammates=game.filterPlayer(function(current){
                            return current!=player&&current.side==player.side&&current.countEmptyCards()>=1;
                        });
                        let bool2=player.countEmptyCards()>=2&&teammates.length==2;
                        return bool1||bool2;
                    }else return player.countEmptyCards()>=3;
                },
                content:async function(event,trigger,player){
                    game.broadcastAll(function(){
                        if(lib.config.background_audio){
                            game.playAudio('skill','_gouMai');
                        }
                    });

                    let boss=_status.boss;
                    if(player.side===boss.side&&boss.hasSkill('yuHeng')&&!boss.isTempBanned('yuHeng')){
                        let bool1=player.countEmptyCards()>=3;
                        let teammates=game.filterPlayer(function(current){
                            return current!=player&&current.side==player.side&&current.countEmptyCards()>=1;
                        });
                        let bool2=player.countEmptyCards()>=2&&teammates.length==2;
                        
                        if(!bool1&&bool2){
                            await _status.boss.logSkill('yuHeng');
                            event.yuHeng=true;
                        }
                    }
                    await event.trigger('gouMai');

                    if(event.yuHeng){
                        await player.draw(2).set('cause','teShuXingDong');
                        let targets=game.filterPlayer(function(current){
                            return current!=player&&current.side==player.side;
                        }).sortBySeat();
                        for(var i=0;i<targets.length;i++){
                            await targets[i].draw(1).set('cause','teShuXingDong');
                        }
                    }else await player.draw(3).set('cause','teShuXingDong');
                    
                    var num=0;
                    var emptyZhanJi=get.emptyZhanJi(player.side);
                    if(emptyZhanJi>=2){
                        num=2;
                    }else if(emptyZhanJi>=1){
                        num=1;
                    }

                    if(num==0){
                        await player.addZhanJi('baoShi',1);
                    }else if(num==2){
                        await player.addZhanJi('baoShi',1);
                        await player.addZhanJi('shuiJing',1);
                    }else if(num==1){
                        var list=['baoShi','shuiJing'];
                        let control=await player.chooseControl(list).set('prompt','选择获得的星石').set('ai',function(){return 0;}).forResultControl();
                        if(control=='baoShi'){
                            await player.addZhanJi('baoShi',1).set('yiChu',true);
                        }else if(control=='shuiJing'){
                            await player.addZhanJi('shuiJing',1).set('yiChu',true);
                        }
                    }        
                },
                ai:{
                    order:function(item,player){
                        var num=3;
                        num+=(0.15*get.emptyZhanJi(player.side));
                        return num;
                    },
                    result:{
                        player:function(player){
                            if(get.emptyZhanJi(player.side)<2) return 0;
                            if(player.countCards('h')==0) return 1;
                            var num=0.1;
                            num+=(0.2*(player.countEmptyCards()));
                            var numx=Math.random();
                            if(numx<=num) return 1;
                            else return 0;
                        },
                    },
                }
            },
            mingJie_heCheng:{
                enable:'xingDong',
				type:'teShu',
				filter:function(event,player){
					var xingShi=get.zhanJi(player.side);
                    if(xingShi.length<3) return false;

                    let boss=game.players.find(i=>i.name=='boss_mingJie1'||i.name=='boss_mingJie2');
					if(player.side===boss.side&&boss.hasSkill('yuHeng')&&!boss.isTempBanned('yuHeng')){
                        let bool1=player.countEmptyCards()>=3;
                        let teammates=game.filterPlayer(function(current){
                            return current!=player&&current.side==player.side&&current.countEmptyCards()>=1;
                        });
                        let bool2=player.countEmptyCards()>=2&&teammates.length==2;
                        return bool1||bool2;
                    }else return player.countEmptyCards()>=3;
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('合成：选择星石','hidden');
						var list=get.zhanJi(player.side);
						var listx=[];
						for(var i=0;i<list.length;i++){
							listx.push([list[i],get.translation(list[i])]);
						}
						dialog.add([
							listx,'tdnodes'
						]);
						return dialog;
					},
					backup:function(links,player){
						return{
							links:links,
							type:'teShu',
							content:async function(event,trigger,player){
								let links=lib.skill.mingJie_heCheng_backup.links;
								game.broadcastAll(function(){
									if(lib.config.background_audio){
										game.playAudio('skill','_heCheng');
									}
								});

                                let boss=_status.boss;
                                if(player.side===boss.side&&boss.hasSkill('yuHeng')&&!boss.isTempBanned('yuHeng')){
                                    let bool1=player.countEmptyCards()>=3;
                                    let teammates=game.filterPlayer(function(current){
                                        return current!=player&&current.side==player.side&&current.countEmptyCards()>=1;
                                    });
                                    let bool2=player.countEmptyCards()>=2&&teammates.length==2;
                                    
                                    if(!bool1&&bool2){
                                        _status.boss.logSkill('yuHeng');
                                        event.yuHeng=true;
                                    }
                                }
								await event.trigger('heCheng');
                                
								if(event.yuHeng){
                                    await player.draw(2).set('cause','teShuXingDong');
                                    let targets=game.filterPlayer(function(current){
                                        return current!=player&&current.side==player.side;
                                    }).sortBySeat();
                                    for(var i=0;i<targets.length;i++){
                                        await targets[i].draw(1).set('cause','teShuXingDong');
                                    }
                                }else await player.draw(3).set('cause','teShuXingDong');
								
								var dict={};
								for(var i=0;i<links.length;i++){
									if(links[i]=='baoShi'){
										dict['baoShi']=(dict['baoShi']||0)+1;
									}else if(links[i]=='shuiJing'){
										dict['shuiJing']=(dict['shuiJing']||0)+1;
									}
								}
								if(dict['baoShi']>0){
									await player.removeZhanJi('baoShi',dict['baoShi']);
								}
								if(dict['shuiJing']>0){
									await player.removeZhanJi('shuiJing',dict['shuiJing']);
								}
								
								await player.changeXingBei(1);
							},
						}
					},
					select:3,
					check:function(button,player){
						switch(button.link){
							case 'shuiJing':{
								return 2;
							}
							case 'baoShi':{
								return 1;
							}
						}
					}
				},
				ai:{
					order:function(item,player){
						var num=3.25;
                        if(get.xingBei(player)<3) num+=0.25;
                        else num-=0.25;
						num+=(0.1*(get.zhanJi(player.side).length-3));
						return num;
					},
					result:{
						player:function(player){
							if(player.countCards('h')==0) return 1;

							var zhanJi=get.zhanJi(player.side);
							if(zhanJi.length>=4) return 1;
							if(!zhanJi.includes('水晶')) return 0;

							var num=0.3;
							num+=(0.2*(player.countEmptyCards()));

							var numx=Math.random();
							if(numx<=num) return 1;
							else return 0;
						},
					},
				}
            },
        },
        translate:{
            mingJie_gouMai:'购买',
            mingJie_heCheng:'合成',
            mingJie_heCheng_backup:'合成',
            buff_A:'炼金术',
            buff_A_info:`<span class="greentext">[被动]炼金术</span><br>
            <span class='tiaoJian'>(本体的回合开始前)</span>选择以下一项发动：<br>
            ·我方【战绩区】+1[宝石]；<br>
            ·我方【战绩区】+2[水晶]。
            `,
            buff_B:'圣洁药水',
            buff_B_info:`<span class="greentext">[被动]圣洁药水</span>
            <br><span class='tiaoJian'>(本体的回合开始前)</span>我方+1【士气】。`,
            buff_C:'先驱法杖',
            buff_C_info:`<span class="greentext">[响应]先驱法杖</span>
            <br><span class='tiaoJian'>(敌方角色因承受法术伤害导致士气下降时，移除我方【战绩区】1【星石】)</span>本次士气额外-1。`,
            buff_D:'攻击号令',
            buff_D_info:`<span class="greentext">[响应]攻击号令</span>
            <br><span class='tiaoJian'>(敌方角色因承受攻击伤害导致士气下降时，移除我方【战绩区】1【星石】)</span>本次士气额外-1。`,
            buff_E:'刻之咒符',
            buff_E_info:`<span class="greentext">[被动]刻之咒符</span><br>
            左拳或右拳发动【潜影转换】时，选择的目标角色手牌数需与其自身手牌数具有相同奇偶性；本体无法发动【御衡】。`,

            boss_mingJie1:'本体（一阶段）',
            boss_mingJie2:'本体（二阶段）',
            boss_mingJie_zuoQuan:'左拳',
            boss_mingJie_youQuan:'右拳',
            mingJie_name:'冥界',

            mingYueXianYing:"[被动]冥跃现影",
            mingYueXianYing_info:"游戏初始时，你+6<span class='hong'>【瘴气】</span>，将1/2/2个【弱点标记】混洗后放置在本体/左拳/右拳角色牌上。将【双拳】分别放置到任意角色之间。",
            zhangQiShouHu:"[被动]瘴气守护[持续]",
            zhangQiShouHu_info:"<span class='tiaoJian'>(仅【普通形态】下，我方角色在承受角色牌上【弱点标记】对应系别的攻击造成的攻击伤害⑥后)</span>移除X点<span class='hong'>【瘴气】</span>，X与本次伤害相同；<span class='tiaoJian'>(仅【普通形态】下，我方角色在承受法术伤害⑥导致手牌数超过手牌上限造成弃牌后)</span>移除Y点<span class='hong'>【瘴气】</span>，Y与本次弃牌数相同。<span class='tiaoJian'>(若<span class='hong'>【瘴气】</span>减为0，该次伤害结算完成后)</span>[横置]转为【破防形态】，移除我方角色牌上所有【弱点标记】。",
            poFangXingTai:"[被动]破防形态",
            poFangXingTai_info:"此形态下，你的行动阶段开始前，跳过你本次行动阶段；敌方角色的回合结束时，,其他角色结算效果后，你+2<span class='hong'>【瘴气】</span>。你的<span class='hong'>【瘴气】</span>到达上限时，[重置]脱离【破防形态】，你弃到4牌，将1/2/2个【弱点标记】混洗后放置在本体/左拳/右拳角色牌上，任意调整【双拳】的位置。",
            yuHeng:"[响应]御衡",
            yuHeng_info:"<span class='tiaoJian'>(我方角色执行【购买】或【合成】时)</span>将“你摸3张牌”改为“你摸2张牌，其他队友各摸1张牌”。",
            lingYiSheQu:"[被动]灵力摄取",
            lingYiSheQu_info:"<span class='tiaoJian'>(我方【星杯区】每增加1个【星杯】)</span>你+1<span class='lan'>【魂之力】</span>。",
            tianJie:"[法术]天劫[回合限定]",
            tianJie_info:`你+1<span class='lan'>【魂之力】</span>，将牌库顶的1张牌置于弃牌堆[展示]，根据展示的牌的系别依次触发以下效果：<br>
            水：直到你的下回合开始前，将我方目标角色牌上1个【弱点标记】翻至背面(视为不具有此弱点)；<br>
            风：我方目标角色弃1张牌；<br>
            火：目标对手摸1张牌[强制]；<br>
            雷：移除敌方【战绩区】的1【星石】；<br>
            地：你+2<span class='hong'>【瘴气】</span>；<br>
            暗：你+1<span class='lan'>【魂之力】</span>；<br>
            光：无效果。
            `,
            tianQian:"[响应]天谴",
            tianQian_info:"[宝石]<span class='tiaoJian'>(与【天劫】同时发动)</span>将“将牌库顶的1张牌置于弃牌堆[展示]”改为“将牌库顶的1张牌置于弃牌堆[展示]并弃1张牌[展示]”，本次展示的牌中每有1张光系牌，我方【星杯区】+1【星杯】。",
            shunYingTuXi:"[法术]瞬影突袭",
            shunYingTuXi_info:"[宝石]指定1名目标队友在你的本回合结束后立即进行一个回合，你和他各+1[治疗]。",
            zhangQi:"瘴气",
            zhangQi_info:"<span class='hong'>【瘴气】</span>为本体专有指示物，第一阶段上限为6，第二阶段上限为8。",
            hunZhiLi:"魂之力",
            hunZhiLi_info:"<span class='lan'>【魂之力】</span>为本体专有指示物，第一阶段上限为3，第二阶段上限为4。",

            xueMaiFengYin:"[被动]血脉封印",
            xueMaiFengYin_info:"你的手牌上限+2-X，X为敌方【星杯区】中的【星杯】数。",
            anYingZaiSheng:"[响应]暗影再生",
            anYingZaiSheng_info:"<span class='tiaoJian'>(进入第二阶段时，若你处于【破防形态】，移除X点<span class='lan'>【魂之力】</span>)</span>你+2X<span class='hong'>【瘴气】</span>。",
            mingJie:"[法术]冥劫[回合限定]",
            mingJie_info:`<span class='tiaoJian'>(弃2张相同命格的牌[展示])</span>你+1<span class='lan'>【魂之力】</span>，根据弃牌的命格类型触发以下效果：<br>
                圣：我方3名角色各获得[治疗]直至上限；<br>
                技：左拳对与其标记卡相邻的目标对手造成3点攻击伤害③；<br>
                咏：右拳对与其标记卡相邻的目标对手造成3点法术伤害③；<br>
                幻：我方【战绩区】+3[宝石]；<br>
                血：尽可能移除敌方角色合共3[治疗]，不足的数量改为扣减敌方等量士气并尽可能移除我方角色等量[治疗]。
            `,
            mingQian:"[响应]冥谴",
            mingQian_info:"[宝石]<span class='tiaoJian'>(与【冥劫】同时发动)</span>将发动条件改为“指定1个敌方角色的命格，你弃1张对应命格的牌[展示]”；<span class='tiaoJian'>(若弃牌为法术牌)</span>触发的效果结算完成后，我方【星杯区】+1【星杯】；额外+1[攻击行动]或[法术行动]。",

            qianYingZhuanHuan:"[启动]潜影转换",
            qianYingZhuanHuan_info:"与目标队友交换1张手牌。",
            zhangQiZhiLi:"[被动]瘴气之力",
            zhangQiZhiLi_info:`你的手牌上限-1，你的手牌持续公开[持续]。<br>
            <span class='tiaoJian'>(本体处于【普通形态】下)</span>你承受伤害不会导致我方士气下降；<br>
            <span class='tiaoJian'>(本体处于【破防形态】下，你的行动阶段开始前)</span>跳过你本次行动阶段。
            `,
            xieQuanFangHu:"[响应]卸拳防护",
            xieQuanFangHu_info:"<span class='tiaoJian'>(主动攻击未命中②时发动)</span>目标角色+1[治疗]。",
            baoLieLianDa:"[响应]爆裂连打",
            baoLieLianDa_info:"[水晶]<span class='tiaoJian'>([特殊行动]结束时发动，移除本体1点<span class='lan'>【魂之力】</span>)</span>额外+1[攻击行动]，本次攻击无法应战，<span class='tiaoJian'>(若命中②，额外弃1张与攻击牌系别相同的牌[展示])</span>本次攻击伤害额外+1。",
            tanWang:"[被动]贪妄",
            tanWang_info:"<span class='tiaoJian'>(我方【战绩区】因增加【星石】而导致【星石】溢出时)</span>你+1[宝石]；<span class='tiaoJian'>(敌方【战绩区】因增加【星石】而导致【星石】溢出时)</span>目标队友+1[宝石]。",
            mingFuDuShen:"[法术]冥府渡神",
            mingFuDuShen_info:"[宝石]<span class='tiaoJian'>(移除本体1点<span class='lan'>【魂之力】</span>，弃X张法术牌[展示]，X<4)</span>对最多X名敌方角色各造成X点法术伤害③。",
        },
        dynamicTranslate:{
            zhangQiZhiLi:function(player){
                var difficulty=get.config('difficulty');
                if(_status.connectMode) difficulty=lib.configOL.difficulty;
                if(difficulty=='hard') return `你的手牌上限-1。<br>
                    <span class='tiaoJian'>(本体处于【普通形态】下)</span>你承受伤害不会导致我方士气下降；<br>
                    <span class='tiaoJian'>(本体处于【破防形态】下，你的行动阶段开始前)</span>跳过你本次行动阶段。你的手牌持续公开[持续]。
                    `; 
                else return `你的手牌上限-1，你的手牌持续公开[持续]。<br>
                    <span class='tiaoJian'>(本体处于【普通形态】下)</span>你承受伤害不会导致我方士气下降；<br>
                    <span class='tiaoJian'>(本体处于【破防形态】下，你的行动阶段开始前)</span>跳过你本次行动阶段。
                    `;
            },
        }
    };
});