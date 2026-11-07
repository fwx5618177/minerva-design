/** WebVTT/SRT parsing. Text is rendered as text nodes, never inserted as HTML. */
export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}
function seconds(value: string): number {
  const parts = value.replace(",", ".").split(":").map(Number);
  if (
    parts.length < 2 ||
    parts.length > 3 ||
    parts.some((n) => !Number.isFinite(n) || n < 0)
  )
    return NaN;
  const [s, m, h = 0] = parts.reverse();
  return s < 60 && m < 60 ? h * 3600 + m * 60 + s : NaN;
}
export function subtitlePlainText(raw: string): string {
  const entities: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: "\u00a0",
    lrm: "\u200e",
    rlm: "\u200f",
  };
  return raw
    .replace(/\{\\[^}]*\}/g, "")
    .replace(/<[^>\n]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name: string) => {
      if (!name.startsWith("#")) return entities[name.toLowerCase()] ?? entity;
      const hex = name[1]?.toLowerCase() === "x";
      const point = Number.parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10);
      return point > 0 && point <= 0x10ffff
        ? String.fromCodePoint(point)
        : entity;
    });
}
export function parseSubtitles(input: string): SubtitleCue[] {
  if (input.length > 2_000_000) throw new Error("Subtitle file is too large");
  const cues: SubtitleCue[] = [];
  for (const block of input
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .split(/\n[ \t]*\n/)) {
    const lines = block.split("\n");
    if (/^(WEBVTT|NOTE|STYLE|REGION)(?:\s|$)/.test(lines[0])) continue;
    const index = lines.findIndex((line) => line.includes("-->"));
    if (index < 0) continue;
    const match = /^(\S+)\s+-->\s+(\S+)/.exec(lines[index].trim());
    if (!match) continue;
    const start = seconds(match[1]),
      end = seconds(match[2]);
    const text = subtitlePlainText(lines.slice(index + 1).join("\n")).trim();
    if (Number.isFinite(start) && Number.isFinite(end) && end > start && text)
      cues.push({ start, end, text });
  }
  return cues.sort((a, b) => a.start - b.start);
}
export function captionAt(cues: readonly SubtitleCue[], time: number): string {
  return cues
    .filter((cue) => time >= cue.start && time < cue.end)
    .map((cue) => cue.text)
    .join("\n");
}
