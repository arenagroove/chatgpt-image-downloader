# Changelog

All notable changes to **ChatGPT Image Downloader** are documented here.  
This is the first public version of the extension, marked as **v1.1.0**.

---

## [1.1.0] – 2025-11-02

### 🚀 Overview
First stable release of the **ChatGPT Image Downloader** Firefox extension.  
Includes full functionality, background download capability, and a redesigned interface.

---

### ✨ Added
- **Automatic Authentication** – Captures ChatGPT auth headers automatically.  
- **Bulk Downloading** – Fetches and downloads up to 9000 images.  
- **Background Processing** – Downloads continue even if popup closes or tab changes.  
- **Persistent “Open in Window” Mode** – Optional standalone window that stays open until closed by the user.  
- **Progress Tracking** – Displays download count, success/failure stats, and progress bar.  
- **Duplicate Filename Handling** – Auto-detects duplicates and appends timestamps.  
- **Sequential Download Queue** – Prevents server rate limiting and keeps stable flow.  
- **Improved Error Handling** – Detects invalid tokens, fetch errors, and permission issues.  
- **Modern Minimal UI** – Clean, professional, monochrome layout with clear feedback.

---

### 🛠 Changed
- Refactored all download logic into **background.js** for reliability.  
- Popup now communicates with background script through message passing.  
- Simplified UI: removed decorative elements and optimized layout spacing.  
- Revised all user messages and status feedback for clarity.  
- Updated README, VERSION, and INSTALL documentation to match new behavior.

---

### 🔒 Security & Privacy
- Fully local operation – no telemetry or remote API calls beyond chatgpt.com.  
- Tokens stored only in browser storage for 1 hour, never transmitted elsewhere.  
- Background tasks use Firefox’s official APIs (`webRequest`, `downloads`, `storage`).

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
This version introduces a robust and user-friendly foundation for the ChatGPT Image Downloader.  
It is designed for reliability, transparency, and ease of use — enabling creators to back up and manage their ChatGPT-generated images securely.

---

**Version:** 1.1.0  
**Release Date:** November 2, 2025  
**Status:** Stable  
