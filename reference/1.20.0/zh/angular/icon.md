# Icon 图标组件

图标集中的单个图标：默认为内联 SVG，也可以是由 WebGPU、WebGL2、WebGL 或 Canvas2D 绘制的画布。包括具名组件（SearchIcon…）、通用的 Icon、自定义图标以及按名称选择的图标。

Package: minerva-design@1.20.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnIcon. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnIcon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "typeText": "IconDefinition",
    "required": true,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "size",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "renderer",
    "typeText": "IconRenderer",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "typeText": "IconRendererKind",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "IconRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Named icons in buttons

Pass an icon constant of minerva-design/icons/core: only the icons used are bundled. Icons follow the text color and are hidden from assistive technologies unless they have a title (or aria-label).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIcon, MnButton, MnStack } from 'minerva-design/angular';
import { homeIcon, searchIcon, settingsIcon, bellIcon, downloadIcon, trashIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIcon, MnButton, MnStack],
  template: `
<ng-template #download><mn-icon [icon]="downloadIcon" size="16" /></ng-template>
<ng-template #trash><mn-icon [icon]="trashIcon" size="16" /></ng-template>
<mn-stack direction="row" wrap gap="4" align="center">
  <mn-icon [icon]="homeIcon" />
  <mn-icon [icon]="searchIcon" />
  <mn-icon [icon]="settingsIcon" />
  <button mnButton [startIcon]="download">Download</button>
  <button mnButton color="danger" variant="outline" [startIcon]="trash">Delete</button>
  <mn-icon [icon]="bellIcon" size="32" title="Notifications" />
</mn-stack>
  `,
})
export class Example {
  homeIcon = homeIcon;
  searchIcon = searchIcon;
  settingsIcon = settingsIcon;
  bellIcon = bellIcon;
  downloadIcon = downloadIcon;
  trashIcon = trashIcon;
}

```

## Example: Renderers

renderer draws the icon on a canvas shared by every canvas icon of the page; rendererChange reports the backend that drew it (a forced backend that cannot start falls back to the next one, auto follows setDefaultIconRenderer). The canvas renderers load with the first canvas icon.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIcon, MnStack } from 'minerva-design/angular';
import { settingsIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIcon, MnStack],
  template: `
<mn-stack direction="row" wrap gap="5">
  @for (renderer of renderers; track renderer) {
    <mn-stack gap="1" align="center">
      <mn-icon
        [icon]="settingsIcon"
        [size]="40"
        color="var(--primary-color)"
        [renderer]="renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === 'svg' ? 'SVG' : (drawn[renderer] ?? '…') }}</small>
    </mn-stack>
  }
</mn-stack>
  `,
})
export class Example {
  settingsIcon = settingsIcon;
  renderers: import('minerva-design/angular').IconRenderer[] = ["svg", "auto", "webgpu", "webgl2", "webgl", "canvas2d"];
  drawn: Partial<Record<string, string>> = {};
}

```

## Example: Icons by name

MnDynamicIcon resolves a built-in icon by name at runtime and renders nothing for unknown names. It bundles the whole set: prefer MnIcon with an icon constant when the icon is known.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDynamicIcon, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDynamicIcon, MnStack],
  template: `
<ul mnStack gap="2" style="margin: 0; padding: 0; list-style: none">
  @for (service of services; track service.name) {
    <li style="display: flex; align-items: center; gap: 8px">
      <mn-dynamic-icon [name]="service.icon" [size]="18" />
      <span style="min-width: 80px">{{ service.name }}</span>
      <mn-dynamic-icon
        [name]="service.status"
        [size]="18"
        [color]="service.color"
        [title]="service.status"
      />
    </li>
  }
</ul>
  `,
})
export class Example {
  services = [
  {
    "name": "Storage",
    "icon": "database",
    "status": "check-circle",
    "color": "var(--success-color)"
  },
  {
    "name": "Mail",
    "icon": "mail",
    "status": "alert-triangle",
    "color": "var(--warning-color)"
  },
  {
    "name": "Payments",
    "icon": "credit-card",
    "status": "x-circle",
    "color": "var(--danger-color)"
  }
];
}

```
