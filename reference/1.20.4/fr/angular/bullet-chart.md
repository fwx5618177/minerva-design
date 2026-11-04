# Graphique à puces

Des barres d'indicateurs compactes (Stephen Few) : chaque ligne montre une mesure sous forme de barre sur des plages qualitatives (des gris, la plus mauvaise la plus foncée) avec un repère à sa cible, sur sa propre échelle. Les lignes peuvent mélanger les unités, un tableau de bord tient donc beaucoup d'indicateurs dans peu de place. Survolez une ligne ou utilisez les flèches pour lire sa valeur, sa cible et sa plage.

Package: minerva-design@1.20.4

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnBulletChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly BulletDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: KPIs against targets

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let t = labels[language()];
<mn-bullet-chart
  [data]="[
    { name: t.kpis[0], value: 270, target: 250, ranges: [150, 225, 300] },
    { name: t.kpis[1], value: 22.5, target: 26, ranges: [20, 25, 30] },
    { name: t.kpis[2], value: 1650, target: 2100, ranges: [1000, 2000, 2500] },
    { name: t.kpis[3], value: 4.4, target: 4.5, ranges: [3.5, 4.25, 5] }
  ]"
  [rangeLabels]="t.ranges"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "kpis": ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    "ranges": ["Poor", "Fair", "Good"]
  },
  "zh": {
    "kpis": ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    "ranges": ["差", "一般", "良好"]
  },
  "ja": {
    "kpis": ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    "ranges": ["不良", "普通", "良好"]
  },
  "fr": {
    "kpis": ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    "ranges": ["Faible", "Correct", "Bon"]
  }
};
}

```

## Example: Vertical

orientation="vertical" transforme les lignes en colonnes, ici les points livrés par chaque équipe face à son engagement. Les plages sont communes à toutes les colonnes grâce à la prop ranges du graphique ; barSize épaissit les barres.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let q = quarters[language()];
<mn-bullet-chart
  [data]="[
    { name: q[0], value: 82, target: 90 },
    { name: q[1], value: 95, target: 90 },
    { name: q[2], value: 71, target: 100 },
    { name: q[3], value: 104, target: 100 }
  ]"
  orientation="vertical"
  [ranges]="[60, 90, 120]"
  targetColor="var(--danger-color, #dc2626)"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  quarters = {
  "en": ["Q1", "Q2", "Q3", "Q4"],
  "zh": ["第一季度", "第二季度", "第三季度", "第四季度"],
  "ja": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  "fr": ["T1", "T2", "T3", "T4"]
};
}

```
