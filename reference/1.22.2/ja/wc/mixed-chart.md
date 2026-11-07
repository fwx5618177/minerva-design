# 複合グラフ

棒・折れ線・面を 1 つのグラフに、1 本または 2 本の値軸で：売上と成長率、降水量と気温、パレート図。

Package: minerva-design@1.22.2

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

{{year}} 年 Q{{n}}

売上

前年同期比

四半期売上と前年同期比の成長率

降水量

気温

東京の月ごとの降水量と気温

セッション

コンバージョン率

キャンペーン

2 か月間の日ごとのセッション数とコンバージョン率

返品

累積比率

サイズ違い

破損

説明と異なる

配達遅延

気が変わった

誤配送

その他

原因別の返品数とその累積比率

ページビュー

中国語（zh-CN）

フランス語（fr-FR）

日別ページビューとコンバージョン率、{{locale}}

売上

ユーザー数

ユーザー数（対数）

2016〜2025 年の年間売上と対数軸のユーザー数

{{value}} kWh

太陽光発電量

消費量

蓄電池の充電率

夜間

{{value}} の蓄電池

2 日間の自給率は {{share}}、系統からの購入は {{imported}} です。

1 時間あたりの電力量

ある住宅の 2 日間の時間ごとの太陽光発電量と消費量、および蓄電池の充電率

在庫水準

入荷

販促期間

安全在庫

発注点

日付または入荷をクリックしてください。

{{id}}：{{ordered}} に {{quantity}} 個を発注し、{{lead}} 後の {{arrived}} に入荷。

{{date}} の在庫は {{units}} 個。

{{date}} の在庫は {{units}} 個のみで、安全在庫を下回っています。

個数

ある商品の 3 か月間の日別在庫水準。入荷、発注点、安全在庫を表示

リクエスト数

エラー率

リリース

30 分あたりのリクエスト数

ある Web API の 1 日のリクエスト数とエラー率、およびリリース

{{version}} のリリース後、エラー率は {{time}} に {{peak}} でピークに達し、{{rollback}} へのロールバックまで続きました。

{{value}} pt

開始

残作業

完了

理想ペース

{{value}} 追加

理想：残り {{value}}

残り {{value}}

当日の完了 {{value}}

理想より {{value}} 遅れ

理想より {{value}} 先行

ストーリーポイント

スプリントのバーンダウン：10 稼働日の残作業、日ごとの完了ポイント、理想の消化ペース

残り {{left}}、1 日 {{velocity}} のペースでは、スプリント終了時に約 {{forecast}} が未完了になります。

残り {{left}}、1 日 {{velocity}} のペースで、スプリントは順調です。

## MixedChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/mixed-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
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

## Example: 雨温図

月降水量を棒で、平均気温を滑らかな線で表示し、クロスヘアで両方を読み取れます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/wc/climate.html

```html
<minerva-mixed-chart id="climate" height="300"></minerva-mixed-chart>

```

### apps/docs/src/docs/pages/mixed-chart/wc/climate.ts

```tsx
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
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

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#climate")!;
  chart.series = [
    {
      name: text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" }, crosshair: true };
}

```

## Example: 2 軸の売上と成長率

売上を左軸の棒で、成長率を右軸の線で表示します（yAxis: "right"）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/wc/revenue-growth.html

```html
<minerva-mixed-chart id="revenue" height="300"></minerva-mixed-chart>

```

### apps/docs/src/docs/pages/mixed-chart/wc/revenue-growth.ts

```tsx
// Bars and a line on two value axes: the series with `yAxis: "right"` use
// `options.yAxis2` (its ticks are aligned on the left grid).
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#revenue")!;
  chart.series = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => `${value} %` },
  };
}

```
