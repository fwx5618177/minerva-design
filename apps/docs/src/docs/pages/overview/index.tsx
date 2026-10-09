import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { categories, docPages } from "@/docs/registry";

const quickLook = `import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  return (
    <ConfigProvider theme="system">
      <HStack gap={4}>
        <Button color="primary">Save</Button>
        <Switch label="Notifications" defaultChecked />
      </HStack>
    </ConfigProvider>
  );
}`;

const OverviewDoc: React.FC = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      title: t("docs.overview.highlights.theming.title"),
      text: t("docs.overview.highlights.theming.text"),
    },
    {
      title: t("docs.overview.highlights.i18n.title"),
      text: t("docs.overview.highlights.i18n.text"),
    },
    {
      title: t("docs.overview.highlights.a11y.title"),
      text: t("docs.overview.highlights.a11y.text"),
    },
    {
      title: t("docs.overview.highlights.typescript.title"),
      text: t("docs.overview.highlights.typescript.text"),
    },
    {
      title: t("docs.overview.highlights.modules.title"),
      text: t("docs.overview.highlights.modules.text"),
    },
  ];

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="what-is-minerva">
        <h2 id="what-is-minerva">{t("docs.overview.what.title")}</h2>
        <p className={styles.prose}>{t("docs.overview.what.p1")}</p>
        <p className={styles.prose}>{t("docs.overview.what.p2")}</p>
      </section>

      <section className={styles.section} aria-labelledby="packages">
        <h2 id="packages">{t("docs.overview.packages.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/installation" className={styles.linkCard}>
            <strong>
              <code>minerva-design</code>
            </strong>
            <span>{t("docs.overview.packages.core")}</span>
          </Link>
          <Link to="/web-components" className={styles.linkCard}>
            <strong>
              <code>minerva-design/web-components</code>
            </strong>
            <span>{t("docs.overview.packages.webComponents")}</span>
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="highlights">
        <h2 id="highlights">{t("docs.overview.highlights.title")}</h2>
        <ul>
          {highlights.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>: {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="quick-look">
        <h2 id="quick-look">{t("docs.overview.quickLook.title")}</h2>
        <p className={styles.prose}>{t("docs.overview.quickLook.text")}</p>
        <CodeBlock code={quickLook} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="explore">
        <h2 id="explore">{t("docs.overview.explore.title")}</h2>
        <p className={styles.prose}>{t("docs.overview.explore.text")}</p>
        {categories.map((category) => {
          const pages = docPages.filter(
            (page) => page.category === category && page.id !== "overview",
          );
          if (pages.length === 0) return null;
          return (
            <React.Fragment key={category}>
              <h3>{t(`nav.${category}`)}</h3>
              <div className={styles.cardGrid}>
                {pages.map((page) => (
                  <Link
                    key={page.id}
                    to={`/${page.id}`}
                    className={styles.linkCard}
                  >
                    <strong>{t(`docs.${page.id}.title`)}</strong>
                    <span>{t(`docs.${page.id}.description`)}</span>
                  </Link>
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </>
  );

  return <DocPage id="overview" intro={intro} />;
};

export default OverviewDoc;
