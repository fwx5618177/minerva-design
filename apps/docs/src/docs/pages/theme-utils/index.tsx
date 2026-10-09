import {
  TableRoot,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "minerva-design";
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

const applyCode = `import { applyThemeStyles, themes } from "minerva-design";

// Without React (or before the first render): write a theme on <html>
applyThemeStyles("dark");
applyThemeStyles({ ...themes.light, "primary-color": "#7c3aed" });

// "auto" and { light, dark } pairs need the scheme to resolve against
// (defaults to the current prefers-color-scheme)
applyThemeStyles("auto", "dark");`;

const generateCode = `import { generateCSSVariables, resolveTheme } from "minerva-design";

// Theme a single element (e.g. an embedded widget) instead of the page
const widget = document.querySelector<HTMLElement>("#widget")!;
generateCSSVariables(widget.style, resolveTheme("github-dark"));`;

const resolveCode = `import {
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
} from "minerva-design";

getSystemTheme(); // "light" | "dark" ("light" during SSR)

const pair = { light: themes.light, dark: themes.dark };
isBilingualTheme(pair); // true
isBilingualTheme("dark"); // false

resolveTheme("auto", "dark") === themes.dark; // true
resolveTheme("github-dark")["background-color"]; // "#0d1117"
resolveTheme(pair, "light") === themes.light; // true`;

const ThemeUtilsDoc: React.FC = () => {
  const { t } = useTranslation();

  const utils = [
    {
      name: "applyThemeStyles",
      signature:
        "(theme: Theme | ThemeName, systemTheme?: DefaultTheme) => void",
      description: t("docs.theme-utils.reference.applyThemeStyles"),
    },
    {
      name: "generateCSSVariables",
      signature:
        "(style: CSSStyleDeclaration, theme: ComponentTheme | ThemeMap) => void",
      description: t("docs.theme-utils.reference.generateCSSVariables"),
    },
    {
      name: "resolveTheme",
      signature:
        "(theme: Theme, systemTheme?: DefaultTheme) => ComponentTheme | ThemeMap",
      description: t("docs.theme-utils.reference.resolveTheme"),
    },
    {
      name: "getSystemTheme",
      signature: '() => "light" | "dark"',
      description: t("docs.theme-utils.reference.getSystemTheme"),
    },
    {
      name: "isBilingualTheme",
      signature: "(theme: unknown) => theme is CustomBilingualTheme",
      description: t("docs.theme-utils.reference.isBilingualTheme"),
    },
    {
      name: "themes",
      signature:
        '{ light: ComponentTheme; dark: ComponentTheme; "github-dark": ComponentTheme }',
      description: t("docs.theme-utils.reference.themes"),
    },
    {
      name: "light / dark / githubDark",
      signature: "ComponentTheme",
      description: t("docs.theme-utils.reference.builtIns"),
    },
  ];

  const intro = (
    <section className={styles.section} aria-labelledby="reference">
      <h2 id="reference">{t("docs.theme-utils.reference.title")}</h2>
      <p className={styles.prose}>{t("docs.theme-utils.reference.text")}</p>
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={t("docs.theme-utils.reference.title")}
      >
        <TableRoot className={styles.propsTable}>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">
                {t("docs.theme-utils.reference.name")}
              </TableHeader>
              <TableHeader scope="col">
                {t("docs.theme-utils.reference.signature")}
              </TableHeader>
              <TableHeader scope="col">{t("doc.description")}</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {utils.map((util) => (
              <TableRow key={util.name}>
                <TableHeader scope="row">
                  <code className={styles.propName}>{util.name}</code>
                </TableHeader>
                <TableCell>
                  <code className={styles.propType}>{util.signature}</code>
                </TableCell>
                <TableCell>{util.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>

      <h3 style={{ marginTop: "var(--spacing-8)" }}>
        {t("docs.theme-utils.usage.apply")}
      </h3>
      <p className={styles.prose}>{t("docs.theme-utils.usage.applyText")}</p>
      <CodeBlock code={applyCode} language="tsx" />
      <h3>{t("docs.theme-utils.usage.generate")}</h3>
      <p className={styles.prose}>{t("docs.theme-utils.usage.generateText")}</p>
      <CodeBlock code={generateCode} language="tsx" />
      <h3>{t("docs.theme-utils.usage.resolve")}</h3>
      <p className={styles.prose}>{t("docs.theme-utils.usage.resolveText")}</p>
      <CodeBlock code={resolveCode} language="tsx" />
    </section>
  );

  return <DocPage id="theme-utils" demos={demos} intro={intro} />;
};

export default ThemeUtilsDoc;
