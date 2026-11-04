# バブルチャート

3 つ目の値を点の大きさで表す散布図：バブルの面積が値に比例します。

Package: minerva-design@1.20.5

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

アジア

ヨーロッパ

アメリカ大陸

アフリカ

人口

1 人あたり GDP

平均寿命（年）

各国の 1 人あたり GDP、平均寿命、人口

製品

売上

クラウドストレージ

分析

モバイル SDK

決済

デスクトップアプリ

ハードウェア

コンサルティング

相対市場シェア

市場成長率

市場リーダー

高成長

製品の市場シェア、成長率、売上

見込み確定

提案

交渉

金額

案件 #{{id}}

パイプライン滞留日数

受注確率

{{deal}}（{{stage}}）：{{amount}}

バブルをクリックしてください

経過日数、受注確率、金額別の進行中案件

1 人あたり GDP（対数スケール）

高所得

対数スケールの 1 人あたり GDP と平均寿命、バブルの大きさは人口

表示中の所得：{{from}} – {{to}}

ズームすると表示範囲がドルで表示されます

インフラ

セキュリティ

人員

予算

エクスポージャー

停電

ハードウェアの納期遅延

ネットワーク切り替え

データ漏えい

アクセス権レビューの滞留

キーパーソンの退職

ベンダーのスキル不足

研修不足

ライセンス費用の上昇

為替変動

許容範囲

重大

発生可能性 {{likelihood}} × 影響度 {{impact}} = {{score}}

エクスポージャー: {{value}}

発生可能性

影響度

発生可能性、影響度、コストエクスポージャー別のプロジェクトリスク

検索

ソーシャル

動画

メール

予算

{{date}} 開始

開始日

広告費用対効果

損益分岐点

開始日、広告費用対効果、予算別のマーケティングキャンペーン

北部

南部

東部

西部

中部

両方のチャートで同じサイズスケールを使う

両方のチャートで {{value}} を最大のバブルで描きます。

各チャートが自身の最大売上を最大のバブルで描きます。

1 m² あたりの売上

利益率

{{year}} 年の店舗地域別の 1 m² あたり売上、利益率、売上高

再生

一時停止

もう一度再生

最初から

年: {{year}}

出生率（女性 1 人あたりの子どもの数）

1990 年から 2025 年までの国別の出生率、平均寿命、人口

## BubbleChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bubble-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "minSize",
    "typeText": "number",
    "attribute": "min-size",
    "required": false
  },
  {
    "name": "maxSize",
    "typeText": "number",
    "attribute": "max-size",
    "required": false
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "attribute": "max-value",
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

## Example: 豊かさ・健康・人口

1 人あたり GDP と平均寿命。バブルの大きさは人口を表します（面積が値に比例）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/countries.html

```html
<minerva-bubble-chart
  id="countries"
  max-size="64"
  height="320"
></minerva-bubble-chart>

```

### apps/docs/src/docs/pages/bubble-chart/wc/countries.ts

```tsx
// Three values per point: wealth (x), life expectancy (y) and population
// (`value`, the area of the bubble); the country is the point label.
import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#countries")!;
  chart.series = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  chart.options = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };
}

```

## Example: ポートフォリオのリスクとリターン

資産ごとに 1 系列、大きさは構成比を表します。バブルをクリックすると資産を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.html

```html
<div style="display: grid; gap: 8px">
  <minerva-bubble-chart id="portfolio" height="300"></minerva-bubble-chart>
  <output id="asset" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.ts

```tsx
// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#portfolio")!;
  const asset = root.querySelector<HTMLOutputElement>("#asset")!;
  chart.series = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chart.options = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  asset.textContent = text.hint;
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) asset.textContent = `${item.seriesName}: ${item.value} %`;
  };
  chart.addEventListener("minerva-point-click", onClick);
  return () => chart.removeEventListener("minerva-point-click", onClick);
}

```
