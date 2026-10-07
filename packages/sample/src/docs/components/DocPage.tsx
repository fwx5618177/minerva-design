import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import { getDocPage } from "../registry";
import { importSnippet, type DemoEntry } from "../demos";
import DemoBlock from "./DemoBlock";
import PropsTable from "./PropsTable";
import CssVarsTable from "./CssVarsTable";
import styles from "./docs.module.scss";

export interface DocPageProps {
  /** Page id from the registry */
  id: string;
  /** Demos from collectDemos(); rendered in the registry's `demos` order */
  demos?: Record<string, DemoEntry>;
  /** Override the generated import snippet */
  importCode?: string;
  /** Extra content rendered between the import section and the examples */
  intro?: React.ReactNode;
  /** Extra sections rendered after the API tables */
  children?: React.ReactNode;
}

/**
 * Standard component page: title + description, import snippet, live demos
 * with their exact source, and API tables generated from `types.ts`.
 */
const DocPage: React.FC<DocPageProps> = ({
  id,
  demos = {},
  importCode,
  intro,
  children,
}) => {
  const { t } = useTranslation();
  const meta = getDocPage(id);
  const title = t(`docs.${id}.title`);

  useEffect(() => {
    document.title = `${title} · Minerva UI`;
  }, [title]);

  if (!meta) return null;

  const demoIds = meta.demos ?? Object.keys(demos);

  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>{title}</h1>
        <p className={styles.lead}>{t(`docs.${id}.description`)}</p>
      </header>

      {(meta.exports?.length || importCode) && (
        <section className={styles.section} aria-labelledby="import">
          <h2 id="import">{t("doc.import")}</h2>
          <CodeBlock
            code={importCode ?? importSnippet(meta.exports, meta.package)}
            language="tsx"
          />
        </section>
      )}

      {intro}

      {demoIds.length > 0 && (
        <section className={styles.section} aria-labelledby="examples">
          <h2 id="examples">{t("doc.examples")}</h2>
          {demoIds.map((demoId) => {
            const demo = demos[demoId];
            if (!demo) return null;
            const { Component } = demo;
            return (
              <DemoBlock
                key={demoId}
                id={`demo-${demoId}`}
                title={t(`docs.${id}.demos.${demoId}.title`)}
                description={t(`docs.${id}.demos.${demoId}.description`)}
                source={demo.source}
              >
                <Component />
              </DemoBlock>
            );
          })}
        </section>
      )}

      {meta.api && meta.api.length > 0 && (
        <section className={styles.section} aria-labelledby="api">
          <h2 id="api">{t("doc.api")}</h2>
          {meta.api.map((name) => (
            <PropsTable key={name} page={id} name={name} />
          ))}
        </section>
      )}

      {meta.cssVars && meta.cssVars.length > 0 && (
        <section className={styles.section} aria-labelledby="css-variables">
          <h2 id="css-variables">{t("doc.cssVars")}</h2>
          <p>{t("doc.cssVarsIntro")}</p>
          {meta.cssVars.map((folder) => (
            <CssVarsTable key={folder} page={id} folder={folder} />
          ))}
        </section>
      )}

      {children}
    </article>
  );
};

export default DocPage;
