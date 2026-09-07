chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    await chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_PANEL' });
  } catch (error) {
    console.warn('Unable to open Image downloader on this page', error);
  }
});

function sanitizeName(value) {
  return String(value || 'image')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'image';
}

function extensionFor(url) {
  if (url.startsWith('data:image/')) {
    const match = url.match(/^data:image\/([a-z0-9.+-]+)/i);
    return match?.[1]?.replace('jpeg', 'jpg') || 'png';
  }
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.([a-z0-9]{2,5})$/i);
    return match?.[1] || 'jpg';
  } catch (_) {
    return 'jpg';
  }
}

function makeFilename(image, index) {
  const original = sanitizeName(image.name || image.alt || 'image');
  const hasExtension = /\.[a-z0-9]{2,5}$/i.test(original);
  const base = hasExtension ? original : `${original}.${extensionFor(image.url)}`;
  return `page-images/${String(index + 1).padStart(3, '0')}-${base}`;
}

function startDownload(options) {
  return new Promise((resolve, reject) => {
    chrome.downloads.download(options, (downloadId) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(downloadId);
    });
  });
}

const downloadOperations = new Map();

function operationMessage(operation, message) {
  if (!operation.tabId) return;
  chrome.tabs.sendMessage(operation.tabId, message).catch(() => {});
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function startDownloadWithRetry(options, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await startDownload(options);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await wait(350 * attempt);
    }
  }
  throw lastError || new Error('Download failed');
}

async function runDownloadOperation(operation) {
  for (let index = 0; index < operation.images.length; index += 1) {
    if (operation.cancelled) break;
    const image = operation.images[index];
    if (!image?.url || image.url.startsWith('blob:')) {
      operation.failed += 1;
      continue;
    }
    try {
      const downloadId = await startDownloadWithRetry({
        url: image.url,
        filename: makeFilename(image, index),
        conflictAction: 'uniquify',
        saveAs: false
      });
      operation.downloadIds.push(downloadId);
      operation.downloaded += 1;
    } catch (error) {
      console.warn('Unable to download image', image.url, error);
      operation.failed += 1;
    }
    operationMessage(operation, {
      type: 'DOWNLOAD_PROGRESS',
      operationId: operation.id,
      started: operation.downloaded,
      failed: operation.failed,
      total: operation.images.length
    });
  }

  if (operation.cancelled) {
    for (const downloadId of operation.downloadIds) {
      try { await chrome.downloads.cancel(downloadId); } catch (_) {}
    }
  }
  operationMessage(operation, {
    type: 'DOWNLOAD_DONE',
    operationId: operation.id,
    downloaded: operation.downloaded,
    failed: operation.failed,
    canceled: operation.cancelled
  });
  downloadOperations.delete(operation.id);
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'DOWNLOAD_IMAGES') {
    const operation = {
      id: globalThis.crypto?.randomUUID?.() || `download-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      tabId: _sender.tab?.id,
      images: Array.isArray(message.images) ? message.images : [],
      downloaded: 0,
      failed: 0,
      cancelled: false,
      downloadIds: []
    };
    downloadOperations.set(operation.id, operation);
    runDownloadOperation(operation).catch((error) => {
      console.error('Download operation failed', error);
      operation.cancelled = true;
      operationMessage(operation, { type: 'DOWNLOAD_DONE', operationId: operation.id, downloaded: operation.downloaded, failed: operation.failed + 1, canceled: false });
      downloadOperations.delete(operation.id);
    });
    sendResponse({ operationId: operation.id });
    return true;
  }

  if (message?.type === 'CANCEL_DOWNLOAD') {
    const operation = downloadOperations.get(message.operationId);
    if (operation) operation.cancelled = true;
    sendResponse({ ok: true });
    return true;
  }

  return false;
});
