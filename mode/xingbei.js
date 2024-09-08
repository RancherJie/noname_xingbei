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
				game.chooseCharacter();
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
				return game.players[0].side==player.side;
			},
			getRoomInfo:function(uiintro){
				/*
				if(lib.configOL.versus_mode=='1v1'){
					uiintro.add('<div class="text chat">侯选人数：'+lib.configOL.choice_num+'人');
					uiintro.add('<div class="text chat">替补人数：'+lib.configOL.replace_number+'人');
				}
				else if(lib.configOL.versus_mode=='2v2'||lib.configOL.versus_mode=='3v3'){
					uiintro.add('<div class="text chat">四号位换牌：'+(lib.configOL.replace_handcard?'开启':'关闭'));
				}*/
				switch(lib.configOL.choose_mode){
					case '多选1':uiintro.add('<div class="text chat">选角模式：多选1');break;
					case 'CM02':uiintro.add('<div class="text chat">选角模式：CM02');break;
					case 'BP01':uiintro.add('<div class="text chat">选角模式：BP01');break;
					case 'BP02':uiintro.add('<div class="text chat">选角模式：BP02');break;
				}
				if(lib.configOL.choose_mode!='CM02'){
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
				switch(lib.configOL.viewHandcard){
					case true:uiintro.add('<div class="text chat">可见队友手牌：是');break;
					case false:uiintro.add('<div class="text chat">可见队友手牌：否');break;
				}
				var last=uiintro.add('<div class="text chat">出牌时限：'+lib.configOL.choose_timeout+'秒');
				// uiintro.add('<div class="text chat">屏蔽弱将：'+(lib.configOL.ban_weak?'开启':'关闭'));
				// var last=uiintro.add('<div class="text chat">屏蔽强将：'+(lib.configOL.ban_strong?'开启':'关闭'));
				if(lib.configOL.banned.length){
					last=uiintro.add('<div class="text chat">禁用角色：'+get.translation(lib.configOL.banned));
				}
				/*
				if(lib.configOL.bannedcards.length){
					last=uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}*/
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
			
			chooseCharacter:function(){
				switch(get.config('choose_mode')){
					case '多选1':game.chooseCharacterDuoXuanYi();break;
					case 'CM02':game.chooseCharacterCM02();break;
				}
			},
			chooseCharacterDuoXuanYi:function(){
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
							ref.next.side=bool;
							ref.next.next.side=bool2;
							ref.previous.side=bool2;
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
						}else if(team_sequence=='CM'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
						}
					}else{
						if(team_sequence=='crossed'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool;
							ref.next.next.next.side=bool2;
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
						}else if(team_sequence=='CM'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
							ref.next.next.next.next.side=bool;
							ref.next.next.next.next.next.side=bool2;
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
					if(get.config('phaseswap')){
						if(number==4){
							basenum=2;
						}else{
							basenum=3;
						}
						basestr='选择你和队友的角色';
						event.phaseswap=true;
					}

					var dialog=ui.create.dialog(basestr,[characterChoice,'character']);
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
							_status.event.dialog.buttons=ui.create.buttons(list.randomGets(choose_number),'character',buttons);
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
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							if(_status.brawl&&_status.brawl.chooseCharacter){
								var list=_status.brawl.chooseCharacter(event.list,game.players[i]);
								game.players[i].init(list.randomGet());
								event.list.remove(game.players[i].name1);
							}
							else{
								if(event.phaseswap&&game.players[i].side==game.me.side){
									if(flag!=true){
										var flag=true;
										game.players[i].init(result.links[1]);
									}else{
										game.players[i].init(result.links[2]);
									}
								}
								else{
									var name=event.list.randomRemove();
									if(lib.characterReplace[name]&&lib.characterReplace[name].length) name=lib.characterReplace[name].randomGet();
									game.players[i].init(name);
								}
							}
						}
					}

					'step 3'
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}

					ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
					ui.updateShiQiInfo();


					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					var viewHandcard=get.config('viewHandcard');
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}

					if(get.config('phaseswap')){
						game.addGlobalSkill('autoswap');
						if(lib.config.show_handcardbutton){
							ui.versushs=ui.create.system('手牌',null,true);
							lib.setPopped(ui.versushs,game.versusHoverHandcards,220);
						}
					}
					
				});
			},

			chooseCharacterOL:function(){
				switch(lib.configOL.choose_mode){
					case '多选1':game.chooseCharacterOLDuoXuanYi();break;
					case 'CM02':game.chooseCharacterOLCM02();break;
					case 'BP01':game.chooseCharacterOLBP01();break;
					case 'BP02':game.chooseCharacterOLBP02();break;
				}
			},
			
			chooseSide:function(){
				var next=game.createEvent('chooseSide');
				next.setContent(function(){
					'step 0'
					var sides=['红','蓝'];
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
					for (var i in result) {
						if (result[i].links[0] == "红") {
							lib.playerOL[i].side=true;
						}else{
							lib.playerOL[i].side=false;
						}
					}
				});
			},

			moveSeat:function(list,ref){
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

			chooseCharacterOLDuoXuanYi:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//获取顺位
					var number=lib.configOL.number;
					var team_sequence=lib.configOL.team_sequence;
					if(number==4){
						if(team_sequence=='CM'){
							event.list=[true,false,false,true];
						}else if(team_sequence=='near'){
							event.list=[true,true,false,false];
						}else if(team_sequence=='crossed'){
							event.list=[true,false,true,false];
						}else{
							event.list=[true,false,false,true];
							event.list.randomSort();
						}
					}else{
						if(team_sequence=='CM'){
							event.list=[true,false,false,true,true,false];
						}else if(team_sequence=='near'){
							event.list=[true,true,true,false,false,false];
						}else if(team_sequence=='crossed'){
							event.list=[true,false,true,false,true,false];
						}else{
							event.list=[true,true,true,false,false,false];
							event.list.randomSort();
						}
					}

					
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){//自由选择队伍
						game.chooseSide();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					var number=lib.configOL.number;
					if(chooseSide){
						var ref=game.players.randomGet();
						var red=0;
						var blue=0;
						for(var i=0;i<number;i++){
							if(ref.side==true) red++;
							else blue++;
							if(red>number/2){
								ref.side=false;
								red--;
							}
							else if(blue>number/2){
								ref.side=true;
								blue--;
							}
							ref=ref.next;
						}
						while (ref.side!=true) {//确保红队第一个
							ref=ref.next;
						}
						if(team_sequence!='random') game.moveSeat(event.list,ref);
					}else{
						var ref=game.players.randomGet();
						for(var i=0;i<number;i++){
							ref.side=event.list[i];
							ref=ref.next;
						}
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
						
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					}];
					
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
						var players,friends;//分别记录自己和队友的可选角色
						var player=game.me;
						for(var i in choice){
							var current=lib.playerOL[i];
							if(current==player) players=choice[i];
							//else if(current.side==player.side) friends=choice[i];
						}
						dialog.addText('你的选将框');
						var buttons=ui.create.div('.buttons',dialog.content);
						dialog.players=ui.create.buttons(players,'character',buttons)
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
						//game._friendConfirmed=true;
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
						/*
						var friend=game.findPlayer(function(current){
							return current!=player&&current.side==player.side;
						});
						//处理推荐选将
						if(type=='string'){
							if(friend==game.me) event.recommend(friend,result);
							else if(friend.isOnline()) friend.send(event.recommend,friend,result);
							else friend._aiChoice=result;
						}*/
						//处理确认选将
						if(result&&type=='object'){
							var choice=result.links[0];
							event._choiceMap[player.playerid]=choice;
							//if(friend==game.me) event.confirm(player,choice);
							//else if(friend.isOnline()) friend.send(event.confirm,player,choice);
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
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}

					game.broadcastAll(function(){
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					})

					
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

			chooseCharacterOLCM02:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//console.log('chooseCharacterOLCM02');
					//var ref=game.players[0];
					event.number=lib.configOL.number;
					event.choose_number=18;

					if(event.number==4){
						event.list=[true,false,false,true];
					}else{
						event.list=[true,false,false,true,true,false];
					}

					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){
						game.chooseSide();
					}else{
						var ref=game.players.randomGet();
						var bool=true;
						var bool2=false;
						if(event.number==4){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
						}else{
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
							ref.next.next.next.next.side=bool;
							ref.next.next.next.next.next.side=bool2;
						}
						event.ref=ref;
					}
					'step 1'
					var chooseSide=lib.configOL.chooseSide;
					var ref=event.ref;
					if(chooseSide){
						ref=game.players.randomGet();
						while (ref.side!=true) {//确保红队第一个
							ref=ref.next;
						}
						game.moveSeat(event.list,ref);
					}
					
					if(event.number==4){
						event.red_list=[ref,ref.previous];
						event.blue_list=[ref.next,ref.next.next];
						var R1=ref;
						var R2=ref.next.next.next;
						var B1=ref.next;
						var B2=ref.next.next;
						event.choose_list=[R1,B1,B2,R2];
					}else{
						event.red_list=[ref,ref.next.next.next,ref.next.next.next.next];
						event.blue_list=[ref.next,ref.next.next,ref.previous];
						var R1=ref;
						var R2=ref.next.next.next;
						var R3=ref.next.next.next.next;
						var B1=ref.next;
						var B2=ref.next.next;
						var B3=ref.previous;
						event.choose_list=[R1,B1,R2,B2,B3,R3];
					}
					

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
						else{
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					
					var map={};
					for(var i=0;i<event.number;i++){
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
					}


					game.broadcastAll(func,map);


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
					game.log('<span style="color:red;">红方</span>队长为',event.red_leader.node.name.innerHTML);
					game.log('<span style="color:blue;">蓝方</span>队长为',event.blue_leader.node.name.innerHTML);
					game.broadcastAll(function(red_leader,blue_leader){
						game.red_leader=red_leader;
						game.blue_leader=blue_leader;
					},event.red_leader,event.blue_leader);
					game.delay(4);
					'step 5'//ban角色
					//角色列表
					var list = get.charactersOL();
					event.list = get.characterGets(list,event.choose_number);
					event.choosing=game.red_leader;
					event.videoId = lib.status.videoId++;
					event.red_chooseList = [];
					event.blue_chooseList = [];

					var createDialog = function (list, id, list1, list2) {
						var dialog = ui.create.dialog("Ban角色", [list, "character"]);
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
								dialog.content.firstChild.innerHTML = "等待<span style='color:blue;'>蓝方</span>队长选择";
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
									choosing = "<span style='color:red;'>红方</span>队长";
								} else {
									choosing = "<span style='color:blue;'>蓝方</span>队长";
								}
								dialog.content.firstChild.innerHTML =
									choosing + "Ban了" + get.translation(links);
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

					for(var i=0;i<result.links.length;i++){
						var index=event.list.indexOf(result.links[i]);
						if(index!=-1) event.list.splice(index,1);
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
						ui.arena.classList.remove("playerhidden");
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
						var dialog = ui.create.dialog(`<span style="color:red;">红方</span>为${choosed}选择角色，<span style="color:blue;">蓝方</span>队长是否插入Ban`, [list, "character"]);
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
								dialog.content.firstChild.innerHTML = "等待<span style='color:blue;'>蓝方</span>队长选择";
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
						game.broadcastAll(
							function (link, choosing,id,choosed) {
								var dialog = get.idDialog(id);
								if (dialog) {
									var str;
									if (choosing == game.red_leader) {
										choosing = "<span style='color:red;''>红方</span>队长";
										str=`，<span style="color:blue;">蓝方</span>队长为${choosed}选择角色`;
									} else {
										choosing = "<span style='color:blue;'>蓝方</span>队长";
										str=`，<span style="color:red;">红方</span>队长为${choosed}选择角色`;
									}
									dialog.content.firstChild.innerHTML =
										choosing + "Ban了" + get.translation(link)+str;

									//console.log(dialog.content.firstChild.innerHTML);

									for (var i = 0; i < dialog.buttons.length; i++) {
										if (dialog.buttons[i].link == link) {
											dialog.buttons[i].classList.add("glow2");
										}
									}
								}
							},
							result.links[0],
							event.choosing,
							event.videoId,
							event.choosed.node.name.innerHTML					
						);
						event.selected.push(result.links[0]);
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
										choosing = `<span style="color:blue;">蓝方</span>队长为${choosed}`;
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
					event.selected.push(result.links[0]);
					if(event.choosing==game.red_leader){
						event.red_chooseList.push(result.links[0]);
						var id=event.red_list.shift().playerid;
					}else{
						event.blue_chooseList.push(result.links[0]);
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
									choosing = `<span style="color:blue;">蓝方</span>队长为${choosed}`;
								}

								if(next_choosed_side===true){
									if(!blue_ban){
										ban=`，<span style="color:red;">红方</span>队长将要为${next_choosed_name}选择角色，<span style="color:blue;">蓝方</span>是否插入Ban`;
									}else{
										if(next_choosed_name){
											ban=`，<span style="color:red;">红方</span>队长为${next_choosed_name}选择角色`;
										}
										
									}
								}else if(next_choosed_side===false){
									if(!red_ban){
										ban=`，<span style="color:blue;">蓝方</span>队长将要为${next_choosed_name}选择角色，<span style="color:red;">红方</span>是否插入Ban`;
									}else{
										if(next_choosed_name){
											ban=`，<span style="color:blue;">蓝方</span>队长为${next_choosed_name}选择角色`
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
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}
					game.broadcastAll(function(){
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					})

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
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					}];

					var viewHandcard=lib.configOL.viewHandcard;
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}
					
				});
			},

			chooseCharacterOLBP01:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//console.log('chooseCharacterOLCM02');
					//var ref=game.players[0];
					event.number=lib.configOL.number;
					event.choose_number=parseInt(lib.configOL.BPchoose_number);
					var team_sequence=lib.configOL.team_sequence;
					if(event.number==4){
						if(team_sequence=='CM'){
							event.list=[true,false,false,true];
						}else if(team_sequence=='near'){
							event.list=[true,true,false,false];
						}else if(team_sequence=='crossed'){
							event.list=[true,false,true,false];
						}else{
							event.list=[true,false,false,true];
							event.list.randomSort();
						}
					}else{
						if(team_sequence=='CM'){
							event.list=[true,false,false,true,true,false];
						}else if(team_sequence=='near'){
							event.list=[true,true,true,false,false,false];
						}else if(team_sequence=='crossed'){
							event.list=[true,false,true,false,true,false];
						}else{
							event.list=[true,true,true,false,false,false];
							event.list.randomSort();
						}
					}

					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){//自由选择队伍
						game.chooseSide();
					}
					'step 1'
					var team_sequence=lib.configOL.team_sequence;
					var chooseSide=lib.configOL.chooseSide;
					if(chooseSide){
						var ref=game.players.randomGet();
						var red=0;
						var blue=0;
						for(var i=0;i<event.number;i++){
							if(ref.side==true) red++;
							else blue++;
							if(red>event.number/2){
								ref.side=false;
								red--;
							}
							else if(blue>event.number/2){
								ref.side=true;
								blue--;
							}
							ref=ref.next;
						}
						while (ref.side!=true) {//确保红队第一个
							ref=ref.next;
						}
						if(team_sequence!='random') game.moveSeat(event.list,ref);
					}else{
						var ref=game.players.randomGet();
						for(var i=0;i<event.number;i++){
							ref.side=event.list[i];
							ref=ref.next;
						}
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
						else{
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}

					
					var map={};
					for(var i=0;i<event.number;i++){
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
					}


					game.broadcastAll(func,map);


					'step 2'
					//ban角色
					//角色列表
					var list = get.charactersOL();
					event.list = get.characterGets(list,event.choose_number);
					event.choosing=event.red_list[0];
					event.videoId = lib.status.videoId++;
					event.red_ban=[];
					event.blue_ban=[];
					event.selected = [];
					event.num=1;
					
					var createDialog = function (list, id, list1, list2) {
						var dialog = ui.create.dialog("Ban角色", [list, "character"]);
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
								} else {
									choosing = "<span style='color:blue;'>蓝方</span>";
								}
								dialog.content.firstChild.innerHTML =
									choosing + "Ban了" + get.translation(links);
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
					if(event.choosing.side==true){
						event.red_ban.addArray(result.links);
					}else{
						event.blue_ban.addArray(result.links);
					}

					for(var i=0;i<result.links.length;i++){
						var index=event.list.indexOf(result.links[i]);
						if(index!=-1) event.list.splice(index,1);
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
						var dialog = ui.create.dialog(`<span style="color:red;">${choosing}</span>选择角色`, [list, "character"]);
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
					event.selected.push(result.links[0]);
					if(event.choosing.side==true){
						event.red_chooseList.push(result.links[0]);
						var id=event.red_list.shift().playerid;
					}else{
						event.blue_chooseList.push(result.links[0]);
						var id=event.blue_list.shift().playerid;
					}

					var name=event.choosing.node.name.innerHTML;

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
										next=`，<span style="color:blue;">${next_name}</span>选择角色`
									}
								}

								if (choosing.side == true) {
									choosing = `<span style="color:red;">${name}</span>`;
								} else {
									choosing = `<span style="color:blue;">${name}</span>`;
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
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}
					game.broadcastAll(function(){
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					})

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
						
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					}];

					var viewHandcard=lib.configOL.viewHandcard;
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}
					
				});
			},

			chooseCharacterOLBP02:function(){
				var next=game.createEvent('chooseCharacterOL');
				next.setContent(function(){
					'step 0'
					//console.log('chooseCharacterOLCM02');
					//var ref=game.players[0];
					event.number=lib.configOL.number;
					event.choose_number=parseInt(lib.configOL.BPchoose_number);

					var team_sequence=lib.configOL.team_sequence;

					var ref=game.players.randomGet();
					var bool=true;
					var bool2=false;
					if(event.number==4){
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
							for(var i=0;i<event.number;i++){
								game.players[i].side=sideList[i];
							}
							while(ref.side!=true){
								ref=game.players.randomGet();
							}
						}else if(team_sequence=='CM'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
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
							for(var i=0;i<event.number;i++){
								game.players[i].side=sideList[i];
							} 
							while(ref.side!=true){
								ref=game.players.randomGet();
							}
						}else if(team_sequence=='CM'){
							ref.side=bool;
							ref.next.side=bool2;
							ref.next.next.side=bool2;
							ref.next.next.next.side=bool;
							ref.next.next.next.next.side=bool;
							ref.next.next.next.next.next.side=bool2;
						}
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
						event.choose_list=[event.red_list[0],event.blue_list[0],event.blue_list[1],event.red_list[1]];
					}else{
						event.choose_list=[event.red_list[0],event.blue_list[0],event.red_list[1],event.blue_list[1],event.blue_list[2],event.red_list[2]];
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
					for(var i=0;i<event.number;i++){
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


					'step 1'
					//ban角色
					//角色列表
					var list = get.charactersOL();
					event.list = get.characterGets(list,event.choose_number);
					event.choosing=event.red_list[0];
					event.videoId = lib.status.videoId++;
					event.red_ban=[];
					event.blue_ban=[];
					event.selected = [];
					event.num=1;
					
					var createDialog = function (list, id, list1, list2) {
						var dialog = ui.create.dialog("Ban角色", [list, "character"]);
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

					'step 2'
					var next = event.choosing.chooseButton(event.videoId, 1, true);
					next.set("filterButton", function (button) {
						if (_status.event.selected.includes(button.link)) return false;
						return true;
					});
					next.set("selected", event.selected);
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
								} else {
									choosing = "<span style='color:blue;'>蓝方</span>";
								}
								dialog.content.firstChild.innerHTML =
									choosing + "Ban了" + get.translation(links);
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
					if(event.choosing.side==true){
						event.red_ban.addArray(result.links);
					}else{
						event.blue_ban.addArray(result.links);
					}

					for(var i=0;i<result.links.length;i++){
						var index=event.list.indexOf(result.links[i]);
						if(index!=-1) event.list.splice(index,1);
					}

					//因仅循环两次，故不在进行判断，直接对当前选择者进行赋值
					event.choosing=event.blue_list[0];

					event.num++;
					if (event.num<=2) {
						event.goto(2);
					}
					'step 4'
					game.delay(2);
					'step 5'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);

					'step 6'
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
						var dialog = ui.create.dialog(`<span style="color:red;">${choosing}</span>选择角色`, [list, "character"]);
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
					"step 7"
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
					"step 8";
					event.selected.push(result.links[0]);
					if(event.choosing.side==true){
						event.red_chooseList.push(result.links[0]);
						var id=event.red_list.shift().playerid;
					}else{
						event.blue_chooseList.push(result.links[0]);
						var id=event.blue_list.shift().playerid;
					}

					var name=event.choosing.node.name.innerHTML;

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
										next=`，<span style="color:blue;">${next_name}</span>选择角色`
									}
								}

								if (choosing.side == true) {
									choosing = `<span style="color:red;">${name}</span>`;
								} else {
									choosing = `<span style="color:blue;">${name}</span>`;
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
						event.goto(7);
					}
					game.delay(1);
					'step 9'
					game.delay(3);
					'step 10'
					game.broadcastAll(function (id) {
						ui.arena.classList.remove("playerhidden");
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
						}
					}, event.videoId);
					
					'step 11'
					for(var i=0;i<game.players.length;i++){
						game.players[i].storage.moDan=false;
						game.players[i].storage.zhongDu=[];
					}
					game.broadcastAll(function(){
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					})

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
						
						ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
						ui.updateShiQiInfo();
					}];

					var viewHandcard=lib.configOL.viewHandcard;
					if(viewHandcard==true){
						game.addGlobalSkill('viewHandcard');
					}
					
				});
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

			//星杯增加设置系别用
			setXiBie:(item,xiBie)=>{
				item.xiBie=xiBie;
				return item.xiBie;
			},

			changeShiQi:function(num,side){
				if(side==true){
					game.hongShiQi+=num;
					if(num>0){
						game.log('<span style="color:red;">红方</span>士气增加',num);
					}else if(num<0){
						num=-num;
						game.log('<span style="color:red;">红方</span>士气减少',num);
					}
				}else if(side==false){
					game.lanShiQi+=num;
					if(num>0){
						game.log('<span style="color:blue;">蓝方</span>士气增加',num);
					}else if(num<0){
						num=-num;
						game.log('<span style="color:blue;">蓝方</span>士气减少',num);
					}
				}
				ui.updateShiQiInfo();
				game.broadcast(function(hongShiQi,lanShiQi){
					game.hongShiQi=hongShiQi;
					game.lanShiQi=lanShiQi;
					ui.updateShiQiInfo();
				},game.hongShiQi,game.lanShiQi);
	
				game.checkResult();
			},
			changeZhanJi:function(color,num,side){
				if(color=="r"){
					var xingShi='宝石';
				}else if(color=="b"){
					var xingShi='水晶';
				}
				if(num>0){
					if(side==true){
						for(let i=0;i<num;i++){
							game.hongZhanJi.push(xingShi);
							game.log('<span style="color:red;">红方</span>战绩区增加',xingShi);
						}
					}else if(side==false){
						for(let i=0;i<num;i++){
							game.lanZhanJi.push(xingShi);
							game.log('<span style="color:blue;">蓝方</span>战绩区增加',xingShi);
						}
					}
				}else if(num<0){
					num=-num;
					if(side==true){
						for(let i=0;i<num;i++){
							let index = game.hongZhanJi.indexOf(xingShi);  
							if (index !== -1) {  
								game.hongZhanJi.splice(index, 1);  
								game.log('<span style="color:red;">红方</span>战绩区移除',xingShi);
							}
						}
					}else if(side==false){
						for(let i=0;i<num;i++){
							let index = game.lanZhanJi.indexOf(xingShi);  
							if (index !== -1) {  
								game.lanZhanJi.splice(index, 1);  
								game.log('<span style="color:blue;">蓝方</span>战绩区移除',xingShi);
							}
						}
					}
				}
				game.hongZhanJi.sort();
				game.lanZhanJi.sort();
				ui.updateShiQiInfo();
				game.broadcast(function(hongZhanJi,lanZhanJi){
					game.hongZhanJi=hongZhanJi;
					game.lanZhanJi=lanZhanJi;
					ui.updateShiQiInfo();
				},game.hongZhanJi,game.lanZhanJi);
	
				game.checkResult();
			},
			changeXingBei:function(num,side){
				if(side==true){
					game.hongXingBei+=num;
					if(num>0){
						game.log('<span style="color:red;">红方</span>星杯数量增加',num);
					}else{
						num=-num;
						game.log('<span style="color:red;">红方</span>星杯数量减少',num);
					}
				}else if(side==false){
					game.lanXingBei+=num;
					if(num>0){
						game.log('<span style="color:blue;">蓝方</span>星杯数量增加',num);
					}else{
						num=-num;
						game.log('<span style="color:blue;">蓝方</span>星杯数量减少',num);
					}
				}
				ui.updateShiQiInfo();
				game.broadcast(function(hongXingBei,lanXingBei){
					game.hongXingBei=hongXingBei;
					game.lanXingBei=lanXingBei;
					ui.updateShiQiInfo();
				},game.hongXingBei,game.lanXingBei);
	
				game.checkResult();
			},
			resetMoDan:function(){
				//结算后重置数据
				game.moDan=2;
				game.moDan_shunShiZhen=false;
				game.broadcast(function(){
					game.moDan=2;
					game.moDan_shunShiZhen=false;
				})
			},
		},
		

		translate:{
			trueColor:"zhu",
			falseColor:"wei",
			versus_single_control_config:'单人控制',

			_wuFaXingDong:'无法行动',
			_wuFaXingDong_qiDongQian:'无法行动 启动前',
			_wuFaXingDong_qiDongHou:'无法行动 启动后',
			
			//公共技能
            _xuRuo:"虚弱",
            _zhongDu:"中毒",
            _shengDun:"圣盾",
            //_shengGuang:"圣光",
            //_yingZhan:"应战",
            //_moDan:"魔弹",
            _heCheng:"合成",
            _gouMai:"购买",
            _tiLian:"提炼",
            //_gongJiXingShi:"攻击星石",
            //_quXiao:'取消',

			_tiLian_backup:'提炼',
			_heCheng_backup:'合成',
			
		},
		skill:{
			_gongJiRiZhi:{
				trigger:{player:'useCardToTarget'},
                filter:function(event,player){
					return get.is.gongJi(event.getParent());
				},
				lastDo:true,
				direct:true,
				content:function(){
					var canYingZhan=trigger.getParent().canYingZhan;
					var canShengGuang=trigger.getParent().canShengGuang;
					var canShengDun=trigger.getParent().canShengDun;

					if(canYingZhan==false||canShengGuang==false||canShengDun==false){
						var str='本次攻击';
						if(canYingZhan==false&&canShengGuang==false&&canShengDun==false){
							str+='强制命中';
						}else{
							var list=[canYingZhan,canShengGuang,canShengDun];
							for(var i=0;i<list.length;i++){
								if(i==0){
									if(list[i]==false) str+='无法应战';
								}else if(i==1){
									if(list[i]==false) str+='无法被圣光抵消';
								}else{
									if(list[i]==false) str+='无法被圣盾抵消';
								}
								if(i<list.length-1){
									if(list[i+1]==false) str+='，';
								}
							}
						}
						game.log(str);
					}
				}
			},
			
			viewHandcard:{
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,tag,target){
						return player.side==target.side;
					},
				},
			},

			_wuFaXingDong:{
				filterx:function(event,player){
					if(event.name=='phaseUse'){
						var next=game.createEvent('wuFaXingDong',false);
						next.setContent('emptyEvent');
						next.parent=event;
					}
					
					//console.log('--------------------------------');
					//拥有挑衅直接false
					if(player.hasZhiShiWu('tiaoXinX')) return false;
					//判断是否有可使用技能
					var skills;
					skills=player.getSkills('invisible',true,false);
					skills=game.filterSkills(skills.concat(lib.skill.global),player,player.getSkills('e').concat(lib.skill.global));
					game.expandSkills(skills);

					//无可启动技跳过启动前后无法行动
					if(event.name=='phaseUse'){
						if(player.storage.qiDong==false) return false;
					}
					
					//判断是否有可触发的技能
					for(var i=0;i<skills.length;i++){
						//排除提炼
						if(skills[i]=='_tiLian') continue;
						
						var info=get.info(skills[i]);
						if(info.type=='faShu'||info.type=='gongJi'||info.type=='teShu'){
							var enable=false;
							if(typeof info.enable=='function') enable=info.enable(event);
							else if(Array.isArray(info.enable)) enable=info.enable.contains('chooseToUse');
							else if(info.enable=='phaseUse') enable=(event.type=='phase'||event.name=='phaseUse');
							else if(typeof info.enable=='string') enable=(info.enable==event.name);
							if(enable&&event.name!='phaseUse'){
								if(!game.expandSkills(player.getSkills(false).concat(lib.skill.global)).contains(skills[i])&&info.noHidden) enable=false;
								if(info.filter&&!info.filter(event,player)) enable=false;
								if(info.viewAs&&typeof info.viewAs!='function'&&event.filterCard&&!event.filterCard(info.viewAs,player,event)) enable=false;
								if(info.viewAs&&typeof info.viewAs!='function'&&info.viewAsFilter&&info.viewAsFilter(player)==false) enable=false;
								if(info.chooseButton&&_status.event.noButton) enable=false;
							}else if(enable){
								if(!game.expandSkills(player.getSkills(false).concat(lib.skill.global)).contains(skills[i])&&info.noHidden) enable=false;
								if(info.filter&&!info.filter(next,player)) enable=false;
								if(info.viewAs&&typeof info.viewAs!='function'&&next.filterCard&&!next.filterCard(info.viewAs,player,next)) enable=false;
								if(info.viewAs&&typeof info.viewAs!='function'&&info.viewAsFilter&&info.viewAsFilter(player)==false) enable=false;
								if(info.chooseButton&&_status.event.noButton) enable=false;
							}
							//console.log(skills[i],enable);
							if(enable) return false;
						}
						
					}
					//判断是否有可使用手牌
					var cards=player.getCards('h');
					for(var i=0;i<cards.length;i++){
						if(player.hasUseTarget(cards[i])) return false;
					}
					return true;
				},
				enable:'wuFaXingDong',
				type:'wuFaXingDong',
				filter:function(event,player){
					return lib.skill._wuFaXingDong.filterx(event,player);
				},
				content:function(){
					"step 0"
					player.storage.wuFaXingDong={'认可':0,'否认':0};
					event.targetsx=game.filterPlayer(i=>i!=player).sortBySeat(_status.currentPhase);
					var name=get.translation(player.name);
					event.contentx=[name+'宣言无法行动',player.getCards('h').slice()];
					event.listx=['认可','否认'];
					"step 1"
					event.target=event.targetsx.shift();
					if(event.contentx[1].length==0){
						event.target.chooseControl(event.listx).set('dialog',[event.contentx[0]]).set('ai',function(){
							return 1;
						});
					}else{
						event.target.chooseControl(event.listx).set('dialog',event.contentx).set('ai',function(){
							if(_status.event.dialog[1].length==0){
								return 1;
							}
							return 0;
						});
					}
					"step 2"
					if(result.control=='认可'){
						event.target.popup('认可');
						game.log(event.target,'认可');
						player.storage.wuFaXingDong[result.control]++;
					}else if(result.control=='否认'){
						event.target.popup('否认');
						game.log(event.target,'否认');
						player.storage.wuFaXingDong[result.control]++;
					}
					if(event.targetsx.length>0) event.goto(1);
					"step 3"
					var dict=player.storage.wuFaXingDong;
					if(dict['认可']>=dict['否认']){
						var num=player.getCards('h').length;
						player.discard(player.getCards('h'));
						player.draw(num);
					}else{
						if(game.players[0].side==player.side){
							game.over(false);
						}else{
							game.over(true);
						}
					}
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
				group:['_wuFaXingDong_qiDongQian','_wuFaXingDong_qiDongHou'],
				subSkill:{
					qiDongQian:{
						trigger:{player:'phaseUseBegin'},
						priority:2,
						filter:function(event,player){
							return lib.skill._wuFaXingDong.filterx(event,player);
						},
						content:function(){
							"step 0"
							player.storage.wuFaXingDong={'认可':0,'否认':0};
							event.targetsx=game.filterPlayer(i=>i!=player).sortBySeat(_status.currentPhase);
							var name=get.translation(player.name);
							event.contentx=[name+'宣言无法行动',player.getCards('h')];
							event.listx=['认可','否认'];
							"step 1"
							event.target=event.targetsx.shift();
							if(event.contentx[1].length==0){
								event.target.chooseControl(event.listx).set('dialog',[event.contentx[0]]).set('ai',function(){
									return 1;
								});
							}else{
								event.target.chooseControl(event.listx).set('dialog',event.contentx).set('ai',function(){
									if(_status.event.dialog[1].length==0){
										return 1;
									}
									return 0;
								});
							}
							"step 2"
							if(result.control=='认可'){
								event.target.popup('认可');
								game.log(event.target,'认可');
								player.storage.wuFaXingDong[result.control]++;
							}else if(result.control=='否认'){
								event.target.popup('否认');
								game.log(event.target,'否认');
								player.storage.wuFaXingDong[result.control]++;
							}
							if(event.targetsx.length>0) event.goto(1);
							"step 3"
							var dict=player.storage.wuFaXingDong;
							if(dict['认可']>=dict['否认']){
								var num=player.getCards('h').length;
								player.discard(player.getCards('h'));
								player.draw(num);
							}else{
								if(game.players[0].side==player.side){
									game.over(false);
								}else{
									game.over(true);
								}
							}
						}
					},
					qiDongHou:{
						trigger:{player:'phaseUseBegin'},
						filter:function(event,player){
							return lib.skill._wuFaXingDong.filterx(event,player);
						},
						priority:-1,
						content:function(){
							"step 0"
							player.storage.wuFaXingDong={'认可':0,'否认':0};
							event.targetsx=game.filterPlayer(i=>i!=player).sortBySeat(_status.currentPhase);
							var name=get.translation(player.name);
							event.contentx=[name+'宣言无法行动',player.getCards('h').slice()];
							event.listx=['认可','否认'];
							"step 1"
							event.target=event.targetsx.shift();
							if(event.contentx[1].length==0){
								event.target.chooseControl(event.listx).set('dialog',[event.contentx[0]]).set('ai',function(){
									return 1;
								});
							}else{
								event.target.chooseControl(event.listx).set('dialog',event.contentx).set('ai',function(){
									if(_status.event.dialog[1].length==0){
										return 1;
									}
									return 0;
								});
							}
							"step 2"
							if(result.control=='认可'){
								event.target.popup('认可');
								game.log(event.target,'认可');
								player.storage.wuFaXingDong[result.control]++;
							}else if(result.control=='否认'){
								event.target.popup('否认');
								game.log(event.target,'否认');
								player.storage.wuFaXingDong[result.control]++;
							}
							if(event.targetsx.length>0) event.goto(1);
							"step 3"
							var dict=player.storage.wuFaXingDong;
							if(dict['认可']>=dict['否认']){
								var num=player.getCards('h').length;
								player.discard(player.getCards('h'));
								player.draw(num);
							}else{
								if(game.players[0].side==player.side){
									game.over(false);
								}else{
									game.over(true);
								}
							}
						}
					}
				}
			},


			_chongZhiAction:{
				trigger:{player:'phaseBegin'},
				direct:true,
				firstDo:true,
				content:function(){
					player.storage.all=1;
					player.storage.faShu=0;
					player.storage.gongJi=0;
					//player.storage.canTeShu=true;
					//判断是否有可启动技
					var skills=player.skills;
					for(var i=0;i<skills.length;i++){
						var info=get.info(skills[i]);
						var flag=false;
						if(info.type=='qiDong'){
							if(info.filter(event,player)) flag=true;
							if(flag) break;
						}
					}
					player.storage.qiDong=flag;

				}
			},

            _zhiLiao:{
                trigger:{player:"zhiLiao"},
                forced:true,
                priority:1,
                filter:function(event,player){
                    if(player.zhiLiao<=0) return false;
                    return true;
                },
                content:function(){
                    "step 0"
                    var num=trigger.getParent().num;
                    var list=[];
                    for(var i=0;i<=player.zhiLiao;i++){
                        if(i>num) break;
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','使用的[治疗]数量，目前伤害量'+num).set('ai',function(){return _status.event.num;}).set('num',list.length-1);
					"step 1"
					var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.getParent().num-=zhiLiaonum;
						game.log(player,'的','[治疗]','抵挡了'+zhiLiaonum+'点伤害');
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
					if(player.hasZhiShiWu('jueJieX')) return false;
					
                    return player.hasExpansions('_xuRuo');
                },
                content:function(event,player){
                    'step 0'
                    var list=['摸三张牌','跳过行动阶段'];
                    player.chooseControl().set('choiceList',list).set('prompt','虚弱：选择一项').set('ai',function(){
						var player=_status.event.player;
                        if(player.countCards('h')+3<=player.getHandcardLimit()) return 0;
                        return 1;
                    });
                    'step 1'
					if(result.control=='选项二'){
						player.addTempSkill('xuRuo_xiaoGuo');
					}else if(result.control=="选项一"){
						player.draw(3);
					}
                    player.loseToDiscardpile(player.getExpansions('_xuRuo'));
                },
            },
			xuRuo_xiaoGuo:{
				direct:true,
                priority:-1,
				lastDo:true,
				trigger:{player:'phaseUseBefore'},
				content:function(){
					trigger.cancel();
				}
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
					if(player.hasZhiShiWu('jueJieX')) return false;

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
                    if(event.getParent().canShengDun==false) return false;
					if(player.hasZhiShiWu('jueJieX')) return false;

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
						event.yingZhan=trigger.getParent().yingZhan;
						event.source_card=trigger.card;
						event.storage=trigger.getParent().storage;
                        event.trigger('gongJiWeiMingZhong');
                    }else if(trigger.card.name=='moDan') game.resetMoDan();
                    trigger.cancel();
                }
            },
            _yingZhan:{
                trigger:{target:'useCardToPlayered'},
                forced:true,
				firstDo:true,
                filter:function(event,player){
                    if(event.getParent().canYingZhan==false&&event.getParent().canShengGuang==false) return false;
					return get.type(event.card)=='gongJi' 
                },
                content:function(){
					'step 0'
					event.source=trigger.player;
					event.yingZhan=trigger.getParent().yingZhan;
					event.source_card=trigger.card;
					event.storage=trigger.getParent().storage;
					var name=get.translation(event.source);
					var propmt=`受到${name}的`;
					if(event.yingZhan){
						propmt+='应战攻击，';
					}else{
						propmt+='主动攻击，';
					}
					propmt+=get.translation(get.xiBie(trigger.card));
					var next=player.chooseToUse_yingZhan(propmt);
                    next.set('filterCard',function(card,player,event){
						if(get.type(card)=='gongJi'){
							if(_status.event.canYingZhan==false) return false;//不能应战设置
							if(get.xiBie(_status.event.trigger_card)=='an') return false;//暗灭不能应战
							if(card.name!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.trigger_card)) return false;
						}else{
							if(_status.event.canShengGuang==false) return false;
							if(get.name(card)!='shengGuang') return false;
						}
						return lib.filter.cardEnabled(card,player,'forceEnable');
					});
					next.set('filterTarget',function(card,player,target){
						return target!=_status.event.trigger_player&&target.side!=player.side;
						/*
						if(ui.selected.cards.length){
							if(get.name(ui.selected.cards[0])=='shengGuang'){
								return false;
							}else{
								return target!=_status.event.trigger_player&&target.side!=player.side;
							}
						}*/
                    });
					next.set('trigger_card',trigger.card);
                    next.set('trigger_player',event.source);
                    next.set('yingZhan',true);
					next.set('canYingZhan',trigger.getParent().canYingZhan);
					next.set('canShengGuang',trigger.getParent().canShengGuang);
					'step 1'
                    if(result.bool){
                        trigger.getParent().targets.remove(player);
						if(get.type(trigger.card)=='gongJi'){
							if(get.name(result.used)=='shengGuang'){
								event.trigger('gongJiWeiMingZhong');
							}
                        }
                        trigger.cancel();
                    }
					/*
                    'step 0'
                    event.source=trigger.player;
					event.yingZhan=trigger.parent.yingZhan;
					var next=player.gongJi('h');
                    next.set('filterCard',function(card,player,event){
                        if(card.name!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.trigger_card)) return false;
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
					*/
                }
            },
            _yingZhan_weiMingZhong:{
                trigger:{player:'useCard2'},
                forced:true,
				firstDo:true,
                filter:function(event,player){
                    return (event.getParent(2).name=='_yingZhan'||event.getParent(2).name=='shiShenZhouShu')&&event.card.name!='shengGuang';
                },
                content:function(){
					'step 0'
                    event.source=trigger.getParent(2).source;
                    event.player=trigger.getParent().player;
					event.yingZhan=trigger.getParent(2).yingZhan;
					event.source_card=trigger.getParent().trigger_card;
					event.storage=trigger.getParent(2).storage;
					'step 1'
                    event.trigger('gongJiWeiMingZhong');
                }
            },
			_yingZhan_sheZhi:{
				trigger:{player:'useCardBefore'},
                forced:true,
				firstDo:true,
                filter:function(event,player){
                    return (event.getParent(2).name=='_yingZhan'||event.getParent(2).name=='shiShenZhouShu')&&event.card.name!='shengGuang';
                },
				content:function(){
					trigger.yingZhan=true;
				}
			},
			/*
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
            },*/

            _moDan:{
                trigger:{target:'useCardToPlayered'},
				firstDo:true,
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
                    player.storage.moDan=true;//是否已经被魔弹
					
					//所有玩家有魔弹标记重置标记
					var num=0;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].storage.moDan==true){
							num++;
						}
					}
					if(num>=game.players.length){
						for(var i=0;i<game.players.length;i++){
							game.players[i].storage.moDan=false;
						}
					}
					
					
					var name=get.translation(trigger.player);
					var str='受到'+name+'的魔弹';
					var next=player.chooseToUse_qiTa(str,function(card,player,event){
						if(!(card.name=='moDan'||card.name=='shengGuang')) return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					});
					next.autodelay=true; 
					
                    game.broadcastAll(function(){
                        game.moDan++;
                    });
					"step 1"
					if(result.bool){
                        trigger.getParent().targets.remove(player);
						if(get.name(result.used)=='shengGuang') game.resetMoDan();
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
            _moDan1:{//第一个使用魔弹的角色增加魔弹标记
                trigger:{player:'useCard'},
				forced:true,
                filter:function(event,player){
                    if(player.storage.moDan!=true&&event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.storage.moDan=true;
                }
            },
            _moDan2:{//第一个使用魔弹的角色删除魔弹标记
                trigger:{player:'useCardEnd'},
				forced:true,
                filter:function(event,player){
                    if(player.storage.moDan!=false&&event.card.name=='moDan'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.storage.moDan=false;
                }
            },
			/*
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
            },*/
            _gouMai:{
				enable:'phaseUse',
				type:'teShu',
				filter:function(event,player){
					if(event.getParent('phaseUse').canTeShu==false) return false;
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
					order:4,
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
					if(event.getParent('phaseUse').canTeShu==false) return false;
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
								var dict={};
								for(var i=0;i<event.links.length;i++){
									if(event.links[i]=='宝石'){
										dict['r']=(dict['r']||0)+1;
									}else if(event.links[i]=='水晶'){
										dict['b']=(dict['b']||0)+1;
									}
								}
								if(dict['r']>0){
									var next=player.removeZhanJi('r',dict['r']);
								}
								if(dict['b']>0){
									var next=player.removeZhanJi('b',dict['b']);
								}
								'step 3'
								player.changeXingBei(1);
								player.changeShiQi(-1,!player.side);
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
					order:7.5,
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
					if(event.getParent('phaseUse').canTeShu==false) return false;
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
					check:function(button){
						var player=_status.event.player;
						if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
							if(button.link=='宝石') return 5;
							else return -1;
						}
						if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
							if(button.link=='水晶') return 5;
							else return 2;
						}
						//既有水晶也有宝石
						return 2;

					}
				},
				ai:{
					order:function(item,player){
						var num=Math.random();
						return 3.8-num;
					},
					result:{
						player:function(player){
							var xingShi;
							if(player.side==true){
								xingShi=game.hongZhanJi.length;
							}else{
								xingShi=game.lanZhanJi.length;
							}
							if(xingShi<=1) return 0;
							if(!(player.hasSkillTag('baoShi')||player.hasSkillTag('shuiJing'))) return -1;
							var num=player.getNengLiangLimit()-player.countNengLiangAll();
							if(num>=2) return 2;
							return 0;
						},
					},
				}
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
					if(trigger.getParent().yingZhan==true){
						player.changeZhanJi('b',1)
					}else{
						player.changeZhanJi('r',1)
                    }
				},
			},
		},
		element:{
			content:{
				//xingbei
				changeXingBei:function(){
					num=event.num;
					side=event.side;
					if(side==true){
						game.hongXingBei+=num;
						if(num>0){
							game.log('<span style="color:red;">红方</span>星杯数量增加',num);
						}else{
							game.log('<span style="color:red;">红方</span>星杯数量减少',num);
						}
					}else if(side==false){
						game.lanXingBei+=num;
						if(num>0){
							game.log('<span style="color:blue;">蓝方</span>星杯数量增加',num);
						}else{
							game.log('<span style="color:blue;">蓝方</span>星杯数量减少',num);
						}
					}
					ui.updateShiQiInfo();
					game.broadcast(function(hongXingBei,lanXingBei){
						game.hongXingBei=hongXingBei;
						game.lanXingBei=lanXingBei;
						ui.updateShiQiInfo();
					},game.hongXingBei,game.lanXingBei);

					game.checkResult();
					

				},
				changeShiQi:function(){
					'step 0'
					event.trigger('changeShiQi1');
					'step 1'
					event.trigger('changeShiQi2');
					'step 2'
					event.trigger('changeShiQi3');
					'step 3'
					event.trigger('changeShiQi4');
					'step 4'
					num=event.num;
					side=event.side;
					//增加参数是否存在最大变动值，如果存在则进行限制
					if(typeof event.shiQiMax=='number'){
						if(num<0&&num<event.shiQiMax){
							num=event.shiQiMax;
						}
						if(num>0&&num>event.shiQiMax){
							num=event.shiQiMax;
						}
						
					}

					if(side==true){
						game.hongShiQi+=num;
						if(num>0){
							game.log('<span style="color:red;">红方</span>士气增加',num);
						}else if(num<0){
							num=-num;
							game.log('<span style="color:red;">红方</span>士气减少',num);
						}
					}else if(side==false){
						game.lanShiQi+=num;
						if(num>0){
							game.log('<span style="color:blue;">蓝方</span>士气增加',num);
						}else if(num<0){
							num=-num;
							game.log('<span style="color:blue;">蓝方</span>士气减少',num);
						}
					}
					ui.updateShiQiInfo();
					game.broadcast(function(hongShiQi,lanShiQi){
						game.lanShiQi=lanShiQi;
						game.hongShiQi=hongShiQi;
						ui.updateShiQiInfo();
					},game.hongShiQi,game.lanShiQi);

					game.checkResult();
				},
				changeZhanJi:function(){
					num=event.num;
					color=event.color;
					side=event.side;
					if(color=="r"){
						var xingShi='宝石';
					}else if(color=="b"){
						var xingShi='水晶';
					}
					if(num>0){
						if(side==true){
							for(let i=0;i<num;i++){
								game.hongZhanJi.push(xingShi);
								game.log('<span style="color:red;">红方</span>战绩区增加',xingShi);
							}
						}else if(side==false){
							for(let i=0;i<num;i++){
								game.lanZhanJi.push(xingShi);
								game.log('<span style="color:blue;">蓝方</span>战绩区增加为',xingShi);
							}
						}
					}else if(num<0){
						num=-num;
						if(side==true){
							for(let i=0;i<num;i++){
								let index = game.hongZhanJi.indexOf(xingShi);  
								if (index !== -1) {  
									game.hongZhanJi.splice(index, 1);  
									game.log('<span style="color:red;">红方</span>战绩区移除',xingShi);
								}
							}
							
						}else if(side==false){
							for(let i=0;i<num;i++){
								let index = game.lanZhanJi.indexOf(xingShi);  
								if (index !== -1) {  
									game.lanZhanJi.splice(index, 1);  
									game.log('<span style="color:blue;">蓝方</span>战绩区移除',xingShi);
								}
							}
							
						}	
					}
					game.hongZhanJi.sort();
					game.lanZhanJi.sort();
					ui.updateShiQiInfo();
					game.broadcast(function(hongZhanJi,lanZhanJi){
						game.lanZhanJi=lanZhanJi;
						game.hongZhanJi=hongZhanJi;
						ui.updateShiQiInfo();
					},game.hongZhanJi,game.lanZhanJi);

					game.checkResult();
				},


				removeBiShaShuiJing:function(){
					'step 0'
                    if(player.hasMark('_tiLian_b')&&player.hasMark('_tiLian_r')){
                        var list=['宝石','水晶'];
                        player.chooseControl(list).set('prompt','选择要移除的星石').set('ai',function(){
							return 1;
						});
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
				
				addZhiShiWu:function(){
					if(event.num>0){
						player.addMark(event.zhiShiWu,event.num);
					}
				},
				removeZhiShiWu:function(){
					if(event.num>0){
						player.removeMark(event.zhiShiWu,event.num);
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
				//xingbei

				changeShiQi:function(num,side){//xingbei
					var next=game.createEvent('changeShiQi');
					next.player=this;
					if(side==undefined){
						next.side=this.side;
					}else{
						next.side=side;
					}

					var shiQi;
					switch(next.side){
						case true:
							shiQi=game.hongShiQi;break;
						case false:
							shiQi=game.lanShiQi;break;
					}
					if(num>0&&(shiQi+num>game.shiQiMax)){
						num=Math.max(0,game.shiQiMax-shiQi);
					}
					next.num=num;

					next.setContent('changeShiQi');
					return next;
				},
				changeZhanJi:function(color,num,side){//xingbei
					var next=game.createEvent('changeZhanJi');
					next.num=num;
					next.player=this;
					next.color=color;
					if(side==undefined){
						next.side=this.side;
					}else{
						next.side=side;
					}
					next.setContent('changeZhanJi');
					return next;
				},
				changeXingBei:function(num,side){//xingbei
					var next=game.createEvent('changeXingBei');
					next.num=num;
					next.player=this;
					if(side==undefined){
						next.side=this.side;
					}else{
						next.side=side;
					}
					next.setContent('changeXingBei');
					return next;
				},
				showGaiPai:function(cards,str){
					var next=game.createEvent('showGaiPai');
					next.player=this;
					next.str=str;
					if(typeof cards=='string'){
						str=cards;
						cards=next.str;
						next.str=str;
					}
					if(get.itemtype(cards)=='card') next.cards=[cards];
					else if(get.itemtype(cards)=='cards') next.cards=cards.slice(0);
					else _status.event.next.remove(next);
					next.setContent('showCards');
					next._args=Array.from(arguments);
					return next;
				},
				getZhiLiaoLimit:function(){
					var num=game.zhiLiaoMax;
					num=game.checkMod(this,num,'maxZhiLiao',this);
					return Math.max(0,num);
				},
				getNengLiangLimit:function(){
					var num=game.nengLiangMax;
					num=game.checkMod(this,num,'maxNengLiang',this);
					return Math.max(0,num);
				},


				canBiShaShuiJing:function(){//能够使用必杀星石
					if(this.hasMark('_tiLian_b')||this.hasMark('_tiLian_r')){
                        return true;
                    }else{
						return false;
					}
				},
				canBiShaBaoShi:function(){//能否使用必杀宝石
					if(this.hasMark('_tiLian_r')){
                        return true;
                    }else{
						return false;
					}
				},
				removeBiShaShuiJing:function(){//移除星石
					var next=game.createEvent('removeBiShaShuiJing',false);
					next.player=this;
					next.setContent('removeBiShaShuiJing');
					return next;
				},
				removeBiShaBaoShi:function(){//移除宝石
					this.removeMark('_tiLian_r');
				},
				changeNengLiang:function(color,num){//改变能量
					if(typeof num!='number'||!num) num=1;
					if(num>0){
						this.addMark('_tiLian_'+color,num)
					}else if(num<0){
						this.removeMark('_tiLian_'+color,-num)
					}
				},
				addNengLiang:function(color,num){//添加能量
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
				removeNengLiang:function(color,num){//移除能量
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
				countNengLiang:function(color){//统计某个能量数
					return this.countMark('_tiLian_'+color);
				},
				countNengLiangAll:function(){//统计所有能量数
					return this.countMark('_tiLian_r')+this.countMark('_tiLian_b');
				},
				damageFaShu:function(){//法术伤害，damage简单套皮
					var num,source;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							source=arguments[i];
						}
					}
					if(typeof num!='number') num=1;
					if(get.itemtype(source)!='player') source=this;
					this.damage(num,source).set('faShu',true);
				},
				addZhiShiWu:function(zhiShiWu,num,max){//添加指示物
					if(typeof num!='number'||!num) num=1;
					var info=get.info(zhiShiWu);
					if(typeof max=='number'){
						var max=max;
					}else if(info&&info.intro&&info.intro.max){
						var max=info.intro.max;
					}else{
						var max=Infinity;
					}
					var current=this.countMark(zhiShiWu);
					if(current+num>max){
						num=max-current;
					}
					var next=game.createEvent('addZhiShiWu');
					next.player=this;
					next.zhiShiWu=zhiShiWu;
					next.num=num;
					next.setContent('addZhiShiWu');
					return next;
				},
				countZhiShiWu:function(zhiShiWu){//统计指示物
					return this.countMark(zhiShiWu);
				},
				removeZhiShiWu:function(zhiShiWu,num){//移除指示物
					if(typeof num!='number'||!num) num=1;
					var current=this.countMark(zhiShiWu);
					if(num>current) num=current;
					var next=game.createEvent('removeZhiShiWu');
					next.player=this;
					next.zhiShiWu=zhiShiWu;
					next.num=num;
					next.setContent('removeZhiShiWu');
					return next;
				},
				hasZhiShiWu:function(zhiShiWu){//是否拥有指示物
					return this.hasMark(zhiShiWu);
				},
				addZhanJi:function(color,num){//增加战绩
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
				removeZhanJi:function(color,num){//移除战绩
					if(typeof num!='number'||!num) num=-1;
					if(num>0) num=-num;
					if(this.side==true){
						this.changeZhanJi(color,num);
					}else if(this.side==false){
						this.changeZhanJi(color,num);
					}
				},
				chongZhi:function(){//重置
					if(this.isLinked()){
						var next=game.createEvent('chongZhi');
						next.player=this;
						next.setContent('link');
						return next;
					}
				},
				hengZhi:function(){//横置
					if(!this.isLinked()){
						var next=game.createEvent('hengZhi');
						next.player=this;
						next.setContent('link');
						return next;
					}
				},
				qiPai:function(){//执行一次超出手牌上限的弃牌
					var num=this.needsToDiscard();
                    if(num>0){
						this.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
					}
				},
				countTongXiPai:function(){//统计同系牌数
					var h=this.getCards('h');
					var dict={};
                    for(var i=0;i<h.length;i++){
                        var xiBie=get.xiBie(h[i]);
                        if(!dict[xiBie]) dict[xiBie]=0;
                        dict[xiBie]++;
                    }
    				let maxValue=-Infinity;  
                    for(let key in dict) {  
						if (dict[key] > maxValue) {  
							maxValue = dict[key];  
						}     
					}
					return maxValue;  
				},
				countYiXiPai:function(){//统计异系牌数
					var h=this.getCards('h');
					var dict={};
                    for(var i=0;i<h.length;i++){
                        var xiBie=get.xiBie(h[i]);
                        if(!dict[xiBie]) dict[xiBie]=0;
                        dict[xiBie]++;
                    }
					return Object.keys(dict).length;
				},
				
				countSkill:function(skill){//统计使用技能次数
					if(!skill) return 0;
					var skillsList=this.getHistory('useSkill');
					var count=0;
					for(var i of skillsList){
						if(i.skill==skill) count++;
					}
					return count;
				},
				usedSkill:function(skill){//是否使用过技能
					if(!skill) return false;
					return this.countSkill(skill)>0;
				},

				changeHong:function(num){//改变红点
					if(typeof num!='number'||!num) num=1;
					var skills=this.getSkills();
					for(var i=0;i<skills.length;i++){
						var skill=skills[i];
						var info=get.info(skill);
						if(info.intro&&info.markimage=='image/card/hong.png'){
							if(num>0) this.addZhiShiWu(skill,num);
							if(num<0) this.removeZhiShiWu(skill,-num);
							break;
						}
					}
				},
				changeLan:function(num){//改变蓝点
					if(typeof num!='number'||!num) num=1;
					var skills=this.getSkills();
					for(var i=0;i<skills.length;i++){
						var skill=skills[i];
						var info=get.info(skill);
						if(info.intro&&info.markimage=='image/card/lan.png'){
							if(num>0) this.addZhiShiWu(skill,num);
							if(num<0) this.removeZhiShiWu(skill,-num);
							break;
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

			//xingbei
			zhiLiaoEffect:function(target,num){
				if(target.getZhiLiaoLimit()-target.zhiLiao<=0) return 0.1;
				if(!num){
					num=1;
				}
				var chaZhi=target.getZhiLiaoLimit()-target.zhiLiao-num;
				if(chaZhi>0){
					return chaZhi;
				}else{
					return target.getZhiLiaoLimit()-target.zhiLiao
				}
			},
			damageEffect:function(target,num){
				if(!target) return 0;
				if(!num) num=2;
				var chaZhi=target.getHandcardLimit()-target.countCards('h');
				if(chaZhi<num) return -3;
				else if(chaZhi-3<num) return -1;
				else return -0.5;
			},
			countTongXiPai:function(cards){
				var dict={};
				for(var i=0;i<cards.length;i++){
					var xiBie=get.xiBie(cards[i]);
					if(!dict[xiBie]) dict[xiBie]=0;
					dict[xiBie]++;
				}
				let maxValue=-Infinity;  
				for(let key in dict) {  
					if (dict[key] > maxValue) {  
						maxValue = dict[key];  
					}     
				}
				return maxValue;
			},
			countYiXiPai:function(cards){
				var dict={};
				for(var i=0;i<cards.length;i++){
					var xiBie=get.xiBie(cards[i]);
					if(!dict[xiBie]) dict[xiBie]=0;
					dict[xiBie]++;
				}
				return Object.keys(dict).length;
			}
		},
		help:{
			
		}
	};
});
