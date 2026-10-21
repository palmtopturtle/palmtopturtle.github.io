const UI = '[data-inspector-ui]';
const root = document.documentElement;
const toggle = document.getElementById('inspect-toggle');

let enabled = false;
let pinned = false;
let current = null;
let frame = 0;

// ---- Build overlay UI ----
const layer = el('div', 'ix-layer');
layer.setAttribute('aria-hidden', 'true');
const marginBox = el('div', 'ix-margin');
const paddingBox = el('div', 'ix-padding');
const contentBox = el('div', 'ix-content');
layer.append(marginBox, paddingBox, contentBox);

const tip = el('div', 'ix-tip');
tip.setAttribute('role', 'status');
tip.setAttribute('aria-live', 'polite');

const bar = el('div', 'ix-bar');
bar.hidden = true;
bar.innerHTML =
  '<span>Inspecting. Hover, tap or tab to any element. Links pause until you exit.</span>' +
  '<button type="button">Exit</button>';
bar.querySelector('button').addEventListener('click', () => setEnabled(false));

for (const node of [layer, tip, bar]) node.setAttribute('data-inspector-ui', '');
document.body.append(layer, tip, bar);

function el(tag, className) {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}

// ---- Color math (WCAG 2.x relative luminance) ----
function parseColor(value) {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
}

function blend(top, bottom) {
  const a = top.a;
  return {
    r: top.r * a + bottom.r * (1 - a),
    g: top.g * a + bottom.g * (1 - a),
    b: top.b * a + bottom.b * (1 - a),
    a: 1,
  };
}

function luminance({ r, g, b }) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg, bg) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function effectiveBackground(node) {
  const layers = [];
  for (let n = node; n && n.nodeType === 1; n = n.parentElement) {
    const c = parseColor(getComputedStyle(n).backgroundColor);
    if (c && c.a > 0) {
      layers.push(c);
      if (c.a === 1) break;
    }
  }
  let result = { r: 255, g: 255, b: 255, a: 1 };
  for (let i = layers.length - 1; i >= 0; i--) result = blend(layers[i], result);
  return result;
}

const toHex = ({ r, g, b }) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

function hasOwnText(node) {
  return [...node.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
}

// ---- Measuring and drawing ----
const px = (v) => parseFloat(v) || 0;

function place(box, x, y, w, h) {
  box.style.transform = `translate(${x}px, ${y}px)`;
  box.style.width = `${Math.max(w, 0)}px`;
  box.style.height = `${Math.max(h, 0)}px`;
}

function draw(target) {
  const cs = getComputedStyle(target);
  const r = target.getBoundingClientRect();
  const m = [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].map(px);
  const b = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(px);
  const p = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px);

  // Margin ring: a box the size of the margin box whose borders are the margins.
  place(marginBox, r.left - m[3], r.top - m[0], r.width + m[1] + m[3], r.height + m[0] + m[2]);
  marginBox.style.borderWidth = m.map((v) => `${Math.max(v, 0)}px`).join(' ');

  // Padding ring sits inside the element's own border.
  const ix = r.left + b[3];
  const iy = r.top + b[0];
  const iw = r.width - b[1] - b[3];
  const ih = r.height - b[0] - b[2];
  place(paddingBox, ix, iy, iw, ih);
  paddingBox.style.borderWidth = p.map((v) => `${v}px`).join(' ');

  place(contentBox, ix + p[3], iy + p[0], iw - p[1] - p[3], ih - p[0] - p[2]);

  layer.classList.add('is-visible');
  positionTip(r);
}

function describe(target, note) {
  const cs = getComputedStyle(target);
  const r = target.getBoundingClientRect();
  const tag = target.tagName.toLowerCase();
  const cls = [...target.classList][0];
  const family = cs.fontFamily.split(',')[0].replace(/["']/g, '');
  const size = px(cs.fontSize);
  const weight = cs.fontWeight;

  let colorRow = '';
  if (hasOwnText(target)) {
    const bg = effectiveBackground(target);
    const fgRaw = parseColor(cs.color);
    const fg = fgRaw ? blend(fgRaw, bg) : { r: 0, g: 0, b: 0, a: 1 };
    const ratio = contrast(fg, bg);
    const large = size >= 24 || (size >= 18.66 && Number(weight) >= 700);
    const needed = large ? 3 : 4.5;
    const pass = ratio >= needed;
    colorRow =
      `<dt>Color</dt><dd><span class="ix-swatch" style="background:${toHex(fg)}"></span>${toHex(fg)}</dd>` +
      `<dt>Contrast</dt><dd>${ratio.toFixed(2)}:1 ` +
      `<span class="${pass ? 'ix-pass' : 'ix-fail'}">${pass ? 'Passes' : 'Fails'} AA</span>` +
      `${large ? ' (large text)' : ''}</dd>`;
  }

  const pad = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map((v) => Math.round(px(v)));
  const padRow = pad.some(Boolean) ? `<dt>Padding</dt><dd>${pad.join(' ')}</dd>` : '';

  tip.innerHTML =
    `<span class="ix-dim">${Math.round(r.width)} × ${Math.round(r.height)}</span>` +
    `<span class="ix-sel">${tag}${cls ? '.' + cls : ''}</span>` +
    `<dl><dt>Font</dt><dd>${family} ${Math.round(size * 10) / 10}px / ${weight}</dd>` +
    padRow +
    colorRow +
    `</dl>` +
    (note ? `<p class="ix-note">${note}</p>` : '');
}

function positionTip(r) {
  tip.classList.add('is-visible');
  const gap = 10;
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  const vw = window.innerWidth;
  // Keep the tip clear of the "Inspecting" bar at the bottom of the screen.
  const vh = window.innerHeight - (bar.hidden ? 0 : bar.offsetHeight + 16);
  let top = r.bottom + gap;
  if (top + th > vh - gap) top = r.top - th - gap;
  if (top < gap) top = Math.min(vh - th - gap, Math.max(gap, r.top + gap));
  const left = Math.min(Math.max(gap, r.left), vw - tw - gap);
  tip.style.transform = `translate(${left}px, ${top}px)`;
  tip.style.left = '0';
  tip.style.top = '0';
}

function inspect(target, note) {
  if (!target || target === document.body || target === root) return clear();
  current = target;
  describe(target, note);
  draw(target);
}

function clear() {
  current = null;
  layer.classList.remove('is-visible');
  tip.classList.remove('is-visible');
}

const isInspectable = (t) =>
  t instanceof Element && !t.closest(UI) && !t.closest('#inspect-toggle') && t !== document.body && t !== root;

// ---- Mode switching ----
function setEnabled(on) {
  enabled = on;
  pinned = false;
  root.dataset.inspect = on ? 'on' : 'off';
  toggle.setAttribute('aria-pressed', String(on));
  bar.hidden = !on;
  if (!on) clear();
}

toggle.addEventListener('click', () => {
  cancelDemo();
  setEnabled(!enabled);
});

document.addEventListener(
  'pointermove',
  (e) => {
    if (!enabled || pinned || e.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (isInspectable(e.target)) inspect(e.target);
    });
  },
  { passive: true }
);

document.addEventListener('focusin', (e) => {
  if (enabled && isInspectable(e.target)) {
    pinned = false;
    inspect(e.target);
  }
});

// While inspecting, clicks and taps select an element instead of activating it.
document.addEventListener(
  'click',
  (e) => {
    if (!enabled || !isInspectable(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    pinned = !(pinned && current === e.target);
    inspect(e.target);
  },
  true
);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && enabled) {
    setEnabled(false);
    toggle.focus();
  }
});

const redraw = () => {
  if (current) draw(current);
};
window.addEventListener('scroll', redraw, { passive: true });
window.addEventListener('resize', redraw);

// ---- One-time preview on first visit ----
let demoTimer = 0;
function cancelDemo() {
  clearTimeout(demoTimer);
  if (!enabled) clear();
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let seen = false;
try {
  seen = sessionStorage.getItem('ix-demo') === '1';
  sessionStorage.setItem('ix-demo', '1');
} catch {
  /* storage unavailable; show the preview anyway */
}

const heroName = document.querySelector('.hero-name');
if (heroName && !seen && !reduceMotion) {
  demoTimer = setTimeout(() => {
    inspect(heroName, 'Preview of Inspect mode. Turn it on to explore the page.');
    demoTimer = setTimeout(() => {
      if (!enabled) clear();
    }, 3200);
  }, 700);
  window.addEventListener('pointerdown', cancelDemo, { once: true });
  window.addEventListener('keydown', cancelDemo, { once: true });
}
