# レーダーチャート

尺度の異なる複数の指標で、1 つまたは少数の対象を比較します（スキル評価、製品レビュー、風味のプロファイルなど）。多角形にホバーすると、その多角形と最も近い指標がハイライトされます。矢印キーで系列と指標の間を移動し、Esc で解除します。凡例の項目をクリックすると系列を非表示にできます。

Package: minerva-design@1.19.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnRadarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "dots",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 製品の比較

3 系列あると凡例が自動で表示されます。onHover はポインターに最も近い系列と指標を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.axes[0], max: 100 },
    { name: t.axes[1], max: 100 },
    { name: t.axes[2], max: 100 },
    { name: t.axes[3], max: 100 },
    { name: t.axes[4], max: 100 }
  ]"
  [series]="[
    { name: t.current, values: [72, 85, 64, 90, 58] },
    { name: t.next, values: [88, 80, 78, 92, 81] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "current": "Current model",
    "next": "Next model",
    "axes": ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"]
  },
  "zh": {
    "current": "当前型号",
    "next": "新型号",
    "axes": ["速度", "可靠性", "舒适性", "安全性", "能效"]
  },
  "ja": {
    "current": "現行モデル",
    "next": "次期モデル",
    "axes": ["速度", "信頼性", "快適性", "安全性", "効率"]
  },
  "fr": {
    "current": "Modèle actuel",
    "next": "Nouveau modèle",
    "axes": ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"]
  }
};
}

```

## Example: 円形グリッド

shape="circle" で円形のリングを描き、levels でその数を設定し、dots={false} で頂点を隠します。opacity で塗りを濃くしています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.skills[0], max: 10 },
    { name: t.skills[1], max: 10 },
    { name: t.skills[2], max: 10 },
    { name: t.skills[3], max: 10 },
    { name: t.skills[4], max: 10 },
    { name: t.skills[5], max: 10 }
  ]"
  [series]="[{ name: t.profile, values: [9, 6, 7, 8, 5, 6] }]"
  shape="circle"
  [levels]="5"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "profile": "Profile",
    "skills": ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"]
  },
  "zh": {
    "profile": "能力画像",
    "skills": ["前端", "后端", "设计", "测试", "运维", "数据"]
  },
  "ja": {
    "profile": "プロフィール",
    "skills": ["フロントエンド", "バックエンド", "デザイン", "テスト", "DevOps", "データ"]
  },
  "fr": {
    "profile": "Profil",
    "skills": ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"]
  }
};
}

```
