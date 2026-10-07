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

const htmlCode = `<!doctype html>
<html lang="en">
  <body>
    <minerva-button variant="primary" shape="pill">Click me</minerva-button>
    <minerva-button variant="ghost" loading>Loading</minerva-button>
    <minerva-button variant="error" disabled>Delete</minerva-button>

    <!-- the bare specifier is resolved by your bundler (e.g. Vite) -->
    <script type="module">
      import "@minerva/lib-web-components";

      document
        .querySelector("minerva-button")
        .addEventListener("click", () => alert("Clicked!"));
    </script>
  </body>
</html>`;

const reactCode = `// global.d.ts — JSX typings for <minerva-button>
/// <reference types="@minerva/lib-web-components/react" />

// App.tsx
import "@minerva/lib-web-components"; // registers the custom elements once

export function SaveButton({ saving }: { saving: boolean }) {
  return (
    <minerva-button
      variant="success"
      loading={saving || undefined}
      aria-label="Save document"
      onClick={() => console.log("save")}
    >
      Save
    </minerva-button>
  );
}`;

const vueCode = `// vite.config.ts — tell Vue that minerva-* tags are custom elements
import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith("minerva-") },
      },
    }),
  ],
};

// main.ts
import "@minerva/lib-web-components";`;

const vueTemplate = `<!-- Component.vue: null removes the attribute -->
<minerva-button variant="info" :loading="saving || null" @click="save">
  Save
</minerva-button>`;

const themingCode = `/* The button reads these custom properties; set them on the element
   (or any ancestor rule that targets it) to restyle it */
minerva-button {
  --primary-color: #7c3aed;
  --primary-hover: #6d28d9;
  --error-color: #dc2626;
  --error-hover: #b91c1c;
}`;

const WebComponentsDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="what">
        <h2 id="what">{t("docs.web-components.what.title")}</h2>
        <p className={styles.prose}>{t("docs.web-components.what.p1")}</p>
        <p className={styles.prose}>{t("docs.web-components.what.p2")}</p>
      </section>

      <section className={styles.section} aria-labelledby="html">
        <h2 id="html">{t("docs.web-components.html.title")}</h2>
        <p className={styles.prose}>{t("docs.web-components.html.text")}</p>
        <CodeBlock code={htmlCode} language="html" />
      </section>

      <section className={styles.section} aria-labelledby="react">
        <h2 id="react">{t("docs.web-components.react.title")}</h2>
        <p className={styles.prose}>{t("docs.web-components.react.text")}</p>
        <CodeBlock code={reactCode} language="tsx" />
        <p className={styles.callout}>
          {t("docs.web-components.react.booleans")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="other-frameworks">
        <h2 id="other-frameworks">{t("docs.web-components.other.title")}</h2>
        <p className={styles.prose}>{t("docs.web-components.other.text")}</p>
        <CodeBlock code={vueCode} language="tsx" />
        <CodeBlock code={vueTemplate} language="html" />
      </section>
    </>
  );

  return (
    <DocPage id="web-components" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="wc-theming">
        <h2 id="wc-theming">{t("docs.web-components.theming.title")}</h2>
        <p className={styles.prose}>{t("docs.web-components.theming.text")}</p>
        <CodeBlock code={themingCode} language="scss" />
      </section>

      <section className={styles.section} aria-labelledby="wc-a11y">
        <h2 id="wc-a11y">{t("docs.web-components.a11y.title")}</h2>
        <p className={styles.prose}>{t("docs.web-components.a11y.text")}</p>
      </section>
    </DocPage>
  );
};

export default WebComponentsDoc;
