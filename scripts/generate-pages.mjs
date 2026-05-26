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

function header(current) {
  return `<header class="site-header container">
  <nav class="nav" aria-label="Primary">
    <a href="/" class="brand" aria-label="Nira Dental Abroad - Home">
      <img class="brand-logo" src="/nira-wordmark.svg" alt="Nira" width="790" height="358" />
      <span class="tag">DENTAL ABROAD</span>
    </a>
    <div class="nav-links">
      ${navItems.map((item) => `<a href="${item.href}"${item.key === current ? ' class="is-current"' : ""}>${item.label}</a>`).join("\n      ")}
    </div>
    <a href="/calculator" class="btn btn--primary">Compare Your Quote</a>
  </nav>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="foot-top">
      <div class="foot-brand">
        <img class="foot-logo" src="/nira-wordmark-light.svg" alt="Nira" width="790" height="358" />
        <div class="tag">DENTAL ABROAD</div>
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
    ${actions ? `<div class="hero-actions"><a href="/calculator" class="btn btn--primary">Compare Your Quote</a><a href="/services" class="btn btn--ghost">Explore Services</a></div>` : ""}
  </div>
  <div class="hero-art" aria-hidden="true">
    ${stats.map((stat) => `<div class="stat"><strong>${esc(stat.value)}</strong><span>${esc(stat.label)}</span></div>`).join("")}
  </div>
</section>`;
}

function comparePage() {
  const countryCards = countries.map((country) => `<article class="card">
    <div class="kicker">${esc(country.savings)} typical savings</div>
    <h3>${esc(country.name)}</h3>
    <p>${esc(country.lede)}</p>
    <ul class="mini-list">
      <li>${esc(country.timeline)} typical planning window</li>
      <li>${esc(country.bestFor)}</li>
      <li>${esc(country.travel)}</li>
    </ul>
    <div class="card-actions"><a href="/countries/${country.slug}" class="btn btn--ghost">View ${esc(country.name)}</a></div>
  </article>`).join("");

  const rows = countries.map((country) => `<tr>
    <td><strong>${esc(country.name)}</strong></td>
    <td>${esc(country.savings)}</td>
    <td>${esc(country.timeline)}</td>
    <td>${esc(country.bestFor)}</td>
  </tr>`).join("");

  return layout({
    title: "Compare Dental Care Abroad | Nira Dental Abroad",
    description: "Compare Mexico, Costa Rica, and Colombia for dental care abroad by savings, timeline, travel fit, and treatment type.",
    pagePath: "/compare",
    current: "compare",
    main: `${pageHero({
      eyebrow: "Country comparison",
      title: "Compare premium dental destinations.",
      lede: "Use this hub to compare Mexico, Costa Rica, and Colombia against the U.S. baseline for cost, timeline, and travel style.",
      stats: [
        { value: "3", label: "vetted destination profiles" },
        { value: "50-75%", label: "typical savings range for major cases" },
        { value: "5+", label: "major treatment categories compared" },
      ],
    })}
<section class="band" id="countries"><div class="container"><div class="section-head"><div><div class="eyebrow">Countries</div><h2>Choose by fit, not just price.</h2></div><p>Each destination has a different balance of travel time, savings, provider depth, and recovery style. Start with the country profile, then use the calculator to compare treatment economics.</p></div><div class="grid grid--3">${countryCards}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">At a glance</div><h2>Destination comparison.</h2></div><p>The ranges below are directional and intended for planning. Final quotes depend on diagnostics, materials, case complexity, and provider recommendation.</p></div><div class="table-wrap"><table><thead><tr><th>Destination</th><th>Savings</th><th>Timeline</th><th>Best Fit</th></tr></thead><tbody>${rows}</tbody></table></div></div></section>
${ctaBlock("Still deciding where to start?", "Use the calculator to compare your treatment type across Mexico, Costa Rica, Colombia, and the U.S. baseline.")}`,
  });
}

function servicesHub() {
  const cards = services.map((service) => `<article class="card">
    <div class="kicker">Service</div>
    <h3>${esc(service.name)}</h3>
    <p>${esc(service.lede)}</p>
    <ul class="mini-list"><li>${esc(service.timeline)}</li><li>${esc(service.price)}</li></ul>
    <div class="card-actions"><a href="/services/${service.slug}" class="btn btn--ghost">Explore ${esc(service.name)}</a></div>
  </article>`).join("");

  return layout({
    title: "Dental Services Abroad | Nira Dental Abroad",
    description: "Explore veneers, crowns, implants, full-mouth restoration, and smile makeovers with Nira Dental Abroad.",
    pagePath: "/services",
    current: "services",
    main: `${pageHero({
      eyebrow: "Services",
      title: "Plan the right dental treatment abroad.",
      lede: "Compare major dental services by ideal patient fit, timeline, destination pricing, and travel considerations.",
      stats: [
        { value: "5", label: "core treatment categories" },
        { value: "3", label: "destination pricing profiles" },
        { value: "1", label: "guided comparison process" },
      ],
    })}
<section class="band"><div class="container"><div class="grid grid--3">${cards}</div></div></section>
${ctaBlock("Have a quote already?", "Use the calculator to compare your treatment type and see what a guided destination plan could look like.")}`,
  });
}

function servicePage(service) {
  const countryRows = countries.map((country) => `<tr><td><strong>${esc(country.name)}</strong></td><td>${esc(country.cost[service.slug === "full-mouth-restoration" ? "full" : service.slug === "smile-makeovers" ? "full" : service.slug] || service.price)}</td><td>${esc(country.timeline)}</td></tr>`).join("");
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3).map((item) => `<article class="card"><h3>${esc(item.name)}</h3><p>${esc(item.lede)}</p><div class="card-actions"><a href="/services/${item.slug}" class="btn btn--ghost">View service</a></div></article>`).join("");
  return layout({
    title: `${service.title} | Nira Dental Abroad`,
    description: service.lede,
    pagePath: `/services/${service.slug}`,
    current: "services",
    main: `${pageHero({
      eyebrow: "Service guide",
      title: service.title,
      lede: service.lede,
      stats: [
        { value: "3", label: "country cost profiles" },
        { value: service.timeline.split(" ")[0], label: "typical planning window starts here" },
        { value: "1:1", label: "guided quote comparison" },
      ],
    })}
<section class="band"><div class="container"><div class="grid grid--3">${iconCard("Ideal patient", "Fit")}${iconCard("Typical timeline", service.timeline)}${iconCard("Starting range", service.price.split(",")[0])}</div></div></section>
<section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Overview</div><h2>What to know before comparing providers.</h2></div><p>${esc(service.ideal)} ${esc(service.price)}</p></div><div class="table-wrap"><table><thead><tr><th>Country</th><th>Estimated Range</th><th>Planning Window</th></tr></thead><tbody>${countryRows}</tbody></table></div></div></section>
<section class="band"><div class="container"><div class="section-head"><div><div class="eyebrow">Common questions</div><h2>Fast answers.</h2></div><p>${service.faqs.map(esc).join(" ")}</p></div><div class="grid grid--3">${related}</div></div></section>
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
  return layout({
    title: "Dental Care Abroad Calculator | Nira Dental Abroad",
    description: "Use Nira's interactive calculator to compare U.S. dental quotes with Mexico, Costa Rica, and Colombia estimates.",
    pagePath: "/calculator",
    current: "calculator",
    scripts: `<script src="/nira-calculator.js"></script>`,
    main: `${pageHero({
      eyebrow: "Interactive calculator",
      title: "Compare your dental quote in minutes.",
      lede: "Adjust treatment type, quantity, materials, U.S. market, and case complexity to estimate the range between U.S. care and premium destination options.",
      actions: false,
      stats: [
        { value: "4", label: "markets compared" },
        { value: "5", label: "treatment types" },
        { value: "Live", label: "estimate updates" },
      ],
    })}
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
  return `<section class="cta"><div class="container cta-inner"><div><h2>${esc(title)}</h2><p>${esc(copy)}</p></div><div class="hero-actions"><a href="/calculator" class="btn btn--primary">Compare Your Quote</a><a href="/compare" class="btn btn--ghost">Compare Countries</a></div></div></section>`;
}

async function write(routePath, html) {
  const file = routeFile(routePath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
}

for (const generatedDir of ["services", "countries", "insights", "calculator"]) {
  await rm(path.join(root, generatedDir), { recursive: true, force: true });
}

await write("/compare", comparePage());
await write("/services", servicesHub());
for (const service of services) await write(`/services/${service.slug}`, servicePage(service));
for (const country of countries) await write(`/countries/${country.slug}`, countryPage(country));
await write("/calculator", calculatorPage());
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
