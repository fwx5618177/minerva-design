# 桑基图

展示各阶段之间的流量：能源平衡、用户路径、预算分配。节点按列排布，连线粗细与流量成正比，并通过迭代松弛调整节点顺序，让流向更平直、交叉更少。悬停节点会高亮其全部流向，悬停连线可查看它占来源节点的比例；方向键可在节点和连线之间切换。

Package: minerva-design@1.22.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

太阳能

风能

水电

核能

天然气

煤炭

石油

电力

集中供热

成品油

居民

工业

服务业

交通

损耗

{{value}} 太瓦时

能源平衡：一次能源、能源载体和终端用途，单位为太瓦时每年

搜索广告

自然搜索

邮件订阅

社交媒体

首页

价格页

博客

注册表单

离开网站

开始试用

放弃注册

付费套餐

试用到期

一周的会话，从获客渠道到订阅

{{source}} → {{target}}：{{value}} 次会话（占 {{source}} 的 {{share}}%）

{{name}}：{{value}} 次会话

点击某个步骤或路径（或聚焦图表后按 Enter）即可选中

软件授权

订阅

服务

补贴

年度预算

研发

销售与市场

运营

综合管理

平台

移动应用

AI 研究

营销活动

销售团队

基础设施

客户支持

财务与法务

办公场地

年度预算：收入来源、部门和项目

邮件

在线聊天

电话

聊天机器人

一线客服

二线客服

研发团队

已解决

已退款

已提缺陷

一个月的客服工单，从渠道到处理结果

节点对齐

两端对齐

左对齐

右对齐

居中

连线颜色

渐变

来源

目标

中性

标签显示数值

云服务

软件授权

硬件

专业服务

总收入

营业成本

毛利润

研发

销售与市场

管理费用

营业利润

所得税

净利润

季度利润表：收入板块、成本与利润

毛利率 {{gross}} · 营业利润率 {{operating}} · 净利率 {{net}}

巴西

哥伦比亚

埃塞俄比亚

越南

汉堡烘焙厂

鹿特丹烘焙厂

北部仓库

中部仓库

南部仓库

咖啡馆

超市

网店

{{value}} 吨

一个月的咖啡运输量：从产地经烘焙厂和仓库到各销售渠道

点击一个站点以追踪经过它的全部流量，或点击一条运输线路将其选中

{{name}}：从 {{from}} 个站点运入 {{inbound}}，向 {{to}} 个站点运出 {{outbound}}

{{source}} → {{target}}：{{value}}（占 {{source}} 发货量的 {{share}}）

清除选择

内部推荐

招聘网站

职业社交网络

猎头机构

校园招聘

收到申请

简历未通过

电话初筛

初筛未通过

面试

面试未通过

发放录用

拒绝录用

已入职

显示流失

一年的招聘漏斗：从候选人来源到入职

共 {{applied}} 份申请，录用 {{hired}} 人（{{rate}}）。通过初筛的候选人中有 {{interview}} 进入面试，{{accepted}} 的录用通知被接受。

Web 应用

iOS 应用

Android 应用

合作伙伴 API

API 网关

认证

商品目录

搜索

结算

2xx 成功

4xx 客户端错误

5xx 服务端错误

{{value}} 次/秒

总计：{{total}}。

服务端错误率：{{rate}}

服务端错误率：{{rate}}，结算服务故障

暂停

继续

实时 API 流量（每秒请求数）：从客户端到各服务及其状态码

PET 瓶与托盘

HDPE 容器

PP 杯盒与瓶盖

LDPE 薄膜

其他聚合物

投放市场的包装

回收收集

焚烧

填埋

泄漏到自然环境

再生利用

分拣废料

新包装

降级产品

{{value}} 百万吨

占{{source}}的 {{share}}

占全部包装的 {{share}}

一年的塑料包装（百万吨）：聚合物、废弃处理途径与再生利用

## SankeyChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "SankeyChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "nodes",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly SankeyNode[] | undefined",
    "typeRef": "type:abbae3a275f8cae80221",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended"
  },
  {
    "name": "links",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly SankeyLink[]",
    "typeRef": "type:9b7445fd57ca5be620e0",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
  },
  {
    "name": "nodeWidth",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Width of the node bars, in pixels"
  },
  {
    "name": "nodePadding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
  },
  {
    "name": "align",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "center",
      "justify",
      "left",
      "right"
    ],
    "typeText": "\"center\" | \"left\" | \"right\" | \"justify\" | undefined",
    "typeRef": "type:57f0ccb646e05fa470d8",
    "default": "justify",
    "required": false,
    "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
  },
  {
    "name": "iterations",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 32,
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings"
  },
  {
    "name": "linkColor",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "gradient",
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"source\" | \"gradient\" | undefined",
    "typeRef": "type:455388a12bfe376d2148",
    "default": "gradient",
    "required": false,
    "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "linkOpacity",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Opacity of the links, 0-1 (hovered flows are more opaque)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Node labels (name and value); overlapping labels are skipped"
  },
  {
    "name": "labelValues",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the value after the name in the labels"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "SankeyChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of SankeyChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "nodes",
        "type": "readonly SankeyNode[]",
        "required": false,
        "description": "Nodes, in their initial order; nodes only named by a link are appended"
      },
      {
        "name": "links",
        "type": "readonly SankeyLink[]",
        "required": true,
        "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
      },
      {
        "name": "nodeWidth",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Width of the node bars, in pixels"
      },
      {
        "name": "nodePadding",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
      },
      {
        "name": "align",
        "type": "\"justify\" | \"left\" | \"right\" | \"center\"",
        "required": false,
        "default": "\"justify\"",
        "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
      },
      {
        "name": "iterations",
        "type": "number",
        "required": false,
        "default": "32",
        "description": "Relaxation passes that straighten the flows and reduce crossings"
      },
      {
        "name": "linkColor",
        "type": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
        "required": false,
        "default": "\"gradient\"",
        "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
      },
      {
        "name": "linkOpacity",
        "type": "number",
        "required": false,
        "default": "0.4",
        "description": "Opacity of the links, 0-1 (hovered flows are more opaque)"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Node labels (name and value); overlapping labels are skipped"
      },
      {
        "name": "labelValues",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the value after the name in the labels"
      }
    ]
  },
  "SankeyNode": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A node of a sankey diagram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the label and the tooltip; links refer to the node by this name (or by index)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the node (and of the ends of its links); the palette when omitted"
      },
      {
        "name": "column",
        "type": "number",
        "required": false,
        "description": "Column of the node, 0 = leftmost; computed from the links when omitted"
      }
    ]
  },
  "SankeyLink": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A flow between two nodes of a sankey diagram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "source",
        "type": "string | number",
        "required": true,
        "description": "Source node: its `name`, or its index in `nodes`"
      },
      {
        "name": "target",
        "type": "string | number",
        "required": true,
        "description": "Target node: its `name`, or its index in `nodes`"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Size of the flow (negative values count as 0)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the flow; follows `linkColor` when omitted"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 预算分配

各项收入汇入年度预算，再分配到部门和项目。linkColor="target" 按资金去向为每条流着色；按读者语言格式化的紧凑货币让金额更简洁。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/budget.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Item =
  | "licenses"
  | "subscriptions"
  | "services"
  | "grants"
  | "budget"
  | "rnd"
  | "sales"
  | "operations"
  | "admin"
  | "platform"
  | "mobile"
  | "ai"
  | "campaigns"
  | "salesTeam"
  | "infrastructure"
  | "support"
  | "finance"
  | "offices";

// Yearly budget of a software company, in millions of dollars: where the
// money comes from, then how it is split between departments and programs
const ITEMS: { key: Item; color?: string }[] = [
  { key: "licenses" },
  { key: "subscriptions" },
  { key: "services" },
  { key: "grants" },
  { key: "budget", color: "#64748b" },
  { key: "rnd", color: "#6366f1" },
  { key: "sales", color: "#f59e0b" },
  { key: "operations", color: "#10b981" },
  { key: "admin", color: "#ec4899" },
  { key: "platform", color: "#818cf8" },
  { key: "mobile", color: "#818cf8" },
  { key: "ai", color: "#818cf8" },
  { key: "campaigns", color: "#fbbf24" },
  { key: "salesTeam", color: "#fbbf24" },
  { key: "infrastructure", color: "#34d399" },
  { key: "support", color: "#34d399" },
  { key: "finance", color: "#f472b6" },
  { key: "offices", color: "#f472b6" },
];

const ALLOCATIONS: [Item, Item, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
  ["rnd", "platform", 12.8],
  ["rnd", "mobile", 7.9],
  ["rnd", "ai", 8.8],
  ["sales", "campaigns", 9.6],
  ["sales", "salesTeam", 11.7],
  ["operations", "infrastructure", 8.1],
  ["operations", "support", 5.6],
  ["admin", "finance", 4.4],
  ["admin", "offices", 4.1],
];

const keys = ITEMS.map((item) => item.key);

export default function BudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  const nodes = useMemo(
    (): SankeyNode[] =>
      ITEMS.map(({ key, color }) => ({
        name: t(`budget.${key}`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );
  // millions of dollars, in the reader's number format
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1e6);
  }, [locale]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      linkColor="target"
      linkOpacity={0.35}
      nodeWidth={10}
      height={440}
      ariaLabel={t("budgetAria")}
    />
  );
}

```

## Example: 能源流向

一个国家能源平衡中的一次能源、能源载体和终端用途。每个节点有各自的颜色，连线从来源颜色渐变到目标颜色；format 为标签和提示框加上单位。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/energy.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Key =
  | "solar"
  | "wind"
  | "hydro"
  | "nuclear"
  | "gas"
  | "coal"
  | "oil"
  | "electricity"
  | "heat"
  | "fuels"
  | "homes"
  | "industry"
  | "services"
  | "transport"
  | "losses";

// A national energy balance, in TWh per year (rounded): primary sources,
// carriers, then end uses. Every carrier gives out what it receives.
const NODES: { key: Key; color: string }[] = [
  { key: "solar", color: "#f59e0b" },
  { key: "wind", color: "#38bdf8" },
  { key: "hydro", color: "#0284c7" },
  { key: "nuclear", color: "#a855f7" },
  { key: "gas", color: "#f97316" },
  { key: "coal", color: "#64748b" },
  { key: "oil", color: "#92400e" },
  { key: "electricity", color: "#eab308" },
  { key: "heat", color: "#ef4444" },
  { key: "fuels", color: "#b45309" },
  { key: "homes", color: "#10b981" },
  { key: "industry", color: "#6366f1" },
  { key: "services", color: "#14b8a6" },
  { key: "transport", color: "#ec4899" },
  { key: "losses", color: "#94a3b8" },
];

const FLOWS: [Key, Key, number][] = [
  ["solar", "electricity", 62],
  ["wind", "electricity", 138],
  ["hydro", "electricity", 54],
  ["nuclear", "electricity", 182],
  ["gas", "electricity", 96],
  ["coal", "electricity", 48],
  ["gas", "heat", 58],
  ["gas", "homes", 142],
  ["gas", "industry", 104],
  ["coal", "industry", 36],
  ["oil", "fuels", 420],
  ["electricity", "homes", 168],
  ["electricity", "industry", 152],
  ["electricity", "services", 124],
  ["electricity", "transport", 22],
  ["electricity", "losses", 114],
  ["heat", "homes", 36],
  ["heat", "services", 22],
  ["fuels", "transport", 348],
  ["fuels", "industry", 42],
  ["fuels", "losses", 30],
];

const index = (key: Key) => NODES.findIndex((n) => n.key === key);

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  // translated names; the links refer to the nodes by index
  const nodes = useMemo(
    (): SankeyNode[] =>
      NODES.map(({ key, color }) => ({ name: t(`energy.${key}`), color })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([source, target, value]) => ({
        source: index(source),
        target: index(target),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("twh", { value: number.format(value) });
  }, [locale, t]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      height={420}
      ariaLabel={t("energyAria")}
    />
  );
}

```

## Example: 招聘漏斗

候选人从来源渠道到最终录用，以及每个阶段的流失。连线按名称引用节点，因此开关只需把流失节点及其连线排除在外；align="left" 让每个流失节点紧挨着对应阶段。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/hiring-funnel.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SankeyChart, type SankeyLink } from "minerva-design/charts";

type Stage =
  | "referrals"
  | "jobBoards"
  | "linkedin"
  | "agencies"
  | "campus"
  | "applied"
  | "cvRejected"
  | "screen"
  | "screenOut"
  | "interview"
  | "interviewOut"
  | "offer"
  | "declined"
  | "hired";

const DROP_OFFS = new Set<Stage>([
  "cvRejected",
  "screenOut",
  "interviewOut",
  "declined",
]);
const SOURCES: Stage[] = [
  "referrals",
  "jobBoards",
  "linkedin",
  "agencies",
  "campus",
];

// Candidates of one hiring year, from the source to the outcome
const MOVES: [Stage, Stage, number][] = [
  ["referrals", "applied", 210],
  ["jobBoards", "applied", 1480],
  ["linkedin", "applied", 860],
  ["agencies", "applied", 190],
  ["campus", "applied", 540],
  ["applied", "cvRejected", 2150],
  ["applied", "screen", 1130],
  ["screen", "screenOut", 690],
  ["screen", "interview", 440],
  ["interview", "interviewOut", 362],
  ["interview", "offer", 78],
  ["offer", "declined", 14],
  ["offer", "hired", 64],
];

const STAGE_COLOR: Partial<Record<Stage, string>> = {
  hired: "var(--success-color)",
  cvRejected: "var(--text-muted-color)",
  screenOut: "var(--text-muted-color)",
  interviewOut: "var(--text-muted-color)",
  declined: "var(--text-muted-color)",
};

const total = (from: Stage) =>
  MOVES.filter(([source]) => source === from).reduce(
    (sum, [, , value]) => sum + value,
    0,
  );

export default function HiringFunnelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [dropOffs, setDropOffs] = useState(true);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  // nodes and links refer to each other by name, so hiding the drop-offs
  // only means leaving them out of both lists
  const visible = useMemo(
    () => MOVES.filter(([, to]) => dropOffs || !DROP_OFFS.has(to)),
    [dropOffs],
  );
  const nodes = useMemo(() => {
    const stages = [...new Set(visible.flatMap(([from, to]) => [from, to]))];
    return stages.map((stage) => ({
      name: t(`hiring.${stage}`),
      ...(STAGE_COLOR[stage] ? { color: STAGE_COLOR[stage] } : {}),
    }));
  }, [visible, t]);
  const links = useMemo(
    (): SankeyLink[] =>
      visible.map(([from, to, value]) => ({
        source: t(`hiring.${from}`),
        target: t(`hiring.${to}`),
        value,
      })),
    [visible, t],
  );

  const applied = SOURCES.reduce((sum, source) => sum + total(source), 0);
  const hired = MOVES.find(([, to]) => to === "hired")![2];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={dropOffs}
        onChange={setDropOffs}
        label={t("hiring.showDropOffs")}
      />
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        align="left"
        linkColor={dropOffs ? "target" : "source"}
        labelValues
        height={400}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {t("hiring.summary", {
          applied: number.format(applied),
          hired: number.format(hired),
          rate: percent.format(hired / applied),
          interview: percent.format(total("interview") / total("screen")),
          accepted: percent.format(hired / total("offer")),
        })}
      </output>
    </div>
  );
}

```

## Example: 利润表

各业务板块汇入总收入，再逐级拆分为成本与利润，直至净利润。每条连线通过自身的 color 着色（利润为绿色、成本为红色），业务板块则沿用 linkColor="source"；紧凑的货币格式让金额更简短。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/income-statement.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Line =
  | "cloud"
  | "licenses"
  | "hardware"
  | "services"
  | "revenue"
  | "cogs"
  | "gross"
  | "rnd"
  | "sales"
  | "admin"
  | "operating"
  | "tax"
  | "net";

const PROFIT = "var(--success-color)";
const COST = "var(--danger-color)";

// Quarterly income statement, in millions of dollars
const LINES: { key: Line; color?: string }[] = [
  { key: "cloud", color: "var(--chart-series-1)" },
  { key: "licenses", color: "var(--chart-series-2)" },
  { key: "hardware", color: "var(--chart-series-3)" },
  { key: "services", color: "var(--chart-series-4)" },
  { key: "revenue", color: "var(--text-secondary-color)" },
  { key: "cogs", color: COST },
  { key: "gross", color: PROFIT },
  { key: "rnd", color: COST },
  { key: "sales", color: COST },
  { key: "admin", color: COST },
  { key: "operating", color: PROFIT },
  { key: "tax", color: COST },
  { key: "net", color: PROFIT },
];

const SEGMENTS: [Line, number][] = [
  ["cloud", 412],
  ["licenses", 186],
  ["hardware", 94],
  ["services", 58],
];
const COGS = 268;
const OPEX: [Line, number][] = [
  ["rnd", 141],
  ["sales", 98],
  ["admin", 47],
];
const TAX_RATE = 0.21;

const keys = LINES.map((line) => line.key);

function statement() {
  const revenue = SEGMENTS.reduce((sum, [, value]) => sum + value, 0);
  const gross = revenue - COGS;
  const operating = gross - OPEX.reduce((sum, [, value]) => sum + value, 0);
  const tax = Math.round(operating * TAX_RATE);
  const flows: [Line, Line, number, "profit" | "cost" | "in"][] = [
    ...SEGMENTS.map(
      ([key, value]) =>
        [key, "revenue", value, "in"] as [Line, Line, number, "in"],
    ),
    ["revenue", "cogs", COGS, "cost"],
    ["revenue", "gross", gross, "profit"],
    ...OPEX.map(
      ([key, value]) =>
        ["gross", key, value, "cost"] as [Line, Line, number, "cost"],
    ),
    ["gross", "operating", operating, "profit"],
    ["operating", "tax", tax, "cost"],
    ["operating", "net", operating - tax, "profit"],
  ];
  return { revenue, gross, operating, net: operating - tax, flows };
}
const STATEMENT = statement();

export default function IncomeStatementDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;
  const { revenue, gross, operating, net, flows } = STATEMENT;

  const nodes = useMemo(
    (): SankeyNode[] =>
      LINES.map(({ key, color }) => ({ name: t(`pnl.${key}`), color })),
    [t],
  );
  // profits are green and costs red; revenue streams keep their own color
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value, kind]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
        ...(kind === "profit" ? { color: PROFIT } : {}),
        ...(kind === "cost" ? { color: COST } : {}),
      })),
    [flows],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => money.format(value * 1e6),
    [money],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        linkOpacity={0.4}
        nodeWidth={14}
        height={420}
        ariaLabel={t("pnl.aria")}
      />
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary-color)",
          fontSize: 14,
        }}
      >
        {t("pnl.margins", {
          gross: percent.format(gross / revenue),
          operating: percent.format(operating / revenue),
          net: percent.format(net / revenue),
        })}
      </p>
    </div>
  );
}

```

## Example: 用户路径

一周的会话从哪里来、在哪里结束。align="left" 让离开的访客停在离开时所在页面的旁边，linkColor="source" 按渠道为路径着色，onClick 返回所点击的节点或连线（含来源和目标）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/journey.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Step =
  | "searchAds"
  | "organic"
  | "newsletter"
  | "social"
  | "home"
  | "pricing"
  | "blog"
  | "signup"
  | "left"
  | "trial"
  | "abandoned"
  | "paid"
  | "expired";

const STEPS: Step[] = [
  "searchAds",
  "organic",
  "newsletter",
  "social",
  "home",
  "pricing",
  "blog",
  "signup",
  "left",
  "trial",
  "abandoned",
  "paid",
  "expired",
];

// Sessions of one week, from the acquisition channel to the subscription
const PATHS: [Step, Step, number][] = [
  ["searchAds", "home", 4200],
  ["searchAds", "pricing", 2600],
  ["organic", "home", 3800],
  ["organic", "blog", 5200],
  ["newsletter", "blog", 1900],
  ["newsletter", "pricing", 900],
  ["social", "blog", 2400],
  ["social", "home", 1100],
  ["home", "signup", 3100],
  ["home", "left", 6000],
  ["pricing", "signup", 2100],
  ["pricing", "left", 1400],
  ["blog", "signup", 1300],
  ["blog", "left", 8200],
  ["signup", "trial", 4700],
  ["signup", "abandoned", 1800],
  ["trial", "paid", 1300],
  ["trial", "expired", 3400],
];

export default function JourneyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  const nodes = useMemo(
    (): SankeyNode[] => STEPS.map((step) => ({ name: t(`journey.${step}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      PATHS.map(([from, to, value]) => ({
        source: STEPS.indexOf(from),
        target: STEPS.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        align="left"
        linkColor="source"
        format={format}
        onClick={setSelected}
        height={400}
        ariaLabel={t("journeyAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.source && selected.target
            ? t("journeyLink", {
                source: selected.source,
                target: selected.target,
                value: number.format(selected.value),
                share: (selected.percent * 100).toFixed(1),
              })
            : t("journeyNode", {
                name: selected.name,
                value: number.format(selected.value),
              })
          : t("journeyHint")}
      </p>
    </div>
  );
}

```

## Example: 实时 API 流量

从客户端到各服务及其状态码的每秒请求数，每 1.5 秒刷新一次。流量自上游向下游计算，保证每个节点的流入等于流出；iterations={0} 让节点在更新之间保持位置不变。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/live-traffic.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Client = "web" | "ios" | "android" | "partners";
type Service = "auth" | "catalog" | "search" | "checkout";
type Status = "ok" | "clientError" | "serverError";

const CLIENTS: [Client, number][] = [
  ["web", 620],
  ["ios", 380],
  ["android", 310],
  ["partners", 140],
];
const SERVICES: [Service, number][] = [
  ["auth", 0.18],
  ["catalog", 0.38],
  ["search", 0.29],
  ["checkout", 0.15],
];
const STATUSES: [Status, string][] = [
  ["ok", "var(--success-color)"],
  ["clientError", "var(--warning-color)"],
  ["serverError", "var(--danger-color)"],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Requests per second at a given tick: a slow wave plus seeded noise, then
// split downstream so every node receives exactly what it sends
function traffic(tick: number) {
  const random = mulberry32(tick * 7919 + 17);
  const flows: [string, string, number][] = [];
  let total = 0;
  for (const [client, base] of CLIENTS) {
    const rps =
      base * (1 + 0.15 * Math.sin(tick / 6 + base) + 0.08 * (random() - 0.5));
    flows.push([`client.${client}`, "gateway", rps]);
    total += rps;
  }
  let serverErrors = 0;
  for (const [service, share] of SERVICES) {
    const rps = total * share * (1 + 0.1 * (random() - 0.5));
    flows.push(["gateway", `service.${service}`, rps]);
    // checkout has an incident every 20 ticks
    const incident = service === "checkout" && tick % 20 >= 14;
    const server = rps * (incident ? 0.12 : 0.004 + 0.006 * random());
    const client = rps * (0.02 + 0.03 * random());
    flows.push([`service.${service}`, "status.ok", rps - server - client]);
    flows.push([`service.${service}`, "status.clientError", client]);
    flows.push([`service.${service}`, "status.serverError", server]);
    serverErrors += server;
  }
  const routed = flows
    .filter(([from]) => from === "gateway")
    .reduce((sum, [, , value]) => sum + value, 0);
  return { flows, total: routed, serverErrors };
}

export default function LiveTrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(id);
  }, [running]);

  const { flows, total, serverErrors } = useMemo(() => traffic(tick), [tick]);
  const rps = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("traffic.rps", { value: number.format(value) });
  }, [i18n.language, t]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): SankeyNode[] => [
      ...CLIENTS.map(([client]) => ({ name: t(`traffic.client.${client}`) })),
      { name: t("traffic.gateway"), color: "var(--text-secondary-color)" },
      ...SERVICES.map(([service]) => ({
        name: t(`traffic.service.${service}`),
      })),
      ...STATUSES.map(([status, color]) => ({
        name: t(`traffic.status.${status}`),
        color,
      })),
    ],
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value]) => ({
        source: t(`traffic.${from}`),
        target: t(`traffic.${to}`),
        value,
      })),
    [flows, t],
  );
  const errorRate = serverErrors / total;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("traffic.summary", { total: rps(total) })}{" "}
          <span
            style={{
              color:
                errorRate > 0.01
                  ? "var(--danger-color)"
                  : "var(--success-color)",
            }}
          >
            {t(errorRate > 0.01 ? "traffic.incident" : "traffic.healthy", {
              rate: percent.format(errorRate),
            })}
          </span>
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("traffic.pause") : t("traffic.resume")}
        </Button>
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={rps}
        linkColor="target"
        linkOpacity={0.35}
        // no relaxation: the nodes keep their order between updates
        iterations={0}
        height={380}
        ariaLabel={t("traffic.aria")}
      />
    </div>
  );
}

```

## Example: 对齐与配色

聊天机器人可以不经过客服层级直接解决工单，因此它的流向会跳过一列。align 决定未指定 column 的节点放在哪一列，linkColor 决定连线的着色方式，labelValues 决定标签是否显示数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/options.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  SankeyChart,
  type SankeyChartProps,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Align = NonNullable<SankeyChartProps["align"]>;
type LinkColor = NonNullable<SankeyChartProps["linkColor"]>;
type Stage =
  | "email"
  | "chat"
  | "phone"
  | "bot"
  | "tier1"
  | "tier2"
  | "engineering"
  | "solved"
  | "refunded"
  | "escalated";

const STAGES: Stage[] = [
  "email",
  "chat",
  "phone",
  "bot",
  "tier1",
  "tier2",
  "engineering",
  "solved",
  "refunded",
  "escalated",
];

// Support tickets of a month: the chatbot solves some directly, which skips
// a column; that is where `align` makes a difference
const ROUTES: [Stage, Stage, number][] = [
  ["email", "tier1", 820],
  ["chat", "bot", 1400],
  ["phone", "tier1", 520],
  ["bot", "solved", 760],
  ["bot", "tier1", 640],
  ["tier1", "solved", 1310],
  ["tier1", "refunded", 210],
  ["tier1", "tier2", 460],
  ["tier2", "solved", 280],
  ["tier2", "engineering", 180],
  ["engineering", "escalated", 180],
];

const ALIGNS: Align[] = ["justify", "left", "right", "center"];
const COLORS: LinkColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [align, setAlign] = useState<Align>("justify");
  const [linkColor, setLinkColor] = useState<LinkColor>("gradient");
  const [labelValues, setLabelValues] = useState(true);

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map((stage) => ({ name: t(`support.${stage}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ROUTES.map(([from, to, value]) => ({
        source: STAGES.indexOf(from),
        target: STAGES.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("alignLabel")}
        direction="horizontal"
        value={align}
        onChange={(value) => setAlign(value as Align)}
      >
        {ALIGNS.map((value) => (
          <Radio key={value} value={value} label={t(`align.${value}`)} />
        ))}
      </RadioGroup>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("linkColorLabel")}
          direction="horizontal"
          value={linkColor}
          onChange={(value) => setLinkColor(value as LinkColor)}
        >
          {COLORS.map((value) => (
            <Radio key={value} value={value} label={t(`linkColor.${value}`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labelValues}
          onChange={setLabelValues}
          label={t("labelValues")}
        />
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        align={align}
        linkColor={linkColor}
        labelValues={labelValues}
        height={340}
        ariaLabel={t("supportAria")}
      />
    </div>
  );
}

```

## Example: 塑料包装物质流

投放市场的各类聚合物以及包装的最终去向。renderTooltip 将连线显示为占其来源的比例（percent），将节点显示为占全部包装的比例。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/plastic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Stage =
  | "pet"
  | "hdpe"
  | "pp"
  | "film"
  | "other"
  | "market"
  | "collected"
  | "incinerated"
  | "landfill"
  | "leaked"
  | "recycled"
  | "rejected"
  | "closedLoop"
  | "downcycled";

const STAGES: { key: Stage; color?: string }[] = [
  { key: "pet" },
  { key: "hdpe" },
  { key: "pp" },
  { key: "film" },
  { key: "other" },
  { key: "market", color: "var(--text-secondary-color)" },
  { key: "collected", color: "var(--chart-series-1)" },
  { key: "incinerated", color: "var(--warning-color)" },
  { key: "landfill", color: "var(--text-muted-color)" },
  { key: "leaked", color: "var(--danger-color)" },
  { key: "recycled", color: "var(--success-color)" },
  { key: "rejected", color: "var(--text-muted-color)" },
  { key: "closedLoop", color: "var(--success-color)" },
  { key: "downcycled", color: "var(--chart-series-3)" },
];

// Plastic packaging of a region over a year, in megatonnes
const FLOWS: [Stage, Stage, number][] = [
  ["pet", "market", 4.1],
  ["hdpe", "market", 2.6],
  ["pp", "market", 3.4],
  ["film", "market", 5.2],
  ["other", "market", 1.7],
  ["market", "collected", 6.8],
  ["market", "incinerated", 5.1],
  ["market", "landfill", 4.4],
  ["market", "leaked", 0.7],
  ["collected", "recycled", 4.6],
  ["collected", "rejected", 2.2],
  ["rejected", "incinerated", 2.2],
  ["recycled", "closedLoop", 1.3],
  ["recycled", "downcycled", 3.3],
];

const keys = STAGES.map((stage) => stage.key);

export default function PlasticDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const number = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => t("plastic.mt", { value: number.format(value) }),
    [number, t],
  );

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map(({ key, color }) => ({
        name: t(`plastic.${key}`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );

  // links: percent is the share of the source node; nodes: of all the
  // packaging entering the diagram
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2, maxWidth: 240 }}>
      <strong>
        {event.source && event.target
          ? `${event.source} → ${event.target}`
          : event.name}
      </strong>
      <span>{format(event.value)}</span>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {event.source
          ? t("plastic.shareOfSource", {
              share: percent.format(event.percent),
              source: event.source,
            })
          : t("plastic.shareOfTotal", { share: percent.format(event.percent) })}
      </span>
    </div>
  );

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      renderTooltip={tooltip}
      linkColor="target"
      nodePadding={16}
      height={420}
      ariaLabel={t("plastic.aria")}
    />
  );
}

```

## Example: 供应链追踪

咖啡从产地流向各销售渠道。onClick 点击节点后，经过它的所有路径保持彩色，其余连线通过 color 置灰；点击连线则单独选中它，并显示其占来源的比例。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/supply-chain.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Site =
  | "brazil"
  | "colombia"
  | "ethiopia"
  | "vietnam"
  | "hamburg"
  | "rotterdam"
  | "north"
  | "central"
  | "south"
  | "cafes"
  | "supermarkets"
  | "online";

const SITES: Site[] = [
  "brazil",
  "colombia",
  "ethiopia",
  "vietnam",
  "hamburg",
  "rotterdam",
  "north",
  "central",
  "south",
  "cafes",
  "supermarkets",
  "online",
];

// Green coffee shipped in a month, in tonnes: origins, roasteries,
// warehouses and sales channels
const SHIPMENTS: [Site, Site, number][] = [
  ["brazil", "hamburg", 180],
  ["brazil", "rotterdam", 140],
  ["colombia", "hamburg", 95],
  ["colombia", "rotterdam", 70],
  ["ethiopia", "hamburg", 60],
  ["vietnam", "rotterdam", 125],
  ["hamburg", "north", 160],
  ["hamburg", "central", 120],
  ["hamburg", "south", 55],
  ["rotterdam", "central", 150],
  ["rotterdam", "south", 185],
  ["north", "cafes", 70],
  ["north", "supermarkets", 60],
  ["north", "online", 30],
  ["central", "cafes", 85],
  ["central", "supermarkets", 140],
  ["central", "online", 45],
  ["south", "cafes", 60],
  ["south", "supermarkets", 155],
  ["south", "online", 25],
];

// event.index of the selected mark: a node, or SITES.length + link index
type Selection = number;

// Links on every path through a node: walks upstream and downstream
function pathThrough(site: number) {
  const on = new Set<number>();
  const walk = (start: number, up: boolean) => {
    const queue = [start];
    while (queue.length) {
      const current = queue.shift()!;
      SHIPMENTS.forEach(([from, to], i) => {
        const near = SITES.indexOf(up ? to : from);
        if (near !== current || on.has(i)) return;
        on.add(i);
        queue.push(SITES.indexOf(up ? from : to));
      });
    }
  };
  walk(site, true);
  walk(site, false);
  return on;
}

export default function SupplyChainDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  // tonnes are not an Intl unit: the number is localized, the unit translated
  const format = useMemo(
    () => (value: number) =>
      t("supply.tonnes", { value: number.format(value) }),
    [t, number],
  );

  const highlighted = useMemo(() => {
    if (selection === null) return null;
    if (selection >= SITES.length) return new Set([selection - SITES.length]);
    return pathThrough(selection);
  }, [selection]);

  const nodes = useMemo(
    (): SankeyNode[] => SITES.map((site) => ({ name: t(`supply.${site}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      SHIPMENTS.map(([from, to, value], i) => ({
        source: SITES.indexOf(from),
        target: SITES.indexOf(to),
        value,
        ...(highlighted && !highlighted.has(i)
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [highlighted],
  );

  const onClick = (event: ShapeHoverEvent) =>
    setSelection((current) => (current === event.index ? null : event.index));

  let readout = t("supply.hint");
  if (selection !== null && selection < SITES.length) {
    const site = SITES[selection]!;
    const inbound = SHIPMENTS.filter(([, to]) => to === site);
    const outbound = SHIPMENTS.filter(([from]) => from === site);
    const sum = (list: typeof SHIPMENTS) =>
      list.reduce((total, [, , value]) => total + value, 0);
    readout = t("supply.node", {
      name: t(`supply.${site}`),
      inbound: format(sum(inbound)),
      from: number.format(inbound.length),
      outbound: format(sum(outbound)),
      to: number.format(outbound.length),
    });
  } else if (selection !== null) {
    const [from, to, value] = SHIPMENTS[selection - SITES.length]!;
    const sent = SHIPMENTS.filter(([source]) => source === from).reduce(
      (total, [, , v]) => total + v,
      0,
    );
    readout = t("supply.link", {
      source: t(`supply.${from}`),
      target: t(`supply.${to}`),
      value: format(value),
      share: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 0,
      }).format(value / sent),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        onClick={onClick}
        height={420}
        ariaLabel={t("supply.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={selection === null}
          onClick={() => setSelection(null)}
        >
          {t("supply.clear")}
        </Button>
      </HStack>
    </div>
  );
}

```
