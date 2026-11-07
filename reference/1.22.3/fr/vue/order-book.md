# Carnet d'ordres

Une échelle de prix dessinée sur canvas : ventes au-dessus de la ligne d'écart, achats en dessous, avec barres de profondeur, regroupement des prix, clignotement des niveaux modifiés, mise en avant des gros ordres et résumé cumulé au survol. Des centaines de mises à jour par seconde ne coûtent qu'un dessin par image.

Package: minerva-design@1.22.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Carnet d'ordres BTC/USDT

### Carnet d'ordres

BTC/USDT

Prix (USDT)

Quantité (BTC)

Cumul (BTC)

Fréquence

{{value}} / s

{{updates}} messages/s · {{levels}} niveaux modifiés/s

Pas de prix

Barres de profondeur

Cumulées

Par niveau

Seuil des gros ordres

≥ {{value}} BTC

Achat {{price}} : {{size}} BTC, {{sum}} BTC cumulés jusqu'ici

Vente {{price}} : {{size}} BTC, {{sum}} BTC cumulés jusqu'ici

Cliquez sur un niveau pour choisir son prix.

Côtés

Les deux

Achats

Ventes

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

{{value}} depuis l'ouverture

Prix limite : {{price}}

Limite

Profondeur

Profondeur BTC/USDT

Transactions

Transactions BTC/USDT

Marché

Crypto · BTC/USDT

Prix (USDT)

Taille (BTC)

Total (BTC)

Carnet d'ordres BTC/USDT

Action · AAPL

Prix (USD)

Actions

Total

Carnet d'ordres AAPL

Change · EUR/USD

Cours

Taille (EUR)

Total (EUR)

Carnet d'ordres EUR/USD

Contrats à terme · ES

Prix (pts)

Contrats

Total

Carnet d'ordres du contrat E-mini S&P 500

{{value}} pips

{{value}} ¢

{{value}} ticks

{{value}} USDT

Pas de cotation {{tick}} · écart {{spread}} · mis en évidence dès {{large}}

Murs

Nouveau

Retiré

Exécuté

Murs ≥ {{size}} BTC : {{resting}} en carnet, {{filled}} exécutés, {{pulled}} retirés ({{ratio}} retirés)

Recherche de murs dans le carnet…

Mur acheteur {{price}} : {{size}} BTC

Mur vendeur {{price}} : {{size}} BTC

après {{value}}

Ordre à cours limité

Sens

Acheter

Vendre

Prix limite (USDT)

Quantité (BTC)

Saisissez un prix et une quantité, ou cliquez sur un niveau.

{{filled}} BTC exécutés aussitôt, prix moyen {{average}}.

{{filled}} BTC exécutés aussitôt (prix moyen {{average}}), {{rest}} BTC en attente à {{price}}.

En attente à {{price}} derrière {{ahead}} BTC.

{{side}}

Ordre placé : {{side}} {{size}} BTC à {{price}}.

Ordre à {{price}} annulé.

{{side}} {{size}} @ {{price}}

Aucun ordre ouvert.

Annuler l'ordre

## OrderBook

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "OrderBook"
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
    "name": "tooltip",
    "type": "boolean",
    "required": false,
    "description": "Hover summary of the cumulative levels (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "header",
    "type": "boolean",
    "required": false,
    "description": "Column headers (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "lastPrice",
    "type": "number | null",
    "required": false,
    "description": "Price of the spread row, colored by its last move; the mid price when omitted",
    "typeText": "number | null"
  },
  {
    "name": "flash",
    "type": "boolean",
    "required": false,
    "description": "Flashes the changed sizes (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "spreadRow",
    "type": "boolean",
    "required": false,
    "description": "Spread row between the sides (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "imbalance",
    "type": "boolean",
    "required": false,
    "description": "Bid / ask imbalance bar (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "columns",
    "type": "readonly (\"size\" | \"price\" | \"total\")[]",
    "required": false,
    "description": "Columns, in order (default `[\"price\", \"size\", \"total\"]`)",
    "typeText": "readonly (\"size\" | \"price\" | \"total\")[]"
  },
  {
    "name": "labels",
    "type": "Partial<OrderBookLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<OrderBookLabels>"
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
    "name": "mode",
    "type": "OrderBookMode",
    "required": false,
    "description": "Sides shown (default `both`)",
    "typeText": "OrderBookMode"
  },
  {
    "name": "book",
    "type": "OrderBookSnapshot",
    "required": false,
    "description": "Book to draw, applied when the object changes (stream updates through the handle's `applyDeltas`)",
    "typeText": "OrderBookSnapshot"
  },
  {
    "name": "total",
    "type": "\"base\" | \"quote\"",
    "required": false,
    "description": "Total column in the base asset or the quote notional (default `base`)",
    "typeText": "\"base\" | \"quote\""
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
  },
  {
    "name": "rows",
    "type": "number",
    "required": false,
    "description": "Rows per side; fills the height by default",
    "typeText": "number"
  },
  {
    "name": "grouping",
    "type": "number",
    "required": false,
    "description": "Price step the levels are grouped by (default 0: none)",
    "typeText": "number"
  },
  {
    "name": "rowHeight",
    "type": "number",
    "required": false,
    "description": "Height of a row, in pixels (default 20)",
    "typeText": "number"
  },
  {
    "name": "depthBars",
    "type": "\"none\" | \"cumulative\" | \"level\"",
    "required": false,
    "description": "Depth bars behind the rows (default `cumulative`)",
    "typeText": "\"none\" | \"cumulative\" | \"level\""
  },
  {
    "name": "flashDuration",
    "type": "number",
    "required": false,
    "description": "Duration of a flash, in ms (default 450)",
    "typeText": "number"
  },
  {
    "name": "largeOrderThreshold",
    "type": "number",
    "required": false,
    "description": "Highlights the levels at or above this size",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[level: OrderBookLevelEvent | null]",
    "typeText": "[level: OrderBookLevelEvent | null]",
    "parameters": [
      {
        "name": "level",
        "position": 0,
        "typeText": "OrderBookLevelEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "levelClick",
    "type": "[level: OrderBookLevelEvent]",
    "typeText": "[level: OrderBookLevelEvent]",
    "parameters": [
      {
        "name": "level",
        "position": 0,
        "typeText": "OrderBookLevelEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ladder

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/vue/ladder.vue

```vue
<script setup lang="ts">
// <OrderBook>: asks above the spread row, bids below, depth bars and a
// large order highlight; @level-click reports the clicked row (e.g. to fill
// a price in an order form).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { OrderBook, type OrderBookLevelEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
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
const clicked = ref<OrderBookLevelEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <OrderBook
      :book="book"
      :last-price="100.02"
      :large-order-threshold="50"
      :height="380"
      @level-click="clicked = $event"
    />
    <output aria-live="polite">
      {{
        clicked
          ? `${text.price} ${clicked.price} · ${text.size} ${clicked.size}`
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

### apps/docs/src/docs/pages/order-book/vue/live.vue

```vue
<script setup lang="ts">
// A live ladder: the handle's `applyDeltas` changes levels (the changed
// sizes flash), `last-price` moves the spread row (colored by its last
// move); levels grouped by 0.1 (`grouping`).
import { onBeforeUnmount, onMounted, ref } from "vue";
import { OrderBook, type OrderBookHandle } from "minerva-design/vue/charts";

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
const ladder = ref<OrderBookHandle>();
const lastPrice = ref(100);
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    ladder.value?.applyDeltas(delta(tick));
    lastPrice.value = round(100 + Math.sin(tick / 5) / 20);
  }, 400);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <OrderBook
    ref="ladder"
    :book="book"
    :last-price="lastPrice"
    :grouping="0.1"
    :height="380"
  />
</template>

```
