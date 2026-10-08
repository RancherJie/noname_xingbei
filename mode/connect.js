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

				let imageAssetsReady = false;
				var connect = function (e) {
					if (!imageAssetsReady) {
						if (e) e.preventDefault();
						return;
					}
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
				button.style.opacity = "0.4";
				button.style.pointerEvents = "none";
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
				// Block the manual Connect action until the complete image inventory is verified.
				// This UI is deliberately independent from the multiplayer server.
				const overlay = document.createElement("div");
				// Isolate all dialog elements from legacy game CSS (which positions divs globally).
				const overlayShadow = overlay.attachShadow({ mode: "open" });
				overlay.style.cssText = "position:fixed;inset:0;z-index:2147483646;background:rgba(9,15,25,.91);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;font-family:Arial,sans-serif;color:#f8fafc;";
				overlay.setAttribute("role", "dialog");
				overlay.setAttribute("aria-label", "星杯傳說圖片資源準備");
				const panel = document.createElement("div");
				panel.style.cssText = "display:block;position:relative;width:min(480px,100%);background:#172334;border:1px solid #496077;border-radius:14px;padding:24px;box-sizing:border-box;box-shadow:0 18px 48px #0008;text-align:left;font-size:16px;line-height:1.5;";
				const heading = document.createElement("div");
				heading.textContent = "星杯傳說｜遊戲圖片準備";
				heading.style.cssText = "font-weight:700;font-size:20px;margin-bottom:12px;";
				const description = document.createElement("div");
				description.textContent = "首次使用需準備全部內建圖片，約 75 MiB。此後會先驗證已儲存的圖片，不重複下載正確檔案。";
				description.style.cssText = "font-size:14px;line-height:1.6;color:#cbd5e1;margin-bottom:16px;";
				const progress = document.createElement("progress");
				progress.max = 100;
				progress.value = 0;
				progress.style.cssText = "width:100%;height:18px;display:block;accent-color:#42a5f5;";
				const status = document.createElement("div");
				status.setAttribute("role", "status");
				status.setAttribute("aria-live", "polite");
				status.style.cssText = "font-size:14px;margin:12px 0;line-height:1.5;";
				status.textContent = "正在檢查圖片清單…";
				const details = document.createElement("div");
				details.style.cssText = "font-size:12px;color:#fca5a5;white-space:pre-wrap;overflow-wrap:anywhere;max-height:90px;overflow:auto;";
				const retry = document.createElement("button");
				retry.type = "button";
				retry.textContent = "重試失敗圖片";
				retry.style.cssText = "display:none;margin-top:12px;padding:10px 16px;border:0;border-radius:8px;background:#3b82f6;color:white;cursor:pointer;font:inherit;font-size:14px;";
				panel.append(heading, description, progress, status, details, retry);
				overlayShadow.appendChild(panel);
				document.body.appendChild(overlay);

				let preparing = false;
				async function startImagePreparation() {
					if (preparing || imageAssetsReady) return;
					preparing = true;
					retry.style.display = "none";
					details.textContent = "";
					status.textContent = "正在檢查圖片清單…";
					try {
						// The connect mode runs in a synthetic GameEvent module context, so relative imports resolve incorrectly.
						const { prepareImageAssets, ensureImageCacheWorker } = await import("/game/preload-images.mjs");
						const summary = await prepareImageAssets(snapshot => {
							if (!overlay.isConnected) return;
							progress.value = Math.floor((snapshot.ready / snapshot.total) * 100);
							status.textContent = "已驗證 " + snapshot.ready + "／" + snapshot.total +
								" 張（" + progress.value + "%）｜快取 " + snapshot.cached +
								"｜新下載 " + snapshot.downloaded +
								(snapshot.failed ? "｜失敗 " + snapshot.failed : "");
						});
						status.textContent = "所有圖片已驗證，正在啟用遊戲圖片快取…";
						await ensureImageCacheWorker(summary.version);
						imageAssetsReady = true;
						button.style.opacity = "";
						button.style.pointerEvents = "";
						text.textContent = "圖片準備完成，請按「連接」";
						console.info("[Xingbei image preload]", summary);
						overlay.remove();
					} catch (error) {
						status.textContent = error instanceof Error ? error.message : "圖片準備失敗";
						const failed = Array.isArray(error?.failures) ? error.failures : [];
						if (failed.length) details.textContent = failed.slice(0, 4).map(x => x.path + "：" + x.message).join("\n");
						retry.style.display = "inline-block";
					} finally {
						preparing = false;
					}
				}
				retry.addEventListener("click", startImagePreparation);
				void startImagePreparation();
				// Clipboard invitations remain disabled to prevent automatic connections.
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
