(function() {
  'use strict';

  var OWNER = 'anubhaparashar';
  var REPO = 'anubhaparashar.github.io';
  var BRANCH = 'main';
  var IMAGE_RE = /\.(jpe?g|png|gif|webp|bmp)$/i;
  var SKIP_FOLDER_RE = /(^|\/)(header|headers|box image|author|popular-post)(\/|$)/i;
  var treePromise = null;

  function injectStyles() {
    if (document.getElementById('auto-folder-gallery-styles')) return;
    var style = document.createElement('style');
    style.id = 'auto-folder-gallery-styles';
    style.textContent =
      '.auto-folder-section{margin-top:32px;}' +
      '.auto-folder-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;}' +
      '.auto-folder-grid a.gal-item{display:block;position:relative;aspect-ratio:4/3;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(15,52,96,.10);}' +
      '.auto-folder-grid a.gal-item img{width:100%;height:100%;object-fit:cover;display:block;}' +
      '.auto-folder-grid .blog-gal-overlay,.auto-folder-grid .gal-overlay{position:absolute;inset:0;background:rgba(15,52,96,.35);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .22s;}' +
      '.auto-folder-grid a.gal-item:hover .blog-gal-overlay,.auto-folder-grid a.gal-item:hover .gal-overlay{opacity:1;}' +
      '.auto-folder-count{font-weight:400;color:#888;font-size:.7rem;letter-spacing:0;}' +
      '.blog-media-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;}' +
      '.blog-media-grid a.gal-item{display:block;position:relative;aspect-ratio:4/3;border-radius:8px;overflow:hidden;}' +
      '.blog-media-grid a.gal-item img{width:100%;height:100%;object-fit:cover;display:block;}' +
      '.blog-media-slider{display:none;margin-top:14px;padding:12px;border:1px solid #e8eeff;border-radius:12px;background:#f8faff;}' +
      '.blog-media-slider.is-open{display:block;}' +
      '.blog-media-slider-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;}' +
      '.blog-media-slider-count{font-size:.75rem;font-weight:800;color:#0f3460;background:#fff;border:1px solid #dce5ff;border-radius:20px;padding:5px 12px;}' +
      '.blog-media-slider-nav{display:flex;gap:6px;}' +
      '.blog-media-nav-btn{width:32px;height:32px;border-radius:50%;border:1px solid #dce5ff;background:#fff;color:#0f3460;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;}' +
      '.blog-media-nav-btn:disabled{opacity:.35;cursor:default;}' +
      '.blog-media-slider-viewport{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;}' +
      '.blog-media-slider-viewport::-webkit-scrollbar{display:none;}' +
      '.blog-media-slider-track{display:flex;gap:10px;}' +
      '.blog-media-slider-track a.gal-item{flex:0 0 150px;width:150px;height:112px;display:block;position:relative;border-radius:8px;overflow:hidden;}' +
      '.blog-media-slider-track a.gal-item img{width:100%;height:100%;object-fit:cover;display:block;}' +
      '.blog-media-slider-foot{font-size:.75rem;color:#667;text-align:center;margin-top:10px;font-weight:700;}' +
      '.gal-slider-wrap.blog-media-slider{display:block;background:linear-gradient(135deg,#f7f9ff,#eef1ff);border-radius:14px;padding:14px 14px 12px;box-shadow:0 2px 14px rgba(15,52,96,.08);border:1px solid #e0e6ff;margin-top:12px;}' +
      '.gal-slider-wrap.blog-media-slider.is-open{display:block;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slider-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slider-counter{font-size:.72rem;font-weight:800;color:#0f3460;background:rgba(15,52,96,.07);padding:4px 12px;border-radius:20px;letter-spacing:.2px;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slider-nav{display:flex;align-items:center;gap:6px;}' +
      '.gal-slider-wrap.blog-media-slider .gal-nav-btn{width:32px;height:32px;border-radius:50%;border:2px solid #c8d4f7;background:#fff;color:#0f3460;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.78rem;transition:all .22s;box-shadow:0 2px 8px rgba(15,52,96,.1);line-height:1;padding:0;}' +
      '.gal-slider-wrap.blog-media-slider .gal-nav-btn:disabled{opacity:.35;cursor:default;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slider-viewport{overflow-x:scroll;overflow-y:hidden;scrollbar-width:none;scroll-behavior:smooth;border-radius:10px;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slider-viewport::-webkit-scrollbar{display:none;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slides-track{display:flex;gap:10px;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slides-track a.gal-item{flex:0 0 160px;width:160px;display:block;border-radius:8px;overflow:hidden;position:relative;aspect-ratio:4/3;box-shadow:0 2px 10px rgba(15,52,96,.10);transition:transform .22s,box-shadow .22s;}' +
      '.gal-slider-wrap.blog-media-slider .gal-slides-track a.gal-item:hover{transform:scale(1.03);box-shadow:0 6px 20px rgba(15,52,96,.18);}' +
      '.gal-slider-wrap.blog-media-slider .gal-slides-track a.gal-item img{width:100%;height:100%;object-fit:cover;display:block;}' +
      '.gal-slider-wrap.blog-media-slider .gal-progress{height:4px;background:#dde4f7;border-radius:2px;margin-top:10px;overflow:hidden;}' +
      '.gal-slider-wrap.blog-media-slider .gal-progress-bar{height:100%;background:linear-gradient(90deg,#7eb8e0,#f0a500);border-radius:2px;transition:width .25s ease;width:0%;min-width:14px;}' +
      '.gal-slider-wrap.blog-media-slider .gal-more-count{text-align:center;margin-top:9px;font-size:.77rem;font-weight:700;letter-spacing:.2px;color:#7eb8e0;transition:color .25s;}' +
      '.gal-slider-wrap.blog-media-slider .gal-more-count.done{color:#b0b8d0;}' +
      '.gal-slider-wrap.blog-media-slider .gal-more-count strong{color:#f0a500;}' +
      '.blog-media-show-wrap{text-align:center;margin:14px 0 18px;}' +
      '.blog-media-show-btn{display:inline-flex;align-items:center;gap:7px;border:0;border-radius:24px;background:#0f3460;color:#fff;padding:9px 22px;font-size:.78rem;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(15,52,96,.18);}' +
      '.blog-media-show-btn:hover{background:#163f73;}' +
      '.blog-video-extra{display:none!important;margin-top:12px;}' +
      '.blog-video-extra.is-open{display:grid!important;}';
    document.head.appendChild(style);
  }

  function encodePath(path) {
    return path.split('/').map(encodeURIComponent).join('/');
  }

  function rawUrl(path) {
    return 'https://raw.githubusercontent.com/' + OWNER + '/' + REPO + '/' + BRANCH + '/' + encodePath(path);
  }

  function cleanTitle(text) {
    return (text || '')
      .replace(/\.[^.]+$/, '')
      .replace(/^\d+\.\s*/, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, function(ch) { return ch.toUpperCase(); });
  }

  function dirname(path) {
    var index = path.lastIndexOf('/');
    return index === -1 ? '' : path.slice(0, index);
  }

  function normalizePath(path) {
    return decodeURI((path || '').split('#')[0].split('?')[0]).replace(/^\/+/, '');
  }

  function equivalentFolder(path) {
    return normalizePath(path)
      .replace(/^img\/blog\/3\. Sports\//i, 'files/8. Blog/3. Sports/')
      .replace(/^img\/blog\/4\. Hobbies\//i, 'files/8. Blog/4. Avocations/');
  }

  function sameFolderImages(tree, folder) {
    return tree
      .filter(function(item) {
        return item.type === 'blob' && IMAGE_RE.test(item.path) && dirname(item.path) === folder;
      })
      .sort(function(a, b) {
        return a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' });
      });
  }

  function folderImageGroups(tree, root) {
    var prefix = root.replace(/\/+$/, '') + '/';
    var groups = {};

    tree.forEach(function(item) {
      if (item.type !== 'blob' || !IMAGE_RE.test(item.path)) return;
      if (item.path.indexOf(prefix) !== 0) return;
      var folder = dirname(item.path);
      if (folder === root || SKIP_FOLDER_RE.test(folder)) return;
      if (!groups[folder]) groups[folder] = [];
      groups[folder].push(item);
    });

    Object.keys(groups).forEach(function(folder) {
      groups[folder].sort(function(a, b) {
        return a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' });
      });
    });

    return groups;
  }

  function getTree() {
    if (!treePromise) {
      treePromise = fetch('https://api.github.com/repos/' + OWNER + '/' + REPO + '/git/trees/' + BRANCH + '?recursive=1', {
        headers: { 'Accept': 'application/vnd.github+json' }
      }).then(function(response) {
        if (!response.ok) throw new Error('GitHub tree request failed: ' + response.status);
        return response.json();
      }).then(function(data) {
        return data.tree || [];
      });
    }
    return treePromise;
  }

  function priorityList(container) {
    return (container.getAttribute('data-auto-priority') || '')
      .split(',')
      .map(function(item) { return item.trim().toLowerCase(); })
      .filter(Boolean);
  }

  function applyPriority(items, priority) {
    if (!priority.length) return items;
    return items.slice().sort(function(a, b) {
      var aName = a.path.split('/').pop().toLowerCase();
      var bName = b.path.split('/').pop().toLowerCase();
      var ai = priority.indexOf(aName);
      var bi = priority.indexOf(bName);
      if (ai === -1) ai = 9999;
      if (bi === -1) bi = 9999;
      return ai === bi ? a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' }) : ai - bi;
    });
  }

  function imageHtml(item, overlayClass, extraClass) {
    var name = item.path.split('/').pop();
    var title = cleanTitle(name);
    var classes = 'gal-item' + (extraClass ? ' ' + extraClass : '');
    return '<a href="' + rawUrl(item.path) + '" class="' + classes + '">' +
      '<img loading="lazy" src="' + rawUrl(item.path) + '" alt="' + title + '">' +
      '<div class="' + overlayClass + '"><i class="fa fa-search-plus"></i></div>' +
      '</a>';
  }

  function initLightbox(element) {
    if (!window.jQuery || !jQuery.fn || !jQuery.fn.magnificPopup) return;
    var $element = jQuery(element);
    try { $element.magnificPopup('destroy'); } catch (error) {}
    $element.magnificPopup({
      delegate: 'a.gal-item',
      type: 'image',
      gallery: { enabled: true, navigateByImgClick: true },
      image: {
        titleSrc: function(item) {
          return item.el.find('img').attr('alt') || '';
        },
        verticalFit: true
      },
      zoom: { enabled: true, duration: 200 }
    });
  }

  function updateExistingGallery(container, tree) {
    if (container.hasAttribute('data-auto-generated')) return;
    if (container.classList.contains('blog-media-extra') || container.classList.contains('blog-media-slider-track')) return;
    var first = container.querySelector('a.gal-item[href]');
    if (!first) return;

    var href = equivalentFolder(first.getAttribute('href'));
    if (href.indexOf('files/') !== 0 && href.indexOf('img/blog/') !== 0) return;

    var folder = dirname(href);
    if (!folder || SKIP_FOLDER_RE.test(folder)) return;

    var highlighted = {};
    container.querySelectorAll('a.gal-item[href]').forEach(function(link) {
      var kept = ['cert-a', 'cert-b', 'oath-highlight'].filter(function(name) {
        return link.classList.contains(name);
      }).join(' ');
      if (kept) highlighted[normalizePath(equivalentFolder(link.getAttribute('href')))] = kept;
    });

    var items = applyPriority(sameFolderImages(tree, folder), priorityList(container));
    if (!items.length) return;
    items = items.slice().sort(function(a, b) {
      var ah = highlighted[normalizePath(a.path)] ? 0 : 1;
      var bh = highlighted[normalizePath(b.path)] ? 0 : 1;
      return ah === bh ? 0 : ah - bh;
    });

    var overlay = container.querySelector('.blog-gal-overlay') ? 'blog-gal-overlay' : 'gal-overlay';
    container.innerHTML = items.map(function(item) {
      return imageHtml(item, overlay, highlighted[normalizePath(item.path)]);
    }).join('');
    initLightbox(container);

    var label = container.closest('.blog-gallery-section,.conf-card,.auto-folder-section');
    var count = label ? label.querySelector('.auto-folder-count,.blog-gallery-label span,.conf-meta .fa-image') : null;
    if (count && count.classList && count.classList.contains('auto-folder-count')) {
      count.textContent = items.length + (items.length === 1 ? ' photo' : ' photos');
    }
  }

  function renderRoot(container, tree) {
    var root = container.getAttribute('data-auto-gallery-root');
    if (!root) return;

    var groups = folderImageGroups(tree, root);
    var folders = Object.keys(groups).sort(function(a, b) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    var existing = {};
    if (container.getAttribute('data-auto-gallery-skip-existing') === 'true') {
      document.querySelectorAll('.gal-grid a.gal-item[href],.blog-gallery-grid a.gal-item[href],.gal-container a.gal-item[href]').forEach(function(link) {
        existing[dirname(equivalentFolder(link.getAttribute('href')))] = true;
      });
    }

    folders = folders.filter(function(folder) { return !existing[folder]; });

    container.innerHTML = folders.map(function(folder, index) {
      var title = cleanTitle(folder.split('/').pop());
      var id = 'auto-gallery-' + index + '-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return '<div class="auto-folder-section">' +
        '<div class="blog-gallery-label"><i class="fa fa-picture-o"></i> ' + title + ' <span class="auto-folder-count">' + groups[folder].length + (groups[folder].length === 1 ? ' photo' : ' photos') + '</span></div>' +
        '<div class="auto-folder-grid" id="' + id + '" data-auto-generated="true">' +
          groups[folder].map(function(item) { return imageHtml(item, 'blog-gal-overlay'); }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    container.querySelectorAll('[data-auto-generated="true"]').forEach(initLightbox);
  }

  function isAvocationsPage() {
    return /avocations\.html/i.test(window.location.pathname);
  }

  function makeShowButton(count, label) {
    var wrap = document.createElement('div');
    wrap.className = 'blog-media-show-wrap';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'blog-media-show-btn';
    btn.innerHTML = '<i class="fa fa-chevron-down"></i> Show ' + count + ' More ' + label;
    wrap.appendChild(btn);
    return { wrap: wrap, button: btn };
  }

  function applyImageShowMore(gallery, limit) {
    if (!gallery || gallery.closest('.blog-media-slider') || gallery.closest('.blog-media-extra') || gallery.closest('.avoc-extra-gallery')) return;
    if (isAvocationsPage() && gallery.closest('#tab-trekking, #tab-painting')) return;

    var oldExtra = gallery.nextElementSibling && gallery.nextElementSibling.classList.contains('blog-media-slider')
      ? gallery.nextElementSibling
      : null;
    var oldControls = oldExtra && oldExtra.previousElementSibling && oldExtra.previousElementSibling.classList.contains('blog-media-show-wrap')
      ? oldExtra.previousElementSibling
      : null;
    var items = Array.from(gallery.querySelectorAll('a.gal-item'));

    if (oldExtra) {
      items = items.concat(Array.from(oldExtra.querySelectorAll('a.gal-item')));
      oldExtra.parentNode.removeChild(oldExtra);
    }
    if (oldControls) oldControls.parentNode.removeChild(oldControls);

    if (!items.length) return;
    gallery.innerHTML = '';
    gallery.classList.add('blog-media-grid');
    items.forEach(function(item, index) {
      if (index < limit) gallery.appendChild(item);
    });

    if (items.length <= limit) {
      initLightbox(gallery);
      return;
    }

    var slider = document.createElement('div');
    slider.className = 'gal-slider-wrap blog-media-slider';
    var head = document.createElement('div');
    head.className = 'gal-slider-header';
    var count = document.createElement('span');
    count.className = 'gal-slider-counter';
    count.textContent = (items.length - limit) + (items.length - limit === 1 ? ' more photo' : ' more photos');
    var nav = document.createElement('div');
    nav.className = 'gal-slider-nav';
    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'gal-nav-btn';
    prev.innerHTML = '<i class="fa fa-chevron-left"></i>';
    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'gal-nav-btn';
    next.innerHTML = '<i class="fa fa-chevron-right"></i>';
    nav.appendChild(prev);
    nav.appendChild(next);
    head.appendChild(count);
    head.appendChild(nav);

    var viewport = document.createElement('div');
    viewport.className = 'gal-slider-viewport';
    var track = document.createElement('div');
    track.className = 'gal-slides-track';
    items.slice(limit).forEach(function(item) {
      track.appendChild(item);
    });
    viewport.appendChild(track);
    var progress = document.createElement('div');
    progress.className = 'gal-progress';
    var bar = document.createElement('div');
    bar.className = 'gal-progress-bar';
    progress.appendChild(bar);
    var foot = document.createElement('div');
    foot.className = 'gal-more-count';
    slider.appendChild(head);
    slider.appendChild(viewport);
    slider.appendChild(progress);
    slider.appendChild(foot);

    var extraTotal = items.length - limit;
    var updateSlider = function() {
      var maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      var item = track.querySelector('a.gal-item');
      var itemStep = item ? item.getBoundingClientRect().width + 10 : 160;
      var firstVisible = itemStep ? Math.round(viewport.scrollLeft / itemStep) : 0;
      var visibleCount = Math.max(1, Math.floor(viewport.clientWidth / itemStep));
      var shown = Math.min(extraTotal, firstVisible + visibleCount);
      var remaining = Math.max(0, extraTotal - shown);
      bar.style.width = maxScroll > 0 ? Math.max((viewport.scrollLeft / maxScroll) * 100, 2) + '%' : '100%';
      if (remaining > 0) {
        foot.className = 'gal-more-count';
        foot.innerHTML = '<strong>+' + remaining + '</strong> more image' + (remaining === 1 ? '' : 's') + ' left';
      } else {
        foot.className = 'gal-more-count done';
        foot.textContent = 'All extra images shown';
      }
      prev.disabled = viewport.scrollLeft <= 2;
      next.disabled = maxScroll <= 2 || viewport.scrollLeft >= maxScroll - 2;
    };

    prev.addEventListener('click', function() {
      viewport.scrollBy({ left: -Math.max(160, viewport.clientWidth - 40), behavior: 'smooth' });
    });
    next.addEventListener('click', function() {
      viewport.scrollBy({ left: Math.max(160, viewport.clientWidth - 40), behavior: 'smooth' });
    });
    viewport.addEventListener('scroll', function() {
      window.requestAnimationFrame(updateSlider);
    });
    window.addEventListener('resize', updateSlider);

    slider.classList.add('is-open');
    gallery.parentNode.insertBefore(slider, gallery.nextSibling);
    initLightbox(gallery);
    initLightbox(track);
    setTimeout(updateSlider, 0);
  }

  function applyVideoShowMore(container, limit) {
    if (!container || container.closest('.blog-video-extra') || container.closest('.trek-video-extra')) return;
    if (isAvocationsPage() && container.closest('#tab-trekking')) return;

    var videos = Array.from(container.querySelectorAll(':scope > video'));
    if (videos.length <= limit) return;

    var oldExtra = container.nextElementSibling && container.nextElementSibling.classList.contains('blog-video-extra')
      ? container.nextElementSibling
      : null;
    var oldControls = oldExtra && oldExtra.nextElementSibling && oldExtra.nextElementSibling.classList.contains('blog-media-show-wrap')
      ? oldExtra.nextElementSibling
      : null;

    if (oldExtra) {
      videos = videos.concat(Array.from(oldExtra.querySelectorAll('video')));
      oldExtra.parentNode.removeChild(oldExtra);
    }
    if (oldControls) oldControls.parentNode.removeChild(oldControls);

    videos.forEach(function(video, index) {
      if (index < limit) container.appendChild(video);
    });

    var extra = document.createElement('div');
    extra.className = container.className + ' blog-video-extra';
    videos.slice(limit).forEach(function(video) {
      extra.appendChild(video);
    });

    var controls = makeShowButton(videos.length - limit, 'Videos');
    controls.button.addEventListener('click', function() {
      var open = extra.classList.contains('is-open');
      extra.classList.toggle('is-open', !open);
      controls.button.innerHTML = open
        ? '<i class="fa fa-chevron-down"></i> Show ' + (videos.length - limit) + ' More Videos'
        : '<i class="fa fa-chevron-up"></i> Show Less';
    });

    container.parentNode.insertBefore(extra, container.nextSibling);
    extra.parentNode.insertBefore(controls.wrap, extra.nextSibling);
  }

  function applyBlogMediaShowMore() {
    document.querySelectorAll('.gal-container,.gal-grid,.blog-gallery-grid,.auto-art-gallery,.auto-folder-grid').forEach(function(gallery) {
      applyImageShowMore(gallery, 4);
    });
    document.querySelectorAll('.conf-video-grid,.video-row,.trek-video-grid').forEach(function(container) {
      applyVideoShowMore(container, 2);
    });
  }

  function hasGalleryWork() {
    return !!document.querySelector(
      '[data-auto-gallery-root],.gal-grid,.blog-gallery-grid,.gal-container,.auto-art-gallery,.auto-folder-grid,.conf-video-grid,.video-row,.trek-video-grid'
    );
  }

  function run() {
    if (!hasGalleryWork()) return;

    injectStyles();
    getTree().then(function(tree) {
      document.querySelectorAll('[data-auto-gallery-root]').forEach(function(container) {
        renderRoot(container, tree);
      });

      document.querySelectorAll('.gal-grid,.blog-gallery-grid,.gal-container,.auto-art-gallery').forEach(function(container) {
        updateExistingGallery(container, tree);
      });
      applyBlogMediaShowMore();
      window.dispatchEvent(new CustomEvent('autoFolderGalleriesUpdated'));
    }).catch(function(error) {
      console.warn('Auto folder galleries unavailable', error);
      applyBlogMediaShowMore();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
