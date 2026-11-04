# Icon 图标组件

图标集中的单个图标：默认为内联 SVG，也可以是由 WebGPU、WebGL2、WebGL 或 Canvas2D 绘制的画布。包括具名组件（SearchIcon…）、通用的 Icon、自定义图标以及按名称选择的图标。

Package: minerva-design@1.20.3

Renderer: native

Locale: zh

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

### SVG 还是画布

默认情况下，图标是一个内联 ：它可在服务端渲染，通过 currentColor 跟随文字颜色，设置 size="1em" 时跟随字号；除非设置了 title 或 aria-label，否则对辅助技术隐藏。

将 renderer 设为 "auto"、"webgpu"、"webgl2"、"webgl" 或 "canvas2d" 时，同一个图标会绘制在画布上。浏览器将同时存活的 WebGL 上下文限制在 16 个左右，因此同一页面的画布图标共享一个后端：发生变化的图标被打包进一张图集，一次绘制完成后再复制到各自的画布。"auto" 跟随全局默认值（setDefaultIconRenderer），在本页即渲染器栏。

只打包你导入的内容：SearchIcon 只带上自己的路径数据，画布渲染器随第一个画布图标加载，而 DynamicIcon（名称在运行时决定）是唯一会打包整套图标的组件。

### React Native 与小程序

minerva-design/native/icons 为 React Native 提供同一套组件（Icon、createIcon、DynamicIcon、SearchIcon…），使用 react-native-svg 绘制相同的 24×24 路径数据。react-native-svg 是可选的 peer 依赖，只有这个入口需要它（minerva-design/native 从不导入它）：在 Expo 中用 npx expo install react-native-svg 安装，其他项目用 npm install react-native-svg。图标默认使用主题的文字颜色描边（可用 color 覆盖），size 的单位是 dp，设置 title 后图标成为可访问的图片。

minerva-design/taro/icons 为 Taro 提供这些组件。小程序无法渲染内联 SVG，微信的  也不接受百分号编码的 SVG，因此每个图标都是一个 Image，其 src 为 base64 编码的 SVG data URI（toSvgBase64DataUri，不依赖 btoa）。图片没有 currentColor：颜色直接写入 SVG，默认是当前浅色或深色模式下主题的文字颜色，颜色或模式变化时会重新生成图片。size 的单位是 px，也可以是任意 CSS 长度，例如 "48rpx"。

小程序的 tabBar 只接受 PNG 或 JPG 文件：请在构建时用你选择的 SVG 光栅化工具，从 toSvg 的输出生成这些文件（每个图标、颜色和状态各一个）。Minerva 不内置光栅化工具。

启动中…

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

## Example: 基础用法

每个图标都是以其名称命名的组件；图标可以与文字同行显示，也可以放在按钮中。

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
