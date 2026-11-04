// Self-contained CDN files of `dist/web-components/cdn/`, for pages without a
// build step (`<script type="module" src=".../cdn/<name>.js">`).
//
// `minerva` registers every element of the all-in-one entry. The optional
// entries load an engine (the charts of minerva-design/charts/core, the icon
// set of minerva-design/icons/core), so they are not part of it: each gets a
// file of its own, bundled with Lit and its engine, that a page loads next to
// (or instead of) `minerva.js`. Elements defined by both files are registered
// once (the first file to load wins, see `defineElement`).
//
// `code-editor` has no CDN file: the Monaco engine it needs is injected by the
// host application.

/** Optional define entries (`src/elements/<name>.ts`) with a CDN file */
export const CDN_OPTIONAL_ENTRIES = [
  "chart",
  "trading-chart",
  "order-book",
  "chart-3d",
  "graph",
  "quadrant-task-board",
  "icon",
];

/** Every CDN file name (without `.js`), the all-in-one bundle first */
export const CDN_FILES = ["minerva", ...CDN_OPTIONAL_ENTRIES];
