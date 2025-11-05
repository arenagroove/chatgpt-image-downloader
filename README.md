# ChatGPT Image Downloader — Firefox Extension

Download all your generated images from your ChatGPT Library with one click.  
Fast, safe, and completely local.

---

## ✨ Features

✅ **Automatic Authentication** — Captures ChatGPT auth token automatically  
✅ **Image Selection** — Preview thumbnails and choose specific images to download  
✅ **Bulk Download** — Fetch and download your entire image library  
✅ **Full Resolution** — Saves images in original quality (WebP, PNG, JPG)  
✅ **Smart Filenames** — Uses image prompts/titles from API  
✅ **Detailed Error Reports** — See exactly which images failed and why  
✅ **Progress Tracking** — Real-time progress bar with success/fail counts  
✅ **Pause/Resume** — Control downloads with pause and resume functionality  
✅ **Background Downloads** — Runs in background, continues even if you switch tabs  
✅ **Collapsible Panel** — Minimize the interface when not in use  
✅ **Draggable Interface** — Position the panel anywhere on screen  
✅ **Dark Mode Support** — Seamless light/dark theme integration  
✅ **Privacy-First** — No data leaves your browser

---

## 🧩 Installation

### Temporary Installation (for development or manual use)

1. Download or clone this repository:  
   `git clone https://github.com/arenagroove/chatgpt-image-downloader.git`
2. Open **Firefox**.
3. Visit `about:debugging`.
4. Click **This Firefox**.
5. Click **Load Temporary Add-on...**.
6. Select the folder containing these files and choose **manifest.json**.

> **Note:** After first installing, visit `chatgpt.com` and navigate to the Library page. The extension will automatically capture authentication headers when you interact with ChatGPT.  
> Temporary add-ons are removed when Firefox closes. For permanent use, package and sign it via [addons.mozilla.org](https://addons.mozilla.org/).

---

## 🚀 How to Use

### First-Time Setup

1. Go to **[chatgpt.com/library](https://chatgpt.com/library)** and make sure you are logged in.  
2. The floating panel will appear automatically in the top-right corner.
3. If authentication is successful, you'll see **"✓ Authenticated"** in the panel.  
4. If not, refresh the page and interact with ChatGPT (scroll, click, etc.) to trigger auth capture.

---

### Downloading Images

1. On the **Library page**, the panel appears automatically.
2. Click **Fetch Images** — this loads your ChatGPT image library via API.  
3. The panel will show a **scrollable list of thumbnails** with checkboxes.
4. **Select images** to download:
   - All images are **checked by default**
   - Click **Select All** or **Deselect All** for quick bulk control
   - Click individual checkboxes to choose specific images
   - Click anywhere on a row to toggle its checkbox
5. Click **Download All** to start downloading **only selected images**.  
6. Watch the real-time progress bar as images download.
7. Use **Pause** to pause the download, then click **Resume** to continue.
8. Images will be saved to:  
   `Downloads/chatgpt-images/`

### Error Reporting

If any downloads fail, a **collapsible error section** will appear showing:
- Image title
- Failure reason (e.g., "No download URL found", "Network error")
- Position in the download queue

Click the error section header to expand/collapse the detailed list.

### Panel Controls

- **Collapse/Expand** — Click the `−` button in the header to minimize the panel to just the header. Click `+` to expand it again.
- **Drag** — Click and hold the panel header (not the buttons) to drag it anywhere on screen.
- **Fetch Images** — Load your image library from ChatGPT
- **Select All / Deselect All** — Quick bulk selection controls
- **Download All** — Start downloading selected images

All downloads run in the **background script**, so they continue even if you minimize or collapse the panel.

---

## 🎨 Interface

The extension uses a floating panel that appears only on the ChatGPT Library page:

- **Always visible** when on `/library` page
- **Thumbnail preview grid** — See all images before downloading
- **Selection controls** — Choose exactly which images to download
- **Collapsible sections** — Minimize image list or error details
- **Draggable** — reposition anywhere on screen
- **Real-time updates** — progress bar shows current download status
- **Multi-tab support** — state syncs across multiple Library tabs
- **Dark mode compatible** — seamlessly adapts to ChatGPT's theme

---

## 🧠 Troubleshooting

### Panel doesn't appear

- Make sure you're on the **Library page** (`chatgpt.com/library`)
- The panel only shows on Library pages, not on chat pages
- Try refreshing the page
- Check browser console (F12) for errors

### "✗ Not authenticated"

- Make sure you are logged in to chatgpt.com
- Interact with the page (scroll, click anywhere)
- Wait a few seconds and check the panel status
- If it still fails, refresh the page and retry

### "API returned 401" or fetch fails

- Your session may have expired — refresh the ChatGPT page
- Log out and log back in to ChatGPT
- Clear browser cache and retry

### Downloads not starting

- Ensure Firefox has permission to save multiple files
- Check Firefox Settings → Privacy & Security → Permissions → Downloads
- Verify no download confirmation pop-ups are blocking
- Make sure at least one image is selected

### "No images found"

- You don't have any generated images in your ChatGPT account yet
- Images must be generated via DALL-E in ChatGPT to appear in the Library

### Thumbnails loading slowly

- Thumbnails use optimized thumbnail URLs from ChatGPT API
- Lazy loading is enabled — images load as you scroll
- If thumbnails fail to load, the full image URL is used as fallback

### Progress bar doesn't update

- This is normal if downloads are very fast
- Check the Downloads folder to verify files are being saved
- Progress updates every ~200ms during download

### Can't drag the panel

- Make sure you're clicking on the **header area** (title text), not the buttons
- Don't click on the collapse button (`−` or `+`) when trying to drag
- The cursor should change to a "move" icon when over draggable areas

### Downloads failing for specific images

- Check the **Failed Downloads** section for detailed error information
- Common reasons:
  - "No download URL found" — API didn't provide a valid URL
  - "Download failed" — Network error or permission issue
  - "Network request failed" — Connection interrupted

---

## 📁 File Structure

```text
chatgpt-image-downloader/
├── .gitignore         # Git ignore rules
├── background.js      # Background script: downloads, auth capture, error tracking
├── CHANGELOG.md       # Version history and changes
├── icon48.png         # Extension icon (48x48)
├── icon96.png         # Extension icon (96x96)
├── INSTALL.md         # Installation guide
├── manifest.json      # Extension configuration
├── panel.js           # Content script: floating panel UI with image selection
├── README.md          # This file
└── VERSION.md         # Current version info
```

---

## 🔒 Privacy & Security

✅ Runs entirely in your browser  
✅ No external servers or telemetry  
✅ Tokens stored only in local storage  
✅ Downloads handled by browser's native download manager  
✅ Open-source and auditable  
✅ Only active on chatgpt.com domain

---

## ⚙️ Technical Details

**Manifest Version:** 2 (Firefox compatible)

**Core Files:**
- `background.js` — Captures auth, manages downloads, pause/resume logic, error tracking
- `panel.js` — Injects floating panel UI with thumbnail grid and selection controls

**APIs Used:**  
- `webRequest` — capture ChatGPT auth headers from backend-api requests
- `storage.local` — store auth token and headers temporarily  
- `downloads` — save images to disk with custom filenames
- `tabs` — communicate between content script and background
- `runtime.onMessage` — sync download state and errors across tabs

**Permissions:**  
- `https://chatgpt.com/*` — scoped to ChatGPT only
- `downloads` — required for saving files
- `storage` — required for auth token persistence
- `webRequest`, `webRequestBlocking` — required for header capture

**Download Behavior:**
- Sequential downloads with 200ms delay between files
- Only downloads selected images
- Automatic retry on network errors
- Detailed error tracking with title, reason, and position
- Filename sanitization (removes emojis, special chars)
- Unique filenames via timestamp if duplicates detected
- Conflict resolution: overwrites existing files

**Image Selection:**
- Thumbnail URLs from `encodings.thumbnail.path` API field
- Lazy loading for performance
- All images checked by default
- Click-anywhere-to-toggle on rows
- Live selection counter

---

## ⚠️ Limitations

- **Fetch limit:** 9000 images (ChatGPT API restriction via `limit` parameter)
- **Downloads are sequential** to avoid rate limiting and browser throttling
- **Auth token expires** after ~1 hour (automatic re-capture on next interaction)
- **Temporary add-ons** are removed when Firefox closes (use permanent install for production)
- **Library page only** — panel doesn't appear on chat pages
- **Panel position not saved** — resets to top-right on page reload

---

## 🎯 How It Works

### Authentication Capture
1. Extension monitors network requests to `backend-api` endpoints
2. When detected, captures `Authorization` header and device headers
3. Stores in `browser.storage.local` with timestamp
4. Content script (panel) retrieves auth when needed for API calls

### Image Fetching
1. Panel sends authenticated request to: `https://chatgpt.com/backend-api/my/recent/image_gen?limit=9000`
2. API returns JSON with image metadata (URLs, titles, timestamps, thumbnail URLs)
3. Panel renders scrollable thumbnail grid with checkboxes
4. All images selected by default

### Image Selection
1. User can select/deselect individual images by clicking checkboxes or rows
2. "Select All" and "Deselect All" buttons for bulk control
3. Live counter shows number of selected images
4. Only selected images are sent to background script for download

### Downloading
1. User clicks "Download All"
2. Panel sends **only selected images** to background script via `runtime.sendMessage`
3. Background script processes each image:
   - Fetches image to determine content type
   - Extracts title from API metadata
   - Sanitizes filename
   - Calls `browser.downloads.download()` with filename
   - Tracks failures with detailed error information
4. Progress updates sent back to panel via `tabs.sendMessage`
5. Panel updates progress bar in real-time
6. On completion, failed downloads shown in collapsible error section

### Error Tracking
- Background script captures failure reason for each failed download
- Stores title, error message, and position in queue
- Sends detailed failure array to content script on completion
- Panel displays in collapsible section with expand/collapse toggle

### Pause/Resume
- Background script maintains `paused` flag
- When paused, download loop sleeps until resumed
- State syncs across all open Library tabs

---

## 🛠 Development & Debugging

### Console Logging
The extension logs key events to the browser console:

**Background script** (`about:debugging` → Inspect background):
```
✅ ChatGPT Image Downloader background active (using API titles)
🎯 Starting download of N images
📊 Progress: X/N
❌ Failed downloads: [{title, reason, index}, ...]
✅ Download complete: N success, M failed
```

**Content script** (Library page → F12 → Console):
```
🎨 ChatGPT Image Downloader panel script loaded
📋 Rendering N images
✅ Using thumbnail: [URL]
📨 Panel received message: progress
📊 Progress: X/N
🔴 Displaying M failed items
✅ Complete: N success, M failed
```

### Testing Changes
1. Make code edits
2. Go to `about:debugging`
3. Click **Reload** next to your extension
4. Refresh the Library page
5. Check console for errors

---

## 🐛 Known Issues

- **Fast clicks on collapse button may trigger drag** — wait for click to complete before moving mouse
- **Progress may not update for very fast downloads** — check Downloads folder to confirm
- **Panel position doesn't persist** — resets to top-right on page reload (future enhancement)
- **Thumbnail loading** — some older images may not have thumbnail URLs and will load full images

---

## 🚀 Future Enhancements

Potential features for future versions:
- Remember panel position across sessions
- Remember collapsed/expanded state
- Remember selected images across sessions
- Filter downloads by date range
- Sort images by date, name, or size
- Export metadata to CSV
- Custom download folder selection
- Keyboard shortcuts (Ctrl+A for select all, etc.)
- Download statistics and history
- Batch size control for parallel downloads

---

## 🛠 Support

If something doesn't work:

1. Open DevTools → **Console** (F12) to check for errors
2. Confirm you're using the latest Firefox version (109+)
3. Reload the extension via `about:debugging`
4. Visit ChatGPT Library page and check panel status
5. Check background script console (Inspect button in about:debugging)
6. Review the **Failed Downloads** section for specific error details

For issues or feature requests, please open an issue on GitHub.

---

## 🧾 License

**MIT License** — Free to use, modify, and distribute.

---

## 📜 Version History

### v2.1.0 (Current)
- **Image selection interface**: Preview thumbnails, select specific images to download
- **Detailed error reporting**: See exactly which images failed and why
- **Unified color system**: Coherent blue/red/green/gray theming across light and dark modes
- **Themed checkboxes**: Custom-styled checkboxes that match theme
- **Select All / Deselect All**: Quick bulk selection controls
- **Fast thumbnails**: Uses API thumbnail URLs for instant loading
- **Collapsible error section**: View failure details or minimize to save space
- **Better dark mode**: Improved contrast and readability
- **Enhanced UX**: Non-selectable text, consistent hover states, 8-second completion messages

### v2.0.0
- **Complete UI redesign**: Removed popup, added floating panel on Library page
- **Collapsible panel**: Minimize to header-only view with `−`/`+` button
- **Draggable interface**: Position panel anywhere on screen
- **Enhanced authentication**: Automatic capture from backend-api requests
- **Improved filenames**: Uses image titles/prompts from API
- **Better progress tracking**: Real-time updates with success/fail counts
- **Pause/Resume**: Control downloads mid-process
- **Multi-tab sync**: Download state syncs across Library tabs
- **Background persistence**: Downloads continue even when panel is collapsed
- **Library page only**: Panel appears only on `/library` route

### v1.1.0
- Added persistent "Open in Window" mode  
- Moved download logic to background.js  
- Improved reliability during tab changes

### v1.0.0
- Initial release with popup interface
- Automatic auth capture  
- Bulk image download  
- Progress bar and error handling

---

**Made for ChatGPT creators who want full control of their AI-generated images.**