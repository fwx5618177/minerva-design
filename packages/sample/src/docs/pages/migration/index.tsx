import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import MarkdownTables from "@/docs/components/MarkdownTables";
import styles from "@/docs/components/docs.module.scss";
// Single source of truth: the mapping document in the repository
import mapping from "../../../../../../docs/migration/novel-isr-ui.md?raw";

const nativeExample = `// before (@novel-isr/ui)
<Modal isOpen={open} onClose={() => setOpen(false)} size="lg" title="Edit">
  <Input isInvalid={!!error} size="sm" />
</Modal>

// after (@minerva/lib-core)
<Modal open={open} onOpenChange={setOpen} size="large" title="Edit">
  <Input invalid={!!error} size="small" />
</Modal>`;

const MigrationDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <>
      <section className={styles.section} aria-labelledby="paths">
        <h2 id="paths">{t("docs.migration.paths.title")}</h2>
        <ol className={styles.prose}>
          <li>
            {t("docs.migration.paths.compat")}{" "}
            <Link to="/compat">{t("docs.compat.title")}</Link>
          </li>
          <li>{t("docs.migration.paths.native")}</li>
        </ol>
        <CodeBlock code={nativeExample} language="tsx" />
      </section>
      <section className={styles.section} aria-labelledby="summary">
        <h2 id="summary">{t("docs.migration.summary.title")}</h2>
        <p className={styles.prose}>{t("docs.migration.summary.text")}</p>
        <MarkdownTables markdown={mapping} only={["Summary", "Platform"]} />
      </section>
      <section className={styles.section} aria-labelledby="mapping">
        <h2 id="mapping">{t("docs.migration.mapping.title")}</h2>
        <p className={styles.prose}>{t("docs.migration.mapping.text")}</p>
        <MarkdownTables
          markdown={mapping}
          only={[
            "Layout",
            "Display",
            "Forms",
            "Inputs",
            "Overlays",
            "Feedback",
            "General",
            "Data",
          ]}
        />
      </section>
      <section className={styles.section} aria-labelledby="behaviour">
        <h2 id="behaviour">{t("docs.migration.behaviour.title")}</h2>
        <ul className={styles.prose}>
          {(
            [
              "names",
              "strings",
              "tooltip",
              "inputs",
              "radio",
              "badge",
              "navTree",
              "tabs",
              "toast",
              "statusIndicator",
            ] as const
          ).map((key) => (
            <li key={key}>{t(`docs.migration.behaviour.${key}`)}</li>
          ))}
        </ul>
        <p className={styles.callout}>{t("docs.migration.behaviour.full")}</p>
      </section>
    </>
  );
  return <DocPage id="migration" intro={intro} />;
};

export default MigrationDoc;
