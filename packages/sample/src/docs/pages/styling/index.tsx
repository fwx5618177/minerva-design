import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  BOOLEAN_STATES,
  KEYED_STATES,
  STATE_VALUES,
  customStateName,
  stateAttribute,
} from "@minerva/core/styling-hooks";
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

const variablesCode = `/* 1. Design tokens: the whole app (or a theme scope) */
:root {
  --primary-color: #7c3aed;
  --radius-md: 10px;
}

/* 2. Component variables (listed on each component page)... */
.toolbar {
  --button-height: 32px;
}

/* 3. ...combined with hooks: variables for one variant / state */
[data-minerva="button"][data-variant="ghost"] {
  --button-radius: 999px;
}
minerva-button:state(variant-ghost) {
  --button-radius: 999px; /* variables inherit into the shadow root */
}`;

const reactCode = `/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }`;

const wcCode = `/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }`;

const layerCode = `/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);`;

const policyCode = `import { stylingHooks, wcSelector } from "@minerva/core/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"`;

const StylingDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.styling.${key}`);

  const stateRows: Array<[string, string, string, string]> = [
    [
      "state",
      STATE_VALUES.map((v) => `[data-state="${v}"]`).join(" "),
      STATE_VALUES.map((v) => `:state(${customStateName("state", v)})`).join(
        " ",
      ),
      t("hooks.states.state"),
    ],
    ...BOOLEAN_STATES.map(
      (key) =>
        [
          key,
          `[${stateAttribute(key)}]`,
          `:state(${customStateName(key)})`,
          t(`hooks.states.${key}`),
        ] as [string, string, string, string],
    ),
    ...KEYED_STATES.map(
      (key) =>
        [
          key,
          `[${stateAttribute(key)}="…"]`,
          `:state(${customStateName(key, "…")})`,
          t(`hooks.states.${key}`),
        ] as [string, string, string, string],
    ),
  ];

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="overview">
        <h2 id="overview">{k("overview.title")}</h2>
        <p className={styles.prose}>{k("overview.text")}</p>
        <ol className={styles.prose}>
          <li>{k("overview.variables")}</li>
          <li>{k("overview.hooks")}</li>
          <li>{k("overview.layer")}</li>
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="variables">
        <h2 id="variables">{k("variables.title")}</h2>
        <p className={styles.prose}>{k("variables.text")}</p>
        <CodeBlock code={variablesCode} language="css" />
      </section>

      <section className={styles.section} aria-labelledby="hooks">
        <h2 id="hooks">{k("hooks.title")}</h2>
        <p className={styles.prose}>{k("hooks.text")}</p>
        <CodeBlock code={reactCode} language="css" />
        <p className={styles.prose}>{k("hooks.selector")}</p>
      </section>

      <section className={styles.section} aria-labelledby="vocabulary">
        <h2 id="vocabulary">{k("vocabulary.title")}</h2>
        <p className={styles.prose}>{k("vocabulary.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("vocabulary.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{t("hooks.state")}</th>
                <th scope="col">React</th>
                <th scope="col">Web Components</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {stateRows.map(([key, react, wc, description]) => (
                <tr key={key}>
                  <th scope="row">
                    <code className={styles.propName}>{key}</code>
                  </th>
                  <td>
                    <code className={styles.propType}>{react}</code>
                  </td>
                  <td>
                    <code className={styles.propType}>{wc}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.prose}>{k("vocabulary.parts")}</p>
      </section>

      <section className={styles.section} aria-labelledby="web-components">
        <h2 id="web-components">{k("wc.title")}</h2>
        <p className={styles.prose}>{k("wc.text")}</p>
        <CodeBlock code={wcCode} language="css" />
        <p className={styles.callout}>{k("wc.support")}</p>
      </section>

      <section className={styles.section} aria-labelledby="layers">
        <h2 id="layers">{k("layers.title")}</h2>
        <p className={styles.prose}>{k("layers.text")}</p>
        <CodeBlock code={layerCode} language="css" />
        <p className={styles.callout}>{k("layers.resets")}</p>
      </section>
    </>
  );

  return (
    <DocPage id="styling" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="stability">
        <h2 id="stability">{k("stability.title")}</h2>
        <p className={styles.prose}>{k("stability.text")}</p>
        <CodeBlock code={policyCode} language="ts" />
        <ul className={styles.prose}>
          <li>{k("stability.minor")}</li>
          <li>{k("stability.major")}</li>
          <li>{k("stability.private")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="next">
        <h2 id="next">{k("next.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/theming" className={styles.linkCard}>
            <strong>{t("docs.theming.title")}</strong>
            <span>{k("next.theming")}</span>
          </Link>
          <Link to="/wc-theming" className={styles.linkCard}>
            <strong>{t("docs.wc-theming.title")}</strong>
            <span>{k("next.wcTheming")}</span>
          </Link>
        </div>
      </section>
    </DocPage>
  );
};

export default StylingDoc;
