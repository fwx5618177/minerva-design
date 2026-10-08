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

const TagDoc: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DocPage id="tag" demos={demos}>
      <section className={styles.section} aria-labelledby="accessibility">
        <h2 id="accessibility">{t("docs.tag.accessibility.title")}</h2>
        <ul className={styles.prose}>
          <li>{t("docs.tag.accessibility.clickable")}</li>
          <li>{t("docs.tag.accessibility.closable")}</li>
          <li>{t("docs.tag.accessibility.disabled")}</li>
        </ul>
      </section>
    </DocPage>
  );
};

export default TagDoc;
