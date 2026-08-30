/* MORA Industries — MORA Intelligence, Prism, Advance, International, Masdar Trade */

/* ==========================================================
   02.1 MORA INTELLIGENCE
   ========================================================== */
function pageIntelligence(){
  return pageHero({
    crumbs:[['Home','#/'],['What We Do','#/intelligence'],['MORA Intelligence']],
    ey:'Strategic pillar · Business &amp; market intelligence',
    h:'Understand performance. Read the market. Prioritize action.',
    lede:'MORA Intelligence connects internal business, supply-chain and operational data with external market, competitor, supplier, commodity and risk intelligence to create a clearer view of value, risk and opportunity.',
    ctas:[['Request an intelligence diagnostic','#/contact'],['Explore MORA Prism','#/products/mora-prism']]
  }) +
  sec('sec--panel', rail('What we connect', `
    <h2 class="h2--tight">Two views of the same business.</h2>
    <p class="lede lede--wide">Neither view is sufficient alone. Internal data shows what is happening; external intelligence explains whether it matters.</p>
    ${table(['Internal intelligence','External intelligence'],[
      ['Financial and commercial performance','Market size, demand and growth signals'],
      ['Spend, suppliers and procurement','Supply markets, commodities and logistics'],
      ['Inventory, lead time and service','Competitors, substitutes and pricing'],
      ['Customers, products and channels','Countries, regulation and geopolitical risk'],
      ['Processes, controls and system events','Technology, innovation and benchmarks'],
      ['Capabilities, initiatives and benefits','Buyers, distributors and market-entry conditions']
    ])}
    <div class="btnrow" style="margin-top:2.2rem"><a class="btn btn--sec" href="#/contact">Discuss your intelligence needs ${ARROW}</a></div>`)) +
  sec('', rail('Decision support', `
    <h2 class="h2--tight">What you receive.</h2>
    <p class="lede lede--wide">Each output is scoped before work begins and delivered with its evidence labels intact.</p>
    <div class="grid g3">
      ${['Executive performance cockpit','Opportunity and risk heatmap','Supply-market and supplier analysis','Product and portfolio opportunity assessment','Process and automation opportunity view','Scenario and business-case support','Prioritized advancement roadmap']
        .map((o,i)=>`<div class="card card--edge"><span class="card__k">Output ${String(i+1).padStart(2,'0')}</span><h3>${o}</h3></div>`).join('')}
    </div>
    <div style="margin-top:2.4rem">${note('Evidence standard','Every output distinguishes observed facts, calculated estimates, assumptions and recommendations. External sources carry a name, date and stated limitation wherever practicable.',true)}</div>`)) +
  cta('Move from scattered information to a decision-ready view.',
    'Tell us the business question. We will define the data required, the evidence standard and a fixed-scope diagnostic to answer it.',
    ['Request an intelligence diagnostic','#/contact'],['See how we work','#/how-we-work']);
}

/* ==========================================================
   03.1 MORA PRISM
   ========================================================== */
function pagePrism(){
  return pageHero({
    crumbs:[['Home','#/'],['Products','#/products/mora-prism'],['MORA Prism']],
    ey:'Business &amp; market intelligence workspace',
    h:'Turn intelligence into better business decisions.',
    lede:'MORA Prism brings approved internal business data and curated external market intelligence into one decision workspace, helping organizations understand performance, identify opportunities, manage risks and prioritize action.',
    ctas:[['Request a Prism demo','#/contact'],['Explore capabilities','#/products/mora-prism']]
  }) +

  sec('sec--panel', rail('Why MORA Prism', `
    <h2 class="h2--tight">One connected workspace for the intelligence behind your decisions.</h2>
    <p class="lede lede--wide">Business intelligence is often spread across different systems, reports, teams and external sources. MORA Prism brings the relevant information together around the decisions that matter.</p>
    ${benefits([
      'Connect internal business and operational data with external market intelligence',
      'Create a clearer view of performance, opportunities and risks',
      'Support evidence-based decision-making',
      'Prioritize initiatives based on business value',
      'Give leadership teams a connected view of business conditions',
      'Create a structured foundation for continuous improvement'
    ])}`)) +

  sec('', rail('Core capabilities', `
    <h2 class="h2--tight">Six intelligence capabilities in one workspace.</h2>
    <p class="lede lede--wide">Modules share one taxonomy, one permission model and one opportunity register, so a finding in any module can become a tracked initiative.</p>
    <div class="grid g3">
      ${[
        ['Executive Performance','Connect strategic objectives with operational indicators to understand performance and identify areas requiring attention.'],
        ['Supply Chain Intelligence','Understand spend, suppliers, inventory, supply markets and potential disruption exposure.'],
        ['Market Intelligence','Track demand, customers, competitors, pricing, countries and market-entry conditions.'],
        ['Product Intelligence','Compare portfolio performance with market needs and identify potential product opportunities.'],
        ['Process Intelligence','Reveal bottlenecks, exceptions, control points and opportunities for process improvement and automation.'],
        ['Opportunity Portfolio','Prioritize initiatives and track owners, assumptions, progress, benefits and risks.']
      ].map((m,i)=>`<div class="card card--edge"><span class="card__k">Module ${String(i+1).padStart(2,'0')}</span><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('')}
    </div>
    <div class="btnrow" style="margin-top:2.4rem"><a class="btn btn--sec" href="#/contact">Explore Prism capabilities ${ARROW}</a></div>`)) +

  sec('sec--ink', rail('<span style="color:var(--aqua)">How it works</span>', `
    <h2 class="h2--tight">From business questions to actionable intelligence.</h2>
    <p class="lede lede--light lede--wide">Scope is set by the decisions the workspace must support, not by the data that happens to be available.</p>
    ${stepList([
      {t:'Define',d:'Identify the business decisions, users, objectives and requirements.'},
      {t:'Connect',d:'Assess and connect approved internal data and relevant external intelligence.'},
      {t:'Configure',d:'Set up the appropriate modules, metrics, taxonomies, permissions and roles.'},
      {t:'Analyze',d:'Bring relevant signals together to identify performance gaps, opportunities and risks.'},
      {t:'Prioritize',d:'Turn insights into prioritized initiatives with clear ownership and assumptions.'},
      {t:'Improve',d:'Monitor adoption, data quality, benefits and evolving business needs.'}
    ])}`)) +

  sec('sec--tint', rail('Business benefits', `
    <h2 class="h2--tight">Move from scattered information to connected decision-making.</h2>
    <div class="grid g2" style="margin-top:2.2rem">
      ${[
        ['Better visibility','Business performance and market conditions read against each other, not in separate reports.'],
        ['Clearer opportunities and risks','Signals are named, scored and given an owner rather than left in a dashboard.'],
        ['Structured prioritization','Initiatives ranked by value, feasibility, urgency and evidence confidence.'],
        ['Connected intelligence','One taxonomy across functions, so findings travel between teams intact.'],
        ['Supply-chain and market visibility','Spend, suppliers, inventory and supply markets in one exposure view.'],
        ['A clearer path from insight to action','Every finding ends in a decision, an owner and a review point.']
      ].map(b=>`<div class="card card--link-static"><h3>${b[0]}</h3><p>${b[1]}</p></div>`).join('')}
    </div>
    <div class="btnrow" style="margin-top:2.4rem"><a class="btn btn--sec" href="#/contact">Discuss your intelligence needs ${ARROW}</a></div>`)) +

  sec('', rail('Who is it for', `
    <h2 class="h2--tight">Built for teams making important business decisions.</h2>
    ${audienceNotes([
      ['Executives','Understand strategic performance, risks and opportunities.'],
      ['Procurement &amp; supply chain teams','Connect spend, suppliers, inventory and supply-market intelligence.'],
      ['Product teams','Understand market needs and identify portfolio opportunities.'],
      ['Operations teams','Identify process bottlenecks, exceptions and improvement opportunities.'],
      ['Strategy &amp; business development teams','Evaluate opportunities and prioritize initiatives.']
    ])}
    <div class="btnrow" style="margin-top:2.4rem"><a class="btn btn--sec" href="#/contact">Find your Prism use case ${ARROW}</a></div>`)) +

  sec('sec--panel', rail('Trust &amp; governance', `
    <h2 class="h2--tight">Intelligence designed with control and accountability.</h2>
    <div class="split" style="margin-top:2.2rem;align-items:start">
      <div>${ticks([
        'Customer-approved internal data',
        'Defined access and permissions',
        'External source traceability',
        'Clear distinction between facts, estimates, assumptions and recommendations',
        'Human review for material recommendations and AI-assisted outputs',
        'Defined verification scope where applicable'
      ])}
      <div class="btnrow" style="margin-top:1.9rem"><a class="btn btn--sec" href="#/trust">Explore trust and governance ${ARROW}</a></div></div>
      <div style="display:grid;gap:1.2rem">
        ${note('Packaging','Prism is available as a fixed-scope Diagnostic, a continuously refreshed Workspace, a Managed Intelligence service with analyst support, or an Enterprise deployment for multi-entity organizations. Commercial terms are set during solution design.',true)}
        ${note('Data and AI','Customer information is processed under agreed permissions and access controls. External sources are labeled and dated. Where AI-assisted features are used, outputs are subject to defined safeguards, confidence controls and human review.')}
      </div>
    </div>`)) +

  sec('', rail('Questions', `<h2 class="h2--tight">Common questions.</h2>
    <div style="margin-top:2rem">${faq([
      {q:'Is MORA Prism a fixed dashboard?',a:'No. It is a modular workspace configured around defined decisions, users, data sources and governance requirements.'},
      {q:'Do we need to replace existing systems?',a:'Not necessarily. Prism is intended to connect approved information from current systems and sources, subject to integration feasibility.'},
      {q:'Can we begin with one use case?',a:'Yes. A focused diagnostic or module is the recommended way to validate value before scaling.'},
      {q:'Who owns our data?',a:'The customer retains ownership of its data. Detailed processing, retention and access terms are defined contractually.'},
      {q:'Can Prism include external intelligence?',a:'Yes. External sources are selected based on the use case, licensing rights, geography and required refresh frequency.'}
    ])}</div>`)) +

  cta('Ready to turn intelligence into action?',
    'Bring your business questions, operational challenges and growth priorities into one connected intelligence workspace.',
    ['Request a Prism demo','#/contact'],['Talk to our team','#/contact']);
}

/* ==========================================================
   02.2 MORA ADVANCE
   ========================================================== */
function pageAdvance(){
  return pageHero({
    crumbs:[['Home','#/'],['What We Do','#/advance'],['MORA Advance']],
    ey:'Strategic pillar · Product advancement &amp; process excellence',
    h:'Advance what you offer and how you deliver it.',
    lede:'MORA Advance combines Product Advancement and Process Excellence. It uses validated market and operational evidence to develop commercially relevant products and create efficient, controlled and technology-enabled processes.',
    ctas:[['Explore MORA Advance','#/contact'],['See the engagement model','#/how-we-work']]
  }) +
  sec('sec--panel', rail('Product advancement', `
    <h2 class="h2--tight">Build around verified market need.</h2>
    <p class="lede lede--wide">Move from market signal to product decision through customer research, concept development, feasibility, sourcing, prototype coordination, testing and commercialization planning.</p>
    ${cards([
      {t:'Opportunity validation',d:'Test demand, customer pain points, alternatives and willingness to adopt before major development investment.',edge:1},
      {t:'Concept and requirements',d:'Translate evidence into value propositions, product requirements, target cost and success criteria.',edge:1},
      {t:'Feasibility and sourcing',d:'Assess technical, commercial, supply, regulatory and partner requirements.',edge:1},
      {t:'Prototype and pilot',d:'Coordinate iterative development, testing evidence and decision gates.',edge:1},
      {t:'Commercialization',d:'Prepare positioning, channels, pricing logic, launch milestones and lifecycle measures.',edge:1}
    ])}
    <div class="btnrow" style="margin-top:2.4rem"><a class="btn btn--sec" href="#/contact">Discuss Product Advancement ${ARROW}</a></div>`)) +
  sec('', rail('Process excellence', `
    <h2 class="h2--tight">Make work visible, controlled and easier to execute.</h2>
    <p class="lede lede--wide">Map how work happens today, expose bottlenecks and control weaknesses, then design a practical future state across people, policy, process, data and systems.</p>
    ${cards([
      {t:'Current-state mapping',d:'Document activities, roles, approvals, systems, handoffs, timing and exceptions.'},
      {t:'Gap and waste analysis',d:'Identify delay, rework, duplication, manual effort and non-value-adding activities.'},
      {t:'Controls and integrity',d:'Review approval logic, segregation of duties, evidence and exposure to error, conflict, fraud or corruption.'},
      {t:'Future-state design',d:'Simplify flows, clarify accountability, strengthen controls and define service levels.'},
      {t:'Digital enablement',d:'Identify system touchpoints, automation priorities, data requirements and implementation steps.'},
      {t:'Adoption and benefits',d:'Support rollout, training, KPI ownership and post-implementation review.'}
    ])}
    <div class="btnrow" style="margin-top:2.4rem"><a class="btn btn--sec" href="#/contact">Discuss Process Excellence ${ARROW}</a></div>`)) +
  sec('sec--ink', rail('<span style="color:var(--aqua)">Engagement model</span>', `
    <h2 class="h2--tight">Five stages, each closed by a gate.</h2>
    <p class="lede lede--light lede--wide">A stage does not proceed until its gate is met and an accountable owner is named.</p>
    ${stepList([
      {t:'Discover — verified problem and intended outcome',d:'Product: market need and portfolio evidence. Process: process evidence and performance baseline.'},
      {t:'Design — approved design and accountable owner',d:'Product: concept, requirements and business case. Process: future-state flow, controls and roles.'},
      {t:'Develop — pilot readiness',d:'Product: prototype, supplier and test plan. Process: pilot workflow, configuration and procedures.'},
      {t:'Deploy — operational acceptance',d:'Product: launch and commercialization support. Process: rollout, training and adoption support.'},
      {t:'Improve — realized value and next actions',d:'Product: lifecycle and customer feedback. Process: benefits, compliance and continuous improvement.'}
    ])}`)) +
  sec('sec--panel', rail('Outputs', `
    <h2 class="h2--tight">Engagement outputs.</h2>
    <div style="margin-top:2rem;max-width:70ch">${ticks([
      'Evidence-backed opportunity statement','Current-state and future-state maps','Product or process requirements',
      'Business case and implementation roadmap','Role, control and system design','Pilot plan and decision gates',
      'KPIs, benefit targets and governance'])}</div>`)) +
  cta('From identified gap to implemented improvement.',
    'Bring a product question or a process that is not performing. We will define the evidence needed and a scoped assessment.',
    ['Start an Advance assessment','#/contact'],['Explore MORA Intelligence','#/intelligence']);
}

/* ==========================================================
   02.3 MORA INTERNATIONAL
   ========================================================== */
function pageInternational(){
  return pageHero({
    crumbs:[['Home','#/'],['What We Do','#/international'],['MORA International']],
    ey:'Strategic pillar · Global sourcing &amp; export development',
    h:'Build reliable pathways across borders.',
    lede:'MORA International helps organizations develop global suppliers, strengthen foreign procurement and expand products into selected international markets through structured research, qualification and business development.',
    ctas:[['Discuss international growth','#/contact'],['Explore Masdar Trade','#/products/masdar-trade']]
  }) +
  sec('sec--panel', `<div class="split">
    <div>
      <span class="ey">Inbound — global sourcing &amp; foreign procurement</span>
      <h2 class="h2--tight">Find international supply with clearer evidence and control.</h2>
      <div style="margin:1.8rem 0">${ticks([
        'Supply-market and country research','Supplier identification and prequalification',
        'Capability, certification and risk assessment','RFIs, RFQs and commercial comparison',
        'Total cost and landed-cost analysis','Negotiation and contracting support',
        'Import, logistics and Incoterms coordination with specialists',
        'Supplier onboarding, performance and diversification strategy'])}</div>
      <a class="btn btn--sec" href="#/contact">Request supplier search ${ARROW}</a>
    </div>
    <div>
      <span class="ey">Outbound — export &amp; market development</span>
      <h2 class="h2--tight">Move from export ambition to a structured market pathway.</h2>
      <div style="margin:1.8rem 0">${ticks([
        'Export readiness and product-market fit','Target-market selection and demand validation',
        'Competitor, channel and pricing analysis','Product adaptation and market-access planning',
        'Buyer, distributor and agent identification','Commercial outreach and qualified introductions',
        'Route-to-market and partnership design','Market activation milestones and performance monitoring'])}</div>
      <a class="btn btn--sec" href="#/contact">Discuss export development ${ARROW}</a>
    </div></div>`) +
  sec('', rail('Role clarity', `<h2 class="h2--tight">What we do, and what we coordinate.</h2>
    <div style="margin-top:2rem">${note('Important',
      "MORA's role and authority are defined for each engagement. Legal, tax, customs, certification, finance and regulated services are coordinated with qualified specialists where required. Market development reduces uncertainty but does not guarantee a transaction or market outcome.")}</div>`)) +
  cta('Tell us the market or the supply gap.',
    'We will define the research, qualification steps and commercial pathway, and name the specialists required alongside us.',
    ['Discuss international growth','#/contact'],['See our partner ecosystem','#/partners']);
}

/* ==========================================================
   03.2 MASDAR TRADE
   ========================================================== */
function pageMasdar(){
  return pageHero({
    crumbs:[['Home','#/'],['Products','#/products/masdar-trade'],['Masdar Trade']],
    ey:'B2B manufacturer &amp; sourcing marketplace',
    h:'Make global manufacturing capability easier to discover.',
    lede:'Masdar Trade connects manufacturers, business buyers, distributors and procurement teams through structured company profiles, product discovery and controlled B2B inquiry workflows.',
    ctas:[['Join as a manufacturer','#/contact'],['Join as a buyer','#/contact']]
  }) +

  sec('sec--panel', rail('Why Masdar Trade', `
    <h2 class="h2--tight">A more structured way to discover manufacturing capability.</h2>
    <p class="lede lede--wide">Manufacturers need visibility with relevant business buyers. Procurement teams need easier access to manufacturers and product capabilities. Masdar Trade creates a structured environment for both sides to discover, evaluate and connect.</p>
    ${benefits([
      'Easier manufacturer discovery',
      'Structured company and product information',
      'International buyer and supplier visibility',
      'B2B inquiry and RFQ workflows',
      'Better supplier shortlisting',
      'Centralized communication and document exchange',
      'Optional managed sourcing support'
    ])}`)) +

  sec('', `<div class="split">
    <div>
      <span class="ey">For manufacturers</span>
      <h2 class="h2--tight">Put your manufacturing capability in front of business buyers.</h2>
      <p class="lede" style="margin:1.3rem 0 1.9rem">Create a structured profile that makes your capabilities, products, certifications and export-market information easier to discover.</p>
      <h3 class="sub">Profile includes</h3>
      ${ticks(['Company and factory information','Manufacturing capabilities','Production capacity','Quality information','Product catalog','Technical specifications','Certifications','Export-market information'])}
      <h3 class="sub">Business opportunities</h3>
      ${ticks(['Receive relevant business inquiries','Participate in RFIs and RFQs','Showcase products to international buyers','Build visibility across relevant markets','Participate in selected market-development programs'])}
      <div class="btnrow" style="margin-top:1.9rem"><a class="btn btn--pri" href="#/contact">Join as a manufacturer ${ARROW}</a></div>
    </div>
    <div>
      <span class="ey">For buyers</span>
      <h2 class="h2--tight">Discover manufacturers and compare sourcing options.</h2>
      <p class="lede" style="margin:1.3rem 0 1.9rem">Search manufacturer and product profiles, create shortlists, submit business inquiries and compare responses.</p>
      <h3 class="sub">What buyers can do</h3>
      ${ticks(['Category and specification search','Manufacturer discovery','Product shortlists','RFI and RFQ workflows','Clarification and document exchange','Commercial comparison','Optional managed sourcing support'])}
      <div style="margin-top:1.9rem">${note('Buyer responsibility','Verification labels explain what has been reviewed and when. They do not replace your own technical, commercial or legal due diligence.',true)}</div>
      <div class="btnrow" style="margin-top:1.9rem"><a class="btn btn--pri" href="#/contact">Join as a buyer ${ARROW}</a></div>
    </div></div>`) +

  sec('sec--ink', rail('<span style="color:var(--aqua)">How it works</span>', `
    <h2 class="h2--tight">From discovery to qualified business inquiry.</h2>
    ${stepList([
      {t:'Discover',d:'Search manufacturers and products using relevant categories and specifications.'},
      {t:'Evaluate',d:'Review structured company, capability, product and certification information.'},
      {t:'Shortlist',d:'Save relevant manufacturers or products for further evaluation.'},
      {t:'Inquire',d:'Send business inquiries, RFIs or RFQs.'},
      {t:'Compare',d:'Review supplier responses and commercial information.'},
      {t:'Connect',d:'Move qualified opportunities toward the next stage of the business relationship.'}
    ])}
    <div class="btnrow" style="margin-top:2.2rem"><a class="btn btn--onink" href="#/contact">Start your search ${ARROW}</a></div>`)) +

  sec('sec--panel', rail('Verification', `
    <h2 class="h2--tight">Clear verification with a defined scope.</h2>
    <p class="lede lede--wide">Verification on Masdar Trade communicates what was reviewed, within what scope, and when. It does not replace the buyer's own technical, commercial, legal or compliance due diligence.</p>
    <div class="vlevels">
      ${[
        ['l1','Registered','The organization created an account and provided the required registration information. No capability endorsement is implied.','Scope: registration data only'],
        ['l2','Identity reviewed','Defined legal-identity information was reviewed against submitted evidence on the displayed date.','Scope: legal identity · Reviewed [Date]'],
        ['l3','Capability reviewed','Selected capability documents or assessment items were reviewed within the displayed scope.','Scope: stated capability items · Reviewed [Date]'],
        ['l4','Certification checked','The listed certification was checked against available evidence or issuing-source information where feasible.','Scope: named certificate · Checked [Date]'],
        ['l5','Performance information','Customer-approved performance records may be displayed with period, source and limitations.','Scope: stated period and source']
      ].map(v=>`<div class="vlevel">
        <span class="vlevel__l ${v[0]}"><i></i>${v[1]}</span>
        <div><p>${v[2]}</p><span class="vlevel__scope">${v[3].replace(/\[([^\]]+)\]/g,(m,x)=>ph(x))}</span></div>
      </div>`).join('')}
    </div>
    <div style="margin-top:2.2rem">${note('Verification is scoped, not absolute','Verification describes the checks completed within a defined scope and date. It is not a guarantee of supplier performance. Buyers remain responsible for their own technical, commercial and legal due diligence.')}</div>
    <div class="btnrow" style="margin-top:1.8rem"><a class="btn btn--sec" href="#/trust">Learn about verification ${ARROW}</a></div>`)) +

  sec('sec--tint', rail('Who is it for', `
    <h2 class="h2--tight">Built for both sides of the B2B marketplace.</h2>
    ${audienceNotes([
      ['Manufacturers','Increase visibility and connect with relevant business buyers.'],
      ['Procurement teams','Discover and evaluate potential manufacturers and suppliers.'],
      ['Distributors','Find products and manufacturing partners.'],
      ['Business buyers','Explore manufacturers and initiate qualified inquiries.'],
      ['International buyers','Discover manufacturing capabilities across relevant markets.']
    ])}
    <div class="btnrow" style="margin-top:2.4rem"><a class="btn btn--sec" href="#/contact">Find your route ${ARROW}</a></div>`)) +

  sec('', rail('Questions', `<h2 class="h2--tight">Marketplace questions.</h2>
    <div style="margin-top:2rem">${faq([
      {q:'Does verification guarantee supplier performance?',a:'No. Verification describes the checks completed within a defined scope and date. Buyers remain responsible for their own technical, commercial and legal due diligence.'},
      {q:'Can buyers request a managed supplier search?',a:'Yes. MORA can provide a separately scoped sourcing service based on category, country, technical and commercial requirements.'},
      {q:'Can manufacturers join without export experience?',a:'Eligibility depends on category and program requirements. Export-readiness support may be offered before active international promotion.'},
      {q:'Who can see submitted documents?',a:'Visibility depends on document type, permissions and marketplace settings. Sensitive documents are not public by default.'},
      {q:'Does Masdar Trade handle payment or logistics?',a:'Only the features published in the marketplace terms are provided. Partner services, where introduced, are disclosed separately.'}
    ])}</div>`)) +

  cta('Ready to discover your next manufacturing partner?',
    'Whether you are looking to showcase your manufacturing capability or find the right supplier, Masdar Trade gives you a structured way to start the conversation.',
    ['Join as a manufacturer','#/contact'],['Join as a buyer','#/contact']);
}
