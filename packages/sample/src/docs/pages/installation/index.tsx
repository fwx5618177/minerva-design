import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const installPnpm = `pnpm add @minerva/lib-core react react-dom`;
const installNpm = `npm install @minerva/lib-core react react-dom`;
const installYarn = `yarn add @minerva/lib-core react react-dom`;

const styleImport = `// main.tsx (your entry file) — import the stylesheet exactly once
import "@minerva/lib-core/style.css";`;

const extraStyles = `// optional: @novel-isr/ui compatibility tokens (for @minerva/lib-core/compat)
import "@minerva/lib-core/compat.css";

// optional, in your own .scss: long-form typography mixins
@use "@minerva/lib-core/prose.scss" as prose;`;

const monacoInstall = `pnpm add @monaco-editor/react monaco-editor`;

const monacoImport = `import { MonacoCodeEditor } from "@minerva/lib-core/monaco";`;

const appCode = `import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, message } from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <Button variant="primary" onClick={() => message.success("Hello!")}>
        Say hello
      </Button>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`;

const wcInstall = `pnpm add @minerva/lib-web-components`;

const wcImport = `// registers <minerva-button> (and future custom elements) once
import "@minerva/lib-web-components";`;

const wcTypes = `// src/global.d.ts — JSX typings for <minerva-button> in React
/// <reference types="@minerva/lib-web-components/react" />

// or, in a module file:
import type {} from "@minerva/lib-web-components/react";`;

const tsTypes = `import { themes } from "@minerva/lib-core";
import type { ButtonProps, ComponentTheme } from "@minerva/lib-core";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { variant: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };`;

const InstallationDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="requirements">
        <h2 id="requirements">{t("docs.installation.requirements.title")}</h2>
        <ul>
          <li>{t("docs.installation.requirements.react")}</li>
          <li>{t("docs.installation.requirements.bundler")}</li>
          <li>{t("docs.installation.requirements.browsers")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="install-core">
        <h2 id="install-core">{t("docs.installation.core.title")}</h2>
        <p className={styles.prose}>{t("docs.installation.core.text")}</p>
        <CodeBlock code={installPnpm} language="bash" title="pnpm" />
        <CodeBlock code={installNpm} language="bash" title="npm" />
        <CodeBlock code={installYarn} language="bash" title="yarn" />
        <p className={styles.prose}>{t("docs.installation.core.peers")}</p>
      </section>

      <section className={styles.section} aria-labelledby="styles">
        <h2 id="styles">{t("docs.installation.styles.title")}</h2>
        <p className={styles.prose}>{t("docs.installation.styles.text")}</p>
        <CodeBlock code={styleImport} language="tsx" />
        <p className={styles.callout}>{t("docs.installation.styles.note")}</p>
        <p className={styles.prose}>{t("docs.installation.styles.extras")}</p>
        <CodeBlock code={extraStyles} language="scss" />
      </section>

      <section className={styles.section} aria-labelledby="optional-entries">
        <h2 id="optional-entries">{t("docs.installation.optional.title")}</h2>
        <p className={styles.prose}>{t("docs.installation.optional.text")}</p>
        <CodeBlock code={monacoInstall} language="bash" />
        <CodeBlock code={monacoImport} language="tsx" />
        <p className={styles.prose}>
          <Link to="/rsc-guide">{t("docs.installation.optional.rsc")}</Link>
        </p>
      </section>

      <section className={styles.section} aria-labelledby="first-app">
        <h2 id="first-app">{t("docs.installation.app.title")}</h2>
        <p className={styles.prose}>{t("docs.installation.app.text")}</p>
        <CodeBlock code={appCode} language="tsx" />
        <p className={styles.prose}>{t("docs.installation.app.provider")}</p>
      </section>

      <section className={styles.section} aria-labelledby="install-wc">
        <h2 id="install-wc">{t("docs.installation.webComponents.title")}</h2>
        <p className={styles.prose}>
          {t("docs.installation.webComponents.text")}
        </p>
        <CodeBlock code={wcInstall} language="bash" />
        <CodeBlock code={wcImport} language="tsx" />
        <p className={styles.prose}>
          {t("docs.installation.webComponents.typings")}
        </p>
        <CodeBlock code={wcTypes} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="typescript">
        <h2 id="typescript">{t("docs.installation.typescript.title")}</h2>
        <p className={styles.prose}>{t("docs.installation.typescript.text")}</p>
        <CodeBlock code={tsTypes} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="next-steps">
        <h2 id="next-steps">{t("docs.installation.next.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/introduction" className={styles.linkCard}>
            <strong>{t("docs.introduction.title")}</strong>
            <span>{t("docs.installation.next.introduction")}</span>
          </Link>
          <Link to="/theming" className={styles.linkCard}>
            <strong>{t("docs.theming.title")}</strong>
            <span>{t("docs.installation.next.theming")}</span>
          </Link>
          <Link to="/button" className={styles.linkCard}>
            <strong>{t("docs.button.title")}</strong>
            <span>{t("docs.installation.next.components")}</span>
          </Link>
        </div>
      </section>
    </>
  );

  return <DocPage id="installation" intro={intro} />;
};

export default InstallationDoc;
