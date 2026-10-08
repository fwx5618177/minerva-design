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

const PaginationDoc: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DocPage id="pagination" demos={demos}>
      <section className={styles.section} aria-labelledby="accessibility">
        <h2 id="accessibility">{t("docs.pagination.a11y.title")}</h2>
        <p className={styles.prose}>{t("docs.pagination.a11y.body")}</p>
      </section>
    </DocPage>
  );
};

export default PaginationDoc;
