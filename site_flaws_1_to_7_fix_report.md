# Site Flaws 1–7 Fix Report

## Files changed

- `blog.html`
- `academics.html`
- `event.html`
- `data/site-data.js`

## Blog archive load and deduplication

- `data/site-data.js` loads before the archive renderer.
- The raw HTML now uses a neutral `Archive` fallback and a hidden empty-state container. JavaScript shows `Loading archive…` only during initialization.
- `No matching posts found.` is created only after an active search/category/tag filter returns zero records. An unfiltered empty archive uses `No blog posts are available yet.`
- `SITE_POSTS` remains the primary source. Page discovery adds only posts missing from the central data.
- Canonical URL normalization removes origins, leading/trailing and duplicate slashes, and treats explicit URL canonicals and matching links as the same key.
- Archive cards, category totals, filters, search, sort, tags, and Show More use the final deduplicated list.
- Old inflated count: **147**.
- Previous deduplicated count: **129**.
- New unique count: **130** (the previously conflated Aditya Agarwal alumni interaction is now a separate, valid archive record).

## Duplicate/conflicting records fixed

- Merged the duplicate `Academic Expert Session` record into the canonical `Expert Talk on IoT` activity at `academics.html#et-02`.
- Restored `Alumni Talk` to `academics.html#ev-alumni`.
- Added a distinct academics card and canonical link for `Alumni Interaction - Aditya Agarwal` at `academics.html#ev-aditya-alumni`.
- Central validation result: **87 records / 87 unique canonical keys / 0 duplicate canonical links**.

## Thumbnail mappings fixed

The following central posts now use real images from their matching academics galleries:

- SpaceSec 2021 — `Organised Spec Conference/20260516_172947.jpg`
- ICCT 2019 — `Organised ICCT 2019/20260516_173546.jpg`
- ICICV 2020 — `Organised ICICV 2020/20260516_173202.jpg`
- SIN 2017 — `Organised SIN Conference/20171015_125339.jpg`
- SSIC 2017 — `Organised SSIC -1/20260516_175510.jpg`
- SSIC 2019 — `Organised SSIC-2/20260516_180300.jpg`

All six files exist locally; none uses the unrelated award/convocation thumbnail.

## Academics empty state

- The message is hidden in the initial HTML and on normal page load.
- It appears only after a user search/filter interaction produces zero visible records.
- It hides again as soon as records are visible.

## Event statistics and evidence links

- Accessible HTML fallback values are present before JavaScript runs: **11 Talks**, **29 Conferences**, **8 Reviewer Roles**, and **5 Hackathon Activities**.
- The same fallback counts are present in the tab controls; the existing DOM counter continues to update them dynamically.
- Evidence controls render as `View photos / blog`; duplicate `data-photo`/`data-blog` URLs produce one button.
- Conference evidence is configured on **18 cards**, using the verified academics anchors requested for ICCT, SpaceSec, ICICV, SSIC, MUN, and SIN activities.
- Hackathon evidence is configured on **4 cards**: School Hackathon, the 2019 ACM judge activity, Hackathon Head, and Hackathon Winners – Neemrana.
- All referenced academics anchors were verified in `academics.html`.

## Evidence intentionally not added

- Conference cards without a matching academics archive remain unlinked.
- The 13 Jan 2018 ACM Hackathon Judge card remains unlinked because no distinct real matching evidence asset was found.

## Verification

- JavaScript syntax checks passed for `data/site-data.js` and all edited inline scripts.
- Event DOM card totals: Talks **11**, Conferences **29**, Reviewing **8**, Hackathons **5**.
- Required evidence anchors: **0 missing**.
- Duplicate canonical links in central data: **0**.
- `git diff --check`: passed.
- In-app browser rendering could not be run because the browser capability was unavailable; structural, script, link-target, count, and asset checks were completed locally instead.
