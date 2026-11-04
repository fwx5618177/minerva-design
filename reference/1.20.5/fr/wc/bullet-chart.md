# Graphique à puces

Des barres d'indicateurs compactes (Stephen Few) : chaque ligne montre une mesure sous forme de barre sur des plages qualitatives (des gris, la plus mauvaise la plus foncée) avec un repère à sa cible, sur sa propre échelle. Les lignes peuvent mélanger les unités, un tableau de bord tient donc beaucoup d'indicateurs dans peu de place. Survolez une ligne ou utilisez les flèches pour lire sa valeur, sa cible et sa plage.

Package: minerva-design@1.20.5

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

Chiffre d'affaires

milliers de dollars US

Marge

% du chiffre d'affaires

Panier moyen

dollars US

Nouveaux clients

nombre

Satisfaction

sur 5

Mauvais

Moyen

Bon

Non respecté

À risque

Sain

Indicateurs commerciaux du trimestre en cours face à leurs cibles

Paiement

Recherche

Mobile

Plateforme

Croissance

Données

Points livrés par chaque équipe face à son engagement

Disponibilité

% des requêtes

Apdex

score, 0–1

Débit

requêtes / s

Budget d'erreur

% restant

Objectifs de niveau de service de l'API ce mois-ci

Visiteurs

milliers

Inscriptions

comptes

Activation

% des inscriptions

Revenu mensuel récurrent

milliers de dollars US

Mois

Indicateurs de croissance du mois choisi face à leurs cibles

Clients grands comptes intégrés dans les 30 premiers jours suivant la signature

% des nouveaux comptes

Tickets de support prioritaires traités en moins d’une heure ouvrée

% des tickets

Mises en production déployées sans incident visible par les clients

% des déploiements

Rétention nette du chiffre d’affaires des abonnements annuels

ratio

KPI opérationnels aux noms longs comparés à leurs objectifs

Marketing

Ingénierie

Ventes

Ressources humaines

Services généraux

Déplacements

Budget annuel : {{budget}}

Confortable

Tendu

Hors plan

{{over}} services dépensent plus vite que prévu. Cliquez sur une ligne pour voir son écart.

{{department}} dépasse le plan : {{variance}} à la fin du T3, {{share}} du budget annuel consommé, {{left}} restants.

{{department}} respecte le plan : {{variance}} à la fin du T3, {{share}} du budget annuel consommé, {{left}} restants.

Dépenses de chaque service à la fin du T3 comparées au budget prévu à cette date

Température d’entrée

Humidité

Consommation

Vitesse des ventilateurs

°C

% relative

kW par baie

% de la vitesse max.

Normal

Alerte

Critique

Mesures en direct

Mesures des capteurs de la salle serveurs comparées à leurs consignes et seuils

À surveiller : {{sensors}}

Tous les capteurs sont dans leurs limites.

Distance de la semaine

Sortie longue

Dénivelé positif

Séances

Sommeil

plan : {{plan}}

Sous le plan

Dans le plan

Au-dessus du plan

Coureur

Amara

Lucas

Mei

{{value}} pour un plan de {{plan}} ({{share}})

Entraînement hebdomadaire de {{runner}} comparé au plan

{{runner}} a atteint {{met}} objectifs hebdomadaires sur {{metrics}}.

Ingénierie

Ventes

Support

Marketing

Produit

Finance

{{plan}} prévus cette année

En retard

En rattrapage

Dans les temps

Tri

Ordre du plan

Plus en retard d’abord

Plus en avance d’abord

Embauches de chaque équipe comparées au plan d’effectifs annuel

{{hired}} embauches sur {{planned}} prévues ({{share}}) pour les {{teams}} équipes affichées.

Aucune équipe affichée.

## BulletChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bullet-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
    "attribute": "target-color",
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
    "typeText": "readonly BulletDatum[] | undefined",
    "required": false
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<BulletChartOptions, \"type\">> | undefined",
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

## Example: KPI face aux objectifs

Une ligne par KPI avec sa valeur, son repère d’objectif et des plages qualitatives nommées dans l’infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/wc/kpis.html

```html
<minerva-bullet-chart id="kpis"></minerva-bullet-chart>

```

### apps/docs/src/docs/pages/bullet-chart/wc/kpis.ts

```tsx
// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by `rangeLabels` in the tooltip).
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBulletChart>("#kpis")!;
  chart.data = KPIS.map(([value, target, ranges], i) => ({
    name: text.kpis[i],
    value,
    target,
    ranges,
  }));
  chart.rangeLabels = text.ranges;
}

```

## Example: Colonnes verticales

Les ventes trimestrielles en colonnes partageant les mêmes plages, objectifs en couleur de danger.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/wc/vertical.html

```html
<minerva-bullet-chart
  id="quarters"
  orientation="vertical"
  target-color="var(--danger-color, #dc2626)"
></minerva-bullet-chart>

```

### apps/docs/src/docs/pages/bullet-chart/wc/vertical.ts

```tsx
// `orientation="vertical"`: columns sharing the ranges of the element
// (`ranges`), the targets in the danger color.
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

export function setup(root: HTMLElement) {
  const quarters =
    QUARTERS[document.documentElement.lang as keyof typeof QUARTERS] ??
    QUARTERS.en;
  const chart = root.querySelector<MinervaBulletChart>("#quarters")!;
  chart.data = quarters.map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  }));
  chart.ranges = [60, 90, 120];
}

```
