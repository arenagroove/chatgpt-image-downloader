# Quick Installation Guide

This guide explains how to install and use **ChatGPT Image Downloader** in Firefox.  
No setup scripts or build tools are required.

---

## 🧩 Step-by-Step Installation

### 1. Download the Extension

You have two options:

**Option A – ZIP file**
- Download `chatgpt-image-downloader.zip`
- Extract it to a folder on your computer

**Option B – Clone the repository**
- Clone via Git:
  ```
  git clone https://github.com/arenagroove/chatgpt-image-downloader.git
  ```
- The folder `chatgpt-image-downloader` will contain all required files

---

### 2. Load in Firefox

1. Open **Firefox**
2. Type `about:debugging` in the address bar and press **Enter**
3. Click **This Firefox** in the sidebar
4. Click **Load Temporary Add-on...**
5. Navigate to the folder containing the extension files
6. Select **manifest.json**
7. Click **Open**

✅ **Done!** The extension is now installed and active.

> **Note:** After installing, visit `chatgpt.com` and navigate to the **Images hub**.  
> The extension will automatically capture authentication headers when you interact with ChatGPT.

---

### 3. First Use

1. Go to **https://chatgpt.com/images** and make sure you're logged in
2. The **floating panel** will appear automatically in the top-right corner
3. If you see **"✓ Authenticated"** in the panel, you're ready to go
4. If not, interact with the page (scroll, click) to trigger authentication capture
5. Click **Fetch Images** in the panel
6. Once the image list loads, click **Download All**

All your generated images will be saved to:  
`Downloads/chatgpt-images/`

> Legacy routes under `chatgpt.com/library` are supported where still available.

---

## 🎨 Using the Interface

### Panel Controls

The extension uses a **floating panel** that appears only on the ChatGPT Images hub:

- **Collapse / Expand** – Click the `−` button in the panel header to minimize it to header-only. Click `+` to expand it again.
- **Drag to Reposition** – Click and hold the panel header (not the buttons) to drag it anywhere on screen.
- **Fetch Images** – Loads your image list from the ChatGPT API (up to 9000 images).
- **Download All** – Starts downloading all fetched images sequentially.
- **Pause / Resume** – Control the download process mid-operation.
- **Fetch Again** – After a download completes, refresh the image list to check for new images.

### Download Process

1. Click **Fetch Images** – the panel will show how many images were found
2. Click **Download All** – watch the real-time progress bar
3. Use **Pause** to pause the download if needed
4. Click **Resume** to continue from where you paused
5. Downloads continue in the background even if you collapse the panel or switch tabs

---

## ⚠️ Important Notes

- **Temporary Installation:**  
  Firefox removes temporary add-ons after restart.  
  To keep it permanently, reload it manually via `about:debugging` each time, or submit/sign it through addons.mozilla.org.

- **Images Hub Only:**  
  The panel appears **only on the Images hub** (`chatgpt.com/images`)  
  and legacy Library routes where still available.  
  It will not appear on regular chat pages.

- **Auth Expiration:**  
  ChatGPT authentication tokens expire after ~1 hour.  
  Simply refresh the Images hub and interact with ChatGPT to renew it automatically.

- **Download Limits:**  
  The extension supports up to **9000 images** per fetch (ChatGPT API limit).  
  Downloads are sequential with a 200 ms delay to prevent rate limiting.

- **Background Downloads:**  
  Downloads run in the background script and continue even if you:
  - Collapse the panel
  - Switch to other tabs
  - Minimize the browser window

---

## 🧠 Troubleshooting

### "This extension could not be installed"
- Ensure you selected `manifest.json`, not another file
- Check that all required files are in the same folder

### Panel doesn't appear
- Make sure you're on the **Images hub** (`chatgpt.com/images`)
- The panel only shows on Images pages, not on chat pages
- Try refreshing the page
- Check the browser console (F12) for errors

### "✗ Not authenticated"
1. Make sure you're logged in to `chatgpt.com`
2. Interact with the page (scroll, click anywhere)
3. Wait a few seconds for auth capture
4. Check the panel status again
5. If still failing, refresh the page and retry

### "API returned 401" or fetch fails
- Your session may have expired
- Refresh the Images hub to renew authentication
- Log out and log back in to ChatGPT if the issue persists

### Downloads not starting
- Confirm Firefox has permission to download multiple files
- Check **Firefox Settings → Privacy & Security → Permissions → Downloads**
- Look for any download confirmation dialogs that may be blocking
- Review console errors under **F12 → Console**

### Can't drag the panel
- Click and hold on the **header area** (the title text), not on buttons
- Don't click on the collapse button (`−` or `+`) when trying to drag
- The cursor should change to a "move" icon when hovering over draggable areas

### Progress bar doesn't update
- This is normal for very fast downloads
- Check your Downloads folder to verify files are being saved
- Progress updates occur every ~200 ms during active downloads

---

## 🛠️ Development Mode

### Making Changes
1. Edit the code files (`background.js`, `panel.js`, etc.)
2. Go to `about:debugging`
3. Click **Reload** next to the extension
4. Refresh the Images hub page to see changes

### Debugging
- **Background script logs:** `about:debugging` → click **Inspect** next to the extension
- **Content script logs:** Images hub page → press **F12** → Console tab

### Console Messages

**Background:**
```
✅ ChatGPT Image Downloader background active
🎯 Starting download of N images
📊 Progress: X / N
✅ Download complete: N success, M failed
```

**Panel (Images hub):**
```
🎨 ChatGPT Image Downloader panel script loaded
📨 Panel received message: progress
✅ Complete: N success, M failed
```

---

## 📁 Required Files

```
chatgpt-image-downloader/
├── .gitignore
├── background.js
├── CHANGELOG.md
├── icon48.png
├── icon96.png
├── INSTALL.md
├── manifest.json
├── panel.js
├── README.md
└── VERSION.md
```

---

## 🚀 Quick Reference

### Installation Steps
1. Download or clone the repository
2. Open `about:debugging` in Firefox
3. Load `manifest.json` as temporary add-on
4. Visit `chatgpt.com/images`
5. Panel appears automatically

### Usage Steps
1. Panel shows on Images hub
2. Click **Fetch Images**
3. Click **Download All**
4. Watch progress bar
5. Files saved to `Downloads/chatgpt-images/`

---

**Version:** 2.1.1  
**Release Date:** December 2025  
**Status:** Stable  
**License:** MIT License
