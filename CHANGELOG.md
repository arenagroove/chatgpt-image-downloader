# Changelog

All notable changes to **ChatGPT Image Downloader** are documented here.

---

## [2.0.0] – 2025-11-04

### 🚀 Overview
Major redesign release of the **ChatGPT Image Downloader** Firefox extension.  
Complete UI overhaul with floating panel interface, collapsible design, and enhanced user experience.

---

### ✨ Added
- **Floating Panel Interface** – Panel appears directly on ChatGPT Library page, no toolbar icon clicks needed.
- **Collapsible Panel** – Minimize panel to header-only view with `−` button, expand with `+` button.
- **Draggable Interface** – Click and drag panel header to reposition anywhere on screen.
- **Pause/Resume Downloads** – Control download process mid-operation with pause and resume functionality.
- **Smart Filenames** – Uses image titles/prompts from ChatGPT API for better organization.
- **Enhanced Progress Tracking** – Real-time progress bar with separate success/fail counters.
- **Multi-Tab State Sync** – Download state synchronizes across all open Library tabs.
- **Background Persistence** – Downloads continue even when panel is collapsed or minimized.
- **Library Page Detection** – Panel automatically appears only on `/library` routes.

---

### 🛠 Changed
- **Complete UI Redesign** – Removed popup interface entirely, replaced with floating panel.
- **Simplified Architecture** – Reduced to 2 core files: `background.js` and `panel.js`.
- **Removed popup.html and popup.js** – No longer needed with panel-based design.
- **Enhanced Authentication** – Automatic capture from `backend-api` requests without user interaction.
- **Improved Filename Handling** – Uses API metadata for titles instead of generic names.
- **Better Error Messages** – More informative status messages and error handling.
- **Refined Download Logic** – 200ms delay between downloads, better rate limiting prevention.
- **Updated All Documentation** – README, INSTALL, VERSION, and CHANGELOG align with v2.0.0.

---

### 🗑️ Removed
- **Popup Interface** – No more toolbar icon popup window.
- **"Open in Window" Mode** – Panel is always visible on Library page, no separate window needed.
- **Toolbar Icon Interaction** – Extension works automatically when on Library page.

---

### 🐛 Fixed
- **Drag-Collapse Conflict** – Added `e.stopPropagation()` to prevent drag when clicking collapse button.
- **State Synchronization Issues** – Improved message passing between background and content scripts.
- **Progress Update Reliability** – Enhanced real-time progress broadcast to all tabs.
- **Filename Sanitization** – Better handling of special characters and emojis in filenames.

---

### 🔒 Security & Privacy
- Fully local operation – no telemetry or remote API calls beyond chatgpt.com.
- Tokens stored only in browser storage, never transmitted elsewhere.
- Extension only active on `chatgpt.com` domain.
- Background tasks use Firefox's official APIs (`webRequest`, `downloads`, `storage`, `tabs`, `runtime`).

---

### 🧩 Technical Notes
- **Manifest Version:** 2
- **Core Files:** `background.js` (auth + downloads), `panel.js` (UI content script)
- **APIs Used:** `webRequest`, `storage`, `downloads`, `tabs`, `runtime`, `https://chatgpt.com/*`
- **Languages:** JavaScript (ES6+), HTML, CSS
- **Total Package Size:** ~30 KB (uncompressed)

---

### 📋 Migration from v1.x

**Breaking Changes:**
- No popup interface – panel appears directly on Library page
- No "Open in Window" feature
- No toolbar icon interaction

**Upgrade Steps:**
1. Remove v1.x from `about:debugging`
2. Load v2.0.0 via manifest.json
3. Visit `chatgpt.com/library` to see new panel

**Benefits:**
- Faster workflow – no clicks needed to open interface
- Better integration – UI embedded in page
- More control – collapsible, draggable panel
- Enhanced features – pause/resume, smart filenames

---

### 🧾 Documentation
- `README.md` – Complete user guide with v2.0.0 features
- `INSTALL.md` – Updated installation and usage guide
- `CHANGELOG.md` – This file
- `VERSION.md` – Version 2.0.0 reference

---

### 🧠 Summary
Version 2.0.0 represents a complete UX overhaul focused on simplicity and power.  
The floating panel design integrates seamlessly into the ChatGPT Library page,  
providing direct access to download controls without interrupting workflow.

---

## [1.1.0] – 2025-11-02

### 🚀 Overview
First stable release of the **ChatGPT Image Downloader** Firefox extension.  
Includes full functionality, background download capability, and popup interface.

---

### ✨ Added
- **Automatic Authentication** – Captures ChatGPT auth headers automatically.
- **Bulk Downloading** – Fetches and downloads up to 9000 images.
- **Background Processing** – Downloads continue even if popup closes or tab changes.
- **Persistent "Open in Window" Mode** – Optional standalone window that stays open.
- **Progress Tracking** – Displays download count, success/failure stats, and progress bar.
- **Duplicate Filename Handling** – Auto-detects duplicates and appends timestamps.
- **Sequential Download Queue** – Prevents server rate limiting.
- **Improved Error Handling** – Detects invalid tokens, fetch errors, permission issues.
- **Modern Minimal UI** – Clean, professional popup layout.

---

### 🛠 Changed
- Refactored all download logic into **background.js** for reliability.
- Popup communicates with background script through message passing.
- Simplified UI with clear feedback and status messages.
- Updated documentation to match new behavior.

---

### 🔒 Security & Privacy
- Fully local operation – no telemetry or remote calls beyond chatgpt.com.
- Tokens stored only in browser storage for 1 hour.
- Background tasks use Firefox's official APIs.

---

### 🧩 Technical Notes
- **Manifest Version:** 2
- **APIs Used:** `webRequest`, `storage`, `downloads`, `https://chatgpt.com/*`
- **Languages:** JavaScript, HTML, CSS
- **Total Package Size:** ~10 KB (compressed)

---

### 🧾 Documentation
- `README.md` – Full user guide and troubleshooting
- `INSTALL.md` – Quick setup instructions
- `CHANGELOG.md` – This file
- `VERSION.md` – Version reference

---

### 🧠 Summary
First stable release providing robust foundation for ChatGPT image downloading.  
Designed for reliability, transparency, and ease of use.

---

## [1.0.0] – Initial Development

### 🚀 Overview
Initial proof-of-concept version with basic functionality.

---

### ✨ Added
- Basic authentication capture
- Simple image fetching from ChatGPT API
- Basic download functionality
- Initial popup interface
- Progress bar

---

### 🧩 Technical Notes
- Initial architecture design
- Basic manifest configuration
- Proof of concept for auth capture and downloads

---

**Latest Version:** 2.0.0  
**Latest Release Date:** November 4, 2025  
**Status:** Stable  
**Architecture:** Panel-based UI with background downloads