/**
 * @typedef { InstanceType<typeof lib.element.Player> } Player
 * @typedef { InstanceType<typeof lib.element.Card> } Card
 * @typedef { InstanceType<typeof lib.element.VCard> } VCard
 * @typedef { InstanceType<typeof lib.element.Button> } Button
 * @typedef { InstanceType<typeof lib.element.Dialog> } Dialog
 * @typedef { InstanceType<typeof lib.element.GameEvent> } GameEvent
 * @typedef { GameEvent & InstanceType<typeof lib.element.GameEventPromise> } GameEventPromise
 * @typedef { InstanceType<typeof lib.element.NodeWS> } NodeWS
 * @typedef { InstanceType<typeof lib.element.Control> } Control
 */
import { nonameInitialized, assetURL, userAgentLowerCase, GeneratorFunction, AsyncFunction, characterDefaultPicturePath } from "../util/index.js";
import { ai } from "../ai/index.js";
import { get } from "../get/index.js";
import { game } from "../game/index.js";
import { _status } from "../status/index.js";
import { ui } from "../ui/index.js";
import { gnc } from "../gnc/index.js";
import { LibInit } from "./init/index.js";
import { Announce } from "./announce/index.js";
import { Channel } from "./channel/index.js";
import { Experimental } from "./experimental/index.js";
import * as Element from "./element/index.js";
import { updateURLs } from "./update-urls.js";
import { defaultHooks } from "./hooks/index.js";
import { freezeButExtensible } from "../util/index.js";
import security from "../util/security.js";
import { ErrorManager } from "../util/error.js";

import { defaultSplashs } from "../init/onload/index.js";

export class Library {
	configprefix = "noname_0.9_";
	versionOL = 27;
	updateURLS = updateURLs;
	updateURL = updateURLs.github;
	mirrorURL = updateURLs.coding;
	hallURL = "agserver.ssyy.tech:50000";
	assetURL = assetURL;
	userAgent = userAgentLowerCase;
	characterDefaultPicturePath = characterDefaultPicturePath;
	compatibleEdition = Boolean(typeof nonameInitialized == "string" && nonameInitialized.match(/\/(?:com\.widget|yuri\.nakamura)\.noname\//));
	changeLog = [];
	updates = [];
	canvasUpdates = [];
	/**
	 * @type { Video[] }
	 */
	video = [];
	skilllist = [];
	connectBanned = [];
	characterIntro = {};
	characterTitle = {};
	characterPack = new Proxy(
		{},
		{
			get(target, prop, receiver) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.get(target, prop, receiver);
			},
			set(target, prop, newValue) {
				if (typeof prop == "string") {
					// 新增武将包，且不是“收藏”和“禁用”
					if (!["mode_favourite", "mode_banned"].includes(prop) && !Reflect.has(target, prop)) {
						Promise.resolve().then(() => {
							ui.updateCharacterPackMenu.forEach(fun => fun(prop));
						});
					}

					if (prop.startsWith("mode_extension_")) {
						prop = prop.slice("mode_extension_".length);
					}
				}
				const newPack = new Proxy(
					{},
					{
						set(target, prop, newValue) {
							return Reflect.set(target, prop, get.convertedCharacter(newValue));
						},
					}
				);
				Object.assign(newPack, newValue);
				return Reflect.set(target, prop, newPack);
			},
			defineProperty(target, prop, descriptor) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.defineProperty(target, prop, descriptor);
			},
		}
	);
	characterFilter = {};
	characterSort = new Proxy(
		{},
		{
			get(target, prop, receiver) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.get(target, prop, receiver);
			},
			set(target, prop, value, receiver) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.set(target, prop, value, receiver);
			},
			defineProperty(target, prop, descriptor) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.defineProperty(target, prop, descriptor);
			},
		}
	);
	characterReplace = {};
	characterSubstitute = {};
	characterInitFilter = {};
	characterGuozhanFilter = ["mode_guozhan"];
	dynamicTranslate = {};
	cardPack = new Proxy(
		{},
		{
			get(target, prop, receiver) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.get(target, prop, receiver);
			},
			set(target, prop, newValue) {
				if (typeof prop == "string") {
					if (!Reflect.has(target, prop)) {
						Promise.resolve().then(() => {
							ui.updateCardPackMenu.forEach(fun => fun(prop));
						});
					}
				}
				if (prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.set(target, prop, newValue);
			},
			defineProperty(target, prop, descriptor) {
				if (typeof prop == "string" && prop.startsWith("mode_extension_")) {
					prop = prop.slice("mode_extension_".length);
				}
				return Reflect.defineProperty(target, prop, descriptor);
			},
		}
	);
	cardPackInfo = {};
	/**
	 * @type { SMap<number> }
	 */
	skin = {};
	onresize = [];
	onphase = [];
	onwash = [];
	onround = [
		function roundSkillCheck(event) {
			return !event.skill;
		},
	];
	onover = [];
	ondb = [];
	ondb2 = [];
	chatHistory = [];
	emotionList = {
		xingBei_emotion: 27,
		xiaowu_emotion: 14,
		biexiao_emotion: 18,
		chaijun_emotion: 43,
		maoshu_emotion: 18,
	};
	animate = {
		skill: {},
		card: {},
	};
	onload = [];
	onload2 = [];
	onprepare = [];
	/**
	 * @type { Function[] | undefined }
	 */
	arenaReady = [];
	onfree = [];
	inpile = [];
	inpile_nature = [];
	extensions = [];
	extensionPack = {};

	/**
	 * @type { IOnloadSplash[] }
	 */
	onloadSplashes = [...defaultSplashs];

	cardType = {};
	hook = { globalskill: {} };
	/**
	 *  @type { Player | undefined }
	 */
	tempSortSeat;
	/**
	 * @type { 'android' | 'ios' | undefined }
	 */
	device;
	/**
	 * @type { string }
	 */
	version;
	/**
	 * @type { Videos[] }
	 */
	videos;
	/**
	 * @type { {
	 * 	fs: typeof import("fs"),
	 *  path: typeof import("path"),
	 *  debug: () => void,
	 *  clients: Element.Client[],
	 *  banned:[],
	 *  observing:[],
	 *  torespond:{},
	 *  torespondtimeout:{},
	 * } }
	 */
	node;
	// 谁写的值类型是string，这也太离谱了喵
	/**
	 * @type { { [key: string]: Player } }
	 */
	playerOL;
	/**
	 * @type { IDBRequest<IDBDatabase> }
	 */
	db;
	//函数钩子
	/**
	 * 你可以往这里加入{钩子名:函数数组}，并在数组里增加你的自定义函数
	 *
	 * 这样当某个地方调用game.callHook(钩子名,[...函数参数])时，就会按顺序将对应数组中的每个函数运行一遍（传参为callHook的第二个参数）。
	 *
	 * 你可以将hook机制类比为event.trigger()，但是这里只能放同步代码
	 */
	hooks = freezeButExtensible({ ...defaultHooks });

	/**
	 * **无名杀频道推送机制**
	 *
	 * 鉴于`Javascript`的特性及自身对所需功能的思考，这是一个参考`Golang`的`channel`设计的、完全和`go channel`不一样的异步消息传递对象
	 *
	 * 当且仅当接收方和发送方均存在时进行消息传递，完全保证信息传递的单一性（发送方/接收方一旦确定则无法更改）和准确性（发送方必然将消息发送给接收方）
	 *
	 * 若存在发送方/接收方时调用`send`/`receive`，将报错
	 *
	 * 若需要异步/不报错发送信息，请等待`lib.actor`
	 *
	 * @example
	 * // 创建一个频道
	 * const channel = new lib.channel();
	 *
	 * // 从某个角落接收channel发出的消息，若无消息则等待
	 * const message = await channel.receive();
	 *
	 * // 从某个角落向channel发消息，若无消息接收则等待
	 * await channel.send(item);
	 */
	channel = Channel;

	/**
	 * **无名杀消息推送库**
	 *
	 * 通过`EventTarget`机制，实现消息推送和接收的解耦，
	 * 从而使消息接收方无需依赖发布方，发布方也无需考虑接收方
	 *
	 * > `lib.announce`不是`actor`模型，若不存在订阅者，则消息发送将无意义
	 *
	 * @example
	 * // 甲扩展（如《千幻聆音》）在角色皮肤切换后，调用：
	 * lib.announce.publish("skinChange", {
	 * 	player,
	 * 	playerName: "zhangfei",
	 * 	originSkin: "image/xxx.jpg",
	 * 	currentSkin: "image/yyy.jpg"
	 * });
	 *
	 * // 乙扩展监听此`skinChange`事件，并修改自己扩展相关界面的图片：
	 * const method = lib.announce.subscribe("skinChange", (e) => {
	 * 	div.setBackgroundImage(e.currentSkin);
	 * });
	 *
	 * // 若此时乙扩展不想继续订阅`skinChange`事件，可以通过`unsubscribe`解除订阅
	 * lib.announce.unsubscribe("skinChange", method);
	 */
	announce = new Announce(new EventTarget(), new WeakMap());

	objectURL = new Map();
	hookmap = {};
	/**
	 * @type { { character?: SMap<importCharacterConfig>, card?: SMap<importCardConfig>, mode?: SMap<importModeConfig>, player?: SMap<importPlayerConfig>, extension?: SMap<importExtensionConfig>, play?: SMap<importPlayConfig> } }
	 */
	imported = {};
	layoutfixed = ["chess", "tafang", "stone"];
	pinyins = {
		_metadata: {
			shengmu: ["zh", "ch", "sh", "b", "p", "m", "f", "d", "t", "l", "n", "g", "k", "h", "j", "q", "x", "r", "z", "c", "s", "y", "w"],
			special_shengmu: ["j", "q", "x", "y"],
			feijiemu: {
				i: ["ing", "iu", "ie", "in"],
				u: ["ui", "un"],
				ü: ["üe", "ün"],
			},
			zhengtirendu: ["zhi", "chi", "shi", "ri", "zi", "ci", "si"],
			yunjiao: {
				一麻: ["a", "ia", "ua"],
				二波: ["o", "e", "uo"],
				三皆: ["ie", "üe"],
				四开: ["ai", "uai"],
				五微: ["ei", "ui"],
				六豪: ["ao", "iao"],
				七尤: ["ou", "iu"],
				八寒: ["an", "ian", "uan", "üan"],
				九文: ["en", "in", "un", "ün"],
				十唐: ["ang", "iang", "uang"],
				十一庚: ["eng", "ing", "ong", "ung"],
				十二齐: ["i", "er", "ü"],
				十三支: ["-i"],
				十四姑: ["u"],
			},
		},
	};
	/**
	 * Yingbian
	 *
	 * 应变
	 */
	yingbian = {
		condition: {
			color: new Map([
				["zhuzhan", "wood"],
				["kongchao", "soil"],
				["fujia", "orange"],
				["canqu", "fire"],
				["force", "metal"],
			]),
			complex: new Map([
				[
					"zhuzhan",
					function (event) {
						const yingbianZhuzhan = game.createEvent("yingbianZhuzhan");
						yingbianZhuzhan.player = event.player;
						yingbianZhuzhan.card = event.card;
						yingbianZhuzhan._trigger = event;
						yingbianZhuzhan.yingbianZhuzhanAI = event.yingbianZhuzhanAI;
						yingbianZhuzhan.afterYingbianZhuzhan = event.afterYingbianZhuzhan;
						yingbianZhuzhan.setContent(() => {
							"step 0";
							event._global_waiting = true;
							event.send = (player, card, source, targets, id, id2, yingbianZhuzhanAI, skillState) => {
								if (skillState) player.applySkills(skillState);
								var type = get.type2(card),
									str = get.translation(source);
								if (targets && targets.length) str += `对${get.translation(targets)}`;
								str += `使用了${get.translation(card)}，是否弃置一张${get.translation(type)}为其助战？`;
								player.chooseCard({
									filterCard: (card, player) => get.type2(card) == type && lib.filter.cardDiscardable(card, player),
									prompt: str,
									position: "h",
									_global_waiting: true,
									id: id,
									id2: id2,
									ai:
										typeof yingbianZhuzhanAI == "function"
											? yingbianZhuzhanAI(player, card, source, targets)
											: cardx => {
													var info = get.info(card);
													if (info && info.ai && info.ai.yingbian) {
														var ai = info.ai.yingbian(card, source, targets, player);
														if (!ai) return 0;
														return ai - get.value(cardx);
													} else if (get.attitude(player, source) <= 0) return 0;
													return 5 - get.value(cardx);
												},
								});
								if (!game.online) return;
								_status.event._resultid = id;
								game.resume();
							};
							"step 1";
							var type = get.type2(card);
							event.list = game.filterPlayer(current => current != player && current.countCards("h") && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, "h"))).sortBySeat(_status.currentPhase || player);
							event.id = get.id();
							"step 2";
							if (!event.list.length) event.finish();
							else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) event.goto(4);
							else event.send((event.current = event.list.shift()), event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
							"step 3";
							if (result.bool) {
								event.zhuzhanresult = event.current;
								event.zhuzhanresult2 = result;
								if (event.current != game.me) game.delayx();
								event.goto(8);
							} else event.goto(2);
							"step 4";
							var id = event.id,
								sendback = (result, player) => {
									if (result && result.id == id && !event.zhuzhanresult && result.bool) {
										event.zhuzhanresult = player;
										event.zhuzhanresult2 = result;
										game.broadcast("cancel", id);
										if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused)
											return () => {
												event.resultOL = _status.event.resultOL;
												ui.click.cancel();
												if (ui.confirm) ui.confirm.close();
											};
									} else if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused) return () => (event.resultOL = _status.event.resultOL);
								},
								withme = false,
								withol = false,
								list = event.list;
							for (var i = 0; i < list.length; i++) {
								var current = list[i];
								if (current.isOnline()) {
									withol = true;
									current.wait(sendback);
									current.send(event.send, current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI, get.skillState(current));
									list.splice(i--, 1);
								} else if (current == game.me) {
									withme = true;
									event.send(current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
									list.splice(i--, 1);
								}
							}
							if (!withme) event.goto(6);
							if (_status.connectMode && (withme || withol))
								game.players.forEach(value => {
									if (value != player) value.showTimer();
								});
							event.withol = withol;
							"step 5";
							if (!result || !result.bool || event.zhuzhanresult) return;
							game.broadcast("cancel", event.id);
							event.zhuzhanresult = game.me;
							event.zhuzhanresult2 = result;
							"step 6";
							if (event.withol && !event.resultOL) game.pause();
							"step 7";
							game.players.forEach(value => value.hideTimer());
							"step 8";
							if (event.zhuzhanresult) {
								var target = event.zhuzhanresult;
								target.line(player, "green");
								target.discard(event.zhuzhanresult2.cards).discarder = target;
								if (typeof event.afterYingbianZhuzhan == "function") event.afterYingbianZhuzhan(event, trigger);
								var yingbianCondition = event.name.slice(8).toLowerCase(),
									yingbianConditionTag = `yingbian_${yingbianCondition}_tag`;
								target.popup(yingbianConditionTag, lib.yingbian.condition.color.get(yingbianCondition));
								game.log(target, "响应了", player, "发起的", yingbianConditionTag);
								target.addExpose(0.2);
								event.result = {
									bool: true,
								};
							} else
								event.result = {
									bool: false,
								};
						});
						yingbianZhuzhan._args = Array.from(arguments);
						return yingbianZhuzhan;
					},
				],
			]),
			simple: new Map([
				["kongchao", event => !event.player.countCards("h")],
				["fujia", event => event.player.isMaxHandcard()],
				["canqu", event => event.player.getHp() == 1],
			]),
		},
		effect: new Map([
			[
				"add",
				() => {
					trigger.yingbian_addTarget = true;
				},
			],
			[
				"remove",
				() => {
					trigger.yingbian_removeTarget = true;
				},
			],
			[
				"damage",
				() => {
					if (typeof trigger.baseDamage != "number") trigger.baseDamage = 1;
					trigger.baseDamage++;
					game.log(card, "的伤害值基数+1");
				},
			],
			[
				"draw",
				() => {
					player.draw();
				},
			],
			[
				"gain",
				() => {
					const cardx = trigger.respondTo;
					if (cardx && cardx[1] && cardx[1].cards && cardx[1].cards.filterInD("od").length) player.gain(cardx[1].cards.filterInD("od"), "gain2");
				},
			],
			[
				"hit",
				() => {
					trigger.directHit.addArray(game.players).addArray(game.dead);
					game.log(card, "不可被响应");
				},
			],
			[
				"all",
				() => {
					card.yingbian_all = true;
					game.log(card, "执行所有选项");
				},
			],
		]),
		prompt: new Map([
			["add", "目标+1"],
			["remove", "目标-1"],
			["damage", "伤害+1"],
			["draw", "摸一张牌"],
			["gain", "获得响应的牌"],
			["hit", "此牌不可被响应"],
			["all", "无视条件执行所有选项"],
		]),
	};
	/**
	 * Stratagem buff
	 *
	 * 谋攻强化
	 */
	stratagemBuff = {
		cost: new Map([
			["sha", 1],
			["shan", 1],
			["juedou", 2],
			["huogong", 2],
			["tao", 3],
		]),
		effect: new Map([
			[
				"sha",
				(event, option) => {
					if (event.step != 0 || option.state != "end") return;
					game.log(event.player, "触发了强化效果");
					game.log(
						event.card,
						"抵消所需要的",
						new lib.element.VCard({
							name: "shan",
						}),
						"数+1"
					);
					const map = event.customArgs;
					game.players.concat(game.dead).forEach(current => {
						const id = current.playerid;
						if (!map[id]) map[id] = {};
						if (typeof map[id].shanRequired == "number") map[id].shanRequired++;
						else map[id].shanRequired = 2;
					});
				},
			],
			[
				"shan",
				(event, option) => {
					if (event.step != 0 || option.state != "end") return;
					game.log(event.player, "触发了强化效果");
					game.log(
						"使用",
						event.card,
						"时视为两张",
						new lib.element.VCard({
							name: "shan",
						}),
						"的效果"
					);
					event.player
						.when("useCard")
						.filter(evt => evt == event)
						.then(() => {
							trigger.getParent(2).decrease("shanRequired", 1);
						});
				},
			],
			[
				"juedou",
				(event, option) => {
					if (event.step != 0 || option.state != "end") return;
					game.log(event.player, "触发了强化效果");
					game.log("对", event.card, "的目标造成伤害时，伤害+1");
					event.player
						.when({
							source: "damageBegin1",
						})
						.filter(evt => evt.getParent(2) == event && event.targets.includes(evt.player))
						.then(() => {
							trigger.increase("num");
						});
				},
			],
			[
				"huogong",
				(event, option) => {
					if (event.step != 0 || option.state != "end") return;
					game.log(event.player, "触发了强化效果");
					game.log(event.card, "造成的伤害+1");
					event.increase("baseDamage", 1);
				},
			],
			[
				"tao",
				(event, option) => {
					if (event.step != 0 || option.state != "end") return;
					game.log(event.player, "触发了强化效果");
					game.log(event.card, "回复的体力+1");
					event.increase("baseDamage", 1);
				},
			],
		]),
		prompt: new Map([
			[
				"sha",
				/**
				 * @type {() => string}
				 */
				() => `抵消所需要的【${get.translation("shan")}】数+1。`,
			],
			[
				"shan",
				/**
				 * @type {() => string}
				 */
				() => `使用时视为两张【${get.translation("shan")}】的效果。`,
			],
			["juedou", () => "对此牌的目标造成伤害时，伤害+1。"],
			["huogong", () => "造成的伤害+1。"],
			["tao", () => "回复的体力+1。"],
		]),
	};
	/**
	 * The actual card name
	 *
	 * 实际的卡牌名称
	 */
	actualCardName = new Map([
		["挟令", "挟天子以令诸侯"],
		["霹雳投石车", "霹雳车"],
	]);
	characterDialogGroup = {
		收藏: function (name, capt) {
			return lib.config.favouriteCharacter.includes(name) ? capt : null;
		},
		最近: function (name, capt) {
			var list = get.config("recentCharacter") || [];
			return list.includes(name) ? capt : null;
		},
	};
	listenEnd(node) {
		if (!node._listeningEnd) {
			node._listeningEnd = true;
			node.listenTransition(function () {
				delete node._listeningEnd;
				if (node._onEndMoveDelete) {
					node.moveDelete(node._onEndMoveDelete);
				} else if (node._onEndDelete) {
					node.delete();
				}
				node._transitionEnded = true;
			});
		}
	}
	configMenu = {
		general: {
			name: "通用",
			config: {
				/*
				mount_combine: {
					name: "合并坐骑栏",
					init: false,
					intro: "<li>将进攻坐骑栏和防御坐骑栏合并为同一个位置（重启后生效）。",
					restart: true,
				},*/
				low_performance: {
					name: "流畅模式",
					init: false,
					intro: "减少部分游戏特效，提高游戏速度",
					onclick(bool) {
						game.saveConfig("low_performance", bool);
						if (bool) {
							ui.window.classList.add("low_performance");
						} else {
							ui.window.classList.remove("low_performance");
						}
					},
				},
				compatiblemode: {
					name: "兼容模式",
					init: false,
					intro: "开启兼容模式可防止扩展使游戏卡死并提高对旧扩展的兼容性，但对游戏速度有一定影响，若无不稳定或不兼容的扩展建议关闭",
					onclick(bool) {
						game.saveConfig("compatiblemode", bool);
						if (bool) {
							ui.window.classList.add("compatiblemode");
						} else {
							ui.window.classList.remove("compatiblemode");
						}
					},
				},
				confirm_exit: {
					name: "确认退出",
					init: false,
					unfrequent: true,
					intro: "离开游戏前弹出确认对话框",
				},
				keep_awake: {
					name: "屏幕常亮",
					init: false,
					unfrequent: true,
					intro: "防止屏幕自动关闭<br>注：旧版本通过NoSleep.js实现的屏幕常亮可能会影响外置音频的音量",
					onclick(bool) {
						game.saveConfig("keep_awake", bool);
						if (bool) {
							if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake();
							else if (window.noSleep) {
								document.addEventListener(
									lib.config.touchscreen ? "touchend" : "click",
									function enableNoSleepX() {
										document.removeEventListener(lib.config.touchscreen ? "touchend" : "click", enableNoSleepX, false);
										window.noSleep.enable();
									},
									false
								);
							}
						} else {
							if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain();
							else if (window.noSleep) window.noSleep.disable();
						}
					},
				},
				auto_confirm: {
					name: "自动确认",
					init: true,
					unfrequent: true,
					intro: "当候选目标只有1个时，点击目标后无需再点击确认",
				},
				/*
				skip_shan: {
					name: "无闪自动取消",
					init: false,
					unfrequent: true,
					intro: "当自己需要使用或打出【闪】时，若自己没有【闪】，则跳过该步骤",
				},
				unauto_choose: {
					name: "拆顺手牌选择",
					init: false,
					unfrequent: true,
					intro: "拆牌或者顺牌时，就算只能选择对方的手牌依然手动选择",
				},
				wuxie_self: {
					name: "不无懈自己",
					init: true,
					unfrequent: true,
					intro: "自己使用的单目标普通锦囊即将生效时，不询问无懈",
				},
				tao_enemy: {
					name: "不对敌方出桃",
					init: false,
					intro: "双方阵营明确的模式中（如对决），敌方角色濒死时不询问出桃",
					unfrequent: true,
				},*/
				enable_drag: {
					name: "启用拖拽",
					init: true,
					intro: "按住卡牌后可将卡牌拖至目标",
					unfrequent: true,
				},
				enable_dragline: {
					name: "拖拽指示线",
					init: true,
					unfrequent: true,
					intro: "拖拽时显示虚线，可能降低游戏速度",
				},
				enable_touchdragline: {
					name: "拖拽指示线",
					init: false,
					unfrequent: true,
					intro: "拖拽时显示虚线，可能降低游戏速度",
				},
				// enable_pressure:{
				// 	name:'启用压感',
				// 	init:false,
				// 	intro:'开启后可通过按压执行操作',
				// 	unfrequent:true,
				// },
				// pressure_taptic:{
				// 	name:'触觉反馈',
				// 	init:false,
				// 	intro:'开启后按压操作执行时将产生震动',
				// 	unfrequent:true,
				// },
				// pressure_click:{
				// 	name:'按压操作',
				// 	init:'pause',
				// 	intro:'在空白区域按压时的操作',
				// 	unfrequent:true,
				// 	item:{
				// 		pause:'暂停',
				// 		config:'选项',
				// 		auto:'托管',
				// 	}
				// },
				touchscreen: {
					name: "触屏模式",
					init: false,
					restart: true,
					unfrequent: true,
					intro: "开启后可使触屏设备反应更快，但无法使用鼠标操作",
					onclick(bool) {
						if (get.is.nomenu("touchscreen", bool)) return false;
						game.saveConfig("touchscreen", bool);
					},
				},
				swipe: {
					name: "滑动手势",
					init: true,
					unfrequent: true,
					intro: "在非滚动区域向四个方向滑动可执行对应操作",
				},
				swipe_down: {
					name: "下划操作",
					init: "menu",
					unfrequent: true,
					intro: "向下滑动时执行的操作",
					item: {
						system: "显示按钮",
						menu: "打开菜单",
						pause: "切换暂停",
						auto: "切换托管",
						chat: "显示聊天",
						off: "关闭",
					},
					onclick(item) {
						if (get.is.nomenu("swipe_down", item)) return false;
						game.saveConfig("swipe_down", item);
					},
				},
				swipe_up: {
					name: "上划操作",
					intro: "向上滑动时执行的操作",
					init: "auto",
					unfrequent: true,
					item: {
						system: "显示按钮",
						menu: "打开菜单",
						pause: "切换暂停",
						auto: "切换托管",
						chat: "显示聊天",
						off: "关闭",
					},
					onclick(item) {
						if (get.is.nomenu("swipe_up", item)) return false;
						game.saveConfig("swipe_up", item);
					},
				},
				swipe_left: {
					name: "左划操作",
					intro: "向左滑动时执行的操作",
					init: "system",
					unfrequent: true,
					item: {
						system: "显示按钮",
						menu: "打开菜单",
						pause: "切换暂停",
						auto: "切换托管",
						chat: "显示聊天",
						off: "关闭",
					},
					onclick(item) {
						if (get.is.nomenu("swipe_left", item)) return false;
						game.saveConfig("swipe_left", item);
					},
				},
				swipe_right: {
					name: "右划操作",
					intro: "向右滑动时执行的操作",
					init: "system",
					unfrequent: true,
					item: {
						system: "显示按钮",
						menu: "打开菜单",
						pause: "切换暂停",
						auto: "切换托管",
						chat: "显示聊天",
						off: "关闭",
					},
					onclick(item) {
						if (get.is.nomenu("swipe_right", item)) return false;
						game.saveConfig("swipe_right", item);
					},
				},
				round_menu_func: {
					name: "触屏按钮操作",
					intro: "点击屏幕中圆形按钮时执行的操作",
					init: "system",
					unfrequent: true,
					item: {
						system: "显示按钮",
						menu: "打开菜单",
						pause: "切换暂停",
						auto: "切换托管",
					},
					onclick(item) {
						if (get.is.nomenu("round_menu_func", item)) return false;
						game.saveConfig("round_menu_func", item);
					},
				},
				show_splash: {
					name: "显示开始界面",
					intro: "游戏开始前进入模式选择画面",
					init: "init",
					item: {
						off: "关闭",
						init: "首次启动",
						always: "保持开启",
					},
				},
				game_speed: {
					name: "游戏速度",
					init: "mid",
					item: {
						vslow: "慢",
						slow: "较慢",
						mid: "中",
						fast: "较快",
						vfast: "快",
						vvfast: "很快",
					},
					intro: "设置不同游戏操作间的时间间隔",
				},
				sync_speed: {
					name: "限制结算速度",
					intro: "在动画结算完成前不执行下一步操作，开启后游戏操作的间隔更长但画面更流畅，在游戏较卡时建议开启",
					init: true,
				},
				enable_vibrate: {
					name: "开启震动",
					intro: "回合开始时使手机震动",
					init: false,
				},
				right_click: {
					name: "右键操作",
					init: "pause",
					intro: "在空白区域点击右键时的操作",
					unfrequent: true,
					item: {
						pause: "暂停",
						shortcut: "工具",
						config: "选项",
						auto: "托管",
					},
					onclick(item) {
						if (get.is.nomenu("right_click", item)) return false;
						game.saveConfig("right_click", item);
					},
				},
				longpress_info: {
					name: "长按显示信息",
					init: true,
					unfrequent: true,
					restart: true,
					intro: "长按后弹出菜单",
				},
				right_info: {
					name: "右键显示信息",
					init: true,
					unfrequent: true,
					restart: true,
					intro: "右键点击后弹出菜单",
				},
				hover_all: {
					name: "悬停显示信息",
					init: true,
					unfrequent: true,
					restart: true,
					intro: "悬停后弹出菜单",
				},
				hover_handcard: {
					name: "悬停手牌显示信息",
					init: true,
					unfrequent: true,
					intro: "悬停手牌后弹出菜单",
				},
				hoveration: {
					name: "悬停菜单弹出时间",
					unfrequent: true,
					intro: "鼠标移至目标到弹出菜单的时间间隔",
					init: "1000",
					item: {
						500: "0.5秒",
						700: "0.7秒",
						1000: "1秒",
						1500: "1.5秒",
						2500: "2.5秒",
					},
				},
				doubleclick_intro: {
					name: "双击显示角色资料",
					init: true,
					unfrequent: true,
					intro: "双击角色头像后显示其资料卡",
				},
				video: {
					name: "保存录像",
					init: "20",
					intro: "游戏结束后保存录像在最大条数，超过后将从最早的录像开始删除（已收藏的录像不计入条数）",
					item: {
						0: "关闭",
						5: "五局",
						10: "十局",
						20: "二十局",
						50: "五十局",
						10000: "无限",
					},
					unfrequent: true,
				},
				video_default_play_speed: {
					name: "默认录像播放速度",
					init: "1x",
					intro: "设置播放游戏录像时默认的播放速度",
					item: {
						"0.25x": "0.25倍速",
						"0.5x": "0.5倍速",
						"1x": "原速",
						"1.5x": "1.5倍速",
						"2x": "2倍速",
						"4x": "4倍速",
					},
					unfrequent: true,
				},
				max_loadtime: {
					name: "最长载入时间",
					intro: "设置游戏从启动到完成载入所需的最长时间，超过此时间未完成载入会报错，若设备较慢或安装了较多扩展可适当延长此时间",
					init: "5000",
					unfrequent: true,
					item: {
						5000: "5秒",
						10000: "10秒",
						20000: "20秒",
						60000: "60秒",
					},
					onclick(item) {
						game.saveConfig("max_loadtime", item);
						if (item == "5000") {
							localStorage.removeItem(lib.configprefix + "loadtime");
						} else {
							localStorage.setItem(lib.configprefix + "loadtime", item);
						}
					},
				},
				mousewheel: {
					name: "滚轮控制手牌",
					init: true,
					unfrequent: true,
					intro: "开启后滚轮可使手牌横向滚动，在mac等可横向滚动的设备上建议关闭",
					onclick(bool) {
						game.saveConfig("mousewheel", bool);
						if (lib.config.touchscreen) return;
						if (lib.config.mousewheel) {
							ui.handcards1Container.onmousewheel = ui.click.mousewheel;
							ui.handcards2Container.onmousewheel = ui.click.mousewheel;
						} else {
							ui.handcards1Container.onmousewheel = null;
							ui.handcards2Container.onmousewheel = null;
						}
					},
				},
				auto_check_update: {
					name: "自动检查游戏更新",
					intro: "进入游戏时检查更新",
					init: false,
					unfrequent: true,
				},
				lucky_star: {
					name: "幸运星模式",
					intro: "在涉及随机数等的技能中，必定得到效果最好的结果。（联机模式无效）",
					init: false,
					unfrequent: true,
				},
				dev: {
					name: "开发者模式",
					intro: "开启后可使用浏览器控制台控制游戏，同时可更新到开发版",
					init: false,
					onclick(bool) {
						game.saveConfig("dev", bool);
						if (_status.connectMode) return;
						if (bool) {
							window.noname_shijianInterfaces?.showDebugButton?.();
							lib.cheat.i();
						} else {
							window.noname_shijianInterfaces?.hideDebugButton?.();
							delete window.cheat;
							delete window.game;
							delete window.ui;
							delete window.get;
							delete window.nonameAI;
							delete window.lib;
							delete window._status;
						}
					},
					unfrequent: true,
				},
				extension_alert: {
					name: "无视扩展报错",
					init: false,
					unfrequent: true,
				},
				fuck_sojson: {
					name: "检测加密扩展",
					init: false,
					unfrequent: true,
				},
				update_link: {
					name: "更新地址",
					init: "gitcode",
					unfrequent: true,
					item: {
						//coding: "URC",
						github: "GitHub",
						gitcode: "GitCode",
					},
					intro: "GitHub可同时下载离线(无素材)更新包和完整包，但网络条件要求较高；GitCode仅更新无离线更新包，素材更新请使用单独的‘检测素材更新’；安卓启动器只能下载完整包，win启动器都可。",
					onclick(item) {
						game.saveConfig("update_link", item);
						lib.updateURL = lib.updateURLS[item] || lib.updateURLS.coding;
					},
				},
				extension_source: {
					name: "获取扩展地址",
					init: "GitCode",
					unfrequent: true,
					item: {},
					intro: () => `获取在线扩展时的地址。当前地址：${document.createElement("br").outerHTML}${lib.config.extension_sources[lib.config.extension_source]}`,
				},
				extension_create: {
					name: "添加获取扩展地址",
					clear: true,
					unfrequent: true,
					onclick() {
						game.prompt("请输入地址名称", function (str) {
							if (str) {
								var map = lib.config.extension_sources;
								game.prompt("请输入" + str + "的地址", function (str2) {
									if (str2) {
										delete map[str];
										map[str] = str2;
										game.saveConfig("extension_sources", map);
										game.saveConfig("extension_source", str);
										var nodexx = ui.extension_source;
										nodexx.updateInner();
										var nodeyy = nodexx._link.menu;
										var nodezz = nodexx._link.config;
										for (var i = 0; i < nodeyy.childElementCount; i++) {
											if (nodeyy.childNodes[i]._link == str) {
												nodeyy.childNodes[i].remove();
												break;
											}
										}
										var textMenu = ui.create.div("", str, nodeyy, function () {
											var node = this.parentNode._link;
											var config = node._link.config;
											node._link.current = this.link;
											var tmpName = node.lastChild.innerHTML;
											node.lastChild.innerHTML = config.item[this._link];
											if (config.onclick) {
												if (config.onclick.call(node, this._link, this) === false) {
													node.lastChild.innerHTML = tmpName;
												}
											}
											if (config.update) {
												config.update();
											}
										});
										textMenu._link = str;
										nodezz.item[name] = str;
										alert("已添加扩展地址：" + str);
									}
								});
							}
						});
					},
				},
				extension_delete: {
					name: "删除当前扩展地址",
					clear: true,
					unfrequent: true,
					onclick() {
						var bool = false,
							map = lib.config.extension_sources;
						for (var i in map) {
							if (i != lib.config.extension_source) {
								bool = true;
								break;
							}
						}
						if (!bool) {
							alert("不能删除最后一个扩展地址！");
							return;
						}
						var name = lib.config.extension_source;
						game.saveConfig("extension_source", i);
						delete map[name];
						game.saveConfig("extension_sources", map);
						var nodexx = ui.extension_source;
						nodexx.updateInner();
						var nodeyy = nodexx._link.menu;
						var nodezz = nodexx._link.config;
						for (var i = 0; i < nodeyy.childElementCount; i++) {
							if (nodeyy.childNodes[i]._link == name) {
								nodeyy.childNodes[i].remove();
								break;
							}
						}
						delete nodezz.item[name];
						alert("已删除扩展地址：" + name);
					},
				},
				update: function (config, map) {
					if ("ontouchstart" in document) {
						map.touchscreen.show();
					} else {
						map.touchscreen.hide();
					}
					if (lib.device || lib.node) {
						map.auto_check_update.show();
					} else {
						map.auto_check_update.hide();
					}
					if (lib.device) {
						map.enable_vibrate.show();
						map.keep_awake.show();
					} else {
						map.enable_vibrate.hide();
						map.keep_awake.hide();
					}
					// if(config.enable_pressure){
					// 	map.pressure_click.show();
					// 	if(lib.device){
					// 		map.pressure_taptic.show();
					// 	}
					// 	else{
					// 		map.pressure_taptic.hide();
					// 	}
					// }
					// else{
					// 	map.pressure_click.hide();
					// 	map.pressure_taptic.hide();
					// }
					if (lib.config.touchscreen) {
						map.mousewheel.hide();
						map.hover_all.hide();
						map.hover_handcard.hide();
						map.hoveration.hide();
						map.right_info.hide();
						map.right_click.hide();
						map.longpress_info.show();
						map.swipe.show();
						if (lib.config.swipe) {
							map.swipe_up.show();
							map.swipe_down.show();
							map.swipe_left.show();
							map.swipe_right.show();
						} else {
							map.swipe_up.hide();
							map.swipe_down.hide();
							map.swipe_left.hide();
							map.swipe_right.hide();
						}
					} else {
						map.mousewheel.show();
						map.hover_all.show();
						map.right_info.show();
						map.right_click.show();
						map.longpress_info.hide();
						if (!config.hover_all) {
							map.hover_handcard.hide();
							map.hoveration.hide();
						} else {
							map.hover_handcard.show();
							map.hoveration.show();
						}
						map.swipe.hide();
						map.swipe_up.hide();
						map.swipe_down.hide();
						map.swipe_left.hide();
						map.swipe_right.hide();
					}
					if (lib.config.enable_drag) {
						if (lib.config.touchscreen) {
							map.enable_dragline.hide();
							map.enable_touchdragline.show();
						} else {
							map.enable_dragline.show();
							map.enable_touchdragline.hide();
						}
					} else {
						map.enable_dragline.hide();
						map.enable_touchdragline.hide();
					}
					if (!get.is.phoneLayout()) {
						map.round_menu_func.hide();
					} else {
						map.round_menu_func.show();
					}
					if (!lib.node && lib.device != "ios") {
						map.confirm_exit.show();
					} else {
						map.confirm_exit.hide();
					}
				},
			},
		},
		appearence: {
			name: "外观",
			config: {
				theme: {
					name: "主题",
					init: "music",
					item: {},
					visualMenu: function (node, link) {
						if (!node.menu) {
							node.className = "button character themebutton " + link;
							node.menu = ui.create.div(node, "", "<div></div><div></div><div></div><div></div>");
						}
					},
					onclick: async theme => {
						game.saveConfig("theme", theme);
						ui.arena.hide();
						lib.init.background();
						if (lib.config.autostyle) {
							if (theme === "simple") {
								lib.configMenu.appearence.config.player_border.onclick("slim");
							} else {
								lib.configMenu.appearence.config.player_border.onclick("normal");
							}
						}
						lib.announce.publish("Noname.Apperaence.Theme.onChanging", theme);
						await new Promise(resolve => setTimeout(resolve, 500));

						const deletingTheme = ui.css.theme;
						ui.css.theme = lib.init.css(lib.assetURL + "theme/" + lib.config.theme, "style");
						deletingTheme.remove();
						lib.announce.publish("Noname.Apperaence.Theme.onChanged", theme);
						await new Promise(resolve => setTimeout(resolve, 100));

						ui.arena.show();
						lib.announce.publish("Noname.Apperaence.Theme.onChangeFinished", theme);
					},
				},
				layout: {
					name: "布局",
					init: "nova",
					item: {
						//default:'旧版',
						//newlayout: "对称",
						//mobile: "默认",
						//long: "宽屏",
						//long2: "手杀",
						nova: "新版",
					},
					visualMenu: function (node, link) {
						node.className = "button character themebutton " + lib.config.theme;
						if (!node.created) {
							node.created = true;
							node.style.overflow = "hidden";
							node.firstChild.style.display = "none";
							// node.firstChild.classList.add('shadowed');
							// node.firstChild.style.width='16px';
							// node.firstChild.style.height='auto';
							// node.firstChild.style.padding='2px';
							// node.firstChild.style.textAlign='center';
							var me = ui.create.div(node);
							me.style.top = "auto";
							if (link == "default" || link == "newlayout") {
								me.style.width = "calc(100% - 6px)";
								me.style.left = "3px";
								me.style.bottom = "3px";
								me.style.height = "25px";
								if (link == "newlayout") {
									me.style.height = "23px";
									me.style.bottom = "4px";
								}
							} else if (link == "long2" || link == "nova") {
								me.style.display = "none";
							} else {
								me.style.width = "120%";
								me.style.left = "-10%";
								me.style.bottom = "0";
								me.style.height = "22px";
							}
							me.style.borderRadius = "2px";
							var list = ["re_caocao", "re_liubei", "sp_zhangjiao", "sunquan"];
							for (var i = 0; i < 4; i++) {
								var player = ui.create.div(".fakeplayer", node);
								ui.create.div(".avatar", player).setBackground(list.randomRemove(), "character");
								player.style.borderRadius = "2px";
								if (i != 3) {
									player.style.top = "auto";
								}
								if (link == "default") {
									player.style.height = "19px";
									player.style.width = "38px";
									player.classList.add("oldlayout");
								} else if (link == "mobile" || link == "newlayout") {
									player.style.width = "24px";
									player.style.height = "29px";
								} else if (link == "nova") {
									player.style.width = "20px";
									player.style.height = "24px";
								} else {
									player.style.width = "20px";
									player.style.height = "34px";
								}
								if (i == 1) {
									player.style.left = "3px";
								}
								if (i == 2) {
									player.style.left = "auto";
									player.style.right = "3px";
								}
								if (i == 3) {
									player.style.top = "3px";
								}
								if (link == "default") {
									if (i == 0) {
										player.style.bottom = "6px";
									}
									if (i == 0 || i == 3) {
										player.style.left = "calc(50% - 18px)";
									}
									if (i == 1 || i == 2) {
										player.style.bottom = "36px";
									}
								} else if (link == "newlayout") {
									if (i == 0) {
										player.style.bottom = "1px";
									}
									if (i == 0 || i == 3) {
										player.style.left = "calc(50% - 12px)";
									}
									if (i == 1 || i == 2) {
										player.style.bottom = "32px";
									}
								} else if (link == "mobile") {
									if (i == 0 || i == 3) {
										player.style.left = "calc(50% - 12px)";
									}
									if (i == 1 || i == 2) {
										player.style.bottom = "30px";
									}
								} else if (link == "long") {
									if (i == 0 || i == 3) {
										player.style.left = "calc(50% - 10px)";
									}
									if (i == 1 || i == 2) {
										player.style.bottom = "45px";
									}
								} else if (link == "long2") {
									if (i == 0) {
										player.style.bottom = "2px";
										player.style.left = "3px";
									}
									if (i == 3) {
										player.style.left = "calc(50% - 10px)";
									}
									if (i == 1 || i == 2) {
										player.style.bottom = "45px";
									}
								} else if (link == "nova") {
									if (i == 0) {
										player.style.bottom = "2px";
										player.style.left = "3px";
									}
									if (i == 3) {
										player.style.left = "calc(50% - 10px)";
									}
									if (i == 1 || i == 2) {
										player.style.left = "3px";
										player.style.bottom = i * 30 + "px";
									}
								}

								if (i == 0 && (link == "mobile" || link == "long")) {
									player.classList.add("me");
									player.style.borderRadius = "0px";
									player.style.width = "25px";
									player.style.height = "25px";
									player.style.bottom = "-3px";
									player.style.left = "-3px";
								}
							}
						}
					},
					onclick(layout) {
						if (lib.layoutfixed.includes(lib.config.mode)) {
							game.saveConfig("layout", layout);
						} else {
							lib.init.layout(layout);
						}
					},
				},
				splash_style: {
					name: "启动页",
					init: "style1",
					item: {
						style1: "样式一",
						style2: "样式二",
					},
					visualMenu: async (node, link) => {
						let splash = lib.onloadSplashes.find(item => item.id == link);
						if (splash) {
							await splash.preview(node);
						}
					},
				},
				// fewplayer:{
				//     name:'启用人数',
				// 	intro:'设置启用新版布局的最小人数（不足时切换至默认布局）',
				//     init:'3',
				//     // unfrequent:true,
				//     item:{
				//      			'2':'两人',
				//      			'3':'三人',
				//      			'4':'四人',
				//      			'5':'五人',
				//      			'6':'六人',
				//      			'7':'七人',
				//      			'8':'八人',
				//     },
				//     onclick(item){
				//      			game.saveConfig('fewplayer',item);
				//      			if(ui.arena) ui.arena.setNumber(ui.arena.dataset.number);
				//     }
				// },
				player_height: {
					name: "角色高度",
					init: "long",
					// unfrequent:true,
					item: {
						short: "矮",
						default: "中",
						long: "高",
					},
					onclick(item) {
						game.saveConfig("player_height", item);
						ui.arena.dataset.player_height = item;
					},
				},
				player_height_nova: {
					name: "角色高度",
					init: "short",
					item: {
						// auto:'自动',
						short: "矮",
						default: "中",
						long: "高",
					},
					onclick(item) {
						game.saveConfig("player_height_nova", item);
						// if(item=='auto'){
						// 	if(parseInt(ui.arena.dataset.number)>=7){
						// 		ui.arena.dataset.player_height_nova='short';
						// 	}
						// 	else{
						// 		ui.arena.dataset.player_height_nova='default';
						// 	}
						// }
						// else{
						ui.arena.dataset.player_height_nova = item;
						// }
					},
				},
				// background_color_music:{
				// 	name:'背景色',
				// 	init:'black',
				// 	item:{
				// 		blue:'蓝色',
				// 		black:'黑色',
				// 	},
				// 	onclick(color){
				// 		game.saveConfig('background_color_music',color);
				// 		document.body.dataset.background_color_music=color;
				// 	}
				// },
				// background_color_wood:{
				// 	name:'背景色',
				// 	init:'blue',
				// 	item:{
				// 		blue:'蓝色',
				// 		black:'黑色',
				// 	},
				// 	onclick(color){
				// 		game.saveConfig('background_color_wood',color);
				// 		document.body.dataset.background_color_wood=color;
				// 	}
				// },
				// theme_color_music:{
				// 	name:'主题色',
				// 	init:'black',
				// 	item:{
				// 		blue:'蓝色',
				// 		black:'黑色',
				// 	},
				// 	onclick(color){
				// 		game.saveConfig('theme_color_music',color);
				// 		document.body.dataset.theme_color_music=color;
				// 	}
				// },
				ui_zoom: {
					name: "界面缩放",
					unfrequent: true,
					init: "normal",
					item: {
						esmall: "80%",
						vsmall: "90%",
						small: "95%",
						normal: "100%",
						big: "105%",
						vbig: "110%",
						ebig: "120%",
						eebig: "150%",
						eeebig: "180%",
						eeeebig: "200%",
					},
					onclick(zoom) {
						game.saveConfig("ui_zoom", zoom);
						switch (zoom) {
							case "esmall":
								zoom = 0.8;
								break;
							case "vsmall":
								zoom = 0.9;
								break;
							case "small":
								zoom = 0.93;
								break;
							case "big":
								zoom = 1.05;
								break;
							case "vbig":
								zoom = 1.1;
								break;
							case "ebig":
								zoom = 1.2;
								break;
							case "eebig":
								zoom = 1.5;
								break;
							case "eeebig":
								zoom = 1.8;
								break;
							case "eeeebig":
								zoom = 2;
								break;
							default:
								zoom = 1;
						}
						game.documentZoom = game.deviceZoom * zoom;
						ui.updatez();
						if (Array.isArray(lib.onresize)) {
							lib.onresize.forEach(fun => {
								if (typeof fun == "function") fun();
							});
						}
					},
				},
				image_background: {
					name: "游戏背景",
					init: "default",
					item: {},
					visualBar: function (node, item, create) {
						if (node.created) {
							node.lastChild.classList.remove("active");
							return;
						}
						node.created = true;
						ui.create.filediv(".menubutton", "添加背景", node, function (file) {
							if (file) {
								var name = file.name;
								if (name.includes(".")) {
									name = name.slice(0, name.indexOf("."));
								}
								var link = (game.writeFile ? "cdv_" : "custom_") + name;
								if (item[link]) {
									for (var i = 1; i < 1000; i++) {
										if (!item[link + "_" + i]) {
											link = link + "_" + i;
											break;
										}
									}
								}
								item[link] = name;
								var callback = function () {
									create(link, node.parentNode.defaultNode);
									node.parentNode.updateBr();
									lib.config.customBackgroundPack.add(link);
									game.saveConfig("customBackgroundPack", lib.config.customBackgroundPack);
								};
								if (game.writeFile) {
									game.writeFile(file, "image/background", link + ".jpg", callback);
								} else {
									game.putDB("image", link, file, callback);
								}
								if (node.lastChild.classList.contains("active")) {
									editbg.call(node.lastChild);
								}
							}
						}).inputNode.accept = "image/*";
						var editbg = function () {
							this.classList.toggle("active");
							var page = this.parentNode.parentNode;
							for (var i = 0; i < page.childElementCount; i++) {
								if (page.childNodes[i].classList.contains("button")) {
									var link = page.childNodes[i]._link;
									if (link && link != "default") {
										var str;
										if (this.classList.contains("active")) {
											if (link.startsWith("custom_") || link.startsWith("cdv_")) {
												str = "删除";
											} else {
												str = "隐藏";
											}
										} else {
											str = item[link];
										}
										page.childNodes[i].firstChild.innerHTML = get.verticalStr(str);
									}
								}
							}
						};
						ui.create.div(".menubutton", "编辑背景", node, editbg);
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button character";
						node.style.backgroundImage = "";
						node.style.backgroundSize = "";
						if (node.firstChild) {
							node.firstChild.innerHTML = get.verticalStr(name);
						}
						if (link == "default" || link.startsWith("custom_")) {
							node.style.backgroundImage = "none";
							node.classList.add("dashedmenubutton");
							if (link.startsWith("custom_")) {
								game.getDB("image", link, function (fileToLoad) {
									if (!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function (fileLoadedEvent) {
										var data = fileLoadedEvent.target.result;
										node.style.backgroundImage = "url(" + data + ")";
										node.style.backgroundSize = "cover";
										node.classList.remove("dashedmenubutton");
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							} else {
								node.parentNode.defaultNode = node;
							}
						} else {
							node.setBackgroundImage("image/background/" + link + ".jpg");
							node.style.backgroundSize = "cover";
						}
					},
					onclick(background, node) {
						if (node && node.firstChild) {
							var menu = node.parentNode;
							if (node.firstChild.innerHTML == get.verticalStr("隐藏")) {
								menu.parentNode.noclose = true;
								node.remove();
								menu.updateBr();
								if (!lib.config.prompt_hidebg) {
									alert("隐藏的背景可通过选项-其它-重置隐藏内容恢复");
									game.saveConfig("prompt_hidebg", true);
								}
								lib.config.hiddenBackgroundPack.add(background);
								game.saveConfig("hiddenBackgroundPack", lib.config.hiddenBackgroundPack);
								delete lib.configMenu.appearence.config.image_background.item[background];
								if (lib.config.image_background == background) {
									background = "default";
									this.lastChild.innerHTML = "默认";
								} else {
									this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
									return;
								}
							} else if (node.firstChild.innerHTML == get.verticalStr("删除")) {
								menu.parentNode.noclose = true;
								if (confirm("是否删除此背景？（此操作不可撤销）")) {
									node.remove();
									menu.updateBr();
									lib.config.customBackgroundPack.remove(background);
									game.saveConfig("customBackgroundPack", lib.config.customBackgroundPack);
									if (background.startsWith("cdv_")) {
										game.removeFile("image/background/" + background + ".jpg");
									} else {
										game.deleteDB("image", background);
									}
									delete lib.configMenu.appearence.config.image_background.item[background];
									if (lib.config.image_background == background) {
										background = "default";
										this.lastChild.innerHTML = "默认";
									} else {
										this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
										return;
									}
								}
							}
						}
						game.saveConfig("image_background", background);
						lib.init.background();
						game.updateBackground();
					},
				},
				image_background_random: {
					name: "随机背景",
					init: false,
					onclick(bool) {
						game.saveConfig("image_background_random", bool);
						lib.init.background();
					},
				},
				image_background_blur: {
					name: "背景模糊",
					init: false,
					onclick(bool) {
						game.saveConfig("image_background_blur", bool);
						if (lib.config.image_background_blur) {
							ui.background.style.filter = "blur(8px)";
							ui.background.style.webkitFilter = "blur(8px)";
							ui.background.style.transform = "scale(1.05)";
						} else {
							ui.background.style.filter = "";
							ui.background.style.webkitFilter = "";
							ui.background.style.transform = "";
						}
					},
				},
				phonelayout: {
					name: "触屏布局",
					init: false,
					onclick(bool) {
						if (get.is.nomenu("phonelayout", bool)) return false;
						game.saveConfig("phonelayout", bool);
						if (get.is.phoneLayout()) {
							ui.css.phone.href = lib.assetURL + "layout/default/phone.css";
							ui.arena.classList.add("phone");
						} else {
							ui.css.phone.href = "";
							ui.arena.classList.remove("phone");
						}
					},
				},
				change_skin: {
					name: "开启换肤",
					init: true,
					intro: "在角色的右键菜单中换肤，皮肤可在选项-文件-图片文件-皮肤图片中添加",
				},
				change_skin_auto: {
					name: "自动换肤",
					init: "off",
					item: {
						off: "关闭",
						30000: "半分钟",
						60000: "一分钟",
						120000: "两分钟",
						300000: "五分钟",
					},
					intro: "游戏每进行一段时间自动为一个随机角色更换皮肤",
					onclick(item) {
						game.saveConfig("change_skin_auto", item);
						clearTimeout(_status.skintimeout);
						if (item != "off") {
							_status.skintimeout = setTimeout(ui.click.autoskin, parseInt(item));
						}
					},
				},
				card_style: {
					name: "卡牌样式",
					init: "default",
					intro: "设置正面朝上的卡牌的样式",
					item: {
						wood: "木纹",
						music: "音乐",
						simple: "原版",
						//ol: "手杀",
						// new:'新版',
						custom: "自定",
						default: "默认",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton", "添加图片", node, function (file) {
							if (file) {
								game.putDB("image", "card_style", file, function () {
									game.getDB("image", "card_style", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = "url(" + data + ")";
											button.className = "button card fullskin";
											node.classList.add("showdelete");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "card_style");
								button.style.backgroundImage = "none";
								button.className = "button character dashedmenubutton";
								node.classList.remove("showdelete");
								if (lib.config.card_style == "custom") {
									lib.configMenu.appearence.config.card_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button card fullskin";
						node.style.backgroundSize = "100% 100%";
						switch (link) {
							case "default":
							case "custom": {
								if (lib.config.theme == "simple") {
									node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";
									node.className = "button character";
								} else {
									node.style.backgroundImage = "none";
									node.className = "button character dashedmenubutton";
								}
								break;
							}
							case "new":
								node.setBackgroundImage("theme/style/card/image/new.png");
								break;
							case "ol":
								node.setBackgroundImage("theme/style/card/image/ol.png");
								break;
							case "wood":
								node.setBackgroundImage("theme/woodden/wood.jpg");
								node.style.backgroundSize = "initial";
								break;
							case "music":
								node.setBackgroundImage("theme/music/wood3.png");
								break;
							case "simple":
								node.setBackgroundImage("theme/simple/card.png");
								break;
						}
						if (link == "custom") {
							node.classList.add("transparent");
							game.getDB("image", "card_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = "url(" + data + ")";
									node.className = "button card fullskin";
									node.parentNode.lastChild.classList.add("showdelete");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick(layout) {
						game.saveConfig("card_style", layout);
						var style = ui.css.card_style;
						ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", lib.config.card_style);
						style.remove();
						if (ui.css.card_stylesheet) {
							ui.css.card_stylesheet.remove();
							delete ui.css.card_stylesheet;
						}
						if (layout == "custom") {
							game.getDB("image", "card_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.card_stylesheet) {
										ui.css.card_stylesheet.remove();
									}
									ui.css.card_stylesheet = lib.init.sheet(".card:not(*:empty){background-image:url(" + fileLoadedEvent.target.result + ")}");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					unfrequent: true,
				},
				cardback_style: {
					name: "卡背样式",
					intro: "设置背面朝上的卡牌的样式",
					init: "xingBei",
					item: {
						// wood:'木纹',
						// music:'音乐',
						//official: "原版",
						// new:'新版',
						//feicheng: "废城",
						//liusha: "流沙",
						//ol: "手杀",
						xingBei: "星杯",
						custom: "自定",
						default: "默认",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton", "添加图片", node, function (file) {
							if (file) {
								game.putDB("image", "cardback_style", file, function () {
									game.getDB("image", "cardback_style", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = "url(" + data + ")";
											button.className = "button character";
											node.classList.add("showdelete");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image/*";
						ui.create.filediv(".menubutton.deletebutton.addbutton", "添加翻转图片", node, function (file) {
							if (file) {
								game.putDB("image", "cardback_style2", file, function () {
									node.classList.add("hideadd");
								});
							}
						}).inputNode.accept = "image/*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "cardback_style");
								game.deleteDB("image", "cardback_style2");
								button.style.backgroundImage = "none";
								button.className = "button character dashedmenubutton";
								node.classList.remove("showdelete");
								node.classList.remove("hideadd");
								if (lib.config.cardback_style == "custom") {
									lib.configMenu.appearence.config.cardback_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.style.backgroundSize = "100% 100%";
						switch (link) {
							case "default":
							case "custom": {
								node.style.backgroundImage = "none";
								node.className = "button character dashedmenubutton";
								break;
							}/*
							case "new":
								node.className = "button character";
								node.setBackgroundImage("theme/style/cardback/image/new.png");
								break;
							case "feicheng":
								node.className = "button character";
								node.setBackgroundImage("theme/style/cardback/image/feicheng.png");
								break;
							case "official":
								node.className = "button character";
								node.setBackgroundImage("theme/style/cardback/image/official.png");
								break;
							case "liusha":
								node.className = "button character";
								node.setBackgroundImage("theme/style/cardback/image/liusha.png");
								break;
							case "ol":
								node.className = "button character";
								node.setBackgroundImage("theme/style/cardback/image/ol.png");
								break;
							case "wood":
								node.className = "button card fullskin";
								node.setBackgroundImage("theme/woodden/wood.jpg");
								node.style.backgroundSize = "initial";
								break;
							case "music":
								node.className = "button card fullskin";
								node.setBackgroundImage("theme/music/wood3.png");
								break;
							*/
							case "xingBei":
								node.className = "button card fullskin";
								node.setBackgroundImage("theme/style/cardback/image/xingBei1.png");
								break;
						}
						if (link == "custom") {
							node.classList.add("transparent");
							game.getDB("image", "cardback_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = "url(" + data + ")";
									node.className = "button character";
									node.parentNode.lastChild.classList.add("showdelete");
									game.getDB("image", "cardback_style2", function (file) {
										if (file) {
											node.parentNode.lastChild.classList.add("hideadd");
										}
									});
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick(layout) {
						game.saveConfig("cardback_style", layout);
						var style = ui.css.cardback_style;
						ui.css.cardback_style = lib.init.css(lib.assetURL + "theme/style/cardback", lib.config.cardback_style);
						style.remove();
						if (ui.css.cardback_stylesheet) {
							ui.css.cardback_stylesheet.remove();
							delete ui.css.cardback_stylesheet;
						}
						if (ui.css.cardback_stylesheet2) {
							ui.css.cardback_stylesheet2.remove();
							delete ui.css.cardback_stylesheet2;
						}
						if (layout == "custom") {
							game.getDB("image", "cardback_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.cardback_stylesheet) {
										ui.css.cardback_stylesheet.remove();
									}
									ui.css.cardback_stylesheet = lib.init.sheet(".card:empty,.card.infohidden{background-image:url(" + fileLoadedEvent.target.result + ")}");
									game.getDB("image", "cardback_style2", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											if (ui.css.cardback_stylesheet2) {
												ui.css.cardback_stylesheet2.remove();
											}
											ui.css.cardback_stylesheet2 = lib.init.sheet(".card.infohidden:not(.infoflip){background-image:url(" + fileLoadedEvent.target.result + ")}");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					unfrequent: true,
				},
				hp_style: {
					name: "治疗样式",
					init: "default",
					item: {
						default: "默认",
						// official:'勾玉',
						//emotion: "表情",
						//glass: "勾玉",
						//round: "国战",
						//ol: "手杀",
						//xinglass: "双鱼",
						//xinround: "OL",
						xingBei: "星杯",
						custom: "自定",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton.addbutton", "添加图片", node, function (file) {
							if (file && node.currentDB) {
								game.putDB("image", "hp_style" + node.currentDB, file, function () {
									game.getDB("image", "hp_style" + node.currentDB, function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.childNodes[node.currentDB - 1].style.backgroundImage = "url(" + data + ")";
											button.classList.add("shown");
											node.classList.add("showdelete");
											node.currentDB++;
											if (node.currentDB > 4) {
												node.classList.add("hideadd");
												button.classList.remove("transparent");
												delete node.currentDB;
											}
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image/*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "hp_style1");
								game.deleteDB("image", "hp_style2");
								game.deleteDB("image", "hp_style3");
								game.deleteDB("image", "hp_style4");
								for (var i = 0; i < button.childElementCount; i++) {
									button.childNodes[i].style.backgroundImage = "none";
								}
								node.classList.remove("showdelete");
								node.classList.remove("hideadd");
								if (lib.config.hp_style == "custom") {
									lib.configMenu.appearence.config.hp_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
								button.classList.remove("shown");
								node.currentDB = 1;
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button hpbutton dashedmenubutton";
						node.innerHTML = "";
						for (var i = 1; i <= 4; i++) {
							var div = ui.create.div(node);
							if (link == "default") {
								ui.create.div(div);
							} else if (link != "custom") {
								div.setBackgroundImage("theme/style/hp/image/" + link + i + ".png");
							}
							if (i == 4) {
								div.style.webkitFilter = "grayscale(1)";
							}
						}
						if (link == "custom") {
							node.classList.add("transparent");
							var getDB = function (num) {
								node.parentNode.lastChild.currentDB = num;
								game.getDB("image", "hp_style" + num, function (fileToLoad) {
									if (!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function (fileLoadedEvent) {
										var data = fileLoadedEvent.target.result;
										node.childNodes[num - 1].style.backgroundImage = "url(" + data + ")";
										node.classList.add("shown");
										node.parentNode.lastChild.classList.add("showdelete");
										if (num < 4) {
											getDB(num + 1);
										} else {
											node.parentNode.lastChild.classList.add("hideadd");
											node.classList.remove("transparent");
											delete node.parentNode.firstChild.currentDB;
										}
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							};
							getDB(1);
						}
					},
					onclick(layout) {
						game.saveConfig("hp_style", layout);
						var style = ui.css.hp_style;
						ui.css.hp_style = lib.init.css(lib.assetURL + "theme/style/hp", lib.config.hp_style);
						style.remove();
						if (ui.css.hp_stylesheet1) {
							ui.css.hp_stylesheet1.remove();
							delete ui.css.hp_stylesheet1;
						}
						if (ui.css.hp_stylesheet2) {
							ui.css.hp_stylesheet2.remove();
							delete ui.css.hp_stylesheet2;
						}
						if (ui.css.hp_stylesheet3) {
							ui.css.hp_stylesheet3.remove();
							delete ui.css.hp_stylesheet3;
						}
						if (ui.css.hp_stylesheet4) {
							ui.css.hp_stylesheet4.remove();
							delete ui.css.hp_stylesheet4;
						}
						if (layout == "custom") {
							game.getDB("image", "hp_style1", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet1) {
										ui.css.hp_stylesheet1.remove();
									}
									ui.css.hp_stylesheet1 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ")}");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
							game.getDB("image", "hp_style2", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet2) {
										ui.css.hp_stylesheet2.remove();
									}
									ui.css.hp_stylesheet2 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ")}");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
							game.getDB("image", "hp_style3", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet3) {
										ui.css.hp_stylesheet3.remove();
									}
									ui.css.hp_stylesheet3 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ")}");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
							game.getDB("image", "hp_style4", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.hp_stylesheet4) {
										ui.css.hp_stylesheet4.remove();
									}
									ui.css.hp_stylesheet4 = lib.init.sheet(".hp:not(.text):not(.actcount)>.lost{background-image:url(" + fileLoadedEvent.target.result + ")}");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					unfrequent: true,
				},
				player_style: {
					name: "角色背景",
					init: "default",
					intro: "设置角色的背景图片",
					item: {
						wood: "木纹",
						music: "音乐",
						simple: "简约",
						custom: "自定",
						default: "默认",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton", "添加图片", node, function (file) {
							if (file) {
								game.putDB("image", "player_style", file, function () {
									game.getDB("image", "player_style", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = "url(" + data + ")";
											button.className = "button character";
											button.style.backgroundSize = "100% 100%";
											node.classList.add("showdelete");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image/*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "player_style");
								button.style.backgroundImage = "none";
								button.className = "button character dashedmenubutton";
								node.classList.remove("showdelete");
								if (lib.config.player_style == "custom") {
									lib.configMenu.appearence.config.player_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button character";
						node.style.backgroundSize = "";
						node.style.height = "108px";
						switch (link) {
							case "default":
							case "custom": {
								node.style.backgroundImage = "none";
								node.className = "button character dashedmenubutton";
								break;
							}
							case "wood":
								node.setBackgroundImage("theme/woodden/wood.jpg");
								break;
							case "music":
								node.style.backgroundImage = "linear-gradient(#4b4b4b, #464646)";
								break;
							case "simple":
								node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";
								break;
						}
						if (link == "custom") {
							node.classList.add("transparent");
							game.getDB("image", "player_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = "url(" + data + ")";
									node.className = "button character";
									node.parentNode.lastChild.classList.add("showdelete");
									node.style.backgroundSize = "100% 100%";
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick(layout) {
						game.saveConfig("player_style", layout);
						if (ui.css.player_stylesheet) {
							ui.css.player_stylesheet.remove();
							delete ui.css.player_stylesheet;
						}
						if (layout == "custom") {
							game.getDB("image", "player_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.player_stylesheet) {
										ui.css.player_stylesheet.remove();
									}
									ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						} else if (layout != "default") {
							var str = "";
							switch (layout) {
								case "wood":
									str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")';
									break;
								case "music":
									str = "linear-gradient(#4b4b4b, #464646)";
									break;
								case "simple":
									str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";
									break;
							}
							ui.css.player_stylesheet = lib.init.sheet("#window .player{background-image:" + str + "}");
						}
					},
					unfrequent: true,
				},
				zhishixian: {
					name: "指示线",
					intro: "设置卡牌、技能的指示特效",
					init: "default",
					unfrequent: true,
					item: {
						default: "默认",
						Mohua: "水墨",
						Xiangong: "先攻",
						Zhuzhang: "竹杖",
						Shuimo: "幻彩",
						Anhei: "黑暗",
						Mozhua: "魔爪",
						Shenjian: "神剑",
						Yujian: "御剑",
						Jianfeng: "剑锋",
						Jinjian: "金箭",
						Jinlong: "金龙",
						Yuexian: "乐仙",
						Xingdie: "星蝶",
						Luoying: "落英",
						Shezhang: "蛇杖",
					},
					onclick(items) {
						game.saveConfig("zhishixian", items);
						if (items == "default") {
							game.linexy = game.zsOriginLineXy;
						} else {
							game.linexy = game["zs" + items + "LineXy"];
						}
					},
				},
				border_style: {
					name: "角色边框",
					init: "default",
					intro: "设置角色边框的样式，当设为自动时，样式将随着一局游戏中伤害或击杀的数量自动改变",
					item: {
						gold: "金框",
						silver: "银框",
						bronze: "铜框",
						dragon_gold: "金龙",
						dragon_silver: "银龙",
						dragon_bronze: "玉龙",
						custom: "自定",
						side:'队伍',
						auto: "自动",
						default: "无",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton", "添加图片", node, function (file) {
							if (file) {
								game.putDB("image", "border_style", file, function () {
									game.getDB("image", "border_style", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = "url(" + data + ")";
											button.className = "button character";
											button.style.backgroundSize = "100% 100%";
											node.classList.add("showdelete");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image/*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "border_style");
								button.style.backgroundImage = "none";
								button.className = "button character dashedmenubutton";
								node.classList.remove("showdelete");
								if (lib.config.border_style == "custom") {
									lib.configMenu.appearence.config.border_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button character";
						node.style.backgroundSize = "";
						node.style.height = "108px";
						node.dataset.decoration = "";
						if (link == "default" || link == "custom" || link == "auto") {
							node.style.backgroundImage = "none";
							node.className = "button character dashedmenubutton";
						} else {
							if (link.startsWith("dragon_")) {
								link = link.slice(7);
								node.dataset.decoration = link;
							}
							if(link == "side") {
								node.setBackgroundImage("theme/style/player/" + 'red' + "1.png");
							}else{
								node.setBackgroundImage("theme/style/player/" + link + "1.png");
							}
							node.style.backgroundSize = "100% 100%";
						}
						if (link == "custom") {
							node.classList.add("transparent");
							game.getDB("image", "border_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = "url(" + data + ")";
									node.className = "button character";
									node.parentNode.lastChild.classList.add("showdelete");
									node.style.backgroundSize = "100% 100%";
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick(layout) {
						game.saveConfig("border_style", layout);
						if (ui.css.border_stylesheet) {
							ui.css.border_stylesheet.remove();
							delete ui.css.border_stylesheet;
						}
						if (layout == "custom") {
							game.getDB("image", "border_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.border_stylesheet) {
										ui.css.border_stylesheet.remove();
									}
									ui.css.border_stylesheet = lib.init.sheet();
									ui.css.border_stylesheet.id = "ui.css.border";
									ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
									ui.css.border_stylesheet.sheet.insertRule(".player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}", 0);
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						} else if (layout != "default" && layout != "auto" && layout != "side") {
							ui.css.border_stylesheet = lib.init.sheet();
							if (layout.startsWith("dragon_")) {
								layout = layout.slice(7);
								ui.arena.dataset.framedecoration = layout;
							} else {
								ui.arena.dataset.framedecoration = "";
							}
							ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("' + lib.assetURL + "theme/style/player/" + layout + '1.png")}', 0);
							ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("' + lib.assetURL + "theme/style/player/" + layout + '3.png")}', 0);
							ui.css.border_stylesheet.sheet.insertRule(".player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}", 0);
						}
					},
					unfrequent: true,
				},
				autoborder_count: {
					name: "边框升级方式",
					intro: "<strong>伤害</strong> 每造成两点伤害，边框提升一级<br>",
					init: "damage",
					item: {
						//kill: "击杀",
						damage: "伤害",
						//mix: "混合",
					},
					unfrequent: true,
				},
				autoborder_start: {
					name: "基础边框颜色",
					init: "bronze",
					item: {
						bronze: "铜",
						silver: "银",
						gold: "金",
					},
					unfrequent: true,
				},
				player_border: {
					name: "边框宽度",
					init: "normal",
					intro: "设置角色的边框宽度",
					unfrequent: true,
					item: {
						slim: "细",
						narrow: "窄",
						normal: "中",
						wide: "宽",
					},
					onclick(item) {
						game.saveConfig("player_border", item);
						if (item != "wide" || game.layout == "long" || game.layout == "long2") {
							ui.arena.classList.add("slim_player");
						} else {
							ui.arena.classList.remove("slim_player");
						}
						if (item == "slim") {
							ui.arena.classList.add("uslim_player");
						} else {
							ui.arena.classList.remove("uslim_player");
						}
						if (item == "narrow") {
							ui.arena.classList.add("mslim_player");
						} else {
							ui.arena.classList.remove("mslim_player");
						}
						if (item == "normal" && lib.config.mode != "brawl" && (game.layout == "long" || game.layout == "long2")) {
							ui.arena.classList.add("lslim_player");
						} else {
							ui.arena.classList.remove("lslim_player");
						}
						ui.window.dataset.player_border = item;
					},
				},
				menu_style: {
					name: "菜单背景",
					init: "default",
					item: {
						wood: "木纹",
						music: "音乐",
						simple: "简约",
						custom: "自定",
						default: "默认",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton", "添加图片", node, function (file) {
							if (file) {
								game.putDB("image", "menu_style", file, function () {
									game.getDB("image", "menu_style", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = "url(" + data + ")";
											button.style.backgroundSize = "cover";
											button.className = "button character";
											node.classList.add("showdelete");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image/*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "menu_style");
								button.style.backgroundImage = "none";
								button.style.backgroundSize = "auto";
								button.className = "button character dashedmenubutton";
								node.classList.remove("showdelete");
								if (lib.config.menu_style == "custom") {
									lib.configMenu.appearence.config.menu_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button character";
						node.style.backgroundSize = "auto";
						switch (link) {
							case "default":
							case "custom": {
								node.style.backgroundImage = "none";
								node.classList.add("dashedmenubutton");
								break;
							}
							case "wood":
								node.setBackgroundImage("theme/woodden/wood2.png");
								break;
							case "music":
								node.style.backgroundImage = "linear-gradient(#4b4b4b, #464646)";
								break;
							case "simple":
								node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";
								break;
						}
						if (link == "custom") {
							node.classList.add("transparent");
							game.getDB("image", "menu_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = "url(" + data + ")";
									node.style.backgroundSize = "cover";
									node.className = "button character";
									node.parentNode.lastChild.classList.add("showdelete");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick(layout) {
						game.saveConfig("menu_style", layout);
						if (ui.css.menu_stylesheet) {
							ui.css.menu_stylesheet.remove();
							delete ui.css.menu_stylesheet;
						}
						if (layout == "custom") {
							game.getDB("image", "menu_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.menu_stylesheet) {
										ui.css.menu_stylesheet.remove();
									}
									ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						} else if (layout != "default") {
							var str = "";
							switch (layout) {
								case "wood":
									str = 'url("' + lib.assetURL + 'theme/woodden/wood2.png")';
									break;
								case "music":
									str = "linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px";
									break;
								case "simple":
									str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px";
									break;
							}
							ui.css.menu_stylesheet = lib.init.sheet("html #window>.dialog.popped,html .menu,html .menubg{background-image:" + str + "}");
						}
					},
					unfrequent: true,
				},
				control_style: {
					name: "按钮背景",
					init: "default",
					item: {
						wood: "木纹",
						music: "音乐",
						simple: "简约",
						custom: "自定",
						default: "默认",
					},
					visualBar: function (node, item, create, switcher) {
						if (node.created) {
							return;
						}
						var button;
						for (var i = 0; i < node.parentNode.childElementCount; i++) {
							if (node.parentNode.childNodes[i]._link == "custom") {
								button = node.parentNode.childNodes[i];
							}
						}
						if (!button) {
							return;
						}
						node.created = true;
						var deletepic;
						ui.create.filediv(".menubutton", "添加图片", node, function (file) {
							if (file) {
								game.putDB("image", "control_style", file, function () {
									game.getDB("image", "control_style", function (fileToLoad) {
										if (!fileToLoad) return;
										var fileReader = new FileReader();
										fileReader.onload = function (fileLoadedEvent) {
											var data = fileLoadedEvent.target.result;
											button.style.backgroundImage = "url(" + data + ")";
											button.className = "button character controlbutton";
											node.classList.add("showdelete");
										};
										fileReader.readAsDataURL(fileToLoad, "UTF-8");
									});
								});
							}
						}).inputNode.accept = "image/*";
						deletepic = ui.create.div(".menubutton.deletebutton", "删除图片", node, function () {
							if (confirm("确定删除自定义图片？（此操作不可撤销）")) {
								game.deleteDB("image", "control_style");
								button.style.backgroundImage = "none";
								button.className = "button character controlbutton dashedmenubutton";
								node.classList.remove("showdelete");
								if (lib.config.control_style == "custom") {
									lib.configMenu.appearence.config.control_style.onclick("default");
									switcher.lastChild.innerHTML = "默认";
								}
								button.classList.add("transparent");
							}
						});
					},
					visualMenu: function (node, link, name, config) {
						node.className = "button character controlbutton";
						node.style.backgroundSize = "";
						switch (link) {
							case "default":
							case "custom": {
								node.style.backgroundImage = "none";
								node.classList.add("dashedmenubutton");
								break;
							}
							case "wood":
								node.setBackgroundImage("theme/woodden/wood.jpg");
								break;
							case "music":
								node.style.backgroundImage = "linear-gradient(#4b4b4b, #464646)";
								break;
							case "simple":
								node.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";
								break;
						}
						if (link == "custom") {
							node.classList.add("transparent");
							game.getDB("image", "control_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									var data = fileLoadedEvent.target.result;
									node.style.backgroundImage = "url(" + data + ")";
									node.className = "button character controlbutton";
									node.parentNode.lastChild.classList.add("showdelete");
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						}
					},
					onclick(layout) {
						game.saveConfig("control_style", layout);
						if (ui.css.control_stylesheet) {
							ui.css.control_stylesheet.remove();
							delete ui.css.control_stylesheet;
						}
						if (layout == "custom") {
							game.getDB("image", "control_style", function (fileToLoad) {
								if (!fileToLoad) return;
								var fileReader = new FileReader();
								fileReader.onload = function (fileLoadedEvent) {
									if (ui.css.control_stylesheet) {
										ui.css.control_stylesheet.remove();
									}
									ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
								};
								fileReader.readAsDataURL(fileToLoad, "UTF-8");
							});
						} else if (layout != "default") {
							var str = "";
							switch (layout) {
								case "wood":
									str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")';
									break;
								case "music":
									str = "linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px";
									break;
								case "simple":
									str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px";
									break;
							}
							if (layout == "wood") {
								ui.css.control_stylesheet = lib.init.sheet("#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:" + str + "}");
							} else {
								ui.css.control_stylesheet = lib.init.sheet("#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:" + str + "}");
							}
						}
					},
					unfrequent: true,
				},
				custom_button: {
					name: "自定义按钮高度",
					init: false,
					unfrequent: true,
					onclick(bool) {
						if (bool !== "skip") {
							game.saveConfig("custom_button", bool);
						}
						if (ui.css.buttonsheet) {
							ui.css.buttonsheet.remove();
						}
						if (lib.config.custom_button) {
							var cbnum1 = 6 + (parseInt(lib.config.custom_button_system_top) || 0);
							var cbnum2 = 6 + (parseInt(lib.config.custom_button_system_bottom) || 0);
							var cbnum3 = 3 + (parseInt(lib.config.custom_button_control_top) || 0);
							var cbnum4 = 3 + (parseInt(lib.config.custom_button_control_bottom) || 0);
							var cbnum5 = 2;
							var cbnum6 = 2;
							if (cbnum3 < 0) {
								cbnum5 += cbnum3;
								cbnum3 = 0;
							}
							if (cbnum4 < 0) {
								cbnum6 += cbnum4;
								cbnum4 = 0;
							}
							ui.css.buttonsheet = lib.init.sheet("#system>div>div, .caption>div>.tdnode{padding-top:" + cbnum1 + "px !important;padding-bottom:" + cbnum2 + "px !important}", "#control>.control>div{padding-top:" + cbnum3 + "px;padding-bottom:" + cbnum4 + "px}", "#control>.control{padding-top:" + cbnum5 + "px;padding-bottom:" + cbnum6 + "px}");
						}
					},
				},
				custom_button_system_top: {
					name: "菜单上部高度",
					init: "0x",
					item: {
						"-5x": "-5px",
						"-4x": "-4px",
						"-3x": "-3px",
						"-2x": "-2px",
						"-1x": "-1px",
						"0x": "默认",
						"1x": "1px",
						"2x": "2px",
						"3x": "3px",
						"4x": "4px",
						"5x": "5px",
					},
					unfrequent: true,
					onclick(item) {
						game.saveConfig("custom_button_system_top", item);
						lib.configMenu.appearence.config.custom_button.onclick("skip");
					},
				},
				custom_button_system_bottom: {
					name: "菜单下部高度",
					init: "0x",
					item: {
						"-5x": "-5px",
						"-4x": "-4px",
						"-3x": "-3px",
						"-2x": "-2px",
						"-1x": "-1px",
						"0x": "默认",
						"1x": "1px",
						"2x": "2px",
						"3x": "3px",
						"4x": "4px",
						"5x": "5px",
					},
					unfrequent: true,
					onclick(item) {
						game.saveConfig("custom_button_system_bottom", item);
						lib.configMenu.appearence.config.custom_button.onclick("skip");
					},
				},
				custom_button_control_top: {
					name: "技能上部高度",
					init: "0x",
					item: {
						"-5x": "-5px",
						"-4x": "-4px",
						"-3x": "-3px",
						"-2x": "-2px",
						"-1x": "-1px",
						"0x": "默认",
						"1x": "1px",
						"2x": "2px",
						"3x": "3px",
						"4x": "4px",
						"5x": "5px",
					},
					unfrequent: true,
					onclick(item) {
						game.saveConfig("custom_button_control_top", item);
						lib.configMenu.appearence.config.custom_button.onclick("skip");
					},
				},
				custom_button_control_bottom: {
					name: "技能下部高度",
					init: "0x",
					item: {
						"-5x": "-5px",
						"-4x": "-4px",
						"-3x": "-3px",
						"-2x": "-2px",
						"-1x": "-1px",
						"0x": "默认",
						"1x": "1px",
						"2x": "2px",
						"3x": "3px",
						"4x": "4px",
						"5x": "5px",
					},
					unfrequent: true,
					onclick(item) {
						game.saveConfig("custom_button_control_bottom", item);
						lib.configMenu.appearence.config.custom_button.onclick("skip");
					},
				},
				radius_size: {
					name: "圆角大小",
					init: "default",
					item: {
						off: "关闭",
						reduce: "减小",
						default: "默认",
						increase: "增大",
					},
					unfrequent: true,
					onclick(item) {
						game.saveConfig("radius_size", item);
						ui.window.dataset.radius_size = item;
					},
				},
				glow_phase: {
					name: "当前回合角色高亮",
					unfrequent: true,
					init: "yellow",
					intro: "设置当前回合角色的边框颜色",
					item: {
						none: "无",
						yellow: "黄色",
						green: "绿色",
						purple: "紫色",
					},
					onclick(bool) {
						game.saveConfig("glow_phase", bool);
						lib.init.cssstyles();
					},
				},
				/*
				equip_span: {
					name: "装备牌占位",
					intro: "打开后，没有装备的装备区将在装备栏占据空白位置。",
					init: false,
					unfrequent: false,
				},*/
				fold_card: {
					name: "折叠手牌",
					init: true,
					unfrequent: true,
				},
				fold_mode: {
					name: "折叠模式菜单",
					intro: "关闭后模式菜单中“更多”内的项目将直接展开",
					init: true,
					unfrequent: true,
				},
				seperate_control: {
					name: "分离选项条",
					init: true,
					unfrequent: true,
					intro: "开启后玩家在进行选择时不同的选项将分开，而不是连在一起",
				},
				blur_ui: {
					name: "模糊效果",
					intro: "在暂停或打开菜单时开启模糊效果",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("blur_ui", bool);
						if (bool) {
							ui.window.classList.add("blur_ui");
						} else {
							ui.window.classList.remove("blur_ui");
						}
					},
				},
				glass_ui: {
					name: "玻璃主题",
					intro: "为游戏主题打开玻璃效果（手机暂不支持）",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("glass_ui", bool);
						if (bool) {
							ui.window.classList.add("glass_ui");
						} else {
							ui.window.classList.remove("glass_ui");
						}
					},
				},
				damage_shake: {
					name: "伤害抖动",
					intro: "角色受到伤害时的抖动效果",
					init: true,
					unfrequent: true,
				},
				button_press: {
					name: "按钮效果",
					intro: "选项条被按下时将有按下效果",
					init: true,
					unfrequent: true,
				},
				/*
				jiu_effect: {
					name: "喝酒效果",
					init: true,
					unfrequent: true,
				},*/
				animation: {
					name: "游戏特效",
					intro: "开启后出现部分情况时会显示动画",
					init: false,
					unfrequent: true,
				},
				separateEnergyAndMarkers: {
					name: "独立显示能量和红蓝专属",
					init: false,
					intro: "开启后将角色能量和红蓝专属指示物单独显示在角色下方",
					onclick(bool) {
						game.saveConfig("separateEnergyAndMarkers", bool);
						lib.init.background();
					},
				},
				card_animation_info: {
					name: "卡牌动画信息(Beta)",
					intro: "开启后会在卡牌动画中显示一些信息来源并启用虚拟牌动画(Beta测试功能，如遇异常可关闭该功能)",
					init: false,
					unfrequent: false,
				},
				skill_animation_type: {
					name: "技能特效",
					intro: "开启后发动部分技能将显示全屏文字",
					init: "default",
					unfrequent: true,
					item: {
						default: "默认",
						old: "旧版",
						off: "关闭",
					},
				},
				/*
				die_move: {
					name: "阵亡效果",
					intro: "阵亡后武将的显示效果",
					init: "flip",
					unfrequent: true,
					item: {
						off: "关闭",
						move: "移动",
						flip: "翻面",
					},
				},*/
				target_shake: {
					name: "目标效果",
					intro: "一名玩家成为卡牌或技能的目标时的显示效果",
					init: "off",
					item: {
						off: "关闭",
						zoom: "缩放",
						shake: "抖动",
					},
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("target_shake", bool);
						ui.arena.dataset.target_shake = bool;
					},
				},
				/*
				turned_style: {
					name: "翻面文字",
					intro: "角色被翻面时显示“翻面”",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("turned_style", bool);
						if (bool) {
							ui.arena.classList.remove("hide_turned");
						} else {
							ui.arena.classList.add("hide_turned");
						}
					},
				},
				link_style2: {
					name: "横置样式",
					intro: "设置角色被横置时的样式",
					init: "rotate",
					unfrequent: true,
					item: {
						//chain: "铁索",
						rotate: "横置",
						//mark: "标记",
					},
					onclick(style) {
						var list = [];
						for (var i = 0; i < game.players.length; i++) {
							if (game.players[i].isLinked()) {
								list.push(game.players[i]);
							}
						}
						game.saveConfig("link_style2", style);
						for (var i = 0; i < list.length; i++) {
							if (get.is.linked2(list[i])) {
								list[i].classList.add("linked2");
								list[i].classList.remove("linked");
							} else {
								list[i].classList.add("linked");
								list[i].classList.remove("linked2");
							}
						}
						if (style == "chain") {
							ui.arena.classList.remove("nolink");
						} else {
							ui.arena.classList.add("nolink");
						}
						ui.updatem();
					},
				},*/
				cardshape: {
					name: "手牌显示",
					intro: "将手牌设置为正方形或长方形",
					init: "default",
					unfrequent: true,
					item: {
						default: "默认",
						oblong: "长方",
					},
					onclick(item) {
						/*
						var linked = false;
						if (game.me && game.me.isLinked()) {
							linked = true;
						}*/
						game.saveConfig("cardshape", item);
						if (item == "oblong" && (game.layout == "long" || game.layout == "mobile" || game.layout == "long2" || game.layout == "nova")) {
							ui.arena.classList.add("oblongcard");
							ui.window.classList.add("oblongcard");
						} else {
							ui.arena.classList.remove("oblongcard");
							ui.window.classList.remove("oblongcard");
						}
						/*
						if (linked) {
							if (get.is.linked2(game.me)) {
								game.me.classList.remove("linked");
								game.me.classList.add("linked2");
							} else {
								game.me.classList.add("linked");
								game.me.classList.remove("linked2");
							}
						}*/
					},
				},
				cardtempname: {
					name: "视为卡牌名称显示",
					intro: "显示强制视为类卡牌（如武魂），包括拆顺对话框内的判定牌（国色）转换等名称的显示方式",
					init: "image",
					unfrequent: true,
					item: {
						default: "纵向",
						horizon: "横向",
						image: "图片",
						off: "禁用",
					},
					onclick(item) {
						game.saveConfig("cardtempname", item);
						if (!game.me || !game.me.getCards) return;
						var hs = game.me.getCards("h");
						for (var i = 0; i < hs.length; i++) {
							if (hs[i]._tempName) {
								switch (item) {
									case "default":
									case "horizon":
									case "image":
										ui.create.cardTempName(hs[i]);
										break;
									default:
										hs[i]._tempName.delete();
										delete hs[i]._tempName;
								}
							}
						}
					},
				},
				/*textequip:{
					name:'装备显示',
					init:'image',
					unfrequent:true,
					item:{
						image:'图片',
						text:'文字',
					},
					onclick(item){
						game.saveConfig('textequip',item);
						if(item=='text'&&(game.layout=='long'||game.layout=='mobile')){
							ui.arena.classList.add('textequip');
						}
						else{
							ui.arena.classList.remove('textequip');
						}
					}
				},*/
				buttoncharacter_style: {
					name: "选角样式",
					init: "default",
					item: {
						default: "默认",
						simple: "精简",
						old: "旧版",
					},
					unfrequent: true,
				},
				buttoncharacter_prefix: {
					name: "角色前缀",
					init: "default",
					item: {
						default: "默认",
						simple: "不显示颜色",
						off: "不显示前缀",
					},
					unfrequent: true,
				},
				cursor_style: {
					name: "鼠标指针",
					init: "auto",
					intro: "设置为固定后鼠标指针将不随移动到的区域而变化",
					unfrequent: true,
					item: {
						auto: "自动",
						pointer: "固定",
					},
					onclick(item) {
						game.saveConfig("cursor_style", item);
						if (item == "pointer") {
							ui.window.classList.add("nopointer");
						} else {
							ui.window.classList.remove("nopointer");
						}
					},
				},
				name_font: {
					name: "人名字体",
					init: "xingkai",
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != "default") {
							node.style.fontFamily = link;
						}
						node.style.fontSize = "20px";
					},
					onclick(font) {
						game.saveConfig("name_font", font);
						lib.init.cssstyles();
					},
				},
				identity_font: {
					name: "身份字体",
					init: "huangcao",
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != "default") {
							node.style.fontFamily = link;
						}
						node.style.fontSize = "20px";
					},
					onclick(font) {
						game.saveConfig("identity_font", font);
						lib.init.cssstyles();
					},
				},
				cardtext_font: {
					name: "卡牌字体",
					init: "default",
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != "default") {
							node.style.fontFamily = link;
						}
						node.style.fontSize = "20px";
					},
					onclick(font) {
						game.saveConfig("cardtext_font", font);
						lib.init.cssstyles();
					},
				},
				global_font: {
					name: "界面字体",
					init: "default",
					unfrequent: true,
					item: {},
					textMenu: function (node, link) {
						if (link != "default") {
							node.style.fontFamily = link;
						} else {
							node.style.fontFamily = "'STHeiti','SimHei','Microsoft JhengHei','Microsoft YaHei','WenQuanYi Micro Hei','Suits',Helvetica,Arial,sans-serif";
						}
						node.style.fontSize = "20px";
					},
					onclick(font) {
						game.saveConfig("global_font", font);
						lib.init.cssstyles();
					},
				},
				suits_font: {
					name: "替换花色字体",
					init: true,
					unfrequent: true,
					intro: "使用全角字符的花色替代系统自带的花色（重启游戏后生效）",
					onclick(bool) {
						game.saveConfig("suits_font", bool);
					},
				},
				update: function (config, map) {
					if (lib.config.custom_button) {
						map.custom_button_system_top.show();
						map.custom_button_system_bottom.show();
						map.custom_button_control_top.show();
						map.custom_button_control_bottom.show();
					} else {
						map.custom_button_system_top.hide();
						map.custom_button_system_bottom.hide();
						map.custom_button_control_top.hide();
						map.custom_button_control_bottom.hide();
					}
					if (lib.config.change_skin) {
						map.change_skin_auto.show();
					} else {
						map.change_skin_auto.hide();
					}
					if (lib.config.image_background_random) {
						map.image_background_blur.show();
						map.image_background.hide();
						// map.import_background.hide();
					} else {
						map.image_background.show();
						if (lib.config.image_background == "default") {
							map.image_background_blur.hide();
						} else {
							map.image_background_blur.show();
						}
						// if(lib.config.image_background=='custom'&&lib.db){
						// 	map.import_background.show();
						// }
						// else{
						// 	map.import_background.hide();
						// }
					}
					if (lib.config.layout == "long" || lib.config.layout == "mobile") {
						//map.textequip.show();
						map.cardshape.show();
						map.phonelayout.show();
					} else {
						//map.textequip.hide();
						if (lib.config.layout == "long2" || lib.config.layout == "nova") {
							map.phonelayout.show();
							map.cardshape.show();
						} else {
							map.phonelayout.hide();
							map.cardshape.hide();
						}
					}
					if (lib.config.layout == "long") {
						// map.fewplayer.show();
						map.player_height.show();
					} else {
						// map.fewplayer.hide();
						if (lib.config.layout == "long2") {
							map.player_height.show();
						} else {
							map.player_height.hide();
						}
					}
					if (lib.config.layout == "nova") {
						map.player_height_nova.show();
					} else {
						map.player_height_nova.hide();
					}
					if (lib.config.touchscreen) {
						map.cursor_style.hide();
					} else {
						map.cursor_style.show();
					}
					if (lib.config.border_style == "auto") {
						map.autoborder_count.show();
						map.autoborder_start.show();
					} else {
						map.autoborder_count.hide();
						map.autoborder_start.hide();
					}
				},
			},
		},
		view: {
			name: "显示",
			config: {
				update: function (config, map) {
					//if (lib.config.mode == "versus" || lib.config.mode == "chess" || lib.config.mode == "tafang" || lib.config.mode == "boss") {
						/*
					if (lib.config.mode == "xingBei" || lib.config.mode == "chess" || lib.config.mode == "tafang" || lib.config.mode == "boss") {
						map.show_handcardbutton.show();
					} else {
						map.show_handcardbutton.hide();
					}*/
					if (lib.config.touchscreen) {
						map.pop_logv.hide();
					} else {
						map.pop_logv.show();
					}
					if (lib.device) {
						if (lib.device == "android") {
							map.show_statusbar_android.show();
							map.show_statusbar_ios.hide();
						} else if (lib.device == "ios") {
							map.show_statusbar_ios.show();
							map.show_statusbar_android.hide();
						}
						if (!game.download) {
							setTimeout(function () {
								if (!window.StatusBar) {
									map.show_statusbar.hide();
								}
							}, 5000);
						}
					} else {
						map.show_statusbar_ios.hide();
						map.show_statusbar_android.hide();
					}
					if (get.is.phoneLayout()) {
						map.remember_round_button.show();
						map.popequip.show();
						map.filternode_button.show();
						map.show_pause.hide();
						map.show_auto.hide();
						map.show_replay.hide();
						map.show_round_menu.show();
					} else {
						map.show_pause.show();
						map.show_auto.show();
						map.show_replay.show();
						map.show_round_menu.hide();
						map.remember_round_button.hide();
						map.popequip.hide();
						map.filternode_button.hide();
					}
					/*
					if (lib.config.show_card_prompt) {
						map.hide_card_prompt_basic.show();
						map.hide_card_prompt_equip.show();
					} else {
						map.hide_card_prompt_basic.hide();
						map.hide_card_prompt_equip.hide();
					}*/
					if (lib.config.show_log != "off") {
						map.clear_log.show();
					} else {
						map.clear_log.hide();
					}
					if (get.is.phoneLayout()) {
						map.show_time2.show();
						map.show_time.hide();
						if (lib.config.show_time2) {
							map.watchface.show();
						} else {
							map.watchface.hide();
						}
					} else {
						map.show_time2.hide();
						map.show_time.show();
						map.watchface.hide();
					}
					/*
					if (lib.config.show_deckMonitor) {
						map.show_deckMonitor_online.show();
					} else {
						map.show_deckMonitor_online.hide();
					}*/
					if (lib.config.show_extensionmaker) {
						map.show_extensionshare.show();
					} else {
						map.show_extensionshare.hide();
					}
				},
				show_history: {
					name: "出牌记录栏",
					init: "off",
					intro: "在屏幕左侧或右侧显示出牌记录",
					unfrequent: true,
					item: {
						off: "关闭",
						left: "靠左",
						right: "靠右",
					},
					onclick(bool) {
						if (lib.config.show_history == "right") ui.window.addTempClass("rightbar2");
						game.saveConfig("show_history", bool);
						if (_status.video || !_status.prepareArena) return;
						if (bool == "left") {
							ui.window.classList.add("leftbar");
							ui.window.classList.remove("rightbar");
						} else if (bool == "right") {
							ui.window.classList.remove("leftbar");
							ui.window.classList.add("rightbar");
						} else {
							ui.window.classList.remove("leftbar");
							ui.window.classList.remove("rightbar");
						}
					},
				},
				pop_logv: {
					name: "自动弹出记录",
					init: false,
					unfrequent: true,
				},
				show_log: {
					name: "历史记录栏",
					init: "off",
					intro: "在屏幕中部显示出牌文字记录",
					unfrequent: true,
					item: {
						off: "关闭",
						left: "靠左",
						center: "居中",
						right: "靠右",
					},
					onclick(bool) {
						game.saveConfig("show_log", bool);
						if (lib.config.show_log != "off") {
							ui.arenalog.style.display = "";
							ui.arenalog.dataset.position = bool;
						} else {
							ui.arenalog.style.display = "none";
							ui.arenalog.innerHTML = "";
						}
					},
				},
				clear_log: {
					name: "自动清除历史记录",
					init: false,
					unfrequent: true,
					intro: "开启后将定时清除历史记录栏的条目（而不是等记录栏满后再清除）",
				},
				log_highlight: {
					name: "历史记录高亮",
					init: true,
					unfrequent: true,
					intro: "开启后历史记录不同类别的信息将以不同颜色显示",
				},
				show_time: {
					name: "显示时间",
					intro: "在屏幕顶部显示当前时间",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_time", bool);
						if (bool) {
							ui.time.style.display = "";
						} else {
							ui.time.style.display = "none";
						}
					},
				},
				show_time2: {
					name: "显示时间",
					intro: "在触屏按钮处显示当前时间",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_time2", bool);
						if (bool) {
							ui.roundmenu.classList.add("clock");
						} else {
							ui.roundmenu.classList.remove("clock");
						}
					},
				},
				watchface: {
					name: "表盘样式",
					init: "none",
					unfrequent: true,
					item: {
						none: "默认",
						simple: "简约",
					},
					onclick(item) {
						game.saveConfig("watchface", item);
						ui.roundmenu.dataset.watchface = item;
					},
				},
				show_time3: {
					name: "显示游戏时间",
					init: false,
					unfrequent: true,
				},
				show_statusbar_android: {
					name: "显示状态栏",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_statusbar_android", bool);
						if (window.StatusBar && lib.device == "android") {
							if (bool) {
								window.StatusBar.overlaysWebView(false);
								window.StatusBar.backgroundColorByName("black");
								window.StatusBar.show();
							} else {
								window.StatusBar.hide();
							}
						}
					},
				},
				show_statusbar_ios: {
					name: "显示状态栏",
					init: "off",
					unfrequent: true,
					item: {
						default: "默认",
						overlay: "嵌入",
						auto: "自动",
						off: "关闭",
					},
					onclick(bool) {
						game.saveConfig("show_statusbar_ios", bool);
						if (window.StatusBar && lib.device == "ios") {
							if (bool != "off" && bool != "auto") {
								if (lib.config.show_statusbar_ios == "default") {
									window.StatusBar.overlaysWebView(false);
									document.body.classList.remove("statusbar");
								} else {
									window.StatusBar.overlaysWebView(true);
									document.body.classList.add("statusbar");
								}
								window.StatusBar.backgroundColorByName("black");
								window.StatusBar.show();
							} else {
								document.body.classList.remove("statusbar");
								window.StatusBar.hide();
							}
						}
					},
				},
				show_card_prompt: {
					name: "显示出牌信息",
					intro: "出牌时在使用者上显示卡牌名称",
					init: true,
					unfrequent: true,
				},
				/*
				hide_card_prompt_basic: {
					name: "隐藏基本牌信息",
					intro: "不显示基本牌名称",
					init: false,
					unfrequent: true,
				},
				hide_card_prompt_equip: {
					name: "隐藏装备牌信息",
					intro: "不显示装备牌名称",
					init: false,
					unfrequent: true,
				},*/
				show_phase_prompt: {
					name: "显示阶段信息",
					intro: "在当前回合不同阶段开始时显示阶段名称",
					init: true,
					unfrequent: true,
				},
				show_phaseuse_prompt: {
					name: "行动阶段提示",
					intro: "在你出牌时显示提示文字",
					init: true,
					unfrequent: true,
				},
				auto_popped_config: {
					name: "自动弹出选项",
					intro: "鼠标移至选项按钮时弹出模式选择菜单",
					init: true,
					unfrequent: true,
				},
				auto_popped_history: {
					name: "自动弹出历史",
					intro: "鼠标移至暂停按钮时弹出历史记录菜单",
					init: false,
					unfrequent: true,
				},
				show_round_menu: {
					name: "显示触屏按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						if (get.is.nomenu("show_round_menu", bool)) return false;
						game.saveConfig("show_round_menu", bool);
						if (bool && ui.roundmenu) {
							ui.roundmenu.style.display = "";
						} else {
							ui.roundmenu.style.display = "none";
							alert("关闭触屏按钮后可通过手势打开菜单（默认为下划）");
						}
					},
				},
				remember_round_button: {
					name: "记住按钮位置",
					intro: "重新开始后触屏按钮将保存的上一局的位置",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("remember_round_button", bool);
						if (!bool) {
							ui.click.resetround();
						}
					},
				},
				remember_dialog: {
					name: "记住对话框位置",
					intro: "移动对话框后新的对话框也将在移动后的位置显示",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("remember_dialog", bool);
						if (!bool) {
							if (ui.dialog) {
								var dialog = ui.dialog;
								dialog.style.transform = "";
								dialog._dragtransform = [0, 0];
								dialog.style.transition = "all 0.3s";
								dialog._dragtouches;
								dialog._dragorigin;
								dialog._dragorigintransform;
								setTimeout(function () {
									dialog.style.transition = "";
								}, 500);
							}
							game.saveConfig("dialog_transform", [0, 0]);
						}
					},
				},
				transparent_dialog: {
					name: "堆叠对话框虚化",
					init: false,
					intro: "当具有static属性的对话框堆叠（如五谷丰登对话框中提示无懈可击）时，将后方的对话框变为半透明",
					onclick(bool) {
						game.saveConfig("transparent_dialog", bool);
						if (bool) {
							for (var i = 0; i < ui.dialogs.length; i++) {
								if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
									ui.dialogs[i].unfocus();
								}
							}
						} else {
							for (var i = 0; i < ui.dialogs.length; i++) {
								if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
									ui.dialogs[i].refocus();
								}
							}
						}
					},
				},
				show_rarity: {
					name: "显示角色评级",
					init: false,
					intro: "仅供娱乐，重启后生效",
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_rarity", bool);
					},
				},
				/*
				mark_identity_style: {
					name: "标记身份操作",
					intro: "设置单击身份按钮时的操作",
					unfrequent: true,
					init: "menu",
					item: {
						menu: "菜单",
						click: "单击",
					},
				},*/
				character_dialog_tool: {
					name: "自由选角显示",
					intro: "点击自由选角时默认显示的条目",
					init: "最近",
					item: {
						收藏: "收藏",
						最近: "最近",
						all: "全部",
					},
					unfrequent: true,
				},
				recent_character_number: {
					name: "最近使用角色",
					intro: "自由选角对话框中最近使用角色的数量",
					init: "12",
					item: {
						5: "5",
						6: "6",
						10: "10",
						12: "12",
						20: "20",
						30: "30",
					},
					unfrequent: true,
				},
				showMax_character_number: {
					name: "最大角色数显示",
					intro: "设置自由选角对话框一页显示的最大角色数<br><span class=firetext>注意事项：<br><li>更改此选项后，需要重启游戏以使用新选项配置<br><li>推荐将此选项设置为偏小数值，可降低加载过多角色时导致的性能损耗</span>",
					init: "10",
					item: {
						5: "5",
						6: "6",
						10: "10",
						12: "12",
						20: "20",
						24: "24",
						0: "∞",
					},
					unfrequent: true,
				},
				popequip: {
					name: "触屏装备选择",
					intro: "设置触屏布局中选择装备的方式",
					init: true,
					unfrequent: true,
				},
				filternode_button: {
					name: "触屏筛选按钮",
					intro: "设置自由选角对话框中筛选按钮的样式",
					init: true,
					unfrequent: true,
				},
				show_charactercard: {
					name: "显示角色资料",
					intro: "在角色界面单击时弹出角色资料卡",
					init: true,
					unfrequent: true,
				},
				show_favourite: {
					name: "显示添加收藏",
					intro: "在角色的右键菜单中显示添加收藏",
					init: false,
					unfrequent: true,
				},
				show_favmode: {
					name: "显示模式收藏",
					intro: "快捷菜单中显示收藏模式",
					init: true,
					unfrequent: true,
				},
				show_favourite_menu: {
					name: "显示收藏菜单",
					intro: "在选项-角色中显示收藏一栏",
					init: true,
					unfrequent: true,
				},
				show_ban_menu: {
					name: "显示禁角菜单",
					intro: "在选项-角色中显示禁角一栏",
					init: true,
					unfrequent: true,
				},
				
				right_range: {
					name: "显示角色信息",
					intro: "在角色的右键菜单中显示信息",
					init: true,
					unfrequent: true,
				},
				hide_card_image: {
					name: "隐藏卡牌背景",
					intro: "所有卡牌将使用文字作为背景",
					init: false,
					unfrequent: true,
					restart: true,
				},
				show_name: {
					name: "显示角色名称",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_name", bool);
						if (bool) {
							ui.arena.classList.remove("hide_name");
						} else {
							ui.arena.classList.add("hide_name");
						}
					},
				},
				show_sex: {
					name: "显示角色名字",
					intro: "在角色的右键菜单中显示角色名字",
					init: true,
					unfrequent: true,
				},
				show_group: {
					name: "显示角色势力",
					intro: "在角色的右键菜单中显示角色势力",
					init: true,
					unfrequent: true,
				},
				show_replay: {
					name: "显示重来按钮",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_replay", bool);
						if (lib.config.show_replay) {
							ui.replay.style.display = "";
						} else {
							ui.replay.style.display = "none";
						}
					},
				},
				/*
				show_playerids: {
					name: "显示身份按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_playerids", bool);
						if (lib.config.show_playerids) {
							ui.playerids.style.display = "";
						} else {
							ui.playerids.style.display = "none";
						}
					},
				},*/
				show_sortcard: {
					name: "显示整理手牌按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_sortcard", bool);
						if (lib.config.show_sortcard) {
							ui.sortCard.style.display = "";
						} else {
							ui.sortCard.style.display = "none";
						}
					},
				},
				show_pause: {
					name: "显示暂停按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_pause", bool);
						if (lib.config.show_pause) {
							ui.pause.style.display = "";
						} else {
							ui.pause.style.display = "none";
						}
					},
				},
				show_auto: {
					name: "显示托管按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_auto", bool);
						if (lib.config.show_auto) {
							ui.auto.style.display = "";
						} else {
							ui.auto.style.display = "none";
						}
					},
				},
				show_volumn: {
					name: "显示音量按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_volumn", bool);
						if (lib.config.show_volumn) {
							ui.volumn.style.display = "";
						} else {
							ui.volumn.style.display = "none";
						}
					},
				},
				show_cardpile: {
					name: "显示牌堆按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_cardpile", bool);
						if (bool) {
							ui.cardPileButton.style.display = "";
						} else {
							ui.cardPileButton.style.display = "none";
						}
					},
				},
				show_cardpile_number: {
					name: "显示剩余牌数",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_cardpile_number", bool);
						if (bool) {
							ui.cardPileNumber.style.display = "";
						} else {
							ui.cardPileNumber.style.display = "none";
						}
					},
				},
				show_handcardbutton: {
					name: "显示手牌按钮",
					intro: "在多控情况下右上角显示所有我方角色手牌",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_handcardbutton", bool);
					},
				},
				/*
				show_giveup: {
					name: "显示投降按钮",
					init: true,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_giveup", bool);
					},
				},*/
				show_tip: {
					name: "显示tip标记",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_tip", bool);
						document.documentElement.style.setProperty("--tip-display", bool ? "flex" : "none");
					},
				},
				/*
				show_deckMonitor: {
					name: "显示记牌器",
					init: true,
					unfrequent: true,
					onclick(bool) {
						if (_status.connectMode) {
							if (confirm("当前为联机模式，修改此设置需重启，是否重启？")) {
								game.saveConfig("show_deckMonitor", bool);
								game.reload();
							} else this.classList.toggle("on");
						} else {
							game.saveConfig("show_deckMonitor", bool);
							if (lib.config.show_deckMonitor) {
								ui.deckMonitor.style.display = "";
							} else {
								ui.deckMonitor.style.display = "none";
							}
						}
					},
				},
				show_deckMonitor_online: {
					name: "联机显示记牌器",
					intro: "如果你是房主，此设置对所有人生效",
					init: false,
					unfrequent: true,
					onclick(bool) {
						if (_status.connectMode) {
							if (confirm("当前为联机模式，修改此设置须重启，是否重启？")) {
								game.saveConfig("show_deckMonitor_online", bool);
								game.reload();
							} else this.classList.toggle("on");
						} else {
							game.saveConfig("show_deckMonitor_online", bool);
						}
					},
				},*/
				/*
				show_wuxie: {
					name: "显示无懈按钮",
					intro: "在右上角显示不询问无懈",
					init: false,
					unfrequent: true,
					onclick(bool) {
						game.saveConfig("show_wuxie", bool);
						if (lib.config.show_wuxie) {
							ui.wuxie.style.display = "";
						} else {
							ui.wuxie.style.display = "none";
						}
					},
				},
				wuxie_right: {
					name: "无懈按钮靠左",
					init: true,
					unfrequent: true,
				},*/
				/*
				show_discardpile: {
					name: "暂停时显示弃牌堆",
					init: false,
					unfrequent: true,
				},*/
				show_extensionmaker: {
					name: "显示制作扩展",
					init: true,
					unfrequent: true,
				},
				show_extensionshare: {
					name: "显示分享扩展",
					init: true,
					unfrequent: true,
				},
				show_characternamepinyin: {
					name: "显示角色名注解",
					intro: "在角色资料卡显示角色名及其注解、性别、势力、体力等信息",
					init: "showPinyin",
					unfrequent: true,
					item: {
						doNotShow: "不显示",
						showPinyin: "拼音(样式一)",
						showCodeIdentifier: "代码ID(样式一)",
						showPinyin2: "拼音(样式二)",
						showCodeIdentifier2: "代码ID(样式二)",
					},
					visualMenu: (node, link, name) => {
						node.classList.add("button", "character");
						const style = node.style;
						style.alignItems = "center";
						style.animation = "background-position-left-center-right-center-left-center 15s ease infinite";
						style.background = "linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)";
						style.backgroundSize = "400% 400%";
						style.display = "flex";
						style.height = "60px";
						style.justifyContent = "center";
						style.width = "180px";
						const firstChild = node.firstChild;
						firstChild.removeAttribute("class");
						firstChild.style.position = "initial";
						if (link == "doNotShow") return;
						const ruby = document.createElement("ruby");
						ruby.textContent = name;
						const rt = document.createElement("rt");
						rt.style.fontSize = "smaller";
						if (link == "showPinyin2" || link == "showCodeIdentifier2") {
							rt.textContent = link == "showCodeIdentifier2" ? "[" + link + "]" : "[" + get.pinyin(name) + "]";
							ruby.appendChild(rt);
						} else {
							const leftParenthesisRP = document.createElement("rp");
							leftParenthesisRP.textContent = "（";
							ruby.appendChild(leftParenthesisRP);
							rt.textContent = link == "showCodeIdentifier" ? link : get.pinyin(name).join(" ");
							ruby.appendChild(rt);
							const rightParenthesisRP = document.createElement("rp");
							rightParenthesisRP.textContent = "）";
							ruby.appendChild(rightParenthesisRP);
						}
						firstChild.innerHTML = ruby.outerHTML;
					},
				},
				show_skillnamepinyin: {
					name: "显示技能名注解",
					intro: "在角色资料卡显示技能名注解",
					get init() {
						return lib.configMenu.view.config.show_characternamepinyin.init;
					},
					set init(newVal) {
						lib.configMenu.view.config.show_characternamepinyin.init = newVal;
					},
					get unfrequent() {
						return lib.configMenu.view.config.show_characternamepinyin.unfrequent;
					},
					set unfrequent(newVal) {
						lib.configMenu.view.config.show_characternamepinyin.unfrequent = newVal;
					},
					get item() {
						return lib.configMenu.view.config.show_characternamepinyin.item;
					},
					set item(newVal) {
						lib.configMenu.view.config.show_characternamepinyin.item = newVal;
					},
					get visualMenu() {
						return lib.configMenu.view.config.show_characternamepinyin.visualMenu;
					},
					set visualMenu(newVal) {
						lib.configMenu.view.config.show_characternamepinyin.visualMenu = newVal;
					},
				},
			},
		},
		audio: {
			name: "音效",
			config: {
				update: function (config, map) {
					if (lib.config.background_music == "music_custom" && (lib.device || lib.node)) {
						map.import_music.show();
					} else {
						map.import_music.hide();
					}
					map.clear_background_music[get.is.object(lib.config.customBackgroundMusic) ? "show" : "hide"]();
					ui.background_music_setting = map.background_music;
					map.background_music._link.config.updatex.call(map.background_music, []);
				},
				background_music: {
					updatex: function () {
						this.lastChild.innerHTML = this._link.config.item[lib.config.background_music];
						var menu = this._link.menu;
						for (var i = 0; i < menu.childElementCount; i++) {
							if (!["music_off", "music_custom", "music_random"].concat(lib.config.all.background_music).includes(menu.childNodes[i]._link)) menu.childNodes[i].delete();
						}
					},
					name: "背景音乐",
					init: true,
					item: {
						music_default: "默认",
					},
					onclick(item) {
						game.saveConfig("background_music", item);
						game.playBackgroundMusic();
					},
				},
				import_music: {
					name: '<div style="white-space:nowrap;width:calc(100% - 5px)">' + '<input type="file" style="width:calc(100% - 40px)" accept="audio/*">' + '<button style="width:40px">确定</button></div>',
					clear: true,
				},
				background_audio: {
					name: "游戏音效",
					init: true,
				},
				background_speak: {
					name: "人物配音",
					init: true,
				},
				/*
				equip_audio: {
					name: "装备配音",
					init: false,
				},*/
				repeat_audio: {
					name: "播放重复语音",
					init: false,
				},
				volumn_audio: {
					name: "音效音量",
					init: 1,
					item: {
						0: "〇",
						1: "一",
						2: "二",
						3: "三",
						4: "四",
						5: "五",
						6: "六",
						7: "七",
						8: "八",
					},
					onclick(volume) {
						game.saveConfig("volumn_audio", parseInt(volume));
					},
				},
				volumn_background: {
					name: "背景音乐",
					init: 1,
					item: {
						0: "〇",
						1: "一",
						2: "二",
						3: "三",
						4: "四",
						5: "五",
						6: "六",
						7: "七",
						8: "八",
					},
					onclick(volume) {
						game.saveConfig("volumn_background", parseInt(volume));
						ui.backgroundMusic.volume = volume / 8;
					},
				},
				clear_background_music: {
					name: "清除自定义背景音乐",
					clear: true,
					onclick() {
						if (confirm("是否清除已导入的所有自定义背景音乐？（该操作不可撤销！）")) {
							for (var i in lib.config.customBackgroundMusic) {
								lib.config.all.background_music.remove(i);
								if (i.startsWith("cdv_")) {
									game.removeFile("audio/background/" + i + ".mp3");
								} else {
									game.deleteDB("audio", i);
								}
							}
							lib.config.customBackgroundMusic = null;
							game.saveConfig("customBackgroundMusic", null);
							game.saveConfig("background_music", "music_off");
							if (!_status._aozhan) game.playBackgroundMusic();
						}
					},
				},
			},
		},
		skill: {
			name: "技能",
			config: {
				update: function (config, map) {
					for (var i in map) {
						if (map[i]._link.config.type == "autoskill") {
							if (!lib.config.autoskilllist.includes(i)) {
								map[i].classList.add("on");
							} else {
								map[i].classList.remove("on");
							}
						} else if (map[i]._link.config.type == "banskill") {
							if (!lib.config.forbidlist.includes(i)) {
								map[i].classList.add("on");
							} else {
								map[i].classList.remove("on");
							}
						}
					}
				},
			},
		},
		others: {
			name: "其它",
			config: {
				// reset_database:{
				// 	name:'重置游戏',
				// 	onclick(){
				// 		var node=this;
				// 		if(node._clearing){
				// 			if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
				// 			game.reload();
				// 			return;
				// 		}
				// 		node._clearing=true;
				// 		node.innerHTML='单击以确认 (3)';
				// 		setTimeout(function(){
				// 			node.innerHTML='单击以确认 (2)';
				// 			setTimeout(function(){
				// 				node.innerHTML='单击以确认 (1)';
				// 				setTimeout(function(){
				// 					node.innerHTML='重置游戏录像';
				// 					delete node._clearing;
				// 				},1000);
				// 			},1000);
				// 		},1000);
				// 	},
				// 	clear:true
				// },
				reset_game: {
					name: "重置游戏设置",
					onclick() {
						var node = this;
						if (node._clearing) {
							var noname_inited = localStorage.getItem("noname_inited");
							var onlineKey = localStorage.getItem(lib.configprefix + "key");
							localStorage.clear();
							if (noname_inited) {
								localStorage.setItem("noname_inited", noname_inited);
							}
							if (onlineKey) {
								localStorage.setItem(lib.configprefix + "key", onlineKey);
							}
							game.deleteDB("config");
							game.deleteDB("data");
							game.reload();
							return;
						}
						node._clearing = true;
						node.firstChild.innerHTML = "单击以确认 (3)";
						setTimeout(function () {
							node.firstChild.innerHTML = "单击以确认 (2)";
							setTimeout(function () {
								node.firstChild.innerHTML = "单击以确认 (1)";
								setTimeout(function () {
									node.firstChild.innerHTML = "重置游戏设置";
									delete node._clearing;
								}, 1000);
							}, 1000);
						}, 1000);
					},
					clear: true,
				},
				reset_hiddenpack: {
					name: "重置隐藏内容",
					onclick() {
						if (this.firstChild.innerHTML != "已重置") {
							this.firstChild.innerHTML = "已重置";
							game.saveConfig("hiddenModePack", []);
							game.saveConfig("hiddenCharacterPack", []);
							game.saveConfig("hiddenCardPack", []);
							game.saveConfig("hiddenPlayPack", []);
							game.saveConfig("hiddenBackgroundPack", []);
							var that = this;
							setTimeout(function () {
								that.firstChild.innerHTML = "重置隐藏内容";
								setTimeout(function () {
									if (confirm("是否重新启动使改变生效？")) {
										game.reload();
									}
								});
							}, 500);
						}
					},
					clear: true,
				},
				reset_tutorial: {
					name: "重置新手向导",
					onclick() {
						if (this.firstChild.innerHTML != "已重置") {
							this.firstChild.innerHTML = "已重置";
							game.saveConfig("new_tutorial", false);
							game.saveConfig("prompt_hidebg");
							game.saveConfig("prompt_hidepack");
							var that = this;
							setTimeout(function () {
								that.firstChild.innerHTML = "重置新手向导";
							}, 500);
						}
					},
					clear: true,
				},
				import_data: {
					name: "导入游戏设置",
					onclick() {
						ui.import_data_button.classList.toggle("hidden");
					},
					clear: true,
				},
				import_data_button: {
					name: '<div style="white-space:nowrap;width:calc(100% - 10px)">' + '<input type="file" accept="*/*" style="width:calc(100% - 40px)">' + '<button style="width:40px">确定</button></div>',
					clear: true,
				},
				export_data: {
					name: "导出游戏设置",
					onclick() {
						var data;
						var export_data = function (data) {
							game.export(lib.init.encode(JSON.stringify(data)), "无名杀 - 数据 - " + new Date().toLocaleString());
						};
						if (!lib.db) {
							data = {};
							for (var i in localStorage) {
								if (i.startsWith(lib.configprefix)) {
									data[i] = localStorage[i];
								}
							}
							export_data(data);
						} else {
							game.getDB("config", null, function (data1) {
								game.getDB("data", null, function (data2) {
									export_data({
										config: data1,
										data: data2,
									});
								});
							});
						}
					},
					clear: true,
				},
				redownload_game: {
					name: "重新下载游戏",
					onclick() {
						var node = this;
						if (node._clearing) {
							localStorage.removeItem("noname_inited");
							game.reload();
							return;
						}
						node._clearing = true;
						node.firstChild.innerHTML = "单击以确认 (3)";
						setTimeout(function () {
							node.firstChild.innerHTML = "单击以确认 (2)";
							setTimeout(function () {
								node.firstChild.innerHTML = "单击以确认 (1)";
								setTimeout(function () {
									node.firstChild.innerHTML = "重新下载游戏";
									delete node._clearing;
								}, 1000);
							}, 1000);
						}, 1000);
					},
					clear: true,
				},
				update: function (config, map) {
					if (lib.device || lib.node) {
						map.redownload_game.show();
					} else {
						map.redownload_game.hide();
					}
				},
				// trim_game:{
				// 	name:'隐藏非官方扩展包',
				// 	onclick(){
				// 		if(this.innerHTML!='已隐藏'){
				// 			this.innerHTML='已隐藏';
				//      						 var pack=lib.config.all.cards.slice(0);
				//      						 if(Array.isArray(lib.config.hiddenCardPack)){
				//      									  for(var i=0;i<lib.config.hiddenCardPack.length;i++){
				//      															pack.add(lib.config.hiddenCardPack[i]);
				//      									  }
				//      						 }
				//      						 for(var i=0;i<pack.length;i++){
				//      									  if(lib.config.all.sgscards.includes(pack[i])){
				//      															pack.splice(i--,1);
				//      									  }
				//      						 }
				// 			game.saveConfig('hiddenCardPack',pack);
				//
				//      						 var pack=lib.config.all.characters.slice(0);
				//      						 if(Array.isArray(lib.config.hiddenCharacterPack)){
				//      									  for(var i=0;i<lib.config.hiddenCharacterPack.length;i++){
				//      															pack.add(lib.config.hiddenCharacterPack[i]);
				//      									  }
				//      						 }
				//      						 for(var i=0;i<pack.length;i++){
				//      									  if(lib.config.all.sgscharacters.includes(pack[i])){
				//      															pack.splice(i--,1);
				//      									  }
				//      						 }
				// 			game.saveConfig('hiddenCharacterPack',pack);
				//
				//      						 var pack=lib.config.all.mode.slice(0);
				//      						 if(Array.isArray(lib.config.hiddenModePack)){
				//      									  for(var i=0;i<lib.config.hiddenModePack.length;i++){
				//      															pack.add(lib.config.hiddenModePack[i]);
				//      									  }
				//      						 }
				//      						 for(var i=0;i<pack.length;i++){
				//      									  if(lib.config.all.sgsmodes.includes(pack[i])){
				//      															pack.splice(i--,1);
				//      									  }
				//      						 }
				// 			game.saveConfig('hiddenModePack',pack);
				//
				// 			var that=this;
				// 			setTimeout(function(){
				// 				that.innerHTML='隐藏非官方扩展包';
				// 			},500);
				// 		}
				// 	},
				// 	clear:true
				// }
			},
		},
	};
	extensionMenu = {

	};
	mode = {
		xingBei:{
			name:'星杯传说',
			connect:{
				update:function(config,map){		
					if(config.connect_phaseswap){
						map.connect_viewHandcard.hide();
					}else{
						map.connect_viewHandcard.show();
					}
					if(config.connect_versus_mode=='4v4'){
						map.connect_team_sequence.hide();
						map.connect_choose_mode.hide();
						map.connect_choose_number.show();
						map.connect_BPchoose_number.hide();
					}else{
						if(config.connect_choose_mode=='CM02' || config.connect_choose_mode=='CM01'){
							map.connect_team_sequence.hide();
						}else{
							map.connect_team_sequence.show();
						}
						if(config.connect_choose_mode=='BP01' || config.connect_choose_mode=='BP02'){
							map.connect_BPchoose_number.show();
						}else{
							map.connect_BPchoose_number.hide();
						}
						if(config.connect_choose_mode=='多选1'){
							map.connect_choose_number.show();
						}else{
							map.connect_choose_number.hide();
						}
						map.connect_choose_mode.show();
					}
				},
				/*
				connect_remark:{
					name:'房间备注',
					input:true,
					frequent:true,
				},*/
				connect_versus_mode:{
					name:'游戏模式',
					init:'2v2',
					item:{
						//'1v1':'1v1',
						'2v2':'2v2',
						'3v3':'3v3',
						'4v4':'4v4',
						//'guandu':'官渡',
					},
					frequent:true
				},
				connect_choose_mode:{
					name:"选角模式",
					init:"多选1",
					item:{
						'多选1':'多选1',
						'CM01':"CM01",
						'CM02':"CM02",
						'BP01':"BP01",
						'BP02':"BP02",
						'jiuGuan':'酒馆',
					},
					frequent:true,
				},
				connect_team_sequence:{
					name:"队伍顺序",
					init:"random",
					item:{
						'random':'随机',
						'crossed':'交叉',
						'near':'临近',
						'CM':"CM",
					},
					frequent:true,
				},
				connect_choose_number:{
					name:'候选角色数',
					init:3,
					item:{
						1:'1',
						2:'2',
						3:'3',
						4:'4',
						5:'5',
						6:'6',
						7:'7',
						8:'8',
						9:'9',
						10:'10',
					},
					frequent:true,
				},
				connect_BPchoose_number:{
					name:'可选角色数',
					init:16,
					item:{
						12:'12',
						16:'16',
						20:'20',
						24:'24',
						30:'30',
					},
					frequent:true,
				},
				connect_viewHandcard:{
					name:'可见队友手牌',
					init:false,
					onclick:function(bool){
						game.saveConfig('connect_viewHandcard',bool,this._link.config.mode);
					},
					frequent:true,
				},
				connect_chooseSide:{
					name:'手动选择队伍',
					init:false,
					onclick:function(bool){
						game.saveConfig('connect_chooseSide',bool,this._link.config.mode);
					},
					frequent:true,
				},
				connect_phaseswap:{
					name:'多控',
					init:false,
					onclick:function(bool){
						game.saveConfig('connect_phaseswap',bool,this._link.config.mode);
					},
					frequent:true,
				},
				connect_shiQiMax:{
					name:'士气最大值',
					init:15,
					item:{
						10:'10',
						15:'15',
						18:'18',
						30:'30',
						45:'45',
					},
				},
				connect_zhanJiMax:{
					name:'战绩最大值',
					init:5,
					item:{
						5:'5',
						7:'7',
						10:'10',
					},
				},
				connect_xingBeiMax:{
					name:'星杯最大值',
					init:5,
					item:{
						3:'3',
						5:'5',
						7:'7',
						10:'10',
						15:'15',
					}
				},
				connect_AItiLian:{
					name:'降低AI提炼数量',
					init:true,
					onclick:function(bool){
						game.saveConfig('connect_AItiLian',bool,this._link.config.mode);
					},
				},
				connect_onlyChooseCharacter:{
					name:'仅选择角色',
					init:false,
					intro:'选择角色后不会开始游戏，适合推新时使用，方便新人通过手机了解其他玩家角色，房主不要关游戏',
					onclick:function(bool){
						game.saveConfig('connect_onlyChooseCharacter',bool,this._link.config.mode);
					},
					frequent:true,
				}
			},
			config:{
				update:function(config,map){
					if(config.choose_mode=='多选1'){
						map.choose_number.show();
					}else{
						map.choose_number.hide();
					}
					if(config.versus_mode=='four'){
						map.team_sequence.hide();
					}else{
						map.team_sequence.show();
					}
					if(config.phaseswap==true){
						map.change_identity.hide();
						map.viewHandcard.hide();
					}else{
						map.change_identity.show();
						map.viewHandcard.show();
					}
				},
				versus_mode:{
					name:'游戏模式',
					init:'two',
					item:{
						three:'3v3',
						two:'2v2',
						four:'4v4',
					},
					restart:true,
					frequent:true,
				},
				choose_mode:{
					name:"选角模式",
					init:"多选1",
					item:{
						'多选1':'多选1',
						//'CM02':"CM02",
					},
					frequent:true,
				},
				team_sequence:{
					name:"队伍顺序",
					init:"random",
					item:{
						random:'随机',
						crossed:'交叉',
						near:'临近',
						CM:"CM",
					},
					frequent:true,
				},
				choose_number:{
					name:'候选角色数',
					init:3,
					item:{
						1:'1',
						2:'2',
						3:'3',
						5:'5',
						7:'7',
						10:'10',
					},
					frequent:true,
				},
				viewHandcard:{
					name:'可见队友手牌',
					init:false,
					onclick:function(bool){
						game.saveConfig('viewHandcard',bool,this._link.config.mode);
					},
					frequent:true,
				},
				phaseswap:{
					name:'多控',
					init:false,
					onclick:function(bool){
						game.saveConfig('phaseswap',bool,this._link.config.mode);
						if(!ui.create.cheat2) return;
						if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
						if(!ui.cheat2&&get.config('phaseswap')) ui.create.cheat2();
						else if(ui.cheat2&&!get.config('phaseswap')){
							ui.cheat2.close();
							delete ui.cheat2;
						}
					},
					frequent:true,
				},

				free_choose:{
					name:'自由选角',
					init:true,
					onclick:function(bool){
						game.saveConfig('free_choose',bool,this._link.config.mode);
						if(!ui.create.cheat2) return;
						if(get.mode()!=this._link.config.mode||!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
						if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
						else if(ui.cheat2&&!get.config('free_choose')){
							ui.cheat2.close();
							delete ui.cheat2;
						}
					}
				},
				change_identity:{
					name:'自由选择座位',
					init:true,
					onclick:function(bool){
						game.saveConfig('change_identity',bool,this._link.config.mode);
						if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;

						var dialog;
						if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
						else dialog=_status.event.dialog;
						if(!_status.brawl||!_status.brawl.noAddSetting){
							if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
						}
						ui.update();
					}
				},
				change_choice:{
					name:'开启换角卡',
					init:true,
					onclick:function(bool){
						game.saveConfig('change_choice',bool,this._link.config.mode);
						if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
						if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
						else if(ui.cheat&&!get.config('change_choice')){
							ui.cheat.close();
							delete ui.cheat;
						}
					},
				},
				shiQiMax:{
					name:'士气最大值',
					init:15,
					item:{
						10:'10',
						15:'15',
						18:'18',
						30:'30',
						45:'45',
					},
				},
				zhanJiMax:{
					name:'战绩最大值',
					init:5,
					item:{
						5:'5',
						7:'7',
						10:'10',
					},
				},
				xingBeiMax:{
					name:'星杯最大值',
					init:5,
					item:{
						3:'3',
						5:'5',
						7:'7',
						10:'10',
						15:'15',
					}
				},
				AItiLian:{
					name:'降低AI提炼数量',
					init:true,
					onclick:function(bool){
						game.saveConfig('AItiLian',bool,this._link.config.mode);
					},
				},
			}
		},
		connect: {
			name: "联机",
			config: {
				connect_nickname: {
					name: "联机昵称",
					input: true,
					frequent: true,
					onclick(item) {
						game.saveConfig("connect_nickname", item);
						game.saveConfig("connect_avatar", item, "connect");
					},
				},
				connect_avatar: {
					name: "联机头像",
					init: "fengZhiJianSheng",
					item: {},
					frequent: true,
					onclick(item) {
						game.saveConfig("connect_avatar", item);
						game.saveConfig("connect_avatar", item, "connect");
					},
				},
				hall_ip: {
					name: "联机大厅",
					input: true,
					frequent: true,
				},
				hall_button: {
					name: "联机大厅按钮",
					init: true,
					frequent: true,
					onclick(bool) {
						game.saveConfig("hall_button", bool, "connect");
						if (ui.hall_button) {
							if (bool) {
								ui.hall_button.style.display = "";
							} else {
								ui.hall_button.style.display = "none";
							}
						}
					},
				},
				wss_mode: {
					name: "使用WSS协议",
					init: true,
					frequent: true,
					intro: "在用户填写的IP地址没有直接指定使用WS/WSS协议的情况下，默认使用WSS协议，而非WS协议来连接到联机服务器。<br>请不要轻易勾选此项！",
				},
				read_clipboard: {
					name: "读取邀请链接",
					init: false,
					frequent: true,
					intro: "读取剪贴板以解析邀请链接自动加入联机房间",
				},
				check_versionLocal: {
					name: "禁止不同版本玩家进房",
					init: false,
					intro: "禁止与自己版本不同的玩家进入房间",
				},
				check_extension: {
					name: "禁止扩展玩家进房",
					init: false,
					intro: "禁止开启了扩展的的玩家进入房间",
				},
				reset_banBlacklist: {
					name: "重置黑名单",
					onclick() {
						if (this.firstChild.innerHTML != "已重置") {
							this.firstChild.innerHTML = "已重置";
							var banBlacklist = [];
							game.saveConfig("banBlacklist", banBlacklist);
							var that = this;
							setTimeout(function () {
								that.firstChild.innerHTML = "重置黑名单";
							}, 1000);
						}
					},
					clear: true,
				},
			},
		},
		boss: {
			name: "挑战",
			config: {
				free_choose: {
					name: "自由选将",
					init: true,
					frequent: true,
					onclick(bool) {
						game.saveConfig("free_choose", bool, this._link.config.mode);
						if (get.mode() != this._link.config.mode || (!_status.event.getParent().showConfig && !_status.event.showConfig)) return;
						if (!ui.cheat2 && get.config("free_choose")) ui.create.cheat2();
						else if (ui.cheat2 && !get.config("free_choose")) {
							ui.cheat2.close();
							delete ui.cheat2;
						}
					},
				},
				change_choice: {
					name: "开启换将卡",
					init: true,
					onclick(bool) {
						game.saveConfig("change_choice", bool, this._link.config.mode);
						if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
						if (!ui.cheat && get.config("change_choice")) ui.create.cheat();
						else if (ui.cheat && !get.config("change_choice")) {
							ui.cheat.close();
							delete ui.cheat;
						}
					},
					frequent: true,
				},
				single_control: {
					name: "单人控制",
					init: true,
					frequent: true,
					onclick(bool) {
						game.saveConfig("single_control", bool, this._link.config.mode);
						if (ui.single_swap && game.me != game.boss) {
							if (bool) {
								ui.single_swap.style.display = "none";
							} else {
								ui.single_swap.style.display = "";
							}
						}
					},
					intro: "只控制一名角色，其他角色由AI控制",
				},
			},
		},
		offlineChoose: {
			name: "线下选角",
			config: {
				update:function(config,map){
					if(config.choose_mode=='CM02' || config.choose_mode=='CM01'){
						map.team_sequence.hide();
					}else{
						map.team_sequence.show();
					}
					if(config.choose_mode=='BP01' || config.choose_mode=='BP02'){
						map.BPchoose_number.show();
					}else{
						map.BPchoose_number.hide();
					}
				},
				versus_mode: {
					name: "游戏模式",
					init: "three",
					item: {
						"two": "2v2",
						"three": "3v3",
						//"four": "4v4",
					},
					frequent: true,
					restart: true,
				},
				choose_mode: {
					name: "选角模式",
					init: "CM02",
					item: {
						'CM01': "CM01",
						"CM02": "CM02",
						"BP01": "BP01",
						"BP02": "BP02",
					},
					frequent: true,
					restart: true,
				},
				team_sequence:{
					name:"队伍顺序",
					init:"random",
					item:{
						random:'随机',
						crossed:'交叉',
						near:'临近',
						CM:"CM",
					},
					frequent:true,
					restart:true,
				},
				BPchoose_number:{
					name:'可选角色数',
					init:16,
					item:{
						12:'12',
						16:'16',
						20:'20',
						24:'24',
						30:'30',
					},
					frequent:true,
				},
			}
		},
		illustration:{
			name:'图鉴',
			config:{
				viewAll:{
					name:'查看所有角色',
					init:true,
					onclick(bool){
						game.saveConfig('viewAll',bool,this._link.config.mode);
					},
					intro:'关闭后仅能查看已启用的角色包',
					frequent:true,
				},
			}
		},
		tutorial:{
			name:'新手向导',
			config:{
				information:{
					name:'相关信息在其他(右上角)->帮助-><br>关于游戏中查看',
					frequent:true,
				}
			}
		},
	};
	status = {
		running: false,
		canvas: false,
		time: 0,
		reload: 0,
		delayed: 0,
		frameId: 0,
		videoId: 0,
		globalId: 0,
	};
	help = {
		关于游戏: `<div style="margin:10px">关于无名星杯</div><ul style="margin-top:0">
        <li>无名星杯官方发布地址仅有GitHub仓库！
        <br><a href="https://github.com/RancherJie/noname_xingbei" target="_blank">点击前往Github仓库</a>
        <br><li>无名星杯基于GPLv3开源协议。
        <br><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">点击查看GPLv3协议</a>
        <br><li>无名星杯交流QQ群966951007
        <br><li>视频教学BV1Mo4y1q717
        <br><a href="https://www.bilibili.com/video/BV1Mo4y1q717/" target="_blank">点击前往B站教学视频</a>
        <br><li>说明书
        <br><a href="https://docs.qq.com/doc/DVEpvRXJzcWZPaVZP" target="_blank">点击查看说明书</a>`,
		游戏操作: "<ul><li>长按/鼠标悬停/右键单击显示信息。<li>触屏模式中，双指点击切换暂停；下划显示菜单，上划切换托管。<li>键盘快捷键<br>" + "<table><tr><td>A<td>切换托管<tr><td>W<td>切换不询问无懈<tr><td>空格<td>暂停</table><li>编辑牌堆<br>在卡牌包中修改牌堆后，将自动创建一个临时牌堆，在所有模式中共用，当保存当前牌堆后，临时牌堆被清除。每个模式可设置不同的已保存牌堆，设置的牌堆优先级大于临时牌堆。</ul>",
		赞助:`<div style="margin:10px">赞助</div><ul style="margin-top:0"><li><a href="https://github.com/RancherJie/noname_xingbei target="_blank">爱发电</a>`
	};
	/**
	 * @type {import('path')}
	 */
	// @ts-ignore
	path = {};
	getErrorTip(msg) {
		if (typeof msg != "string") {
			try {
				msg = msg.toString();
				if (typeof msg != "string") throw "err";
			} catch (_) {
				throw "传参错误:" + msg;
			}
		}
		if (msg.startsWith("Uncaught ")) msg = msg.slice(9);
		let newMessage = msg;
		if (/RangeError/.test(newMessage)) {
			if (newMessage.includes("Maximum call stack size exceeded")) {
				newMessage = "堆栈溢出";
			} else if (/argument must be between 0 and 20/.test(newMessage)) {
				let funName = newMessage.slice(newMessage.indexOf("RangeError: ") + 12, newMessage.indexOf(")") + 1);
				newMessage = funName + "参数必须在0和20之间";
			} else {
				newMessage = "传递错误值到数值计算方法";
			}
		} else if (/ReferenceError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes("is not defined")) {
				messageName = newMessage.replace("ReferenceError: ", "").replace(" is not defined", "");
				newMessage = "引用了一个未定义的变量：" + messageName;
			} else if (newMessage.includes("invalid assignment left-hand side")) {
				newMessage = "赋值运算符或比较运算符不匹配";
			} else if (newMessage.includes("Octal literals are not allowed in strict mode")) {
				newMessage = "八进制字面量与八进制转义序列语法已经被废弃";
			} else if (newMessage.includes("Illegal 'use strict' directive in function with non-simple parameter list")) {
				newMessage = "'use strict'指令不能使用在带有‘非简单参数’列表的函数";
			} else if (newMessage.includes("Invalid left-hand side in assignment")) {
				newMessage = "赋值中的左侧无效，即number，string等不可赋值的非变量数据";
			}
		} else if (/SyntaxError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes("Unexpected token ")) {
				messageName = newMessage.replace("SyntaxError: Unexpected token ", "");
				newMessage = "使用了未定义或错误的语法 : (" + messageName + ")";
			} else if (newMessage.includes("Block-scoped declarations (let, const, function, class) not yet supported outside strict mode")) {
				newMessage = "请在严格模式下运行let，const，class";
			} else if (newMessage.includes("for-of loop variable declaration may not have an initializer.")) {
				newMessage = "for...of 循环的头部包含有初始化表达式";
			} else if (newMessage.includes("for-in loop variable declaration may not have an initializer.")) {
				newMessage = "for...in 循环的头部包含有初始化表达式";
			} else if (newMessage.includes("Delete of an unqualified identifier in strict mode.")) {
				newMessage = "普通变量不能通过 delete 操作符来删除";
			} else if (newMessage.includes("Unexpected identifier")) {
				newMessage = "不合法的标识符或错误的语法";
			} else if (newMessage.includes("Invalid or unexpected token")) {
				newMessage = "非法的或者不期望出现的标记符号出现在不该出现的位置";
			} else if (newMessage.includes("Invalid regular expression flags")) {
				newMessage = "无效的正则表达式的标记";
			} else if (newMessage.includes("missing ) after argument list")) {
				newMessage = "参数列表后面缺少 ')' (丢失运算符或者转义字符等)";
			} else if (newMessage.includes("Invalid shorthand property initializer")) {
				newMessage = "在定义一个{}对象时，应该使用':'而不是'='";
			} else if (newMessage.includes("Missing initializer in const declaration")) {
				newMessage = "在使用const定义一个对象时，必须指定初始值";
			} else if (newMessage.includes("Unexpected number") || newMessage.includes("Unexpected string")) {
				newMessage = "在定义函数时，函数参数必须为合法标记符";
			} else if (newMessage.includes("Unexpected end of input")) {
				newMessage = "遗漏了符号或符号顺序不对(小括号，花括号等)";
			} else if (newMessage.includes("has already been declared")) {
				messageName = newMessage.replace("SyntaxError: Identifier ", "").replace(" has already been declared", "");
				newMessage = messageName + "变量已经被声明过，不能被重新声明";
			} else if (newMessage.includes("Duplicate parameter name not allowed in this context")) {
				newMessage = "参数名不允许重复";
			} else if (newMessage.includes("Unexpected reserved word") || newMessage.includes("Unexpected strict mode reserved word")) {
				newMessage = "保留字被用作标记符";
			}
		} else if (/TypeError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes(" is not a function")) {
				messageName = newMessage.replace("TypeError: ", "").replace(" is not a function", "");
				newMessage = messageName + "不是一个函数";
			} else if (newMessage.includes(" is not a constructor")) {
				messageName = newMessage.replace("TypeError: ", "").replace(" is not a constructor", "");
				newMessage = messageName + "不是一个构造函数";
			} else if (newMessage.includes("Cannot read property")) {
				messageName = newMessage.replace("TypeError: Cannot read property ", "").replace(" of null", "").replace(" of undefined", "");
				let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4);
				newMessage = "无法读取'" + ofName + "'的属性值" + messageName;
			} else if (newMessage.includes("Cannot read properties")) {
				messageName = newMessage.slice(newMessage.indexOf("reading '") + 9, -2);
				let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4, newMessage.indexOf("(") - 1);
				newMessage = "无法读取'" + ofName + "'的属性值" + messageName;
			} else if (newMessage.includes("Property description must be an object")) {
				messageName = newMessage.replace("TypeError: Property description must be an object: ", "");
				newMessage = messageName + "是非对象类型的值";
			} else if (newMessage.includes("Cannot assign to read only property ")) {
				messageName = newMessage.slice(47, newMessage.lastIndexOf(" of ") + 1);
				newMessage = messageName + "属性禁止写入";
			} else if (newMessage.includes("Object prototype may only be an Object or null")) {
				newMessage = messageName + "对象原型只能是对象或null";
			} else if (newMessage.includes("Cannot create property")) {
				messageName = newMessage.slice(newMessage.indexOf("'") + 1);
				messageName = messageName.slice(0, messageName.indexOf("'"));
				let obj = newMessage.slice(newMessage.indexOf(messageName) + 16);
				newMessage = obj + "不能添加或修改'" + messageName + "'属性，任何 Primitive 值都不允许有property";
			} else if (newMessage.includes("Can't add property") && newMessage.includes("is not extensible")) {
				newMessage = "对象不可添加属性（不可扩展）";
			} else if (newMessage.includes("Cannot redefine property")) {
				messageName = newMessage.slice(37);
				newMessage = messageName + "不可配置";
			} else if (newMessage.includes("Converting circular structure to JSON")) {
				messageName = newMessage.slice(37);
				newMessage = "JSON.stringify() 方法处理循环引用结构的JSON会失败";
			} else if (newMessage.includes("Cannot use 'in' operator to search for ")) {
				newMessage = "in不能用来在字符串、数字或者其他基本类型的数据中进行检索";
			} else if (newMessage.includes("Right-hand side of 'instanceof' is not an object")) {
				newMessage = "instanceof 操作符 希望右边的操作数为一个构造对象，即一个有 prototype 属性且可以调用的对象";
			} else if (newMessage.includes("Assignment to constant variable")) {
				newMessage = "const定义的变量不可修改";
			} else if (newMessage.includes("Cannot delete property")) {
				newMessage = "不可配置的属性不能删除";
			} else if (newMessage.includes("which has only a getter")) {
				newMessage = "仅设置了getter特性的属性不可被赋值";
			} else if (newMessage.includes("called on incompatible receiver undefined")) {
				newMessage = "this提供的绑定对象与预期的不匹配";
			}
		} else if (/URIError/.test(newMessage)) {
			newMessage = "一个不合法的URI";
		} else if (/EvalError/.test(newMessage)) {
			newMessage = "非法调用 eval()";
		} else if (/InternalError/.test(newMessage)) {
			if (newMessage.includes("too many switch cases")) {
				newMessage = "过多case子句";
			} else if (newMessage.includes("too many parentheses in regular expression")) {
				newMessage = "正则表达式中括号过多";
			} else if (newMessage.includes("array initializer too large")) {
				newMessage = "超出数组大小的限制";
			} else if (newMessage.includes("too much recursion")) {
				newMessage = "递归过深";
			}
		}
		if (newMessage != msg) {
			return newMessage;
		}
	}
	codeMirrorReady(node, editor) {
		ui.window.appendChild(node);
		node.style.fontSize = 20 / game.documentZoom + "px";
		const mirror = window.CodeMirror(editor, {
			value: node.code,
			mode: "javascript",
			lineWrapping: !lib.config.touchscreen && lib.config.mousewheel,
			lineNumbers: true,
			indentUnit: 4,
			autoCloseBrackets: true,
			fixedGutter: false,
			hintOptions: { completeSingle: false },
			theme: lib.config.codeMirror_theme || "mdn-like",
			extraKeys: {
				"Ctrl-Z": "undo", //撤销
				"Ctrl-Y": "redo", //恢复撤销
				//"Ctrl-A":"selectAll",//全选
			},
		});
		lib.setScroll(editor.querySelector(".CodeMirror-scroll"));
		node.aced = true;
		node.editor = mirror;
		setTimeout(() => mirror.refresh(), 0);
		node.editor.on("change", (e, change) => {
			let code;
			if (node.editor) {
				code = node.editor.getValue();
			} else if (node.textarea) {
				code = node.textarea.value;
			}
			//动态绑定文本
			if (code.length && change.origin == "+input" && /{|}|\s|=|;|:|,|，|。|？|！|!|\?|&|#|%|@|‘|’|；/.test(change.text[0]) == false && change.text.length == 1) {
				//输入了代码，并且不包括空格，{}，=， ; ， : ， 逗号等，才可以自动提示
				node.editor.showHint();
			}
		});
		//防止每次输出字符都创建以下元素
		const event = _status.event;
		const trigger = _status.event;
		const player = ui.create.player().init("sunce");
		const target = player;
		const targets = [player];
		const source = player;
		const card = game.createCard();
		const cards = [card];
		const result = { bool: true };
		function forEach(arr, f) {
			Array.from(arr).forEach(v => f(v));
		}
		function forAllProps(obj, callback) {
			if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
				for (let name in obj) callback(name);
			} else {
				for (let o = obj; o; o = Object.getPrototypeOf(o)) Object.getOwnPropertyNames(o).forEach(callback);
			}
		}
		function scriptHint(editor, keywords, getToken, options) {
			//Find the token at the cursor
			let cur = editor.getCursor(),
				token = editor.getTokenAt(cur);
			if (/\b(?:string|comment)\b/.test(token.type)) return;
			const innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
			if (innerMode.mode.helperType === "json") return;
			token.state = innerMode.state;
			//If it's not a 'word-style' token, ignore the token.
			if (!/^[\w$_]*$/.test(token.string)) {
				token = {
					start: cur.ch,
					end: cur.ch,
					string: "",
					state: token.state,
					type: token.string == "." ? "property" : null,
				};
			} else if (token.end > cur.ch) {
				token.end = cur.ch;
				token.string = token.string.slice(0, cur.ch - token.start);
			}
			let tprop = token,
				context;
			//If it is a property, find out what it is a property of.
			while (tprop.type == "property") {
				tprop = editor.getTokenAt(CodeMirror.Pos(cur.line, tprop.start));
				if (tprop.string != ".") return;
				tprop = editor.getTokenAt(CodeMirror.Pos(cur.line, tprop.start));
				if (!context) context = [];
				context.push(tprop);
			}
			const list = [];
			let obj;
			if (Array.isArray(context)) {
				try {
					const code = context.length == 1 ? context[0].string : context.reduceRight((pre, cur) => (pre.string || pre) + "." + cur.string);
					obj = security.exec(`return ${code};`, {
						event,
						trigger,
						player,
						card,
						cards,
						result,
						source,
						target,
						targets,
					});
					if (![null, undefined].includes(obj)) {
						const keys = Object.getOwnPropertyNames(obj)
							.concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)))
							.filter(key => key.startsWith(token.string));
						list.addArray(keys);
					}
				} catch (_) {
					return;
				}
			} else if (token && typeof token.string == "string") {
				//非开发者模式下，提示这些单词
				list.addArray(["player", "card", "cards", "result", "trigger", "source", "target", "targets", "lib", "game", "ui", "get", "ai", "_status"]);
			}
			return {
				list: [...new Set(getCompletions(token, context, keywords, options).concat(list))]
					.filter(key => key.startsWith(token.string))
					.sort((a, b) => (a + "").localeCompare(b + ""))
					.map(text => {
						return {
							render(elt, data, cur) {
								var icon = document.createElement("span");
								var className = "cm-completionIcon cm-completionIcon-";
								if (obj) {
									// 解决访问caller报错等问题
									let type;
									try {
										type = typeof obj[text];
									} catch {
										void 0;
									}
									if (type == "function") {
										className += "function";
									} else if (type == "string") {
										className += "text";
									} else if (type == "boolean") {
										className += "variable";
									} else {
										className += "namespace";
									}
								} else {
									if (javascriptKeywords.includes(text)) {
										className += "keyword";
									} else if (window[text]) {
										const type = typeof window[text];
										if (type == "function") {
											className += "function";
										} else if (type == "string") {
											className += "text";
										} else if (text == "window" || type == "boolean") {
											className += "variable";
										} else {
											className += "namespace";
										}
									} else {
										className += "namespace";
									}
								}
								icon.className = className;
								elt.appendChild(icon);
								elt.appendChild(document.createTextNode(text));
							},
							displayText: text,
							text: text,
						};
					}),
				from: CodeMirror.Pos(cur.line, token.start),
				to: CodeMirror.Pos(cur.line, token.end),
			};
		}
		function javascriptHint(editor, options) {
			return scriptHint(
				editor,
				javascriptKeywords,
				function (e, cur) {
					return e.getTokenAt(cur);
				},
				options
			);
		}
		//覆盖原本的javascript提示
		CodeMirror.registerHelper("hint", "javascript", javascriptHint);
		const stringProps = Object.getOwnPropertyNames(String.prototype);
		const arrayProps = Object.getOwnPropertyNames(Array.prototype);
		const funcProps = Object.getOwnPropertyNames(Array.prototype);
		const javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends from false finally for function " + "if in import instanceof let new null return super switch this throw true try typeof var void while with yield").split(" ");
		function getCompletions(token, context, keywords, options) {
			let found = [],
				start = token.string,
				global = (options && options.globalScope) || window;
			function maybeAdd(str) {
				if (str.lastIndexOf(start, 0) == 0 && !found.includes(str)) found.push(str);
			}
			function gatherCompletions(obj) {
				if (typeof obj == "string") forEach(stringProps, maybeAdd);
				else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
				else if (obj instanceof Function) forEach(funcProps, maybeAdd);
				forAllProps(obj, maybeAdd);
			}
			if (context && context.length) {
				//If this is a property, see if it belongs to some object we can
				//find in the current environment.
				let obj = context.pop(),
					base;
				if (obj.type && obj.type.indexOf("variable") === 0) {
					if (options && options.additionalContext) base = options.additionalContext[obj.string];
					if (!options || options.useGlobalScope !== false) base = base || global[obj.string];
				} else if (obj.type == "string") {
					base = "";
				} else if (obj.type == "atom") {
					base = 1;
				} else if (obj.type == "function") {
					if (global.jQuery != null && (obj.string == "$" || obj.string == "jQuery") && typeof global.jQuery == "function") base = global.jQuery();
					else if (global._ != null && obj.string == "_" && typeof global._ == "function") base = global._();
				}
				while (base != null && context.length) base = base[context.pop().string];
				if (base != null) gatherCompletions(base);
			} else {
				//If not, just look in the global object, any local scope, and optional additional-context
				//(reading into JS mode internals to get at the local and global variables)
				for (let v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
				for (let c = token.state.context; c; c = c.prev) for (let v = c.vars; v; v = v.next) maybeAdd(v.name);
				for (let v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
				if (options && options.additionalContext != null) for (let key in options.additionalContext) maybeAdd(key);
				if (!options || options.useGlobalScope !== false) gatherCompletions(global);
				forEach(keywords, maybeAdd);
			}
			return found.sort((a, b) => (a + "").localeCompare(b + ""));
		}
	}
	setIntro(node, func, left) {
		if (lib.config.touchscreen) {
			if (left) {
				node.listen(ui.click.touchintro);
			} else {
				lib.setLongPress(node, ui.click.intro);
			}
		} else {
			if (left) {
				node.listen(ui.click.intro);
			}
			if (lib.config.hover_all && !lib.device) {
				lib.setHover(node, ui.click.hoverplayer);
			}
			if (lib.config.right_info) {
				node.oncontextmenu = ui.click.rightplayer;
			}
		}
		// if(!left){
		// 	lib.setPressure(node,ui.click.rightpressure);
		// }
		if (func) {
			node._customintro = func;
		}
	}
	setPopped(node, func, width, height, forceclick, paused2) {
		node._poppedfunc = func;
		node._poppedwidth = width;
		node._poppedheight = height;
		if (forceclick) {
			node.forceclick = true;
		}
		if (lib.config.touchscreen || forceclick) {
			node.listen(ui.click.hoverpopped);
		} else {
			node.addEventListener("mouseenter", ui.click.hoverpopped);
			// node.addEventListener('mouseleave',ui.click.hoverpopped_leave);
		}
		if (paused2) {
			node._paused2 = true;
		}
	}
	placePoppedDialog(dialog, e) {
		if (dialog._place_text) {
			if (dialog._place_text.firstChild.offsetWidth >= 190 || dialog._place_text.firstChild.offsetHeight >= 30) {
				dialog._place_text.style.marginLeft = "14px";
				dialog._place_text.style.marginRight = "14px";
				dialog._place_text.style.textAlign = "left";
				dialog._place_text.style.width = "calc(100% - 28px)";
			}
		}
		if (e.touches && e.touches[0]) {
			e = e.touches[0];
		}
		var height = Math.min(ui.window.offsetHeight - 20, dialog.content.scrollHeight);
		if (dialog._mod_height) {
			height += dialog._mod_height;
		}
		dialog.style.height = height + "px";
		if (e.clientX / game.documentZoom < ui.window.offsetWidth / 2) {
			dialog.style.left = e.clientX / game.documentZoom + 10 + "px";
		} else {
			dialog.style.left = e.clientX / game.documentZoom - dialog.offsetWidth - 10 + "px";
		}
		var idealtop = (e.clientY || 0) / game.documentZoom - dialog.offsetHeight / 2;
		if (typeof idealtop != "number" || isNaN(idealtop) || idealtop <= 5) {
			idealtop = 5;
		} else if (idealtop + dialog.offsetHeight + 10 > ui.window.offsetHeight) {
			idealtop = ui.window.offsetHeight - 10 - dialog.offsetHeight;
		}
		dialog.style.top = idealtop + "px";
	}
	setHover(node, func, hoveration, width) {
		node._hoverfunc = func;
		if (typeof hoveration == "number") {
			node._hoveration = hoveration;
		}
		if (typeof width == "number") {
			node._hoverwidth = width;
		}
		node.addEventListener("mouseenter", ui.click.mouseenter);
		node.addEventListener("mouseleave", ui.click.mouseleave);
		node.addEventListener("mousedown", ui.click.mousedown);
		node.addEventListener("mousemove", ui.click.mousemove);
		return node;
	}
	setScroll(node) {
		node.ontouchstart = ui.click.touchStart;
		node.ontouchmove = ui.click.touchScroll;
		node.style.webkitOverflowScrolling = "touch";
		return node;
	}
	setMousewheel(node) {
		if (lib.config.mousewheel) node.onmousewheel = ui.click.mousewheel;
	}
	setLongPress(node, func) {
		node.addEventListener("touchstart", ui.click.longpressdown);
		node.addEventListener("touchend", ui.click.longpresscancel);
		node._longpresscallback = func;
		return node;
	}
	updateCanvas(time) {
		if (lib.canvasUpdates.length === 0) {
			lib.status.canvas = false;
			return false;
		}
		ui.canvas.width = ui.arena.offsetWidth;
		ui.canvas.height = ui.arena.offsetHeight;
		var ctx = ui.ctx;
		ctx.shadowBlur = 5;
		ctx.shadowColor = "rgba(0,0,0,0.3)";
		ctx.strokeStyle = "white";
		// ctx.lineCap='round';
		ctx.lineWidth = 3;
		ctx.save();
		for (var i = 0; i < lib.canvasUpdates.length; i++) {
			ctx.restore();
			ctx.save();
			var update = lib.canvasUpdates[i];
			if (!update.starttime) {
				update.starttime = time;
			}
			if (update(time - update.starttime, ctx) === false) {
				lib.canvasUpdates.splice(i--, 1);
			}
		}
	}
	run(time) {
		lib.status.time = time;
		for (var i = 0; i < lib.updates.length; i++) {
			if (!("_time" in lib.updates[i])) {
				lib.updates[i]._time = time;
			}
			if (lib.updates[i](time - lib.updates[i]._time - lib.status.delayed) === false) {
				lib.updates.splice(i--, 1);
			}
		}
		if (lib.updates.length) {
			lib.status.frameId = requestAnimationFrame(lib.run);
		} else {
			lib.status.time = 0;
			lib.status.delayed = 0;
		}
	}
	getUTC(date) {
		return date.getTime();
	}
	saveVideo() {
		if (_status.videoToSave) {
			game.export(lib.init.encode(JSON.stringify(_status.videoToSave)), "无名杀 - 录像 - " + _status.videoToSave.name[0] + " - " + _status.videoToSave.name[1]);
		}
	}
	/**
	 * @param {Function} fn
	 */
	genAsync(fn) {
		return gnc.of(fn);
	}
	genAwait(item) {
		return gnc.is.generator(item)
			? gnc.of(function* () {
					for (const content of item) {
						yield content;
					}
				})()
			: Promise.resolve(item);
	}
	gnc = {
		of: fn => gnc.of(fn),
		is: {
			coroutine: item => gnc.is.coroutine(item),
			generatorFunc: item => gnc.is.generatorFunc(item),
			generator: item => gnc.is.generator(item),
		},
	};
	comparator = {
		equals: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return false;
			return true;
		},
		equalAny: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return true;
			return false;
		},
		notEquals: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return false;
			return true;
		},
		notEqualAny: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return true;
			for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return true;
			return false;
		},
		typeEquals: function () {
			if (arguments.length == 0) return false;
			if (arguments.length == 1) return arguments[0] !== null;
			const type = typeof arguments[0];
			for (let i = 1; i < arguments.length; ++i) if (type !== arguments[i]) return false;
			return true;
		},
	};
	creation = {
		get array() {
			return [];
		},
		get object() {
			return {};
		},
		get nullObject() {
			return Object.create(null);
		},
		get string() {
			return "";
		},
	};
	linq = {
		cselector: {
			hasAttr: name => `[${name}]`,
			isAttr: (name, item) => `[${name}=${item}]`,
			inAttr: (name, item) => `[${name}~=${item}]`,
			conAttr: (name, item) => `[${name}*=${item}]`,
			onAttr: (name, item) => `[${name}|=${item}]`,
			bgnAttr: (name, item) => `[${name}^=${item}]`,
			endAttr: (name, item) => `[${name}^=${item}]`,
			merge: function () {
				return Array.from(arguments).join(" ");
			},
			of: function () {
				return Array.from(arguments).join("");
			},
			class: function () {
				return `.${Array.from(arguments).join(".")}`;
			},
			group: function () {
				return Array.from(arguments).join(",");
			},
			media: type => `@media ${type}`,
		},
		dom: {
			attributes: {
				style(name, value) {
					return {
						_type: "style",
						name: name,
						value: value,
					};
				},
			},
			inject(element, options) {
				//处理id和class
				if (options.identity) {
					for (const item of options.identity) {
						if (item.startsWith("#")) element.id = item.slice(1);
						else element.classList.add(item);
					}
				}
				//处理属性
				if (options.attributes) {
					for (const item in options.attributes) element.setAttribute(item, options.attributes[item]);
				}
				//处理样式
				if (options.style) {
					for (const item in options.style) element.style[item] = options.style[item];
				}
				//处理内容
				if (options.content) {
					element.innerHTML = options.content;
				}
				//处理子元素
				if (options.childs) {
					for (const item of options.childs) {
						element.appendChild(item);
					}
				}
				return element;
			},
			generate() {
				let result = lib.creation.nullObject;
				const args = Array.from(arguments);
				for (const item of args) {
					switch (typeof item) {
						case "object":
							switch (item.constructor) {
								case Object:
								case null:
									if ("_type" in item) {
										const type = item["_type"];
										if (!(type in result)) result[type] = lib.creation.nullObject;
										result[type][item.name] = item.value;
									} else {
										if (!("style" in result)) result.style = lib.creation.nullObject;
										for (const name in item) {
											result.style[name] = item[name];
										}
									}
									break;
								default:
									if (!("childs" in result)) result.childs = lib.creation.array;
									result.childs.add(item);
									break;
							}
							break;
						case "string":
							if (/^\.|#/.test(item)) {
								if (!("identity" in result)) result.identity = lib.creation.array;
								const identities = item.split(".").filter(Boolean);
								for (const item of identities) result.identity.add(item);
							} else result.content = item;
							break;
					}
				}
				return result;
			},
			attribute(name, value) {
				return {
					_type: "attributes",
					name: name,
					value: value,
				};
			},
			div() {
				const dom = lib.linq.dom;
				return dom.inject(document.createElement("div"), dom.generate(...arguments));
			},
		},
	};
	init = new LibInit();
	cheat = {
		/**
		 * 将游戏内部的对象暴露到全局中
		 *
		 * lib.cheat, game, ui, get, ai, lib, _status
		 */
		i() {
			window.cheat = lib.cheat;
			window.game = game;
			window.ui = ui;
			window.get = get;
			window.nonameAI = ai;
			window.lib = lib;
			window._status = _status;
		},
		/**
		 * 自己的下家(如果下家是主公身份则是下家的下家)立即死亡
		 */
		dy() {
			let next = game.me.next;
			for (let i = 0; i < 10; i++) {
				if (next.identity != "zhu") {
					break;
				}
				next = next.next;
			}
			next.die();
		},
		/**
		 * 在控制台输出每个扩展文件夹内的所有文件
		 *
		 * 需要node环境
		 *
		 * @param  { ...string } args 只需要显示的文件夹首字符
		 */
		x(...args) {
			/**
			 * @param { string } dir
			 * @param { (folders: string[], files: string[]) => any } callback
			 */
			const gl = function (dir, callback) {
				const files = [],
					folders = [];
				// dir = '/Users/widget/Documents/extension/' + dir;
				dir = lib.node.path.join(__dirname, "extension", dir);
				lib.node.fs.promises
					.readdir(dir)
					.then(filelist => {
						for (let i = 0; i < filelist.length; i++) {
							if (filelist[i][0] != "." && filelist[i][0] != "_") {
								if (lib.node.fs.statSync(dir + "/" + filelist[i]).isDirectory()) {
									folders.push(filelist[i]);
								} else {
									files.push(filelist[i]);
								}
							}
						}
						callback(folders, files);
					})
					.catch(e => {
						throw e;
					});
			};
			for (let i = 0; i < args.length; i++) {
				args[i] = args[i][0];
			}
			gl("", function (list) {
				if (args.length) {
					for (let i = 0; i < list.length; i++) {
						if (!args.includes(list[i][0])) {
							list.splice(i--, 1);
						}
					}
				}
				if (list.length) {
					for (let i = 0; i < list.length; i++) {
						let str = list[i];
						gl(str, function (folders, files) {
							if (files.length > 1) {
								for (let j = 0; j < files.length; j++) {
									if (typeof files[i] == "string" && files[i].includes("extension.js")) {
										files.splice(j--, 1);
									} else {
										if (j % 5 == 0) {
											str += "\n\t\t\t";
										}
										str += '"' + files[j] + '",';
									}
								}
								console.log(str.slice(0, str.length - 1));
								game.print(str.slice(0, str.length - 1));
							}
						});
					}
				}
			});
		},
		/**
		 * 游戏设置变更为固定数据(不更改扩展设置)
		 */
		cfg() {
			const mode = lib.config.all.mode.slice(0);
			mode.remove("connect");
			mode.remove("brawl");
			const banned = ["shen_guanyu", "shen_caocao", "caopi", "re_daqiao", "caorui", "daqiao", "lingcao", "liuzan", "lusu", "luxun", "yanwen", "zhouyu", "ns_wangyue", "gw_yenaifa", "old_caozhen", "swd_jiangziya", "xuhuang", "maliang", "guojia", "simayi", "swd_kangnalishi", "hs_siwangzhiyi", "hs_nozdormu", "old_zhuzhi"];
			const bannedcards = ["zengbin"];
			const favs = [
				"hs_tuoqi",
				"hs_siwangxianzhi",
				"hs_xukongzhiying",
				"hs_hsjiasha",
				"gjqt_xieyi",
				"gjqt_yunwuyue",
				"gjqt_beiluo",
				"gjqt_cenying",
				"shen_lvmeng",
				"shen_zhaoyun",
				"shen_zhugeliang",
				"ow_ana",
				"chenlin",
				"ns_guanlu",
				"hs_guldan",
				"swd_guyue",
				"pal_jiangyunfan",
				"mtg_jiesi",
				"swd_lanyin",
				"pal_liumengli",
				"swd_muyun",
				"pal_nangonghuang",
				"swd_muyue",
				"pal_murongziying",
				"swd_qiner",
				"pal_shenqishuang",
				"hs_taisi",
				"wangji",
				"pal_xingxuan",
				"xunyou",
				"hs_yelise",
				"pal_yuejinzhao",
				"pal_yueqi",
				"gjqt_yuewuyi",
				"swd_yuxiaoxue",
				"ow_zhaliya",
				"zhangchunhua",
				"hs_zhihuanhua",
				"swd_zhiyin",
				"old_zhonghui",
				"gjqt_bailitusu",
				"hs_barnes",
				"ow_dva",
				"swd_hengai",
				"pal_jushifang",
				"hs_kazhakusi",
				"hs_lafamu",
				"ow_liekong",
				"hs_lreno",
				"pal_mingxiu",
				"swd_murongshi",
				"gw_oudimu",
				"gjqt_ouyangshaogong",
				"hs_pyros",
				"qinmi",
				"gw_sanhanya",
				"hs_selajin",
				"swd_shuwaner",
				"swd_situqiang",
				"hs_xialikeer",
				"pal_xuejian",
				"swd_yuchiyanhong",
				"swd_yuwentuo",
				"swd_zhaoyun",
				"zhugeliang",
				"gw_aigeleisi",
				"gw_aimin",
				"gjqt_aruan",
				"hs_aya",
				"swd_cheyun",
				"swd_chenjingchou",
				"gw_diandian",
				"swd_huzhongxian",
				"hs_jinglinglong",
				"hs_kaituozhe",
				"hs_kalimosi",
				"gw_linjing",
				"ow_luxiao",
				"re_luxun",
				"hs_morgl",
				"swd_sikongyu",
				"hs_sthrall",
				"sunquan",
				"sunshangxiang",
				"gw_yioufeisisp",
				"gw_yisilinni",
				"hs_yogg",
				"hs_ysera",
				"pal_yuntianhe",
				"zhugejin",
				"zhugeke",
				"gw_zhuoertan",
				"hs_anduin",
				"swd_anka",
				"ow_banzang",
				"ow_chanyata",
				"diaochan",
				"swd_duguningke",
				"sp_diaochan",
				"hetaihou",
				"ns_huamulan",
				"swd_huanglei",
				"swd_huanyuanzhi",
				"re_huatuo",
				"gw_huoge",
				"pal_jiangcheng",
				"yj_jushou",
				"swd_kendi",
				"yxs_libai",
				"mtg_lilianna",
				"xin_liru",
				"liuxie",
				"pal_lixiaoyao",
				"pal_longkui",
				"ns_nanhua",
				"swd_qi",
				"swd_septem",
				"gw_shasixiwusi",
				"ow_tianshi",
				"swd_weida",
				"gjqt_xiayize",
				"swd_xiyan",
				"hs_xsylvanas",
				"hs_yelinlonghou",
				"ow_yuanshi",
				"zuoci",
			];
			const vintage = ["tianjian", "shuiyun", "zhuyue", "zhimeng", "poyun", "qianfang", "xfenxin", "danqing", "ywuhun", "tianwu", "xuelu", "shahun", "yuling", "duhun", "liaoyuan", "touxi", "wangchen", "poyue", "kunlunjing", "huanhun", "yunchou", "tuzhen", "cyqiaoxie", "mufeng", "duanyi", "guozao", "yaotong", "pozhen", "tanlin", "susheng", "jikong", "shouyin", "jilve", "hxunzhi", "huodan", "shanxian", "ziyu", "kuoyin", "feiren", "zihui", "jidong", "baoxue", "aqianghua", "maoding", "bfengshi", "zhongdun", "pingzhang", "maichong", "guozai", "jingxiang", "yuelu", "liechao", "fengnu", "hanshuang", "enze", "malymowang", "xshixin", "qingzun"];
			const favmodes = ["versus|three", "versus|four", "versus|two", "chess|combat"];
			for (let i = 0; i < mode.length; i++) {
				game.saveConfig(mode[i] + "_banned", banned);
				game.saveConfig(mode[i] + "_bannedcards", bannedcards);
			}
			const characters = lib.config.all.characters.slice(0);
			characters.remove("standard");
			characters.remove("old");
			game.saveConfig("vintageSkills", vintage);
			game.saveConfig("favouriteCharacter", favs);
			game.saveConfig("favouriteMode", favmodes);
			game.saveConfig("theme", "simple");
			game.saveConfig("player_border", "slim");
			game.saveConfig("cards", lib.config.all.cards);
			game.saveConfig("characters", characters);
			game.saveConfig("change_skin", false);
			game.saveConfig("show_splash", "off");
			game.saveConfig("show_favourite", false);
			game.saveConfig("animation", false);
			game.saveConfig("hover_all", false);
			game.saveConfig("asset_version", "v1.9");
			// game.saveConfig('characters',lib.config.all.characters);
			// game.saveConfig('cards',lib.config.all.cards);
			game.saveConfig("plays", ["cardpile"]);
			game.saveConfig("skip_shan", false);
			game.saveConfig("tao_enemy", true);
			game.saveConfig("layout", "long2");
			game.saveConfig("hp_style", "ol");
			game.saveConfig("background_music", "music_off");
			game.saveConfig("background_audio", false);
			game.saveConfig("background_speak", false);
			game.saveConfig("show_volumn", false);
			game.saveConfig("show_replay", true);
			game.saveConfig("autostyle", true);
			game.saveConfig("debug", true);
			game.saveConfig("dev", true);
			if (!lib.device) {
				game.saveConfig("sync_speed", false);
			}
			game.reload();
		},
		/**
		 * 移除旁观时的手牌暗置效果
		 */
		o() {
			ui.arena.classList.remove("observe");
		},
		/**
		 * 向牌堆顶添加牌(即创建一些卡牌添加到牌堆里)
		 * @param  { ...string } list 卡牌名称数字
		 */
		pt(...list) {
			while (list.length) {
				const card = lib.cheat.gn(list.pop());
				if (card) ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
			}
		},
		/**
		 * 将卡牌的样式在simple和default之间切换
		 *
		 * 有参数时改为获得指定的牌
		 *
		 * @param { ...string } args
		 */
		q(...args) {
			// if(lib.config.layout!='mobile') lib.init.layout('mobile');
			if (args.length == 0) {
				if (ui.css.card_style) ui.css.card_style.remove();
				if (lib.config.card_style != "simple") {
					lib.config.card_style = "simple";
					ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", "simple");
				} else {
					lib.config.card_style = "default";
					ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", "default");
				}
			} else {
				for (let i = 0; i < args.length; i++) {
					lib.cheat.g(args[i]);
				}
			}
			ui.arena.classList.remove("selecting");
			ui.arena.classList.remove("tempnoe");
		},
		/**
		 * 替换皮肤
		 * @param { string } name 武将名称
		 * @param { number | true } [i] 指定game.players的第几个元素，不填指定为自己的下家。为true时切换玩家布局
		 * @param { string } [skin] 皮肤id
		 */
		p(name, i, skin) {
			const list = ["swd", "hs", "pal", "gjqt", "ow", "gw"];
			if (!lib.character[name]) {
				for (let j = 0; j < list.length; j++) {
					if (lib.character[list[j] + "_" + name]) {
						name = list[j] + "_" + name;
						break;
					}
				}
			}
			let target;
			if (typeof i == "number") {
				target = game.players[i];
			} else {
				target = game.me.next;
			}
			if (!lib.character[name]) {
				target.node.avatar.setBackground(name, "character");
				target.node.avatar.show();
			} else {
				target.init(name);
			}
			if (skin) {
				lib.config.skin[name] = skin - 1;
				// 换肤时skin - 1变成skin
				ui.click.skin(target.node.avatar, name);
			}
			if (i === true) {
				if (lib.config.layout == "long2") {
					lib.init.layout("mobile");
				} else {
					lib.init.layout("long2");
				}
			}
		},
		/**
		 * @overload
		 * @description 不传参数默认装备麒麟弓，八卦阵，的卢，赤兔，木牛
		 * @returns { void }
		 */
		/**
		 * @overload
		 * @description 指定的玩家或自己装备指定的牌
		 * @param  {...Player | string} args 玩家或卡牌名
		 * @returns { void }
		 */
		e(...args) {
			/**
			 * @type { Card[] }
			 */
			let cards = [];
			/**
			 * @type { Player }
			 */
			let target;
			for (let i = 0; i < arguments.length; i++) {
				if (get.itemtype(arguments[i]) == "player") {
					target = arguments[i];
				} else {
					cards.push(game.createCard(arguments[i]));
				}
			}
			if (!cards.length) {
				cards.push(game.createCard("qilin"));
				cards.push(game.createCard("bagua"));
				cards.push(game.createCard("dilu"));
				cards.push(game.createCard("chitu"));
				cards.push(game.createCard("muniu"));
			}
			target = target || game.me;
			for (let i = 0; i < cards.length; i++) {
				const card = target.getEquip(cards[i]);
				if (card) {
					card.discard();
					target.removeEquipTrigger(card);
				}
				target.$equip(cards[i]);
			}
		},
		/**
		 * 检测当前游戏开启的武将数，卡堆的数量分布情况
		 */
		c() {
			const log = function (...args) {
				console.log(...args);
				game.print(...args);
			};
			(function () {
				let a = 0,
					b = 0,
					c = 0,
					d = 0,
					e = 0;
				let sa = 0,
					sb = 0,
					sc = 0,
					sd = 0,
					se = 0;
				for (let i in lib.character) {
					switch (lib.character[i][1]) {
						case "jiGroup":
							a++;
							if (lib.config.banned.includes(i)) sa++;
							break;
						case "yongGroup":
							b++;
							if (lib.config.banned.includes(i)) sb++;
							break;
						case "shengGroup":
							c++;
							if (lib.config.banned.includes(i)) sc++;
							break;
						case "xueGroup":
							d++;
							if (lib.config.banned.includes(i)) sd++;
							break;
						case "huanGroup":
							e++;
							if (lib.config.banned.includes(i)) se++;
							break;
					}
				}
				log("技：" + (a - sa) + "/" + a);
				log("咏：" + (b - sb) + "/" + b);
				log("圣：" + (c - sc) + "/" + c);
				log("血：" + (d - sd) + "/" + d);
				log("幻：" + (e - se) + "/" + e);
				log("已启用：" + (a + b + c + d + e  - (sa + sb + sc + sd + se )) + "/" + (a + b + c + d + e ));
			})();
			(function () {
				let a = 0,
					b = 0,
					c = 0;
				let aa = 0,
					bb = 0,
					cc = 0;
				let sa = 0,
					sb = 0,
					sc = 0,
					sd = 0,
					se = 0,
					sf = 0,
					sh = 0;
				let anMie = 0,
					huoYanZhan = 0,
					fengShenZhan = 0,
					diLieZhan = 0,
					shuiLianZhan = 0,
					leiGuangZhan = 0,
					moDan = 0,
					shengGuang = 0,
					xuRuo = 0,
					zhongDu = 0;
				let ji=0,
					yong=0,
					sheng=0,
					xue=0,
					huan=0;
				let dict={};
				for (let i in lib.card) {
					if (get.objtype(lib.card[i]) == "object" && lib.translate[i + "_info"]) {
						switch (lib.card[i].type) {
							case "gongJi":
								a++;
								break;
							case "faShu":
								b++;
								break;
							default:
								c++;
								break;
						}
					}
				}
				for (let i = 0; i < lib.card.list.length; i++) {
					if (typeof lib.card[lib.card.list[i][2]] == "object") {
						switch (lib.card[lib.card.list[i][2]].type) {
							case "gongJi":
								aa++;
								break;
							case "faShu":
								bb++;
								break;
							default:
								cc++;
								break;
						}
						switch (lib.card.list[i][0]) {
							case "an":
								sa++;
								break;
							case "huo":
								sb++;
								break;
							case "feng":
								sc++;
								break;
							case "di":
								sd++;
								break;
							case "lei":
								se++;
								break
							case "shui":
								sf++;
								break;
							case "guang":
								sh++;
								break
						}
						switch (lib.card.list[i][2]) {
							case "anMie":
								anMie++;
								break;
							case "huoYanZhan":
								huoYanZhan++;
								break;
							case "fengShenZhan":
								fengShenZhan++;
								break;
							case "diLieZhan":
								diLieZhan++;
								break;
							case "shuiLianZhan":
								shuiLianZhan++;
								break;
							case "leiGuangZhan":
								leiGuangZhan++;
								break;
							case "moDan":
								moDan++;
								break;
							case "shengGuang":
								shengGuang++;
								break;
							case "xuRuo":
								xuRuo++;
								break;
							case "zhongDu":
								zhongDu++;
								break;
							default:
								break;
						}
						switch (lib.card.list[i][1]) {
							case "ji":
								ji++;
								break;
							case "yong":
								yong++;
								break;
							case "sheng":
								sheng++;
								break;
							case "xue":
								xue++;
								break;
							case "huan":
								huan++;
								break;
							default:
								break;
						}
						if(lib.card.list[i][3]){
							if(dict[lib.card.list[i][3]]) dict[lib.card.list[i][3]]++;
							else dict[lib.card.list[i][3]]=1;
						}
					}
				}
				let str = "攻击牌" + aa + "； " + "法术牌" + bb + "； " + "其它牌" + cc;
				log(str);
				str = "暗牌" + sa + "； " + "火牌" + sb + "； " + "风牌" + sc + "； " + "地牌" + sd + "； " + "雷牌" + se + "； " + "水牌" + sf + "； " + "光牌" + sh;
				log(str);
				str = "技牌"+ji+"； "+"咏牌"+yong+"； "+"圣牌"+sheng+"； "+"血牌"+xue+"； "+"幻牌"+huan;
				log(str);
				str = "暗灭" + anMie + "； " + "火焰斩"+huoYanZhan+"； " + "风神斩"+fengShenZhan+"； " + "地裂斩"+diLieZhan+"； " + "水涟斩"+shuiLianZhan+"； " + "雷光斩"+leiGuangZhan+"； " + "魔弹"+moDan+"； " + "圣光"+shengGuang+"； " + "虚弱"+xuRuo+"； " + "中毒"+zhongDu;
				log(str);
				str="";
				for (let i in dict) {
					str+=get.translation(i)+":"+dict[i]+"； ";
				}
				log(str);
				log((a + b + c) +  "/" + (aa + bb + cc ));
			})();
		},
		/**
		 * 显示场上所有的角色的身份
		 */
		id() {
			game.showIdentity();
		},
		/**
		 * 替换dialog中待选择的卡牌(或其他东西)对应的真实卡牌(或其他东西)
		 * ```js
		 * // 在神吕蒙涉猎时使用:
		 * // 涉猎如果选择l第一张牌，那你获得的是你创造的这张杀
		 * lib.cheat.b(game.createCard('sha'));
		 * ```
		 */
		b(...args) {
			if (!ui.dialog || !ui.dialog.buttons) return;
			for (let i = 0; i < Math.min(args.length, ui.dialog.buttons.length); i++) {
				ui.dialog.buttons[i].link = args[i];
			}
		},
		/**
		 * 炉石模式可用，使用'spell_yexinglanghun'卡牌
		 * @param { boolean } [me] 决定是自己还是对手使用'spell_yexinglanghun'卡牌
		 */
		uy(me) {
			if (me) {
				game.me.useCard({ name: "spell_yexinglanghun" }, game.me);
			} else {
				// player.getEnemy是炉石模式的函数
				const enemy = game.me.getEnemy();
				enemy.useCard({ name: "spell_yexinglanghun" }, enemy);
			}
		},
		/**
		 * 炉石模式可用，使用`spell_${name}`卡牌
		 * @param { string } [name]
		 * @param { boolean } [act]
		 */
		gs(name = "yexinglanghun", act) {
			const card = game.createCard("spell_" + name);
			game.me.node.handcards1.appendChild(card);
			if (!act) {
				game.me.actused = -99;
			}
			ui.updatehl();
			delete _status.event._buttonChoice;
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			setTimeout(game.check, 300);
		},
		/**
		 * 炉石模式可用，获得`stone_${name}_stonecharacter`卡牌
		 * @param { string } [name]
		 * @param { boolean } [act]
		 */
		gc(name = "falifulong", act) {
			var card = game.createCard("stone_" + name + "_stonecharacter");
			game.me.node.handcards1.appendChild(card);
			if (!act) {
				game.me.actused = -99;
			}
			ui.updatehl();
			delete _status.event._buttonChoice;
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			setTimeout(game.check, 300);
		},
		/**
		 * 进入/关闭快速自动测试模式(游戏速度最快)，只有游戏记录界面
		 * @param { boolean | string } [bool]
		 */
		a(bool) {
			if (lib.config.test_game) {
				game.saveConfig("test_game");
			} else {
				if (bool) {
					if (typeof bool === "string") {
						game.saveConfig("test_game", bool);
					} else {
						game.saveConfig("test_game", "_");
					}
				} else {
					game.saveConfig("test_game", true);
				}
			}
			game.reload();
		},
		/**
		 * 临时去掉“自动测试模式”带来的css效果，
		 *
		 * 如果要彻底关闭，需要再执行一次lib.cheat.a
		 */
		as() {
			ui.window.classList.remove("testing");
			const bg = ui.window.querySelector(".pausedbg");
			if (bg) {
				bg.remove();
			}
		},
		/**
		 * 装备麒麟弓，并且下家玩家对你发动借刀杀人,杀你的上家
		 */
		uj() {
			lib.cheat.e("qilin");
			game.me.next.useCard({ name: "jiedao" }, [game.me, game.me.previous]);
		},
		/**
		 * 下家对你使用一张牌
		 * @param  {...Player | Player[] | string | VCard } args
		 *
		 * @example
		 * ```js
		 * // 传入player是卡牌的使用者
		 * // 传入player数组是卡牌的目标(没有则目标是game.me)
		 * // 传入字符串设置卡牌名称
		 * // 传入Vcard对象设置卡牌更具体的卡牌信息
		 * lib.cheat.u(player1, 'sha', [player2, player3]);
		 * ```
		 */
		u(...args) {
			let card = new lib.element.VCard({ name: "sha" }),
				source = game.me.next,
				targets = [];
			for (let i = 0; i < args.length; i++) {
				if (get.itemtype(args[i]) == "player") {
					source = args[i];
				} else if (Array.isArray(args[i])) {
					targets = args[i];
				} else if (args instanceof lib.element.VCard) {
					card = args[i];
				} else if (typeof args[i] == "object" && args[i] != null && args[i].name) {
					console.warn("lib.cheat.u: 以普通obj形式传入的类卡牌形式已经废弃");
					card = new lib.element.VCard(args[i]);
				} else if (typeof args[i] == "string") {
					card = new lib.element.VCard({ name: args[i] });
				}
			}
			if (!targets.length) targets.push(game.me);
			source.useCard(game.createCard(card.name, card.xiBie, card.mingGe, card.duYou), targets);
		},
		/**
		 * 输出每个强度的武将数量、每个武将包的每个强度的武将数量、每个武将对应的id和翻译
		 * @param { boolean } [bool] 为false不输出无名杀自带的武将id和翻译
		 */
		r(bool) {
			const log = function (...args) {
				console.log(...args);
				game.print(...args);
			};
			let list = ["s", "ap", "a", "am", "bp", "b", "bm", "c", "d"];
			let str = "";
			for (let i = 0; i < list.length; i++) {
				if (str) str += " 、 ";
				str += list[i] + "-" + lib.rank[list[i]].length;
			}
			log(str);
			for (let i in lib.characterPack) {
				if (!bool && lib.config.all.sgscharacters.includes(i)) continue;
				let map = {};
				let str = "";
				for (let j in lib.characterPack[i]) {
					let rank = get.rank(j);
					if (!map[rank]) {
						map[rank] = 1;
					} else {
						map[rank]++;
					}
				}
				for (let j = 0; j < list.length; j++) {
					if (map[list[j]]) {
						if (str) str += " 、 ";
						str += list[j] + "-" + map[list[j]];
					}
				}
				if (str) {
					log(lib.translate[i + "_character_config"] + "：" + str);
				}
			}

			let list2 = lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
			Object.keys(lib.character).forEach(key => {
				if (!lib.config.forbidai.includes(key) && !key.startsWith("boss_") && !key.startsWith("tafang_") && !list2.includes(key)) log(get.translation(key), key);
			});
		},
		/**
		 * 打印目标玩家的手牌
		 * @param { Player } player
		 */
		h(player) {
			console.log(get.translation(player.getCards("h")));
		},
		/**
		 * 给自己立刻添加手牌
		 *
		 * @example
		 * ```js
		 * // 获得3张杀和1张闪
		 * lib.cheat.g('sha', 3, 'shan', 1)
		 * ```
		 */
		g(...args) {
			for (let i = 0; i < args.length; i++) {
				if (i > 0 && typeof args[i] == "number") {
					for (let j = 0; j < args[i] - 1; j++) {
						lib.cheat.gx(args[i - 1]);
					}
				} else {
					lib.cheat.gx(args[i]);
				}
			}
		},
		/**
		 * 立即获得指定类型的牌各一张
		 *
		 * 会添加到不属于当前模式的牌和某些角色专属牌
		 *
		 * @param { string } type
		 */
		ga(type) {
			for (let i in lib.card) {
				if (lib.card[i].type == type || lib.card[i].subtype == type) {
					lib.cheat.g(i);
				}
			}
		},
		/**
		 *  给所有玩家立刻添加一张或多张指定的牌
		 * @param  {...string} args
		 * @example
		 * ```js
		 * // 给所有玩家立刻添加一张杀和一张闪
		 * lib.cheat.gg('sha', 'shan');
		 * ```
		 */
		gg(...args) {
			game.players.forEach(player => {
				args.forEach(cardName => {
					lib.cheat.gx(cardName, player);
				});
			});
		},
		/**
		 * 给目标立即添加一张手牌
		 * @param { string } name
		 * @param { Player } target
		 */
		gx(name, target = game.me) {
			const card = lib.cheat.gn(name);
			if (!card) return;
			target.node.handcards1.appendChild(card);
			delete _status.event._buttonChoice;
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			game.check();
			target.update();
			ui.updatehl();
		},
		/**
		 * 创建卡牌
		 *
		 * 如果lib.card里没有对应卡牌名返回null
		 *
		 * @param { string } name
		 * @returns { Card }
		 * @example
		 * ```js
		 * // 创建一个梅花杀
		 * lib.cheat.gn('clubsha');
		 * // 创建一个红色杀
		 * lib.cheat.gn('redsha');
		 * // 创建一个黑色杀
		 * lib.cheat.gn('blacksha');
		 * // 创建一个火杀
		 * lib.cheat.gn('huosha');
		 * // 创建一个雷杀
		 * lib.cheat.gn('leisha');
		 * // 冰杀神杀刺杀没有
		 * ```
		 */
		gn(name) {
			let xiBie = null;
			let xiBieList = ["huo", "feng", "shui", "di",'an','lei'];
			let nameList = ['huoYanZhan','fengShenZhan','shuiLianZhan','diLieZhan','anMie','leiGuangZhan'];
			let mingGeList = ['sheng','xue','yong','ji','huan'];
			for (let i = 0; i < xiBieList.length; i++) {
				if (name.startsWith(xiBieList[i])) {
					xiBie = xiBie[i];
					name = nameList.slice(xiBieList[i].length);
					break;
				}
			}
			
			let mingGe = mingGeList.randomGet();

			if (!lib.card[name]) {
				return null;
			}
			return game.createCard(name, xiBie, mingGe);
		},
		/**
		 * 指定的玩家或自己立即获得诸葛连弩，青龙刀，八卦阵，的卢，赤兔，木牛
		 * @param { Player } [target]
		 */
		ge(target) {
			if (target) {
				lib.cheat.gx("zhuge", target);
				lib.cheat.gx("qinglong", target);
				lib.cheat.gx("bagua", target);
				lib.cheat.gx("dilu", target);
				lib.cheat.gx("chitu", target);
				lib.cheat.gx("muniu", target);
			} else {
				lib.cheat.g("zhuge");
				lib.cheat.g("qinglong");
				lib.cheat.g("bagua");
				lib.cheat.g("dilu");
				lib.cheat.g("chitu");
				lib.cheat.g("muniu");
			}
		},
		/**
		 * 自己立即获得闪电，火山，洪水，乐不思蜀，鬼幽结
		 */
		gj() {
			lib.cheat.g("shandian");
			lib.cheat.g("huoshan");
			lib.cheat.g("hongshui");
			lib.cheat.g("lebu");
			lib.cheat.g("bingliang");
			lib.cheat.g("guiyoujie");
		},
		/**
		 * 自己立即获得所有食物牌各一张
		 */
		gf() {
			for (let i in lib.card) {
				if (lib.card[i].type == "food") {
					lib.cheat.g(i);
				}
			}
		},
		/**
		 * 自己立刻获取牌堆顶num张牌
		 * @param { number } [num]
		 * @param { Player } [target]
		 */
		d(num = 1, target) {
			const cards = get.cards(num);
			for (let i = 0; i < num; i++) {
				const card = cards[i];
				game.me.node.handcards1.appendChild(card);
				delete _status.event._buttonChoice;
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				delete _status.event._skillChoice;
				game.check();
				game.me.update();
				ui.updatehl();
			}
		},
		/**
		 * 给自己立刻添加一个或多个技能
		 * @param {...string} args 技能名
		 */
		s(...args) {
			for (var i = 0; i < args.length; i++) {
				game.me.addSkill(args[i], true);
			}
			delete _status.event._buttonChoice;
			delete _status.event._cardChoice;
			delete _status.event._targetChoice;
			delete _status.event._skillChoice;
			game.check();
		},
		/**
		 * 弃置指定位置玩家的所有牌
		 *
		 * 不传入num默认为弃置所有玩家的所有牌
		 *
		 * @param { number | Player } [num]
		 */
		t(num) {
			if (game.players.includes(num)) {
				num = game.players.indexOf(num);
			}
			if (num == undefined) {
				for (let i = 0; i < game.players.length; i++) lib.cheat.t(i);
				return;
			}
			const player = game.players[num];
			const cards = player.getCards("hej");
			for (let i = 0; i < cards.length; i++) {
				cards[i].discard();
			}
			player.removeEquipTrigger();
			player.update();
		},
		/**
		 *  自己以外的其他玩家弃置所有牌
		 */
		to() {
			game.players
				.filter(player => player != game.me)
				.forEach((_, i) => {
					lib.cheat.t(i);
				});
		},
		/**
		 * 弃置自己所有牌
		 */
		tm() {
			lib.cheat.t(game.me);
		},
		/**
		 * 指定一个目标，弃置所有牌，血量变1，并且自己获得一张"juedou"
		 * @param i 从自己开始算起，自己为0，不填默认1，即自己下家
		 */
		k(i = 1) {
			game.players[i].hp = 1;
			lib.cheat.t(i);
			lib.cheat.g("juedou");
		},
		/**
		 * 重新设置当前的主公的武将牌，且血量上限+1(不论当局人数是否大于3)
		 * @param { string } name
		 */
		z(name) {
			switch (name) {
				case "cc":
					name = "re_caocao";
					break;
				case "lb":
					name = "re_liubei";
					break;
				case "sq":
					name = "sunquan";
					break;
				case "dz":
					name = "dongzhuo";
					break;
				case "ys":
					name = "re_yuanshao";
					break;
				case "zj":
					name = "sp_zhangjiao";
					break;
				case "ls":
					name = "liushan";
					break;
				case "sc":
					name = "sunce";
					break;
				case "cp":
					name = "caopi";
					break;
				case "cr":
					name = "caorui";
					break;
				case "sx":
					name = "sunxiu";
					break;
				case "lc":
					name = "liuchen";
					break;
				case "sh":
					name = "sunhao";
					break;
			}
			game.zhu.init(name);
			game.zhu.maxHp++;
			game.zhu.hp++;
			game.zhu.update();
		},
	};
	translate = {
		flower: "鲜花",
		egg: "鸡蛋",
		wine: "酒杯",
		shoe: "拖鞋",
		yuxisx: "玉玺",
		jiasuo: "枷锁",
		junk: "平凡",
		common: "普通",
		rare: "精品",
		epic: "史诗",
		legend: "传说",
		default: "默认",
		special: "特殊",
		//zhenfa: "阵法",
		//aozhan: "鏖战",
		mode_derivation_card_config: "衍生",
		mode_banned_card_config: "禁卡",
		mode_favourite_character_config: "收藏",
		mode_banned_character_config: "禁角",
		//heart: "♥︎",
		//diamond: "♦︎",
		//spade: "♠︎",
		//club: "♣︎",
		//none: "◈",
		//ghujia: "护甲",
		//ghujia_bg: "甲",
		//heart2: "红桃",
		//diamond2: "方片",
		//spade2: "黑桃",
		//club2: "梅花",
		//none2: "无色",
		//red: "红色",
		//black: "黑色",
		//red2: "红色",
		//black2: "黑色",
		ok: "确定",
		ok2: "确定",
		cancel: "取消",
		cancel2: "取消",
		restart: "重新开始",
		setting: "设置",
		start: "开始",
		random: "随机",
		_out: "无效",
		agree: "同意",
		refuse: "拒绝",
		/*
		fire: "火",
		thunder: "雷",
		poison: "毒",
		kami: "神",
		ice: "冰",
		stab: "刺",
		wei: "魏",
		shu: "蜀",
		wu: "吴",
		qun: "群",
		shen: "神",
		western: "西",
		key: "键",
		jin: "晋",
		ye: "野",
		double: "双",
		wei2: "魏国",
		shu2: "蜀国",
		wu2: "吴国",
		qun2: "群雄",
		shen2: "神明",
		western2: "西方",
		key2: "KEY",
		jin2: "晋朝",
		ye2: "野心家",
		*/
		double2: "双势力",
		male: "男",
		female: "女",
		mad: "混乱",
		mad_bg: "疯",
		draw_card: "摸牌",
		discard_card: "弃牌",
		take_damage: "受伤害",
		reset_character: "复原角色牌",
		recover_hp: "回复体力",
		lose_hp: "失去体力",
		get_damage: "受伤害",
		/*
		weiColor: "#b0d0e2",
		shuColor: "#ffddb9",
		wuColor: "#b2d9a9",
		qunColor: "#f6f6f6",
		shenColor: "#ffe14c",
		westernColor: "#ffe14c",
		jinColor: "#ffe14c",
		keyColor: "#c9b1fd",
		basic: "基本",
		equip: "装备",
		trick: "锦囊",
		delay: "延时锦囊",
		special_delay: "技能机制",
		*/
		character: "角色",
		/*
		revive: "复活",
		equip1: "武器",
		equip2: "防具",
		equip3: "防御马",
		equip3_4: "坐骑",
		equip4: "攻击马",
		equip5: "宝物",
		equip6: "特殊装备",
		*/
		zero: "零",
		one: "一",
		two: "二",
		three: "三",
		four: "四",
		five: "五",
		six: "六",
		seven: "七",
		eight: "八",
		nine: "九",
		ten: "十",
		_recasting: "重铸",
		_lianhuan: "连环",
		_lianhuan2: "连环",
		_kamisha: "神杀",
		_icesha: "冰杀",
		qianxing: "潜行",
		mianyi: "免疫",
		fengyin: "封印",
		baiban: "白板",
		_disableJudge: "判定区",

		xingBei_emotion: "星杯表情",
		xiaowu_emotion: "小无表情",
		guojia_emotion: "郭嘉表情",
		zhenji_emotion: "甄姬表情",
		shibing_emotion: "士兵表情",
		xiaosha_emotion: "小杀表情",
		xiaotao_emotion: "小桃表情",
		xiaojiu_emotion: "小酒表情",
		xiaokuo_emotion: "小扩表情",
		biexiao_emotion: "憋笑表情",
		chaijun_emotion: "柴郡表情",
		huangdou_emotion: "黄豆表情",
		maoshu_emotion: "猫鼠表情",

		pause: "暂停",
		config: "选项",
		auto: "托管",
		/*
		unknown: "未知",
		unknown0: "一号位",
		unknown1: "二号位",
		unknown2: "三号位",
		unknown3: "四号位",
		unknown4: "五号位",
		unknown5: "六号位",
		unknown6: "七号位",
		unknown7: "八号位",
		unknown8: "九号位",
		unknown9: "十号位",
		unknown10: "十一号位",
		unknown11: "十二号位",

		feichu_equip1: "已废除",
		feichu_equip1_info: "武器栏已废除",
		feichu_equip2: "已废除",
		feichu_equip2_info: "防具栏已废除",
		feichu_equip3: "已废除",
		feichu_equip3_info: "防御坐骑栏已废除",
		feichu_equip4: "已废除",
		feichu_equip4_info: "攻击坐骑栏已废除",
		feichu_equip5: "已废除",
		feichu_equip5_info: "宝物栏已废除",
		feichu_equip6: "已废除",
		feichu_equip6_info: "特殊装备栏已废除",
		feichu_equip1_bg: "废",
		feichu_equip2_bg: "废",
		feichu_equip3_bg: "废",
		feichu_equip4_bg: "废",
		feichu_equip5_bg: "废",
		feichu_equip6_bg: "废",
		disable_judge: "已废除",
		disable_judge_info: "判定区已废除",
		disable_judge_bg: "废",
		pss: "手势",
		pss_paper: "布",
		pss_scissor: "剪刀",
		pss_stone: "石头",
		pss_paper_info: "石头剪刀布时的一种手势。克制石头，但被剪刀克制。",
		pss_scissor_info: "石头剪刀布时的一种手势。克制布，但被石头克制。",
		pss_stone_info: "石头剪刀布时的一种手势。克制剪刀，但被布克制。",
		renku: "仁库",
		group_wei: "魏势力",
		group_shu: "蜀势力",
		group_wu: "吴势力",
		group_qun: "群势力",
		group_key: "键势力",
		group_jin: "晋势力",
		group_wei_bg: "魏",
		group_shu_bg: "蜀",
		group_wu_bg: "吴",
		group_qun_bg: "群",
		group_key_bg: "键",
		group_jin_bg: "晋",
		zhengsu: "整肃",
		zhengsu_leijin: "擂进",
		zhengsu_bianzhen: "变阵",
		zhengsu_mingzhi: "鸣止",
		zhengsu_leijin_info: "回合内所有于出牌阶段使用的牌点数递增且不少于三张。",
		zhengsu_bianzhen_info: "回合内所有于出牌阶段使用的牌花色相同且不少于两张。",
		zhengsu_mingzhi_info: "回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。",
		db_atk: "策略",
		db_atk1: "全军出击",
		db_atk2: "分兵围城",
		db_def: "策略",
		db_def1: "奇袭粮道",
		db_def2: "开城诱敌",
		cooperation_damage: "同仇",
		cooperation_damage_info: "双方累计造成至少4点伤害",
		cooperation_draw: "并进",
		cooperation_draw_info: "双方累计摸至少八张牌",
		cooperation_discard: "疏财",
		cooperation_discard_info: "双方累计弃置至少4种花色的牌",
		cooperation_use: "戮力",
		cooperation_use_info: "双方累计使用至少4种花色的牌",
		charge: "蓄力值",
		expandedSlots: "扩展装备栏",
		stratagem_fury: "怒气",
		_stratagem_add_buff: "强化",
		*/
		phaseZhunbei: "准备阶段",
		phaseJudge: "判定阶段",
		phaseDraw: "摸牌阶段",
		phaseUse: "出牌阶段",
		phaseDiscard: "弃牌阶段",
		phaseJieshu: "结束阶段",

		xueGroup:"鲜血议会",
		yongGroup:"咏歌城",
		jiGroup:"战技殿堂",
		shengGroup:"神圣教廷",
		huanGroup:"幻影联盟",
		xueGroupColor:"#7D0101",
		yongGroupColor:"#C6813C",
		jiGroupColor:"#A5BE7D",
		shengGroupColor:"#22A3C3",
		huanGroupColor:"#635282",
		jiuGuan:"酒馆",

		zhiLiao:"治疗",

		FAQ:'FAQ',
		'3xing':'3星',
		'3.5xing':'3.5星',
		'4xing':'4星',
		'4.5xing':'4.5星',
		'5xing':'5星',

		trueColor:"zhu",
		falseColor:"wei",

		_wuFaXingDong:'无法行动',
		_wuFaXingDong_qiDongQian:'无法行动-启动前',
		_wuFaXingDong_qiDongHou:'无法行动-启动后',
		
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

		_tiLian_backup:'提炼',
		_heCheng_backup:'合成',
		baoShi:'宝石',
		shuiJing:'水晶',
	};

	experimental = Experimental;

	element = {
		content: Element.Content,
		Player: Element.Player,
		Card: Element.Card,
		VCard: Element.VCard,
		Button: Element.Button,
		GameEvent: Element.GameEvent,
		GameEventPromise: Element.GameEventPromise,
		Dialog: Element.Dialog,
		Control: Element.Control,
		Client: Element.Client,
		NodeWS: Element.NodeWS,
		Character: Element.Character,
		ws: {
			onopen: function () {
				if (_status.connectCallback) {
					_status.connectCallback(true);
					delete _status.connectCallback;
				}
			},
			onmessage: function (messageevent) {
				if (messageevent.data == "heartbeat") {
					this.send("heartbeat");
					return;
				}
				var message;
				try {
					message = JSON.parse(messageevent.data);
					if (!Array.isArray(message) || typeof lib.message.client[message[0]] !== "function") {
						throw "err";
					}
					if (game.sandbox) security.enterSandbox(game.sandbox);
					try {
						for (var i = 1; i < message.length; i++) {
							message[i] = get.parsedResult(message[i]);
						}
					} finally {
						if (game.sandbox) security.exitSandbox();
					}
				} catch (e) {
					console.log(e);
					console.log("invalid message: " + messageevent.data);
					return;
				}
				lib.message.client[message.shift()].apply(null, message);
			},
			onerror: function (e) {
				if (this._nocallback) return;
				if (_status.connectCallback) {
					_status.connectCallback(false);
					delete _status.connectCallback;
				} else {
					alert("连接失败");
				}
			},
			onclose: function () {
				if (this._nocallback) return;
				if (_status.connectCallback) {
					_status.connectCallback(false);
					delete _status.connectCallback;
				}
				if (game.online || game.onlineroom) {
					if ((game.servermode || game.onlinehall) && _status.over) {
						void 0;
					} else {
						localStorage.setItem(lib.configprefix + "directstart", true);
						game.reload();
					}
				} else {
					// game.saveConfig('reconnect_info');
				}
				game.online = false;
				game.ws = null;
				game.sandbox = null;
			},
		},
		/**
		 * @legacy Use {@link lib.element.Player.prototype} instead.
		 */
		get player() {
			return this.Player.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Card.prototype} instead.
		 */
		get card() {
			return this.Card.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Button.prototype} instead.
		 */
		get button() {
			return this.Button.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.GameEvent.prototype} instead.
		 */
		get event() {
			return this.GameEvent.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Dialog.prototype} instead.
		 */
		get dialog() {
			return this.Dialog.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Control.prototype} instead.
		 */
		get control() {
			return this.Control.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Client.prototype} instead.
		 */
		get client() {
			return this.Client.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.NodeWS.prototype} instead.
		 */
		get nodews() {
			return this.NodeWS.prototype;
		},
		/**
		 * @legacy Use {@link lib.element.Character.prototype} instead.
		 */
		get character() {
			return this.Character.prototype;
		},
	};
	card = {
		/**
		 * @type { [CardBaseUIData['suit'], CardBaseUIData['number'], string][] }
		 */
		list: [],
		cooperation_damage: {
			fullskin: true,
		},
		cooperation_draw: {
			fullskin: true,
			cardimage: "cooperation_damage",
		},
		cooperation_discard: {
			fullskin: true,
			cardimage: "cooperation_damage",
		},
		cooperation_use: {
			fullskin: true,
			cardimage: "cooperation_damage",
		},
		pss_paper: {
			type: "pss",
			fullskin: true,
		},
		pss_scissor: {
			type: "pss",
			fullskin: true,
		},
		pss_stone: {
			type: "pss",
			fullskin: true,
		},
		feichu_equip1: {
			type: "equip",
			subtype: "equip1",
		},
		feichu_equip2: {
			type: "equip",
			subtype: "equip2",
		},
		feichu_equip3: {
			type: "equip",
			subtype: "equip3",
		},
		feichu_equip4: {
			type: "equip",
			subtype: "equip4",
		},
		feichu_equip5: {
			type: "equip",
			subtype: "equip5",
		},
		feichu_equip6: {
			type: "equip",
			subtype: "equip6",
		},
		empty_equip1: {
			type: "equip",
			subtype: "equip1",
		},
		empty_equip2: {
			type: "equip",
			subtype: "equip2",
		},
		empty_equip3: {
			type: "equip",
			subtype: "equip3",
		},
		empty_equip4: {
			type: "equip",
			subtype: "equip4",
		},
		empty_equip5: {
			type: "equip",
			subtype: "equip5",
		},
		empty_equip6: {
			type: "equip",
			subtype: "equip6",
		},
		zhengsu_leijin: {},
		zhengsu_mingzhi: {},
		zhengsu_bianzhen: {},
		disable_judge: {},
		group_wei: { fullskin: true },
		group_shu: { fullskin: true },
		group_wu: { fullskin: true },
		group_qun: { fullskin: true },
		group_key: { fullskin: true },
		group_jin: { fullskin: true },

		db_atk1: {
			type: "db_atk",
			fullimage: true,
		},
		db_atk2: {
			type: "db_atk",
			fullimage: true,
		},
		db_def1: {
			type: "db_def",
			fullimage: true,
		},
		db_def2: {
			type: "db_def",
			fullimage: true,
		},
	};
	filter = {
		all: () => true,
		none: () => false,
		/**
		 * Check if the card does not count toward the player's hand limit
		 *
		 * 检测此牌是否不计入此角色的手牌上限
		 * @param { Card } card
		 * @param { Player } player
		 * @returns { boolean }
		 */
		ignoredHandcard: (card, player) => game.checkMod(card, player, false, "ignoredHandcard", player),
		/**
		 * Check if the card is giftable
		 *
		 * 检测此牌是否可赠予
		 * @param { Card } card
		 * @param { Player } player
		 * @param { Player } target
		 * @param { boolean } [strict]
		 */
		cardGiftable: (card, player, target, strict) => {
			const mod = game.checkMod(card, player, target, "unchanged", "cardGiftable", player);
			if (!mod || (strict && ((mod == "unchanged" && (get.position(card) != "h" || !get.cardtag(card, "gifts"))) || player == target))) return false;
			return get.type(card, target) != "equip" || target.canEquip(card, true);
		},
		/**
		 * Check if the card is recastable
		 *
		 * 检查此牌是否可重铸
		 * @param { Card } card
		 * @param { Player } player
		 * @param { Player } [source]
		 * @param { boolean } [strict]
		 */
		cardRecastable: (card, player = get.owner(card), source, strict) => {
			if (!player) {
				if (player === null) console.trace(`cardRecastable的player参数不应传入null,可以用void 0或undefined占位`);
				player = get.owner(card);
			}
			const mod = game.checkMod(card, player, source, "unchanged", "cardRecastable", player);
			if (!mod) return false;
			if (strict && mod == "unchanged") {
				if (get.position(card) != "h") return false;
				const info = get.info(card),
					recastable = info.recastable || info.chongzhu;
				return Boolean(typeof recastable == "function" ? recastable(_status.event, player) : recastable);
			}
			return true;
		},
		//装备栏相关
		/**
		 * @param { Card } card
		 * @param { Player } player
		 * @returns { boolean }
		 */
		canBeReplaced: function (card, player) {
			var mod = game.checkMod(card, player, "unchanged", "canBeReplaced", player);
			if (mod != "unchanged") return mod;
			return true;
		},
		//装备栏 END
		buttonIncluded: function (button) {
			return !(_status.event.excludeButton && _status.event.excludeButton.includes(button));
		},
		filterButton: function (button) {
			return true;
		},
		cardSavable: function (card, player, target) {
			if (get.itemtype(card) == "card") {
				var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
				if (mod2 != "unchanged") return mod2;
			}
			var mod = game.checkMod(card, player, target, "unchanged", "cardSavable", player);
			if (mod != "unchanged") return mod;
			var savable = get.info(card).savable;
			if (typeof savable == "function") savable = savable(card, player, target);
			return savable;
		},
		/**
		 *
		 * @param {GameEvent} event
		 * @param {Player} player
		 * @param {string} triggername
		 * @param {string} skill
		 * @returns {boolean}
		 */
		filterTrigger: function (event, player, triggername, skill, indexedData) {
			if (
				player._hookTrigger &&
				player._hookTrigger.some(i => {
					const info = lib.skill[i].hookTrigger;
					return info && info.block && info.block(event, player, triggername, skill);
				})
			)
				return false;
			const info = get.info(skill);
			if (!info) {
				console.error(new ReferenceError("缺少info的技能:", skill));
				return false;
			}
			if (!game.expandSkills(player.getSkills("invisible").concat(lib.skill.global)).includes(skill)) return false;
			if (!game.expandSkills(player.getSkills(false).concat(lib.skill.global)).includes(skill)) {
				//hiddenSkills
				if (get.mode() != "guozhan") return false;
				if (info.noHidden) return false;
			}
			if (!info.forceDie && player.isDead()) return false;
			if (!info.forceOut && (player.isOut() || player.removed)) return false;
			if (!info.trigger) return false;
			if (
				!Object.keys(info.trigger).some(role => {
					if (role != "global" && player != event[role]) return false;
					if (Array.isArray(info.trigger[role])) return info.trigger[role].includes(triggername);
					return info.trigger[role] == triggername;
				})
			)
				return false;
			if (info.filter && !info.filter(event, player, triggername, indexedData)) return false;
			//xingBei 针对启动技能，如果已经启动过了，就不能再启动了
			if(info.type=='qiDong' && event.qiDongGuo) return false;

			if (event._notrigger.includes(player) && !lib.skill.global.includes(skill)) return false;
			if (info.usable !== undefined && player.hasSkill("counttrigger") && player.storage.counttrigger) {
				let num = info.usable;
				if (typeof num === "function") num = info.usable(skill, player);
				if (typeof num === "number" && player.storage.counttrigger[skill] >= num) return false;
			}
			if (info.round && info.round - (game.roundNumber - player.storage[skill + "_roundcount"]) > 0) return false;
			for (const item in player.storage) {
				if (item.startsWith("temp_ban_")) {
					if (player.storage[item] !== true) continue;
					const skillName = item.slice(9);
					if (lib.skill[skillName]) {
						const skills = game.expandSkills([skillName]);
						if (skills.includes(skill)) return false;
					}
				}
			}
			return true;
		},
		/**
		 *
		 * @param {GameEvent} event
		 * @param {Player} player
		 * @param {string} skill
		 * @returns {boolean}
		 */
		filterEnable: function (event, player, skill) {
			const info = get.info(skill);
			if (!info) {
				console.error(new ReferenceError("缺少info的技能:", skill));
				return false;
			}
			// if (!game.expandSkills(player.getSkills('invisible').concat(lib.skill.global)).includes(skill)) return false;
			if (!game.expandSkills(player.getSkills(false).concat(lib.skill.global)).includes(skill)) {
				//hiddenSkills
				if (player.hasSkillTag("nomingzhi", false, null, true)) return false;
				if (get.mode() !== "guozhan") return false;
				if (info.noHidden) return false;
			}
			const checkEnable = enable => {
				if (typeof enable === "function") return enable(event);
				if (Array.isArray(enable)) return enable.some(i => checkEnable(i));
				if (enable === "xingDong") return event.type === "phase";
				if(enable==='wuFaXingDong') return event.firstAction === true;//专门无法行动设置启用参数
				if(enable==='gongJiOrFaShu') return event.name=='gongJi' || event.name=='faShu' || event.name=='gongJiOrFaShu';//专门攻击或法术设置启用参数
				if(enable=='faShu') return event.name=='faShu' || event.name=='gongJiOrFaShu';//专门法术设置启用参数
				if(enable=='gongJi') return event.name=='gongJi' || event.name=='gongJiOrFaShu';//专门攻击设置启用参数
				if (typeof enable === "string") return enable === event.name;
				return false;
			};
			if (!checkEnable(info.enable)) return false;
			if (info.filter && !info.filter(event, player)) return false;
			//teShu 针对特殊行动，如果不能使用特殊行动，就不能
			if(info.type=='teShu' && event.canTeShu==false) return false;

			if (info.viewAs && typeof info.viewAs !== "function") {
				if (info.viewAsFilter && info.viewAsFilter(player) === false) return false;
				if (event.filterCard && !event.filterCard(get.autoViewAs(info.viewAs, "unsure"), player, event)) return false;
			}
			if (info.usable !== undefined) {
				let num = info.usable;
				if (typeof num === "function") num = info.usable(skill, player);
				if (typeof num === "number" && get.skillCount(skill, player) >= num) return false;
			}
			if (info.chooseButton && _status.event.noButton) return false;
			if (info.round && info.round - (game.roundNumber - player.storage[skill + "_roundcount"]) > 0) return false;
			for (const item in player.storage) {
				if (!item.startsWith("temp_ban_")) continue;
				if (player.storage[item] !== true) continue;
				const skillName = item.slice(9);
				if (!lib.skill[skillName]) continue;
				const skills = game.expandSkills([skillName]);
				if (skills.includes(skill)) return false;
			}
			return true;
		},
		characterDisabled: function (i, libCharacter) {
			const args = Array.from(arguments).slice(2);
			if (!lib.character[i]) return true;
			if (lib.character[i].isUnseen) return true;
			if (!args.includes("ignoreForibidden")) {
				if (lib.config.forbidai.includes(i) || lib.character[i].isAiForbidden) return true;
			}
			if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
			if (_status.connectMode) {
				if (lib.configOL.banned.includes(i) || lib.connectBanned.includes(i)) return true;
				var double_character = false;
				if (lib.configOL.mode == "guozhan") {
					double_character = true;
				} else if (lib.configOL.double_character && (lib.configOL.mode == "identity" || lib.configOL.mode == "stone")) {
					double_character = true;
				} else if (lib.configOL.double_character_jiange && lib.configOL.mode == "versus" && _status.mode == "jiange") {
					double_character = true;
				}
				if (double_character && lib.config.forbiddouble.includes(i)) {
					return true;
				}
			} else {
				if (lib.config.banned.includes(i)) return true;
				var double_character = false;
				if (get.mode() == "guozhan") {
					double_character = true;
				} else if (get.config("double_character") && (lib.config.mode == "identity" || lib.config.mode == "stone")) {
					double_character = true;
				} else if (get.config("double_character_jiange") && lib.config.mode == "versus" && _status.mode == "jiange") {
					double_character = true;
				}
				if (double_character && lib.config.forbiddouble.includes(i)) {
					return true;
				}
			}
		},
		characterDisabled2: function (i) {
			var info = lib.character[i];
			const args = Array.from(arguments).slice(1);
			if (!info) return true;
			if (info[4]) {
				if (info.isBoss) return true;
				if (info.isHiddenBoss) return true;
				if (info.isMinskin) return true;
				if (info.isUnseen) return true;
				if (!args.includes("ignoreForibidden") && info.isAiForbidden && (!_status.event.isMine || !_status.event.isMine())) return true;
				if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
			}
			return false;
		},
		skillDisabled: function (skill) {
			if (!lib.translate[skill] || !lib.translate[skill + "_info"]) return true;
			var info = lib.skill[skill];
			if (info && !info.unique && !info.temp && !info.sub && !info.fixed && !info.vanish) {
				return false;
			}
			return true;
		},
		cardEnabled: function (card, player, event) {
			if (player == undefined) player = _status.event.player;
			if (!player) return false;
			if (get.itemtype(card) == "card") {
				var mod2 = game.checkMod(card, player, event, "unchanged", "cardEnabled2", player);
				if (mod2 != "unchanged") return mod2;
			}
			card = get.autoViewAs(card);
			if (event === "forceEnable") {
				var mod = game.checkMod(card, player, event, "unchanged", "cardEnabled", player);
				if (mod != "unchanged") return mod;
				return true;
			} else {
				var filter = get.info(card).enable;
				if (!filter) return;
				var mod = game.checkMod(card, player, event, "unchanged", "cardEnabled", player);
				if (mod != "unchanged") return mod;
				if (typeof filter == "boolean") return filter;
				if (typeof filter == "function") return filter(card, player, event);
			}
		},
		cardRespondable: function (card, player, event) {
			event = event || _status.event;
			if (event.name != "chooseToRespond") return true;
			var source = event.getParent().player;
			if (source && source != player) {
				if (source.hasSkillTag("norespond", false, [card, player, event], true)) {
					return false;
				}
			}
			if (player == undefined) player = _status.event.player;
			if (get.itemtype(card) == "card") {
				var mod2 = game.checkMod(card, player, event, "unchanged", "cardEnabled2", player);
				if (mod2 != "unchanged") return mod2;
			}
			var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
			if (mod != "unchanged") return mod;
			return true;
		},
		cardUsable2: function (card, player, event) {
			card = get.autoViewAs(card);
			var info = get.info(card);
			if (info.updateUsable == "xingDong") {
				event = event || _status.event;
				if (event.type == "chooseToUse_button") event = event.getParent();
				if (player != _status.event.player) return true;
				if (event.getParent().name != "xingDong") return true;
				if (event.getParent().player != player) return true;
			}
			var num = info.usable;
			if (typeof num == "function") num = num(card, player);
			num = game.checkMod(card, player, num, "cardUsable", player);
			if (typeof num != "number") return true;
			else return player.countUsed(card) < num;
		},
		cardUsable: function (card, player, event) {
			card = get.autoViewAs(card);
			var info = get.info(card);
			event = event || _status.event;
			if (event.type == "chooseToUse_button") event = event.getParent();
			if (player != _status.event.player) return true;
			if (info.updateUsable == "xingDong") {
				if (event.getParent().name != "xingDong") return true;
				if (event.getParent().player != player) return true;
			}
			event.addCount_extra = true;
			var num = info.usable;
			if (typeof num == "function") num = num(card, player);
			num = game.checkMod(card, player, num, "cardUsable", player);
			if (typeof num != "number") {
				return typeof num == "boolean" ? num : true;
			}
			if (player.countUsed(card) < num) return true;
			if (
				game.hasPlayer(function (current) {
					return game.checkMod(card, player, current, false, "cardUsableTarget", player);
				})
			) {
				return true;
			}
			return false;
		},
		/**
		 * player的card在event事件中能否被自己弃置
		 * @param { Card } card 要被弃置的牌
		 * @param { Player } player 执行弃牌的角色
		 * @param { string } [event] 弃置牌事件的名称
		 * @returns { boolean }
		 */
		cardDiscardable: function (card, player, event) {
			event = event || _status.event;
			if (typeof event != "string") event = event.getParent().name;
			var mod = game.checkMod(card, player, event, "unchanged", "cardDiscardable", player);
			if (mod != "unchanged") return mod;
			return true;
		},
		/**
		 * target的card在event事件中能否被player弃置
		 * @param { Card } card 要被弃置的牌
		 * @param { Player } player 执行弃牌的角色
		 * @param { Player } target 被弃置牌的现持有者
		 * @param { string } [event] 弃置牌事件的名称
		 * @returns { boolean }
		 */
		canBeDiscarded: function (card, player, target, event) {
			event = event || _status.event;
			if (typeof event != "string") event = event.getParent().name;
			var mod = game.checkMod(card, player, target, event, "unchanged", "canBeDiscarded", target);
			if (mod != "unchanged") return mod;
			return true;
		},
		/**
		 * target的card在event事件中能否被player获得
		 * @param { Card } card 要被获得的牌
		 * @param { Player } player 获得牌的角色
		 * @param { Player } target 被获得牌的现持有者
		 * @param { string } [event] 获得牌事件的名称
		 * @returns { boolean }
		 */
		canBeGained: function (card, player, target, event) {
			event = event || _status.event;
			if (typeof event != "string") event = event.getParent().name;
			var mod = game.checkMod(card, player, target, event, "unchanged", "canBeGained", target);
			if (mod != "unchanged") return mod;
			return true;
		},
		cardAiIncluded: function (card) {
			if (_status.event.isMine()) return true;
			return _status.event._aiexclude.includes(card) == false;
		},
		filterCard: function (card, player, event) {
			var info = get.info(card);
			//if(info.toself&&!lib.filter.targetEnabled(card,player,player)) return false;
			if (player == undefined) player = _status.event.player;
			if (!lib.filter.cardEnabled(card, player, event) || !lib.filter.cardUsable(card, player, event)) return false;
			if (info.notarget) return true;
			var range;
			var select = get.copy(info.selectTarget);
			if (select == undefined) {
				if (info.filterTarget == undefined) return true;
				range = [1, 1];
			} else if (typeof select == "number") range = [select, select];
			else if (get.itemtype(select) == "select") range = select;
			else if (typeof select == "function") range = select(card, player);
			game.checkMod(card, player, range, "selectTarget", player);
			if (!range || range[1] != -1) return true;
			var filterTarget = event && event.filterTarget ? event.filterTarget : lib.filter.filterTarget;
			return game.hasPlayer(function (current) {
				return filterTarget(card, player, current);
			});
		},
		targetEnabledx: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			let event = _status.event,
				evt = event.getParent("chooseToUse");
			if (get.itemtype(evt) !== "event") evt = event;
			if (event._backup && event._backup.filterCard == lib.filter.filterCard && (!lib.filter.cardEnabled(card, player, event) || !lib.filter.cardUsable(card, player, evt))) return false;
			if (event.addCount_extra) {
				if (!lib.filter.cardUsable2(card, player) && !game.checkMod(card, player, target, false, "cardUsableTarget", player)) return false;
			}
			var info = get.info(card);
			if (info.singleCard && info.filterAddedTarget && ui.selected.targets.length) return Boolean(info.filterAddedTarget(card, player, target, ui.selected.targets[ui.selected.targets.length - 1]));
			return lib.filter.targetEnabled.apply(this, arguments);
		},
		targetEnabled: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			var info = get.info(card);
			var filter = info.filterTarget;
			if (!info.singleCard || ui.selected.targets.length == 0) {
				var mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
				if (mod != "unchanged") return mod;
				var mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
				if (mod != "unchanged") return mod;
			}
			if (typeof filter == "boolean") return filter;
			if (typeof filter == "function") return Boolean(filter(card, player, target));
		},
		targetEnabled2: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			if (lib.filter.targetEnabled(card, player, target)) return true;

			if (game.checkMod(card, player, target, "unchanged", "playerEnabled", player) == false) return false;
			if (game.checkMod(card, player, target, "unchanged", "targetEnabled", target) == false) return false;

			var filter = get.info(card).modTarget;
			if (typeof filter == "boolean") return filter;
			if (typeof filter == "function") return Boolean(filter(card, player, target));
			return false;
		},
		targetEnabled3: function (card, player, target) {
			if (!card) return false;
			if (!target || !target.isIn()) return false;
			var info = get.info(card);

			if (info.filterTarget == true) return true;
			if (typeof info.filterTarget == "function" && info.filterTarget(card, player, target)) return true;

			if (info.modTarget == true) return true;
			if (typeof info.modTarget == "function" && info.modTarget(card, player, target)) return true;
			return false;
		},
		targetInRange: function (card, player, target) {
			var info = get.info(card);
			var range = info.range;
			var outrange = info.outrange;
			if (range == undefined && outrange == undefined) return true;

			var mod = game.checkMod(card, player, target, "unchanged", "targetInRange", player);
			var extra = 0;
			if (mod != "unchanged") {
				if (typeof mod == "boolean") return mod;
				if (typeof mod == "number") extra = mod;
			}
			if (typeof info.range == "function") return info.range(card, player, target);

			if (player.hasSkill("undist") || target.hasSkill("undist")) return false;
			for (var i in range) {
				if (i == "attack") {
					var range2 = player.getAttackRange();
					if (range2 <= 0) return false;
					var distance = get.distance(player, target) + extra;
					if (range[i] <= distance - range2) return false;
				} else {
					var distance = get.distance(player, target, i) + extra;
					if (range[i] < distance) return false;
				}
			}
			for (var i in outrange) {
				if (i == "attack") {
					var range2 = player.getAttackRange();
					if (range2 <= 0) return false;
					var distance = get.distance(player, target) + extra;
					if (outrange[i] > distance - range2 + 1) return false;
				} else {
					var distance = get.distance(player, target, i) + extra;
					if (outrange[i] > distance) return false;
				}
			}
			return true;
		},
		filterTarget: function (card, player, target) {
			return lib.filter.targetEnabledx(card, player, target) && lib.filter.targetInRange(card, player, target);
		},
		filterTarget2: function (card, player, target) {
			return lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
		},
		notMe: function (card, player, target) {
			return player != target;
		},
		isMe: function (card, player, target) {
			return player == target;
		},
		attackFrom: function (card, player, target) {
			return get.distance(player, target, "attack") <= 1;
		},
		globalFrom: function (card, player, target) {
			return get.distance(player, target) <= 1;
		},
		selectCard: function () {
			return [1, 1];
		},
		selectTarget: function (card, player) {
			if (!card) card = get.card();
			if (!player) player = get.player();
			if (card == undefined) return;
			var range,
				info = get.info(card);
			var select = get.copy(info.selectTarget);
			if (select == undefined) {
				if (info.filterTarget == undefined) return [0, 0];
				range = [1, 1];
			} else if (typeof select == "number") range = [select, select];
			else if (get.itemtype(select) == "select") range = select;
			else if (typeof select == "function") range = select(card, player);
			game.checkMod(card, player, range, "selectTarget", player);
			if (info.singleCard && info.filterAddedTarget) return [range[0] * 2, range[1] * 2];
			return range;
		},
		judge: function (card, player, target) {
			return target.canAddJudge(card);
		},
		autoRespondSha: function () {
			return !this.player.hasSha(true);
		},
		autoRespondShan: function () {
			return !this.player.hasShan();
		},
		wuxieSwap: function (event) {
			if (event.type == "wuxie") {
				if (ui.wuxie && ui.wuxie.classList.contains("glow")) {
					return true;
				}
				if (ui.tempnowuxie && ui.tempnowuxie.classList.contains("glow") && event.state > 0) {
					var triggerevent = event.getTrigger();
					if (triggerevent) {
						if (ui.tempnowuxie._origin == triggerevent.parent.id) {
							return true;
						}
					} else if (ui.tempnowuxie._origin == _status.event.id2) {
						return true;
					}
				}
				if (lib.config.wuxie_self) {
					var tw = event.info_map;
					if (tw.player && tw.player.isUnderControl(true) && !tw.player.hasSkillTag("noautowuxie") && (!tw.targets || tw.targets.length <= 1) && !tw.noai) {
						return true;
					}
				}
			}
		},
	};
	sort = {
		nature: function (a, b) {
			return (lib.nature.get(b) || 0) - (lib.nature.get(a) || 0);
		},
		group: function (a, b) {
			const groupSort = function (group) {
				let base = 0;
				if (group == "jiGroup") return base;
				if (group == "huanGroup") return base + 1;
				if (group == "xueGroup") return base + 2;
				if (group == "yongGroup") return base + 3;
				if (group == "shengGroup") return base + 4;
				//if (group == "key") return base + 5;
				//if (group == "western") return base + 6;
				//if (group == "shen") return base + 7;
				//if (group == "double") return base + 7;
				return base + 9;
			};
			return groupSort(a) - groupSort(b);
		},
		character: function (a, b) {
			const groupSort = function (name) {
				const info = get.character(name);
				if (!info) return 7;
				let base = 0;
				if (get.is.double(name, true)) base = 9;
				const group = info[1];
				if (group == "jiGroup") return base;
				if (group == "huanGroup") return base + 1;
				if (group == "xueGroup") return base + 2;
				if (group == "yongGroup") return base + 3;
				if (group == "shengGroup") return base + 4;
				return base + 7;
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
		},
		card: function (a, b) {
			var typeSort = function (name) {
				var type = get.type(name);
				if (!type) return 10;
				if (type == "gongJi") return -1;
				if (type == "faShu") return 0;
				/*
				if (type == "delay") return 1;
				if (type == "equip") {
					var type2 = get.subtype(name, false);
					if (type2 && type2.slice) return 1 + parseInt(type2.slice(5) || 7);
					return 8.5;
				}*/
				return 9;
			};
			var del = typeSort(a) - typeSort(b);
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
		},
		random: function () {
			return Math.random() - 0.5;
		},
		seat: function (a, b) {
			var player = lib.tempSortSeat || _status.event.player || game.me || game.players[0];
			var delta = get.distance(player, a, "absolute") - get.distance(player, b, "absolute");
			if (delta) return delta;
			delta = parseInt(a.dataset.position) - parseInt(b.dataset.position);
			if (player.side == game.me.side) return delta;
			return -delta;
		},
		position: function (a, b) {
			return parseInt(a.dataset.position) - parseInt(b.dataset.position);
		},
		priority: function (a, b) {
			var i1 = get.info(a[0]),
				i2 = get.info(b[0]);
			if (i1.priority == undefined) i1.priority = 0;
			if (i2.priority == undefined) i2.priority = 0;
			if (i1.priority == i2.priority) {
				if (i1.forced == undefined && i2.forced == undefined) return 0;
				if (i1.forced && i2.forced) return 0;
				if (i1.forced) return 1;
				if (i2.forced) return -1;
			}
			return i2.priority - i1.priority;
		},
		number: function (a, b) {
			return get.mingGe(a) - get.mingGe(b);
		},
		number2: function (a, b) {
			return get.mingGe(b) - get.mingGe(a);
		},
		capt: function (a, b) {
			var aa = a,
				bb = b;
			var firstUnderscoreIndexAA = aa.indexOf("_");
			var firstUnderscoreIndexBB = bb.indexOf("_");
			var secondUnderscoreIndexAA = firstUnderscoreIndexAA != -1 ? aa.indexOf("_", firstUnderscoreIndexAA + 1) : -1;
			var secondUnderscoreIndexBB = firstUnderscoreIndexBB != -1 ? bb.indexOf("_", firstUnderscoreIndexBB + 1) : -1;

			if (secondUnderscoreIndexAA != -1) {
				aa = aa.slice(secondUnderscoreIndexAA + 1);
			} else if (firstUnderscoreIndexAA != -1) {
				aa = aa.slice(firstUnderscoreIndexAA + 1);
			}

			if (secondUnderscoreIndexBB != -1) {
				bb = bb.slice(secondUnderscoreIndexBB + 1);
			} else if (firstUnderscoreIndexBB != -1) {
				bb = bb.slice(firstUnderscoreIndexBB + 1);
			}

			if (aa != bb) {
				return aa > bb ? 1 : -1;
			}
			return a > b ? 1 : -1;
		},
		name: function (a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
		},
	};
	/**
	 * @type {{
	 * 	global: string[];
	 * 	globalmap: SMap<Player[]>;
	 * 	storage: SMap<any>;
	 * 	undist: SMap<any>;
	 * 	thers: SMap<any>;
	 * 	zhu: SMap<any>;
	 * 	zhuSkill: SMap<any>;
	 * 	land_used: SMap<any>;
	 * 	[key: string]: Skill;
	 * }}
	 */
	skill = {
		/*
		stratagem_fury: {
			marktext: "🔥",
			intro: {
				name: "怒气",
				content: (storage, player) => {
					const stratagemFuryMax = _status.stratagemFuryMax,
						fury = storage || 0;
					return `当前怒气值：${typeof stratagemFuryMax == "number" ? `${fury}/${stratagemFuryMax}` : fury}`;
				},
			},
		},
		_stratagem_add_buff: {
			log: false,
			enable: "chooseToUse",
			filter: (event, player) => {
				const fury = player.storage.stratagem_fury;
				if (!fury) return false;
				const stratagemSettings = event.stratagemSettings;
				if (!stratagemSettings || (!stratagemSettings.roundOneUseFury && game.roundNumber < 2)) return false;
				const cards = player.getCards("hs");
				if (!cards.length) return false;
				const cost = lib.stratagemBuff.cost,
					names = Array.from(cost.keys());
				if (!names.length) return false;
				return cards.some(
					card =>
						game.checkMod(card, player, "unchanged", "cardEnabled2", player) &&
						names.some(
							availableName =>
								availableName == get.name(card, player) &&
								event.filterCard(
									new lib.element.VCard({
										name: availableName,
										nature: get.duYou(card, player),
										isCard: true,
										cards: [card],
									}),
									player,
									event
								) &&
								fury >= cost.get(availableName)
						)
				);
			},
			onChooseToUse: event => {
				const player = _status.event.player,
					fury = player.storage.stratagem_fury;
				if (!fury) return;
				if (!event.stratagemSettings && !game.online)
					event.set("stratagemSettings", {
						roundOneUseFury: _status.connectMode ? lib.configOL.round_one_use_fury : get.config("round_one_use_fury"),
					});
				const cost = lib.stratagemBuff.cost.get("shan");
				if (typeof cost != "number" || !event.shanRequired) return;
				event.addNumber(
					"shanIgnored",
					Math.min(
						player.countCards(lib.skill._stratagem_add_buff.position, {
							name: "shan",
						}),
						Math.floor(fury / cost)
					)
				);
			},
			check: card => {
				const player = _status.event.player;
				if (_status.event.type == "phase") {
					const cardName = get.name(card, player);
					if (cardName == "sha") {
						if (
							game.hasPlayer(current => {
								if (!player.canUse(card, current)) return false;
								const storage = player.storage,
									zhibi = storage.zhibi;
								return (
									((zhibi && !zhibi.includes(current)) || get.effect(current, card, player, player) >= 2 - Math.max(0, (storage.stratagem_fury || 0) - 1)) &&
									current.mayHaveShan(
										player,
										"use",
										current.getCards("h", i => {
											return i.hasGaintag("sha_notshan");
										})
									) &&
									player.hasSkill("jiu")
								);
							})
						)
							return 1;
						return 0;
					}
					if (cardName == "tao") {
						if (player.hp <= 2 && player.getDamagedHp() >= 2) return 1;
						return 0;
					}
					return 1;
				}
				if (_status.event.type == "dying") return get.attitude(player, _status.event.dying) > 3 ? 1 : 0;
				return (_status.event.getParent().shanRequired || 1) > 1 && get.damageEffect(player, _status.event.getParent().player || player, player) < 0 ? 1 : 0;
			},
			position: "hs",
			filterCard: (card, player, event) => {
				if (!event) event = _status.event;
				const filterCard = event._backup.filterCard;
				const cost = lib.stratagemBuff.cost;
				return Array.from(cost.keys()).some(
					availableName =>
						availableName == get.name(card, player) &&
						filterCard(
							new lib.element.VCard({
								name: availableName,
								nature: get.duYou(card, player),
								isCard: true,
								cards: [card],
							}),
							player,
							_status.event
						) &&
						player.storage.stratagem_fury >= cost.get(availableName)
				);
			},
			viewAs: (cards, player) => {
				if (cards.length) {
					const cardName = get.name(cards[0], player);
					return cardName
						? new lib.element.VCard({
								name: cardName,
								nature: get.duYou(cards[0], player),
								suit: get.suit(cards[0], player),
								number: get.mingGe(cards[0], player),
								isCard: true,
								cards: [cards[0]],
								storage: {
									stratagem_buffed: 1,
								},
							})
						: new lib.element.VCard();
				}
				return null;
			},
			prompt: () => {
				const span = document.createElement("span");
				span.classList.add("text");
				span.style.fontFamily = "yuanli";
				const stratagemBuff = lib.stratagemBuff,
					cost = stratagemBuff.cost;
				stratagemBuff.prompt.forEach((prompt, cardName) => {
					const li = document.createElement("li");
					li.innerHTML = `【${get.translation(cardName)}】：${cost.get(cardName)}点怒气。${prompt()}`;
					span.appendChild(li);
				});
				return `当你需要使用位于“强化表”内的非虚拟卡牌时，你可以消耗对应数量的怒气将其强化并使用。${document.createElement("hr").outerHTML}${span.outerHTML}`;
			},
			onuse: (result, player) => {
				player.logSkill(result.skill);
				const stratagemBuff = lib.stratagemBuff,
					cardName = result.card.name;
				player.changeFury(-stratagemBuff.cost.get(cardName), true);
				const gameEvent = get.event(),
					effect = stratagemBuff.effect.get(cardName);
				if (typeof effect == "function") gameEvent.pushHandler("onNextUseCard", effect);
				gameEvent.pushHandler("onNextUseCard", (event, option) => {
					if (event.step == 0 && option.state == "end") game.broadcastAll(cards => cards.forEach(card => card.clone.classList.add("stratagem-fury-glow")), event.cards);
				});
			},
			ai: {
				order: (item, player) => {
					if (!player) player = _status.event.player;
					if (_status.event.type == "phase")
						for (const card of player.getCards("hs")) {
							if (!game.checkMod(card, player, "unchanged", "cardEnabled2", player)) continue;
							const cardName = get.name(card, player);
							if (cardName == "sha") {
								if (
									game.hasPlayer(current => {
										if (!player.canUse(card, current)) return false;
										const storage = player.storage,
											zhibi = storage.zhibi;
										return (
											((zhibi && !zhibi.includes(current)) || get.effect(current, card, player, player) >= 2 - Math.max(0, (storage.stratagem_fury || 0) - 1)) &&
											current.mayHaveShan(
												player,
												"use",
												current.getCards("h", i => {
													return i.hasGaintag("sha_notshan");
												})
											)
										);
									})
								)
									return get.order(card, player) + 0.5;
							} else if (cardName == "tao" && player.hp <= 2 && player.getDamagedHp() >= 2) return get.order(card, player) + 0.5;
							return 8;
						}
					return 3.5;
				},
				directHit_ai: true,
				skillTagFilter: (player, tag, arg) => {
					const card = get.autoViewAs(arg.card);
					if (card.name != "sha" || !card.storage.stratagem_buffed) return false;
					const target = arg.target;
					if (target.countCards("h", "shan") >= 1 && !target.storage.stratagem_fury) return false;
				},
			},
		},
		expandedSlots: {
			markimage: "image/card/expandedSlots.png",
			intro: {
				markcount: function (storage, player) {
					var all = 0,
						storage = player.expandedSlots;
					if (!storage) return 0;
					for (var key in storage) {
						var num = storage[key];
						if (typeof num == "number" && num > 0) {
							all += num;
						}
					}
					return all;
				},
				content: function (storage, player) {
					storage = player.expandedSlots;
					if (!storage) return "当前没有扩展装备栏";
					const keys = Object.keys(storage).sort(),
						combined = get.is.mountCombined();
					let str = "";
					for (const key of keys) {
						const num = storage[key];
						if (typeof num == "number" && num > 0) {
							let trans = get.translation(key);
							if (combined && key == "equip3") trans = "坐骑";
							str += "<li>" + trans + "栏：" + num + "个<br>";
						}
					}
					if (str.length) return str.slice(0, str.length - 4);
					return "当前没有扩展装备栏";
				},
			},
		},
		charge: {
			markimage: "image/card/charge.png",
			intro: {
				content(storage, player) {
					const max = player.getMaxCharge();
					return `当前蓄力点数：${storage}/${max}`;
				},
			},
		},
		cooperation: {
			charlotte: true,
			trigger: {
				global: ["phaseAfter", "dieAfter"],
			},
			forced: true,
			lastDo: true,
			filter: function (event, player) {
				if (event.name == "die" && event.player.isAlive()) return false;
				var storage = player.getStorage("cooperation");
				for (var info of storage) {
					if (info.target == event.player) return true;
				}
				return false;
			},
			content: function () {
				for (var i = 0; i < player.storage.cooperation.length; i++) {
					var info = player.storage.cooperation[i];
					if (info.target == trigger.player) {
						player.removeCooperation(info);
						i--;
					}
				}
			},
			onremove: function (player, skill) {
				var storage = player.getStorage(skill);
				var reasons = [];
				for (var i of storage) reasons.add(i.type);
				for (var i of reasons) player.removeSkill(skill + "_" + i);
				delete player.storage[i];
			},
			subSkill: {
				damage: {
					mark: true,
					trigger: { global: "damage" },
					forced: true,
					charlotte: true,
					popup: false,
					nopop: true,
					firstDo: true,
					filter: function (event, player) {
						if (!event.source) return false;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "damage" && (event.source == player || event.source == info.target)) return true;
						}
						return false;
					},
					checkx: info => info.damage && info.damage > 3,
					content: function () {
						var source = trigger.source;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "damage" && (source == player || source == info.target)) {
								if (!info.damage) info.damage = 0;
								info.damage += trigger.num;
							}
						}
						player.markSkill("cooperation_damage");
					},
					marktext: "仇",
					intro: {
						name: "协力 - 同仇",
						markcount: function (storage, player) {
							return Math.max.apply(
								Math,
								player.getStorage("cooperation").map(function (info) {
									return info.damage || 0;
								})
							);
						},
						content: function (storage, player) {
							var str = "",
								storage = player.getStorage("cooperation");
							for (var info of storage) {
								if (info.type == "damage") {
									str += "<br><li>协力角色：" + get.translation(info.target);
									str += "<br><li>协力原因：" + get.translation(info.reason);
									str += "<br><li>协力进度：";
									var num = info.damage || 0;
									str += num;
									str += "/4";
									str += num > 3 ? " (已完成)" : " (未完成)";
									str += "<br>　　";
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
				draw: {
					mark: true,
					trigger: { global: "gainAfter" },
					forced: true,
					charlotte: true,
					popup: false,
					nopop: true,
					firstDo: true,
					filter: function (event, player) {
						if (event.getParent().name != "draw") return false;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "draw" && (event.player == player || event.player == info.target)) return true;
						}
						return false;
					},
					checkx: info => info.draw && info.draw > 7,
					content: function () {
						var source = trigger.player;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "draw" && (source == player || source == info.target)) {
								if (!info.draw) info.draw = 0;
								info.draw += trigger.cards.length;
							}
						}
						player.markSkill("cooperation_draw");
					},
					marktext: "进",
					intro: {
						name: "协力 - 并进",
						markcount: function (storage, player) {
							return Math.max.apply(
								Math,
								player.getStorage("cooperation").map(function (info) {
									return info.draw || 0;
								})
							);
						},
						content: function (storage, player) {
							var str = "",
								storage = player.getStorage("cooperation");
							for (var info of storage) {
								if (info.type == "draw") {
									str += "<br><li>协力角色：" + get.translation(info.target);
									str += "<br><li>协力原因：" + get.translation(info.reason);
									str += "<br><li>协力进度：";
									var num = info.draw || 0;
									str += num;
									str += "/8";
									str += num > 7 ? " (已完成)" : " (未完成)";
									str += "<br>　　";
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
				discard: {
					mark: true,
					trigger: { global: "loseAfter" },
					forced: true,
					charlotte: true,
					popup: false,
					nopop: true,
					firstDo: true,
					filter: function (event, player) {
						if (event.type != "discard") return false;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "discard" && (event.player == player || event.player == info.target)) return true;
						}
						return false;
					},
					checkx: info => info.discard && info.discard.length > 3,
					content: function () {
						var source = trigger.player;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "discard" && (source == player || source == info.target)) {
								if (!info.discard) info.discard = [];
								for (var i of trigger.cards2) {
									var suit = get.suit(i, player);
									if (lib.suit.includes(suit)) info.discard.add(suit);
								}
							}
						}
						player.markSkill("cooperation_discard");
					},
					marktext: "财",
					intro: {
						name: "协力 - 疏财",
						markcount: function (storage, player) {
							return Math.max.apply(
								Math,
								player.getStorage("cooperation").map(function (info) {
									return info.discard ? info.discard.length : 0;
								})
							);
						},
						content: function (storage, player) {
							var str = "",
								storage = player.getStorage("cooperation");
							for (var info of storage) {
								if (info.type == "discard") {
									str += "<br><li>协力角色：" + get.translation(info.target);
									str += "<br><li>协力原因：" + get.translation(info.reason);
									str += "<br><li>进度：";
									var suits = info.discard || [];
									var suits2 = [
										["spade", "♠", "♤"],
										["heart", "♥", "♡"],
										["club", "♣", "♧"],
										["diamond", "♦", "♢"],
									];
									for (var i of suits2) {
										str += suits.includes(i[0]) ? i[1] : i[2];
									}
									str += suits.length > 3 ? " (已完成)" : " (未完成)";
									str += "<br>　　";
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
				use: {
					mark: true,
					trigger: { global: "useCard1" },
					forced: true,
					charlotte: true,
					popup: false,
					nopop: true,
					firstDo: true,
					filter: function (event, player) {
						var suit = get.suit(event.card);
						if (!lib.suit.includes(suit)) return false;
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "use" && (event.player == player || event.player == info.target) && (!info.used || !info.used.includes(suit))) return true;
						}
						return false;
					},
					checkx: info => info.used && info.used.length > 3,
					content: function () {
						var source = trigger.player,
							suit = get.suit(trigger.card);
						var storage = player.getStorage("cooperation");
						for (var info of storage) {
							if (info.type == "use" && (source == player || source == info.target)) {
								if (!info.used) info.used = [];
								info.used.add(suit);
							}
						}
						player.markSkill("cooperation_use");
					},
					marktext: "戮",
					intro: {
						name: "协力 - 戮力",
						markcount: function (storage, player) {
							return Math.max.apply(
								Math,
								player.getStorage("cooperation").map(function (info) {
									return info.used ? info.used.length : 0;
								})
							);
						},
						content: function (storage, player) {
							var str = "",
								storage = player.getStorage("cooperation");
							for (var info of storage) {
								if (info.type == "use") {
									str += "<br><li>协力角色：" + get.translation(info.target);
									str += "<br><li>协力原因：" + get.translation(info.reason);
									str += "<br><li>进度：";
									var suits = info.used || [];
									var suits2 = [
										["spade", "♠", "♤"],
										["heart", "♥", "♡"],
										["club", "♣", "♧"],
										["diamond", "♦", "♢"],
									];
									for (var i of suits2) {
										str += suits.includes(i[0]) ? i[1] : i[2];
									}
									str += suits.length > 3 ? " (已完成)" : " (未完成)";
									str += "<br>　　";
								}
							}
							return str.slice(4, str.length - 6);
						},
					},
				},
			},
		},
		zhengsu: {
			trigger: { player: "phaseDiscardEnd" },
			forced: true,
			charlotte: true,
			filter: function (event, player) {
				return player.storage.zhengsu_leijin || player.storage.zhengsu_bianzhen || player.storage.zhengsu_mingzhi;
			},
			filterx: function (skill, player) {
				const zhengsus = player.storage[skill];
				if (!zhengsus || !zhengsus.length) return false;
				return zhengsus.some(zhengsu => player.storage[zhengsu]);
			},
			async content(event, trigger, player) {
				await player.chooseDrawRecover(2, "整肃奖励：摸两张牌或回复1点体力", true);
			},
			subSkill: {
				leijin: {
					mod: {
						aiOrder: function (player, card, num) {
							if (typeof card.number != "number") return;
							var history = player.getHistory("useCard", evt => evt.isPhaseUsing());
							if (history.length == 0) return num + 10 * (14 - card.number);
							var num = get.mingGe(history[0].card);
							if (!num) return;
							for (var i = 1; i < history.length; i++) {
								var num2 = get.mingGe(history[i].card);
								if (!num2 || num2 <= num) return;
								num = num2;
							}
							if (card.number > num) return num + 10 * (14 - card.number);
						},
					},
					mark: true,
					trigger: { player: "useCard1" },
					lastDo: true,
					charlotte: true,
					forced: true,
					popup: false,
					nopop: true,
					onremove: true,
					filter: function (event, player) {
						return player.isPhaseUsing() && player.storage.zhengsu_leijin !== false;
					},
					content: function () {
						var list = player.getHistory("useCard", function (evt) {
							return evt.isPhaseUsing(player);
						});
						var goon = true;
						for (var i = 0; i < list.length; i++) {
							var num = get.mingGe(list[i].card);
							if (typeof num != "number") {
								goon = false;
								break;
							}
							if (i > 0) {
								var num2 = get.mingGe(list[i - 1].card);
								if (typeof num2 != "number" || num2 >= num) {
									goon = false;
									break;
								}
							}
						}
						if (!goon) {
							game.broadcastAll(function (player) {
								player.storage.zhengsu_leijin = false;
								if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = "╳";
								delete player.storage.zhengsu_leijin_markcount;
							}, player);
						} else {
							if (list.length > 2) {
								game.broadcastAll(
									function (player, num) {
										if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = "○";
										player.storage.zhengsu_leijin = true;
										player.storage.zhengsu_leijin_markcount = num;
									},
									player,
									num
								);
							} else
								game.broadcastAll(
									function (player, num) {
										player.storage.zhengsu_leijin_markcount = num;
									},
									player,
									num
								);
						}
						player.markSkill("zhengsu_leijin");
					},
					intro: {
						content: "<li>条件：回合内所有于出牌阶段使用的牌点数递增且不少于三张。",
					},
				},
				bianzhen: {
					mark: true,
					trigger: { player: "useCard1" },
					firstDo: true,
					charlotte: true,
					forced: true,
					popup: false,
					nopop: true,
					onremove: true,
					filter: function (event, player) {
						return player.isPhaseUsing() && player.storage.zhengsu_bianzhen !== false;
					},
					content: function () {
						var list = player.getHistory("useCard", function (evt) {
							return evt.isPhaseUsing();
						});
						var goon = true,
							suit = get.suit(list[0].card, false);
						if (suit == "none") {
							goon = false;
						} else {
							for (var i = 1; i < list.length; i++) {
								if (get.suit(list[i]) != suit) {
									goon = false;
									break;
								}
							}
						}
						if (!goon) {
							game.broadcastAll(function (player) {
								player.storage.zhengsu_bianzhen = false;
								if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = "╳";
							}, player);
						} else {
							if (list.length > 1) {
								game.broadcastAll(function (player) {
									if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = "○";
									player.storage.zhengsu_bianzhen = true;
								}, player);
							} else
								game.broadcastAll(
									function (player, suit) {
										if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = get.translation(suit);
									},
									player,
									suit
								);
						}
						player.markSkill("zhengsu_bianzhen");
					},
					intro: {
						content: "<li>条件：回合内所有于出牌阶段使用的牌花色相同且不少于两张。",
					},
					ai: {
						effect: {
							player_use: function (card, player, target) {
								if (typeof card != "object" || !player.isPhaseUsing()) return;
								var suitx = get.suit(card);
								var history = player.getHistory("useCard");
								if (!history.length) {
									var val = 0;
									if (
										player.hasCard(function (cardx) {
											return get.suit(cardx) == suitx && card != cardx && (!card.cards || !card.cards.includes(cardx)) && player.hasValueTarget(cardx);
										}, "hs")
									)
										val = [2, 0.1];
									if (val) return val;
									return;
								}
								var num = 0;
								var suit = false;
								for (var i = 0; i < history.length; i++) {
									var suit2 = get.suit(history[i].card);
									if (!lib.suit.includes(suit2)) return;
									if (suit && suit != suit2) return;
									suit = suit2;
									num++;
								}
								if (suitx == suit && num == 1) return [1, 0.1];
								if (
									suitx != suit &&
									(num > 1 ||
										(num <= 1 &&
											player.hasCard(function (cardx) {
												return get.suit(cardx) == suit && player.hasValueTarget(cardx);
											}, "hs")))
								)
									return "zeroplayertarget";
							},
						},
					},
				},
				mingzhi: {
					mark: true,
					trigger: { player: "loseAfter" },
					firstDo: true,
					charlotte: true,
					forced: true,
					popup: false,
					nopop: true,
					onremove: true,
					filter: function (event, player) {
						if (player.storage.zhengsu_mingzhi === false || event.type != "discard") return false;
						var evt = event.getParent("phaseDiscard");
						return evt && evt.player == player;
					},
					content: function () {
						var goon = true,
							list = [];
						player.getHistory("lose", function (event) {
							if (!goon || event.type != "discard") return false;
							var evt = event.getParent("phaseDiscard");
							if (evt && evt.player == player) {
								for (var i of event.cards2) {
									var suit = get.suit(i, player);
									if (list.includes(suit)) {
										goon = false;
										break;
									} else list.push(suit);
								}
							}
						});
						if (!goon) {
							game.broadcastAll(function (player) {
								player.storage.zhengsu_mingzhi = false;
								if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = "╳";
								delete player.storage.zhengsu_mingzhi_list;
							}, player);
						} else {
							if (list.length > 1) {
								game.broadcastAll(
									function (player, list) {
										if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = "○";
										player.storage.zhengsu_mingzhi = true;
										player.storage.zhengsu_mingzhi_list = list;
										player.storage.zhengsu_mingzhi_markcount = list.length;
									},
									player,
									list
								);
							} else
								game.broadcastAll(
									function (player, list) {
										player.storage.zhengsu_mingzhi_list = list;
										player.storage.zhengsu_mingzhi_markcount = list.length;
									},
									player,
									list
								);
						}
						player.markSkill("zhengsu_mingzhi");
					},
					intro: {
						content: "<li>条件：回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。",
					},
				},
			},
		},
		renku: {
			intro: {
				markcount: function () {
					return _status.renku.length;
				},
				mark: function (dialog, content, player) {
					if (!_status.renku.length) return "仁库中没有牌";
					else dialog.addAuto(_status.renku);
				},
				content: function () {
					if (!_status.renku.length) return "仁库中没有牌";
					return get.translation(_status.renku);
				},
			},
		},
		_showHiddenCharacter: {
			trigger: { player: ["changeHp", "phaseBeginStart", "loseMaxHpBegin", "gainMaxHpBegin"] },
			firstDo: true,
			forced: true,
			popup: false,
			priority: 25,
			filter: function (event, player, name) {
				return player.isUnseen(2) && get.mode() != "guozhan";
			},
			content: function () {
				player.showCharacter(2);
				player.removeSkill("g_hidden_ai");
			},
		},
		_kamisha: {
			trigger: { source: "damageBegin2" },
			//forced:true,
			popup: false,
			prompt: function (event, player) {
				return "是否防止即将对" + get.translation(event.player) + "造成的伤害，改为令其减少" + get.cnNumber(event.num) + "点体力上限？";
			},
			filter: function (event, player) {
				return event.hasDuYou("kami") && event.num > 0;
			},
			ruleSkill: true,
			check: function (event, player) {
				var att = get.attitude(player, event.player);
				if (event.player.hp == event.player.maxHp) return att < 0;
				if (event.player.hp == event.player.maxHp - 1 && (event.player.maxHp <= 3 || event.player.hasSkillTag("maixie"))) return att < 0;
				return att > 0;
			},
			content: function () {
				trigger.cancel();
				trigger.player.loseMaxHp(trigger.num).source = player;
			},
		},
		*/
		_doublegroup_choice: {
			trigger: {
				global: "gameStart",
				player: "enterGame",
			},
			firstDo: true,
			forced: true,
			popup: false,
			priority: 25,
			charlotte: true,
			filter: function (event, player) {
				return get.mode() != "guozhan" && get.is.double(player.name1) && !player._groupChosen;
			},
			content: function () {
				"step 0";
				player._groupChosen = "double";
				player.chooseControl(get.is.double(player.name1, true)).set("prompt", "请选择你的势力");
				"step 1";
				player.changeGroup(result.control);
			},
		},
		/*
		aozhan: {
			charlotte: true,
			mod: {
				targetEnabled: function (card) {
					if (card.name == "tao" && ((card.isCard && card.cardid) || get.itemtype(card) == "card")) return false;
				},
				cardSavable: function (card) {
					if (card.name == "tao" && ((card.isCard && card.cardid) || get.itemtype(card) == "card")) return false;
				},
			},
			group: ["aozhan_sha", "aozhan_shan"],
			subSkill: {
				sha: {
					enable: ["chooseToUse", "chooseToRespond"],
					filterCard: {
						name: "tao",
					},
					viewAs: {
						name: "sha",
						isCard: true,
					},
					viewAsFilter: function (player) {
						if (!player.countCards("hs", "tao")) return false;
					},
					position: "hs",
					prompt: "将一张桃当杀使用或打出",
					check: function () {
						return 1;
					},
					ai: {
						respondSha: true,
						skillTagFilter: function (player) {
							if (!player.countCards("hs", "tao")) return false;
						},
						order: function () {
							return get.order({ name: "sha" }) - 0.1;
						},
					},
					sub: true,
				},
				shan: {
					enable: ["chooseToRespond", "chooseToUse"],
					filterCard: {
						name: "tao",
					},
					viewAs: {
						name: "shan",
						isCard: true,
					},
					prompt: "将一张桃当闪打出",
					check: function () {
						return 1;
					},
					viewAsFilter: function (player) {
						if (!player.countCards("hs", "tao")) return false;
					},
					position: "hs",
					ai: {
						respondShan: true,
						skillTagFilter: function (player) {
							if (!player.countCards("hs", "tao")) return false;
						},
					},
					sub: true,
				},
			},
		},*/
		global: [],
		globalmap: {},
		storage: {},
		undist: {},
		others: {},
		zhu: {},
		zhuSkill: {},
		land_used: {},
		unequip: { ai: { unequip: true } },
		/*
		subplayer: {
			trigger: { player: "dieBefore" },
			forced: true,
			priority: -9,
			onremove: true,
			mark: "character",
			intro: {
				content: function (storage, player) {
					if (typeof storage.intro2 == "string") return storage.intro2;
					if (typeof storage.intro2 == "function") return storage.intro2(storage, player);
					return "死亡前切换回主武将";
				},
				name: function (storage) {
					return get.rawName(storage.name);
				},
			},
			content: function () {
				trigger.cancel();
				var evt = trigger.getParent("damage");
				if (evt.player == player) {
					evt.untrigger(false, player);
				}
				player.exitSubPlayer(true);
			},
			ai: {
				nosave: true,
			},
		},*/
		autoswap: {
			firstDo: true,
			trigger: {
				player: ["chooseToUseBegin", "chooseToRespondBegin", "chooseToDiscardBegin", "chooseToCompareBegin", "chooseButtonBegin", "chooseCardBegin", "chooseTargetBegin", "chooseCardTargetBegin", "chooseControlBegin", "chooseBoolBegin", "choosePlayerCardBegin", "discardPlayerCardBegin", "gainPlayerCardBegin", "chooseToMoveBegin", "chooseToPlayBeatmapBegin", "chooseToGiveBegin"],
			},
			forced: true,
			priority: 100,
			forceDie: true,
			popup: false,
			filter: function (event, player) {
				if (event.autochoose && event.autochoose()) return false;
				if (lib.filter.wuxieSwap(event)) return false;
				if (_status.auto || !player.isUnderControl()) return false;
				return true;
			},
			content: function () {
				//console.log("autoswap", trigger);
				game.swapPlayerAuto(player);
			},
		},
		dualside: {
			charlotte: true,
			subSkill: {
				turn: {
					trigger: { player: ["turnOverAfter", "dieBefore"] },
					silent: true,
					filter: function (event, player) {
						if (player.storage.dualside_over) return false;
						return Array.isArray(player.storage.dualside);
					},
					content: function () {
						var cfg = player.storage.dualside;
						var bool = player.isTurnedOver();
						if (trigger.name == "die") {
							bool = !bool;
						}
						if (bool) {
							cfg[1] = player.hp;
							cfg[2] = player.maxHp;
							player.reinit(cfg[0], cfg[3], [cfg[4], cfg[5]]);
							player.unmarkSkill("dualside");
							player.markSkillCharacter("dualside", { name: cfg[0] }, "正面", "当前体力：" + cfg[1] + "/" + cfg[2]);
						} else {
							cfg[4] = player.hp;
							cfg[5] = player.maxHp;
							player.reinit(cfg[3], cfg[0], [cfg[1], cfg[2]]);
							player.unmarkSkill("dualside");
							player.markSkillCharacter("dualside", { name: cfg[3] }, "背面", "当前体力：" + cfg[4] + "/" + cfg[5]);
						}

						if (trigger.name == "die") {
							trigger.cancel();
							delete player.storage.dualside;
							player.storage.dualside_over = true;
							player.unmarkSkill("dualside");
						}
					},
				},
				init: {
					trigger: { global: "gameStart", player: "enterGame" },
					silent: true,
					content: function () {
						var list = [player.name1, player.name2];
						for (var i = 0; i < list.length; i++) {
							if (list[i] && lib.character[list[i]]) {
								var info = lib.character[list[i]];
								if (info.skills.includes("dualside") && info.dualSideCharacter) {
									player.storage.dualside = [list[i], player.hp, player.maxHp];
									var name2 = info.dualSideCharacter;
									var info2 = lib.character[name2];
									player.storage.dualside.push(name2);
									player.storage.dualside.push(info2.hp);
									player.storage.dualside.push(info2.maxHp);
								}
								break;
							}
						}
						var cfg = player.storage.dualside;
						if (get.mode() == "guozhan") {
							if (player.name1 == cfg[0]) {
								player.showCharacter(0);
							} else {
								player.showCharacter(1);
							}
						}
						player.markSkillCharacter("dualside", { name: cfg[3] }, "背面", "当前体力：" + cfg[4] + "/" + cfg[5]);
					},
				},
			},
			group: ["dualside_init", "dualside_turn"],
		},
		fengyin: {
			init: function (player, skill) {
				player.addSkillBlocker(skill);
				player.addTip(skill, "非锁定技失效");
			},
			onremove: function (player, skill) {
				player.removeSkillBlocker(skill);
				player.removeTip(skill);
			},
			charlotte: true,
			skillBlocker: function (skill, player) {
				return !lib.skill[skill].persevereSkill && !lib.skill[skill].charlotte && !get.is.locked(skill, player);
			},
			mark: true,
			intro: {
				content: function (storage, player, skill) {
					var list = player.getSkills(null, false, false).filter(function (i) {
						return lib.skill.fengyin.skillBlocker(i, player);
					});
					if (list.length) return "失效技能：" + get.translation(list);
					return "无失效技能";
				},
			},
		},
		baiban: {
			init: function (player, skill) {
				player.addSkillBlocker(skill);
			},
			onremove: function (player, skill) {
				player.removeSkillBlocker(skill);
			},
			charlotte: true,
			skillBlocker: function (skill, player) {
				return !lib.skill[skill].persevereSkill && !lib.skill[skill].charlotte;
			},
			mark: true,
			intro: {
				content: function (storage, player, skill) {
					var list = player.getSkills(null, false, false).filter(function (i) {
						return lib.skill.baiban.skillBlocker(i, player);
					});
					if (list.length) return "失效技能：" + get.translation(list);
					return "无失效技能";
				},
			},
		},
		/*
		qianxing: {
			mark: true,
			nopop: true,
			init: function (player) {
				game.log(player, "获得了", "【潜行】");
			},
			intro: {
				content: "锁定技，你不能成为其他角色的卡牌的目标",
			},
			mod: {
				targetEnabled: function (card, player, target) {
					if (player != target) return false;
				},
			},
		},
		mianyi: {
			trigger: { player: "damageBefore" },
			mark: true,
			forced: true,
			init: function (player) {
				game.log(player, "获得了", "【免疫】");
			},
			content: function () {
				trigger.cancel();
			},
			ai: {
				nofire: true,
				nothunder: true,
				nodamage: true,
				effect: {
					target: function (card, player, target, current) {
						if (get.tag(card, "damage")) return "zeroplayertarget";
					},
				},
			},
			intro: {
				content: "防止一切伤害",
			},
		},
		mad: {
			mark: true,
			locked: true,
			intro: {
				content: "已进入混乱状态",
				name: "混乱",
				onunmark: function (storage, player) {
					game.log(player, "解除混乱状态");
				},
			},
		},
		ghujia: {
			intro: {
				content: function (content, player) {
					return "已有" + get.cnNumber(player.hujia) + "点护甲值";
				},
			},
			markimage: "image/card/shield.png",
		},
		*/
		counttrigger: {
			trigger: { global: "phaseAfter" },
			silent: true,
			charlotte: true,
			priority: -100,
			lastDo: true,
			content: function () {
				player.removeSkill("counttrigger");
				delete player.storage.counttrigger;
			},
			group: "counttrigger_2",
			subSkill: {
				2: {
					trigger: { global: ["phaseBeforeStart", "roundStart"] },
					silent: true,
					charlotte: true,
					firstDo: true,
					priority: 100,
					content: function () {
						player.removeSkill("counttrigger");
						delete player.storage.counttrigger;
					},
				},
			},
		},
		/**
		 * @deprecated
		 */
		/*_recovercheck: {
			trigger: { player: 'recoverBefore' },
			forced: true,
			priority: 100,
			firstDo: true,
			popup: false,
			silent: true,
			filter: function (event, player) {
				return player.hp >= player.maxHp;
			},
			content: function () {
				trigger.cancel();
			},
		},*/
		/**
		 * @deprecated
		 */
		/*_turnover:{
			trigger:{player:'phaseBefore'},
			forced:true,
			forceOut:true,
			priority:100,
			popup:false,
			firstDo:true,
			content:function(){
				if(player.isTurnedOver()&&!trigger._noTurnOver){
					trigger.cancel();
					player.turnOver();
					player.phaseSkipped=true;
				}
				else{
					player.phaseSkipped=false;
				}
				var isRound=false;
				if(!trigger.skill){
					isRound=_status.roundSkipped;
					if(_status.isRoundFilter){
						isRound=_status.isRoundFilter(trigger,player);
					}
					else if(_status.seatNumSettled){
						var seatNum=player.getSeatNum();
						if(seatNum!=0){
							if(typeof _status.lastSeatNum!='number'||seatNum<_status.lastSeatNum) isRound=true;
							_status.lastSeatNum=seatNum;
						}
					}
					else if(player==_status.roundStart) isRound=true;
					if(isRound){
						delete _status.roundSkipped;
						game.roundNumber++;
						trigger._roundStart=true;
						game.updateRoundNumber();
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].isOut()&&game.players[i].outCount>0){
								game.players[i].outCount--;
								if(game.players[i].outCount==0&&!game.players[i].outSkills){
									game.players[i].in();
								}
							}
						}
						event.trigger('roundStart');
					}
				}
				_status.globalHistory.push({
					cardMove:[],
					custom:[],
					useCard:[],
					changeHp:[],
					everything:[],
				});
				var players=game.players.slice(0).concat(game.dead);
				for(var i=0;i<players.length;i++){
					var current=players[i];
					current.actionHistory.push({useCard:[],respond:[],skipped:[],lose:[],gain:[],sourceDamage:[],damage:[],custom:[],useSkill:[]});
					current.stat.push({card:{},skill:{}});
					if(isRound){
						current.getHistory().isRound=true;
						current.getStat().isRound=true;
					}
				};
				if(!player.phaseSkipped){
					player.getHistory().isMe=true;
					player.getStat().isMe=true;
				}
				if(isRound){
					game.getGlobalHistory().isRound=true;
				}
			},
		},*/
		_usecard: {
			trigger: { global: "useCardAfter" },
			forced: true,
			popup: false,
			priority: -100,
			lastDo: true,
			silent: true,
			filter: function (event) {
				return !event._cleared && event.card.name != "wuxie";
			},
			content: function () {
				game.broadcastAll(function () {
					ui.clear();
				});
				event._cleared = true;
			},
		},
		_discard: {
			trigger: { global: ["discardAfter", "loseToDiscardpileAfter", "loseAsyncAfter"] },
			forced: true,
			popup: false,
			priority: -100,
			lastDo: true,
			silent: true,
			filter: function (event) {
				return ui.todiscard[event.discardid] ? true : false;
			},
			content: function () {
				game.broadcastAll(function (id) {
					var todiscard = ui.todiscard[id];
					delete ui.todiscard[id];
					if (todiscard) {
						var time = 1000;
						if (typeof todiscard._discardtime == "number") {
							time += todiscard._discardtime - get.time();
						}
						if (time < 0) {
							time = 0;
						}
						setTimeout(function () {
							for (var i = 0; i < todiscard.length; i++) {
								todiscard[i].delete();
							}
						}, time);
					}
				}, trigger.discardid);
			},
		},
		/*
		_save: {
			//trigger:{source:'dying2',player:'dying2'},
			priority: 5,
			forced: true,
			popup: false,
			silent: true,
			filter: function (event, player) {
				//if(!event.player.isDying()) return false;
				//if(event.source&&event.source.isIn()&&event.source!=player) return false;
				//return true;
				return false;
			},
			content: function () {
				"step 0";
				event.dying = trigger.player;
				if (!event.acted) event.acted = [];
				"step 1";
				if (trigger.player.isDead()) {
					event.finish();
					return;
				}
				event.acted.push(player);
				var str = get.translation(trigger.player) + "濒死，是否帮助？";
				var str2 = "当前体力：" + trigger.player.hp;
				if (lib.config.tao_enemy && event.dying.side != player.side && lib.config.mode != "identity" && lib.config.mode != "guozhan" && !event.dying.hasSkillTag("revertsave")) {
					event._result = { bool: false };
				} else if (player.canSave(event.dying)) {
					player.chooseToUse({
						filterCard: function (card, player, event) {
							event = event || _status.event;
							return lib.filter.cardSavable(card, player, event.dying);
						},
						filterTarget: function (card, player, target) {
							if (target != _status.event.dying) return false;
							if (!card) return false;
							var info = get.info(card);
							if (!info.singleCard || ui.selected.targets.length == 0) {
								var mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
								if (mod == false) return false;
								var mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
								if (mod != "unchanged") return mod;
							}
							return true;
						},
						prompt: str,
						prompt2: str2,
						ai1: function (card) {
							if (typeof card == "string") {
								var info = get.info(card);
								if (info.ai && info.ai.order) {
									if (typeof info.ai.order == "number") {
										return info.ai.order;
									} else if (typeof info.ai.order == "function") {
										return info.ai.order();
									}
								}
							}
							return 1;
						},
						ai2: function (target) {
							let effect_use = get.effect_use(target);
							if (effect_use <= 0) return effect_use;
							return get.effect(target);
						},
						type: "dying",
						targetRequired: true,
						dying: event.dying,
					});
				} else {
					event._result = { bool: false };
				}
				"step 2";
				if (result.bool) {
					var player = trigger.player;
					if (player.hp <= 0 && !trigger.nodying && !player.nodying && player.isAlive() && !player.isOut() && !player.removed) event.goto(0);
					else trigger.untrigger();
				} else {
					for (var i = 0; i < 20; i++) {
						if (event.acted.includes(event.player.next)) {
							break;
						} else {
							event.player = event.player.next;
							if (!event.player.isOut()) {
								event.goto(1);
								break;
							}
						}
					}
				}
			},
		},
		_ismin: {
			mod: {
				cardEnabled: function (card, player) {
					if (player.isMin()) {
						if (get.type(card) == "equip") return false;
					}
				},
			},
		},
		_recasting: {
			enable: "phaseUse",
			logv: false,
			prompt: "将要重铸的牌置入弃牌堆并摸一张牌",
			filter: (event, player) => player.hasCard(card => lib.skill._recasting.filterCard(card, player), lib.skill._recasting.position),
			position: "he",
			filterCard: (card, player) => player.canRecast(card, null, true),
			discard: false,
			lose: false,
			delay: false,
			content: () => {
				player.recast(cards, void 0, (player, cards) => {
					var numberOfCardsToDraw = cards.length;
					cards.forEach(value => {
						if (lib.config.mode == "stone" && _status.mode == "deck" && !player.isMin() && get.type(value).startsWith("stone")) {
							var stonecard = get.stonecard(1, player.career);
							if (stonecard.length) {
								numberOfCardsToDraw -= stonecard.length;
								player.gain(game.createCard(stonecard.randomGet()), "draw");
							} else
								player.draw({
									drawDeck: 1,
								}).log = false;
						} else if (get.subtype(value) == "spell_gold") {
							var libCard = get.libCard(info => info.subtype == "spell_silver");
							if (!libCard.length) return;
							numberOfCardsToDraw--;
							player.gain(game.createCard(libCard.randomGet()), "draw");
						} else if (get.subtype(value) == "spell_silver") {
							var libCard = get.libCard(info => info.subtype == "spell_bronze");
							if (!libCard.length) return;
							numberOfCardsToDraw--;
							player.gain(game.createCard(libCard.randomGet()), "draw");
						}
					});
					if (numberOfCardsToDraw) player.draw(numberOfCardsToDraw).log = false;
				});
			},
			ai: {
				basic: {
					order: 6,
				},
				result: {
					player: 1,
				},
			},
		},
		_lianhuan: {
			trigger: { player: "damageAfter" },
			filter: function (event, player) {
				return event.lianhuanable == true;
			},
			forced: true,
			popup: false,
			logv: false,
			forceDie: true,
			silent: true,
			forceOut: true,
			//priority:-5,
			content: function () {
				"step 0";
				event.logvid = trigger.getLogv();
				"step 1";
				event.targets = game.filterPlayer(function (current) {
					return current != event.player && current.isLinked();
				});
				lib.tempSortSeat = _status.currentPhase || player;
				event.targets.sort(lib.sort.seat);
				delete lib.tempSortSeat;
				event._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
				if (trigger.source) event._args.push(trigger.source);
				else event._args.push("nosource");
				"step 2";
				if (event.targets.length) {
					var target = event.targets.shift();
					if (target.isLinked()) target.damage.apply(target, event._args.slice(0));
					event.redo();
				}
			},
		},
		_lianhuan4: {
			trigger: { player: "changeHp" },
			priority: -10,
			forced: true,
			popup: false,
			forceDie: true,
			silent: true,
			filter: function (event, player) {
				var evt = event.getParent();
				return evt && evt.name == "damage" && evt.hasDuYou("linked") && player.isLinked();
			},
			content: function () {
				player.link();
				if (trigger.getParent().notLink()) trigger.getParent().lianhuanable = true;
			},
		},
		*/
		/**
		 * @deprecated
		 */
		/*
		_chongzhu: {
			get filter() {
				return lib.skill._recasting.filter;
			},
			set filter(filter) {
				lib.skill._recasting.filter = filter;
			},
			get filterCard() {
				return lib.skill._recasting.filterCard;
			},
			set filterCard(filterCard) {
				lib.skill._recasting.filterCard = filterCard;
			},
			get content() {
				return lib.skill._recasting.content;
			},
			set content(content) {
				lib.skill._recasting.content = content;
			},
			get ai() {
				return lib.skill._recasting.ai;
			},
			set ai(ai) {
				lib.skill._recasting.ai = ai;
			},
		},*/
		//xingBei
		viewHandcard:{
			ai:{
				viewHandcard:true,
				skillTagFilter:function(player,tag,target){
					return player.side==target.side;
				},
			},
		},

		_qiDong:{
			trigger:{player:'triggerEnd'},
			direct:true,
			filter:function(event,player){
				if(event.skill=='_qiDong') return false;
				return get.info(event.skill)&&get.info(event.skill).type=='qiDong';
			},
			content:function(){
				trigger.getParent('xingDong').canTeShu=false;
				trigger.getParent('xingDong').qiDongGuo=true;
			},
		},
		_wuFaXingDong:{
			filterx:function(event,player){
				//console.log('--------------------------------');
				//拥有挑衅直接false
				//无可启动技跳过启动前后无法行动
				if(event.name=='xingDong'){
					if(event.canQiDong==false) return false;
					var next=game.createEvent('gongJiOrFaShu',false);
					next.setContent('emptyEvent');
					if(event.firstAction){
						next.set('type','phase');
						next.set('firstAction',event.firstAction)
					}
					next.set('canTeShu',event.canTeShu);
				}
				//获取所有技能
				var skills = game.expandSkills(player.getSkills("invisible").concat(lib.skill.global));
				//判断是否有可触发的技能
				for(var i=0;i<skills.length;i++){
					//排除提炼和无法行动（避免判断可触发时循环嵌套）
					if(skills[i]=='_tiLian' || skills[i]=='_wuFaXingDong') continue;
					if(event.name=='xingDong') var enable=lib.filter.filterEnable(next, player, skills[i]);
					else var enable=lib.filter.filterEnable(event, player, skills[i]);
					if(enable) return false;
				}

				//判断是否有可使用手牌
				var cards=player.getCards('h').concat(player.getCards('s'));
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
				player.wuFaXingDong();
				player.addGongJiOrFaShu();
				event.getParent('xingDong').canTeShu=false;
				event.getParent('xingDong').firstAction=true;
			},
			contentx:function(){
				"step 0"
				event.dict={'认可':0,'否认':0};
				event.targetsx=game.filterPlayer(i=>i!=player).sortBySeat(_status.currentPhase);
				var name=get.translation(player.name);
				event.contentx=[name+'宣言无法行动',player.getCards('h').slice()];
				event.listx=['认可','否认'];
				event.trigger('wuFaXingDongBefore');
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
					event.dict[result.control]++;
				}else if(result.control=='否认'){
					event.target.popup('否认');
					game.log(event.target,'否认');
					event.dict[result.control]++;
				}
				if(event.targetsx.length>0) event.goto(1);
				"step 3"
				if(event.dict['认可']>=event.dict['否认']){
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
				'step 4'
				event.trigger('wuFaXingDongAfter');
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
					trigger:{player:'qiDong'},
					priority:2,
					filter:function(event,player){
						return lib.skill._wuFaXingDong.filterx(event,player);
					},
					content:function(){
						"step 0"
						player.wuFaXingDong();
					}
				},
				qiDongHou:{
					trigger:{player:'qiDong'},
					filter:function(event,player){
						return lib.skill._wuFaXingDong.filterx(event,player);
					},
					priority:-1,
					content:function(){
						"step 0"
						player.wuFaXingDong();
					}
				}
			}
		},
		_faShuXianZhi:{
			mod:{
				cardEnabled:function(card,player){
					if(_status.event.name=='faShu'){
						if(get.type(card,player)!='faShu') return false;
					}
				}
			},
		},
		_gongJiXianZhi:{
			mod:{
				cardEnabled:function(card,player){
					if(_status.event.name=='gongJi'){
						if(get.type(card,player)!='gongJi') return false;
					}
				}    
			}
		},
		_gongJiXingShi:{//攻击获得星石
			trigger:{source:'gongJiMingZhong'},
			direct:true,
			firstDo:true,
			content:function(){
				if(trigger.yingZhan==true){
					player.changeZhanJi('shuiJing',1)
				}else{
					player.changeZhanJi('baoShi',1)
				}
			},
		},
		_gongJiRiZhi:{
			trigger:{player:'gongJiSheZhi'},
			direct:true,
			lastDo:true,
			filter:function(event,player){
				return event.canYingZhan==false||event.canShengGuang==false||event.canShengDun==false||event.canAnMie==false;
			},
			content:function(){
				var canYingZhan=trigger.canYingZhan;
				var canShengGuang=trigger.canShengGuang;
				var canShengDun=trigger.canShengDun;
				var canAnMie=trigger.canAnMie;

				var str='本次攻击';
				if(canYingZhan==false&&canShengGuang==false&&canShengDun==false){
					str+='强制命中';
				}else{
					let list=[];
					if(canYingZhan==false) list.push('无法被应战');
					if(canAnMie==false) list.push('无法被【暗灭】应战');
					if(canShengGuang==false) list.push('无法被【圣光】抵消');
					if(canShengDun==false) list.push('无法被【圣盾】抵消');
					str+=list.join('，');
				}
				game.log(str);
			}
		},
		_zhiLiao:{
			trigger:{player:"zhiLiao"},
			forced:true,
			lastDo:true,
			init:function(player){
				player.storage.zhongDu=[];
			},
			filter:function(event,player){
				if(player.zhiLiao<=0) return false;
				return true;
			},
			content:function(){
				'step 0'
				event.trigger('zhiLiaoSheZhi');
				"step 1"
				var num=trigger.getParent().num;
				var list=[];
				for(var i=0;i<=player.zhiLiao;i++){
					if(i>num) break;
					if(i>event.zhiLiaoLimit) break;
					list.push(i);
				}
				var  zhiLiao=list.length-1;//使用几点治疗，默认取最大值
				var chaZhi=player.getHandcardLimit()-player.countCards('h');
				if(chaZhi>=num+1) zhiLiao=0;
				player.chooseControl(list).set('prompt','选择使用多少[治疗]，目前伤害量'+num).set('ai',function(){
					var num=_status.event.num;
					return num;
				}).set('num',zhiLiao);
				"step 2"
				var zhiLiaonum=result.control;
				if(zhiLiaonum>0){
					trigger.getParent().num-=zhiLiaonum;
					game.log(player,'的','[治疗]','抵挡了'+zhiLiaonum+'点伤害');
					player.changeZhiLiao(-zhiLiaonum).type='damage';
				}
			}
		},
		_gouMai:{
			enable:'xingDong',
			type:'teShu',
			filter:function(event,player){
				return player.countCards('h')+3<=player.getHandcardLimit();
			},
			content:function(){
				'step 0'
				game.broadcastAll(function(){
					if(lib.config.background_audio){
						game.playAudio('skill','_gouMai');
					}
				});
				event.trigger('gouMai');
				'step 1'
				player.draw(3).set('cause','teShuXingDong');
				'step 2'
				var num=0;
				var emptyZhanJi=get.emptyZhanJi(player.side);
				if(emptyZhanJi>=2){
					num=2;
				}else if(emptyZhanJi>=1){
					num=1;
				}

				if(num==0){
					event.finish();
				}else if(num==2){
					player.addZhanJi('baoShi',1);
					player.addZhanJi('shuiJing',1);
					event.finish();
				}else if(num==1){
					var list=['baoShi','shuiJing'];
					player.chooseControl(list).set('prompt','选择获得的星石').set('ai',function(){return 0;});
				}
				'step 3'
				if(result.control=='baoShi'){
					player.addZhanJi('baoShi',1).set('yiChu',true);
				}else if(result.control=='shuiJing'){
					player.addZhanJi('shuiJing',1).set('yiChu',true);
				}
			},
			ai:{
				order:function(item,player){
					var num=3;
					num+=(0.15*get.emptyZhanJi(player.side));
					return num;
				},
				result:{
					player:function(player){
						if(get.emptyZhanJi(player.side)<2) return 0;
						if(player.countCards('h')==0) return 1;
						var num=0.1;
						num+=(0.2*(player.countEmptyCards()));
						var numx=Math.random();
						if(numx<=num) return 1;
						else return 0;
					},
				},
				maixie:true,
			}
		},
		_heCheng:{
			enable:'xingDong',
			type:'teShu',
			filter:function(event,player){
				var xingShi=get.zhanJi(player.side);
				return xingShi.length>=3&&player.countCards('h')+3<=player.getHandcardLimit();
			},
			chooseButton:{
				dialog:function(event,player){
					var dialog=ui.create.dialog('合成：选择星石','hidden');
					var list=get.zhanJi(player.side);
					var listx=[];
					for(var i=0;i<list.length;i++){
						listx.push([list[i],get.translation(list[i])]);
					}
					dialog.add([
						listx,'tdnodes'
					]);
					return dialog;
				},
				backup:function(links,player){
					return{
						links:links,
						type:'teShu',
						content:function(){
							'step 0'
							event.links=lib.skill._heCheng_backup.links;
							game.broadcastAll(function(){
								if(lib.config.background_audio){
									game.playAudio('skill','_heCheng');
								}
							});
							event.trigger('heCheng');
							'step 1'
							player.draw(3).set('cause','teShuXingDong');
							'step 2'
							var dict={};
							for(var i=0;i<event.links.length;i++){
								if(event.links[i]=='baoShi'){
									dict['baoShi']=(dict['baoShi']||0)+1;
								}else if(event.links[i]=='shuiJing'){
									dict['shuiJing']=(dict['shuiJing']||0)+1;
								}
							}
							if(dict['baoShi']>0){
								var next=player.removeZhanJi('baoShi',dict['baoShi']);
							}
							if(dict['shuiJing']>0){
								var next=player.removeZhanJi('shuiJing',dict['shuiJing']);
							}
							'step 3'
							player.changeXingBei(1);
							'step 4'
							player.changeShiQi(-1,!player.side);
						},
					}
				},
				select:3,
				check:function(button,player){
					switch(button.link){
						case 'shuiJing':{
							return 2;
						}
						case 'baoShi':{
							return 1;
						}
					}
				}
			},
			ai:{
				order:function(item,player){
					var num=3.25;
					var shiQi=get.shiQi(!player.side);
					if(shiQi<=5){
						num+=(0.4*(5-shiQi));
						if(shiQi<=1) num+=10;
					}
					var xingBei=get.xingBei(player.side);
					if(xingBei+1>=game.xingBeiMax) num+=10;
					num+=(0.1*(get.zhanJi(player.side).length-3));
					return num;
				},
				result:{
					player:function(player){
						if(player.countCards('h')==0) return 1;

						var zhanJi=get.zhanJi(player.side);
						if(zhanJi.length>=4) return 1;
						if(!zhanJi.includes('水晶')) return 0;

						var num=0.3;
						num+=(0.2*(player.countEmptyCards()));

						var numx=Math.random();
						if(numx<=num) return 1;
						else return 0;
					},
				},
				maixie:true,
			}
		},
		_tiLian:{
			subSkill:{
				baoShi:{
					intro:{
						name:'宝石',
						content:'mark',
					},
					markimage:'image/card/xingShi/baoShi.png',
				},
				shuiJing:{
					intro:{
						name:'水晶',
						content:'mark',
					},
					markimage:'image/card/xingShi/shuiJing.png',
				},
			},
			enable:'xingDong',
			type:'teShu',
			filter:function(event,player){
				var nengLiang_num=player.countNengLiangAll();
				var empty_nengLiang=player.getNengLiangLimit()-nengLiang_num;
				var zhanJi=get.zhanJi(player.side);
				return zhanJi.length>=1&&empty_nengLiang>=1;
			},
			chooseButton:{
				dialog:function(event,player){
					var dialog=ui.create.dialog('提炼：选择星石','hidden');
					var list=get.zhanJi(player.side);
					var listx=[];
					for(var i=0;i<list.length;i++){
						listx.push([list[i],get.translation(list[i])]);
					}
					dialog.add([listx,'tdnodes']);
					return dialog;
					
				},
				backup:function(links,player){
					return{
						links:links,
						type:'teShu',
						content:function(){
							'step 0'
							event.links=lib.skill._tiLian_backup.links;
							game.broadcastAll(function(){
								if(lib.config.background_audio){
									game.playAudio('skill','_tiLian');
								}
							});
							event.trigger('tiLian');
							'step 1'
							event.dict={"baoShi":0,"shuiJing":0};
							for(var i=0;i<event.links.length;i++){
								if(event.links[i]=='baoShi'){
									event.dict['baoShi']=event.dict['baoShi']+1;
								}else if(event.links[i]=='shuiJing'){
									event.dict['shuiJing']=event.dict['shuiJing']+1;
								}
							}
							'step 2'
							if(event.dict['baoShi']>0){
								player.removeZhanJi('baoShi',event.dict['baoShi']);
							}
							if(event.dict['shuiJing']>0){
								player.removeZhanJi('shuiJing',event.dict['shuiJing']);
							}
							'step 3'
							if(event.dict['baoShi']>0){
								player.addNengLiang('baoShi',event.dict['baoShi']);
							}
							if(event.dict['shuiJing']>0){
								player.addNengLiang('shuiJing',event.dict['shuiJing']);
							}
						},
					}
				},
				select:function(){
					var player=_status.event.player;
					var nengLiang_num=player.countNengLiangAll();
					if(player.getNengLiangLimit()-nengLiang_num==1){
						var range=[1,1];
					}else if(player.getNengLiangLimit()-nengLiang_num>=2){
						var range=[1,2];
					}
					return range;
				},
				check:function(button){
					var player=_status.event.player;
					if((!_status.connectMode&&get.config('AItiLian'))||(_status.connectMode&&lib.configOL.phaseswap)){
						if(ui.selected.buttons.length>=1) return -1;
					}
					if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
						if(button.link=='baoShi') return 5;
						else return -1;
					}
					if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
						if(button.link=='shuiJing') return 5;
						else return 2;
					}
					//既有水晶也有宝石
					return 2;

				}
			},
			ai:{
				order:function(item,player){
					var num=3.15;
					if((_status.connectMode&&lib.configOL.AItiLian)||(!_status.connectMode&&get.config('AItiLian'))) num+=0.05;
					num+=(0.05*(player.getNengLiangLimit()-player.countNengLiangAll()));
					num+=(0.06*get.zhanJi(player.side).length);
					return num;
				},
				result:{
					player:function(player){
						if(!(player.hasSkillTag('baoShi')||player.hasSkillTag('shuiJing'))) return -1;
						
						var zhanJi=get.zhanJi(player.side);
						if(zhanJi.length<=1) return 0;

						if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
							if(!zhanJi.includes('shuiJing')) return 0;
						}

						var num=player.getNengLiangLimit()-player.countNengLiangAll();
						if(num<=1) return 0;

						var numx=Math.random();
						if(numx<=0.5) return 1;
						else return 0;
					},
				},
			}
		},
		
		_init:{
			trigger:{global:'gameStart'},
			direct:true,
			firstDo:true,
			content:function(){
				player.storage.zhongDu=[];
				player.removeMark('_moDan',player.countMark('_moDan'),false);
			}
		},
		_xuRuo:{
			priority:1,//优先级大的先执行
			trigger:{player:'xingDongBefore'},
			forced:true,
			//marktext:"虚",
			markimage:'image/card/xuRuo.png',
			intro:{
				content:'expansion',
			},
			filter:function(event,player){
				return player.hasExpansions('_xuRuo');
			},
			content:function(){
				'step 0'
				game.broadcastAll(function(){
					if(lib.config.background_audio){
						game.playAudio('card','male','xuRuo');
					}
				});
				var list=['摸三张牌','跳过行动阶段'];
				player.chooseControl().set('choiceList',list).set('prompt','虚弱：选择一项').set('ai',function(){
					var player=_status.event.player;
					if(player.countCards('h')+3<=player.getHandcardLimit()) return 0;
					return 1;
				});
				'step 1'
				if(result.control=='选项二'){
					trigger.xuRuo=true;
				}else if(result.control=="选项一"){
					player.draw(3);
				}
				player.discard(player.getExpansions('_xuRuo'),'_xuRuo').set('visible',true);
			},
			subSkill:{
				xiaoGuo:{
					direct:true,
					priority:-1,
					lastDo:true,
					trigger:{player:'xingDongBefore'},
					filter:function(event,player){
						return event.xuRuo==true;
					},
					content:function(){
						event.trigger('xingDongSkipped');
						trigger.cancel();
					}
				},
			},
			tag:{
				jiChuXiaoGuo:true,
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
			trigger:{player:'xingDongBefore'},
			forced:true,
			filter:function(event,player){
				return player.hasExpansions('_zhongDu');
			},
			getIndex:function(event,player){
				return player.getExpansions('_zhongDu');
			},
			content:async function(event,trigger,player){
				game.broadcastAll(function(){
					if(lib.config.background_audio){
						game.playAudio('card','male','zhongDu');
					}
				});
				var target=player.storage.zhongDu.pop();
				var next=player.faShuDamage(target);
				await next;
				await player.discard(event.indexedData,'_zhongDu').set('visible',true);
			},
			tag:{
				jiChuXiaoGuo:true,
			}
		},
		_shengDun:{
			//marktext:"盾",
			markimage:'image/card/shengDun.png',
			intro:{
				content:'expansion',
			},
			trigger:{target:['shouDaoGongJi','shouDaoMoDan']},
			direct:true,
			lastDo:true,
			filter:function(event,player){
				if(event.canShengDun==false) return false;
				return player.hasExpansions('_shengDun');
			},
			content:function(){
				'step 0'
				game.broadcastAll(function(){
					if(lib.config.background_audio){
						game.playAudio('card','male','shengDun');
					}
				});
				player.discard(player.getExpansions('_shengDun'),'_shengDun').set('visible',true);
				trigger.weiMingZhong();
				'step 1'
				if(get.type(trigger.card)=='gongJi'){
					event.source=trigger.player;
					event.yingZhan=trigger.yingZhan;
					event.card=trigger.card;
					event.customArgs=trigger.customArgs;
					event.trigger('gongJiWeiMingZhong');
				}else if(trigger.card.name=='moDan') game.resetMoDan();
			},
			tag:{
				jiChuXiaoGuo:true,
			}
		},
		_yingZhan:{
			trigger:{target:'shouDaoGongJi'},
			direct:true,
			filter:function(event,player){
				if(event.canYingZhan==false&&event.canShengGuang==false) return false;
				return true;
			},
			content:function(){
				'step 0'
				event.source=trigger.player;
				event.yingZhan=trigger.yingZhan;
				event.card=trigger.card;
				var name=get.translation(event.source);
				var propmt=`受到${name}的`;
				propmt+=get.translation(get.xiBie(event.card))+'系';
				if(event.yingZhan){
					propmt+='应战攻击';
				}else{
					propmt+='主动攻击';
				}
				var next=player.yingZhan(propmt);
				next.set('filterCard',function(card,player,event){
					if(get.type(card)=='gongJi'){
						if(_status.event.canYingZhan==false) return false;//不能应战设置
						if(_status.event.canAnMie==false){
							if(get.xiBie(card)!=get.xiBie(_status.event.card)) return false;
						}else{
							if(get.name(card)!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.card)) return false;
						}
					}else if(get.type(card)=='faShu'){
						if(_status.event.canShengGuang==false) return false;
						if(get.name(card)!='shengGuang') return false;
					}
					return lib.filter.cardEnabled(card,player,'forceEnable');
				});
				next.set('filterTarget',function(card,player,target){
					if(target==_status.event.source) return false;
					if(target.side==player.side) return false;
					return lib.filter.targetEnabled(card,player,target);
				});
				next.set('card',event.card);
				next.set('source',event.source);
				next.set('yingZhan',true);
				next.set('canYingZhan',trigger.canYingZhan);
				next.set('canShengGuang',trigger.canShengGuang);
				next.set('canAnMie',trigger.canAnMie);
				next.set('oncard',function(card,player){
					_status.event.yingZhan=true;//设置本次攻击为应战攻击
				});
				'step 1'
				if(result.bool){
					trigger.weiMingZhong();
				}
			},
			ai:{
				yingZhan:true,
			}
		},
		_yingZhan_weiMingZhong:{
			trigger:{player:'gongJiBefore'},
			direct:true,
			firstDo:true,
			filter:function(event,player){
				return event.getParent().name=='yingZhan'&&event.card.name!='shengGuang';
			},
			content:function(){
				'step 0'
				//trigger.yingZhan=true;//设置本次攻击为应战攻击

				event.customArgs=trigger.getParent(5).customArgs;
				event.source=trigger.getParent().source;//攻击来源
				event.player=trigger.getParent().player;//应战者
				event.yingZhan=trigger.getParent(2).yingZhan;//判断未命中的攻击是否为应战攻击
				event.card=trigger.getParent().card;//攻击来源牌
				'step 1'
				event.trigger('gongJiWeiMingZhong');
			}
		},
		_shengGuang_weiMingZhong:{
			trigger:{player:'shengGuang'},
			direct:true,
			firstDo:true,
			filter:function(event,player){
				return event.getParent().name=='yingZhan'&&event.card.name=='shengGuang';
			},
			content:function(){
				'step 0'
				event.customArgs=trigger.getParent(5).customArgs;
				event.source=trigger.getParent().source;//攻击来源
				event.player=trigger.getParent().player;//应战者
				event.yingZhan=trigger.getParent(2).yingZhan;//判断未命中的攻击是否为应战攻击
				event.card=trigger.getParent().card;//攻击来源牌
				'step 1'
				event.trigger('gongJiWeiMingZhong');
			}
		},
		_moDan:{
			intro:{
				name:'已魔弹',
				nocount:true,
			},
			markimage:'image/card/moDan.png',
			trigger:{target:'shouDaoMoDan'},
			direct:true,
			content:async function(event,trigger,player){
				if(!player.hasMark('_moDan')) await player.addMark('_moDan',1,false);//是否已经被魔弹

				//所有玩家有魔弹标记重置标记
				var num=game.filterPlayer(function(current){
					return current.hasMark('_moDan');
				}).length;
				if(num>=game.players.length){
					for(var current of game.players){
						await current.removeMark('_moDan',current.countMark('_moDan'),false);
					}
				}

				var name=get.translation(trigger.player);
				var str='受到'+name+'的魔弹';
				var next=player.moDan(str,function(card,player,event){
					if(!(get.name(card)=='moDan'||get.name(card)=='shengGuang')) return false;
					return lib.filter.cardEnabled(card,player,'forceEnable');
				});
				next.autodelay=true;
				game.moDan++;

				var result=await next.forResult();

				if(result.bool){
					trigger.weiMingZhong();
					game.resetMoDan();
				}else{
					game.moDan--;
				}

				if(player.hasMark('_moDan')) await player.removeMark('_moDan',player.countMark('_moDan'),false);
			},
			subSkill:{
				before:{//第一个使用魔弹的角色增加魔弹标记
					trigger:{player:'useCardBefore'},
					direct:true,
					lastDo:true,
					filter:function(event,player){
						if(event.getParent().name=='moDan') return false;
						return (!player.hasMark('_moDan')&&(event.card&&event.card.name=='moDan'));
					},
					content:function(){
						player.addMark('_moDan',1,false);
					}
				},
				after:{//第一个使用魔弹的角色删除魔弹标记
					trigger:{player:'useCardAfter'},
					direct:true,
					lastDo:true,
					filter:function(event,player){
						return player.hasMark('_moDan')&&(event.card&&event.card.name=='moDan');
					},
					content:function(){
						player.removeMark('_moDan',player.countMark('_moDan'),false);
					}
				},
			}
		},
		_baoPai:{
			trigger:{global:['hengZhiAfter','chongZhiAfter','changeZhiShiWuAfter','changeNengLiangAfter','changeZhiLiaoAfter','addToExpansionAfter','loseToDiscardpileAfter','changeZhanJiAfter','changeXingBeiAfter','changeShiQiAfter','useSkillAfter','useCardAfter']},
			direct:true,
			lastDo:true,
			/*
			filter:function(event,player){
				return player.needsToDiscard()>0;
			},*/
			content:function(){
				player.update();
				player.qiPai();
			}
		},
	};
	/** @type {Object<string, import("./element/character.js").Character>} */
	character = new Proxy(
		{},
		{
			set(target, prop, newValue) {
				return Reflect.set(target, prop, get.convertedCharacter(newValue));
			},
		}
	);
	perfectPair = {};
	cardPile = {};
	message = {
		server: {
			cardPile() {
				this.send(
					JSON.stringify({
						type: "cardPile",
						data: {
							drawPile: Array.from(ui.cardPile.children),
							discardPile: Array.from(ui.discardPile.children),
						},
					})
				);
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			init(version, config, banned_info) {
				/*
				var show_deckMonitor = false;
				if (lib.config.show_deckMonitor && lib.config.show_deckMonitor_online) {
					show_deckMonitor = true;
				}
				this.send(function (show_deckMonitor) {
					if (show_deckMonitor) {
						ui.deckMonitor.style.display = "";
					} else {
						ui.deckMonitor.style.display = "none";
					}
				}, show_deckMonitor);*/
				this.onlineKey = config.onlineKey;
				var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;
				if (lib.node.banned.includes(banned_info) || banBlacklist.includes(config.onlineKey)) {
					this.send("denied", "banned");
				} else if (config.id && lib.playerOL && lib.playerOL[config.id]) {
					var player = lib.playerOL[config.id];
					player.setNickname();
					player.ws = this;
					player.isAuto = false;
					this.id = config.id;
					game.broadcast(function (player) {
						player.setNickname();
					}, player);
					this.send("reinit", lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, null, _status.onreconnect, _status.cardtag, _status.postReconnect);
				} else if (version != lib.versionOL) {
					this.send("denied", "version");
					lib.node.clients.remove(this);
					this.closed = true;
				} else if (get.config("check_versionLocal", "connect") && config.versionLocal != lib.version) {
					this.send("denied", "version");
					lib.node.clients.remove(this);
					this.closed = true;
				} else if (get.config("check_extension", "connect") && config.extension) {
					this.send("denied", "extension");
				} else if (!_status.waitingForPlayer) {
					if (!config.nickname) {
						this.send("denied", "banned");
						lib.node.clients.remove(this);
						this.closed = true;
					} else if (game.phaseNumber && lib.configOL.observe) {
						lib.node.observing.push(this);
						this.send("reinit", lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, game.players[0].playerid, null, _status.cardtag, _status.postReconnect);
						// 没有系统提示的接口喵？
						game.log("玩家 ", `#y${get.plainText(config.nickname)}`, " 进入房间观战");
						game.me.chat(`玩家 <span style="font-weight: bold; color: rgb(126, 180, 255)">${get.plainText(config.nickname)}</span> 进入房间观战`);
						if (!ui.removeObserve) {
							ui.removeObserve = ui.create.system(
								"移除旁观",
								function () {
									lib.configOL.observe = false;
									if (game.onlineroom) {
										game.send("server", "config", lib.configOL);
									}
									while (lib.node.observing.length) {
										lib.node.observing.shift().ws.close();
									}
									this.remove();
									delete ui.removeObserve;
								},
								true,
								true
							);
						}
					} else {
						this.send("denied", "gaming");
						lib.node.clients.remove(this);
						this.closed = true;
					}
				} else if (lib.node.clients.length - (window.isNonameServer ? 1 : 0) >= parseInt(lib.configOL.number)) {
					this.send("denied", "number");
					lib.node.clients.remove(this);
					this.closed = true;
				} else {
					if (config) {
						this.avatar = config.avatar;
						this.nickname = config.nickname;
					}
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].classList.contains("unselectable2")) continue;
						if (game.connectPlayers[i] != game.me && !game.connectPlayers[i].playerid) {
							game.connectPlayers[i].playerid = this.id;
							game.connectPlayers[i].initOL(this.nickname, this.avatar);
							game.connectPlayers[i].ws = this;
							break;
						}
					}
					this.send("init", this.id, lib.configOL, game.ip, window.isNonameServer, game.roomId);
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			inited() {
				this.inited = true;
				if (_status.waitingForPlayer) {
					game.updateWaiting();
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			reinited() {
				this.inited = true;
				//重连时使标记显示
				for(var player of game.players){
					for(var mark in player.marks){
						player.markSkill(mark);
					}
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			result(result) {
				if (lib.node.observing.includes(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.unwait(result);
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			tempResult(result) {
				if (lib.node.observing.includes(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.tempUnwait(result);
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			startGame() {
				if (this.id == game.onlinezhu) {
					game.resume();
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			changeRoomConfig(config) {
				if (this.id == game.onlinezhu) {
					game.broadcastAll(function (config) {
						for (var i in config) {
							lib.configOL[i] = config[i];
						}
						if (ui.connectStartBar) {
							ui.connectStartBar.firstChild.innerHTML = get.modetrans(lib.configOL, true);
						}
					}, config);
					if (lib.configOL.mode == "identity" && lib.configOL.identity_mode == "zhong" && game.connectPlayers) {
						for (var i = 0; i < game.connectPlayers.length; i++) {
							game.connectPlayers[i].classList.remove("unselectable2");
						}
						lib.configOL.number = 8;
						game.updateWaiting();
					}
					if (game.onlineroom) {
						game.send("server", "config", lib.configOL);
					}
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == this.id) {
							game.connectPlayers[i].chat("房间设置已更改");
						}
					}
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			changeNumConfig(num, index, bool) {
				if (this.id == game.onlinezhu) {
					lib.configOL.number = num;
					game.send("server", "config", lib.configOL);
					if (game.connectPlayers && game.connectPlayers[index]) {
						if (bool) {
							game.connectPlayers[index].classList.add("unselectable2");
						} else {
							game.connectPlayers[index].classList.remove("unselectable2");
						}
						game.updateWaiting();
					}
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			throwEmotion(target, emotion, rotate) {
				if (lib.node.observing.includes(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.throwEmotion(target, emotion, rotate);
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			emotion(id, pack, emotion) {
				if (lib.node.observing.includes(this)) return;
				var that = this;
				if (
					!this.id ||
					(!lib.playerOL[this.id] &&
						(!game.connectPlayers ||
							!(function () {
								for (var i = 0; i < game.connectPlayers.length; i++) {
									if (game.connectPlayers[i].playerid == that.id) {
										return true;
									}
								}
								return false;
							})()))
				)
					return;
				var player;
				if (lib.playerOL[id]) {
					player = lib.playerOL[id];
				} else if (game.connectPlayers) {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == id) {
							player = game.connectPlayers[i];
							break;
						}
					}
				}
				if (player) player.emotion(pack, emotion);
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			chat(id, str) {
				if (lib.node.observing.includes(this)) return;
				var that = this;
				if (
					!this.id ||
					(!lib.playerOL[this.id] &&
						(!game.connectPlayers ||
							!(function () {
								for (var i = 0; i < game.connectPlayers.length; i++) {
									if (game.connectPlayers[i].playerid == that.id) {
										return true;
									}
								}
								return false;
							})()))
				)
					return;
				var player;
				if (lib.playerOL[id]) {
					player = lib.playerOL[id];
				} else if (game.connectPlayers) {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						if (game.connectPlayers[i].playerid == id) {
							player = game.connectPlayers[i];
							break;
						}
					}
				}
				if (player) player.chat(str);
			},
			/**
			 * ```plain
			 * 当客机向主机发送投降请求时的回调
			 * ```
			 *
			 * @this {import("./element/client.js").Client}
			 * @param {Player} player
			 */
			giveup(player) {
				if (lib.node.observing.includes(this) || !player || !player._giveUp) return;
				var self = lib.playerOL[this.id];
				if (self !== player) return; // 禁止让别人投降
				_status.event.next.length = 0;
				game
					.createEvent("giveup", false)
					.set("includeOut", true)
					.setContent(function () {
						game.log(player, "投降");
						player.popup("投降");
						player.die("nosource").includeOut = true;
					}).player = player;
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			auto() {
				if (lib.node.observing.includes(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.isAuto = true;
					player.setNickname(player.nickname + " - 托管");
					game.broadcast(function (player) {
						player.setNickname(player.nickname + " - 托管");
					}, player);
				}
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			unauto() {
				if (lib.node.observing.includes(this)) return;
				var player = lib.playerOL[this.id];
				if (player) {
					player.isAuto = false;
					player.setNickname(player.nickname);
					game.broadcast(function (player) {
						player.setNickname(player.nickname);
					}, player);
				}
			},
			exec(func) {
				// if(typeof func=='function'){
				//     var args=Array.from(arguments);
				//     args.shift();
				//     func.apply(this,args);
				// }
			},
			/**
			 * @this {import("./element/client.js").Client}
			 */
			log() {
				var items = [];
				try {
					for (var i = 0; i < arguments.length; i++) {
						items.push(this.sandbox.exec(`return ${arguments[i]}`));
					}
				} catch (e) {
					this.send("log", ["err"]);
					return;
				}
				this.send("log", items);
			},
		},
		client: {
			log: function (arr) {
				if (Array.isArray(arr)) {
					for (var i = 0; i < arr.length; i++) {
						console.log(arr[i]);
					}
				}
			},
			opened: function () {
				game.send(
					"init",
					lib.versionOL,
					{
						id: game.onlineID,
						onlineKey: game.onlineKey,
						avatar: lib.config.connect_avatar,
						nickname: get.connectNickname(),
						versionLocal: lib.version,
						extension: lib.config.extensions.some(ext => lib.config[`extension_${ext}_enable`]),
					},
					lib.config.banned_info
				);
				if (ui.connecting && !ui.connecting.splashtimeout) {
					ui.connecting.firstChild.innerHTML = "重连成功";
				}
			},
			onconnection: id => lib.init.connection((lib.wsOL[id] = new lib.element.NodeWS(id))),
			onmessage: function (id, message) {
				if (lib.wsOL[id]) {
					lib.wsOL[id].onmessage(message);
				}
			},
			onclose: function (id) {
				if (lib.wsOL[id]) {
					lib.wsOL[id].onclose();
				}
			},
			selfclose: function () {
				if (game.online || game.onlineroom) {
					if ((game.servermode || game.onlinehall) && _status.over) {
						// later
					} else {
						game.saveConfig("tmp_user_roomId");
					}
				}
				game.ws.close();
			},
			reloadroom: function (forced) {
				if (window.isNonameServer && (forced || !_status.protectingroom)) {
					game.reload();
				}
			},
			createroom: function (index, config, mode) {
				game.online = false;
				game.onlineroom = true;
				game.roomId = index;
				lib.node = {};
				if (config && mode && window.isNonameServer) {
					if (mode == "auto") {
						mode = lib.configOL.mode;
					}
					game.switchMode(mode, config);
				} else {
					game.switchMode(lib.configOL.mode);
				}
				ui.create.connecting(true);
			},
			enterroomfailed: function () {
				alert("请稍后再试");
				_status.enteringroom = false;
				ui.create.connecting(true);
			},
			roomlist: function (list, events, clients, wsid) {
				game.send("server", "key", [game.onlineKey, lib.version]);
				game.online = true;
				game.onlinehall = true;
				lib.config.recentIP.remove(_status.ip);
				lib.config.recentIP.unshift(_status.ip);
				lib.config.recentIP.splice(5);
				if (!lib.config.reconnect_info || lib.config.reconnect_info[0] != _status.ip) {
					game.saveConfig("reconnect_info", [_status.ip, null]);
				}
				game.saveConfig("recentIP", lib.config.recentIP);
				_status.connectMode = true;

				game.clearArena();
				game.clearConnect();
				ui.pause.hide();
				ui.auto.hide();

				clearTimeout(_status.createNodeTimeout);
				game.send("server", "changeAvatar", get.connectNickname(), lib.config.connect_avatar);

				var proceed = function () {
					game.ip = get.trimip(_status.ip);
					ui.create.connectRooms(list);
					if (events) {
						ui.connectEvents = ui.create.div(".forceopaque.menubutton.large.connectevents.pointerdiv", "约战", ui.window, ui.click.connectEvents);
						ui.connectEventsCount = ui.create.div(".forceopaque.menubutton.icon.connectevents.highlight.hidden", "", ui.window);
						ui.connectClients = ui.create.div(".forceopaque.menubutton.large.connectevents.pointerdiv.left", "在线", ui.window, ui.click.connectClients);
						ui.connectClientsCount = ui.create.div(".forceopaque.menubutton.icon.connectevents.highlight.left", "1", ui.window);
						ui.createRoomButton = ui.create.div(".forceopaque.menubutton.large.connectevents.pointerdiv.left2", "创建房间", ui.window, function () {
							if (!_status.creatingroom) {
								_status.creatingroom = true;
								ui.click.connectMenu();
							}
						});
						if (events.length) {
							ui.connectEventsCount.innerHTML = events.filter(function (evt) {
								return evt.creator == game.onlineKey || !get.is.banWords(evt.content);
							}).length;
							ui.connectEventsCount.show();
						}
					}
					game.wsid = wsid;
					lib.message.client.updaterooms(list, clients);
					lib.message.client.updateevents(events);
					ui.exitroom = ui.create.system(
						"退出房间",
						function () {
							game.saveConfig("tmp_owner_roomId");
							game.saveConfig("tmp_user_roomId");
							if (ui.rooms) {
								game.saveConfig("reconnect_info");
							} else {
								if (lib.config.reconnect_info) {
									lib.config.reconnect_info.length = 1;
									game.saveConfig("reconnect_info", lib.config.reconnect_info);
								}
							}
							game.reload();
						},
						true
					);

					var findRoom = function (id) {
						for (var room of ui.rooms) {
							if (room.key == id) return room;
						}
						return false;
					};
					if (typeof lib.config.tmp_owner_roomId == "string") {
						if (typeof game.roomId != "string" && !findRoom(lib.config.tmp_owner_roomId)) {
							lib.configOL.mode = lib.config.connect_mode;
							game.roomId = lib.config.tmp_owner_roomId;
						}
						game.saveConfig("tmp_owner_roomId");
					}
					if (typeof lib.config.tmp_user_roomId == "string") {
						if (typeof game.roomId != "string") {
							if (findRoom(lib.config.tmp_user_roomId)) {
								game.roomId = lib.config.tmp_user_roomId;
							} else {
								ui.create.connecting();
								(function () {
									var n = 10;
									var id = lib.config.tmp_user_roomId;
									var interval = setInterval(function () {
										if (n > 0) {
											n--;
											if (findRoom(id)) {
												clearInterval(interval);
												game.send("server", "enter", id, get.connectNickname(), lib.config.connect_avatar);
											}
										} else {
											ui.create.connecting(true);
											clearInterval(interval);
										}
									}, 500);
								})();
							}
						}
						game.saveConfig("tmp_user_roomId");
					}

					if (window.isNonameServer) {
						var cfg = "pagecfg" + window.isNonameServer;
						if (lib.config[cfg]) {
							lib.configOL = lib.config[cfg][0];
							game.send("server", "server", lib.config[cfg].slice(1));
							game.saveConfig(cfg);
							_status.protectingroom = true;
							setTimeout(function () {
								_status.protectingroom = false;
								if (!lib.node || !lib.node.clients || !lib.node.clients.length) {
									game.reload();
								}
							}, 15000);
						} else {
							game.send("server", "server");
						}
					} else if (typeof game.roomId == "string") {
						var room = findRoom(game.roomId);
						if (game.roomIdServer && room && (room.serving || !room.version)) {
							console.log();
							if (lib.config.reconnect_info) {
								lib.config.reconnect_info[2] = null;
								game.saveConfig("reconnect_info", lib.config.reconnect_info);
							}
						} else {
							ui.create.connecting();
							game.send("server", game.roomId == game.onlineKey ? "create" : "enter", game.roomId, get.connectNickname(), lib.config.connect_avatar);
						}
					}
					lib.init.onfree();
				};
				if (_status.event.parent) {
					game.forceOver("noover", proceed);
				} else {
					proceed();
				}
			},
			updaterooms: function (list, clients) {
				if (ui.rooms) {
					var map = {},
						map2 = {};
					for (var i of ui.rooms) map2[i.key] = true;
					for (var i of list) {
						if (!i) continue;
						map[i[4]] = i;
					}
					ui.window.classList.add("more_room");
					for (var i = 0; i < ui.rooms.length; i++) {
						if (!map[ui.rooms[i].key]) {
							ui.rooms[i].remove();
							ui.rooms.splice(i--, 1);
						} else ui.rooms[i].initRoom(list[i]);
					}
					for (var i of list) {
						if (!i) continue;
						map[i[4]] = i;
						if (!map2[i[4]]) {
							var player = ui.roombase.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block;white-space:nowrap">空房间</div>');
							player.roomindex = i;
							player.initRoom = lib.element.Player.prototype.initRoom;
							player.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.connectroom);
							player.initRoom(i);
							ui.rooms.push(player);
						}
					}
					if (!_status.requestReadClipboard && get.config("read_clipboard", "connect")) {
						const read = text => {
							try {
								var roomId = text.split("\n")[1].match(/\d+/);
								var caption = ui.rooms.find(caption => caption.key == roomId);
								if (caption && (_status.read_clipboard_text || confirm(`是否通过复制的内容加入${roomId}房间？`))) {
									ui.click.connectroom.call(caption);
									delete _status.read_clipboard_text;
								}
							} catch (e) {
								console.log(e);
							}
						};
						//每次启动只请求一次
						_status.requestReadClipboard = true;
						if (_status.read_clipboard_text) {
							read(_status.read_clipboard_text);
						} else {
							window.focus();
							if (navigator.clipboard && lib.node) {
								navigator.clipboard
									.readText()
									.then(read)
									.catch(_ => {});
							} else {
								var input = ui.create.node("textarea", ui.window, { opacity: "0" });
								input.select();
								var result = document.execCommand("paste");
								input.blur();
								ui.window.removeChild(input);
								if (result || input.value.length > 0) read(input.value);
								else if (confirm("是否输入邀请链接以加入房间？")) {
									var text = prompt("请输入邀请链接");
									if (typeof text == "string" && text.length > 0) read(text);
								}
							}
						}
					}
				}
				lib.message.client.updateclients(clients, true);
			},
			updateclients: function (clients, bool) {
				if (clients && ui.connectClients) {
					ui.connectClients.info = clients;
					ui.connectClientsCount.innerHTML = clients.length;
				}
				if (_status.connectClientsCallback) {
					_status.connectClientsCallback();
				}
			},
			updateevents: function (events) {
				if (events && ui.connectEvents) {
					ui.connectEvents.info = events;
					var num = events.filter(function (evt) {
						return typeof evt.creator == "string" && (evt.creator == game.onlineKey || !get.is.banWords(evt.content));
					}).length;
					if (num) {
						ui.connectEventsCount.innerHTML = num;
						ui.connectEventsCount.show();
					} else {
						ui.connectEventsCount.hide();
					}
					if (_status.connectEventsCallback) {
						_status.connectEventsCallback();
					}
				}
			},
			eventsdenied: function (reason) {
				var str = "创建约战失败";
				if (reason == "total") {
					str += "，约战总数不能超过20";
				} else if (reason == "time") {
					str += "，时间已过";
				} else if (reason == "ban") {
					str += "，请注意文明发言";
				}
				alert(str);
			},
			init: function (id, config, ip, servermode, roomId) {
				game.online = true;
				game.onlineID = id;
				game.ip = ip;
				game.servermode = servermode;
				game.roomId = roomId;
				if (game.servermode) {
					game.saveConfig("reconnect_info", [_status.ip, id, game.roomId]);
				} else {
					game.saveConfig("reconnect_info", [_status.ip, id]);
					game.saveConfig("tmp_user_roomId", roomId);
				}
				lib.config.recentIP.remove(_status.ip);
				lib.config.recentIP.unshift(_status.ip);
				lib.config.recentIP.splice(5);
				game.saveConfig("recentIP", lib.config.recentIP);
				_status.connectMode = true;
				lib.configOL = config;
				lib.playerOL = {};
				lib.cardOL = {};
				lib.vcardOL = {};

				game.clearArena();
				game.finishCards();
				ui.create.roomInfo();
				ui.create.chat();
				if (game.servermode) {
					ui.create.connectPlayers(get.modetrans(config, true));
				} else {
					ui.create.connectPlayers(ip);
				}
				ui.pause.hide();
				ui.auto.hide();
				game.clearConnect();
				clearTimeout(_status.createNodeTimeout);

				var proceed = function () {
					game.loadModeAsync(config.mode, function (mode) {
						for (var i in mode.ai) {
							if (typeof mode.ai[i] == "object") {
								if (ai[i] == undefined) ai[i] = {};
								for (var j in mode.ai[i]) {
									ai[i][j] = mode.ai[i][j];
								}
							} else {
								ai[i] = mode.ai[i];
							}
						}
						for (var i in mode.get) {
							if (typeof mode.get[i] == "object") {
								if (get[i] == undefined) get[i] = {};
								for (var j in mode.get[i]) {
									get[i][j] = mode.get[i][j];
								}
							} else {
								get[i] = mode.get[i];
							}
						}
						for (var i in mode.translate) {
							lib.translate[i] = mode.translate[i];
						}
						if (mode.game) {
							game.getIdentityList = mode.game.getIdentityList;
							game.updateState = mode.game.updateState;
							game.getRoomInfo = mode.game.getRoomInfo;
						}
						if (mode.element && mode.element.player) {
							Object.defineProperties(lib.element.Player.prototype, Object.getOwnPropertyDescriptors(mode.element.player));
						}
						if (mode.skill) {
							for (var i in mode.skill) {
								lib.skill[i] = mode.skill[i];
							}
						}
						if (mode.card) {
							for (var i in mode.card) {
								lib.card[i] = mode.card[i];
							}
						}
						game.finishCards();
						if (mode.characterPack) {
							for (var i in mode.characterPack) {
								lib.characterPack[i] = mode.characterPack[i];
							}
						}
						_status.event = lib.element.GameEvent.initialGameEvent();
						_status.paused = false;
						game.createEvent("game", false).setContent(lib.init.startOnline);
						game.loop();
						game.send("inited");
						ui.create.connecting(true);
					});
				};
				if (_status.event.parent) {
					game.forceOver("noover", proceed);
				} else {
					proceed();
				}
				for (var i in lib.characterPack) {
					for (var j in lib.characterPack[i]) {
						lib.character[j] = lib.character[j] || lib.characterPack[i][j];
					}
				}
			},
			reinit: function (config, state, state2, ip, observe, onreconnect, cardtag, postReconnect) {
				ui.auto.show();
				ui.pause.show();
				game.clearConnect();
				clearTimeout(_status.createNodeTimeout);
				game.online = true;
				game.ip = ip;
				game.servermode = state.servermode;
				game.roomId = state.roomId;
				if (state.over) {
					_status.over = true;
				}
				if (observe) {
					game.observe = true;
					game.onlineID = null;
					game.roomId = null;
				}
				if (game.servermode && !observe) {
					game.saveConfig("reconnect_info", [_status.ip, game.onlineID, game.roomId]);
				} else {
					game.saveConfig("reconnect_info", [_status.ip, game.onlineID]);
					if (!observe) {
						game.saveConfig("tmp_user_roomId", game.roomId);
					}
				}
				_status.connectMode = true;
				lib.configOL = config;
				lib.playerOL = {};
				lib.cardOL = {};
				lib.vcardOL = {};

				game.loadModeAsync(config.mode, function (mode) {
					for (var i in mode.ai) {
						if (typeof mode.ai[i] == "object") {
							if (ai[i] == undefined) ai[i] = {};
							for (var j in mode.ai[i]) {
								ai[i][j] = mode.ai[i][j];
							}
						} else {
							ai[i] = mode.ai[i];
						}
					}
					for (var i in mode.get) {
						if (typeof mode.get[i] == "object") {
							if (get[i] == undefined) get[i] = {};
							for (var j in mode.get[i]) {
								get[i][j] = mode.get[i][j];
							}
						} else {
							get[i] = mode.get[i];
						}
					}
					for (var i in mode.translate) {
						lib.translate[i] = mode.translate[i];
					}
					if (mode.game) {
						game.getIdentityList = mode.game.getIdentityList;
						game.getIdentityList2 = mode.game.getIdentityList2;
						game.updateState = mode.game.updateState;
						game.showIdentity = mode.game.showIdentity;
					}
					if (mode.element && mode.element.player) {
						Object.defineProperties(lib.element.Player.prototype, Object.getOwnPropertyDescriptors(mode.element.player));
					}
					if (mode.skill) {
						for (var i in mode.skill) {
							lib.skill[i] = mode.skill[i];
						}
					}
					if (mode.card) {
						for (var i in mode.card) {
							lib.card[i] = mode.card[i];
						}
					}
					game.finishCards();
					if (mode.characterPack) {
						for (var i in mode.characterPack) {
							lib.characterPack[i] = mode.characterPack[i];
						}
					}
					if (mode.onreinit) {
						mode.onreinit();
					}
					_status.cardtag = get.parsedResult(cardtag);
					game.players = [];
					game.dead = [];
					for (var i in lib.characterPack) {
						for (var j in lib.characterPack[i]) {
							lib.character[j] = lib.character[j] || lib.characterPack[i][j];
						}
					}
					game.clearArena();
					game.finishCards();
					if (!observe) {
						ui.create.chat();
						if (ui.exitroom) {
							ui.exitroom.remove();
							delete ui.exitroom;
						}
					} else {
						if (!ui.exitroom) {
							ui.create.system(
								"退出旁观",
								function () {
									game.saveConfig("reconnect_info");
									game.reload();
								},
								true
							);
						}
						if (!lib.configOL.observe_handcard) {
							ui.arena.classList.add("observe");
						}
					}
					postReconnect = get.parsedResult(postReconnect);
					for (var i in postReconnect) {
						if (Array.isArray(postReconnect[i])) {
							postReconnect[i].shift().apply(this, postReconnect[i]);
						}
					}
					state = get.parsedResult(state);
					
					_status.mode = state.mode;
					_status.renku = state.renku;
					lib.inpile = state.inpile;
					lib.inpile_nature = state.inpile_nature;
					//xingBei
					game.hongShiQi = state.hongShiQi;
					game.lanShiQi = state.lanShiQi;
					game.hongZhanJi = state.hongZhanJi;
					game.lanZhanJi = state.lanZhanJi;
					game.hongXingBei = state.hongXingBei;
					game.lanXingBei = state.lanXingBei;
					game.moDanFangXiang = state.moDanFangXiang;
                    
					if(lib.configOL.phaseswap && observe) ui.arena.setNumber(state.number-1);
					else ui.arena.setNumber(state.number);

					var pos = state.players[observe || game.onlineID].position;
					for (var i in state.players) {
						var info = state.players[i];
						var player = ui.create.player(ui.arena).addTempClass("start");
						if(lib.configOL.phaseswap && !observe){
							player.dataset.position = info.position;
						}else{
							player.dataset.position = info.position < pos ? info.position - pos + parseInt(state.number) : info.position - pos;
						}
						if (i == observe || i == game.onlineID) {
							game.me = player;
						}
						if (player.setModeState) {
							player.setModeState(info);
						} else {
							player.init(info.name1, info.name2);
							if (info.name && info.name != info.name1) player.name = info.name;
						}
						if (!info.unseen) player.classList.remove("unseen");
						if (!info.unseen2) player.classList.remove("unseen2");
						if (!player.isUnseen(2) && player.storage.nohp) {
							delete player.storage.nohp;
							player.node.hp.show();
						}
						player.playerid = i;
						player.nickname = info.nickname;
						player.group = info.group;
						player.node.name.dataset.nature = get.groupnature(info.group);
						player.identity = info.identity;
						player.identityShown = info.identityShown;
						player.hp = info.hp;
						player.maxHp = info.maxHp;
						player.zhiLiao = info.zhiLiao;
						//player.hujia = info.hujia;
						player.sex = info.sex;
						player.side = info.side;
						player.phaseNumber = info.phaseNumber;
						player.seatNum = info.seatNum;
						player.disabledSlots = info.disabledSlots;
						player.expandedSlots = info.expandedSlots;
						player.setNickname();
						if (info.dead) {
							player.classList.add("dead");
							if (lib.config.die_move) {
								player.$dieflip();
							}
							if (player.$dieAfter) {
								player.$dieAfter();
							}
							game.dead.push(player);
						} else {
							game.players.push(player);
						}
						if (info.linked) {
							player.addLink();
						}
						if (info.turnedover) {
							player.classList.add("turnedover");
						}
						if (info.out) {
							player.classList.add("out");
						}
						if (info.disableJudge) {
							player.$disableJudge();
						}
						player.$syncDisable();

						player.directgain(info.handcards);
						lib.playerOL[i] = player;
						if (info.vcardsMap) {
							for (var i = 0; i < info.vcardsMap.equips.length; i++) {
								player.addVirtualEquip(info.vcardsMap.equips[i], info.vcardsMap.equips[i].cards);
							}
							for (var i = 0; i < info.vcardsMap.judges.length; i++) {
								player.addVirtualJudge(info.vcardsMap.judges[i], info.vcardsMap.judges[i].cards);
							}
						}
						for (var i = 0; i < info.handcards.length; i++) {
							info.handcards[i].addGaintag(info.gaintag[i]);
						}
						for (var i = 0; i < info.specials.length; i++) {
							info.specials[i].classList.add("glows");
						}
						if (info.expansions.length) {
							var expansion_gaintag = [];
							player.$addToExpansion(info.expansions);
							for (var i = 0; i < info.expansions.length; i++) {
								info.expansions[i].addGaintag(info.expansion_gaintag[i]);
								expansion_gaintag.addArray(info.expansion_gaintag[i]);
							}
							for (var i of expansion_gaintag) player.markSkill[i];
						}
						for (var i = 0; i < info.judges.length; i++) {
							if (info.views[i] && info.views[i] != info.judges[i]) {
								info.judges[i].classList.add("fakejudge");
								info.judges[i].viewAs = info.views[i];
								info.judges[i].node.background.innerHTML = lib.translate[info.views[i] + "_bg"] || get.translation(info.views[i])[0];
							}
							player.node.judges.appendChild(info.judges[i]);
						}
						ui.updatej(player);
						if (!player.setModeState) {
							if (!game.getIdentityList && info.identityNode) {
								player.node.identity.innerHTML = info.identityNode[0];
								player.node.identity.dataset.color = info.identityNode[1];
							} else if (player == game.me || player.identityShown || observe) {
								player.setIdentity();
								player.forceShown = true;
							} else {
								player.setIdentity("cai");
							}
							if (!lib.configOL.observe_handcard && (lib.configOL.mode == "identity" || lib.configOL.mode == "guozhan")) {
								if (observe && !player.identityShown) {
									player.setIdentity("cai");
									player.forceShown = false;
								}
							}
						}
						player.update();
					}
					ui.create.me(true);
					if(lib.configOL.phaseswap && !observe){
						game.singleHandcard = true;
						ui.arena.classList.add("single-handcard");
						ui.window.classList.add("single-handcard");
						ui.fakeme = ui.create.div(".fakeme.avatar");
						ui.me.appendChild(ui.fakeme);

						let name=game.me.name;
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
					game.arrangePlayers();
					//xingBei更新战绩区
					ui.shiQiInfo=ui.create.div('.touchinfo.bottom-right',ui.window);
                    ui.updateShiQiInfo();

					_status.event = lib.element.GameEvent.initialGameEvent();
					_status.paused = false;
					_status.dying = get.parsedResult(state.dying) || [];

					if (game.updateState) {
						game.updateState(state2);
					}
					var next = game.createEvent("game", false);
					next.setContent(lib.init.startOnline);
					if (observe) {
						next.custom.replace.target = function (player) {
							if (!lib.configOL.observe_handcard && lib.configOL.mode == "guozhan") {
								return;
							}
							if (player.isAlive()) {
								if (!game.me.identityShown && lib.configOL.mode == "guozhan") {
									game.me.node.identity.firstChild.innerHTML = "猜";
									game.me.node.identity.dataset.color = "unknown";
								}
								game.swapPlayer(player);
								if (!game.me.identityShown && lib.configOL.mode == "guozhan") {
									game.me.node.identity.firstChild.innerHTML = "";
								}
							}
						};
					} else {
						if (Array.isArray(onreconnect)) {
							onreconnect.shift().apply(this, onreconnect);
						}
					}
					game.loop();
					game.send("reinited");
					game.showHistory();
					_status.gameStarted = true;
					if (lib.config.show_cardpile) {
						ui.cardPileButton.style.display = "";
					}
					if (!observe && game.me && (game.me.isDead() || _status.over)) {
						ui.create.exit();
					}
					ui.updatehl();
					ui.create.connecting(true);
				});
			},
			exec: function (func) {
				const key = game.onlineKey;
				if (typeof func == "function") {
					const isMarshalled = security.isSandboxRequired() && security.importSandbox().Domain.current.isFrom(func);
					// 被封送的函数额外间隔了四层调用栈
					const level = isMarshalled ? 4 : 0;
					const args = Array.from(arguments).slice(1);
					ErrorManager.errorHandle(
						() => {
							func.apply(this, args);
						},
						func,
						level
					);
				}
				if (key) {
					game.onlineKey = key;
					localStorage.setItem(lib.configprefix + "key", game.onlineKey);
				}
			},
			denied: function (reason) {
				switch (reason) {
					case "version":
						alert("加入失败：版本不匹配，请将游戏更新至最新版");
						game.saveConfig("tmp_owner_roomId");
						game.saveConfig("tmp_user_roomId");
						game.saveConfig("reconnect_info");
						break;
					case "gaming":
						alert("加入失败：游戏已开始");
						break;
					case "number":
						alert("加入失败：房间已满");
						break;
					case "banned":
						alert("加入失败：房间拒绝你加入");
						break;
					case "key":
						alert("您的游戏版本过低，请升级到最新版");
						game.saveConfig("tmp_owner_roomId");
						game.saveConfig("tmp_user_roomId");
						game.saveConfig("reconnect_info");
						break;
					case "offline":
						if (_status.paused && _status.event.name == "game") {
							setTimeout(game.resume, 500);
						}
						break;
					case "extension":
						if (confirm("加入失败：房间禁止使用扩展！是否关闭所有扩展？")) {
							let libexts = lib.config.extensions;
							for (let i = 0; i < libexts.length; i++) {
								game.saveConfig("extension_" + libexts[i] + "_enable", false);
							}
						}
						break;
					default:
						alert(reason); //其它原因直接弹窗显示
				}
				game.ws.close();
				if (_status.connectDenied) {
					_status.connectDenied();
				}
			},
			cancel: function (id) {
				if (_status.event._parent_id == id) {
					ui.click.cancel();
				}
				if (_status.event.id == id) {
					if (_status.event._backup) ui.click.cancel();
					ui.click.cancel();
					if (ui.confirm) {
						ui.confirm.close();
					}
					if (_status.event.result) {
						_status.event.result.id = id;
					}
				}
			},
			closeDialog: function (id) {
				var dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
				}
			},
			createDialog: function (id) {
				var args = Array.from(arguments);
				args.shift();
				ui.create.dialog.apply(this, args).videoId = id;
			},
			gameStart: function () {
				for (var i = 0; i < game.connectPlayers.length; i++) {
					game.connectPlayers[i].delete();
				}
				delete game.connectPlayers;
				if (ui.connectStartButton) {
					ui.connectStartButton.delete();
					delete ui.connectStartButton;
				}
				if (ui.connectStartBar) {
					ui.connectStartBar.delete();
					delete ui.connectStartBar;
				}
				if (ui.connectShareButton) {
					ui.connectShareButton.delete();
					delete ui.connectShareButton;
				}
				if (ui.roomInfo) {
					ui.roomInfo.remove();
					delete ui.roomInfo;
				}
				if (ui.exitroom) {
					ui.exitroom.remove();
					delete ui.exitroom;
				}
				ui.auto.show();
				ui.pause.show();
				if (lib.config.show_cardpile) {
					ui.cardPileButton.style.display = "";
				}
				_status.gameStarted = true;
				game.showHistory();
			},
			updateWaiting: function (map) {
				if (!game.connectPlayers) return;
				if (!lib.translate.zhu) {
					lib.translate.zhu = "主";
				}
				game.onlinezhu = false;
				_status.waitingForPlayer = true;
				for (var i = 0; i < map.length; i++) {
					if (map[i] == "disabled") {
						game.connectPlayers[i].classList.add("unselectable2");
					} else {
						game.connectPlayers[i].classList.remove("unselectable2");
						if (map[i]) {
							game.connectPlayers[i].initOL(map[i][0], map[i][1]);
							game.connectPlayers[i].playerid = map[i][2];
							if (map[i][3] == "zhu") {
								game.connectPlayers[i].setIdentity("zhu");
								if (map[i][2] == game.onlineID) {
									game.onlinezhu = true;
									if (ui.roomInfo) {
										ui.roomInfo.innerHTML = "房间设置";
									}
									if (ui.connectStartButton) {
										ui.connectStartButton.innerHTML = "开始游戏";
									}
								}
							} else {
								game.connectPlayers[i].node.identity.firstChild.innerHTML = "";
							}
						} else {
							game.connectPlayers[i].uninitOL();
							delete game.connectPlayers[i].playerid;
						}
					}
				}
			},
		},
	};
	//为lib.numstrList属性set数字对应花色，即可在get.strNumber和get.numString中获取使用
	numstrList = new Map([
		[1, "A"],
		[11, "J"],
		[12, "Q"],
		[13, "K"],
	]);
	xiBie = ["an", "huo", "di", "feng","lei",'shui',"guang"];
	xiBies = ["an", "huo", "di", "feng","lei",'shui',"guang","none"];
	mingGe = ["ji", "xue", "huan", "sheng", "yong"];
	color = {
		black: ["club", "spade"],
		red: ["diamond", "heart"],
		none: ["none"],
	};
	group = ["jiGroup", "xueGroup", "huanGroup", "shengGroup", "yongGroup"];
	//数值代表各元素在名称中排列的先后顺序
	nature = new Map([
		["fire", 20],
		["thunder", 30],
		["kami", 60],
		["ice", 40],
		["stab", 10],
		["poison", 50],
	]);
	natureAudio = {
		damage: {
			fire: "default", //默认，即语音放置在audio/effect下，以damage_fire.mp3 damage_fire2.mp3命名。
			thunder: "default",
			ice: "default",
			stab: "normal", //正常，即与普通伤害音效相同。
			/*
			'example':{
				1:'../extension/XXX/damage_example.mp3',//1点伤害。
				2:'../extension/XXX/damage_example2.mp3',//2点及以上伤害
			}
			*/
		},
		hujia_damage: {
			fire: "default", //默认，即语音放置在audio/effect下，以hujia_damage_fire.mp3 hujia_damage_fire2.mp3命名。
			thunder: "default",
			ice: "normal", //正常，即与普通伤害音效相同。
			/*
			'example':{
				1:'../extension/XXX/damage_example.mp3',//1点伤害。
				2:'../extension/XXX/damage_example2.mp3',//2点及以上伤害
			}
			*/
		},
		sha: {
			fire: "default", //默认，即语音放置在audio/card/male与audio/card/female下，命名为sha_fire.mp3
			thunder: "default",
			ice: "default",
			stab: "default",
			poison: "normal", //正常，即播放“杀”的音效。
			kami: "normal",
			/*
			'example':{
				'male':'../extension/XXXX/sha_example_male.mp3',
				'female':'../extension/XXXX/sha_example_female.mp3'
			}
			*/
		},
	};
	linked = ["fire", "thunder", "kami", "ice"];
	natureBg = new Map([["stab", "image/card/cisha.png"]]);
	natureSeparator = "|";
	namePrefix = new Map([
		[
			"界",
			{
				color: "#fdd559",
				nature: "soilmm",
			},
		],
		[
			"谋",
			{
				color: "#def7ca",
				nature: "woodmm",
			},
		],
		[
			"武",
			{
				color: "#fd8359",
				nature: "soilmm",
			},
		],
		[
			"乐",
			{
				color: "#f7f4fc",
				nature: "keymm",
			},
		],
		[
			"神",
			{
				color: "#faecd1",
				nature: "orangemm",
			},
		],
		[
			"族",
			{
				color: "#ee9ac7",
				nature: "firemm",
			},
		],
		[
			"晋",
			{
				color: "#f3c5ff",
				nature: "blackmm",
			},
		],
		[
			"侠",
			{
				color: "#eeeeee",
				nature: "qunmm",
			},
		],
		[
			"起",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"承",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"转",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"合",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"衰",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"兴",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"梦",
			{
				color: "#6affe2",
				nature: "watermm",
			},
		],
		[
			"用间",
			{
				color: "#c3f9ff",
				nature: "thundermm",
			},
		],
		[
			"战役篇",
			{
				color: "#c3f9ff",
				nature: "thundermm",
				showName: "战",
			},
		],
		[
			"武将传",
			{
				color: "#c3f9ff",
				nature: "thundermm",
				showName: "传",
			},
		],
		[
			"将",
			{
				nature: "firemm",
			},
		],
		[
			"新杀",
			{
				color: "#fefedc",
				nature: "metalmm",
				showName: "新",
			},
		],
		[
			"旧",
			{
				color: "#a4a4a4",
				nature: "black",
			},
		],
		[
			"旧界",
			{
				color: "#a4a4a4",
				nature: "black",
			},
		],
		[
			"节钺",
			{
				color: "#a4a4a4",
				nature: "black",
			},
		],
		[
			"毅重",
			{
				color: "#a4a4a4",
				nature: "black",
			},
		],
		[
			"★SP",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("SP")}`,
			},
		],
		[
			"☆SP",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("SP")}`,
			},
		],
		[
			"J.SP",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("SP")}`,
			},
		],
		[
			"K系列",
			{
				showName: "Ｋ",
			},
		],
		[
			"经典",
			{
				showName: "典",
			},
		],
		[
			"君",
			{
				color: "#fefedc",
				nature: "shenmm",
			},
		],
		[
			"骰子",
			{
				getSpan: () => {
					const span = document.createElement("span");
					span.style.fontFamily = "NonameSuits";
					span.textContent = "🎲";
					return span.outerHTML;
				},
			},
		],
		[
			"蛇",
			{
				getSpan: () => {
					const span = document.createElement("span");
					span.style.fontFamily = "NonameSuits";
					span.textContent = "🐍";
					return span.outerHTML;
				},
			},
		],
		[
			"SP",
			{
				getSpan: () => {
					const span = document.createElement("span"),
						style = span.style;
					style.writingMode = style.webkitWritingMode = "horizontal-tb";
					style.fontFamily = "MotoyaLMaru";
					style.transform = "scaleY(0.85)";
					span.textContent = "SP";
					return span.outerHTML;
				},
			},
		],
		[
			"OL",
			{
				getSpan: () => {
					const span = document.createElement("span"),
						style = span.style;
					style.writingMode = style.webkitWritingMode = "horizontal-tb";
					style.fontFamily = "MotoyaLMaru";
					style.transform = "scaleY(0.85)";
					span.textContent = "OL";
					return span.outerHTML;
				},
			},
		],
		[
			"RE",
			{
				getSpan: () => {
					const span = document.createElement("span"),
						style = span.style;
					style.writingMode = style.webkitWritingMode = "horizontal-tb";
					style.fontFamily = "MotoyaLMaru";
					style.transform = "scaleY(0.85)";
					span.textContent = "RE";
					return span.outerHTML;
				},
			},
		],
		[
			"手杀",
			{
				getSpan: (prefix, name) => {
					const simple = lib.config.buttoncharacter_prefix == "simple",
						span = document.createElement("span");
					if (lib.characterPack.shiji && name in lib.characterPack.shiji) {
						for (const entry of Object.entries(lib.characterSort.shiji)) {
							if (!entry[1].includes(name)) continue;
							prefix = get.translation(entry[0]).slice(-1);
							break;
						}
						if (!simple) {
							span.style.color = "#def7ca";
							span.dataset.nature = "watermm";
						}
						span.innerHTML = prefix;
					} else if (simple) span.textContent = "手杀";
					else {
						span.style.fontFamily = "NonameSuits";
						span.textContent = "📱";
					}
					return span.outerHTML;
				},
			},
		],
		[
			"TW",
			{
				getSpan: () => {
					const span = document.createElement("span"),
						style = span.style;
					style.writingMode = style.webkitWritingMode = "horizontal-tb";
					style.fontFamily = "MotoyaLMaru";
					style.transform = "scaleY(0.85)";
					span.textContent = "TW";
					return span.outerHTML;
				},
			},
		],
		[
			"汉末",
			{
				showName: "汉",
				color: "#fefedc",
				nature: "shenmm",
			},
		],
		[
			"汉末神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("汉末")}${get.prefixSpan("神")}`,
			},
		],
		[
			"TW神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("TW")}${get.prefixSpan("神")}`,
			},
		],
		[
			"TW将",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("TW")}${get.prefixSpan("将")}`,
			},
		],
		[
			"OL神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("OL")}${get.prefixSpan("神")}`,
			},
		],
		[
			"旧神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("旧")}${get.prefixSpan("神")}`,
			},
		],
		[
			"旧晋",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("旧")}${get.prefixSpan("晋")}`,
			},
		],
		[
			"新杀SP",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("新杀")}${get.prefixSpan("SP")}`,
			},
		],
		[
			"界SP",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("界")}${get.prefixSpan("SP")}`,
			},
		],
		[
			"S特神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("★")}${get.prefixSpan("神")}`,
			},
		],
		[
			"手杀界",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("手杀")}${get.prefixSpan("界")}`,
			},
		],
		[
			"手杀SP",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("手杀")}${get.prefixSpan("SP")}`,
			},
		],
		[
			"战役篇神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("战役篇")}${get.prefixSpan("神")}`,
			},
		],
		[
			"星",
			{
				color: "#ffd700",
				nature: "glodenmm",
			},
		],
		[
			"OL界",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("OL")}${get.prefixSpan("界")}`,
			},
		],
		[
			"OL谋",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("OL")}${get.prefixSpan("谋")}`,
			},
		],
		[
			"新杀谋",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("新杀")}${get.prefixSpan("谋")}`,
			},
		],
		[
			"经典神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("经典")}${get.prefixSpan("神")}`,
			},
		],
		[
			"旧谋",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("旧")}${get.prefixSpan("谋")}`,
			},
		],
		[
			"手杀神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("手杀")}${get.prefixSpan("神")}`,
			},
		],
		[
			"龙",
			{
				color: "#ff0000",
				nature: "firemm",
			},
		],
		[
			"桃",
			{
				color: "#FFC0CB",
				nature: "firemm",
			},
		],
		[
			"桃神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("桃")}${get.prefixSpan("神")}`,
			},
		],
		[
			"玄",
			{
				color: "#000000",
				nature: "metalmm",
			},
		],
		[
			"荆",
			{
				color: "#00ff00",
				nature: "firemm",
			},
		],
		[
			"荆神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("荆")}${get.prefixSpan("神")}`,
			},
		],
		[
			"魂",
			{
				color: "#ffff99",
				nature: "firemm",
			},
		],
		[
			"幻",
			{
				color: "#ffff99",
				nature: "firemm",
			},
		],
		[
			"标",
			{
				color: "#912cee",
				nature: "metalmm",
			},
		],
		[
			"牢",
			{
				color: "#EEEE00",
				nature: "black",
			},
		],
		[
			"牢神",
			{
				/**
				 * @returns {string}
				 */
				getSpan: () => `${get.prefixSpan("牢")}${get.prefixSpan("神")}`,
			},
		],
		[
			"友",
			{
				color: "#AAABFF",
				nature: "black",
			},
		],
		[
			"九鼎",
			{
				showName: "鼎",
				color: "#ffccff",
				nature: "black",
			},
		],
		[
			"SCL",
			{
				showName: "競",
				color: "#fefedc",
				nature: "soilmm",
			},
		],
		[
			"忠",
			{
				color: "#ffd700",
				nature: "metal",
			},
		],
		[
			"燕幽",
			{
				showName: "幽",
				color: "#ff6a6a",
				nature: "red",
			},
		],
		[
			"威",
			{
				color: "#ff9966",
				nature: "glodenmm",
			},
		],
		[
			"势",
			{
				color: "#7d26cd",
				nature: "purplemm",
			},
		],
		[
			"三版",
			{
				showName: "三",
				color: "#ffff99",
				nature: "firemm",
			},
		],
		[
			"四版",
			{
				showName: "四",
				color: "#ffff99",
				nature: "firemm",
			},
		],
		[
			"FAQ",
			{
				getSpan: () => {
					const span = document.createElement("span"),
						style = span.style;
					style.fontFamily = "MotoyaLMaru";
					style.fontSize = "10px";
					style.color = "#E9F0F6";
					span.textContent = "FAQ";
					return span.outerHTML;
				},
			},
		],
		[
			"农",
			{
				showName: "农",
				color: "#672e3d",
				nature: "purplemm",
			},
		],
		[
			"trick",
			{
				showName: "trick",
				color: "#672e3d",
				nature: "metal",
			},
		],
	]);
	groupnature = {
		shen: "shen",
		wei: "water",
		shu: "soil",
		wu: "wood",
		qun: "qun",
		western: "thunder",
		key: "key",
		jin: "thunder",
		ye: "thunder",
	};
	lineColor = new Map([
		["fire", [255, 146, 68]],
		["yellow", [255, 255, 122]],
		["blue", [150, 202, 255]],
		["green", [141, 255, 216]],
		["ice", [59, 98, 115]],
		["thunder", [141, 216, 255]],
		["kami", [90, 118, 99]],
		["white", [255, 255, 255]],
		["poison", [104, 221, 127]],
		["brown", [195, 161, 223]],
		["legend", [233, 131, 255]],
	]);
	phaseName = ["phaseZhunbei", "phaseJudge", "phaseDraw", "phaseUse", "phaseDiscard", "phaseJieshu"];
	quickVoice = ["我从未见过如此厚颜无耻之人！", "这波不亏", "请收下我的膝盖", "你咋不上天呢", "放开我的队友，冲我来", "你随便杀，闪不了算我输", "见证奇迹的时刻到了", "能不能快一点啊，兵贵神速啊", "主公，别开枪，自己人", "小内再不跳，后面还怎么玩儿啊", "你们忍心，就这么让我酱油了？", "我，我惹你们了吗", "姑娘，你真是条汉子", "三十六计，走为上，容我去去便回", "人心散了，队伍不好带啊", "昏君，昏君啊！", "风吹鸡蛋壳，牌去人安乐", "小内啊，您老悠着点儿", "不好意思，刚才卡了", "你可以打得再烂一点吗", "哥们，给力点儿行嘛", "哥哥，交个朋友吧", "妹子，交个朋友吧"];
	other = {
		ignore: () => void 0,
	};
	InitFilter = {
		noZhuHp: "不享受主公的额外体力上限",
		noZhuSkill: "不享受地主的额外技能",
	};
}

Library.prototype.config = undefined;
Library.prototype.configOL = undefined;

export let lib = new Library();

/**
 * @param { InstanceType<typeof Library> } [instance]
 */
export let setLibrary = instance => {
	lib = instance || new Library();
	if (lib.config.dev) {
		window.lib = lib;
	}
};

/**
 * @template T
 * @param {T} object
 */
const setAllPropertiesEnumerable = object => {
	Object.getOwnPropertyNames(object).forEach(propertyKey => {
		if (propertyKey == "constructor") return;
		const propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyKey);
		if (!propertyDescriptor.enumerable) propertyDescriptor.enumerable = true;
		Object.defineProperty(object, propertyKey, propertyDescriptor);
	}, {});
	return object;
};
setAllPropertiesEnumerable(lib.element.Player.prototype);
const cardPrototype = setAllPropertiesEnumerable(lib.element.Card.prototype),
	vCardPrototype = setAllPropertiesEnumerable(lib.element.VCard.prototype);
Object.keys(vCardPrototype).forEach(key => {
	Object.defineProperty(cardPrototype, key, Object.getOwnPropertyDescriptor(vCardPrototype, key));
});
setAllPropertiesEnumerable(lib.element.Button.prototype);
setAllPropertiesEnumerable(lib.element.GameEvent.prototype);
setAllPropertiesEnumerable(lib.element.Dialog.prototype);
setAllPropertiesEnumerable(lib.element.Control.prototype);
setAllPropertiesEnumerable(lib.element.Client.prototype);
setAllPropertiesEnumerable(lib.element.NodeWS.prototype);
