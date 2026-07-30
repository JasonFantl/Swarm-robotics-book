const { JSDOM } = require('jsdom');
const katex = require('katex');
const fs = require('fs');
const cases = require('./cases2.js');
const LIB = fs.readFileSync('../math-copy-tex.js','utf8');
const R = (t,d)=>katex.renderToString(t,{displayMode:!!d,output:'htmlAndMathml',throwOnError:false,strict:false});
const RH = (t,d)=>katex.renderToString(t,{displayMode:!!d,output:'html',throwOnError:false,strict:false});

/* jsdom has no innerText. Approximate Chrome's behaviour closely enough to
   predict the whitespace and hidden-content differences: block boundaries
   produce newlines, table cells tabs, closed <details> bodies are skipped. */
const BLOCK = new Set(['P','DIV','LI','UL','OL','TR','TABLE','TBODY','THEAD','DETAILS','SUMMARY',
                       'H1','H2','H3','H4','H5','H6','PRE','BLOCKQUOTE','FIGURE','FIGCAPTION','SECTION']);
function fakeInnerText(root, win) {
  let out = '';
  (function walk(n, hidden, pre) {
    if (n.nodeType === 3) { if (!hidden) out += pre ? n.data : n.data.replace(/\s+/g,' '); return; }
    if (n.nodeType !== 1) return;
    const tag = n.tagName;
    let h = hidden, p2 = pre;
    if (n.getAttribute && n.getAttribute('aria-hidden') === 'true' &&
        (n.classList.contains('katex-mathml') || false)) { /* still copied */ }
    const style = (n.getAttribute && n.getAttribute('style')) || '';
    if (/display\s*:\s*none/.test(style)) h = true;
    if (/white-space\s*:\s*pre/.test(style)) p2 = true;   // preserveTexNewlines
    if (tag === 'ANNOTATION') h = true;                     // hidden by UA sheet
    const inClosedDetails = n.closest && n.closest('details:not([open])');
    if (inClosedDetails && tag !== 'SUMMARY' && !n.closest('summary')) h = true;
    const isBlock = BLOCK.has(tag) || (tag === 'MATH' && n.getAttribute('display') === 'block')
                    || (n.classList && n.classList.contains('katex-display'));
    if (isBlock && !h && out && !out.endsWith('\n')) out += '\n';
    if (tag === 'TD' || tag === 'TH') { if (!h && out && !/[\n\t]$/.test(out)) out += '\t'; }
    for (const c of n.childNodes) walk(c, h, p2);
    if (isBlock && !h && out && !out.endsWith('\n')) out += '\n';
  })(root, false, false);
  return out.replace(/[ ]{2,}/g,' ').replace(/\n{3,}/g,'\n\n').trim();
}

/* copy-tex, same logic as the page */
function copyTex(range) {
  const closest = n => { const e = n.nodeType===1?n:n.parentElement; return e && e.closest('.katex'); };
  const s = closest(range.startContainer); if (s) range.setStartBefore(s);
  const e = closest(range.endContainer);   if (e) range.setEndAfter(e);
  const frag = range.cloneContents();
  if (!frag.querySelector('.katex-mathml')) return null;
  frag.querySelectorAll('.katex-mathml + .katex-html').forEach(x=>x.remove());
  frag.querySelectorAll('.katex-mathml').forEach(el=>{
    const tex = el.querySelector('annotation');
    if (tex) { el.replaceWith(tex); tex.innerHTML = '$'+tex.innerHTML+'$'; }
  });
  frag.querySelectorAll('.katex-display annotation').forEach(x=>{
    x.innerHTML = '$$'+x.innerHTML.substr(1, x.innerHTML.length-2)+'$$';
  });
  return frag.textContent;                                  // <-- textContent
}

let fails = 0;
for (const c of cases) {
  const dom = new JSDOM(`<!DOCTYPE html><body><div id="s">${c.html(R,RH)}</div></body>`);
  const w = dom.window;
  Object.defineProperty(w.HTMLElement.prototype,'innerText',{
    get(){ return fakeInnerText(this, w); }, configurable:true });
  new Function('self','window','document','Node','Element','navigator','module','define', LIB)
    (w,w,w.document,w.Node,w.Element,w.navigator,undefined,undefined);

  const d = w.document, mk = () => { const r=d.createRange(); r.selectNodeContents(d.getElementById('s')); return r; };
  const sel = w.getSelection(); sel.removeAllRanges(); sel.addRange(mk());

  const a = copyTex(mk());
  const m = w.MathCopyTex.selectionToTex(sel, { ignoreSelector: c.id==='eqno' ? '.eqno' : null });
  const A = a === null ? '(declined)' : a;
  const B = m.equations ? m.text : '(declined)';

  const same = A === B;
  const ok = (c.expect === 'same') === same;
  if (!ok) fails++;
  console.log(`${ok?'PASS':'FAIL'}  ${c.id.padEnd(9)} expect=${c.expect.padEnd(6)} actual=${same?'same':'differ'}`);
  if (!ok || c.expect === 'differ') {
    console.log(`         copy-tex: ${JSON.stringify(A.slice(0,110))}`);
    console.log(`         math-cp : ${JSON.stringify(B.slice(0,110))}`);
  }
}
console.log(fails ? `\n${fails} prediction(s) wrong` : `\nall ${cases.length} predictions confirmed`);
process.exit(fails?1:0);
