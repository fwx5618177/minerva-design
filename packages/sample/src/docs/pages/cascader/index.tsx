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

const CascaderDoc: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DocPage id="cascader" demos={demos}>
      <section className={styles.section} aria-labelledby="keyboard">
        <h2 id="keyboard">{t("docs.cascader.keyboard.title")}</h2>
        <ul className={styles.prose}>
          <li>{t("docs.cascader.keyboard.open")}</li>
          <li>{t("docs.cascader.keyboard.navigate")}</li>
          <li>{t("docs.cascader.keyboard.expand")}</li>
          <li>{t("docs.cascader.keyboard.close")}</li>
          <li>{t("docs.cascader.keyboard.aria")}</li>
        </ul>
      </section>
    </DocPage>
  );
};

export default CascaderDoc;
