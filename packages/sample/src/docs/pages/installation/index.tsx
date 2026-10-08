import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const installPnpm = `pnpm add @minerva/lib-core react react-dom`;
const installNpm = `npm install @minerva/lib-core react react-dom`;
const installYarn = `yarn add @minerva/lib-core react react-dom`;

// The global stylesheet, imported once in the app entry (#global-stylesheet)
const viteEntry = `// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@minerva/lib-core/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`;

const nextLayout = `// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "@minerva/lib-core/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const wcEntry = `// src/main.ts — register the elements and load the design tokens, once
import "@minerva/lib-web-components";
import "@minerva/lib-web-components/tokens.css";`;

const componentImport = `// any component file: import the component only, no CSS
import { Tag } from "@minerva/lib-core";`;

const extraStyles = `// optional, in your own .scss: long-form typography mixins
@use "@minerva/lib-core/prose.scss" as prose;`;

const perComponentStyles = `// src/main.tsx — optional, instead of "@minerva/lib-core/style.css":
import "@minerva/lib-core/styles/tokens.css"; // design tokens, once
import "@minerva/lib-core/styles/button.css";
import "@minerva/lib-core/styles/input.css";
import "@minerva/lib-core/styles/modal.css";`;

const monacoInstall = `pnpm add @monaco-editor/react monaco-editor`;

const monacoImport = `import { MonacoCodeEditor } from "@minerva/lib-core/monaco";`;

const appCode = `import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, ToastProvider, toast } from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      {/* renders toast() calls inside the theme scope */}
      <ToastProvider>
        <Button color="primary" onClick={() => toast.success("Hello!")}>
          Say hello
        </Button>
      </ToastProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`;

const wcInstall = `pnpm add @minerva/lib-web-components`;

const wcImport = `// every element at once...
import "@minerva/lib-web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "@minerva/lib-web-components/select";

// design tokens, once (already included in @minerva/lib-core/style.css)
import "@minerva/lib-web-components/tokens.css";`;

const wcCdn = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/cdn/minerva.js"></script>`;

const wcTypes = `// React 19 JSX (global.d.ts)
/// <reference types="@minerva/lib-web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "@minerva/lib-web-components/vue" to compilerOptions.types`;

const tsTypes = `import { themes } from "@minerva/lib-core";
import type { ButtonProps, ComponentTheme } from "@minerva/lib-core";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

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
        <CodeBlock
          tabs={[
            { label: "pnpm", code: installPnpm, language: "bash" },
            { label: "npm", code: installNpm, language: "bash" },
            { label: "yarn", code: installYarn, language: "bash" },
          ]}
        />
        <p className={styles.prose}>{t("docs.installation.core.peers")}</p>
      </section>

      <section className={styles.section} aria-labelledby="global-stylesheet">
        <h2 id="global-stylesheet">{t("docs.installation.styles.title")}</h2>
        <p className={styles.prose}>{t("docs.installation.styles.text")}</p>
        <p className={styles.callout}>{t("docs.installation.styles.note")}</p>

        <h3 id="stylesheet-vite">{t("docs.installation.styles.vite.title")}</h3>
        <CodeBlock code={viteEntry} language="tsx" title="src/main.tsx" />
        <p className={styles.prose}>
          {t("docs.installation.styles.vite.note")}
        </p>

        <h3 id="stylesheet-next">{t("docs.installation.styles.next.title")}</h3>
        <CodeBlock code={nextLayout} language="tsx" title="app/layout.tsx" />
        <p className={styles.prose}>
          {t("docs.installation.styles.next.note")}{" "}
          <Link to="/rsc-guide">{t("docs.installation.optional.rsc")}</Link>
        </p>

        <h3 id="stylesheet-wc">{t("docs.installation.styles.wc.title")}</h3>
        <CodeBlock code={wcEntry} language="ts" title="src/main.ts" />
        <p className={styles.prose}>{t("docs.installation.styles.wc.note")}</p>

        <h3 id="stylesheet-components">
          {t("docs.installation.styles.components.title")}
        </h3>
        <p className={styles.prose}>
          {t("docs.installation.styles.components.text")}
        </p>
        <CodeBlock code={componentImport} language="tsx" />

        <h3 id="per-component-styles">
          {t("docs.installation.styles.perComponentTitle")}
        </h3>
        <p className={styles.prose}>
          {t("docs.installation.styles.perComponent")}
        </p>
        <CodeBlock code={perComponentStyles} language="tsx" />
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
        <p className={styles.prose}>
          {t("docs.installation.webComponents.entries")}
        </p>
        <CodeBlock code={wcImport} language="ts" />
        <p className={styles.prose}>
          {t("docs.installation.webComponents.cdn")}
        </p>
        <CodeBlock code={wcCdn} language="html" />
        <p className={styles.prose}>
          {t("docs.installation.webComponents.typings")}
        </p>
        <CodeBlock code={wcTypes} language="ts" />
        <p className={styles.prose}>
          <Link to="/web-components">
            {t("docs.installation.webComponents.more")}
          </Link>
        </p>
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
