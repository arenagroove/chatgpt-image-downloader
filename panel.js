// panel.js
// -----------------------------------------------------------------------------
// Injects a floating panel into ChatGPT Library page ONLY
// -----------------------------------------------------------------------------

console.log("🎨 ChatGPT Image Downloader panel script loaded");

let libraryData = null;
let authToken = null;
let authHeaders = {};
let isPaused = false;
let panel = null;
let isDownloading = false;
let isCollapsed = false;

// Dragging state
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// -----------------------------------------------------------------------------
// Check if we're on the library page
// -----------------------------------------------------------------------------
function isOnLibraryPage() {
    return window.location.pathname.includes('/library') ||
        window.location.href.includes('#library') ||
        window.location.search.includes('library');
}

// -----------------------------------------------------------------------------
// Create the floating panel
// -----------------------------------------------------------------------------
function createPanel() {
    if (panel) {
        panel.style.display = 'block';
        syncStateWithBackground(); // Sync state when showing
        return;
    }

    const panelHTML = `
        <div id="chatgpt-downloader-panel" style="
            position: fixed;
            top: 80px;
            right: 20px;
            width: 340px;
            background: white;
            border: thin solid #e5e7eb;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
            <div id="panel-header" style="
                padding: 16px;
                border-bottom: thin solid #e5e7eb;
                background: #f9fafb;
                border-radius: 12px 12px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
            ">
                <div>
                    <div style="font-size: 15px; font-weight: 600; color: #1a1a1a;">Image Downloader</div>
                    <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">for ChatGPT</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button id="panel-collapse" style="
                        background: none;
                        border: none;
                        font-size: 18px;
                        color: #6b7280;
                        cursor: pointer;
                        padding: 4px 8px;
                        line-height: 1;
                        transition: color 0.2s;
                    " title="Collapse panel">−</button>
                </div>
            </div>
            
            <div id="panel-body" style="padding: 16px;">
                <div id="panel-status" style="
                    background: #f3f4f6;
                    border-left: 3px solid #6b7280;
                    padding: 10px 12px;
                    margin-bottom: 14px;
                    font-size: 13px;
                    color: #374151;
                    border-radius: 4px;
                    display: none;
                "></div>

                <div id="panel-info" style="
                    background: #f9fafb;
                    border: thin solid #e5e7eb;
                    padding: 10px;
                    margin-bottom: 14px;
                    font-size: 13px;
                    border-radius: 6px;
                    display: none;
                ">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span style="color: #6b7280;">Images</span>
                        <span style="color: #1a1a1a; font-weight: 500;" id="panel-count">—</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Status</span>
                        <span style="color: #1a1a1a; font-weight: 500;" id="panel-auth">Checking...</span>
                    </div>
                </div>

                <button id="panel-fetch" style="
                    width: 100%;
                    padding: 10px;
                    border: thin solid #1a1a1a;
                    background: #1a1a1a;
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 8px;
                    border-radius: 6px;
                    font-family: inherit;
                ">Fetch Images</button>

                <button id="panel-download" style="
                    width: 100%;
                    padding: 10px;
                    border: thin solid #1a1a1a;
                    background: #1a1a1a;
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 8px;
                    display: none;
                    border-radius: 6px;
                    font-family: inherit;
                ">Download All</button>

                <button id="panel-pause" style="
                    width: 100%;
                    padding: 10px;
                    border: thin solid #d1d5db;
                    background: white;
                    color: #6b7280;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 8px;
                    display: none;
                    border-radius: 6px;
                    font-family: inherit;
                ">Pause</button>

                <button id="panel-refresh" style="
                    width: 100%;
                    padding: 10px;
                    border: thin solid #d1d5db;
                    background: white;
                    color: #6b7280;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 8px;
                    display: none;
                    border-radius: 6px;
                    font-family: inherit;
                ">Fetch Again</button>

                <div id="panel-progress" style="display: none; margin-top: 12px;">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        color: #6b7280;
                        margin-bottom: 6px;
                    ">
                        <span id="progress-text">0 / 0</span>
                        <span id="progress-percent">0%</span>
                    </div>
                    <div style="
                        width: 100%;
                        height: 6px;
                        background: #e5e7eb;
                        border-radius: 3px;
                        overflow: hidden;
                    ">
                        <div id="progress-bar" style="
                            height: 100%;
                            background: linear-gradient(90deg, #3b82f6, #2563eb);
                            width: 0%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        color: #9ca3af;
                        margin-top: 4px;
                    ">
                        <span>✓ <span id="progress-success">0</span></span>
                        <span>✗ <span id="progress-failed">0</span></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', panelHTML);
    panel = document.getElementById('chatgpt-downloader-panel');

    // Store references to UI elements
    window.panelElements = {
        panel: panel,
        header: document.getElementById('panel-header'),
        body: document.getElementById('panel-body'),
        collapse: document.getElementById('panel-collapse'),
        status: document.getElementById('panel-status'),
        info: document.getElementById('panel-info'),
        count: document.getElementById('panel-count'),
        auth: document.getElementById('panel-auth'),
        fetch: document.getElementById('panel-fetch'),
        download: document.getElementById('panel-download'),
        pause: document.getElementById('panel-pause'),
        refresh: document.getElementById('panel-refresh'),
        progress: document.getElementById('panel-progress'),
        progressText: document.getElementById('progress-text'),
        progressPercent: document.getElementById('progress-percent'),
        progressBar: document.getElementById('progress-bar'),
        progressSuccess: document.getElementById('progress-success'),
        progressFailed: document.getElementById('progress-failed'),
    };

    const el = window.panelElements;

    // -----------------------------------------------------------------------------
    // Collapse/Expand functionality
    // -----------------------------------------------------------------------------
    el.collapse.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent dragging when clicking collapse button
        toggleCollapse();
    });

    // -----------------------------------------------------------------------------
    // Dragging functionality (only on header, excluding collapse button)
    // -----------------------------------------------------------------------------
    el.header.addEventListener('mousedown', (e) => {
        // Don't start dragging if clicking on the collapse button
        if (e.target === el.collapse || e.target.closest('#panel-collapse')) {
            return;
        }

        isDragging = true;
        const rect = panel.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        
        el.header.style.cursor = 'grabbing';
        e.preventDefault(); // Prevent text selection
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - dragOffsetX;
        const y = e.clientY - dragOffsetY;

        // Keep panel within viewport bounds
        const maxX = window.innerWidth - panel.offsetWidth;
        const maxY = window.innerHeight - panel.offsetHeight;

        panel.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        panel.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        panel.style.right = 'auto'; // Remove right positioning when dragging
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            el.header.style.cursor = 'move';
        }
    });

    // -----------------------------------------------------------------------------
    // Button event listeners
    // -----------------------------------------------------------------------------
    el.fetch.addEventListener('click', () => fetchLibrary());
    el.download.addEventListener('click', () => startDownload());
    el.pause.addEventListener('click', () => togglePause());
    el.refresh.addEventListener('click', () => fetchLibrary());

    // Hover effects for buttons
    [el.fetch, el.download, el.refresh].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.disabled) {
                btn.style.opacity = '0.9';
            }
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.opacity = '1';
        });
    });

    // Initialize auth check
    checkAuth();
    syncStateWithBackground();
}

// -----------------------------------------------------------------------------
// Toggle collapse/expand
// -----------------------------------------------------------------------------
function toggleCollapse() {
    if (!window.panelElements) return;
    const el = window.panelElements;

    isCollapsed = !isCollapsed;

    if (isCollapsed) {
        // Collapse: hide body and adjust panel
        el.body.style.display = 'none';
        el.collapse.textContent = '+';
        el.collapse.title = 'Expand panel';
        panel.style.width = '340px'; // Keep same width for consistency
        el.header.style.borderRadius = '12px'; // Round all corners when collapsed
    } else {
        // Expand: show body
        el.body.style.display = 'block';
        el.collapse.textContent = '−';
        el.collapse.title = 'Collapse panel';
        el.header.style.borderRadius = '12px 12px 0 0'; // Only round top corners
    }
}

// -----------------------------------------------------------------------------
// Sync state with background script
// -----------------------------------------------------------------------------
async function syncStateWithBackground() {
    try {
        const state = await browser.runtime.sendMessage({ action: 'getDownloadState' });
        
        if (state.isDownloading) {
            isDownloading = true;
            isPaused = state.isPaused;
            
            if (isPaused) {
                updateUIState('paused');
            } else {
                updateUIState('downloading');
            }
        }
    } catch (e) {
        console.error('Failed to sync state:', e);
    }
}

// -----------------------------------------------------------------------------
// Update progress bar
// -----------------------------------------------------------------------------
function updateProgress(current, total, success, failed) {
    if (!window.panelElements) return;
    const el = window.panelElements;

    const percent = Math.round((current / total) * 100);

    el.progressText.textContent = `${current} / ${total}`;
    el.progressPercent.textContent = `${percent}%`;
    el.progressBar.style.width = `${percent}%`;
    el.progressSuccess.textContent = success;
    el.progressFailed.textContent = failed;
    el.progress.style.display = 'block';
}

// -----------------------------------------------------------------------------
// Show/hide status message
// -----------------------------------------------------------------------------
function showStatus(text, type = 'info') {
    if (!window.panelElements) return;
    const el = window.panelElements;

    el.status.textContent = text;
    el.status.style.display = 'block';

    const colors = {
        info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af' },
        success: { bg: '#f0fdf4', border: '#10b981', text: '#166534' },
        error: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
    };

    const color = colors[type] || colors.info;
    el.status.style.background = color.bg;
    el.status.style.borderLeftColor = color.border;
    el.status.style.color = color.text;
}

function hideStatus() {
    if (!window.panelElements) return;
    window.panelElements.status.style.display = 'none';
}

// -----------------------------------------------------------------------------
// Update UI State
// -----------------------------------------------------------------------------
function updateUIState(state) {
    if (!window.panelElements) return;
    const el = window.panelElements;

    // Reset all buttons to default state first
    el.fetch.disabled = false;
    el.download.disabled = false;
    el.pause.disabled = false;
    el.refresh.disabled = false;

    switch (state) {
        case 'initial':
            el.fetch.style.display = 'block';
            el.download.style.display = 'none';
            el.pause.style.display = 'none';
            el.refresh.style.display = 'none';
            el.info.style.display = 'none';
            el.progress.style.display = 'none';
            break;

        case 'fetched':
            el.fetch.style.display = 'none';
            el.download.style.display = 'block';
            el.pause.style.display = 'none';
            el.refresh.style.display = 'block';
            el.info.style.display = 'block';
            el.progress.style.display = 'none';
            break;

        case 'downloading':
            el.fetch.style.display = 'none';
            el.download.style.display = 'none';
            el.pause.style.display = 'block';
            el.pause.textContent = 'Pause';
            el.refresh.style.display = 'none';
            el.info.style.display = 'block';
            el.progress.style.display = 'block';
            break;

        case 'paused':
            el.fetch.style.display = 'none';
            el.download.style.display = 'none';
            el.pause.style.display = 'block';
            el.pause.textContent = 'Resume';
            el.refresh.style.display = 'none';
            el.info.style.display = 'block';
            el.progress.style.display = 'block';
            break;

        case 'complete':
            el.fetch.style.display = 'none';
            el.download.style.display = 'block';
            el.pause.style.display = 'none';
            el.refresh.style.display = 'block';
            el.info.style.display = 'block';
            el.progress.style.display = 'block';
            break;
    }
}

// -----------------------------------------------------------------------------
// Check authentication
// -----------------------------------------------------------------------------
async function checkAuth() {
    if (!window.panelElements) return null;
    const el = window.panelElements;

    try {
        const res = await browser.runtime.sendMessage({ action: 'getAuth' });
        
        if (res && res.authToken) {
            authToken = res.authToken;
            authHeaders = res.headers || {};
            el.auth.textContent = '✓ Authenticated';
            el.auth.style.color = '#10b981';
            return authToken;
        } else {
            el.auth.textContent = '✗ Not authenticated';
            el.auth.style.color = '#ef4444';
            return null;
        }
    } catch (e) {
        console.error('Auth check failed:', e);
        if (window.panelElements) {
            el.auth.textContent = '✗ Error';
            el.auth.style.color = '#ef4444';
        }
        return null;
    }
}

// -----------------------------------------------------------------------------
// Fetch Library
// -----------------------------------------------------------------------------
async function fetchLibrary() {
    if (!window.panelElements) return;
    const el = window.panelElements;

    updateUIState('initial');

    // Disable buttons and show loading state
    el.fetch.disabled = true;
    el.download.disabled = true;
    el.refresh.disabled = true;

    // Show loading text on whichever button is visible
    if (el.fetch.style.display !== 'none') {
        el.fetch.textContent = '⏳ Fetching...';
    } else if (el.refresh.style.display !== 'none') {
        el.refresh.textContent = '⏳ Fetching...';
    }

    hideStatus();

    try {
        const auth = await checkAuth();
        if (!auth) {
            showStatus('❌ Authentication not found. Please refresh the page.', 'error');
            updateUIState('initial');
            el.fetch.textContent = 'Fetch Images';
            el.refresh.textContent = 'Fetch Again';
            return;
        }

        const resp = await fetch(
            'https://chatgpt.com/backend-api/my/recent/image_gen?limit=9000', { headers: { Accept: '*/*', Authorization: auth, ...authHeaders } }
        );

        if (!resp.ok) throw new Error(`API ${resp.status}`);
        libraryData = await resp.json();

        if (!libraryData.items?.length) {
            showStatus('No images found in your library', 'error');
            updateUIState('initial');
            el.fetch.textContent = 'Fetch Images';
            el.refresh.textContent = 'Fetch Again';
            return;
        }

        showStatus(`✓ Found ${libraryData.items.length} images! Ready to download.`, 'success');
        el.count.textContent = libraryData.items.length;
        el.fetch.textContent = 'Fetch Images';
        el.refresh.textContent = 'Fetch Again';
        updateUIState('fetched');
    } catch (e) {
        console.error(e);
        showStatus('Error: ' + e.message, 'error');
        updateUIState('initial');
        el.fetch.textContent = 'Fetch Images';
        el.refresh.textContent = 'Fetch Again';
    }
}

// -----------------------------------------------------------------------------
// Start Download
// -----------------------------------------------------------------------------
async function startDownload() {
    if (!libraryData?.items) {
        showStatus('No images to download', 'error');
        return;
    }

    if (isDownloading) {
        showStatus('Download already in progress', 'error');
        return;
    }

    hideStatus();
    isDownloading = true;
    updateUIState('downloading');

    try {
        const res = await browser.runtime.sendMessage({
            action: 'startDownload',
            items: libraryData.items,
        });

        if (res.status === 'busy') {
            showStatus('Another download already running', 'error');
            isDownloading = false;
            updateUIState('fetched');
        } else if (res.status === 'started') {
            showStatus('Download started...', 'info');
        }
    } catch (e) {
        console.error('Failed to start download:', e);
        showStatus('Failed to start background download', 'error');
        isDownloading = false;
        updateUIState('fetched');
    }
}

// -----------------------------------------------------------------------------
// Pause / Resume
// -----------------------------------------------------------------------------
async function togglePause() {
    if (!window.panelElements) return;
    const el = window.panelElements;

    try {
        if (!isPaused) {
            await browser.runtime.sendMessage({ action: 'pauseDownload' });
            isPaused = true;
            updateUIState('paused');
            showStatus('⏸ Paused', 'info');
        } else {
            await browser.runtime.sendMessage({ action: 'resumeDownload' });
            isPaused = false;
            updateUIState('downloading');
            showStatus('▶ Resumed', 'info');
        }
    } catch (e) {
        console.error(e);
        showStatus('Pause/Resume failed', 'error');
    }
}

// -----------------------------------------------------------------------------
// Reset UI
// -----------------------------------------------------------------------------
function reset() {
    libraryData = null;
    isDownloading = false;
    isPaused = false;
    hideStatus();
    updateUIState('initial');
    checkAuth();
}

// -----------------------------------------------------------------------------
// Listen for progress updates from background
// -----------------------------------------------------------------------------
browser.runtime.onMessage.addListener((msg) => {
    console.log("📨 Panel received message:", msg.type);

    if (!window.panelElements) {
        console.warn("⚠️ Panel elements not ready");
        return;
    }

    if (msg.type === 'progress') {
        console.log(`📊 Progress: ${msg.current}/${msg.total}`);
        updateProgress(msg.current, msg.total, msg.success, msg.failed);
    } else if (msg.type === 'complete') {
        console.log(`✅ Complete: ${msg.success} success, ${msg.failed} failed`);
        isDownloading = false;
        isPaused = false;
        const allOk = msg.success === msg.total;
        showStatus(
            `✓ Complete! ${msg.success} downloaded, ${msg.failed} failed`,
            allOk ? 'success' : 'error'
        );
        updateUIState('complete');
        setTimeout(() => {
            if (window.panelElements) {
                window.panelElements.progress.style.display = 'none';
            }
        }, 5000);
    }
});

// -----------------------------------------------------------------------------
// Abort download on page unload
// -----------------------------------------------------------------------------
window.addEventListener('beforeunload', () => {
    browser.runtime.sendMessage({ action: 'abortDownload' }).catch(() => {});
});

// -----------------------------------------------------------------------------
// Show/hide based on page
// -----------------------------------------------------------------------------
function updateVisibility() {
    if (!panel) return;

    if (isOnLibraryPage()) {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------
function init() {
    createPanel();
    updateVisibility();

    // Watch for URL changes
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            updateVisibility();
        }
    }).observe(document, { subtree: true, childList: true });
}

// Wait for page to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    setTimeout(init, 1500);
}