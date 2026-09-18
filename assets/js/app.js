/* =====================================================================
   The House of Ribs — app shell
   ---------------------------------------------------------------------
   Renders the shared header/footer, keeps the selected restaurant in
   sync across every page, and builds the data-driven page sections.
   ===================================================================== */

(function () {
  'use strict';

  const { site, locations, buffets, carverySpread, buffetTerms, menu, drinks, gallery, imageSizes } = window.HOR;

  const STORE_KEY = 'hor:location';
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- Icons ---------------- */
  const icon = {
    pin:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    clock:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    whats:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1a8.1 8.1 0 0 1-4-3.5c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>',
    check:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5 5L20 6.5"/></svg>',
    arrow:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
    chev:   '<svg width="11" height="11" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m1 1.5 5 5 5-5"/></svg>',
    info:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    fb:     '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>',
    ig:     '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/></svg>',
    expand: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7"/></svg>'
  };

  const markSVG = (cls) =>
    `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true">
       <defs><linearGradient id="hor-g-${cls}" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#D9453B"/><stop offset=".55" stop-color="#BC252D"/><stop offset="1" stop-color="#7E1219"/>
       </linearGradient></defs>
       <rect width="64" height="64" rx="15" fill="url(#hor-g-${cls})"/>
       <g fill="#FFF3E2">
         <rect x="17" y="13.75" width="30" height="8.5" rx="4.25"/><circle cx="17" cy="18" r="5.75"/><circle cx="47" cy="18" r="5.75"/>
         <rect x="15" y="27.75" width="34" height="8.5" rx="4.25"/><circle cx="15" cy="32" r="5.75"/><circle cx="49" cy="32" r="5.75"/>
         <rect x="16" y="41.75" width="32" height="8.5" rx="4.25"/><circle cx="16" cy="46" r="5.75"/><circle cx="48" cy="46" r="5.75"/>
       </g>
     </svg>`;

  /**
   * <picture> with a WebP source and a JPEG fallback.
   * Always emits intrinsic width/height from `imageSizes` so the box is
   * reserved before the file arrives — otherwise a lazy image with no
   * intrinsic size collapses to zero height and never enters the viewport.
   */
  function pic(base, alt, opts = {}) {
    const { cls = '', loading = 'lazy', sizes = '' } = opts;
    const dims = imageSizes[base];
    const size = dims ? ` width="${dims[0]}" height="${dims[1]}"` : '';
    const lazy = loading === 'lazy' ? ' decoding="async"' : '';
    return `<picture>` +
      `<source srcset="${base}.webp" type="image/webp"${sizes ? ` sizes="${sizes}"` : ''}>` +
      `<img src="${base}.jpg" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}` +
      ` loading="${loading}"${lazy}${size}>` +
      `</picture>`;
  }

  const fullAddress = (l) =>
    `${l.address.line1}, ${l.address.line2}, ${l.address.city} ${l.address.postcode}`;

  const mapsUrl = (l) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapsQuery)}`;

  /* ---------------- Location state ---------------- */
  let current = locations[0];
  try {
    const saved = localStorage.getItem(STORE_KEY);
    const match = locations.find((l) => l.id === saved);
    if (match) current = match;
  } catch (_) { /* private mode — fall back to the default branch */ }

  function setLocation(id) {
    const next = locations.find((l) => l.id === id);
    if (!next || next.id === current.id) return;
    current = next;
    try { localStorage.setItem(STORE_KEY, id); } catch (_) {}
    renderLocationAware();
    document.dispatchEvent(new CustomEvent('hor:location', { detail: current }));
  }

  window.HOR.getLocation = () => current;
  window.HOR.setLocation = setLocation;

  /* ---------------- Header ---------------- */
  function renderHeader() {
    const host = $('[data-component="header"]');
    if (!host) return;
    const page = document.body.dataset.page || '';

    const navLinks = site.nav.map((n) => {
      const active = n.href.replace('.html', '') === page;
      return `<a href="${n.href}"${active ? ' aria-current="page"' : ''}>${n.label}</a>`;
    }).join('');

    host.innerHTML = `
      <header class="header">
        <div class="wrap header__inner">
          <a class="brand" href="index.html" aria-label="${esc(site.name)} — home">
            ${markSVG('brand__mark')}
            <span class="brand__text">
              <span class="brand__name">The House of Ribs</span>
              <span class="brand__sub">Family Restaurant</span>
            </span>
          </a>

          <nav class="nav" aria-label="Primary">${navLinks}</nav>

          <div class="header__actions">
            <div class="locpick" data-locpick>
              <button class="locpick__btn" type="button" aria-expanded="false" aria-haspopup="listbox">
                ${icon.pin}
                <span class="locpick__label" data-loc-name>${esc(current.name)}</span>
                <span class="locpick__chev">${icon.chev}</span>
              </button>
              <div class="locpick__menu" role="listbox" aria-label="Choose a restaurant">
                ${locations.map((l) => `
                  <button class="locpick__opt" type="button" role="option"
                          data-loc-set="${l.id}" aria-selected="${l.id === current.id}">
                    <span>
                      <strong>${esc(l.name)}</strong>
                      <span>${esc(l.tagline)}</span>
                    </span>
                    <span class="locpick__tick">${icon.check}</span>
                  </button>`).join('')}
              </div>
            </div>

            <a class="btn btn--primary btn--sm" href="${site.cta.href}">${site.cta.label}</a>

            <button class="burger" type="button" aria-expanded="false"
                    aria-controls="mobile-nav" aria-label="Menu"><span></span></button>
          </div>
        </div>

        <div class="mobile-nav" id="mobile-nav">
          <div class="wrap">
            ${site.nav.map((n) => {
              const active = n.href.replace('.html', '') === page;
              return `<a href="${n.href}"${active ? ' aria-current="page"' : ''}>${n.label}</a>`;
            }).join('')}
            <a class="btn btn--primary btn--block" href="${site.cta.href}">${site.cta.label}</a>
          </div>
        </div>
      </header>`;

    // Location dropdown
    const pick = $('[data-locpick]', host);
    const btn  = $('.locpick__btn', pick);
    const list = $('.locpick__menu', pick);

    const closeMenu = () => { list.dataset.open = 'false'; btn.setAttribute('aria-expanded', 'false'); };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = list.dataset.open === 'true';
      list.dataset.open = String(!open);
      btn.setAttribute('aria-expanded', String(!open));
    });
    $$('[data-loc-set]', list).forEach((opt) =>
      opt.addEventListener('click', () => { setLocation(opt.dataset.locSet); closeMenu(); }));
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    // Mobile nav
    const burger = $('.burger', host);
    const mnav   = $('.mobile-nav', host);
    burger.addEventListener('click', () => {
      const open = mnav.dataset.open === 'true';
      mnav.dataset.open = String(!open);
      burger.setAttribute('aria-expanded', String(!open));
    });
  }

  /* ---------------- Footer ---------------- */
  function renderFooter() {
    const host = $('[data-component="footer"]');
    if (!host) return;

    host.innerHTML = `
      <footer class="footer">
        <div class="wrap">
          <div class="footer__grid">
            <div class="footer__brand">
              <div class="brand">
                ${markSVG('brand__mark')}
                <span class="brand__text">
                  <span class="brand__name">The House of Ribs</span>
                  <span class="brand__sub">Family Restaurant</span>
                </span>
              </div>
              <p>Ribs, flame-grilled steaks, seafood and an all-you-can-eat carvery — served on the East Rand since the old-school days.</p>
              <div class="socials">
                <a href="${current.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.fb}</a>
                <a href="${current.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.ig}</a>
              </div>
            </div>

            <div>
              <h2>Explore</h2>
              <ul>
                ${site.nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
                <li><a href="${site.cta.href}">${site.cta.label}</a></li>
              </ul>
            </div>

            <div>
              <h2>Our restaurants</h2>
              <ul>
                ${locations.map((l) => `
                  <li class="footer__loc">
                    <strong>${esc(l.name)}</strong>
                    ${esc(l.tagline)}<br>
                    <a href="tel:${l.phoneHref}">${esc(l.phone)}</a>
                  </li>`).join('')}
              </ul>
            </div>

            <div>
              <h2>Good to know</h2>
              <ul>
                <li>${esc(site.gratuityNote)}</li>
                <li>Bookings are confirmed by phone or WhatsApp.</li>
                <li>Right of admission reserved.</li>
              </ul>
            </div>
          </div>

          <div class="footer__bottom">
            <span>&copy; ${new Date().getFullYear()} The House of Ribs. All rights reserved.</span>
            <span>${esc(site.imagesNote)}</span>
          </div>
        </div>
      </footer>`;
  }

  /* ---------------- Location-aware fragments ---------------- */

  function renderLocationAware() {
    $$('[data-loc-name]').forEach((el) => { el.textContent = current.name; });
    $$('[data-locpick] [data-loc-set]').forEach((opt) =>
      opt.setAttribute('aria-selected', String(opt.dataset.locSet === current.id)));

    renderContactPanel();
    renderBuffets();
    renderFooter();
    syncFormLocation();
  }

  /** Contact / hours panel for the currently selected restaurant. */
  function renderContactPanel() {
    $$('[data-component="contact-panel"]').forEach((host) => {
      const l = current;
      host.innerHTML = `
        <div class="card">
          <div class="loc-card__media">
            ${pic(l.image, `The House of Ribs ${l.name} storefront`)}
            <span class="badge badge--brand loc-card__badge">${esc(l.name)}</span>
          </div>
          <div class="card__body">
            <h3>${esc(l.name)}</h3>
            <p style="margin-top:.2rem">${esc(l.tagline)}</p>

            <div class="meta">
              <div class="meta__row">${icon.pin}
                <address>${esc(fullAddress(l))}</address>
              </div>
              <div class="meta__row">${icon.phone}
                <a href="tel:${l.phoneHref}">${esc(l.phone)}</a>
              </div>
              <div class="meta__row">${icon.whats}
                <a href="https://wa.me/${l.whatsappHref}" target="_blank" rel="noopener">${esc(l.whatsapp)} <span style="color:var(--muted)">(WhatsApp)</span></a>
              </div>
              <div class="meta__row">${icon.mail}
                <a href="mailto:${l.email}">${esc(l.email)}</a>
              </div>
              <div class="meta__row" style="align-items:flex-start">${icon.clock}
                <div style="flex:1">
                  <div class="hours">
                    ${l.hours.map((h) => `
                      <div class="hours__row"><span>${esc(h.days)}</span><span>${esc(h.time)}</span></div>`).join('')}
                  </div>
                </div>
              </div>
            </div>

            <div class="btn-row" style="margin-top:1.35rem">
              <a class="btn btn--ghost btn--sm" href="${mapsUrl(l)}" target="_blank" rel="noopener">Get directions</a>
              <a class="btn btn--ghost btn--sm" href="tel:${l.phoneHref}">Call now</a>
            </div>
          </div>
        </div>`;
    });
  }

  /* ---------------- Buffet ---------------- */
  function renderBuffets() {
    const host = $('[data-component="buffet-list"]');
    if (!host) return;
    const l = current;
    const available = l.buffets.map((id) => buffets[id]).filter(Boolean);

    host.innerHTML = `
      <div class="grid" style="gap:1.25rem">
        ${available.map((b) => `
          <article class="buffet-card">
            <div class="buffet-card__media">${pic(b.image, `${b.name} at The House of Ribs`)}</div>
            <div class="buffet-card__body">
              <h3>${esc(b.name)}</h3>
              <p class="buffet-card__when">${icon.clock} ${esc(b.when)}</p>
              ${b.includes ? `
                <p style="font-size:.9rem;color:var(--muted);margin-top:.9rem">
                  ${b.includes.map(esc).join(' · ')}
                </p>` : `
                <p style="font-size:.9rem;color:var(--muted);margin-top:.9rem">
                  The full carvery spread — see what's on the line below.
                </p>`}
              <div class="price-row">
                ${b.prices.map((p) => `
                  <div class="price-tile">
                    <span>${esc(p.label)}</span>
                    <strong>${esc(p.value)}</strong>
                  </div>`).join('')}
              </div>
            </div>
          </article>`).join('')}
      </div>

      ${l.buffets.length < 4 ? `
        <div class="menu-note" style="margin-top:1.5rem">
          ${icon.info}
          <span>Weekday lunch and dinner buffet sittings currently run at
          <strong>Kempton Park</strong>. ${esc(l.name)} serves the breakfast buffet daily
          and the everyday buffet over weekends. Give us a ring to double-check before you travel.</span>
        </div>` : ''}`;
  }

  /* ---------------- Locations page ---------------- */
  function renderLocations() {
    const host = $('[data-component="locations"]');
    if (!host) return;

    host.innerHTML = locations.map((l) => `
      <article class="card loc-card">
        <div class="loc-card__media">
          ${pic(l.image, `The House of Ribs ${l.name}`)}
          <span class="badge badge--brand loc-card__badge">${esc(l.tagline)}</span>
        </div>
        <div class="loc-card__body">
          <h3>${esc(l.name)}</h3>

          <div class="meta">
            <div class="meta__row">${icon.pin}<address>${esc(fullAddress(l))}</address></div>
            <div class="meta__row">${icon.phone}<a href="tel:${l.phoneHref}">${esc(l.phone)}</a></div>
            <div class="meta__row">${icon.whats}<a href="https://wa.me/${l.whatsappHref}" target="_blank" rel="noopener">${esc(l.whatsapp)}</a></div>
            <div class="meta__row">${icon.mail}<a href="mailto:${l.email}">${esc(l.email)}</a></div>
          </div>

          <div style="margin-top:1.35rem">
            <h4 style="font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:.6rem">Trading hours</h4>
            <div class="hours">
              ${l.hours.map((h) => `<div class="hours__row"><span>${esc(h.days)}</span><span>${esc(h.time)}</span></div>`).join('')}
            </div>
          </div>

          <div class="tag-row">
            ${l.features.map((f) => `<span class="tag">${esc(f)}</span>`).join('')}
          </div>

          <div class="btn-row">
            <a class="btn btn--primary btn--sm" href="reserve.html?location=${l.id}">Book a table</a>
            <a class="btn btn--ghost btn--sm" href="${mapsUrl(l)}" target="_blank" rel="noopener">Directions</a>
            <a class="btn btn--ghost btn--sm" href="contact.html?location=${l.id}">Contact</a>
          </div>
        </div>
      </article>`).join('');
  }

  /* ---------------- Contact: one form per restaurant ---------------- */
  function contactForm(l) {
    return `
      <form class="form-card" data-demo-form novalidate>
        <h2 style="font-size:clamp(1.3rem,2.3vw,1.7rem)">Message ${esc(l.name)}</h2>
        <p style="color:var(--muted);font-size:.94rem;margin-top:.5rem;margin-bottom:1.6rem">
          Questions about the menu, a booking, a function or a lost jacket — this goes
          straight to the ${esc(l.name)} restaurant.
        </p>

        <input type="hidden" name="location" value="${l.id}">

        <div class="field-row">
          <div class="field">
            <label for="c-${l.id}-name">Your name <span aria-hidden="true">*</span></label>
            <input id="c-${l.id}-name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="c-${l.id}-phone">Mobile number <span aria-hidden="true">*</span></label>
            <input id="c-${l.id}-phone" name="phone" type="tel" autocomplete="tel" required>
          </div>
        </div>

        <div class="field">
          <label for="c-${l.id}-email">Email <span aria-hidden="true">*</span></label>
          <input id="c-${l.id}-email" name="email" type="email" autocomplete="email" required>
        </div>

        <div class="field">
          <label for="c-${l.id}-subject">What's this about?</label>
          <select id="c-${l.id}-subject" name="subject">
            <option>General enquiry</option>
            <option>Booking a table</option>
            <option>Large group or function</option>
            <option>Buffet times &amp; prices</option>
            <option>Menu or dietary question</option>
            <option>Compliment or complaint</option>
            <option>Careers</option>
          </select>
        </div>

        <div class="field">
          <label for="c-${l.id}-msg">Your message <span aria-hidden="true">*</span></label>
          <textarea id="c-${l.id}-msg" name="message" required
            placeholder="Tell us how we can help…"></textarea>
        </div>

        <div class="form-notice" data-form-result hidden></div>

        <button class="btn btn--primary btn--block" type="submit">Send message</button>

        <p style="font-size:.8rem;color:var(--muted-2);margin-top:1rem;text-align:center">
          Prefer to talk? Call <a href="tel:${l.phoneHref}" style="color:var(--brand);font-weight:600">${esc(l.phone)}</a>
          or WhatsApp <a href="https://wa.me/${l.whatsappHref}" style="color:var(--brand);font-weight:600">${esc(l.whatsapp)}</a>.
        </p>
      </form>`;
  }

  function locationDetailCard(l) {
    return `
      <div class="card">
        <div class="loc-card__media">
          ${pic(l.image, `The House of Ribs ${l.name} storefront`)}
          <span class="badge badge--brand loc-card__badge">${esc(l.tagline)}</span>
        </div>
        <div class="card__body">
          <h3>${esc(l.name)}</h3>
          <div class="meta">
            <div class="meta__row">${icon.pin}<address>${esc(fullAddress(l))}</address></div>
            <div class="meta__row">${icon.phone}<a href="tel:${l.phoneHref}">${esc(l.phone)}</a></div>
            <div class="meta__row">${icon.whats}<a href="https://wa.me/${l.whatsappHref}" target="_blank" rel="noopener">${esc(l.whatsapp)} <span style="color:var(--muted)">(WhatsApp)</span></a></div>
            <div class="meta__row">${icon.mail}<a href="mailto:${l.email}">${esc(l.email)}</a></div>
          </div>

          <div style="margin-top:1.35rem">
            <h4 style="font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:.6rem">Trading hours</h4>
            <div class="hours">
              ${l.hours.map((h) => `<div class="hours__row"><span>${esc(h.days)}</span><span>${esc(h.time)}</span></div>`).join('')}
            </div>
          </div>

          <div class="btn-row" style="margin-top:1.35rem">
            <a class="btn btn--ghost btn--sm" href="${mapsUrl(l)}" target="_blank" rel="noopener">Get directions</a>
            <a class="btn btn--ghost btn--sm" href="reserve.html?location=${l.id}">Book a table</a>
          </div>
        </div>
      </div>`;
  }

  function renderContactTabs() {
    const host = $('[data-component="contact-tabs"]');
    if (!host) return;

    host.innerHTML = `
      <div class="tabs" role="tablist" aria-label="Choose a restaurant">
        ${locations.map((l) => `
          <button type="button" role="tab" id="tab-${l.id}"
                  aria-controls="panel-${l.id}"
                  aria-selected="${l.id === current.id}"
                  data-tab="${l.id}">${esc(l.name)}</button>`).join('')}
      </div>
      ${locations.map((l) => `
        <div class="tabpanel" role="tabpanel" id="panel-${l.id}"
             aria-labelledby="tab-${l.id}" ${l.id === current.id ? '' : 'hidden'}>
          <div class="split">
            ${contactForm(l)}
            ${locationDetailCard(l)}
          </div>
        </div>`).join('')}`;

    $$('[data-tab]', host).forEach((btn) =>
      btn.addEventListener('click', () => {
        setLocation(btn.dataset.tab);   // no-op when already selected
        showTab(btn.dataset.tab);
      }));

    // Keep the tabs in step when the header picker changes
    document.addEventListener('hor:location', (e) => showTab(e.detail.id));

    function showTab(id) {
      $$('[data-tab]', host).forEach((b) =>
        b.setAttribute('aria-selected', String(b.dataset.tab === id)));
      $$('.tabpanel', host).forEach((p) => { p.hidden = p.id !== `panel-${id}`; });
    }
    showTab(current.id);
  }

  function renderSocialCards() {
    const host = $('[data-component="social-cards"]');
    if (!host) return;
    host.innerHTML = locations.map((l) => `
      <div class="card">
        <div class="card__body">
          <h3>${esc(l.name)}</h3>
          <p style="margin-top:.35rem">${esc(l.tagline)}</p>
          <div class="btn-row" style="margin-top:1.15rem">
            <a class="btn btn--ghost btn--sm" href="${l.social.instagram}" target="_blank" rel="noopener">${icon.ig} Instagram</a>
            <a class="btn btn--ghost btn--sm" href="${l.social.facebook}" target="_blank" rel="noopener">${icon.fb} Facebook</a>
          </div>
        </div>
      </div>`).join('');
  }

  /* ---------------- Menu ---------------- */
  function priceBlock(item, overrides) {
    const o = overrides[item.id] || {};
    if (o.unavailable) return null;
    const prices = o.prices || item.prices;
    const price  = o.price  || item.price;

    if (prices) {
      return {
        head: '',
        sizes: `<div class="menu-item__sizes">${prices.map(
          ([label, val]) => `<span class="size-pill"><em>${esc(label)}</em><b>${esc(val)}</b></span>`).join('')}</div>`
      };
    }
    return { head: `<span class="menu-item__price">${esc(price)}</span>`, sizes: '' };
  }

  function renderMenu() {
    const host = $('[data-component="menu"]');
    if (!host) return;
    const overrides = (current.menu && current.menu.overrides) || {};

    const nav = $('[data-component="menu-nav"]');
    if (nav) {
      nav.innerHTML = `<div class="wrap"><div class="menu-nav__scroll">
        ${menu.map((s) => `<a href="#${s.id}">${esc(s.name)}</a>`).join('')}
        <a href="#drinks">Drinks</a>
      </div></div>`;
    }

    host.innerHTML = menu.map((section) => {
      let body = '';

      if (section.layout === 'chips') {
        body = section.groups.map((g) => `
          <div class="chip-group">
            <h3>${esc(g.title)}</h3>
            <div class="chips">${g.items.map((i) => `<span>${esc(i)}</span>`).join('')}</div>
          </div>`).join('');
      } else {
        const rows = section.items.map((item) => {
          const p = priceBlock(item, overrides);
          if (!p) return '';
          return `
            <div class="menu-item">
              <span class="menu-item__name">${esc(item.name)}</span>
              ${p.head}
              ${item.desc ? `<p class="menu-item__desc">${esc(item.desc)}</p>` : ''}
              ${p.sizes}
            </div>`;
        }).join('');
        body = `<div class="menu-list">${rows}</div>`;

        if (section.addons) {
          body += `
            <div class="addons">
              <h3>${esc(section.addons.title)}</h3>
              <div class="addons__grid">
                ${section.addons.items.map((a) => `
                  <div class="addons__row"><span>${esc(a.name)}</span><b>${esc(a.price)}</b></div>`).join('')}
              </div>
            </div>`;
        }
      }

      return `
        <section class="menu-section" id="${section.id}">
          <div class="menu-section__head">
            <h2>${esc(section.name)}</h2>
            ${section.note ? `<p class="note">${esc(section.note)}</p>` : ''}
          </div>
          ${body}
          ${section.footnote ? `<div class="menu-note">${icon.info}<span>${esc(section.footnote)}</span></div>` : ''}
        </section>`;
    }).join('');

    renderDrinks();
    initMenuScrollspy();
  }

  function renderDrinks() {
    const host = $('[data-component="drinks"]');
    if (!host) return;
    host.innerHTML = `
      <div class="drinks-grid">
        ${drinks.map((d) => `
          <article class="drink-card">
            <div class="drink-card__head">
              <div>
                <h3>${esc(d.name)}</h3>
                <p>${esc(d.blurb)}</p>
              </div>
              <a class="drink-card__zoom" href="${d.image}.jpg" target="_blank" rel="noopener"
                 aria-label="Open the ${esc(d.name)} menu at full size">${icon.expand} Full size</a>
            </div>
            <a class="drink-card__sheet" href="${d.image}.jpg" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
              ${pic(d.image, `${d.name} drinks menu`)}
            </a>
          </article>`).join('')}
      </div>`;
  }

  function initMenuScrollspy() {
    const nav = $('[data-component="menu-nav"]');
    if (!nav || !('IntersectionObserver' in window)) return;
    const links = $$('a', nav);
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        const link = map.get(entry.target.id);
        if (link) {
          link.classList.add('is-active');
          link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });

    $$('.menu-section, #drinks').forEach((s) => io.observe(s));
  }

  /* ---------------- Gallery ---------------- */
  function renderGallery() {
    const host = $('[data-component="gallery"]');
    if (!host) return;
    host.innerHTML = gallery.map((g) => `
      <figure${g.span === 'wide' ? ' class="is-wide"' : ''}>
        ${pic(g.src, g.alt)}
      </figure>`).join('');
  }

  /* ---------------- Buffet extras ---------------- */
  function renderCarverySpread() {
    const host = $('[data-component="carvery-spread"]');
    if (host) host.innerHTML = carverySpread.map((i) => `<span>${esc(i)}</span>`).join('');

    const terms = $('[data-component="buffet-terms"]');
    if (terms) terms.innerHTML = buffetTerms.map((t) => `<li>${esc(t)}</li>`).join('');
  }

  /* ---------------- Forms ---------------- */

  /** Keep any location <select> in step with the header picker. */
  function syncFormLocation() {
    $$('select[data-loc-select]').forEach((sel) => {
      if (sel.dataset.userTouched === 'true') return;
      sel.value = current.id;
    });
  }

  function initForms() {
    $$('select[data-loc-select]').forEach((sel) => {
      sel.innerHTML = locations.map((l) =>
        `<option value="${l.id}">${esc(l.name)} — ${esc(l.tagline)}</option>`).join('');
      sel.value = current.id;
      sel.addEventListener('change', () => {
        sel.dataset.userTouched = 'true';
        setLocation(sel.value);
      });
    });

    // Deep link: ?location=edenvale
    const wanted = new URLSearchParams(location.search).get('location');
    if (wanted && locations.some((l) => l.id === wanted)) setLocation(wanted);

    // The forms are presentational for now — nothing is transmitted.
    $$('form[data-demo-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = $('[data-form-result]', form);
        if (!note) return;
        note.hidden = false;
        note.innerHTML = `${icon.info}
          <span><strong>This form isn't connected yet.</strong>
          Nothing has been sent. To reach ${esc(current.name)} right now, call
          <a href="tel:${current.phoneHref}" style="color:inherit;text-decoration:underline">${esc(current.phone)}</a>
          or WhatsApp <a href="https://wa.me/${current.whatsappHref}" style="color:inherit;text-decoration:underline">${esc(current.whatsapp)}</a>.</span>`;
        note.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    });
  }

  /* ---------------- Boot ---------------- */
  function init() {
    renderHeader();
    renderLocations();
    renderMenu();
    renderGallery();
    renderCarverySpread();
    renderContactTabs();
    renderSocialCards();
    initForms();             // may deep-link a location via ?location=
    renderLocationAware();   // contact panel, buffets, footer

    // Year stamp for any static markup that wants it
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
