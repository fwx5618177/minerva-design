import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "@minerva/lib-core";
import CodeBlock from "@layout/CodeBlock";
import { getDocPage, type DocPageMeta } from "../registry";
import {
  importSnippet,
  wcImportSnippet,
  type DemoEntry,
  type WcDemoEntry,
} from "../demos";
import { loadWcDemos } from "../wcDemos";
import { loadElementApis } from "../api";
import DemoBlock from "./DemoBlock";
import PropsTable from "./PropsTable";
import CssVarsTable from "./CssVarsTable";
import WcApiTables from "./WcApiTables";
import WcDemo from "./WcDemo";
import styles from "./docs.module.scss";

type Framework = "react" | "wc";
const FRAMEWORK_KEY = "minerva-docs-framework";

/** Selected framework tab: `?framework=wc` wins, then the last choice. */
const useFramework = (): [Framework, (next: Framework) => void] => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get("framework");
  const [stored, setStored] = useState<Framework>(() => {
    try {
      return localStorage.getItem(FRAMEWORK_KEY) === "wc" ? "wc" : "react";
    } catch {
      return "react";
    }
  });
  const framework: Framework =
    fromUrl === "wc" || fromUrl === "react" ? fromUrl : stored;
  const set = (next: Framework) => {
    setStored(next);
    try {
      localStorage.setItem(FRAMEWORK_KEY, next);
    } catch {
      // storage unavailable (private mode): the URL still carries the choice
    }
    const nextParams = new URLSearchParams(params);
    nextParams.set("framework", next);
    setParams(nextParams, { replace: true });
  };
  return [framework, set];
};

/** "Web Components" tab of a component page */
const WebComponentSection: React.FC<{ meta: DocPageMeta }> = ({ meta }) => {
  const { t } = useTranslation();
  const [demos, setDemos] = useState<Record<string, WcDemoEntry> | null>(null);
  const wc = meta.wc!;
  useEffect(() => {
    let cancelled = false;
    void Promise.all([loadWcDemos(meta.id), loadElementApis()]).then(
      ([loaded]) => {
        if (!cancelled) setDemos(loaded);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [meta.id]);

  return (
    <>
      <section className={styles.section} aria-labelledby="wc-import">
        <h2 id="wc-import">{t("doc.import")}</h2>
        <p className={styles.prose}>
          {t("doc.wc.intro", {
            tags: wc.tags.map((tag) => `<${tag}>`).join(", "),
          })}
        </p>
        <CodeBlock code={wcImportSnippet(wc.entry)} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="wc-examples">
        <h2 id="wc-examples">{t("doc.examples")}</h2>
        {!demos && <p className={styles.muted}>{t("doc.loading")}</p>}
        {demos &&
          wc.demos.map((demoId) => {
            const demo = demos[demoId];
            if (!demo) return null;
            const source = demo.script
              ? `${demo.html.trim()}

<script type="module">
${demo.script.trim()}
</script>
`
              : demo.html;
            return (
              <DemoBlock
                key={demoId}
                id={`wc-demo-${demoId}`}
                title={t(`docs.${meta.id}.wc.demos.${demoId}.title`)}
                description={t(
                  `docs.${meta.id}.wc.demos.${demoId}.description`,
                )}
                source={source}
                language="html"
              >
                <WcDemo demo={demo} />
              </DemoBlock>
            );
          })}
      </section>

      <section className={styles.section} aria-labelledby="wc-api">
        <h2 id="wc-api">{t("doc.api")}</h2>
        <p className={styles.prose}>{t("doc.wc.apiIntro")}</p>
        {demos &&
          wc.tags.map((tag) => (
            <WcApiTables
              key={tag}
              page={meta.id}
              tag={tag}
              reactInterfaces={meta.api}
            />
          ))}
      </section>
    </>
  );
};

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

  const reactContent = (
    <>
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
    </>
  );

  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>{t(`nav.${meta.category}`)}</p>
        <h1>{title}</h1>
        <p className={styles.lead}>{t(`docs.${id}.description`)}</p>
      </header>
      {meta.wc ? (
        <FrameworkTabs meta={meta} react={reactContent} />
      ) : (
        reactContent
      )}
    </article>
  );
};

const FrameworkTabs: React.FC<{
  meta: DocPageMeta;
  react: React.ReactNode;
}> = ({ meta, react }) => {
  const { t } = useTranslation();
  const [framework, setFramework] = useFramework();
  return (
    <Tabs
      value={framework}
      onChange={(value) => setFramework(value as Framework)}
      variant="soft"
      className={styles.frameworkTabs}
    >
      <TabList aria-label={t("doc.wc.framework")}>
        <Tab value="react">React</Tab>
        <Tab value="wc">Web Components</Tab>
      </TabList>
      <TabPanel value="react">{react}</TabPanel>
      <TabPanel value="wc">
        <WebComponentSection meta={meta} />
      </TabPanel>
    </Tabs>
  );
};

export default DocPage;
