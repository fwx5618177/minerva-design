import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Health = "healthy" | "degraded" | "critical";

// service, column, row, typical p95 latency (ms): hand-placed with layout="none"
const SERVICES: [string, number, number, number][] = [
  ["ingress", 0, 1.5, 12],
  ["web", 1, 0.5, 45],
  ["mobile-api", 1, 2.5, 50],
  ["orders", 2, 0, 80],
  ["payments", 2, 1, 110],
  ["search", 2, 2, 60],
  ["accounts", 2, 3, 35],
  ["postgres", 3, 0.5, 8],
  ["kafka", 3, 1.5, 5],
  ["elastic", 3, 2.5, 25],
  ["redis", 3, 3.5, 2],
];

// caller, callee, requests per second
const CALLS: [string, string, number][] = [
  ["ingress", "web", 1800],
  ["ingress", "mobile-api", 1200],
  ["web", "orders", 420],
  ["web", "search", 900],
  ["web", "accounts", 380],
  ["mobile-api", "orders", 310],
  ["mobile-api", "payments", 160],
  ["mobile-api", "accounts", 290],
  ["mobile-api", "search", 400],
  ["orders", "payments", 240],
  ["orders", "postgres", 650],
  ["orders", "kafka", 240],
  ["payments", "postgres", 310],
  ["payments", "kafka", 150],
  ["search", "elastic", 1300],
  ["accounts", "redis", 900],
  ["accounts", "postgres", 120],
];

const HEALTH: Health[] = ["healthy", "degraded", "critical"];
const HEALTH_COLORS: Record<Health, string> = {
  healthy: "var(--success-color, #16a34a)",
  degraded: "var(--warning-color, #f59e0b)",
  critical: "var(--danger-color, #ef4444)",
};

interface Metrics {
  latency: number;
  /** error rate in percent */
  errors: number;
  health: Health;
}

/** Metrics of every service at sample `tick`: seeded jitter plus an incident on payments that comes and goes */
const sample = (tick: number): Record<string, Metrics> => {
  const random = mulberry32(1000 + tick);
  const incident = Math.max(0, Math.sin(tick / 3));
  const metrics: Record<string, Metrics> = {};
  for (const [id, , , base] of SERVICES) {
    const hit =
      id === "payments" ? incident : id === "orders" ? incident * 0.4 : 0;
    const latency = Math.round(base * (0.85 + random() * 0.3) * (1 + hit * 4));
    const errors = Math.round((0.1 + random() * 0.4 + hit * 9) * 10) / 10;
    const health: Health =
      errors >= 5 || latency >= 500
        ? "critical"
        : errors >= 1 || latency >= 200
          ? "degraded"
          : "healthy";
    metrics[id] = { latency, errors, health };
  }
  return metrics;
};

/** Requests per second handled by a service (the entry point: what it sends) */
const traffic = (id: string) => {
  const sum = (side: 0 | 1) =>
    CALLS.filter((call) => call[side] === id).reduce((s, c) => s + c[2], 0);
  return sum(1) || sum(0);
};

export default function ServiceMapDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [tick, setTick] = useState(0);
  const [updated, setUpdated] = useState(() => new Date());
  const [selected, setSelected] = useState<string | null>(null);

  // a new sample every 1.5 s while live; the interval stops on unmount
  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setTick((n) => n + 1);
      setUpdated(new Date());
    }, 1500);
    return () => window.clearInterval(timer);
  }, [live]);

  const metrics = useMemo(() => sample(tick), [tick]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const time = useMemo(
    () => new Intl.DateTimeFormat(locale, { timeStyle: "medium" }),
    [locale],
  );

  // positions never change: only the colors and subtitles follow the samples
  const nodes = useMemo(
    (): GraphNode[] =>
      SERVICES.map(([id, column, row]) => ({
        id,
        label: id,
        subtitle: t("latency", { value: number.format(metrics[id]!.latency) }),
        group: metrics[id]!.health,
        x: column * 220,
        y: row * 90,
      })),
    [t, number, metrics],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CALLS.map(([source, target, rps]) => ({
        source,
        target,
        value: rps,
        label: t("rps", { value: compact.format(rps) }),
      })),
    [t, compact],
  );
  const groups = useMemo(
    () =>
      HEALTH.map((id) => ({
        id,
        name: t(`health.${id}`),
        color: HEALTH_COLORS[id],
      })),
    [t],
  );

  const counts = HEALTH.map(
    (h) => SERVICES.filter(([id]) => metrics[id]!.health === h).length,
  );
  const current = selected ? metrics[selected] : undefined;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("liveUpdates")} />
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="none"
        nodeShape="box"
        arrows
        arrowStyle="filled"
        edgeStyle="curve"
        edgeWidth={[1, 5]}
        edgeColor="target"
        edgeLabels="hover"
        animation={300}
        height={440}
        ariaLabel={t("serviceMapAria")}
        onSelectionChange={(ids) => setSelected(ids[0] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected && current
          ? t("serviceReadout", {
              name: selected,
              status: t(`health.${current.health}`),
              latency: number.format(current.latency),
              errors: percent.format(current.errors / 100),
              rps: compact.format(traffic(selected)),
            })
          : t("serviceHint")}{" "}
        {t("serviceCounts", {
          healthy: counts[0],
          degraded: counts[1],
          critical: counts[2],
          time: time.format(updated),
        })}
      </output>
    </div>
  );
}
