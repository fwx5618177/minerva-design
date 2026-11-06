# Barres radiales

Une progression en anneaux concentriques : anneaux d'activité, avancement des OKR, ventes face aux objectifs. Chaque barre remplit son anneau selon sa valeur rapportée à son maximum, sur une piste de fond teintée, avec des extrémités arrondies ; les étiquettes occupent la partie ouverte du cercle et un texte central peut résumer l'ensemble. Survolez un anneau ou utilisez les flèches pour lire sa valeur, son maximum et sa progression.

Package: minerva-design@1.21.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Bouger

Exercice

Debout

Jour de la semaine

anneaux bouclés

Anneaux d'activité du jour choisi : bouger, exercice et debout face à leurs objectifs

Taux d'activation

Rétention à 4 semaines

NPS au-dessus de 50

Latence p95

Baisse de l'attrition

avancement moyen

Avancement des résultats clés du trimestre

Nord

Sud

Est

Ouest

de l'objectif

Ventes trimestrielles de chaque région face à son objectif

Processeur

Mémoire

Disque

Réseau

Forme

Trois quarts

Cercle complet

Demi-cercle

Extrémités arrondies

Pistes

Utilisation des ressources d'un serveur, en pourcentage de la capacité

Épargne de précaution

Vacances d’été

Nouvel ordinateur

Apport immobilier

Cliquez sur un objectif pour voir le temps nécessaire.

{{goal}} : {{saved}} épargnés sur {{target}}. Reste {{remaining}}, soit environ {{months}} mois à {{monthly}} par mois.

de tous les objectifs

Épargne de chaque objectif comparée à sa cible

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Buts

Passes décisives

Classement

{{rank}}. {{name}}

{{stat}} : {{value}} en {{games}} matchs

{{ratio}} par match

Meilleurs joueurs de la saison : {{stat}}

En tête : {{name}} ({{stat}} : {{value}})

Vidéo de lancement

Photos de l’évènement

Présentation

Sauvegarde de la base

envoyés

Progression de l’envoi de chaque fichier

Recommencer

Tous les fichiers sont envoyés ({{size}}).

{{done}} fichiers sur {{files}} envoyés

Je me sens valorisé

Mes objectifs sont clairs

Je peux progresser ici

Équilibre vie pro / perso

Mon manager me soutient

Je recommanderais l’entreprise

Ordre

Ordre du questionnaire

Plus d’accord d’abord

Moins d’accord d’abord

accord moyen

{{agree}} répondants sur {{answered}} d’accord ({{share}})

Part des salariés d’accord avec chaque affirmation de l’enquête

## RadialBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radial-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "max",
    "typeText": "number | undefined",
    "attribute": "max",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number",
    "attribute": "sweep",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "attribute": "center-value",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "attribute": "center-label",
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
    "typeText": "readonly RadialBarDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<RadialBarChartOptions, \"type\">> | undefined",
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
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Anneaux d’activité

Trois anneaux complets, chacun avec son objectif (max) ; le centre résume la journée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.html

```html
<minerva-radial-bar-chart
  id="activity"
  sweep="360"
  center-value="78 %"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.ts

```tsx
// Activity rings: each bar has its own `max` (the goal), `sweep="360"` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#activity")!;
  chart.data = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chart.centerLabel = text.today;
  chart.options = { labelContent: ["name", "percent"] };
}

```

## Example: Avancement des résultats clés

Avancement de cinq résultats clés sur une échelle ; les libellés occupent le quart vide du balayage de 270°.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.html

```html
<minerva-radial-bar-chart
  id="okr"
  max="100"
  inner-radius="0.2"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.ts

```tsx
// Key results completion on one scale (`max="100"`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

export function setup(root: HTMLElement) {
  const names =
    OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#okr")!;
  chart.data = names.map((name, i) => ({ name, value: DONE[i] }));
  chart.options = { format: (value) => `${value} %` };
}

```
