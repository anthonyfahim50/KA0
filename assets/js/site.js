/* ==========================================================================
   KAPPA ALPHA THETA — ETA OMEGA — SITE SCRIPT
   --------------------------------------------------------------------------
   One file powers shared chrome + interactivity across every page:
     • SITE config (edit chapter info & nav in ONE place)
     • Injects the navigation bar and footer into every page
     • Mobile nav, sticky-shadow, scroll-reveal, accordion
     • Hero carousel, animated fundraising tracker, count-up stats
   No build step, no dependencies. Pages just include this file.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. SITE CONFIG  —  the chapter's editable control panel
   -------------------------------------------------------------------------- */
const SITE = {
  chapterGreek: "Kappa Alpha Theta",
  chapterName: "Eta Omega Chapter",
  school: "Saint Louis University",
  motto: "Leading Women",
  founded: "1870",            // Theta's founding at DePauw University
  email: "etaomega@kappaalphatheta.org",
  instagram: "https://www.instagram.com/slukappaalphatheta",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/",
  donateUrl: "philanthropy.html#give",   // replace with your CASA fundraising page
  logo: "assets/img/theta-kite.svg",
  crest: "assets/img/theta-crest.png",

  // Primary navigation. Add a page = add a line here. `donate:true` = highlight.
  nav: [
    { label: "Home",          href: "index.html" },
    { label: "About",         href: "about.html" },
    { label: "Sisterhood",    href: "sisterhood.html" },
    { label: "Philanthropy",  href: "philanthropy.html" },
    { label: "Membership",    href: "membership.html" },
    { label: "Alumnae",       href: "alumnae.html" },
    { label: "Contact",       href: "contact.html" },
  ],

  // Footer link columns
  footerExplore: [
    { label: "About the Chapter", href: "about.html" },
    { label: "Sisterhood",        href: "sisterhood.html" },
    { label: "Leadership",        href: "about.html#leadership" },
    { label: "Academics",         href: "about.html#academics" },
  ],
  footerEngage: [
    { label: "Theta for CASA",    href: "philanthropy.html" },
    { label: "Join Theta",        href: "membership.html" },
    { label: "Alumnae Resources", href: "alumnae.html" },
    { label: "Contact Us",        href: "contact.html" },
  ],
};

/* --------------------------------------------------------------------------
   2. ICONS  —  small inline SVG set
   -------------------------------------------------------------------------- */
const ICON = {
  arrow: '<svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V5.5h-3c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.5h2.5V22h3.5v-7.5h2.7l.5-3.5H14V9.3c0-.5.2-.8.9-.8z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.5v11H3v-11zM4.7 3a2 2 0 110 4 2 2 0 010-4zM21 19.5h-3.5v-5.6c0-1.5-.6-2.3-1.8-2.3-1 0-1.6.7-1.8 1.4-.1.2-.1.6-.1 1v5.5H10s.1-9.9 0-11h3.5v1.6c.5-.8 1.3-1.9 3.2-1.9 2.3 0 4.1 1.5 4.1 4.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
};

/* --------------------------------------------------------------------------
   3. RENDER NAV + FOOTER
   -------------------------------------------------------------------------- */
function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderNav() {
  const mount = document.querySelector("[data-nav]");
  if (!mount) return;
  const here = currentPage();
  const links = SITE.nav.map((item) => {
    const active = item.href === here ? ' aria-current="page"' : "";
    return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;
  }).join("");

  mount.innerHTML = `
    <nav class="site-nav" aria-label="Primary">
      <div class="nav-inner">
        <a class="nav-brand" href="index.html" aria-label="${SITE.chapterGreek} — ${SITE.chapterName} home">
          <img src="${SITE.logo}" alt="" width="46" height="46" />
          <span class="nav-brand__text">
            <span class="nav-brand__greek">&Kappa;&Alpha;&Theta;</span>
            <span class="nav-brand__sub">Eta Omega</span>
          </span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">${links}</ul>
        <a class="btn btn--primary nav-cta" href="${SITE.donateUrl}">Support CASA ${ICON.arrow}</a>
      </div>
    </nav>`;

  // Mobile toggle
  const toggle = mount.querySelector(".nav-toggle");
  const list = mount.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    list.classList.toggle("is-open", !open);
    document.body.style.overflow = !open ? "hidden" : "";
  });
  list.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      list.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );

  // Sticky shadow
  const navEl = mount.querySelector(".site-nav");
  const onScroll = () => navEl.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function renderFooter() {
  const mount = document.querySelector("[data-footer]");
  if (!mount) return;
  const year = new Date().getFullYear();
  const col = (items) => items.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join("");

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container container--wide">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-brand__mark">
              <img src="${SITE.crest}" alt="${SITE.chapterGreek} crest" width="54" />
              <div class="nav-brand__text">
                <span class="nav-brand__greek" style="color:#fff">Kappa Alpha Theta</span>
                <span class="nav-brand__sub" style="color:var(--color-gold-light)">Eta Omega &middot; SLU</span>
              </div>
            </div>
            <p class="footer-motto">${SITE.motto}</p>
            <p>The Eta Omega Chapter of Kappa Alpha Theta at ${SITE.school} — empowering women through sisterhood, scholarship, and service.</p>
            <div class="footer-social">
              <a href="${SITE.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ICON.instagram}</a>
              <a href="${SITE.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ICON.facebook}</a>
              <a href="${SITE.linkedin}" aria-label="LinkedIn" target="_blank" rel="noopener">${ICON.linkedin}</a>
              <a href="mailto:${SITE.email}" aria-label="Email">${ICON.mail}</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>${col(SITE.footerExplore)}</ul>
          </div>
          <div class="footer-col">
            <h4>Get Involved</h4>
            <ul>${col(SITE.footerEngage)}</ul>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li><a href="contact.html">Saint Louis University<br>St. Louis, Missouri</a></li>
            </ul>
            <a class="btn btn--gold" href="${SITE.donateUrl}" style="margin-top:1rem">Donate to CASA ${ICON.arrow}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} Kappa Alpha Theta — Eta Omega Chapter. All rights reserved.</span>
          <span>Not an official publication of Kappa Alpha Theta Fraternity or ${SITE.school}.</span>
        </div>
      </div>
    </footer>`;
}

/* --------------------------------------------------------------------------
   4. HERO CAROUSEL
   -------------------------------------------------------------------------- */
function initCarousel() {
  const hero = document.querySelector("[data-carousel]");
  if (!hero) return;
  const slides = [...hero.querySelectorAll(".hero__slide")];
  const dots = [...hero.querySelectorAll(".hero__dot")];
  if (slides.length < 2) return;
  let i = 0;
  let timer;

  const go = (n) => {
    slides[i].classList.remove("is-active");
    dots[i]?.classList.remove("is-active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("is-active");
    dots[i]?.classList.add("is-active");
  };
  const start = () => (timer = setInterval(() => go(i + 1), 6000));
  const stop = () => clearInterval(timer);

  dots.forEach((d, idx) => d.addEventListener("click", () => { stop(); go(idx); start(); }));
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
}

/* --------------------------------------------------------------------------
   5. SCROLL REVEAL + COUNT-UP (shared IntersectionObserver)
   -------------------------------------------------------------------------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = (el.dataset.count.split(".")[1] || "").length;
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = (target * eased).toFixed(decimals);
    el.textContent = prefix + Number(val).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initObservers() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      e.target.querySelectorAll?.("[data-count]").forEach(animateCount);
      if (e.target.matches?.("[data-count]")) animateCount(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal, [data-count]").forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   6. FUNDRAISING TRACKER  (animates the bar fill on scroll)
   -------------------------------------------------------------------------- */
function initTracker() {
  const tracker = document.querySelector("[data-tracker]");
  if (!tracker) return;
  const raised = parseFloat(tracker.dataset.raised || "0");
  const goal = parseFloat(tracker.dataset.goal || "1");
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const fill = tracker.querySelector(".tracker__fill");
  const pctEl = tracker.querySelector("[data-tracker-pct]");

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      requestAnimationFrame(() => { fill.style.width = pct + "%"; });
      if (pctEl) { pctEl.dataset.count = String(pct); pctEl.dataset.suffix = "%"; animateCount(pctEl); }
      obs.disconnect();
    });
  }, { threshold: 0.4 });
  io.observe(tracker);
}

/* --------------------------------------------------------------------------
   7. ACCORDION (FAQ)
   -------------------------------------------------------------------------- */
function initAccordion() {
  document.querySelectorAll(".accordion__btn").forEach((btn) => {
    const panel = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.style.maxHeight = open ? "0" : panel.scrollHeight + "px";
    });
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT / JOIN FORM (front-end only demo handler)
   -------------------------------------------------------------------------- */
function initForms() {
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector("[data-form-note]");
      if (note) {
        note.hidden = false;
        note.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });
}

/* --------------------------------------------------------------------------
   9. 3D KITE LOGO  (three.js via CDN — progressive enhancement)
   --------------------------------------------------------------------------
   Mounts a spinning, bevel-extruded Kappa Alpha Theta kite into every
   [data-logo3d] element. Runs only on fine-pointer devices without reduced
   motion; otherwise the static fallback <img> is left in place. three.js is
   imported on demand so phones never pay for it. Mirrors the chapter's
   signature 3D moment.
   -------------------------------------------------------------------------- */
async function initLogo3D() {
  const mounts = [...document.querySelectorAll("[data-logo3d]")];
  if (!mounts.length) return;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return; // leave the static fallback image in place

  let THREE;
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js");
  } catch {
    return; // offline / blocked — the fallback image already shows
  }
  mounts.forEach((mount) => buildLogo3D(THREE, mount));
}

function buildLogo3D(THREE, mount) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return; // no WebGL — fallback image stays
  }

  const shape = mount.dataset.shape || "kite";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 8;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(1, 1); // real size comes from ResizeObserver
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  mount.appendChild(renderer.domElement);
  const fallback = mount.querySelector(".logo3d__fallback");
  if (fallback) fallback.style.visibility = "hidden";

  const disposables = [];
  const spinner = new THREE.Group(); // spins on Y
  const group = new THREE.Group(); // tilts toward pointer + bobs
  group.add(spinner);
  scene.add(group);

  if (shape === "disc") {
    // Coin: white faces with a logo composited on, colored rim. Used for the
    // CASA badge on the Philanthropy page (mirrors the kite elsewhere).
    const r = 2.4, depth = 0.34;
    const faceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.15, roughness: 0.5 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xd81e27, metalness: 0.45, roughness: 0.35 }); // CASA red

    const img = new Image();
    img.onload = () => {
      const size = 1024;
      const cv = document.createElement("canvas");
      cv.width = cv.height = size;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      const scale = (size * 0.74) / Math.max(img.width, img.height);
      const w = img.width * scale, h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      faceMat.map = tex;
      faceMat.needsUpdate = true;
      disposables.push(tex);
    };
    img.src = mount.dataset.texture || "assets/img/casa-mark.jpg";

    const front = new THREE.CircleGeometry(r, 64);
    const back = new THREE.CircleGeometry(r, 64);
    const rim = new THREE.CylinderGeometry(r, r, depth, 64, 1, true);
    rim.rotateX(Math.PI / 2);
    const frontMesh = new THREE.Mesh(front, faceMat); frontMesh.position.z = depth / 2;
    const backMesh = new THREE.Mesh(back, faceMat); backMesh.position.z = -depth / 2; backMesh.rotation.y = Math.PI;
    const rimMesh = new THREE.Mesh(rim, rimMat);
    spinner.add(frontMesh, backMesh, rimMesh);
    disposables.push(front, back, rim, faceMat, rimMat);
  } else {
    // Kite silhouette (Theta's mark): wide upper shoulders, long lower point.
    const S = 1.5;
    const P = { topY: 1.15, sideX: 0.72, sideY: 0.42, botY: -1.35 };
    const kite = new THREE.Shape();
    kite.moveTo(0, P.topY * S);
    kite.lineTo(P.sideX * S, P.sideY * S);
    kite.lineTo(0, P.botY * S);
    kite.lineTo(-P.sideX * S, P.sideY * S);
    kite.closePath();

    const geometry = new THREE.ExtrudeGeometry(kite, {
      depth: 0.4, bevelEnabled: true, bevelThickness: 0.09, bevelSize: 0.09, bevelSegments: 4,
    });
    geometry.center();

    // ExtrudeGeometry UVs are shape-space coords; remap the kite art across the
    // shape's bounding box so the emblem lands inside the silhouette.
    const xmin = -P.sideX * S, W = 2 * P.sideX * S;
    const ymin = P.botY * S, H = (P.topY - P.botY) * S;

    const faceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.25, roughness: 0.5 });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xc9a227, metalness: 0.7, roughness: 0.32 }); // gold rim
    spinner.add(new THREE.Mesh(geometry, [faceMat, sideMat]));
    disposables.push(geometry, faceMat, sideMat);

    // Kite SVG → composited onto a dark canvas (same-origin draws cleanly).
    const img = new Image();
    img.onload = () => {
      const cw = 600, ch = Math.round(cw * (H / W));
      const cv = document.createElement("canvas");
      cv.width = cw; cv.height = ch;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "#161616";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, cw, ch);
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.repeat.set(1 / W, 1 / H);
      tex.offset.set(-xmin / W, -ymin / H);
      faceMat.map = tex;
      faceMat.needsUpdate = true;
      disposables.push(tex);
    };
    img.src = mount.dataset.texture || "assets/img/theta-kite.svg";
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(4, 5, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.85); fill.position.set(-4, 2, 5); scene.add(fill);
  const rimLight = new THREE.DirectionalLight(shape === "disc" ? 0xff8a80 : 0xe2c988, 1.0); rimLight.position.set(-5, -2, -4); scene.add(rimLight);

  let targetTiltX = 0, targetTiltY = 0;
  const onPointer = (e) => {
    const rect = mount.getBoundingClientRect();
    targetTiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
    targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.45;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // Hover brakes the spin; dragging across scrubs it and flicks momentum.
  const BASE_SPEED = 0.45, MAX_FLICK = 4;
  let spinVelocity = BASE_SPEED, spinDirection = 1, hovering = false, lastDragX = null, lastDragTime = 0;
  const onEnter = () => { hovering = true; lastDragX = null; };
  const onLeave = () => { hovering = false; lastDragX = null; if (spinVelocity !== 0) spinDirection = Math.sign(spinVelocity); };
  const onDrag = (e) => {
    if (!hovering) return;
    if (lastDragX !== null) {
      const dx = e.clientX - lastDragX;
      const dtSec = (e.timeStamp - lastDragTime) / 1000;
      spinner.rotation.y += dx * 0.012;
      if (dtSec > 0) spinVelocity = THREE.MathUtils.clamp((dx * 0.012) / dtSec, -MAX_FLICK, MAX_FLICK);
    }
    lastDragX = e.clientX; lastDragTime = e.timeStamp;
  };
  mount.addEventListener("pointerenter", onEnter);
  mount.addEventListener("pointerleave", onLeave);
  mount.addEventListener("pointermove", onDrag, { passive: true });

  const resize = () => {
    const w = mount.clientWidth, h = mount.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(mount);

  const clock = new THREE.Clock();
  const tick = () => {
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.getElapsedTime();
    if (hovering) spinVelocity += (0 - spinVelocity) * Math.min(1, dt * 6);
    else spinVelocity += (BASE_SPEED * spinDirection - spinVelocity) * Math.min(1, dt * 1.5);
    spinner.rotation.y += spinVelocity * dt;
    group.position.y = Math.sin(t * 0.8) * 0.12;
    group.rotation.x += (targetTiltX - group.rotation.x) * 0.05;
    group.rotation.y += (targetTiltY - group.rotation.y) * 0.05;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* --------------------------------------------------------------------------
   10. VALUES SHOWCASE (membership) — crossfade value columns ⇄ group photo
   -------------------------------------------------------------------------- */
function initValuesShowcase() {
  const el = document.querySelector("[data-values-showcase]");
  if (!el) return;
  const grid = el.querySelector(".values-grid");
  const photo = el.querySelector(".values-photo");
  if (!grid || !photo) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let showPhoto = false;
  const tick = () => {
    showPhoto = !showPhoto;
    grid.classList.toggle("is-hidden", showPhoto);
    photo.classList.toggle("is-visible", showPhoto);
    setTimeout(tick, showPhoto ? 3500 : 8000); // values hold longer than the photo
  };
  setTimeout(tick, 8000);
}

/* --------------------------------------------------------------------------
   11. RIVER TIMELINE (alumnae) — draw the winding river as you scroll past it.
   The path uses pathLength="1", so dash units are normalized and the draw is
   robust to the stretched (preserveAspectRatio="none") viewBox.
   -------------------------------------------------------------------------- */
function initRiverTimeline() {
  const el = document.querySelector("[data-river]");
  if (!el) return;
  const current = el.querySelector(".river__current");
  if (!current) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    current.style.strokeDashoffset = "0"; // pre-drawn, no scroll animation
    return;
  }
  const update = () => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const denom = Math.max(1, rect.height - vh * 0.12);
    const p = Math.min(1, Math.max(0, (vh * 0.78 - rect.top) / denom));
    current.style.strokeDashoffset = String(1 - p);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  initCarousel();
  initObservers();
  initTracker();
  initAccordion();
  initForms();
  initLogo3D();
  initValuesShowcase();
  initRiverTimeline();

  // Update any element tagged with the current year
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
