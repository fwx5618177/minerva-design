# Radial bar chart

Progress as concentric rings: activity rings, OKR completion, sales against quota. Each bar fills its ring up to its value over its max, on a tinted background track, with rounded ends; labels sit in the open part of the circle and a center text can sum things up. Hover a ring or use the arrow keys to read its value, max and progress.

Package: minerva-design@1.22.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Move

Exercise

Stand

Day of the week

rings closed

Activity rings of the selected day: move, exercise and stand against their goals

Activation rate

Week-4 retention

NPS above 50

p95 latency

Churn reduction

average completion

Completion of the quarter's key results

North

South

East

West

of quota

Quarterly sales of each region against its quota

CPU

Memory

Disk

Network

Shape

Three quarters

Full circle

Half circle

Rounded ends

Tracks

Server resource usage, in percent of capacity

Emergency fund

Summer holiday

New laptop

House deposit

Click a goal to see how long it will take.

{{goal}}: {{saved}} of {{target}} saved. {{remaining}} to go, about {{months}} months at {{monthly}} a month.

of all goals

Savings of each goal against its target

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Goals

Assists

Ranking

#{{rank}} {{name}}

{{stat}}: {{value}} in {{games}} games

{{ratio}} per game

League leaders of the season by {{stat}}

Leader: {{name}} ({{stat}}: {{value}})

Launch video

Event photos

Slides

Database backup

uploaded

Upload progress of each file

Restart

All files uploaded ({{size}}).

{{done}} of {{files}} files uploaded

I feel valued

My goals are clear

I can grow here

Work-life balance

My manager supports me

I'd recommend working here

Order

Survey order

Highest agreement first

Lowest agreement first

average agreement

{{agree}} of {{answered}} respondents agree ({{share}})

Share of employees who agree with each survey statement

## RadialBarChart

Support: beta

Radial bar chart: concentric progress rings with tracks, rounded ends, labels and center texts. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radial-bar-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "track",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rounded",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
