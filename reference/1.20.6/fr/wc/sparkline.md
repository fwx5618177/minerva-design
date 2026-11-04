# Sparkline

Un graphique de la taille d’un mot, sans axes ni légende, qui montre l’allure d’une tendance à côté d’un chiffre : dans des cartes d’indicateurs, des cellules de tableau ou des listes. Survolez-le pour lire une valeur.

Package: minerva-design@1.20.6

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

Commandes

Commandes hebdomadaires, {{variant}}

Chiffre d'affaires

Utilisateurs actifs

Inscriptions

Latence p95

{{metric}}, 30 derniers jours

Service

Passerelle API

Authentification

Recherche

Paiements

Notifications

Requêtes / min

Latence p95, 30 jours

Latence p95 de {{service}} sur 30 jours

Aujourd'hui

Variation

Latence des services

Symbole

Acme Corporation

Nova Biotech

Orbit Aérospatiale

Kite Robotique

Luma Énergie

Cours de {{symbol}} aujourd'hui

Cours

Liste de surveillance

Visites des 14 derniers jours :

Visites

Visites des 14 derniers jours

Les erreurs ont bondi après le déploiement du 7e jour, puis sont revenues à la normale :

Erreurs

Erreurs par jour sur les 14 derniers jours

Température de l'après-midi ces deux semaines :

Température

Température de l'après-midi sur les 14 derniers jours

Processeur

Utilisation du processeur de {{server}}

Alerte

Normal

Utilisateurs actifs par jour

Dernier jour : {{date}}

{{date}} · {{change}} depuis le 1er septembre

Utilisateurs actifs par jour du 1er septembre au 31 octobre

{{value}} pas

{{value}} de l'objectif

Objectif de {{goal}} pas atteint {{reached}} jours sur {{days}}

Pas

Pas par jour sur quatre semaines, avec l'objectif quotidien

Reykjavik

Montréal

Tokyo

Le Caire

Singapour

Sydney

Max. {{max}} ({{maxMonth}}) · min. {{min}} ({{minMonth}})

Moyenne des maximales quotidiennes de chaque mois à {{city}}

Période

7 jours

30 jours

90 jours

seconde moitié par rapport à la première

par rapport à la période précédente

Chiffre d'affaires quotidien, période : {{period}}

## Sparkline

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sparkline",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"line\" | \"area\" | \"bar\"",
    "attribute": "type",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
    "attribute": "reference",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "data",
    "typeText": "ChartSeries[\"data\"] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
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

## Example: Cartes d'indicateurs

Des tendances miniatures sous des chiffres clés, en courbe, en aire et en barres.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/kpi.html

```html
<div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  "
>
  <div style="display: grid; gap: 4px">
    <span id="orders-label"></span>
    <strong>1,284</strong>
    <minerva-sparkline id="orders"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="revenue-label"></span>
    <strong>€48.2k</strong>
    <minerva-sparkline id="revenue" type="area"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="signups-label"></span>
    <strong>312</strong>
    <minerva-sparkline id="signups" type="bar"></minerva-sparkline>
  </div>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/kpi.ts

```tsx
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersLabel = root.querySelector<HTMLElement>("#orders-label")!;
  const revenueLabel = root.querySelector<HTMLElement>("#revenue-label")!;
  const signupsLabel = root.querySelector<HTMLElement>("#signups-label")!;
  const orders = root.querySelector<MinervaSparkline>("#orders")!;
  const revenue = root.querySelector<MinervaSparkline>("#revenue")!;
  const signups = root.querySelector<MinervaSparkline>("#signups")!;
  ordersLabel.textContent = text.orders;
  revenueLabel.textContent = text.revenue;
  signupsLabel.textContent = text.signups;
  orders.data = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  orders.valueName = text.orders;
  revenue.data = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenue.valueName = text.revenue;
  signups.data = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signups.valueName = text.signups;
}

```

## Example: Ligne d'objectif et survol

reference trace une ligne d'objectif en pointillés ; le survol affiche la valeur sous le pointeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/reference.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sparkline
    id="latency"
    reference="200"
    height="64"
  ></minerva-sparkline>
  <output id="value" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/reference.ts

```tsx
// `reference` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latency = root.querySelector<MinervaSparkline>("#latency")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  latency.data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latency.valueName = text.latency;
  latency.format = (ms) => `${ms} ms`;
  value.textContent = text.hint;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    value.textContent =
      y === undefined ? text.hint : `${text.latency}: ${y} ms (${text.target})`;
  };
  latency.addEventListener("minerva-hover", onHover);
  return () => latency.removeEventListener("minerva-hover", onHover);
}

```
