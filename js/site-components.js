(function () {
  if (window.__siteComponentsLoaded) return;
  window.__siteComponentsLoaded = true;

  /* ── Detect current page for active nav ── */
  var PAGE_MAP = {
    'index.html': 'home', '': 'home',
    'education.html': 'education',
    'experience.html': 'experience',
    'publication.html': 'publication', 'conferences.html': 'publication',
    'project.html': 'project', 'grant.html': 'project', 'industry.html': 'project',
    'award.html': 'award',
    'event.html': 'event',
    'blog.html': 'blog', 'social-life.html': 'blog', 'academics.html': 'blog', 'sports.html': 'blog', 'avocations.html': 'blog'
  };
  function getCurrentHtmlFile() {
    var fileName = window.location.pathname.split('/').pop() || 'index.html';
    try {
      fileName = decodeURIComponent(fileName);
    } catch (error) {
      console.warn('[Site] Could not decode current page filename:', fileName, error);
    }
    if (!/\.html$/i.test(fileName)) fileName = 'index.html';
    return fileName.toLowerCase();
  }

  var currentFile = getCurrentHtmlFile();
  var activePage  = PAGE_MAP[currentFile] || '';

  /* ── Header HTML ── */
  var HEADER_HTML =
    '<div id="nav-progress"></div>' +
    '<header class="header_area">' +
    '  <div class="main_menu">' +
    '    <nav class="navbar navbar-expand-lg navbar-light">' +
    '      <div class="container">' +
    '        <a class="navbar-brand logo_h" href="index.html#contact">' +
    '          <img class="nav-logo-img" src="files/1.%20Home/logo-header-name-only.png" alt="Dr. Anubha Parashar">' +
    '        </a>' +
    '        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"' +
    '          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
    '          <span class="icon-bar"></span>' +
    '          <span class="icon-bar"></span>' +
    '          <span class="icon-bar"></span>' +
    '        </button>' +
    '        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">' +
    '          <ul class="nav navbar-nav menu_nav justify-content-end">' +
    '            <li class="nav-item" data-nav="home"><a class="nav-link" href="index.html">Home</a></li>' +
    '            <li class="nav-item" data-nav="education"><a class="nav-link" href="education.html">Education</a></li>' +
    '            <li class="nav-item" data-nav="experience"><a class="nav-link" href="experience.html">Experience</a></li>' +
    '            <li class="nav-item" data-nav="publication"><a class="nav-link" href="publication.html">Publications</a></li>' +
    '            <li class="nav-item submenu dropdown" data-nav="project">' +
    '              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"' +
    '                aria-haspopup="true" aria-expanded="false">Projects</a>' +
    '              <ul class="dropdown-menu">' +
    '                <li class="nav-item"><a class="nav-link" href="project.html">Projects</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="grant.html">Grant</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="industry.html">Industry</a></li>' +
    '              </ul>' +
    '            </li>' +
    '            <li class="nav-item" data-nav="award"><a class="nav-link" href="award.html">Awards</a></li>' +
    '            <li class="nav-item" data-nav="event"><a class="nav-link" href="event.html">Leadership</a></li>' +
    '            <li class="nav-item submenu dropdown" data-nav="blog">' +
    '              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"' +
    '                aria-haspopup="true" aria-expanded="false">Blog</a>' +
    '              <ul class="dropdown-menu">' +
    '                <li class="nav-item"><a class="nav-link" href="blog.html">Blog Overview</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="academics.html">Academics</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="social-life.html">Social Life</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="sports.html">Sports</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="avocations.html">Avocations</a></li>' +
    '              </ul>' +
    '            </li>' +
    '          </ul>' +
    '        </div>' +
    '      </div>' +
    '    </nav>' +
    '  </div>' +
    '</header>';

  /* ── Footer HTML ── */
  var FOOTER_HTML =
    '<footer class="exp-footer">' +
    '  <div class="container">' +
    '    <a href="#" class="back-top"><i class="fa fa-chevron-up"></i></a>' +
    '    <h5>Connect with Anubha</h5>' +
    '    <div class="footer-icon-group">' +
    '      <p class="footer-icon-group-label">Social</p>' +
    '      <div class="footer-icons">' +
    '        <a href="https://www.linkedin.com/in/anubhaparashar/" target="_blank" class="ficon" title="LinkedIn" style="background:#0077b5;border-color:#0077b5;"><i class="fa fa-linkedin"></i></a>' +
    '        <a href="https://github.com/anubhaparashar" target="_blank" class="ficon" title="GitHub @anubhaparashar"><i class="fa fa-github"></i></a>' +
    '        <a href="https://github.com/dranubhaparashar" target="_blank" class="ficon" title="GitHub @dranubhaparashar"><i class="fa fa-github"></i></a>' +
    '        <a href="https://twitter.com/parashar_anubha" target="_blank" class="ficon" title="Twitter" style="background:#1da1f2;border-color:#1da1f2;"><i class="fa fa-twitter"></i></a>' +
    '        <a href="https://www.facebook.com/anubha.parashar/" target="_blank" class="ficon" title="Facebook" style="background:#1877f2;border-color:#1877f2;"><i class="fa fa-facebook"></i></a>' +
    '        <a href="https://www.instagram.com/anubha_parashar/" target="_blank" class="ficon" title="Instagram" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);border-color:#e6683c;"><i class="fa fa-instagram"></i></a>' +
    '        <a href="https://www.youtube.com/channel/UCmC85DV_GWSe3scjD-PcRhg" target="_blank" class="ficon" title="YouTube" style="background:#ff0000;border-color:#ff0000;"><i class="fa fa-youtube"></i></a>' +
    '        <a href="https://in.pinterest.com/anubhaparashar1025/" target="_blank" class="ficon" title="Pinterest" style="background:#e60023;border-color:#e60023;"><i class="fa fa-pinterest"></i></a>' +
    '        <a href="https://pearce-services.com/" target="_blank" class="ficon" title="Pearce Services"><i class="fa fa-building-o"></i></a>' +
    '        <a href="https://huggingface.co/AnubhaParashar/spaces" target="_blank" class="ficon" title="Hugging Face"><img src="img/icons/hugging-face.svg" alt="Hugging Face" class="hf-footer-logo"></a>' +
    '        <a href="https://anubhaparashar.blogspot.com/" target="_blank" class="ficon" title="Anubha\'s Blog" style="background:#e07b39;border-color:#e07b39;font-size:.75rem;font-weight:800;">Blog</a>' +
    '        <a href="http://cooltechnoupdates.blogspot.com/" target="_blank" class="ficon" title="Cool Tech Updates" style="background:#c0622a;border-color:#c0622a;font-size:.75rem;font-weight:800;">Tech</a>' +
    '        <a href="https://cool-computer-tricks-n-tips.blogspot.com/" target="_blank" class="ficon" title="Computer Tricks Blog" style="background:#a0522d;border-color:#a0522d;font-size:.75rem;font-weight:800;">Tips</a>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer-icon-group">' +
    '      <p class="footer-icon-group-label">Academic Profiles</p>' +
    '      <div class="footer-icons">' +
    '        <a href="https://scholar.google.com/citations?user=hrwpIAgAAAAJ&hl=en" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/scholar.svg" alt="Google Scholar"> Scholar</a>' +
    '        <a href="https://www.scopus.com/authid/detail.uri?authorId=57191284351" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/scopus.svg" alt="Scopus"> Scopus</a>' +
    '        <a href="https://orcid.org/my-orcid?orcid=0000-0002-8474-3623" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/orcid.svg" alt="ORCID"> ORCID</a>' +
    '        <a href="https://www.webofscience.com/wos/author/record/L-7545-2017" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/wos.svg" alt="Web of Science"> WoS</a>' +
    '        <a href="https://www.semanticscholar.org/author/Anubha-Parashar/2714843" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/semantic.svg" alt="Semantic Scholar"> Semantic</a>' +
    '        <a href="https://www.researchgate.net/profile/Anubha-Parashar" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/researchgate.svg" alt="ResearchGate"> ResearchGate</a>' +
    '        <a href="https://muj.academia.edu/AnubhaParashar" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/academia.svg" alt="Academia"> Academia</a>' +
    '        <a href="https://medium.com/@anubhaparashar1025" target="_blank" class="ficon-pill"><img src="files/1.%20Home/icons/medium.svg" alt="Medium"> Medium</a>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer-emails">' +
    '      <a href="mailto:dranubhaparashar@gmail.com" class="footer-email-link"><i class="fa fa-envelope"></i> dranubhaparashar@gmail.com</a>' +
    '      <a href="mailto:anubhaparashar1025@gmail.com" class="footer-email-link"><i class="fa fa-envelope-o"></i> anubhaparashar1025@gmail.com</a>' +
    '      <a href="mailto:anubha.parashar@cbre.com" class="footer-email-link"><i class="fa fa-envelope-square"></i> anubha.parashar@cbre.com</a>' +
    '    </div>' +
    '    <p class="footer-copy">&copy; Dr. Anubha Parashar &nbsp;&middot;&nbsp; Analytics &amp; AI Engineer</p>' +
    '    <p class="footer-views"><i class="fa fa-eye"></i> <span id="footer-view-count">—</span> page views</p>' +
    '    <p class="footer-admin"><a href="admin-comments.html" class="admin-comments-link">Admin</a> &middot; <a href="https://anubhaparashar.github.io/personal-knowledge-vault/" class="admin-comments-link">Diary</a></p>' +
    '  </div>' +
    '</footer>';

  function init() {
    /* Inject header */
    var headerRoot = document.getElementById('site-header');
    if (headerRoot) headerRoot.innerHTML = HEADER_HTML;

    /* Inject footer */
    var footerRoot = document.getElementById('site-footer');

    if (!footerRoot) {
      footerRoot = document.createElement('div');
      footerRoot.id = 'site-footer';
      document.body.appendChild(footerRoot);
    }

    footerRoot.innerHTML = FOOTER_HTML;

    /* Mark active nav item */
    if (activePage) {
      var items = document.querySelectorAll('.nav-item[data-nav="' + activePage + '"]');
      for (var i = 0; i < items.length; i++) {
        items[i].classList.add('active');
      }
    }

    /* Scroll progress bar + glass shadow */
    var progress = document.getElementById('nav-progress');
    var header   = document.querySelector('.header_area');
    if (progress && header) {
      function onScroll() {
        var st  = window.scrollY || document.documentElement.scrollTop;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (st / max) * 100 : 0) + '%';
        if (st > 60) header.classList.add('glass-active');
        else         header.classList.remove('glass-active');
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Page view counter - per-page key */
    var pageKey = currentFile || 'index.html';
    var counterBaseUrl = 'https://api.counterapi.dev/v1/anubhaparashar.github.io/' + encodeURIComponent(pageKey);
    var COUNTER_CACHE_PREFIX = 'site-page-view-count:';
    var COUNTER_SUCCESS_PREFIX = 'site-page-view-increment-success-at:';
    var COUNTER_LEGACY_ATTEMPT_PREFIX = 'site-page-view-increment-at:';
    var COUNTER_FAILURE_PREFIX = 'site-page-view-request-failed-at:';
    var COUNTER_TTL_MS = 24 * 60 * 60 * 1000;
    var COUNTER_RETRY_MS = 5 * 60 * 1000;
    var COUNTER_TIMEOUT_MS = 8000;

    var cacheKey = COUNTER_CACHE_PREFIX + pageKey;
    var successKey = COUNTER_SUCCESS_PREFIX + pageKey;
    var legacyAttemptKey = COUNTER_LEGACY_ATTEMPT_PREFIX + pageKey;
    var failureKey = COUNTER_FAILURE_PREFIX + pageKey;

    function toCounterNumber(value) {
      if (typeof value === 'number' && isFinite(value)) return value;
      if (typeof value === 'string' && value.trim() !== '') {
        var parsed = Number(value);
        if (isFinite(parsed)) return parsed;
      }
      return null;
    }

    function extractCounterValue(payload) {
      var nestedData = payload && payload.data && payload.data.data;
      var candidates = [
        nestedData && nestedData.up_count,
        nestedData && nestedData.count,
        nestedData && nestedData.value,
        nestedData,
        payload && payload.data && payload.data.up_count,
        payload && payload.data && payload.data.count,
        payload && payload.data && payload.data.value,
        payload && payload.up_count,
        payload && payload.count,
        payload && payload.value,
        payload && payload.data
      ];

      for (var i = 0; i < candidates.length; i++) {
        var value = toCounterNumber(candidates[i]);
        if (value !== null) return value;
      }
      return null;
    }

    function getStorageValue(key) {
      try {
        return window.localStorage ? window.localStorage.getItem(key) : null;
      } catch (error) {
        console.warn('[CounterAPI] localStorage read failed for "' + pageKey + '".', error);
        return null;
      }
    }

    function setStorageValue(key, value) {
      try {
        if (window.localStorage) window.localStorage.setItem(key, String(value));
      } catch (error) {
        console.warn('[CounterAPI] localStorage write failed for "' + pageKey + '".', error);
      }
    }

    function removeStorageValue(key) {
      try {
        if (window.localStorage) window.localStorage.removeItem(key);
      } catch (error) {
        console.warn('[CounterAPI] localStorage remove failed for "' + pageKey + '".', error);
      }
    }

    function formatCounterValue(value) {
      return value >= 1000 ? (value / 1000).toFixed(1) + 'K' : String(value);
    }

    function displayCounterValue(value) {
      var el = document.getElementById('footer-view-count');
      if (!el) return;
      var numeric = toCounterNumber(value);
      el.textContent = numeric === null ? '—' : formatCounterValue(numeric);
    }

    function cachedCount() {
      return toCounterNumber(getStorageValue(cacheKey));
    }

    function displayCachedCount() {
      displayCounterValue(cachedCount());
    }

    function cacheCounterValue(value) {
      var numeric = toCounterNumber(value);
      if (numeric === null) return false;
      setStorageValue(cacheKey, numeric);
      return true;
    }

    function incrementIsFresh() {
      var lastSuccess = toCounterNumber(getStorageValue(successKey));
      return lastSuccess !== null && Date.now() - lastSuccess < COUNTER_TTL_MS;
    }

    function requestFailureIsFresh() {
      var lastFailure = toCounterNumber(getStorageValue(failureKey));
      return lastFailure !== null && Date.now() - lastFailure < COUNTER_RETRY_MS;
    }

    function rememberRequestFailure() {
      setStorageValue(failureKey, Date.now());
    }

    function clearRequestFailure() {
      removeStorageValue(failureKey);
    }

    function isRecordNotFound(error) {
      var payload = error && error.payload;
      var message = String(payload && (payload.message || payload.error || '') || '').toLowerCase();
      return error && error.status === 400 && (message.indexOf('record not found') !== -1 || payload && payload.code === 400);
    }

    function isRetryableCounterError(error) {
      if (!error || !error.status) return true;
      return error.status === 408 || error.status === 429 || error.status >= 500;
    }

    function delay(ms) {
      return new Promise(function (resolve) {
        window.setTimeout(resolve, ms);
      });
    }

    function fetchCounterJson(url) {
      if (!window.fetch) return Promise.reject(new Error('Fetch API is unavailable.'));

      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timeoutId = window.setTimeout(function () {
        if (controller) controller.abort();
      }, COUNTER_TIMEOUT_MS);

      var fetchOptions = controller ? { signal: controller.signal } : {};

      return fetch(url, fetchOptions)
        .then(function (response) {
          return response.text().then(function (text) {
            var payload = null;
            try {
              payload = text ? JSON.parse(text) : null;
            } catch (error) {
              var parseError = new Error('CounterAPI returned invalid JSON from ' + url);
              parseError.cause = error;
              parseError.status = response.status;
              parseError.responseText = text;
              parseError.url = url;
              throw parseError;
            }

            if (!response.ok) {
              var detail = payload && (payload.message || payload.error || payload.code);
              var requestError = new Error(
                'CounterAPI request failed with HTTP ' + response.status +
                (response.statusText ? ' ' + response.statusText : '') +
                (detail ? ': ' + detail : '')
              );
              requestError.status = response.status;
              requestError.payload = payload;
              requestError.url = url;
              throw requestError;
            }
            return payload;
          });
        })
        .catch(function (error) {
          if (error && error.name === 'AbortError') {
            var timeoutError = new Error('CounterAPI request timed out after ' + COUNTER_TIMEOUT_MS + 'ms.');
            timeoutError.cause = error;
            timeoutError.url = url;
            throw timeoutError;
          }
          throw error;
        })
        .finally(function () {
          window.clearTimeout(timeoutId);
        });
    }

    function fetchCounterJsonWithRetry(url) {
      return fetchCounterJson(url).catch(function (error) {
        if (!isRetryableCounterError(error)) throw error;
        return delay(600).then(function () {
          return fetchCounterJson(url);
        });
      });
    }

    function handleCounterValue(payload) {
      var value = extractCounterValue(payload);
      if (value === null) return false;
      cacheCounterValue(value);
      displayCounterValue(value);
      return true;
    }

    function incrementCounterIfAllowed() {
      if (incrementIsFresh()) return Promise.resolve();

      return fetchCounterJson(counterBaseUrl + '/up')
        .then(function (payload) {
          if (!handleCounterValue(payload)) {
            console.warn('[CounterAPI] Increment response did not include a numeric value for "' + pageKey + '".', payload);
            rememberRequestFailure();
            return;
          }
          setStorageValue(successKey, Date.now());
          clearRequestFailure();
        })
        .catch(function (error) {
          rememberRequestFailure();
          console.warn('[CounterAPI] Increment failed for "' + pageKey + '"; retaining cached count.', error);
          displayCachedCount();
        });
    }

    displayCachedCount();
    removeStorageValue(legacyAttemptKey);

    if (!requestFailureIsFresh()) {
      fetchCounterJsonWithRetry(counterBaseUrl)
        .then(function (payload) {
          handleCounterValue(payload);
          clearRequestFailure();
          return incrementCounterIfAllowed();
        })
        .catch(function (error) {
          if (isRecordNotFound(error)) {
            clearRequestFailure();
            return incrementCounterIfAllowed();
          }
          rememberRequestFailure();
          console.warn('[CounterAPI] Read failed for "' + pageKey + '"; retaining cached count.', error);
          displayCachedCount();
        });
    }
  }


  function initGaitAIGate() {
    if (window.__gaitAIGateLoaded) return;
    window.__gaitAIGateLoaded = true;

    var GAITAI_PASSWORD = 'as';
    var GAITAI_DEFAULT_URL = 'https://gaitai.in/';
    var pendingUrl = '';
    var pendingTarget = '_blank';

    function ensureStyle() {
      if (document.getElementById('gaitai-access-style')) return;
      var style = document.createElement('style');
      style.id = 'gaitai-access-style';
      style.textContent =
        '.gaitai-access-overlay{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(5,10,18,.68);backdrop-filter:blur(8px);}' +
        '.gaitai-access-overlay.is-open{display:flex;}' +
        '.gaitai-access-modal{width:min(100%,390px);border:1px solid rgba(255,255,255,.16);border-radius:18px;background:linear-gradient(145deg,#101827 0%,#18263a 100%);box-shadow:0 24px 70px rgba(0,0,0,.42);color:#fff;padding:24px;position:relative;}' +
        '.gaitai-access-close{position:absolute;top:12px;right:12px;width:34px;height:34px;border:0;border-radius:50%;background:rgba(255,255,255,.08);color:rgba(255,255,255,.85);cursor:pointer;}' +
        '.gaitai-access-modal h3{margin:0 42px 8px 0;color:#fff!important;font-size:1.25rem!important;font-weight:800!important;}' +
        '.gaitai-access-modal p{margin:0 0 18px;color:rgba(255,255,255,.68)!important;font-size:.86rem;line-height:1.55;}' +
        '.gaitai-access-field{width:100%;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(255,255,255,.08);color:#fff;padding:12px 14px;outline:none;font-size:.95rem;}' +
        '.gaitai-access-field:focus{border-color:#d3b979;box-shadow:0 0 0 3px rgba(211,185,121,.18);}' +
        '.gaitai-access-error{min-height:18px;margin:9px 0 0;color:#ffb4b4!important;font-size:.78rem;font-weight:700;}' +
        '.gaitai-access-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:18px;}' +
        '.gaitai-access-btn{border:0;border-radius:999px;padding:9px 18px;font-size:.8rem;font-weight:800;cursor:pointer;}' +
        '.gaitai-access-btn.secondary{background:rgba(255,255,255,.1);color:rgba(255,255,255,.82);}' +
        '.gaitai-access-btn.primary{background:#d3b979;color:#101827;}';
      document.head.appendChild(style);
    }

    function ensureModal() {
      var modal = document.getElementById('gaitaiAccessModal');
      if (modal) return modal;
      var wrapper = document.createElement('div');
      wrapper.innerHTML =
        '<div class="gaitai-access-overlay" id="gaitaiAccessModal" aria-hidden="true">' +
        '  <div class="gaitai-access-modal" role="dialog" aria-modal="true" aria-labelledby="gaitaiAccessTitle">' +
        '    <button type="button" class="gaitai-access-close" data-gaitai-close aria-label="Close research initiative access dialog">&times;</button>' +
        '    <h3 id="gaitaiAccessTitle">Access Research Initiative</h3>' +
        '    <p>Enter the access password to open the protected research initiative.</p>' +
        '    <form id="gaitaiAccessForm" novalidate>' +
        '      <input class="gaitai-access-field" id="gaitaiAccessPassword" type="password" autocomplete="current-password" placeholder="Enter password" aria-label="Research initiative password">' +
        '      <div class="gaitai-access-error" id="gaitaiAccessError" aria-live="polite"></div>' +
        '      <div class="gaitai-access-actions">' +
        '        <button type="button" class="gaitai-access-btn secondary" data-gaitai-close>Cancel</button>' +
        '        <button type="submit" class="gaitai-access-btn primary">Continue</button>' +
        '      </div>' +
        '    </form>' +
        '  </div>' +
        '</div>';
      document.body.appendChild(wrapper.firstElementChild);
      return document.getElementById('gaitaiAccessModal');
    }

    function isGaitAILink(link) {
      if (!link) return false;
      var rawHref = link.getAttribute('href') || '';
      var resolvedHref = link.href || '';
      var haystack = (rawHref + " " + resolvedHref).toLowerCase();
      return haystack.indexOf("gaitai") !== -1 || haystack.indexOf("gaitai.in") !== -1 || haystack.indexOf("gaitai-analysis.github.io/gaitai") !== -1;
    }

    function getGaitAIUrl(link) {
      var rawHref = link.getAttribute('href') || '';
      var normalizedHref = rawHref.toLowerCase();
      if (normalizedHref.indexOf('gaitai.in') === 0 || normalizedHref.indexOf('www.gaitai.in') === 0) return 'https://' + rawHref;
      return link.href || rawHref || GAITAI_DEFAULT_URL;
    }

    function modalParts() {
      var modal = ensureModal();
      return {
        modal: modal,
        form: document.getElementById('gaitaiAccessForm'),
        input: document.getElementById('gaitaiAccessPassword'),
        error: document.getElementById('gaitaiAccessError')
      };
    }

    function openModal(url, target) {
      ensureStyle();
      var parts = modalParts();
      pendingUrl = url || GAITAI_DEFAULT_URL;
      pendingTarget = target || '_blank';
      parts.input.value = '';
      parts.error.textContent = '';
      parts.modal.classList.add('is-open');
      parts.modal.setAttribute('aria-hidden', 'false');
      window.setTimeout(function () { parts.input.focus(); }, 40);
    }

    function closeModal() {
      var parts = modalParts();
      parts.modal.classList.remove('is-open');
      parts.modal.setAttribute('aria-hidden', 'true');
      pendingUrl = '';
    }

    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href], button[href]');
      if (!isGaitAILink(link)) return;
      event.preventDefault();
      openModal(getGaitAIUrl(link), link.target || '_blank');
    });

    document.addEventListener('click', function (event) {
      var modal = document.getElementById('gaitaiAccessModal');
      if (!modal || !modal.classList.contains('is-open')) return;
      if (event.target === modal || event.target.closest('[data-gaitai-close]')) closeModal();
    });

    document.addEventListener('keydown', function (event) {
      var modal = document.getElementById('gaitaiAccessModal');
      if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
    });

    document.addEventListener('submit', function (event) {
      if (!event.target || event.target.id !== 'gaitaiAccessForm') return;
      event.preventDefault();
      var parts = modalParts();
      if (parts.input.value === GAITAI_PASSWORD) {
        var url = pendingUrl || GAITAI_DEFAULT_URL;
        var target = pendingTarget || '_blank';
        closeModal();
        window.open(url, target, 'noopener');
        return;
      }
      parts.error.textContent = 'Incorrect password. Please try again.';
      parts.input.select();
    });
  }

  function initImageViewer() {
    var imagePattern = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?(#.*)?$/i;
    var documentPattern = /\.(pdf|docx?|pptx?|xlsx?|csv)(\?.*)?(#.*)?$/i;
    var viewer = null;
    var previousFocus = null;

    function isImageLink(link) {
      if (!link || !link.href) return false;
      return imagePattern.test(link.href);
    }

    function shouldOpenInNewTab(link) {
      if (!link || !link.href) return false;
      var href = link.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || /^mailto:|^tel:|^javascript:/i.test(href)) return false;
      if (link.classList.contains('dropdown-toggle')) return false;
      if (link.classList.contains('cert-btn') || link.classList.contains('lead-photo-link')) return true;
      if (documentPattern.test(href)) return true;
      if (link.target === '_blank') return true;
      return isMultiPhotoLink(link);
    }

    function isMultiPhotoLink(link) {
      if (!isImageLink(link)) return false;
      var container = link.closest('.gal-grid,.gal-container,.gal-slider,.gal-slides-track,.award-gallery,.cert-gallery,.mfp-gallery,.gallery,.portfolio_area,.blog-gallery-section,.sports-post-gallery,.mom-main-photos');
      if (!container) return false;
      return container.querySelectorAll('a[href]').length > 1;
    }

    function ensureViewer() {
      if (viewer) return viewer;

      var style = document.createElement('style');
      style.textContent =
        '.site-image-viewer{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;background:rgba(5,8,18,.88);padding:24px;}' +
        '.site-image-viewer.is-open{display:flex;}' +
        '.site-image-viewer__frame{position:relative;max-width:min(1120px,96vw);max-height:92vh;display:flex;align-items:center;justify-content:center;}' +
        '.site-image-viewer__image{display:block;max-width:100%;max-height:92vh;border-radius:6px;box-shadow:0 22px 70px rgba(0,0,0,.48);background:#fff;}' +
        '.site-image-viewer__close{position:fixed;top:18px;right:18px;width:44px;height:44px;border:0;border-radius:50%;background:#fff;color:#111827;font-size:28px;line-height:1;cursor:pointer;box-shadow:0 10px 28px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;}' +
        '.site-image-viewer__close:hover,.site-image-viewer__close:focus{background:#f3f4f6;outline:2px solid rgba(255,255,255,.85);outline-offset:2px;}' +
        'body.site-image-viewer-open{overflow:hidden;}';
      document.head.appendChild(style);

      viewer = document.createElement('div');
      viewer.className = 'site-image-viewer';
      viewer.setAttribute('role', 'dialog');
      viewer.setAttribute('aria-modal', 'true');
      viewer.setAttribute('aria-label', 'Image preview');
      viewer.innerHTML =
        '<button type="button" class="site-image-viewer__close" aria-label="Close image preview">&times;</button>' +
        '<div class="site-image-viewer__frame"><img class="site-image-viewer__image" alt=""></div>';
      document.body.appendChild(viewer);

      viewer.querySelector('.site-image-viewer__close').addEventListener('click', closeViewer);
      viewer.addEventListener('click', function (event) {
        if (event.target === viewer) closeViewer();
      });

      return viewer;
    }

    function openViewer(src, alt) {
      var el = ensureViewer();
      var image = el.querySelector('.site-image-viewer__image');
      previousFocus = document.activeElement;
      image.src = src;
      image.alt = alt || 'Preview image';
      el.classList.add('is-open');
      document.body.classList.add('site-image-viewer-open');
      el.querySelector('.site-image-viewer__close').focus();
    }

    function closeViewer() {
      if (!viewer || !viewer.classList.contains('is-open')) return;
      viewer.classList.remove('is-open');
      document.body.classList.remove('site-image-viewer-open');
      viewer.querySelector('.site-image-viewer__image').removeAttribute('src');
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }

    document.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest ? event.target.closest('a') : null;
      if (!isImageLink(link) || isMultiPhotoLink(link) || link.hasAttribute('download')) return;
      event.preventDefault();
      event.stopPropagation();
      var img = link.querySelector('img');
      openViewer(link.href, img ? img.alt : link.getAttribute('aria-label'));
    }, true);

    function applyOpenInNewTabTargets(root) {
      var scope = root && root.querySelectorAll ? root : document;
      scope.querySelectorAll('a[href]').forEach(function (link) {
        if (!shouldOpenInNewTab(link)) return;
        link.target = '_blank';
        var rel = (link.getAttribute('rel') || '').split(/\s+/);
        if (rel.indexOf('noopener') === -1) rel.push('noopener');
        link.setAttribute('rel', rel.filter(Boolean).join(' '));
      });
    }

    applyOpenInNewTabTargets(document);
    if (window.MutationObserver) {
      new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) applyOpenInNewTabTargets(node);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeViewer();
    });
  }

  /* ── Site-wide ambient particle canvas ── */
  function initParticles() {
    var canvas = document.createElement('canvas');
    canvas.id = 'site-ambient-canvas';
    canvas.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'width:100%', 'height:100%',
      'pointer-events:none',
      'z-index:9998',
      'mix-blend-mode:screen',
      'opacity:1'
    ].join(';');
    document.body.appendChild(canvas);

    var ctx  = canvas.getContext('2d');
    var W, H, particles = [];
    var COUNT = 65;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function rand(a, b) { return a + Math.random() * (b - a); }

    function makeParticle() {
      var r = rand(0.4, 2.8);
      return {
        x  : rand(0, W),
        y  : rand(0, H),
        r  : r,
        vx : rand(-0.15, 0.15),
        vy : rand(-0.35, -0.07),
        /* orbital wobble */
        ang  : rand(0, Math.PI * 2),
        angV : rand(-0.016, 0.016),
        wobR : rand(6, 28),
        /* twinkle */
        alpha : rand(0.08, 0.45),
        aDir  : 1,
        aSpd  : rand(0.003, 0.011),
        /* glow halo on ~30% of dots */
        glow  : Math.random() > 0.70
      };
    }

    for (var i = 0; i < COUNT; i++) { particles.push(makeParticle()); }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        /* drift */
        p.x += p.vx;
        p.y += p.vy;

        /* orbital wobble */
        p.ang += p.angV;
        var ox = Math.cos(p.ang)       * p.wobR * 0.18;
        var oy = Math.sin(p.ang * 0.6) * p.wobR * 0.10;

        /* twinkle */
        p.alpha += p.aSpd * p.aDir;
        if (p.alpha >= 0.50) { p.alpha = 0.50; p.aDir = -1; }
        if (p.alpha <= 0.04) { p.alpha = 0.04; p.aDir =  1; }

        /* wrap */
        if (p.y < -12)    { p.y = H + 12; p.x = rand(0, W); }
        if (p.x < -22)    p.x = W + 22;
        if (p.x > W + 22) p.x = -22;

        var dx = p.x + ox, dy = p.y + oy;

        /* halo glow */
        if (p.glow) {
          var g = ctx.createRadialGradient(dx, dy, 0, dx, dy, p.r * 5);
          g.addColorStop(0, 'rgba(200,220,255,' + (p.alpha * 0.55) + ')');
          g.addColorStop(1, 'rgba(200,220,255,0)');
          ctx.beginPath();
          ctx.arc(dx, dy, p.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        /* dot */
        ctx.beginPath();
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220,235,255,' + p.alpha + ')';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  function initAccessibilityPolish() {
    document.querySelectorAll('a').forEach(function(link) {
      var href = (link.getAttribute('href') || '').trim();
      var text = (link.textContent || '').replace(/\s+/g, ' ').trim();
      var title = link.getAttribute('title') || '';
      if (!href && !text && !link.querySelector('img')) {
        link.hidden = true;
        link.setAttribute('aria-hidden', 'true');
        return;
      }
      if (!link.getAttribute('aria-label') && !text) {
        var img = link.querySelector('img[alt]');
        var label = title || (img ? img.getAttribute('alt') : '') || href;
        if (label) link.setAttribute('aria-label', label);
      }
      if (link.target === '_blank' && !/\bnoopener\b/.test(link.rel || '')) {
        link.rel = ((link.rel || '') + ' noopener').trim();
      }
    });

    document.querySelectorAll('button').forEach(function(button) {
      var text = (button.textContent || '').replace(/\s+/g, ' ').trim();
      if (!button.getAttribute('aria-label') && !text) {
        var icon = button.querySelector('.fa');
        button.setAttribute('aria-label', button.getAttribute('title') || (icon ? 'Button' : 'Action'));
      }
    });

    document.querySelectorAll('img:not([alt])').forEach(function(img) {
      var src = img.getAttribute('src') || '';
      var name = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
      img.setAttribute('alt', name || 'Image');
    });
  }

  function initDeepLinkNavigation() {
    var timer = null;
    var highlightStyle = document.createElement('style');
    highlightStyle.textContent =
      '.site-deep-link-target{outline:3px solid rgba(126,184,224,.9);outline-offset:5px;transition:outline-color .35s ease;}' +
      '@media (prefers-reduced-motion:reduce){.site-deep-link-target{transition:none;}}';
    document.head.appendChild(highlightStyle);

    function currentHash() {
      try {
        return decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
      } catch (error) {
        return (window.location.hash || '').replace(/^#/, '');
      }
    }

    function visibleShowMoreButton(scope, includeSectionButtons) {
      var selector = '[data-deep-link-show-more], #show-more-posts';
      if (includeSectionButtons) selector += ', .academic-show-more';
      var buttons = (scope || document).querySelectorAll(
        selector
      );
      return Array.from(buttons).find(function(button) {
        return !button.hidden && button.getAttribute('aria-hidden') !== 'true' && button.getClientRects().length;
      });
    }

    function revealHashTarget(attempt) {
      var hash = currentHash();
      if (!hash) return;

      var target = document.getElementById(hash);
      if (!target) {
        var pageMore = visibleShowMoreButton(document, false);
        if (pageMore && attempt < 20) {
          pageMore.click();
          timer = window.setTimeout(function() { revealHashTarget(attempt + 1); }, 80);
        }
        return;
      }

      document.dispatchEvent(new CustomEvent('site:prepare-deep-link', {
        detail: { hash: hash, target: target }
      }));

      window.setTimeout(function() {
        target = document.getElementById(hash);
        if (!target) return;

        var details = target.closest('details');
        if (details) details.open = true;

        var section = target.closest('.acad-section, .connection-section, .hobby-section, section, main');
        var sectionMore = section && visibleShowMoreButton(section, true);
        if ((target.classList.contains('is-hidden') || !target.getClientRects().length) && sectionMore && attempt < 20) {
          sectionMore.click();
          timer = window.setTimeout(function() { revealHashTarget(attempt + 1); }, 80);
          return;
        }

        if (!target.getClientRects().length && attempt < 20) {
          timer = window.setTimeout(function() { revealHashTarget(attempt + 1); }, 80);
          return;
        }

        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
        target.classList.add('site-deep-link-target');
        window.setTimeout(function() { target.classList.remove('site-deep-link-target'); }, 2200);
      }, 40);
    }

    function scheduleReveal() {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function() { revealHashTarget(0); }, 0);
    }

    scheduleReveal();
    window.addEventListener('hashchange', scheduleReveal);
    window.addEventListener('load', scheduleReveal);
    window.addEventListener('autoFolderGalleriesUpdated', scheduleReveal);
    window.addEventListener('site:content-updated', scheduleReveal);
    window.SiteDeepLinks = { reveal: scheduleReveal };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { init(); initGaitAIGate(); initImageViewer(); initParticles(); initAccessibilityPolish(); initDeepLinkNavigation(); });
  } else {
    init();
    initGaitAIGate();
    initImageViewer();
    initParticles();
    initAccessibilityPolish();
    initDeepLinkNavigation();
  }
})();
