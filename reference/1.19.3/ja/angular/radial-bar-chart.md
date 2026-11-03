# 円形棒グラフ

進捗を同心円のリングで示します：アクティビティリング、OKR の達成度、ノルマに対する売上など。各バーは値と最大値の比でリングを埋め、色付きの背景トラックと丸い端を持ちます。ラベルは円の空いた部分に置かれ、中心には要約テキストを表示できます。リングにホバーするか矢印キーで、値・最大値・進捗を確認できます。

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
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
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

Support: beta

Native Angular: MnRadialBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadialBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly RadialBarDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: アクティビティリング

ムーブ・エクササイズ・スタンドを完全なリング（sweep={360}）で表示し、それぞれ 1 日の目標（max）と比べます。日付を切り替えるとリングがアニメーションします。ラベルを置く余白がないため、凡例でリングを示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadialBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadialBarChart],
  template: `
@let t = labels[language()];
<mn-radial-bar-chart
  [data]="[
    { name: t.rings[0], value: 420, max: 500, color: '#ef4444' },
    { name: t.rings[1], value: 24, max: 30, color: '#22c55e' },
    { name: t.rings[2], value: 9, max: 12, color: '#06b6d4' }
  ]"
  [sweep]="360"
  centerValue="78 %"
  [centerLabel]="t.today"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "rings": ["Move", "Exercise", "Stand"],
    "today": "of today’s goals"
  },
  "zh": {
    "rings": ["活动", "锻炼", "站立"],
    "today": "今日目标"
  },
  "ja": {
    "rings": ["ムーブ", "エクササイズ", "スタンド"],
    "today": "今日の目標"
  },
  "fr": {
    "rings": ["Bouger", "M’entraîner", "Me lever"],
    "today": "des objectifs du jour"
  }
};
}

```

## Example: OKR の達成度

主要な成果を目標に対する割合（max={100}）で表示し、各バーの開始位置の手前に名前と割合を表示します。中心には平均達成度を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadialBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadialBarChart],
  template: `
@let n = names[language()];
<mn-radial-bar-chart
  [data]="[
    { name: n[0], value: 92 },
    { name: n[1], value: 74 },
    { name: n[2], value: 61 },
    { name: n[3], value: 48 },
    { name: n[4], value: 35 }
  ]"
  [max]="100"
  [innerRadius]="0.2"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  names = {
  "en": ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  "zh": ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  "ja": ["売上", "新規顧客", "継続率", "NPS", "採用"],
  "fr": ["Chiffre d’affaires", "Nouveaux clients", "Rétention", "NPS", "Recrutement"]
};
}

```
