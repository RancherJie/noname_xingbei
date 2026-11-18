import { lib, game, ui, get, _status } from "../noname.js";

const chapterKey = "xingbeiRuleTutorialChapter";
const chapterNames = ["接住进攻", "为队伍攒星石", "拿下第五杯"];

function reloadChapter(chapter) {
	sessionStorage.setItem(chapterKey, chapter);
	game.saveConfig("mode", "tutorial");
	localStorage.setItem(lib.configprefix + "directstart", true);
	game.reload();
}

function exitTutorial() {
	sessionStorage.removeItem(chapterKey);
	game.saveConfig("mode", "xingBei");
	localStorage.setItem(lib.configprefix + "directstart", true);
	game.reload();
}

export function resumeRuleTutorial() {
	const chapter = Number(sessionStorage.getItem(chapterKey));
	sessionStorage.removeItem(chapterKey);
	if (!chapterNames[chapter - 1]) return false;
	startRuleTutorial(chapter);
	return true;
}

export function startRuleTutorial(chapter = 1) {
	const next = game.createEvent("ruleTutorial", false);
	next.setContent(async function (event) {
		lib.init.css(lib.assetURL + "layout/mode", "tutorial");
		_status.mode = "two";
		game.prepareArena(4);
		const [me, enemy, ally, otherEnemy] = game.players;
		event.player = me;
		const characters = [chapter === 2 ? "zhongCaiZhe" : "fengZhiJianSheng", "kuangZhanShi", "shengNv", "shenJianShou"];
		for (const [i, player] of game.players.entries()) {
			player.getId();
			player.init(characters[i]);
			player.side = i % 2 === 1;
			player.setSeatNum(i + 1);
			player.node.identity.firstChild.textContent = player.side ? "红" : "蓝";
			player.node.identity.dataset.color = player.side + "zhu";
			const skills = player.getSkills().filter(skill => !(chapter === 2 && player === ally && skill === "zhiLiaoShu"));
			player.disableSkill("tutorialBasics", skills);
		}

		// 每关独立开局，回合间由实际出牌、摸牌和结算改变局面。
		game.hongShiQi = game.lanShiQi = 15;
		if (chapter === 3) {
			game.lanXingBei = 4;
			game.lanZhanJi = ["baoShi", "shuiJing"];
		}
		ui.create.zhanJi();
		ui.updateShiQiInfo();
		_status.gameStarted = true;
		game.showHistory();

		const banner = ui.create.div(".tutorial-battle-hint", ui.window);
		banner.setAttribute("role", "status");
		const title = document.createElement("strong");
		title.textContent = chapter + " / 3　" + chapterNames[chapter - 1];
		banner.append(title);
		const message = document.createElement("span");
		banner.append(message);
		let anchor;
		let guidedTurn;
		let responseDemo;
		let skillPractice = false;
		let extraHint;
		const focusSelector = ".tutorial-focus";

		function placeHint() {
			const board = ui.window.getBoundingClientRect();
			const scale = board.width / ui.window.offsetWidth;
			if (scale) banner.style.fontSize = Math.min(28, Math.max(18, 14 / scale)) + "px";
			const box = anchor?.getBoundingClientRect();
			if (!box?.width || !scale) {
				banner.style.left = "";
				banner.style.top = "";
				return;
			}
			const width = banner.offsetWidth;
			const min = 12;
			const max = Math.max(min, ui.window.offsetWidth - width - min);
			const left = (box.left + box.width / 2 - board.left) / scale - width / 2;
			const above = (box.top - board.top) / scale - banner.offsetHeight - 14;
			const top = above >= 86 ? above : (box.bottom - board.top) / scale + 12;
			banner.style.left = Math.min(max, Math.max(min, left)) + "px";
			banner.style.top = Math.min(top, ui.window.offsetHeight - banner.offsetHeight - min) + "px";
		}
		window.addEventListener("resize", placeHint);

		function say(text, node, detail) {
			for (const item of ui.window.querySelectorAll(focusSelector)) item.classList.remove("tutorial-focus");
			anchor = node;
			extraHint = detail;
			message.textContent = text;
			placeHint();
		}
		function showChoices() {
			for (const item of ui.window.querySelectorAll(focusSelector)) item.classList.remove("tutorial-focus");
			if (extraHint) {
				message.textContent = extraHint;
				placeHint();
			}
			const choice = _status.event;
			if (choice?.player !== me) return;
			const choices = ui.arena.querySelectorAll(".card.selectable, .player.selectable, .button.selectable, .tdnode.selectable, .skills2 > div");
			const controls = choices.length ? choices : ui.confirm?.children || [];
			for (const node of controls) node.classList.add("tutorial-focus");
		}
		ui.create.system("提示", showChoices, true);
		const restartChapter = ui.create.system("重开本关", () => reloadChapter(chapter), true);
		ui.create.system("退出教学", exitTutorial, true);

		lib.skill._tutorial_guide = {
			trigger: { player: "xingDongBegin" },
			forced: true,
			popup: false,
			filter(event, player) {
				return guidedTurn?.actor === player && guidedTurn.skill
					&& lib.filter.filterEnable({ name: "gongJiOrFaShu", type: "phase" }, player, guidedTurn.skill);
			},
			async content(event, trigger, player) {
				const { skill, target } = guidedTurn;
				const cards = skill === "zhiLiaoShu" ? [player.getCards("h").find(card => card.hasDuYou(skill))] : [];
				await player.useSkill(skill, cards, target ? [target] : []).set("firstAction", true);
				player.storage.gongJiOrFaShu--;
			},
			onChooseToUse(choice) {
				if (choice.skill) return;
				// 留下第一场第二轮预定使用的暗灭。
				if (chapter === 1 && choice.player === enemy && choice.name === "yingZhan") {
					const filter = choice.filterCard;
					choice.filterCard = (card, player) => card.name !== "anMie" && filter(card, player, choice);
				}
				if (responseDemo?.type === choice.name && choice.player === me) {
					const filter = choice.filterCard;
					const name = responseDemo.card;
					choice.filterCard = (card, player) => card.name === name && filter(card, player, choice);
					choice.forced = true;
				}
				if (skillPractice && choice.player === me && choice.name === "gongJiOrFaShu") {
					const cost = "判决天平需要 1 水晶，可用宝石代付。";
					say(choice.canTeShu === false ? "启动后仍能做普通行动，特殊行动已关闭。" + cost : cost, me);
				}
				if (!guidedTurn?.card || choice.player !== guidedTurn.actor || choice.name !== "gongJiOrFaShu") return;
				const { card, target } = guidedTurn;
				const targetFilter = choice.filterTarget;
				choice.filterCard = selected => selected === card && lib.filter.cardEnabled(selected, choice.player, "forceEnable");
				choice.filterTarget = (selected, player, current) => current === target && targetFilter(selected, player, current);
				choice.canTeShu = false;
				choice.forced = true;
				choice._skillChoice = [];
			},
		};
		game.addGlobalSkill("_tutorial_guide");

		// 使用牌堆中的实体牌，保留原卡面、独有标记和弃牌记录。
		get.cards(1, true);
		function takeCard(name) {
			const card = Array.from(ui.cardPile.children).find(item => item.name === name || item.hasDuYou(name));
			if (!card) throw new Error("教学牌堆缺少 " + name);
			return card;
		}
		function deal(hands, top = []) {
			for (const [i, player] of game.players.entries()) {
				for (const name of hands[i]) player.directgain([takeCard(name)]);
				player._start_cards = player.getCards("h");
			}
			const ordered = [];
			for (const name of top) {
				const card = takeCard(name);
				card.remove();
				ordered.push(card);
			}
			ui.cardPile.prepend(...ordered);
			game.updateRoundNumber();
		}
		async function turn(actor, options = {}) {
			const { card: name, skill, target } = options;
			const card = name && actor.getCards("h").find(current => current.name === name);
			guidedTurn = skill || (card && actor.canUse(card, target)) ? { actor, card, target, skill } : null;
			for (const onphase of lib.onphase) onphase();
			await actor.phase();
			guidedTurn = null;
		}
		async function continueChapter(text) {
			say(text, ui.shiQiInfo);
			await me.chooseControl("下一场").set("prompt", false);
			reloadChapter(chapter + 1);
		}

		switch (chapter) {
			case 1:
				deal([
					["shuiLianZhan", "huoYanZhan", "shengGuang", "shengDun", "diLieZhan", "moDan"],
					["shuiLianZhan", "anMie"],
					["shengDun", "leiGuangZhan", "diLieZhan", "shuiLianZhan"],
					["huoYanZhan", "leiGuangZhan", "moDan"],
				], ["fengShenZhan", "leiGuangZhan", "diLieZhan", "fengShenZhan", "leiGuangZhan", "shuiLianZhan", "zhongDu"]);
				break;
			case 2:
				deal([
					["diLieZhan", "fengShenZhan", "shuiLianZhan", "shengDun", "zhongDu"],
					["huoYanZhan", "fengShenZhan", "diLieZhan", "xuRuo"],
					["zhiLiaoShu", "diLieZhan"],
					["anMie", "shengDun", "leiGuangZhan", "shuiLianZhan"],
				], ["xuRuo", "diLieZhan", "fengShenZhan", "leiGuangZhan", "zhongDu", "shuiLianZhan"]);
				break;
			case 3:
				deal([
					["fengShenZhan", "leiGuangZhan", "shengDun", "zhongDu"],
					["diLieZhan", "huoYanZhan", "xuRuo", "zhongDu", "moDan"],
					["fengShenZhan", "huoYanZhan", "shengDun", "leiGuangZhan"],
					["shuiLianZhan", "fengShenZhan", "leiGuangZhan", "shengGuang"],
				]);
				break;
		}
		await event.trigger("gameStart");
		await game.delay(0.5);

		if (chapter === 1) {
			const water = me.getCards("h").find(card => card.name === "shuiLianZhan");
			say("用同系的水涟斩应战，转攻原攻击者的队友。", water,
				"地、风、水、火、雷、暗六系默认伤害都是 2。五系的基础伤害相同，应战时需要匹配系别。");
			water.classList.add("tutorial-focus");
			otherEnemy.classList.add("tutorial-focus");
			responseDemo = { type: "yingZhan", card: "shuiLianZhan" };
			await turn(enemy, { card: "shuiLianZhan", target: me });
			responseDemo = null;
			say("应战让原攻落空，原增伤不会传给新攻击。应战命中给团队 1 水晶。", ui.shiQiInfo);
			await turn(ally, { card: "shengDun", target: ally });
			say("圣女：火系攻击来了。要应战、用圣光，还是承伤？", me,
				"圣光使原攻击落空，不会发起新攻击，也能挡魔弹。基础牌堆中只有 11 / 150 张。");
			await turn(otherEnemy, { card: "huoYanZhan", target: me });
			const missile = me.getCards("h").find(card => card.name === "moDan");
			say(missile ? "魔弹从 2 点起。打出你的魔弹，向右传给最近的对手，伤害变成 3。"
				: "你的魔弹已弃置。可以用圣光抵挡，否则会承受 2 点法术伤害。", missile || me,
				"只有魔弹能继续传递，每传一次伤害加 1。圣光或提前放置的圣盾会终止传递。");
			if (missile) {
				missile.classList.add("tutorial-focus");
				responseDemo = { type: "moDan", card: "moDan" };
			}
			await turn(otherEnemy, { card: "moDan", target: me });
			responseDemo = null;
			say("轮到你。每回合默认选一次普通或特殊行动，攻击与法术共用一次普通行动。", me,
				"回合依次经过开始、行动和结束，没有抽牌阶段。正式对局起手 4 张、双方各 15 士气。");
			await turn(me);
			const hasLight = me.hasCard(card => card.name === "shengGuang", "h");
			say(hasLight ? "暗灭能应战五系，但不能被应战。你留着的圣光可以抵挡。" : "暗灭能应战五系，但不能被应战。预先放置的圣盾可以挡住。", me);
			await turn(enemy, { card: "anMie", target: me });
			await continueChapter("第一场完成。常规起手 4 张、双方各 15 士气。对方士气归零或己方合成 5 杯即可获胜。");
		} else if (chapter === 2) {
			await me.addNengLiang("baoShi", 2);
			say("你有 5 张手牌，通常上限是 6。狂战士打来时，点「取消」承伤。", me);
			const morale = game.lanShiQi;
			await turn(enemy, { card: "huoYanZhan", target: me });
			say("承伤 2 → 摸 2 张 → 爆 1 张 → 蓝方士气 −" + (morale - game.lanShiQi), ui.shiQiInfo,
				"普通弃牌不会扣士气。手牌多时，出牌和弃牌能腾出空间。手牌少时，摸牌可以补充行动选择。");
			await game.delay(1);

			say("圣女：我给你两点治疗，通常上限就是 2。下次受伤时可以先抵消伤害。", ally);
			await turn(ally, { skill: "zhiLiaoShu", target: me });
			say("神箭手打出暗灭。跳过手牌响应，试着用治疗抵消伤害。", me);
			await turn(otherEnemy, { card: "anMie", target: me });

			await turn(enemy, { card: "xuRuo", target: me });
			say("虚弱在行动前结算。摸 3 张可以继续行动，也可以跳过本次行动阶段。", me,
				"先看手牌空位。选摸牌可能爆牌，选跳过仍会进入回合结束。结算后虚弱移除。");
			await turn(me);
			say("主动攻击命中给团队 1 宝石。手牌快满时，出牌或应战也能腾出空位。", me);
			await turn(enemy, { card: "fengShenZhan", target: me });
			say("圣女：购买要留 3 个手牌空位。摸 3 张，给团队 1 宝石、1 水晶。", ui.shiQiInfo,
				"战绩区只剩 1 格时任选 1 颗，满格时只摸牌。宝石和水晶统称为星石。");
			await turn(ally, { skill: "_gouMai" });
			await turn(otherEnemy, { card: "shengDun", target: otherEnemy });

			say("提炼把团队的 1～2 颗星石转入个人能量区，上限 3。也可以出牌，把星石留给全队。", ui.shiQiInfo);
			await turn(me);
			me.enableSkill("tutorialBasics");
			me.disableSkill("tutorialBasics", me.getSkills().filter(skill => !["zhongCaiYiShi", "panJueTianPing"].includes(skill)));
			skillPractice = true;
			say("试着用 1 宝石启动「仲裁仪式」。启动不占行动，水晶不能代付宝石费用。", me,
				"仲裁仪式会让仲裁者横置，手牌上限变为 5。这是该角色的技能效果。");
			await turn(me);
			skillPractice = false;
			const personal = me.countNengLiangAll();
			const team = get.zhanJi(me.side).length;
			await continueChapter("战绩区 " + team + " 颗星石，你的能量区 " + personal + " 颗。普通弃牌不会扣士气。");
		} else {
			say("蓝方 4 杯、2 颗星石。找机会攒出第 3 颗，再留出三张牌的空间。", ui.shiQiInfo,
				"合成消耗团队 3 颗星石，摸 3 张，得 1 杯并让对方士气 −1。第五杯会直接判胜。");
			lib.onover.push(won => {
				if (won) {
					say("教学完成。你赢下了这场残局。", ui.shiQiInfo);
					restartChapter.remove();
					ui.restart?.replace("完成教学", exitTutorial);
				} else {
					say("残局结束。点「重开残局」再试一次。", ui.shiQiInfo);
					ui.restart?.replace("重开残局", () => reloadChapter(chapter));
				}
			});
			await turn(me);
			say("狂战士将中毒放在圣女面前。下个行动阶段前造成 1 点法术伤害，然后移除。", ally);
			await turn(enemy, { card: "zhongDu", target: ally });
			await turn(ally, { card: "shengDun", target: me });
			if (me.hasExpansions("_shengDun")) say("圣女：圣盾能替你挡下一次攻击，保住手牌空位。", me);
			await turn(otherEnemy, { card: "leiGuangZhan", target: me });
			while (!_status.over) {
				for (const player of game.players) {
					if (_status.over) break;
					if (player === me) {
						const stones = get.zhanJi(me.side).length;
						const free = me.getHandcardLimit() - me.countCards("h");
						say(stones >= 3 && free >= 3 ? "合成消耗团队 3 颗星石，并摸 3 张。第五杯会直接判胜。"
							: "战绩区 " + stones + " / 3 颗星石，手牌空位 " + free + " / 3。", ui.shiQiInfo);
					}
					await turn(player);
				}
			}
		}
	});
	return next;
}
