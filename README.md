# Sterling Commerce Solutions

Premium e-commerce development, Google Merchant Center compliance consulting, Shopify storefront development and AI commerce technology.

## Deployment
- Repository: `sloanesterlingco/sterling-commerce-solutions`
- Production domain: https://sterlingcommercesolutions.com/
- Vercel preview: https://sterling-commerce-solutions.vercel.app/

## SEO foundation
- Descriptive page titles, meta descriptions, canonical URLs and social metadata.
- Organization, WebSite, Service and Article structured data where appropriate.
- Dedicated service landing pages under `/services/`.
- Original educational resources under `/resources/`.
- XML sitemap at `/sitemap.xml` and crawler guidance at `/robots.txt`.
- Privacy notice and general website terms.
- Helpful content is written to describe actual service scope and platform limitations. No ranking or Google approval outcome is guaranteed.

## Agentic search and AI discovery
- Read-only service search API: `GET /api/agent-search?q=<query>` or `?slug=<service-slug>`.
- OpenAPI description: `/openapi.json`.
- Agentic Resource Discovery manifest: `/.well-known/ard.json`.
- Human- and agent-readable site overview: `/llms.txt`.
- Optional WebMCP tools on the homepage: `search_sterling_commerce_services` and `get_sterling_commerce_service_details`. They expose public service information only and do not submit forms or make purchases.
- ARD, WebMCP, and AI crawlers do not guarantee indexing, citations, discovery, leads or sales.

## Inquiry delivery
The consultation form uses `/api/inquiry` and server-side Resend settings. Keep API keys in Vercel environment variables only. Verify that production email delivery and the GoDaddy-hosted destination inbox work before advertising.

## Before public marketing launch
- Confirm consultation email delivery from production and test Reply-To.
- Verify Google Search Console ownership and submit `https://sterlingcommercesolutions.com/sitemap.xml`.
- Verify analytics and conversion measurement before activating Google Ads.
- Review privacy policy and terms with qualified counsel.
- Confirm all business disclosures and service prices match the signed customer agreements.
- Add rate limiting and managed bot protection to public inquiry submissions before scaling traffic.
- Review current Google Merchant Center policies before each remediation engagement.
