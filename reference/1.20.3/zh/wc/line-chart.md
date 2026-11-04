# 折线图

基于数字、日期或类目的折线或填充面积图。借助 GPU 可处理百万级数据点。

Package: minerva-design@1.20.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

本周

上周

本周与上周每日访客数

已用存储

天

60 天内的存储用量

里斯本

奥斯陆

曲线

直线

平滑

阶梯

里斯本与奥斯陆的月平均气温

计算

存储

网络

数据库

堆叠方式

堆叠

按服务堆叠的每月云支出

页面浏览量

会话数

2026 年上半年每日页面浏览量与会话数

传感器

一百万条传感器读数

{{points}} 个点 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

访客

产品发布

服务故障

90 天内的每日访客数，含一次产品发布和一次故障

室内

室外

每小时室内外温度，含缺失读数

传感器离线了几个小时：线条在此断开，而不是凭空猜测。

中位数

第 95 百分位

临界

目标 {{value}}

六小时内的 API 延迟：中位数与第 95 百分位

收盘价

周期

1 个月

3 个月

6 个月

1 年

全部

两年内的每日收盘价

步数

每日步数

{{day}}：{{steps}} 步

点按或在线条上滑动

CPU

内存

{{hour}} 时

一天内的 CPU 与内存使用率

双指缩放，双击重置；点按图例可隐藏系列。

冷冻柜温度

高于 {{value}} 报警

暂停

继续

报警：门未关？

正常

最新读数 {{value}}（{{time}}）

最近一分钟超限读数：{{readings}}

最近一分钟的冷冻柜温度，每秒更新

野生型

突变株

加入抗生素

指数生长期

对数刻度

接种后时间

CFU / mL

三种细菌培养物 24 小时的生长曲线

直线段表示增长率恒定：野生型大约每 {{minutes}} 翻一番。

在线性刻度下，数量较少的培养物看起来几乎是平的：切回对数刻度即可比较。

投资组合市值

点击一个点开始测量，再点击第二个点。

起点 {{date}}（{{value}}）：请点击第二个点。

{{from}} → {{to}}：{{change}}（{{percent}}），历时 {{days}}

清除

2026 年投资组合每日市值；点击两个点测量变化

股票

债券

黄金

房地产

基期 = 100

四类资产以 100 为基期的表现，2021 至 2026 年

{{value}} µg/m³

德里

北京

巴黎

墨西哥城

东京

圣保罗

11 月细颗粒物（PM2.5）日均浓度；虚线为世卫组织指导值 {{value}}。

超标 {{days}}/{{total}} 天

{{city}} 30 天的每日 PM2.5

## LineChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/line-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "area",
    "typeText": "boolean",
    "attribute": "area",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
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

## Example: 缩放与重置

2000 个数据点：Ctrl / ⌘ + 滚轮或双指缩放，拖动平移，按钮调用图表的 resetZoom()。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/wc/reset-zoom.html

```html
<div style="display: grid; gap: 8px; justify-items: start">
  <minerva-line-chart id="signal" height="260"></minerva-line-chart>
  <button id="reset" type="button"></button>
</div>

```

### apps/docs/src/docs/pages/line-chart/wc/reset-zoom.ts

```tsx
// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
// (resetZoom, getView, setView) drive the view from outside.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLineChart>("#signal")!;
  const reset = root.querySelector<HTMLButtonElement>("#reset")!;
  chart.series = [
    {
      name: text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  chart.options = { crosshair: true, interaction: { zoom: "x" } };
  reset.textContent = text.reset;
  const onReset = () => chart.resetZoom();
  reset.addEventListener("click", onReset);
  return () => reset.removeEventListener("click", onReset);
}

```

## Example: 每周趋势

类目轴上的两条平滑折线；系列名称和星期随页面语言切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/wc/trend.html

```html
<minerva-line-chart id="trend" curve="smooth" height="280"></minerva-line-chart>

```

### apps/docs/src/docs/pages/line-chart/wc/trend.ts

```tsx
// `series` and `options` are JS properties; the labels follow the page language.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLineChart>("#trend")!;
  chart.series = [
    { name: text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
}

```
