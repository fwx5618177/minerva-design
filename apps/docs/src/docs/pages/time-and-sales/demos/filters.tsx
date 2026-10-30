import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

const MIN_SIZES = [0, 0.01, 0.1, 1];

export default function FiltersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [minSize, setMinSize] = useState(0);
  const [aggregate, setAggregate] = useState(true);
  const [tick, setTick] = useState(false);
  const [count, setCount] = useState(0);
  const countedAt = useRef(0);
  useMarketStream(
    boxRef,
    { seed: 34, activity: 200 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (!trades.length) return;
        const tape = tapeRef.current;
        tape?.addTrades(trades);
        // the row count, four times a second
        const now = performance.now();
        if (now - countedAt.current < 250) return;
        countedAt.current = now;
        setCount(tape?.getInstance()?.getCount() ?? 0);
      },
    },
  );

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("minSize")}
        direction="horizontal"
        value={minSize}
        onChange={(value) => setMinSize(Number(value))}
      >
        {MIN_SIZES.map((value) => (
          <Radio
            key={value}
            value={value}
            label={
              value ? t("atLeast", { value: number.format(value) }) : t("all")
            }
          />
        ))}
      </RadioGroup>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <Switch
          checked={aggregate}
          onChange={(checked) => setAggregate(checked)}
          label={t("aggregate")}
        />
        <Switch
          checked={tick}
          onChange={(checked) => setTick(checked)}
          label={t("tickColors")}
        />
      </div>
      <TimeAndSales
        ref={tapeRef}
        height={340}
        // filters apply to the kept history too (up to `capacity` trades)
        minSize={minSize}
        aggregate={aggregate}
        priceColor={tick ? "tick" : "side"}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {t("rows", { value: number.format(count) })}
      </span>
    </div>
  );
}
