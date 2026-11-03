---
"minerva-design": minor
---

Quadrant charts: one shared point card on every renderer, and no Playwright.

- Fix: after a click, the card of the clicked point no longer stays on the chart and hides the others. A plain chart rings its selected point; only boards (with point actions) keep the card of the selected point. Escape closes the card, and a click beside the points drops a selection the chart made itself.
- The hovered point is kept while the parent passes new arrays of the same points, and through new data under a still pointer (e.g. the selection ring added by a click).
- Faster hover: the card is DOM of its own, so hovering renders no React, Vue or Angular component, and showing or hiding a drawn label redraws only the foreground canvas.
- New in `minerva-design/charts/core`: `createQuadrantPointCard`, `withQuadrantCard` and `QUADRANT_CARD_LINGER_MS`. Vue, Web Components and Angular quadrant charts now show the same card as React (no engine tooltip), with the point actions inside it; `<minerva-quadrant-chart>` adds the `point-card` part.
- Crowded cells: a label also tries beside its dot half a line up or down before it is skipped.
- Tests: the browser suites are replaced by Vitest tests with happy-dom.
