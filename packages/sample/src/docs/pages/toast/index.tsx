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
function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast.success("Saved")}>Save</Button>;
}

// Outside React (API client, event bus, store...): root scope
import { toast } from "@minerva/lib-core";
apiClient.onError((error) => toast.danger(error.message));`;

/** "When to use which": the hook inside components, the function elsewhere */
const ToastDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <section className={styles.section} aria-labelledby="when-to-use">
      <h2 id="when-to-use">{t("docs.toast.usage.title")}</h2>
      <ul className={styles.prose}>
        <li>{t("docs.toast.usage.hook")}</li>
        <li>{t("docs.toast.usage.function")}</li>
        <li>{t("docs.toast.usage.modal")}</li>
      </ul>
      <CodeBlock code={usageCode} language="tsx" />
    </section>
  );
  return <DocPage id="toast" demos={demos} intro={intro} />;
};

export default ToastDoc;
