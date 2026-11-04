# Icon アイコンコンポーネント

セットのアイコン 1 つ。既定はインライン SVG、または WebGPU、WebGL2、WebGL、Canvas2D で描画するキャンバスです。名前付きコンポーネント（SearchIcon…）、汎用の Icon、カスタムアイコン、名前で選ぶアイコン。

Package: minerva-design@1.20.5

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Icon, DynamicIcon, createIcon and the named icons (SearchIcon…) of minerva-design/native/icons, a separate entry drawn with react-native-svg (optional peer dependency); no canvas renderer.

### Import

```json
{
  "specifier": "minerva-design/native/icons",
  "exports": [
    "Icon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "source": "packages/native/src/icon/types.ts",
    "kind": "object",
    "typeText": "IconDefinition",
    "typeRef": "type:2663909377d12299fe71",
    "required": true,
    "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result"
  },
  {
    "name": "size",
    "source": "packages/native/src/icon/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 24,
    "required": false,
    "description": "Width and height in dp"
  },
  {
    "name": "color",
    "source": "packages/native/src/icon/types.ts",
    "kind": "union",
    "typeText": "ColorValue | undefined",
    "typeRef": "type:602aadca1cc5b15e53f9",
    "required": false,
    "description": "Stroke color (any React Native `ColorValue`, e.g. the `color` of a navigation `tabBarIcon`); per-path `colors` of the icon win"
  },
  {
    "name": "strokeWidth",
    "source": "packages/native/src/icon/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Stroke width on the 24×24 grid (scales with the size)"
  },
  {
    "name": "absoluteStrokeWidth",
    "source": "packages/native/src/icon/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps `strokeWidth` in dp whatever the size"
  },
  {
    "name": "title",
    "source": "packages/native/src/icon/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name: the icon becomes an `image` with this label; without it (or an `accessibilityLabel`) the icon is hidden from assistive technologies"
  }
]
```

## API

```json
{
  "native:IconProps": {
    "source": "native/src/icon/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<SvgProps, | \"color\" | \"stroke\" | \"strokeWidth\" | \"fill\" | \"width\" | \"height\" | \"viewBox\" | \"title\" | \"children\" | \"name\">"
    ],
    "props": [
      {
        "name": "icon",
        "type": "IconDefinition",
        "required": true,
        "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Width and height in dp"
      },
      {
        "name": "color",
        "type": "ColorValue",
        "required": false,
        "default": "the theme's text color (`text-color` token)",
        "description": "Stroke color (any React Native `ColorValue`, e.g. the `color` of a navigation `tabBarIcon`); per-path `colors` of the icon win"
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size)"
      },
      {
        "name": "absoluteStrokeWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps `strokeWidth` in dp whatever the size"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Accessible name: the icon becomes an `image` with this label; without it (or an `accessibilityLabel`) the icon is hidden from assistive technologies"
      }
    ]
  },
  "native:DynamicIconProps": {
    "source": "native/src/icon/types.ts",
    "kind": "interface",
    "extends": [
      "NamedIconProps"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of a built-in icon (e.g. `\"arrow-up\"`); unknown names render nothing"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

各アイコンはその名前のコンポーネントです。テキストの中にもボタンの中にも並べられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/icon/native/basic.tsx

```tsx
import { Text, View } from "react-native";
import {
  BellRingIcon,
  CalendarCheckIcon,
  DynamicIcon,
  Icon,
  ListTodoIcon,
  NotebookPenIcon,
  SearchIcon,
  paletteIcon,
} from "minerva-design/native/icons";

const tabs = ["home", "repeat", "notebook-pen", "library", "user-round"];

export default function Basic() {
  return (
    <View style={{ gap: 20 }}>
      {/* 24dp, stroked with the theme's text color */}
      <View style={{ flexDirection: "row", gap: 16 }}>
        <SearchIcon />
        <CalendarCheckIcon />
        <ListTodoIcon />
        <NotebookPenIcon />
        <BellRingIcon />
      </View>
      {/* size, color, stroke width and an accessible name */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <SearchIcon size={16} />
        <SearchIcon size={32} color="#2563eb" title="Search" />
        <Icon icon={paletteIcon} size={40} strokeWidth={1.5} color="#db2777" />
      </View>
      {/* icons chosen by name (bundles the whole set) */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {tabs.map((name, i) => {
          const color = i === 0 ? "#4f46e5" : "#737373";
          return (
            <View key={name} style={{ alignItems: "center", gap: 4 }}>
              <DynamicIcon name={name} size={22} color={color} />
              <Text style={{ fontSize: 11, color }}>{name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

```
