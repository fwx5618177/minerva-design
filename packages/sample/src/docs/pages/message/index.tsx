import React from "react";
import { useTranslation } from "react-i18next";
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

interface ApiRow {
  method: string;
  signature: string;
  returns: string;
  description: string;
}

const ImperativeApi: React.FC = () => {
  const { t } = useTranslation();

  const globalRows: ApiRow[] = [
    {
      method: "message.success / error / info / warning / loading",
      signature: "(content: ReactNode | MessageOptions)",
      returns: "string",
      description: t("docs.message.imperative.rows.show"),
    },
    {
      method: "message.update",
      signature: "(id: string, props: Partial<MessageProps>)",
      returns: "void",
      description: t("docs.message.imperative.rows.update"),
    },
    {
      method: "message.destroy",
      signature: "(id?: string)",
      returns: "void",
      description: t("docs.message.imperative.rows.destroy"),
    },
  ];

  const hookRows: ApiRow[] = [
    {
      method: "useMessage",
      signature: "()",
      returns: "{ success, error, info, warning, loading, update, destroy }",
      description: t("docs.message.imperative.rows.hook"),
    },
    {
      method: "success / error / info / warning / loading",
      signature: "(content: string | MessageOptions)",
      returns: "MessagePromiseResult",
      description: t("docs.message.imperative.rows.hookShow"),
    },
    {
      method: "update / destroy",
      signature: "message.update / message.destroy",
      returns: "void",
      description: t("docs.message.imperative.rows.hookManage"),
    },
  ];

  const typeRows: ApiRow[] = [
    {
      method: "MessageOptions",
      signature: 'Omit<MessageProps, "id"> & { id?: string }',
      returns: "-",
      description: t("docs.message.imperative.rows.options"),
    },
    {
      method: "MessagePromiseResult",
      signature: "Promise<void> & { messageId: string }",
      returns: "-",
      description: t("docs.message.imperative.rows.promise"),
    },
  ];

  const renderTable = (label: string, rows: ApiRow[], typeTable = false) => (
    <div
      className={styles.tableWrapper}
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th scope="col">
              {typeTable
                ? t("docs.message.imperative.columns.type")
                : t("docs.message.imperative.columns.method")}
            </th>
            <th scope="col">
              {typeTable
                ? t("docs.message.imperative.columns.definition")
                : t("docs.message.imperative.columns.signature")}
            </th>
            {!typeTable && (
              <th scope="col">
                {t("docs.message.imperative.columns.returns")}
              </th>
            )}
            <th scope="col">
              {t("docs.message.imperative.columns.description")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.method}>
              <th scope="row">
                <code className={styles.propName}>{row.method}</code>
              </th>
              <td>
                <code className={styles.propType}>{row.signature}</code>
              </td>
              {!typeTable && (
                <td>
                  <code className={styles.propType}>{row.returns}</code>
                </td>
              )}
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="imperative-api">
      <h2 id="imperative-api">{t("docs.message.imperative.title")}</h2>
      <div className={styles.prose}>
        <p>{t("docs.message.imperative.intro")}</p>
      </div>

      <div className={styles.apiBlock}>
        <h3 className={styles.apiTitle}>
          <code>message</code>
        </h3>
        {renderTable("message", globalRows)}
      </div>

      <div className={styles.apiBlock}>
        <h3 className={styles.apiTitle}>
          <code>useMessage()</code>
        </h3>
        {renderTable("useMessage", hookRows)}
      </div>

      <div className={styles.apiBlock}>
        <h3 className={styles.apiTitle}>
          {t("docs.message.imperative.types")}
        </h3>
        {renderTable(t("docs.message.imperative.types"), typeRows, true)}
      </div>

      <div className={styles.prose}>
        <h3>{t("docs.message.imperative.notes.title")}</h3>
        <ul>
          <li>{t("docs.message.imperative.notes.id")}</li>
          <li>{t("docs.message.imperative.notes.onClose")}</li>
          <li>{t("docs.message.imperative.notes.stacking")}</li>
          <li>{t("docs.message.imperative.notes.promise")}</li>
        </ul>
      </div>
    </section>
  );
};

const MessageDoc: React.FC = () => (
  <DocPage id="message" demos={demos}>
    <ImperativeApi />
  </DocPage>
);

export default MessageDoc;
