# Content notes — where everything came from, and what needs your eye

All content was taken from your three existing sites and the menu PDF they link to.
This file records the sources, the judgement calls I made, and the handful of things
only you can confirm.

## Sources

| What | Where it came from |
|---|---|
| Full food menu and prices | The menu PDF linked from all three sites (`Copyright HOUSE OF RIBS 2026`) |
| Drinks lists | The four drinks-menu images used across the sites |
| Buffet prices and times | The buffet posters on the sites' home and specials pages |
| Addresses, phones, hours | The three sites' contact sections, cross-checked against the menu PDF |
| Photography | Downloaded from your sites, then cropped and re-encoded |
| Instagram bio wording | `instagram.com/houseofribsedenvale` |

**The menu PDF is byte-for-byte identical on all three sites** — same file, same prices.
So the new site serves one shared menu, with a per-branch override system ready for when
that changes. See the README for how to use it.

---

## Please confirm these

### 1. Boksburg shop number — two different answers

Your Boksburg website says **Shop 3**, The Towers Shopping Centre. The 2026 menu PDF says
**136** The Towers Shopping Centre. I used **136**, because the PDF is the more recent
document — but this is an address on a live site, so please check it.

`assets/js/data.js` → `locations[0].address.line1`

### 2. Which branches run the weekday lunch and dinner buffets

The lunch (R159/R129/R109) and dinner (R159/R129/R99) buffet posters appear **only** on
the Kempton Park site. The breakfast buffet (R104) and the weekend everyday buffet
(R189/R109) posters appear on all three.

I've encoded that: Kempton Park shows four sittings, Boksburg and Edenvale show two, and
a note on the buffet page explains the difference. If Boksburg and Edenvale also run
weekday sittings, add `'lunch', 'dinner'` to their `buffets` array.

### 3. Kempton Park's email address

Published as `jimmy@houseofribs.co.za`. Kept as-is because that's what's live, but the
other two branches use a location-based address (`boksburg@`, `edenvale@`). A
`kemptonpark@` address would be more robust if someone leaves.

### 4. The R65 breakfast special

A table card visible in one of your Edenvale photos advertises a **R65 breakfast special**
alongside the R104 breakfast buffet. I did not put it on the site — I couldn't confirm it
still runs or which branches offer it. Worth adding if it's current; it's a strong
entry-price offer.

### 5. Kiddies buffet price

The menu PDF lists **Kiddies Buffet (under 10) — R129**. The buffet posters price kids at
**R109** (lunch/weekend) and **R99** (dinner). Both are on the site as published, but
they may need reconciling.

---

## Judgement calls I made

**WhatsApp numbers.** These appear on the menu PDF but not on the websites, so I've added
them as tap-to-chat links: Boksburg `063 933 2881`, Kempton Park `060 715 7105`, Edenvale
`062 142 2563`.

**Typos corrected** from the printed menu: "PANCO Crumbed Mushrooms" → Panko,
"NUTTELLA" → Nutella, "Kids Milkshake REGULR" → Regular, and "may di er" → "may differ"
(a broken ligature in the PDF). Prices and dish names are otherwise verbatim.

**Menu descriptions** were converted from ALL CAPS to sentence case for readability. No
wording was changed.

**The Experiences tab is gone**, as you asked. The old sites' `/experiences` and
`/experience-details` pages are not carried over.

**Christmas menu pages** from the old sites weren't carried over either — they're
seasonal and dated. Easy to add back as a page when the time comes.

---

## Images

Every photo is your own, downloaded from your three sites. Each is cropped, resized and
saved twice — WebP for modern browsers, JPEG as a fallback. Total image weight came down
from roughly 60MB of originals to about 11MB.

The three storefronts are matched to the right branch:

- `venues/boksburg-exterior` — the evening shot with the Checkers sign
- `venues/edenvale-exterior` — the Meadowdale Mall frontage
- `venues/kemptonpark-exterior` — the Festival Mall food-court entrance

**Two promo posters are included but not displayed:**

- `specials/platter-for-two` — Platter for Two, R339
- `specials/celebrations` — birthday bottle of J.C. Le Roux + 25% off cocktails

Both came from Kempton Park's pages only. I left them out rather than advertise a branch
offer as if it were group-wide. If they run everywhere, they'd make a good specials strip
on the home page.

The stock photos on your old sites that had nothing to do with the restaurant (a running
man, a pile of wine corks) were left behind.

---

## One thing worth thinking about

Your three current sites each carry a different logo treatment — the red script wordmark,
a black-and-white version, and the bold red shopfront lettering. The new mark gives all
three branches one identity that works at favicon size, which none of the current ones do.

The old script logo still has real equity on your signage. If you'd rather keep it as the
primary mark and use the new one only as an app icon and favicon, that's a straightforward
swap — say the word.
