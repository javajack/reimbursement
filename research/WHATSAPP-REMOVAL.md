# DIRECTIVE: Remove WhatsApp entirely. PWA for all roles now, native apps over the API later.

The product does NOT use WhatsApp, or any third-party messaging app (Telegram, SMS-as-a-channel, etc.), for ANYTHING: not capture intake, not approvals, not notifications, not admin alerts, not marketing/sales. Remove every WhatsApp reference and replace it with the canon below. Keep everything else on the page intact and consistent.

## The notification-channel canon (BINDING, use these exact tokens)

Phase 1 has exactly three notification channels:
- `in_app` : a notifications inbox/bell inside the PWA/web Console, for every role.
- `web_push` : Web Push (VAPID / Web Push Protocol) to the installed PWA. Android Chrome full; iOS only when added to Home Screen (16.4+), so treat as best-effort there.
- `email` : transactional email (provider-agnostic: SES / Postmark / Resend class). Universal, the guaranteed channel, the iOS and non-installed fallback.

Reserved for the FUTURE native mobile apps (consuming the same API): `native_push` (FCM / APNs). Mention it only as the future path.

Wherever a page lists notification channels, an enum, a channel matrix, a webhook/notification example, or an audit "channel" field, the values are: `in_app`, `email`, `web_push` (and `native_push` only as future). There is NO `whatsapp` value anywhere. Audit channel-provenance for one-tap approvals: `web`, `web_push`, `email_link` (and `native_push` future).

## Substitutions by theme

- **Capture intake:** remove "WhatsApp-in" and "share from WhatsApp" as named paths. Intake = camera (the capture ladder), photo-library upload, email-in (per-company address), and the Android Web Share Target described generically as "share an image from the gallery or another app into a claim". Do not name any messaging app.
- **Approvals (approver one-tap):** approvers act in the PWA/web approver inbox (reached by web push on an installed PWA, or by an email notification), or via signed single-use, amount-bounded magic-link Approve / Send-back buttons in transactional email (step-up to the web app above a threshold). Optional Outlook Actionable Messages for M365 customers may stay (not WhatsApp). DELETE any WhatsApp utility-template nudge tier, the ₹0.115-0.145 per-message cost, the 24h service window, Meta recategorization, BSP/Gupshup/Interakt.
- **Soft-paywall "nudge admin" + credit alerts:** the employee one-tap nudge and admin alerts (50/80/95/100%) go via `in_app` + `email` + `web_push` (if installed). Not WhatsApp.
- **Costs (unit economics, non-functionals cost envelope, credits page):** remove WhatsApp per-message costs. Notification COGS = web push (free) + transactional email at roughly ₹0.05 to 0.20 per email (SES/Postmark-class, indicative, our derivation). This is cheaper than WhatsApp, so the ₹1.0-2.5 per-submission COGS band HOLDS (or eases); keep the band, change only the line item. Do not introduce new unsupported numbers beyond the indicative email cost.
- **Integrations spec:** DELETE the WhatsApp BSP adapter and its template catalog entirely. Replace the notifications integration section with: (a) transactional EMAIL (provider-agnostic adapter; SPF/DKIM/DMARC; bounce/complaint handling; the per-company email-in address stays), and (b) WEB PUSH (VAPID keys, subscription storage per device, encrypted payloads, TTL). Note future native push (FCM/APNs) over the API. Keep email-in, Tally, payroll, payout-partner, webhooks unchanged.
- **Architecture / external systems:** the external system list loses "WhatsApp BSP" and gains/keeps an email provider and a web-push service; native push is future.
- **Ops runbooks:** replace the "WhatsApp template rejection / recategorization" runbook with an EMAIL-DELIVERABILITY runbook (SPF/DKIM/DMARC alignment, bounce and complaint-rate monitoring, sender reputation, fallback to in_app) and a web-push delivery-health note.
- **Compliance (data-protection, audit-and-retention):** remove WhatsApp channel-consent notes; consent/notice now covers email + web push. Audit channel provenance enum is web / web_push / email_link (+ native_push future), never WhatsApp.
- **Personas:** approvers are "mobile-PWA and email-first" (not "WhatsApp-first"). Field employees use the installable PWA; remove any "forward from WhatsApp" capture habit.
- **GTM / whitespace / pricing positioning:** DELETE "WhatsApp-first approvals" as a wedge or India-depth pillar; replace that pillar with "an installable PWA with offline-first field capture and no app-store dependency, the same app for every role". DELETE "founder-led WhatsApp sales"; replace with founder-led email, calls, community (SaaSBoomi), and content. If a capture demo is mentioned, it is shown in the PWA, not over WhatsApp. In the India recharge-pack pricing-psychology argument, drop the "WhatsApp per-message billing" example and keep telecom prepaid + Tally TSS as the precedents.
- **Glossary:** remove "BSP" and the WhatsApp "utility template" entry. Add "Web Push / VAPID", "transactional email", and keep "magic link". Keep PWA, WebAPK, TWA, service worker, etc.
- **Reference / sources:** remove WhatsApp-pricing and Meta-rate-card source links that no longer back any claim (they backed the deleted WhatsApp costs). Keep all other sources. If a source backed BOTH WhatsApp and a surviving claim, keep it.
- **PWA-in-India narrative:** "works in WhatsApp's in-app browser" becomes "works in third-party in-app browsers"; iOS notification fallback is email (and in_app), not WhatsApp.

## Rules
- Do not introduce em dashes; keep MDX-safe; keep canonical names from THESIS-V2 and the notification-channel enum above.
- Do not invent numbers beyond the indicative email cost (₹0.05-0.20/email, our derivation). Where you remove a WhatsApp cost line, the surrounding totals must still add up; if a total was partly WhatsApp, recompute or restate qualitatively.
- Preserve page structure, voice, tables, code, and all non-WhatsApp content and cross-links. Edit ONLY your assigned page.
