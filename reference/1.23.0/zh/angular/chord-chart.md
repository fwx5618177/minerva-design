# 弦图

展示围绕圆周排列的各组之间的流量：每组是一段弧，长度取决于其流量；每条流量是连接两段弧的弦带。无向模式下，一条弦带连接一对组，宽度为两组之间双向流量之和（对称矩阵中每个关系只计一次），因此只有流入的组也有自己的弧；有向模式下，每个方向各有一条带箭头的弦带。悬停某组可高亮其弦带，悬停弦带可查看双向数值；图例可隐藏 / 显示组，方向键依次遍历各组和弦带。

Package: minerva-design@1.23.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnChordChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnChordChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"auto\" | \"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ticks",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Messages between teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart [groups]="teams[language()]" [matrix]="matrix" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teams = {
  "en": ["Design", "Engineering", "Product", "Marketing"],
  "zh": ["设计", "研发", "产品", "市场"],
  "ja": ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  "fr": ["Design", "Ingénierie", "Produit", "Marketing"]
};
  matrix = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0]
];
}

```

## Example: 地区间人口迁移

每个地区的弧长是迁出与迁入人数之和；弦带宽度为两个地区之间的双向迁移人数，提示框分别列出两个方向（数值、反向）。对角线（地区内部迁移）绘制为一个回环。groups 设置颜色，format 设置单位，padAngle 加大间隙。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart
  [groups]="text[language()].regions"
  [links]="links"
  directed
  ribbonColor="source"
  (hover)="hovered.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = signal<import('minerva-design/charts/core').ShapeHoverEvent | null>(null);
  text = {
  "en": {
    "regions": ["North", "South", "East", "West", "Center"],
    "hint": "Hover a ribbon to compare both directions",
    "flow": "{source} → {target}: {value}k · back: {reverse}k",
    "group": "{name}: {value}k"
  },
  "zh": {
    "regions": ["北部", "南部", "东部", "西部", "中部"],
    "hint": "悬停在流带上以比较两个方向",
    "flow": "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    "group": "{name}：{value} 千人"
  },
  "ja": {
    "regions": ["北部", "南部", "東部", "西部", "中部"],
    "hint": "リボンにカーソルを合わせると両方向を比較できます",
    "flow": "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    "group": "{name}: {value} 千人"
  },
  "fr": {
    "regions": ["Nord", "Sud", "Est", "Ouest", "Centre"],
    "hint": "Survolez un ruban pour comparer les deux sens",
    "flow": "{source} → {target} : {value} k · retour : {reverse} k",
    "group": "{name} : {value} k"
  }
};
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 32
  },
  {
    "source": 1,
    "target": 0,
    "value": 18
  },
  {
    "source": 0,
    "target": 4,
    "value": 45
  },
  {
    "source": 4,
    "target": 0,
    "value": 22
  },
  {
    "source": 1,
    "target": 4,
    "value": 38
  },
  {
    "source": 4,
    "target": 1,
    "value": 30
  },
  {
    "source": 2,
    "target": 4,
    "value": 51
  },
  {
    "source": 4,
    "target": 2,
    "value": 26
  },
  {
    "source": 3,
    "target": 4,
    "value": 29
  },
  {
    "source": 4,
    "target": 3,
    "value": 35
  },
  {
    "source": 2,
    "target": 3,
    "value": 14
  },
  {
    "source": 3,
    "target": 2,
    "value": 21
  },
  {
    "source": 1,
    "target": 2,
    "value": 12
  },
  {
    "source": 2,
    "target": 1,
    "value": 9
  }
];
  status = computed(() => {
    const t = this.text[this.language()];
    const hovered = this.hovered();
    if (!hovered) return t.hint;
    if (hovered.source === undefined)
      return t.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    return t.flow
      .replace("{source}", hovered.source)
      .replace("{target}", hovered.target ?? "")
      .replace("{value}", String(hovered.value))
      .replace("{reverse}", String(hovered.reverseValue ?? 0));
  });
}

```
