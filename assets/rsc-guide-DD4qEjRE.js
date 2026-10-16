import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{Dt as a,Ot as o}from"./io5-BqFjv7-4.js";import{n as s,t as c}from"./CodeBlock-C3JALRK0.js";import{a as l,c as u,d,f,i as p,l as m,r as h,s as g,u as _}from"./DemoBlock-BLFoxU1o.js";import{n as v,t as y}from"./DocPage-DpI9GKki.js";var b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{u(),t(),a(),r(),s(),v(),p(),b=n(),x=[{entry:`minerva-design`,client:!0,key:`main`},{entry:`minerva-design/monaco`,client:!0,key:`monaco`},{entry:`minerva-design/theme-utils`,client:!1,key:`themeUtils`},{entry:`minerva-design/utils`,client:!1,key:`utils`}],S=`// dist/index.js and dist/monaco.js start with
"use client";

// dist/theme-utils.js and dist/utils-entry.js do not: they hold plain
// functions and data, safe to run on the server`,C=`// app/page.tsx: a Server Component (no "use client")
import { Card, Tag } from "minerva-design";
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
}`,w=`// app/save-button.tsx
"use client";

import { Button, toast } from "minerva-design";

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
}`,T=`// app/layout.tsx: a Server Component
import { cookies } from "next/headers";
import {
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  parseThemeCookie,
} from "minerva-design/theme-utils"; // server-safe: runs here
import { ThemeProvider } from "minerva-design"; // rendered, not called

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

// Plain functions and data (cn, themes, palettes, resolveTheme...):
// import them from the server-safe utils entry, not from the main entry
import { cn, themes } from "minerva-design/utils";

// Not on the server: main-entry functions are client references there
// import { toast } from "minerva-design";
// toast.success("Hi"); // call it from a client component instead`,E=`// Strict CSP, option 1: a per-request nonce on the inline script
<script
  nonce={nonce}
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
/>
// Content-Security-Policy: script-src 'self' 'nonce-<nonce>'

// Option 2: allow the script by its hash (static HTML, CDN caching)
import {
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
} from "minerva-design/theme-utils";

const csp = \`script-src 'self' \${THEME_INIT_SCRIPT_HASH}\`;
// a customised script has its own hash:
const script = createThemeInitScript({ defaultTheme: "dark" });
const customCsp = \`script-src 'self' \${cspHash(script)}\`;`,D=`// Next.js App Router: import global CSS once, in the root layout
// app/layout.tsx
import "minerva-design/style.css";

// Vite / other setups: import it in the client entry file (main.tsx)`,O=()=>{let{t:e}=o(),t=t=>e(`docs.rsc-guide.${t}`),n=(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`entries`,children:[(0,b.jsx)(`h2`,{id:`entries`,children:t(`entries.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`entries.text`)}),(0,b.jsx)(`div`,{className:h.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`entries.title`),children:(0,b.jsxs)(m,{className:h.propsTable,children:[(0,b.jsx)(f,{children:(0,b.jsxs)(d,{children:[(0,b.jsx)(l,{scope:`col`,children:t(`entries.entry`)}),(0,b.jsx)(l,{scope:`col`,children:t(`entries.banner`)}),(0,b.jsx)(l,{scope:`col`,children:e(`doc.description`)})]})}),(0,b.jsx)(g,{children:x.map(e=>(0,b.jsxs)(d,{children:[(0,b.jsx)(l,{scope:`row`,children:(0,b.jsx)(`code`,{className:h.propName,children:e.entry})}),(0,b.jsx)(_,{children:e.client?t(`entries.yes`):t(`entries.no`)}),(0,b.jsx)(_,{children:t(`entries.${e.key}`)})]},e.entry))})]})}),(0,b.jsx)(c,{code:S,language:`tsx`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`why`,children:[(0,b.jsx)(`h2`,{id:`why`,children:t(`why.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`why.p1`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`why.p2`)})]})]});return(0,b.jsxs)(y,{id:`rsc-guide`,intro:n,children:[(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`render`,children:[(0,b.jsx)(`h2`,{id:`render`,children:t(`render.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`render.text`)}),(0,b.jsx)(c,{code:C,language:`tsx`}),(0,b.jsx)(`p`,{className:h.prose,children:t(`render.props`)}),(0,b.jsx)(c,{code:w,language:`tsx`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`server-functions`,children:[(0,b.jsx)(`h2`,{id:`server-functions`,children:t(`functions.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`functions.text`)}),(0,b.jsx)(c,{code:T,language:`tsx`}),(0,b.jsx)(`p`,{className:h.callout,children:t(`functions.imperative`)})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`csp`,children:[(0,b.jsx)(`h2`,{id:`csp`,children:t(`csp.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`csp.text`)}),(0,b.jsx)(c,{code:E,language:`tsx`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`css`,children:[(0,b.jsx)(`h2`,{id:`css`,children:t(`css.title`)}),(0,b.jsx)(`p`,{className:h.prose,children:t(`css.text`)}),(0,b.jsx)(c,{code:D,language:`tsx`})]}),(0,b.jsxs)(`section`,{className:h.section,"aria-labelledby":`next-steps`,children:[(0,b.jsx)(`h2`,{id:`next-steps`,children:t(`next.title`)}),(0,b.jsxs)(`div`,{className:h.cardGrid,children:[(0,b.jsxs)(i,{to:`/theme-palette`,className:h.linkCard,children:[(0,b.jsx)(`strong`,{children:e(`docs.theme-palette.title`)}),(0,b.jsx)(`span`,{children:t(`next.themePalette`)})]}),(0,b.jsxs)(i,{to:`/installation`,className:h.linkCard,children:[(0,b.jsx)(`strong`,{children:e(`docs.installation.title`)}),(0,b.jsx)(`span`,{children:t(`next.installation`)})]})]})]})]})}})))()}k();export{O as default};