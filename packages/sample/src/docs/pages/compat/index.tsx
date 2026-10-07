import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const shim = `// @novel-isr/ui/src/index.ts
export * from "@minerva/lib-core/compat";

// @novel-isr/ui/src/components/theme-utils.ts (no "use client")
export * from "@minerva/lib-core/compat/theme-utils";

// @novel-isr/ui/src/monaco.ts
export * from "@minerva/lib-core/compat/monaco";`;

const styles_ = `// replaces "@novel-isr/ui/styles.css"
import "@minerva/lib-core/style.css";
// --ui-* tokens, novel's reset and .ui-stagger / .ui-enter-* utilities
import "@minerva/lib-core/compat.css";`;

const usage = `import { Button, Modal, ThemeProvider, toast } from "@minerva/lib-core/compat";

// exactly @novel-isr/ui's API
<ThemeProvider defaultTheme="system" defaultPalette="editorial">
  <Button colorScheme="danger" isLoading={saving} leftIcon={<Trash />}>
    删除
  </Button>
  <Modal isOpen={open} onClose={close} size="lg" title="编辑" />
</ThemeProvider>;`;

const CompatDoc: React.FC = () => {
  const { t } = useTranslation();
  const keys = ["names", "strings", "hooks", "tokens", "sideEffects", "proof"];
  const intro = (
    <>
      <section className={styles.section} aria-labelledby="entries">
        <h2 id="entries">{t("docs.compat.entries.title")}</h2>
        <p className={styles.prose}>{t("docs.compat.entries.text")}</p>
        <CodeBlock code={shim} language="ts" />
        <CodeBlock code={styles_} language="ts" />
      </section>
      <section className={styles.section} aria-labelledby="usage">
        <h2 id="usage">{t("docs.compat.usage.title")}</h2>
        <CodeBlock code={usage} language="tsx" />
      </section>
      <section className={styles.section} aria-labelledby="guarantees">
        <h2 id="guarantees">{t("docs.compat.guarantees.title")}</h2>
        <ul className={styles.prose}>
          {keys.map((key) => (
            <li key={key}>{t(`docs.compat.guarantees.${key}`)}</li>
          ))}
        </ul>
        <p className={styles.callout}>{t("docs.compat.guarantees.note")}</p>
      </section>
    </>
  );
  return <DocPage id="compat" intro={intro} />;
};

export default CompatDoc;
