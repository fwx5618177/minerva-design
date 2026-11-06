# 箱ひげ図

中央値、四分位数、ひげ、外れ値で分布を比較。生のサンプルからも、計算済みの統計量からも描けます。外れ値は系列色の中抜きの円で、ホバーすると値とグループを確認できます。

Package: minerva-design@1.22.0

Renderer: wc

Locale: ja

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

ゲートウェイ

認証

検索

決済

レコメンド

画像

応答時間

最大

第 3 四分位

中央値

第 1 四分位

最小

外れ値

サービスごとの応答時間の分布

年収

ジュニア開発者

開発者

シニア開発者

テックリード

エンジニアリングマネージャー

職種ごとの給与の分布

平日

週末

パリ

リヨン

マルセイユ

リール

配達時間（時間）

都市ごとの平日と週末の配達時間

日最高気温

平均

月ごとの日最高気温の分布

Lint

単体テスト

結合テスト

E2E テスト

リリース

ひげの範囲

1.5 × IQR

3 × IQR

最小 – 最大

外れ値の形

中抜き

塗りつぶし

{{value}} 件の実行を外れ値として表示

ビルド時間

CI パイプラインごとのビルド時間の分布

箱または外れ値をクリックしてください。

{{day}}: ある患者は {{value}} 待ちました。

{{day}}: 待ち時間の中央値 {{median}}、半数の患者は {{q1}} から {{q3}} 待ち、外れ値 {{outliers}} 件。

待ち時間

4 時間目標

曜日ごとの救急外来の待ち時間の分布

スタイルシート

スクリプト

フォント

画像

動画

対数スケール

{{value}} 個のファイルが予算 {{budget}} を超えています。

ファイルサイズ

予算

Web サイトのファイルサイズの種類別の分布

米国東部

米国西部

欧州西部

アジア太平洋南部

南米東部

一時停止

再開

{{regions}} で SLA 違反のおそれ

すべてのリージョンが SLA 内です

レイテンシ

SLA

リージョンごとのリクエストレイテンシのライブ分布

## BoxPlotChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/box-plot-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\"",
    "attribute": "whisker",
    "required": false
  },
  {
    "name": "outlierShape",
    "typeText": "\"hollow\" | \"filled\"",
    "attribute": "outlier-shape",
    "required": false
  },
  {
    "name": "outlierSize",
    "typeText": "number",
    "attribute": "outlier-size",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
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

## Example: 横向きの箱ひげ図（最小〜最大）

箱を行方向に並べ、ひげを最小値と最大値まで伸ばします（外れ値なし）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.html

```html
<minerva-box-plot-chart
  id="scores"
  orientation="horizontal"
  whisker="minmax"
  height="240"
></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.ts

```tsx
// `orientation="horizontal"` lays the boxes out in rows; `whisker="minmax"`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#scores")!;
  chart.groups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chart.valueName = text.score;
  chart.options = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
}

```

## Example: サービスごとの応答時間

サービスごとの生データから、四分位数・Tukey のひげ・外れ値をチャートが計算します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/services.html

```html
<minerva-box-plot-chart id="services" height="300"></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/services.ts

```tsx
// Raw samples per service (`groups`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#services")!;
  chart.groups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  chart.valueName = text.time;
  chart.options = { xAxis: { type: "category" }, yAxis: { title: text.time } };
}

```
