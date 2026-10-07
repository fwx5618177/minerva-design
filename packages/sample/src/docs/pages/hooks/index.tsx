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

const standaloneCode = `import { useAutoTheme, useLocale } from "@minerva/lib-core";

// This is what ConfigProvider does internally. Use the hooks instead of
// (not inside) a ConfigProvider: both write the same global state.
export function ThemeAndLanguage() {
  const [theme, setTheme] = useAutoTheme("auto");
  const [locale, setLocale] = useLocale({ language: "fr" });

  return (
    <>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme
      </button>
      <button onClick={() => setLocale({ language: "en" })}>
        {locale.language}
      </button>
    </>
  );
}`;

const HooksDoc: React.FC = () => {
  const { t } = useTranslation();

  const hooks = [
    {
      name: "useAutoTheme",
      signature:
        '(initialTheme?: Theme) => [theme: Theme, setTheme: Dispatch<SetStateAction<Theme>>, systemTheme: "light" | "dark"]',
      description: t("docs.hooks.reference.useAutoTheme"),
    },
    {
      name: "useLocale",
      signature:
        "(initialLocale?: Locale) => [locale: Locale, setLocale: Dispatch<SetStateAction<Locale>>]",
      description: t("docs.hooks.reference.useLocale"),
    },
    {
      name: "useI18n",
      signature: "() => { t: TFunction; i18n: i18n }",
      description: t("docs.hooks.reference.useI18n"),
    },
    {
      name: "useDisclosure",
      signature:
        "(props?: { isOpen?: boolean; defaultIsOpen?: boolean; onChange?: (isOpen: boolean) => void }) => { isOpen: boolean; onOpen: () => void; onClose: () => void; onToggle: () => void }",
      description: t("docs.hooks.reference.useDisclosure"),
    },
    {
      name: "cn",
      signature: "(...inputs: ClassValue[]) => string",
      description: t("docs.hooks.reference.cn"),
    },
  ];

  const intro = (
    <section className={styles.section} aria-labelledby="reference">
      <h2 id="reference">{t("docs.hooks.reference.title")}</h2>
      <p className={styles.prose}>{t("docs.hooks.reference.text")}</p>
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={t("docs.hooks.reference.title")}
      >
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th scope="col">{t("docs.hooks.reference.hook")}</th>
              <th scope="col">{t("docs.hooks.reference.signature")}</th>
              <th scope="col">{t("doc.description")}</th>
            </tr>
          </thead>
          <tbody>
            {hooks.map((hook) => (
              <tr key={hook.name}>
                <th scope="row">
                  <code className={styles.propName}>{hook.name}</code>
                </th>
                <td>
                  <code className={styles.propType}>{hook.signature}</code>
                </td>
                <td>{hook.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.callout}>{t("docs.hooks.reference.global")}</p>
    </section>
  );

  return (
    <DocPage id="hooks" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="standalone">
        <h2 id="standalone">{t("docs.hooks.standalone.title")}</h2>
        <p className={styles.prose}>{t("docs.hooks.standalone.text")}</p>
        <CodeBlock code={standaloneCode} language="tsx" />
      </section>
    </DocPage>
  );
};

export default HooksDoc;
