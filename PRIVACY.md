# Privacy Policy

Last updated: March 12, 2026

Barless WP: WordPress Admin Bar Toggle is a browser extension that lets the user hide or restore
the WordPress admin bar on pages where that bar is present.

This extension does not sell, transmit, or share personal data with third parties.

## Information the extension accesses

The extension runs on `http` and `https` pages so it can determine whether the current page
contains the standard WordPress admin bar element (`#wpadminbar`).

If the admin bar is present, the extension can inject local CSS into the page to hide or restore
that bar based on the user's action and settings.

## Information the extension stores

The extension stores only the minimum data required for its single purpose:

- `persistHiddenState` in `chrome.storage.sync` to remember whether the user wants hidden-state
  persistence enabled
- a per-site map of hidden origins in `chrome.storage.local` to remember on which site origins the
  admin bar should remain hidden after a page reload

This data stays within Chrome extension storage and is used only to provide the extension's
hide-and-remember behavior.

## Information the extension does not collect or transmit

The extension does not:

- collect names, email addresses, passwords, payment details, or health information
- collect or store page content such as posts, comments, images, or form entries
- transmit browsing activity, site origins, or stored settings to any remote server
- use analytics, advertising, tracking, or third-party telemetry SDKs
- sell or transfer user data to third parties

## Data retention and control

The user can remove stored extension data at any time by:

- disabling the "Remember hidden state on reload" setting in the extension options, which clears the
  saved per-site hidden-state map
- removing the extension from Chrome, which removes its local extension storage

## Contact

Questions about this policy may be directed through the contact method provided on the extension's
store listing or publisher website.
