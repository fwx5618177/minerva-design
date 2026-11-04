# Entonnoir

Les étapes d’un processus qui perd du volume en chemin (inscriptions, pipeline commercial, paiement), avec le taux de conversion d’une étape à la suivante. Survolez ou utilisez les flèches pour mettre une étape en évidence ; un clic sur la légende la masque.

Package: minerva-design@1.20.2

Renderer: angular

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

Page des tarifs

Inscription commencée

E-mail vérifié

Projet créé

Collègue invité

Passage à l'offre payante

{{users}} utilisateurs

{{share}} des visiteurs

{{users}} perdus depuis « {{stage}} »

Entonnoir d'inscription

Alertes

Tableaux de bord

Intégrations

Rapports

API publique

Ordre de tri

Décroissant

Croissant

Ordre des données

{{users}} utilisateurs par semaine

Utilisateurs actifs hebdomadaires par fonctionnalité

Visites

Fiche produit

Ajout au panier

Commande

Paiement

Commande validée

Étape

Visiteurs

Abandon

{{share}} de la première étape

Tunnel de commande d'une boutique en ligne

Abandon entre les étapes

Candidature

Présélection

Entretien technique

Entretien sur site

Offre

Embauche

{{candidates}} candidats

Durée habituelle de l'étape : {{days}}

Processus de recrutement d'un poste d'ingénieur

{{stage}} : {{candidates}} candidats ({{share}} des candidatures)

{{rate}} des candidats sont embauchés, en {{days}} en moyenne

Ordinateur

Mobile

{{rate}} de conversion

Tunnel de commande : {{device}}

Impressions

Clics

Prospects

Prospects qualifiés

Clients

Tous les canaux

Annonces de recherche

Réseaux sociaux

E-mail

Partenaires

Canal

{{share}} de l’étape précédente

Coût par résultat : {{cost}}

Entonnoir marketing du mois : {{channel}}

Dépenses : {{spend}} · Clients : {{customers}} · Coût d’acquisition : {{cac}} par client

Visites

Ajouts au panier

Paiement

Commandes payées

Entonnoir de paiement mensuel calculé à partir des taux de conversion

{{from}} → {{to}}

Baisser la conversion de {{step}}

Augmenter la conversion de {{step}}

Revenir aux taux actuels

{{orders}} commandes ({{ordersDelta}}) · {{revenue}} de chiffre d’affaires ({{revenueDelta}}) par mois

Visiteurs

Offre consultée

Ajouts au panier

Paiement

Commandes

Entonnoir de la vente flash, mis à jour en direct

Pause

Reprendre

Recommencer

{{time}} · {{orders}} commandes · {{rate}} des visiteurs

La vente est terminée : {{orders}} commandes.

Prospect

Qualifié

Démo

Proposition

Négociation

{{deals}} affaires · {{amount}}

Probabilité de gain : {{share}}

Affaires en cours par étape du pipeline, en montant

{{stage}} : {{deals}} affaires en cours

Prévision pondérée : {{amount}}

Cliquez sur une étape pour lister ses affaires.

## FunnelChart

Support: beta

Native Angular: MnFunnelChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFunnelChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "sort",
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "conversion",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "shape",
    "typeText": "\"bar\" | \"trapezoid\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Conversion funnel

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFunnelChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFunnelChart],
  template: `
@let t = labels[language()];
<mn-funnel-chart
  [data]="[
    { name: t[0], value: 12000 },
    { name: t[1], value: 4800 },
    { name: t[2], value: 2100 },
    { name: t[3], value: 860 }
  ]"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Visits", "Sign-ups", "Trials", "Purchases"],
  "zh": ["访问", "注册", "试用", "购买"],
  "ja": ["訪問", "登録", "トライアル", "購入"],
  "fr": ["Visites", "Inscriptions", "Essais", "Achats"]
};
}

```

## Example: Barres et tri

shape="bar" dessine des barres centrées pour des valeurs qui ne forment pas une séquence ; sort les trie (avec animation) et conversion={false} masque les taux.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFunnelChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFunnelChart],
  template: `
@let t = labels[language()];
<mn-funnel-chart
  [data]="[
    { name: t[0], value: 180 },
    { name: t[1], value: 940 },
    { name: t[2], value: 42 },
    { name: t[3], value: 410 },
    { name: t[4], value: 31 }
  ]"
  shape="bar"
  sort="descending"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  "zh": ["面试", "申请", "录用通知", "筛选", "入职"],
  "ja": ["面接", "応募", "内定", "書類選考", "採用"],
  "fr": ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"]
};
}

```
