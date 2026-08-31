/* ============================================================
   MORA Industries — questionnaire intake service
   Receives CQ-FEP-01 submissions, emails them to the business
   mailbox with an Excel and a JSON attachment, sends the client
   a confirmation, and keeps a copy on disk.

   Configuration lives in .env — see .env.example.
   Start:  node server.js        (or via the systemd unit)
   ============================================================ */
'use strict';

const express    = require('express');
const nodemailer = require('nodemailer');
const ExcelJS    = require('exceljs');
const crypto     = require('crypto');
const fs         = require('fs/promises');
const path       = require('path');
require('dotenv').config();

const CFG = {
  port:        parseInt(process.env.PORT || '4010', 10),
  host:        process.env.HOST || '127.0.0.1',
  to:          process.env.MAIL_TO   || 'Business@omar-abuelsoud.com',
  from:        process.env.MAIL_FROM || 'MORA Industries <no-reply@omar-abuelsoud.com>',
  cc:          process.env.MAIL_CC   || '',
  confirmClient: process.env.CONFIRM_CLIENT !== 'false',
  archiveDir:  process.env.ARCHIVE_DIR || path.join(__dirname, 'submissions'),
  origins:     (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
  minSeconds:  parseInt(process.env.MIN_SECONDS || '20', 10),
  maxPerHour:  parseInt(process.env.MAX_PER_HOUR || '6', 10),
  smtp: {
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  }
};

const app = express();
app.set('trust proxy', 1);          /* behind nginx */
app.disable('x-powered-by');
app.use(express.json({ limit: '512kb' }));

/* ---------- CORS ----------
   Same-origin deployment needs none of this. It only matters when
   the page is served from a different host than the service. */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && CFG.origins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* ---------- Rate limit: a small in-memory window per IP ---------- */
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const win = 60 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < win);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();          /* crude, and enough */
  return list.length > CFG.maxPerHour;
}

/* ============================================================
   The form's shape, mirrored from questionnaire.js so the email
   and the workbook can be laid out in reading order.
   ============================================================ */
const SECTIONS = require('./form-map.js');

const clean = v => (v == null ? '' : Array.isArray(v) ? v.join(', ') : String(v));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money = v => {
  const n = parseFloat(String(v || '').replace(/[^\d.-]/g, ''));
  return isFinite(n) ? n : 0;
};

function reference() {
  const d = new Date();
  const stamp = d.toISOString().slice(2, 10).replace(/-/g, '');
  return `CQ-${stamp}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

/* ---------- Human-readable answer values ----------
   Codes become labels, multi-selects are joined in the reading
   language, and an "Other" free-text is appended to its choice. */
function label(key, value, lang, a) {
  const sep = lang === 'ar' ? '، ' : ', ';
  const opt = SECTIONS.OPTIONS[key];
  let out;
  if (!opt) out = clean(value);
  else {
    const list = Array.isArray(value) ? value : String(value || '').split(',').map(s => s.trim());
    out = list.map(v => (opt[v] ? opt[v][lang] || opt[v].en : v)).filter(Boolean).join(sep);
  }
  const other = a && clean(a[key + '__other']).trim();
  if (other) out = out ? `${out} (${other})` : other;
  return out;
}

/* ============================================================
   Excel: the same seven sections, in the sheet's order
   ============================================================ */
async function buildWorkbook(a, ref) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'MORA Industries';
  wb.created = new Date();
  const ws = wb.addWorksheet('CQ-FEP-01', {
    views: [{ rightToLeft: false, state: 'frozen', ySplit: 1 }]
  });
  ws.columns = [
    { key: 'a', width: 8 }, { key: 'b', width: 52 }, { key: 'c', width: 46 },
    { key: 'd', width: 30 }, { key: 'e', width: 18 }
  ];

  const NAVY = 'FF083A56', TEAL = 'FF14768C', TINT = 'FFE9F2F6';
  const title = ws.addRow(['', 'MORA Industries — Client Questionnaire (CQ-FEP-01)']);
  title.font = { bold: true, size: 14, color: { argb: NAVY } };
  ws.addRow(['', 'Factory Establishment Project (Egypt)  ·  مشروع إنشاء مصنع في مصر']);
  ws.addRow(['', `Reference: ${ref}`, `Submitted: ${new Date().toISOString()}`]);
  ws.addRow([]);

  const head = (n, en, ar) => {
    const r = ws.addRow(['', `${n}.  ${en}`, ar]);
    r.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
    r.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } }; });
    ws.addRow([]);
    return r;
  };
  const cols = (...v) => {
    const r = ws.addRow(['', ...v]);
    r.font = { bold: true, size: 9, color: { argb: TEAL } };
    r.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINT } }; });
    return r;
  };
  const row = (...v) => {
    const r = ws.addRow(v);
    r.alignment = { vertical: 'top', wrapText: true };
    return r;
  };

  /* 1, 3 — flat key/value blocks */
  head('1', 'Document & Project Information', 'بيانات المستند والمشروع');
  cols('Field', 'الحقل', 'Answer');
  SECTIONS.DOC.forEach(f => row('', f.en, f.ar, clean(a[f.id])));
  ws.addRow([]);

  head('3', 'Currency & Exchange Rate Basis', 'أساس العملة وسعر الصرف');
  cols('Field', 'الحقل', 'Answer');
  SECTIONS.FX.forEach(f => row('', f.en, f.ar, label(f.id, a[f.id], 'en', a)));
  ws.addRow([]);

  /* 4 — the questionnaire */
  head('4', 'Client Questionnaire', 'استبيان العميل');
  SECTIONS.GROUPS.forEach(g => {
    const gr = ws.addRow(['', `${g.id}.  ${g.en}`, g.ar]);
    gr.font = { bold: true, color: { argb: TEAL } };
    cols('#', 'Question (English)', 'السؤال', 'Answer', 'Client notes');
    g.q.forEach(q => {
      const r = row(q.id, q.en, q.ar, label(q.id, a[q.id], 'en', a), clean(a[q.id + '__note']));
      if (!label(q.id, a[q.id], 'en', a)) r.getCell(4).font = { color: { argb: 'FF9AA9B2' }, italic: true };
      if (!label(q.id, a[q.id], 'en', a)) r.getCell(4).value = '— not answered —';
    });
    ws.addRow([]);
  });

  /* 5 — financial summary */
  head('5', 'Financial Summary – USD / EGP', 'الملخص المالي');
  const rate = money(a.fxRate);
  cols('#', 'Financial Item', 'البند', 'Amount (USD)', 'Equivalent (EGP)');
  let total = 0;
  SECTIONS.FIN.forEach(l => {
    const v = money(a['fin_' + l.id]);
    total += v;
    const r = row(l.n, l.en, l.ar, v || null, rate ? v * rate : null);
    r.getCell(4).numFmt = '#,##0'; r.getCell(5).numFmt = '#,##0';
  });
  const tr = row('', 'Total Project Investment (calculated)', 'إجمالي استثمار المشروع', total, rate ? total * rate : null);
  tr.font = { bold: true }; tr.getCell(4).numFmt = '#,##0'; tr.getCell(5).numFmt = '#,##0';
  SECTIONS.MEMO.forEach(l => {
    const v = money(a['fin_' + l.id]);
    const r = row(l.n, l.en, l.ar, v || null, rate ? v * rate : null);
    r.getCell(4).numFmt = '#,##0'; r.getCell(5).numFmt = '#,##0';
  });
  const m1 = money(a.fin_M1), m2 = money(a.fin_M2);
  const sr = row('', 'Self-Funded Amount (M1 − M2)', 'التمويل الذاتي', m1 - m2, rate ? (m1 - m2) * rate : null);
  sr.font = { bold: true }; sr.getCell(4).numFmt = '#,##0'; sr.getCell(5).numFmt = '#,##0';
  const vr = row('', 'Variance (stated budget − calculated total)', 'الفرق', m1 - total, rate ? (m1 - total) * rate : null);
  vr.font = { bold: true }; vr.getCell(4).numFmt = '#,##0'; vr.getCell(5).numFmt = '#,##0';
  ws.addRow([]);

  /* 6 — documents */
  head('6', 'Supporting Documents Checklist', 'قائمة المستندات الداعمة');
  cols('#', 'Document', 'المستند', 'Available?', 'Date / version · notes');
  SECTIONS.DOCS.forEach(d => row(d.n, d.en, d.ar, label('__yn', a['doc_' + d.id], 'en'),
    [clean(a['doc_' + d.id + '__ver']), clean(a['doc_' + d.id + '__note'])].filter(Boolean).join(' · ')));
  ws.addRow([]);

  /* 7 — sign-off */
  head('7', 'Confirmation & Sign-off', 'الإقرار والاعتماد');
  cols('Party', 'Name', 'Position', 'Date');
  row('', 'Client representative', clean(a.clientName), clean(a.clientPosition), clean(a.clientDate));
  row('', 'Consultant', clean(a.consultantName), clean(a.consultantPosition), clean(a.consultantDate));
  row('', 'Consent given', a.consent ? 'Yes' : 'No', '', '');

  return wb.xlsx.writeBuffer();
}

/* ============================================================
   Email body
   ============================================================ */
function buildHtml(a, ref, lang) {
  const rate = money(a.fxRate);
  const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  const cell = (v, b) => `<td style="padding:7px 10px;border-bottom:1px solid #E4EBF0;font-size:13px;${b ? 'font-weight:600;color:#083A56;' : 'color:#39505C;'}">${v}</td>`;

  let total = 0;
  SECTIONS.FIN.forEach(l => { total += money(a['fin_' + l.id]); });
  const m1 = money(a.fin_M1), m2 = money(a.fin_M2);

  const groups = SECTIONS.GROUPS.map(g => `
    <tr><td colspan="2" style="padding:20px 10px 6px;font:600 12px/1.4 system-ui;color:#14768C;
      letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #14768C">${g.id} · ${esc(g.en)} — ${esc(g.ar)}</td></tr>
    ${g.q.map(q => {
      const v = label(q.id, a[q.id], 'en', a);
      const note = clean(a[q.id + '__note']);
      return `<tr>
        ${cell(`<b style="color:#14768C">${q.id}</b> ${esc(q.en)}<br><span style="color:#7A8C96;font-size:12px">${esc(q.ar)}</span>`)}
        ${cell(v ? esc(v) + (note ? `<br><i style="color:#7A8C96;font-size:12px">${esc(note)}</i>` : '')
                 : '<span style="color:#B0BCC4">—</span>', !!v)}
      </tr>`;
    }).join('')}`).join('');

  const finRows = SECTIONS.FIN.concat(SECTIONS.MEMO).map(l => {
    const v = money(a['fin_' + l.id]);
    return `<tr>${cell(esc(l.en))}${cell(v ? `${fmt(v)} USD${rate ? ` &nbsp;·&nbsp; ${fmt(v * rate)} EGP` : ''}` : '—', !!v)}</tr>`;
  }).join('');

  return `<!doctype html><html><body style="margin:0;background:#F4F8FA;padding:24px;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="max-width:820px;margin:0 auto;background:#fff;border:1px solid #E4EBF0;border-radius:6px;overflow:hidden">
    <div style="height:3px;background:linear-gradient(to right,#083A56,#14768C 34%,#6FD6E7 68%,#B8862B)"></div>
    <div style="padding:22px 24px;border-bottom:1px solid #E4EBF0">
      <div style="font:600 11px/1.4 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#14768C">MORA Industries · Client Questionnaire</div>
      <h1 style="margin:8px 0 4px;font:400 22px/1.25 system-ui;color:#083A56">${esc(clean(a.clientName) || 'Client')}</h1>
      <div style="font-size:13px;color:#4C6A7A">${esc(clean(a.projectTitle))}${a.sector ? ' · ' + esc(clean(a.sector)) : ''}</div>
      <div style="margin-top:12px;font:12px/1.6 ui-monospace,monospace;color:#7A8C96">
        Ref ${esc(ref)} &nbsp;·&nbsp; ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC &nbsp;·&nbsp; filled in ${lang === 'ar' ? 'Arabic' : 'English'}
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse">
      <tr><td colspan="2" style="padding:18px 10px 6px;font:600 12px/1.4 system-ui;color:#14768C;
        letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #14768C">1 · Contact</td></tr>
      ${SECTIONS.DOC.map(f => `<tr>${cell(esc(f.en))}${cell(esc(clean(a[f.id])) || '—', !!a[f.id])}</tr>`).join('')}

      <tr><td colspan="2" style="padding:18px 10px 6px;font:600 12px/1.4 system-ui;color:#14768C;
        letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #14768C">3 · Exchange rate</td></tr>
      ${SECTIONS.FX.map(f => `<tr>${cell(esc(f.en))}${cell(esc(label(f.id, a[f.id], 'en', a)) || '—', !!a[f.id])}</tr>`).join('')}

      ${groups}

      <tr><td colspan="2" style="padding:20px 10px 6px;font:600 12px/1.4 system-ui;color:#14768C;
        letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #14768C">5 · Financial summary</td></tr>
      ${finRows}
      <tr>${cell('<b>Total project investment (calculated)</b>')}${cell(`<b>${fmt(total)} USD${rate ? ` · ${fmt(total * rate)} EGP` : ''}</b>`, true)}</tr>
      <tr>${cell('Self-funded (M1 − M2)')}${cell(`${fmt(m1 - m2)} USD`, true)}</tr>
      <tr>${cell('Variance (stated − calculated)')}${cell(`${fmt(m1 - total)} USD`, true)}</tr>

      <tr><td colspan="2" style="padding:20px 10px 6px;font:600 12px/1.4 system-ui;color:#14768C;
        letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #14768C">6 · Supporting documents</td></tr>
      ${SECTIONS.DOCS.map(d => `<tr>${cell(esc(d.en))}${cell(
        esc(label('__yn', a['doc_' + d.id], 'en')) || '—',
        clean(a['doc_' + d.id]) === 'yes')}</tr>`).join('')}
    </table>

    <div style="padding:18px 24px;background:#F4F8FA;border-top:1px solid #E4EBF0;font-size:12px;color:#7A8C96">
      The full answer set is attached as an Excel workbook and as JSON. Reply to this message to reach the client directly.
    </div>
  </div></body></html>`;
}

function clientConfirmHtml(a, ref, lang) {
  const ar = lang === 'ar';
  const t = ar ? {
    dir: 'rtl',
    h: 'تم استلام استبيانكم',
    p1: 'شكرًا لكم. وصل استبيان مشروع إنشاء المصنع إلى فريق مورا إندستريز، وسنعود إليكم عبر وسيلة التواصل التي أدخلتموها.',
    p2: 'مرفق بهذه الرسالة نسخة من إجاباتكم كما استُلمت، للحفظ لديكم.',
    ref: 'رقم المرجع'
  } : {
    dir: 'ltr',
    h: 'We have received your questionnaire',
    p1: 'Thank you. Your factory establishment questionnaire has reached the MORA Industries team, and we will come back to you using the contact details you provided.',
    p2: 'A copy of your answers as received is attached for your records.',
    ref: 'Reference'
  };
  return `<!doctype html><html dir="${t.dir}"><body style="margin:0;background:#F4F8FA;padding:24px;
    font-family:system-ui,-apple-system,'Segoe UI',sans-serif;direction:${t.dir}">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E4EBF0;border-radius:6px;overflow:hidden">
      <div style="height:3px;background:linear-gradient(to right,#083A56,#14768C 34%,#6FD6E7 68%,#B8862B)"></div>
      <div style="padding:26px 26px 30px">
        <div style="font:600 11px/1.4 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#14768C">MORA Industries</div>
        <h1 style="margin:10px 0 14px;font:400 21px/1.3 system-ui;color:#083A56">${t.h}</h1>
        <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#4C6A7A">${t.p1}</p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#4C6A7A">${t.p2}</p>
        <p style="margin:0;font:12px/1.6 ui-monospace,monospace;color:#7A8C96">${t.ref}: ${esc(ref)}</p>
      </div>
    </div></body></html>`;
}

/* ============================================================
   Route
   ============================================================ */
const transporter = nodemailer.createTransport(CFG.smtp);

app.post('/api/questionnaire', async (req, res) => {
  const ip = req.ip || 'unknown';
  try {
    const body = req.body || {};
    const a = body.answers || {};

    /* Spam guards: the honeypot must be empty and a person needs
       longer than MIN_SECONDS to fill in a form this size. */
    if (body.website) return res.status(200).json({ ok: true, ref: reference() });
    if (Number(body.elapsedMs || 0) < CFG.minSeconds * 1000) {
      return res.status(429).json({ ok: false, error: 'too_fast' });
    }
    if (limited(ip)) return res.status(429).json({ ok: false, error: 'rate_limited' });

    /* The same fields the page marks required. */
    const need = ['clientName', 'formDate', 'projectTitle', 'sector', 'contactName', 'contactEmail', 'fxRate'];
    const missing = need.filter(k => !clean(a[k]).trim());
    if (missing.length || !a.consent) {
      return res.status(400).json({ ok: false, error: 'incomplete', missing });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean(a.contactEmail))) {
      return res.status(400).json({ ok: false, error: 'bad_email' });
    }

    const ref = reference();
    const lang = body.lang === 'ar' ? 'ar' : 'en';
    const safeName = clean(a.clientName).replace(/[^\w؀-ۿ -]/g, '').trim().slice(0, 60) || 'client';

    const xlsx = await buildWorkbook(a, ref);
    const json = Buffer.from(JSON.stringify({ ref, receivedAt: new Date().toISOString(), ip, ...body }, null, 2), 'utf8');

    /* Archive first: an email that fails should not lose the answers. */
    await fs.mkdir(CFG.archiveDir, { recursive: true });
    await fs.writeFile(path.join(CFG.archiveDir, `${ref}.json`), json);
    await fs.writeFile(path.join(CFG.archiveDir, `${ref}.xlsx`), Buffer.from(xlsx));

    const attachments = [
      { filename: `${ref}-${safeName}.xlsx`, content: Buffer.from(xlsx),
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      { filename: `${ref}.json`, content: json, contentType: 'application/json' }
    ];

    await transporter.sendMail({
      from: CFG.from,
      to: CFG.to,
      cc: CFG.cc || undefined,
      replyTo: `${clean(a.contactName)} <${clean(a.contactEmail)}>`,
      subject: `CQ-FEP-01 · ${clean(a.clientName)} · ${clean(a.projectTitle) || 'Factory project'} [${ref}]`,
      html: buildHtml(a, ref, lang),
      attachments
    });

    if (CFG.confirmClient) {
      transporter.sendMail({
        from: CFG.from,
        to: `${clean(a.contactName)} <${clean(a.contactEmail)}>`,
        subject: lang === 'ar'
          ? `تم استلام استبيان مشروع المصنع — ${ref}`
          : `Factory project questionnaire received — ${ref}`,
        html: clientConfirmHtml(a, ref, lang),
        attachments: [attachments[0]]
      }).catch(err => console.error('[confirm]', ref, err.message));
    }

    console.log(`[ok] ${ref} ${clean(a.clientName)} <${clean(a.contactEmail)}> from ${ip}`);
    res.json({ ok: true, ref });

  } catch (err) {
    console.error('[fail]', err);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});

app.get('/api/questionnaire/health', (_req, res) => res.json({ ok: true, service: 'cq-fep-01' }));

app.listen(CFG.port, CFG.host, () => {
  console.log(`questionnaire service on http://${CFG.host}:${CFG.port} → ${CFG.to}`);
});
