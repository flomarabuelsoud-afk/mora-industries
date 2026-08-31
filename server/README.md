# Questionnaire intake service

Receives submissions from `/questionnaire/` (document **CQ-FEP-01**), emails
them to the business mailbox with an Excel and a JSON attachment, sends the
client a confirmation, and keeps a copy on disk.

Node 18+, four dependencies, no database.

---

## What happens on a submission

1. The page POSTs one JSON body to `POST /api/questionnaire`.
2. The service checks the honeypot, the elapsed time and the per-IP rate.
3. It validates the same fields the page marks required, plus the consent box.
4. It builds an `.xlsx` laid out in the source workbook's seven sections.
5. **It writes the JSON and the workbook to `ARCHIVE_DIR` before sending
   anything** — a mail failure never loses a client's answers.
6. It emails `MAIL_TO` with `Reply-To` set to the client, so replying in the
   mail client reaches them directly.
7. It emails the client a confirmation with their own copy attached
   (`CONFIRM_CLIENT=false` turns this off).
8. It answers `{ ok: true, ref: "CQ-260830-4B28" }`, and the page shows the
   reference.

---

## Install on the VPS

```bash
sudo adduser --system --group --home /opt/mora-questionnaire mora
sudo mkdir -p /opt/mora-questionnaire /var/lib/mora-questionnaire/submissions
sudo chown -R mora:mora /opt/mora-questionnaire /var/lib/mora-questionnaire

# copy this folder's contents to /opt/mora-questionnaire, then:
cd /opt/mora-questionnaire
sudo -u mora npm ci --omit=dev      # or: npm install --omit=dev
sudo -u mora cp .env.example .env
sudo -u mora nano .env              # SMTP credentials and MAIL_TO
sudo chmod 600 .env
```

Then the service:

```bash
sudo cp mora-questionnaire.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now mora-questionnaire
sudo systemctl status mora-questionnaire
sudo journalctl -u mora-questionnaire -f
```

And nginx — paste `nginx.conf.snippet` into the site's existing `server { }`
block, then:

```bash
sudo nginx -t && sudo systemctl reload nginx
curl https://your-domain/api/questionnaire/health
# {"ok":true,"service":"cq-fep-01"}
```

The snippet serves the questionnaire page and the API from **one origin**, so
no CORS configuration is needed. `ALLOWED_ORIGINS` in `.env` only matters if
you split them across hosts.

---

## Configuration

Everything is in `.env` (see `.env.example`).

| Variable | Purpose |
|---|---|
| `HOST` / `PORT` | Listen address. Keep it on `127.0.0.1`; nginx terminates TLS. |
| `MAIL_TO` | Where answers land — currently `Business@omar-abuelsoud.com`. |
| `MAIL_FROM` | Envelope sender. Must be a mailbox your SMTP host will send as. |
| `MAIL_CC` | Optional second recipient. |
| `CONFIRM_CLIENT` | `false` to stop sending the client their copy. |
| `SMTP_*` | Any provider. Port 465 → `SMTP_SECURE=true`; 587 → `false`. |
| `ARCHIVE_DIR` | Where the JSON and Excel copies are written. |
| `MIN_SECONDS` | Reject submissions completed faster than this (default 20). |
| `MAX_PER_HOUR` | Submissions per IP per hour (default 6). |

**Deliverability.** `MAIL_FROM` should be on a domain with SPF and DKIM
pointing at the sending host, or the confirmation mail will land in spam. Use
your provider's SMTP relay rather than a local `sendmail`.

---

## When the questions change

`form-map.js` is generated, not written by hand — it mirrors the page's own
content model so the email and the workbook can never drift from the form.
After editing `../questionnaire/questionnaire.js`:

```bash
node build-form-map.js
sudo systemctl restart mora-questionnaire
```

It prints what it found, e.g. `12 groups, 53 questions, 24 option sets`.

---

## Endpoints

| Method | Path | Returns |
|---|---|---|
| `POST` | `/api/questionnaire` | `{ok:true, ref}` · `400 incomplete` · `400 bad_email` · `429 too_fast` · `429 rate_limited` · `500 server_error` |
| `GET` | `/api/questionnaire/health` | `{ok:true, service:"cq-fep-01"}` |

A submission that trips the honeypot gets `{ok:true}` with a throwaway
reference and is silently dropped — a bot that sees an error simply retries.

---

## Checking it without sending mail

Point `SMTP_HOST` at a local sink (MailHog, Mailpit, or any stub on
`127.0.0.1:1025`), set `MIN_SECONDS=1`, and post a body:

```bash
curl -X POST http://127.0.0.1:4010/api/questionnaire \
  -H 'Content-Type: application/json' \
  -d '{"lang":"en","elapsedMs":90000,"website":"","answers":{
       "clientName":"Test Co","formDate":"2026-08-30","projectTitle":"Test",
       "sector":"Detergents","contactName":"Tester","contactEmail":"t@example.com",
       "fxRate":"48.5","consent":true}}'
```

The archive folder should then hold a matching `.json` and `.xlsx` pair.

---

## Operating notes

- **Rate limiting is in-memory**, so it resets when the service restarts and
  is per-process. That is proportionate for a form this size; put it behind
  nginx's `limit_req` as well if the URL ever gets scraped.
- **The archive grows forever.** Each submission is roughly 20 KB. Prune or
  back up `ARCHIVE_DIR` on whatever schedule suits your retention policy —
  the answers are commercially sensitive and the folder is the system of
  record if a mail is ever lost.
- **Nothing is logged but a one-line receipt** (reference, client name, email,
  IP). Answer content never reaches the log.
- The systemd unit runs with `ProtectSystem=strict` and can only write
  `/var/lib/mora-questionnaire`. If you move `ARCHIVE_DIR`, update
  `ReadWritePaths` to match or the service will fail to write.
