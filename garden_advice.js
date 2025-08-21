#!/usr/bin/env node
// Garden Advice — simple tips by season + plant type.
// Node:  node garden_advice.js --season summer --plant flower
// Browser: include this file; it will prompt you.

const SEASON_ADVICE = {
  // tweak these to change season tips
  summer: ["Water your plants regularly and provide some shade."],
  winter: ["Protect your plants from frost with covers."],
    spring: ["Start planting seeds indoors for a head start."],
    autumn: ["Harvest your crops before the first frost."],
};

const PLANT_ADVICE = {
  // tweak these to change plant-type tips
  flower: ["Use fertiliser to encourage blooms."],
  vegetable: ["Keep an eye out for pests!"],
  fruit: ["Prune your fruit trees for better yield."],
  herb: ["Harvest herbs regularly to encourage growth."]
};

const SUGGESTED_PLANTS = {
  // quick ideas for what to grow now
  spring: ["Sweet peas", "Lettuce", "Peas"],
  summer: ["Zinnias", "Marigolds", "Tomatoes", "Basil"],
  autumn: ["Pansies", "Violas", "Broccoli", "Kale"],
  winter: ["Parsley", "Chard", "Mizuna"],
};

// pick tips by season or plant (with friendly fallbacks)
function adviceForSeason(s) {
  const key = String(s || "").toLowerCase();
  return SEASON_ADVICE[key] || ["No advice for this season."];
}

function adviceForPlant(p) {
  const key = String(p || "").toLowerCase();
  return PLANT_ADVICE[key] || ["No advice for this type of plant."];
}

function gardenAdvice(s, p) {
  return [...adviceForSeason(s), ...adviceForPlant(p)];
}

// normalize inputs (accepts "fall" as "autumn")
function parseSeason(value) {
  const s = String(value || "").trim().toLowerCase();
  if (["spring", "summer", "autumn", "winter"].includes(s)) return s;
  throw new Error("Invalid season. Try: spring, summer, autumn/fall, winter.");
}
function parsePlantType(value) {
  const p = String(value || "").trim().toLowerCase();
  if (p === "flower" || p === "vegetable") return p;
  throw new Error("Invalid plant type. Try: flower or vegetable.");
}

// make a nice printable block
function formatAdvice(season, plant) {
  const lines = gardenAdvice(season, plant);
  const sugg = SUGGESTED_PLANTS[season] || [];
  const header = `Season: ${season[0].toUpperCase()}${season.slice(1)}\nPlant type: ${plant}`;
  const bullets = lines.map(l => `• ${l}`).join("\n");
  const extra = sugg.length ? `\n\nPlants that thrive now: ${sugg.join(", ")}` : "";
  return `${header}\n\n${bullets}${extra}`;
}

// run via CLI or in the browser
const isNode = typeof process !== "undefined" && process?.release?.name === "node";

function runCli() {
  const args = process.argv.slice(2);
  const get = (name) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 ? args[i + 1] : undefined;
  };
  try {
    const season = parseSeason(get("season"));
    const plant = parsePlantType(get("plant"));
    console.log(formatAdvice(season, plant));
  } catch (err) {
    console.error(String(err.message || err));
    console.error("\nUsage: node garden_advice.js --season <spring|summer|autumn|winter> --plant <flower|vegetable>");
    process.exit(1);
  }
}

function runBrowser() {
  try {
    const sIn = prompt("Season? (spring, summer, autumn/fall, winter)", "summer");
    const pIn = prompt("Plant type? (flower or vegetable)", "flower");
    const season = parseSeason(sIn);
    const plant = parsePlantType(pIn);
    const out = formatAdvice(season, plant);
    console.log(out);
    alert(out);
  } catch (err) {
    alert(String(err.message || err));
  }
}

if (isNode && typeof require !== "undefined" && require.main === module) {
  runCli();
} else if (typeof window !== "undefined" && typeof prompt === "function") {
  runBrowser();
}

// exports for tests or reuse
if (typeof module !== "undefined") {
  module.exports = {
    adviceForSeason,
    adviceForPlant,
    gardenAdvice,
    parseSeason,
    parsePlantType,
    formatAdvice,
    SEASON_ADVICE,
    PLANT_ADVICE,
    SUGGESTED_PLANTS,
  };
} else if (typeof window !== "undefined") {
  window.GardenAdvice = {
    adviceForSeason,
    adviceForPlant,
    gardenAdvice,
    parseSeason,
    parsePlantType,
    formatAdvice,
    SEASON_ADVICE,
    PLANT_ADVICE,
    SUGGESTED_PLANTS,
  };
}
