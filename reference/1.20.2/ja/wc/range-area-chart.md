# 範囲面グラフ

下端と上端の間を塗る帯：信頼区間、予測、最小・最大の範囲、パーセンタイルのファンチャートに。

Package: minerva-design@1.20.2

Renderer: wc

Locale: ja

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/range-area-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 不確実性の帯付き予測

y0 から y までの帯は予測期間とともに広がり、実績と予測は折れ線系列です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/wc/forecast.html

```html
<minerva-range-area-chart id="forecast" height="300"></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/range-area-chart/wc/forecast.ts

```tsx
// A forecast with its uncertainty: the band (`y0` - `y`) widens with the
// horizon; the actual values and the forecast are lines (`type: "line"`).
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#forecast")!;
  chart.series = [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category", categories: months } };
}

```

## Example: 日ごとの気温の幅

各日の最低・最高気温を帯で、平均を線で表示します。直線の縁で実測値をそのまま示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/wc/temperature.html

```html
<minerva-range-area-chart
  id="temperature"
  curve="linear"
  height="280"
></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/range-area-chart/wc/temperature.ts

```tsx
// Daily minimum and maximum temperatures as a band, the average as a line;
// `curve="linear"` keeps the measured values at the corners.
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const days = DAYS[lang] ?? DAYS.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#temperature")!;
  chart.series = [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line",
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => `${value} °C` },
  };
}

```
