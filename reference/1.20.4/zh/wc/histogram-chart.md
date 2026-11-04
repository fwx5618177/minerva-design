# 直方图

把原始样本按等宽区间统计分布，从几百个值到数百万个值都适用。

Package: minerva-design@1.20.4

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

请求数

一百万个请求延迟的分布及 p50、p95 和 p99

分箱规则

自动

Sturges

10 个分箱

40 个分箱

学生

分数

考试分数的分布

客户

年龄

客户的年龄分布

对照组

新版引导

会话时长（分钟）

A/B 测试两组的会话时长

正态拟合

规格下限

规格上限

名义值

已调整刀具

均值 {{mean}}，σ {{sd}}，Cpk {{cpk}}，超差 {{ppm}} ppm：

能力充足

能力不足

零件

直径

轴直径分布，含规格界限和拟合的正态曲线

包邮

中位数 {{value}}

p99 {{value}}

{{share}} 的订单达到 {{threshold}} 的包邮门槛。

订单

订单金额（对数刻度）

对数刻度下的订单金额分布

暂停

继续

重置

{{share}} 的电话在 {{target}} 内接听，p90 为 {{p90}}：

达到目标

未达目标

电话

等待时间

目标

p90

最近 600 通客服电话等待时间的实时分布

{{share}} 的员工

{{value}} 名员工（{{share}}）

点击查看累计占比

点击柱子，查看通勤时间更短的员工占比。

{{share}} 的员工（{{employees}} 人）通勤时间不超过 {{limit}}。

员工

单程通勤时间

员工通勤时间分布

## HistogramChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/histogram-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "bins",
    "typeText": "HistogramBinning",
    "attribute": "bins",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "values",
    "typeText": "ArrayLike<number> | undefined",
    "required": false
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "formatBin",
    "typeText": "(value: number) => string | undefined",
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

## Example: 分箱规则

同一组年龄数据按 Sturges、10 个或 40 个分箱显示：分箱足够多时可看出两类客户。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/wc/binning.html

```html
<div style="display: grid; gap: 8px">
  <div style="display: flex; gap: 8px; align-items: center">
    <span id="label"></span>
    <button id="sturges" type="button">Sturges</button>
    <button id="ten" type="button">10</button>
    <button id="forty" type="button">40</button>
  </div>
  <minerva-histogram-chart
    id="ages"
    bins="sturges"
    height="280"
  ></minerva-histogram-chart>
</div>

```

### apps/docs/src/docs/pages/histogram-chart/wc/binning.ts

```tsx
// The same samples in fewer or more bins: `bins` takes a count or a rule
// (`sturges`, `freedman-diaconis`, `auto`); two groups appear with enough bins.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#ages")!;
  const label = root.querySelector<HTMLSpanElement>("#label")!;
  const sturges = root.querySelector<HTMLButtonElement>("#sturges")!;
  const ten = root.querySelector<HTMLButtonElement>("#ten")!;
  const forty = root.querySelector<HTMLButtonElement>("#forty")!;
  chart.values = AGES;
  chart.valueName = text.count;
  chart.options = { xAxis: { title: text.age } };
  label.textContent = text.bins;
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };
  sturges.addEventListener("click", useSturges);
  ten.addEventListener("click", useTen);
  forty.addEventListener("click", useForty);
  return () => {
    sturges.removeEventListener("click", useSturges);
    ten.removeEventListener("click", useTen);
    forty.removeEventListener("click", useForty);
  };
}

```

## Example: 响应时间分布

图表自动对 5,000 个原始样本分箱（Freedman-Diaconis），慢请求的长尾一目了然。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/wc/latency.html

```html
<minerva-histogram-chart id="latency" height="300"></minerva-histogram-chart>

```

### apps/docs/src/docs/pages/histogram-chart/wc/latency.ts

```tsx
// <minerva-histogram-chart> bins raw samples itself (`bins="auto"`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#latency")!;
  chart.values = LATENCY;
  chart.valueName = text.requests;
  chart.options = { xAxis: { title: text.ms } };
}

```
