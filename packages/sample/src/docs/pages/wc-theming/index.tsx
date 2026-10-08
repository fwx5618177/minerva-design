import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const CONFIG_ATTRIBUTES = [
  ["theme", "light | dark | system | github-dark"],
  ["palette", "editorial | tech | graphite | cool"],
  ["design", "minerva | editorial | compact"],
  ["density", "compact | standard | comfortable"],
  ["radius", "none | small | medium | large"],
  ["shadow", "none | subtle | standard"],
  ["font-scale", "small | standard | large"],
  ["locale", "en | zh | ja | fr"],
  ["root", "boolean"],
] as const;

const tokensCode = `<link rel="stylesheet" href="/node_modules/@minerva/lib-web-components/dist/tokens.css" />
<!-- or, with a bundler -->
<script type="module">
  import "@minerva/lib-web-components/tokens.css";
</script>`;

const htmlCode = `<!-- the attributes work on <html> (whole page) without any script -->
<html lang="fr" data-theme="dark" data-palette="cool" data-density="compact" data-radius="large">`;

const configCode = `<minerva-config theme="system" palette="tech" design="editorial" locale="ja" root>
  <!-- root: the attributes go on <html>, for the whole page -->
</minerva-config>

<!-- nested scopes: the closest one wins -->
<minerva-config theme="light">
  <minerva-button>Light</minerva-button>

  <minerva-config theme="dark" palette="graphite" density="compact">
    <minerva-button>Dark, graphite, compact</minerva-button>
  </minerva-config>
</minerva-config>`;

const configEventCode = `const config = document.querySelector("minerva-config");
config.addEventListener("minerva-theme-change", (event) => {
  console.log(event.detail.mode); // "light" | "dark", e.g. when the OS switches
});
config.resolvedMode; // the mode currently applied`;

const cssVarsCode = `/* the same --<component>-* variables as the React components,
   on the element, any ancestor or :root */
.toolbar minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}

minerva-input {
  --input-radius: 6px;
}

/* theme tokens for one area: data-minerva-theme-scope recomputes the
   derived tokens (hover, subtle, focus ring...) from the new base colors */
.brand {
  --primary-color: #7c3aed;
}`;

const scopeCode = `<section class="brand" data-minerva-theme-scope>
  <minerva-button>Violet</minerva-button>
</section>`;

const partsCode = `/* ::part() reaches the parts an element exposes, :state() its states
   (both listed in the "Styling hooks" section of each component page) */
minerva-select::part(content) {
  max-height: 240px;
}

minerva-modal:state(open)::part(overlay) {
  backdrop-filter: blur(4px);
}

minerva-tabs:state(variant-pills)::part(list) {
  gap: var(--space-1);
}

minerva-button:state(loading)::part(label) {
  opacity: 0.6;
}`;

const WcThemingDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.wc-theming.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="tokens">
        <h2 id="tokens">{k("tokens.title")}</h2>
        <p className={styles.prose}>{k("tokens.text")}</p>
        <CodeBlock code={tokensCode} language="html" />
      </section>

      <section className={styles.section} aria-labelledby="attributes">
        <h2 id="attributes">{k("attributes.title")}</h2>
        <p className={styles.prose}>{k("attributes.text")}</p>
        <CodeBlock code={htmlCode} language="html" />
        <p className={styles.callout}>{k("attributes.nested")}</p>
      </section>

      <section className={styles.section} aria-labelledby="config">
        <h2 id="config">{k("config.title")}</h2>
        <p className={styles.prose}>{k("config.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("config.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("config.attribute")}</th>
                <th scope="col">{k("config.values")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {CONFIG_ATTRIBUTES.map(([name, values]) => (
                <tr key={name}>
                  <th scope="row">
                    <code className={styles.propName}>{name}</code>
                  </th>
                  <td>
                    <code className={styles.propType}>{values}</code>
                  </td>
                  <td>{k(`config.attrs.${name}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={configCode} language="html" />
        <p className={styles.prose}>{k("config.event")}</p>
        <CodeBlock code={configEventCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="dark-mode">
        <h2 id="dark-mode">{k("dark.title")}</h2>
        <p className={styles.prose}>{k("dark.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="css-vars">
        <h2 id="css-vars">{k("cssVars.title")}</h2>
        <p className={styles.prose}>{k("cssVars.text")}</p>
        <CodeBlock code={cssVarsCode} language="css" />
        <CodeBlock code={scopeCode} language="html" />
      </section>

      <section className={styles.section} aria-labelledby="parts">
        <h2 id="parts">{k("parts.title")}</h2>
        <p className={styles.prose}>{k("parts.text")}</p>
        <CodeBlock code={partsCode} language="css" />
      </section>

      <section className={styles.section} aria-labelledby="overlays">
        <h2 id="overlays">{k("overlays.title")}</h2>
        <p className={styles.prose}>{k("overlays.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="i18n">
        <h2 id="i18n">{k("i18n.title")}</h2>
        <p className={styles.prose}>{k("i18n.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="next">
        <h2 id="next">{k("next.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/theming" className={styles.linkCard}>
            <strong>{t("docs.theming.title")}</strong>
            <span>{k("next.theming")}</span>
          </Link>
          <Link to="/design-presets" className={styles.linkCard}>
            <strong>{t("docs.design-presets.title")}</strong>
            <span>{k("next.presets")}</span>
          </Link>
        </div>
      </section>
    </>
  );

  return <DocPage id="wc-theming" intro={intro} />;
};

export default WcThemingDoc;
