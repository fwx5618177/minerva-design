// Optional define entries of the chart elements: `chart` (cartesian and
// shape charts), `trading-chart`, `order-book`, `chart-3d` and `graph`
// (their engines are only loaded by the pages that use them), and `icon`
// (<minerva-icon>, <minerva-icon-canvas>: it loads the icon set). Used by the
// live demos (which entries to load) and by the framework conversions (which
// entries to import).

/** Optional entries of the chart (and icon) elements */
export const CHART_ENTRIES = [
  "chart",
  "trading-chart",
  "order-book",
  "chart-3d",
  "graph",
  "icon",
] as const;

export type ChartEntry = (typeof CHART_ENTRIES)[number];

/** Define entry of a chart or icon element tag, `undefined` for the other tags */
export const chartEntryOf = (tag: string): ChartEntry | undefined => {
  if (tag === "minerva-icon" || tag === "minerva-icon-canvas") return "icon";
  if (tag === "minerva-trading-chart") return "trading-chart";
  if (
    /^minerva-(depth-chart|order-book|order-book-heatmap|time-and-sales)$/.test(
      tag,
    )
  )
    return "order-book";
  if (/^minerva-[a-z]+-3d-chart$/.test(tag)) return "chart-3d";
  if (/^minerva-(graph-chart|dependency-graph|tree-chart)$/.test(tag))
    return "graph";
  if (
    /^minerva-([a-z-]+-)?chart$|^minerva-(sparkline|calendar-heatmap)$/.test(
      tag,
    )
  )
    return "chart";
  return undefined;
};

/** Chart entries used by the elements of an HTML fragment, in `CHART_ENTRIES` order */
export const chartEntriesOf = (html: string): ChartEntry[] => {
  const used = new Set<ChartEntry>();
  for (const [, tag] of html.matchAll(/<(minerva-[a-z0-9-]+)/g)) {
    const entry = chartEntryOf(tag);
    if (entry) used.add(entry);
  }
  return CHART_ENTRIES.filter((entry) => used.has(entry));
};
