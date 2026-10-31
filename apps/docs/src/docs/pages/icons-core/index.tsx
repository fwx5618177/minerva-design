import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
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

const frameworkExample = `// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context`;

const IconsCoreDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <section className={styles.section} aria-labelledby="icons-core-overview">
      <h2 id="icons-core-overview">{t("docs.icons-core.intro.title")}</h2>
      <p className={styles.prose}>{t("docs.icons-core.intro.text")}</p>
      <CodeBlock language="ts" code={frameworkExample} />
      <p className={styles.prose}>{t("docs.icons-core.intro.frameworks")}</p>
    </section>
  );
  return <DocPage id="icons-core" demos={demos} intro={intro} />;
};

export default IconsCoreDoc;
