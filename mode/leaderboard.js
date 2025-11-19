import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
export default () => {
    return {
        name:'leaderboard',
        start: async function(){
            var fetchCharactersData = async (mode, ai) => {
                const params = new URLSearchParams({
                    include_ai: ai,
                    mode: mode,
                    min_games: 10
                });
                try {
                    // 请求角色的胜率排行榜数据
                    const response = await fetch(`https://agdatabase.ssyy.tech:50000/v1/leaderboard?${params}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer FrRz9uz64OZUSglLKv7CcLs4yTjCedOk'
                        }
                    });
                    const data = await response.json();
                    return data;  // 获取返回的角色数据
                } catch (error) {
                    console.error('获取角色数据失败:', error);
                    return undefined;
                }
            };
            var characterDialog= async function() {
                var characterDialogGroup=Object.assign({},lib.characterDialogGroup);
                // 添加"最近"分组，显示最近使用的角色
                characterDialogGroup['最近']=function (name, capt) {
                    var list = get.config("recentCharacter",'xingBei') || [];
                    return list.includes(name) ? capt : null;
                };
               
                var  str, noclick, expandall, heightset;
                var payload = ["3v3", "false"];
                // 获取排行榜数据
                var charactersRankingData = await fetchCharactersData(payload[0],payload[1]);
                // var charactersRankingData = [];
                if (!Array.isArray(charactersRankingData)) {
                    console.error('unexpected payload:', charactersRankingData);
                    return;
                }
                // 建立索引方便后续筛选
                var characterRankingMap = new Map(
                    charactersRankingData.map(o => [o.character_id, o])
                );

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

                // 排行榜筛选按钮
                var rankingbtn1 = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin");
                rankingbtn1.style.margin = "3px";
                rankingbtn1.innerHTML = "模式：3v3";
                rankingbtn1.classList.add("thundertext");
                newlined.appendChild(rankingbtn1);

                var rankingbtn2 = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin");
                rankingbtn2.style.margin = "3px";
                rankingbtn2.innerHTML = "AI：不包含";
                rankingbtn2.classList.add("thundertext");
                newlined.appendChild(rankingbtn2);

                var rankingline1 = document.createElement("div");
                rankingline1.style.marginTop = "5px";
                rankingline1.style.display = "none";
                rankingline1.style.fontFamily = "xinwei";
                rankingline1.classList.add("pointernode");
                if (get.is.phoneLayout()) {
                    rankingline1.style.fontSize = "18px";
                } else {
                    rankingline1.style.fontSize = "22px";
                }
                rankingline1.style.textAlign = "center";
                node.appendChild(rankingline1);

                var rankingline2 = document.createElement("div");
                rankingline2.style.marginTop = "5px";
                rankingline2.style.display = "none";
                rankingline2.style.fontFamily = "xinwei";
                rankingline2.classList.add("pointernode");
                if (get.is.phoneLayout()) {
                    rankingline2.style.fontSize = "18px";
                } else {
                    rankingline2.style.fontSize = "22px";
                }
                rankingline2.style.textAlign = "center";
                node.appendChild(rankingline2);
    
                newlined2 = document.createElement("div");
                newlined2.style.marginTop = "5px";
                newlined2.style.display = "none";
                newlined2.style.fontFamily = "xinwei";
                newlined2.classList.add("pointernode");
                if (get.is.phoneLayout()) {
                    newlined2.style.fontSize = "18px";
                } else {
                    newlined2.style.fontSize = "22px";
                }
                newlined2.style.textAlign = "center";
                node.appendChild(newlined2);
    
                rankingbtn1.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                    if (_status.dragged) return;
                    newlined2.style.display = "none";
                    rankingline2.style.display = "none";
                    if (rankingline1.style.display == "none") {
                        rankingline1.style.display = "block";
                    } else {
                        rankingline1.style.display = "none";
                    }
                });

                rankingbtn2.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                    if (_status.dragged) return;
                    rankingline1.style.display = "none";
                    newlined2.style.display = "none";
                    if (rankingline2.style.display == "none") {
                        rankingline2.style.display = "block";
                    } else {
                        rankingline2.style.display = "none";
                    }
                });

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

                const allIds = list.slice();
                
                let rankingFetchSeq = 0;

                function getIdFromBtn(btn){ 
                    return String(btn._link != null ? btn._link : btn.link); 
                }
                function getWinRateNumById(id){
                    const row = characterRankingMap && characterRankingMap.get(String(id));
                    if(!row) return -Infinity;
                    const raw = (row.win_rate_pct != null) ? row.win_rate_pct : row.winRate || row.winrate;
                    const n = (typeof raw === 'number') ? raw : parseFloat(String(raw).replace('%',''));
                    return Number.isFinite(n) ? n : -Infinity;
                }
                function getGamesNumById(id){
                    const row = characterRankingMap && characterRankingMap.get(String(id));
                    if(!row) return -Infinity;
                    const n = Number(row.games);
                    return Number.isFinite(n) ? n : -Infinity;
                }

                // 计算排名函数
                function recomputeAndRenderRanks() {
                    const EPS = 1e-6;

                    const candidates = dialog.buttons.filter(
                        btn => btn.style.display !== 'none' && !btn.classList.contains('nodisplay')
                    );

                    const metrics = new Map();
                    for (const btn of candidates) {
                        const id = getIdFromBtn(btn);
                        metrics.set(btn, {
                            wr: getWinRateNumById(id),
                            g:  getGamesNumById(id),
                            nm: String(id),
                        });
                    }

                    const sorted = candidates.slice().sort((a, b) => {
                        const A = metrics.get(a), B = metrics.get(b);
                        if (Math.abs(A.wr - B.wr) > EPS) return B.wr - A.wr;  // 胜率降序
                        if (A.g !== B.g) return B.g - A.g;                    // 对局数降序
                        return A.nm.localeCompare(B.nm);                      // 名称升序
                    });

                    // 赋并列名次：1,1,3...
                    let lastWr = null;
                    let lastRank = 0;     // 上一次写入的名次
                    let seenValid = 0;    // 已计入排名的有效项数量（无数据的不计入）
                    for (const btn of sorted) {
                        const row = btn._row;
                        if (!row || !row._cells || !row._cells.tdRank) continue;

                        const m = metrics.get(btn);
                        if (!m || m.wr === -Infinity) {
                            row._cells.tdRank.innerHTML = '';  // 无数据
                            continue;
                        }

                        seenValid += 1;
                        if (lastWr === null || Math.abs(m.wr - lastWr) > EPS) {
                            lastRank = seenValid;
                            lastWr = m.wr;
                        }
                        row._cells.tdRank.innerHTML = String(lastRank);
                    }
                }

                function stableSortInPlace(arr, compareFn){
                    const indexed = arr.map((item,i)=>({item,i}));
                    indexed.sort((a,b)=>{ const r = compareFn(a.item,b.item); return r!==0 ? r : (a.i - b.i); });
                    arr.splice(0, arr.length, ...indexed.map(x=>x.item));
                }

                function sortAllAndRepaginate({ direction = 'desc' } = {}) {
                    const metrics = new Map();
                    for (const btn of dialog.buttons) {
                        const id = getIdFromBtn(btn);
                        metrics.set(btn, {
                        wr:   getWinRateNumById(id),
                        g:    getGamesNumById(id),
                        name: String(id),
                        });
                    }
                    const sign = (direction === 'asc') ? 1 : -1;

                    stableSortInPlace(dialog.buttons, (aBtn, bBtn) => {
                        const A = metrics.get(aBtn), B = metrics.get(bBtn);
                        if (A.wr !== B.wr) return sign * (A.wr - B.wr);
                        if (A.g  !== B.g ) return B.g - A.g;
                        return A.name.localeCompare(B.name);
                    });

                    const btnFrag = document.createDocumentFragment();
                    const rowFrag = document.createDocumentFragment();
                    for (const btn of dialog.buttons) {
                        btn.classList.remove('nodisplay');
                        btn.style.display = '';
                        btnFrag.appendChild(btn);
                        if (btn._row) rowFrag.appendChild(btn._row);
                    }
                    position.appendChild(btnFrag);
                    tbody.appendChild(rowFrag);

                    recomputeAndRenderRanks();
                    applyActiveFilters();
                }

                let sortDir;             // 当前排序方向
                let nextSort = 'desc';   // 下次点击方向
                let sortWinRate = false; // 是否已启用胜率排序

                var titleClick = function (e) {
                    sortAllAndRepaginate({ direction: nextSort });
                    sortWinRate = true;
                    this.innerHTML = (nextSort === 'desc') ? `<span class='firetext'>胜率↓</span>` : `<span class='firetext'>胜率↑</span>`;
                    sortDir = nextSort;
                    nextSort = (nextSort === 'desc') ? 'asc' : 'desc';
                };


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

                function refreshAllVisibleButtons() {
                    const newButtons = renderui();

                    if (Array.isArray(dialog.buttons)) {
                        dialog.buttons.splice(0, dialog.buttons.length, ...newButtons);
                    } else {
                        dialog.buttons = newButtons;
                    }
                    
                    if (typeof dialog._applyProxyHandlers === 'function') {
                        dialog._applyProxyHandlers();
                    }
                }

                function applyActiveFilters() {
                    const btns = dialog.buttons;
                    for (const btn of btns) {
                        let hide = false;
                        // 字母/最近等一级筛选
                        if (dialog.currentcapt && btn.capt != dialog.getCurrentCapt(btn.link, btn.capt)) {
                        hide = true;
                        }
                        // 角色包/收藏/最近等二级筛选
                        if (!hide && (dialog.currentcapt2 || selectPack.length) &&
                            btn.capt != dialog.getCurrentCapt(btn.link, btn.capt, true)) {
                        hide = true;
                        }
                        // 势力/双势力筛选
                        if (!hide && dialog.currentgroup) {
                        if (dialog.currentgroup === 'double') {
                            hide = !btn._changeGroup;
                        } else {
                            hide = (btn._changeGroup || btn.group != dialog.currentgroup);
                        }
                        }
                        btn.classList.toggle('nodisplay', hide);
                    }
                    // 分页同步
                    const p = dialog.paginationMap && dialog.paginationMap.get(position);
                    if (p) {
                        const pageSize = dialog.paginationMaxCount?.get?.('character') || 20;
                        const data = dialog.buttons.filter(b => !b.classList.contains('nodisplay') && b.style.display !== 'none');
                        if (Array.isArray(p.state.data)) p.state.data.splice(0, p.state.data.length, ...data);
                        else p.state.data = data;
                        p.setTotalPageCount(Math.ceil(data.length / pageSize));
                        if (typeof p.onPageChange === 'function') p.onPageChange({ pageNumber: 1, data: p.state.data });
                        else if (typeof p.setPageNumber === 'function') p.setPageNumber(1);
                    }
                }
                // 模式筛选
                var modeSwitch = async function(e) {
                    if (_status.dragged) return;
                    if (dialog.currentcapt2 == "最近" && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                        dialog.currentcapt2 = null;
                        dialog.currentcaptnode2.classList.remove("thundertext");
                        dialog.currentcaptnode2.inited = true;
                        dialog.currentcaptnode2 = null;
                    }
                    if (!rankingline1) return;
                    rankingline1.style.display = "none";
                    
                    var isActive = this.classList.contains("thundertext");
                    
                    var container = this.parentNode;
                    if (container) {
                        Array.from(container.children).forEach(function (node) {
                            node.classList.remove("thundertext");
                            if (node.touchlink) node.touchlink.classList.remove("active");
                        });
                    }
                    if (!isActive) {
                        this.classList.add("thundertext");
                        if (this.touchlink) this.touchlink.classList.add("active");
                        rankingbtn1.innerHTML = "模式：" + this.innerHTML;
                        rankingbtn1.classList.add("thundertext");
                    } else {
                        rankingbtn1.innerHTML = "模式";
                        rankingbtn1.classList.remove("thundertext");
                    }
                    
                    payload[0] = !isActive ? this.innerHTML : "";

                    // 防抖
                    const mySeq = ++rankingFetchSeq;
                    // 更新数据
                    const data = await fetchCharactersData(payload[0],payload[1]);
                    if (mySeq !== rankingFetchSeq) return; 

                    if (!Array.isArray(data)) {
                        console.error('unexpected payload:', data);
                        return;
                    }
                    charactersRankingData = data;
                    // 重新建立索引
                    characterRankingMap = new Map(
                        data.map(o => [o.character_id, o])
                    );
                    // 更新ui
                    refreshAllVisibleButtons();

                    if(sortWinRate) sortAllAndRepaginate({ direction: sortDir || "desc" });
                    else {
                        recomputeAndRenderRanks();
                        applyActiveFilters();
                    }
                }

                // AI筛选
                var aiSwitch = async function(e) {
                    if (_status.dragged) return;
                    if (dialog.currentcapt2 == "最近" && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                        dialog.currentcapt2 = null;
                        dialog.currentcaptnode2.classList.remove("thundertext");
                        dialog.currentcaptnode2.inited = true;
                        dialog.currentcaptnode2 = null;
                    }
                    if (!rankingline2) return;
                    rankingline2.style.display = "none";
                    
                    var isActive = this.classList.contains("thundertext");
                    
                    var container = this.parentNode;
                    if (container) {
                        Array.from(container.children).forEach(function (node) {
                            node.classList.remove("thundertext");
                            if (node.touchlink) node.touchlink.classList.remove("active");
                        });
                    }
                    if (!isActive) {
                        this.classList.add("thundertext");
                        if (this.touchlink) this.touchlink.classList.add("active");
                        
                        rankingbtn2.innerHTML = "AI：" + this.innerHTML;
                        rankingbtn2.classList.add("thundertext");
                    } else {
                        rankingbtn2.innerHTML = "AI";
                        rankingbtn2.classList.remove("thundertext");
                    }
                    
                    payload[1] = !isActive ? this.innerHTML==="包含"? "true": "false" : "false";

                    const mySeq = ++rankingFetchSeq;
                    // 更新数据
                    const data = await fetchCharactersData(payload[0],payload[1]);
                    if (mySeq !== rankingFetchSeq) return; 

                    if (!Array.isArray(data)) {
                        console.error('unexpected payload:', data);
                        return;
                    }
                    charactersRankingData = data;
                    // 重新建立索引
                    characterRankingMap = new Map(
                        data.map(o => [o.character_id, o])
                    );

                    // 更新ui
                    refreshAllVisibleButtons();

                    if(sortWinRate) sortAllAndRepaginate({ direction: sortDir || "desc" });
                    else {
                        recomputeAndRenderRanks();
                        applyActiveFilters();
                    }
                }
                
                // 排行榜两个按钮的子选项
                var modelist = ["4v4", "3v3", "2v2"];
                for(var i = 0; i < modelist.length; i++) {
                    var modespan = document.createElement("div");
                    modespan.style.display = "inline-block";
                    modespan.style.width = "auto";
                    modespan.style.margin = "5px";
                    if (get.is.phoneLayout()) {
                        modespan.style.fontSize = "20px";
                    } else {
                        modespan.style.fontSize = "22px";
                    }
                    modespan.innerHTML = modelist[i];
                    // 初始默认筛选3v3
                    if(modelist[i] === "3v3") {
                        modespan.classList.add("thundertext");
                    }
                    modespan.link = modelist[i];
                    modespan.addEventListener(lib.config.touchscreen ? "touchend" : "click", modeSwitch);
                    rankingline1.appendChild(modespan);
                }

                var ailist = ["包含", "不包含"];
                for(var i = 0; i < ailist.length; i++) {
                    var aispan = document.createElement("div");
                    aispan.style.display = "inline-block";
                    aispan.style.width = "auto";
                    aispan.style.margin = "5px";
                    if (get.is.phoneLayout()) {
                        aispan.style.fontSize = "20px";
                    } else {
                        aispan.style.fontSize = "22px";
                    }
                    aispan.innerHTML = ailist[i];
                    // 初始默认筛选不包含AI
                    if(ailist[i] === "不包含") {
                        aispan.classList.add("thundertext");
                    }
                    aispan.link = ailist[i];
                    aispan.addEventListener(lib.config.touchscreen ? "touchend" : "click", aiSwitch);
                    rankingline2.appendChild(aispan);
                }

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

                // 创建表格式布局来容纳排行榜
                const characterList = document.createElement('table');
                characterList.classList.add("character-list");
                characterList.style.fontSize = lib.config.touchscreen ? "16px" : "18px";
                node.appendChild(characterList);

                const thead = document.createElement('thead');
                thead.classList.add('table-head');
                characterList.appendChild(thead);

                //表头
                const thead_tr = document.createElement('tr');
                thead.appendChild(thead_tr);

                const character_rank = document.createElement('th');
                character_rank.classList.add('rank');
                character_rank.innerHTML = "排名";
                thead_tr.appendChild(character_rank);

                const character_head = document.createElement('th');
                character_head.classList.add('character');
                character_head.innerHTML = "角色";
                thead_tr.appendChild(character_head);

                const matchCount_head = document.createElement('th');
                matchCount_head.classList.add('matchCount');
                matchCount_head.innerHTML = "对局数";
                thead_tr.appendChild(matchCount_head);

                const winRate_head = document.createElement('th');
                winRate_head.classList.add('winRate');
                winRate_head.innerHTML = "<span class='firetext'>胜率</span>";
                winRate_head.addEventListener(lib.config.touchscreen ? "touchend" : "click",titleClick);
                thead_tr.appendChild(winRate_head);

                const changeShiQi_head = document.createElement('th');
                changeShiQi_head.classList.add('changeShiQi');
                changeShiQi_head.innerHTML = "场均士<br>气输出";
                thead_tr.appendChild(changeShiQi_head);

                const changedShiQi_head = document.createElement('th');
                changedShiQi_head.classList.add('changedShiQi');
                changedShiQi_head.innerHTML = "场均士<br>气损失";
                thead_tr.appendChild(changedShiQi_head);

                const zhanJi_head = document.createElement('th');
                zhanJi_head.classList.add('zhanJi');
                zhanJi_head.innerHTML = "场均产石";
                thead_tr.appendChild(zhanJi_head);

                const zhiLiao_head = document.createElement('th');
                zhiLiao_head.classList.add('zhiLiao');
                zhiLiao_head.innerHTML = "场均治疗";
                thead_tr.appendChild(zhiLiao_head);

                const damage_head = document.createElement('th');
                damage_head.classList.add('damage');
                damage_head.innerHTML = "场均伤害";
                thead_tr.appendChild(damage_head);

                const damaged_head = document.createElement('th');
                damaged_head.classList.add('damaged');
                damaged_head.innerHTML = "场均受伤";
                thead_tr.appendChild(damaged_head);

                const tbody = document.createElement('tbody');
                tbody.classList.add('table-body');
                characterList.appendChild(tbody);

                // 角色数据渲染
                var position = ui.create.div(".buttons", dialog.content);
                var buttons = [];
                var proxyFragment = document.createDocumentFragment();

                function createRowAndCells(charId) {
                    const tr = document.createElement('tr');
                    tr.dataset.character = String(charId);

                    const mk = (cls, html='—') => {
                        const td = document.createElement('td');
                        if (cls) td.classList.add(cls);
                        td.innerHTML = html;
                        tr.appendChild(td);
                        return td;
                    };

                    const tdRank     = mk('rank', '');
                    const tdCharacter = mk('character', '');
                    const tdGames     = mk('matchCount');
                    const tdWinRate   = mk('winRate');
                    const tdCSQ       = mk('changeShiQi');
                    const tdCdSQ      = mk('changedShiQi');
                    const tdZhanJi    = mk('zhanJi');
                    const tdZhiLiao   = mk('zhiLiao');
                    const tdDamage    = mk('damage');
                    const tdDamaged   = mk('damaged');

                    tr._cells = { tdRank, tdCharacter, tdGames, tdWinRate, tdCSQ, tdCdSQ, tdZhanJi, tdZhiLiao, tdDamage, tdDamaged };
                    return tr;
                }

                function syncOne(proxyBtn) {
                    const tr = proxyBtn._row;
                    if (!tr) return;
                    const hidden = proxyBtn.classList.contains('nodisplay') || proxyBtn.style.display === 'none';
                    tr.style.display = hidden ? 'none' : '';
                }

                function fillVisibleAndStats(visibleBtn, item) {
                    visibleBtn.setBackground(item, "character");
                    if (visibleBtn.node) {
                        visibleBtn.node.name?.remove();
                        visibleBtn.node.hp?.remove();
                        visibleBtn.node.group?.remove();
                        visibleBtn.node.intro?.remove();
                        visibleBtn.node.stats?.remove?.();
                    }
                    visibleBtn.node = {
                        name: ui.create.div(".name", visibleBtn),
                        hp: ui.create.div(".hp", visibleBtn),
                        group: ui.create.div(".identity", visibleBtn),
                        intro: ui.create.div(".intro", visibleBtn),
                    };
                    const infoitem = get.character(item);
                    visibleBtn.node.name.innerHTML = get.slimName(item);

                    if (lib.config.buttoncharacter_style == "default" || lib.config.buttoncharacter_style == "simple") {
                        if (lib.config.buttoncharacter_style == "simple") {
                            visibleBtn.node.group.style.display = "none";
                        }
                        visibleBtn.classList.add("newstyle");
                        visibleBtn.node.name.dataset.nature = get.groupnature(get.bordergroup(infoitem));
                        visibleBtn.node.group.dataset.nature = get.groupnature(get.bordergroup(infoitem), "raw");
                        ui.create.div(visibleBtn.node.hp);
                        var hp = infoitem.hp, maxHp = infoitem.maxHp, zhiLiao = infoitem.zhiLiao;
                        var str = get.numStr(hp);
                        if (hp !== maxHp) { str += "/"; str += get.numStr(maxHp); }
                        ui.create.div(".text", str, visibleBtn.node.hp);
                        visibleBtn.node.hp.dataset.condition = "xing";
                    } else {
                        var hp = infoitem.hp, maxHp = infoitem.maxHp, shield = infoitem.zhiLiao;
                        if (maxHp > 14) {
                            visibleBtn.node.hp.innerHTML = (hp !== maxHp || shield > 0) ? infoitem[2] : get.numStr(infoitem[2]);
                            visibleBtn.node.hp.classList.add("text");
                        } else {
                            for (var i = 0; i < maxHp; i++) {
                                var next = ui.create.div("", visibleBtn.node.hp);
                                if (i >= hp) next.classList.add("exclude");
                            }
                            for (var i = 0; i < shield; i++) {
                                ui.create.div(visibleBtn.node.hp, ".shield");
                            }
                        }
                    }
                    if (visibleBtn.node.hp.childNodes.length == 0) visibleBtn.node.name.style.top = "8px";
                    if (visibleBtn.node.name.querySelectorAll("br").length >= 4) {
                        visibleBtn.node.name.classList.add("long");
                        if (lib.config.buttoncharacter_style == "old") {
                            visibleBtn.addEventListener("mouseenter", ui.click.buttonnameenter);
                            visibleBtn.addEventListener("mouseleave", ui.click.buttonnameleave);
                        }
                    }
                    visibleBtn.node.intro.innerHTML = lib.config.intro;
                    if (!noclick) lib.setIntro(visibleBtn);

                    if (infoitem[1]) {
                        const dbl = get.is.double(item, true);
                        if (dbl) {
                            visibleBtn.node.group.innerHTML = dbl.reduce(
                                (p, g) => `${p}<div data-nature="${get.groupnature(g)}">${get.translation(g)}</div>`, ""
                            );
                            if (dbl.length > 4)
                                if (new Set([5, 6, 9]).has(dbl.length)) visibleBtn.node.group.style.height = "48px";
                                else visibleBtn.node.group.style.height = "64px";
                        } else {
                            visibleBtn.node.group.innerHTML = `<div>${get.translation(infoitem[1])}</div>`;
                            visibleBtn.node.group.style.backgroundColor = get.translation(`${get.bordergroup(infoitem)}Color`);
                        }
                    } else {
                        visibleBtn.node.group.style.display = "none";
                    }

                    const tr = visibleBtn.closest('tr');
                    if (tr && tr._cells) {
                        const cells = tr._cells;
                        const rankingData = characterRankingMap.get(String(item));
                        if (rankingData) {
                            cells.tdGames.innerHTML   = rankingData.games;
                            cells.tdWinRate.innerHTML = rankingData.win_rate_pct;
                            cells.tdCSQ.innerHTML     = rankingData.avg_change_shiqi;
                            cells.tdCdSQ.innerHTML    = rankingData.avg_changed_shiqi;
                            cells.tdZhanJi.innerHTML  = rankingData.avg_add_zhanji;
                            cells.tdZhiLiao.innerHTML = rankingData.avg_add_zhiliao;
                            cells.tdDamage.innerHTML  = rankingData.avg_damage;
                            cells.tdDamaged.innerHTML = rankingData.avg_damaged;
                        }
                    }
                }

                const observer = new MutationObserver((mutations) => {
                    for (const m of mutations) {
                        if (m.type === 'attributes' && (m.attributeName === 'class' || m.attributeName === 'style')) {
                            const proxyBtn = m.target;
                            syncOne(proxyBtn);
                        }
                    }
                });

                function renderui() {
                    if (observer && observer.disconnect) observer.disconnect();

                    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
                    while (position.firstChild) position.removeChild(position.firstChild);

                    buttons.length = 0;

                    const localProxyFrag = document.createDocumentFragment();

                    for (let i = 0; i < list.length; i++) {
                        const charId = list[i];

                        const proxyBtn = ui.create.div(".button.character");
                        proxyBtn._link = charId;
                        proxyBtn.link = charId;

                        // 修复筛选问题
                        proxyBtn.capt  = getCapt(charId);
                        proxyBtn.group = (allCharacterDict[charId] && allCharacterDict[charId][1]) || (get.character(charId) || [])[1];
                        if (get.is.double(charId, true)) proxyBtn._changeGroup = true;

                        proxyBtn.refresh = function (node, item) {
                            node.setBackground(item, "character");
                            if (node.node) {
                                node.node.name?.remove();
                                node.node.hp?.remove();
                                node.node.group?.remove();
                                node.node.intro?.remove();
                                node.node.stats?.remove?.();
                            }
                            node.node = { name: ui.create.div(".name", node) };
                            node.node.name.innerHTML = get.slimName(item);
                        };
                        proxyBtn.refresh(proxyBtn, charId);
                        Object.setPrototypeOf(proxyBtn, (lib.element.Button || Button).prototype);

                        if (!noclick) {
                            proxyBtn.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.button);
                        } else {
                            proxyBtn.classList.add("noclick");
                            const intro = proxyBtn.querySelector(".intro");
                            if (intro) intro.remove();
                        }
                        if (!proxyBtn.buttonid) proxyBtn.buttonid = get.id();
                        proxyBtn.classList.add("button2");
                        proxyBtn._args = [charId, "character", localProxyFrag, noclick, undefined];

                        const tr = createRowAndCells(charId);
                        tbody.appendChild(tr);
                        proxyBtn._row = tr;

                        const visibleBtn = ui.create.div(".button.character visible-in-cell");
                        Object.setPrototypeOf(visibleBtn, (lib.element.Button || Button).prototype);
                        visibleBtn._link = charId;
                        visibleBtn.link = charId;
                        visibleBtn._args = [charId, "character", tbody, noclick, undefined];
                        visibleBtn._proxy = proxyBtn;

                        visibleBtn.addEventListener(lib.config.touchscreen ? "touchend" : "click", function (ev) {
                            const proxy = ev.currentTarget && ev.currentTarget._proxy ? ev.currentTarget._proxy : proxyBtn;
                            if (!noclick) {
                                if(lib.config.touchscreen) {
                                    proxy.dispatchEvent(new TouchEvent("touchend", { bubbles: true }));
                                } else {
                                    proxy.dispatchEvent(new Event("click", { bubbles: true }));
                                }
                            } else {
                                ui.click.button.call(proxy, ev);
                            }
                        });

                        tr._cells.tdCharacter.appendChild(visibleBtn);
                        fillVisibleAndStats(visibleBtn, charId);

                        observer.observe(proxyBtn, { attributes: true, attributeFilter: ['class', 'style'] });
                        syncOne(proxyBtn);

                        localProxyFrag.appendChild(proxyBtn);
                        buttons.push(proxyBtn);
                    }

                    position.appendChild(localProxyFrag);
                    position.classList.add("buttons2");

                    return buttons.slice();
                }

                const newBtns = renderui();
                dialog.buttons.splice(0, dialog.buttons.length, ...newBtns);
                recomputeAndRenderRanks();

                dialog.add(ui.create.div(".placeholder"));


                var banCharacter = function (e) {
                    if (_status.clicked) {
                        _status.clicked = false;
                        return;
                    }
                    
                    ui.click.charactercard(this.link, this);  // 显示角色卡片
                };

                function applyProxyHandlers() {
                    for (i = 0; i < dialog.buttons.length; i++) {
                        dialog.buttons[i].group = allCharacterDict[dialog.buttons[i].link][1];
                        dialog.buttons[i].capt = getCapt(dialog.buttons[i].link);
                        dialog.buttons[i].classList.add("noclick");
                        dialog.buttons[i].listen(banCharacter);
                    }
                }
                applyProxyHandlers();
                dialog._applyProxyHandlers = applyProxyHandlers;

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
        
                if(get.config('sort')!=='null') {
                    if(get.config('sort')==='desc') nextSort='desc';
                    else if(get.config('sort')==='asc') nextSort='asc';
                    // 初始按胜率排序
                    titleClick.call(winRate_head, null);
                }

                return dialog;
            };

            ui.arena.classList.add('leaderboard');
            
            var dialog= await characterDialog('heightset');
            dialog.classList.add("fullwidth");
			dialog.classList.add("fullheight");
            dialog.classList.add('fixed');
            dialog.open();
            
            lib.init.onfree();
        }
    };
};