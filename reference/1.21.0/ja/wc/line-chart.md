# 折れ線グラフ

数値、日付、カテゴリに対する折れ線または塗りつぶした面。GPU で数百万ポイントを扱えます。

Package: minerva-design@1.21.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

今週

先週

今週と先週の日別訪問者数

使用容量

日

60 日間のストレージ使用量

リスボン

オスロ

曲線

直線

なめらか

ステップ

リスボンとオスロの月平均気温

コンピューティング

ストレージ

ネットワーク

データベース

積み上げ方法

積み上げ

サービス別の月間クラウド費用（積み上げ）

ページビュー

セッション

2026 年上半期の日別ページビューとセッション

センサー

100 万件のセンサー測定値

{{points}} ポイント · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

訪問者

製品リリース

障害

製品リリースと障害を含む 90 日間の日別訪問者数

室内

屋外

欠損を含む 1 時間ごとの室内と屋外の気温

センサーが数時間オフラインでした。推測で埋めずに線を途切れさせています。

中央値

95 パーセンタイル

危険

目標 {{value}}

6 時間の API レイテンシ（中央値と 95 パーセンタイル）

終値

期間

1か月

3か月

6か月

1年

すべて

2 年間の日次終値

歩数

1 日の歩数

{{day}}：{{steps}} 歩

線をタップまたはなぞってください

CPU

メモリ

{{hour}}時

1 日の CPU とメモリの使用率

ピンチでズーム、ダブルタップでリセット。凡例をタップすると系列を非表示にできます。

冷凍庫の温度

{{value}} 超で警報

一時停止

再開

警報：扉が開いている？

正常

最新の値 {{value}}（{{time}}）

直近 1 分間の上限超過：{{readings}} 件

直近 1 分間の冷凍庫の温度（毎秒更新）

野生型

変異株

抗生物質あり

対数増殖期

対数スケール

接種後の経過時間

CFU / mL

3 種類の細菌培養の 24 時間の増殖曲線

直線部分は増殖率が一定であることを示します。野生型は約 {{minutes}} ごとに倍増します。

線形スケールでは菌数の少ない培養が平らに見えます。対数スケールに戻すと比較できます。

ポートフォリオ評価額

点をクリックして計測を開始し、続けて 2 点目をクリックします。

始点 {{date}}（{{value}}）：2 点目をクリックしてください。

{{from}} → {{to}}：{{change}}（{{percent}}）、期間 {{days}}

クリア

2026 年のポートフォリオの日次評価額。2 点をクリックすると変化を計測します

株式

債券

金

不動産

基準 = 100

100 を基準に指数化した 4 つの資産クラスのパフォーマンス（2021〜2026 年）

{{value}} µg/m³

デリー

北京

パリ

メキシコシティ

東京

サンパウロ

11 月の微小粒子状物質（PM2.5）の日平均値。破線は WHO の指針値 {{value}} です。

超過 {{days}}/{{total}} 日

{{city}} の 30 日間の日次 PM2.5

## LineChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/line-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "area",
    "typeText": "boolean",
    "attribute": "area",
    "required": false
  },
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

## Example: ズームとリセット

2,000 ポイント：Ctrl / ⌘ + ホイールまたはピンチでズーム、ドラッグでパン、ボタンはチャートの resetZoom() を呼び出します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/wc/reset-zoom.html

```html
<div style="display: grid; gap: 8px; justify-items: start">
  <minerva-line-chart id="signal" height="260"></minerva-line-chart>
  <button id="reset" type="button"></button>
</div>

```

### apps/docs/src/docs/pages/line-chart/wc/reset-zoom.ts

```tsx
// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
// (resetZoom, getView, setView) drive the view from outside.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLineChart>("#signal")!;
  const reset = root.querySelector<HTMLButtonElement>("#reset")!;
  chart.series = [
    {
      name: text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  chart.options = { crosshair: true, interaction: { zoom: "x" } };
  reset.textContent = text.reset;
  const onReset = () => chart.resetZoom();
  reset.addEventListener("click", onReset);
  return () => reset.removeEventListener("click", onReset);
}

```

## Example: 週間トレンド

カテゴリ軸上の 2 本の滑らかな折れ線。系列名と曜日はページの言語に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/wc/trend.html

```html
<minerva-line-chart id="trend" curve="smooth" height="280"></minerva-line-chart>

```

### apps/docs/src/docs/pages/line-chart/wc/trend.ts

```tsx
// `series` and `options` are JS properties; the labels follow the page language.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLineChart>("#trend")!;
  chart.series = [
    { name: text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
}

```
