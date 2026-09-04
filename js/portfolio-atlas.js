(function () {
  'use strict';

  if (window.__portfolioAtlasLoaded || !window.PortfolioAtlasRegistry) return;
  window.__portfolioAtlasLoaded = true;

  var registry = window.PortfolioAtlasRegistry;
  var siteBase = window.__portfolioSiteBase || new URL('../', document.currentScript.src).href;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = {
    current: null,
    expanded: Object.create(null),
    focusedId: '',
    dynamicByParent: Object.create(null),
    dynamicById: Object.create(null),
    counts: Object.create(null),
    projectsPromise: null,
    publicationsPromise: null,
    siteDataPromise: null,
    blogSourcePromises: Object.create(null),
    searchSerial: 0,
    trigger: null,
    dialog: null,
    tree: null,
    results: null,
    search: null,
    status: null
  };

  var BLOG_PARENT_BY_CATEGORY = {
    academics: 'blog-academics',
    social: 'blog-social',
    sports: 'blog-sports',
    avocations: 'blog-avocations'
  };

  var BLOG_SOURCE_BY_PARENT = {
    'blog-academics': { url: 'academics.html', category: 'academics', section: 'academics' },
    'blog-social': { url: 'social-life.html', category: 'social', section: 'social-life' },
    'blog-sports': { url: 'sports.html', category: 'sports', section: 'sports-wellness' },
    'blog-avocations': { url: 'avocations.html', category: 'avocations', section: 'avocations' }
  };

  var PUBLICATION_PARENT_BY_TYPE = {
    patents: 'pub-patents',
    journals: 'pub-journals',
    conferences: 'pub-conferences',
    'book-chapters': 'pub-book-chapters',
    bookchapters: 'pub-book-chapters',
    articles: 'pub-articles',
    presentations: 'pub-presentations',
    posters: 'pub-posters'
  };

  function siteUrl(path) {
    return new URL(String(path || '').replace(/^\/+/, ''), siteBase).href;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
    });
  }

  function slug(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 58) || 'item';
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function relativeCurrentRoute() {
    var current = new URL(window.location.href);
    var base = new URL(siteBase);
    var pathname = current.pathname;
    if (pathname.indexOf(base.pathname) === 0) pathname = pathname.slice(base.pathname.length);
    return pathname.replace(/^\/+/, '') + current.hash;
  }

  function normalizeLink(value) {
    try {
      var url = new URL(value, siteBase);
      var base = new URL(siteBase);
      var pathname = url.pathname.indexOf(base.pathname) === 0
        ? url.pathname.slice(base.pathname.length)
        : url.pathname.replace(/^\/+/, '');
      return decodeURIComponent(pathname.replace(/^\/+/, '') + url.hash).toLowerCase();
    } catch (error) {
      return String(value || '').toLowerCase();
    }
  }

  function getNode(id) {
    return state.dynamicById[id] || registry.getNode(id);
  }

  function getPath(nodeOrId) {
    var node = typeof nodeOrId === 'string' ? getNode(nodeOrId) : nodeOrId;
    if (!node) return [];
    if (!node.dynamic) return registry.getPath(node.id);
    return registry.getPath(node.parent).concat([node]);
  }

  function displayPath(node) {
    return getPath(node).filter(function (entry) {
      return entry.id !== 'portfolio-root' && entry.id !== 'home';
    }).map(function (entry) { return entry.label; }).join(' › ');
  }

  function addDynamicNode(node) {
    if (!node || !node.id || !node.parent) return null;
    var existing = state.dynamicById[node.id];
    if (existing) return existing;
    node.dynamic = true;
    state.dynamicById[node.id] = node;
    state.dynamicByParent[node.parent] = state.dynamicByParent[node.parent] || [];
    state.dynamicByParent[node.parent].push(node);
    return node;
  }

  function queryTitle(element) {
    if (!element) return '';
    var title = element.getAttribute('data-title') || '';
    if (!title) {
      var heading = element.querySelector('.proj-card-title, .pub-title, .evt-title, .sports-post-card h4, h3, h2, h4');
      title = heading ? heading.textContent : '';
    }
    return cleanText(title).replace(/^\d+\s*/, '');
  }

  function categoryForCurrentDocument() {
    var file = (window.location.pathname.split('/').pop() || '').toLowerCase();
    return ({
      'academics.html': 'academics',
      'social-life.html': 'social',
      'sports.html': 'sports',
      'avocations.html': 'avocations'
    })[file] || '';
  }

  function preparePublicationIds(doc) {
    var counts = Object.create(null);
    Array.prototype.forEach.call(doc.querySelectorAll('[data-publication-item]'), function (card) {
      var type = card.getAttribute('data-publication-type') || 'publication';
      counts[type] = (counts[type] || 0) + 1;
      if (!card.id) card.id = 'publication-' + slug(type) + '-' + counts[type];
    });
  }

  function revealGeneratedPublication(hash) {
    if (!/^publication-/.test(hash)) return;
    var target = document.getElementById(hash);
    if (!target) return;
    var section = target.closest('.pub-section');
    if (section && typeof window.switchTab === 'function') {
      var tab = section.id.replace(/^tab-/, '');
      var button = Array.prototype.find.call(document.querySelectorAll('.pub-tab-btn'), function (candidate) {
        return (candidate.getAttribute('onclick') || '').indexOf("'" + tab + "'") !== -1;
      });
      if (button) {
        window.switchTab(tab, button);
        history.replaceState(null, '', '#' + hash);
      }
    }
    if (window.SiteDeepLinks) window.SiteDeepLinks.reveal();
  }

  function dynamicCurrentFromDocument() {
    var hash = decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
    if (!hash) return null;

    preparePublicationIds(document);
    var target = document.getElementById(hash);
    if (!target) return null;

    var project = target.closest('[data-project-item]');
    if (project) {
      return addDynamicNode({
        id: 'project-' + project.id,
        label: queryTitle(project),
        url: 'project.html#' + project.id,
        parent: 'projects',
        type: 'generated',
        description: 'Project detail in the applied engineering portfolio.',
        importance: 'primary'
      });
    }

    var publication = target.closest('[data-publication-item]');
    if (publication) {
      var publicationType = publication.getAttribute('data-publication-type') || '';
      return addDynamicNode({
        id: 'publication-item-' + publication.id,
        label: queryTitle(publication),
        url: 'publication.html#' + publication.id,
        parent: PUBLICATION_PARENT_BY_TYPE[publicationType] || 'publications',
        type: 'generated',
        description: 'Publication record.',
        importance: 'primary'
      });
    }

    var story = target.closest('[data-blog-post], [data-post-id], [data-canonical]');
    var category = story && (story.getAttribute('data-category') || categoryForCurrentDocument());
    var parent = BLOG_PARENT_BY_CATEGORY[category];
    if (story && parent) {
      return addDynamicNode({
        id: 'story-' + slug(category + '-' + hash),
        label: queryTitle(story) || document.title.replace(/\s*[-–|].*$/, ''),
        url: (window.location.pathname.split('/').pop() || 'index.html') + '#' + hash,
        parent: parent,
        type: 'generated',
        description: 'Story in the ' + registry.getNode(parent).label.toLowerCase() + ' collection.',
        importance: category === 'academics' ? 'primary' : 'quiet'
      });
    }

    return null;
  }

  function resolveCurrent() {
    var staticNode = registry.resolve(relativeCurrentRoute());
    var hash = (window.location.hash || '').replace(/^#/, '');
    if (staticNode && (!hash || staticNode.type === 'anchor' || staticNode.type === 'filter' || staticNode.type === 'evidence')) {
      return staticNode;
    }
    return dynamicCurrentFromDocument() || staticNode || registry.resolve(window.location.pathname.split('/').pop());
  }

  function breadcrumbPath(current) {
    if (!current) return [];
    if (current.id === 'home') return [registry.getNode('home')];
    var path = getPath(current).filter(function (node) {
      return node.id !== 'portfolio-root' && node.id.indexOf('blog-') !== 0;
    });
    return [registry.getNode('home')].concat(path);
  }

  function atlasIcon() {
    return '<svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">' +
      '<path d="M14 5v5M14 10H7v5M14 10h7v5M7 15v5M21 15v5" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="14" cy="4" r="2.25" fill="currentColor"/>' +
      '<circle cx="7" cy="15" r="2.1" fill="none" stroke="currentColor" stroke-width="1.45"/>' +
      '<circle cx="21" cy="15" r="2.1" fill="none" stroke="currentColor" stroke-width="1.45"/>' +
      '<circle cx="7" cy="22" r="2.1" fill="currentColor"/>' +
      '<circle cx="21" cy="22" r="2.1" fill="currentColor"/>' +
    '</svg>';
  }

  function buildTrail(showArrival) {
    var old = document.querySelector('.portfolio-atlas-trail-wrap');
    if (old) old.remove();
    var path = breadcrumbPath(state.current);
    if (!path.length) return;

    var wrap = document.createElement('div');
    wrap.className = 'portfolio-atlas-trail-wrap' + (reducedMotion || !showArrival ? ' is-ready' : '');
    var crumbs = path.map(function (node, index) {
      var isCurrent = index === path.length - 1;
      var inner = '<span class="portfolio-atlas-dot" aria-hidden="true"></span>' +
        '<span>' + escapeHtml(node.label) + '</span>';
      if (isCurrent) {
        return '<li class="portfolio-atlas-crumb is-current"><span aria-current="page">' + inner + '</span></li>';
      }
      if (node.url) {
        return '<li class="portfolio-atlas-crumb"><a href="' + escapeHtml(siteUrl(node.url)) + '">' + inner + '</a></li>';
      }
      return '<li class="portfolio-atlas-crumb"><button type="button" data-atlas-focus="' + escapeHtml(node.id) + '">' + inner + '</button></li>';
    }).join('');

    wrap.innerHTML = '<nav class="portfolio-atlas-trail" aria-label="Breadcrumb">' +
      '<ol>' + crumbs + '</ol>' +
      '<div class="portfolio-atlas-reserved" aria-live="polite">' +
        '<span class="portfolio-atlas-here">You are here</span>' +
        '<button class="portfolio-atlas-trigger" type="button" aria-label="Open Portfolio Atlas" title="Explore Portfolio Atlas"' +
          (reducedMotion || !showArrival ? '' : ' tabindex="-1" aria-hidden="true"') + '>' + atlasIcon() + '</button>' +
      '</div>' +
    '</nav>';

    var headerRoot = document.getElementById('site-header');
    if (headerRoot) headerRoot.insertAdjacentElement('afterend', wrap);
    else document.body.insertAdjacentElement('afterbegin', wrap);

    state.trigger = wrap.querySelector('.portfolio-atlas-trigger');
    state.trigger.addEventListener('click', openAtlas);
    wrap.addEventListener('click', function (event) {
      var focusButton = event.target.closest('[data-atlas-focus]');
      if (!focusButton) return;
      openAtlas(focusButton.getAttribute('data-atlas-focus'));
    });

    if (!reducedMotion && showArrival) {
      window.setTimeout(function () {
        wrap.classList.add('is-ready');
        state.trigger.removeAttribute('tabindex');
        state.trigger.removeAttribute('aria-hidden');
      }, 1080);
    }
  }

  function syncHeaderActiveState() {
    if (!state.current) return;
    var path = getPath(state.current);
    var topNode = path.length > 1 ? path[1] : path[0];
    document.querySelectorAll('.header_area .nav-item[data-nav]').forEach(function (item) {
      item.classList.toggle('active', Boolean(topNode && item.getAttribute('data-nav') === topNode.id));
    });
  }

  function updateBreadcrumbJsonLd() {
    var old = document.getElementById('portfolio-atlas-breadcrumb-jsonld');
    if (old) old.remove();
    var navigable = breadcrumbPath(state.current).filter(function (node) { return node.url; });
    if (!navigable.length) return;
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'portfolio-atlas-breadcrumb-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: navigable.map(function (node, index) {
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: node.label,
          item: siteUrl(node.url)
        };
      })
    });
    document.head.appendChild(script);
  }

  function createDialog() {
    var dialog = document.createElement('dialog');
    dialog.className = 'portfolio-atlas-dialog';
    dialog.setAttribute('aria-labelledby', 'portfolio-atlas-title');
    dialog.innerHTML = '<div class="portfolio-atlas-frame">' +
      '<aside class="portfolio-atlas-intro">' +
        '<p class="portfolio-atlas-kicker">Portfolio navigation</p>' +
        '<h2 class="portfolio-atlas-title" id="portfolio-atlas-title">Portfolio Atlas</h2>' +
        '<p class="portfolio-atlas-lede">See where this page belongs, move to a neighbouring area, or search for a destination by name.</p>' +
        '<label class="portfolio-atlas-search-label" for="portfolio-atlas-search">Find something...</label>' +
        '<div class="portfolio-atlas-search-wrap">' +
          '<svg class="portfolio-atlas-search-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m12.5 12.5 4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>' +
          '<input class="portfolio-atlas-search" id="portfolio-atlas-search" type="search" autocomplete="off" placeholder="Gait, publications, Croatia, LLM...">' +
        '</div>' +
        '<p class="portfolio-atlas-search-status" id="portfolio-atlas-search-status" role="status" aria-live="polite"></p>' +
        '<ul class="portfolio-atlas-results" aria-label="Portfolio search results"></ul>' +
        '<div class="portfolio-atlas-legend" aria-label="Map legend">' +
          '<span><i class="portfolio-atlas-node-dot" aria-hidden="true"></i> Available</span>' +
          '<span><i class="portfolio-atlas-node-dot" style="background:var(--atlas-green);border-color:var(--atlas-green)" aria-hidden="true"></i> Current</span>' +
        '</div>' +
      '</aside>' +
      '<section class="portfolio-atlas-tree-panel">' +
        '<div class="portfolio-atlas-toolbar">' +
          '<div class="portfolio-atlas-context"><span class="portfolio-atlas-context-label">Current location</span><strong></strong></div>' +
          '<button class="portfolio-atlas-close" type="button" aria-label="Close Portfolio Atlas" title="Close">&times;</button>' +
        '</div>' +
        '<div class="portfolio-atlas-scroll">' +
          '<nav aria-label="Portfolio Atlas"><ul class="portfolio-atlas-tree"></ul></nav>' +
        '</div>' +
      '</section>' +
    '</div>';

    document.body.appendChild(dialog);
    state.dialog = dialog;
    state.tree = dialog.querySelector('.portfolio-atlas-tree');
    state.results = dialog.querySelector('.portfolio-atlas-results');
    state.search = dialog.querySelector('.portfolio-atlas-search');
    state.status = dialog.querySelector('.portfolio-atlas-search-status');

    dialog.querySelector('.portfolio-atlas-close').addEventListener('click', closeAtlas);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeAtlas();
    });
    dialog.addEventListener('close', afterDialogClose);
    dialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      closeAtlas();
    });
    state.tree.addEventListener('click', onTreeClick);
    state.tree.addEventListener('mouseover', onTreeHover);
    state.tree.addEventListener('mouseout', clearTreeRelations);
    state.search.addEventListener('input', onSearchInput);
  }

  function updateCurrentContext() {
    if (!state.dialog || !state.current) return;
    var context = state.dialog.querySelector('.portfolio-atlas-context strong');
    context.textContent = displayPath(state.current) || state.current.label;
  }

  function staticChildren(node) {
    return registry.getChildren(node.id);
  }

  function dynamicChildren(node) {
    var children = state.dynamicByParent[node.id] || [];
    if (node.id.indexOf('blog-') === 0) {
      var importantId = state.focusedId || (state.current && state.current.id);
      var important = children.filter(function (child) { return child.id === importantId; });
      var recent = children.filter(function (child) { return child.id !== importantId; }).slice(0, 6 - important.length);
      return important.concat(recent);
    }
    return children;
  }

  function treeChildren(node) {
    return staticChildren(node).concat(dynamicChildren(node));
  }

  function canHaveDynamicChildren(node) {
    return node.id === 'projects' || node.id.indexOf('pub-') === 0 || node.id.indexOf('blog-') === 0;
  }

  function hasChildren(node) {
    return staticChildren(node).length > 0 || dynamicChildren(node).length > 0 || canHaveDynamicChildren(node);
  }

  function countForNode(node) {
    if (state.counts[node.id] !== undefined) return state.counts[node.id];
    return '';
  }

  function initialExpanded() {
    state.expanded['portfolio-root'] = true;
    getPath(state.current).forEach(function (node) {
      if (node.id !== (state.current && state.current.id)) state.expanded[node.id] = true;
    });
  }

  function stageForNode(node) {
    var path = getPath(state.current);
    var index = path.map(function (entry) { return entry.id; }).indexOf(node.id);
    if (index !== -1) return Math.min(index, 5);
    var currentParent = state.current && state.current.parent;
    if (node.parent === currentParent) return Math.min(path.length + 1, 6);
    if (node.parent === 'portfolio-root') return 3;
    return 5;
  }

  function nodeHtml(node) {
    var children = treeChildren(node);
    var expandable = hasChildren(node);
    var expanded = expandable && Boolean(state.expanded[node.id]);
    var isCurrent = state.current && state.current.id === node.id;
    var rowTag;
    var rowAttributes;
    if (node.url) {
      rowTag = 'a';
      rowAttributes = 'href="' + escapeHtml(siteUrl(node.url)) + '"' + (isCurrent ? ' aria-current="page"' : '');
    } else {
      rowTag = 'button';
      rowAttributes = 'type="button" data-atlas-toggle-main="' + escapeHtml(node.id) + '"' +
        (expandable ? ' aria-expanded="' + String(expanded) + '"' : '');
    }
    var count = countForNode(node);
    var classes = 'portfolio-atlas-node' + (isCurrent ? ' is-current' : '') +
      (node.id === 'portfolio-root' ? ' is-root' : '');
    var childHtml = '';
    if (children.length) {
      childHtml = '<ul' + (expanded ? '' : ' hidden') + '>' + children.map(nodeHtml).join('') + '</ul>';
    }
    return '<li class="' + classes + '" data-node-id="' + escapeHtml(node.id) + '"' +
      ' data-importance="' + escapeHtml(node.importance || 'secondary') + '" data-atlas-stage style="--atlas-stage:' + stageForNode(node) + '">' +
      '<div class="portfolio-atlas-node-row' + (state.focusedId === node.id ? ' is-focused' : '') + '">' +
        (expandable
          ? '<button class="portfolio-atlas-expander" type="button" data-atlas-toggle="' + escapeHtml(node.id) + '" aria-expanded="' + String(expanded) + '" aria-label="' + (expanded ? 'Collapse ' : 'Expand ') + escapeHtml(node.label) + '"></button>'
          : '<span class="portfolio-atlas-expander-spacer" aria-hidden="true"></span>') +
        '<' + rowTag + ' class="portfolio-atlas-node-main" ' + rowAttributes + '>' +
          '<span class="portfolio-atlas-node-dot" aria-hidden="true"></span>' +
          '<span class="portfolio-atlas-node-copy">' +
            '<span class="portfolio-atlas-node-label">' + escapeHtml(node.label) + '</span>' +
            (node.description ? '<span class="portfolio-atlas-node-description">' + escapeHtml(node.description) + '</span>' : '') +
          '</span>' +
        '</' + rowTag + '>' +
        (count !== '' ? '<span class="portfolio-atlas-node-count" aria-label="' + count + ' items">' + count + '</span>' : '') +
      '</div>' + childHtml +
    '</li>';
  }

  function renderTree() {
    if (!state.tree) return;
    var root = registry.getNode('portfolio-root');
    state.tree.innerHTML = nodeHtml(root);
  }

  function ensureNodeVisible(id, focus) {
    var node = getNode(id);
    if (!node) return;
    getPath(node).forEach(function (ancestor) { state.expanded[ancestor.id] = true; });
    if (focus) state.focusedId = id;
    renderTree();
    window.requestAnimationFrame(function () {
      var row = state.tree.querySelector('[data-node-id="' + CSS.escape(id) + '"] > .portfolio-atlas-node-row');
      if (!row) return;
      row.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
      var focusTarget = row.querySelector('.portfolio-atlas-node-main');
      if (focusTarget) focusTarget.focus({ preventScroll: true });
    });
  }

  function loadForExpansion(node) {
    if (node.id === 'projects') return loadProjects();
    if (node.id.indexOf('pub-') === 0) return loadPublications();
    if (node.id.indexOf('blog-') === 0) return loadBlogCategory(node.id);
    return Promise.resolve();
  }

  function toggleNode(id) {
    var node = getNode(id);
    if (!node) return;
    state.expanded[id] = !state.expanded[id];
    renderTree();
    if (state.expanded[id]) {
      loadForExpansion(node).then(function () { renderTree(); });
    }
  }

  function onTreeClick(event) {
    var toggle = event.target.closest('[data-atlas-toggle]');
    var mainToggle = event.target.closest('[data-atlas-toggle-main]');
    if (toggle) {
      event.preventDefault();
      toggleNode(toggle.getAttribute('data-atlas-toggle'));
    } else if (mainToggle) {
      event.preventDefault();
      toggleNode(mainToggle.getAttribute('data-atlas-toggle-main'));
    }
  }

  function onTreeHover(event) {
    var item = event.target.closest('[data-node-id]');
    if (!item || !state.tree.contains(item)) return;
    clearTreeRelations();
    getPath(item.getAttribute('data-node-id')).forEach(function (node) {
      var related = state.tree.querySelector('[data-node-id="' + CSS.escape(node.id) + '"] > .portfolio-atlas-node-row');
      if (related) related.classList.add('is-related');
    });
  }

  function clearTreeRelations() {
    if (!state.tree) return;
    state.tree.querySelectorAll('.is-related').forEach(function (row) { row.classList.remove('is-related'); });
  }

  function parseProjects(doc) {
    var projectNodes = [];
    Array.prototype.forEach.call(doc.querySelectorAll('[data-project-item]'), function (card) {
      if (!card.id) return;
      projectNodes.push(addDynamicNode({
        id: 'project-' + card.id,
        label: queryTitle(card),
        url: 'project.html#' + card.id,
        parent: 'projects',
        type: 'generated',
        description: cleanText((card.querySelector('.proj-card-desc, p') || {}).textContent || '').slice(0, 180),
        importance: 'primary'
      }));
    });
    state.counts.projects = projectNodes.length;
    return projectNodes;
  }

  function loadDocument(url) {
    var currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (currentFile === url.toLowerCase()) return Promise.resolve(document);
    if (!window.fetch || typeof DOMParser === 'undefined') return Promise.resolve(null);
    return fetch(siteUrl(url), { cache: 'no-cache' })
      .then(function (response) { return response.ok ? response.text() : ''; })
      .then(function (html) { return html ? new DOMParser().parseFromString(html, 'text/html') : null; })
      .catch(function () { return null; });
  }

  function loadProjects() {
    if (state.projectsPromise) return state.projectsPromise;
    state.projectsPromise = loadDocument('project.html').then(function (doc) {
      return doc ? parseProjects(doc) : [];
    });
    return state.projectsPromise;
  }

  function parsePublications(doc) {
    preparePublicationIds(doc);
    var totals = Object.create(null);
    Array.prototype.forEach.call(doc.querySelectorAll('[data-publication-item]'), function (card) {
      var type = card.getAttribute('data-publication-type') || '';
      var parent = PUBLICATION_PARENT_BY_TYPE[type] || 'publications';
      totals[parent] = (totals[parent] || 0) + 1;
      addDynamicNode({
        id: 'publication-item-' + card.id,
        label: queryTitle(card),
        url: 'publication.html#' + card.id,
        parent: parent,
        type: 'generated',
        description: cleanText((card.querySelector('.pub-meta, p') || {}).textContent || 'Publication record.').slice(0, 180),
        importance: 'primary'
      });
    });
    var total = 0;
    Object.keys(totals).forEach(function (parent) {
      state.counts[parent] = totals[parent];
      total += totals[parent];
    });
    state.counts.publications = total;
    return total;
  }

  function loadPublications() {
    if (state.publicationsPromise) return state.publicationsPromise;
    state.publicationsPromise = loadDocument('publication.html').then(function (doc) {
      return doc ? parsePublications(doc) : 0;
    });
    return state.publicationsPromise;
  }

  function applySiteDataCounts() {
    if (!window.SiteData) return;
    var blogCounts = window.SiteData.getBlogCategoryCounts();
    state.counts.blog = window.SiteData.getBlogTotalCount();
    Object.keys(BLOG_PARENT_BY_CATEGORY).forEach(function (category) {
      state.counts[BLOG_PARENT_BY_CATEGORY[category]] = blogCounts[category] || 0;
    });
    var academicCounts = window.SiteData.countAcademicPosts();
    state.counts.academics = academicCounts.academics || 0;
    Object.keys(academicCounts).forEach(function (category) {
      var nodeId = ({
        leadership: 'acad-leadership',
        conferences: 'acad-conferences',
        workshops: 'acad-workshops',
        talks: 'acad-talks',
        'faculty-visits': 'acad-faculty-visits',
        events: 'acad-events',
        hackathon: 'acad-hackathons',
        'social-activities': 'acad-social'
      })[category];
      if (nodeId) state.counts[nodeId] = academicCounts[category];
    });
    var publicationTypes = window.SiteData.stats && window.SiteData.stats.publicationTypes;
    if (publicationTypes) {
      var publicationMap = {
        patents: 'pub-patents', journals: 'pub-journals', conferences: 'pub-conferences',
        bookchapters: 'pub-book-chapters', articles: 'pub-articles',
        presentations: 'pub-presentations', posters: 'pub-posters'
      };
      var publicationTotal = 0;
      Object.keys(publicationMap).forEach(function (type) {
        var count = Number(publicationTypes[type] || 0);
        state.counts[publicationMap[type]] = count;
        publicationTotal += count;
      });
      state.counts.publications = publicationTotal;
    }
  }

  function addSiteDataStories() {
    if (!window.SiteData) return [];
    return window.SiteData.getItems().map(function (item) {
      var parent = BLOG_PARENT_BY_CATEGORY[item.cat];
      if (!parent || !item.link) return null;
      var hash = item.link.indexOf('#') === -1 ? item.id : item.link.split('#').pop();
      return addDynamicNode({
        id: 'story-' + slug(item.cat + '-' + hash),
        label: item.title,
        url: item.link,
        parent: parent,
        type: 'generated',
        description: item.description || item.excerpt || '',
        searchText: [item.tags, item.subCategory, item.date].join(' '),
        importance: item.cat === 'academics' ? 'primary' : 'quiet'
      });
    }).filter(Boolean);
  }

  function ensureSiteData() {
    if (window.SiteData) {
      applySiteDataCounts();
      addSiteDataStories();
      return Promise.resolve(window.SiteData);
    }
    if (state.siteDataPromise) return state.siteDataPromise;
    state.siteDataPromise = new Promise(function (resolve) {
      var existing = Array.prototype.find.call(document.scripts, function (script) {
        return /\/data\/site-data\.js(?:\?|$)/.test(script.src || '');
      });
      var script = existing || document.createElement('script');
      var complete = function () {
        applySiteDataCounts();
        addSiteDataStories();
        resolve(window.SiteData || null);
      };
      if (existing && window.SiteData) return complete();
      script.addEventListener('load', complete, { once: true });
      script.addEventListener('error', function () { resolve(null); }, { once: true });
      if (!existing) {
        script.src = siteUrl('data/site-data.js');
        document.head.appendChild(script);
      } else {
        window.setTimeout(complete, 1200);
      }
    });
    return state.siteDataPromise;
  }

  function parseBlogDocument(doc, source, parentId) {
    if (!doc) return [];
    var found = [];
    Array.prototype.forEach.call(doc.querySelectorAll('[data-blog-post][data-blog-section]'), function (card, index) {
      var section = card.getAttribute('data-blog-section') || '';
      if (source.section && section !== source.section) return;
      var cardId = card.id || card.getAttribute('data-blog-post-id') || card.getAttribute('data-post-id');
      var canonical = card.getAttribute('data-canonical') || '';
      var url = cardId ? source.url + '#' + cardId : canonical;
      if (!url) return;
      var normalized = normalizeLink(url);
      var duplicate = (state.dynamicByParent[parentId] || []).some(function (node) {
        return normalizeLink(node.url) === normalized;
      });
      if (duplicate) return;
      var title = queryTitle(card);
      if (!title) return;
      found.push(addDynamicNode({
        id: 'story-auto-' + slug(source.category + '-' + (cardId || index) + '-' + title),
        label: title,
        url: url,
        parent: parentId,
        type: 'generated',
        description: cleanText((card.querySelector('p') || {}).textContent || '').slice(0, 180),
        importance: source.category === 'academics' ? 'primary' : 'quiet'
      }));
    });
    state.counts[parentId] = (state.dynamicByParent[parentId] || []).length;
    state.counts.blog = Object.keys(BLOG_PARENT_BY_CATEGORY).reduce(function (total, category) {
      return total + Number(state.counts[BLOG_PARENT_BY_CATEGORY[category]] || 0);
    }, 0);
    return found;
  }

  function loadBlogCategory(parentId) {
    if (state.blogSourcePromises[parentId]) return state.blogSourcePromises[parentId];
    var source = BLOG_SOURCE_BY_PARENT[parentId];
    if (!source) return Promise.resolve([]);
    state.blogSourcePromises[parentId] = ensureSiteData().then(function () {
      return loadDocument(source.url);
    }).then(function (doc) {
      return parseBlogDocument(doc, source, parentId);
    });
    return state.blogSourcePromises[parentId];
  }

  function ensureSearchIndex() {
    return Promise.all([
      ensureSiteData(),
      loadProjects(),
      loadPublications(),
      loadBlogCategory('blog-academics'),
      loadBlogCategory('blog-social'),
      loadBlogCategory('blog-sports'),
      loadBlogCategory('blog-avocations')
    ]).then(function () {
      renderTree();
    });
  }

  function searchNodes(query) {
    var needle = query.toLowerCase();
    var all = registry.nodes.concat(Object.keys(state.dynamicById).map(function (id) {
      return state.dynamicById[id];
    }));
    var seen = Object.create(null);
    return all.filter(function (node) {
      if (!node || node.id === 'portfolio-root' || seen[node.id]) return false;
      seen[node.id] = true;
      var haystack = [node.label, node.description, node.searchText, displayPath(node)].join(' ').toLowerCase();
      return haystack.indexOf(needle) !== -1;
    }).sort(function (left, right) {
      var leftStart = left.label.toLowerCase().indexOf(needle) === 0 ? 0 : 1;
      var rightStart = right.label.toLowerCase().indexOf(needle) === 0 ? 0 : 1;
      return leftStart - rightStart || left.label.length - right.label.length || left.label.localeCompare(right.label);
    }).slice(0, 12);
  }

  function renderSearchResults(query, loading) {
    if (!query) {
      state.results.innerHTML = '';
      state.status.textContent = 'Search shows where each result lives in the portfolio.';
      return;
    }
    var results = searchNodes(query);
    state.results.innerHTML = results.map(function (node) {
      return '<li><button class="portfolio-atlas-result" type="button" data-atlas-result="' + escapeHtml(node.id) + '">' +
        '<strong>' + escapeHtml(node.label) + '</strong>' +
        '<span>' + escapeHtml(displayPath(node)) + '</span>' +
      '</button></li>';
    }).join('');
    state.status.textContent = loading
      ? 'Searching the route map; loading detailed destinations…'
      : (results.length ? results.length + (results.length === 1 ? ' destination found.' : ' destinations found.') : 'No matching destination found.');
    state.results.querySelectorAll('[data-atlas-result]').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-atlas-result');
        state.search.value = '';
        state.results.innerHTML = '';
        state.status.textContent = 'Focused in the portfolio tree. Activate the highlighted item to visit it.';
        ensureNodeVisible(id, true);
      });
    });
  }

  function onSearchInput() {
    var query = state.search.value.trim();
    var serial = ++state.searchSerial;
    renderSearchResults(query, query.length >= 2);
    if (query.length < 2) return;
    ensureSearchIndex().then(function () {
      if (serial !== state.searchSerial || state.search.value.trim() !== query) return;
      renderSearchResults(query, false);
    });
  }

  function openAtlas(focusId) {
    if (!state.dialog) createDialog();
    state.focusedId = focusId || '';
    initialExpanded();
    if (focusId) getPath(focusId).forEach(function (node) { state.expanded[node.id] = true; });
    updateCurrentContext();
    renderTree();
    state.search.value = '';
    state.results.innerHTML = '';
    state.status.textContent = 'Search shows where each result lives in the portfolio.';
    state.dialog.classList.add('is-opening');
    if (typeof state.dialog.showModal === 'function') state.dialog.showModal();
    else state.dialog.setAttribute('open', '');
    document.body.classList.add('portfolio-atlas-open');
    window.setTimeout(function () { state.dialog.classList.remove('is-opening'); }, reducedMotion ? 0 : 900);

    ensureSiteData().then(function () { renderTree(); });
    loadProjects().then(function () { renderTree(); });
    loadPublications().then(function () { renderTree(); });

    window.requestAnimationFrame(function () {
      if (focusId) ensureNodeVisible(focusId, true);
      else {
        var currentRow = state.current && state.tree.querySelector('[data-node-id="' + CSS.escape(state.current.id) + '"] > .portfolio-atlas-node-row');
        if (currentRow) currentRow.scrollIntoView({ block: 'center' });
        state.dialog.querySelector('.portfolio-atlas-close').focus();
      }
    });
  }

  function closeAtlas() {
    if (!state.dialog) return;
    if (typeof state.dialog.close === 'function') state.dialog.close();
    else {
      state.dialog.removeAttribute('open');
      afterDialogClose();
    }
  }

  function afterDialogClose() {
    document.body.classList.remove('portfolio-atlas-open');
    if (state.trigger) state.trigger.focus();
  }

  function refreshCurrentLocation() {
    state.current = resolveCurrent();
    if (!state.current) return;
    if (/^publication-/.test((window.location.hash || '').slice(1))) {
      revealGeneratedPublication((window.location.hash || '').slice(1));
    }
    buildTrail(false);
    updateBreadcrumbJsonLd();
    syncHeaderActiveState();
    initialExpanded();
    updateCurrentContext();
    renderTree();
  }

  function init() {
    state.current = resolveCurrent();
    if (!state.current || !document.getElementById('site-header')) return;
    buildTrail(true);
    updateBreadcrumbJsonLd();
    syncHeaderActiveState();
    initialExpanded();
    createDialog();
    renderTree();
    updateCurrentContext();
    window.addEventListener('hashchange', refreshCurrentLocation);
    document.dispatchEvent(new CustomEvent('portfolio-atlas:ready', { detail: { current: state.current.id } }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  window.PortfolioAtlas = {
    open: openAtlas,
    close: closeAtlas,
    getCurrentNode: function () { return state.current; },
    getCounts: function () { return Object.assign({}, state.counts); },
    refresh: refreshCurrentLocation
  };
})();
