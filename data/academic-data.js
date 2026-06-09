/*
 * When adding a new academic/blog/gallery item, add it only to the central data source.
 * Counts in Quick Stats, Blog Sidebar, Filters, and Archive totals are generated automatically.
 */
(function(global) {
  var SUBCATEGORY_LABELS = {
    conferences: 'Conferences',
    workshops: 'Workshops',
    experttalks: 'Expert Talks',
    facultyvisits: 'Faculty Visits',
    events: 'Events',
    hackathon: 'Hackathon',
    social: 'Social Activities',
    archive: 'Academic Archive'
  };

  var VISIBLE_SUBCATEGORIES = [
    'conferences',
    'workshops',
    'experttalks',
    'facultyvisits',
    'events',
    'hackathon',
    'social'
  ];
  var BLOG_CATEGORY_COUNTS = {
    social: 6,
    sports: 2,
    avocations: 11
  };

  function item(subCategory, slug, title, date, photoCount, tags) {
    return {
      title: title,
      date: date || '',
      mainCategory: 'Academics',
      subCategory: SUBCATEGORY_LABELS[subCategory] || subCategory,
      subCategoryKey: subCategory,
      slug: slug,
      hash: slug,
      photoCount: photoCount || 0,
      images: [],
      description: title,
      tags: tags || ['academics']
    };
  }

  var academicItems = [
    item('conferences','c-icct17-organised','ICCT 2017 Organising Committee','2017',0,['academics','conference']),
    item('conferences','c-icct21-organised','ICCT 2021 Organising Committee','2021',0,['academics','conference']),
    item('conferences','c-spec-organised','SPEC 2021 Organising Committee','2021',0,['academics','conference']),
    item('conferences','c-icct19-organised','ICCT 2019 Organising Committee','2019',0,['academics','conference']),
    item('conferences','c-icicv20-organised','ICICV 2020 Organising Committee','2020',0,['academics','conference']),
    item('conferences','c-sin-organised','SIN 2017 Organising Committee','2017',0,['academics','conference']),
    item('conferences','c-ssic1-organised','SSIC 2017 Organising Committee','2017',0,['academics','conference']),
    item('conferences','c-ssic2-organised','SSIC 2019 Organising Committee','2019',0,['academics','conference']),
    item('conferences','c-udaipur','Udaipur Conference','2016',0,['academics','conference']),
    item('conferences','c-jaipur','Jaipur Conference','2016',0,['academics','conference']),
    item('conferences','c-ssic1','SSIC 2017','2017',0,['academics','conference']),
    item('conferences','c-sin17','SIN 2017','2017',0,['academics','conference']),
    item('conferences','c-mun','Model United Nations','2018',0,['academics','conference']),
    item('conferences','c-bvicam','First PPT at BVICAM','2017',0,['academics','conference']),
    item('conferences','c-croatia','Croatia Conference','2018',0,['academics','conference']),
    item('workshops','w-icicv','ICICV 2020 Workshop','2020',0,['academics','workshop']),
    item('workshops','w-gian','GIAN MNIT 2017','2017',0,['academics','workshop']),
    item('workshops','w-fdp12','One Week FDP - Computational Intelligence','2017',0,['academics','workshop']),
    item('workshops','w-iot','IoT Workshop','2017',0,['academics','workshop']),
    item('workshops','w-iitdel','IIT Delhi Workshop','2017',0,['academics','workshop']),
    item('workshops','w-expttalk','Workshop and Expert Talk','2018',0,['academics','workshop']),
    item('workshops','w-imgproc','Image Processing Workshop','2018',0,['academics','workshop']),
    item('workshops','w-novelence','Novelence - MUJ Hacks 2','2018',0,['academics','workshop']),
    item('workshops','w-oracle','Oracle Workshop','2018',0,['academics','workshop']),
    item('workshops','w-telemetry','Telemetry Workshop','2019',0,['academics','workshop']),
    item('workshops','w-deeplearn','MUJ Deep Learning FDP','2019',0,['academics','workshop']),
    item('workshops','w-ai','Workshop on AI','2019',0,['academics','workshop']),
    item('workshops','w-gian-mnit','GIAN Course - MNIT Jaipur','2016',0,['academics','workshop']),
    item('workshops','w-gian-2018','GIAN 2018','2018',0,['academics','workshop']),
    item('experttalks','et-01','Expert Talk on AI','',0,['academics','expert talk']),
    item('experttalks','et-03','Expert Talk and FDP','2019-2020',9,['academics','expert talk','fdp']),
    item('facultyvisits','fv-zagreb','Faculty Visit - Zagreb','2018',0,['academics','faculty visit']),
    item('facultyvisits','fv-rijeka','Faculty Visit - Rijeka','2018',0,['academics','faculty visit']),
    item('facultyvisits','fv-physics','Physics Day Visit','2022',0,['academics','faculty visit']),
    item('facultyvisits','fv-itday','Rajasthan Dijifest','2018',0,['academics','faculty visit']),
    item('facultyvisits','fv-robotics','Robotics Fair','2017',0,['academics','faculty visit']),
    item('facultyvisits','fv-mujstall','IT Day and MUJ Stall','2018',0,['academics','faculty visit']),
    item('events','ev-mou','MOU Signing Ceremony','',0,['academics','event']),
    item('events','ev-vikram','Vikram Award Ceremony','',0,['academics','event']),
    item('events','ev-selfdefence','Self Defence Workshop','',0,['academics','event']),
    item('events','ev-yoga','Yoga Day','',0,['academics','event']),
    item('events','ev-alumni','Alumni Talk','',0,['academics','event']),
    item('events','ev-bigbasket','Expert Talk - Big Basket CEO','',0,['academics','event']),
    item('hackathon','hk-school','School Hackathon','',0,['academics','hackathon']),
    item('hackathon','hk-head','Hackathon Head','',0,['academics','hackathon']),
    item('hackathon','hk-neemrana','Hackathon Winners - Neemrana','',0,['academics','hackathon']),
    item('social','soc-greenclub','Green Club Hangout','2018',0,['academics','social activity']),
    item('social','soc-chair','Chair and Table Distribution','2018',0,['academics','social activity']),
    item('social','soc-blood18','Blood Donation Camp 2018','2018',0,['academics','social activity']),
    item('social','soc-blood19','Blood Donation Camp 2019','2019',0,['academics','social activity']),
    item('social','soc-blood17','Blood Donation Camp 2017','2017',0,['academics','social activity']),
    item('social','soc-dhemi','Dhemi School Visit','2017',0,['academics','social activity']),
    item('social','soc-beti','Beti Bachao Beti Padhao','2018',0,['academics','social activity']),
    item('social','soc-village','Village Visit','2018',0,['academics','social activity']),
    item('social','soc-clean','Cleanliness Drive','2018',0,['academics','social activity']),
    item('social','soc-projector','Projector Distribution','2017',0,['academics','social activity']),
    item('archive','lead-warden','Warden','2016-2024',0,['academics','leadership']),
    item('archive','lead-vc','Vice Captain, School','2007',14,['academics','leadership']),
    item('archive','lead-sp','Senior Prefect','2005-2006',0,['academics','leadership']),
    item('archive','c-ssic2','SSIC 2019','2019',0,['academics','conference']),
    item('archive','c-icct19','ICCT 2019','2019',0,['academics','conference']),
    item('archive','c-icicv','ICICV 2020','2020',0,['academics','conference']),
    item('archive','c-dubai','Dubai Conference','2020',0,['academics','conference']),
    item('archive','c-icct23','ICCT 2023','2023',0,['academics','conference']),
    item('archive','et-02','Expert Talk on IoT','2019-2020',3,['academics','expert talk']),
    item('archive','et-04','Expert Talk','2020',0,['academics','expert talk']),
    item('archive','et-05','Expert Talk','',0,['academics','expert talk']),
    item('archive','et-06','Machine Intelligence Talk','2019',0,['academics','expert talk']),
    item('archive','et-07','IoT Speaker','2021',0,['academics','expert talk']),
    item('archive','et-08','Expert Talk on AI','',0,['academics','expert talk']),
    item('archive','et-09','Java as a Language','2006',0,['academics','expert talk']),
    item('archive','soc-blood16','Blood Donation Camp 2016','2016',2,['academics','social activity']),
    item('archive','soc-donation','Donation Drive','Class III',1,['academics','social activity']),
    item('archive','soc-donation-copy','Donation Drive Memories','2026',1,['academics','social activity']),
    item('archive','academic-research-profile','Academic Research Profile','',0,['academics']),
    item('archive','student-mentoring','Student Mentoring','',0,['academics']),
    item('archive','publication-journey','Publication Journey','',0,['academics']),
    item('archive','academic-service','Academic Service','',0,['academics']),
    item('archive','technical-training','Technical Training','',0,['academics']),
    item('archive','academic-community','Academic Community','',0,['academics'])
  ];

  function getItems() {
    return academicItems.slice();
  }

  function getTotalCount() {
    return academicItems.length;
  }

  function normalizeCategoryName(categoryName) {
    var name = String(categoryName || '').toLowerCase().replace(/\s+/g, '');
    if (name === 'expert talks') return 'experttalks';
    if (name === 'faculty visits') return 'facultyvisits';
    if (name === 'social activities') return 'social';
    return name;
  }

  function getCategoryCount(categoryName) {
    var category = String(categoryName || '').toLowerCase();
    if (category === 'all') return getBlogTotalCount();
    if (category === 'academics') return getTotalCount();
    if (Object.prototype.hasOwnProperty.call(BLOG_CATEGORY_COUNTS, category)) return BLOG_CATEGORY_COUNTS[category];
    return getSubCategoryCount(categoryName);
  }

  function getBlogCategoryCounts() {
    return {
      academics: getTotalCount(),
      social: BLOG_CATEGORY_COUNTS.social,
      sports: BLOG_CATEGORY_COUNTS.sports,
      avocations: BLOG_CATEGORY_COUNTS.avocations
    };
  }

  function getBlogTotalCount() {
    var counts = getBlogCategoryCounts();
    return counts.academics + counts.social + counts.sports + counts.avocations;
  }

  function getSubCategoryCount(subCategoryName) {
    var key = normalizeCategoryName(subCategoryName);
    return academicItems.filter(function(entry) {
      return entry.subCategoryKey === key || normalizeCategoryName(entry.subCategory) === key;
    }).length;
  }

  function setText(selector, value, root) {
    var node = (root || document).querySelector(selector);
    if (node) node.textContent = value;
  }

  function renderQuickStats(root) {
    root = root || document;
    var container = root.querySelector('#academicQuickStats');
    if (container) {
      var rows = [{ key: 'academics', label: 'Academics', count: getTotalCount() }];
      VISIBLE_SUBCATEGORIES.forEach(function(key) {
        rows.push({ key: key, label: SUBCATEGORY_LABELS[key], count: getSubCategoryCount(key) });
      });
      container.innerHTML = '<ul style="list-style:none;padding:0;margin:0;">' + rows.map(function(row, index) {
        var border = index === rows.length - 1 ? '' : 'border-bottom:1px solid #eef0ff;';
        return '<li style="display:flex;justify-content:space-between;padding:8px 0;' + border + 'font-size:.84rem;">' +
          '<span style="color:#555;">' + row.label + '</span>' +
          '<strong id="qs-' + row.key + '" style="color:#0f3460;">' + row.count + '</strong>' +
        '</li>';
      }).join('') + '</ul>';
    }
    setText('#qs-academics', getTotalCount(), root);
    VISIBLE_SUBCATEGORIES.forEach(function(key) {
      setText('#qs-' + key, getSubCategoryCount(key), root);
      setText('[data-academic-tab="' + key + '"] .acad-tab-count', getSubCategoryCount(key), root);
    });
  }

  function renderBlogCategoryCounts(root) {
    root = root || document;
    var counts = getBlogCategoryCounts();
    Object.keys(counts).forEach(function(key) {
      setText('#cat-count-' + key, counts[key], root);
    });
  }

  function renderFilterCounts(root) {
    root = root || document;
    var counts = getBlogCategoryCounts();
    Object.keys(counts).forEach(function(key) {
      setText('[data-filter="' + key + '"] .f-count', counts[key], root);
    });
    setText('[data-filter="all"] .f-count', getBlogTotalCount(), root);
  }

  global.AcademicData = {
    items: academicItems,
    visibleSubcategories: VISIBLE_SUBCATEGORIES.slice(),
    labels: SUBCATEGORY_LABELS,
    getItems: getItems,
    getTotalCount: getTotalCount,
    getCategoryCount: getCategoryCount,
    getSubCategoryCount: getSubCategoryCount,
    getBlogCategoryCounts: getBlogCategoryCounts,
    getBlogTotalCount: getBlogTotalCount,
    renderQuickStats: renderQuickStats,
    renderBlogCategoryCounts: renderBlogCategoryCounts,
    renderFilterCounts: renderFilterCounts
  };
})(window);
