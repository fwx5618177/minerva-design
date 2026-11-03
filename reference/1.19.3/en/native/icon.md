# Icon

One icon of the set: inline SVG by default, or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D. Named components (SearchIcon…), the generic Icon, custom icons and icons chosen by name.

Package: minerva-design@1.19.3

Renderer: native

Locale: en

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

### SVG or canvas

By default an icon is an inline : it renders on the server, follows the text color through currentColor and the font size with size="1em", and is hidden from assistive technologies unless it has a title or an aria-label.

With renderer set to "auto", "webgpu", "webgl2", "webgl" or "canvas2d", the same icon is drawn on a canvas. Browsers cap live WebGL contexts at about 16, so canvas icons share one backend per page: the icons that changed are packed into an atlas, drawn in one pass and copied to their canvases. "auto" follows the global default (setDefaultIconRenderer), here the renderer bar.

Only what you import is bundled: SearchIcon brings its own path data, the canvas renderers load with the first canvas icon, and DynamicIcon (names chosen at runtime) is the only component that bundles the whole set.

### React Native and mini programs

minerva-design/native/icons has the same components for React Native (Icon, createIcon, DynamicIcon, SearchIcon…), drawn with react-native-svg from the same 24×24 path data. react-native-svg is an optional peer dependency needed by this entry only (minerva-design/native never imports it): install it with npx expo install react-native-svg, or npm install react-native-svg outside Expo. Icons stroke with the theme's text color unless color is set, size is in dp, and a title makes the icon an accessible image.

minerva-design/taro/icons has them for Taro. Mini programs cannot render inline SVG and the WeChat  rejects percent-encoded SVG, so each icon is an Image of a base64 SVG data URI (toSvgBase64DataUri, which needs no btoa). An image has no currentColor: the color is written into the SVG, by default the theme's text color of the active light or dark mode, and the image is rebuilt when the color or the mode changes. size is in px, or any CSS length such as "48rpx".

The tabBar of a mini program only takes PNG or JPG files: generate them at build time from toSvg (one file per icon, color and state) with the SVG rasterizer of your choice. Minerva ships no rasterizer.

starting…

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

## Example: Basic

Every icon is a component named after it; icons sit inline with text and inside buttons.

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
