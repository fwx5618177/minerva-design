// React Native has no synchronous text measurement: the chart engine lays
// its labels out (legend, ticks, tooltip, label collisions) with an estimate
// of the advance of each character in the platform sans fonts (San
// Francisco, Roboto, PingFang / Noto CJK).

const FONT = /^\s*(?:(\d{3}|bold|normal)\s+)?([\d.]+)px/;

/** Wide characters: CJK, Hangul, kana, fullwidth forms, emoji */
const isWide = (code: number) =>
  (code >= 0x1100 && code <= 0x115f) ||
  (code >= 0x2e80 && code <= 0xa4cf) ||
  (code >= 0xac00 && code <= 0xd7a3) ||
  (code >= 0xf900 && code <= 0xfaff) ||
  (code >= 0xfe30 && code <= 0xfe4f) ||
  (code >= 0xff00 && code <= 0xff60) ||
  (code >= 0xffe0 && code <= 0xffe6) ||
  code >= 0x1f000;

const NARROW = new Set(" il.,:;'|!Ijtfr()[]`");
const WIDE_LATIN = new Set("MWmw@%");

/** Advance of a character, in multiples of the font size */
const advance = (ch: string): number => {
  const code = ch.codePointAt(0) ?? 0;
  if (isWide(code)) return 1;
  if (NARROW.has(ch)) return 0.3;
  if (WIDE_LATIN.has(ch)) return 0.82;
  if (ch >= "0" && ch <= "9") return 0.56;
  if (ch >= "A" && ch <= "Z") return 0.66;
  return 0.55;
};

/**
 * Estimated width in pixels of `text` drawn with a CSS `font`
 * (`"600 12px system-ui"`): the `measureText` of the chart controller
 */
export function measureChartText(text: string, font: string): number {
  const match = FONT.exec(font);
  const weightText = match?.[1];
  const weight =
    weightText === "bold"
      ? 700
      : weightText && weightText !== "normal"
        ? +weightText
        : 400;
  const size = match ? Number(match[2]) : 11;
  let units = 0;
  for (const ch of text) units += advance(ch);
  return units * size * (weight >= 600 ? 1.07 : weight >= 500 ? 1.03 : 1);
}
