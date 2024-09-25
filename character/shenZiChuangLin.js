'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenZiChuangLin',
		connect:true,
        characterSort:{
            shenZiChuangLin:{
                "3星":['jinGuiZhiNv'],
                "3.5星":[],
                "4星":['shenMiXueZhe','ranWuZhe'],
                "4.5星":[],
                '5星':['nvPuZhang','jieJieShi'],
            }
        },
		character:{
            jinGuiZhiNv:['female','yong',3,['gaoLingZhiHua','moFaRuMen','Magic','qiangYuYuanXing','youQingJiBan'],],
            nvPuZhang:['female','ji',5,['yingZhiXue','miShuMuYing','shun','yingFeng','shiFengZhiDao','jinShu','fengXue','zhen','ying','mi'],],
            jieJieShi:['female','huan',5,['jieJieYiShi','huangShenZhiLi','huangShenJiYi','jinMoJing','liuLiJing','jueJie','fuMoJing','jieJie','jiX'],],
            shenMiXueZhe:['female','yong',4,['yanLingShu','shouHuLing','zhenYanShu','jinJiMiFa','yaoJingMiShu','zhenYanYaZhi','yanLing','miShu'],],
            ranWuZhe:['female','xue',4,['shenQiZhiYi','liRuQuanYong','kuangLiZhiXin','kuangLiZhiTi','shenZhiWuRan','niuQuZhiAi','liQi'],],
		},
        characterIntro:{
            jinGuiZhiNv:`\u662f\u4e00\u4e2a\u8fd8\u5728\u5b66\u4e60\u9b54\u6cd5\u7684\u8d35\u65cf\u5927\u5c0f\u59d0~\u3002\u5e73\u65f6\u4eba\u7f18\u8fd8\u4e0d\u9519\uff0c\u4f46\u8fc7\u4e8e\u5355\u7eaf\uff0c\u5f88\u5bb9\u6613\u88ab\u5229\u7528\uff1b\u672c\u8eab\u5c31\u662f\u4e00\u4e2a\u50bb\u767d\u751c\uff0c\u53ea\u6709\u5355\u7eaf\u7684\u540c\u60c5\u4e4b\u5fc3<br>            \u7ea2\u83b2\u4e8b\u4ef6\u4e4b\u540e\uff0c\u827e\u4e3d\u5361\u7684\u7236\u4eb2\u4e0e\u5c3c\u5415\u514b\u6d3e\uff0c\u4e3a\u4e86\u6269\u5f20\u81ea\u5df1\u7684\u6d3e\u7cfb\u4e0e\u5f71\u54cd\u529b\uff0c\u5229\u7528\u4e86\u5979\u7684\u5355\u7eaf\u4e0e\u540c\u60c5\u5fc3\uff0c\u5c06\u5979\u63a8\u4e0a\u4e86\u201c\u5723\u5973\u201d\u8fd9\u6837\u4e00\u4e2a\u6559\u5ef7\u5076\u50cf\u822c\u7684\u4f4d\u7f6e\uff1b\u7b56\u5212\u4e86\u4e00\u51fa\u7ed1\u67b6\u6848\u4f5c\u4e3a\u63a9\u62a4\uff0c\u5b9e\u9645\u4e0a\u662f\u5b9e\u65bd\u865a\u5047\u7684\u661f\u75d5\u70d9\u5370\u4eea\u5f0f\uff0c\u76ee\u7684\u5c31\u662f\u5bf9\u5979\u5b9e\u65bd\u4eba\u5de5\u661f\u75d5\u7684\u5f3a\u884c\u70d9\u5370\u3002<br>            \u56e0\u4e3a\u827e\u4e3d\u5361\u7684\u5355\u7eaf\uff0c\u4e0d\u80fd\u8ba9\u5979\u77e5\u9053\u81ea\u5df1\u53ea\u662f\u4e2a\u5047\u7684\u795e\u4e4b\u5b50\uff0c\u9700\u8981\u5236\u9020\u4e00\u4e2a\u620f\u5267\u6027\u7684\u4e8b\u4ef6\u8ba9\u5979\u81ea\u5df1\u53d1\u73b0\u81ea\u5df1\u5f97\u5230\u201c\u795e\u7684\u8d4b\u4e88\u201d\uff0c\u6240\u4ee5\u6b64\u65f6\u9664\u4e86\u5979\u7236\u4eb2\u548c\u7ea2\u8863\u4e3b\u6559\u77e5\u9053\u4ee5\u5916\uff0c\u5e76\u672a\u5bf9\u5916\u516c\u5f00\uff0c\u4e5f\u6ca1\u6709\u8ba9\u5176\u4ed6\u4eba\u77e5\u9053\u3002\u7531\u6b64\u5f15\u53d1\u4e86\u4e00\u573a\u201c\u95f9\u5267\u201d
            `,
            nvPuZhang:`\u662f\u827e\u4e3d\u5361\u7684\u4e13\u5c5e\u4f8d\u4ece\u5973\u4ec6\uff0c\u7531\u4e8e\u4e0d\u77e5\u9053\u201c\u7ed1\u67b6\u6848\u201d\u7684\u771f\u5b9e\u60c5\u51b5\uff0c\u4e3a\u4e86\u89e3\u6551\u5979\uff0c\u627e\u6765\u4e86\u5728\u6597\u517d\u573a\u4e2d\u51e0\u4e2a\u827e\u4e3d\u5361\u66fe\u7ecf\u201c\u5e2e\u52a9\u201d\u8fc7\u7684\u6218\u58eb\uff0c\u4f17\u4eba\u4e00\u8d77\u51fa\u53d1\u53bb\u6551\u827e\u4e3d\u5361<br>            \u5b9e\u9645\u8fd8\u6709\u53e6\u5916\u4e00\u4e2a\u8eab\u4efd\u2014\u53db\u5fcd\uff0c\u56e0\u6b64\u53d7\u5230\u4e86\u65e0\u5ff5\u7684\u8ffd\u6740`,
            jieJieShi:`\u7531\u7ea2\u8863\u4e3b\u6559\u96c7\u4f63\uff0c\u5e03\u7f6e\u7ed3\u754c\u62d6\u5ef6\u4e86\u627e\u827e\u4e3d\u5361\u961f\u4f0d\u7684\u65f6\u95f4\u3002\u80fd\u591f\u7528\u7ed3\u754c\u4f7f\u7684\u5728\u539f\u5730\u7684\u4eba\u770b\u8d77\u6765\u8ddf\u6d88\u5931\u4e86\u4e00\u6837\u3002\u539f\u5728\u4e1c\u65b9\u7687\u671d\u67d0\u95e8\u6d3e\u4e0b\u5b66\u4e60\uff0c\u540e\u6e38\u5386\u81f3\u897f\u65b9\u5b66\u4e60\u4e86\u65b0\u7684\u6cd5\u672f\uff0c\u63a5\u89e6\u5230\u4e86\u79d8\u8f9b\u3002\u540c\u65f6\u4e5f\u4e3a\u4e86\u65b9\u4fbf\u5b66\u4e60\u897f\u65b9\u7684\u9b54\u6cd5\u800c\u5b89\u88c5\u4e86\u56db\u6839\u89e6\u624b\u9b54\u6cd5\u589e\u5e45\u88c5\u7f6e`,
            shenMiXueZhe:`\u827e\u4e3d\u5361\u7684\u79c1\u4eba\u5bb6\u5ead\u6559\u5e08\uff0c\u53d7\u8058\u6559\u6388\u827e\u4e3d\u5361\u9b54\u6cd5\uff0c\u4e0e\u7d22\u5c14\u65af\u6709\u5173\uff1b\u827e\u4e3d\u5361\u5931\u8e2a\u65f6\uff0c\u4e0e\u5973\u4ec6\u4e4b\u957f\u7b49\u4eba\u4e00\u8d77\u53bb\u5bfb\u627e\uff0c\u867d\u7136\u51ed\u501f\u7cbe\u7075\u654f\u9510\u7684\u9b54\u6cd5\u611f\u5e94\u627e\u5230\u4e86\u7ed3\u754c\uff0c\u4f46\u7531\u4e8e\u4e0d\u6e05\u695a\u539f\u7406\uff0c\u65e0\u6cd5\u7b2c\u4e00\u65f6\u95f4\u7834\u9664\u7ed3\u754c<br>            \u8a00\u7075\u662f\u4e00\u79cd\u901a\u8fc7\u5492\u8bed\u9b54\u6cd5\u83b7\u5f97\u751f\u547d\u7279\u5f81\u7684\u5143\u7d20\u7c7b\u751f\u547d\u4f53\uff0c\u5c5e\u4e8e\u65e0\u673a\u7269\u7269\u7ea7\u522b\uff0c\u8a00\u662f\u6307\u5492\u8bed\u64cd\u4f5c\uff0c\u7075\u5219\u662f\u7c7b\u751f\u547d\u7684\u5143\u7d20\u4f53`,
            wuRanZhe:`\u6597\u517d\u573a\u91cc\u7684\u6218\u58eb\uff0c\u8981\u4e0e\u522b\u4eba\u6216\u731b\u517d\u640f\u6597\u4f9b\u8fbe\u5b98\u8d35\u65cf\u53d6\u4e50\uff0c\u8eab\u5f62\u53cd\u800c\u6bd4\u8f83\u7626\u5c0f\uff0c\u8eab\u8fb9\u7ecf\u5e38\u8513\u5ef6\u7740\u4e0d\u660e\u7684\u623e\u6c14\u3002\u56e0\u53d7\u8fc7\u827e\u4e3d\u5361\u7684\u201c\u5e2e\u52a9\u201d\u800c\u5fc3\u5b58\u611f\u6fc0\uff0c\u4e3a\u6b64\u6b21\u201c\u8425\u6551\u201d\u827e\u4e3d\u5361\u800c\u51fa\u529b\u3002\u672c\u6765\u56e0\u827e\u4e3d\u5361\u7684\u201c\u5e2e\u52a9\u201d\u800c\u6446\u8131\u4e86\u5974\u96b6\u7684\u8eab\u4efd\uff0c\u4e0d\u8fc7\u540e\u56e0\u957f\u65f6\u95f4\u4f5c\u4e3a\u6218\u58eb\uff0c\u65e0\u6cd5\u7ee7\u7eed\u878d\u5165\u793e\u4f1a\u800c\u9009\u62e9\u91cd\u65b0\u56de\u5230\u6597\u517d\u573a\u4f5c\u4e3a\u81ea\u7531\u4eba\u6218\u58eb\u6765\u751f\u6d3b\uff0c\u7ecf\u5e38\u4e0e\u566c\u795e\u8005\u7ec4\u961f`,
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
                        event.targetsX=event.targets.slice(0);
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
                    if(event.targets.length>0){
                        event.goto(2);
                    }
                    'step 4'
                    

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
                            return -get.damageEffect(target,1);
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
                            return get.damageEffect2(target,player,1);
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
                            return get.zhiLiaoEffect2(target,player,1);
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

                    'step 15'
                    if(event.targetsX){
                        var target=event.targetsX.shift();
                        if(target){
                            target.draw();
                        }
                        if(event.targetsX.length>0){
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
                //priority:1,
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
            miShuMuYing:{
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
                            trigger.getParent().canYingZhan=false;
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
                    }).set('x',list.length-2);
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
                    'step 5'
                    game.log(player,'交给了',result.targets[0],event.card);
                    result.targets[0].gain(event.card,'draw');
                    'step 6'
                    player.hengZhi();
                },
                check:function(event,player){
                    var num=Math.random();
                    if(player.isLinked()) return num>0.1;
                    var cards=player.getExpansions('ying');
                    var num=get.countTongXiPai(cards);
                    if(num>=2) return true;
                    else return false;
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
                        trigger:{player:'useCardEnd'},
                        priority:-1,
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
                        trigger:{player:'useCardEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event);
                        },
                        priority:-2,
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
                    if(!get.is.gongJi(event.getParent())) return false;

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
                    trigger.getParent().baseDamage++;
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

            //神秘学者
            yanLingShu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                selectCard:[1,2],
                filterCard:true,
                prepare:'showCards',
                discard:false,
                content:function(){
                    'step 0'
                    player.addToExpansion('draw',cards,'log').gaintag.add('yanLing');
                    'step 1'
                    player.draw();
                    'step 2'
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
                    'step 3'
                    if(result.bool){
                        player.showCards(result.cards);
                    }else{
                        event.finish();
                    }
                    'step 4'
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
                trigger:{target:'useCardToTargeted'},
                firstDo:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.getParent())&&(player.getExpansions('yanLing').length>0||player.countZhiShiWu('miShu')>0);
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('yanLing');
                    if(cards.length>0){
                        player.chooseCardButton(cards,true,'移除1个【言灵】').set('ai',function(){
                            return Math.random();
                        });
                    }else{
                        event.goto(2);
                    }
                    'step 1'
                    player.discard(result.links,'yanLing');
                    'step 2'
                    if(player.countZhiShiWu('miShu')>0){
                        var list=['是','否'];
                        player.chooseControl(list).set('prompt','是否额外移除1点【秘术】');
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
                enable:['chooseToUse','faShu'],
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
                    player.chooseCardButton(yanLing,true,'选择1个除光系外的【言灵】').set('ai',function(card){
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
                        player.chooseControl(list).set('prompt','是否额外移除1点【秘术】');
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
                    game.log(player,'选择了',target);
                    target.damageFaShu(1,player);
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
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('miShu',3);
                    player.chooseTarget(2,true).set('ai',function(target){
                        return Math.random();
                    });
                    'step 1'
                    game.log(player,'选择了',result.targets);
                    event.targets=result.targets.sortBySeat(player);
                    'step 2'
                    event.target=event.targets.shift();
                    if(event.target.countCards('h')>0){
                        event.target.chooseToDiscard('h',true);
                    }
                    'step 3'
                    if(result.cards){
                        player.showGaiPai(result.cards);
                        player.addToExpansion('draw',result.cards,'log').gaintag.add('yanLing');
                    }
                    if(event.targets.length>0){
                        event.goto(2);
                    }
                }
            },
            yaoJingMiShu:{
                usable:1,
                trigger:{player:['useSkillAfter','zhenYanYaZhi']},
                filter:function(event,player){
                    if(event.name=='useSkill'){
                        return event.skill=='zhenYanShu'&&event.selected!=true;
                    }else{
                        return true;
                    }
                },
                content:function(){
                    'step 0'
                    trigger.selected=true;
                    player.addTempSkill('yaoJingMiShu_gongJi');
                    player.gongJi().set('bool',true);
                },
                subSkill:{
                    gongJi:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return event.getParent(2).bool;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            player.addZhiShiWu('miShu',2);
                        }
                    }
                }
            },
            zhenYanYaZhi:{
                trigger:{player:'useSkillAfter'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    return event.skill=='zhenYanShu'&&event.selected!=true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    trigger.selected=true;
                    player.chooseTarget(true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 1'
                    game.log(player,'选择了',result.targets);
                    var target=result.targets[0];
                    target.damageFaShu(1,player);
                    'step 2'
                    var yanLing=player.getExpansions('yanLing');
                    var cards=[];
                    for(var i=0;i<yanLing.length;i++){
                        if(get.xiBie(yanLing[i])!='guang') cards.push(yanLing[i]);
                    }
                    var list=['否'];
                    if(cards.length>0){
                        list.unshift('是');
                    }
                    player.chooseControl(list).set('prompt','是否立即执行一次【真言术】');
                    'step 3'
                    if(result.control=='是'){
                        player.useSkill('zhenYanShu');
                    }
                    'step 4'
                    event.player=player;
                    event.trigger('zhenYanYaZhi');
                }
            },
            yanLing:{
                intro:{
					content:'expansion',
					markcount:'expansion',
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
                markimage:'image/card/hong.png',
            },

            //染污者
            shenQiZhiYi:{
                group:['shenQiZhiYi_kaiShi','shenQiZhiYi_huoDe','shenQiZhiYi_shangHai','shenQiZhiYi_shiYong'],
                subSkill:{
                    kaiShi:{
                        trigger:{global:'phaseBefore'},
                        forced:true,
                        filter:function(event,player){
                            return game.phaseNumber==0;
                        },
                        content:function(){
                            player.addNengLiang('b',1);
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
                        trigger:{source:"damageBegin0"},
                        forced:true,
                        filter:function(event,player){
                            return event.player.zhiLiao>0;
                        },
                        content:function(){
                            trigger.num++;
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
                trigger:{player:['useSkillAfter','useCardAfter']},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return (get.is.gongJiXingDong(event)||get.is.faShuXingDong(event))&&player.countZhiShiWu('liQi')<2;
                },
                content:function(){
                    player.addZhiShiWu('liQi');
                    player.storage.gongJi++;
                },
                check:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='gongJi')>0;
                }
            },
            kuangLiZhiXin:{
                trigger:{player:['phaseBegin','damageEnd']},
                forced:true,
                filter:function(event,player){
                    if(player.isLinked()) return false;
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
                    game.log(player,'选择了',result.targets);
                    result.targets[0].changeZhiLiao(-2);
                    'step 3'
                    player.hengZhi();
                },
                group:['kuangLiZhiXin_shangHai','kuangLiZhiXin_chongZhi'],
                subSkill:{
                    shangHai:{
                        trigger:{source:"damageBegin0"},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            trigger.num++;
                        }
                    },
                    chongZhi:{
                        trigger:{player:"phaseEnd"},
                        priority:1,
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked()&&player.countZhiShiWu('liQi')==0;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            if(player.countNengLiang('b')>0){
                                player.removeNengLiang('b');
                            }else{
                                event.finish();
                            }
                            'step 2'
                            player.addNengLiang('r',1);
                        }
                    }
                },
                mod:{
                    cardEnabled:function(card,player){
                        if(player.isLinked()&&card.name=='shengGuang'){
                            return false;
                        }else{
                            return;
                        }
                    }
                },

            },
            kuangLiZhiTi:{
                trigger:{player:'damageBegin0'},
                forced:true,
                priority:-1,
                filter:function(event,player){
                    return event.source&&player.isLinked()&&player.countZhiShiWu('liQi')>0;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('liQi');
                    'step 1'
                    trigger.num++;
                    if(trigger.num>4){
                        trigger.num=4;
                    }
                }
            },
            shenZhiWuRan:{
                trigger:{source:'damageBegin0'},
                priority:-2,
                filter:function(event,player){
                    return event.source&&player.isLinked()&&player.countZhiShiWu('liQi')>0;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('liQi');
                    'step 1'
                    trigger.num++;
                    trigger.canZhiLiao=false;
                }
            },
            niuQuZhiAi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
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
                        if(!player.isLinked()) player.hengZhi();
                    }else{
                        if(player.isLinked()) player.chongZhi();
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
                    player.removeZhiShiWu('liQi',2);
                    'step 6'
                    var list=[0,1,2];
                    player.chooseControl(list).set('prompt','选择【戾气】的数量').set('ai',function(){
                        return 1;
                    });
                    'step 7'
                    if(result.control>0){
                        player.addZhiShiWu('liQi',result.control);
                    }
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
                markimage:'image/card/hong.png',
            },

        },
		
		translate:{
            jinGuiZhiNv:'矜贵之女',
            nvPuZhang:'女仆长',
            jieJieShi:'结界师',
            shenMiXueZhe:'神秘学者',
            ranWuZhe:'染污者',

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
            youQingJiBan_info:"[宝石]<span class='tiaoJian'>(发动[魔法入门]时发动)</span>将“你摸1张牌[强制][展示]”改为“我方2名角色各弃1张牌[强制][展示]，效果结算后各摸1张牌[强制]”。",

            //女仆长
            yingZhiXue:"[启动]影之穴",
            yingZhiXue_info:"<span class='tiaoJian'>(移除1点【糸】)</span>将【风穴】转移或放置于目标对手前，他弃1张牌。",
            miShuMuYing:"[响应]秘术·摹影",
            miShuMuYing_info:"<span class='tiaoJian'>(主动攻击命中时发动②)</span>将本次攻击牌面朝下放置在你角色旁作为【影】。",
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
