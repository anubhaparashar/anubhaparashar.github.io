(function (global) {
  'use strict';

  if (global.PortfolioAtlasRegistry) return;

  var nodes = [
    {
      id: 'portfolio-root',
      label: 'Anubha Parashar',
      parent: null,
      type: 'root',
      description: 'Academic, research, engineering, and personal work.',
      importance: 'root'
    },
    {
      id: 'home',
      label: 'Home',
      url: 'index.html',
      parent: 'portfolio-root',
      type: 'page',
      description: 'Portfolio overview and current focus.',
      importance: 'primary',
      headerOrder: 0,
      aliases: ['', '/', 'index.html']
    },
    {
      id: 'professional',
      label: 'Professional',
      parent: 'portfolio-root',
      type: 'group',
      description: 'Experience, engineering projects, recognition, and industry work.',
      importance: 'primary',
      headerOrder: 1
    },
    {
      id: 'experience',
      label: 'Experience',
      url: 'experience.html',
      parent: 'professional',
      type: 'page',
      description: 'Industry, research, teaching, and engineering experience.',
      importance: 'primary'
    },
    {
      id: 'projects',
      label: 'Projects',
      url: 'project.html',
      parent: 'professional',
      type: 'page',
      description: 'Applied AI, computer vision, robotics, and IoT projects.',
      importance: 'primary',
      dynamicSource: 'projects'
    },
    {
      id: 'awards',
      label: 'Awards & Recognition',
      url: 'award.html',
      parent: 'professional',
      type: 'page',
      description: 'Professional and academic recognition.',
      importance: 'primary'
    },
    {
      id: 'industry',
      label: 'Industry Projects',
      url: 'industry.html',
      parent: 'professional',
      type: 'page',
      description: 'Restricted industry project portfolio.',
      importance: 'primary'
    },
    {
      id: 'research',
      label: 'Research',
      parent: 'portfolio-root',
      type: 'group',
      description: 'Scholarly outputs, patents, and funded research.',
      importance: 'primary',
      headerOrder: 2
    },
    {
      id: 'publications',
      label: 'Publications',
      url: 'publication.html',
      parent: 'research',
      type: 'page',
      description: 'Patents, papers, chapters, articles, presentations, and posters.',
      importance: 'primary',
      dynamicSource: 'publications'
    },
    {
      id: 'pub-patents',
      label: 'Patents',
      url: 'publication.html#patents',
      parent: 'publications',
      type: 'anchor',
      description: 'Granted and published patent work.',
      countSource: 'publicationTypes.patents'
    },
    {
      id: 'pub-journals',
      label: 'Journal Papers',
      url: 'publication.html#journals',
      parent: 'publications',
      type: 'anchor',
      description: 'Peer-reviewed journal publications.',
      countSource: 'publicationTypes.journals'
    },
    {
      id: 'pub-conferences',
      label: 'Conference Papers',
      url: 'publication.html#conferences',
      parent: 'publications',
      type: 'anchor',
      description: 'Peer-reviewed conference papers.',
      countSource: 'publicationTypes.conferences'
    },
    {
      id: 'pub-book-chapters',
      label: 'Book Chapters',
      url: 'publication.html#bookchapters',
      parent: 'publications',
      type: 'anchor',
      description: 'Chapters in edited scholarly volumes.',
      countSource: 'publicationTypes.bookchapters'
    },
    {
      id: 'pub-articles',
      label: 'Articles',
      url: 'publication.html#articles',
      parent: 'publications',
      type: 'anchor',
      description: 'Technical and editorial articles.',
      countSource: 'publicationTypes.articles'
    },
    {
      id: 'pub-presentations',
      label: 'Presentations',
      url: 'publication.html#presentations',
      parent: 'publications',
      type: 'anchor',
      description: 'Research presentations and invited material.',
      countSource: 'publicationTypes.presentations'
    },
    {
      id: 'pub-posters',
      label: 'Posters',
      url: 'publication.html#posters',
      parent: 'publications',
      type: 'anchor',
      description: 'Research poster work.',
      countSource: 'publicationTypes.posters'
    },
    {
      id: 'grants',
      label: 'Grants & Funded Projects',
      url: 'grant.html',
      parent: 'research',
      type: 'page',
      description: 'Funded laboratories, training centres, and research projects.',
      importance: 'primary'
    },
    {
      id: 'academic',
      label: 'Academic',
      parent: 'portfolio-root',
      type: 'group',
      description: 'Education, academic archive, speaking, and service.',
      importance: 'primary',
      headerOrder: 3
    },
    {
      id: 'education',
      label: 'Education & Learning',
      url: 'education.html',
      parent: 'academic',
      type: 'page',
      description: 'Degrees, certifications, training, courses, webinars, seminars, and quizzes.',
      importance: 'primary'
    },
    {
      id: 'edu-degrees',
      label: 'Degrees',
      url: 'education.html#education-degrees',
      parent: 'education',
      type: 'anchor',
      description: 'Formal academic degrees and supporting evidence.'
    },
    {
      id: 'edu-certifications',
      label: 'Certifications',
      url: 'education.html#education-certifications',
      parent: 'education',
      type: 'anchor',
      description: 'Professional credentials and certificates.'
    },
    {
      id: 'edu-training',
      label: 'Technical Training',
      url: 'education.html#education-training',
      parent: 'education',
      type: 'anchor',
      description: 'Technical and programming training.'
    },
    {
      id: 'edu-courses',
      label: 'Courses',
      url: 'education.html#education-courses',
      parent: 'education',
      type: 'anchor',
      description: 'Short-term courses and professional development.'
    },
    {
      id: 'edu-webinars',
      label: 'Webinars',
      url: 'education.html#education-webinars',
      parent: 'education',
      type: 'anchor',
      description: 'Webinars attended.'
    },
    {
      id: 'edu-seminars',
      label: 'Seminars',
      url: 'education.html#education-seminars',
      parent: 'education',
      type: 'anchor',
      description: 'Seminars attended.'
    },
    {
      id: 'edu-quizzes',
      label: 'Quizzes',
      url: 'education.html#education-quizzes',
      parent: 'education',
      type: 'anchor',
      description: 'Technical quizzes and participation evidence.'
    },
    {
      id: 'evidence-iot-oracle',
      label: 'IoT Solution with Oracle',
      url: 'files/2.%20Education/3.%20Short%20Term%20Courses%20Attended/14.%20IoT%20Solution%20with%20Oracle%20-%2014.02.2018.html',
      parent: 'edu-courses',
      type: 'evidence',
      description: 'Course certificate record.',
      importance: 'quiet'
    },
    {
      id: 'evidence-research-database',
      label: 'Awareness of Research Database',
      url: 'files/2.%20Education/3.%20Short%20Term%20Courses%20Attended/17.%20Awareness%20of%20Research%20Database%20-%2025.01.2019.html',
      parent: 'edu-courses',
      type: 'evidence',
      description: 'Course certificate record.',
      importance: 'quiet'
    },
    {
      id: 'evidence-telemedicine',
      label: 'Telemedicine Challenges',
      url: 'files/2.%20Education/3.%20Short%20Term%20Courses%20Attended/42.%20Telemedicine%20Challenges%20-%2026.03.2019.html',
      parent: 'edu-courses',
      type: 'evidence',
      description: 'Course certificate record.',
      importance: 'quiet'
    },
    {
      id: 'evidence-hadoop-quiz',
      label: 'Hadoop, DevOps & Docker Quiz',
      url: 'files/2.%20Education/6.%20Quizzes%20Participated/9.%20Hadoop%20DevOps%20Docker%20Container%20-%2004.05.2021.html',
      parent: 'edu-quizzes',
      type: 'evidence',
      description: 'Quiz certificate record.',
      importance: 'quiet'
    },
    {
      id: 'evidence-python-quiz',
      label: 'Problem Solving & Python Quiz',
      url: 'files/2.%20Education/6.%20Quizzes%20Participated/10.%20Problem%20Solving%20and%20Python%20Programming%20-%2007.05.2021.html',
      parent: 'edu-quizzes',
      type: 'evidence',
      description: 'Quiz certificate record.',
      importance: 'quiet'
    },
    {
      id: 'evidence-ai-ml-quiz',
      label: 'Artificial Intelligence & Machine Learning Quiz',
      url: 'files/2.%20Education/6.%20Quizzes%20Participated/11.%20Artificial%20Intelligence%20and%20Machine%20Learning%20-%2008.05.2021.html',
      parent: 'edu-quizzes',
      type: 'evidence',
      description: 'Quiz certificate record.',
      importance: 'quiet'
    },
    {
      id: 'academics',
      label: 'Academics',
      url: 'academics.html',
      parent: 'academic',
      type: 'page',
      description: 'Academic leadership, conferences, workshops, talks, visits, events, and outreach.',
      importance: 'primary',
      countSource: 'academicCounts.academics'
    },
    {
      id: 'acad-leadership', label: 'Leadership', url: 'academics.html#leadership', parent: 'academics', type: 'filter',
      description: 'Academic leadership roles.', countSource: 'academicCounts.leadership'
    },
    {
      id: 'acad-conferences', label: 'Conferences', url: 'academics.html#conferences', parent: 'academics', type: 'filter',
      description: 'Conference participation and organisation.', countSource: 'academicCounts.conferences'
    },
    {
      id: 'acad-workshops', label: 'Workshops', url: 'academics.html#workshops', parent: 'academics', type: 'filter',
      description: 'Workshops and faculty development.', countSource: 'academicCounts.workshops'
    },
    {
      id: 'acad-talks', label: 'Talks', url: 'academics.html#talks', parent: 'academics', type: 'filter',
      description: 'Expert talks and invited sessions.', countSource: 'academicCounts.talks'
    },
    {
      id: 'acad-faculty-visits', label: 'Faculty Visits', url: 'academics.html#faculty-visits', parent: 'academics', type: 'filter',
      description: 'Academic and research visits.', countSource: 'academicCounts.faculty-visits'
    },
    {
      id: 'acad-events', label: 'Events', url: 'academics.html#events', parent: 'academics', type: 'filter',
      description: 'Academic events and ceremonies.', countSource: 'academicCounts.events'
    },
    {
      id: 'acad-hackathons', label: 'Hackathons', url: 'academics.html#hackathon', parent: 'academics', type: 'filter',
      description: 'Hackathon leadership and mentoring.', countSource: 'academicCounts.hackathon'
    },
    {
      id: 'acad-social', label: 'Social Activities', url: 'academics.html#social-activities', parent: 'academics', type: 'filter',
      description: 'Community and social activities.', countSource: 'academicCounts.social-activities'
    },
    {
      id: 'events',
      label: 'Events & Leadership',
      url: 'event.html',
      parent: 'academic',
      type: 'page',
      description: 'Leadership, speaking, service, reviewing, and memberships.',
      importance: 'primary'
    },
    { id: 'evt-leadership', label: 'Leadership', url: 'event.html#leadership', parent: 'events', type: 'anchor', description: 'Leadership and responsibilities.' },
    { id: 'evt-talks', label: 'Talks Delivered', url: 'event.html#talks', parent: 'events', type: 'anchor', description: 'Talks and invited sessions.' },
    { id: 'evt-seminars', label: 'Seminars Organised', url: 'event.html#seminars', parent: 'events', type: 'anchor', description: 'Seminars organised.' },
    { id: 'evt-workshops', label: 'Workshops Organised', url: 'event.html#workshops', parent: 'events', type: 'anchor', description: 'Workshops organised.' },
    { id: 'evt-conferences', label: 'Conference Service', url: 'event.html#conferences', parent: 'events', type: 'anchor', description: 'Conference committees and service.' },
    { id: 'evt-reviewing', label: 'Journal Reviewing', url: 'event.html#reviewer', parent: 'events', type: 'anchor', description: 'Peer-review service.' },
    { id: 'evt-hackathons', label: 'Hackathon Leadership', url: 'event.html#hackathons', parent: 'events', type: 'anchor', description: 'Hackathon leadership and judging.' },
    { id: 'evt-memberships', label: 'Memberships', url: 'event.html#memberships', parent: 'events', type: 'anchor', description: 'Professional memberships.' },
    {
      id: 'evidence-acm-membership',
      label: 'ACM Membership Record',
      url: 'files/7.%20Leadership/7.%20Membership/2.%20ACM%20Membership.html',
      parent: 'evt-memberships',
      type: 'evidence',
      description: 'Professional membership evidence.',
      importance: 'quiet'
    },
    { id: 'evt-outreach', label: 'Community Outreach', url: 'event.html#other', parent: 'events', type: 'anchor', description: 'Community and social service.' },
    {
      id: 'conference-presentations',
      label: 'Conferences & Presentations',
      url: 'conferences.html',
      parent: 'academic',
      type: 'page',
      description: 'Conference journeys, presentations, and workshops.',
      importance: 'primary'
    },
    {
      id: 'stories-life',
      label: 'Stories & Life',
      parent: 'portfolio-root',
      type: 'group',
      description: 'Stories, relationships, travel, sport, and creative practice.',
      importance: 'secondary',
      headerOrder: 4
    },
    {
      id: 'blog',
      label: 'Blog',
      url: 'blog.html',
      parent: 'stories-life',
      type: 'page',
      description: 'A searchable archive of stories, milestones, and memories.',
      importance: 'secondary',
      dynamicSource: 'blog'
    },
    {
      id: 'blog-academics', label: 'Academic Stories', url: 'blog.html#filter-academics', parent: 'blog', type: 'filter',
      description: 'Academic leadership, conferences, workshops, talks, and events.', countSource: 'blogCounts.academics', dynamicSource: 'blog-academics'
    },
    {
      id: 'blog-social', label: 'Social Stories', url: 'blog.html#filter-social', parent: 'blog', type: 'filter',
      description: 'Community, memories, connections, and family.', countSource: 'blogCounts.social', dynamicSource: 'blog-social'
    },
    {
      id: 'blog-sports', label: 'Sports Stories', url: 'blog.html#filter-sports', parent: 'blog', type: 'filter',
      description: 'Sports, wellness, and competitive memories.', countSource: 'blogCounts.sports', dynamicSource: 'blog-sports'
    },
    {
      id: 'blog-avocations', label: 'Avocation Stories', url: 'blog.html#filter-avocations', parent: 'blog', type: 'filter',
      description: 'Trekking, visual art, origami, and magic.', countSource: 'blogCounts.avocations', dynamicSource: 'blog-avocations'
    },
    {
      id: 'social-life',
      label: 'Social Life',
      url: 'social-life.html',
      parent: 'stories-life',
      type: 'page',
      description: 'Community, travel, memories, and family.',
      importance: 'secondary',
      aliases: ['connection.html']
    },
    { id: 'social-outings', label: 'Conference Outings', url: 'social-life.html#conference-outings', parent: 'social-life', type: 'anchor', description: 'Community and networking beyond the conference room.' },
    { id: 'social-travel-map', label: 'My Travel Map', url: 'social-life.html#my-travel-map', parent: 'social-life', type: 'anchor', description: 'Interactive map of academic and personal journeys.' },
    { id: 'social-memories', label: 'Memories', url: 'social-life.html#memories', parent: 'social-life', type: 'anchor', description: 'Personal and academic memories.' },
    { id: 'social-family', label: 'Family', url: 'social-life.html#family', parent: 'social-life', type: 'anchor', description: 'Family stories and tributes.' },
    {
      id: 'sports',
      label: 'Sports',
      url: 'sports.html',
      parent: 'stories-life',
      type: 'page',
      description: 'Athletics, team sport, and wellness.',
      importance: 'secondary'
    },
    { id: 'sports-state', label: 'State', url: 'sports.html#sports-state', parent: 'sports', type: 'anchor', description: 'State-level sports records.' },
    { id: 'sports-regional', label: 'Regional & Inter University', url: 'sports.html#sports-regional-inter-university', parent: 'sports', type: 'anchor', description: 'Regional and inter-university sports.' },
    { id: 'sports-school', label: 'Office, College & School', url: 'sports.html#sports-office-college-school', parent: 'sports', type: 'anchor', description: 'Team and athletics memories across school, college, and work.' },
    {
      id: 'avocations',
      label: 'Avocations',
      url: 'avocations.html',
      parent: 'stories-life',
      type: 'page',
      description: 'Creative and outdoor pursuits.',
      importance: 'quiet'
    },
    { id: 'avoc-trekking', label: 'Trekking', url: 'avocations.html#trekking', parent: 'avocations', type: 'anchor', description: 'Trails and outdoor journeys.', importance: 'quiet' },
    { id: 'avoc-painting', label: 'Painting & Drawing', url: 'avocations.html#painting', parent: 'avocations', type: 'anchor', description: 'Painting, drawing, rangoli, and craft.', importance: 'quiet' },
    { id: 'avoc-origami', label: 'Origami', url: 'avocations.html#origami', parent: 'avocations', type: 'anchor', description: 'Precision and creativity through paper folding.', importance: 'quiet' },
    { id: 'avoc-magic', label: 'Magic', url: 'avocations.html#magic', parent: 'avocations', type: 'anchor', description: 'Close-up magic, precision, and storytelling.', importance: 'quiet' },
    {
      id: 'connect',
      label: 'Connect',
      parent: 'portfolio-root',
      type: 'group',
      description: 'Ways to work, speak, collaborate, and get in touch.',
      importance: 'secondary',
      headerOrder: 5
    },
    { id: 'work-with-me', label: 'Work With Me', url: 'index.html#work-with-me', parent: 'connect', type: 'anchor', description: 'AI/ML consulting, computer vision, mentoring, and partnerships.' },
    { id: 'speaking', label: 'Speaking', url: 'index.html#speaking', parent: 'connect', type: 'anchor', description: 'Invited talks, panels, workshops, and corporate training.' },
    { id: 'research-collaboration', label: 'Research Collaboration', url: 'index.html#research-collaboration', parent: 'connect', type: 'anchor', description: 'Collaborate on human-centred AI and applied research.' },
    { id: 'contact', label: 'Contact', url: 'index.html#contact', parent: 'connect', type: 'anchor', description: 'Send a direct message.' }
  ];

  var excludedRoutes = [
    { url: 'admin-comments.html', reason: 'Administrative utility, not portfolio content.' }
  ];

  var redirects = {
    'connection.html': 'social-life',
    'leadership-activities.html': 'events'
  };

  var byId = Object.create(null);
  nodes.forEach(function (node) { byId[node.id] = node; });

  function getNode(id) {
    return byId[id] || null;
  }

  function getChildren(parentId) {
    return nodes.filter(function (node) { return node.parent === parentId; });
  }

  function getPath(id) {
    var path = [];
    var current = getNode(id);
    var guard = 0;
    while (current && guard < nodes.length + 1) {
      path.unshift(current);
      current = current.parent ? getNode(current.parent) : null;
      guard += 1;
    }
    return path;
  }

  function normalizeRoute(value) {
    var route = String(value || '').replace(/\\/g, '/');
    try { route = decodeURIComponent(route); } catch (error) {}
    route = route.replace(/^https?:\/\/[^/]+/i, '').replace(/^\/+/, '');
    return route || 'index.html';
  }

  function routeParts(value) {
    var normalized = normalizeRoute(value);
    var hashIndex = normalized.indexOf('#');
    return {
      file: (hashIndex === -1 ? normalized : normalized.slice(0, hashIndex)).toLowerCase(),
      hash: hashIndex === -1 ? '' : normalized.slice(hashIndex + 1).toLowerCase()
    };
  }

  function matchesAlias(node, file) {
    return (node.aliases || []).some(function (alias) {
      return routeParts(alias).file === file;
    });
  }

  function resolve(value) {
    var parts = routeParts(value);
    if (redirects[parts.file]) return getNode(redirects[parts.file]);

    var exact = nodes.find(function (node) {
      if (!node.url) return false;
      var candidate = routeParts(node.url);
      return candidate.file === parts.file && candidate.hash && candidate.hash === parts.hash;
    });
    if (exact) return exact;

    return nodes.find(function (node) {
      if (!node.url) return false;
      var candidate = routeParts(node.url);
      return !candidate.hash && (candidate.file === parts.file || matchesAlias(node, parts.file));
    }) || null;
  }

  function getHeaderNodes() {
    return getChildren('portfolio-root')
      .filter(function (node) { return typeof node.headerOrder === 'number'; })
      .sort(function (left, right) { return left.headerOrder - right.headerOrder; });
  }

  function getTopLevel(id) {
    var path = getPath(id);
    return path.length > 1 ? path[1] : path[0] || null;
  }

  global.PortfolioAtlasRegistry = {
    version: 1,
    nodes: nodes,
    excludedRoutes: excludedRoutes,
    redirects: redirects,
    getNode: getNode,
    getChildren: getChildren,
    getPath: getPath,
    getHeaderNodes: getHeaderNodes,
    getTopLevel: getTopLevel,
    resolve: resolve,
    normalizeRoute: normalizeRoute,
    dynamicSources: {
      projects: { url: 'project.html', itemSelector: '[data-project-item]', titleSelector: '.proj-card-title' },
      publications: { url: 'publication.html', itemSelector: '[data-publication-item]', titleSelector: '.pub-title' },
      blog: { url: 'data/site-data.js', api: 'SiteData' }
    }
  };
})(window);
