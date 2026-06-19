# Automatic Counts Update Report

- Final Talks count: **11**

## Files changed

- `data/site-data.js`
- `academics.html`
- `event.html`
- `blog.html`
- `js/blog-section-counts.js`
- `avocations.html`
- `project.html`
- `sports.html`
- `social-life.html`

## Counts now dynamic

- `academics.html`: Quick Stats, academic tabs, filters, category totals, and academic sidebar count targets are populated from the unique academic subcategory anchors in `SITE_POSTS`.
- Blog Sections: the Academics total is read from `SITE_POSTS` through `SiteData.countAcademicPosts()` on every page that renders the widget.
- `blog.html`: conference, workshop, and talk summary counts use dynamic academic count targets.
- `event.html`: top stats and tab counts for Leadership, Talks, Seminars, Workshops, Conferences, Reviewing, Hackathons, Memberships, and Community Outreach are derived from the cards in each event section. A mutation observer refreshes counts if cards are inserted or removed after page load.

## Central talk data

- Added Global AI Jaipur — “Fundamentals of LLMs & RAG” as `academics.html#et-10` using the default academic image.
- Added IoT and AI Workshop — MUJ ACM SIGAI Student Chapter as `academics.html#et-11` using the default academic image.
- Both records use category `academics`, subcategory `Talks`, and include the `Talks` tag.
- No photo or certificate was invented.

## Counts still static

- Non-academic Blog Sections retain their existing numeric fallback values only for failure/offline cases where their source page cannot be read. Their normal displayed counts are still calculated from their source cards.
- Profile metrics such as citations, patents, and years of experience remain editorial statistics because they are not card/post totals.

## Automatic update test

- Baseline central Talks count: **11**.
- Added one temporary in-memory `SITE_POSTS` Talks record: count changed automatically to **12**.
- Removed that temporary record: count returned automatically to **11**.
- Event counts were checked against their actual section cards: Talks **11**, Conferences **29**, Hackathons **5**.
