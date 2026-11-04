# 漏斗图

展示流程中逐级流失的各个阶段（注册、销售管道、结账），并显示每一阶段到下一阶段的转化率。悬停或使用方向键高亮阶段；点击图例项可将其隐藏。

Package: minerva-design@1.20.5

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

价格页

开始注册

验证邮箱

创建项目

邀请同事

升级为付费

{{users}} 位用户

占访客的 {{share}}

自“{{stage}}”以来流失 {{users}} 位

注册漏斗

告警

仪表板

集成

报表

开放 API

排序方式

降序

升序

数据顺序

每周 {{users}} 位用户

各功能的周活跃用户

访问

商品页

加入购物车

结账

支付

下单成功

阶段

访客

流失率

占第一阶段的 {{share}}

网店的结账漏斗

各阶段之间的流失率

投递

简历筛选

技术面试

现场面试

发放 Offer

录用

{{candidates}} 位候选人

该阶段典型耗时：{{days}}

工程岗位的招聘流程

{{stage}}：{{candidates}} 位候选人（占投递者的 {{share}}）

{{rate}} 的投递者被录用，平均耗时 {{days}}

桌面端

移动端

转化率 {{rate}}

{{device}}的结账漏斗

曝光

点击

线索

合格线索

客户

全部渠道

搜索广告

社交媒体

电子邮件

合作伙伴

渠道

上一阶段的 {{share}}

单次结果成本：{{cost}}

本月营销漏斗：{{channel}}

花费：{{spend}} · 客户：{{customers}} · 获客成本：每位客户 {{cac}}

访问

加入购物车

结账

已付款订单

根据转化率计算的月度结账漏斗

{{from}} → {{to}}

降低 {{step}} 的转化率

提高 {{step}} 的转化率

恢复为当前转化率

每月 {{orders}} 笔订单（{{ordersDelta}}）· 收入 {{revenue}}（{{revenueDelta}}）

访客

查看商品

加入购物车

结账

订单

实时更新的限时抢购漏斗

暂停

继续

重新开始

{{time}} · {{orders}} 笔订单 · 占访客的 {{rate}}

抢购已结束：共 {{orders}} 笔订单。

线索

已确认

演示

报价

谈判

{{deals}} 个商机 · {{amount}}

赢单概率：{{share}}

按管道阶段划分的未结商机金额

{{stage}}：{{deals}} 个未结商机

加权预测：{{amount}}

点击某个阶段列出其商机。

## FunnelChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/funnel-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "sort",
    "typeText": "\"descending\" | \"ascending\" | \"none\"",
    "attribute": "sort",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"trapezoid\" | \"bar\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "hideConversion",
    "typeText": "boolean",
    "attribute": "hide-conversion",
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
    "typeText": "readonly ShapeDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<FunnelChartOptions, \"type\">> | undefined",
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

## Example: 排序的条形

使用居中的条形代替梯形，各阶段按数值排序。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/bars.html

```html
<minerva-funnel-chart
  id="hiring"
  shape="bar"
  sort="descending"
  height="300"
></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/bars.ts

```tsx
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#hiring")!;
  chart.data = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```

## Example: 转化漏斗

各阶段逐级收窄，并标注相对上一阶段的转化率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.html

```html
<minerva-funnel-chart id="signup" height="300"></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.ts

```tsx
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#signup")!;
  chart.data = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```
