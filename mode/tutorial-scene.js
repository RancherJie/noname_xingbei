import { lib, game, ui, get, _status } from "../noname.js";

// 教学只布置局面和限制当前练习的操作，回合、出牌和结算均使用星杯核心。
export function startRuleTutorial() {
	const next = game.createEvent("ruleTutorial", false);
	next.setContent(async function (event) {
		lib.init.css(lib.assetURL + "layout/mode", "tutorial");
		_status.mode = "two";
		game.prepareArena(4);
		const [me, enemy, ally, otherEnemy] = game.players;
		event.player = me;
		const characters = ["fengZhiJianSheng", "kuangZhanShi", "shengNv", "shenJianShou"];
		for (const [i, player] of game.players.entries()) {
			player.getId();
			player.init(characters[i]);
			player.side = i % 2 === 1;
			player.setSeatNum(i + 1);
			player.node.identity.firstChild.textContent = player.side ? "红" : "蓝";
			player.node.identity.dataset.color = player.side + "zhu";
			player.disableSkill("tutorialBasics", player.getSkills());
			player.storage.temp_ban__wuFaXingDong = true;
		}
		game.shiQiMax = 15;
		game.xingBeiMax = 5;
		game.zhanJiMax = 5;
		game.handcardLimit = 6;
		game.nengLiangMax = 3;
		game.zhiLiaoMax = 2;
		game.hongShiQi = game.lanShiQi = 15;
		game.hongZhanJi = [];
		game.lanZhanJi = [];
		game.hongXingBei = game.lanXingBei = 0;
		ui.create.zhanJi();
		ui.updateShiQiInfo();
		_status.gameStarted = true;
		game.showHistory();
		await event.trigger("gameStart");
		await game.delay(0.5);

		const banner = ui.create.div(".tutorial-battle-hint", ui.window);
		banner.setAttribute("role", "status");
		banner.setAttribute("aria-live", "polite");
		ui.create.system("退出教学", function () {
			game.saveConfig("mode", "xingBei");
			game.reload();
		}, true);
		const specialSkills = ["_gouMai", "_tiLian", "_heCheng"];
		let lesson = 0;
		let instruction;
		lib.skill._tutorial_guide = {
			onChooseToUse(choice) {
				if (!instruction || choice.skill) return;
				if (choice.player === instruction.actor && choice.name === "gongJiOrFaShu") {
					const targetFilter = choice.filterTarget;
					choice.filterCard = card => card.name === instruction.card && lib.filter.cardEnabled(card, choice.player, "forceEnable");
					choice.filterTarget = (card, player, target) => target === instruction.target && targetFilter(card, player, target);
					choice.canTeShu = Boolean(instruction.special);
					choice.forced = !instruction.special;
				}
				if (choice.player === me && instruction.response && ["yingZhan", "moDan"].includes(choice.name)) {
					const cardFilter = choice.filterCard;
					choice.filterCard = (card, player, evt) => card.name === instruction.response && cardFilter(card, player, evt);
					choice.forced = true;
				}
			},
		};
		game.addGlobalSkill("_tutorial_guide");

		function hint(text) {
			banner.textContent = `${lesson} / 12　${text}`;
		}
		function clearHighlight() {
			for (const node of ui.window.querySelectorAll(".tutorial-focus")) node.classList.remove("tutorial-focus");
		}
		async function hand(player, names) {
			const old = player.getCards("h");
			if (old.length) await player.loseToDiscardpile(old);
			player.directgain(names.map(name => {
				const template = lib.card.list.find(card => card[2] === name);
				return game.createCard(name, template[0], template[1], "");
			}));
		}
		async function turn(actor, card, target, text, response, special) {
			instruction = { actor, card, target, response, special };
			for (const skill of specialSkills) actor.storage["temp_ban_" + skill] = skill !== special;
			clearHighlight();
			if (target) target.classList.add("tutorial-focus");
			for (const current of me.getCards("h")) {
				if (current.name === (actor === me ? card : response)) current.classList.add("tutorial-focus");
			}
			hint(text);
			await actor.phase();
			clearHighlight();
			instruction = null;
		}
		async function observe(text) {
			hint(text);
			await me.chooseControl("继续实战").set("prompt", false);
		}

		await hand(me, ["huoYanZhan", "shuiLianZhan", "shengGuang", "shengDun"]);
		await hand(enemy, Array(6).fill("shuiLianZhan"));
		await hand(ally, Array(4).fill("huoYanZhan"));
		await hand(otherEnemy, Array(5).fill("shuiLianZhan"));
		lesson = 1;
		await turn(me, "huoYanZhan", enemy, "打出高亮的火焰斩，选择红方狂战士并确认。基础练习暂时停用角色技能。");
		await observe(`狂战士承伤摸2张，爆牌后红方士气为${game.hongShiQi}。你的主动攻击命中，蓝方获得1宝石。`);

		lesson = 2;
		await hand(me, ["huoYanZhan", "shuiLianZhan", "shengDun", "moDan"]);
		await hand(enemy, ["huoYanZhan", "diLieZhan", "diLieZhan", "diLieZhan"]);
		await turn(enemy, "huoYanZhan", me, "狂战士攻击你。用火焰斩应战，选择另一名红方角色神箭手并确认。", "huoYanZhan");
		await observe("应战把攻击转向神箭手。应战命中获得水晶，原攻击没有伤害你。");

		lesson = 3;
		await hand(me, ["shengGuang", "shuiLianZhan", "shengDun", "moDan"]);
		await hand(enemy, ["anMie", "diLieZhan", "diLieZhan"]);
		await turn(enemy, "anMie", me, "暗灭无法应战。打出高亮的圣光，抵挡这次攻击。", "shengGuang");
		await observe("圣光抵挡了暗系攻击。查看自己的手牌，本次没有因伤害摸牌。");

		lesson = 4;
		await hand(me, Array(6).fill("shuiLianZhan"));
		await hand(enemy, ["huoYanZhan", "diLieZhan", "diLieZhan"]);
		await turn(enemy, "huoYanZhan", me, "点击“取消”承受攻击。摸牌后选择2张超出的手牌，再点击“确定”完成爆牌弃置。");
		await observe(`爆牌结算结束。你的手牌${me.countCards("h")}张，蓝方士气${game.lanShiQi}。`);

		lesson = 5;
		await hand(me, Array(6).fill("shuiLianZhan"));
		await me.changeZhiLiao(2);
		await hand(enemy, ["huoYanZhan", "diLieZhan", "diLieZhan"]);
		await turn(enemy, "huoYanZhan", me, "你获得了2治疗。先点击“取消”承受攻击，再选择使用2治疗抵消伤害。");
		await observe(`治疗结算结束。剩余治疗${me.zhiLiao}，手牌${me.countCards("h")}张，蓝方士气${game.lanShiQi}。`);
		if (me.zhiLiao) await me.changeZhiLiao(-me.zhiLiao);

		lesson = 6;
		await hand(me, ["shengDun", "shuiLianZhan", "moDan", "zhongDu"]);
		await turn(me, "shengDun", me, "打出圣盾并选择自己，提前放置一面盾。");
		await hand(enemy, ["anMie", "diLieZhan", "diLieZhan"]);
		await turn(enemy, "anMie", me, "点击“取消”放弃手牌响应，观察角色面前的圣盾自动抵挡这次暗灭并消耗。");
		await observe("圣盾已自动抵挡攻击并移除。放置圣盾使用了你刚才回合的法术行动。");

		lesson = 7;
		await hand(me, ["moDan", "shuiLianZhan", "shengDun", "zhongDu"]);
		await hand(otherEnemy, ["moDan", "diLieZhan", "diLieZhan"]);
		await hand(enemy, Array(5).fill("shuiLianZhan"));
		await turn(otherEnemy, "moDan", me, "神箭手向你发射魔弹。打出魔弹，传给右手边的狂战士，伤害增加到3。", "moDan");
		await observe(`魔弹已由核心完成传递和伤害结算。红方士气${game.hongShiQi}，此次法术没有攻击命中奖励。`);

		lesson = 8;
		await hand(me, ["zhongDu", "shuiLianZhan", "shengDun", "moDan"]);
		await hand(enemy, Array(4).fill("shuiLianZhan"));
		await turn(me, "zhongDu", enemy, "打出中毒，选择狂战士。观察他面前出现的状态牌。");
		await turn(enemy, "shuiLianZhan", ally, "狂战士进入回合，中毒先造成1点法术伤害并移除，然后他正常行动。");
		await observe("中毒的伤害、摸牌和状态移除均已结算，队友也完成了本次受击结算。");

		lesson = 9;
		await hand(me, ["shengDun", "shuiLianZhan", "shuiLianZhan", "shuiLianZhan", "shuiLianZhan"]);
		await hand(otherEnemy, ["xuRuo", "diLieZhan", "diLieZhan"]);
		await turn(otherEnemy, "xuRuo", me, "神箭手为你放置虚弱。下一回合，选择跳过行动阶段来避免额外摸3张牌。");
		await turn(me, "shengDun", me, "处理虚弱时选择跳过行动阶段。若选择摸牌，需先完成爆牌，再进行圣盾行动。");
		await observe(`虚弱已移除，本回合结束。当前手牌${me.countCards("h")}张，蓝方士气${game.lanShiQi}。`);
		if (me.hasExpansions("_shengDun")) await me.loseToDiscardpile(me.getExpansions("_shengDun"));

		lesson = 10;
		await hand(me, ["shuiLianZhan", "huoYanZhan", "shengDun"]);
		await turn(me, null, null, "手牌已布置为3张。点击正常行动栏的“购买”，摸3张并获得团队星石。", null, "_gouMai");
		await observe(`购买完成，手牌${me.countCards("h")}张。右下方战绩区显示团队共有的星石。`);

		lesson = 11;
		await turn(me, null, null, "点击“提炼”，在资源选择框中选2颗星石并确认，观察自己角色旁的能量标记。", null, "_tiLian");
		await observe(`你已提炼${me.countNengLiangAll()}颗星石。个人能量用于支付技能，战绩区资源留给团队。`);

		lesson = 12;
		await hand(me, ["shuiLianZhan", "huoYanZhan", "shengDun"]);
		for (const stone of ["baoShi", "shuiJing"]) {
			const count = get.zhanJi(me.side).filter(item => item === stone).length;
			if (count) await me.removeZhanJi(stone, count);
		}
		await me.addZhanJi("baoShi", 1);
		await me.addZhanJi("shuiJing", 2);
		await me.changeXingBei(4 - game.lanXingBei);
		await turn(me, null, null, "终局局面已布置为4星杯、3颗团队星石。点击“合成”，选择3颗星石，合成第五杯获胜。", null, "_heCheng");
	});
	return next;
}
