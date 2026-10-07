import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
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

const usageCode = `import { ConfigProvider } from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function Root() {
  return (
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <App />
    </ConfigProvider>
  );
}`;

const switchCode = `import { useState } from "react";
import { Button, ConfigProvider, type Theme } from "@minerva/lib-core";

export default function Root() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ConfigProvider theme={theme}>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </Button>
    </ConfigProvider>
  );
}`;

const paletteCode = `import { ConfigProvider, useConfig } from "@minerva/lib-core";

export default function Root() {
  return (
    // "system" is an alias of "auto". palette applies with light / dark / system.
    <ConfigProvider
      theme="system"
      palette="editorial"
      persist // restore / save the "theme" and "palette" cookies
      onThemeChange={(theme) => analytics.track("theme", theme)}
      onPaletteChange={(palette) => analytics.track("palette", palette)}
    >
      <App />
    </ConfigProvider>
  );
}

function Settings() {
  const { mode, resolvedMode, palette, setTheme, setPalette } = useConfig();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return (
    <>
      <button onClick={() => setTheme(resolvedMode === "dark" ? "light" : "dark")}>
        {mode}
      </button>
      <button onClick={() => setPalette(palette === "tech" ? null : "tech")}>
        {palette ?? "default"}
      </button>
    </>
  );
}`;

const nestingCode = `import { ConfigProvider } from "@minerva/lib-core";

export default function Root() {
  return (
    // root provider: owns <html>, the cookies and lib-core's global language
    <ConfigProvider theme="system" palette="editorial" persist>
      <App />

      {/* inherits theme + palette, only this subtree is in Japanese */}
      <ConfigProvider locale={{ language: "ja" }}>
        <Sidebar />
      </ConfigProvider>

      {/* dark + inherited palette for this card and its overlays only */}
      <ConfigProvider theme="dark">
        <PreviewCard />
      </ConfigProvider>
    </ConfigProvider>
  );
}`;

const contextCode = `import { useContext } from "react";
import { ConfigContext } from "@minerva/lib-core";

// Unlike useConfig(), reading the context directly does not throw outside a
// provider: it returns undefined, which is handy for optional integrations.
function useOptionalConfig() {
  return useContext(ConfigContext);
}`;

const ConfigProviderDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <section className={styles.section} aria-labelledby="usage">
      <h2 id="usage">{t("docs.config-provider.usage.title")}</h2>
      <p className={styles.prose}>{t("docs.config-provider.usage.text")}</p>
      <CodeBlock code={usageCode} language="tsx" />
      <p className={styles.prose}>{t("docs.config-provider.usage.dynamic")}</p>
      <CodeBlock code={switchCode} language="tsx" />
      <p className={styles.callout}>{t("docs.config-provider.usage.global")}</p>
      <h3>{t("docs.config-provider.palette.title")}</h3>
      <p className={styles.prose}>{t("docs.config-provider.palette.text")}</p>
      <CodeBlock code={paletteCode} language="tsx" />
      <p className={styles.prose}>
        {t("docs.config-provider.palette.setters")}{" "}
        <Link to="/theme-palette">{t("docs.theme-palette.title")}</Link>
      </p>
    </section>
  );

  return (
    <DocPage id="config-provider" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="nesting">
        <h2 id="nesting">{t("docs.config-provider.nesting.title")}</h2>
        <p className={styles.prose}>{t("docs.config-provider.nesting.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.config-provider.nesting.inherit")}</li>
          <li>{t("docs.config-provider.nesting.scoped")}</li>
          <li>{t("docs.config-provider.nesting.locale")}</li>
          <li>{t("docs.config-provider.nesting.portal")}</li>
          <li>{t("docs.config-provider.nesting.document")}</li>
        </ul>
        <CodeBlock code={nestingCode} language="tsx" />
      </section>
      <section className={styles.section} aria-labelledby="config-context">
        <h2 id="config-context">{t("docs.config-provider.context.title")}</h2>
        <p className={styles.prose}>{t("docs.config-provider.context.text")}</p>
        <CodeBlock code={contextCode} language="tsx" />
      </section>
    </DocPage>
  );
};

export default ConfigProviderDoc;
