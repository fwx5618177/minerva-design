# 3D 曲面图

规则网格上的曲面 z = f(x, y)：光照、内置色带（viridis、plasma、terrain…）、线框、投影到底面的等高线以及透明度。拖动旋转，Ctrl / ⌘ + 滚轮缩放。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

马鞍面

函数

{{name}} 函数的 3D 曲面

x

y

z

岛屿

{{value}} km

{{value}} 米

东向

北向

海拔

宽 20 公里的岛屿地形

隐含波动率

{{value}}%

行权价（现价的 %）

距到期天数

{{value}} 天

按行权价和到期时间的隐含波动率曲面

面

线框

底面等高线

曲面等高线

带线框和等高线的 peaks 曲面

碗面

倾斜平面

透明碗面与透明倾斜平面相交

波

播放动画

振幅

从中心扩散的动画涟漪

金属板

重置

厘米

温度

被点热源加热的金属板温度

热源：{{sources}} 个 · 最高温度 {{max}} · 平均温度 {{mean}}。点击金属板可添加或移除热源。

国债收益率

期限

月份

收益率

24 个月内各期限国债收益率

{{date}} {{maturity}}期收益率：{{yield}}。

悬停在曲面上读取收益率。

{{date}}收益率曲线倒挂（10 年期 − 2 年期：{{spread}}）。

{{date}}收益率曲线向上倾斜（10 年期 − 2 年期：{{spread}}）。

损失

({{x}}, {{y}})

色阶

Viridis

Plasma

Magma

Cividis

Turbo

权重 1

权重 2

log₁₀(1 + 损失)

有四个极小值的 Himmelblau 函数损失曲面

从 {{start}}（损失 {{loss}}）出发，梯度下降经过 {{steps}} 步到达位于 {{minimum}} 的第 {{n}} 个极小值。

点击曲面，从该处开始梯度下降。

{{value}} dBm

信号

接入点

大堂

开放办公区

会议室

茶水间

3D 视图

俯视图

米

办公楼层的 Wi-Fi 信号强度

{{good}} 的区域信号不低于 {{goodLevel}}（可视频通话），{{usable}} 的区域不低于 {{usableLevel}}。

所有接入点均已关闭：无覆盖。

## Surface3DChart

Support: beta

Native Angular: MnSurface3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSurface3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wireframe",
    "typeText": "boolean | Surface3DWireframeOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "contours",
    "typeText": "boolean | Surface3DContourOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "series",
    "typeText": "readonly S[]",
    "required": true,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "xAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "yAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "zAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "camera",
    "typeText": "Chart3DCameraOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "autoRotate",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorScale",
    "typeText": "Chart3DColorScale | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorBar",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<Chart3DOptions, \"series\">> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "Chart3DHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "Chart3DHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cameraChange",
    "typeText": "Chart3DCameraState",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: A ripple with contour lines

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSurface3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSurface3DChart],
  template: `
@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: wave }]"
  [contours]="{ count: 10, floor: true }"
  colorScale="viridis"
  [zAxis]="{ title: t.height }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  wave = (() => {
  // z = sin(r) / r over a 60 × 60 grid from -10 to 10
  const N = 60;
  const WAVE = {
    rows: N,
    cols: N,
    x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    z: Array.from({ length: N * N }, (_, k) => {
      const x = -10 + (20 * (k % N)) / (N - 1);
      const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
      const r = Math.hypot(x, y) || 1e-6;
      return Math.sin(r) / r;
    }),
  };
  return WAVE;
})();
  labels = {
  "en": {
    "name": "Ripple",
    "height": "Height"
  },
  "zh": {
    "name": "波纹",
    "height": "高度"
  },
  "ja": {
    "name": "波紋",
    "height": "高さ"
  },
  "fr": {
    "name": "Onde",
    "height": "Hauteur"
  }
};
}

```

## Example: 地形

180 × 180 的分形岛屿高度图，使用 terrain 色带、压扁的坐标盒（aspect）和更强的方向光。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSurface3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSurface3DChart],
  template: `
@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: terrain }]"
  [wireframe]="{ step: 2 }"
  colorScale="terrain"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  terrain = (() => {
  // two hills and a valley on a 40 × 40 grid (heights in meters)
  const N = 40;
  const TERRAIN = {
    rows: N,
    cols: N,
    z: Array.from({ length: N * N }, (_, k) => {
      const x = (k % N) / 4;
      const y = Math.floor(k / N) / 4;
      return Math.round(
        900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
          600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
          200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
          300,
      );
    }),
  };
  return TERRAIN;
})();
  labels = {
  "en": {
    "name": "Terrain",
    "axes": ["East (km)", "North (km)", "Elevation (m)"]
  },
  "zh": {
    "name": "地形",
    "axes": ["东（公里）", "北（公里）", "海拔（米）"]
  },
  "ja": {
    "name": "地形",
    "axes": ["東（km）", "北（km）", "標高（m）"]
  },
  "fr": {
    "name": "Relief",
    "axes": ["Est (km)", "Nord (km)", "Altitude (m)"]
  }
};
}

```
