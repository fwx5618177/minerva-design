# Aire de plage

Des bandes entre un bord inférieur et un bord supérieur : intervalles de confiance, prévisions, plages min-max et éventails de percentiles.

Package: minerva-design@1.22.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Intervalle à 95 %

Intervalle à 80 %

Réel

Prévision

Commandes

Aujourd'hui

Commandes mensuelles avec une prévision sur 12 mois et ses intervalles de confiance

Min – max

Normale saisonnière

Températures minimales et maximales quotidiennes sur un an

5e – 95e percentile

25e – 75e percentile

Médiane

Percentiles du temps de réponse sur une journée

Bas – haut

Clôture

Plage quotidienne et cours de clôture sur six mois

Attendu ± {{k}}σ

Mesuré

Anomalies

Sensibilité

Bande à {{k}}σ

Requêtes par minute

Requêtes d'API par minute sur une semaine, avec la bande attendue et les anomalies hors de celle-ci

Aucun point hors de la bande.

Anomalies : {{n}}, la dernière le {{latest}}.

Achat – vente

Prix moyen

Pause

Reprendre

Achat {{bid}} · Vente {{ask}}

Écart {{value}} pb

Prix acheteur et vendeur en direct d'une paire de devises sur la dernière minute, avec le prix moyen

Faibles émissions (SSP1-2.6)

Faibles émissions, fourchette probable

Émissions très élevées (SSP5-8.5)

Émissions très élevées, fourchette probable

Observé

Limite de {{value}}

Réchauffement depuis 1850-1900

Réchauffement mondial observé depuis 1950 et projeté jusqu'en 2100 selon un scénario de faibles et un de très fortes émissions

Avec de faibles émissions, la médiane dépasse {{lowLimit}} vers {{low}} et se stabilise à {{peak}} ; avec des émissions très élevées, elle dépasse {{highLimit}} vers {{high}}.

Intervalle de confiance à {{level}}

Amélioration

Aucune différence

Significatif

Niveau de confiance

Jour du test

Gain de conversion de B sur A

Gain de conversion cumulé de la variante B sur la variante A pendant un test de 28 jours, avec son intervalle de confiance

B a {{lift}} d'avance, mais l'intervalle à {{level}} contient encore zéro.

B convertit {{lift}} de mieux ({{low}} à {{high}} à {{level}}), de façon significative depuis le jour {{day}}.

## RangeAreaChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RangeAreaChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
