# Chrome Web Store Submission Notes

## Suggested title

Barless WP: WordPress Admin Bar Toggle

## Suggested short description

Hide or restore the WordPress admin bar, with per-site persistence across reloads.

## Suggested detailed description

Barless WP: WordPress Admin Bar Toggle gives you a one-click way to hide or restore the WordPress
admin bar on the current site.

Use the toolbar button to toggle the admin bar instantly while you browse or edit a WordPress site.
The extension remembers hidden state per site origin across reloads by default, and you can turn
that behavior off from the settings page at any time.

The extension only works when a page actually contains the WordPress admin bar. It does not add
remote services, analytics, or tracking, and it stores only the minimum local settings required to
remember your preference.

## Suggested single purpose field

Hide or restore the WordPress admin bar on the current site, with a per-site setting to keep it
hidden after reloads.

## Permissions justification

- `storage`: stores the persistence preference and per-site hidden state
- `http://*/*` and `https://*/*`: required so the extension can detect the WordPress admin bar on
  arbitrary WordPress sites and restore the hidden state after reloads on the sites where the user
  has hidden the bar

## Privacy practices draft

- User data collected: none
- Data sold: no
- Data shared with third parties: no
- Purpose of storage: extension settings only

## Test instructions draft

1. Install the extension and confirm that the settings page opens automatically in a new tab on
   first install.
2. Visit any WordPress page while logged in so the standard admin bar is visible at the top of the
   page.
3. Click the toolbar icon. The admin bar should hide immediately.
4. Reload the same page. The admin bar should stay hidden because persistence is enabled by default.
5. Open the extension settings, disable `Remember hidden state on reload`, then revisit or reload
   the same site. The extension should stop restoring the hidden state automatically.

## Manual submission checklist

- Upload the generated zip from `dist/`
- Set category, language, and support contact in the Developer Dashboard
- Publish the privacy policy from `PRIVACY.md` at a public URL and add that URL in the dashboard
- Add at least one current 1280x800 or 640x400 screenshot that reflects the actual extension
  experience
- Prepare a 440x280 small promo tile for the Store Listing tab
- Prepare a 1400x560 marquee image if you want feature-ready promotional artwork
- Review the privacy fields so they match the extension behavior exactly
