// Run: node 轮回遗梦/tests/xie-jian-xian-ai.cjs
// Deterministic decision fixtures, not a substitute for engine or multiplayer play.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8');
const lib={skill:{},config:{},translate:{},card:{},filter:{cardEnabled:c=>!c.disabled}};
const status={};
const morale={a:15,b:15};
const get={type:c=>c.type,name:c=>c.name,value:c=>c.value??3,shiQi:side=>morale[side],translation:c=>c.name,position:c=>c.position||'d'};
let pack;
const game={players:[],jiChuXiaoGuo:{all:['zhongDu','xuRuo','shengDun']},import:(kind,fn)=>{pack=fn(lib,game,{},get,{},status);}};
vm.runInNewContext(source,{game,console});
Object.assign(lib.skill,pack.package.skill.skill);
const A=lib.lhymXieJianXian.ai;
const card=(name='attack',type='gongJi',value=3)=>({name,type,value});
function player(id,side,thought=0,hand=[],skills=[]){
    return {playerid:id,side,thought,hand,skills:new Set(skills),storage:{},limit:6,zhiLiao:0,gem:1,crystal:1,
        isIn(){return !this.out;},hasSkill(s){return this.skills.has(s);},hasSkillTag(){return false;},
        countZhiShiWu(){return this.thought;},getCards(){return this.hand;},
        countCards(zone,filter){return filter?this.hand.filter(filter).length:this.hand.length;},
        getHandcardLimit(){return this.limit;},countEmptyNengLiang(){return Math.max(0,5-this.gem-this.crystal);},
        countNengLiang(t){return t==='baoShi'?this.gem:this.crystal;},canBiShaShuiJing(){return this.gem+this.crystal>0;},
        canBiShaBaoShi(){return this.gem>0;},hasJiChuXiaoGuo(s){return this.skills.has(s);},
        canUseXingBei(c,t){return !c.disabled&&!t.untargetable&&(c.type!=='gongJi'||t.side!==this.side);},
    };
}
let p,e,f;
function board(){
    p=player('p','a',5,[card(),card()],['lhym_liuJieZhiWai','lhym_xieQiLiHun','lhym_xieJianZhan','lhym_xieLingChuQiao']);
    e=player('e','b',2,Array.from({length:6},()=>card()));
    f=player('f','a',0,[]);
    game.players=[p,e,f];status.player=p;status.event={player:p};status.currentPhase=p;status.auto=false;morale.a=morale.b=15;
}
let passed=0;
async function test(name,fn){board();await fn();passed++;console.log('PASS '+name);}
(async()=>{
    await test('both real mandatory-action wrappers turn rejected scores positive',()=>{
        for(const dir of ['十周年-AI优化版','十周年-噩梦人机']){
            const text=fs.readFileSync(path.join(__dirname,'../../',dir,'extension.js'),'utf8');
            const start=text.indexOf('    function patchMandatoryAiActions()');
            const end=text.indexOf('\n    function ',start+10);
            const localLib={skill:{global:[]}},localStatus={auto:true};
            vm.runInNewContext(text.slice(start,end)+'\npatchMandatoryAiActions();',{
                lib:localLib,_status:localStatus,game:{addGlobalSkill(){}},patchMiJingWanXiangAlwaysUse(){},
            });
            const event={action:true,name:'faShu',player:p,ai1:()=>0,ai2:()=>-5};
            localLib.skill._shiZhouNianAiMandatoryAction.onChooseToUse(event);
            assert.equal(event.ai1(),100000);assert.equal(event.ai2(),99995);
        }
    });
    await test('non-positive recall is absent from AI candidates but legal for manual players',()=>{
        e.thought=0;f.thought=3;f.hand=Array.from({length:6},()=>card());morale.a=2;
        const skill=lib.skill.lhym_xieLingMiTian;
        assert.ok(A.miTian(p)<0);assert.equal(skill.filter({},p),false);
        p.isUnderControl=()=>true;assert.equal(skill.filter({},p),true);
        status.auto=true;assert.equal(skill.filter({},p),false);
        p.isOnline=()=>true;assert.equal(skill.filter({},p),true);
        p.gem=0;assert.equal(skill.filter({},p),false);
    });
    await test('report 14 phase31 and phase37 low-output tier banking is rejected',()=>{
        p.hand=[card(),card()];p.storage.gongJiOrFaShu=1;
        e.thought=1;e.zhiLiao=1;e.hand=Array.from({length:5},()=>card());
        f.thought=1;f.hand=Array.from({length:4},()=>card());p.thought=9;
        assert.ok(A.miTian(p)<0);assert.equal(lib.skill.lhym_xieLingMiTian.filter({},p),false);
        p.thought=10;f.thought=0;
        assert.ok(A.miTian(p)<0);assert.equal(lib.skill.lhym_xieLingMiTian.filter({},p),false);
    });
    await test('safe one-spell startup at seven thoughts is preferred',()=>{
        p.thought=7;p.hand=[card(),card('xuRuo','faShu',5)];e.hand=[card(),card()];
        assert.ok(A.sheXin(p)>0);assert.equal(lib.skill.lhym_sheXinShu.check({},p),true);
    });
    await test('startup refuses to leave no playable follow-up',()=>{
        p.hand=[card('zhongDu','faShu')];e.thought=0;
        assert.ok(A.sheXin(p)<0);
        p.hand.push(card());assert.ok(A.sheXin(p)>0);
    });
    await test('startup can spend last gem then use human refund for recall',()=>{
        p.crystal=0;p.gem=1;p.hand=[card('zhongDu','faShu')];e.thought=3;
        assert.ok(A.sheXin(p)>0);
        p.skills.delete('lhym_liuJieZhiWai');p.skills.add('lhym_wuXingWuZhi');
        assert.ok(A.sheXin(p)<0);
    });
    await test('factory exposes both human and spirit AI hooks',()=>{
        assert.equal(typeof lib.skill.lhym_sheXinShu.check,'function');
        assert.equal(typeof lib.skill.lhym_xieLingMiTian.ai.order,'function');
        assert.equal(typeof lib.skill.lhym_wuXingWuZhi.ai.effect.target,'function');
    });
    await test('strict damage thresholds at 11, 16 and 31',()=>{
        assert.equal(A.bonus(10,false),0);assert.equal(A.bonus(11,false),1);
        assert.equal(A.bonus(15),0);assert.equal(A.bonus(16),1);assert.equal(A.bonus(31),2);
    });
    await test('sixth thought is worth more before first attack',()=>{
        const fresh=A.delta(p,5,6);p.storage.lhym_xieNianFirstAttackUsed=true;
        assert.ok(fresh>A.delta(p,5,6));
    });
    await test('ordinary retrieval does not break first-attack threshold',()=>{
        p.thought=6;assert.ok(A.recover(p,card('moDan','faShu',3))<0);
        p.thought=7;assert.ok(A.recover(p,card('moDan','faShu',6))>0);
    });
    await test('retrieval refuses overflow at dynamic hand limit',()=>{
        p.limit=2;assert.ok(A.recover(p,card('moDan','faShu',10))<0);
    });
    await test('enhanced slash values an executable extra attack',()=>{
        const ready=A.slash(p,e);p.hand=[];
        assert.ok(ready>A.slash(p,e));
    });
    await test('no extra-attack credit for unavailable targets or covered actions',()=>{
        const ready=A.slash(p,e);e.untargetable=true;assert.ok(A.slash(p,e)<ready);
        e.untargetable=false;p.storage.gongJi=3;assert.ok(A.slash(p,e)<ready);
    });
    await test('current action is deducted after slash, not before it',()=>{
        p.hand=[card()];p.storage.gongJiOrFaShu=1;
        const covered=A.slash(p,e);
        status.event.getParent=()=>({xingDong:'gongJiOrFaShu',extraXingDong:false});
        assert.ok(A.slash(p,e)>covered);
        status.event.getParent=()=>({xingDong:'gongJiOrFaShu',extraXingDong:true});
        assert.equal(A.slash(p,e),covered);
    });
    await test('follow-up attack cannot reuse first-attack immunity',()=>{
        p.thought=6;
        assert.ok(A.nextAttack(p,6)>A.nextAttack(p,6,undefined,true));
        assert.equal(A.nextAttack(p,21),A.nextAttack(p,21,undefined,true));
    });
    await test('self slash values safe draws without a held follow-up attack',()=>{
        p.hand=[];assert.ok(A.slash(p,p)>0);
        p.hand=[card(),card()];assert.ok(A.slash(p,p)>0);
        p.limit=2;assert.ok(A.slash(p,p)<0);
    });
    await test('low morale permits safe self slash but boosted overflow is rejected',()=>{
        morale.a=1;assert.ok(A.slash(p,p)>0);
        morale.a=15;p.thought=31;p.limit=4;assert.ok(A.slash(p,p)<0);
    });
    await test('self slash accounts for spent card once and missing reduction',()=>{
        p.hand=Array.from({length:6},()=>card());
        const attack=p.hand[0];morale.a=1;
        assert.ok(A.slash(p,p,attack)>0);
        assert.ok(A.slash(p,p)<0);
        p.hand.shift();assert.ok(A.slash(p,p,attack)>0);
        p.skills.delete('lhym_xieQiLiHun');assert.ok(A.slash(p,p,attack)<0);
    });
    await test('self slash at one thought still receives enhanced branch',()=>{
        p.thought=1;assert.ok(A.slash(p,p)>0);
    });
    await test('slash picks independent hostile target over endangered ally',()=>{
        f.thought=2;f.hand=Array.from({length:6},()=>card());morale.a=2;
        assert.ok(A.slash(p,e)>A.slash(p,f));
    });
    await test('treatment precedes thought bonus and LiHun',()=>{
        p.thought=31;p.zhiLiao=2;const state=A.snapshot();
        A.damage(p,p,2,state,A.bonus(31));assert.equal(state.get(p).hand,p.hand.length);
        p.zhiLiao=1;const next=A.snapshot();A.damage(p,p,2,next,A.bonus(31));
        assert.equal(next.get(p).hand,p.hand.length+2);
    });
    await test('human startup includes self return, spirit does not',()=>{
        p.hand=[card('zhongDu','faShu')];const human=A.sheXin(p);
        p.skills.delete('lhym_liuJieZhiWai');p.skills.add('lhym_wuXingWuZhi');
        assert.ok(human>A.sheXin(p));
    });
    await test('startup rejects attacks with no legal targets',()=>{
        p.hand=[card(),card('poison','faShu')];
        p.canUseXingBei=()=>false;
        e.thought=0;f.thought=0;
        assert.ok(A.sheXin(p)<0);
    });
    await test('huiyan does not rely on unknown donated card',()=>{
        p.hasUseTarget=()=>false;
        assert.equal(lib.skill.lhym_huiYan.check({},p),false);
    });
    await test('single spell startup can be useful',()=>{
        p.hand=[card('zhongDu','faShu')];assert.ok(lib.skill.lhym_sheXinShu.check({},p));
    });
    await test('distinct spell names beat duplicate poison rounds',()=>{
        p.hand=[card('zhongDu','faShu'),card('zhongDu','faShu')];const duplicate=A.sheXin(p);
        p.hand[1]=card('xuRuo','faShu');assert.ok(A.sheXin(p)>duplicate);
    });
    await test('three identical spells still add weakness',()=>{
        let seen=0;const original=A.basic;
        A.basic=function(...args){if(args[2]==='xuRuo')seen++;return original.apply(this,args);};
        try{A.sheXin(p,Array.from({length:3},()=>card('zhongDu','faShu')));assert.equal(seen,3);}
        finally{A.basic=original;}
    });
    await test('startup rejects dangerous friendly fire in spirit form',()=>{
        p.skills.delete('lhym_liuJieZhiWai');p.skills.add('lhym_wuXingWuZhi');
        p.hand=[card('zhongDu','faShu'),card('xuRuo','faShu')];e.hand=[];
        f.hand=Array.from({length:6},()=>card());morale.a=2;
        assert.ok(A.sheXin(p)<0);assert.equal(lib.skill.lhym_sheXinShu.check({},p),false);
    });
    await test('energy capacity caps startup returns',()=>{
        p.hand=[card('zhongDu','faShu'),card('xuRuo','faShu')];const space=A.sheXin(p);
        p.gem=4;p.crystal=1;assert.ok(A.sheXin(p)<space);
    });
    await test('recall rejects ally-only damage and empty boards',()=>{
        e.thought=0;f.thought=3;f.hand=Array.from({length:6},()=>card());morale.a=2;
        assert.ok(A.miTian(p)<0);f.thought=0;assert.ok(A.miTian(p)<0);
    });
    await test('recall accepts productive enemy damage with spell action',()=>{
        p.storage.faShu=1;e.thought=3;assert.ok(A.miTian(p)>0);
    });
    await test('recall damage uses threshold crossed by recall',()=>{
        p.thought=15;e.thought=1;p.storage.faShu=1;
        const original=A.damage;let observed;
        A.damage=function(...args){if(args[1]===e)observed=args[4];return original.apply(this,args);};
        try{A.miTian(p);assert.equal(observed,1);}finally{A.damage=original;}
    });
    await test('spirit upkeep distinguishes 26 and 27 thoughts',()=>{
        p.skills.add('lhym_wuXingWuZhi');assert.ok(A.delta(p,26,27)>A.delta(p,25,26));
    });
    await test('thought cap prevents phantom resource growth',()=>{
        assert.equal(A.value(p,99),A.value(p,120));
    });
    await test('basic effect immunity distinguishes human and spirit returns',()=>{
        const c=card('zhongDu','faShu');assert.ok(lib.skill.lhym_liuJieZhiWai.ai.effect.target(c,p,p)[1]>0);
        assert.equal(lib.skill.lhym_wuXingWuZhi.ai.effect.target(c),'zerotarget');
    });
    await test('evaluations neither inspect opponent hand contents nor mutate board',()=>{
        e.getCards=()=>{throw Error('opponent hand inspection');};f.getCards=e.getCards;
        const before=JSON.stringify([p.thought,p.storage,p.hand,e.thought,e.hand,f.thought,morale]);
        A.slash(p,e);A.miTian(p);A.sheXin(p,[card('zhongDu','faShu')]);
        assert.equal(JSON.stringify([p.thought,p.storage,p.hand,e.thought,e.hand,f.thought,morale]),before);
    });
    await test('serialized recovery callbacks have no outer player dependency',async()=>{
        const c=card('moDan','faShu',6),d=card('zhongDu','faShu');let boolAI;
        p.thought=7;
        p.chooseCardButton=()=>({set(k,fn){
            const fnRemote=vm.runInNewContext('('+fn.toString()+')',{lib,_status:status});
            assert.equal(typeof fnRemote({link:c}),'number');return this;
        },async forResultLinks(){return [c];}});
        p.chooseBool=()=>({set(k,v){if(k==='ai')boolAI=v;else status.event[k]=v;return this;},async forResultBool(){
            const remote=vm.runInNewContext('('+boolAI.toString()+')',{_status:status});
            assert.equal(typeof remote(),'boolean');return false;
        }});
        await lib.skill.lhym_jieXingQiShi.content({}, {cards:[c,d]},p);
    });
    console.log(`${passed} scenarios passed (factory/decision fixtures; no live engine).`);
})().catch(error=>{console.error(error);process.exitCode=1;});
