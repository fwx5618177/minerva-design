import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const CDN = "https://cdn.jsdelivr.net/npm/minerva-design@0/dist";

const pageCode = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="${CDN}/core/tokens.css" />
    <script type="module" src="${CDN}/web-components/cdn/minerva.js"></script>
    <style>
      body {
        margin: 0;
        font-family: var(--font-family-sans);
        background: var(--background-color);
        color: var(--foreground-color);
      }
      form {
        display: grid;
        gap: var(--space-4);
        max-width: 420px;
        margin: var(--space-8) auto;
      }
      /* hide the tags until the bundle has defined them */
      :not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <!-- theme, palette and language of everything inside -->
    <minerva-config theme="system" palette="cool" locale="en" root>
      <form id="signup">
        <label for="email">Email</label>
        <minerva-input id="email" name="email" type="email" required clearable></minerva-input>

        <label for="plan">Plan</label>
        <minerva-select id="plan" name="plan" value="pro" required>
          <minerva-option value="free">Free</minerva-option>
          <minerva-option value="pro">Pro</minerva-option>
          <minerva-option value="team">Team</minerva-option>
        </minerva-select>

        <minerva-checkbox name="terms" required>I accept the terms</minerva-checkbox>
        <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>

        <minerva-button type="submit">Create account</minerva-button>
        <minerva-button type="reset" variant="ghost">Reset</minerva-button>
        <output id="last-change" aria-live="polite"></output>
      </form>

      <minerva-modal id="done" label="Welcome!">
        <p id="summary"></p>
        <minerva-button slot="footer" id="close">Close</minerva-button>
      </minerva-modal>
    </minerva-config>

    <script type="module">
      const form = document.querySelector("#signup");
      const modal = document.querySelector("#done");

      // custom events bubble: one listener on the form sees every control
      form.addEventListener("minerva-change", (event) => {
        document.querySelector("#last-change").textContent =
          \`\${event.target.name} changed\`;
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // runs only when every control is valid
        const data = new FormData(form);
        document.querySelector("#summary").textContent =
          \`\${data.get("email")} — \${data.get("plan")} plan\`;
        modal.open = true;
      });

      document.querySelector("#close").addEventListener("click", () => {
        modal.open = false;
      });
    </script>
  </body>
</html>`;

const importMapCode = `<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "${CDN}/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
</script>
<link rel="stylesheet" href="${CDN}/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
</script>`;

const WcPlainHtmlDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.wc-plain-html.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="page">
        <h2 id="page">{k("page.title")}</h2>
        <p className={styles.prose}>{k("page.text")}</p>
        <CodeBlock code={pageCode} language="html" title="index.html" />
        <ul className={styles.prose}>
          <li>{k("page.tokens")}</li>
          <li>{k("page.config")}</li>
          <li>{k("page.form")}</li>
          <li>{k("page.events")}</li>
          <li>{k("page.modal")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="import-maps">
        <h2 id="import-maps">{k("importMaps.title")}</h2>
        <p className={styles.prose}>{k("importMaps.text")}</p>
        <CodeBlock code={importMapCode} language="html" />
        <p className={styles.prose}>{k("importMaps.deps")}</p>
        <p className={styles.callout}>{k("importMaps.note")}</p>
      </section>

      <section className={styles.section} aria-labelledby="next">
        <h2 id="next">{k("next.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/wc-forms" className={styles.linkCard}>
            <strong>{t("docs.wc-forms.title")}</strong>
            <span>{t("docs.wc-forms.description")}</span>
          </Link>
          <Link to="/wc-theming" className={styles.linkCard}>
            <strong>{t("docs.wc-theming.title")}</strong>
            <span>{t("docs.wc-theming.description")}</span>
          </Link>
        </div>
      </section>
    </>
  );

  return <DocPage id="wc-plain-html" intro={intro} />;
};

export default WcPlainHtmlDoc;
