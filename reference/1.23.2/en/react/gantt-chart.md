# Gantt chart

Tasks as bars on a time axis with their progress, groups, milestones and a today line; zooms and pans along the time.

Package: minerva-design@1.23.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

User research

Stakeholder interviews

Kick-off

Wireframes

Visual design

Design system

Front end

Back end and CMS

Content migration

QA and accessibility

Launch

Discovery

Design

Build

Launch

Today

Progress

Milestones

Plan of the website relaunch

Mobile redesign

Offline sync

Home screen widgets

Search v2

Multi-region hosting

Public API

New onboarding

Referral program

Pricing page

Mobile

Platform

Growth

Product roadmap of the year by team

Login page

Password reset

Profile API

Avatar upload

Email templates

Notifications

End-to-end tests

Ana

Ben

Chen

Dara

{{task}} ({{owner}}): {{start}} – {{end}}, {{progress}}% done

Click a task

Tasks of the sprint by developer

Specifications

Development

Translation

Public beta

Launch

Chinese (zh-CN)

French (fr-FR)

Release plan, {{locale}}

Kick-off

Product spec

Sync API

App screens

Integration

Security review

Store listing

Beta testing

Store release

Product

Backend

Mobile

Dependency arrows

Release plan of the mobile app with the dependencies between tasks

Site clearing

Foundation dig

Rebar cages

Footings

Backfill

Ground slab

Steel frame, level 1

Floor deck

Steel frame, level 2

Footing inspection

Frame inspection

Excavation crew

Steel crew

Concrete crew

Inspector

Groundwork

Structure

Inspections

Construction schedule by crew with the dependencies between tasks

Team Atlas

Team Borealis

Team Comet

Checkout redesign

Payment retries

Digital wallet

Search filters

Indexing upgrade

Recommendations

Observability

Push notifications

Features

Enablers

Iteration {{n}}

IP iteration

System demo {{n}}

System demos

Train events

Program increment of the release train by team

Sign the lease

Fit-out works

Install racking

Set up the WMS

Hire the staff

Train the staff

Test run

Go-live

Critical

With slack

Highlight the critical path

Go-live after {{days}}; critical path: {{path}}. Click a task for its slack.

{{task}} can slip by {{slack}} without delaying the go-live

{{task}} is critical: any delay moves the go-live

Warehouse opening plan with its critical path

Ana

Ben

Chen

Dara

Eli

Apollo

Borealis

Cassini

Vacation

Project

All projects

{{person}}: {{share}} booked over the {{weeks}} weeks

{{person}} is overbooked: {{share}} over the {{weeks}} weeks

Hover a row to see the load of that person

Resource plan of the team by person and project

Checkout

Build

Unit tests

Lint

Integration tests

Deploy to staging

Smoke tests

Canary release

Production rollout

Build

Test

Release

Now

Running: {{stages}} · {{elapsed}} elapsed

Pipeline finished in {{elapsed}}

Run again

Pause

Resume

Stages of a deployment pipeline run, updated live

Contract and paperwork

Order the laptop

Create the accounts

Welcome meeting

Orientation

Lunch with the buddy

```tsx
Codebase tour
```

First ticket

Compliance training

First project

First day

30-day check-in

60-day review

HR

IT

Manager

Buddy

Owner: {{owner}}

Done

In progress

Upcoming

Check-ins

Onboarding plan of a new hire by owner

High

Medium

Low

Work

Study

Life

Standup

Deep work

Mock exam

Email

Code review

Flashcards

Lunch

Gym

Reading

Now

Today's schedule by priority

## GanttChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "GanttChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "tasks",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly GanttTask[]",
    "typeRef": "type:791e8e1c53f83b4ec740",
    "required": true,
    "description": "Tasks and milestones, from top to bottom"
  },
  {
    "name": "today",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "number | boolean | Date | undefined",
    "typeRef": "type:dbbc7339a861a5b4f401",
    "default": false,
    "required": false,
    "description": "Draws a line at this date (`true`: now)"
  },
  {
    "name": "todayLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the today line"
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
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
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
    "name": "colors",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the groups in order of appearance (any CSS colors); the chart palette by default"
  },
  {
    "name": "taskName",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the tasks without a group"
  },
  {
    "name": "progressName",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the progress bars (legend, tooltip)"
  },
  {
    "name": "milestoneName",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the milestones (legend, tooltip)"
  },
  {
    "name": "formatProgress",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:bfec2447cfb703179efe",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "default": "60%",
    "required": false,
    "description": "Formats the progress shares (tooltip)"
  },
  {
    "name": "dependenciesName",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the dependencies row of the tooltip"
  },
  {
    "name": "dependencyArrows",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the dependencies as elbow arrows from the end of every predecessor to the start of the task"
  },
  {
    "name": "dependencyColor",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the dependency arrows (any CSS color); the secondary text color by default"
  },
  {
    "name": "barLabels",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "boolean | \"auto\" | \"inside\" | undefined",
    "typeRef": "type:3f81b891f3b364d77e50",
    "default": "auto",
    "required": false,
    "description": "Writes the name of every task inside its bar (cut with an ellipsis, in a color contrasting with the bar; skipped when the bar is too small): `\"auto\"` when several tasks share a row (`row`), so the bars of a lane can be told apart without hovering; `true` / `\"inside\"` always, `false` never"
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
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is clicked where there is no point"
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
  "GanttChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of GanttChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\">",
      "GanttOptions"
    ],
    "props": [
      {
        "name": "tasks",
        "type": "readonly GanttTask[]",
        "required": true,
        "description": "Tasks and milestones, from top to bottom"
      },
      {
        "name": "today",
        "type": "boolean | number | Date",
        "required": false,
        "default": "false",
        "description": "Draws a line at this date (`true`: now)"
      },
      {
        "name": "todayLabel",
        "type": "string",
        "required": false,
        "description": "Label of the today line"
      }
    ]
  },
  "GanttTask": {
    "source": "charts/src/engine/presets.ts",
    "description": "A task (or milestone) of a Gantt chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of the task (tooltip title; the row name when there is no `row`)"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Identifier referenced by the `dependencies` of other tasks; the `name` by default (give ids when several tasks have the same name)"
      },
      {
        "name": "row",
        "type": "string",
        "required": false,
        "description": "Row of the task: several tasks can share one (a resource, a lane); the `name` by default, one row per task"
      },
      {
        "name": "start",
        "type": "number | Date",
        "required": true,
        "description": "Start (a timestamp or a date)"
      },
      {
        "name": "end",
        "type": "number | Date",
        "required": false,
        "description": "End; omitted for milestones"
      },
      {
        "name": "progress",
        "type": "number",
        "required": false,
        "description": "Share done, 0-1: drawn as a solid bar over the task"
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Group (phase, team): a color and a legend entry per group"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the task (any CSS color); the color of its group by default"
      },
      {
        "name": "milestone",
        "type": "boolean",
        "required": false,
        "description": "Draws a dot at `start` instead of a bar"
      },
      {
        "name": "dependencies",
        "type": "readonly string[]",
        "required": false,
        "description": "Tasks this one waits for, by `id` (or `name`): tooltip, and arrows from their ends to its start"
      }
    ]
  },
  "GanttOptions": {
    "source": "charts/src/engine/presets.ts",
    "description": "Options of `ganttSeries`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the groups in order of appearance (any CSS colors); the chart palette by default"
      },
      {
        "name": "taskName",
        "type": "string",
        "required": false,
        "default": "\"Tasks\" (in the `locale`)",
        "description": "Name of the tasks without a group"
      },
      {
        "name": "progressName",
        "type": "string",
        "required": false,
        "default": "\"Progress\" (in the `locale`)",
        "description": "Name of the progress bars (legend, tooltip)"
      },
      {
        "name": "milestoneName",
        "type": "string",
        "required": false,
        "default": "\"Milestones\" (in the `locale`)",
        "description": "Name of the milestones (legend, tooltip)"
      },
      {
        "name": "formatProgress",
        "type": "(share: number) => string",
        "required": false,
        "default": "\"60%\"",
        "description": "Formats the progress shares (tooltip)"
      },
      {
        "name": "dependenciesName",
        "type": "string",
        "required": false,
        "default": "\"Depends on\" (in the `locale`)",
        "description": "Name of the dependencies row of the tooltip"
      },
      {
        "name": "dependencyArrows",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the dependencies as elbow arrows from the end of every predecessor to the start of the task"
      },
      {
        "name": "dependencyColor",
        "type": "string",
        "required": false,
        "description": "Color of the dependency arrows (any CSS color); the secondary text color by default"
      },
      {
        "name": "barLabels",
        "type": "boolean | \"inside\" | \"auto\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Writes the name of every task inside its bar (cut with an ellipsis, in a color contrasting with the bar; skipped when the bar is too small): `\"auto\"` when several tasks share a row (`row`), so the bars of a lane can be told apart without hovering; `true` / `\"inside\"` always, `false` never"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language",
        "description": "Locale of the default names and of the progress shares"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Shared rows

A construction schedule by crew: row puts several tasks in one row, and the dependencies point to task ids, so every arrow connects the exact bars. Arrows cross the rows in a lane clear of the other bars, or jog through the gap between two rows when none is free (the dig to the footings, around the rebar).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/crews.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Construction schedule by crew: one row per crew with several tasks in it,
// so the dependencies use task ids. The arrow from the dig to the footings
// crosses the busy steel row: it jogs through the gap between the rows
// instead of drawing over the rebar task.
const works = [
  ["clearing", "excavation", "groundwork", day(3, 2), day(3, 6), []],
  ["dig", "excavation", "groundwork", day(3, 9), day(3, 16), ["clearing"]],
  ["rebar", "steel", "groundwork", day(3, 10), day(3, 21), []],
  ["footings", "concrete", "groundwork", day(3, 18), day(3, 25), ["dig"]],
  ["backfill", "excavation", "groundwork", day(3, 30), day(4, 7), ["footings"]],
  ["slab", "concrete", "structure", day(4, 1), day(4, 10), ["inspectFootings"]],
  ["frame1", "steel", "structure", day(4, 13), day(4, 24), ["slab"]],
  ["deck", "concrete", "structure", day(4, 27), day(5, 5), ["frame1"]],
  ["frame2", "steel", "structure", day(4, 27), day(5, 8), ["frame1"]],
] as const;

export default function CrewsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] => [
      ...works.map(([id, crew, phase, start, end, after]) => ({
        id,
        name: t(`works.${id}`),
        row: t(`crews.${crew}`),
        group: t(`site.${phase}`),
        start,
        end,
        dependencies: [...after],
      })),
      {
        id: "inspectFootings",
        name: t("works.inspectFootings"),
        row: t("crews.inspector"),
        start: day(3, 27),
        milestone: true,
        dependencies: ["footings"],
      },
      {
        id: "inspectFrame",
        name: t("works.inspectFrame"),
        row: t("crews.inspector"),
        start: day(5, 12),
        milestone: true,
        dependencies: ["frame2", "deck"],
      },
    ],
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      milestoneName={t("inspections")}
      height={300}
      ariaLabel={t("crewsAria")}
    />
  );
}

```

## Example: Critical path

Earliest and latest starts are computed from the durations and the dependencies (critical path method). With the switch on, group splits the tasks into critical and with slack, and colors paints them red and gray; onPointClick reports the slack of the clicked task.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/critical-path.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const START = new Date(2026, 1, 2).getTime();
const DAY = 86_400_000;

// Opening of a warehouse: durations in days and what each task waits for
const ACTIVITIES = [
  ["lease", 5, []],
  ["fitOut", 20, ["lease"]],
  ["racking", 8, ["fitOut"]],
  ["wms", 15, ["lease"]],
  ["hiring", 25, ["lease"]],
  ["training", 6, ["hiring", "wms"]],
  ["testRun", 4, ["racking", "training"]],
] as const;
type Key = (typeof ACTIVITIES)[number][0];

// Critical path method: earliest starts forward, latest starts backward;
// the tasks without slack form the critical path
const schedule = () => {
  const early = new Map<Key, number>();
  for (const [key, , after] of ACTIVITIES) {
    early.set(
      key,
      Math.max(
        0,
        ...after.map(
          (k) => early.get(k)! + ACTIVITIES.find(([a]) => a === k)![1],
        ),
      ),
    );
  }
  const finish = Math.max(
    ...ACTIVITIES.map(([key, days]) => early.get(key)! + days),
  );
  const late = new Map<Key, number>();
  for (const [key, days] of [...ACTIVITIES].reverse()) {
    const next = ACTIVITIES.filter(([, , after]) =>
      (after as readonly Key[]).includes(key),
    );
    late.set(key, Math.min(finish, ...next.map(([k]) => late.get(k)!)) - days);
  }
  return ACTIVITIES.map(([key, days, after]) => ({
    key,
    days,
    after: after as readonly Key[],
    start: early.get(key)!,
    slack: late.get(key)! - early.get(key)!,
  }));
};
const PLAN = schedule();
const FINISH = Math.max(...PLAN.map((a) => a.start + a.days));

export default function CriticalPathDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [highlight, setHighlight] = useState(true);
  const [selected, setSelected] = useState<Key | null>(null);

  const days = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "day",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const tasks = useMemo(
    (): GanttTask[] => [
      ...PLAN.map((a) => ({
        id: a.key,
        name: t(`cpm.tasks.${a.key}`),
        start: START + a.start * DAY,
        end: START + (a.start + a.days) * DAY,
        // the first task is critical: the critical group comes first
        ...(highlight
          ? { group: a.slack === 0 ? t("cpm.critical") : t("cpm.slack") }
          : {}),
        dependencies: [...a.after],
      })),
      {
        id: "goLive",
        name: t("cpm.tasks.goLive"),
        start: START + FINISH * DAY,
        milestone: true,
        dependencies: ["testRun"],
      },
    ],
    [t, highlight],
  );

  const path = new Intl.ListFormat(locale, { type: "unit" }).format(
    PLAN.filter((a) => a.slack === 0).map((a) => t(`cpm.tasks.${a.key}`)),
  );
  const chosen = PLAN.find((a) => a.key === selected);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={highlight}
        onChange={setHighlight}
        label={t("cpm.highlight")}
      />
      <GanttChart
        tasks={tasks}
        colors={
          highlight
            ? [
                "var(--danger-color, #dc2626)",
                "var(--text-secondary-color, #64748b)",
              ]
            : undefined
        }

        milestoneName={t("milestones")}
        onPointClick={(event) => {
          const task = PLAN.find(
            (a) => t(`cpm.tasks.${a.key}`) === event.xLabel,
          );
          setSelected(task?.key ?? null);
        }}
        height={340}
        ariaLabel={t("cpm.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {chosen
          ? chosen.slack === 0
            ? t("cpm.taskCritical", { task: t(`cpm.tasks.${chosen.key}`) })
            : t("cpm.taskSlack", {
                task: t(`cpm.tasks.${chosen.key}`),
                slack: days(chosen.slack),
              })
          : t("cpm.summary", { days: days(FINISH), path })}
      </output>
    </div>
  );
}

```

## Example: Swimlanes: a daily schedule

A one-day schedule in priority lanes: tasks with the same row share a lane, the domain snaps to whole hours (08:00–22:00) with hour:minute ticks, groups color the tasks by kind and today draws the current time. As several tasks share each lane, barLabels ("auto" by default) writes their names inside the bars, cut with an ellipsis and in a color contrasting with the bar. Tasks without a progress are drawn solid; the code review in progress shows its remaining part translucent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/daily.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes);

// A one-day schedule in priority lanes: several tasks share each row
// (`row`), the time axis switches to hours and minutes for an intra-day
// range, and `today` marks the current time. Tasks sharing a row get their
// name inside the bar (`barLabels`, "auto" by default); tasks without a
// `progress` are drawn solid, the one in progress shows what is left.
const plan = [
  ["standup", "high", "work", at(9), at(9, 30)],
  ["deepWork", "high", "work", at(10), at(12)],
  ["exam", "high", "study", at(16), at(17, 30)],
  ["email", "medium", "work", at(8), at(8, 45)],
  ["review", "medium", "work", at(13, 30), at(15)],
  ["flashcards", "medium", "study", at(20), at(21)],
  ["lunch", "low", "life", at(12), at(13)],
  ["gym", "low", "life", at(18), at(19, 30)],
  ["reading", "low", "study", at(21, 15), at(22)],
] as const;
const progress: Partial<Record<(typeof plan)[number][0], number>> = {
  review: 0.6,
};

export default function DailyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, lane, group, start, end]) => ({
        id: key,
        name: t(`daily.tasks.${key}`),
        row: t(`daily.lanes.${lane}`),
        group: t(`daily.groups.${group}`),
        start,
        end,
        progress: progress[key],
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      barLabels="auto"
      today={at(14, 30)}
      todayLabel={t("daily.now")}
      legend={{ position: "bottom" }}
      height={260}
      ariaLabel={t("daily.aria")}
    />
  );
}

```

## Example: Dependencies

Each task lists the tasks it waits for in dependencies: an elbow arrow goes from the end of every predecessor to the start of the task, around between the rows when the task starts before its predecessor ends, and into milestones too. dependencyArrows: false keeps them in the tooltip only; dependencyColor sets their color.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/dependencies.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Release of a mobile app: every task waits for the ones listed after it;
// the arrows go from the end of a task to the start of the next, and turn
// around when a task starts before the end of what it waits for
const plan = [
  ["spec", "product", day(9, 4), day(9, 14), ["kickoff"]],
  ["api", "backend", day(9, 11), day(10, 2), ["spec"]],
  ["ui", "mobile", day(9, 16), day(10, 9), ["spec"]],
  ["integration", "mobile", day(10, 5), day(10, 20), ["api", "ui"]],
  ["security", "backend", day(10, 5), day(10, 16), ["api"]],
  ["storeAssets", "product", day(10, 12), day(10, 23), ["ui"]],
  ["beta", "mobile", day(10, 21), day(11, 4), ["integration", "security"]],
] as const;

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const [arrows, setArrows] = useState(true);

  const tasks = useMemo(
    (): GanttTask[] => [
      { name: t("pipeline.kickoff"), start: day(9, 1), milestone: true },
      ...plan.map(([key, team, start, end, after]) => ({
        name: t(`pipeline.${key}`),
        group: t(`streams.${team}`),
        start,
        end,
        dependencies: after.map((task) => t(`pipeline.${task}`)),
      })),
      {
        name: t("pipeline.release"),
        start: day(11, 9),
        milestone: true,
        dependencies: [t("pipeline.beta"), t("pipeline.storeAssets")],
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={arrows}
        onChange={setArrows}
        label={t("showDependencies")}
      />
      <GanttChart
        tasks={tasks}
        dependencyArrows={arrows}
        milestoneName={t("milestones")}
        height={380}
        ariaLabel={t("pipelineAria")}
      />
    </div>
  );
}

```

## Example: Live pipeline run

A deployment pipeline replayed with setInterval (cleared on pause and unmount): today follows the simulated clock, every progress is recomputed from it, and interaction={false} keeps the time range still while the chart updates.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/live-deploy.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// A deployment pipeline run: stages in minutes from the start of the run;
// the simulated clock moves one minute every 0.6 s
const RUN_START = new Date(2026, 9, 30, 14, 0).getTime();
const MINUTE = 60_000;
const STAGES = [
  ["checkout", "build", 0, 1, []],
  ["compile", "build", 1, 7, ["checkout"]],
  ["unit", "test", 7, 15, ["compile"]],
  ["lint", "test", 7, 10, ["compile"]],
  ["integration", "test", 15, 24, ["unit", "lint"]],
  ["staging", "release", 24, 28, ["integration"]],
  ["smoke", "test", 28, 31, ["staging"]],
  ["canary", "release", 31, 37, ["smoke"]],
  ["production", "release", 37, 41, ["canary"]],
] as const;
const END = 41;

export default function LiveDeployDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [minute, setMinute] = useState(0);
  const [running, setRunning] = useState(true);

  const done = minute >= END;

  useEffect(() => {
    if (!running || done) return;
    const timer = window.setInterval(() => {
      setMinute((m) => Math.min(END, m + 1));
    }, 600);
    return () => window.clearInterval(timer);
  }, [running, done]);

  // the progress of every stage follows the clock
  const tasks = useMemo(
    (): GanttTask[] =>
      STAGES.map(([key, group, from, to, after]) => ({
        id: key,
        name: t(`deploy.stages.${key}`),
        group: t(`deploy.groups.${group}`),
        start: RUN_START + from * MINUTE,
        end: RUN_START + to * MINUTE,
        progress: Math.min(1, Math.max(0, (minute - from) / (to - from))),
        dependencies: [...after],
      })),
    [t, minute],
  );

  const elapsed = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  }).format(minute);
  const current = STAGES.filter(
    ([, , from, to]) => from <= minute && minute < to,
  ).map(([key]) => t(`deploy.stages.${key}`));

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GanttChart
        tasks={tasks}
        today={RUN_START + minute * MINUTE}
        todayLabel={t("deploy.now")}
        progressName={t("progress")}
        dependencyArrows={false}
        yAxis={{ min: RUN_START, max: RUN_START + END * MINUTE }}
        interaction={false}
        legend={{ position: "bottom" }}
        height={340}
        ariaLabel={t("deploy.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
          {done
            ? t("deploy.done", { elapsed })
            : t("deploy.running", {
                stages: new Intl.ListFormat(locale).format(current),
                elapsed,
              })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => {
            if (done) {
              setMinute(0);
              setRunning(true);
            } else setRunning((r) => !r);
          }}
        >
          {done
            ? t("deploy.restart")
            : running
              ? t("deploy.pause")
              : t("deploy.resume")}
        </Button>
      </HStack>
    </div>
  );
}

```

## Example: Locales and UTC dates

locale sets the month and weekday names, the progress percentages and the default names (tasks, progress, milestones); yAxis.timeZone: "utc" lays the dates out in UTC so that UTC data stays aligned in every time zone.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/locale.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Release plan in UTC dates: `yAxis.timeZone: "utc"` aligns the ticks on
// UTC midnights wherever the reader is
const utc = (month: number, date: number) => Date.UTC(2026, month - 1, date);
const plan = [
  ["specs", utc(1, 5), utc(1, 16), 1],
  ["build", utc(1, 12), utc(2, 13), 0.7],
  ["translation", utc(2, 2), utc(2, 20), 0.35],
  ["beta", utc(2, 16), utc(3, 6), 0],
] as const;

const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  // no group, progress or milestone names: the defaults of the locale
  const tasks = useMemo(
    (): GanttTask[] => [
      ...plan.map(([key, start, end, progress]) => ({
        name: t(`release.${key}`),
        start,
        end,
        progress,
      })),
      { name: t("release.launch"), start: utc(3, 10), milestone: true },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {LOCALES.map(({ locale, key }) => (
        <figure key={locale} style={{ margin: 0, minWidth: 0 }}>
          <figcaption
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--text-secondary-color)",
            }}
          >
            {t(`locales.${key}`)}
          </figcaption>
          <GanttChart
            locale={locale}
            tasks={tasks}
            yAxis={{ timeZone: "utc" }}
            legend={{ position: "bottom" }}
            height={260}
            ariaLabel={t("localeAria", { locale: t(`locales.${key}`) })}
          />
        </figure>
      ))}
    </div>
  );
}

```

## Example: Onboarding plan

renderTooltip replaces the tooltip with React content: the hovered bar is found from its seriesId (one series per group, plus the milestones) and its index, then shown with its owner, its dates formatted with formatRange of Intl.DateTimeFormat and its status relative to today.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/onboarding.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Onboarding plan of a new hire who starts on Monday, April 6: days relative
// to the first day, one color per owner, and the check-ins as milestones
const FIRST_DAY = new Date(2026, 3, 6).getTime();
const DAY = 86_400_000;
const day = (offset: number) => FIRST_DAY + offset * DAY;
const TODAY = day(9);

const STEPS = [
  ["contract", "hr", -14, -10],
  ["laptop", "it", -7, -2],
  ["accounts", "it", -3, 0],
  ["welcome", "manager", 0, 1],
  ["orientation", "hr", 0, 3],
  ["buddyLunch", "buddy", 1, 2],
  ["codebase", "buddy", 1, 10],
  ["firstTicket", "manager", 3, 12],
  ["training", "hr", 7, 21],
  ["firstProject", "manager", 14, 45],
] as const;
const CHECK_INS = [
  ["firstDay", 0],
  ["checkIn30", 30],
  ["review60", 60],
] as const;

type Status = "done" | "inProgress" | "upcoming";
const STATUS_COLORS: Record<Status, string> = {
  done: "var(--success-color, #16a34a)",
  inProgress: "var(--primary-color, #4f46e5)",
  upcoming: "var(--text-muted-color, #64748b)",
};

export default function OnboardingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;

  const tasks = useMemo(
    (): GanttTask[] => [
      ...STEPS.map(([key, owner, from, to]) => ({
        name: t(`onboard.tasks.${key}`),
        group: t(`onboard.owners.${owner}`),
        start: day(from),
        end: day(to),
      })),
      ...CHECK_INS.map(([key, offset]) => ({
        name: t(`onboard.tasks.${key}`),
        start: day(offset),
        milestone: true,
      })),
    ],
    [t],
  );
  const dates = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );

  // the bars of a group are its tasks in order; the milestones are a series
  const taskOf = (seriesId: string, index: number) => {
    if (seriesId === "gantt:milestones")
      return tasks.filter((task) => task.milestone)[index];
    const group = seriesId.slice("gantt:".length);
    return tasks.filter((task) => !task.milestone && task.group === group)[
      index
    ];
  };

  return (
    <GanttChart
      tasks={tasks}
      today={TODAY}
      todayLabel={t("today")}
      milestoneName={t("onboard.checkIns")}
      legend={{ position: "bottom" }}
      renderTooltip={(event) => {
        const item = event.items[0];
        const task = item && taskOf(item.seriesId, item.index);
        if (!task) return null;
        const start = Number(task.start);
        const end = Number(task.end ?? task.start);
        const status: Status =
          end < TODAY ? "done" : start <= TODAY ? "inProgress" : "upcoming";
        return (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{task.name}</strong>
            {task.group && (
              <span>{t("onboard.owner", { owner: task.group })}</span>
            )}
            <span>
              {task.milestone
                ? dates.format(start)
                : dates.formatRange(start, end)}
            </span>
            <span style={{ color: STATUS_COLORS[status] }}>
              {t(`onboard.status.${status}`)}
            </span>
          </div>
        );
      }}
      height={380}
      ariaLabel={t("onboard.aria")}
    />
  );
}

```

## Example: Project plan

Each group gets a color and a legend entry, progress is drawn as a solid bar over the task, milestones are dots and today draws a line at a date. Hover a task: its tooltip shows only that task, with its group, dates, duration, progress and dependencies. Dependencies are drawn as arrows.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/project.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: phases, tasks with their progress, what they wait
// for, and milestones
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1, []],
  ["interviews", "discovery", day(3, 9), day(3, 20), 1, []],
  ["kickoff", null, day(3, 23), null, 0, []],
  [
    "wireframes",
    "design",
    day(3, 23),
    day(4, 7),
    1,
    ["research", "interviews"],
  ],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7, ["wireframes"]],
  ["designSystem", "design", day(4, 13), day(5, 8), 0.35, ["visualDesign"]],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2, ["designSystem"]],
  ["backend", "build", day(4, 13), day(5, 22), 0.3, ["wireframes"]],
  ["contentMigration", "build", day(5, 11), day(6, 5), 0, ["backend"]],
  ["qa", "launch", day(5, 25), day(6, 12), 0, ["frontend", "backend"]],
  ["launch", null, day(6, 15), null, 0, []],
] as const;

export default function ProjectDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, phase, start, end, progress, after]) =>
        phase === null
          ? { name: t(`tasks.${key}`), start, milestone: true }
          : {
              name: t(`tasks.${key}`),
              group: t(`phases.${phase}`),
              start,
              end: end ?? start,
              progress,
              // listed in the tooltip, drawn as arrows from their ends
              dependencies: after.map((task) => t(`tasks.${task}`)),
            },
      ),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={day(4, 22)}
      todayLabel={t("today")}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      height={420}
      ariaLabel={t("projectAria")}
    />
  );
}

```

## Example: Release train

A program increment of three teams: row puts the features of a team in one row, group tells features from enablers, and rect annotations along the time axis shade the iterations and tint the innovation and planning (IP) iteration. The system demos are milestones in their own row.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/release-train.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  GanttChart,
  type ChartAnnotation,
  type GanttTask,
} from "minerva-design/charts";

// A program increment of an agile release train: four two-week iterations
// and an innovation & planning (IP) iteration, one row per team
const PI_START = new Date(2026, 0, 5).getTime();
const DAY = 86_400_000;
const ITERATION = 14 * DAY;
const at = (iteration: number, day = 0) =>
  new Date(PI_START + iteration * ITERATION + day * DAY);

// [feature, team, kind, first iteration, last iteration, progress]
const FEATURES = [
  ["checkout", "atlas", "feature", 0, 1, 1],
  ["paymentRetries", "atlas", "enabler", 2, 2, 0.6],
  ["wallet", "atlas", "feature", 3, 3, 0],
  ["searchFilters", "borealis", "feature", 0, 0, 1],
  ["indexing", "borealis", "enabler", 1, 2, 0.5],
  ["recommendations", "borealis", "feature", 3, 3, 0],
  ["observability", "comet", "enabler", 0, 1, 1],
  ["push", "comet", "feature", 2, 3, 0.3],
] as const;

export default function ReleaseTrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] => [
      ...FEATURES.map(([key, team, kind, first, last, progress]) => ({
        id: key,
        name: t(`train.features.${key}`),
        row: t(`train.teams.${team}`),
        group: t(`train.kinds.${kind}`),
        start: at(first),
        // features end on the Friday of their last iteration
        end: at(last, 11),
        progress,
      })),
      ...[1, 3].map((iteration) => ({
        id: `demo${iteration}`,
        name: t("train.demo", { n: (iteration + 1) / 2 }),
        row: t("train.events"),
        start: at(iteration, 11),
        milestone: true,
      })),
    ],
    [t],
  );

  // shaded iterations, the IP iteration tinted: background areas along
  // the time axis
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      [0, 1, 2, 3, 4].map((i) => ({
        type: "rect",
        y0: at(i).getTime(),
        y1: at(i + 1).getTime(),
        color:
          i === 4
            ? "var(--warning-color, #f59e0b)"
            : "var(--text-secondary-color, #64748b)",
        opacity: i === 4 ? 0.12 : i % 2 ? 0 : 0.06,
        label: i === 4 ? t("train.ip") : t("train.iteration", { n: i + 1 }),
        labelPosition: "top-left",
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      annotations={annotations}
      yAxis={{ min: at(0).getTime(), max: at(5).getTime() }}
      milestoneName={t("train.demos")}
      progressName={t("progress")}
      legend={{ position: "bottom" }}
      height={340}
      ariaLabel={t("train.aria")}
    />
  );
}

```

## Example: Resource plan

One row per person (row), one color per project (group; colors keeps the color of each project when the Select filters them) and yAxis.min / max fix six weeks. onHover reads the hovered row (event.xLabel) to show the load of that person, overbooking included.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/resources.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const START = new Date(2026, 2, 2).getTime();
const DAY = 86_400_000;
const WEEKS = 6;

type Person = "ana" | "ben" | "chen" | "dara" | "eli";
type Project = "apollo" | "borealis" | "cassini" | "vacation";
const PEOPLE: Person[] = ["ana", "ben", "chen", "dara", "eli"];
const PROJECTS: Project[] = ["apollo", "borealis", "cassini", "vacation"];
const COLORS: Record<Project, string> = {
  apollo: "var(--chart-series-1, #4f46e5)",
  borealis: "var(--chart-series-2, #10b981)",
  cassini: "var(--chart-series-5, #0ea5e9)",
  vacation: "var(--text-secondary-color, #64748b)",
};

// Resource plan of six weeks: [person, project, first day, last day + 1]
const BOOKINGS: [Person, Project, number, number][] = [
  ["ana", "apollo", 0, 19],
  ["ana", "borealis", 21, 42],
  ["ben", "apollo", 0, 26],
  ["ben", "cassini", 14, 33],
  ["ben", "vacation", 35, 42],
  ["chen", "borealis", 0, 12],
  ["chen", "vacation", 14, 21],
  ["chen", "cassini", 21, 42],
  ["dara", "cassini", 3, 17],
  ["dara", "apollo", 28, 40],
  ["eli", "borealis", 7, 35],
];

// booked days over the window, overlapping bookings counted twice
const load = (person: Person) =>
  BOOKINGS.filter(
    ([p, project]) => p === person && project !== "vacation",
  ).reduce((sum, [, , from, to]) => sum + (to - from), 0) /
  (WEEKS * 7);

export default function ResourcesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [project, setProject] = useState<"all" | Project>("all");
  const [hovered, setHovered] = useState<Person | null>(null);

  const visible = useMemo(
    () =>
      BOOKINGS.filter(
        ([, p]) => project === "all" || p === project || p === "vacation",
      ),
    [project],
  );
  const tasks = useMemo(
    (): GanttTask[] =>
      visible.map(([person, p, from, to]) => ({
        name: t(`res.projects.${p}`),
        row: t(`res.people.${person}`),
        group: t(`res.projects.${p}`),
        start: START + from * DAY,
        end: START + to * DAY,
      })),
    [t, visible],
  );
  // group colors in order of appearance, so that a project keeps its color
  const colors = useMemo(
    () => [...new Set(visible.map(([, p]) => p))].map((p) => COLORS[p]),
    [visible],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        aria-label={t("res.projectLabel")}
        value={project}
        onChange={(value) => setProject(value as "all" | Project)}
        style={{ maxWidth: 240 }}
      >
        <SelectItem value="all">{t("res.all")}</SelectItem>
        {PROJECTS.filter((p) => p !== "vacation").map((p) => (
          <SelectItem key={p} value={p}>
            {t(`res.projects.${p}`)}
          </SelectItem>
        ))}
      </Select>
      <GanttChart
        tasks={tasks}
        colors={colors}
        yAxis={{ min: START, max: START + WEEKS * 7 * DAY }}
        legend={{ position: "bottom" }}
        onHover={(event) => {
          const person = PEOPLE.find(
            (p) => t(`res.people.${p}`) === event?.xLabel,
          );
          if (person) setHovered(person);
        }}
        height={320}
        ariaLabel={t("res.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {hovered
          ? t(load(hovered) > 1 ? "res.overbooked" : "res.load", {
              person: t(`res.people.${hovered}`),
              share: percent.format(load(hovered)),
              weeks: WEEKS,
            })
          : t("res.hint")}
      </output>
    </div>
  );
}

```

## Example: Roadmap

A yearly roadmap by team: yAxis.min and max fix the time range; Ctrl / ⌘ + wheel (or a pinch) zooms along the time and dragging pans.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/roadmap.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Product roadmap of 2026 by team; zoom along the time with Ctrl / ⌘ + wheel
// (or a pinch) and drag to pan
const items = [
  ["mobileRedesign", "mobile", [1, 5], [4, 30]],
  ["offlineSync", "mobile", [5, 4], [8, 28]],
  ["widgets", "mobile", [9, 1], [11, 20]],
  ["searchV2", "platform", [1, 12], [3, 27]],
  ["multiRegion", "platform", [3, 2], [7, 31]],
  ["publicApi", "platform", [8, 3], [12, 18]],
  ["onboarding", "growth", [2, 2], [4, 10]],
  ["referrals", "growth", [4, 20], [6, 30]],
  ["pricingPage", "growth", [7, 6], [9, 25]],
] as const;

export default function RoadmapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      items.map(([key, team, [m0, d0], [m1, d1]]) => ({
        name: t(`roadmap.${key}`),
        group: t(`teams.${team}`),
        start: new Date(2026, m0 - 1, d0),
        end: new Date(2026, m1 - 1, d1),
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={new Date(2026, 5, 15)}
      todayLabel={t("today")}
      yAxis={{
        min: new Date(2026, 0, 1).getTime(),
        max: new Date(2026, 11, 31).getTime(),
      }}
      legend={{ position: "bottom" }}
      height={360}
      ariaLabel={t("roadmapAria")}
    />
  );
}

```

## Example: Sprint

Tasks with hours, one color per developer; onPointClick receives the clicked row to show its details.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/demos/sprint.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (date: number, hour = 9) => new Date(2026, 5, date, hour);

// Two-week sprint: one color per developer, click a task for its details
const sprint = [
  ["loginPage", "ana", day(1), day(3, 18), 1],
  ["passwordReset", "ana", day(4), day(5, 18), 0.6],
  ["profileApi", "ben", day(1), day(4, 18), 1],
  ["avatarUpload", "ben", day(5), day(9, 18), 0.25],
  ["emailTemplates", "chen", day(2), day(8, 13), 0.5],
  ["notifications", "chen", day(8, 14), day(12, 18), 0],
  ["e2eTests", "dara", day(3), day(11, 18), 0.4],
] as const;

export default function SprintDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<string | null>(null);

  const tasks = useMemo(
    (): GanttTask[] =>
      sprint.map(([key, dev, start, end, progress]) => ({
        name: t(`sprint.${key}`),
        group: t(`people.${dev}`),
        start,
        end,
        progress,
      })),
    [t],
  );
  const dates = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric" }),
    [locale],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <GanttChart
        tasks={tasks}
        today={day(5, 12)}
        todayLabel={t("today")}
        progressName={t("progress")}
        legend={{ position: "bottom" }}
        onPointClick={(event) => {
          const task = sprint.find(
            ([key]) => t(`sprint.${key}`) === event.xLabel,
          );
          if (!task) return;
          const [, dev, start, end, progress] = task;
          setSelected(
            t("taskStatus", {
              task: event.xLabel,
              owner: t(`people.${dev}`),
              start: dates.format(start),
              end: dates.format(end),
              progress: Math.round(progress * 100),
            }),
          );
        }}
        height={320}
        ariaLabel={t("sprintAria")}
      />
      <div role="status" style={{ color: "var(--text-secondary-color)" }}>
        {selected ?? t("clickTask")}
      </div>
    </div>
  );
}

```
