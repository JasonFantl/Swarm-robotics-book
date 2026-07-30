// Cases chosen to isolate copy-handler behaviour, since rendering is now constant.
// expect: 'same' means both handlers should agree; 'differ' names the mechanism.
module.exports = [
{ id:'frac', group:'Baseline · should agree', label:'inline fraction', expect:'same',
  html:(R)=>`<p>Coupling is scaled by ${R('\\frac{K}{N}')} in the update rule.</p>`,
  note:'Simplest case. If these two disagree here, something is wrong.' },

{ id:'matrix', group:'Baseline · should agree', label:'display matrix alone', expect:'same',
  html:(R)=>R('A = \\begin{bmatrix} 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 0 \\end{bmatrix}', true),
  note:'A block equation with no surrounding prose, so there are no line breaks to disagree about.' },

{ id:'nomathml', group:'Baseline · should agree', label:"KaTeX with output:'html'", expect:'same',
  html:(R,RH)=>`<p>Rendered without MathML, so there is no TeX anywhere: ${RH('\\frac{a}{b}')}.</p>`,
  note:'A real KaTeX configuration. Neither handler can find an annotation, so both stand aside and the browser flattens the glyphs. <b>Note what that costs:</b> your math is also unreadable to a screen reader in this mode. Do not use <code>output:\'html\'</code>.' },

{ id:'stripped', group:'Commitment', label:'MathML present, annotation removed', expect:'differ',
  reason:'copy-tex commits on seeing .katex-mathml; math-copy-tex commits only once it extracts TeX',
  html:()=>`<p>Synthetic case: <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>q</mi></mrow></semantics></math></span><span class="katex-html" aria-hidden="true">q</span></span> has MathML but no annotation.</p>`,
  note:'Contrived, but it exposes a design difference. copy-tex calls <code>preventDefault</code> as soon as it sees <code>.katex-mathml</code>, having already deleted the visible <code>.katex-html</code>, so it returns the hidden MathML text. math-copy-tex declines and lets the browser copy normally. Relevant if any build step of yours ever strips annotations.' },

{ id:'plain', group:'Baseline · should agree', label:'no math at all', expect:'same',
  html:()=>`<p>Plain prose with <em>emphasis</em>, a <a href="#frac">link</a>, and <code>code</code>. Neither handler should touch this.</p>`,
  note:'Both return early. This is the most important behaviour to get right and the one place they are provably equivalent.' },

{ id:'block', group:'Whitespace · innerText vs textContent', label:'display math between two sentences', expect:'differ',
  reason:'copy-tex uses textContent, so the equation does not get its own line',
  html:(R)=>`<p>Each agent pulls toward its neighbours:</p>${R('x_i(t+1) = x_i(t) + \\varepsilon \\sum_{j \\in \\mathcal{N}_i}\\bigl(x_j(t) - x_i(t)\\bigr)', true)}<p>This converges for small step sizes.</p>`,
  note:'<b>The headline difference.</b> Turn on <b>show whitespace</b> to see it clearly.' },

{ id:'aligned', group:'Whitespace · innerText vs textContent', label:'multi-line TeX source', expect:'differ',
  reason:'newlines inside the annotation, plus surrounding block breaks',
  html:(R)=>`<p>Metropolis weights:</p>${R('\\begin{aligned}\n  W_{ij} &= \\frac{1}{1 + \\max(d_i, d_j)} \\\\\n  W_{ii} &= 1 - \\sum_{j \\in \\mathcal{N}_i} W_{ij}\n\\end{aligned}', true)}<p>No global knowledge required.</p>`,
  note:'Two effects compound: whether the internal newlines survive, and whether the block gets its own line.' },

{ id:'table', group:'Whitespace · innerText vs textContent', label:'math in table cells', expect:'differ',
  reason:'innerText emits tabs between cells and newlines between rows',
  html:(R)=>`<table><thead><tr><th>topology</th><th>diameter</th><th>gap</th></tr></thead><tbody>
<tr><td>ring</td><td>${R('n/2')}</td><td>${R('\\Theta(1/n^2)')}</td></tr>
<tr><td>expander</td><td>${R('O(\\log n)')}</td><td>${R('\\Theta(1)')}</td></tr></tbody></table>`,
  note:'Paste each into a spreadsheet. Only one of them lands in the right columns.' },

{ id:'list', group:'Whitespace · innerText vs textContent', label:'math in list items', expect:'differ',
  reason:'list item boundaries produce newlines under innerText only',
  html:(R)=>`<ul><li>Ring of ${R('n = 256')} agents.</li><li>Bound: ${R('\\lambda_2 \\geq \\frac{4}{nD}')}</li><li>A third item.</li></ul>`,
  note:'Without line breaks the three items run into one another.' },

{ id:'hidden', group:'Hidden content', label:'math inside a closed &lt;details&gt;', expect:'differ',
  reason:'textContent includes display:none content; innerText excludes it',
  html:(R)=>`<p>Prose before.</p><details><summary>Optional derivation</summary><p>Substituting gives ${R('x(t+1) = Wx(t)')}, so the question reduces to the spectrum of ${R('W')}.</p></details><p>Prose after.</p>`,
  note:'<b>Matters directly for your book.</b> Leave it closed and copy. One handler silently copies text the reader never saw. Then open it and copy again.' },

{ id:'adj', group:'Delimiters', label:'adjacent inline math', expect:'differ',
  reason:'math-copy-tex inserts a separator; copy-tex does not',
  html:(R)=>`<p>Two equations with no gap: ${R('x')}${R('y')} should not fuse into ambiguous TeX.</p>`,
  note:'<code>$x$$y$</code> versus <code>$x$ $y$</code>. Many TeX parsers read the former as an opening display delimiter.' },

{ id:'eqno', group:'Delimiters', label:'numbered equation', expect:'differ',
  reason:'only math-copy-tex can drop the number via ignoreSelector',
  html:(R)=>`<p>The Laplacian:</p><div class="eq" id="eq-lap">${R('L = D - A', true)}<span class="eqno">(1)</span></div><p>Referenced as <a href="#eq-lap">(1)</a> above.</p>`,
  note:'With <b>drop eq numbers</b> off both keep the <code>(1)</code>. Turn it on and only math-copy-tex responds; copy-tex has no such option.' },

{ id:'partial', group:'Selection handling', label:'range clipping an equation', expect:'differ',
  reason:'copy-tex widens the live range, changing your visible highlight',
  html:(R)=>`<p>Drag a selection that starts partway inside the equation below and ends in this sentence.</p>${R('P(k) = \\frac{\\mu^k}{k!}e^{-\\mu}', true)}<p>Then look at what stays highlighted after you copy.</p>`,
  note:'Both widen to capture the whole formula, but copy-tex mutates <code>selection.getRangeAt(0)</code> in place. Set <b>writes to clipboard</b> to copy-tex to observe it; the preview column runs on a clone and cannot show it.' }
];
