# 旭日图

用同心圆环展示层级结构：每一圈是一个层级，每个扇区是其父节点的一部分。点击父节点（或在其上按 Enter）可下钻，点击中心（或按 Backspace）返回上一级，切换时角度和圆环会以动画过渡。悬停扇区会高亮其祖先和后代，标签会根据空间沿弧线或沿半径排布。

Package: minerva-design@1.20.6

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

应用程序

文稿

项目

归档

PDF 文件

电子表格

照片

开发

包缓存

模拟器

系统

音乐

其他应用

{{value}} GB

按文件夹统计的磁盘占用，单位为 GB

当前显示 {{path}}。点击中心返回上一级。

点击文件夹即可下钻。

研发

平台

基础设施

安全

开发者工具

产品研发

Web

移动端

支付

数据

数据分析

机器学习

销售

欧洲、中东和非洲

美洲

亚太

客户成功

客服

客户上手

市场

品牌

增长

内容

运营

财务

人力资源

法务

IT

{{value}} 人

按部门、小组和团队统计的人数

全部商品

数码电子

手机

旗舰机

中端机

配件

笔记本电脑

音频

耳机

音箱

家居

厨房

家具

装饰

服饰

男装

女装

童装

运动

户外

健身

类目路径

按商品类目统计的季度收入

亚洲

非洲

欧洲

美洲

大洋洲

其他国家

{{value}} 百万

标签方式

自动

沿弧线

沿半径

不显示

按大洲和国家统计的世界人口，单位为百万

教育

医疗

交通

公共安全

环境

行政

中小学

大学

图书馆

医院

疾病预防

公共交通

道路

自行车道

警务

消防

公园

垃圾清运

供水

{{path}}：{{amount}}，占预算的 {{share}}，占{{area}}的 {{areaShare}}。

{{path}}：{{amount}}，占预算的 {{share}}。

按政策领域和项目划分的城市年度预算

年度预算：{{total}}。点击某个扇区查看其占比。

连锁面包店

牙科诊所

语言学校

内部

网站

品牌设计

预约系统

移动应用

行政事务

培训

设计

开发

会议

评审

支持

学习

时间段

本周

本月

{{hours}} · 占记录工时的 {{share}}

按客户、项目和活动划分的工时（{{period}}）

可计费：{{billable}}，共 {{total}}（{{share}}）。

结账

搜索

账户

商品目录

购物车

支付

配送

查询

搜索建议

登录

个人资料

商品页

评价

{{value}} 次/分钟

按服务和端点划分的每分钟 API 请求数，实时更新

暂停

继续

总计：{{value}}

最繁忙的服务：{{service}}

可再生能源

核能

化石燃料

风能

太阳能

水电

生物质能

天然气

煤炭

石油

{{value}} 太瓦时

隐藏化石燃料

按能源和燃料划分的年度发电量

已隐藏可再生能源：显示 {{total}}。

可再生能源：占所显示 {{total}} 的 {{share}}。

## SunburstChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "SunburstChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly TreemapNode[]",
    "typeRef": "type:eddc87b67d233941af29",
    "required": true,
    "description": "Nodes: leaves carry a value, parents sum their children"
  },
  {
    "name": "innerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.26,
    "required": false,
    "description": "Radius of the center circle as a fraction of the outer radius"
  },
  {
    "name": "levels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Rings shown at once below the focused node (fewer when they would be thinner than 18 px)"
  },
  {
    "name": "startAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first node, degrees clockwise from 12 o'clock"
  },
  {
    "name": "padAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Gap between the sectors, in pixels"
  },
  {
    "name": "cornerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Corner radius of the sectors, in pixels"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "none",
      "radial",
      "tangential"
    ],
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
    "typeRef": "type:450a54e2e59f3bb532d3",
    "default": "auto",
    "required": false,
    "description": "Sector labels: `auto` writes each name along the arc or along the radius, whichever fits best; labels that do not fit are shortened or skipped"
  },
  {
    "name": "drill",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Clicking (or Enter on) a parent zooms into it; clicking the center (or Backspace) goes back up"
  },
  {
    "name": "drillPath",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Names from the root to the focused node (`[]` = the root). Makes the drill-down controlled: clicks then only call `onDrill`, whose `path` should be stored and passed back."
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
    "name": "onDrill",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeDrillEvent) => void) | undefined",
    "typeRef": "type:ff41f7645453487efae1",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeDrillEvent",
        "typeRef": "type:2f6344534a4b788a1925"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a parent or the center is clicked (or the instance's `drill()` is called)"
  },
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
  "SunburstChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of SunburstChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly TreemapNode[]",
        "required": true,
        "description": "Nodes: leaves carry a value, parents sum their children"
      },
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0.26",
        "description": "Radius of the center circle as a fraction of the outer radius"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "every level",
        "description": "Rings shown at once below the focused node (fewer when they would be thinner than 18 px)"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first node, degrees clockwise from 12 o'clock"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Gap between the sectors, in pixels"
      },
      {
        "name": "cornerRadius",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Corner radius of the sectors, in pixels"
      },
      {
        "name": "labels",
        "type": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Sector labels: `auto` writes each name along the arc or along the radius, whichever fits best; labels that do not fit are shortened or skipped"
      },
      {
        "name": "drill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clicking (or Enter on) a parent zooms into it; clicking the center (or Backspace) goes back up"
      },
      {
        "name": "drillPath",
        "type": "readonly string[]",
        "required": false,
        "description": "Names from the root to the focused node (`[]` = the root). Makes the drill-down controlled: clicks then only call `onDrill`, whose `path` should be stored and passed back."
      },
      {
        "name": "onDrill",
        "type": "(event: ShapeDrillEvent) => void",
        "required": false,
        "description": "Called when a parent or the center is clicked (or the instance's `drill()` is called)"
      }
    ]
  },
  "TreemapNode": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A node of a treemap or a sunburst: leaves carry a value, parents sum their children",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the cell / sector, the header and the tooltip"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Value of a leaf (parents sum their children)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color; top-level nodes take the palette when omitted, children get shades of their parent's"
      },
      {
        "name": "children",
        "type": "readonly TreemapNode[]",
        "required": false,
        "description": "Child nodes"
      }
    ]
  },
  "ShapeDrillEvent": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "The focused node of a sunburst changed (or, when controlled, would change)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "path",
        "type": "string[]",
        "required": true,
        "description": "Names from the root to the new focused node (`[]` = the root)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 城市预算

drill={false} 让点击变为选中而不是放大：onClick 填充图表下方的文字，给出某个项目占整个预算及其所属政策领域的比例。renderTooltip 显示相同的文字，没有项目的领域则是一个普通叶子节点。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/city-budget.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SunburstChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

type Area = [key: string, programs: [string, number][] | number];

// Yearly budget of a city, in million euros: policy areas and programs
const BUDGET: Area[] = [
  [
    "education",
    [
      ["schools", 412],
      ["universities", 96],
      ["libraries", 38],
    ],
  ],
  [
    "health",
    [
      ["hospitals", 288],
      ["prevention", 64],
    ],
  ],
  [
    "transport",
    [
      ["transit", 236],
      ["roads", 118],
      ["cycling", 42],
    ],
  ],
  [
    "safety",
    [
      ["police", 154],
      ["fire", 87],
    ],
  ],
  [
    "environment",
    [
      ["parks", 71],
      ["waste", 109],
      ["water", 83],
    ],
  ],
  ["administration", 132],
];

const TOTAL = BUDGET.reduce(
  (sum, [, programs]) =>
    sum +
    (typeof programs === "number"
      ? programs
      : programs.reduce((s, [, value]) => s + value, 0)),
  0,
);

export default function CityBudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const { data, areaTotals } = useMemo(() => {
    const areaTotals = new Map<string, number>();
    const data: TreemapNode[] = BUDGET.map(([key, programs]) => {
      const name = t(`budget.areas.${key}`);
      if (typeof programs === "number") {
        areaTotals.set(name, programs);
        return { name, value: programs };
      }
      areaTotals.set(
        name,
        programs.reduce((sum, [, value]) => sum + value, 0),
      );
      return {
        name,
        children: programs.map(([program, value]) => ({
          name: t(`budget.programs.${program}`),
          value,
        })),
      };
    });
    return { data, areaTotals };
  }, [t]);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1_000_000);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  // share of the city budget, and of the policy area for a program
  const describe = (node: ShapeHoverEvent) => {
    const path = node.path ?? [node.name];
    const area = path.length > 1 ? path[0] : null;
    return {
      path: path.join(" › "),
      amount: format(node.value),
      share: percentFormat(node.value / TOTAL),
      area,
      areaShare: area
        ? percentFormat(node.value / (areaTotals.get(area) ?? node.value))
        : null,
    };
  };

  const line = (node: ShapeHoverEvent) => {
    const d = describe(node);
    return d.area
      ? t("budget.programLine", d)
      : t("budget.areaLine", {
          path: d.path,
          amount: d.amount,
          share: d.share,
        });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      {/* drill is off: a click selects a sector instead of zooming in */}
      <SunburstChart
        data={data}
        drill={false}
        innerRadius={0.32}
        format={format}
        percentFormat={percentFormat}

        renderTooltip={(node) => <span>{line(node)}</span>}
        onClick={setSelected}
        height={400}
        ariaLabel={t("budget.aria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected ? line(selected) : t("budget.hint", { total: format(TOTAL) })}
      </p>
    </div>
  );
}

```

## Example: 磁盘占用

一台笔记本电脑中各文件夹和应用的占用空间（GB）。点击文件夹即可下钻，点击中心返回上一级；onDrill 返回当前聚焦的路径，显示在图表下方。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/disk-usage.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

// Disk usage of a laptop, in GB. App and project names are proper nouns;
// the folder names come from the translations.
type Folder =
  | "applications"
  | "documents"
  | "projects"
  | "archive"
  | "pdfs"
  | "spreadsheets"
  | "photos"
  | "developer"
  | "caches"
  | "simulators"
  | "system"
  | "music"
  | "other";

interface Entry {
  name?: string;
  folder?: Folder;
  size?: number;
  children?: Entry[];
}

const DISK: Entry[] = [
  {
    folder: "applications",
    children: [
      { name: "Xcode", size: 12.4 },
      { name: "Docker", size: 9.8 },
      { name: "Figma", size: 1.2 },
      { name: "Chrome", size: 1.1 },
      { name: "Slack", size: 0.6 },
      { folder: "other", size: 3.4 },
    ],
  },
  {
    folder: "photos",
    children: [
      { name: "2024", size: 18.5 },
      { name: "2025", size: 22.1 },
      { name: "2026", size: 9.6 },
    ],
  },
  {
    folder: "developer",
    children: [
      { name: "node_modules", size: 14.2 },
      {
        folder: "caches",
        children: [
          { name: "npm", size: 3.1 },
          { name: "pnpm", size: 6.4 },
          { name: "Gradle", size: 2.2 },
        ],
      },
      { folder: "simulators", size: 11.5 },
    ],
  },
  {
    folder: "documents",
    children: [
      {
        folder: "projects",
        children: [
          { name: "minerva", size: 4.2 },
          { name: "client-site", size: 2.7 },
          { folder: "archive", size: 6.1 },
        ],
      },
      { folder: "pdfs", size: 2.3 },
      { folder: "spreadsheets", size: 0.8 },
    ],
  },
  { folder: "system", size: 18 },
  { folder: "music", size: 7.4 },
];

export default function DiskUsageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const [path, setPath] = useState<string[]>([]);

  const data = useMemo(() => {
    const convert = (entries: Entry[]): TreemapNode[] =>
      entries.map((entry) => ({
        name: entry.folder ? t(`disk.${entry.folder}`) : (entry.name ?? ""),
        value: entry.size,
        ...(entry.children ? { children: convert(entry.children) } : {}),
      }));
    return convert(DISK);
  }, [t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    return (value: number) => t("gb", { value: number.format(value) });
  }, [i18n.language, t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SunburstChart
        data={data}
        format={format}
        onDrill={(event) => setPath(event.path)}
        height={400}
        ariaLabel={t("diskAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {path.length
          ? t("diskPath", { path: [t("disk.root"), ...path].join(" / ") })
          : t("diskHint")}
      </p>
    </div>
  );
}

```

## Example: 受控下钻与面包屑

drillPath 让聚焦状态受控：点击只会触发 onDrill，路径由面包屑管理，因此其中的按钮可以跳转到任意层级。cornerRadius 和 padAngle 让扇区更圆润、间隔更清晰。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/drill-down.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Category = [key: string, revenue: number | Category[]];

// Online store revenue of a quarter, in thousands of dollars
const CATALOG: Category[] = [
  [
    "electronics",
    [
      [
        "phones",
        [
          ["flagship", 420],
          ["midRange", 310],
          ["accessories", 140],
        ],
      ],
      ["laptops", 520],
      [
        "audio",
        [
          ["headphones", 190],
          ["speakers", 110],
        ],
      ],
    ],
  ],
  [
    "home",
    [
      ["kitchen", 260],
      ["furniture", 340],
      ["decor", 120],
    ],
  ],
  [
    "fashion",
    [
      ["men", 210],
      ["women", 330],
      ["kids", 150],
    ],
  ],
  [
    "sports",
    [
      ["outdoor", 180],
      ["fitness", 160],
    ],
  ],
];

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  // controlled: the chart only proposes paths, the breadcrumb owns the state
  const [path, setPath] = useState<string[]>([]);

  const data = useMemo(() => {
    const convert = (items: Category[]): TreemapNode[] =>
      items.map(([key, revenue]) =>
        typeof revenue === "number"
          ? { name: t(`catalog.${key}`), value: revenue }
          : { name: t(`catalog.${key}`), children: convert(revenue) },
      );
    return convert(CATALOG);
  }, [t]);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1000);
  }, [i18n.language]);

  const crumbs = [t("catalog.all"), ...path];

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack gap={4} align="center" wrap as="nav" aria-label={t("breadcrumb")}>
        {crumbs.map((name, depth) => (
          <HStack key={`${depth}-${name}`} gap={4} align="center">
            {depth > 0 && <span aria-hidden>/</span>}
            <Button
              size="small"
              variant={depth === path.length ? "solid" : "ghost"}
              aria-current={depth === path.length ? "location" : undefined}
              onClick={() => setPath(path.slice(0, depth))}
            >
              {name}
            </Button>
          </HStack>
        ))}
      </HStack>
      <SunburstChart
        data={data}
        drillPath={path}
        onDrill={(event) => setPath(event.path)}
        format={format}
        cornerRadius={4}
        padAngle={2}
        height={400}
        ariaLabel={t("catalogAria")}
      />
    </div>
  );
}

```

## Example: 电力结构

图例和 Switch 编辑同一个受控的 hidden 列表（onToggle），因此无论从哪里隐藏化石燃料都会保持同步。没有细分的能源（核能）是第一层上的叶子节点，各燃料继承其能源的颜色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/energy-mix.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Source = [key: string, color: string, value: number | [string, number][]];

// Yearly electricity generation of a country, in TWh
const MIX: Source[] = [
  [
    "renewables",
    "#16a34a",
    [
      ["wind", 136],
      ["solar", 62],
      ["hydro", 19],
      ["biomass", 44],
    ],
  ],
  ["nuclear", "#7c3aed", 34],
  [
    "fossil",
    "#78716c",
    [
      ["gas", 79],
      ["coal", 128],
      ["oil", 4],
    ],
  ],
];
const FOSSIL = MIX.findIndex(([key]) => key === "fossil");
const RENEWABLES = MIX.findIndex(([key]) => key === "renewables");

const sum = (value: Source[2]) =>
  typeof value === "number"
    ? value
    : value.reduce((total, [, twh]) => total + twh, 0);

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  // controlled: the legend and the switch edit the same hidden list
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): TreemapNode[] =>
      MIX.map(([key, color, value]) =>
        typeof value === "number"
          ? { name: t(`energy.sources.${key}`), color, value }
          : {
              name: t(`energy.sources.${key}`),
              color,
              children: value.map(([fuel, twh]) => ({
                name: t(`energy.fuels.${fuel}`),
                value: twh,
              })),
            },
      ),
    [t],
  );
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = (value: number) =>
    t("energy.twh", { value: number.format(value) });

  const shown = MIX.reduce(
    (total, [, , value], i) =>
      hidden.includes(i) ? total : total + sum(value),
    0,
  );
  const renewables = sum(MIX[RENEWABLES][2]);
  const fossilHidden = hidden.includes(FOSSIL);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={fossilHidden}
        onChange={(checked) =>
          setHidden((current) =>
            checked
              ? [...current, FOSSIL]
              : current.filter((index) => index !== FOSSIL),
          )
        }
        label={t("energy.hideFossil")}
      />
      <SunburstChart
        data={data}
        legend
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        innerRadius={0.3}
        format={format}
        height={420}
        ariaLabel={t("energy.aria")}
      />
      <output aria-live="polite">
        {hidden.includes(RENEWABLES)
          ? t("energy.shownOnly", { total: format(shown) })
          : t("energy.share", {
              share: percent.format(shown ? renewables / shown : 0),
              total: format(shown),
            })}
      </output>
    </div>
  );
}

```

## Example: 标签

按大洲和国家统计的人口。labels 决定名称的书写方式：auto 为每个扇区选择沿弧线或沿半径，放不下的名称会被截断或省略。图例可以隐藏 / 显示大洲；国家名称来自 Intl.DisplayNames。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/labels.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  SunburstChart,
  type SunburstChartProps,
  type TreemapNode,
} from "minerva-design/charts";

type Labels = NonNullable<SunburstChartProps["labels"]>;

// Population in millions (2023, rounded), by continent and country (ISO code)
const WORLD: [continent: string, countries: [string, number][]][] = [
  [
    "asia",
    [
      ["IN", 1429],
      ["CN", 1410],
      ["ID", 278],
      ["PK", 240],
      ["BD", 173],
      ["JP", 124],
      ["PH", 117],
      ["VN", 99],
      ["other", 856],
    ],
  ],
  [
    "africa",
    [
      ["NG", 224],
      ["ET", 127],
      ["EG", 113],
      ["CD", 102],
      ["TZ", 67],
      ["other", 827],
    ],
  ],
  [
    "europe",
    [
      ["RU", 144],
      ["DE", 84],
      ["GB", 68],
      ["FR", 68],
      ["IT", 59],
      ["other", 319],
    ],
  ],
  [
    "americas",
    [
      ["US", 335],
      ["BR", 216],
      ["MX", 128],
      ["CO", 52],
      ["AR", 46],
      ["other", 263],
    ],
  ],
  [
    "oceania",
    [
      ["AU", 27],
      ["PG", 10],
      ["NZ", 5],
      ["other", 3],
    ],
  ],
];

const MODES: Labels[] = ["auto", "tangential", "radial", "none"];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const [labels, setLabels] = useState<Labels>("auto");
  const locale = i18n.language;

  const data = useMemo((): TreemapNode[] => {
    // country names in the reader's language
    const regions = new Intl.DisplayNames([locale], { type: "region" });
    return WORLD.map(([continent, countries]) => ({
      name: t(`world.${continent}`),
      children: countries.map(([code, value]) => ({
        name: code === "other" ? t("world.other") : (regions.of(code) ?? code),
        value,
      })),
    }));
  }, [locale, t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("millions", { value: number.format(value) });
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("labelsLabel")}
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Labels)}
      >
        {MODES.map((mode) => (
          <Radio key={mode} value={mode} label={t(`labels.${mode}`)} />
        ))}
      </RadioGroup>
      <SunburstChart
        data={data}
        labels={labels}
        format={format}
        legend
        startAngle={-30}
        height={440}
        ariaLabel={t("worldAria")}
      />
    </div>
  );
}

```

## Example: 实时 API 流量

按服务和端点划分的每分钟请求数，每 1.5 秒通过带种子的随机游走刷新一次（setInterval，在暂停和卸载时清除）。总数会显示但不播报，只有最繁忙的服务变化时才播报。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/live-requests.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

/** Small seeded random generator: the same traffic on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// API requests per minute, by service and endpoint, around these baselines
const SERVICES: [service: string, endpoints: [string, number][]][] = [
  [
    "checkout",
    [
      ["cart", 820],
      ["payment", 410],
      ["shipping", 260],
    ],
  ],
  [
    "search",
    [
      ["query", 980],
      ["suggest", 540],
    ],
  ],
  [
    "accounts",
    [
      ["login", 360],
      ["profile", 220],
    ],
  ],
  [
    "catalog",
    [
      ["product", 690],
      ["reviews", 240],
    ],
  ],
];
const BASELINE = SERVICES.flatMap(([, endpoints]) =>
  endpoints.map(([, rate]) => rate),
);
const SEED = 21;

export default function LiveRequestsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [rates, setRates] = useState(BASELINE);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // each endpoint drifts by up to ±15 %, pulled back toward its baseline
      const noise = BASELINE.map(() => random.current() * 0.3 - 0.15);
      setRates((current) =>
        current.map((rate, i) =>
          Math.max(
            20,
            Math.round(rate * (1 + noise[i]) + (BASELINE[i] - rate) * 0.25),
          ),
        ),
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [running]);

  const { data, totals } = useMemo(() => {
    // index of the first endpoint of each service in the flat rates
    const offsets = SERVICES.map((_, s) =>
      SERVICES.slice(0, s).reduce(
        (n, [, endpoints]) => n + endpoints.length,
        0,
      ),
    );
    const data: TreemapNode[] = SERVICES.map(([service, endpoints], s) => ({
      name: t(`requests.services.${service}`),
      children: endpoints.map(([endpoint], e) => ({
        name: t(`requests.endpoints.${endpoint}`),
        value: rates[offsets[s] + e],
      })),
    }));
    const totals = SERVICES.map(([, endpoints], s) =>
      endpoints.reduce((sum, _, e) => sum + rates[offsets[s] + e], 0),
    );
    return { data, totals };
  }, [rates, t]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const format = (value: number) =>
    t("requests.rpm", { value: number.format(value) });

  const total = totals.reduce((sum, value) => sum + value, 0);
  const busiest = totals.indexOf(Math.max(...totals));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <SunburstChart
        data={data}
        innerRadius={0.4}
        cornerRadius={3}
        padAngle={1}
        format={format}
        height={380}
        ariaLabel={t("requests.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("requests.pause") : t("requests.resume")}
        </Button>
        <span style={{ color: "var(--text-muted-color)" }}>
          {t("requests.total", { value: format(total) })}
        </span>
      </HStack>
      {/* only the busiest service is announced, not every refresh */}
      <output aria-live="polite">
        {t("requests.busiest", { service: data[busiest].name })}
      </output>
    </div>
  );
}

```

## Example: 组织结构

按部门、小组和团队统计的人数。levels={2} 一次只显示两圈（下钻后可看到各团队），labels="radial" 让名称沿半径方向书写。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/org.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Unit = [key: string, headcount: number | Unit[]];

// Headcount of a 300-person company: departments, groups and teams
const ORG: Unit[] = [
  [
    "engineering",
    [
      [
        "platform",
        [
          ["infrastructure", 18],
          ["security", 9],
          ["devtools", 11],
        ],
      ],
      [
        "product",
        [
          ["web", 24],
          ["mobile", 16],
          ["payments", 12],
        ],
      ],
      [
        "data",
        [
          ["analytics", 10],
          ["ml", 8],
        ],
      ],
    ],
  ],
  [
    "sales",
    [
      ["emea", 22],
      ["americas", 31],
      ["apac", 14],
    ],
  ],
  [
    "success",
    [
      ["support", 26],
      ["onboarding", 9],
    ],
  ],
  [
    "marketing",
    [
      ["brand", 7],
      ["growth", 12],
      ["content", 6],
    ],
  ],
  [
    "operations",
    [
      ["finance", 8],
      ["people", 7],
      ["legal", 4],
      ["it", 6],
    ],
  ],
];

export default function OrgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });

  const data = useMemo(() => {
    const convert = (units: Unit[]): TreemapNode[] =>
      units.map(([key, size]) =>
        typeof size === "number"
          ? { name: t(`org.${key}`), value: size }
          : { name: t(`org.${key}`), children: convert(size) },
      );
    return convert(ORG);
  }, [t]);
  const format = useMemo(() => (value: number) => t("people", { value }), [t]);

  return (
    <SunburstChart
      data={data}
      levels={2}
      labels="radial"
      innerRadius={0.3}
      format={format}
      height={400}
      ariaLabel={t("orgAria")}
    />
  );
}

```

## Example: 工时记录

按客户、项目和活动划分的工时，分为三层圆环。通过 RadioGroup 在本周和本月之间切换，扇区会以动画过渡；工时使用 Intl.NumberFormat 的小时单位格式化，摘要给出可计费工时的占比。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/demos/time-tracking.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Project = [key: string, activities: [string, number][]];
type Client = [key: string, projects: Project[]];

// Hours logged by a freelance studio during one week:
// client › project › activity
const WEEK: Client[] = [
  [
    "bakery",
    [
      [
        "website",
        [
          ["design", 6],
          ["development", 9],
          ["meetings", 2],
        ],
      ],
      [
        "branding",
        [
          ["design", 5],
          ["meetings", 1.5],
        ],
      ],
    ],
  ],
  [
    "clinic",
    [
      [
        "booking",
        [
          ["development", 12],
          ["review", 3],
          ["meetings", 2],
        ],
      ],
    ],
  ],
  [
    "school",
    [
      [
        "app",
        [
          ["design", 3],
          ["development", 8],
          ["review", 2],
        ],
      ],
    ],
  ],
  [
    "internal",
    [
      [
        "admin",
        [
          ["meetings", 3],
          ["support", 2],
        ],
      ],
      ["training", [["learning", 2.5]]],
    ],
  ],
];

// the month is not just 4 weeks: some clients had a busier month than others
const MONTH_FACTORS: Record<string, number> = {
  bakery: 3.6,
  clinic: 4.5,
  school: 4.2,
  internal: 3.8,
};

const PERIODS = ["week", "month"] as const;
type Period = (typeof PERIODS)[number];

/** Rounds to the nearest half hour */
const half = (hours: number) => Math.round(hours * 2) / 2;

export default function TimeTrackingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [period, setPeriod] = useState<Period>("week");

  const { data, total, billable } = useMemo(() => {
    const hoursOf = (client: string, hours: number) =>
      period === "week" ? hours : half(hours * MONTH_FACTORS[client]);
    const data: TreemapNode[] = WEEK.map(([client, projects]) => ({
      name: t(`time.clients.${client}`),
      children: projects.map(([project, activities]) => ({
        name: t(`time.projects.${project}`),
        children: activities.map(([activity, hours]) => ({
          name: t(`time.activities.${activity}`),
          value: hoursOf(client, hours),
        })),
      })),
    }));
    const entries = WEEK.flatMap(([client, projects]) =>
      projects.flatMap(([, activities]) =>
        activities.map(
          ([, hours]) => [client, hoursOf(client, hours)] as const,
        ),
      ),
    );
    const sum = (list: (typeof entries)[number][]) =>
      list.reduce((acc, [, hours]) => acc + hours, 0);
    return {
      data,
      total: sum(entries),
      billable: sum(entries.filter(([client]) => client !== "internal")),
    };
  }, [period, t]);

  const hours = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "short",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("time.period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(value as Period)}
      >
        {PERIODS.map((key) => (
          <Radio key={key} value={key} label={t(`time.periods.${key}`)} />
        ))}
      </RadioGroup>
      <SunburstChart
        data={data}
        innerRadius={0.28}
        padAngle={1}
        format={(value) => hours.format(value)}
        renderTooltip={(node) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(node.path ?? [node.name]).join(" › ")}</strong>
            <span>
              {t("time.tooltip", {
                hours: hours.format(node.value),
                share: percent.format(node.value / total),
              })}
            </span>
          </div>
        )}
        height={400}
        ariaLabel={t("time.aria", { period: t(`time.periods.${period}`) })}
      />
      <output aria-live="polite">
        {t("time.summary", {
          billable: hours.format(billable),
          total: hours.format(total),
          share: percent.format(billable / total),
        })}
      </output>
    </div>
  );
}

```
