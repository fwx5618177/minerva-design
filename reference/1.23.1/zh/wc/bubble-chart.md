# 气泡图

用点的大小表示第三个数值的散点图：气泡面积与数值成正比。

Package: minerva-design@1.23.1

Renderer: wc

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

亚洲

欧洲

美洲

非洲

人口

人均 GDP

预期寿命（岁）

各国人均 GDP、预期寿命与人口

产品

收入

云存储

数据分析

移动 SDK

支付

桌面应用

硬件

咨询

相对市场份额

市场增长率

市场领先

高增长

各产品的市场份额、增长率与收入

已确认

方案

谈判

金额

商机 #{{id}}

在管道中的天数

赢单概率

{{deal}}（{{stage}}）：{{amount}}

点击一个气泡

按时长、赢单概率和金额展示的进行中商机

人均 GDP（对数坐标）

高收入

对数坐标下的人均 GDP 与预期寿命，气泡大小表示人口

可见收入范围：{{from}} – {{to}}

缩放后显示以美元计的可见范围

基础设施

安全

人员

预算

敞口

停电

硬件交付延迟

网络割接

数据泄露

权限审查积压

关键人员离职

供应商技能不足

培训缺口

许可费用上涨

汇率波动

可接受

严重

可能性 {{likelihood}} × 影响 {{impact}} = {{score}}

敞口：{{value}}

可能性

影响

按可能性、影响和成本敞口排列的项目风险

搜索

社交

视频

邮件

预算

上线于 {{date}}

上线日期

广告支出回报率

盈亏平衡

按上线日期、广告支出回报率和预算排列的营销活动

北区

南区

东区

西区

中区

两个图表使用相同的大小比例

两个图表都用最大的气泡表示 {{value}}。

每个图表都用最大的气泡表示自身的最高营收。

每平方米销售额

利润率

{{year}} 年各门店区域的每平方米销售额、利润率和营收

播放

暂停

重播

重新开始

年份：{{year}}

生育率（每名女性生育子女数）

1990 年至 2025 年各国的生育率、预期寿命和人口

## BubbleChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bubble-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "minSize",
    "typeText": "number",
    "attribute": "min-size",
    "required": false
  },
  {
    "name": "maxSize",
    "typeText": "number",
    "attribute": "max-size",
    "required": false
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "attribute": "max-value",
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

## Example: 财富、健康与人口

人均 GDP 与预期寿命的关系，气泡大小表示人口（面积与数值成正比）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/countries.html

```html
<minerva-bubble-chart
  id="countries"
  max-size="64"
  height="320"
></minerva-bubble-chart>

```

### apps/docs/src/docs/pages/bubble-chart/wc/countries.ts

```tsx
// Three values per point: wealth (x), life expectancy (y) and population
// (`value`, the area of the bubble); the country is the point label.
import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#countries")!;
  chart.series = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  chart.options = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };
}

```

## Example: 投资组合的风险与收益

每种资产一个系列，大小表示其在组合中的占比；点击气泡可查看对应资产。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.html

```html
<div style="display: grid; gap: 8px">
  <minerva-bubble-chart id="portfolio" height="300"></minerva-bubble-chart>
  <output id="asset" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.ts

```tsx
// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#portfolio")!;
  const asset = root.querySelector<HTMLOutputElement>("#asset")!;
  chart.series = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chart.options = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  asset.textContent = text.hint;
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) asset.textContent = `${item.seriesName}: ${item.value} %`;
  };
  chart.addEventListener("minerva-point-click", onClick);
  return () => chart.removeEventListener("minerva-point-click", onClick);
}

```
