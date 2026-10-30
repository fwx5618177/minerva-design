import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { collectDemos } from "@/docs/demos";

const demos = collectDemos(
  import.meta.glob<React.ComponentType>("./demos/*.tsx", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("./demos/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const declarative = `<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>`;

const pure = `import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");`;

const TechnicalIndicatorsDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section
        className={styles.section}
        aria-labelledby="indicators-declarative"
      >
        <h2 id="indicators-declarative">
          {t("docs.technical-indicators.intro.declarative.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.technical-indicators.intro.declarative.text")}
        </p>
        <CodeBlock code={declarative} language="tsx" />
        <p className={styles.prose}>
          {t("docs.technical-indicators.intro.declarative.ids")}
        </p>
      </section>

      <section
        className={styles.section}
        aria-labelledby="indicators-functions"
      >
        <h2 id="indicators-functions">
          {t("docs.technical-indicators.intro.functions.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.technical-indicators.intro.functions.text")}
        </p>
        <CodeBlock code={pure} language="tsx" />
      </section>

      <section
        className={styles.section}
        aria-labelledby="indicators-conventions"
      >
        <h2 id="indicators-conventions">
          {t("docs.technical-indicators.intro.conventions.title")}
        </h2>
        <ul className={styles.prose}>
          <li>{t("docs.technical-indicators.intro.conventions.averages")}</li>
          <li>{t("docs.technical-indicators.intro.conventions.wilder")}</li>
          <li>{t("docs.technical-indicators.intro.conventions.kdj")}</li>
          <li>{t("docs.technical-indicators.intro.conventions.ichimoku")}</li>
          <li>{t("docs.technical-indicators.intro.conventions.vwap")}</li>
          <li>
            {t("docs.technical-indicators.intro.conventions.incremental")}
          </li>
          <li>{t("docs.technical-indicators.intro.conventions.zoom")}</li>
        </ul>
      </section>
    </>
  );

  return <DocPage id="technical-indicators" demos={demos} intro={intro} />;
};

export default TechnicalIndicatorsDoc;
