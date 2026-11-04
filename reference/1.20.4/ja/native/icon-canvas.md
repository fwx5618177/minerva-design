# IconCanvas アイコンキャンバス

1 つのキャンバスに多数のアイコンを、WebGPU、WebGL2、WebGL による数回のインスタンス描画、または Canvas2D で描画します。密度の高い図、地図、パーティクル、数千個のアイコンのアニメーションに。

Package: minerva-design@1.20.4

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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
