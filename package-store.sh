#!/bin/sh

set -eu

VERSION="$(sed -n 's/.*"version": "\([^"]*\)".*/\1/p' manifest.json | head -n 1)"

if [ -z "$VERSION" ]; then
  echo "Could not determine version from manifest.json" >&2
  exit 1
fi

OUT_DIR="dist"
ZIP_NAME="barless-wp-wordpress-admin-bar-toggle-${VERSION}.zip"
ZIP_PATH="${OUT_DIR}/${ZIP_NAME}"
TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/hide-wordpress-admin-bar.XXXXXX")"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT INT TERM

mkdir -p "$OUT_DIR" "$TMP_DIR/icons"

cp LICENSE manifest.json background.js content.js options.html options.css options.js "$TMP_DIR/"
cp \
  icons/icon16.png \
  icons/icon32.png \
  icons/icon48.png \
  icons/icon128.png \
  icons/visible-16.png \
  icons/visible-32.png \
  icons/visible-48.png \
  icons/visible-128.png \
  icons/hidden-16.png \
  icons/hidden-32.png \
  icons/hidden-48.png \
  icons/hidden-128.png \
  "$TMP_DIR/icons/"

rm -f "$ZIP_PATH"

(
  cd "$TMP_DIR"
  zip -qr "$OLDPWD/$ZIP_PATH" .
)

printf 'Created %s\n' "$ZIP_PATH"
