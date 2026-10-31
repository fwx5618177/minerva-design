import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

/** Small seeded random generator: the same "transactions" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Kind = "customer" | "supplier" | "payroll" | "card" | "refund";
type Txn = { kind: Kind; amount: number; minute: number };

// amounts in k€: [kind, likelihood, min, max]
const KINDS: [Kind, number, number, number][] = [
  ["customer", 0.45, 6, 42],
  ["supplier", 0.3, -34, -5],
  ["card", 0.13, -1.6, -0.2],
  ["refund", 0.08, -4, -1],
  ["payroll", 0.04, -85, -60],
];

// transaction `i` only depends on `i`: pure, so the state updates are too
const transaction = (i: number, after: number): Txn => {
  const random = mulberry32(1000 + i);
  let roll = random();
  const [kind, , min, max] =
    KINDS.find(([, chance]) => (roll -= chance) < 0) ?? KINDS[0];
  const amount = Math.round((min + (max - min) * random()) * 10) / 10;
  return { kind, amount, minute: after + 2 + Math.floor(random() * 9) };
};

const WINDOW = 8;
const OPENING = 1240;

interface Ledger {
  count: number;
  // balance before the first transaction shown
  base: number;
  shown: Txn[];
}

const advance = (ledger: Ledger): Ledger => {
  const last = ledger.shown[ledger.shown.length - 1];
  const shown = [...ledger.shown, transaction(ledger.count, last?.minute ?? 0)];
  const dropped = shown.length > WINDOW ? shown.shift() : undefined;
  return {
    count: ledger.count + 1,
    base: ledger.base + (dropped?.amount ?? 0),
    shown,
  };
};

const initial = (): Ledger => {
  let ledger: Ledger = { count: 0, base: OPENING, shown: [] };
  for (let i = 0; i < WINDOW; i++) ledger = advance(ledger);
  return ledger;
};

// the simulated day starts at 09:00
const DAY_START = new Date(2026, 9, 30, 9, 0).getTime();

export default function LiveBalanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [ledger, setLedger] = useState(initial);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setLedger(advance), 2000);
    return () => window.clearInterval(timer);
  }, [running]);

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const signed = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const clock = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );
  const time = (minute: number) => clock.format(DAY_START + minute * 60_000);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("live.opening"), kind: "subtotal" },
      ...ledger.shown.map((txn) => ({
        label: clock.format(DAY_START + txn.minute * 60_000),
        value: txn.amount,
      })),
      { label: t("live.now"), kind: "total" },
    ],
    [t, ledger, clock],
  );

  // zoom on the changes: the lowest running total minus a margin
  const lowest = ledger.shown.reduce(
    (acc, txn) => {
      const running = acc.running + txn.amount;
      return { running, min: Math.min(acc.min, running) };
    },
    { running: ledger.base, min: ledger.base },
  ).min;
  const last = ledger.shown[ledger.shown.length - 1];

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        start={ledger.base}
        name={t("live.name")}
        format={euros}
        labels={false}
        yAxis={{ format: euros, min: Math.floor((lowest - 120) / 50) * 50 }}
        height={320}
        ariaLabel={t("live.aria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
          {last &&
            t("live.last", {
              time: time(last.minute),
              kind: t(`live.kinds.${last.kind}`),
              amount: signed(last.amount),
            })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("live.pause") : t("live.resume")}
        </Button>
      </div>
    </div>
  );
}
