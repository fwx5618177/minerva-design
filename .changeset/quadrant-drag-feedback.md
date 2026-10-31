---
"minerva-design": minor
---

QuadrantChart: drag and double-click feedback. React gets `onPointDrag`, which reports every move of a dragged dot with the quadrant under the pointer, and `onPointDoubleClick`, which fires when the same dot is clicked twice quickly (`onPointClick` still fires for each click). While a dot is dragged, React also highlights the quadrant it would drop into. The same events are on Vue (`pointDrag`, `pointDoubleClick`), Angular (`pointDrag`, `pointDoubleClick`), and `<minerva-quadrant-chart>` (`minerva-point-drag`, `minerva-point-double-click`). Setting `onPointDrag` alone now makes the dots draggable, the same as `onPointDrop`.
