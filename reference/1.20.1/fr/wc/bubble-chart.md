# Graphique à bulles

Des nuages de points avec une troisième valeur dessinée par la taille des points : l'aire d'une bulle est proportionnelle à sa valeur.

Package: minerva-design@1.20.1

Renderer: wc

Locale: fr

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

Asie

Europe

Amériques

Afrique

Population

PIB par habitant

Espérance de vie (ans)

PIB par habitant, espérance de vie et population des pays

Produits

Chiffre d'affaires

Stockage cloud

Analytique

SDK mobile

Paiements

Application de bureau

Matériel

Conseil

Part de marché relative

Croissance du marché

Leader

Forte croissance

Part de marché, croissance et chiffre d'affaires des produits

Qualifiée

Proposition

Négociation

Montant

Affaire n° {{id}}

Jours dans le pipeline

Probabilité de gain

{{deal}} ({{stage}}) : {{amount}}

Cliquez sur une bulle

Affaires en cours par ancienneté, probabilité de gain et montant

PIB par habitant (échelle log)

Revenu élevé

Espérance de vie selon le PIB par habitant en échelle log, taille selon la population

Revenus visibles : {{from}} – {{to}}

Zoomez pour voir la plage visible en dollars

Infrastructure

Sécurité

Équipe

Budget

Exposition

Coupure de courant

Retard de livraison du matériel

Bascule réseau

Fuite de données

Retard de revue des accès

Départ d'une personne clé

Manque de compétences du prestataire

Formation insuffisante

Hausse du coût des licences

Taux de change

Acceptable

Critique

Probabilité {{likelihood}} × impact {{impact}} = {{score}}

Exposition : {{value}}

Probabilité

Impact

Risques du projet selon la probabilité, l'impact et l'exposition financière

Recherche

Réseaux sociaux

Vidéo

E-mail

Budget

Lancée le {{date}}

Date de lancement

Retour sur dépenses publicitaires

Seuil de rentabilité

Campagnes marketing selon la date de lancement, le retour sur dépenses publicitaires et le budget

Nord

Sud

Est

Ouest

Centre

Même échelle de taille dans les deux graphiques

Les deux graphiques dessinent {{value}} avec la plus grande bulle.

Chaque graphique dessine son propre chiffre d'affaires maximal avec la plus grande bulle.

Ventes au m²

Marge

Ventes au mètre carré, marge et chiffre d'affaires des régions de magasins en {{year}}

Lecture

Pause

Rejouer

Recommencer

Année : {{year}}

Fécondité (enfants par femme)

Fécondité, espérance de vie et population des pays de 1990 à 2025

## BubbleChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bubble-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "minSize",
    "typeText": "number",
    "attribute": "min-size",
    "required": false
  },
  {
    "name": "maxSize",
    "typeText": "number",
    "attribute": "max-size",
    "required": false
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "attribute": "max-value",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
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

## Example: Richesse, santé et population

PIB par habitant et espérance de vie, bulles dimensionnées par la population (aire proportionnelle).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/countries.html

```html
<minerva-bubble-chart
  id="countries"
  max-size="64"
  height="320"
></minerva-bubble-chart>

```

### apps/docs/src/docs/pages/bubble-chart/wc/countries.ts

```tsx
// Three values per point: wealth (x), life expectancy (y) and population
// (`value`, the area of the bubble); the country is the point label.
import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#countries")!;
  chart.series = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  chart.options = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };
}

```

## Example: Risque et rendement d’un portefeuille

Une série par actif, dimensionnée par sa part ; cliquer sur une bulle indique l’actif.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.html

```html
<div style="display: grid; gap: 8px">
  <minerva-bubble-chart id="portfolio" height="300"></minerva-bubble-chart>
  <output id="asset" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.ts

```tsx
// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#portfolio")!;
  const asset = root.querySelector<HTMLOutputElement>("#asset")!;
  chart.series = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chart.options = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  asset.textContent = text.hint;
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) asset.textContent = `${item.seriesName}: ${item.value} %`;
  };
  chart.addEventListener("minerva-point-click", onClick);
  return () => chart.removeEventListener("minerva-point-click", onClick);
}

```
