# Tree chart

Hierarchies drawn as tidy trees, radial trees, mind maps and org charts: organizations, file systems, taxonomies, plans. The tidy tree (Buchheim / Reingold–Tilford) never overlaps and centers every parent over its children; subtrees collapse and expand with an animation, from a click, the keyboard or the API.

Package: minerva-design@1.23.1

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Overview

TreeChart takes nodes and parent → child edges; nodes without a parent are roots (tree.root picks one). Edges that would create a cycle or a second parent are ignored.

The tidy tree runs in linear time and takes the size of every node into account: labels never overlap, parents are centered over their children and identical subtrees look the same.

layout="tree" (left to right by default, any direction), "radial" (rings around the root, labels along the radius), "mindmap" (branches balanced on both sides, colored per branch) and "org" (cards with a title and a subtitle, orthogonal connectors, leaf teams stacked in columns).

Click a node with children, press Enter on it, or call expand / collapse / toggle: its subtree folds into it with an animation and a badge counts the hidden nodes. collapsed on a node starts it folded.

Olivia Bennett

Daniel Park

Sophie Laurent

Marcus Reed

Ava Thompson

Liam Carter

Noah Kim

Mia Rossi

Lucas Silva

Ethan Brooks

Chloe Martin

Ryan Patel

Grace Hall

Owen Price

Zoe Turner

Jack Evans

Lily Moore

Henry Ward

Chief Executive Officer

Chief Technology Officer

Chief Financial Officer

Chief Operating Officer

Chief Marketing Officer

Frontend Lead

Backend Lead

Frontend Engineer

Frontend Engineer

Backend Engineer

Backend Engineer

Site Reliability Engineer

Financial Controller

Financial Analyst

Support Manager

Logistics Manager

Brand Manager

Growth Manager

Executive

Engineering

Finance

Operations

Marketing

Organization chart of the company

Click a manager to fold or unfold the team.

{{name}}'s team collapsed

{{name}}'s team expanded

Product launch

Goals

10k paying users

Brand awareness

90% retention

Audience

Product teams

Freelancers

Students

Channels

Launch event

Newsletter

Partners

Social media

Timeline

Private beta

Press kit

Launch day

Risks

Delays

Pricing feedback

Budget

Ads

Events

Mind map of a product launch plan

Inputs

Navigation

Feedback

Data display

Layout

Charts

Components of the design system by category

Folders

```tsx
Code
```

Styles

Data

Docs

Expand all

Collapse all

Fit to view

Files of a project

Credit score

Income ≥ 3 × payment?

Employed 2+ years?

Debt-to-income < 35%?

Approved

Approved, lower amount

Approved, higher rate

Manual review

Declined

700 or more

600–699

Below 600

Yes

No

Question

Approved

Review

Declined

Loan approval decision tree, with the path of the current applicant highlighted

Outcome: {{outcome}} (questions asked: {{questions}}).

All products

Electronics

Home

Fashion

Sports

Computers

Phones

Audio

Laptops

Desktops

Tablets

Smartphones

Phone cases

Chargers

Headphones

Speakers

Kitchen

Furniture

Garden

Cookware

Coffee machines

Knives

Sofas

Desks

Office chairs

Garden tools

Plants

Clothing

Shoes

Accessories

Jackets

Dresses

Sneakers

Boots

Bags

Watches

Outdoor

Fitness

Cycling

Tents

Hiking boots

Yoga mats

Dumbbells

Bikes

Helmets

 › 

Search categories

Product category taxonomy of a store

Matching categories: {{total}}. Press Enter or pick a tag to reveal one.

Search for a category, for example “boots” or “desk”.

Macintosh HD

System

Applications

Media

Documents

Caches and backups

Layout

Tree

Radial

Disk usage by folder, sized by the bytes they hold

{{name}}: {{size}} — {{parentShare}} of {{parent}}, {{share}} of the disk.

{{name}}: {{size}} in use.

App 2.0 release

Onboarding

Sign-up

Email verification

Social login

Product tour

Tour screens

Skip and resume

Payments

Checkout

Card form

Wallet payments

Billing

Invoices

Refunds

Platform

Offline mode

Sync queue

Conflict resolution

Quality

Crash reports

Performance budget

{{points}} pts

{{points}} pts · {{done}} done

Summary

Done

In progress

To do

Detail level

Deliverables

Features

Work packages

Showing the plan down to: {{level}}.

Work breakdown structure of a mobile app release, with story points

{{name}} folded: {{points}} points, {{remaining}} remaining.

{{name}} unfolded: {{points}} points, {{remaining}} remaining.

{{points}} story points in total, {{done}} done. Click an item to fold or unfold it.

Quarter-final

Semi-final

Final

To be played

{{winner}}–{{loser}}

Seed {{n}}

Not played

Winner

Still in

Eliminated

Champion

Next round

Restart

New simulation

Knockout tournament bracket from the quarter-finals to the final

{{team}} wins the tournament!

{{round}} winners: {{teams}}.

Eight teams, seeded by rating. Play the next round to reveal the results.

## TreeChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tree-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"tree\" | \"radial\" | \"mindmap\" | \"org\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "attribute": "node-shape",
    "required": false
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "attribute": "edge-style",
    "required": false
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\"",
    "attribute": "edge-color",
    "required": false
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\"",
    "attribute": "arrow-style",
    "required": false
  },
  {
    "name": "highlight",
    "typeText": "\"neighbors\" | \"lineage\" | \"none\" | undefined",
    "attribute": "highlight",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[] | undefined",
    "required": false
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[] | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "GraphBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) node / edge changed; detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-item-click",
    "typeText": "CustomEvent",
    "description": "A node or an edge was clicked (or a node activated with Enter); detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }"
  },
  {
    "name": "minerva-selection-change",
    "typeText": "CustomEvent",
    "description": "The selection changed; detail: { ids }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A tree node was collapsed or expanded; detail: { id, collapsed }"
  },
  {
    "name": "minerva-group-toggle",
    "typeText": "CustomEvent",
    "description": "The legend showed / hid a group; detail: { group, hidden }"
  },
  {
    "name": "minerva-layout-end",
    "typeText": "CustomEvent",
    "description": "The layout is done (the force simulation cooled down); detail: { layout }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Mind map

A product launch plan: the branches spread on both sides of the central topic, each branch in its own color; the topics follow the page language.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.html

```html
<minerva-tree-chart
  id="launch"
  layout="mindmap"
  height="420"
></minerva-tree-chart>

```

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.ts

```tsx
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import type { MinervaTreeChart } from "minerva-design/web-components/graph";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

export function setup(root: HTMLElement) {
  const topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  const chart = root.querySelector<MinervaTreeChart>("#launch")!;
  chart.nodes = topics.map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  }));
  chart.edges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
  );
  chart.options = { legend: false };
}

```

## Example: Org chart with collapsible teams

Cards grouped by department, the leaf teams stacked under their manager; clicking a manager collapses or expands the team, and the toggle event is reported below.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/org.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-tree-chart id="org" layout="org" height="460"></minerva-tree-chart>
  <output id="org-status" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/tree-chart/wc/org.ts

```tsx
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.
import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreeChart>("#org")!;
  const output = root.querySelector<HTMLOutputElement>("#org-status")!;
  chart.nodes = text.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  }));
  chart.edges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
  );
  chart.groups = text.departments.map((name, i) => ({ id: `d${i}`, name }));
  output.textContent = text.hint;
  const onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    output.textContent = text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      text.roles[Number(id.slice(1))],
    );
  };
  chart.addEventListener("minerva-toggle", onToggle);
  return () => chart.removeEventListener("minerva-toggle", onToggle);
}

```
