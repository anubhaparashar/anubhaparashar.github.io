(function(global) {
  'use strict';

  var HOME_MOMENTS_MARQUEE_IDS = [
    "post-phd-convocation", "post-phd-defence", "post-conf-outing", "post-muj-ssic", "post-c-dubai",
    "post-c-coratia", "post-fv-zagreb", "post-fv-rijeka", "post-c-icct19", "post-c-icicv",
    "post-c-icct23", "post-et-01", "post-et-machine-intelligence-2019", "post-ws-ai", "post-ev-mou",
    "post-ev-vikram", "post-ev-alumni", "post-hk-head", "post-hk-neemrana", "post-ws-icicv",
    "post-c-icct21", "post-c-ssic2", "post-c-sin17", "post-fv-physics", "post-fv-itday",
    "post-fv-mujstall", "post-ev-bigbasket", "post-hk-school", "post-ws-deeplearn", "post-ws-iotspeaker",
    "post-c-mun", "post-c-spec-organised", "post-c-icct19-organised", "post-c-icicv20-organised", "post-et-03",
    "post-et-04", "post-sports-cricket", "post-sports-sack", "post-girja-devi-trekking", "post-painting-drawing"
  ];

  var BLOG_MARQUEE_SETS = {
    overview: { heading: "Featured Moments from the Blog", subtitle: "Click any photo to open the related post.", ids: ["post-phd-convocation", "post-phd-defence", "post-conf-outing", "post-muj-ssic", "post-c-dubai", "post-c-coratia", "post-fv-zagreb", "post-fv-rijeka", "post-c-icct19", "post-c-icicv", "post-c-icct23", "post-et-01", "post-et-machine-intelligence-2019", "post-ws-ai", "post-ev-mou", "post-ev-vikram", "post-ev-alumni", "post-hk-head", "post-hk-neemrana", "post-ws-icicv", "post-c-icct21", "post-c-ssic2", "post-c-sin17", "post-fv-physics", "post-fv-itday", "post-fv-mujstall", "post-ev-bigbasket", "post-hk-school", "post-ws-deeplearn", "post-ws-iotspeaker", "post-c-mun", "post-c-spec-organised", "post-c-icct19-organised", "post-c-icicv20-organised", "post-et-03", "post-et-04", "post-sports-cricket", "post-sports-sack", "post-girja-devi-trekking", "post-painting-drawing", "post-lead-vc", "post-lead-sp", "post-c-icct17", "post-c-ssic1", "post-c-bvicam", "post-c-jaipur", "post-c-udaipur", "post-ws-gian", "post-ws-iot", "post-ws-iitdel", "post-soc-greenclub", "post-soc-chair", "post-soc-blood18", "post-soc-blood19", "post-soc-blood17", "post-soc-dhemi", "post-soc-beti", "post-soc-village", "post-soc-clean", "post-soc-projector", "post-mom-birthday", "post-memories"] },
    academics: { heading: "Academic Moments & Milestones", subtitle: "Click any photo to open the related academic post.", ids: ["post-lead-warden", "post-lead-vc", "post-lead-sp", "post-c-icct17", "post-c-ssic2", "post-c-icct19", "post-c-dubai", "post-c-icct23", "post-c-bvicam", "post-c-coratia", "post-c-icct21", "post-c-udaipur", "post-c-jaipur", "post-c-ssic1", "post-c-sin17", "post-c-icicv", "post-et-01", "post-et-02", "post-et-machine-intelligence-2019", "post-fv-zagreb", "post-fv-rijeka", "post-fv-physics", "post-fv-itday", "post-fv-robotics", "post-fv-mujstall", "post-ev-mou", "post-ev-vikram", "post-ev-selfdefence", "post-ev-yoga", "post-ev-alumni", "post-ev-aditya-alumni", "post-ev-bigbasket", "post-hk-school", "post-hk-head", "post-hk-neemrana", "post-soc-greenclub", "post-soc-chair", "post-soc-blood18", "post-soc-blood19", "post-soc-blood17", "post-soc-dhemi", "post-soc-beti", "post-soc-village", "post-soc-clean", "post-soc-projector", "post-ws-icicv", "post-ws-gian", "post-ws-fdp", "post-ws-iot", "post-ws-iitdel", "post-ws-expttalk"] },
    leadership: { heading: "Leadership Moments", subtitle: "Click any photo to open the related leadership post.", ids: ["post-lead-warden", "post-lead-vc", "post-lead-sp"] },
    conferences: { heading: "Conference Moments", subtitle: "Click any photo to open the related conference post.", ids: ["post-c-icct17", "post-c-ssic2", "post-c-icct19", "post-c-dubai", "post-c-icct23", "post-c-bvicam", "post-c-coratia", "post-c-icct21", "post-c-udaipur", "post-c-jaipur", "post-c-ssic1", "post-c-sin17", "post-c-icicv", "post-c-mun", "post-c-spec-organised", "post-c-icct19-organised", "post-c-icicv20-organised", "post-c-sin-organised", "post-c-ssic1-organised", "post-c-ssic2-organised"] },
    workshops: { heading: "Workshop & Training Moments", subtitle: "Click any photo to open the related workshop post.", ids: ["post-ws-icicv", "post-ws-gian", "post-ws-fdp", "post-ws-iot", "post-ws-iitdel", "post-ws-expttalk", "post-ws-imgproc", "post-ws-novelence", "post-ws-oracle", "post-ws-telemetry", "post-ws-deeplearn", "post-ws-iotspeaker", "post-ws-ai", "post-ws-gian-mnit", "post-w-gian-2018"] },
    talks: { heading: "Talks & Speaker Moments", subtitle: "Click any photo to open the related talk or speaker post.", ids: ["post-et-global-ai-jaipur-2025", "post-et-iot-ai-workshop-2023", "post-et-01", "post-et-02", "post-et-machine-intelligence-2019", "post-ws-iotspeaker", "post-et-03", "post-et-04", "post-et-05", "post-et-08", "post-et-09"] },
    facultyVisits: { heading: "Faculty Visit Moments", subtitle: "Click any photo to open the related faculty visit post.", ids: ["post-fv-zagreb", "post-fv-rijeka", "post-fv-physics", "post-fv-itday", "post-fv-robotics", "post-fv-mujstall"] },
    events: { heading: "Event Moments", subtitle: "Click any photo to open the related event post.", ids: ["post-ev-mou", "post-ev-vikram", "post-ev-selfdefence", "post-ev-yoga", "post-ev-alumni", "post-ev-aditya-alumni", "post-ev-bigbasket"] },
    hackathon: { heading: "Hackathon Moments", subtitle: "Click any photo to open the related hackathon post.", ids: ["post-hk-school", "post-hk-head", "post-hk-neemrana"] },
    socialActivities: { heading: "Social Impact Moments", subtitle: "Click any photo to open the related social activity post.", ids: ["post-soc-greenclub", "post-soc-chair", "post-soc-blood18", "post-soc-blood19", "post-soc-blood17", "post-soc-dhemi", "post-soc-beti", "post-soc-village", "post-soc-clean", "post-soc-projector", "post-soc-blood16", "post-soc-donation", "post-soc-donation-copy"] },
    socialLife: { heading: "Social Life in Frames", subtitle: "Click any photo to open the related social life post.", ids: ["post-mom-birthday", "post-conf-outing", "post-muj-ssic", "post-memories", "post-phd-defence", "post-phd-convocation"] },
    socialLifeOverview: { heading: "Social Life in Frames", subtitle: "Click any photo to open the related social life post.", ids: ["post-mom-birthday", "post-conf-outing", "post-muj-ssic", "post-memories", "post-phd-defence", "post-phd-convocation"] },
    socialLifeFamily: { heading: "Family Moments", subtitle: "Click any photo to open the related family post.", ids: ["post-mom-birthday"] },
    socialLifeConferenceOutings: { heading: "Conference Outing Moments", subtitle: "Click any photo to open the related outing post.", ids: ["post-conf-outing", "post-muj-ssic"] },
    socialLifeMemories: { heading: "Memories & Milestones", subtitle: "Click any photo to open the related memory post.", ids: ["post-memories", "post-phd-defence", "post-phd-convocation"] },
    socialLifePhD: { heading: "PhD Journey Moments", subtitle: "Click any photo to open the related PhD milestone post.", ids: ["post-phd-defence", "post-phd-convocation"] },
    sports: { heading: "Sports & Wellness Moments", subtitle: "Click any photo to open the related sports post.", ids: ["post-sports-sack", "post-sports-cricket"] },
    avocations: { heading: "Avocations & Creative Moments", subtitle: "Click any photo to open the related avocation post.", ids: ["post-girja-devi-trekking", "post-painting-drawing"] },
    avocationsOverview: { heading: "Avocations & Creative Moments", subtitle: "Click any photo to open the related avocation post.", ids: ["post-girja-devi-trekking", "post-painting-drawing"] },
    avocationsTrekking: { heading: "Trekking & Travel Moments", subtitle: "Click any photo to open the related trekking post.", ids: ["post-girja-devi-trekking"] },
    avocationsPainting: { heading: "Painting & Drawing Moments", subtitle: "Click any photo to open the related creative post.", ids: ["post-painting-drawing"] }
  };

  var renderedReports = {};

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function postMap() {
    var map = Object.create(null);
    (global.SITE_POSTS || []).forEach(function(post) {
      if (post && post.id) map[post.id] = post;
    });
    return map;
  }

  function usableText(value) {
    return String(value || '').trim();
  }

  function getPostsByExactIds(ids, reportKey) {
    var map = postMap();
    var skipped = [];
    var posts = [];
    (ids || []).forEach(function(id) {
      var post = map[id];
      if (!post) {
        skipped.push({ id: id, reason: 'missing SITE_POSTS entry' });
        return;
      }
      if (!usableText(post.img)) {
        skipped.push({ id: id, reason: 'missing img' });
        return;
      }
      if (!usableText(post.link) || usableText(post.link) === '#') {
        skipped.push({ id: id, reason: 'missing link' });
        return;
      }
      posts.push(post);
    });
    if (reportKey) renderedReports[reportKey] = { valid: posts.length, skipped: skipped };
    if (skipped.length && global.console) console.warn('Premium photo marquee skipped IDs:', reportKey || '', skipped);
    return posts;
  }

  function cardHtml(post, duplicateIndex) {
    var badge = usableText(post.badge || post.subCategory || post.category || post.cat);
    var alt = usableText(post.excerpt || post.title);
    return '' +
      '<a class="premium-marquee-card" href="' + escapeHtml(post.link) + '" data-post-id="' + escapeHtml(post.id) + '" aria-label="Open ' + escapeHtml(post.title) + '">' +
        '<img src="' + escapeHtml(post.img) + '" alt="' + escapeHtml(alt) + '" loading="lazy" decoding="async">' +
        '<span class="premium-marquee-shine" aria-hidden="true"></span>' +
        (badge ? '<span class="premium-marquee-badge">' + escapeHtml(badge) + '</span>' : '') +
        '<span class="premium-marquee-title">' + escapeHtml(post.title) + '</span>' +
      '</a>';
  }

  function renderPremiumPhotoMarquee(container, posts, options) {
    if (!container || !posts || !posts.length) {
      if (container) container.innerHTML = '';
      return;
    }
    var opts = options || {};
    var cards = posts.map(cardHtml).join('');
    container.className = 'premium-photo-marquee premium-photo-marquee--' + (opts.sizeVariant || 'blog');
    container.innerHTML = '' +
      '<div class="premium-marquee-inner">' +
        '<div class="premium-marquee-heading">' +
          '<span class="premium-marquee-line" aria-hidden="true"></span>' +
          '<h2>' + escapeHtml(opts.heading || 'Featured Moments') + '</h2>' +
          (opts.subtitle ? '<p>' + escapeHtml(opts.subtitle) + '</p>' : '') +
        '</div>' +
        '<div class="premium-marquee-viewport" tabindex="0">' +
          '<div class="premium-marquee-track">' + cards + cards + '</div>' +
        '</div>' +
      '</div>';
  }

  function ensureContainer(id, afterNode, beforeNode) {
    var existing = document.getElementById(id);
    if (existing) return existing;
    var section = document.createElement('section');
    section.id = id;
    section.setAttribute('aria-label', 'Featured photo marquee');
    if (beforeNode && beforeNode.parentNode) {
      beforeNode.parentNode.insertBefore(section, beforeNode);
    } else if (afterNode && afterNode.parentNode) {
      afterNode.parentNode.insertBefore(section, afterNode.nextSibling);
    } else {
      document.body.insertBefore(section, document.getElementById('site-footer') || null);
    }
    return section;
  }

  function renderSet(container, key, sizeVariant) {
    var set = BLOG_MARQUEE_SETS[key] || BLOG_MARQUEE_SETS.overview;
    var posts = getPostsByExactIds(set.ids, key);
    renderPremiumPhotoMarquee(container, posts, {
      heading: set.heading,
      subtitle: set.subtitle,
      sizeVariant: sizeVariant || 'blog'
    });
  }

  function initHome() {
    var map = document.getElementById('global-footprints');
    if (!map) return;
    var recommendations = document.querySelector('.testimonial_area');
    var container = ensureContainer('home-moments-marquee', map, recommendations);
    var posts = getPostsByExactIds(HOME_MOMENTS_MARQUEE_IDS, 'homepage');
    renderPremiumPhotoMarquee(container, posts, {
      heading: 'Moments & Milestones',
      subtitle: 'A visual journey through talks, travels, collaborations, and meaningful milestones.',
      sizeVariant: 'homepage'
    });
  }

  function blogSetFromState() {
    var state = global.archiveState || {};
    var tag = String(state.tag || '').toLowerCase();
    var cat = String(state.cat || 'all').toLowerCase();
    var hash = String(location.hash || '').toLowerCase();
    var text = tag || hash;
    if (/leadership/.test(text)) return 'leadership';
    if (/conference/.test(text)) return 'conferences';
    if (/workshop|training|fdp|gian/.test(text)) return 'workshops';
    if (/talk|speaker|expert/.test(text)) return 'talks';
    if (/faculty|visit/.test(text)) return 'facultyVisits';
    if (/event/.test(text)) return 'events';
    if (/hackathon/.test(text)) return 'hackathon';
    if (/social activ|outreach|blood|green|village|donation/.test(text)) return 'socialActivities';
    if (/family/.test(text)) return 'socialLifeFamily';
    if (/outing/.test(text)) return 'socialLifeConferenceOutings';
    if (/memor|phd/.test(text)) return 'socialLifeMemories';
    if (/trek/.test(text)) return 'avocationsTrekking';
    if (/paint|drawing/.test(text)) return 'avocationsPainting';
    if (cat === 'academics') return 'academics';
    if (cat === 'social') return 'socialLifeOverview';
    if (cat === 'sports') return 'sports';
    if (cat === 'avocations') return 'avocationsOverview';
    return 'overview';
  }

  function updateBlogMarquee() {
    var grid = document.getElementById('posts-grid');
    if (!grid) return;
    var section = grid.closest('section') || grid.parentNode;
    var container = ensureContainer('blog-archive-photo-marquee', section, document.getElementById('site-footer'));
    renderSet(container, blogSetFromState(), 'blog');
  }

  function initBlog() {
    if (!document.getElementById('posts-grid')) return;
    updateBlogMarquee();
    ['filterPosts', 'filterByTag', 'renderArchive'].forEach(function(name) {
      var original = global[name];
      if (typeof original !== 'function' || original.__premiumMarqueeWrapped) return;
      global[name] = function() {
        var result = original.apply(this, arguments);
        setTimeout(updateBlogMarquee, 0);
        return result;
      };
      global[name].__premiumMarqueeWrapped = true;
    });
    window.addEventListener('hashchange', updateBlogMarquee);
  }

  function appendSectionMarquee(sectionId, setKey) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var container = section.querySelector(':scope > .premium-photo-marquee');
    if (!container) {
      container = document.createElement('section');
      container.className = 'premium-photo-marquee';
      container.setAttribute('aria-label', 'Featured photo marquee');
      section.appendChild(container);
    }
    renderSet(container, setKey, 'blog');
  }

  function socialMemoriesSet() {
    var hash = String(location.hash || '').toLowerCase();
    return /phd|defence|convocation/.test(hash) ? 'socialLifePhD' : 'socialLifeMemories';
  }

  function initAcademics() {
    if (!document.querySelector('.acad-section')) return;
    appendSectionMarquee('acad-leadership', 'leadership');
    appendSectionMarquee('acad-conferences', 'conferences');
    appendSectionMarquee('acad-workshops', 'workshops');
    appendSectionMarquee('acad-talks', 'talks');
    appendSectionMarquee('acad-facultyvisits', 'facultyVisits');
    appendSectionMarquee('acad-events', 'events');
    appendSectionMarquee('acad-hackathon', 'hackathon');
    appendSectionMarquee('acad-social', 'socialActivities');
  }

  function initSocialLife() {
    if (!document.querySelector('.connection-section')) return;
    appendSectionMarquee('connection-section-conference-outings', 'socialLifeConferenceOutings');
    appendSectionMarquee('connection-section-my-travel-map', 'socialLifeOverview');
    appendSectionMarquee('connection-section-memories', socialMemoriesSet());
    appendSectionMarquee('connection-section-family', 'socialLifeFamily');
    window.addEventListener('hashchange', function() {
      appendSectionMarquee('connection-section-memories', socialMemoriesSet());
    });
    window.addEventListener('socialtabchange', function(event) {
      if (event && event.detail && event.detail.id === 'memories') appendSectionMarquee('connection-section-memories', socialMemoriesSet());
    });
  }

  function initAvocations() {
    if (!document.querySelector('.hobby-section')) return;
    appendSectionMarquee('tab-trekking', 'avocationsTrekking');
    appendSectionMarquee('tab-painting', 'avocationsPainting');
  }

  function initSports() {
    var sportsPosts = document.querySelector('[data-blog-section="sports-wellness"], .sports-post-card, .sports-post-media');
    if (!sportsPosts) return;
    var footer = document.getElementById('site-footer');
    var container = ensureContainer('sports-photo-marquee', null, footer);
    renderSet(container, 'sports', 'blog');
  }

  function init() {
    initHome();
    initBlog();
    initAcademics();
    initSocialLife();
    initAvocations();
    initSports();
  }

  global.HOME_MOMENTS_MARQUEE_IDS = HOME_MOMENTS_MARQUEE_IDS;
  global.BLOG_MARQUEE_SETS = BLOG_MARQUEE_SETS;
  global.PremiumPhotoMarquee = {
    getPostsByExactIds: getPostsByExactIds,
    renderPremiumPhotoMarquee: renderPremiumPhotoMarquee,
    renderSet: renderSet,
    updateBlogMarquee: updateBlogMarquee,
    reports: renderedReports
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
