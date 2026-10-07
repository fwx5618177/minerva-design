import React from "react";
import { useTranslation } from "react-i18next";
import DocPage from "@/docs/components/DocPage";
import { collectDemos } from "@/docs/demos";
import styles from "@/docs/components/docs.module.scss";

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

const SelectDoc: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DocPage id="select" demos={demos}>
      <section className={styles.section} aria-labelledby="behavior">
        <h2 id="behavior">{t("docs.select.behavior.title")}</h2>
        <ul className={styles.prose}>
          <li>{t("docs.select.behavior.keyboard")}</li>
          <li>{t("docs.select.behavior.typeahead")}</li>
          <li>{t("docs.select.behavior.positioning")}</li>
          <li>{t("docs.select.behavior.forms")}</li>
          <li>{t("docs.select.behavior.layers")}</li>
        </ul>
      </section>
    </DocPage>
  );
};

export default SelectDoc;
