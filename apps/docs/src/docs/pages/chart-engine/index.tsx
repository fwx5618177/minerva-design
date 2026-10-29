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

const ChartEngineDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="engine-entry-points">
        <h2 id="engine-entry-points">
          {t("docs.chart-engine.intro.choose.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.chart-engine.intro.choose.text")}
        </p>
        <ul className={styles.prose}>
          <li>{t("docs.chart-engine.intro.choose.createChart")}</li>
          <li>{t("docs.chart-engine.intro.choose.createCanvasChart")}</li>
          <li>{t("docs.chart-engine.intro.choose.createChartController")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="engine-quadrant">
        <h2 id="engine-quadrant">
          {t("docs.chart-engine.intro.quadrant.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.chart-engine.intro.quadrant.text")}
        </p>
      </section>
    </>
  );

  return <DocPage id="chart-engine" demos={demos} intro={intro} />;
};

export default ChartEngineDoc;
