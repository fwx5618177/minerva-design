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

const ELEMENTS = [
  "axes",
  "color",
  "walls",
  "lines",
  "bubbles",
  "profile",
] as const;
const PATTERNS = ["hold", "pull", "sweep", "thin"] as const;

/** "How to read": what every mark means, then the patterns traders look for */
const OrderBookHeatmapDoc: React.FC = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.read",
  });
  const intro = (
    <section className={styles.section} aria-labelledby="heatmap-read">
      <h2 id="heatmap-read">{t("title")}</h2>
      <p className={styles.prose}>{t("text")}</p>
      <ul className={styles.prose}>
        {ELEMENTS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
      <h3>{t("patterns.title")}</h3>
      <ul className={styles.prose}>
        {PATTERNS.map((key) => (
          <li key={key}>{t(`patterns.${key}`)}</li>
        ))}
      </ul>
    </section>
  );
  return <DocPage id="order-book-heatmap" demos={demos} intro={intro} />;
};

export default OrderBookHeatmapDoc;
