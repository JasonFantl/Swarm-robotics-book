const { JSDOM } = require('jsdom');
const fs = require('fs');
const LIB = fs.readFileSync('../math-copy-tex.js','utf8');

function env(html) {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`);
  const w = dom.window;
  Object.defineProperty(w.HTMLElement.prototype,'innerText',
    { get(){ return this.textContent; }, configurable:true });
  new Function('self','window','document','Node','Element','navigator','module','define', LIB)
    (w,w,w.document,w.Node,w.Element,w.navigator,undefined,undefined);
  return w;
}
const M = (w, id, opts) => {
  const d = w.document, r = d.createRange();
  r.selectNodeContents(d.getElementById(id || 's'));
  const s = w.getSelection(); s.removeAllRanges(); s.addRange(r);
  return w.MathCopyTex.selectionToTex(s, opts);
};
const mm = (tex, body, attr='') =>
  `<math ${attr}><semantics>${body}<annotation encoding="application/x-tex">${tex}</annotation></semantics></math>`;

let findings = [];
function probe(name, fn) {
  try { fn(); } catch (e) { findings.push(['CRASH', name, e.message]); return; }
}
function report(sev, name, detail) { findings.push([sev, name, detail]); }

/* ---- A: TeX containing a dollar sign ---- */
probe('A dollar in TeX', () => {
  const w = env(`<div id=s><p>Cost ${mm('\\$5 \\text{ per unit}', '<mtext>$5 per unit</mtext>')} today.</p></div>`);
  const r = M(w);
  report(/\$\\\$5/.test(r.text) ? 'NOTE' : 'BUG', 'TeX containing $',
    JSON.stringify(r.text));
});

/* ---- B: empty annotation ---- */
probe('B empty annotation', () => {
  const w = env(`<div id=s><p>Before <math><semantics><mi>q</mi><annotation encoding="application/x-tex"></annotation></semantics></math> after.</p></div>`);
  const r = M(w);
  report(r.text.includes('$$') || /\$\$/.test(r.text) ? 'BUG' : (/\$\s*\$/.test(r.text) ? 'BUG' : 'OK'),
    'empty annotation', JSON.stringify(r.text) + ` equations=${r.equations}`);
});

/* ---- C: whitespace-only annotation ---- */
probe('C whitespace annotation', () => {
  const w = env(`<div id=s><p>A <math><semantics><mi>q</mi><annotation encoding="application/x-tex">   </annotation></semantics></math> B.</p></div>`);
  const r = M(w);
  report(/\$\$?\$/.test(r.text) ? 'BUG' : 'OK', 'whitespace-only annotation',
    JSON.stringify(r.text) + ` equations=${r.equations}`);
});

/* ---- D: two annotations, x-tex second ---- */
probe('D annotation order', () => {
  const w = env(`<div id=s><p>X <math><semantics><mi>q</mi><annotation encoding="text/x-asciimath">q</annotation><annotation encoding="application/x-tex">\\alpha</annotation></semantics></math> Y.</p></div>`);
  const r = M(w);
  report(r.text.includes('$\\alpha$') ? 'OK' : 'BUG', 'x-tex not first among annotations',
    JSON.stringify(r.text));
});

/* ---- E: nested math ---- */
probe('E nested math', () => {
  const inner = mm('\\beta', '<mi>\u03b2</mi>');
  const w = env(`<div id=s><p>N ${mm('\\alpha + \\text{'+ '\\beta' +'}', '<mi>\u03b1</mi><mo>+</mo><mtext>'+inner+'</mtext>')} M.</p></div>`);
  const r = M(w);
  const doubled = (r.text.match(/\$/g)||[]).length;
  report(doubled === 2 ? 'OK' : 'NOTE', 'nested <math>',
    JSON.stringify(r.text) + ` dollarSigns=${doubled} equations=${r.equations}`);
});

/* ---- F: selection entirely inside one equation ---- */
probe('F inside-one-equation', () => {
  const w = env(`<div id=s><p>Lead ${mm('a+b+c','<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi>')} tail.</p></div>`);
  const d = w.document;
  const mi = d.querySelectorAll('mi')[1];          // just the middle "b"
  const r = d.createRange(); r.selectNodeContents(mi);
  const s = w.getSelection(); s.removeAllRanges(); s.addRange(r);
  const out = w.MathCopyTex.selectionToTex(s);
  report(out.text === '$a+b+c$' ? 'NOTE' : 'BUG', 'selection wholly inside one equation',
    JSON.stringify(out.text) + '  (user selected only "b")');
});

/* ---- G: ignoreSelector that matches the math itself ---- */
probe('G ignoreSelector self-match', () => {
  const w = env(`<div id=s><p>A ${mm('x','<mi>x</mi>')} B.</p></div>`);
  const r = M(w, 's', { ignoreSelector: 'math' });
  report(r.equations === 0 ? 'NOTE' : 'BUG', 'ignoreSelector matching the equations',
    `equations=${r.equations} text=${JSON.stringify(r.text)}`);
});

/* ---- H: display attribute variants ---- */
probe('H display variants', () => {
  const w = env(`<div id=s>
    ${mm('a','<mi>a</mi>','display="block"')}
    ${mm('b','<mi>b</mi>','displaystyle="true"')}
    ${mm('c','<mi>c</mi>','display="inline"')}
  </div>`);
  const r = M(w);
  report(/\$\$a\$\$/.test(r.text) && /\$b\$/.test(r.text) ? 'NOTE' : 'BUG',
    'display attribute variants', JSON.stringify(r.text.replace(/\s+/g,' ')));
});

/* ---- I: selection inside a textarea / input ---- */
probe('I form field', () => {
  const w = env(`<div id=s><p>A ${mm('x','<mi>x</mi>')} B.</p><textarea id="ta">plain text here</textarea></div>`);
  const d = w.document, ta = d.getElementById('ta');
  ta.focus(); ta.setSelectionRange(0, 5);
  const s = w.getSelection();
  report(s.isCollapsed || s.rangeCount === 0 ? 'OK' : 'CHECK',
    'selection inside <textarea>',
    `getSelection: rangeCount=${s.rangeCount} collapsed=${s.isCollapsed} activeElement=${d.activeElement.tagName}`);
});

/* ---- J: shadow DOM ---- */
probe('J shadow DOM', () => {
  const w = env(`<div id=s><p>Host: <span id="h"></span></p></div>`);
  const d = w.document, host = d.getElementById('h');
  const sh = host.attachShadow({ mode: 'open' });
  sh.innerHTML = mm('\\gamma','<mi>\u03b3</mi>');
  const r = M(w);
  report(r.equations === 0 ? 'NOTE' : 'OK', 'equation inside shadow DOM',
    `equations=${r.equations} text=${JSON.stringify(r.text)}`);
});

/* ---- K: host div inherits page white-space ---- */
probe('K inherited white-space', () => {
  const w = env(`<style>body{white-space:pre}</style><div id=s><p>A ${mm('x','<mi>x</mi>')} B.</p></div>`);
  const r = M(w);
  report('NOTE', 'off-screen host inherits body styles',
    'host is appended to <body>, so body white-space / font / direction apply to innerText');
});

/* ---- L: large selection performance ---- */
probe('L performance', () => {
  const many = Array.from({length:400}, (_,i)=>`<p>Para ${i} with ${mm('x_{'+i+'}','<msub><mi>x</mi><mn>'+i+'</mn></msub>')} inline.</p>`).join('');
  const w = env(`<div id=s>${many}</div>`);
  const t0 = Date.now(); const r = M(w); const dt = Date.now() - t0;
  report(dt < 500 ? 'OK' : 'CHECK', '400 equations in one selection',
    `${r.equations} equations in ${dt} ms`);
});

/* ---- M: annotation is not a direct semantics child ---- */
probe('M deep annotation', () => {
  const w = env(`<div id=s><p>A <math><semantics><mrow><mi>x</mi></mrow><annotation-xml encoding="MathML-Content"><apply/></annotation-xml><annotation encoding="application/x-tex">x</annotation></semantics></math> B.</p></div>`);
  const r = M(w);
  report(r.text.includes('$x$') ? 'OK' : 'BUG', 'annotation-xml sibling present', JSON.stringify(r.text));
});

console.log('SEV    CASE                                   DETAIL');
console.log('-'.repeat(100));
findings.forEach(([s,n,d]) => console.log(`${s.padEnd(6)} ${n.padEnd(38)} ${d}`));
