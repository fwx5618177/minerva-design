import React from "react";
import { useTranslation } from "react-i18next";
import {
  reactSelector,
  reactStateSelector,
  wcSelector,
  wcStateSelector,
} from "minerva-design/styling-hooks";
import CodeBlock from "@layout/CodeBlock";
import type { DocPageMeta } from "../registry";
import {
  hookComponentsOf,
  hookExample,
  hookManifest as manifest,
  itemStateSelector,
  itemStatesOf,
  partsOf,
  statePartsOf,
  type HookFramework,
} from "../stylingHooks";
import styles from "./docs.module.scss";

const Table: React.FC<{
  label: string;
  head: string[];
  rows: React.ReactNode[][];
}> = ({ label, head, rows }) => (
  <div
    className={styles.tableWrapper}
    tabIndex={0}
    role="region"
    aria-label={label}
  >
    <table className={styles.propsTable}>
      <thead>
        <tr>
          {head.map((cell, index) => (
            <th scope="col" key={index}>
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, index) => (
          <tr key={index}>
            <th scope="row">{cells[0]}</th>
            {cells.slice(1).map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ComponentHooks: React.FC<{
  name: string;
  framework: HookFramework;
}> = ({ name, framework }) => {
  const { t, i18n } = useTranslation();
  const spec = manifest[name];
  const id = `hooks-${framework}-${name}`;
  const root =
    framework === "react"
      ? reactSelector(name)
      : (spec.wc ?? `minerva-${name}`);
  const partRows = partsOf(spec, framework).map(([part]) => [
    <code className={styles.propName} key="name">
      {part}
    </code>,
    <code className={styles.propType} key="selector">
      {framework === "react"
        ? reactSelector(name, part)
        : wcSelector(name, part)}
    </code>,
    t(`hooks.parts.${part}`),
  ]);
  const stateRows = Object.entries(spec.states).map(([key, value]) => {
    const values = Array.isArray(value) ? (value as string[]) : null;
    const selectors = values
      ? values.map((v) =>
          framework === "react"
            ? reactStateSelector({ [key]: v })
            : wcStateSelector({ [key]: v }),
        )
      : [
          framework === "react"
            ? reactStateSelector({ [key]: true })
            : wcStateSelector({ [key]: true }),
        ];
    return [
      <code className={styles.propName} key="name">
        {key}
      </code>,
      <span key="selectors">
        {selectors.map((selector, i) => (
          <React.Fragment key={selector}>
            {i > 0 && " "}
            <code className={styles.propType}>{selector}</code>
          </React.Fragment>
        ))}
      </span>,
      framework === "react"
        ? statePartsOf(spec, key).join(", ")
        : t("hooks.host"),
      t(`hooks.states.${key}`),
    ];
  });
  // generic description of the state, plus the component's own note
  const itemStateDescription = (name: string, part: string, key: string) => {
    const note = `hooks.itemNotes.${name}.${part}.${key}`;
    const text = t(`hooks.states.${key}`);
    return i18n.exists(note) ? `${text} — ${t(note)}` : text;
  };
  const itemRows = itemStatesOf(spec, framework).map(
    ({ part, key, values }) => [
      <code className={styles.propName} key="part">
        {part}
      </code>,
      <code className={styles.propName} key="state">
        {key}
      </code>,
      <span key="selectors">
        {values.map((value, i) => {
          const selector = itemStateSelector(name, framework, part, key, value);
          return (
            <React.Fragment key={selector}>
              {i > 0 && " "}
              <code className={styles.propType}>{selector}</code>
            </React.Fragment>
          );
        })}
      </span>,
      itemStateDescription(name, part, key),
    ],
  );
  const example = hookExample(name, framework);
  return (
    <div className={styles.apiBlock} id={id}>
      <h3 className={styles.apiTitle}>
        <code>{root}</code>
      </h3>
      <Table
        label={`${root} ${t("hooks.partsTitle")}`}
        head={[t("hooks.part"), t("hooks.selector"), t("doc.description")]}
        rows={partRows}
      />
      {stateRows.length > 0 && (
        <Table
          label={`${root} ${t("hooks.statesTitle")}`}
          head={[
            t("hooks.state"),
            t("hooks.selector"),
            t("hooks.on"),
            t("doc.description"),
          ]}
          rows={stateRows}
        />
      )}
      {itemRows.length > 0 && (
        <Table
          label={`${root} ${t("hooks.itemStatesTitle")}`}
          head={[
            t("hooks.part"),
            t("hooks.state"),
            t("hooks.selector"),
            t("doc.description"),
          ]}
          rows={itemRows}
        />
      )}
      {example && <CodeBlock code={example} language="css" />}
    </div>
  );
};

export interface StylingHooksProps {
  meta: DocPageMeta;
  framework: HookFramework;
}

/**
 * "Styling hooks" section of a component page, generated from the manifest
 * of `minerva-design/styling-hooks` (parts, states, selectors, example).
 */
const StylingHooks: React.FC<StylingHooksProps> = ({ meta, framework }) => {
  const { t } = useTranslation();
  const names = hookComponentsOf(meta).filter((name) =>
    framework === "react"
      ? manifest[name].react.length > 0
      : manifest[name].wc !== null,
  );
  if (names.length === 0) return null;
  const headingId =
    framework === "react" ? "styling-hooks" : "wc-styling-hooks";
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId}>{t("hooks.title")}</h2>
      <p className={styles.prose}>
        {t(framework === "react" ? "hooks.introReact" : "hooks.introWc")}
      </p>
      {names.some((name) => itemStatesOf(manifest[name], framework).length) && (
        <p className={styles.prose}>
          {t(framework === "react" ? "hooks.itemsReact" : "hooks.itemsWc")}
        </p>
      )}
      {names.map((name) => (
        <ComponentHooks key={name} name={name} framework={framework} />
      ))}
    </section>
  );
};

export default StylingHooks;
