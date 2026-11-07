# 弦图

展示围绕圆周排列的各组之间的流量：每组是一段弧，长度取决于其流量；每条流量是连接两段弧的弦带。无向模式下，一条弦带连接一对组，宽度为两组之间双向流量之和（对称矩阵中每个关系只计一次），因此只有流入的组也有自己的弧；有向模式下，每个方向各有一条带箭头的弦带。悬停某组可高亮其弦带，悬停弦带可查看双向数值；图例可隐藏 / 显示组，方向键依次遍历各组和弦带。

Package: minerva-design@1.22.2

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

设计

研发

产品

市场

四个团队一周内互发的消息数

北美

拉丁美洲

欧洲

非洲

西亚

南亚

东亚

大洋洲

{{value}} 百万人

五年间世界各地区之间的人口迁移

app

router

store

ui-kit

api-client

auth

i18n

utils

代码库各模块之间的导入关系

美国

中国

欧盟

墨西哥

加拿大

日本

韩国

主要经济体一年内的货物贸易

首页

搜索

分类

商品

购物车

结算

{{value}} 千次访问

悬停页面或弦带查看详情

{{source}} → {{target}}：{{value}}（反向：{{reverse}}）

{{name}}：流入与流出共 {{value}}

购物应用一天内各页面之间的跳转

美国东部

美国西部

欧洲中部

亚太东南

亚太东北

南美

{{value}} Gbit/s

数据中心之间的复制流量

标签

自动

切向

径向

无

组的顺序

数据顺序

从大到小

从小到大

弦带颜色

渐变

源

目标

中性

有向

刻度

其他运营商

年份

{{year}} 年

{{name}} {{value}}

{{name}} 赢得的用户最多（净增 {{value}}）。净变化：{{list}}。

{{year}} 年移动运营商之间的用户转网

物理

化学

生物

医学

计算机科学

数学

经济

工程

点击某个学院聚焦其合作关系，或点击一条带查看这一对学院

{{name}}：合著论文 {{total}} 篇，主要合作方为 {{partners}}

{{name}}（{{value}}）

{{a}}与{{b}}：合著论文 {{value}} 篇

清除

一所大学各学院五年间合著的论文

咖啡

牛奶

面包

糕点

水果

麦片

酸奶

果汁

{{a}} + {{b}}

在 {{value}} 个购物篮中一起购买（占全部购物篮的 {{share}}）

与其他品类组合 {{value}} 次

一个月内在同一购物篮中一起购买的商品品类

网关

用户

订单

库存

支付

通知

{{value}} 次/秒

总计：{{total}}。最繁忙：{{from}} → {{to}}（{{value}}）

暂停

继续

微服务之间的实时每秒调用次数

伦敦

巴黎

法兰克福

伊斯坦布尔

迪拜

新加坡

东京

纽约

{{value}} 百万人次

显示全部枢纽

东部枢纽

西部枢纽

至少显示两个枢纽才能看到它们之间的航线

显示 {{total}} 个枢纽中的 {{shown}} 个：{{routes}} 条航线，每年 {{passengers}}

主要机场枢纽之间的年旅客量

## ChordChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ChordChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "boolean",
    "required": false,
    "description": "Entry and update animations, skipped when the user prefers reduced motion (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ShapeLegendOptions",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts)",
    "typeText": "boolean | ShapeLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ShapeTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it (default `true`)",
    "typeText": "boolean | ShapeTooltipOptions"
  },
  {
    "name": "ticks",
    "type": "number | boolean",
    "required": false,
    "description": "Value ticks outside the arcs; a number sets the step between ticks (default `true` when large enough)",
    "typeText": "number | boolean"
  },
  {
    "name": "directed",
    "type": "boolean",
    "required": false,
    "description": "One ribbon per direction, arcs sized by the outgoing plus the incoming flows (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "arrows",
    "type": "boolean",
    "required": false,
    "description": "Arrowheads at the target end of the ribbons (default `true` when `directed`)",
    "typeText": "boolean"
  },
  {
    "name": "groups",
    "type": "readonly (string | ChordGroup)[]",
    "required": false,
    "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended",
    "typeText": "readonly (string | ChordGroup)[]"
  },
  {
    "name": "labels",
    "type": "\"auto\" | \"none\" | \"tangential\" | \"radial\"",
    "required": false,
    "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks the one that fits (default `auto`)",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\""
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D (default `auto`, see `setDefaultChartRenderer`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the drawing, in pixels (default 8 on every side)",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart (default: the chart type, e.g. \"Donut chart\")",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default",
    "typeText": "string"
  },
  {
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "percentFormat",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, \"40.0%\")",
    "typeText": "((share: number) => string)"
  },
  {
    "name": "padAngle",
    "type": "number",
    "required": false,
    "description": "Gap between the groups, in degrees (default 2)",
    "typeText": "number"
  },
  {
    "name": "startAngle",
    "type": "number",
    "required": false,
    "description": "Angle of the first group, degrees clockwise from 12 o'clock (default 0)",
    "typeText": "number"
  },
  {
    "name": "ribbonOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the ribbons, 0-1 (default 0.65)",
    "typeText": "number"
  },
  {
    "name": "arcWidth",
    "type": "number",
    "required": false,
    "description": "Thickness of the group arcs, in pixels (default 6% of the radius)",
    "typeText": "number"
  },
  {
    "name": "matrix",
    "type": "readonly (readonly number[])[]",
    "required": false,
    "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)",
    "typeText": "readonly (readonly number[])[]"
  },
  {
    "name": "links",
    "type": "readonly ChordLink[]",
    "required": false,
    "description": "Flows as a list (by group name or index); takes precedence over `matrix`",
    "typeText": "readonly ChordLink[]"
  },
  {
    "name": "sortGroups",
    "type": "\"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the groups around the circle (default `none`: data order)",
    "typeText": "\"none\" | \"ascending\" | \"descending\""
  },
  {
    "name": "sortSubgroups",
    "type": "\"auto\" | \"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings (default `auto`)",
    "typeText": "\"auto\" | \"none\" | \"ascending\" | \"descending\""
  },
  {
    "name": "ribbonColor",
    "type": "\"neutral\" | \"target\" | \"gradient\" | \"source\"",
    "required": false,
    "description": "Color of the ribbons without `color` (default `gradient`)",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\""
  },
  {
    "name": "tickFormat",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the tick labels (default: compact numbers of the `locale`)",
    "typeText": "((value: number) => string)"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: migration

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/vue/migration.vue

```vue
<script setup lang="ts">
// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; @hover reads both directions of a ribbon
// (`value` and `reverseValue`).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { ChordChart, type ShapeHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const links = MOVES.map(([from, to, value]) => ({
  source: from,
  target: to,
  value,
}));
const hovered = ref<ShapeHoverEvent | null>(null);
const status = computed(() => {
  const event = hovered.value;
  if (!event) return text.value.hint;
  if (event.source === undefined)
    return text.value.group
      .replace("{name}", event.name)
      .replace("{value}", String(event.value));
  return text.value.flow
    .replace("{source}", event.source)
    .replace("{target}", event.target ?? "")
    .replace("{value}", String(event.value))
    .replace("{reverse}", String(event.reverseValue ?? 0));
});
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <ChordChart
      :groups="text.regions"
      :links="links"
      directed
      ribbon-color="source"
      @hover="hovered = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```

## Example: teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/vue/teams.vue

```vue
<script setup lang="ts">
// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { ChordChart } from "minerva-design/vue/charts";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

const { language } = useI18n();
const groups = computed(() => TEAMS[language.value] ?? TEAMS.en);
</script>

<template>
  <ChordChart :groups="groups" :matrix="MATRIX" />
</template>

```
