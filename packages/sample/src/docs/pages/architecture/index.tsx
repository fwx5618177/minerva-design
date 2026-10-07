import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const PACKAGES = [
  { name: "@minerva/core", key: "core" },
  { name: "@minerva/lib-core", key: "libCore" },
  { name: "@minerva/lib-web-components", key: "webComponents" },
] as const;

const PRIMITIVES = [
  "focusScope",
  "dismissableLayer",
  "scrollLock",
  "hideOthers",
  "rovingFocus",
  "positioning",
  "pointerGrace",
  "portal",
  "state",
  "theme",
] as const;

const layersCode = `@minerva/core            framework-agnostic TypeScript, DOM only
  ├─ interaction primitives (focus, layers, scroll lock, roving focus, ...)
  ├─ positioning (the only place @floating-ui/dom is used)
  └─ theme utilities, palettes, design tokens (tokens.css), i18n messages + translator
        ▲                                ▲
        │ thin React hooks               │ Lit controllers (later)
@minerva/lib-core                 @minerva/lib-web-components
  React 19 components               Web Components (Lit)`;

const coreCode = `import { createDismissableLayer, createFocusScope, lockScroll } from "@minerva/core";

// A framework-free modal: trap focus, dismiss on Escape / outside click,
// lock page scroll. Every lib-core overlay is built from the same pieces.
const scope = createFocusScope(dialog, { trapped: true, loop: true });
const layer = createDismissableLayer(dialog, { onDismiss: close });
const unlock = lockScroll();
scope.activate();

function close() {
  layer.destroy();
  scope.deactivate(); // restores focus to the opener
  unlock();
}`;

const ArchitectureDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.architecture.${key}`);

  const intro = (
    <section className={styles.section} aria-labelledby="packages">
      <h2 id="packages">{k("packages.title")}</h2>
      <p className={styles.prose}>{k("packages.text")}</p>
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={k("packages.title")}
      >
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th scope="col">{k("packages.package")}</th>
              <th scope="col">{t("doc.description")}</th>
            </tr>
          </thead>
          <tbody>
            {PACKAGES.map((row) => (
              <tr key={row.name}>
                <th scope="row">
                  <code className={styles.propName}>{row.name}</code>
                </th>
                <td>{k(`packages.${row.key}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CodeBlock code={layersCode} language="text" />
    </section>
  );

  return (
    <DocPage id="architecture" intro={intro}>
      <section className={styles.section} aria-labelledby="primitives">
        <h2 id="primitives">{k("primitives.title")}</h2>
        <p className={styles.prose}>{k("primitives.text")}</p>
        <ul className={styles.prose}>
          {PRIMITIVES.map((key) => (
            <li key={key}>{k(`primitives.${key}`)}</li>
          ))}
        </ul>
        <CodeBlock code={coreCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="overlays">
        <h2 id="overlays">{k("overlays.title")}</h2>
        <p className={styles.prose}>{k("overlays.p1")}</p>
        <p className={styles.prose}>{k("overlays.p2")}</p>
      </section>

      <section className={styles.section} aria-labelledby="dependencies">
        <h2 id="dependencies">{k("dependencies.title")}</h2>
        <p className={styles.prose}>{k("dependencies.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="next-steps">
        <h2 id="next-steps">{k("next.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/installation" className={styles.linkCard}>
            <strong>{t("docs.installation.title")}</strong>
            <span>{k("next.installation")}</span>
          </Link>
          <Link to="/web-components" className={styles.linkCard}>
            <strong>{t("docs.web-components.title")}</strong>
            <span>{k("next.webComponents")}</span>
          </Link>
        </div>
      </section>
    </DocPage>
  );
};

export default ArchitectureDoc;
