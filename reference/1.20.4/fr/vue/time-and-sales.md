# Ruban des transactions

Un ruban des transactions : les plus récentes en haut, qui glissent et clignotent, les grosses en gras et teintées, les balayages d'une même milliseconde fusionnés, des filtres de taille et une pause au survol. Des anneaux de tableaux typés gardent 200 000 transactions ; seules les lignes visibles sont dessinées.

Package: minerva-design@1.20.4

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Transactions BTC/USDT

Achat de {{size}} BTC à {{price}}

Vente de {{size}} BTC à {{price}}

En pause pendant le survol : éloignez le pointeur (ou cliquez sur le badge) pour reprendre.

Survolez le ruban pour le mettre en pause, cliquez sur une ligne pour choisir une transaction.

Seuil des grosses transactions

≥ {{value}} BTC

Quantité minimale

Toutes

Fusionner les balayages d'une même milliseconde

Colorer les prix par tick

{{value}} lignes conservées

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Ajouter {{value}} transactions

{{rows}} transactions, dernier lot en {{ms}} ms

Fenêtre glissante

{{value}} dernières

VWAP

Part achetée

Acheté

Vendu

{{value}} BTC

Transactions / s

Plus grosse transaction

Achat {{size}} à {{price}}

Vente {{size}} à {{price}}

Les acheteurs prennent l'offre.

Les vendeurs frappent la demande.

Les flux acheteurs et vendeurs s'équilibrent.

En attente de transactions…

Fuseau horaire

Local

UTC

New York

Tokyo

Heure ({{zone}})

Blocs ≥ {{value}} BTC

Effacer

{{value}} blocs depuis le début

En attente d'un bloc…

Achat

Vente

{{time}} · {{size}} BTC à {{price}} ≈ {{notional}}

{{value}} transactions

{{count}} transactions · {{size}} BTC

Achats

Ventes

Achats BTC/USDT

Ventes BTC/USDT

Flux net : {{value}} BTC (acheté − vendu)

## TimeAndSales

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TimeAndSales"
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
    "name": "animate",
    "type": "boolean",
    "required": false,
    "description": "Slides the new rows in (default `true`)",
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
    "name": "aggregate",
    "type": "boolean",
    "required": false,
    "description": "Merges the consecutive trades of the same side and price (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "pauseOnHover",
    "type": "boolean",
    "required": false,
    "description": "Pauses the tape while hovered (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "milliseconds",
    "type": "boolean",
    "required": false,
    "description": "Milliseconds in the times (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "columns",
    "type": "readonly TimeAndSalesColumn[]",
    "required": false,
    "description": "Columns, in order (default `[\"time\", \"price\", \"size\"]`)",
    "typeText": "readonly TimeAndSalesColumn[]"
  },
  {
    "name": "labels",
    "type": "Partial<TimeAndSalesLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<TimeAndSalesLabels>"
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
    "name": "minSize",
    "type": "number",
    "required": false,
    "description": "Hides the trades below this size (default 0)",
    "typeText": "number"
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
    "name": "rowHeight",
    "type": "number",
    "required": false,
    "description": "Height of a row, in pixels (default 20)",
    "typeText": "number"
  },
  {
    "name": "trades",
    "type": "readonly MarketTrade[]",
    "required": false,
    "description": "Trades, oldest first; when the array grows, only the appended ones are added (other changes replace the tape)",
    "typeText": "readonly MarketTrade[]"
  },
  {
    "name": "timeZone",
    "type": "ChartTimeZone",
    "required": false,
    "description": "Clock of the default time format: the local time or UTC, the clock of most exchanges (default `local`)",
    "typeText": "ChartTimeZone"
  },
  {
    "name": "capacity",
    "type": "number",
    "required": false,
    "description": "Trades kept (default 200000)",
    "typeText": "number"
  },
  {
    "name": "largeTradeThreshold",
    "type": "number",
    "required": false,
    "description": "Highlights the trades at or above this size",
    "typeText": "number"
  },
  {
    "name": "priceColor",
    "type": "\"side\" | \"tick\"",
    "required": false,
    "description": "Price color: the side of the trade or the tick direction (default `side`)",
    "typeText": "\"side\" | \"tick\""
  },
  {
    "name": "formatTime",
    "type": "((time: number) => string)",
    "required": false,
    "description": "Formats the times",
    "typeText": "((time: number) => string)"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[row: TimeAndSalesRowEvent | null]",
    "typeText": "[row: TimeAndSalesRowEvent | null]",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pause",
    "type": "[paused: boolean]",
    "typeText": "[paused: boolean]",
    "parameters": [
      {
        "name": "paused",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "tradeClick",
    "type": "[row: TimeAndSalesRowEvent]",
    "typeText": "[row: TimeAndSalesRowEvent]",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: large-trades

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/vue/large-trades.vue

```vue
<script setup lang="ts">
// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (`aggregate`), small ones hidden (`min-size`), large ones
// highlighted; @trade-click reports the clicked row.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  TimeAndSales,
  type TimeAndSalesRowEvent,
} from "minerva-design/vue/charts";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

const trades = Array.from({ length: 2000 }, (_, i) => trade(i));
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const clicked = ref<TimeAndSalesRowEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <TimeAndSales
      :trades="trades"
      aggregate
      :min-size="2"
      :large-trade-threshold="25"
      :columns="['time', 'side', 'price', 'size']"
      :height="300"
      @trade-click="clicked = $event"
    />
    <output aria-live="polite">
      {{
        clicked
          ? `${clicked.trade.price} × ${clicked.trade.size} ${text.size} (${clicked.count})`
          : text.hint
      }}
    </output>
  </div>
</template>

```

## Example: tape

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/vue/tape.vue

```vue
<script setup lang="ts">
// <TimeAndSales>: the newest trade on top (the handle's `addTrades`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
} from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

const first = Array.from({ length: 40 }, (_, i) => trade(i));
const tape = ref<TimeAndSalesHandle>();
let tick = 40;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    tape.value?.addTrades(trade(tick));
  }, 250);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <TimeAndSales
    ref="tape"
    :trades="first"
    :large-trade-threshold="20"
    :height="320"
  />
</template>

```
