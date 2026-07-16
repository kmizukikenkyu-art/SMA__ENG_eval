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
  { type: "s", file: "synthe/VCTK001_p1_TE0.1_DP0.6_FL0.8_DE0.6.wav", text: "Please call Stella." },
  { type: "s", file: "synthe/VCTK002_p2_TE0.1_DP0.5_FL0.7_DE0.6.wav", text: "Ask her to bring these things with her from the store." },
  { type: "d", file: "recorded/rec_01.wav", text: "When a man looks for something beyond his reach, his friends say he is looking for the pot of gold at the end of the rainbow." },
  { type: "s", file: "synthe/VCTK003_p3_TE0.1_DP0.6_FL0.7_DE0.6.wav", text: "Six spoons of fresh snow peas, five thick slabs of blue cheese, and maybe a snack for her brother Bob." },
  { type: "n", file: "normal/nor_01.wav", text: "The Norsemen considered the rainbow as a bridge over which the gods passed from earth to their home in the sky." },
  { type: "s", file: "synthe/VCTK004_p4_TE0.1_DP0.5_FL0.8_DE0.6.wav", text: "We also need a small plastic snake and a big toy frog for the kids." },
  { type: "d", file: "recorded/rec_02.wav", text: "Throughout the centuries people have explained the rainbow in various ways." },
  { type: "n", file: "normal/nor_02.wav", text: "Others have tried to explain the phenomenon physically." },
  { type: "s", file: "synthe/VCTK005_p5_TE0.1_DP0.7_FL0.8_DE0.6.wav", text: "She can scoop these things into three red bags, and we will go meet her Wednesday at the train station." },
  { type: "s", file: "synthe/VCTK006_p5_TE0.1_DP0.7_FL0.8_DE0.6.wav", text: "When the sunlight strikes raindrops in the air, they act as a prism and form a rainbow." },
  { type: "d", file: "recorded/rec_03.wav", text: "Some have accepted it as a miracle without physical explanation." },
  { type: "n", file: "normal/nor_03.wav", text: "Aristotle thought that the rainbow was caused by reflection of the sun's rays by the rain." },
  { type: "s", file: "synthe/VCTK007_p1_TE0.1_DP0.6_FL0.8_DE0.6.wav", text: "The rainbow is a division of white light into many beautiful colors." },
  { type: "d", file: "recorded/rec_04.wav", text: "To the Hebrews it was a token that there would be no more universal floods." },
  { type: "s", file: "synthe/VCTK008_p2_TE0.1_DP0.5_FL0.7_DE0.6.wav", text: "These take the shape of a long round arch, with its path high above, and its two ends apparently beyond the horizon." },
  { type: "n", file: "normal/nor_04.wav", text: "Since then physicists have found that it is not reflection, but refraction by the raindrops which causes the rainbows." },
  { type: "s", file: "synthe/VCTK009_p3_TE0.1_DP0.6_FL0.7_DE0.6.wav", text: "There is, according to legend, a boiling pot of gold at one end." },
  { type: "s", file: "synthe/VCTK010_p4_TE0.1_DP0.5_FL0.8_DE0.6.wav", text: "People look, but no one ever finds it." },
  { type: "d", file: "recorded/rec_05.wav", text: "The Greeks used to imagine that it was a sign from the gods to foretell war or heavy rain." },
  { type: "n", file: "normal/nor_05.wav", text: "Many complicated ideas about the rainbow have been formed over the years." }
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
