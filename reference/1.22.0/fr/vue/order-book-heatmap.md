# Carte de chaleur du carnet

Carte de chaleur de liquidité à la Bookmap : quantité au repos par temps et prix dessinée par le GPU, lignes du meilleur achat et de la meilleure vente, transactions en bulles proportionnelles au volume, profil du carnet actuel, zoom, déplacement et lecture au réticule. Les flux ajoutent une colonne par intervalle dans une fenêtre glissante.

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

### Comment la lire

La heatmap est un enregistrement du carnet d'ordres : chaque colonne est un instantané du carnet à un moment, de gauche à droite, le présent au bord droit.

L'axe horizontal est le temps (le plus récent à droite), l'axe vertical le prix. Survolez un point : le réticule lit la quantité en attente à ce prix et à cet instant.

La couleur d'une cellule est la quantité en attente à ce prix à cet instant : sombre signifie presque rien, plus clair (bleu → cyan → jaune → blanc) signifie davantage. La légende en haut à gauche donne la plage de quantités et l'unité des couleurs.

Les lignes horizontales claires sont de gros ordres qui restent dans le carnet (murs). Là où une ligne s'arrête, l'ordre a été retiré ou exécuté : si la ligne de prix atteint la fin du mur, il a été exécuté.

Les lignes rouge et verte qui suivent le prix sont la meilleure offre et la meilleure demande, l'écart entre elles est le spread. Sur l'axe des prix, les étiquettes pleines rouge et verte sont la meilleure offre et la meilleure demande actuelles, l'étiquette au contour est la dernière transaction.

Les points sont les transactions : vert pour les achats agressifs (qui prennent les offres), rouge pour les ventes agressives (qui frappent les demandes), leur aire croît avec le volume de la colonne, les grosses bulles sont donc de grosses transactions. colorConvention="red-up" inverse les deux couleurs.

Les barres à droite sont le carnet actuel : les offres en rouge au-dessus, les demandes en vert au-dessous, plus la barre est longue plus la quantité est grande ; l'échelle en dessous est la quantité.

#### Ce qu'il faut repérer

Support et résistance : le prix touche plusieurs fois une ligne claire et repart, le gros ordre l'absorbe.

Ordres retirés (spoofing) : une ligne claire disparaît quand le prix approche sans aucune bulle de transaction, l'ordre a été annulé, pas exécuté.

Balayages : une rafale de grosses bulles traverse plusieurs prix, la ligne de prix saute et la liquidité sur son passage s'assombrit.

Liquidité faible : une grande zone sombre près du prix signifie peu d'ordres en attente, le prix peut la traverser rapidement.

Bougies : fournissez de vraies données OHLC sur les mêmes axes de temps en millisecondes et de prix. Les périodes absentes restent vides ; aucun cours exécuté n’est inventé à partir du carnet. La ligne du dernier prix utilise la dernière transaction fournie ou une clôture de bougie plus récente.

Navigation historique : zoom et déplacement arrêtent le suivi. Sélectionnez une plage conservée dans le navigateur ; réinitialiser revient au marché courant. getView / setView et viewChange partagent le même modèle de vue.

Filtre d’intensité : intensityRange sélectionne un intervalle 0–1 après la correspondance des couleurs. Les quantités brutes, les valeurs des infobulles et l’échelle automatique restent identiques.

Sens des données

Ce composant affiche la liquidité en attente et les bougies exécutées fournies. Les exemples utilisent un moteur de simulation reproductible. Une carte de liquidations exige des données de liquidation distinctes ; la taille des ordres ne constitue pas une taille liquidée.

Carte de liquidité BTC/USDT

Moteur : {{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

Suit le marché

Vue libre (zoomée ou déplacée)

Suivre le marché

Échelle de couleurs

Logarithmique

Racine carrée

Linéaire

Contraste

×{{value}}

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Colonne survolée : {{buys}} BTC achetés, {{sells}} BTC vendus

Survolez une colonne pour lire son volume échangé.

Hauteur de ligne

Étendue de prix

{{value}} USDT

Auto

Ajuster au carnet

{{time}} · {{price}} · {{size}} BTC {{side}} · {{buys}} BTC achetés, {{sells}} BTC vendus

{{low}} – {{high}}

côté achat

côté vente

dans l'écart

Survolez une cellule pour l'inspecter.

Fenêtre de temps

Flux en direct

Effacer l'historique

En pause à {{time}}.

Reprise à {{time}}.

Historique effacé à {{time}}.

{{window}} affichées sur {{history}} conservées.

BTC/USDT

Dernier {{value}}

Écart {{value}}

{{value}} transactions sur le ruban

Carnet d'ordres BTC/USDT

Transactions BTC/USDT

Perpétuel BTC-USD

1 contrat = {{value}} BTC

Financement {{rate}}

Financement {{rate}} à {{time}}, dans {{countdown}}

contrats

En carnet

Achats preneurs

Ventes preneuses

Carte de chaleur de liquidité du perpétuel BTC-USD

{{price}} : {{contracts}} contrats en carnet (≈ {{notional}})

Survolez la carte pour lire les contrats en carnet et leur valeur.

MARCHÉ SIMULÉ

Bougies d’exécution

Chaque bougie de 2 secondes agrège les exécutions du moteur de simulation déterministe. Les périodes sans exécution restent vides ; les ordres au repos ne créent pas de bougies.

Plage d’intensité visible

Filtre l’intensité normalisée des couleurs de la liquidité au repos. Seule la visibilité change, pas les quantités ni le volume exécuté.

Historique des exécutions conservé

Déplacez les poignées pour consulter l’historique conservé. Suivre le marché rétablit la dernière heure et le centrage automatique du prix.

TERMINAL DE LIQUIDITÉ

Dernière exécution

Profondeur acheteuse

Profondeur vendeuse

Déséquilibre du carnet

Plus grand mur acheteur

Plus grand mur vendeur

Palette

Océan

Braise

Réinitialiser la vue

CARNET ACTUEL

Simulation déterministe, sans flux de bourse externe. Les six indicateurs, les bougies et le carnet partagent le même moteur. Les indicateurs sont actualisés chaque seconde, indépendamment du flux du carnet.

Liquidité simulée avec bougies d’exécution

Liquidité simulée avec filtre d’intensité

Historique navigable de liquidité simulée

Terminal de liquidité BTC USDT simulé

Carnet BTC USDT simulé actuel

## OrderBookHeatmap

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "OrderBookHeatmap"
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
    "description": "Color legend with its size range at the top left (default `true`)",
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
    "name": "interactive",
    "type": "boolean",
    "required": false,
    "description": "Zoom and pan (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "candles",
    "type": "boolean",
    "required": false,
    "description": "Candle overlay (default true when bars are supplied)",
    "typeText": "boolean"
  },
  {
    "name": "lastPriceLine",
    "type": "boolean",
    "required": false,
    "description": "Last close price line (default true)",
    "typeText": "boolean"
  },
  {
    "name": "bubbles",
    "type": "boolean",
    "required": false,
    "description": "Trades as bubbles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "bestLines",
    "type": "boolean",
    "required": false,
    "description": "Best bid / ask lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "profile",
    "type": "boolean",
    "required": false,
    "description": "Size profile of the current book at the right (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<OrderBookHeatmapLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<OrderBookHeatmapLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
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
    "name": "colorScale",
    "type": "OrderBookHeatmapScale",
    "required": false,
    "description": "Scale of the sizes to the colors (default `log`)",
    "typeText": "OrderBookHeatmapScale"
  },
  {
    "name": "bars",
    "type": "TradingBarsInput",
    "required": false,
    "description": "Candle history; property only, applied through setBars",
    "typeText": "TradingBarsInput"
  },
  {
    "name": "maxSize",
    "type": "number",
    "required": false,
    "description": "Size drawn with the last color; follows the data by default",
    "typeText": "number"
  },
  {
    "name": "colors",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors from no liquidity to `maxSize` (any CSS colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "book",
    "type": "OrderBookSnapshot",
    "required": false,
    "description": "Book, applied when the object changes (stream updates through the handle's `applyDeltas`)",
    "typeText": "OrderBookSnapshot"
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
    "name": "trades",
    "type": "readonly MarketTrade[]",
    "required": false,
    "description": "Trades; when the array grows, only the appended ones are added",
    "typeText": "readonly MarketTrade[]"
  },
  {
    "name": "intensityRange",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Normalized liquidity intensity bounds, 0..1",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "maxColumns",
    "type": "number",
    "required": false,
    "description": "Maximum retained columns (default 6000)",
    "typeText": "number"
  },
  {
    "name": "maxBars",
    "type": "number",
    "required": false,
    "description": "Maximum retained candles (default 20000)",
    "typeText": "number"
  },
  {
    "name": "tickSize",
    "type": "number",
    "required": false,
    "description": "Price step of the rows; detected from the book by default",
    "typeText": "number"
  },
  {
    "name": "interval",
    "type": "number",
    "required": false,
    "description": "Duration of a column, in ms (default 100)",
    "typeText": "number"
  },
  {
    "name": "window",
    "type": "number",
    "required": false,
    "description": "Time shown, in ms (default 60000)",
    "typeText": "number"
  },
  {
    "name": "history",
    "type": "number",
    "required": false,
    "description": "Time kept for panning back, in ms (default 300000)",
    "typeText": "number"
  },
  {
    "name": "depth",
    "type": "number",
    "required": false,
    "description": "Price levels kept on each side (default 160)",
    "typeText": "number"
  },
  {
    "name": "priceSpan",
    "type": "number",
    "required": false,
    "description": "Price range shown around the mid; from `depth` by default",
    "typeText": "number"
  },
  {
    "name": "contrast",
    "type": "number",
    "required": false,
    "description": "Contrast of the colors (default 1)",
    "typeText": "number"
  },
  {
    "name": "sizeUnit",
    "type": "string",
    "required": false,
    "description": "Unit after the sizes of the legend and tooltip, e.g. \"BTC\"",
    "typeText": "string"
  },
  {
    "name": "bubbleSize",
    "type": "number",
    "required": false,
    "description": "Diameter of the largest bubble, in pixels (default 28)",
    "typeText": "number"
  },
  {
    "name": "bubbleVolume",
    "type": "number",
    "required": false,
    "description": "Trade volume of the largest bubble; follows the data by default",
    "typeText": "number"
  },
  {
    "name": "timeZone",
    "type": "ChartTimeZone",
    "required": false,
    "description": "Clock of the time axis and the tooltip: the local time or UTC, the clock of most exchanges (default `local`)",
    "typeText": "ChartTimeZone"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: OrderBookHeatmapHoverEvent | null]",
    "typeText": "[event: OrderBookHeatmapHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "OrderBookHeatmapHoverEvent | null",
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
  },
  {
    "name": "followChange",
    "type": "[follow: boolean]",
    "typeText": "[follow: boolean]",
    "parameters": [
      {
        "name": "follow",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "viewChange",
    "type": "[data: OrderBookHeatmapViewData]",
    "typeText": "[data: OrderBookHeatmapViewData]",
    "parameters": [
      {
        "name": "data",
        "position": 0,
        "typeText": "OrderBookHeatmapViewData",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: candles-navigation

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/vue/candles-navigation.vue

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Button, Slider, useI18n, type SliderValue } from "minerva-design/vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapViewData,
} from "minerva-design/vue/charts";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

const { language } = useI18n();
const text = computed(() => getFrameworkLabels(language.value));
const history = createFrameworkHistory();
const heatmap = ref<OrderBookHeatmapHandle>();
const minimum = ref<SliderValue>(0);
const intensity = computed<readonly [number, number]>(() => [
  Number(minimum.value) / 100,
  1,
]);
const view = ref<OrderBookHeatmapViewData | null>(null);
function show(seconds: number) {
  heatmap.value?.setView({
    time: [history.end - seconds * 1000, history.end],
    price: [98, 102],
  });
}
onMounted(() => {
  for (const book of history.books) heatmap.value?.setBook(book);
  heatmap.value?.addTrades(history.trades);
  heatmap.value?.setBars(history.bars);
  show(30);
});
</script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <p>{{ text.source }}</p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Button size="small" variant="outline" @click="show(10)">{{
        text.latest
      }}</Button>
      <Button size="small" variant="outline" @click="show(30)">{{
        text.full
      }}</Button>
      <Button size="small" @click="heatmap?.resetView()">{{
        text.follow
      }}</Button>
    </div>
    <Slider
      v-model="minimum"
      :aria-label="text.minimum"
      :min="0"
      :max="90"
      :step="5"
      show-value
      style="max-width: 320px"
    />
    <OrderBookHeatmap
      ref="heatmap"
      :height="400"
      :interval="250"
      :window="30000"
      :history="60000"
      :intensity-range="intensity"
      :max-bars="30"
      :max-columns="240"
      @view-change="view = $event"
    />
    <output aria-live="polite"
      >{{ view?.view.follow ? text.following : text.manual }} ·
      {{ text.minimum }} {{ minimum }}% ·
      {{
        view ? Math.round((view.view.time[1] - view.view.time[0]) / 1000) : 30
      }}
      {{ text.visible }}</output
    >
  </div>
</template>

```

### apps/docs/src/docs/pages/order-book-heatmap/framework-history.ts

```tsx
import type {
  MarketTrade,
  OrderBookSnapshot,
  TradingBar,
} from "minerva-design/charts/core";

/** Finite simulated books and executions; candles are explicitly supplied from executions. */
export function createFrameworkHistory(now = Date.now()) {
  const end = Math.floor(now / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(
      100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12,
    );
    const size = 1 + ((i * 7) % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) =>
      Array.from(
        { length: 36 },
        (_, level) =>
          [
            round(price + sign * (level + 1) * 0.05),
            2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0),
          ] as [number, number],
      );
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0)
      bars.push({
        time: start + bucket * 1000,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: size,
      });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price);
      bar.low = Math.min(bar.low, price);
      bar.close = price;
      bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
}

/** UI copy shared by the native framework examples, keyed by configured language. */
export const frameworkHeatmapLabels = {
  en: {
    source:
      "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    latest: "Latest 10s",
    full: "Full 30s",
    follow: "Follow market",
    following: "Following market",
    manual: "Manual view",
    minimum: "Minimum liquidity intensity (%)",
    visible: "s visible",
  },
  zh: {
    source: "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    latest: "最近 10 秒",
    full: "完整 30 秒",
    follow: "跟随行情",
    following: "正在跟随行情",
    manual: "手动视图",
    minimum: "最低流动性强度（%）",
    visible: "秒可见",
  },
  ja: {
    source:
      "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    latest: "直近 10 秒",
    full: "全 30 秒",
    follow: "相場に追従",
    following: "相場に追従中",
    manual: "手動表示",
    minimum: "流動性強度の下限（%）",
    visible: "秒を表示",
  },
  fr: {
    source:
      "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    latest: "10 dernières s",
    full: "30 s complètes",
    follow: "Suivre le marché",
    following: "Suivi du marché",
    manual: "Vue manuelle",
    minimum: "Intensité minimale de liquidité (%)",
    visible: "s visibles",
  },
};

export function getFrameworkLabels(locale: string) {
  const language = locale
    .toLowerCase()
    .split(/[-_]/)[0] as keyof typeof frameworkHeatmapLabels;
  return frameworkHeatmapLabels[language] ?? frameworkHeatmapLabels.en;
}

```

## Example: liquidity

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/vue/liquidity.vue

```vue
<script setup lang="ts">
// <OrderBookHeatmap>: resting size over time and price, drawn by the GPU;
// the book (handle's `setBook`, with its time) closes a column, trades
// (`addTrades`) are bubbles sized by volume. Zoom or pan to stop following.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

const heatmap = ref<OrderBookHeatmapHandle>();
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.value?.setBook(book);
    heatmap.value?.addTrades(trade);
  }, 200);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <OrderBookHeatmap ref="heatmap" />
</template>

```

## Example: red-up

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/vue/red-up.vue

```vue
<script setup lang="ts">
// `color-convention="red-up"` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

const heatmap = ref<OrderBookHeatmapHandle>();
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.value?.setBook(book);
    heatmap.value?.addTrades(trade);
  }, 200);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <OrderBookHeatmap
    ref="heatmap"
    color-convention="red-up"
    color-scale="sqrt"
    :profile="false"
  />
</template>

```
