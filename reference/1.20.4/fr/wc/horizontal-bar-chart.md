# Diagramme en barres horizontales

Des barres qui partent de la gauche, les catégories le long du bord : classements, noms longs, enquêtes divergentes et avancements.

Package: minerva-design@1.20.4

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Développeurs

Part des développeurs utilisant chaque langage de programmation

Je vois une perspective de carrière ici

Ma charge de travail est raisonnable

J'ai les outils dont j'ai besoin

Mon manager me soutient

Je suis payé équitablement

Pas du tout d'accord

Pas d'accord

D'accord

Tout à fait d'accord

Réponses à l'enquête interne, désaccord à gauche et accord à droite

Terminé

En revue

À faire

Plateforme

Paiements

Mobile

Croissance

Design

État des tickets du jalon pour chaque équipe

Votes

Mode sombre sur toutes les pages et les e-mails

Mode hors ligne sur mobile

Export des rapports en PDF avec graphiques

Authentification unique SAML et OIDC

Synchronisation bidirectionnelle du calendrier

Modifier plusieurs fiches à la fois

Champs personnalisés sur tous les objets

Votes des fonctionnalités les plus demandées

Budget

Réel

Ingénierie

Marketing

Ventes

Support

Finance

Budget et dépenses réelles par service

Variation

Amérique du Nord

Europe

Asie-Pacifique

Amérique latine

Moyen-Orient

Afrique

Variation des utilisateurs actifs mensuels par région

Utilisateurs

Messages

Photos

Plans

Musique

Notes

Utilisateurs actifs mensuels par application

{{app}} : {{users}} M d'utilisateurs

Touchez une barre

Chiffre d'affaires

Unités vendues

Casque sans fil

Montre connectée

Enceinte Bluetooth

Clavier mécanique

Chargeur rapide

Webcam HD

Souris sans fil

Tablette

Câble USB-C

Support d'ordinateur

Classer par

Lignes affichées

Top {{n}}

Tous les produits

Produits les plus vendus du mois dernier, du plus élevé au plus faible

Ces {{n}} produits représentent {{share}} du total.

{{value}} GW

Capacité solaire

Lecture

Pause

Rejouer

Revenir au début

Pays ayant la plus grande capacité solaire installée fin {{year}}

Fourchette de salaire

Junior

Confirmé

Senior

Staff

Principal

Directeur

Offre

Minimum

Milieu

Maximum

Offre / milieu

Offre −{{step}}

Offre +{{step}}

Une offre de {{offer}} entre dans les fourchettes {{levels}}.

Une offre de {{offer}} est en dehors de toutes les fourchettes.

Fourchette de salaire annuel de chaque niveau, avec l'offre en ligne verticale

Budget d'erreur restant

Gel des mises en production

Budget d'erreur restant de chaque service sur les 30 derniers jours, du pire au meilleur

SLO {{slo}}, disponibilité mesurée {{availability}}

Il reste {{minutes}} d'indisponibilité sur {{allowed}}.

Budget dépassé de {{minutes}}.

Cliquez sur un service pour voir son budget.

## HorizontalBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/horizontal-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "attribute": "labels",
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

## Example: Pages les plus visitées

Les catégories à gauche gardent les noms longs lisibles ; labels écrit la valeur au bout de chaque barre.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/ranking.html

```html
<minerva-horizontal-bar-chart
  id="pages"
  labels
  height="300"
></minerva-horizontal-bar-chart>

```

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/ranking.ts

```tsx
// <minerva-horizontal-bar-chart>: categories down the left side, long names
// stay readable; `labels` writes the value at the end of every bar.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#pages")!;
  chart.series = [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" } };
}

```

## Example: Réponses à un sondage, empilées à 100 %

stacked et percent : chaque ligne totalise 100 % ; cliquez sur la légende pour masquer une réponse.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/survey.html

```html
<minerva-horizontal-bar-chart
  id="survey"
  stacked
  percent
  height="260"
></minerva-horizontal-bar-chart>

```

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/survey.ts

```tsx
// `stacked percent`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#survey")!;
  chart.series = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  chart.options = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
}

```
