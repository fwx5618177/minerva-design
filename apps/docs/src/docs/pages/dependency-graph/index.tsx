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

const importCode = `import { DependencyGraph } from "minerva-design/charts";
// pure layered layout, crossing count and critical path (no DOM)
import { dagLayout, countCrossings, criticalPath } from "minerva-design/charts/core";`;

const DependencyGraphDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <section className={styles.section} aria-labelledby="dag-overview">
      <h2 id="dag-overview">
        {t("docs.dependency-graph.intro.overview.title")}
      </h2>
      <p className={styles.prose}>
        {t("docs.dependency-graph.intro.overview.text")}
      </p>
      <ul className={styles.prose}>
        <li>{t("docs.dependency-graph.intro.overview.layers")}</li>
        <li>{t("docs.dependency-graph.intro.overview.crossings")}</li>
        <li>{t("docs.dependency-graph.intro.overview.coordinates")}</li>
        <li>{t("docs.dependency-graph.intro.overview.highlight")}</li>
      </ul>
    </section>
  );

  return (
    <DocPage
      id="dependency-graph"
      demos={demos}
      intro={intro}
      importCode={importCode}
    />
  );
};

export default DependencyGraphDoc;
