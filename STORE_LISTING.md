# Chrome Web Store Submission Notes

Listing description and URL updates submitted on November 17, 2026.
Status: pending Google review, with automatic publication enabled after approval.
The submission uses the existing version 1.0.2 package.

## Title (from package)

Barless WP - Hide WordPress Admin Bar / Toolbar Toggle

## Summary (from package)

Hide or show the WordPress admin bar (toolbar) instantly with a one-click toggle. Remembers your preference per site.

## Submitted detailed description

Barless WP lets you hide or restore the WordPress admin bar with one click. Preview layouts,
inspect elements, and check your work while staying logged in to WordPress.

Click the extension's toolbar icon to hide the bar, then click again to bring it back. Your choice
is remembered per site across reloads by default. You can turn persistence off in the extension's
settings; doing so clears saved site preferences.

Key features

- One-click toggle for the standard WordPress admin bar
- Per-site memory across reloads, enabled by default
- A settings option to turn persistence off
- A toolbar icon that reflects whether the bar is visible or hidden
- Free and open source under the MIT license

Barless WP works on pages that contain the standard WordPress admin bar. It is useful for
developers, designers, and anyone reviewing a WordPress site's appearance in their browser.

Privacy

The extension includes no analytics, tracking, or third-party scripts and sends no browsing data
to a server. Saved site origins stay in local extension storage. The persistence preference uses
Chrome's sync storage and may sync between browsers signed in to the same account.

Open source

Read the code, report a bug, suggest an improvement, or contribute on GitHub.

Source code: https://github.com/ale-benassi/barless-wp
Bug reports and suggestions: https://github.com/ale-benassi/barless-wp/issues
Created by Alessandro Benassi: https://alebenassi.com

## Submitted listing links

| Field | URL |
| --- | --- |
| Official URL / verified publisher | https://alebenassi.com |
| Homepage URL | https://alebenassi.com |
| Support URL | https://github.com/ale-benassi/barless-wp/issues |
| Privacy policy | https://barless-wp.alebenassi.com |

## Suggested single purpose field

Hide or restore the WordPress admin bar on the current site, with a per-site setting to keep it
hidden after reloads.

## Permissions justification

- `storage`: stores the persistence preference and per-site hidden state
- `http://*/*` and `https://*/*`: required so the extension can detect the WordPress admin bar on
  arbitrary WordPress sites and restore the hidden state after reloads on the sites where the user
  has hidden the bar

## Privacy practices

- Store disclosure: Web history; saved site origins are stored in local extension storage
- Data sold: no
- Data shared with third parties: no
- Purpose of storage: persistence preference and saved site origins

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
- Use the published policy at `https://barless-wp.alebenassi.com`, whose source is `privacy-policy/PRIVACY.md`
- Add at least one current 1280x800 or 640x400 screenshot that reflects the actual extension
  experience
- Prepare a 440x280 small promo tile for the Store Listing tab
- Prepare a 1400x560 marquee image if you want feature-ready promotional artwork
- Review the privacy fields so they match the extension behavior exactly
