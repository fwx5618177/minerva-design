# Icon アイコンコンポーネント

セットのアイコン 1 つ。既定はインライン SVG、または WebGPU、WebGL2、WebGL、Canvas2D で描画するキャンバスです。名前付きコンポーネント（SearchIcon…）、汎用の Icon、カスタムアイコン、名前で選ぶアイコン。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG かキャンバスか

既定ではアイコンはインラインの  です。サーバーで描画でき、currentColor でテキストの色に、size="1em" でフォントサイズに追従し、title か aria-label がない限り支援技術からは隠されます。

renderer を "auto"、"webgpu"、"webgl2"、"webgl"、"canvas2d" にすると、同じアイコンがキャンバスに描画されます。ブラウザーは同時に存在できる WebGL コンテキストを約 16 個に制限しているため、キャンバスアイコンはページごとに 1 つのバックエンドを共有します。変化したアイコンをアトラスにまとめ、1 回のパスで描画してから各キャンバスにコピーします。"auto" はグローバルの既定値（setDefaultIconRenderer）に従い、このページではレンダラーバーに従います。

バンドルされるのはインポートしたものだけです。SearchIcon は自身のパスデータだけを含み、キャンバスレンダラーは最初のキャンバスアイコンとともに読み込まれ、DynamicIcon（名前を実行時に選ぶ）だけがセット全体をバンドルします。

### React Native とミニプログラム

minerva-design/native/icons は React Native 向けに同じコンポーネント（Icon、createIcon、DynamicIcon、SearchIcon…）を提供し、同じ 24×24 のパスデータを react-native-svg で描画します。react-native-svg はこのエントリーだけが必要とするオプションの peer 依存関係です（minerva-design/native はインポートしません）。Expo では npx expo install react-native-svg、それ以外では npm install react-native-svg でインストールします。color を指定しない限りテーマのテキスト色で描線し、size の単位は dp、title を指定するとアクセシブルな画像になります。

minerva-design/taro/icons は Taro 向けです。ミニプログラムはインライン SVG を描画できず、WeChat の  はパーセントエンコードされた SVG を受け付けないため、各アイコンは base64 の SVG データ URI を src とする Image です（toSvgBase64DataUri、btoa 不要）。画像には currentColor がないため、色は SVG に直接書き込まれます。既定はアクティブなライト／ダークモードのテーマのテキスト色で、色やモードが変わると画像を再生成します。size の単位は px、または "48rpx" のような任意の CSS 長さです。

ミニプログラムの tabBar は PNG か JPG しか受け付けません。ビルド時に toSvg の出力から、好みの SVG ラスタライザーで生成してください（アイコン、色、状態ごとに 1 ファイル）。Minerva はラスタライザーを同梱していません。

起動中…

```tsx
// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set
```

```tsx
import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode
```

```ts
// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(`src/assets/tab-home-${state}.png`, await rasterize(svg));
}
```

## Icon

Support: n/a

Web icon component (inline SVG or a WebGPU / WebGL / Canvas2D canvas): no native counterpart yet; draw the same icon data of minerva-design/icons/core (iconPathData, toSvg, toSvgDataUri, toSvgBase64DataUri) with the platform's SVG or image support.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
