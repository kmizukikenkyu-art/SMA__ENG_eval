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
]

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
