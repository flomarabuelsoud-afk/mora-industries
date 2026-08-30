/* MORA Industries — shared section builders and the prism diagram */

/* ==========================================================
   SHARED BUILDERS
   ========================================================== */
const sec = (cls, inner) => `<section class="sec ${cls||''}"><div class="wrap">${inner}</div></section>`;
const rail = (label, body, note) => `<div class="rail">
  <div class="rail__label"><span class="ey">${label}</span>${note?`<p class="tag" style="line-height:1.6">${note}</p>`:''}</div>
  <div>${body}</div></div>`;
const cards = (items, cls='g3') => `<div class="grid ${cls}">${items.map(i=>`
  <div class="card ${i.edge?'card--edge':''} ${i.onink?'card--onink':''}">
    ${i.k?`<span class="card__k">${i.k}</span>`:''}
    <h3>${i.t}</h3><p>${i.d}</p></div>`).join('')}</div>`;
const table = (head, rows) => `<div class="tblscroll"><table class="tbl">
  <thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===0?' data-first':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const stepList = items => `<ol class="steps">${items.map(i=>`<li><div><h3>${i.t}</h3><p>${i.d}</p></div></li>`).join('')}</ol>`;
const ticks = items => `<ul class="ticks">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
const faq = items => `<div class="faq">${items.map(i=>`<details><summary>${i.q}</summary><div class="faq__a">${i.a}</div></details>`).join('')}</div>`;
const note = (label, text, cool) => `<div class="note ${cool?'note--cool':''}"><span class="tag">${label}</span><p>${text}</p></div>`;
const cta = (h, b, primary, secondary) => sec('sec--ink', `<div class="split" style="align-items:center">
    <div><h2>${h}</h2></div>
    <div><p class="lede lede--light">${b}</p>
      <div class="btnrow" style="margin-top:1.6rem">
        <a class="btn btn--onink" href="${primary[1]}">${primary[0]} ${ARROW}</a>
        ${secondary?`<a class="btn btn--onink-sec" href="${secondary[1]}">${secondary[0]}</a>`:''}
      </div></div></div>`);
const pageHero = ({crumbs, ey, h, lede, ctas}) => `<div class="phero"><div class="phero__in">
  ${crumbs?`<nav class="crumb" aria-label="Breadcrumb">${crumbs.map((c,i)=>
    (i?'<span>/</span>':'') + (c[1]?`<a href="${c[1]}">${c[0]}</a>`:c[0])).join('')}</nav>`:''}
  ${ey?`<span class="ey ey--pale">${ey}</span>`:''}
  <h1>${h}</h1><p class="lede">${lede}</p>
  ${ctas?`<div class="btnrow">${ctas.map((c,i)=>
    `<a class="btn ${i?'btn--onink-sec':'btn--onink'}" href="${c[1]}">${c[0]} ${i?'':ARROW}</a>`).join('')}</div>`:''}
</div></div>`;

/* ==========================================================
   SIGNATURE — the prism refraction diagram
   Fragmented internal data and external market signals enter on the
   left; the prism resolves them into an ordered, prioritized spectrum
   of decisions on the right. This is the company's thesis, drawn.
   ========================================================== */
function prismSVG(){
  const rnd = [0.82,0.46,1,0.64,0.9,0.55,0.72,0.38];
  const tickRow = (y0, n, seed) => Array.from({length:n},(_,i)=>{
    const y = y0 + i*13.5, w = 24 + rnd[(i+seed)%8]*66;
    return `<line class="ray-in anim" x1="14" y1="${y}" x2="${14+w}" y2="${y}" style="animation-delay:${.15+i*.045}s,${.15+i*.045}s"/>`;
  }).join('');
  const bands = [
    {y:148, c:'#6FD6E7', l:'Performance gap'},
    {y:200, c:'#31AFCB', l:'Supply risk'},
    {y:252, c:'#D9A441', l:'Product opportunity', gold:true},
    {y:304, c:'#2E86A8', l:'Market pathway'}
  ];
  return `<svg class="prism prism--wide" viewBox="0 0 560 430" role="img"
    aria-label="Diagram: fragmented internal data and external market signals pass through the MORA Prism and emerge as four prioritized decisions — performance gap, supply risk, product opportunity and market pathway.">
    <text class="lbl-in anim" x="14" y="66" style="animation-delay:.05s">Internal data</text>
    ${tickRow(80, 5, 0)}
    <text class="lbl-in anim" x="14" y="196" style="animation-delay:.1s">External signals</text>
    ${tickRow(210, 5, 3)}

    <!-- convergence into the prism face -->
    <line class="ray-in anim" x1="108" y1="107" x2="238" y2="226" style="animation-delay:.5s,.5s"/>
    <line class="ray-in anim" x1="108" y1="237" x2="238" y2="230" style="animation-delay:.5s,.5s"/>

    <path class="body anim" d="M268 114 L212 340 L324 340 Z" style="animation-delay:.55s"/>
    <text class="lbl-in anim" x="268" y="364" text-anchor="middle" style="animation-delay:.6s">Prism</text>

    ${bands.map((b,i)=>`
      <line class="band anim" x1="296" y1="228" x2="398" y2="${b.y}" stroke="${b.c}"
        style="animation-delay:${.75+i*.11}s,${.75+i*.11}s"/>
      <text class="lbl-out anim" x="408" y="${b.y+3.5}" style="animation-delay:${.95+i*.11}s">${b.l}</text>
      ${b.gold?`<circle class="dot anim" cx="400" cy="${b.y}" r="3.2" style="animation-delay:${1.05+i*.11}s"/>`:''}
    `).join('')}
  </svg>`;
}

/* Narrow screens get a vertical arrangement of the same diagram so the
   labels stay legible rather than shrinking with the container. */
function prismCompactSVG(){
  const rnd=[0.82,0.46,1,0.64,0.9,0.55,0.72,0.38];
  const tickRow=(y0,n,seed)=>Array.from({length:n},(_,i)=>{
    const y=y0+i*11, w=18+rnd[(i+seed)%8]*54;
    return `<line class="ray-in anim" x1="10" y1="${y}" x2="${10+w}" y2="${y}" style="animation-delay:${.15+i*.045}s,${.15+i*.045}s"/>`;
  }).join('');
  // Fan the bands to a horizontal line, then read them out as a legend
  // beneath, so nothing crosses a label at this width.
  const bands=[
    {x:45,ly:398,c:'#6FD6E7',l:'Performance gap'},
    {x:115,ly:426,c:'#31AFCB',l:'Supply risk'},
    {x:185,ly:454,c:'#D9A441',l:'Product opportunity',gold:true},
    {x:255,ly:482,c:'#2E86A8',l:'Market pathway'}
  ];
  return `<svg class="prism prism--compact" viewBox="0 0 340 520" aria-hidden="true" focusable="false">
    <text class="lbl-in anim" x="10" y="18" style="animation-delay:.05s">Internal data</text>
    ${tickRow(32,5,0)}
    <text class="lbl-in anim" x="10" y="112" style="animation-delay:.1s">External signals</text>
    ${tickRow(126,5,3)}
    <line class="ray-in anim" x1="80" y1="82" x2="152" y2="212" style="animation-delay:.5s,.5s"/>
    <line class="ray-in anim" x1="80" y1="170" x2="158" y2="214" style="animation-delay:.5s,.5s"/>
    <path class="body anim" d="M170 196 L118 298 L222 298 Z" style="animation-delay:.55s"/>
    <text class="lbl-in anim" x="170" y="276" text-anchor="middle" style="animation-delay:.6s">Prism</text>
    ${bands.map((b,i)=>`
      <line class="band anim" x1="170" y1="300" x2="${b.x}" y2="356" stroke="${b.c}"
        style="animation-delay:${.75+i*.11}s,${.75+i*.11}s"/>
      ${b.gold?`<circle class="dot anim" cx="${b.x}" cy="356" r="3.2" style="animation-delay:${1.05+i*.11}s"/>`:''}
    `).join('')}
    ${bands.map((b,i)=>`
      <line class="band anim" x1="10" y1="${b.ly}" x2="30" y2="${b.ly}" stroke="${b.c}"
        style="animation-delay:${1.05+i*.09}s,${1.05+i*.09}s"/>
      <text class="lbl-out anim" x="40" y="${b.ly+3.5}" style="animation-delay:${1.1+i*.09}s">${b.l}</text>
    `).join('')}
  </svg>`;
}

/* ==========================================================
   AUDIENCE LIST — "who we work with" and "who is it for"
   A label, a plain-language outcome, and a route to the page
   that answers it. Rendered as a two-column ledger.
   ========================================================== */
const audiences = items => `<ul class="auds">${items.map(a=>`
  <li class="aud">
    <a class="aud__in" href="${a[2]}">
      <strong>${a[0]}</strong>
      <span class="aud__d">${a[1]}</span>
      <span class="aud__go" aria-hidden="true">${ARROW}</span>
    </a>
  </li>`).join('')}</ul>`;

/* Same ledger without links, for pages that only describe audiences. */
const audienceNotes = items => `<ul class="auds auds--flat">${items.map(a=>`
  <li class="aud"><div class="aud__in"><strong>${a[0]}</strong><span class="aud__d">${a[1]}</span></div></li>`).join('')}</ul>`;

/* ==========================================================
   BENEFIT LEDGER — short outcome statements with a rule marker.
   Used where the content is a list of business benefits rather
   than a set of described capabilities.
   ========================================================== */
const benefits = items => `<ul class="bens">${items.map((b,i)=>`
  <li class="ben"><span class="ben__n">${String(i+1).padStart(2,'0')}</span><span>${b}</span></li>`).join('')}</ul>`;

/* ==========================================================
   CONTACT CARD — the "Get in Touch" block.
   Values remain controlled placeholders until confirmed.
   ========================================================== */
const SOCIAL = [
  ['LinkedIn','M4.98 3.5a2 2 0 1 1-.02 4 2 2 0 0 1 .02-4ZM3.4 8.9h3.15V21H3.4V8.9Zm5.35 0h3.02v1.65h.04c.42-.8 1.45-1.65 2.98-1.65 3.19 0 3.78 2.1 3.78 4.83V21h-3.15v-5.55c0-1.32-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93V21H8.75V8.9Z'],
  ['X','M17.53 3h2.94l-6.42 7.34L21.6 21h-5.92l-4.64-6.07L5.73 21H2.79l6.87-7.85L2.4 3h6.07l4.19 5.54L17.53 3Zm-1.03 16.2h1.63L7.6 4.71H5.85L16.5 19.2Z'],
  ['YouTube','M21.6 7.2s-.2-1.4-.8-2c-.75-.8-1.6-.8-2-.85C16 4.2 12 4.2 12 4.2h-.01s-4 0-6.8.15c-.4.05-1.25.05-2 .85-.6.6-.8 2-.8 2S2.2 8.85 2.2 10.5v1.54c0 1.65.2 3.3.2 3.3s.2 1.4.8 2c.75.8 1.74.77 2.19.86 1.6.15 6.81.2 6.81.2s4 0 6.8-.16c.4-.05 1.25-.05 2-.85.6-.6.8-2 .8-2s.2-1.65.2-3.3V10.5c0-1.65-.2-3.3-.2-3.3ZM9.94 14.1V8.63l5.15 2.74-5.15 2.73Z']
];
function contactCard(){
  return `<aside class="ccard">
    <span class="ey ey--pale">Get in touch</span>
    <dl class="ccard__list">
      <div><dt>Email</dt><dd>${ph('Email address')}</dd></div>
      <div><dt>Phone</dt><dd>${ph('Phone number')}</dd></div>
      <div><dt>Location</dt><dd>${ph('Location')}</dd></div>
    </dl>
    <div class="social" role="list">
      ${SOCIAL.map(s=>`<a class="social__a" role="listitem" href="#/contact" aria-label="${s[0]}">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${s[1]}"/></svg></a>`).join('')}
    </div>
    <p class="ccard__note">Social profiles are connected once the accounts are confirmed.</p>
  </aside>`;
}

/* ==========================================================
   PRISM FIGURE
   A container the 3D renderer takes over. Until it does — no
   JavaScript, no canvas, or prefers-reduced-motion — the static
   SVG diagram inside is what shows, so the figure never depends
   on the enhancement.

   The six labels are positioned in CSS and read back by
   prism3d.js, so the beams always terminate exactly where the
   text sits at any breakpoint.
   ========================================================== */
const PRISM_IN  = ['Internal data','External signals'];
const PRISM_OUT = ['Performance gap','Supply risk','Product opportunity','Market pathway'];

function prismFigure(){
  return `<div class="p3d" data-prism3d role="img"
    aria-label="Fragmented internal data and external market signals enter a prism and leave as four prioritized outputs: performance gap, supply risk, product opportunity and market pathway.">
    <canvas class="p3d__c" aria-hidden="true"></canvas>
    <div class="p3d__labels" aria-hidden="true">
      ${PRISM_IN.map((t,i)=>`<span class="p3d__lbl p3d__lbl--in i${i+1}">${t}</span>`).join('')}
      ${PRISM_OUT.map((t,i)=>`<span class="p3d__lbl p3d__lbl--out o${i+1}">${t}</span>`).join('')}
    </div>
    <p class="p3d__hint" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>Drag to rotate</p>
    <div class="p3d__fallback">${prismSVG()}${prismCompactSVG()}</div>
  </div>`;
}
