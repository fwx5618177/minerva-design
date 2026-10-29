import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Dt as r,Ot as i}from"./io5-CvrBnF9y.js";import{$ as a,It as o,nn as s,ut as c}from"./angular-preview-l4x8c_2r.js";import{B as l,H as u,K as d,R as f,U as p,q as ee,z as m}from"./ProgressIndicator-BhPa7d9i.js";import{n as h,t as g}from"./Tag-vE6Ajh98.js";import{n as te,t as ne}from"./Switch-pqeeKpr_.js";import{n as re,t as _}from"./CodeBlock-Bfhf7f9G.js";import{i as ie,n as ae,r as v,t as oe}from"./ConfigProvider-DZkhWQzR.js";import{n as y,t as b}from"./themeToggle.module.scss-5xxQn6bi.js";import{i as x,r as se}from"./Stack-CiM4m4jI.js";import{a as S,c as ce,d as C,f as w,i as le,l as T,r as E,s as D,u as O}from"./DemoBlock-3GMi3Uss.js";import{l as ue,n as de,t as fe,u as pe}from"./DocPage-DCMfehF7.js";function me({defaultTheme:e,defaultPalette:t,disableStorage:n=!1,locale:r,onThemeChange:i,onPaletteChange:a,children:o}){let s=(0,A.useContext)(ee)===null;return(0,j.jsx)(oe,{theme:e??(s?`system`:void 0),palette:t,persist:!n,locale:r,onThemeChange:i?e=>{e===`light`||e===`dark`?i(e):(e===`auto`||e===`system`)&&i(`system`)}:void 0,onPaletteChange:a,children:o})}function k(){let e=(0,A.useContext)(ie);if(!e)throw Error(`useTheme must be used within a ThemeProvider (or ConfigProvider)`);let{mode:t,resolvedMode:n,palette:r=null,setTheme:i,setPalette:a}=e,o=(0,A.useCallback)(e=>i?.(e),[i]),s=(0,A.useCallback)(e=>a?.(e),[a]);return(0,A.useMemo)(()=>({theme:t??`system`,resolvedTheme:n??`light`,palette:r,setTheme:o,setPalette:s}),[t,n,r,o,s])}var A,j;function M(){return(M=e((()=>{d(),v(),A=t(),j=n()})))()}var N,P;function F(){return(F=e((()=>{o(),p(),M(),b(),N=n(),P=({showSystem:e=!0,labels:t,className:n,ref:r,...i})=>{let{theme:a,resolvedTheme:o,setTheme:s}=k(),{t:d}=u(),f=e?[`light`,`dark`,`system`]:[`light`,`dark`];return(0,N.jsx)(`div`,{ref:r,className:c(y.group,n),role:`group`,"aria-label":d(`themeToggle.label`,{theme:o}),...i,...l(`theme-toggle`,`root`),children:f.map(e=>(0,N.jsx)(`button`,{type:`button`,className:y.item,"aria-pressed":a===e,onClick:()=>s(e),...l(`theme-toggle`,`item`,{state:a===e?`active`:`inactive`}),children:t?.[e]??d(`themeToggle.${e}`)},e))})}})))()}var I,L;function R(){return(R=e((()=>{o(),p(),M(),b(),I=n(),L=({palettes:e=[...s],showDefault:t=!1,labels:n,className:r,ref:i,...a})=>{let{palette:o,setPalette:d}=k(),{t:f}=u(),p=t?[null,...e]:e;return(0,I.jsx)(`div`,{ref:i,className:c(y.group,r),role:`group`,"aria-label":f(`paletteToggle.label`,{palette:o??f(`paletteToggle.default`)}),...a,...l(`palette-toggle`,`root`),children:p.map(e=>{let t=e??`default`,r=o===e;return(0,I.jsx)(`button`,{type:`button`,className:y.item,"aria-pressed":r,onClick:()=>d(e),...l(`palette-toggle`,`item`,{state:r?`active`:`inactive`}),children:n?.[t]??f(`paletteToggle.${t}`)},t)})})}})))()}function he(){return(0,z.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:12},children:s.flatMap(e=>B.map(t=>{let n=a[e][t];return(0,z.jsxs)(`figure`,{style:{margin:0,padding:14,borderRadius:10,border:`1px solid ${n[`border-color`]}`,background:n[`background-color`],color:n[`text-color`],fontFamily:n[`font-family-sans`]},children:[(0,z.jsxs)(`figcaption`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:10,fontWeight:600},children:[(0,z.jsx)(`span`,{children:e}),(0,z.jsx)(`span`,{style:{color:n[`text-muted-color`]},children:t})]}),(0,z.jsx)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`},children:V.map(e=>(0,z.jsx)(`span`,{title:`--${e}: ${n[e]}`,style:{width:22,height:22,borderRadius:6,background:n[e],border:`1px solid ${n[`border-strong-color`]}`}},e))}),(0,z.jsxs)(`div`,{style:{marginTop:10,padding:`6px 8px`,borderRadius:6,background:n[`surface-subtle-color`],color:n[`text-secondary-color`],fontSize:12},children:[n[`primary-color`],` / `,n[`accent-color`]]})]},`${e}-${t}`)}))})}var z,B,V;function H(){return(H=e((()=>{o(),z=n(),B=[`light`,`dark`],V=[`primary-color`,`accent-color`,`success-color`,`warning-color`,`danger-color`,`info-color`,`border-color`]})))()}function ge(){let{resolvedTheme:e,palette:t}=k();return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:16,padding:20,borderRadius:12,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`,fontFamily:`var(--font-family-sans)`},children:[(0,U.jsxs)(x,{gap:4,wrap:!0,children:[(0,U.jsx)(P,{}),(0,U.jsx)(L,{})]}),(0,U.jsxs)(x,{gap:4,wrap:!0,children:[(0,U.jsx)(m,{color:`primary`,children:`Primary`}),(0,U.jsx)(m,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,U.jsx)(g,{color:`primary`,children:t??`default`}),(0,U.jsx)(g,{color:`info`,children:e}),(0,U.jsx)(ne,{label:`Switch`,defaultChecked:!0})]}),(0,U.jsxs)(`p`,{style:{margin:0,color:`var(--text-muted-color)`},children:[`Theme: `,e,`; palette: `,t??`default`]})]})}function _e(){return(0,U.jsx)(me,{defaultTheme:`system`,defaultPalette:`editorial`,children:(0,U.jsx)(ge,{})})}var U;function W(){return(W=e((()=>{f(),se(),R(),te(),h(),M(),F(),U=n()})))()}function ve(){let{theme:e,resolvedTheme:t,palette:n}=k(),r=ae(),i=[[`useTheme().theme`,e],[`useTheme().resolvedTheme`,t],[`useTheme().palette`,n??`null`],[`useConfig().mode`,r.mode??`undefined`],[`useConfig().resolvedMode`,r.resolvedMode??`undefined`],[`useConfig().palette`,r.palette??`null`]];return(0,G.jsx)(`dl`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,gap:`8px 16px`,margin:0},children:i.map(([e,t])=>(0,G.jsxs)(`div`,{style:{display:`contents`},children:[(0,G.jsx)(`dt`,{children:(0,G.jsx)(`code`,{children:e})}),(0,G.jsx)(`dd`,{style:{margin:0},children:(0,G.jsx)(g,{color:`primary`,children:t})})]},e))})}var G;function K(){return(K=e((()=>{h(),v(),M(),G=n()})))()}var q;function ye(){return(ye=e((()=>{q=`import { palettes } from "minerva-design";
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import {
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { Tag, useConfig, useTheme } from "minerva-design";

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
`})))()}var Q,$,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me;function Ne(){return(Ne=e((()=>{H(),W(),K(),ye(),Y(),Z(),ce(),t(),r(),re(),de(),le(),pe(),Q=n(),$=ue(Object.assign({"./demos/palette-swatches.tsx":he,"./demos/toggles.tsx":_e,"./demos/use-theme.tsx":ve}),Object.assign({"./demos/palette-swatches.tsx":q,"./demos/toggles.tsx":J,"./demos/use-theme.tsx":X})),be=`import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
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
}`,xe=`import { ConfigProvider, ToastProvider, toast } from "minerva-design";

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
</ConfigProvider>;`,Se=`import { Button, useTheme } from "minerva-design";

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
}`,Ce=`<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">`,we=`import {
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
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));`,Te=`// app/layout.tsx: a Server Component (no "use client")
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
}`,Ee=`// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
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
});`,De=`import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});`,Oe=`// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>`,ke=[`surface-subtle-color`,`canvas-color`,`control-color`,`hover-color`,`selected-color`,`text-muted-color`,`accent-color`],Ae=[{key:`spacing`,tokens:`--space-0 … --space-24 (--space-0-5, --space-1-5, --space-2-5)`},{key:`radius`,tokens:`--radius-none, --radius-xl, --radius-2xl, --radius-full`},{key:`fontSize`,tokens:`--font-size-xs, -sm, -md, -lg, -xl, -2xl … -6xl`},{key:`fontWeight`,tokens:`--font-weight-regular | medium | semibold | bold, --line-height-tight | base | relaxed`},{key:`fontFamily`,tokens:`--font-family-sans, --font-family-display, --font-family-mono`},{key:`zIndex`,tokens:`--z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast`},{key:`motion`,tokens:`--transition-fast | base | slow, --ease-out, --ease-spring, --ease-in`},{key:`rhythm`,tokens:`--rhythm-section | block | tight, --elevation-flat | subtle | raised | floating`},{key:`focus`,tokens:`--focus-ring-width, --focus-ring-offset`}],je=({token:e})=>(0,Q.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:20,height:20,marginRight:8,verticalAlign:`middle`,border:`1px solid var(--border-color)`,borderRadius:4,background:`var(--${e})`}}),Me=()=>{let{t:e}=i(),t=t=>e(`docs.theme-palette.${t}`),n=[{value:`"light" | "dark"`,text:t(`axes.modeFixed`)},{value:`"system"`,text:t(`axes.modeSystem`)},{value:`"editorial"`,text:t(`axes.editorial`)},{value:`"tech"`,text:t(`axes.tech`)},{value:`"graphite"`,text:t(`axes.graphite`)},{value:`"cool"`,text:t(`axes.cool`)},{value:`null`,text:t(`axes.none`)}],r=[{name:`THEME_INIT_SCRIPT`,text:t(`helpers.initScript`)},{name:`createThemeInitScript(options?)`,text:t(`helpers.create`)},{name:`parseThemeCookies(cookieHeader, defaults?)`,text:t(`helpers.parseAll`)},{name:`parseThemeCookie(value, fallback?)`,text:t(`helpers.parseTheme`)},{name:`parsePaletteCookie(value, fallback?)`,text:t(`helpers.parsePalette`)},{name:`readCookieValue(cookieHeader, name)`,text:t(`helpers.read`)},{name:`serializeThemeCookie(name, value)`,text:t(`helpers.serialize`)},{name:`isThemeMode(value) / isPalette(value)`,text:t(`helpers.guards`)},{name:`PALETTES`,text:t(`helpers.palettes`)},{name:`THEME_COOKIE_NAME / PALETTE_COOKIE_NAME / THEME_COOKIE_MAX_AGE`,text:t(`helpers.cookieNames`)}],a=[{name:`defaultTheme`,value:`"system"`,text:t(`init.defaultTheme`)},{name:`defaultPalette`,value:`null`,text:t(`init.defaultPalette`)}],o=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`axes`,children:[(0,Q.jsx)(`h2`,{id:`axes`,children:t(`axes.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`axes.text`)}),(0,Q.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`axes.title`),children:(0,Q.jsxs)(T,{className:E.propsTable,children:[(0,Q.jsx)(w,{children:(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`col`,children:t(`axes.value`)}),(0,Q.jsx)(S,{scope:`col`,children:e(`doc.description`)})]})}),(0,Q.jsx)(D,{children:n.map(e=>(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`row`,children:(0,Q.jsx)(`code`,{className:E.propName,children:e.value})}),(0,Q.jsx)(O,{children:e.text})]},e.value))})]})})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`provider`,children:[(0,Q.jsx)(`h2`,{id:`provider`,children:t(`provider.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`provider.text`)}),(0,Q.jsx)(_,{code:be,language:`tsx`}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`provider.config`)}),(0,Q.jsx)(_,{code:xe,language:`tsx`}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`provider.hook`)}),(0,Q.jsx)(_,{code:Se,language:`tsx`})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`applied`,children:[(0,Q.jsx)(`h2`,{id:`applied`,children:t(`applied.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`applied.text`)}),(0,Q.jsx)(_,{code:Ce,language:`html`}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`applied.precedence`)}),(0,Q.jsxs)(`ol`,{className:E.prose,children:[(0,Q.jsx)(`li`,{children:t(`applied.p1`)}),(0,Q.jsx)(`li`,{children:t(`applied.p2`)}),(0,Q.jsx)(`li`,{children:t(`applied.p3`)}),(0,Q.jsx)(`li`,{children:t(`applied.p4`)})]}),(0,Q.jsx)(`p`,{className:E.callout,children:t(`applied.global`)})]})]});return(0,Q.jsxs)(fe,{id:`theme-palette`,demos:$,intro:o,children:[(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`persistence`,children:[(0,Q.jsx)(`h2`,{id:`persistence`,children:t(`persistence.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`persistence.text`)}),(0,Q.jsx)(_,{code:we,language:`tsx`})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`ssr`,children:[(0,Q.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`ssr.text`)}),(0,Q.jsx)(`h3`,{children:t(`ssr.next`)}),(0,Q.jsx)(_,{code:Te,language:`tsx`,title:`app/layout.tsx`}),(0,Q.jsx)(`h3`,{children:t(`ssr.generic`)}),(0,Q.jsx)(_,{code:Ee,language:`tsx`,title:`server.tsx`}),(0,Q.jsx)(`p`,{className:E.callout,children:t(`ssr.hydration`)})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`init-script`,children:[(0,Q.jsx)(`h2`,{id:`init-script`,children:t(`init.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`init.text`)}),(0,Q.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`init.title`),children:(0,Q.jsxs)(T,{className:E.propsTable,children:[(0,Q.jsx)(w,{children:(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`col`,children:t(`init.option`)}),(0,Q.jsx)(S,{scope:`col`,children:t(`init.default`)}),(0,Q.jsx)(S,{scope:`col`,children:e(`doc.description`)})]})}),(0,Q.jsx)(D,{children:a.map(e=>(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`row`,children:(0,Q.jsx)(`code`,{className:E.propName,children:e.name})}),(0,Q.jsx)(O,{children:(0,Q.jsx)(`code`,{className:E.propType,children:e.value})}),(0,Q.jsx)(O,{children:e.text})]},e.name))})]})}),(0,Q.jsx)(_,{code:De,language:`tsx`}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`init.order`)})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`helpers`,children:[(0,Q.jsx)(`h2`,{id:`helpers`,children:t(`helpers.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`helpers.text`)}),(0,Q.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`helpers.title`),children:(0,Q.jsxs)(T,{className:E.propsTable,children:[(0,Q.jsx)(w,{children:(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`col`,children:t(`helpers.name`)}),(0,Q.jsx)(S,{scope:`col`,children:e(`doc.description`)})]})}),(0,Q.jsx)(D,{children:r.map(e=>(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`row`,children:(0,Q.jsx)(`code`,{className:E.propName,children:e.name})}),(0,Q.jsx)(O,{children:e.text})]},e.name))})]})})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`scoped`,children:[(0,Q.jsx)(`h2`,{id:`scoped`,children:t(`scoped.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`scoped.text`)}),(0,Q.jsx)(_,{code:Oe,language:`tsx`})]}),(0,Q.jsxs)(`section`,{className:E.section,"aria-labelledby":`tokens`,children:[(0,Q.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`tokens.text`)}),(0,Q.jsx)(`h3`,{children:t(`tokens.semantic`)}),(0,Q.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.semantic`),children:(0,Q.jsxs)(T,{className:E.propsTable,children:[(0,Q.jsx)(w,{children:(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`col`,children:t(`tokens.variable`)}),(0,Q.jsx)(S,{scope:`col`,children:e(`doc.description`)})]})}),(0,Q.jsx)(D,{children:ke.map(e=>(0,Q.jsxs)(C,{children:[(0,Q.jsxs)(S,{scope:`row`,children:[(0,Q.jsx)(je,{token:e}),(0,Q.jsxs)(`code`,{className:E.propName,children:[`--`,e]})]}),(0,Q.jsx)(O,{children:t(`tokens.items.${e}`)})]},e))})]})}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`tokens.accentRole`)}),(0,Q.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:t(`tokens.scales`)}),(0,Q.jsx)(`p`,{className:E.prose,children:t(`tokens.scalesText`)}),(0,Q.jsx)(`div`,{className:E.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.scales`),children:(0,Q.jsxs)(T,{className:E.propsTable,children:[(0,Q.jsx)(w,{children:(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`col`,children:t(`tokens.group`)}),(0,Q.jsx)(S,{scope:`col`,children:t(`tokens.variables`)}),(0,Q.jsx)(S,{scope:`col`,children:e(`doc.description`)})]})}),(0,Q.jsx)(D,{children:Ae.map(e=>(0,Q.jsxs)(C,{children:[(0,Q.jsx)(S,{scope:`row`,children:t(`tokens.groups.${e.key}.name`)}),(0,Q.jsx)(O,{children:(0,Q.jsx)(`code`,{className:E.propType,children:e.tokens})}),(0,Q.jsx)(O,{children:t(`tokens.groups.${e.key}.text`)})]},e.key))})]})})]})]})}})))()}Ne();export{Me as default};