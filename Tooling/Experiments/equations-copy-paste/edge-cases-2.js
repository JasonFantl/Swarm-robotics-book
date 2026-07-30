const { JSDOM } = require('jsdom');
const fs = require('fs');
const LIB = fs.readFileSync('../math-copy-tex.js','utf8');
function env(html){
  const dom=new JSDOM(`<!DOCTYPE html><body>${html}</body>`); const w=dom.window;
  Object.defineProperty(w.HTMLElement.prototype,'innerText',{get(){return this.textContent;},configurable:true});
  new Function('self','window','document','Node','Element','navigator','module','define',LIB)
    (w,w,w.document,w.Node,w.Element,w.navigator); return w;
}
const mm=(tex,body,attr='')=>`<math ${attr}><semantics>${body}<annotation encoding="application/x-tex">${tex}</annotation></semantics></math>`;
const all=(w,opts,id='s')=>{const d=w.document,r=d.createRange();r.selectNodeContents(d.getElementById(id));
  const s=w.getSelection();s.removeAllRanges();s.addRange(r);return w.MathCopyTex.selectionToTex(s,opts);};
const F=[]; const say=(sev,name,detail)=>F.push([sev,name,detail]);

/* 1. bare, unescaped $ inside the TeX */
{ const w=env(`<div id=s><p>A ${mm('a $ b','<mi>a</mi>')} B.</p></div>`);
  const t=all(w).text;
  say(/^A \\\\\(/.test(t)?'FIXED':'BUG','bare $ inside TeX source',
    JSON.stringify(t)+'  → auto-switched to paren delimiters'); }

/* 2. TeX containing $$ */
{ const w=env(`<div id=s>${mm('x $$ y','<mi>x</mi>','display="block"')}</div>`);
  { const t2=all(w).text;
    say(/^\\\\\[/.test(t2)?'FIXED':'BUG','$$ inside a display TeX source', JSON.stringify(t2)); } }

/* 3. same, with \\( \\) delimiters instead */
{ const w=env(`<div id=s><p>A ${mm('a $ b','<mi>a</mi>')} B.</p></div>`);
  say('OK','bare $ with paren delimiters',
    JSON.stringify(all(w,{inlineDelimiters:['\\(','\\)']}).text)); }

/* 4. selection spanning two different equations */
{ const w=env(`<div id=s><p>${mm('p','<mi>p</mi>')} mid ${mm('q','<mi>q</mi>')}</p></div>`);
  const d=w.document, mis=d.querySelectorAll('mi');
  const r=d.createRange(); r.setStart(mis[0].firstChild,0); r.setEnd(mis[1].firstChild,1);
  const s=w.getSelection(); s.removeAllRanges(); s.addRange(r);
  const t=w.MathCopyTex.selectionToTex(s).text;
  say(t==='$p$ mid $q$'?'OK':'CHECK','range starting in one equation, ending in another', JSON.stringify(t)); }

/* 5. backwards selection (focus before anchor) */
{ const w=env(`<div id=s><p>A ${mm('z','<mi>z</mi>')} B.</p></div>`);
  const d=w.document, p=d.querySelector('p'), s=w.getSelection();
  s.removeAllRanges();
  const r=d.createRange(); r.selectNodeContents(p); s.addRange(r);
  try { s.extend(p.firstChild,0); } catch(e){}
  say('OK','backwards selection', JSON.stringify(w.MathCopyTex.selectionToTex(s).text)); }

/* 6. multiple disjoint ranges (Firefox ctrl-click) */
{ const w=env(`<div id=s><p id=a>One ${mm('u','<mi>u</mi>')}.</p><p id=b>Two ${mm('v','<mi>v</mi>')}.</p></div>`);
  const d=w.document, s=w.getSelection(); s.removeAllRanges();
  [ 'a','b' ].forEach(id=>{const r=d.createRange();r.selectNodeContents(d.getElementById(id));s.addRange(r);});
  const out=w.MathCopyTex.selectionToTex(s);
  say(s.rangeCount>1?(out.equations===2?'OK':'CHECK'):'SKIP','multiple disjoint ranges',
    `rangeCount=${s.rangeCount} equations=${out.equations} text=${JSON.stringify(out.text)}`); }

/* 7. ignoreSelector wrapping an equation */
{ const w=env(`<div id=s><p>Keep ${mm('k','<mi>k</mi>')} <span class="drop">drop ${mm('d','<mi>d</mi>')}</span>.</p></div>`);
  const out=all(w,{ignoreSelector:'.drop'});
  say(out.equations===1?'OK':'CHECK','ignoreSelector containing an equation',
    `equations=${out.equations} text=${JSON.stringify(out.text)}`); }

/* 8. richText modes */
{ const w=env(`<div id=s><p>A ${mm('r','<mi>r</mi>')} <em>emph</em>.</p></div>`);
  const code=all(w,{richText:'code'}), ml=all(w,{richText:'mathml'});
  say(/<code>\$r\$<\/code>/.test(code.html)?'OK':'CHECK','richText:code html',
    JSON.stringify((code.html||'').slice(0,90)));
  say(/<math/.test(ml.html)&&/<em>/.test(ml.html)?'OK':'CHECK','richText:mathml html',
    JSON.stringify((ml.html||'').slice(0,90))); }

/* 9. annotation with surrounding newlines (aligned-style source) */
{ const w=env(`<div id=s>${mm('\n  \\begin{aligned}\n  a &= b\n  \\end{aligned}\n','<mi>a</mi>','display="block"')}</div>`);
  const t=all(w).text;
  say(/^\$\$\\begin/.test(t.trim())?'OK':'CHECK','leading/trailing newlines in annotation',
    JSON.stringify(t)); }

/* 10. another copy listener on the page that also preventDefaults */
{ const w=env(`<div id=s><p>A ${mm('c','<mi>c</mi>')} B.</p></div>`);
  let ours=0, theirs=0;
  w.MathCopyTex.install({ onCopy:()=>ours++ });
  w.document.addEventListener('copy',()=>theirs++);
  const d=w.document,r=d.createRange();r.selectNodeContents(d.getElementById('s'));
  const s=w.getSelection();s.removeAllRanges();s.addRange(r);
  const ev=new w.Event('copy',{bubbles:true,cancelable:true});
  ev.clipboardData={setData(){},getData(){return''}};
  d.dispatchEvent(ev);
  say('NOTE','a second copy listener on the page',
    `both ran (ours=${ours}, theirs=${theirs}); preventDefault does not stop other listeners`); }

/* 11. very long single equation */
{ const long='x_{1}'+' + x_{n}'.repeat(2000);
  const w=env(`<div id=s>${mm(long,'<mi>x</mi>','display="block"')}</div>`);
  const t0=Date.now(); const out=all(w); const dt=Date.now()-t0;
  say(out.text.length>10000&&dt<200?'OK':'CHECK','single 14 KB equation',
    `${out.text.length} chars in ${dt} ms`); }

/* 12. install() called twice must not stack listeners */
{ const w=env(`<div id=s><p>A ${mm('t','<mi>t</mi>')} B.</p></div>`);
  let n=0;
  w.MathCopyTex.install({onCopy:()=>n++}); w.MathCopyTex.install({onCopy:()=>n++});
  const d=w.document,r=d.createRange();r.selectNodeContents(d.getElementById('s'));
  const s=w.getSelection();s.removeAllRanges();s.addRange(r);
  const ev=new w.Event('copy',{bubbles:true,cancelable:true});
  ev.clipboardData={setData(){},getData(){return''}};
  d.dispatchEvent(ev);
  say(n===1?'OK':'BUG','install() twice', `onCopy fired ${n}×`); }

console.log('SEV    CASE                                        DETAIL');
console.log('-'.repeat(104));
F.forEach(([s,n,d])=>console.log(`${s.padEnd(6)} ${n.padEnd(43)} ${d}`));
