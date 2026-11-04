# 条形图

从左侧生长的水平条形，类别沿左侧排列：适合排名、长名称、发散型调查和进度展示。

Package: minerva-design@1.20.4

Renderer: angular

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

开发者

使用各编程语言的开发者占比

我在这里看得到职业发展路径

我的工作量是可控的

我拥有所需的工具

我的经理支持我

我的薪酬是公平的

非常不同意

不同意

同意

非常同意

员工调查结果，左侧为不同意，右侧为同意

已完成

评审中

待办

平台

支付

移动端

增长

设计

各团队里程碑任务的状态

票数

所有页面和邮件支持深色模式

移动设备离线模式

将报表连同图表导出为 PDF

支持 SAML 和 OIDC 单点登录

日历双向同步

批量编辑多条记录

所有对象支持自定义字段

最受期待功能的票数

预算

实际

研发

市场

销售

客服

财务

各部门的预算与实际支出

变化

北美

欧洲

亚太

拉丁美洲

中东

非洲

各地区月活跃用户的变化

用户

信息

照片

地图

音乐

备忘录

各应用的月活跃用户

{{app}}：{{users}} 百万用户

点击一个条形

收入

销量

无线耳机

智能手表

蓝牙音箱

机械键盘

快速充电器

高清摄像头

无线鼠标

平板电脑

USB-C 数据线

笔记本支架

排序依据

显示行数

前 {{n}} 名

全部商品

上月最畅销的商品，从高到低排列

这 {{n}} 件商品占总量的 {{share}}。

{{value}} GW

光伏装机容量

播放

暂停

重新播放

回到开头

{{year}} 年底光伏装机容量最多的国家

薪资区间

初级

中级

高级

资深

首席

总监

报价

最低

中位值

最高

报价 / 中位值

报价 −{{step}}

报价 +{{step}}

{{offer}} 的报价落在{{levels}}区间内。

{{offer}} 的报价不在任何区间内。

各职级的年薪区间，报价以竖线表示

剩余错误预算

发布冻结

过去 30 天各服务剩余的错误预算，从最差开始排列

SLO {{slo}}，实测可用性 {{availability}}

在允许的 {{allowed}} 中还剩 {{minutes}} 可停机时间。

预算已超支 {{minutes}}。

点击某个服务查看其预算。

## HorizontalBarChart

Support: beta

Native Angular: MnHorizontalBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Most visited pages

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[{ name: t.views, data: [
    { x: t.pages[0], y: 48200 },
    { x: t.pages[1], y: 31900 },
    { x: t.pages[2], y: 27400 },
    { x: t.pages[3], y: 15800 },
    { x: t.pages[4], y: 9100 },
    { x: t.pages[5], y: 4300 }
  ] }]"
  [xAxis]="{ type: 'category' }"
  labels
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "views": "Page views",
    "pages": ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"]
  },
  "zh": {
    "views": "浏览量",
    "pages": ["首页", "价格", "文档", "博客", "招聘", "联系我们"]
  },
  "ja": {
    "views": "ページビュー",
    "pages": ["ホーム", "料金", "ドキュメント", "ブログ", "採用情報", "お問い合わせ"]
  },
  "fr": {
    "views": "Pages vues",
    "pages": ["Accueil", "Tarifs", "Documentation", "Blog", "Carrières", "Contact"]
  }
};
}

```

## Example: Survey answers, 100 % stacked

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[
    { name: t.answers[0], data: [{ x: t.questions[0], y: 72 }, { x: t.questions[1], y: 58 }, { x: t.questions[2], y: 64 }, { x: t.questions[3], y: 81 }] },
    { name: t.answers[1], data: [{ x: t.questions[0], y: 18 }, { x: t.questions[1], y: 27 }, { x: t.questions[2], y: 21 }, { x: t.questions[3], y: 12 }] },
    { name: t.answers[2], data: [{ x: t.questions[0], y: 10 }, { x: t.questions[1], y: 15 }, { x: t.questions[2], y: 15 }, { x: t.questions[3], y: 7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [palette]="answerColors"
  stacked
  percent
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  answerColors = ["var(--success-color, #16a34a)", "var(--text-secondary-color, #9ca3af)", "var(--danger-color, #dc2626)"];
  labels = {
  "en": {
    "answers": ["Agree", "Neutral", "Disagree"],
    "questions": ["Easy to set up", "Good documentation", "Fast enough", "Would recommend"]
  },
  "zh": {
    "answers": ["同意", "中立", "不同意"],
    "questions": ["易于上手", "文档完善", "速度够快", "愿意推荐"]
  },
  "ja": {
    "answers": ["そう思う", "どちらでもない", "そう思わない"],
    "questions": ["導入が簡単", "ドキュメントが充実", "十分に速い", "人に勧めたい"]
  },
  "fr": {
    "answers": ["D’accord", "Neutre", "Pas d’accord"],
    "questions": ["Facile à installer", "Bonne documentation", "Assez rapide", "Je recommande"]
  }
};
}

```
