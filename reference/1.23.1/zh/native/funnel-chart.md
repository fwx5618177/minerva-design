# 漏斗图

展示流程中逐级流失的各个阶段（注册、销售管道、结账），并显示每一阶段到下一阶段的转化率。悬停或使用方向键高亮阶段；点击图例项可将其隐藏。

Package: minerva-design@1.23.1

Renderer: native

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

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "FunnelChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Stages: a name, a value and an optional color"
  },
  {
    "name": "sort",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "ascending",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:36d9ac8380d45cabf9fa",
    "required": false,
    "description": "Order of the stages"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Vertical gap between the stages, in pixels"
  },
  {
    "name": "conversion",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the conversion rate from the previous stage"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "bar",
      "trapezoid"
    ],
    "typeText": "\"trapezoid\" | \"bar\" | undefined",
    "typeRef": "type:2675a8a0582ff11e80f5",
    "default": "trapezoid",
    "required": false,
    "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
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
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
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
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
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
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
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
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
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
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:FunnelChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of FunnelChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true,
        "description": "Stages: a name, a value and an optional color"
      },
      {
        "name": "sort",
        "type": "\"descending\" | \"ascending\" | \"none\"",
        "required": false,
        "default": "\"none\" (data order)",
        "description": "Order of the stages"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Vertical gap between the stages, in pixels"
      },
      {
        "name": "conversion",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the conversion rate from the previous stage"
      },
      {
        "name": "shape",
        "type": "\"trapezoid\" | \"bar\"",
        "required": false,
        "default": "\"trapezoid\"",
        "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

梯形逐级收窄并显示转化率；renderTooltip 用 React 补充访客占比和流失人数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  FunnelChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Sign-up funnel of a mobile app over one week
const stages = [
  { key: "install", value: 12400 },
  { key: "open", value: 9100 },
  { key: "signup", value: 4300 },
  { key: "trial", value: 1900 },
  { key: "paid", value: 640 },
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.native.data",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const locale = i18n.language;
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const data = useMemo(
    () => stages.map(({ key, value }) => ({ name: t(`stages.${key}`), value })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <FunnelChart
        data={data}
        height={300}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        onClick={setSelected}
        ariaLabel={t("signupAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("selectedStage", {
              stage: selected.name,
              users: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("tapStage")}
      </Text>
    </View>
  );
}

```
