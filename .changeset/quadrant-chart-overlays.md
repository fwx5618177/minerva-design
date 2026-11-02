---
"minerva-design": minor
---

QuadrantChart: quadrant badges, descriptions and counts, selection rings, React header slot and an accessible point layer; readable intra-day Gantt schedules.

- `QuadrantRegion` gains `badge` (a pill such as "Q1") and `description` (a second line under the title); `showCounts` (boolean or `(count, points) => string`) writes the number of points after each title. Long titles are now cut with … to the quadrant width. Drawn on every renderer (React, Vue, Web Components, Angular, React Native, Taro, uni-app, WeChat; mini-programs take a boolean `showCounts`).
- `selectedIndex` / `selectedIndices` draw a ring around the selected dots on every renderer.
- React only: `renderQuadrantHeader(corner, { count, points, indices, region })` replaces the drawn title with React content in the outer corner of each quadrant; `accessiblePoints` (on by default) adds a visually hidden list of buttons per quadrant (Enter / Space → `onPointClick`, Shift + arrow keys → `onPointDrop` to the next quadrant, announced in a polite live region) and draws a focus ring around the focused dot; every dot gets an invisible anchor with `data-point-index` / `data-label` (`getPointProps` adds attributes such as `data-testid`) for end-to-end tests.
- Engine: `quadrantGroups`, `quadrantLabels` and `quadrantCountText` are exported from `minerva-design/charts/core`; rect annotations accept `badge`, `detail` and `description`; scatter series accept `stroke` (ring width, hollow with `opacity: 0`).
- GanttChart: schedules of a day or two snap the time range to whole hours (quarter hours under 3 hours) and keep at least four hour:minute ticks on narrow charts (2-hour steps available), so swimlanes such as priority lanes over 08:00–22:00 read cleanly.
