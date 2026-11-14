const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const root = path.resolve(__dirname, '../..');
const acorn = require(path.join(root, '参考文件/文档/DIY角色/技能描述工具/脚本依赖/acorn.cjs'));

function load() {
    let pack;
    const lib = { skill: {}, translate: {}, filter: {} };
    const game = {}, get = { xiBie: card => card.xiBie };
    const context = vm.createContext({ lib, game, get, ui: {}, ai: {}, _status: {} });
    game.import = (_kind, factory) => { pack = factory(lib, game, {}, get, {}, context._status); };
    vm.runInContext(fs.readFileSync(path.join(root, '创世纪/extension.js'), 'utf8'), context);
    Object.assign(lib.skill, pack.package.skill.skill);
    Object.assign(lib.translate, pack.package.skill.translate);
    return { pack, lib, game, get, context };
}

for (const result of ['成功', '大成功']) {
    for (const handCounts of [[0], [0, 2]]) {
        test('酸雨云' + result + '允许无牌目标，手牌数=' + handCounts, async () => {
            const f = load(), discarded = [], calls = [];
            const targets = handCounts.map((count, index) => ({
                isIn: () => true,
                countCards: () => count,
                chooseToDiscard: async (zone, amount, forced) => {
                    assert.equal(zone, 'he'); assert.equal(amount, 1); assert.equal(forced, true);
                    assert(count >= 1); discarded.push(index);
                },
            }));
            const material = {};
            f.lib.skill.shiYanCaiLiao.chooseMatching = async () => material;
            f.lib.skill.luMiYaShiYan.run = async () => ({ result });
            f.lib.skill.luMiYaShiYan.finish = async () => calls.push('finish');
            f.game.filterPlayer = filter => targets.filter(filter);
            const selected = result === '成功' ? targets.slice(0, 1) : targets;
            selected.sortBySeat = () => selected;
            const player = {
                chooseTarget(range, forced, prompt, filter) {
                    assert.equal(forced, result === '成功');
                    assert.equal(filter(null, player, targets[0]), true);
                    assert.equal(filter(null, player, { isIn: () => false }), false);
                    assert(!prompt.includes('有可弃置牌'));
                    calls.push('choose');
                    return { set() { return this; }, forResultTargets: async () => selected };
                },
            };
            await f.lib.skill.suanYuYun.content({}, {}, player);
            assert.deepEqual(calls, ['choose', 'finish']);
            assert.deepEqual(discarded, result === '大成功' && handCounts.length > 1 ? [1] : []);
        });
    }
}

test('煌龙偃月变身后按全部炫纹计数，常态及应战限制保留', () => {
    const f = load(), s = f.lib.skill.huangLongYanYue;
    for (const transformed of [false, true]) {
        for (const suits of [[], ['shui'], ['huo', 'feng'], ['an'], ['guang', 'an', 'shui']]) {
            const cards = suits.map(xiBie => ({ xiBie }));
            const player = { getExpansions: () => cards, isHengZhi: () => transformed };
            const should = suits.length > 0 && (transformed || suits.some(s => ['an', 'guang'].includes(s)));
            assert.equal(s.filter({ yingZhan: false }, player), should);
            assert.equal(s.filter({ yingZhan: true }, player), false);
            if (should) {
                let amount;
                f.context.player = player;
                f.context.trigger = { target: { faShuDamage: n => { amount = n; } } };
                s.content();
                assert.equal(amount, Math.min(2, transformed ? suits.length : suits.filter(s => ['an', 'guang'].includes(s)).length));
            }
        }
    }
});

function characterIntro(f, name) {
    const core = fs.readFileSync(path.join(root, '../noname/get/index.js'), 'utf8');
    let method;
    function walk(node) {
        if (!node || typeof node !== 'object') return;
        if (node.type === 'MethodDefinition' && node.key.name === 'skillintro') method = node.value;
        for (const [key, value] of Object.entries(node)) {
            if (['start', 'end', 'raw'].includes(key)) continue;
            if (Array.isArray(value)) value.forEach(walk);
            else if (value && typeof value === 'object') walk(value);
        }
    }
    walk(acorn.parse(core, { ecmaVersion: 'latest', sourceType: 'module' }));
    assert(method, 'Current core character introduction renderer must exist');
    f.get.character = (id, index) => f.pack.package.character.character[id][index];
    f.get.translation = id => f.lib.translate[id] || id;
    f.get.skillInfoTranslation = id => f.lib.translate[id + '_info'];
    return vm.runInContext('(function' + core.slice(method.start, method.end) + ')', f.context)(name);
}

test('四种祝福通过本体角色介绍展示，并且仅使用空说明技能', () => {
    const f = load(), intro = characterIntro(f, 'tianQiZhe');
    const ids = ['rongYuZhuFu', 'shouHuHuiZhang', 'wuQiZhuFu', 'tianQiZheTianShiZhuFu'];
    const skills = f.pack.package.character.character.tianQiZhe[3];
    for (const id of ids) {
        const display = id + '_description';
        assert(skills.includes(display)); assert(!skills.includes(id));
        assert.equal(Object.keys(f.lib.skill[display]).length, 0);
        assert.equal(f.lib.translate[display + '_info'], f.lib.translate[id + '_info']);
        const card = f.lib.skill.tianQiZheZhuFuManager.cardNames[id];
        assert(f.pack.package.card.card[card], '内部牌名必须对应已注册的实体牌');
        assert.equal(f.pack.package.card.translate[card + '_info'], f.lib.translate[id + '_info']);
        assert(intro.includes(f.lib.translate[id]));
        assert(intro.includes(f.lib.translate[id + '_info']));
        assert(f.lib.translate[id].startsWith('专属【'));
        const type = id === 'tianQiZheTianShiZhuFu' ? '响应' : '被动';
        assert(f.lib.translate[id + '_info'].startsWith("<span class='greentext'>" + type + '【'));
    }
    assert(!intro.includes('天启者专属卡管理'));
    assert(f.lib.skill.tianQiZheZhuFuManager, '隐藏说明后保留管理技能');
});

function coreCreateCard(f) {
    const source = fs.readFileSync(path.join(root, '../noname/game/index.js'), 'utf8');
    let method;
    function walk(node) {
        if (!node || typeof node !== 'object') return;
        if (node.type === 'MethodDefinition' && node.key.name === 'createCard') method = node.value;
        for (const [key, value] of Object.entries(node)) {
            if (['start', 'end', 'loc'].includes(key)) continue;
            if (Array.isArray(value)) value.forEach(walk);
            else if (value && typeof value === 'object') walk(value);
        }
    }
    walk(acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' }));
    assert(method);
    const lib = { card: f.pack.package.card.card };
    const ui = { create: { card: () => ({ storage: {}, init(data) { this.name = data[2]; return this; } }) } };
    return vm.runInNewContext('(function' + source.slice(method.start, method.end) + ')', { lib, ui });
}

test('祝福通过本体创建牌函数创建已注册的实体牌，四种内部映射均有效', async () => {
    const f = load(), manager = f.lib.skill.tianQiZheZhuFuManager;
    const create = coreCreateCard(f), expansions = {}, created = [];
    f.game.createCard2 = name => { const card = create(name); created.push(card); return card; };
    const target = {
        getExpansions: id => expansions[id] || [],
        addToExpansion: card => ({ gaintag: { add(id) { (expansions[id] ||= []).push(card); } } }),
    };
    for (const id of manager.cardSkills) {
        f.get.translation = key => f.lib.translate[key] || key;
        f.lib.skill.tianQiZheZhuFuManager.getAvailableCards = () => [id];
        const player = { chooseControl(controls) { return { set() { return this; }, forResultControl: async () => controls[0] }; } };
        await f.lib.skill.tianQiZheZhuFu.content({ target }, {}, player);
        assert.equal(expansions[id].length, 1);
        assert.equal(expansions[id][0].name, manager.cardNames[id]);
        assert(f.pack.package.card.card[expansions[id][0].name].image);
    }
    assert.equal(created.length, 4);
});

test('天启之珠用本体创建牌函数放置四种专属卡并保留计数标记', async () => {
    const f = load(), create = coreCreateCard(f), expansions = {}, paid = [];
    f.game.createCard2 = name => create(name);
    const owner = {
        playerid: 'owner', side: 0, storage: {}, syncStorage() {}, markSkill() {},
        removeNengLiang: async (id, count) => paid.push([id, count]),
        getExpansions: id => expansions[id] || [],
        addToExpansion: card => ({ gaintag: { add(id) { (expansions[id] ||= []).push(card); } } }),
    };
    f.game.filterPlayer = filter => { const list = [owner].filter(filter); list.sortBySeat = () => list; return list; };
    await f.lib.skill.tianQiZhiZhu.content({}, {}, owner);
    assert.deepEqual(paid, [['baoShi', 2]]);
    for (const id of f.lib.skill.tianQiZheZhuFuManager.cardSkills) {
        const card = expansions[id][0];
        assert.equal(card.storage.tianQiZhiZhuToken, owner.storage.tianQiZhiZhuToken);
        assert.equal(card.storage.tianQiZhiZhuOwner, 'owner');
        assert(f.pack.package.card.card[card.name]);
    }
});

test('变身后的圣光保持可用，其他法术牌禁用且可转为攻击', () => {
    const f = load(), s = f.lib.skill.bianShenBeiYaNa;
    f.get.name = card => card.name;
    f.get.type = card => card.type;
    const transformed = { isHengZhi: () => true };
    const holy = { name: 'shengGuang', type: 'faShu' };
    const spell = { name: 'moDan', type: 'faShu' };
    assert.equal(s.mod.cardEnabled(holy, transformed), undefined);
    assert.equal(s.mod.cardEnabled(spell, transformed), false);
    assert.equal(s.subSkill.zhuanHuan.filterCard(holy, transformed, { name: 'gongJi' }), false);
    assert.equal(s.subSkill.zhuanHuan.filterCard(spell, transformed, { name: 'gongJi' }), true);
    assert.equal(s.mod.cardEnabled(spell, { isHengZhi: () => false }), undefined);
});

test('魔狱血刹在本体角色介绍中完整显示形态效果和到期时点', () => {
    const f = load(), intro = characterIntro(f, 'yuXueMoShen');
    const info = f.lib.translate.moYuXueSha_info;
    assert(intro.includes(info));
    for (const text of ['不能获得【治疗】', '任意角色承受实际伤害后', '【血气】', '你的下下个回合开始时']) assert(info.includes(text));
    assert(f.lib.translate.xueShaXingTai_info.includes('不能获得【治疗】'));
});
