game.import("extension", function (lib, game, ui, get, ai, _status) {
    "use strict";

    var extensionName = "无名杯UI优化包";
    var observer = null;
    var decorateTimer = null;
    var combatLines = [];
    var combatLineHookInstalled = false;
    var combatLineSequence = 0;
    var currentCombatLineId = null;
    var skillFxInstalled = false;
    var recentSkillFx = new WeakMap();
    var clickFxInstalled = false;
    var targetDoubleClickGuardInstalled = false;
    var musicPanel = null;
    var musicTimer = null;
    var musicLayoutObserver = null;
    var musicObservedBoard = null;
    var musicPositionFrame = null;
    var musicEndedHookInstalled = false;
    var backgroundMusicHookInstalled = false;
    var originalBackgroundMusic = null;
    var customMusicContext = null;
    var lastCustomMusicByContext = Object.create(null);
    var musicMode = "random";
    var musicTracks = [];
    var musicUserPaused = false;
    var musicCollapsed = true;
    var menuMusicTracks = [
        { name: "cang1", path: "ext:" + extensionName + "/audio/bgm/menu/cang1.mp3" },
        { name: "fox1", path: "ext:" + extensionName + "/audio/bgm/menu/fox1.mp3" }
    ];
    var customBattleMusicTracks = [
        { name: "CRASHER", path: "ext:" + extensionName + "/audio/bgm/battle/CRASHER.mp3" },
        { name: "fox2", path: "ext:" + extensionName + "/audio/bgm/battle/fox2.mp3" },
        { name: "fox3", path: "ext:" + extensionName + "/audio/bgm/battle/fox3.mp3" },
        { name: "解放", path: "ext:" + extensionName + "/audio/bgm/battle/liberation.mp3" },
        { name: "速度世界", path: "ext:" + extensionName + "/audio/bgm/battle/speed-world.mp3" },
        { name: "忧伤之战", path: "ext:" + extensionName + "/audio/bgm/battle/sorrow-war.mp3" }
    ];
    var viewportObserver = null;
    var viewportFrame = null;
    var viewportListening = false;
    var cardArtMap = {
        anMie: "anMie_xianxia.png",
        shuiLianZhan: "shuiLianZhan_xianxia.png",
        huoYanZhan: "huoYanZhan_xianxia.png",
        fengShenZhan: "fengShenZhan_xianxia.png",
        leiGuangZhan: "leiGuangZhan_xianxia.png",
        diLieZhan: "diLieZhan_xianxia.png",
        shengGuang: "shengGuang_xianxia.png",
        shengDun: "shengDun_xianxia.png",
        xuRuo: "xuRuo_xianxia.png",
        zhongDu: "zhongDu_xianxia.png",
        moDan: "moDan_xianxia.png",
        moRen: "moRen_xianxia.png",
        yiRen: "yiRen_xianxia.png"
    };
    var markArtMap = {
        _shengDun: "shengDun_xianxia.png",
        _xuRuo: "xuRuo_xianxia.png",
        _zhongDu: "zhongDu_xianxia.png",
        _moDan: "moDan_xianxia.png"
    };
    var resourceMarkArtMap = {
        baoShi: "baoShi_starry.png",
        shuiJing: "shuiJing_starry.png"
    };
    var lightMarkArtMap = {
        "image/card/zhiShiWu/hong.png": "huangDeng_xianxia.png",
        "image/card/zhiShiWu/lan.png": "lanDeng_xianxia.png"
    };

    function configValue(key, fallback) {
        var name = "extension_" + extensionName + "_" + key;
        return lib.config[name] === undefined ? fallback : lib.config[name];
    }

    var extensionIdentityAliases = {
        "十周年AI优化版": "十周年-AI优化版",
        "十周年噩梦人机": "十周年-噩梦人机"
    };

    function migrateExtensionIdentityConfigs() {
        var marker = "extension_" + extensionName + "_extensionIdentityMigrationV1";
        if (lib.config[marker]) return;
        Object.keys(extensionIdentityAliases).forEach(function (newName) {
            var oldName = extensionIdentityAliases[newName];
            var oldPrefix = "extension_" + oldName + "_";
            var newPrefix = "extension_" + newName + "_";
            Object.keys(lib.config).forEach(function (key) {
                if (!key.startsWith(oldPrefix)) return;
                var newKey = newPrefix + key.slice(oldPrefix.length);
                if (lib.config[newKey] === undefined) game.saveConfig(newKey, lib.config[key]);
            });
        });
        game.saveConfig(marker, true);
    }

    function configureDefaultStarryBackground() {
        var marker = "extension_" + extensionName + "_starryBackgroundDefaultsV1";
        if (currentTheme() !== "starry") return;
        var backgroundPath = "ext:" + extensionName + "/image/background/xingbei_starry.jpg";
        var currentBackground = lib.config.image_background;
        if (currentBackground === "xingbei_starry" || (!lib.config[marker] && (!currentBackground || currentBackground === "default"))) {
            game.saveConfig("image_background", backgroundPath);
        }
        if (!lib.config[marker]) {
            game.saveConfig("image_background_blur", true);
            game.saveConfig(marker, true);
        }
        if (lib.config.image_background === backgroundPath && ui.background && game.updateBackground) game.updateBackground();
    }

    function installExtensionIdentityCompatibility() {
        if (game.saveConfig && !game.saveConfig._wmbExtensionIdentityAliases) {
            var saveConfig = game.saveConfig;
            var aliasesByPrefix = Object.keys(extensionIdentityAliases).map(function (newName) {
                return {
                    newPrefix: "extension_" + newName + "_",
                    oldPrefix: "extension_" + extensionIdentityAliases[newName] + "_"
                };
            });
            var saveConfigWithAliases = function (key) {
                var result = saveConfig.apply(this, arguments);
                if (typeof key != "string") return result;
                for (var i = 0; i < aliasesByPrefix.length; i++) {
                    var alias = aliasesByPrefix[i];
                    var aliasKey;
                    if (key.indexOf(alias.newPrefix) === 0) aliasKey = alias.oldPrefix + key.slice(alias.newPrefix.length);
                    else if (key.indexOf(alias.oldPrefix) === 0) aliasKey = alias.newPrefix + key.slice(alias.oldPrefix.length);
                    if (aliasKey) saveConfig.apply(this, [aliasKey].concat(Array.prototype.slice.call(arguments, 1)));
                }
                return result;
            };
            saveConfigWithAliases._wmbExtensionIdentityAliases = true;
            game.saveConfig = saveConfigWithAliases;
        }

        if (game.hasExtension && !game.hasExtension._wmbExtensionIdentityAliases) {
            var hasExtension = game.hasExtension;
            var hasExtensionWithAliases = function (name) {
                var oldName = extensionIdentityAliases[name];
                if (!oldName) return hasExtension.apply(this, arguments);
                var installed = Array.isArray(lib.config.extensions) && lib.config.extensions.includes(oldName);
                if (!installed) return false;
                var enabled = lib.config["extension_" + name + "_enable"];
                if (typeof enabled != "boolean") enabled = lib.config["extension_" + oldName + "_enable"];
                if (typeof enabled != "boolean") {
                    game.saveConfig("extension_" + name + "_enable", true);
                    return true;
                }
                return enabled;
            };
            hasExtensionWithAliases._wmbExtensionIdentityAliases = true;
            game.hasExtension = hasExtensionWithAliases;
        }

        if (game.hasExtensionInstalled && !game.hasExtensionInstalled._wmbExtensionIdentityAliases) {
            var hasExtensionInstalled = game.hasExtensionInstalled;
            var hasExtensionInstalledWithAliases = function (name) {
                var oldName = extensionIdentityAliases[name];
                return oldName ? hasExtensionInstalled.call(this, oldName) : hasExtensionInstalled.apply(this, arguments);
            };
            hasExtensionInstalledWithAliases._wmbExtensionIdentityAliases = true;
            game.hasExtensionInstalled = hasExtensionInstalledWithAliases;
        }

        if (game.removeExtension && !game.removeExtension._wmbExtensionIdentityAliases) {
            var removeExtension = game.removeExtension;
            var removeExtensionWithAliases = function (name, keepFile) {
                var oldName = extensionIdentityAliases[name];
                if (!oldName) return removeExtension.apply(this, arguments);
                var newPrefix = "extension_" + name;
                Object.keys(lib.config).forEach(function (key) {
                    if (key.startsWith(newPrefix)) game.saveConfig(key);
                });
                if (typeof localStorage != "undefined") localStorage.removeItem(lib.configprefix + newPrefix);
                if (typeof game.deleteDB == "function") game.deleteDB("data", newPrefix);
                return removeExtension.call(this, oldName, keepFile);
            };
            removeExtensionWithAliases._wmbExtensionIdentityAliases = true;
            game.removeExtension = removeExtensionWithAliases;
        }
    }

    function applyExtensionListSort() {
        var backupKey = "extension_" + extensionName + "_extensionSortBackup";
        if (configValue("extensionAutoSort", true) !== true) {
            if (lib.config[backupKey] !== undefined) {
                var previousSort = lib.config[backupKey];
                if (Array.isArray(previousSort)) game.saveConfig("extensionSort", previousSort);
                else game.saveConfig("extensionSort");
                game.saveConfig(backupKey);
            }
            return;
        }
        var names = Object.keys(lib.extensionMenu || {});
        var collator = new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" });
        var preferred = [
            "无名杯UI优化包",
            "十周年语音包",
            "十周年AI优化版",
            "十周年噩梦人机",
            "百年战争·序章",
            "宿命挽歌",
            "轮回遗梦",
            "永夜残响",
            "峡谷幻音",
            "电啸龙吟",
            "创世纪"
        ];
        var priority = new Map(preferred.map(function (name, index) { return ["extension_" + name, index]; }));
        names.sort(function (a, b) {
            var aPriority = priority.has(a) ? priority.get(a) : Infinity;
            var bPriority = priority.has(b) ? priority.get(b) : Infinity;
            if (aPriority !== bPriority) return aPriority - bPriority;
            return collator.compare(a, b);
        });
        if (lib.config[backupKey] === undefined) {
            var previous = Array.isArray(lib.config.extensionSort) ? lib.config.extensionSort.slice() : null;
            game.saveConfig(backupKey, previous);
        }
        var current = lib.config.extensionSort;
        var unchanged = Array.isArray(current) && current.length === names.length &&
            current.every(function (name, index) { return name === names[index]; });
        if (!unchanged) game.saveConfig("extensionSort", names);
    }

    function installExtensionListSortHook() {
        if (!ui.create || typeof ui.create.extensionMenu !== "function" || ui.create.extensionMenu._wmbAutoSort) return;
        var createExtensionMenu = ui.create.extensionMenu;
        var createSortedExtensionMenu = function () {
            applyExtensionListSort();
            return createExtensionMenu.apply(this, arguments);
        };
        createSortedExtensionMenu._wmbAutoSort = true;
        ui.create.extensionMenu = createSortedExtensionMenu;
    }

    function renderHandLimitSlots(player, countOverride, limitOverride) {
        var node = player && player.node && player.node.count;
        if (!node) return;
        var count = typeof countOverride === "number" ? countOverride :
            (typeof player.countCards === "function" ? player.countCards("h") : 0);
        var limit = typeof limitOverride === "number" ? limitOverride :
            (typeof player.getHandcardLimit === "function" ? player.getHandcardLimit() : 0);
        if (limit === "∞") limit = Infinity;
        if (!isFinite(count) || count < 0) count = 0;
        count = Math.floor(count);
        if (typeof limit !== "number" || isNaN(limit) || limit < 0) limit = 0;

        var overflow = limit === Infinity ? 0 : Math.max(0, count - limit);
        var gap = limit === Infinity ? Infinity : limit - count;
        var state = gap === 2 ? "blue" : gap <= 1 ? "yellow" : "green";
        var overflowSlots = Math.min(4, Math.ceil(overflow));
        var capacity = limit === Infinity ? Math.min(12, count) : Math.ceil(limit);
        var capacitySlots = Math.min(capacity, 12 - overflowSlots);
        var fragment = document.createDocumentFragment();
        node.classList.add("wmb-card-slots");
        node.dataset.wmbHandState = state;
        node.dataset.wmbOverflow = overflow > 0 ? "true" : "false";
        node.setAttribute("aria-label", "手牌上限槽位");

        for (var i = 0; i < capacitySlots; i++) {
            var slot = document.createElement("span");
            slot.className = "wmb-card-slot " + (i < count ? "is-filled" : "is-empty");
            fragment.appendChild(slot);
        }
        for (var j = 0; j < overflowSlots; j++) {
            var overflowSlot = document.createElement("span");
            overflowSlot.className = "wmb-card-slot is-overflow";
            fragment.appendChild(overflowSlot);
        }
        node.innerHTML = "";
        node.appendChild(fragment);
    }

    function renderTreatmentSlots(player) {
        var node = player && player.node && player.node.hp;
        if (!node || typeof player.getZhiLiaoLimit !== "function") return;
        var limit = player.getZhiLiaoLimit();
        var amount = Math.max(0, Math.floor(Number(player.zhiLiao) || 0));
        if (!isFinite(limit) || limit < 0) limit = amount;
        var slots = Math.max(1, Math.min(12, Math.ceil(limit)));
        var filled = Math.min(slots, amount);
        var fragment = document.createDocumentFragment();

        node.classList.add("wmb-treatment-slots");
        node.classList.remove("text", "textstyle", "long");
        node.dataset.wmbTreatmentState = filled > 0 ? "active" : "none";
        node.setAttribute("aria-label", "治疗槽位");
        for (var i = 0; i < slots; i++) {
            var slot = document.createElement("span");
            slot.className = "wmb-treatment-slot" + (i >= slots - filled ? " is-active" : " lost is-empty");
            fragment.appendChild(slot);
        }
        node.innerHTML = "";
        node.appendChild(fragment);
    }

    function renderPlayerSlotIndicators(player, count, limit) {
        renderHandLimitSlots(player, count, limit);
        renderTreatmentSlots(player);
    }

    function installPlayerSlotIndicators() {
        var proto = lib.element && lib.element.Player && lib.element.Player.prototype;
        if (!proto || proto._wmbPlayerSlotIndicators) return;
        var update = proto.$update;
        if (typeof update === "function") {
            proto.$update = function () {
                var result = update.apply(this, arguments);
                renderPlayerSlotIndicators(this);
                return result;
            };
        }
        var updateHandcardLimit = proto.$updateHandcardLimit;
        if (typeof updateHandcardLimit === "function") {
            proto.$updateHandcardLimit = function (limit, numh) {
                var result = updateHandcardLimit.apply(this, arguments);
                renderPlayerSlotIndicators(this, numh, limit);
                return result;
            };
        }
        proto._wmbPlayerSlotIndicators = true;
    }

    function refreshPlayerSlotIndicators() {
        var players = (game.players || []).concat(game.dead || []);
        players.forEach(function (player) {
            renderPlayerSlotIndicators(player);
        });
    }
    function currentTheme() {
        return configValue("uiTheme", "starry");
    }

    function isXianJianTheme() {
        return currentTheme() === "xianjian" || currentTheme() === "starry";
    }

    function isWaterbearTheme() {
        return false;
    }

    function isCustomTheme() {
        return isXianJianTheme() || isWaterbearTheme();
    }

    function toggleClass(node, name, enabled) {
        if (!node || !node.classList) return;
        node.classList.toggle(name, !!enabled);
    }

    function scoreboardNode() {
        var board = ui.shiQiInfo;
        if (!board || !board.isConnected) board = document.querySelector(".wmb-scoreboard, .zhanJi.table");
        // Android 1.4.5 puts zhanJi/table on the inner table, desktop on its host.
        if (board && board.tagName === "TABLE") board = board.closest(".touchinfo");
        return board;
    }

    function decorateScoreboard() {
        if (!isCustomTheme()) return;
        var board = scoreboardNode();
        toggleClass(document.body, "wmb-ui-has-scoreboard", board && board.isConnected);
        if (!board) return;
        board.classList.add("wmb-scoreboard");
        board.setAttribute(
            "data-wmb-title",
            isWaterbearTheme() ? "战局纪要" : "仙缘 · 战局"
        );

        var rows = board.querySelectorAll("tr");
        if (rows[1]) rows[1].classList.add("wmb-team-red");
        if (rows[2]) rows[2].classList.add("wmb-team-blue");
        if (isXianJianTheme()) {
            var imageRoot = lib.assetURL + "extension/" + extensionName + "/image/";
            board.querySelectorAll("td:nth-child(2) > img").forEach(function (image) {
                var source = image.getAttribute("src") || "";
                if (source.indexOf("baoShi") !== -1) {
                    image.src = imageRoot + "baoShi_starry.png";
                } else if (source.indexOf("shuiJing") !== -1) {
                    image.src = imageRoot + "shuiJing_starry.png";
                }
                image.classList.add("wmb-starstone");
            });
            [rows[1], rows[2]].forEach(function (row) {
                if (!row || !row.cells[1]) return;
                var cell = row.cells[1];
                var images = cell.querySelectorAll(":scope > img");
                var gems = Array.prototype.filter.call(images, function (image) {
                    return image.getAttribute("src").indexOf("baoShi") !== -1;
                }).length;
                var crystals = images.length - gems;
                var summary = cell.querySelector(".wmb-stone-summary");
                if (!summary) {
                    summary = document.createElement("span");
                    summary.className = "wmb-stone-summary";
                    ["baoShi", "shuiJing"].forEach(function (name) {
                        var item = document.createElement("span");
                        var icon = document.createElement("img");
                        icon.src = imageRoot + name + "_xianxia.png";
                        icon.alt = name === "baoShi" ? "宝石" : "水晶";
                        item.appendChild(icon);
                        item.appendChild(document.createElement("span"));
                        summary.appendChild(item);
                    });
                    cell.appendChild(summary);
                }
                [gems, crystals].forEach(function (count, index) {
                    var label = summary.children[index].lastChild;
                    var value = "×" + count;
                    if (label.textContent !== value) label.textContent = value;
                });
            });
        }
    }

    function battleMusicTracks() {
        return customBattleMusicTracks.slice();
    }

    function musicPath(source) {
        var path = String(source || "");
        var marker = "/extension/";
        var index = path.indexOf(marker);
        return index >= 0 ? "ext:" + decodeURI(path.slice(index + marker.length)) : path;
    }

    function currentMusicSource() {
        var audio = ui.backgroundMusic;
        return audio ? musicPath(audio.src || audio.currentSrc) : "";
    }

    function isBattleMusicContext() {
        var player = game.me;
        // 选将与开局准备阶段也会创建 game.me 和玩家列表；核心只在 gameStart 时置此标记。
        return _status.gameStarted === true && !_status.over && !!player && (!player.isIn || player.isIn()) &&
            (game.players || []).length > 0;
    }

    function chooseRandomMusicTrack(tracks, avoidPath) {
        if (!tracks.length) return null;
        var choices = tracks.filter(function (track) { return track.path !== avoidPath; });
        if (!choices.length) choices = tracks;
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function startManagedMusicTrack(track, context) {
        var audio = ui.backgroundMusic;
        if (!audio || !track || lib.config.background_music === "music_off") return;
        var path = String(track.path || "");
        if (path.indexOf("ext:") !== 0) return;
        customMusicContext = context;
        lastCustomMusicByContext[context] = track.path;
        musicUserPaused = false;
        audio.loop = musicMode === "single";
        try { audio.currentTime = 0; } catch (error) { }
        audio.src = lib.assetURL + "extension/" + path.slice(4);
        var playing = audio.play();
        if (playing && playing.catch) playing.catch(function () {});
    }

    function syncManagedMusicContext() {
        var audio = ui.backgroundMusic;
        if (!audio || lib.config.background_music === "music_off") return;
        var context = isBattleMusicContext() ? "battle" : "menu";
        var tracks = context === "battle" ? customBattleMusicTracks : menuMusicTracks;
        var source = currentMusicSource();
        var currentTrack = tracks.find(function (track) { return track.path === source; });
        if (currentTrack) {
            customMusicContext = context;
            lastCustomMusicByContext[context] = currentTrack.path;
            audio.loop = musicMode === "single";
            return;
        }
        var track = chooseRandomMusicTrack(tracks, lastCustomMusicByContext[context]);
        startManagedMusicTrack(track, context);
    }

    function installManagedMusic() {
        if (!game.playBackgroundMusic || !ui.backgroundMusic) return;
        if (!backgroundMusicHookInstalled) {
            originalBackgroundMusic = game.playBackgroundMusic;
            var playBackgroundMusicWithManagedTracks = function () {
                if (lib.config.background_music === "music_off" || !ui.backgroundMusic) {
                    return originalBackgroundMusic.apply(this, arguments);
                }
                syncManagedMusicContext();
                var audio = ui.backgroundMusic;
                if (!musicUserPaused && audio.paused && audio.src) {
                    var playing = audio.play();
                    if (playing && playing.catch) playing.catch(function () {});
                }
            };
            playBackgroundMusicWithManagedTracks._wmbManagedMusic = true;
            game.playBackgroundMusic = playBackgroundMusicWithManagedTracks;
            backgroundMusicHookInstalled = true;
        }
        if (!musicEndedHookInstalled) {
            musicEndedHookInstalled = true;
            ui.backgroundMusic.addEventListener("ended", function (event) {
                if (lib.config.background_music === "music_off") return;
                var context = isBattleMusicContext() ? "battle" : "menu";
                var tracks = context === "battle" ? customBattleMusicTracks : menuMusicTracks;
                var source = currentMusicSource();
                var currentTrack = tracks.find(function (track) { return track.path === source; });
                if (!currentTrack) return;
                event.stopImmediatePropagation();
                var nextTrack = musicMode === "single" ? currentTrack :
                    chooseRandomMusicTrack(tracks, currentTrack.path);
                startManagedMusicTrack(nextTrack, context);
            }, true);
        }
        syncManagedMusicContext();
    }

    function positionMusicPanel() {
        if (!musicPanel) return;
        var board = scoreboardNode();
        if (!isXianJianTheme() || _status.over || !board || !board.isConnected ||
            !ui.window || !ui.window.isConnected) {
            musicPanel.hidden = true;
            if (_status.over) musicUserPaused = false;
            return;
        }
        var rect = board.getBoundingClientRect();
        var windowRect = ui.window.getBoundingClientRect();
        // DOM rectangles include the core's body scale; CSS offsets do not.
        var scaleX = windowRect.width / ui.window.offsetWidth || 1;
        var scaleY = windowRect.height / ui.window.offsetHeight || 1;
        var availableWidth = Math.min(ui.window.clientWidth, visibleLayoutSize().width);
        var width = musicCollapsed ? 38 : Math.min(264, rect.width / scaleX, availableWidth - 16);
        if (musicPanel.style.width !== width + "px") musicPanel.style.width = width + "px";
        musicPanel.hidden = false;
        if ((rect.top - windowRect.top) / scaleY < musicPanel.offsetHeight + 18) {
            musicPanel.hidden = true;
            return;
        }
        var right = Math.min(availableWidth - width - 8, Math.max(8, (windowRect.right - rect.right) / scaleX)) + "px";
        var bottom = (windowRect.bottom - rect.top) / scaleY + 10 + "px";
        if (musicPanel.style.right !== right) musicPanel.style.right = right;
        if (musicPanel.style.bottom !== bottom) musicPanel.style.bottom = bottom;
    }

    function scheduleMusicPosition() {
        if (musicPositionFrame !== null) return;
        musicPositionFrame = requestAnimationFrame(function () {
            musicPositionFrame = null;
            positionMusicPanel();
        });
    }

    function visibleLayoutSize() {
        var rect = document.body.getBoundingClientRect();
        var scaleX = rect.width / document.body.offsetWidth || 1;
        var scaleY = rect.height / document.body.offsetHeight || 1;
        var viewport = window.visualViewport;
        return {
            width: Math.min(document.body.offsetWidth, (viewport ? viewport.width : window.innerWidth) / scaleX),
            height: Math.min(document.body.offsetHeight, (viewport ? viewport.height : window.innerHeight) / scaleY)
        };
    }

    function updateViewportLayout() {
        viewportFrame = null;
        if (!isXianJianTheme() || !document.body) return;
        var size = visibleLayoutSize();
        var mobile = lib.device === "android" || lib.device === "ios" ||
            /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        var small = mobile && (window.innerWidth <= 1050 || window.innerHeight <= 600);
        toggleClass(document.body, "wmb-ui-small-screen", small);
        document.body.style.setProperty("--wmb-layout-width", size.width + "px");
        document.body.style.setProperty("--wmb-layout-height", size.height + "px");
        var arenaBottom = ui.arena ? ui.arena.getBoundingClientRect().bottom : 0;
        var bodyRect = document.body.getBoundingClientRect();
        var scale = bodyRect.height / document.body.offsetHeight || 1;
        document.body.style.setProperty("--wmb-arena-overflow", Math.max(0, arenaBottom - bodyRect.bottom) / scale + "px");
        scheduleMusicPosition();
    }

    function scheduleViewportLayout() {
        if (viewportFrame !== null) return;
        viewportFrame = requestAnimationFrame(updateViewportLayout);
    }

    function installViewportLayout() {
        if (!isXianJianTheme()) return;
        if (!viewportListening) {
            viewportListening = true;
            window.addEventListener("resize", scheduleViewportLayout);
            window.addEventListener("orientationchange", scheduleViewportLayout);
            if (window.visualViewport) window.visualViewport.addEventListener("resize", scheduleViewportLayout);
            if (typeof ResizeObserver !== "undefined") {
                viewportObserver = new ResizeObserver(scheduleViewportLayout);
                viewportObserver.observe(document.body);
            }
        }
        scheduleViewportLayout();
    }

    function syncMusicPanel() {
        syncManagedMusicContext();
        if (!musicPanel || musicPanel.hidden) return;
        function setText(selector, value) {
            var node = musicPanel.querySelector(selector);
            if (node && node.textContent !== value) node.textContent = value;
            return node;
        }
        musicTracks = battleMusicTracks();
        var audio = ui.backgroundMusic;
        if (musicUserPaused && audio && !audio.paused) audio.pause();
        var source = currentMusicSource();
        var track = musicTracks.find(function (entry) { return entry.path === source; });
        var title = track ? track.name : source ? decodeURI(source.split("/").pop()).replace(/\.mp3$/i, "") :
            lib.config.background_music === "music_off" ? "音乐已关闭" : "暂无音乐";
        var titleNode = setText(".wmb-bgm-title", title);
        if (titleNode) titleNode.title = title;
        var playButton = musicPanel.querySelector(".wmb-bgm-play");
        var playingNow = !!(audio && !audio.paused);
        if (playButton.dataset.playing !== String(playingNow))
            playButton.dataset.playing = String(playingNow);
        var playTitle = playingNow ? "暂停" : "播放";
        if (playButton.title !== playTitle) playButton.title = playTitle;
        if (playButton.getAttribute("aria-label") !== playTitle)
            playButton.setAttribute("aria-label", playTitle);
        var modeButton = musicPanel.querySelector(".wmb-bgm-mode");
        setText(".wmb-bgm-mode", musicMode === "single" ? "↻¹" : "⤨");
        modeButton.title = musicMode === "single" ? "单曲循环，点击切换随机播放" : "随机播放，点击切换单曲循环";
        modeButton.setAttribute("aria-label", modeButton.title);
        if (audio && audio.src) audio.loop = musicMode === "single";
    }

    function selectMusicTrack(offset) {
        if (lib.config.background_music === "music_off") return;
        var context = isBattleMusicContext() ? "battle" : "menu";
        musicTracks = context === "battle" ? battleMusicTracks() : menuMusicTracks;
        if (!musicTracks.length) return;
        var source = currentMusicSource();
        var index = musicTracks.findIndex(function (entry) { return entry.path === source; });
        index = index < 0 ? (offset < 0 ? 0 : -1) : index;
        var track = musicTracks[(index + offset + musicTracks.length) % musicTracks.length];
        startManagedMusicTrack(track, context);
        syncMusicPanel();
    }

    function ensureMusicPanel() {
        if (!isXianJianTheme()) return;
        installManagedMusic();
        var board = scoreboardNode();
        if (!board || !board.isConnected) return;
        if (!musicPanel) {
            musicPanel = document.createElement("section");
            musicPanel.className = "wmb-bgm-panel wmb-bgm-collapsed";
            musicPanel.setAttribute("aria-label", "战局背景音乐控制");
            var previousIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 7v18"/><path d="M23 8 11 16l12 8z"/></svg>';
            var playIcon = '<svg class="wmb-bgm-icon-play" viewBox="0 0 32 32" aria-hidden="true"><path d="M11 7.5 25 16 11 24.5z"/></svg>';
            var pauseIcon = '<svg class="wmb-bgm-icon-pause" viewBox="0 0 32 32" aria-hidden="true"><path d="M11 8v16M21 8v16"/></svg>';
            var nextIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M24 7v18"/><path d="m9 8 12 8-12 8z"/></svg>';
            var collapseIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 10h16"/><path d="m10 16 6 6 6-6"/></svg>';
            var restoreIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13 7H7v6M19 7h6v6M7 19v6h6M25 19v6h-6"/><path d="m12 12-5-5m13 5 5-5m-13 13-5 5m13-5 5 5"/></svg>';
            musicPanel.innerHTML =
                '<div class="wmb-bgm-heading"><span class="wmb-bgm-title" title="当前播放音乐">暂无音乐</span></div>' +
                '<div class="wmb-bgm-controls">' +
                '<button type="button" class="wmb-bgm-prev" title="上一首" aria-label="上一首">' + previousIcon + '</button>' +
                '<button type="button" class="wmb-bgm-play" title="播放" aria-label="播放">' + playIcon + pauseIcon + '</button>' +
                '<button type="button" class="wmb-bgm-next" title="下一首" aria-label="下一首">' + nextIcon + '</button>' +
                '<button type="button" class="wmb-bgm-mode" title="随机播放" aria-label="随机播放">⤨</button>' +
                '<button type="button" class="wmb-bgm-collapse" title="收起音乐窗" aria-label="收起音乐窗">' + collapseIcon + '</button>' +
                '</div>' +
                '<button type="button" class="wmb-bgm-restore" title="展开音乐窗" aria-label="展开音乐窗">' + restoreIcon + '</button>';
            ui.window.appendChild(musicPanel);
            musicPanel.querySelector(".wmb-bgm-prev").addEventListener("click", function () { selectMusicTrack(-1); });
            musicPanel.querySelector(".wmb-bgm-next").addEventListener("click", function () { selectMusicTrack(1); });
            musicPanel.querySelector(".wmb-bgm-play").addEventListener("click", function () {
                var audio = ui.backgroundMusic;
                if (!audio || lib.config.background_music === "music_off") return;
                if (audio.paused) {
                    musicUserPaused = false;
                    if (!audio.src) selectMusicTrack(1);
                    else {
                        var playing = audio.play();
                        if (playing && playing.catch) playing.catch(function () {});
                    }
                } else {
                    musicUserPaused = true;
                    audio.pause();
                }
                syncMusicPanel();
            });
            musicPanel.querySelector(".wmb-bgm-mode").addEventListener("click", function () {
                musicMode = musicMode === "single" ? "random" : "single";
                syncMusicPanel();
            });
            musicPanel.querySelector(".wmb-bgm-collapse").addEventListener("click", function () {
                musicCollapsed = true;
                musicPanel.classList.add("wmb-bgm-collapsed");
                scheduleMusicPosition();
            });
            musicPanel.querySelector(".wmb-bgm-restore").addEventListener("click", function () {
                musicCollapsed = false;
                musicPanel.classList.remove("wmb-bgm-collapsed");
                scheduleMusicPosition();
            });
        }
        if (musicPanel.parentNode !== ui.window) ui.window.appendChild(musicPanel);
        if (typeof ResizeObserver !== "undefined" && musicObservedBoard !== board) {
            if (musicLayoutObserver) musicLayoutObserver.disconnect();
            musicLayoutObserver = new ResizeObserver(scheduleMusicPosition);
            musicLayoutObserver.observe(board);
            musicLayoutObserver.observe(ui.window);
            musicObservedBoard = board;
        }
        scheduleMusicPosition();
        syncMusicPanel();
        if (!musicTimer) {
            musicTimer = setInterval(syncMusicPanel, 700);
            window.addEventListener("resize", scheduleMusicPosition);
        }
    }

    function applyCardDefinitions() {
        if (!isXianJianTheme()) return;
        if (!configValue("cardArt", true)) return;
        Object.keys(cardArtMap).forEach(function (name) {
            if (!lib.card[name]) return;
            lib.card[name].image = "ext:" + extensionName + "/image/card/" + cardArtMap[name];
        });
        Object.keys(markArtMap).forEach(function (name) {
            if (!lib.skill[name]) return;
            lib.skill[name].markimage = "extension/" + extensionName + "/image/mark/" + markArtMap[name];
        });
        Object.keys(resourceMarkArtMap).forEach(function (name) {
            var image = "extension/" + extensionName + "/image/" + resourceMarkArtMap[name];
            var expandedName = "_tiLian_" + name;
            if (lib.skill[expandedName]) lib.skill[expandedName].markimage = image;
            if (lib.skill._tiLian && lib.skill._tiLian.subSkill && lib.skill._tiLian.subSkill[name]) {
                lib.skill._tiLian.subSkill[name].markimage = image;
            }
        });
        Object.keys(lib.skill).forEach(function (name) {
            var skill = lib.skill[name];
            if (!skill || !lightMarkArtMap[skill.markimage]) return;
            skill.markimage = "extension/" + extensionName + "/image/" + lightMarkArtMap[skill.markimage];
        });
    }

    function decorateLightMarks() {
        if (!isXianJianTheme()) return;
        document.querySelectorAll(".player .card.mark").forEach(function (mark) {
            var skill = mark.name && lib.skill[mark.name];
            if (!skill || typeof skill.markimage != "string" ||
                skill.markimage.indexOf("extension/" + extensionName + "/image/") !== 0) return;
            if (skill.markimage.indexOf("huangDeng_xianxia.png") === -1 &&
                skill.markimage.indexOf("lanDeng_xianxia.png") === -1) return;
            if (mark.setBackgroundImage) mark.setBackgroundImage(skill.markimage);
        });
    }

    function decorateCards() {
        if (!isXianJianTheme()) return;
        if (!configValue("cardArt", true)) return;
        var imageRoot = "extension/" + extensionName + "/image/card/";
        document.querySelectorAll(".card").forEach(function (card) {
            var name = card.name;
            if (!name || !cardArtMap[name] || card.dataset.wmbCardArt === name) return;
            if (card.node && card.node.image && card.node.image.setBackgroundImage) {
                card.node.image.setBackgroundImage(imageRoot + cardArtMap[name]);
                card.dataset.wmbCardArt = name;
            }
        });
    }

    function decorateTeamIdentities() {
        if (!isCustomTheme()) return;
        document.querySelectorAll(".player .identity").forEach(function (identity) {
            var text = (identity.textContent || "").replace(/\s/g, "");
            var isRed = text.indexOf("红") !== -1;
            var isBlue = text.indexOf("蓝") !== -1;
            identity.classList.toggle("wmb-identity-red", isRed);
            identity.classList.toggle("wmb-identity-blue", isBlue);
            var player = identity.closest(".player");
            if (player) {
                player.classList.toggle("wmb-team-slot-red", isRed);
                player.classList.toggle("wmb-team-slot-blue", isBlue);
            }
        });
    }

    function decorateTargetSelection() {
        if (!isXianJianTheme() || !ui.arena) return;
        var selecting = ui.arena.classList.contains("selecting");
        var selected = ui.selected && Array.isArray(ui.selected.targets) ?
            ui.selected.targets : Array.prototype.slice.call(
                document.querySelectorAll("#arena .player.selected")
            );
        var numerals = ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        document.querySelectorAll("#arena .player").forEach(function (player) {
            var index = selected.indexOf(player);
            var badge = player.querySelector(":scope > .wmb-target-order");
            if (selecting && index !== -1) {
                if (!badge) {
                    badge = document.createElement("div");
                    badge.className = "wmb-target-order";
                    player.appendChild(badge);
                }
                var orderText = numerals[index] || String(index + 1);
                if (badge.textContent !== orderText) badge.textContent = orderText;
            } else if (badge) {
                badge.remove();
            }
        });

        var counter = document.querySelector(".wmb-target-counter");
        var range = null;
        if (selecting && _status.event && _status.event.selectTarget !== undefined) {
            try { range = get.select(_status.event.selectTarget); } catch (error) {}
        }
        var maximum = range && range[1];
        var multiple = maximum === Infinity || maximum === -1 || maximum > 1;
        if (selecting && multiple) {
            if (!counter) {
                counter = document.createElement("div");
                counter.className = "wmb-target-counter";
                document.body.appendChild(counter);
            }
            var counterText = "已选 " + selected.length + "/" +
                (maximum === Infinity || maximum === -1 ? "不限" : maximum);
            if (counter.textContent !== counterText) counter.textContent = counterText;
        } else if (counter) {
            counter.remove();
        }
    }

    function decorateTurnIndicators() {
        if (!isXianJianTheme()) return;
        document.querySelectorAll("#arena .player:not(.minskin)").forEach(function (player) {
            if (!player.querySelector(":scope > .wmb-xj-turn-shade")) {
                var shade = document.createElement("div");
                shade.className = "wmb-xj-turn-shade";
                player.appendChild(shade);
            }
            if (!player.querySelector(":scope > .wmb-xj-turn-label")) {
                var label = document.createElement("div");
                label.className = "wmb-xj-turn-label";
                label.textContent = "当前回合";
                player.appendChild(label);
            }
        });
    }

    function applyRootClasses() {
        var body = document.body;
        if (!body) return false;
        if (!isCustomTheme()) return false;
        toggleClass(body, "wmb-ui-waterbear", isWaterbearTheme());
        toggleClass(body, "wmb-ui-no-motion", !configValue("motion", true));
        if (isWaterbearTheme()) return true;
        body.classList.add("wmb-ui-optimized");
        toggleClass(body, "wmb-ui-compact", configValue("compactLayout", false));
        toggleClass(body, "wmb-ui-strong-glass", configValue("glass", "standard") === "strong");
        return true;
    }

    function decorateGlobalUi() {
        if (!isCustomTheme()) return;
        document.querySelectorAll("#system1 > div, #system2 > div").forEach(function (button) {
            button.classList.add("wmb-system-button");
        });
        document.querySelectorAll(".dialog.popped, .menubg.charactercard").forEach(function (detail) {
            detail.classList.add("wmb-detail-panel");
        });
        document.querySelectorAll(".player.connect").forEach(function (player) {
            player.classList.add("wmb-connect-player");
        });
        document.querySelectorAll(".connectbutton").forEach(function (button) {
            button.classList.add("wmb-connect-button");
        });
        document.querySelectorAll(".dialog.fullwidth.fullheight.fixed").forEach(function (rooms) {
            rooms.classList.add("wmb-room-list");
        });
        document.querySelectorAll(".connectevents").forEach(function (button) {
            button.classList.add("wmb-connect-hall-button");
        });
    }

    function decorateFactionFrames() {
        if (!isWaterbearTheme()) return;
        var factionClasses = [
            "wmb-wb-faction-xue", "wmb-wb-faction-sheng",
            "wmb-wb-faction-ji", "wmb-wb-faction-huan",
            "wmb-wb-faction-yong", "wmb-wb-faction-other"
        ];
        document.querySelectorAll(".player").forEach(function (player) {
            factionClasses.forEach(function (name) {
                player.classList.remove(name);
            });
            var group = player.group;
            if (!group) {
                var character = lib.character[player.name1 || player.name];
                if (character) group = character[1];
            }
            var faction = {
                xueGroup: "xue",
                shengGroup: "sheng",
                jiGroup: "ji",
                huanGroup: "huan",
                yongGroup: "yong"
            }[group] || "other";
            player.classList.add("wmb-wb-faction-" + faction);
            player.setAttribute("data-wmb-faction", faction);
            if (!player.querySelector(":scope > .wmb-wb-frame-left")) {
                var frame = document.createElement("div");
                frame.className = "wmb-wb-frame-left";
                player.appendChild(frame);
            }
        });
    }

    function skillFxType(name) {
        var title = get.translation(name) || "";
        var info = lib.skill[name] || {};
        if (info.type === "faShu" || title.indexOf("法术") === 0 ||
            title.indexOf("启动") === 0) return "spell";
        if (title.indexOf("响应") === 0) return "response";
        return "passive";
    }

    function skillFxText(name, player) {
        var internalName = typeof name === "string" ? name : "";
        var healingSuffix = /_zhiliao$/i.test(internalName);
        if (healingSuffix) {
            var baseName = internalName.replace(/_zhiliao$/i, "");
            var baseText = baseName ? get.translation(baseName) : "";
            if (baseText && baseText !== baseName) return baseText + "·治疗";
            return "治疗";
        }
        var text = get.skillTranslation ?
            get.skillTranslation(internalName, player) : get.translation(internalName);
        if (!text || text === internalName) {
            text = get.translation(internalName);
        }
        return text && text !== internalName ? text : "技能发动";
    }

    function refreshSkillFxPositions() {
        document.querySelectorAll(".wmb-skill-banner").forEach(function (banner, index) {
            banner.style.setProperty("--wmb-skill-offset", (index * 62) + "px");
        });
    }

    function playSkillFx(player, name) {
        if (!isCustomTheme() || !document.body || !player) return;
        var now = Date.now();
        var recent = recentSkillFx.get(player);
        if (recent && recent.name === name && now - recent.time < 220) return;
        recentSkillFx.set(player, { name: name, time: now });
        var type = skillFxType(name);
        var prefix = isWaterbearTheme() ? "wmb-wb" : "wmb-xj";
        var banner = document.createElement("div");
        banner.className = "wmb-skill-banner " + prefix +
            "-skill-banner " + prefix + "-skill-" + type;
        banner.textContent = skillFxText(name, player);
        ["left", "right"].forEach(function (side) {
            var star = document.createElement("span");
            star.className = prefix + "-skill-star " + prefix + "-skill-star-" + side;
            star.setAttribute("aria-hidden", "true");
            banner.appendChild(star);
        });
        document.body.appendChild(banner);
        refreshSkillFxPositions();
        player.classList.add(prefix + "-skill-source", prefix + "-skill-source-" + type);
        setTimeout(function () {
            banner.remove();
            refreshSkillFxPositions();
            player.classList.remove(
                prefix + "-skill-source",
                prefix + "-skill-source-" + type
            );
        }, 1650);
    }

    function installSkillFx() {
        if (skillFxInstalled || !isCustomTheme() ||
            !lib.element || !lib.element.player ||
            typeof lib.element.player.logSkill !== "function" ||
            typeof lib.element.player.useSkill !== "function") return;
        skillFxInstalled = true;
        var originalLogSkill = lib.element.player.logSkill;
        lib.element.player.logSkill = function (name) {
            var skillName = Array.isArray(name) ? name[0] : name;
            var result = originalLogSkill.apply(this, arguments);
            playSkillFx(this, skillName);
            return result;
        };
        var originalUseSkill = lib.element.player.useSkill;
        lib.element.player.useSkill = function () {
            var skillName = "";
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === "string") skillName = arguments[i];
            }
            var result = originalUseSkill.apply(this, arguments);
            if (skillName) playSkillFx(this, skillName);
            return result;
        };
    }

    function attackColor(card) {
        var xiBie = card ? get.xiBie(card) : "";
        return ["shui", "huo", "feng", "lei", "di", "guang", "an"]
            .includes(xiBie) ? xiBie : "default";
    }

    function combatFxPrefix() {
        return isWaterbearTheme() ? "wmb-wb" : "wmb-xj";
    }

    function clearCombatLines() {
        combatLines.forEach(function (line) { line.remove(); });
        combatLines.length = 0;
        currentCombatLineId = null;
    }

    function addCombatLineFallback(source, target, color) {
        var parent = game.chess && ui.chess ? ui.chess : ui.arena;
        if (!source || !target || !parent) return;
        var x1 = source.getLeft() + source.offsetWidth / 2;
        var y1 = source.getTop() + source.offsetHeight / 2;
        var x2 = target.getLeft() + target.offsetWidth / 2;
        var y2 = target.getTop() + target.offsetHeight / 2;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var deg = Math.atan(Math.abs(dy) / Math.abs(dx)) / Math.PI * 180;
        if (dx >= 0) {
            if (dy <= 0) deg += 90;
            else deg = 90 - deg;
        } else if (dy <= 0) {
            deg = 270 - deg;
        } else {
            deg += 270;
        }
        var line = document.createElement("div");
        var prefix = combatFxPrefix();
        line.className = prefix + "-attack-fallback " + prefix + "-line-" + color;
        line.style.left = (x1 - 3.5) + "px";
        line.style.top = y1 + "px";
        line.style.height = Math.sqrt(dx * dx + dy * dy) + "px";
        var transform = "rotate(" + (-deg) + "deg)";
        line.style.transitionProperty = "transform";
        line.style.transitionDuration = ((Number(lib.config.duration) || 500) * 2 / 3000) + "s";
        line.style.transitionTimingFunction = "ease-out";
        line.style.transform = transform + " scaleY(0)";
        parent.appendChild(line);
        ui.refresh(line);
        line.style.transform = transform + " scaleY(1)";
        combatLines.push(line);
    }

    function installCombatLineHook() {
        if (combatLineHookInstalled || !isCustomTheme() ||
            !lib.element || !lib.element.player ||
            typeof lib.element.player.line !== "function") return;
        combatLineHookInstalled = true;
        var original = lib.element.player.line;
        lib.element.player.line = function (target, config) {
            var current = _status.event;
            var attackCard = current && current.card &&
                get.type(current.card, this) === "gongJi" ? current.card : null;
            var marker = config;
            if (attackCard) {
                if (!marker || typeof marker !== "object") marker = {};
                marker._wmbAttackColor = attackColor(attackCard);
                if (!current._wmbAttackLineId) {
                    combatLineSequence++;
                    current._wmbAttackLineId = "wmb-attack-" + combatLineSequence;
                }
                marker._wmbAttackLineId = current._wmbAttackLineId;
            }
            var result = original.call(this, target, marker);
            if (marker && typeof marker === "object" &&
                marker._wmbAttackColor && get.itemtype(target) === "player") {
                if (currentCombatLineId !== marker._wmbAttackLineId) {
                    clearCombatLines();
                    currentCombatLineId = marker._wmbAttackLineId;
                }
                addCombatLineFallback(this, target, marker._wmbAttackColor);
            }
            return result;
        };
    }

    function showHitFx(trigger) {
        var target = trigger.target;
        if (!target || !document.body) return;
        var rect = target.getBoundingClientRect();
        var fx = document.createElement("div");
        var prefix = combatFxPrefix();
        fx.className = prefix + "-hit-fx " + prefix + "-hit-" + attackColor(trigger.card);
        fx.style.left = (rect.left + rect.width / 2) + "px";
        fx.style.top = (rect.top + rect.height / 2) + "px";
        document.body.appendChild(fx);
        setTimeout(function () { fx.remove(); }, 850);
    }

    function installCombatFx() {
        if (!isCustomTheme() || lib.skill._wmbCombatFx) return;
        lib.skill._wmbCombatFx = {
            trigger: {
                global: ["gongJiMingZhong", "gongJiEnd"]
            },
            forced: true,
            silent: true,
            popup: false,
            priority: -999,
            showHitFx: showHitFx,
            clearCombatLines: clearCombatLines,
            content: function (event, trigger) {
                var name = event.triggername || trigger.name;
                if (name === "gongJiMingZhong") {
                    lib.skill._wmbCombatFx.showHitFx(trigger);
                } else if (name === "gongJiEnd") {
                    lib.skill._wmbCombatFx.clearCombatLines();
                }
            }
        };
        if (!lib.skill.global.includes("_wmbCombatFx")) {
            lib.skill.global.push("_wmbCombatFx");
        }
    }

    function installClickFx() {
        if (clickFxInstalled || !isWaterbearTheme()) return;
        clickFxInstalled = true;
        document.addEventListener("pointerdown", function (event) {
            if (!isWaterbearTheme()) return;
            var target = event.target.closest(
                ".control, .menubutton, .button, .dialog .textbutton.selectable, .card, .wmb-system-button, .connectbutton"
            );
            if (!target) return;
            var rect = target.getBoundingClientRect();
            var ripple = document.createElement("span");
            ripple.className = "wmb-wb-click-ripple";
            ripple.style.left = (event.clientX - rect.left) + "px";
            ripple.style.top = (event.clientY - rect.top) + "px";
            target.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 520);
        }, true);
    }

    function installTargetDoubleClickGuard() {
        if (targetDoubleClickGuardInstalled) return;
        targetDoubleClickGuardInstalled = true;

        function blockTargetDoubleClick(event) {
            if (!isCustomTheme() || !ui.arena ||
                !ui.arena.classList.contains("selecting")) return;
            if (event.type === "click" && event.detail < 2) return;
            if (!event.target || !event.target.closest) return;
            var avatar = event.target.closest("#arena .player .avatar, #arena .player .avatar2");
            if (!avatar || !ui.arena.contains(avatar)) return;
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        }

        // 核心通过头像的连续两次 click 打开属性；同时拦截 dblclick 作为兼容保护。
        document.addEventListener("click", blockTargetDoubleClick, true);
        document.addEventListener("dblclick", blockTargetDoubleClick, true);
    }

    function queueDecoration() {
        if (decorateTimer) return;
        decorateTimer = setTimeout(function () {
            decorateTimer = null;
            decorateArena();
        }, 0);
    }

    function isTransientWaterbearFx(node) {
        if (!node || node.nodeType !== 1 || !node.classList) return false;
        return node.classList.contains("wmb-wb-attack-line") ||
            node.classList.contains("wmb-wb-attack-fallback") ||
            node.classList.contains("wmb-wb-hit-fx") ||
            node.classList.contains("wmb-xj-attack-line") ||
            node.classList.contains("wmb-xj-attack-fallback") ||
            node.classList.contains("wmb-xj-hit-fx") ||
            node.classList.contains("wmb-skill-banner") ||
            node.classList.contains("wmb-wb-skill-banner") ||
            node.classList.contains("wmb-xj-skill-banner") ||
            node.classList.contains("wmb-wb-click-ripple");
    }

    function decorateCharacterStarRatings() {
        if (!isXianJianTheme()) return;
        document.querySelectorAll(
            '.button.character > .hp[data-condition="xing"], .character-intro-table > .hp[data-condition="xing"]'
        ).forEach(function (node) {
            if (node.dataset.wmbCharacterStarRating === "true") return;
            var textNode = node.querySelector(":scope > .text") || node.querySelector(".text");
            var valueText = textNode ? textNode.textContent : node.textContent;
            var match = String(valueText || "").match(/(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?/);
            if (!match) return;

            var value = Number(match[1]);
            var limit = match[2] ? Number(match[2]) : value;
            if (!isFinite(value) || !isFinite(limit) || limit <= 0) return;
            var slots = Math.ceil(limit);
            if (slots > 12) return;

            var fragment = document.createDocumentFragment();
            for (var i = 0; i < slots; i++) {
                var star = document.createElement("span");
                star.className = "wmb-character-star";
                if (value >= i + 1) {
                    star.classList.add("is-filled");
                } else if (value > i) {
                    star.classList.add("is-half");
                } else {
                    star.classList.add("is-empty");
                }
                fragment.appendChild(star);
            }

            node.innerHTML = "";
            node.dataset.wmbCharacterStarRating = "true";
            node.style.setProperty("--wmb-character-star-size", Math.min(15, 72 / slots) + "px");
            node.setAttribute("aria-label", "角色星级 " + match[1] + (match[2] ? "/" + match[2] : ""));
            node.appendChild(fragment);
        });
    }

    function observeUiChanges(records) {
        var needsDecoration = records.some(function (record) {
            if (record.type === "attributes" && record.target &&
                record.target.classList &&
                (record.target === ui.arena || record.target.classList.contains("player"))) {
                return true;
            }
            var changed = Array.prototype.slice.call(record.addedNodes || [])
                .concat(Array.prototype.slice.call(record.removedNodes || []));
            return changed.some(function (node) {
                return node.nodeType === 1 && !isTransientWaterbearFx(node);
            });
        });
        if (needsDecoration) queueDecoration();
    }

    function decorateArena() {
        if (!applyRootClasses()) return;
        installViewportLayout();
        applyCardDefinitions();
        decorateGlobalUi();
        decorateScoreboard();
        ensureMusicPanel();
        decorateCharacterStarRatings();
        decorateCards();
        decorateLightMarks();
        decorateTeamIdentities();
        decorateTargetSelection();
        decorateTurnIndicators();
        decorateFactionFrames();
        installClickFx();
        installTargetDoubleClickGuard();

        if (!observer && document.documentElement) {
            observer = new MutationObserver(observeUiChanges);
            // 联机大厅和对局会重建大块界面，监听根节点才能跨场景持续生效。
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["class"]
            });
        }
    }

    function startDecoration() {
        if (!isCustomTheme()) return;
        if (document.body) {
            decorateArena();
        } else {
            document.addEventListener("DOMContentLoaded", decorateArena, { once: true });
        }
    }

    function loadStyle() {
        if (!isCustomTheme()) return;
        if (document.querySelector('link[data-wmb-ui-style="base"]')) return;
        var styleRoot = lib.assetURL + "extension/" + extensionName + "/";
        var styles = [["extension.css?rev=2.22", "base"]];
        if (currentTheme() === "starry") styles.push(["starry.css?rev=2.59", "theme"]);
        styles.forEach(function (item) {
            var style = document.createElement("link");
            style.rel = "stylesheet";
            style.href = styleRoot + item[0];
            style.setAttribute("data-wmb-ui-style", item[1]);
            document.head.appendChild(style);
        });
    }

    return {
        name: extensionName,
        version: "2.59",
        editable: false,
        precontent: function () {
            configureDefaultStarryBackground();
            migrateExtensionIdentityConfigs();
            installExtensionIdentityCompatibility();
            installExtensionListSortHook();
            installPlayerSlotIndicators();
            loadStyle();
            applyCardDefinitions();
            installSkillFx();
            installCombatLineHook();
            installCombatFx();
            installManagedMusic();
            // 联机大厅先于 arenaReady 创建，必须从预加载阶段启用全局皮肤。
            startDecoration();
        },
        arenaReady: function () {
            applyCardDefinitions();
            installPlayerSlotIndicators();
            refreshPlayerSlotIndicators();
            decorateArena();
        },
        content: function () {
            applyExtensionListSort();
            installPlayerSlotIndicators();
            refreshPlayerSlotIndicators();
            installExtensionListSortHook();
            applyCardDefinitions();
            installManagedMusic();
            if (document.body) decorateArena();
        },
        config: {
            uiTheme: {
                name: "界面风格",
                init: "starry",
                item: {
                    starry: "星空风",
                    xianjian: "仙剑版"
                },
                intro: "默认使用蓝紫色星空风；可切换为原有青绿色仙剑配色。切换后重新启动游戏。"
            },
            compactLayout: {
                name: "紧凑角色与操作面板",
                init: false,
                intro: "适合较小分辨率；缩小面板间距，但不缩小卡牌与关键数值。"
            },
            glass: {
                name: "磨砂面板强度",
                init: "standard",
                item: {
                    standard: "标准",
                    strong: "浓郁"
                }
            },
            motion: {
                name: "启用轻量动效",
                init: true,
                intro: "为可操作按钮、当前角色与战况面板启用轻微呼吸和悬停反馈。"
            },
            cardArt: {
                name: "启用仙侠风卡面与状态图",
                init: true,
                intro: "替换无名杯六系攻击牌、基础效果牌、魔弹、魔刃与异刃的卡面；关闭后保留原卡面。"
            },
            extensionAutoSort: {
                name: "扩展列表自动排序",
                init: true,
                intro: "按约定顺序排列无名杯UI优化包、十周年语音包、十周年AI优化版、十周年噩梦人机、百年战争·序章、宿命挽歌、轮回遗梦、永夜残响、峡谷幻音、电啸龙吟、创世纪；其他扩展按名称排序。两个十周年角色扩展使用去掉连字符的新内部 ID，原文件夹名保留以兼容现有安装。须启用本扩展并重启游戏。"
            }
        },
        help: {
            "无名杯UI优化包": "独立优化无名杯对局界面，提供蓝紫色星空风与青绿色仙剑版配色；覆盖战况面板、角色框、手牌、行动按钮、技能栏、选择弹窗与日志显示，不修改游戏规则或核心文件。"
        },
        package: {
            intro: "优化无名杯对局UI：重绘战况面板视觉，统一角色框、行动按钮、技能栏、卡牌、弹窗与日志；提供星空风与仙剑配色切换。",
            author: "蒙牛 / Codex",
            diskURL: "",
            forumURL: "",
            version: "2.59"
        },
        files: {
            character: [],
            card: ["image/mark/moDan_xianxia.png", "image/mark/shengDun_xianxia.png", "image/mark/xuRuo_xianxia.png", "image/mark/zhongDu_xianxia.png"],
            skill: []
        },
        background: {
            ["ext:" + extensionName + "/image/background/xingbei_starry.jpg"]: "星空·蓝紫"
        }
    };
});
