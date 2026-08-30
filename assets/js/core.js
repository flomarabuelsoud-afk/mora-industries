/* MORA Industries — core helpers, navigation, header and footer */

/* ==========================================================
   MORA INDUSTRIES — single-file prototype
   Hash routing is used so the file runs standalone. The routes
   below map 1:1 to the clean URLs in the content specification
   (see ROUTE_MAP) for the production implementation.
   ========================================================== */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* [Bracketed] items from the spec are controlled placeholders. */
const ph = t => `<span class="ph" title="Placeholder — resolve before publication">[${t}]</span>`;
const ARROW = '<svg class="btn__ar" width="13" height="9" viewBox="0 0 13 9" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M0 4.5h11M7.5 1 11 4.5 7.5 8"/></svg>';
const CARET = '<svg viewBox="0 0 9 9" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M1 3l3.5 3.5L8 3"/></svg>';

/* Production URL mapping for the development team ------------------- */
const ROUTE_MAP = {
  '#/':'/', '#/intelligence':'/intelligence', '#/products/mora-prism':'/products/mora-prism',
  '#/advance':'/advance', '#/international':'/international', '#/products/masdar-trade':'/products/masdar-trade',
  '#/solutions/manufacturers':'/solutions/manufacturers','#/solutions/procurement':'/solutions/procurement',
  '#/solutions/exporters':'/solutions/exporters','#/solutions/executives':'/solutions/executives',
  '#/solutions/institutions':'/solutions/institutions','#/industries':'/industries',
  '#/insights':'/insights','#/about':'/about','#/how-we-work':'/how-we-work','#/trust':'/trust',
  '#/partners':'/partners','#/careers':'/careers','#/contact':'/contact'
};

/* ==========================================================
   NAVIGATION — mirrors the information architecture.
   "What We Do" holds the three strategic pillars.
   "Products" holds MORA Prism and Masdar Trade.
   ========================================================== */
const NAV = [
  {id:'do', label:'What We Do', blurb:'From insight to action. Understand what is happening, identify where the opportunity lies, and decide what to do next.',
   links:[
     {t:'MORA Intelligence', d:'Understand your business, your market and the opportunities around you.', h:'#/intelligence'},
     {t:'MORA Advance', d:'Develop better products, improve processes and turn validated opportunities into practical improvements.', h:'#/advance'},
     {t:'MORA International', d:'Sourcing, procurement, export development and selected market opportunities.', h:'#/international'}
   ]},
  {id:'prod', label:'Products', blurb:'Tools built to turn information into opportunities.',
   links:[
     {t:'MORA Prism', d:'A decision workspace that brings internal business information and external market intelligence together in one place.', h:'#/products/mora-prism'},
     {t:'Masdar Trade', d:'A B2B marketplace that improves manufacturer visibility and makes international sourcing and procurement easier.', h:'#/products/masdar-trade'},
     {t:'Sign in', d:'Access your Prism workspace or Masdar Trade account.', h:'#/contact'}
   ]},
  {id:'sol', label:'Solutions', blurb:'Built around the people making business decisions. Each pathway begins with a defined, fixed-scope diagnostic.',
   links:[
     {t:'For Manufacturers', d:'Validate product opportunities, improve operations and reach international buyers.', h:'#/solutions/manufacturers'},
     {t:'For Procurement Teams', d:'Supply-market visibility, qualified suppliers and resilient sourcing.', h:'#/solutions/procurement'},
     {t:'For Exporters', d:'Target-market selection, offer preparation and routes to qualified demand.', h:'#/solutions/exporters'},
     {t:'For Executives', d:'Performance, market signals and initiative value in one strategic view.', h:'#/solutions/executives'},
     {t:'For Institutions', d:'Sector mapping, cluster strengthening and export or supplier-development programs.', h:'#/solutions/institutions'}
   ]},
  {id:'ind', label:'Industries', blurb:'Sector context, evidence-backed trends and the decisions they change.',
   links:[
     {t:'Industrial Manufacturing', d:'Portfolio, cost and capacity decisions under volatile input markets.', h:'#/industries/industrial-manufacturing'},
     {t:'Engineering & Construction Supply Chains', d:'Long lead times, project risk and multi-tier supplier exposure.', h:'#/industries/engineering-construction'},
     {t:'Industrial Distribution', d:'Assortment, margin and supplier mix across fragmented catalogs.', h:'#/industries/industrial-distribution'},
     {t:'Consumer Manufacturing', d:'Demand signals, product fit and route-to-market across borders.', h:'#/industries/consumer-manufacturing'},
     {t:'All industries', d:'Sector coverage and how we add new sectors.', h:'#/industries'}
   ]},
  {id:'ins', label:'Insights', h:'#/insights'},
  {id:'co', label:'Company', blurb:'How we work, what we stand behind, and who we build with.',
   links:[
     {t:'About MORA', d:'Purpose, vision and the operating model behind the three pillars.', h:'#/about'},
     {t:'How We Work', d:'A controlled path from business question to measurable outcome.', h:'#/how-we-work'},
     {t:'Trust & Governance', d:'Data control, source traceability, verification scope and human accountability.', h:'#/trust'},
     {t:'Partners', d:'The specialist ecosystem behind delivery.', h:'#/partners'},
     {t:'Careers', d:'Open roles and how we hire.', h:'#/careers'},
     {t:'Contact', d:'Talk to our team.', h:'#/contact'}
   ]}
];

/* ---------- Header ---------- */
function renderNav(){
  $('#nav').innerHTML = NAV.map(g => g.links
    ? `<button class="nav__btn" type="button" data-navid="${g.id}" data-mega="${g.id}" aria-expanded="false" aria-controls="mega">${g.label}${CARET}</button>`
    : `<a class="nav__btn" data-navid="${g.id}" href="${g.h}">${g.label}</a>`
  ).join('') + `
    <span class="nav__util">
      <button class="nav__lang" type="button" aria-label="Select language">EN</button>
      <a class="btn btn--pri" href="#/contact">Book a discovery session</a>
    </span>`;

  $('#mnav').innerHTML = `<div class="mnav__in">` + NAV.map(g => g.links
    ? `<details data-navid="${g.id}"><summary>${g.label}</summary><div class="mnav__sub">${g.links.map(l=>`<a href="${l.h}">${l.t}</a>`).join('')}</div></details>`
    : `<a class="mnav__flat" href="${g.h}">${g.label}</a>`
  ).join('') + `<div class="mnav__cta">
      <a class="btn btn--pri" href="#/contact">Book a discovery session ${ARROW}</a>
      <a class="btn btn--sec" href="#/products/mora-prism">Request a Prism demo</a>
    </div></div>`;

  // Mega menus
  const mega = $('#mega');
  document.querySelectorAll('[data-mega]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const open = btn.getAttribute('aria-expanded')==='true';
      closeMega();
      if(open) return;
      const g = NAV.find(x=>x.id===btn.dataset.mega);
      mega.innerHTML = `<div class="mega__in">
        <div class="mega__blurb"><span class="ey">${esc(g.label)}</span><p>${esc(g.blurb)}</p></div>
        <div class="mega__links">${g.links.map(l=>
          `<a class="mega__link" href="${l.h}"><strong>${esc(l.t)}</strong><span>${esc(l.d)}</span></a>`).join('')}</div>
      </div>`;
      mega.dataset.open='true';
      btn.setAttribute('aria-expanded','true');
    });
  });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){closeMega();closeMobile();} });
  document.addEventListener('click',e=>{
    if(!e.target.closest('.hdr')) closeMega();
    if(e.target.closest('a[href^="#/"]')){ closeMega(); closeMobile(); }
  });
  $('#burger').addEventListener('click',()=>{
    const open = $('#mnav').dataset.open==='true';
    $('#mnav').dataset.open = open?'false':'true';
    $('#burger').setAttribute('aria-expanded', open?'false':'true');
    $('#burger').setAttribute('aria-label', open?'Open menu':'Close menu');
  });
}
function closeMega(){
  $('#mega').dataset.open='false';
  document.querySelectorAll('[data-mega]').forEach(b=>b.setAttribute('aria-expanded','false'));
}
function closeMobile(){
  $('#mnav').dataset.open='false';
  $('#burger').setAttribute('aria-expanded','false');
}

/* ---------- Footer ---------- */
const FOOTER_COLS = [
  {h:'What We Do', l:[['MORA Intelligence','#/intelligence'],['MORA Advance','#/advance'],['MORA International','#/international']]},
  {h:'Products', l:[['MORA Prism','#/products/mora-prism'],['Masdar Trade','#/products/masdar-trade'],['Sign in','#/contact']]},
  {h:'Solutions', l:[['Manufacturers','#/solutions/manufacturers'],['Procurement','#/solutions/procurement'],['Exporters','#/solutions/exporters'],['Executives','#/solutions/executives'],['Institutions','#/solutions/institutions']]},
  {h:'Company', l:[['About','#/about'],['How We Work','#/how-we-work'],['Trust','#/trust'],['Partners','#/partners'],['Careers','#/careers'],['Contact','#/contact']]},
  {h:'Insights', l:[['Latest insights','#/insights'],['Reports','#/insights'],['Events','#/insights'],['Subscribe','#/insights']]},
  {h:'Legal', l:[['Privacy','#/legal'],['Cookies','#/legal'],['Website Terms','#/legal'],['Marketplace Terms','#/legal'],['Acceptable Use','#/legal'],['Accessibility','#/legal'],['Complaints','#/legal']]}
];
function renderFooter(){
  $('#footer').innerHTML = `<hr class="spectrum"><div class="wrap">
    <div class="ftr__top">
      <div class="ftr__brand">
        <svg viewBox="0 0 4083 1611" role="img" aria-label="MORA Industries"><use href="#mora-mark"/></svg>
        <p>MORA Industries helps businesses understand markets, improve products and processes, and build new opportunities for international growth.</p>
      </div>
      <div class="ftr__cols">${FOOTER_COLS.map(c=>
        `<div><h3>${c.h}</h3><ul>${c.l.map(([t,h])=>`<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>`).join('')}
      </div>
    </div>
    <div class="ftr__bot">
      <p>&copy; ${ph('Year')} MORA Industries. All rights reserved. Registered office ${ph('Registered address')}.</p>
      <div class="ftr__legal"><a href="#/legal">Privacy</a><a href="#/legal">Cookies</a><a href="#/legal">Terms</a><a href="#/contact">${ph('Email')}</a></div>
    </div>
  </div>`;
}


/* ==========================================================
   ACTIVE SECTION — the header states where you are.
   Each top-level nav item owns a set of route prefixes.
   ========================================================== */
const NAV_ROUTES = {
  do:['/intelligence','/advance','/international'],
  prod:['/products/'],
  sol:['/solutions/'],
  ind:['/industries'],
  ins:['/insights'],
  co:['/about','/how-we-work','/trust','/partners','/careers','/contact','/legal']
};
function markActiveNav(path){
  let active = null;
  for(const [id, prefixes] of Object.entries(NAV_ROUTES)){
    if(prefixes.some(pre => path === pre || path.startsWith(pre))){ active = id; break; }
  }
  document.querySelectorAll('[data-navid]').forEach(el=>{
    const on = el.dataset.navid === active;
    el.classList.toggle('is-active', on);
    if(el.tagName === 'A') on ? el.setAttribute('aria-current','page') : el.removeAttribute('aria-current');
  });
}

/* ==========================================================
   HEADER STATE — condensed on scroll, with a spectrum read-out
   of scroll position. Both are decorative and reduced-motion safe.
   ========================================================== */
function initHeaderState(){
  const hdr = document.querySelector('.hdr');
  const bar = document.getElementById('prog');
  let ticking = false;
  const update = () => {
    const y = window.scrollY || 0;
    hdr.classList.toggle('is-stuck', y > 12);
    if(bar){
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--p', max > 0 ? (y / max) : 0);
    }
    ticking = false;
  };
  addEventListener('scroll', () => {
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, {passive:true});
  addEventListener('resize', update, {passive:true});
  update();
}
