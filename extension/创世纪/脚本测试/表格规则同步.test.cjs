const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {test}=require('node:test');
function load(){let pack;const lib={skill:{},filter:{}},game={};game.import=(kind,fn)=>pack=fn(lib,game,{}, {},{},{});vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8'),{game});Object.assign(lib.skill,pack.package.skill.skill);return lib.skill;}
test('荣誉祝福仅增强拥有者的法术伤害，武器祝福覆盖主动与应战攻击',async()=>{
 const s=load(),p={},other={},calls=[];s.tianQiZheZhuFuManager={hasCard:()=>true,recordTrigger:(p,id)=>calls.push('record:'+id),removeCard:async(p,id)=>calls.push('remove:'+id)};
 assert.equal(s.rongYuZhuFu.trigger.source,'zaoChengShangHai');
 assert.equal(s.rongYuZhuFu.filter({faShu:true,source:p},p),true);
 assert.equal(s.rongYuZhuFu.filter({faShu:false,source:p},p),false);
 assert.equal(s.rongYuZhuFu.filter({faShu:true,source:other},p),false);
 await s.rongYuZhuFu.content({}, {changeDamageNum:n=>calls.push(n)},p);
 assert.deepEqual(calls,['record:rongYuZhuFu','remove:rongYuZhuFu',1]);
 for(const yingZhan of [true,false])assert.equal(s.wuQiZhuFu.filter({player:p,yingZhan},p),true);
 assert.equal(s.wuQiZhuFu.filter({player:other},p),false);
});
for(const n of [0,1,3])test('念气罩目标'+n+'张牌，获得治疗后足额执行弃牌，不另问是否弃牌',async()=>{
 const s=load(),calls=[];const t={isIn:()=>true,countCards:()=>n,changeZhiLiao:async()=>calls.push('heal'),chooseBool:()=>assert.fail('弃牌不是可选'),chooseToDiscard:async(zone,count,forced)=>{assert.equal(zone,'h');assert.equal(count,1);assert.equal(forced,true);calls.push('discard');}};
 const p={countZhiShiWu:()=>2,chooseControl:()=>({set(){return this;},forResultControl:async()=> '移除2【念气】'}),removeZhiShiWu:async()=>calls.push('pay')};
 assert.equal(s.nianQiZhao.filterTarget(null,p,{side:undefined,isIn:()=>true}),true);
 await s.nianQiZhao.content({target:t},{},p);assert.deepEqual(calls,n?['pay','heal','discard']:['pay','heal']);
});
for(const [blood,extra] of [[2,false],[3,false],[4,false],[4,true]])test('嗜魂封魔斩'+blood+'血气，额外支付='+extra,async()=>{
 const s=load(),p={blood,countZhiShiWu(){return this.blood;},async removeZhiShiWu(id,n){assert.equal(n,2);this.blood-=n;},chooseBool(){assert(this.blood>=2);return {set(){return this;},forResultBool:async()=>extra};}},e={target:{},yingZhan:false,bonus:0,blocked:false,changeDamageNum(n){this.bonus+=n;},wuFaYingZhan(){this.blocked=true;}};
 assert.equal(s.shiHunFengMoZhan.filter(e,p),true);assert.equal(s.shiHunFengMoZhan.filter({...e,yingZhan:true},p),false);
 await s.shiHunFengMoZhan.content({},e,p);assert.equal(e.bonus,1);assert.equal(e.blocked,extra);assert.equal(p.blood,blood-2-(extra?2:0));
});
for(const n of [0,1,2,3])test('死亡抗拒禁疗期间可发动，'+n+'张手牌仍按效果足额弃2张',async()=>{
 const s=load(),calls=[];const p={countZhiLiao:()=>0,countZhiShiWu:()=>2,hasSkill:()=>true,countCards:()=>n,removeZhiShiWu:async()=>calls.push('pay'),changeZhiLiao:async()=>calls.push('healing-attempt'),chooseToDiscard:async(zone,count,forced)=>{assert.equal(zone,'h');assert.equal(count,2);assert.equal(forced,true);calls.push('discard');}};
 assert.equal(s.siWangKangJu.filter({},p),true);await s.siWangKangJu.content({}, {},p);assert.deepEqual(calls,n>=2?['pay','healing-attempt','discard']:['pay','healing-attempt']);
});
test('守护徽章仍仅在正数伤害时消耗',()=>{const s=load(),p={};s.tianQiZheZhuFuManager.hasCard=()=>true;assert.equal(s.shouHuHuiZhang.filter({target:p,damageNum:0},p),false);assert.equal(s.shouHuHuiZhang.filter({target:p,damageNum:1},p),true);});
