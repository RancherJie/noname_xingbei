import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
	return {
		name: "connect",
		start() {
			var directstartmode = lib.config.directstartmode;
			ui.create.menu(true);
			event.textnode = ui.create.div("", "输入联机地址");
			var createNode = function () {
				if (event.created) return;
				if (directstartmode && lib.node) {
					ui.exitroom = ui.create.system(
						"退出房间",
						function () {
							game.saveConfig("directstartmode");
							game.reload();
						},
						true
					);
					game.switchMode(directstartmode);
					return;
				}
				if (lib.node && window.require) {
					ui.startServer = ui.create.system(
						"启动服务器",
						function (e) {
							ui.click.shortcut(false);
							e.stopPropagation();
							ui.click.connectMenu();
						},
						true
					);
				}

				event.created = true;
				var node = ui.create.div(".shadowed");
				node.style.width = "400px";
				node.style.height = "30px";
				node.style.lineHeight = "30px";
				node.style.fontFamily = "xinwei";
				node.style.fontSize = "30px";
				node.style.padding = "10px";
				node.style.left = "calc(50% - 210px)";
				node.style.top = "calc(50% - 20px)";
				node.style.whiteSpace = "nowrap";
				// The dedicated web entry always uses the private lobby.
				const autoLobbyAddress = "wss://myxingbei.com:443";
				node.textContent = autoLobbyAddress;
				node.contentEditable = true;
				node.style.webkitUserSelect = "text";
				node.style.textAlign = "center";
				node.style.overflow = "hidden";

				var connect = function (e) {
					event.textnode.textContent = "正在连接...";
					clearTimeout(event.timeout);
					if (e) e.preventDefault();
					const ip = node.textContent;
					game.saveConfig("last_ip", ip);
					game.connect(ip, function (success) {
						if (success) {
							game.requireSandboxOn(ip);
							var info = lib.config.reconnect_info;
							if (info && info[0] == _status.ip) {
								game.onlineID = info[1];
								if (typeof (game.roomId = info[2]) == "string") game.roomIdServer = true;
							}
							return;
						}
						if (event.textnode) {
							alert("连接失败");
							event.textnode.textContent = "输入联机地址";
						}
					});
				};
				node.addEventListener("keydown", function (e) {
					if (e.keyCode == 13) {
						connect(e);
					}
				});
				ui.window.appendChild(node);
				ui.ipnode = node;

				var text = event.textnode;
				text.style.width = "400px";
				text.style.height = "30px";
				text.style.lineHeight = "30px";
				text.style.fontFamily = "xinwei";
				text.style.fontSize = "30px";
				text.style.padding = "10px";
				text.style.left = "calc(50% - 200px)";
				text.style.top = "calc(50% - 80px)";
				text.style.textAlign = "center";
				ui.window.appendChild(text);
				ui.iptext = text;

				var button = ui.create.div(".menubutton.highlight.large.pointerdiv", "连接", connect);
				button.style.width = "70px";
				button.style.left = "calc(50% - 35px)";
				button.style.top = "calc(50% + 60px)";
				ui.window.appendChild(button);
				ui.ipbutton = button;

				ui.hall_button = ui.create.system(
					"联机大厅",
					function () {
						node.textContent = get.config("hall_ip") || lib.hallURL;
						connect();
					},
					true
				);
				if (!get.config("hall_button")) {
					ui.hall_button.style.display = "none";
				}
				ui.recentIP = ui.create.system("最近连接", null, true);
				var clickLink = function () {
					node.textContent = this.textContent;
					connect();
				};
				lib.setPopped(
					ui.recentIP,
					function () {
						if (!lib.config.recentIP.length) return;
						var uiintro = ui.create.dialog("hidden");
						uiintro.listen(function (e) {
							e.stopPropagation();
						});
						var list = ui.create.div(".caption");
						for (var i = 0; i < lib.config.recentIP.length; i++) {
							ui.create.div(".text.textlink", list, clickLink).textContent = get.trimip(lib.config.recentIP[i]);
						}
						uiintro.add(list);
						var clear = uiintro.add('<div class="text center">清除</div>');
						clear.style.paddingTop = 0;
						clear.style.paddingBottom = "3px";
						clear.listen(function () {
							lib.config.recentIP.length = 0;
							game.saveConfig("recentIP", []);
							uiintro.delete();
						});
						return uiintro;
					},
					220
				);
				// Keep the private lobby address visible and wait for the player to click Connect.
				// Clipboard invitation handling is disabled to prevent automatic connection.
				lib.init.onfree();
			};
			if (window.isNonameServer) {
				game.connect(window.isNonameServerIp || "localhost");
			} else {
				createNode();
			}
			if (!game.onlineKey) {
				game.onlineKey = localStorage.getItem(lib.configprefix + "key");
				if (!game.onlineKey) {
					game.onlineKey = get.id();
					localStorage.setItem(lib.configprefix + "key", game.onlineKey);
				}
			}
			_status.connectDenied = createNode;
			setTimeout(lib.init.onfree, 1000);
		},
	};
};
