(function() {
  'use strict';

  var BLOG_SECTIONS = [
    { slug: 'academics', label: 'Academics', href: 'academics.html', source: 'academics.html', fallbackCount: 65 },
    { slug: 'social-life', label: 'Social Life', href: 'social-life.html', source: 'social-life.html', fallbackCount: 6 },
    { slug: 'avocations', label: 'Avocations', href: 'avocations.html', source: 'avocations.html', fallbackCount: 14 },
    { slug: 'sports-wellness', label: 'Sports & Wellness', href: 'sports.html', source: 'sports.html', fallbackCount: 30 },
    { slug: 'publications', label: 'Publications', href: 'publication.html', source: 'publication.html', fallbackCount: 1 },
    { slug: 'projects', label: 'Projects', href: 'project.html', source: 'project.html', fallbackCount: 1 }
  ];

  function currentPageName() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path.split('#')[0].split('?')[0];
  }

  function countInDocument(doc, slug) {
    return doc.querySelectorAll('[data-blog-post][data-blog-section="' + slug + '"]').length;
  }

  function sectionBySlug(slug) {
    return BLOG_SECTIONS.filter(function(section) { return section.slug === slug; })[0] || null;
  }

  function fetchCount(section) {
    if (currentPageName() === section.source) {
      return Promise.resolve(countInDocument(document, section.slug) || section.fallbackCount);
    }
    if (!window.fetch || typeof DOMParser === 'undefined' || window.location.protocol === 'file:') {
      return Promise.resolve(section.fallbackCount);
    }
    return fetch(section.source, { cache: 'no-cache' })
      .then(function(response) { return response.ok ? response.text() : ''; })
      .then(function(html) {
        if (!html) return section.fallbackCount;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return countInDocument(doc, section.slug) || section.fallbackCount;
      })
      .catch(function() { return section.fallbackCount; });
  }

  function ensureStyles() {
    if (document.getElementById('blog-section-counts-style')) return;
    var style = document.createElement('style');
    style.id = 'blog-section-counts-style';
    style.textContent =
      '.blog-section-list{list-style:none;padding:0;margin:0;}' +
      '.blog-section-list li{margin:0;border-bottom:1px solid #eef0ff;}' +
      '.blog-section-list li:last-child{border-bottom:0;}' +
      '.blog-section-list a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 0;color:#444;text-decoration:none;font-size:.85rem;transition:color .2s;}' +
      '.blog-section-list a:hover{color:#7eb8e0;}' +
      '.blog-section-list .blog-section-count{min-width:28px;text-align:center;background:#0f3460;color:#fff;border-radius:999px;padding:2px 8px;font-size:.72rem;font-weight:800;}';
    document.head.appendChild(style);
  }

  function render(counts) {
    ensureStyles();
    Object.keys(counts).forEach(function(slug) {
      document.querySelectorAll('[data-blog-section-count="' + slug + '"]').forEach(function(node) {
        node.textContent = counts[slug];
      });
    });
    document.querySelectorAll('[data-blog-sections]').forEach(function(container) {
      container.innerHTML = '<ul class="blog-section-list">' + BLOG_SECTIONS.map(function(section) {
        var count = counts[section.slug] == null ? section.fallbackCount : counts[section.slug];
        return '<li><a href="' + section.href + '">' +
          '<span>' + section.label + '</span>' +
          '<span class="blog-section-count">' + count + '</span>' +
        '</a></li>';
      }).join('') + '</ul>';
    });
  }

  function updateBlogSections() {
    var counts = {};
    BLOG_SECTIONS.forEach(function(section) {
      counts[section.slug] = section.fallbackCount;
    });
    render(counts);
    Promise.all(BLOG_SECTIONS.map(function(section) {
      return fetchCount(section).then(function(count) {
        counts[section.slug] = count;
      });
    })).then(function() {
      render(counts);
    });
  }

  window.BlogSectionCounts = {
    sections: BLOG_SECTIONS.slice(),
    countInDocument: countInDocument,
    sectionBySlug: sectionBySlug,
    update: updateBlogSections
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBlogSections);
  } else {
    updateBlogSections();
  }
})();
