import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tag,
} from "minerva-design";
import { Sparkline, type SparklineConfig } from "minerva-design/charts";

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

interface Kpi {
  label: string;
  value: string;
  delta: string;
  /** The change is good news (an increase is not always one) */
  good: boolean;
  spark: SparklineConfig;
}

export default function KpiCardsDemo() {
  const kpis = useMemo(
    (): Kpi[] => [
      {
        label: "Revenue",
        value: "$128.4k",
        delta: "+12.5%",
        good: true,
        spark: {
          data: trend(1, 3600, 4400, 0.12),
          type: "area",
          name: "Revenue ($)",
        },
      },
      {
        label: "Active users",
        value: "24,310",
        delta: "+4.1%",
        good: true,
        spark: { data: trend(2, 23_000, 24_300, 0.04), name: "Users" },
      },
      {
        label: "Signups",
        value: "1,842",
        delta: "−3.2%",
        good: false,
        spark: {
          data: trend(3, 66, 58, 0.3),
          type: "bar",
          name: "Signups",
          color: "var(--warning-color)",
        },
      },
      {
        label: "p95 latency",
        value: "182 ms",
        delta: "−8.0%",
        good: true,
        spark: {
          data: trend(4, 205, 180, 0.08),
          name: "p95 (ms)",
          reference: 200,
          color: "var(--success-color)",
        },
      },
    ],
    [],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {kpis.map((kpi) => (
        <Card key={kpi.label} padding="medium">
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <CardTitle style={{ fontSize: 24 }}>{kpi.value}</CardTitle>
              <Tag size="small" color={kpi.good ? "success" : "danger"}>
                {kpi.delta}
              </Tag>
            </div>
          </CardHeader>
          <CardContent>
            <Sparkline
              {...kpi.spark}
              height={56}
              ariaLabel={`${kpi.label}, last 30 days`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
