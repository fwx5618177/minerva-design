# Histogramme

La distribution d'échantillons bruts en classes de même largeur, de quelques centaines de valeurs à des millions.

Package: minerva-design@1.20.6

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

Requêtes

Distribution d'un million de latences avec p50, p95 et p99

Règle de classes

Auto

Sturges

10 classes

40 classes

Étudiants

Note

Distribution des notes de l'examen

Clients

Âge

Distribution des âges des clients

Contrôle

Nouvel accueil

Durée de session (minutes)

Durées de session des deux groupes d'un test A/B

Ajustement normal

LSI

LSS

Nominal

Outil réglé

Moyenne {{mean}}, σ {{sd}}, Cpk {{cpk}}, {{ppm}} ppm hors tolérance :

capable

non capable

Pièces

Diamètre

Distribution des diamètres d'arbres avec les limites de spécification et une courbe normale ajustée

Livraison gratuite

Médiane {{value}}

p99 {{value}}

{{share}} des commandes atteignent le seuil de livraison gratuite de {{threshold}}.

Commandes

Montant de la commande (échelle log)

Distribution des montants de commande sur une échelle logarithmique

Pause

Reprendre

Réinitialiser

{{share}} des appels décrochés en {{target}} ou moins, p90 {{p90}} :

objectif atteint

objectif manqué

Appels

Temps d'attente

Objectif

p90

Distribution en direct des temps d'attente des 600 derniers appels au support

{{share}} des employés

{{value}} employés ({{share}})

Cliquez pour la part cumulée

Cliquez sur une barre pour voir la part des employés dont le trajet est plus court.

{{share}} des employés ({{employees}}) font un trajet de {{limit}} ou moins.

Employés

Trajet aller

Distribution des temps de trajet des employés

## HistogramChart

Support: beta

Histogram of the raw `values` (bins rule or count, domain, nice), extra series over the bins; formatBin() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/histogram-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "values",
    "typeText": "array",
    "required": false
  },
  {
    "name": "bins",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "domain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nice",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
