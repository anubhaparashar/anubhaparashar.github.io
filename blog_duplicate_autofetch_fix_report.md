# Blog Duplicate Auto-Discovery Fix Report

- Old archive count: **147 posts**
- New unique archive count: **129 posts**
- Duplicate rendered posts removed: **18**

## Files changed

- `blog.html`
- `avocations.html`
- `data/site-data.js`

## Merge behavior

- `window.SITE_POSTS` remains the primary source of truth.
- Central posts are deduplicated before the first archive render.
- Page auto-discovery still runs for Academics, Social Life, Sports, and Avocations.
- Discovered posts are appended only when their canonical key is not already present.
- Publications and Projects are excluded because the main archive does not expose those category filters.

Canonical keys use this priority:

1. Explicit `post.canonical`
2. Normalized internal link
3. Normalized title, date, and category

Link normalization removes the origin, leading/trailing slashes, and duplicate slashes, so variants such as `/academics.html#abc` and `academics.html#abc` match.

## Future post workflow

- Preferred: add a complete record to `data/site-data.js`.
- Fallback: add a page card with `data-post-id` or `data-canonical`. Optional `data-category`, `data-date`, and `data-title` values improve discovered metadata.
- If the same post exists in both places, the `SITE_POSTS` record wins and renders once.

## Verification

- Unique central records: **86** from 88 raw central records.
- Unique merged archive records: **129**.
- Adding a new central post makes it appear automatically.
- Adding a new discovered card makes it appear automatically.
- Adding the same link in central data and discovery produces one post.
- Search, category filters, tags, sorting, grid/list view, and Show More all continue operating on the deduplicated `SITE_POSTS` array.
- Auto-discovery remains enabled without duplicate rendering.
