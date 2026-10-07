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

const usageCode = `// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "@minerva/lib-core";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));`;

/** "When to use which": the hook inside components, the function elsewhere */
const ConfirmDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <section className={styles.section} aria-labelledby="when-to-use">
      <h2 id="when-to-use">{t("docs.confirm.usage.title")}</h2>
      <ul className={styles.prose}>
        <li>{t("docs.confirm.usage.hook")}</li>
        <li>{t("docs.confirm.usage.function")}</li>
      </ul>
      <CodeBlock code={usageCode} language="tsx" />
    </section>
  );
  return <DocPage id="confirm" demos={demos} intro={intro} />;
};

export default ConfirmDoc;
