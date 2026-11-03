# Icon

One icon of the set: inline SVG by default, or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D. Named components (SearchIcon…), the generic Icon, custom icons and icons chosen by name.

Package: minerva-design@1.20.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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

Support: n/a

Web icon component (inline SVG or a WebGPU / WebGL / Canvas2D canvas): no native counterpart yet; draw the same icon data of minerva-design/icons/core (iconPathData, toSvg, toSvgDataUri, toSvgBase64DataUri) with the platform's SVG or image support.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
