import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { ChordChart } from "minerva-design/charts";

const SERVICES = [
  "gateway",
  "users",
  "orders",
  "inventory",
  "payments",
  "notifications",
] as const;

// Typical calls per second: row = caller, column = callee
const BASE = [
  [0, 420, 360, 180, 0, 0],
  [0, 0, 40, 0, 0, 90],
  [0, 120, 0, 260, 210, 150],
  [0, 0, 30, 0, 0, 20],
  [0, 60, 80, 0, 0, 110],
  [0, 30, 0, 0, 0, 0],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// The call matrix at a given tick: a traffic wave plus seeded noise; every
// 12 ticks a checkout campaign doubles the order and payment calls for a while
function calls(tick: number) {
  const random = mulberry32(tick * 2654435761);
  const wave = 1 + 0.25 * Math.sin(tick / 4);
  const campaign = tick % 12 >= 8;
  return BASE.map((row) =>
    row.map((value, j) => {
      if (!value) return 0;
      const boost =
        campaign && (SERVICES[j] === "orders" || SERVICES[j] === "payments")
          ? 2
          : 1;
      return Math.round(value * wave * boost * (0.85 + 0.3 * random()));
    }),
  );
}

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(id);
  }, [running]);

  const matrix = useMemo(() => calls(tick), [tick]);
  const groups = useMemo(
    () => SERVICES.map((service) => t(`calls.services.${service}`)),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language);
    return (value: number) =>
      t("calls.perSecond", { value: number.format(value) });
  }, [i18n.language, t]);

  let total = 0;
  let busiest = { from: 0, to: 0, value: 0 };
  matrix.forEach((row, i) =>
    row.forEach((value, j) => {
      total += value;
      if (value > busiest.value) busiest = { from: i, to: j, value };
    }),
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("calls.summary", {
            total: format(total),
            from: groups[busiest.from],
            to: groups[busiest.to],
            value: format(busiest.value),
          })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("calls.pause") : t("calls.resume")}
        </Button>
      </HStack>
      <ChordChart
        groups={groups}
        matrix={matrix}
        directed
        ribbonColor="source"
        format={format}
        ticks={false}
        legend={false}
        height={420}
        ariaLabel={t("calls.aria")}
      />
    </div>
  );
}
