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

const AutoCompleteDoc: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DocPage id="auto-complete" demos={demos}>
      <section className={styles.section} aria-labelledby="keyboard">
        <h2 id="keyboard">{t("docs.auto-complete.keyboard.title")}</h2>
        <ul className={styles.prose}>
          <li>{t("docs.auto-complete.keyboard.arrows")}</li>
          <li>{t("docs.auto-complete.keyboard.enter")}</li>
          <li>{t("docs.auto-complete.keyboard.escape")}</li>
          <li>{t("docs.auto-complete.keyboard.aria")}</li>
        </ul>
      </section>
    </DocPage>
  );
};

export default AutoCompleteDoc;
