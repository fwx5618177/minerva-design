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

  const displayName = name.replace(/^(wc|native):/, "");
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
        <TableRoot className={styles.propsTable}>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">{t("doc.prop")}</TableHeader>
              <TableHeader scope="col">{t("doc.type")}</TableHeader>
              <TableHeader scope="col">{t("doc.default")}</TableHeader>
              <TableHeader scope="col">{t("doc.description")}</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {entry.props.map((prop) => {
              const prefix = /^(wc|native):/.exec(name)?.[0] ?? "";
              const alias = getApiEntry(`${prefix}${prop.type}`);
              return (
                <TableRow key={prop.name}>
                  <TableHeader scope="row">
                    <code className={styles.propName}>{prop.name}</code>
                    {prop.required && (
                      <span className={styles.required}>
                        {t("doc.required")}
                      </span>
                    )}
                  </TableHeader>
                  <TableCell>
                    <code className={styles.propType}>{prop.type}</code>
                    {alias?.kind === "alias" && (
                      <code className={styles.propAlias}>{alias.type}</code>
                    )}
                  </TableCell>
                  <TableCell>
                    {prop.default !== undefined ? (
                      <code>{prop.default}</code>
                    ) : (
                      <span className={styles.muted}>-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {t(`docs.${page}.api.${key}.${prop.name}`, {
                      defaultValue: prop.description ?? "",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableRoot>
      </div>
    </div>
  );
};

export default PropsTable;
