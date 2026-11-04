# チャートエンジン

React チャートを支えるフレームワーク非依存のエンジン。createChart は任意の要素にチャートをマウントし、createCanvasChart は任意の 2D キャンバス（ミニプログラム、OffscreenCanvas）に描画し、createChartController はキャンバスのないホスト向けにシーンを計算します。createShapeChart と createCanvasShapeChart は、円、ドーナツ、レーダー、ゲージ、ファネル、ツリーマップ、サンバースト、サンキー、コードダイアグラム、円形棒グラフ、ブレットグラフ、カレンダーヒートマップを同じように描画します。その他の種類には専用のエンジンがあります：createTradingChart、createDepthChart / createOrderBook / createOrderBookHeatmap / createTimeAndSales、createChart3D、createGraphChart。setDefaultChartRenderer() はすべての GPU チャートのバックエンドを設定します。

Package: minerva-design@1.20.2

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

#### どのエントリーポイントを使うか

3 つのエントリーポイントは同じオプション、レイアウト、ヒットテスト、ジェスチャーを共有します。違いはホストに求めるものです：

createChart(container, options)：Web ページ向け。DOM 要素にチャートをマウントし、WebGPU、WebGL2、WebGL、Canvas2D の順でデータを描画し、アクセシブルな DOM のツールチップと凡例を表示し、CSS 変数からテーマを読み取り、ホイール・ポインター・キーボード入力を自身で処理します。

createCanvasChart({ canvas, width, height, pixelRatio, options, theme })：DOM をまったく使わず任意の 2D キャンバスに描画します（WeChat / Taro / uni-app の canvas type="2d"、OffscreenCanvas、通常の ）。ツールチップや凡例を含むすべてをキャンバスに描画し、ホストはタッチまたはポインターイベントを転送し、テーマを通常の値として渡します。ミニプログラムのチャートはこれを基にしています。

createChartController({ options, measureText })：キャンバスを一切使いません。シーン（レイアウト、目盛り、凡例、ツールチップ、ハイライト）を計算してジェスチャーを処理します。scenePrimitives(scene) はデータを上限付きのピクセル図形のリストに変換し、ビューや SVG で描画するホストで使えます。React Native のチャートはこれを基にしています。

#### 象限ヘルパー

quadrantChartOptions(config) は任意のエントリーポイント向けに QuadrantChart のエンジンオプションを生成します。quadrantOf(config, x, y) はデータ位置が画面上でどの象限にあるか（reverseX を考慮）を返し、quadrantCenter(config, corner) は象限の中心を返します。新しい点やドロップされた点の配置などに使えます。quadrantGroups(config) は各象限の点とインデックスを返し、quadrantCountText(showCounts, points, locale) は象限の件数テキストを生成し、quadrantLabels(locale) はアクセシブルな点レイヤーの組み込みテキストを返します。createQuadrantPointLayer(host, options) は任意の DOM レンダラーにこのレイヤー（象限ごとの点ボタンのリスト、矢印キーによる点間の移動、Shift + 矢印キーによるフォーカス中の点の隣接象限への移動、移動を読み上げるライブリージョン）をマウントします。 createQuadrantPointCard(host, options) は任意の DOM レンダラーにマトリクスの点カードをマウントします（ホバー、フォーカス、ドラッグ中の点、またはボードで選択中の点に 1 枚のガラスカード：点の上のドット、名前、象限、ホストのアクション）。withQuadrantCard(options) はその横のエンジンのツールチップ、ラベルチップ、ドラッグピルをオフにします。QUADRANT_CARD_LINGER_MS はポインターがドットを離れてからカードが残る時間です。quadrantKeyTarget(event, corner) は Shift + 矢印キーの移動先の象限を、quadrantAccessibleGroups(config, locale) は DOM のないホスト向けに各点の名前・ラベル・移動操作を返します。タスクボード（各レンダラーの QuadrantTaskBoard）もロジックを共有しています。QUADRANT_CORNERS は 4 つの角の一覧、quadrantTaskLabels(locale, overrides) はボタンとパネルのローカライズ済みテキスト、newQuadrantTaskDraft / editQuadrantTaskDraft は追加・編集パネルの内容を作り、canSaveQuadrantTask と applyQuadrantTaskDraft がそれを検証・適用します。moveQuadrantTask と removeQuadrantTask は次のポイント一覧を、selectionAfterRemove は削除後の選択を、quadrantTaskDeleteText は削除確認の文言を返し、QUADRANT_TASK_ICONS は追加・編集・削除アイコンのパス、placeQuadrantTaskPanel(anchor, panel, board) はその場で開く追加・編集・削除パネルのアンカー横の位置（下に、余白がなければ上に、ボード内に収めて）を、quadrantTaskColor(quadrants, corner) は象限の色を、quadrantTaskIconUri(kind, color) はそれらのアイコンを画像で描くホスト（ミニプログラム）向けの base64 SVG data URI を返します。

ダウンロード数

リリースごとのダウンロード数

非対応

{{release}}：{{downloads}} ダウンロード

棒をクリックしてください

レンダラー：{{renderer}}

訪問数

登録数（×10）

月ごとの訪問数と登録数

点をクリックしてください

検索

ダイレクト

ソーシャル

メール

参照元サイト

訪問

登録

トライアル

顧客

流入元別の訪問数

訪問

コンバージョンファネル

円

ドーナツ

ファネル

{{name}}：{{value}}（{{share}}）

スライスまたは段階をクリックしてください

CPU

秒

ライブの CPU 使用率

再開

一時停止

一時停止中 · {{points}} ポイント受信

受信中 · {{points}} ポイント受信

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
