// Pure helpers of the "On this page" table of contents (unit tested).

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Headings listed in the table of contents */
export const TOC_SELECTOR = "h2[id], h3[id]";

/**
 * Headings hidden from the TOC: inactive tab panels, demo previews (their
 * headings belong to the demo, not the page) and explicitly ignored blocks.
 */
const IGNORED = "[hidden], [inert], [aria-hidden='true'], [data-toc-ignore]";

/** The visible h2 / h3 headings (with an id) of `root`, in document order. */
export function collectHeadings(root: ParentNode | null): TocItem[] {
  if (!root) return [];
  const items: TocItem[] = [];
  for (const el of root.querySelectorAll<HTMLElement>(TOC_SELECTOR)) {
    if (el.closest(IGNORED)) continue;
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    items.push({ id: el.id, text, level: el.tagName === "H2" ? 2 : 3 });
  }
  return items;
}

/**
 * Id of the section being read: the last heading whose top edge has scrolled
 * above `offset` (px from the top of the viewport); the first heading while
 * none has, and the last one once the page is scrolled to the bottom.
 */
export function getActiveId(
  positions: readonly { id: string; top: number }[],
  offset: number,
  atBottom = false,
): string | undefined {
  if (positions.length === 0) return undefined;
  if (atBottom) return positions[positions.length - 1].id;
  let active = positions[0].id;
  for (const { id, top } of positions) {
    if (top - offset <= 1) active = id;
    else break;
  }
  return active;
}

/** Same list (ids, texts and levels), to skip needless re-renders. */
export const sameItems = (a: readonly TocItem[], b: readonly TocItem[]) =>
  a.length === b.length &&
  a.every(
    (item, i) =>
      item.id === b[i].id &&
      item.text === b[i].text &&
      item.level === b[i].level,
  );

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Scrolls to a heading and moves focus there (for keyboard / AT users). */
export const scrollToHeading = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView?.({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
};
