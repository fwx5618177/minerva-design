# 面グラフ

時間とともに変化する量を塗りつぶした面で表します。既定でなめらかな曲線になり、重ねて表示するほか、合計として積み上げたり 100% の構成比として表示したりできます。ホバーすると同じ x の全系列を読み取れ、Ctrl / ⌘ + ホイールやピンチでズームできます。

Package: minerva-design@1.21.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

デイリーアクティブユーザー

2026 年 4 月〜6 月のデイリーアクティブユーザー

その他

2016〜2026 年のベンダー別市場シェア

自然検索

ダイレクト

参照元サイト

ソーシャル

流入元別の月間訪問数（積み上げ）

稼働中のインスタンス

上限

1 日にオートスケーラーが起動したインスタンス数

原子力

水力

風力

太陽光

ガス

{{value}} GW

出力

1 日の電源別発電量（積み上げ）

実績

計画

年間の売上累計と計画の比較

ダウンロード

アップロード

2 時間のサーバー帯域幅。ダウンロードはゼロの上、アップロードは下

太陽光発電量

{{value}} kWh

2026 年の屋根置き太陽光発電の日次発電量

ズームをリセット

{{from}} – {{to}}：合計 {{total}}、1 日平均 {{average}}

Ctrl / ⌘ + ホイールまたはピンチで季節を拡大し、ドラッグで移動します。

エンジニアリング

営業

カスタマーサポート

オペレーション

財務・人事

2025〜2026 年の部門別の月次人数

選択した月の人数

従業員 {{value}} 人

昨年

今年

ブラックフライデー

サイバーマンデー

最終発送日

11 月と 12 月の日次注文数（今年と昨年の比較）

今シーズンの注文は {{total}} 件、前年比 {{change}}。

使用量

傾向

{{value}} GB

容量 {{value}}

ボリューム

データベース

ログ

ユーザーのアップロード

約 {{days}}後（{{date}} ごろ）に満杯

今後 {{days}}は満杯になりません

60 日間のディスク使用量と容量までの傾向

## AreaChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/area-chart",
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
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
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

## Example: 100% 積み上げ

percent で各スタックを 100% に拡大縮小します。1 日の各エネルギー源の割合を直線の縁で表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/wc/percent.html

```html
<minerva-area-chart
  id="mix"
  percent
  curve="linear"
  height="280"
></minerva-area-chart>

```

### apps/docs/src/docs/pages/area-chart/wc/percent.ts

```tsx
// `percent` scales every stack to 100%: the share of each source over time.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaAreaChart>("#mix")!;
  chart.series = [
    { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.hours } };
}

```

## Example: 積み上げ面グラフ

3 つの流入元を滑らかな縁（既定の曲線）で積み上げます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/wc/stacked.html

```html
<minerva-area-chart id="traffic" stacked height="280"></minerva-area-chart>

```

### apps/docs/src/docs/pages/area-chart/wc/stacked.ts

```tsx
// `stacked` piles the areas up; the curve is smooth by default.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaAreaChart>("#traffic")!;
  chart.series = [
    { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.months } };
}

```
