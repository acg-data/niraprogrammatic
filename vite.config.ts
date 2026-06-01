import { defineConfig } from "vite";
import path from "node:path";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const pageInput = (route: string) => path.resolve(import.meta.dirname, route);

export default defineConfig({
  base: basePath,
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: pageInput("index.html"),
        compare: pageInput("compare.html"),
        services: pageInput("services.html"),
        veneers: pageInput("services/veneers.html"),
        crowns: pageInput("services/crowns.html"),
        implants: pageInput("services/implants.html"),
        fullMouthRestoration: pageInput("services/full-mouth-restoration.html"),
        smileMakeovers: pageInput("services/smile-makeovers.html"),
        mexico: pageInput("countries/mexico.html"),
        costaRica: pageInput("countries/costa-rica.html"),
        colombia: pageInput("countries/colombia.html"),
        calculator: pageInput("calculator.html"),
        quote: pageInput("quote.html"),
        insights: pageInput("insights.html"),
        dentalCareAbroadCosts: pageInput("insights/dental-care-abroad-costs.html"),
        isDentalCareAbroadSafe: pageInput("insights/is-dental-care-abroad-safe.html"),
        howToPlanDentalTravel: pageInput("insights/how-to-plan-dental-travel.html"),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
