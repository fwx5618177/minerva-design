import React from "react";
import { useTranslation } from "react-i18next";
import { getCssVars } from "../api";
import styles from "./docs.module.scss";

export interface CssVarsTableProps {
  /** Page id; descriptions are read from `docs.<page>.cssVars.<--name>` */
  page: string;
  /** lib-core component folder (e.g. "Button") */
  folder: string;
}

/**
 * Public CSS custom properties of a component, generated from the
 * `// @css-var` comments of its SCSS (see scripts/generate-api.mjs).
 */
const CssVarsTable: React.FC<CssVarsTableProps> = ({ page, folder }) => {
  const { t } = useTranslation();
  const vars = getCssVars(folder);
  if (vars.length === 0) return null;
  return (
    <div className={styles.apiBlock} id={`css-vars-${folder}`}>
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={`${folder} ${t("doc.cssVars")}`}
      >
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th scope="col">{t("doc.variable")}</th>
              <th scope="col">{t("doc.description")}</th>
            </tr>
          </thead>
          <tbody>
            {vars.map((cssVar) => (
              <tr key={cssVar.name}>
                <th scope="row">
                  <code className={styles.propName}>{cssVar.name}</code>
                </th>
                <td>
                  {t(`docs.${page}.cssVars.${cssVar.name}`, {
                    defaultValue: cssVar.description,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CssVarsTable;
