import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-_Zwe2k8f.js";import{Nn as a,it as o,lr as s,tn as c}from"./angular-preview-Bvv51cL-.js";import{B as l,R as u,V as d,z as f}from"./ProgressIndicator-CXNTCbma.js";import{t as p}from"./stylingHooks-PqiNJdev.js";import{n as m,t as h}from"./Tag-CfzvQMS_.js";import{n as ee,t as te}from"./Switch-8PfMbWjZ.js";import{n as ne,t as g}from"./CodeBlock-DeTZ8VjC.js";import{n as re,t as ie}from"./ConfigProvider-DXtbH6oy.js";import{n as _,r as ae,t as v}from"./ThemeProvider-MPEoDegH.js";import{n as y,t as b}from"./themeToggle.module.scss-5xxQn6bi.js";import{i as x,r as oe}from"./Stack-NslbKtAY.js";import{c as S,d as C,f as w,i as se,l as ce,o as T,r as E,s as D,u as O}from"./DemoBlock-CUvwen_3.js";import{l as le,n as ue,t as de,u as fe}from"./DocPage-Cb_KyqiH.js";var k,A;function j(){return(j=e((()=>{a(),d(),_(),b(),k=n(),A=({showSystem:e=!0,labels:t,className:n,ref:r,...i})=>{let{theme:a,resolvedTheme:s,setTheme:c}=v(),{t:u}=l(),d=e?[`light`,`dark`,`system`]:[`light`,`dark`];return(0,k.jsx)(`div`,{ref:r,className:o(y.group,n),role:`group`,"aria-label":u(`themeToggle.label`,{theme:s}),...i,...p(`theme-toggle`,`root`),children:d.map(e=>(0,k.jsx)(`button`,{type:`button`,className:y.item,"aria-pressed":a===e,onClick:()=>c(e),...p(`theme-toggle`,`item`,{state:a===e?`active`:`inactive`}),children:t?.[e]??u(`themeToggle.${e}`)},e))})}})))()}var M,N;function P(){return(P=e((()=>{a(),d(),_(),b(),M=n(),N=({palettes:e=[...s],showDefault:t=!1,labels:n,className:r,ref:i,...a})=>{let{palette:c,setPalette:u}=v(),{t:d}=l(),f=t?[null,...e]:e;return(0,M.jsx)(`div`,{ref:i,className:o(y.group,r),role:`group`,"aria-label":d(`paletteToggle.label`,{palette:c??d(`paletteToggle.default`)}),...a,...p(`palette-toggle`,`root`),children:f.map(e=>{let t=e??`default`,r=c===e;return(0,M.jsx)(`button`,{type:`button`,className:y.item,"aria-pressed":r,onClick:()=>u(e),...p(`palette-toggle`,`item`,{state:r?`active`:`inactive`}),children:n?.[t]??d(`paletteToggle.${t}`)},t)})})}})))()}function pe(){return(0,F.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:12},children:s.flatMap(e=>I.map(t=>{let n=c[e][t];return(0,F.jsxs)(`figure`,{style:{margin:0,padding:14,borderRadius:10,border:`1px solid ${n[`border-color`]}`,background:n[`background-color`],color:n[`text-color`],fontFamily:n[`font-family-sans`]},children:[(0,F.jsxs)(`figcaption`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:10,fontWeight:600},children:[(0,F.jsx)(`span`,{children:e}),(0,F.jsx)(`span`,{style:{color:n[`text-muted-color`]},children:t})]}),(0,F.jsx)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`},children:L.map(e=>(0,F.jsx)(`span`,{title:`--${e}: ${n[e]}`,style:{width:22,height:22,borderRadius:6,background:n[e],border:`1px solid ${n[`border-strong-color`]}`}},e))}),(0,F.jsxs)(`div`,{style:{marginTop:10,padding:`6px 8px`,borderRadius:6,background:n[`surface-subtle-color`],color:n[`text-secondary-color`],fontSize:12},children:[n[`primary-color`],` / `,n[`accent-color`]]})]},`${e}-${t}`)}))})}var F,I,L;function R(){return(R=e((()=>{a(),F=n(),I=[`light`,`dark`],L=[`primary-color`,`accent-color`,`success-color`,`warning-color`,`danger-color`,`info-color`,`border-color`]})))()}function me(){let{resolvedTheme:e,palette:t}=v();return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:16,padding:20,borderRadius:12,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`,fontFamily:`var(--font-family-sans)`},children:[(0,z.jsxs)(x,{gap:4,wrap:!0,children:[(0,z.jsx)(A,{}),(0,z.jsx)(N,{})]}),(0,z.jsxs)(x,{gap:4,wrap:!0,children:[(0,z.jsx)(f,{color:`primary`,children:`Primary`}),(0,z.jsx)(f,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,z.jsx)(h,{color:`primary`,children:t??`default`}),(0,z.jsx)(h,{color:`info`,children:e}),(0,z.jsx)(te,{label:`Switch`,defaultChecked:!0})]}),(0,z.jsxs)(`p`,{style:{margin:0,color:`var(--text-muted-color)`},children:[`Theme: `,e,`; palette: `,t??`default`]})]})}function he(){return(0,z.jsx)(ae,{defaultTheme:`system`,defaultPalette:`editorial`,children:(0,z.jsx)(me,{})})}var z;function B(){return(B=e((()=>{u(),oe(),P(),ee(),m(),_(),j(),z=n()})))()}function ge(){let{theme:e,resolvedTheme:t,palette:n}=v(),r=ie(),i=[[`useTheme().theme`,e],[`useTheme().resolvedTheme`,t],[`useTheme().palette`,n??`null`],[`useConfig().mode`,r.mode??`undefined`],[`useConfig().resolvedMode`,r.resolvedMode??`undefined`],[`useConfig().palette`,r.palette??`null`]];return(0,V.jsx)(`dl`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,gap:`8px 16px`,margin:0},children:i.map(([e,t])=>(0,V.jsxs)(`div`,{style:{display:`contents`},children:[(0,V.jsx)(`dt`,{children:(0,V.jsx)(`code`,{children:e})}),(0,V.jsx)(`dd`,{style:{margin:0},children:(0,V.jsx)(h,{color:`primary`,children:t})})]},e))})}var V;function H(){return(H=e((()=>{m(),re(),_(),V=n()})))()}var U;function W(){return(W=e((()=>{U=`import { palettes } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

const MODES = ["light", "dark"] as const;

// Tokens shown for each palette x mode (values read from \`palettes\`)
const TOKENS = [
  "primary-color",
  "accent-color",
  "success-color",
  "warning-color",
  "danger-color",
  "info-color",
  "border-color",
] as const;

export default function PaletteSwatchesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.flatMap((name) =>
        MODES.map((mode) => {
          const tokens = palettes[name][mode];
          return (
            <figure
              key={\`\${name}-\${mode}\`}
              style={{
                margin: 0,
                padding: 14,
                borderRadius: 10,
                border: \`1px solid \${tokens["border-color"]}\`,
                background: tokens["background-color"],
                color: tokens["text-color"],
                fontFamily: tokens["font-family-sans"],
              }}
            >
              <figcaption
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                <span>{name}</span>
                <span style={{ color: tokens["text-muted-color"] }}>
                  {mode}
                </span>
              </figcaption>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TOKENS.map((token) => (
                  <span
                    key={token}
                    title={\`--\${token}: \${tokens[token]}\`}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: tokens[token],
                      border: \`1px solid \${tokens["border-strong-color"]}\`,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  marginTop: 10,
                  padding: "6px 8px",
                  borderRadius: 6,
                  background: tokens["surface-subtle-color"],
                  color: tokens["text-secondary-color"],
                  fontSize: 12,
                }}
              >
                {tokens["primary-color"]} / {tokens["accent-color"]}
              </div>
            </figure>
          );
        }),
      )}
    </div>
  );
}
`})))()}var G;function _e(){return(_e=e((()=>{G=`import {
  Button,
  HStack,
  PaletteToggle,
  Switch,
  Tag,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "minerva-design";

// In an application, one provider at the root is all you need:
//
//   <ThemeProvider defaultPalette="editorial">
//     <ThemeToggle />
//     <PaletteToggle />
//   </ThemeProvider>
//
// Here a nested ThemeProvider is used: it scopes its mode and palette to its
// own subtree (no <html> attributes, no cookies), so the toggles re-theme
// this preview without touching the rest of the docs site.
function Preview() {
  const { resolvedTheme, palette } = useTheme();
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        padding: 20,
        borderRadius: 12,
        border: "1px solid var(--border-color)",
        background: "var(--background-color)",
        color: "var(--text-color)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      <HStack gap={4} wrap>
        <ThemeToggle />
        <PaletteToggle />
      </HStack>
      <HStack gap={4} wrap>
        <Button color="primary">Primary</Button>
        <Button color="neutral" variant="outline">
          Secondary
        </Button>
        <Tag color="primary">{palette ?? "default"}</Tag>
        <Tag color="info">{resolvedTheme}</Tag>
        <Switch label="Switch" defaultChecked />
      </HStack>
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        Theme: {resolvedTheme}; palette: {palette ?? "default"}
      </p>
    </div>
  );
}

export default function TogglesDemo() {
  return (
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <Preview />
    </ThemeProvider>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Tag, useConfig, useTheme } from "minerva-design";

// useTheme() reads the closest ThemeProvider / ConfigProvider. This site wraps
// every page in one: change the theme or palette in the header and the values
// below follow. (github-dark is not a light / dark / system mode, so useTheme
// falls back to "system" while useConfig().mode is undefined.)
export default function UseThemeDemo() {
  const { theme, resolvedTheme, palette } = useTheme();
  const config = useConfig();

  const rows: [string, string][] = [
    ["useTheme().theme", theme],
    ["useTheme().resolvedTheme", resolvedTheme],
    ["useTheme().palette", palette ?? "null"],
    ["useConfig().mode", config.mode ?? "undefined"],
    ["useConfig().resolvedMode", config.resolvedMode ?? "undefined"],
    ["useConfig().palette", config.palette ?? "null"],
  ];

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: "contents" }}>
          <dt>
            <code>{label}</code>
          </dt>
          <dd style={{ margin: 0 }}>
            <Tag color="primary">{value}</Tag>
          </dd>
        </div>
      ))}
    </dl>
  );
}
`})))()}var J,Y,X,Z,ve,ye,be,xe,Q,Se,Ce,we,Te,Ee,De;function $(){return($=e((()=>{R(),B(),H(),W(),_e(),q(),ce(),t(),i(),ne(),ue(),se(),fe(),J=n(),Y=le(Object.assign({"./demos/palette-swatches.tsx":pe,"./demos/toggles.tsx":he,"./demos/use-theme.tsx":ge}),Object.assign({"./demos/palette-swatches.tsx":U,"./demos/toggles.tsx":G,"./demos/use-theme.tsx":K})),X=`import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
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
}`,Z=`import { ConfigProvider, ToastProvider, toast } from "minerva-design";

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
</ConfigProvider>;`,ve=`import { Button, useTheme } from "minerva-design";

function Settings() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <>
      <p>{theme} → {resolvedTheme} · {palette ?? "default"}</p>
      <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle mode
      </Button>
      <Button onClick={() => setPalette("tech")}>Tech palette</Button>
    </>
  );
}`,ye=`<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">`,be=`import {
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
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));`,xe=`// app/layout.tsx: a Server Component (no "use client")
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
}`,Q=`// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
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
    <script>\${THEME_INIT_SCRIPT}<\/script>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body><div id="root">\${body}</div></body>
</html>\`);
});`,Se=`import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});`,Ce=`// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>`,we=[`surface-subtle-color`,`canvas-color`,`control-color`,`hover-color`,`selected-color`,`text-muted-color`,`accent-color`],Te=[{key:`spacing`,tokens:`--space-0 … --space-24 (--space-0-5, --space-1-5, --space-2-5)`},{key:`radius`,tokens:`--radius-none, --radius-xl, --radius-2xl, --radius-full`},{key:`fontSize`,tokens:`--font-size-xs, -sm, -md, -lg, -xl, -2xl … -6xl`},{key:`fontWeight`,tokens:`--font-weight-regular | medium | semibold | bold, --line-height-tight | base | relaxed`},{key:`fontFamily`,tokens:`--font-family-sans, --font-family-display, --font-family-mono`},{key:`zIndex`,tokens:`--z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast`},{key:`motion`,tokens:`--transition-fast | base | slow, --ease-out, --ease-spring, --ease-in`},{key:`rhythm`,tokens:`--rhythm-section | block | tight, --elevation-flat | subtle | raised | floating`},{key:`focus`,tokens:`--focus-ring-width, --focus-ring-offset`}],Ee=({token:e})=>(0,J.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:20,height:20,marginRight:8,verticalAlign:`middle`,border:`1px solid var(--border-color)`,borderRadius:4,background:`var(--${e})`}}),De=()=>{let{t:e}=r(),t=t=>e(`docs.theme-palette.${t}`),n=[{value:`"light" | "dark"`,text:t(`axes.modeFixed`)},{value:`"system"`,text:t(`axes.modeSystem`)},{value:`"editorial"`,text:t(`axes.editorial`)},{value:`"tech"`,text:t(`axes.tech`)},{value:`"graphite"`,text:t(`axes.graphite`)},{value:`"cool"`,text:t(`axes.cool`)},{value:`null`,text:t(`axes.none`)}],i=[{name:`THEME_INIT_SCRIPT`,text:t(`helpers.initScript`)},{name:`createThemeInitScript(options?)`,text:t(`helpers.create`)},{name:`parseThemeCookies(cookieHeader, defaults?)`,text:t(`helpers.parseAll`)},{name:`parseThemeCookie(value, fallback?)`,text:t(`helpers.parseTheme`)},{name:`parsePaletteCookie(value, fallback?)`,text:t(`helpers.parsePalette`)},{name:`readCookieValue(cookieHeader, name)`,text:t(`helpers.read`)},{name:`serializeThemeCookie(name, value)`,text:t(`helpers.serialize`)},{name:`isThemeMode(value) / isPalette(value)`,text:t(`helpers.guards`)},{name:`PALETTES`,text:t(`helpers.palettes`)},{name:`THEME_COOKIE_NAME / PALETTE_COOKIE_NAME / THEME_COOKIE_MAX_AGE`,text:t(`helpers.cookieNames`)}],a=[{name:`defaultTheme`,value:`"system"`,text:t(`init.defaultTheme`)},{name:`defaultPalette`,value:`null`,text:t(`init.defaultPalette`)}],o=(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`axes`,children:[(0,J.jsx)(`h2`,{id:`axes`,children:t(`axes.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`axes.text`)}),(0,J.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`axes.title`),children:(0,J.jsxs)(w,{className:E.propsTable,children:[(0,J.jsx)(S,{children:(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`col`,children:t(`axes.value`)}),(0,J.jsx)(O,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(C,{children:n.map(e=>(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`row`,children:(0,J.jsx)(`code`,{className:E.propName,children:e.value})}),(0,J.jsx)(D,{children:e.text})]},e.value))})]})})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`provider`,children:[(0,J.jsx)(`h2`,{id:`provider`,children:t(`provider.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`provider.text`)}),(0,J.jsx)(g,{code:X,language:`tsx`}),(0,J.jsx)(`p`,{className:E.prose,children:t(`provider.config`)}),(0,J.jsx)(g,{code:Z,language:`tsx`}),(0,J.jsx)(`p`,{className:E.prose,children:t(`provider.hook`)}),(0,J.jsx)(g,{code:ve,language:`tsx`})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`applied`,children:[(0,J.jsx)(`h2`,{id:`applied`,children:t(`applied.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`applied.text`)}),(0,J.jsx)(g,{code:ye,language:`html`}),(0,J.jsx)(`p`,{className:E.prose,children:t(`applied.precedence`)}),(0,J.jsxs)(`ol`,{className:E.prose,children:[(0,J.jsx)(`li`,{children:t(`applied.p1`)}),(0,J.jsx)(`li`,{children:t(`applied.p2`)}),(0,J.jsx)(`li`,{children:t(`applied.p3`)}),(0,J.jsx)(`li`,{children:t(`applied.p4`)})]}),(0,J.jsx)(`p`,{className:E.callout,children:t(`applied.global`)})]})]});return(0,J.jsxs)(de,{id:`theme-palette`,demos:Y,intro:o,children:[(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`persistence`,children:[(0,J.jsx)(`h2`,{id:`persistence`,children:t(`persistence.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`persistence.text`)}),(0,J.jsx)(g,{code:be,language:`tsx`})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`ssr`,children:[(0,J.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`ssr.text`)}),(0,J.jsx)(`h3`,{children:t(`ssr.next`)}),(0,J.jsx)(g,{code:xe,language:`tsx`,title:`app/layout.tsx`}),(0,J.jsx)(`h3`,{children:t(`ssr.generic`)}),(0,J.jsx)(g,{code:Q,language:`tsx`,title:`server.tsx`}),(0,J.jsx)(`p`,{className:E.callout,children:t(`ssr.hydration`)})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`init-script`,children:[(0,J.jsx)(`h2`,{id:`init-script`,children:t(`init.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`init.text`)}),(0,J.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`init.title`),children:(0,J.jsxs)(w,{className:E.propsTable,children:[(0,J.jsx)(S,{children:(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`col`,children:t(`init.option`)}),(0,J.jsx)(O,{scope:`col`,children:t(`init.default`)}),(0,J.jsx)(O,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(C,{children:a.map(e=>(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`row`,children:(0,J.jsx)(`code`,{className:E.propName,children:e.name})}),(0,J.jsx)(D,{children:(0,J.jsx)(`code`,{className:E.propType,children:e.value})}),(0,J.jsx)(D,{children:e.text})]},e.name))})]})}),(0,J.jsx)(g,{code:Se,language:`tsx`}),(0,J.jsx)(`p`,{className:E.prose,children:t(`init.order`)})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`helpers`,children:[(0,J.jsx)(`h2`,{id:`helpers`,children:t(`helpers.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`helpers.text`)}),(0,J.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`helpers.title`),children:(0,J.jsxs)(w,{className:E.propsTable,children:[(0,J.jsx)(S,{children:(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`col`,children:t(`helpers.name`)}),(0,J.jsx)(O,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(C,{children:i.map(e=>(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`row`,children:(0,J.jsx)(`code`,{className:E.propName,children:e.name})}),(0,J.jsx)(D,{children:e.text})]},e.name))})]})})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`scoped`,children:[(0,J.jsx)(`h2`,{id:`scoped`,children:t(`scoped.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`scoped.text`)}),(0,J.jsx)(g,{code:Ce,language:`tsx`})]}),(0,J.jsxs)(`section`,{className:E.section,"aria-labelledby":`tokens`,children:[(0,J.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`tokens.text`)}),(0,J.jsx)(`h3`,{children:t(`tokens.semantic`)}),(0,J.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.semantic`),children:(0,J.jsxs)(w,{className:E.propsTable,children:[(0,J.jsx)(S,{children:(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`col`,children:t(`tokens.variable`)}),(0,J.jsx)(O,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(C,{children:we.map(e=>(0,J.jsxs)(T,{children:[(0,J.jsxs)(O,{scope:`row`,children:[(0,J.jsx)(Ee,{token:e}),(0,J.jsxs)(`code`,{className:E.propName,children:[`--`,e]})]}),(0,J.jsx)(D,{children:t(`tokens.items.${e}`)})]},e))})]})}),(0,J.jsx)(`p`,{className:E.prose,children:t(`tokens.accentRole`)}),(0,J.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:t(`tokens.scales`)}),(0,J.jsx)(`p`,{className:E.prose,children:t(`tokens.scalesText`)}),(0,J.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.scales`),children:(0,J.jsxs)(w,{className:E.propsTable,children:[(0,J.jsx)(S,{children:(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`col`,children:t(`tokens.group`)}),(0,J.jsx)(O,{scope:`col`,children:t(`tokens.variables`)}),(0,J.jsx)(O,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(C,{children:Te.map(e=>(0,J.jsxs)(T,{children:[(0,J.jsx)(O,{scope:`row`,children:t(`tokens.groups.${e.key}.name`)}),(0,J.jsx)(D,{children:(0,J.jsx)(`code`,{className:E.propType,children:e.tokens})}),(0,J.jsx)(D,{children:t(`tokens.groups.${e.key}.text`)})]},e.key))})]})})]})]})}})))()}$();export{De as default};