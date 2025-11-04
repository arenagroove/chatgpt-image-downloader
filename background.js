// background.js
// -----------------------------------------------------------------------------
// Capture ChatGPT auth headers + run background downloads with pause/resume
// + use <img alt> titles from content.js
// -----------------------------------------------------------------------------

let capturedAuth = null;
let capturedHeaders = {};
let activeDownload = null;
let paused = false;
let abortFlag = false;

// -----------------------------------------------------------------------------
// Capture authentication headers from both chat.openai.com and chatgpt.com
// -----------------------------------------------------------------------------
browser.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (details.url.includes("backend-api")) {
      for (const header of details.requestHeaders) {
        const name = header.name.toLowerCase();
        if (name === "authorization") capturedAuth = header.value;
        if (["oai-device-id", "oai-language", "oai-client-version"].includes(name))
          capturedHeaders[header.name] = header.value;
      }

      if (capturedAuth) {
        browser.storage.local.set({
          authToken: capturedAuth,
          headers: capturedHeaders,
          timestamp: Date.now(),
        });
      }
    }
  },
  { urls: ["https://chatgpt.com/*"] },
  ["requestHeaders"]
);

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
function sanitizeFilename(str) {
    if (!str) return "";
    return str
        .normalize("NFKD")
        .replace(
            /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Emoji}\u200D]/gu,
            ""
        )
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "_")
        .slice(0, 80);
}

function extractExtension(url, contentType = "") {
    if (url.includes(".webp") || contentType.includes("webp")) return "webp";
    if (url.includes(".jpg") || url.includes(".jpeg") || contentType.includes("jpeg"))
        return "jpg";
    if (url.includes(".png") || contentType.includes("png")) return "png";
    return "png";
}

function makeUniqueFilename(base, used) {
    if (!used.has(base)) {
        used.add(base);
        return base;
    }
    const lastDot = base.lastIndexOf(".");
    const name = lastDot > 0 ? base.substring(0, lastDot) : base;
    const ext = lastDot > 0 ? base.substring(lastDot) : "";
    const unique = `${name}_${Date.now()}${ext}`;
    used.add(unique);
    return unique;
}

// -----------------------------------------------------------------------------
// Core download logic
// -----------------------------------------------------------------------------
async function runDownloadJob(items) {
    if (!items?.length) return;
    let success = 0;
    let failed = 0;
    const used = new Set();
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    console.log(`🎯 Starting download of ${items.length} images`);

    try {
        for (let i = 0; i < items.length; i++) {
            if (abortFlag) {
                console.warn("⛔ Download aborted by user");
                break;
            }
            while (paused) await sleep(300);

            const item = items[i];
            
            // Get title directly from API
            let mappedTitle = item.title || null;
            
            // Extract URL for downloading
            let downloadUrl = item.url || item.download_url || item.asset_pointer || item.file_url;
            
            if (!downloadUrl) {
                console.error(`❌ Item ${i + 1}: Could not find download URL`);
                failed++;
                continue;
            }
            
            let cleanTitle = sanitizeFilename(mappedTitle);
            
            if (!cleanTitle) {
                cleanTitle = "image";
                if (i < 5) {
                    console.warn(`⚠️ No title found for item ${i + 1}, using default "image"`);
                }
            }

            try {
                const resp = await fetch(downloadUrl);
                const contentType = resp.headers.get("content-type") || "";
                const ext = extractExtension(downloadUrl, contentType);
                const finalName = makeUniqueFilename(`${cleanTitle}.${ext}`, used);

                await browser.downloads.download({
                    url: downloadUrl,
                    filename: `chatgpt-images/${finalName}`,
                    saveAs: false,
                    conflictAction: "overwrite", // Overwrite instead of creating duplicates
                });
                
                success++;
            } catch (err) {
                failed++;
                console.error("Download error:", err);
            }

            // Broadcast progress to all ChatGPT tabs
            browser.tabs.query({ url: "*://chatgpt.com/*" }).then(tabs => {
                tabs.forEach(tab => {
                    browser.tabs.sendMessage(tab.id, {
                        type: "progress",
                        current: i + 1,
                        total: items.length,
                        success,
                        failed,
                    }).catch(() => {});
                });
            });

            if (i < items.length - 1) await sleep(200);
        }

        // Broadcast complete to all ChatGPT tabs
        browser.tabs.query({ url: "*://chatgpt.com/*" }).then(tabs => {
            tabs.forEach(tab => {
                browser.tabs.sendMessage(tab.id, {
                    type: "complete",
                    success,
                    failed,
                    total: items.length,
                }).catch(() => {});
            });
        });
        
        console.log(`✅ Download complete: ${success} success, ${failed} failed`);
    } finally {
        activeDownload = null;
        paused = false;
        abortFlag = false;
    }
}

// -----------------------------------------------------------------------------
// Message router - handles popup actions
// -----------------------------------------------------------------------------
browser.runtime.onMessage.addListener((req, sender, sendResponse) => {
    // Handle popup actions
    switch (req.action) {
        case "getAuth":
            sendResponse({ authToken: capturedAuth, headers: capturedHeaders });
            return true;

        case "getDownloadState":
            // Return current download state
            sendResponse({ 
                isDownloading: !!activeDownload,
                isPaused: paused
            });
            return true;

        case "resetState":
            abortFlag = true;
            paused = false;
            activeDownload = null;
            sendResponse({ status: "reset" });
            return true;

        case "startDownload":
            abortFlag = false;
            paused = false;
            if (activeDownload) {
                sendResponse({ status: "busy" });
                return true;
            }
            activeDownload = (async () => {
                try {
                    await runDownloadJob(req.items);
                } finally {
                    activeDownload = null;
                }
            })();
            sendResponse({ status: "started" });
            return true;

        case "pauseDownload":
            paused = true;
            sendResponse({ status: "paused" });
            return true;

        case "resumeDownload":
            paused = false;
            sendResponse({ status: "resumed" });
            return true;

        case "abortDownload":
            abortFlag = true;
            paused = false;
            sendResponse({ status: "aborted" });
            return true;
    }
    
    return false;
});

console.log("✅ ChatGPT Image Downloader background active (using API titles)");