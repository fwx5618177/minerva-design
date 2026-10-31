import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

/** Small seeded random generator: the same traffic on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// API requests per minute, by service and endpoint, around these baselines
const SERVICES: [service: string, endpoints: [string, number][]][] = [
  [
    "checkout",
    [
      ["cart", 820],
      ["payment", 410],
      ["shipping", 260],
    ],
  ],
  [
    "search",
    [
      ["query", 980],
      ["suggest", 540],
    ],
  ],
  [
    "accounts",
    [
      ["login", 360],
      ["profile", 220],
    ],
  ],
  [
    "catalog",
    [
      ["product", 690],
      ["reviews", 240],
    ],
  ],
];
const BASELINE = SERVICES.flatMap(([, endpoints]) =>
  endpoints.map(([, rate]) => rate),
);
const SEED = 21;

export default function LiveRequestsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [rates, setRates] = useState(BASELINE);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // each endpoint drifts by up to ±15 %, pulled back toward its baseline
      const noise = BASELINE.map(() => random.current() * 0.3 - 0.15);
      setRates((current) =>
        current.map((rate, i) =>
          Math.max(
            20,
            Math.round(rate * (1 + noise[i]) + (BASELINE[i] - rate) * 0.25),
          ),
        ),
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [running]);

  const { data, totals } = useMemo(() => {
    // index of the first endpoint of each service in the flat rates
    const offsets = SERVICES.map((_, s) =>
      SERVICES.slice(0, s).reduce(
        (n, [, endpoints]) => n + endpoints.length,
        0,
      ),
    );
    const data: TreemapNode[] = SERVICES.map(([service, endpoints], s) => ({
      name: t(`requests.services.${service}`),
      children: endpoints.map(([endpoint], e) => ({
        name: t(`requests.endpoints.${endpoint}`),
        value: rates[offsets[s] + e],
      })),
    }));
    const totals = SERVICES.map(([, endpoints], s) =>
      endpoints.reduce((sum, _, e) => sum + rates[offsets[s] + e], 0),
    );
    return { data, totals };
  }, [rates, t]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const format = (value: number) =>
    t("requests.rpm", { value: number.format(value) });

  const total = totals.reduce((sum, value) => sum + value, 0);
  const busiest = totals.indexOf(Math.max(...totals));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <SunburstChart
        data={data}
        innerRadius={0.4}
        cornerRadius={3}
        padAngle={1}
        format={format}
        height={380}
        ariaLabel={t("requests.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("requests.pause") : t("requests.resume")}
        </Button>
        <span style={{ color: "var(--text-muted-color)" }}>
          {t("requests.total", { value: format(total) })}
        </span>
      </HStack>
      {/* only the busiest service is announced, not every refresh */}
      <output aria-live="polite">
        {t("requests.busiest", { service: data[busiest].name })}
      </output>
    </div>
  );
}
