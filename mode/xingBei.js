import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
	return {
		name:'xingBei',
		start:function(){
			"step 0"
			_status.mode=get.config('versus_mode');
			if(_status.connectMode) _status.mode=lib.configOL.versus_mode;

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
						switch(lib.configOL.versus_mode){
							case '2v2':lib.configOL.number=4;break;
							case '3v3':lib.configOL.number=6;break;
							case '4v4':lib.configOL.number=8;break;
						}
					}
					
				});
			}else if(_status.mode=='two'){
				game.prepareArena(4);
			}else if(_status.mode=='three'){
				game.prepareArena(6);
			}else if(_status.mode=='four'){
				game.prepareArena(8);
			}
			// game.delay();
			"step 2"
			if(_status.connectMode){
				if(lib.configOL.phaseswap){
					switch(lib.configOL.versus_mode){
						case '2v2':lib.configOL.number=4;break;
						case '3v3':lib.configOL.number=6;break;
						case '4v4':lib.configOL.number=8;break;
					}
				}
				game.randomMapOL();
			}
			else{
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				game.chooseCharacter();
			}
			"step 3"
			if(_status.connectMode){
				_status.mode=lib.configOL.versus_mode;
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
			if(get.phaseswap()){
				info.push(true);
			}else{
				info.push(false);
			}
			if(lib.configOL.onlyChooseCharacter){
				game.pause();
			}else{
				game.addVideo('init',null,info);
				event.trigger('gameStart');
			}

            'step 4'
			var firstChoose=(_status.firstAct||game.players.randomGet());
			game.gameDraw(firstChoose);
            game.phaseLoop(firstChoose);
		},
		game:{
			versusHoverHandcards: function () {
				var uiintro = ui.create.dialog("hidden");
				var added = false;
				for (var i = 0; i < game.players.length; i++) {
					if (game.players[i].name && game.players[i].side == game.me.side && game.players[i] != game.me) {
						added = true;
						uiintro.add(get.translation(game.players[i]));
						var cards = game.players[i].getCards("h");
						if (cards.length) {
							uiintro.addSmall(cards, true);
						} else {
							uiintro.add("（无）");
						}
					}
				}
				if (added) return uiintro;
			},

			checkResult:function(){
				var me = game.me._trueMe || game.me;
				if(me.side==true){
					if(game.hongShiQi<=0||game.lanXingBei>=game.xingBeiMax){
						game.over(false);
					}else if(game.lanShiQi<=0||game.hongXingBei>=game.xingBeiMax){
						game.over(true);
					}

				}
				else if(me.side==false){
					if(game.lanShiQi<=0||game.hongXingBei>=game.xingBeiMax){
						game.over(false);
					}else if(game.hongShiQi<=0||game.lanXingBei>=game.xingBeiMax){
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
				if(lib.configOL.versus_mode=='4v4'){
					uiintro.add('<div class="text chat">队伍顺序：随机');
				}else{
					switch(lib.configOL.choose_mode){
						case '多选1':uiintro.add('<div class="text chat">选角模式：多选1');break;
						case 'CM01':uiintro.add('<div class="text chat">选角模式：CM01');break;
						case 'CM02':uiintro.add('<div class="text chat">选角模式：CM02');break;
						case 'BP01':uiintro.add('<div class="text chat">选角模式：BP01');break;
						case 'BP02':uiintro.add('<div class="text chat">选角模式：BP02');break;
						case 'jiuGuan':uiintro.add('<div class="text chat">选角模式：酒馆');break;
					}
					if(lib.configOL.choose_mode!='CM02'&&lib.configOL.choose_mode!='CM01'){
						switch(lib.configOL.team_sequence){
							case 'random':uiintro.add('<div class="text chat">队伍顺序：随机');break;
							case 'near':uiintro.add('<div class="text chat">队伍顺序：临近');break;
							case 'crossed':uiintro.add('<div class="text chat">队伍顺序：交叉');break;
							case 'CM':uiintro.add('<div class="text chat">队伍顺序：CM');break;
						}
						if(lib.configOL.choose_mode=='BP02'||lib.configOL.choose_mode=='BP01'){
							var last=uiintro.add('<div class="text chat">可选角色数：'+lib.configOL.BPchoose_number);
						}else{
							var last=uiintro.add('<div class="text chat">侯选角色数：'+lib.configOL.choose_number);
						}
					}
				}
				if(!lib.configOL.phaseswap){
					switch(lib.configOL.viewHandcard){
						case true:uiintro.add('<div class="text chat">可见队友手牌：是');break;
						case false:uiintro.add('<div class="text chat">可见队友手牌：否');break;
					}
					switch(lib.configOL.chooseSide){
						case true:uiintro.add('<div class="text chat">手动选择选队：是');break;
						case false:uiintro.add('<div class="text chat">手动选择选队：否');break;
					}
				}
				var last=uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用角色：'+get.translation(lib.configOL.banned));
				}
				/*
				if(lib.configOL.bannedcards.length){
					last=uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}*/
				last=uiintro.add('<div class="text chat">士气初始值：'+get.translation(lib.configOL.shiQiMax||game.shiQiMax));
				last=uiintro.add('<div class="text chat">战绩区上限：'+get.translation(lib.configOL.zhanJiMax||game.zhanJiMax));
				last=uiintro.add('<div class="text chat">星杯上限：'+get.translation(lib.configOL.xingBeiMax||game.xingBeiMax));

				last.style.paddingBottom='8px';
			},
			getVideoName:function(){
				var str2;
				if(get.phaseswap()){ 
					var str='';
					if(_status.mode=='two') str+='2v2';
					else if(_status.mode=='three') str+='3v3';
					else if(_status.mode=='four') str+='4v4';
					else if(_status.mode=='2v2') str+='2v2';
					else if(_status.mode=='3v3') str+='3v3';
					else if(_status.mode=='4v4') str+='4v4';
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
					switch(_status.mode){
						case 'two':str2='2v2';break;
						case 'three':str2='3v3';break;
					   	case 'four':str2='4v4';break;
					  	case '2v2':str2='2v2';break;
					   	case '3v3':str2='3v3';break;
					   	case '4v4':str2='4v4';break;
					}
				}
				if(game.me.side==true) str+='（红方）';
				else str+='（蓝方）';

				return [str,str2];
			},
			
			
			chooseCharacter:function(){
				if(get.config('phaseswap')){
					game.chooseCharacterPhaseswap();
				}else{
					switch(get.config('choose_mode')){
						case '多选1':game.chooseCharacterDuoXuanYi();break;
						//case 'CM02':game.chooseCharacterCM02();break;
					}
				}
				
			},
			chooseCharacterDuoXuanYi:function(){
				var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					var number=game.players.length;
					var choose_number=get.config('choose_number');
					ui.arena.classList.add('choose-character');
					
					var list=game.teamSequenceList();
					var ref=game.players.randomGet();
					for(var i=0;i<number;i++){
						ref.side=list[i];
						ref=ref.next;
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
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}
					//22选将框分配
					var list=get.characters();

					event.list=list;
					

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
									else if(game.players[i].side==false){
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

					var characterChoice=list.randomGets(choose_number);

					var basenum=1;
					var basestr='选择角色';
					if(get.config('phaseswap')){
						basenum =number/2;
						basestr='选择你和队友的角色';
						event.phaseswap=true;
					}

					var dialog=ui.create.dialog(basestr,[characterChoice,"characterx"]);
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
					if(lib.onfree){
						lib.onfree.push(function(){
							event.dialogxx=ui.create.characterDialog('heightset');
							if(ui.cheat2){
								ui.cheat2.addTempClass('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					}
					else{
						event.dialogxx=ui.create.characterDialog('heightset');
					}
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
					if(event.phaseswap){
						for(var i=1;i<result.links.length;i++){
							event.list.remove(result.links[i]);
						}
					}
					event.list.remove(game.me.name1);
					if(lib.characterReplace[game.me.name1]&&lib.characterReplace[game.me.name1].length){
						event.list.removeArray(lib.characterReplace[game.me.name1]);
					}
					let count=0;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							if(_status.brawl&&_status.brawl.chooseCharacter){
								var list=_status.brawl.chooseCharacter(event.list,game.players[i]);
								game.players[i].init(list.randomGet());
								event.list.remove(game.players[i].name1);
							}
							else{
								if(event.phaseswap&&game.players[i].side==game.me.side){
									count++;
									game.players[i].init(result.links[count]);
								}
								else{
									var name=event.list.randomRemove();
									if(lib.characterReplace[name]&&lib.characterReplace[name].length) name=lib.characterReplace[name].randomGet();
									game.players[i].init(name);
								}
							}
						}
					}

					'step 2'
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					var viewHandcard=get.config('viewHandcard');
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}

					if(get.config('phaseswap')){
						game.addGlobalSkill('autoswap');
					}
					
				});
			},
			chooseCharacterPhaseswap:function(){
				var next=game.createEvent('chooseCharacter');
				next.showConfig=true;
				next.setContent(function(){
					'step 0'
					var number=game.players.length;
					var choose_number=get.config('choose_number');
					ui.arena.classList.add('choose-character');
					
					var list=game.teamSequenceList();
					var ref=game.players.randomGet();
					for(var i=0;i<number;i++){
						ref.side=list[i];
						ref=ref.next;
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
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					ui.arena.setNumber(number+1);
					for (var i = 0; i < game.players.length; i++) {
						game.players[i].dataset.position = parseInt(game.players[i].dataset.position) + 1;
					}
					
					game.singleHandcard = true;
					ui.arena.classList.add("single-handcard");
					ui.window.classList.add("single-handcard");
					ui.fakeme = ui.create.div(".fakeme.avatar");
					ui.me.appendChild(ui.fakeme);

					var list=get.characters();
					event.list=list;

					var characterChoice=list.randomGets(choose_number);
					var basenum=number/2;
					var basestr=game.me.side?'（红方）':'（蓝方）';
					basestr+='选择你和队友的角色，按顺位选择';
					
					var dialog=ui.create.dialog(basestr,[characterChoice,'characterx']);
					game.me.chooseButton(true,dialog,basenum).set('onfree',true);

					if(lib.onfree){
						lib.onfree.push(function(){
							event.dialogxx=ui.create.characterDialog('heightset');
							if(ui.cheat2){
								ui.cheat2.addTempClass('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					}
					else{
						event.dialogxx=ui.create.characterDialog('heightset');
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
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(ui.cheat2){
						ui.cheat2.close();
						delete ui.cheat2;
					}
					
					if (lib.config.show_handcardbutton) {
						ui.versushs = ui.create.system("手牌", null, true);
						lib.setPopped(ui.versushs, game.versusHoverHandcards, 220);
					}
					_status.characterList = result.links.slice();
					for(var i=0;i<result.links.length;i++){
						game.addRecentCharacter(result.links[i]);
						event.list.remove(result.links[i]);
						if(lib.characterReplace[result.links[i]]&&lib.characterReplace[result.links[i]].length){
							event.list.removeArray(lib.characterReplace[result.links[i]]);
						}
					}
					let count=0;
					var player=_status.firstAct;
					for(var i=0;i<game.players.length;i++){
						if(player.side==game.me.side){
							player.init(result.links[count]);
							count++;
						}
						else{
							var name=event.list.randomRemove();
							if(lib.characterReplace[name]&&lib.characterReplace[name].length) name=lib.characterReplace[name].randomGet();
							player.init(name);
						}
						player=player.next;
					}
					if(get.config('phaseswap')){
						game.addGlobalSkill('autoswap');
					}
					game.onSwapControl();
				});
			},

			chooseCharacterOL:function(){
				if(get.phaseswap()){
					switch(lib.configOL.choose_mode){
						case '多选1':game.chooseCharacterOLPhaseswapDuoXuanYi();break;
						case 'CM01':game.chooseCharacterOLCM();break;
						case 'CM02':game.chooseCharacterOLCM();break;
						case 'BP01':game.chooseCharacterOLBP();break;
						case 'BP02':game.chooseCharacterOLBP();break;
						case 'jiuGuan':game.chooseCharacterOLJiuGuan();break;
					}
				}else if(lib.configOL.versus_mode=='4v4'){
					game.chooseCharacterOLDuoXuanYi();
				}else{
					switch(lib.configOL.choose_mode){
						case '多选1':game.chooseCharacterOLDuoXuanYi();break;
						case 'CM01':game.chooseCharacterOLCM();break;
						case 'CM02':game.chooseCharacterOLCM();break;
						case 'BP01':game.chooseCharacterOLBP();break;
						case 'BP02':game.chooseCharacterOLBP();break;
						case 'jiuGuan':game.chooseCharacterOLJiuGuan();break;
					}	
				}
			},
			
			chooseSide:function(){
				var next=game.createEvent('chooseSide');
				next.setContent(function(){
					'step 0'
					var sides=['红方','蓝方'];
					var list=game.players.map(player=>[player,['选择阵营',[sides,'tdnodes']],true]);
					game.me.chooseButtonOL(list,function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						return {
							bool:true,
							links:[buttons.randomGet().link],
						}
					});
					'step 1'
					var red=0;
					var blue=0;
					var number=lib.configOL.number;
					for (var i in result) {//优先计算真人的选择
						if(lib.playerOL[i].isOnline() || (lib.playerOL[i]==game.me&& !_status.auto)){
							if (result[i].links[0] == "红方") {
								lib.playerOL[i].side=true;
							}else{
								lib.playerOL[i].side=false;
							}
	
							if(lib.playerOL[i].side==true) red++;
							else blue++;

							if(red>number/2){
								lib.playerOL[i].side=false;
								red--;
								blue++;
							}else if(blue>number/2){
								lib.playerOL[i].side=true;
								blue--;
								red++;
							}
						}
					}

					for (var i in result) {//计算ai的选择
						if((lib.playerOL[i]!=game.me && !lib.playerOL[i].isOnline()) || (lib.playerOL[i]==game.me && _status.auto)){
							if (result[i].links[0] == "红方") {
								lib.playerOL[i].side=true;
							}else{
								lib.playerOL[i].side=false;
							}
	
							if(lib.playerOL[i].side==true) red++;
							else blue++;
							if(red>number/2){
								lib.playerOL[i].side=false;
								red--;
								blue++;
							}else if(blue>number/2){
								lib.playerOL[i].side=true;
								blue--;
								red++;
							}
							
						}	
					}
				});
			},

			chooseSidePhaseswap:function(){
				var next=game.createEvent('chooseSide');
				next.setContent(function(){
					'step 0'
					var sides=['红方','蓝方'];
					var players=game.players.filter(player=>player.isOnline()||player==game.me);
					var list=players.map(player=>[player,['选择阵营',[sides,'tdnodes']],true]);
					game.me.chooseButtonOL(list,function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						return {
							bool:true,
							links:[buttons.randomGet().link],
						}
					});
					'step 1'
					var red=0;
					var blue=0;
					var number=2;
					for (var i in result) {//优先计算真人的选择
						if(lib.playerOL[i].isOnline() || (lib.playerOL[i]==game.me)){
							if (result[i].links[0] == "红方") {
								lib.playerOL[i].side=true; 
							}else{
								lib.playerOL[i].side=false;
							}
	
							if(lib.playerOL[i].side==true) red++;
							else blue++;
							if(red>number/2){
								lib.playerOL[i].side=false;
								red--;
								blue++;
							}else if(blue>number/2){
								lib.playerOL[i].side=true;
								blue--;
								red++;
							}
						}
					}
					var number=game.players.length;
					for(var player of game.players){
						if(player!=game.me && !player.isOnline()){
							if(typeof player.side != 'boolean'){
								if(red<number/2){
									player.side=true;
									red++;
								}else{
									player.side=false;
									blue++;
								}
							}
						}
						
					}
				});
			},

			moveSeat:function(ref){
				var list=game.teamSequenceList();
				var players=game.players;
				let trueToSwap = [];
				let falseToSwap = [];

				for (let i = 0; i < players.length; i++) {
					if (ref.side !== list[i]) {
						if (list[i] === true && ref.side === false) {
							trueToSwap.push(ref);
						} else if (list[i] === false && ref.side === true) {
							falseToSwap.push(ref);
						}
					}
					ref=ref.next;
				}
				while (trueToSwap.length > 0 && falseToSwap.length > 0) {
					const truePlayer = trueToSwap.pop();
					const falsePlayer = falseToSwap.pop();
					game.broadcastAll(function(truePlayer,falsePlayer){
						game.swapSeat(truePlayer,falsePlayer,false,false,true);
					},truePlayer,falsePlayer)
				}
			},

			getFirstRed:function(){
				var ref=game.players.randomGet();;
				while (ref.side!=true) {//确保红队第一个
					ref=ref.next;
				}
				return ref
			},

			teamSequenceList:function(){
				var number,team_sequence,mode;
				if(_status.connectMode){
					number=lib.configOL.number;
					team_sequence=lib.configOL.team_sequence;
					mode=lib.configOL.choose_mode;
					if(mode=='CM02'||mode=='CM01'){
						team_sequence='CM';
					}
				}else{
					number=game.players.length;
					team_sequence=get.config('team_sequence');
				}
				
				var list=[];
				if(number==4){
					if(team_sequence=='CM'){
						list=[true,false,false,true];
					}else if(team_sequence=='near'){
						list=[true,true,false,false];
					}else if(team_sequence=='crossed'){
						list=[true,false,true,false];
					}else{
						list=[false,false,true];
						list.randomSort();
						list.unshift(true);
					}
				}else if(number==6){
					if(team_sequence=='CM'){
						list=[true,false,false,true,true,false];
					}else if(team_sequence=='near'){
						list=[true,true,true,false,false,false];
					}else if(team_sequence=='crossed'){
						list=[true,false,true,false,true,false];
					}else{
						list=[true,true,false,false,false];
						list.randomSort();
						list.unshift(true);
					}
				}else if(number==8){
					list=[true,true,false,false,false,true,false];
					list.randomSort();
					list.unshift(true);
				}
				return list;
			},
			
			chooseCharacterOLDuoXuanYi:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){//自由选择队伍
						game.chooseSide();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					var number=lib.configOL.number;
					if(chooseSide){
						var ref=game.getFirstRed();
						if(team_sequence!='random'&&number!=8) game.moveSeat(ref);
					}else{
						var ref=game.assignPlayerSides();
					}
					
					var choose_number=parseInt(lib.configOL.choose_number);
					
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
						else if(game.players[i].side==false){
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


					
					
					//22联机分配角色
					var list=get.charactersOL();
					list=get.characterGets(list);
					var choose={};
					event.list=list;

					//推荐队友选将
					//给所有人生成对话框
					for(var i=0;i<game.players.length;i++){
						choose[game.players[i].playerid]=list.randomRemove(choose_number);
					}
					//每名玩家的可选角色
					game._characterChoice=choose;
					event._choiceMap={};
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(id,choice){
						game._characterChoice=choice;
						game._characterDialogID=id;
						var dialog=ui.create.dialog('请选择角色');
						dialog.videoId=id;
						var players;
						var player=game.me;
						for(var i in choice){
							var current=lib.playerOL[i];
							if(current==player) players=choice[i];
						}
						//dialog.addText('你的选将框');
						var buttons=ui.create.div('.buttons',dialog.content);
						dialog.players=ui.create.buttons(players,'characterx',buttons)
						dialog.buttons=dialog.buttons.concat(dialog.players);
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
							//if(dialog.friends&&dialog.friends.includes(button)) return 0;
							//if(dialog.classList.includes('glow2')) return 1+Math.random();
							return 0.5+Math.random();
						});
						//修改点击按钮后的反应
						next.set('custom',{replace:{
							button:function(button){
								var dialog=get.idDialog(game._characterDialogID);
								var origin=button._link,choice=button.link;
								//选择按钮时自动取消选择上一个按钮
								if(dialog.players.includes(button)){
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
							}
						},add:{}});
						if(game.online) game.resume();
					}

					//确认选将后的回传函数
					event.confirm=function(player,choice){
						if(!player.name1) player.init(choice,null,null,false);
						if(game._characterDialogID==undefined) return;
						var dialog=get.idDialog(game._characterDialogID);
						if(!dialog) return;
					}
					//处理result
					var sendback=function(result,player){
						var type=typeof result;
						if(result&&type=='object'){
							var choice=result.links[0];
							event._choiceMap[player.playerid]=choice;
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
								if(target._aiChoice&&list.includes(target._aiChoice)) choice=target._aiChoice;
								else choice=list.randomGet();
								if(lib.characterReplace[choice]) choice=lib.characterReplace[choice].randomGet();
								event.sendback({
									result:true,
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
					
					'step 2'
					if(event.withme){
						game.me.unwait(result);
					}
					'step 3'
					if(event.withol&&!event.resultOL){
						game.pause();
					}
					'step 4'
					if(event.ai_targets.length>0){
						event.withai=true;
						game.pause();
					}	
					'step 5'
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
					
					var viewHandcard=lib.configOL.viewHandcard;
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}
					

				});
			},

			chooseCMCharacter: function(red_leader,blue_leader){
				var next=game.createEvent('choose18CharacterCM02');
				next.set('red_leader',red_leader);
				next.set('blue_leader',blue_leader);
				next.setContent(function(){
					'step 0'
					var mode=lib.configOL.choose_mode;
					if(mode=='CM02'){
						event.choose_number=27;
						var splitNum=9;
					}else if(mode=='CM01'){
						event.choose_number=24;
						var splitNum=8;
					}

					var list = get.charactersOL();
					list = get.characterGets(list,event.choose_number);
					//三堆
					event.list1 = list.slice(0, splitNum);
					event.list2 = list.slice(splitNum, 2*splitNum);
					event.list3 = list.slice(2*splitNum, 3*splitNum);
					event.videoId = lib.status.videoId++;
					event.list = [];

					game.log('<span style="color: blue;">蓝色堆</span>：', event.list1);
					game.log('<span style="color: green;">绿色堆</span>：', event.list2);
					game.log('<span style="color: red;">红色堆</span>：', event.list3);

					var createDialog = function(list,list1,list2,list3,id, choosing){
						ui.arena.classList.add('choose-character');
						var dialog = ui.create.dialog('<span style="color:red;">红方</span>队长选择特定颜色角色堆', [list, 'character']);
						dialog.classList.add("fullwidth");
						dialog.classList.add("fullheight");
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.videoId = id;
						if (choosing != game.me) {
							dialog.content.firstChild.innerHTML = "等待<span style='color:red;'>红方</span>队长选择角色堆";
						}
						for (var i = 0; i < dialog.buttons.length; i++) {
                            var button = dialog.buttons[i];
                            if (list1.includes(button.link)) {
                                button.classList.add("pool-blue");
                            } else if (list2.includes(button.link)) {
                                button.classList.add("pool-green");
                            }else if (list3.includes(button.link)) {
                                button.classList.add("pool-red");
                            }
                        }
					};
					game.broadcastAll(createDialog, list, event.list1, event.list2, event.list3, event.videoId, event.red_leader);
					event.chooseList=['蓝色','绿色','红色'];
					var next= event.red_leader.chooseControl(event.chooseList);
					next.set('dialog', event.videoId);
					'step 1'
					event.chooseList.remove(result.control);
					var str='<span style="color: red;">红方</span>队长选择了';
					if(result.control=='蓝色'){
						str+='<span style="color: blue;">蓝色</span>堆';
						event.list.addArray(event.list1);
					}else if(result.control=='绿色'){
						str+='<span style="color: green;">绿色</span>堆';
						event.list.addArray(event.list2);
					}else if(result.control=='红色'){
						str+='<span style="color: red;">红色</span>堆';
						event.list.addArray(event.list3);
					}
					game.log(str);
					var changeDialogContent=function(id,choosing) {
						var dialog = get.idDialog(id);
						var str;
						if(game.me!=choosing){
							str="等待<span style='color:blue;'>蓝方</span>队长选择特定颜色角色堆";
						}else{
							str="<span style='color:blue;'>蓝方</span>队长选择特定颜色角色堆";
						}
						dialog.content.firstChild.innerHTML = str;
					};
					game.broadcastAll(changeDialogContent, event.videoId,event.blue_leader);
					'step 2'
					var next= event.blue_leader.chooseControl(event.chooseList);
					next.set('dialog', event.videoId);
					'step 3'
					var str='<span style="color: blue;">蓝方</span>队长选择了';
					if(result.control=='蓝色'){
						str+='<span style="color: blue;">蓝色</span>堆';
						event.list.addArray(event.list1);
					}else if(result.control=='绿色'){
						str+='<span style="color: green;">绿色</span>堆';
						event.list.addArray(event.list2);
					}else if(result.control=='红色'){
						str+='<span style="color: red;">红色</span>堆';
						event.list.addArray(event.list3);
					}
					game.log(str);
					event.getParent().list= event.list;

					var closeDialog = function(id) {
						ui.arena.classList.remove('choose-character');
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					};
					game.broadcastAll(closeDialog, event.videoId);
				});
			},

			chooseCharacterOLCM:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					event.number=lib.configOL.number;
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){
						game.chooseSideAuto();
					}
					'step 1'
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){
						var ref=game.getFirstRed();
						game.moveSeat(ref);
					}else{
						var ref=game.assignPlayerSides();
					}
					var mode=lib.configOL.choose_mode;
					//console.log('mode',mode);
					if(event.number==4){
						event.red_list=[ref,ref.previous];
						event.blue_list=[ref.next,ref.next.next];
						var R1=ref;
						var R2=ref.next.next.next;
						var B1=ref.next;
						var B2=ref.next.next;
						if(mode=='CM02') event.choose_list=[R1,B1,B2,R2];
						else event.choose_list=[R1,B1,R2,B2];
					}else{
						event.red_list=[ref,ref.next.next.next,ref.next.next.next.next];
						event.blue_list=[ref.next,ref.next.next,ref.previous];
						var R1=ref;
						var R2=ref.next.next.next;
						var R3=ref.next.next.next.next;
						var B1=ref.next;
						var B2=ref.next.next;
						var B3=ref.previous;
						if(mode=='CM02') event.choose_list=[R1,B1,R2,B2,B3,R3];
						else event.choose_list=[R1,B1,R2,B2,R3,B3];
					}
					
					//console.log('choose_list',event.choose_list);
					var firstChoose=ref;
					_status.firstAct=firstChoose;
					for(var i=0;i<event.number;i++){
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

					if(get.phaseswap()){
						for (var i = 0; i < game.players.length; i++) {
							ref.dataset.position = i + 1;
							ref=ref.next;
						}
					}

					var map={};
					for(var i=0;i<event.number;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML];
						if(get.phaseswap()) map[game.players[i].playerid].push(game.players[i].dataset.position);
					}

					var func=function(map){
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
								if(map[i][3]) player.dataset.position=map[i][3];
							}
						}
						if(lib.configOL.phaseswap){
							ui.arena.setNumber(lib.configOL.number+1);
							game.singleHandcard = true;
							ui.arena.classList.add("single-handcard");
							ui.window.classList.add("single-handcard");
							ui.fakeme = ui.create.div(".fakeme.avatar");
							ui.me.appendChild(ui.fakeme);
						}
					}

					game.broadcastAll(func,map);

					if(get.phaseswap()){
						event.goto(4);
						game.addGlobalSkill('autoswap');
					}
					'step 2'
					if(event.number==4){
						event.red_vote=[0,0];
						event.blue_vote=[0,0];
					}else{
						event.red_vote=[0,0,0];
						event.blue_vote=[0,0,0];
					}

					
					var list=game.players.map(function(player){
						let dialog;
						if(player.side==true){
							if(event.number==4) dialog=["一号位", "四号位"];
							else dialog=["一号位", "四号位", "五号位"];
						}else{
							if(event.number==4) dialog=["二号位", "三号位"];
							else dialog=["二号位", "三号位", "六号位"];
						}
						return [player,['投票选择队长',[dialog,'tdnodes']],true];
					});
					game.me.chooseButtonOL(list).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						return {
							bool:true,
							links:[buttons.randomGet().link],
						}
					});

					'step 3'
					var list=[];
					for(var i in result){
						list.push(result[i].links[0]);
					}
					var result=list;
					for(var i of result){
						if(event.number==4){
							switch(i){
								case "一号位":event.red_vote[0]++;break;
								case "四号位":event.red_vote[1]++;break;
								case "二号位":event.blue_vote[0]++;break;
								case "三号位":event.blue_vote[1]++;break;
							}
						}else{
							switch(i){
								case "一号位":event.red_vote[0]++;break;
								case "四号位":event.red_vote[1]++;break;
								case "五号位":event.red_vote[2]++;break;
								case "二号位":event.blue_vote[0]++;break;
								case "三号位":event.blue_vote[1]++;break;
								case "六号位":event.blue_vote[2]++;break;
							}
						}
					}

					'step 4'
					if(get.phaseswap()){
						let list=game.getActivePlayersBySide();
						if(list[0].side==true){
							event.red_leader=list[0];
						}else{
							event.red_leader=event.red_list[0];
						}
						if(list[1].side==false){
							event.blue_leader=list[1];
						}else{
							event.blue_leader=event.blue_list[0];
						}
					}else{
						var red_index=0;
						var red_max=0;
						var blue_index=0;
						var blue_max=0;
						for(var i=0;i<event.red_vote.length;i++){
							if(event.red_vote[i]>red_max){
								red_max=event.red_vote[i];
								red_index=i;
							}
						}
						for(var i=0;i<event.blue_vote.length;i++){
							if(event.blue_vote[i]>blue_max){
								blue_max=event.blue_vote[i];
								blue_index=i;
							}
						}
						event.red_leader=event.red_list[red_index];
						event.blue_leader=event.blue_list[blue_index];
					}
					
					game.log('<span style="color:red;">红方</span>队长为',event.red_leader.node.name.innerHTML);
					game.log('<span style="color:lightblue;">蓝方</span>队长为',event.blue_leader.node.name.innerHTML);
					game.broadcastAll(function(red_leader,blue_leader){
						game.red_leader=red_leader;
						game.blue_leader=blue_leader;
					},event.red_leader,event.blue_leader);
					game.delay(2);

					event.list=[];
					game.chooseCMCharacter(event.red_leader,event.blue_leader);
					'step 5'//ban角色
					//角色列表
					game.log('本局可选角色：',event.list);
					event.choosing=game.red_leader;
					event.videoId = lib.status.videoId++;
					event.red_chooseList = [];
					event.blue_chooseList = [];

					var createDialog = function (list, id, list1, list2) {
						var dialog = ui.create.dialog("<span style='color:red;'>红方</span>队长Ban1名角色", [list, "character"]);
						dialog.classList.add("fullwidth");
						dialog.classList.add("fullheight");
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.videoId = id;
						if (list1 && list2) {
							ui.arena.classList.add("playerhidden");
							for (var i = 0; i < dialog.buttons.length; i++) {
								var button = dialog.buttons[i];
								if (list1.includes(button.link)) {
									button.classList.add("selectedx");
								} else if (list2.includes(button.link)) {
									button.classList.add("glow");
								}
							}
						} else {
							if (list1 != game.me&&list1==game.red_leader) {
								dialog.content.firstChild.innerHTML = "等待<span style='color:red;'>红方</span>队长Ban选";
							}else if(list1!=game.me&&list1==game.blue_leader){
								dialog.content.firstChild.innerHTML = "等待<span style='color:lightblue;'>蓝方</span>队长Ban选";
							}
						}
					};
					
					game.broadcastAll(createDialog, event.list, event.videoId, event.choosing);
					event.num=1;
					event.selected = [];
					_status.firstChoose = event.choosing;
					_status.onreconnect = [
						createDialog,
						event.list,
						event.videoId,
						event.red_chooseList,
						event.blue_chooseList
					];
					'step 6'
					var next = event.choosing.chooseButton(event.videoId, event.num, true);
					next.set("filterButton", function (button) {
						if (_status.event.selected.includes(button.link)) return false;
						return true;
					});
					next.set("selected", event.selected);
					next.set("ai", function () {
						return Math.random();
					});
					'step 7'
					game.broadcastAll(
						function (links, choosing, first, id) {
							var dialog = get.idDialog(id);
							if (dialog) {
								if (choosing == game.red_leader) {
									choosing1 = "<span style='color:red;'>红方</span>队长";
									choosing2 = "<span style='color:lightblue;'>蓝方</span>队长";
								} else {
									choosing2 = "<span style='color:lightblue;'>蓝方</span>队长";
								}
								dialog.content.firstChild.innerHTML =
									choosing1 + "Ban了" + get.translation(links)+`，等待` + choosing2 + "Ban2名角色";
								for (var i = 0; i < dialog.buttons.length; i++) {
									if ((dialog.buttons[i].link == links[0])||(dialog.buttons[i].link == links[1])) {
										if (first) {
											dialog.buttons[i].classList.add("selectedx");
										} else {
											dialog.buttons[i].classList.add("glow");
										}
									}
								}
							}
						},
						result.links,
						event.choosing,
						event.choosing == _status.firstChoose,
						event.videoId
					);
					event.selected.addArray(result.links);
					if(event.choosing==game.blue_leader){
						event.blue_chooseList.addArray(result.links);
					}else{
						event.red_chooseList.addArray(result.links);
					}

					if (event.choosing == game.red_leader) {
						var str = "<span style='color:red;'>红方</span>队长";
					} else {
						var str = "<span style='color:lightblue;'>蓝方</span>队长";
					}
					game.log(str,'Ban',result.links);

					for(var i=0;i<result.links.length;i++){
						event.list.remove(result.links[i]);
					}
					if(event.choosing==game.blue_leader){
						event.choosing=game.red_leader;
					}else{
						event.choosing=game.blue_leader;
					}
					event.num++;
					if (event.num<=2) {
						event.goto(6);
					}
					'step 8'
					game.delay(2);
					'step 9'
					game.broadcastAll(function (id) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);
					//为各方队友选择角色
					'step 10'
					//设置第一次提示
					event.choosed=event.choose_list[0];
					//console.log(event.choosed.node.name.innerHTML);
					event.choosing=game.blue_leader;
					event.red_chooseList = [];
					event.blue_chooseList = [];
					event.selected = [];

					event.videoId = lib.status.videoId++;
					var createDialog = function (choosed,list, id,list1, list2) {
						var dialog = ui.create.dialog(`<span style="color:red;">红方</span>为${choosed}选择角色，<span style="color:lightblue;">蓝方</span>队长是否插入Ban`, [list, "characterx"]);
						dialog.classList.add("fullwidth");
						dialog.classList.add("fullheight");
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.videoId = id;
						if (list1 && list2) {
							ui.arena.classList.add("playerhidden");
							for (var i = 0; i < dialog.buttons.length; i++) {
								var button = dialog.buttons[i];
								if (list1.includes(button.link)) {
									button.classList.add("selectedx");
								} else if (list2.includes(button.link)) {
									button.classList.add("glow");
								}
							}
						} else {
							if (list1 != game.me&&list1==game.red_leader) {
								dialog.content.firstChild.innerHTML = "等待<span style='color:red;'>红方</span>队长选择";
							}else if(list1!=game.me&&list1==game.blue_leader){
								dialog.content.firstChild.innerHTML = "等待<span style='color:lightblue;'>蓝方</span>队长选择";
							}
						}
					};
					game.broadcastAll(createDialog,event.choosed.node.name.innerHTML, event.list, event.videoId, event.choosing);

					_status.firstChoose = game.red_leader;
					event.num=1;//记录选角次数
					_status.onreconnect = [
						createDialog,
						event.choosed.node.name.innerHTML,
						event.list,
						event.videoId,
						event.red_chooseList,
						event.blue_chooseList
					];
					"step 11"//插入ban角色
					event.choosed=event.choose_list.shift();
					if(event.choosed.side==true){
						event.choosing=game.red_leader;
					}else{
						event.choosing=game.blue_leader;
					}
					result.bool=undefined;
					//反转选择，使插入ban提示正确
					if(event.choosing==game.blue_leader){
						event.choosing=game.red_leader;
					}else{
						event.choosing=game.blue_leader;
					}

					if(!event.red_ban&&event.choosing==game.red_leader){
						//console.log('红方插入ban');
						var next = event.choosing.chooseButton(event.videoId, 1);
						next.set("filterButton", function (button) {
							if (_status.event.selected.includes(button.link)) return false;
							return true;
						});
						next.set("selected", event.selected);
						next.set("ai", function () {
							return Math.random();
						});
					}else if(!event.blue_ban&&event.choosing==game.blue_leader){
						//console.log('蓝方插入ban');
						var next = event.choosing.chooseButton(event.videoId, 1);
						next.set("filterButton", function (button) {
							if (_status.event.selected.includes(button.link)) return false;
							return true;
						});
						next.set("selected", event.selected);
						next.set("ai", function () {
							return Math.random();
						});
					}
					'step 12'
					//console.log(result.bool);
					if(result.bool){
						if(event.choosing==game.blue_leader){
							event.blue_ban=true;
						}else{
							event.red_ban=true;
						}
						var list=result.links.slice();
						for(var link of list){
							if(lib.characterReplace[link]&&lib.characterReplace[link].length>0){
								for(var character of lib.characterReplace[link]){
									if(!result.links.includes(character)){
										result.links.push(character);
									}
								}
							}
						}

						game.broadcastAll(
							function (links, choosing,id,choosed) {
								var dialog = get.idDialog(id);
								if (dialog) {
									var str;
									if (choosing == game.red_leader) {
										choosing = "<span style='color:red;''>红方</span>队长";
										str=`，<span style="color:lightblue;">蓝方</span>队长为${choosed}选择角色`;
									} else {
										choosing = "<span style='color:lightblue;'>蓝方</span>队长";
										str=`，<span style="color:red;">红方</span>队长为${choosed}选择角色`;
									}
									dialog.content.firstChild.innerHTML =
										choosing + "Ban了" + get.translation(links)+str;

									//console.log(dialog.content.firstChild.innerHTML);

									for (var i = 0; i < dialog.buttons.length; i++) {
										if(links.includes(dialog.buttons[i].link)){
											dialog.buttons[i].classList.add("glow2");
										}
									}
								}
							},
							result.links,
							event.choosing,
							event.videoId,
							event.choosed.node.name.innerHTML					
						);
						event.selected.addArray(result.links);
						
						if (event.choosing == game.red_leader) {
							var str = "<span style='color:red;'>红方</span>队长";
						} else {
							var str = "<span style='color:lightblue;'>蓝方</span>队长";
						}
						game.log(str,'插入Ban',result.links[0]);
					}

					if(event.choosing==game.blue_leader){
						event.choosing=game.red_leader;
					}else{
						event.choosing=game.blue_leader;
					}
					
					if(result.bool===false){
						game.broadcastAll(
							function (choosing,id,choosed) {
								var dialog = get.idDialog(id);
								if (dialog) {
									if (choosing == game.red_leader) {
										choosing = `<span style="color:red;">红方</span>队长为${choosed}`;
									} else {
										choosing = `<span style="color:lightblue;">蓝方</span>队长为${choosed}`;
									}
									dialog.content.firstChild.innerHTML =
										choosing + "选择角色";

									//console.log(dialog.content.firstChild.innerHTML);
								}
							},
							event.choosing,
							event.videoId,
							event.choosed.node.name.innerHTML
						);
					}
					
					'step 13'
					//console.log('选择角色');
					var next = event.choosing.chooseButton(event.videoId, 1, true);
					next.set("filterButton", function (button) {
						if (_status.event.selected.includes(button.link)) return false;
						return true;
					});
					next.set("selected", event.selected);
					next.set("ai", function () {
						return Math.random();
					});
					"step 14";
					var list=result.links.slice();
						for(var link of list){
							if(lib.characterReplace[link]){
								for(var character of lib.characterReplace[link]){
									if(!result.links.includes(character)){
										result.links.push(character);
									}
								}
							}
						}

					event.selected.addArray(result.links);

					var choosed=event.choosed.node.name.innerHTML
					if (event.choosing == game.red_leader) {
						var str = `<span style="color:red;">红方</span>队长为${choosed}`;
					} else {
						var str = `<span style="color:lightblue;">蓝方</span>队长为${choosed}`;
					}
					game.log(str,'选择了',result.links[0]);

					if(event.choosing==game.red_leader){
						event.red_chooseList.addArray(result.links);
						var id=event.red_list.shift().playerid;
					}else{
						event.blue_chooseList.addArray(result.links);
						var id=event.blue_list.shift().playerid;
					}
					var name=event.choosed.node.name.innerHTML;
					game.broadcastAll(function(id,link){
							if(!lib.playerOL[id].name1){
								lib.playerOL[id].init(link);
								lib.playerOL[id].update();
							}
					},id,result.links[0]);

					if(event.choose_list.length>0){
						var next_choosed_name=event.choose_list[0].node.name.innerHTML;
						var next_choosed_side=event.choose_list[0].side;
					}else{
						var next_choosed_name='';
						var next_choosed_side=false;
					}

					game.broadcastAll(
						function (link, choosing, first, id,red_ban,blue_ban,choosed,next_choosed_name,next_choosed_side) {
							var dialog = get.idDialog(id);
							if (dialog) {
								//console.log(red_ban,blue_ban);
								var ban='';
								if (choosing == game.red_leader) {
									choosing = `<span style="color:red;">红方</span>队长为${choosed}`;
								} else {
									choosing = `<span style="color:lightblue;">蓝方</span>队长为${choosed}`;
								}

								if(next_choosed_side===true){
									if(!blue_ban){
										ban=`，<span style="color:red;">红方</span>队长将要为${next_choosed_name}选择角色，<span style="color:lightblue;">蓝方</span>是否插入Ban`;
									}else{
										if(next_choosed_name){
											ban=`，<span style="color:red;">红方</span>队长为${next_choosed_name}选择角色`;
										}
										
									}
								}else if(next_choosed_side===false){
									if(!red_ban){
										ban=`，<span style="color:lightblue;">蓝方</span>队长将要为${next_choosed_name}选择角色，<span style="color:red;">红方</span>是否插入Ban`;
									}else{
										if(next_choosed_name){
											ban=`，<span style="color:lightblue;">蓝方</span>队长为${next_choosed_name}选择角色`
										}
									}
								}

								var str=choosing + "选择了" + get.translation(link)+ban;
								dialog.content.firstChild.innerHTML =str;

								for (var i = 0; i < dialog.buttons.length; i++) {
									if (dialog.buttons[i].link == link) {
										if (first) {
											dialog.buttons[i].classList.add("selectedx");
										} else {
											dialog.buttons[i].classList.add("glow");
										}
									}
								}
							}
						},
						result.links[0],
						event.choosing,
						event.choosing == _status.firstChoose,
						event.videoId,
						event.red_ban,
						event.blue_ban,
						name,
						next_choosed_name,
						next_choosed_side

					);
					if (event.choose_list.length>0) {
						event.goto(11);
					}
					game.delay(1);
					'step 15'
					game.delay(2);
					'step 16'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);
					
					'step 17'
					_status.characterList=[];
					if(game.me.side==true) var list=event.red_chooseList;
					else var list=event.blue_chooseList;
					for(var player of game.players){
						if(list.includes(player.name1)){
							_status.characterList.push(player.name1);
						}
					}

					if(get.phaseswap()){
						for(var player of game.players){
							if(player==game.me || player.isOnline2()){
								game.onSwapControl(player);
							}
						}
					}else{
						var viewHandcard=lib.configOL.viewHandcard;
						if(viewHandcard==true){
							game.addGlobalSkill('viewHandcard');
						}
					}
				});
			},

			chooseCharacterOLBP:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//console.log('chooseCharacterOLCM02');
					//var ref=game.players[0];
					event.number=lib.configOL.number;
					event.choose_number=parseInt(lib.configOL.BPchoose_number);

					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){//自由选择队伍
						game.chooseSideAuto();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){
						var ref=game.getFirstRed();
						if(team_sequence!='random') game.moveSeat(ref);
					}else{
						var ref=game.assignPlayerSides();
					}
					
					
					event.red_list=[];
					event.blue_list=[];
					event.choose_list=[];

					var firstChoose=ref;

					_status.firstAct=firstChoose;
					for(var i=0;i<event.number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						if(firstChoose.side==true){
							event.red_list.push(firstChoose);
						}else{
							event.blue_list.push(firstChoose);
						}
						firstChoose=firstChoose.next;
					}
					//选角顺序
					var mode=lib.configOL.choose_mode;
					if(mode=='BP01'){
						if(event.number==4){
							event.choose_list=[event.red_list[0],event.blue_list[0],event.red_list[1],event.blue_list[1]];
						}else{
							event.choose_list=[event.red_list[0],event.blue_list[0],event.red_list[1],event.blue_list[1],event.red_list[2],event.blue_list[2]];
						}
					}else{
						if(event.number==4){
							event.choose_list=[event.red_list[0],event.blue_list[0],event.blue_list[1],event.red_list[1]];
						}else{
							event.choose_list=[event.red_list[0],event.blue_list[0],event.red_list[1],event.blue_list[1],event.blue_list[2],event.red_list[2]];
						}
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

					
					if(get.phaseswap()){
						for (var i = 0; i < game.players.length; i++) {
							ref.dataset.position = i + 1;
							ref=ref.next;
						}
					}

					var map={};
					for(var i=0;i<event.number;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML];
						if(get.phaseswap()) map[game.players[i].playerid].push(game.players[i].dataset.position);
					}

					var func=function(map){
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
								if(map[i][3]) player.dataset.position=map[i][3];
							}
						}
						if(lib.configOL.phaseswap){
							ui.arena.setNumber(lib.configOL.number+1);
							game.singleHandcard = true;
							ui.arena.classList.add("single-handcard");
							ui.window.classList.add("single-handcard");
							ui.fakeme = ui.create.div(".fakeme.avatar");
							ui.me.appendChild(ui.fakeme);
						}
					}


					game.broadcastAll(func,map);

					if(get.phaseswap()){
						game.addGlobalSkill('autoswap');
					}

					'step 2'
					//ban角色
					//角色列表
					var list = get.charactersOL();
					event.list = get.characterGets(list,event.choose_number);
					game.log('本局可选角色：',event.list);
					event.choosing=event.red_list[0];
					event.videoId = lib.status.videoId++;
					event.red_ban=[];
					event.blue_ban=[];
					event.selected = [];
					event.num=1;
					
					var createDialog = function (list, id, list1, list2) {
						var dialog = ui.create.dialog("<span style='color:red;'>红方</span>1名Ban角色", [list, "character"]);
						dialog.classList.add("fullwidth");
						dialog.classList.add("fullheight");
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.videoId = id;
						if (list1 && list2) {
							ui.arena.classList.add("playerhidden");
							for (var i = 0; i < dialog.buttons.length; i++) {
								var button = dialog.buttons[i];
								if (list1.includes(button.link)) {
									button.classList.add("selectedx");
								} else if (list2.includes(button.link)) {
									button.classList.add("glow");
								}
							}
						} else {
							if (list1 != game.me) {
								dialog.content.firstChild.innerHTML = "等待<span style='color:red;'>红方</span>选择Ban";
							}
						}
					};

					game.broadcastAll(createDialog, event.list, event.videoId, event.choosing);
					
					_status.side = event.choosing.side;
					_status.onreconnect = [
						createDialog,
						event.list,
						event.videoId,
						event.red_ban,
						event.blue_ban
					];

					'step 3'
					var next = event.choosing.chooseButton(event.videoId, 1, true);
					next.set("filterButton", function (button) {
						if (_status.event.selected.includes(button.link)) return false;
						return true;
					});
					next.set("selected", event.selected);
					next.set("ai", function () {
						return Math.random();
					});
					'step 4'
					game.broadcastAll(
						function (links, choosing, first, id) {
							var dialog = get.idDialog(id);
							if (dialog) {
								if (choosing.side == true) {
									choosing = "<span style='color:red;'>红方</span>";
									var choosing2 = "，等待<span style='color:lightblue;'>蓝方</span>Ban1名角色";
								} else {
									choosing = "<span style='color:lightblue;'>蓝方</span>";
									var choosing2 = "";
								}
								dialog.content.firstChild.innerHTML =
									choosing + "Ban了" + get.translation(links)+ choosing2;
								for (var i = 0; i < dialog.buttons.length; i++) {
									if ((dialog.buttons[i].link == links[0])||(dialog.buttons[i].link == links[1])) {
										if (first) {
											dialog.buttons[i].classList.add("selectedx");
										} else {
											dialog.buttons[i].classList.add("glow");
										}
									}
								}
							}
						},
						result.links,
						event.choosing,
						event.choosing.side == _status.side,
						event.videoId
					);
					event.selected.addArray(result.links);
					if (event.choosing.side == true) {
						var str = "<span style='color:red;'>红方</span>";
					} else {
						var str = "<span style='color:lightblue;'>蓝方</span>";
					}
					game.log(str,'Ban了',result.links);
					if(event.choosing.side==true){
						event.red_ban.addArray(result.links);
					}else{
						event.blue_ban.addArray(result.links);
					}

					for(var i=0;i<result.links.length;i++){
						event.list.remove(result.links[i]);
					}

					//因仅循环两次，故不在进行判断，直接对当前选择者进行赋值
					event.choosing=event.blue_list[0];

					event.num++;
					if (event.num<=2) {
						event.goto(3);
					}
					'step 5'
					game.delay(2);
					'step 6'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);

					'step 7'
					//为各方选择角色
					//设置第一次提示
					//console.log(event.choosed.node.name.innerHTML);
					event.choosing=event.choose_list[0];
					event.red_chooseList = [];
					event.blue_chooseList = [];
					event.selected = [];
					_status.side=event.choosing.side;

					event.videoId = lib.status.videoId++;
					var createDialog = function (choosing,list, id,list1, list2) {
						var dialog = ui.create.dialog(`<span style="color:red;">${choosing}</span>选择角色`, [list, "characterx"]);
						dialog.classList.add("fullwidth");
						dialog.classList.add("fullheight");
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.videoId = id;
						if (list2 && list2) {
							ui.arena.classList.add("playerhidden");
							for (var i = 0; i < dialog.buttons.length; i++) {
								var button = dialog.buttons[i];
								if (list1.includes(button.link)) {
									button.classList.add("selectedx");
								} else if (list2.includes(button.link)) {
									button.classList.add("glow");
								}
							}
						} else {
							if (list1 != game.me) {
								dialog.content.firstChild.innerHTML = `等待<span style='color:red;'>${choosing}</span>选择`;
							}
						}
					};
					game.broadcastAll(createDialog,event.choosing.node.name.innerHTML, event.list, event.videoId, event.choosing);
					
					_status.onreconnect = [
						createDialog,
						event.choosing.node.name.innerHTML,
						event.list,
						event.videoId,
						event.red_chooseList,
						event.blue_chooseList
					];
					"step 8"
					//console.log('选择角色');
					game.delay(1);
					event.choosing=event.choose_list.shift();
					var next = event.choosing.chooseButton(event.videoId, 1, true);
					next.set("filterButton", function (button) {
						if (_status.event.selected.includes(button.link)) return false;
						return true;
					});
					next.set("selected", event.selected);
					next.set("ai", function () {
						return Math.random();
					});
					"step 9";
					var list=result.links.slice();
					for(var link of list){
						if(lib.characterReplace[link]){
							for(var character of lib.characterReplace[link]){
								if(!result.links.includes(character)){
									result.links.push(character);
								}
							}
						}
					}
					event.selected.addArray(result.links);

					if(event.choosing.side==true){
						event.red_chooseList.addArray(result.links);
						var id=event.red_list.shift().playerid;
					}else{
						event.blue_chooseList.addArray(result.links);
						var id=event.blue_list.shift().playerid;
					}

					var name=event.choosing.node.name.innerHTML;
					game.log(name,'选择了',result.links[0]);
					game.broadcastAll(function(id,link){
							if(!lib.playerOL[id].name1){
								lib.playerOL[id].init(link);
								lib.playerOL[id].update();
							}
					},id,result.links[0]);
					if(event.choose_list.length>0){
						var next_name=event.choose_list[0].node.name.innerHTML;
						var next_side=event.choose_list[0].side;
					}else{
						var next_name='';
						var next_side=false;
					}

					game.broadcastAll(
						function (link, choosing, first, id,name,next_name,next_side) {
							var dialog = get.idDialog(id);
							if (dialog) {
								var next='';
								if(next_name){
									if(next_side==true){
										next=`，<span style="color:red;">${next_name}</span>选择角色`
									}else{
										next=`，<span style="color:lightblue;">${next_name}</span>选择角色`
									}
								}

								if (choosing.side == true) {
									choosing = `<span style="color:red;">${name}</span>`;
								} else {
									choosing = `<span style="color:lightblue;">${name}</span>`;
								}
								var str=choosing + "选择了" + get.translation(link)+next;
								dialog.content.firstChild.innerHTML =str;

								for (var i = 0; i < dialog.buttons.length; i++) {
									if (dialog.buttons[i].link == link) {
										if (first) {
											dialog.buttons[i].classList.add("selectedx");
										} else {
											dialog.buttons[i].classList.add("glow");
										}
									}
								}
							}
						},
						result.links[0],
						event.choosing,
						event.choosing.side == _status.side,
						event.videoId,
						name,
						next_name,
						next_side
					);
					if (event.choose_list.length>0) {
						event.goto(8);
					}
					game.delay(1);
					'step 10'
					game.delay(3);
					'step 11'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);
					
					'step 12'
					_status.characterList=[];
					if(game.me.side==true) var list=event.red_chooseList;
					else var list=event.blue_chooseList;
					for(var player of game.players){
						if(list.includes(player.name1)){
							_status.characterList.push(player.name1);
						}
					}

					if(get.phaseswap()){
						for(var player of game.players){
							if(player==game.me || player.isOnline2()){
								game.onSwapControl(player);
							}
						}
					}else{
						var viewHandcard=lib.configOL.viewHandcard;
						if(viewHandcard==true){
							game.addGlobalSkill('viewHandcard');
						}
					}
				});
			},

			chooseCharacterOLPhaseswapDuoXuanYi:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){//自由选择队伍
						game.chooseSidePhaseswap();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					var number=game.players.length;
					if(chooseSide){
						var ref=game.getFirstRed();
						if(team_sequence!='random'&&number!=8) game.moveSeat(ref);
					}else{
						var ref=game.assignPlayerSides();
					}

					for (var i = 0; i < game.players.length; i++) {
						ref.dataset.position = i + 1;
						ref=ref.next;
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
						else if(game.players[i].side==false){
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					var map={};
					for(var i=0;i<number;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML,game.players[i].dataset.position];
					}

					var func=function(map,number){
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
								player.dataset.position=map[i][3];
							}
						}

						ui.arena.setNumber(number+1);
						
						game.singleHandcard = true;
						ui.arena.classList.add("single-handcard");
						ui.window.classList.add("single-handcard");
						ui.fakeme = ui.create.div(".fakeme.avatar");
						ui.me.appendChild(ui.fakeme);

						ui.arena.classList.add('choose-character');
					}
					game.broadcastAll(func,map,number);
					'step 2'
					game.delay(0.5);

					var choose_number=parseInt(lib.configOL.choose_number);
					var list=get.charactersOL();
					list=get.characterGets(list);

					var players=game.players.filter(player=>player.isOnline()||player==game.me);
					var chooseList=players.map(function(player){
						let buttonList=[];
						buttonList.push(player);
						let configList=[];
						if(player.side==true) configList.push('(红方)');
						else configList.push('(蓝方)');
						configList[0]+='按顺位进行选择';
						configList.push([list.randomRemove(choose_number),'characterx']);
						buttonList.push(configList);
						buttonList.push(game.players.length/2);
						buttonList.push(true);
						return buttonList;
					});
					event.characterList=list;//后续给ai随机选角用

					game.me.chooseButtonOL(chooseList,function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var buttons=_status.event.dialog.buttons;
						var result=buttons.randomGets(game.players.length/2);
						var links=[];
						for(var i=0;i<result.length;i++){
							if(result[i].link) links.push(result[i].link);
						}
						return {
							bool:true,
							links:links,
						}
					});
					'step 3'
					var chooseList={};
					for(var i in result){
						if(lib.playerOL[i].side==true){
							chooseList.red=result[i].links;
						}else{
							chooseList.blue=result[i].links;
						}
						if(lib.playerOL[i]==game.me) _status.characterList=result[i].links;
					}
					var list=[];
					var ref=_status.firstAct;
					for(var i =0;i<game.players.length;i++){
						if(ref.side==true){
							if(chooseList.red) list.push(chooseList.red.shift());
							else list.push(event.characterList.randomRemove());
						}else{
							if(chooseList.blue) list.push(chooseList.blue.shift());
							else list.push(event.characterList.randomRemove());
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
						if(player==game.me || player.isOnline2()){
							game.onSwapControl(player);
						}
					}
				});
			},

			chooseCharacterOLJiuGuan:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					event.number=lib.configOL.number;

					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){//自由选择队伍
						game.chooseSideAuto();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){
						var ref=game.getFirstRed();
						if(team_sequence!='random') game.moveSeat(ref);
					}else{
						var ref=game.assignPlayerSides();
					}

					event.red_list=[];
					event.blue_list=[];
					event.choose_list=[];

					var firstChoose=ref;

					_status.firstAct=firstChoose;
					for(var i=0;i<event.number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						if(firstChoose.side==true){
							event.red_list.push(firstChoose);
						}else{
							event.blue_list.push(firstChoose);
						}
						firstChoose=firstChoose.next;
					}
					//选角顺序
					if(event.number==4){
						event.choose_list=[event.red_list[0],event.blue_list[0],event.red_list[1],event.blue_list[1]];
					}else{
						event.choose_list=[event.red_list[0],event.blue_list[0],event.red_list[1],event.blue_list[1],event.red_list[2],event.blue_list[2]];
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

					
					if(get.phaseswap()){
						for (var i = 0; i < game.players.length; i++) {
							ref.dataset.position = i + 1;
							ref=ref.next;
						}
					}

					var map={};
					for(var i=0;i<event.number;i++){
						map[game.players[i].playerid]=[game.players[i].side,game.players[i].node.identity.firstChild.innerHTML,game.players[i].node.name.innerHTML];
						if(get.phaseswap()) map[game.players[i].playerid].push(game.players[i].dataset.position);
					}

					var func=function(map){
						for(var i in map){
							var player=lib.playerOL[i];
							if(player){
								player.side=map[i][0];
								player.node.identity.firstChild.innerHTML=map[i][1];
								player.node.name.innerHTML=map[i][2];
								player.node.identity.dataset.color=player.side+'zhu';
								if(map[i][3]) player.dataset.position=map[i][3];
							}
						}
						if(lib.configOL.phaseswap){
							ui.arena.setNumber(lib.configOL.number+1);
							game.singleHandcard = true;
							ui.arena.classList.add("single-handcard");
							ui.window.classList.add("single-handcard");
							ui.fakeme = ui.create.div(".fakeme.avatar");
							ui.me.appendChild(ui.fakeme);
						}
					}
					game.broadcastAll(func,map);

					if(get.phaseswap()){
						game.addGlobalSkill('autoswap');
					}

					event.allCharacterList=get.charactersOL();
					event.characterList=event.allCharacterList.randomRemove(4);
					game.log('开局酒馆角色：',event.characterList);
					event.banList=[event.red_list[0],event.blue_list[0]];
					'step 2'
					event.choosing=event.banList.shift();
					event.videoId = lib.status.videoId++;

					var createDialog = function (list, id, choosing) {
						var dialog = ui.create.dialog("Ban1名角色", [list, "character"]);
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.classList.add('noanimation');
						dialog.videoId = id;
						if (choosing != game.me) {
							var str;
							if(choosing.side==true) str="<span style='color:red;'>红方</span>";
							else str="<span style='color:lightblue;'>蓝方</span>";
							str+='选择Ban角色1名';
							dialog.content.firstChild.innerHTML = str;
						}
					};
					
					game.broadcastAll(createDialog, event.characterList, event.videoId, event.choosing);
					
					_status.side = event.choosing.side;

					var next = event.choosing.chooseButton(event.videoId, 1, true);
					next.set("ai", function () {
						return Math.random();
					});
					'step 3'
					game.broadcastAll(
						function (links, choosing, first, id) {
							var dialog = get.idDialog(id);
							if (dialog) {
								if (choosing.side == true) {
									choosing = "<span style='color:red;'>红方</span>";
									var choosing2 = "，等待<span style='color:lightblue;'>蓝方</span>Ban角色1名";
								} else {
									choosing = "<span style='color:lightblue;'>蓝方</span>";
									var choosing2 = "";
								}
								dialog.content.firstChild.innerHTML =
									choosing + "Ban了" + get.translation(links)+ choosing2;
								for (var i = 0; i < dialog.buttons.length; i++) {
									if ((dialog.buttons[i].link == links[0])||(dialog.buttons[i].link == links[1])) {
										if (first) {
											dialog.buttons[i].classList.add("selectedx");
										} else {
											dialog.buttons[i].classList.add("glow");
										}
									}
								}
							}
						},
						result.links,
						event.choosing,
						event.choosing.side == _status.side,
						event.videoId
					);
					
					event.characterList.remove(result.links[0]);
					var addedCharacter=event.allCharacterList.randomRemove();
					event.characterList.push(addedCharacter);

					if (event.choosing.side == true) {
						var str = "<span style='color:red;'>红方</span>";
					} else {
						var str = "<span style='color:lightblue;'>蓝方</span>";
					}
					game.log(str,'Ban了',result.links,',酒馆区新增角色',addedCharacter);
					'step 4'
					game.delay(1);
					'step 5'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);
					if(event.banList.length>0){
						event.goto(2);
					}

					'step 6'
					event.redRandomed=false;
					event.blueRandomed=false;

					'step 7'
					event.choosing=event.choose_list.shift();
					event.videoId = lib.status.videoId++;
					var nextName=event.choosing.node.name.innerHTML;

					var createDialog = function (list, id, choosing,red_ban,blue_ban, nextName) {
						if((choosing.side==true&&!red_ban)||(choosing.side==false&&!blue_ban)) var dialog = ui.create.dialog("选择1名角色或者从角色堆里随机选择1名角色", [list, "character"]); 
						else var dialog = ui.create.dialog("选择1名角色", [list, "character"]);
						dialog.classList.add("noslide");
						dialog.classList.add("fixed");
						dialog.classList.add('noanimation');
						dialog.videoId = id;
						if (choosing != game.me) {
							var str;
							if(choosing.side==true) str=`等待<span style='color:red;'>${nextName}</span>`;
							else str=`等待<span style='color:lightblue;'>${nextName}</span>`;
							if((choosing.side==true&&!red_ban)||(choosing.side==false&&!blue_ban)) str+='选择1名角色或者从角色堆里随机选择1名角色';
							else str+='选择1名角色';
							dialog.content.firstChild.innerHTML = str;
						}
					};
					
					game.broadcastAll(createDialog, event.characterList, event.videoId, event.choosing,event.redRandomed,event.blueRandomed,nextName);

					var next = event.choosing.chooseButton(event.videoId, 1);
					if(event.choosing.side==true&&event.redRandomed) next.set('forced',true);
					else if(event.choosing.side==false&&event.blueRandomed) next.set('forced',true);
					next.set("ai", function () {
						return Math.random();
					});
					'step 8'
					var id=event.choosing.playerid;
					if(result.bool){
						var link=result.links[0];
						event.characterList.remove(link);
						if(event.choosing.side==true){
							var addedCharacterList=event.allCharacterList.randomRemove(2);
							event.characterList.addArray(addedCharacterList);
						}
						game.log(event.choosing.node.name.innerHTML,'选择了',link);
						if(addedCharacterList){
							game.log('酒馆区新增角色',addedCharacterList);
						}
					}else{
						if(event.choosing.side==true) event.redRandomed=true;
						else{
							event.blueRandomed=true;
							var flag=true;
						}
						var link=event.allCharacterList.randomRemove();
						if(event.choosing.side==true){	
							var addedCharacter=event.allCharacterList.randomRemove();
							event.characterList.push(addedCharacter);
						}
						game.log(event.choosing.node.name.innerHTML,'从角色堆随机选择了',link);
						if(addedCharacter){
							game.log('酒馆区新增角色',addedCharacter);
						}
					}
					game.broadcastAll(function(id,link){
						if(!lib.playerOL[id].name1){
							lib.playerOL[id].init(link);
							lib.playerOL[id].update();
						}
					},id,link);

					//console.log(flag);
					if(flag){
						game.broadcastAll(
							function (choosing, id) {
								var dialog = get.idDialog(id);
								if (dialog) {
									var str='';
									if(choosing==game.me) var str='Ban1名角色';
									else{
										if(choosing.side==true) str=`等待<span style='color:red;'>${choosing.node.name.innerHTML}</span>`;
										else str=`等待<span style='color:lightblue;'>${choosing.node.name.innerHTML}</span>`;
										str+='Ban1名角色';
									}
									dialog.content.firstChild.innerHTML =str;
								}
							},
							event.choosing,
							event.videoId,
						);

						var next=event.choosing.chooseButton(event.videoId, 1,true);
						next.set("ai", function () {
							return Math.random();
						});
					}else{
						event.goto(10);
					}
					game.delay(0.5);
					'step 9'
					if(result.bool){
						game.log(event.choosing.node.name.innerHTML,'选择了',result.links[0]);
						event.characterList.removeArray(result.links);
					}
					'step 10'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);
					if(event.choose_list.length>0){
						event.goto(7);
					}
				});
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
				}
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
				else{
					game.swapPlayer(player);
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
			chooseSideAuto:function(){
				if(get.phaseswap()) game.chooseSidePhaseswap();
				else game.chooseSide();
			},
			assignPlayerSides:function(){
				if(get.phaseswap()){
					let red=0;
					let blue=0;
					var number=2;
					let count=0;
					for(let player of game.players){
						if(player.isOnline() || (player==game.me)){
							if(count<number/2) player.side=true;
							else player.side=false;
							count++;
	
							if(player.side==true) red++;
							else blue++;
						}
					}
					var number=game.players.length;
					for(let player of game.players){
						if(player!=game.me && !player.isOnline()){
							if(typeof player.side != 'boolean'){
								if(red<number/2){
									player.side=true;
									red++;
								}else{
									player.side=false;
									blue++;
								}
							}
						}
					}
					var ref=game.getFirstRed();
					if(number!=8) game.moveSeat(ref);
				}else{
					var ref=game.players.randomGet();
					var list=game.teamSequenceList();
					for(var i=0;i<game.players.length;i++){
						ref.side=list[i];
						ref=ref.next;
					}
				}
				return ref;
			},
			
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
		translate:{
			versus_single_control_config:'单人控制',
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
		},
		help:{
			'星杯模式':`<div style="margin:10px">星杯模式</div><br>使对方士气降至0或者我方合成5个星杯即可获得胜利。对局中，右下角查看相关信息。`
		}
	};
};
