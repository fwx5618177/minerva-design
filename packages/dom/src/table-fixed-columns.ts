/**
 * Keep at least 120px of reading space between fixed blocks. On smaller
 * viewports all columns scroll together; declared widths and content remain
 * intact. Use measured cell widths, including padding and selection columns,
 * so percentage, automatic and content-expanded widths share the same budget.
 */
export function updateFixedColumnBudget(viewport: HTMLElement): void {
  const table = viewport.querySelector("table");
  const row = table?.querySelector("thead tr") ?? table?.querySelector("tr");
  const cells = Array.from(
    row?.querySelectorAll<HTMLElement>(":scope > th, :scope > td") ?? [],
  );
  const fixed = cells.filter((cell) => cell.hasAttribute("data-fixed"));
  const width = fixed.reduce(
    (total, cell) => total + cell.getBoundingClientRect().width,
    0,
  );
  const readingSpace = cells.length > fixed.length ? 120 : 0;
  viewport.toggleAttribute(
    "data-fixed-overflow",
    fixed.length > 0 &&
      viewport.clientWidth > 0 &&
      width + readingSpace > viewport.clientWidth,
  );
}
