---
"minerva-design": minor
---

Charts: GPU shape charts, glass tooltips that stay off the hovered mark, clearer hover emphasis.

- **Shape charts on the GPU**: pie / donut, radar, gauge, funnel, treemap, sankey, sunburst, radial bar, calendar heatmap, bullet and chord charts now draw their shapes with WebGPU, then WebGL2 / WebGL (same order and software-GPU rules as the other charts, following `setDefaultChartRenderer`), with Canvas2D as the fallback. Paths are tessellated into triangles drawn with 4x MSAA and stencil-based nonzero fills; text stays on a 2D canvas above. New `renderer` option / prop (React, Vue, Web Components `options`, Angular) and `getRenderer()`; the chart root reports its backend in `data-renderer`. Mini-program canvas hosts keep Canvas2D.
- **Tooltips**: translucent background with a backdrop blur (opaque where `color-mix` is unsupported), placed beside the hovered bar group, point, cell, slice or row instead of over it (Gantt and horizontal bars: above / below the row). Tooltips larger than a tiny chart (sparklines) are shown outside it, in the top layer where the Popover API exists. Shape chart tooltips also avoid labels. Native and canvas tooltips are translucent too.
- **Hover emphasis**: the hovered bar (bar charts, histograms, waterfalls, Gantt tasks) is redrawn thicker (never longer), ringed and lifted above a veil that dims the rest of the plot; grouped bars never grow into their neighbours. Heatmap cells get a 2px contrasting ring, a halo and a larger lift. A short grow-in animation is skipped when the user prefers reduced motion.
