# チャート

WebGPU・WebGL2・WebGL（フォールバックは Canvas2D）で描画し、数百万ポイントでも 60 fps を保つ GPU アクセラレーションのチャート：推移、比較、統計、構成比、階層とフロー、ネットワーク・依存関係・ツリー、金融・トレーディング、3D をカバーします。Chart は折れ線・面・棒・散布図・ローソク足・ヒートマップの系列を組み合わせられ、その他のコンポーネントは 1 種類のチャートのプリセットです。まずは下のギャラリーから：すべてのチャートタイプをライブのサムネイルで紹介し、それぞれのページへリンクしています。

Package: minerva-design@1.22.1

Renderer: taro

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

#### 描画のしくみ

データレイヤーは WebGPU で描画し、使えない場合は WebGL2、WebGL、Canvas2D の順にフォールバックします（renderer="auto"）。準備ができるとルート要素に data-renderer が付きます。チャートは 4 つのレイヤーで構成されます：

Canvas2D 背景：グリッド、軸、注釈エリア

GPU データレイヤー：線、面、棒、点

Canvas2D オーバーレイ：目盛りラベル、ポイントラベル、ハイライト

DOM：ツールチップと凡例（選択可能でアクセシブルなテキスト）

#### 大量データ

大きな系列は型付き配列の列（{ x: Float64Array, y: Float64Array }）で渡すと、ポイントごとのオブジェクトは作られません。x がソート済みならヒットテストは二分探索になり、表示範囲だけが描画されるため、100 万ポイントの折れ線や散布図も WebGPU、WebGL2、WebGL で 60 fps を保ちます。

#### 操作とキーボード

Ctrl / ⌘ + ホイールまたはトラックパッドのピンチでズーム（通常のホイールはページをスクロール）、ズーム中はドラッグでパン、ダブルクリックでリセットします。

チャートにフォーカスして：← / → でハイライトするポイントを移動（スクリーンリーダーで読み上げ）、+ / - でズーム、0 でリセット、Esc で解除します。

#### テーマとエンジン

色は Minerva の CSS 変数から取得します：定義されていれば --chart-series-1..8、なければテーマカラー（--primary-color、--success-color など）。テーマの切り替えは自動で反映されます。

minerva-design/charts/core は React を含まない同じエンジンです：createChart(container, options) はどのフレームワークでも動作します。

#### チャートの種類

すべてのチャートタイプを 6 つのギャラリーに分けてライブのサムネイルで紹介します。各キャプションはそのチャートのページへリンクしています：

基本の 2D：折れ線グラフ、面グラフ、範囲面グラフ、棒グラフ、横棒グラフ、複合 / 2 軸グラフ、散布図、バブルチャート、スパークライン。

統計・KPI・計画：ヒストグラム、箱ひげ図、ウォーターフォールチャート、ヒートマップ、カレンダーヒートマップ、ゲージ、ブレットグラフ、円形棒グラフ、ガントチャート。

構成比・階層・フロー：円グラフとドーナツグラフ、レーダーチャート、ファネルチャート、4 象限チャート、ツリーマップ、サンバースト図、サンキー図。

関係・階層チャート：ネットワーク図（力学・円形・アークのレイアウト、GPU 描画で数万ノードまで）、依存関係グラフ（クリティカルパス付きの階層型 DAG）、ツリー図（整列ツリー、放射状ツリー、マインドマップ、組織図）、コードダイアグラム。

金融・トレーディング：ローソク足、トレーディングチャート（価格帯別出来高、描画ツール、バーリプレイ、複数チャートの同期、注文入力）と 21 種類の組み込みテクニカル指標（MA / EMA / WMA、ボリンジャーバンド、VWAP、出来高、MACD、RSI、KDJ、ATR、パラボリック SAR、一目均衡表、SuperTrend、ケルトナーチャネル、ドンチャンチャネル、OBV、CCI、ストキャスティクス RSI、DMI、ウィリアムズ %R、MFI）、デプスチャート、板情報、板情報ヒートマップ、歩み値。

3D：3D 散布図と 3D 折れ線グラフ（加算合成で光る点群にも対応）、3D サーフェスチャート、3D 棒グラフ。

サムネイルはビューポートの近くにあるときだけマウントされます（IntersectionObserver）。ページは軽快なまま、ブラウザの上限を超える GPU コンテキストを使うこともありません。板情報系のウィジェットはシミュレーションの相場を流し、画面外では一時停止します。

GPU チャートは WebGPU → WebGL2 → WebGL → Canvas2D の 4 段階でバックエンドを選ぶため、どのブラウザでも描画でき、GPU が失われても動き続けます。setDefaultChartRenderer() はすべてのチャートの既定のバックエンドを一度に切り替えます。このドキュメントのチャートページ上部に固定されたレンダラー切り替えもこれを使っています。チャートエンジンとパフォーマンスのページを参照してください。

売上

目標

月間売上と目標の比較

p95 レイテンシ

正常範囲

デプロイ

SLO {{value}}

分

SLO と正常範囲を示した p95 レイテンシ

{{month}}：{{value}}（{{series}}）

棒または線をタップしてください

ランダムウォーク

レンダラー

50,000 点のランダムウォーク

指定：{{requested}} · 描画：{{active}}

訪問数

登録数

Web

注文

第{{n}}四半期

チーム {{name}}

無料

プロ

チーム

速度

品質

コスト

サポート

規模

ベンダー {{name}}

訪問

登録

利用開始

有料化

プロダクト

デザイン

エンジニアリング

市場開拓

営業

マーケティング

リリース

ロードマップ

メール

整理

計画する

すぐやる

やめる

任せる

##### 折れ線グラフ

推移

月ごとの訪問数と登録数

##### 面グラフ

なめらか、積み上げ

プラットフォーム別ユーザー数（積み上げ）

##### 棒グラフ

値ラベル、棒ごとの色

四半期ごとの注文数

##### 散布図

相関、クラスター

2 つの測定値のクラスター

##### ローソク足チャート

始値、高値、安値、終値

日足の価格

##### ヒートマップ

グリッド上の値

曜日と時間帯別の負荷

##### スパークライン

単語サイズの推移

##### 円グラフ

構成比

ブラウザのシェア

##### ドーナツグラフ

合計付きの構成比

プラン別ユーザー数

##### レーダーチャート

複数軸のプロファイル

ベンダーの比較

##### ゲージ

目標に対する 1 つの値

##### ファネルチャート

段階とコンバージョン

登録ファネル

##### ツリーマップ

階層的な構成比

部門別予算

##### 4象限チャート

優先度マトリクス

緊急度と重要度によるタスク

##### 範囲面グラフ

最小〜最大の帯、予測

月ごとの平均最低・最高気温

##### 横棒グラフ

ランキング、長いラベル

言語ごとの開発者の利用率

##### 複合グラフ

2 軸の棒と線

四半期ごとの売上と成長率

##### バブルチャート

3 つ目の値をサイズで表現

キャンペーンごとの費用・登録数・リーチ

##### ヒストグラム

分布

応答時間の分布

##### 箱ひげ図

四分位数と外れ値

サービスごとの応答時間

##### ウォーターフォールチャート

合計への寄与

年間経常収益のブリッジ

##### カレンダーヒートマップ

日々のアクティビティ

日ごとのコミット数

##### ブレットグラフ

KPI と目標の比較

四半期の KPI と目標

##### 円形棒グラフ

進捗リング

四半期目標の進捗

##### ガントチャート

スケジュールと進捗

リリース計画

##### サンバースト図

入れ子の階層

部門・チームごとの人数

##### サンキー図

段階間のフロー

流入元ごとの訪問から登録まで

##### トレーディングチャート

ローソク足・価格帯別出来高・パンとズーム

BTC/USDT の 1 時間足と移動平均、出来高、価格帯別出来高

##### テクニカル指標

21 種類の指標

BTC/USDT の日足と SuperTrend、MACD

##### デプスチャート

買い・売りの累積数量

リアルタイムの市場の厚み

##### 板情報

リアルタイムの価格ラダー

リアルタイムの板情報

##### 板ヒートマップ

流動性の推移

直近 30 秒の流動性ヒートマップ

##### 歩み値

約定履歴

最新の約定

##### 3D 散布図

3 次元のクラスター

3D 空間の 3 つの点群

##### 3D 折れ線グラフ

軌跡

3D のらせん軌跡

##### 3D サーフェスチャート

z = f(x, y)、地形

波紋のサーフェス

##### 3D 棒グラフ

カテゴリ格子上の値

地域・四半期ごとの売上

##### ネットワーク図

サービス間の呼び出し

マイクロサービスとその呼び出し関係のネットワーク

##### アークダイアグラム

一緒に挙がる話題

同じチケットに現れる頻度で結ばれたサポートの話題

##### 依存関係グラフ

パイプラインとクリティカルパス

データパイプラインの手順と依存関係、クリティカルパス

##### 組織図

レポートライン

CEO から各チームまでの組織図

##### マインドマップ

テーマをめぐるアイデア

夏の旅行のマインドマップ

##### コードダイアグラム

グループ間のフロー

四半期中のプラン間の顧客の移動

##### 光る 3D の点

加算合成のグロー

光る星でできた渦巻銀河

負荷

売上

売上の推移

エラー

エラーの推移

ユーザー

稼働スコア

緊急度

重要度

新規訪問者

リピーター

モバイル

デスクトップ

タブレット

ページビュー

訪問者

注文

コンバージョン率

{{metric}}（過去 30 日）

日別の新規訪問者とリピーター（積み上げ）

デバイス別の訪問者

閲覧数の多いページ

メール

チャット

電話

SNS

コミュニティ

パレット

テーマ

色覚配慮

ブルー

暖色

チャネル別・四半期ごとのサポート依頼

チャネル別のサポート依頼の割合

気温

開発者

成長率

リーチ

ゲートウェイ

検索

決済

画像

昨年

新規顧客

アップセル

解約

価格改定

今年

売上（千ドル）

利益率（%）

満足度

売上

アクティブユーザー

継続率

調査

設計

開発

テスト

不良

普通

良好

最大値

第 3 四分位数

中央値

第 1 四分位数

最小値

外れ値

リクエスト数

応答時間

金額

今日

タスク

進捗

エンジニアリング

プラットフォーム

Web

モバイル

営業

EMEA

南北アメリカ

オペレーション

サポート

財務

検索

ソーシャル

メール

ウェブサイト

登録済み

離脱

{{value}} 人

価格

始値

高値

安値

終値

クラスター {{name}}

軌跡

波紋

売上

北部

南部

東部

西部

顧客 {{value}} 人

中心部

渦状腕

API ゲートウェイ

Web アプリ

認証

ユーザー

注文

決済

検索

在庫

データベース

キャッシュ

キュー

エッジ

サービス

データ

ログイン

請求

エクスポート

モバイル

速度

通知

抽出

クレンジング

付加

結合

学習

レポート

公開

CEO

CTO

CFO

COO

基盤

プロダクト

経理

営業

サポート

夏の旅行

移動

宿泊

食事

アクティビティ

電車

レンタカー

ホテル

キャンプ

市場

レストラン

美術館

ハイキング

ビーチ

無料

スターター

プロ

エンタープライズ

## Chart

Support: beta

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Chart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Data series; each sets its own `type`"
  },
  {
    "name": "yAxis2",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"` (dual axis charts)"
  },
  {
    "name": "stackMode",
    "source": "packages/taro/src/charts.tsx",
    "kind": "enum",
    "values": [
      "normal",
      "percent"
    ],
    "typeText": "\"normal\" | \"percent\" | undefined",
    "typeRef": "type:2d2343824f816d71127f",
    "default": "normal",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x"
  },
  {
    "name": "orientation",
    "source": "packages/taro/src/charts.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side"
  },
  {
    "name": "height",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes). Mini-programs have no `<html lang>`: pass the app language"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart (needed to pan a zoomed chart or drag points)"
  },
  {
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:980cbee566a575ab834d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the touched (or hovered) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:054b6d565969c517cbb1",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:02c2f014ba9839a6e936",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:6871f590139907a5872c",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## ShapeChart

Support: beta

Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options. No keyboard navigation and no React tooltip content: tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ShapeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "ShapeChartOptions",
    "typeRef": "type:54137e999ba8be2bca01",
    "required": true,
    "description": "Options of the chart, by `type` (every shape type of the engine)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onDrill",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeDrillEvent) => void) | undefined",
    "typeRef": "type:db725d51ab265e055e94",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeDrillEvent",
        "typeRef": "type:2f6344534a4b788a1925"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a sunburst drills into a parent or back up"
  },
  {
    "name": "onHover",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:348e97229a786720de93",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (tap, or the mouse on H5)"
  },
  {
    "name": "onClick",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:2f0a619712ca66b7ac75",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:5e77e83d29468fb39c06",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
