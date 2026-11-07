# Icon アイコンコンポーネント

セットのアイコン 1 つ。既定はインライン SVG、または WebGPU、WebGL2、WebGL、Canvas2D で描画するキャンバスです。名前付きコンポーネント（SearchIcon…）、汎用の Icon、カスタムアイコン、名前で選ぶアイコン。

Package: minerva-design@1.22.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "name",
    "typeText": "string | undefined",
    "attribute": "name",
    "required": false
  },
  {
    "name": "size",
    "typeText": "number",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "attribute": "color",
    "required": false
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "attribute": "stroke-width",
    "required": false
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "attribute": "absolute-stroke-width",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "renderer",
    "typeText": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "IconDefinition | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon.ts",
    "className": "MinervaIcon",
    "summary": "Icon of the Minerva icon set, as inline SVG or on a GPU canvas.",
    "description": "An icon of minerva-design/icons (the `<Icon>` of React): inline SVG by default (crisp at any size, styled by CSS, server-renderable), or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D (`renderer`) by a backend shared by every canvas icon of the page. Set a built-in icon by `name` (`search`, `arrow-up`...) or any icon, custom ones made with `defineIcon` included, as the `icon` property. The stroke follows the text color unless `color` is set. Without `label` the icon is decorative (hidden from assistive technologies); with one it is an image with that accessible name. In canvas mode the host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon` (not part of the all-in-one entry nor of `cdn/minerva.js`: it loads the icon set `minerva-design/icons/core`). Without a build step, load the self-contained `dist/web-components/cdn/icon.js` next to `minerva.js`.",
    "properties": [
      {
        "name": "name",
        "attribute": "name",
        "type": "string | undefined",
        "description": "Name of a built-in icon (`search`, `arrow-up`...); the `icon` property wins over it"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "number",
        "default": "24",
        "description": "Width and height in pixels"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "string",
        "default": "\"currentColor\"",
        "description": "Stroke color, any CSS color (`currentColor` follows the text color)"
      },
      {
        "name": "strokeWidth",
        "attribute": "stroke-width",
        "type": "number",
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size unless `absolute-stroke-width`)"
      },
      {
        "name": "absoluteStrokeWidth",
        "attribute": "absolute-stroke-width",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the stroke width in pixels whatever the size"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name: the icon becomes an image (role=img); without it the icon is hidden from assistive technologies"
      },
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"svg\"",
        "description": "`svg` (inline SVG), or a canvas drawn with the backend preference (`auto` follows the page default)"
      },
      {
        "name": "icon",
        "type": "IconDefinition | undefined",
        "description": "Icon definition (a built-in icon constant, or a custom icon of `defineIcon`); wins over `name`; property only"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing the canvas (`webgpu`, `webgl2`, `webgl`, `canvas2d`); `null` in SVG mode or until drawn"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "icon",
        "description": "The <svg> (or the <canvas> in canvas mode) drawing the icon"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

<minerva-icon> は組み込みアイコンを名前で描画し、テキストと並べたり、ほかの要素のスロットに入れたりできます。label を指定すると、支援技術には画像として伝わります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
  <minerva-icon name="home"></minerva-icon>
  <minerva-icon name="search"></minerva-icon>
  <minerva-icon name="settings"></minerva-icon>
  <minerva-button>
    <minerva-icon slot="start" name="download" size="16"></minerva-icon>
    Download
  </minerva-button>
  <minerva-button color="danger" variant="outline">
    <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
    Delete
  </minerva-button>
  <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
</div>

```

## Example: レンダラー

renderer 属性でアイコンをキャンバスに描画します。各アイコンは描画したバックエンドを付けて minerva-renderer-change を発火し、その名前を下に表示します。"auto" はレンダラーバーに従い、このブラウザーにない強制指定のバックエンドは次のものにフォールバックします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/canvas.html

```html
<div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
    ></minerva-icon>
    <figcaption><code>svg</code> <small>SVG</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="auto"
    ></minerva-icon>
    <figcaption><code>auto</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgpu"
    ></minerva-icon>
    <figcaption><code>webgpu</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl2"
    ></minerva-icon>
    <figcaption><code>webgl2</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl"
    ></minerva-icon>
    <figcaption><code>webgl</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="canvas2d"
    ></minerva-icon>
    <figcaption><code>canvas2d</code> <small>…</small></figcaption>
  </figure>
</div>

```

### apps/docs/src/docs/pages/icon/wc/canvas.ts

```tsx
// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).
import type { MinervaIcon } from "minerva-design/web-components/icon";

export function setup(root: HTMLElement) {
  const onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
  root.addEventListener("minerva-renderer-change", onChange);
  return () => root.removeEventListener("minerva-renderer-change", onChange);
}

```
