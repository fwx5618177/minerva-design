# 3D 散点图

可环绕旋转的 3D 坐标盒中的点云：在 GPU 上绘制数十万到上百万个点，可按系列、按点或通过色阶着色，支持悬停拾取、图例和色条。Line3DChart 用于绘制 3D 轨迹。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnLine3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLine3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## Scatter3DChart

Support: beta

Native Angular: MnScatter3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatter3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## Example: 聚类

类似鸢尾花数据集的三个品种，每个样本测量三个特征：每类一个系列，可通过图例切换。拖动旋转，Shift + 拖动平移，双击复位。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatter3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatter3DChart],
  template: `
@let t = labels[language()];
<mn-scatter-3d-chart
  [series]="[
    { name: t.segments[0], data: clouds[0], pointSize: 5 },
    { name: t.segments[1], data: clouds[1], pointSize: 5 },
    { name: t.segments[2], data: clouds[2], pointSize: 5 }
  ]"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clouds = (() => {
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
  const CLOUDS = [cloud(22, 18, 9, 1), cloud(40, 62, 24, 2), cloud(70, 35, 15, 3)];
  return CLOUDS;
})();
  labels = {
  "en": {
    "segments": ["Students", "Professionals", "Retirees"],
    "axes": ["Age", "Income (k€)", "Spending (k€)"]
  },
  "zh": {
    "segments": ["学生", "职场人士", "退休人员"],
    "axes": ["年龄", "收入（千欧元）", "消费（千欧元）"]
  },
  "ja": {
    "segments": ["学生", "社会人", "退職者"],
    "axes": ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"]
  },
  "fr": {
    "segments": ["Étudiants", "Actifs", "Retraités"],
    "axes": ["Âge", "Revenu (k€)", "Dépenses (k€)"]
  }
};
}

```

## Example: 3D 轨迹

Line3DChart 绘制洛伦兹吸引子（12,000 步），通过 value 列和 colorScale "plasma" 按时间着色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLine3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLine3DChart],
  template: `
@let t = labels[language()];
<mn-line-3d-chart
  [series]="[{ name: t.path, data: path, colorBy: 'z', lineWidth: 3 }]"
  colorScale="turbo"
  [autoRotate]="true"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path = (() => {
  // a climbing spiral of 600 points, as columns
  const t = Array.from({ length: 600 }, (_, i) => i / 30);
  const PATH = {
    x: t.map((a) => Math.cos(a) * (4 + a / 4)),
    y: t.map((a) => Math.sin(a) * (4 + a / 4)),
    z: t.map((a) => a / 2),
  };
  return PATH;
})();
  labels = {
  "en": {
    "path": "Flight path",
    "axes": ["East (km)", "North (km)", "Altitude (km)"]
  },
  "zh": {
    "path": "飞行轨迹",
    "axes": ["东（公里）", "北（公里）", "高度（公里）"]
  },
  "ja": {
    "path": "飛行経路",
    "axes": ["東（km）", "北（km）", "高度（km）"]
  },
  "fr": {
    "path": "Trajectoire",
    "axes": ["Est (km)", "Nord (km)", "Altitude (km)"]
  }
};
}

```
