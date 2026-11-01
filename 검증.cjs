const fs = require('fs'), vm = require('vm'), assert = require('assert');
const elements = new Map();
function element(selector) { if (!elements.has(selector)) elements.set(selector, {value: selector === '#date' ? '2026-11-14' : '', classList:{add(){},remove(){},toggle(){}}, addEventListener(){}, scrollTo(){}}); return elements.get(selector); }
const context = {document:{querySelector:element},localStorage:{getItem(){return null},setItem(){}},window:{scrollTo(){}}, structuredClone, Date, JSON, Math, setTimeout, clearTimeout, console};
vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+fs.readFileSync('templates.js','utf8')+'\n'+fs.readFileSync('app.js','utf8')+'\n'+fs.readFileSync('ui.js','utf8'),context);
const cases = [
 ['2022-10-29','壬寅十月辛亥朔 初五日 乙卯'],
 ['2023-11-18','癸卯十月乙亥朔 初六日 庚辰'],
 ['2024-11-02','甲辰十月己巳朔 初二日 庚午'],
 ['2025-11-22','乙巳十月癸巳朔 初三日 乙未'],
 ['2026-11-14','丙午十月丁亥朔 初六日 壬辰'],
];
for (const [date, expected] of cases) {element('#date').value=date;assert.equal(vm.runInContext('getDate().text',context),expected)}
const firstSaturdays=['2022-10-29','2023-11-18','2024-11-02','2025-11-22','2026-11-14','2027-10-30','2028-11-18','2029-11-10','2030-11-02'];
firstSaturdays.forEach((expected,i)=>assert.equal(vm.runInContext(`memorialDate(${2022+i})`,context),expected));
element('#date').value='2026-11-14';
assert.equal(vm.runInContext('state.docs.length',context),9);
assert.equal(vm.runInContext(`state.docs.every((d,i)=>d.lines.every((l,j)=>expand(l.text,getDate()).replace(/\\s/g,'')===ORIGINAL[i].columns[j].replace('乙巳十月癸巳朔 初三日 乙未',getDate().text).replace(/\\s/g,'')))`,context),true,'날짜 외의 원문 보존');
assert.equal(vm.runInContext(`state.docs.every(d=>d.lines.every(l=>!l.text.trim() || (lineData(l,getDate()).reading && lineData(l,getDate()).meaning)))`,context),true,'모든 구절에 음과 풀이');
assert.equal(vm.runInContext(`draft=state.docs[0].lines.map(l=>editText(l,getDate())); draft[1]='敢昭告'; let revised=proposedState(); revised.docs[0].lines[1].text==='敢昭告' && revised.docs[0].lines[1].needsReview && revised.docs[0].lines[1].reading==='감소고우' && revised.docs[0].lines[0].text.includes('{{날짜}}')`,context),true,'수정 이력 대상과 날짜 자리 보존');
console.log('날짜 5건, 첫 토요일 9건, 원문 9편과 음·풀이 검증 통과');
