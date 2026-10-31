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

const STEPS = ["tessellate", "batch", "depth", "fallback"];

const IconCanvasDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <section className={styles.section} aria-labelledby="icon-canvas-how">
      <h2 id="icon-canvas-how">{t("docs.icon-canvas.intro.title")}</h2>
      <p className={styles.prose}>{t("docs.icon-canvas.intro.text")}</p>
      <ul className={styles.prose}>
        {STEPS.map((key) => (
          <li key={key}>{t(`docs.icon-canvas.intro.${key}`)}</li>
        ))}
      </ul>
      <p className={styles.prose}>{t("docs.icon-canvas.intro.when")}</p>
    </section>
  );
  return <DocPage id="icon-canvas" demos={demos} intro={intro} />;
};

export default IconCanvasDoc;
