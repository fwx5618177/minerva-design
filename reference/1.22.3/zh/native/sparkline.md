# 迷你图

没有坐标轴和图例、只有文字大小的迷你图，在数字旁展示趋势走向：用于 KPI 卡片、表格单元格或列表中。悬停即可读取数值。

Package: minerva-design@1.22.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

订单

每周订单，{{variant}}

收入

活跃用户

注册数

p95 延迟

{{metric}}，最近 30 天

服务

API 网关

身份认证

搜索

支付

通知

请求数 / 分钟

p95 延迟（30 天）

{{service}}最近 30 天的 p95 延迟

今日

变化

服务延迟

代码

Acme 集团

Nova 生物科技

Orbit 航天

Kite 机器人

Luma 能源

{{symbol}} 今日价格

价格

自选股

最近 14 天的访问量：

访问量

最近 14 天的访问量

第 7 天部署后错误数激增，随后恢复正常：

错误

最近 14 天每天的错误数

这两周的午后气温：

气温

最近 14 天的午后气温

CPU

{{server}} 的 CPU 使用率

告警

正常

日活跃用户

最近一天：{{date}}

{{date}} · 自 9 月 1 日以来 {{change}}

9 月 1 日至 10 月 31 日的日活跃用户

{{value}} 步

完成目标的 {{value}}

{{days}} 天中有 {{reached}} 天达到 {{goal}} 步的目标

步数

四周内每天的步数及每日目标

雷克雅未克

蒙特利尔

东京

开罗

新加坡

悉尼

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} 每月平均日最高气温

时段

7 天

30 天

90 天

后半段对比前半段

对比上一时段

最近 {{period}} 的每日营收

## Sparkline

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Sparkline"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "height",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 48,
    "required": false,
    "description": "Height of the sparkline"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
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
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted points change"
  }
]
```

## API

```json
{
  "native:SparklineProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of Sparkline",
    "kind": "interface",
    "extends": [
      "Pick<ChartCommonProps, | \"width\" | \"tooltip\" | \"palette\" | \"ariaLabel\" | \"locale\" | \"labels\" | \"onHover\" | \"renderTooltip\" | \"style\" | \"testID\" | \"ref\">",
      "SparklineConfig"
    ],
    "props": [
      {
        "name": "height",
        "type": "DimensionValue",
        "required": false,
        "default": "48",
        "description": "Height of the sparkline"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

同一组数据分别绘制为平滑折线、面积和柱；reference 在指定值处画一条虚线，例如平均值或目标值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  Sparkline,
  useTheme,
  type SparklineProps,
} from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30 daily values drifting from `from` to `to`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

// KPI rows of a dashboard: the value of today and the trend of 30 days
export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const { colors } = useTheme();
  const locale = i18n.language;
  const rows = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    const kpis: {
      label: string;
      data: number[];
      format: Intl.NumberFormat;
      spark: Partial<SparklineProps>;
    }[] = [
      {
        label: t("activeUsers"),
        data: trend(2, 9_800, 12_600, 0.1),
        format: compact,
        spark: { type: "area" },
      },
      {
        label: t("signups"),
        data: trend(3, 180, 240, 0.4),
        format: number,
        spark: { type: "bar" },
      },
      {
        label: t("p95"),
        data: trend(4, 240, 205, 0.15),
        format: ms,
        spark: { color: "var(--success-color)" },
      },
    ];
    return kpis;
  }, [t, locale]);
  return (
    <View style={{ width: "100%", gap: 16 }}>
      {rows.map(({ label, data, format, spark }) => (
        <View
          key={label}
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <View style={{ width: 120 }}>
            <Text style={{ color: colors["text-secondary-color"] }}>
              {label}
            </Text>
            <Text
              style={{
                color: colors["text-color"],
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {format.format(data[data.length - 1] ?? 0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Sparkline
              data={data}
              name={label}
              locale={locale}
              format={(value) => format.format(value)}
              height={44}
              ariaLabel={t("last30Aria", { metric: label })}
              {...spark}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

```
