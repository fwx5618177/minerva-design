# 矩形树图

以面积与数值成正比的嵌套矩形展示层级数据，一眼看出哪些部分占用最多（磁盘占用、预算、投资组合）。悬停或使用方向键高亮单元格；提示框会显示其路径。

Package: minerva-design@1.20.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

媒体

视频

照片

音乐

应用程序

项目

系统

资源库

缓存

日志

下载

安装包

压缩包

按文件夹统计的磁盘用量

{{path}}：{{size}}（占磁盘的 {{share}}）

点击一个单元格查看它的位置

研发

销售

市场

客户成功

运营

财务

人力资源

法务

各部门的年度预算

科技

金融

医疗

能源

消费

市值：{{value}}

按板块分组、按当日涨跌着色的股市热力图

占打包体积的 {{share}}

按模块统计的 JavaScript 打包体积

总计 {{size}}；超过 100 KB 的依赖：{{modules}}。

电子产品

家居

服饰

运动

手机

笔记本电脑

音频

厨房

家具

装饰

女装

男装

童装

户外

健身

目录路径

全部类别

按类别、子类别和品牌划分的季度收入

按子类别和品牌划分的{{category}}收入

{{path}}：{{revenue}}，占该类别的 {{share}}。

点击某个类别将其展开。

点击某个品牌查看其收入。

计算

数据库

存储

网络

可观测性

占账单的 {{share}}

按服务和资源划分的月度云成本

显示：{{visible}}，占 {{total}} 账单的 {{share}}。

月度账单：{{total}}。

全部显示

实时更新

{{used}} / {{limit}}（{{share}}）

按命名空间划分的集群 Pod 内存使用量

超过内存上限 {{threshold}} 的 Pod：{{pods}}

所有 Pod 均低于内存上限的 {{threshold}}。

欧洲

美洲

亚太

指标

收入

订单数

利润

占总计的 {{share}}（{{metric}}）

按地区和国家划分的年度销售：{{metric}}

## TreemapChart

Support: beta

Native Angular: MnTreemapChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTreemapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "headers",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Nested nodes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTreemapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreemapChart],
  template: `
@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t.media, children: [
      { name: t.photos, value: 48 },
      { name: t.videos, value: 96 },
      { name: t.music, value: 22 }
    ] },
    { name: t.documents, children: [
      { name: t.work, value: 31 },
      { name: t.personal, value: 12 }
    ] },
    { name: t.apps, children: [
      { name: t.tools, value: 40 },
      { name: t.games, value: 64 }
    ] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "media": "Media",
    "documents": "Documents",
    "apps": "Apps",
    "photos": "Photos",
    "videos": "Videos",
    "music": "Music",
    "work": "Work",
    "personal": "Personal",
    "tools": "Tools",
    "games": "Games"
  },
  "zh": {
    "media": "媒体",
    "documents": "文档",
    "apps": "应用",
    "photos": "照片",
    "videos": "视频",
    "music": "音乐",
    "work": "工作",
    "personal": "个人",
    "tools": "工具",
    "games": "游戏"
  },
  "ja": {
    "media": "メディア",
    "documents": "書類",
    "apps": "アプリ",
    "photos": "写真",
    "videos": "動画",
    "music": "音楽",
    "work": "仕事",
    "personal": "個人",
    "tools": "ツール",
    "games": "ゲーム"
  },
  "fr": {
    "media": "Médias",
    "documents": "Documents",
    "apps": "Applications",
    "photos": "Photos",
    "videos": "Vidéos",
    "music": "Musique",
    "work": "Travail",
    "personal": "Personnel",
    "tools": "Outils",
    "games": "Jeux"
  }
};
}

```

## Example: 扁平

没有子节点时每个节点都是叶子；gap 加大单元格之间的间距。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTreemapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreemapChart],
  template: `
@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t[0], value: 4750 },
    { name: t[1], value: 745 },
    { name: t[2], value: 600 },
    { name: t[3], value: 440 },
    { name: t[4], value: 1460 },
    { name: t[5], value: 46 }
  ]"
  [gap]="4"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  "zh": ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  "ja": ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  "fr": ["Asie", "Europe", "Amérique du Nord", "Amérique du Sud", "Afrique", "Océanie"]
};
}

```
