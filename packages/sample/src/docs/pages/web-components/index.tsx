import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
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

const importCode = `// registers every <minerva-*> element
import "@minerva/lib-web-components";

// design tokens, once per page / app
import "@minerva/lib-web-components/tokens.css";`;

const installPnpm = `pnpm add @minerva/lib-web-components`;
const installNpm = `npm install @minerva/lib-web-components`;

const bundlerCode = `// main.ts: every element (Vite, webpack, Rspack, esbuild...)
import "@minerva/lib-web-components";
import "@minerva/lib-web-components/tokens.css";`;

const perElementCode = `// only what you use: each entry registers one element (and its parts,
// e.g. <minerva-option> with <minerva-select>) plus the Minerva elements it renders
import "@minerva/lib-web-components/button";
import "@minerva/lib-web-components/select";
import "@minerva/lib-web-components/modal";`;

const cdnCode = `<!-- no build step: a self-contained ES module (Lit and @minerva/core included) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/cdn/minerva.js"
></script>
<!-- unpkg works too: https://unpkg.com/@minerva/lib-web-components@1/dist/cdn/minerva.js -->`;

const attrsCode = `<!-- attributes: strings, kebab-case; booleans are on when present -->
<minerva-input name="email" type="email" placeholder="you@example.com" clearable required></minerva-input>
<minerva-button color="danger" variant="outline" full-width>Delete</minerva-button>

<script type="module">
  const input = document.querySelector("minerva-input");
  input.value = "ada@example.com"; // properties: camelCase, any type
  input.disabled = true;

  // data (arrays, objects, functions) is set as a property only
  document.querySelector("minerva-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>`;

const eventsCode = `const select = document.querySelector("minerva-select");

// committed value change: bubbles and crosses shadow roots (composed)
select.addEventListener("minerva-change", (event) => {
  console.log(event.detail.value);
});

// "controlled" pattern: open-change events are cancelable
const modal = document.querySelector("minerva-modal");
modal.addEventListener("minerva-open-change", (event) => {
  if (!event.detail.open && hasUnsavedChanges()) {
    event.preventDefault(); // the modal stays open
  }
});`;

const slotsCode = `<minerva-modal label="Delete project?">
  <p>This cannot be undone.</p>
  <div slot="footer">
    <minerva-button variant="ghost">Cancel</minerva-button>
    <minerva-button color="danger">Delete</minerva-button>
  </div>
</minerva-modal>

<style>
  /* style the internals that a component exposes with part="…" */
  minerva-modal::part(panel) {
    border-radius: 24px;
  }
  minerva-input::part(input) {
    font-variant-numeric: tabular-nums;
  }
</style>`;

const typingsCode = `// every element is in HTMLElementTagNameMap: querySelector is typed
const select = document.querySelector("minerva-select"); // MinervaSelect | null
select?.addEventListener("minerva-change", () => console.log(select.value));

// element classes and their string-literal unions are exported
import type { MinervaButton, ButtonVariant } from "@minerva/lib-web-components";`;

const frameworkTypingsCode = `// React 19 (global.d.ts)
/// <reference types="@minerva/lib-web-components/react" />

// Svelte 5 (src/app.d.ts)
/// <reference types="@minerva/lib-web-components/svelte" />

// Solid (global.d.ts)
/// <reference types="@minerva/lib-web-components/solid" />

// Vue / Volar (tsconfig.json)
{ "compilerOptions": { "types": ["@minerva/lib-web-components/vue"] } }`;

const vscodeCode = `// .vscode/settings.json: completion and hover docs in .html files
{
  "html.customData": [
    "./node_modules/@minerva/lib-web-components/dist/html-custom-data.json"
  ]
}`;

const reactCode = `// global.d.ts
/// <reference types="@minerva/lib-web-components/react" />

// Settings.tsx
import { useState } from "react";
import "@minerva/lib-web-components/switch";

export function Settings() {
  const [on, setOn] = useState(false);
  return (
    <minerva-switch
      label="Email notifications"
      checked={on} // a property: React 19 passes it as is
      onminerva-change={(e: CustomEvent<{ checked: boolean }>) =>
        setOn(e.detail.checked)
      }
    />
  );
}`;

const ssrCode = `// Safe on the server: nothing touches the DOM when the module loads, and
// defineElement() skips registration when there is no customElements registry.
import "@minerva/lib-web-components";

// The markup is sent as is and upgraded in the browser:
// :where(minerva-select, minerva-tabs):not(:defined) { visibility: hidden; }`;

const devCode = `// Logged in development only, once per message:
// [minerva] <minerva-tabs>: value "billing" does not match any <minerva-tab>.

// Vite, webpack, Rollup (+ replace) and esbuild (define) replace
// process.env.NODE_ENV: production bundles drop the checks and messages.
// The CDN bundle is built for production: no warnings.`;

const authoringCode = `import { html, css } from "lit";
import {
  MinervaElement,
  RovingFocusController,
  defineElement,
  hostStyles,
} from "@minerva/lib-web-components";

/** A toolbar: one Tab stop, arrow keys / Home / End move between buttons. */
export class AppToolbar extends MinervaElement {
  static override tagName = "app-toolbar";
  static override styles = [
    hostStyles,
    css\`
      :host {
        display: flex;
        gap: var(--space-2, 8px);
      }
    \`,
  ];

  // core's createRovingFocus, attached / destroyed with the element
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => [...this.querySelectorAll<HTMLElement>("minerva-button")],
    orientation: "horizontal",
  }));

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "toolbar");
  }

  protected override firstUpdated() {
    this.roving.attach(this);
  }

  protected override render() {
    return html\`<slot @slotchange=\${() => this.roving.refresh()}></slot>\`;
  }
}

defineElement(AppToolbar); // idempotent, no-op without customElements`;

const UTILITIES = [
  "defineElement",
  "emit",
  "MinervaElement",
  "hostStyles",
  "FormAssociatedElement",
  "LocaleController",
  "resolveLanguage",
  "AriaController",
  "HasSlotController",
  "controllers",
  "popoverResetStyles",
] as const;

const GUIDES = [
  "wc-plain-html",
  "wc-vue",
  "wc-angular",
  "wc-svelte",
  "wc-forms",
  "wc-theming",
] as const;

const WebComponentsDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.web-components.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="what">
        <h2 id="what">{k("what.title")}</h2>
        <p className={styles.prose}>{k("what.p1")}</p>
        <p className={styles.prose}>{k("what.p2")}</p>
        <p className={styles.prose}>{k("what.p3")}</p>
      </section>

      <section className={styles.section} aria-labelledby="install">
        <h2 id="install">{k("install.title")}</h2>
        <p className={styles.prose}>{k("install.text")}</p>
        <CodeBlock
          tabs={[
            { label: "pnpm", code: installPnpm, language: "bash" },
            { label: "npm", code: installNpm, language: "bash" },
          ]}
        />
      </section>

      <section className={styles.section} aria-labelledby="load">
        <h2 id="load">{k("load.title")}</h2>
        <p className={styles.prose}>{k("load.bundler")}</p>
        <CodeBlock code={bundlerCode} language="ts" />
        <p className={styles.prose}>{k("load.perElement")}</p>
        <CodeBlock code={perElementCode} language="ts" />
        <p className={styles.prose}>{k("load.cdn")}</p>
        <CodeBlock code={cdnCode} language="html" />
        <p className={styles.callout}>{k("load.esm")}</p>
      </section>

      <section className={styles.section} aria-labelledby="tokens">
        <h2 id="tokens">{k("tokens.title")}</h2>
        <p className={styles.prose}>{k("tokens.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="attributes">
        <h2 id="attributes">{k("attributes.title")}</h2>
        <p className={styles.prose}>{k("attributes.text")}</p>
        <CodeBlock code={attrsCode} language="html" />
        <p className={styles.prose}>{k("attributes.value")}</p>
      </section>

      <section className={styles.section} aria-labelledby="events">
        <h2 id="events">{k("events.title")}</h2>
        <p className={styles.prose}>{k("events.text")}</p>
        <ul className={styles.prose}>
          <li>{k("events.change")}</li>
          <li>{k("events.input")}</li>
          <li>{k("events.open")}</li>
          <li>{k("events.other")}</li>
          <li>{k("events.native")}</li>
        </ul>
        <CodeBlock code={eventsCode} language="ts" />
        <p className={styles.prose}>{k("events.programmatic")}</p>
      </section>

      <section className={styles.section} aria-labelledby="slots-parts">
        <h2 id="slots-parts">{k("slots.title")}</h2>
        <p className={styles.prose}>{k("slots.text")}</p>
        <CodeBlock code={slotsCode} language="html" />
      </section>

      <section className={styles.section} aria-labelledby="typings">
        <h2 id="typings">{k("typings.title")}</h2>
        <p className={styles.prose}>{k("typings.text")}</p>
        <CodeBlock code={typingsCode} language="ts" />
        <p className={styles.prose}>{k("typings.frameworks")}</p>
        <CodeBlock code={frameworkTypingsCode} language="ts" />
        <p className={styles.prose}>{k("typings.vscode")}</p>
        <CodeBlock code={vscodeCode} language="json" />
      </section>

      <section className={styles.section} aria-labelledby="react">
        <h2 id="react">{k("react.title")}</h2>
        <p className={styles.prose}>{k("react.text")}</p>
        <CodeBlock code={reactCode} language="tsx" />
        <p className={styles.callout}>{k("react.note")}</p>
      </section>
    </>
  );

  return (
    <DocPage
      id="web-components"
      demos={demos}
      intro={intro}
      importCode={importCode}
    >
      <section className={styles.section} aria-labelledby="ssr">
        <h2 id="ssr">{k("ssr.title")}</h2>
        <p className={styles.prose}>{k("ssr.text")}</p>
        <p className={styles.prose}>{k("ssr.hydration")}</p>
        <CodeBlock code={ssrCode} language="ts" />
        <p className={styles.callout}>{k("ssr.fouc")}</p>
      </section>

      <section className={styles.section} aria-labelledby="dev-warnings">
        <h2 id="dev-warnings">{k("dev.title")}</h2>
        <p className={styles.prose}>{k("dev.text")}</p>
        <CodeBlock code={devCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="authoring">
        <h2 id="authoring">{k("authoring.title")}</h2>
        <p className={styles.prose}>{k("authoring.text")}</p>
        <ul className={styles.prose}>
          {UTILITIES.map((name) => (
            <li key={name}>{k(`authoring.exports.${name}`)}</li>
          ))}
        </ul>
        <CodeBlock code={authoringCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="guides">
        <h2 id="guides">{k("guides.title")}</h2>
        <div className={styles.cardGrid}>
          {GUIDES.map((id) => (
            <Link key={id} to={`/${id}`} className={styles.linkCard}>
              <strong>{t(`docs.${id}.title`)}</strong>
              <span>{t(`docs.${id}.description`)}</span>
            </Link>
          ))}
        </div>
      </section>
    </DocPage>
  );
};

export default WebComponentsDoc;
