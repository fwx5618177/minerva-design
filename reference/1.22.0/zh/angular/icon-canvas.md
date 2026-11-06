# IconCanvas 图标画布

在一块画布上绘制大量图标，由 WebGPU、WebGL2 或 WebGL 通过少量实例化绘制调用完成，或由 Canvas2D 绘制：适用于密集图形、地图、粒子以及包含成千上万个图标的动画。

Package: minerva-design@1.22.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 绘制原理

IconCanvas 以 CSS 像素为单位，按位置、尺寸、旋转、颜色和不透明度摆放图标，并用可用的最佳后端（WebGPU -> WebGL2 -> WebGL -> Canvas2D）将它们全部绘制在一块画布上。

几何：每个图标以四分之一设备像素的精度展平，其描边被转换为三角形（每段一个四边形，连接处和线帽使用圆形扇面），每种图标、描边宽度和细节级别只处理一次。

批处理：所有网格存放在同一个顶点缓冲区中，每个图标都是一个实例（位置、尺寸、旋转、颜色）；连续的相同图标合并为一次实例化绘制调用。

质量：4× MSAA 平滑边缘，逐图标的深度测试让图标的每个像素只绘制一次，因此半透明图标的混合效果与 SVG 描边完全一致。

健壮性：auto 会跳过软件 GPU，GPU 上下文丢失时会重启后端（丢失两次的后端会被跳过），画布根元素通过 data-renderer 报告当前后端。

界面中的图标请使用 Icon：SVG 更轻量、可访问，并支持服务端渲染。当图标本身就是画面时，再使用 IconCanvas。

图标数量

暂停

播放

已暂停

每秒 {{fps}} 帧

由 {{backend}} 绘制

正在启动渲染器…

{{n}} 个动画图标

由 {{backend}} 绘制的 40 个图标

由 {{backend}} 绘制

已回退到 {{backend}}

## IconCanvas

Support: beta

Native Angular: MnIconCanvas. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnIconCanvas"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly IconCanvasItem[]",
    "required": true,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "renderer",
    "typeText": "IconRendererPreference",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "width",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "height",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "pixelRatio",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon-canvas.ts"
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
    "source": "packages/angular/src/components/icons/icon-canvas.ts",
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

## Example: 基础用法

以 CSS 像素摆放的图标，各自拥有尺寸、颜色（包括主题变量）、旋转、描边宽度和不透明度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIconCanvas, MnStack } from 'minerva-design/angular';
import { homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIconCanvas, MnStack],
  template: `
<mn-stack gap="2">
  <mn-icon-canvas
    [items]="items"
    [height]="160"
    title="Six icons, three ways"
    (rendererChange)="drawn = $event"
  />
  <small role="status">{{ drawn ? 'Drawn with ' + drawn : '…' }}</small>
</mn-stack>
  `,
})
export class Example {
  items = (() => {
  const row = [homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon];
  return [
    ...row.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: 'var(--primary-color)',
      rotation: i * 15,
    })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
})();
  drawn = "";
}

```

## Example: Every backend

A forced backend that cannot start falls back to the next one (WebGPU, WebGL2, WebGL, Canvas2D); rendererChange tells which one drew.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIconCanvas, MnStack } from 'minerva-design/angular';
import { icons } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIconCanvas, MnStack],
  template: `
<mn-stack direction="row" wrap gap="4">
  @for (renderer of renderers; track renderer) {
    <figure style="margin: 0">
      <mn-icon-canvas
        [items]="items"
        [renderer]="renderer"
        [width]="256"
        [height]="160"
        [title]="'Icons drawn with ' + renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <figcaption>
        <code>renderer="{{ renderer }}"</code>
        <small>{{
          !drawn[renderer]
            ? 'Starting…'
            : drawn[renderer] === renderer
              ? 'Drawn by ' + drawn[renderer]
              : 'Fell back to ' + drawn[renderer]
        }}</small>
      </figcaption>
    </figure>
  }
</mn-stack>
  `,
})
export class Example {
  renderers: import('minerva-design/icons/core').IconRendererPreference[] = ["webgpu", "webgl2", "webgl", "canvas2d"];
  items = icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}));
  drawn: Partial<Record<string, string>> = {};
}

```
