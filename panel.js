// panel.js
// -----------------------------------------------------------------------------
// Injects a floating panel into ChatGPT Library page ONLY
// Enhanced with Dark Mode Support
// -----------------------------------------------------------------------------

console.log("🎨 ChatGPT Image Downloader panel script loaded");

let libraryData = null;
let authToken = null;
let authHeaders = {};
let isPaused = false;
let panel = null;
let isDownloading = false;
let isCollapsed = false;
let isDarkMode = false;

// Dragging state
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Unified color system - consistent across all elements
const colors = {
    primary: '#3b82f6', // Blue - for primary actions, progress, checkboxes
    primaryDark: '#4a9eff', // Lighter blue for dark mode
    success: '#10b981', // Green - only for success messages
    error: '#ef4444', // Red - only for errors and warnings
    neutral: '#6b7280', // Gray - for everything else
};

// Theme colors
const themes = {
    light: {
        bg: '#ffffff',
        bgSecondary: '#f9fafb',
        bgTertiary: '#f3f4f6',
        border: '#e5e7eb',
        borderSecondary: '#d1d5db',
        text: '#1a1a1a',
        textSecondary: '#6b7280',
        textTertiary: '#9ca3af',
        primary: '#1a1a1a',
        primaryHover: '#374151',
        gradient: 'linear-gradient(90deg, #3b82f6, #2563eb)',
        shadow: 'rgba(0,0,0,0.15)',
        statusBorder: '#6b7280',
    },
    dark: {
        bg: '#2f2f2f',
        bgSecondary: '#212121',
        bgTertiary: '#1a1a1a',
        border: '#4a4a4a',
        borderSecondary: '#3a3a3a',
        text: '#ececec',
        textSecondary: '#b4b4b4',
        textTertiary: '#8e8e8e',
        primary: '#ececec',
        primaryHover: '#ffffff',
        gradient: 'linear-gradient(90deg, #4a9eff, #2d7dd2)',
        shadow: 'rgba(0,0,0,0.4)',
        statusBorder: '#b4b4b4',
    }
};

// -----------------------------------------------------------------------------
// Detect ChatGPT's theme
// -----------------------------------------------------------------------------
function detectTheme() {
    // Check ChatGPT's theme by looking at the HTML element or body background
    const htmlElement = document.documentElement;
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;

    // ChatGPT uses class 'dark' on html element for dark mode
    if (htmlElement.classList.contains('dark')) {
        return true;
    }

    // Fallback: check body background color
    // Dark mode typically has dark background (rgb values < 50)
    const rgb = bodyBg.match(/\d+/g);
    if (rgb) {
        const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
        return brightness < 50;
    }

    return false;
}

// -----------------------------------------------------------------------------
// Apply theme to panel
// -----------------------------------------------------------------------------
function applyTheme(dark = false) {
    if (!panel) return;

    isDarkMode = dark;
    const theme = dark ? themes.dark : themes.light;

    // Update panel main container
    panel.style.background = theme.bg;
    panel.style.borderColor = theme.border;
    panel.style.boxShadow = `0 10px 40px ${theme.shadow}`;

    // Update header
    const header = document.getElementById('panel-header');
    if (header) {
        header.style.background = theme.bgSecondary;
        header.style.borderColor = theme.border;

        // Update header title text - find the actual div elements
        const headerContent = header.querySelector('div:first-child');
        if (headerContent) {
            const titleDiv = headerContent.querySelector('div:first-child');
            const subtitleDiv = headerContent.querySelector('div:last-child');
            if (titleDiv) titleDiv.style.color = theme.text;
            if (subtitleDiv) subtitleDiv.style.color = theme.textSecondary;
        }
    }

    // Update collapse button
    const collapseBtn = document.getElementById('panel-collapse');
    if (collapseBtn) {
        collapseBtn.style.color = theme.textSecondary;
    }

    // Update status box
    const status = document.getElementById('panel-status');
    if (status) {
        status.style.background = theme.bgTertiary;
        status.style.borderLeftColor = theme.statusBorder;
        status.style.color = theme.textSecondary;
    }

    // Update info box
    const info = document.getElementById('panel-info');
    if (info) {
        info.style.background = theme.bgSecondary;
        info.style.borderColor = theme.border;

        // Update info text colors
        const labels = info.querySelectorAll('span');
        labels.forEach((span, i) => {
            if (i % 2 === 0) {
                span.style.color = theme.textSecondary;
            } else {
                span.style.color = theme.text;
            }
        });
    }

    // Update image list container
    const imagesContainer = document.getElementById('panel-images');
    if (imagesContainer) {
        imagesContainer.style.background = theme.bgSecondary;
        imagesContainer.style.borderColor = theme.border;

        // Update sticky header
        const stickyHeader = imagesContainer.querySelector('div:first-child');
        if (stickyHeader) {
            stickyHeader.style.background = theme.bgSecondary;
            stickyHeader.style.borderColor = theme.border;

            const countSpan = stickyHeader.querySelector('span');
            if (countSpan) countSpan.style.color = theme.textSecondary;

            const buttons = stickyHeader.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.style.background = theme.bg;
                btn.style.borderColor = theme.borderSecondary;
                btn.style.color = theme.textSecondary;
            });
        }
    }

    // Update error section
    const errorSection = document.getElementById('error-section');
    if (errorSection) {
        errorSection.style.background = theme.bgSecondary;
        errorSection.style.borderColor = theme.border;

        const errorHeader = document.getElementById('error-header');
        if (errorHeader) {
            errorHeader.style.background = theme.bgTertiary;
            errorHeader.style.borderColor = theme.border;
        }
    }

    // Update primary buttons (fetch, download)
    const primaryButtons = [
        document.getElementById('panel-fetch'),
        document.getElementById('panel-download')
    ];
    primaryButtons.forEach(btn => {
        if (btn) {
            btn.style.background = theme.primary;
            btn.style.borderColor = theme.primary;
            btn.style.color = dark ? theme.bg : '#ffffff';
        }
    });

    // Update secondary buttons (pause)
    const pauseBtn = document.getElementById('panel-pause');
    if (pauseBtn) {
        pauseBtn.style.background = theme.bg;
        pauseBtn.style.borderColor = theme.borderSecondary;
        pauseBtn.style.color = theme.textSecondary;
    }

    // Update stop button (red accent)
    const stopBtn = document.getElementById('panel-stop');
    if (stopBtn) {
        stopBtn.style.background = theme.bg;
        stopBtn.style.borderColor = colors.error;
        stopBtn.style.color = colors.error;
    }

    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.background = dark ? colors.primaryDark : colors.primary;
    }

    const progressBg = document.querySelector('#panel-progress > div:nth-child(2)');
    if (progressBg) {
        progressBg.style.background = theme.bgTertiary;
    }

    // Update progress text
    const progressText = document.getElementById('progress-text');
    const progressPercent = document.getElementById('progress-percent');
    if (progressText) progressText.style.color = theme.textSecondary;
    if (progressPercent) progressPercent.style.color = theme.textSecondary;

    // Update progress counters
    const progressCounters = document.querySelector('#panel-progress > div:last-child');
    if (progressCounters) {
        progressCounters.style.color = theme.textTertiary;
    }

    console.log(`🎨 Theme applied: ${dark ? 'Dark' : 'Light'} mode`);
}

// -----------------------------------------------------------------------------
// Watch for theme changes
// -----------------------------------------------------------------------------
function watchThemeChanges() {
    // Watch for class changes on html element
    const observer = new MutationObserver(() => {
        const newTheme = detectTheme();
        if (newTheme !== isDarkMode) {
            console.log(`🎨 Theme changed: ${newTheme ? 'Dark' : 'Light'} mode`);
            applyTheme(newTheme);
        }
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Also watch body for inline style changes
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });
}

// -----------------------------------------------------------------------------
// Check if we're on the Images hub (or legacy Library)
// -----------------------------------------------------------------------------
function isOnImagesHub() {
  const p = window.location.pathname;
  const href = window.location.href;

  return (
    p.startsWith('/images') ||
    p.startsWith('/library') || // keep legacy
    href.includes('library?tab=images')
  );
}


// -----------------------------------------------------------------------------
// Create the floating panel
// -----------------------------------------------------------------------------
function createPanel() {
    if (panel) {
        panel.style.display = 'block';
        syncStateWithBackground();
        return;
    }

    // Inject custom styles for checkboxes and text selection
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        #chatgpt-downloader-panel * {
            user-select: none;
            -webkit-user-select: none;
        }
        
        #chatgpt-downloader-panel input[type="checkbox"] {
            user-select: auto;
            appearance: none;
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            border: 2px solid #d1d5db;
            border-radius: 3px;
            cursor: pointer;
            position: relative;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        #chatgpt-downloader-panel input[type="checkbox"]:checked {
            background: #3b82f6;
            border-color: #3b82f6;
        }
        
        #chatgpt-downloader-panel input[type="checkbox"]:checked::after {
            content: '';
            position: absolute;
            left: 4px;
            top: 1px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
        
        #chatgpt-downloader-panel input[type="checkbox"]:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Dark mode checkbox styles */
        html.dark #chatgpt-downloader-panel input[type="checkbox"],
        body[style*="background"][style*="rgb(0"][style*="0"][style*="0"] #chatgpt-downloader-panel input[type="checkbox"] {
            border-color: #4a4a4a;
        }
        
        html.dark #chatgpt-downloader-panel input[type="checkbox"]:checked,
        body[style*="background"][style*="rgb(0"][style*="0"][style*="0"] #chatgpt-downloader-panel input[type="checkbox"]:checked {
            background: #4a9eff;
            border-color: #4a9eff;
        }
        
        html.dark #chatgpt-downloader-panel input[type="checkbox"]:focus,
        body[style*="background"][style*="rgb(0"][style*="0"][style*="0"] #chatgpt-downloader-panel input[type="checkbox"]:focus {
            box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
        }
    `;
    document.head.appendChild(styleSheet);

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
            z-index: 5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
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
                transition: background 0.3s, border-color 0.3s;
                user-select: none;
            ">
                <div>
                    <div style="font-size: 15px; font-weight: 600; color: #1a1a1a; transition: color 0.3s;">ChatGPT Library</div>
                    <div style="font-size: 12px; color: #6b7280; margin-top: 2px; transition: color 0.3s;">Bulk Image Downloader</div>
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
                    transition: background 0.3s, border-color 0.3s, color 0.3s;
                    user-select: none;
                "></div>

                <div id="panel-info" style="
                    background: #f9fafb;
                    border: thin solid #e5e7eb;
                    padding: 10px;
                    margin-bottom: 14px;
                    font-size: 13px;
                    border-radius: 6px;
                    display: none;
                    transition: background 0.3s, border-color 0.3s;
                    user-select: none;
                ">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span style="color: #6b7280; transition: color 0.3s;">Images</span>
                        <span style="color: #1a1a1a; font-weight: 500; transition: color 0.3s;" id="panel-count">—</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; transition: color 0.3s;">Status</span>
                        <span style="color: #1a1a1a; font-weight: 500; transition: color 0.3s;" id="panel-auth">Checking...</span>
                    </div>
                </div>

                <div id="panel-images" style="
                    max-height: 400px;
                    overflow-y: auto;
                    margin-bottom: 14px;
                    display: none;
                    border: thin solid #e5e7eb;
                    border-radius: 6px;
                    background: #f9fafb;
                    transition: background 0.3s, border-color 0.3s;
                    user-select: none;
                ">
                    <div style="
                        position: sticky;
                        top: 0;
                        background: #f9fafb;
                        padding: 10px;
                        border-bottom: thin solid #e5e7eb;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        transition: background 0.3s, border-color 0.3s;
                        z-index: 1;
                        user-select: none;
                    ">
                        <span style="font-size: 12px; color: #6b7280; font-weight: 500; transition: color 0.3s;">
                            <span id="selected-count">0</span> selected
                        </span>
                        <div style="display: flex; gap: 8px;">
                            <button id="select-all" style="
                                padding: 4px 8px;
                                font-size: 11px;
                                border: thin solid #d1d5db;
                                background: white;
                                color: #6b7280;
                                cursor: pointer;
                                border-radius: 4px;
                                transition: all 0.2s;
                            ">Select All</button>
                            <button id="deselect-all" style="
                                padding: 4px 8px;
                                font-size: 11px;
                                border: thin solid #d1d5db;
                                background: white;
                                color: #6b7280;
                                cursor: pointer;
                                border-radius: 4px;
                                transition: all 0.2s;
                            ">Deselect All</button>
                        </div>
                    </div>
                    <div id="images-list" style="padding: 8px;"></div>
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
                    transition: background 0.2s, border-color 0.2s, color 0.3s;
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
                    transition: background 0.2s, border-color 0.2s, color 0.3s;
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
                    transition: background 0.2s, border-color 0.2s, color 0.3s;
                ">Pause</button>

                <button id="panel-stop" style="
                    width: 100%;
                    padding: 10px;
                    border: thin solid #ef4444;
                    background: white;
                    color: #ef4444;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 8px;
                    display: none;
                    border-radius: 6px;
                    font-family: inherit;
                    transition: background 0.2s, border-color 0.2s, color 0.3s;
                ">Stop Download</button>

                <div id="panel-progress" style="display: none; margin-top: 12px;">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        color: #6b7280;
                        margin-bottom: 6px;
                    ">
                        <span id="progress-text" style="transition: color 0.3s;">0 / 0</span>
                        <span id="progress-percent" style="transition: color 0.3s;">0%</span>
                    </div>
                    <div style="
                        width: 100%;
                        height: 6px;
                        background: #e5e7eb;
                        border-radius: 3px;
                        overflow: hidden;
                        transition: background 0.3s;
                    ">
                        <div id="progress-bar" style="
                            height: 100%;
                            background: #3b82f6;
                            width: 0%;
                            transition: width 0.3s ease, background 0.3s;
                        "></div>
                    </div>
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        color: #9ca3af;
                        margin-top: 4px;
                        transition: color 0.3s;
                    ">
                        <span>✓ <span id="progress-success">0</span></span>
                        <span>✗ <span id="progress-failed">0</span></span>
                    </div>
                </div>
                
                <div id="error-section" style="
                    display: none;
                    margin-bottom: 14px;
                    border: thin solid #e5e7eb;
                    border-radius: 6px;
                    background: #f9fafb;
                    overflow: hidden;
                    transition: background 0.3s, border-color 0.3s;
                ">
                    <div id="error-header" style="
                        padding: 10px 12px;
                        background: #f3f4f6;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                        transition: background 0.3s;
                        border-bottom: thin solid #e5e7eb;
                    ">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 13px; font-weight: 600; color: #ef4444; transition: color 0.3s;">⚠ Failed Downloads</span>
                            <span id="error-count" style="font-size: 12px; color: #ef4444; font-weight: 500; transition: color 0.3s;"></span>
                        </div>
                        <button id="error-toggle" style="
                            background: none;
                            border: none;
                            font-size: 18px;
                            color: #6b7280;
                            cursor: pointer;
                            padding: 4px 8px;
                            line-height: 1;
                            transition: color 0.2s;
                        ">−</button>
                    </div>
                    <div id="error-list" style="
                        max-height: 300px;
                        overflow-y: auto;
                        padding: 8px;
                        display: block;
                    "></div>
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
        imagesContainer: document.getElementById('panel-images'),
        imagesList: document.getElementById('images-list'),
        selectedCount: document.getElementById('selected-count'),
        selectAll: document.getElementById('select-all'),
        deselectAll: document.getElementById('deselect-all'),
        fetch: document.getElementById('panel-fetch'),
        download: document.getElementById('panel-download'),
        pause: document.getElementById('panel-pause'),
        stop: document.getElementById('panel-stop'),
        progress: document.getElementById('panel-progress'),
        progressBar: document.getElementById('progress-bar'),
        progressText: document.getElementById('progress-text'),
        progressPercent: document.getElementById('progress-percent'),
        progressSuccess: document.getElementById('progress-success'),
        progressFailed: document.getElementById('progress-failed'),
        errorSection: document.getElementById('error-section'),
        errorHeader: document.getElementById('error-header'),
        errorList: document.getElementById('error-list'),
        errorCount: document.getElementById('error-count'),
        errorToggle: document.getElementById('error-toggle'),
    };

    // Setup error section toggle
    let errorExpanded = true;
    window.panelElements.errorHeader.addEventListener('click', () => {
        errorExpanded = !errorExpanded;
        window.panelElements.errorList.style.display = errorExpanded ? 'block' : 'none';
        window.panelElements.errorToggle.textContent = errorExpanded ? '−' : '+';
    });

    setupDragging();
    setupCollapseToggle();
    setupButtons();
    checkAuth();

    // Apply initial theme
    const initialTheme = detectTheme();
    applyTheme(initialTheme);

    // Start watching for theme changes
    watchThemeChanges();
}

// -----------------------------------------------------------------------------
// Setup dragging
// -----------------------------------------------------------------------------
function setupDragging() {
    const el = window.panelElements;

    el.header.addEventListener('mousedown', (e) => {
        // Don't drag if clicking the collapse button
        if (e.target.id === 'panel-collapse' || e.target.closest('#panel-collapse')) {
            return;
        }

        isDragging = true;
        dragOffsetX = e.clientX - panel.offsetLeft;
        dragOffsetY = e.clientY - panel.offsetTop;
        el.header.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const newX = e.clientX - dragOffsetX;
        const newY = e.clientY - dragOffsetY;

        // Keep panel within viewport
        const maxX = window.innerWidth - panel.offsetWidth;
        const maxY = window.innerHeight - panel.offsetHeight;

        panel.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
        panel.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
        panel.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            el.header.style.cursor = 'move';
        }
    });
}

// -----------------------------------------------------------------------------
// Setup collapse toggle
// -----------------------------------------------------------------------------
function setupCollapseToggle() {
    const el = window.panelElements;

    el.collapse.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent drag on collapse click

        isCollapsed = !isCollapsed;

        if (isCollapsed) {
            el.body.style.display = 'none';
            el.collapse.textContent = '+';
            el.collapse.title = 'Expand panel';
            panel.style.width = '340px';
            // Round bottom corners when collapsed
            el.header.style.borderRadius = '12px';
        } else {
            el.body.style.display = 'block';
            el.collapse.textContent = '−';
            el.collapse.title = 'Collapse panel';
            // Reset to only top rounded corners when expanded
            el.header.style.borderRadius = '12px 12px 0 0';
        }
    });
}

// -----------------------------------------------------------------------------
// Setup buttons
// -----------------------------------------------------------------------------
function setupButtons() {
    const el = window.panelElements;

    el.fetch.addEventListener('click', fetchLibrary);
    el.download.addEventListener('click', startDownload);
    el.pause.addEventListener('click', togglePause);
    el.stop.addEventListener('click', stopDownload);

    // Select/Deselect all handlers
    el.selectAll.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.image-checkbox');
        checkboxes.forEach(cb => cb.checked = true);
        updateSelectedCount();
    });

    el.deselectAll.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.image-checkbox');
        checkboxes.forEach(cb => cb.checked = false);
        updateSelectedCount();
    });

    // Add hover effects that respect theme
    [el.fetch, el.download, el.pause, el.stop].forEach(btn => {
        if (!btn) return;

        btn.addEventListener('mouseenter', () => {
            if (btn === el.fetch || btn === el.download) {
                // Primary buttons: just dim slightly
                btn.style.opacity = '0.85';
            } else if (btn === el.stop) {
                // Stop button: slightly darker red on hover
                btn.style.background = isDarkMode ? '#2a1010' : '#fee2e2';
            } else {
                // Pause button: slightly darker background
                btn.style.background = isDarkMode ? themes.dark.bgTertiary : '#f3f4f6';
            }
        });

        btn.addEventListener('mouseleave', () => {
            if (btn === el.fetch || btn === el.download) {
                btn.style.opacity = '1';
            } else if (btn === el.stop) {
                btn.style.background = isDarkMode ? themes.dark.bg : 'white';
            } else {
                btn.style.background = isDarkMode ? themes.dark.bg : 'white';
            }
        });
    });
}

// -----------------------------------------------------------------------------
// Display Error Details
// -----------------------------------------------------------------------------
function displayErrorDetails(failedItems) {
    if (!window.panelElements || !failedItems || failedItems.length === 0) return;

    const el = window.panelElements;
    el.errorList.innerHTML = '';

    // Update count
    el.errorCount.textContent = `(${failedItems.length})`;

    const theme = isDarkMode ? themes.dark : themes.light;

    failedItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = `
            padding: 8px;
            margin-bottom: 6px;
            background: ${isDarkMode ? theme.bgTertiary : '#ffffff'};
            border: thin solid ${isDarkMode ? theme.borderSecondary : '#e5e7eb'};
            border-left: 3px solid ${colors.error};
            border-radius: 4px;
        `;

        const title = document.createElement('div');
        title.textContent = item.title;
        title.style.cssText = `
            font-size: 12px;
            font-weight: 600;
            color: ${isDarkMode ? theme.text : '#1a1a1a'};
            margin-bottom: 3px;
        `;

        const reason = document.createElement('div');
        reason.textContent = item.reason;
        reason.style.cssText = `
            font-size: 11px;
            color: ${isDarkMode ? theme.textSecondary : '#6b7280'};
        `;

        const position = document.createElement('div');
        position.textContent = `Position #${item.index}`;
        position.style.cssText = `
            font-size: 10px;
            color: ${isDarkMode ? theme.textTertiary : '#9ca3af'};
            margin-top: 2px;
        `;

        itemDiv.appendChild(title);
        itemDiv.appendChild(reason);
        itemDiv.appendChild(position);

        el.errorList.appendChild(itemDiv);
    });

    // Show the section
    el.errorSection.style.display = 'block';
}

// -----------------------------------------------------------------------------
// Update Selected Count
// -----------------------------------------------------------------------------
function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.image-checkbox:checked');
    if (window.panelElements) {
        window.panelElements.selectedCount.textContent = checkboxes.length;
    }
}

// -----------------------------------------------------------------------------
// Render Image List
// -----------------------------------------------------------------------------
function renderImageList() {
    if (!window.panelElements || !libraryData?.items) return;

    const el = window.panelElements;
    el.imagesList.innerHTML = '';

    console.log(`📋 Rendering ${libraryData.items.length} images`);

    libraryData.items.forEach((item, index) => {
        const imageUrl = item.url || item.download_url || item.asset_pointer || item.file_url;
        const title = item.title || `Image ${index + 1}`;
        const isLast = index === libraryData.items.length - 1;

        // Try to get thumbnail from encodings
        let thumbnailUrl = imageUrl; // Fallback to full image

        if (item.encodings && item.encodings.thumbnail && item.encodings.thumbnail.path) {
            thumbnailUrl = item.encodings.thumbnail.path;
            if (index === 0) console.log("✅ Using thumbnail:", thumbnailUrl);
        } else {
            if (index === 0) console.log("⚠️ No thumbnail found, using full image");
        }

        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            border-bottom: ${isLast ? 'none' : `thin solid ${isDarkMode ? '#3a3a3a' : '#e5e7eb'}`};
            transition: background 0.2s, border-color 0.3s;
            cursor: pointer;
        `;

        itemDiv.addEventListener('mouseenter', () => {
            itemDiv.style.background = isDarkMode ? themes.dark.bgTertiary : '#f3f4f6';
        });

        itemDiv.addEventListener('mouseleave', () => {
            itemDiv.style.background = 'transparent';
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'image-checkbox';
        checkbox.checked = true;
        checkbox.dataset.index = index;

        checkbox.addEventListener('change', updateSelectedCount);

        const thumbnail = document.createElement('img');
        thumbnail.src = thumbnailUrl;
        thumbnail.loading = 'lazy';
        thumbnail.style.cssText = `
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
            border: thin solid #d1d5db;
            flex-shrink: 0;
            background: #f3f4f6;
        `;

        thumbnail.onerror = () => {
            console.error(`❌ Failed to load thumbnail for: ${title}`);
        };

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        titleSpan.style.cssText = `
            font-size: 12px;
            color: ${isDarkMode ? themes.dark.text : themes.light.text};
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        `;

        // Click anywhere on the row to toggle checkbox
        itemDiv.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                updateSelectedCount();
            }
        });

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(thumbnail);
        itemDiv.appendChild(titleSpan);

        el.imagesList.appendChild(itemDiv);
    });

    updateSelectedCount();
    console.log(`✅ Rendered ${el.imagesList.children.length} items`);
}

// -----------------------------------------------------------------------------
// Check Authentication
// -----------------------------------------------------------------------------
async function checkAuth() {
    try {
        const res = await browser.runtime.sendMessage({ action: 'getAuth' });
        authToken = res.authToken;
        authHeaders = res.headers || {};

        if (window.panelElements) {
            if (authToken) {
                window.panelElements.auth.textContent = '✓ Authenticated';
                window.panelElements.info.style.display = 'block';
            } else {
                window.panelElements.auth.textContent = '✗ Not authenticated';
                window.panelElements.info.style.display = 'block';
            }
        }
        return authToken;
    } catch (e) {
        console.error('Auth check failed:', e);
        return null;
    }
}

// -----------------------------------------------------------------------------
// Sync state with background script
// -----------------------------------------------------------------------------
async function syncStateWithBackground() {
    try {
        const res = await browser.runtime.sendMessage({ action: 'getDownloadState' });
        if (res.isDownloading) {
            isDownloading = true;
            isPaused = res.isPaused;
            updateUIState(res.isPaused ? 'paused' : 'downloading');
        }
    } catch (e) {
        console.error('State sync failed:', e);
    }
}

// -----------------------------------------------------------------------------
// Show/hide status
// -----------------------------------------------------------------------------
function showStatus(msg, type = 'info') {
    if (!window.panelElements) return;
    const el = window.panelElements.status;

    el.textContent = msg;
    el.style.display = 'block';

    const theme = isDarkMode ? themes.dark : themes.light;

    if (type === 'success') {
        el.style.borderLeftColor = colors.success;
        el.style.background = isDarkMode ? '#1a3a2e' : '#d1fae5';
        el.style.color = isDarkMode ? '#6ee7b7' : '#065f46';
    } else if (type === 'error') {
        el.style.borderLeftColor = colors.error;
        el.style.background = isDarkMode ? '#3a1a1a' : '#fee2e2';
        el.style.color = isDarkMode ? '#fca5a5' : '#991b1b';
    } else {
        el.style.borderLeftColor = theme.textSecondary;
        el.style.background = theme.bgTertiary;
        el.style.color = theme.textSecondary;
    }
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

    el.fetch.disabled = false;
    el.download.disabled = false;
    el.pause.disabled = false;
    el.stop.disabled = false;

    switch (state) {
        case 'initial':
            el.fetch.style.display = 'block';
            el.download.style.display = 'none';
            el.pause.style.display = 'none';
            el.stop.style.display = 'none';
            el.progress.style.display = 'none';
            el.imagesContainer.style.display = 'none';
            el.errorSection.style.display = 'none';
            el.count.textContent = '-'; // Reset count to dash
            break;

        case 'fetched':
            el.fetch.style.display = 'none';
            el.download.style.display = 'block';
            el.pause.style.display = 'none';
            el.stop.style.display = 'none';
            el.progress.style.display = 'none';
            el.imagesContainer.style.display = 'block';
            el.errorSection.style.display = 'none';
            break;

        case 'downloading':
            el.fetch.style.display = 'none';
            el.download.style.display = 'none';
            el.pause.style.display = 'block';
            el.pause.textContent = 'Pause';
            el.stop.style.display = 'block';
            el.progress.style.display = 'block';
            el.imagesContainer.style.display = 'none';
            el.errorSection.style.display = 'none';
            break;

        case 'paused':
            el.fetch.style.display = 'none';
            el.download.style.display = 'none';
            el.pause.style.display = 'block';
            el.pause.textContent = 'Resume';
            el.stop.style.display = 'block';
            el.progress.style.display = 'block';
            el.imagesContainer.style.display = 'none';
            el.errorSection.style.display = 'none';
            break;
    }
}

// -----------------------------------------------------------------------------
// Update Progress
// -----------------------------------------------------------------------------
function updateProgress(current, total, success, failed) {
    if (!window.panelElements) return;
    const el = window.panelElements;

    const percent = Math.round((current / total) * 100);
    el.progressBar.style.width = percent + '%';
    el.progressText.textContent = `${current} / ${total}`;
    el.progressPercent.textContent = `${percent}%`;
    el.progressSuccess.textContent = success;
    el.progressFailed.textContent = failed;
}

// -----------------------------------------------------------------------------
// Fetch Library
// -----------------------------------------------------------------------------
async function fetchLibrary() {
    if (!window.panelElements) return;
    const el = window.panelElements;

    updateUIState('initial');

    el.fetch.disabled = true;
    el.download.disabled = true;
    el.fetch.textContent = '⏳ Fetching...';

    hideStatus();

    try {
        const auth = await checkAuth();
        if (!auth) {
            showStatus('❌ Authentication not found. Please refresh the page.', 'error');
            updateUIState('initial');
            el.fetch.textContent = 'Fetch Images';
            return;
        }

        const resp = await fetch(
            'https://chatgpt.com/backend-api/my/recent/image_gen?limit=9000', { headers: { Accept: '*/*', Authorization: auth, ...authHeaders } }
        );

        if (!resp.ok) throw new Error(`API ${resp.status}`);
        libraryData = await resp.json();

        // Log first item to see structure
        if (libraryData.items?.length > 0) {
            console.log("📸 First image data:", libraryData.items[0]);
            console.log("📸 All fields:", Object.keys(libraryData.items[0]));
        }

        if (!libraryData.items?.length) {
            showStatus('No images found in your library', 'error');
            updateUIState('initial');
            el.fetch.textContent = 'Fetch Images';
            return;
        }

        showStatus(`✓ Found ${libraryData.items.length} images! Ready to download.`, 'success');
        el.count.textContent = libraryData.items.length;
        el.fetch.textContent = 'Fetch Images';

        // Render image list
        renderImageList();

        updateUIState('fetched');
    } catch (e) {
        console.error(e);
        showStatus('Error: ' + e.message, 'error');
        updateUIState('initial');
        el.fetch.textContent = 'Fetch Images';
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

    // Get only selected images
    const checkboxes = document.querySelectorAll('.image-checkbox:checked');
    const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
    const selectedItems = selectedIndices.map(i => libraryData.items[i]);

    if (selectedItems.length === 0) {
        showStatus('No images selected', 'error');
        return;
    }

    hideStatus();
    isDownloading = true;
    updateUIState('downloading');

    try {
        const res = await browser.runtime.sendMessage({
            action: 'startDownload',
            items: selectedItems,
        });

        if (res.status === 'busy') {
            showStatus('Another download already running', 'error');
            isDownloading = false;
            updateUIState('fetched');
        } else if (res.status === 'started') {
            showStatus(`Downloading ${selectedItems.length} images...`, 'info');
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
// Stop Download
// -----------------------------------------------------------------------------
async function stopDownload() {
    if (!window.panelElements) return;

    try {
        await browser.runtime.sendMessage({ action: 'abortDownload' });

        // Reset everything to initial state
        libraryData = null;
        isDownloading = false;
        isPaused = false;

        showStatus('⏹ Download stopped', 'info');
        updateUIState('initial'); // Go back to initial state

        // Hide progress and status after 8 seconds
        setTimeout(() => {
            if (window.panelElements) {
                window.panelElements.progress.style.display = 'none';
                hideStatus();
            }
        }, 8000);
    } catch (e) {
        console.error(e);
        showStatus('Stop failed', 'error');
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
        console.log(`📋 Failed items:`, msg.failedItems);

        // Reset to initial state
        libraryData = null;
        isDownloading = false;
        isPaused = false;

        const allOk = msg.success === msg.total;
        let statusMsg = `✓ Complete! ${msg.success} downloaded`;
        if (msg.failed > 0) {
            statusMsg += `, ${msg.failed} failed`;
        }

        showStatus(statusMsg, allOk ? 'success' : 'error');

        // Go back to initial state after completion
        updateUIState('initial');

        // Show error details AFTER updating UI state (so it doesn't get hidden)
        if (msg.failed > 0 && msg.failedItems && msg.failedItems.length > 0) {
            console.log(`🔴 Displaying ${msg.failedItems.length} failed items`);
            displayErrorDetails(msg.failedItems);
        } else if (msg.failed > 0) {
            console.warn(`⚠️ Failed count is ${msg.failed} but no failedItems array`);
        }

        // Hide progress after 8 seconds
        setTimeout(() => {
            if (window.panelElements) {
                window.panelElements.progress.style.display = 'none';
                hideStatus();
            }
        }, 8000);
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

    if (isOnImagesHub()) {
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