import React, { Suspense, lazy, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "minerva-design";
import CodeBlock from "@layout/CodeBlock";
import { getDocPage, type DocPageMeta } from "../registry";
import { importSnippet, type DemoEntry, type WcDemoEntry } from "../demos";
import {
  loadWcDemos,
  loadWcFrameworkSources,
  type WcFrameworkSources,
} from "../wcDemos";
import { loadElementApis } from "../api";
import {
  FRAMEWORKS,
  getFramework,
  type FrameworkDef,
  type WcFrameworkId,
} from "../frameworks";
import { useFramework } from "../frameworks/useFramework";
import DemoBlock from "./DemoBlock";
import PropsTable from "./PropsTable";
import CssVarsTable from "./CssVarsTable";
import WcApiTables from "./WcApiTables";
import WcDemo from "./WcDemo";
import StylingHooks from "./StylingHooks";
import styles from "./docs.module.scss";

// react-native-web and the native demos load with the React Native tab only
const NativeSection = lazy(() => import("../native/NativeSection"));

/** The React Native tab (or the whole content of a mobile-only page) */
const NativeContent: React.FC<{ meta: DocPageMeta }> = ({ meta }) => {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<p className={styles.muted}>{t("doc.loading")}</p>}>
      <NativeSection meta={meta} />
    </Suspense>
  );
};

/** "Requires the global stylesheet — see Installation", under an import */
export const StylesheetNote: React.FC = () => {
  const { t } = useTranslation();
  return (
    <p className={styles.importNote}>
      {t("doc.requiresStylesheet")}{" "}
      <Link to="/installation#global-stylesheet">
        {t("doc.requiresStylesheetLink")}
      </Link>
      {t("doc.requiresStylesheetEnd")}
    </p>
  );
};

interface WcDemos {
  demos: Record<string, WcDemoEntry>;
  sources: Record<string, WcFrameworkSources>;
}

/**
 * A component page for a framework rendered from the Web Components: setup
 * (registration, compiler options, typings), the live custom-element demos
 * with their source in the framework's idiom, and the element API.
 */
const WebComponentSection: React.FC<{
  meta: DocPageMeta;
  framework: FrameworkDef & { id: WcFrameworkId };
}> = ({ meta, framework }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState<WcDemos | null>(null);
  const wc = meta.wc!;
  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      loadWcDemos(meta.id),
      loadWcFrameworkSources(meta.id),
      loadElementApis(),
    ]).then(([demos, sources]) => {
      if (!cancelled) setLoaded({ demos, sources });
    });
    return () => {
      cancelled = true;
    };
  }, [meta.id]);

  const setup = framework.setup(wc);

  return (
    <>
      <section className={styles.section} aria-labelledby="wc-import">
        <h2 id="wc-import">{t("doc.fw.setupTitle")}</h2>
        {framework.nativePlanned && (
          <p className={styles.callout} data-testid="native-planned">
            <Trans
              i18nKey="doc.fw.viaWebComponents"
              values={{ framework: framework.label }}
              components={{ support: <Link to="/platform-support" /> }}
            />
          </p>
        )}
        <p className={styles.prose}>
          {t("doc.wc.intro", {
            tags: wc.tags.map((tag) => `<${tag}>`).join(", "),
          })}
        </p>
        {setup.map((snippet, index) => (
          <div key={index} className={styles.setupStep}>
            <p className={styles.prose}>
              {t(`doc.fw.setup.${snippet.step}`, {
                framework: framework.label,
              })}{" "}
              <code>{snippet.file}</code>
            </p>
            <CodeBlock code={snippet.code} language={snippet.language} />
          </div>
        ))}
        <StylesheetNote />
        <p className={styles.prose}>
          <Trans
            i18nKey="doc.fw.guide"
            values={{ framework: framework.label }}
            components={{ guide: <Link to={`/${framework.guide}`} /> }}
          />
        </p>
      </section>

      <section className={styles.section} aria-labelledby="wc-examples">
        <h2 id="wc-examples">{t("doc.examples")}</h2>
        <p className={styles.prose}>{t(`doc.fw.${framework.id}.examples`)}</p>
        {!loaded && <p className={styles.muted}>{t("doc.loading")}</p>}
        {loaded &&
          wc.demos.map((demoId) => {
            const demo = loaded.demos[demoId];
            if (!demo) return null;
            return (
              <DemoBlock
                key={demoId}
                id={`wc-demo-${demoId}`}
                title={t(`docs.${meta.id}.wc.demos.${demoId}.title`)}
                description={t(
                  `docs.${meta.id}.wc.demos.${demoId}.description`,
                )}
                source={loaded.sources[demoId]?.[framework.id] ?? demo.html}
                language={framework.language}
              >
                <WcDemo demo={demo} />
              </DemoBlock>
            );
          })}
      </section>

      <section className={styles.section} aria-labelledby="wc-api">
        <h2 id="wc-api">{t("doc.api")}</h2>
        <p className={styles.prose}>{t("doc.wc.apiIntro")}</p>
        <p className={styles.prose}>{t(`doc.fw.${framework.id}.api`)}</p>
        {loaded &&
          wc.tags.map((tag) => (
            <WcApiTables
              key={tag}
              page={meta.id}
              tag={tag}
              reactInterfaces={meta.api}
            />
          ))}
      </section>

      <StylingHooks meta={meta} framework="wc" />
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
  // a mobile component of minerva-design/native only
  const nativeOnly = !!meta.native && !meta.exports?.length && !meta.wc;

  const reactContent = (
    <>
      {(meta.exports?.length || importCode) && (
        <section className={styles.section} aria-labelledby="import">
          <h2 id="import">{t("doc.import")}</h2>
          <CodeBlock
            code={importCode ?? importSnippet(meta.exports, meta.package)}
            language="tsx"
          />
          <StylesheetNote />
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

      <StylingHooks meta={meta} framework="react" />

      {children}
    </>
  );

  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>{t(`nav.${meta.category}`)}</p>
        <h1>{title}</h1>
        <p className={styles.lead}>{t(`docs.${id}.description`)}</p>
        {nativeOnly && (
          <p className={styles.callout} data-testid="native-only">
            {t("doc.native.only")}
          </p>
        )}
      </header>
      {nativeOnly ? (
        <>
          <NativeContent meta={meta} />
          {children}
        </>
      ) : meta.wc || meta.native ? (
        <FrameworkTabs meta={meta} react={reactContent} />
      ) : (
        reactContent
      )}
    </article>
  );
};

/**
 * The global framework selector of a component page (React, React Native,
 * Vue, Angular, Svelte, Solid, HTML): one panel per framework, only the
 * selected one is rendered. The choice is shared by every page and kept in `?framework=`.
 */
const FrameworkTabs: React.FC<{
  meta: DocPageMeta;
  react: React.ReactNode;
}> = ({ meta, react }) => {
  const { t } = useTranslation();
  const [framework, setFramework] = useFramework();
  return (
    <Tabs
      value={framework}
      onChange={(value) => setFramework(value as FrameworkDef["id"])}
      variant="soft"
      className={styles.frameworkTabs}
    >
      <div className={styles.frameworkBar}>
        <span className={styles.frameworkLabel} aria-hidden>
          {t("doc.wc.framework")}
        </span>
        <TabList aria-label={t("doc.wc.framework")}>
          {FRAMEWORKS.map((fw) => (
            <Tab
              key={fw.id}
              value={fw.id}
              title={
                fw.nativePlanned
                  ? t("doc.fw.viaWebComponentsShort", { framework: fw.label })
                  : undefined
              }
            >
              {fw.label}
            </Tab>
          ))}
        </TabList>
      </div>
      {FRAMEWORKS.map((fw) => (
        <TabPanel key={fw.id} value={fw.id}>
          {fw.renderer === "react" ? (
            react
          ) : fw.renderer === "native" ? (
            <NativeContent meta={meta} />
          ) : meta.wc ? (
            <WebComponentSection
              meta={meta}
              framework={
                getFramework(fw.id) as FrameworkDef & {
                  id: WcFrameworkId;
                }
              }
            />
          ) : (
            <p className={styles.callout} data-testid="wc-unavailable">
              <Trans
                i18nKey="doc.fw.unavailable"
                values={{ framework: fw.label }}
                components={{ support: <Link to="/platform-support" /> }}
              />
            </p>
          )}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default DocPage;
