import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
    return {
        name:'offlineChoose',
        start:function(){
            "step 0"
            lib.init.onfree();
            _status.mode=get.config('versus_mode');
            "step 1"
            if(_status.mode=='two'){
                game.prepareArena(4);
            }else if(_status.mode=='three'){
                game.prepareArena(6);
            }else if(_status.mode=='four'){
                game.prepareArena(8);
            }
            // game.delay();
            "step 2"
            for(var i=0;i<game.players.length;i++){
                game.players[i].getId();
            }
            game.chooseCharacter();
            "step 3"
            game.pause();
            'step 4'

        },
        game:{
            chooseCharacter:function(){
                switch(get.config('choose_mode')){
                    case 'CM01':
                    case 'CM02':game.chooseCharacterCM();break;
                    case 'BP01':
                    case 'BP02':game.chooseCharacterBP();break;
                }
            },

            teamSequenceList:function(){
                var number,team_sequence;
                number=game.players.length;
                team_sequence=get.config('team_sequence');
                if(get.config('choose_mode')=='CM02'||get.config('choose_mode')=='CM01') team_sequence='CM';
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
            
            chooseCMCharacter: function(red_leader,blue_leader){
                var next=game.createEvent('choose18CharacterCM02');
                next.set('red_leader',red_leader);
                next.set('blue_leader',blue_leader);
                next.setContent(function(){
                    'step 0'
                    ui.arena.classList.add('choose-character');
                    var mode=get.config('choose_mode');
                    if(mode=='CM02'){
                        event.choose_number=27;
                        var splitNum=9;
                    }else if(mode=='CM01'){
                        event.choose_number=24;
                        var splitNum=8;
                    }
                    var list = get.characters();
                    list = get.characterGets(list,event.choose_number);
                    //9个一堆
                    event.list1 = list.slice(0, splitNum);
					event.list2 = list.slice(splitNum, 2*splitNum);
					event.list3 = list.slice(2*splitNum, 3*splitNum);
                    event.videoId = lib.status.videoId++;
                    event.list = [];

                    game.log('<span style="color: blue;">蓝色堆</span>：', event.list1);
                    game.log('<span style="color: green;">绿色堆</span>：', event.list2);
                    game.log('<span style="color: red;">红色堆</span>：', event.list3);

                    var createDialog = function(list,list1,list2,list3,id, choosing){
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
                    var changeDialogContent=function(id) {
                        var dialog = get.idDialog(id);
                        dialog.content.firstChild.innerHTML = "<span style='color:blue;'>蓝方</span>队长选择特定颜色角色堆";
                    };
                    game.broadcastAll(changeDialogContent, event.videoId);
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
                        var dialog = get.idDialog(id);
                        if (dialog) {
                            dialog.close();
                        }
                    };
                    ui.arena.classList.remove('choose-character');
                    game.broadcastAll(closeDialog, event.videoId);
                });
            },

            chooseCharacterCM:function(){
                var next=game.createEvent('chooseCharacter');
                next.setContent(function(){
                    'step 0'
                    event.number=game.players.length;
                    'step 1'
                    var ref=game.me;
                    var list=game.teamSequenceList();
                    for(var i=0;i<game.players.length;i++){
                        ref.side=list[i];
                        ref=ref.next;
                    }
                    var mode=get.config('choose_mode');
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
                    event.list=[];
                    game.chooseCMCharacter(game.me, game.me);
                    'step 2'
                    //ban角色
                    game.log('本局可选角色：',event.list);
                    event.choosing=game.me;
                    event.videoId = lib.status.videoId++;

                    var createDialog = function (list, id) {
                        var str='<span style="color:red;">红方</span>队长Ban1名角色';
                        var dialog = ui.create.dialog(str, [list, "character"]);
                        dialog.classList.add("fullwidth");
                        dialog.classList.add("fullheight");
                        dialog.classList.add("noslide");
                        dialog.classList.add("fixed");
                        dialog.videoId = id;
                    };

                    createDialog(event.list, event.videoId);

                    event.num=1;
                    event.selected = [];
                    _status.firstChoose = true;
                    'step 3'
                    var next = event.choosing.chooseButton(event.videoId, event.num, true);
                    next.set("filterButton", function (button) {
                        if (_status.event.selected.includes(button.link)) return false;
                        return true;
                    });
                    next.set("selected", event.selected);
                    next.set("ai", function () {
                        return Math.random();
                    });
                    next.set('onfree',true);
                    'step 4'
                    var changeDialogContent = function (links, first, id) {
                        var dialog = get.idDialog(id);
                        if (dialog) {
                            choosing1 = "<span style='color:red;'>红方</span>队长";
                            choosing2 = "<span style='color:lightblue;'>蓝方</span>队长";

                            dialog.content.firstChild.innerHTML =
                                choosing1 + "Ban了" + get.translation(links)+`，等待` + choosing2 + "Ban角色2名";
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
                    };
                    changeDialogContent(
                        result.links,
                        _status.firstChoose,
                        event.videoId
                    );

                    event.selected.addArray(result.links);
                    _status.firstChoose = false;

                    if (event.num==1) {
                        var str = "<span style='color:red;'>红方</span>队长";
                    } else {
                        var str = "<span style='color:lightblue;'>蓝方</span>队长";
                    }
                    game.log(str,'Ban',result.links);

                    for(var i=0;i<result.links.length;i++){
                        event.list.remove(result.links[i]);
                    }

                    event.num++;
                    if (event.num<=2) {
                        event.goto(3);
                    }
                    'step 5'
                    game.delay(2);
                    'step 6'
                    var closeDialog = function (id) {
                        ui.arena.classList.remove("playerhidden");
                        var dialog = get.idDialog(id);
                        if (dialog) {
                            dialog.close();
                        }
                    }
                    closeDialog(event.videoId);
                    //为各方队友选择角色
                    'step 7'
                    //设置第一次提示
                    event.choosed=event.choose_list[0];
                    event.selected = [];

                    event.videoId = lib.status.videoId++;
                    var createDialog = function (choosed,list, id) {
                        var dialog = ui.create.dialog(`<span style="color:red;">红方</span>为${choosed}选择角色，<span style="color:lightblue;">蓝方</span>队长是否插入Ban`, [list, "characterx"]);
                        dialog.classList.add("fullwidth");
                        dialog.classList.add("fullheight");
                        dialog.classList.add("noslide");
                        dialog.classList.add("fixed");
                        dialog.videoId = id;
                    };
                    createDialog(event.choosed.node.name.innerHTML, event.list, event.videoId);

                    _status.firstChoose = true;
                    event.num=1;//记录选角次数
                    "step 8"//插入ban角色
                    event.choosed=event.choose_list.shift();
                    event.chooseSide=event.choosed.side;
                    result.bool=undefined;

                    if(!event.red_ban&&event.chooseSide==false){
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
                    }else if(!event.blue_ban&&event.chooseSide==true){
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
                    'step 9'
                    if(result.bool){
                        if(event.chooseSide==true){
                            event.blue_ban=true;
                        }else{
                            event.red_ban=true;
                        }
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

                        var changeDialogContent=function (links, chooseSide,id,choosed) {
                            var dialog = get.idDialog(id);
                            if (dialog) {
                                var str1,str2;
                                if (chooseSide == false) {
                                    str1 = "<span style='color:red;''>红方</span>队长";
                                    str2=`，<span style="color:lightblue;">蓝方</span>队长为${choosed}选择角色`;
                                } else {
                                    str1 = "<span style='color:lightblue;'>蓝方</span>队长";
                                    str2=`，<span style="color:red;">红方</span>队长为${choosed}选择角色`;
                                }
                                dialog.content.firstChild.innerHTML =
                                    str1 + "Ban了" + get.translation(links)+str2;

                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if(links.includes(dialog.buttons[i].link)){
                                        dialog.buttons[i].classList.add("glow2");
                                    }
                                }
                            }
                        };
                        changeDialogContent(
                            result.links,
                            event.chooseSide,
                            event.videoId,
                            event.choosed.node.name.innerHTML
                        );

                        event.selected.addArray(result.links);
                        
                        if (event.chooseSide == false) {
                            var str = "<span style='color:red;'>红方</span>队长";
                        } else {
                            var str = "<span style='color:lightblue;'>蓝方</span>队长";
                        }
                        game.log(str,'插入Ban',result.links[0]);
                    }
                    
                    if(result.bool===false){
                        var changeDialogContent = function (chooseSide, id, choosed) {
                            var dialog = get.idDialog(id);
                            if (dialog) {
                                var str;
                                if (chooseSide == true) {
                                    str = `<span style="color:red;">红方</span>队长为${choosed}`;
                                } else {
                                    str = `<span style="color:lightblue;">蓝方</span>队长为${choosed}`;
                                }
                                dialog.content.firstChild.innerHTML =
                                    str + "选择角色";
                            }
                        };
                        changeDialogContent(
                            event.chooseSide,
                            event.videoId,
                            event.choosed.node.name.innerHTML
                        );
                    }
                    
                    'step 10'
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
                    "step 11";
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


                    if(!event.choosed.name1){
                        event.choosed.init(result.links[0]);
                        event.choosed.update();
                    }


                    var changeDialogContent = function (link, choosing, first, id, red_ban, blue_ban, choosed, next_choosed_name, next_choosed_side) {
                        var dialog = get.idDialog(id);
                        if (dialog) {
                            var ban='';
                            if (choosing == true) {
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
                    };

                    var name=event.choosed.node.name.innerHTML;
                     if(event.choose_list.length>0){
                        var next_choosed_name=event.choose_list[0].node.name.innerHTML;
                        var next_choosed_side=event.choose_list[0].side;
                    }else{
                        var next_choosed_name='';
                        var next_choosed_side=false;
                    }
                    changeDialogContent(
                        result.links[0],
                        event.chooseSide,
                        _status.firstChoose,
                        event.videoId,
                        event.red_ban,
                        event.blue_ban,
                        name,
                        next_choosed_name,
                        next_choosed_side
                    );

                    _status.firstChoose = false;

                    if (event.choose_list.length>0) {
                        event.goto(8);
                    }
                    game.delay(1);
                    'step 11'
                    game.delay(2);
                    'step 12'
                    var closeDialog = function (id) {
                        ui.arena.classList.remove("playerhidden");
                        ui.arena.classList.remove("playerhidden");
                        var dialog = get.idDialog(id);
                        if (dialog) {
                            dialog.close();
                        }
                    };
                    closeDialog(event.videoId);
                });
            },

            chooseCharacterBP:function(){
                var next=game.createEvent('chooseCharacterOL');
                next.setContent(function(){
                    'step 0'
                    event.number=game.players.length;
                    event.choose_number=parseInt(get.config('BPchoose_number'));
                    'step 1'
                    var ref=game.me;
                    var list=game.teamSequenceList();
                    for(var i=0;i<game.players.length;i++){
                        ref.side=list[i];
                        ref=ref.next;
                    }
                    
                    event.red_list=[];
                    event.blue_list=[];
                    event.choose_list=[];

                    var firstChoose=ref;
                    _status.firstAct=firstChoose;
                    for(var i=0;i<event.number;i++){
						firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
						firstChoose=firstChoose.next;
					}

					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==true){
                            event.red_list.push(game.players[i]);
							game.players[i].node.identity.firstChild.innerHTML='红';
						}
						else if(game.players[i].side==false){
                            event.blue_list.push(game.players[i]);
							game.players[i].node.identity.firstChild.innerHTML='蓝';
						}
						game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
					}
                    //选角顺序
                    var mode=get.config('choose_mode');
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

                    'step 2'
                    //ban角色
                    //角色列表
                    var list = get.characters();
                    event.list = get.characterGets(list,event.choose_number);
                    game.log('本局可选角色：',event.list);
                    event.choosing=game.me;
                    event.videoId = lib.status.videoId++;
                    event.selected = [];
                    event.num=1;
                    
                    var createDialog = function (list, id) {
                        var dialog = ui.create.dialog("<span style='color:red;'>红1</span>Ban角色1名", [list, "character"]);
                        dialog.classList.add("fullwidth");
                        dialog.classList.add("fullheight");
                        dialog.classList.add("noslide");
                        dialog.classList.add("fixed");
                        dialog.videoId = id;
                    };
                    createDialog(event.list, event.videoId);
                    'step 3'
                    var next = game.me.chooseButton(event.videoId, 1, true);
                    next.set("filterButton", function (button) {
                        if (_status.event.selected.includes(button.link)) return false;
                        return true;
                    });
                    next.set("selected", event.selected);
                    next.set("ai", function () {
                        return Math.random();
                    });
                    'step 4'
                    var dialog = get.idDialog(event.videoId);
                    if (dialog) {
                        var links = result.links;
                        var str1 = "<span style='color:red;'>红1</span>";
                        var str2 = "，等待<span style='color:lightblue;'>蓝1</span>Ban1名角色";
                        dialog.content.firstChild.innerHTML =
                            str1 + "Ban了" + get.translation(links)+ str2;
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.buttons[i].link == links[0]) {
                                dialog.buttons[i].classList.add("glow");
                            }
                        }
                    }

                    if (event.num == 1) {
                        var str = "<span style='color:red;'>红方</span>";
                    } else {
                        var str = "<span style='color:lightblue;'>蓝方</span>";
                    }
                    game.log(str,'Ban了',result.links);
                    event.list.removeArray(result.links);
                    event.selected.addArray(result.links);

                    event.num++;
                    if (event.num<=2) {
                        event.goto(3);
                    }
                    'step 5'
                    game.delay(2);
                    'step 6'
                    var dialog = get.idDialog(event.videoId);
                    if (dialog) {
                        dialog.close();
                    }
                    'step 7'
                    //为各方选择角色
                    //设置第一次提示
                    //console.log(event.choosed.node.name.innerHTML);
                    event.choosed=event.choose_list[0];
                    event.choosedName=event.choosed.node.name.innerHTML;
                    event.red_chooseList = [];
                    event.blue_chooseList = [];
                    event.selected = [];
                    _status.side=event.choosed.side;

                    event.videoId = lib.status.videoId++;
                    var createDialog = function (name,list,id) {
                        var dialog = ui.create.dialog(`<span style="color:red;">${name}</span>选择角色`, [list, "characterx"]);
                        dialog.classList.add("fullwidth");
                        dialog.classList.add("fullheight");
                        dialog.classList.add("noslide");
                        dialog.classList.add("fixed");
                        dialog.videoId = id;
                    };

                    createDialog(
                        event.choosedName,
                        event.list,
                        event.videoId
                    );
                    "step 8"
                    //console.log('选择角色');
                    game.delay(1);
                    event.choosed=event.choose_list.shift();
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
                    if(event.choosed.side==true){
                        event.red_chooseList.addArray(result.links);
                    }else{
                        event.blue_chooseList.addArray(result.links);
                    }

                    var name=event.choosed.node.name.innerHTML;
                    if(event.choosed.side) name=`<span style="color:red;">${name}</span>`;
                    else name=`<span style="color:lightblue;">${name}</span>`;
                    game.log(name,'选择了',result.links[0]);
                    if(!event.choosed.name1){
                        event.choosed.init(result.links[0]);
                        event.choosed.update();
                    }

                    if(event.choose_list.length>0){
                        var next_name=event.choose_list[0].node.name.innerHTML;
                        var next_side=event.choose_list[0].side;
                    }else{
                        var next_name='';
                        var next_side=false;
                    }

                    var changeDialogContent = function (link, choosed, id,name,next_name,next_side) {
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

                            if (choosed.side == true) {
                                choosed = `<span style="color:red;">${name}</span>`;
                            } else {
                                choosed = `<span style="color:lightblue;">${name}</span>`;
                            }
                            var str=choosed + "选择了" + get.translation(link)+next;
                            dialog.content.firstChild.innerHTML =str;

                            for (var i = 0; i < dialog.buttons.length; i++) {
                                if (dialog.buttons[i].link == link) {
                                    dialog.buttons[i].classList.add("glow");
                                }
                            }
                        }
                    }

                    changeDialogContent(
                        result.links[0],
                        event.choosed,
                        event.videoId,
                        name,
                        next_name,
                        next_side
                    );

                    if (event.choose_list.length>0) {
                        event.goto(8);
                    }
                    'step 10'
                    game.delay(1);
                    'step 11'
                    var dialog = get.idDialog(event.videoId);
                    if (dialog) {
                        dialog.close();
                    }
                });
            },
        },
    };
};
