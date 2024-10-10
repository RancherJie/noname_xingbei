'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'zhiMengZhe',
		connect:false,
        characterSort:{
            zhiMengZhe:{
                '5星':['zhiMengZheC'],
            }
        },
		character:{
            zhiMengZheC:['female','huan',5,['mengJingQieQu','memgJingBianZhi','mengJingRongHe','mingJingFuSu'],],
		},
        characterIntro:{
           
        },
		
		skill:{
            mengJingQieQu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h')>=2;
                },
                selectTarget:1,
                selectCard:2,
                filterCard:function(card){
                    return true;
                },
                prepare:'showCards',
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                content:function(){
                    'step 0'
                    player.chooseSkill(target, function (info, skill) {
						return !player.hasSkill(skill);
					});
                    'step 1'
                    if (result.bool) {
						var skill = result.skill;
						player.addAdditionalSkill("mengJing", skill,true);
                        game.log(player, "获得了技能", skill);
					}
                },
            },
            memgJingBianZhi:{
                trigger:{player:'phaseBegin'},
				firstDo:true,
                priority:-1,
                init:function(player){
                    player.storage.skills=[];
                    for(var current in lib.character){
                        if(current!=player.name){
                            player.storage.skills.addArray(lib.character[current][3]);
                        }
                    }
                },
                content:function(){
                    var skills=[];
                    for(var i of player.storage.skills){
                        if(!player.hasSkill(i)){
                            skills.push(i);
                        }
                    }
                    var skill=skills.randomGet();
                    player.addAdditionalSkill("mengJing", skill,true);
                    game.log(player, "获得了技能", skill);
                },
            },
            mengJingRongHe:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.additionalSkills['mengJing'].length>=2;
                },
                /*
                content:function(){
                    'step 0'
                    player.chooseSkill('选择移除的2个技能',player, function (info, skill) {
						return player.addAdditionalSkills['mengJing'].includes(skill);
					});


                },*/
                
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('梦境融合','hidden');
                        
                        var skils=player.additionalSkills['mengJing'];
                        var list=[];
                        for(var i=0;i<skils.length;i++){
                            if(lib.translate[skils[i]+'_info']){
                                var translation=get.translation(skils[i]);

                                list.push([skils[i],'<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                                translation+'】</div><div>'+lib.translate[skils[i]+'_info']+'</div></div>']);
                            }
                        }
                        dialog.add([list,'textbutton']);
						return dialog;
                    },
                    select:2,
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
							content:function(){
								'step 0'
                                var links=lib.skill.mengJingRongHe_backup.links;
                                for(var skill of links){
                                    player.removeAdditionalSkill('mengJing',skill);
                                }
                                'step 1'
                                var skills=[];
                                for(var i of player.storage.skills){
                                    if(!player.hasSkill(i)){
                                        skills.push(i);
                                    }
                                }
                                var skill=skills.randomGet();
                                player.addAdditionalSkill("mengJing", skill,true);
                                game.log(player, "获得了技能", skill);
							},
						}
					},
                },
                
            },
            mingJingFuSu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                usable:1,
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    event.length=player.additionalSkills['mengJing'].length;
                    for(var i of player.additionalSkills['mengJing']){
                        player.removeAdditionalSkill('mengJing',i);
                    }
                    'step 2'
                    var skills=[];
                    for(var i of player.storage.skills){
                        if(!player.hasSkill(i)){
                            skills.push(i);
                        }
                    }
                    var skill=skills.randomGets(event.length);
                    player.addAdditionalSkill("mengJing", skill,true);
                    game.log(player, "获得了技能", skill);
                }
            },
        },
		
		translate:{
            zhiMengZheC:'织梦者',
            mengJingQieQu:"[法术]梦境窃取",
            mengJingQieQu_info:"<span class='tiaoJian'>(弃2张牌[展示])</span>你选择一名其他角色获得其一个技能。",
            memgJingBianZhi:"[响应]梦境编制",
            memgJingBianZhi_info:"<span class='tiaoJian'>(你的回合开始时)</span>你随机获得一个技能。",
            mengJingRongHe:"[法术]梦境融合",
            mengJingRongHe_backup:"[法术]梦境融合",
            mengJingRongHe_info:"<span class='tiaoJian'>(移除两个获得的技能)</span>你随机获得一个技能。",
            mingJingFuSu:"[法术]梦境复苏(回合限定)",
            mingJingFuSu_info:"[宝石]你失去所有获得的技能，重新获得等量的技能。",
        },
	};
});
