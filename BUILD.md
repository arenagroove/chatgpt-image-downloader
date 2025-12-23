# Building the XPI

This guide explains how to build the `.xpi` file for distribution.

---

## Prerequisites

You need `web-ext` installed:

```bash
npm install -g web-ext
```

Or use `npx` without installing globally.

---

## Required Files

Before building, ensure these files are in the extension directory:

```
chatgpt-image-downloader/
├── background.js
├── panel.js
├── manifest.json
├── icon48.png          ← Required
├── icon96.png          ← Required
├── README.md
├── CHANGELOG.md
├── VERSION.md
└── .gitignore
```

**Icon files are required** — the build will fail without them.

---

## Build Command

### Option 1: Using web-ext (Recommended)

```bash
cd chatgpt-image-downloader
web-ext build
```

This creates:  
`web-ext-artifacts/chatgpt_image_downloader-2.1.1.xpi`

### Option 2: Using zip manually

```bash
cd chatgpt-image-downloader
zip -r -FS ../chatgpt-image-downloader-v2.1.1.xpi * \
  -x "*.git*" \
  -x "*node_modules*" \
  -x "*.DS_Store" \
  -x "web-ext-artifacts/*" \
  -x "*.zip"
```

---

## Signing (Optional)

For self-distribution (not on Mozilla Addons):

```bash
web-ext sign \
  --api-key=YOUR_JWT_ISSUER \
  --api-secret=YOUR_JWT_SECRET
```

This creates a signed `.xpi` that can be permanently installed in Firefox.

---

## Testing the XPI

### Load Unsigned (Temporary)

1. Go to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select the `.xpi` file

### Install Signed (Permanent)

1. Double-click the signed `.xpi` file
2. Firefox will prompt to install
3. Extension persists after browser restart

---

## Distribution

### GitHub Release

1. Create a new release tag: `v2.1.1`
2. Upload the `.xpi` file as an asset
3. Users can download and install directly

### Mozilla Addons (AMO)

1. Go to https://addons.mozilla.org/developers
2. Upload the `.xpi` file
3. Wait for review (~7–14 days)
4. Extension becomes permanently installable

---

## File Size

Current build size: **~35 KB** (uncompressed)

The `.xpi` file will be **~15–20 KB** (compressed)

---

## Verification

After building, verify the XPI contains all required files:

```bash
unzip -l web-ext-artifacts/chatgpt_image_downloader-2.1.1.xpi
```

Should show:
- manifest.json
- background.js
- panel.js
- icon48.png
- icon96.png
- Documentation files (optional but recommended)

---

## Common Issues

### "Missing icon files"

Make sure `icon48.png` and `icon96.png` exist in the root directory.

### "Invalid manifest"

Run `web-ext lint` to check for errors:

```bash
web-ext lint
```

### "Build artifacts not created"

Check that the `web-ext-artifacts/` directory is created automatically.  
If not, create it manually:

```bash
mkdir web-ext-artifacts
```

---

## Quick Reference

```bash
# Build XPI
web-ext build

# Lint manifest
web-ext lint

# Run in test browser
web-ext run

# Sign for self-distribution
web-ext sign --api-key=KEY --api-secret=SECRET
```

---

**Output:** `web-ext-artifacts/chatgpt_image_downloader-2.1.1.xpi`  
**Version:** 2.1.1  
**Date:** December 2025
