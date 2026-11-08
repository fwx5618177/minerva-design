# ヒートマップ

値に応じて色分けしたセルのグリッド。両軸ともカテゴリまたは数値を使えます。曜日×時間帯のアクティビティ、相関行列、指標の分布マップなどに。セルにホバーするとセルが浮き上がり、行と列が強調され、カラー凡例に値が示されます。

Package: minerva-design@1.23.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

セッション

曜日と時間帯別のセッション数

偏差

1995〜2024 年の月別気温偏差

信号強度

200 × 100 m のフロアの Wi-Fi 信号強度

{{cells}} セル · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

コントリビューション

1 年間の日別コントリビューション数

過去 1 年間で {{total}} 件のコントリビューション

セッション

ページビュー

登録数

売上

解約

サポートチケット

相関係数

6 つの製品指標の相関行列

{{n}} か月目

継続率

月別登録コホートの継続率

デスクトップ

モバイル

タブレット

自然検索

有料検索

ソーシャル

メール

参照元サイト

直接

{{source}} × {{device}}: {{sessions}} セッションから {{orders}} 件の注文、{{rate}}:

平均 {{value}} を上回る

平均 {{value}} を下回る

セルをクリックすると、セッション数と注文数を表示します。

コンバージョン率

流入元とデバイス別のコンバージョン率

ラック {{n}}

センサー {{n}}

一時停止

再開

最高温: {{rack}} の {{sensor}}、{{value}} · {{limit}} 超えのセンサー {{alarms}} 個

吸気温度

10 台のサーバーラックのセンサーのライブ吸気温度

猫

犬

鳥

乗用車

トラック

実際: {{actual}}、予測: {{predicted}}

{{value}} 枚（クラスの {{share}}）

再現率: {{value}}

適合率: {{value}}

誤分類

正解率: テスト画像 {{images}} 枚中 {{value}}

クラス内の割合

予測クラス

実際のクラス

5 クラスの画像分類器の混同行列

北部

南部

東部

西部

中部

第 {{n}} 四半期

指標

売上

2025 年比の成長率

粗利益率

{{region}}・{{quarter}}

最高: {{best}}（{{bestValue}}）· 最低: {{worst}}（{{worstValue}}）

地域と四半期別の 2026 年の販売指標

## HeatmapChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/heatmap-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "colorScale",
    "typeText": "readonly string[] | \"sequential\" | \"diverging\"",
    "attribute": "color-scale",
    "required": false
  },
  {
    "name": "colorMidpoint",
    "typeText": "number | undefined",
    "attribute": "color-midpoint",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "number | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[] | undefined",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
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

## Example: 発散型カラースケール

-1 から 1 の固定範囲の相関行列。負の値は青、正の値は赤で、セルは角丸です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/wc/color-scale.html

```html
<minerva-heatmap-chart
  id="correlation"
  radius="4"
  height="320"
></minerva-heatmap-chart>

```

### apps/docs/src/docs/pages/heatmap-chart/wc/color-scale.ts

```tsx
// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#correlation")!;
  chart.data = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  chart.colorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  chart.valueRange = [-1, 1];
  chart.valueName = text.correlation;
  chart.format = (value) => value.toFixed(2);
}

```

## Example: 週間アクティビティ

曜日と時間帯ごとのコミット数。カテゴリで列と行の順序を決めます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/wc/weekly-activity.html

```html
<minerva-heatmap-chart id="activity" height="300"></minerva-heatmap-chart>

```

### apps/docs/src/docs/pages/heatmap-chart/wc/weekly-activity.ts

```tsx
// `data` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#activity")!;
  chart.data = text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  chart.xCategories = HOURS;
  chart.yCategories = [...text.days].reverse();
  chart.valueName = text.commits;
}

```
