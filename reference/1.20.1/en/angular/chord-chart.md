# Chord diagram

Flows between groups placed around a circle: each group is an arc sized by its flows, each flow a ribbon between two arcs. Undirected, a ribbon joins a pair of groups and is as wide as the flows between them in both directions (a symmetric matrix counts each relation once), so a group that only receives flows keeps its arc; directed, every direction has its own ribbon with an arrowhead. Hover a group to highlight its ribbons, hover a ribbon to read both directions; the legend hides / shows groups and the arrow keys walk through groups then ribbons.

Package: minerva-design@1.20.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Engineering

Product

Marketing

Messages exchanged between four teams in a week

North America

Latin America

Europe

Africa

West Asia

South Asia

East Asia

Oceania

{{value}}M people

Migration flows between world regions over five years

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports between the modules of a codebase

United States

China

European Union

Mexico

Canada

Japan

South Korea

Goods trade between major economies in a year

Home

Search

Category

Product

Cart

Checkout

{{value}}k visits

Hover a page or a ribbon

{{source}} → {{target}}: {{value}} (the other way: {{reverse}})

{{name}}: {{value}} in and out

Navigation between the pages of a shop app in a day

US East

US West

EU Central

Asia Pacific SE

Asia Pacific NE

South America

{{value}} Gbit/s

Replication traffic between data centers

Labels

Auto

Tangential

Radial

None

Group order

Data order

Largest first

Smallest first

Ribbon color

Gradient

Source

Target

Neutral

Directed

Ticks

Other operators

Year

{{year}}

{{name}} {{value}}

{{name}} won the most subscribers ({{value}} net). Net change: {{list}}.

Subscribers switching mobile operator in {{year}}

Physics

Chemistry

Biology

Medicine

Computer science

Mathematics

Economics

Engineering

Click a faculty to focus on its collaborations, or a ribbon to see a pair

{{name}}: {{total}} co-authored papers, mostly with {{partners}}

{{name}} ({{value}})

{{a}} and {{b}}: {{value}} co-authored papers

Clear

Papers co-authored by the faculties of a university over five years

Coffee

Milk

Bread

Pastries

Fruit

Cereal

Yogurt

Juice

{{a}} + {{b}}

Bought together in {{value}} baskets ({{share}} of all baskets)

{{value}} pairings with other categories

Product categories bought together in the same basket over a month

Gateway

Users

Orders

Inventory

Payments

Notifications

{{value}} calls/s

Total: {{total}}. Busiest: {{from}} → {{to}} ({{value}})

Pause

Resume

Live calls per second between microservices

London

Paris

Frankfurt

Istanbul

Dubai

Singapore

Tokyo

New York

{{value}}M passengers

Show all hubs

Eastern hubs

Western hubs

Show at least two hubs to see the routes between them

{{shown}} of {{total}} hubs shown: {{routes}} routes, {{passengers}} a year

Yearly passengers between major airport hubs

## ChordChart

Support: beta

Native Angular: MnChordChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnChordChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"auto\" | \"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ticks",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Messages between teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart [groups]="teams[language()]" [matrix]="matrix" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teams = {
  "en": ["Design", "Engineering", "Product", "Marketing"],
  "zh": ["设计", "研发", "产品", "市场"],
  "ja": ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  "fr": ["Design", "Ingénierie", "Produit", "Marketing"]
};
  matrix = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0]
];
}

```

## Example: Migration between regions

Each region's arc adds up the migrants leaving and arriving; a ribbon is as wide as the moves between two regions both ways, and its tooltip splits them (Value, Reverse). The diagonal (migration within a region) is drawn as a loop. groups sets the colors, format the unit, padAngle widens the gaps.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart
  [groups]="text[language()].regions"
  [links]="links"
  directed
  ribbonColor="source"
  (hover)="hovered.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = signal<import('minerva-design/charts/core').ShapeHoverEvent | null>(null);
  text = {
  "en": {
    "regions": ["North", "South", "East", "West", "Center"],
    "hint": "Hover a ribbon to compare both directions",
    "flow": "{source} → {target}: {value}k · back: {reverse}k",
    "group": "{name}: {value}k"
  },
  "zh": {
    "regions": ["北部", "南部", "东部", "西部", "中部"],
    "hint": "悬停在流带上以比较两个方向",
    "flow": "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    "group": "{name}：{value} 千人"
  },
  "ja": {
    "regions": ["北部", "南部", "東部", "西部", "中部"],
    "hint": "リボンにカーソルを合わせると両方向を比較できます",
    "flow": "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    "group": "{name}: {value} 千人"
  },
  "fr": {
    "regions": ["Nord", "Sud", "Est", "Ouest", "Centre"],
    "hint": "Survolez un ruban pour comparer les deux sens",
    "flow": "{source} → {target} : {value} k · retour : {reverse} k",
    "group": "{name} : {value} k"
  }
};
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 32
  },
  {
    "source": 1,
    "target": 0,
    "value": 18
  },
  {
    "source": 0,
    "target": 4,
    "value": 45
  },
  {
    "source": 4,
    "target": 0,
    "value": 22
  },
  {
    "source": 1,
    "target": 4,
    "value": 38
  },
  {
    "source": 4,
    "target": 1,
    "value": 30
  },
  {
    "source": 2,
    "target": 4,
    "value": 51
  },
  {
    "source": 4,
    "target": 2,
    "value": 26
  },
  {
    "source": 3,
    "target": 4,
    "value": 29
  },
  {
    "source": 4,
    "target": 3,
    "value": 35
  },
  {
    "source": 2,
    "target": 3,
    "value": 14
  },
  {
    "source": 3,
    "target": 2,
    "value": 21
  },
  {
    "source": 1,
    "target": 2,
    "value": 12
  },
  {
    "source": 2,
    "target": 1,
    "value": 9
  }
];
  status = computed(() => {
    const t = this.text[this.language()];
    const hovered = this.hovered();
    if (!hovered) return t.hint;
    if (hovered.source === undefined)
      return t.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    return t.flow
      .replace("{source}", hovered.source)
      .replace("{target}", hovered.target ?? "")
      .replace("{value}", String(hovered.value))
      .replace("{reverse}", String(hovered.reverseValue ?? 0));
  });
}

```
