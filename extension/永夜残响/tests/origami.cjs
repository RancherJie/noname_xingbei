const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const lib = {skill:{},filter:{opponent:(c,p,t)=>p.side!==t.side,cardDiscardable:()=>true}};
const game = {players:[],dead:[],addGlobalSkill(){},import(type, factory){this.pack=factory(lib,this,{},get,{},{});}};
const get = {type:c=>c.type,value:()=>1,damageEffect:(t,n)=>-n,is:{xingDong:e=>e.action===true}};
const context=vm.createContext({game,lib,get,console});
vm.runInContext('Array.prototype.sortBySeat=function(){return this;}',context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../extension.js'),'utf8'),context);
Object.assign(lib.skill,game.pack.package.skill.skill);
const skills=lib.skill, oz=skills.zheZhiManager.manager;
const events=[];
function player(name,side){
 const p={name,name1:name,side,storage:{},marks:{},marked:new Set(),zhiLiao:0,hand:3,stones:0,
 isIn:()=>true,countZhiShiWu(m){return this.marks[m]||0;},syncStorage(){},update(){},
 markSkill(skill){this.marked.add(skill);},
 getHandcardLimit:()=>6,countCards(){return this.hand;},getZhiLiaoLimit(){return oz.inverse(this)?1:3;},
 canBiShaBaoShi(){return this.stones>0;},canBiShaShuiJing(){return this.stones>0;},
 async removeBiShaBaoShi(){assert.ok(this.stones>0);this.stones--;},async removeBiShaShuiJing(){this.stones--;},
 async addZhiShiWu(m,n){this.marks[m]=(this.marks[m]||0)+Math.min(n,Math.max(0,oz.limit(this,m)-(this.marks[m]||0)));},
 async removeZhiShiWu(m,n){const actual=Math.min(n,this.countZhiShiWu(m));this.marks[m]-=actual;
  const tr={zhiShiWu:m,num:-actual};if(skills.zheZhiYiShiHuiGui.filter(tr,this))await skills.zheZhiYiShiHuiGui.content({},tr,this);},
 async reinitCharacter(from,to){assert.equal(this.name,from);events.push(['form',to]);this.name=this.name1=to;},
 async changeZhiLiao(n){this.zhiLiao+=n;},async discard(c){this.hand-=c.length;},async showCards(){},
 faShuDamage(n,source){const target=this;return {then(resolve){events.push(['damage',target.name,n+(oz.inverse(source)&&!this.ozSourceApplied?1:0)+(oz.inverse(target)?1:0),source.name]);resolve();}};},
 logSkill(id){events.push(['skill',id]);},
 chooseTarget(...args){const filter=args.findLast(x=>typeof x==='function');const candidates=game.players.filter(t=>filter(null,p,t));return {set(){return this;},async forResultTargets(){return candidates.slice(0,1);}};},
 };return p;
}
function setup(inverse=false){events.length=0;const p=player(inverse?'fanZhuanZheZhi':'yuanYiZheZhi',true),a=player('enemy1',false),b=player('enemy2',false),f=player('friend',true);
 game.players=vm.runInContext('[]',context);game.players.push(p,a,b,f);return {p,a,b,f};}
(async()=>{
 const chars=game.pack.package.character.character;
 assert.ok(chars.fanZhuanZheZhi[4].includes('unseen'));assert.ok(chars.fanZhuanZheZhi[4].includes('forbidai'));
 assert.equal(typeof skills.zheZhiGuangYu.init,'function');
 assert.equal(chars.yuanYiZheZhi[1],'yongGroup');assert.equal(chars.yuanYiZheZhi[2],4);
 for(const id of [...chars.yuanYiZheZhi[3],...chars.fanZhuanZheZhi[3]])assert.ok(skills[id],id);
 for(const [id,skill] of Object.entries(skills).filter(([id])=>id.startsWith('zheZhi'))){
  if(skill.content)assert.equal(skill.content.constructor.name,'AsyncFunction',id+' must preserve lexical scope in core compiler');
 }
 let {p,a,b,f}=setup();skills.zheZhiGuangYu.init(p);skills.zheZhiGuangYu.init(a);
 assert.ok(p.marked.has(oz.light));assert.equal(a.marked.has(oz.light),false);
 await skills.zheZhiLingZhuang.content({},null,p);assert.equal(oz.count(p,oz.light),4);
 a.marks[oz.light]=2;assert.equal(await oz.move(p,a,oz.light),false);assert.equal(oz.count(p,oz.light),4);
 p.storage.ozLightMax=0;p.marks[oz.light]=0;await oz.add(p,oz.light,4);assert.equal(oz.count(p,oz.light),0);
 const change={num:4,zhiShiWu:oz.light};skills.zheZhiLimitGuard.content({},change,p);assert.equal(change.num,0);
 assert.equal(skills.zheZhiJueMieTianShi.filter({yingZhan:true,action:true},p),false);
 assert.equal(skills.zheZhiJueWang.filter({num:0},p),false);
 ({p,a,b,f}=setup());p.storage.ozLightMax=1;a.marks[oz.light]=2;b.marks[oz.light]=1;f.marks[oz.light]=1;
 await oz.cannon(p);assert.equal(oz.count(p,oz.light),1);assert.equal(oz.count(a,oz.light),0);
 assert.deepEqual(events.filter(e=>e[0]==='damage').map(e=>e[2]),[2,1,1,2]);
 ({p,a,b,f}=setup());p.storage.ozLightMax=1;p.zhiLiao=3;a.marks[oz.light]=2;b.marks[oz.light]=2;
 await skills.zheZhiJueWang.content({}, {num:1}, p);assert.ok(oz.inverse(p));assert.equal(oz.count(p,oz.dark),8);assert.equal(p.zhiLiao,1);assert.equal(p.stones,0);
 assert.ok(events.findIndex(e=>e[0]==='form')>events.findLastIndex(e=>e[0]==='damage'));
 ({p,a,b,f}=setup(true));p.storage.ozDarkMax=2;p.marks[oz.dark]=2;a.marks[oz.dark]=3;
 await skills.zheZhiJuJue.content({}, {source:a,num:1},p);
 assert.ok(oz.normal(p));assert.equal(oz.count(p,oz.light),4);assert.equal(p.storage.ozLightMax,4);assert.equal(p.storage.ozDarkMax,0);
 const hits=events.filter(e=>e[0]==='damage');assert.deepEqual(hits.slice(0,2).map(e=>[e[1],e[2]]),[['enemy1',2],['friend',2]]);
 assert.ok(events.findIndex(e=>e[0]==='form')>events.findLastIndex(e=>e[0]==='damage'));
 assert.equal(game.players.reduce((s,t)=>s+oz.count(t,oz.dark),0),0);
 ({p,a,b,f}=setup(true));p.storage.ozDarkMax=4;p.marks[oz.dark]=3;a.marks[oz.dark]=3;b.marks[oz.dark]=2;
 await oz.annihilate(p);assert.equal(oz.count(p,oz.dark),4);
 assert.deepEqual(events.filter(e=>e[0]==='damage').map(e=>e[2]),[3,2,5]);
 ({p,a,b,f}=setup(true));p.storage.ozDarkMax=8;p.marks[oz.dark]=8;
 await skills.zheZhiHeiYuShu.content({target:a},null,p);assert.equal(events[0][2],1);assert.equal(oz.count(a,oz.dark),1);assert.equal(p.storage.ozDarkMax,7);
 assert.equal(skills.zheZhiFanLingZhuang.mod.maxZhiLiao(p,3),1);
 assert.equal(skills.zheZhiFanLingZhuang.subSkill.source.filter({ozSourceApplied:true}),false);
 assert.equal(skills.zheZhiPaoGuan.filter({},p),false);
 assert.equal(skills.zheZhiJuJue.filter({num:1,source:a,ozInversion:true},p),false);
 await oz.cleanup(p);assert.equal(game.players.reduce((s,t)=>s+oz.count(t,oz.dark)+oz.count(t,oz.light),0),0);
 assert.equal(p.storage.ozDarkMax,undefined);
 console.log('Origami: registration, hidden form, zero cap, transfers, snapshots, friendly damage, free inversion, delayed return, overflow, self damage and black-feather loop passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
