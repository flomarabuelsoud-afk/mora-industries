/* MORA Industries — home page */

/* ==========================================================
   HOME
   Section order follows the approved website content:
   hero, What We Do, Our Products, Who We Work With, Why MORA,
   Let's Talk and Get in Touch.
   ========================================================== */
function pageHome(){
  return `
  <div class="hero"><div class="hero__in">
    <div>
      <span class="ey ey--pale">Market Opportunities Research &amp; Advancement</span>
      <h1 class="hero__h1">Intelligence.<br>Advancement.<br>International&nbsp;Growth.</h1>
      <p class="hero__body">MORA Industries helps businesses understand markets, improve products and processes, and build new opportunities for international growth.</p>
      <div class="btnrow">
        <a class="btn btn--onink" href="#/contact">Book a consultation ${ARROW}</a>
        <a class="btn btn--onink-sec" href="#/contact">Talk to MORA</a>
      </div>
      <p class="hero__support">Understand <i></i> Improve <i></i> Expand</p>
    </div>
    <div class="hero__fig">${prismFigure()}</div>
  </div></div>

  ${sec('sec--panel', rail('What we do', `
    <h2 class="h2--tight">From insight to action.</h2>
    <p class="lede lede--wide">Every business has different challenges and opportunities. We help you understand what is happening, identify where the opportunity lies, and decide what to do next.</p>
    <div class="grid g3 pillars">
      ${[
        {k:'MORA Intelligence',t:'Understand your business and your market as one picture.',d:'Connected internal and external intelligence that shows what is happening, why it matters and where the opportunities are.',c:'Explore MORA Intelligence',h:'#/intelligence'},
        {k:'MORA Advance',t:'Develop better products and stronger processes.',d:'Turn validated opportunities into practical improvements — commercially relevant products and efficient, controlled operations.',c:'Explore MORA Advance',h:'#/advance'},
        {k:'MORA International',t:'Build stronger international connections.',d:'Sourcing, procurement, export development and selected market opportunities, structured around evidence and qualification.',c:'Explore MORA International',h:'#/international'}
      ].map(p=>`<a class="pillar" href="${p.h}"><span class="card__k">${p.k}</span><h3>${p.t}</h3><p>${p.d}</p>
        <span class="pillar__go">${p.c} ${ARROW}</span></a>`).join('')}
    </div>`))}

  ${sec('', rail('Our products', `
    <h2 class="h2--tight">Tools built to turn information into opportunities.</h2>
    <p class="lede lede--wide">Our products make it easier to access the information, connections and tools businesses need to make better decisions and grow.</p>
    <div class="spot">
      <div class="spot__card">
        <span class="ey">MORA Prism</span>
        <h3>A decision workspace for internal and external intelligence.</h3>
        <p>Brings internal business information and external market intelligence together in one place, so performance, opportunity and risk can be read against each other.</p>
        <div class="btnrow"><a class="btn btn--onink" href="#/products/mora-prism">Discover MORA Prism ${ARROW}</a></div>
      </div>
      <div class="spot__card spot__card--trade">
        <span class="ey">Masdar Trade</span>
        <h3>A B2B marketplace for manufacturers and sourcing teams.</h3>
        <p>Improves visibility for manufacturers and makes international sourcing and procurement easier through structured profiles and controlled inquiry workflows.</p>
        <div class="btnrow"><a class="btn btn--onink" href="#/products/masdar-trade">Explore Masdar Trade ${ARROW}</a></div>
      </div>
    </div>`))}

  ${sec('sec--tint', rail('Who we work with', `
    <h2 class="h2--tight">Built around the people making business decisions.</h2>
    <p class="lede lede--wide">We work with organizations and professionals looking to understand opportunities, improve performance, develop products or expand into new markets.</p>
    ${audiences([
      ['Executives','Identify growth opportunities and prioritize what matters.','#/solutions/executives'],
      ['Manufacturers','Improve products, operations and access to international buyers.','#/solutions/manufacturers'],
      ['Product teams','Validate ideas and develop stronger products.','#/advance'],
      ['Procurement &amp; supply chain teams','Find better sourcing opportunities and international suppliers.','#/solutions/procurement'],
      ['Buyers &amp; distributors','Discover qualified products and manufacturers.','#/products/masdar-trade'],
      ['Partners &amp; institutions','Develop sectors, markets and cross-border opportunities.','#/solutions/institutions']
    ])}`))}

  ${sec('sec--ink', rail('<span style="color:var(--aqua)">Why MORA</span>', `
    <h2 class="h2--tight">Better information. Clearer decisions. Practical next steps.</h2>
    <div class="why">
      <div>
        <p class="lede lede--light"><strong class="why__lead">Good decisions start with good information.</strong>
        MORA combines business intelligence, market research, practical expertise and international connections to help businesses move from understanding a challenge to taking action.</p>
        <p class="lede lede--light">We focus on clear evidence, responsible analysis, defined scopes of work and human review — so every recommendation has a clear purpose and a practical next step.</p>
        <ul class="markers">${['Clear evidence','Responsible analysis','Defined scopes of work','Human review','Traceable sources'].map(m=>`<li>${m}</li>`).join('')}</ul>
        <div class="btnrow" style="margin-top:1.8rem"><a class="btn btn--onink-sec" href="#/trust">Trust and governance ${ARROW}</a></div>
      </div>
      <div>
        <span class="ey ey--pale">From understanding to action</span>
        ${stepList([
          {t:'Research',d:'Gather approved internal data and relevant external evidence.'},
          {t:'Analyze',d:'Identify strengths, gaps, risks and opportunity signals.'},
          {t:'Prioritize',d:'Score opportunities by impact, feasibility, urgency and confidence.'},
          {t:'Advance',d:'Develop the product, process, sourcing strategy or market pathway.'},
          {t:'Activate',d:'Support implementation, supplier or buyer engagement and adoption.'},
          {t:'Measure',d:'Track results, assumptions, risks and the next opportunity.'}
        ])}
      </div>
    </div>`))}

  ${sec('sec--panel', rail('Start here', `
    <h2 class="h2--tight">Start with the outcome you need.</h2>
    <div class="grid g3" style="margin-top:2.2rem">
      ${[
        ['Manufacturers','Validate product opportunities, improve operations and become visible to international buyers.','Solutions for manufacturers','#/solutions/manufacturers'],
        ['Procurement teams','Understand supply markets, identify qualified suppliers and build resilient sourcing strategies.','Solutions for procurement','#/solutions/procurement'],
        ['Exporters','Select target markets, prepare the offer and develop routes to qualified demand.','Solutions for exporters','#/solutions/exporters'],
        ['Executives','Connect performance, market signals and initiative value in one strategic view.','Solutions for executives','#/solutions/executives'],
        ['Institutions','Map sector capabilities, strengthen clusters and support export or supplier-development programs.','Solutions for institutions','#/solutions/institutions']
      ].map(r=>`<a class="route" href="${r[3]}"><strong>${r[0]}</strong><p>${r[1]}</p><span>${r[2]} →</span></a>`).join('')}
    </div>`))}

  ${sec('sec--ink sec--talk', `<div class="talk">
    <div>
      <span class="ey ey--pale">Let's talk</span>
      <h2 class="h2--tight">Have a challenge, an opportunity, or a market you want to explore?</h2>
      <p class="lede lede--light" style="margin-top:1.4rem">Tell us what you are trying to understand, improve, develop or expand. We will help you find the right way forward.</p>
      <div class="btnrow" style="margin-top:1.9rem">
        <a class="btn btn--onink" href="#/contact">Book a discovery session ${ARROW}</a>
        <a class="btn btn--onink-sec" href="#/contact">Contact us</a>
      </div>
    </div>
    ${contactCard()}
  </div>`)}
  `;
}
