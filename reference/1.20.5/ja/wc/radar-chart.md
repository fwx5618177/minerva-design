# レーダーチャート

尺度の異なる複数の指標で、1 つまたは少数の対象を比較します（スキル評価、製品レビュー、風味のプロファイルなど）。多角形にホバーすると、その多角形と最も近い指標がハイライトされます。矢印キーで系列と指標の間を移動し、Esc で解除します。凡例の項目をクリックすると系列を非表示にできます。

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
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

問題解決

コーディング

システム設計

コミュニケーション

協調性

当事者意識

候補者

{{value}} / {{max}}

候補者の面接評価シート

香り

酸味

甘み

コク

苦味

余韻

エチオピア イルガチェフェ

スマトラ マンデリン

2 種類のコーヒーの風味

性能

バッテリー

カメラ

ディスプレイ

コストパフォーマンス

質感

3 機種のスマートフォンのレビュースコア

多角形にホバーするか矢印キーで機種を比較します

スピード

シュート

パス

ドリブル

守備

フィジカル

2 人のサッカー選手の能力値

セキュリティ

連携

レポート

モバイル

自動化

サポート

価格

自社製品

主要競合

市場平均

比較する製品

自社製品、競合、市場平均の機能評価

たんぱく質

食物繊維

糖質

脂質

ナトリウム

カルシウム

フルーツ入りオートミール

卵のトースト

グラノーラ入りヨーグルト

基準量の {{value}}

{{meal}}：{{amount}}（{{share}}）

3 種類の朝食の栄養成分（1 日の基準量に対する割合）

CPU

メモリ

ディスク I/O

ネットワーク

レイテンシ

エラー

直近 1 時間の平均

現在

ライブ更新

アラート：{{metric}} が容量の {{threshold}} を超えています。

最も負荷の高い指標：{{metric}}。

サービスの現在の負荷と直近 1 時間の平均

コミュニケーション

成果の提供

専門性

協働

育成

主体性

チーム平均

対象者

{{name}} の 360 度評価とチーム平均

強み：{{strength}}（チーム比 {{strengthGap}}）。伸ばす点：{{growth}}（{{growthGap}}）。

売上

受注件数

成約率

平均案件規模

通話数

NPS

目標

実績

{{kpi}}：{{actual}}（目標 {{target}}、達成率 {{attainment}}）。

営業担当者の四半期 KPI と目標

軸の近くをクリックすると KPI を表示します。

## RadarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "shape",
    "typeText": "\"polygon\" | \"circle\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number",
    "attribute": "levels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly RadarSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<RadarChartOptions, \"type\">> | undefined",
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

## Example: 円形グリッド

shape を circle にすると円形のグリッドを描き、levels でその数を設定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/wc/circle.html

```html
<minerva-radar-chart
  id="skills"
  shape="circle"
  levels="5"
  height="320"
></minerva-radar-chart>

```

### apps/docs/src/docs/pages/radar-chart/wc/circle.ts

```tsx
// `shape="circle"` draws round grid rings, `levels` sets how many.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadarChart>("#skills")!;
  chart.indicators = text.skills.map((name) => ({ name, max: 10 }));
  chart.series = [{ name: text.profile, values: [9, 6, 7, 8, 5, 6] }];
}

```

## Example: 2 つの系列を比較

5 つの指標で 2 つのモデルを比較します。凡例で系列を表示・非表示にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/wc/compare.html

```html
<minerva-radar-chart id="products" height="320"></minerva-radar-chart>

```

### apps/docs/src/docs/pages/radar-chart/wc/compare.ts

```tsx
// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadarChart>("#products")!;
  chart.indicators = text.axes.map((name) => ({ name, max: 100 }));
  chart.series = [
    { name: text.current, values: [72, 85, 64, 90, 58] },
    { name: text.next, values: [88, 80, 78, 92, 81] },
  ];
}

```
