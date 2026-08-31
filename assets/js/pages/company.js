/* MORA Industries — about, how we work, trust, partners, careers */

/* ==========================================================
   COMPANY PAGES
   ========================================================== */
function pageAbout(){
  return pageHero({
    crumbs:[['Home','#/'],['Company','#/about'],['About MORA']],
    ey:'About', h:'We exist to move opportunity from evidence to action.',
    lede:'MORA Industries was created around a simple belief: research is more valuable when it leads to a better product, a stronger process or a practical market connection. We bring intelligence, advancement and international capability into one operating model.',
    ctas:[['Talk to our team','#/contact'],['See how we work','#/how-we-work']]
  }) +
  sec('sec--panel', rail('The name', `
    <h2 class="h2--tight">Market Opportunities Research &amp; Advancement.</h2>
    <p class="lede" style="margin:1.4rem 0 0;max-width:62ch">The name describes a complete journey rather than a category. Research reveals an opportunity, intelligence validates it, and advancement converts it into measurable action. Each word corresponds to something we are accountable for delivering.</p>`)) +
  sec('', rail('Purpose and vision', `
    <div class="grid g2">
      <div class="card card--edge"><span class="card__k">Purpose</span><h3 style="max-width:22ch">To turn business and market intelligence into better products, stronger processes and international growth.</h3></div>
      <div class="card card--edge gold"><span class="card__k">Vision</span><h3 style="max-width:22ch">To become a trusted international platform for discovering, developing and activating market opportunities across industries.</h3></div>
    </div>
    <div style="margin-top:2.4rem;max-width:70ch"><span class="ey">Brand promise</span>
      <p class="lede">We identify where value exists, develop the capabilities required to capture it, and connect businesses to the markets and partners needed to scale it.</p></div>`)) +
  sec('sec--ink', rail('<span style="color:var(--aqua)">Values</span>', `
    <h2 class="h2--tight">Six commitments, stated as behaviour.</h2>
    <div class="grid g3" style="margin-top:2.2rem">${[
      ['Evidence before assumption','Recommendations are traceable to reliable internal data, external sources and documented analysis.'],
      ['Advancement over activity','Work is judged by business outcomes, adoption and measurable value, not the volume of reports.'],
      ['Integrity by design','Controls, transparency, confidentiality and ethical cross-border practices are embedded in delivery.'],
      ['Practical innovation','Innovation must be feasible, commercially relevant and suitable for the customer context.'],
      ['Global reach, local relevance','International opportunities are adapted to local capabilities, regulations and market realities.'],
      ['Partnership mindset','We develop capability with customers, suppliers and ecosystem partners rather than creating dependency.']
    ].map(v=>`<div class="card card--onink"><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('')}</div>`)) +
  sec('sec--panel', rail('Positioning', `<h2 class="h2--tight">Where we sit, and where we do not.</h2>
    <p class="lede" style="margin:1.4rem 0 2rem;max-width:66ch">For manufacturers, traders and growth-oriented organizations that need clearer decisions, stronger operations or international reach, MORA Industries is a business advancement company that connects intelligence, development and cross-border execution. Unlike firms that provide isolated research, consulting or marketplace access, we create a connected path from opportunity discovery to implementation and market activation.</p>
    ${note('Working names','MORA Prism is a recommended working name. MORA Industries, MORA Prism and Masdar Trade are subject to trademark, company-name, domain, translation and jurisdictional legal review before final visual identity and public launch.')}`)) +
  cta('Work with us.',
    'Whether you are evaluating a decision, a process or a market, the first step is the same: define the question and the evidence that would answer it.',
    ['Book a discovery session','#/contact'],['See open roles','#/careers']);
}

function pageHowWeWork(){
  return pageHero({
    crumbs:[['Home','#/'],['Company','#/about'],['How We Work']],
    ey:'Method', h:'A controlled path from question to measurable outcome.',
    lede:'Every engagement follows the same six stages. The stages are sequential because each one produces the input the next one needs, and each closes with a decision that is recorded.',
    ctas:[['Book a discovery session','#/contact']]
  }) +
  sec('sec--panel', rail('The method', `
    <h2 class="h2--tight">Six stages, in order.</h2>
    ${stepList([
      {t:'Frame the decision',d:'Define the business question, sponsor, users, scope and constraints. If the question cannot be stated, the engagement does not start.'},
      {t:'Build the evidence',d:'Assess internal data and gather relevant external intelligence. Data readiness is scored and published with the findings.'},
      {t:'Diagnose and prioritize',d:'Identify gaps and score opportunities with clear assumptions, separating observation from estimate.'},
      {t:'Design the response',d:'Define the product, process, sourcing or market solution, with named owners and success measures.'},
      {t:'Pilot and implement',d:'Test through decision gates, ownership and change support before committing to scale.'},
      {t:'Measure and improve',d:'Track adoption, benefits, risks and the next opportunity against the baseline set at the start.'}
    ])}`)) +
  sec('', rail('Evidence standard', `<h2 class="h2--tight">How we label what we tell you.</h2>
    <div class="grid g2" style="margin-top:2.2rem">${[
      ['Observed fact','A value measured directly from a named source, with date and ownership recorded.'],
      ['Calculated estimate','A value derived from observed facts using a stated method, presented with its inputs.'],
      ['Assumption','A value taken as given because it cannot currently be measured, flagged as such in every output.'],
      ['Recommendation','A judgement built on the three above, attributed to a named reviewer.']
    ].map(e=>`<div class="card card--edge"><h3>${e[0]}</h3><p>${e[1]}</p></div>`).join('')}</div>
    <div style="margin-top:2.2rem">${note('Why this matters','A recommendation that cannot be traced back to its evidence cannot be reviewed, challenged or defended in front of a board. Labelling is not administrative overhead; it is what makes the analysis usable.',true)}</div>`)) +
  cta('Bring one question.',
    'The strongest starting point is a single decision with a sponsor and a deadline. We will define the evidence needed and a fixed-scope diagnostic to produce it.',
    ['Book a discovery session','#/contact'],['View trust and governance','#/trust']);
}

function pageTrust(){
  return pageHero({
    crumbs:[['Home','#/'],['Company','#/about'],['Trust & Governance']],
    ey:'Trust and governance', h:'Trust is designed into our data, analysis and cross-border work.',
    lede:'These are the commitments that govern how we handle customer information, label evidence, describe verification and account for AI-assisted output.',
    ctas:[['Request security or governance information','#/contact']]
  }) +
  sec('sec--panel', rail('Principles', `<h2 class="h2--tight">Six governing principles.</h2>
    <div class="grid g2" style="margin-top:2.2rem">${[
      ['Customer data control','We process customer information under defined permissions, purposes, access controls and contractual terms.'],
      ['Source traceability','External intelligence is labeled with source, date and relevant limitations wherever practicable.'],
      ['Responsible analysis','We separate observed facts, calculated estimates, assumptions and recommendations.'],
      ['Defined verification','Marketplace labels state what was reviewed, the scope and the date. They do not replace buyer due diligence.'],
      ['Human accountability','Material recommendations and AI-assisted outputs are subject to defined human review.'],
      ['Ethical international work','Engagements follow documented authority, conflict, anti-bribery and third-party due-diligence controls.']
    ].map(p=>`<div class="card card--edge"><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join('')}</div>`)) +
  sec('', rail('Governance', `<h2 class="h2--tight">Policies in force before launch.</h2>
    <div style="margin-top:2rem;max-width:70ch">${ticks([
      'Information security and access control','Privacy, consent, retention and data-subject handling',
      'Confidentiality and intellectual property','Marketplace terms, acceptable use and content moderation',
      'Supplier and buyer verification methodology','Anti-bribery, sanctions, export controls and conflict-of-interest',
      'Third-party due diligence','Research sourcing and analytical quality',
      'Complaint, dispute and incident response','Business continuity and backup'])}</div>
    <div style="margin-top:2.4rem">${note('Scope of this page','This page describes governance commitments. Detailed security architecture, certifications and deployment documentation are shared under confidentiality during solution design.',true)}</div>`)) +
  cta('Ask us the hard questions.',
    'Security, privacy and governance documentation is available to organizations evaluating an engagement. Tell us what your review process requires.',
    ['Request governance information','#/contact'],['Read our method','#/how-we-work']);
}

/* ---------- Partners / who we work with ----------
   No customer logos or testimonials are shown. The structure is here;
   entries are added only once approved under the proof-language rules. */
function pagePartners(){
  const cats = [
    ['Industry associations and chambers','Member access, sector programmes and cluster development.'],
    ['Technology partners','Cloud, analytics, integration and cybersecurity capability behind Prism deployments.'],
    ['Engineering, certification and testing','Technical validation and compliance work within Product Advancement.'],
    ['Legal, tax, customs and compliance','Regulated cross-border matters that sit outside our authority.'],
    ['Logistics, inspection, finance and insurance','Trade enablement services introduced transparently to marketplace users.'],
    ['Universities and research centres','Applied research, methodology review and talent development.']
  ];
  return pageHero({
    crumbs:[['Home','#/'],['Company','#/about'],['Partners']],
    ey:'Partners', h:'Build stronger solutions through the right ecosystem.',
    lede:'MORA collaborates with technology, research, engineering, certification, logistics, finance and market-development specialists. Every partnership is evaluated for capability, role clarity, conflicts, confidentiality and customer value.',
    ctas:[['Discuss a partnership','#/contact']]
  }) +
  sec('sec--panel', rail('Ecosystem', `<h2 class="h2--tight">Six categories of partner.</h2>
    <div class="grid g3" style="margin-top:2.2rem">${cats.map(c=>
      `<div class="card card--edge"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div>`)) +
  sec('', rail('Named partners', `<h2 class="h2--tight">Partners are named here once agreements are signed.</h2>
    <p class="lede" style="margin:1.3rem 0 2.2rem;max-width:64ch">We do not display a logo before there is an agreement permitting it, and we do not imply endorsement from a conversation. The slots below are reserved.</p>
    <div class="plogos">${Array.from({length:8},(_,i)=>`<div class="slot">
      <span class="tag">Slot ${String(i+1).padStart(2,'0')}</span>
      <strong>Partner mark</strong><p>Add once the agreement and logo-use permission are in place.</p></div>`).join('')}</div>`)) +
  sec('sec--tint', rail('Customer proof', `<h2 class="h2--tight">Customer evidence, held to the same standard.</h2>
    <p class="lede" style="margin:1.3rem 0 2.2rem;max-width:64ch">Case studies are published only with a documented baseline, a stated measurement period, named limitations and written customer approval. Until a case meets all four, it is not published.</p>
    <div class="grid g3">${[
      ['Case study slot','Challenge, evidence, solution, result, period and limitations — with customer permission on file.'],
      ['Credential slot','Certification, accreditation or membership, with issuing body and valid-from date.'],
      ['Reference slot','Named reference contact, released under an approved reference agreement.']
    ].map((s,i)=>`<div class="slot"><span class="tag">Reserved ${String(i+1).padStart(2,'0')}</span><strong>${s[0]}</strong><p>${s[1]}</p></div>`).join('')}</div>
    <div style="margin-top:2.2rem">${note('Proof language','We avoid claims such as "guaranteed savings", "risk-free", "fully verified" or "best supplier". Quantified results are used only with documented baselines, periods and customer approval.')}</div>`)) +
  cta('Partner with us.',
    'Tell us where your capability complements ours. We will assess fit, role boundaries, conflicts and the customer value the partnership would create.',
    ['Discuss a partnership','#/contact'],['See how we work','#/how-we-work']);
}

/* ---------- Careers ---------- */
const ROLES = [
  {t:'Senior Intelligence Analyst',team:'Intelligence and Data',loc:'',type:'Full time',
   d:'Own diagnostic engagements end to end: data readiness assessment, internal and external analysis, opportunity scoring and executive readout.'},
  {t:'Data Engineer, MORA Prism',team:'Product and Technology',loc:'',type:'Full time',
   d:'Build the connectors, models and quality controls that bring customer-approved data and licensed external sources into the workspace.'},
  {t:'Process Excellence Consultant',team:'MORA Advance',loc:'',type:'Full time',
   d:'Map current-state processes, expose control weaknesses and design future-state flows with named owners and measurable service levels.'},
  {t:'Supplier Development Manager',team:'International and Marketplace',loc:'',type:'Full time',
   d:'Qualify manufacturers for Masdar Trade, run export-readiness programmes and manage the supplier cohort through onboarding.'},
  {t:'Product Designer',team:'Product and Technology',loc:'',type:'Full time',
   d:'Design decision workflows for Prism and Masdar Trade, including the evidence-labelling and verification-scope patterns.'},
  {t:'Legal and Compliance Counsel',team:'Risk, Legal and Compliance',loc:'',type:'Part time',
   d:'Own marketplace terms, verification methodology, cross-border controls and third-party due diligence.'}
];

function pageCareers(){
  return pageHero({
    crumbs:[['Home','#/'],['Company','#/about'],['Careers']],
    ey:'Careers', h:'Work where research is expected to change something.',
    lede:'MORA is early. That means unusual ownership, direct access to customer decisions, and the obligation to say plainly when the evidence does not support the recommendation.',
    ctas:[['See open roles','#/careers'],['Ask about a role','#/contact']]
  }) +
  sec('sec--panel', rail('Why here', `<h2 class="h2--tight">What is genuinely different.</h2>
    <div class="grid g3" style="margin-top:2.2rem">${[
      ['Findings have owners','Analysis does not end in a report. Every recommendation becomes an owned entry or is closed with a stated reason.'],
      ['Evidence standards are enforced','You will be asked to separate fact, estimate and assumption in everything you produce, and reviewers will check.'],
      ['Three pillars, one path','Intelligence, Advance and International hand work to each other, so you see a decision through to its outcome.'],
      ['Early-stage scope','Small team, real ownership, and the ambiguity that comes with both. This suits some people and not others.'],
      ['Cross-border work','Engagements span markets, which means real regulatory and cultural complexity rather than theoretical reach.'],
      ['Deliberate growth','We add sectors and headcount against validated demand, not against a fundraising narrative.']
    ].map(v=>`<div class="card card--edge"><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('')}</div>`)) +
  sec('', rail('Open roles', `<h2 class="h2--tight">Open roles.</h2>
    <div style="margin-top:2rem;border-top:1px solid var(--line)">${ROLES.map(r=>`
      <a class="role" href="#/contact">
        <div><h3>${r.t}</h3>
          <p style="color:var(--muted);font-size:.92rem;margin:.35rem 0 0;max-width:62ch">${r.d}</p>
          <span class="role__meta"><span>${r.team}</span>${r.loc ? `<span>${r.loc}</span>` : ''}<span>${r.type}</span></span>
        </div>
        <span class="btn btn--sec">View role ${ARROW}</span></a>`).join('')}</div>
    <div style="margin-top:2.4rem">${note('Speculative applications','If none of these match but the work does, write to us with the problem you most want to work on and what you have built before. We read every one.',true)}</div>`)) +
  sec('sec--ink', rail('<span style="color:var(--aqua)">Hiring process</span>', `
    <h2 class="h2--tight">Four steps. No unpaid project work.</h2>
    ${stepList([
      {t:'Application review',d:'We review against the role requirements and respond either way within a stated window.'},
      {t:'Introductory conversation',d:'Thirty minutes on your experience, what you want next and what the role actually involves.'},
      {t:'Working session',d:'A scoped, paid exercise using anonymized material, discussed live rather than submitted and marked.'},
      {t:'Final conversation and offer',d:'Meet the team you would work with, then a written offer with the terms stated in full.'}
    ])}`)) +
  cta('Not on the list?',
    'Tell us what you want to work on and what you have built. If there is a fit, we will make one.',
    ['Get in touch','#/contact'],['Read about the company','#/about']);
}
