# Quadrant chart

A four-quadrant matrix (priority, Eisenhower, BCG...) with tinted, titled quadrants and labelled dots.

Package: minerva-design@1.23.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Dark mode

Single sign-on

CSV export

Offline sync

New icons

Plugin API

Custom fonts

Tooltips

Rewrite

Search

Quick wins

Big bets

Fill-ins

Time sinks

Money pits

Effort

Impact

Feature

Features by effort and impact

{{feature}}: effort {{effort}}, impact {{impact}}

Tap a feature

Fix login outage

Tax filing

Quarterly planning

Mentoring

Book travel

Most meetings

Inbox zero

Social media

Do first

Schedule

Delegate

Eliminate

Urgency

Importance

Task

Eisenhower matrix of tasks

{{task}}: urgency {{urgency}}, importance {{importance}}

Click a task

Task {{n}}

{{task}} added to “{{quadrant}}”

Add a task to “{{quadrant}}”

Important

Not important

Urgent

Not urgent

{{task}} moved to “{{quadrant}}”

Moving {{task}} to “{{quadrant}}”

{{task}} saved in “{{quadrant}}”

{{task}} deleted

Edit {{task}}

Task name

Quadrant

Save

Cancel

Delete

Urgency {{urgency}} · Importance {{importance}}

Task matrix: drag tasks between quadrants

Drag a task to another quadrant, double-click it to edit, or click an empty area to add one

“{{quadrant}}” tapped

Drag a task to another quadrant

Do it now

Plan a time

Hand it off

Drop it

{{count}} task · {{time}}

{{count}} tasks · {{time}}

{{task}} selected

Click a task to select it, or drag it. Keyboard: Tab to a task, then Shift + arrow keys move it to another quadrant

Click + to add a task to a quadrant, click a task to select it

Eisenhower matrix of today's tasks with their estimates

Cloud hosting

Analytics

Mobile SDK

On-premise licenses

Support plans

Hardware

Training

Stars

Question marks

Cash cows

Dogs

Relative market share

Market growth (%)

Product

BCG matrix of the product portfolio

Key person leaves

Vendor delay

Data breach

Scope creep

Budget cut

New regulation

Cloud outage

Office move

Monitor

Act now

Accept

Mitigate

Likelihood

Impact

Risk

Selected: {{risk}}

Click a risk

Risk matrix of the project by likelihood and impact

{{name}} (us)

Best value

Premium

Budget

Overpriced

High quality

Low quality

Low price

High price

Brand

Brands by price and perceived quality

Bulk edit

SAML single sign-on

Offline mode

Onboarding tour

AI summaries

Color themes

Audit log

Chat alerts

Public API v2

CSV import

Weight by confidence

Effort (person-months)

Reach × impact (thousand users)

Reach {{reach}}k · impact {{impact}} · confidence {{confidence}} · effort {{effort}} person-months

RICE score: {{score}}

Top 3 by RICE score: {{list}}

Backlog prioritized with RICE: effort against reach times impact

Strengths

Weaknesses

Opportunities

Threats

Internal

External

Helpful

Harmful

Loyal customers

In-house platform

Low churn

Small sales team

Legacy billing

Single region

Growing SMB market

Reseller partnerships

AI features

Well-funded entrant

New data rules

Price war

{{n}} factors

{{quadrant}}: {{items}}

{{factor}} ({{quadrant}})

Click a quadrant to list its factors, or a factor to select it

SWOT analysis: strengths, weaknesses, opportunities and threats

Affordability

Feature depth

Ease of use

Support quality

Integrations

Horizontal axis

Vertical axis

{{name}} (us)

Strong on both

Weak on both

{{dimension}} {{score}}

{{name}}: {{scores}}. Ahead of us on {{ahead}} of {{total}} dimensions.

{{name}} (us): {{scores}}.

Choose two dimensions, then click a vendor to see its profile

Competitors by {{x}} and {{y}}

Backend lead

Product designer

Data analyst

QA engineer

Mobile developer

Product manager

Support lead

Junior developer

Future leaders

Rough diamonds

Solid performers

Needs support

Performance

Potential

{{person}}: performance {{performance}}, potential {{potential}} → {{quadrant}}

{{person}} placed in “{{quadrant}}”

{{person}} is back to the initial rating

All ratings are back to their initial values

Reset all

{{n}} of {{total}} recalibrated

Drag a person to recalibrate them, double-click to undo

Talent calibration: performance against potential

Auth

Search

Checkout

Catalog

Payments

Notifications

Recommendations

Media

Healthy

Slow

Erroring

Critical

p95 latency (ms)

Error rate (%)

p95 {{latency}} · errors {{errors}}

Over both SLOs: {{list}}

No service is over both SLOs

Pause

Resume

Live service health: p95 latency against error rate

## QuadrantChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "QuadrantChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "renderPointActions",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:9048008b27733b64933b",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React actions (e.g. compact edit / delete icon buttons) shown in the card of the active point (hovered, focused or selected), beside its name"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:9d1e0fd545bd7a9a74de",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the card of the active point, in place of its name and quadrant (the engine tooltip is not shown)"
  },
  {
    "name": "quadrantContent",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "Partial<Record<keyof QuadrantRegions, ReactNode>> | undefined",
    "typeRef": "type:771baa9ee9c2890c3c21",
    "required": false,
    "description": "React content placed over each quadrant (e.g. an add button); the content receives pointer events, the rest of the quadrant does not"
  },
  {
    "name": "renderQuadrantHeader",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((corner: keyof QuadrantRegions, info: QuadrantHeaderInfo) => ReactNode) | undefined",
    "typeRef": "type:11ea235fc58270a55563",
    "parameters": [
      {
        "name": "corner",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "keyof QuadrantRegions",
        "typeRef": "type:3619c943e5fcb3ed927b"
      },
      {
        "name": "info",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "QuadrantHeaderInfo",
        "typeRef": "type:3302dc0096d95e0be551"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React header of each quadrant, in its outer corner (top edge for the top quadrants, bottom edge for the bottom ones, aligned to the outer side); replaces the drawn title, badge, description and count. The header receives pointer events (e.g. an add button)"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Visually hidden list of buttons per quadrant so keyboard and screen reader users can reach the dots: Enter / Space calls `onPointClick`, Shift + arrow keys move the point to the next quadrant (`onPointDrop` with the center of that quadrant); the focused dot gets a focus ring"
  },
  {
    "name": "getPointProps",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => Record<string, string | number | boolean | undefined>) | undefined",
    "typeRef": "type:3a38bf6f689ec1b86b9e",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "Record<string, string | number | boolean | undefined>",
      "typeRef": "type:5ce0408cbbccff4d7b83"
    },
    "required": false,
    "description": "Extra attributes of the invisible anchor placed on each dot (e.g. `data-testid`); every anchor already has `data-point-index` and `data-label` and the class `minerva-chart-quadrant-point`"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "points",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly QuadrantPoint[]",
    "typeRef": "type:f804470d1c73a5c2f896",
    "required": true,
    "description": "Points to place"
  },
  {
    "name": "xDomain",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "[number, number] | undefined",
    "typeRef": "type:e4bdfc457972809a67b5",
    "required": false,
    "description": "Range of the horizontal axis"
  },
  {
    "name": "yDomain",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "[number, number] | undefined",
    "typeRef": "type:e4bdfc457972809a67b5",
    "required": false,
    "description": "Range of the vertical axis"
  },
  {
    "name": "xSplit",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "X value of the vertical divider (the middle of `xDomain` by default)"
  },
  {
    "name": "ySplit",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Y value of the horizontal divider (the middle of `yDomain` by default)"
  },
  {
    "name": "quadrants",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "object",
    "typeText": "QuadrantRegions | undefined",
    "typeRef": "type:18e5fb722a72b3b97023",
    "required": false,
    "description": "Titles and colors of the quadrants"
  },
  {
    "name": "xLabel",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the horizontal axis"
  },
  {
    "name": "yLabel",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the vertical axis"
  },
  {
    "name": "axisLabels",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "object",
    "typeText": "QuadrantAxisLabels | undefined",
    "typeRef": "type:9074f8421ff542cd9005",
    "required": false,
    "description": "Texts at the ends of the dividers, drawn inside the plot (e.g. \"Important\" at the top)"
  },
  {
    "name": "showTicks",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the numeric ticks of the axes; `false` keeps only the matrix"
  },
  {
    "name": "reverseX",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
  },
  {
    "name": "showLabels",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the labels next to the dots (overlapping labels are skipped)"
  },
  {
    "name": "pointSize",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Dot diameter in pixels"
  },
  {
    "name": "name",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the points in the tooltip"
  },
  {
    "name": "draggable",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Lets the user drag the dots (`drag` / `drop` events)"
  },
  {
    "name": "showCounts",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string) | undefined",
    "typeRef": "type:887384379eb9946d9822",
    "parameters": [
      {
        "name": "count",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "points",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "readonly QuadrantPoint[]",
        "typeRef": "type:f804470d1c73a5c2f896"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "default": false,
    "required": false,
    "description": "Shows the number of points of each quadrant after its title; a function returns the text instead (e.g. `(n) => `${n} tasks``)"
  },
  {
    "name": "selectedIndex",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "required": false,
    "description": "Index of the selected point: drawn with a ring of its color (`null`: none)"
  },
  {
    "name": "selectedIndices",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Indices of the selected points (several selected points)"
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:82bc48a4d9755f33189e",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the clicked point and its index"
  },
  {
    "name": "onPointDoubleClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:97226903e85ac2498b42",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the same point is clicked twice in quick succession"
  },
  {
    "name": "onPointDrag",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:59a1e2a73779f04e20bc",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "target",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "QuadrantDropTarget",
        "typeRef": "type:205d626ac35110cd3b09"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on every move of a dragged point, with the quadrant under the pointer. A local visual preview follows every move; commit `points` in `onPointDrop` (cancellation leaves caller data unchanged)"
  },
  {
    "name": "onQuadrantClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((quadrant: keyof QuadrantRegions, position: { x: number; y: number; }) => void) | undefined",
    "typeRef": "type:592c2470a25890857568",
    "parameters": [
      {
        "name": "quadrant",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "keyof QuadrantRegions",
        "typeRef": "type:3619c943e5fcb3ed927b"
      },
      {
        "name": "position",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "{ x: number; y: number; }",
        "typeRef": "type:412096ac0c96ba7d9112"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the empty area of a quadrant is clicked"
  },
  {
    "name": "onPointDrop",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:da2cd83b78983d046ab7",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "target",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "QuadrantDropTarget",
        "typeRef": "type:205d626ac35110cd3b09"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a dragged point is released; the dots become draggable when it is set (the chart does not move them: update `points`)"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "QuadrantChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of QuadrantChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"onPointClick\" | \"onPlotClick\" | \"renderTooltip\" | \"xAxis\" | \"yAxis\">",
      "QuadrantConfig"
    ],
    "props": [
      {
        "name": "renderPointActions",
        "type": "(point: QuadrantPoint, index: number) => ReactNode",
        "required": false,
        "description": "React actions (e.g. compact edit / delete icon buttons) shown in the card of the active point (hovered, focused or selected), beside its name"
      },
      {
        "name": "onPointClick",
        "type": "(point: QuadrantPoint, index: number) => void",
        "required": false,
        "description": "Called with the clicked point and its index"
      },
      {
        "name": "onPointDoubleClick",
        "type": "(point: QuadrantPoint, index: number) => void",
        "required": false,
        "description": "Called when the same point is clicked twice in quick succession"
      },
      {
        "name": "onPointDrag",
        "type": "(point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void",
        "required": false,
        "description": "Called on every move of a dragged point, with the quadrant under the pointer. A local visual preview follows every move; commit `points` in `onPointDrop` (cancellation leaves caller data unchanged)"
      },
      {
        "name": "onQuadrantClick",
        "type": "(quadrant: QuadrantCorner, position: { x: number; y: number }) => void",
        "required": false,
        "description": "Called when the empty area of a quadrant is clicked"
      },
      {
        "name": "onPointDrop",
        "type": "(point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void",
        "required": false,
        "description": "Called when a dragged point is released; the dots become draggable when it is set (the chart does not move them: update `points`)"
      },
      {
        "name": "renderTooltip",
        "type": "(point: QuadrantPoint, index: number) => ReactNode",
        "required": false,
        "description": "React content of the card of the active point, in place of its name and quadrant (the engine tooltip is not shown)"
      },
      {
        "name": "quadrantContent",
        "type": "Partial<Record<QuadrantCorner, ReactNode>>",
        "required": false,
        "description": "React content placed over each quadrant (e.g. an add button); the content receives pointer events, the rest of the quadrant does not"
      },
      {
        "name": "renderQuadrantHeader",
        "type": "(corner: QuadrantCorner, info: QuadrantHeaderInfo) => ReactNode",
        "required": false,
        "description": "React header of each quadrant, in its outer corner (top edge for the top quadrants, bottom edge for the bottom ones, aligned to the outer side); replaces the drawn title, badge, description and count. The header receives pointer events (e.g. an add button)"
      },
      {
        "name": "accessiblePoints",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Visually hidden list of buttons per quadrant so keyboard and screen reader users can reach the dots: Enter / Space calls `onPointClick`, Shift + arrow keys move the point to the next quadrant (`onPointDrop` with the center of that quadrant); the focused dot gets a focus ring"
      },
      {
        "name": "getPointProps",
        "type": "(point: QuadrantPoint, index: number) => Record<string, string | number | boolean | undefined>",
        "required": false,
        "description": "Extra attributes of the invisible anchor placed on each dot (e.g. `data-testid`); every anchor already has `data-point-index` and `data-label` and the class `minerva-chart-quadrant-point`"
      }
    ]
  },
  "QuadrantConfig": {
    "source": "charts/src/engine/presets.ts",
    "description": "Settings of a quadrant matrix (the props of QuadrantChart)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "points",
        "type": "readonly QuadrantPoint[]",
        "required": true,
        "description": "Points to place"
      },
      {
        "name": "xDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the horizontal axis"
      },
      {
        "name": "yDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the vertical axis"
      },
      {
        "name": "xSplit",
        "type": "number",
        "required": false,
        "description": "X value of the vertical divider (the middle of `xDomain` by default)"
      },
      {
        "name": "ySplit",
        "type": "number",
        "required": false,
        "description": "Y value of the horizontal divider (the middle of `yDomain` by default)"
      },
      {
        "name": "quadrants",
        "type": "QuadrantRegions",
        "required": false,
        "description": "Titles and colors of the quadrants"
      },
      {
        "name": "xLabel",
        "type": "string",
        "required": false,
        "description": "Title of the horizontal axis"
      },
      {
        "name": "yLabel",
        "type": "string",
        "required": false,
        "description": "Title of the vertical axis"
      },
      {
        "name": "axisLabels",
        "type": "QuadrantAxisLabels",
        "required": false,
        "description": "Texts at the ends of the dividers, drawn inside the plot (e.g. \"Important\" at the top)"
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the numeric ticks of the axes; `false` keeps only the matrix"
      },
      {
        "name": "reverseX",
        "type": "boolean",
        "required": false,
        "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the labels next to the dots (overlapping labels are skipped)"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Dot diameter in pixels"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the points in the tooltip"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "description": "Lets the user drag the dots (`drag` / `drop` events)"
      },
      {
        "name": "showCounts",
        "type": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
        "required": false,
        "default": "false",
        "description": "Shows the number of points of each quadrant after its title; a function returns the text instead (e.g. `(n) => `${n} tasks``)"
      },
      {
        "name": "selectedIndex",
        "type": "number | null",
        "required": false,
        "description": "Index of the selected point: drawn with a ring of its color (`null`: none)"
      },
      {
        "name": "selectedIndices",
        "type": "readonly number[]",
        "required": false,
        "description": "Indices of the selected points (several selected points)"
      }
    ]
  },
  "QuadrantDropTarget": {
    "source": "charts/src/react/types.ts",
    "description": "Where a dragged QuadrantChart point was dropped",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Data coordinates of the drop"
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      },
      {
        "name": "quadrant",
        "type": "QuadrantCorner",
        "required": true,
        "description": "Quadrant of the drop, as seen on screen"
      }
    ]
  },
  "QuadrantHeaderInfo": {
    "source": "charts/src/react/types.ts",
    "description": "What `renderQuadrantHeader` receives about a quadrant",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "count",
        "type": "number",
        "required": true,
        "description": "Number of points in the quadrant"
      },
      {
        "name": "points",
        "type": "QuadrantPoint[]",
        "required": true,
        "description": "Points in the quadrant"
      },
      {
        "name": "indices",
        "type": "number[]",
        "required": true,
        "description": "Indices of these points in `points`"
      },
      {
        "name": "region",
        "type": "QuadrantRegion | undefined",
        "required": true,
        "description": "Title, badge, description and color of the quadrant (`quadrants`)"
      }
    ]
  },
  "QuadrantPoint": {
    "source": "charts/src/engine/presets.ts",
    "description": "A point of a QuadrantChart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Position on the horizontal axis"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Position on the vertical axis"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text drawn next to the dot and shown in the tooltip"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Dot color (any CSS color); the color of its quadrant by default"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "description": "Dot diameter in pixels"
      }
    ]
  },
  "QuadrantRegions": {
    "source": "charts/src/engine/presets.ts",
    "description": "The four quadrants of a QuadrantChart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "topLeft",
        "type": "QuadrantRegion",
        "required": false
      },
      {
        "name": "topRight",
        "type": "QuadrantRegion",
        "required": false
      },
      {
        "name": "bottomLeft",
        "type": "QuadrantRegion",
        "required": false
      },
      {
        "name": "bottomRight",
        "type": "QuadrantRegion",
        "required": false
      }
    ]
  },
  "QuadrantRegion": {
    "source": "charts/src/engine/presets.ts",
    "description": "Title and color of a quadrant",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Title drawn in the outer corner of the quadrant"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Background tint and default dot color (any CSS color)"
      },
      {
        "name": "badge",
        "type": "string",
        "required": false,
        "description": "Short code drawn in a pill before the title (e.g. \"Q1\")"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Second line drawn under the title (e.g. \"Do it now\"); cut with … when too long"
      }
    ]
  },
  "QuadrantAxisLabels": {
    "source": "charts/src/engine/presets.ts",
    "description": "Texts at the four ends of the dividers, inside the plot",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "top",
        "type": "string",
        "required": false
      },
      {
        "name": "bottom",
        "type": "string",
        "required": false
      },
      {
        "name": "left",
        "type": "string",
        "required": false
      },
      {
        "name": "right",
        "type": "string",
        "required": false
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

Effort / impact matrix: dots take the color of their quadrant.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: effort, y: impact (0-10)
const features = [
  { key: "darkMode", x: 2, y: 7.5 },
  { key: "sso", x: 6.5, y: 9 },
  { key: "csvExport", x: 1.5, y: 6 },
  { key: "offlineSync", x: 9, y: 8 },
  { key: "newIcons", x: 2.5, y: 2 },
  { key: "pluginApi", x: 8, y: 6.5 },
  { key: "customFonts", x: 7, y: 2.5 },
  { key: "tooltips", x: 1, y: 3.5 },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      features.map(({ key, x, y }) => ({ label: t(`features.${key}`), x, y })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("quickWins") },
      topRight: { label: t("bigBets") },
      bottomLeft: { label: t("fillIns") },
      bottomRight: { label: t("timeSinks") },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xLabel={t("effort")}
      yLabel={t("impact")}
      name={t("feature")}
      height={320}
      ariaLabel={t("featuresAria")}
    />
  );
}

```

## Example: BCG matrix

Product portfolio by relative market share and market growth: xDomain, yDomain, xSplit and ySplit place the dividing lines at a share of 1 and a growth of 10%, reverseX puts the leaders on the left and the dot size is the revenue.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/bcg.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// BCG matrix of a product portfolio. x: relative market share (our share /
// the leader's share, 1 = leader), y: market growth (% per year), revenue in
// million USD sets the size of the dots
const products = [
  { key: "cloud", share: 1.6, growth: 18, revenue: 420 },
  { key: "analytics", share: 0.45, growth: 22, revenue: 95 },
  { key: "mobile", share: 0.3, growth: 14, revenue: 60 },
  { key: "licenses", share: 1.8, growth: 3, revenue: 610 },
  { key: "support", share: 1.2, growth: 5, revenue: 280 },
  { key: "hardware", share: 0.4, growth: -2, revenue: 70 },
  { key: "training", share: 0.6, growth: 4, revenue: 40 },
];

export default function BcgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      products.map(({ key, share, growth, revenue }) => ({
        label: t(`products.${key}`),
        x: share,
        y: growth,
        size: 8 + Math.sqrt(revenue) * 1.2,
      })),
    [t],
  );
  // reverseX: by convention the high shares are on the left
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("stars"), color: "var(--success-color)" },
      topRight: { label: t("questionMarks"), color: "var(--warning-color)" },
      bottomLeft: { label: t("cashCows"), color: "var(--primary-color)" },
      bottomRight: { label: t("dogs"), color: "var(--danger-color)" },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xDomain={[0, 2]}
      xSplit={1}
      yDomain={[-5, 25]}
      ySplit={10}
      reverseX
      xLabel={t("relativeShare")}
      yLabel={t("marketGrowth")}
      name={t("product")}
      height={360}
      ariaLabel={t("bcgAria")}
    />
  );
}

```

## Example: Competitor map

Pick the two dimensions to compare: the points, xLabel and yLabel follow the selects. Our product has its own color and size, and onPointClick shows a vendor's full profile against ours.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/competitors.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

type Dimension = "price" | "features" | "ease" | "support" | "integrations";

const DIMENSIONS: Dimension[] = [
  "price",
  "features",
  "ease",
  "support",
  "integrations",
];

// Analyst scores out of 10 (price: 10 = most affordable); the first row is us
const VENDORS: { name: string; ours?: boolean; scores: number[] }[] = [
  { name: "Northwind", ours: true, scores: [7.2, 6.4, 8.6, 7.8, 5.1] },
  { name: "Contoso", scores: [3.1, 9.2, 5.4, 8.1, 8.8] },
  { name: "Fabrikam", scores: [8.4, 4.2, 7.1, 4.6, 3.9] },
  { name: "Tailspin", scores: [5.6, 7.4, 4.1, 6.2, 7.6] },
  { name: "Litware", scores: [9.1, 3.1, 8.9, 3.4, 2.8] },
  { name: "Adatum", scores: [2.4, 8.1, 6.6, 9.1, 9.3] },
  { name: "Proseware", scores: [6.3, 5.6, 3.2, 5.1, 6.4] },
];

export default function CompetitorsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [x, setX] = useState<Dimension>("ease");
  const [y, setY] = useState<Dimension>("features");
  const [selected, setSelected] = useState<number | null>(null);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const xi = DIMENSIONS.indexOf(x);
  const yi = DIMENSIONS.indexOf(y);
  const points = useMemo(
    (): QuadrantPoint[] =>
      VENDORS.map(({ name, ours, scores }) => ({
        label: ours ? t("comp.us", { name }) : name,
        x: scores[xi]!,
        y: scores[yi]!,
        ...(ours
          ? { color: "var(--primary-color)", size: 18 }
          : { color: "var(--text-secondary-color)" }),
      })),
    [xi, yi, t],
  );

  const picker = (
    label: string,
    value: Dimension,
    onChange: (value: Dimension) => void,
  ) => (
    <Select
      aria-label={label}
      value={value}
      onChange={(next) => {
        onChange(next as Dimension);
        setSelected(null);
      }}
      style={{ minWidth: 180 }}
    >
      {DIMENSIONS.map((dimension) => (
        <SelectItem key={dimension} value={dimension}>
          {t(`comp.dimensions.${dimension}`)}
        </SelectItem>
      ))}
    </Select>
  );

  let profile = t("comp.hint");
  if (selected !== null) {
    const vendor = VENDORS[selected]!;
    const us = VENDORS[0]!;
    const ahead = vendor.scores.filter((s, i) => s > us.scores[i]!).length;
    profile = t(vendor.ours ? "comp.ourProfile" : "comp.profile", {
      name: vendor.name,
      scores: new Intl.ListFormat(i18n.language, { type: "unit" }).format(
        DIMENSIONS.map((dimension, i) =>
          t("comp.score", {
            dimension: t(`comp.dimensions.${dimension}`),
            score: decimal.format(vendor.scores[i]!),
          }),
        ),
      ),
      ahead,
      total: DIMENSIONS.length,
    });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        {picker(t("comp.xAxis"), x, setX)}
        {picker(t("comp.yAxis"), y, setY)}
      </HStack>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: "var(--chart-series-2)" },
          topRight: {
            label: t("comp.strongBoth"),
            color: "var(--success-color)",
          },
          bottomLeft: {
            label: t("comp.weakBoth"),
            color: "var(--text-muted-color)",
          },
          bottomRight: { color: "var(--chart-series-2)" },
        }}
        xLabel={t(`comp.dimensions.${x}`)}
        yLabel={t(`comp.dimensions.${y}`)}
        onPointClick={(_point, index) => setSelected(index)}
        onQuadrantClick={() => setSelected(null)}
        height={380}
        ariaLabel={t("comp.aria", {
          x: t(`comp.dimensions.${x}`),
          y: t(`comp.dimensions.${y}`),
        })}
      />
      <output aria-live="polite">{profile}</output>
    </div>
  );
}

```

## Example: Draggable task matrix

showTicks={false} and axisLabels turn the chart into a task board: while dragging, the status line names the target quadrant (onPointDrag), and the drop updates the position (onPointDrop); double-click a task to rename it or move it to another quadrant (onPointDoubleClick); click an empty area or the + button (quadrantContent) to add one; renderTooltip fills the card of a task.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/draggable.tsx

```tsx
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, Input, Select, SelectItem } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

const corners: Corner[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

// translation keys of the quadrant titles
const titleKeys: Record<Corner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// Same tints as the default quadrant colors
const colors: Record<Corner, string> = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
};

// task names are translated when rendered (`key`), added tasks are numbered
// (`n`) until they are renamed in the editor (`label`)
type Task = { key?: string; n?: number; label?: string; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function DraggableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ name: string; quadrant: Corner }>({
    name: "",
    quadrant: "topLeft",
  });
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: Corner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.label ??
    (task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n }));
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: Corner, at?: { x: number; y: number }) => {
    const center = quadrantCenter(geometry, corner);
    // Offset new tasks a little so they do not stack on the same spot
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(at?.x ?? center.x + jitter),
      y: clamp(at?.y ?? center.y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  const edit = (index: number) => {
    const task = tasks[index];
    setEditing(index);
    setDraft({
      name: name(task),
      quadrant: quadrantOf(geometry, task.x, task.y),
    });
  };

  // Moving a task to another quadrant puts it at that quadrant's center
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (editing === null) return;
    const task = tasks[editing];
    const label = draft.name.trim() || name(task);
    const moved = quadrantOf(geometry, task.x, task.y) !== draft.quadrant;
    const center = quadrantCenter(geometry, draft.quadrant);
    setTasks((current) =>
      current.map((item, i) =>
        i === editing
          ? {
              ...item,
              label,
              x: moved ? center.x : item.x,
              y: moved ? center.y : item.y,
            }
          : item,
      ),
    );
    setStatus(t("taskSaved", { task: label, quadrant: title(draft.quadrant) }));
    setEditing(null);
  };

  const remove = (index: number) => {
    const label = name(tasks[index]);
    setTasks((current) => current.filter((_, i) => i !== index));
    setEditing(null);
    setStatus(t("taskRemoved", { task: label }));
  };

  // Title + add button drawn over each quadrant, in its outer corner
  const header = (corner: Corner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 6,
          [right ? "right" : "left"]: 8,
          display: "flex",
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: colors[corner],
        }}
      >
        <span>{title(corner)}</span>
        <IconButton
          size="xsmall"
          variant="ghost"
          label={t("addTask", { quadrant: title(corner) })}
          icon={<LuPlus />}
          onClick={() => add(corner)}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: colors.topLeft },
          topRight: { color: colors.topRight },
          bottomLeft: { color: colors.bottomLeft },
          bottomRight: { color: colors.bottomRight },
        }}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("taskMoving", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          )
        }
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onPointDoubleClick={(_point, index) => edit(index)}
        onQuadrantClick={(corner, at) => add(corner, at)}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
        renderTooltip={(point) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{point.label}</strong>
            <span>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("boardAria")}
      />
      {editing !== null && tasks[editing] && (
        <form
          onSubmit={save}
          aria-label={t("editTaskAria", { task: name(tasks[editing]) })}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Input
            aria-label={t("taskName")}
            value={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <Select
            aria-label={t("taskQuadrant")}
            value={draft.quadrant}
            onChange={(value) =>
              setDraft({ ...draft, quadrant: value as Corner })
            }
          >
            {corners.map((corner) => (
              <SelectItem key={corner} value={corner}>
                {title(corner)}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit">{t("save")}</Button>
          <Button
            type="button"
            color="neutral"
            variant="outline"
            onClick={() => setEditing(null)}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            color="danger"
            variant="outline"
            onClick={() => remove(editing)}
          >
            {t("remove")}
          </Button>
        </form>
      )}
      <p role="status">{status ?? t("dragHint")}</p>
    </div>
  );
}

```

## Example: Eisenhower matrix

reverseX puts urgent tasks on the left; onPointClick receives the clicked task.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/eisenhower.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10)
const tasks = [
  { key: "loginOutage", x: 9, y: 7.2 },
  { key: "taxFiling", x: 7.5, y: 8.6 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "mentoring", x: 2, y: 7 },
  { key: "bookTravel", x: 8.5, y: 3 },
  { key: "meetings", x: 7, y: 2 },
  { key: "inboxZero", x: 3, y: 2.5 },
  { key: "socialMedia", x: 1.5, y: 1 },
];

export default function EisenhowerDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<QuadrantPoint | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      tasks.map(({ key, x, y }) => ({ label: t(`tasks.${key}`), x, y })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("doFirst") },
      topRight: { label: t("schedule") },
      bottomLeft: { label: t("delegate") },
      bottomRight: { label: t("eliminate") },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        xLabel={t("urgency")}
        yLabel={t("importance")}
        name={t("task")}
        onPointClick={(point) => setSelected(point)}
        height={320}
        ariaLabel={t("eisenhowerAria")}
      />
      <p role="status">
        {selected
          ? t("taskStatus", {
              task: selected.label,
              urgency: selected.x,
              importance: selected.y,
            })
          : t("clickTask")}
      </p>
    </div>
  );
}

```

## Example: Live service health

Latency against error rate for each service, updated every second; the xSplit and ySplit lines are the SLO limits. The services in the critical quadrant are listed with quadrantOf, and renderTooltip formats the units with Intl.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/live-services.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  QuadrantChart,
  quadrantOf,
  type QuadrantPoint,
} from "minerva-design/charts";

type Service = {
  key: string;
  latency: number; // p95, milliseconds
  errors: number; // share of failed requests, 0-0.05
};

const SERVICES: Service[] = [
  { key: "auth", latency: 120, errors: 0.002 },
  { key: "search", latency: 520, errors: 0.004 },
  { key: "checkout", latency: 340, errors: 0.013 },
  { key: "catalog", latency: 180, errors: 0.003 },
  { key: "payments", latency: 610, errors: 0.016 },
  { key: "notifications", latency: 260, errors: 0.007 },
  { key: "recommendations", latency: 720, errors: 0.006 },
  { key: "media", latency: 450, errors: 0.011 },
];

// x: p95 latency (ms), y: error rate (%); the splits are the SLO limits
const geometry = {
  xDomain: [0, 1000] as [number, number],
  yDomain: [0, 4] as [number, number],
  xSplit: 400,
  ySplit: 1,
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LiveServicesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [services, setServices] = useState(SERVICES);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(42));

  // random walk every second, pulled back toward the starting values
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const next = random.current;
      setServices((current) =>
        current.map((service, i) => {
          const base = SERVICES[i]!;
          return {
            ...service,
            latency: clamp(
              service.latency +
                (next() - 0.5) * 140 +
                (base.latency - service.latency) * 0.15,
              40,
              980,
            ),
            errors: clamp(
              service.errors +
                (next() - 0.5) * 0.006 +
                (base.errors - service.errors) * 0.15,
              0,
              0.039,
            ),
          };
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const ms = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "millisecond",
        unitDisplay: "short",
        maximumFractionDigits: 0,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const points = useMemo(
    (): QuadrantPoint[] =>
      services.map((service) => ({
        label: t(`live.services.${service.key}`),
        x: service.latency,
        y: service.errors * 100,
      })),
    [services, t],
  );
  const critical = services
    .filter(
      (service) =>
        quadrantOf(geometry, service.latency, service.errors * 100) ===
        "topRight",
    )
    .map((service) => t(`live.services.${service.key}`));

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        {...geometry}
        quadrants={{
          topLeft: {
            label: t("live.erroring"),
            color: "var(--warning-color)",
          },
          topRight: { label: t("live.critical"), color: "var(--danger-color)" },
          bottomLeft: {
            label: t("live.healthy"),
            color: "var(--success-color)",
          },
          bottomRight: { label: t("live.slow"), color: "var(--warning-color)" },
        }}
        xLabel={t("live.latency")}
        yLabel={t("live.errorRate")}
        renderTooltip={(point, index) => {
          const service = services[index];
          if (!service) return null;
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{point.label}</strong>
              <span>
                {t("live.tooltip", {
                  latency: ms.format(service.latency),
                  errors: percent.format(service.errors),
                })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("live.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output
          aria-live="polite"
          style={{
            color: critical.length
              ? "var(--danger-color)"
              : "var(--success-color)",
          }}
        >
          {critical.length
            ? t("live.criticalList", {
                list: new Intl.ListFormat(i18n.language, {
                  type: "conjunction",
                }).format(critical),
              })
            : t("live.allGood")}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("live.pause") : t("live.resume")}
        </Button>
      </HStack>
    </div>
  );
}

```

## Example: Positioning map

Price against perceived quality from a customer survey: axisLabels replace the ticks and our brand stands out with its own color and size.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/positioning.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

// Perceptual map from a customer survey. x: price, y: perceived quality (0-10)
const brands = [
  { name: "Northwind", x: 3.5, y: 7.6, ours: true },
  { name: "Contoso", x: 8, y: 8.5 },
  { name: "Fabrikam", x: 6.5, y: 5.5 },
  { name: "Tailspin", x: 2, y: 3 },
  { name: "Litware", x: 4.5, y: 4 },
  { name: "Adatum", x: 8.8, y: 6.2 },
  { name: "Proseware", x: 1.5, y: 5.2 },
];

export default function PositioningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  // our brand gets its own color and a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      brands.map(({ name, x, y, ours }) =>
        ours
          ? {
              label: t("ourBrand", { name }),
              x,
              y,
              color: "var(--primary-color)",
              size: 18,
            }
          : { label: name, x, y, color: "var(--text-secondary-color)" },
      ),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={{
        topLeft: { label: t("bestValue") },
        topRight: { label: t("premium") },
        bottomLeft: { label: t("budget") },
        bottomRight: { label: t("overpriced") },
      }}
      showTicks={false}
      axisLabels={{
        top: t("highQuality"),
        bottom: t("lowQuality"),
        left: t("lowPrice"),
        right: t("highPrice"),
      }}
      name={t("brand")}
      height={340}
      ariaLabel={t("positioningAria")}
    />
  );
}

```

## Example: Custom quadrant headers

renderQuadrantHeader replaces the drawn titles with React content in the outer corner of each quadrant: a badge, the title, an action hint, the count and total time from the info argument, and a + button that adds a task. getPointProps puts a data-testid on the invisible anchor of every dot for end-to-end tests.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/quadrant-header.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

type Task = { key?: string; n?: number; x: number; y: number; minutes: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8, minutes: 30 },
  { key: "taxFiling", x: 7.2, y: 7, minutes: 45 },
  { key: "quarterlyPlanning", x: 3, y: 8.5, minutes: 90 },
  { key: "bookTravel", x: 8.5, y: 3, minutes: 15 },
  { key: "inboxZero", x: 2.5, y: 2, minutes: 25 },
];

const quadrants: QuadrantRegions = {
  topLeft: { badge: "Q1", color: "var(--danger-color, #ef4444)" },
  topRight: { badge: "Q2", color: "var(--primary-color, #4f46e5)" },
  bottomLeft: { badge: "Q3", color: "var(--warning-color, #f59e0b)" },
  bottomRight: { badge: "Q4", color: "var(--text-secondary-color, #64748b)" },
};

// translation keys of the titles and of the action hints
const keys: Record<QuadrantCorner, [string, string]> = {
  topLeft: ["doFirst", "triage.doNow"],
  topRight: ["schedule", "triage.plan"],
  bottomLeft: ["delegate", "triage.handOff"],
  bottomRight: ["eliminate", "triage.drop"],
};

// i18next plural key ("count_one" / "count_other")
const COUNT = "triage.count";

const duration = (minutes: number) =>
  minutes < 60
    ? `${minutes}m`
    : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}`;

export default function QuadrantHeaderDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(0);
  const [status, setStatus] = useState<string | null>(null);
  const name = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n });
  const title = (corner: QuadrantCorner) => t(keys[corner][0]);
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));

  const add = (corner: QuadrantCorner) => {
    const center = quadrantCenter(geometry, corner);
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: center.x + jitter,
      y: center.y + jitter / 2,
      minutes: 30,
    };
    setTasks((current) => [...current, task]);
    setSelected(tasks.length);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        // React header in the outer corner of each quadrant
        renderQuadrantHeader={(corner, { count, indices, region }) => {
          const right = corner.endsWith("Right");
          const minutes = indices.reduce((sum, i) => sum + tasks[i].minutes, 0);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: right ? "row-reverse" : "row",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--text-secondary-color)",
              }}
            >
              <span
                style={{
                  padding: "1px 6px",
                  borderRadius: 999,
                  fontWeight: 700,
                  color: region?.color,
                  background: `color-mix(in srgb, ${region?.color} 16%, transparent)`,
                }}
              >
                {region?.badge}
              </span>
              <strong style={{ color: region?.color }}>{title(corner)}</strong>
              <span>{t(keys[corner][1])}</span>
              <span>{t(COUNT, { count, time: duration(minutes) })}</span>
              <IconButton
                size="xsmall"
                variant="ghost"
                label={t("addTask", { quadrant: title(corner) })}
                icon={<LuPlus />}
                onClick={() => add(corner)}
              />
            </div>
          );
        }}
        // anchors on the dots for end-to-end tests: [data-testid="task-0"]
        getPointProps={(_point, index) => ({ "data-testid": `task-${index}` })}
        height={380}
        ariaLabel={t("boardAria")}
      />
      <p role="status">{status ?? t("triage.headerHint")}</p>
    </div>
  );
}

```

## Example: RICE prioritization

Backlog items by effort and by reach × impact, with the dot size following the RICE score; xDomain, yDomain, xSplit and ySplit set the scales and thresholds. The switch weights the value by confidence, which drops the speculative bets, and renderTooltip lists the four RICE inputs.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/rice.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

type Item =
  | "bulkEdit"
  | "sso"
  | "offlineMode"
  | "onboardingTour"
  | "aiSummary"
  | "themes"
  | "auditLog"
  | "chatAlerts"
  | "apiV2"
  | "csvImport";

// RICE inputs: reach (thousand users a quarter), impact (0.25 to 3),
// confidence (0 to 1) and effort (person-months)
const BACKLOG: [Item, number, number, number, number][] = [
  ["bulkEdit", 6, 1, 0.8, 1.5],
  ["sso", 2.5, 3, 0.9, 5],
  ["offlineMode", 8, 2, 0.5, 9],
  ["onboardingTour", 12, 1, 0.8, 2],
  ["aiSummary", 10, 2, 0.5, 3],
  ["themes", 9, 0.5, 1, 1],
  ["auditLog", 1.5, 2, 0.8, 3],
  ["chatAlerts", 5, 1, 1, 1],
  ["apiV2", 3, 3, 0.8, 10],
  ["csvImport", 4, 0.5, 1, 0.5],
];

export default function RiceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [weighted, setWeighted] = useState(true);

  // y: reach × impact (× confidence); RICE score = y / effort
  const scored = useMemo(
    () =>
      BACKLOG.map(([key, reach, impact, confidence, effort]) => {
        const value = reach * impact * (weighted ? confidence : 1);
        return { key, reach, impact, confidence, effort, value };
      }).map((item) => ({ ...item, score: item.value / item.effort })),
    [weighted],
  );
  const points = useMemo(
    (): QuadrantPoint[] =>
      scored.map(({ key, effort, value, score }) => ({
        label: t(`rice.items.${key}`),
        x: effort,
        y: value,
        size: Math.round(8 + 6 * Math.sqrt(score)),
      })),
    [scored, t],
  );

  const decimal = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const top = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => t(`rice.items.${item.key}`));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={weighted}
        onChange={setWeighted}
        label={t("rice.weighted")}
      />
      <QuadrantChart
        points={points}
        xDomain={[0, 12]}
        yDomain={[0, 22]}
        xSplit={4}
        ySplit={9}
        quadrants={{
          topLeft: { label: t("quickWins") },
          topRight: { label: t("bigBets") },
          bottomLeft: { label: t("fillIns") },
          bottomRight: { label: t("moneyPits") },
        }}
        xLabel={t("rice.effort")}
        yLabel={t("rice.value")}
        renderTooltip={(_point, index) => {
          const item = scored[index];
          if (!item) return null;
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{t(`rice.items.${item.key}`)}</strong>
              <span>
                {t("rice.inputs", {
                  reach: decimal.format(item.reach),
                  impact: decimal.format(item.impact),
                  confidence: percent.format(item.confidence),
                  effort: decimal.format(item.effort),
                })}
              </span>
              <span>
                {t("rice.score", { score: decimal.format(item.score) })}
              </span>
            </div>
          );
        }}
        height={380}
        ariaLabel={t("rice.aria")}
      />
      <output aria-live="polite">
        {t("rice.top", {
          list: new Intl.ListFormat(i18n.language, {
            type: "conjunction",
          }).format(top),
        })}
      </output>
    </div>
  );
}

```

## Example: Risk matrix

Project risks scored from 1 to 5 by likelihood and impact, with quadrant colors from accept (green) to act now (red); click a risk to select it, an empty area to clear.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/risk.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// Project risks scored from 1 to 5. x: likelihood, y: impact
const risks = [
  { key: "keyPerson", likelihood: 2, impact: 4.5 },
  { key: "vendorDelay", likelihood: 4, impact: 3.5 },
  { key: "dataBreach", likelihood: 1.5, impact: 5 },
  { key: "scopeCreep", likelihood: 4.5, impact: 2.5 },
  { key: "budgetCut", likelihood: 2.5, impact: 3.5 },
  { key: "regulation", likelihood: 3.5, impact: 4.2 },
  { key: "outage", likelihood: 3, impact: 2 },
  { key: "turnover", likelihood: 1.5, impact: 1.5 },
];

export default function RiskDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<string | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      risks.map(({ key, likelihood, impact }) => ({
        label: t(`risks.${key}`),
        x: likelihood,
        y: impact,
      })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("monitor"), color: "var(--warning-color)" },
      topRight: { label: t("actNow"), color: "var(--danger-color)" },
      bottomLeft: { label: t("accept"), color: "var(--success-color)" },
      bottomRight: { label: t("mitigate"), color: "var(--warning-color)" },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        xDomain={[1, 5]}
        yDomain={[1, 5]}
        xSplit={3}
        ySplit={3}
        xLabel={t("likelihood")}
        yLabel={t("severity")}
        name={t("risk")}
        onPointClick={(point) => setSelected(point.label ?? null)}
        onQuadrantClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("riskAria")}
      />
      <p role="status">
        {selected ? t("riskSelected", { risk: selected }) : t("clickRisk")}
      </p>
    </div>
  );
}

```

## Example: SWOT analysis

showTicks={false} and axisLabels turn the chart into a SWOT grid. quadrantContent adds a count badge in the inner corner of each quadrant, onQuadrantClick lists its factors and fades the others, and onPointClick names the clicked factor.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/swot.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  QuadrantChart,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";

type Corner = QuadrantCorner;

// x: helpful (0) to harmful (10), y: external (0) to internal (10); the
// farther from the center, the stronger the factor
const FACTORS: [string, number, number][] = [
  ["brandLoyalty", 2, 8.5],
  ["ownPlatform", 3.6, 6.8],
  ["lowChurn", 1.4, 6.4],
  ["smallSalesTeam", 7.2, 8.1],
  ["legacyBilling", 8.6, 6.6],
  ["singleRegion", 6.1, 7.4],
  ["smbMarket", 2.4, 3.1],
  ["partnerships", 4, 1.4],
  ["aiFeatures", 1.2, 1.9],
  ["newEntrant", 7.6, 2.6],
  ["regulation", 6.4, 1.2],
  ["priceWar", 8.8, 3.8],
];

const COLORS: Record<Corner, string> = {
  topLeft: "var(--success-color)",
  topRight: "var(--warning-color)",
  bottomLeft: "var(--primary-color)",
  bottomRight: "var(--danger-color)",
};
const corner = (x: number, y: number) => quadrantOf({}, x, y);

export default function SwotDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<Corner | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const title = (c: Corner) => t(`swot.${c}`);
  const list = (items: string[]) =>
    new Intl.ListFormat(i18n.language, { type: "conjunction" }).format(items);

  const counts = useMemo(() => {
    const result: Record<Corner, number> = {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    };
    for (const [, x, y] of FACTORS) result[corner(x, y)] += 1;
    return result;
  }, []);

  // factors outside the selected quadrant fade to the border color
  const points = useMemo(
    (): QuadrantPoint[] =>
      FACTORS.map(([key, x, y]) => ({
        label: t(`swot.factors.${key}`),
        x,
        y,
        ...(selected && corner(x, y) !== selected
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [selected, t],
  );

  const selectQuadrant = (c: Corner) => {
    if (selected === c) {
      setSelected(null);
      setStatus(null);
      return;
    }
    setSelected(c);
    setStatus(
      t("swot.quadrantItems", {
        quadrant: title(c),
        items: list(
          FACTORS.filter(([, x, y]) => corner(x, y) === c).map(([key]) =>
            t(`swot.factors.${key}`),
          ),
        ),
      }),
    );
  };

  // count badge in the inner corner of each quadrant, next to the center
  const badge = (c: Corner) => {
    const top = c.startsWith("top");
    const right = c.endsWith("Right");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "bottom" : "top"]: 6,
          [right ? "left" : "right"]: 8,
        }}
      >
        <Tag size="small" color={selected === c ? "primary" : "neutral"}>
          {t("swot.count", { n: counts[c] })}
        </Tag>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { label: title("topLeft"), color: COLORS.topLeft },
          topRight: { label: title("topRight"), color: COLORS.topRight },
          bottomLeft: { label: title("bottomLeft"), color: COLORS.bottomLeft },
          bottomRight: {
            label: title("bottomRight"),
            color: COLORS.bottomRight,
          },
        }}
        showTicks={false}
        axisLabels={{
          top: t("swot.internal"),
          bottom: t("swot.external"),
          left: t("swot.helpful"),
          right: t("swot.harmful"),
        }}
        quadrantContent={{
          topLeft: badge("topLeft"),
          topRight: badge("topRight"),
          bottomLeft: badge("bottomLeft"),
          bottomRight: badge("bottomRight"),
        }}
        onQuadrantClick={selectQuadrant}
        onPointClick={(point) => {
          const c = corner(point.x, point.y);
          setStatus(
            t("swot.factor", { factor: point.label, quadrant: title(c) }),
          );
        }}
        height={380}
        ariaLabel={t("swot.aria")}
      />
      <output aria-live="polite">{status ?? t("swot.hint")}</output>
    </div>
  );
}

```

## Example: Talent calibration

Performance against potential during a calibration session. onPointDrag reads out the scores and the target quadrant while dragging, onPointDrop saves the move, and onPointDoubleClick puts a person back where they started; moved people get a bigger dot.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/talent.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";

type Person = { role: string; x: number; y: number };

// x: performance this year, y: potential (1-9, calibration scale)
const INITIAL: Person[] = [
  { role: "backendLead", x: 7.8, y: 7.4 },
  { role: "productDesigner", x: 6.1, y: 3.2 },
  { role: "dataAnalyst", x: 3.6, y: 7.1 },
  { role: "qaEngineer", x: 3.2, y: 3.4 },
  { role: "mobileDeveloper", x: 8.3, y: 4.2 },
  { role: "productManager", x: 5.6, y: 8.1 },
  { role: "supportLead", x: 7.1, y: 2.4 },
  { role: "juniorDeveloper", x: 2.6, y: 6.2 },
];

const TITLES: Record<QuadrantCorner, string> = {
  topLeft: "talent.roughDiamonds",
  topRight: "talent.futureLeaders",
  bottomLeft: "talent.needsSupport",
  bottomRight: "talent.solidPerformers",
};

const clamp = (value: number) => Math.min(8.8, Math.max(1.2, value));
const moved = (person: Person, i: number) =>
  person.x !== INITIAL[i]!.x || person.y !== INITIAL[i]!.y;

export default function TalentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [people, setPeople] = useState(INITIAL);
  const [status, setStatus] = useState<string | null>(null);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const title = (corner: QuadrantCorner) => t(TITLES[corner]);

  // recalibrated people get a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      people.map((person, i) => ({
        label: t(`talent.roles.${person.role}`),
        x: person.x,
        y: person.y,
        size: moved(person, i) ? 16 : 11,
      })),
    [people, t],
  );
  const changed = people.filter(moved).length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        xDomain={[1, 9]}
        yDomain={[1, 9]}
        quadrants={{
          topLeft: {
            label: title("topLeft"),
            color: "var(--warning-color)",
          },
          topRight: {
            label: title("topRight"),
            color: "var(--success-color)",
          },
          bottomLeft: {
            label: title("bottomLeft"),
            color: "var(--danger-color)",
          },
          bottomRight: {
            label: title("bottomRight"),
            color: "var(--primary-color)",
          },
        }}
        xLabel={t("talent.performance")}
        yLabel={t("talent.potential")}
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("talent.moving", {
              person: point.label,
              performance: decimal.format(clamp(target.x)),
              potential: decimal.format(clamp(target.y)),
              quadrant: title(target.quadrant),
            }),
          )
        }
        onPointDrop={(point, index, target) => {
          setPeople((current) =>
            current.map((person, i) =>
              i === index
                ? { ...person, x: clamp(target.x), y: clamp(target.y) }
                : person,
            ),
          );
          setStatus(
            t("talent.moved", {
              person: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onPointDoubleClick={(point, index) => {
          setPeople((current) =>
            current.map((person, i) => (i === index ? INITIAL[i]! : person)),
          );
          setStatus(t("talent.reset", { person: point.label }));
        }}
        height={380}
        ariaLabel={t("talent.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{status ?? t("talent.hint")}</output>
        <HStack gap={12} wrap align="center">
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("talent.changed", { n: changed, total: people.length })}
          </span>
          <Button
            variant="outline"
            size="small"
            disabled={changed === 0}
            onClick={() => {
              setPeople(INITIAL);
              setStatus(t("talent.resetAll"));
            }}
          >
            {t("talent.resetButton")}
          </Button>
        </HStack>
      </HStack>
    </div>
  );
}

```

## Example: Badges, counts and keyboard moves

Quadrants show badges, descriptions and counts. Hovering or focusing a task shows a detached translucent card beside its point, with its name, quadrant and actions. The point keeps its real size and position; the card stays clear of it and changes sides when space is limited. The card replaces its label; the card goes when the pointer leaves, with Escape or with a click beside the tasks. A selected task keeps a ring. While a task is dragged the card follows it and names the quadrant it would land in. Tab enters the task list, Enter selects, and Shift + arrows move tasks between quadrants with live announcements.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/demos/triage.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10), with an estimate in minutes
const initial = [
  { key: "loginOutage", x: 9, y: 8, minutes: 30 },
  { key: "taxFiling", x: 7, y: 8.8, minutes: 45 },
  { key: "quarterlyPlanning", x: 3, y: 8.5, minutes: 90 },
  { key: "mentoring", x: 1.8, y: 6.5, minutes: 60 },
  { key: "bookTravel", x: 8.5, y: 3, minutes: 15 },
  { key: "meetings", x: 6.5, y: 1.8, minutes: 120 },
  { key: "socialMedia", x: 1.5, y: 1.2, minutes: 20 },
];

// i18next plural key ("count_one" / "count_other")
const COUNT = "triage.count";

const duration = (minutes: number) =>
  minutes < 60
    ? `${minutes}m`
    : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}`;

export default function TriageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const points = tasks.map(({ key, x, y }): QuadrantPoint => ({
    label: t(`tasks.${key}`),
    x,
    y,
  }));
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: {
        badge: "Q1",
        label: t("doFirst"),
        description: t("triage.doNow"),
      },
      topRight: {
        badge: "Q2",
        label: t("schedule"),
        description: t("triage.plan"),
      },
      bottomLeft: {
        badge: "Q3",
        label: t("delegate"),
        description: t("triage.handOff"),
      },
      bottomRight: {
        badge: "Q4",
        label: t("eliminate"),
        description: t("triage.drop"),
      },
    }),
    [t],
  );
  const title = (corner: QuadrantCorner) => quadrants[corner]?.label ?? "";
  const minutesOf = (point: QuadrantPoint) =>
    tasks[points.indexOf(point)]?.minutes ?? 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        // "3 tasks · 1h 15m" after each title
        showCounts={(count, inQuadrant) =>
          t(COUNT, {
            count,
            time: duration(
              inQuadrant.reduce((sum, point) => sum + minutesOf(point), 0),
            ),
          })
        }
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        // drag, or Shift + arrow keys on the focused task
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setSelected(index);
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        height={380}
        ariaLabel={t("triage.aria")}
      />
      <p role="status">{status ?? t("triage.hint")}</p>
    </div>
  );
}

```
