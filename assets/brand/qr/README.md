# QR codes

All of these encode:

```
https://house-of-ribs-website.vercel.app
```

## Which file to use

| File | Use it for |
|---|---|
| `qr-table-card.png` | **Table cards.** A6 at 300dpi (1240×1748), print-ready as-is. |
| `qr-brand.png` | Brand red on white, logo in the centre. Posters, menus, social. |
| `qr-brand-cream.png` | Charcoal on cream. Same, for warmer backgrounds. |
| `qr-plain.svg` / `.png` | Charcoal on white, no logo. Clean and neutral. |
| `qr-mono.svg` / `.png` | Pure black on white. **Use this when in doubt** — newspapers, fax-quality printers, photocopies, engraving, vinyl. |

Use the **SVG** whenever the printer accepts it: it's vector, so it stays sharp at any
size. The PNGs are 1800×1800, enough for anything up to roughly A4.

## Printing it so it actually scans

- **Minimum size: 2cm × 2cm.** Below that, phone cameras start to struggle. 3–4cm is
  comfortable for a table card; a window decal or poster wants 8cm+.
- **Keep the white margin.** The empty border around the code is part of the code — it's
  how a scanner finds the edges. Don't crop it or let artwork bleed into it.
- **Don't invert it.** Dark modules on a light background only. A light-on-dark version
  fails on most scanners — that's tested, not theoretical.
- **Don't stretch it.** Scale both dimensions equally.
- **Test a real print** before ordering a thousand of them. Scan it with an actual phone,
  under the lighting it'll live in.

## If the URL changes

These are static codes — the URL is baked into the pattern, so a new address means new
files. Regenerate with [segno](https://segno.readthedocs.io):

```bash
pip install segno
python -c "import segno; segno.make('https://YOUR-URL', error='h').save('qr.svg', scale=10, border=4, dark='#17120F', light='#FFFFFF')"
```

`error='h'` is the highest error-correction level. It's what lets the centre logo sit on
top without breaking the code, so keep it if you're overlaying anything.

If you expect the address to change again — say, once a proper domain is bought — consider
pointing these at a short URL you control and redirecting from there. Then anything already
printed keeps working.

## Verified

Every file was decoded back after generation and confirmed to resolve to the URL above,
including when scaled down to 150px, softened as if photographed slightly out of focus,
and washed out to simulate a weak print.
