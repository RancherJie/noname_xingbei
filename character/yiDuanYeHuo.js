import { lib, game, ui, get, ai, _status } from "../noname.js";
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'yiDuanYeHuo',
		connect:true,
        characterSort:{
            yiDuanYeHuo:{
                "3xing":['zhanDouFaShi'],
                "3.5xing":['lieWuRen'],
                "4xing":['shengTingJianChaShi','shengDianQiShi'],
                "4.5xing":['xingZhuiNvWu'],
            }
        },
		character:{
            zhanDouFaShi:['zhanDouFaShi_name','yongGroup',3,['fuWenZhiHuan','fuMoDaJi','shangBian','moLiShangZeng'],],
            xingZhuiNvWu:['xingZhuiNvWu_name','yongGroup','4/5',['mingDingZhiLi','xingHuan','xingKe','qunXingQiShi','huangJinLv','fanXing','yingYue','shiRi','chuangKeLvDong','luEn'],],
            shengTingJianChaShi:['shengTingJianChaShi_name','shengGroup',4,['kuangXinTu','caiJueLunDing','enDianShenShou','jingHuaZhiShu','biHuLingYu','caiJueZhe','shenShengBianCe','caiJue'],],
            lieWuRen:['lieWuRen_name','jiGroup','3/4',['zhuanHuan','shouMoCi','faShuBoLi','guanYinDuRen','touXi','moLiPing'],],
            shengDianQiShi:['shengDianQiShi_name','shengGroup',4,['shenXuanZhe','shenWei','shengCai','shengYu','shenZhiZi','shenLinShengQi','shengYanQiYuan','shengYin'],],
		},
        characterIntro:{
            zhanDouFaShi:`路尔莉嘉不擅长高深莫测的魔法，归因于她对战斗的直觉和创造性。但你如果因此小看她，则她会用符文法术的小把戏让你吃尽苦头`,
            xingZhuiNvWu:`窥探星辰之秘的天才，将看似平平无奇的符文编织重组，却产生出了惊人的效果。其流转犹如日月盈亏之形，使得对手都赞叹其华丽之形，而沉醉其中忘记自己的败北`,
            shengTingJianChaShi:`圣庭检查士积累神圣之力为队友提供庇护。她拥有者强大的防御能力，却表现得不擅长攻击。作为副官，她默默的隐藏在强者的光芒之后，然而若要轻视她，等待你的将是异端审判`,
            lieWuRen:`魔法？不，巫术是猎巫人最喜欢的目标，巫师在猎巫人的面前只能被剥离自己亲近的元素而束手就擒。可能今晚猎巫人的酒钱有着落了~`,
            shengDianQiShi:`作为神之子，斯卡雷特有着能够凭借虔诚将承受的伤痛尽数无视的特殊能力。她可以精准的讨伐对手，亦可以稳定的对对手造成伤害。然而不知道是由于教廷的过度保护还是她自身的原因，她显然没有将自身潜力完全发挥出来`,
        },
		
		skill:{
            //圣殿骑士
            shenXuanZhe:{
                trigger:{player:'gongJiMingZhong'},
                forced:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event);
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
                },
                ai:{
                    zhiLiaoYiChu:true,
                }
            },
            shenWei:{
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    if(event.getParent('phaseUse').shenWei==false) return false;
                    return player.countZhiShiWu('shengYin')>=2&&get.is.zhuDongGongJi(event);
                },
                content:function(){
                    player.removeZhiShiWu('shengYin',2);
                    trigger.wuFaYingZhan();
                    if(get.mingGe(trigger.card)=='sheng'){
                        trigger.changeDamageNum(1);   
                    }
                    player.addTempSkill('shenWei_zhiLiao');
                    trigger.target.addTempSkill('shenWei_zhiLiao');
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
                trigger:{player:'gongJiBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1&&get.is.zhuDongGongJi(event);
                },
                async cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('shengYin');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var control=await player.chooseControl(list)
                    .set('prompt',get.prompt('shengCai'))
                    .set('prompt2',lib.translate.shengCai_info)
                    .set('ai',function(){
                        return _status.event.num;
                    })
                    .set('num',list.length-2)
                    .forResultControl();
                    event.result={
                        bool:control!='cancel2',
                        cost_data:control
                    };
                },
                logTarget:'target',
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('shengYin',event.cost_data);
                    'step 1'
                    trigger.target.faShuDamage(1,player);
                    if(event.cost_data>1){
                        trigger.changeDamageNum(event.cost_data-1);
                    }
                }
            },
            shengYu:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog("<span class='tiaoJian'>(移除X点</span><span class='hong'>【圣印】</span><span class='tiaoJian'>)</span>目标队友+X[治疗]，你弃1张牌，额外+1[攻击行动]",'hidden');
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
                            filterCard:true,
                            selectCard:0,
                            content:function(){
                                'step 0'
                                event.links=lib.skill.shengYu_backup.links;
                                player.removeZhiShiWu('shengYin',event.links[0]);
                                'step 1'
                                target.changeZhiLiao(event.links[0]);
                                'step 2'
                                player.chooseToDiscard(1,true);
                                player.addGongJi();
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
                        return 1.3+player.countZhiShiWu('shengYin');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            shenZhiZi:{
                forced:true,
                trigger:{player:'changeZhiShiWuEnd'},
                filter:function(event,player){
                    return !player.isHengZhi()&&event.zhiShiWu=='shengYin'&&event.num>0;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-player.zhiLiao);
                    'step 1'
                    player.hengZhi();
                    event.getParent('phase').shenZhiZi=true;
                },

                group:['shenZhiZi_xiaoGuo','shenZhiZi_chongZhiHuiHe','shenZhiZi_chongZhiShangHai'],
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'changeShiQiJudge'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isHengZhi()) return false;
                            if(event.num>=0) return false;
                            if(player.side!=event.side) return false;
                            var shiQi=get.shiQi(player.side);
                            return shiQi+event.num<1;
                        },
                        content:function(){
                            var shiQi=get.shiQi(player.side);
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                    chongZhiHuiHe:{
                        trigger:{player:'phaseEnd'},
                        direct:true,
                        filter:function(event,player){
                            if(event.shenZhiZi==true) return false;
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.chooseTarget(function(card,player,target){
                                return target.side!=player.side;
                            },true,'对目标对手造成1点法术伤害③')
                            'step 2'
                            result.targets[0].faShuDamage(1,player);
                        }
                    },
                    chongZhiShangHai:{
                        trigger:{player:'shouDaoShangHai'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return player.isHengZhi();
                        },
                        content:function(){
                            'step 0'
                            trigger.num=0;
                            'step 1'
                            player.faShuDamage(1,player).set('step',4);
                            'step 2'
                            player.chongZhi();
                        }
                    }
                }
            },
            shenLinShengQi:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('shengYin',2,4);
                    player.addGongJi();
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
            shengYanQiYuan:{
                trigger:{player:'chongZhiEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                async cost(event,trigger,player){
                    event.result=player.chooseTarget()
                    .set('prompt',get.prompt('shengYanQiYuan'))
                    .set('prompt2',lib.translate.shengYanQiYuan_info)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,2);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    event.targets[0].changeZhiLiao(2,player);
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
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //圣庭监察士
            kuangXinTu:{
                trigger:{global:"gameStart"},
                forced:true,
                content:function(){
                    player.addSkill('yiDuanCaiJueSuo');
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        var bool=game.hasPlayer(function(current){
                            return current.side==player.side&&current!=player&&current.group=='shengGroup';
                        });
                        if(bool) return num+1;
                    }
                },
                group:'kuangXinTu_zhiLiao',
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'gongJiEnd'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event);
                        },
                        //forced:true,
                        cost:async function(event,trigger,player){
                            event.result=await player.chooseTarget(true,'狂信徒：目标角色+1[治疗]').set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            }).forResult();
                        },
                        content:function(){
                            'step 0'
                            event.targets[0].changeZhiLiao(1);
                        }
                    }
                }
            },
            caiJueLunDing:{
                trigger:{global:'zhiLiaoYiChu'},
                usable:1,
                filter:function(event,player){
                    return event.player.side==player.side;
                },
                content:function(){
                    var bool=lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,1);
                    if(bool){
                        player.addNengLiang('shuiJing');
                    }
                }   
            },
            enDianShenShou:{
                enable:'phaseUse',
                type:'teShu',
                filter:function(event,player){
                    if(event.getParent().canTeShu==false) return false;
                    var side=player.side;
                    var zhanJi=get.zhanJi(side);
                    if(zhanJi.length==0) return false;
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
                content:async function(event,trigger,player){
                    var num=0;
                    var side=player.side;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(num>=2&&player.storage.yiDuanCaiJueSuo>=3){
                        var result=await player.chooseTarget('是否移除我方角色合计2[治疗]，否则移除【异端裁决所】3[治疗]',[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        })
                        .set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        }).forResult();
                    }else if(num>=2&&!(player.storage.yiDuanCaiJueSuo>=3)){
                        var result=await player.chooseTarget('移除我方角色合计2[治疗]',true,[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        })
                        .set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        }).forResult();
                    }else var result={bool:false};

                    if(result.bool){
                        if(result.targets.length==1){
                            await result.targets[0].changeZhiLiao(-2);
                        }else{
                            await result.targets[0].changeZhiLiao(-1);
                            await result.targets[1].changeZhiLiao(-1);
                        }
                    }else{
                        lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    }

                    var num=event.target.getNengLiangLimit()-event.target.countNengLiangAll();
                    num=Math.min(num,2);
                    var list=get.zhanJi(player.side);
                    var listx=[];
                    for(var i=0;i<list.length;i++){
                        listx.push([list[i],get.translation(list[i])]);
                    };

                    result=await player.chooseButton([
                        '选择提炼的星石',
                        [listx,'tdnodes'],
                    ])
                    .set('forced',true)
                    .set('selectButton',[1,num])
                    .set('ai',function(button){
                        var target=_status.event.target;
                        if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')){
                            if(button.link=='baoShi') return 5;
                            else return -1;
                        }
                        if(target.hasSkillTag('shuiJing')&&!target.hasSkillTag('baoShi')){
                            if(button.link=='shuiJing') return 5;
                            else return 2;
                        }
                        //既有水晶也有宝石
                        return 2;
                    })
                    .set('target',event.target)
                    .forResult();

                    var dict={baoShi:0,shuiJing:0};
                    for(var i=0;i<result.links.length;i++){
                        if(result.links[i]=='baoShi') dict.baoShi++;
                        else if(result.links[i]=='shuiJing') dict.shuiJing++;
                    }
                    if(dict.baoShi>0) await player.changeZhanJi('baoShi',-dict.baoShi);
                    if(dict.shuiJing>0) await player.changeZhanJi('shuiJing',-dict.shuiJing);
                    if(dict.baoShi>0) await event.target.addNengLiang('baoShi',dict.baoShi);
                    if(dict.shuiJing>0) await event.target.addNengLiang('shuiJing',dict.shuiJing);

                    if(player.countCards('h')>0){
                        var cards=await player.chooseToDiscard('h',1,true).forResultCards();
                        result=await player.chooseCardButton(cards,'是否展示,对目标对手造成1点法术伤害③')
                        .set('filterButton',function(button){
                            return get.mingGe(button.link)=='sheng';
                        }).forResult();
                        if(result.bool){
                            await player.showCards(result.links).set('discard',true);
                            var targets=await player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                                return target.side!=player.side;
                            }).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect2(target,player,1);
                            }).forResultTargets();
                            await targets[0].faShuDamage(1,player);
                        }
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(!(target.hasSkillTag('baoShi')||target.hasSkillTag('shuiJing'))) return 0;
                            var list=get.zhanJi(player.side);
                            if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')&&!list.includes('baoShi')){
                                return 0;
                            }
							var num=target.getNengLiangLimit()-target.countNengLiangAll();
							if(num>=2) return 2;
							return 0;
                        },
                    }
                }
            },
            jingHuaZhiShu:{
                trigger:{player:'damageAfter'},
                filter:function(event,player){
                    return player.countCards('h')>0&&event.jingHuaZhiShu==true;
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseCard('h',function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt('jingHuaZhiShu'))
                    .set('prompt2',lib.translate.jingHuaZhiShu_info)
                    .set('ai',function(card){
                        return 7-get.value(card);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    player.discard(event.cards,'showCards');
                    'step 1'
                    player.changeZhiLiao(1);
                    'step 2'
                    player.draw(1);
                    'step 3'
                    lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,1);
                },
                group:'jingHuaZhiShu_chengShouShangHai',
                subSkill:{
                    chengShouShangHai:{
                        trigger:{player:'chengShouShangHai'},
                        direct:true,
                        content:function(){
                            trigger.jingHuaZhiShu=true;
                        }
                    }
                }
            },
            biHuLingYu:{
                trigger:{global:'shouDaoShangHai'},
                firstDo:true,
                filter:function(event,player){
                    return player.storage.yiDuanCaiJueSuo>=3&&event.player.side==player.side;
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    trigger.num--;
                    player.addZhiShiWu('caiJue',1);
                },
            },
            caiJueZhe:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('caiJue',1);
                    lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,2);
                },
                check:function(event,player){
                    return player.storage.yiDuanCaiJueSuo<=2&&(player.canGongJi()||player.canFaShu());
                },
            },
            shenShengBianCe:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.countZhiShiWu('caiJue')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog(`神圣鞭策：移除X点<span class='hong'>【裁决】</span>X名目标角色各摸1张牌[强制]，你弃X张牌`,'hidden');
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
                            selectCard:0,
                            filterCard:true,
                            contentBefore:function(){
                                'step 0'
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.removeBiShaShuiJing();
                                'step 1'
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
                        return 2.3+player.countZhiShiWu('caiJue')*0.5;
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
                    content:'共有#个[治疗]，上限为4。',
                    max:4,
                },
                onremove:'storage',
                mark:true,
                markimage:'image/card/zhuanShu/yiDuanCaiJueSuo.png',
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
                onremove:'storage',
                markimage:'image/card/zhiShiWu/hong.png',
            },

            //战斗法师
            fuWenZhiHuan:{
                type:'faShu',
                enable:['faShu'],
                usable:1,
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.xuanZeTongXiPai(card);
                },
                complexCard:true,
                discard:true,
                showCards:true,
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
                        player.addGongJi();
                    }
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            fuMoDaJi:{
                trigger:{source:['gongJiMingZhong','gongJiWeiMingZhong']},
                usable:1,
                filter:function(event,player,name){
                    if(get.is.zhuDongGongJi(event)){
                        if(name=='gongJiMingZhong') return true;
                        else if(name=='gongJiWeiMingZhong'){
                            return get.mingGe(event.card)=='yong';
                        }
                    }else return false;
                },
                content:function(){
                    player.addFaShu();
                }
            },
            shangBian:{
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(!get.is.xingDong(event)) return false;
                    var zhanJi=get.zhanJi(player.side);
                    var bool1=zhanJi.includes('baoShi');
                    var bool2=game.hasPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });
                    return player.storage.shangBian==3&&(bool1||bool2);
                },
                content:function(){
                    'step 0'
                    var zhanJi=get.zhanJi(player.side);
                    var bool1=zhanJi.includes('baoShi');
                    var bool2=game.hasPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });

                    if(bool1&&bool2){
                        var next=player.chooseTarget('是否消耗队友【能量区】1【能量】,否者消耗我方【战绩区】1[宝石]',function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }else if(!bool1&&bool2){
                        var next=player.chooseTarget('消耗队友【能量区】1【能量】',true,function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }
                    'step 1'
                    if(result.bool){
                        var target=result.targets[0];
                        var name=get.colorName(target);
                        event.target=target;
                        if(target.countNengLiang('baoShi')>0&&target.countNengLiang('shuiJing')>0){
                            var list=[['baoShi',get.translation('baoShi')],['shuiJing',get.translation('shuiJing')]];
                            var next=player.chooseControl(list);
                            next.set('prompt',`选择消耗${name}的能量`);
                            next.set('ai',function(control){
                                return 1;
                            });
                        }else if(target.countNengLiang('baoShi')>0){
                            event.target.removeNengLiang('baoShi',1);
                            event.goto(3);
                        }else if(target.countNengLiang('shuiJing')>0){
                            event.target.removeNengLiang('shuiJing',1);
                            event.goto(3);
                        }
                    }else{
                        player.removeZhanJi('baoShi',1);
                        event.goto(3);
                    }
                    'step 2'
                    if(result.control=='baoShi'){
                        event.target.removeNengLiang('baoShi',1);
                    }else{
                        event.target.removeNengLiang('shuiJing',1);
                    }
                    'step 3'
                    var next=player.chooseTarget(2,'对2名目标对手各造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 4'
                    event.targets=result.targets.sortBySeat(player);
                    game.log(player,'选择了',event.targets);
                    'step 5'
                    var target=event.targets.shift();
                    target.faShuDamage(1,player);

                    if(event.targets.length){
                        event.redo();
                    }
                },
                group:['shangBian_jiShu','shangBian_chongZhi'],
                subSkill:{
                    jiShu:{
                        priority:1,
                        trigger:{player:['gongJiEnd','faShuEnd']},
                        direct:true,
                        filter:function(event,player){
                            return get.is.xingDong(event);
                        },
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
                trigger:{player:['gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(!get.is.xingDong(event)) return false;
                    return event.firstAction!=true&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.storage.moLiShangZeng=false;
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 2'
                    result.targets[0].faShuDamage(1,player).set('moLiShangZeng',true);
                    'step 3'
                    if(!player.storage.moLiShangZeng){
                        player.addZhanJi('baoShi');
                    }
                },
                group:'moLiShangZeng_shiQiXiaJiang',
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{global:'changeShiQiAfter'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').moLiShangZeng==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.moLiShangZeng=true;
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },

            //星坠女巫
            mingDingZhiLi:{
                trigger:{global:'gameStart'},
                forced:true,
                content:function(){
                    player.addZhiShiWu('fanXing');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                        return game.handcardLimit+1-x;
                    }
                },
            },
            xingHuan:{
                type:'faShu',
                usable:1,
                enable:['faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='di');
                },
                selectCard:[1,Infinity],
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                discard:true,
                showCards:true,
                selectTarget:function(){
                    return ui.selected.cards.length-1;
                },
                filterTarget:true,
                filterOk:function(){
                    return ui.selected.cards.length-1==ui.selected.targets.length;
                },
                content:async function(event,trigger,player){
                    if(event.target){
                        await event.target.changeZhiLiao(1,player);
                        await event.target.draw();
                    }
                },
                contentAfter:function(){
                    'step 0'
                    player.changeZhiLiao(1);
                    'step 1'
                    player.draw();
                    player.addFaShu();
                },
                check:function(card){
                    return 6-get.value(card);
                },
                ai:{
                    order:function(item,player){
                        return 7-player.countCards('h');
                    },
                    result:{
                        target:1,
                    }
                }
            },
            xingKe:{
                trigger:{player:['faShuEnd','gongJiEnd']},
                filter:function(event,player,name){
                    if(name=='faShuEnd') return true;
                    else if(name=='gongJiEnd'){
                        return get.is.gongJiXingDong(event);
                    }else return false;
                },
                content:function(){
                    var cards=get.cards();
                    player.addToExpansion('draw',cards,'log').gaintag.add('luEn');
                }
            },
            qunXingQiShi:{
                type:'qiDong',
                trigger:{player:'qiDong'},
                filter:function(event,player){
                    var bool1,bool2;
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    if(x<3&&player.countCards('h')>0) bool1=true;
                    else bool1=false;

                    if(player.getExpansions('luEn').length>0) bool2=true;
                    else bool2=false;

                    return bool1||bool2;
                },
                content:function(){
                    'step 0'
                    var bool1,bool2;
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    if(x<3&&player.countCards('h')>0) bool1=true;
                    else bool1=false;

                    if(player.getExpansions('luEn').length>0) bool2=true;
                    else bool2=false;

                    var list=[];
                    if(bool1) list.push('选项一');
                    if(bool2) list.push('选项二');
                    var choiceList=["<span class='tiaoJian'>(将1张手牌面朝下放置在你角色旁，作为【卢恩】。选择1个【律法】放置于你面前)</span>你摸0-1张牌。","<span class='tiaoJian'>(移除X个【卢恩】[展示])</span>发动任意符合条件的【律法】，然后移除1个【律法】。"];

                    player.chooseControl(list).set('prompt','选择以下一项发动').set('choiceList',choiceList).set('ai',function(){
                        var bool1=_status.event.bool1;
                        var bool2=_status.event.bool2;
                        var player=_status.event.player;
                        if(player.getExpansions('luEn').length>=5&&bool2) return '选项二';
                        if(bool1) return '选项一';
                    }).set('bool1',bool1).set('bool2',bool2);
                    'step 1'
                    if(result.control=='选项一'){
                        event.goto(2)
                    }else{
                        event.goto(6);
                    }

                    'step 2'
                    player.chooseCard('h',true,'将1张手牌面朝下放置在你角色旁，作为【卢恩】');
                    'step 3'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('luEn');
                    var list=[];
                    if(!player.hasZhiShiWu('fanXing')) list.push('繁星');
                    if(!player.hasZhiShiWu('yingYue')) list.push('影月');
                    if(!player.hasZhiShiWu('shiRi')) list.push('蚀日');
                    player.chooseControl(list).set('prompt','选择1个【律法】放置于你面前');
                    'step 4'
                    switch(result.control){
                        case '繁星':
                            player.addZhiShiWu('fanXing');
                            break;
                        case '影月':
                            player.addZhiShiWu('yingYue');
                            break;
                        case '蚀日':
                            player.addZhiShiWu('shiRi');
                            break;
                    }
                    'step 5'
                    player.chooseDraw(1);
                    event.finish();

                    'step 6'
                    var cards=player.getExpansions('luEn');
                    player.chooseCardButton(cards,true,[1,Infinity],'移除X张【卢恩】');
                    'step 7'
                    player.discard(result.links,'luEn','showHiddenCards');
                    event.cards=result.links;
                    'step 8'
                    event.trigger('yiChuLuEn')
                    'step 9'
                    var list=[];
                    if(player.hasZhiShiWu('fanXing')) list.push('繁星');
                    if(player.hasZhiShiWu('yingYue')) list.push('影月');
                    if(player.hasZhiShiWu('shiRi')) list.push('蚀日');
                    if(list.length>0){
                        player.chooseControl(list).set('prompt','选择1个【律法】移除');
                    }else{
                        event.finish();
                    }
                    'step 10'
                    switch(result.control){
                        case '繁星':
                            player.removeZhiShiWu('fanXing');
                            break;
                        case '影月':
                            player.removeZhiShiWu('yingYue');
                            break;
                        case '蚀日':
                            player.removeZhiShiWu('shiRi');
                            break;
                    }
                    event.finish();
                },
                check:function(event,player){
                    return player.countCards('h')>0||player.getExpansions('luEn').length>3;
                }
            },
            huangJinLv:{
                trigger:{player:'qunXingQiShiAfter'},
                filter:function(event,player){
                    return player.countCards('h')<2;
                },
                content: async function(event,trigger,player){
                    await player.draw(1);
                    var cards = player.getExpansions("luEn");
                    if(cards.length>0){
                        var next = player.chooseToMove("黄金律：是否交换【卢恩】和手牌");
                        next.set("list", [
                            ["卢恩", cards],
                            ["手牌", player.getCards("h")],
                        ]);
                        next.set("filterMove", function (from, to, moved) {
                            if (typeof to == "number") return false;
                            var player = _status.event.player;
                            //交换前
                            if (moved[0].length < 1) return true;
                            //交换回去
                            if((moved[0].includes(from.link)&&moved[1].includes(to.link))||moved[0].includes(to.link)&&moved[1].includes(from.link)) return true;
                            var luEn = player.getExpansions("luEn");
                            //卢恩间交换
                            if(luEn.includes(from.link)&&luEn.includes(to.link)) return true;
                            var h=player.getCards("h");
                            //手牌间交换
                            if (h.includes(from.link) == h.includes(to.link)) return true;
                            //移动后，移动的牌在卢恩区交换
                            if(moved[0].includes(from.link)&&luEn.includes(to.link)) return true;
                            if(moved[0].includes(to.link)&&luEn.includes(from.link)) return true;
                            //移动后，移动的牌在手牌区交换
                            if(moved[1].includes(from.link)&&h.includes(to.link)) return true;
                            if(moved[1].includes(to.link)&&h.includes(from.link)) return true;

                            return moved[0].length <1;
                        });
                        next.set('filterOk',function(moved){
                            var player=_status.event.player;
                            var pushs = moved[0],
                                gains = moved[1];
                            pushs.removeArray(player.getExpansions("luEn"));
                            gains.removeArray(player.getCards("h"));
                            return pushs.length==1;
                        });
                        var result=await next.forResult();
                        if(!result.moved) return;
                        var pushs = result.moved[0],
                            gains = result.moved[1];
                        if (!pushs.length || pushs.length != gains.length) return;
                        await player.lose(pushs);
                        await player.lose(gains);
                        await player.addToExpansion(pushs, "draw",'log').set('gaintag',['luEn']);
                        game.log(player,'获得了1张牌');
                        await player.gain(gains, "draw");
                    }
                }
            },
            fanXing:{
                intro:{
                    name:'律法：繁星',
                    content:"<span class='tiaoJian'>(当移除的【卢恩】包含4个不同系别或4个不同命格)</span>对所有对手各造成1点法术伤害③；<span class='tiaoJian'>(若移除的【卢恩】包含4个不同系别与4个不同命格)</span>目标队友额外+1[宝石]。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/fanXing.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('fanXing')) return false;
                    
                    var cards=event.cards;
                    var xiBie=[],mingGe=[];
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(!xiBie.includes(get.xiBie(card))) xiBie.push(get.xiBie(card));
                        if(!mingGe.includes(get.mingGe(card))) mingGe.push(get.mingGe(card));
                    }

                    return xiBie.length>=4||mingGe.length>=4;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie=[],mingGe=[];
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(!xiBie.includes(get.xiBie(card))) xiBie.push(get.xiBie(card));
                        if(!mingGe.includes(get.mingGe(card))) mingGe.push(get.mingGe(card));
                    }

                    if(xiBie.length>=4&&mingGe.length>=4) event.flag=true;

                    event.targets=game.filterPlayer(function(current){
                        return current.side!=player.side;
                    });
                    'step 1'
                    var target=event.targets.shift();
                    target.faShuDamage(1,player);
                    if(event.targets.length>0){
                        event.redo();
                    }
                    'step 2'
                    if(event.flag){
                        player.chooseTarget('目标队友额外+1[宝石]',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).set('ai',function(target){
                            var num=target.getNengLiangLimit()-target.countNengLiangAll();
                            return num;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    result.targets[0].addNengLiang('baoShi',1);
                }
            },
            yingYue:{
                intro:{
                    name:'律法：影月',
                    content:"<span class='tiaoJian'>(当移除的【卢恩】包含X对相同系别的【卢恩】，X>1)</span>对目标角色造成X点法术伤害③。<span class='tiaoJian'>(当移除的【卢恩】包含X对相同命格的【卢恩】，X>1)</span>任意分配X点[治疗]给1~2位我方角色。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/yingYue.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('yingYue')) return false;

                    var cards=event.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    var xiBie_num=0;
                    var mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=2){
                            xiBie_num+=(xiBie[i]/2) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=2){
                            mingGe_num+=(mingGe[i]/2) >> 0;
                        }
                    }
                    return xiBie_num>1||mingGe_num>1;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    event.xiBie_num=0;
                    event.mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=2){
                            event.xiBie_num+=(xiBie[i]/2) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=2){
                            event.mingGe_num+=(mingGe[i]/2) >> 0;
                        }
                    }

                    'step 1'
                    if(event.xiBie_num>1){
                        var next=player.chooseTarget(`对目标角色造成${event.xiBie_num}点法术伤害③`,true);
                        next.set('ai',function(target){
                            var player=_status.event.player;
                            return -get.attitude(player,target);
                        });
                    }
                    'step 2'
                    if(event.xiBie_num>1){
                        result.targets[0].faShuDamage(event.xiBie_num,player);
                    }

                    'step 3'
                    if(event.mingGe_num>1){//分配[治疗]
                        var next=player.chooseTarget([1,2],`任意分配${event.mingGe_num}点[治疗]给1~2位我方角色`,true,function(card,player,target){
                            return target.side==player.side;
                        });
                        next.set('ai',function(target){
                            return get.zhiLiaoEffect(target);
                        });
                    }else{
                        event.finish();
                    }
                    'step 4'
                    result.targets.sortBySeat(player);
                    game.log(player,'选择了',result.targets);
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.mingGe_num);
                        event.finish();
                    }else{
                        if(event.mingGe_num==2){
                            result.targets[0].changeZhiLiao(1);
                            result.targets[1].changeZhiLiao(1);
                            event.finish();
                        }else{//治疗数>2 后面需要选择分配
                            event.targets=result.targets;
                        }
                    }
                    'step 5'
                    var list=[];
                    for(var i=1;i<=event.mingGe_num-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.targets[0]);
                    var str=name+'获得几点[治疗]';
                    player.chooseControl(list).set('prompt',str);
                    'step 6'
                    event.targets[0].changeZhiLiao(result.control);
                    event.mingGe_num-=result.control;
                    'step 7'
                    event.targets[1].changeZhiLiao(event.mingGe_num);
                }
            },
            shiRi:{
                intro:{
                    name:'律法：蚀日',
                    content:"<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同系别的【卢恩】)</span>你+1[宝石]。<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同命格的【卢恩】)</span>我方【战绩区】+1[宝石]。",
                    nocount:true,
                },
                onremove:'storage',
                markimage:'image/card/zhuanShu/shiRi.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('shiRi')) return false;

                    var cards=event.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    var xiBie_num=0;
                    var mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=3){
                            xiBie_num+=(xiBie[i]/3) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=3){
                            mingGe_num+=(mingGe[i]/3) >> 0;
                        }
                    }
                    return xiBie_num>0||mingGe_num>0;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    event.xiBie_num=0;
                    event.mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=3){
                            event.xiBie_num+=(xiBie[i]/3) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=3){
                            event.mingGe_num+=(mingGe[i]/3) >> 0;
                        }
                    }
                    'step 1'
                    if(event.xiBie_num>0) player.addNengLiang('baoShi',event.xiBie_num);
                    'step 2'
                    if(event.mingGe_num>0) player.addZhanJi('baoShi',event.mingGe_num);
                }
            },
            chuangKeLvDong:{
                type:'faShu',
                enable:['faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.addSkill('chuangKeLvDong_wuXian');
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.chooseDraw(1);
                    'step 2'
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    player.chooseCard('h',`将最多${x+1}张手牌面朝下放置在你角色旁，作为【卢恩】`,[1,x+1]);
                    'step 3'
                    if(result.bool){
                        player.addToExpansion('draw',result.cards,'log').gaintag.add('luEn');
                    }
                    player.removeSkill('chuangKeLvDong_wuXian');
                    'step 4'
                    player.qiPai();
                },
                subSkill:{
                    wuXian:{
                        mod:{
                            maxHandcardWuShi:function(player,num){
                                return Infinity;
                            }
                        },
                    }
                },
                
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            luEn:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('luEn');
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
                    return player.getExpansions('luEn').length>6;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('luEn');
                    var next=player.chooseCardButton(cards,true,cards.length-6,`舍弃${cards.length-6}张【卢恩】`);
                    'step 1'
                    player.discard(result.links,'luEn').set('sheQi',true);
                }
            },
            //猎巫人
            zhuanHuan:{
                enable:['gongJi','yingZhan'],
                filter:function(event,player){
                    var event=event||_status.event;
                    if(event.name=='yingZhan'){
                        if(event.canYingZhan==false) return false;
                        var cards=player.getCards('h');
                        for(var i=0;i<cards.length;i++){
                            var card=cards[i];
                            if(card.name!='shengGuang'&&get.type(card)=='faShu'){
                                if(get.xiBie(card)==get.xiBie(event.card)) return true;
                            }
                        }
                        return false;
                    }

                    return player.countCards('h',function(card){
                        return card.name!='shengGuang'&&get.type(card)=='faShu';
                    });
                },
                filterCard:function(card,player,event){
                    if(card.name=='shengGuang'||get.type(card)!='faShu') return false;
                    var event=event||_status.event;
                    if(event.name=='yingZhan'){
                        return get.xiBie(card)==get.xiBie(event.card);
                    }
                    return card.name!='shengGuang'&&get.type(card)=='faShu';
                },
                position:'h',
                viewAs:function(cards,player){
                    if(cards.length==0) return;
                    var xiBie=get.xiBie(cards[0]);
                    var name;
                    switch(xiBie){
                        case 'shui':
                            name='shuiLianZhan';
                            break;
                        case 'huo':
                            name='huoYanZhan';
                            break;
                        case 'feng':
                            name='fengShenZhan';
                            break;
                        case 'lei':
                            name='leiGuangZhan';
                            break;
                        case 'di':
                            name='diLieZhan';
                            break;
                    }
                    var dict={name:name,xiBie:xiBie};
					return dict;
				},
                ai:{
                    order:3.5,
                    result:{
                        player:1,
                    }
                }
            },
            shouMoCi:{
                trigger:{player:'gongJiShi'},
                filter:function(event,player){
                    var num=player.getExpansions('moLiPing').length;
                    if(num>=4) return false;

                    return get.is.zhuDongGongJi(event)&&event.target.countCards('h')<4&&event.target.countCards('h')>0;
                },
                logTarget:'target',
                content:function(){
                    'step 0'
                    trigger.target.chooseToDiscard(true);
                    'step 1'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('moLiPing');
                }
            },
            faShuBoLi:{
                trigger:{source:'gongJiMingZhong'},
                filter:function(event,player){
                    var num=player.getExpansions('moLiPing').length;
                    if(num>=4) return false;

                    return get.is.zhuDongGongJi(event);
                },
                async cost(event,trigger,player){
                    event.result=await player.chooseTarget()
                    .set('prompt',get.prompt('faShuBoLi'))
                    .set('prompt2',lib.translate.faShuBoLi_info)
                    .set('ai',function(target){
                        var player=_status.event.player;
                        if(target.countCards('h')<=0) return -1;
                        return -get.attitude(player,target);
                    })
                    .forResult();
                },
                content:function(){
                    'step 0'
                    var target=event.targets[0];
                    if(target.countCards('h')>0){
                        target.chooseToDiscard('h',true);
                    }else event.finish();
                    'step 1'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('moLiPing');
                }
            },
            guanYinDuRen:{
                trigger:{source:'chengShouShangHai'},
                filter:function(event,player){
                    return player.getExpansions('moLiPing').length>=1;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('moLiPing');
                    var result=await player.chooseCardButton(cards,`是否发动【灌银毒刃】，移除1个【魔力瓶】,本次伤害-1，其摸牌后将移除的【魔力瓶】加入他手牌[强制]，你+1[治疗]`).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links
                    }
                },
                logTarget:'player',
                content:function(){
                    'step 0'
                    player.discard(event.cost_data,'moLiPing');
                    trigger.changeDamageNum(-1);
                    player.storage.guanYinDuRenPlayer=trigger.player;
                    'step 1'
                    player.addTempSkill('guanYinDuRen_gain');
                    player.storage.guanYinDuRen=event.cost_data;
                    trigger.guanYinDuRen=true;
                    
                },
                subSkill:{
                    gain:{
                        trigger:{global:['drawAfter','damageZero']},
                        direct:true,
                        filter:function(event,player){
                            return (event.getParent('damage').guanYinDuRen||event.guanYinDuRen)&&player.storage.guanYinDuRenPlayer==event.player;
                        },
                        content:function(){
                            'step 0'
                            game.log(trigger.player,'获得了',player.storage.guanYinDuRen.length,'张牌');
                            trigger.player.gain(player.storage.guanYinDuRen,'draw');
                            player.removeSkill('guanYinDuRen_gain');
                            'step 1'
                            player.changeZhiLiao(1);
                        }
                    }
                },
            },
            touXi:{
                usable:1,
                trigger:{player:'gongJiEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&get.is.gongJiXingDong(event)&&player.getExpansions('moLiPing').length>=2;
                },
                async cost(event,trigger,player){
                    var cards=player.getExpansions('moLiPing');
                    var result=await player.chooseCardButton(cards,2,`是否发动【偷袭】，移除2个【魔力瓶】[展示]<br>每有X张法术牌，对X名目标对手造成1点法术伤害③；<span class='tiaoJian'>(若有2张攻击牌)</span>额外+1[攻击行动]。 <span class='tiaoJian'>(若为同系牌)</span>对目标角色造成1点法术伤害③。`).forResult();
                    event.result={
                        bool:result.bool,
                        cost_data:result.links
                    }
                },
                content:async function(event,trigger,player){
                    await player.removeBiShaShuiJing();
                    await player.discard(event.cost_data,'moLiPing','showHiddenCards');
                    var cards=event.cost_data;

                    var faShu=0;
                    var gongJi=0;
                    var tongXi=false;

                    for(let card of cards){
                        if(get.type(card)=='faShu'){
                            faShu++;
                        }else if(get.type(card)=='gongJi'){
                            gongJi++;
                        }
                    }
                    if(get.xiBie(cards[0])==get.xiBie(cards[1])) tongXi=true;

                    if(faShu>=1){
                        let targets=await player.chooseTarget(`对${faShu}个目标对手造成1点法术伤害③`,true,faShu,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return -get.damageEffect(target,1);
                        }).forResultTargets();
                        targets.sortBySeat(player);
                        game.log(player,'选择了',targets);
                        for(let target of targets){
                            await target.faShuDamage(1,player);
                        }
                    }
                    if(gongJi>=2) player.addGongJi();
                    
                    if(tongXi){
                        let targets=await player.chooseTarget(`对目标角色造成1点法术伤害③`,true).set('ai',function(target){
                            var player=_status.event.player;
                            if(target.side==player.side) return -1;
                            return -get.damageEffect(target,1);
                        }).forResultTargets();
                        await targets[0].faShuDamage(1,player);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            moLiPing:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('moLiPing');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                onremove:function(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            },
        },
		
		translate:{
            zhanDouFaShi:"战斗法师",
            xingZhuiNvWu:"星坠女巫",
            shengTingJianChaShi:"圣庭检察士",
            lieWuRen:"猎巫人",
            shengDianQiShi:"圣殿骑士",

            zhanDouFaShi_name:"路尔莉嘉",
            xingZhuiNvWu_name:"蕾娜",
            shengTingJianChaShi_name:"克里斯玛",
            lieWuRen_name:"白狼卡拉马",
            shengDianQiShi_name:"斯卡雷特",


            //圣殿骑士
            shenXuanZhe:"[被动]神选者",
            shenWei:"[响应]神威",
            shengCai:"[响应]圣裁",
            shengYu:"[法术]圣愈",
            shengYu_backup:"圣愈",
            shenZhiZi:"[被动]神之子",
            shenLinShengQi:"[法术]神临圣启",
            shengYanQiYuan:"[响应]圣炎祈愿",
            shengYin:'圣印',
            shenXuanZhe_info:"你的[治疗]上限-1。 <span class='tiaoJian'>(主动攻击命中后②)</span>你+1[治疗]。 <span class='tiaoJian'>(当你获得[治疗]并溢出时)</span>你+1<span class='hong'>【圣印】</span>。",
            shenWei_info:"<span class='tiaoJian'>(主动攻击前①，移除2点</span><span class='hong'>【圣印】</span><span class='tiaoJian'>)</span>本次攻击对手无法应战；<span class='tiaoJian'>(若攻击牌为圣类命格)</span>本次攻击伤害额外+1。本回合你与攻击目标无法获得[治疗]。",
            shengCai_info:"<span class='tiaoJian'>(主动攻击前①，移除X点</span><span class='hong'>【圣印】</span><span class='tiaoJian'>)</span>对攻击目标造成1点法术伤害③。本次攻击伤害额外+(X-1)。",
            shengYu_info:"<span class='tiaoJian'>(移除X点</span><span class='hong'>【圣印】</span><span class='tiaoJian'>)</span>目标队友+X[治疗]，你弃1张牌，额外+1[攻击行动]。",
            shenZhiZi_info:"<span class='tiaoJian'>(当你</span><span class='hong'>【圣印】</span><span class='tiaoJian'>增加时)</span>[横置]移除你的所有[治疗]，持续到你的下个回合结束时，你都处于【圣炎形态】，此形态下我方士气最少为1[强制]。 【神之子】的效果结束时[重置]，脱离【圣炎形态】，然后对目标对手造成1点法术伤害③。 <span class='tiaoJian'>(当【圣炎形态】下你受到伤害时③)</span>抵御本次伤害，改为承受1点来自自身的法术伤害⑥，然后[重置]脱离【圣炎形态】。",
            shenLinShengQi_info:"[水晶]无视你的<span class='hong'>【圣印】</span>上限为你+2<span class='hong'>【圣印】</span>，但你的<span class='hong'>【圣印】</span>最高为4，额外+1[攻击行动]；本回合你不能发动[神威]。",
            shengYanQiYuan_info:"[水晶]<span class='tiaoJian'>([重置]脱离【圣炎形态】时)</span>目标角色+2[治疗]。",
            shengYin_info:"<span class='hong'>【圣印】</span>为圣殿骑士专有指示物，上限为2。",
            
            //圣庭监察士
            kuangXinTu:"[被动]狂信徒",
            caiJueLunDing:"[响应]裁决论定[回合限定]",
            enDianShenShou:"[响应]恩典神授",
            jingHuaZhiShu:"[响应]净化之术",
            biHuLingYu:"(专)[响应]庇护领域",
            caiJueZhe:"[启动]裁决者",
            shenShengBianCe:"[法术]神圣鞭策",
            shenShengBianCe_backup:"[法术]神圣鞭策",
            yiDuanCaiJueSuo:"异端裁决所",
            caiJue:"裁决",

            kuangXinTu_info:"游戏初始时你拥有【异端裁决所】。 <span class='tiaoJian'>(我方队友存在圣类命格时)</span>你的[治疗]上限+1。 <span class='tiaoJian'>(你的[攻击行动]结束时)</span>目标角色+1[治疗]。",
            caiJueLunDing_info:"<span class='tiaoJian'>(我方目标角色[治疗]溢出时)</span>【异端裁决所】+1[治疗]；<span class='tiaoJian'>(若因此【异端裁决所】[治疗]增加)</span>你+1[水晶]。",
            enDianShenShou_info:"<span class='tiaoJian'>(你执行[提炼]时，移除我方角色合计2[治疗]或【异端裁决所】3[治疗])</span>将提炼出的[宝石]和[水晶]全部交给目标队友，你弃1张牌；<span class='tiaoJian'>(若该弃牌为圣类命格，可展示之[展示])</span>对目标对手造成1点法术伤害③。",
            jingHuaZhiShu_info:"<span class='tiaoJian'>(你承受伤害⑥并结算完成后，弃1张法术牌[展示])</span>你+1[治疗]，摸1张牌[强制]，然后移除【异端裁决所】上1[治疗]。",
            biHuLingYu_info:"<span class='tiaoJian'>(我方目标角色受到伤害时③，移除【异端裁决所】3[治疗])</span>本次伤害-1，你+1<span class='hong'>【裁决】</span>。",
            caiJueZhe_info:"[水晶]你+1<span class='hong'>【裁决】</span>，【异端裁决所】+2[治疗]。",
            shenShengBianCe_info:"[水晶]<span class='tiaoJian'>(移除X点</span><span class='hong'>【裁决】</span><span class='tiaoJian'>)</span>X名目标角色各摸1张牌[强制]，你弃X张牌。",
            yiDuanCaiJueSuo_info:"【异端裁决所】的[治疗]上限为4。",
            caiJue_info:"<span class='hong'>【裁决】</span>为圣庭监察士专有指示物，上限为3。",

            //战斗法师
            fuWenZhiHuan:"[法术]符文置换[回合限定]",
            fuWenZhiHuan_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>摸1张牌[强制]；<span class='tiaoJian'>(若弃牌包含咏类命格或法术牌)</span>额外+1[攻击行动]。",
            fuMoDaJi:"[响应]附魔打击[回合限定]",
            fuMoDaJi_info:"<span class='tiaoJian'>(主动攻击命中时②)</span>额外+1[法术行动]。 <span class='tiaoJian'>(主动攻击未命中②且攻击牌为咏类命格)</span>额外+1[法术行动]。",
            shangBian:"[响应]熵变",
            shangBian_info:"<span class='tiaoJian'>(本回合第三次行动结束时，消耗我方【战绩区】1[宝石]或队友【能量区】1【能量】)</span>对2名目标对手各造成1点法术伤害③。",
            moLiShangZeng:"[响应]魔力熵增",
            moLiShangZeng_info:"[水晶]<span class='tiaoJian'>(每次额外行动结束时)</span>对目标对手造成1点法术伤害③；<span class='tiaoJian'>(若未因此造成士气下降)</span>我方【战绩区】+1[宝石]。",
            
            //星坠巫女
            mingDingZhiLi:"[被动]命定之理",
            mingDingZhiLi_info:"你手牌上限+(1-X)[恒定]，X为你拥有的【律法】数。游戏初始时你拥有【律法：繁星】。",
            xingHuan:"[法术]星环[回合限定]",
            xingHuan_info:"<span class='tiaoJian'>(弃X张地系牌[展示])</span>指定(X-1)名角色与你各+1[治疗]并各摸1张牌[强制]，你+1[法术行动]。",
            xingKe:"[响应]星刻",
            xingKe_info:"<span class='tiaoJian'>([攻击行动]或[法术行动]结束时)</span>将牌库顶1张牌面朝下放置在你角色旁，作为【卢恩】。",
            qunXingQiShi:"[启动]群星启示",
            qunXingQiShi_info:"你选择以下一项发动:<br>·<span class='tiaoJian'>(将1张手牌面朝下放置在你角色旁，作为【卢恩】。选择1个【律法】放置于你面前)</span>你摸0-1张牌。<br>·<span class='tiaoJian'>(移除X个【卢恩】[展示])</span>发动任意符合条件的【律法】，然后移除1个【律法】。",
            huangJinLv:"[响应]黄金律",
            huangJinLv_info:"<span class='tiaoJian'>(当【群星启示】发动后，你的手牌数<2时)</span>摸1张牌[强制]，并可将1张手牌与1个【卢恩】交换。",
            fanXing:"(专)[响应]繁星",
            fanXing_info:"<span class='tiaoJian'>(当移除的【卢恩】包含4个不同系别或4个不同命格)</span>对所有对手各造成1点法术伤害③；<span class='tiaoJian'>(若移除的【卢恩】包含4个不同系别与4个不同命格)</span>目标队友额外+1[宝石]。",
            yingYue:"(专)[响应]影月",
            yingYue_info:"<span class='tiaoJian'>(当移除的【卢恩】包含X对相同系别的【卢恩】，X>1)</span>对目标角色造成X点法术伤害③。<span class='tiaoJian'>(当移除的【卢恩】包含X对相同命格的【卢恩】，X>1)</span>任意分配X点[治疗]给1~2位我方角色。",
            shiRi:"(专)[响应]蚀日",
            shiRi_info:"<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同系别的【卢恩】)</span>你+1[宝石]。<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同命格的【卢恩】)</span>我方【战绩区】+1[宝石]。",
            chuangKeLvDong:"[法术]创刻律动",
            chuangKeLvDong_info:"[宝石]<span class='tiaoJian'>(无视你的手牌上限摸0-1张牌)</span>将最多(1+X)张手牌面朝下放置在你角色旁，作为【卢恩】，X为你拥有的【律法】数。",
            luEn:"卢恩",
            luEn_info:"【卢恩】为星坠巫女专有改盖牌，上限为6。",

            //猎巫人
            zhuanHuan:"[响应]转换",
            zhuanHuan_info:"除[圣光]外，你的法术牌都可作为对应系别攻击牌使用。",
            shouMoCi:"[响应]狩魔刺",
            shouMoCi_info:"<span class='tiaoJian'>(主动攻击手牌<4的目标对手时①，该目标弃1张牌)</span>将弃牌面朝下放置于你的角色旁，作为【魔力瓶】。",
            faShuBoLi:"[响应]法术剥离",
            faShuBoLi_info:"<span class='tiaoJian'>(主动攻击命中时②发动)</span>目标角色弃1张牌，将弃牌面朝下放置于你的角色旁，作为【魔力瓶】。",
            guanYinDuRen:"[响应]灌银毒刃",
            guanYinDuRen_info:"<span class='tiaoJian'>(目标角色将要承受你造成的伤害时⑥发动，移除1个【魔力瓶】)</span>本次伤害-1，其摸牌后将移除的【魔力瓶】加入他手牌[强制]，你+1[治疗]。",
            touXi:"[响应]偷袭[回合限定]",
            touXi_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束时，移除2个【魔力瓶】[展示])</span>每有X张法术牌，对X名目标对手造成1点法术伤害③；<span class='tiaoJian'>(若有2张攻击牌)</span>额外+1[攻击行动]。 <span class='tiaoJian'>(若为同系牌)</span>对目标角色造成1点法术伤害③。",
            moLiPing:"魔力瓶",
            moLiPing_info:"【魔力瓶】为猎巫人专有盖牌，上限为4；若【魔力瓶】达到上限，则不能发动【狩魔刺】、【法术剥离】",
        },
	};
});
