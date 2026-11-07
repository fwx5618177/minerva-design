# Graphique circulaire / anneau

Les parts d’un tout : camembert, anneau (avec le total au centre) et rose de Nightingale. À utiliser pour quelques catégories (8 au plus, idéalement) quand les proportions comptent plus que les comparaisons exactes. Survolez une part ou utilisez les flèches pour la mettre en évidence, Échap pour effacer ; un clic sur la légende masque une part.

Package: minerva-design@1.22.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Recherche naturelle

Accès direct

Réseaux sociaux

Publicité payante

Sites référents

E-mail

{{sessions}} sessions · {{share}}

Sessions du site par source de trafic, 30 derniers jours

{{source}} : {{sessions}} sessions ({{share}} du trafic)

Cliquez sur une part (ou placez le focus sur le graphique et appuyez sur Entrée) pour choisir une source

Entreprise

Business

Pro

Essentiel

Revenu mensuel

Revenu mensuel récurrent par offre

E-mail

Chat en direct

Formulaire web

Téléphone

Réseaux sociaux

Communauté

Position des libellés

À l'extérieur

À l'intérieur

Aucun

Contenu des libellés

Nom

Valeur

Pourcentage

{{tickets}} tickets · {{share}}

Tickets de support par canal

Précipitations mensuelles moyennes

Autres

Unités livrées

{{units}} unités · {{share}}

Parts de marché des smartphones par fabricant

Logement

Alimentation

Transport

Loisirs

Loyer

Énergie

Assurance

Courses

Restaurants

Transports en commun

Voiture

Voyages

Abonnements

Sport

Budget mensuel par poste

Budget mensuel par catégorie

{{name}} : {{amount}} ({{share}})

Survolez un anneau pour lire une catégorie ou un poste

Asie-Pacifique

Europe

Amérique du Nord

Amérique latine

Mobile

Ordinateur

Tablette

Sessions par appareil : {{region}}

Actions américaines

Actions internationales

Obligations

Immobilier

Matières premières

Liquidités

Classes d’actifs affichées

Tout afficher

sélection

valeur totale

{{share}} du portefeuille

Portefeuille d’investissement par classe d’actifs

{{shown}} classes d’actifs sur {{total}} affichées : {{value}}, soit {{share}} du portefeuille.

Mode sombre

Mode hors ligne

API publique

Plus d’intégrations

Rapports personnalisés

Quelle fonctionnalité développer ensuite ?

votes

{{votes}} votes · {{share}}

Résultats du sondage en direct par réponse

Pause

Reprendre

Réinitialiser

En tête : {{answer}}

Calcul

Bases de données

Stockage

Réseau

Machines virtuelles

Kubernetes

Fonctions serverless

Bases SQL

Bases NoSQL

Cache en mémoire

Stockage objet

Stockage bloc

Sauvegardes

Transfert de données

CDN

Répartiteurs de charge

Facture cloud

Toutes les catégories

Cliquez pour voir ses services

Coûts de la catégorie {{category}} par service

Facture cloud mensuelle par catégorie

{{service}} : {{amount}}, soit {{share}} de {{category}}.

{{category}} : {{amount}}, soit {{share}} de la facture. Cliquez sur un service pour voir sa part.

Facture du mois : {{total}}. Cliquez sur une catégorie pour voir ses services.

Très insatisfait

Insatisfait

Neutre

Satisfait

Très satisfait

T{{n}}

Trimestre

CSAT

{{answers}} réponses · {{share}}

Réponses de satisfaction client au {{quarter}}

CSAT de {{csat}} sur {{respondents}} répondants.

CSAT de {{csat}}, {{delta}} points depuis le {{previous}}, sur {{respondents}} répondants.

## DonutChart

Support: beta

Native Angular: MnDonutChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDonutChart"
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
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
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

## PieChart

Support: beta

Native Angular: MnPieChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPieChart"
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
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
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

## Example: Traffic sources

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPieChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPieChart],
  template: `
@let t = labels[language()];
<mn-pie-chart
  [data]="[
    { name: t[0], value: 1048 },
    { name: t[1], value: 735 },
    { name: t[2], value: 580 },
    { name: t[3], value: 484 },
    { name: t[4], value: 300 }
  ]"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Search", "Direct", "Social", "Email", "Referral"],
  "zh": ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  "ja": ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  "fr": ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"]
};
}

```

## Example: Anneau avec total

centerValue et centerLabel écrivent le total au centre ; onHover le remplace par l’offre survolée, l’infobulle est donc désactivée. legend.toggle vaut false pour que le total corresponde toujours aux parts affichées.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDonutChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDonutChart],
  template: `
@let t = labels[language()];
<mn-donut-chart
  [data]="[
    { name: t.plans[0], value: 2 },
    { name: t.plans[1], value: 18 },
    { name: t.plans[2], value: 46 },
    { name: t.plans[3], value: 34 }
  ]"
  centerValue="€100k"
  [centerLabel]="t.total"
  [height]="300"
  (itemClick)="selected = $event.name + ': €' + $event.value + 'k'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "total": "monthly revenue",
    "hint": "Click a slice",
    "plans": ["Free", "Starter", "Pro", "Enterprise"]
  },
  "zh": {
    "total": "月收入",
    "hint": "点击一个扇区",
    "plans": ["免费版", "入门版", "专业版", "企业版"]
  },
  "ja": {
    "total": "月間売上",
    "hint": "スライスをクリックします",
    "plans": ["無料", "スターター", "プロ", "エンタープライズ"]
  },
  "fr": {
    "total": "revenu mensuel",
    "hint": "Cliquez sur une part",
    "plans": ["Gratuit", "Starter", "Pro", "Entreprise"]
  }
};
}

```
