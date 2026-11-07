# 円形棒グラフ

進捗を同心円のリングで示します：アクティビティリング、OKR の達成度、ノルマに対する売上など。各バーは値と最大値の比でリングを埋め、色付きの背景トラックと丸い端を持ちます。ラベルは円の空いた部分に置かれ、中心には要約テキストを表示できます。リングにホバーするか矢印キーで、値・最大値・進捗を確認できます。

Package: minerva-design@1.22.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RadialBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "rounded",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "track",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly RadialBarDatum[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"name\" | \"percent\")[] | undefined",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
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
