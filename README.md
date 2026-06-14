# Kappa Alpha Theta — Eta Omega — Chapter Website

The digital home of the **Eta Omega Chapter of Kappa Alpha Theta** at Saint Louis University.

> **Leading Women.**

Built as a **framework-free static site** — no build step, no dependencies, no server required. It opens in any browser and hosts for free on GitHub Pages, Netlify, Cloudflare Pages, or any web host. That makes it durable and easy for future chapter members to maintain for years.

---

## Quick start

Just open `index.html` in a browser. To preview with a local server (recommended, so fonts/relative paths behave exactly like production):

```bash
cd "TKE - EA/theta-eta-omega"
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish: push the folder to a GitHub repo and enable **GitHub Pages** (Settings → Pages → deploy from branch), or drag the folder into [Netlify Drop](https://app.netlify.com/drop).

---

## Project structure

```
theta-eta-omega/
├── index.html          Homepage (hero carousel, tracker, events, alumnae, sponsors)
├── about.html          History, mission, values, leadership, academics
├── sisterhood.html     Sisterhood life, traditions, members
├── philanthropy.html   ★ Theta for CASA — the philanthropy hub
├── membership.html     Recruitment, why join, interest form, professional dev
├── alumnae.html        Alumnae engagement, spotlights, giving, stay-in-touch
├── contact.html        Contact form + chapter contacts
├── assets/
│   ├── css/
│   │   ├── styles.css       Entrypoint (imports the four files below)
│   │   ├── tokens.css       ★ ALL branding lives here (colors, fonts, spacing)
│   │   ├── base.css         Reset, typography, layout primitives
│   │   ├── components.css   Buttons, nav, footer, cards, stats
│   │   └── sections.css     Hero, carousel, tracker, timeline, CTA bands
│   ├── js/
│   │   └── site.js          ★ SITE config + nav/footer injection + interactivity
│   └── img/
│       ├── theta-kite.svg       Black & gold kite mark (used as logo/favicon)
│       ├── theta-kite.png       Kite mark, raster version
│       ├── theta-crest.png      Coat-of-arms crest (hero + footer)
│       ├── hero-madison.jpg     Hero slide 1  (placeholder Theta photo)
│       ├── hero-annarbor.jpg    Hero slide 2  (placeholder Theta photo)
│       ├── hero-cottage.jpg     Hero slide 3  (placeholder Theta photo)
│       ├── house-ncstate.jpg    Section photo (placeholder)
│       ├── house-ups.jpg        Section photo (placeholder)
│       └── historic-1900s.jpg   Section photo (placeholder)
└── README.md
```

★ = the files you'll edit most often.

---

## Brand & imagery notes

- **Colors** are Theta black & gold, defined in `assets/css/tokens.css` (`--color-theta`, `--color-gold`). Change a value there and it cascades site-wide.
- **The kite and crest** in `assets/img/` are the official Kappa Alpha Theta marks.
- **The photos** (`hero-*.jpg`, `house-*.jpg`, `historic-1900s.jpg`) are **placeholder Kappa Alpha Theta images** pulled from Wikimedia Commons so the slideshow and section blocks look complete. **Replace them with your own chapter photos** before going live — keep the same filenames and they'll drop straight in.
- **Member, alumnae, and sponsor photos** are still striped `.ph` placeholders, since those should be real people. Swap each `<div class="ph">…</div>` for `<img src="assets/img/your-photo.jpg" alt="…" />`.

---

## Interactive features

- **3D spinning logo** — every page mounts a real-time 3D mark in its hero / page-header that spins, bobs, tilts toward the cursor, and can be flicked. Built with [three.js](https://threejs.org) loaded on demand from a CDN — no build step. Runs only on fine-pointer devices without `prefers-reduced-motion`; otherwise a static image shows. Two shapes, set with `data-shape` on the mount (`initLogo3D` / `buildLogo3D` in `assets/js/site.js`):
  - **kite** (default) — the bevel-extruded, gold-rimmed Theta kite with the emblem on its face. Mount: `<div class="logo3d" data-logo3d><img class="logo3d__fallback" src="assets/img/theta-kite.svg" alt=""></div>`.
  - **disc** — a coin with a logo on white faces and a colored rim. The **Philanthropy** page uses this for the **CASA** mark: `data-logo3d data-shape="disc" data-texture="assets/img/casa-mark.jpg"`.
- **Rolling slideshow** (sisterhood page) — a continuously rolling, edge-faded marquee of sister photos (`.photo-marquee`, pure CSS, pauses on hover). Swap the photos in `sisterhood.html`; it's two identical halves looping seamlessly.
- **River timeline** (alumnae page) — a winding gold "river" that draws itself as you scroll, with milestones surfacing left and right (year, text, tilted photo). Edit the milestones in `alumnae.html`; scroll-draw logic is `initRiverTimeline` in `assets/js/site.js`.
- **Values showcase** (membership page) — three vertical columns spell out **Scholarship · Service · Sisterhood** letter-by-letter over their faint definitions, then crossfade to a chapter group photo and back on a loop. Edit the words/definitions in `membership.html` and the crossfade timing in `initValuesShowcase` (`assets/js/site.js`).
- **Instagram** — set to **[@slukappaalphatheta](https://www.instagram.com/slukappaalphatheta)** (footer social icon + Contact page). Change it once in `SITE.instagram` in `assets/js/site.js`.

---

## How to customize

### 1. Branding (colors, fonts, spacing)
Open **`assets/css/tokens.css`**. Everything is a named variable. Example:

```css
--color-theta: #1F1F1F;   /* Theta black — primary brand */
--color-gold:  #D4A82B;   /* Theta kite gold accent */
```

### 2. Chapter info, navigation & footer
Open **`assets/js/site.js`** and edit the `SITE` object at the top — email, social links, the donation URL, and the navigation/footer links. The nav and footer are generated from here and injected into **every page**.

### 3. Hero slideshow
Swap the three photos in `assets/css/sections.css` (`.hero__slide--1`, `--2`, `--3`) — or replace the files `hero-madison.jpg` / `hero-annarbor.jpg` / `hero-cottage.jpg` in `assets/img/` directly.

### 4. The fundraising tracker
On `index.html` and `philanthropy.html`, find the element with `data-tracker`:

```html
<div class="tracker" data-tracker data-raised="62450" data-goal="75000">
```

Update `data-raised` and `data-goal` — the bar fill and percentage animate automatically. Also update the visible `$62,450` and `$75,000` text next to it.

### 5. Forms
The interest/contact/alumnae forms are front-end demos (they show a thank-you note but don't send anywhere yet). To receive submissions, point each `<form>` at a service like **Formspree**, **Google Forms**, or **Netlify Forms** — e.g. add `action="https://formspree.io/f/XXXX" method="POST"` and remove the `data-demo-form` attribute.

---

## How to add a new page

1. Copy any interior page (e.g. `sisterhood.html`) to `yourpage.html`.
2. Update the `<title>`, meta description, page-header text, and content.
3. Add it to the navigation by adding one line to `SITE.nav` in `assets/js/site.js`:
   ```js
   { label: "Events", href: "events.html" },
   ```

The shared nav, footer, fonts, and styling come along automatically.

---

## Notes
- Accessibility: semantic landmarks, skip link, keyboard-operable nav/accordion, `prefers-reduced-motion` respected, alt text on meaningful images.
- The placeholder photos and stat figures are illustrative — **replace them with your chapter's real photos and numbers** before going live.
- This is a chapter site and **not an official publication of Kappa Alpha Theta Fraternity or Saint Louis University** (noted in the footer).
