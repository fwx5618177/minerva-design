import React from "react";
import { useTranslation } from "react-i18next";
import { getApiEntry, apiKey } from "../api";
import styles from "./docs.module.scss";

export interface PropsTableProps {
  /** Page id; descriptions are read from `docs.<page>.api.<Interface>.<prop>` */
  page: string;
  /** Interface name in api.generated.json */
  name: string;
}

/**
 * API table generated from the component's `types.ts`
 * (see scripts/generate-api.mjs). Types and defaults always match the source;
 * descriptions are translated per locale.
 */
const PropsTable: React.FC<PropsTableProps> = ({ page, name }) => {
  const { t } = useTranslation();
  const entry = getApiEntry(name);

  if (!entry || entry.kind !== "interface") {
    return null;
  }

  const displayName = name.replace(/^wc:/, "");
  const key = apiKey(name);

  return (
    <div className={styles.apiBlock}>
      <h3 className={styles.apiTitle} id={`api-${key}`}>
        <code>{displayName}</code>
      </h3>
      {entry.extends.length > 0 && (
        <p className={styles.apiExtends}>
          {t("doc.extends")}{" "}
          {entry.extends.map((base, index) => (
            <React.Fragment key={base}>
              {index > 0 && ", "}
              <code>{base}</code>
            </React.Fragment>
          ))}
        </p>
      )}
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={displayName}
      >
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th scope="col">{t("doc.prop")}</th>
              <th scope="col">{t("doc.type")}</th>
              <th scope="col">{t("doc.default")}</th>
              <th scope="col">{t("doc.description")}</th>
            </tr>
          </thead>
          <tbody>
            {entry.props.map((prop) => {
              const alias = getApiEntry(
                name.startsWith("wc:") ? `wc:${prop.type}` : prop.type,
              );
              return (
                <tr key={prop.name}>
                  <th scope="row">
                    <code className={styles.propName}>{prop.name}</code>
                    {prop.required && (
                      <span className={styles.required}>
                        {t("doc.required")}
                      </span>
                    )}
                  </th>
                  <td>
                    <code className={styles.propType}>{prop.type}</code>
                    {alias?.kind === "alias" && (
                      <code className={styles.propAlias}>{alias.type}</code>
                    )}
                  </td>
                  <td>
                    {prop.default !== undefined ? (
                      <code>{prop.default}</code>
                    ) : (
                      <span className={styles.muted}>-</span>
                    )}
                  </td>
                  <td>
                    {t(`docs.${page}.api.${key}.${prop.name}`, {
                      defaultValue: prop.description ?? "",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropsTable;
