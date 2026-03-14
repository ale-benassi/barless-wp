# Chrome Web Store Test Instructions

## Single purpose

Barless WP hides or restores the standard WordPress admin bar on sites where that bar is present.

## Reviewer flow

1. Install the extension.
2. Confirm that the settings page opens automatically in a new tab on first install.
3. Open any WordPress page while logged in so the standard admin bar is visible.
4. Click the extension toolbar icon.
5. Confirm that the admin bar hides immediately.
6. Reload the same page.
7. Confirm that the admin bar remains hidden after reload because persistence is enabled by
   default.
8. Open the extension settings page and disable `Remember hidden state on reload`.
9. Reload the same WordPress site again.
10. Confirm that the extension no longer restores the hidden state automatically.

## Permissions explanation

- `storage`: stores the on/off persistence preference and the per-site hidden-state map.
- `http://*/*` and `https://*/*`: required so the extension can detect the WordPress admin bar and
  restore the hidden state on the WordPress sites where the user has chosen to hide it.

## Data handling summary

The extension does not transmit, sell, or share user data. It stores only the minimum local
settings required to remember the user's preference.
