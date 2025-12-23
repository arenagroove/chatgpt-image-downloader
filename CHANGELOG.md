# Changelog

All notable changes to **ChatGPT Image Downloader** are documented here.

---

## [2.1.1] — 2025-12-XX

### 🔧 Overview
Compatibility and documentation update to align with ChatGPT’s **Images hub** UI changes.  
No feature changes or behavior regressions from v2.1.0.

---

### 🛠 Changed
- **Images Hub Detection** — Panel now appears on `chatgpt.com/images`
- **Legacy Support** — `/library` routes remain supported where still available
- **Updated Terminology** — Replaced “Library” references with “Images hub” across UI and docs
- **Metadata Sync** — Manifest, INSTALL, VERSION, and BUILD docs updated for accuracy

---

### 🐛 Fixed
- **Panel Visibility Issue** — Panel no longer fails to appear due to route change from `/library` to `/images`

---

### 🧾 Documentation
- `INSTALL.md` — Updated URLs and usage instructions
- `VERSION.md` — Version bumped to 2.1.1 with corrected release date
- `BUILD.md` — Updated XPI filenames, version numbers, and dates
- `CHANGELOG.md` — This entry

---

## [2.1.0] — 2025-11-05

### 🚀 Overview
Feature enhancement release adding **image selection**, **detailed error reporting**, and **improved theming**.  
Users can now preview thumbnails, select specific images, and see exactly which downloads failed and why.

---

### ✨ Added
- **Image Selection Interface** — Preview all images with thumbnails before downloading
- **Select/Deselect All Buttons** — Quick bulk selection controls in image list header
- **Individual Checkboxes** — Choose specific images to download with one click
- **Thumbnail Previews** — Fast-loading 60x60px previews using API thumbnail URLs
- **Selection Counter** — Live count showing how many images are currently selected
- **Detailed Error Reporting** — Collapsible section showing failed downloads with title, reason, and position
- **Error Details Modal** — See exactly which images failed and why (title, error message, position in queue)
- **Unified Color System** — Coherent blue (actions), red (errors), green (success), gray (neutral) color scheme

---

### 🛠 Changed
- **Themed Checkboxes** — Custom-styled checkboxes with blue check mark that match light/dark mode
- **Improved Button Hover States** — Subtle, consistent hover effects without color changes
- **Better Dark Mode Support** — Enhanced contrast and readability across all UI elements
- **Non-Selectable Text** — Prevents accidental text selection for cleaner interactions
- **Panel z-index Adjusted** — Now set to 5 instead of 999999 to not block ChatGPT UI elements
- **Stop Button Theming** — Properly uses theme background in dark mode, consistent red border
- **Extended Completion Display** — Status messages stay visible for 8 seconds (up from 3)
- **Error Section Theming** — Uses neutral gray background with red accents, not full red background

---

### 🐛 Fixed
- **Thumbnail Loading Performance** — Uses `encodings.thumbnail.path` instead of full-resolution images
- **Hover State Issues** — Stop button no longer gets stuck in hover state
- **Theme Inconsistencies** — Unified around blue/red/green/gray system
- **Progress Bar Styling** — Solid blue bar for cleaner look
- **Error Display** — Error details now show reliably after completion
- **Button Background Reset** — Stop and Pause buttons reset correctly after hover

---

### 🔒 Security & Privacy
- Fully local operation — no telemetry or remote API calls beyond chatgpt.com
- Tokens stored only in browser storage, never transmitted elsewhere
- Extension only active on `chatgpt.com` domain
- Background tasks use Firefox’s official APIs

---

### 🧩 Technical Notes
- **Manifest Version:** 2
- **Core Files:** `background.js`, `panel.js`
- **APIs Used:** `webRequest`, `storage`, `downloads`, `tabs`, `runtime`
- **Languages:** JavaScript (ES6+), HTML, CSS
- **Total Package Size:** ~35 KB (uncompressed)

---

## [2.0.0] — 2025-11-04

### 🚀 Overview
Major redesign release introducing the floating **panel-based UI** and background downloads.

---

### ✨ Added
- Floating panel interface on ChatGPT
- Collapsible and draggable panel
- Pause / Resume downloads
- Smart filenames from API metadata
- Multi-tab state synchronization
- Background download persistence

---

### 🗑 Removed
- Popup interface
- Toolbar icon interaction
- Standalone window mode

---

### 🧩 Technical Notes
- Panel-based architecture
- Background script–driven downloads
- Improved rate limiting prevention

---

## [1.1.0] — 2025-11-02
First stable release with popup UI and background downloads.

---

## [1.0.0]
Initial proof of concept.

---

**Latest Version:** 2.1.1  
**Latest Release Date:** December 2025  
**Status:** Stable  
**Architecture:** Panel-based UI with background downloads
