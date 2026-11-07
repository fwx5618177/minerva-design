# 範囲面グラフ

下端と上端の間を塗る帯：信頼区間、予測、最小・最大の範囲、パーセンタイルのファンチャートに。

Package: minerva-design@1.22.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

95% 区間

80% 区間

実績

予測

注文数

今日

月間注文数と 12 か月の予測、その信頼区間

最低 – 最高

平年値

1 年間の日ごとの最低・最高気温

5 – 95 パーセンタイル

25 – 75 パーセンタイル

中央値

1 日の応答時間のパーセンタイル

安値 – 高値

終値

6 か月間の日ごとの値幅と終値

予測値 ± {{k}}σ

実測値

異常

感度

{{k}}σ の帯

1 分あたりのリクエスト数

1 週間の 1 分あたり API リクエスト数。予測の帯とその外側の異常を表示

帯の外にある点はありません。

異常：{{n}} 件。最新は {{latest}}。

買値 – 売値

仲値

一時停止

再開

買値 {{bid}} ・ 売値 {{ask}}

スプレッド {{value}} bp

通貨ペアの直近 1 分間のリアルタイムの買値と売値、および仲値

低排出（SSP1-2.6）

低排出、可能性の高い範囲

非常に高い排出（SSP5-8.5）

非常に高い排出、可能性の高い範囲

観測値

{{value}} の上限

1850〜1900 年比の気温上昇

1950 年以降に観測された地球温暖化と、低排出および非常に高い排出シナリオでの 2100 年までの予測

低排出では中央値が {{low}} 年ごろに {{lowLimit}} を超え、{{peak}} で横ばいになります。非常に高い排出では {{high}} 年ごろに {{highLimit}} を超えます。

{{level}} 信頼区間

リフト

差なし

有意

信頼水準

テスト日数

A に対する B のコンバージョンリフト

28 日間のテストにおけるバリアント A に対するバリアント B の累積コンバージョンリフトと信頼区間

B は {{lift}} 上回っていますが、{{level}} 区間はまだゼロを含んでいます。

B のコンバージョンは {{lift}} 高く（{{level}} 区間で {{low}}〜{{high}}）、{{day}} 日目から有意です。

## RangeAreaChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "name": "curve",
    "type": "ChartCurve",
    "default": "\"smooth\"",
    "required": false,
    "description": "Shape of the edges: straight, smooth (monotone) or steps",
    "typeText": "ChartCurve"
  },
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

## Example: forecast

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/vue/forecast.vue

```vue
<script setup lang="ts">
// A forecast with its uncertainty: the band (`y0` - `y`) widens with the
// horizon; the actual values and the forecast are lines (`type: "line"`).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RangeAreaChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

const { language } = useI18n();
const months = computed(() => MONTHS[language.value] ?? MONTHS.en);
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months.value[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line" as const,
      data: ACTUAL.map((y, i) => ({ x: months.value[i], y })),
    },
    {
      name: text.forecast,
      type: "line" as const,
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months.value[5 + i], y })),
    },
  ];
});
</script>

<template>
  <RangeAreaChart
    :series="series"
    :x-axis="{ type: 'category', categories: months }"
    :height="300"
  />
</template>

```

## Example: temperature

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/vue/temperature.vue

```vue
<script setup lang="ts">
// Daily minimum and maximum temperatures as a band, the average as a line;
// `curve="linear"` keeps the measured values at the corners.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RangeAreaChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { range: "Min – max", mean: "Average" },
  zh: { range: "最低 – 最高", mean: "平均" },
  ja: { range: "最低 – 最高", mean: "平均" },
  fr: { range: "Min – max", mean: "Moyenne" },
};
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};

const LOW = [8, 9, 7, 11, 13, 12, 10];
const HIGH = [16, 18, 15, 21, 24, 22, 19];

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const days = DAYS[language.value] ?? DAYS.en;
  return [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line" as const,
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
});
const yAxis = { format: (value: number) => `${value} °C` };
</script>

<template>
  <RangeAreaChart
    :series="series"
    curve="linear"
    :x-axis="{ type: 'category' }"
    :y-axis="yAxis"
    :height="280"
  />
</template>

```
