# Graphique en cascade

Comment une suite de hausses et de baisses mène une valeur d'un début à une fin, avec sous-totaux et totaux : passages de résultat, trésorerie, écarts. De fins tirets relient chaque barre à la suivante.

Package: minerva-design@1.20.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Marketing

Frais généraux

Résultat d'exploitation

Intérêts

Impôts

Résultat net

Montant

Compte de résultat du chiffre d'affaires au résultat net

Ouverture

Clôture

Flux net

Flux de trésorerie mensuels du solde d'ouverture au solde de clôture

Budget

Réel

Volume

Prix

Mix produit

Change

Matières premières

Économies

Écart

Facteurs de l'écart entre la marge budgétée et la marge réelle

Début d'année

Fin d'année

Recrutements

Mutations entrantes

Démissions

Mutations sortantes

Départs en retraite

Personnes

Évolution des effectifs sur l'année

ARR d'ouverture

Nouvelles affaires

Expansion

Contraction

Attrition

ARR de clôture

ARR

Trimestre

T{{n}}

{{quarter}} : ARR net ajouté {{net}} · rétention nette du revenu {{nrr}}

Pont d'ARR du {{quarter}}

Prix catalogue

Remise distributeur

Promotions

Prix facturé

Conditions de paiement

Transport

Ristournes

Prix de poche

Prix unitaire

Cliquez sur une barre pour la comparer au prix catalogue

{{step}} : {{value}}, {{share}} du prix catalogue

Cascade de prix, du prix catalogue au prix de poche

Référence 2019

Croissance de l'activité

Efficacité énergétique

Électricité renouvelable

Flotte électrique

Réfrigérants

Acquisition

2025

Objectif 2030

{{value}} kt CO₂e

Émissions

Variation : {{value}}

De {{from}} à {{to}}

{{value}} au-dessus de l'objectif 2030

Pont des émissions, de la référence 2019 à 2025

Saisie de la commande

Contrôle de crédit

Préparation

Contrôle qualité

Attente du transporteur

Transport

Douane

Délai

Durée

Travail

Attente

le travail occupe {{work}} sur {{total}} ({{share}})

Délai d'une commande par étape

Avant

Maintenant

Solde

Paiement client

Facture fournisseur

Paie

Frais de carte

Remboursement

Dernière : {{time}} · {{kind}} {{amount}}

Pause

Reprendre

Trésorerie de la journée, mise à jour en direct

Engagé

Ajouté

Retiré

Réestimé

Reporté

Terminé

Points d'effort

Orientation

Verticale

Horizontale

Étiquettes

Connecteurs

Périmètre du sprint, des points engagés aux points terminés

## WaterfallChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/waterfall-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "attribute": "up-color",
    "required": false
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "attribute": "down-color",
    "required": false
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
    "attribute": "total-color",
    "required": false
  },
  {
    "name": "start",
    "typeText": "number",
    "attribute": "start",
    "required": false
  },
  {
    "name": "hideLabels",
    "typeText": "boolean",
    "attribute": "hide-labels",
    "required": false
  },
  {
    "name": "hideConnectors",
    "typeText": "boolean",
    "attribute": "hide-connectors",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "connector",
    "typeText": "ChartConnectorOptions | undefined",
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

## Example: Trésorerie depuis un solde d’ouverture

Entrées et sorties mensuelles en lignes, du solde d’ouverture au total de clôture ; valeurs dans l’infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/wc/cash-flow.html

```html
<minerva-waterfall-chart
  id="cash"
  hide-labels
  orientation="horizontal"
  height="360"
></minerva-waterfall-chart>

```

### apps/docs/src/docs/pages/waterfall-chart/wc/cash-flow.ts

```tsx
// Monthly cash flows from an opening balance: rows instead of
// columns (`orientation="horizontal"`), values in the tooltip only (`hide-labels`).
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaWaterfallChart>("#cash")!;
  chart.steps = [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" },
  ];
}

```

## Example: Pont du compte de résultat

Les variations partent du cumul ; la marge brute est un sous-total, le résultat net le total.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/wc/pnl.html

```html
<minerva-waterfall-chart id="pnl" height="320"></minerva-waterfall-chart>

```

### apps/docs/src/docs/pages/waterfall-chart/wc/pnl.ts

```tsx
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

export function setup(root: HTMLElement) {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chart = root.querySelector<MinervaWaterfallChart>("#pnl")!;
  chart.steps = [
    { label: steps[0], value: 420 },
    { label: steps[1], value: -180 },
    { label: steps[2], kind: "subtotal" },
    { label: steps[3], value: -130 },
    { label: steps[4], value: 25 },
    { label: steps[5], value: -34 },
    { label: steps[6], kind: "total" },
  ];
  chart.format = (value) => `${value} k€`;
}

```
