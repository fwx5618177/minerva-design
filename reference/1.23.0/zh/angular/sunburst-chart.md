# 旭日图

用同心圆环展示层级结构：每一圈是一个层级，每个扇区是其父节点的一部分。点击父节点（或在其上按 Enter）可下钻，点击中心（或按 Backspace）返回上一级，切换时角度和圆环会以动画过渡。悬停扇区会高亮其祖先和后代，标签会根据空间沿弧线或沿半径排布。

Package: minerva-design@1.23.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnSunburstChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSunburstChart"
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
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillDown",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

### events

```json
[
  {
    "name": "drillChange",
    "typeText": "ShapeDrillEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 磁盘占用

一台笔记本电脑中各文件夹和应用的占用空间（GB）。点击文件夹即可下钻，点击中心返回上一级；onDrill 返回当前聚焦的路径，显示在图表下方。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.folders[0], children: [{ name: t.files[0], value: 12 }, { name: t.files[1], value: 3 }] },
    { name: t.folders[1], children: [{ name: t.files[2], value: 46 }, { name: t.files[3], value: 21 }] },
    { name: t.folders[2], children: [{ name: t.files[4], value: 18 }, { name: t.files[5], value: 7 }] },
    { name: t.folders[3], children: [{ name: t.files[6], value: 9 }, { name: t.files[7], value: 32 }] }
  ]"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "folders": ["Documents", "Photos", "Music", "Apps"],
    "files": ["Work", "Taxes", "2025", "2026", "Albums", "Podcasts", "Tools", "Games"]
  },
  "zh": {
    "folders": ["文档", "照片", "音乐", "应用"],
    "files": ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"]
  },
  "ja": {
    "folders": ["書類", "写真", "ミュージック", "アプリ"],
    "files": ["仕事", "税金", "2025", "2026", "アルバム", "ポッドキャスト", "ツール", "ゲーム"]
  },
  "fr": {
    "folders": ["Documents", "Photos", "Musique", "Applications"],
    "files": ["Travail", "Impôts", "2025", "2026", "Albums", "Podcasts", "Outils", "Jeux"]
  }
};
}

```

## Example: 受控下钻与面包屑

drillPath 让聚焦状态受控：点击只会触发 onDrill，路径由面包屑管理，因此其中的按钮可以跳转到任意层级。cornerRadius 和 padAngle 让扇区更圆润、间隔更清晰。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.teams[0], children: [{ name: t.groups[0], value: 18 }, { name: t.groups[1], value: 11 }, { name: t.groups[2], value: 14 }] },
    { name: t.teams[1], children: [{ name: t.groups[3], value: 16 }, { name: t.groups[4], value: 12 }] },
    { name: t.teams[2], children: [{ name: t.groups[5], value: 20 }, { name: t.groups[6], value: 8 }] }
  ]"
  [innerRadius]="0.32"
  (drillChange)="path = $event.path"
/>
<output aria-live="polite">{{ t.root }}@for (name of path; track $index) { › {{ name }} }</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path: string[] = [];
  labels = {
  "en": {
    "root": "Company",
    "teams": ["Engineering", "Sales", "Support"],
    "groups": ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    "hint": "Click a team"
  },
  "zh": {
    "root": "公司",
    "teams": ["研发", "销售", "客服"],
    "groups": ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    "hint": "点击一个团队"
  },
  "ja": {
    "root": "会社",
    "teams": ["エンジニアリング", "営業", "サポート"],
    "groups": ["Web", "モバイル", "プラットフォーム", "ヨーロッパ", "アジア", "一次対応", "二次対応"],
    "hint": "チームをクリックします"
  },
  "fr": {
    "root": "Entreprise",
    "teams": ["Ingénierie", "Ventes", "Support"],
    "groups": ["Web", "Mobile", "Plateforme", "Europe", "Asie", "Niveau 1", "Niveau 2"],
    "hint": "Cliquez sur une équipe"
  }
};
}

```
