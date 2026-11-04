# アイコンコア

minerva-design/icons/core：フレームワークに依存しないアイコンセット。SVG 文字列、Canvas2D 描画、GPU キャンバス、カスタムアイコン、レンダラーのグローバル既定値、そして GPU バックエンドを支えるジオメトリパイプライン。

Package: minerva-design@1.20.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### フレームワーク非依存

コアのインポートには副作用がなく、何かを描画するまでブラウザー API に触れないため、サーバーコード、Worker、あらゆるフレームワーク、素のスクリプトで動作します。アイコンは { name, paths, category, tags } というプレーンなオブジェクトです。

React、Vue、Angular、Web Components、React Native（minerva-design/native/icons）、Taro（minerva-design/taro/icons）のコンポーネントはこのコアの上の薄いレイヤーです。その他のフレームワークには toSvg と createIconCanvas が使えます。

{{backend}} で描画

レンダラーを起動中…

次のアイコン

createIconCanvas で描画した 30 個のアイコン

アイコン

許容誤差

{{name}} アイコンの三角形

三角形 {{triangles}} 個、中心線の点 {{points}} 個

```ts
// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
