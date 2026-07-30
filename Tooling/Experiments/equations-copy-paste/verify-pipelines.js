const { JSDOM } = require('jsdom');
const katex = require('katex');
const temml = require('temml');
const fs = require('fs');
const LIB = fs.readFileSync('../math-copy-tex.js', 'utf8');

function load(html) {
  const dom = new JSDOM(`<!DOCTYPE html><body><div id="s">${html}</div></body>`);
  const w = dom.window;
  Object.defineProperty(w.HTMLElement.prototype, 'innerText', {
    get() { return this.textContent; }, configurable: true
  });
  // Give the UMD wrapper a clean browser-ish global to attach to.
  const fn = new Function('self', 'window', 'document', 'Node', 'Element',
                          'navigator', 'module', 'define', LIB);
  fn(w, w, w.document, w.Node, w.Element, w.navigator, undefined, undefined);
  if (!w.MathCopyTex) throw new Error('library did not attach');
  return w;
}

function copyAll(w, opts) {
  const d = w.document;
  const range = d.createRange();
  range.selectNodeContents(d.getElementById('s'));
  const sel = w.getSelection();
  sel.removeAllRanges(); sel.addRange(range);
  return w.MathCopyTex.selectionToTex(sel, opts);
}

const cases = {
  'KaTeX': () => {
    const i = katex.renderToString('\\frac{K}{N}');
    const b = katex.renderToString('L = D - A', { displayMode: true });
    return `<p>Scaled by ${i} exactly.</p>${b}<p>More prose.</p>`;
  },
  'Temml': () => {
    const i = temml.renderToString('\\frac{K}{N}', { annotate: true });
    const b = temml.renderToString('L = D - A', { displayMode: true, annotate: true });
    return `<p>Scaled by ${i} exactly.</p>${b}<p>More prose.</p>`;
  }
};

let fail = 0;
for (const [name, build] of Object.entries(cases)) {
  const w = load(build());
  const r = copyAll(w);
  const flat = r.text.replace(/\s+/g, ' ').trim();
  const okInline = flat.includes('$\\frac{K}{N}$');
  const okBlock = flat.includes('$$L = D - A$$');
  const noSoup = !/NK|L=D/.test(flat);           // leftover glyph text
  const ok = okInline && okBlock && noSoup;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(6)} n=${r.equations}`);
  console.log(`        ${JSON.stringify(flat)}`);
  if (!ok) console.log(`        inline:${okInline} block:${okBlock} noGlyphSoup:${noSoup}`);
}

// no-math selections must be left entirely to the browser
const w = load('<p>Just prose, no math at all.</p>');
const r = copyAll(w);
console.log(`${r.equations === 0 ? 'PASS' : 'FAIL'}  stand-down on plain text (n=${r.equations})`);
if (r.equations !== 0) fail++;

process.exit(fail ? 1 : 0);
