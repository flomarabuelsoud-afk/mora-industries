/* MORA Industries — contact, legal and 404 pages */

/* ==========================================================
   CONTACT
   Field set, consent handling and confirmation copy follow the spec.
   Marketing consent is a separate, unticked checkbox.
   ========================================================== */
function pageContact(){
  return pageHero({
    crumbs:[['Home','#/'],['Contact']],
    ey:'Contact',
    h:'Tell us what you are trying to understand, improve or expand.',
    lede:'Share the business decision, operational challenge, sourcing need or target market. Our team will review the request and direct it to the relevant MORA capability.'
  }) +
  sec('sec--panel', `<div class="split">
    <div>
      <span class="ey">General inquiry</span>
      <h2 class="h2--tight">Send us the question.</h2>
      <p class="lede" style="margin:1.2rem 0 2rem">There is no obligation and no automatic acceptance. We will tell you plainly if we are not the right partner for what you need.</p>
      <dl class="ccard__list ccard__list--light">
        <div><dt>Email</dt><dd>${ph('Email address')}</dd></div>
        <div><dt>Phone</dt><dd>${ph('Phone number')}</dd></div>
        <div><dt>Location</dt><dd>${ph('Location')}</dd></div>
        <div><dt>Registered office</dt><dd>${ph('Registered address')}</dd></div>
      </dl>
      <div class="social social--light" role="list">
        ${SOCIAL.map(x=>`<a class="social__a" role="listitem" href="#/contact" aria-label="${x[0]}">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${x[1]}"/></svg></a>`).join('')}
      </div>
      <div style="margin-top:2rem">${note('Before you write','Please do not submit confidential technical, commercial or personal information through this form. Sensitive material is exchanged under a confidentiality agreement.',true)}</div>
    </div>
    <div>
      <form class="form" data-form="contact" novalidate>
        <div class="frow">
          <div class="field"><label for="fn">First name</label><input id="fn" name="firstName" required autocomplete="given-name"></div>
          <div class="field"><label for="ln">Last name</label><input id="ln" name="lastName" required autocomplete="family-name"></div>
        </div>
        <div class="field"><label for="em">Business email</label><input id="em" name="email" type="email" required autocomplete="email" placeholder="name@company.com"></div>
        <div class="frow">
          <div class="field"><label for="ph2">Phone <span class="opt">— optional</span></label><input id="ph2" name="phone" type="tel" autocomplete="tel" placeholder="+00 000 000 0000"><span class="hint">Include country code.</span></div>
          <div class="field"><label for="co">Organization</label><input id="co" name="org" required autocomplete="organization"></div>
        </div>
        <div class="frow">
          <div class="field"><label for="jt">Job title</label><input id="jt" name="title" required autocomplete="organization-title"></div>
          <div class="field"><label for="cy">Country / market</label><input id="cy" name="country" required autocomplete="country-name"></div>
        </div>
        <div class="field"><label for="int">I am interested in</label>
          <select id="int" name="interest" required>
            <option value="">Select an option</option>
            ${['MORA Prism','MORA Advance','International Sourcing','Export Development','Masdar Trade','Partnership','Careers','Other'].map(o=>`<option>${o}</option>`).join('')}
          </select></div>
        <div class="field"><label for="ch">Business challenge or objective</label>
          <textarea id="ch" name="challenge" required placeholder="The decision, process or market you are evaluating."></textarea></div>
        <div class="frow">
          <div class="field"><label for="tl">Expected timeline</label>
            <select id="tl" name="timeline"><option value="">Select an option</option>
              ${['Within 1 month','1–3 months','3–6 months','Later than 6 months','Exploring only'].map(o=>`<option>${o}</option>`).join('')}</select></div>
          <div class="field"><label for="pc">Preferred contact method</label>
            <select id="pc" name="preferred"><option value="">Select an option</option>
              ${['Email','Telephone','Video call'].map(o=>`<option>${o}</option>`).join('')}</select></div>
        </div>
        <label class="check"><input type="checkbox" name="privacy" required>
          <span>I have read the <a href="#/legal">Privacy Notice</a> and consent to MORA processing this information to respond to my request. <strong>Required.</strong></span></label>
        <label class="check"><input type="checkbox" name="marketing">
          <span>Optional: I would also like to receive selected MORA market intelligence updates. I can unsubscribe at any time.</span></label>
        <div><button class="btn btn--pri" type="submit">Send your request ${ARROW}</button></div>
        <p class="formnote">Consent version and timestamp are recorded with the submission. Submitting this form does not create an engagement or imply acceptance.</p>
      </form>
      <div id="formok" hidden></div>
    </div></div>`);
}

function pageLegal(){
  return pageHero({
    crumbs:[['Home','#/'],['Legal']],
    ey:'Legal', h:'Legal documents pending review.',
    lede:'Privacy, cookies, website terms, marketplace terms, acceptable use, accessibility and complaints documents are drafted and approved before launch in each jurisdiction. This page is a routing placeholder in the prototype.'
  }) +
  sec('sec--panel', rail('Required documents', `<h2 class="h2--tight">What must be approved before launch.</h2>
    <div style="margin-top:2rem;max-width:70ch">${ticks([
      'Corporate identity and registered office disclosure','Privacy notice and cookie consent by applicable jurisdiction',
      'Website terms and intellectual-property rules','Marketplace terms for buyers, suppliers and visitors',
      'Acceptable-use, prohibited items and moderation policy','Verification methodology and disclaimers',
      'Complaint, dispute, suspension and termination process','Electronic communications and marketing consent',
      'Cross-border data-transfer language where applicable','Transaction, payment, logistics and partner-service role disclosures'])}</div>`));
}

function page404(){
  return pageHero({crumbs:[['Home','#/']], ey:'Not found', h:'That page does not exist.',
    lede:'The link may be out of date, or the page may not be part of this prototype build.',
    ctas:[['Back to home','#/'],['Contact us','#/contact']]});
}
