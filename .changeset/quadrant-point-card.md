---
"minerva-design": minor
---

QuadrantChart (React): one point card for hover, focus, selection and drag. The card carries the point's dot (placed exactly on the point), its name and its quadrant (with the badge), and the point's actions (`renderPointActions`) beside the name. The engine tooltip and hover label chip are gone, and the drawn label of the active point gives way to the card while the other labels keep their places. `renderTooltip` now fills the card. The card stays while the pointer moves from the dot to its actions, mirrors near the right edge (without flipping back and forth during a drag), and stays inside the plot near the top and bottom edges. Clicking its name selects the point.

QuadrantTaskBoard: compact edit and delete buttons (xsmall, 14px icons). On React they sit in the task card; on Vue, Angular and Web Components the toolbar above the task is smaller. On narrow phones (≤ 360px) the mini program headers give the title the room: the badge is hidden and the chips are tighter.

Chart engine: new `interaction.hoverLabel` option (`false` keeps a hovered dot's label as drawn) and `ChartInstance.setLabelHidden()` (hides a point's drawn label but keeps its place). Labels kept in quadrant cells now keep a gap between each other and never sit nearer to another dot than to their own, so crowded quadrants no longer pair a name with the wrong dot.
