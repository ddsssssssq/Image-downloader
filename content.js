(function installImageDownloader() {
  const HOST_ID = '__image_downloader_host__';
  const SCRIPT_VERSION = '1.1.1';
  if (globalThis.__imageDownloaderInstalledVersion === SCRIPT_VERSION) return;
  globalThis.__imageDownloaderInstalledVersion = SCRIPT_VERSION;

  const TEXT = {
    en: { title: 'Image downloader', scan: 'Scan again', deepScan: 'Deep scan', all: 'Download all', selected: 'Download selected', cancel: 'Cancel', selectAll: 'Select all', close: 'Close', language: 'Language', auto: 'Follow browser', minSize: 'Min size', sort: 'Sort', pageOrder: 'Page order', largest: 'Largest first', smallest: 'Smallest first', scanning: 'Scanning page…', noImages: 'No images found on this page.', count: (all, chosen) => `${all} images · ${chosen} selected`, downloading: (count) => `Starting ${count} downloads…`, progress: (started, total) => `Started ${started} of ${total} downloads…`, finished: (count) => `Started ${count} downloads.`, finishedErrors: (downloaded, failed) => `Started ${downloaded} downloads; ${failed} could not be downloaded.`, canceled: 'Download canceled.', scanFailed: 'Unable to scan this page.', previewUnavailable: 'Preview unavailable', image: (index) => `Image ${index}` },
    zh: { title: 'Image downloader', scan: '重新扫描', deepScan: '深度扫描', all: '下载全部', selected: '下载选中', cancel: '取消下载', selectAll: '全选', close: '关闭', language: '语言', auto: '跟随浏览器', minSize: '最小尺寸', sort: '排序', pageOrder: '页面顺序', largest: '尺寸从大到小', smallest: '尺寸从小到大', scanning: '正在扫描页面…', noImages: '当前页面没有找到图片。', count: (all, chosen) => `共 ${all} 张 · 已选 ${chosen} 张`, downloading: (count) => `正在开始下载 ${count} 张图片…`, progress: (started, total) => `已开始 ${started}/${total} 张下载…`, finished: (count) => `已开始下载 ${count} 张图片。`, finishedErrors: (downloaded, failed) => `已开始下载 ${downloaded} 张图片，另有 ${failed} 张无法下载。`, canceled: '下载已取消。', scanFailed: '扫描页面失败。', previewUnavailable: '无法预览', image: (index) => `图片 ${index}` },
    ja: { title: 'Image downloader', scan: '再スキャン', all: 'すべて保存', selected: '選択を保存', selectAll: 'すべて選択', close: '閉じる', language: '言語', auto: 'ブラウザに合わせる', scanning: 'ページをスキャン中…', noImages: '画像が見つかりません。', count: (all, chosen) => `${all} 枚 · ${chosen} 枚選択`, downloading: (count) => `${count} 枚をダウンロード中…`, finished: (count) => `${count} 枚のダウンロードを開始しました。`, finishedErrors: (downloaded, failed) => `${downloaded} 枚を開始、${failed} 枚をダウンロードできません。`, scanFailed: 'スキャンに失敗しました。', previewUnavailable: 'プレビュー不可', image: (index) => `画像 ${index}` },
    ko: { title: 'Image downloader', scan: '다시 스캔', all: '모두 다운로드', selected: '선택 항목 다운로드', selectAll: '모두 선택', close: '닫기', language: '언어', auto: '브라우저 설정 따르기', scanning: '페이지를 스캔하는 중…', noImages: '이미지를 찾지 못했습니다.', count: (all, chosen) => `이미지 ${all}개 · ${chosen}개 선택`, downloading: (count) => `${count}개 다운로드 시작 중…`, finished: (count) => `${count}개 다운로드를 시작했습니다.`, finishedErrors: (downloaded, failed) => `${downloaded}개 시작, ${failed}개 다운로드 실패`, scanFailed: '스캔하지 못했습니다.', previewUnavailable: '미리보기 불가', image: (index) => `이미지 ${index}` },
    es: { title: 'Image downloader', scan: 'Volver a escanear', all: 'Descargar todo', selected: 'Descargar seleccionadas', selectAll: 'Seleccionar todo', close: 'Cerrar', language: 'Idioma', auto: 'Seguir navegador', scanning: 'Escaneando la página…', noImages: 'No se encontraron imágenes.', count: (all, chosen) => `${all} imágenes · ${chosen} seleccionadas`, downloading: (count) => `Iniciando ${count} descargas…`, finished: (count) => `Se iniciaron ${count} descargas.`, finishedErrors: (downloaded, failed) => `${downloaded} descargas iniciadas; ${failed} no se pudieron descargar.`, scanFailed: 'No se pudo escanear.', previewUnavailable: 'Vista previa no disponible', image: (index) => `Imagen ${index}` },
    fr: { title: 'Image downloader', scan: 'Analyser à nouveau', all: 'Tout télécharger', selected: 'Télécharger la sélection', selectAll: 'Tout sélectionner', close: 'Fermer', language: 'Langue', auto: 'Suivre le navigateur', scanning: 'Analyse de la page…', noImages: 'Aucune image trouvée.', count: (all, chosen) => `${all} images · ${chosen} sélectionnées`, downloading: (count) => `Lancement de ${count} téléchargements…`, finished: (count) => `${count} téléchargements lancés.`, finishedErrors: (downloaded, failed) => `${downloaded} lancés ; ${failed} impossibles à télécharger.`, scanFailed: 'Échec de l’analyse.', previewUnavailable: 'Aperçu indisponible', image: (index) => `Image ${index}` },
    de: { title: 'Image downloader', scan: 'Erneut scannen', all: 'Alle herunterladen', selected: 'Auswahl herunterladen', selectAll: 'Alle auswählen', close: 'Schließen', language: 'Sprache', auto: 'Browsersprache verwenden', scanning: 'Seite wird gescannt…', noImages: 'Keine Bilder gefunden.', count: (all, chosen) => `${all} Bilder · ${chosen} ausgewählt`, downloading: (count) => `${count} Downloads werden gestartet…`, finished: (count) => `${count} Downloads gestartet.`, finishedErrors: (downloaded, failed) => `${downloaded} gestartet; ${failed} konnten nicht geladen werden.`, scanFailed: 'Scan fehlgeschlagen.', previewUnavailable: 'Vorschau nicht verfügbar', image: (index) => `Bild ${index}` },
    pt: { title: 'Image downloader', scan: 'Verificar novamente', all: 'Baixar tudo', selected: 'Baixar selecionadas', selectAll: 'Selecionar tudo', close: 'Fechar', language: 'Idioma', auto: 'Seguir o navegador', scanning: 'Analisando a página…', noImages: 'Nenhuma imagem encontrada.', count: (all, chosen) => `${all} imagens · ${chosen} selecionadas`, downloading: (count) => `Iniciando ${count} downloads…`, finished: (count) => `${count} downloads iniciados.`, finishedErrors: (downloaded, failed) => `${downloaded} iniciados; ${failed} não puderam ser baixados.`, scanFailed: 'Falha ao analisar.', previewUnavailable: 'Pré-visualização indisponível', image: (index) => `Imagem ${index}` },
    ru: { title: 'Image downloader', scan: 'Сканировать снова', all: 'Скачать все', selected: 'Скачать выбранные', selectAll: 'Выбрать все', close: 'Закрыть', language: 'Язык', auto: 'Язык браузера', scanning: 'Сканирование страницы…', noImages: 'Изображения не найдены.', count: (all, chosen) => `${all} изображений · выбрано ${chosen}`, downloading: (count) => `Запуск загрузки: ${count}…`, finished: (count) => `Запущена загрузка: ${count}.`, finishedErrors: (downloaded, failed) => `Запущено ${downloaded}; не удалось скачать ${failed}.`, scanFailed: 'Не удалось просканировать страницу.', previewUnavailable: 'Предпросмотр недоступен', image: (index) => `Изображение ${index}` }
  };

  Object.assign(TEXT.ja, { deepScan: '詳細スキャン', cancel: 'キャンセル', minSize: '最小サイズ', sort: '並べ替え', pageOrder: 'ページ順', largest: '大きい順', smallest: '小さい順', progress: (started, total) => `${started}/${total} 件を開始…`, canceled: 'ダウンロードをキャンセルしました。' });
  Object.assign(TEXT.ko, { deepScan: '정밀 스캔', cancel: '취소', minSize: '최소 크기', sort: '정렬', pageOrder: '페이지 순서', largest: '큰 순서', smallest: '작은 순서', progress: (started, total) => `${started}/${total}개 시작…`, canceled: '다운로드를 취소했습니다.' });
  Object.assign(TEXT.es, { deepScan: 'Escaneo profundo', cancel: 'Cancelar', minSize: 'Tamaño mínimo', sort: 'Ordenar', pageOrder: 'Orden de página', largest: 'Más grandes primero', smallest: 'Más pequeñas primero', progress: (started, total) => `${started}/${total} descargas iniciadas…`, canceled: 'Descarga cancelada.' });
  Object.assign(TEXT.fr, { deepScan: 'Analyse approfondie', cancel: 'Annuler', minSize: 'Taille min.', sort: 'Trier', pageOrder: 'Ordre de la page', largest: 'Plus grandes', smallest: 'Plus petites', progress: (started, total) => `${started}/${total} téléchargements lancés…`, canceled: 'Téléchargement annulé.' });
  Object.assign(TEXT.de, { deepScan: 'Tiefenscan', cancel: 'Abbrechen', minSize: 'Mindestgröße', sort: 'Sortieren', pageOrder: 'Seitenreihenfolge', largest: 'Größte zuerst', smallest: 'Kleinste zuerst', progress: (started, total) => `${started}/${total} Downloads gestartet…`, canceled: 'Download abgebrochen.' });
  Object.assign(TEXT.pt, { deepScan: 'Verificação profunda', cancel: 'Cancelar', minSize: 'Tamanho mín.', sort: 'Ordenar', pageOrder: 'Ordem da página', largest: 'Maiores primeiro', smallest: 'Menores primeiro', progress: (started, total) => `${started}/${total} downloads iniciados…`, canceled: 'Download cancelado.' });
  Object.assign(TEXT.ru, { deepScan: 'Глубокое сканирование', cancel: 'Отмена', minSize: 'Мин. размер', sort: 'Сортировка', pageOrder: 'Порядок страницы', largest: 'Сначала большие', smallest: 'Сначала маленькие', progress: (started, total) => `Запущено ${started} из ${total}…`, canceled: 'Загрузка отменена.' });

  function browserLanguage() {
    const locale = (navigator.language || '').toLowerCase();
    if (locale.startsWith('zh')) return 'zh';
    if (locale.startsWith('ja')) return 'ja';
    if (locale.startsWith('ko')) return 'ko';
    if (locale.startsWith('es')) return 'es';
    if (locale.startsWith('fr')) return 'fr';
    if (locale.startsWith('de')) return 'de';
    if (locale.startsWith('pt')) return 'pt';
    if (locale.startsWith('ru')) return 'ru';
    return 'en';
  }

  let languageMode = 'auto';
  let language = browserLanguage();
  let shadow;
  let allImages = [];
  let images = [];
  let selected = new Set();
  let scanToken = 0;
  let minSize = 0;
  let sortMode = 'page';
  let currentOperationId = null;

  function text(key, ...args) {
    const value = TEXT[language][key] ?? TEXT.en[key] ?? key;
    return typeof value === 'function' ? value(...args) : value;
  }

  function make(tag, properties = {}) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(properties)) {
      if (key === 'className') element.className = value;
      else if (key === 'textContent') element.textContent = value;
      else if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(), value);
      else element.setAttribute(key, value);
    }
    return element;
  }

  function setStatus(value, isError = false) {
    const status = shadow?.querySelector('.id-status');
    if (!status) return;
    status.textContent = value;
    status.classList.toggle('error', isError);
  }

  function updateControls() {
    if (!shadow) return;
    const total = images.length;
    const chosen = selected.size;
    shadow.querySelector('.id-count').textContent = text('count', total, chosen);
    shadow.querySelector('.id-all').disabled = total === 0 || Boolean(currentOperationId);
    shadow.querySelector('.id-selected').disabled = chosen === 0 || Boolean(currentOperationId);
    shadow.querySelector('.id-deep-scan').disabled = Boolean(currentOperationId);
    shadow.querySelector('.id-scan').disabled = Boolean(currentOperationId);
    shadow.querySelector('.id-cancel').disabled = !currentOperationId;
    const selectAll = shadow.querySelector('.id-select-all');
    selectAll.disabled = total === 0;
    selectAll.checked = total > 0 && chosen === total;
    selectAll.indeterminate = chosen > 0 && chosen < total;
  }

  function updateLabels() {
    if (!shadow) return;
    shadow.querySelector('.id-title').textContent = text('title');
    shadow.querySelector('.id-scan').textContent = text('scan');
    shadow.querySelector('.id-deep-scan').textContent = text('deepScan');
    shadow.querySelector('.id-all').textContent = text('all');
    shadow.querySelector('.id-selected').textContent = text('selected');
    shadow.querySelector('.id-cancel').textContent = text('cancel');
    shadow.querySelector('.id-select-label').textContent = text('selectAll');
    shadow.querySelector('.id-min-size-label').textContent = text('minSize');
    shadow.querySelector('.id-sort-label').textContent = text('sort');
    shadow.querySelector('.id-sort-page').textContent = text('pageOrder');
    shadow.querySelector('.id-sort-largest').textContent = text('largest');
    shadow.querySelector('.id-sort-smallest').textContent = text('smallest');
    shadow.querySelector('.id-close').title = text('close');
    shadow.querySelector('.id-close').setAttribute('aria-label', text('close'));
    shadow.querySelector('.id-language-label').textContent = text('language');
    shadow.querySelector('.id-language-select').setAttribute('aria-label', text('language'));
    shadow.querySelector('.id-language-select').value = languageMode;
    shadow.querySelector('.id-language-select').options[0].textContent = text('auto');
    updateControls();
    renderGrid();
  }

  function renderGrid() {
    const grid = shadow?.querySelector('.id-grid');
    if (!grid) return;
    grid.replaceChildren();
    images.forEach((image, index) => {
      const card = make('label', { className: 'id-card' });
      if (selected.has(index)) card.classList.add('selected');
      const preview = make('img', { loading: 'lazy', alt: image.alt || text('image', index + 1) });
      preview.referrerPolicy = 'strict-origin-when-cross-origin';
      preview.src = image.url;
      preview.addEventListener('error', () => {
        preview.remove();
        card.appendChild(make('span', { className: 'id-broken', textContent: text('previewUnavailable') }));
      }, { once: true });
      const checkbox = make('input', { type: 'checkbox' });
      checkbox.checked = selected.has(index);
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) selected.add(index);
        else selected.delete(index);
        card.classList.toggle('selected', checkbox.checked);
        updateControls();
      });
      card.append(preview, checkbox);
      grid.appendChild(card);
    });
    updateControls();
  }

  function addStyle() {
    const style = make('style');
    style.textContent = `
      :host { all: initial; }
      * { box-sizing: border-box; }
      .id-panel { width: 420px; max-width: 100vw; height: 100vh; max-height: 100vh; display: flex; flex-direction: column; color: #172033; background: #fff; border-left: 1px solid #d9dee8; box-shadow: -5px 0 24px rgba(16,24,40,.18); font-family: Inter, Arial, sans-serif; }
      .id-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px; border-bottom: 1px solid #e4e8ef; }
      .id-title { margin: 0; font-size: 17px; font-weight: 700; line-height: 1.2; }
      .id-header-actions { display: flex; align-items: center; gap: 8px; }
      .id-language { display: flex; align-items: center; gap: 5px; color: #667085; font-size: 11px; }
      .id-language-select { height: 28px; padding: 0 4px; border: 1px solid #d0d5dd; border-radius: 6px; color: #344054; background: #fff; font-size: 12px; }
      .id-close { width: 29px; height: 29px; border: 1px solid #e4e8ef; border-radius: 6px; color: #475467; background: #f8fafc; font-size: 18px; line-height: 1; cursor: pointer; }
      .id-actions { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 10px 14px; border-bottom: 1px solid #e4e8ef; }
      .id-button { min-height: 34px; padding: 0 7px; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; }
      .id-button:disabled { cursor: not-allowed; opacity: .45; }
      .id-all { border: 1px solid #2463eb; color: #fff; background: #2463eb; }
      .id-selected, .id-scan, .id-deep-scan, .id-cancel { border: 1px solid #d0d5dd; color: #344054; background: #fff; }
      .id-toolbar { display: flex; align-items: center; justify-content: space-between; min-height: 38px; padding: 0 14px; }
      .id-select-wrap { display: flex; align-items: center; gap: 7px; color: #344054; font-size: 12px; user-select: none; }
      .id-select-all { width: 15px; height: 15px; accent-color: #2463eb; }
      .id-count { color: #667085; font-size: 11px; }
      .id-filters { display: flex; align-items: center; gap: 10px; padding: 0 14px 9px; color: #667085; font-size: 11px; }
      .id-filter { display: flex; align-items: center; gap: 5px; }
      .id-filter select { height: 26px; padding: 0 4px; border: 1px solid #d0d5dd; border-radius: 6px; color: #344054; background: #fff; font-size: 11px; }
      .id-status { min-height: 22px; padding: 0 14px 5px; color: #667085; font-size: 12px; }
      .id-status.error { color: #b42318; }
      .id-body { flex: 1; min-height: 0; overflow: auto; }
      .id-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 0 14px 16px; }
      .id-card { position: relative; aspect-ratio: 1; overflow: hidden; border: 1px solid #e4e8ef; border-radius: 7px; background: #f5f7fa; cursor: pointer; }
      .id-card.selected { border: 2px solid #2463eb; }
      .id-card img { display: block; width: 100%; height: 100%; object-fit: cover; }
      .id-card input { position: absolute; top: 5px; left: 5px; width: 16px; height: 16px; margin: 0; accent-color: #2463eb; filter: drop-shadow(0 1px 2px rgba(0,0,0,.4)); }
      .id-broken { display: grid; width: 100%; height: 100%; place-items: center; padding: 8px; color: #667085; font-size: 11px; text-align: center; }
      @media (max-width: 360px) { .id-panel { width: 100vw; } .id-grid { grid-template-columns: repeat(3, 1fr); } .id-actions { grid-template-columns: 1fr 1fr; } .id-scan { grid-column: 1 / -1; }
      }
    `;
    shadow.appendChild(style);
  }

  function createPanel() {
    const host = document.createElement('div');
    host.id = HOST_ID;
    Object.assign(host.style, { position: 'fixed', top: '0', right: '0', bottom: '0', zIndex: '2147483647' });
    shadow = host.attachShadow({ mode: 'open' });
    addStyle();

    const panel = make('section', { className: 'id-panel', role: 'dialog', 'aria-label': text('title') });
    const header = make('header', { className: 'id-header' });
    const title = make('h1', { className: 'id-title', textContent: text('title') });
    const headerActions = make('div', { className: 'id-header-actions' });
    const languageWrap = make('label', { className: 'id-language' });
    const languageLabel = make('span', { className: 'id-language-label', textContent: text('language') });
    const languageSelect = make('select', { className: 'id-language-select', 'aria-label': text('language') });
    languageSelect.append(
      make('option', { value: 'auto', textContent: text('auto') }),
      make('option', { value: 'zh', textContent: '中文' }),
      make('option', { value: 'en', textContent: 'English' }),
      make('option', { value: 'ja', textContent: '日本語' }),
      make('option', { value: 'ko', textContent: '한국어' }),
      make('option', { value: 'es', textContent: 'Español' }),
      make('option', { value: 'fr', textContent: 'Français' }),
      make('option', { value: 'de', textContent: 'Deutsch' }),
      make('option', { value: 'pt', textContent: 'Português' }),
      make('option', { value: 'ru', textContent: 'Русский' })
    );
    languageSelect.value = languageMode;
    languageSelect.addEventListener('change', async () => {
      languageMode = languageSelect.value;
      language = languageMode === 'auto' ? browserLanguage() : languageMode;
      await chrome.storage.local.set({ imageDownloaderLanguage: languageMode });
      updateLabels();
    });
    languageWrap.append(languageLabel, languageSelect);
    const close = make('button', { className: 'id-close', type: 'button', title: text('close'), 'aria-label': text('close'), textContent: '×' });
    close.addEventListener('click', closePanel);
    headerActions.append(languageWrap, close);
    header.append(title, headerActions);

    const actions = make('div', { className: 'id-actions' });
    const allButton = make('button', { className: 'id-button id-all', type: 'button', textContent: text('all') });
    const selectedButton = make('button', { className: 'id-button id-selected', type: 'button', textContent: text('selected') });
    const deepScanButton = make('button', { className: 'id-button id-deep-scan', type: 'button', textContent: text('deepScan') });
    const scanButton = make('button', { className: 'id-button id-scan', type: 'button', textContent: text('scan') });
    const cancelButton = make('button', { className: 'id-button id-cancel', type: 'button', textContent: text('cancel'), disabled: 'true' });
    allButton.addEventListener('click', () => download(images));
    selectedButton.addEventListener('click', () => download([...selected].sort((a, b) => a - b).map((index) => images[index])));
    deepScanButton.addEventListener('click', () => scanPage(true));
    scanButton.addEventListener('click', () => scanPage(false));
    cancelButton.addEventListener('click', cancelDownload);
    actions.append(allButton, selectedButton, deepScanButton, scanButton, cancelButton);

    const filters = make('div', { className: 'id-filters' });
    const minSizeWrap = make('label', { className: 'id-filter' });
    const minSizeLabel = make('span', { className: 'id-min-size-label', textContent: text('minSize') });
    const minSizeSelect = make('select', { className: 'id-min-size', 'aria-label': text('minSize') });
    [0, 64, 128, 256, 512].forEach((value) => minSizeSelect.append(make('option', { value: String(value), textContent: value ? `${value}px` : '—' })));
    minSizeSelect.value = String(minSize);
    minSizeSelect.addEventListener('change', () => {
      minSize = Number(minSizeSelect.value) || 0;
      applyFilters();
    });
    minSizeWrap.append(minSizeLabel, minSizeSelect);
    const sortWrap = make('label', { className: 'id-filter' });
    const sortLabel = make('span', { className: 'id-sort-label', textContent: text('sort') });
    const sortSelect = make('select', { className: 'id-sort', 'aria-label': text('sort') });
    sortSelect.append(
      make('option', { className: 'id-sort-page', value: 'page', textContent: text('pageOrder') }),
      make('option', { className: 'id-sort-largest', value: 'largest', textContent: text('largest') }),
      make('option', { className: 'id-sort-smallest', value: 'smallest', textContent: text('smallest') })
    );
    sortSelect.value = sortMode;
    sortSelect.addEventListener('change', () => {
      sortMode = sortSelect.value;
      applyFilters();
    });
    sortWrap.append(sortLabel, sortSelect);
    filters.append(minSizeWrap, sortWrap);

    const toolbar = make('div', { className: 'id-toolbar' });
    const selectWrap = make('label', { className: 'id-select-wrap' });
    const selectAll = make('input', { className: 'id-select-all', type: 'checkbox' });
    const selectLabel = make('span', { className: 'id-select-label', textContent: text('selectAll') });
    selectAll.addEventListener('change', () => {
      selected = selectAll.checked ? new Set(images.map((_, index) => index)) : new Set();
      renderGrid();
    });
    selectWrap.append(selectAll, selectLabel);
    toolbar.append(selectWrap, make('span', { className: 'id-count', textContent: text('count', 0, 0) }));

    const status = make('div', { className: 'id-status' });
    const body = make('main', { className: 'id-body' });
    body.append(make('div', { className: 'id-grid' }));
    panel.append(header, actions, filters, toolbar, status, body);
    shadow.appendChild(panel);
    document.documentElement.appendChild(host);
    scanPage();
  }

  function closePanel() {
    document.getElementById(HOST_ID)?.remove();
    shadow = null;
  }

  function absoluteUrl(value) {
    if (!value || typeof value !== 'string') return null;
    const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
    if (!trimmed || trimmed.startsWith('#')) return null;
    try {
      const url = new URL(trimmed, document.baseURI);
      if (['http:', 'https:', 'data:', 'blob:'].includes(url.protocol)) return url.href;
    } catch (_) {}
    return null;
  }

  function addUrl(map, value, alt = '', dimensions = {}) {
    const url = absoluteUrl(value);
    if (!url) return;
    if (map.has(url)) {
      const existing = map.get(url);
      existing.width = Math.max(existing.width || 0, dimensions.width || 0);
      existing.height = Math.max(existing.height || 0, dimensions.height || 0);
      return;
    }
    let name = alt.trim().slice(0, 100);
    if (!name) {
      try { name = decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || 'image'); } catch (_) { name = 'image'; }
    }
    map.set(url, { url, alt: alt.trim(), name, width: dimensions.width || 0, height: dimensions.height || 0 });
  }

  function addSrcset(map, value, alt = '') {
    if (!value) return;
    const candidates = value.split(',').map((part) => {
      const bits = part.trim().split(/\s+/);
      const descriptor = bits[1] || '';
      const number = Number.parseFloat(descriptor);
      return { url: bits[0], score: Number.isFinite(number) ? number : 1 };
    }).filter((candidate) => candidate.url);
    if (!candidates.length) return;
    const target = window.devicePixelRatio || 1;
    const selectedCandidate = candidates.sort((a, b) => a.score - b.score).find((candidate) => candidate.score >= target) || candidates[candidates.length - 1];
    addUrl(map, selectedCandidate.url, alt);
  }

  function addCssUrls(map, value) {
    if (!value) return;
    for (const match of value.matchAll(/url\((['"]?)(.*?)\1\)/gi)) addUrl(map, match[2]);
  }

  function scanElementTree(root, map) {
    const elements = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (const element of elements) {
      const tag = element.tagName.toLowerCase();
      const alt = element.getAttribute('alt') || element.getAttribute('aria-label') || '';
      if (tag === 'img') {
        const dimensions = { width: element.naturalWidth || 0, height: element.naturalHeight || 0 };
        if (element.currentSrc) addUrl(map, element.currentSrc, alt, dimensions);
        else {
          addUrl(map, element.getAttribute('src'), alt, dimensions);
          addSrcset(map, element.getAttribute('srcset'), alt);
        }
      }
      if (tag === 'source') {
        addUrl(map, element.getAttribute('src'), alt);
        addSrcset(map, element.getAttribute('srcset'), alt);
      }
      if (tag === 'input' && element.type === 'image') addUrl(map, element.getAttribute('src'), alt);
      if (tag === 'video') addUrl(map, element.getAttribute('poster'), alt);
      if (tag === 'object' || tag === 'embed') addUrl(map, element.getAttribute('data') || element.getAttribute('src'), alt);
      if (tag === 'image') addUrl(map, element.getAttribute('href') || element.getAttribute('xlink:href'), alt);

      for (const attributeName of element.getAttributeNames()) {
        if (!/(src|image|photo|picture|thumb|poster|background|original|lazy|avatar|url)/i.test(attributeName)) continue;
        const value = element.getAttribute(attributeName);
        if (/srcset/i.test(attributeName)) addSrcset(map, value, alt);
        else {
          addUrl(map, value, alt);
          addCssUrls(map, value);
        }
      }

      const style = getComputedStyle(element);
      addCssUrls(map, style.backgroundImage);
      addCssUrls(map, style.content);
      for (const pseudo of ['::before', '::after']) {
        const pseudoStyle = getComputedStyle(element, pseudo);
        addCssUrls(map, pseudoStyle.backgroundImage);
        addCssUrls(map, pseudoStyle.content);
      }
      if (element.shadowRoot) scanElementTree(element.shadowRoot, map);
    }
  }

  function probeImage(url) {
    return new Promise((resolve) => {
      const image = new Image();
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(value);
      };
      const timer = setTimeout(() => finish(false), 1800);
      image.referrerPolicy = 'strict-origin-when-cross-origin';
      image.onload = () => finish({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => finish(false);
      image.src = url;
    });
  }

  async function keepLoadableImages(candidates) {
    const valid = [];
    let cursor = 0;
    async function worker() {
      while (cursor < candidates.length) {
        const index = cursor;
        cursor += 1;
        const dimensions = await probeImage(candidates[index].url);
        if (dimensions) valid.push({ ...candidates[index], width: Math.max(candidates[index].width || 0, dimensions.width || 0), height: Math.max(candidates[index].height || 0, dimensions.height || 0) });
      }
    }
    await Promise.all(Array.from({ length: Math.min(8, candidates.length) }, worker));
    return valid;
  }

  function applyFilters() {
    const filtered = allImages.filter((image) => !minSize || (image.width >= minSize && image.height >= minSize));
    if (sortMode === 'largest') filtered.sort((a, b) => (b.width * b.height) - (a.width * a.height));
    if (sortMode === 'smallest') filtered.sort((a, b) => (a.width * a.height) - (b.width * b.height));
    images = filtered;
    selected = new Set();
    renderGrid();
  }

  function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async function deepScroll() {
    const originalPosition = window.scrollY;
    const maxPosition = Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0);
    const step = Math.max(Math.floor(window.innerHeight * 0.8), 400);
    for (let position = 0; position <= maxPosition; position += step) {
      window.scrollTo(0, position);
      await wait(120);
    }
    window.scrollTo(0, maxPosition);
    await wait(250);
    window.scrollTo(0, originalPosition);
    await wait(100);
  }

  async function scanPage(deep = false) {
    if (!shadow) return;
    const token = ++scanToken;
    setStatus(text('scanning'));
    allImages = [];
    images = [];
    selected = new Set();
    updateControls();
    if (deep) await deepScroll();
    setTimeout(async () => {
      if (token !== scanToken || !shadow) return;
      try {
        const map = new Map();
        scanElementTree(document, map);
        document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"], link[rel="image_src"]').forEach((element) => {
          addUrl(map, element.getAttribute('content') || element.getAttribute('href'));
        });
        allImages = await keepLoadableImages([...map.values()]);
        if (token !== scanToken || !shadow) return;
        applyFilters();
        setStatus(images.length ? '' : text('noImages'));
      } catch (error) {
        console.error(error);
        setStatus(text('scanFailed'), true);
      }
    }, 80);
  }

  async function download(items) {
    if (!items.length || currentOperationId) return;
    setStatus(text('downloading', items.length));
    updateControls();
    try {
      const result = await chrome.runtime.sendMessage({ type: 'DOWNLOAD_IMAGES', images: items, pageTitle: document.title });
      if (!result?.operationId) throw new Error('No download operation was created');
      currentOperationId = result.operationId;
      updateControls();
    } catch (error) {
      console.error(error);
      setStatus(text('finishedErrors', 0, items.length), true);
      updateControls();
    }
  }

  async function cancelDownload() {
    if (!currentOperationId) return;
    const operationId = currentOperationId;
    try {
      await chrome.runtime.sendMessage({ type: 'CANCEL_DOWNLOAD', operationId });
      setStatus(text('canceled'));
    } catch (error) {
      console.error(error);
    }
  }

  chrome.storage.local.get('imageDownloaderLanguage').then((result) => {
    const saved = result.imageDownloaderLanguage;
    if (saved === 'auto' || Object.prototype.hasOwnProperty.call(TEXT, saved)) {
      languageMode = saved;
      language = saved === 'auto' ? browserLanguage() : saved;
      if (shadow) updateLabels();
    }
  }).catch(() => {});

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === 'DOWNLOAD_PROGRESS' && message.operationId === currentOperationId) {
      setStatus(text('progress', message.started, message.total));
      return;
    }
    if (message?.type === 'DOWNLOAD_DONE' && message.operationId === currentOperationId) {
      currentOperationId = null;
      if (message.canceled) setStatus(text('canceled'));
      else if (message.failed) setStatus(text('finishedErrors', message.downloaded, message.failed), true);
      else setStatus(text('finished', message.downloaded || 0));
      updateControls();
      return;
    }
    if (message?.type !== 'TOGGLE_PANEL') return;
    if (document.getElementById(HOST_ID)) closePanel();
    else createPanel();
  });
})();
