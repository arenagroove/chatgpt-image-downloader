# ChatGPT Image Downloader
## Version 1.1.0

### What's Included

📦 **Complete Firefox Extension Package**

**Core Files:**
- `manifest.json` – Extension configuration  
- `background.js` – Authentication capture + background download logic  
- `popup.html` – Extension user interface  
- `popup.js` – UI behavior and messaging system  
- `icon48.png` – 48×48 toolbar icon  
- `icon96.png` – 96×96 store icon  

**Documentation:**
- `README.md` – Complete user documentation  
- `INSTALL.md` – Quick installation guide  
- `CHANGELOG.md` – Version history  
- `VERSION.md` – This file  

**Total Size:** ~10 KB (compressed)

---

### Features

✨ **What it does:**
- Automatically captures ChatGPT authentication headers  
- Fetches all images from your ChatGPT library (up to 9000)  
- Downloads images in full resolution and correct format  
- Displays live progress and statistics  
- Organizes files under `Downloads/chatgpt-images/`  
- Keeps downloads running even if popup closes  
- Offers **“Open in Window”** mode for persistent UI  

🔒 **Privacy:**
- No telemetry or tracking  
- No external servers or uploads  
- All processing runs locally in your browser  
- Tokens are stored temporarily (1-hour expiry)  
- 100% open source and auditable  

---

### System Requirements

- **Browser:** Firefox 60 or later  
- **OS:** Windows, macOS, or Linux  
- **Account:** Active ChatGPT account with generated images  

> After first installation, refresh any open `chatgpt.com` tabs before using the extension.

---

### Known Limitations

1. **Temporary Installation:** Must be reloaded after Firefox restart (unless signed).  
2. **Auth Expiry:** Token expires after ~1 hour (refresh `chatgpt.com` to renew).  
3. **API Limit:** Maximum 9000 images per fetch.  
4. **Sequential Downloads:** Images download one at a time to prevent rate limiting.  

---

### Future Improvements

Potential features for upcoming versions:

- [ ] Batch download limits and parallel control  
- [ ] Search and filter by date range  
- [ ] Thumbnail preview and metadata export  
- [ ] Custom folder organization options  
- [ ] Automatic periodic backups  
- [ ] Chrome support build  

---

### Technical Stack

- **Manifest Version:** 2 (Firefox standard)  
- **APIs Used:**  
  - **WebRequest API** – Authentication header capture  
  - **Storage API** – Temporary token storage  
  - **Downloads API** – File download management  
- **Backend:** ChatGPT Backend API  
- **Languages:** JavaScript, HTML, CSS  

---

### Credits

Created for ChatGPT users who want to back up their AI-generated artwork.

**Inspired by:** The community need for bulk image export functionality.  

**Special Thanks:**  
- OpenAI for ChatGPT  
- Firefox Developer Community  
- All testers and contributors providing feedback  

---

### Support

- Check **README.md** for troubleshooting.  
- Refer to **INSTALL.md** for setup details.  
- Submit issues or suggestions via GitHub.  

---

### License

MIT License  

Copyright (c) 2025  

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the “Software”), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  

---

**Version:** 1.1.0  
**Release Date:** November 2025  
**Status:** Stable  
