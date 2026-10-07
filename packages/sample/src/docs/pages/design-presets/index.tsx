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

const rootCode = `import { ConfigProvider } from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}`;

const ssrCode = `// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "@minerva/lib-core/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`;

const nestedCode = `<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>`;

const cssCode = `/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}`;

const AXES = [
  {
    axis: "preset",
    attribute: "-",
    values: '"minerva" | "editorial" | "compact"',
  },
  {
    axis: "density",
    attribute: "data-density",
    values: '"compact" | "standard" | "comfortable"',
  },
  {
    axis: "radius",
    attribute: "data-radius",
    values: '"none" | "small" | "medium" | "large"',
  },
  {
    axis: "shadow",
    attribute: "data-shadow",
    values: '"none" | "subtle" | "standard"',
  },
  {
    axis: "fontScale",
    attribute: "data-font-scale",
    values: '"small" | "standard" | "large"',
  },
] as const;

const DesignPresetsDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <>
      <section className={styles.section} aria-labelledby="design-axes">
        <h2 id="design-axes">{t("docs.design-presets.axes.title")}</h2>
        <p className={styles.prose}>{t("docs.design-presets.axes.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={t("docs.design-presets.axes.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{t("doc.prop")}</th>
                <th scope="col">{t("docs.design-presets.axes.attribute")}</th>
                <th scope="col">{t("doc.type")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {AXES.map(({ axis, attribute, values }) => (
                <tr key={axis}>
                  <th scope="row">
                    <code className={styles.propName}>{axis}</code>
                  </th>
                  <td>
                    <code>{attribute}</code>
                  </td>
                  <td>
                    <code className={styles.propType}>{values}</code>
                  </td>
                  <td>{t(`docs.design-presets.axes.${axis}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="design-root">
        <h2 id="design-root">{t("docs.design-presets.root.title")}</h2>
        <p className={styles.prose}>{t("docs.design-presets.root.text")}</p>
        <CodeBlock code={rootCode} language="tsx" />
      </section>
      <section className={styles.section} aria-labelledby="design-ssr">
        <h2 id="design-ssr">{t("docs.design-presets.ssr.title")}</h2>
        <p className={styles.prose}>{t("docs.design-presets.ssr.text")}</p>
        <CodeBlock code={ssrCode} language="tsx" />
      </section>
      <section className={styles.section} aria-labelledby="design-nested">
        <h2 id="design-nested">{t("docs.design-presets.nested.title")}</h2>
        <p className={styles.prose}>{t("docs.design-presets.nested.text")}</p>
        <CodeBlock code={nestedCode} language="tsx" />
      </section>
    </>
  );
  return (
    <DocPage id="design-presets" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="design-css">
        <h2 id="design-css">{t("docs.design-presets.css.title")}</h2>
        <p className={styles.prose}>{t("docs.design-presets.css.text")}</p>
        <CodeBlock code={cssCode} language="css" />
      </section>
    </DocPage>
  );
};

export default DesignPresetsDoc;
