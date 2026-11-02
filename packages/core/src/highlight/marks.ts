// Character-range marks of the code blocks (saved highlights, annotations,
// search hits) laid over the syntax-highlighted tokens.
//
// `applyCodeMarks(tokens, marks)` cuts the highlighted tokens at the mark
// boundaries and groups them into runs covered by the same mark, so every
// renderer can wrap each run in a <mark> (a styled text on React Native and
// the mini-programs) while keeping the token colors inside it.
// `splitCodeMarkLines` then splits the runs into lines for the numbered
// lines layout. Pure and platform neutral.
import type { ColorScheme } from "../theme/types";
import { colorMix } from "../tokens/color";
import type { HighlightToken } from "./types";

/**
 * Color of a code mark: a theme color name (`"primary"`, `"success"`,
 * `"warning"`, `"danger"`, `"info"`, `"neutral"`: a translucent tint of it)
 * or any CSS color, used as the background as is (prefer a translucent one,
 * e.g. `"rgb(250 204 21 / 0.35)"`, so the token colors stay readable).
 */
export type CodeMarkColor = ColorScheme | (string & {});

/** A highlighted character range of a code block. */
export interface CodeMark {
  /**
   * Start offset (inclusive), in UTF-16 code units of the code string (the
   * index of `String.prototype.slice`)
   */
  start: number;
  /** End offset (exclusive), in UTF-16 code units of the code string */
  end: number;
  /**
   * Background of the mark (default: a translucent yellow readable in light
   * and dark themes, `--code-block-mark-bg`)
   */
  color?: CodeMarkColor;
  /** Extra class of the rendered mark element(s) (web renderers) */
  className?: string;
  /** Identifier, rendered as `data-mark-id` */
  id?: string;
  /** Tooltip (`title`) of the rendered mark element(s) */
  title?: string;
}

/**
 * A run of highlighted tokens covered by the same mark (or by none). The
 * token texts of the runs returned by `applyCodeMarks` concatenate to the
 * code exactly.
 */
export interface CodeMarkRun<M extends CodeMark = CodeMark> {
  /** The mark shown on the run, `null` for unmarked text */
  mark: M | null;
  /** Index of `mark` in the marks array, -1 for unmarked text */
  index: number;
  /** Offset of the run in the code */
  start: number;
  /** End offset (exclusive) of the run in the code */
  end: number;
  /** Highlighted tokens of the run (cut at the mark boundaries) */
  tokens: HighlightToken[];
}

/** Theme colors a mark can name (a tint of `--<name>-color`) */
export const CODE_MARK_COLORS: readonly ColorScheme[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
];

/**
 * Default background of the marks: a translucent yellow, readable on the
 * light and dark code backgrounds (no theme token is translucent in every
 * palette).
 */
export const CODE_MARK_DEFAULT_BACKGROUND = "rgba(250, 204, 21, 0.35)";

/** Share of a theme color in the tint of a mark (percent). */
export const CODE_MARK_TINT = 30;

const isHigh = (code: number) => code >= 0xd800 && code <= 0xdbff;
const isLow = (code: number) => code >= 0xdc00 && code <= 0xdfff;

/**
 * Clamps a mark range to `code`: offsets are truncated to integers, clamped
 * to `0..code.length` and swapped when reversed; a boundary falling inside a
 * surrogate pair (an emoji...) is moved outward so the pair stays whole.
 * Returns `null` for an empty range or non-numeric offsets.
 */
export function clampCodeRange(
  code: string,
  start: unknown,
  end: unknown,
): [start: number, end: number] | null {
  if (typeof start !== "number" || typeof end !== "number") return null;
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  const length = code.length;
  const clamp = (n: number) =>
    Math.min(length, Math.max(0, Number.isFinite(n) ? Math.trunc(n) : n));
  let a = clamp(Math.min(start, end));
  let b = clamp(Math.max(start, end));
  if (a > 0 && isLow(code.charCodeAt(a)) && isHigh(code.charCodeAt(a - 1))) a--;
  if (b < length && isLow(code.charCodeAt(b)) && isHigh(code.charCodeAt(b - 1)))
    b++;
  return a < b ? [a, b] : null;
}

/**
 * Cuts highlighted tokens (`highlightCode`, or one plain token) at the
 * boundaries of `marks` and groups them into runs covered by the same mark.
 *
 * - Offsets are UTF-16 offsets into the code (the concatenated token texts),
 *   clamped by `clampCodeRange`; empty, reversed-to-empty and non-numeric
 *   ranges are ignored.
 * - Overlaps: where marks overlap, the one later in the array wins (its
 *   color, class, title, id and click); the earlier one is cut around it,
 *   so it may render as several elements sharing its `data-mark-id`. Order
 *   the array by priority (e.g. put the active / nested mark last).
 * - Marks may cross token boundaries and line breaks: the tokens are cut,
 *   their types are kept.
 */
export function applyCodeMarks<M extends CodeMark>(
  tokens: readonly HighlightToken[],
  marks?: readonly M[] | null,
): CodeMarkRun<M>[] {
  const code = tokens.map((token) => token.text).join("");
  if (!code) return [];
  // elementary intervals between the sorted boundaries, with their top mark
  const ranges: { index: number; start: number; end: number }[] = [];
  const points = new Set<number>([0, code.length]);
  (Array.isArray(marks) ? marks : []).forEach((mark, index) => {
    const range =
      mark && typeof mark === "object"
        ? clampCodeRange(code, mark.start, mark.end)
        : null;
    if (!range) return;
    ranges.push({ index, start: range[0], end: range[1] });
    points.add(range[0]).add(range[1]);
  });
  const bounds = [...points].sort((a, b) => a - b);
  const top = new Array<number>(bounds.length - 1).fill(-1);
  const find = (offset: number) => {
    let lo = 0;
    let hi = bounds.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (bounds[mid] < offset) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  for (const range of ranges) {
    for (let i = find(range.start); bounds[i] < range.end; i++) {
      top[i] = range.index;
    }
  }

  const runs: CodeMarkRun<M>[] = [];
  let interval = 0;
  let offset = 0;
  for (const { type, text } of tokens) {
    let from = 0;
    while (from < text.length) {
      while (bounds[interval + 1] <= offset + from) interval++;
      const to = Math.min(text.length, bounds[interval + 1] - offset);
      const index = top[interval];
      const piece = { type, text: text.slice(from, to) };
      const last = runs[runs.length - 1];
      if (last && last.index === index && last.end === offset + from) {
        last.tokens.push(piece);
        last.end = offset + to;
      } else {
        runs.push({
          mark: index < 0 ? null : (marks as readonly M[])[index],
          index,
          start: offset + from,
          end: offset + to,
          tokens: [piece],
        });
      }
      from = to;
    }
    offset += text.length;
  }
  return runs;
}

/**
 * Splits marked runs (`applyCodeMarks`) into lines, without the line breaks
 * (like `splitHighlightLines`: a final line break does not start an extra
 * empty line; an empty line has no runs). A mark crossing a line break is
 * cut into one run per line.
 */
export function splitCodeMarkLines<M extends CodeMark>(
  runs: readonly CodeMarkRun<M>[],
): CodeMarkRun<M>[][] {
  const lines: CodeMarkRun<M>[][] = [[]];
  for (const run of runs) {
    let current: CodeMarkRun<M> | null = null;
    let offset = run.start;
    for (const { type, text } of run.tokens) {
      text.split("\n").forEach((part, i) => {
        if (i) {
          lines.push([]);
          current = null;
          offset++;
        }
        if (!part) return;
        if (!current) {
          current = {
            mark: run.mark,
            index: run.index,
            start: offset,
            end: offset,
            tokens: [],
          };
          lines[lines.length - 1].push(current);
        }
        current.tokens.push({ type, text: part });
        offset += part.length;
        current.end = offset;
      });
    }
  }
  if (lines.length > 1 && !lines[lines.length - 1].length) lines.pop();
  return lines;
}

/**
 * CSS background of a mark color (web and mini-program renderers): a tint
 * of a theme color (`color-mix` of `--<name>-color`, `--text-muted-color`
 * for `neutral`), any other value as is, `""` when unset (the stylesheet
 * default, `--code-block-mark-bg`).
 */
export function codeMarkBackground(color: string | null | undefined): string {
  const value = typeof color === "string" ? color.trim() : "";
  if (!value) return "";
  if (!(CODE_MARK_COLORS as readonly string[]).includes(value)) return value;
  const base =
    value === "neutral" ? "var(--text-muted-color)" : `var(--${value}-color)`;
  return `color-mix(in srgb, ${base} ${CODE_MARK_TINT}%, transparent)`;
}

/**
 * Concrete background of a mark color from resolved theme colors (React
 * Native and the mini-programs, without CSS variables / `color-mix`): the
 * tint of a theme color as an `rgba()` (`<name>-color`, `text-muted-color`
 * for `neutral`), any other value as is, the default translucent yellow when
 * unset (or when the theme color cannot be parsed).
 */
export function resolveCodeMarkBackground(
  color: string | null | undefined,
  colors: Readonly<Record<string, string | undefined>>,
): string {
  const value = typeof color === "string" ? color.trim() : "";
  if (!value) return CODE_MARK_DEFAULT_BACKGROUND;
  if (!(CODE_MARK_COLORS as readonly string[]).includes(value)) return value;
  const base =
    colors[value === "neutral" ? "text-muted-color" : `${value}-color`];
  return (
    (base && colorMix(base, "transparent", CODE_MARK_TINT)) ||
    CODE_MARK_DEFAULT_BACKGROUND
  );
}
