# Sterling Commerce Solutions

Premium e-commerce development and Google Merchant Center compliance consulting website.

## Deployment

- Source: `sloanesterlingco/sterling-commerce-solutions`
- Vercel: linked to the main branch
- Public preview: https://sterling-commerce-solutions.vercel.app/
- Intended branded domain: `sterlingcommercesolutions.com` (connect after DNS verification)

## Inquiry submission

The frontend has a guided intake form and a serverless endpoint at `/api/inquiry`. The form safely stays in **local draft mode** until email delivery is configured. It does not falsely report a submission.

Set these **server-side Vercel environment variables** for Production (and Preview if desired):

- `RESEND_API_KEY` — secret API key for a Resend account with a verified sending domain.
- `RESEND_FROM_EMAIL` — verified address for outbound inquiry notifications, such as `Sterling Commerce Solutions <inquiries@sterlingcommercesolutions.com>`. The address must actually exist/meet Resend sending-domain requirements.
- `INQUIRY_TO_EMAIL` — actual inbox that should receive new inquiries.
- `ALLOWED_INQUIRY_ORIGINS` (optional) — comma-separated extra allowed HTTPS hostnames, if using more domains than the built-in production hosts.

Then redeploy and test `GET /api/inquiry` returning `{"ready":true}`. Submit a test inquiry and confirm inbox receipt and Reply-To before advertising.

**Security:** Secrets stay in Vercel, not GitHub. The endpoint validates required inputs, email and URL formats, origin, message length, and an anti-bot honeypot. For high-volume public traffic, add durable IP-based rate limiting and a managed bot challenge (such as Turnstile), and publish a privacy policy before inviting real customer submissions. Do not log health or payment information. Avoid requesting passwords or Google credentials through the form.

**Merchant Center:** Assess prior account restrictions before engagement. No approvals are guaranteed and no circumvention services are offered.

## Before launch

- Confirm legal company name, business mailing address, working contact email, and published legal/privacy disclosures.
- Confirm final service tiers and scope/prices with the owner.
- Verify live portfolio links and seller marketplace obligations for Sterling Hat Co.
- Confirm branded domain DNS and HTTPS.
- Test desktop/mobile navigation, package estimator, accessibility, and receipt of consultation emails.
- Do not enable checkout or paid services without the owner's approval.
