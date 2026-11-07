# Graphique circulaire / anneau

Les parts d’un tout : camembert, anneau (avec le total au centre) et rose de Nightingale. À utiliser pour quelques catégories (8 au plus, idéalement) quand les proportions comptent plus que les comparaisons exactes. Survolez une part ou utilisez les flèches pour la mettre en évidence, Échap pour effacer ; un clic sur la légende masque une part.

Package: minerva-design@1.22.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "DonutChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "innerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.62,
    "required": false,
    "description": "Inner radius as a fraction of the outer radius"
  },
  {
    "name": "data",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Slices: a name, a value (negative values count as 0) and an optional color"
  },
  {
    "name": "startAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
  },
  {
    "name": "padAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Gap between the slices, in pixels"
  },
  {
    "name": "cornerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of the slices, in pixels"
  },
  {
    "name": "rose",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Nightingale rose: the radius (instead of the angle) shows the value"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "inside",
      "none",
      "outside"
    ],
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "typeRef": "type:b320faac5906bbcc585a",
    "required": false,
    "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
  },
  {
    "name": "labelContent",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "typeRef": "type:02e073f60777a3ee9d5e",
    "required": false,
    "description": "What a label shows: name, value, percent (combinable)"
  },
  {
    "name": "centerValue",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Big text in the hole of a donut (e.g. the total)"
  },
  {
    "name": "centerLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Small text under `centerValue`"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## PieChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PieChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Slices: a name, a value (negative values count as 0) and an optional color"
  },
  {
    "name": "innerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut"
  },
  {
    "name": "startAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
  },
  {
    "name": "padAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Gap between the slices, in pixels"
  },
  {
    "name": "cornerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of the slices, in pixels"
  },
  {
    "name": "rose",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Nightingale rose: the radius (instead of the angle) shows the value"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "inside",
      "none",
      "outside"
    ],
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "typeRef": "type:b320faac5906bbcc585a",
    "required": false,
    "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
  },
  {
    "name": "labelContent",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "typeRef": "type:02e073f60777a3ee9d5e",
    "required": false,
    "description": "What a label shows: name, value, percent (combinable)"
  },
  {
    "name": "centerValue",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Big text in the hole of a donut (e.g. the total)"
  },
  {
    "name": "centerLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Small text under `centerValue`"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:PieChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of PieChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true,
        "description": "Slices: a name, a value (negative values count as 0) and an optional color"
      },
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "1 (pie), 2 (donut)",
        "description": "Gap between the slices, in pixels"
      },
      {
        "name": "cornerRadius",
        "type": "number",
        "required": false,
        "default": "0 (pie), 4 (donut)",
        "description": "Corner radius of the slices, in pixels"
      },
      {
        "name": "rose",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Nightingale rose: the radius (instead of the angle) shows the value"
      },
      {
        "name": "labels",
        "type": "\"outside\" | \"inside\" | \"none\"",
        "required": false,
        "default": "\"outside\" (up to 12 slices), \"none\" otherwise",
        "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
      },
      {
        "name": "labelContent",
        "type": "readonly (\"name\" | \"value\" | \"percent\")[]",
        "required": false,
        "default": "[\"name\", \"percent\"]",
        "description": "What a label shows: name, value, percent (combinable)"
      },
      {
        "name": "centerValue",
        "type": "string",
        "required": false,
        "description": "Big text in the hole of a donut (e.g. the total)"
      },
      {
        "name": "centerLabel",
        "type": "string",
        "required": false,
        "description": "Small text under `centerValue`"
      }
    ]
  },
  "native:DonutChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of DonutChart: a PieChart with a hole",
    "kind": "interface",
    "extends": [
      "PieChartProps"
    ],
    "props": [
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0.62",
        "description": "Inner radius as a fraction of the outer radius"
      }
    ]
  },
  "native:ShapeChartCommonProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props shared by every named shape chart (PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap, BulletChart and ChordChart)",
    "kind": "interface",
    "extends": [
      "ShapeChartFrameProps"
    ],
    "props": [
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
      },
      {
        "name": "legend",
        "type": "boolean | ShapeLegendOptions",
        "required": false,
        "default": "shown for pie, donut, funnel, multi-series radar charts, calendar heatmaps and radial bar charts without labels",
        "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
      },
      {
        "name": "tooltip",
        "type": "boolean | ShapeTooltipOptions",
        "required": false,
        "default": "true",
        "description": "Tooltip shown while a mark is pressed; `false` disables it"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "default": "compact numbers (1.2k, 3.4M)",
        "description": "Formats the values of the labels and the tooltip"
      },
      {
        "name": "percentFormat",
        "type": "(share: number) => string",
        "required": false,
        "default": "one decimal, e.g. \"40.0%\"",
        "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
      },
      {
        "name": "hidden",
        "type": "readonly number[]",
        "required": false,
        "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
      },
      {
        "name": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Entry and update animations (skipped when the theme reduces motion)"
      },
      {
        "name": "padding",
        "type": "ChartPadding",
        "required": false,
        "default": "8 on every side",
        "description": "Space around the drawing, in pixels"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "default": "the chart type in its locale, e.g. \"Donut chart\" (a gauge: \"Gauge: {label}\")",
        "description": "Accessible name of the chart"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the runtime's default locale, else English",
        "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
      },
      {
        "name": "texts",
        "type": "Partial<ShapeChartLabels>",
        "required": false,
        "description": "Replaces built-in texts of the `locale`"
      }
    ]
  },
  "native:ShapeChartFrameProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of every shape chart that are not chart options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "height",
        "type": "DimensionValue",
        "required": false,
        "default": "320 (GaugeChart: 240, RadialBarChart: 300, SankeyChart and SunburstChart: 360, ChordChart: 420, CalendarHeatmap and BulletChart: from the data)",
        "description": "Height of the chart (the legend included)"
      },
      {
        "name": "width",
        "type": "DimensionValue",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the chart"
      },
      {
        "name": "onHover",
        "type": "(event: ShapeHoverEvent | null) => void",
        "required": false,
        "description": "Called when the highlighted mark changes (press and drag over the chart)"
      },
      {
        "name": "onClick",
        "type": "(event: ShapeHoverEvent) => void",
        "required": false,
        "description": "Called when a mark is tapped"
      },
      {
        "name": "onToggle",
        "type": "(event: ShapeToggleEvent) => void",
        "required": false,
        "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
      },
      {
        "name": "renderTooltip",
        "type": "(event: ShapeHoverEvent) => ReactNode",
        "required": false,
        "description": "React content of the tooltip (replaces the default content)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Styles of the root view"
      },
      {
        "name": "testID",
        "type": "string",
        "required": false,
        "description": "Test identifier of the root view"
      },
      {
        "name": "ref",
        "type": "Ref<ShapeChartHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "native:ShapeChartHandle": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Imperative handle of the shape chart components (`ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "getInstance",
        "type": "() => CanvasShapeChartInstance | null",
        "required": true,
        "description": "The platform-free engine instance drawing the chart (`toggle`, `getHidden`, `clearHover`...)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Base

Les étiquettes extérieures, reliées par des traits de rappel, affichent le nom et la part ; onClick (ou Entrée sur la part en surbrillance) renvoie la source choisie.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  PieChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Website sessions over the last 30 days, by traffic source
const sessions = [
  { key: "organic", value: 48200 },
  { key: "direct", value: 23100 },
  { key: "social", value: 16400 },
  { key: "paid", value: 12700 },
  { key: "referral", value: 9800 },
];

// Phones are narrow: the shares go inside the slices, the names in the legend
const labelContent = ["percent"] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const locale = i18n.language;
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const data = useMemo(
    () =>
      sessions.map(({ key, value }) => ({
        name: t(`data.sources.${key}`),
        value,
      })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <PieChart
        data={data}
        height={300}
        labels="inside"
        labelContent={labelContent}
        // Rounded slices, separated by a 2px gap
        cornerRadius={6}
        padAngle={2}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        onClick={setSelected}
        ariaLabel={t("data.sessionsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("data.selectedSource", {
              source: selected.name,
              sessions: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("native.data.tapSlice")}
      </Text>
    </View>
  );
}

```

## Example: Anneau avec total

centerValue et centerLabel écrivent le total au centre ; onHover le remplace par l’offre survolée, l’infobulle est donc désactivée. legend.toggle vaut false pour que le total corresponde toujours aux parts affichées.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/native/donut.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeHoverEvent } from "minerva-design/native";

// Monthly recurring revenue by plan, in US dollars
const revenue = [
  { key: "enterprise", value: 48200 },
  { key: "business", value: 31500 },
  { key: "pro", value: 22800 },
  { key: "starter", value: 9400 },
];
const total = revenue.reduce((sum, d) => sum + d.value, 0);

// The total in the hole always covers every plan
const legend = { toggle: false } as const;

export default function Donut() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // The pressed plan replaces the total in the hole
  const [pressed, setPressed] = useState<ShapeHoverEvent | null>(null);
  const data = useMemo(
    () => revenue.map(({ key, value }) => ({ name: t(`plans.${key}`), value })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const format = (value: number) => currency.format(value);
  return (
    <DonutChart
      data={data}
      height={300}
      format={format}
      // Softer segment ends than the 4px default
      cornerRadius={10}
      centerValue={format(pressed ? pressed.value : total)}
      centerLabel={
        pressed
          ? `${pressed.name} · ${percent.format(pressed.percent)}`
          : t("monthlyRevenue")
      }
      onHover={setPressed}
      tooltip={false}
      legend={legend}
      labels="none"
      ariaLabel={t("mrrAria")}
    />
  );
}

```
