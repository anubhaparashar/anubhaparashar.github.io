(function() {
  'use strict';

  const BLOG_SECTIONS = [
    { slug: 'academics', label: 'Academics', href: 'academics.html', source: 'academics.html', countSelector: '[data-blog-post][data-blog-section="academics"]', fallbackCount: 74 },
    { slug: 'sports-wellness', label: 'Sports & Wellness', href: 'sports.html', source: 'sports.html', countSelector: '[data-blog-post][data-blog-section="sports-wellness"]', fallbackCount: 30 },
    { slug: 'social-life', label: 'Social Life', href: 'social-life.html', source: 'social-life.html', countSelector: '[data-blog-post][data-blog-section="social-life"]', fallbackCount: 6 },
    { slug: 'avocations', label: 'Avocations', href: 'avocations.html', source: 'avocations.html', countSelector: '[data-blog-post][data-blog-section="avocations"]', fallbackCount: 14 },
    { slug: 'publications', label: 'Publications', href: 'publication.html', source: 'publication.html', countSelector: '[data-publication-item], [data-blog-post][data-blog-section="publications"]', fallbackLabel: '50+', fallbackCount: 50 },
    { slug: 'projects', label: 'Projects', href: 'project.html', source: 'project.html', countSelector: '[data-project-item], [data-blog-post][data-blog-section="projects"]', fallbackCount: 19 }
  ];

  const CARD_SELECTORS = {
    academics: '.academic-card, [data-academic-item], .post-card, .blog-card, article',
    'sports-wellness': '.sports-post-card, .sports-card, .sport-card, .post-card, .blog-card, article',
    'social-life': '.social-card, .conf-card, .post-card, .blog-card, article',
    avocations: '.avocation-card, .hobby-card, .conf-card, .post-card, .blog-card, article',
    publications: '.pub-card, [data-publication-item]',
    projects: '.proj-card, [data-project-item]'
  };

  const EXCLUDED_SELECTOR = [
    '[data-ignore-blog-count]',
    '.gallery-item', '.gal-item', '.media-item', '.media-card',
    '.drawing-cert-post-card', '.certificate-card', '.cert-card', '.photo-card', '.video-card',
    '.blog-section-card', '.sidebar-card', 'nav', 'aside', 'footer',
    'button', 'template', '[hidden]', '[aria-hidden="true"]'
  ].join(',');

  function currentPageName() {
    return (window.location.pathname.split('/').pop() || 'index.html').split(/[?#]/)[0];
  }

  function isCountableCard(card, source) {
    if (!card || card === source || card.matches(EXCLUDED_SELECTOR)) return false;
    if (card.closest('nav, aside, footer, template, [data-ignore-blog-count]')) return false;
    if (card.hidden || card.getAttribute('aria-hidden') === 'true') return false;
    return true;
  }

  function markLikelyPosts(doc, slug) {
    const source = doc.querySelector('[data-blog-source="' + slug + '"]');
    if (!source) return [];
    const selector = CARD_SELECTORS[slug];
    if (!selector) return [];
    const cards = Array.from(source.querySelectorAll(selector)).filter(function(card) {
      return isCountableCard(card, source);
    });
    cards.forEach(function(card) {
      if (!card.hasAttribute('data-blog-post')) card.setAttribute('data-blog-post', '');
      if (!card.hasAttribute('data-blog-section')) card.setAttribute('data-blog-section', slug);
    });
    return cards;
  }

  function fallbackValue(section) {
    return section.fallbackLabel || section.fallbackCount;
  }

  function countInDocument(doc, slug) {
    const section = sectionBySlug(slug);
    if (!section) return 0;
    return Array.from(doc.querySelectorAll(section.countSelector)).filter(function(item) {
      return !item.matches('[data-ignore-blog-count]') && !item.closest('template, [data-ignore-blog-count]');
    }).length;
  }

  function countFromSummaryStat(doc, section) {
    let stat = null;
    if (section.slug === 'publications') {
      stat = doc.querySelector('[data-site-stat="publicationTypes.total"]');
    } else if (section.slug === 'projects') {
      stat = Array.from(doc.querySelectorAll('.proj-stat-num')).find(function(node) {
        return /projects/i.test(node.parentElement ? node.parentElement.textContent : '');
      }) || null;
    }
    if (!stat) return null;
    const label = stat.textContent.trim();
    if (/^\d+\+$/.test(label)) return label;
    const number = parseInt(label.replace(/[^\d]/g, ''), 10);
    return Number.isNaN(number) ? null : number;
  }

  function countParsedSource(doc, slug) {
    const section = sectionBySlug(slug);
    if (!section) return 0;
    markLikelyPosts(doc, slug);
    const count = countInDocument(doc, slug);
    return count || countFromSummaryStat(doc, section) || 0;
  }

  function sectionBySlug(slug) {
    return BLOG_SECTIONS.find(function(section) { return section.slug === slug; }) || null;
  }

  function fetchCount(section) {
    if (currentPageName() === section.source) {
      markLikelyPosts(document, section.slug);
      const count = countInDocument(document, section.slug);
      return Promise.resolve(count || countFromSummaryStat(document, section) || 0);
    }
    if (!window.fetch || typeof DOMParser === 'undefined' || window.location.protocol === 'file:') {
      return Promise.resolve(fallbackValue(section));
    }
    return fetch(section.source, { cache: 'no-cache' })
      .then(function(response) {
        if (!response.ok) throw new Error('Unable to load ' + section.source);
        return response.text();
      })
      .then(function(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return countParsedSource(doc, section.slug);
      })
      .catch(function() { return fallbackValue(section); });
  }

  function ensureStyles() {
    if (document.getElementById('blog-section-counts-style')) return;
    const style = document.createElement('style');
    style.id = 'blog-section-counts-style';
    style.textContent =
      '.blog-section-list{list-style:none;padding:0;margin:0;}' +
      '.blog-section-list li{margin:0;border-bottom:1px solid #eef0ff;}' +
      '.blog-section-list li:last-child{border-bottom:0;}' +
      '.blog-section-list a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 0;color:#444;text-decoration:none;font-size:.85rem;transition:color .2s;}' +
      '.blog-section-list a:hover{color:#7eb8e0;}' +
      '.blog-section-count{min-width:28px;text-align:center;background:#0f3460;color:#fff;border-radius:999px;padding:2px 8px;font-size:.72rem;font-weight:800;}';
    document.head.appendChild(style);
  }

  function renderBlogSections(counts) {
    document.querySelectorAll('[data-blog-sections]').forEach(function(container) {
      if (container.dataset.rendered === 'true') return;
      container.dataset.rendered = 'true';
      container.innerHTML = '<ul class="blog-section-list">' + BLOG_SECTIONS.map(function(section) {
        const count = counts[section.slug] == null ? fallbackValue(section) : counts[section.slug];
        return '<li><a href="' + section.href + '"><span>' + section.label + '</span>' +
          '<span class="blog-section-count" data-blog-count-for="' + section.slug + '">' + count + '</span></a></li>';
      }).join('') + '</ul>';
    });
  }

  function render(counts) {
    ensureStyles();
    BLOG_SECTIONS.forEach(function(section) {
      const count = counts[section.slug] == null ? fallbackValue(section) : counts[section.slug];
      document.querySelectorAll('[data-blog-count-for="' + section.slug + '"], [data-blog-section-count="' + section.slug + '"]').forEach(function(node) {
        node.textContent = count;
      });
    });
    renderBlogSections(counts);
  }

  function updateBlogSections() {
    const source = document.querySelector('[data-blog-source]');
    if (source) markLikelyPosts(document, source.getAttribute('data-blog-source'));
    const counts = {};
    BLOG_SECTIONS.forEach(function(section) { counts[section.slug] = fallbackValue(section); });
    render(counts);
    return Promise.all(BLOG_SECTIONS.map(function(section) {
      return fetchCount(section).then(function(count) { counts[section.slug] = count; });
    })).then(function() {
      render(counts);
      document.dispatchEvent(new CustomEvent('blogcountsupdated', { detail: counts }));
      return counts;
    });
  }

  window.BlogSectionCounts = {
    sections: BLOG_SECTIONS.slice(),
    countInDocument: countInDocument,
    markLikelyPosts: markLikelyPosts,
    sectionBySlug: sectionBySlug,
    update: updateBlogSections
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateBlogSections);
  else updateBlogSections();
})();
