"# RF Safety Compliance — Site Search

A self-contained, single-file replacement for the map filter app at
`https://www.rfsafetycompliance.com/Home/site-search`. Deploy as a static
HTML file and embed in Google Sites via iframe.

## Files
- `site-search.html` — the entire app (HTML + CSS + JS in one file)
- `sample-sites.csv` — example data layout (15 columns)

---

## 1. Add your Google Maps API key

1. Open [https://console.cloud.google.com/google/maps-apis](https://console.cloud.google.com/google/maps-apis)
2. Create a project, enable **Maps JavaScript API**, and create an API key.
3. **Restrict the key** to your iframe domain (e.g. `*.googleusercontent.com`,
   `sites.google.com`, your GitHub Pages domain, etc.) — important for cost control.
4. Open `site-search.html`, search for `YOUR_GOOGLE_MAPS_API_KEY`, and replace it.

**Cost**: Google gives a $200/month free credit (~28,000 map loads/month). Most
small embeds stay within the free tier. After the credit it's about $7 per 1,000
loads. Billing must be enabled on the project even if you stay free.

---

## 2. Plug in your data (Google Sheet)

The default file ships with **inline sample data** in the `SAMPLE_SITES` array.
To switch to a live Google Sheet:

### Option A — Publish the sheet as CSV (simplest)
1. In your Google Sheet: **File → Share → Publish to web → CSV**.
2. Copy the URL it gives you (looks like
   `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).
3. In `site-search.html`, find the comment `(2) DATA_SOURCE` and replace the
   `let SITES = SAMPLE_SITES.slice();` line with:

```js
let SITES = [];
fetch(\"PASTE_YOUR_PUBLISHED_CSV_URL_HERE\")
  .then(r => r.text())
  .then(csv => {
    SITES = parseCsv(csv);
    populateCategoryFilters();
    applyFilters();
    if (map) renderMarkers(getFilteredSites());
  });

function parseCsv(text) {
  const rows = [];
  let row = [], cur = \"\", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i+1];
    if (inQ) {
      if (c === '\"' && n === '\"') { cur += '\"'; i++; }
      else if (c === '\"') inQ = false;
      else cur += c;
    } else {
      if (c === '\"') inQ = true;
      else if (c === \",\") { row.push(cur); cur = \"\"; }
      else if (c === \"
\") { row.push(cur); rows.push(row); row = []; cur = \"\"; }
      else if (c !== \"
\") cur += c;
    }
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const headers = rows.shift().map(h => h.trim());
  return rows
    .filter(r => r.length && r.some(v => v && v.trim()))
    .map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] || \"\").trim()])));
}
```

Also remove (or comment out) the initial `applyFilters()` call near the bottom
since data loads asynchronously.

### Option B — gviz JSON endpoint (no publishing required)
Replace the fetch URL with:
```
https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json&sheet=SHEET_NAME
```
…and parse the JSON response (Google wraps it in
`google.visualization.Query.setResponse(...)`; strip the wrapper, then `JSON.parse`).
Sheet must be shared as \"Anyone with the link can view\".

---

## 3. Required columns (sheet header row)

Header names must match exactly:

| Column | Type | Used as |
|---|---|---|
| Owner | text | Category filter (dropdown) |
| Site ID | text | Free-text filter, unique row key |
| Site Name | text | Free-text filter, displayed |
| Address | text | Free-text filter |
| City | text | Free-text filter |
| State | text | Category filter (dropdown) |
| Zip | text | Free-text filter (starts-with) |
| Latitude | number | Pin position |
| Longitude | number | Pin position |
| Photo | URL | Optional image in info window |
| Content | text | Tooltip text in info window |
| Pin Color | color name | Pin/dot color (Blue, Red, Green, Yellow, Orange, Purple, Teal, Pink, Brown, Black, Gray) |
| RF Safety Sheet | text | Link label (defaults to \"RF Safety Sheet\") |
| URL | URL | PDF link target |
| Image | URL | Small icon next to PDF link |

---

## 4. Deploy

### GitHub Pages (free)
1. Create a public GitHub repo, push `site-search.html` to it.
2. Repo → **Settings → Pages → Branch: main / root → Save**.
3. URL will be `https://<user>.github.io/<repo>/site-search.html`.

### Embed in Google Sites
1. Edit your Google Site page → **Insert → Embed → By URL**.
2. Paste the GitHub Pages URL.
3. Resize the iframe to taste (recommend ~900px tall).

### Other free hosts
Netlify, Cloudflare Pages, Vercel — drag-and-drop the single HTML file.

---

## Customising look & feel

All colors are CSS variables at the top of `site-search.html`:
```css
:root {
  --brand-ink: #0d2436;
  --brand-accent: #c8102e;
  ...
}
```
Tweak as needed.
"
