# Barless WP: WordPress Admin Bar Toggle

A Chrome extension that toggles the WordPress admin bar on the current page and can optionally
remember the hidden state per site across reloads.

## Features

- One-click toolbar toggle for the WordPress admin bar
- Per-site persistence when the user enables `Remember hidden state on reload`
- No remote services, analytics, or third-party scripts

## Load locally

1. Open `chrome://extensions`
2. Enable Developer mode
3. Click `Load unpacked`
4. Select this folder

## Store packaging

Run:

```bash
./package-store.sh
```

This creates a submission zip in `dist/` with only the extension runtime files.

## Privacy

The extension only:

- checks whether the current page contains `#wpadminbar`
- injects local CSS to hide or show it
- stores a boolean setting in `chrome.storage.sync`
- stores hidden-site origins in `chrome.storage.local`

It does not transmit user data, page content, or browsing history to any server.
