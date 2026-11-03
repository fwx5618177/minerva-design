# Graphique en chandeliers

Cours d’ouverture, plus haut, plus bas et clôture par période, pour des actions, des cryptomonnaies ou toute donnée OHLC. Les bougies haussières et baissières ont chacune leur couleur, des séries de lignes peuvent s’y ajouter (moyennes mobiles) et les longs historiques restent fluides à zoomer et à faire défiler grâce au GPU.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Ouverture

Plus haut

Plus bas

Clôture

Variation

Couleurs des bougies

Vert en hausse, rouge en baisse

Rouge en hausse, vert en baisse

Cours quotidiens d'ACME sur 60 séances

MM {{days}}

Cours quotidiens de NOVA sur 120 séances avec les moyennes mobiles à 5 et 20 jours

50 000 bougies d'une minute

{{candles}} bougies · dessinées avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Volume

Cours quotidiens d'ORBT sur 90 séances

Volume quotidien échangé d'ORBT

VWAP

Prévisions abaissées

Bougies de 5 minutes d'ORBT sur une séance avec le VWAP

Barres OHLC journalières

Chandeliers journaliers

Chandeliers creux journaliers

Barres OHLC

Chandeliers

Chandeliers creux

traits pour l'ouverture et la clôture

corps plein de l'ouverture à la clôture

corps vide quand la clôture est plus haute

ETH/USDT

Graphique 4 heures d'ETH/USDT avec huit moyennes exponentielles

Volume

Panneau dédié

Sous les prix

BTC/USDT

Graphique horaire de BTC/USDT avec le volume coloré selon les bougies

CATL 300750

Graphique journalier de CATL, bougies haussières en rouge

R

D

Div

P↓

Résultats

Dividende

Division d'actions

Prévisions abaissées

ORBT

Graphique journalier d'ORBT avec résultats, dividendes et division d'actions

Pause

Reprendre

En direct : dix transactions par seconde

En pause

ADA/USDT

5 s

Bougies de cinq secondes d'ADA/USDT mises à jour en direct

NASDAQ 100

Chandeliers creux 30 minutes du NASDAQ 100 sur un thème nuit

Figure

Toutes

Doji

Marteau

Étoile filante

Avalement

D

M

EF

A↑

A↓

Doji

Marteau

Étoile filante

Avalement haussier

Avalement baissier

ouverture et clôture presque égales, indécision

longue mèche basse après une baisse, les acheteurs arrivent

longue mèche haute après une hausse, les vendeurs arrivent

un corps haussier recouvre le corps baissier précédent

un corps baissier recouvre le corps haussier précédent

{{name}} : {{value}}

{{name}} le {{date}} : {{meaning}}.

Survolez une bougie marquée pour nommer sa figure.

Graphique journalier ORBT avec les figures en chandeliers

BTC/USD

AAPL

EUR/USD

Or (XAU/USD)

48 heures

30 jours

Bougies {{name}}, {{change}} sur la période

R1

P

S1

EUR/USD

Bougies horaires EUR/USD avec les points pivots journaliers

{{time}} · amplitude {{range}} pips · corps {{body}} pips · variation {{change}} pips · réticule à {{distance}} pips du dernier cours

Pivots de vendredi : P {{pivot}}, R1 {{r1}}, S1 {{s1}}. Survolez une bougie pour la mesurer en pips.

## CandlestickChart

Support: beta

Chart whose untyped series are OHLC candles (`open`, `high`, `low`, `y`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/candlestick-chart/index",
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
