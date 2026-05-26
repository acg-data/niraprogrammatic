# Nira Dental Abroad Site

Static Nira Dental Abroad marketing site built with Vite and published from `dist/public`.

## Cloudflare Pages

- Build command: `pnpm run build`
- Build output directory: `dist/public`
- Direct upload deploy: `pnpm run deploy`
- Local preview: `pnpm run serve`
- Local Cloudflare preview: `pnpm run pages:dev`

The app includes `wrangler.toml` with `pages_build_output_dir = "dist/public"` for Pages deployments.

## Page Inventory

- Total page templates: 17
- Indexable routes: 16
  - `/` - Nira Dental Abroad home page with a compact quote comparison calculator.
  - `/compare` - country comparison hub for Mexico, Costa Rica, and Colombia.
  - `/countries/mexico`, `/countries/costa-rica`, `/countries/colombia` - country guides.
  - `/services` - service directory.
  - `/services/veneers`, `/services/crowns`, `/services/implants`, `/services/full-mouth-restoration`, `/services/smile-makeovers` - service guides.
  - `/calculator` - fully interactive calculator page.
  - `/insights` - Insights/blog index.
  - `/insights/dental-care-abroad-costs`, `/insights/is-dental-care-abroad-safe`, `/insights/how-to-plan-dental-travel` - starter article pages.
- Utility templates: 1
  - `/404.html` - explicit not-found page for missing routes.

The sitemap includes the 16 indexable pages. The 404 template is intentionally excluded from the sitemap.

## Brand Positioning

- Public brand name: Nira Dental Abroad.
- Core tagline direction: "Premium dental care abroad, coordinated simply."
- The supplied SVG wordmark remains the clean `nira` mark; the visible descriptor text is rendered in HTML as `DENTAL ABROAD`.

## Programmatic Elements

- `scripts/generate-pages.mjs` builds the static comparison, country, service, Insights, calculator, and sitemap pages from local data.
- The home page keeps its inline calculator. The standalone `/calculator` page uses `public/nira-calculator.js`.
- Calculator inputs are wired through `data-control` attributes and outputs through `data-out` attributes.
- Pricing data is currently client-side static data; there is no API or CMS dependency for the public site.

## Launch Diligence

Complete these checks before heavy ad spend, printed collateral, or a custom-domain launch:

- Search USPTO for exact and confusingly similar uses of "Nira Dental Abroad."
- Confirm domain availability and any preferred custom domain.
- Check social handle availability for the chosen brand phrase.
- Review obvious conflicts with other Nira-branded dental, healthcare, beauty, or medical-device businesses.
