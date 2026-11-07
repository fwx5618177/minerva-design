# アイコン

Minerva のアイコンセット。ライブラリのために 24×24 グリッド上で描き起こしたオリジナルのアイコンで、既定ではインライン SVG として描画され、Canvas2D、WebGL、WebGL2、WebGPU のキャンバスにも描画できます。

Package: minerva-design@1.22.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 概要

minerva-design/icons は {{categories}} カテゴリ、{{count}} 個のアイコンを収録し、サードパーティのアイコンセットは使いません。すべてのアイコンはライブラリ独自の SVG パスデータで、どのレンダラー・どのフレームワークでも同じデータを使います。

統一されたビジュアル言語。24×24 グリッド、約 2px の余白、丸い線端と結合部を持つ 2px のストローク、塗りなし。テキストと自然になじみ、12 から 96 ピクセルまで拡大縮小できます。一部のアイコンはストロークごとに色（colors）を持ち、それ以外は color プロパティに従います。

既定は SVG。どのサイズでも鮮明で、サーバーで描画でき、テキストの色（currentColor）で着色され、title を指定しない限り支援技術からは隠されます。

同じジオメトリを GPU でも。Icon は renderer="auto"、"webgpu"、"webgl2"、"webgl"、"canvas2d" でキャンバスに描画し、IconCanvas は数千個のアイコンを数回のインスタンス描画で描きます。フォールバックはチャートと同じ WebGPU -> WebGL2 -> WebGL -> Canvas2D です。

使った分だけ。各アイコンは個別の定数（searchIcon）とコンポーネント（SearchIcon）で、キャンバスレンダラーは最初のキャンバスアイコンが現れたときに初めて読み込まれます。

フレームワーク非依存のコア。minerva-design/icons/core にはアイコンデータ、SVG 文字列、Canvas2D 描画、GPU キャンバスが含まれ、どのフレームワークでも使えます。React コンポーネントはこの上に構築されています。

コンポーネントは Icon、GPU での一括描画は IconCanvas、フレームワーク非依存の API は アイコンコア を参照してください。

アイコンを検索

名前またはタグで検索…

カテゴリ

すべてのカテゴリ

サイズ

線幅

描画方式

SVG

キャンバス

{{code}} をコピー

{{code}} をコピーしました

{{code}} をコピーできません：クリップボードを利用できません

種類

すべての種類

単色

カラー

色

文字色

プライマリ

成功

警告

危険

{{n}} 個のアイコン

「{{query}}」に一致するアイコンはありません

矢印

操作

インターフェース

メディア

ファイル

コミュニケーション

データとチャート

金融

ステータス

デバイス

天気

自然

食べ物

人物

場所

図形

テキスト

教育

健康

ショッピング

音楽

ツール

スポーツ

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
