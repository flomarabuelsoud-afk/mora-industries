/* MORA Industries — solution and industry page templates */

/* ==========================================================
   SOLUTIONS — one template, five audiences.
   Template order follows the spec: audience problem, outcomes,
   capabilities, pathway, use cases, method, FAQ, one primary CTA.
   ========================================================== */
const SOLUTIONS = {
  manufacturers:{
    name:'For Manufacturers',
    h:'Build products the market needs \u2014 and make your capability easier to find.',
    lede:'MORA connects market intelligence, product advancement, process excellence, international pathways and Masdar Trade so manufacturers can decide what to build and be found by the buyers who want it.',
    problem:['Product decisions are made on internal conviction rather than tested demand.','Operational cost and quality issues are visible in symptoms but not in root cause.','Export ambition exists, but there is no qualified route to international buyers.'],
    outcomes:['A scored shortlist of product and market opportunities with stated evidence confidence.','A future-state process design with named owners, controls and service levels.','A structured manufacturer profile visible to buyers in selected categories.'],
    caps:[['Market and product opportunity assessment','#/intelligence'],['Product Advancement and target-cost support','#/advance'],['Process Excellence and digital enablement','#/advance'],['Supplier and material scouting','#/international'],['Export readiness and market selection','#/international'],['Masdar Trade manufacturer visibility','#/products/masdar-trade']],
    uses:[['Portfolio review','Which products to invest in, hold or retire, with market evidence behind each call.'],['Target-cost programme','A cost structure defined by what the market will pay, not by current cost plus margin.'],['Line-level process map','One critical process mapped, measured and redesigned with a pilot plan.']],
    cta:['Apply as a manufacturer','#/contact'],
    faq:[{q:'We are not export-ready yet. Is that a problem?',a:'No. Export readiness is itself an assessable question. We would establish product-market fit and capability gaps before any international promotion.'},
         {q:'Do you work with a single production site?',a:'Yes. A single site with one clearly defined problem is often the strongest starting point, and the findings usually transfer.'}]
  },
  procurement:{
    name:'For Procurement Teams',
    h:'Connect procurement decisions with global supply-market intelligence.',
    lede:'Understand what you buy, how suppliers perform and where international markets may improve cost, resilience, quality or innovation.',
    problem:['Spend data is fragmented across entities, systems and category definitions.','Supplier risk is discovered after disruption rather than before it.','Supplier discovery beyond existing markets is slow and hard to qualify.'],
    outcomes:['A cleaned, categorized spend baseline with stated data-quality limitations.','A category opportunity map scored by value, feasibility and urgency.','A qualified international supplier shortlist with comparable commercial responses.'],
    caps:[['Spend and supplier intelligence','#/intelligence'],['Commodity and supply-market monitoring','#/products/mora-prism'],['Category opportunity assessment','#/intelligence'],['International supplier search and qualification','#/international'],['RFQ and commercial comparison support','#/international'],['Supplier risk and performance management','#/products/mora-prism']],
    uses:[['Category deep dive','One category taken from spend baseline to sourcing strategy and qualified alternatives.'],['Resilience review','Multi-tier exposure mapped against country, commodity and logistics signals.'],['Landed-cost comparison','Total cost modelled across candidate supply markets, not unit price alone.']],
    cta:['Request a sourcing diagnostic','#/contact'],
    faq:[{q:'Our spend data is messy. Can you still work with it?',a:'Yes. Data readiness is assessed first, and any baseline is published with its quality score and stated assumptions rather than presented as exact.'},
         {q:'Do you replace our procurement team?',a:'No. We provide market visibility, qualification and comparison support. Award decisions and contracting remain with your organization.'}]
  },
  exporters:{
    name:'For Exporters',
    h:'Select the right markets. Build the pathway to demand.',
    lede:'Use evidence to select target markets, shape the offer and develop practical routes to qualified demand.',
    problem:['Market selection is driven by opportunity that arrived, not opportunity that was chosen.','Product, packaging or compliance adaptation is discovered late and costs the launch window.','Introductions are plentiful; qualified buyers are not.'],
    outcomes:['A ranked target-market shortlist with the criteria and evidence behind the ranking.','A market-access plan covering adaptation, compliance coordination and channel design.','A qualified buyer or distributor pipeline with defined engagement milestones.'],
    caps:[['Target-market selection','#/intelligence'],['Demand validation','#/intelligence'],['Competitor, channel and pricing analysis','#/intelligence'],['Product adaptation and market-access planning','#/advance'],['Buyer, distributor and agent identification','#/international'],['Route-to-market and partnership design','#/international']],
    uses:[['Market-entry brief','Three candidate markets assessed against demand, competition, access barriers and cost to serve.'],['Channel design','Direct, distributor or agent routes compared on control, margin and speed.'],['Buyer qualification','Prospective buyers screened before commercial time is spent on them.']],
    cta:['Check export readiness','#/contact'],
    faq:[{q:'Can you guarantee buyers in a target market?',a:'No, and we will not claim otherwise. Market development reduces uncertainty and builds a structured pathway; it does not guarantee a transaction or market outcome.'},
         {q:'Who handles customs, tax and certification?',a:'These are coordinated with qualified specialists. Our role and authority are defined in writing for each engagement.'}]
  },
  executives:{
    name:'For Executives',
    h:'Prioritize the opportunities that deserve leadership attention.',
    lede:'MORA connects strategic KPIs, external signals and initiative value so leadership teams can see where performance, risk and growth require action.',
    problem:['Reporting describes the past; it rarely says what to do next.','Initiative portfolios grow faster than the evidence supporting them.','Market signals sit with functions, not with the leadership team.'],
    outcomes:['An executive cockpit connecting strategic objectives to operational indicators.','An opportunity and risk heatmap scored by impact, feasibility, urgency and confidence.','An initiative portfolio with owners, assumptions, benefits and review points.'],
    caps:[['Connected strategic and operational signals','#/products/mora-prism'],['Opportunity prioritization','#/intelligence'],['Risk and growth visibility','#/intelligence'],['Decision-ready intelligence','#/products/mora-prism']],
    uses:[['Strategy review pack','Performance, market position and initiative value assembled into one evidence-labelled view.'],['Portfolio triage','Current initiatives scored and sequenced against capacity and evidence confidence.'],['Growth options paper','Two or three credible growth pathways with assumptions made explicit.']],
    cta:['Book an executive discovery session','#/contact'],
    faq:[{q:'How long before a leadership team sees something usable?',a:'A fixed-scope diagnostic is designed to produce an executive readout within a defined window agreed at scoping, subject to data access.'},
         {q:'What happens to the recommendations afterwards?',a:'They become tracked entries in an opportunity register with named owners, or they are closed with a stated reason. Nothing stays as an unowned recommendation.'}]
  },
  institutions:{
    name:'For Institutions',
    h:'Make sector capability visible and convert it into measurable development.',
    lede:'MORA supports chambers, clusters, development organizations and public-sector programs with sector mapping, supplier development, export programs and digital market access.',
    problem:['Member capability is known anecdotally but not recorded in a comparable structure.','Export promotion produces activity without measurable member outcomes.','Programme reporting cannot separate participation from result.'],
    outcomes:['A structured sector capability map with comparable member records.','A digital cluster showcase giving members international visibility.','A programme measurement framework separating participation, output and outcome.'],
    caps:[['Sector mapping','#/intelligence'],['Supplier-development programs','#/advance'],['Export programs','#/international'],['Digital market access','#/products/masdar-trade']],
    uses:[['Capability census','Member capabilities recorded once, in a comparable structure, and kept current.'],['Cluster showcase','A country or sector storefront giving members structured international visibility.'],['Programme evaluation','Outcomes measured against a stated baseline and period.']],
    cta:['Discuss a sector program','#/contact'],
    faq:[{q:'Can member data stay under our control?',a:'Yes. Data ownership, permitted use, retention and publication rights are defined contractually before any collection begins.'},
         {q:'Do you work with public funding requirements?',a:'We work to documented procurement, reporting and audit requirements. Specialist counsel is coordinated where jurisdictional rules apply.'}]
  }
};

function pageSolution(key){
  const s = SOLUTIONS[key];
  if(!s) return page404();
  return pageHero({
    crumbs:[['Home','#/'],['Solutions','#/solutions/manufacturers'],[s.name]],
    ey:'Solutions', h:s.h, lede:s.lede, ctas:[s.cta,['Talk to our team','#/contact']]
  }) +
  sec('sec--panel', `<div class="split">
    <div><span class="ey">Where teams get stuck</span><h2 class="h2--tight">The problem, as we usually find it.</h2></div>
    <div>${ticks(s.problem)}</div></div>`) +
  sec('', rail('Outcomes', `<h2 class="h2--tight">What changes by the end.</h2>
    <div class="grid g3" style="margin-top:2.2rem">${s.outcomes.map(o=>`<div class="card card--edge"><h3>${o}</h3></div>`).join('')}</div>`)) +
  sec('sec--tint', rail('Where MORA can help', `<h2 class="h2--tight">The capabilities behind this pathway.</h2>
    <div class="grid g3" style="margin-top:2.2rem">${s.caps.map(c=>
      `<a class="card card--link" href="${c[1]}"><h3>${c[0]}</h3><span class="pillar__go">Learn more ${ARROW}</span></a>`).join('')}</div>`)) +
  sec('sec--ink', rail('<span style="color:var(--aqua)">Pathway</span>', `
    <h2 class="h2--tight">How an engagement runs.</h2>
    ${stepList([
      {t:'Qualification',d:'Strategic problem, sponsor, urgency, data access, budget range and decision process.'},
      {t:'Discovery',d:'Business questions, current systems, risk boundaries and expected outcomes.'},
      {t:'Solution design',d:'Scope, deliverables, responsibilities, assumptions and success measures.'},
      {t:'Pilot or diagnostic',d:'Prove value with a controlled use case before scaling commitment.'},
      {t:'Scale',d:'Subscription, implementation workstreams, international program or marketplace rollout.'},
      {t:'Review',d:'Benefit realization, renewal, expansion and customer reference.'}
    ])}`)) +
  sec('sec--panel', rail('Use cases', `<h2 class="h2--tight">Typical starting engagements.</h2>
    ${cards(s.uses.map(u=>({t:u[0],d:u[1]})),'g3')}
    <div style="margin-top:2.2rem">${note('Proof','Case studies are published only with documented baselines, measurement periods and customer approval. Approved cases for this audience will appear here.',true)}</div>`)) +
  sec('', rail('Questions', `<h2 class="h2--tight">Questions we are asked.</h2>
    <div style="margin-top:2rem">${faq(s.faq)}</div>`)) +
  cta('Start with one defined question.',
    'Every pathway begins with a fixed-scope diagnostic so value can be tested before it is scaled.',
    s.cta, ['See how we work','#/how-we-work']);
}

/* ==========================================================
   INDUSTRIES
   Template per the spec: hero, market context with dated trends,
   challenges, MORA solutions, use cases, proof, one CTA.
   ========================================================== */
const INDUSTRIES = {
  'industrial-manufacturing':{
    name:'Industrial Manufacturing',
    h:'Decide what to make, at what cost, when inputs will not hold still.',
    lede:'Portfolio, capacity and cost decisions in industrial manufacturing depend on input markets, customer demand and process capability moving together. MORA connects those three views.',
    trends:[
      ['Input price volatility is now a planning assumption, not an exception','Commodity and energy exposure increasingly determines margin more than production efficiency does.','Source: [Commodity index] · [Period] · Retrieved [Date]'],
      ['Customers buy outcomes, not units','Service, availability and lifecycle cost increasingly decide industrial purchases alongside unit price.','Source: [Customer research] · [Period] · Retrieved [Date]'],
      ['Automation investment is constrained by process clarity','Automation applied to an undocumented process tends to encode the exception rather than remove it.','Source: [Benchmark study] · [Period] · Retrieved [Date]']
    ],
    challenges:['Portfolio decisions made without a comparable view of product-level margin and demand.','Input cost exposure understood at the category level but not at the product level.','Capacity, quality and cost data held in systems that do not reconcile.','Automation candidates chosen by enthusiasm rather than by process evidence.'],
    sols:[['Product Intelligence and Executive Performance modules','#/products/mora-prism'],['Product Advancement and target-cost definition','#/advance'],['Process Excellence and digital enablement','#/advance'],['Supplier and material scouting','#/international']],
    uses:[['Product-level margin truth','Portfolio margin rebuilt from reconciled cost, volume and price data with stated limitations.'],['Target-cost programme','Cost structure set by market price expectation and validated against supply reality.'],['Automation candidate screen','Processes ranked for automation by exception rate, volume and control risk.']],
    cta:['Assess a manufacturing opportunity','#/contact']
  },
  'engineering-construction':{
    name:'Engineering & Construction Supply Chains',
    h:'Long lead times punish late information.',
    lede:'Project supply chains fail slowly and then all at once. MORA builds the multi-tier visibility, supplier qualification and commercial comparison that let procurement act before the critical path moves.',
    trends:[
      ['Lead-time risk has moved upstream','Exposure increasingly sits with tier-two and tier-three suppliers that are not contractually visible.','Source: [Supply chain survey] · [Period] · Retrieved [Date]'],
      ['Project cost escalation is concentrated in a few packages','A small number of long-lead packages typically drive the majority of variance.','Source: [Project cost analysis] · [Period] · Retrieved [Date]'],
      ['Qualification evidence is repeatedly recollected','The same supplier evidence is gathered separately by each project team.','Source: [Client interviews] · [Period] · Retrieved [Date]']
    ],
    challenges:['Multi-tier exposure that is not visible until a delivery date slips.','Supplier qualification repeated per project instead of held once and kept current.','Commercial comparison across bids that are not structured comparably.','Country, logistics and regulatory risk assessed informally.'],
    sols:[['Supply Chain Intelligence module','#/products/mora-prism'],['Supplier identification and prequalification','#/international'],['RFQ structuring and commercial comparison','#/international'],['Process Excellence for procurement workflows','#/advance']],
    uses:[['Critical-package review','Long-lead packages mapped to supplier capacity, country and logistics exposure.'],['Qualification library','Supplier evidence collected once, scoped, dated and reused across projects.'],['Bid comparability','Bids restructured into comparable commercial and technical terms before evaluation.']],
    cta:['Review a project supply chain','#/contact']
  },
  'industrial-distribution':{
    name:'Industrial Distribution',
    h:'Assortment decisions across catalogs no one can see whole.',
    lede:'Distribution margin is made in assortment, supplier mix and service level. MORA reconciles catalog, demand and supplier data so those decisions can be made on evidence.',
    trends:[
      ['Catalog breadth outgrows catalog knowledge','Line counts rise faster than the ability to assess line-level profitability.','Source: [Sector analysis] · [Period] · Retrieved [Date]'],
      ['Buyers expect specification-level search','Procurement teams increasingly search by technical specification rather than by brand.','Source: [Buyer research] · [Period] · Retrieved [Date]'],
      ['Supplier concentration risk is under-measured','Category dependence is often known qualitatively but not quantified.','Source: [Risk study] · [Period] · Retrieved [Date]']
    ],
    challenges:['Line-level profitability obscured by inconsistent product data.','Assortment decisions made on volume rather than on contribution and service cost.','Supplier concentration and substitution options not quantified.','Slow response to specification-level buyer requests.'],
    sols:[['Product and Supply Chain Intelligence modules','#/products/mora-prism'],['Category and assortment opportunity assessment','#/intelligence'],['Alternative supplier scouting and qualification','#/international'],['Masdar Trade supplier discovery','#/products/masdar-trade']],
    uses:[['Assortment review','Lines ranked by contribution, service cost and substitutability.'],['Supplier concentration map','Category dependence quantified with substitution options identified.'],['Specification search readiness','Product data structured so buyers can find items by technical attribute.']],
    cta:['Assess a category','#/contact']
  },
  'consumer-manufacturing':{
    name:'Consumer Manufacturing',
    h:'Read demand early enough to act on it.',
    lede:'Consumer product decisions turn on demand signals, product fit and route to market. MORA validates the opportunity before development commits, and builds the international pathway after it does.',
    trends:[
      ['Demand signals fragment across channels','No single channel view represents total demand, which distorts forecasting.','Source: [Channel analysis] · [Period] · Retrieved [Date]'],
      ['Regulatory and labelling requirements decide market timing','Market access work started after development typically delays launch windows.','Source: [Market access review] · [Period] · Retrieved [Date]'],
      ['Private label reshapes category economics','Category margin structures shift as retailer own-brand share grows.','Source: [Category study] · [Period] · Retrieved [Date]']
    ],
    challenges:['Product concepts validated internally rather than with target customers.','Channel and pricing strategy set after the product is finished.','Market-access requirements discovered late in development.','Limited access to qualified distributors in target markets.'],
    sols:[['Market and Product Intelligence modules','#/products/mora-prism'],['Opportunity validation and concept development','#/advance'],['Product adaptation and market-access planning','#/international'],['Buyer and distributor identification','#/international']],
    uses:[['Concept validation','Demand, alternatives and willingness to adopt tested before development investment.'],['Market-entry brief','Candidate markets assessed on demand, access barriers, channel structure and cost to serve.'],['Distributor pipeline','Distributors screened and qualified before commercial time is committed.']],
    cta:['Validate a product opportunity','#/contact']
  }
};

function pageIndustry(key){
  const i = INDUSTRIES[key];
  if(!i) return page404();
  return pageHero({
    crumbs:[['Home','#/'],['Industries','#/industries'],[i.name]],
    ey:'Industry', h:i.h, lede:i.lede, ctas:[i.cta,['See all industries','#/industries']]
  }) +
  sec('sec--panel', rail('Market context', `
    <h2 class="h2--tight">Three trends that change the decision.</h2>
    <p class="lede lede--wide">Each trend below carries its source and retrieval date. Where a figure is an estimate rather than an observation, it is labelled as one.</p>
    <div class="grid g3">${i.trends.map(t=>`<div class="card card--edge">
      <h3>${t[0]}</h3><p>${t[1]}</p><span class="vlevel__scope">${t[2].replace(/\[([^\]]+)\]/g,(m,x)=>ph(x))}</span></div>`).join('')}</div>`)) +
  sec('', `<div class="split">
    <div><span class="ey">Common challenges</span><h2 class="h2--tight">What we typically find in this sector.</h2></div>
    <div>${ticks(i.challenges)}</div></div>`) +
  sec('sec--tint', rail('MORA solutions', `<h2 class="h2--tight">What we bring to it.</h2>
    <div class="grid g2" style="margin-top:2.2rem">${i.sols.map(s=>
      `<a class="card card--link" href="${s[1]}"><h3>${s[0]}</h3><span class="pillar__go">Learn more ${ARROW}</span></a>`).join('')}</div>`)) +
  sec('sec--panel', rail('Use cases', `<h2 class="h2--tight">Typical engagements.</h2>
    ${cards(i.uses.map(u=>({t:u[0],d:u[1]})),'g3')}
    <div style="margin-top:2.2rem">${note('Proof slot','A sector case study will be published here once a customer has approved the baseline, measurement period and stated result. Until then, our methodology is documented on the How We Work page.',true)}</div>`)) +
  cta('Bring a decision from this sector.',
    'We will define the evidence required, the sources we would use and a fixed-scope assessment to answer it.',
    i.cta, ['Read sector insights','#/insights']);
}

function pageIndustriesIndex(){
  return pageHero({
    crumbs:[['Home','#/'],['Industries']],
    ey:'Industries',
    h:'Sector context changes the decision, not just the vocabulary.',
    lede:'We launch in sectors where our delivery credibility is strongest, data is available and cross-border potential is real. Sectors are added only when those conditions are met.',
    ctas:[['Discuss your sector','#/contact']]
  }) +
  sec('sec--panel', rail('Coverage', `<h2 class="h2--tight">Current sectors.</h2>
    <div class="grid g2" style="margin-top:2.2rem">${Object.entries(INDUSTRIES).map(([k,v])=>
      `<a class="card card--link card--edge" href="#/industries/${k}"><span class="card__k">Industry</span>
        <h3>${v.name}</h3><p>${v.h}</p><span class="pillar__go">Explore sector ${ARROW}</span></a>`).join('')}</div>`)) +
  sec('', rail('Selection criteria', `<h2 class="h2--tight">How we decide to enter a sector.</h2>
    <p class="lede" style="margin:1.3rem 0 2rem">We would rather cover fewer sectors credibly than list every industry on a page.</p>
    ${ticks(['Founder and team expertise with demonstrable delivery credibility','Availability and quality of internal and external data','Strong cross-border sourcing or export potential','Visible operational inefficiencies and product-development needs','Regulatory feasibility and manageable liability','Presence of anchor customers, associations or partner networks'])}
    <div style="margin-top:2.2rem">${note('Additional sectors','Further sectors are added following customer interviews and validated pilot demand, not desk research alone.',true)}</div>`)) +
  cta('Not seeing your sector?',
    'Sector coverage expands with validated demand. Tell us the decision you are facing and we will say plainly whether we are the right partner for it.',
    ['Talk to our team','#/contact']);
}
