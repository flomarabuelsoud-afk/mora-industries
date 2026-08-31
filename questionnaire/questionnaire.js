/* ============================================================
   MORA Industries — Client Questionnaire (CQ-FEP-01)
   Factory Establishment Project, Egypt.

   Content model, renderer and form logic. Bilingual: every string
   carries an `ar` and an `en`, and the language switch re-labels the
   page in place without touching the values already entered.

   Built from the source workbook. Section and question numbering
   follows the sheet exactly so the two can be reconciled.
   ============================================================ */
'use strict';

/* ---------- Answer types ----------
   text | area | date | month | num | pct | money | email | tel
   yn (yes/no) | ynp (yes/no/partial) | select | multi
   `mirror` binds a question to a Section 5 financial row, so a figure
   is typed once and appears in both places.                        */

const YN  = [{v:'yes', ar:'نعم', en:'Yes'}, {v:'no', ar:'لا', en:'No'}];
const YNP = YN.concat([{v:'partial', ar:'جزئيًا', en:'Partial'}]);

const FORM = {
  ref:'CQ-FEP-01',
  title:{ ar:'استبيان العميل – مشروع إنشاء مصنع في جمهورية مصر العربية',
          en:'Client Questionnaire – Factory Establishment Project (Egypt)' },
  sub:{ ar:'المتطلبات الأولية وجمع بيانات العميل · جميع القيم المالية بالدولار الأمريكي · يُحتسب المكافئ بالجنيه وفق سعر الصرف المُدخل',
        en:'Prerequisites & client data collection · All financial values in USD · EGP equivalent calculated at the stated exchange rate' },
  confidential:{ ar:'سري — البيانات المُدخلة تُستخدم حصريًا لأغراض دراسة الجدوى وتحليل السوق والاستثمار.',
                 en:'Confidential — the information entered is used solely for feasibility, market and investment analysis.' },

  /* ---------- 1. Document & project information ---------- */
  doc:{
    n:'1', ar:'بيانات المستند والمشروع', en:'Document & Project Information',
    fields:[
      {id:'clientName', ar:'اسم العميل / الشركة', en:'Client / Company Name', type:'text', req:true},
      {id:'formDate',   ar:'تاريخ الاستبيان',      en:'Questionnaire Date',    type:'date', req:true},
      {id:'projectTitle',ar:'اسم المشروع',         en:'Project Title',         type:'text', req:true},
      {id:'preparedBy', ar:'إعداد',                en:'Prepared By',           type:'text'},
      {id:'sector',     ar:'القطاع / النشاط',      en:'Sector / Industry',     type:'text', req:true},
      {id:'version',    ar:'رقم الإصدار',          en:'Document Version',      type:'text', ph:{ar:'مثال: 1.0', en:'e.g. 1.0'}},
      {id:'location',   ar:'الموقع المقترح',       en:'Proposed Location',     type:'text'},
      {id:'contactName',ar:'مسؤول التواصل',        en:'Main Contact Person',   type:'text', req:true},
      {id:'contactEmail',ar:'البريد الإلكتروني',   en:'Contact Email',         type:'email', req:true,
        hint:{ar:'سنرسل نسخة من إجاباتكم إلى هذا البريد.', en:'A copy of your answers will be sent to this address.'}},
      {id:'contactPhone',ar:'رقم الهاتف',          en:'Contact Phone',         type:'tel',
        ph:{ar:'‎+20 000 000 0000', en:'+20 000 000 0000'}}
    ]
  },

  /* ---------- 2. How to complete ---------- */
  how:{
    n:'2', ar:'إرشادات استيفاء النموذج', en:'How to Complete This Form',
    rows:[
      {k:{ar:'الغرض', en:'Purpose'},
       v:{ar:'جمع الحد الأدنى من بيانات العميل اللازمة لدراسة الجدوى وتحليل السوق والإنتاج وسلسلة التوريد والاستثمار.',
          en:'Collect the minimum client data required for factory feasibility, market, production, supply-chain and investment analysis.'}},
      {k:{ar:'طريقة الاستيفاء', en:'How to complete'},
       v:{ar:'يرجى استيفاء الحقول المتاحة للإدخال. وتُدرج جميع القيم المالية في القسم الخامس، وتظهر تلقائيًا أمام الأسئلة المرتبطة بها.',
          en:'Fill the available input fields. Enter all monetary values in Section 5 — they appear automatically against the related questions.'}},
      {k:{ar:'معيار العملة', en:'Currency standard'},
       v:{ar:'تُدرج المبالغ المالية بالدولار الأمريكي، ويُحتسب المكافئ بالجنيه المصري تلقائيًا وفق سعر الصرف المُدخل.',
          en:'Enter financial amounts in USD. The EGP equivalent is calculated automatically from the USD/EGP exchange rate entered in Section 3.'}},
      {k:{ar:'سعر الصرف', en:'Exchange rate'},
       v:{ar:'يرجى إدخال سعر صرف الدولار/الجنيه المستخدم فعليًا في تحليل المشروع مع بيان المصدر ونوع السعر.',
          en:'Enter the USD/EGP exchange rate actually used for the project analysis and record the source and rate type.'}},
      {k:{ar:'المستندات الداعمة', en:'Supporting documents'},
       v:{ar:'يرجى إرفاق خطط العمل وبيانات الإنتاج وقوائم الماكينات والتركيبات والمستندات الفنية ودراسات السوق المتاحة.',
          en:'Attach existing business plans, production data, machinery lists, formulations, technical documents and market studies where available.'}},
      {k:{ar:'الحد الأدنى من البيانات', en:'Required minimum data'},
       v:{ar:'الميزانية الاستثمارية؛ السوق المستهدف؛ فئات المنتجات الأولية؛ الطاقة الحالية والمستهدفة؛ Greenfield أو نقل أصول؛ شريحة العملاء؛ هيكل التمويل؛ تاريخ بدء الإنتاج؛ التركيبات والمعرفة الفنية.',
          en:'Investment budget; target market; initial product categories; current and target capacity; Greenfield / asset transfer; customer segment; financing structure; production start date; formulations and technical know-how.'}},
      {k:{ar:'الحفظ والاستكمال', en:'Saving and resuming'},
       v:{ar:'تُحفظ إجاباتكم تلقائيًا في هذا المتصفح أثناء الكتابة، ويمكنكم إغلاق الصفحة والعودة لاستكمالها لاحقًا على الجهاز نفسه.',
          en:'Your answers are saved automatically in this browser as you type. You can close the page and return later on the same device to finish.'}}
    ]
  },

  /* ---------- 3. Currency & exchange rate ---------- */
  fx:{
    n:'3', ar:'أساس العملة وسعر الصرف', en:'Currency & Exchange Rate Basis',
    note:{ar:'تُحوَّل جميع المبالغ بالدولار في القسم الخامس إلى الجنيه المصري وفق سعر الصرف المدخل هنا.',
          en:'All USD amounts in Section 5 are converted to EGP using the exchange rate entered here.'},
    fields:[
      {id:'fxRate', ar:'سعر صرف الدولار مقابل الجنيه', en:'USD / EGP Exchange Rate', type:'num', step:'0.0001', req:true,
       ph:{ar:'مثال: 48.5000', en:'e.g. 48.5000'}},
      {id:'fxSource', ar:'مصدر السعر', en:'Rate Source', type:'text',
       ph:{ar:'البنك المركزي / بنك تجاري / السوق', en:'Central bank / commercial bank / market'}},
      {id:'fxType', ar:'نوع السعر', en:'Rate Type', type:'select', opts:[
        {v:'official', ar:'رسمي', en:'Official'},
        {v:'bank',     ar:'بنكي', en:'Bank'},
        {v:'market',   ar:'سوق',  en:'Market'}
      ]},
      {id:'fxDate', ar:'تاريخ السعر', en:'Rate Date', type:'date'}
    ]
  },

  /* ---------- 4. The questionnaire ---------- */
  groups:[
    {id:'A', ar:'نطاق الاستثمار والأعمال', en:'Investment & Business Scope', q:[
      {id:'A1', ar:'ما هي الميزانية الاستثمارية التقريبية المتاحة للمشروع؟',
              en:'What is the approximate investment budget available for the project?',
              type:'money', mirror:'M1',
              g:{ar:'تُدخل القيمة بالدولار الأمريكي (تظهر في القسم 5 – البند M1).', en:'Enter the value in USD (appears in Section 5 – item M1).'}},
      {id:'A2', ar:'ما هو النطاق الجغرافي المستهدف للمشروع؟', en:'What is the intended market scope of the project?',
              type:'select', opts:[
                {v:'local',  ar:'السوق المحلي',  en:'Local market'},
                {v:'export', ar:'التصدير',        en:'Export'},
                {v:'both',   ar:'كلاهما',         en:'Both'}]},
      {id:'A3', ar:'ما هو الهدف الرئيسي من إنشاء المصنع في مصر؟', en:'What is the main objective of establishing the factory in Egypt?', type:'area'},
      {id:'A4', ar:'ما هو الإطار الزمني المستهدف لبدء الإنتاج؟', en:'What is the target timeline for starting commercial production?', type:'text',
              g:{ar:'شهر / سنة.', en:'Month / year.'}}
    ]},

    {id:'B', ar:'العمليات الحالية ونقل الأصول', en:'Existing Operations & Asset Transfer', q:[
      {id:'B1', ar:'هل سيتم نقل أي ماكينات أو خطوط إنتاج من مصنع السودان إلى مصر؟',
              en:'Will any machinery or production lines be transferred from the Sudan factory to Egypt?', type:'yn'},
      {id:'B2', ar:'إذا كانت الإجابة نعم، ما هي المعدات أو خطوط الإنتاج التي سيتم نقلها؟',
              en:'If yes, which machinery or production lines will be transferred?', type:'area', showIf:{q:'B1', is:'yes'},
              g:{ar:'يرجى إرفاق قائمة الماكينات إن وُجدت.', en:'Attach machinery list if available.'}},
      {id:'B3', ar:'هل سيكون المشروع الجديد Greenfield بالكامل؟', en:'Will the new project be a fully Greenfield investment?', type:'ynp'},
      {id:'B4', ar:'ما هي الطاقة الإنتاجية الحالية لمصنع السودان؟', en:'What is the current production capacity of the Sudan factory?', type:'area',
              g:{ar:'يرجى تحديد الطن/السنة، وبحسب المنتج إن أمكن.', en:'Specify tons/year and by product if possible.'}},
      {id:'B5', ar:'ما هي الطاقة الإنتاجية المستهدفة للمصنع الجديد في مصر؟', en:'What is the target production capacity of the new factory in Egypt?', type:'area',
              g:{ar:'يرجى تحديد الطن/السنة وبحسب المنتج.', en:'Specify tons/year and by product.'}}
    ]},

    {id:'C', ar:'المنتجات ومحفظة المنتجات', en:'Products & Product Portfolio', q:[
      {id:'C1', ar:'ما هي فئات المنتجات التي ترغبون في البدء بها؟', en:'Which product categories would you like to start with?',
              type:'multi', opts:[
                {v:'powder',   ar:'منظفات بودرة',       en:'Powder detergents'},
                {v:'liquid',   ar:'منظفات سائلة',       en:'Liquid detergents'},
                {v:'dish',     ar:'منظفات أطباق',        en:'Dishwashing'},
                {v:'surface',  ar:'منظفات أسطح',         en:'Surface cleaners'},
                {v:'personal', ar:'العناية الشخصية',     en:'Personal care'},
                {v:'other',    ar:'أخرى',                en:'Other'}], other:true},
      {id:'C2', ar:'ما هي المنتجات التي يتميز بها المصنع الحالي؟', en:'Which products are you currently strongest in?', type:'area'},
      {id:'C3', ar:'هل تخططون لإنتاج نفس المنتجات الحالية في مصر؟', en:'Do you plan to manufacture the same existing products in Egypt?', type:'yn'},
      {id:'C4', ar:'هل تخططون لإضافة منتجات جديدة للسوق المصري؟', en:'Do you plan to introduce new products specifically for the Egyptian market?', type:'yn'}
    ]},

    {id:'D', ar:'السوق والتموضع لدى العملاء', en:'Market & Customer Positioning', q:[
      {id:'D1', ar:'من هو العميل المستهدف في السوق المصري؟', en:'Who is your target customer segment in the Egyptian market?',
              type:'select', opts:[
                {v:'economy', ar:'اقتصادي',      en:'Economy'},
                {v:'mass',    ar:'السوق العام',   en:'Mass market'},
                {v:'middle',  ar:'الشريحة المتوسطة', en:'Middle'},
                {v:'premium', ar:'المتميز',       en:'Premium'},
                {v:'mixed',   ar:'مختلط',         en:'Mixed'}]},
      {id:'D2', ar:'ما هو مستوى السعر المستهدف للمنتجات؟', en:'What is the intended price positioning of the products?', type:'area'},
      {id:'D3', ar:'من هم المنافسون الرئيسيون الذين تستهدفون منافستهم؟', en:'Who are the main competitors you intend to compete with?', type:'area'},
      {id:'D4', ar:'ما هي الحصة السوقية المستهدفة؟', en:'What market share are you targeting?', type:'pct',
              g:{ar:'إن كانت معروفة (%).', en:'If known (%).'}}
    ]},

    {id:'E', ar:'هيكل الاستثمار والتمويل', en:'Investment Structure & Financing', q:[
      {id:'E1', ar:'هل سيكون الاستثمار بتمويل ذاتي بالكامل؟', en:'Will the investment be fully self-funded?', type:'yn'},
      {id:'E2', ar:'هل سيتم الاعتماد على تسهيلات ائتمانية أو قروض بنكية؟', en:'Will bank loans or credit facilities be used to finance the project?', type:'yn'},
      {id:'E3', ar:'ما قيمة التمويل الخارجي المتوقع؟', en:'What is the expected external financing amount?', type:'money', mirror:'M2',
              g:{ar:'يظهر في القسم 5 – البند M2.', en:'Appears in Section 5 – item M2.'}},
      {id:'E4', ar:'ما هي الميزانية التقديرية للمعدات والآلات؟', en:'What is the estimated budget for machinery and equipment?', type:'money', mirror:'F1',
              g:{ar:'يظهر في القسم 5 – البند 1.', en:'Appears in Section 5 – item 1.'}},
      {id:'E5', ar:'ما هي الميزانية التقديرية للمباني والتجهيزات؟', en:'What is the estimated budget for buildings and infrastructure?', type:'money', mirror:'F2',
              g:{ar:'يظهر في القسم 5 – البند 2.', en:'Appears in Section 5 – item 2.'}},
      {id:'E6', ar:'ما هي الميزانية التقديرية لرأس المال العامل؟', en:'What is the estimated working capital requirement?', type:'money', mirror:'F4',
              g:{ar:'يظهر في القسم 5 – البند 4.', en:'Appears in Section 5 – item 4.'}}
    ]},

    {id:'F', ar:'المعرفة الفنية والتركيبات', en:'Technical Know-how & Formulations', q:[
      {id:'F1', ar:'هل تمتلكون تركيبات كيميائية جاهزة للمنتجات؟', en:'Do you already have established chemical formulations for your products?', type:'yn'},
      {id:'F2', ar:'هل سيتم تطبيق نفس التركيبات المستخدمة في السودان في مصر؟', en:'Will the same formulations currently used in Sudan be applied in Egypt?', type:'yn'},
      {id:'F3', ar:'هل تحتاجون إلى تطوير تركيبات جديدة للسوق المصري؟', en:'Do you require new formulations specifically developed for the Egyptian market?', type:'yn'},
      {id:'F4', ar:'هل تم اختبار توافق التركيبات مع المواد الخام المحلية؟', en:'Have the formulations been tested for compatibility with locally available raw materials?', type:'yn'},
      {id:'F5', ar:'هل توجد معرفة فنية أو حقوق ملكية فكرية يجب نقلها للمصنع الجديد؟', en:'Is there any technical know-how or intellectual property that needs to be transferred to the new factory?', type:'area',
              g:{ar:'لا تُدرج تفاصيل التركيبات هنا؛ تُتبادل تحت اتفاقية سرية.', en:'Do not enter formulation detail here; it is exchanged under a confidentiality agreement.'}}
    ]},

    {id:'G', ar:'المواد الخام وسلسلة التوريد', en:'Raw Materials & Supply Chain', q:[
      {id:'G1', ar:'هل تخططون للاعتماد على مواد خام محلية أم مستوردة؟', en:'Do you plan to use locally sourced or imported raw materials?',
              type:'select', opts:[
                {v:'local',    ar:'محلية',   en:'Local'},
                {v:'imported', ar:'مستوردة', en:'Imported'},
                {v:'mixed',    ar:'مختلطة',  en:'Mixed'}]},
      {id:'G1b', ar:'إذا كانت مختلطة، ما نسبة المواد المحلية؟', en:'If mixed, what percentage is locally sourced?', type:'pct', showIf:{q:'G1', is:'mixed'}},
      {id:'G2', ar:'ما هي المواد الخام الرئيسية المطلوبة؟', en:'What are the main raw materials required for production?', type:'area',
              g:{ar:'يرجى إرفاق القائمة إن وُجدت.', en:'Attach list if available.'}},
      {id:'G3', ar:'هل لديكم موردون حاليون سيتم نقل التعامل معهم إلى مصر؟', en:'Do you have existing suppliers that you intend to continue working with in Egypt?', type:'area'},
      {id:'G4', ar:'هل توجد مواد خام حساسة من ناحية التوفر أو الأسعار؟', en:'Are there any critical raw materials with significant availability or price risks?', type:'area'}
    ]},

    {id:'H', ar:'متطلبات المصنع والموقع', en:'Factory & Location Requirements', q:[
      {id:'H1', ar:'هل تم تحديد موقع المصنع في مصر؟', en:'Has a factory location in Egypt already been identified?', type:'yn'},
      {id:'H2', ar:'إذا كان الموقع محدداً، فما هي المنطقة؟', en:'If yes, where is the proposed location?', type:'text', showIf:{q:'H1', is:'yes'}},
      {id:'H3', ar:'ما هي المساحة المطلوبة تقريباً للمصنع؟', en:'What is the approximate required factory area?', type:'num', unit:{ar:'م²', en:'m²'}},
      {id:'H4', ar:'هل توجد متطلبات خاصة للمرافق؟', en:'Are there any specific utility requirements?',
              type:'multi', opts:[
                {v:'power',      ar:'كهرباء',        en:'Electricity'},
                {v:'water',      ar:'مياه',           en:'Water'},
                {v:'gas',        ar:'غاز',            en:'Gas'},
                {v:'steam',      ar:'بخار',           en:'Steam'},
                {v:'wastewater', ar:'صرف صناعي',      en:'Wastewater'},
                {v:'other',      ar:'أخرى',           en:'Other'}], other:true}
    ]},

    {id:'I', ar:'الإنتاج والجودة', en:'Production & Quality', q:[
      {id:'I1', ar:'هل سيتم تشغيل المصنع بنفس معايير الجودة الحالية؟', en:'Will the new factory operate under the same quality standards as the existing factory?', type:'yn'},
      {id:'I2', ar:'هل توجد شهادات جودة مطلوبة؟', en:'Are there specific quality certifications required?',
              type:'multi', opts:[
                {v:'iso9001', ar:'ISO 9001', en:'ISO 9001'},
                {v:'iso14001',ar:'ISO 14001',en:'ISO 14001'},
                {v:'gmp',     ar:'GMP',      en:'GMP'},
                {v:'halal',   ar:'حلال',     en:'Halal'},
                {v:'other',   ar:'أخرى',     en:'Other'}], other:true},
      {id:'I3', ar:'ما هي الطاقة التشغيلية المستهدفة في المرحلة الأولى؟', en:'What is the targeted operating capacity during Phase 1?', type:'pct',
              g:{ar:'كنسبة من إجمالي الطاقة (%).', en:'% of total capacity.'}},
      {id:'I4', ar:'هل هناك خطة للتوسع المستقبلي؟', en:'Is there a plan for future production expansion?', type:'yn'},
      {id:'I4b',ar:'إذا نعم، ما هي الطاقة المتوقعة بعد التوسع؟', en:'If yes, what is the expected capacity after expansion?', type:'text', showIf:{q:'I4', is:'yes'}}
    ]},

    {id:'J', ar:'المبيعات والتوزيع والتصدير', en:'Sales, Distribution & Export', q:[
      {id:'J1', ar:'كيف سيتم توزيع المنتجات في السوق المصري؟', en:'How will the products be distributed in the Egyptian market?',
              type:'multi', opts:[
                {v:'distributors', ar:'موزعون',          en:'Distributors'},
                {v:'direct',       ar:'بيع مباشر',        en:'Direct sales'},
                {v:'retail',       ar:'تجزئة تقليدية',    en:'Traditional retail'},
                {v:'modern',       ar:'التجارة الحديثة',  en:'Modern trade'},
                {v:'ecom',         ar:'التجارة الإلكترونية', en:'E-commerce'}]},
      {id:'J2', ar:'هل توجد شبكة توزيع قائمة بالفعل؟', en:'Do you already have an established distribution network?', type:'yn'},
      {id:'J3', ar:'هل التصدير جزء أساسي من استراتيجية المشروع؟', en:"Is export a key part of the project's strategy?", type:'yn'},
      {id:'J3b',ar:'إذا نعم، ما النسبة المستهدفة من المبيعات؟', en:'If yes, what target share of sales?', type:'pct', showIf:{q:'J3', is:'yes'}},
      {id:'J4', ar:'ما هي الدول المستهدفة للتصدير؟', en:'Which countries are targeted for export?', type:'area'}
    ]},

    {id:'K', ar:'تنفيذ المشروع', en:'Project Implementation', q:[
      {id:'K1', ar:'متى ترغبون في بدء أعمال التصميم والتأسيس؟', en:'When would you like to start the design and project implementation activities?', type:'month'},
      {id:'K2', ar:'متى يجب أن يبدأ الإنتاج التجاري؟', en:'By when should commercial production start?', type:'month'},
      {id:'K3', ar:'هل توجد أي مواعيد نهائية مرتبطة بالسوق أو التمويل؟', en:'Are there any market, financing, or business deadlines that must be met?', type:'area'},
      {id:'K4', ar:'من سيكون صاحب القرار الرئيسي في المشروع؟', en:'Who will be the main decision-maker for the project?', type:'text',
              g:{ar:'الاسم / المسمى الوظيفي.', en:'Name / position.'}}
    ]},

    {id:'L', ar:'معلومات إضافية', en:'Additional Information', q:[
      {id:'L1', ar:'هل توجد أي متطلبات أو افتراضات أخرى يجب أخذها في الاعتبار؟', en:'Are there any additional requirements, assumptions, or constraints that should be considered?', type:'area'},
      {id:'L2', ar:'هل يمكن مشاركة أي دراسات أو بيانات سابقة للمشروع؟', en:'Can you provide any existing studies, business plans, production data, or technical documents?', type:'area',
              g:{ar:'يرجى ذكرها هنا وإرفاقها بالبريد الإلكتروني.', en:'List them here and attach them by email.'}}
    ]}
  ],

  /* ---------- 5. Financial summary ---------- */
  fin:{
    n:'5', ar:'الملخص المالي بالدولار والجنيه', en:'Financial Summary – USD / EGP',
    lines:[
      {id:'F1', n:'1', ar:'الآلات والمعدات',            en:'Machinery & Equipment'},
      {id:'F2', n:'2', ar:'الأعمال المدنية والمباني',   en:'Civil Works / Factory Buildings'},
      {id:'F3', n:'3', ar:'المرافق والبنية التحتية',    en:'Utilities & Infrastructure'},
      {id:'F4', n:'4', ar:'رأس المال العامل',           en:'Working Capital'},
      {id:'F5', n:'5', ar:'استثمارات أخرى',             en:'Other Investment'}
    ],
    memo:[
      {id:'M1', n:'M1', ar:'إجمالي الميزانية الاستثمارية (حسب العميل)', en:'Total Investment Budget (as stated by client)'},
      {id:'M2', n:'M2', ar:'التمويل الخارجي (قروض / تسهيلات)',          en:'External Financing (loans / credit facilities)'}
    ],
    totalLabel:{ar:'إجمالي استثمار المشروع (محتسب)', en:'Total Project Investment (calculated)'},
    selfLabel:{ar:'التمويل الذاتي (محتسب)', en:'Self-Funded Amount (calculated: M1 − M2)'},
    varLabel:{ar:'الفرق بين الميزانية المعلنة والإجمالي المحتسب', en:'Variance (stated budget − calculated total)'},
    cols:{
      item:{ar:'البند المالي', en:'Financial Item'},
      usd:{ar:'المبلغ بالدولار', en:'Amount (USD)'},
      egp:{ar:'المكافئ بالجنيه', en:'Equivalent (EGP)'},
      notes:{ar:'ملاحظات', en:'Notes'}
    }
  },

  /* ---------- 6. Supporting documents ---------- */
  docs:{
    n:'6', ar:'قائمة المستندات الداعمة', en:'Supporting Documents Checklist',
    cols:{
      doc:{ar:'المستند', en:'Document'},
      avail:{ar:'متاح؟', en:'Available?'},
      ver:{ar:'التاريخ / الإصدار', en:'Date / Version'},
      notes:{ar:'اسم الملف / ملاحظات', en:'File name / notes'}
    },
    rows:[
      {id:'D1', n:'1', ar:'خطة العمل',                  en:'Business plan',              g:{ar:'أحدث نسخة معتمدة.', en:'Latest approved version.'}},
      {id:'D2', n:'2', ar:'بيانات الإنتاج التاريخية',   en:'Historical production data', g:{ar:'آخر 2–3 سنوات، بحسب المنتج.', en:'Last 2–3 years, by product.'}},
      {id:'D3', n:'3', ar:'قائمة الآلات والمعدات',      en:'Machinery & equipment list', g:{ar:'تشمل الطاقة والعمر وبلد المنشأ.', en:'Include capacity, age, origin.'}},
      {id:'D4', n:'4', ar:'تركيبات المنتجات',           en:'Product formulations',       g:{ar:'سري — تُتبادل تحت اتفاقية سرية.', en:'Confidential – under NDA.'}},
      {id:'D5', n:'5', ar:'المستندات والرسومات الفنية', en:'Technical documents & drawings', g:{ar:'المخططات والمرافق ومسار العمليات.', en:'Layouts, utilities, process flow.'}},
      {id:'D6', n:'6', ar:'دراسات السوق',               en:'Market studies',             g:{ar:'دراسات مصر أو الإقليم.', en:'Egypt / regional studies.'}}
    ]
  },

  /* ---------- 7. Confirmation & sign-off ---------- */
  signoff:{
    n:'7', ar:'الإقرار والاعتماد', en:'Confirmation & Sign-off',
    text:{ar:'يقر الموقع أدناه بصحة البيانات الواردة أعلاه على حد علمه، وبإمكانية اعتمادها أساسًا لدراسة الجدوى وتحليل السوق والاستثمار.',
          en:'The undersigned confirms that the information provided above is accurate to the best of their knowledge and may be used as the basis for the feasibility, market and investment analysis.'},
    client:{ar:'ممثل العميل', en:'Client Representative'},
    consultant:{ar:'المستشار', en:'Consultant'},
    fields:[
      {id:'Name',     ar:'الاسم',            en:'Name'},
      {id:'Position', ar:'المسمى الوظيفي',   en:'Position'},
      {id:'Date',     ar:'التاريخ',          en:'Date', type:'date'}
    ],
    sigLine:{ar:'التوقيع', en:'Signature'},
    confirm:{ar:'أقر بصحة البيانات المُدخلة وأوافق على استخدامها لأغراض التحليل الموضحة أعلاه.',
             en:'I confirm the information entered is accurate and consent to its use for the analysis described above.'}
  }
};

/* ============================================================
   UI strings
   ============================================================ */
const T = {
  brandLine:{ar:'مورا إندستريز · أبحاث فرص السوق والتطوير', en:'MORA Industries · Market Opportunities Research & Advancement'},
  ref:{ar:'رقم المستند', en:'Document ref'},
  progress:{ar:'نسبة استيفاء النموذج', en:'Form completion'},
  saved:{ar:'تم الحفظ تلقائيًا', en:'Saved automatically'},
  saving:{ar:'جارٍ الحفظ…', en:'Saving…'},
  notSaved:{ar:'الحفظ التلقائي غير متاح في هذا المتصفح', en:'Autosave unavailable in this browser'},
  contents:{ar:'المحتويات', en:'Contents'},
  required:{ar:'مطلوب', en:'Required'},
  optional:{ar:'اختياري', en:'optional'},
  choose:{ar:'اختر…', en:'Select…'},
  otherSpecify:{ar:'حدد…', en:'Specify…'},
  notes:{ar:'ملاحظات', en:'Notes'},
  addNote:{ar:'إضافة ملاحظة', en:'Add a note'},
  submit:{ar:'إرسال الاستبيان', en:'Submit questionnaire'},
  sending:{ar:'جارٍ الإرسال…', en:'Sending…'},
  print:{ar:'طباعة / PDF', en:'Print / PDF'},
  saveCopy:{ar:'حفظ نسخة', en:'Save a copy'},
  loadCopy:{ar:'استعادة نسخة', en:'Restore a copy'},
  clear:{ar:'مسح الكل', en:'Clear all'},
  clearAsk:{ar:'سيتم مسح جميع الإجابات المحفوظة في هذا المتصفح. هل تريد المتابعة؟',
            en:'This will erase every answer saved in this browser. Continue?'},
  errTitle:{ar:'يرجى استكمال الحقول المطلوبة', en:'Please complete the required fields'},
  errBody:{ar:'الحقول التالية مطلوبة قبل الإرسال:', en:'The following fields are required before submitting:'},
  errConsent:{ar:'يرجى الإقرار بصحة البيانات قبل الإرسال.', en:'Please confirm the information before submitting.'},
  okTitle:{ar:'تم استلام الاستبيان', en:'Questionnaire received'},
  okBody:{ar:'شكرًا لكم. وصلت إجاباتكم إلى فريق مورا وسنعود إليكم عبر وسيلة التواصل المُدخلة. أُرسلت نسخة إلى بريدكم الإلكتروني.',
          en:'Thank you. Your answers have reached the MORA team and we will come back to you using the contact details provided. A copy has been sent to your email address.'},
  okRef:{ar:'رقم المرجع', en:'Reference'},
  failTitle:{ar:'تعذّر الإرسال', en:'Could not send'},
  failBody:{ar:'لم نتمكن من إرسال الاستبيان الآن. إجاباتكم محفوظة في هذا المتصفح — يرجى المحاولة مرة أخرى، أو حفظ نسخة وإرسالها بالبريد الإلكتروني.',
            en:'We could not submit the questionnaire just now. Your answers are saved in this browser — please try again, or save a copy and send it by email.'},
  emailUs:{ar:'إرسال بالبريد الإلكتروني', en:'Email it instead'},
  restored:{ar:'تمت استعادة إجاباتكم المحفوظة.', en:'Your saved answers have been restored.'},
  unanswered:{ar:'بدون إجابة', en:'Not answered'},
  ofTotal:{ar:'من', en:'of'},
  answered:{ar:'سؤال مُجاب', en:'answered'},
  rate:{ar:'سعر الصرف', en:'Rate'},
  enterRate:{ar:'أدخل سعر الصرف في القسم 3 لعرض المكافئ بالجنيه.', en:'Enter the exchange rate in Section 3 to see the EGP equivalent.'},
  balanced:{ar:'مطابق', en:'Balanced'},
  overBudget:{ar:'الإجمالي المحتسب يتجاوز الميزانية المعلنة', en:'Calculated total exceeds the stated budget'},
  underBudget:{ar:'الميزانية المعلنة تتجاوز الإجمالي المحتسب', en:'Stated budget exceeds the calculated total'},
  langName:{ar:'EN', en:'ع'},
  langTitle:{ar:'Switch to English', en:'التحويل إلى العربية'},
  jumpTop:{ar:'أعلى الصفحة', en:'Back to top'}
};

/* ============================================================
   CONFIGURATION
   Point ENDPOINT at the questionnaire service. Same-origin path
   when the site and the service sit behind one nginx (see
   server/nginx.conf.snippet); otherwise use the absolute URL.
   ============================================================ */
const CONFIG = {
  ENDPOINT: '/api/questionnaire',
  FALLBACK_EMAIL: 'Business@omar-abuelsoud.com',
  STORAGE_KEY: 'mora.cq-fep-01.v1'
};

/* ============================================================
   State
   ============================================================ */
const state = { lang:'ar', v:{}, restored:false, submitted:false };
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const L  = o => (o ? (o[state.lang] || o.en || '') : '');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* Every question in one flat list, for progress and validation. */
const ALL_Q = FORM.groups.flatMap(g => g.q.map(q => Object.assign({group:g.id}, q)));
const Q_BY_ID = Object.fromEntries(ALL_Q.map(q => [q.id, q]));
const MIRRORS = Object.fromEntries(ALL_Q.filter(q => q.mirror).map(q => [q.id, q.mirror]));
const FIN_IDS = FORM.fin.lines.map(l => l.id);

/* ============================================================
   Markup helpers
   Bilingual nodes carry both strings; setLang swaps textContent,
   so switching never disturbs a value the client has typed.
   ============================================================ */
function bi(tag, o, cls, extra){
  return `<${tag}${cls ? ` class="${cls}"` : ''} data-ar="${esc(o.ar)}" data-en="${esc(o.en)}"${extra || ''}>${esc(L(o))}</${tag}>`;
}
function phAttr(o){
  return o ? ` placeholder="${esc(L(o))}" data-ph-ar="${esc(o.ar)}" data-ph-en="${esc(o.en)}"` : '';
}

function control(f, idPrefix){
  const id = (idPrefix || '') + f.id;
  const by = f.by ? f.by : id + '-l';
  const ph = phAttr(f.ph);
  const req = f.req ? ' data-req="1"' : '';
  switch(f.type){
    case 'area':
      return `<textarea id="${id}" name="${id}" rows="3"${ph}${req}></textarea>`;
    case 'select': {
      const opts = [`<option value="" data-ar="${esc(T.choose.ar)}" data-en="${esc(T.choose.en)}">${esc(L(T.choose))}</option>`]
        .concat(f.opts.map(o => `<option value="${o.v}" data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</option>`));
      return `<select id="${id}" name="${id}"${req}>${opts.join('')}</select>`;
    }
    case 'yn': case 'ynp': {
      const set = f.type === 'yn' ? YN : YNP;
      return `<div class="opts" role="radiogroup" aria-labelledby="${by}">${set.map((o,i) => `
        <label class="opt"><input type="radio" name="${id}" id="${i ? id + '-' + o.v : id}" value="${o.v}"${req}>
        <span data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</span></label>`).join('')}</div>`;
    }
    case 'multi': {
      const boxes = f.opts.map(o => `<label class="opt"><input type="checkbox" name="${id}" value="${o.v}">
        <span data-ar="${esc(o.ar)}" data-en="${esc(o.en)}">${esc(L(o))}</span></label>`).join('');
      const other = f.other
        ? `<input class="other" type="text" id="${id}__other" name="${id}__other"${phAttr(T.otherSpecify)} hidden>` : '';
      return `<div class="opts opts--wrap">${boxes}</div>${other}`;
    }
    case 'money':
      return `<div class="money"><span class="cur">USD</span>
        <input id="${id}" name="${id}" type="text" inputmode="decimal" dir="ltr" data-money="1"${f.mirror ? ` data-mirror="${f.mirror}"` : ''}${req}>
        <span class="egp" data-egp-for="${id}"></span></div>`;
    case 'pct':
      return `<div class="unit"><input id="${id}" name="${id}" type="number" min="0" max="100" step="0.1" dir="ltr"${req}><span class="u">%</span></div>`;
    case 'num':
      return `<div class="unit"><input id="${id}" name="${id}" type="number" dir="ltr" step="${f.step || 'any'}"${ph}${req}>${
        f.unit ? `<span class="u" data-ar="${esc(f.unit.ar)}" data-en="${esc(f.unit.en)}">${esc(L(f.unit))}</span>` : ''}</div>`;
    case 'month':
      return `<input id="${id}" name="${id}" type="month" dir="ltr"${req}>`;
    case 'date':
      return `<input id="${id}" name="${id}" type="date" dir="ltr"${req}>`;
    case 'email':
      return `<input id="${id}" name="${id}" type="email" dir="ltr" autocomplete="email"${ph}${req}>`;
    case 'tel':
      return `<input id="${id}" name="${id}" type="tel" dir="ltr" autocomplete="tel"${ph}${req}>`;
    default:
      return `<input id="${id}" name="${id}" type="text"${ph}${req}>`;
  }
}

/* ============================================================
   Section renderers
   ============================================================ */
function sectionHead(n, o, extra){
  return `<div class="shead"><span class="snum">${n}</span>
    ${bi('h2', o, 'stitle')}${extra || ''}</div>`;
}

function renderDoc(){
  const s = FORM.doc;
  return `<section class="sec" id="sec-1">
    ${sectionHead(s.n, {ar:s.ar, en:s.en})}
    <div class="fgrid">${s.fields.map(f => `
      <div class="field${f.type === 'email' ? ' field--wide' : ''}">
        <label for="${f.id}">${bi('span', {ar:f.ar, en:f.en})}${f.req ? '<i class="req" aria-hidden="true">•</i>' : ''}</label>
        ${control(f)}
        ${f.hint ? bi('span', f.hint, 'hint') : ''}
      </div>`).join('')}
    </div>
  </section>`;
}

function renderHow(){
  const s = FORM.how;
  return `<section class="sec sec--quiet" id="sec-2">
    ${sectionHead(s.n, {ar:s.ar, en:s.en})}
    <dl class="guide">${s.rows.map(r => `<div>${bi('dt', r.k)}${bi('dd', r.v)}</div>`).join('')}</dl>
  </section>`;
}

function renderFx(){
  const s = FORM.fx;
  return `<section class="sec" id="sec-3">
    ${sectionHead(s.n, {ar:s.ar, en:s.en})}
    <div class="fgrid">${s.fields.map(f => `
      <div class="field">
        <label for="${f.id}">${bi('span', {ar:f.ar, en:f.en})}${f.req ? '<i class="req" aria-hidden="true">•</i>' : ''}</label>
        ${control(f)}
      </div>`).join('')}
    </div>
    ${bi('p', s.note, 'note')}
  </section>`;
}

function renderQuestions(){
  return `<section class="sec" id="sec-4">
    ${sectionHead('4', {ar:'استبيان العميل', en:'Client Questionnaire'})}
    ${FORM.groups.map(g => `
      <div class="qgroup" id="grp-${g.id}">
        <h3 class="ghead"><span class="gid">${g.id}</span>${bi('span', {ar:g.ar, en:g.en})}</h3>
        <div class="qlist">${g.q.map(q => renderQ(q)).join('')}</div>
      </div>`).join('')}
  </section>`;
}

function renderQ(q){
  const cond = q.showIf ? ` data-showif="${q.showIf.q}" data-showval="${q.showIf.is}" hidden` : '';
  return `<div class="q" id="q-${q.id}" data-q="${q.id}"${cond}>
    <div class="qtext">
      <span class="qid">${q.id}</span>
      <label id="${q.id}-l" for="${q.id}">${bi('span', {ar:q.ar, en:q.en}, 'qlabel')}</label>
      ${q.g ? bi('span', q.g, 'guide-in') : ''}
    </div>
    <div class="qans">${control(q)}
      <details class="qnote"><summary>${bi('span', T.addNote)}</summary>
        <textarea id="${q.id}__note" name="${q.id}__note" rows="2"${phAttr(T.notes)}></textarea></details>
    </div>
  </div>`;
}

function renderFin(){
  const f = FORM.fin;
  const row = (l, cls) => `<tr class="${cls || ''}" data-fin="${l.id}">
    <td class="fnum">${l.n}</td>
    <td class="fitem">${bi('span', {ar:l.ar, en:l.en}, '', ` id="lbl_${l.id}"`)}</td>
    <td class="fusd"><div class="money money--cell"><span class="cur">USD</span>
      <input id="fin_${l.id}" name="fin_${l.id}" type="text" inputmode="decimal" dir="ltr"
        data-money="1" data-fin-input="${l.id}" aria-labelledby="lbl_${l.id} th_usd"></div></td>
    <td class="fegp" dir="ltr"><span data-egp-for="fin_${l.id}">—</span></td>
    <td class="fnotes"><input id="fin_${l.id}__note" name="fin_${l.id}__note" type="text"
      aria-labelledby="lbl_${l.id} th_fnotes"${phAttr(T.notes)}></td>
  </tr>`;
  const calc = (id, label, cls) => `<tr class="frow--calc ${cls || ''}">
    <td class="fnum"></td>
    <td class="fitem">${bi('span', label)}</td>
    <td class="fusd" dir="ltr"><output id="${id}_usd">—</output></td>
    <td class="fegp" dir="ltr"><output id="${id}_egp">—</output></td>
    <td class="fnotes"><span class="flag" id="${id}_flag"></span></td>
  </tr>`;
  return `<section class="sec" id="sec-5">
    ${sectionHead(f.n, {ar:f.ar, en:f.en}, `<span class="rate-chip" id="rateChip"></span>`)}
    <div class="tblscroll"><table class="ftbl">
      <thead><tr>
        <th class="fnum">#</th>
        ${bi('th', f.cols.item, 'fitem')}
        ${bi('th', f.cols.usd, 'fusd', ' id="th_usd"')}
        ${bi('th', f.cols.egp, 'fegp')}
        ${bi('th', f.cols.notes, 'fnotes', ' id="th_fnotes"')}
      </tr></thead>
      <tbody>
        ${f.lines.map(l => row(l)).join('')}
        ${calc('total', f.totalLabel, 'frow--total')}
        ${f.memo.map(l => row(l, 'frow--memo')).join('')}
        ${calc('self', f.selfLabel)}
        ${calc('variance', f.varLabel, 'frow--var')}
      </tbody>
    </table></div>
    ${bi('p', T.enterRate, 'note note--fx')}
  </section>`;
}

function renderDocs(){
  const d = FORM.docs;
  return `<section class="sec" id="sec-6">
    ${sectionHead(d.n, {ar:d.ar, en:d.en})}
    <div class="tblscroll"><table class="dtbl">
      <thead><tr>
        <th class="fnum">#</th>
        ${bi('th', d.cols.doc)}${bi('th', d.cols.avail)}${bi('th', d.cols.ver, '', ' id="th_ver"')}${bi('th', d.cols.notes, '', ' id="th_dnotes"')}
      </tr></thead>
      <tbody>${d.rows.map(r => `<tr>
        <td class="fnum">${r.n}</td>
        <td class="fitem">${bi('span', {ar:r.ar, en:r.en}, '', ` id="dlbl_${r.id}"`)}${bi('span', r.g, 'guide-in')}</td>
        <td>${control({id:'doc_' + r.id, type:'yn', by:`dlbl_${r.id}`})}</td>
        <td><input id="doc_${r.id}__ver" name="doc_${r.id}__ver" type="text" aria-labelledby="dlbl_${r.id} th_ver"></td>
        <td><input id="doc_${r.id}__note" name="doc_${r.id}__note" type="text" aria-labelledby="dlbl_${r.id} th_dnotes"></td>
      </tr>`).join('')}</tbody>
    </table></div>
  </section>`;
}

function renderSignoff(){
  const s = FORM.signoff;
  const party = (key, label) => `<div class="party">
    ${bi('h3', label, 'phead')}
    ${s.fields.map(f => `<div class="field">
      <label for="${key}${f.id}">${bi('span', {ar:f.ar, en:f.en})}</label>
      ${control({id: key + f.id, type: f.type || 'text'})}
    </div>`).join('')}
    <div class="sig">${bi('span', s.sigLine, 'siglbl')}<span class="sigline"></span></div>
  </div>`;
  return `<section class="sec" id="sec-7">
    ${sectionHead(s.n, {ar:s.ar, en:s.en})}
    ${bi('p', s.text, 'declare')}
    <div class="parties">${party('client', s.client)}${party('consultant', s.consultant)}</div>
    <label class="consent"><input type="checkbox" id="consent" name="consent" data-req="1">
      ${bi('span', s.confirm)}</label>
  </section>`;
}

/* ============================================================
   Build the page
   ============================================================ */
function build(){
  $('#form-body').innerHTML =
    renderDoc() + renderHow() + renderFx() + renderQuestions() + renderFin() + renderDocs() + renderSignoff();
  buildToc();
  wireInputs();
  restore();
  setLang(state.lang);
  recalc();
  updateConditionals();
  updateProgress();
}

function buildToc(){
  const items = [
    ['sec-1', FORM.doc], ['sec-2', FORM.how], ['sec-3', FORM.fx],
    ['sec-4', {n:'4', ar:'استبيان العميل', en:'Client Questionnaire'}],
    ['sec-5', FORM.fin], ['sec-6', FORM.docs], ['sec-7', FORM.signoff]
  ];
  $('#toc').innerHTML = items.map(([id, s]) =>
    `<li><a href="#${id}"><span class="tnum">${s.n}</span>${bi('span', {ar:s.ar, en:s.en})}</a></li>`
  ).join('') + FORM.groups.map(g =>
    `<li class="toc--sub"><a href="#grp-${g.id}"><span class="tnum">${g.id}</span>${bi('span', {ar:g.ar, en:g.en})}</a></li>`
  ).join('');
}

/* ============================================================
   Language
   Swaps every bilingual node's text and every placeholder, then
   flips document direction. Values are untouched.
   ============================================================ */
function setLang(lang){
  state.lang = lang;
  const rtl = lang === 'ar';
  const html = document.documentElement;
  html.lang = lang;
  html.dir = rtl ? 'rtl' : 'ltr';
  $$('[data-ar]').forEach(el => { el.textContent = el.dataset[lang] || ''; });
  $$('[data-ph-ar]').forEach(el => { el.placeholder = el.dataset['ph' + (rtl ? 'Ar' : 'En')] || ''; });
  const btn = $('#langBtn');
  btn.textContent = T.langName[lang];
  btn.title = T.langTitle[lang];
  btn.setAttribute('aria-label', T.langTitle[lang]);
  document.title = L(FORM.title) + ' · MORA Industries';
  try{ localStorage.setItem(CONFIG.STORAGE_KEY + '.lang', lang); }catch(e){}
  recalc();
  updateProgress();
}

/* ============================================================
   Values
   ============================================================ */
function fields(){
  return $$('#form-body input, #form-body select, #form-body textarea')
    .filter(el => el.type !== 'radio' && el.type !== 'checkbox')
    .concat($$('#form-body input[type=radio], #form-body input[type=checkbox]'));
}

function collect(){
  const out = {};
  $$('#form-body input, #form-body select, #form-body textarea').forEach(el => {
    if(!el.name) return;
    if(el.type === 'radio'){ if(el.checked) out[el.name] = el.value; }
    else if(el.type === 'checkbox'){
      if(el.name === 'consent'){ out.consent = el.checked; return; }
      const cur = out[el.name] || [];
      if(el.checked){ cur.push(el.value); out[el.name] = cur; }
      else if(!out[el.name]) out[el.name] = cur;
    }
    else if(el.value !== '') out[el.name] = el.value;
  });
  return out;
}

function apply(v){
  Object.entries(v || {}).forEach(([name, val]) => {
    const els = $$(`#form-body [name="${CSS.escape(name)}"]`);
    if(!els.length) return;
    if(els[0].type === 'radio'){ els.forEach(el => { el.checked = el.value === val; }); }
    else if(els[0].type === 'checkbox' && name !== 'consent'){
      const set = Array.isArray(val) ? val : [val];
      els.forEach(el => { el.checked = set.indexOf(el.value) > -1; });
    }
    else if(name === 'consent'){ els[0].checked = !!val; }
    else els[0].value = val;
  });
}

/* ============================================================
   Autosave
   ============================================================ */
let saveTimer = 0;
function save(){
  if(state.submitted) return;          /* nothing to keep once it is sent */
  clearTimeout(saveTimer);
  mark(T.saving);
  saveTimer = setTimeout(() => {
    try{
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({at:Date.now(), v:collect()}));
      mark(T.saved);
    }catch(e){ mark(T.notSaved); }
  }, 450);
}
function mark(o){
  const el = $('#saveState');
  el.dataset.ar = o.ar; el.dataset.en = o.en;
  el.textContent = L(o);
}
function restore(){
  let raw = null;
  try{ raw = localStorage.getItem(CONFIG.STORAGE_KEY); }catch(e){ mark(T.notSaved); return; }
  if(!raw) return;
  try{
    const data = JSON.parse(raw);
    apply(data.v);
    state.restored = true;
    mark(T.saved);
  }catch(e){}
}

/* ============================================================
   Money, exchange rate and the calculated rows
   ============================================================ */
const num = s => {
  const n = parseFloat(String(s == null ? '' : s).replace(/[^\d.-]/g, ''));
  return isFinite(n) ? n : 0;
};
const fmt = n => n.toLocaleString('en-US', {maximumFractionDigits:0});

function rate(){ return num($('#fxRate') && $('#fxRate').value); }

function recalc(){
  const r = rate();
  const chip = $('#rateChip');
  if(chip) chip.textContent = r ? `${L(T.rate)}: 1 USD = ${r.toLocaleString('en-US', {maximumFractionDigits:4})} EGP` : '';
  $('.note--fx').hidden = !!r;

  /* Every money field shows its EGP equivalent inline. */
  $$('[data-money]').forEach(el => {
    const out = $(`[data-egp-for="${el.id}"]`);
    if(!out) return;
    const v = num(el.value);
    out.textContent = (v && r) ? fmt(v * r) + ' EGP' : (out.tagName === 'SPAN' && out.classList.contains('egp') ? '' : '—');
  });

  const total = FIN_IDS.reduce((s, id) => s + num(($('#fin_' + id) || {}).value), 0);
  const m1 = num(($('#fin_M1') || {}).value);
  const m2 = num(($('#fin_M2') || {}).value);
  const self = m1 - m2;
  const variance = m1 - total;

  set('total', total, r);
  set('self', m1 ? self : 0, r, !m1);
  set('variance', m1 ? variance : 0, r, !m1);

  const flag = $('#variance_flag');
  if(flag){
    if(!m1 || !total){ flag.textContent = ''; flag.className = 'flag'; }
    else if(Math.abs(variance) < 0.5){ flag.textContent = L(T.balanced); flag.className = 'flag flag--ok'; }
    else if(variance < 0){ flag.textContent = L(T.overBudget); flag.className = 'flag flag--warn'; }
    else { flag.textContent = L(T.underBudget); flag.className = 'flag flag--note'; }
  }
}
function set(id, v, r, blank){
  const u = $('#' + id + '_usd'), e = $('#' + id + '_egp');
  if(!u) return;
  u.textContent = blank ? '—' : fmt(v);
  e.textContent = (blank || !r) ? '—' : fmt(v * r);
}

/* Mirrored questions: A.1 <-> M1, E.3 <-> M2, E.4/E.5/E.6 <-> lines 1/2/4 */
function syncMirror(el){
  const finId = el.dataset.mirror;
  if(finId){
    const t = $('#fin_' + finId);
    if(t && t.value !== el.value){ t.value = el.value; }
  } else if(el.dataset.finInput){
    const q = $(`[data-mirror="${el.dataset.finInput}"]`);
    if(q && q.value !== el.value){ q.value = el.value; }
  }
}

/* ============================================================
   Conditional questions
   ============================================================ */
function updateConditionals(){
  $$('[data-showif]').forEach(box => {
    const on = collectOne(box.dataset.showif) === box.dataset.showval;
    box.hidden = !on;
    if(!on) $$('input, textarea, select', box).forEach(el => {
      if(el.type === 'radio' || el.type === 'checkbox') el.checked = false; else el.value = '';
    });
  });
}
function collectOne(name){
  const els = $$(`#form-body [name="${CSS.escape(name)}"]`);
  if(!els.length) return '';
  if(els[0].type === 'radio'){ const c = els.find(e => e.checked); return c ? c.value : ''; }
  return els[0].value;
}

/* "Other" free-text appears only when the Other box is ticked. */
function updateOthers(){
  $$('.other').forEach(inp => {
    const name = inp.id.replace('__other', '');
    const box = $(`#form-body input[type=checkbox][name="${CSS.escape(name)}"][value="other"]`);
    const on = !!(box && box.checked);
    inp.hidden = !on;
    if(!on) inp.value = '';
  });
}

/* ============================================================
   Progress
   ============================================================ */
function isAnswered(id){
  const els = $$(`#form-body [name="${CSS.escape(id)}"]`);
  if(!els.length) return false;
  if(els[0].type === 'radio' || els[0].type === 'checkbox') return els.some(e => e.checked);
  return els[0].value.trim() !== '';
}
function updateProgress(){
  const visible = ALL_Q.filter(q => { const b = $('#q-' + q.id); return b && !b.hidden; });
  const done = visible.filter(q => isAnswered(q.id)).length;
  const pct = visible.length ? Math.round(done / visible.length * 100) : 0;
  $('#bar').style.setProperty('--p', pct / 100);
  $('#pctNum').textContent = pct + '%';
  const c = $('#pctCount');
  c.textContent = `${done} ${L(T.ofTotal)} ${visible.length} ${L(T.answered)}`;
  $('#progress').setAttribute('aria-valuenow', String(pct));
}

/* ============================================================
   Wiring
   ============================================================ */
function wireInputs(){
  const body = $('#form-body');
  body.addEventListener('input', e => {
    const el = e.target;
    if(el.dataset.money || el.dataset.finInput) syncMirror(el);
    if(el.id === 'fxRate' || el.dataset.money || el.dataset.finInput) recalc();
    el.removeAttribute('aria-invalid');
    save(); updateProgress();
  });
  body.addEventListener('change', e => {
    if(e.target.type === 'checkbox') updateOthers();
    updateConditionals(); updateProgress(); save();
    e.target.removeAttribute('aria-invalid');
  });
  /* Money fields display grouped digits once they lose focus. */
  body.addEventListener('focusout', e => {
    const el = e.target;
    if((el.dataset.money || el.dataset.finInput) && el.value.trim() !== ''){
      const v = num(el.value);
      el.value = v ? v.toLocaleString('en-US', {maximumFractionDigits:2}) : '';
      syncMirror(el); recalc(); save();
    }
  });
}

/* ============================================================
   Validation and submission
   ============================================================ */
function validate(){
  const missing = [];
  $$('#form-body [data-req]').forEach(el => {
    const box = el.closest('[data-showif]');
    if(box && box.hidden) return;
    if(el.type === 'checkbox'){ if(!el.checked) missing.push(el); return; }
    if(el.type === 'radio'){
      const group = $$(`#form-body [name="${CSS.escape(el.name)}"]`);
      if(group[0] === el && !group.some(g => g.checked)) missing.push(el);
      return;
    }
    if(el.value.trim() === '') missing.push(el);
  });
  return missing;
}

function labelOf(el){
  const q = el.closest('.q');
  if(q) return Q_BY_ID[q.dataset.q] ? L(Q_BY_ID[q.dataset.q]) : q.dataset.q;
  const f = el.closest('.field');
  const lb = f && $('label span', f);
  if(lb) return lb.textContent;
  if(el.id === 'consent') return L(T.errConsent);
  return el.name;
}

async function submit(){
  const box = $('#result');
  const missing = validate();
  if(missing.length){
    missing.forEach(el => el.setAttribute('aria-invalid', 'true'));
    box.hidden = false;
    box.className = 'result result--err';
    box.innerHTML = `<h3>${esc(L(T.errTitle))}</h3><p>${esc(L(T.errBody))}</p>
      <ul>${missing.slice(0, 12).map(el => `<li>${esc(labelOf(el))}</li>`).join('')}</ul>`;
    box.scrollIntoView({block:'center', behavior:'smooth'});
    missing[0].focus({preventScroll:true});
    return;
  }

  const btn = $('#submitBtn');
  btn.disabled = true;
  const old = btn.textContent;
  btn.textContent = L(T.sending);

  const payload = {
    ref: FORM.ref,
    lang: state.lang,
    submittedAt: new Date().toISOString(),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    elapsedMs: Date.now() - START,
    website: $('#website').value,        /* honeypot: must stay empty */
    answers: collect()
  };

  try{
    const res = await fetch(CONFIG.ENDPOINT, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if(!res.ok || !data.ok) throw new Error(data.error || res.status);
    box.hidden = false;
    box.className = 'result result--ok';
    box.innerHTML = `<h3>${esc(L(T.okTitle))}</h3><p>${esc(L(T.okBody))}</p>
      ${data.ref ? `<p class="refline">${esc(L(T.okRef))}: <b dir="ltr">${esc(data.ref)}</b></p>` : ''}`;
    state.submitted = true;
    clearTimeout(saveTimer);
    try{ localStorage.removeItem(CONFIG.STORAGE_KEY); }catch(e){}
    mark({ar:'', en:''});
    btn.hidden = true;
  }catch(err){
    box.hidden = false;
    box.className = 'result result--err';
    box.innerHTML = `<h3>${esc(L(T.failTitle))}</h3><p>${esc(L(T.failBody))}</p>
      <p><a class="btn btn--sec" href="mailto:${CONFIG.FALLBACK_EMAIL}?subject=${encodeURIComponent(FORM.ref + ' — ' + (collect().clientName || ''))}">${esc(L(T.emailUs))}</a></p>`;
    btn.disabled = false;
    btn.textContent = old;
  }
  box.scrollIntoView({block:'center', behavior:'smooth'});
}

/* ============================================================
   Save / restore a copy as a file
   ============================================================ */
function saveCopy(){
  const name = (collect().clientName || 'client').replace(/[^\w؀-ۿ -]/g, '').trim() || 'client';
  const blob = new Blob([JSON.stringify({ref:FORM.ref, savedAt:new Date().toISOString(), v:collect()}, null, 2)],
    {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${FORM.ref}-${name}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function loadCopy(file){
  const fr = new FileReader();
  fr.onload = () => {
    try{
      const data = JSON.parse(fr.result);
      apply(data.v || data);
      updateOthers(); updateConditionals(); recalc(); updateProgress(); save();
    }catch(e){}
  };
  fr.readAsText(file);
}

/* ============================================================
   Init
   ============================================================ */
const START = Date.now();
try{
  const stored = localStorage.getItem(CONFIG.STORAGE_KEY + '.lang');
  if(stored === 'ar' || stored === 'en') state.lang = stored;
}catch(e){}

build();
updateOthers();

$('#langBtn').addEventListener('click', () => setLang(state.lang === 'ar' ? 'en' : 'ar'));
$('#submitBtn').addEventListener('click', submit);
$('#printBtn').addEventListener('click', () => window.print());
$('#saveBtn').addEventListener('click', saveCopy);
$('#loadInput').addEventListener('change', e => { if(e.target.files[0]) loadCopy(e.target.files[0]); e.target.value = ''; });
$('#clearBtn').addEventListener('click', () => {
  if(!confirm(L(T.clearAsk))) return;
  try{ localStorage.removeItem(CONFIG.STORAGE_KEY); }catch(e){}
  location.reload();
});

/* Highlight the section currently in view in the contents list. */
if(window.IntersectionObserver){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const a = $(`#toc a[href="#${en.target.id}"]`);
      if(a) a.classList.toggle('is-here', en.isIntersecting);
    });
  }, {rootMargin:'-25% 0px -65% 0px'});
  $$('.sec, .qgroup').forEach(el => io.observe(el));
}
