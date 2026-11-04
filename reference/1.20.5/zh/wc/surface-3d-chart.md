# 3D 曲面图

规则网格上的曲面 z = f(x, y)：光照、内置色带（viridis、plasma、terrain…）、线框、投影到底面的等高线以及透明度。拖动旋转，Ctrl / ⌘ + 滚轮缩放。

Package: minerva-design@1.20.5

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/surface-3d-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "wireframe",
    "typeText": "boolean | Surface3DWireframeOptions | undefined",
    "required": false
  },
  {
    "name": "contours",
    "typeText": "boolean | Surface3DContourOptions | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly S[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Chart3DBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered point, cell or bar changed; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point, cell or bar was clicked; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }"
  },
  {
    "name": "minerva-camera-change",
    "typeText": "CustomEvent",
    "description": "The user rotated, zoomed, panned or reset the camera; detail: { azimuth, elevation, zoom, pan, projection }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 带等高线的波纹

60 × 60 网格上的 z = sin(r) / r，按高度着色，并在底面投影等高线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/wc/ripple.html

```html
<minerva-surface-3d-chart id="ripple" height="420"></minerva-surface-3d-chart>

```

### apps/docs/src/docs/pages/surface-3d-chart/wc/ripple.ts

```tsx
// <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (`rows`,
// `cols`, `z` row by row), lit and colored by height, with contour lines
// projected on the floor.
import type { MinervaSurface3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: { name: "Ripple", height: "Height" },
  zh: { name: "波纹", height: "高度" },
  ja: { name: "波紋", height: "高さ" },
  fr: { name: "Onde", height: "Hauteur" },
};

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSurface3DChart>("#ripple")!;
  chart.series = [{ name: text.name, data: WAVE }];
  chart.contours = { count: 10, floor: true };
  chart.options = { colorScale: "viridis", zAxis: { title: text.height } };
}

```

## Example: 带网格线的地形

两座山丘和一个山谷，每隔一条绘制网格线，使用地形色阶；悬停可读取海拔。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/wc/terrain.html

```html
<minerva-surface-3d-chart id="terrain" height="420"></minerva-surface-3d-chart>

```

### apps/docs/src/docs/pages/surface-3d-chart/wc/terrain.ts

```tsx
// A terrain with a wireframe (`wireframe`, every 2nd grid line) and the
// "terrain" color scale; hover a cell to read its elevation.
import type { MinervaSurface3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: { name: "Terrain", axes: ["East (km)", "North (km)", "Elevation (m)"] },
  zh: { name: "地形", axes: ["东（公里）", "北（公里）", "海拔（米）"] },
  ja: { name: "地形", axes: ["東（km）", "北（km）", "標高（m）"] },
  fr: { name: "Relief", axes: ["Est (km)", "Nord (km)", "Altitude (m)"] },
};

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSurface3DChart>("#terrain")!;
  chart.series = [{ name: text.name, data: TERRAIN }];
  chart.wireframe = { step: 2 };
  chart.options = {
    colorScale: "terrain",
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}

```
