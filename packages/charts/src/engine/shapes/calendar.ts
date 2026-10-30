// Calendar heatmap layout: one cell per day, colored by level. `weeks`: a
// column per week and a row per weekday (a strip per year for long ranges);
// `months`: a small calendar per month. Days are UTC day numbers, so that
// daylight-saving changes never shift a cell; month / weekday names and the
// first day of the week come from `Intl` (with fallbacks).

import { mix, toCss, type Rgba } from "../color";
import { resolveLocale } from "../locale";
import { font } from "../overlay";
import type { ChartTheme } from "../theme";
import { localeFormat } from "./labels";
import {
  clamp,
  emptyLayout,
  finite,
  positive,
  resolveWith,
  type LayoutContext,
  type LayoutResult,
  type ShapeItem,
  type ShapeLegendEntry,
  type ShapeNode,
} from "./scene";
import type { CalendarDate, CalendarHeatmapOptions } from "./types";

const DAY_MS = 86400000;
/** Longest range drawn, in days (about 10 years) */
const MAX_DAYS = 3660;

const localDay = (date: Date) =>
  Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS,
  );

/** Day number (days since 1970-01-01) of a date; `null` when invalid */
export const calendarDay = (d: CalendarDate): number | null => {
  if (typeof d === "string") {
    const m = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})/.exec(d);
    if (m) {
      const t = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
      return Number.isFinite(t) ? Math.floor(t / DAY_MS) : null;
    }
    const t = Date.parse(d);
    return Number.isFinite(t) ? localDay(new Date(t)) : null;
  }
  if (typeof d === "number")
    return Number.isFinite(d) ? localDay(new Date(d)) : null;
  if (d instanceof Date)
    return Number.isFinite(d.getTime()) ? localDay(d) : null;
  return null;
};

const ymd = (day: number) => {
  const date = new Date(day * DAY_MS);
  return {
    y: date.getUTCFullYear(),
    m: date.getUTCMonth(),
    d: date.getUTCDate(),
  };
};

const dayOfYmd = (y: number, m: number, d: number) =>
  Math.floor(Date.UTC(y, m, d) / DAY_MS);

const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));

/** `YYYY-MM-DD` of a day number */
export const calendarIso = (day: number) => {
  const { y, m, d } = ymd(day);
  return `${y}-${pad2(m + 1)}-${pad2(d)}`;
};

/** Day of the week, 0 = Sunday */
const weekdayOf = (day: number) => (((day + 4) % 7) + 7) % 7;

/** Months (year, 0-based month) overlapping the days `from`-`to` */
const monthsOf = (from: number, to: number) => {
  const out: { y: number; m: number }[] = [];
  let { y, m } = ymd(from);
  while (dayOfYmd(y, m, 1) <= to) {
    out.push({ y, m });
    if (m === 11) {
      m = 0;
      y++;
    } else m++;
  }
  return out;
};

// ------------------------------------------------------------- locale

const runtimeLocale = () => {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().locale;
  } catch {
    return "en-US";
  }
};

/** Regions whose weeks start on Sunday / Saturday (CLDR); Monday elsewhere */
const SUNDAY = new Set(
  "AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PT PY SA SG SV TH TT TW UM US VE VI WS YE ZA ZW".split(
    " ",
  ),
);
const SATURDAY = new Set(
  "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".split(" "),
);
/** Likely region of a language without one */
const LANGUAGE_REGION: Record<string, string> = {
  en: "US",
  ja: "JP",
  ko: "KR",
  he: "IL",
  pt: "BR",
  ar: "EG",
  fa: "IR",
  hi: "IN",
  th: "TH",
  zh: "CN",
};

interface LocaleLike {
  language?: string;
  region?: string;
  weekInfo?: { firstDay?: number };
  getWeekInfo?: () => { firstDay?: number };
  maximize?: () => { region?: string };
}

/** First day of the week of a locale, 0 = Sunday */
export const localeWeekStart = (locale?: string): number => {
  const tag = locale || runtimeLocale();
  let region = "";
  let language = tag.split(/[-_]/)[0]?.toLowerCase() ?? "";
  try {
    const Locale = (
      Intl as unknown as { Locale?: new (tag: string) => LocaleLike }
    ).Locale;
    if (typeof Locale === "function") {
      const loc = new Locale(tag);
      const info =
        typeof loc.getWeekInfo === "function"
          ? loc.getWeekInfo()
          : loc.weekInfo;
      if (info && typeof info.firstDay === "number")
        return ((info.firstDay % 7) + 7) % 7;
      region = loc.region ?? loc.maximize?.().region ?? "";
      language = loc.language ?? language;
    }
  } catch {
    // invalid tag or no Intl.Locale: parse it by hand
  }
  if (!region) {
    const m = /[-_]([A-Za-z]{2})(?=$|[-_])/.exec(tag);
    region = m ? m[1].toUpperCase() : (LANGUAGE_REGION[language] ?? "");
  }
  return SUNDAY.has(region) ? 0 : SATURDAY.has(region) ? 6 : 1;
};

const FORMATS = new Map<string, Intl.DateTimeFormat | null>();

/** Cached UTC date formatter (`null` without a usable Intl) */
const formatter = (
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat | null => {
  const key = `${locale ?? ""}|${JSON.stringify(options)}`;
  if (FORMATS.has(key)) return FORMATS.get(key) ?? null;
  let f: Intl.DateTimeFormat | null = null;
  for (const tag of [locale, undefined]) {
    try {
      f = new Intl.DateTimeFormat(tag, { ...options, timeZone: "UTC" });
      break;
    } catch {
      f = null;
    }
  }
  if (FORMATS.size > 64) FORMATS.clear();
  FORMATS.set(key, f);
  return f;
};

const EN_MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
const EN_DAYS = "Sun Mon Tue Wed Thu Fri Sat".split(" ");

const format = (
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions,
  day: number,
  fallback: string,
) => {
  const f = formatter(locale, options);
  try {
    return f ? f.format(new Date(day * DAY_MS)) : fallback;
  } catch {
    return fallback;
  }
};

/** Short month name */
const monthName = (locale: string | undefined, y: number, m: number) =>
  format(locale, { month: "short" }, dayOfYmd(y, m, 1), EN_MONTHS[m]);

/** Weekday name (0 = Sunday) */
const weekdayName = (
  locale: string | undefined,
  wd: number,
  width: "short" | "narrow",
) =>
  // 2023-01-01 is a Sunday
  format(
    locale,
    { weekday: width },
    dayOfYmd(2023, 0, 1 + wd),
    width === "short" ? EN_DAYS[wd] : EN_DAYS[wd].charAt(0),
  );

/** Date of the tooltip */
const dateName = (locale: string | undefined, day: number) =>
  format(
    locale,
    { year: "numeric", month: "short", day: "numeric", weekday: "short" },
    day,
    calendarIso(day),
  );

// -------------------------------------------------------------- model

export interface CalendarModel {
  /** First and last day shown (day numbers) */
  start: number;
  end: number;
  /** Sum of the values of each day of the range */
  values: Map<number, number>;
  max: number;
  /** Upper bounds of the levels but the last */
  thresholds: number[];
  /** Number of levels */
  count: number;
  /** Whether every value is an integer (level names "3–5" vs "≤ 2.5") */
  integer: boolean;
}

/** Days, values and levels of a calendar heatmap; `null` without days */
export const calendarModel = (
  o: CalendarHeatmapOptions,
): CalendarModel | null => {
  const raw = new Map<number, number>();
  let first = Infinity;
  let last = -Infinity;
  for (const d of o.data ?? []) {
    if (!d) continue;
    const day = calendarDay(d.date);
    if (day === null) continue;
    raw.set(day, (raw.get(day) ?? 0) + positive(d.value));
    first = Math.min(first, day);
    last = Math.max(last, day);
  }
  let start: number;
  let end: number;
  const range = o.range;
  if (typeof range === "number" && Number.isFinite(range)) {
    const y = Math.round(range);
    start = dayOfYmd(y, 0, 1);
    end = dayOfYmd(y, 11, 31);
  } else if (Array.isArray(range) && range.length >= 2) {
    const a = calendarDay(range[0] as CalendarDate);
    const b = calendarDay(range[1] as CalendarDate);
    if (a === null || b === null) return null;
    start = Math.min(a, b);
    end = Math.max(a, b);
  } else {
    if (!Number.isFinite(last)) return null;
    end = last;
    // 53 columns: the 52 weeks before the week of the last day
    const weekStart = finiteWeekStart(o);
    const from = end - 52 * 7;
    start = from - ((weekdayOf(from) - weekStart + 7) % 7);
  }
  if (end - start + 1 > MAX_DAYS) start = end - MAX_DAYS + 1;
  const values = new Map<number, number>();
  let max = 0;
  let integer = true;
  raw.forEach((v, day) => {
    if (day < start || day > end) return;
    values.set(day, v);
    max = Math.max(max, v);
    if (!Number.isInteger(v)) integer = false;
  });
  let count = o.colors?.length
    ? Math.min(12, o.colors.length)
    : clamp(Math.round(finite(o.levels, 4)), 1, 12);
  let thresholds: number[];
  const given = (o.thresholds ?? [])
    .filter((t) => typeof t === "number" && Number.isFinite(t))
    .slice()
    .sort((a, b) => a - b);
  if (given.length) {
    thresholds = given.slice(0, count - 1);
    count = thresholds.length + 1;
    if (thresholds.some((t) => !Number.isInteger(t))) integer = false;
  } else {
    thresholds = [];
    for (let k = 1; k < count; k++) {
      const t = (max * k) / count;
      thresholds.push(integer ? Math.max(k, Math.ceil(t)) : t);
    }
    // strictly ascending
    for (let k = 1; k < thresholds.length; k++)
      if (thresholds[k] <= thresholds[k - 1])
        thresholds[k] = integer ? thresholds[k - 1] + 1 : thresholds[k - 1];
  }
  return { start, end, values, max, thresholds, count, integer };
};

const finiteWeekStart = (o: CalendarHeatmapOptions) =>
  typeof o.weekStart === "number" && Number.isFinite(o.weekStart)
    ? ((Math.round(o.weekStart) % 7) + 7) % 7
    : localeWeekStart(resolveLocale(o.locale));

/** Level of a value: -1 for the empty days */
export const calendarLevel = (model: CalendarModel, v: number) => {
  if (!(v > 0)) return -1;
  const { thresholds } = model;
  for (let k = 0; k < thresholds.length; k++) if (v <= thresholds[k]) return k;
  return model.count - 1;
};

/** `a–b`, the unit written once when both ends share it (`1–15 min`) */
const span = (a: string, b: string) => {
  let k = 0;
  while (
    k < a.length &&
    k < b.length &&
    a[a.length - 1 - k] === b[b.length - 1 - k] &&
    !/\d/.test(a[a.length - 1 - k])
  )
    k++;
  return `${k ? a.slice(0, a.length - k).trimEnd() : a}\u2013${b}`;
};

/** Names of the levels: "1–3", "4–6", "> 6" */
export const calendarLevelNames = (
  model: CalendarModel,
  fmt: (v: number) => string = localeFormat(),
): string[] => {
  const { thresholds: t, count, integer } = model;
  const names: string[] = [];
  for (let k = 0; k < count; k++) {
    if (k === count - 1) {
      names.push(count === 1 ? "> 0" : `> ${fmt(t[k - 1])}`);
      continue;
    }
    if (integer) {
      const lo = k ? t[k - 1] + 1 : 1;
      names.push(lo >= t[k] ? fmt(t[k]) : span(fmt(lo), fmt(t[k])));
    } else
      names.push(k ? span(fmt(t[k - 1]), fmt(t[k])) : `\u2264 ${fmt(t[k])}`);
  }
  return names;
};

/** Fill of the empty days */
const emptyColor = (theme: ChartTheme): Rgba =>
  mix(theme.background, theme.text, 0.07);

/** Colors of the levels, lowest first */
export const calendarColors = (
  o: CalendarHeatmapOptions,
  theme: ChartTheme,
  count: number,
): Rgba[] => {
  const palette = theme.palette.length ? theme.palette : [theme.primary];
  const base = resolveWith(theme, o.color, palette[0]);
  return Array.from({ length: count }, (_, k) => {
    const own = o.colors?.[k];
    if (own) return resolveWith(theme, own, base);
    return mix(
      theme.background,
      base,
      count === 1 ? 1 : 0.32 + (0.68 * k) / (count - 1),
    );
  });
};

export const calendarValues = (
  o: CalendarHeatmapOptions,
  hidden: ReadonlySet<number>,
  out: Map<string, number>,
) => {
  const model = calendarModel(o);
  const count = model?.count ?? 0;
  for (let k = 0; k < count; k++) out.set(`~L${k}`, hidden.has(k) ? 0 : 1);
};

/** Legend entries: one per level */
export const calendarLegend = (
  o: CalendarHeatmapOptions,
  theme: ChartTheme,
  hidden: ReadonlySet<number>,
): ShapeLegendEntry[] => {
  const model = calendarModel(o);
  if (!model) return [];
  const colors = calendarColors(o, theme, model.count);
  return calendarLevelNames(model, o.format ?? localeFormat(o.locale)).map(
    (name, k) => ({
      index: k,
      name,
      color: toCss(colors[k]),
      hidden: hidden.has(k),
    }),
  );
};

// ------------------------------------------------------------- layout

/** Number of strips of the `weeks` layout (one per year for long ranges) */
export const calendarStrips = (o: CalendarHeatmapOptions) => {
  const model = calendarModel(o);
  if (!model) return 1;
  const y0 = ymd(model.start).y;
  const y1 = ymd(model.end).y;
  return y1 > y0 && model.end - model.start + 1 > 371 ? y1 - y0 + 1 : 1;
};

const HEADER = 18;
const STRIP_GAP = 12;
const BLOCK_GAP = 16;

interface Cell {
  day: number;
  x: number;
  y: number;
}

export const layoutCalendar = (
  o: CalendarHeatmapOptions,
  c: LayoutContext,
): LayoutResult => {
  const { theme, area, measure } = c;
  const model = calendarModel(o);
  if (!model) return emptyLayout(c);
  const { start, end } = model;
  const locale = c.locale;
  const weekStart = finiteWeekStart(o);
  const row = (day: number) => (weekdayOf(day) - weekStart + 7) % 7;
  const gapOpt = Math.max(0, finite(o.gap, 3));
  const months = o.layout === "months";
  const maxCell = Math.max(2, finite(o.maxCellSize, months ? 28 : 16));
  const labelFont = font(theme, 11);
  const muted = toCss(theme.textMuted);
  const y0 = ymd(start).y;
  const y1 = ymd(end).y;
  const nodes: ShapeNode[] = [];
  const cells: Cell[] = [];
  let size = 0;
  /** Distance between two cells (cell + gap) */
  let pitchOf: number;

  if (!months) {
    // strips: one per year when the range is longer than a year
    const strips: { s: number; e: number; year: number | null }[] = [];
    if (y1 > y0 && end - start + 1 > 371)
      for (let y = y0; y <= y1; y++)
        strips.push({
          s: Math.max(start, dayOfYmd(y, 0, 1)),
          e: Math.min(end, dayOfYmd(y, 11, 31)),
          year: y,
        });
    else strips.push({ s: start, e: end, year: null });
    const colOf = (day: number, s: number) =>
      Math.floor((day - (s - row(s))) / 7);
    const ncols = Math.max(...strips.map((st) => colOf(st.e, st.s) + 1));
    const header = o.monthLabels !== false || strips.length > 1 ? HEADER : 0;
    const allRows = o.weekdayLabels !== false;
    const dayNames = Array.from({ length: 7 }, (_, r) =>
      weekdayName(locale, (weekStart + r) % 7, "short"),
    );
    let gutter = allRows
      ? Math.max(...dayNames.map((nm) => measure(nm, labelFont))) + 8
      : 0;
    const yearFont = font(theme, 11, 600);
    if (strips.length > 1)
      gutter = Math.max(gutter, measure(String(y1), yearFont) + 8);
    const n = strips.length;
    const byWidth = (area.width - gutter + gapOpt) / ncols;
    const byHeight =
      ((area.height - (n - 1) * STRIP_GAP) / n - header + gapOpt) / 7;
    let pitch = Math.max(2, Math.min(byWidth, byHeight));
    const gap = Math.min(gapOpt, pitch * 0.25);
    size = Math.min(maxCell, pitch - gap);
    pitch = size + gap;
    pitchOf = pitch;
    const blockW = gutter + ncols * pitch - gap;
    const blockH = n * (header + 7 * pitch - gap) + (n - 1) * STRIP_GAP;
    const left = area.x + Math.max(0, (area.width - blockW) / 2) + gutter;
    let top = area.y + Math.max(0, (area.height - blockH) / 2);
    const showRow = (r: number) =>
      pitch >= 15 || [1, 3, 5].includes((weekStart + r) % 7);

    for (const st of strips) {
      const gridTop = top + header;
      if (st.year !== null)
        nodes.push({
          kind: "text",
          x: left - gutter,
          y: top + header / 2,
          text: String(st.year),
          font: yearFont,
          color: toCss(theme.text, 0.85),
          align: "left",
          baseline: "middle",
        });
      if (allRows && size >= 6)
        dayNames.forEach((nm, r) => {
          if (!showRow(r)) return;
          nodes.push({
            kind: "text",
            x: left - 6,
            y: gridTop + r * pitch + size / 2,
            text: nm,
            font: labelFont,
            color: muted,
            align: "right",
            baseline: "middle",
          });
        });
      if (o.monthLabels !== false) {
        const cols = colOf(st.e, st.s) + 1;
        const labels: { col: number; text: string }[] = [];
        for (const { y, m } of monthsOf(st.s, st.e)) {
          const first = Math.max(st.s, dayOfYmd(y, m, 1));
          const col =
            colOf(first, st.s) + (first > st.s && row(first) > 0 ? 1 : 0);
          if (col < cols) labels.push({ col, text: monthName(locale, y, m) });
        }
        let lastEnd = -Infinity;
        labels.forEach((lb, k) => {
          const x = left + lb.col * pitch;
          const w = measure(lb.text, labelFont);
          const next = labels[k + 1];
          // the partial first month only when it does not crowd the next one
          if (next && k === 0 && left + next.col * pitch < x + w + 6) return;
          if (x < lastEnd + 6 || x + w > left + cols * pitch + 24) return;
          lastEnd = x + w;
          nodes.push({
            kind: "text",
            x,
            y: top + header / 2,
            text: lb.text,
            font: labelFont,
            color: muted,
            align: "left",
            baseline: "middle",
          });
        });
      }
      for (let day = st.s; day <= st.e; day++)
        cells.push({
          day,
          x: left + colOf(day, st.s) * pitch,
          y: gridTop + row(day) * pitch,
        });
      top += header + 7 * pitch - gap + STRIP_GAP;
    }
  } else {
    // a small calendar per month, in the grid of columns giving the biggest cells
    const list = monthsOf(start, end);
    const count = list.length;
    const head =
      (o.monthLabels !== false ? HEADER : 0) +
      (o.weekdayLabels !== false ? 14 : 0);
    let best = { cols: 1, pitch: 0 };
    for (let cols = 1; cols <= count; cols++) {
      const rows = Math.ceil(count / cols);
      const byWidth =
        (area.width - (cols - 1) * BLOCK_GAP + gapOpt) / (7 * cols);
      const byHeight =
        ((area.height - (rows - 1) * BLOCK_GAP) / rows - head + gapOpt) / 6;
      const pitch = Math.min(byWidth, byHeight, maxCell + gapOpt);
      if (pitch > best.pitch + 1e-6) best = { cols, pitch };
    }
    let pitch = Math.max(2, best.pitch);
    const gap = Math.min(gapOpt, pitch * 0.25);
    size = Math.min(maxCell, pitch - gap);
    pitch = size + gap;
    pitchOf = pitch;
    const cols = best.cols;
    const rows = Math.ceil(count / cols);
    const blockW = 7 * pitch - gap;
    const blockH = head + 6 * pitch - gap;
    const totalW = cols * blockW + (cols - 1) * BLOCK_GAP;
    const totalH = rows * blockH + (rows - 1) * BLOCK_GAP;
    const left = area.x + Math.max(0, (area.width - totalW) / 2);
    const top = area.y + Math.max(0, (area.height - totalH) / 2);
    const withYear = y1 > y0;
    const titleFont = font(theme, 12, 600);
    const narrow = Array.from({ length: 7 }, (_, r) =>
      weekdayName(locale, (weekStart + r) % 7, "narrow"),
    );
    list.forEach(({ y, m }, k) => {
      const bx = left + (k % cols) * (blockW + BLOCK_GAP);
      const by = top + Math.floor(k / cols) * (blockH + BLOCK_GAP);
      let hy = by;
      if (o.monthLabels !== false) {
        nodes.push({
          kind: "text",
          x: bx,
          y: hy + HEADER / 2 - 1,
          text: withYear
            ? format(
                locale,
                { month: "short", year: "numeric" },
                dayOfYmd(y, m, 1),
                `${EN_MONTHS[m]} ${y}`,
              )
            : format(
                locale,
                { month: "long" },
                dayOfYmd(y, m, 1),
                EN_MONTHS[m],
              ),
          font: titleFont,
          color: toCss(theme.text, 0.88),
          align: "left",
          baseline: "middle",
        });
        hy += HEADER;
      }
      if (o.weekdayLabels !== false) {
        if (size >= 8)
          narrow.forEach((nm, r) =>
            nodes.push({
              kind: "text",
              x: bx + r * pitch + size / 2,
              y: hy + 6,
              text: nm,
              font: font(theme, 10),
              color: muted,
              align: "center",
              baseline: "middle",
            }),
          );
        hy += 14;
      }
      const first = dayOfYmd(y, m, 1);
      const last = Math.min(end, dayOfYmd(y, m + 1, 0));
      const lead = row(first);
      for (let day = Math.max(first, start); day <= last; day++) {
        const offset = lead + (day - first);
        cells.push({
          day,
          x: bx + (offset % 7) * pitch,
          y: hy + Math.floor(offset / 7) * pitch,
        });
      }
    });
  }

  // cells and items
  const colors = calendarColors(o, theme, model.count);
  const empty = emptyColor(theme);
  const vis = colors.map((_, k) =>
    clamp(c.value(`~L${k}`, c.hidden.has(k) ? 0 : 1), 0, 1),
  );
  const radius = clamp(finite(o.radius, 2), 0, size / 2);
  const outline = toCss(theme.text, 0.75);
  const hitPad = Math.max(0, (pitchOf - size) / 2);
  const items: ShapeItem[] = [];
  for (const cell of cells) {
    const v = model.values.get(cell.day) ?? 0;
    const level = calendarLevel(model, v);
    const fill = level < 0 ? empty : mix(empty, colors[level], vis[level] ?? 1);
    const css = toCss(fill);
    const index = cell.day - start;
    nodes.push({
      kind: "rect",
      x: cell.x,
      y: cell.y,
      width: size,
      height: size,
      radius,
      fill: css,
      hit: index,
      hoverStroke: outline,
      hitPad,
    });
    const percent = model.max > 0 ? v / model.max : 0;
    items.push({
      index,
      name: dateName(locale, cell.day),
      value: v,
      percent,
      share: c.percent(percent),
      color: level < 0 ? css : toCss(colors[level]),
      x: cell.x + size / 2,
      y: cell.y + size / 2,
      rows: [{ name: c.labels.value, value: c.format(v) }],
      event: { date: calendarIso(cell.day) },
    });
  }
  items.sort((a, b) => a.index - b.index);

  const enter = clamp(c.enter, 0, 1);
  return {
    nodes,
    items,
    dim: 1,
    empty: false,
    steps: months ? { next: 1, down: 7 } : { next: 7, down: 1 },
    ...(enter < 1
      ? {
          enter: {
            alpha: enter,
            scale: 0.985 + 0.015 * enter,
            cx: area.x + area.width / 2,
            cy: area.y + area.height / 2,
          },
        }
      : {}),
  };
};
