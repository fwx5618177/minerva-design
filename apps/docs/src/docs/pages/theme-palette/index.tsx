import React from "react";
import { useTranslation } from "react-i18next";
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

const providerCode = `import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    // mode: "light" | "dark" | "system" (default)
    // palette: "editorial" | "tech" | "graphite" | "cool" | null (default look)
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <header>
        <ThemeToggle />
        <PaletteToggle showDefault />
      </header>
      <App />
    </ThemeProvider>
  );
}`;

const configProviderCode = `import { ConfigProvider, ToastProvider, toast } from "minerva-design";

// The same thing with ConfigProvider (ThemeProvider is a preset over it):
// "system" is an alias of "auto"; persist turns on the cookies.
<ConfigProvider
  theme="system"
  palette="editorial"
  persist
  onThemeChange={(theme) => toast.info(\`Theme: \${theme}\`)}
  onPaletteChange={(palette) => toast.info(\`Palette: \${palette}\`)}
>
  <ToastProvider>
    <App />
  </ToastProvider>
</ConfigProvider>;`;

const useThemeCode = `import { useTheme } from "minerva-design";

function Settings() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <>
      <p>{theme} → {resolvedTheme} · {palette ?? "default"}</p>
      <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle mode
      </button>
      <button onClick={() => setPalette("tech")}>Tech palette</button>
    </>
  );
}`;

const htmlCode = `<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">`;

const cookieCode = `import {
  THEME_COOKIE_NAME,     // "theme"   -> "light" | "dark" | "system"
  PALETTE_COOKIE_NAME,   // "palette" -> "editorial" | "tech" | "graphite" | "cool"
  readCookieValue,
  parseThemeCookie,
  parsePaletteCookie,
  serializeThemeCookie,
} from "minerva-design/theme-utils";

// Read on the server (or from document.cookie)
const theme = parseThemeCookie(readCookieValue(cookieHeader, THEME_COOKIE_NAME));
const palette = parsePaletteCookie(readCookieValue(cookieHeader, PALETTE_COOKIE_NAME));

// Write from a route handler / server action (path=/, one year, SameSite=Lax)
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));`;

const nextCode = `// app/layout.tsx: a Server Component (no "use client")
import { headers } from "next/headers";
import { ThemeProvider } from "minerva-design";
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "minerva-design/theme-utils";
import "minerva-design/style.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, palette } = parseThemeCookies((await headers()).get("cookie"), {
    palette: "editorial",
  });

  return (
    // the init script changes <html> attributes before React hydrates
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={theme === "system" ? undefined : theme}
      data-palette={palette ?? undefined}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

const ssrCode = `// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "minerva-design";
import { THEME_INIT_SCRIPT, parseThemeCookies } from "minerva-design/theme-utils";

app.get("*", (req, res) => {
  const { theme, palette } = parseThemeCookies(req.headers.cookie);
  const body = renderToString(
    <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
      <App url={req.url} />
    </ThemeProvider>,
  );
  res.send(\`<!doctype html>
<html\${palette ? \` data-palette="\${palette}"\` : ""}>
  <head>
    <script>\${THEME_INIT_SCRIPT}</script>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body><div id="root">\${body}</div></body>
</html>\`);
});`;

const initScriptCode = `import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});`;

const scopedCode = `// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>`;

const SEMANTIC_TOKENS = [
  "surface-subtle-color",
  "canvas-color",
  "control-color",
  "hover-color",
  "selected-color",
  "text-muted-color",
  "accent-color",
] as const;

const SCALE_GROUPS = [
  {
    key: "spacing",
    tokens: "--space-0 … --space-24 (--space-0-5, --space-1-5, --space-2-5)",
  },
  {
    key: "radius",
    tokens: "--radius-none, --radius-xl, --radius-2xl, --radius-full",
  },
  {
    key: "fontSize",
    tokens: "--font-size-xs, -sm, -md, -lg, -xl, -2xl … -6xl",
  },
  {
    key: "fontWeight",
    tokens:
      "--font-weight-regular | medium | semibold | bold, --line-height-tight | base | relaxed",
  },
  {
    key: "fontFamily",
    tokens: "--font-family-sans, --font-family-display, --font-family-mono",
  },
  {
    key: "zIndex",
    tokens:
      "--z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast",
  },
  {
    key: "motion",
    tokens:
      "--transition-fast | base | slow, --ease-out, --ease-spring, --ease-in",
  },
  {
    key: "rhythm",
    tokens:
      "--rhythm-section | block | tight, --elevation-flat | subtle | raised | floating",
  },
  { key: "focus", tokens: "--focus-ring-width, --focus-ring-offset" },
] as const;

const Swatch: React.FC<{ token: string }> = ({ token }) => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 20,
      height: 20,
      marginRight: 8,
      verticalAlign: "middle",
      border: "1px solid var(--border-color)",
      borderRadius: 4,
      background: `var(--${token})`,
    }}
  />
);

const ThemePaletteDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.theme-palette.${key}`);

  const axisRows = [
    { value: '"light" | "dark"', text: k("axes.modeFixed") },
    { value: '"system"', text: k("axes.modeSystem") },
    { value: '"editorial"', text: k("axes.editorial") },
    { value: '"tech"', text: k("axes.tech") },
    { value: '"graphite"', text: k("axes.graphite") },
    { value: '"cool"', text: k("axes.cool") },
    { value: "null", text: k("axes.none") },
  ];

  const helperRows = [
    { name: "THEME_INIT_SCRIPT", text: k("helpers.initScript") },
    { name: "createThemeInitScript(options?)", text: k("helpers.create") },
    {
      name: "parseThemeCookies(cookieHeader, defaults?)",
      text: k("helpers.parseAll"),
    },
    {
      name: "parseThemeCookie(value, fallback?)",
      text: k("helpers.parseTheme"),
    },
    {
      name: "parsePaletteCookie(value, fallback?)",
      text: k("helpers.parsePalette"),
    },
    { name: "readCookieValue(cookieHeader, name)", text: k("helpers.read") },
    { name: "serializeThemeCookie(name, value)", text: k("helpers.serialize") },
    {
      name: "isThemeMode(value) / isPalette(value)",
      text: k("helpers.guards"),
    },
    { name: "PALETTES", text: k("helpers.palettes") },
    {
      name: "THEME_COOKIE_NAME / PALETTE_COOKIE_NAME / THEME_COOKIE_MAX_AGE",
      text: k("helpers.cookieNames"),
    },
  ];

  const optionRows = [
    { name: "defaultTheme", value: '"system"', text: k("init.defaultTheme") },
    { name: "defaultPalette", value: "null", text: k("init.defaultPalette") },
  ];

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="axes">
        <h2 id="axes">{k("axes.title")}</h2>
        <p className={styles.prose}>{k("axes.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("axes.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("axes.value")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {axisRows.map((row) => (
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

      <section className={styles.section} aria-labelledby="provider">
        <h2 id="provider">{k("provider.title")}</h2>
        <p className={styles.prose}>{k("provider.text")}</p>
        <CodeBlock code={providerCode} language="tsx" />
        <p className={styles.prose}>{k("provider.config")}</p>
        <CodeBlock code={configProviderCode} language="tsx" />
        <p className={styles.prose}>{k("provider.hook")}</p>
        <CodeBlock code={useThemeCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="applied">
        <h2 id="applied">{k("applied.title")}</h2>
        <p className={styles.prose}>{k("applied.text")}</p>
        <CodeBlock code={htmlCode} language="html" />
        <p className={styles.prose}>{k("applied.precedence")}</p>
        <ol className={styles.prose}>
          <li>{k("applied.p1")}</li>
          <li>{k("applied.p2")}</li>
          <li>{k("applied.p3")}</li>
          <li>{k("applied.p4")}</li>
        </ol>
        <p className={styles.callout}>{k("applied.global")}</p>
      </section>
    </>
  );

  return (
    <DocPage id="theme-palette" demos={demos} intro={intro}>
      <section className={styles.section} aria-labelledby="persistence">
        <h2 id="persistence">{k("persistence.title")}</h2>
        <p className={styles.prose}>{k("persistence.text")}</p>
        <CodeBlock code={cookieCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="ssr">
        <h2 id="ssr">{k("ssr.title")}</h2>
        <p className={styles.prose}>{k("ssr.text")}</p>
        <h3>{k("ssr.next")}</h3>
        <CodeBlock code={nextCode} language="tsx" title="app/layout.tsx" />
        <h3>{k("ssr.generic")}</h3>
        <CodeBlock code={ssrCode} language="tsx" title="server.tsx" />
        <p className={styles.callout}>{k("ssr.hydration")}</p>
      </section>

      <section className={styles.section} aria-labelledby="init-script">
        <h2 id="init-script">{k("init.title")}</h2>
        <p className={styles.prose}>{k("init.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("init.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("init.option")}</th>
                <th scope="col">{k("init.default")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {optionRows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">
                    <code className={styles.propName}>{row.name}</code>
                  </th>
                  <td>
                    <code className={styles.propType}>{row.value}</code>
                  </td>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={initScriptCode} language="tsx" />
        <p className={styles.prose}>{k("init.order")}</p>
      </section>

      <section className={styles.section} aria-labelledby="helpers">
        <h2 id="helpers">{k("helpers.title")}</h2>
        <p className={styles.prose}>{k("helpers.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("helpers.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("helpers.name")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {helperRows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">
                    <code className={styles.propName}>{row.name}</code>
                  </th>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="scoped">
        <h2 id="scoped">{k("scoped.title")}</h2>
        <p className={styles.prose}>{k("scoped.text")}</p>
        <CodeBlock code={scopedCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="tokens">
        <h2 id="tokens">{k("tokens.title")}</h2>
        <p className={styles.prose}>{k("tokens.text")}</p>
        <h3>{k("tokens.semantic")}</h3>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("tokens.semantic")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("tokens.variable")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {SEMANTIC_TOKENS.map((token) => (
                <tr key={token}>
                  <th scope="row">
                    <Swatch token={token} />
                    <code className={styles.propName}>--{token}</code>
                  </th>
                  <td>{k(`tokens.items.${token}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.prose}>{k("tokens.accentRole")}</p>
        <h3 style={{ marginTop: "var(--spacing-8)" }}>{k("tokens.scales")}</h3>
        <p className={styles.prose}>{k("tokens.scalesText")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("tokens.scales")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("tokens.group")}</th>
                <th scope="col">{k("tokens.variables")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {SCALE_GROUPS.map((group) => (
                <tr key={group.key}>
                  <th scope="row">{k(`tokens.groups.${group.key}.name`)}</th>
                  <td>
                    <code className={styles.propType}>{group.tokens}</code>
                  </td>
                  <td>{k(`tokens.groups.${group.key}.text`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DocPage>
  );
};

export default ThemePaletteDoc;
