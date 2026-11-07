# 3D 散点图

可环绕旋转的 3D 坐标盒中的点云：在 GPU 上绘制数十万到上百万个点，可按系列、按点或通过色阶着色，支持悬停拾取、图例和色条。Line3DChart 用于绘制 3D 轨迹。

Package: minerva-design@1.22.2

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

山鸢尾

变色鸢尾

维吉尼亚鸢尾

萼片长度（cm）

萼片宽度（cm）

花瓣长度（cm）

三种花按萼片长度、萼片宽度和花瓣长度绘制的 3D 散点图

核球与棒

老年星盘

年轻恒星

HII 区

星系晕

{{value}} kpc

由一百万颗恒星组成的棒旋星系：核球、年轻恒星构成的旋臂、HII 区与尘带、星盘和星系晕

曝光

曝光 ×{{value}}

传感器

传感器 {{id}} · 湿度 {{humidity}}%

{{value}} °C

长度（m）

宽度（m）

高度（m）

温度

仓库中 300 个传感器按位置和高度显示的温度

主链 1

主链 2

碱基对

自动旋转

投影

透视

正交

旋转的 DNA 双螺旋

环面纽结

环绕环面纽结的 200,000 个点，按高度着色

后端

自动

WebGPU

WebGL2

WebGL

Canvas2D

正在启动…

当前后端：{{backend}}

此处不支持 {{requested}}：改用 {{backend}} 绘制

轨迹

时间

{{value}} 秒

按时间着色的洛伦兹吸引子轨迹

瑞士卷

卷上的位置

正视

侧视

俯视

复位

方位角 {{azimuth}}°，仰角 {{elevation}}°，缩放 ×{{zoom}}

拖动旋转，Shift + 拖动平移，Ctrl / ⌘ + 滚轮缩放，双击复位。

按卷上位置着色的瑞士卷点云

体育

政治

科技

健康

财经

旅游

{{topic}}文章 #{{n}}

最近邻

主成分 {{n}}（{{variance}}）

新闻文章向量在前三个主成分上的分布，按主题区分

与{{doc}}最接近：{{list}}。

{{doc}}（{{distance}}）

点击一篇文章，查找与它最近的邻居。

激光雷达回波

着色依据

高度

强度

深色主题

包含建筑、树木和停放车辆的街道激光雷达点云

共 {{points}} 个点。悬停在点云上可读取回波。

高度 {{height}}，强度 {{intensity}}。

{{shell}} {{n}}

宽带（低轨）

对地成像（极轨）

导航（中轨）

地球静止轨道

地球

播放

千公里

四个轨道层的卫星环绕地球运行

{{shell}}：高度 {{altitude}}，速度 {{speed}}，每 {{period}}绕行一周。

悬停在卫星上查看其轨道。

科技

医疗

能源

金融

消费

{{ticker}} · {{cap}}

正交视图

波动率

贝塔系数

年化收益

按波动率、贝塔系数和年化收益分布的股票，点的大小表示市值

{{ticker}}（{{sector}}）：收益 {{ret}}，波动率 {{volatility}}，贝塔 {{beta}}，夏普比率 {{sharpe}}，市值 {{cap}}。

点击股票以固定显示其数据。

## Line3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/line-3d-chart",
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

## Scatter3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/scatter-3d-chart",
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

## Example: 三维客户细分

三团点云（年龄、收入、消费）以列数据给出；拖动旋转，Ctrl / ⌘ + 滚轮缩放。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/wc/clusters.html

```html
<minerva-scatter-3d-chart id="segments" height="420"></minerva-scatter-3d-chart>

```

### apps/docs/src/docs/pages/scatter-3d-chart/wc/clusters.ts

```tsx
// <minerva-scatter-3d-chart>: three customer segments as point clouds
// (columns of x, y, z); drag to rotate, Ctrl / ⌘ + wheel to zoom,
// double-click to reset the camera.
import type { MinervaScatter3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    segments: ["Students", "Professionals", "Retirees"],
    axes: ["Age", "Income (k€)", "Spending (k€)"],
  },
  zh: {
    segments: ["学生", "职场人士", "退休人员"],
    axes: ["年龄", "收入（千欧元）", "消费（千欧元）"],
  },
  ja: {
    segments: ["学生", "社会人", "退職者"],
    axes: ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"],
  },
  fr: {
    segments: ["Étudiants", "Actifs", "Retraités"],
    axes: ["Âge", "Revenu (k€)", "Dépenses (k€)"],
  },
};

const fraction = (value: number) => value - Math.floor(value);
// a cloud of 400 customers around a center (age, income, spending),
// generated deterministically, as columns
const cloud = (age: number, income: number, spending: number, seed: number) => {
  const noise = (i: number, k: number) =>
    fraction(Math.sin((i + seed * 1000) * (12.9898 + k)) * 43758.5453) - 0.5;
  return {
    x: Array.from({ length: 400 }, (_, i) => age + noise(i, 0) * 12),
    y: Array.from({ length: 400 }, (_, i) => income + noise(i, 1) * 20),
    z: Array.from({ length: 400 }, (_, i) => spending + noise(i, 2) * 10),
  };
};
const CLOUDS = [
  cloud(22, 18, 9, 1),
  cloud(40, 62, 24, 2),
  cloud(70, 35, 15, 3),
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaScatter3DChart>("#segments")!;
  chart.series = text.segments.map((name, i) => ({
    name,
    data: CLOUDS[i],
    pointSize: 5,
  }));
  chart.options = {
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}

```

## Example: 按高度着色的轨迹

三维折线按高度着色并显示色条；相机缓慢环绕旋转。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/wc/trajectory.html

```html
<minerva-line-3d-chart id="flight" height="420"></minerva-line-3d-chart>

```

### apps/docs/src/docs/pages/scatter-3d-chart/wc/trajectory.ts

```tsx
// <minerva-line-3d-chart>: a trajectory colored along its height
// (`colorBy: "z"` with the color scale, shown in the color bar); the camera
// turns slowly around it (`autoRotate`).
import type { MinervaLine3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    path: "Flight path",
    axes: ["East (km)", "North (km)", "Altitude (km)"],
  },
  zh: { path: "飞行轨迹", axes: ["东（公里）", "北（公里）", "高度（公里）"] },
  ja: { path: "飛行経路", axes: ["東（km）", "北（km）", "高度（km）"] },
  fr: { path: "Trajectoire", axes: ["Est (km)", "Nord (km)", "Altitude (km)"] },
};

// a climbing spiral of 600 points, as columns
const t = Array.from({ length: 600 }, (_, i) => i / 30);
const PATH = {
  x: t.map((a) => Math.cos(a) * (4 + a / 4)),
  y: t.map((a) => Math.sin(a) * (4 + a / 4)),
  z: t.map((a) => a / 2),
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLine3DChart>("#flight")!;
  chart.series = [{ name: text.path, data: PATH, colorBy: "z", lineWidth: 3 }];
  chart.options = {
    colorScale: "turbo",
    autoRotate: true,
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}

```
