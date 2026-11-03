---
"minerva-design": patch
---

Sharper and tidier quadrant boards and charts on mini programs, and quadrant point labels that stay in their quadrant.

- **QuadrantTaskBoard** (Taro, uni-app, WeChat): the quadrant headers are compact single-line pills in a 2 x 2 grid, like the web board: the badge and the task count are small chips, a long quadrant title is cut with an ellipsis instead of wrapping, and the + button sits at the end. The headers are styled by the shared stylesheet (no inline layout) and can be themed with `--quadrant-task-board-header-background`, `--quadrant-task-board-header-color`, `--quadrant-task-board-count-background` and `--quadrant-task-board-count-color`.
- **Charts on Taro H5** were blurry on high-density screens: the canvas was drawn at 1x because Taro's H5 runtime has no pixel ratio API on its default export. Charts now use the page's `devicePixelRatio` there. Canvas charts (Taro and uni-app H5 included) also draw again right away when the host component resets the size of the canvas behind them, instead of staying blank or blurry until the next update.
- **Taro Input**: small and large inputs no longer pad their text twice, so their text lines up like in medium inputs. This also fixes the name field of the QuadrantTaskBoard panel.
- **Quadrant charts** (every renderer): a point label stays inside the quadrant of its dot. It goes on the side of the dot with more room in the quadrant, and is cut with "…" when it still does not fit (a label that would keep only a few letters is left out; the tooltip still names the point), so it no longer crosses the center dividers or runs into the dots of the next quadrant. Overlapping labels are still skipped. The behavior comes from a new scatter series option, `labelCells: { x, y }`, which keeps labels inside the cells of a plot cut at those values.
