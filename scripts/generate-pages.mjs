import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://nira-9pc.pages.dev";

const countries = [
  {
    slug: "mexico",
    name: "Mexico",
    title: "Dental Care in Mexico",
    lede: "Premium clinics, quick travel from the U.S., and strong value for major restorative and cosmetic dental work.",
    savings: "50-70%",
    timeline: "5-10 days",
    travel: "Shortest travel window",
    bestFor: "Veneers, crowns, implants, full-mouth restoration, and All-on-4 planning.",
    why: [
      "Strong access from major U.S. airports.",
      "Large selection of experienced private clinics.",
      "Good fit for patients who want lower travel friction.",
    ],
    cost: {
      veneers: "$400 - $750 per tooth",
      crowns: "$450 - $850 per tooth",
      implants: "$1,400 - $2,100 per implant",
      full: "$12,500 - $21,000 per case",
    },
  },
  {
    slug: "costa-rica",
    name: "Costa Rica",
    title: "Dental Care in Costa Rica",
    lede: "A premium dental travel option for patients who value accredited clinics, restorative expertise, and a calmer recovery setting.",
    savings: "45-65%",
    timeline: "6-12 days",
    travel: "Premium recovery setting",
    bestFor: "Full-mouth restorations, crowns, implants, and planned smile makeovers.",
    why: [
      "Known for international dental tourism infrastructure.",
      "Strong appeal for recovery-focused travel.",
      "Good fit for planned multi-service cases.",
    ],
    cost: {
      veneers: "$500 - $850 per tooth",
      crowns: "$550 - $950 per tooth",
      implants: "$1,600 - $2,300 per implant",
      full: "$14,500 - $23,000 per case",
    },
  },
  {
    slug: "colombia",
    name: "Colombia",
    title: "Dental Care in Colombia",
    lede: "A strong value destination for smile design and restorative care, with experienced specialists in major cities.",
    savings: "55-75%",
    timeline: "6-12 days",
    travel: "Strong value profile",
    bestFor: "Veneers, crowns, implants, and comprehensive smile makeovers.",
    why: [
      "Competitive pricing across premium private clinics.",
      "Specialist depth in major dental centers.",
      "Good fit for patients comfortable with a longer trip.",
    ],
    cost: {
      veneers: "$400 - $650 per tooth",
      crowns: "$450 - $750 per tooth",
      implants: "$1,300 - $1,900 per implant",
      full: "$11,000 - $19,000 per case",
    },
  },
];

const services = [
  {
    slug: "veneers",
    name: "Veneers",
    title: "Veneer Treatment Abroad",
    lede: "Compare natural-looking veneer options with vetted providers abroad and a guided travel plan.",
    ideal: "Best for patients improving tooth shape, shade, spacing, or visible smile balance.",
    timeline: "Usually 5-7 days for planning, preparation, fitting, and final review.",
    price: "From $400 - $850 per tooth abroad, depending on country, material, and case complexity.",
    faqs: [
      "Most patients choose 6-10 veneers for the visible smile zone.",
      "Premium ceramic options are recommended for natural translucency and durability.",
    ],
  },
  {
    slug: "crowns",
    name: "Crowns",
    title: "Crowns Abroad",
    lede: "Explore crown options for damaged, restored, or cosmetically improved teeth with transparent pricing by destination.",
    ideal: "Best for structurally compromised teeth, older dental work, or cosmetic-restorative improvements.",
    timeline: "Often 5-7 days for digital planning, preparation, temporary placement, and final crown delivery.",
    price: "From $450 - $950 per crown abroad, compared with materially higher U.S. quotes.",
    faqs: [
      "Crowns are often combined with veneers or implants in broader smile plans.",
      "Material selection changes both cost and long-term appearance.",
    ],
  },
  {
    slug: "implants",
    name: "Implants",
    title: "Dental Implants Abroad",
    lede: "Plan implant treatment abroad with a clear view of cost, timeline, travel needs, and follow-up considerations.",
    ideal: "Best for replacing missing teeth or supporting bridges and larger restorations.",
    timeline: "Often 7-10 days for first-stage work, with some cases split into two trips.",
    price: "From $1,300 - $2,300 per implant abroad, excluding case-specific grafting or restoration needs.",
    faqs: [
      "Some implant cases require healing time before final crowns.",
      "Full-arch options may follow a different timeline than single implants.",
    ],
  },
  {
    slug: "full-mouth-restoration",
    name: "Full-Mouth Restoration",
    title: "Full-Mouth Restoration Abroad",
    lede: "Compare comprehensive restorative treatment plans that combine crowns, implants, veneers, or full-arch solutions.",
    ideal: "Best for patients with multiple failing teeth, extensive wear, or a complete restorative treatment plan.",
    timeline: "Usually 10-14 days for major single-trip cases, though implant staging can require follow-up.",
    price: "From $11,000 - $23,000 abroad for many major cases, depending on destination and complexity.",
    faqs: [
      "This page is for planned comprehensive cases, not urgent dental emergencies.",
      "Nira helps compare treatment plans, travel needs, and provider fit before a patient commits.",
    ],
  },
  {
    slug: "smile-makeovers",
    name: "Smile Makeovers",
    title: "Smile Makeovers Abroad",
    lede: "Coordinate multi-service smile transformations with transparent options for destination, timeline, and provider match.",
    ideal: "Best for patients combining cosmetic and restorative goals into one guided treatment journey.",
    timeline: "Often 7-10 days depending on whether veneers, crowns, whitening, implants, or gum contouring are included.",
    price: "From $3,800 - $11,500 abroad for many planned smile makeover cases.",
    faqs: [
      "Smile makeovers vary widely because every treatment plan combines different services.",
      "A reviewed quote or treatment plan gives the most accurate comparison.",
    ],
  },
];

const articles = [
  {
    slug: "dental-care-abroad-costs",
    title: "How Much Does Dental Care Abroad Cost?",
    description: "A practical guide to what changes pricing, why quotes vary, and how to compare U.S. and international options.",
    category: "Costs",
    body: [
      "Dental care abroad is not one fixed price. The final range depends on the treatment type, materials, provider experience, destination, case complexity, and travel plan.",
      "The largest savings usually appear in comprehensive cases such as implants, full-mouth restoration, and multi-tooth cosmetic work. Small single-tooth cases may still save money, but travel costs matter more.",
      "A strong comparison should include the clinical quote, travel costs, number of days away, follow-up plan, and whether the provider has experience with international patients.",
    ],
  },
  {
    slug: "is-dental-care-abroad-safe",
    title: "Is Dental Care Abroad Safe?",
    description: "What patients should check before choosing a destination clinic, provider, or dental travel coordinator.",
    category: "Safety",
    body: [
      "Dental care abroad can be safe when patients work with licensed providers, modern clinics, clear treatment plans, and appropriate follow-up expectations.",
      "The important checks are provider credentials, diagnostic process, material quality, sterilization standards, treatment sequencing, communication, and aftercare planning.",
      "Nira is positioned as a coordination service, not a clinical provider. That distinction should stay clear across the site and all lead flows.",
    ],
  },
  {
    slug: "how-to-plan-dental-travel",
    title: "How to Plan a Dental Travel Trip",
    description: "A step-by-step look at quote review, virtual consults, travel timing, recovery, and aftercare.",
    category: "Planning",
    body: [
      "The best dental travel plans begin with records: current quote, X-rays, photos, health history, and the goals the patient wants to achieve.",
      "After review, patients should compare destination options, number of visits, expected days in-country, recovery needs, payment timing, and follow-up responsibilities.",
      "A thoughtful coordinator can reduce friction by aligning provider fit, travel logistics, and patient expectations before a trip is booked.",
    ],
  },
];

const routes = [
  { path: "/", priority: "1.0" },
  { path: "/compare", priority: "0.9" },
  { path: "/services", priority: "0.9" },
  ...services.map((service) => ({ path: `/services/${service.slug}`, priority: "0.8" })),
  ...countries.map((country) => ({ path: `/countries/${country.slug}`, priority: "0.8" })),
  { path: "/calculator", priority: "0.85" },
  { path: "/contact", priority: "0.85" },
  { path: "/insights", priority: "0.75" },
  ...articles.map((article) => ({ path: `/insights/${article.slug}`, priority: "0.65" })),
];

const navItems = [
  { href: "/services", label: "Services", key: "services" },
  { href: "/compare#countries", label: "Countries", key: "countries" },
  { href: "/calculator", label: "Calculator", key: "calculator" },
  { href: "/compare", label: "Compare", key: "compare" },
  { href: "/insights", label: "Insights", key: "insights" },
  { href: "/#faq", label: "FAQ", key: "faq" },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function routeFile(routePath) {
  if (routePath === "/compare") return path.join(root, "compare.html");
  if (routePath === "/") return path.join(root, "index.html");
  return path.join(root, `${routePath.slice(1)}.html`);
}

function iconCard(label, value) {
  return `<div class="metric"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`;
}

const navScript = `<script>
(function(){
  var h=document.getElementById('nav-hamburger');
  var m=document.getElementById('nav-mobile');
  var o=document.getElementById('nav-overlay');
  var c=document.getElementById('nav-mobile-close');
  function open(){m.classList.add('is-open');o.classList.add('is-open');h.setAttribute('aria-expanded','true');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
  function close(){m.classList.remove('is-open');o.classList.remove('is-open');h.setAttribute('aria-expanded','false');m.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  h.addEventListener('click',open);
  c.addEventListener('click',close);
  o.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
})();
</script>`;

function header(current) {
  return `<header class="site-header container">
  <nav class="nav" aria-label="Primary">
    <a href="/" class="brand" aria-label="Nira Dental Abroad - Home">
      <img class="brand-logo" src="/nira-logo-dental-abroad-spaced.svg" alt="Nira Dental Abroad" width="790" height="475" />
    </a>
    <div class="nav-links">
      ${navItems.map((item) => `<a href="${item.href}"${item.key === current ? ' class="is-current"' : ""}>${item.label}</a>`).join("\n      ")}
    </div>
    <a href="/contact" class="btn btn--primary nav-cta-btn">Compare Your Quote</a>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </nav>
</header>
<div class="nav-mobile" id="nav-mobile" aria-hidden="true">
  <div class="nav-mobile-top">
    <a href="/" class="brand" aria-label="Nira Dental Abroad">
      <img class="brand-logo" src="/nira-logo-dental-abroad-spaced.svg" alt="Nira Dental Abroad" width="790" height="475" />
    </a>
    <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <nav class="nav-mobile-links">
    ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("\n    ")}
  </nav>
  <a href="/contact" class="btn btn--primary">Compare Your Quote</a>
</div>
<div class="nav-overlay" id="nav-overlay"></div>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="foot-top">
      <div class="foot-brand">
        <img class="foot-logo" src="/nira-logo-dental-abroad-light.svg" alt="Nira Dental Abroad" width="790" height="475" />
      </div>
      <div class="foot-col">
        <h5>Services</h5>
        <ul>${services.map((item) => `<li><a href="/services/${item.slug}">${item.name}</a></li>`).join("")}</ul>
      </div>
      <div class="foot-col">
        <h5>Countries</h5>
        <ul>${countries.map((item) => `<li><a href="/countries/${item.slug}">${item.name}</a></li>`).join("")}</ul>
      </div>
      <div class="foot-col">
        <h5>Resources</h5>
        <ul>
          <li><a href="/compare">Compare Countries</a></li>
          <li><a href="/calculator">Calculator</a></li>
          <li><a href="/insights">Insights</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h5>Support</h5>
        <ul>
          <li><a href="/calculator">Compare Your Quote</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/#quote">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-copy">&copy; 2026 Nira Dental Abroad.<br/>All rights reserved.</div>
  </div>
</footer>`;
}

function layout({ title, description, pagePath, current, main, type = "website", scripts = "" }) {
  const url = `${siteUrl}${pagePath === "/" ? "/" : pagePath}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${url}" />
<meta property="og:site_name" content="Nira Dental Abroad" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${siteUrl}/opengraph.jpg" />
<meta property="og:image:alt" content="Nira Dental Abroad" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${siteUrl}/opengraph.jpg" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/nira-pages.css" />
</head>
<body>
${header(current)}
${main}
${footer()}
${scripts}
${navScript}
</body>
</html>
`;
}

function pageHero({ eyebrow, title, lede, actions = true, stats = [] }) {
  return `<section class="container hero">
  <div class="hero-copy">
    <div class="rule"></div>
    <div class="eyebrow">${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>
    <p class="lede">${esc(lede)}</p>
    ${actions ? `<div class="hero-actions"><a href="/contact" class="btn btn--primary">Compare Your Quote</a><a href="/services" class="btn btn--ghost">Explore Services</a></div>` : ""}
  </div>
  <div class="hero-art" aria-hidden="true">
    ${stats.map((stat) => `<div class="stat"><strong>${esc(stat.value)}</strong><span>${esc(stat.label)}</span></div>`).join("")}
  </div>
</section>`;
}

function comparePage() {
  const display = {
    mexico: {
      cities: "Cancún, Los Cabos, Tijuana",
      img: "/mexico.jpg",
      bestLabel: "Quick trips",
      bestDesc: "Shorter travel time<br>Lower overall cost",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    },
    "costa-rica": {
      cities: "San José, Alajuela, Liberia",
      img: "/costa-rica.jpg",
      bestLabel: "Premium care",
      bestDesc: "High-quality clinics<br>Relaxing recovery",
      icon: `<svg viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 13L2 9z"/><line x1="2" y1="9" x2="22" y2="9"/></svg>`,
    },
    colombia: {
      cities: "Medellín, Bogotá, Cali",
      img: "/colombia.jpg",
      bestLabel: "Complex cases",
      bestDesc: "Full smile makeovers<br>Advanced treatments",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2C9 2 6.5 3.5 6.5 7c0 2.5.5 4.5.5 8 0 1.5.5 3 1.5 3S10 18.5 10 17c0-1.5 1.2-2.5 2-2.5s2 1 2 2.5c0 1.5.5 3 1.5 3S17 19.5 17 18c0-3.5.5-5.5.5-8C17.5 3.5 15 2 12 2z"/></svg>`,
    },
  };

  const pinIco = `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const shieldIco = `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  const dollarIco = `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
  const phoneIco = `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

  const tableRows = countries.map((c) => {
    const d = display[c.slug];
    const savings = c.savings.replace("-", "–");
    return `<div class="ctable-row">
  <div class="ctable-dest">
    <img class="ci" src="${d.img}" alt="${esc(c.name)}" width="78" height="78" />
    <div>
      <h3>${esc(c.name)}</h3>
      <span class="ctable-cities">${pinIco}${esc(d.cities)}</span>
    </div>
  </div>
  <div class="ctable-savings">
    <div class="ctable-pct">${savings}</div>
    <div class="ctable-vs">vs U.S. average</div>
  </div>
  <div class="ctable-bf">
    <span class="bf-ico">${d.icon}</span>
    <div>
      <div class="bf-label">${esc(d.bestLabel)}</div>
      <div class="bf-desc">${d.bestDesc}</div>
    </div>
  </div>
</div>`;
  }).join("\n");

  return layout({
    title: "Compare Dental Care Abroad | Nira Dental Abroad",
    description: "Compare Mexico, Costa Rica, and Colombia for dental care abroad by savings, timeline, travel fit, and treatment type.",
    pagePath: "/compare",
    current: "compare",
    main: `
<section class="compare-split container" id="countries">
  <div class="compare-text">
    <div class="rule"></div>
    <div class="eyebrow">Country Comparison</div>
    <h1>Compare dental destinations before you choose.</h1>
    <p class="lede">See how Mexico, Costa Rica, and Colombia compare with U.S. dental costs, treatment timelines, and travel comfort.</p>
    <div class="hero-actions">
      <a href="/contact" class="btn btn--primary">Compare Your Quote</a>
      <a href="/services" class="btn btn--ghost">Explore Services</a>
    </div>
    <div class="trust-strip">
      <div class="trust-item">
        <span class="trust-ico">${shieldIco}</span>
        <div><strong>Vetted Clinics</strong><span>Trusted providers in every country</span></div>
      </div>
      <div class="trust-sep"></div>
      <div class="trust-item">
        <span class="trust-ico">${dollarIco}</span>
        <div><strong>Transparent Savings</strong><span>Real numbers. No hidden fees.</span></div>
      </div>
      <div class="trust-sep"></div>
      <div class="trust-item">
        <span class="trust-ico">${phoneIco}</span>
        <div><strong>Guided Support</strong><span>We're with you every step.</span></div>
      </div>
    </div>
  </div>

  <div class="ctable-wrap">
    <div class="ctable-card">
      <div class="ctable-head">
        <span>Destination</span>
        <span>Typical Savings</span>
        <span>Best For</span>
      </div>
      ${tableRows}
      <div class="ctable-foot">
        ${shieldIco}
        All destinations are carefully vetted for quality, safety, and patient experience.
      </div>
    </div>
  </div>
</section>
${ctaBlock("Have a treatment plan already?", "Use the calculator to compare your specific treatment type across all three destinations.")}`,
  });
}

function servicesHub() {
  const icons = {
    veneers:                `<svg viewBox="0 0 24 24"><path d="M12 3c-2.8 0-5 2-5 5 0 2.8.5 5 .5 8.5 0 1.2.6 2 1.5 2 .8 0 1.5-.9 1.5-2 0-.9.8-1.5 1.5-1.5s1.5.6 1.5 1.5c0 1.1.7 2 1.5 2 .9 0 1.5-.8 1.5-2 0-3.5.5-5.7.5-8.5 0-3-2.2-5-5.5-5z"/></svg>`,
    crowns:                 `<svg viewBox="0 0 24 24"><path d="M8 3C6.3 3 5 4.3 5 6c0 2 .4 3.5.4 6 0 .9.5 1.5 1.1 1.5.6 0 1-.7 1-1.5 0-.6.5-1 1-1s1 .4 1 1c0 .8.5 1.5 1.1 1.5.3 0 .5-.1.7-.4.2.3.5.4.7.4.6 0 1.1-.7 1.1-1.5 0-.6.5-1 1-1s1 .4 1 1c0 .8.5 1.5 1.1 1.5.6 0 1.1-.6 1.1-1.5 0-2.5.4-4 .4-6C19 4.3 17.7 3 16 3c-1.2 0-2.4.7-2.8 1.6C12.8 3.7 11.5 3 10 3c-.7 0-1.4.2-2 .5"/></svg>`,
    implants:               `<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="10"/><rect x="9" y="10" width="6" height="2.5" rx="1"/><rect x="8.5" y="13.5" width="7" height="2.5" rx="1"/><rect x="8" y="17" width="8" height="2.5" rx="1"/></svg>`,
    "full-mouth-restoration":`<svg viewBox="0 0 24 24"><path d="M4 13c0-4.4 3.6-8 8-8s8 3.6 8 8"/><path d="M7 13v3.5h2.5v-2h5v2H17V13"/></svg>`,
    "smile-makeovers":      `<svg viewBox="0 0 24 24"><path d="M12 2l1.6 4.8L19 8l-5.4 1.6L12 16l-1.6-6.4L5 8l6.4-1.6z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M5 4l.5 1.5L7 6l-1.5.5L5 8l-.5-1.5L3 6l1.5-.5z"/></svg>`,
  };

  const shortTimeline = {
    veneers: "Usually 5–7 days", crowns: "Often 5–7 days", implants: "Often 7–10 days",
    "full-mouth-restoration": "Usually 10–14 days", "smile-makeovers": "Often 7–10 days",
  };
  const shortPrice = {
    veneers: "From $400–$850 per tooth", crowns: "From $450–$950 per crown",
    implants: "From $1,200–$2,300 per implant", "full-mouth-restoration": "From $11,000–$23,000 abroad",
    "smile-makeovers": "From $3,800–$15,000 abroad",
  };
  const selectorData = {
    veneers:                  { timeline: "5–7 days",  savings: "50%–70%", dest: "Mexico, Costa Rica, Colombia & more" },
    crowns:                   { timeline: "5–7 days",  savings: "50%–70%", dest: "Mexico, Costa Rica, Colombia & more" },
    implants:                 { timeline: "7–10 days", savings: "50%–75%", dest: "Mexico, Costa Rica, Colombia & more" },
    "full-mouth-restoration": { timeline: "10–14 days",savings: "55%–75%", dest: "Mexico, Costa Rica, Colombia & more" },
    "smile-makeovers":        { timeline: "7–10 days", savings: "50%–70%", dest: "Mexico, Costa Rica, Colombia & more" },
  };

  const clockIco  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
  const dollarIco = `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
  const globeIco  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  const shieldIco = `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

  const svcBtns = services.map((s, i) => `<button class="sh-svc-btn${i === 0 ? " is-active" : ""}" data-service="${s.slug}" aria-pressed="${i === 0}">
      <span class="sh-svc-ico">${icons[s.slug]}</span>
      <span class="sh-svc-label">${esc(s.name)}</span>
    </button>`).join("");

  const svcCards = services.map((s) => `<article class="sh-card">
    <div class="sh-card-top">
      <span class="sh-card-ico">${icons[s.slug]}</span>
      <div>
        <div class="sh-card-kicker">Service</div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.lede)}</p>
      </div>
    </div>
    <div class="sh-card-meta">
      <div>${clockIco}${esc(shortTimeline[s.slug])}</div>
      <div>${dollarIco}${esc(shortPrice[s.slug])}</div>
    </div>
    <div class="sh-card-actions">
      <a href="/services/${s.slug}" class="btn btn--ghost">Explore ${esc(s.name)}</a>
    </div>
  </article>`).join("");

  const script = `<script>
(function(){
  var data=${JSON.stringify(selectorData)};
  document.querySelectorAll('.sh-svc-btn').forEach(function(b){
    b.addEventListener('click',function(){
      var d=data[b.dataset.service]; if(!d) return;
      document.querySelectorAll('.sh-svc-btn').forEach(function(x){ x.classList.remove('is-active'); x.setAttribute('aria-pressed','false'); });
      b.classList.add('is-active'); b.setAttribute('aria-pressed','true');
      document.getElementById('sh-timeline').textContent=d.timeline;
      document.getElementById('sh-savings').textContent=d.savings;
      document.getElementById('sh-dest').textContent=d.dest;
    });
  });
})();
</script>`;

  return layout({
    title: "Dental Services Abroad | Nira Dental Abroad",
    description: "Explore veneers, crowns, implants, full-mouth restoration, and smile makeovers with Nira Dental Abroad.",
    pagePath: "/services",
    current: "services",
    scripts: script,
    main: `
<section class="sh-split container">
  <div class="sh-text">
    <div class="rule"></div>
    <div class="eyebrow">Services</div>
    <h1>Plan your dental treatment abroad with confidence.</h1>
    <p class="lede">Compare treatment options, timelines, pricing ranges, and destination fit before you request a quote.</p>
    <div class="hero-actions">
      <a href="/contact" class="btn btn--primary">Compare Your Quote</a>
      <a href="#treatments" class="btn btn--ghost">View Treatments</a>
    </div>
  </div>

  <div class="sh-selector">
    <div class="sh-sel-head">
      <span class="sh-sel-head-ico">${icons.veneers}</span>
      <div>
        <div class="sh-sel-title">Choose Your Treatment</div>
        <div class="sh-sel-sub">Select a service to see estimated timelines and pricing ranges.</div>
      </div>
    </div>
    <div class="sh-svc-grid">${svcBtns}</div>
    <div class="sh-stats">
      <div class="sh-stat">
        ${clockIco}
        <div>
          <div class="sh-stat-label">Typical Timeline</div>
          <div class="sh-stat-val" id="sh-timeline">5–7 days</div>
        </div>
      </div>
      <div class="sh-stat">
        ${dollarIco}
        <div>
          <div class="sh-stat-label">Estimated Savings</div>
          <div class="sh-stat-val" id="sh-savings">50%–70%</div>
        </div>
      </div>
      <div class="sh-stat">
        ${globeIco}
        <div>
          <div class="sh-stat-label">Popular Destinations</div>
          <div class="sh-stat-val" id="sh-dest">Mexico, Costa Rica, Colombia &amp; more</div>
        </div>
      </div>
    </div>
    <div class="sh-sel-foot">${shieldIco}All treatments are performed by vetted, high-quality dental providers.</div>
  </div>
</section>

<section class="sh-cards-section container" id="treatments">
  <div class="sh-cards-grid">${svcCards}</div>
</section>
${ctaBlock("Have a quote already?", "Use the calculator to compare your treatment type and see what a guided destination plan could look like.")}`,
  });
}

function servicePage(service) {
  const svcIcons = {
    veneers:                `<svg viewBox="0 0 24 24"><path d="M12 3c-2.8 0-5 2-5 5 0 2.8.5 5 .5 8.5 0 1.2.6 2 1.5 2 .8 0 1.5-.9 1.5-2 0-.9.8-1.5 1.5-1.5s1.5.6 1.5 1.5c0 1.1.7 2 1.5 2 .9 0 1.5-.8 1.5-2 0-3.5.5-5.7.5-8.5 0-3-2.2-5-5.5-5z"/></svg>`,
    crowns:                 `<svg viewBox="0 0 24 24"><path d="M8 3C6.3 3 5 4.3 5 6c0 2 .4 3.5.4 6 0 .9.5 1.5 1.1 1.5.6 0 1-.7 1-1.5 0-.6.5-1 1-1s1 .4 1 1c0 .8.5 1.5 1.1 1.5.3 0 .5-.1.7-.4.2.3.5.4.7.4.6 0 1.1-.7 1.1-1.5 0-.6.5-1 1-1s1 .4 1 1c0 .8.5 1.5 1.1 1.5.6 0 1.1-.6 1.1-1.5 0-2.5.4-4 .4-6C19 4.3 17.7 3 16 3c-1.2 0-2.4.7-2.8 1.6C12.8 3.7 11.5 3 10 3H8z"/></svg>`,
    implants:               `<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="10"/><rect x="9" y="10" width="6" height="2.5" rx="1"/><rect x="8.5" y="13.5" width="7" height="2.5" rx="1"/><rect x="8" y="17" width="8" height="2.5" rx="1"/></svg>`,
    "full-mouth-restoration":`<svg viewBox="0 0 24 24"><path d="M4 13c0-4.4 3.6-8 8-8s8 3.6 8 8"/><path d="M7 13v3.5h2.5v-2h5v2H17V13"/></svg>`,
    "smile-makeovers":      `<svg viewBox="0 0 24 24"><path d="M12 2l1.6 4.8L19 8l-5.4 1.6L12 16l-1.6-6.4L5 8l6.4-1.6z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M5 4l.5 1.5L7 6l-1.5.5L5 8l-.5-1.5L3 6l1.5-.5z"/></svg>`,
  };
  const userIco   = `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  const clockIco  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
  const dollarIco = `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
  const mapIco    = `<svg viewBox="0 0 24 24"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`;

  const ext = {
    veneers:                { fit: "Great for minor chips, gaps, discoloration, and smile enhancement.", timelineShort: "Usually 5–7 days", timelineDetail: "for planning, preparation, fitting, and final review.", priceShort: "From $400 – $850 per tooth abroad", priceNote: "Varies by country, material, and case complexity.", solutions: "Most patients choose porcelain or Emax veneers for a natural, long-lasting smile. Our partner clinics use premium materials and digital precision.", countryRows: [{ img: "/mexico.jpg", name: "Mexico", price: "$400 – $850", window: "5 – 7 days", why: "High-quality care with excellent value" }, { img: "/costa-rica.jpg", name: "Costa Rica", price: "$500 – $850", window: "5 – 7 days", why: "Top clinics with strong patient experience" }, { img: "/colombia.jpg", name: "Colombia", price: "$400 – $800", window: "5 – 7 days", why: "Skilled dentists and modern technology" }] },
    crowns:                 { fit: "Best for damaged, restored, or cosmetically improved teeth.", timelineShort: "Often 5–7 days", timelineDetail: "for planning, preparation, temporary placement, and delivery.", priceShort: "From $450 – $950 per crown abroad", priceNote: "Varies by country, material, and case complexity.", solutions: "Zirconia and E-max crowns are the most popular for strength and aesthetics. Digital planning ensures a precise fit on the first visit.", countryRows: [{ img: "/mexico.jpg", name: "Mexico", price: "$450 – $850", window: "5 – 7 days", why: "High-quality care with excellent value" }, { img: "/costa-rica.jpg", name: "Costa Rica", price: "$550 – $950", window: "5 – 7 days", why: "Top clinics with strong patient experience" }, { img: "/colombia.jpg", name: "Colombia", price: "$450 – $750", window: "5 – 7 days", why: "Skilled dentists and modern technology" }] },
    implants:               { fit: "Best for replacing missing teeth or supporting bridges and restorations.", timelineShort: "Often 7–10 days", timelineDetail: "for first-stage work; some cases require a second trip.", priceShort: "From $1,300 – $2,300 per implant abroad", priceNote: "Excludes case-specific grafting or restoration needs.", solutions: "Titanium implants with ceramic crowns are the standard. Healing timelines vary, and some cases require bone grafting before placement.", countryRows: [{ img: "/mexico.jpg", name: "Mexico", price: "$1,400 – $2,100", window: "7 – 10 days", why: "High-quality care with excellent value" }, { img: "/costa-rica.jpg", name: "Costa Rica", price: "$1,600 – $2,300", window: "7 – 10 days", why: "Top clinics with strong patient experience" }, { img: "/colombia.jpg", name: "Colombia", price: "$1,300 – $1,900", window: "7 – 10 days", why: "Skilled dentists and modern technology" }] },
    "full-mouth-restoration":{ fit: "Best for patients with multiple failing teeth or a full restorative plan.", timelineShort: "Usually 10–14 days", timelineDetail: "for major single-trip cases; implant staging may require follow-up.", priceShort: "From $11,000 – $23,000 abroad", priceNote: "Depends on destination and case complexity.", solutions: "Most full-mouth cases combine implants, crowns, and sometimes veneers. A digital treatment plan before travel reduces chair time significantly.", countryRows: [{ img: "/mexico.jpg", name: "Mexico", price: "$12,500 – $21,000", window: "10 – 14 days", why: "High-quality care with excellent value" }, { img: "/costa-rica.jpg", name: "Costa Rica", price: "$14,500 – $23,000", window: "10 – 14 days", why: "Top clinics with strong patient experience" }, { img: "/colombia.jpg", name: "Colombia", price: "$11,000 – $19,000", window: "10 – 14 days", why: "Skilled dentists and modern technology" }] },
    "smile-makeovers":      { fit: "Best for patients combining cosmetic and restorative goals in one guided journey.", timelineShort: "Often 7–10 days", timelineDetail: "depending on services included in the treatment plan.", priceShort: "From $3,800 – $15,000 abroad", priceNote: "Varies widely by treatment combination.", solutions: "Smile makeovers vary widely because every plan is different. The most common combination is veneers plus whitening, sometimes with gum contouring.", countryRows: [{ img: "/mexico.jpg", name: "Mexico", price: "$3,800 – $11,500", window: "7 – 10 days", why: "High-quality care with excellent value" }, { img: "/costa-rica.jpg", name: "Costa Rica", price: "$4,500 – $12,500", window: "7 – 10 days", why: "Top clinics with strong patient experience" }, { img: "/colombia.jpg", name: "Colombia", price: "$3,500 – $10,500", window: "7 – 10 days", why: "Skilled dentists and modern technology" }] },
  };

  const d = ext[service.slug];
  const timelineWord = d.timelineShort.split(" ")[0];

  const destRows = d.countryRows.map((r) => `<div class="sp-dest-row">
    <div class="sp-dest-cell sp-dest-country"><img class="sp-dest-img" src="${r.img}" alt="${esc(r.name)}" width="34" height="34" />${esc(r.name)}</div>
    <div class="sp-dest-cell">${esc(r.price)}</div>
    <div class="sp-dest-cell">${esc(r.window)}</div>
    <div class="sp-dest-cell">${esc(r.why)}</div>
  </div>`).join("");

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3).map((s) => `<article class="sp-rel-card">
    <span class="sp-rel-ico">${svcIcons[s.slug]}</span>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.lede)}</p>
    <a href="/services/${s.slug}" class="sp-rel-link">View service <span aria-hidden="true">→</span></a>
  </article>`).join("");

  return layout({
    title: `${service.title} | Nira Dental Abroad`,
    description: service.lede,
    pagePath: `/services/${service.slug}`,
    current: "services",
    main: `
<section class="sp-split container">
  <div class="sp-text">
    <div class="rule"></div>
    <div class="eyebrow">Service: ${esc(service.name)}</div>
    <h1>${esc(service.title)}</h1>
    <p class="lede">${esc(service.lede)}</p>
    <div class="hero-actions">
      <a href="/contact" class="btn btn--primary">Compare Your Quote</a>
      <a href="/services" class="btn btn--ghost">Explore Services</a>
    </div>
  </div>

  <div class="sp-stat-card">
    <div class="sp-stat-row">
      <span class="sp-stat-ico">${svcIcons[service.slug]}</span>
      <div>
        <div class="sp-stat-big">3</div>
        <div class="sp-stat-sub">dentistry ideal profiles</div>
        <div class="sp-stat-detail">Find your best match</div>
      </div>
    </div>
    <div class="sp-stat-row">
      <span class="sp-stat-ico">${clockIco}</span>
      <div>
        <div class="sp-stat-big sp-stat-big--word">${esc(timelineWord)}</div>
        <div class="sp-stat-sub">typical planning window ${esc(d.timelineShort.replace(timelineWord, "").trim())}</div>
        <div class="sp-stat-detail">From consultation to final review</div>
      </div>
    </div>
    <div class="sp-stat-row">
      <span class="sp-stat-ico">${mapIco}</span>
      <div>
        <div class="sp-stat-big">1:1</div>
        <div class="sp-stat-sub">guided quote comparison</div>
        <div class="sp-stat-detail">Personalized by your case</div>
      </div>
    </div>
  </div>
</section>

<div class="sp-metrics-wrap">
  <div class="container">
    <div class="sp-metrics">
      <div class="sp-metric">
        <span class="sp-metric-ico">${userIco}</span>
        <div class="sp-metric-val">Fit</div>
        <div class="sp-metric-lbl">ideal patients</div>
        <p class="sp-metric-desc">${esc(d.fit)}</p>
      </div>
      <div class="sp-metric">
        <span class="sp-metric-ico">${clockIco}</span>
        <div class="sp-metric-val sp-metric-val--copper">${esc(d.timelineShort)}</div>
        <div class="sp-metric-detail">${esc(d.timelineDetail)}</div>
        <div class="sp-metric-lbl">Typical timeline</div>
      </div>
      <div class="sp-metric">
        <span class="sp-metric-ico">${dollarIco}</span>
        <div class="sp-metric-val">${esc(d.priceShort)}</div>
        <div class="sp-metric-lbl">Estimated price range</div>
        <p class="sp-metric-desc">${esc(d.priceNote)}</p>
      </div>
    </div>
  </div>
</div>

<section class="section container">
  <div class="section-head">
    <div><div class="eyebrow">Overview</div><h2>What to know before comparing providers.</h2></div>
    <p>${esc(service.ideal)} ${esc(service.price)}</p>
  </div>
  <div class="sp-dest-table">
    <div class="sp-dest-head">
      <span>Destination</span>
      <span>Estimated Range</span>
      <span>Planning Window</span>
      <span>Why Patients Choose It</span>
    </div>
    ${destRows}
  </div>
</section>

<section class="band">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">Common Solutions</div><h2>Fast answers.</h2></div>
      <p>${esc(d.solutions)}</p>
    </div>
    <div class="sp-rel-grid">${related}</div>
  </div>
</section>
${ctaBlock(`Compare ${service.name.toLowerCase()} options`, "Use the interactive calculator to estimate U.S. and destination pricing before a personalized review.")}`,
  });
}

function countryPage(country) {
  const serviceLinks = services.slice(0, 5).map((service) => `<article class="card"><h3>${esc(service.name)}</h3><p>${esc(service.lede)}</p><div class="card-actions"><a href="/services/${service.slug}" class="btn btn--ghost">View service</a></div></article>`).join("");
  const costRows = Object.entries(country.cost).map(([key, value]) => `<tr><td><strong>${esc(key.replace("full", "full-mouth restoration"))}</strong></td><td>${esc(value)}</td><td>${esc(country.timeline)}</td></tr>`).join("");
  return layout({
    title: `${country.title} | Nira Dental Abroad`,
    description: country.lede,
    pagePath: `/countries/${country.slug}`,
    current: "countries",
    main: `${pageHero({
      eyebrow: "Country guide",
      title: country.title,
      lede: country.lede,
      stats: [
        { value: country.savings, label: "typical savings for major cases" },
        { value: country.timeline, label: "planning and treatment window" },
        { value: "5", label: "major services compared" },
      ],
    })}
<section class="band"><div class="container"><div class="section-head"><div><div class="eyebrow">Why ${esc(country.name)}</div><h2>When this destination makes sense.</h2></div><ul class="mini-list">${country.why.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div><div class="table-wrap"><table><thead><tr><th>Treatment</th><th>Estimated Range</th><th>Typical Window</th></tr></thead><tbody>${costRows}</tbody></table></div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Services</div><h2>Common treatment categories.</h2></div><p>${esc(country.bestFor)}</p></div><div class="grid grid--3">${serviceLinks}</div></div></section>
${ctaBlock(`Compare ${country.name} with your U.S. quote`, "Use the standalone calculator to review treatment type, material grade, market, and case complexity.")}`,
  });
}

function calculatorPage() {
  const globeIco = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  const toothIco = `<svg viewBox="0 0 24 24"><path d="M12 2C9 2 6.5 3.5 6.5 7c0 2.5.5 4.5.5 8 0 1.5.5 3 1.5 3S10 18.5 10 17c0-1.5 1.2-2.5 2-2.5s2 1 2 2.5c0 1.5.5 3 1.5 3S17 19.5 17 18c0-3.5.5-5.5.5-8C17.5 3.5 15 2 12 2z"/></svg>`;
  const liveIco  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>`;
  const trendIco = `<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`;

  const illustration = `<svg viewBox="0 0 200 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block" aria-hidden="true">
  <g transform="rotate(-7,145,55)">
    <rect x="70" y="14" width="145" height="82" rx="9" fill="white" opacity="0.95"/>
    <text x="84" y="34" font-family="Montserrat,sans-serif" font-size="8" font-weight="600" fill="#4a4742">Estimated Range</text>
    <rect x="84" y="46" width="113" height="4" rx="2" fill="#e8dfd3"/>
    <rect x="84" y="46" width="63" height="4" rx="2" fill="#a46f52"/>
    <circle cx="147" cy="48" r="5" fill="#a46f52"/>
    <text x="84" y="66" font-family="Montserrat,sans-serif" font-size="9" fill="#8f8e8e">$</text>
    <text x="184" y="66" font-family="Montserrat,sans-serif" font-size="9" fill="#8f8e8e" text-anchor="end">$$$$</text>
    <text x="84" y="82" font-family="Montserrat,sans-serif" font-size="7" fill="#c0b8b0">U.S. vs. abroad estimate</text>
  </g>
  <rect x="18" y="112" width="155" height="173" rx="12" fill="rgba(22,20,18,0.55)"/>
  <rect x="30" y="124" width="131" height="42" rx="6" fill="rgba(0,0,0,0.3)"/>
  <text x="153" y="152" font-family="monospace" font-size="22" font-weight="700" fill="#8fa089" text-anchor="end">$$$</text>
  <rect x="30" y="176" width="28" height="18" rx="3" fill="rgba(255,255,255,0.14)"/>
  <rect x="64" y="176" width="28" height="18" rx="3" fill="rgba(255,255,255,0.14)"/>
  <rect x="98" y="176" width="28" height="18" rx="3" fill="rgba(255,255,255,0.14)"/>
  <rect x="132" y="176" width="28" height="18" rx="3" fill="rgba(255,255,255,0.14)"/>
  <rect x="30" y="202" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="64" y="202" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="98" y="202" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="132" y="202" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="30" y="228" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="64" y="228" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="98" y="228" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="132" y="228" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="30" y="254" width="28" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="64" y="254" width="62" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="132" y="254" width="28" height="18" rx="3" fill="#a46f52" opacity="0.9"/>
</svg>`;

  return layout({
    title: "Dental Care Abroad Calculator | Nira Dental Abroad",
    description: "Use Nira's interactive calculator to compare U.S. dental quotes with Mexico, Costa Rica, and Colombia estimates.",
    pagePath: "/calculator",
    current: "calculator",
    scripts: `<script src="/nira-calculator.js"></script>`,
    main: `
<section class="ch-split container">
  <div class="ch-text">
    <div class="rule"></div>
    <div class="eyebrow">Interactive Calculator</div>
    <h1>Compare your dental quote in <em class="ch-accent">minutes.</em></h1>
    <p class="lede">Adjust treatment type, quantity, materials, U.S. market, and case complexity to estimate the range between U.S. care and premium destination options.</p>
    <div class="ch-trust">
      <div class="ch-trust-item">
        <span class="ch-trust-ico">${globeIco}</span>
        <strong>Multiple Markets</strong>
        <span>Compare up to 4 global markets.</span>
      </div>
      <div class="ch-trust-sep"></div>
      <div class="ch-trust-item">
        <span class="ch-trust-ico">${toothIco}</span>
        <strong>Treatment Options</strong>
        <span>5 treatment types to customize.</span>
      </div>
      <div class="ch-trust-sep"></div>
      <div class="ch-trust-item">
        <span class="ch-trust-ico">${trendIco}</span>
        <strong>Live Estimates</strong>
        <span>See updated ranges as you adjust.</span>
      </div>
    </div>
  </div>

  <div class="ch-card">
    <div class="ch-feats">
      <div class="ch-feat">
        <span class="ch-feat-ico">${globeIco}</span>
        <div>
          <div class="ch-feat-num">4</div>
          <div class="ch-feat-label">markets compared</div>
          <div class="ch-feat-desc">U.S., Mexico, Costa Rica, Colombia &amp; more.</div>
        </div>
      </div>
      <hr class="ch-divider"/>
      <div class="ch-feat">
        <span class="ch-feat-ico">${toothIco}</span>
        <div>
          <div class="ch-feat-num">5</div>
          <div class="ch-feat-label">treatment types</div>
          <div class="ch-feat-desc">Crowns, Implants, Veneers, All-on-4 &amp; more.</div>
        </div>
      </div>
      <hr class="ch-divider"/>
      <div class="ch-feat">
        <span class="ch-feat-ico">${liveIco}</span>
        <div>
          <div class="ch-feat-num ch-feat-num--word">Live</div>
          <div class="ch-feat-label">estimate updates</div>
          <div class="ch-feat-desc">Adjust inputs and see your range updated live.</div>
        </div>
      </div>
    </div>
    <div class="ch-illu">${illustration}</div>
  </div>
</section>
<section class="band"><div class="container">${calculatorMarkup()}</div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">How to use it</div><h2>Estimate first, then personalize.</h2></div><p>This calculator is a planning tool. Final pricing depends on diagnostics, provider recommendation, materials, case complexity, and travel timing. A personalized review should use your quote, X-rays, treatment plan, or photos.</p></div><div class="grid grid--3"><article class="card"><h3>1. Choose treatment</h3><p>Select the service that best matches your current quote or likely treatment plan.</p></article><article class="card"><h3>2. Tune the case</h3><p>Adjust material grade, market, quantity, and complexity so the estimate reflects your likely scenario.</p></article><article class="card"><h3>3. Compare destinations</h3><p>Review the U.S., Colombia, Costa Rica, and Mexico ranges before requesting a deeper comparison.</p></article></div></div></section>
${ctaBlock("Ready for a personalized comparison?", "Send your quote or treatment plan so Nira can coordinate a more precise provider review.")}`,
  });
}

function calculatorMarkup() {
  return `<div class="calc-panel">
  <div class="calc-controls">
    <div class="calc-step"><label>Treatment</label><div class="calc-pills" data-control="treatment">
      <button type="button" class="calc-pill is-active" data-value="veneers">Veneers</button>
      <button type="button" class="calc-pill" data-value="crowns">Crowns</button>
      <button type="button" class="calc-pill" data-value="implants">Implants</button>
      <button type="button" class="calc-pill" data-value="fullmouth">Full-Mouth</button>
      <button type="button" class="calc-pill" data-value="smile">Smile Makeover</button>
    </div></div>
    <div class="calc-step calc-quantity"><label><span class="qty-label">Number of veneers</span>: <span class="qty-value">8</span></label><input type="range" min="4" max="16" value="8" step="2" class="calc-slider" data-control="quantity" aria-label="Quantity" /><p class="calc-helper qty-helper">Most patients choose 6-10 veneers to cover the visible smile zone.</p></div>
    <div class="calc-step"><label>Material Grade</label><div class="calc-pills" data-control="material"><button type="button" class="calc-pill is-active" data-value="premium">Premium</button><button type="button" class="calc-pill" data-value="standard">Standard</button></div></div>
    <div class="calc-step"><label>Your U.S. Market</label><div class="calc-pills" data-control="market"><button type="button" class="calc-pill is-active" data-value="national">National Avg</button><button type="button" class="calc-pill" data-value="metro">Major Metro</button><button type="button" class="calc-pill" data-value="premium">Premium Coastal</button></div></div>
    <div class="calc-step"><label>Case Complexity</label><div class="calc-pills" data-control="complexity"><button type="button" class="calc-pill is-active" data-value="standard">Standard</button><button type="button" class="calc-pill" data-value="complex">Complex</button></div></div>
  </div>
  <div class="calc-results">
    <div class="calc-result-row"><strong>United States</strong><span data-out="us">$12,000 - $22,400</span></div>
    <div class="calc-result-row"><strong>Colombia</strong><span data-out="colombia">$3,200 - $5,200</span></div>
    <div class="calc-result-row"><strong>Costa Rica</strong><span data-out="costarica">$4,000 - $6,800</span></div>
    <div class="calc-result-row"><strong>Mexico</strong><span data-out="mexico">$3,200 - $6,000</span></div>
    <div class="calc-summary">
      <div><div class="summary-label">Estimated Savings</div><div class="summary-value" data-out="savings">$6,800 - $19,200</div></div>
      <div><div class="summary-label">Trip Duration</div><div class="summary-value" data-out="duration">5-7 days</div></div>
      <div><div class="summary-label">Travel Costs</div><div class="summary-value" data-out="travel">$700 - $2,800</div></div>
    </div>
    <p class="calc-helper">Estimates only. Actual quotes vary by case complexity, materials, provider, and diagnostics.</p>
  </div>
</div>`;
}

function insightsHub() {
  const cards = articles.map((article) => `<article class="card"><div class="kicker">${esc(article.category)}</div><h3>${esc(article.title)}</h3><p>${esc(article.description)}</p><div class="card-actions"><a href="/insights/${article.slug}" class="btn btn--ghost">Read article</a></div></article>`).join("");
  return layout({
    title: "Dental Travel Insights | Nira Dental Abroad",
    description: "Guides to dental care abroad costs, safety, planning, treatment timelines, and destination comparison.",
    pagePath: "/insights",
    current: "insights",
    main: `${pageHero({
      eyebrow: "Insights",
      title: "Clear guidance before you travel.",
      lede: "Read practical explainers on dental care abroad costs, safety, planning, and how to compare destination options.",
      stats: [
        { value: "3", label: "starter guides" },
        { value: "Cost", label: "pricing clarity" },
        { value: "Safety", label: "provider due diligence" },
      ],
    })}
<section class="band"><div class="container"><div class="grid grid--3">${cards}</div></div></section>
${ctaBlock("Prefer numbers first?", "Use the calculator to turn article context into a planning estimate.")}`,
  });
}

function articlePage(article) {
  const related = articles.filter((item) => item.slug !== article.slug).map((item) => `<article class="card"><div class="kicker">${esc(item.category)}</div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="card-actions"><a href="/insights/${item.slug}" class="btn btn--ghost">Read next</a></div></article>`).join("");
  return layout({
    title: `${article.title} | Nira Dental Abroad`,
    description: article.description,
    pagePath: `/insights/${article.slug}`,
    current: "insights",
    type: "article",
    main: `${pageHero({
      eyebrow: article.category,
      title: article.title,
      lede: article.description,
      actions: false,
      stats: [
        { value: "Guide", label: "practical overview" },
        { value: "5 min", label: "estimated read" },
        { value: "Nira", label: "planning perspective" },
      ],
    })}
<section class="band"><div class="container"><article class="body-copy">${article.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}<h2>What to do next</h2><ul><li>Collect your current quote, treatment plan, or photos.</li><li>Compare destination fit before focusing only on price.</li><li>Use the calculator to estimate ranges before requesting a personalized review.</li></ul><div class="card-actions"><a href="/calculator" class="btn btn--primary">Open Calculator</a><a href="/compare" class="btn btn--ghost">Compare Countries</a></div></article></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">More insights</div><h2>Keep planning.</h2></div><p>Use these starter articles to understand the decision before choosing a provider or destination.</p></div><div class="grid grid--2">${related}</div></div></section>`,
  });
}

function ctaBlock(title, copy) {
  return `<section class="cta"><div class="container cta-inner"><div><h2>${esc(title)}</h2><p>${esc(copy)}</p></div><div class="hero-actions"><a href="/contact" class="btn btn--primary">Compare Your Quote</a><a href="/compare" class="btn btn--ghost">Compare Countries</a></div></div></section>`;
}

async function write(routePath, html) {
  const file = routeFile(routePath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
}

for (const generatedDir of ["services", "countries", "insights", "calculator"]) {
  await rm(path.join(root, generatedDir), { recursive: true, force: true });
}

function contactPage() {
  return layout({
    title: "Compare Your Quote | Nira Dental Abroad",
    description: "Share your dental quote or treatment plan and a Nira coordinator will reach out with a personalized comparison — at no cost to you.",
    pagePath: "/contact",
    current: "",
    main: `
<section class="contact-hero container">
  <div class="rule"></div>
  <div class="eyebrow">Get Started</div>
  <h1>Compare your dental quote<br/>with confidence.</h1>
  <p class="lede">Share your details and a Nira coordinator will reach out with a personalized comparison — at no cost to you.</p>
</section>
<section class="contact-form-section">
  <div class="container">
    <iframe src="https://tally.so/embed/LZkgDl?alignLeft=1&transparentBackground=1&dynamicHeight=1"
            width="100%" height="700" frameborder="0" marginheight="0" marginwidth="0"
            title="Nira - Compare Quote" style="border:none;display:block;width:100%"></iframe>
  </div>
</section>`,
    scripts: `<script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e){e.src=e.dataset.tallySrc})};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w;s.onload=v;s.onerror=v;d.body.appendChild(s);}</script>`,
  });
}

await write("/compare", comparePage());
await write("/services", servicesHub());
for (const service of services) await write(`/services/${service.slug}`, servicePage(service));
for (const country of countries) await write(`/countries/${country.slug}`, countryPage(country));
await write("/calculator", calculatorPage());
await write("/contact", contactPage());
await write("/insights", insightsHub());
for (const article of articles) await write(`/insights/${article.slug}`, articlePage(article));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(root, "public", "sitemap.xml"), sitemap, "utf8");
