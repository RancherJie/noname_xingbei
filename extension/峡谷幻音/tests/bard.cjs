const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
let pack;
const lib = {skill: {}, element: {player: {}}, filter: {
    targetEnabled: () => true, targetEnabled2: () => true, targetEnabled3: () => true,
    filterTrigger: () => true, cardDiscardable: () => true,
}};
const get = {type: c => c.type, is: {zhuDongGongJi: e => !e.yingZhan,
    xingDong: e => e.action === true}, damageEffect2: () => 1};
const game = {import: (kind, fn) => { pack = fn(lib, game, {}, get, {}, {}); },
    addGlobalSkill() {}, filterPlayer: () => {
        const result = [];
        result.randomGet = () => result[0];
        return result;
    }, jiChuXiaoGuo: {all: {add() {}}}};
const source = fs.readFileSync(require('node:path').join(__dirname, '..', 'extension.js'), 'utf8');
vm.runInNewContext(source, {game});
Object.assign(lib.skill, pack.package.skill.skill);
const skills = lib.skill;
function player() {
    const p = {playerid: 'bard', side: true, storage: {}, marks: {}, skills: new Set(),
        isIn: () => true, hasSkill(id) {return this.skills.has(id);},
        addSkill(id) {this.skills.add(id);}, removeSkill(id) {this.skills.delete(id);},
        countZhiShiWu(id) {return this.marks[id] || 0;},
        async addZhiShiWu(id, n) {this.marks[id] = Math.min(lib.skill[id].intro.max, this.countZhiShiWu(id)+n);},
        async removeZhiShiWu(id, n) {this.marks[id] = Math.max(0,this.countZhiShiWu(id)-n);},
        countNengLiang: () => 2, async removeNengLiang(id,n) {this.paid = [id,n];},
        addGongJi() {this.storage.gongJi++;}, addFaShu() {this.storage.faShu++;},
        getExpansions: () => [], getSkills: () => [], countCards: () => 0,
    }; return p;
}
async function main() {
    const bard = player();
    assert(pack.package.character.character.baDe);
    assert.equal(pack.package.character.character.baDe[2], 5);
    assert.equal(skills.shenQiLvCheng.usable,1);
    bard.marks = {tiaoHeZhiYin:0};
    assert(skills.muLingSuiXing.filter({triggername:'gameStart'},bard));
    await skills.muLingSuiXing.content({triggername:'gameStart'}, {}, bard);
    assert.equal(bard.marks.muLing,1, '游戏开始获得1木灵');
    assert(!skills.muLingSuiXing.filter({triggername:'phaseBegin'},bard), '调和之音不足3时回合开始不增加木灵');
    bard.marks.tiaoHeZhiYin=3;
    assert(skills.muLingSuiXing.filter({triggername:'phaseBegin'},bard));
    await skills.muLingSuiXing.content({triggername:'phaseBegin'}, {}, bard);
    assert.equal(bard.marks.muLing,2, '调和之音不少于3时回合开始增加1木灵');
    assert(skills.muLingSuiXing.filter({triggername:'faShuEnd',action:true},bard));
    await skills.muLingSuiXing.content({triggername:'faShuEnd'}, {}, bard);
    assert.equal(bard.marks.muLing,3, '法术行动结束后增加1木灵');
    bard.marks.tiaoHeZhiYin=0;
    assert(!skills.muLingSuiXing.filter({triggername:'faShuEnd',action:true},bard));
    assert.equal(bard.marks.muLing,3, '补至不减少现有木灵');
    const ally=player(), enemy=player(); enemy.side=false;
    assert(!skills.xingJieShuFu.filterTarget({},bard,ally));
    assert(skills.xingJieShuFu.filterTarget({},bard,enemy));
    enemy.addSkill('baDeNingZhi');
    assert(!skills.xingJieShuFu.filterTarget({},bard,enemy));
    assert(!skills.tiaoHeMingYun.filterTarget({},bard,enemy));
    enemy.removeSkill('baDeNingZhi');
    await skills.tiaoHeMingYun.content({targets:[ally,enemy]}, {}, bard);
    assert.equal(bard.paid[1],2);
    assert(ally.hasSkill('baDeNingZhi') && enemy.hasSkill('baDeNingZhi'));
    let cancelled=false;
    const damage={num:4,cancel(){cancelled=true;}};
    skills.baDeNingZhi.content({triggername:'damageBefore'},damage,enemy);
    assert.equal(damage.num,0); assert(cancelled);
    skills.baDeNingZhi.content({triggername:'phaseBefore'}, {},enemy);
    assert(!enemy.hasSkill('baDeNingZhi'));
    assert(skills.baDeNingZhi.skillBlocker('someSkill'));
    assert(!skills.baDeNingZhi.skillBlocker('baDeNingZhi'));
    bard.storage={gongJi:2,faShu:1,baDePortalPending:['gongJi','faShu']};
    skills.baDePortalAction.content({triggername:'xingDongBefore'}, {},bard);
    assert.equal(bard.storage.gongJi,3); assert.equal(bard.storage.faShu,2);
    skills.baDePortalAction.content({triggername:'gongJiEnd'},
        {action:true,getParent:()=>({xingDong:'gongJi'})},bard);
    // 本体在行动结束后扣除已使用次数。
    bard.storage.gongJi--;
    skills.baDePortalAction.content({triggername:'teShuEnd'}, {},bard);
    assert.equal(bard.storage.gongJi,2);
    assert.equal(bard.storage.faShu,1, '不删除其他来源行动');
    bard.skills.add('baDeChiHuan');
    bard.storage={gongJi:0,faShu:0,baDePortalPending:['gongJi']};
    skills.baDePortalAction.content({triggername:'xingDongBefore'}, {},bard);
    assert.equal(bard.storage.gongJi,0);
  assert(!skills.lvZheDeZhaoHuan.subSkill.record.filter({yingZhan:true,target:enemy},bard));
    bard.skills.delete('baDeChiHuan');
    bard.marks={tiaoHeZhiYin:0};
    const dropped=player(); dropped.addSkill('baDeSanLuo');
    bard.chooseTarget=()=>({set(){return this;},forResultTargets:async()=>[dropped]});
    const action={action:true,baDeTargets:[dropped]};
    assert(skills.lvZheDeZhaoHuan.subSkill.collect.filter(action,bard));
    await skills.lvZheDeZhaoHuan.subSkill.collect.content({},action,bard);
    assert.equal(bard.countZhiShiWu('tiaoHeZhiYin'),1);
    assert(!dropped.hasSkill('baDeSanLuo'));
    assert(!skills.lvZheDeZhaoHuan.subSkill.collect.filter(action,bard));
    console.log('巴德分支测试通过：成长、目标、费用、凝滞、通道行动、收音去重。');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
