/* ── Quick access: Ctrl+Alt+E, or five logo taps within three seconds ── */
(function () {
  if (window.__quickAccessLoaded) return;
  window.__quickAccessLoaded = true;

  var DESTINATION = 'https://childcare-2c3ab.web.app';
  var LOGO_SELECTOR = '.header_area .navbar-brand.logo_h';
  var TAPS_REQUIRED = 5;
  var TAP_WINDOW_MS = 3000;
  var tapTimes = [];
  var navigating = false;

  function go() {
    if (navigating) return;
    navigating = true;
    window.location.assign(DESTINATION);
  }

  function isEditable(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.isContentEditable) return true;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
      !!(el.closest && el.closest('[contenteditable=""], [contenteditable="true"]'));
  }

  document.addEventListener('keydown', function (e) {
    if (e.repeat || !e.ctrlKey || !e.altKey || e.shiftKey || e.metaKey) return;
    if (e.code !== 'KeyE' && String(e.key).toLowerCase() !== 'e') return;
    if (isEditable(e.target) || isEditable(document.activeElement)) return;
    e.preventDefault();
    go();
  });

  /* Delegated + capture phase: the header is injected after load, and the logo's
     normal navigation is left untouched until the fifth tap. */
  document.addEventListener('click', function (e) {
    var logo = e.target && e.target.closest && e.target.closest(LOGO_SELECTOR);
    if (!logo) return;

    var now = Date.now();
    tapTimes = tapTimes.filter(function (t) { return now - t < TAP_WINDOW_MS; });
    tapTimes.push(now);
    if (tapTimes.length < TAPS_REQUIRED) return;

    tapTimes = [];
    e.preventDefault();
    e.stopImmediatePropagation();
    go();
  }, true);
})();
