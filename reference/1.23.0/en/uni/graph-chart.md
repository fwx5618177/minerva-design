# Graph chart

Relationship networks: people, organizations, services or any entities and the links between them. A force-directed layout (Barnes–Hut, in a Web Worker for large graphs) or circular and arc diagrams place the nodes; nodes and edges are drawn on the GPU (WebGPU, WebGL2, WebGL, Canvas2D fallback), so tens of thousands of nodes stay smooth. Hover a node to highlight its neighbors, drag it, toggle groups in the legend, and walk through the graph with the keyboard.

Package: minerva-design@1.23.0

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Overview

GraphChart takes nodes, edges and optional groups. Groups give the colors and the legend, node values size the circles, and edge labels name the relationships.

Layouts: force (default) with link, many-body, gravity and collision forces and a deterministic seed; circular (grouped, with edges bundled through the center); arc diagram; dag and tree layouts are also available (see Dependency graph and Tree chart). The layouts are exported as pure functions for workers and mini-programs.

Rendering goes through the same GPU backends as the other charts, with an automatic WebGPU → WebGL2 → WebGL → Canvas2D fallback; the renderer in use is reported by onRendererChange and the data-renderer attribute.

Labels avoid each other: when zoomed out only the most important nodes keep their label, and edge labels appear when zooming in or when an edge is highlighted.

#### Interaction and accessibility

Drag the background to pan, Ctrl / ⌘ + wheel or pinch to zoom, drag a node to move it (the simulation follows), click to select (Ctrl / ⌘ + click adds), double click the background to fit. The buttons in the corner zoom and fit.

Focus the chart and use the arrow keys to move from node to node; Enter selects, + and - zoom, 0 fits, Esc clears. Focused nodes are announced with their group and number of links.

Built-in texts (summary, announcements, tooltip rows, buttons) exist in English, Chinese, Japanese and French and follow the page language; colors follow the light and dark themes.

Liu Bei

Guan Yu

Zhang Fei

Zhuge Liang

Zhao Yun

Ma Chao

Huang Zhong

Pang Tong

Jiang Wei

Liu Shan

Wei Yan

Fa Zheng

Cao Cao

Cao Pi

Sima Yi

Xiahou Dun

Xiahou Yuan

Zhang Liao

Xu Chu

Guo Jia

Xun Yu

Dian Wei

Cao Zhi

Sima Zhao

Deng Ai

Sun Quan

Sun Ce

Sun Jian

Zhou Yu

Lu Su

Lü Meng

Lu Xun

Gan Ning

Huang Gai

Xiao Qiao

Da Qiao

Sun Shangxiang

Lü Bu

Dong Zhuo

Diaochan

Yuan Shao

Emperor Xian

Wang Yun

Shu Han

Cao Wei

Eastern Wu

Warlords and Han court

Sworn brothers

Serves

Father and son

Married

Siblings

Rivals

Mentor

Adoptive father

Alliance

Defeated

Sworn friends

Relationships between the characters of Romance of the Three Kingdoms, by faction

Hover a character or a relationship, click to select; Ctrl / ⌘ + scroll zooms.

Selected: {{name}}

{{source}} → {{target}}: {{relation}}

, 

Member {{id}}

Community {{n}}

Generated network of 10,000 members in 40 communities

{{nodes}} nodes · {{edges}} links · renderer: {{renderer}} ·

simulating in a Web Worker…

layout done in {{seconds}} s

Edge

Commerce

Identity

Data

Bundle the edges through the center

Calls between microservices, grouped by domain

Systems

Functional

Object-oriented

Scripting

Influenced

Influences between programming languages

Force

Circular

Arc diagram

Layout

Click a character to center it.

{{name}}: {{links}} relationships

Layout: {{layout}}

Cart

Awaiting payment

Paid

Shipped

Delivered

Refunded

Cancelled

checkout

edit cart

pay

retry payment

timeout

cancel

payment reversed

ship

refund

tracking update

deliver

returned to sender

return

review

Open

Fulfilment

Closed

Filled arrowheads

Order states and the events between them

Healthy

Degraded

Critical

p95 {{value}} ms

{{value}} req/s

Live updates

Service map of an online store with the live health of every service

Click a service to read its metrics.

{{name}}: {{status}} · p95 {{latency}} ms · errors {{errors}} · {{rps}} req/s.

{{healthy}} healthy, {{degraded}} degraded, {{critical}} critical · updated at {{time}}

Marie Curie

Pierre Curie

Albert Einstein

Max Planck

Niels Bohr

Werner Heisenberg

Lise Meitner

Otto Hahn

Emmy Noether

Paris

Warsaw

Vienna

Berlin

Zurich

Copenhagen

Sorbonne

Kaiser Wilhelm Society

ETH Zurich

Niels Bohr Institute

Radioactivity

Relativity

Quantum theory

Uncertainty principle

Nuclear fission

Noether's theorem

born in

worked at

studied at

married to

contributed to

located in

influenced

part of

collaborated with

related to

People

Places

Institutions

Ideas

Search a person, a place or an idea…

Search the knowledge graph

No entity matches this search.

Knowledge graph of physicists, the places and institutions linked to them and their discoveries

Search an entity or click a node to list what the graph knows about it.

{{name}}: {{total}} facts — {{facts}}

→ {{name}} ({{relation}})

← {{name}} ({{relation}})

University friends

Colleagues

Climbing club

Book club

Friendships between 24 people in four circles

People {{name}} may know: {{list}}.

{{name}} (mutual friends: {{mutual}})

{{name}} already knows every friend of a friend.

Click another person to update the suggestions.

Device {{id}}

Card •••• {{last4}}

Account {{id}}

logged in from

paid with

Accounts

Flagged accounts

Devices

Cards

low

medium

high

Dark theme

Accounts, devices and payment cards, with two fraud rings sharing devices and cards

Cluster: {{accounts}} accounts, {{devices}} devices, {{cards}} cards · risk: {{risk}}

Click an account, a device or a card to select its whole cluster.

## GraphChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
