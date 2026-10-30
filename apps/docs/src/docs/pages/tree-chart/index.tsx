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

const importCode = `import { TreeChart } from "minerva-design/charts";
// pure tree layouts: tidy tree, radial, mind map, org chart (no DOM)
import { treeLayout } from "minerva-design/charts/core";`;

const TreeChartDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <section className={styles.section} aria-labelledby="tree-overview">
      <h2 id="tree-overview">{t("docs.tree-chart.intro.overview.title")}</h2>
      <p className={styles.prose}>{t("docs.tree-chart.intro.overview.text")}</p>
      <ul className={styles.prose}>
        <li>{t("docs.tree-chart.intro.overview.tidy")}</li>
        <li>{t("docs.tree-chart.intro.overview.layouts")}</li>
        <li>{t("docs.tree-chart.intro.overview.collapse")}</li>
      </ul>
    </section>
  );

  return (
    <DocPage
      id="tree-chart"
      demos={demos}
      intro={intro}
      importCode={importCode}
    />
  );
};

export default TreeChartDoc;
