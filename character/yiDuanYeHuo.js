'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'yiDuanYeHuo',
		connect:true,
        characterSort:{
            yiDuanYeHuo:{
                "3星":['zhanDouFaShi'],
                "3.5星":['lieWuRen'],
                "4星":['shengTingJianChaShi','shengDianQiShi'],
                "4.5星":['xingZhuiNvWu'],
            }
        },
		character:{
            zhanDouFaShi:['female','yong',3,['fuWenZhiHuan','fuMoDaJi','shangBian','moLiShangZeng'],],
            //xingZhuiNvWu:['female','yong',6,['jianxiong'],],
            shengTingJianChaShi:['female','sheng',4,['kuangXinTu','caiJueLunDing','enDianShenShou','jingHuaZhiShu','biHuLingYu','caiJueZhe','shenShengBianCe','caiJue'],],
            //lieWuRen:['male','ji',6,['jianxiong'],],
            shengDianQiShi:['female','sheng',4,['shenXuanZhe','shenWei','shengCai','shengYu','shenZhiZi','shenLinShengQi','shengYanQiFu','shengYin'],],
		},
		
		skill:{
            //圣殿骑士
            shenXuanZhe:{
                trigger:{player:'useCardToTargeted'},
                forced:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.parent);
                },
                content:function(){
                    player.changeZhiLiao(1);
                },
                group:'shenXuanZhe_yiChu',
                subSkill:{
                    yiChu:{
                        trigger:{player:'zhiLiaoYiChu'},
                        forced:true,
                        priority:-1,
                        content:function(){
                            player.addZhiShiWu('shengYin');
                        }
                    },
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num-1;
                    }
                }

            },
            shenWei:{
                trigger:{player:'useCardBefore'},
                priority:1,
                filter:function(event,player){
                    if(event.getParent('phaseUse').shenWei==false) return false;
                    return player.countZhiShiWu('shengYin')>=2&&get.is.zhuDongGongJi(event);
                },
                content:function(){
                    player.removeZhiShiWu('shengYin',2);
                    trigger.canYingZhan=false;
                    if(get.mingGe(trigger.card)=='sheng'){
                        if(typeof trigger.baseDamage!='number') trigger.baseDamage=get.info(trigger.card,false).baseDamage||2;
                        trigger.baseDamage+=1;   
                    }
                    player.addTempSkill('shenWei_zhiLiao');
                    trigger.targets[0].addTempSkill('shenWei_zhiLiao');
                },
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'changeZhiLiaoBefore'},
                        direct:true,
                        filter:function(event,player){
                            return event.num>=0;
                        },
                        content:function(){
                            trigger.cancel();
                        }
                    }
                }
            },
            shengCai:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1&&get.is.zhuDongGongJi(event);
                },
                direct:true,
                content:function(){
                    'step 0'
                    var list=[];
                    var num=player.countZhiShiWu('shengYin');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var next=player.chooseControl(list);
                    next.set('prompt',get.prompt('shengCai'));
                    next.set('prompt2',lib.translate.shengCai_info);
                    next.set('ai',function(){
                        return _status.event.num;
                    });
                    next.set('num',list.length-2)
                    'step 1'
                    if(result.control=='cancel2'){
                        event.finish();
                    }else{
                        player.logSkill(event.name,trigger.targets);
                        player.removeZhiShiWu('shengYin',result.control);
                        trigger.targets[0].damageFaShu(1,player);
                        if(typeof trigger.baseDamage!='number') trigger.baseDamage=get.info(trigger.card,false).baseDamage||2;
                        trigger.baseDamage+=result.control-1;
                    }
                }
            },
            shengYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('圣愈：移除X点【圣印】','hidden');
                        var list=[];
                        var num=player.countZhiShiWu('shengYin');
                        for(var i=1;i<=num;i++){
                            list.push(i);
                        }
                        dialog.add([list,'tdnodes']);
                        return dialog;
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:1,
                            filterTarget:function(card,player,target){
                                return target!=player&&target.side==player.side;
                            },
                            content:function(){
                                'step 0'
                                event.links=lib.skill.shengYu_backup.links;
                                player.removeZhiShiWu('shengYin',event.links[0]);
                                target.changeZhiLiao(event.links[0]);
                                'step 1'
                                player.chooseToDiscard(1,true);
                                'step 2'
                                player.storage.gongJi++;
                            },
                            ai:{
                                result:{
                                    target:function(player, target){
                                        return get.zhiLiaoEffect(target,1);
                                    }
                                }
                            }
                        }
                    },
                    prompt:function(links,player){
                        return `目标队友+${links[0]}[治疗]`;
                    },
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 1.3+player.zhiLiao;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            shenZhiZi:{
                forced:true,
                trigger:{player:'addZhiShiWuEnd'},
                filter:function(event,player){
                    return !player.isLinked()&&event.num>0&&event.zhiShiWu=='shengYin';
                },
                content:function(){
                    player.changeZhiLiao(-player.zhiLiao);
                    player.hengZhi();
                    player.storage.shenZhiZi=0;
                },

                filterx:function(event,player){
                    if(!player.isLinked()) return false;
                    if(player.side!=event.side) return false;
                    if(player.side==true){
                        var shiQi=game.hongShiQi;
                    }else{
                        var shiQi=game.lanShiQi;
                    }
                    return shiQi+event.num<1; 
                },
                group:['shenZhiZi_changeShiQiBegin','shenZhiZi_changeShiQi1','shenZhiZi_changeShiQi4','shenZhiZi_huiHekaiShi','shenZhiZi_chongZhiHuiHe','shenZhiZi_chongZhiShangHai'],
                subSkill:{
                    changeShiQiBegin:{
                        trigger:{global:'changeShiQiBegin'},
                        forced:true,
                        filter:function(event,player){
                            return lib.skill.shenZhiZi.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.hongShiQi;
                            }else{
                                var shiQi=game.lanShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                    changeShiQi1:{
                        trigger:{global:'changeShiQi1'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return lib.skill.shenZhiZi.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.hongShiQi;
                            }else{
                                var shiQi=game.lanShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        }
                    },
                    changeShiQi4:{
                        trigger:{global:'changeShiQi4'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return lib.skill.shenZhiZi.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.hongShiQi;
                            }else{
                                var shiQi=game.lanShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        }
                    },
                    huiHekaiShi:{
                        trigger:{player:'phaseBegin'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.storage.shenZhiZi++;
                        }
                    },
                    chongZhiHuiHe:{
                        priority:1,
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            return player.storage.shenZhiZi>=1&&player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.chooseTarget(function(card,player,target){
                                return target.side!=player.side;
                            },true,'对目标对手造成1点法术伤害③')
                            'step 2'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'red');
                            result.targets[0].damageFaShu(1,player);
                        }
                    },
                    chongZhiShangHai:{
                        trigger:{player:'damageBegin1'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            trigger.cancel();
                            player.damage(1,player).set('faShu',true).set('step',7);
                            'step 1'
                            player.chongZhi();
                        }
                    }
                }
            },
            shenLinShengQi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('shengYin',2,4);
                    player.storage.gongJi++;
                    event.getParent('phaseUse').shenWei=false;
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        return 4;
                    },
                    result:{
                        player:2,
                    }
                }
            },
            shengYanQiFu:{
                trigger:{player:'chongZhiEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('shengYanQiFu'));
                    next.set('prompt2',lib.translate.shengYanQiFu_info);
                    next.set('ai',function(target){
                        if(target.side!=player.side){
                            return -1;
                        }
                        return get.zhiLiaoEffect(target,2);
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,result.targets);
                        player.removeBiShaShuiJing();
                        player.line(result.targets[0],'blue');
                        result.targets[0].changeZhiLiao(2);
                    }
                    
                },
                ai:{
                    shuiJing:true,
                }
            },
            shengYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                markimage:'image/card/hong.png',
            },

            //圣庭监察士
            kuangXinTu:{
                trigger:{global:"phaseBefore"},
                forced:true,
                filter:function(event,player){
                    return game.phaseNumber==0
                },
                content:function(){
                    player.addSkill('yiDuanCaiJueSuo');
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        var players=game.filterPlayer(function(current){
                            return current.side==player.side&&current!=player&&current.group=='sheng';
                        });
                        if(players.length>0) return num+1;
                    }
                },
                group:'kuangXinTu_zhiLiao',
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'useCardAfter'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event);
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            var next=player.chooseTarget(true,'目标角色+1[治疗]');
                            next.set('ai',function(target){
                                var player=_status.event.player;
                                return get.attitude(player,target);
                            });
                            'step 1'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'blue');
                            result.targets[0].changeZhiLiao(1);
                        }
                    }
                }
            },
            caiJueLunDing:{
                trigger:{global:'zhiLiaoYiChu'},
                usable:1,
                firstDo:true,
                filter:function(event,player){
                    return event.player.side==player.side;
                },
                content:function(){
                    var bool=lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,1);
                    if(bool){
                        player.addNengLiang('b');
                    }
                }   
            },
            enDianShenShou:{
                enable:'phaseUse',
                type:'teShu',
                filter:function(event,player){
                    if(event.parent.canTeShu==false) return false;
                    var side=player.side;
                    if(side==true){
                        if(game.hongZhanJi.length==0) return false;
                    }else if(side==false){
                        if(game.lanZhanJi.length==0) return false;
                    }
                    var num=0;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(!(num>=2||player.storage.yiDuanCaiJueSuo>=3)) return false
                    for(var i=0;i<game.players.length;i++){
                        if(side!=game.players[i].side) continue;
                        if(game.players[i].countNengLiangAll()<game.players[i].getNengLiangLimit()){
                            return true;
                        }
                    }
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return player.side==target.side&&target.countNengLiangAll()<target.getNengLiangLimit();
                },
                content:function(){
                    'step 0'
                    var num=0;
                    var side=player.side;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(num>=2&&player.storage.yiDuanCaiJueSuo>=3){
                        var next=player.chooseTarget('是否移除我方角色合计2[治疗]，否则移除【异端裁决所】3[治疗]',[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        });
                        next.set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        })
                    }else if(num>=2&&!(player.storage.yiDuanCaiJueSuo>=3)){
                        var next=player.chooseTarget('移除我方角色合计2[治疗]',true,[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        });
                        next.set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        })
                    }
                    'step 1'
                    if(result.bool){
                        game.log(player,'选择了',result.targets);
                        player.line(result.targets,'green');
                        if(result.targets.length==1){
                            result.targets[0].changeZhiLiao(-2);
                        }else{
                            result.targets[0].changeZhiLiao(-1);
                            result.targets[1].changeZhiLiao(-1);
                        }
                    }else{
                        lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    }
                    'step 2'
                    var num=target.getNengLiangLimit()-target.countNengLiangAll();
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else if(player.side==false){
                        var list=game.lanZhanJi;
                    }
                    var next=player.chooseButton([
                        '选择提炼的星石',
                        [list,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('selectButton',[1,num]);
                    next.set('ai',function(button){
                        var target=_status.event.target;
                        if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')){
                            if(button.link=='宝石') return 5;
                            else return -1;
                        }
                        if(target.hasSkillTag('shuiJing')&&!target.hasSkillTag('baoShi')){
                            if(button.link=='水晶') return 5;
                            else return 2;
                        }
                        //既有水晶也有宝石
                        return 2;
                    });
                    next.set('target',target);
                    'step 3'
                    for(var i=0;i<result.links.length;i++){
                        if(result.links[i]=='宝石'){
                            target.addMark('_tiLian_r');
                            player.changeZhanJi('r',-1);
                        }else if(result.links[i]=='水晶'){
                            target.addMark('_tiLian_b');
                            player.changeZhanJi('b',-1);
                        }
                    }
                    'step 4'
                    if(player.countCards('h')==0){
                        event.finish();
                    }else{
                        player.chooseToDiscard('h',1,true);
                    }
                    'step 5'
                    if(result.bool){
                        var next=player.chooseCardButton(result.cards,'是否展示,对目标角色造成1点法术伤害③');
                        next.set('filterButton',function(button){
                            return get.mingGe(button)=='sheng';
                        });
                    }else{
                        event.finish();
                    }
                    
                    'step 6'
                    if(result.bool){
                        player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                            return target.side!=player.side;
                        })
                    }else{
                        event.finish();
                    }
                    'step 7'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damageFaShu(1,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(!(target.hasSkillTag('baoShi')||target.hasSkillTag('shuiJing'))) return -1;
                            var num=target.getNengLiangLimit()-target.countNengLiangAll();
                            if(num>=2) return 2;
                            return 0;
                        },
                    }
                }
            },
            jingHuaZhiShu:{
                trigger:{player:'damageAfter'},
                priority:-1,
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',function(card){
                        return get.type(card)=='faShu';
                    });
                    next.set('prompt',get.prompt('jingHuaZhiShu'));
                    next.set('prompt2',lib.translate.jingHuaZhiShu_info);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.showCards(result.cards);
                        player.changeZhiLiao(1);
                        player.draw(1);
                        event.flag=true;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(event.flag){
                        lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,1);
                    }
                }
            },
            biHuLingYu:{
                trigger:{global:'damageBegin1'},
                firstDo:true,
                filter:function(event,player){
                    return player.storage.yiDuanCaiJueSuo>=3&&event.player.side==player.side;
                },
                content:function(){
                    lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    trigger.num--;
                    player.addZhiShiWu('caiJue',1);
                },
            },
            caiJueZhe:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('caiJue',1);
                    lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,2);
                }
            },
            shenShengBianCe:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.countZhiShiWu('caiJue')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('神圣鞭策：移除X点【裁决】','hidden');
                        var list=[];
                        var num=player.countZhiShiWu('caiJue');
                        for(var i=1;i<=num;i++){
                            list.push(i);
                        }
                        dialog.add([list,'tdnodes']);
                        return dialog;
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:links[0],
                            filterTarget:true,
                            contentBefore:function(){
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.removeBiShaShuiJing();
                                player.removeZhiShiWu('caiJue',event.links[0]);
                            }, 
                            content:function(){
                                target.draw();

                            },
                            contentAfter:function(){
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.chooseToDiscard(true,'h',event.links[0])
                            },
                            ai:{
                                result:{
                                    target:-1,
                                }
                            }
                        }
                    },
                    prompt:function(links,player){
                        return `${links[0]}名目标角色各摸1张牌[强制]`;
                    },
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 2.3+player.countZhiShiWu('caiJue');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yiDuanCaiJueSuo:{
                init:function(player){
                    player.storage.yiDuanCaiJueSuo=0;
                },
                intro:{
                    content:'共有#个[治疗]',
                    max:4,
                },
                mark:true,
                markimage:'image/card/yiDuanCaiJueSuo.png',
                addZhiLiao:function(player,num){
                    var current=player.storage.yiDuanCaiJueSuo;
                    var max=4;
                    if(current>=max){
                        return false;
                    }else if(current+num>max){
                        num=max-current;
                    }
                    player.storage.yiDuanCaiJueSuo+=num;
                    game.log('【异端裁决所】','增加'+num,'[治疗]');
                    player.updateMarks('yiDuanCaiJueSuo');
                    return true;
                },
                removeZhiLiao:function(player,num){
                    var current=player.storage.yiDuanCaiJueSuo;
                    if(current<=0){
                        return false
                    }else if(current-num<0){
                        num=current;
                    }
                    player.storage.yiDuanCaiJueSuo-=num;
                    game.log('【异端裁决所】','减少'+num,'[治疗]');
                    player.updateMarks('yiDuanCaiJueSuo');
                    return true;
                }
            },
            caiJue:{
                intro:{
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //战斗法师
            fuWenZhiHuan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                usable:1,
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    if(!ui.selected.cards.length){
                        return true;
                    }
                    var xiBie=get.xiBie(card);
                    if(get.xiBie(ui.selected.cards[0])!=xiBie){
                        return false;
                    }
                    return true;
                },
                complexCard:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    player.draw(1);
                    'step 1'
                    for(var i=0;i<cards.length;i++){
                        if(get.mingGe(cards[i])=='yong'||get.type(cards[i])=='faShu'){
                            event.flag=true;
                            break;
                        }
                    }
                    if(event.flag){
                        player.storage.gongJi++;
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            fuMoDaJi:{
                trigger:{global:'phaseBefore'},
                direct:true,
                priority:-1,
                content:function(){
                    player.storage.fuMoDaJi=0;
                },
                group:['fuMoDaJi_mingZhong','fuMoDaJi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event.parent)&&player.storage.fuMoDaJi==0;
                        },
                        content:function(){
                            player.storage.faShu++;
                            player.storage.fuMoDaJi++;
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return !event.yingZhan&&get.mingGe(event.source_card)=='yong'&&player.storage.fuMoDaJi==0;
                        },
                        content:function(){
                            player.storage.faShu++;
                            player.storage.fuMoDaJi++;
                        }
                    }
                }
            },
            shangBian:{
                trigger:{player:['chooseToUseEnd','gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(event.result.bool!=true) return false;
                    if(player.side){
                        var bool=game.hongZhanJi.includes('宝石');
                    }else{
                        var bool=game.lanZhanJi.includes('宝石');
                    }
                    var players=game.filterPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });
                    return player.storage.shangBian==3&&(bool||players.length>0);
                },
                content:function(){
                    'step 0'
                    if(player.side){
                        var bool=game.hongZhanJi.includes('宝石');
                    }else{
                        var bool=game.lanZhanJi.includes('宝石');
                    }
                    var players=game.filterPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });
                    if(bool&&players.length>0){
                        var next=player.chooseTarget('是否消耗队友【能量区】1【能量】,否者消耗我方【战绩区】1[宝石]',function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }else if(!bool&&players.length>0){
                        var next=player.chooseTarget('消耗队友【能量区】1【能量】',true,function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }
                    'step 1'
                    if(result.bool){
                        game.log(player,'选择了',result.targets);
                        player.line(result.targets,'green');
                        var target=result.targets[0];
                        event.target=target;
                        if(target.countNengLiang('r')>0&&target.countNengLiang('b')>0){
                            var list=['宝石','水晶'];
                            var next=player.chooseControl(list);
                            next.set('prompt','选择消耗的能量');
                            next.set('ai',function(control){
                                return 1;
                            });
                        }else if(target.countNengLiang('r')>0){
                            event.target.removeNengLiang('r',1);
                            event.goto(3);
                        }else if(target.countNengLiang('b')>0){
                            event.target.removeNengLiang('b',1);
                            event.goto(3);
                        }
                    }else{
                        player.removeZhanJi('r',1);
                        event.goto(3);
                    }
                    'step 2'
                    if(result.control=='宝石'){
                        event.target.removeNengLiang('r',1);
                    }else{
                        event.target.removeNengLiang('b',1);
                    }
                    'step 3'
                    var next=player.chooseTarget(2,'对2名目标对手各造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 4'
                    event.targets=result.targets.sortBySeat(player);
                    game.log(player,'选择了',event.targets);
                    player.line(event.targets,'red');
                    'step 5'
                    var target=event.targets.shift();
                    target.damageFaShu(1,player);

                    if(event.targets.length){
                        event.redo();
                    }
                },
                group:['shangBian_jiShu','shangBian_chongZhi'],
                subSkill:{
                    jiShu:{
                        priority:1,
                        trigger:{player:['chooseToUseEnd','gongJiEnd','faShuEnd']},
                        filter:function(event,player){
                            return event.result.bool==true;
                        },
                        direct:true,
                        content:function(){
                            player.storage.shangBian++;
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:-2,
                        content:function(){
                            player.storage.shangBian=0;
                        }
                    }
                }
            },
            moLiShangZeng:{
                trigger:{player:['chooseToUseEnd','gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    return event.result.bool==true&&event.type!='phase'&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'red');
                    result.targets[0].damageFaShu(1,player);
                },
                ai:{
                    shuiJing:true,
                }
            },

        },
		
		translate:{
            zhanDouFaShi:"战斗法师",
            xingZhuiNvWu:"星坠巫女",
            shengTingJianChaShi:"圣庭检察士",
            lieWuRen:"猎巫人",
            shengDianQiShi:"圣殿骑士",


            //圣殿骑士
            shenXuanZhe:"[被动]神选者",
            shenWei:"[响应]神威",
            shengCai:"[响应]圣裁",
            shengYu:"[法术]圣愈",
            shengYu_backup:"圣愈",
            shenZhiZi:"[被动]神之子",
            shenLinShengQi:"[法术]神临圣启",
            shengYanQiFu:"[响应]圣炎祈愿",
            shengYin:'圣印',
            shenXuanZhe_info:"你的[治疗]上限-1。 <span class='tiaoJian'>(主动攻击命中后②)</span>你+1[治疗]。 <span class='tiaoJian'>(当你获得[治疗]并溢出时)</span>你+1【圣印】。",
            shenWei_info:"<span class='tiaoJian'>(主动攻击前①，移除2点【圣印】)</span>本次攻击对手无法应战；<span class='tiaoJian'>(若攻击牌为圣类命格)</span>本次攻击伤害额外+1。本回合你与攻击目标无法获得[治疗]。",
            shengCai_info:"<span class='tiaoJian'>(主动攻击前①，移除X点【圣印】)</span>对攻击目标造成1点法术伤害③。本次攻击伤害额外+(X-1)。",
            shengYu_info:"<span class='tiaoJian'>(移除X点【圣印】)</span>目标队友+X[治疗]，你弃1张牌，额外+1[攻击行动]。",
            shenZhiZi_info:"<span class='tiaoJian'>(当你【圣印】增加时)</span>[横置]移除你的所有[治疗]，持续到你的下个回合结束时，你都处于【圣炎形态】，此形态下我方士气最少为1[强制]。 【神之子】的效果结束时[重置]，脱离【圣炎形态】，然后对目标对手造成1点法术伤害③。 <span class='tiaoJian'>(当【圣炎形态】下你受到伤害时③)</span>抵御本次伤害，改为承受1点来自自身的法术伤害⑥，然后[重置]脱离【圣炎形态】。",
            shenLinShengQi_info:"[水晶]无视你的【圣印】上限为你+2【圣印】，但你的【圣印】最高为4，额外+1[攻击行动]；本回合你不能发动[神威]。",
            shengYanQiFu_info:"[水晶]<span class='tiaoJian'>([重置]脱离【圣炎形态】时)</span>目标角色+2[治疗]。",
            shengYin_info:'【圣印】为圣殿骑士专有指示物，上限为2。',
            
            //圣庭监察士
            kuangXinTu:"[被动]狂信徒",
            caiJueLunDing:"[响应]裁决论定",
            enDianShenShou:"[响应]恩典神授",
            jingHuaZhiShu:"[响应]净化之术",
            biHuLingYu:"(专)[响应]庇护领域",
            caiJueZhe:"[启动]裁决者",
            shenShengBianCe:"[法术]神圣鞭策",
            shenShengBianCe_backup:"[法术]神圣鞭策",
            yiDuanCaiJueSuo:"异端裁决所",
            caiJue:"裁决",

            kuangXinTu_info:"游戏初始时你拥有【异端裁决所】。 <span class='tiaoJian'>(我方队友存在圣类命格时)</span>你的[治疗]上限+1。 <span class='tiaoJian'>(你的[攻击行动]结束后)</span>目标角色+1[治疗]。",
            caiJueLunDing_info:"[回合限定]<span class='tiaoJian'>(我方目标角色[治疗]溢出时)</span>【异端裁决所】+1[治疗]；<span class='tiaoJian'>(若因此【异端裁决所】[治疗]增加)</span>你+1[水晶]。",
            enDianShenShou_info:"<span class='tiaoJian'>(你执行[提炼]时，移除我方角色合计2[治疗]或【异端裁决所】3[治疗])</span>将提炼出的[宝石]和[水晶]全部交给目标队友，你弃1张牌；<span class='tiaoJian'>(若该弃牌为圣类命格，可展示之[展示])</span>对目标对手造成1点法术伤害③。",
            jingHuaZhiShu_info:"<span class='tiaoJian'>(你承受伤害⑥并结算完成后，弃1张法术牌[展示])</span>你+1[治疗]，摸1张牌[强制]，然后移除【异端裁决所】上1[治疗]。",
            biHuLingYu_info:"<span class='tiaoJian'>(我方目标角色受到伤害时③，移除【异端裁决所】3[治疗])</span>本次伤害-1，你+1【裁决】。",
            caiJueZhe_info:"[水晶]你+1【裁决】，【异端裁决所】+2[治疗]。",
            shenShengBianCe_info:"[水晶]<span class='tiaoJian'>(移除X点【裁决】)</span>X名目标角色各摸1张牌[强制]，你弃X张牌。",
            yiDuanCaiJueSuo_info:"【异端裁决所】的[治疗]上限为4。",
            caiJue_info:"【裁决】为圣庭监察士专有指示物，上限为3。",

            //战斗法师
            fuWenZhiHuan:"[法术]符文置换",
            fuWenZhiHuan_info:"[回合限定]<span class='tiaoJian'>(弃2张同系牌[展示])</span>摸1张牌[强制]；<span class='tiaoJian'>(若弃牌包含咏类命格或法术牌)</span>额外+1[攻击行动]。",
            fuMoDaJi:"[响应]附魔打击",
            fuMoDaJi_info:"[回合限定]<span class='tiaoJian'>(主动攻击命中时②)</span>额外+1[法术行动]。 <span class='tiaoJian'>(主动攻击未命中②且攻击牌为咏类命格)</span>额外+1[法术行动]。",
            shangBian:"[响应]熵变",
            shangBian_info:"<span class='tiaoJian'>(本回合第三次行动结束时，消耗我方【战绩区】1[宝石]或队友【能量区】1【能量】)</span>对2名目标对手各造成1点法术伤害③。",
            moLiShangZeng:"[响应]魔力熵增",
            moLiShangZeng_info:"[水晶]<span class='tiaoJian'>(每次额外行动结束时)</span>对目标对手造成1点法术伤害③。",
            
        },
	};
});
