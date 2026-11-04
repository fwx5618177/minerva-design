# Graphique en chandeliers

Cours d’ouverture, plus haut, plus bas et clôture par période, pour des actions, des cryptomonnaies ou toute donnée OHLC. Les bougies haussières et baissières ont chacune leur couleur, des séries de lignes peuvent s’y ajouter (moyennes mobiles) et les longs historiques restent fluides à zoomer et à faire défiler grâce au GPU.

Package: minerva-design@1.20.2

Renderer: vue

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

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
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
    "type": "[event: ChartHoverEvent | null]",
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
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
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
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
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
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: moving-average

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/candlestick-chart/vue/moving-average.vue

```vue
<script setup lang="ts">
// A series with `type: "line"` is drawn over the candles: a 5-day moving
// average of the closes.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { CandlestickChart, type ChartSeries } from "minerva-design/vue/charts";

const TEXT = {
  en: { price: "Price", average: "5-day average" },
  zh: { price: "价格", average: "5 日均线" },
  ja: { price: "価格", average: "5日移動平均" },
  fr: { price: "Cours", average: "Moyenne 5 jours" },
};

const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
  const close = open + 4 * Math.sin(i * 1.7);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
    low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
  };
});
const average = candles.map((candle, i): [number, number] => {
  const window = candles.slice(Math.max(0, i - 4), i + 1);
  const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
  return [candle.x, Math.round(mean * 100) / 100];
});

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed<ChartSeries[]>(() => [
  { name: text.value.price, data: candles },
  { name: text.value.average, type: "line", curve: "smooth", data: average },
]);
</script>

<template>
  <CandlestickChart :series="series" :y-axis="{ zero: false }" :height="300" />
</template>

```

## Example: ohlc

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/candlestick-chart/vue/ohlc.vue

```vue
<script setup lang="ts">
// Each point carries open, high, low and y (the close); rising candles use
// the success color, falling ones the danger color.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { CandlestickChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { price: "Price", day: "Day" },
  zh: { price: "价格", day: "天" },
  ja: { price: "価格", day: "日" },
  fr: { price: "Cours", day: "Jour" },
};

// 40 deterministic sessions
const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
  const close = open + 5 * Math.sin(i * 2.1);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high:
      Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
      100,
    low:
      Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
      100,
  };
});

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [{ name: text.value.price, data: candles }]);
</script>

<template>
  <CandlestickChart
    :series="series"
    :x-axis="{ title: text.day }"
    :y-axis="{ zero: false }"
    :height="300"
  />
</template>

```
