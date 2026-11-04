# Dependency graph

Directed acyclic graphs drawn in layers: package dependencies, build pipelines, data lineage, task plans. The Sugiyama layout breaks cycles, assigns layers, routes long edges through dummy nodes, reduces crossings and keeps long edges straight; edges are smooth splines or orthogonal connectors with arrowheads. Hover or select a node to highlight everything upstream and downstream, and show the critical path of a plan.

Package: minerva-design@1.20.5

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

#### How the layout works

DependencyGraph is GraphChart with layout="dag": boxes sized to their labels, arrows on every edge and lineage highlighting. The same layout is available as the pure function dagLayout.

Cycles are broken by reversing the back edges of a depth-first search, layers come from the longest path, then sources move next to their successors and nodes with balanced edges move to emptier layers.

Edges spanning several layers get dummy nodes; barycenter and median sweeps then reorder every layer, keep the best order, and a transposition pass swaps neighbors while it removes crossings.

Positions within a layer come from a weighted isotonic regression towards the neighbors, with long edges weighted heavily so they stay straight. TB, LR, BT and RL directions are supported.

highlight="lineage" (the default here) highlights all ancestors and descendants of the hovered, focused or selected nodes; criticalPath highlights the chain with the largest total duration (node value).

Applications

Framework packages

Libraries

Tooling

dev dependency

circular dependency

Dependencies between the packages of a monorepo

Install

Lint

Type check

Unit tests

Security scan

Build app

Build docs

E2E tests

Visual tests

Package

Deploy staging

Deploy production

Passed

Running

Failed

Pending

{{status}} · {{minutes}} min

web bundle

type declarations

retry

Highlight the critical path

CI/CD pipeline: jobs, their dependencies and their status

Critical path: {{minutes}} min — {{path}}

 → 

Revenue dashboard

Retention dashboard

Growth dashboard

Raw sources

Staging

Marts

Dashboards

Data lineage from the raw tables to the dashboards

{{name}}: {{upstream}} upstream, {{downstream}} downstream

Click a table or a dashboard to highlight its lineage.

Done

Running

Queued

{{percent}} done

{{seconds}} s

Workers

{{n}} × worker

Pause

Run

Reset

Build tasks of a monorepo, colored by state as the scheduler runs them

Build finished in {{seconds}} s on {{workers}} × worker.

{{elapsed}} s of {{seconds}} s — running: {{running}}.

nothing

No schedule can beat the critical path: {{seconds}} s.

Project brief

User research

Sitemap

Wireframes

Visual design

Copywriting

API and hosting

CMS setup

Front-end build

Content entry

QA and fixes

SEO review

Go live

Discovery

Design

Build

Launch

Website launch plan: tasks, their dependencies and the critical path

{{name}}: {{range}}, {{days}} workdays, can slip {{slack}} workdays without delaying the launch.

{{name}}: {{range}}, {{days}} workdays, on the critical path — any delay moves the launch.

{{days}} workdays, launch on {{date}}. Click a task to see its dates and slack.

Succeeded

Failed

Upstream failed

Failing task

Nightly ETL tasks, with the failed task and the tasks it blocks

{{task}} failed and blocks {{blocked}} of the {{total}} tasks: {{sinks}} will not be delivered.

{{task}} failed, but no other task depends on it.

Intro to programming

Discrete mathematics

Calculus

Data structures

Computer architecture

Linear algebra

Probability

Algorithms

Operating systems

Databases

Networks

Machine learning

Compilers

Distributed systems

Security

Deep learning

Capstone project

Year {{n}}

Flow direction

Top to bottom

Left to right

Bottom to top

Right to left

Computer science courses and their prerequisites

Prerequisites of {{course}} ({{total}}): {{list}}.

{{course}} has no prerequisite.

Unit price

Quantity

Discount (%)

Tax rate

Subtotal

Discount

Net

Tax

Shipping

Total

Cost per unit

Inputs

Formulas

Cells of an order sheet and the cells their formulas reference

{{cell}} changed: {{total}} cells recalculated ({{list}}). Total: {{value}}.

## DependencyGraph

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
