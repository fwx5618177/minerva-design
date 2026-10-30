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

const importCode = `import { GraphChart } from "minerva-design/charts";
// framework-free engine and pure layout functions (workers, mini-programs)
import { createGraphChart, forceLayout, circularLayout } from "minerva-design/charts/core";`;

const GraphChartDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="graph-overview">
        <h2 id="graph-overview">
          {t("docs.graph-chart.intro.overview.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.graph-chart.intro.overview.text")}
        </p>
        <ul className={styles.prose}>
          <li>{t("docs.graph-chart.intro.overview.layouts")}</li>
          <li>{t("docs.graph-chart.intro.overview.gpu")}</li>
          <li>{t("docs.graph-chart.intro.overview.labels")}</li>
        </ul>
      </section>
      <section className={styles.section} aria-labelledby="graph-controls">
        <h2 id="graph-controls">
          {t("docs.graph-chart.intro.controls.title")}
        </h2>
        <ul className={styles.prose}>
          <li>{t("docs.graph-chart.intro.controls.pointer")}</li>
          <li>{t("docs.graph-chart.intro.controls.keyboard")}</li>
          <li>{t("docs.graph-chart.intro.controls.languages")}</li>
        </ul>
      </section>
    </>
  );

  return (
    <DocPage
      id="graph-chart"
      demos={demos}
      intro={intro}
      importCode={importCode}
    />
  );
};

export default GraphChartDoc;
