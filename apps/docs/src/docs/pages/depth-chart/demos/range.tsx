import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DepthChart } from "minerva-design/charts";
import { createMarketFeed } from "../../order-book/feed";

const RANGES = ["auto", "0.0005", "0.001", "0.002", "0.004"];

export default function RangeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.depth-chart.data",
  });
  const [book] = useState(() => createMarketFeed({ seed: 3 }).snapshot());
  const [range, setRange] = useState("0.001");
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [amount, setAmount] = useState<"base" | "quote">("base");
  const [curve, setCurve] = useState<"step" | "linear">("step");
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("range")}
        direction="horizontal"
        value={range}
        onChange={(value) => {
          setRange(String(value));
          setZoomed(null);
        }}
      >
        {RANGES.map((value) => (
          <Radio
            key={value}
            value={value}
            label={
              value === "auto"
                ? t("auto")
                : t("plusMinus", { value: percent.format(Number(value)) })
            }
          />
        ))}
      </RadioGroup>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("amountAxis")}
          direction="horizontal"
          value={amount}
          onChange={(value) => setAmount(value as "base" | "quote")}
        >
          <Radio value="base" label={t("base")} />
          <Radio value="quote" label={t("quote")} />
        </RadioGroup>
        <RadioGroup
          aria-label={t("curve")}
          direction="horizontal"
          value={curve}
          onChange={(value) => setCurve(value as "step" | "linear")}
        >
          <Radio value="step" label={t("step")} />
          <Radio value="linear" label={t("linear")} />
        </RadioGroup>
      </div>
      <DepthChart
        book={book}
        // half width around the mid: 0.001 = mid ± 0.1% (undefined fits the book)
        range={range === "auto" ? undefined : Number(range)}
        amount={amount}
        curve={curve}
        onRangeChange={setZoomed}
        height={340}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {zoomed === null
          ? t("zoomHint")
          : t("zoomed", {
              value: t("plusMinus", { value: percent.format(zoomed) }),
            })}
      </span>
    </div>
  );
}
