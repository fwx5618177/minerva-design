import {
  TableRoot,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "minerva-design";
import React from "react";
import { supportSummary } from "../../support";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const PACKAGES = [
  { name: "minerva-design/core", key: "core" },
  { name: "minerva-design", key: "libCore" },
  { name: "minerva-design/web-components", key: "webComponents" },
] as const;

/** Internal layers behind the published entries (dist/ of minerva-design) */
const WORKSPACE = [
  { name: "dist/core", key: "neutral" },
  { name: "dist/dom", key: "dom" },
] as const;

/**
 * Every renderer shares the platform-neutral core (state machines, contracts,
 * tokens, i18n); web renderers add the DOM layer. Statuses mirror the component
 * contracts (Platform support page).
 */
const PLATFORMS = [
  { key: "react", entry: "minerva-design", dom: true },
  {
    key: "wc",
    entry: "minerva-design/web-components",
    dom: true,
  },
  { key: "vue", entry: "minerva-design/vue", dom: true },
  {
    key: "angular",
    entry: "minerva-design/angular",
    dom: true,
  },
  {
    key: "native",
    entry: "minerva-design/native",
    dom: false,
  },
  { key: "taro", entry: "minerva-design/taro", dom: false },
  {
    key: "weapp",
    entry: "package.json miniprogram → dist/weapp",
    dom: false,
  },
  { key: "uni", entry: "minerva-design/uni", dom: false },
] as const;

const ROADMAP = ["phase0", "phase1", "phase2", "phase3", "phase4"] as const;

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

const layersCode = `core (dist/core)   platform-neutral TypeScript (no DOM): React Native, mini-programs, Node
  ├─ headless state machines (machines/): disclosure, toast queue, tabs, selection, field...
  ├─ component contracts (contracts/): props, events, slots, platform support
  ├─ tokens: TypeScript source → tokens.css, tokens.mini.css, resolveTokens()
  └─ theme data, design presets, i18n messages + translator, pure helpers
        ▲
        │                             web only
        │   dom (dist/dom)   focus scope, layers, scroll lock, roving focus,
        │        ▲         positioning (@floating-ui/dom), portal, theme DOM helpers
        │        │
 ┌──────┴────────┴──────────────┬─────────────────────────┬──────────────────────┐
 minerva-design         minerva-design/web-components   minerva-design/vue · /angular
 React 19 (DOM)         Lit custom elements             (native renderers)
        │
 minerva-design/native · /taro · /uni · miniprogram → dist/weapp   (native host renderers)

minerva-design/core = core + dom (the web API)`;

const coreCode = `import { createDismissableLayer, createFocusScope, lockScroll } from "minerva-design/core";

// A framework-free modal: trap focus, dismiss on Escape / outside click,
// lock page scroll. Every React overlay is built from the same pieces.
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
        <TableRoot className={styles.propsTable}>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">{k("packages.package")}</TableHeader>
              <TableHeader scope="col">{t("doc.description")}</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {PACKAGES.map((row) => (
              <TableRow key={row.name}>
                <TableHeader scope="row">
                  <code className={styles.propName}>{row.name}</code>
                </TableHeader>
                <TableCell>{k(`packages.${row.key}`)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
      <p className={styles.prose}>{k("packages.workspace")}</p>
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={k("packages.workspaceTitle")}
      >
        <TableRoot className={styles.propsTable}>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">{k("packages.package")}</TableHeader>
              <TableHeader scope="col">{t("doc.description")}</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {WORKSPACE.map((row) => (
              <TableRow key={row.name}>
                <TableHeader scope="row">
                  <code className={styles.propName}>{row.name}</code>
                </TableHeader>
                <TableCell>{k(`packages.${row.key}`)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
      <CodeBlock code={layersCode} language="text" />
    </section>
  );

  return (
    <DocPage id="architecture" intro={intro}>
      <section className={styles.section} aria-labelledby="platforms">
        <h2 id="platforms">{k("platforms.title")}</h2>
        <p className={styles.prose}>{k("platforms.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("platforms.title")}
        >
          <TableRoot className={styles.propsTable}>
            <TableHead>
              <TableRow>
                <TableHeader scope="col">{k("platforms.platform")}</TableHeader>
                <TableHeader scope="col">{k("platforms.entry")}</TableHeader>
                <TableHeader scope="col">{k("platforms.renderer")}</TableHeader>
                <TableHeader scope="col">{k("platforms.shared")}</TableHeader>
                <TableHeader scope="col">{k("platforms.status")}</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {PLATFORMS.map((row) => (
                <TableRow key={row.key}>
                  <TableHeader scope="row">
                    {k(`platforms.rows.${row.key}.name`)}
                  </TableHeader>
                  <TableCell>
                    <code className={styles.propName}>{row.entry}</code>
                  </TableCell>
                  <TableCell>
                    {k(`platforms.rows.${row.key}.renderer`)}
                  </TableCell>
                  <TableCell>
                    <code>{row.dom ? "core + dom" : "core"}</code>
                  </TableCell>
                  <TableCell>
                    {k(
                      `platforms.${supportSummary(row.key).planned ? "planned" : supportSummary(row.key).beta ? "beta" : "stable"}`,
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableRoot>
        </div>
        <p className={styles.prose}>
          <Link to="/platform-support">{k("platforms.support")}</Link>
        </p>
      </section>

      <section className={styles.section} aria-labelledby="headless">
        <h2 id="headless">{k("headless.title")}</h2>
        <p className={styles.prose}>{k("headless.text")}</p>
        <ul className={styles.prose}>
          {(["machines", "contracts", "tokens", "tests"] as const).map(
            (key) => (
              <li key={key}>{k(`headless.${key}`)}</li>
            ),
          )}
        </ul>
      </section>

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

      <section className={styles.section} aria-labelledby="roadmap">
        <h2 id="roadmap">{k("roadmap.title")}</h2>
        <p className={styles.prose}>{k("roadmap.text")}</p>
        <ol className={styles.prose}>
          {ROADMAP.map((key) => (
            <li key={key}>{k(`roadmap.${key}`)}</li>
          ))}
        </ol>
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
