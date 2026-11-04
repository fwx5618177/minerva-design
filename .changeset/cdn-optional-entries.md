---
"minerva-design": minor
---

Add self-contained CDN files for the optional Web Components entries, so charts and icons work on pages without a build step. `dist/web-components/cdn/` now holds `chart.js`, `trading-chart.js`, `order-book.js`, `chart-3d.js`, `graph.js`, `quadrant-task-board.js` and `icon.js` next to `minerva.js`. Load them with `<script type="module" src>`. A bare `import "minerva-design/web-components/chart"` still needs a bundler or an import map. The plain HTML guide and the HTML setup of the chart and icon pages now show these files.
