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
            //zhanDouFaShi:['female','yong',6,['jianxiong'],],
            //xingZhuiNvWu:['female','yong',6,['jianxiong'],],
            //shengTingJianChaShi:['female','sheng',6,['jianxiong'],],
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
                        player.addTempSkill('shenWei_zhiLiao');
                        trigger.targets[0].addTempSkill('shenWei_zhiLiao');
                    }
                },
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'changeZhiLiaoBefore'},
                        direct:true,
                        filter:function(event,player){
                            return event.num>0;
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
                    if(player.side==event.side) return false;
                    if(player.side==true){
                        var shiQi=game.hongShiQi;
                    }else{
                        var shiQi=game.lanShiQi;
                    }
                    return shiQi+event.num<10; 
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
                                var shiQi=game.lanShiQi;
                            }else{
                                var shiQi=game.hongShiQi;
                            }
                            var num=10-shiQi;
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
                                var shiQi=game.lanShiQi;
                            }else{
                                var shiQi=game.hongShiQi;
                            }
                            var num=10-shiQi;
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
                                var shiQi=game.lanShiQi;
                            }else{
                                var shiQi=game.hongShiQi;
                            }
                            var num=10-shiQi;
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
                            console.log(1);
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            console.log(2);
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

        },
		
		translate:{
            zhanDouFaShi:"战斗法师",
            xingZhuiNvWu:"星坠巫女",
            shengTingJianChaShi:"圣庭监察士",
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
            shenWei_info:"<span class='tiaoJian'>(主动攻击前①，移除2点【圣印】)</span>本次攻击对手无法应战；<span class='tiaoJian'>(若攻击牌为圣类命格)</span>本次攻击伤害额外+1，本回合你与攻击目标无法获得[治疗]。",
            shengCai_info:"<span class='tiaoJian'>(主动攻击前①，移除X点【圣印】)</span>对攻击目标造成1点法术伤害③，本次攻击伤害额外+(X-1)。",
            shengYu_info:"<span class='tiaoJian'>(移除X点【圣印】)</span>目标队友+X[治疗]，你弃1张牌，额外+1[攻击行动]。",
            shenZhiZi_info:"<span class='tiaoJian'>(当你【圣印】增加时)</span>[横置]移除你的所有[治疗]，持续到你的下个回合结束时，你都处于【圣炎形态】，此形态下我方士气最少为1[强制]。 【神之子】的效果结束时[重置]，脱离【圣炎形态】，然后对目标对手造成1点法术伤害③。 <span class='tiaoJian'>(当【圣炎形态】下你受到伤害时③)</span>抵御本次伤害，改为承受1点来自自身的法术伤害⑥，然后[横置]脱离【圣炎形态】。",
            shenLinShengQi_info:"[水晶]无视你的【圣印】上限为你+2【圣印】，但你的【圣印】最高为4，额外+1[攻击行动]；本回合你不能发动[神威]。",
            shengYanQiFu_info:"[水晶]<span class='tiaoJian'>([重置]脱离【圣炎形态】时)</span>目标角色+2[治疗]。",
            shengYin_info:'【圣印】为圣殿骑士专有指示物，上限为2。',
            
        },
	};
});
