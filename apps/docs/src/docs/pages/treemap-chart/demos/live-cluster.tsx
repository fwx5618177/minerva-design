import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

/** Small seeded random generator: the same "cluster" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Memory used by the pods of a Kubernetes cluster (MB), by namespace;
// every pod has a memory limit
const PODS: { namespace: string; pod: string; used: number; limit: number }[] =
  [
    { namespace: "checkout", pod: "api-7f9c", used: 820, limit: 1024 },
    { namespace: "checkout", pod: "api-b21d", used: 760, limit: 1024 },
    { namespace: "checkout", pod: "worker-5a0e", used: 410, limit: 512 },
    { namespace: "search", pod: "indexer-0", used: 1650, limit: 2048 },
    { namespace: "search", pod: "query-88c1", used: 540, limit: 1024 },
    { namespace: "search", pod: "query-3e47", used: 500, limit: 1024 },
    { namespace: "data", pod: "postgres-0", used: 2900, limit: 4096 },
    { namespace: "data", pod: "redis-0", used: 610, limit: 1024 },
    { namespace: "monitoring", pod: "prometheus-0", used: 1380, limit: 2048 },
    { namespace: "monitoring", pod: "grafana-6d2f", used: 230, limit: 512 },
  ];
const NAMESPACES = [...new Set(PODS.map((p) => p.namespace))];
const NEAR_LIMIT = 0.85;

export default function LiveClusterDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [used, setUsed] = useState(() => PODS.map((p) => p.used));
  const random = useRef(mulberry32(5));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // each pod drifts up or down by up to 8% of its limit
      const steps = PODS.map((p) => (random.current() - 0.48) * p.limit * 0.08);
      setUsed((current) =>
        current.map((value, i) =>
          Math.min(
            PODS[i].limit,
            Math.max(PODS[i].limit * 0.15, value + steps[i]),
          ),
        ),
      );
    }, 2000);
    return () => window.clearInterval(timer);
  }, [live]);

  // pods close to their limit turn red; the others take shades of their
  // namespace color
  const data = useMemo(
    (): TreemapNode[] =>
      NAMESPACES.map((namespace) => ({
        name: namespace,
        children: PODS.flatMap((p, i) =>
          p.namespace === namespace
            ? [
                {
                  name: p.pod,
                  value: used[i],
                  color:
                    used[i] / p.limit >= NEAR_LIMIT
                      ? "var(--danger-color)"
                      : undefined,
                },
              ]
            : [],
        ),
      })),
    [used],
  );
  const format = useMemo(() => {
    const megabytes = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabyte",
      maximumFractionDigits: 0,
    });
    return (value: number) => megabytes.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  const pressured = PODS.filter((p, i) => used[i] / p.limit >= NEAR_LIMIT);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("cluster.live")} />
      <TreemapChart
        data={data}
        gap={2}
        format={format}
        renderTooltip={(cell) => {
          const pod = PODS.findIndex((p) => p.pod === cell.name);
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{(cell.path ?? [cell.name]).join(" / ")}</strong>
              <span>
                {pod < 0
                  ? format(cell.value)
                  : t("cluster.usage", {
                      used: format(cell.value),
                      limit: format(PODS[pod].limit),
                      share: percent.format(cell.value / PODS[pod].limit),
                    })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("cluster.aria")}
      />
      {/* announced when the list of pods near their limit changes */}
      <output
        aria-live="polite"
        style={{ color: pressured.length ? "var(--danger-color)" : undefined }}
      >
        {pressured.length
          ? t("cluster.nearLimit", {
              pods: pressured.map((p) => p.pod).join(", "),
              threshold: percent.format(NEAR_LIMIT),
            })
          : t("cluster.healthy", { threshold: percent.format(NEAR_LIMIT) })}
      </output>
    </div>
  );
}
