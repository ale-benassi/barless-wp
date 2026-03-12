# Chrome Web Store Submission Notes

## Suggested title

Barless WP: WordPress Admin Bar Toggle

## Suggested short description

Hide or restore the WordPress admin bar, with optional per-site persistence across reloads.

## Suggested detailed description

Barless WP: WordPress Admin Bar Toggle gives you a one-click way to hide or restore the WordPress admin bar on
the current site.

Use the toolbar button to toggle the admin bar instantly while you browse or edit a WordPress site.
If you want that preference to persist, enable `Remember hidden state on reload` in the extension
settings and the extension will remember the hidden state per site origin.

The extension only works when a page actually contains the WordPress admin bar. It does not add
remote services, analytics, or tracking, and it stores only the minimum local settings required to
remember your preference.

## Suggested single purpose field

Hide or restore the WordPress admin bar on the current site, with an optional per-site setting to
keep it hidden after reloads.

## Permissions justification

- `storage`: stores the persistence preference and per-site hidden state
- `http://*/*` and `https://*/*`: required so the extension can detect the WordPress admin bar on
  arbitrary WordPress sites and restore the hidden state after reload when the user enables that
  feature

## Privacy practices draft

- User data collected: none
- Data sold: no
- Data shared with third parties: no
- Purpose of storage: extension settings only

## Manual submission checklist

- Upload the generated zip from `dist/`
- Set category, language, and support contact in the Developer Dashboard
- Publish the privacy policy from `PRIVACY.md` at a public URL and add that URL in the dashboard
- Add at least one current 1280x800 or 640x400 screenshot that reflects the actual extension
  experience
- Prepare a 440x280 small promo tile for the Store Listing tab
- Prepare a 1400x560 marquee image if you want feature-ready promotional artwork
- Review the privacy fields so they match the extension behavior exactly
