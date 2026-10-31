import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{$ as a,It as o,nn as s,ut as c}from"./angular-preview-l4x8c_2r.js";import{B as l,R as u,V as d,z as f}from"./ProgressIndicator-BMZ0rR7D.js";import{a as ee,o as te,t as p}from"./stylingHooks-PqiNJdev.js";import{n as m,t as h}from"./Tag-D6SUzaZT.js";import{n as ne,t as re}from"./Switch-CHbzff3y.js";import{n as ie,t as g}from"./CodeBlock-umVQqAKy.js";import{i as ae,n as oe,r as _,t as se}from"./ConfigProvider-DxH0x8eF.js";import{n as v,t as y}from"./themeToggle.module.scss-5xxQn6bi.js";import{i as b,r as ce}from"./Stack-B3Kr9X_e.js";import{a as x,c as le,d as S,f as C,i as ue,l as w,r as T,s as E,u as D}from"./DemoBlock-DvPmV2UV.js";import{l as de,n as fe,t as pe,u as me}from"./DocPage-BbPSunu1.js";function he({defaultTheme:e,defaultPalette:t,disableStorage:n=!1,locale:r,onThemeChange:i,onPaletteChange:a,children:o}){let s=(0,k.useContext)(te)===null;return(0,A.jsx)(se,{theme:e??(s?`system`:void 0),palette:t,persist:!n,locale:r,onThemeChange:i?e=>{e===`light`||e===`dark`?i(e):(e===`auto`||e===`system`)&&i(`system`)}:void 0,onPaletteChange:a,children:o})}function O(){let e=(0,k.useContext)(ae);if(!e)throw Error(`useTheme must be used within a ThemeProvider (or ConfigProvider)`);let{mode:t,resolvedMode:n,palette:r=null,setTheme:i,setPalette:a}=e,o=(0,k.useCallback)(e=>i?.(e),[i]),s=(0,k.useCallback)(e=>a?.(e),[a]);return(0,k.useMemo)(()=>({theme:t??`system`,resolvedTheme:n??`light`,palette:r,setTheme:o,setPalette:s}),[t,n,r,o,s])}var k,A;function j(){return(j=e((()=>{ee(),_(),k=t(),A=n()})))()}var M,N;function P(){return(P=e((()=>{o(),d(),j(),y(),M=n(),N=({showSystem:e=!0,labels:t,className:n,ref:r,...i})=>{let{theme:a,resolvedTheme:o,setTheme:s}=O(),{t:u}=l(),d=e?[`light`,`dark`,`system`]:[`light`,`dark`];return(0,M.jsx)(`div`,{ref:r,className:c(v.group,n),role:`group`,"aria-label":u(`themeToggle.label`,{theme:o}),...i,...p(`theme-toggle`,`root`),children:d.map(e=>(0,M.jsx)(`button`,{type:`button`,className:v.item,"aria-pressed":a===e,onClick:()=>s(e),...p(`theme-toggle`,`item`,{state:a===e?`active`:`inactive`}),children:t?.[e]??u(`themeToggle.${e}`)},e))})}})))()}var F,I;function L(){return(L=e((()=>{o(),d(),j(),y(),F=n(),I=({palettes:e=[...s],showDefault:t=!1,labels:n,className:r,ref:i,...a})=>{let{palette:o,setPalette:u}=O(),{t:d}=l(),f=t?[null,...e]:e;return(0,F.jsx)(`div`,{ref:i,className:c(v.group,r),role:`group`,"aria-label":d(`paletteToggle.label`,{palette:o??d(`paletteToggle.default`)}),...a,...p(`palette-toggle`,`root`),children:f.map(e=>{let t=e??`default`,r=o===e;return(0,F.jsx)(`button`,{type:`button`,className:v.item,"aria-pressed":r,onClick:()=>u(e),...p(`palette-toggle`,`item`,{state:r?`active`:`inactive`}),children:n?.[t]??d(`paletteToggle.${t}`)},t)})})}})))()}function ge(){return(0,R.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:12},children:s.flatMap(e=>z.map(t=>{let n=a[e][t];return(0,R.jsxs)(`figure`,{style:{margin:0,padding:14,borderRadius:10,border:`1px solid ${n[`border-color`]}`,background:n[`background-color`],color:n[`text-color`],fontFamily:n[`font-family-sans`]},children:[(0,R.jsxs)(`figcaption`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:10,fontWeight:600},children:[(0,R.jsx)(`span`,{children:e}),(0,R.jsx)(`span`,{style:{color:n[`text-muted-color`]},children:t})]}),(0,R.jsx)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`},children:B.map(e=>(0,R.jsx)(`span`,{title:`--${e}: ${n[e]}`,style:{width:22,height:22,borderRadius:6,background:n[e],border:`1px solid ${n[`border-strong-color`]}`}},e))}),(0,R.jsxs)(`div`,{style:{marginTop:10,padding:`6px 8px`,borderRadius:6,background:n[`surface-subtle-color`],color:n[`text-secondary-color`],fontSize:12},children:[n[`primary-color`],` / `,n[`accent-color`]]})]},`${e}-${t}`)}))})}var R,z,B;function V(){return(V=e((()=>{o(),R=n(),z=[`light`,`dark`],B=[`primary-color`,`accent-color`,`success-color`,`warning-color`,`danger-color`,`info-color`,`border-color`]})))()}function _e(){let{resolvedTheme:e,palette:t}=O();return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:16,padding:20,borderRadius:12,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`,fontFamily:`var(--font-family-sans)`},children:[(0,H.jsxs)(b,{gap:4,wrap:!0,children:[(0,H.jsx)(N,{}),(0,H.jsx)(I,{})]}),(0,H.jsxs)(b,{gap:4,wrap:!0,children:[(0,H.jsx)(f,{color:`primary`,children:`Primary`}),(0,H.jsx)(f,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,H.jsx)(h,{color:`primary`,children:t??`default`}),(0,H.jsx)(h,{color:`info`,children:e}),(0,H.jsx)(re,{label:`Switch`,defaultChecked:!0})]}),(0,H.jsxs)(`p`,{style:{margin:0,color:`var(--text-muted-color)`},children:[`Theme: `,e,`; palette: `,t??`default`]})]})}function ve(){return(0,H.jsx)(he,{defaultTheme:`system`,defaultPalette:`editorial`,children:(0,H.jsx)(_e,{})})}var H;function U(){return(U=e((()=>{u(),ce(),L(),ne(),m(),j(),P(),H=n()})))()}function ye(){let{theme:e,resolvedTheme:t,palette:n}=O(),r=oe(),i=[[`useTheme().theme`,e],[`useTheme().resolvedTheme`,t],[`useTheme().palette`,n??`null`],[`useConfig().mode`,r.mode??`undefined`],[`useConfig().resolvedMode`,r.resolvedMode??`undefined`],[`useConfig().palette`,r.palette??`null`]];return(0,W.jsx)(`dl`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,gap:`8px 16px`,margin:0},children:i.map(([e,t])=>(0,W.jsxs)(`div`,{style:{display:`contents`},children:[(0,W.jsx)(`dt`,{children:(0,W.jsx)(`code`,{children:e})}),(0,W.jsx)(`dd`,{style:{margin:0},children:(0,W.jsx)(h,{color:`primary`,children:t})})]},e))})}var W;function G(){return(G=e((()=>{m(),_(),j(),W=n()})))()}var K;function q(){return(q=e((()=>{K=`import { palettes } from "minerva-design";
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
`})))()}var be;function J(){return(J=e((()=>{be=`import {
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
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { Tag, useConfig, useTheme } from "minerva-design";

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
`})))()}var Z,Q,$,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me;function Ne(){return(Ne=e((()=>{V(),U(),G(),q(),J(),X(),le(),t(),i(),ie(),fe(),ue(),me(),Z=n(),Q=de(Object.assign({"./demos/palette-swatches.tsx":ge,"./demos/toggles.tsx":ve,"./demos/use-theme.tsx":ye}),Object.assign({"./demos/palette-swatches.tsx":K,"./demos/toggles.tsx":be,"./demos/use-theme.tsx":Y})),$=`import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
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
</div>`,ke=[`surface-subtle-color`,`canvas-color`,`control-color`,`hover-color`,`selected-color`,`text-muted-color`,`accent-color`],Ae=[{key:`spacing`,tokens:`--space-0 … --space-24 (--space-0-5, --space-1-5, --space-2-5)`},{key:`radius`,tokens:`--radius-none, --radius-xl, --radius-2xl, --radius-full`},{key:`fontSize`,tokens:`--font-size-xs, -sm, -md, -lg, -xl, -2xl … -6xl`},{key:`fontWeight`,tokens:`--font-weight-regular | medium | semibold | bold, --line-height-tight | base | relaxed`},{key:`fontFamily`,tokens:`--font-family-sans, --font-family-display, --font-family-mono`},{key:`zIndex`,tokens:`--z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast`},{key:`motion`,tokens:`--transition-fast | base | slow, --ease-out, --ease-spring, --ease-in`},{key:`rhythm`,tokens:`--rhythm-section | block | tight, --elevation-flat | subtle | raised | floating`},{key:`focus`,tokens:`--focus-ring-width, --focus-ring-offset`}],je=({token:e})=>(0,Z.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:20,height:20,marginRight:8,verticalAlign:`middle`,border:`1px solid var(--border-color)`,borderRadius:4,background:`var(--${e})`}}),Me=()=>{let{t:e}=r(),t=t=>e(`docs.theme-palette.${t}`),n=[{value:`"light" | "dark"`,text:t(`axes.modeFixed`)},{value:`"system"`,text:t(`axes.modeSystem`)},{value:`"editorial"`,text:t(`axes.editorial`)},{value:`"tech"`,text:t(`axes.tech`)},{value:`"graphite"`,text:t(`axes.graphite`)},{value:`"cool"`,text:t(`axes.cool`)},{value:`null`,text:t(`axes.none`)}],i=[{name:`THEME_INIT_SCRIPT`,text:t(`helpers.initScript`)},{name:`createThemeInitScript(options?)`,text:t(`helpers.create`)},{name:`parseThemeCookies(cookieHeader, defaults?)`,text:t(`helpers.parseAll`)},{name:`parseThemeCookie(value, fallback?)`,text:t(`helpers.parseTheme`)},{name:`parsePaletteCookie(value, fallback?)`,text:t(`helpers.parsePalette`)},{name:`readCookieValue(cookieHeader, name)`,text:t(`helpers.read`)},{name:`serializeThemeCookie(name, value)`,text:t(`helpers.serialize`)},{name:`isThemeMode(value) / isPalette(value)`,text:t(`helpers.guards`)},{name:`PALETTES`,text:t(`helpers.palettes`)},{name:`THEME_COOKIE_NAME / PALETTE_COOKIE_NAME / THEME_COOKIE_MAX_AGE`,text:t(`helpers.cookieNames`)}],a=[{name:`defaultTheme`,value:`"system"`,text:t(`init.defaultTheme`)},{name:`defaultPalette`,value:`null`,text:t(`init.defaultPalette`)}],o=(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`axes`,children:[(0,Z.jsx)(`h2`,{id:`axes`,children:t(`axes.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`axes.text`)}),(0,Z.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`axes.title`),children:(0,Z.jsxs)(w,{className:T.propsTable,children:[(0,Z.jsx)(C,{children:(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`col`,children:t(`axes.value`)}),(0,Z.jsx)(x,{scope:`col`,children:e(`doc.description`)})]})}),(0,Z.jsx)(E,{children:n.map(e=>(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`row`,children:(0,Z.jsx)(`code`,{className:T.propName,children:e.value})}),(0,Z.jsx)(D,{children:e.text})]},e.value))})]})})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`provider`,children:[(0,Z.jsx)(`h2`,{id:`provider`,children:t(`provider.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`provider.text`)}),(0,Z.jsx)(g,{code:$,language:`tsx`}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`provider.config`)}),(0,Z.jsx)(g,{code:xe,language:`tsx`}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`provider.hook`)}),(0,Z.jsx)(g,{code:Se,language:`tsx`})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`applied`,children:[(0,Z.jsx)(`h2`,{id:`applied`,children:t(`applied.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`applied.text`)}),(0,Z.jsx)(g,{code:Ce,language:`html`}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`applied.precedence`)}),(0,Z.jsxs)(`ol`,{className:T.prose,children:[(0,Z.jsx)(`li`,{children:t(`applied.p1`)}),(0,Z.jsx)(`li`,{children:t(`applied.p2`)}),(0,Z.jsx)(`li`,{children:t(`applied.p3`)}),(0,Z.jsx)(`li`,{children:t(`applied.p4`)})]}),(0,Z.jsx)(`p`,{className:T.callout,children:t(`applied.global`)})]})]});return(0,Z.jsxs)(pe,{id:`theme-palette`,demos:Q,intro:o,children:[(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`persistence`,children:[(0,Z.jsx)(`h2`,{id:`persistence`,children:t(`persistence.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`persistence.text`)}),(0,Z.jsx)(g,{code:we,language:`tsx`})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`ssr`,children:[(0,Z.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`ssr.text`)}),(0,Z.jsx)(`h3`,{children:t(`ssr.next`)}),(0,Z.jsx)(g,{code:Te,language:`tsx`,title:`app/layout.tsx`}),(0,Z.jsx)(`h3`,{children:t(`ssr.generic`)}),(0,Z.jsx)(g,{code:Ee,language:`tsx`,title:`server.tsx`}),(0,Z.jsx)(`p`,{className:T.callout,children:t(`ssr.hydration`)})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`init-script`,children:[(0,Z.jsx)(`h2`,{id:`init-script`,children:t(`init.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`init.text`)}),(0,Z.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`init.title`),children:(0,Z.jsxs)(w,{className:T.propsTable,children:[(0,Z.jsx)(C,{children:(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`col`,children:t(`init.option`)}),(0,Z.jsx)(x,{scope:`col`,children:t(`init.default`)}),(0,Z.jsx)(x,{scope:`col`,children:e(`doc.description`)})]})}),(0,Z.jsx)(E,{children:a.map(e=>(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`row`,children:(0,Z.jsx)(`code`,{className:T.propName,children:e.name})}),(0,Z.jsx)(D,{children:(0,Z.jsx)(`code`,{className:T.propType,children:e.value})}),(0,Z.jsx)(D,{children:e.text})]},e.name))})]})}),(0,Z.jsx)(g,{code:De,language:`tsx`}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`init.order`)})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`helpers`,children:[(0,Z.jsx)(`h2`,{id:`helpers`,children:t(`helpers.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`helpers.text`)}),(0,Z.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`helpers.title`),children:(0,Z.jsxs)(w,{className:T.propsTable,children:[(0,Z.jsx)(C,{children:(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`col`,children:t(`helpers.name`)}),(0,Z.jsx)(x,{scope:`col`,children:e(`doc.description`)})]})}),(0,Z.jsx)(E,{children:i.map(e=>(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`row`,children:(0,Z.jsx)(`code`,{className:T.propName,children:e.name})}),(0,Z.jsx)(D,{children:e.text})]},e.name))})]})})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`scoped`,children:[(0,Z.jsx)(`h2`,{id:`scoped`,children:t(`scoped.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`scoped.text`)}),(0,Z.jsx)(g,{code:Oe,language:`tsx`})]}),(0,Z.jsxs)(`section`,{className:T.section,"aria-labelledby":`tokens`,children:[(0,Z.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`tokens.text`)}),(0,Z.jsx)(`h3`,{children:t(`tokens.semantic`)}),(0,Z.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.semantic`),children:(0,Z.jsxs)(w,{className:T.propsTable,children:[(0,Z.jsx)(C,{children:(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`col`,children:t(`tokens.variable`)}),(0,Z.jsx)(x,{scope:`col`,children:e(`doc.description`)})]})}),(0,Z.jsx)(E,{children:ke.map(e=>(0,Z.jsxs)(S,{children:[(0,Z.jsxs)(x,{scope:`row`,children:[(0,Z.jsx)(je,{token:e}),(0,Z.jsxs)(`code`,{className:T.propName,children:[`--`,e]})]}),(0,Z.jsx)(D,{children:t(`tokens.items.${e}`)})]},e))})]})}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`tokens.accentRole`)}),(0,Z.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:t(`tokens.scales`)}),(0,Z.jsx)(`p`,{className:T.prose,children:t(`tokens.scalesText`)}),(0,Z.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.scales`),children:(0,Z.jsxs)(w,{className:T.propsTable,children:[(0,Z.jsx)(C,{children:(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`col`,children:t(`tokens.group`)}),(0,Z.jsx)(x,{scope:`col`,children:t(`tokens.variables`)}),(0,Z.jsx)(x,{scope:`col`,children:e(`doc.description`)})]})}),(0,Z.jsx)(E,{children:Ae.map(e=>(0,Z.jsxs)(S,{children:[(0,Z.jsx)(x,{scope:`row`,children:t(`tokens.groups.${e.key}.name`)}),(0,Z.jsx)(D,{children:(0,Z.jsx)(`code`,{className:T.propType,children:e.tokens})}),(0,Z.jsx)(D,{children:t(`tokens.groups.${e.key}.text`)})]},e.key))})]})})]})]})}})))()}Ne();export{Me as default};