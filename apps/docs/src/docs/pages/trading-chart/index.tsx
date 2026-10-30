import React from "react";
import { useTranslation } from "react-i18next";
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

const importCode = `import { TradingChart } from "minerva-design/charts";
// framework-free engine and pure indicator functions
import { createTradingChart, resampleBars, ema } from "minerva-design/charts/core";`;

const TradingChartDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="trading-overview">
        <h2 id="trading-overview">
          {t("docs.trading-chart.intro.overview.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.trading-chart.intro.overview.text")}
        </p>
        <ul className={styles.prose}>
          <li>{t("docs.trading-chart.intro.overview.axis")}</li>
          <li>{t("docs.trading-chart.intro.overview.panes")}</li>
          <li>{t("docs.trading-chart.intro.overview.trading")}</li>
          <li>{t("docs.trading-chart.intro.overview.drawings")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="trading-streaming">
        <h2 id="trading-streaming">
          {t("docs.trading-chart.intro.streaming.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.trading-chart.intro.streaming.text")}
        </p>
        <p className={styles.prose}>
          {t("docs.trading-chart.intro.streaming.performance")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="trading-controls">
        <h2 id="trading-controls">
          {t("docs.trading-chart.intro.controls.title")}
        </h2>
        <ul className={styles.prose}>
          <li>{t("docs.trading-chart.intro.controls.pointer")}</li>
          <li>{t("docs.trading-chart.intro.controls.axes")}</li>
          <li>{t("docs.trading-chart.intro.controls.keyboard")}</li>
          <li>{t("docs.trading-chart.intro.controls.touch")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="trading-languages">
        <h2 id="trading-languages">
          {t("docs.trading-chart.intro.languages.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.trading-chart.intro.languages.text")}
        </p>
        <p className={styles.prose}>
          {t("docs.trading-chart.intro.languages.colors")}
        </p>
      </section>
    </>
  );

  return (
    <DocPage
      id="trading-chart"
      demos={demos}
      intro={intro}
      importCode={importCode}
    />
  );
};

export default TradingChartDoc;
