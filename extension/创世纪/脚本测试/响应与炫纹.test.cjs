const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict'),{test}=require('node:test');
function load(){
    let pack;
    const lib={skill:{},translate:{}},game={},get={type:c=>c.type,xiBie:c=>c.xiBie,translation:s=>s};
    const context=vm.createContext({lib,game,get,ui:{},ai:{},_status:{}});
    game.import=(_kind,factory)=>{pack=factory(lib,game,{},get,{},context._status);};
    vm.runInContext(fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8'),context);
    Object.assign(lib.skill,pack.package.skill.skill);
    return {lib,game,get,pack};
}
function choice(result){return {set(){return this;},forResultBool:async()=>result,forResult:async()=>result};}

test('炫纹发射只响应最近一次主动攻击的正数实际伤害，排除应战及嵌套法术',()=>{
    const {lib}=load(),s=lib.skill.xuanWenFaShe,card={type:'gongJi'};
    const player={getExpansions:()=>[{}]},attack={name:'useCard',player,card,yingZhan:false};
    const damage={name:'damage',num:1,card,parent:{name:'gongJi',parent:attack}};
    assert.equal(s.trigger.source,'chengShouShangHaiAfter');
    assert.equal(s.filter(damage,player),true);
    for(const num of [0,-1,undefined])assert.equal(s.filter({...damage,num},player),false);
    assert.equal(s.filter({...damage,faShu:true},player),false);
    assert.equal(s.filter({...damage,parent:{...attack,yingZhan:true,parent:attack}},player),false);
    assert.equal(s.filter({...damage,parent:{...attack,card:{type:'faShu'},parent:attack}},player),false);
    assert.equal(s.filter({...damage,parent:{...attack,player:{}}},player),false);
    assert.equal(s.filter({...damage,parent:null},player),false);
    assert.equal(s.filter(damage,{getExpansions:()=>[]}),false);
});

for(const hand of [0,1])test('水系炫纹可选择自己或无手牌角色，弃牌作为效果：'+hand,async()=>{
    const f=load(),s=f.lib.skill.xuanWenFaShe,card={xiBie:'shui'},calls=[];
    const target={isIn:()=>true,countCards:()=>hand,chooseToDiscard:async(zone,forced)=>{
        assert.equal(zone,'h');assert.equal(forced,true);calls.push('discard');
    }};
    const player={...target,getExpansions:()=>[card],isHengZhi:()=>false,
        discard(c,zone){assert.equal(c,card);assert.equal(zone,'xuanWen');calls.push('cost');return {set:()=>Promise.resolve()};},
        chooseTarget(prompt,forced,filter){
            assert(!prompt.includes('有手牌'));assert.equal(forced,true);
            assert.equal(filter(null,player,player),true);
            assert.equal(filter(null,player,target),true);
            return {set(){return this;},forResultTargets:async()=>[target]};
        }};
    f.game.log=()=>{};
    await s.content({}, {},player);
    assert.deepEqual(calls,hand?['cost','discard']:['cost']);
});

for(const count of [0,1,2,3])test('炫纹强压'+count+'个炫纹：先支付全部费用，再逐名造成伤害，保留新炫纹',async()=>{
    const f=load(),s=f.lib.skill.xuanWenQiangYa,calls=[];
    let cards=Array.from({length:count},()=>({}));
    const fresh={},player={side:0,storage:{},isHengZhi:()=>false,canBiShaBaoShi:()=>true,
        getExpansions:()=>cards,removeBiShaBaoShi:async()=>calls.push('gem'),
        discard:async(snapshot,zone)=>{assert.equal(zone,'xuanWen');assert.equal(snapshot.length,count);calls.push('remove');cards=[];}};
    assert.equal(s.filter({},player),true);
    assert.equal(s.filter({}, {...player,isHengZhi:()=>true}),false);
    assert.equal(s.filter({}, {...player,canBiShaBaoShi:()=>false}),false);
    const targets=[1,2].map(id=>({side:1,isIn:()=>true,faShuDamage:async(amount,source)=>{
        assert.equal(source,player);assert.equal(amount,Math.ceil(count/2));
        assert(cards.every(c=>c===fresh));calls.push('damage'+id);if(id===1)cards.push(fresh);
    }}));
    targets.sortBySeat=()=>targets;f.game.filterPlayer=filter=>{assert(targets.every(filter));return targets;};
    await s.contentBefore({}, {},player);await s.content({}, {},player);await s.contentAfter({}, {},player);
    assert.deepEqual(calls,count?['gem','remove','damage1','damage2']:['gem']);
    assert.equal(cards.length,count?1:0);
    assert.equal(player.storage.xuanWenQiangYa_damage,undefined);
});

test('三项响应的公开触发检查均不读取手牌或材料',()=>{
    const f=load(),player={side:0,countCards(){throw Error('private hand read');}};
    f.lib.skill.shiYanCaiLiao.getMatching=()=>{throw Error('private material read');};
    const attack={player:{side:1},target:{side:0}};
    assert.equal(f.lib.skill.guangZhiFuChou.filter(attack,player),true);
    assert.equal(f.lib.skill.guangZhiFuChou.filter({...attack,yingZhan:true},player),false);
    assert.equal(f.lib.skill.guangZhiFuChou.filter({...attack,target:player},player),false);
    assert.equal(f.lib.skill.xuanZhuanSaoBa.filter(attack,player),true);
    assert.equal(f.lib.skill.dianManPengZhuangJi.filter({},player),true);
});

for(const id of ['guangZhiFuChou','xuanZhuanSaoBa','dianManPengZhuangJi']){
    for(const accepted of [false,true])for(const payable of [false,true]){
        test(id+'先询问再检查费用：确认='+accepted+'，可支付='+payable,async()=>{
            const f=load(),calls=[],material={};
            const player={
                chooseBool(){calls.push('ask');return choice(accepted);},
                countCards(){assert.equal(calls[0],'ask');calls.push('check');return payable?1:0;},
                chooseToDiscard(zone,n,forced){assert.equal(zone,'h');assert.equal(n,1);assert.equal(forced,true);calls.push('discard');return choice({bool:true,cards:[material]});},
            };
            f.lib.skill.shiYanCaiLiao.chooseMatching=async(_player,_suits,_prompt,forced)=>{
                assert.equal(calls[0],'ask');assert.equal(forced,true);calls.push('select');return payable?material:null;
            };
            const event={};await f.lib.skill[id].cost(event,{damageNum:2},player);
            assert.equal(calls[0],'ask');assert.equal(event.result.bool,accepted&&payable);
            if(!accepted)assert.deepEqual(calls,['ask']);
            if(accepted&&payable)assert.equal(event.result.cards[0],material);
            if(id==='xuanZhuanSaoBa'&&accepted&&payable)assert.equal(event.result.cost_data,2);
        });
    }
}

test('扫把掌握被动标题与强制触发一致',()=>{
    const {pack,lib}=load();
    assert.equal(pack.package.skill.translate.saoBaZhangWo,'被动【扫把掌握】');
    assert.equal(lib.skill.saoBaZhangWo.forced,true);
});
