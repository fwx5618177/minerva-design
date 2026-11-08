# 迷你图

没有坐标轴和图例、只有文字大小的迷你图，在数字旁展示趋势走向：用于 KPI 卡片、表格单元格或列表中。悬停即可读取数值。

Package: minerva-design@1.23.1

Renderer: wc

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

订单

每周订单，{{variant}}

收入

活跃用户

注册数

p95 延迟

{{metric}}，最近 30 天

服务

API 网关

身份认证

搜索

支付

通知

请求数 / 分钟

p95 延迟（30 天）

{{service}}最近 30 天的 p95 延迟

今日

变化

服务延迟

代码

Acme 集团

Nova 生物科技

Orbit 航天

Kite 机器人

Luma 能源

{{symbol}} 今日价格

价格

自选股

最近 14 天的访问量：

访问量

最近 14 天的访问量

第 7 天部署后错误数激增，随后恢复正常：

错误

最近 14 天每天的错误数

这两周的午后气温：

气温

最近 14 天的午后气温

CPU

{{server}} 的 CPU 使用率

告警

正常

日活跃用户

最近一天：{{date}}

{{date}} · 自 9 月 1 日以来 {{change}}

9 月 1 日至 10 月 31 日的日活跃用户

{{value}} 步

完成目标的 {{value}}

{{days}} 天中有 {{reached}} 天达到 {{goal}} 步的目标

步数

四周内每天的步数及每日目标

雷克雅未克

蒙特利尔

东京

开罗

新加坡

悉尼

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} 每月平均日最高气温

时段

7 天

30 天

90 天

后半段对比前半段

对比上一时段

最近 {{period}} 的每日营收

## Sparkline

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sparkline",
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
    "name": "type",
    "typeText": "\"line\" | \"area\" | \"bar\"",
    "attribute": "type",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
    "attribute": "reference",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "data",
    "typeText": "ChartSeries[\"data\"] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
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

## Example: KPI 卡片

关键数字下方的小型趋势图，分别以折线、面积和柱形绘制。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/kpi.html

```html
<div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  "
>
  <div style="display: grid; gap: 4px">
    <span id="orders-label"></span>
    <strong>1,284</strong>
    <minerva-sparkline id="orders"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="revenue-label"></span>
    <strong>€48.2k</strong>
    <minerva-sparkline id="revenue" type="area"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="signups-label"></span>
    <strong>312</strong>
    <minerva-sparkline id="signups" type="bar"></minerva-sparkline>
  </div>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/kpi.ts

```tsx
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersLabel = root.querySelector<HTMLElement>("#orders-label")!;
  const revenueLabel = root.querySelector<HTMLElement>("#revenue-label")!;
  const signupsLabel = root.querySelector<HTMLElement>("#signups-label")!;
  const orders = root.querySelector<MinervaSparkline>("#orders")!;
  const revenue = root.querySelector<MinervaSparkline>("#revenue")!;
  const signups = root.querySelector<MinervaSparkline>("#signups")!;
  ordersLabel.textContent = text.orders;
  revenueLabel.textContent = text.revenue;
  signupsLabel.textContent = text.signups;
  orders.data = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  orders.valueName = text.orders;
  revenue.data = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenue.valueName = text.revenue;
  signups.data = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signups.valueName = text.signups;
}

```

## Example: 目标线与悬停

reference 绘制虚线目标线；悬停时显示指针处的数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/reference.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sparkline
    id="latency"
    reference="200"
    height="64"
  ></minerva-sparkline>
  <output id="value" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/reference.ts

```tsx
// `reference` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latency = root.querySelector<MinervaSparkline>("#latency")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  latency.data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latency.valueName = text.latency;
  latency.format = (ms) => `${ms} ms`;
  value.textContent = text.hint;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    value.textContent =
      y === undefined ? text.hint : `${text.latency}: ${y} ms (${text.target})`;
  };
  latency.addEventListener("minerva-hover", onHover);
  return () => latency.removeEventListener("minerva-hover", onHover);
}

```
