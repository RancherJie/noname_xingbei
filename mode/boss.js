import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
    return {
        name: "boss",
        start:function(){
			"step 0"
			var playback=localStorage.getItem(lib.configprefix+'playback');
			if(playback){
				ui.create.me();
				ui.arena.style.display='none';
				ui.system.style.display='none';
				_status.playback=playback;
				localStorage.removeItem(lib.configprefix+'playback');
				var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
				store.get(parseInt(playback)).onsuccess=function(e){
					if(e.target.result){
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
						game.playVideoContent(e.target.result.video);
					}
					else{
						alert('播放失败：找不到录像');
						game.reload();
					}
				}
				event.finish();
				return;
			}
			if(_status.connectMode){
				lib.configOL.guDingRenShu=true;
				game.waitForPlayer(function(){//联机人数确定
					if(lib.configOL.phaseswap) lib.configOL.number=2;
					else{
                        lib.configOL.number=4;
					}
				});
			}else{
				game.prepareArena(4);
			}
			"step 1"
			if(_status.connectMode){
				if(lib.configOL.phaseswap){
					lib.configOL.number=4;
				}
				game.randomMapOL();
			}else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				game.chooseCharacter();
			}
			"step 2"
			if(_status.connectMode){
                _status.onreconnect=[function(){
                    var players=game.players;
                    for(var i=0;i<players.length;i++){
                        if(players[i].side==true){
                            players[i].node.identity.firstChild.innerHTML='红';
                        }
                        else{
                            players[i].node.identity.firstChild.innerHTML='蓝';
                        }
                    }
                },];
			};
			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:players[i].name1,
					name2:players[i].name2,
					identity:players[i].node.identity.firstChild.innerHTML,
					color:players[i].node.identity.dataset.color,
					side:players[i].side,
				});
			}
			_status.videoInited=true;
            if(get.phaseswap()||_status.boss==game.me) info.push(true);//记录为多控
            game.addVideo('init',null,info);
			event.trigger('gameStart');
            'step 3'
			var firstChoose=(_status.firstAct||game.players.randomGet());
			game.gameDraw(firstChoose);
            game.phaseLoop(firstChoose);
		},
		game:{
			bossList:['boss_mingJie1'],

			checkResult:function(){
				var me = game.me._trueMe || game.me;
				if(me.side==true){
					if(_status.bossStage==2&&game.hongShiQi<=0){
						game.over(false);
					}else if(game.lanShiQi<=0||game.hongXingBei>=game.xingBeiMax){
						game.over(true);
					}
				}
				else if(me.side==false){
					if(game.lanShiQi<=0||game.hongXingBei>=game.xingBeiMax){
						game.over(false);
					}else if(_status.bossStage==2&&game.hongShiQi<=0){
						game.over(true);
					}
				}
			},
			checkOnlineResult:function(player,bool){
				if(bool===true){
					return game.me.side==player.side;
				}else if(bool===false){
					return game.me.side!=player.side;
				}else return undefined;
			},

			getRoomInfo:function(uiintro){
				var last=uiintro.add('<div class="text chat">难度：'+get.translation(lib.configOL.difficulty));
				var last=uiintro.add('<div class="text chat">侯选角色数：'+lib.configOL.choose_number);
				if(!lib.configOL.phaseswap){
					switch(lib.configOL.viewHandcard){
						case true:uiintro.add('<div class="text chat">可见队友手牌：是');break;
						case false:uiintro.add('<div class="text chat">可见队友手牌：否');break;
					}
				}
				var last=uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用角色：'+get.translation(lib.configOL.banned));
				}
				last.style.paddingBottom='8px';
			},
			getVideoName:function(){
				var str2;
				if(get.phaseswap()){ 
					var str='';
					str+='多控';
					str2='';
					for(var name of _status.characterList){
						str2+=get.translation(name);
						if(_status.characterList.indexOf(name)!=_status.characterList.length-1){
							str2+='、';
						}
					}
				}else{
					var str=get.translation(game.me.name1);
				}
				if(game.me.side==true) str+='（红方）';
				else str+='（蓝方）';

				return [str,str2];
			},

			
			$initZhanJi:function(){
				game.broadcastAll(function(){
					ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
				});
				game.changeShiQi(game.shiQiMaxHong||game.shiQiMax,true,false);
				game.changeShiQi(game.shiQiMaxLan||game.shiQiMax,false,false);
				return ui.shiQiInfo;
			},
			modeSwapPlayer:function(player){
				if(get.phaseswap()){
					var list=game.getActivePlayersBySide();
					if(list.includes(player)) return;
					if(player.side==true&&list[0].side==true) var from=list[0];
					else if(player.side==false&&list[1].side==false) var from=list[1];
					else return;
					game.swapControl(player,from);
					game.onSwapControl(player);
				}
			},
			onSwapControl:function(from){
				if(_status.connectMode && (get.itemtype(from)=='player'&&from.side!=game.me.side)){
					from.send(function(){
						var name=game.me.name;
						if(ui.fakeme&&ui.fakeme.current!=name){
							ui.fakeme.current=name;
							if(ui.versushighlight&&ui.versushighlight!=game.me){
								ui.versushighlight.classList.remove('current_action');
							}
							ui.versushighlight=game.me;
							game.me.classList.add('current_action');

							ui.fakeme.style.backgroundImage=game.me.node.avatar.style.backgroundImage;
						}
					});
				}else{
					//game.addVideo('onSwapControl');
					var name=game.me.name;
					if(ui.fakeme&&ui.fakeme.current!=name){
						ui.fakeme.current=name;
						if(ui.versushighlight&&ui.versushighlight!=game.me){
							ui.versushighlight.classList.remove('current_action');
						}
						ui.versushighlight=game.me;
						game.me.classList.add('current_action');
	
						ui.fakeme.style.backgroundImage=game.me.node.avatar.style.backgroundImage;
					}
				}
			},
			getActivePlayersBySide:function(){
				var player1={},player2={};
				var red=game.filterPlayer(function(current){return current.side==true&&((current==game.me&&!_status.auto)||current.isOnline())});
				if(red.length>0) player1=red[0];
				var blue=game.filterPlayer(function(current){return current.side==false&&((current==game.me&&!_status.auto)||current.isOnline())});
				if(blue.length>0) player2=blue[0];
				return [player1,player2];//red blue
			},
			chooseCharacter:function(){
				var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					ui.arena.classList.add('choose-character');
					var number=game.players.length;
					var choose_number=get.config('choose_number');
					if(!_status.boss) _status.boss=game.players.randomGet();
					var ref=_status.boss;
					_status.firstAct=ref;
					var list=[true,false,false,false];
					
					for(var i=0;i<number;i++){
						ref.side=list[i];
						ref=ref.next;
					}
					for(var i=0;i<number;i++){
						ref.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						ref=ref.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					event.bossList=game.bossList;

					var list=get.characters();
					list=get.characterGets(list);
					event.list=list;

					var basestr='选择角色';
					if(_status.firstAct==game.me){
						var basenum=1;
						_status.characterChoice=event.bossList;
					}else{
						if(get.config('phaseswap')){
							var basenum=3;
							basestr='选择你和队友的角色<br>按顺位选择';
							event.phaseswap=true;
						}else{
							var basenum=1;
						}
						if(!_status.characterList) _status.characterList=event.list.randomGets(choose_number);
						_status.characterChoice=_status.characterList;
					}

					var addSetting=function(dialog){
						dialog.add('选择座位').classList.add('add-setting');
						var seats=document.createElement('table');
						seats.classList.add('add-setting');
						seats.style.margin='0';
						seats.style.width='100%';
						seats.style.position='relative';
						for(var i=1;i<=game.players.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML=get.cnNumber(i,true);
							td.link=i-1;
							seats.appendChild(td);
							if(get.distance(_status.firstAct,game.me,'absolute')===i-1){
								td.classList.add('bluebg');
							}
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;

								if(get.distance(_status.firstAct,game.me,'absolute')==this.link) return;
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');

								//更新起始玩家
								var firstChoose=game.me;
								for(var i=0;i<this.link;i++){
									firstChoose=firstChoose.previous;
								}
								_status.firstAct=firstChoose;
								_status.boss=firstChoose;
								
	
								//切换顺位后更换角色列表，避免选择界面闪烁
								_status.event.parent.swapnodialog = function (dialog, list,str) {
									var buttons = ui.create.div(".buttons");
									var node = dialog.buttons[0].parentNode;
									dialog.setCaption(str);
									dialog.buttons = ui.create.buttons(list, "characterx", buttons);
									dialog.content.insertBefore(buttons, node);
									buttons.addTempClass("start");
									node.remove();
									game.uncheck();
									game.check();
									//自己位置高亮
									for (var i = 0; i < seats.childElementCount; i++) {
										if (get.distance(_status.boss, game.me, "absolute") === seats.childNodes[i].link) {
											seats.childNodes[i].classList.add("bluebg");
										}
									}
								};

								//更新界面用
								_status.event = _status.event.parent;
								_status.event.step = 0;
								
								seats.previousSibling.style.display = "none";
								seats.style.display = "none";

								game.resume();
							});
						}
						dialog.content.appendChild(seats);

						dialog.add(ui.create.div('.placeholder.add-setting'));
						dialog.add(ui.create.div('.placeholder.add-setting'));
						if(get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
					};
					var removeSetting=function(){
						var dialog=_status.event.dialog;
						if(dialog){
							dialog.style.height='';
							delete dialog._scrollset;
							var list=Array.from(dialog.querySelectorAll('.add-setting'));
							while(list.length){
								list.shift().remove();
							}
							ui.update();
						}
					};
					event.addSetting=addSetting;
					event.removeSetting=removeSetting;

					if (event.swapnodialog) {
						var dialog = ui.dialog;
						event.swapnodialog(dialog, _status.characterChoice, basestr);
						delete event.swapnodialog;
					} else {
						var dialog=ui.create.dialog(basestr,[_status.characterChoice,"characterx"]);
					}

					game.me.chooseButton(true,dialog,basenum).set('onfree',true);

					if(get.config('change_identity')){
						addSetting(dialog);
					}
					ui.create.cheat=function(){
						_status.createControl=ui.cheat2;
						ui.cheat=ui.create.control('更换',function(){
							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
								return;
							}
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list.randomGets(choose_number),'characterx',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.addTempClass('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					};
					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选角',function(){
							if(this.dialog==_status.event.dialog){
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.addTempClass('controlpressdownx',500);
									ui.cheat.classList.remove('disabled');
								}
							}
							else{
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.getParent().dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.classList.add('disabled');
								}
							}
						});
						//ui.cheat2.classList.add('disabled');
					}
		
					event.dialogxx=ui.create.characterDialog('heightset');
					
					if(!ui.cheat&&get.config('change_choice')&&_status.boss!=game.me){
						ui.create.cheat();
					}else if(ui.cheat&&_status.boss==game.me){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(!ui.cheat2&&get.config('free_choose')&&_status.boss!=game.me){
						ui.create.cheat2();
					}else if(ui.cheat2&&_status.boss==game.me){
						ui.cheat2.close();
						delete ui.cheat2;
					}
					'step 1'
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(ui.cheat2){
						ui.cheat2.close();
						delete ui.cheat2;
					}

					if(_status.boss==game.me){
						game.me.init(result.links[0]);
						//其他玩家随机角色
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side==false){
								game.players[i].init(event.list.randomRemove());
							}
						}
					}else{
						_status.boss.init(event.bossList.randomGet());
						if(event.phaseswap){
							let ref=_status.boss.next;
							for(var i=0;i<game.players.length;i++){
								ref.init(result.links[i]);
								ref=ref.next;
							}
						}else{
							game.me.init(result.links[0]);
							event.list.remove(result.links[0]);
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].side==false){
									if(game.players[i]!=game.me) game.players[i].init(event.list.randomRemove());
								}
							}
						}
					}
					'step 2'
					if(_status.boss==game.me||event.phaseswap){
						//调整布局
						ui.arena.setNumber(game.players.length+1);
						for (var i = 0; i < game.players.length; i++) {
							game.players[i].dataset.position = parseInt(game.players[i].dataset.position) + 1;
						}
						game.singleHandcard = true;
						ui.arena.classList.add("single-handcard");
						ui.window.classList.add("single-handcard");
						ui.fakeme = ui.create.div(".fakeme.avatar");
						ui.me.appendChild(ui.fakeme);
						game.onSwapControl();

						//显示手牌
						game.broadcastAll(function(func){
							if (lib.config.show_handcardbutton) {
								ui.versushs = ui.create.system("手牌", null, true);
								lib.setPopped(ui.versushs, func, 220);
							}
						},game.versusHoverHandcards);

						//增加切换控制权的技能
						game.addGlobalSkill('autoswap');
					}
					//清除选角时的布局
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
					
					var viewHandcard=get.config('viewHandcard');
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}

				});
			},
			chooseCharacterOL:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					var ref=game.me;
					_status.firstAct=ref;
					_status.boss=ref;
					var firstChoose=ref;
					_status.firstAct=firstChoose;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==ref){
							game.players[i].side=true;
						}else game.players[i].side=false;
					}
					
					for(var i=0;i<game.players.length;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					var map={};
					for(var i=0;i<game.players.length;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML];
					}

					var func=function(map,number){
						var ref;
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
								if(player.side==true) ref=player;
							}
						}

						if(lib.configOL.phaseswap||game.me.side==true){
							for (var i = 0; i < game.players.length; i++) {
								ref.dataset.position = i + 1;
								ref=ref.next;
							}

							ui.arena.setNumber(number+1);	
							game.singleHandcard = true;
							ui.arena.classList.add("single-handcard");
							ui.window.classList.add("single-handcard");
							ui.fakeme = ui.create.div(".fakeme.avatar");
							ui.me.appendChild(ui.fakeme);
						}

						ui.arena.classList.add('choose-character');
					}
					game.broadcastAll(func,map,game.players.length);

					'step 1'
					event.bossList=game.bossList;
					var choose_number=parseInt(lib.configOL.choose_number);
					var list=get.charactersOL();
					list=get.characterGets(list);
					event.list=list;

					var players=game.players.filter(player=>player.isOnline()||player==game.me);
					var chooseList=players.map(function(player){
						let buttonList=[];
						buttonList.push(player);
						let configList=[];
						if(player.side==true) configList.push('选择对应的BOSS');
						else{
							if(get.phaseswap()){
								configList.push('请按顺位选择角色');
							}else configList.push('请选择角色');
						}
						if(player.side==true){
							configList.push([event.bossList,'characterx']);
						}else{
							configList.push([event.list.randomRemove(choose_number),'characterx']);
						}

						buttonList.push(configList);
						if(player.side==true) buttonList.push(1);
						else{
							if(get.phaseswap()) buttonList.push(3);
							else buttonList.push(1);
						}
						buttonList.push(true);
						return buttonList;
					});

					game.me.chooseButtonOL(chooseList,function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						var player=_status.event.player;
						if(player.side==true) var result=buttons.randomGets(1);
						else{
							if(get.phaseswap()) var result=buttons.randomGets(3);
							else var result=buttons.randomGets(1);
						}
						var links=[];
						for(var i=0;i<result.length;i++){
							if(result[i].link) links.push(result[i].link);
						}
						return {
							bool:true,
							links:links,
						}
					});
					'step 2'
					var chooseList={};
					for(var i in result){
						if(get.phaseswap()){
							if(lib.playerOL[i].side==false){
								chooseList.blue=result[i].links;
							}else chooseList.red=result[i].links;
						}else chooseList[lib.playerOL[i].playerid]=result[i].links;

						if(lib.playerOL[i]==game.me) _status.characterList=result[i].links;
					}
					var list=[];
					var ref=_status.firstAct;
					for(var i =0;i<game.players.length;i++){
						if(get.phaseswap()){
							if(ref.side==true){
								if(chooseList.red.length) list.push(chooseList.red.shift());
								else list.push(event.list.randomRemove());
							}else{
								if(chooseList.blue.length) list.push(chooseList.blue.shift());
								else list.push(event.list.randomRemove());
							}
						}else{
							if(chooseList[ref.playerid]&&chooseList[ref.playerid].length) list.push(chooseList[ref.playerid].shift());
							else list.push(event.list.randomRemove());
						}
						
						ref=ref.next;
					}
					game.broadcastAll(function(list,ref){
						for(var i=0;i<list.length;i++){
							if(!ref.name1){
								ref.init(list[i]);
								ref.update();
							}
							ref=ref.next;
						}
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500)
					},list,ref);

					game.addGlobalSkill('autoswap');
					for(var player of game.players){
						if(player==game.me || (player.isOnline2()&&get.phaseswap())){
							game.onSwapControl(player);
						}
					}
				});
			},
		},
		player:{

		},
		translate:{
			easy:'简单',
			normal:'标准',
			hard:'困难',
		},
		get:{
			rawAttitude:function(from,to){
				if(from.side==to.side){
					return 6;
				}
				else{
					return -6;
				}
			},
			phaseswap(){
				if(_status.event.player&&_status.event.player.side==true&&_status.event.player.side==game.me.side){
					return true;
				}
				return (!_status.connectMode&&get.config('phaseswap'))||(_status.connectMode&&lib.configOL.phaseswap);
			}
		},
		skill:{
			autoswap: {
				trigger: {
					player: ["chooseToUseBegin", "chooseToRespondBegin", "chooseToDiscardBegin", "chooseToCompareBegin", "chooseButtonBegin", "chooseCardBegin", "chooseTargetBegin", "chooseCardTargetBegin", "chooseControlBegin", "chooseBoolBegin", "choosePlayerCardBegin", "discardPlayerCardBegin", "gainPlayerCardBegin", "chooseToMoveBegin", "chooseToPlayBeatmapBegin", "chooseToGiveBegin"],
				},
				firstDo: true,
				direct: true,
				priority: 100,
				filter: function (event, player) {
					if (event.autochoose && event.autochoose()) return false;
					return true;
				},
				content: function () {
					game.swapPlayerAuto(player);
				},
			},
		},
    }
};