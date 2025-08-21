/** Garden Advice (Issue 1) — refactor to functions & data maps.
 * @typedef {"spring"|"summer"|"autumn"|"winter"} Season
 */


// Hardcoded inputs
let season = "summer";
let plantType = "flower";

/** Season-only advice */
const SEASON_ADVICE = {
  summer: ["Water your plants regularly and provide some shade."],
  winter: ["Protect your plants from frost with covers."],
};

/** Plant-only advice */
const PLANT_ADVICE = {
  flower: ["Use fertiliser to encourage blooms."],
  vegetable: ["Keep an eye out for pests!"],
};

/**
 * Get advice lines for a specific season.
 * Unknown seasons -> "No advice for this season."
 * @param {string} s
 * @returns {string[]}
 */
function adviceForSeason(s) {
  const key = String(s || "").toLowerCase();
  return SEASON_ADVICE[key] ? SEASON_ADVICE[key] : ["No advice for this season."];
}

/**
 * Get advice lines for a specific plant type.
 * Unknown types -> "No advice for this type of plant."
 * @param {string} p
 * @returns {string[]}
 */
function adviceForPlant(p) {
  const key = String(p || "").toLowerCase();
  return PLANT_ADVICE[key] ? PLANT_ADVICE[key] : ["No advice for this type of plant."];
}

/**
 * Combine season + plant advice.
 * @param {string} s
 * @param {string} p
 * @returns {string[]}
 */
function gardenAdvice(s, p) {
  return [...adviceForSeason(s), ...adviceForPlant(p)];
}

// Log combined advice
console.log(gardenAdvice(season, plantType).join("\n"));

// Export
if (typeof module !== "undefined") {
  module.exports = { adviceForSeason, adviceForPlant, gardenAdvice, SEASON_ADVICE, PLANT_ADVICE };
}
