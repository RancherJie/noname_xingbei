'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'xingbei',
		start:function(){
			"step 0"
			_status.mode=get.config('versus_mode');
			if(_status.connectMode) _status.mode=lib.configOL.versus_mode;
			if(_status.brawl&&_status.brawl.submode){
				_status.mode=_status.brawl.submode;
			}
			if(lib.config.test_game){
				_status.mode='standard';
			}
			"step 1"
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
				game.waitForPlayer(function(){//联机人数确定
					switch(lib.configOL.versus_mode){
						//case '1v1':lib.configOL.number=2;break;
						case '2v2':lib.configOL.number=4;break;
						case '3v3':lib.configOL.number=6;break;
						//case '3v3':lib.configOL.number=6;break;
						//case '4v4':case 'guandu':lib.configOL.number=8;break;
					}
				});
			}
			else if(_status.mode=='two'){
				game.prepareArena(4);
			}else if(_status.mode=='three'){
				game.prepareArena(6);
			}
			// game.delay();
			"step 2"
			if(!_status.connectMode&&_status.brawl&&_status.brawl.chooseCharacterBefore){
				_status.brawl.chooseCharacterBefore();
			}
			if(_status.connectMode){
				game.randomMapOL();
			}
			else if(_status.mode=='two'||_status.mode=='three'){
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				game.chooseCharacterXingBei();
			}
			"step 3"
			if(_status.connectMode) _status.mode=lib.configOL.versus_mode;
			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:players[i].name1,
					name2:players[i].name2,
					identity:players[i].node.identity.firstChild.innerHTML,
					color:players[i].node.identity.dataset.color
				});
			}
			_status.videoInited=true;
			if(_status.connectMode||_status.mode=='two'||_status.mode=='three'){
				info.push(false);
			}
			else{
				info.push(lib.storage.single_control&&game.players.length>=4);
			}
			game.addVideo('init',null,info);
			event.trigger('gameStart');
			if(_status.connectMode){
				if(_status.mode=='1v1'){
					_status.first_less=true;
					game.gameDraw(_status.firstChoose.next);
					game.phaseLoop(_status.firstChoose.next);
				}
				else if(_status.mode=='2v2'||_status.mode=='3v3'){
					_status.first_less=true;
					var firstChoose=(_status.firstAct||game.players.randomGet());
					if(firstChoose.next.side==firstChoose.side){
						firstChoose=firstChoose.next;
					}
					game.gameDraw(firstChoose,function(player){
						/*
						if(lib.configOL.replace_handcard&&player==firstChoose.previousSeat){
							return 5;
						}*/
						return 4;
					});
					game.phaseLoop(firstChoose);
				}
				else if(_status.mode=='guandu'){
					game.gameDraw(_status.firstAct);
					game.phaseLoop(_status.firstAct);
				}
				else if(_status.mode=='4v4'){
					game.gameDraw(_status.firstAct,function(player){
						if(player==_status.firstAct.previousSeat){
							return 5;
						}
						return 4;
					});
					game.replaceHandcards(_status.firstAct.previous,_status.firstAct.previous.previous);
					game.phaseLoop(_status.firstAct);
				}
				event.finish();
			}
			else{
				if(_status.mode=='guandu'){
					game.gameDraw(_status.firstAct,4);
					game.phaseLoop(_status.firstAct);
				}
				else if(_status.mode=='two'||_status.mode=='three'){
					_status.first_less=true;
					_status.first_less_forced=true;
					var firstChoose=_status.firstAct;
					game.gameDraw(firstChoose,function(player){
						/*
						if(player==_status.firstAct.previousSeat&&get.config('replace_handcard_two')){
							return 5;
						}*/
						return 4;
					});
					game.phaseLoop(firstChoose);
				}
				
				if(_status.mode!='four'){
					event.finish();
				}
			}
			"step 4"
			if(event.replaceCard&&result.bool){
				var hs=game.me.getCards('h');
				for(var i=0;i<hs.length;i++){
					hs[i].discard(false);
				}
				game.me.directgain(get.cards(hs.length));
			}
			if(_status.ladder){
				lib.storage.ladder.current-=40;
				_status.ladder_tmp=true;
				game.save('ladder',lib.storage.ladder);
				game.addGlobalSkill('versus_ladder');
			}
			game.phaseLoop(_status.firstAct);
		},
		game:{
			getLadderName:function(score){
			},

			checkResult:function(me){
				if(game.players[0].side==true){
					if(game.hongShiQi<=0||game.lanXingBei>=5){
						game.over(false);
					}else if(game.lanShiQi<=0||game.hongXingBei>=5){
						game.over(true);
					}

				}
				else if(game.players[0].side==false){
					if(game.lanShiQi<=0||game.hongXingBei==5){
						game.over(false);
					}else if(game.hongShiQi<=0||game.lanXingBei==5){
						game.over(true);
					}
				}
			},

			checkOnlineResult:function(player){
				if(_status.mode=='4v4'||_status.mode=='guandu'){
					var zhu=game.findPlayer(function(current){
						return current.identity=='zhu';
					});
					return player.side==zhu.side;
				}
				return game.players[0].side==player.side;
			},
			getRoomInfo:function(uiintro){
				if(lib.configOL.versus_mode=='1v1'){
					uiintro.add('<div class="text chat">侯选人数：'+lib.configOL.choice_num+'人');
					uiintro.add('<div class="text chat">替补人数：'+lib.configOL.replace_number+'人');
				}
				else if(lib.configOL.versus_mode=='2v2'||lib.configOL.versus_mode=='3v3'){
					uiintro.add('<div class="text chat">四号位换牌：'+(lib.configOL.replace_handcard?'开启':'关闭'));
				}
				var last=uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				// uiintro.add('<div class="text chat">屏蔽弱将：'+(lib.configOL.ban_weak?'开启':'关闭'));
				// var last=uiintro.add('<div class="text chat">屏蔽强将：'+(lib.configOL.ban_strong?'开启':'关闭'));
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用角色：'+get.translation(lib.configOL.banned));
				}
				if(lib.configOL.bannedcards.length){
					last=uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}
				last.style.paddingBottom='8px';
			},
			getVideoName:function(){
				var str=get.translation(game.me.name1);
				if(game.me.name2){
					str+='/'+get.translation(game.me.name2);
				}
				var str2;
				if(game.versusVideoName) str2=game.versusVideoName;
				else{
 				switch(_status.mode){
 					case 'two':str2='2v2';break;
 					//case 'endless':str2='无尽模式';break;
 					case 'three':str2='3v3';break;
 					//case 'siguo':str2='同舟共济';break;
 					//case 'jiange':str2='守卫剑阁';break;
 					//case 'four':str2='对决 - 4v4';break;
 					//case 'guandu':str2='官渡之战';break;
 					//default:str2='对决 - '+lib.storage.number+'v'+lib.storage.number
 				}
				}
				return [str,str2];
			},
			addRecord:function(bool){
				if(typeof bool=='boolean'){
					var data=lib.config.gameRecord.xingbei.data;
					var identity=get.cnNumber(lib.storage.number)+'人';
					if(!data[identity]){
						data[identity]=[0,0];
					}
					if(bool){
						data[identity][0]++;
					}
					else{
						data[identity][1]++;
					}
					var list=['一人','两人','三人'];
					var str='';
					for(var i=0;i<list.length;i++){
						if(data[list[i]]){
							str+=list[i]+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
						}
					}
					lib.config.gameRecord.xingbei.str=str;
					game.saveConfig('gameRecord',lib.config.gameRecord);
				}
			},
			
			chooseCharacterXingBei:function(){
				var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					var number=game.players.length;
					var choose_number=get.config('choose_number');
					var team_sequence=get.config('team_sequence');
					ui.arena.classList.add('choose-character');
					for(var i in lib.skill){
						if(lib.skill[i].changeSeat){
							lib.skill[i]={};
							if(lib.translate[i+'_info']){
								lib.translate[i+'_info']='此模式下不可用';
							}
						}
					}
					var ref=game.players.randomGet();
					var bool=true;
					var bool2=false;
					if(number==4){
						if(team_sequence=='near'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.previous.side=bool;
						}else if(team_sequence=='crossed'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool;
							ref.previous.side=bool2;
						}else if(team_sequence=='random'){
							var sideList=[true,true,false,false];
							sideList.randomSort();
							for(var i=0;i<number;i++){
								game.players[i].side=sideList[i];
							}
							while(ref.side!=true){
								ref=game.players.randomGet();
							}
						}
					}else{
						if(team_sequence=='crossed'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
							ref.next.next.next.next.side=bool;
							ref.next.next.next.next.next.side=bool2;
						}else if(team_sequence=='near'){
							ref.side=bool;
							ref.next.side=bool;
							ref.next.next.side=bool;
							ref.next.next.next.side=bool2;
							ref.next.next.next.next.side=bool2;
							ref.next.next.next.next.next.side=bool2;
						}else if(team_sequence=='random'){
							var sideList=[true,true,false,false,true,false];
							sideList.randomSort();
							for(var i=0;i<number;i++){
								game.players[i].side=sideList[i];
							}
							while(ref.side!=true){
								ref=game.players.randomGet();
							}
						}
					}	
					
					var firstChoose=ref;
					_status.firstAct=firstChoose;
					for(var i=0;i<number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else{
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}
					//22选将框分配
					var list=[];
					var list4=[];
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							list.push(i);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(!list4.contains(i)&&!lib.filter.characterDisabled(i)){
							list.push(i);
							list4.push(i);
						}
					}
					var choose=[];
					event.list=list;
					_status.characterlist=list4;
					

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
								_status.firstAct=game.me;
								var sideList=[]
								for(var i=0;i<game.players.length;i++){
									sideList.push(game.players[i].side);
								}
								for(var i=0;i<this.link;i++){
									_status.firstAct=_status.firstAct.previous;
								}
								var firstChoose=_status.firstAct;
								var start=firstChoose;
								for(var i=0;i<game.players.length;i++){
									start.side=sideList.shift();
									start=start.next;
								}
								
								/*
								var firstChoose=_status.firstAct;
								firstChoose.next.side=!firstChoose.side;
								firstChoose.next.next.side=!firstChoose.side;
								firstChoose.previous.side=firstChoose.side;
								*/
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].side==true){
										game.players[i].node.identity.firstChild.innerHTML='红';
									}
									else{
										game.players[i].node.identity.firstChild.innerHTML='蓝';
									}
									game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
								}
								for(var i=0;i<number;i++){
									firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
									firstChoose=firstChoose.next;
								}
							});
						}
						dialog.content.appendChild(seats);
						if(game.me==game.zhu){
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}

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

					var characterChoice;
					if(_status.brawl&&_status.brawl.chooseCharacter){
						characterChoice=_status.brawl.chooseCharacter(list,game.me);
					}
					else{
						characterChoice=list.randomGets(choose_number);
					}
					var basenum=1;
					var basestr='选择角色';
					var dialog=ui.create.dialog(basestr,[characterChoice,'characterx']);
					game.me.chooseButton(true,dialog,basenum).set('onfree',true);
					if(!_status.brawl||!_status.brawl.noAddSetting){
						if(get.config('change_identity')){
							addSetting(dialog);
						}
					}

					ui.create.cheat=function(){
						_status.createControl=ui.cheat2;
						ui.cheat=ui.create.control('更换',function(){
							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
								return;
							}
							if(game.changeCoin){
								game.changeCoin(-3);
							}
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list.randomGets(choose_number),'characterx',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					};
					if(lib.onfree){
						lib.onfree.push(function(){
							event.dialogxx=ui.create.characterDialog('heightset');
							if(ui.cheat2){
								ui.cheat2.animate('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					}
					else{
						event.dialogxx=ui.create.characterDialog('heightset');
					}
					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								if(game.changeCoin){
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.animate('controlpressdownx',500);
									ui.cheat.classList.remove('disabled');
								}
							}
							else{
								if(game.changeCoin){
									game.changeCoin(-10);
								}
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.parent.dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.classList.add('disabled');
								}
							}
						});
						ui.cheat2.classList.add('disabled');
					}
					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
						if(!ui.cheat&&get.config('change_choice')){
							ui.create.cheat();
						}
						if(!ui.cheat2&&get.config('free_choose')){
							ui.create.cheat2();
						}
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
					for(var i=0;i<result.links.length;i++){
						game.addRecentCharacter(result.links[i]);
					}
					game.me.init(result.links[0]);
					if(_status.replacetwo){
						game.me.replacetwo=result.links[1];
					}
					event.list.remove(game.me.name1);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							if(_status.brawl&&_status.brawl.chooseCharacter){
								var list=_status.brawl.chooseCharacter(event.list,game.players[i]);
								game.players[i].init(list.randomGet());
								event.list.remove(game.players[i].name1);
								if(_status.replacetwo){
									game.players[i].replacetwo=list.randomGet(game.players[i].name1);
									event.list.remove(game.players[i].replacetwo);
								}
							}
							else{
								if(event.two_assign&&game.players[i].side==game.me.side){
									if(_status.replacetwo){
										game.players[i].init(result.links[2]);
										game.players[i].replacetwo=result.links[3];
									}
									else{
										game.players[i].init(result.links[1]);
									}
								}
								else{
									var name=event.list.randomRemove();
									if(lib.characterReplace[name]&&lib.characterReplace[name].length) name=lib.characterReplace[name].randomGet();
									game.players[i].init(name);
									if(_status.replacetwo){
										var name2=event.list.randomRemove();
										if(lib.characterReplace[name2]&&lib.characterReplace[name2].length) name2=lib.characterReplace[name2].randomGet();
										game.players[i].replacetwo=name2;
									}
								}
							}
						}
					}
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].replacetwo);
					}
					'step 3'
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}


					if(get.is.phoneLayout()){
						ui.shiQiInfo=ui.create.div('.touchinfo.left',ui.window);
					}
					else{
						ui.shiQiInfo=ui.create.div(ui.gameinfo);
					}
					ui.shiQiInfo.innerHTML='士气'+'<span style="color:red;">'+game.hongShiQi+'</span>'+'/'+'<span style="color:blue;">'+game.lanShiQi+'</span>'+'|战绩'+'<span style="color:red;">'+game.hongZhanJi+'</span>'+'/'+'<span style="color:blue;">'+game.lanZhanJi+'</span>'+'|星杯'+'<span style="color:red;">'+game.hongXingBei+'</span>'+'/'+'<span style="color:blue;">'+game.lanXingBei+'</span>';


					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					//game.addGlobalSkill('versus_viewHandcard');
					


					

					if(get.config('two_phaseswap')){
						game.addGlobalSkill('autoswap');
						if(lib.config.show_handcardbutton){
							ui.versushs=ui.create.system('手牌',null,true);
							lib.setPopped(ui.versushs,game.versusHoverHandcards,220);
						}
					}
					event.trigger('enterGame');
				});
			},

			chooseCharacterThree:function(){
				var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					var number=game.players.length;
					var choose_number=3;
					ui.arena.classList.add('choose-character');
					for(var i in lib.skill){
						if(lib.skill[i].changeSeat){
							lib.skill[i]={};
							if(lib.translate[i+'_info']){
								lib.translate[i+'_info']='此模式下不可用';
							}
						}
					}
					//var bool=Math.random()<0.5;
					//var bool2=Math.random()<0.5;
					//var ref=game.players[0];
					var ref=game.players.randomGet();
					var bool=true;
					var bool2=false;
					
					ref.side=bool;
					ref.next.side=bool2;
					ref.next.next.side=bool2;
					ref.next.next.side=bool;
					ref.next.next.next.side=bool;
					ref.next.next.next.next.side=bool2;
					

					var firstChoose=ref;
					//var firstChoose=game.players[0];
					_status.firstAct=firstChoose;
					for(var i=0;i<number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else{
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}
					//22选将框分配
					var list=[];
					var list4=[];
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							list.push(i);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(!list4.contains(i)&&!lib.filter.characterDisabled(i)){
							list.push(i);
							list4.push(i);
						}
					}
					var choose=[];
					event.list=list;
					_status.characterlist=list4;
					

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
								_status.firstAct=game.me;
								for(var i=0;i<this.link;i++){
									_status.firstAct=_status.firstAct.previous;
								}
								var firstChoose=_status.firstAct;
								firstChoose.next.side=!firstChoose.side;
								firstChoose.next.next.side=!firstChoose.side;
								firstChoose.previous.side=firstChoose.side;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].side==true){
										game.players[i].node.identity.firstChild.innerHTML='红';
									}
									else{
										game.players[i].node.identity.firstChild.innerHTML='蓝';
									}
									game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
								}
								for(var i=0;i<number;i++){
									firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
									firstChoose=firstChoose.next;
								}
							});
						}
						dialog.content.appendChild(seats);
						if(game.me==game.zhu){
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}

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

					var characterChoice;
					if(_status.brawl&&_status.brawl.chooseCharacter){
						characterChoice=_status.brawl.chooseCharacter(list,game.me);
					}
					else{
						characterChoice=list.randomGets(choose_number);
					}
					var basenum=1;
					var basestr='选择角色';
					var dialog=ui.create.dialog(basestr,[characterChoice,'characterx']);
					game.me.chooseButton(true,dialog,basenum).set('onfree',true);
					if(!_status.brawl||!_status.brawl.noAddSetting){
						if(get.config('change_identity')){
							addSetting(dialog);
						}
					}

					ui.create.cheat=function(){
						_status.createControl=ui.cheat2;
						ui.cheat=ui.create.control('更换',function(){
							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
								return;
							}
							if(game.changeCoin){
								game.changeCoin(-3);
							}
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list.randomGets(choose_number),'characterx',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					};
					if(lib.onfree){
						lib.onfree.push(function(){
							event.dialogxx=ui.create.characterDialog('heightset');
							if(ui.cheat2){
								ui.cheat2.animate('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					}
					else{
						event.dialogxx=ui.create.characterDialog('heightset');
					}
					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								if(game.changeCoin){
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.animate('controlpressdownx',500);
									ui.cheat.classList.remove('disabled');
								}
							}
							else{
								if(game.changeCoin){
									game.changeCoin(-10);
								}
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.parent.dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.classList.add('disabled');
								}
							}
						});
						ui.cheat2.classList.add('disabled');
					}
					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
						if(!ui.cheat&&get.config('change_choice')){
							ui.create.cheat();
						}
						if(!ui.cheat2&&get.config('free_choose')){
							ui.create.cheat2();
						}
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
					for(var i=0;i<result.links.length;i++){
						game.addRecentCharacter(result.links[i]);
					}
					game.me.init(result.links[0]);
					if(_status.replacetwo){
						game.me.replacetwo=result.links[1];
					}
					event.list.remove(game.me.name1);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							if(_status.brawl&&_status.brawl.chooseCharacter){
								var list=_status.brawl.chooseCharacter(event.list,game.players[i]);
								game.players[i].init(list.randomGet());
								event.list.remove(game.players[i].name1);
								if(_status.replacetwo){
									game.players[i].replacetwo=list.randomGet(game.players[i].name1);
									event.list.remove(game.players[i].replacetwo);
								}
							}
							else{
								if(event.two_assign&&game.players[i].side==game.me.side){
									if(_status.replacetwo){
										game.players[i].init(result.links[2]);
										game.players[i].replacetwo=result.links[3];
									}
									else{
										game.players[i].init(result.links[1]);
									}
								}
								else{
									var name=event.list.randomRemove();
									if(lib.characterReplace[name]&&lib.characterReplace[name].length) name=lib.characterReplace[name].randomGet();
									game.players[i].init(name);
									if(_status.replacetwo){
										var name2=event.list.randomRemove();
										if(lib.characterReplace[name2]&&lib.characterReplace[name2].length) name2=lib.characterReplace[name2].randomGet();
										game.players[i].replacetwo=name2;
									}
								}
							}
						}
					}
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].replacetwo);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					//game.addGlobalSkill('versus_viewHandcard');
					game.addGlobalSkill('xuRuo');
					game.addGlobalSkill('zhongDu');
					game.addGlobalSkill('yingZhan');
					if(get.config('two_phaseswap')){
						game.addGlobalSkill('autoswap');
						if(lib.config.show_handcardbutton){
							ui.versushs=ui.create.system('手牌',null,true);
							lib.setPopped(ui.versushs,game.versusHoverHandcards,220);
						}
					}
				});
			},
		
			
			chooseCharacter:function(){
				var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					"step 0"
					if(lib.config.continue_name_versus){
						_status.friend=lib.config.continue_name_versus.friend;
						_status.enemy=lib.config.continue_name_versus.enemy;
						_status.color=lib.config.continue_name_versus.color;
						game.additionaldead=[];
						event.goto(1);
						game.saveConfig('continue_name_versus');
						lib.init.onfree();
						return;
					}
					event.check=function(){
						this.dialog.classList.add('fullwidth');
						this.dialog.classList.add('fullheight');
						this.dialog.classList.add('noslide');
						for(var i=0;i<this.dialog.buttons.length;i++) this.dialog.buttons[i].style.opacity=1;
						this.dialog.add('选项');
						this.dialog.versus_zhu=this.dialog.add(ui.create.switcher('versus_zhu',lib.storage.zhu)).querySelector('.toggle');
						// this.dialog.versus_only_zhu=this.dialog.add(ui.create.switcher('versus_only_zhu',lib.storage.only_zhu)).querySelector('.toggle');
						this.dialog.versus_main_zhu=this.dialog.add(ui.create.switcher('versus_main_zhu',lib.storage.main_zhu)).querySelector('.toggle');
						if(lib.storage.zhu){
							// this.dialog.versus_only_zhu.parentNode.classList.remove('disabled');
							this.dialog.versus_main_zhu.parentNode.classList.remove('disabled');
						}
						else{
							// this.dialog.versus_only_zhu.parentNode.classList.add('disabled');
							this.dialog.versus_main_zhu.parentNode.classList.add('disabled');
						}
						// this.dialog.versus_cross_seat=this.dialog.add(ui.create.switcher('versus_cross_seat',lib.storage.cross_seat)).querySelector('.toggle');
						// this.dialog.versus_random_seat=this.dialog.add(ui.create.switcher('versus_random_seat',lib.storage.random_seat)).querySelector('.toggle');
						this.dialog.versus_noreplace_end=this.dialog.add(ui.create.switcher('versus_noreplace_end',lib.storage.noreplace_end)).querySelector('.toggle');
						this.dialog.versus_assign_enemy=this.dialog.add(ui.create.switcher('versus_assign_enemy',lib.storage.assign_enemy)).querySelector('.toggle');
						this.dialog.versus_single_control=this.dialog.add(ui.create.switcher('versus_single_control',lib.storage.single_control)).querySelector('.toggle');
						this.dialog.versus_first_less=this.dialog.add(ui.create.switcher('versus_first_less',get.config('first_less'))).querySelector('.toggle');
						this.dialog.versus_reward=this.dialog.add(ui.create.switcher('versus_reward',[0,1,2,3,4],lib.storage.versus_reward)).querySelector('.toggle');
						this.dialog.versus_punish=this.dialog.add(ui.create.switcher('versus_punish',['弃牌','无','摸牌'],lib.storage.versus_punish)).querySelector('.toggle');
						this.dialog.versus_seat_order=this.dialog.add(ui.create.switcher('seat_order',['对阵','交叉','随机'],lib.storage.seat_order)).querySelector('.toggle');
						this.dialog.versus_number=this.dialog.add(ui.create.switcher('versus_number',[1,2,3],lib.storage.number)).querySelector('.toggle');
						this.dialog.replace_number=this.dialog.add(ui.create.switcher('replace_number',[0,1,2,3,5,7,9,17],lib.storage.replace_number)).querySelector('.toggle');
						this.dialog.choice=this.dialog.add(ui.create.switcher('choice',[12,16,20,24,40,'∞'],lib.storage.choice)).querySelector('.toggle');

						// if(lib.storage.cross_seat){
						// 	this.dialog.versus_random_seat.parentNode.classList.add('disabled');
						// }
						// else{
						// 	this.dialog.versus_random_seat.parentNode.classList.remove('disabled');
						// 	if(lib.storage.random_seat){
						// 		this.dialog.versus_cross_seat.parentNode.classList.add('disabled');
						// 	}
						// 	else{
						// 		this.dialog.versus_cross_seat.parentNode.classList.remove('disabled');
						// 	}
						// }
					};
					event.confirm=function(){
						var dialog=event.dialog;
						var num=lib.storage.number+lib.storage.replace_number;
						_status.friend.splice(num);
						_status.enemy.splice(num);
						dialog.close();
						if(ui.confirm) ui.confirm.close();
						game.resume();
					};
					ui.control.style.transition='all 0s';
					if(get.is.phoneLayout()){
						ui.control.style.top='calc(100% - 80px)';
					}
					else if(game.layout=='newlayout'){
						ui.control.style.top='calc(100% - 30px)';
					}
					else{
						ui.control.style.top='calc(100% - 70px)';
					}
					_status.friend=[];
					_status.enemy=[];
					game.additionaldead=[];
					_status.color=Math.random()<0.5;
					var i,list=[];
					for(i in lib.character){
						// if(lib.config.forbidversus.contains(i)) continue;
						if(lib.filter.characterDisabled(i)) continue;
						list.push(i);
					}
					var groupSort=function(name){
						if(lib.character[name][1]=='wei') return 0;
						if(lib.character[name][1]=='shu') return 1;
						if(lib.character[name][1]=='wu') return 2;
						if(lib.character[name][1]=='qun') return 3;
					}
					var sortByGroup=function(a,b){
						var del=groupSort(a)-groupSort(b);
						if(del!=0) return del;
						if(a.indexOf('_')!=-1){
							a=a.slice(a.indexOf('_')+1);
						}
						if(b.indexOf('_')!=-1){
							b=b.slice(b.indexOf('_')+1);
						}
						return a>b?1:-1;
					}
					if(lib.storage.choice=='∞'){
						list.sort(sortByGroup);
					}
					else{
						list.randomSort();
					}
					_status.list=list;
					var choice=(lib.storage.choice=='∞')?list.length:lib.storage.choice;
					event.dialog=ui.create.dialog('选择角色',[list.slice(0,choice),'character']);
					event.dialog.classList.add('fixed');
					// for(var i=0;i<event.dialog.buttons.length;i++){
					// 	event.dialog.buttons[i].style.transform='scale(0.95)';
					// }
					event.check();
					ui.create.cheat=function(){
						_status.createControl=event.fill;
						ui.cheat=ui.create.control('更换',function(){
							if(_status.choosefinished){
								return;
							}
							if(lib.storage.choice=='∞'){
								list.sort(sortByGroup);
							}
							else{
								list.randomSort();
							}
							_status.friend.length=0;
							_status.enemy.length=0;
							var choice=(lib.storage.choice=='∞')?list.length:lib.storage.choice;

							ui.dialog.content.firstChild.innerHTML='选择角色';
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list.slice(0,choice),'character',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();

							// event.check();
						});
						delete _status.createControl;
					}
					if(!ui.cheat&&get.config('change_choice'))
					ui.create.cheat();
					if(lib.config.test_game){
						setTimeout(function(){
							event.switchToAuto();
						},500);
					}
					event.switchToAuto=function(){
						delete _status.choosefinished;
						event.fill.close();
						var buttons=_status.event.dialog.buttons.slice(0);
						buttons.randomSort();
						for(var i=0;i<buttons.length;i++){
							if(buttons[i].classList.contains('glow')||buttons[i].classList.contains('selectedx')){
								buttons.splice(i,1);i--;
							}
						}
						var dialog=_status.event.dialog;
						var max=dialog.versus_number.link+dialog.replace_number.link;
						for(var i=0;i<buttons.length;i++){
							if(_status.friend.length<max){
								_status.friend.push(buttons[i].link);
							}
							else if(_status.enemy.length<max){
								_status.enemy.push(buttons[i].link);
							}
							else{
								break;
							}
						}
						_status.friend.splice(max);
						_status.enemy.splice(max);
						dialog.close();
						if(ui.confirm) ui.confirm.close();
						game.resume();
					};
					event.fill=ui.create.control('补全',event.switchToAuto);
					event.custom.replace.button=function(button){
						if(_status.choose_enemy){
							if(button.classList.contains('glow')||button.classList.contains('selectedx')||_status.choosefinished) return;
							_status.choose_enemy=false;
							if(!_status.color){
								button.classList.add('selectedx');
								// button.style.transform='rotate(-3deg)';
							}
							else{
								button.classList.add('glow');
								// button.style.transform='rotate(-3deg)';
							}
							_status.enemy.push(button.link);
							var buttons=_status.event.dialog.buttons.slice(0);
							for(var i=0;i<buttons.length;i++){
								if(buttons[i].classList.contains('glow')||buttons[i].classList.contains('selectedx')){
									buttons.splice(i,1);i--;
								}
							}
						}
						else{
							if(button.classList.contains('glow')||button.classList.contains('selectedx')||_status.choosefinished) return;
							if(_status.color){
								button.classList.add('selectedx');
								// button.style.transform='rotate(-3deg)';
							}
							else{
								button.classList.add('glow');
								// button.style.transform='rotate(-3deg)';
							}
							_status.friend.push(button.link);
							var buttons=_status.event.dialog.buttons.slice(0);
							for(var i=0;i<buttons.length;i++){
								if(buttons[i].classList.contains('glow')||buttons[i].classList.contains('selectedx')){
									buttons.splice(i,1);i--;
								}
							}
							if(lib.storage.assign_enemy){
								_status.choose_enemy=true;
							}
							else{
								var button2=buttons[Math.floor(Math.random()*buttons.length)];
								if(_status.color){
									button2.classList.add('glow');
									// button2.style.transform='rotate(-3deg)';
								}
								else{
									button2.classList.add('selectedx');
									// button2.style.transform='rotate(-3deg)';
								}
								_status.enemy.push(button2.link);
								_status.event.dialog.content.firstChild.innerHTML='对方选择了'+get.translation(button2.link);
							}
						}
					};
					event.custom.add.window=function(){
						var dialog=_status.event.dialog;
						if(_status.friend.length==_status.enemy.length&&_status.friend.length>=dialog.versus_number.link+dialog.replace_number.link){
							event.fill.firstChild.innerHTML='开始';
							_status.choosefinished=true;
							if(ui.cheat){
								ui.cheat.close();
								delete ui.cheat;
							}
						}
						game.save('zhu',dialog.versus_zhu.link);
						if(lib.storage.zhu){
							// dialog.versus_only_zhu.parentNode.classList.remove('disabled');
							dialog.versus_main_zhu.parentNode.classList.remove('disabled');
						}
						else{
							// dialog.versus_only_zhu.parentNode.classList.add('disabled');
							dialog.versus_main_zhu.parentNode.classList.add('disabled');
						}
						// game.save('only_zhu',dialog.versus_only_zhu.link);
						game.save('main_zhu',dialog.versus_main_zhu.link);
						game.save('assign_enemy',dialog.versus_assign_enemy.link);
						game.save('seat_order',dialog.versus_seat_order.link);
						// game.save('cross_seat',dialog.versus_cross_seat.link);
						game.save('noreplace_end',dialog.versus_noreplace_end.link);
						game.save('single_control',dialog.versus_single_control.link);
						switch(lib.storage.seat_order){
							case '交叉':lib.storage.cross_seat=true;lib.storage.random_seat=false;break;
							case '随机':lib.storage.cross_seat=false;lib.storage.random_seat=true;break;
							default:lib.storage.cross_seat=false;lib.storage.random_seat=false;
						}
						game.saveConfig('first_less',dialog.versus_first_less.link,true);
						game.save('number',dialog.versus_number.link);
						game.save('versus_reward',dialog.versus_reward.link);
						game.save('versus_punish',dialog.versus_punish.link);
						game.save('replace_number',dialog.replace_number.link);
						game.save('choice',dialog.choice.link);
						var count,i;
						if(dialog.buttons.length>lib.storage.choice){
							count=dialog.buttons.length-lib.storage.choice;
							var removed=[];
							for(i=dialog.buttons.length-1;i>=0&&count>0;i--){
								if(dialog.buttons[i].classList.contains('target')==false&&
									dialog.buttons[i].classList.contains('glow')==false){
									dialog.buttons[i].remove();
									_status.list.remove(dialog.buttons[i].link);
									removed.push(dialog.buttons[i].link)
									dialog.buttons.splice(i,1);
									count--;
								}
							}
							for(i=0;i<removed.length;i++) _status.list.splice(lib.storage.choice,0,removed[i]);
						}
						else if(dialog.buttons.length<lib.storage.choice||lib.storage.choice=='∞'){
							var list=_status.list;
							var choice=(lib.storage.choice=='∞')?list.length:lib.storage.choice;
							var buttons=dialog.querySelector('.buttons');
							var button;
							for(i=dialog.buttons.length;i<choice;i++){
								button=ui.create.button(list[i],'character',buttons).animate('zoom')
								dialog.buttons.push(button);
								button.style.opacity=1;
							}
						}
					};
					game.pause();
					lib.init.onfree();
					"step 1"
					_status.friendBackup=_status.friend.slice(0);
					_status.enemyBackup=_status.enemy.slice(0);

					_status.friendDied=[];
					_status.enemyDied=[];
					_status.totalCount=_status.friend.length;
					_status.coinCoeff=get.coinCoeff(_status.friend);

					// ui.auto.show();
					ui.wuxie.show();
					ui.control.style.display='none';
					setTimeout(function(){
						ui.control.style.top='';
						ui.control.style.display='';
						ui.control.style.transition='';
					},500);
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					delete _status.list;
					var num=lib.storage.number;
					ui.create.players(num*2);
					for(var i=0;i<game.players.length;i++){
						game.players[i].getId();
						game.players[i].node.action.innerHTML='行动';
					}
					if(lib.storage.single_control&&game.players.length>=4){
						ui.arena.setNumber(parseInt(ui.arena.dataset.number)+1);
						for(var i=0;i<game.players.length;i++){
							game.players[i].dataset.position=parseInt(game.players[i].dataset.position)+1;
						}
						game.singleHandcard=true;
						ui.arena.classList.add('single-handcard');
						ui.window.classList.add('single-handcard');
						ui.fakeme=ui.create.div('.fakeme.avatar');
						// ui.fakeme.line=lib.element.player.line;
						// ui.fakemebg=ui.create.div('.avatar',ui.fakeme).hide();
					}
					_status.prepareArena=true;
					ui.create.me();
					if(ui.fakeme){
						ui.me.appendChild(ui.fakeme);
					}
					var position,i;
					if(lib.storage.zhu&&lib.storage.only_zhu) position=Math.ceil(num/2)-1;
					else position=Math.floor(Math.random()*num)
					game.friend=[];
					game.enemy=[];
					if(lib.storage.random_seat){
						var players=game.players.slice(0);
						game.friend.push(game.me);
						players.remove(game.me);
						for(i=0;i<num-1;i++){
							game.friend.push(players.randomRemove());
						}
						for(i=0;i<num;i++){
							game.enemy.push(players.randomRemove());
						}
					}
					else{
						for(var i in lib.skill){
							if(lib.skill[i].changeSeat){
								lib.skill[i]={};
								if(lib.translate[i+'_info']){
									lib.translate[i+'_info']='固定位置时不可用';
								}
							}
						}
						if(lib.storage.cross_seat){
							for(i=0;i<game.players.length;i++){
								if(i%2==0){
									game.friend.push(game.players[i]);
								}
								else{
									game.enemy.push(game.players[i]);
								}
							}
						}
						else{
							for(i=0;i<position;i++){
								game.friend.push(game.players[i-position+num*2]);
							}
							for(i=position;i<num;i++){
								game.friend.push(game.players[i-position]);
							}
							for(i=0;i<num;i++){
								game.enemy.push(game.players[num-position+i]);
							}
						}
					}
					if(((position==Math.ceil(num/2)-1&&lib.storage.zhu)||(lib.storage.zhu&&lib.storage.single_control))){
						var dialog=ui.create.dialog('按顺序选择出场角色',[_status.friend,'character']);
						game.me.chooseButton(dialog,num,true);
					}
					if(lib.storage.random_seat&&lib.storage.zhu){
						if(lib.storage.only_zhu){
							game.friendZhu=game.me;
						}
						else{
							game.friendZhu=game.friend.randomGet();
						}
						game.enemyZhu=game.enemy.randomGet();
					}
					for(i=0;i<num;i++){
						game.friend[i].side=_status.color;
						game.enemy[i].side=!_status.color;
						if(lib.storage.random_seat&&lib.storage.zhu){
							if(game.friendZhu==game.friend[i]){
								game.friend[i].identity='zhu';
								game.friend[i].setIdentity(_status.color+'Zhu');
							}
							else{
								game.friend[i].identity='zhong';
								game.friend[i].setIdentity(_status.color+'Zhong');
							}
							if(game.enemyZhu==game.enemy[i]){
								game.enemy[i].identity='zhu';
								game.enemy[i].setIdentity(!_status.color+'Zhu');
							}
							else{
								game.enemy[i].identity='zhong';
								game.enemy[i].setIdentity(!_status.color+'Zhong');
							}
						}
						else{
							if(game.me==game.friend[i]&&lib.storage.zhu){
								game.friend[i].identity='zhu';
								game.friend[i].setIdentity(_status.color+'Zhu');
								game.friendZhu=game.friend[i];
							}
							else{
								game.friend[i].identity='zhong';
								game.friend[i].setIdentity(_status.color+'Zhong');

							}
							if(lib.storage.zhu&&get.distance(game.enemy[i],game.me,'pure')==num){
								game.enemy[i].identity='zhu';
								game.enemy[i].setIdentity(!_status.color+'Zhu');
								game.enemyZhu=game.enemy[i];
							}
							else{
								game.enemy[i].identity='zhong';
								game.enemy[i].setIdentity(!_status.color+'Zhong');
							}
						}
						game.friend[i].node.identity.dataset.color=get.translation(_status.color+'Color');
						game.enemy[i].node.identity.dataset.color=get.translation(!_status.color+'Color');
						// game.friend[i].node.identity.style.backgroundColor=get.translation(_status.color+'Color');
						// game.enemy[i].node.identity.style.backgroundColor=get.translation(!_status.color+'Color');
					}
					if(lib.storage.zhu&&!game.enemyZhu){
						game.enemy[0].identity='zhu';
						game.enemy[0].setIdentity(!_status.color+'Zhu');
						game.enemyZhu=game.enemy[0];
					}
					"step 2"
					var num=lib.storage.number;
					if(result&&result.buttons){
						var list=[];
						for(i=0;i<result.buttons.length;i++){
							list.push(result.buttons[i].link);
							_status.friend.remove(result.buttons[i].link);
						}
						_status.friend=list.concat(_status.friend);
					}
					for(i=0;i<num;i++){
						game.friend[i].init(_status.friend[i]);
						game.enemy[i].init(_status.enemy[i]);

						game.friend[i].node.identity.dataset.color=get.translation(_status.color+'Color');
						game.enemy[i].node.identity.dataset.color=get.translation(!_status.color+'Color');
					}
					if(lib.storage.zhu&&lib.storage.main_zhu){
						game.friendZhu.maxHp++;
						game.friendZhu.hp++;
						game.friendZhu.update();

						game.enemyZhu.maxHp++;
						game.enemyZhu.hp++;
						game.enemyZhu.update();
					}
					_status.friend.splice(0,num);
					_status.enemy.splice(0,num);
					if(lib.storage.single_control&&game.players.length>=4){
						// ui.fakemebg.show();
						game.onSwapControl();
					}
				});
			},
			chooseCharacterOL:function(){
				switch(lib.configOL.versus_mode){
					//case '1v1':game.chooseCharacterOL1();break;
					case '2v2':game.chooseCharacterOLXingBei();break;
					case '3v3':game.chooseCharacterOLXingBei();break;
					//case '4v4':game.chooseCharacterOL4();break;
					//case 'guandu':game.chooseCharacterOLGuandu();break;
				}
			},
			
			chooseCharacterOLXingBei:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//var ref=game.players[0];
					var number=lib.configOL.number;
					var choose_number=parseInt(lib.configOL.choose_number);
					var team_sequence=lib.configOL.team_sequence;

					var ref=game.players.randomGet();
					var bool=true;
					var bool2=false;
					if(number==4){
						if(team_sequence=='near'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.previous.side=bool;
						}else if(team_sequence=='crossed'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool;
							ref.previous.side=bool2;
						}else if(team_sequence=='random'){
							var sideList=[true,true,false,false];
							sideList.randomSort();
							for(var i=0;i<number;i++){
								game.players[i].side=sideList[i];
							}
							while(ref.side!=true){
								ref=game.players.randomGet();
							}
						}
					}else{
						if(team_sequence=='crossed'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
							ref.next.next.next.next.side=bool;
							ref.next.next.next.next.next.side=bool2;
						}else if(team_sequence=='near'){
							ref.side=bool;
							ref.next.side=bool;
							ref.next.next.side=bool;
							ref.next.next.next.side=bool2;
							ref.next.next.next.next.side=bool2;
							ref.next.next.next.next.next.side=bool2;
						}else if(team_sequence=='random'){
							sideList.unshift(true);
							var sideList=[true,true,false,false,true,false];
							sideList.randomSort();
							for(var i=0;i<number;i++){
								game.players[i].side=sideList[i];
							}
							while(ref.side!=true){
								ref=game.players.randomGet();
							}
						}
					}

					var firstChoose=ref;

					_status.firstAct=firstChoose;
					for(var i=0;i<number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else{
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					
					var map={};
					for(var i=0;i<number;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML];
					}

					var func=function(map){
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
							}
						}
						ui.arena.classList.add('choose-character');
					}


					game.broadcastAll(func,map);


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
						
						if(get.is.phoneLayout()){
							ui.shiQiInfo=ui.create.div('.touchinfo.left',ui.window);
						}
						else{
							ui.shiQiInfo=ui.create.div(ui.gameinfo);
						}
						ui.shiQiInfo.innerHTML='士气'+'<span style="color:red;">'+game.hongShiQi+'</span>'+'/'+'<span style="color:blue;">'+game.lanShiQi+'</span>'+'|战绩'+'<span style="color:red;">'+game.hongZhanJi+'</span>'+'/'+'<span style="color:blue;">'+game.lanZhanJi+'</span>'+'|星杯'+'<span style="color:red;">'+game.hongXingBei+'</span>'+'/'+'<span style="color:blue;">'+game.lanXingBei+'</span>';
					}];
					
					//22联机分配角色
					var list=[];
					var libCharacter={};
					var list4=[];
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(typeof func=='function'&&func(j)) continue;
							if(lib.connectBanned.contains(j)) continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							list.push(i);
							list4.addArray(ix);
						}
					}
					game.broadcast(function(list){
						for(var i in lib.characterReplace){
							var ix=lib.characterReplace[i];
							for(var j=0;j<ix.length;j++){
								if(!list.contains(ix[j])) ix.splice(j--,1);
							}
						}
					},list4);
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						list.push(i);
						list4.push(i);
					}
					var choose={};
					event.list=list;
					_status.characterlist=list4;
					//推荐队友选将
					//给所有人生成对话框
					for(var i=0;i<game.players.length;i++){
						choose[game.players[i].playerid]=list.randomRemove(choose_number);
					}
					game._characterChoice=choose;
					event._choiceMap={};
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(id,choice){
						game._characterChoice=choice;
						game._characterDialogID=id;
						var dialog=ui.create.dialog('请选择角色');
						dialog.videoId=id;
						var players,friends;
						var player=game.me;
						for(var i in choice){
							var current=lib.playerOL[i];
							if(current==player) players=choice[i];
							//else if(current.side==player.side) friends=choice[i];
						}
						dialog.addText('你的选将框');
						var buttons=ui.create.div('.buttons',dialog.content);
						dialog.players=ui.create.buttons(players,'characterx',buttons)
						dialog.buttons=dialog.buttons.concat(dialog.players);
						//dialog.addText('队友的选将框（点击可为其推荐角色）');
						//buttons=ui.create.div('.buttons',dialog.content);
						//dialog.friends=ui.create.buttons(friends,'characterx',buttons)
						//dialog.buttons=dialog.buttons.concat(dialog.friends);
					},event.videoId,choose);
					
					//发送选择事件
					var send=function(){
						var next=game.me.chooseButton([1,2],true);
						next.set('dialog',game._characterDialogID);
						next.set('callback',function(player,result){
							player.init(result.links[0],null,null,false);
							var button=game._playerChoice;
							button.classList.remove('glow2');
							button.classList.add('selected');
							delete game._playerChoice;
						});
						//托管选择
						next.set('ai',function(button){
							if(ui.selected.buttons.length) return 0;
							var dialog=get.idDialog(game._characterDialogID);
							//if(dialog.friends&&dialog.friends.contains(button)) return 0;
							if(dialog.classList.contains('glow2')) return 1+Math.random();
							return 0.5+Math.random();
						});
						//修改点击按钮后的反应
						next.set('custom',{replace:{
							button:function(button){
								var dialog=get.idDialog(game._characterDialogID);
								var origin=button._link,choice=button.link;
								//选择按钮时自动取消选择上一个按钮
								if(dialog.players.contains(button)){
									if(!button.classList.contains('selected')){
										button.classList.add('selected');
										ui.selected.buttons.add(button);
										game._playerChoice=button;
										for(var other of dialog.players){
											if(other!=button&&other.classList.contains('selected')){
												other.classList.remove('selected');
												ui.selected.buttons.remove(other);
											}
										}
									}
									game.check();
								}
								/*
								else{
									//给队友推荐选将
									if(game._friendConfirmed) return;
									if(button==dialog._recommending) return;
									dialog._recommending=button;
									button.classList.add('glow2');
									for(var other of dialog.friends){
										if(other!=button&&other.classList.contains('glow2')){
											other.classList.remove('glow2');
										}
									}
									//将最小发送延时间隔设置为0.5秒 避免通过频繁点击进行炸服
									if(dialog.delay) return;
									if(game.online) game.send('tempResult',origin);
									else game.me.tempUnwait(origin);
									dialog.delay=setTimeout(function(){
										delete dialog.delay;
										if(game._friendConfirmed) return;
										var recommend=dialog._recommending._link;
										if(recommend!=origin){
											if(game.online) game.send('tempResult',recommend);
											else game.me.tempUnwait(recommend);
										}
									},500);
								}*/
							}
						},add:{}});
						if(game.online) game.resume();
					}
					//推荐选将后的回传函数
					event.recommend=function(player,choice){
						if(player.name1||game._characterDialogID==undefined) return;
						var dialog=get.idDialog(game._characterDialogID);
						if(dialog){
							for(var button of dialog.players){
								if(button._link==choice) button.classList.add('glow2');
								else if(button.classList.contains('glow2')) button.classList.remove('glow2');
							}
						}
					}
					//确认选将后的回传函数
					event.confirm=function(player,choice){
						if(!player.name1) player.init(choice,null,null,false);
						game._friendConfirmed=true;
						if(game._characterDialogID==undefined) return;
						var dialog=get.idDialog(game._characterDialogID);
						if(!dialog) return;
						//for(var button of dialog.friends){
						//	button.classList.remove('glow2');
							//if(button.link==choice||(lib.characterReplace[button._link]&&lib.characterReplace[button._link].contains(choice))) button.classList.add('selected');
						//}
					}
					//处理result
					var sendback=function(result,player){
						var type=typeof result;
						var friend=game.findPlayer(function(current){
							return current!=player&&current.side==player.side;
						});
						//处理推荐选将
						if(type=='string'){
							if(friend==game.me) event.recommend(friend,result);
							else if(friend.isOnline()) friend.send(event.recommend,friend,result);
							else friend._aiChoice=result;
						}
						//处理确认选将
						if(result&&type=='object'){
							var choice=result.links[0];
							event._choiceMap[player.playerid]=choice;
							if(friend==game.me) event.confirm(player,choice);
							else if(friend.isOnline()) friend.send(event.confirm,player,choice);
						}
					}
					event.sendback=sendback;
					
					//发送
					event.ai_targets=[];
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isOnline()){
							event.withol=true;
							game.players[i].send(send);
							game.players[i].wait(sendback);
						}
						else if(game.players[i]==game.me){
							event.withme=true;
							send();
							game.me.wait(sendback);
						}
						else{
							event.ai_targets.push(game.players[i]);
							game.players[i].showTimer();
						}
					}
					//模拟AI思考后选择
					
					if(event.ai_targets.length){
						event.ai_targets.randomSort();
						setTimeout(function(){
							event.interval=setInterval(function(){
								var target=event.ai_targets.shift();
								var list=game._characterChoice[target.playerid];
								var choice;
								//AI必选玩家推荐角色
								if(target._aiChoice&&list.contains(target._aiChoice)) choice=target._aiChoice;
								else choice=list.randomGet();
								if(lib.characterReplace[choice]) choice=lib.characterReplace[choice].randomGet();
								event.sendback({
									result:bool,
									links:[choice],
								},target);
								target.hideTimer();
								if(!event.ai_targets.length){
									clearInterval(event.interval);
									if(event.withai) game.resume();
								}
							},1000);
						},6000)
					}
					
					'step 1'
					if(event.withme){
						game.me.unwait(result);
					}
					'step 2'
					if(event.withol&&!event.resultOL){
						game.pause();
					}
					'step 3'
					if(event.ai_targets.length>0){
						event.withai=true;
						game.pause();
					}
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}

					game.broadcastAll(function(){
						if(get.is.phoneLayout()){
							ui.shiQiInfo=ui.create.div('.touchinfo.left',ui.window);
						}
						else{
							ui.shiQiInfo=ui.create.div(ui.gameinfo);
						}
						ui.shiQiInfo.innerHTML='士气'+'<span style="color:red;">'+game.hongShiQi+'</span>'+'/'+'<span style="color:blue;">'+game.lanShiQi+'</span>'+'|战绩'+'<span style="color:red;">'+game.hongZhanJi+'</span>'+'/'+'<span style="color:blue;">'+game.lanZhanJi+'</span>'+'|星杯'+'<span style="color:red;">'+game.hongXingBei+'</span>'+'/'+'<span style="color:blue;">'+game.lanXingBei+'</span>';
					})

					
					'step 4'
					game.broadcastAll(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							clearInterval(dialog.delay);
						}
					},event.videoId);
					var result=event._choiceMap;
					for(var i in lib.playerOL){
						if(!lib.character[result[i]]){
							result[i]=game._characterChoice[i].randomGet();
						}
						_status.characterlist.remove(result[i]);
						if(!lib.playerOL[i].name1){
							lib.playerOL[i].init(result[i]);
						}
						lib.playerOL[i].update();
					}
					game.broadcast(function(result){
						for(var i in result){
							if(!lib.playerOL[i].name1){
								lib.playerOL[i].init(result[i]);
								lib.playerOL[i].update();
							}
						}
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500)
					},result);
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					

					event.trigger('enterGame');
				});
			},

			chooseCharacterOL2:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//var ref=game.players[0];
					var number=game.players.length;
					var choose_number=3;
					var ref=game.players.randomGet();
					var bool=true;
					var bool2=false;
					ref.side=bool;
					ref.next.side=bool2;
					ref.next.next.side=!bool;
					ref.previous.side=!bool2;
					var firstChoose=game.players.randomGet();
					while(firstChoose.side!=true){
						firstChoose=game.players.randomGet();
					}
					_status.firstAct=firstChoose;
					for(var i=0;i<number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else{
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}
					ui.arena.classList.add('choose-character');
					game.broadcast(function(ref,bool,bool2,firstChoose){
						ref.side=bool;
						ref.next.side=bool2;
						ref.next.next.side=!bool;
						ref.previous.side=!bool2;
						for(var i=0;i<number;i++){
							firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
							firstChoose=firstChoose.next;
						}
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side==true){
								game.players[i].node.identity.firstChild.innerHTML='红';
							}
							else{
								game.players[i].node.identity.firstChild.innerHTML='蓝';
							}
							game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
						}
						ui.arena.classList.add('choose-character');
					},ref,bool,bool2,_status.firstAct);
					_status.onreconnect=[function(){
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							if(players[i].side==true){
								players[i].node.identity.firstChild.innerHTML='红';
							}
							else{
								players[i].node.identity.firstChild.innerHTML='蓝';
							}
						}
					}];
					
					//22联机分配角色
					var list=[];
					var libCharacter={};
					var list4=[];
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(typeof func=='function'&&func(j)) continue;
							if(lib.connectBanned.contains(j)) continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							list.push(i);
							list4.addArray(ix);
						}
					}
					game.broadcast(function(list){
						for(var i in lib.characterReplace){
							var ix=lib.characterReplace[i];
							for(var j=0;j<ix.length;j++){
								if(!list.contains(ix[j])) ix.splice(j--,1);
							}
						}
					},list4);
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						list.push(i);
						list4.push(i);
					}
					var choose={};
					event.list=list;
					_status.characterlist=list4;
					//推荐队友选将
					//给所有人生成对话框
					for(var i=0;i<game.players.length;i++){
						choose[game.players[i].playerid]=list.randomRemove(choose_number);
					}
					game._characterChoice=choose;
					event._choiceMap={};
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(id,choice){
						game._characterChoice=choice;
						game._characterDialogID=id;
						var dialog=ui.create.dialog('请选择角色');
						dialog.videoId=id;
						var players,friends;
						var player=game.me;
						for(var i in choice){
							var current=lib.playerOL[i];
							if(current==player) players=choice[i];
							//else if(current.side==player.side) friends=choice[i];
						}
						dialog.addText('你的选将框');
						var buttons=ui.create.div('.buttons',dialog.content);
						dialog.players=ui.create.buttons(players,'characterx',buttons)
						dialog.buttons=dialog.buttons.concat(dialog.players);
						//dialog.addText('队友的选将框（点击可为其推荐角色）');
						//buttons=ui.create.div('.buttons',dialog.content);
						//dialog.friends=ui.create.buttons(friends,'characterx',buttons)
						//dialog.buttons=dialog.buttons.concat(dialog.friends);
					},event.videoId,choose);
					
					//发送选择事件
					var send=function(){
						var next=game.me.chooseButton([1,2],true);
						next.set('dialog',game._characterDialogID);
						next.set('callback',function(player,result){
							player.init(result.links[0],null,null,false);
							var button=game._playerChoice;
							button.classList.remove('glow2');
							button.classList.add('selected');
							delete game._playerChoice;
						});
						//托管选择
						next.set('ai',function(button){
							if(ui.selected.buttons.length) return 0;
							var dialog=get.idDialog(game._characterDialogID);
							//if(dialog.friends&&dialog.friends.contains(button)) return 0;
							if(dialog.classList.contains('glow2')) return 1+Math.random();
							return 0.5+Math.random();
						});
						//修改点击按钮后的反应
						next.set('custom',{replace:{
							button:function(button){
								var dialog=get.idDialog(game._characterDialogID);
								var origin=button._link,choice=button.link;
								//选择按钮时自动取消选择上一个按钮
								if(dialog.players.contains(button)){
									if(!button.classList.contains('selected')){
										button.classList.add('selected');
										ui.selected.buttons.add(button);
										game._playerChoice=button;
										for(var other of dialog.players){
											if(other!=button&&other.classList.contains('selected')){
												other.classList.remove('selected');
												ui.selected.buttons.remove(other);
											}
										}
									}
									game.check();
								}
								/*
								else{
									//给队友推荐选将
									if(game._friendConfirmed) return;
									if(button==dialog._recommending) return;
									dialog._recommending=button;
									button.classList.add('glow2');
									for(var other of dialog.friends){
										if(other!=button&&other.classList.contains('glow2')){
											other.classList.remove('glow2');
										}
									}
									//将最小发送延时间隔设置为0.5秒 避免通过频繁点击进行炸服
									if(dialog.delay) return;
									if(game.online) game.send('tempResult',origin);
									else game.me.tempUnwait(origin);
									dialog.delay=setTimeout(function(){
										delete dialog.delay;
										if(game._friendConfirmed) return;
										var recommend=dialog._recommending._link;
										if(recommend!=origin){
											if(game.online) game.send('tempResult',recommend);
											else game.me.tempUnwait(recommend);
										}
									},500);
								}*/
							}
						},add:{}});
						if(game.online) game.resume();
					}
					//推荐选将后的回传函数
					event.recommend=function(player,choice){
						if(player.name1||game._characterDialogID==undefined) return;
						var dialog=get.idDialog(game._characterDialogID);
						if(dialog){
							for(var button of dialog.players){
								if(button._link==choice) button.classList.add('glow2');
								else if(button.classList.contains('glow2')) button.classList.remove('glow2');
							}
						}
					}
					//确认选将后的回传函数
					event.confirm=function(player,choice){
						if(!player.name1) player.init(choice,null,null,false);
						game._friendConfirmed=true;
						if(game._characterDialogID==undefined) return;
						var dialog=get.idDialog(game._characterDialogID);
						if(!dialog) return;
						//for(var button of dialog.friends){
						//	button.classList.remove('glow2');
							//if(button.link==choice||(lib.characterReplace[button._link]&&lib.characterReplace[button._link].contains(choice))) button.classList.add('selected');
						//}
					}
					//处理result
					var sendback=function(result,player){
						var type=typeof result;
						var friend=game.findPlayer(function(current){
							return current!=player&&current.side==player.side;
						});
						//处理推荐选将
						if(type=='string'){
							if(friend==game.me) event.recommend(friend,result);
							else if(friend.isOnline()) friend.send(event.recommend,friend,result);
							else friend._aiChoice=result;
						}
						//处理确认选将
						if(result&&type=='object'){
							var choice=result.links[0];
							event._choiceMap[player.playerid]=choice;
							if(friend==game.me) event.confirm(player,choice);
							else if(friend.isOnline()) friend.send(event.confirm,player,choice);
						}
					}
					event.sendback=sendback;
					
					//发送
					event.ai_targets=[];
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isOnline()){
							event.withol=true;
							game.players[i].send(send);
							game.players[i].wait(sendback);
						}
						else if(game.players[i]==game.me){
							event.withme=true;
							send();
							game.me.wait(sendback);
						}
						else{
							event.ai_targets.push(game.players[i]);
							game.players[i].showTimer();
						}
					}
					//模拟AI思考后选择
					
					if(event.ai_targets.length){
						event.ai_targets.randomSort();
						setTimeout(function(){
							event.interval=setInterval(function(){
								var target=event.ai_targets.shift();
								var list=game._characterChoice[target.playerid];
								var choice;
								//AI必选玩家推荐角色
								if(target._aiChoice&&list.contains(target._aiChoice)) choice=target._aiChoice;
								else choice=list.randomGet();
								if(lib.characterReplace[choice]) choice=lib.characterReplace[choice].randomGet();
								event.sendback({
									result:bool,
									links:[choice],
								},target);
								target.hideTimer();
								if(!event.ai_targets.length){
									clearInterval(event.interval);
									if(event.withai) game.resume();
								}
							},1000);
						},6000)
					}
					
					'step 1'
					if(event.withme){
						game.me.unwait(result);
					}
					'step 2'
					if(event.withol&&!event.resultOL){
						game.pause();
					}
					'step 3'
					if(event.ai_targets.length>0){
						event.withai=true;
						game.pause();
					}
					'step 4'
					game.broadcastAll(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							clearInterval(dialog.delay);
						}
					},event.videoId);
					var result=event._choiceMap;
					for(var i in lib.playerOL){
						if(!lib.character[result[i]]){
							result[i]=game._characterChoice[i].randomGet();
						}
						_status.characterlist.remove(result[i]);
						if(!lib.playerOL[i].name1){
							lib.playerOL[i].init(result[i]);
						}
						lib.playerOL[i].update();
					}
					game.broadcast(function(result){
						for(var i in result){
							if(!lib.playerOL[i].name1){
								lib.playerOL[i].init(result[i]);
								lib.playerOL[i].update();
							}
						}
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500)
					},result);
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
					//game.addGlobalSkill('versus_viewHandcard');
				});
			},
			
			phaseLoopThree:function(player){
				_status.isRoundFilter=function(event){
					return event._isThreeRound===true;
				};
				var next=game.createEvent('phaseLoop');
				next.player=player;
				next.swap=function(player){
					if(player.side==game.me.side){
						return game.enemyZhu;
					}
					else{
						return game.me;
					}
				};
				next.setContent(function(){
					'step 0'
					var next=player.phase();
					if(!game.players.some(current=>current.classList.contains('acted'))){
						next._isThreeRound=true;
					}
					player.classList.add('acted');
					'step 1'
					if(player.identity!='zhu'){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side==player.side&&game.players[i].identity!='zhu'&&
								game.players[i]!=player&&!game.players[i].classList.contains('acted')){
								game.players[i].classList.add('acted');
								game.players[i].phase();
								break;
							}
						}
					}
					'step 2'
					var target=event.swap(player);
					var swap=[],swap2=[];
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isOut()) continue;
						if(!game.players[i].classList.contains('acted')){
							if(game.players[i].side==target.side){
								swap.push(game.players[i]);
							}
							else{
								swap2.push(game.players[i]);
							}
						}
					}
					if(swap.length==0){
						if(swap2.length){
							target=event.swap(target);
							swap=swap2;
						}
						else{
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].isOut()) continue;
								game.players[i].classList.remove('acted');
							}
							delete _status.roundStart;
							event.redo();
							game.delay();
							return;
						}
					}
					if(swap.length==1){
						event.directresult=swap[0];
					}
					else{
						var rand=Math.random();
						var next=target.chooseTarget('选择行动的角色',true,function(card,player,target2){
							return target2.side==target.side&&!target2.classList.contains('acted');
						});
						next._triggered=null;
						next.includeOut=true;
						next.ai=function(target2){
							var num=0;
							if(target2.countCards('j')){
								num-=5;
							}
							if(target2.identity!='zhu'){
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].identity!='zhu'&&game.players[i]!=target2&&
									game.players[i].side==target2.side&&game.players[i].countCards('j')){
										num-=2;
									}
								}
							}
							if(rand<1/3){
								num+=1/(target2.hp+1);
							}
							else if(rand<2/3){
								num+=target2.countCards('h')/5;
							}
							return num;
						}
					}
					'step 3'
					if(event.directresult){
						event.player=event.directresult;
						delete event.directresult;
					}
					else if(result.bool){
						event.player=result.targets[0];
					}
					event.goto(0);
				});
			},
			versusPhaseLoop:function(player){
				var next=game.createEvent('phaseLoop');
				next.player=player;
				next.setContent(function(){
					"step 0"
					if(lib.storage.zhu){
						player.classList.add('acted');
					}
					player.phase();
					"step 1"
					if(lib.storage.zhu){
						_status.currentSide=!_status.currentSide;
						_status.round++;
						if(_status.round>=2*Math.max(game.friend.length,game.enemy.length)){
							_status.round=0;
							for(var i=0;i<game.players.length;i++){
								game.players[i].classList.remove('acted');
							}
							delete _status.roundStart;
						}
						var list=(_status.currentSide==game.me.side)?game.friend.slice(0):game.enemy.slice(0);
						for(var i=0;i<list.length;i++){
							if(list[i].classList.contains('acted')||list[i].isOut()){
								list.splice(i,1);i--;
							}
						}
						if(list.length==0) event.redo();
						else if(list.length==1||(game.me!=game.friendZhu&&!lib.storage.single_control)||_status.currentSide!=game.me.side){
							list.sort(function(a,b){
								if(a.countCards('j')>b.countCards('j')) return 1;
								return a.hp-b.hp;
							})
							event.player=list[0];
							event.goto(0);
						}
						else{
							game.me.chooseTarget('选择要行动的角色',true,function(card,player,target){
								return (target.classList.contains('acted')==false&&target.side==game.me.side);
							}).includeOut=true;
						}
					}
					else{
						event.player=event.player.next;
						event.goto(0);
					}
					"step 2"
					event.player=result.targets[0];
					event.goto(0);
				});
			},
			phaseLoopJiange:function(){
				var next=game.createEvent('phaseLoop');
				next.num=0;
				next.setContent(function(){
					if(event.num>=8){
						event.num-=8;
					}
					var player=_status.actlist[event.num];
					if(player.isAlive()){
						player.phase();
					}
					event.num++;
					event.redo();
				});
			},
			replacePlayerOL:function(player){
				var next=game.createEvent('replacePlayer',false,_status.event.getParent());
				next.source=player;
				next.setContent('replacePlayerOL');
			},
			replacePlayer:function(player){
				var next=game.createEvent('replacePlayer',false,_status.event.getParent());
				next.source=player;
				next.setContent('replacePlayer');
			},
			replacePlayerTwo:function(player,character){
				var next=game.createEvent('replacePlayerTwo',false,_status.event.getParent());
				next.source=player;
				next.character=character;
				next.setContent('replacePlayerTwo');
			},
			versusClickToSwap:function(e){
				if(_status.dragged) return;
				if(this.link==game.me){
					if(!this.classList.contains('buttonclick')){
						this.animate('buttonclick');
					}
				}
				else if(_status.event.player==game.me&&!_status.auto){
					game.me.popup('请稍后再换人');
					e.stopPropagation();
				}
				else{
					game.modeSwapPlayer(this.link);
				}
			},
			versusHoverEnemy:function(){
				var uiintro=ui.create.dialog('hidden');

				if(_status.enemyDied.length){
					uiintro.add('已阵亡');
					uiintro.add([_status.enemyDied,'character']);
				}

				uiintro.add('未上场');
				if(_status.enemy.length){
					uiintro.add([_status.enemy,'character']);
				}
				else{
					uiintro.add('（无）')
				}

				return uiintro;
			},
			versusHoverFriend:function(){
				var uiintro=ui.create.dialog('hidden');

				if(_status.friendDied.length){
					uiintro.add('已阵亡');
					uiintro.add([_status.friendDied,'character']);
				}

				uiintro.add('未上场');
				if(_status.friend.length){
					uiintro.add([_status.friend,'character']);
				}
				else{
					uiintro.add('（无）')
				}

				return uiintro;
			},
			versusHoverHandcards:function(){
				var uiintro=ui.create.dialog('hidden');
				var added=false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].name&&game.players[i].side==game.me.side&&game.players[i]!=game.me){
						added=true;
						uiintro.add(get.translation(game.players[i]));
						var cards=game.players[i].getCards('h');
						if(cards.length){
							uiintro.addSmall(cards,true);
						}
						else{
							uiintro.add('（无）');
						}
					}
				}
				if(added) return uiintro;
			},
			versusCheckEnemy:function(){
				_status.clicked=true;
				if(ui.intro){
					ui.intro.close();
					if(ui.intro.source=='versusCheckEnemy'){
						delete ui.intro;
						ui.control.show();
						game.resume2();
						return;
					}
				}
				game.pause2();
				ui.control.hide();
				ui.intro=ui.create.dialog();
				ui.intro.source='versusCheckEnemy';

				if(_status.enemyDied.length){
					ui.intro.add('已阵亡');
					ui.intro.add([_status.enemyDied,'character']);
				}

				ui.intro.add('未上场');
				if(_status.enemy.length){
					ui.intro.add([_status.enemy,'character']);
				}
				else{
					ui.intro.add('（无）')
				}
			},
			versusCheckFriend:function(){
				_status.clicked=true;
				if(ui.intro){
					ui.intro.close();
					if(ui.intro.source=='versusCheckFriend'){
						delete ui.intro;
						ui.control.show();
						game.resume2();
						return;
					}
				}
				game.pause2();
				ui.control.hide();
				ui.intro=ui.create.dialog();
				ui.intro.source='versusCheckFriend';




				if(_status.friendDied.length){
					ui.intro.add('已阵亡');
					ui.intro.add([_status.friendDied,'character']);
				}

				ui.intro.add('未上场');
				if(_status.friend.length){
					ui.intro.add([_status.friend,'character']);
				}
				else{
					ui.intro.add('（无）')
				}
			},
			versusSwapPlayer:function(){
				if(ui.intro){
					ui.intro.close();
					if(ui.intro.source=='versusSwapPlayer'){
						delete ui.intro;
						ui.control.show();
						game.resume2();
						return;
					}
				}
				if((_status.event.player==game.me&&_status.paused)||_status.paused2){
					game.me.popup('请稍后再换人');
				}
				else{
					_status.clicked=true;
					if(ui.intro){
						ui.intro.close();
						if(ui.intro.source==this.parentNode){
							delete ui.intro;
							ui.control.show();
							game.resume2();
							return;
						}
					}
					game.pause2();
					ui.control.hide();
					ui.intro=ui.create.dialog();
					ui.intro.source='versusSwapPlayer';
					var players=[];
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==game.me.side&&game.players[i]!=game.me){
							players.push(game.players[i]);
						}
					}
					ui.intro.add(players,true);
					var buttons=ui.intro.querySelectorAll('.button');
					for(var i=0;i<buttons.length;i++){
						buttons[i].addEventListener(lib.config.touchscreen?'touchend':'click',game.versusClickToSwap);
					}
				}
			},
			switchAutoreplace:function(e){
				e.stopPropagation();
				this.classList.toggle('on');
				game.save('autoreplaceinnerhtml',this.classList.contains('on'));
			},
			onSwapControl:function(){
				game.addVideo('onSwapControl');
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
			},
			modeSwapPlayer:function(player){
				if((_status.mode=='standard'&&lib.storage.single_control)){
					game.swapControl(player);
					game.onSwapControl();
				}
				else{
					game.swapPlayer(player);
				}
			},
			updateLineMe:function(opacity,player){
				if(!player){
					player=game.me;
				}
				ui.lineme.width=ui.window.offsetWidth;
				ui.lineme.height=ui.window.offsetHeight;

				var ctx=ui.linemectx;
				ctx.shadowBlur=5;
				ctx.shadowColor='rgba(0,0,0,0.3)';
				ctx.fillStyle='white';
				if(typeof opacity!='number'){
					opacity=0.5;
				}
				ctx.strokeStyle='rgba(255,255,255,'+opacity+')';
				ctx.lineWidth=3;
				ctx.setLineDash([8,2]);

				ctx.beginPath();

				var startx,endx,pos;
				var endy=game.me.offsetHeight/2+game.me.offsetTop+ui.arena.offsetTop;
				var starty=ui.me.offsetTop+ui.arena.offsetTop+ui.me.offsetHeight/2;
				if(game.me.offsetLeft+game.me.offsetWidth/2<=ui.arena.offsetWidth/2){
					startx=ui.me.offsetLeft+ui.arena.offsetLeft;
					endx=game.me.offsetLeft+ui.arena.offsetLeft;
					pos=-1;
				}
				else{
					startx=ui.me.offsetLeft+ui.arena.offsetLeft+ui.me.offsetWidth;
					endx=game.me.offsetWidth+game.me.offsetLeft+ui.arena.offsetLeft;
					pos=1;
				}
				ctx.moveTo(startx,starty);
				startx+=pos*ui.arena.offsetLeft/2;
				ctx.quadraticCurveTo(startx,starty,startx,starty-(starty-endy)/2);
				ctx.quadraticCurveTo(startx,endy,endx,endy);
				ctx.stroke();
			},
		},
		

		translate:{
			trueColor:"zhu",
			falseColor:"wei",
			versus_single_control_config:'单人控制',

			//公共技能
            _xuRuo:"虚弱",
            _zhongDu:"中毒",
            _shengDun:"圣盾",
            _shengGuang:"圣光",
            _yingZhan:"应战",
            _moDan:"魔弹",
            _heCheng:"合成",
            _gouMai:"购买",
            _tiLian:"提炼",
            _gongJiXingShi:"攻击星石",
            _quXiao:'取消',

			_tiLian_backup:'提炼',
			_heCheng_backup:'合成',
			
		},
		skill:{
			_chongZhiAction:{
				trigger:{player:'phaseBegin'},
				forced:true,
				firstDo:true,
				content:function(){
					player.storage.all=1;
					player.storage.faShu=0;
					player.storage.gongJi=0;
				}
			},

            _zhiLiao:{
                trigger:{player:"zhiLiao"},
                forced:true,
                priority:1,
                filter:function(event,player){
                    if(event.zhiLiao==false) return false;
                    if(player.zhiLiao<=0) return false;
                    return true;
                },
                content:function(){
                    "step 0"
					event.plyaer=player;
					event.trigger('shiYongZhiLiao');
					"step 1"
                    var num=trigger.num;
                    var list=[];
                    for(var i=0;i<=player.zhiLiao;i++){
                        if(i>num) break;
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','使用的治疗数量').set('ai',function(){return list.length-1;});
					"step 2"
					var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.num-=zhiLiaonum;
						game.log(player,'的治疗抵挡了'+zhiLiaonum+'点伤害');
						player.changeZhiLiao(-zhiLiaonum).type='damage';
					}
                }
            },
            _faShu:{
                mod:{
                    cardEnabled:function(card){
                        if(_status.event.name=='faShu'){
                            if(get.type(card)!='faShu') return false;
                        }
                    }
                },
            },
            _gongJi:{
                mod:{
                    cardEnabled:function(card){
                        if(_status.event.name=='gongJi'){
                            if(get.type(card)!='gongJi') return false;
                        }
                    }    
                }
            },
			/*
            _qiDong:{
                forced:true,
                trigger:{player:'useSkillAfter'},
                filter:function(event){
                    var info=get.info(event.skill);
                    return info.qiDong;
                },
                content:function(){
                    player.chooseToUse(true);
                }
            },*/

            _xuRuo:{
                priority:1,//优先级大的先执行
                trigger:{player:'phaseUseBefore'},
                forced:true,
                //marktext:"虚",
                markimage:'image/card/xuRuo.png',
                intro:{
					content:'expansion',
				},
                filter:function(event,player){
                    return player.hasExpansions('_xuRuo');
                },
                content:function(event,player){
                    'step 0'
                    var list=['摸三张牌','跳过行动阶段'];
                    player.chooseControl().set('choiceList',list).set('prompt','虚弱：选择一项').set('ai',function(){
                        if(player.countCards('h')+3<=player.getHandcardLimit()) return 0;
                        return 1;
                    });
                    'step 1'
					if(result.index==1){
						trigger.cancel();
					}else if(result.index==0){
						player.draw(3);
					}
                    player.loseToDiscardpile(player.getExpansions('_xuRuo'));
                },
            },
            _zhongDu:{
                priority:3,
                //marktext:"毒",
                markimage:'image/card/zhongDu.png',
                intro:{
					content:'expansion',
					markcount:'expansion',
				},
                trigger:{player:'phaseUseBefore'},
                forced:true,
                filter:function(event,player){
                    return player.hasExpansions('_zhongDu');
                },
                content:function(event){
                    var target;
                    while(player.storage.zhongDu.length){
                        target=player.storage.zhongDu.pop();
                        var next=player.damage(target);
                        next.faShu=true;
                    }
                    player.loseToDiscardpile(player.getExpansions('_zhongDu'));
                }
            },
            _shengDun:{
                //marktext:"盾",
                markimage:'image/card/shengDun.png',
                intro:{
					content:'expansion',
				},
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.parent.canShengDun==false) return false;
                    if(get.type(event.card)=='gongJi'||event.card.name=='moDan'){
                        return player.hasExpansions('_shengDun');
                    }
                },
                content:function(){
					'step 0'
                    player.loseToDiscardpile(player.getExpansions('_shengDun'));
                    trigger.getParent().targets.remove(player);
					'step 1'
                    if(get.type(trigger.card)=='gongJi'){
						event.source=trigger.player;
						event.yingZhan=trigger.parent.yingZhan;
                        event.trigger('gongJiWeiMingZhong');
                    }else if(trigger.card.name=='moDan') game.resetMoDan();
                    trigger.cancel();
                }
            },
            _yingZhan:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.parent.canYingZhan==false) return false;
                    if(get.type(event.card)=='gongJi'){
                        if(get.name(event.card)=='anMie'){
                            return false;
                        }else{
                            return true;
                        }
                    }
                }, 
                content:function(){
                    'step 0'
                    event.source=trigger.player;
					event.yingZhan=trigger.parent.yingZhan;
					var next=player.gongJi('h');
                    next.set('filterCard',function(card,player,event){
                        if(card.name!='anMie'&&get.suit(card)!=get.suit(_status.event.trigger_card)) return false;
						return lib.filter.cardEnabled(card,player,'forceEnable');
					});
                    next.set('ai',function(card){
                        return 1;
                    });
                    next.set('prompt','是否使用一张同元素攻击牌或者暗灭');
                    next.set('filterTarget',function(card,player,target){
                        return target!=_status.event.trigger_player&&target.side!=player.side;
                    });
                    next.set('trigger_card',trigger.card);
                    next.set('trigger_player',event.source);
                    next.set('yingZhan',true);
                    'step 1'
                    if(result.bool){
                        //game.log(player.name,'应战完毕');//调试用
                        trigger.getParent().targets.remove(player);
                        trigger.cancel();
                    }
                }
            },
            _yingZhan_weiMingZhong:{
                trigger:{player:'useCard1'},
                forced:true,
				firstDo:true,
                filter:function(event,player){
                    return event.parent.parent.name=='_yingZhan';
                },
                content:function(){
					'step 0'
                    event.source=trigger.parent.parent.source;
                    event.player=trigger.parent.player;
					'step 1'
                    event.trigger('gongJiWeiMingZhong');
                }
            },
			_yingZhan_sheZhi:{
				trigger:{player:'useCardBefore'},
                forced:true,
				firstDo:true,
                filter:function(event,player){
                    return event.parent.parent.name=='_yingZhan';
                },
				content:function(){
					trigger.yingZhan=true;
					event.yingZhan=trigger.parent.parent.yingZhan;
				}
			},

            _shengGuang:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.parent.canShengGuang==false) return false;
                    if(get.type(event.card)=='gongJi'||event.card.name=='moDan'){
                        return true;
                    }
                },
                content:function(){
					"step 0"
					var str='使用圣光抵挡攻击';
					var next=player.chooseToUse_qiTa(str).set('filterCard',function(card,player,event){
						if(card.name!="shengGuang") return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					});
					next.ai=function(card){
						return 1;
					};
					"step 1"
					if(result.bool){
                        trigger.getParent().targets.remove(player);
						if(get.type(trigger.card)=='gongJi'){
							event.source=trigger.player;
							event.yingZhan=trigger.parent.yingZhan;
                            event.trigger('gongJiWeiMingZhong');
                        }else if(trigger.card.name=='moDan') game.resetMoDan();
                        trigger.cancel();
					}
				},
            },

            _moDan:{
                group:['moDan2','moDan3'],
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
				content:function(){
					"step 0"
                    player.storage.moDan=true;//回合外判断使用法术
					var str='是否使用魔弹'; 
					var next=player.chooseToUse_qiTa('h',function(card,player,event){
						if(card.name!=get.name(trigger.card)) return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					});
					next.ai=function(card){
						return 1;
					}
					next.autodelay=true; 
                    game.broadcastAll(function(){
                        game.moDan++;
                    });
					"step 1"
					if(result.bool){
                        trigger.getParent().targets.remove(player);
                        trigger.cancel();
					}else{
                        game.broadcastAll(function(){
                            game.moDan--;
                        });
                    }
                    player.storage.moDan=false;
				},
				ai:{
					result:{
						player:2,
					},
				}
			},
            moDan2:{//第一个使用魔弹的角色增加魔弹标记
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(player.storage.moDan==false&&event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.storage.moDan=true;
                }
            },
            moDan3:{//第一个使用魔弹的角色删除魔弹标记
                trigger:{player:'useCardEnd'},
                filter:function(event,player){
                    if(player.storage.moDan==true&&event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.storage.moDan=false;
                }
            },
			_quXiao:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
                filter:function(event,player){
                    if(player.hasExpansions('_shengDun')) return false;//有圣盾不触发
                    if(event.parent.canYingZhan==false&&event.parent.canShengDun==false&&event.parent.canShengGuang==false) return false;//强制命中不触发
                    if(event.parent.canYingZhan==false&&event.parent.canShengGuang==false&&!player.hasExpansions('_shengDun')) return false;//无法应战无法圣光无圣盾不触发
                    if(get.type(event.card)=='gongJi'||event.card.name=='moDan'){
                        return true;
                    }
                },
                content:function(){
                    trigger.cancel(); 
                }
            },
            _gouMai:{
				enable:'phaseUse',
				type:'teShu',
				filter:function(event,player){
					return player.countCards('h')+3<=player.getHandcardLimit();
				},
				content:function(event,player){
					'step 0'
					player.draw(3).set('yuanYin','teShuXingDong');
					event.trigger('gouMai');
					'step 1'
					var side=player.side;
					var num=0;
					if(side==true){
						if(game.hongZhanJi.length<=3){
							num=2;
						}else if(game.hongZhanJi.length==5){
							num=0;
						}else{
							num=1;
						}
					}else if(side==false){
						if(game.lanZhanJi.length<=3){
							num=2;
						}else if(game.lanZhanJi.length==5){
							num=0;
						}else{
							num=1;
						}
					}
					if(num==0){
						event.finish();
					}else if(num==2){
						player.addZhanJi('r',1);
						player.addZhanJi('b',1);
					}else if(num==1){
						var list=['宝石','水晶'];
						player.chooseControl(list).set('prompt','选择获得的星石').set('ai',function(){return 0;});
					}
					'step 2'
					if(result.control=='宝石'){
						player.addZhanJi('r',1);
					}else if(result.control=='水晶'){
						player.addZhanJi('b',1);
					}
				},
				ai:{
					order:5,
					result:{
						player:2,
					},
					maixie:true,
				}
			},
			_heCheng:{
				enable:'phaseUse',
				type:'teShu',
				filter:function(event,player){
					if(player.side==true){
						return game.hongZhanJi.length>=3&&player.countCards('h')+3<=player.getHandcardLimit();
					}else if(player.side==false){
						return game.lanZhanJi.length>=3&&player.countCards('h')+3<=player.getHandcardLimit();
					}
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('合成：选择星石','hidden');
						if(player.side==true){
							var list=game.hongZhanJi;
						}else if(player.side==false){
							var list=game.lanZhanJi;
						}
						dialog.add([list,'tdnodes']);
						return dialog;
					},
					backup:function(links,player){
						return{
							links:links,
							type:'teShu',
							content:function(){
								'step 0'
								event.links=lib.skill._heCheng_backup.links;
								event.trigger('heCheng');
								'step 1'
								player.draw(3).set('yuanYin','teShuXingDong');
								'step 2'
								for(var i=0;i<event.links.length;i++){
									if(event.links[i]=='宝石'){
										player.changeZhanJi('r',-1);
									}else if(event.links[i]=='水晶'){
										player.changeZhanJi('b',-1);
									}
								}
								player.changeXingBei(1);
							},
						}
					},
					select:3,
					check:function(button,player){
						switch(button.link){
							case '水晶':{
								return 2;
							}
							case '宝石':{
								return 1;
							}
						}
					}
				},
				ai:{
					order:50,
					result:{
						player:function(player){
                            if(player.side){
                                if(game.hongZhanJi.length>=3){
                                    return 3;
                                }
                            }else{
                                if(game.lanZhanJi.length>=3){
                                    return 3;
                                }
                            }
                        },
					},
					maixie:true,
				}
			},
			_tiLian:{
				subSkill:{
					r:{
						//marktext:'石',
						intro:{
							name:'宝石',
							content:'mark',
						},
                        markimage:'image/card/r.png',
					},
					b:{
						//marktext:'晶',
						intro:{
							name:'水晶',
							content:'mark',
						},
                        markimage:'image/card/b.png',
					},
				},
				enable:'phaseUse',
				type:'teShu',
				filter:function(event,player){
                    var nengLiang_num=player.countMark('_tiLian_r')+player.countMark('_tiLian_b');
                    var empty_nengliang=player.getNengLiangLimit()-nengLiang_num;
					if(player.side==true){
						return game.hongZhanJi.length>=1&&empty_nengliang>=1;
					}else if(player.side==false){
						return game.lanZhanJi.length>=1&&empty_nengliang>=1;
					}
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('提炼：选择星石','hidden');
						if(player.side==true){
							var list=game.hongZhanJi;
						}else if(player.side==false){
							var list=game.lanZhanJi;
						}
						dialog.add([list,'tdnodes']);
						return dialog;
						
					},
					backup:function(links,player){
						return{
							links:links,
							type:'teShu',
							content:function(){
								'step 0'
								event.links=lib.skill._tiLian_backup.links;
								event.trigger('tiLian');
								'step 1'
								for(var i=0;i<event.links.length;i++){
									if(event.links[i]=='宝石'){
										player.addMark('_tiLian_r');
										player.changeZhanJi('r',-1);
									}else if(event.links[i]=='水晶'){
										player.addMark('_tiLian_b');
										player.changeZhanJi('b',-1);
									}
								}
							},
						}
					},
					select:function(){
						var player=_status.event.player;
						var nengLiang_num=player.countMark('_tiLian_r')+player.countMark('_tiLian_b');
						if(player.getNengLiangLimit()-nengLiang_num==1){
							var range=[1,1];
						}else if(player.getNengLiangLimit()-nengLiang_num>=2){
							var range=[1,2];
						}
						return range;
					},
				},
			},
			_gongJiXingShi:{//攻击获得星石
				trigger:{player:'useCardToTargeted'},
				forced:true,
				firstDo:true,
				filter:function(event,player){
					if(player.side==true){
						return game.hongZhanJi.length<5&&get.type(event.card)=="gongJi";
					}else if(player.side==false){
						return game.lanZhanJi.length<5&&get.type(event.card)=="gongJi";
					}
				},
				content:function(event,player){
					if(trigger.parent.yingZhan==true){
						player.changeZhanJi('b',1)
					}else{
						player.changeZhanJi('r',1)
                    }
				},
			},
		},
		element:{
			content:{
				removeBiShaShuiJing:function(){
					'step 0'
                    if(player.hasMark('_tiLian_b')&&player.hasMark('_tiLian_r')){
                        var list=['宝石','水晶'];
                        player.chooseControl(list).set('prompt','选择要移除的星石');
                    }else if(player.hasMark('_tiLian_b')){
                        player.removeMark('_tiLian_b');
                        return;
                    }else if(player.hasMark('_tiLian_r')){
                        player.removeMark('_tiLian_r');
                        return;
                    }
                    'step 1'
                    if(result.control=='宝石'){
                        player.removeMark('_tiLian_r');
                    }else if(result.control=='水晶'){
                        player.removeMark('_tiLian_b');
                    }
				},
				replacePlayer:function(){
					"step 0"
					var cards=source.getCards('hej');
					if(cards.length){
						source.$throw(cards,1000);
						game.cardsDiscard(cards);
					}
					"step 1"
					var list=(source.side==game.me.side)?_status.friend:_status.enemy;
					if(list.length==0){
						// if(game.friend.contains(source)){
						// 	game.over(false);
						// }
						// else{
						// 	game.over(true);
						// }
						game.friend.remove(source);
						game.enemy.remove(source);
						if(game.friend.length==0) game.over(false);
						else if(game.enemy.length==0) game.over(true);
						if(game.friendZhu&&game.friendZhu.classList.contains('dead')&&game.friend.length){
							game.friendZhu=game.friend[0];
							game.friendZhu.setIdentity(_status.color+'Zhu');
						}
						if(game.enemyZhu&&game.enemyZhu.classList.contains('dead')&&game.enemy.length){
							game.enemyZhu=game.enemy[0];
							game.enemyZhu.setIdentity(!_status.color+'Zhu');
						}
						event.finish();
						return;
					}
					if(source.side==game.me.side&&list.length>1&&(game.me==game.friendZhu||(lib.storage.zhu&&lib.storage.single_control))&&
						!_status.auto){
						event.dialog=ui.create.dialog('选择替补角色',[list,'character']);
						event.filterButton=function(){return true;};
						event.player=game.me;
						event.forced=true;
						event.custom.replace.confirm=function(){
							event.character=ui.selected.buttons[0].link;
							event.dialog.close();
							if(ui.confirm) ui.confirm.close();
							delete event.player;
							game.resume();
						}
						game.check();
						game.pause();
					}
					else{
						event.character=list[Math.floor(Math.random()*list.length)];
					}
					"step 2"
					game.uncheck();
					_status.friend.remove(event.character);
					_status.enemy.remove(event.character);
					source.revive(null,false);
					game.additionaldead.push({
						name:source.name,
						stat:source.stat
					});
					game.addVideo('reinit',source,[event.character,get.translation(source.side+'Color')]);
					source.uninit();
					source.init(event.character);
					game.log(source,'出场');
					source.node.identity.dataset.color=get.translation(source.side+'Color');
					source.draw(4);
					var evt=event.getParent('dying');
					if(evt&&evt.parent){
						evt=evt.parent;
						evt.untrigger(false,source);
						for(var i=0;i<100;i++){
							evt=evt.parent;
							if(evt.player==source){
								evt.finish();
							}
							if(evt.name=='phase'){
								break;
							}
						}
					}
					if(lib.storage.single_control){
						game.onSwapControl();
					}
					game.triggerEnter(source);
					"step 3"
					// if(_status.currentPhase==source){
					// 	source.skip('phase');
					// }
				},
				replacePlayerTwo:function(){
					'step 0'
					var cards=source.getCards('hej');
					if(cards.length){
						source.$throw(cards,1000);
						game.cardsDiscard(cards);
					}
					game.delay();
					'step 1'
					source.revive(null,false);
					game.additionaldead.push({
						name:source.name,
						stat:source.stat
					});
					game.addVideo('reinit',source,[event.character,get.translation(source.side+'Color')]);
					source.uninit();
					source.init(event.character);
					game.log(source,'出场');
					// source.node.identity.dataset.color=source.side+'zhu';
					source.draw(4);
					var evt=event.getParent('dying');
					if(evt&&evt.parent){
						evt=evt.parent;
						evt.untrigger(false,source);
						for(var i=0;i<100;i++){
							evt=evt.parent;
							if(evt.player==source){
								evt.finish();
							}
							if(evt.name=='phase'){
								break;
							}
						}
					}
					game.triggerEnter(source);
				},
				replacePlayerOL:function(){
					'step 0'
					var cards=source.getCards('hej');
					if(cards.length){
						source.$throw(cards,1000);
						game.cardsDiscard(cards);
					}
					game.delay();
					'step 1'
					if(event.source.side==game.me.side){
						if(_status.friend.length==1){
							event.directresult=_status.friend[0];
						}
						else if(event.source==game.me){
							if(_status.auto){
								event.directresult=_status.friend.randomGet();
							}
						}
						else{
							if(!event.source.isOnline()){
								event.directresult=_status.friend.randomGet();
							}
						}
					}
					else{
						if(_status.enemy.length==1){
							event.directresult=_status.enemy[0];
						}
						else{
							if(!event.source.isOnline()){
								event.directresult=_status.enemy.randomGet();
							}
						}
					}
					if(!event.directresult){
						if(event.source==game.me){
							event.dialog=ui.create.dialog('选择替补角色',[_status.friend,'character']);
							event.filterButton=function(){return true};
							event.player=game.me;
							event.forced=true;
							event.custom.replace.confirm=function(){
								event.directresult=ui.selected.buttons[0].link;
								event.dialog.close();
								if(ui.confirm) ui.confirm.close();
								delete event.player;
								game.resume();
							}
							event.switchToAuto=function(){
								event.directresult=_status.friend.randomGet();
								event.dialog.close();
								if(ui.confirm) ui.confirm.close();
								delete event.player;
							};
							game.check();
							game.pause();
						}
						else{
							event.source.send(function(player){
								if(_status.auto){
									_status.event._result=_status.friend.randomGet();
								}
								else{
									var next=game.createEvent('replacePlayer');
									next.source=player;
									next.setContent(function(){
										event.dialog=ui.create.dialog('选择替补角色',[_status.friend,'character']);
										event.filterButton=function(){return true};
										event.player=event.source;
										event.forced=true;
										event.custom.replace.confirm=function(){
											event.result=ui.selected.buttons[0].link;
											event.dialog.close();
											if(ui.confirm) ui.confirm.close();
											delete event.player;
											game.resume();
											game.uncheck();
										}
										event.switchToAuto=function(){
											event.result=_status.friend.randomGet();
											event.dialog.close();
											if(ui.confirm) ui.confirm.close();
											delete event.player;
											game.uncheck();
										};
										game.check();
										game.pause();
									});
								}
								game.resume();
							},event.source);
							event.source.wait();
							game.pause();
						}
					}
					'step 2'
					game.uncheck();
					if(!event.directresult){
						if(event.resultOL){
							event.directresult=event.resultOL[source.playerid];
						}
						if(!event.directresult||event.directresult=='ai'){
							if(source.side==game.me.side){
								event.directresult=_status.friend.randomGet();
							}
							else{
								event.directresult=_status.enemy.randomGet();
							}
						}
					}
					var name=event.directresult;
					var color=source.node.identity.dataset.color;
					game.additionaldead.push({
						name:source.name,
						stat:source.stat
					});

					game.broadcastAll(function(source,name,color){
						_status.friend.remove(name);
						_status.enemy.remove(name);
						source.revive(null,false);
						source.uninit();
						source.init(name);
						source.node.identity.dataset.color=color;
						if(source==game.me){
							ui.arena.classList.remove('selecting');
						}
					},source,name,color);
					game.log(source,'出场');

					source.draw(4);
					var evt=event.getParent('dying');
					if(evt&&evt.parent){
						evt=evt.parent;
						evt.untrigger(false,source);
						for(var i=0;i<100;i++){
							evt=evt.parent;
							if(evt.player==source){
								evt.finish();
							}
							if(evt.name=='phase'){
								break;
							}
						}
					}
					game.addVideo('reinit',source,[name,color]);
					game.triggerEnter(source);
				},
			},
			player:{
				canBiShaShuiJing:function(){
					if(this.hasMark('_tiLian_b')||this.hasMark('_tiLian_r')){
                        return true;
                    }else{
						return false;
					}
				},
				canBiShaBaoShi:function(){
					if(this.hasMark('_tiLian_r')){
                        return true;
                    }else{
						return false;
					}
				},
				removeBiShaShuiJing:function(){
					var next=game.createEvent('removeBiShaShuiJing',false);
					next.player=this;
					next.setContent('removeBiShaShuiJing');
					return next;
				},
				removeBiShaBaoShi:function(){
					this.removeMark('_tiLian_r');
				},
				changeNengLiang:function(color,num){
					if(typeof num!='number'||!num) num=1;
					if(num>0){
						this.addMark('_tiLian_'+color,num)
					}else if(num<0){
						this.removeMark('_tiLian_'+color,-num)
					}
				},
				addNengLiang:function(color,num){
					if(typeof num!='number'||!num) num=1;
					var max=this.getNengLiangLimit();
					var current=this.countNengLiang('r')+this.countNengLiang('b');
					if(current+num>max){
						num=max-current;
					}
					if(num>0){
						this.addMark('_tiLian_'+color,num)
					}
				},
				removeNengLiang:function(color,num){
					if(typeof num!='number'||!num) num=-1;
					if(num>0) num=-num;
					var current=this.countNengLiang(color);
					if(current+num<0){
						num=-current;
					}
					if(num<0){
						this.removeMark('_tiLian_'+color,-num)
					}
				},
				countNengLiang:function(color){
					return this.countMark('_tiLian_'+color);
				},
				countNengLiangAll:function(){
					return this.countMark('_tiLian_r')+this.countMark('_tiLian_b');
				},
				damageFaShu:function(){
					var num,source;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							source=arguments[i];
						}
					}
					if(typeof num!='number'||!num) num=1;
					if(get.itemtype(source)!='player') source=this;
					this.damage(num,source).set('faShu',true);
				},
				addZhiShiWu:function(zhiShuWu,num,max){
					if(typeof num!='number'||!num) num=1;
					var info=get.info(zhiShuWu);
					if(typeof max=='number'){
						var max=max;
					}else if(info&&info.intro&&info.intro.max){
						var max=info.intro.max;
					}else{
						var max=Infinity;
					}
					var current=this.countMark(zhiShuWu);
					if(current+num>max){
						num=max-current;
					}
					if(num>0){
						this.addMark(zhiShuWu,num);
					}
				},
				countZhiShiWu:function(zhiShuWu){
					return this.countMark(zhiShuWu);
				},
				removeZhiShiWu:function(zhiShuWu,num){
					if(typeof num!='number'||!num) num=1;
					var current=this.countMark(zhiShuWu);
					if(current+num<0){
						num=-current;
					}
					if(num<0){
						this.removeMark(zhiShuWu,-num);
					}else if(num>0){
						this.removeMark(zhiShuWu,num);
					}
				},
				addZhanJi:function(color,num){
					if(typeof num!='number'||!num) num=1;
					if(this.side==true){
						if(!(game.hongZhanJi.length+num<=5)){
							num=5-game.hongZhanJi.length;
						}
					}else if(this.side==false){
						if(!(game.lanZhanJi.length+num<=5)){
							num=5-game.lanZhanJi.length;
						}
					}
					if(num>0){
						this.changeZhanJi(color,num);
					}
				},
				removeZhanJi:function(color,num){
					if(typeof num!='number'||!num) num=-1;
					if(num>0) num=-num;
					if(this.side==true){
						this.changeZhanJi(color,num);
					}else if(this.side==false){
						this.changeZhanJi(color,num);
					}
				},
				chongZhi:function(){
					if(this.isLinked()){
						this.link();
					}
				},
				hengZhi:function(){
					if(!this.isLinked()){
						this.link();
					}
				},

				dieAfter2:function(source){
					if(_status.connectMode&&_status.mode!='guandu'){
						if(_status.mode=='1v1'||_status.mode=='3v3') return;
						else if(_status.mode=='2v2'){
							var friend;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].side==this.side){
									friend=game.players[i];break;
								}
							}
							if(friend){
								var next=game.createEvent('versusDraw');
								next.setContent(function(){
									'step 0'
									player.chooseBool('是否摸一张牌？');
									'step 1'
									if(result.bool){
										player.draw();
									}
								});
								next.player=friend;
							}
						}
						else if(_status.mode=='4v4'){
							if(this.identity=='zhu') return;
							else{
								if(source){
									if(source.side==this.side){
										if(source.identity=='zhu'){
											source.discard(source.getCards('he'));
										}
									}
									else{
										var num1=0,num2=1;
										for(var i=0;i<game.players.length;i++){
											if(game.players[i].side==source.side){
												num1++;
											}
											else{
												num2++;
											}
										}
										source.draw(2+Math.max(0,num2-num1));
									}
								}
							}
							return;
						}
					}
					else{
						if(_status.mode=='four'||_status.mode=='guandu'){
							if(this.identity=='zhu') return;
							else{
								if(source){
									if(source.side==this.side){
										if(_status.mode=='guandu'||source.identity=='zhu'){
											source.discard(source.getCards('he'));
										}
									}
									else{
										if(_status.mode=='guandu') return;
										var num1=0,num2=1;
										for(var i=0;i<game.players.length;i++){
											if(game.players[i].side==source.side){
												num1++;
											}
											else{
												num2++;
											}
										}
										source.draw(2+Math.max(0,num2-num1));
									}
								}
							}
							return;
						}
						else if(_status.mode=='two'){
							var friend;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].side==this.side){
									friend=game.players[i];break;
								}
							}
							if(_status.replacetwo){
								if(this.replacetwo){
									if(source){
										if(source.side==this.side){
											var he=source.getCards('he');
											if(he.length){
												source.discard(he);
											}
										}
										else{
											source.draw(3);
										}
									}
								}
								else if(friend&&friend.replacetwo){
									if(source){
										if(source.side==this.side){
											var he=source.getCards('he');
											if(he.length){
												source.discard(he);
											}
										}
										else{
											source.draw(3);
										}
									}
								}
							}
							else{
								if(friend){
									var next=game.createEvent('versusDraw');
									next.setContent(function(){
										'step 0'
										player.chooseBool('是否摸一张牌？');
										'step 1'
										if(result.bool){
											player.draw();
										}
									});
									next.player=friend;
								}
							}
							return;
						}
						else if(_status.mode=='siguo') return;
						else if(_status.mode=='jiange') return;
						else if(_status.mode=='three'){
							if(this.identity=='zhu') return;
							else{
								game.friend.remove(this);
								game.enemy.remove(this);
								if(source){
									source.draw(2);
								}
							}
							return;
						}

						var list=(this.side==game.me.side)?_status.friend:_status.enemy;
						if((list.length==0&&lib.storage.noreplace_end)||
						(lib.storage.zhu&&lib.storage.main_zhu&&this.identity=='zhu'&&game.players.length>2)){
							return;
						}
						else if(game.friend.length==1&&this==game.friend[0]&&_status.friend.length==0){
							return;
						}
						else if(game.enemy.length==1&&this==game.enemy[0]&&_status.enemy.length==0){
							return;
						}
						else{
							if(source){
								if(source.side!=this.side){
									if(lib.storage.versus_reward){
										source.draw(lib.storage.versus_reward);
									}
								}
								else{
									if(lib.storage.versus_punish=='弃牌'){
										source.discard(source.getCards('he'));
									}
									else if(lib.storage.versus_punish=='摸牌'&&lib.storage.versus_reward){
										source.draw(lib.storage.versus_reward);
									}
								}
							}
							else{
								game.delay();
							}
						}
					}
				},
				dieAfter:function(source){
					if(_status.connectMode){
						if(_status.mode=='1v1'||_status.mode=='3v3'){
							game.broadcastAll(function(dead){
								if(dead.side==game.me.side){
									_status.friendDied.push(dead.name1);
									_status.friendCount.innerHTML='阵亡: '+get.cnNumber(_status.friendDied.length,true);
								}
								else{
									_status.enemyDied.push(dead.name1);
									_status.enemyCount.innerHTML='杀敌: '+get.cnNumber(_status.enemyDied.length,true);
								}
							},this);
							if(this.side==game.me.side){
								if(_status.friend.length==0){
									game.over(false);
									return;
								}
							}
							else{
								if(_status.enemy.length==0){
									game.over(true);
									return;
								}
							}
							game.replacePlayerOL(this);
						}
						else if(_status.mode=='2v2'){
							if(_status.replacetwo){
								// later ?
							}
							var friend;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].side==this.side){
									friend=game.players[i];break;
								}
							}
							if(!friend){
								game.over(this.side!=game.me.side);
							}
							else friend.showGiveup();
						}
						else if(_status.mode=='4v4'||_status.mode=='guandu'){
							if(this.identity=='zhu'){
								game.over(this.side!=game.me.side);
							}
							else{
								if(_status.mode=='guandu'&&source&&source.side!=this.side){
									var hs=this.getCards('h');
									if(hs.length) source.gain(hs,this,'giveAuto');
								}
								var side1=[],side2=[];
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].side){
										side1.push(game.players[i]);
									}
									else{
										side2.push(game.players[i]);
									}
								}
								if(side1.length==1){
									side1[0].showGiveup();
								}
								if(side2.length==1){
									side2[0].showGiveup();
								}
							}
							return;
						}
					}
					else{
						var me=game.me._trueMe||game.me;
						if(_status.mode=='four'||_status.mode=='guandu'){
							if(this.identity=='zhu'){
								game.over(this.side!=me.side);
							}
							else{
								if(_status.mode=='guandu'&&source&&source.side!=this.side){
									var hs=this.getCards('h');
									if(hs.length) source.gain(hs,this,'giveAuto');
								}
								var side1=[],side2=[];
								for(var i=0;i<game.players.length;i++){
									if(game.players[i].side){
										side1.push(game.players[i]);
									}
									else{
										side2.push(game.players[i]);
									}
								}
								if(me.side){
									if(side1.length<=side2.length-2){
										me.showGiveup();
									}
								}
								else{
									if(side1.length>=side2.length+2){
										me.showGiveup();
									}
								}
							}
							return;
						}
						else if(_status.mode=='two'){
							var friend;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].side==this.side){
									friend=game.players[i];break;
								}
							}
							if(_status.replacetwo){
								if(this.replacetwo){
									game.replacePlayerTwo(this,this.replacetwo);
									delete this.replacetwo;
								}
								else if(friend&&friend.replacetwo){
									game.replacePlayerTwo(this,friend.replacetwo);
									delete friend.replacetwo;
								}
								else{
									game.over(this.side!=me.side);
								}
							}
							else{
								if(!friend){
									game.over(this.side!=me.side);
								}
								else friend.showGiveup();
							}
							return;
						}
						else if(_status.mode=='siguo'){
							if(game.players.length==1||(game.players.length==2&&game.players[0].side==game.players[1].side)){
								game.over(me.side==game.players[0].side);
							}
							var assignzhibao=function(){
								var list=game.players.slice(0);
								var max=0;
								var list2=[];
								for(var i=0;i<arguments.length;i++){
									list.remove(arguments[i]);
								}
								for(var i=0;i<list.length;i++){
									if(list[i].storage.longchuanzhibao>max){
										max=list[i].storage.longchuanzhibao;
									}
								}
								for(var i=0;i<list.length;i++){
									if(list[i].storage.longchuanzhibao==max){
										if(list2.length){
											list2=list;break;
										}
										else{
											list2.push(list[i]);
										}
									}
								}
								for(var i=0;i<arguments.length;i++){
									for(var j=0;j<arguments[i].storage.longchuanzhibao;j++){
										var current=list2.randomGet();
										if(!current.storage._longchuanzhibao){
											current.storage._longchuanzhibao=1;
										}
										else{
											current.storage._longchuanzhibao++;
										}
									}
									for(var j=0;j<list2.length;j++){
										if(list2[j].storage._longchuanzhibao){
											arguments[i].line(list2[j],'green');
											list2[j].gainZhibao(list2[j].storage._longchuanzhibao,arguments[i]);
											delete list2[j].storage._longchuanzhibao;
										}
									}
								}
							};
							if(source){
								if(source.side==this.side){
									assignzhibao(this,source);
								}
								else{
									if(this.storage.longchuanzhibao){
										source.gainZhibao(true,this);
									}
								}
							}
							else{
								assignzhibao(this);
							}
							return;
						}
						else if(_status.mode=='jiange'){
							if(get.population('wei')==0){
								game.over(me.identity=='shu');
							}
							else if(get.population('shu')==0){
								game.over(me.identity=='wei');
							}
							return;
						}
						else if(_status.mode=='three'){
							if(this.identity=='zhu'){
								if(game.friend.contains(this)){
									game.over(false);
								}
								else{
									game.over(true);
								}
							}
							else{
								if(this==me){
									game.modeSwapPlayer(game.friendZhu);
								}
								game.friend.remove(this);
								game.enemy.remove(this);
							}
							return;
						}
						if(this.side==me.side){
							_status.friendDied.push(this.name1);
							_status.friendCount.innerHTML='阵亡: '+get.cnNumber(_status.friendDied.length,true);
						}
						else{
							_status.enemyDied.push(this.name1);
							_status.enemyCount.innerHTML='杀敌: '+get.cnNumber(_status.enemyDied.length,true);
						}

						var list=(this.side==me.side)?_status.friend:_status.enemy;
						if((list.length==0&&lib.storage.noreplace_end)||
						(lib.storage.zhu&&lib.storage.main_zhu&&this.identity=='zhu'&&game.players.length>2)){
							if(game.friend.contains(this)){
								game.over(false);
							}
							else{
								game.over(true);
							}
						}
						else if(game.friend.length==1&&this==game.friend[0]&&_status.friend.length==0){
							game.over(false);
						}
						else if(game.enemy.length==1&&this==game.enemy[0]&&_status.enemy.length==0){
							game.over(true);
						}
						else{
							game.replacePlayer(this);
						}
					}
				}
			}
		},
		get:{
			rawAttitude:function(from,to){
				if(from.side==to.side){
					if(to.identity=='zhu'){
						if(_status.connectMode){
							if(_status.mode=='4v4'||_status.mode=='guandu') return 7;
						}
						else{
							if(lib.storage.main_zhu||_status.mode=='four'||_status.mode=='guandu') return 7;
						}
					}
					return 6;
				}
				else{
					if(_status.mode=='siguo'){
						var list=['wei','shu','wu','qun'];
						var map={wei:0,shu:0,wu:0,qun:0};
						var map2={wei:0,shu:0,wu:0,qun:0};
						for(var i=0;i<game.players.length;i++){
							var current=game.players[i];
							map[current.side]+=get.condition(current)*get.threaten(current,false,false);
							map2[current.side]+=current.storage.longchuanzhibao;
						}
						var allin=false;
						for(var i in map){
							if(get.population(i)==1){
								map[i]/=1.5;
							}
							if(map2[i]>=4){
								allin=i;
								break;
							}
							else if(map2[i]==3){
								map[i]+=10;
							}
							else if(map2[i]==2){
								map[i]++;
							}
						}
						if(allin) return to.side==allin?-20:0;
						list.sort(function(a,b){
							return map[b]-map[a];
						});
						var id1=list.indexOf(from.side);
						var id2=list.indexOf(to.side);
						var att=-1;
						switch(id1){
							case 0:att=_status.siguoai[id2+2];break;
							case 1:
								switch(id2){
									case 0:att=_status.siguoai[0];break;
									case 2:att=_status.siguoai[1];break;
									case 3:att=_status.siguoai[2];break;
								}
								break;
							case 2:
								switch(id2){
									case 0:att=_status.siguoai[0];break;
									case 1:att=_status.siguoai[1];break;
									case 3:att=_status.siguoai[2];break;
								}
								break;
							case 3:{
								if(id2==0){
									att=_status.siguoai[1];break;
								}
								else{
									att=_status.siguoai[2];break;
								}
							}
						}
						if(map2[to.side]>=4){
							att-=10;
						}
						else if(map2[to.side]==3){
							att-=3;
						}
						else if(map2[to.side]==2){
							att-=0.5;
						}
						if(to.storage.longchuanzhibao){
							return att*1.2;
						}
						return att;
					}
					else{
						if(to.identity=='zhu'){
							if(_status.connectMode){
								if(_status.mode=='4v4'||_status.mode=='guandu') return -10;
							}
							else{
								if(lib.storage.main_zhu||_status.mode=='four'||_status.mode=='guandu') return -10;
							}
						}
						return -6;
					}
				}
			},
		},
		help:{
			
		}
	};
});
