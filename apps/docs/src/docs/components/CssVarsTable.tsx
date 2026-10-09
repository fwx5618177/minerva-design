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
import { getCssVars } from "../api";
import styles from "./docs.module.scss";

export interface CssVarsTableProps {
  /** Page id; descriptions are read from `docs.<page>.cssVars.<--name>` */
  page: string;
  /** React component folder (e.g. "Button") */
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
        <TableRoot className={styles.propsTable}>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">{t("doc.variable")}</TableHeader>
              <TableHeader scope="col">{t("doc.description")}</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {vars.map((cssVar) => (
              <TableRow key={cssVar.name}>
                <TableHeader scope="row">
                  <code className={styles.propName}>{cssVar.name}</code>
                </TableHeader>
                <TableCell>
                  {t(`docs.${page}.cssVars.${cssVar.name}`, {
                    defaultValue: cssVar.description,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
    </div>
  );
};

export default CssVarsTable;
