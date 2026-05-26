(function () {
  const data = {
    veneers: {
      label: "Veneers",
      qtyLabel: "Number of veneers",
      qtyMin: 4,
      qtyMax: 16,
      qtyStep: 2,
      qtyDefault: 8,
      hasQuantity: true,
      duration: "5-7 days",
      helper: "Most patients choose 6-10 veneers to cover the visible smile zone.",
      materials: {
        premium: { us: [1500, 2800], colombia: [400, 650], costarica: [500, 850], mexico: [400, 750] },
        standard: { us: [450, 1200], colombia: [180, 320], costarica: [250, 420], mexico: [200, 380] },
      },
    },
    crowns: {
      label: "Crowns",
      qtyLabel: "Number of crowns",
      qtyMin: 1,
      qtyMax: 6,
      qtyStep: 1,
      qtyDefault: 1,
      hasQuantity: true,
      duration: "5-7 days",
      helper: "A single crown is common, while full cases may include several adjacent teeth.",
      materials: {
        premium: { us: [1500, 3800], colombia: [450, 750], costarica: [550, 950], mexico: [450, 850] },
        standard: { us: [900, 1800], colombia: [280, 480], costarica: [380, 650], mexico: [320, 580] },
      },
    },
    implants: {
      label: "Implants",
      qtyLabel: "Number of implants",
      qtyMin: 1,
      qtyMax: 6,
      qtyStep: 1,
      qtyDefault: 1,
      hasQuantity: true,
      duration: "7-10 days or 2 trips",
      helper: "A single implant replaces one tooth. Multiple implants can support bridges or full-arch restorations.",
      materials: {
        premium: { us: [4000, 6500], colombia: [1300, 1900], costarica: [1600, 2300], mexico: [1400, 2100] },
        standard: { us: [3200, 4800], colombia: [950, 1500], costarica: [1200, 1800], mexico: [1050, 1600] },
      },
    },
    fullmouth: {
      label: "Full-Mouth",
      hasQuantity: false,
      duration: "10-14 days",
      materials: {
        premium: { us: [42000, 85000], colombia: [11000, 19000], costarica: [14500, 23000], mexico: [12500, 21000] },
        standard: { us: [28000, 55000], colombia: [7500, 13000], costarica: [10500, 17000], mexico: [9500, 15500] },
      },
    },
    smile: {
      label: "Smile Makeover",
      hasQuantity: false,
      duration: "7-10 days",
      materials: {
        premium: { us: [22000, 38000], colombia: [5200, 9000], costarica: [6800, 11500], mexico: [5800, 10000] },
        standard: { us: [14000, 24000], colombia: [3800, 5800], costarica: [4700, 7800], mexico: [4200, 7200] },
      },
    },
  };

  const marketMult = { national: 1, metro: 1.5, premium: 2 };
  const complexityMult = { standard: 1, complex: 1.35 };
  const travelGlobal = { min: 700, max: 2800 };
  const state = {
    treatment: "veneers",
    quantity: 8,
    material: "premium",
    market: "national",
    complexity: "standard",
  };

  const fmt = (n) => "$" + Math.round(n).toLocaleString();
  const rangeStr = (lo, hi) => fmt(lo) + " - " + fmt(hi);
  const get = (selector) => document.querySelector(selector);

  function calc() {
    const treatment = data[state.treatment];
    const materials = treatment.materials[state.material];
    const qty = treatment.hasQuantity ? state.quantity : 1;
    const mkt = marketMult[state.market];
    const cmp = complexityMult[state.complexity];
    const ranges = {
      us: [materials.us[0] * qty * mkt * cmp, materials.us[1] * qty * mkt * cmp],
      colombia: [materials.colombia[0] * qty * cmp, materials.colombia[1] * qty * cmp],
      costarica: [materials.costarica[0] * qty * cmp, materials.costarica[1] * qty * cmp],
      mexico: [materials.mexico[0] * qty * cmp, materials.mexico[1] * qty * cmp],
    };

    Object.keys(ranges).forEach((key) => {
      const out = get('[data-out="' + key + '"]');
      if (out) out.textContent = rangeStr(ranges[key][0], ranges[key][1]);
    });

    const cheapestLow = Math.min(ranges.colombia[0], ranges.costarica[0], ranges.mexico[0]);
    const cheapestHigh = Math.min(ranges.colombia[1], ranges.costarica[1], ranges.mexico[1]);
    const savingsLow = Math.max(0, ranges.us[0] - cheapestHigh);
    const savingsHigh = ranges.us[1] - cheapestLow;

    const savings = get('[data-out="savings"]');
    const duration = get('[data-out="duration"]');
    const travel = get('[data-out="travel"]');
    const treatmentLabel = get('[data-out="treatmentLabel"]');
    if (savings) savings.textContent = rangeStr(savingsLow, savingsHigh);
    if (duration) duration.textContent = treatment.duration;
    if (travel) travel.textContent = rangeStr(travelGlobal.min, travelGlobal.max);
    if (treatmentLabel) treatmentLabel.textContent = treatment.label;
  }

  function syncQuantityUI() {
    const treatment = data[state.treatment];
    const wrap = get(".calc-quantity");
    const slider = get('[data-control="quantity"]');
    const label = get(".qty-label");
    const value = get(".qty-value");
    const helper = get(".qty-helper");
    if (!wrap || !slider) return;

    if (!treatment.hasQuantity) {
      wrap.hidden = true;
      state.quantity = 1;
      return;
    }

    wrap.hidden = false;
    state.quantity = treatment.qtyDefault;
    slider.min = treatment.qtyMin;
    slider.max = treatment.qtyMax;
    slider.step = treatment.qtyStep;
    slider.value = state.quantity;
    if (label) label.textContent = treatment.qtyLabel;
    if (value) value.textContent = state.quantity;
    if (helper) helper.textContent = treatment.helper;
  }

  function wirePills(control, stateKey, afterChange) {
    document.querySelectorAll('[data-control="' + control + '"] .calc-pill').forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll('[data-control="' + control + '"] .calc-pill').forEach((item) => {
          item.classList.remove("is-active");
        });
        button.classList.add("is-active");
        state[stateKey] = button.dataset.value;
        if (afterChange) afterChange();
        calc();
      });
    });
  }

  wirePills("treatment", "treatment", syncQuantityUI);
  wirePills("material", "material");
  wirePills("market", "market");
  wirePills("complexity", "complexity");

  const slider = get('[data-control="quantity"]');
  if (slider) {
    slider.addEventListener("input", (event) => {
      state.quantity = parseInt(event.target.value, 10);
      const value = get(".qty-value");
      if (value) value.textContent = state.quantity;
      calc();
    });
  }

  syncQuantityUI();
  calc();
})();
