# The House of Ribs — website

One site covering all three restaurants: **Boksburg**, **Edenvale** and **Kempton Park**.

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies. Upload the
folder to any host and it works.

---

## Running it locally

Any static server will do:

```bash
npx serve --no-clean-urls .
```

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

> Use `--no-clean-urls` with `serve`. Without it, `serve` redirects `reserve.html?location=edenvale`
> to `/reserve` and drops the query string, which breaks the location deep links.

Opening `index.html` directly from the file system also mostly works, but `localStorage`
and deep links behave better over HTTP.

---

## How it's put together

```
index.html          Home
menu.html           Full food menu + drinks list
buffet.html         Buffet sittings, prices and house rules
locations.html      All three restaurants
gallery.html        Photo grid
contact.html        A separate contact form per restaurant
reserve.html        Booking request form

assets/
  css/styles.css    All styling. Design tokens are at the top under :root.
  js/data.js        ← ALL CONTENT LIVES HERE. Prices, hours, addresses, menu.
  js/app.js         Rendering + the location switcher. Rarely needs editing.
  img/              Photography (WebP + JPEG for every image)
  brand/            Logos and favicons

site.webmanifest    Icon set for "add to home screen"
robots.txt          Crawler rules
sitemap.xml         Page list for search engines
```

### The location switcher

The pin button in the header is the spine of the site. Whichever restaurant is selected:

- contact details, trading hours and WhatsApp numbers update everywhere,
- the buffet page shows only the sittings that branch runs,
- the contact page opens that branch's form,
- the booking form pre-selects it.

The choice is saved to `localStorage` (`hor:location`) so it survives page changes and
return visits. You can also link straight to a branch:

```
contact.html?location=edenvale
reserve.html?location=kempton-park
```

Valid ids: `boksburg`, `edenvale`, `kempton-park`.

---

## Editing content

**Almost everything you'll want to change is in `assets/js/data.js`.** It's one file,
heavily commented, and every page reads from it. Change a price once and it updates
across the site.

### A price

Find the item in the `menu` array:

```js
{ id: 'rb-pork', name: 'Pork Ribs', prices: [['600g', 'R189'], ['1.2kg', 'R299']] },
```

### Trading hours, phone, address

Each restaurant is an object in the `locations` array. Note that `phoneHref` and
`whatsappHref` are the machine-readable versions used by tap-to-call and WhatsApp links —
update those alongside the display numbers.

```js
phone: '011 826 3550',
phoneHref: '+27118263550',        // international format, no spaces
whatsapp: '063 933 2881',
whatsappHref: '27639332881',      // no + for wa.me links
```

### Different prices at one branch

The three restaurants currently share one menu, but the site is built to handle
divergence. Add an entry to that location's `menu.overrides`, keyed by the item's `id`:

```js
menu: {
  overrides: {
    'rb-pork':    { prices: [['600g', 'R199'], ['1.2kg', 'R319']] },
    'st-snails':  { unavailable: true }        // hides the item at this branch only
  }
}
```

Anything not overridden falls back to the shared menu.

### Which branch runs which buffet

Each location has a `buffets` array listing the sittings it offers:

```js
buffets: ['breakfast', 'lunch', 'dinner', 'weekend'],
```

The buffet definitions and their prices live in the `buffets` object above it.

### Adding a photo

Drop the image into `assets/img/`, ideally as both `.webp` and `.jpg` with the same
basename, then add its dimensions to the `imageSizes` map in `data.js`:

```js
'assets/img/food/new-dish': [1600, 1067],
```

That map isn't optional decoration — the site uses it to set real `width`/`height` on
every `<img>`. Without it a lazy-loaded image collapses to zero height and never loads.

---

## Wiring up the forms

Both forms are **presentational only**. Nothing is sent anywhere. On submit they show a
notice telling the visitor to phone or WhatsApp instead, with the right number for the
selected branch.

To connect them, the handler is in `assets/js/app.js` — search for `data-demo-form`:

```js
$$('form[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (e) => { ... });
});
```

The forms already carry everything a backend needs. Each contact form has a hidden
`location` input; the booking form has a `location` select. So the submitted payload
identifies which restaurant it's for.

Three routes, easiest first:

1. **Formspree / Netlify Forms / Basin** — no backend to write. Replace the JS handler
   with a real `action` and `method="POST"` on the `<form>`, and route by the `location`
   field to the right inbox.
2. **Your own endpoint** — swap the handler for a `fetch()` POST of `new FormData(form)`.
3. **WhatsApp deep link** — skip email entirely and open a pre-filled WhatsApp message to
   the selected branch. Fits how bookings are actually confirmed today.

Whichever you choose, add server-side validation and a spam guard (honeypot field or
captcha) before going live.

---

## Brand assets

The mark is three rib bones on an ember-red badge — drawn as geometry, so it stays crisp
from a 16px favicon up to a shopfront print.

```
assets/brand/
  mark.svg                Icon, full colour
  mark-mono.svg           Icon, single colour (inherits currentColor)
  logo-horizontal.svg     Icon + wordmark, side by side
  logo-stacked.svg        Icon above wordmark
  favicon.ico             Multi-resolution, 16–64px
  favicon-16/32/48/96/192/512.png
  apple-touch-icon.png    180px, for iOS home screens
  maskable-512.png        Android adaptive icon (mark inset to the safe zone)
  og-image.jpg            1200×630 social share card
```

The two lockup SVGs use live text set in Archivo. They render correctly in a browser
where the webfont is loaded. **For print or for a designer, convert the text to outlines
first** — otherwise it falls back to Arial.

### Colours

| Token | Hex | Use |
|---|---|---|
| `--brand` | `#BC252D` | Primary red — buttons, prices, accents |
| `--brand-dark` | `#8E1A21` | Hover states, gradient end |
| `--flame` | `#E8891F` | Warm accent, badges, dark-section highlights |
| `--ink` | `#17120F` | Headings |
| `--ink-2` | `#3B2E27` | Body text |
| `--muted` | `#7A6558` | Secondary text |
| `--cream` | `#FBF7F1` | Page background |
| `--dark` | `#14100E` | Dark sections and footer |

Type is **Archivo** throughout, loaded from Google Fonts.

---

## Before going live

- [ ] Confirm the flagged content items in `CONTENT-NOTES.md` — especially the Boksburg
      shop number and which branches run the weekday buffet sittings.
- [ ] Replace `houseofribs.co.za` in the `<link rel="canonical">` tags, `sitemap.xml` and
      `robots.txt` with the real domain.
- [ ] Connect the two forms (above).
- [ ] Point the three old domains at this site, or redirect them, so existing links and
      search rankings carry over.
- [ ] Add analytics if you want it.

---

## Browser support

Modern evergreen browsers. The layout uses CSS Grid, custom properties, `aspect-ratio`
and `backdrop-filter`. Every image ships as WebP with a JPEG fallback, so older browsers
still get photos. There's no JavaScript framework, so the site is fast on a weak
connection — the home page is about 500KB on first load, and under 200KB on a phone
before photos scroll into view.
