# Website Audit and Consistency Fix Report

## Files changed

- `academics.html`
- `event.html`
- `blog.html`
- `data/site-data.js`
- `award.html`

`index.html`, `sports.html`, `social-life.html`, `avocations.html`, `project.html`, and `js/blog-section-counts.js` were audited but required no additional edit in this pass. `index.html` already contains 50+ Publications, 6 Patents, 600+ Citations, 10+ Keynote Talks, 15+ Years Research, 12+ Years Experience, and the standardized “Analytics & AI Engineer” / “Amazon Web Services” wording.

## Counts before and after

| Area | Reported/stale state | Final source of truth |
|---|---:|---:|
| Event Talks | 9 | **11 DOM cards** |
| Event Conferences | 23 / stale | **29 DOM cards** |
| Event Hackathons | missing/separate | **5 DOM cards** |
| Event Seminars | tab existed but section was absent | **2 restored DOM cards** |
| Event Reviewing | stale display count | **8 DOM cards** |
| Academic Talks | 9 | **11 unique `SITE_POSTS` anchors / 11 DOM cards** |
| Academic archive | 74 | **76 unique academic posts** |
| Sports posts | 0 fallback | **30 DOM posts** |
| Blog archive | Loading / 0 | **88 central `SITE_POSTS` records before optional page discovery** |

## Dynamic count implementation

- `event.html` derives all top-stat and tab totals from `.evt-card` elements in each section and updates every matching `data-count-for` target. A mutation observer refreshes totals after later card additions/removals.
- `academics.html` Quick Stats, tabs, filters, sidebar badges, and category totals use unique academic anchors from `SITE_POSTS`.
- Academic sidebar indexes are rebuilt from the current academic cards, including titles, anchors, and years.
- Blog Section widgets load `data/site-data.js` first and use the central academic total; static pages continue counting their own DOM posts.
- `sports.html` derives its visible Posts total from its 30 `data-blog-post` cards.

## Blog archive fix

- Corrected script order so `data/site-data.js` loads before blog count rendering.
- Initialized the archive explicitly from `window.SITE_POSTS` / `SiteData` and hardened empty-array handling.
- Confirmed archive script syntax and category schema (`academics`, `social`, `sports`, `avocations`) match the filter controls.
- Sorting, tag filtering, category filtering, grid/list view, and Show More continue to operate on the central post array.
- Fixed five central-data targets that could otherwise break archive cards.

## Content structure and naming

- Added explicit “Organised Conferences” and “Conference Participation / Presentation Archives” group headings in `academics.html`.
- Standardized SPEC naming to **SpaceSec 2021 - Organised Conference** across academics and central data.
- Synchronized the February 2018 IoT, April 2020 AI/IoT, and May 2019 Machine Intelligence talk names, dates, and venues across academics, events, and central data.
- Retained the documented Machine Intelligence discrepancy: CV date 27 May 2019; certificate date 29 May 2019.
- Added event blog-archive links for the Global AI Jaipur and MUJ ACM SIGAI talk anchors.
- Event media buttons now use descriptive labels: View photos, View certificate, View member badge, and View blog archive.

## Broken links fixed

- `avocations.html#painting` → `avocations.html#tab-painting`
- Physics Day image folder `29. physics day` → real folder `6. physics day`
- Robotics Fair image folder `35. robotics fair` → real folder `5. robotics fair`
- GIAN image folder `6. Gian Course` → real folder `6. Gian MNIT - 2017`
- FDP image folder `12. one week FDP` → real folder `12. one week FDP - Computational Intelligence`

All **88** `SITE_POSTS` links and images pass local file/anchor validation. The requested ICCT, SpaceSec, ICICV, SSIC, SIN, and hackathon anchors all exist.

## Links still missing because no real evidence exists

- Conference cards intentionally left without evidence: 3rd ICICV 2022, 2nd ICICV 2021, SIN 2019 roles, SIN 2018 Cardiff, RICE 2018, ICICV 2018, TENCON 2017, NGCT 2017, RICE 2017, and ICISSP 2015.
- ACM Hackathon Judge — 13 January 2018 remains unlinked because no matching repository asset was found.
- Global AI Jaipur 2025 and MUJ ACM SIGAI 2023 have real academic archive anchors but no invented photo/certificate assets.

## Remaining manual/static content

- Profile metrics such as publications, patents, citations, research years, and experience years remain curated editorial statistics in `SITE_STATS`; correct raw HTML fallbacks are present.
- Non-academic Blog Section fallback numbers remain only for offline/source-fetch failure. Normal page totals are computed from DOM cards.
- Conference and talk descriptions/dates remain editorial content and are not inferred automatically from filenames.
