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

const ChartsDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="chart-rendering">
        <h2 id="chart-rendering">{t("docs.charts.intro.rendering.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.rendering.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.charts.intro.rendering.background")}</li>
          <li>{t("docs.charts.intro.rendering.data")}</li>
          <li>{t("docs.charts.intro.rendering.labels")}</li>
          <li>{t("docs.charts.intro.rendering.dom")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="chart-large-data">
        <h2 id="chart-large-data">{t("docs.charts.intro.largeData.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.largeData.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="chart-interaction">
        <h2 id="chart-interaction">
          {t("docs.charts.intro.interaction.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.charts.intro.interaction.pointer")}
        </p>
        <p className={styles.prose}>
          {t("docs.charts.intro.interaction.keyboard")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="chart-theming">
        <h2 id="chart-theming">{t("docs.charts.intro.theming.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.theming.text")}</p>
        <p className={styles.prose}>{t("docs.charts.intro.theming.core")}</p>
      </section>
    </>
  );

  return <DocPage id="charts" demos={demos} intro={intro} />;
};

export default ChartsDoc;
