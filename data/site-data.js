/**
 * CENTRAL SITE DATA
 *
 * To add a new academic/blog/gallery item, add it only to the central data source.
 * Quick Stats, Blog counts, Sidebar counts, Filters, and Tags update automatically.
 *
 * Fields: id, cat ('academics'|'social'|'sports'|'avocations'), tags (curated CSV string or array),
 *         date, views (optional), img, title, excerpt, link, badge (optional label),
 *         subCategory (optional for academics; otherwise inferred from the link/id prefix).
 */

/**
 * CENTRAL POSTS DATA — add a new object here and blog.html auto-updates.
 * Fields: id, cat ('academics'|'social'|'sports'), tags (CSV string),
 *         date, views (optional), img, title, excerpt, link, badge (optional label)
 */
var SITE_POSTS = [

  {
    id:      'post-lead-warden',
    cat:     'academics',
    subCategory: 'Leadership',
    tags:    ['Leadership','Academics','Mentoring','Community Outreach'],
    date:    '2016 - 2024',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'Warden',
    excerpt: 'Academic leadership responsibility as warden, supporting students through mentoring, administration, and campus life coordination.',
    link:    'academics.html#lead-warden',
    badge:   'Academics'
  },
  {
    id:      'post-lead-vc',
    cat:     'academics',
    subCategory: 'Leadership',
    tags:    ['Leadership','Academics','Mentoring','Community Outreach'],
    date:    '2007',
    views:   '',
    img:     'files/8. Blog/1. academic/1. leadership/2. wise captain/vice captain.png',
    title:   'Vice Captain, School',
    excerpt: 'School leadership role as Vice Captain, reflecting early responsibility, teamwork, and student representation.',
    link:    'academics.html#lead-vc',
    badge:   'Academics'
  },
  {
    id:      'post-lead-sp',
    cat:     'academics',
    subCategory: 'Leadership',
    tags:    ['Leadership','School','Student Life','Academics'],
    date:    '2005 - 2006',
    views:   '',
    img:     'files/8. Blog/1. academic/1. leadership/3. senior perfect/sp.jpeg',
    title:   'Senior Prefect',
    excerpt: 'Senior Prefect role during school years, contributing to student discipline, coordination, and leadership activities.',
    link:    'academics.html#lead-sp',
    badge:   'Academics'
  },

  /* ── SOCIAL LIFE ────────────────────────────────────── */
  {
    id:      'post-mom-birthday',
    cat:     'social',
    tags:    'Social Life',
    date:    'May 19, 2026',
    views:   '',
    img:     'files/8. Blog/2. Connection/3. Family/3. mom birthday/111111.png',
    title:   'Happy Birthday to My Beautiful Mom',
    excerpt: 'A heartfelt birthday tribute to my mother - my strength, blessing, first home, and forever safe place.',
    link:    'social-life.html#mom-birthday',
    badge:   'Family'
  },
  {
    id:      'post-conf-outing',
    cat:     'social',
    tags:    'Social Life,Collaboration,Conference',
    date:    'Feb, 2020',
    views:   '',
    img:     'files/8. Blog/2. Connection/1. Conference outings/2. ICICV conference outing/IMG20200213200238.jpg',
    title:   'Conference Outing',
    excerpt: 'Team bonding and networking at an international conference — building connections that go beyond research and the lab.',
    link:    'social-life.html#sg-02',
    badge:   'Connections'
  },
  {
    id:      'post-muj-ssic',
    cat:     'social',
    tags:    'Events,Students,Community Outreach,MUJ',
    date:    'Jan, 2019',
    views:   '',
    img:     'files/8. Blog/2. Connection/1. Conference outings/1. MUJ SSIC/IMG_2746.JPG',
    title:   'MUJ SSIC Event',
    excerpt: 'Facilitated the Student Symposium on Intelligent Computing at MUJ — fostering a strong student research culture.',
    link:    'social-life.html#sg-01',
    badge:   'Connections'
  },

  /* ── ACADEMICS — CONFERENCES ────────────────────────── */
  {
    id:      'post-c-icct17',
    cat:     'academics',
    tags:    'Conference,Research,International,AI,ICCT',
    date:    'Dec, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/Organised icct-17/20171222_120557.jpg',
    title:   'ICCT 2017',
    excerpt: '1st International Conference on Intelligent Communication and Computational Techniques — an inaugural gathering advancing intelligent systems.',
    link:    'academics.html#c-icct17-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-ssic2',
    cat:     'academics',
    tags:    'Conference,Research,Students,MUJ,Symposium',
    date:    'Jan, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/SSIC-2/20190118_102321.jpg',
    title:   'SSIC 2019 – 2nd Edition',
    excerpt: 'Student–Faculty Symposium on Intelligent Computing 2nd Edition — deeper research presentations and cross-disciplinary exchange.',
    link:    'academics.html#c-ssic2',
    badge:   'Academics'
  },
  {
    id:      'post-c-icct19',
    cat:     'academics',
    tags:    'Conference,Research,International,AI,ICCT',
    date:    'Sep, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/ICCT 2019/IMG_0205.JPG',
    title:   'ICCT 2019',
    excerpt: '2nd International Conference on Intelligent Communication and Computational Techniques — exploring the frontiers of intelligent computing.',
    link:    'academics.html#c-icct19',
    badge:   'Academics'
  },
  {
    id:      'post-c-dubai',
    cat:     'academics',
    tags:    'Conference,Research,Collaboration',
    date:    'Jan, 2020',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/dubai/IMG20200130125344.jpg',
    title:   'International Conference – Dubai',
    excerpt: 'Representing the university on the global stage in Dubai, UAE — presenting cutting-edge AI research to an international audience.',
    link:    'academics.html#c-dubai',
    badge:   'Academics'
  },
  {
    id:      'post-c-icct23',
    cat:     'academics',
    tags:    'Conference,Research,International,AI,ICCT',
    date:    'Jan, 2023',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/icct 2023/dji_mimo_20230120_152400_0_1674208966086_photo.jpg',
    title:   'ICCT 2023',
    excerpt: '3rd International Conference on Intelligent Communication and Computational Techniques — presenting research with global scholars.',
    link:    'academics.html#c-icct23',
    badge:   'Academics'
  },
  {
    id:      'post-c-bvicam',
    cat:     'academics',
    tags:    'Conference,Research,Publications',
    date:    '2010',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/39. first ppt BVICAM/DSC03523.JPG',
    title:   'BVICAM – First Paper Presentation',
    excerpt: 'First-ever conference paper presentation at BVICAM, New Delhi — a milestone marking the beginning of an active research journey.',
    link:    'academics.html#c-bvicam',
    badge:   'Academics'
  },
  {
    id:      'post-c-coratia',
    cat:     'academics',
    tags:    'Conference,International,Croatia,Research,Travel',
    date:    'Sep, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/Coratia Conference/20180906_103004.jpg',
    title:   'International Conference – Croatia',
    excerpt: 'International conference in Croatia — sharing research with European academics and exploring collaborative opportunities abroad.',
    link:    'academics.html#c-croatia',
    badge:   'Academics'
  },
  {
    id:      'post-c-icct21',
    cat:     'academics',
    tags:    'Conference,Events,Research',
    date:    'Dec, 2021',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/27. Organised ICCT conference/IMG20211213123342.jpg',
    title:   'ICCT 2021 – Organised Conference',
    excerpt: 'ICCT 2021, organised and chaired — leading the coordination of an international conference as chief organiser and programme committee member.',
    link:    'academics.html#c-icct21-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-udaipur',
    cat:     'academics',
    tags:    'Conference,Research,Technology',
    date:    'Mar, 2016',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/1. Udaipur/20160304_181813.jpg',
    title:   'Conference – Udaipur',
    excerpt: 'Regional conference in the City of Lakes, Udaipur — an early foray into academic collaboration and research sharing.',
    link:    'academics.html#c-udaipur',
    badge:   'Academics'
  },
  {
    id:      'post-c-jaipur',
    cat:     'academics',
    tags:    'Conference,Research,Technology',
    date:    'Aug, 2016',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/3. jaipur/IMG-20160812-WA0001.jpg',
    title:   'Conference – Jaipur',
    excerpt: 'Regional academic conference in the Pink City — presenting research findings and connecting with scholars from across Rajasthan.',
    link:    'academics.html#c-jaipur',
    badge:   'Academics'
  },
  {
    id:      'post-c-ssic1',
    cat:     'academics',
    tags:    'Conference,Students,MUJ,Symposium,Research',
    date:    'Apr, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/SSIC-1/20170414_170023.jpg',
    title:   'SSIC 2017 – 1st Edition',
    excerpt: 'Student–Faculty Symposium on Intelligent Computing 1st Edition — fostering interdisciplinary dialogue between students and researchers.',
    link:    'academics.html#c-ssic1',
    badge:   'Academics'
  },
  {
    id:      'post-c-sin17',
    cat:     'academics',
    tags:    'Conference,Research,Security,Networks,International',
    date:    'Oct, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/sIN 17/20171013_153105.jpg',
    title:   'SIN 2017',
    excerpt: 'Security of Information and Networks 2017 — presenting research on information security and network technologies with international experts.',
    link:    'academics.html#c-sin17',
    badge:   'Academics'
  },
  {
    id:      'post-c-icicv',
    cat:     'academics',
    tags:    'Conference,AI,Computer Vision,MUJ,Research',
    date:    'Jan, 2020',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/ICICV/IMG20200117195203.jpg',
    title:   'ICICV 2020',
    excerpt: 'Innovations in Computational Intelligence and Computer Vision — a premier AI and visual computing forum at Manipal University Jaipur.',
    link:    'academics.html#c-icicv',
    badge:   'Academics'
  },

  /* ── ACADEMICS — EXPERT TALKS ───────────────────────── */
  {
    id:      'post-et-workshop-2018',
    cat:     'academics',
    tags:    'Talks,Workshop,FDP,Teaching,Technology',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/1/20180208_143012.jpg',
    title:   'Workshop & Expert Session',
    excerpt: 'A focused workshop and expert session bringing together classroom teaching, faculty development, and applied technology discussion for student and faculty learning.',
    link:    'academics.html#et-01',
    badge:   'Academics'
  },
  {
    id:      'post-et-online-session',
    cat:     'academics',
    tags:    'Talks,Faculty Visit,Technology,Teaching',
    date:    '2020',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/2/FB_IMG_1594393539551.jpg',
    title:   'Online Expert Session',
    excerpt: 'An online academic session designed to keep learning active beyond the classroom, combining presentation material, certification, and remote knowledge sharing.',
    link:    'academics.html#et-01',
    badge:   'Academics'
  },
  {
    id:      'post-et-01',
    cat:     'academics',
    tags:    'Talks,AI,Faculty Visit,Teaching',
    date:    '2022',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/3. expert talk on AI/1.jpeg',
    title:   'Expert Talk on AI',
    excerpt: 'Invited expert talk — sharing insights on contemporary AI topics with students and faculty of the department.',
    link:    'academics.html#et-01',
    badge:   'Academics'
  },
  {
    id:      'post-et-02',
    cat:     'academics',
    tags:    'Talks,IoT,Industry,Technology',
    date:    '2019 – 2020',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/4. expert talk on IoT/IMG-20190326-WA0004.jpg',
    title:   'Expert Talk on IoT',
    excerpt: 'Expert talk series on Internet of Things 2019–2020 — sessions on IoT architecture, security, and emerging applications.',
    link:    'academics.html#et-02',
    badge:   'Academics'
  },
  {
    id:      'post-et-academic-session',
    cat:     'academics',
    tags:    'Talks,Academic Session,Students,Technology',
    date:    '2021',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/6/1.png',
    title:   'Academic Expert Session',
    excerpt: 'A compact academic expert session documented through event material, adding another milestone to the continuing sequence of departmental knowledge-sharing activities.',
    link:    'academics.html#et-02',
    badge:   'Academics'
  },
  {
    id:      'post-et-machine-intelligence-2019',
    cat:     'academics',
    tags:    'Talks,FDP,AI,Academics',
    date:    'May 29, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/7/20260516_172526.jpg',
    title:   'Expert Talk on Recent Trends in Machine Intelligence',
    excerpt: 'Delivered an expert talk on Recent Trends in Machine Intelligence and its Challenges during the one-week FDP on Advancement in Computer Science under TEQIP-III at IET Khandari, Dr. B. R. Ambedkar University, Agra.',
    link:    'academics.html#et-06',
    badge:   'Academics'
  },

  /* ── ACADEMICS — FACULTY VISITS ─────────────────────── */
  {
    id:      'post-fv-zagreb',
    cat:     'academics',
    tags:    'Faculty Visit,Research,Collaboration',
    date:    'Sep, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/5. faculty visits/1. zagreb, coratia/20180904_112911.jpg',
    title:   'Faculty Visit – Zagreb, Croatia',
    excerpt: 'Academic faculty visit to Zagreb, Croatia — exploring collaborative research opportunities at leading European institutions.',
    link:    'academics.html#fv-zagreb',
    badge:   'Academics'
  },
  {
    id:      'post-fv-rijeka',
    cat:     'academics',
    tags:    'Faculty Visit,Research,Collaboration',
    date:    'Sep, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/5. faculty visits/2. rijeka, coratia/20180911_104449.jpg',
    title:   'Faculty Visit – Rijeka, Croatia',
    excerpt: 'Faculty visit to the University of Rijeka, Croatia — strengthening international academic and research partnerships.',
    link:    'academics.html#fv-rijeka',
    badge:   'Academics'
  },
  {
    id:      'post-fv-physics',
    cat:     'academics',
    tags:    'Faculty Visit,Physics,Science,MUJ,Education',
    date:    'Jul, 2022',
    views:   '',
    img:     'files/8. Blog/1. academic/5. faculty visits/29. physics day/IMG20220712121659.jpg',
    title:   'Physics Day Visit',
    excerpt: 'Visit for Physics Day 2022 — engaging with demonstrations and exhibits that bridge science communication and interdisciplinary learning.',
    link:    'academics.html#fv-physics',
    badge:   'Academics'
  },
  {
    id:      'post-fv-itday',
    cat:     'academics',
    tags:    'Faculty Visit,Industry,Technology',
    date:    'Mar, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/5. faculty visits/3. Rajasthan Dijifest/20180320_154838.jpg',
    title:   'Rajasthan Dijifest',
    excerpt: 'Rajasthan Dijifest in Jaipur — showcasing technology innovations and connecting with the broader IT and industry community.',
    link:    'academics.html#fv-itday',
    badge:   'Academics'
  },
  {
    id:      'post-fv-robotics',
    cat:     'academics',
    tags:    'Faculty Visit,Robotics,Engineering,Innovation,Technology',
    date:    'Mar, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/5. faculty visits/35. robotics fair/20170318_135523.jpg',
    title:   'Robotics Fair',
    excerpt: 'Robotics fair visit — exploring cutting-edge robotics demonstrations and student projects inspiring the next generation of engineers.',
    link:    'academics.html#fv-robotics',
    badge:   'Academics'
  },
  {
    id:      'post-fv-mujstall',
    cat:     'academics',
    tags:    'Faculty Visit,MUJ,Community Outreach',
    date:    'Sep, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/5. faculty visits/4. IT day and muj stall/20180926_114045.jpg',
    title:   'IT Day & MUJ Stall',
    excerpt: 'IT Day with Manipal University Jaipur stall — representing MUJ research and academic programmes to students and industry professionals.',
    link:    'academics.html#fv-mujstall',
    badge:   'Academics'
  },

  /* ── ACADEMICS — EVENTS ─────────────────────────────── */
  {
    id:      'post-ev-mou',
    cat:     'academics',
    tags:    'Events,Research,Collaboration',
    date:    '2019',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/0. mou/IMG_3037.JPG',
    title:   'MOU Signing Ceremony',
    excerpt: 'Memorandum of Understanding signing — formalising academic partnerships to foster collaborative projects and student exchange.',
    link:    'academics.html#ev-mou',
    badge:   'Academics'
  },
  {
    id:      'post-ev-vikram',
    cat:     'academics',
    tags:    'Events,Awards,MUJ',
    date:    '2022',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/11. Vikram award/IMG_5615.JPG',
    title:   'Vikram Award Ceremony',
    excerpt: 'Vikram Award ceremony — recognising outstanding contributions to research, academics, and institutional development.',
    link:    'academics.html#ev-vikram',
    badge:   'Academics'
  },
  {
    id:      'post-ev-selfdefence',
    cat:     'academics',
    tags:    'Events,Students,Community Outreach',
    date:    'Mar, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/14. Self defence/20180319_182726.jpg',
    title:   'Self Defence Workshop',
    excerpt: 'Self-defence workshop for students — empowering participants with practical safety skills through structured hands-on training.',
    link:    'academics.html#ev-selfdefence',
    badge:   'Academics'
  },
  {
    id:      'post-ev-yoga',
    cat:     'academics',
    tags:    'Events,Sports & Wellness,Students,Health',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/17. yoga day/20180226_112614.jpg',
    title:   'Yoga Day',
    excerpt: 'Yoga Day celebration — promoting physical and mental well-being among students and faculty through guided sessions.',
    link:    'academics.html#ev-yoga',
    badge:   'Academics'
  },
  {
    id:      'post-ev-alumni',
    cat:     'academics',
    tags:    'Events,Alumni,Talks,Community Outreach',
    date:    'Jan, 2020',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/18. Alumni talk/IMG20200108161445.jpg',
    title:   'Alumni Talk',
    excerpt: 'Alumni talk event — reconnecting graduates with the department and inspiring current students through real-world career experiences.',
    link:    'academics.html#ev-alumni',
    badge:   'Academics'
  },
  {
    id:      'post-ev-aditya-alumni',
    cat:     'academics',
    tags:    'Events,Alumni,Students,Mentoring',
    date:    'Aug, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/1. Alumni/Aditya Agarwal/20190826_180500.jpeg',
    title:   'Alumni Interaction - Aditya Agarwal',
    excerpt: 'An alumni interaction with Aditya Agarwal, giving students a closer view of professional pathways, industry expectations, and the value of staying connected with the department.',
    link:    'academics.html#ev-alumni',
    badge:   'Academics'
  },
  {
    id:      'post-ev-bigbasket',
    cat:     'academics',
    tags:    'Events,Talks,Industry,Innovation',
    date:    'Nov, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/6. Events done/expert talk by big basket CEO/20181101_140529.jpg',
    title:   'Expert Talk – Big Basket CEO',
    excerpt: 'Expert talk by the CEO of Big Basket — insights on entrepreneurship, technology leadership, and building large-scale AI-driven platforms.',
    link:    'academics.html#ev-bigbasket',
    badge:   'Academics'
  },

  /* ── ACADEMICS — HACKATHONS ─────────────────────────── */
  {
    id:      'post-hk-school',
    cat:     'academics',
    tags:    'Hackathon,School,Students,Coding,Innovation',
    date:    'Nov, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/7. Hackathon Head/28. school hackathon/IMG20191113111251.jpg',
    title:   'School Hackathon',
    excerpt: 'School-level hackathon — guiding young students through their first experience of building innovative tech solutions under time pressure.',
    link:    'academics.html#hk-school',
    badge:   'Academics'
  },
  {
    id:      'post-hk-head',
    cat:     'academics',
    tags:    'Hackathon,Mentoring,MUJ,Innovation',
    date:    'Nov 2018 – Jan 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/7. Hackathon Head/31. hackathon head/20181114_102243.jpg',
    title:   'Hackathon Head',
    excerpt: 'Serving as Hackathon Head at MUJ — organising, mentoring, and judging competitive coding events to nurture student innovation.',
    link:    'academics.html#hk-head',
    badge:   'Academics'
  },
  {
    id:      'post-hk-neemrana',
    cat:     'academics',
    tags:    'Hackathon,Awards,Innovation',
    date:    'Oct, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/7. Hackathon Head/8. Hackathon winners-neemrana/20181027_184509.jpg',
    title:   'Hackathon Winners – Neemrana',
    excerpt: 'National hackathon at Neemrana — celebrating student teams who won top prizes in this highly competitive technology competition.',
    link:    'academics.html#hk-neemrana',
    badge:   'Academics'
  },

  /* ── ACADEMICS — SOCIAL ACTIVITIES ──────────────────── */
  {
    id:      'post-soc-greenclub',
    cat:     'academics',
    tags:    'Social Life,Environment,Community Outreach,MUJ',
    date:    'Jan, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/12.01.2018Green club Hangout/IMG-20180112-WA0004.jpg',
    title:   'Green Club Hangout',
    excerpt: 'Green Club hangout — promoting environmental awareness and sustainability through community activities and nature-focused outings.',
    link:    'academics.html#soc-greenclub',
    badge:   'Academics'
  },
  {
    id:      'post-soc-chair',
    cat:     'academics',
    tags:    'Social Life,Community Outreach',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/12.02.2018. Chair table distribution/IMG-20180212-WA0017.jpg',
    title:   'Chair & Table Distribution',
    excerpt: 'Community outreach — distributing chairs and tables to underserved communities as part of the university\'s social responsibility initiatives.',
    link:    'academics.html#soc-chair',
    badge:   'Academics'
  },
  {
    id:      'post-soc-blood18',
    cat:     'academics',
    tags:    'Social Life,Blood Donation,Health,Community Outreach,MUJ',
    date:    '2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/2. Blood Donation - 2018/IMG_2474.JPG',
    title:   'Blood Donation Camp 2018',
    excerpt: 'Annual blood donation camp 2018 — mobilising students and faculty to donate blood and save lives through organised campus drives.',
    link:    'academics.html#soc-blood18',
    badge:   'Academics'
  },
  {
    id:      'post-soc-blood19',
    cat:     'academics',
    tags:    'Social Life,Blood Donation,Health,Community Outreach,MUJ',
    date:    'Nov, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/2. Blood Donation - 2019/IMG20191114104421.png',
    title:   'Blood Donation Camp 2019',
    excerpt: 'Blood donation camp 2019 — continuing the tradition of giving back through life-saving campus blood donation drives.',
    link:    'academics.html#soc-blood19',
    badge:   'Academics'
  },
  {
    id:      'post-soc-blood17',
    cat:     'academics',
    tags:    'Social Life,Blood Donation,Health,Community Outreach,MUJ',
    date:    'Nov, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/2. Blood Donation-2017/20171116_142416.jpg',
    title:   'Blood Donation Camp 2017',
    excerpt: 'Blood donation camp 2017 — uniting the campus community for a cause that directly saves lives in the surrounding region.',
    link:    'academics.html#soc-blood17',
    badge:   'Academics'
  },
  {
    id:      'post-soc-dhemi',
    cat:     'academics',
    tags:    'Social Life,Community Outreach,Teaching',
    date:    'Nov, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/25.11.2017 Dhemi School visit/IMG-20171125-WA0001.jpg',
    title:   'Dhemi School Visit',
    excerpt: 'Visit to Dhemi School — engaging with underprivileged children and supporting local education through community outreach.',
    link:    'academics.html#soc-dhemi',
    badge:   'Academics'
  },
  {
    id:      'post-soc-beti',
    cat:     'academics',
    tags:    'Social Life,Women Awareness,Community Outreach',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/26.02.2018. Beti Bachao Beti Padhao/IMG-20180227-WA0006.jpg',
    title:   'Beti Bachao Beti Padhao',
    excerpt: 'Beti Bachao Beti Padhao campaign — raising awareness for girl child education and gender equality through campus-led initiatives.',
    link:    'academics.html#soc-beti',
    badge:   'Academics'
  },
  {
    id:      'post-soc-village',
    cat:     'academics',
    tags:    'Social Life,Community Outreach,Teaching',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/27.02.2018 Village visit/IMG-20180227-WA0015.jpg',
    title:   'Village Visit',
    excerpt: 'Village visit initiative — connecting academia with rural communities to understand ground realities and contribute meaningfully.',
    link:    'academics.html#soc-village',
    badge:   'Academics'
  },
  {
    id:      'post-soc-clean',
    cat:     'academics',
    tags:    'Social Life,Environment,Community Outreach',
    date:    'Oct, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/32. cleanileness drive/20181002_091119.jpg',
    title:   'Cleanliness Drive',
    excerpt: 'Campus and community cleanliness drive — contributing to Swachh Bharat by mobilising students for a cleaner environment.',
    link:    'academics.html#soc-clean',
    badge:   'Academics'
  },
  {
    id:      'post-soc-projector',
    cat:     'academics',
    tags:    'Social Life,Community Outreach,Teaching',
    date:    'Dec 2017 – Feb 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/projector distribution/IMG-20171230-WA0008.jpg',
    title:   'Projector Distribution',
    excerpt: 'Projector distribution project — donating AV equipment to schools and institutions to enhance the quality of teaching and learning.',
    link:    'academics.html#soc-projector',
    badge:   'Academics'
  },
  {
    id:      'post-soc-blood16',
    cat:     'academics',
    tags:    'Social Life,Blood Donation,Health,Community Outreach,MUJ',
    date:    '2016',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/2. Blood Donation - 2016/New Doc 8.jpg',
    title:   'Blood Donation Camp 2016',
    excerpt: 'Blood donation camp 2016 - an early campus service initiative that encouraged voluntary donation, health awareness, and student participation in community welfare.',
    link:    'academics.html#soc-blood16',
    badge:   'Academics'
  },
  {
    id:      'post-soc-donation',
    cat:     'academics',
    tags:    'Social Life,Blood Donation,Community Outreach',
    date:    'May, 2026',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/donation/20260516_161425.jpg',
    title:   'Donation Drive',
    excerpt: 'Donation drive - a recent community service activity reflecting continued commitment to service, sharing, and social support.',
    link:    'academics.html#soc-donation',
    badge:   'Academics'
  },
  {
    id:      'post-soc-donation-copy',
    cat:     'academics',
    tags:    'Social Life,Blood Donation,Community Outreach',
    date:    'May, 2026',
    views:   '',
    img:     'files/8. Blog/1. academic/8. Social Activities/donation - Copy/20260516_161550.jpg',
    title:   'Donation Drive Memories',
    excerpt: 'Donation drive memories - an additional moment preserving the people and purpose behind the community service activity.',
    link:    'academics.html#soc-donation-copy',
    badge:   'Academics'
  },
  {
    id:      'post-ws-icicv',
    cat:     'academics',
    tags:    'Workshop,Conference,MUJ,Learning,AI',
    date:    'Jan, 2020',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/icicv workshop/IMG20200111103219.jpg',
    title:   'ICICV 2020 – Pre-Conference Workshop',
    excerpt: 'Pre-conference hands-on workshop at Manipal University Jaipur — introducing participants to cutting-edge tools ahead of ICICV 2020.',
    link:    'academics.html#w-icicv',
    badge:   'Academics'
  },
  {
    id:      'post-ws-gian',
    cat:     'academics',
    tags:    'Workshop,GIAN,Training,Research,Learning',
    date:    'Jan, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/6. Gian Course/20170103_131338.jpg',
    title:   'GIAN Course',
    excerpt: 'Global Initiative of Academic Networks intensive programme — bringing internationally recognised expertise to Indian institutions.',
    link:    'academics.html#w-gian',
    badge:   'Academics'
  },
  {
    id:      'post-ws-fdp',
    cat:     'academics',
    tags:    'Workshop,FDP,Faculty Visit,Training,Technology',
    date:    'Jan, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/12. one week FDP/20170119_134736.jpg',
    title:   'One Week FDP',
    excerpt: 'One-week Faculty Development Programme — building technical skills and pedagogical insights through sessions with domain experts.',
    link:    'academics.html#w-fdp12',
    badge:   'Academics'
  },
  {
    id:      'post-ws-iot',
    cat:     'academics',
    tags:    'Workshop,IoT,Embedded,Sensors,Technology',
    date:    'Jun, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/10. IoT workshop/20170627_093813.jpg',
    title:   'IoT Workshop',
    excerpt: 'Three-day hands-on workshop on Internet of Things — sensor networks, embedded systems, and connected device programming.',
    link:    'academics.html#w-iot',
    badge:   'Academics'
  },
  {
    id:      'post-ws-iitdel',
    cat:     'academics',
    tags:    'Workshop,Research,Training,AI',
    date:    'Jun, 2017',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/34. IIT delhi workshop/20170625_111113.jpg',
    title:   'IIT Delhi Workshop',
    excerpt: 'Two-day workshop at IIT Delhi — engaging with top-tier researchers and gaining exposure to advanced methodologies.',
    link:    'academics.html#w-iitdel',
    badge:   'Academics'
  },
  {
    id:      'post-ws-expttalk',
    cat:     'academics',
    tags:    'Workshop,Talks,Faculty Visit,Technology',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/15. workshop-expert talk/20180208_143012.jpg',
    title:   'Workshop & Expert Talk',
    excerpt: 'Multi-day workshop combined with an expert lecture series — bridging industry insights and academic knowledge.',
    link:    'academics.html#w-expttalk',
    badge:   'Academics'
  },
  {
    id:      'post-ws-imgproc',
    cat:     'academics',
    tags:    'Workshop,Image Processing,Computer Vision,AI,Technology',
    date:    'Feb, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/16. image processing workshop/20180225_154426(0).jpg',
    title:   'Image Processing Workshop',
    excerpt: 'Focused workshop on image processing techniques — algorithms, tools, and applications in digital image analysis and computer vision.',
    link:    'academics.html#w-imgproc',
    badge:   'Academics'
  },
  {
    id:      'post-ws-novelence',
    cat:     'academics',
    tags:    'Workshop,Hackathon,MUJ,Innovation,Coding',
    date:    'Oct, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/7. Novelence/DSC_0309.JPG',
    title:   'Novelence – MUJ Hacks 2',
    excerpt: 'High-energy hackathon bringing together creative problem-solvers to build innovative technology solutions under time pressure.',
    link:    'academics.html#w-novelence',
    badge:   'Academics'
  },
  {
    id:      'post-ws-oracle',
    cat:     'academics',
    tags:    'Workshop,Oracle,Database,Cloud,Training',
    date:    '2018',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/9. Oracle Workshop/DSC_0175.JPG',
    title:   'Oracle Workshop',
    excerpt: 'Oracle-sponsored enterprise workshop — relational databases, cloud computing platforms, and industry best practices.',
    link:    'academics.html#w-oracle',
    badge:   'Academics'
  },
  {
    id:      'post-ws-telemetry',
    cat:     'academics',
    tags:    'Workshop,Telemetry,Remote Sensing,IoT,Technology',
    date:    'Mar, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/30. Telemetry workshop/20190326_125529.jpg',
    title:   'Telemetry Workshop',
    excerpt: 'Workshop on telemetry and remote sensing — data transmission protocols, monitoring systems, and real-time analytics.',
    link:    'academics.html#w-telemetry',
    badge:   'Academics'
  },
  {
    id:      'post-ws-deeplearn',
    cat:     'academics',
    tags:    'Workshop,Deep Learning,FDP,MUJ,AI',
    date:    'Jul, 2019',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/20. muj deep learning fdp/IMG_20190708_110041.jpg',
    title:   'MUJ Deep Learning FDP',
    excerpt: 'Three-day Faculty Development Programme on Deep Learning at MUJ — neural architectures, frameworks, and real-world implementations.',
    link:    'academics.html#w-deeplearn',
    badge:   'Academics'
  },
  {
    id:      'post-ws-iotspeaker',
    cat:     'academics',
    tags:    'Workshop,IoT,Speaker,Industry,Technology',
    date:    'Feb, 2021',
    views:   '',
    img:     'files/8. Blog/1. academic/4. expert talk/5. iot speaker/IMG_20210214_105415.jpg',
    title:   'IoT Speaker Session',
    excerpt: 'Expert speaker session on Internet of Things — industry and academic speakers sharing real-world IoT applications and research.',
    subCategory: 'Expert Talks',
    link:    'academics.html#et-07',
    badge:   'Academics'
  },
  {
    id:      'post-c-mun',
    cat:     'academics',
    tags:    'Conference,Students,Leadership,Community Outreach',
    date:    'Apr 14-15, 2018',
    views:   '',
    img:     'files/8. Blog/1. academic/2. Conferences and ppt/37. MUN/IMG_7544.JPG',
    title:   'Model United Nations (MUN)',
    excerpt: 'Model United Nations conference — mentoring students in global diplomacy, debate, and policy discussions that build critical thinking and collaborative leadership skills.',
    link:    'academics.html#c-mun',
    badge:   'Academics'
  },
  {
    id:      'post-ws-ai',
    cat:     'academics',
    tags:    'Workshop,AI,Machine Learning,Technology,Training',
    date:    '2022',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/38. workshop on AI/1.jpg',
    title:   'Workshop on Artificial Intelligence',
    excerpt: 'Comprehensive workshop on AI — foundational concepts, machine learning techniques, and practical applications across domains.',
    link:    'academics.html#w-ai',
    badge:   'Academics'
  },
  {
    id:      'post-ws-gian-mnit',
    cat:     'academics',
    tags:    'Workshop,GIAN,MNIT,Research,Training',
    date:    'Dec, 2016',
    views:   '',
    img:     'files/8. Blog/1. academic/3. workshops/13. gian mnit - 2016/1.jpg',
    title:   'GIAN Course – MNIT Jaipur',
    excerpt: 'Week-long GIAN intensive at MNIT Jaipur — immersive programme with internationally recognised faculty in advanced computing.',
    link:    'academics.html#w-gian-mnit',
    badge:   'Academics'
  },
  /* ── SPORTS ──────────────────────────────────────────── */
  {
    id:      'post-c-spec-organised',
    cat:     'academics',
    subCategory: 'Conferences',
    tags:    'Conference,Events,Research,Academics',
    date:    '2021',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'SPEC Conference - Organised',
    excerpt: 'Organising committee contribution for the SPEC conference.',
    link:    'academics.html#c-spec-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-icct19-organised',
    cat:     'academics',
    subCategory: 'Conferences',
    tags:    'Conference,Events,Research,Academics',
    date:    '2019',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'ICCT 2019 - Organised Conference',
    excerpt: 'Organising committee contribution for ICCT 2019.',
    link:    'academics.html#c-icct19-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-icicv20-organised',
    cat:     'academics',
    subCategory: 'Conferences',
    tags:    'Conference,Events,Research,Academics',
    date:    '2020',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'ICICV 2020 - Organised Conference',
    excerpt: 'Organising committee contribution for ICICV 2020.',
    link:    'academics.html#c-icicv20-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-sin-organised',
    cat:     'academics',
    subCategory: 'Conferences',
    tags:    'Conference,Events,Research,Academics',
    date:    '2017',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'SIN 2017 - Organised Conference',
    excerpt: 'Organising committee contribution for SIN 2017.',
    link:    'academics.html#c-sin-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-ssic1-organised',
    cat:     'academics',
    subCategory: 'Conferences',
    tags:    'Conference,Events,Students,Academics',
    date:    '2017',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'SSIC 2017 - Organised Symposium',
    excerpt: 'Organising committee contribution for SSIC 2017.',
    link:    'academics.html#c-ssic1-organised',
    badge:   'Academics'
  },
  {
    id:      'post-c-ssic2-organised',
    cat:     'academics',
    subCategory: 'Conferences',
    tags:    'Conference,Events,Students,Academics',
    date:    '2019',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'SSIC 2019 - Organised Symposium',
    excerpt: 'Organising committee contribution for SSIC 2019.',
    link:    'academics.html#c-ssic2-organised',
    badge:   'Academics'
  },
  {
    id:      'post-w-gian-2018',
    cat:     'academics',
    subCategory: 'Workshops',
    tags:    'Workshop,GIAN,Research,Training,Academics',
    date:    '2018',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'GIAN 2018',
    excerpt: 'GIAN 2018 academic training and workshop participation.',
    link:    'academics.html#w-gian-2018',
    badge:   'Academics'
  },
  {
    id:      'post-et-03',
    cat:     'academics',
    subCategory: 'Expert Talks',
    tags:    'Talks,FDP,Research,Training,Academics',
    date:    '2019 - 2020',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'Expert Talk & FDP',
    excerpt: 'Expert talk and Faculty Development Programme sessions sharing research insights and technical knowledge with academic communities.',
    link:    'academics.html#et-03',
    badge:   'Academics'
  },
  {
    id:      'post-et-04',
    cat:     'academics',
    subCategory: 'Expert Talks',
    tags:    'Talks,IoT,Technology,Academics',
    date:    '2020',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'Expert Talk on IoT',
    excerpt: 'Expert talk on IoT and emerging technology themes.',
    link:    'academics.html#et-04',
    badge:   'Academics'
  },
  {
    id:      'post-et-05',
    cat:     'academics',
    subCategory: 'Expert Talks',
    tags:    'Talks,Technology,Teaching,Academics',
    date:    '',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'Expert Talk',
    excerpt: 'Academic expert talk session.',
    link:    'academics.html#et-05',
    badge:   'Academics'
  },
  {
    id:      'post-et-08',
    cat:     'academics',
    subCategory: 'Expert Talks',
    tags:    'Talks,AI,Academics',
    date:    '',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'Expert Talk on AI',
    excerpt: 'Expert talk on AI and related academic themes.',
    link:    'academics.html#et-08',
    badge:   'Academics'
  },
  {
    id:      'post-et-09',
    cat:     'academics',
    subCategory: 'Expert Talks',
    tags:    'Talks,Teaching,Academics',
    date:    '2006',
    views:   '',
    img:     'files/8. Blog/1. academic/academic.jpg',
    title:   'Java as a Language',
    excerpt: 'Academic session on Java as a programming language.',
    link:    'academics.html#et-09',
    badge:   'Academics'
  },
  {
    id:      'post-sports-sack',
    cat:     'sports',
    tags:    'Sports & Wellness,Awards,Health',
    date:    'Dec 2018',
    views:   '',
    img:     'files/8. Blog/3. Sports/3. Office  College  School/29/20181218_132223.jpg',
    title:   'Xpression – 1st Position: Sack Race',
    excerpt: 'Clinched first place in the Sack Race at the Xpression campus sports event — a fun burst of speed and spirit.',
    link:    'sports.html#sports-post-29',
    badge:   'Sports'
  },
  {
    id:      'post-sports-cricket',
    cat:     'sports',
    tags:    'Sports & Wellness,Awards,Health',
    date:    'Jul 2024',
    views:   '',
    img:     'files/8. Blog/3. Sports/3. Office  College  School/30. won in cricket match in invincible ocean on July 2024.jpg',
    title:   'Cricket Match Win in July 2024',
    excerpt: 'A recent cricket win from July 2024 that keeps the sports journey current, energetic, and connected to teamwork at every stage.',
    link:    'sports.html#sports-post-30',
    badge:   'Sports'
  }

];

(function(global) {
  var CATEGORY_ORDER = ['academics', 'social', 'sports', 'avocations'];
  var SITE_STATS = {
    profile: {
      publications: { value: 50, suffix: '+' },
      patents: { value: 6, suffix: '' },
      citations: { value: 600, suffix: '+' },
      keynoteTalks: { value: 10, suffix: '+' },
      yearsResearch: { value: 15, suffix: '+' },
      yearsExperience: { value: 12, suffix: '+' }
    },
    publicationTypes: {
      patents: 6,
      journals: 16,
      conferences: 16,
      bookchapters: 7,
      articles: 6,
      presentations: 3,
      posters: 1,
      total: { value: 50, suffix: '+' }
    }
  };
  var BLOG_SECTION_COUNTS = {
    publications: 1,
    projects: 1
  };
  var CATEGORY_LABELS = {
    academics: 'Academics',
    social: 'Social Life',
    sports: 'Sports',
    avocations: 'Avocations'
  };
  var SUBCATEGORY_LABELS = {
    leadership: 'Leadership',
    conferences: 'Conferences',
    workshops: 'Workshops',
    experttalks: 'Expert Talks',
    facultyvisits: 'Faculty Visits',
    events: 'Events',
    hackathon: 'Hackathon',
    social: 'Social Activities'
  };
  var SUBCATEGORY_ORDER = [
    'leadership',
    'conferences',
    'workshops',
    'experttalks',
    'facultyvisits',
    'events',
    'hackathon',
    'social'
  ];
  var ACADEMIC_CATEGORY_ORDER = [
    'leadership',
    'conferences',
    'workshops',
    'talks',
    'faculty-visits',
    'events',
    'hackathon',
    'social-activities'
  ];
  var ACADEMIC_CATEGORY_LABELS = {
    academics: 'Academic Archive',
    leadership: 'Leadership',
    conferences: 'Conferences',
    workshops: 'Workshops',
    talks: 'Talks',
    'faculty-visits': 'Faculty Visits',
    events: 'Events',
    hackathon: 'Hackathon',
    'social-activities': 'Social Activities'
  };
  var SUBCATEGORY_TO_ACADEMIC_SLUG = {
    leadership: 'leadership',
    conferences: 'conferences',
    conference: 'conferences',
    workshops: 'workshops',
    workshop: 'workshops',
    experttalks: 'talks',
    experttalk: 'talks',
    talks: 'talks',
    talk: 'talks',
    facultyvisits: 'faculty-visits',
    facultyvisit: 'faculty-visits',
    events: 'events',
    event: 'events',
    hackathon: 'hackathon',
    social: 'social-activities',
    socialactivities: 'social-activities'
  };

  function normalizeKey(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '');
  }

  function tagsArray(item) {
    if (Array.isArray(item.tags)) return item.tags.filter(Boolean);
    return String(item.tags || '')
      .split(',')
      .map(function(tag) { return tag.trim(); })
      .filter(Boolean);
  }

  var TAG_ALIASES = {
    'expert talk': 'Talks',
    'talk': 'Talks',
    'talks': 'Talks',
    'social': 'Social Life',
    'community': 'Community Outreach',
    'outreach': 'Community Outreach',
    'responsibility': 'Community Outreach',
    'service': 'Community Outreach',
    'donation': 'Blood Donation',
    'women': 'Women Awareness',
    'awareness': 'Women Awareness',
    'faculty': 'Faculty Visit',
    'event': 'Events',
    'events': 'Events',
    'organised': 'Events',
    'achievement': 'Awards',
    'award': 'Awards',
    'awards': 'Awards',
    'project': 'Projects',
    'projects': 'Projects',
    'publication': 'Publications',
    'publications': 'Publications',
    'patent': 'Patents',
    'patents': 'Patents',
    'innovation': 'Innovation',
    'technology': 'Technology',
    'academics': 'Academics',
    'research': 'Research',
    'conference': 'Conference',
    'workshop': 'Workshop',
    'training': 'Training',
    'fdp': 'FDP',
    'hackathon': 'Hackathon',
    'sports': 'Sports & Wellness',
    'yoga': 'Sports & Wellness',
    'fitness': 'Sports & Wellness',
    'wellness': 'Sports & Wellness'
  };

  var TAG_BLOCKLIST = {
    'vikram': true,
    'mom': true,
    'birthday': true,
    'love': true,
    'blessings': true,
    'family': true,
    'memories': true,
    'first paper': true,
    'ceo': true,
    'head': true,
    'winners': true,
    'teamwork': true,
    'office': true,
    'dubai': true,
    'delhi': true,
    'udaipur': true,
    'neemrana': true,
    'zagreb': true,
    'rijeka': true,
    'jaipur': true,
    'rajasthan': true
  };

  var TAG_ALLOWLIST = {
    'research': true,
    'ai': true,
    'machine learning': true,
    'deep learning': true,
    'computer vision': true,
    'biometrics': true,
    'nlp': true,
    'genai': true,
    'llms': true,
    'publications': true,
    'projects': true,
    'patents': true,
    'conference': true,
    'workshop': true,
    'talks': true,
    'fdp': true,
    'training': true,
    'gian': true,
    'faculty visit': true,
    'academic session': true,
    'teaching': true,
    'mentoring': true,
    'students': true,
    'muj': true,
    'leadership': true,
    'innovation': true,
    'iot': true,
    'robotics': true,
    'security': true,
    'networks': true,
    'cloud': true,
    'remote sensing': true,
    'health': true,
    'sports & wellness': true,
    'social life': true,
    'community outreach': true,
    'blood donation': true,
    'women awareness': true,
    'environment': true,
    'hackathon': true,
    'awards': true,
    'collaboration': true,
    'industry': true,
    'alumni': true,
    'academics': true
  };

  var IMPORTANT_SINGLE_TAGS = {
    'publications': true,
    'projects': true,
    'patents': true,
    'sports & wellness': true
  };

  var VISIBLE_TAG_LIMIT = 30;

  function displayTagsArray(item) {
    var seen = {};
    return tagsArray(item).map(function(tag) {
      var normalized = String(tag || '').trim();
      var key = normalized.toLowerCase();
      if (TAG_BLOCKLIST[key]) return '';
      normalized = TAG_ALIASES[key] || normalized;
      key = normalized.toLowerCase();
      if (!TAG_ALLOWLIST[key]) return '';
      if (seen[key]) return '';
      seen[key] = true;
      return normalized;
    }).filter(Boolean);
  }

  function hashFromLink(item) {
    var link = String(item.link || '');
    return link.indexOf('#') === -1 ? '' : link.split('#').pop();
  }

  function inferSubCategoryKey(item) {
    var explicit = normalizeKey(item.subCategory || item.subCategoryKey);
    if (explicit) {
      if (explicit === 'experttalk' || explicit === 'experttalks') return 'experttalks';
      if (explicit === 'facultyvisit' || explicit === 'facultyvisits') return 'facultyvisits';
      if (explicit === 'socialactivity' || explicit === 'socialactivities') return 'social';
      if (explicit === 'conference') return 'conferences';
      if (explicit === 'workshop') return 'workshops';
      if (explicit === 'event') return 'events';
      return explicit;
    }
    var hash = hashFromLink(item);
    var id = String(item.id || '');
    var source = hash || id;
    if (/^(lead|warden|vice|senior)/i.test(source)) return 'leadership';
    if (/^c-/i.test(source) || /post-c-/i.test(id)) return 'conferences';
    if (/^w-/i.test(source) || /post-ws-/i.test(id)) return 'workshops';
    if (/^et-/i.test(source) || /post-et-/i.test(id)) return 'experttalks';
    if (/^fv-/i.test(source) || /post-fv-/i.test(id)) return 'facultyvisits';
    if (/^ev-/i.test(source) || /post-ev-/i.test(id)) return 'events';
    if (/^hk-/i.test(source) || /post-hk-/i.test(id)) return 'hackathon';
    if (/^soc-/i.test(source) || /post-soc-/i.test(id)) return 'social';
    if (tagsArray(item).some(function(tag) { return normalizeKey(tag) === 'leadership'; })) return 'leadership';
    return '';
  }

  function normalizeItem(item) {
    var category = String(item.mainCategory || item.cat || '').toLowerCase();
    if (category === 'academic') category = 'academics';
    var subKey = category === 'academics' ? inferSubCategoryKey(item) : '';
    return Object.assign({}, item, {
      type: item.type || (category === 'academics' ? 'academic' : 'blog'),
      cat: category,
      mainCategory: CATEGORY_LABELS[category] || item.mainCategory || item.cat || '',
      subCategoryKey: subKey,
      subCategory: item.subCategory || SUBCATEGORY_LABELS[subKey] || '',
      hash: item.hash || hashFromLink(item),
      photoCount: Number(item.photoCount || 0),
      images: item.images || [],
      tags: tagsArray(item),
      description: item.description || item.excerpt || ''
    });
  }

  function sourceItems() {
    return (global.SITE_POSTS || SITE_POSTS || []).map(normalizeItem);
  }

  function getItemsByCategory(category) {
    var key = normalizeKey(category);
    return sourceItems().filter(function(item) {
      return normalizeKey(item.cat) === key || normalizeKey(item.mainCategory) === key;
    });
  }

  function getItemsBySubCategory(subCategory) {
    var key = normalizeKey(subCategory);
    var seen = {};
    return sourceItems().filter(function(item) {
      var itemKey = item.hash || item.id;
      if (seen[itemKey]) return false;
      return item.cat === 'academics' && (
        normalizeKey(item.subCategoryKey) === key ||
        normalizeKey(item.subCategory) === key
      ) && (seen[itemKey] = true);
    });
  }

  function getCategoryCount(category) {
    var catKey = normalizeKey(category);
    if (normalizeKey(category) === 'all') return sourceItems().length;
    return getItemsByCategory(category).length;
  }

  function getSubCategoryCount(subCategory) {
    var key = normalizeKey(subCategory);
    return getItemsBySubCategory(subCategory).length;
  }

  function statValue(path) {
    var parts = String(path || '').split('.');
    var value = SITE_STATS;
    for (var i = 0; i < parts.length; i++) {
      value = value && value[parts[i]];
    }
    return value;
  }

  function renderSiteStats(root) {
    root = root || document;
    root.querySelectorAll('[data-site-stat]').forEach(function(node) {
      var value = statValue(node.getAttribute('data-site-stat'));
      if (value && typeof value === 'object' && 'value' in value) {
        node.textContent = value.value + (value.suffix || '');
        node.setAttribute('data-target', value.value);
        if (value.suffix) node.setAttribute('data-suffix', value.suffix);
      } else if (value !== undefined && value !== null) {
        node.textContent = value;
        node.setAttribute('data-target', value);
      }
    });
  }

  function getTagCounts(items) {
    var counts = {};
    (items || sourceItems()).forEach(function(item) {
      displayTagsArray(item).forEach(function(tag) {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }

  function professionalTagEntries(items) {
    var counts = getTagCounts(items);
    return Object.keys(counts).filter(function(tag) {
      var key = tag.toLowerCase();
      return counts[tag] > 1 || IMPORTANT_SINGLE_TAGS[key];
    }).sort(function(a, b) {
      return counts[b] - counts[a] || a.localeCompare(b);
    }).map(function(tag) {
      return { tag: tag, count: counts[tag] };
    });
  }

  function setText(selector, value, root) {
    var node = (root || document).querySelector(selector);
    if (node) node.textContent = value;
  }

  function setAllText(selector, value, root) {
    (root || document).querySelectorAll(selector).forEach(function(node) {
      node.textContent = value;
    });
  }

  function countAcademicCards(root) {
    root = root || document;
    var counts = {};
    ACADEMIC_CATEGORY_ORDER.forEach(function(slug) {
      counts[slug] = root.querySelectorAll('[data-academic-category="' + slug + '"]').length;
    });
    counts.academics = ACADEMIC_CATEGORY_ORDER.reduce(function(total, slug) {
      return total + (counts[slug] || 0);
    }, 0);
    return counts;
  }

  function applyAcademicCounts(counts, root) {
    root = root || document;
    counts = counts || {};
    setAllText('[data-count-for="academics"]', counts.academics || 0, root);
    setAllText('[data-academic-summary-count="academics"]', counts.academics || 0, root);
    setText('#cat-count-academics', counts.academics || 0, root);

    ACADEMIC_CATEGORY_ORDER.forEach(function(slug) {
      var count = counts[slug] || 0;
      setAllText('[data-count-for="' + slug + '"]', count, root);
      setAllText('[data-academic-summary-count="' + slug + '"]', count, root);
    });

    SUBCATEGORY_ORDER.forEach(function(key) {
      var slug = SUBCATEGORY_TO_ACADEMIC_SLUG[key] || key;
      var count = counts[slug] || 0;
      setAllText('[data-subcategory-count="' + key + '"]', count, root);
      setAllText('[data-academic-tab="' + key + '"] .acad-tab-count', count, root);
    });
  }

  function renderAcademicDomCounts(root) {
    root = root || document;
    var counts = countAcademicCards(root);
    var container = root.querySelector('#academicQuickStats');
    if (container) {
      var rows = [{ key: 'academics', label: ACADEMIC_CATEGORY_LABELS.academics, count: counts.academics }];
      ACADEMIC_CATEGORY_ORDER.forEach(function(slug) {
        rows.push({ key: slug, label: ACADEMIC_CATEGORY_LABELS[slug], count: counts[slug] || 0 });
      });
      container.innerHTML = '<ul style="list-style:none;padding:0;margin:0;">' + rows.map(function(row, index) {
        var border = index === rows.length - 1 ? '' : 'border-bottom:1px solid #eef0ff;';
        return '<li style="display:flex;justify-content:space-between;padding:8px 0;' + border + 'font-size:.84rem;">' +
          '<span style="color:#555;">' + row.label + '</span>' +
          '<strong id="qs-' + row.key + '" data-count-for="' + row.key + '" style="color:#0f3460;">' + row.count + '</strong>' +
        '</li>';
      }).join('') + '</ul>';
    }
    applyAcademicCounts(counts, root);
    return counts;
  }

  function renderAcademicCountsFromUrl(url, root) {
    root = root || document;
    if (!global.fetch || typeof global.DOMParser === 'undefined') return Promise.resolve(null);
    return global.fetch(url || 'academics.html', { cache: 'no-cache' })
      .then(function(response) { return response.ok ? response.text() : ''; })
      .then(function(html) {
        if (!html) return null;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var counts = countAcademicCards(doc);
        applyAcademicCounts(counts, root);
        return counts;
      })
      .catch(function() { return null; });
  }

  function renderAcademicQuickStats(root) {
    return renderAcademicDomCounts(root || document);
  }

  function renderBlogCategorySidebar(root) {
    root = root || document;
    CATEGORY_ORDER.forEach(function(category) {
      setText('#cat-count-' + category, getCategoryCount(category), root);
    });
    Object.keys(BLOG_SECTION_COUNTS).forEach(function(section) {
      setText('[data-section-count="' + section + '"]', BLOG_SECTION_COUNTS[section], root);
    });
    SUBCATEGORY_ORDER.forEach(function(key) {
      setText('[data-subcategory-count="' + key + '"]', getSubCategoryCount(key), root);
    });
  }

  function renderBlogFilters(root) {
    root = root || document;
    CATEGORY_ORDER.forEach(function(category) {
      setText('[data-filter="' + category + '"] .f-count', getCategoryCount(category), root);
    });
    setText('[data-filter="all"] .f-count', sourceItems().length, root);
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function renderTags(root, onTagClickName) {
    root = root || document;
    var cloud = root.querySelector('#tagCloud') || root.querySelector('#tag-cloud');
    if (!cloud) return;
    var tags = professionalTagEntries();
    cloud.innerHTML = '';
    tags.forEach(function(entry, index) {
      var pill = document.createElement('span');
      pill.className = 'tag-pill';
      if (index >= VISIBLE_TAG_LIMIT) pill.hidden = true;
      var tag = entry.tag;
      pill.title = 'Filter: ' + tag;
      if (onTagClickName) {
        pill.setAttribute('onclick', onTagClickName + '("' + tag.replace(/"/g, '&quot;') + '",this)');
      }
      pill.innerHTML = escapeHtml(tag) + ' <small>(' + entry.count + ')</small>';
      cloud.appendChild(pill);
    });
    if (tags.length > VISIBLE_TAG_LIMIT) {
      var more = document.createElement('button');
      more.type = 'button';
      more.className = 'tag-pill tag-more-toggle';
      more.textContent = 'More Tags';
      more.addEventListener('click', function() {
        var expanded = more.getAttribute('aria-expanded') === 'true';
        cloud.querySelectorAll('.tag-pill[hidden]').forEach(function(pill) {
          pill.hidden = expanded;
        });
        if (expanded) {
          Array.from(cloud.querySelectorAll('.tag-pill')).forEach(function(pill, index) {
            if (pill !== more && index >= VISIBLE_TAG_LIMIT) pill.hidden = true;
          });
        } else {
          Array.from(cloud.querySelectorAll('.tag-pill')).forEach(function(pill) {
            if (pill !== more) pill.hidden = false;
          });
        }
        more.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        more.textContent = expanded ? 'More Tags' : 'Fewer Tags';
      });
      more.setAttribute('aria-expanded', 'false');
      cloud.appendChild(more);
    }
  }

  function getBlogCategoryCounts() {
    return CATEGORY_ORDER.reduce(function(counts, category) {
      counts[category] = getCategoryCount(category);
      return counts;
    }, {});
  }

  function getBlogTotalCount() {
    return sourceItems().length;
  }

  var api = {
    items: sourceItems(),
    categoryOrder: CATEGORY_ORDER.slice(),
    subcategoryOrder: SUBCATEGORY_ORDER.slice(),
    labels: SUBCATEGORY_LABELS,
    getItems: sourceItems,
    getItemsByCategory: getItemsByCategory,
    getItemsBySubCategory: getItemsBySubCategory,
    stats: SITE_STATS,
    getSiteStats: function() { return SITE_STATS; },
    renderSiteStats: renderSiteStats,
    getCategoryCount: getCategoryCount,
    getSubCategoryCount: getSubCategoryCount,
    getTagCounts: getTagCounts,
    getProfessionalTagEntries: professionalTagEntries,
    getDisplayTags: displayTagsArray,
    countAcademicCards: countAcademicCards,
    applyAcademicCounts: applyAcademicCounts,
    renderAcademicDomCounts: renderAcademicDomCounts,
    renderAcademicCountsFromUrl: renderAcademicCountsFromUrl,
    renderAcademicQuickStats: renderAcademicQuickStats,
    renderBlogCategorySidebar: renderBlogCategorySidebar,
    renderBlogFilters: renderBlogFilters,
    renderTags: renderTags,
    getTotalCount: function() { return getCategoryCount('academics'); },
    getBlogCategoryCounts: getBlogCategoryCounts,
    getBlogTotalCount: getBlogTotalCount,
    renderQuickStats: renderAcademicQuickStats,
    renderBlogCategoryCounts: renderBlogCategorySidebar,
    renderFilterCounts: renderBlogFilters
  };

  global.SiteData = api;
  global.AcademicData = api;
  global.getItemsByCategory = getItemsByCategory;
  global.getItemsBySubCategory = getItemsBySubCategory;
  global.getCategoryCount = getCategoryCount;
  global.getSubCategoryCount = getSubCategoryCount;
  global.getTagCounts = getTagCounts;
  global.renderAcademicQuickStats = renderAcademicQuickStats;
  global.renderBlogCategorySidebar = renderBlogCategorySidebar;
  global.renderBlogFilters = renderBlogFilters;
  global.renderTags = renderTags;
  global.renderSiteStats = renderSiteStats;
})(window);
