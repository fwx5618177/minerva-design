import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const ENTRIES = [
  { entry: "@minerva/lib-core", client: true, key: "main" },
  { entry: "@minerva/lib-core/monaco", client: true, key: "monaco" },
  { entry: "@minerva/lib-core/theme-utils", client: false, key: "themeUtils" },
] as const;

const bannerCode = `// dist/index.js and dist/monaco.js start with
"use client";

// dist/theme-utils.js does not: it holds plain functions and strings,
// safe to run on the server`;

const serverRenderCode = `// app/page.tsx: a Server Component (no "use client")
import { Card, Tag } from "@minerva/lib-core";
import { SaveButton } from "./save-button";

export default async function Page() {
  const posts = await getPosts(); // server-only data access

  return posts.map((post) => (
    // serializable props only: strings, numbers, booleans, JSX children...
    <Card key={post.id} padding="medium">
      <Tag color="info">{post.category}</Tag>
      <h2>{post.title}</h2>
      <SaveButton id={post.id} />
    </Card>
  ));
}`;

const clientWrapperCode = `// app/save-button.tsx
"use client";

import { Button, toast } from "@minerva/lib-core";

// Event handlers and imperative APIs live in a client component
export function SaveButton({ id }: { id: string }) {
  return (
    <Button
      color="primary"
      onClick={async () => {
        await fetch(\`/api/save/\${id}\`, { method: "POST" });
        toast.success("Saved"); // shown by the ToastProvider in your layout
      }}
    >
      Save
    </Button>
  );
}`;

const serverUtilsCode = `// app/layout.tsx: a Server Component
import { cookies } from "next/headers";
import {
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  parseThemeCookie,
} from "@minerva/lib-core/theme-utils"; // server-safe: runs here
import { ThemeProvider } from "@minerva/lib-core"; // rendered, not called

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = parseThemeCookie((await cookies()).get(THEME_COOKIE_NAME)?.value);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// Not on the server: main-entry functions are client references there
// import { toast } from "@minerva/lib-core";
// toast.success("Hi"); // call it from a client component instead`;

const cssCode = `// Next.js App Router: import global CSS once, in the root layout
// app/layout.tsx
import "@minerva/lib-core/style.css";

// Vite / other setups: import it in the client entry file (main.tsx)`;

const RscGuideDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.rsc-guide.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="entries">
        <h2 id="entries">{k("entries.title")}</h2>
        <p className={styles.prose}>{k("entries.text")}</p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("entries.title")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("entries.entry")}</th>
                <th scope="col">{k("entries.banner")}</th>
                <th scope="col">{t("doc.description")}</th>
              </tr>
            </thead>
            <tbody>
              {ENTRIES.map((row) => (
                <tr key={row.entry}>
                  <th scope="row">
                    <code className={styles.propName}>{row.entry}</code>
                  </th>
                  <td>{row.client ? k("entries.yes") : k("entries.no")}</td>
                  <td>{k(`entries.${row.key}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={bannerCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="why">
        <h2 id="why">{k("why.title")}</h2>
        <p className={styles.prose}>{k("why.p1")}</p>
        <p className={styles.prose}>{k("why.p2")}</p>
      </section>
    </>
  );

  return (
    <DocPage id="rsc-guide" intro={intro}>
      <section className={styles.section} aria-labelledby="render">
        <h2 id="render">{k("render.title")}</h2>
        <p className={styles.prose}>{k("render.text")}</p>
        <CodeBlock code={serverRenderCode} language="tsx" />
        <p className={styles.prose}>{k("render.props")}</p>
        <CodeBlock code={clientWrapperCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="server-functions">
        <h2 id="server-functions">{k("functions.title")}</h2>
        <p className={styles.prose}>{k("functions.text")}</p>
        <CodeBlock code={serverUtilsCode} language="tsx" />
        <p className={styles.callout}>{k("functions.imperative")}</p>
      </section>

      <section className={styles.section} aria-labelledby="css">
        <h2 id="css">{k("css.title")}</h2>
        <p className={styles.prose}>{k("css.text")}</p>
        <CodeBlock code={cssCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="next-steps">
        <h2 id="next-steps">{k("next.title")}</h2>
        <div className={styles.cardGrid}>
          <Link to="/theme-palette" className={styles.linkCard}>
            <strong>{t("docs.theme-palette.title")}</strong>
            <span>{k("next.themePalette")}</span>
          </Link>
          <Link to="/installation" className={styles.linkCard}>
            <strong>{t("docs.installation.title")}</strong>
            <span>{k("next.installation")}</span>
          </Link>
        </div>
      </section>
    </DocPage>
  );
};

export default RscGuideDoc;
