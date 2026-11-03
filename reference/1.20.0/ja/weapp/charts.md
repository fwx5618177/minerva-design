# チャート

WebGPU・WebGL2・WebGL（フォールバックは Canvas2D）で描画し、数百万ポイントでも 60 fps を保つ GPU アクセラレーションのチャート：推移、比較、統計、構成比、階層とフロー、ネットワーク・依存関係・ツリー、金融・トレーディング、3D をカバーします。Chart は折れ線・面・棒・散布図・ローソク足・ヒートマップの系列を組み合わせられ、その他のコンポーネントは 1 種類のチャートのプリセットです。まずは下のギャラリーから：すべてのチャートタイプをライブのサムネイルで紹介し、それぞれのページへリンクしています。

Package: minerva-design@1.20.0

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Mixed line/area/bar/scatter series on a <canvas type="2d"> (DOM-free canvas engine): axes, legend with tap-to-toggle, tooltip, crosshair, annotations, tap/scrub hover, pan when zoomed, pinch zoom, double-tap reset, point dragging, Minerva theme/palette/design tokens from the nearest provider. Properties are serialized by setData: data must be JSON (timestamps instead of Date, no typed arrays) and large data sets cost a copy per update. Function options (axis format, tooltip text) use configure(); tooltips are canvas text, not ReactNode content. No renderer choice, wheel or keyboard navigation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/chart/index",
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
    "default": 320
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
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
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
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "labels",
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
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
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
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## ShapeChart

Support: beta

Any shape type of the engine (pie, radar, gauge, funnel, treemap and the newer types) from a serializable options property. Same as PieChart; function options go through configure(). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/shape-chart/index",
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
    "name": "options",
    "typeText": "unknown",
    "required": false,
    "default": null
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
