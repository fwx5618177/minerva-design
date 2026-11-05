# Carte de chaleur

Une grille de cellules colorées selon leur valeur, avec des catégories ou des nombres sur les deux axes : activité par jour et par heure, matrices de corrélation, cartes d’une mesure. Survolez une cellule pour la soulever, éclairer sa ligne et sa colonne et repérer sa valeur sur la légende de couleurs.

Package: minerva-design@1.21.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Sessions

Sessions par jour de la semaine et heure de la journée

Anomalie

Anomalie de température mensuelle, de 1995 à 2024

Signal

Puissance du signal Wi-Fi sur un étage de 200 m sur 100 m

{{cells}} cellules · dessinées avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Contributions

Contributions par jour sur un an

{{total}} contributions au cours de la dernière année

Sessions

Pages vues

Inscriptions

Chiffre d'affaires

Attrition

Tickets de support

Corrélation

Matrice de corrélation de six indicateurs produit

Mois {{n}}

Retenus

Rétention des cohortes mensuelles d'inscrits

Ordinateur

Mobile

Tablette

Recherche naturelle

Recherche payante

Réseaux sociaux

E-mail

Sites référents

Accès direct

{{source}} sur {{device}} : {{orders}} commandes pour {{sessions}} sessions, {{rate}} :

au-dessus de la moyenne de {{value}}

en dessous de la moyenne de {{value}}

Cliquez sur une cellule pour voir ses sessions et ses commandes.

Taux de conversion

Taux de conversion par source de trafic et par appareil

Baie {{n}}

Capteur {{n}}

Pause

Reprendre

Le plus chaud : {{rack}}, {{sensor}} à {{value}} · {{alarms}} capteurs au-dessus de {{limit}}

Température d'entrée d'air

Températures d'entrée d'air en direct des capteurs de dix baies de serveurs

Chat

Chien

Oiseau

Voiture

Camion

Réel : {{actual}}, prédit : {{predicted}}

{{value}} images ({{share}} de la classe)

Rappel : {{value}}

Précision : {{value}}

Mal classé

Exactitude : {{value}} sur {{images}} images de test

Part de la classe

Classe prédite

Classe réelle

Matrice de confusion d'un classifieur d'images sur cinq classes

Nord

Sud

Est

Ouest

Centre

T{{n}}

Mesure

Chiffre d'affaires

Croissance sur 2025

Marge brute

{{region}} au {{quarter}}

Meilleur : {{best}} ({{bestValue}}) · plus faible : {{worst}} ({{worstValue}})

Indicateurs de ventes 2026 par région et par trimestre

## HeatmapChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/heatmap-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "colorScale",
    "typeText": "readonly string[] | \"sequential\" | \"diverging\"",
    "attribute": "color-scale",
    "required": false
  },
  {
    "name": "colorMidpoint",
    "typeText": "number | undefined",
    "attribute": "color-midpoint",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "number | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[] | undefined",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
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

## Example: Échelle de couleurs divergente

Une matrice de corrélation sur une plage fixe de -1 à 1 : bleu pour les valeurs négatives, rouge pour les positives, cellules arrondies.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/wc/color-scale.html

```html
<minerva-heatmap-chart
  id="correlation"
  radius="4"
  height="320"
></minerva-heatmap-chart>

```

### apps/docs/src/docs/pages/heatmap-chart/wc/color-scale.ts

```tsx
// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#correlation")!;
  chart.data = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  chart.colorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  chart.valueRange = [-1, 1];
  chart.valueName = text.correlation;
  chart.format = (value) => value.toFixed(2);
}

```

## Example: Activité hebdomadaire

Les commits par jour et par tranche horaire ; les catégories fixent l'ordre des colonnes et des lignes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/wc/weekly-activity.html

```html
<minerva-heatmap-chart id="activity" height="300"></minerva-heatmap-chart>

```

### apps/docs/src/docs/pages/heatmap-chart/wc/weekly-activity.ts

```tsx
// `data` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#activity")!;
  chart.data = text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  chart.xCategories = HOURS;
  chart.yCategories = [...text.days].reverse();
  chart.valueName = text.commits;
}

```
