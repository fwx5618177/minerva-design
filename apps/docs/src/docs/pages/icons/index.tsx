import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import { icons, iconCategories } from "minerva-design/icons/core";
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

const importCode = `// React: one component per icon, the generic Icon and the GPU IconCanvas
import { SearchIcon, Icon, IconCanvas } from "minerva-design/icons";
// framework-free: icon data, SVG strings, Canvas2D and GPU drawing
import { searchIcon, toSvg, createIconCanvas } from "minerva-design/icons/core";`;

const usage = `import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas`;

const POINTS = ["design", "svg", "renderers", "treeShaking", "frameworks"];

const IconsDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <>
      <section className={styles.section} aria-labelledby="icons-overview">
        <h2 id="icons-overview">{t("docs.icons.intro.title")}</h2>
        <p className={styles.prose}>
          {t("docs.icons.intro.text", {
            count: icons.length,
            categories: iconCategories.length,
          })}
        </p>
        <ul className={styles.prose}>
          {POINTS.map((key) => (
            <li key={key}>{t(`docs.icons.intro.${key}`)}</li>
          ))}
        </ul>
        <CodeBlock language="tsx" code={usage} />
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.icons.intro.pages"
            components={{
              icon: <Link to="/icon" />,
              canvas: <Link to="/icon-canvas" />,
              core: <Link to="/icons-core" />,
            }}
          />
        </p>
      </section>
    </>
  );
  return (
    <DocPage id="icons" demos={demos} intro={intro} importCode={importCode} />
  );
};

export default IconsDoc;
