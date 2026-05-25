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
    'event.html': 'event', 'leadership-activities.html': 'event',
    'blog.html': 'blog', 'connection.html': 'blog', 'academics.html': 'blog', 'sports.html': 'blog', 'avocations.html': 'blog'
  };
  var currentFile = window.location.pathname.split('/').pop() || '';
  var activePage  = PAGE_MAP[currentFile] || '';

  /* ── Header HTML ── */
  var HEADER_HTML =
    '<div id="nav-progress"></div>' +
    '<header class="header_area">' +
    '  <div class="main_menu">' +
    '    <nav class="navbar navbar-expand-lg navbar-light">' +
    '      <div class="container">' +
    '        <a class="navbar-brand logo_h" href="index.html">' +
    '          <span class="nav-mono">AP</span>' +
    '          <span class="nav-wordmark">' +
    '            <span class="nav-wm-name">Dr. Anubha Parashar</span>' +
    '            <span class="nav-wm-sub">Analytics &amp; AI Engineer</span>' +
    '          </span>' +
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
    '            <li class="nav-item" data-nav="award"><a class="nav-link" href="award.html">Award</a></li>' +
    '            <li class="nav-item" data-nav="event"><a class="nav-link" href="leadership-activities.html">Leadership &amp; Activities</a></li>' +
    '            <li class="nav-item submenu dropdown" data-nav="blog">' +
    '              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"' +
    '                aria-haspopup="true" aria-expanded="false">Blog</a>' +
    '              <ul class="dropdown-menu">' +
    '                <li class="nav-item"><a class="nav-link" href="blog.html">Blog Overview</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="academics.html">Academics</a></li>' +
    '                <li class="nav-item"><a class="nav-link" href="connection.html">Social Life</a></li>' +
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
    '        <a href="https://huggingface.co/AnubhaParashar/spaces" target="_blank" class="ficon" title="HuggingFace"><img src="img/icons/10.png" alt="HuggingFace"></a>' +
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
    '    <p class="footer-copy">&copy; 2025 Dr. Anubha Parashar &nbsp;&middot;&nbsp; Analytics &amp; AI Engineer</p>' +
    '    <p class="footer-views"><i class="fa fa-eye"></i> <span id="footer-view-count">—</span> page views</p>' +
    '  </div>' +
    '</footer>';

  function init() {
    /* Inject header */
    var headerRoot = document.getElementById('site-header');
    if (headerRoot) headerRoot.innerHTML = HEADER_HTML;

    /* Inject footer */
    var footerRoot = document.getElementById('site-footer');
    if (footerRoot) footerRoot.innerHTML = FOOTER_HTML;

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

    /* Page view counter — per-page key */
    var pageKey = currentFile || 'index.html';
    fetch('https://api.counterapi.dev/v1/anubhaparashar.github.io/' + pageKey + '/up')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var v = d.count || d.value;
        if (!v) return;
        var fmt = v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v;
        var el = document.getElementById('footer-view-count');
        if (el) el.textContent = fmt;
      })
      .catch(function () {});
  }

  function initImageViewer() {
    var imagePattern = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?(#.*)?$/i;
    var viewer = null;
    var previousFocus = null;

    function isImageLink(link) {
      if (!link || !link.href) return false;
      return imagePattern.test(link.href);
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
      if (!isImageLink(link) || link.hasAttribute('download')) return;
      event.preventDefault();
      event.stopPropagation();
      var img = link.querySelector('img');
      openViewer(link.href, img ? img.alt : link.getAttribute('aria-label'));
    }, true);

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { init(); initImageViewer(); initParticles(); });
  } else {
    init();
    initImageViewer();
    initParticles();
  }
})();
