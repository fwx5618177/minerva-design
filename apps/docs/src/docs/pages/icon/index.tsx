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

const importCode = `import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`;

const IconDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <section className={styles.section} aria-labelledby="icon-rendering">
      <h2 id="icon-rendering">{t("docs.icon.intro.title")}</h2>
      <p className={styles.prose}>{t("docs.icon.intro.svg")}</p>
      <p className={styles.prose}>{t("docs.icon.intro.canvas")}</p>
      <p className={styles.prose}>{t("docs.icon.intro.bundle")}</p>
    </section>
  );
  return (
    <DocPage id="icon" demos={demos} intro={intro} importCode={importCode} />
  );
};

export default IconDoc;
