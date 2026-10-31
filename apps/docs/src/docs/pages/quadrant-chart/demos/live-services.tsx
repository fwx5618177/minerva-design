import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  QuadrantChart,
  quadrantOf,
  type QuadrantPoint,
} from "minerva-design/charts";

type Service = {
  key: string;
  latency: number; // p95, milliseconds
  errors: number; // share of failed requests, 0-0.05
};

const SERVICES: Service[] = [
  { key: "auth", latency: 120, errors: 0.002 },
  { key: "search", latency: 520, errors: 0.004 },
  { key: "checkout", latency: 340, errors: 0.013 },
  { key: "catalog", latency: 180, errors: 0.003 },
  { key: "payments", latency: 610, errors: 0.016 },
  { key: "notifications", latency: 260, errors: 0.007 },
  { key: "recommendations", latency: 720, errors: 0.006 },
  { key: "media", latency: 450, errors: 0.011 },
];

// x: p95 latency (ms), y: error rate (%); the splits are the SLO limits
const geometry = {
  xDomain: [0, 1000] as [number, number],
  yDomain: [0, 4] as [number, number],
  xSplit: 400,
  ySplit: 1,
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function LiveServicesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [services, setServices] = useState(SERVICES);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(42));

  // random walk every second, pulled back toward the starting values
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const next = random.current;
      setServices((current) =>
        current.map((service, i) => {
          const base = SERVICES[i]!;
          return {
            ...service,
            latency: clamp(
              service.latency +
                (next() - 0.5) * 140 +
                (base.latency - service.latency) * 0.15,
              40,
              980,
            ),
            errors: clamp(
              service.errors +
                (next() - 0.5) * 0.006 +
                (base.errors - service.errors) * 0.15,
              0,
              0.039,
            ),
          };
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const ms = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "millisecond",
        unitDisplay: "short",
        maximumFractionDigits: 0,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const points = useMemo(
    (): QuadrantPoint[] =>
      services.map((service) => ({
        label: t(`live.services.${service.key}`),
        x: service.latency,
        y: service.errors * 100,
      })),
    [services, t],
  );
  const critical = services
    .filter(
      (service) =>
        quadrantOf(geometry, service.latency, service.errors * 100) ===
        "topRight",
    )
    .map((service) => t(`live.services.${service.key}`));

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        {...geometry}
        quadrants={{
          topLeft: {
            label: t("live.erroring"),
            color: "var(--warning-color)",
          },
          topRight: { label: t("live.critical"), color: "var(--danger-color)" },
          bottomLeft: {
            label: t("live.healthy"),
            color: "var(--success-color)",
          },
          bottomRight: { label: t("live.slow"), color: "var(--warning-color)" },
        }}
        xLabel={t("live.latency")}
        yLabel={t("live.errorRate")}
        renderTooltip={(point, index) => {
          const service = services[index];
          if (!service) return null;
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{point.label}</strong>
              <span>
                {t("live.tooltip", {
                  latency: ms.format(service.latency),
                  errors: percent.format(service.errors),
                })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("live.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output
          aria-live="polite"
          style={{
            color: critical.length
              ? "var(--danger-color)"
              : "var(--success-color)",
          }}
        >
          {critical.length
            ? t("live.criticalList", {
                list: new Intl.ListFormat(i18n.language, {
                  type: "conjunction",
                }).format(critical),
              })
            : t("live.allGood")}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("live.pause") : t("live.resume")}
        </Button>
      </HStack>
    </div>
  );
}
