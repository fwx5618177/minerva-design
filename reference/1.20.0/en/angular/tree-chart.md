# Tree chart

Hierarchies drawn as tidy trees, radial trees, mind maps and org charts: organizations, file systems, taxonomies, plans. The tidy tree (Buchheim / Reingold–Tilford) never overlaps and centers every parent over its children; subtrees collapse and expand with an animation, from a click, the keyboard or the API.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnTreeChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTreeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"radial\" | \"tree\" | \"mindmap\" | \"org\"",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tree",
    "typeText": "GraphTreeOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeSize",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeWidth",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeLabels",
    "typeText": "boolean | \"auto\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeLabels",
    "typeText": "boolean | \"auto\" | \"hover\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "highlight",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "animation",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "fitPadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "controls",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "labels",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "GraphHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "GraphHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "typeText": "string[]",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "nodeToggle",
    "typeText": "GraphToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "typeText": "GraphGroupToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "typeText": "GraphLayoutEndEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Org chart with collapsible teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnTreeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreeChart],
  template: `
<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="org"
  [locale]="language()"
  [height]="460"
  (nodeToggle)="toggled.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  toggled = signal<{ id: string; collapsed: boolean } | null>(null);
  text = {
  "en": {
    "roles": ["Chief executive", "Technology", "Finance", "Operations", "Web team", "Mobile team", "Platform team", "Accounting", "Treasury", "Customer support", "Logistics"],
    "departments": ["Executive", "Engineering", "Finance", "Operations"],
    "hint": "Click a manager to collapse or expand the team",
    "collapsed": "{name}: collapsed",
    "expanded": "{name}: expanded"
  },
  "zh": {
    "roles": ["首席执行官", "技术", "财务", "运营", "Web 团队", "移动团队", "平台团队", "会计", "资金管理", "客户支持", "物流"],
    "departments": ["管理层", "研发", "财务", "运营"],
    "hint": "点击管理者以折叠或展开团队",
    "collapsed": "{name}：已折叠",
    "expanded": "{name}：已展开"
  },
  "ja": {
    "roles": ["最高経営責任者", "技術", "財務", "運営", "Web チーム", "モバイルチーム", "プラットフォームチーム", "経理", "資金管理", "カスタマーサポート", "物流"],
    "departments": ["経営", "エンジニアリング", "財務", "運営"],
    "hint": "マネージャーをクリックするとチームを折りたたみ / 展開します",
    "collapsed": "{name}: 折りたたみ",
    "expanded": "{name}: 展開"
  },
  "fr": {
    "roles": ["Direction générale", "Technique", "Finance", "Opérations", "Équipe web", "Équipe mobile", "Équipe plateforme", "Comptabilité", "Trésorerie", "Support client", "Logistique"],
    "departments": ["Direction", "Ingénierie", "Finance", "Opérations"],
    "hint": "Cliquez sur un responsable pour replier ou déplier l'équipe",
    "collapsed": "{name} : replié",
    "expanded": "{name} : déplié"
  }
};
  people = [
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
  [3, 3]
];
  edges = [
  {
    "source": "p0",
    "target": "p1"
  },
  {
    "source": "p0",
    "target": "p2"
  },
  {
    "source": "p0",
    "target": "p3"
  },
  {
    "source": "p1",
    "target": "p4"
  },
  {
    "source": "p1",
    "target": "p5"
  },
  {
    "source": "p1",
    "target": "p6"
  },
  {
    "source": "p2",
    "target": "p7"
  },
  {
    "source": "p2",
    "target": "p8"
  },
  {
    "source": "p3",
    "target": "p9"
  },
  {
    "source": "p3",
    "target": "p10"
  }
];
  nodes = computed(() =>
    this.text[this.language()].roles.map((label, i) => ({
      id: `p${i}`,
      label,
      group: `d${this.people[i][1]}`,
    })),
  );
  groups = computed(() =>
    this.text[this.language()].departments.map((name, i) => ({ id: `d${i}`, name })),
  );
  status = computed(() => {
    const t = this.text[this.language()];
    const toggled = this.toggled();
    return toggled
      ? (toggled.collapsed ? t.collapsed : t.expanded).replace(
          "{name}",
          t.roles[Number(toggled.id.slice(1))],
        )
      : t.hint;
  });
}

```

## Example: Mind map

A launch plan around its central topic. The branches are balanced between the two sides by their number of ideas, every branch gets a color, and the lines get thinner away from the center.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnTreeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreeChart],
  template: `
<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  layout="mindmap"
  [legend]="false"
  [locale]="language()"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  topics = {
  "en": ["Product launch", "Research", "User interviews", "Market analysis", "Design", "Prototype", "Usability tests", "Development", "Web app", "Mobile app", "Marketing", "Ad campaign", "Press release"],
  "zh": ["产品发布", "调研", "用户访谈", "市场分析", "设计", "原型", "可用性测试", "开发", "网页应用", "移动应用", "市场营销", "广告投放", "新闻稿"],
  "ja": ["製品ローンチ", "リサーチ", "ユーザーインタビュー", "市場分析", "デザイン", "プロトタイプ", "ユーザビリティテスト", "開発", "Web アプリ", "モバイルアプリ", "マーケティング", "広告キャンペーン", "プレスリリース"],
  "fr": ["Lancement produit", "Recherche", "Entretiens utilisateurs", "Analyse du marché", "Conception", "Prototype", "Tests d'utilisabilité", "Développement", "Application web", "Application mobile", "Marketing", "Campagne publicitaire", "Communiqué de presse"]
};
  branch = [0, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10, 10, 10];
  edges = [
  {
    "source": "t0",
    "target": "t1"
  },
  {
    "source": "t1",
    "target": "t2"
  },
  {
    "source": "t1",
    "target": "t3"
  },
  {
    "source": "t0",
    "target": "t4"
  },
  {
    "source": "t4",
    "target": "t5"
  },
  {
    "source": "t4",
    "target": "t6"
  },
  {
    "source": "t0",
    "target": "t7"
  },
  {
    "source": "t7",
    "target": "t8"
  },
  {
    "source": "t7",
    "target": "t9"
  },
  {
    "source": "t0",
    "target": "t10"
  },
  {
    "source": "t10",
    "target": "t11"
  },
  {
    "source": "t10",
    "target": "t12"
  }
];
  nodes = computed(() =>
    this.topics[this.language()].map((label, i) => ({
      id: `t${i}`,
      label,
      group: `b${this.branch[i]}`,
    })),
  );
}

```
