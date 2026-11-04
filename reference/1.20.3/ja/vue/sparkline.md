# スパークライン

軸も凡例もない、文字ほどの大きさの小さなチャート。KPI カードや表のセル、リストの中で数値の横に推移の形を示します。ホバーすると値を読み取れます。

Package: minerva-design@1.20.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

注文

週ごとの注文、{{variant}}

売上

アクティブユーザー

登録数

p95 レイテンシ

{{metric}}（過去 30 日）

サービス

API ゲートウェイ

認証

検索

決済

通知

リクエスト / 分

p95 レイテンシ（30 日）

{{service}}の過去 30 日の p95 レイテンシ

本日

変化

サービスのレイテンシ

銘柄

アクメ・コーポレーション

ノヴァ・バイオテック

オービット・エアロスペース

カイト・ロボティクス

ルーマ・エナジー

{{symbol}} の本日の株価

株価

ウォッチリスト

過去 14 日間の訪問数：

訪問数

過去 14 日間の訪問数

7 日目のデプロイ後にエラーが急増し、その後元に戻りました：

エラー

過去 14 日間の日別エラー数

この 2 週間の午後の気温：

気温

過去 14 日間の午後の気温

CPU

{{server}} の CPU 使用率

アラート

正常

デイリーアクティブユーザー

最新: {{date}}

{{date}} · 9 月 1 日から {{change}}

9 月 1 日から 10 月 31 日までのデイリーアクティブユーザー

{{value}} 歩

目標の {{value}}

{{days}} 日中 {{reached}} 日で目標の {{goal}} 歩を達成

歩数

4 週間の 1 日あたりの歩数と 1 日の目標

レイキャビク

モントリオール

東京

カイロ

シンガポール

シドニー

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} の月ごとの平均最高気温

期間

7 日

30 日

90 日

後半と前半の比較

前の期間との比較

直近 {{period}} の 1 日あたりの売上

## Sparkline

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Sparkline"
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
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "color",
    "type": "string",
    "required": false,
    "description": "Color (any CSS color); the first palette color by default",
    "typeText": "string"
  },
  {
    "name": "type",
    "type": "\"line\" | \"bar\" | \"area\"",
    "required": false,
    "description": "How the values are drawn (default `line`)",
    "typeText": "\"line\" | \"bar\" | \"area\""
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "curve",
    "type": "ChartCurve",
    "required": false,
    "description": "Shape of the line (default `smooth`)",
    "typeText": "ChartCurve"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer (default `auto`)",
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
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors (defaults to the `--chart-series-1..8` CSS variables)",
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
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, accessible name); the page language by default",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name shown in the tooltip",
    "typeText": "string"
  },
  {
    "name": "data",
    "type": "ChartSeriesData",
    "required": true,
    "description": "Values (or `[x, y]` pairs, typed arrays, ...)",
    "typeText": "ChartSeriesData"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the value in the tooltip",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "reference",
    "type": "number",
    "required": false,
    "description": "Draws a reference line at this value (e.g. a target or the average)",
    "typeText": "number"
  }
]
```

### events

```json
[
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: kpi

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/vue/kpi.vue

```vue
<script setup lang="ts">
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Sparkline } from "minerva-design/vue/charts";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    "
  >
    <div style="display: grid; gap: 4px">
      <span>{{ text.orders }}</span>
      <strong>1,284</strong>
      <Sparkline
        :data="[32, 41, 38, 52, 49, 61, 58, 70, 66, 74]"
        :name="text.orders"
      />
    </div>
    <div style="display: grid; gap: 4px">
      <span>{{ text.revenue }}</span>
      <strong>€48.2k</strong>
      <Sparkline
        type="area"
        :data="[3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9]"
        :name="text.revenue"
      />
    </div>
    <div style="display: grid; gap: 4px">
      <span>{{ text.signups }}</span>
      <strong>312</strong>
      <Sparkline
        type="bar"
        :data="[12, 18, 9, 22, 30, 25, 19, 28, 33, 31]"
        :name="text.signups"
      />
    </div>
  </div>
</template>

```

## Example: reference

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/vue/reference.vue

```vue
<script setup lang="ts">
// `reference` draws a dashed target line; @hover reports the value under the
// pointer (null when it leaves).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { Sparkline, type ChartHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

const data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const hovered = ref<number | null>(null);
const onHover = (event: ChartHoverEvent | null) => {
  hovered.value = event?.items[0]?.y ?? null;
};
const format = (ms: number) => `${ms} ms`;
</script>

<template>
  <div style="display: grid; gap: 8px">
    <Sparkline
      :data="data"
      :reference="200"
      :name="text.latency"
      :format="format"
      :height="64"
      @hover="onHover"
    />
    <output aria-live="polite">{{
      hovered === null
        ? text.hint
        : `${text.latency}: ${hovered} ms (${text.target})`
    }}</output>
  </div>
</template>

```
