// popup.js
// -----------------------------------------------------------------------------
// Handles UI + communicates with background.js
// -----------------------------------------------------------------------------
let libraryData = null;
let authToken = null;
let authHeaders = {};

const elements = {
  statusBox: document.getElementById("statusBox"),
  instructionsBox: document.getElementById("instructionsBox"),
  infoBox: document.getElementById("infoBox"),
  imageCount: document.getElementById("imageCount"),
  authStatus: document.getElementById("authStatus"),
  fetchBtn: document.getElementById("fetchBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  openWindowBtn: document.getElementById("openWindowBtn"),
  progressContainer: document.getElementById("progressContainer"),
  progressText: document.getElementById("progressText"),
  progressBar: document.getElementById("progressBar"),
  progressStats: document.getElementById("progressStats"),
};

// -----------------------------------------------------------------------------
// UI helpers
function showStatus(msg, type = "info") {
  elements.statusBox.textContent = msg;
  elements.statusBox.className = `status ${type}`;
  elements.statusBox.classList.remove("hidden");
}
function hideStatus() {
  elements.statusBox.classList.add("hidden");
}
function updateProgress(current, total, success, failed) {
  elements.progressText.textContent = `Downloading: ${current} / ${total}`;
  elements.progressStats.textContent = `Success: ${success} · Failed: ${failed}`;
  const percent = total > 0 ? (current / total) * 100 : 0;
  elements.progressBar.style.width = percent + "%";
}

// -----------------------------------------------------------------------------
// Auth
async function getAuth() {
  try {
    const stored = await browser.storage.local.get([
      "authToken",
      "headers",
      "timestamp",
    ]);
    if (stored.authToken) {
      const age = Date.now() - (stored.timestamp || 0);
      const isExpired = age > 3600000;
      if (isExpired) {
        elements.authStatus.textContent = "Expired (refresh page)";
        return null;
      }
      authToken = stored.authToken;
      authHeaders = stored.headers || {};
      elements.authStatus.textContent = "✓ Ready";
      return authToken;
    }
    elements.authStatus.textContent = "Not found";
    return null;
  } catch (e) {
    console.error(e);
    elements.authStatus.textContent = "Error";
    return null;
  }
}

// -----------------------------------------------------------------------------
// Fetch library
async function fetchLibrary() {
  elements.fetchBtn.disabled = true;
  elements.fetchBtn.textContent = "⏳ Fetching...";
  try {
    const auth = await getAuth();
    if (!auth) {
      showStatus(
        "❌ Authentication not found. Visit chatgpt.com first and try again.",
        "error"
      );
      elements.instructionsBox.classList.remove("hidden");
      elements.fetchBtn.disabled = false;
      elements.fetchBtn.textContent = "🔍 Fetch Images";
      return;
    }

    const resp = await fetch(
      "https://chatgpt.com/backend-api/my/recent/image_gen?limit=9000",
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "*/*", Authorization: auth, ...authHeaders },
      }
    );
    if (!resp.ok) throw new Error(`API ${resp.status}`);
    libraryData = await resp.json();

    if (!libraryData.items || libraryData.items.length === 0) {
      showStatus("No images found", "error");
      elements.fetchBtn.disabled = false;
      elements.fetchBtn.textContent = "🔍 Fetch Images";
      return;
    }

    showStatus(`✓ Found ${libraryData.items.length} images!`, "success");
    elements.instructionsBox.classList.add("hidden");
    elements.infoBox.classList.remove("hidden");
    elements.imageCount.textContent = libraryData.items.length;
    elements.fetchBtn.classList.add("hidden");
    elements.downloadBtn.classList.remove("hidden");
    elements.downloadBtn.disabled = false;
    elements.refreshBtn.classList.remove("hidden");
  } catch (e) {
    console.error(e);
    showStatus("Error: " + e.message, "error");
    elements.fetchBtn.disabled = false;
    elements.fetchBtn.textContent = "🔍 Fetch Images";
  }
}

// -----------------------------------------------------------------------------
// Trigger background download
async function startDownload() {
  if (!libraryData || !libraryData.items) {
    showStatus("No images to download", "error");
    return;
  }

  elements.downloadBtn.disabled = true;
  elements.refreshBtn.disabled = true;
  elements.progressContainer.style.display = "block";
  hideStatus();

  try {
    const res = await browser.runtime.sendMessage({
      action: "startDownload",
      items: libraryData.items,
    });
    if (res.status === "busy") {
      showStatus("Another download already running", "error");
    } else if (res.status === "started") {
      showStatus("Started background download...", "info");
    }
  } catch (e) {
    console.error("Failed to send startDownload:", e);
    showStatus("Failed to start background download", "error");
  }
}

// -----------------------------------------------------------------------------
// Listen to background progress
browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "progress") {
    updateProgress(msg.current, msg.total, msg.success, msg.failed);
  } else if (msg.type === "complete") {
    const allOk = msg.success === msg.total;
    showStatus(
      `Complete! ${msg.success} downloaded, ${msg.failed} failed`,
      allOk ? "success" : "error"
    );
    elements.downloadBtn.disabled = false;
    elements.refreshBtn.disabled = false;
    setTimeout(() => {
      elements.progressContainer.style.display = "none";
    }, 5000);
  }
});

// -----------------------------------------------------------------------------
// Reset UI
function reset() {
  libraryData = null;
  elements.fetchBtn.classList.remove("hidden");
  elements.downloadBtn.classList.add("hidden");
  elements.refreshBtn.classList.add("hidden");
  elements.infoBox.classList.add("hidden");
  elements.progressContainer.style.display = "none";
  hideStatus();
  elements.fetchBtn.disabled = false;
  elements.fetchBtn.textContent = "🔍 Fetch Images";
}

// -----------------------------------------------------------------------------
// Open persistent window version
elements.openWindowBtn.addEventListener("click", () => {
  browser.windows.create({
    url: browser.runtime.getURL("popup.html") + "?standalone=true",
    type: "popup",
    width: 420,
    height: 640,
  });
});

// Hide the button inside the standalone window
if (window.location.search.includes("standalone")) {
  elements.openWindowBtn.style.display = "none";
}

// -----------------------------------------------------------------------------
// Events
elements.fetchBtn.addEventListener("click", fetchLibrary);
elements.downloadBtn.addEventListener("click", startDownload);
elements.refreshBtn.addEventListener("click", reset);

// Init
(async function init() {
  const auth = await getAuth();
  if (auth) elements.instructionsBox.classList.add("hidden");
  else elements.authStatus.textContent = "Visit ChatGPT first";
})();
