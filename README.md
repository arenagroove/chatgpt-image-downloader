# ChatGPT Image Downloader – Firefox Extension

Download all your generated images from your ChatGPT Library with one click.  
Fast, safe, and completely local.

---

## ✨ Features

✅ **Automatic Authentication** – Captures ChatGPT auth token automatically  
✅ **Bulk Download** – Fetch and download your entire image library  
✅ **Full Resolution** – Saves images in original quality  
✅ **Progress Tracking** – Real-time progress and stats  
✅ **Persistent Downloads** – Runs safely in background even if popup closes  
✅ **Optional Persistent Window** – “Open in Window” mode keeps the UI open  
✅ **Privacy-First** – No data leaves your browser

---

## 🧩 Installation

### Temporary Installation (for development or manual use)

1. Download or clone this repository:  
   `git clone https://github.com/yourusername/chatgpt-image-downloader.git`
2. Open **Firefox**.
3. Visit `about:debugging`.
4. Click **This Firefox**.
5. Click **Load Temporary Add-on...**.
6. Select the folder containing these files and choose **manifest.json**.
7. The extension will appear in your toolbar (puzzle-piece icon).

> **Note:** After first installing, refresh any open `chatgpt.com` tabs so the extension can capture authentication headers properly.  
> Temporary add-ons are removed when Firefox closes. For permanent use, package and sign it via [addons.mozilla.org](https://addons.mozilla.org/).

---

## 🚀 How to Use

### First-Time Setup

1. Go to **[chatgpt.com](https://chatgpt.com)** and make sure you are logged in.  
2. **Click anywhere** on the page to trigger authentication capture.  
3. Click the **ChatGPT Image Downloader** icon in the Firefox toolbar.  
4. If authentication succeeded, you’ll see **“✓ Ready”** in the popup.  
5. If not, refresh the ChatGPT page and try again.

---

### Downloading Images

1. Click the extension icon again.  
2. Click **Fetch Images** – this loads your ChatGPT image library.  
3. Once complete, click **Download All**.  
4. Images will be saved to:  
   `Downloads/chatgpt-images/`

You can also click **Open in Window** to keep the interface visible while downloads continue.  
All downloads run in the **background script**, so they continue even if you close or switch tabs.

---

## 🧠 Troubleshooting

### “Authentication not found”

- Make sure you are logged in to chatgpt.com.  
- Click anywhere on the ChatGPT page.  
- Wait a few seconds and try again.  
- If it still fails, refresh the ChatGPT page and retry.

### “API returned 401”

- Refresh the ChatGPT page to renew the session.  
- Click once on the page, wait two seconds, then reopen the extension.

### Downloads not starting

- Ensure Firefox has permission to save multiple files.  
- Check for download confirmation pop-ups.  
- Verify no popup blocker is interfering.

### “No images found”

- You don’t yet have any generated images in your ChatGPT account.

---

## 📁 File Structure

```text
chatgpt-image-downloader/
├── background.js
├── CHANGELOG.md
├── icon48.png
├── icon96.png
├── INSTALL.md
├── manifest.json
├── popup.html
├── popup.js
├── README.md
└── VERSION.md
```

---

## 🔒 Privacy & Security

✅ Runs entirely in your browser  
✅ No external servers or telemetry  
✅ Tokens stored only in local storage (1-hour lifespan)  
✅ Open-source and auditable

---

## ⚙️ Technical Details

**Manifest Version:** 2 (Firefox compatible)  
**APIs Used:**  
- `webRequest` – capture ChatGPT auth headers  
- `storage` – store tokens temporarily  
- `downloads` – save files to disk  
- `https://chatgpt.com/*` – scoped to ChatGPT only

---

## ⚠️ Limitations

- Fetch limit: **9000 images** (ChatGPT API restriction)  
- Downloads are sequential to avoid rate limiting  
- Auth token expires after ~1 hour  
- Temporary add-ons are removed when Firefox closes

---

## 🛠 Support

If something doesn’t work:

1. Open DevTools → **Console** (F12) to check for errors.  
2. Confirm you’re using the latest Firefox version.  
3. Reload the extension via `about:debugging`.  
4. Revisit ChatGPT and retry authentication capture.

---

## 🧾 License

**MIT License** – Free to use, modify, and distribute.

---

## 📜 Changelog Summary

### v1.1.0

- Added persistent **Open in Window** mode  
- Moved download logic to **background.js**  
- Improved reliability during tab changes and resize  
- Real-time progress updates via messaging

### v1.0.0

- Initial release  
- Automatic auth capture  
- Bulk image download  
- Progress bar and error handling

---

**Made for ChatGPT creators who want full control of their AI-generated images.**
