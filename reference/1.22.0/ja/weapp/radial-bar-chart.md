# 円形棒グラフ

進捗を同心円のリングで示します：アクティビティリング、OKR の達成度、ノルマに対する売上など。各バーは値と最大値の比でリングを埋め、色付きの背景トラックと丸い端を持ちます。ラベルは円の空いた部分に置かれ、中心には要約テキストを表示できます。リングにホバーするか矢印キーで、値・最大値・進捗を確認できます。

Package: minerva-design@1.22.0

Renderer: weapp

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

Radial bar chart: concentric progress rings with tracks, rounded ends, labels and center texts. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radial-bar-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "track",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rounded",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
