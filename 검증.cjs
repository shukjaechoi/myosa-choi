const fs = require('fs'), vm = require('vm'), assert = require('assert');
const elements = new Map();
function element(selector) { if (!elements.has(selector)) elements.set(selector, {value: selector === '#date' ? '2026-11-14' : '', classList:{add(){},remove(){},toggle(){}}, addEventListener(){}, scrollTo(){}}); return elements.get(selector); }
const context = {document:{querySelector:element},localStorage:{getItem(){return null},setItem(){}},window:{scrollTo(){}}, structuredClone, Date, JSON, Math, setTimeout, clearTimeout, console};
vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+fs.readFileSync('app.js','utf8'),context);
const cases = [
 ['2022-10-29','壬寅十月辛亥朔 初五日 乙卯'],
 ['2023-11-18','癸卯十月乙亥朔 初六日 庚辰'],
 ['2024-11-02','甲辰十月己巳朔 初二日 庚午'],
 ['2025-11-22','乙巳十月癸巳朔 初三日 乙未'],
 ['2026-11-14','丙午十月丁亥朔 初六日 壬辰'],
];
for (const [date, expected] of cases) {element('#date').value=date;assert.equal(vm.runInContext('getDate().text',context),expected)}
element('#date').value='2026-11-14';
assert.equal(vm.runInContext('state.docs.length',context),9);
assert.equal(vm.runInContext(`state.docs.every((d,i)=>d.lines.every((l,j)=>expand(l.text,getDate()).replace(/\\s/g,'')===ORIGINAL[i].columns[j].replace('乙巳十月癸巳朔 初三日 乙未',getDate().text).replace(/\\s/g,'')))`,context),true,'날짜 외의 원문 보존');
assert.equal(vm.runInContext(`state.docs.every(d=>d.lines.every(l=>!l.text.trim() || (lineData(l,getDate()).reading && lineData(l,getDate()).meaning)))`,context),true,'모든 구절에 음과 풀이');
console.log('날짜 5건, 원문 9편과 음·풀이 검증 통과');
