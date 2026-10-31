import fs from 'node:fs';
import vm from 'node:vm';
const window={};
for(const f of ['core','commodore','apple','atari','coleco','sinclair','timex','ti','tandy','heathkit','ibm','amstrad','acorn','dragon','msx','oric','schematics','photos','video'])new Function('window','RCS',fs.readFileSync('src/data/'+f+'.js','utf8'))(window,window.RCS);
const el={dataset:{},classList:{toggle(){},add(){},remove(){}},addEventListener(){},querySelector(){return null},querySelectorAll(){return []}};
const ctx={window,document:{documentElement:el,querySelector(){return el},querySelectorAll(){return []},addEventListener(){}},matchMedia:()=>({matches:false,addEventListener(){}}),localStorage:{getItem(){return null},length:0},location:{protocol:'file:',pathname:'/',hash:''},navigator:{userAgent:''},addEventListener(){},history:{},URLSearchParams,console,setTimeout,clearTimeout};
window.addEventListener=()=>{};vm.createContext(ctx);vm.runInContext(fs.readFileSync('src/connectors.js','utf8'),ctx);ctx.RBConn=window.RBConn;
let code=fs.readFileSync('src/app.js','utf8').replace(/\nrender\(\);\s*\n\/\* after fonts/,'\n/* after fonts');
const names='state,pinExpect,pinScopes,viewMachine,viewChip,viewPinouts,boardGrid,pinDetail,connDetail,connBody,viewPorts,supplyBlock,viewPower,scopeBlock,firstTenBlock,clocksBlock,replacementsBlock,srcLink,sourceList,boardsBlock,viewQuickref,resultItem,buildIndex,searchResults,printCard,resRow,videoTable,viewVideo';
code=code.replace(/\}\)\(\);\s*$/,'window.TEST={'+names+'};})();');vm.runInContext(code,ctx);
const T=window.TEST,D=window.RCS,m=D.machines.c16,chip=D.chips[m.chips.find(id=>D.chips[id].pins)],pin=chip.pins[0],conn=D.connectors.c16[0],cp=conn.pins[0],pw=D.power.c16,q=D.quickref.c16;
T.state.ctx.machine=m;
fs.writeFileSync(".factcheck-tmp/production-spectrum-pin13.html",T.pinDetail(D.chips.ula_spectrum,D.chips.ula_spectrum.pins.find(p=>p.n===13),D.machines.spectrum));
const productionFlags=[];function clean(x,path='RCS'){if(!x||typeof x!=='object')return;if(x.verify||x.conflict)productionFlags.push({path,verify:x.verify,conflict:x.conflict});delete x.verify;delete x.conflict;for(const[k,v]of Object.entries(x))clean(v,path+'.'+k)}clean(D);fs.writeFileSync('.factcheck-tmp/production-flags.json',JSON.stringify(productionFlags,null,2));
const outputs=[],sentinel='SKEPTIC disputed <value> & evidence';
function test(name,record,render,{extract,print=false}={}){
 for(const [mode,flags]of Object.entries({verify:{verify:true},conflict:{conflict:sentinel},both:{verify:true,conflict:sentinel}})){
  const save={...record};delete record.verify;delete record.conflict;Object.assign(record,flags);
  try{let html=render();if(extract)html=extract(html);const text=html.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');const mark=print?text.includes('(unverified)'):/class="chk"|class="flag">CHECK</.test(html);const conflict=mode==='verify'||text.includes('Sources disagree:')&&text.includes('SKEPTIC disputed &lt;value&gt; &amp; evidence');outputs.push({name,mode,mark,conflict,pass:mark&&conflict});fs.writeFileSync('.factcheck-tmp/'+name+'-'+mode+'.html',html);}catch(e){outputs.push({name,mode,error:e.stack});}
  for(const k of Object.keys(record))delete record[k];Object.assign(record,save);
 }
}
test('chip-header',chip,()=>T.viewChip(m,chip),{extract:h=>h.split('<div class="flex')[0]});
test('pin-legend',pin,()=>T.viewChip(m,chip),{extract:h=>h.split('id="pinlegend"')[1].split('</section>')[0]});
test('chip-grid-chip',chip,()=>T.boardGrid(m,[chip]));test('chip-grid-pin',pin,()=>T.boardGrid(m,[chip]));
test('pinouts-chip',chip,()=>T.viewPinouts(m));test('pinouts-pin',pin,()=>T.viewPinouts(m));
test('pin-detail',pin,()=>T.pinDetail(chip,pin,m));test('connector-detail',cp,()=>T.connDetail(conn,cp,'J1'));test('connector-legend',cp,()=>T.connBody(conn).html);test('connector-header',conn,()=>T.viewPorts(m));
test('supply',pw.supply,()=>T.supplyBlock(m,pw.supply));
const sn={text:'SKEPTIC note'};pw.supply.notes.push(sn);test('supply-note',sn,()=>T.supplyBlock(m,pw.supply));
test('supply-connector',D.connectors.c16.find(c=>c.id===pw.supply.connector),()=>T.supplyBlock(m,pw.supply));
test('rails-power',pw.rails[0],()=>T.viewPower(m));test('rails-machine',pw.rails[0],()=>T.viewMachine(m));test('testpoints-power',pw.testPoints[0],()=>T.viewPower(m));test('testpoints-machine',pw.testPoints[0],()=>T.viewMachine(m));
const scope={shape:'square',f:'1 MHz',low:'0 V',high:'5 V',basis:'datasheet'};test('scope',scope,()=>T.scopeBlock(scope,'SKEPTIC'));const parent={};test('scope-parent',parent,()=>T.scopeBlock(scope,'SKEPTIC',parent));
const step={step:1,check:'SKEPTIC step',where:'CPU pin 1',expect:'5 V'};test('firstTen',step,()=>T.firstTenBlock(m,[step]));
const clock={name:'SKEPTIC clock',f:'1 MHz'};test('clocks',clock,()=>T.clocksBlock(m,[clock]));
const repl={part:'SKEPTIC replacement',kind:'modern'},replSave=chip.replacements;chip.replacements=[repl];test('replacements',repl,()=>T.replacementsBlock(chip));chip.replacements=replSave;
const src={label:'SKEPTIC source',url:'https://example.org'};test('source-link',src,()=>T.srcLink(src));test('source-list',src,()=>T.sourceList([src]));test('schematics',D.schematics.c16[0],()=>T.boardsBlock(m));
test('keys',q.keys[0],()=>T.viewQuickref(m,'keys'));test('basic',q.basic.essentials[0],()=>T.viewQuickref(m,'basic'));test('symptoms',D.symptoms.c16[0],()=>T.viewMachine(m));
const sr={title:'SKEPTIC',href:'#'};test('search-row',sr,()=>T.resultItem(sr,0,false));const rr={name:'SKEPTIC',url:'https://example.org'};test('resources',rr,()=>T.resRow(rr));const vr={name:'SKEPTIC',value:'1 V'};test('video-row',vr,()=>T.videoTable([vr]));test('video-source',D.video.sources[0],()=>T.viewVideo(),{extract:h=>h.split('id="v-sources"')[1]});
const card=()=>T.printCard(m).split('</header>')[1];
test('print-chip',chip,card,{print:true});test('print-chip-pin',pin,card,{print:true});test('print-connector',conn,card,{print:true});test('print-connector-pin',cp,card,{print:true});test('print-rail',pw.rails[0],card,{print:true});test('print-supply',pw.supply,card,{print:true});test('print-note',sn,card,{print:true});
const oldSteps=pw.firstTen,oldClocks=pw.clocks;pw.firstTen=[step];pw.clocks=[clock];test('print-firstTen',step,card,{print:true});test('print-clock',clock,card,{print:true});pw.firstTen=oldSteps;pw.clocks=oldClocks;
for(const [name,record,query]of[['chip',chip,chip.name],['pin',pin,chip.short+' pin '+pin.n],['key',q.keys[0],q.keys[0].keys],['basic',q.basic.essentials[0],q.basic.essentials[0].cmd],['connector',conn,conn.name],['connector-pin',cp,conn.name+' pin '+cp.n]])test('search-index-'+name,record,()=>{T.buildIndex();return T.searchResults(query)});

const nopins={...chip};delete nopins.pins;
test('chip-grid-notcaptured',nopins,()=>T.boardGrid(m,[nopins]));
const oldChip=D.chips[chip.id];D.chips[chip.id]=nopins;test('pinouts-notcaptured',nopins,()=>T.viewPinouts(m));D.chips[chip.id]=oldChip;
const cpBare={...cp};delete cpBare.desc;test('connector-detail-no-description',cpBare,()=>T.connDetail(conn,cpBare,'J1'));
const bare={...conn};delete bare.geo;test('connector-bare-legend',bare.pins[0],()=>T.connBody(bare).html);
const internal={name:'SKEPTIC internal',external:false};test('internal-supply',internal,()=>T.supplyBlock(m,internal));
const pal={name:'SKEPTIC PAL',pal:'1 MHz',ntsc:'2 MHz'};test('pal-clocks',pal,()=>T.clocksBlock(m,[pal]));
pw.clocks=[clock];test('search-index-clock',clock,()=>{T.buildIndex();return T.searchResults(clock.name)});pw.clocks=oldClocks;
chip.replacements=[repl];test('search-index-replacement',repl,()=>{T.buildIndex();return T.searchResults(repl.part)});chip.replacements=replSave;
const expectPin=chip.pins.find(p=>p.type==='clock'),expect={name:'SKEPTIC expected clock',where:chip.short+' pin '+expectPin.n,f:'1 MHz'};
pw.clocks=[expect];test('pin-expected-clock',expect,()=>T.pinExpect(chip,expectPin,m));pw.clocks=oldClocks;
const railExpect={rail:'SKEPTIC expected rail',where:expect.where,expect:'1 MHz'};
const railSave=pw.rails;pw.rails=[railExpect];test('pin-expected-rail',railExpect,()=>T.pinExpect(chip,expectPin,m));pw.rails=railSave;
const tpSave=pw.testPoints,tpExpect={tp:'SKEPTIC expected TP',where:expect.where,expect:'1 MHz',scope};
pw.testPoints=[tpExpect];test('pin-expected-TP',tpExpect,()=>T.pinExpect(chip,expectPin,m));test('pin-scope',scope,()=>T.pinScopes(chip,expectPin,m));test('pin-scope-parent',tpExpect,()=>T.pinScopes(chip,expectPin,m));pw.testPoints=tpSave;
const stepExpect={...step,where:expect.where};pw.firstTen=[stepExpect];test('pin-expected-firstTen',stepExpect,()=>T.pinExpect(chip,expectPin,m));pw.firstTen=oldSteps;
pw.rails=[];test('print-supply-no-rails',pw.supply,card,{print:true});pw.rails=railSave;

fs.writeFileSync('.factcheck-tmp/results.json',JSON.stringify(outputs,null,2));console.log(outputs.filter(r=>!r.pass).map(r=>r.name+' '+r.mode+(r.error?' ERROR '+r.error.split('\n')[0]:!r.mark?' missing mark'+(!r.conflict?' and conflict':''):' missing conflict')).join('\n'));console.log(outputs.length+' cases; '+outputs.filter(r=>r.pass).length+' passed');
