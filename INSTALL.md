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
  git clone https://github.com/yourusername/chatgpt-image-downloader.git
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

✅ **Done!** The extension is now installed and ready for use.  
You will see the **ChatGPT Image Downloader** icon in the Firefox toolbar (puzzle-piece menu).

> **Note:** After installing, refresh any open `chatgpt.com` tabs so the extension can capture authentication headers.

---

### 3. First Use

1. Go to **[chatgpt.com](https://chatgpt.com)** and make sure you’re logged in  
2. Click anywhere on the ChatGPT page (this captures authentication)  
3. Click the **ChatGPT Image Downloader** icon in your toolbar  
4. Click **Fetch Images**  
5. Once the image list loads, click **Download All**

All your generated images will be saved under:  
`Downloads/chatgpt-images/`

---

## ⚙️ Persistent Window (Optional)

If you prefer the interface to remain open while downloading:

1. Click the **Open in Window** button inside the popup  
2. A small standalone window will appear  
3. Downloads will continue even if you switch tabs or resize the browser  
4. Close the window once all downloads are complete

---

## ⚠️ Important Notes

- **Temporary Installation:**  
  Firefox removes unsigned extensions after restart.  
  To keep it permanently, submit or sign it through [addons.mozilla.org](https://addons.mozilla.org/) or reload it manually via `about:debugging`.

- **Auth Expiration:**  
  ChatGPT authentication tokens expire after ~1 hour.  
  Simply refresh `chatgpt.com` and click anywhere on the page to renew it.

- **Download Limits:**  
  The extension supports up to 9000 images per session (ChatGPT API limit).  
  Downloads are sequential to prevent rate limiting.

---

## 🧠 Troubleshooting

### “This extension could not be installed”
Ensure you selected `manifest.json`, not another file.

### Extension icon missing
Click the puzzle piece icon in the toolbar → find “ChatGPT Image Downloader” → click the pin icon to keep it visible.

### “Authentication not found”
1. Open **chatgpt.com**
2. Click anywhere on the page
3. Wait a few seconds
4. Reopen the extension and try again

### Downloads not starting
- Confirm Firefox has permission to download multiple files  
- Check for popup permissions or confirmation dialogs  
- Review any console errors under **F12 → Console**

---

## 🧾 Additional Documentation

For full details, see:  
- **README.md** – Complete documentation  
- **CHANGELOG.md** – Version history  
- **VERSION.md** – Current version info  

---

**Version:** 1.1.0  
**Release Date:** November 2, 2025  
**Status:** Stable  
**License:** MIT License
