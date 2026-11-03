# 箱线图

用中位数、四分位数、须线和离群值比较分布，可基于原始样本或已计算的统计量。离群值显示为系列颜色的空心圆环，悬停即可查看其数值和所属分组。

Package: minerva-design@1.19.3

Renderer: wc

Locale: zh

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

网关

认证

搜索

结账

推荐

图片

响应时间

最大值

上四分位数

中位数

下四分位数

最小值

离群值

各服务响应时间的分布

年薪

初级开发

开发工程师

高级开发

技术负责人

研发经理

各职位的薪资分布

工作日

周末

巴黎

里昂

马赛

里尔

配送时长（小时）

各城市工作日与周末的配送时长

日最高气温

平均值

每月日最高气温的分布

代码检查

单元测试

集成测试

端到端测试

发布

须线范围

1.5 × IQR

3 × IQR

最小 – 最大

离群值形状

空心

实心

{{value}} 次构建显示为离群值

构建时长

各 CI 流水线构建时长的分布

点击箱体或离群值。

{{day}}：一位患者等待了 {{value}}。

{{day}}：等待时间中位数 {{median}}，一半患者等待 {{q1}} 至 {{q3}}，离群值 {{outliers}} 个。

等待时间

四小时目标

急诊室每周各天等待时间的分布

样式表

脚本

字体

图片

视频

对数刻度

{{value}} 个文件超过 {{budget}} 的预算。

文件大小

预算

网站文件大小按类型的分布

美国东部

美国西部

欧洲西部

亚太南部

南美东部

暂停

继续

{{regions}} 的 SLA 存在风险

所有区域均满足 SLA

延迟

SLA

各区域请求延迟的实时分布

## BoxPlotChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/box-plot-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\"",
    "attribute": "whisker",
    "required": false
  },
  {
    "name": "outlierShape",
    "typeText": "\"hollow\" | \"filled\"",
    "attribute": "outlier-shape",
    "required": false
  },
  {
    "name": "outlierSize",
    "typeText": "number",
    "attribute": "outlier-size",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
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

## Example: 横向箱线、最小-最大须线

箱体按行排列；须线延伸到最小值和最大值（不显示离群值）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.html

```html
<minerva-box-plot-chart
  id="scores"
  orientation="horizontal"
  whisker="minmax"
  height="240"
></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.ts

```tsx
// `orientation="horizontal"` lays the boxes out in rows; `whisker="minmax"`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#scores")!;
  chart.groups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chart.valueName = text.score;
  chart.options = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
}

```

## Example: 各服务的响应时间

每个服务的原始样本：四分位数、Tukey 须线和离群值由图表计算。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/services.html

```html
<minerva-box-plot-chart id="services" height="300"></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/services.ts

```tsx
// Raw samples per service (`groups`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#services")!;
  chart.groups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  chart.valueName = text.time;
  chart.options = { xAxis: { type: "category" }, yAxis: { title: text.time } };
}

```
