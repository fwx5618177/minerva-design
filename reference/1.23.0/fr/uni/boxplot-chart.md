# Boîte à moustaches

Médianes, quartiles, moustaches et valeurs extrêmes pour comparer des distributions, à partir d'échantillons bruts ou de statistiques calculées. Les valeurs extrêmes sont des anneaux de la couleur de la série : survolez-en une pour lire sa valeur et son groupe.

Package: minerva-design@1.23.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Passerelle

Authentification

Recherche

Paiement

Recommandations

Images

Temps de réponse

Max

Q3

Médiane

Q1

Min

Valeurs extrêmes

Distribution du temps de réponse de chaque service

Salaire annuel

Développeur junior

Développeur

Développeur senior

Responsable technique

Responsable d'équipe

Distribution des salaires par poste

En semaine

Le week-end

Paris

Lyon

Marseille

Lille

Délai de livraison (heures)

Délais de livraison par ville en semaine et le week-end

Maximale du jour

Moyenne

Distribution des températures maximales quotidiennes par mois

Lint

Tests unitaires

Intégration

Bout en bout

Publication

Portée des moustaches

1,5 × EIQ

3 × EIQ

Min – max

Forme des valeurs aberrantes

Creuses

Pleines

{{value}} exécutions dessinées comme valeurs aberrantes

Durée du build

Distribution des durées de build de chaque pipeline CI

Cliquez sur une boîte ou une valeur aberrante.

{{day}} : un patient a attendu {{value}}.

{{day}} : attente médiane {{median}}, la moitié des patients a attendu entre {{q1}} et {{q3}}, {{outliers}} valeurs aberrantes.

Attente

Objectif de quatre heures

Distribution de l'attente aux urgences par jour de la semaine

Feuilles de style

Scripts

Polices

Images

Vidéos

Échelle logarithmique

{{value}} fichiers dépassent le budget de {{budget}}.

Taille du fichier

Budget

Distribution des tailles de fichiers d'un site web par type

Est des États-Unis

Ouest des États-Unis

Europe de l'Ouest

Asie-Pacifique Sud

Est de l'Amérique du Sud

Pause

Reprendre

SLA menacé : {{regions}}

Toutes les régions respectent le SLA

Latence

SLA

Distribution en direct de la latence des requêtes dans chaque région

## BoxPlotChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BoxPlotChart"
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
    "name": "name",
    "typeText": "string | undefined",
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
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
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
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
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
    "name": "whisker",
    "typeText": "number | \"minmax\" | undefined",
    "required": false
  },
  {
    "name": "outlierShape",
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "required": false
  },
  {
    "name": "outlierSize",
    "typeText": "number | undefined",
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
