import React from "react";
import { useTranslation } from "react-i18next";
import { getVueApi, vueDescriptionKeys, type VueSection } from "../vueApi";
import styles from "./docs.module.scss";

export interface VueApiTablesProps {
  /** Page id (descriptions: `docs.<page>.vue.<Component>...`, then React's) */
  page: string;
  /** Export name of the Vue component */
  name: string;
  /** React interfaces of the page (their prop descriptions are reused) */
  reactInterfaces?: string[];
}

/**
 * API of a native Vue component, generated from its single-file component
 * types (vue-component-meta, scripts/generate-vue-api.mjs): props (with
 * v-model), emits and slots. Descriptions are translated per locale (the
 * matching React prop / callback docs), English from the JSDoc otherwise.
 */
const VueApiTables: React.FC<VueApiTablesProps> = ({
  page,
  name,
  reactInterfaces = [],
}) => {
  const { t, i18n } = useTranslation();
  const api = getVueApi(name);
  if (!api) return null;

  const describe = (section: VueSection, member: string, fallback = "") => {
    const key = vueDescriptionKeys(
      page,
      name,
      section,
      member,
      reactInterfaces,
    ).find((k) => i18n.exists(k));
    return key ? t(key) : fallback;
  };
  const code = (text?: string) =>
    text && text !== "any" ? (
      <code className={styles.propType}>{text}</code>
    ) : (
      <span className={styles.muted}>-</span>
    );

  const table = (
    section: VueSection,
    head: string[],
    rows: React.ReactNode[][],
  ) =>
    rows.length === 0 ? null : (
      <div className={styles.apiBlock} key={section}>
        <h4 className={styles.apiSubtitle}>
          {t(`doc.vue.sections.${section}`)}
        </h4>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={`${name} ${t(`doc.vue.sections.${section}`)}`}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
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

  return (
    <div className={styles.apiBlock}>
      <h3 className={styles.apiTitle} id={`vue-api-${name}`}>
        <code>{`<${name}>`}</code>
      </h3>
      {table(
        "props",
        [t("doc.prop"), t("doc.type"), t("doc.default"), t("doc.description")],
        api.props.map((prop) => [
          <>
            <code className={styles.propName}>{prop.name}</code>
            {prop.required && (
              <span className={styles.required}>{t("doc.required")}</span>
            )}
          </>,
          code(prop.type),
          code(prop.default),
          describe("props", prop.name, prop.description),
        ]),
      )}
      {table(
        "events",
        [t("doc.vue.event"), t("doc.vue.payload"), t("doc.description")],
        api.events.map((event) => [
          <code className={styles.propName}>{`@${event.name}`}</code>,
          code(event.type),
          describe("events", event.name, event.description),
        ]),
      )}
      {table(
        "slots",
        [t("doc.vue.slot"), t("doc.vue.slotProps"), t("doc.description")],
        api.slots.map((slot) => [
          <code className={styles.propName}>{`#${slot.name}`}</code>,
          code(slot.type),
          describe("slots", slot.name, slot.description),
        ]),
      )}
    </div>
  );
};

export default VueApiTables;
