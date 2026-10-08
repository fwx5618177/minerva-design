import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Checkbox,
  HStack,
  Input,
  Switch,
  Tag,
  VStack,
} from "@minerva/lib-core";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { collectDemos } from "@/docs/demos";
import { getApiEntry } from "@/docs/api";
import {
  THEME_MODES,
  useThemeMode,
  type ThemeMode,
} from "@/theme/ThemeModeContext";

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

const MODE_LABEL_KEYS: Record<ThemeMode, string> = {
  auto: "header.theme.auto",
  light: "header.theme.light",
  dark: "header.theme.dark",
  "github-dark": "header.theme.githubDark",
};

const ROLES = ["primary", "secondary", "success", "warning", "danger", "info"];
const ROLE_SUFFIXES = ["", "-hover", "-active", "-subtle", "-border", "-text"];

const providerCode = `import { ConfigProvider } from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  // "auto" (default) follows the operating system's color scheme
  return <ConfigProvider theme="github-dark">{/* your app */}</ConfigProvider>;
}`;

const htmlCode = `<!-- what ConfigProvider writes on the document root -->
<html style="--primary-color: #58a6ff; --background-color: #0d1117; ...">`;

const cssCode = `/* Component-level tokens are not set by the built-in themes,
   so a plain stylesheet can define them */
:root {
  --card-bg-color: #fdf6e3;
  --btn-bg-color-hover: #1e40af;
}

/* Theme tokens are written as inline styles on <html> by ConfigProvider,
   which beat :root rules: use !important to force a value globally... */
:root {
  --radius-md: 10px !important;
}

/* ...or override them for one part of the page */
.checkout {
  --primary-color: #16a34a;
  /* derived tokens are computed on :root: redeclare the ones you need */
  --primary-color-hover: color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color));
}`;

const customCode = `import { ConfigProvider, themes, type ComponentTheme } from "@minerva/lib-core";

// Start from a built-in theme and override the tokens you need.
// Derived tokens (hover, subtle, focus ring...) follow automatically.
const brandLight: ComponentTheme = {
  ...themes.light,
  "primary-color": "#7c3aed",
  "link-color": "#6d28d9",
};

const brandDark: ComponentTheme = {
  ...themes.dark,
  "primary-color": "#a78bfa",
  "focus-ring-color": "rgba(167, 139, 250, 0.55)",
};

export default function App() {
  return (
    // a single object: always this theme
    // <ConfigProvider theme={brandLight}>
    // a { light, dark } pair: follows the system color scheme
    <ConfigProvider theme={{ light: brandLight, dark: brandDark }}>
      {/* your app */}
    </ConfigProvider>
  );
}`;

const isColorToken = (name: string) =>
  !name.startsWith("shadow-") && !name.startsWith("radius-");

const Swatch: React.FC<{ token: string }> = ({ token }) => {
  const style: React.CSSProperties = token.startsWith("shadow-")
    ? { boxShadow: `var(--${token})`, background: "var(--surface-color)" }
    : token.startsWith("radius-")
      ? {
          borderRadius: `var(--${token})`,
          background: "var(--primary-color-subtle)",
        }
      : { background: `var(--${token})` };
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 20,
        height: 20,
        marginRight: 8,
        verticalAlign: "middle",
        border: isColorToken(token) ? "1px solid var(--border-color)" : 0,
        borderRadius: 4,
        ...style,
      }}
    />
  );
};

const TokenTable: React.FC<{ name: string }> = ({ name }) => {
  const { t } = useTranslation();
  const entry = getApiEntry(name);
  if (!entry || entry.kind !== "interface") return null;
  return (
    <div
      className={styles.tableWrapper}
      tabIndex={0}
      role="region"
      aria-label={name}
    >
      <table className={styles.propsTable}>
        <thead>
          <tr>
            <th scope="col">{t("docs.theming.tokens.variable")}</th>
            <th scope="col">{t("doc.description")}</th>
          </tr>
        </thead>
        <tbody>
          {entry.props.map((prop) => (
            <tr key={prop.name}>
              <th scope="row">
                <Swatch token={prop.name} />
                <code className={styles.propName}>--{prop.name}</code>
              </th>
              <td>
                {t(`docs.theme-utils.api.${name}.${prop.name}`, {
                  defaultValue: prop.description ?? "",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ThemeSwitcherShowcase: React.FC = () => {
  const { t } = useTranslation();
  const { mode, setMode, resolved } = useThemeMode();

  return (
    <div className={styles.demoFrame}>
      <div className={styles.demoHeader}>
        <div
          role="group"
          aria-label={t("header.theme.label")}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {THEME_MODES.map((m) => (
            <Button
              key={m}
              size="small"
              color={m === mode ? "primary" : "neutral"}
              variant={m === mode ? "solid" : "outline"}
              aria-pressed={m === mode}
              onClick={() => setMode(m)}
            >
              {t(MODE_LABEL_KEYS[m])}
            </Button>
          ))}
        </div>
        <p className={styles.demoDescription}>
          {t("docs.theming.live.current")} <code>{resolved}</code>
        </p>
      </div>
      <div className={styles.demoPreview} data-demo-preview>
        <VStack gap={4}>
          <HStack gap={4} wrap>
            <Button color="primary">Primary</Button>
            <Button color="neutral" variant="outline">
              Secondary
            </Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
            <Tag color="primary">Tag</Tag>
            <Tag color="success">Success</Tag>
          </HStack>
          <HStack gap={4} wrap>
            <Switch label="Switch" defaultChecked />
            <Checkbox label="Checkbox" defaultChecked />
            <div style={{ width: 220 }}>
              <Input
                name="theming-showcase"
                aria-label="Text field"
                placeholder="Type here"
              />
            </div>
          </HStack>
          <Alert color="info" title="Alert">
            {t("docs.theming.live.alert")}
          </Alert>
        </VStack>
      </div>
    </div>
  );
};

const colorSchemeCode = `import type { ColorScheme } from "@minerva/lib-core";
// "primary" | "neutral" | "success" | "warning" | "danger" | "info"

<Button color="danger" variant="outline">Delete</Button>
<Badge color="success" variant="subtle" content="Live" />
<Alert color="warning" variant="solid" title="Quota almost reached" />
<Tooltip color="info" content="Synced"><button>Status</button></Tooltip>
toast.success("Saved"); // toast({ color: "success", title: "Saved" })`;

const ThemingDoc: React.FC = () => {
  const { t } = useTranslation();

  const themeValues = [
    { value: '"auto"', text: t("docs.theming.values.auto") },
    { value: '"light"', text: t("docs.theming.values.light") },
    { value: '"dark"', text: t("docs.theming.values.dark") },
    { value: '"github-dark"', text: t("docs.theming.values.githubDark") },
    { value: "ThemeMap", text: t("docs.theming.values.object") },
    { value: "{ light, dark }", text: t("docs.theming.values.pair") },
  ];

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="built-in">
        <h2 id="built-in">{t("docs.theming.builtIn.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.builtIn.text")}</p>
        <CodeBlock code={providerCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="live">
        <h2 id="live">{t("docs.theming.live.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.live.text")}</p>
        <ThemeSwitcherShowcase />
      </section>

      <section className={styles.section} aria-labelledby="theme-values">
        <h2 id="theme-values">{t("docs.theming.values.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.values.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={t("docs.theming.values.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{t("docs.theming.values.value")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {themeValues.map((row) => (
                <tr key={row.value}>
                  <th scope="row">
                    <code className={styles.propName}>{row.value}</code>
                  </th>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="how-it-works">
        <h2 id="how-it-works">{t("docs.theming.how.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.how.p1")}</p>
        <CodeBlock code={htmlCode} language="html" />
        <p className={styles.prose}>{t("docs.theming.how.p2")}</p>
      </section>
    </>
  );

  return (
    <DocPage id="theming" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="custom-theme">
        <h2 id="custom-theme">{t("docs.theming.custom.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.custom.text")}</p>
        <CodeBlock code={customCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="color-variant">
        <h2 id="color-variant">{t("docs.theming.colorProps.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.colorProps.color")}</p>
        <p className={styles.prose}>{t("docs.theming.colorProps.variant")}</p>
        <CodeBlock code={colorSchemeCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="css-overrides">
        <h2 id="css-overrides">{t("docs.theming.css.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.css.text")}</p>
        <CodeBlock code={cssCode} language="scss" />
        <p className={styles.callout}>{t("docs.theming.css.note")}</p>
      </section>

      <section className={styles.section} aria-labelledby="tokens">
        <h2 id="tokens">{t("docs.theming.tokens.title")}</h2>
        <p className={styles.prose}>{t("docs.theming.tokens.text")}</p>
        <h3>{t("docs.theming.tokens.base")}</h3>
        <p className={styles.prose}>{t("docs.theming.tokens.baseText")}</p>
        <TokenTable name="ThemeProps" />
        <h3 style={{ marginTop: "var(--spacing-8)" }}>
          {t("docs.theming.tokens.semantic")}
        </h3>
        <p className={styles.prose}>{t("docs.theming.tokens.semanticText")}</p>
        <TokenTable name="SemanticThemeProps" />
        <h3 style={{ marginTop: "var(--spacing-8)" }}>
          {t("docs.theming.tokens.roles")}
        </h3>
        <p className={styles.prose}>{t("docs.theming.tokens.rolesText")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={t("docs.theming.tokens.roles")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{t("docs.theming.tokens.role")}</th>
                {ROLE_SUFFIXES.map((suffix) => (
                  <th scope="col" key={suffix}>
                    <code>{`--<role>-color${suffix}`}</code>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role}>
                  <th scope="row">
                    <code className={styles.propName}>{role}</code>
                  </th>
                  {ROLE_SUFFIXES.map((suffix) => (
                    <td key={suffix} title={`--${role}-color${suffix}`}>
                      <Swatch token={`${role}-color${suffix}`} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 style={{ marginTop: "var(--spacing-8)" }}>
          {t("docs.theming.tokens.component")}
        </h3>
        <p className={styles.prose}>{t("docs.theming.tokens.componentText")}</p>
        <TokenTable name="ComponentThemeProps" />
      </section>
    </DocPage>
  );
};

export default ThemingDoc;
