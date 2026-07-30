# math-copy-tex

**Make rendered mathematics on a web page copy as its LaTeX source.**

Select a paragraph that contains an equation, press copy, and the clipboard receives the TeX rather than the flattened glyph text a browser produces on its own.

```
without:  Coupling is scaled by KN and the gap decays like Θ(1/n2).
with:     Coupling is scaled by $\frac{K}{N}$ and the gap decays like $\Theta(1/n^2)$.
```

No dependencies, no build step, about 6 KB unminified. Works with KaTeX, Temml, MathJax's MathML output, and hand-written MathML.

> **This is not a browser extension.** Nobody installs anything. It is one script *you* add to *your* page, and every visitor gets the behaviour automatically. The word "extension" in KaTeX's documentation means an optional module of the library, which is a common source of confusion.

## Contents

- [Why this exists](#why-this-exists)
- [Demo](#demo)
- [Install](#install)
- [Requirements](#requirements)
- [Options](#options)
- [API](#api)
- [Per-equation copy buttons](#per-equation-copy-buttons)
- [How it works](#how-it-works)
- [Browser support](#browser-support)
- [Limitations](#limitations)
- [Comparison with KaTeX's copy-tex](#comparison-with-katexs-copy-tex)
- [Testing](#testing)
- [License](#license)

## Why this exists

Browsers copy the *text content* of a selection. For mathematics, that text content is the bare sequence of characters in the markup with all structure discarded:

| on the page | what you actually copy |
| --- | --- |
| a fraction, K over N | `KN` |
| n squared | `n2` |
| a 3×3 adjacency matrix | `011101110` |
| a piecewise definition | the branches run together |

This is worse than getting nothing, because it is *silently wrong*. Someone quoting your work pastes plausible-looking mathematics into their notes or their paper with no indication that anything was lost.

### Why there is no CSS-only fix

This comes up every time, so it is worth writing down.

- **No attribute or property substitutes text on copy.** `alt`, `title`, `aria-label`, and `data-*` are not copied.
- **CSS `content` is never in the DOM.** Text from `::before` / `::after` cannot be selected or copied, so the pseudo-element trick does not work.
- **Hidden-source markup gets copied twice.** Putting visually hidden LaTeX beside the rendered equation yields *both*, unless you suppress the visible copy with `user-select: none`. WebKit does not honour `user-select: none` when copying and [closed that as working-as-intended](https://bugs.webkit.org/show_bug.cgi?id=80159); Chromium behaves the same way. Only Firefox excludes it. So that approach is correct in one browser and produces doubled output in the other two.

Overriding the `copy` event is the mechanism the platform actually provides. That is all this library is.

## Demo

Open [`example.html`](example.html) directly from disk. It needs no server and no network: 24 cases, all equations pre-rendered, fonts inlined, with a live side-by-side of the browser's own output against the library's.

Start with `frac`, `block`, `table`, and `details`.

## Install

Drop it in. It installs itself with sensible defaults.

```html
<script src="math-copy-tex.js"></script>
```

To configure, opt out of auto-install and call `install` yourself:

```html
<script src="math-copy-tex.js" data-manual></script>
<script>
  MathCopyTex.install({
    blockDelimiters: ['\\[', '\\]'],
    ignoreSelector: '.eqno',
    richText: 'code'
  });
</script>
```

Also works as a CommonJS or AMD module. Nothing is published to npm; copy the file.

## Requirements

Your equations must carry their LaTeX source in an `<annotation encoding="application/x-tex">` element. The library reads the TeX from there and never attempts to reconstruct it from rendered output.

| Renderer | Status |
| --- | --- |
| [KaTeX](https://katex.org) | Works with no configuration. Keep the default `output: 'htmlAndMathml'`. |
| [Temml](https://temml.org) | Works with no configuration. Set `annotate: true`. |
| MathJax, MathML output | Annotation present by default. |
| MathJax, SVG or CHTML output | **Not supported.** No annotation reaches the DOM. |
| Hand-written MathML | Add the annotation yourself. |

Both KaTeX and Temml can render at build time, so nothing needs to run in the shipped page except this handler.

### Recommended CSS

```css
math annotation { display: none; }
```

MathML Core's user-agent stylesheet should already hide non-first children of `<semantics>`, but browsers have been inconsistent about it. Without this, a browser that gets it wrong would display your TeX on the page and duplicate it in every copy. It costs nothing to be explicit.

## Options

| Option | Default | Description |
| --- | --- | --- |
| `mathSelector` | `'math, .katex-display, .katex'` | Where to find equations. Covers native MathML and KaTeX's HTML output. Outermost match wins. |
| `inlineDelimiters` | `['$', '$']` | Wrappers for inline math. |
| `blockDelimiters` | `['$$', '$$']` | Wrappers for display math. |
| `fallbackInlineDelimiters` | `['\\(', '\\)']` | Used for a single equation whose own TeX contains the primary delimiter. `null` disables the substitution. |
| `fallbackBlockDelimiters` | `['\\[', '\\]']` | Same, for display math. |
| `annotationSelector` | `'annotation[encoding="application/x-tex"]'` | Where the TeX lives. |
| `isBlock` | checks `display="block"`, `.katex-display`, and a descendant `math[display="block"]` | Decides display versus inline. Override for other markup conventions. |
| `preserveTexNewlines` | `true` | Keeps newlines and indentation inside multi-line sources such as `\begin{aligned}`. |
| `separateAdjacent` | `true` | Inserts a space between back-to-back equations, so you get `$x$ $y$` rather than the ambiguous `$x$$y$`. |
| `ignoreSelector` | `null` | Elements to drop from the copy. Typically `'.eqno'` for equation numbers. |
| `richText` | `'off'` | Second clipboard flavour. See below. |
| `onCopy` | `null` | `function(text, result)`, called after each handled copy. For debugging. |
| `root` | `document` | Where to attach the listener. |

### `richText`

The clipboard holds several representations at once and the receiving application chooses one. Plain-text editors take `text/plain`; word processors and rich editors prefer `text/html`.

| Value | Behaviour |
| --- | --- |
| `'off'` | Only `text/plain` is set. Rich targets paste unstyled TeX: formatting is lost, TeX survives. |
| `'code'` | Also sets `text/html`, with equations as `<code>$$…$$</code>`. Formatting survives and the source stays legible in every target. **Safest if you want both.** |
| `'mathml'` | Also sets `text/html` with the markup intact. Best where the target understands MathML, unpredictable where it does not. Word uses OMML internally and may render, flatten, or drop it. |

## API

```js
MathCopyTex.install(options)      // start intercepting; replaces any prior configuration
MathCopyTex.uninstall()           // stop
MathCopyTex.isInstalled()         // → boolean

MathCopyTex.texFor(el)            // → TeX string, or null if this element has none
MathCopyTex.selectionToTex(sel)   // → { text, html, equations } without touching the clipboard
MathCopyTex.copyElement(el)       // → Promise<boolean>, for a copy button
MathCopyTex.copyText(str)         // → Promise<boolean>, with a non-secure-context fallback

MathCopyTex.defaults              // the defaults object
MathCopyTex.version
```

`selectionToTex` is the useful one for testing: it returns exactly what would be written, so you can assert on it without touching a clipboard.

## Per-equation copy buttons

Selection is awkward on touch devices, where dragging handles across a block-level equation is genuinely difficult. A tap target solves that, and `copyElement` handles the clipboard details:

```html
<div class="eq">
  <span class="katex-display">…</span>
  <button class="copy" aria-label="Copy LaTeX">Copy</button>
</div>
```

```js
document.querySelectorAll('.eq').forEach(function (eq) {
  var btn = eq.querySelector('.copy');
  btn.addEventListener('click', function () {
    MathCopyTex.copyElement(eq.querySelector('.katex, math')).then(function (ok) {
      btn.textContent = ok ? 'Copied' : 'Failed';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
    });
  });
});
```

`copyElement` and `copyText` use `navigator.clipboard` where available and fall back to a transient textarea with `document.execCommand('copy')`. That fallback is what makes them work over `file://` and plain HTTP, where `navigator.clipboard` is `undefined` and fails silently. Both must be called inside a user gesture.

Give the button a visible confirmation. `navigator.clipboard.writeText` provides no feedback of its own, and without it people tap repeatedly.

## How it works

1. Listen for `copy` on `document`.
2. Clone the selection's range, widening each endpoint outward past any equation it merely clips. A clipped subtree contains no annotation to read.
3. Clone the range contents into a detached fragment.
4. Replace each equation in the fragment with a node carrying its TeX in delimiters. Display math becomes a block element so line breaking is handled by layout rather than guessed at.
5. Extract text with `innerText`, by mounting the fragment off-screen for one synchronous read.
6. Write to `clipboardData` and call `preventDefault`.

Two details are worth knowing.

**Why `innerText` and not `textContent`.** `innerText` respects layout: newlines at block boundaries, tabs between table cells, collapsed whitespace runs, and content hidden with `display:none` excluded. `textContent` does none of that, which is why display equations run into surrounding prose and hidden content leaks into the clipboard. `innerText` requires the node to be rendered, hence the off-screen mount.

**Why `clipboardData` and not `navigator.clipboard`.** `ClipboardEvent.clipboardData` does not require a secure context. The asynchronous `navigator.clipboard` API does, and is `undefined` outside HTTPS and localhost. Using the event means the handler still works when someone opens your page from their filesystem.

The handler declines and lets the browser proceed whenever the selection is empty, sits inside an editable region, or contains no equation it could rewrite. It never alters an ordinary text copy.

## Browser support

The `copy` event has been available across browsers since July 2015 and `ClipboardEvent.clipboardData` since March 2017, on desktop and mobile alike. Neither requires a secure context.

Tested against Chrome, Firefox, Safari, and Edge, with KaTeX 0.18.1 and Temml 0.13.3. Browsers disagree more about whitespace and hidden content than they do about the mathematics.

## Limitations

**It requires JavaScript.** There is no CSS or markup-only alternative, for the reasons above. With scripting disabled a reader gets the browser's native flattening.

**It requires the annotation.** Equations with no `<annotation encoding="application/x-tex">`, or an empty one, are left entirely alone and fall through to native behaviour. This is deliberate: guessing TeX from rendered output would be worse than an honest failure.

**It sometimes copies more than you selected.** A selection that clips an equation partway is widened to cover the whole equation. Usually invisible, occasionally surprising.

**Whitespace fidelity is approximate.** `innerText` is much closer to real copy behaviour than `textContent`, but it is not identical to what each browser would have produced, and the details vary between browsers.

**Delimiters can switch on a single equation.** If an equation's own TeX contains `$`, wrapping it in `$…$` produces something a naive `$`-scanning parser splits in the wrong place. That equation is emitted with `\(…\)` instead, so output is not always uniform. Set `fallbackInlineDelimiters: null` to force one pair, or make `\(…\)` your primary and avoid the question.

**Equations inside a shadow root are invisible to it.** `querySelectorAll` does not cross shadow boundaries. There is no workaround short of running a handler inside each shadow root.

**Only `display="block"` and `.katex-display` mean display math.** `displaystyle="true"` is a style hint, not a block signal, and is treated as inline. Override `isBlock` if your markup differs.

**Multiple disjoint ranges are joined with newlines, and this path is untested.** Firefox is the only browser that can produce them, via ctrl-click. jsdom collapses multiple ranges to one, so the behaviour has been reasoned about rather than exercised.

**It does not stop other copy listeners.** `preventDefault()` cancels the browser's default action, not other handlers. If a second `copy` listener also calls `setData('text/plain', …)`, whichever runs last wins. In particular, **do not load KaTeX's `copy-tex` alongside this.**

**Select-all on a long document takes a moment.** Roughly 280 ms for 400 equations in one selection, dominated by the `innerText` layout pass. A single large equation is cheap by comparison: 16 KB of TeX in about 5 ms. The cost is per-equation, not per-byte.

**The off-screen measuring element inherits your body styles.** It is appended to `<body>` for one synchronous read, so an unusual `white-space`, `direction`, or `font` on `body` affects the extracted text.

**It does not fix mobile selection ergonomics.** See [per-equation copy buttons](#per-equation-copy-buttons).

**It has nothing to do with accessibility.** Screen readers read the DOM and the accessibility tree, not the clipboard. This library neither helps nor hinders them. Your mathematics is accessible because it is MathML, which is also the reason this library has an annotation to read. The two concerns are satisfied by the same decision, but they are not the same concern.

**It is not a content protection mechanism.** It changes what copying produces, not whether copying is possible.

**Escape `</script>` if you inline it.** This file deliberately contains no literal `</script>` sequence, so it is safe to paste into a `<script>` block. If you build single-file bundles, run every inlined script through `s.replace(/<\/script>/gi, '<\\/script>')` regardless, because one such sequence anywhere silently truncates the rest of your page.

## Comparison with KaTeX's copy-tex

KaTeX ships a `copy-tex` contrib module that solves the same problem. It is a competent hundred-line file, and if it meets your needs you do not need this. The differences, from reading its source at 0.18.1:

| | copy-tex | math-copy-tex |
| --- | --- | --- |
| Text extraction | `textContent` | `innerText` |
| Display math on its own line | no | yes |
| Table cells become tabs and rows | no | yes |
| Hidden content excluded | no | yes |
| Renderers | KaTeX only | KaTeX, Temml, MathJax MathML, hand-written |
| Configuration | edit the source | options object |
| `uninstall` | no | yes |
| Drop equation numbers | no | `ignoreSelector` |
| Separator between adjacent equations | no | `separateAdjacent` |
| `text/html` flavour | always on | three modes |
| Selection ranges handled | first only | all |
| Mutates your visible selection | yes | no |

The last two deserve expanding. copy-tex reads `selection.getRangeAt(0)`, singular, so disjoint selections lose everything after the first range. And it calls `setStartBefore` on that live range rather than on a clone, so widening it to capture a clipped formula also changes what stays highlighted after you copy.

Both libraries decline cleanly when a selection contains no mathematics, which is the single most important behaviour to get right.

## Testing

Test scripts run under Node with `jsdom` and `katex`:

```
npm install --no-save jsdom katex temml
node test/verify-pipelines.js    # KaTeX and Temml produce identical output
node test/verify-handlers.js     # 13 predicted differences against copy-tex
node test/edge-cases-1.js        # 13 edge-case probes
node test/edge-cases-2.js        # 13 more
```

`jsdom` does not implement `innerText`, so the tests approximate it. Results for delimiters, separators, declines, and `ignoreSelector` are exact; whitespace results are indicative, and a real browser is the authority.

Four bugs were found this way and fixed, which is a reasonable argument for keeping the tests around:

- A nested `<math>` carries its own annotation, which appears *first* in document order. A plain `querySelector` returned the inner equation's source for the outer equation.
- An empty annotation produced bare `$$` delimiters in the middle of prose.
- `copyText`'s `execCommand` fallback fired a `copy` event that re-entered the handler.
- TeX containing `$` produced unbalanced delimiters.

## License

MIT. Add a `LICENSE` file containing the MIT text before publishing.
