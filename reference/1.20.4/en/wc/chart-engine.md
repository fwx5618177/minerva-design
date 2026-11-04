# Chart engine

The framework-free engine behind the React charts: createChart mounts a chart in any element, createCanvasChart draws on any 2D canvas (mini-programs, OffscreenCanvas) and createChartController computes the scene for hosts without a canvas. createShapeChart and createCanvasShapeChart do the same for the pie, donut, radar, gauge, funnel, treemap, sunburst, Sankey, chord, radial bar, bullet and calendar heatmap charts. The other families have their own engines: createTradingChart, createDepthChart / createOrderBook / createOrderBookHeatmap / createTimeAndSales, createChart3D and createGraphChart; setDefaultChartRenderer() sets the backend of every GPU chart.

Package: minerva-design@1.20.4

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Which entry point?

The three entry points share the same options, layout, hit testing and gestures; they differ in what they need from the host:

createChart(container, options): web pages. It mounts the chart in a DOM element, draws the data with WebGPU, then WebGL2, then WebGL, then Canvas2D, renders an accessible DOM tooltip and legend, reads the theme from the CSS variables and handles wheel, pointer and keyboard input itself.

createCanvasChart({ canvas, width, height, pixelRatio, options, theme }): any 2D canvas, with no DOM at all (WeChat / Taro / uni-app canvas type="2d", OffscreenCanvas, a plain ). Everything, tooltip and legend included, is drawn on the canvas; the host forwards its touch or pointer events and passes the theme as plain values. The mini-program charts are built on it.

createChartController({ options, measureText }): no canvas at all. It computes the scene (layout, ticks, legend, tooltip, highlight) and handles the gestures; scenePrimitives(scene) turns the data into a bounded list of pixel shapes for hosts that draw with views or SVG. The React Native charts are built on it.

#### Quadrant helpers

quadrantChartOptions(config) builds the engine options of a QuadrantChart for any entry point; quadrantOf(config, x, y) returns the quadrant of a data position as seen on screen (reverseX included) and quadrantCenter(config, corner) the center of a quadrant, e.g. to place a new or dropped point. quadrantGroups(config) lists the points and indices of each quadrant, quadrantCountText(showCounts, points, locale) formats a quadrant count and quadrantLabels(locale) returns the built-in texts of the accessible point layer. createQuadrantPointLayer(host, options) mounts that layer (one list of point buttons per quadrant, arrows between the points, Shift + arrows to move the focused point to the neighbouring quadrant, a live region announcing the move) in any DOM renderer; createQuadrantPointCard(host, options) mounts the point card of the matrices in any DOM renderer (one glass card for the hovered, focused or dragged point, or the selected one on boards: its dot on the point, its name, its quadrant and the actions of the host) and withQuadrantCard(options) turns off the engine tooltip, label chip and drag pill beside it; QUADRANT_CARD_LINGER_MS is how long the card stays after the pointer leaves its dot; quadrantKeyTarget(event, corner) returns the quadrant a Shift + arrow key leads to and quadrantAccessibleGroups(config, locale) the names, labels and move actions of the points for hosts without a DOM. Task boards (the QuadrantTaskBoard of every renderer) share their logic too: QUADRANT_CORNERS lists the four corners, quadrantTaskLabels(locale, overrides) returns the localized texts of the buttons and panels, newQuadrantTaskDraft / editQuadrantTaskDraft fill the add / edit panel, canSaveQuadrantTask and applyQuadrantTaskDraft check and apply it, moveQuadrantTask and removeQuadrantTask return the next list of points, selectionAfterRemove the selection after a delete, quadrantTaskDeleteText the text of the delete confirmation, QUADRANT_TASK_ICONS the paths of the add, edit and delete icons, placeQuadrantTaskPanel(anchor, panel, board) the place of the inline add / edit / delete panel next to its anchor (below it, above when there is no room below, kept inside the board) quadrantTaskColor(quadrants, corner) the color of a quadrant and quadrantTaskIconUri(kind, color) one of those icons as a base64 SVG data URI for hosts drawing it in an image (mini programs).

Downloads

Downloads per release

unsupported

{{release}}: {{downloads}} downloads

Click a bar

Renderer: {{renderer}}

Visits

Sign-ups (×10)

Visits and sign-ups per month

Click a point

Search

Direct

Social

Email

Referral

Visits

Sign-ups

Trials

Customers

Visits per source

visits

Conversion funnel

Pie

Donut

Funnel

{{name}}: {{value}} ({{share}})

Click a slice or a stage

CPU

Seconds

Live CPU usage

Resume

Pause

Paused · {{points}} points received

Streaming · {{points}} points received

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
