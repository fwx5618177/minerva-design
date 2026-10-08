import React from "react";
import { useTranslation } from "react-i18next";
import {
  getElementApi,
  wcDescriptionKeys,
  wcMembers,
  type WcSection,
} from "../api";
import styles from "./docs.module.scss";

export interface WcApiTablesProps {
  /** Page id; descriptions are read from `docs.<page>.wc.<tag>.<section>.<name>` */
  page: string;
  /** Custom element tag name */
  tag: string;
  /** React interfaces of the page (their prop descriptions are reused) */
  reactInterfaces?: string[];
}

/**
 * API of a custom element, generated from the Custom Elements Manifest of
 * @minerva/lib-web-components (scripts/generate-api.mjs): attributes and
 * properties, events, slots, CSS custom properties and methods (the CSS parts
 * are in the generated "Styling hooks" section).
 * Descriptions are translated per locale (English from the JSDoc otherwise).
 */
const WcApiTables: React.FC<WcApiTablesProps> = ({
  page,
  tag,
  reactInterfaces = [],
}) => {
  const { t, i18n } = useTranslation();
  const api = getElementApi(tag);
  if (!api) return null;

  const describe = (section: WcSection, name: string, fallback?: string) => {
    const key = wcDescriptionKeys(
      page,
      tag,
      section,
      name,
      reactInterfaces,
    ).find((k) => i18n.exists(k));
    return key ? t(key) : (fallback ?? "");
  };

  const table = (
    section: WcSection,
    head: string[],
    rows: React.ReactNode[][],
  ) =>
    rows.length === 0 ? null : (
      <div className={styles.apiBlock} key={section}>
        <h4 className={styles.apiSubtitle}>
          {t(`doc.wc.sections.${section}`)}
        </h4>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={`${tag} ${t(`doc.wc.sections.${section}`)}`}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                {/* index keys: two headers can share a translation (zh) */}
                {head.map((h, index) => (
                  <th scope="col" key={index}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((cells, i) => (
                <tr key={i}>
                  {cells.map((cell, j) =>
                    j === 0 ? (
                      <th scope="row" key={j}>
                        {cell}
                      </th>
                    ) : (
                      <td key={j}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  const code = (text?: string) =>
    text ? (
      <code className={styles.propType}>{text}</code>
    ) : (
      <span className={styles.muted}>-</span>
    );
  const named = (section: WcSection) =>
    wcMembers(api, section).map((m) => [
      <code className={styles.propName}>
        {m.name || t("doc.wc.defaultSlot")}
      </code>,
      describe(section, m.name, m.description),
    ]);

  return (
    <div className={styles.apiBlock}>
      <h3 className={styles.apiTitle} id={`api-${tag}`}>
        <code>{`<${tag}>`}</code>
      </h3>
      {table(
        "props",
        [
          t("doc.wc.attribute"),
          t("doc.prop"),
          t("doc.type"),
          t("doc.default"),
          t("doc.description"),
        ],
        api.properties.map((p) => [
          p.attribute ? (
            <code className={styles.propName}>{p.attribute}</code>
          ) : (
            <span className={styles.muted}>-</span>
          ),
          <>
            <code>{p.name}</code>
            {p.readonly && (
              <span className={styles.required}>{t("doc.wc.readonly")}</span>
            )}
          </>,
          code(p.type),
          code(p.default),
          describe("props", p.name, p.description),
        ]),
      )}
      {table(
        "events",
        [t("doc.wc.event"), t("doc.description")],
        named("events"),
      )}
      {table("slots", [t("doc.wc.slot"), t("doc.description")], named("slots"))}
      {table(
        "cssVars",
        [t("doc.variable"), t("doc.description")],
        named("cssVars"),
      )}
      {table(
        "methods",
        [t("doc.wc.method"), t("doc.wc.signature"), t("doc.description")],
        api.methods.map((m) => [
          <code className={styles.propName}>{m.name}</code>,
          code(m.signature),
          describe("methods", m.name, m.description),
        ]),
      )}
    </div>
  );
};

export default WcApiTables;
