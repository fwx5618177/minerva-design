# 旭日图

用同心圆环展示层级结构：每一圈是一个层级，每个扇区是其父节点的一部分。点击父节点（或在其上按 Enter）可下钻，点击中心（或按 Backspace）返回上一级，切换时角度和圆环会以动画过渡。悬停扇区会高亮其祖先和后代，标签会根据空间沿弧线或沿半径排布。

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
  "specifier": "minerva-design/web-components/sunburst-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "noDrill",
    "typeText": "boolean",
    "attribute": "no-drill",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly TreemapNode[] | undefined",
    "required": false
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<SunburstChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-drill",
    "typeText": "CustomEvent",
    "description": "A parent or the center was clicked (or `drill()` called); detail: { path }"
  },
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 磁盘占用

内环为文件夹，外环为其内容；点击文件夹放大，点击中心返回。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/wc/disk-usage.html

```html
<minerva-sunburst-chart id="disk"></minerva-sunburst-chart>

```

### apps/docs/src/docs/pages/sunburst-chart/wc/disk-usage.ts

```tsx
// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.
import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#disk")!;
  chart.data = [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
  chart.options = { format: (value) => `${value} GB` };
}

```

## Example: 下钻路径

drill 事件给出从根到当前节点的路径：在图表外显示面包屑导航。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/wc/drill-down.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sunburst-chart id="org" inner-radius="0.32"></minerva-sunburst-chart>
  <output id="path" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sunburst-chart/wc/drill-down.ts

```tsx
// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.
import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#org")!;
  const path = root.querySelector<HTMLOutputElement>("#path")!;
  chart.data = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  path.textContent = `${text.root} · ${text.hint}`;
  const onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    path.textContent = [text.root, ...names].join(" › ");
  };
  chart.addEventListener("minerva-drill", onDrill);
  return () => chart.removeEventListener("minerva-drill", onDrill);
}

```
