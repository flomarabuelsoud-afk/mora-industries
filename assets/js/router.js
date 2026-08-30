/* MORA Industries — router, interaction wiring and init */

/* ==========================================================
   ROUTER
   ========================================================== */
const ROUTES = {
  '/':pageHome, '/intelligence':pageIntelligence, '/products/mora-prism':pagePrism,
  '/advance':pageAdvance, '/international':pageInternational, '/products/masdar-trade':pageMasdar,
  '/industries':pageIndustriesIndex, '/insights':pageInsights, '/insights/supply-market-visibility':pageArticle,
  '/about':pageAbout, '/how-we-work':pageHowWeWork, '/trust':pageTrust,
  '/partners':pagePartners, '/careers':pageCareers, '/contact':pageContact, '/legal':pageLegal
};
const TITLES = {
  '/':'MORA Industries │ Intelligence, Advancement and International Growth',
  '/intelligence':'MORA Intelligence | Business & Market Intelligence',
  '/products/mora-prism':'MORA Prism | Business & Market Intelligence Workspace',
  '/advance':'MORA Advance | Product Advancement & Process Excellence',
  '/international':'MORA International | Global Sourcing & Export Development',
  '/products/masdar-trade':'Masdar Trade | B2B Manufacturer & Sourcing Marketplace',
  '/industries':'Industries | MORA Industries',
  '/insights':'Insights | MORA Industries',
  '/insights/supply-market-visibility':'Spend visibility is not supply-market visibility | MORA Industries',
  '/about':'About MORA Industries | Research, Advancement and Global Growth',
  '/how-we-work':'How We Work | MORA Industries',
  '/trust':'Trust and Governance | MORA Industries',
  '/partners':'Partners | MORA Industries',
  '/careers':'Careers | MORA Industries',
  '/contact':'Contact MORA Industries',
  '/legal':'Legal | MORA Industries'
};

/* Meta descriptions per route, taken from the approved content.
   The prototype rewrites them on navigation; server-rendered pages
   should emit them statically. */
const METAS = {
  '/':'MORA Industries helps businesses understand markets, improve products and processes, and build new opportunities for international growth.',
  '/intelligence':'Connect internal business, supply-chain and operational information with external market intelligence to support clearer decisions.',
  '/products/mora-prism':'Bring approved internal data, curated market intelligence and opportunity management into one decision workspace.',
  '/advance':'Develop commercially relevant products and create efficient, controlled and technology-enabled processes with MORA Advance.',
  '/international':'Support global sourcing, foreign procurement, export development and selected international market pathways through structured research and qualification.',
  '/products/masdar-trade':'Connect manufacturers, business buyers, distributors and procurement teams through structured profiles, product discovery and B2B inquiry workflows.',
  '/industries':'Sector context, evidence-backed trends and the decisions they change across the industries MORA covers.',
  '/insights':'Market intelligence, product advancement and international growth analysis from the MORA Industries team.',
  '/about':'Purpose, vision and the operating model behind MORA Intelligence, MORA Advance and MORA International.',
  '/how-we-work':'A controlled path from business question to measurable outcome, with defined scopes and evidence standards.',
  '/trust':'Data control, source traceability, verification scope and human accountability across MORA engagements and products.',
  '/partners':'The specialist ecosystem behind MORA delivery across legal, logistics, certification and technical disciplines.',
  '/careers':'Open roles at MORA Industries and how we hire.',
  '/contact':'Tell us what you are trying to understand, improve, develop or expand.',
  '/legal':'Privacy, cookies, website terms, marketplace terms and the other documents approved before launch.'
};

function resolve(path){
  if(ROUTES[path]) return [ROUTES[path], TITLES[path]];
  let m = path.match(/^\/solutions\/([\w-]+)$/);
  if(m && SOLUTIONS[m[1]]) return [()=>pageSolution(m[1]), `${SOLUTIONS[m[1]].name} | MORA Industries`];
  m = path.match(/^\/industries\/([\w-]+)$/);
  if(m && INDUSTRIES[m[1]]) return [()=>pageIndustry(m[1]), `${INDUSTRIES[m[1]].name} | MORA Industries`];
  return [page404,'Page not found | MORA Industries'];
}

function setMeta(path, title){
  document.title = title;
  const d = document.querySelector('meta[name="description"]');
  const desc = METAS[path] || METAS['/'];
  if(d) d.setAttribute('content', desc);
  const og = document.querySelector('meta[property="og:title"]');
  if(og) og.setAttribute('content', title);
  const ogd = document.querySelector('meta[property="og:description"]');
  if(ogd) ogd.setAttribute('content', desc);
  const canon = document.querySelector('link[rel="canonical"]');
  if(canon) canon.setAttribute('href', 'https://[domain]' + (ROUTE_MAP['#'+path] || path));
}

function router(){
  const path = (location.hash.replace(/^#/,'') || '/').replace(/\/$/,'') || '/';
  const [fn, title] = resolve(path);
  setMeta(path, title);
  const main = $('#main');
  main.innerHTML = fn();
  closeMega(); closeMobile();
  window.scrollTo({top:0, behavior:'auto'});
  if(booted){ main.setAttribute('tabindex','-1'); main.focus({preventScroll:true}); }
  booted = true;
  wire();
  markActiveNav(path);
  observeReveal();
  initPrism3D();
}

let booted = false;

/* ---------- Per-page interaction wiring ---------- */
function wire(){
  // Insight category filter
  const grid = $('#postgrid');
  if(grid){
    document.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click',()=>{
        const f = chip.dataset.filter;
        document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed', String(c===chip)));
        let shown = 0;
        grid.querySelectorAll('.post').forEach(p=>{
          const match = (f==='all' || p.dataset.cat===f);
          p.hidden = !match; if(match) shown++;
        });
        $('#postempty').hidden = shown > 0;
        $('#postcount').textContent = f==='all'
          ? `Showing all ${shown} insights`
          : `Showing ${shown} insight${shown===1?'':'s'} in ${f}`;
      });
    });
  }

  // Forms — prototype only, no data is transmitted
  document.querySelectorAll('form[data-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const invalid = form.querySelector(':invalid');
      if(invalid){
        form.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
        invalid.setAttribute('aria-invalid','true');
        invalid.focus();
        return;
      }
      if(form.dataset.form==='contact'){
        const ok = $('#formok');
        ok.hidden = false;
        ok.innerHTML = `<div class="okmsg"><strong>Thank you. Your request has been received.</strong>
          <p>A MORA team member will review the information and contact you through the selected method. Please do not submit confidential technical, commercial or personal information through this form.</p></div>`;
        form.hidden = true;
        ok.setAttribute('tabindex','-1'); ok.focus();
      } else {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Subscription request recorded';
        btn.disabled = true;
      }
    });
  });
}

/* ---------- Scroll reveal ---------- */
let io;
function observeReveal(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(io) io.disconnect();
  io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{rootMargin:'0px 0px -8% 0px'});
  const els = document.querySelectorAll('#main .sec > .wrap > *');
  els.forEach(el=>{ el.classList.add('rv'); io.observe(el); });
  // Safety net: never leave content hidden if the observer does not fire.
  setTimeout(()=>els.forEach(el=>el.classList.add('in')), 2500);
}

/* ---------- Init ---------- */
renderNav();
renderFooter();
initHeaderState();
window.addEventListener('hashchange', router);
router();
