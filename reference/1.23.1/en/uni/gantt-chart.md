# Gantt chart

Tasks as bars on a time axis with their progress, groups, milestones and a today line; zooms and pans along the time.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "today",
    "typeText": "number | boolean | Date | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "dependencyArrows",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"auto\" | \"inside\" | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[]",
    "required": true
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "formatProgress",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
