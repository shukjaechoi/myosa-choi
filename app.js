/* All data stays in this browser; the date table is generated from Windows KoreanLunisolarCalendar. */
const $ = s => document.querySelector(s), esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stems='甲乙丙丁戊己庚辛壬癸', branches='子丑寅卯辰巳午未申酉戌亥', nums='一二三四五六七八九';
const names={'甲':'갑','乙':'을','丙':'병','丁':'정','戊':'무','己':'기','庚':'경','辛':'신','壬':'임','癸':'계','子':'자','丑':'축','寅':'인','卯':'묘','辰':'진','巳':'사','午':'오','未':'미','申':'신','酉':'유','戌':'술','亥':'해','一':'일','二':'이','三':'삼','四':'사','五':'오','六':'육','七':'칠','八':'팔','九':'구','十':'십','月':'월','朔':'삭','初':'초','日':'일','閏':'윤'};
const phrases={
'瞻掃封塋 不勝感慕 謹以淸酌':['첨소봉영 불승감모 근이청작','묘소를 살피고 쓸며 사모하는 마음을 이기지 못해 삼가 맑은 술과'],
'敢昭告于':['감소고우','삼가 밝게 아룁니다.'],
'顯五代祖考成均生員府君':['현오대조고성균생원부군','돌아가신 오대조 할아버지 성균생원 부군'],
'顯五代祖妣宜人李氏之墓':['현오대조비의인이씨지묘','돌아가신 오대조 할머니 의인 이씨의 묘'],
'顯高祖考成均生員府君之墓':['현고조고성균생원부군지묘','돌아가신 고조할아버지 성균생원 부군의 묘'],
'顯高祖妣宜人李氏之墓':['현고조비의인이씨지묘','돌아가신 고조할머니 의인 이씨의 묘'],
'顯曾祖考處士府君之墓':['현증조고처사부군지묘','돌아가신 증조할아버지 처사 부군의 묘'],
'顯曾祖妣儒人李氏之墓':['현증조비유인이씨지묘','돌아가신 증조할머니 유인 이씨의 묘'],
'顯祖考處士府君之墓 氣序流易 霜露旣降':['현조고처사부군지묘 기서유역 상로기강','할아버지 처사 부군의 묘에 아룁니다. 계절이 바뀌어 서리와 이슬이 이미 내렸습니다.'],
'顯考處士府君':['현고처사부군','돌아가신 아버지 처사 부군'],
'顯妣孺人裵氏之墓 氣序流易 霜露旣降':['현비유인배씨지묘 기서유역 상로기강','어머니 유인 배씨의 묘에 아룁니다. 계절이 바뀌어 서리와 이슬이 내렸습니다.'],
'顯祖考處士府君之墓':['현조고처사부군지묘','돌아가신 할아버지 처사 부군의 묘'],
'顯祖妣孺人鄭氏之墓 氣序流易 霜露旣降':['현조비유인정씨지묘 기서유역 상로기강','할머니 유인 정씨의 묘에 아룁니다. 계절이 바뀌어 서리와 이슬이 내렸습니다.'],
'顯考處士府君之墓 氣序流易 霜露旣降':['현고처사부군지묘 기서유역 상로기강','아버지 처사 부군의 묘에 아룁니다. 계절이 바뀌어 서리와 이슬이 내렸습니다.'],
'顯祖妣孺人孫氏之墓氣序流易 霜露旣降':['현조비유인손씨지묘 기서유역 상로기강','할머니 유인 손씨의 묘에 아룁니다. 계절이 바뀌어 서리와 이슬이 내렸습니다.'],
'顯妣孺人鄭氏之墓 氣序流易 霜露旣降':['현비유인정씨지묘 기서유역 상로기강','어머니 유인 정씨의 묘에 아룁니다. 계절이 바뀌어 서리와 이슬이 내렸습니다.'],
'土地之神 今以恭修 歲事于五代祖考成均生員':['토지지신 금이공수 세사우오대조고성균생원','토지의 신이시여, 이제 오대조 할아버지 성균생원께 공손히 묘사를 올립니다.'],
'府君之墓 惟時保佑實賴':['부군지묘 유시보우실뢰','부군의 묘를 지켜 주신 은혜에 의지합니다.'],
'土地之神 今以恭修歲事于 祖妣孺人孫氏之墓':['토지지신 금이공수세사우 조비유인손씨지묘','토지의 신이시여, 이제 할머니 유인 손씨의 묘에서 공손히 묘사를 올립니다.'],
'惟時保佑實賴':['유시보우실뢰','늘 지켜 주시고 도와주신 은혜에 의지합니다.'],
'神休敢以 酒饌敬伸 奠獻 尙':['신휴감이 주찬경신 전헌 상','신의 은혜에 감사드리며 술과 음식을 정성껏 올리오니'],
'饗':['향','흠향해 주십시오.']};
const defaultsCommon=[
{key:'감소고우',text:'敢昭告于',reading:'감소고우',meaning:'삼가 밝게 아룁니다.'},
{key:'불승감모',text:'瞻掃封塋 不勝感慕 謹以淸酌',reading:'첨소봉영 불승감모 근이청작',meaning:'묘소를 살피고 쓸며 사모하는 마음을 이기지 못해 삼가 맑은 술과'},
{key:'호천망극',text:'瞻掃封塋 昊天罔極 謹以淸酌',reading:'첨소봉영 호천망극 근이청작',meaning:'묘소를 살피고 쓸며 하늘처럼 다함없는 은혜를 생각하여 삼가 맑은 술과'},
{key:'세사상향',text:'脯果祗薦 歲事 尙',reading:'포과지천 세사 상',meaning:'포와 과일을 공경히 올려 묘사를 지내오니'},
{key:'상향',text:'饗',reading:'향',meaning:'흠향해 주십시오.'},
{key:'신휴',text:'神休敢以 酒饌敬伸 奠獻 尙',reading:'신휴감이 주찬경신 전헌 상',meaning:'신의 은혜에 감사드리며 술과 음식을 정성껏 올리오니'}];
function makeDefaults(){return {common:structuredClone(defaultsCommon),docs:ORIGINAL.map(doc=>({name:doc.name,lines:doc.columns.map((raw,i)=>{if(!raw.trim())return {text:' ',reading:'',meaning:''};let t=raw.trim().replace('乙巳十月癸巳朔 初三日 乙未','{{날짜}}');if(i===0){let suffix=t.split('}}')[1].trim(), sounds={'玄孫 爟':'현손 관','幼學崔爟':'유학 최관','孝子 梗':'효자 경','孝孫珍熏':'효손 진훈','孝子珍熏':'효자 진훈','孝子홍준':'효자 홍준','孝孫爟':'효손 관','孝子爟':'효자 관'};return{text:t,reading:'유세차 {{날짜음}} '+(sounds[suffix]||''),meaning:'이 해 {{날짜뜻}}에 정성을 다해 아룁니다.'}}let common=defaultsCommon.find(x=>x.text===t);let [reading,meaning]=phrases[t]||['',''];return{text:common?'{{'+common.key+'}}':t,reading:common?'':reading,meaning:common?'':meaning}})}))}}
let state; try{state=JSON.parse(localStorage.getItem('chukmun-v1'))||makeDefaults();if(!Array.isArray(state.docs)||state.docs.length!==9||!Array.isArray(state.common))throw Error();}catch{state=makeDefaults()}
let selected=0, editing=0;
const dayNo=s=>Math.floor(Date.parse(s+'T00:00:00Z')/86400000), gz=n=>stems[((n%10)+10)%10]+branches[((n%12)+12)%12], dayGz=d=>gz(31+dayNo(d)-dayNo('2025-11-22'));
function number(n){if(n<10)return nums[n-1];if(n===10)return '十';if(n<20)return '十'+nums[n-11];return nums[Math.floor(n/10)-1]+'十'+(n%10?nums[n%10-1]:'')}
function getDate(){let iso=$('#date').value;if(!iso||iso<'1900-01-31'||iso>'2050-12-31')throw Error('1900년 1월 31일부터 2050년 12월 31일까지 선택해 주세요.');let row=CALENDAR.filter(x=>x[0]<=iso).at(-1);if(!row)throw Error('지원하지 않는 날짜입니다.');let d=dayNo(iso)-dayNo(row[0])+1, text=gz(row[1]-1984)+(row[3]?'閏':'')+number(row[2])+'月'+dayGz(row[0])+'朔 '+(d<=10?'初':'')+number(d)+'日 '+dayGz(iso);return {iso,first:row[0],year:row[1],month:row[2],day:d,leap:row[3],text,reading:[...text].map(c=>names[c]||c).join(''),meaning:`음력 ${row[1]}년 ${row[3]?'윤':''}${row[2]}월 ${d}일`}}
function expand(s,info,field='text'){return String(s||'').replace(/\{\{([^{}]+)\}\}/g,(all,key)=>{if(key==='날짜')return info.text;if(key==='날짜음')return info.reading;if(key==='날짜뜻')return info.meaning;let found=state.common.find(c=>c.key===key);return found?found[field]||'':all})}
function lineData(line,info){return {text:expand(line.text,info),reading:expand(line.reading||line.text,info,'reading'),meaning:expand(line.meaning||line.text,info,'meaning')}}
function render(){let info;try{info=getDate();$('#date-details').innerHTML=`음력 ${info.year}년 ${info.leap?'윤':''}${info.month}월 ${info.day}일 · 초하루 ${info.first}<br><strong>${info.text}</strong>`}catch(e){$('#date-details').innerHTML=`<span class="error">${esc(e.message)}</span>`;$('#verses').innerHTML='';return}
$('#list').innerHTML=state.docs.map((d,i)=>`<button class="doc-button ${i===selected?'active':''}" data-doc="${i}"><b>${String(i+1).padStart(2,'0')}</b> ${esc(d.name.replace(/^\d+\.\s*/,''))}</button>`).join('');let doc=state.docs[selected];$('#doc-num').textContent='PRAYER '+String(selected+1).padStart(2,'0');$('#doc-title').textContent=doc.name.replace(/^\d+\.\s*/,'');$('#verses').innerHTML=doc.lines.map(l=>{let x=lineData(l,info);return `<div class="verse"><div class="hanja">${esc(x.text)}</div><div><div class="reading">${esc(x.reading)}</div><div class="meaning">${esc(x.meaning)}</div></div></div>`}).join('');$('#print-area').innerHTML=state.docs.map(doc=>`<div class="print-page"><div class="print-text">${doc.lines.map(l=>`<span class="print-line">${esc(expand(l.text,info))}</span>`).join('')}</div></div>`).join('')}
function save(){localStorage.setItem('chukmun-v1',JSON.stringify(state));render();toast('저장했습니다.')}
let timer;function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('show'),2200)}
$('#list').onclick=e=>{let b=e.target.closest('[data-doc]');if(b){selected=Number(b.dataset.doc);render()}};$('#date').onchange=render;$('#print').onclick=()=>{try{getDate();window.print()}catch(e){toast(e.message)}};$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText(state.docs[selected].lines.map(l=>expand(l.text,getDate())).join('\n'));toast('원문을 복사했습니다.')}catch{toast('복사할 수 없습니다. 브라우저에서 직접 선택해 주세요.')}};
function settings(){ $('#edit-select').innerHTML=state.docs.map((d,i)=>`<option value="${i}" ${i===editing?'selected':''}>${esc(d.name)}</option>`).join('');$('#common-editor').innerHTML=state.common.map((c,i)=>`<div class="edit-card" data-common="${i}"><button class="remove" data-remove-common="${i}" aria-label="공통 구절 삭제">삭제</button><label>이름<input data-field="key" value="${esc(c.key)}"></label><label>한문<textarea data-field="text">${esc(c.text)}</textarea></label><label>한글 음<input data-field="reading" value="${esc(c.reading)}"></label><label>뜻<textarea data-field="meaning">${esc(c.meaning)}</textarea></label></div>`).join('');$('#line-editor').innerHTML=state.docs[editing].lines.map((l,i)=>`<div class="edit-card" data-line="${i}"><button class="remove" data-remove-line="${i}" aria-label="구절 삭제">삭제</button><label>구절 ${i+1} · 한문<textarea data-field="text">${esc(l.text)}</textarea></label><label>한글 음<input data-field="reading" value="${esc(l.reading)}" placeholder="공통 구절을 쓰면 비워 두세요"></label><label>뜻<textarea data-field="meaning" placeholder="공통 구절을 쓰면 비워 두세요">${esc(l.meaning)}</textarea></label></div>`).join('')}
$('#common-editor').oninput=e=>{let card=e.target.closest('[data-common]');if(card)state.common[+card.dataset.common][e.target.dataset.field]=e.target.value};$('#line-editor').oninput=e=>{let card=e.target.closest('[data-line]');if(card)state.docs[editing].lines[+card.dataset.line][e.target.dataset.field]=e.target.value};$('#common-editor').onclick=e=>{if(e.target.dataset.removeCommon!==undefined){state.common.splice(+e.target.dataset.removeCommon,1);settings()}};$('#line-editor').onclick=e=>{if(e.target.dataset.removeLine!==undefined){state.docs[editing].lines.splice(+e.target.dataset.removeLine,1);settings()}};$('#edit-select').onchange=e=>{editing=+e.target.value;settings()};$('#add-common').onclick=()=>{state.common.push({key:'새구절',text:'',reading:'',meaning:''});settings()};$('#add-line').onclick=()=>{state.docs[editing].lines.push({text:'',reading:'',meaning:''});settings()};$('#save').onclick=save;$('#reset').onclick=()=>{if(confirm('모든 템플릿을 처음 상태로 되돌릴까요?')){state=makeDefaults();save();settings()}};
function view(isSettings){$('#work').hidden=isSettings;$('#settings').hidden=!isSettings;$('#nav-work').classList.toggle('active',!isSettings);$('#nav-settings').classList.toggle('active',isSettings);if(isSettings)settings();else render();window.scrollTo(0,0)}$('#nav-work').onclick=()=>view(false);$('#nav-settings').onclick=()=>view(true);render();
