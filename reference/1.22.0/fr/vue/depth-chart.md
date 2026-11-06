# Graphique de profondeur

Profondeur cumulée d'un carnet d'ordres : aires en escalier des achats et ventes autour du prix médian, lecture au survol symétrique (quantité, coût, prix moyen), zoom autour du médian et transitions fluides à des centaines de deltas par seconde.

Package: minerva-design@1.22.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Profondeur du carnet BTC/USDT

Flux en direct

Plage visible

Ajustée

±{{value}}

Cumul

Quantité (BTC)

Montant (USDT)

Courbe

Escalier

Linéaire

Ctrl/⌘ + molette ou pincement pour zoomer autour du médian, double clic pour réinitialiser.

Zoom : {{value}}

Mon achat

Ma vente

Liquidation

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Acheter {{amount}} BTC ({{total}}) balaie les ventes jusqu'à {{price}}, {{slippage}} au-dessus du médian : prix moyen {{average}}.

Vendre {{amount}} BTC ({{total}}) balaie les achats jusqu'à {{price}}, {{slippage}} sous le médian : prix moyen {{average}}.

Survolez les courbes pour chiffrer un ordre au marché.

Sens

Achat au marché

Vente au marché

Taille de l'ordre

{{value}} BTC

Prix moyen

Dernier prix

{{size}} BTC s'exécutent sur {{levels}} niveaux : moyenne {{average}}, dernier prix {{worst}}, {{cost}} au total, {{slippage}} pb du mid.

Seulement {{filled}} BTC sur {{size}} reposent de ce côté : l'ordre viderait les {{levels}} niveaux, jusqu'à {{worst}}.

Bande mesurée

À {{band}} : {{bids}} BTC à l'achat, {{asks}} BTC à la vente, déséquilibre {{imbalance}} · spread {{spread}} ({{spreadBp}} pb)

En attente de la première mesure…

Cumuler les dollars (prix × titres)

Montant (USD)

Titres

Profondeur du carnet de l'action ACME

Consolidé

Plateforme {{name}}

Plateforme

Meilleur bid

Meilleur ask

BTC à ±0,1 %

{{value}} ({{share}})

Profondeur BTC/USDT, {{name}}

Meilleurs prix et liquidité par plateforme

## DepthChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DepthChart"
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
    "type": "boolean",
    "required": false,
    "description": "Legend with the spread (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "tooltip",
    "type": "boolean",
    "required": false,
    "description": "Hover readout (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "grid",
    "type": "boolean",
    "required": false,
    "description": "Grid lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "zoomable",
    "type": "boolean",
    "required": false,
    "description": "Zoom around the mid with the wheel / pinch (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "animate",
    "type": "boolean",
    "required": false,
    "description": "Eased transitions between books (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "midLine",
    "type": "boolean",
    "required": false,
    "description": "Line and label at the mid price (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "axes",
    "type": "boolean",
    "required": false,
    "description": "Price and amount axes (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "mirror",
    "type": "boolean",
    "required": false,
    "description": "Mirrored readout on the other side (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<DepthChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<DepthChartLabels>"
  },
  {
    "name": "curve",
    "type": "\"linear\" | \"step\"",
    "required": false,
    "description": "Stepped or straight curves (default `step`)",
    "typeText": "\"linear\" | \"step\""
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
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the numbers and texts (`\"zh-CN\"`); the page language by default",
    "typeText": "string"
  },
  {
    "name": "range",
    "type": "number",
    "required": false,
    "description": "Visible range on each side of the mid price, as a fraction of the mid; fits the book by default",
    "typeText": "number"
  },
  {
    "name": "book",
    "type": "OrderBookSnapshot",
    "required": false,
    "description": "Book to draw, applied when the object changes (stream updates through the handle's `applyDeltas`)",
    "typeText": "OrderBookSnapshot"
  },
  {
    "name": "rangeLimits",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Smallest and largest `range` reachable by zooming (default `[0.0005, 0.5]`)",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "amount",
    "type": "\"base\" | \"quote\"",
    "required": false,
    "description": "Cumulative amount in the base asset or the quote notional (default `base`)",
    "typeText": "\"base\" | \"quote\""
  },
  {
    "name": "fillOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the areas, 0-1 (default 0.28)",
    "typeText": "number"
  },
  {
    "name": "priceLines",
    "type": "readonly DepthChartPriceLine[]",
    "required": false,
    "description": "Reference lines at prices (an order, a liquidation)",
    "typeText": "readonly DepthChartPriceLine[]"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of the bids / buys (any CSS color); from `colorConvention` by default",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of the asks / sells",
    "typeText": "string"
  },
  {
    "name": "colorConvention",
    "type": "OrderBookColorConvention",
    "required": false,
    "description": "`red-up` swaps the default colors (default `green-up`)",
    "typeText": "OrderBookColorConvention"
  },
  {
    "name": "pricePrecision",
    "type": "number",
    "required": false,
    "description": "Decimals of the prices; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "sizePrecision",
    "type": "number",
    "required": false,
    "description": "Decimals of the sizes; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "formatPrice",
    "type": "((price: number) => string)",
    "required": false,
    "description": "Formats the prices; overrides `pricePrecision`",
    "typeText": "((price: number) => string)"
  },
  {
    "name": "formatSize",
    "type": "((size: number) => string)",
    "required": false,
    "description": "Formats the sizes; overrides `sizePrecision`",
    "typeText": "((size: number) => string)"
  },
  {
    "name": "fontFamily",
    "type": "string",
    "required": false,
    "description": "Font family of the texts (default: the theme font)",
    "typeText": "string"
  },
  {
    "name": "fontSize",
    "type": "number",
    "required": false,
    "description": "Font size of the texts, in pixels (default 12)",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: DepthChartHoverEvent | null]",
    "typeText": "[event: DepthChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "DepthChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: DepthChartHoverEvent]",
    "typeText": "[event: DepthChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "DepthChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rangeChange",
    "type": "[range: number]",
    "typeText": "[range: number]",
    "parameters": [
      {
        "name": "range",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: book

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/depth-chart/vue/book.vue

```vue
<script setup lang="ts">
// <DepthChart>: the cumulative bids and asks of a book (`book`, levels as
// `[price, size]` pairs or columns); @hover reports the hovered price and
// the cumulative amount.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  DepthChart,
  type DepthChartHoverEvent,
} from "minerva-design/vue/charts";

const TEXT = {
  en: { price: "Price", total: "Total", hint: "Hover the curves" },
  zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
  ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
  fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
};

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

const book = { bids: side(-1, 1), asks: side(1, 2) };
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const hovered = ref<DepthChartHoverEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <DepthChart :book="book" @hover="hovered = $event" />
    <output aria-live="polite">
      {{
        hovered
          ? `${text.price} ${hovered.price} · ${text.total} ${hovered.amount}`
          : text.hint
      }}
    </output>
  </div>
</template>

```

## Example: live

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/depth-chart/vue/live.vue

```vue
<script setup lang="ts">
// Streaming updates: the handle's `applyDeltas` changes a few levels
// (drawn once per frame, eased); the book is not passed again.
import { onBeforeUnmount, onMounted, ref } from "vue";
import { DepthChart, type DepthChartHandle } from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

const book = { bids: side(-1, 3), asks: side(1, 4) };
const chart = ref<DepthChartHandle>();
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    chart.value?.applyDeltas(delta(tick));
  }, 400);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <DepthChart ref="chart" :book="book" :range="0.012" :height="280" />
</template>

```
