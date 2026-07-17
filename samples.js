/* =========================================================================
   Shared sample configuration for the MOS evaluation pages
   -------------------------------------------------------------------------
   type: "s" = synthesized (SMA), "d" = recorded, "n" = healthy speaker
   Display order is fixed and shuffled so the type is NOT revealed to
   evaluators. The type + filename ARE written into the CSV so the
   researcher can map results back after collection.


   Evaluation sentences: VCTK held-out evaluation set (No.1-26).
   Edit `file` paths as needed (paths are relative to the HTML files).

   REFERENCE_AUDIO = the target speaker's natural speech, used as the common
   "A" clip on the speaker-similarity page.
   ========================================================================= */

const REFERENCE_AUDIO = "reference/reference.wav";

const SAMPLES = [
  // --- synthesized (s) : folder "synthe/" ---
  { type: "s", file: "synthe/VCTK001_p1_TE0.1_DP0.6_FL0.8_DE0.6.wav", text: "Please call Stella." },
  { type: "s", file: "synthe/VCTK002_p2_TE0.1_DP0.5_FL0.7_DE0.6.wav", text: "Ask her to bring these things with her from the store." },
  { type: "s", file: "synthe/VCTK003_p3_TE0.1_DP0.6_FL0.7_DE0.6.wav", text: "Six spoons of fresh snow peas, five thick slabs of blue cheese, and maybe a snack for her brother Bob." },
  { type: "s", file: "synthe/VCTK004_p4_TE0.1_DP0.5_FL0.8_DE0.6.wav", text: "We also need a small plastic snake and a big toy frog for the kids." },
  { type: "s", file: "synthe/VCTK005_p5_TE0.1_DP0.7_FL0.8_DE0.6.wav", text: "She can scoop these things into three red bags, and we will go meet her Wednesday at the train station." },
  { type: "s", file: "synthe/VCTK007_p1_TE0.1_DP0.6_FL0.8_DE0.6.wav", text: "The rainbow is a division of white light into many beautiful colors." },
  { type: "s", file: "synthe/VCTK008_p2_TE0.1_DP0.5_FL0.7_DE0.6.wav", text: "These take the shape of a long round arch, with its path high above, and its two ends apparently beyond the horizon." },
  { type: "s", file: "synthe/VCTK009_p3_TE0.1_DP0.6_FL0.7_DE0.6.wav", text: "There is, according to legend, a boiling pot of gold at one end." },
  { type: "s", file: "synthe/VCTK010_p4_TE0.1_DP0.5_FL0.8_DE0.6.wav", text: "People look, but no one ever finds it." },
  // NOTE: VCTK006 (10th synthesized sample) not uploaded yet. Add it here if needed:
  { type: "s", file: "synthe/VCTK006_p5_TE0.1_DP0.7_FL0.8_DE0.6.wav", text: "When the sunlight strikes raindrops in the air, they act as a prism and form a rainbow." },

  // --- recorded (d) : folder "recoded/" (spelling matches the uploaded folder) ---
  { type: "d", file: "recoded/VCTK007.wav", text: "The rainbow is a division of white light into many beautiful colors." },
  { type: "d", file: "recoded/VCTK013.wav", text: "Some have accepted it as a miracle without physical explanation." },
  { type: "d", file: "recoded/VCTK016.wav", text: "The Norsemen considered the rainbow as a bridge over which the gods passed from earth to their home in the sky." },
  { type: "d", file: "recoded/VCTK023.wav", text: "If the red of the second bow falls upon the green of the first, the result is to give a bow with an abnormally wide yellow band, since red and green light when mixed form yellow." },
  { type: "d", file: "recoded/VCTK025.wav", text: "He has not been named." }, // TODO: fill in the VCTK025 sentence text (verify against the audio)

  // --- healthy speaker (n) : folder "non/" ---
  { type: "n", file: "non/VCTK012_p1_TE0.0_DP0.0_FL0.0_DE0.0.wav", text: "Throughout the centuries people have explained the rainbow in various ways." },
  { type: "n", file: "non/VCTK014_p1_TE0.0_DP0.0_FL0.0_DE0.0.wav", text: "To the Hebrews it was a token that there would be no more universal floods." },
  { type: "n", file: "non/VCTK017_p1_TE0.0_DP0.0_FL0.0_DE0.0.wav", text: "Others have tried to explain the phenomenon physically." },
  { type: "n", file: "non/VCTK019_p1_TE0.0_DP0.0_FL0.0_DE0.0.wav", text: "Since then physicists have found that it is not the reflection but the refraction by the raindrops which causes the rainbows." },
  { type: "n", file: "non/VCTK020_p1_TE0.0_DP0.0_FL0.0_DE0.0.wav", text: "Many complicated ideas about the rainbow have been formed." }
];

const CLARITY_OPTS = [
  { v: 5, en: "5: Excellent", ja: "非常に良い" },
  { v: 4, en: "4: Good",      ja: "良い" },
  { v: 3, en: "3: Fair",      ja: "普通" },
  { v: 2, en: "2: Poor",      ja: "悪い" },
  { v: 1, en: "1: Bad",       ja: "非常に悪い" }
];

const SIMILARITY_OPTS = [
  { v: 5, en: "5: Very similar",       ja: "非常に似ている" },
  { v: 4, en: "4: Similar",            ja: "似ている" },
  { v: 3, en: "3: Somewhat",           ja: "普通" },
  { v: 2, en: "2: Not similar",        ja: "似ていない" },
  { v: 1, en: "1: Not similar at all", ja: "全く似ていない" }
];

const GOOGLE_FORM_URL = "https://forms.gle/tSxYir6YXfjAXoPu5";

/* Seed for the fixed display order. Change this number if you want a
   different (but still fixed) random order across all evaluators. */
const ORDER_SEED = 20260716;

/* Deterministic PRNG (mulberry32) -> same sequence for a given seed */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Fisher-Yates shuffle driven by a provided random function */
function shuffleWith(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Fixed shuffle: same order every load (seeded) */
function seededShuffle(arr, seed) {
  return shuffleWith(arr, mulberry32(seed));
}

/* CSV field escaper (handles commas, quotes, newlines) */
function csvField(value) {
  const s = String(value == null ? "" : value);
  return '"' + s.replace(/"/g, '""') + '"';
}

/* Trigger a CSV download with BOM (Excel-safe UTF-8) */
function downloadCsv(filename, csvContent) {
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
