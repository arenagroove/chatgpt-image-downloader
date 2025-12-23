# ChatGPT Image Downloader
## Version 2.1.1

### What's Included

📦 **Complete Firefox Extension Package**

**Core Files:**
- `manifest.json` — Extension configuration  
- `background.js` — Authentication capture + background download logic  
- `panel.js` — Floating panel UI injected into ChatGPT Images hub  
- `icon48.png` — 48×48 toolbar icon  
- `icon96.png` — 96×96 store icon  

**Documentation:**
- `README.md` — Complete user documentation  
- `INSTALL.md` — Quick installation guide  
- `CHANGELOG.md` — Version history  
- `VERSION.md` — This file  

**Development:**
- `.gitignore` — Git ignore rules  

**Total Size:** ~35 KB (uncompressed)

---

### Features

✨ **What it does:**
- Automatically captures ChatGPT authentication headers  
- Injects floating panel UI directly on the ChatGPT Images hub  
- Fetches all generated images from your account (up to 9000)  
- **Select specific images** with thumbnail previews and checkboxes  
- Downloads images in full resolution with smart filenames from API  
- Real-time progress tracking with success/fail counts  
- **Detailed error reporting** — see exactly which images failed and why  
- Pause and resume downloads mid-process  
- Collapsible panel interface (minimize to header-only)  
- Draggable panel — position anywhere on screen  
- Organizes files under `Downloads/chatgpt-images/`  
- Background downloads continue even when panel is collapsed  
- Multi-tab state synchronization  
- **Unified color system** — coherent theming across light and dark modes  

🔒 **Privacy:**
- No telemetry or tracking  
- No external servers or uploads  
- All processing runs locally in your browser  
- Tokens stored temporarily in browser storage  
- 100% open source and auditable  
- Only active on chatgpt.com domain  

---

### System Requirements

- **Browser:** Firefox 109 or later  
- **OS:** Windows, macOS, or Linux  
- **Account:** Active ChatGPT account with generated images  
- **Page:** ChatGPT Images hub (`chatgpt.com/images`)  

> The floating panel appears automatically when you visit the Images hub. No toolbar icon clicks needed.  
> Legacy `/library` routes are supported where still available.

---

### What's New in v2.1.1

🔧 **Compatibility Update:**
- Updated routing detection to support the new **ChatGPT Images hub**
- Panel now appears correctly on `/images`
- Legacy `/library` routes remain supported for backward compatibility

📝 **Documentation & Metadata:**
- Updated terminology across extension metadata and documentation
- Clarified scope and UI entry point to match current ChatGPT behavior

_No feature changes or regressions from v2.1.0._

---

### What's New in v2.1.0

🎯 **Image Selection:**
- **Thumbnail preview grid** — See small previews of all images before downloading
- **Select/Deselect All** — Quick bulk selection controls
- **Individual checkboxes** — Choose exactly which images to download
- **Selection counter** — Shows how many images are selected
- **Fast thumbnails** — Uses API thumbnail URLs for instant loading

🚨 **Error Reporting:**
- **Detailed failure information** — See title, reason, and position for each failed download
- **Collapsible error section** — View full details or minimize to save space
- **Error indicators** — Clear visual feedback when downloads fail
- **Persistent error log** — Review failures even after download completes

🎨 **Theme Improvements:**
- **Unified color system** — Blue for actions, red for errors, green for success, gray for neutral
- **Consistent checkboxes** — Custom styled checkboxes that match theme
- **Better dark mode** — Improved contrast and readability
- **Coherent hover states** — Subtle, consistent button feedback

✨ **UX Enhancements:**
- **Non-selectable text** — Cleaner interface, no accidental text selection
- **Better panel positioning** — z-index adjusted to not block ChatGPT UI elements
- **Improved button theming** — Stop button properly themed in dark mode
- **Smoother transitions** — 8-second delay before hiding completion messages

---

### Known Limitations

1. **Images hub only:** Panel appears only on `/images` (or legacy `/library`), not on chat pages  
2. **Temporary installation:** Must be reloaded after Firefox restart (unless signed)  
3. **Auth expiry:** Token expires after ~1 hour (refresh page to renew automatically)  
4. **API limit:** Maximum 9000 images per fetch (ChatGPT API restriction)  
5. **Sequential downloads:** Images download one at a time with 200ms delay to prevent rate limiting  
6. **Position not saved:** Panel position resets to top-right on page reload  

---

### Future Improvements

Potential features for upcoming versions:

- [ ] Remember panel position across sessions  
- [ ] Remember collapsed/expanded state  
- [ ] Remember selected images across sessions  
- [ ] Filter downloads by date range  
- [ ] Sort images by date, name, or size  
- [ ] Batch download with parallel control  
- [ ] Metadata export to CSV  
- [ ] Custom folder organization options  
- [ ] Keyboard shortcuts (Ctrl+A to select all, etc.)  
- [ ] Advanced filtering (by conversation, by model, etc.)  
- [ ] Download statistics and history  

---

### Technical Stack

- **Manifest Version:** 2 (Firefox standard)  
- **Architecture:**  
  - **background.js** — Persistent background script for downloads and auth
  - **panel.js** — Content script injected into Images hub
- **APIs Used:**  
  - **WebRequest API** — Authentication header capture  
  - **Storage API** — Token storage  
  - **Downloads API** — File download management  
  - **Tabs API** — Cross-tab messaging  
  - **Runtime API** — Background-content communication  
- **Backend:** ChatGPT Backend API (`backend-api/my/recent/image_gen`)  
- **Languages:** JavaScript (ES6+), HTML, CSS  

---

### How It Works

1. **Authentication:** Extension monitors network requests to `backend-api` and captures Authorization headers
2. **UI Injection:** `panel.js` creates floating panel on Images hub page load
3. **Fetching:** Panel sends authenticated API request to fetch image list (up to 9000 items)
4. **Image Display:** Thumbnails rendered using `encodings.thumbnail.path` from API for fast loading
5. **Selection:** User checks/unchecks images to download, or uses Select All/Deselect All
6. **Downloading:** User clicks "Download All" → selected images sent to background script → sequential download with progress updates
7. **Error Tracking:** Failed downloads tracked with title, reason, and position → displayed in collapsible error section
8. **State Sync:** Download progress broadcasts to all open Images hub tabs via `tabs.sendMessage`
9. **Pause/Resume:** Background script maintains pause flag, content waits during paused state

---

### Migration from v2.0.x

**New Features:**
- Image selection interface with thumbnails
- Detailed error reporting
- Improved theming and UX

**Upgrade Steps:**
1. Remove old version from `about:debugging`
2. Load new version (manifest.json)
3. Visit `chatgpt.com/images` to see the updated interface

**Benefits:**
- Selective downloading — choose specific images
- Better error visibility — know exactly what failed
- Improved aesthetics — coherent color system
- Enhanced usability — smoother interactions

---

### Support

- Check **README.md** for complete documentation and troubleshooting  
- Refer to **INSTALL.md** for setup details  
- Review **CHANGELOG.md** for version history  
- Submit issues or suggestions via GitHub: https://github.com/arenagroove/chatgpt-image-downloader  

---

### License

MIT License  

Copyright (c) 2025  

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

---

**Version:** 2.1.1  
**Release Date:** December 2025  
**Status:** Stable  
**Architecture:** Panel-based UI with background downloads  
**Compatibility:** Firefox 109+
