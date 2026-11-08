# IconCanvas アイコンキャンバス

1 つのキャンバスに多数のアイコンを、WebGPU、WebGL2、WebGL による数回のインスタンス描画、または Canvas2D で描画します。密度の高い図、地図、パーティクル、数千個のアイコンのアニメーションに。

Package: minerva-design@1.23.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 描画のしくみ

IconCanvas は位置、サイズ、回転、色、不透明度を CSS ピクセルで指定してアイコンを配置し、利用できる最適なバックエンド（WebGPU -> WebGL2 -> WebGL -> Canvas2D）で 1 つのキャンバスにまとめて描画します。

ジオメトリ：各アイコンをデバイスピクセルの 4 分の 1 以内の精度で平坦化し、ストロークを三角形に変換します（セグメントごとに四角形 1 つ、結合部と線端には円形のファン）。アイコン、線幅、詳細度の組み合わせごとに 1 回だけ行います。

バッチ処理：すべてのメッシュは 1 つの頂点バッファーに置かれ、各アイコンは 1 つのインスタンス（位置、サイズ、回転、色）です。同じアイコンが連続すれば 1 回のインスタンス描画呼び出しになります。

品質：4× MSAA でエッジを滑らかにし、アイコンごとの深度テストでアイコンの各ピクセルを 1 回だけ描くため、半透明のアイコンも SVG のストロークとまったく同じように合成されます。

堅牢性：auto はソフトウェア GPU をスキップし、GPU コンテキストが失われるとバックエンドを再起動します（2 回失われたバックエンドはスキップ）。キャンバスのルート要素は data-renderer でバックエンドを示します。

インターフェース内のアイコンには Icon を使ってください。SVG のほうが軽く、アクセシブルで、サーバーで描画できます。アイコンそのものが絵になる場合に IconCanvas を使います。

アイコン数

一時停止

再生

一時停止中

{{fps}} フレーム/秒

{{backend}} で描画

レンダラーを起動中…

アニメーションする {{n}} 個のアイコン

{{backend}} で描画した 40 個のアイコン

{{backend}} で描画

{{backend}} にフォールバック

## IconCanvas

Support: n/a

Web icon component (inline SVG or a WebGPU / WebGL / Canvas2D canvas): no native counterpart yet; draw the same icon data of minerva-design/icons/core (iconPathData, toSvg, toSvgDataUri, toSvgBase64DataUri) with the platform's SVG or image support.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
