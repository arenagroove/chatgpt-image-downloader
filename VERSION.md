# ChatGPT Image Downloader
## Version 2.0.0

### What's Included

📦 **Complete Firefox Extension Package**

**Core Files:**
- `manifest.json` – Extension configuration  
- `background.js` – Authentication capture + background download logic  
- `panel.js` – Floating panel UI injected into Library page  
- `icon48.png` – 48×48 toolbar icon  
- `icon96.png` – 96×96 store icon  

**Documentation:**
- `README.md` – Complete user documentation  
- `INSTALL.md` – Quick installation guide  
- `CHANGELOG.md` – Version history  
- `VERSION.md` – This file  

**Development:**
- `.gitignore` – Git ignore rules  

**Total Size:** ~30 KB (uncompressed)

---

### Features

✨ **What it does:**
- Automatically captures ChatGPT authentication headers  
- Injects floating panel UI directly on Library page  
- Fetches all images from your ChatGPT library (up to 9000)  
- Downloads images in full resolution with smart filenames from API  
- Real-time progress tracking with success/fail counts  
- Pause and resume downloads mid-process  
- Collapsible panel interface (minimize to header-only)  
- Draggable panel – position anywhere on screen  
- Organizes files under `Downloads/chatgpt-images/`  
- Background downloads continue even when panel is collapsed  
- Multi-tab state synchronization  

🔒 **Privacy:**
- No telemetry or tracking  
- No external servers or uploads  
- All processing runs locally in your browser  
- Tokens stored temporarily in browser storage  
- 100% open source and auditable  
- Only active on chatgpt.com domain  

---

### System Requirements

- **Browser:** Firefox 60 or later  
- **OS:** Windows, macOS, or Linux  
- **Account:** Active ChatGPT account with generated images  
- **Page:** ChatGPT Library page (`chatgpt.com/library`)  

> The floating panel appears automatically when you visit the Library page. No toolbar icon clicks needed.

---

### What's New in v2.0.0

🎉 **Major UI Redesign:**
- **Removed popup interface** – No more toolbar icon clicks
- **Floating panel on Library page** – Direct, always-visible interface
- **Collapsible design** – Click `−` to minimize, `+` to expand
- **Draggable interface** – Reposition panel anywhere on screen
- **Enhanced UX** – Cleaner, more intuitive controls

🚀 **Improved Functionality:**
- **Smart filenames** – Uses image titles/prompts from ChatGPT API
- **Pause/Resume** – Control downloads mid-process
- **Better progress tracking** – Real-time updates with success/fail counts
- **Multi-tab sync** – Download state syncs across Library tabs
- **Background persistence** – Downloads continue when panel is collapsed

🔧 **Technical Improvements:**
- **Simplified architecture** – 2 core files (background.js + panel.js)
- **Better error handling** – More informative status messages
- **Improved authentication** – Automatic capture from backend-api requests
- **Enhanced reliability** – Downloads continue regardless of UI state

---

### Known Limitations

1. **Library page only:** Panel appears only on `/library` page, not on chat pages  
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
- [ ] Filter downloads by date range  
- [ ] Download selected images only  
- [ ] Batch download with parallel control  
- [ ] Thumbnail preview mode  
- [ ] Metadata export to CSV  
- [ ] Custom folder organization options  
- [ ] Keyboard shortcuts  
- [ ] Dark mode theme  
- [ ] Chrome support build  

---

### Technical Stack

- **Manifest Version:** 2 (Firefox standard)  
- **Architecture:**  
  - **background.js** – Persistent background script for downloads and auth
  - **panel.js** – Content script injected into Library page
- **APIs Used:**  
  - **WebRequest API** – Authentication header capture  
  - **Storage API** – Token storage  
  - **Downloads API** – File download management  
  - **Tabs API** – Cross-tab messaging  
  - **Runtime API** – Background-content communication  
- **Backend:** ChatGPT Backend API (`backend-api/my/recent/image_gen`)  
- **Languages:** JavaScript (ES6+), HTML, CSS  

---

### How It Works

1. **Authentication:** Extension monitors network requests to `backend-api` and captures Authorization headers
2. **UI Injection:** `panel.js` creates floating panel on Library page load
3. **Fetching:** Panel sends authenticated API request to fetch image library (up to 9000 items)
4. **Downloading:** User clicks "Download All" → images sent to background script → sequential download with progress updates
5. **State Sync:** Download progress broadcasts to all open Library tabs via `tabs.sendMessage`
6. **Pause/Resume:** Background script maintains pause flag, content waits during paused state

---

### Migration from v1.x

**Breaking Changes:**
- No more popup interface – panel appears directly on Library page
- No more "Open in Window" feature – panel is always visible on Library page
- No more toolbar icon – extension works automatically when on Library page

**Upgrade Steps:**
1. Backup any custom settings (none needed for this extension)
2. Remove old version from `about:debugging`
3. Load new version (manifest.json)
4. Visit `chatgpt.com/library` to see the new panel interface

**Benefits:**
- Faster workflow – no toolbar icon clicks needed
- Better UX – interface integrated into page
- More control – collapsible, draggable panel
- Enhanced features – pause/resume, better progress tracking

---

### Support

- Check **README.md** for complete documentation and troubleshooting  
- Refer to **INSTALL.md** for setup details  
- Review **CHANGELOG.md** for version history  
- Submit issues or suggestions via GitHub: [arenagroove/chatgpt-image-downloader](https://github.com/arenagroove/chatgpt-image-downloader)  

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

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  

---

**Version:** 2.0.0  
**Release Date:** November 2025  
**Status:** Stable  
**Architecture:** Panel-based UI with background downloads  
**Compatibility:** Firefox 60+