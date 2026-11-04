# 棒グラフ

横に並べるか積み上げた棒グラフ。折れ線を重ねることもできます。

Package: minerva-design@1.20.4

Renderer: wc

Locale: ja

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

第{{n}}四半期

完了したチケット

四半期ごとに完了したサポートチケット

注文

7 日平均

日

日別の注文数と 7 日平均

2025 年と 2026 年の四半期売上

推奨者

中立者

批判者

北米

ヨーロッパ

アジア太平洋

中南米

中東

地域別の推奨者・中立者・批判者の割合

Web

モバイルアプリ

パートナー

チャネル別の月間注文数（積み上げ）

販売数

四半期ごとの販売数

{{quarter}}：{{units}} 個

棒をタップしてください

積み上げ

グループ化

チャネル別・月別の注文数

ロンドン

東京

パリ

ロンドン、東京、パリの月平均降水量

純損益

月別の純損益。利益はゼロの上、損失は下

販売数

国別のオンライン販売数（多い順）

新規顧客

第{{n}}週

週間目標

週ごとの新規顧客数と週間目標の比較

{{total}} 週中 {{reached}} 週で目標を達成（{{rate}}）。

売上

{{month}}：{{value}}

四半期に戻る

四半期をクリックすると月別に表示します。

{{quarter}}：合計 {{value}}。月をクリックすると売上を表示します。

2026 年の四半期別売上。四半期をクリックすると月別に表示します

2026 年 {{quarter}} の月別売上

エンジニアリング

プロダクト

デザイン

営業

マーケティング

サポート

前年

今年

増減

前年と比較

部門別の採用数（今年と前年）

成功

ロールバック

変更凍結

8 週間の日別本番デプロイ数（成功とロールバック）

稼働日あたり {{perDay}} 回のデプロイ、変更失敗率 {{failure}}。

オフピーク

通常

ピーク

充電

日平均

充電時間

{{energy}} kWh・{{duration}}

{{start}}〜{{end}} に充電すると {{cost}}。{{plugIn}} の接続直後に充電するより {{saving}} 安くなります。

MWh あたりの価格

明日の各時間の前日市場電力価格。電気自動車の充電に最も安い時間帯を強調表示

## BarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
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
    "name": "labels",
    "typeText": "boolean",
    "attribute": "labels",
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

## Example: ラベル付きのグループ棒グラフ

地域ごとに 2 年分を並べて表示します。labels で各棒の上に値を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/wc/grouped.html

```html
<minerva-bar-chart id="sales" labels height="280"></minerva-bar-chart>

```

### apps/docs/src/docs/pages/bar-chart/wc/grouped.ts

```tsx
// Series are grouped side by side; `labels` writes the value of every bar.
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBarChart>("#sales")!;
  chart.series = [
    { name: text.lastYear, data: [38, 52, 61, 45] },
    { name: text.thisYear, data: [44, 58, 72, 49] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.regions } };
}

```

## Example: 積み上げ棒グラフ

デバイス別のセッション数を曜日ごとに積み上げます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/wc/stacked.html

```html
<minerva-bar-chart id="devices" stacked height="280"></minerva-bar-chart>

```

### apps/docs/src/docs/pages/bar-chart/wc/stacked.ts

```tsx
// `stacked` piles the bars of each category (a series can still set its
// own `type`, e.g. a line).
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBarChart>("#devices")!;
  chart.series = [
    { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
}

```
