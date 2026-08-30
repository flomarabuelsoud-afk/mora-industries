/* MORA Industries — insights index and article template */

/* ==========================================================
   INSIGHTS — index with category filtering, plus one fully
   worked article demonstrating the required article template.
   ========================================================== */
const CATEGORIES = ['Market Opportunities','Supply Chain and Procurement','Product and Process Advancement','International Trade','MORA Prism Updates','Masdar Trade Marketplaces','Reports and Briefings','Events and Webinars'];

const POSTS = [
  {slug:'supply-market-visibility', cat:'Supply Chain and Procurement', featured:true,
   t:'Spend visibility is not supply-market visibility',
   sum:'Most organizations that describe themselves as having poor supply-market visibility actually have a spend-data problem, a category-definition problem and a monitoring problem — three different fixes with three different costs.',
   date:'4 August 2026', read:'7 min', author:'MORA Intelligence team'},
  {slug:null, cat:'Market Opportunities', t:'Scoring opportunities when the evidence is uneven',
   sum:'A practical scoring approach for portfolios where some opportunities are supported by measured data and others by informed assumption.',
   date:'28 July 2026', read:'6 min', author:'MORA Intelligence team'},
  {slug:null, cat:'International Trade', t:'What an export readiness assessment should actually test',
   sum:'Readiness is not a document check. It is a set of testable questions about product fit, capacity, compliance and commercial capability.',
   date:'21 July 2026', read:'8 min', author:'MORA International team'},
  {slug:null, cat:'Product and Process Advancement', t:'Automating an undocumented process encodes the exception',
   sum:'Why process mapping is a prerequisite for automation investment rather than a competing priority for the same budget.',
   date:'14 July 2026', read:'5 min', author:'MORA Advance team'},
  {slug:null, cat:'Masdar Trade Marketplaces', t:'Why verification labels must carry a scope and a date',
   sum:'A verification label without a stated scope transfers risk to the buyer while appearing to remove it. Here is the labelling model Masdar Trade uses.',
   date:'7 July 2026', read:'6 min', author:'Masdar Trade team'},
  {slug:null, cat:'MORA Prism Updates', t:'Opportunity Portfolio: from finding to tracked initiative',
   sum:'A walkthrough of how a finding in any Prism module becomes an owned entry in the opportunity register.',
   date:'30 June 2026', read:'4 min', author:'Product team'},
  {slug:null, cat:'Reports and Briefings', t:'Industrial input cost exposure: quarterly briefing',
   sum:'A short briefing on input cost movement and what it changes for product-level margin decisions. Includes methodology and stated limitations.',
   date:'23 June 2026', read:'Report', author:'MORA Intelligence team'},
  {slug:null, cat:'Events and Webinars', t:'Executive roundtable: prioritizing under uneven evidence',
   sum:'A closed session for leadership teams on scoring and sequencing initiatives when evidence confidence varies across the portfolio.',
   date:'Upcoming', read:'Event', author:'MORA Industries'}
];

function postCard(p){
  // Unpublished items are not links: a control that goes nowhere is worse
  // than an honest label.
  const inner = `<span class="post__meta"><b>${esc(p.cat)}</b><span>${esc(p.date)} · ${esc(p.read)}</span></span>
    <h3>${esc(p.t)}</h3><p>${esc(p.sum)}</p>
    <span class="pillar__go" style="margin-top:.4rem">${p.slug?`Read the insight ${ARROW}`:'<span style="color:var(--muted-light)">Publishing soon</span>'}</span>`;
  return p.slug
    ? `<a class="post" href="#/insights/${p.slug}" data-cat="${esc(p.cat)}">${inner}</a>`
    : `<div class="post" data-cat="${esc(p.cat)}">${inner}</div>`;
}

function pageInsights(){
  return pageHero({
    crumbs:[['Home','#/'],['Insights']],
    ey:'Insights',
    h:'Intelligence for the decisions that come next.',
    lede:'Concise analysis on markets, supply chains, products, processes and international trade. Every insight shows its publication date, author, source notes and stated limitations.',
    ctas:[['Subscribe to MORA Intelligence','#/insights']]
  }) +
  sec('sec--panel', `
    <h2 class="h2--tight" style="margin-bottom:1.8rem">Latest insights.</h2>
    <div class="filters" role="group" aria-label="Filter insights by category">
      <button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>
      ${CATEGORIES.map(c=>`<button class="chip" type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}
    </div>
    <div class="grid g3" id="postgrid">${POSTS.map(postCard).join('')}</div>
    <div id="postempty" hidden>${note('No insights in this category yet','We publish only when the analysis is ready and its sources are checked. Choose another category, or subscribe below to be notified when this one is published.',true)}</div>
    <p class="tag" id="postcount" role="status" style="margin-top:1.6rem">Showing all ${POSTS.length} insights</p>`) +
  sec('sec--ink', `<div class="split" style="align-items:center">
    <div><span class="ey ey--pale">Newsletter</span><h2 class="h2--tight">Receive the signals worth acting on.</h2></div>
    <div>
      <p class="lede lede--light">Subscribe for selected market, supply chain and international trade intelligence from MORA Industries. Choose the topics relevant to your role. You can update preferences or unsubscribe at any time.</p>
      <form class="form" style="margin-top:1.6rem;max-width:520px" data-form="newsletter">
        <div class="field">
          <label for="nl-email">Business email</label>
          <input id="nl-email" name="email" type="email" required autocomplete="email" placeholder="name@company.com">
        </div>
        <label class="check">
          <input type="checkbox" name="consent" required>
          <span>I agree to receive selected MORA updates and understand that I can unsubscribe at any time. See the <a href="#/legal">Privacy Notice</a>.</span>
        </label>
        <div><button class="btn btn--onink" type="submit">Subscribe to MORA Intelligence ${ARROW}</button></div>
      </form>
    </div></div>`);
}

/* ---------- Article template ----------
   Demonstrates every element the spec requires of an insight:
   summary, dates, evidence with source notes, business implications,
   methodology and limitations, author, reviewer and tags. */
function pageArticle(){
  return `<div class="phero"><div class="phero__in">
      <nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><a href="#/insights">Insights</a><span>/</span>Supply Chain and Procurement</nav>
      <span class="ey ey--pale">Supply Chain and Procurement</span>
      <h1 style="max-width:22ch">Spend visibility is not supply-market visibility</h1>
      <p class="lede">Most organizations that describe themselves as having poor supply-market visibility actually have three separate problems. Treating them as one is why the fix keeps failing.</p>
      <p class="crumb" style="margin:1.6rem 0 0">Published 4 August 2026 <span>·</span> Updated 4 August 2026 <span>·</span> 7 min read <span>·</span> MORA Intelligence team</p>
    </div></div>
    ${sec('sec--panel', `<div class="article__grid">
      <article class="prose">
        <p><strong>Summary.</strong> "We have no visibility" is one complaint describing three conditions: spend data that cannot be trusted, category definitions that do not match how supply markets behave, and no monitoring of the external conditions that move price and availability. Each has a different cost and a different owner. Organizations that buy a single tool for all three usually solve the first and leave the other two intact.</p>

        <h2>The three conditions, separated</h2>
        <p>The first condition is internal. Spend sits across entities, systems and vendor records that were never reconciled, so the same supplier appears several times and the same item is classified inconsistently. This is a data problem with a known fix and a measurable end state.</p>
        <p>The second condition is structural. Categories are usually inherited from accounting or from organizational history rather than from how supply markets actually behave. When a category groups items whose prices move for unrelated reasons, category-level analysis cannot produce a usable signal — the movements cancel each other out.<sup>1</sup></p>
        <p>The third condition is external and continuous. Supply markets, commodity indices, logistics capacity and country conditions move whether or not anyone is watching. Without a monitoring model, they are read reactively, after a price change or a missed delivery has already happened.</p>

        <h2>Why the single-tool approach stalls</h2>
        <p>A spend analytics implementation resolves the first condition well. It does not redraw category definitions, because that requires a judgement about supply-market behaviour rather than a data transformation. And it does not monitor external conditions unless external sources are licensed, mapped to the category structure and refreshed on a defined cycle.</p>
        <p>The result is a familiar pattern: a clean spend baseline, delivered on time, that still cannot answer why a category's cost moved.</p>

        <h3>What to sequence instead</h3>
        <ul>
          <li>Establish the spend baseline first, and publish it with a data-quality score rather than as an exact figure.</li>
          <li>Redraw categories around supply-market behaviour for the few categories that carry material value, not for the whole taxonomy at once.</li>
          <li>Attach external monitoring only to those redrawn categories, with a stated refresh frequency and source licence.</li>
          <li>Set the review cadence before the first dashboard is built, so monitoring has an owner from the start.</li>
        </ul>

        <h2>Business implications</h2>
        <p>Sequencing this way makes the cost visible early. Redrawing categories is analytical work with a defined scope; licensing external sources is a recurring cost that should be justified per category rather than bought as a bundle. Organizations that assess both before committing to a platform tend to license fewer sources and use them harder.</p>
        <p>It also changes who owns the outcome. A spend baseline can be owned by a data team. Category redefinition cannot — it requires category managers to accept a structure they did not inherit, which is a change-management task rather than a technical one.</p>

        <h2>Methodology and limitations</h2>
        <p>This analysis draws on structured interviews conducted by MORA during diagnostic engagements and on published supply-chain research. The interview base is small and self-selecting: organizations that commission a sourcing diagnostic are, by definition, ones that already suspect a visibility problem. The pattern described here should be read as a working hypothesis for how to sequence work, not as a measured distribution across the wider market.</p>
        <p>No customer data was used in preparing this article. Figures cited from external sources are attributed with source and retrieval date, and no estimate has been presented as an observation.</p>
      </article>

      <aside class="aside">
        <div><h3>Sources</h3><ol>
          <li>${ph('Source name')} — ${ph('Publication')}, ${ph('Date')}. Retrieved ${ph('Date')}.</li>
          <li>${ph('Source name')} — ${ph('Publication')}, ${ph('Date')}. Retrieved ${ph('Date')}.</li>
        </ol></div>
        <div><h3>Evidence status</h3><p>Working hypothesis based on qualitative interviews. Not a measured market distribution. No customer data used.</p></div>
        <div><h3>Author</h3><p>MORA Intelligence team</p></div>
        <div><h3>Reviewed by</h3><p>${ph('Reviewer name and role')}</p></div>
        <div><h3>Topics</h3><p>Procurement · Spend analytics · Supply-market intelligence · Category management</p></div>
        <div><h3>Related</h3><p><a href="#/solutions/procurement" style="color:var(--teal)">Solutions for procurement teams ${ARROW}</a></p></div>
      </aside>
    </div>`)}
    ${cta('Test this against your own categories.',
      'A sourcing diagnostic establishes the spend baseline, identifies which categories justify redefinition and states what external monitoring would cost.',
      ['Request a sourcing diagnostic','#/contact'],['Back to insights','#/insights'])}`;
}
