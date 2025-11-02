// background.js
// -----------------------------------------------------------------------------
// Capture ChatGPT auth headers + run background downloads
// -----------------------------------------------------------------------------

let capturedAuth = null;
let capturedHeaders = {};
let activeDownload = null;

// Capture authentication headers from ChatGPT requests
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
// Background download logic
// -----------------------------------------------------------------------------
async function runDownloadJob(items) {
  if (!items || !Array.isArray(items) || items.length === 0) return;

  let success = 0;
  let failed = 0;
  const usedFilenames = new Set();

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const extractFilename = (url) => {
    const parts = url.split("/");
    const last = parts[parts.length - 1];
    let filename = last.split("?")[0] || "image";
    if (!filename.includes(".")) {
      if (url.includes(".webp")) filename += ".webp";
      else if (url.includes(".jpg") || url.includes(".jpeg")) filename += ".jpg";
      else filename += ".png";
    }
    return filename;
  };

  const makeUniqueFilename = (filename) => {
    if (!usedFilenames.has(filename)) {
      usedFilenames.add(filename);
      return filename;
    }
    const lastDot = filename.lastIndexOf(".");
    const name = lastDot > 0 ? filename.substring(0, lastDot) : filename;
    const ext = lastDot > 0 ? filename.substring(lastDot) : "";
    const uniqueName = `${name}_${Date.now()}${ext}`;
    usedFilenames.add(uniqueName);
    return uniqueName;
  };

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let filename = extractFilename(item.url);
    try {
      const resp = await fetch(item.url);
      const contentType = resp.headers.get("content-type") || "";
      if (!filename.includes(".")) {
        if (contentType.includes("webp")) filename += ".webp";
        else if (contentType.includes("jpeg") || contentType.includes("jpg"))
          filename += ".jpg";
        else filename += ".png";
      }
      const uniqueFilename = makeUniqueFilename(filename);
      await browser.downloads.download({
        url: item.url,
        filename: `chatgpt-images/${uniqueFilename}`,
        saveAs: false,
        conflictAction: "uniquify",
      });
      success++;
    } catch (err) {
      failed++;
      console.error("Download error:", err);
    }

    browser.runtime.sendMessage({
      type: "progress",
      current: i + 1,
      total: items.length,
      success,
      failed,
    });

    if (i < items.length - 1) await sleep(300);
  }

  browser.runtime.sendMessage({
    type: "complete",
    success,
    failed,
    total: items.length,
  });
}

// -----------------------------------------------------------------------------
// Message router (popup → background)
// -----------------------------------------------------------------------------
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getAuth") {
    sendResponse({
      authToken: capturedAuth,
      headers: capturedHeaders,
    });
    return true;
  }

  if (request.action === "startDownload") {
    if (activeDownload) {
      sendResponse({ status: "busy" });
      return true;
    }
    activeDownload = runDownloadJob(request.items)
      .catch((e) => console.error("Background download failed:", e))
      .finally(() => (activeDownload = null));
    sendResponse({ status: "started" });
    return true;
  }

  return true;
});

console.log("✓ ChatGPT Image Downloader background script active");
