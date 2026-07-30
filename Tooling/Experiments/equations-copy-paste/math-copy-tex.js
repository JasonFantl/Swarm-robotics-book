/*!
 * math-copy-tex 1.0.0
 *
 * Makes rendered math copy as its LaTeX source. When a reader selects a
 * paragraph containing an equation and presses copy, the clipboard receives
 * the TeX from the equation's <annotation encoding="application/x-tex">
 * element instead of the flattened glyph text the browser would produce.
 *
 * No dependencies. Works over file:// because it uses ClipboardEvent's
 * clipboardData rather than the secure-context-gated navigator.clipboard.
 *
 * MIT License.
 */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.MathCopyTex = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------------------------------------------------------------
   * Defaults
   * ------------------------------------------------------------------ */

  var DEFAULTS = {
    // Where to look for equations. The default handles both native MathML
    // (Temml, MathJax MathML output, hand-written) and KaTeX's HTML output,
    // where the whole .katex span must be replaced so the visible glyph spans
    // go along with the hidden MathML.
    // Outermost-first so KaTeX's .katex-display wrapper wins over the .katex
    // it contains, and both win over the MathML hidden inside them.
    mathSelector: 'math, .katex-display, .katex',

    // Wrappers placed around the TeX on the clipboard.
    inlineDelimiters: ['$', '$'],
    blockDelimiters: ['$$', '$$'],

    // Used for a single equation whose own TeX source contains the primary
    // delimiter, where wrapping in $...$ would produce something a naive
    // $-scanning parser splits in the wrong place. Set either to null to
    // disable the substitution and always use the primary pair.
    fallbackInlineDelimiters: ['\\(', '\\)'],
    fallbackBlockDelimiters: ['\\[', '\\]'],

    // Where the TeX source lives inside an equation.
    annotationSelector: 'annotation[encoding="application/x-tex"]',

    // Decides whether an equation is display or inline. Override if your
    // markup signals block math some other way.
    isBlock: function (el) {
      if (el.getAttribute('display') === 'block') return true;      // MathML
      if (el.classList.contains('katex-display')) return true;      // KaTeX wrapper
      // KaTeX marks the inner MathML display="block" in displayMode, which also
      // catches the case where the .katex-display wrapper is not in the range.
      return !!(el.querySelector && el.querySelector('math[display="block"]'));
    },

    // Keep newlines and indentation that exist inside the annotation. Without
    // this, CSS whitespace collapsing flattens a multi-line \begin{aligned}
    // source onto one line. The TeX still compiles either way.
    preserveTexNewlines: true,

    // Insert a space between two equations that sit directly against each
    // other, so you get '$x$ $y$' rather than the ambiguous '$x$$y$'.
    separateAdjacent: true,

    // Elements to drop from the copy entirely. Typical use is equation
    // numbers, e.g. '.eqno'. Null keeps everything.
    ignoreSelector: null,

    // Second clipboard flavour for rich-text targets like Word and Google
    // Docs, which prefer text/html and only fall back to text/plain.
    //   'off'    only text/plain is set. Rich targets paste unstyled TeX.
    //   'code'   markup is preserved, equations become <code>$$...$$</code>.
    //   'mathml' markup is preserved verbatim, equations stay as MathML.
    // 'mathml' looks best where the target understands MathML and is
    // unpredictable where it does not. 'code' is the safe middle.
    richText: 'off',

    // Called with the final plain-text string after each handled copy.
    // Useful for debugging; leave null in production.
    onCopy: null
  };

  var state = { options: null, listener: null, target: null };

  // Set while we drive document.execCommand('copy') ourselves, so the copy
  // event that produces does not re-enter the handler.
  var suppress = false;

  /* ---------------------------------------------------------------------
   * Helpers
   * ------------------------------------------------------------------ */

  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (!src) continue;
      for (var k in src) {
        if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
      }
    }
    return target;
  }

  function toArray(list) {
    return Array.prototype.slice.call(list);
  }

  /**
   * Read the LaTeX source out of an equation element.
   * Returns null when there is no annotation to read, which is the signal to
   * leave that equation alone rather than guess.
   */
  function texFor(el, options) {
    var opts = assign({}, DEFAULTS, options || state.options);
    if (!el || !el.querySelector) return null;

    // The equation this element represents is the first <math> at or inside it:
    // el itself for plain MathML, the one in .katex-mathml for KaTeX.
    var scope = (el.matches && el.matches('math')) ? el : el.querySelector('math');
    if (!scope) scope = el;

    var anns = scope.querySelectorAll(opts.annotationSelector);
    for (var i = 0; i < anns.length; i++) {
      // A <math> nested inside this one (e.g. via <mtext>) carries its own
      // annotation, which appears first in document order. Skip those.
      var owner = anns[i].closest ? anns[i].closest('math') : null;
      if (owner && owner !== scope) continue;
      var tex = anns[i].textContent.trim();
      if (tex) return tex;             // an empty source is not usable TeX
    }
    return null;
  }

  /**
   * Climb from a node to the outermost equation element containing it, or
   * null if the node is not inside one. Climbing past the first match
   * handles the unusual case of nested <math>.
   */
  function enclosingMath(node, selector) {
    var el = node && node.nodeType === 1 ? node : (node ? node.parentElement : null);
    var found = null;
    var hit;
    while (el && el.closest && (hit = el.closest(selector))) {
      found = hit;
      el = hit.parentElement;
    }
    return found;
  }

  /**
   * Turn a fragment into text the way the browser would.
   *
   * innerText respects layout: it breaks lines at block boundaries, tabs
   * between table cells, collapses whitespace runs, and skips content hidden
   * with display:none or visibility:hidden. textContent does none of that.
   * innerText needs the node rendered, so mount it off-screen for one
   * synchronous read rather than hiding it.
   */
  // Selections inside a contenteditable region belong to whatever editor owns
  // it; rewriting those would corrupt the user's own text.
  function inEditable(selection) {
    var n = selection.anchorNode;
    var el = n && (n.nodeType === 1 ? n : n.parentElement);
    if (!el || !el.closest) return false;
    return !!el.closest('input, textarea, [contenteditable=""], [contenteditable="true"]');
  }

  /**
   * Choose delimiters that do not appear inside the TeX itself. Falls back to
   * the primary pair when neither is safe, since something has to be emitted.
   */
  function pickDelimiters(tex, block, opts) {
    var primary = block ? opts.blockDelimiters : opts.inlineDelimiters;
    var fb = block ? opts.fallbackBlockDelimiters : opts.fallbackInlineDelimiters;
    if (!fb) return primary;
    var hits = function (d) {
      return tex.indexOf(d[0]) !== -1 || tex.indexOf(d[1]) !== -1;
    };
    if (!hits(primary)) return primary;
    return hits(fb) ? primary : fb;
  }

  function fragmentToText(fragment) {
    var host = document.createElement('div');
    host.appendChild(fragment);
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText =
      'position:fixed;left:-99999px;top:0;width:60ch;height:auto;' +
      'pointer-events:none;';
    document.body.appendChild(host);
    var text;
    try {
      text = host.innerText;
    } catch (err) {
      text = null;
    }
    if (typeof text !== 'string') text = host.textContent;
    host.remove();
    return text;
  }

  /**
   * Swap every equation in a fragment for a node carrying its TeX source.
   * Mutates the fragment. Returns the number of equations replaced.
   */
  function substituteTex(fragment, opts, asCode) {
    var equations = toArray(fragment.querySelectorAll(opts.mathSelector));

    // Work out adjacency before any replacement, since replacing changes
    // what previousSibling reports.
    var touchesPrevious = equations.map(function (el) {
      var prev = el.previousSibling;
      return !!(prev && prev.nodeType === 1 && prev.matches &&
                prev.matches(opts.mathSelector));
    });

    var replaced = 0;

    equations.forEach(function (el, i) {
      var tex = texFor(el, opts);
      if (tex === null) return;               // no source: leave it rendered

      var block = !!opts.isBlock(el);
      var delims = pickDelimiters(tex, block, opts);
      var payload = delims[0] + tex + delims[1];

      if (!block && opts.separateAdjacent && touchesPrevious[i]) {
        payload = ' ' + payload;
      }

      var node;
      if (asCode) {
        node = document.createElement('code');
        node.textContent = payload;
        if (block) {
          var pre = document.createElement('div');
          pre.appendChild(node);
          node = pre;
        }
      } else if (block) {
        // A block element makes innerText break the line for us, so we never
        // have to guess where newlines belong.
        node = document.createElement('div');
        if (opts.preserveTexNewlines) node.style.whiteSpace = 'pre-wrap';
        node.textContent = payload;
      } else {
        node = document.createTextNode(payload);
      }

      // An outer match (e.g. KaTeX's .katex-display) may already have removed
      // this element's whole subtree from the fragment.
      if (!fragment.contains(el)) return;
      el.replaceWith(node);
      replaced++;
    });

    // An annotation we did not consume must not leak in as a second copy of
    // the same equation.
    toArray(fragment.querySelectorAll('annotation')).forEach(function (n) {
      n.remove();
    });

    return replaced;
  }

  /**
   * Clone a range, widening it so that any equation it merely clips is
   * captured whole. A range ending halfway through an equation would
   * otherwise clone a subtree with no annotation in it.
   */
  function widenedClone(range, selector) {
    var out = range.cloneRange();
    var start = enclosingMath(out.startContainer, selector);
    if (start) out.setStartBefore(start);
    var end = enclosingMath(out.endContainer, selector);
    if (end) out.setEndAfter(end);
    return out;
  }

  /* ---------------------------------------------------------------------
   * Core
   * ------------------------------------------------------------------ */

  /**
   * Build the clipboard payloads for a selection without touching the
   * clipboard. Exposed so you can unit-test or preview the output.
   *
   * @returns {{text: string, html: string|null, equations: number}}
   */
  function selectionToTex(selection, options) {
    var opts = assign({}, DEFAULTS, state.options, options);
    var sel = selection || window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) {
      return { text: '', html: null, equations: 0 };
    }

    var textParts = [];
    var htmlParts = [];
    var count = 0;

    for (var i = 0; i < sel.rangeCount; i++) {
      var range = widenedClone(sel.getRangeAt(i), opts.mathSelector);

      // Rich-text flavour is built from its own clone so the plain-text pass
      // cannot disturb it.
      if (opts.richText !== 'off') {
        var richFrag = range.cloneContents();
        if (opts.ignoreSelector) {
          toArray(richFrag.querySelectorAll(opts.ignoreSelector))
            .forEach(function (n) { n.remove(); });
        }
        if (opts.richText === 'code') substituteTex(richFrag, opts, true);
        var richHost = document.createElement('div');
        richHost.appendChild(richFrag);
        htmlParts.push(richHost.innerHTML);
      }

      var frag = range.cloneContents();
      if (opts.ignoreSelector) {
        toArray(frag.querySelectorAll(opts.ignoreSelector))
          .forEach(function (n) { n.remove(); });
      }
      count += substituteTex(frag, opts, false);
      textParts.push(fragmentToText(frag));
    }

    return {
      text: textParts.join('\n'),
      html: htmlParts.length ? htmlParts.join('') : null,
      equations: count
    };
  }

  function handleCopy(event) {
    var opts = state.options;
    if (suppress) return;                      // our own programmatic copy
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) return;
    if (inEditable(sel)) return;               // let editors copy natively

    var result;
    try {
      result = selectionToTex(sel, opts);
    } catch (err) {
      // Never break a plain copy because of a bug in here.
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[math-copy-tex] falling back to native copy:', err);
      }
      return;
    }

    // Nothing to improve on: let the browser do its normal thing so we do
    // not subtly alter ordinary text copies.
    if (!result.equations) return;

    event.clipboardData.setData('text/plain', result.text);
    if (result.html) event.clipboardData.setData('text/html', result.html);
    event.preventDefault();

    if (typeof opts.onCopy === 'function') opts.onCopy(result.text, result);
  }

  /* ---------------------------------------------------------------------
   * Public API
   * ------------------------------------------------------------------ */

  /**
   * Start intercepting copies. Calling this again replaces the previous
   * configuration rather than stacking a second listener.
   */
  function install(options) {
    uninstall();
    state.options = assign({}, DEFAULTS, options);
    state.target = state.options.root || document;
    state.listener = handleCopy;
    state.target.addEventListener('copy', state.listener);
    return api;
  }

  function uninstall() {
    if (state.listener && state.target) {
      state.target.removeEventListener('copy', state.listener);
    }
    state.listener = null;
    state.target = null;
    return api;
  }

  function isInstalled() {
    return !!state.listener;
  }

  /**
   * Copy one equation's TeX on demand, for a per-equation copy button.
   * Uses navigator.clipboard where available and falls back to a transient
   * textarea, which keeps this working on pages served without HTTPS and
   * from the local filesystem.
   *
   * Must be called inside a user gesture. Returns a Promise<boolean>.
   */
  function copyElement(el, options) {
    var opts = assign({}, DEFAULTS, state.options, options);
    var tex = texFor(el, opts);
    if (tex === null) return Promise.resolve(false);
    var block = !!opts.isBlock(el);
    var delims = pickDelimiters(tex, block, opts);
    return copyText(delims[0] + tex + delims[1]);
  }

  function copyText(text) {
    if (window.isSecureContext && navigator.clipboard &&
        navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text)
        .then(function () { return true; })
        .catch(function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var active = document.activeElement;
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.setAttribute('aria-hidden', 'true');
    ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;';
    document.body.appendChild(ta);
    var ok = false;
    suppress = true;
    try {
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    } finally {
      suppress = false;
    }
    ta.remove();
    if (active && active.focus) active.focus();
    return ok;
  }

  var api = {
    install: install,
    uninstall: uninstall,
    isInstalled: isInstalled,
    selectionToTex: selectionToTex,
    texFor: texFor,
    copyElement: copyElement,
    copyText: copyText,
    defaults: DEFAULTS,
    version: '1.0.0'
  };

  /* ---------------------------------------------------------------------
   * Auto-install with defaults, unless the script tag opts out:
   *   <script src="math-copy-tex.js" data-manual><\/script>
   * ------------------------------------------------------------------ */
  if (typeof document !== 'undefined') {
    var current = document.currentScript;
    if (!current || !current.hasAttribute('data-manual')) {
      install();
    }
  }

  return api;
}));
