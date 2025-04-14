import { lib, game, ui, get, ai, _status } from "../noname.js";
export const type = "mode";
/**
 * @type { () => importModeConfig }
 */
export default () => {
	return {
		name:'tutorial',
		start:function(){
			"step 0"
			if (!lib.config.new_tutorial) {
				ui.arena.classList.add("only_dialog");
			}
			"step 1"
            if (!lib.config.new_tutorial) {
                game.delay();
            }
			"step 2"
            if (!lib.config.new_tutorial) {
				_status.new_tutorial = true;
				lib.init.onfree();
				game.saveConfig("version", lib.version);
				var clear = function () {
					ui.dialog.close();
					while (ui.controls.length) ui.controls[0].close();
				};
				var clear2 = function () {
					ui.auto.show();
					ui.arena.classList.remove("only_dialog");
				};
				var finish=function () {
					clear();
					clear2();
					game.saveConfig('mode','xingBei');
					game.reload();
				};
				var step1 = function () {
					ui.create.dialog("欢迎来到无名星杯，是否进入新手向导？");
					game.saveConfig("new_tutorial", true);
					ui.dialog.add('<div class="text center">跳过后，你可以在选项-其它中重置新手向导');
					ui.auto.hide();
					ui.create.control("跳过向导", function () {
						finish();
					});
					ui.create.control("继续", step2);
				};
				var step2 = function () {
					if (lib.config.touchscreen) {
						clear();
						ui.create.dialog("触屏模式中，下划可以显示菜单，上划可以切换托管，双指单击可以暂停");
						ui.dialog.add('<div class="text center">你可以在选项-通用-中更改手势设置');
						ui.create.control("继续", step4);
					} else {
						step3();
					}
				};
				var step3 = lib.genAsync(function* () {
					clear();
					ui.window.classList.add("noclick_important");
					ui.click.configMenu();
					ui.control.classList.add("noclick_click_important");
					ui.control.style.top = "calc(100% - 105px)";
					yield new Promise(resolve => ui.create.control("在菜单中，可以进行各项设置", resolve));
					ui.click.menuTab("选项");
					yield new Promise(resolve => ui.controls[0].replace("如果你感到游戏较卡，可以开启流畅模式", resolve));
					ui.click.menuTab("角色");
					yield new Promise(resolve => ui.controls[0].replace("在角色或卡牌一栏中，单击角色/卡牌可以将其禁用", resolve));
					ui.click.menuTab("扩展");
                    yield new Promise(resolve => ui.controls[0].replace("在扩展中，可以下载和导入扩展", resolve));
                    ui.click.menuTab("其它");
					yield new Promise(resolve => ui.controls[0].replace("在其它中可以更新游戏，或者管理录像，查看帮助", resolve));
					ui.click.configMenu();
					ui.window.classList.remove("noclick_important");
					ui.control.classList.remove("noclick_click_important");
					ui.control.style.top = "";
					step4();
				});
				var step4 = function () {
					clear();
					ui.create.dialog("是否查看星杯传说的视频教学，可在选项-其他-帮助-关于游戏中再次查看");
					ui.create.control("查看", function () {
						window.open("https://www.bilibili.com/video/BV1Mo4y1q717/", "_blank");
					});
					ui.create.control("继续", step5);
				};
				var step5 = function () {
					clear();
					ui.create.dialog("如果还有其它问题，欢迎来到QQ群966951007进行交流");
					ui.create.control("完成", function () {
						finish();
					});
				};
				game.pause();
				step1();
			} else {
				game.showChangeLog();
			}
			"step 3"
			game.saveConfig('mode','xingBei');
			game.reload();
		},
	};
};
