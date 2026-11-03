# 円形棒グラフ

進捗を同心円のリングで示します：アクティビティリング、OKR の達成度、ノルマに対する売上など。各バーは値と最大値の比でリングを埋め、色付きの背景トラックと丸い端を持ちます。ラベルは円の空いた部分に置かれ、中心には要約テキストを表示できます。リングにホバーするか矢印キーで、値・最大値・進捗を確認できます。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

ムーブ

エクササイズ

スタンド

曜日

リング達成

選択した日のアクティビティリング：ムーブ・エクササイズ・スタンドと目標の比較

アクティベーション率

4 週目の継続率

NPS 50 以上

p95 レイテンシ

解約率の削減

平均達成度

今四半期の主要な成果の達成度

北部

南部

東部

西部

ノルマ達成率

地域ごとの四半期売上とノルマの比較

CPU

メモリ

ディスク

ネットワーク

形

4 分の 3 円

円

半円

丸い端

トラック

サーバーのリソース使用率（容量に対する割合）

緊急資金

夏休みの旅行

新しいノート PC

住宅の頭金

目標をクリックすると達成までの期間を表示します。

{{goal}}：{{target}} 中 {{saved}} を貯蓄済み。残り {{remaining}}、毎月 {{monthly}} で約 {{months}} か月。

全目標の達成率

各貯蓄目標の貯蓄額と目標額

R・シウバ

M・コワルスキ

C・オカフォー

L・モロー

田中 圭

E・イェンセン

ゴール

アシスト

ランキング

{{rank}} 位 {{name}}

{{stat}}：{{games}} 試合で {{value}}

1 試合平均 {{ratio}}

今シーズンのリーグ{{stat}}ランキング

首位：{{name}}（{{stat}}：{{value}}）

発表動画

イベント写真

スライド

データベースのバックアップ

アップロード済み

各ファイルのアップロード進捗

最初から

すべてのファイルをアップロードしました（{{size}}）。

{{files}} ファイル中 {{done}} 件アップロード済み

大切にされていると感じる

目標が明確である

ここで成長できる

ワークライフバランス

上司が支えてくれる

この職場を勧めたい

並び順

設問順

同意率の高い順

同意率の低い順

平均同意率

回答者 {{answered}} 人中 {{agree}} 人が同意（{{share}}）

調査の各設問に同意した従業員の割合

## RadialBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radial-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "max",
    "typeText": "number | undefined",
    "attribute": "max",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number",
    "attribute": "sweep",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "attribute": "center-value",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "attribute": "center-label",
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
    "typeText": "readonly RadialBarDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<RadialBarChartOptions, \"type\">> | undefined",
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
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: アクティビティリング

3 つの完全なリングがそれぞれ目標（max）を持ち、中央に 1 日のまとめを表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.html

```html
<minerva-radial-bar-chart
  id="activity"
  sweep="360"
  center-value="78 %"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.ts

```tsx
// Activity rings: each bar has its own `max` (the goal), `sweep="360"` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#activity")!;
  chart.data = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chart.centerLabel = text.today;
  chart.options = { labelContent: ["name", "percent"] };
}

```

## Example: 主要な成果の達成度

5 つの主要な成果の達成度を同じ尺度で表示します。ラベルは 270° の残りの空白に配置されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.html

```html
<minerva-radial-bar-chart
  id="okr"
  max="100"
  inner-radius="0.2"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.ts

```tsx
// Key results completion on one scale (`max="100"`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

export function setup(root: HTMLElement) {
  const names =
    OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#okr")!;
  chart.data = names.map((name, i) => ({ name, value: DONE[i] }));
  chart.options = { format: (value) => `${value} %` };
}

```
