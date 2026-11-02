// Section layout, counts and grid navigation of the AnswerSheet (question
// navigator) of every renderer.

/** Statuses of an AnswerSheet question, in legend order. */
export const ANSWER_SHEET_STATUSES = [
  "unanswered",
  "answered",
  "correct",
  "wrong",
  "skipped",
] as const;

/** Status of an AnswerSheet question. */
export type AnswerSheetItemStatus = (typeof ANSWER_SHEET_STATUSES)[number];

/** The fields of an AnswerSheet item the helpers read. */
export interface AnswerSheetItemLike {
  key: string;
  label?: string;
  status?: string;
  flagged?: boolean;
  disabled?: boolean;
  group?: string;
}

/** A titled section of an AnswerSheet. */
export interface AnswerSheetGroupLike {
  key: string;
  title: string;
}

/** An item placed in a section, with its display index across the sheet. */
export interface AnswerSheetEntry<T extends AnswerSheetItemLike> {
  item: T;
  /** Display index across every section (its default label is index + 1) */
  index: number;
  /** Normalized status */
  status: AnswerSheetItemStatus;
  /** Visible label */
  label: string;
}

/** A section of an AnswerSheet: untitled (no group) or a group. */
export interface AnswerSheetSection<T extends AnswerSheetItemLike> {
  /** "" for the untitled section, else the group key */
  key: string;
  title?: string;
  entries: AnswerSheetEntry<T>[];
}

/** A known status, else "unanswered". */
export const answerSheetStatus = (status?: string): AnswerSheetItemStatus =>
  (ANSWER_SHEET_STATUSES as readonly string[]).includes(status ?? "")
    ? (status as AnswerSheetItemStatus)
    : "unanswered";

/**
 * The sections of an AnswerSheet: the items without a known group first (an
 * untitled section), then each group in `groups` order; items keep their
 * order. Empty sections are dropped. Display indexes run across sections.
 */
export function answerSheetSections<T extends AnswerSheetItemLike>(
  items: readonly T[] | null | undefined,
  groups?: readonly AnswerSheetGroupLike[] | null,
): AnswerSheetSection<T>[] {
  const list = Array.isArray(items) ? items : [];
  const known = new Set((groups ?? []).map((group) => group.key));
  const buckets: { key: string; title?: string; items: T[] }[] = [
    {
      key: "",
      items: list.filter((item) => !item.group || !known.has(item.group)),
    },
    ...(groups ?? []).map((group) => ({
      key: group.key,
      title: group.title,
      items: list.filter((item) => item.group === group.key),
    })),
  ];
  let index = 0;
  const sections: AnswerSheetSection<T>[] = [];
  for (const bucket of buckets) {
    if (!bucket.items.length) continue;
    sections.push({
      key: bucket.key,
      title: bucket.title,
      entries: bucket.items.map((item) => {
        const entry = {
          item,
          index,
          status: answerSheetStatus(item.status),
          label: item.label ?? String(index + 1),
        };
        index += 1;
        return entry;
      }),
    });
  }
  return sections;
}

/** Answered questions (answered, correct or wrong) and the total. */
export function answerSheetSummary(
  items: readonly AnswerSheetItemLike[] | null | undefined,
): { answered: number; total: number } {
  const list = Array.isArray(items) ? items : [];
  const answered = list.filter((item) =>
    ["answered", "correct", "wrong"].includes(answerSheetStatus(item.status)),
  ).length;
  return { answered, total: list.length };
}

/**
 * The legend entries of an AnswerSheet: the statuses present (in
 * ANSWER_SHEET_STATUSES order), then "flagged" when an item is flagged.
 */
export function answerSheetLegend(
  items: readonly AnswerSheetItemLike[] | null | undefined,
): (AnswerSheetItemStatus | "flagged")[] {
  const list = Array.isArray(items) ? items : [];
  const present = new Set(list.map((item) => answerSheetStatus(item.status)));
  const out: (AnswerSheetItemStatus | "flagged")[] =
    ANSWER_SHEET_STATUSES.filter((status) => present.has(status));
  if (list.some((item) => item.flagged)) out.push("flagged");
  return out;
}

/** A keyboard move of an AnswerSheet. */
export type AnswerSheetMove =
  "previous" | "next" | "first" | "last" | "up" | "down";

/**
 * The display index reached from `index` by a keyboard move: previous / next
 * in display order, first / last, and up / down by a row when the sheet has
 * fixed `columns` (rows restart in each section; moving past a section goes
 * to the nearest row of the next / previous one, same column, clamped).
 * Returns null when there is nowhere to go (up / down without columns).
 */
export function answerSheetMoveIndex(
  sections: readonly { entries: readonly unknown[] }[],
  index: number,
  move: AnswerSheetMove,
  columns?: number,
): number | null {
  const sizes = sections.map((section) => section.entries.length);
  const total = sizes.reduce((sum, size) => sum + size, 0);
  if (!total) return null;
  const clamp = (next: number) => Math.min(total - 1, Math.max(0, next));
  switch (move) {
    case "previous":
      return clamp(index - 1);
    case "next":
      return clamp(index + 1);
    case "first":
      return 0;
    case "last":
      return total - 1;
  }
  const cols = columns && columns > 0 ? Math.floor(columns) : 0;
  if (!cols) return null;
  // locate the section of the index
  let start = 0;
  let section = 0;
  while (section < sizes.length && index >= start + sizes[section]) {
    start += sizes[section];
    section += 1;
  }
  if (section >= sizes.length) return clamp(index);
  const offset = index - start;
  const column = offset % cols;
  if (move === "down") {
    if (offset + cols < sizes[section]) return index + cols;
    // a shorter last row below: its last item
    const lastRow = Math.floor((sizes[section] - 1) / cols);
    if (Math.floor(offset / cols) < lastRow) return start + sizes[section] - 1;
    if (section + 1 >= sizes.length) return index;
    return start + sizes[section] + Math.min(column, sizes[section + 1] - 1);
  }
  if (offset - cols >= 0) return index - cols;
  if (section === 0) return index;
  const size = sizes[section - 1];
  const prevStart = start - size;
  const rowStart = Math.floor((size - 1) / cols) * cols;
  return prevStart + Math.min(rowStart + column, size - 1);
}
