# ChatGPT Image Downloader — Firefox Extension

Download all your generated images from your ChatGPT **Images hub** with one click.  
Fast, safe, and completely local.

> **Update — Version 2.1.1**
>
> Small compatibility release to keep the extension working after ChatGPT moved the image Library to the new **Images hub** (`/images`).
>
> No new features added.  
> All functionality from v2.1.0 remains the same (thumbnails, selection, error reporting).
>
> **What changed:**
> - Support for the new Images hub route
> - Legacy `/library` still works where available
> - Documentation and metadata cleaned up and aligned

---

## ✨ Features

✅ **Automatic Authentication** — Captures ChatGPT auth token automatically  
✅ **Image Selection** — Preview thumbnails and choose specific images to download  
✅ **Bulk Download** — Fetch and download your entire image collection  
✅ **Full Resolution** — Saves images in original quality (WebP, PNG, JPG)  
✅ **Smart Filenames** — Uses image prompts/titles from API  
✅ **Detailed Error Reports** — See exactly which images failed and why  
✅ **Progress Tracking** — Real-time progress bar with success/fail counts  
✅ **Pause/Resume** — Control downloads mid-process  
✅ **Background Downloads** — Continue even when switching tabs  
✅ **Collapsible Panel** — Minimize interface when not in use  
✅ **Draggable Interface** — Position the panel anywhere on screen  
✅ **Dark Mode Support** — Adapts to ChatGPT light/dark theme  
✅ **Privacy-First** — Fully local operation, no telemetry

---

## 🧩 Installation

### Signed Installation (Recommended)

A signed Firefox extension build is available and installs normally.

🦊 **Firefox (signed, private install):**  
https://addons.mozilla.org/firefox/downloads/file/4649251/91a4dac48e75488d9bb1-2.1.1.xpi

> This link is private (not publicly listed on AMO yet).  
> If the add-on is published publicly later, this URL will redirect automatically.

---

### Temporary Installation (Development / Manual)

1. Download or clone this repository:  
   `git clone https://github.com/arenagroove/chatgpt-image-downloader.git`
2. Open **Firefox**
3. Visit `about:debugging`
4. Click **This Firefox**
5. Click **Load Temporary Add-on...**
6. Select **manifest.json**

> Temporary add-ons are removed when Firefox closes.

---

## 🚀 How to Use

### First-Time Setup

1. Go to **https://chatgpt.com/images** and make sure you are logged in
2. The floating panel appears automatically in the top-right corner
3. When authentication succeeds, you will see **✓ Authenticated**
4. If not authenticated, refresh the page and interact (scroll, click)

---

### Downloading Images

1. On the **Images hub** (or legacy Library page), click **Fetch Images**
2. A scrollable list of thumbnails appears with checkboxes
3. All images are selected by default
4. Use **Select All / Deselect All** or individual checkboxes
5. Click **Download All** to start downloading selected images
6. Monitor progress in real time
7. Images are saved to:

```
Downloads/chatgpt-images/
```

---

### Error Reporting

If downloads fail, a **collapsible error section** appears showing:
- Image title
- Failure reason
- Position in the queue

---

## 🎨 Interface

The extension uses a floating panel that appears on the ChatGPT **Images hub**  
(and legacy `/library` pages where available):

- Thumbnail preview grid
- Selection controls
- Collapsible sections
- Draggable panel
- Real-time progress updates
- Multi-tab state sync
- Dark mode compatible

---

## 🧠 Troubleshooting

### Panel does not appear
- Confirm you are on `https://chatgpt.com/images`
- Refresh the page
- Check console (F12) for errors

### Not authenticated
- Ensure you are logged in
- Interact with the page
- Refresh and retry

### API errors or 401
- Session expired, refresh page
- Log out and back in if needed

### Downloads not starting
- Confirm Firefox download permissions
- Ensure at least one image is selected

---

## 📁 File Structure

```text
chatgpt-image-downloader/
├── background.js
├── panel.js
├── manifest.json
├── icon48.png
├── icon96.png
├── README.md
├── INSTALL.md
├── CHANGELOG.md
├── VERSION.md
└── .gitignore
```

---

## 🔒 Privacy & Security

- Runs entirely in your browser
- No telemetry or analytics
- No external servers
- Tokens stored temporarily in browser storage
- Active only on `chatgpt.com`

---

## ⚙️ Technical Details

**Manifest Version:** 2 (Firefox)

**Core Files:**
- `background.js` — authentication capture and download queue
- `panel.js` — floating UI panel

**APIs Used:**
- `webRequest`
- `storage`
- `downloads`
- `tabs`
- `runtime`

**Download Behavior:**
- Sequential downloads with 200ms delay
- Only selected images downloaded
- Filename sanitization
- Detailed failure tracking

---

## ⚠️ Limitations

- Fetch limit: 9000 images
- Sequential downloads only
- Auth expires after ~1 hour
- Panel position not persisted
- Images hub / Library pages only

---

## 📜 Version History

### v2.1.1 (Current)
- Compatibility update for ChatGPT Images hub (`/images`)
- No functional changes

### v2.1.0
- Image selection with thumbnails
- Detailed error reporting
- Unified color system
- Improved dark mode
- Collapsible error section

### v2.0.0
- Floating panel UI
- Draggable and collapsible interface
- Pause / Resume
- Background downloads

---

## 🧾 License

MIT License

---

Made for ChatGPT creators who want full control of their AI-generated images.
