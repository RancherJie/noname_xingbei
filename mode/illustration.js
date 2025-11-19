import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
export default () => {
    return {
        name:'illustration',
        start:function(){
            var characterDialog=function() {
                var characterDialogGroup=Object.assign({},lib.characterDialogGroup);
                // 添加"最近"分组，显示最近使用的角色
                characterDialogGroup['最近']=function (name, capt) {
                    var list = get.config("recentCharacter",'xingBei') || [];
                    return list.includes(name) ? capt : null;
                };
               
                var  str, noclick, expandall, heightset;

                var list = [];
                const groups = [];
                var namecapt = [];
                /** @type { Dialog } */
                var dialog;
                /** 筛选武将的信息 */
                var node = ui.create.div(".caption.pointerspan");
                if (get.is.phoneLayout()) {
                    node.style.fontSize = "30px";
                }
                var getCapt = function (str) {
                    var capt;
                    if (str.indexOf("_") == -1) {
                        capt = str[0];
                    } else {
                        capt = str[str.lastIndexOf("_") + 1];
                    }
                    capt = capt.toLowerCase();
                    if (!/[a-z]/i.test(capt)) {
                        capt = "自定义";
                    }
                    return capt;
                };
                
                var allCharacterDict = {};

                for(var pack in lib.characterPack){
                    // 检查是否查看所有角色，如果不是则只显示已启用的角色包
                    if(!get.config('viewAll') && !lib.config.characters.includes(pack)) continue;
                    
                    for (var i in lib.characterPack[pack]) {
                        allCharacterDict[i] = lib.characterPack[pack][i];
                        // 角色可用性检查
                        if (lib.characterPack[pack][i][4]) {
                            if (lib.characterPack[pack][i].isMinskin) continue;        // 跳过皮肤角色
                            if (lib.characterPack[pack][i].isBoss || lib.characterPack[pack][i].isHiddenBoss) {
                                if (lib.config.mode == "boss") continue;              // Boss模式检查
                                if (!lib.characterPack[pack][i].isBossAllowed) continue;
                            }
                            if (lib.characterPack[pack][i].isUnseen) continue;             // 跳过不可见角色
                        }
                        
                        list.push(i);
                        // 添加到势力分组
                        if (get.is.double(i)) {
                            groups.add("double");  // 双势力角色
                        } else groups.add(lib.characterPack[pack][i][1]);
                        
                        // 添加首字母分类
                        if (namecapt.indexOf(getCapt(i)) == -1) {
                            namecapt.push(getCapt(i));
                        }
                    }
                }
                
                namecapt.sort(function (a, b) {
                    return a > b ? 1 : -1;
                });
                groups.sort(lib.sort.group);

                namecapt.push("newline");
                for (var i in characterDialogGroup) {
                    namecapt.push(i);
                }
                
                var newlined = false;
                var newlined2;
                var packsource;
                var selectPack=[];
                /** 点击筛选中的按钮 */
                //点字母和收藏和最近
                var clickCapt = function (e) {
                    if (_status.dragged) return;
                    if (dialog.currentcapt2 == "最近" && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                        dialog.currentcapt2 = null;
                        dialog.currentcaptnode2.classList.remove("thundertext");//移除被点击的效果
                        dialog.currentcaptnode2.inited = true;
                        dialog.currentcaptnode2 = null;
                    }
                    if (this.alphabet) {
                        if (this.classList.contains("thundertext")) {
                            dialog.currentcapt = null;
                            dialog.currentcaptnode = null;
                            this.classList.remove("thundertext");
                            if (this.touchlink) {
                                this.touchlink.classList.remove("active");
                            }
                            for (var i = 0; i < dialog.buttons.length; i++) {
                                if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if ((dialog.currentcapt2||selectPack.length) && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else {
                                    dialog.buttons[i].classList.remove("nodisplay");
                                }
                            }
                        } else {
                            if (dialog.currentcaptnode) {
                                dialog.currentcaptnode.classList.remove("thundertext");
                                if (dialog.currentcaptnode.touchlink) {
                                    dialog.currentcaptnode.touchlink.classList.remove("active");
                                }
                            }
                            dialog.currentcapt = this.link;
                            dialog.currentcaptnode = this;
                            this.classList.add("thundertext");
                            if (this.touchlink) {
                                this.touchlink.classList.add("active");
                            }
                            for (var i = 0; i < dialog.buttons.length; i++) {
                                if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if ((dialog.currentcapt2||selectPack.length) && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else {
                                    dialog.buttons[i].classList.remove("nodisplay");
                                }
                            }
                        }
                    } else {
                        if(this.classList.contains("thundertext")){
                            selectPack.remove(this.link);
                        }else if(packlist.includes(this.link)){
                            selectPack.add(this.link);
                        }
                        if (newlined2) {
                            newlined2.style.display = "none";
                            if(selectPack.length==0) packsource.classList.remove("thundertext");
                            if (!get.is.phoneLayout() || !lib.config.filternode_button) {
                                packsource.innerHTML = "角色包";
                            }
                        }
                        if (this.classList.contains("thundertext")) {
                            dialog.currentcapt2 = null;
                            dialog.currentcaptnode2 = null;
                            this.classList.remove("thundertext");
                            if (!get.is.phoneLayout() || !lib.config.filternode_button){
                                if(selectPack.length==1) packsource.innerHTML = get.translation(selectPack[0]+"_character_config");
                                else packsource.innerHTML = selectPack.length?"角色包("+selectPack.length+")": "角色包";
                            }
                            if (this.touchlink) {
                                this.touchlink.classList.remove("active");
                            }
                            for (var i = 0; i < dialog.buttons.length; i++) {
                                if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if (selectPack.length && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else {
                                    dialog.buttons[i].classList.remove("nodisplay");
                                }
                            }
                        } else {
                            if (!packlist.includes(this.link) && dialog.currentcaptnode2) {//移除最近和收藏
                                dialog.currentcaptnode2.classList.remove("thundertext");
                                if (dialog.currentcaptnode2.touchlink) {
                                    dialog.currentcaptnode2.touchlink.classList.remove("active");
                                }
                            }

                            dialog.currentcapt2 = this.link;
                            dialog.currentcaptnode2 = this;
                            this.classList.add("thundertext");
                            if (this.touchlink) {
                                this.touchlink.classList.add("active");
                            } else if (this.parentNode == newlined2) {
                                if (!get.is.phoneLayout() || !lib.config.filternode_button){
                                    if(selectPack.length==1) packsource.innerHTML = get.translation(this.link+"_character_config");
                                    else packsource.innerHTML = `角色包(${selectPack.length})`;
                                }
                                packsource.classList.add("thundertext");
                            }
                            for (var i = 0; i < dialog.buttons.length; i++) {
                                if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else {
                                    if (dialog.buttons[i].activate) {
                                        dialog.buttons[i].activate();
                                    }
                                    dialog.buttons[i].classList.remove("nodisplay");
                                }
                            }
                        }
                    }
                    if (dialog.seperate) {
                        for (var i = 0; i < dialog.seperate.length; i++) {
                            if (!dialog.seperate[i].nextSibling.querySelector(".button:not(.nodisplay)")) {
                                dialog.seperate[i].style.display = "none";
                                dialog.seperate[i].nextSibling.style.display = "none";
                            } else {
                                dialog.seperate[i].style.display = "";
                                dialog.seperate[i].nextSibling.style.display = "";
                            }
                        }
                    }
                    if (filternode) {
                        if (filternode.querySelector(".active")) {
                            packsource.classList.add("thundertext");
                        } else {
                            packsource.classList.remove("thundertext");
                        }
                    }
                    updatePagination();
                    if (e) e.stopPropagation();
                };
                // 创建字母表和收藏/最近
                for (i = 0; i < namecapt.length; i++) {
                    if (namecapt[i] == "newline") {
                        newlined = document.createElement("div");
                        newlined.style.marginTop = "5px";
                        newlined.style.display = "block";
                        // newlined.style.fontFamily='xinwei';
                        if (get.is.phoneLayout()) {
                            newlined.style.fontSize = "32px";
                        } else {
                            newlined.style.fontSize = "22px";
                        }
                        newlined.style.textAlign = "center";
                        node.appendChild(newlined);
                    } else if (newlined) {
                        var span = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius");
                        span.style.margin = "3px";
                        span.style.width = "auto";
                        span.innerHTML = " " + namecapt[i].toUpperCase() + " ";
                        span.link = namecapt[i];
                        span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
                        newlined.appendChild(span);
                        node[namecapt[i]] = span;
                        if (namecapt[i] == "收藏") {
                            span._nature = "fire";
                        } else {
                            span._nature = "wood";
                        }
                    } else {
                        var span = document.createElement("span");
                        span.innerHTML = " " + namecapt[i].toUpperCase() + " ";
                        span.link = namecapt[i];
                        span.alphabet = true;
                        span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
                        node.appendChild(span);
                    }
                }
                
                var span = document.createElement("span");
                newlined.appendChild(span);
                span.style.margin = "8px";
                /** 点击筛选某势力的武将 */
                var clickGroup = function () {
                    if (_status.dragged) return;
                    if (dialog.currentcapt2 == "最近" && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                        dialog.currentcapt2 = null;
                        dialog.currentcaptnode2.classList.remove("thundertext");
                        dialog.currentcaptnode2.inited = true;
                        dialog.currentcaptnode2 = null;
                    }
                    var node = this,
                        link = this.link;
                    if (node.classList.contains("thundertext")) {
                        dialog.currentgroup = null;
                        dialog.currentgroupnode = null;
                        node.classList.remove("thundertext");
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                dialog.buttons[i].classList.add("nodisplay");
                            } else if ((dialog.currentcapt2||selectPack.length) && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                dialog.buttons[i].classList.add("nodisplay");
                            } else {
                                dialog.buttons[i].classList.remove("nodisplay");
                            }
                        }
                    } else {
                        if (dialog.currentgroupnode) {
                            dialog.currentgroupnode.classList.remove("thundertext");
                        }
                        dialog.currentgroup = link;
                        dialog.currentgroupnode = node;
                        node.classList.add("thundertext");
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                dialog.buttons[i].classList.add("nodisplay");
                            } else if ((dialog.currentcapt2||selectPack.length) && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                dialog.buttons[i].classList.add("nodisplay");
                            } else if (dialog.currentgroup == "double") {
                                if (dialog.buttons[i]._changeGroup) dialog.buttons[i].classList.remove("nodisplay");
                                else dialog.buttons[i].classList.add("nodisplay");
                            } else {
                                if (dialog.buttons[i]._changeGroup || dialog.buttons[i].group != dialog.currentgroup) {
                                    dialog.buttons[i].classList.add("nodisplay");
                                } else {
                                    dialog.buttons[i].classList.remove("nodisplay");
                                }
                            }
                        }
                    }
                    updatePagination();
                };
                for (var i = 0; i < groups.length; i++) {
                    var span = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin");
                    span.style.margin = "3px";
                    newlined.appendChild(span);
                    span.innerHTML = get.translation(groups[i]);
                    span.link = groups[i];
                    span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickGroup);
                }
    
                var span = document.createElement("span");
                newlined.appendChild(span);
                span.style.margin = "8px";
    
                packsource = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin");
                packsource.style.margin = "3px";
                newlined.appendChild(packsource);
                var filternode = null;
                var clickCaptNode = function (e) {
                    delete _status.filterCharacter;
                    ui.window.classList.remove("shortcutpaused");
                    filternode.delete();
                    filternode.classList.remove("shown");
                    clickCapt.call(this.link, e);
                };
                if (get.is.phoneLayout() && lib.config.filternode_button) {
                    newlined.style.marginTop = "";
                    packsource.innerHTML = "筛选";
                    filternode = ui.create.div(".popup-container.filter-character.modenopause");
                    ui.create.div(filternode);
                    filternode.listen(function (e) {
                        if (this.classList.contains("removing")) return;
                        delete _status.filterCharacter;
                        ui.window.classList.remove("shortcutpaused");
                        this.delete();
                        this.classList.remove("shown");
                        e.stopPropagation();
                    });
                    for (var i = 0; i < node.childElementCount; i++) {
                        if (node.childNodes[i].tagName.toLowerCase() == "span") {
                            node.childNodes[i].style.display = "none";
                            node.childNodes[i].touchlink = ui.create.div(filternode.firstChild, clickCaptNode, ".menubutton.large.capt", node.childNodes[i].innerHTML);
                            node.childNodes[i].touchlink.link = node.childNodes[i];
                        }
                    }
                    ui.create.node("br", filternode.firstChild);
                } else {
                    packsource.innerHTML = "角色包";
                }
    
                newlined2 = document.createElement("div");
                newlined2.style.marginTop = "5px";
                newlined2.style.display = "none";
                newlined2.style.fontFamily = "xinwei";
                newlined2.classList.add("pointernode");
                if (get.is.phoneLayout()) {
                    newlined2.style.fontSize = "32px";
                } else {
                    newlined2.style.fontSize = "22px";
                }
                newlined2.style.textAlign = "center";
                node.appendChild(newlined2);
    
                packsource.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                    if (_status.dragged) return;
                    if (get.is.phoneLayout() && lib.config.filternode_button && filternode) {
                        _status.filterCharacter = true;
                        ui.window.classList.add("shortcutpaused");
                        ui.window.appendChild(filternode);
                        ui.refresh(filternode);
                        filternode.classList.add("shown");
                        var dh = filternode.offsetHeight - filternode.firstChild.offsetHeight;
                        if (dh > 0) {
                            filternode.firstChild.style.top = dh / 2 + "px";
                        } else {
                            filternode.firstChild.style.top = "";
                        }
                    } else {
                        if (newlined2.style.display == "none") {
                            newlined2.style.display = "block";
                        } else {
                            newlined2.style.display = "none";
                        }
                    }
                });
                var packlist = [];
                if(get.config('viewAll')){
                    packlist=Object.keys(lib.characterPack);
                }
                else{
                    for(var name of lib.config.characters){
                        if(lib.characterPack[name]&&Object.keys(lib.characterPack[name]).length>0){
                            packlist.push(name);
                        }
                    }
                }
                var sortList=['shiZhouNian','yiDuanYeHuo','shenZiChuangLin','zhongMoDaoZhu','teDian','sanBan','siBan','poXiao'];
                packlist.sort(function(a, b) {
                    var indexA = sortList.indexOf(a);
                    var indexB = sortList.indexOf(b);
                    
                    // 如果两个元素都在 sortList 中，按 sortList 的顺序排
                    if (indexA !== -1 && indexB !== -1) {
                        return indexA - indexB;
                    }
                    // 如果只有 a 在 sortList 中，a 排在前面
                    else if (indexA !== -1) {
                        return -1;
                    }
                    // 如果只有 b 在 sortList 中，b 排在前面
                    else if (indexB !== -1) {
                        return 1;
                    }
                    // 如果两个元素都不在 sortList 中，按原有顺序排列
                    return 0;
                });


                for (var i = 0; i < lib.config.all.characters.length; i++) {
                    if (!lib.config.characters.includes(lib.config.all.characters[i])) continue;
                    packlist.add(lib.config.all.characters[i]);
                }
                for (var i = 0; i < lib.config.characters.length; i++) {
                    if (lib.config.all.characters.includes(lib.config.characters[i])) continue;
                    if (!lib.characterPack[lib.config.characters[i]]) continue;
                    if (!lib.translate[lib.config.characters[i] + "_character_config"]) continue;
                    packlist.add(lib.config.characters[i]);
                }
                Object.keys(lib.characterPack)
                    .filter(key => {
                        if (key.indexOf("mode_extension") != 0) return false;
                        const extName = key.slice(15);
                        //if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
                        return lib.config[`extension_${extName}_characters_enable`] === true;
                    })
                    .forEach(key => packlist.add(key));
                for (var i = 0; i < packlist.length; i++) {
                    var span = document.createElement("div");
                    span.style.display = "inline-block";
                    span.style.width = "auto";
                    span.style.margin = "5px";
                    if (get.is.phoneLayout()) {
                        span.style.fontSize = "32px";
                    } else {
                        span.style.fontSize = "22px";
                    }
                    span.innerHTML = lib.translate[packlist[i] + "_character_config"];
                    span.link = packlist[i];
                    span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
                    newlined2.appendChild(span);
                    if (filternode) {
                        span.touchlink = ui.create.div(filternode.firstChild, clickCaptNode, ".menubutton.large", span.innerHTML);
                        span.touchlink.link = span;
                    }
                }
            
        
                
                //list.sort(lib.sort.character);

                var sort = function (a, b) {
                    const groupSort = function (name) {
                        const info = get.character(name);
                        if (!info) return 7;
                        let base = 0;
                        const group = info[1];
                        if (get.is.double(name, true)) base = 9;
                        
                        if (group == "jiGroup") base += 0;
                        if (group == "huanGroup") base += 0.01;
                        if (group == "xueGroup") base += 0.02;
                        if (group == "yongGroup") base += 0.03;
                        if (group == "shengGroup") base += 0.04;
                        if (group == "longGroup") base += 0.05;
                        if(info.hp) base += info.hp;
                        if(info.maxHp) base += info.maxHp / 10;
                        return base;
                    };
                    const del = groupSort(a) - groupSort(b);
                    if (del != 0) return del;
                    var aa = a,
                        bb = b;
                    var firstUnderscoreIndexA = a.indexOf("_");
                    var firstUnderscoreIndexB = b.indexOf("_");
                    var secondUnderscoreIndexA = firstUnderscoreIndexA != -1 ? a.indexOf("_", firstUnderscoreIndexA + 1) : -1;
                    var secondUnderscoreIndexB = firstUnderscoreIndexB != -1 ? b.indexOf("_", firstUnderscoreIndexB + 1) : -1;
        
                    if (secondUnderscoreIndexA != -1) {
                        a = a.slice(secondUnderscoreIndexA + 1);
                    } else if (firstUnderscoreIndexA != -1) {
                        a = a.slice(firstUnderscoreIndexA + 1);
                    }
        
                    if (secondUnderscoreIndexB != -1) {
                        b = b.slice(secondUnderscoreIndexB + 1);
                    } else if (firstUnderscoreIndexB != -1) {
                        b = b.slice(firstUnderscoreIndexB + 1);
                    }
        
                    if (a != b) {
                        return a > b ? 1 : -1;
                    }
                    return aa > bb ? 1 : -1;
                };

                list.sort(sort);

                // 自由选将
                dialog = ui.create.dialog("hidden");
                dialog.classList.add("noupdate");
                dialog.classList.add("scroll1");
                dialog.classList.add("scroll2");
                dialog.classList.add("scroll3");
                dialog.supportsPagination = Boolean(parseInt(lib.config.showMax_character_number));
                dialog.paginationMaxCount.set("character", 20);
                dialog.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function () {
                    _status.clicked2 = true;
                });
                if (heightset) {
                    //这里如果dialog的高度较低的话，会显示不全下面的分页按钮，所以我增加了50px，后面遇到高度问题，可以研究更完美的方案，在这里更改。
                    dialog.style.height = (game.layout == "long2" || game.layout == "nova" ? 380 : 350) + 50 + "px";
                    dialog._scrollset = true;
                }
                dialog.getCurrentCapt = function (link, capt, noalph) {
                    var currentcapt = noalph ? this.currentcapt2 : this.currentcapt;
                    if (this.seperatelist && noalph) {
                        if (this.seperatelist[currentcapt].includes(link)) return capt;
                        return null;
                    }
                    if (characterDialogGroup[currentcapt]) {
                        return characterDialogGroup[currentcapt](link, capt);
                    }
                    if(selectPack.length>0){
                        for(var pack of selectPack){
                            if(lib.characterPack[pack]){
                                if (lib.characterPack[pack][link]) {
                                return capt;
                                }
                            }
                        }
                        return null;
                    }else return this.currentcapt;
                };
                // 搜索框，by Curpond
                /** @type { Element } */
                // @ts-ignore
                const container = dialog.querySelector(".content-container>.content");
                const Searcher = ui.create.div(".searcher.caption");
                const input = document.createElement("input").css({
                    textAlign: "center",
                    border: "solid 2px #294510",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "21px"
                });
                const div = ui.create.div(".searcher.find");
                input.placeholder = "支持正则搜索";
                //使用click事件搜索，因为用input事件，难以解决按下a键会触发自动托管的bug
                let find = ui.create.button(["find", "搜索"], "tdnodes");
                find.style.display = "inline";
                const updatePagination = () => {
                    if (dialog.paginationMaxCount.get("character")) {
                        const buttons = dialog.content.querySelector(".buttons");
                        const array = dialog.buttons.filter(item => !item.classList.contains("nodisplay") && item.style.display !== 'none');
                        /** @type { Pagination } */
                        // @ts-ignore
                        const p = dialog.paginationMap.get(buttons);
                        if (p) {
                            p.state.data = array;
                            // @ts-ignore
                            p.setTotalPageCount(Math.ceil(array.length / dialog.paginationMaxCount.get("character")));
                        }
                    }
                };
                const updateFind = () => {
                    const { value } = input;
                    const reg = new RegExp(value);
                    for (let btn of dialog.buttons) {
                        if (reg.test(get.translation(btn.link)) || reg.test(get.translation(btn.link + '_ab'))) {
                            btn.classList.remove("nodisplay");
                        } else {
                            btn.classList.add("nodisplay");
                        }
                    }
                    updatePagination();
                };
                find.addEventListener('click', updateFind);
                input.onkeydown = function (e) {
                    e.stopPropagation();
                    if (e.code == "Enter") {
                        updateFind();
                    }
                };
                //阻止冒泡以防止触发窗口被拖动而无法选中文字
                input.onmousedown = function (e) {
                    e.stopPropagation();
                };
                Searcher.append(input, find);
                container.prepend(Searcher);
        
                if (str) {
                    dialog.add(str);
                }
                dialog.add(node);

                dialog.add([list, "character"], noclick);

                dialog.add(ui.create.div(".placeholder"));


                var banCharacter = function (e) {
                    if (_status.clicked) {
                        _status.clicked = false;
                        return;
                    }
                    
                    ui.click.charactercard(this.link, this);  // 显示角色卡片
                };

                for (i = 0; i < dialog.buttons.length; i++) {
                    dialog.buttons[i].group = allCharacterDict[dialog.buttons[i].link][1];
                    dialog.buttons[i].capt = getCapt(dialog.buttons[i].link);
                    dialog.buttons[i].classList.add("noclick");
                    dialog.buttons[i].listen(banCharacter);
                }

                if (!expandall) {
                    if (characterDialogGroup[lib.config.character_dialog_tool] || lib.config.character_dialog_tool == "自创") {
                        clickCapt.call(node[lib.config.character_dialog_tool]);
                    }
                }
                if (dialog.paginationMaxCount.get("character")) {
                    /** @type { HTMLDivElement } */
                    // @ts-ignore
                    const buttons = dialog.content.querySelector(".buttons");
                    const array = dialog.buttons.filter(item => !item.classList.contains("nodisplay") && item.style.display !== 'none');
                    // 传入初始配置 + 渲染元素
                    dialog.addPagination({
                        // 数据
                        data: array,
                        // 总页数(向上取整)
                        totalPageCount: Math.ceil(array.length / dialog.paginationMaxCount.get("character")),
                        // 父元素
                        container: dialog.content,
                        // 添加到容器的哪个子元素后面
                        insertAfter: buttons,
                        // 回调修改数据
                        onPageChange: state => {
                            const { pageNumber, data } = state;
                            // 设一个dialog一页显示10张武将牌
                            data.forEach((item, index) => {
                                const maxCount = dialog.paginationMaxCount.get("character");
                                if (index >= (pageNumber - 1) * maxCount && index < pageNumber * maxCount) {
                                    item.classList.remove("nodisplay");
                                } else {
                                    item.classList.add("nodisplay");
                                }
                            });
                        },
                        // 触发什么事件来更改当前页数，默认为click
                        changePageEvent: "click",
                    });
                }
        
                return dialog;
            };

            var dialog=characterDialog('heightset');
            dialog.classList.add("fullwidth");
			dialog.classList.add("fullheight");
            dialog.classList.add('fixed');
            dialog.open();
            
            lib.init.onfree();
        }
    };
};
