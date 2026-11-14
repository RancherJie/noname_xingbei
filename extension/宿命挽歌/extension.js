game.import("extension", function(lib, game, ui, get, ai, _status) {
    // <diy-form-preview>
    // Copies stay inside each standalone expansion; the shared UI hook installs once.
    function installDiyFormPreview(groups, routes) {
        var preview = lib.diyFormPreview;
        if(!preview) {
            preview = lib.diyFormPreview = { groups: Object.create(null) };
        }
        groups.forEach(function(group) {
            group.forEach(function(id) { preview.groups[id] = group.slice(); });
        });
        preview.routes = preview.routes || Object.create(null);
        Object.assign(preview.routes, routes || {});
        if(preview.installed) return;
        var createCharacter = ui.create.buttonPresets.character;
        var characterCard = ui.click.charactercard;
        preview.installed = true;
        preview.forms = function(id) {
            return (preview.groups[id] || []).filter(function(name) {
                return !!lib.character[name] || Object.keys(lib.characterPack).some(function(pack) {
                    return !!lib.characterPack[pack][name];
                });
            });
        };
        function listen(button, action) {
            button.setAttribute('role', 'button');
            button.tabIndex = 0;
            function activate(event) {
                event.preventDefault();
                event.stopPropagation();
                ui.click.touchpop();
                action();
            }
            button.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', activate);
            button.addEventListener('keydown', function(event) {
                if(event.key === 'Enter' || event.key === ' ') activate(event);
            });
        }
        ui.create.buttonPresets.character = function() {
            var node = createCharacter.apply(this, arguments);
            var forms = node && preview.forms(node.link);
            if(!node) return node;
            var existing = node.querySelector('.diy-form-preview');
            if((!forms || forms.length < 2) && !preview.routes[node.link]) {
                if(existing) existing.remove();
                return node;
            }
            if(existing) return node;
            var button = ui.create.div('.button.replaceButton.diy-form-preview', node);
            button.textContent = preview.routes[node.link] ? '武器预览' : '形态预览';
            Object.assign(button.style, { width: 'auto', padding: '0 5px', fontSize: '13px' });
            listen(button, function() {
                var list = preview.forms(node.link);
                if(preview.routes[node.link]) {
                    ui.click.charactercard(node.link, null, true);
                } else if(list.length > 1) {
                    ui.click.charactercard(list[(list.indexOf(node.link) + 1) % list.length], null, true);
                }
            });
            return node;
        };
        ui.click.charactercard = function(name, source, noedit, resume) {
            var previous = ui.window.lastElementChild;
            var result = characterCard.apply(this, arguments);
            var layer = ui.window.lastElementChild;
            var forms = preview.forms(name);
            var routes = preview.routes[name];
            if(layer === previous || !layer || (forms.length < 2 && !routes)) return result;
            var panel = layer.querySelector('.charactercard');
            if(!panel) return result;
            var portrait = panel.querySelector('.ava');
            if(!portrait) return result;
            var button = ui.create.div('.menubutton.large.diy-form-preview', portrait);
            button.textContent = routes ? '切换预览武器' : '切换预览形态';
            Object.assign(button.style, { position: 'absolute', left: '0', bottom: '0', width: '100%', height: '30px', lineHeight: '30px', margin: '0', fontSize: '16px', zIndex: '3' });
            var caption = ui.create.div('.diy-form-preview-caption', portrait);
            caption.textContent = name === forms[0] ? '初始形态' : '转化形态，无法直接开局';
            Object.assign(caption.style, { position: 'absolute', left: '0', bottom: '34px', width: '100%', textAlign: 'center', fontSize: '13px', lineHeight: '22px', color: '#fff', background: 'rgba(0,0,0,0.65)', pointerEvents: 'none', zIndex: '3' });
            if(routes && routes.length) {
                var index = 0;
                var skills = panel.querySelector('.characterskill');
                var intro = panel.querySelector('.intro2');
                var routeButton = skills && ui.create.div('.menubutton.large.diy-weapon-route', skills);
                if(routeButton) skills.prepend(routeButton);
                function showRoute() {
                    var route = routes[index];
                    (portrait.querySelector('.avatar') || portrait).setBackgroundImage('extension/轮回遗梦/' + route.image);
                    caption.textContent = route.name + '预览，开局仍需选剑';
                    if(routeButton) routeButton.textContent = route.name + '专属与路线';
                    if(intro) {
                        if(skills) {
                            var active = skills.querySelector('.active');
                            if(active) active.classList.remove('active');
                        }
                        if(routeButton) routeButton.classList.add('active');
                        intro.innerHTML = route.content();
                        intro.scrollTop = 0;
                    }
                }
                if(routeButton) listen(routeButton, showRoute);
                listen(button, function() {
                    index = (index + 1) % routes.length;
                    showRoute();
                });
                showRoute();
                return result;
            }
            listen(button, function() {
                var next = forms[(forms.indexOf(name) + 1) % forms.length];
                // Only the independent detail panel changes. The source card,
                // selection IDs, player and skin settings are never passed in.
                var oldLayer = ui.window.lastElementChild;
                ui.click.charactercard(next, null, true, resume);
                if(ui.window.lastElementChild !== oldLayer) layer.remove();
            });
            return result;
        };
    }
    // </diy-form-preview>
    // 临时效果牌：创建时不带destroyed标记；必须在效果结算(挂到目标面前)完成后再打标记，
    // 否则addToExpansion会把带destroyed的牌从结算中剔除，导致效果不触发。
    lib.suMingUseTemporaryEffectCard = async function(player, name, target, nolog) {
        const card = game.createCard(name);
        await player.useCard(card, target, nolog);
        card.destroyed = 'discardPile';
        return card;
    };
    lib.suMingAttachTemporaryEffectCard = async function(target, source, name, tag) {
        const card = game.createCard(name);
        await target.addJiChuXiaoGuo(card, source, tag);
        card.destroyed = 'discardPile';
        return card;
    };
    lib.suMingBaiYueAi = {
        // 翻开牌库顶时翻到法术牌的估计概率（AI无牌堆信息，取保守值）
        flipSpellChance: 0.4,
        // 【封魔】的附加价值：对手被封魔为收益，己方或自己被封魔为代价
        fengMoValue: function(player, target) {
            if(target.hasJiChuXiaoGuo('fengMo')) return 0;
            return target.side == player.side ? -1.2 : 1.2;
        },
        // 估算拜月教主剩余仍可发动的法术技能数（含【腥风血雨】）
        usableSpellCount: function(player) {
            var names = ['anMie', 'shengGuang', 'xuRuo', 'zhongDu', 'shengDun'];
            var count = 0;
            for(var i = 0; i < names.length; i++) {
                if(player.countCards('h', function(card) {
                    return get.name(card, player) == names[i];
                }) > 0) count++;
            }
            if(lib.suMingBaiYueAi.canSpendBloodGem(player)) count++;
            return count;
        },
        // 转化进度奖励：释放尚未计入【水魔兽合体】的新类型法术时的额外收益
        transformBonus: function(player, skillId) {
            var info = lib.skill.shuiMoShouHeTi;
            if(!info || !info.spells || !info.spells.includes(skillId)) return 0;
            var recorded = player.storage.shuiMoShouHeTi;
            if(Array.isArray(recorded) && recorded.includes(skillId)) return 0;
            return 0.3;
        },
    }
    lib.suMingBaiYueAi.xingShiTotal = function(player) {
        if(!player) return 0;
        if(typeof player.countNengLiangAll == 'function') return player.countNengLiangAll();
        return (player.countNengLiang('baoShi') || 0) +
            (player.countNengLiang('shuiJing') || 0);
    };
    // 多余水晶：花1颗后仍至少保留1颗
    lib.suMingBaiYueAi.hasSpareShuiJing = function(player) {
        return !!player && player.countNengLiang('shuiJing') >= 2;
    };
    lib.suMingBaiYueAi.isBaiYue = function(player) {
        if(!player) return false;
        return player.name == 'baiYueJiaoZhu' ||
            player.name == 'shuiMoShouBaiYueJiaoZhu' ||
            player.name1 == 'baiYueJiaoZhu' ||
            player.name1 == 'shuiMoShouBaiYueJiaoZhu';
    };
    lib.suMingBaiYueAi.nearTransformation = function(player) {
        if(!player || (player.name != 'baiYueJiaoZhu' && player.name1 != 'baiYueJiaoZhu')) return false;
        var recorded = player.storage.shuiMoShouHeTi;
        var count = Array.isArray(recorded) ? new Set(recorded).size : 0;
        return get.shiQi(player.side) <= 8 || count >= 3;
    };
    lib.suMingBaiYueAi.canSpendBloodGem = function(player) {
        return player.canBiShaBaoShi() &&
            (!this.nearTransformation(player) || player.countNengLiang('baoShi') >= 2);
    };
    lib.suMingBaiYueAi.hasEffectiveDaZhouSheFollow = function(player) {
        if(!player || !(typeof player.storage.faShu == 'number' &&
            player.storage.faShu > 0)) return false;
        var recorded = player.storage.shuiMoShouHeTi;
        var transforms = Array.isArray(recorded) && recorded.length >= 4 &&
            !recorded.includes('daZhouShe');
        if(transforms) {
            // 作为第5种法术时会立即转化，只认可转化后确实可发动且有收益的【风雪冰天】。
            if(!(player.canBiShaBaoShi && player.canBiShaBaoShi())) return false;
            var spellCount = player.countCards('h', function(card) {
                return get.type(card, player) == 'faShu';
            }) - 1;
            if(spellCount <= 0) return false;
            return lib.suMingBaiYueAi.groupMoraleGain(player, 'fengXueBingTian', 1) >= 2;
        }
        var has = function(name) {
            return player.countCards('h', function(card) {
                return get.name(card, player) == name;
            }) > 0;
        };
        // 三者都对应AI会立即发动的后续角色法术。
        if(has('shengGuang') || has('zhongDu') || has('shengDun')) return true;
        // 【大咒蛇】先弃1张【虚弱】；此后低于3手才符合【灭绝一击】策略。
        if(has('anMie') && player.countCards('h') - 1 < 3) return true;
        // 【腥风血雨】即使不再重复施加虚弱，伤害与追加中毒仍可能是有效后续。
        if(lib.suMingBaiYueAi.canSpendBloodGem(player)) {
            var net = lib.suMingBaiYueAi.transformBonus(player, 'xingFengXueYu');
            game.countPlayer(function(current) {
                if(!current.isIn()) return;
                net += get.damageEffect2(current, player, 2);
                if((current.zhiLiao || 0) < 2) {
                    net += current.side == player.side ? -0.6 : 0.6;
                }
            });
            if(net > 0.5) return true;
        }
        return false;
    };
    lib.suMingBaiYueAi.isManual = function(player) {
        if(!player) return false;
        // 模拟器在首个行动选择创建后才打开托管，不能把该阶段误判为真人。
        if(typeof window != 'undefined' && window.__xingbeiSimulator) return false;
        if(_status.playback || (player.isOnline && player.isOnline())) return true;
        return !_status.auto && (player == game.me || player._trueMe && player._trueMe == game.me ||
            player.isUnderControl && player.isUnderControl(true));
    };
    lib.suMingBaiYueAi.reserveForAlly = function(player) {
        var helper = this;
        return !!player && !helper.isManual(player) && !helper.isBaiYue(player) &&
            game.hasPlayer(function(other) {
                return other != player && other.isIn() && other.side == player.side && helper.isBaiYue(other);
            });
    };
    lib.suMingBaiYueAi.spendableGems = function(player) {
        return Math.max(0, get.zhanJi(player.side).filter(function(x) { return x == 'baoShi'; }).length - 2);
    };
    lib.suMingBaiYueAi.applyTeamReserve = function() {
        var helper = this;
        ['_tiLian', '_heCheng'].forEach(function(name) {
            var skill = lib.skill[name];
            if(!skill || !skill.chooseButton) return;
            function wrap(object, key, fn) {
                var old = object[key];
                if(old && old.__suMingReserve) return;
                var next = fn(old);
                next.__suMingReserve = true;
                object[key] = next;
            }
            wrap(skill, 'filter', function(old) { return function(event, player) {
                if(old && !old.apply(this, arguments)) return false;
                if(!helper.reserveForAlly(player)) return true;
                var usable = helper.spendableGems(player) + get.zhanJi(player.side).filter(function(x) {
                    return x != 'baoShi';
                }).length;
                // 噩梦/独立AI的通用提炼要求一次取满2颗，保留该约束。
                var minimum = name == '_heCheng' ? 3 : skill._shiZhouNianAi_requireTwoResourcesHard ? 2 : 1;
                return usable >= minimum;
            }; });
            wrap(skill.chooseButton, 'filter', function(old) { return function(button, player) {
                player = player || _status.event.player;
                if(old && !old.apply(this, arguments)) return false;
                if(!helper.reserveForAlly(player) || button.link != 'baoShi') return true;
                var selected = ui.selected.buttons.filter(function(b) { return b.link == 'baoShi'; }).length;
                return selected < helper.spendableGems(player);
            }; });
            wrap(skill.chooseButton, 'filterOk', function(old) { return function() {
                if(old && !old.apply(this, arguments)) return false;
                var player = _status.event.player;
                return !helper.reserveForAlly(player) || ui.selected.buttons.filter(function(b) {
                    return b.link == 'baoShi';
                }).length <= helper.spendableGems(player);
            }; });
        });
    };
    lib.suMingBaiYueAi.wantsGemBackedWave = function(player) {
        return (player.name == 'shuiMoShouBaiYueJiaoZhu' || player.name1 == 'shuiMoShouBaiYueJiaoZhu') &&
            player.countNengLiang('baoShi') >= 2 &&
            (player.countCards('h') > 5 || player.countZhiShiWu('hongShui') < 4);
    };
    lib.suMingBaiYueAi.wantsLowFloodWave = function(player) {
        return (player.name == 'shuiMoShouBaiYueJiaoZhu' || player.name1 == 'shuiMoShouBaiYueJiaoZhu') &&
            player.countNengLiang('shuiJing') >= 1 &&
            player.countZhiShiWu('hongShui') < 6;
    };
    lib.suMingBaiYueAi.earthIceWouldKillAllies = function(player) {
        var targets = game.filterPlayer(function(target) { return target.isIn(); }).sortBySeat(player);
        var spells = player.countCards('h', function(card) { return get.type(card, player) == 'faShu'; });
        var draws = Math.max(0, player.getHandcardLimit() - player.countCards('h') + 1);
        // 未知补牌不保证获得洪水；检查可能的冰天费用数量，避免赌牌库救命。
        for(var fee = Math.max(1, spells); fee <= spells + draws; fee++) {
            var friendly = get.shiQi(player.side), enemy = get.shiQi(!player.side);
            var flood = player.countZhiShiWu('hongShui');
            for(var i = 0; i < targets.length; i++) {
                var target = targets[i], ours = target.side == player.side;
                var body = target.hasSkill('shuiMoShouZhiQu');
                var healing = Math.min(game.zhiLiaoMax || 2, (target.zhiLiao || 0) + (target == player && body ? 2 : 0));
                var damage = Math.max(0, Math.ceil(fee / 2) + 1 - (body ? 1 : 0) - healing);
                var loss = Math.max(0, damage - (target == player ? fee : 0));
                if(target.hasSkillTag && target.hasSkillTag('noShiQiXiaJiang')) continue;
                if(ours) {
                    if(flood > 0 && friendly - loss < 1) {
                        // 同一次伤害即使耗尽洪水也保底1；下一目标才可能致死。
                        if(friendly == 1) flood = Math.max(0, flood - loss);
                        friendly = 1;
                    }
                    else friendly -= loss;
                    if(friendly <= 0) return true;
                }
                else {
                    enemy -= loss;
                    if(enemy <= 0) break;
                }
            }
        }
        return false;
    };
    lib.suMingBaiYueAi.canStartEarthIce = function(player) {
        if(player.hasSkill('suMingBaiYueIceFollow') || !player.canBiShaBaoShi()) return false;
        if(this.earthIceWouldKillAllies(player)) return false;
        // 不把即将消耗的暗灭或预期摸到的牌算作后续费用。
        return player.countCards('h', function(card) {
            return get.name(card, player) != 'anMie' && get.type(card, player) == 'faShu' &&
                lib.filter.cardDiscardable(card, player, 'fengXueBingTian');
        }) > 0;
    };
    // 实际士气点数的保守估计，不使用 damageEffect 的混合价值分数。
    lib.suMingBaiYueAi.groupMoraleGain = function(player, skill, beforeIceDiscard) {
        var poison = skill == 'duTunTianXia', ice = skill == 'fengXueBingTian', net = 0;
        var spentBefore = beforeIceDiscard || 0;
        var cost = ice ? player.countCards('h', function(card) {
            return get.type(card, player) == 'faShu';
        }) - spentBefore : 1;
        if(ice && cost <= 0) return -Infinity;
        var damage = ice ? Math.ceil(cost / 2) + 1 : 2;
        game.countPlayer(function(target) {
            if(!target.isIn()) return;
            if(target.hasSkillTag && target.hasSkillTag('noShiQiXiaJiang')) return;
            if(!poison && !ice && target.hasJiChuXiaoGuo('_shengDun')) return;
            var hand = target.countCards('h') - (target == player ? cost + spentBefore : 0);
            var room = Math.max(0, target.getHandcardLimit() - hand);
            var healing = Math.max(0, target.zhiLiao || 0);
            var actualDamage = damage;
            if(ice && (target.hasSkill && target.hasSkill('shuiMoShouZhiQu') || target == player && spentBefore > 0)) {
                actualDamage = Math.max(0, damage - 1);
                // 支付全部法术牌是一次弃牌事件，水魔兽之躯获得一次治疗。
                if(target == player) healing++;
            }
            var existing = poison && target.getExpansions ? target.getExpansions('_zhongDu').length : 0;
            var loss = Math.max(0, existing + actualDamage - healing - room) -
                Math.max(0, existing - healing - room);
            net += target.side == player.side ? -loss : loss;
        });
        return net;
    };
    lib.suMingBaiYueAi.canUseIce = function(player) {
        return player.hasSkill('suMingBaiYueIceFollow') ||
            this.groupMoraleGain(player, 'fengXueBingTian') >= 2;
    };
    lib.suMingBaiYueAi.canUseGroup = function(player, skill) {
        return player.hasSkill('suMingBaiYueSnakeFollow') || this.groupMoraleGain(player, skill) >= 2;
    };
    lib.suMingBaiYueAi.lowHandSealTarget = function(player, target) {
        return target.isIn() && target.side != player.side && target.countCards('h') <= 2 &&
            !target.hasJiChuXiaoGuo('fengMo') && !target.hasJiChuXiaoGuo('_shengDun');
    };
    lib.suMingBaiYueAi.needsGem = function(player) {
        if(!player || (player.canBiShaBaoShi && player.canBiShaBaoShi())) return false;
        var self = lib.suMingBaiYueAi;
        if(self.nearTransformation(player)) return true;
        if(player.name == 'shuiMoShouBaiYueJiaoZhu' ||
            player.name1 == 'shuiMoShouBaiYueJiaoZhu') return true;
        return player.countCards('h', function(card) {
            return get.name(card, player) == 'shengDun';
        }) > 0 || self.usableSpellCount(player) == 0;
    };
    lib.suMingBaiYueAi.isWrapped = function(fn) {
        return typeof fn == 'function' && fn.__suMingBaiYueWrap === true;
    };
    lib.suMingBaiYueAi.applyActionPatch = function() {
        var helper = this;
        helper.applyTeamReserve();
        if(typeof lib == 'undefined' || !lib.skill) return;
        function wrapAction(skillId, orderFn, resultFn) {
            var skill = lib.skill[skillId];
            if(!skill || !skill.ai) return;
            if(!helper.isWrapped(skill.ai.order)) {
                var oldOrder = skill.ai.order;
                var newOrder = function(item, player) {
                    if(helper.isBaiYue(player)) return orderFn(item, player);
                    return typeof oldOrder == 'function' ? oldOrder.apply(this, arguments) : oldOrder;
                };
                newOrder.__suMingBaiYueWrap = true;
                skill.ai.order = newOrder;
            }
            if(resultFn && skill.ai.result && !helper.isWrapped(skill.ai.result.player)) {
                var oldResult = skill.ai.result.player;
                var newResult = function(player) {
                    if(helper.isBaiYue(player)) return resultFn(player);
                    return typeof oldResult == 'function' ? oldResult.apply(this, arguments) : oldResult;
                };
                newResult.__suMingBaiYueWrap = true;
                skill.ai.result.player = newResult;
            }
        }
        // 购买：尽量不买
        wrapAction('_gouMai', function() { return 0.2; }, function() { return -20; });
        // 合成：仅接近获胜（差1星杯或敌方士气≤2）时才合成
        wrapAction('_heCheng',
            function(item, player) {
                var cups = (typeof get.xingBei == 'function') ? get.xingBei(player.side) : 0;
                var cupLimit = (typeof game.xingBeiMax == 'number') ? game.xingBeiMax : 3;
                return (cups + 1 >= cupLimit || get.shiQi(!player.side) <= 2) ? 5 : 0.2;
            },
            function(player) {
                var cups = (typeof get.xingBei == 'function') ? get.xingBei(player.side) : 0;
                var cupLimit = (typeof game.xingBeiMax == 'number') ? game.xingBeiMax : 3;
                return (cups + 1 >= cupLimit || get.shiQi(!player.side) <= 2) ? 1 : -20;
            });
        // 提炼：缺宝石或没有可用法术时优先提炼
        wrapAction('_tiLian',
            function(item, player) { return 3.5; },
            function(player) { return 1; });
        var refine = lib.skill._tiLian;
        if(refine && refine.chooseButton && !helper.isWrapped(refine.chooseButton.check)) {
            var oldCheck = refine.chooseButton.check;
            var refineCheck = function(button) {
                var player = _status.event.player;
                var base = typeof oldCheck == 'function' ? oldCheck.apply(this, arguments) : 1;
                if(base > 0 && helper.isBaiYue(player) && helper.needsGem(player) &&
                    button.link == 'baoShi' && !ui.selected.buttons.some(function(b) { return b.link == 'baoShi'; })) return 20;
                return base;
            };
            refineCheck.__suMingBaiYueWrap = true;
            refine.chooseButton.check = refineCheck;
        }
        // 优先攻击低手牌且未封魔的对手；缺宝石时保留提炼优先。
        if(lib.card) {
            for(var name in lib.card) {
                (function(cardName) {
                    var info = lib.card[cardName];
                    if(!info || info.type != 'gongJi' || helper.isWrapped(info.ai && info.ai.order)) return;
                    info.ai = info.ai || {};
                    var oldCardOrder = info.ai.order;
                    var cardOrder = function(item, player) {
                        if(helper.isBaiYue(player)) {
                            return !helper.needsGem(player) && game.hasPlayer(function(target) {
                                return helper.lowHandSealTarget(player, target);
                            }) ? 5.5 : 0.5;
                        }
                        if(typeof oldCardOrder == 'function') return oldCardOrder.apply(this, arguments);
                        return oldCardOrder;
                    };
                    cardOrder.__suMingBaiYueWrap = true;
                    info.ai.order = cardOrder;
                    info.ai.result = info.ai.result || {};
                    if(!helper.isWrapped(info.ai.result.target)) {
                        var oldTarget = info.ai.result.target;
                        var targetResult = function(player, target) {
                            var base = typeof oldTarget == 'function' ? oldTarget.apply(this, arguments) : oldTarget || 0;
                            if(helper.isBaiYue(player) && helper.lowHandSealTarget(player, target)) return base - 3;
                            return base;
                        };
                        targetResult.__suMingBaiYueWrap = true;
                        info.ai.result.target = targetResult;
                    }
                })(name);
            }
            lib.__suMingBaiYueAttackPatched = true;
        }
        // 爆牌与弃牌倾向：保留法术牌与费用牌，优先弃攻击牌
        if(!get.__suMingBaiYueValueWrapped) {
            get.__suMingBaiYueValueWrapped = true;
            var origValue = get.value;
            get.value = function(card, player) {
                if(card && helper.isBaiYue(player)) {
                    var cardName = get.name(card, player);
                    var keep = cardName == 'moDan' || cardName == 'anMie' ||
                        cardName == 'shengGuang' || cardName == 'xuRuo' ||
                        cardName == 'zhongDu' || cardName == 'shengDun' ||
                        get.type(card, player) == 'faShu';
                    if(keep) return 50;
                    if(get.type(card, player) == 'gongJi') return -50;
                }
                return origValue.apply(this, arguments);
            };
        }
    };
    // characterReplace只负责显示/随机切换形态；共享名额必须在抽样、分发之前处理。
    lib.suMingWanGeInstallHiddenDragonSelection = function() {
        const forms = ['sheYaoNan', 'huYaoNv'];
        const isForm = id => forms.includes(id);
        const blocked = () => {
            const banned = _status.connectMode
                ? (lib.configOL?.banned || []).concat(lib.connectBanned || [])
                : (lib.config.banned || []);
            return banned.some(isForm) || (game.players || []).some(p =>
                [p.name, p.name1, p.name2].some(isForm));
        };
        const collapse = list => {
            if(!Array.isArray(list)) return list;
            const unavailable = blocked();
            const representative = forms.find(id => list.includes(id));
            let added = false;
            return list.filter(id => {
                if(!isForm(id)) return true;
                if(unavailable || id !== representative || added) return false;
                added = true;
                return true;
            });
        };
        lib.suMingWanGeHiddenDragonPool = collapse;
        for(const key of ['characters','charactersOL','characterGets']) {
            const original = get[key];
            if(typeof original !== 'function' || original.suMingHiddenDragonSelection) continue;
            const wrapped = function() {
                const args = Array.from(arguments);
                // 有num参数时必须先合并再抽样，否则会挤掉一个其他角色的候选名额。
                if(key === 'characterGets') args[0] = collapse(args[0]);
                return collapse(original.apply(this,args));
            };
            wrapped.suMingHiddenDragonSelection = true;
            get[key] = wrapped;
        }
        const originalDialog = ui.create?.characterDialog;
        if(typeof originalDialog === 'function' && !originalDialog.suMingHiddenDragonSelection) {
            const wrapped = function() {
                const args = Array.from(arguments);
                const dialog = originalDialog.apply(this,args);
                // 仅处理选将用的自由选角对话框，不影响角色图鉴或卡牌浏览。
                if(!args.includes('heightset') || args.includes('thisiscard') || !dialog?.buttons) return dialog;
                let kept = null;
                dialog.buttons = dialog.buttons.filter(button => {
                    if(!isForm(button._link) && !isForm(button.link)) return true;
                    if(blocked() || kept) { button.remove(); return false; }
                    kept = button;
                    return true;
                });
                // 本体characterx按钮支持在同一名额内切换两种起始形态。
                if(kept && !kept._replaceButton) {
                    // 直接复用原按钮，保留capt、group、nodisplay及当前角色包筛选状态；
                    // 删除后新建characterx按钮会丢失这些元数据并泄漏到其他角色包页面。
                    kept._replaceButton = true;
                    if(typeof kept.refresh === 'function') kept.refresh(kept, kept.link);
                }
                return dialog;
            };
            wrapped.suMingHiddenDragonSelection = true;
            ui.create.characterDialog = wrapped;
        }
    };
    lib.suMingWanGePlayHiddenDragonAudio = function(file, speaker) {
        if(!file || !speaker || typeof game.broadcastAll !== 'function') return;
        game.broadcastAll(function(audioFile, audioSpeaker) {
            if(!lib.config.background_audio) return;
            game.playAudio({
                path: 'ext:宿命挽歌/audio/skill/' + audioFile + '.mp3',
                spatialPlayer: audioSpeaker,
                addVideo: false,
                onError: function() {},
            });
        }, file, speaker);
    };

    lib.suMingWanGePlayGuiJiangJunAudio = function(file, speaker) {
        if(!file) return;
        if(!speaker) {
            speaker = game.filterPlayer(function(current) {
                return current.name == 'guiJiangJun' ||
                    current.name1 == 'guiJiangJun' ||
                    current.name2 == 'guiJiangJun';
            })[0];
        }
        if(!speaker) return;
        game.broadcastAll(function(audioFile, audioSpeaker) {
            if(!lib.config.background_audio) return;
            game.playAudio({
                path: 'ext:宿命挽歌/audio/skill/' + audioFile + '.mp3',
                spatialPlayer: audioSpeaker,
                addVideo: false,
                onError: function() {},
            });
        }, file, speaker);
    };

    lib.suMingWanGeTransformShiDuTarget = async function(player) {
        if(!player || !player.isIn() ||
            player.countZhiShiWu('shiDu') < 3 ||
            player.storage.shiHuaTransforming ||
            player.name == 'suMingJiangShi' ||
            player.name1 == 'suMingJiangShi' ||
            player.name2 == 'suMingJiangShi') return false;
        var original = player.name1 || player.name;
        if(!original || original == 'suMingJiangShi') return false;
        player.storage.shiHuaTransforming = true;
        try {
            player.storage.shiHuaOriginalCharacter = original;
            if(player.isHengZhi()) await player.chongZhi();
            await player.tiaoZhengShouPai(4);
            await player.reinitCharacter(original, 'suMingJiangShi');
            if(!player.hasSkill('shiDu')) player.addSkill('shiDu');
            player.markSkill('shiDu');
            lib.suMingWanGePlayGuiJiangJunAudio('guiJiangJun_shiHua');
            return true;
        }
        finally {
            delete player.storage.shiHuaTransforming;
        }
    };

    return {
        "name": "宿命挽歌",
        "arenaReady": function(){
            lib.suMingBaiYueAi.applyActionPatch();
            game.addGlobalSkill("suMingWanGeBgm");
            game.addGlobalSkill("suMingWanGeCharacterActionAudio");
            game.addGlobalSkill("shiDuRuTi");
            game.addGlobalSkill("shiHua");
            game.addGlobalSkill("shiHuaBaoLiuZhiShiWu");
},
        "content": function(config,pack){

},
        "prepare": function(){

},
        "precontent": function(){
            installDiyFormPreview([["baiYueJiaoZhu","shuiMoShouBaiYueJiaoZhu"]]);
            lib.suMingBaiYueAi.applyActionPatch();
            // 与本体红衣主教／铸律者相同：选将、禁将同时移除两种形态。
            Object.assign(lib.characterReplace, {
                sheYaoNan: ['sheYaoNan', 'huYaoNv'],
                huYaoNv: ['huYaoNv', 'sheYaoNan'],
            });
            lib.suMingWanGeInstallHiddenDragonSelection();
            if(!lib.suMingWanGeShiQiUiGuard&&
                typeof ui.updateShiQiInfo=='function'){
                lib.suMingWanGeShiQiUiGuard=true;
                var updateShiQiInfo=ui.updateShiQiInfo;
                ui.updateShiQiInfo=function(){
                    if(!ui.shiQiInfo){
                        if(ui.window&&ui.create&&
                            typeof ui.create.zhanJi=='function'){
                            ui.create.zhanJi();
                        }
                        if(!ui.shiQiInfo) return;
                    }
                    return updateShiQiInfo.apply(this,arguments);
                };
            }
            var menuMusic =
                "ext:宿命挽歌/audio/bgm/yunGuHeFeng.mp3";
            lib.config.all.background_music.add(menuMusic);
            lib.configMenu.audio.config.background_music.item[menuMusic] =
                "云谷鹤峰";
            if(!lib.config.extension_轮回遗梦_enable &&
                lib.config.background_music == 'lhym_suMing_menu_random'){
                game.saveConfig('background_music', menuMusic);
            }
            if(!lib.config.extension_宿命挽歌_menuMusicInstalled){
                if(["music_default", menuMusic,
                    "ext:轮回遗梦/audio/bgm/yuJianJiangHu.mp3"
                ].includes(lib.config.background_music)){
                    game.saveConfig("background_music",
                        lib.lhymMenuMusicKey || menuMusic);
                }
                game.saveConfig(
                    "extension_宿命挽歌_menuMusicInstalled", true
                );
                if(ui.backgroundMusic) game.playBackgroundMusic();
            }
            if(!lib.suMingWanGeBgmRestoreRegistered){
                lib.suMingWanGeBgmRestoreRegistered=true;
                lib.onover.push(function(){
                    if(!_status.suMingWanGeBgmStarted) return;
                    if(ui.backgroundMusic) ui.backgroundMusic.loop=false;
                    if(_status.suMingWanGeHadTempMusic){
                        _status.tempMusic=_status.suMingWanGeOriginalTempMusic;
                    }
                    else{
                        delete _status.tempMusic;
                    }
                    delete _status.suMingWanGeBgmStarted;
                    delete _status.suMingWanGeHadTempMusic;
                    delete _status.suMingWanGeOriginalTempMusic;
                    game.playBackgroundMusic();
                });
            }
},
        "help": {},
        "config": {},
        "package": {
            "character": {
                "connect": true,
                "character": {
                    "sheYaoNan": [null, "jiGroup", 3, ["yinLongCangZhen", "kuangSheLianZhan", "suMingXianYueZhan", "yinLongXiangYi"], ["des:盘踞隐龙窟的蛇妖洞主，粗豪凶悍，却把珍宝与娘子看得比性命更重。他藏珍蓄势、连续挥刀，并与狐妖女相依换位追杀来敌。", "ext:宿命挽歌/sheYaoNan.webp"]],
                    "huYaoNv": [null, "yongGroup", 3, ["yinLongCangZhen", "meiYingLianXi", "suMingHuiMeng", "suMingLeiZhou", "suMingWuLeiZhou", "yinLongXiangYi"], ["des:镇守隐龙窟的狐妖女，柔媚言笑之下藏着雷咒与杀机。她以魅影、梦境和五雷扰乱敌阵，并与蛇妖男相依换位守护洞府。", "ext:宿命挽歌/huYaoNv.webp"]],
                    "zhaoLingEr": [
                        null,
                        "shengGroup",
                        4,
                        [
                            "wuLingXianShu",
                            "nvWaHouRen",
                            "mengShe",
                            "zhaoLingErMengSheTu",
                            "tianSheZhang",
                            "wuQiChaoYuan",
                            "guanYinZhou",
                            "shengLingZhu",
                            "shengLingPiFeng",
                            "wuShen",
                            "zhaoLingErRouQingXiaGu",
                            "lingLi",
                            "jueXingDu",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:承继女娲血脉的南诏公主，温柔之中怀有守护苍生的坚定。她以灵力治疗同伴、承接伤势，并在命运逼迫下唤醒女娲神力。",
                            "ext:宿命挽歌/zhaoLingEr.jpg",
                            "die:ext:宿命挽歌/audio/die/zhaoLingEr.mp3",
                        ],
                    ],
                    "liXiaoYao": [
                        null,
                        "jiGroup",
                        4.5,
                        [
                            "yuJianShu",
                            "qiXingJian",
                            "tianGangZhanQi",
                            "feiLongTanYunShou",
                            "tianShiFuFa",
                            "wanJianJue",
                            "xianFengYunTiShu",
                            "zuiXianWangYueBu",
                            "xiaoYaoShenJian",
                            "jiuShenZhou",
                            "liXiaoYaoRouQingXiaGu",
                            "jianY",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:从余杭小店踏上仙途的蜀山掌门，洒脱机敏，更重情义与苍生。他御剑积势、借酒催锋，在飞剑往返与逍遥神剑间展开连绵攻势。",
                            "ext:宿命挽歌/liXiaoYao.jpg",
                            "die:ext:宿命挽歌/audio/die/liXiaoYao.mp3",
                        ],
                    ],
                    "linYueRu": [
                        null,
                        "huanGroup",
                        4.5,
                        [
                            "linJiaQianJin",
                            "ningShenGuiYuan",
                            "qiJianZhi",
                            "yiYangZhi",
                            "qiJueJianQi",
                            "zhenYuanHuTi",
                            "zhanLongJue",
                            "tongQianBiao",
                            "qianKunYiZhi",
                            "linYueRuRouQingXiaGu",
                            "qiJing",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:南武林盟主之女，性情爽利、敢爱敢恨的林家千金。她以鞭法牵制敌人、为同伴挡下危局，并用不服输的锋芒延续攻势。",
                            "ext:宿命挽歌/linYueRu.jpg",
                            "die:ext:宿命挽歌/audio/die/linYueRu.mp3",
                        ],
                    ],
                    "aNu": [
                        null,
                        "yongGroup",
                        4.5,
                        [
                            "miaoJiangShengNv",
                            "haiTangFuRen",
                            "yanShaZhou",
                            "tianLeiPo",
                            "yuFengShu",
                            "jinCanWang",
                            "baoZhaGu",
                            "sanShiGu",
                            "yinGu",
                            "wanGuShiTian",
                            "qianKunYiZhi",
                            "gu",
                            "wuDuZhu",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:来自苗疆的白苗圣女，天真俏皮，却精通巫术与毒蛊。她驱使灵虫、播撒蛊毒，在削弱敌人与支援同伴之间灵活穿梭。",
                            "ext:宿命挽歌/aNu.jpg",
                            "die:ext:宿命挽歌/audio/die/aNu.mp3",
                        ],
                    ],
                    "baiYueJiaoZhu": [
                        null,
                        "xueGroup",
                        4.5,
                        [
                            "niTianWenDao",
                            "baiYueFengMo",
                            "shuiMoShouHeTi",
                            "mieJueYiJi",
                            "duoHun",
                            "daZhouShe",
                            "duTunTianXia",
                            "qunMoLuanWu",
                            "guiJiang",
                            "shuiMoShouHuTi",
                            "xingFengXueYu",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:以理性否定人心的拜月教主，冷静地把众生视作验证真理的祭品。他操纵咒术与洪水侵蚀战场，并与水魔兽合体迈向灭世结论。",
                            "ext:宿命挽歌/baiYueJiaoZhu.webp",
                        ],
                    ],
                    "shuiMoShouBaiYueJiaoZhu": [
                        null,
                        "xueGroup",
                        4.5,
                        [
                            "niTianWenDao",
                            "baiYueFengMo",
                            "shuiMoShouZhiQu",
                            "shuiMoShouZhiNu",
                            "nvWaZhiXue",
                            "yongSheng",
                            "zhangDuZhen",
                            "diLieTianBeng",
                            "taoTianJuLang",
                            "fengXueBingTian",
                            "hongShui",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:拜月教主与水魔兽融为一体的灭世形态，以无尽洪水吞没反抗者。他积累水患、压迫全场，在伤害与士气崩塌中维持永生。",
                            "ext:宿命挽歌/shuiMoShouBaiYueJiaoZhu.webp",
                            "unseen",
                            "forbidai",
                        ],
                    ],
                    "guiJiangJun": [
                        null,
                        "xueGroup",
                        4,
                        [
                            "jiangJunZhong",
                            "lianYuZhua",
                            "shiDuZhangQi",
                            "guiJiangJunGuiJiang",
                            "xueMoShenGong",
                            "yinQi",
                            "guiJiangJunShiDu",
                            "suMingWanGeBgm",
                        ],
                        [
                            "des:镇守将军冢的尸骸鬼将，以阴气统御不肯安息的亡军。他播撒尸毒、转移创伤，并让倒下的生者化作继续征战的僵尸。",
                            "ext:宿命挽歌/guiJiangJun.webp",
                        ],
                    ],
                    "suMingJiangShi": [
                        null,
                        "xueGroup",
                        2,
                        [
                            "fuShiZhiQu",
                            "xingShiZouRou",
                            "shiDuQinRan",
                            "shiXuePuYao",
                            "shiDu",
                        ],
                        [
                            "des:被尸毒夺去神智的临时僵尸，只能由鬼将军的【尸化】产生。它以腐朽躯体承受伤害，在有限行动中传播尸毒与死亡。",
                            "ext:宿命挽歌/suMingJiangShi.webp",
                            "unseen",
                            "forbidai",
                        ],
                    ],
                },
                "translate": {
                    "牛牛diy": "牛牛diy",
                    "无名拓展": "无名拓展",
                    "宿命挽歌": "宿命挽歌",
                    "zhaoLingEr": "赵灵儿",
                    "liXiaoYao": "李逍遥",
                    "linYueRu": "林月如",
                    "aNu": "阿奴",
                    "baiYueJiaoZhu": "拜月教主",
                    "shuiMoShouBaiYueJiaoZhu": "水魔兽·拜月教主",
                    "guiJiangJun": "鬼将军",
                    "suMingJiangShi": "僵尸",
                },
            },
            "card": {
                "card": {
                    "fengMo": {
                        "hidden": true,
                        "fullskin": true,
                        "type": "zhuanShu",
                        "enable": false,
                    },
                },
                "translate": {
                    "fengMo": "封魔",
                    "fengMo_info": "持有者无法发动响应技与法术；<span class='tiaoJian'>（其回合结束时）</span>移除。",
                },
                "list": [],
            },
            "skill": {
                "skill": {
                    yinLongStrategy: {
                        snake: player => [player.name, player.name1, player.name2].includes('sheYaoNan'),
                        enemies: player => game.filterPlayer(p => p !== player && p.side !== player.side && p.isIn()),
                        profile: function(player) {
                            const enemies = this.enemies(player);
                            const cards = player.getCards('h');
                            const attacks = cards.filter(card => get.type(card) === 'gongJi' && enemies.some(p => player.canUse(card, p)));
                            const spells = cards.filter(card => lib.filter.cardDiscardable(card, player) &&
                                (get.type(card) === 'faShu' || lib.skill.suMingLeiZhou.filterCard(card)));
                            const thunder = spells.filter(card => lib.skill.suMingLeiZhou.filterCard(card) && get.xiBie(card) === 'lei').length;
                            return {attacks, spells, thunder};
                        },
                        wantsSwitch: function(player) {
                            const {attacks, spells, thunder} = this.profile(player);
                            if(!this.enemies(player).length) return false;
                            const snake = this.snake(player);
                            const stats = player.getStat('skill') || {};
                            // A meaningful hand advantage is required; preserve a useful current form on mixed hands.
                            const attackScore = Math.min(2, attacks.length) * 2 + Math.max(0, attacks.length - 2) - (stats.kuangSheLianZhan ? 1 : 0);
                            const spellScore = Math.min(2, spells.length) * 2 + Math.max(0, spells.length - 2) + Math.min(2, thunder) * 0.4 - (stats.meiYingLianXi ? 1 : 0);
                            return snake ? spells.length >= 2 && spellScore - attackScore >= 1 :
                                attacks.length >= 2 && attackScore - spellScore >= 1;
                        },
                        finishingSynthesis: function(event, player) {
                            return !!(lib.skill._heCheng && lib.skill._heCheng.filter(event, player) &&
                                (get.shiQi(!player.side) <= 1 || get.xingBei(player.side) + 1 >= game.xingBeiMax));
                        },
                        damage: function(target, player, num) {
                            if(!target || !target.isIn() || num <= 0 || target.hasSkill('baDeNingZhi')) return 0;
                            const remaining = Math.max(0, num - (target.zhiLiao || 0));
                            // Consuming healing still has value, but is weaker than pressure on a full hand.
                            return remaining > 0 ? get.damageEffect2(target, player, remaining) :
                                (target.side !== player.side ? 0.35 : -0.35);
                        },
                        stoneCost: function(player) {
                            if(player.countNengLiang('shuiJing') > 0) return 0.65;
                            return player.countNengLiang('baoShi') <= 1 && this.wantsSwitch(player) ? 2.5 : 1.2;
                        },
                        dream: function(player, target) {
                            if(!target || !target.isIn()) return 0;
                            // Equal weighting is a heuristic, not a peek at or assumption about the next card.
                            return ['xuRuo', 'zhongDu'].reduce((sum, name) => sum +
                                (player.canUse({name}, target) ? get.effect(target, {name}, player, player) : 0), 0) / 2;
                        },
                        energyChoice: function(player) {
                            if(player.countNengLiang('baoShi') === 0 && this.wantsSwitch(player)) return '宝石';
                            return player.countEmptyNengLiang() >= 2 ? '水晶' : '宝石';
                        },
                    },
                    aNuStrategy: {
                        gu: player => player.getGaiPai('gu') || [],
                        profile: function(player) {
                            const gu = this.gu(player);
                            const byXiBie = {};
                            let faShu = 0;
                            gu.forEach(card => {
                                const x = get.xiBie(card);
                                byXiBie[x] = (byXiBie[x] || 0) + 1;
                                if(get.type(card) === 'faShu') faShu++;
                            });
                            return {count: gu.length, byXiBie: byXiBie,
                                distinct: Object.keys(byXiBie).length,
                                faShuCount: faShu, guangCount: byXiBie.guang || 0};
                        },
                        duYouCount: function(player, duYou) {
                            return player.getCards('h').filter(card =>
                                card.hasDuYou && card.hasDuYou(duYou)).length;
                        },
                        canBoost: function(player, xiBie) {
                            return player.getCards('h').some(card => get.xiBie(card) === xiBie);
                        },
                        fireFollowUp: function(player) {
                            return this.duYouCount(player, 'huoQou') > 0 ? 1.5 : 0;
                        },
                        guHunger: function(player) {
                            const p = this.profile(player);
                            if(p.count >= 9) return 0;
                            let hunger = 0;
                            if(p.distinct < 5) hunger += 0.8;
                            if(player.countNengLiang('baoShi') > 0) hunger += 0.6;
                            if(this.duYouCount(player, 'huoQou') > 0 ||
                                this.duYouCount(player, 'leiJi') > 0) hunger += 0.4;
                            if(p.guangCount === 0) hunger += 0.3;
                            return hunger;
                        },
                        sideNeedsStars: function(player) {
                            return game.filterPlayer(p => p.side === player.side && p.isIn() &&
                                p.countEmptyNengLiang && p.countEmptyNengLiang() > 0).length > 0;
                        },
                        lianGuStars: function(player, zhanJiLength) {
                            const cap = Math.max(0, Math.min(zhanJiLength,
                                9 - this.profile(player).count));
                            const hunger = this.guHunger(player);
                            if(hunger <= 0.5) return 0;
                            if(this.sideNeedsStars(player)) {
                                // 星石是购买/合成的共用资源；存量>3时可酌情烧1-2颗
                                if(zhanJiLength > 3) return Math.min(cap, hunger >= 1.5 ? 2 : hunger >= 0.7 ? 1 : 0);
                                return 0;
                            }
                            return Math.min(cap, hunger >= 1.5 ? cap : 1);
                        },
                        tianLeiPoWantsGu: function(player) {
                            const p = this.profile(player);
                            if(p.count >= 9) return false;
                            if(p.distinct < 5) return true;
                            if(this.duYouCount(player, 'huoQou') > 0) return true;
                            return p.count <= 4;
                        },
                        yanShaZhouValue: function(player, target) {
                            if(!target || target.side === player.side) return -1;
                            if(target.hasSkill('baoZhaGu_xiaoGuo')) return -1;
                            if(target.hasSkillTag && target.hasSkillTag('noShiQiXiaJiang')) return -1;
                            let value = 1 + this.fireFollowUp(player);
                            const chaZhi = target.getHandcardLimit() - target.countCards('h');
                            if(chaZhi <= 1) value -= 1.2;
                            return value;
                        },
                        wanGuTargets: player => game.filterPlayer(target =>
                            !target.hasZhiShiWu('wuDuZhu')),
                        sanShiGuTarget: function(player, target) {
                            if(!target || target.side === player.side) return 0;
                            if(target.hasZhiShiWu('wuDuZhu')) return 0;
                            let value = -1.5;
                            if(target.hasJiChuXiaoGuo('_zhongDu')) {
                                // 已中毒目标留给御蜂术跟进：攻击+1并回1蛊
                                value -= player.getCards('h').some(card =>
                                    get.type(card) === 'gongJi') ? 1.2 : 0.5;
                            }
                            return value;
                        },
                        wuDuZhuNeedy: function(player, leftTarget) {
                            return game.filterPlayer(p => p.side === player.side &&
                                p !== leftTarget && p.hasJiChuXiaoGuo('_zhongDu') &&
                                p.countCards('h') >= p.getHandcardLimit());
                        },
                        wuDuZhuChoice: function(player, leftTarget) {
                            return this.wuDuZhuNeedy(player, leftTarget).length > 0 ?
                                '移除战绩区1星石并指定目标' : '传给左手边角色';
                        },
                        wuDuZhuTarget: function(player, target) {
                            if(target.side !== player.side || target.hasZhiShiWu('wuDuZhu')) return -100;
                            let value = get.attitude(player, target);
                            if(target.hasJiChuXiaoGuo('_zhongDu') &&
                                target.countCards('h') >= target.getHandcardLimit()) value += 10;
                            return value;
                        },
                    },
                    yinLongCangZhen: {
                        mod: {maxNengLiang: function(player, num) {return num + 2;}},
                        trigger: {player: 'phaseEnd'}, forced: true,
                        content: async function(event, trigger, player) {
                            const choice = await player.chooseControl('宝石', '水晶')
                                .set('prompt', '隐龙藏珍：获得1宝石或2水晶')
                                .set('ai', () => { var player = _status.event["online_18853_player"]; return lib.skill.yinLongStrategy.energyChoice(player); }).set("online_18853_player", player).forResultControl();
                            await player.addNengLiang(choice === '宝石' ? 'baoShi' : 'shuiJing', choice === '宝石' ? 1 : 2);
                            const character = lib.skill.yinLongStrategy.snake(player) ? 'sheYaoNan' : 'huYaoNv';
                            lib.suMingWanGePlayHiddenDragonAudio(character + '_yinLongCangZhenEnd', player);
                        },
                        group: 'yinLongCangZhen_steal',
                        subSkill: {steal: {
                            trigger: {global: 'changeShiQiEnd'}, forced: true, popup: false,
                            filter: function(event, player) {
                                return event && event.num < 0 && event.side === player.side &&
                                    event.player === player && event.cause === 'damage' &&
                                    event.source && event.source !== player && event.source.isIn() &&
                                    event.source.countEmptyNengLiang() > 0 && player.countNengLiangAll() > 0;
                            },
                            content: async function(event, trigger, player) {
                                const source = trigger.source;
                                const choices = ['baoShi', 'shuiJing'].filter(type => player.countNengLiang(type) > 0);
                                const choice = await source.chooseControl(choices.concat('cancel2'))
                                    .set('prompt', '隐龙藏珍：可以取得受伤角色的一颗星石')
                                    .set('ai', () => { var source = _status.event["online_20438_source"]; var player = _status.event["online_20438_player"]; var choices = _status.event["online_20438_choices"]; return source.side === player.side ? 'cancel2' : choices[0]; }).set("online_20438_source", source).set("online_20438_player", player).set("online_20438_choices", choices).forResultControl();
                                if(!choices.includes(choice) || !source.isIn() || source.countEmptyNengLiang() <= 0 || !player.hasNengLiang(choice)) return;
                                const before = source.countNengLiang(choice);
                                await source.addNengLiang(choice, 1);
                                if(source.countNengLiang(choice) > before) {
                                    await player.removeNengLiang(choice, 1);
                                    const character = lib.skill.yinLongStrategy.snake(player) ? 'sheYaoNan' : 'huYaoNv';
                                    lib.suMingWanGePlayHiddenDragonAudio(character + '_yinLongCangZhenSteal', player);
                                }
                            },
                        }},
                    },
                    kuangSheLianZhan: {
                        audio: "ext:宿命挽歌/audio/skill/sheYaoNan_kuangSheLianZhan.mp3",
                        trigger: {player: 'gongJiEnd'}, usable: 1,
                        filter: event => !!event && !event.yingZhan && get.is.xingDong(event),
                        check: (event, player) => lib.skill.yinLongStrategy.profile(player).attacks.length > 0,
                        content: function(event, trigger, player) {player.addGongJi();},
                    },
                    meiYingLianXi: {
                        audio: "ext:宿命挽歌/audio/skill/huYaoNv_meiYingLianXi.mp3",
                        trigger: {player: 'faShuEnd'}, usable: 1,
                        filter: event => !!event && get.is.xingDong(event),
                        check: function(event, player) {
                            const strategy = lib.skill.yinLongStrategy;
                            const enemies = strategy.enemies(player);
                            return player.getCards('h').some(card =>
                                (get.type(card) === 'faShu' && enemies.some(target => player.canUse(card, target))) ||
                                (lib.filter.cardDiscardable(card, player) &&
                                    ((lib.skill.suMingLeiZhou.filterCard(card) && enemies.some(target => strategy.damage(target, player, get.xiBie(card) === 'lei' ? 2 : 1) > 0)) ||
                                    (get.type(card) === 'faShu' && enemies.some(target => strategy.dream(player, target) > 0)))));
                        },
                        content: function(event, trigger, player) {player.addFaShu();},
                    },
                    suMingXianYueZhan: {
                        audio: "ext:宿命挽歌/audio/skill/sheYaoNan_suMingXianYueZhan.mp3",
                        trigger: {source: 'gongJiMingZhong'},
                        filter: (event, player) => !!event && !event.yingZhan && event.target && event.damageNum > 0 &&
                            player.canBiShaShuiJing() && game.hasPlayer(p => p.side !== player.side && p !== event.target),
                        check: (event, player) => lib.skill.yinLongStrategy.enemies(player)
                            .filter(target => target !== event.target)
                            .reduce((sum, target) => sum + lib.skill.yinLongStrategy.damage(target, player, event.damageNum), 0) >
                                lib.skill.yinLongStrategy.stoneCost(player),
                        content: async function(event, trigger, player) {
                            const num = trigger.damageNum;
                            const targets = game.filterPlayer(p => p.side !== player.side && p !== trigger.target).sortBySeat(player);
                            await player.removeBiShaShuiJing();
                            for(const target of targets) if(target.isIn()) await target.damage(num, player, 'nocard').set('suMingXianYueZhan', true);
                        },
                    },
                    suMingHuiMeng: {
                        audio: "ext:宿命挽歌/audio/skill/huYaoNv_suMingHuiMeng.mp3",
                        type: 'faShu', enable: 'faShu', position: 'h', selectCard: 1,
                        filter: function(event, player) {
                            return player.hasCard(function(card) {
                                return get.type(card) === 'faShu' &&
                                    lib.filter.cardDiscardable(card, player);
                            }, 'h');
                        },
                        filterCard: card => get.type(card) === 'faShu', discard: true,
                        check: card => 7 - get.value(card) - (lib.skill.suMingLeiZhou.filterCard(card) && get.xiBie(card) === 'lei' ? 2 : 0),
                        filterTarget: lib.filter.opponent,
                        content: async function(event, trigger, player) {
                            const cards = get.cards(1);
                            if(!cards.length) return;
                            await player.showCards(cards, '回梦');
                            const name = get.type(cards[0]) === 'faShu' ? 'xuRuo' : 'zhongDu';
                            await game.cardsDiscard(cards);
                            if(event.target && event.target.isIn()) await lib.suMingUseTemporaryEffectCard(player, name, event.target);
                        },
                        ai: {order: function(item, player) {
                            return lib.skill.yinLongStrategy.enemies(player).some(target => lib.skill.yinLongStrategy.dream(player, target) > 0) ? 3.2 : 0;
                        }, result: {player: (player, target) => lib.skill.yinLongStrategy.dream(player, target)}},
                    },
                    suMingLeiZhou: {
                        audio: "ext:宿命挽歌/audio/skill/huYaoNv_suMingLeiZhou.mp3",
                        type: 'faShu', enable: 'faShu', position: 'h', selectCard: 1, discard: true,
                        filter: function(event, player) {
                            return player.hasCard(function(card) {
                                return lib.filter.cardDiscardable(card, player) &&
                                    lib.skill.suMingLeiZhou.filterCard(card);
                            }, 'h');
                        },
                        filterCard: card => !!card && typeof card.hasDuYou === 'function' &&
                            ['yunShi', 'bingDong', 'huoQou', 'fengRen', 'leiJi'].some(id => card.hasDuYou(id)),
                        filterTarget: lib.filter.opponent,
                        check: card => 7 - get.value(card) + (get.xiBie(card) === 'lei' ? 2 : 0),
                        content: async function(event, trigger, player) {
                            if(event.target && event.target.isIn()) await event.target.faShuDamage(get.xiBie(event.cards[0]) === 'lei' ? 2 : 1, player, event.cards[0]);
                        },
                        ai: {order: function(item, player) {
                            return lib.skill.yinLongStrategy.profile(player).thunder > 0 ? 4 : 3.3;
                        }, result: {player: function(player, target) {
                            const card = ui.selected.cards[0];
                            return lib.skill.yinLongStrategy.damage(target, player, card && get.xiBie(card) === 'lei' ? 2 : 1);
                        }}},
                    },
                    suMingWuLeiZhou: {
                        audio: "ext:宿命挽歌/audio/skill/huYaoNv_suMingWuLeiZhou.mp3",
                        trigger: {source: 'zaoChengShangHai'},
                        filter: (event, player) => !!event && event.faShu === true && event.num > 0 &&
                            player.canBiShaShuiJing() &&
                            game.hasPlayer(p => p.side !== player.side && p !== event.player),
                        cost: async function(event, trigger, player) {
                            event.result = await player.chooseTarget('五雷咒：支付水晶，对另一名对手造成等额法术伤害',
                                (card, source, target) => target.side !== source.side && target !== _status.event.originalTarget)
                                .set('originalTarget', trigger.player)
                                .set('ai', target => { var player = _status.event["online_28592_player"]; return lib.skill.yinLongStrategy.damage(target, player, _status.event.onlineDragonDamage) -
                                    lib.skill.yinLongStrategy.stoneCost(player); }).set("online_28592_player", player).set('onlineDragonDamage', trigger.num).forResult();
                        },
                        content: async function(event, trigger, player) {
                            const target = event.targets && event.targets[0];
                            if(!target || !target.isIn()) return;
                            const num = trigger.num;
                            await player.removeBiShaShuiJing();
                            await target.faShuDamage(num, player, 'nocard').set('suMingWuLeiZhou', true);
                        },
                    },
                    yinLongXiangYi: {
                        type: 'qiDong', trigger: {player: 'qiDong'},
                        filter: (event, player) => player.canBiShaBaoShi() &&
                            [player.name, player.name1, player.name2].some(id => id === 'sheYaoNan' || id === 'huYaoNv'),
                        check: function(event, player) {
                            return !lib.skill.yinLongStrategy.finishingSynthesis(event, player) &&
                                lib.skill.yinLongStrategy.wantsSwitch(player);
                        },
                        content: async function(event, trigger, player) {
                            const from = [player.name1, player.name2, player.name].find(id => id === 'sheYaoNan' || id === 'huYaoNv');
                            if(!from) return;
                            await player.removeBiShaBaoShi();
                            lib.suMingWanGePlayHiddenDragonAudio(from + '_yinLongXiangYi', player);
                            await player.reinitCharacter(from, from === 'sheYaoNan' ? 'huYaoNv' : 'sheYaoNan');
                        },
                    },
                    "shiDu": {
                        "charlotte": true,
                        "markimage": "extension/宿命挽歌/mark_shiDu.webp",
                        "group": ["shiDuRuTi", "shiHua"],
                        "intro": {
                            "name": "专属【尸毒】",
                            "content": "mark",
                            "mark": function(dialog, storage, player) { return "当前层数：" + player.countZhiShiWu("shiDu") + "<br>" + lib.translate.guiJiangJunShiDu_info; },
                            "max": 3,
                        },
                        "onremove": "storage",
                        "add": async function(target, num) {
                            if(!target || !target.isIn() || num <= 0) return 0;
                            if(target.name == 'guiJiangJun' ||
                                target.name1 == 'guiJiangJun' ||
                                target.name2 == 'guiJiangJun') return 0;
                            if(!target.hasSkill('shiDu')) target.addSkill('shiDu');
                            var before = target.countZhiShiWu('shiDu');
                            await target.addZhiShiWu('shiDu', num);
                            var added = Math.max(0,
                                target.countZhiShiWu('shiDu') - before);
                            if(added > 0) {
                                await lib.suMingWanGeTransformShiDuTarget(target);
                            }
                            return added;
                        },
                    },
                    "shiDuRuTi": {
                        "charlotte": true,
                        "trigger": {"player": "phaseBegin"},
                        "filter": function(event, player) {
                            return player.hasSkill('shiDu') &&
                                player.countZhiShiWu('shiDu') > 0 &&
                                player.name != 'suMingJiangShi' &&
                                player.name1 != 'suMingJiangShi' &&
                                player.name2 != 'suMingJiangShi';
                        },
                        "cost": async function(event, trigger, player) {
                            var num = player.countZhiShiWu('shiDu');
                            var control = await player.chooseControl(
                                '【尸毒】+1',
                                '承受' + num + '点法术伤害'
                            ).set('prompt', '【尸毒入体】选择一项')
                                .set('ai', function() {
                                    var player = _status.event.player;
                                    if(lib.suMingBaiYueAi.isBaiYue(player)) return 1;
                                    var num = player.countZhiShiWu('shiDu');
                                    return num >= 2 ? 1 : 0;
                                }).forResult('control');
                            event.result = {
                                bool: !!control,
                                cost_data: control,
                            };
                        },
                        "content": async function(event, trigger, player) {
                            if(event.cost_data == '【尸毒】+1') {
                                await lib.skill.shiDu.add(player, 1);
                            }
                            else {
                                var num = player.countZhiShiWu('shiDu');
                                if(num > 0) {
                                    await player.faShuDamage(num, 'nosource');
                                }
                            }
                        },
                    },
                    "shiHua": {
                        "charlotte": true,
                        "trigger": {"player": "changeZhiShiWuEnd"},
                        "forced": true,
                        "firstDo": true,
                        "priority": 1000,
                        "popup": false,
                        "filter": function(event, player) {
                            return !!event && event.zhiShiWu == 'shiDu' &&
                                event.num > 0 &&
                                player.countZhiShiWu('shiDu') >= 3 &&
                                player.name != 'suMingJiangShi' &&
                                player.name1 != 'suMingJiangShi' &&
                                player.name2 != 'suMingJiangShi';
                        },
                        "content": async function(event, trigger, player) {
                            await lib.suMingWanGeTransformShiDuTarget(player);
                        },
                    },
                    "shiHuaBaoLiuZhiShiWu": {
                        "charlotte": true,
                        "trigger": {"global": "changeSkillsBefore"},
                        "forced": true,
                        "firstDo": true,
                        "priority": 1000,
                        "popup": false,
                        "filter": function(event) {
                            return !!event && !!event.player &&
                                !!event.player.storage.shiHuaTransforming &&
                                event.player.name1 == 'suMingJiangShi' &&
                                Array.isArray(event.removeSkill);
                        },
                        "content": function(event, trigger) {
                            trigger.removeSkill = trigger.removeSkill.filter(function(skill) {
                                var info = get.info(skill);
                                // Pure counter skills own the mark and its storage. Removing them
                                // during reinit would run onremove and erase the counter.
                                return !info || !info.intro || !info.onremove ||
                                    info.trigger || info.enable || info.group ||
                                    info.mod || info.skillBlocker;
                            });
                        },
                    },
                    "guiJiangJunShiDu": {"charlotte": true, "nopop": true, "popup": false},
                    "baiYueFengMo": {"charlotte": true, "nopop": true, "popup": false},
                    "jiangJunZhong": {
                        "group": [
                            "jiangJunZhong_kaiJu",
                            "jiangJunZhong_jinZhi",
                            "jiangJunZhong_huoDe",
                        ],
                        "subSkill": {
                            "kaiJu": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                                    lib.suMingWanGePlayGuiJiangJunAudio(
                                        'guiJiangJun_jiangJunZhong', player
                                    );
                                },
                            },
                            "jinZhi": {
                                "trigger": {"player": "changeZhiShiWuBefore"},
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event) {
                                    return !!event && event.zhiShiWu == 'shiDu' &&
                                        event.num > 0;
                                },
                                "content": function(event, trigger) {
                                    trigger.num = 0;
                                },
                            },
                            "huoDe": {
                                "trigger": {"global": "changeZhiShiWuEnd"},
                                "forced": true,
                                "filter": function(event, player) {
                                    return !!event && event.player != player &&
                                        event.zhiShiWu == 'shiDu' && event.num > 0 &&
                                        !player.isZhiShiWuMax('yinQi');
                                },
                                "content": async function(event, trigger, player) {
                                    await player.addZhiShiWu(
                                        'yinQi', trigger.num
                                    );
                                },
                            },
                        },
                    },
                    "yinQi": {
                        "charlotte": true,
                        "markimage": "extension/宿命挽歌/mark_yinQi.webp",
                        "intro": {
                            "name": "阴气",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                    },
                    "lianYuZhua": {
                        "trigger": {"source": "gongJiMingZhongAfter"},
                        "filter": function(event, player) {
                            return !!event && !!event.target && event.target.isIn() &&
                                (player.countZhiShiWu('yinQi') >= 2 ||
                                    player.countCards('h', function(card) {
                                        return get.xiBie(card) == 'di';
                                    }) > 0);
                        },
                        "cost": async function(event, trigger, player) {
                            var controls = [];
                            if(player.countZhiShiWu('yinQi') >= 2) {
                                controls.push('移除2【阴气】');
                            }
                            if(player.countCards('h', function(card) {
                                return get.xiBie(card) == 'di';
                            }) > 0) controls.push('弃置1张土系牌');
                            controls.push('cancel2');
                            var control = await player.chooseControl(controls)
                                .set('prompt', '是否发动【炼狱爪】？')
                                .set('prompt2', lib.translate.lianYuZhua_info)
                                .set('ai', function() {
                                    var index = _status.event.controls.indexOf(
                                        '弃置1张土系牌'
                                    );
                                    return index >= 0 ? index : 0;
                                }).forResult('control');
                            if(!control || control == 'cancel2') {
                                event.result = {bool: false};
                                return;
                            }
                            if(control == '弃置1张土系牌') {
                                var cards = await player.chooseToDiscard(
                                    'h', 1, true, function(card) {
                                        return get.xiBie(card) == 'di';
                                    }
                                ).set('visible', true).set('ai', function(card) {
                                    return 7 - get.value(card);
                                }).forResultCards() || [];
                                if(!cards.length) {
                                    event.result = {bool: false};
                                    return;
                                }
                            }
                            event.result = {bool: true, cost_data: control};
                        },
                        "content": async function(event, trigger, player) {
                            if(event.cost_data == '移除2【阴气】') {
                                await player.removeZhiShiWu('yinQi', 2);
                            }
                            lib.suMingWanGePlayGuiJiangJunAudio('guiJiangJun_lianYuZhua', player);
                            trigger.changeDamageNum(1);
                            if(trigger.target && trigger.target.isIn()) {
                                await lib.skill.shiDu.add(trigger.target, 1);
                            }
                        },
                    },
                    "shiDuZhangQi": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.type(card) == 'faShu';
                            }) > 0 && game.hasPlayer(function(current) {
                                return current.isIn() &&
                                    current.countZhiShiWu('shiDu') == 0;
                            });
                        },
                        "position": "h",
                        "selectCard": 1,
                        "filterCard": function(card) {
                            return get.type(card) == 'faShu';
                        },
                        "check": function(card) {
                            return 7 - get.value(card);
                        },
                        "discard": true,
                        "visible": true,
                        "filterTarget": function(card, player, target) {
                            return target.countZhiShiWu('shiDu') == 0;
                        },
                        "content": async function(event, trigger, player) {
                            lib.suMingWanGePlayGuiJiangJunAudio('guiJiangJun_shiDuZhangQi', player);
                            var firstTarget = event.target;
                            await lib.skill.shiDu.add(firstTarget, 1);
                            var targets = game.filterPlayer(function(current) {
                                return current != firstTarget && current.isIn() &&
                                    current.countZhiShiWu('shiDu') > 0;
                            }).sortBySeat(player);
                            for(var target of targets) {
                                if(!target.isIn()) continue;
                                await target.draw(1);
                                if(target.isIn()) {
                                    await lib.skill.shiDu.add(target, 1);
                                }
                            }
                        },
                        "ai": {
                            "order": 5.5,
                            "result": {"target": -1},
                        },
                    },
                    "guiJiangJunGuiJiang": {
                        "group": "guiJiangJunGuiJiang_zhuanYi",
                        "trigger": {"global": "gongJiMingZhongAfter"},
                        "filter": function(event, player) {
                            if(!event || !event.player || !event.target ||
                                event.target.side != player.side ||
                                event.player.side == player.side ||
                                event.yingZhan !== false) return false;
                            event.customArgs = event.customArgs || {};
                            if(event.customArgs.guiJiangJunGuiJiang) return false;
                            var sourceIsZombie =
                                event.player.name == 'suMingJiangShi' ||
                                event.player.name1 == 'suMingJiangShi' ||
                                event.player.name2 == 'suMingJiangShi';
                            var cost = sourceIsZombie ? 3 : 5;
                            if(player.countZhiShiWu('yinQi') < cost) return false;
                            return game.hasPlayer(function(current) {
                                return current.side != player.side &&
                                    current != event.target && current.isIn();
                            });
                        },
                        "cost": async function(event, trigger, player) {
                            var sourceIsZombie =
                                trigger.player.name == 'suMingJiangShi' ||
                                trigger.player.name1 == 'suMingJiangShi' ||
                                trigger.player.name2 == 'suMingJiangShi';
                            var cost = sourceIsZombie ? 3 : 5;
                            var targets = await player.chooseTarget(
                                '【鬼降】移除' + cost +
                                    '【阴气】，将此伤害转移给另一名目标对手',
                                function(card, player, target) {
                                    var trigger = _status.event.getTrigger();
                                    return target.side != player.side &&
                                        target != trigger.target;
                                }
                            ).set('ai', function(target) {
                                var trigger = _status.event.getTrigger();
                                var player = _status.event.player;
                                var damageNum = Math.max(
                                    1, trigger.damageNum || 1
                                );
                                var score = get.damageEffect2(
                                    target, player, damageNum
                                ) - get.damageEffect2(
                                    trigger.target, player, damageNum
                                );
                                if(target.countZhiShiWu('shiDu') < 3) {
                                    score += target.countZhiShiWu('shiDu') == 2 ?
                                        1.5 : 0.5;
                                }
                                return score;
                            }).forResultTargets() || [];
                            event.result = {
                                bool: targets.length > 0,
                                cost_data: targets[0],
                            };
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.cost_data;
                            if(!target || !target.isIn()) return;
                            var source = trigger.player;
                            var sourceIsZombie =
                                source.name == 'suMingJiangShi' ||
                                source.name1 == 'suMingJiangShi' ||
                                source.name2 == 'suMingJiangShi';
                            var cost = sourceIsZombie ? 3 : 5;
                            var before = player.countZhiShiWu('yinQi');
                            if(before < cost) return;
                            await player.removeZhiShiWu('yinQi', cost);
                            if(before - player.countZhiShiWu('yinQi') < cost) return;
                            lib.suMingWanGePlayGuiJiangJunAudio('guiJiangJun_guiJiang', player);
                            trigger.customArgs = trigger.customArgs || {};
                            trigger.customArgs.guiJiangJunGuiJiang = {
                                owner: player,
                                target: target,
                                sourceIsZombie: sourceIsZombie,
                                used: false,
                            };
                        },
                        "subSkill": {
                            "zhuanYi": {
                                "trigger": {"global": "zaoChengShangHai"},
                                "forced": true,
                                "lastDo": true,
                                "priority": -100,
                                "popup": false,
                                "findData": function(event, player) {
                                    var current = event, guard = 0;
                                    while(current && guard++ < 64) {
                                        var data = current.customArgs &&
                                            current.customArgs
                                                .guiJiangJunGuiJiang;
                                        if(data && data.owner == player) return data;
                                        if(typeof current.getParent != 'function') {
                                            break;
                                        }
                                        var parent = current.getParent();
                                        if(!parent || parent == current) break;
                                        current = parent;
                                    }
                                    return null;
                                },
                                "filter": function(event, player) {
                                    if(!event || event.num <= 0 ||
                                        event.guiJiangJunGuiJiangTransfer) {
                                        return false;
                                    }
                                    var data = lib.skill
                                        .guiJiangJunGuiJiang_zhuanYi
                                        .findData(event, player);
                                    return !!data && !data.used && data.target &&
                                        data.target.isIn();
                                },
                                "content": async function(event, trigger, player) {
                                    var data = lib.skill
                                        .guiJiangJunGuiJiang_zhuanYi
                                        .findData(trigger, player);
                                    if(!data || data.used || !data.target ||
                                        !data.target.isIn()) return;
                                    data.used = true;
                                    var num = Math.max(0, trigger.num || 0);
                                    var source = trigger.source;
                                    trigger.setDamageNum(0);
                                    if(num > 0) {
                                        var next = data.target.damage(num, source)
                                            .set('guiJiangJunGuiJiangTransfer', true)
                                            .set('shiXuePuYaoActive',
                                                data.sourceIsZombie === true);
                                        if(trigger.faShu === true) {
                                            next.set('faShu', true);
                                        }
                                        await next;
                                    }
                                    if(data.target.isIn()) {
                                        await lib.skill.shiDu.add(data.target, 1);
                                    }
                                },
                            },
                        },
                    },
                    "xueMoShenGong": {
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            return player.canBiShaBaoShi() &&
                                game.hasPlayer(function(current) {
                                    return current.countZhiShiWu('shiDu') > 0;
                                });
                        },
                        "content": async function(event, trigger, player) {
                            await player.removeBiShaBaoShi();
                            lib.suMingWanGePlayGuiJiangJunAudio('guiJiangJun_xueMoShenGong', player);
                            var records = [], total = 0;
                            var targets = game.filterPlayer(function(current) {
                                return current.countZhiShiWu('shiDu') > 0;
                            }).sortBySeat(player);
                            for(var target of targets) {
                                var num = target.countZhiShiWu('shiDu');
                                if(num <= 0) continue;
                                await target.removeZhiShiWu('shiDu', num);
                                var removed = Math.max(0, num -
                                    target.countZhiShiWu('shiDu'));
                                if(removed > 0) {
                                    records.push([target, removed]);
                                    total += removed;
                                }
                            }
                            player.addSkill('xueMoShenGongJiLu');
                            try {
                                for(var record of records) {
                                    var target = record[0];
                                    if(!target.isIn()) continue;
                                    var damageEvent = target.faShuDamage(
                                        Math.min(3, record[1]) + 1,
                                        player, 'nocard'
                                    );
                                    damageEvent.xueMoShenGongSource = player;
                                    await damageEvent;
                                }
                            }
                            finally {
                                player.removeSkill('xueMoShenGongJiLu');
                            }
                            if(total >= 5) await player.addFaShu();
                        },
                        "ai": {"baoShi": true, "order": 6},
                    },
                    "xueMoShenGongJiLu": {
                        "charlotte": true,
                        "trigger": {"source": "chengShouShangHaiAfter"},
                        "forced": true,
                        "popup": false,
                        "filter": function(event, player) {
                            return !!event && event.num > 0 &&
                                event.xueMoShenGongSource == player &&
                                event.player && event.player.side != player.side;
                        },
                        "content": async function(event, trigger, player) {
                            await player.changeZhiLiao(1, player);
                        },
                    },
                    "fuShiZhiQu": {
                        "forced": true,
                        "popup": false,
                        "group": ["fuShiZhiQu_jianShang", "fuShiZhiQu_huiFu"],
                        "subSkill": {
                            "jianShang": {
                                "trigger": {"player": "chengShouShangHaiBefore"},
                                "forced": true,
                                "filter": function(event) {
                                    return !!event && event.num > 0;
                                },
                                "content": function(event, trigger) {
                                    trigger.changeDamageNum(-1);
                                },
                            },
                            "huiFu": {
                                "trigger": {"player": "phaseEnd"},
                                "forced": true,
                                "lastDo": true,
                                "content": async function(event, trigger, player) {
                                    var num = player.countZhiShiWu('shiDu');
                                    if(num > 0) {
                                        await player.removeZhiShiWu('shiDu', 1);
                                    }
                                    if(player.countZhiShiWu('shiDu') > 0) return;
                                    var original =
                                        player.storage.shiHuaOriginalCharacter;
                                    if(!original || original == 'suMingJiangShi') return;
                                    await player.reinitCharacter(
                                        'suMingJiangShi', original
                                    );
                                    delete player.storage.shiHuaOriginalCharacter;
                                    player.removeSkill('shiDu');
                                },
                            },
                        },
                    },
                    "xingShiZouRou": {
                        "forced": true,
                        "popup": false,
                        "init": function(player, skill) {
                            player.addSkillBlocker(skill);
                        },
                        "onremove": function(player, skill) {
                            player.removeSkillBlocker(skill);
                        },
                        "skillBlocker": function(skill) {
                            if(skill == 'xingShiZouRou' || skill == '_zhiLiao') return false;
                            var info = get.info(skill) || {};
                            return info.type == 'faShu' || info.type == 'teShu';
                        },
                        "mod": {
                            "cardname": function() {
                                return 'anMie';
                            },
                            "cardType": function() {
                                return 'gongJi';
                            },
                            "cardXiBie": function() {
                                return 'an';
                            },
                        },
                        "ai": {"order": 4},
                    },
                    "shiDuQinRan": {
                        "popup": false,
                        "trigger": {"source": "chengShouShangHaiAfter"},
                        "forced": true,
                        "filter": function(event, player) {
                            return !!event && event.num > 0 &&
                                event.faShu !== true && event.player &&
                                event.player.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            await lib.skill.shiDu.add(trigger.player, 1);
                            var num = player.countZhiShiWu('shiDu');
                            if(num > 0) {
                                await player.removeZhiShiWu('shiDu', 1);
                            }
                        },
                    },
                    "shiXuePuYao": {
                        "forced": true,
                        "popup": false,
                        "group": ["shiXuePuYao_zengShang", "shiXuePuYao_zhiLiao"],
                        "subSkill": {
                            "zengShang": {
                                "trigger": {"source": "zaoChengShangHai"},
                                "forced": true,
                                "filter": function(event) {
                                    return !!event && event.num > 0 &&
                                        event.faShu !== true &&
                                        (get.is.zhuDongGongJi(event) ||
                                            event.shiXuePuYaoActive === true);
                                },
                                "content": function(event, trigger) {
                                    trigger.changeDamageNum(1);
                                },
                            },
                            "zhiLiao": {
                                "trigger": {"source": "chengShouShangHaiAfter"},
                                "forced": true,
                                "filter": function(event) {
                                    return !!event && event.num > 0 &&
                                        event.faShu !== true &&
                                        (get.is.zhuDongGongJi(event) ||
                                            event.shiXuePuYaoActive === true);
                                },
                                "content": async function(event, trigger, player) {
                                    await player.changeZhiLiao(2, player);
                                },
                            },
                        },
                    },
                    "suMingWanGeBgm": {
                        charlotte: true,
                        hasPackCharacter: function(packName, fallbackIds){
                            var pack=lib.characterPack&&lib.characterPack[packName];
                            var ids=pack ? Object.keys(pack) : fallbackIds;
                            return game.hasPlayer(function(current){
                                return ids.some(function(characterId){
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current,characterId);
                                });
                            });
                        },
                        playTrack: function(src){
                            game.broadcastAll(function(src){
                                if(!_status.suMingWanGeBgmStarted){
                                    _status.suMingWanGeHadTempMusic=
                                        Object.prototype.hasOwnProperty.call(
                                            _status,"tempMusic"
                                        );
                                    _status.suMingWanGeOriginalTempMusic=
                                        _status.tempMusic;
                                }
                                _status.suMingWanGeBgmStarted=true;
                                _status.tempMusic=src;
                                game.playBackgroundMusic();
                                if(ui.backgroundMusic&&
                                    lib.config.background_music!="music_off"){
                                    ui.backgroundMusic.loop=true;
                                    ui.backgroundMusic.currentTime=0;
                                    var playResult=ui.backgroundMusic.play();
                                    if(playResult&&playResult.catch){
                                        playResult.catch(function(){});
                                    }
                                }
                            },src);
                        },
                        trigger: {global:"gameStart"},
                        forced: true,
                        popup: false,
                        firstDo: true,
                        priority: 100,
                        filter: function(){
                            return !_status.suMingWanGeBgmStarted;
                        },
                        content: function(){
                            var pool=[];
                            var add=function(src){if(src&&!pool.includes(src))pool.push(src);};
                            var tracks=[
                                ["shuiMoShouBaiYueJiaoZhu","ext:宿命挽歌/audio/bgm/niTianErXing2.mp3"],
                                ["baiYueJiaoZhu","ext:宿命挽歌/audio/bgm/niTianErXing.mp3"],
                                ["guiJiangJun","ext:宿命挽歌/audio/bgm/bingXiongZhanWei.mp3"],
                                ["sheYaoNan","ext:宿命挽歌/audio/bgm/xinJiRuFen.mp3"],
                                ["huYaoNv","ext:宿命挽歌/audio/bgm/xinJiRuFen.mp3"],
                                ["linYueRu","ext:宿命挽歌/audio/bgm/biWuZhaoQin.mp3"],
                                ["aNu","ext:宿命挽歌/audio/bgm/taoHuaHuanMeng.mp3"],
                                ["zhaoLingEr","ext:宿命挽歌/audio/bgm/qingYuan.mp3"],
                                ["liXiaoYao","ext:宿命挽歌/audio/bgm/yuJianFuMo.mp3"],
                            ];
                            for(var i=0;i<tracks.length;i++){
                                if(game.hasPlayer(function(current){
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current,tracks[i][0]);
                                })){
                                    add(tracks[i][1]);
                                }
                            }
                            if(lib.lhymBattleMusic && lib.lhymBattleMusic.tracks){
                                lib.lhymBattleMusic.tracks().forEach(add);
                            }
                            var bigCowTracks=[
                                ["zhaoFuQueJi","ext:宿命挽歌/audio/bgm/gangGangJiJi.mp3"],
                                ["tongGuHeRen","ext:宿命挽歌/audio/bgm/swordland.mp3"],
                                ["shiDiFu","ext:宿命挽歌/audio/bgm/pigstep.mp3"],
                                ["xiaoYan","ext:宿命挽歌/audio/bgm/douPoCangQiong.mp3"],
                            ];
                            for(var j=0;j<bigCowTracks.length;j++){
                                if(game.hasPlayer(function(current){
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current,bigCowTracks[j][0]);
                                })){
                                    add(bigCowTracks[j][1]);
                                }
                            }
                            if(lib.skill.suMingWanGeBgm.hasPackCharacter(
                                "永夜残响",
                                ["wuHeQinLi","yeDaoShenShiXiang","siMiNai","shiQiKuangSan"]
                            )){
                                add("ext:宿命挽歌/audio/bgm/dateALive.mp3");
                            }
                            if(lib.skill.suMingWanGeBgm.hasPackCharacter(
                                "创世纪",
                                ["beiyanadopushen","baiHuaLiaoLuan","luMiYa","tianQiZhe","yuXueMoShen"]
                            )){
                                add("ext:宿命挽歌/audio/bgm/fengYiYangDeYongShi.mp3");
                            }
                            // 与战局留声的歌曲列表保持一致：三首默认战斗曲始终参与随机。
                            add("ext:宿命挽歌/audio/bgm/ending.mp3");
                            add("ext:宿命挽歌/audio/bgm/dateALive.mp3");
                            add("ext:宿命挽歌/audio/bgm/fengYiYangDeYongShi.mp3");
                            var music=pool[Math.floor(Math.random()*pool.length)];
                            lib.skill.suMingWanGeBgm.playTrack(music);
                        },
                    },
                    "suMingWanGeLianDong": {
                        "isCharacter": function(current, characterId) {
                            if (!current) return false;
                            if (typeof current.isIn == "function" && !current.isIn()) return false;
                            return current.name == characterId ||
                                current.name1 == characterId ||
                                current.name2 == characterId;
                        },
                        "getCharacters": function(characterIds) {
                            return game.filterPlayer(function(current) {
                                return characterIds.some(function(characterId) {
                                    return lib.skill.suMingWanGeLianDong
                                        .isCharacter(current, characterId);
                                });
                            });
                        },
                        "hasCharacter": function(characterId) {
                            return game.hasPlayer(function(current) {
                                return lib.skill.suMingWanGeLianDong
                                    .isCharacter(current, characterId);
                            });
                        },
                    },
                    "suMingWanGeCharacterActionAudio": {
                        trigger: {
                            player: ["gouMai", "heCheng", "tiLian"],
                        },
                        forced: true,
                        popup: false,
                        charlotte: true,
                        firstDo: true,
                        content: function(event, trigger, player) {
                            var files = {
                                gouMai: "gouMai.mp3",
                                heCheng: "heCheng.mp3",
                                tiLian: "tiLian.mp3",
                            };
                            var actionName = event.triggername || trigger.name;
                            var file = files[actionName];
                            if (!file) return;
                            var supported = [
                                "zhaoLingEr",
                                "liXiaoYao",
                                "linYueRu",
                                "aNu",
                                "baiYueJiaoZhu",
                                "shuiMoShouBaiYueJiaoZhu",
                                "guiJiangJun",
                                "sheYaoNan",
                                "huYaoNv",
                            ];
                            var character = [
                                player.name,
                                player.name1,
                                player.name2,
                            ].find(function(characterId) {
                                return supported.includes(characterId);
                            });
                            if (!character) return;
                            var path = "ext:宿命挽歌/audio/action/" +
                                character + "/" + file;
                            game.broadcastAll(function(audioPath, audioSpeaker) {
                                if (!lib.config.background_audio) return;
                                game.playAudio({
                                    path: audioPath,
                                    spatialPlayer: audioSpeaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, path, player);
                        },
                    },
                    "zhaoLingErRouQingXiaGu": {},
                    "liXiaoYaoRouQingXiaGu": {
                        "audio": "ext:宿命挽歌/audio/skill/liXiaoYaoRouQingXiaGu.mp3",
                    },
                    "liXiaoYaoRouQingXiaGuZhaoLingEr": {
                        "audio": "ext:宿命挽歌/audio/skill/liXiaoYaoRouQingXiaGuZhaoLingEr.mp3",
                    },
                    "liXiaoYaoRouQingXiaGuLinYueRu": {
                        "audio": "ext:宿命挽歌/audio/skill/liXiaoYaoRouQingXiaGuLinYueRu.mp3",
                    },
                    "liXiaoYaoYuJianShuVoice": {
                        "audio": "ext:宿命挽歌/audio/skill/yuJianShu.mp3",
                    },
                    "liXiaoYaoQiXingJianVoice": {
                        "audio": "ext:宿命挽歌/audio/skill/qiXingJian.mp3",
                    },
                    "liXiaoYaoTianGangZhanQiVoice": {
                        "audio": "ext:宿命挽歌/audio/skill/tianGangZhanQi.mp3",
                    },
                    "linYueRuRouQingXiaGu": {},
                    "wuLingXianShu": {
                        "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                        "isLegalTarget": function(player, target) {
                            return !player.hasSkill('nvWaHouRen') ||
                                target.countCards('h') < target.getHandcardLimit();
                        },
                        "getLegalTargets": function(player) {
                    return game.filterPlayer(function(target) {
                        return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                    });
                        },
                        "subSkill": {
                            "faShuHua": {
                                "trigger": {"source": "zaoChengShangHai"},
                                "forced": true,
                                "firstDo": true,
                                "popup": false,
                                "filter": function(event) {
                                    return event.faShu !== true;
                                },
                                "content": function(event, trigger) {
                                    trigger.faShu = true;
                                },
                            },
                            "yunShi": {
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "duYou": "yunShi",
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('yunShi');
                            }else{
                                return get.xiBie(card)=='di'
                            }
                        },
                                "discard": false,
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('yunShi')
                        },
                                "complexCard": true,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.yunShi.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=(await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                            })
                            .set("ai", function (target) {
                            var source = _status.event.source;
                                return source ? get.damageEffect2(
                                    target, source, _status.event.damageNum
                                ) : 0;
                            })
                            .set('source',player).set('damageNum',event.num)
                            .forResultTargets() || []);

                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            await player.addFaShu();
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 6.6,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "bingDong": {
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "bingDong",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('bingDong');
                            }else{
                                return get.xiBie(card)=='shui'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('bingDong');
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.bingDong.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=(await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                            })
                            .set("ai", function (target) {
                            var source = _status.event.source;
                                return source ? get.damageEffect2(
                                    target, source, _status.event.damageNum
                                ) : 0;
                            }).set('source',player)
                            .set('damageNum',event.num).forResultTargets() || []);
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            //'step 2'
                            var targets=(await player.chooseTarget(1, `冰冻：选择1名角色+1点[治疗]`, true)
                            .set("ai", function (target) {
                            var source = _status.event.source;
                                return source ? get.zhiLiaoEffect2(
                                    target, source, 1
                                ) : 0;
                            }).set('source',player).forResultTargets() || []);
                            for(var target of targets.sortBySeat(player)){
                                await target.changeZhiLiao(1, player);
                            }
                            //'step 3'
                            //if(result.bool){
                            //    result.targets[0].changeZhiLiao(1,player);
                            //}
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 6.6,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "huoQou": {
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "huoQou",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('huoQou');
                            }else{
                                return get.xiBie(card)=='huo'
                            }
                        },
                                "filterOk": function(){
                            if(ui.selected.cards[0].hasDuYou('huoQou')){
                                return true;
                            }else{
                                return false;
                            }
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.huoQou.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            //'step 0'
                            event.num=2;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=(await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                            })
                            .set("ai", function (target) {
                            var source = _status.event.source;
                                return source ? get.damageEffect2(
                                    target, source, _status.event.damageNum
                                ) : 0;
                            }).set('source',player)
                            .set('damageNum',event.num).forResultTargets() || []);
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 6.8,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target,2);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "fengRen": {
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "fengRen",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('fengRen');
                            }else{
                                return get.xiBie(card)=='feng'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('fengRen')
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.fengRen.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            //'step 0'
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=(await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                            })
                            .set("ai", function (target) {
                            var source = _status.event.source;
                                return source ? get.damageEffect2(
                                    target, source, _status.event.damageNum
                                ) : 0;
                            }).set('source',player)
                            .set('damageNum',event.num).forResultTargets() || []);
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            //'step 2'
                            await player.addGongJi();
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 6.7,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                            "leiJi": {
                                "audio": "ext:宿命挽歌/audio/skill/wuLingXianShu.mp3",
                                "sub": true,
                                "sourceSkill": "wuLingXianShu",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "leiJi",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('leiJi');
                            }else{
                                return get.xiBie(card)=='lei'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('leiJi')
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);;
                            }
                        },
                                "position": "h",
                                "filter": function(event,player){
                            if(!lib.skill.wuLingXianShu.getLegalTargets(player).length) {
                                return false;
                            }
                            return player.hasCard(function(card){
                                return lib.skill.leiJi.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            //'step 0'
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            //'step 1'
                            await event.trigger("wuLingXianShuStart");
                            var charNum= event.getParent().charNum || 1;
                            //var baseNum= event.getParent().baseNum || 1;
                            var targets=(await player.chooseTarget(charNum, `对${charNum}名角色造成${event.num}点法术伤害`, true,function(card,player,target){
                                return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                            })
                            .set("ai", function (target) {
                            var source = _status.event.source;
                                return source ? get.damageEffect2(
                                    target, source, _status.event.damageNum
                                ) : 0;
                            }).set('source',player)
                            .set('damageNum',event.num).forResultTargets() || []);
                            for(var target of targets.sortBySeat(player)){
                                if(charNum ==1 )
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',false);
                                else
                                    await target.faShuDamage(event.num, player).set('shengLingZhu',true);
                            }
                            //'step 2'
                            await player.changeZhanJi('baoShi',1);
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 6.9,
                                    "result": {
                                        "target": function(player,target){
                                    return get.damageEffect(target);
                                },
                                    },
                                },
                                "_priority": 0,
                            },
                        },
                        "group": [
                            "wuLingXianShu_faShuHua",
                            "wuLingXianShu_yunShi",
                            "wuLingXianShu_bingDong",
                            "wuLingXianShu_huoQou",
                            "wuLingXianShu_fengRen",
                            "wuLingXianShu_leiJi",
                        ],
                        "_priority": 0,
                    },
                    "nvWaHouRen": {
                        "trigger": {"player": "changeZhiShiWuEnd"},
                        "forced": true,
                        "group": ["nvWaHouRen_kaiJu"],
                        "subSkill": {
                            "kaiJu": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "popup": false,
                                "firstDo": true,
                                "priority": 90,
                                "content": function(event, trigger, player) {
                                    var audioPath =
                                        'ext:宿命挽歌/audio/skill/nvWaHouRen.mp3';
                                    game.broadcastAll(function(path, speaker) {
                                        if(!lib.config.background_audio) return;
                                        game.playAudio({
                                            path: path,
                                            spatialPlayer: speaker,
                                            addVideo: false,
                                            onError: function() {},
                                        });
                                    }, audioPath, player);
                                },
                            },
                        },
                        "filter": function(event, player) {
                    return event.zhiShiWu == 'lingLi' && event.num < 0;
                },
                        "content": async function(event, trigger, player) {
                    await player.addZhiShiWu('jueXingDu', -trigger.num);
                    await lib.skill.nvWaHouRen.awaken(player);
                },
                        "awaken": async function(player) {
                    if(player.hasSkill('mengSheXingTai') || player.countZhiShiWu('jueXingDu') < 10) return;
                    if(!player.isHengZhi()) await player.hengZhi();
                    player.addSkill('mengSheXingTai');
                    var audioPath =
                        'ext:宿命挽歌/audio/skill/mengShe.mp3';
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, audioPath, player);
                    player.removeSkill('nvWaHouRen');
                },
                        "_priority": 0,
                    },
                    "mengShe": {
                        "audio": "ext:宿命挽歌/audio/skill/mengShe.mp3",
                        "trigger": {"source": "zaoChengShangHai"},
                        "forced": true,
                        "filter": function(event, player) {
                            return player.hasSkill('mengSheXingTai') &&
                                event.num > 0;
                        },
                        "content": function(event, trigger) {
                            trigger.changeDamageNum(1);
                        },
                        "priority": -1,
                    },
                    "mengSheXingTai": {
                        "charlotte": true,
                        "mark": true,
                        "marktext": "蛇",
                        "intro": {
                            "name": "梦蛇形态",
                            "content": "你已失去【女娲后人】；造成的攻击伤害与法术伤害+1。",
                        },
                    },
                    "zhaoLingErMengSheTu": {
                        "charlotte": true,
                        "trigger": {
                            "player": ["hengZhiAfter", "chongZhiAfter"],
                            "global": "gameStart",
                        },
                        "forced": true,
                        "popup": false,
                        "firstDo": true,
                        "setAvatar": function(target, dream) {
                            game.broadcastAll(function(target, dream) {
                                var setNode = function(node) {
                                    if(!node) return;
                                    if(dream) {
                                        node.setBackgroundImage(
                                            'extension/宿命挽歌/' +
                                            'zhaoLingEr_mengShe.webp'
                                        );
                                    }
                                    else {
                                        node.setBackground(
                                            'zhaoLingEr', 'character'
                                        );
                                    }
                                };
                                if(target.name == 'zhaoLingEr' ||
                                    target.name1 == 'zhaoLingEr') {
                                    setNode(target.node.avatar);
                                }
                                if(target.name2 == 'zhaoLingEr') {
                                    setNode(target.node.avatar2);
                                }
                                if(target == game.me && ui.fakeme &&
                                    target.node.avatar) {
                                    ui.fakeme.style.backgroundImage =
                                        target.node.avatar.style.backgroundImage;
                                }
                            }, target, dream);
                        },
                        "content": function(event, trigger, player) {
                            lib.skill.zhaoLingErMengSheTu.setAvatar(
                                player, player.isHengZhi()
                            );
                        },
                    },
                    "tianSheZhang": {
                        "audio": "ext:宿命挽歌/audio/skill/tianSheZhang.mp3",
                        "logAudio": function(event) {
                    if(event && event.source &&
                        event.source.hasSkill('mengSheXingTai')) {
                        return false;
                    }
                    return 'ext:宿命挽歌/audio/skill/tianSheZhang.mp3';
                },
                        "trigger": {
                            "source": "zaoChengShangHai",
                        },
                        "filter": function(event,player){
                    //game.log(event.shengLingZhu);
                    if(event.faShu!=true) return false;
                    if(event.shengLingZhu==true) return false;
                    return true;
                },
                        "content": function(){
                    player.addZhiShiWu('lingLi');
                },
                        "_priority": 0,
                    },
                    "wuQiChaoYuan": {
                        "audio": "ext:宿命挽歌/audio/skill/wuQiChaoYuan.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "shouldUse": function(player){
                    if(player.countZhiShiWu('lingLi')<5) return false;
                    var total=0;
                    var critical=false;
                    game.filterPlayer(function(current){
                        return current.side==player.side;
                    }).forEach(function(current){
                        var missing=Math.max(
                            0,current.getZhiLiaoLimit()-current.zhiLiao
                        );
                        total+=Math.min(2,missing);
                        if(missing>=2) critical=true;
                    });
                    return critical||total>=3;
                },
                        "filter": function(event,player){
                    return player.countMark('lingLi')>=5
                },
                        "selectTarget": -1,
                        "filterTarget": function(card,player,target){
                    return player.side==target.side; // 只能选择己方
                },
                        "contentBefore": function(){
                    player.removeZhiShiWu('lingLi',5);
                },
                        "content": function(){

                    target.changeZhiLiao(2,player).set('yuanSuDianRan',true);
                        },
                        "ai": {
                            "order": function(item,player){
                    return lib.skill.wuQiChaoYuan.shouldUse(player)?8.5:0;
                },
                            "result": {
                                "player": function(player){
                            return lib.skill.wuQiChaoYuan.shouldUse(player)?2:0;
                        },
                                "target": function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "guanYinZhou": {
                        "audio": "ext:宿命挽歌/audio/skill/guanYinZhou.mp3",
                        "enable": "faShu",
                        "type": "faShu",
                        "filterTarget": true,
                        "prompt": "令目标角色+1[治疗]，你+1[灵力]",
                        "filter": function(event,player){
                    return true;
                },
                        "content": async function(event,trigger,player){
                    var skillTarget=event.target;
                    var linkedMark;
                    if(lib.skill.suMingWanGeLianDong
                        .isCharacter(skillTarget,'liXiaoYao')){
                        linkedMark='jianY';
                    }
                    else if(lib.skill.suMingWanGeLianDong
                        .isCharacter(skillTarget,'linYueRu')){
                        linkedMark='qiJing';
                    }
                    if(linkedMark){
                        var linkedName=linkedMark=='jianY'?'【剑】':'【气劲】';
                        var control=await player.chooseControl(
                            ['+1【治疗】','令目标+1'+linkedName+'，你+1【觉醒度】']
                        ).set(
                            'prompt','【柔情侠骨】：选择【观音咒】的效果'
                        ).set('ai',function(){
                            var target=_status.event.target;
                            var mark=_status.event.mark;
                            if(target.countZhiShiWu(mark)<
                                lib.skill[mark].intro.max&&
                                target.zhiLiao>=
                                target.getZhiLiaoLimit()){
                                return 1;
                            }
                            return 0;
                        }).set('target',skillTarget)
                        .set('mark',linkedMark).forResultControl();
                        if(control!='+1【治疗】'){
                            player.logSkill(
                                'zhaoLingErRouQingXiaGu',skillTarget
                            );
                            await skillTarget.addZhiShiWu(linkedMark,1);
                            await player.addZhiShiWu('jueXingDu',1);
                            await lib.skill.nvWaHouRen.awaken(player);
                            return;
                        }
                    }
                    await skillTarget.changeZhiLiao(1,player);
                    await player.addZhiShiWu('lingLi',1);
                },
                        "ai": {
                            "result": {
                                "target": function(player,target){
                            if(target.side != player.side) return 0;
                            var missing = Math.max(
                                0, target.getZhiLiaoLimit()-target.zhiLiao
                            );
                            var value = missing > 0 ?
                                get.zhiLiaoEffect(target,1)+0.45 : 0;
                            var linkedValue = 0;
                            if(lib.skill.suMingWanGeLianDong
                                .isCharacter(target,'liXiaoYao') &&
                                target.countZhiShiWu('jianY') <
                                    lib.skill.jianY.intro.max) {
                                linkedValue = 2;
                            }
                            if(lib.skill.suMingWanGeLianDong
                                .isCharacter(target,'linYueRu') &&
                                target.countZhiShiWu('qiJing') <
                                    lib.skill.qiJing.intro.max) {
                                linkedValue = 2;
                            }
                            return Math.max(value,linkedValue);
                        },
                            },
                            "order": function(item,player){
                        var wounded=game.hasPlayer(function(current){
                            return current.side==player.side &&
                                current.zhiLiao<current.getZhiLiaoLimit();
                        });
                        if(wounded) return 5.7;
                        var lingLi=player.countZhiShiWu('lingLi');
                        if(lingLi>=4) return 0;
                        return lingLi<=1 ? 2.2 : 1.2;
                    },
                        },
                        "_priority": 0,
                    },
                    "shengLingZhu": {
                        "audio": "ext:宿命挽歌/audio/skill/shengLingZhu.mp3",
                        "trigger": {
                            "player": "wuLingXianShuStart",
                        },
                        "filter": function(event,player){
                    return player.countMark('lingLi')>=2 &&
                        lib.skill.wuLingXianShu.getLegalTargets(player).length >= 2;

                },
                        "cost": async function cost(event,trigger,player){
                    var list=[];
                    var num=player.countZhiShiWu('lingLi');
                    var targetCount =
                        lib.skill.wuLingXianShu.getLegalTargets(player).length;
                    if(num>=2 && targetCount>=2) {
                        list.push(2);
                    }
                    if(num>=4 && targetCount>=3) {
                        list.push(4);
                    }

                    list.push('cancel2');
                    var result=await player.chooseControl(list)
                    .set('prompt',get.prompt('shengLingZhu'))
                    .set('prompt2',lib.translate.shengLingZhu_info)
                    .set('ai',function(){
                        return _status.event.num;
                    })
                    .set('num',list.length-2)
                    .forResultControl();
                    event.result={
                        bool:result!='cancel2',
                        cost_data:result,
                    }
                },
                        "content": function(){
                    event.num=event.cost_data;
                    player.removeZhiShiWu('lingLi',event.num);
                    if(event.num==4)
                    trigger.getParent().charNum=3;
                    else
                    trigger.getParent().charNum=2;

                },
                        "_priority": 0,
                    },
                    "shengLingPiFeng": {
                        "audio": "ext:宿命挽歌/audio/skill/shengLingPiFeng.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event,player){
                    return player.canBiShaShuiJing();
                        },
                        "content": async function(event, trigger, player){
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('lingLi',2);
                },
                        "check": function(event,player){
                    if(player.countNengLiang('shuiJing') < 1) return false;
                    if(player.hasSkill('mengSheXingTai')) return false;
                    var lingLi=player.countZhiShiWu('lingLi');
                    if(lingLi>4) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    var awakening=player.countZhiShiWu('jueXingDu');
                    var canSpend=player.canFaShu() &&
                        lib.skill.wuLingXianShu
                            .getLegalTargets(player).length > 0;
                    if(awakening>=8) return canSpend;
                    return canSpend || lingLi<=2;
                },
                        "ai": {
                            "shuiJing": true,
                        },
                        "mod": {
                            "aiOrder": function(player, item, num) {
                                if(item != '_tiLian' ||
                                    player.hasSkill('mengSheXingTai')) return;
                                var lingLi=player.countZhiShiWu('lingLi');
                                var awakening=player.countZhiShiWu('jueXingDu');
                                if(player.countNengLiang('shuiJing') == 0 &&
                                    lingLi<=4 && awakening<10) {
                                    return Math.max(num, awakening>=6 ? 9 : 7.2);
                                }
                            },
                        },
                        "_priority": -100,
                    },
                    "wuShen": {
                        "audio": "ext:宿命挽歌/audio/skill/wuShen.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    return player.canBiShaBaoShi();
                },
                        "filterTarget": function(card, player, target) {
                    return lib.skill.wuLingXianShu.isLegalTarget(player, target);
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var linkedBonus=0;
                    if(lib.skill.suMingWanGeLianDong
                        .hasCharacter('liXiaoYao')) linkedBonus++;
                    if(lib.skill.suMingWanGeLianDong
                        .hasCharacter('linYueRu')) linkedBonus++;
                    var num=player.countNengLiangAll()+2+linkedBonus;
                    event.num=num;
                    'step 2'
                    target.faShuDamage(event.num,player);
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item,player){
                        return 3.4+(player.countNengLiangAll()-1)*0.1;
                    },
                            "result": {
                                "target": function(player,target){
                            return get.damageEffect(target,2);
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "lingLi": {
                        "intro": {
                            "name": "灵力",
                            "content": "mark",
                            "max": 6,
                        },
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_lingLi.webp",
                        "_priority": 0,
                    },
                    "jueXingDu": {
                        "intro": {
                            "name": "觉醒度",
                            "content": "mark",
                            "max": 10,
                        },
                        "mark": true,
                        "marktext": "醒",
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_jueXingDu.webp",
                    },
                    "yuJianShu": {
                        "trigger": {
                            "source": "gongJiMingZhong",
                        },
                        "forced": true,
                        "content": function(){
                    lib.skill.yuJianShu.recordVoice(
                        trigger,
                        'yuJianShu'
                    );
                    player.addZhiShiWu('jianY');
                },
                        "recordVoice": function(event, skill) {
                    var attack=lib.skill.yuJianShu
                        .getAttackEvent(event);
                    if(!attack) return null;
                    attack.customArgs=attack.customArgs||{};
                    attack.customArgs.liXiaoYaoAttackVoices=
                        attack.customArgs.liXiaoYaoAttackVoices||{};
                    attack.customArgs.liXiaoYaoAttackVoices[skill]=true;
                    return attack;
                },
                        "getAttackEvent": function(event) {
                    if(!event) return null;
                    var current=event;
                    var attack=null;
                    var depth=0;
                    while(current&&depth++<30){
                        if(current.customArgs&&
                            current.customArgs.liXiaoYaoAttackVoices){
                            return current;
                        }
                        if(!attack&&current.type=='gongJi'){
                            attack=current;
                        }
                        current=current.parent||
                            (current.getParent&&current.getParent());
                    }
                    return attack;
                },
                        "playVoice": function(attack, player, skill) {
                    if(!attack||!player||!skill) return false;
                    attack.customArgs=attack.customArgs||{};
                    var voices=attack.customArgs
                        .liXiaoYaoAttackVoices;
                    if(!voices||voices.played) return false;
                    voices.played=skill;
                    game.trySkillAudio(skill,player,true);
                    return true;
                },
                        "group": [
                            "yuJianShu_voice",
                            "yuJianShu_fallback",
                        ],
                        "subSkill": {
                            "voice": {
                                "trigger": {"source": "shouDaoShangHai"},
                                "forced": true,
                                "popup": false,
                                "filter": function(event) {
                            var attack=lib.skill.yuJianShu
                                .getAttackEvent(event);
                            var voices=attack&&attack.customArgs&&
                                attack.customArgs.liXiaoYaoAttackVoices;
                            return !!voices&&!voices.played&&
                                !!voices.yuJianShu;
                        },
                                "content": function(event, trigger, player) {
                            lib.skill.yuJianShu.playVoice(
                                lib.skill.yuJianShu
                                    .getAttackEvent(trigger),
                                player,
                                'liXiaoYaoYuJianShuVoice'
                            );
                        },
                            },
                            "fallback": {
                                "trigger": {"source": "gongJiEnd"},
                                "forced": true,
                                "popup": false,
                                "filter": function(event) {
                            var attack=lib.skill.yuJianShu
                                .getAttackEvent(event);
                            var voices=attack&&attack.customArgs&&
                                attack.customArgs.liXiaoYaoAttackVoices;
                            return !!voices&&!voices.played;
                        },
                                "content": function(event, trigger, player) {
                            var attack=lib.skill.yuJianShu
                                .getAttackEvent(trigger);
                            var voices=attack.customArgs
                                .liXiaoYaoAttackVoices;
                            var voiceSkill=voices.tianGangZhanQi ?
                                'liXiaoYaoTianGangZhanQiVoice' :
                                voices.qiXingJian ?
                                    'liXiaoYaoQiXingJianVoice' :
                                    'liXiaoYaoYuJianShuVoice';
                            lib.skill.yuJianShu.playVoice(
                                attack,
                                player,
                                voiceSkill
                            );
                        },
                            },
                        },
                        "_priority": 0,
                    },
                    "qiXingJian": {
                        "mod": {
                            "maxNengLiang": function(player,num){
                        return num+4;
                    },
                        },
                        "forced": true,
                        "trigger": {
                            "source": "zaoChengShangHai",
                        },
                        "filter": function(event,player){
                    if(event.faShu!=true&&event.num>3)
                    return true;
               },
                        "content": function(){
                    var attack=lib.skill.yuJianShu.recordVoice(
                        trigger,
                        'qiXingJian'
                    );
                    lib.skill.yuJianShu.playVoice(
                        attack,
                        player,
                        'liXiaoYaoQiXingJianVoice'
                    );
                    player.addNengLiang('shuiJing',1);
               },
                    },
                    "tianGangZhanQi": {
                        "forced": true,
                        "trigger": {
                            "player": "gongJiSheZhi",
                        },
                        "priority": 1,
                        "filter": function(event,player){
                    return event.yingZhan!=true&&player.getStat('gongJi').zhuDong.length==3;
                },
                        "content": function(){
                    var attack=lib.skill.yuJianShu.recordVoice(
                        trigger,
                        'tianGangZhanQi'
                    );
                    lib.skill.yuJianShu.playVoice(
                        attack,
                        player,
                        'liXiaoYaoTianGangZhanQiVoice'
                    );
                    var hasLinkedCharacter=
                        lib.skill.suMingWanGeLianDong
                            .hasCharacter('zhaoLingEr')||
                        lib.skill.suMingWanGeLianDong
                            .hasCharacter('linYueRu');
                    trigger.changeDamageNum(hasLinkedCharacter?1:2);
                },
                    },
                    "feiLongTanYunShou": {
                        "audio": "ext:宿命挽歌/audio/skill/feiLongTanYunShou.mp3",
                        "trigger": {
                            "global": "_tiLian_backupEnd",
                        },
                        "forced": true,
                        "filter": function(event,player){
                    return event.player!=player;
                },
                        "content": async function (event, trigger, player) {
                    var isLinkedRefiner=
                        lib.skill.suMingWanGeLianDong
                            .isCharacter(trigger.player,'zhaoLingEr')||
                        lib.skill.suMingWanGeLianDong
                            .isCharacter(trigger.player,'linYueRu');
                    var linkedStones=[];
                    if(isLinkedRefiner){
                        if(trigger.player.countNengLiang('shuiJing')>0){
                            linkedStones.push('shuiJing');
                        }
                        if(trigger.player.countNengLiang('baoShi')>0){
                            linkedStones.push('baoShi');
                        }
                    }
                    if(linkedStones.length){
                        var direct=await player.chooseBool(
                            '【柔情侠骨】：是否直接获得'+
                            get.translation(trigger.player)+'的1个星石？'
                        ).set('ai',function(){
                            var target=_status.event.target;
                            return get.attitude(_status.event.player,target)<=0||
                                _status.event.player.countNengLiangAll()==0;
                        }).set('target',trigger.player).forResultBool();
                        if(direct){
                            var directStone=linkedStones[0];
                            var directAudioSkill=lib.skill
                                .suMingWanGeLianDong.isCharacter(
                                    trigger.player,
                                    'zhaoLingEr'
                                ) ?
                                'liXiaoYaoRouQingXiaGuZhaoLingEr' :
                                'liXiaoYaoRouQingXiaGuLinYueRu';
                            await trigger.player
                                .removeNengLiang(directStone,1);
                            await player.addNengLiang(directStone,1);
                            player.logSkill(
                                directAudioSkill,
                                trigger.player
                            );
                        }
                        return;
                    }
                    let cards = get.cards();
                    await player.showHiddenCards(cards);
                    if (get.type(cards[0]) == "faShu"){
                        var stones=[];
                        if(trigger.player.countNengLiang('shuiJing')>0) {
                            stones.push('shuiJing');
                        }
                        if(trigger.player.countNengLiang('baoShi')>0) {
                            stones.push('baoShi');
                        }
                        if(stones.length){
                            var stone=stones[0];
                            await trigger.player.removeNengLiang(stone,1);
                            await player.addNengLiang(stone,1);
                        }
                    }
                    await game.cardsDiscard(cards);
                },
                        "group": [
                            "feiLongTanYunShou_buNengTiLian",
                        ],
                        "subSkill": {
                            "buNengTiLian": {
                                "init": function(player){
                        player.tempBanSkill('_tiLian','forever');
                    },
                                "onremove": function(player){
                        delete player.storage.temp_ban__tiLian;
                    },
                                "content": async function(event, trigger, player) {
                },
                            },
                        },
                    },
                    "tianShiFuFa": {
                        "audio": "ext:宿命挽歌/audio/skill/tianShiFuFa.mp3",
                        "priority": 1,
                        "trigger": {
                            "source": "gongJiMingZhongAfter",
                        },
                        "filter": function(event,player){
                    return player.countCards('h',function(card){
                        return get.type(card)=='faShu';
                    }) >= 2;
                },
                        "cost": async function cost(event, trigger, player) {
                    event.result=await player.chooseCard('h',[2,3],function(card){
                        return get.type(card)=='faShu';
                    })
                    .set('prompt',get.prompt(event.skill))
                    .set('prompt2',lib.translate[event.skill+'_info'])
                    .set('ai',function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                },
                        "content": function(){
					player.discard(event.cards).set('showCards',true);
					event.num=event.cards.length-1;
                    trigger.changeDamageNum(event.num);// 加一点伤害
                },
                        "check": function(card){
                    return 6-get.value(card);
                },
                    },
                    "wanJianJue": {
                        "audio": "ext:宿命挽歌/audio/skill/wanJianJue.mp3",
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event,player){
                    if(event.getParent('xingDong').wanJianJue==false) return false;// 不能与醉仙望月步在同一回合发动
                    if(player.countZhiShiWu('jianY')<4) return false;// 剑小于4不能发动
                    if(event.yingZhan==true) return false;
                    return game.countPlayer(function(current){
                        return player.canUse('anMie',current);
                    }) >= 2;
                },
                        "check": function(event, player) {
                    return game.countPlayer(function(target) {
                        return target.side != player.side &&
                            player.canUse('anMie', target);
                    }) >= 2;
                },
                        "_priority": 1,
                        "content": function(){
                    'step 0'
                    trigger.getParent('xingDong').zuiXianWangYueBu=false// 标记醉仙望月步不能发动
                    player.removeZhiShiWu('jianY',4);// 移除剑
                    player.chooseTarget(2,true, function(card, player, target){
                        return player.canUse('anMie', target); // 只能选择可使用暗灭的目标
                    }).set('ai', function(target) {
                        return get.damageEffect2(
                            target,
                            _status.event.player,
                            1
                        );
                    });
                'step 1'
                    for(var i=0;i<result.targets.length;i++){
                        player.useCard({name: 'anMie', xiBie: 'an'}, result.targets[i]).set('wanJianJue',true);// 向两个目标发射暗灭
                    }
                },
                        "group": [
                            "wanJianJue_1",
                        ],
                        "subSkill": {
                            "1": {
                                "trigger": {
                                    "player": "gongJiSheZhi",
                                },
                                "direct": true,
                                "filter": function(event,player){
                            return event.wanJianJue==true;
                        },
                                "content": function(){
                            trigger.changeDamageNum(-1);
                        },
                            },
                        },
                    },
                    "xianFengYunTiShu": {
                        "audio": "ext:宿命挽歌/audio/skill/xianFengYunTiShu.mp3",
                        "trigger": {
                            "global": "shouDaoGongJiBefore",
                        },
                        "filter": function(event,player){
                    if(event.target != player) return false; // 只能保护自己
                    if(event.canYingZhan == false) return false; // 必须能迎战
                    return true;
                },
                        "check": function(event, player) {
                    return player.countCards('h') < player.getHandcardLimit();
                },
                        "content": async function (event, trigger, player) {
                    let cards =  await get.cards();
                    player.showHiddenCards(cards);//牌库翻一张
                    player.gain(cards[0]);// 获得该牌
                },
                    },
                    "zuiXianWangYueBu": {
                        "audio": "ext:宿命挽歌/audio/skill/zuiXianWangYueBu.mp3",
                        "trigger": {
                            "source": "gongJiAfter",
                        },
                        "usable": 2,
                        "filter": function(event,player){
                    if(event.getParent('xingDong').zuiXianWangYueBu==false) return false;// 不能与万剑诀在同一回合发动
                    if(!player.hasZhiShiWu('jianY')) return false;// 剑气小于1不能发动
                    if(event.yingZhan==true) return false;
					return true;
                },
                        "check": function(event, player) {
                    return player.countCards('h') + 1 <=
                        player.getHandcardLimit();
                },
                        "content": async function (event, trigger, player) {
                    trigger.getParent('xingDong').wanJianJue=false;;// 标记醉仙望月步不能发动
                    await player.removeZhiShiWu('jianY');// 移除剑
                    var linkedPlayers=
                        lib.skill.suMingWanGeLianDong.getCharacters(
                            ['zhaoLingEr','linYueRu']
                        ).filter(function(current){
                            return current.countCards('h')>0;
                        }).sortBySeat(player);
                    for(var linkedPlayer of linkedPlayers){
                        var discarded=(await linkedPlayer
                            .chooseToDiscard(
                                'h',
                                '【柔情侠骨】：是否弃置1张手牌，代替'+
                                get.translation(player)+'进行【醉仙望月步】判定？'
                            ).set('showCards',true)
                            .set('ai',function(card){
                                var owner=_status.event.player;
                                var beneficiary=_status.event.beneficiary;
                                if(get.attitude(owner,beneficiary)<=0) return 0;
                                if(beneficiary.countCards('h') + 1 >
                                    beneficiary.getHandcardLimit()) return 0;
                                if(get.type(card)=='gongJi'){
                                    return 8-get.value(card);
                                }
                                return 4-get.value(card);
                            }).set('beneficiary',player).forResultCards() || []);
                        if(discarded&&discarded.length){
                            player.logSkill(
                                'liXiaoYaoRouQingXiaGu',linkedPlayer
                            );
                            await player.gain(discarded,'gain2');
                            if(get.type(discarded[0])=='gongJi'){
                                await player.addGongJi();
                            }
                            return;
                        }
                    }
					let cards =  await get.cards();
                    await player.showHiddenCards(cards);// 翻一张
                    var list=['是','否'];
                        var control =  await player.chooseControl(list).set('prompt','是否获得该牌')
                        .set('ai', function() {
                            var player = _status.event.player;
                            return player.countCards('h') + 1 <=
                                player.getHandcardLimit() ? '是' : '否';
                        }).forResultControl();
                    if (control =='是') {
                        await player.gain(cards);// 获得
                        if (get.type(cards[0]) == 'gongJi') {
                            await player.addGongJi();// 增加攻击行动
                        }
                    }else{
                        await game.cardsDiscard(cards);
                    }
                },
                    },
                    "xiaoYaoShenJian": {
                        "audio": "ext:宿命挽歌/audio/skill/xiaoYaoShenJian.mp3",
                        "type": "qiDong",
                        "trigger": {
                            "player": "qiDong",
                        },
                        "filter": function(event,player){
                    return player.canBiShaShuiJing();
                },
                        "check": function(event, player) {
                    if(player.countCards('h') + 2 >
                        player.getHandcardLimit()) return false;
                    if(lib.skill._heCheng &&
                        lib.skill._heCheng.filter(event, player) &&
                        (get.shiQi(!player.side) <= 1 ||
                            get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                        return false;
                    }
                    return true;
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('jianY',2);
                    'step 2'
                    player.draw(2);
                },
                    },
                    "jiuShenZhou": {
                        "audio": "ext:宿命挽歌/audio/skill/jiuShenZhou.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    return player.canBiShaShuiJing();
                },
                        "filterTarget": function(card,player,target){
                    return target!=player;
                },
                        "content": async function(event,trigger,player){
                    var skillTarget=event.target;
                    if(!skillTarget || !skillTarget.isIn()) return;
                    var baoShi=player.countNengLiang('baoShi');
                    var shuiJing=player.countNengLiang('shuiJing');
                    var num=baoShi+shuiJing+2;
                    if(baoShi>0) await player.removeNengLiang('baoShi',baoShi);
                    if(shuiJing>0) await player.removeNengLiang('shuiJing',shuiJing);
                    await skillTarget.faShuDamage(num,player)
                        .set('jiuShenZhou',true);
                    await player.faShuDamage(num,player)
                        .set('jiuShenZhou',true);
                    player.storage.jiuShenZhou_active=true;
                    player.syncStorage('jiuShenZhou_active');
                    await player.hengZhi();
                },
                        "ai": {
                            "shuiJing": true,
                            "order": function(item, player) {
                    var num = player.countNengLiangAll() + 2;
                    var best = 0;
                    game.countPlayer(function(target) {
                        if(target != player && target.side != player.side) {
                            best = Math.max(best, get.damageEffect2(
                                target, player, num
                            ));
                        }
                    });
                    return best + get.damageEffect2(player, player, num) > 0 ?
                        4.2 : 0;
                },
                            "result": {
                                "player": function(player) {
                    var num = player.countNengLiangAll() + 2;
                    return get.damageEffect2(player, player, num) - 1;
                },
                                "target": function(player, target) {
                    return get.damageEffect(
                        target, player.countNengLiangAll() + 2
                    );
                },
                            },
                        },
                        "group": [
                            "jiuShenZhou_chongZhi",
                        ],
                        "subSkill": {
                            "chongZhi": {
                                "trigger": {
                                    "player": "phaseBegin",
                                },
                                "direct": true,
                                "firstDo": true,
                                "filter": function(event,player){
                            return player.storage.jiuShenZhou_active==true;
                        },
                                "content": async function(event,trigger,player){
                            player.storage.jiuShenZhou_active=false;
                            player.syncStorage('jiuShenZhou_active');
                            await player.chongZhi();
                        },
                            },
                        },
                        "mod": {
                            "maxHandcardFinal": function(player,num){
                        if(player.storage.jiuShenZhou_active) return 4;
                    },
                        },
                    },
                    "jianY": {
                        "intro": {
                            "name": "剑",
                            "content": "mark",
                            "max": 5,
                        },
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_jianY.webp",
                        "_priority": 0,
                    },
                    "linJiaQianJin": {
                        "group": ["linJiaQianJin_kaiJu"],
                        "subSkill": {
                            "kaiJu": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "popup": false,
                                "firstDo": true,
                                "priority": 90,
                                "content": function(event, trigger, player) {
                                    var audioPath =
                                        'ext:宿命挽歌/audio/skill/linJiaQianJin.mp3';
                                    game.broadcastAll(function(path, speaker) {
                                        if(!lib.config.background_audio) return;
                                        game.playAudio({
                                            path: path,
                                            spatialPlayer: speaker,
                                            addVideo: false,
                                            onError: function() {},
                                        });
                                    }, audioPath, player);
                                },
                            },
                        },
                        "mod": {
                            "maxNengLiang": function(player, num) {
                        return num + 2;
                    },
                        },
                        "init": function(player) {
                    player.addNengLiang('shuiJing', 2);
                },
                        "trigger": {
                            "player": "teShuEnd",
                        },
                        "forced": true,
                        "content": async function(event,trigger,player) {
                    var zhaoLingEr=
                        lib.skill.suMingWanGeLianDong
                            .getCharacters(['zhaoLingEr'])
                            .filter(function(current){
                                return current.countNengLiangAll()<2;
                            }).sortBySeat(player)[0];
                    if(zhaoLingEr){
                        player.logSkill(
                            'linYueRuRouQingXiaGu',zhaoLingEr
                        );
                        var audioPath =
                            'ext:宿命挽歌/audio/skill/' +
                            'linJiaQianJinZhaoLingEr.mp3';
                        game.broadcastAll(function(path, speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: path,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, audioPath, player);
                        await zhaoLingEr.addNengLiang('shuiJing',1);
                    }
                    else{
                        await player.addNengLiang('shuiJing',1);
                    }
                },
                    },
                    "ningShenGuiYuan": {
                        "audio": "ext:宿命挽歌/audio/skill/ningShenGuiYuan.mp3",
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "filter": function(event, player) {
                    return event.player.side === player.side && event.player !== player && event.yingZhan!=true;
                },
                        "content": async function(event,trigger,player){
                    var oldQiJing = player.countZhiShiWu('qiJing');
                    await player.addZhiShiWu('qiJing');
                    if (player.countZhiShiWu('qiJing') === oldQiJing) {
                        player.changeZhiLiao(1);
                    }
                },
                    },
                    "qiJianZhi": {
                        "audio": "ext:宿命挽歌/audio/skill/qiJianZhi.mp3",
                        "trigger": {
                            "player": "gongJiEnd",
                        },
                        "filter": function(event, player) {
                    return !event.yingZhan && player.countZhiShiWu('qiJing') >= 1;
                },
                        "check": function(event,player){
                    if(!player.canFaShu()) return false;
                    var dragonOrder=lib.skill.zhanLongJue.ai.order(
                        null,player
                    );
                    if(dragonOrder>0) return true;
                    var throwOrder=lib.skill.qianKunYiZhi.ai.order(
                        null,player
                    );
                    if(throwOrder>0) return true;
                    return player.countCards('h',function(card){
                        return get.type(card,player)=='faShu';
                    })>0;
                },
                        "content": function() {
                    player.removeZhiShiWu('qiJing', 1);
                    player.addFaShu();
                },
                    },
                    "yiYangZhi": {
                        "audio": "ext:宿命挽歌/audio/skill/yiYangZhi.mp3",
                        "getGaiPaiTag": function(card) {
                    var tags = Array.from(card.gaintag || []);
                    for (var tag of tags) {
                        var info = get.info(tag);
                        if (info && info.intro && info.intro.markcount == 'gaiPai') {
                            return tag;
                        }
                    }
                    return null;
                },
                        "getGaiPaiEntries": function(target) {
                    var entries = [];
                    var cards = target.getCards('x');
                    for (var card of cards) {
                        var tag = lib.skill.yiYangZhi.getGaiPaiTag(card);
                        if (tag) entries.push({
                            card: card,
                            tag: tag
                        });
                    }
                    return entries;
                },
                        "removeOneGaiPai": async function(target) {
                    var entries = lib.skill.yiYangZhi.getGaiPaiEntries(target);
                    if (!entries.length) return false;
                    var cards = entries.map(function(entry) {
                        return entry.card;
                    });
                    var selected = (await target.chooseCardButton(
                        cards,
                        true,
                        "移除一个盖牌"
                    ).forResultLinks() || []);
                    var card = selected[0] || cards[0];
                    var entry = entries.find(function(current) {
                        return current.card == card;
                    });
                    if (!entry) return false;
                    await target.discard(entry.card, entry.tag);
                    return true;
                },
                        "trigger": {
                            "player": "gongJiBefore",
                        },
                        "filter": function(event, player) {
                    if(player.countZhiShiWu('qiJing') < 1) return false;
                    return event.yingZhan!=true;
                },
                        "check": function(event, player) {
                    var target = event.target;
                    if(!target || target.side == player.side) return false;
                    return true;
                },
                        "content": async function(event,trigger,player) {
					await player.removeZhiShiWu('qiJing',1);
					trigger.customArgs.yiYangZhi=true;
                    if(player.countNengLiang('shuiJing') > 0) {
                        await player.removeNengLiang('shuiJing');
                        await player.addNengLiang('baoShi',1);
                    }
                },
                        "group": [
                            "yiYangZhi_MingZhong",
                            "yiYangZhi_weiMingZhong",
                        ],
                        "subSkill": {
                            "MingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "forced": true,
                                "filter": function(event,player){
                            return event.customArgs.yiYangZhi;
                        },
                                "content": async function(event,trigger,player){
                            var removed = await lib.skill.yiYangZhi.removeOneGaiPai(trigger.target);
                            if (!removed) {
                                trigger.changeDamageNum(1);
                            }
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "filter": function(event,player){
                            return event.customArgs.yiYangZhi;
                        },
                                "forced": true,
                                "content": async function(event,trigger,player) {
                            if(player.countNengLiang('shuiJing')>0){
                                await player.removeNengLiang('shuiJing');
                                await player.addNengLiang('baoShi',1);
                            }
                        },
                            },
                        },
                    },
                    "qiJueJianQi": {
                        "audio": "ext:宿命挽歌/audio/skill/qiJueJianQi.mp3",
                        "group": [
                            "qiJueJianQi_mingZhong",
                            "qiJueJianQi_weiMingZhong",
                        ],
                        "subSkill": {
                            "mingZhong": {
                                "trigger": {
                                    "source": "gongJiMingZhong",
                                },
                                "filter": function(event,player){
                            if(player.countZhiShiWu('qiJing') < 2) return false;
                            return event.customArgs.yiYangZhi;
                        },
                                "content": async function(event,trigger,player) {
                            player.removeZhiShiWu('qiJing',2);
                            var removed = await lib.skill.yiYangZhi.removeOneGaiPai(trigger.target);
                            if (!removed) {
                                trigger.changeDamageNum(1);
                            }
                        },
                            },
                            "weiMingZhong": {
                                "trigger": {
                                    "source": "gongJiWeiMingZhong",
                                },
                                "filter": function(event,player){
                            if(player.countZhiShiWu('qiJing') < 2) return false;
                            return event.customArgs.yiYangZhi;
                        },
                                "content": async function(event,trigger,player) {
                            await player.removeZhiShiWu('qiJing',2);
                            var num=get.zhanJi(player.side).filter(function(stone) {
                                return stone === 'shuiJing';
                            }).length;
                            if(num>0){
                                await player.removeZhanJi('shuiJing',num);
                                await player.addZhanJi('baoShi',num);
                            }
                        },
                            },
                        },
                    },
                    "zhenYuanHuTi": {
                        "audio": "ext:宿命挽歌/audio/skill/zhenYuanHuTi.mp3",
                        "trigger": {
                            "global": "zaoChengShangHai",
                        },
                        "filter": function(event, player) {
                    if(!event.faShu||event.num<=0||
                        player.countZhiShiWu('qiJing')<1||
                        !event.player) return false;
                    if(event.player==player) return true;
                    return lib.skill.suMingWanGeLianDong
                        .isCharacter(event.player,'liXiaoYao')||
                        lib.skill.suMingWanGeLianDong
                        .isCharacter(event.player,'zhaoLingEr');
                },
                        "check": function(event,player){
                    return event.player==player||
                        get.attitude(player,event.player)>0;
                },
                        "logTarget": "player",
                        "content": async function(event,trigger,player) {
                    if(trigger.player!=player){
                        player.logSkill(
                            'linYueRuRouQingXiaGu',trigger.player
                        );
                    }
                    await player.removeZhiShiWu('qiJing',1);
                    if(typeof trigger.changeDamageNum=='function'){
                        trigger.changeDamageNum(-1);
                    }
                    else{
                        trigger.num--;
                    }
                },
                    },
                    "zhanLongJue": {
                        "audio": "ext:宿命挽歌/audio/skill/zhanLongJue.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.countZhiShiWu('qiJing') >= 2;
                },
                        "selectTarget": -1,
                        "filterTarget": function(card,player,target){
                    return target!=player;
                },
                        "content": function() {
                    var damage = Math.ceil(player.countZhiShiWu('qiJing') / 3);
                    target.faShuDamage(damage,player);
                },
                        "contentAfter": function(){
                    player.removeZhiShiWu('qiJing', player.countZhiShiWu('qiJing'));
                },
                        "ai": {
                            "order": function(item, player) {
                    var damage = Math.ceil(
                        player.countZhiShiWu('qiJing') / 3
                    );
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target != player) {
                            score += get.damageEffect2(target, player, damage);
                        }
                    });
                    return score > 0 ? 4 : 0;
                },
                            "result": {
                                "player": function(player) {
                    var damage = Math.ceil(
                        player.countZhiShiWu('qiJing') / 3
                    );
                    var score = 0;
                    game.countPlayer(function(target) {
                        if(target != player) {
                            score += get.damageEffect2(target, player, damage);
                        }
                    });
                    return score;
                },
                            },
                        },
                    },
                    "tongQianBiao": {
                        "audio": "ext:宿命挽歌/audio/skill/tongQianBiao.mp3",
                        "trigger": {
                            "player": "gongJiShi",
                        },
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi();
                },
                        "check": function(event, player) {
                    var target = event && event.target;
                    if(!target || target.side == player.side) return false;
                    var actual = Math.max(0, 1 - (target.zhiLiao || 0));
                    var overflow = Math.max(0,
                        target.countCards('h') + actual -
                        target.getHandcardLimit());
                    if(overflow > 0) return true;
                    return player.countZhiShiWu('qiJing') <= 1 &&
                        player.countNengLiang('baoShi') >= 2;
                },
                        "content": function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.storage.tongQianBiao=false;
                    'step 1'
                    player.chooseTarget('对目标造成1点法术伤害③',true,function(card,player,target){
                        return true
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        return get.damageEffect2(target,player,1);
                    });
                    'step 2'
                    result.targets[0].faShuDamage(1,player).set('tongQianBiao',true);
                    'step 3'
                    player.addZhiShiWu('qiJing');
                    'step 4'
                    if(player.storage.tongQianBiao){
                        player.addZhiShiWu('qiJing');
                    }
                },
                        "group": "tongQianBiao_shiQiXiaJiang",
                        "subSkill": {
                            "shiQiXiaJiang": {
                                "trigger": {
                                    "global": "changeShiQiAfter",
                                },
                                "lastDo": true,
                                "direct": true,
                                "filter": function(event,player){
                            return event.getParent('damage').tongQianBiao==true&&event.num<0;
                        },
                                "content": function(){
                            player.storage.tongQianBiao=true;
                        },
                            },
                        },
                    },
                    "qianKunYiZhi": {
                        "audio": "ext:宿命挽歌/audio/skill/qianKunYiZhi.mp3",
                        "audioname2": {
                            "aNu": "ext:宿命挽歌/audio/skill/aNuQianKunYiZhi.mp3",
                        },
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi();
                },
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side != player.side;
                },
                        "getBaseDamage": function(player, costPaid) {
                    var baoShi = Math.max(0,
                        player.countNengLiang('baoShi') -
                        (costPaid ? 0 : 1));
                    var shuiJing = player.countNengLiang('shuiJing');
                    return Math.ceil(baoShi / 2) +
                        Math.ceil(shuiJing / 4) + 1;
                },
                        "getOverflow": function(target, damage) {
                    var actual = Math.max(0,
                        damage - (target.zhiLiao || 0));
                    return Math.max(0,
                        target.countCards('h') + actual -
                        target.getHandcardLimit());
                },
                        "getCupCount": function(player) {
                    return player.side == true ?
                        (game.hongXingBei || 0) :
                        (game.lanXingBei || 0);
                },
                        "getAiPlan": function(player, target, costPaid) {
                    if(!target || target.side == player.side) return null;
                    var skill = lib.skill.qianKunYiZhi;
                    var base = skill.getBaseDamage(player, costPaid) +
                        (player.storage.qianKunYiZhi_num || 0) +
                        (player.storage.qianKunYiZhi_num_1 || 0);
                    var stones = get.zhanJi(player.side).length;
                    var stoneBonus = Math.floor(stones / 2);
                    var cups = skill.getCupCount(player);
                    var enemyMorale = get.shiQi(target.side);
                    var energyCost = Math.max(0,
                        player.countNengLiangAll() - (costPaid ? 0 : 1));
                    var candidates = [
                        {damage: base, useStones: false, useCups: false,
                            resourceCost: energyCost * 3},
                    ];
                    if(stones > 0 || cups > 0) candidates.push({
                        damage: base + stoneBonus + cups,
                        useStones: stones > 0,
                        useCups: cups > 0,
                        useExtra: true,
                        resourceCost: energyCost * 3 +
                            stones * 3 + cups * 15,
                    });
                    var best = null;
                    for(var plan of candidates) {
                        plan.overflow = skill.getOverflow(target, plan.damage);
                        if(plan.overflow <= 0) continue;
                        plan.lethal = plan.overflow >= enemyMorale;
                        // 星杯是胜利资源，只允许为本次直接终结对方士气而投入。
                        if(plan.useCups && !plan.lethal) continue;
                        plan.score = plan.overflow * 24 +
                            plan.damage * 1.5 - plan.resourceCost;
                        if(plan.lethal) plan.score += 200;
                        if(!best || plan.score > best.score) best = plan;
                    }
                    return best;
                },
                        "contentBefore": async function(event, trigger, player){
                    await player.removeBiShaBaoShi();
                    player.storage.qianKunYiZhi_num = 0;
                    player.storage.qianKunYiZhi_num_1 = 0;
                    var numXingBei = 0;
                    var zhanJi=get.zhanJi(player.side);
                    var side=player.side;
                        if(side==true){
                            numXingBei = game.hongXingBei || 0;
                        }else if(side==false){
                            numXingBei = game.lanXingBei || 0;
                        }
                    if(zhanJi.length>0 || numXingBei>0){
                        var list=['是','否'];
                        var control=await player.chooseControl(list).set('prompt','是否额外同时移除【战绩区】全部星石与全部星杯')
                        .set('qianKunTarget',(event.targets && event.targets[0]) || event.target)
                        .set('ai', function(){
                            var plan=lib.skill.qianKunYiZhi.getAiPlan(
                                _status.event.player,
                                _status.event.qianKunTarget,
                                true
                            );
                            return plan && plan.useExtra ? '是' : '否';
                        }).forResult('control');
                        if (control =='是') {
                            var xlist = get.zhanJi(player.side).slice();
                            for (var i of xlist){
                                await player.removeZhanJi(i,1);
                            }
                            var num=xlist.length;
                            player.storage.qianKunYiZhi_num = Math.floor(num/2);
                            player.storage.qianKunYiZhi_num_1 = numXingBei;
                        }
                    }
                },
                        "content": function() {
                    var baoShi = player.countNengLiang('baoShi');
                    var shuiJing = player.countNengLiang('shuiJing');
                    var damage = Math.ceil(baoShi / 2) + Math.ceil(shuiJing / 4) + 1 + player.storage.qianKunYiZhi_num + player.storage.qianKunYiZhi_num_1;
                    target.faShuDamage(damage, player);
                    if(player.countNengLiang('baoShi')>0) player.removeNengLiang('baoShi',player.countNengLiang('baoShi'));
                    if(player.countNengLiang('shuiJing')>0) player.removeNengLiang('shuiJing',player.countNengLiang('shuiJing'));
                    player.changeXingBei(-player.storage.qianKunYiZhi_num_1);
                },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                    var best = null;
                    game.countPlayer(function(target) {
                        if(target.side != player.side) {
                            var plan=lib.skill.qianKunYiZhi
                                .getAiPlan(player,target);
                            if(plan && (!best || plan.score>best.score)) {
                                best=plan;
                            }
                        }
                    });
                    if(!best || best.score<=0) return 0;
                    return best.lethal ? 20 : 5;
                },
                            "result": {
                                "target": function(player, target) {
                    var plan=lib.skill.qianKunYiZhi
                        .getAiPlan(player,target);
                    if(!plan || plan.score<=0) return 0;
                    return -100 - plan.overflow * 10 -
                        (plan.lethal ? 1000 : 0);
                },
                            },
                        },
                    },
                    "qiJing": {
                        "intro": {
                            "name": "气劲",
                            "content": "mark",
                            "max": 7,
                        },
                        "onremove": "storage",
                        "markimage": "extension/宿命挽歌/mark_qiJing.webp",
                    },
                    "miaoJiangShengNv": {
                        "audio": "ext:宿命挽歌/audio/skill/miaoJiangShengNv.mp3",
                        "logAudio": function(event) {
                            if(event && event.skill ==
                                'miaoJiangShengNv_lianGuShu') {
                                return false;
                            }
                            var current = event;
                            while(current) {
                                var name = current.triggername || current.name;
                                if(name == 'miaoJiangShengNv_lianGuShu') {
                                    return false;
                                }
                                if(name == 'teShu' || name == 'teShuEnd' ||
                                    name == 'gouMai' || name == 'heCheng' ||
                                    name == 'tiLian') {
                                    return false;
                                }
                                if(typeof current.getParent != 'function') break;
                                var parent = current.getParent();
                                if(!parent || parent == current) break;
                                current = parent;
                            }
                            return 'ext:宿命挽歌/audio/skill/' +
                                'miaoJiangShengNv.mp3';
                        },
                        "subSkill": {
                            "huoQou": {
                                "sub": true,
                                "sourceSkill": "miaoJiangShengNv",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "huoQou",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasDuYou('huoQou');
                    }else{
                        return get.xiBie(card)=='huo'
                    }
                },
                                "filterOk": function(){
                    if(ui.selected.cards[0].hasDuYou('huoQou')){
                        return true;
                    }else{
                        return false;
                    }
                },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);
                            }
                        },
                                "position": "h",
                                "filterTarget": true,
                                "filter": function(event,player){
                        return player.hasCard(function(card){
                            return lib.skill.huoQou.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            player.storage.huoQou_num = 2
                            await event.trigger("miaoJiangShengNv_huoQouStart");
                            event.num = player.storage.huoQou_num;
                            if(event.cards.length==2){
                            event.num++;
                            }
                            await event.target.faShuDamage(event.num,player,event.cards[0]);
                            if(event.yanShaZhou){
                                event.target.storage.baoZhaGu_source=player;
                                event.target.addSkill("baoZhaGu_xiaoGuo");
                                event.target.markSkill("baoZhaGu_xiaoGuo");
                                game.log(event.target,'获得了【爆炸蛊】状态');
                            }
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.5,
                                    "result": {
                                        "target": function(player,target){
                                    var num = 2 + (lib.skill.aNuStrategy.canBoost(player,'huo') ? 1 : 0);
                                    var value = get.damageEffect(target,num);
                                    if(target.hasSkill && target.hasSkill('baoZhaGu_xiaoGuo')) value -= 2;
                                    return value;
                                },
                                    },
                                },
                            },
                            "leiJi": {
                                "sub": true,
                                "sourceSkill": "miaoJiangShengNv",
                                "type": "faShu",
                                "enable": "faShu",
                                "duYou": "leiJi",
                                "selectCard": [
                                    1,
                                    2,
                                ],
                                "filterCard": function(card){
                            if(ui.selected.cards.length==0){
                                return card.hasDuYou('leiJi');
                            }else{
                                return get.xiBie(card)=='lei'
                            }
                        },
                                "filterOk": function(){
                            return ui.selected.cards[0].hasDuYou('leiJi')
                        },
                                "complexCard": true,
                                "discard": false,
                                "prepare": function(cards,player,targets){
                            if(cards.length==1){
                                player.useCard(cards);
                            }else{
                                player.useCard(cards[0]);
                                player.discard(cards[1]).set('showCards',true);;
                            }
                        },
                                "position": "h",
                                "filterTarget": true,
                                "filter": function(event,player){
                            return player.hasCard(function(card){
                                return lib.skill.leiJi.filterCard(card);
                            });
                        },
                                "content": async function (event, trigger, player) {
                            await event.trigger("miaoJiangShengNv_leiJiStart");
                            'step 0'
                            event.num=1;
                            if(event.cards.length==2){
                                event.num++;
                            }
                            'step 1'
                            event.target.faShuDamage(event.num,player);
                            'step 2'
                            if(player.storage.leiJi_num!=1){
                                player.changeZhanJi('baoShi',1);
                            }
                        },
                                "check": function(card){
                            return 6-get.value(card);
                        },
                                "ai": {
                                    "order": 3.4,
                                    "result": {
                                        "target": function(player,target){
                                    var num = 1 + (lib.skill.aNuStrategy.canBoost(player,'lei') ? 1 : 0);
                                    return get.damageEffect(target,num);
                                },
                                    },
                                },
                            },
                            "lianGuShu": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "content": async function(event,trigger,player){
                        var audioPath =
                            'ext:宿命挽歌/audio/skill/' +
                            'miaoJiangShengNvLianGu.mp3';
                        game.broadcastAll(function(path, speaker) {
                            if(!lib.config.background_audio) return;
                            game.playAudio({
                                path: path,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function() {},
                            });
                        }, audioPath, player);
                        await player.addGaiPai(get.cards(1),'gu');
                        var zhanJi=get.zhanJi(player.side);
                        if(!zhanJi.length) return;

                        var list=[];
                        for(var i=0;i<zhanJi.length;i++){
                            list.push([zhanJi[i],get.translation(zhanJi[i])]);
                        }
                        var desired=lib.skill.aNuStrategy.lianGuStars(player,zhanJi.length);
                        var result=await player.chooseButton([
                            '苗疆圣女：可移除任意颗我方【战绩区】星石，额外获得等量的【蛊】',
                            [list,'tdnodes'],
                        ]).set('selectButton',[1,zhanJi.length])
                        .set('desired',desired).set('ai',function(button){
                            if(ui.selected.buttons.length>=_status.event.desired){
                                return 0;
                            }
                            return 6;
                        }).forResult();
                        if(!result.bool||!result.links||!result.links.length){
                            return;
                        }
                        for(var j=0;j<result.links.length;j++){
                            await player.removeZhanJi(result.links[j],1);
                        }
                        await player.addGaiPai(
                            get.cards(result.links.length),'gu'
                        );
                        },
                            },
                        },
                        "group": [
                            "miaoJiangShengNv_huoQou",
                            "miaoJiangShengNv_leiJi",
                            "miaoJiangShengNv_lianGuShu",
                        ],
                        "trigger": {
                            "player": [
                                "logSkillBegin",
                            ],
                        },
                        "forced": true,
                        "filter": function(event,player){
                    return event.skill&&event.skill.startsWith('miaoJiangShengNv_');
                },
                        "content": async function(event,trigger,player){
                },
                        "_priority": 0,
                    },
                    "haiTangFuRen": {
                        "audio": "ext:宿命挽歌/audio/skill/haiTangFuRen.mp3",
                        "trigger": {
                            "global": "gongJiMingZhong",
                        },
                        "forced": true,
                        "getAttackCards": function(event) {
                    var cards=[];
                    if(event&&Array.isArray(event.cards)){
                        cards=event.cards.slice();
                    }
                    else if(event&&event.card&&
                        Array.isArray(event.card.cards)){
                        cards=event.card.cards.slice();
                    }
                    return cards.filter(function(card){
                        return card&&get.position(card,true)=='o';
                    });
                },
                        "filter": function(event,player){
                    return !!event.player&&
                        lib.skill.suMingWanGeLianDong
                            .isCharacter(event.player,'liXiaoYao')&&
                        lib.skill.haiTangFuRen.getAttackCards(event).length>0;
                },
                        "content": async function(event,trigger,player){
                    var cards=lib.skill.haiTangFuRen
                        .getAttackCards(trigger);
                    if(!cards.length) return;
                    await player.addGaiPai(cards,'gu');
                },
                    },
                    "yanShaZhou": {
                        "audio": "ext:宿命挽歌/audio/skill/yanShaZhou.mp3",
                        "trigger": {
                            "player": "miaoJiangShengNv_huoQouStart",
                        },
                        "content": function() {
                    player.storage.huoQou_num--;
                    trigger.yanShaZhou=true;
                },
                        "check": function(event, player) {
                    var target = event.target;
                    return !!target && target.side != player.side &&
                        !target.hasSkill('baoZhaGu_xiaoGuo') &&
                        lib.skill.aNuStrategy.yanShaZhouValue(player,target) > 0;
                },
                    },
                    "tianLeiPo": {
                        "audio": "ext:宿命挽歌/audio/skill/tianLeiPo.mp3",
                        "trigger": {
                            "player": "miaoJiangShengNv_leiJiStart",
                        },
                        "content": function() {
                    player.storage.leiJi_num = 1;
                    var cards=get.cards(2);
                    player.addGaiPai(cards,'gu');
                },
                        "check": function(event, player) {
                    return lib.skill.aNuStrategy.tianLeiPoWantsGu(player);
                },
                    },
                    "yuFengShu": {
                        "subSkill": {
                            "du": {
                                "trigger": {
                                    "player": "daChuPai",
                                },
                                "filter": function(event,player){
                            if (event.card.name != 'zhongDu') return false;
                            if (!event.target) return false;
                            return event.target.hasJiChuXiaoGuo('_zhongDu');
                                },
                                "content": function(){
                            var audioPath =
                                'ext:宿命挽歌/audio/skill/yuFengShu.mp3';
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, audioPath, player);
                            trigger.target.faShuDamage(1,player);
                        },
                            },
                        },
                        "group": [
                            "yuFengShu_du",
                        ],
                        "trigger": {
                            "player": "gongJiShi",
                        },
                        "filter": function(event,player){
                    return event.target.hasJiChuXiaoGuo('_zhongDu');
                        },
                        "content": function(){
					'step 0'
                    var audioPath =
                        'ext:宿命挽歌/audio/skill/yuFengShu.mp3';
                    game.broadcastAll(function(path, speaker) {
                        if(!lib.config.background_audio) return;
                        game.playAudio({
                            path: path,
                            spatialPlayer: speaker,
                            addVideo: false,
                            onError: function() {},
                        });
                    }, audioPath, player);
                    trigger.changeDamageNum(1);
                    if(player.countCards('h')>0){
                        player.chooseCard('h',1,true).set('prompt','将自己1张手牌作为蛊').set('ai',function(card){
                            if(card.hasDuYou && (card.hasDuYou('huoQou')||card.hasDuYou('leiJi'))) return -1;
                            var xiBie=get.xiBie(card);
                            var type=get.type(card);
                            if(xiBie=='guang'||xiBie=='huo'||type=='faShu') return 1;
                            return 0;
                        })
                    };
					'step 1'
                    player.addGaiPai('gu',result.cards);
                },
                        "ai": {
                            "effect": {
                                "player": function(card, player, target) {
                                    if(!card || get.type(card, player) !== 'gongJi') return;
                                    if(!target || target.side === player.side) return;
                                    if(!(target.hasJiChuXiaoGuo && target.hasJiChuXiaoGuo('_zhongDu'))) return;
                                    // 御蜂术联动：攻击中毒目标伤害+1并回1蛊，放大目标受损估值
                                    return [1, 0, 1.6, -0.4];
                                },
                            },
                        },
                    },
                    "jinCanWang": {
                        "audio": "ext:宿命挽歌/audio/skill/jinCanWang.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    var cards=player.getGaiPai('gu');
                    var xiBieSet = new Set();
                    var result = [];
                    for(var i=0;i<cards.length;i++)
                    {
                        var currentXiBie = get.xiBie(cards[i]);
                        if (!xiBieSet.has(currentXiBie)) {
                            xiBieSet.add(currentXiBie);
                            result.push(cards[i]);
                            // 如果已经找到5个不同系别，就提前结束
                            if (result.length >= 5) {
                                return true;
                            }
                        }
                    }
                },
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side == player.side;
                },
                        "contentBefore": async function(event,trigger,player){
                    var cards=player.getGaiPai('gu');
                    game.log(cards);
                    var result = await player.chooseCardButton(cards,5,'是否发动【金蟾王】')
                        .set('filterButton',function(button){
                        if(ui.selected.buttons.length==0) return true;
                        var xiBie1=get.xiBie(button.link);
                        for(var i=0;i<ui.selected.buttons.length;i++){
                             var xiBie2=get.xiBie(ui.selected.buttons[i].link);
                             if(xiBie1==xiBie2) return false;
                        }
                        return true;
                        }).forResult();
                    game.log(result.links);
                    player.discard(result.links,'gu').set('showHiddenCards',true);//}
                },
                        "content": function(){
                    'step 0'
                    //player.discard(event.cost_data,'gu').set('showHiddenCards',true);
                    'step 1'
                    target.addNengLiang('baoShi',2);
                    'step 2'
                    player.addNengLiang('baoShi',1)
                },
                        "ai": {
                            "order": 5,
                            "result": {
                                "player": 1,
                                "target": function(player, target) {
                    if(target.side != player.side) return 100;
                    var value = 2;
                    value += Math.max(0, 2 - target.countNengLiang('baoShi')) * 0.8;
                    if(target.countEmptyNengLiang && target.countEmptyNengLiang() <= 0) value -= 3;
                    return value;
                },
                            },
                        },
                    },
                    "baoZhaGu": {
                        "audio": "ext:宿命挽歌/audio/skill/baoZhaGu.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event,player){
                    var cards=player.getGaiPai('gu');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='huo') return true;
                    }
                    return false;
                },
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side != player.side;
                },
                        "contentBefore": async function(event,trigger,player){
                    var cards=player.getGaiPai('gu');
                    var selectedCards = (await player.chooseCardButton(cards,true,1,'爆炸蛊：选择1张火系【蛊】弃置')
                        .set('filterButton',function(button){
                        if(get.xiBie(button.link)!='huo') return false;
                        return true;
                        }).forResultLinks() || []);
                    await player.discard(selectedCards,'gu').set('showHiddenCards',true);
                },
                        "content": function(event,trigger,player){
                    event.target.storage.baoZhaGu_source=player;
                    event.target.addSkill("baoZhaGu_xiaoGuo");
                    event.target.markSkill("baoZhaGu_xiaoGuo");
                    game.log(event.target,'获得了【爆炸蛊】状态');
                },
                        "ai": {
                            "order": 3.8,
                            "result": {
                                "target": function(player, target) {
                    if(target.side == player.side) return 100;
                    var value = get.damageEffect(target,2) - 0.5;
                    value -= lib.skill.aNuStrategy.fireFollowUp(player) * 0.5;
                    return value;
                },
                            },
                        },
                        "subSkill": {
                            "xiaoGuo": {
                                "mark": true,
                                "marktext": "爆",
                                "intro": {
                                    "content": "受到火系攻击或火系法术伤害后，受到2点法术伤害，随后【爆炸蛊】移除",
                                },
                                "onremove": function(player){
                            delete player.storage.baoZhaGu_source;
                        },
                                "trigger": {
                                    "player": "chengShouShangHaiAfter",
                                },
                                "forced": true,
                                "filter": function(event,player){
                            return event.num>0&&event.card&&get.xiBie(event.card)=='huo'&&!event.baoZhaGu;
                        },
                                "content": async function(event,trigger,player){
                            var source=player.storage.baoZhaGu_source;
                            player.removeSkill("baoZhaGu_xiaoGuo");
                            var damageEvent;
                            if(source&&!source.isDead()){
                                damageEvent=player.faShuDamage(2,source,'nocard');
                            }else{
                                damageEvent=player.faShuDamage(2,'nosource','nocard');
                            }
                            await damageEvent.set('baoZhaGu',true);
                            game.log(player,'因【爆炸蛊】受到2点法术伤害');
                            game.log(player,'的【爆炸蛊】已引爆并移除');
                        },
                            },
                        },
                    },
                    "sanShiGu": {
                        "audio": "ext:宿命挽歌/audio/skill/sanShiGu.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "usable": 1,
                        "filter": function(event,player){
                    var cards=player.getGaiPai('gu');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.type(cards[i])=='faShu') return true;
                    }
                    return false;
                },
                        "selectTarget": 1,
                        "filterTarget": function(card, player, target) {
                    var manual = player.isOnline() ||
                        (player.isUnderControl(true) && !_status.auto);
                    return manual || target.side != player.side;
                },
                        "contentBefore": async function(event,trigger,player){
                    var cards=player.getGaiPai('gu');
                    var selectedCards = (await player.chooseCardButton(cards,true,1,'三尸蛊：选择1张法术【蛊】弃置')
                        .set('filterButton',function(button){
                        if(get.type(button.link)!='faShu') return false;
                        return true;
                        }).forResultLinks() || []);
                    await player.discard(selectedCards,'gu').set('showHiddenCards',true);
                },
                        "content": async function(event,trigger,player){
                    await lib.suMingUseTemporaryEffectCard(player,'zhongDu',event.target);
                    player.addGongJiOrFaShu();
                },
                        "ai": {
                            "order": 4.5,
                            "result": {
                                "player": 1,
                                "target": function(player, target) {
                    if(target.side == player.side) return 100;
                    return lib.skill.aNuStrategy.sanShiGuTarget(player,target);
                },
                            },
                        },
                    },
                    "yinGu": {
                        "audio": "ext:宿命挽歌/audio/skill/yinGu.mp3",
                        "trigger": {
                            "global": "changeShiQiBefore",
                        },
                        "filter": function(event,player){
                    if(event.side!=player.side) return false;
                    if(event.num>=0) return false;
                    return player.getGaiPai('gu').some(function(card) {
                        return get.xiBie(card) == 'guang';
                    });
                },
                        "cost": async function cost(event, trigger, player) {
                    var guangGuCards = player.getGaiPai('gu').filter(card => get.xiBie(card) == 'guang');
                    var result = await player.chooseCardButton(
                        guangGuCards,
                        1,
                        "是否发动【隐蛊】，弃置1张光系【蛊】，免疫本次士气下降？"
                    )
                    .set('ai', function(button) {
                        var player = _status.event.player;
                        var trigger = _status.event.getTrigger();
                        var loss = Math.max(1, -(trigger.num || -1));
                        var morale = get.shiQi(player.side);
                        if(loss >= morale) return 20;
                        var remaining = player.getGaiPai('gu').length - 1;
                        if(loss >= 2 || morale <= loss + 2) {
                            return loss * 2 + (remaining >= 2 ? 1 : 0);
                        }
                        return remaining >= 3 ? 0.5 : -1;
                        }).forResult();
                    event.result = {
                        bool: result.bool,
                        cost_data: result.links,
                    };
                },
                        "logTarget": "player",
                        "content": async function(event,trigger,player) {
                    await player.discard(event.cost_data, 'gu').set('showHiddenCards', true);
                    trigger.cancel();
                    game.log(player, '发动【隐蛊】，免疫了本次士气下降');
                },
                    },
                    "wanGuShiTian": {
                        "audio": "ext:宿命挽歌/audio/skill/wanGuShiTian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                    return player.canBiShaBaoShi() && player.getGaiPai('gu').length > 0;
                },
                        "content": async function(event,trigger,player) {
                    await player.removeBiShaBaoShi();
                    var guCards=player.getGaiPai('gu').slice();
                    await player.discard(guCards,'gu').set('showHiddenCards',true);
                    var playerCount=game.filterPlayer().length;
                    var extraCount=Math.floor(playerCount/2);
                    var releaseCount=guCards.length+extraCount;
                    game.log(
                        player,
                        '本次【万蛊蚀天】共释放',
                        releaseCount,
                        '次【中毒】（X=' + guCards.length +
                            '，Y=' + extraCount + '）'
                    );
                    for(var i=0;i<releaseCount;i++){
                        var targets=game.filterPlayer();
                        if(!targets.length) break;
                        var target=targets[Math.floor(Math.random()*targets.length)];
                        await lib.suMingUseTemporaryEffectCard(player,'zhongDu',target);
                        game.log(target,'被【万蛊蚀天】施加了【中毒】');
                    }
                },
                        "ai": {
                            "order": function(item, player) {
                    var score = lib.skill.wanGuShiTian.getAiScore(player);
                    var releases = player.getGaiPai('gu').length +
                        Math.floor(game.filterPlayer().length / 2);
                    return score > 0 && releases >= 3 ? 4.8 : 0;
                },
                            "result": {
                                "player": function(player) {
                    return lib.skill.wanGuShiTian.getAiScore(player);
                },
                            },
                        },
                        "getAiScore": function(player) {
                    var score = 0;
                    lib.skill.aNuStrategy.wanGuTargets(player).forEach(function(target) {
                        score += target.side == player.side ? -1 : 1;
                    });
                    if(get.shiQi(!player.side) <= 2) score += 0.75;
                    var p = lib.skill.aNuStrategy.profile(player);
                    if(p.guangCount > 0 && get.shiQi(player.side) <= 4) score -= 0.5;
                    return score;
                },
                    },
                    "gu": {
                        "markimage": "extension/宿命挽歌/mark_gu.webp",
                        "intro": {
                            "name": "蛊",
                            "content": "gaiPai",
                            "markcount": "gaiPai",
                        },
                        "onremove": function(player, skill) {
                    const cards = player.getGaiPai(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                        "trigger": {
                            "player": "addGaiPaiAfter",
                        },
                        "filter": function(event,player){
                    return event.gaiPai=='gu'&&player.getGaiPai('gu').length>9;
                },
                        "direct": true,
                        "content": function(){
                    'step 0'
                    var cards=player.getGaiPai('gu');
                    player.chooseCardButton(cards,'舍弃'+(cards.length-9)+'张【蛊】',true,cards.length-9)
                        .set('ai',function(button){
                        var card=button.link;
                        var x=get.xiBie(card);
                        var sameX=cards.filter(function(c){return get.xiBie(c)==x;}).length;
                        var score=sameX*2;
                        if(x=='guang') score+=0.5;
                        if(get.type(card)=='faShu') score+=0.5;
                        return score;
                        });
                    'step 1'
                    if(result.links){
                        player.discard(result.links,'gu').set('sheQi',true);
                    }
                },
                    },
                    "wuDuZhu": {
                        "audio": "ext:宿命挽歌/audio/skill/wuDuZhu.mp3",
                        "intro": {
                            "name": "(专)[五毒珠]",
                            "content": "免疫来自中毒的伤害<br>（回合结束时）从以下两项选择一个发动：<br>①将五毒珠传递给左手边的玩家<br>②（移除战绩区1星石）将五毒珠传给目标玩家",
                            "nocount": true,
                        },
                        "markimage": "extension/宿命挽歌/mark_wuDuZhu.webp",
                        "global": [
                            "wuDuZhu_mianYi",
                            "wuDuZhu_chuanDi",
                        ],
                        "group": [
                            "wuDuZhu_kaiShi",
                        ],
                        "subSkill": {
                            "mianYi": {
                                "trigger": {
                                    "player": "shouDaoShangHai",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            if(!player.hasZhiShiWu('wuDuZhu')) return false;
                            if(event.card && event.card.name == 'zhongDu') return true;
                            var poisonEvent=event.getParent('_zhongDu',true);
                            return poisonEvent && poisonEvent.name=='_zhongDu';
                        },
                                "content": function() {
                            trigger.num=0;
                            game.log(player, '因持有【五毒珠】，免疫了【中毒】伤害');
                        },
                            },
                            "kaiShi": {
                                "trigger": {
                                    "global": "gameStart",
                                },
                                "forced": true,
                                "content": async function(event,trigger,player) {
                            if(!player.hasZhiShiWu('wuDuZhu')){
                                await player.addZhiShiWu('wuDuZhu');
                            }
                        },
                            },
                            "chuanDi": {
                                "trigger": {
                                    "player": "phaseEnd",
                                },
                                "forced": true,
                                "filter": function(event, player) {
                            return player.hasZhiShiWu('wuDuZhu');
                        },
                                "content": async function (event,trigger,player){
                            var leftTarget=player.getPrevious();
                            if(!leftTarget) return;

                            var zhanJi=get.zhanJi(player.side);
                            var target=leftTarget;
                            if(zhanJi.length>0){
                                var control=await player.chooseControl(
                                    '传给左手边角色',
                                    '移除战绩区1星石并指定目标'
                                ).set('prompt','五毒珠：选择传递方式')
                                .set('ai',function(){
                                    return lib.skill.aNuStrategy.wuDuZhuChoice(player,leftTarget);
                                }).forResultControl();

                                if(control=='移除战绩区1星石并指定目标'){
                                    var targets=(await player.chooseTarget(
                                        true,
                                        '五毒珠：选择一名其他角色获得【五毒珠】',
                                        function(card,player,target){
                                            return target!=player;
                                        }
                                    ).set('ai',function(target){
                                        return lib.skill.aNuStrategy.wuDuZhuTarget(_status.event.player,target);
                                    }).forResultTargets() || []);
                                    if(!targets.length) return;
                                    target=targets[0];

                                    zhanJi=get.zhanJi(player.side);
                                    var list=[];
                                    for(var i=0;i<zhanJi.length;i++){
                                        list.push([zhanJi[i],get.translation(zhanJi[i])]);
                                    }
                                    var links=(await player.chooseButton([
                                        '五毒珠：移除我方【战绩区】1星石',
                                        [list,'tdnodes'],
                                    ],true).forResultLinks() || []);
                                    if(!links.length) return;
                                    await player.removeZhanJi(links[0],1);
                                }
                            }

                            await target.addZhiShiWu('wuDuZhu',1,true);
                            if(!target.hasZhiShiWu('wuDuZhu')){
                                game.log('【五毒珠】传递失败，仍由',player,'持有');
                                return;
                            }
                            await player.removeZhiShiWu('wuDuZhu');
                            game.log(player,'将【五毒珠】传递给了',target);
                        },
                            },
                        },
                    },
                    "niTianWenDao": {
                        "forced": true,
                        "group": ["niTianWenDao_zhuCe", "niTianWenDao_qiangChiXuRuo"],
                        "subSkill": {
                            "zhuCe": {
                                "trigger": {"global": "gameStart"},
                                "forced": true,
                                "popup": false,
                                "content": function(event, trigger, player) {
                                    if(lib.suMingBaiYueAi) lib.suMingBaiYueAi.applyActionPatch();
                            game.addGlobalSkill('fengMo');
                                    game.broadcastAll(function(path, speaker) {
                                        if(!lib.config.background_audio) return;
                                        game.playAudio({
                                            path: path,
                                            spatialPlayer: speaker,
                                            addVideo: false,
                                            onError: function() {},
                                        });
                                    }, 'ext:宿命挽歌/audio/skill/niTianWenDao.mp3', player);
                                },
                            },
                            "qiangChiXuRuo": {
                                "trigger": {"player": "xingDongBefore"},
                                "forced": true,
                                "firstDo": true,
                                "priority": 100,
                                "popup": false,
                                "filter": function(event, player) {
                                    if(!player.hasExpansions('_xuRuo')) return false;
                                    var manual = player.isOnline() ||
                                        (player.isUnderControl(true) && !_status.auto);
                                    return !manual;
                                },
                                "content": async function(event, trigger, player) {
                                    game.broadcastAll(function() {
                                        if(lib.config.background_audio) {
                                            game.playAudio('card', 'male', 'xuRuo');
                                        }
                                    });
                                    game.log(player, '选择了', '摸三张牌');
                                    await player.draw(3);
                                    await player.discard(
                                        player.getExpansions('_xuRuo'), '_xuRuo'
                                    ).set('visible', true);
                                },
                            },
                        },
                        "mod": {
                            "cardEnabled": function(card, player) {
                                if(get.type(card, player) == 'faShu' ||
                                    get.name(card, player) == 'anMie') return false;
                            },
                        },
                        "trigger": {"source": "gongJiMingZhong"},
                        "filter": function(event, player) {
                            return event.target && event.target.isIn() &&
                                !event.target.hasJiChuXiaoGuo('fengMo');
                        },
                        "content": async function(event, trigger, player) {
                            await lib.suMingAttachTemporaryEffectCard(trigger.target, player, 'fengMo', 'fengMo');
                            if(trigger.target.hasJiChuXiaoGuo('fengMo')) {
                                trigger.target.addSkill('fengMo');
                                game.broadcastAll(function(path, speaker) {
                                    if(!lib.config.background_audio) return;
                                    game.playAudio({
                                        path: path,
                                        spatialPlayer: speaker,
                                        addVideo: false,
                                        onError: function() {},
                                    });
                                }, 'ext:宿命挽歌/audio/skill/fengMo.mp3', player);
                            }
                        },
                    },
                    "shuiMoShouHeTi": {
                        "forced": true,
                        "mark": true,
                        "marktext": "合",
                        "playAudio": function(player) {
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, 'ext:宿命挽歌/audio/skill/shuiMoShouHeTi.mp3', player);
                        },
                        "getTransformRoot": function(event) {
                            if(!event || typeof event.getParent != 'function') {
                                return event;
                            }
                            return event.getParent('faShu', true) ||
                                event.getParent('damage', true) ||
                                event.getParent('useCard', true) || event;
                        },
                        "isTransformChainEvent": function(event, player) {
                            if(!player || !player._shuiMoShouTransformRoot) {
                                return false;
                            }
                            var current = event;
                            var guard = 0;
                            while(current && guard++ < 64) {
                                if(current === player._shuiMoShouTransformRoot) {
                                    return true;
                                }
                                if(typeof current.getParent != 'function') break;
                                var parent = current.getParent();
                                if(!parent || parent === current) break;
                                current = parent;
                            }
                            return false;
                        },
                        "intro": {
                            "content": function(storage, player) {
                                var list = player.storage.shuiMoShouHeTi || [];
                                return "已释放不同法术：" + list.length + "/5" +
                                    (list.length ? "<br>" + get.translation(list) : "");
                            },
                        },
                        "trigger": {
                            "player": "faShuAfter",
                            "global": "changeShiQiEnd",
                        },
                        "filter": function(event, player) {
                            if(lib.skill.shuiMoShouHeTi.spells.includes(event.skill)) {
                                return true;
                            }
                            return event.name == 'changeShiQi' &&
                                event.side == player.side && event.num < 0 &&
                                get.shiQi(player.side) < 5;
                        },
                        "spells": [
                            "mieJueYiJi", "duoHun", "daZhouShe",
                            "duTunTianXia", "qunMoLuanWu", "xingFengXueYu",
                        ],
                        "content": async function(event, trigger, player) {
                            if(lib.skill.shuiMoShouHeTi.spells.includes(trigger.skill)) {
                                if(!Array.isArray(player.storage.shuiMoShouHeTi)) {
                                    player.storage.shuiMoShouHeTi = [];
                                }
                                player.storage.shuiMoShouHeTi.add(trigger.skill);
                                player.markSkill('shuiMoShouHeTi');
                            }
                            var spellsReady =
                                (player.storage.shuiMoShouHeTi || []).length >= 5;
                            var moraleReady = trigger.name == 'changeShiQi' &&
                                trigger.side == player.side && trigger.num < 0 &&
                                get.shiQi(player.side) < 5;
                            if(!spellsReady && !moraleReady) return;
                            player._shuiMoShouTransformRoot =
                                lib.skill.shuiMoShouHeTi.getTransformRoot(trigger);
                            player._shuiMoShouTransforming = true;
                            try {
                                await player.reinitCharacter(
                                    'baiYueJiaoZhu', 'shuiMoShouBaiYueJiaoZhu'
                                );
                                lib.skill.shuiMoShouHeTi.playAudio(player);
                                lib.skill.suMingWanGeBgm.playTrack(
                                    'ext:宿命挽歌/audio/bgm/niTianErXing2.mp3'
                                );
                                await player.setZhiShiWu('hongShui', 2);
                            } finally {
                                player._shuiMoShouTransforming = false;
                            }
                        },
                    },
                    "mieJueYiJi": {
                        "audio": "ext:宿命挽歌/audio/skill/mieJueYiJi.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            if(!lib.suMingBaiYueAi.isManual(player) && player.countCards('h') >= 3) return false;
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'anMie';
                            }) > 0;
                        },
                        "filterCard": function(card, player) {
                            // 本体缓存 _skillChoice；切换托管后仍须在实际选牌时重新检查。
                            return (lib.suMingBaiYueAi.isManual(player) || player.countCards('h') < 3) &&
                                get.name(card) == 'anMie';
                        },
                        "check": function(card) { return 1; },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "filterTarget": function(card, player, target) {
                            return target.side != player.side;
                        },
                        "content": async function(event, trigger, player) {
                            var before = player.countCards('h');
                            await player.drawTo(player.getHandcardLimit());
                            var num = Math.min(4, Math.max(0, player.countCards('h') - before));
                            if(num > 0) await event.target.faShuDamage(num, player, 'nocard');
                            await player.addNengLiang('shuiJing', 1);
                        },
                        "ai": {
    "order": function(item, player) { return player.countCards('h') < 3 ? 2.5 : 0; },
    "result": {
        "player": function(player) {
            // 只有手牌小于3时才发动，保留高手牌数量换取更高伤害
            return player.countCards('h') < 3 ? 1 : -100;
        },
        "target": function(player, target) {
            var num = Math.min(4, Math.max(1,
                player.getHandcardLimit() - player.countCards('h') + 1));
            var effect = get.damageEffect2(target, player, num);
            // 这一击可直接清零目标阵营士气时视为斩杀
            if(get.shiQi(target.side) <= num) effect += 5;
            return effect;
        },
    },
},
                    },
                    "duoHun": {
                        "audio": "ext:宿命挽歌/audio/skill/duoHun.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'shengGuang';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'shengGuang'; },
                        "check": function(card) { return 1; },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function(card, player, target) {
                            return target != player;
                        },
                        "contentBefore": function(event, trigger, player) {
                            event.getParent().duoHunEnemyShiQiBefore =
                                get.shiQi(!player.side);
                        },
                        "content": async function(event, trigger, player) {
                            var cards = get.cards(1);
                            if(!cards.length) return;
                            await event.target.showCards(cards, '【夺魂】展示');
                            await game.cardsDiscard(cards);
                            if(get.type(cards[0]) != 'faShu') {
                                await event.target.changeShiQi(-1);
                            }
                        },
                        "contentAfter": async function(event, trigger, player) {
                            var before = event.getParent()
                                .duoHunEnemyShiQiBefore;
                            if(typeof before == 'number' &&
                                before - get.shiQi(!player.side) >= 2){
                                await player.addNengLiang('baoShi', 1);
                            }
                        },
                        "ai": {
    "order": 5.5,
    "result": {
        "player": 1,
        "target": function(player, target) {
            if(target == player) return 0;
            return target.side == player.side ? -1 : 1;
        },
    },
},
                    },
                    "suMingBaiYueSnakeFollow": { charlotte: true },
                    "daZhouShe": {
                        "audio": "ext:宿命挽歌/audio/skill/daZhouShe.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            var hasCost = player.countCards('h', function(card) {
                                return get.name(card, player) == 'xuRuo';
                            }) > 0;
                            if(!hasCost) return false;
                            var manual = player.isOnline() ||
                                (player.isUnderControl(true) && !_status.auto);
                            return manual ||
                                lib.suMingBaiYueAi.hasEffectiveDaZhouSheFollow(player);
                        },
                        "filterCard": function(card) { return get.name(card) == 'xuRuo'; },
                        "check": function(card) { return 1; },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "content": async function(event, trigger, player) {
                            if(event.target.hasJiChuXiaoGuo('_xuRuo')) return;
                            await lib.suMingUseTemporaryEffectCard(player, 'xuRuo', event.target, false);
                        },
                        "contentAfter": async function(event, trigger, player) {
                            player.addTempSkill('suMingBaiYueSnakeFollow', 'phaseAfter');
                            await player.addFaShu();
                        },
                        "ai": {
    "order": function(item, player) {
        return lib.suMingBaiYueAi.hasEffectiveDaZhouSheFollow(player) ? 8.5 : 0;
    },
    "result": {
        "target": function(player, target) {
            if(!lib.suMingBaiYueAi.hasEffectiveDaZhouSheFollow(player)) return 0;
            if(target.hasJiChuXiaoGuo('_xuRuo')) return 0;
            return target.side == player.side ? -1.5 : 2;
        },
        "player": function(player) {
            return lib.suMingBaiYueAi.hasEffectiveDaZhouSheFollow(player) ? 1 : -100;
        },
    },
},
                    },
                    "duTunTianXia": {
                        "audio": "ext:宿命挽歌/audio/skill/duTunTianXia.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            if(!lib.suMingBaiYueAi.isManual(player) &&
                                !lib.suMingBaiYueAi.canUseGroup(player, "duTunTianXia")) return false;
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'zhongDu';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'zhongDu'; },
                        "check": function(card) { return 1; },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "content": async function(event, trigger, player) {
                            for (var i = 0; i < 2; i++) {
                                await lib.suMingUseTemporaryEffectCard(player, 'zhongDu', event.target, false);
                            }
                        },
                        "ai": {
                            "order": function(item, player) {
                                if(!lib.suMingBaiYueAi.canUseGroup(player, 'duTunTianXia')) return 0;
                                return player.hasSkill('suMingBaiYueSnakeFollow') ? 7.5 : 4.5;
                            },
                            "result": {"player": function(player) {
                                if(!lib.suMingBaiYueAi.canUseGroup(player, 'duTunTianXia')) return -100;
                                return Math.max(1, lib.suMingBaiYueAi.groupMoraleGain(player, 'duTunTianXia'));
                            }},
                        },
                    },
                    "qunMoLuanWu": {
                        "audio": "ext:宿命挽歌/audio/skill/qunMoLuanWu.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            if(!lib.suMingBaiYueAi.isManual(player) &&
                                !lib.suMingBaiYueAi.canUseGroup(player, "qunMoLuanWu")) return false;
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'shengDun';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'shengDun'; },
                        "check": function(card) { return 1; },
                        "position": "h", "selectCard": 1, "discard": true,
                        "visible": true, "selectTarget": -1,
                        "filterTarget": function(card, player, target) {
                            return target.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            await player.useCard(
                                {name: 'anMie', xiBie: 'an'}, event.target, false
                            );
                        },
                        "ai": {
                            "order": function(item, player) {
                                if(!lib.suMingBaiYueAi.canUseGroup(player, 'qunMoLuanWu')) return 0;
                                return player.hasSkill('suMingBaiYueSnakeFollow') ? 7.5 : 4.5;
                            },
                            "result": {"player": function(player) {
                                if(!lib.suMingBaiYueAi.canUseGroup(player, 'qunMoLuanWu')) return -100;
                                return Math.max(1, lib.suMingBaiYueAi.groupMoraleGain(player, 'qunMoLuanWu'));
                            }},
                        },
                    },
                    "guiJiang": {
                        "audio": "ext:宿命挽歌/audio/skill/guiJiang.mp3",
                        "trigger": {"player": "chengShouShangHaiBefore"},
                        "filter": function(event, player) {
                            return event.num > 0 && player.countCards('h', function(card) {
                                return get.name(card) == 'moDan';
                            }) > 0 && game.hasPlayer(function(current) {
                                return current.side != player.side;
                            });
                        },
                        "cost": async function(event, trigger, player) {
                            var cards = await player.chooseToDiscard(
                                'h', 1, '【鬼降】：弃置1张【魔弹】转移此次伤害',
                                function(card) { return get.name(card) == 'moDan'; }
                            ).set('visible', true).set('baiYueTransferDamage', trigger.num).set('ai', function(card) {
                                return _status.event.baiYueTransferDamage >= 4 ? 1 : -1;
                            }).forResultCards() || [];
                            if(!cards.length) { event.result = {bool:false}; return; }
                            var targets = (await player.chooseTarget(
                                true, '【鬼降】：选择承受转移伤害的对手',
                                function(card, player, target) {
                                    return target.side != player.side;
                                }
                            ).set('ai', function(target) {
                                // 指定手牌最多的对手承受转移伤害
                                return target.countCards('h');}).forResultTargets() || []);
                            event.result = {bool:targets.length > 0, cost_data:targets[0]};
                        },
                        "content": async function(event, trigger, player) {
                            var target = event.cost_data, num = trigger.num;
                            var faShu = trigger.faShu === true;
                            trigger.cancel();
                            if(faShu) await target.faShuDamage(num, player, 'nocard');
                            else await target.damage(num, player, 'nocard');
                        },
                    },
                    "shuiMoShouHuTi": {
                        "audio": "ext:宿命挽歌/audio/skill/shuiMoShouHuTi.mp3",
                        "trigger": {"player": "phaseBefore"},
                        "filter": function(event, player) {
                            var manual = player.isOnline() ||
                                (player.isUnderControl(true) && !_status.auto);
                            if(!manual && player.countNengLiang('shuiJing') <= 0) {
                                return false;
                            }
                            return player.canBiShaShuiJing();
                        },
                        "cost": async function(event, trigger, player) {
                            event.result = await player.chooseBool(
                                get.prompt('shuiMoShouHuTi')
                            ).set('prompt2', lib.translate.shuiMoShouHuTi_info)
                                .set('ai', function() {
                                    return lib.skill.shuiMoShouHuTi.check(
                                        null,
                                        _status.event.player
                                    );
                                }).forResult();
                        },
                        "content": async function(event, trigger, player) {
                            var manual = player.isOnline() ||
                                (player.isUnderControl(true) && !_status.auto);
                            if(manual) {
                                await player.removeBiShaShuiJing();
                            }
                            else {
                                if(player.countNengLiang('shuiJing') <= 0) return;
                                await player.removeNengLiang('shuiJing', 1);
                            }
                            if(player.countCards('h') >= 2) {
                                await player.chooseToDiscard(
                                    'h', 2, true,
                                    '水魔兽护体：弃置2张手牌'
                                ).set('ai', function(card) {
                                    var player = _status.event.player;
                                    if(get.type(card, player) != 'gongJi') return -1;
                                    return get.name(card, player) == 'anMie' ? 1 : 10;
                                });
                            }
                            var list = player.jiChuXiaoGuoList().slice(0);
                            for(var xiaoGuo of list) {
                                var cards = player.getJiChuXiaoGuo(xiaoGuo);
                                if(cards && cards.length) {
                                    await player.loseToDiscardpile(cards);
                                }
                                if(xiaoGuo == '_zhongDu') player.storage.zhongDu = [];
                                if(!game.jiChuXiaoGuo.pai_xiaoGuo.includes(xiaoGuo)) {
                                    player.removeSkill(xiaoGuo);
                                }
                            }
                        },
                        "check": function(event, player) {
                            // AI只允许用【水晶】发动，绝不拿【宝石】代替支付。
                            if(player.countNengLiang('shuiJing') <= 0) return false;
                            // 至少3张攻击牌即可开，腾出能量位置；不要求满手或基础效果。
                            return player.countCards('h', function(card) {
                                return get.type(card, player) == 'gongJi';
                            }) > 2;
                        },
                        "ai": {"shuiJing": true},
                    },
                    "xingFengXueYu": {
                        "audio": "ext:宿命挽歌/audio/skill/xingFengXueYu.mp3",
                        "type": "faShu", "enable": "faShu",
                        "filter": function(event, player) {
                            return player.canBiShaBaoShi() && (lib.suMingBaiYueAi.isManual(player) ||
                                lib.suMingBaiYueAi.canSpendBloodGem(player));
                        },
                        "selectTarget": -1, "filterTarget": function() { return true; },
                        "contentBefore": async function(event, trigger, player) {
                            await player.removeBiShaBaoShi();
                        },
                        "content": async function(event, trigger, player) {
                            var oldMorale = get.shiQi(event.target.side);
                            await event.target.faShuDamage(2, player, 'nocard');
                            if(!event.target.isIn()) return;
                            if(get.shiQi(event.target.side) < oldMorale) {
                                await lib.suMingUseTemporaryEffectCard(player, 'zhongDu', event.target, false);
                            } else if(!event.target.hasJiChuXiaoGuo('_xuRuo')) {
                                await lib.suMingUseTemporaryEffectCard(player, 'xuRuo', event.target, false);
                            }
                        },
                        "ai": {
    "baoShi": true,
    "order": function(item, player) { return lib.suMingBaiYueAi.canSpendBloodGem(player) ? 6.5 : 0; },
    "result": {
        "target": function(player, target) {
            var effect = get.damageEffect2(target, player, 2);
            // 治疗不足2点时大概率因士气下降追加中毒
            if(target.side != player.side && (target.zhiLiao || 0) < 2) effect += 0.6;
            return effect;
        },
        "player": function(player) {
            if(!lib.suMingBaiYueAi.canSpendBloodGem(player)) return -100;
            // 全场2点法术伤害：掉士气者追加中毒，未掉士气者被施加虚弱
            var net = lib.suMingBaiYueAi.transformBonus(player, 'xingFengXueYu');
            for(var i = 0; i < game.players.length; i++) {
                var cur = game.players[i];
                if(!cur.isIn()) continue;
                net += get.damageEffect2(cur, player, 2);
                if((cur.zhiLiao || 0) < 2) net += cur.side == player.side ? -0.6 : 0.6;
                // 自己的虚弱永远强吃，不计入发动代价
                else if(!cur.hasJiChuXiaoGuo('_xuRuo')) net += cur == player ? 0 : (cur.side == player.side ? -0.4 : 0.2);
            }
            return net > 0.5 ? net : -1;
        },
    },
},
                    },
                    "shuiMoShouZhiQu": {
                        "forced": true,
                        "group": ["shuiMoShouZhiQu_qiPai"],
                        "playAudio": function(player) {
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, 'ext:宿命挽歌/audio/skill/hongShui.mp3', player);
                        },
                        "mod": {
                            "maxHandcard": function(player, num) { return num + 2; },
                        },
                        "trigger": {"player": "chengShouShangHaiBefore"},
                        "filter": function(event) {
                            return event.faShu === true && event.num > 0;
                        },
                        "content": function(event, trigger, player) {
                            lib.skill.shuiMoShouZhiQu.playAudio(player);
                            trigger.changeDamageNum(-1);
                        },
                        "subSkill": {
                            "qiPai": {
                                "trigger": {"player": "discard"},
                                "forced": true,
                                "filter": function(event) {
                                    return event.cards && event.cards.length > 0;
                                },
                                "content": async function(event, trigger, player) {
                                    lib.skill.shuiMoShouZhiQu.playAudio(player);
                                    await player.changeZhiLiao(1, player);
                                },
                            },
                        },
                    },
                    "shuiMoShouZhiNu": {
                        "audio": "ext:宿命挽歌/audio/skill/shuiMoShouZhiNu.mp3",
                        "trigger": {"global": "changeShiQiEnd"},
                        "forced": true,
                        "filter": function(event, player) {
                            return event.num < 0 && event.side == player.side &&
                                event.player == player && event.baoPai === true &&
                                event.cause == 'damage';
                        },
                        "content": async function(event, trigger, player) {
                            await player.addNengLiang('shuiJing', 1);
                            await player.addZhiShiWu('hongShui', 1);
                        },
                    },
                    "nvWaZhiXue": {
                        "audio": "ext:宿命挽歌/audio/skill/nvWaZhiXue.mp3",
                        "trigger": {"global": "changeShiQiEnd"},
                        "forced": true,
                        "filter": function(event, player) {
                            if(event.num >= 0 || event.source != player ||
                                event.cause != 'damage' || !event.player) return false;
                            return lib.skill.suMingWanGeLianDong.isCharacter(
                                event.player, 'zhaoLingEr'
                            );
                        },
                        "content": async function(event, trigger, player) {
                            await player.addNengLiang('baoShi', 3);
                            player.storage.hongShuiLimit = 8;
                            player.syncStorage('hongShuiLimit');
                            var current = player.countZhiShiWu('hongShui');
                            if(current < 8) {
                                await player.addZhiShiWu('hongShui', 8 - current);
                            }
                            player.markSkill('hongShui');
                            player.removeSkill('nvWaZhiXue');
                        },
                    },
                    "yongSheng": {
                        "forced": true,
                        "group": ["yongSheng_hongShui", "yongSheng_shiQi"],
                        "playAudio": function(player) {
                            game.broadcastAll(function(path, speaker) {
                                if(!lib.config.background_audio) return;
                                game.playAudio({
                                    path: path,
                                    spatialPlayer: speaker,
                                    addVideo: false,
                                    onError: function() {},
                                });
                            }, 'ext:宿命挽歌/audio/skill/yongSheng.mp3', player);
                        },
                        "subSkill": {
                            "hongShui": {
                                "trigger": {
                                    "global": ["useCardAfter", "discard", "showCards"],
                                },
                                "forced": true,
                                "popup": false,
                                "filter": function(event, player) {
                                    if(player._shuiMoShouTransforming ||
                                        lib.skill.shuiMoShouHeTi
                                            .isTransformChainEvent(event, player)) {
                                        return false;
                                    }
                                    var cards = event.cards || (event.card ? [event.card] : []);
                                    return cards.some(function(card) {
                                        var xiBie = get.xiBie(card);
                                        return xiBie == 'shui' || xiBie == 'guang';
                                    });
                                },
                                "content": async function(event, trigger, player) {
                                    var cards = trigger.cards ||
                                        (trigger.card ? [trigger.card] : []);
                                    var num = cards.filter(function(card) {
                                        var xiBie = get.xiBie(card);
                                        return xiBie == 'shui' || xiBie == 'guang';
                                    }).length;
                                    if(num > 0) {
                                        lib.skill.yongSheng.playAudio(player);
                                        await player.addZhiShiWu('hongShui', num);
                                    }
                                },
                            },
                            "shiQi": {
                                "trigger": {"global": "changeShiQiBefore"},
                                "forced": true,
                                "popup": false,
                                "lastDo": true,
                                "priority": -100,
                                "filter": function(event, player) {
                                    return event.side == player.side && event.num < 0 &&
                                        player.countZhiShiWu('hongShui') > 0 &&
                                        get.shiQi(player.side) + event.num < 1;
                                },
                                "content": async function(event, trigger, player) {
                                    lib.skill.yongSheng.playAudio(player);
                                    var current = get.shiQi(player.side);
                                    if(current == 1 && trigger.baoPai === true &&
                                        trigger.cause == 'damage') {
                                        var num = trigger.cards ? trigger.cards.length : 0;
                                        if(num > 0) {
                                            await player.removeZhiShiWu('hongShui', num);
                                            player.storage.hongShuiLimit = Math.max(
                                                0,
                                                lib.skill.hongShui.getLimit(player) - num
                                            );
                                            player.syncStorage('hongShuiLimit');
                                            if(player.countZhiShiWu('hongShui') > 0) {
                                                player.markSkill('hongShui');
                                            }
                                        }
                                    }
                                    trigger.num = Math.min(0, 1 - current);
                                },
                            },
                        },
                    },
                    "zhangDuZhen": {
                        "audio": "ext:宿命挽歌/audio/skill/zhangDuZhen.mp3",
                        "trigger": {"source": "chengShouShangHaiAfter"},
                        "forced": true,
                        "filter": function(event) {
                            return event.num > 0 && event.player && event.player.isIn();
                        },
                        "content": async function(event, trigger, player) {
                            if(trigger.player.isIn()) {
                                await lib.suMingUseTemporaryEffectCard(player, 'zhongDu', trigger.player, false);
                            }
                        },
                    },
                    "diLieTianBeng": {
                        "audio": "ext:宿命挽歌/audio/skill/diLieTianBeng.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            if(!lib.suMingBaiYueAi.isManual(player) &&
                                !lib.suMingBaiYueAi.canStartEarthIce(player)) return false;
                            return player.countCards('h', function(card) {
                                return get.name(card, player) == 'anMie';
                            }) > 0;
                        },
                        "filterCard": function(card) { return get.name(card) == 'anMie'; },
                        "check": function(card) { return 1; },
                        "position": "h",
                        "selectCard": 1,
                        "discard": true,
                        "visible": true,
                        "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "contentBefore": function(event, trigger, player) {
                            player.addTempSkill('suMingBaiYueIceFollow', 'phaseAfter');
                        },
                        "content": async function(event) {
                            await event.target.drawTo(event.target.getHandcardLimit());
                        },
                        "contentAfter": async function(event, trigger, player) {
                            await player.addFaShu();
                        },
                        "ai": {
                            "order": function(item, player) {
                                if(!lib.suMingBaiYueAi.canStartEarthIce(player)) return 0;
                                return 7.8;
                            },
                            "result": {
                                "player": function(player) {
                                    // 地裂天崩后永远接风雪冰天：没有宝石时改为提炼，不空放
                                    return lib.suMingBaiYueAi.canStartEarthIce(player) ? 1 : -100;
                                },

                            },
                        },
                    },
                    "suMingBaiYueIceFollow": {charlotte: true},
                    "taoTianJuLang": {
                        aiCostPlan: function(player) {
                            var hand=player.getCards('h'),best=[],score=-Infinity;
                            var priorityWave = lib.suMingBaiYueAi.wantsGemBackedWave(player) ||
                                lib.suMingBaiYueAi.wantsLowFloodWave(player);
                            for(var i=0;i<hand.length;i++) for(var j=i+1;j<hand.length;j++) {
                                if(!lib.filter.cardDiscardable(hand[i],player,'taoTianJuLang') ||
                                    !lib.filter.cardDiscardable(hand[j],player,'taoTianJuLang')) continue;
                                var safe=hand.some(function(card,k) {
                                    return k!==i&&k!==j&&get.type(card,player)==='gongJi'&&get.name(card,player)!=='anMie'&&
                                        lib.filter.cardEnabled(card,player)&&game.hasPlayer(function(target) {
                                            return target.side!==player.side&&player.canUseXingBei(card,target);
                                        });
                                });
                                if(!safe && !priorityWave) continue;
                                var value=14-get.value(hand[i],player)-get.value(hand[j],player);
                                if(priorityWave) {
                                    var left=hand.filter(function(card,k) { return k!==i && k!==j; });
                                    if(left.some(function(card) { return get.name(card,player)==='anMie'; })) value+=200;
                                    if(left.some(function(card) { return get.type(card,player)==='faShu'; })) value+=200;
                                }
                                if(value>score){score=value;best=[hand[i],hand[j]];}
                            }
                            return best;
                        },
                        "audio": "ext:宿命挽歌/audio/skill/taoTianJuLang.mp3",
                        "type": "qiDong",
                        "trigger": {"player": "qiDong"},
                        "filter": function(event, player) {
                            var manual = lib.suMingBaiYueAi.isManual(player);
                            if(!manual && player.countNengLiang('shuiJing') <= 0 &&
                                !lib.suMingBaiYueAi.wantsGemBackedWave(player)) {
                                return false;
                            }
                            return player.canBiShaShuiJing() &&
                                player.countCards('h') >= 2;
                        },
                        "cost": async function(event, trigger, player) {
                            var gemPayment = lib.suMingBaiYueAi.wantsGemBackedWave(player);
                            var cards = await player.chooseToDiscard(
                                'h', 2, get.prompt('taoTianJuLang')
                            ).set('prompt2', lib.translate.taoTianJuLang_info)
                                .set('taoTianSafeCost',lib.skill.taoTianJuLang.check(trigger, player) ? lib.skill.taoTianJuLang.aiCostPlan(player) : [])
                                .set('visible', true)
                                .set('ai', function(card) {
                                    return _status.event.taoTianSafeCost.includes(card)?100:-10000;
                                }).forResultCards() || [];
                            event.result = {bool: cards.length == 2, cost_data: {gemPayment: gemPayment}};
                        },
                        "content": async function(event, trigger, player) {
                            var manual = lib.suMingBaiYueAi.isManual(player);
                            if(manual) {
                                await player.removeBiShaShuiJing();
                            }
                            else {
                                if(player.countNengLiang('shuiJing') > 0) {
                                    await player.removeNengLiang('shuiJing', 1);
                                }
                                else if(event.cost_data && event.cost_data.gemPayment && player.countNengLiang('baoShi') >= 2) {
                                    await player.removeNengLiang('baoShi', 1);
                                }
                                else return;
                            }
                            await player.addZhiShiWu('hongShui', 2, 8);
                        },
                        "check": function(event, player) {

                            if(lib.suMingBaiYueAi.wantsGemBackedWave(player)) {
                                return lib.skill.taoTianJuLang.aiCostPlan(player).length === 2;
                            }
                            if(player.countNengLiang('shuiJing') <= 0) return false;
                            // 常规分支要求至少3颗星石；低洪水补洪分支允许用实际水晶越过此门槛。
                            // 额外水晶分支仍要求保留1颗宝石供后续【风雪冰天】使用。
                            var xingShi = lib.suMingBaiYueAi.xingShiTotal(player);
                            var spareOK = lib.suMingBaiYueAi.hasSpareShuiJing(player) &&
                                player.countNengLiang('baoShi') >= 1;
                            var lowFloodRefill = lib.suMingBaiYueAi.wantsLowFloodWave(player);
                            if(xingShi < 3 && !spareOK && !lowFloodRefill) return false;
                            if(lib.skill.taoTianJuLang.aiCostPlan(player).length!==2) return false;
                            var current = player.countZhiShiWu('hongShui');
                            if(current >= 8) return false;
                            if(lib.skill._heCheng &&
                                lib.skill._heCheng.filter(event, player) &&
                                (get.shiQi(!player.side) <= 1 ||
                                    get.xingBei(player.side) + 1 >= game.xingBeiMax)) {
                                return false;
                            }
                                                        if(get.shiQi(player.side) <= 3) return true;
                            if(current > 6) return false;
                            var cards = player.getCards('h').sort(function(a, b) {
                                return get.value(a, player) - get.value(b, player);
                            });
                            var cost = (cards[0] ? get.value(cards[0], player) : 10) +
                                (cards[1] ? get.value(cards[1], player) : 10);
                            return current <= 4 || cost <= 9;
                            },
                        "ai": {"shuiJing": true},
                    },
                    "fengXueBingTian": {
                        "audio": "ext:宿命挽歌/audio/skill/fengXueBingTian.mp3",
                        "type": "faShu",
                        "enable": "faShu",
                        "filter": function(event, player) {
                            if(!lib.suMingBaiYueAi.isManual(player) && !lib.suMingBaiYueAi.canUseIce(player)) return false;
                            return player.canBiShaBaoShi() && player.countCards('h', function(card) {
                                return get.type(card, player) == 'faShu';
                            }) > 0;
                        },
                        "filterCard": function(card, player) {
                            return get.type(card, player) == 'faShu';
                        },
                        "selectCard": -1,
                        "position": "h",
                        "discard": true,
                        "visible": true,
                        "selectTarget": -1,
                        "filterTarget": function() { return true; },
                        "contentBefore": async function(event, trigger, player) {
                            event.getParent().fengXueBingTianNum = event.cards.length;
                            await player.removeBiShaBaoShi();
                        },
                        "content": async function(event, trigger, player) {
                            var num = event.getParent().fengXueBingTianNum || 0;
                            await event.target.faShuDamage(Math.ceil(num / 2) + 1,
                                player, 'nocard');
                        },
                        "ai": {
                            "baoShi": true,
                            "order": function(item, player) {
                                if(player.hasSkill('suMingBaiYueIceFollow')) return 20;
                                return lib.suMingBaiYueAi.canUseIce(player) ? 6.8 : 0;
                            },
                            "result": {"player": function(player) {
                                if(player.hasSkill('suMingBaiYueIceFollow')) return 100;
                                if(!lib.suMingBaiYueAi.canUseIce(player)) return -100;
                                return 1;
                            }},
                        },
                    },
                    "hongShui": {
                        "audio": "ext:宿命挽歌/audio/skill/hongShui.mp3",
                        "charlotte": true,
                        "mark": true,
                        "markimage": "extension/宿命挽歌/mark_hongShui.webp",
                        "marktext": "水",
                        "init": function(player) {
                            if(typeof player.storage.hongShuiLimit != 'number') {
                                player.storage.hongShuiLimit = 8;
                                player.syncStorage('hongShuiLimit');
                            }
                        },
                        "getLimit": function(player) {
                            if(typeof player.storage.hongShuiLimit != 'number') return 8;
                            return Math.max(0, player.storage.hongShuiLimit);
                        },
                        "intro": {
                            "name": "洪水",
                            "content": function(storage, player) {
                                return '当前【洪水】：' + player.countZhiShiWu('hongShui') +
                                    '<br>上限：' + lib.skill.hongShui.getLimit(player);
                            },
                            "max": function(player) {
                                var limit = lib.skill.hongShui.getLimit(player);
                                return limit > 0 ? limit : -1;
                            },
                        },
                    },
                    "fengMo": {
                        "audio": "ext:宿命挽歌/audio/skill/fengMo.mp3",
                        "charlotte": true,
                        "markimage": "extension/宿命挽歌/mark_fengMo.webp",
                        "tag": {"jiChuXiaoGuo": true},
                        "trigger": {"player": "phaseEnd"},
                        "forced": true,
                        "popup": false,
                        "filter": function(event, player) {
                            return player.hasJiChuXiaoGuo('fengMo');
                        },
                        "content": async function(event, trigger, player) {
                            var cards = player.getJiChuXiaoGuo('fengMo');
                            if(cards && cards.length) {
                                await player.loseToDiscardpile(cards);
                            }
                            player.removeSkill('fengMo');
                        },
                        "init": function(player, skill) { player.addSkillBlocker(skill); },
                        "onremove": function(player, skill) {
                            player.removeSkillBlocker(skill);
                            var cards = player.getJiChuXiaoGuo(skill);
                            if(cards && cards.length) player.loseToDiscardpile(cards);
                        },
                        "skillBlocker": function(skill, player) {
                            if(skill == 'fengMo' || skill == 'shuiMoShouHuTi') return false;
                            var info = get.info(skill) || {};
                            var name = get.translation(skill) || '';
                            var plainName = String(name).replace(/<[^>]*>/g, '');
                            return info.type == 'faShu' ||
                                plainName.indexOf('法术【') >= 0 ||
                                plainName.indexOf('[法术]') >= 0 ||
                                plainName.indexOf('【法术】') >= 0 ||
                                plainName.indexOf('响应【') >= 0 ||
                                plainName.indexOf('[响应]') >= 0 ||
                                plainName.indexOf('【响应】') >= 0;
                        },
                        "mod": {
                            "cardEnabled": function(card, player) {
                                if(player.hasJiChuXiaoGuo('fengMo') &&
                                    get.type(card, player) == 'faShu'){
                                    return false;
                                }
                            },
                        },
                        "intro": {"name": "专属【封魔】", "content": function() { return lib.translate.baiYueFengMo_info; }},
                    },
                },
                "translate": {
                    "sheYaoNan": "蛇妖男",
                    "huYaoNv": "狐妖女",
                    "yinLongCangZhen": "被动【隐龙藏珍】",
                    "yinLongCangZhen_info": "你的能量上限+2。<span class='tiaoJian'>（你的回合结束时）</span>选择+1<span style=\"color:#E02B17\">【宝石】</span>或+2<span class='lan'>【水晶】</span>。<span class='tiaoJian'>（其他角色对你造成伤害导致你方士气下降）</span>伤害来源可以取得你能量区的1颗星石。",
                    "kuangSheLianZhan": "响应【狂蛇连斩】【回合限定】",
                    "kuangSheLianZhan_info": "<span class='tiaoJian'>（你的【攻击行动】结束后）</span>+1【攻击行动】。",
                    "suMingXianYueZhan": "响应【弦月斩】",
                    "suMingXianYueZhan_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（你的主动攻击命中后②）</span>对所有其他对手各造成等同于本次攻击伤害的攻击伤害。",
                    "meiYingLianXi": "响应【魅影连袭】【回合限定】",
                    "meiYingLianXi_info": "<span class='tiaoJian'>（你的【法术行动】结束后）</span>+1【法术行动】。",
                    "suMingHuiMeng": "法术【回梦】",
                    "suMingHuiMeng_info": "<span class='tiaoJian'>（弃置1张法术牌）</span>指定1名对手，翻开并弃置牌库顶1张牌【展示】；若为法术牌，对其使用【虚弱】，否则对其使用【中毒】。",
                    "suMingLeiZhou": "法术【雷咒】",
                    "suMingLeiZhou_info": "<span class='tiaoJian'>（弃置1张元素师独有技）</span>对1名对手造成1点法术伤害③；<span class='tiaoJian'>（若费用牌为雷系）</span>此伤害+1。",
                    "suMingWuLeiZhou": "响应【五雷咒】",
                    "suMingWuLeiZhou_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（你造成正数法术伤害时）</span>对另一名对手造成等同于本次伤害的法术伤害③。",
                    "yinLongXiangYi": "启动【隐龙相依】",
                    "yinLongXiangYi_info": "<span style=\"color:#E02B17\">【宝石】</span>在【蛇妖男】与【狐妖女】之间切换。",
                    "jiangJunZhong": "被动【将军冢】",
                    "jiangJunZhong_info": "你无法获得<span class='hong'>【尸毒】</span>。<span class='tiaoJian'>（其他角色每获得或增加1层<span class='hong'>【尸毒】</span>后）</span>你+1<span class='hong'>【阴气】</span>。",
                    "lianYuZhua": "响应【炼狱爪】",
                    "lianYuZhua_info": "<span class='tiaoJian'>（攻击命中后②，移除2<span style=\"color:#CB690B\">【阴气】</span>或弃置1张土系牌【展示】）</span>本次攻击伤害+1，攻击目标+1<span style=\"color:#CB690B\">【尸毒】</span>。",
                    "shiDuZhangQi": "法术【尸毒瘴气】",
                    "shiDuZhangQi_info": "<span class='tiaoJian'>（弃置1张法术牌【展示】）</span>使1名没有<span class='hong'>【尸毒】</span>的角色+1<span class='hong'>【尸毒】</span>。然后除其外，其他已有<span class='hong'>【尸毒】</span>的角色各摸1张牌并+1<span class='hong'>【尸毒】</span>。",
                    "guiJiangJunGuiJiang": "响应【鬼降】",
                    "guiJiangJunGuiJiang_info": "<span class='tiaoJian'>（目标对手主动攻击命中我方角色时，移除5</span><span class='hong'>【阴气】</span><span class='tiaoJian'>）</span>立即取消原目标的此次伤害，改为对另一名目标对手结算等量攻击伤害，并使其+1<span class='hong'>【尸毒】</span>。<span class='tiaoJian'>（攻击来源为【僵尸】时）</span>改为只需移除3<span class='hong'>【阴气】</span>。",
                    "xueMoShenGong": "法术【血魔神功】",
                    "xueMoShenGong_info": "<span style=\"color:#E02B17\">【宝石】</span>移除所有角色的全部<span class='hong'>【尸毒】</span>，依次对每名因此失去<span class='hong'>【尸毒】</span>的角色造成X+1点法术伤害③；X为从该角色处实际移除的层数。<br><span class='tiaoJian'>（每有1名对手因此实际承受伤害）</span>你+1【治疗】；<span class='tiaoJian'>（若至少移除5层</span><span class='hong'>【尸毒】</span><span class='tiaoJian'>）</span>+1【法术行动】。",
                    "guiJiangJunShiDu": "专属【尸毒】",
                    "guiJiangJunShiDu_info": "<span style=\"color:#CB690B\">【尸毒】</span>上限为3层。<br><span class='greentext'>被动【尸毒入体】</span><br><span class='tiaoJian'>（持有者回合开始时）</span>选择一项：<br>·+1<span style=\"color:#CB690B\">【尸毒】</span>；<br>·承受等同于<span style=\"color:#CB690B\">【尸毒】</span>层数的法术伤害③。<br><span class='greentext'>被动【尸化】</span><br><span class='tiaoJian'>（<span style=\"color:#CB690B\">【尸毒】</span>增加至3层）</span>立即【重置】，将手牌调整至4张，转化为【僵尸】。",
                    "baiYueFengMo": "专属【封魔】",
                    "baiYueFengMo_info": "持有者无法发动响应技与法术；<span class='tiaoJian'>（其回合结束时）</span>移除。",
                    "yinQi": "阴气",
                    "yinQi_info": "<span class='hong'>【阴气】</span>为鬼将军的专属指示物，上限为5。",
                    "shiDu": "专属【尸毒】",
                    "shiDu_info": "<span style=\"color:#CB690B\">【尸毒】</span>上限为3层。<br><span class='greentext'>被动【尸毒入体】</span><br><span class='tiaoJian'>（持有者回合开始时）</span>选择一项：<br>·+1<span style=\"color:#CB690B\">【尸毒】</span>；<br>·承受等同于<span style=\"color:#CB690B\">【尸毒】</span>层数的法术伤害③。<br><span class='greentext'>被动【尸化】</span><br><span class='tiaoJian'>（<span style=\"color:#CB690B\">【尸毒】</span>增加至3层）</span>立即【重置】，将手牌调整至4张，转化为【僵尸】。",
                    "shiDuRuTi": "被动【尸毒入体】",
                    "shiHua": "被动【尸化】",
                    "fuShiZhiQu": "被动【腐尸之躯】",
                    "fuShiZhiQu_info": "你不受【尸毒入体】和【尸化】影响；你承受的伤害-1。<br><span class='tiaoJian'>（回合结束时）</span>你-1<span class='hong'>【尸毒】</span>；若此时为0，恢复为原角色。",
                    "xingShiZouRou": "被动【行尸走肉】",
                    "xingShiZouRou_info": "你无法执行【法术行动】与【特殊行动】；你的手牌均视为暗系攻击牌，无需发动响应技转换。",
                    "shiDuQinRan": "被动【尸毒侵染】",
                    "shiDuQinRan_info": "<span class='tiaoJian'>（你每次造成实际攻击伤害后⑤）</span>受伤角色+1<span class='hong'>【尸毒】</span>，然后你-1<span class='hong'>【尸毒】</span>。",
                    "shiXuePuYao": "被动【嗜血扑咬】",
                    "shiXuePuYao_info": "你的主动攻击伤害+1；<span class='tiaoJian'>（伤害结算后）</span>你+2【治疗】。",
                    "niTianWenDao": "被动【逆天问道】",
                    "niTianWenDao_info": "你无法使用法术牌与【暗灭】。<span class='tiaoJian'>（你的攻击命中后②）</span>对命中目标施加【封魔】。",
                    "shuiMoShouHeTi": "被动【水魔兽合体】",
                    "shuiMoShouHeTi_info": "<span class='tiaoJian'>（每释放1次不同类型的角色法术）</span>计数+1；<span class='tiaoJian'>（计数＞4，或己方士气下降至小于5时）</span>转化为【水魔兽·拜月教主】，+2<span class='hong'>【洪水】</span>。",
                    "mieJueYiJi": "法术【灭绝一击】",
                    "mieJueYiJi_info": "<span class='tiaoJian'>（弃置1张【暗灭】【展示】）</span>将手牌补至上限，对目标对手造成X点法术伤害；X为此次摸牌数，最多为4。你+1<span class='lan'>【水晶】</span>。",
                    "duoHun": "法术【夺魂】",
                    "duoHun_info": "<span class='tiaoJian'>（弃置1张【圣光】【展示】）</span>其他所有角色各翻开并弃置牌库顶1张牌【展示】；翻开的牌不为法术牌者，其所属阵营士气-1。<span class='tiaoJian'>（若因此令对方阵营士气累计下降至少2点）</span>你+1<span style=\"color:#E02B17\">【宝石】</span>。",
                    "daZhouShe": "法术【大咒蛇】",
                    "daZhouShe_info": "<span class='tiaoJian'>（弃置1张【虚弱】【展示】）</span>对所有角色施加【虚弱】，你+1<span class='lan'>【法术行动】</span>。",
                    "duTunTianXia": "法术【毒吞天下】",
                    "duTunTianXia_info": "<span class='tiaoJian'>（弃置1张【中毒】【展示】）</span>对所有角色施加2层【中毒】。",
                    "qunMoLuanWu": "法术【群魔乱舞】",
                    "qunMoLuanWu_info": "<span class='tiaoJian'>（弃置1张【圣盾】【展示】）</span>对所有角色各释放1次【暗灭】。",
                    "guiJiang": "响应【鬼降】",
                    "guiJiang_info": "<span class='tiaoJian'>（受到伤害时，弃置1张【魔弹】【展示】）</span>取消此次伤害，改为令目标对手承受等量、同类别伤害。",
                    "shuiMoShouHuTi": "响应【水魔兽护体】",
                    "shuiMoShouHuTi_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（你的回合开始前发动）</span>弃置2张牌，移除自己面前的所有基础效果。",
                    "xingFengXueYu": "法术【腥风血雨】",
                    "xingFengXueYu_info": "<span style=\"color:#E02B17\">【宝石】</span>对所有角色各造成2点法术伤害；因此导致士气下降者获得1层【中毒】，否则获得【虚弱】。",
                    "shuiMoShouZhiQu": "被动【水魔兽之躯】",
                    "shuiMoShouZhiQu_info": "手牌上限+2；承受的法术伤害-1⑤。<span class='tiaoJian'>（你每次弃牌后）</span>+1【治疗】。",
                    "shuiMoShouZhiNu": "被动【水魔兽之怒】",
                    "shuiMoShouZhiNu_info": "<span class='tiaoJian'>（你承受伤害而令己方士气实际下降后）</span>你+1<span class='lan'>【水晶】</span>，+1<span class='hong'>【洪水】</span>。",
                    "nvWaZhiXue": "被动【女娲之血】",
                    "nvWaZhiXue_info": "<span class='tiaoJian'>（若你对赵灵儿造成了导致其士气下降的伤害）</span>你+3<span style=\"color:#E02B17\">【宝石】</span>，并将<span class='hong'>【洪水】</span>与<span class='hong'>【洪水】</span>上限补满，随后移除此技能。",
                    "yongSheng": "被动【永生】",
                    "yongSheng_info": "<span class='tiaoJian'>（每当有1位角色使用、弃置、展示1张水系或光系牌）</span>你+1<span class='hong'>【洪水】</span>。<span class='tiaoJian'>（【洪水】不为0时）</span>我方士气最低为1；<span class='tiaoJian'>（士气为1时）</span>每当我方受到伤害导致爆牌，<span class='hong'>【洪水】</span>与<span class='hong'>【洪水】</span>上限-X，X为此次爆牌数。",
                    "zhangDuZhen": "被动【瘴毒阵】",
                    "zhangDuZhen_info": "<span class='tiaoJian'>（你对目标角色造成伤害后）</span>目标角色获得1层【中毒】。",
                    "diLieTianBeng": "法术【地裂天崩】",
                    "diLieTianBeng_info": "<span class='tiaoJian'>（弃置1张【暗灭】【展示】）</span>所有角色将手牌补至上限，你+1【法术行动】。",
                    "taoTianJuLang": "启动【滔天巨浪】",
                    "taoTianJuLang_info": "<span class='lan'>【水晶】</span><span class='tiaoJian'>（弃置2张牌【展示】）</span>无视你的上限+2<span class='hong'>【洪水】</span>，但你的<span class='hong'>【洪水】</span>最大为8。",
                    "fengXueBingTian": "法术【风雪冰天】",
                    "fengXueBingTian_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（弃置所有法术牌【展示】）</span>对所有角色造成X点法术伤害；X＝⌈实际弃置的法术牌数÷2⌉＋1。",
                    "hongShui": "洪水",
                    "hongShui_info": "<span class='hong'>【洪水】</span>为水魔兽·拜月教主的专属指示物，初始上限为8。",
                    "fengMo": "专属【封魔】",
                    "fengMo_info": "持有者无法发动响应技与法术；<span class='tiaoJian'>（其回合结束时）</span>移除。",
                    "wuLingXianShu": "被动【五灵仙术】",
                    "wuLingXianShu_bingDong": "[法术]冰咒",
                    "wuLingXianShu_yunShi": "[法术]土咒",
                    "wuLingXianShu_huoQou": "[法术]火咒",
                    "wuLingXianShu_fengRen": "[法术]风咒",
                    "wuLingXianShu_leiJi": "[法术]雷咒",
                    "wuLingXianShu_info": "你可以使用元素师的独有技；<br>你造成的伤害均视为法术伤害。",
                    "nvWaHouRen": "被动【女娲后人】",
                    "nvWaHouRen_info": "【五灵仙术】与【武神】不能以满手牌角色为目标。<br>你每消耗1<span class='hong'>【灵力】</span>，+1<span style=\"color:#8E44AD\">【觉醒度】</span>；<span style=\"color:#8E44AD\">【觉醒度】</span>达到10时，你【横置】并进入【梦蛇形态】。",
                    "mengShe": "被动【梦蛇】",
                    "mengShe_info": "<span class='tiaoJian'>（【梦蛇形态】下）</span>失去【女娲后人】；你造成的所有伤害+1。",
                    "mengSheXingTai": "梦蛇形态",
                    "mengSheXingTai_info": "失去【女娲后人】；造成的攻击伤害与法术伤害+1。",
                    "tianSheZhang": "响应【天蛇杖】",
                    "tianSheZhang_info": "<span class='tiaoJian'>（造成法术伤害时）</span>+1<span class='hong'>【灵力】</span>；不能与【圣灵珠】同时发动。",
                    "wuQiChaoYuan": "法术【五气朝元】",
                    "wuQiChaoYuan_info": "<span class='tiaoJian'>（移除5<span class='hong'>【灵力】</span>）</span>我方所有角色+2【治疗】。",
                    "guanYinZhou": "法术【观音咒】",
                    "guanYinZhou_info": "目标角色+1【治疗】，然后你+1<span class='hong'>【灵力】</span>。",
                    "shengLingZhu": "响应【圣灵珠】",
                    "shengLingZhu_info": "<span class='tiaoJian'>（【五灵仙术】触发时，移除2或4<span class='hong'>【灵力】</span>）</span>令本次技能的目标数分别变为2或3。",
                    "shengLingPiFeng": "启动【圣灵披风】",
                    "shengLingPiFeng_info": "<span class='lan'>【水晶】</span><span class='hong'>【灵力】</span>+2。",
                    "wuShen": "法术【武神】",
                    "wuShen_info": "<span style=\"color:#E02B17\">【宝石】</span>对目标角色造成X+2点法术伤害；X为剩余能量数。",
                    "zhaoLingErRouQingXiaGu": "被动【柔情侠骨】",
                    "zhaoLingErRouQingXiaGu_info": "<span class='tiaoJian'>（李逍遥或林月如在场时）</span>【观音咒】可以改为令对应角色+1<span class='hong'>【剑】</span>或<span class='hong'>【气劲】</span>，你+1<span style=\"color:#8E44AD\">【觉醒度】</span>。<br><span class='tiaoJian'>（李逍遥、林月如每有一人在场）</span>【武神】伤害额外+1。",
                    "lingLi": "灵力",
                    "lingLi_info": "<span class='hong'>【灵力】</span>为赵灵儿专有指示物，上限为6。",
                    "jueXingDu": "觉醒度",
                    "jueXingDu_info": "<span style=\"color:#8E44AD\">【觉醒度】</span>为赵灵儿专属指示物，上限为10；每实际消耗1【灵力】便增加1点。",
                    "yuJianShu": "被动【御剑术】",
                    "yuJianShu_info": "<span class='tiaoJian'>（攻击命中后②）</span>+1<span class='hong'>【剑】</span>。",
                    "qiXingJian": "被动【七星剑】",
                    "qiXingJian_info": "能量上限+4。<span class='tiaoJian'>（造成的攻击伤害＞3时）</span>+1<span class='lan'>【水晶】</span>。",
                    "tianGangZhanQi": "被动【天罡战气】",
                    "tianGangZhanQi_info": "<span class='tiaoJian'>（行动阶段内第3次【攻击行动】的主动攻击）</span>此次攻击伤害+2。",
                    "feiLongTanYunShou": "被动【飞龙探云手】",
                    "feiLongTanYunShou_info": "你无法执行【提炼】。<span class='tiaoJian'>（其他角色提炼后）</span>翻开牌库顶1张牌【展示】；若为法术牌，获得其1个星石，优先获得<span class='lan'>【水晶】</span>。",
                    "tianShiFuFa": "响应【天师符法】",
                    "tianShiFuFa_info": "<span class='tiaoJian'>（攻击命中后②，弃置2张法术牌）</span>本次攻击伤害额外+1；<span class='tiaoJian'>（额外弃置1张法术牌）</span>伤害额外+1。",
                    "wanJianJue": "响应【万剑诀】",
                    "wanJianJue_info": "<span class='tiaoJian'>（【攻击行动】结束后，移除4</span><span class='hong'>【剑】</span><span class='tiaoJian'>）</span>视为对2个目标先后发动1次暗系攻击，攻击伤害-1；本回合不能再发动【醉仙望月步】。",
                    "xianFengYunTiShu": "响应【仙风云体术】",
                    "xianFengYunTiShu_info": "<span class='tiaoJian'>（受到可应战的攻击时①）</span>摸1张牌【展示】。",
                    "zuiXianWangYueBu": "响应【醉仙望月步】【回合限定：2】",
                    "zuiXianWangYueBu_info": "<span class='tiaoJian'>（【攻击行动】结束后，移除1</span><span class='hong'>【剑】</span><span class='tiaoJian'>）</span>翻开牌库顶1张牌【展示】，可以获得该牌。获得攻击牌时，+1【攻击行动】。本回合不能再发动【万剑诀】。",
                    "xiaoYaoShenJian": "启动【逍遥神剑】",
                    "xiaoYaoShenJian_info": "<span class='lan'>【水晶】</span>+2<span class='hong'>【剑】</span>，摸2张牌。",
                    "jiuShenZhou": "法术【酒神咒】",
                    "jiuShenZhou_info": "<span class='tiaoJian'>（</span><span class='lan'>【水晶】</span><span class='tiaoJian'>×X，移除所有能量）</span>对目标角色与自己造成等同于能量数量+2的法术伤害；【横置】并持续到下个回合开始时【重置】，期间手牌上限恒定为4。",
                    "liXiaoYaoRouQingXiaGu": "被动【柔情侠骨】",
                    "liXiaoYaoRouQingXiaGu_info": "<span class='tiaoJian'>（赵灵儿或林月如在场时）</span>【天罡战气】的伤害加成改为+1；<span class='tiaoJian'>（她们提炼后）</span>可以直接获得其1个星石；【醉仙望月步】优先由她们依次选择是否弃置1张手牌【展示】进行判定，你获得该判定牌。",
                    "liXiaoYaoRouQingXiaGuZhaoLingEr": "被动【柔情侠骨】",
                    "liXiaoYaoRouQingXiaGuLinYueRu": "被动【柔情侠骨】",
                    "jianY": "剑",
                    "jianY_info": "<span class='hong'>【剑】</span>为李逍遥专属指示物，上限为5。",
                    "linJiaQianJin": "被动【林家千金】",
                    "linJiaQianJin_info": "能量上限+2，游戏开始时获得2<span class='lan'>【水晶】</span><span class='tiaoJian'>（执行【特殊行动】时）</span>+1<span class='lan'>【水晶】</span>。",
                    "ningShenGuiYuan": "被动【凝神归元】",
                    "ningShenGuiYuan_info": "<span class='tiaoJian'>（队友的主动攻击命中后②）</span>+1<span class='hong'>【气劲】</span>；若因此溢出，+1【治疗】。",
                    "qiJianZhi": "响应【气剑指】",
                    "qiJianZhi_info": "<span class='tiaoJian'>（【攻击行动】结束后，移除1</span><span class='hong'>【气劲】</span><span class='tiaoJian'>）</span>+1【法术行动】。",
                    "yiYangZhi": "响应【一阳指】",
                    "yiYangZhi_info": "<span class='tiaoJian'>（主动攻击前①，移除1</span><span class='hong'>【气劲】</span><span class='tiaoJian'>）</span>将自己的1<span class='lan'>【水晶】</span>翻为<span style=\"color:#E02B17\">【宝石】</span>。<span class='tiaoJian'>（若命中）</span>移除目标1张盖牌；其没有盖牌时，本次攻击伤害额外+1。<span class='tiaoJian'>（若未命中）</span>再将自己的1<span class='lan'>【水晶】</span>翻为<span style=\"color:#E02B17\">【宝石】</span>。",
                    "qiJueJianQi": "响应【七诀剑气】",
                    "qiJueJianQi_info": "<span class='tiaoJian'>（【一阳指】结算前，移除2</span><span class='hong'>【气劲】</span><span class='tiaoJian'>）</span>若攻击命中，再结算1次【一阳指】的命中效果；否则将我方战绩区全部<span class='lan'>【水晶】</span>翻为<span style=\"color:#E02B17\">【宝石】</span>。",
                    "qiJueJianQi_mingZhong": "响应【七诀剑气】命中",
                    "qiJueJianQi_weiMingZhong": "响应【七诀剑气】未命中",
                    "zhenYuanHuTi": "响应【真元护体】",
                    "zhenYuanHuTi_info": "<span class='tiaoJian'>（承受法术伤害时，移除1</span><span class='hong'>【气劲】</span><span class='tiaoJian'>）</span>本次伤害-1。",
                    "zhanLongJue": "法术【斩龙诀】",
                    "zhanLongJue_info": "<span class='tiaoJian'>（移除全部<span class='hong'>【气劲】</span>，至少2）</span>对其他所有角色各造成X点法术伤害；X为移除数÷3，向上取整。",
                    "tongQianBiao": "响应【铜钱镖】",
                    "tongQianBiao_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（攻击时）</span>对目标角色造成1点法术伤害，+1<span class='hong'>【气劲】</span>；<span class='tiaoJian'>（若因此导致士气下降）</span>额外+1<span class='hong'>【气劲】</span>。",
                    "qianKunYiZhi": "法术【乾坤一掷】",
                    "qianKunYiZhi_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（移除全部能量）</span>对目标角色造成X点法术伤害；X＝⌈<span style=\"color:#E02B17\">【宝石】</span>数÷2⌉＋⌈<span class='lan'>【水晶】</span>数÷4⌉＋1。可以额外移除我方全部星石与全部星杯，每移除2颗星石或1个星杯，伤害+1。",
                    "linYueRuRouQingXiaGu": "被动【柔情侠骨】",
                    "linYueRuRouQingXiaGu_info": "<span class='tiaoJian'>（李逍遥或赵灵儿在场时）</span>【真元护体】可以对其发动；<span class='tiaoJian'>（你执行【特殊行动】时，若赵灵儿的能量少于2）</span>令其获得【林家千金】产生的<span class='lan'>【水晶】</span>。",
                    "qiJing": "气劲",
                    "qiJing_info": "<span class='hong'>【气劲】</span>为林月如专属指示物，上限为7。",
                    "miaoJiangShengNv": "被动【苗疆圣女】",
                    "miaoJiangShengNv_info": "你可以使用独有技【雷击】【火球】。<span class='tiaoJian'>（回合结束时）</span>从牌堆取得1张牌作为<span style=\"color:#537D28\">【蛊】</span>；<span class='tiaoJian'>（若额外移除我方战绩区X颗星石）</span>再取得X张牌作为<span style=\"color:#537D28\">【蛊】</span>。",
                    "miaoJiangShengNv_huoQou": "[法术]火球",
                    "miaoJiangShengNv_leiJi": "[法术]雷击",
                    "miaoJiangShengNv_lianGuShu": "【炼蛊术】",
                    "haiTangFuRen": "被动【海棠夫人】",
                    "haiTangFuRen_info": "<span class='tiaoJian'>（李逍遥在场时，其攻击命中后②）</span>将此次攻击使用的实体牌作为你的<span style=\"color:#537D28\">【蛊】</span>。",
                    "yanShaZhou": "响应【炎杀咒】",
                    "yanShaZhou_info": "<span class='tiaoJian'>（使用【火球】时）</span>令其伤害-1，改为对目标施加【爆炸蛊】。",
                    "tianLeiPo": "响应【天雷破】",
                    "tianLeiPo_info": "<span class='tiaoJian'>（使用【雷击】时）</span>不获得<span style=\"color:#E02B17\">【宝石】</span>，改为从牌堆取得2张牌作为<span style=\"color:#537D28\">【蛊】</span>。",
                    "yuFengShu": "响应【御蜂术】",
                    "yuFengShu_info": "<span class='tiaoJian'>（攻击拥有【中毒】的目标时）</span>本次伤害额外+1，并将1张手牌作为<span style=\"color:#537D28\">【蛊】</span>。<span class='tiaoJian'>（对已有【中毒】的目标施加【中毒】时）</span>对其造成1点法术伤害③。",
                    "jinCanWang": "法术【金蚕王】",
                    "jinCanWang_info": "<span class='tiaoJian'>（弃置5张不同系的</span><span style=\"color:#537D28\">【蛊】</span><span class='tiaoJian'>）</span>目标角色+2<span style=\"color:#E02B17\">【宝石】</span>，你+1<span style=\"color:#E02B17\">【宝石】</span>。",
                    "baoZhaGu": "法术【爆炸蛊】",
                    "baoZhaGu_info": "<span class='tiaoJian'>（弃置1张火系</span><span style=\"color:#537D28\">【蛊】</span><span class='tiaoJian'>）</span>对目标施加【爆炸蛊】。<span class='tiaoJian'>（其承受火系攻击或火系法术伤害后⑤）</span>再承受2点法术伤害③，随后移除【爆炸蛊】。",
                    "sanShiGu": "法术【三尸蛊】【回合限定】",
                    "sanShiGu_info": "<span class='tiaoJian'>（弃置1张法术</span><span style=\"color:#537D28\">【蛊】</span><span class='tiaoJian'>）</span>视为对目标使用1次【中毒】，然后+1【攻击行动】或【法术行动】。",
                    "yinGu": "响应【隐蛊】",
                    "yinGu_info": "<span class='tiaoJian'>（己方士气即将下降时，弃置1张光系</span><span style=\"color:#537D28\">【蛊】</span><span class='tiaoJian'>）</span>取消此次士气下降。",
                    "wanGuShiTian": "法术【万蛊蚀天】",
                    "wanGuShiTian_info": "<span style=\"color:#E02B17\">【宝石】</span><span class='tiaoJian'>（移除全部</span><span style=\"color:#537D28\">【蛊】</span><span class='tiaoJian'>）</span>随机对场上角色使用共X+Y次【中毒】；X为实际移除的<span style=\"color:#537D28\">【蛊】</span>数，Y为场上角色数÷2，向下取整。",
                    "gu": "蛊",
                    "gu_info": "阿奴的专属盖牌，上限为9；<span class='tiaoJian'>（超过上限时）</span>选择多余的<span style=\"color:#537D28\">【蛊】</span>弃置。",
                    "wuDuZhu": "专属【五毒珠】",
                    "wuDuZhu_info": "游戏开始时持有【五毒珠】。<span class='tiaoJian'>（持有时）</span>不会承受【中毒】伤害。<span class='tiaoJian'>（回合结束时）</span>选择一项：<br>①将【五毒珠】传给左手边角色；<br>②移除我方战绩区1颗星石，将其传给目标角色。",
                },
            },
            "intro": "添加角色赵灵儿、李逍遥、林月如、阿奴、拜月教主、鬼将军、蛇妖男、狐妖女及不可选的水魔兽、僵尸转化形态。",
            "author": "蒙牛",
            "diskURL": "",
            "forumURL": "",
			"version": "2.29",
        },
        "files": {
            "character": [
                "zhaoLingEr.jpg",
                "zhaoLingEr_mengShe.webp",
                "liXiaoYao.jpg",
                "linYueRu.jpg",
                "aNu.jpg",
                "baiYueJiaoZhu.webp",
                "shuiMoShouBaiYueJiaoZhu.webp",
                "guiJiangJun.webp",
                "suMingJiangShi.webp",
                "sheYaoNan.webp",
                "huYaoNv.webp",
            ],
            "card": [],
            "skill": [
                "mark_lingLi.webp",
                "mark_jianY.webp",
                "mark_qiJing.webp",
                "mark_gu.webp",
                "mark_wuDuZhu.webp",
                "mark_fengMo.webp",
                "mark_hongShui.webp",
                "mark_jueXingDu.webp",
                "mark_yinQi.webp",
                "mark_shiDu.webp",
            ],
            "audio": [
                "audio/action/zhaoLingEr/gouMai.mp3",
                "audio/action/zhaoLingEr/heCheng.mp3",
                "audio/action/zhaoLingEr/tiLian.mp3",
                "audio/action/liXiaoYao/gouMai.mp3",
                "audio/action/liXiaoYao/heCheng.mp3",
                "audio/action/liXiaoYao/tiLian.mp3",
                "audio/action/linYueRu/gouMai.mp3",
                "audio/action/linYueRu/heCheng.mp3",
                "audio/action/linYueRu/tiLian.mp3",
                "audio/action/aNu/gouMai.mp3",
                "audio/action/aNu/heCheng.mp3",
                "audio/action/aNu/tiLian.mp3",
                "audio/action/baiYueJiaoZhu/gouMai.mp3",
                "audio/action/baiYueJiaoZhu/heCheng.mp3",
                "audio/action/baiYueJiaoZhu/tiLian.mp3",
                "audio/action/shuiMoShouBaiYueJiaoZhu/gouMai.mp3",
                "audio/action/shuiMoShouBaiYueJiaoZhu/heCheng.mp3",
                "audio/action/shuiMoShouBaiYueJiaoZhu/tiLian.mp3",
                "audio/action/guiJiangJun/gouMai.mp3",
                "audio/action/guiJiangJun/heCheng.mp3",
                "audio/action/guiJiangJun/tiLian.mp3",
                "audio/action/sheYaoNan/gouMai.mp3",
                "audio/action/sheYaoNan/heCheng.mp3",
                "audio/action/sheYaoNan/tiLian.mp3",
                "audio/action/huYaoNv/gouMai.mp3",
                "audio/action/huYaoNv/heCheng.mp3",
                "audio/action/huYaoNv/tiLian.mp3",
                "audio/skill/sheYaoNan_yinLongCangZhenEnd.mp3",
                "audio/skill/sheYaoNan_yinLongCangZhenSteal.mp3",
                "audio/skill/sheYaoNan_kuangSheLianZhan.mp3",
                "audio/skill/sheYaoNan_suMingXianYueZhan.mp3",
                "audio/skill/sheYaoNan_yinLongXiangYi.mp3",
                "audio/skill/huYaoNv_yinLongCangZhenEnd.mp3",
                "audio/skill/huYaoNv_yinLongCangZhenSteal.mp3",
                "audio/skill/huYaoNv_meiYingLianXi.mp3",
                "audio/skill/huYaoNv_suMingHuiMeng.mp3",
                "audio/skill/huYaoNv_suMingLeiZhou.mp3",
                "audio/skill/huYaoNv_suMingWuLeiZhou.mp3",
                "audio/skill/huYaoNv_yinLongXiangYi.mp3",
                "audio/skill/guiJiangJun_jiangJunZhong.mp3",
                "audio/skill/guiJiangJun_lianYuZhua.mp3",
                "audio/skill/guiJiangJun_shiDuZhangQi.mp3",
                "audio/skill/guiJiangJun_guiJiang.mp3",
                "audio/skill/guiJiangJun_xueMoShenGong.mp3",
                "audio/skill/guiJiangJun_shiHua.mp3",
                "audio/bgm/taoHuaHuanMeng.mp3",
                "audio/bgm/qingYuan.mp3",
                "audio/bgm/yuJianFuMo.mp3",
                "audio/bgm/niTianErXing.mp3",
                "audio/bgm/niTianErXing2.mp3",
                "audio/bgm/bingXiongZhanWei.mp3",
                "audio/bgm/xinJiRuFen.mp3",
                "audio/bgm/biWuZhaoQin.mp3",
                "audio/bgm/yunGuHeFeng.mp3",
                "audio/bgm/ending.mp3",
                "audio/bgm/dateALive.mp3",
                "audio/bgm/fengYiYangDeYongShi.mp3",
                "audio/bgm/swordland.mp3",
                "audio/bgm/gangGangJiJi.mp3",
                "audio/bgm/douPoCangQiong.mp3",
                "audio/bgm/pigstep.mp3",
                "audio/skill/yuJianShu.mp3",
                "audio/skill/qiXingJian.mp3",
                "audio/skill/tianGangZhanQi.mp3",
                "audio/skill/feiLongTanYunShou.mp3",
                "audio/skill/tianShiFuFa.mp3",
                "audio/skill/wanJianJue.mp3",
                "audio/skill/xianFengYunTiShu.mp3",
                "audio/skill/zuiXianWangYueBu.mp3",
                "audio/skill/xiaoYaoShenJian.mp3",
                "audio/skill/jiuShenZhou.mp3",
                "audio/skill/liXiaoYaoRouQingXiaGu.mp3",
                "audio/skill/liXiaoYaoRouQingXiaGuZhaoLingEr.mp3",
                "audio/skill/liXiaoYaoRouQingXiaGuLinYueRu.mp3",
                "audio/skill/linJiaQianJin.mp3",
                "audio/skill/linJiaQianJinZhaoLingEr.mp3",
                "audio/skill/ningShenGuiYuan.mp3",
                "audio/skill/qiJianZhi.mp3",
                "audio/skill/yiYangZhi.mp3",
                "audio/skill/qiJueJianQi.mp3",
                "audio/skill/zhenYuanHuTi.mp3",
                "audio/skill/zhanLongJue.mp3",
                "audio/skill/tongQianBiao.mp3",
                "audio/skill/qianKunYiZhi.mp3",
                "audio/skill/miaoJiangShengNv.mp3",
                "audio/skill/miaoJiangShengNvLianGu.mp3",
                "audio/skill/haiTangFuRen.mp3",
                "audio/skill/yanShaZhou.mp3",
                "audio/skill/tianLeiPo.mp3",
                "audio/skill/yuFengShu.mp3",
                "audio/skill/jinCanWang.mp3",
                "audio/skill/baoZhaGu.mp3",
                "audio/skill/sanShiGu.mp3",
                "audio/skill/yinGu.mp3",
                "audio/skill/wanGuShiTian.mp3",
                "audio/skill/aNuQianKunYiZhi.mp3",
                "audio/skill/wuDuZhu.mp3",
                "audio/skill/niTianWenDao.mp3",
                "audio/skill/fengMo.mp3",
                "audio/skill/shuiMoShouHeTi.mp3",
                "audio/skill/mieJueYiJi.mp3",
                "audio/skill/duoHun.mp3",
                "audio/skill/daZhouShe.mp3",
                "audio/skill/duTunTianXia.mp3",
                "audio/skill/qunMoLuanWu.mp3",
                "audio/skill/guiJiang.mp3",
                "audio/skill/shuiMoShouHuTi.mp3",
                "audio/skill/xingFengXueYu.mp3",
                "audio/skill/shuiMoShouZhiQu.mp3",
                "audio/skill/shuiMoShouZhiNu.mp3",
                "audio/skill/nvWaZhiXue.mp3",
                "audio/skill/yongSheng.mp3",
                "audio/skill/zhangDuZhen.mp3",
                "audio/skill/diLieTianBeng.mp3",
                "audio/skill/taoTianJuLang.mp3",
                "audio/skill/fengXueBingTian.mp3",
                "audio/skill/hongShui.mp3",
                "audio/skill/wuLingXianShu.mp3",
                "audio/skill/nvWaHouRen.mp3",
                "audio/skill/mengShe.mp3",
                "audio/skill/tianSheZhang.mp3",
                "audio/skill/wuQiChaoYuan.mp3",
                "audio/skill/guanYinZhou.mp3",
                "audio/skill/shengLingZhu.mp3",
                "audio/skill/shengLingPiFeng.mp3",
                "audio/skill/wuShen.mp3",
            ],
        },
        "connect": true,
    };
});
