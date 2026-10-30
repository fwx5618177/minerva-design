import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,c as i,d as a,f as o,i as s,l as c,r as l,s as u,u as d}from"./DemoBlock-BJ0_y9F8.js";import{n as ee,t as f}from"./useTranslation-BzoVi22c.js";import{$ as te,It as p,nn as m,ut as h}from"./angular-preview-l4x8c_2r.js";import{B as g,H as _,K as ne,R as re,U as v,q as ie,z as ae}from"./ProgressIndicator-BhPa7d9i.js";import{n as y,t as b}from"./Tag-vE6Ajh98.js";import{n as oe,t as se}from"./Switch-DyBWzlhy.js";import{n as ce,t as x}from"./CodeBlock-BXt_Axjy.js";import{i as le,n as ue,r as S,t as de}from"./ConfigProvider-DZkhWQzR.js";import{n as C,t as w}from"./themeToggle.module.scss-5xxQn6bi.js";import{i as T,r as fe}from"./Stack-CiM4m4jI.js";import{l as pe,n as me,t as he,u as ge}from"./DocPage-B2iACtLP.js";function _e({defaultTheme:e,defaultPalette:t,disableStorage:n=!1,locale:r,onThemeChange:i,onPaletteChange:a,children:o}){let s=(0,D.useContext)(ie)===null;return(0,O.jsx)(de,{theme:e??(s?`system`:void 0),palette:t,persist:!n,locale:r,onThemeChange:i?e=>{e===`light`||e===`dark`?i(e):(e===`auto`||e===`system`)&&i(`system`)}:void 0,onPaletteChange:a,children:o})}function E(){let e=(0,D.useContext)(le);if(!e)throw Error(`useTheme must be used within a ThemeProvider (or ConfigProvider)`);let{mode:t,resolvedMode:n,palette:r=null,setTheme:i,setPalette:a}=e,o=(0,D.useCallback)(e=>i?.(e),[i]),s=(0,D.useCallback)(e=>a?.(e),[a]);return(0,D.useMemo)(()=>({theme:t??`system`,resolvedTheme:n??`light`,palette:r,setTheme:o,setPalette:s}),[t,n,r,o,s])}var D,O;function k(){return(k=e((()=>{ne(),S(),D=t(),O=n()})))()}var A,j;function M(){return(M=e((()=>{p(),v(),k(),w(),A=n(),j=({showSystem:e=!0,labels:t,className:n,ref:r,...i})=>{let{theme:a,resolvedTheme:o,setTheme:s}=E(),{t:c}=_(),l=e?[`light`,`dark`,`system`]:[`light`,`dark`];return(0,A.jsx)(`div`,{ref:r,className:h(C.group,n),role:`group`,"aria-label":c(`themeToggle.label`,{theme:o}),...i,...g(`theme-toggle`,`root`),children:l.map(e=>(0,A.jsx)(`button`,{type:`button`,className:C.item,"aria-pressed":a===e,onClick:()=>s(e),...g(`theme-toggle`,`item`,{state:a===e?`active`:`inactive`}),children:t?.[e]??c(`themeToggle.${e}`)},e))})}})))()}var N,P;function F(){return(F=e((()=>{p(),v(),k(),w(),N=n(),P=({palettes:e=[...m],showDefault:t=!1,labels:n,className:r,ref:i,...a})=>{let{palette:o,setPalette:s}=E(),{t:c}=_(),l=t?[null,...e]:e;return(0,N.jsx)(`div`,{ref:i,className:h(C.group,r),role:`group`,"aria-label":c(`paletteToggle.label`,{palette:o??c(`paletteToggle.default`)}),...a,...g(`palette-toggle`,`root`),children:l.map(e=>{let t=e??`default`,r=o===e;return(0,N.jsx)(`button`,{type:`button`,className:C.item,"aria-pressed":r,onClick:()=>s(e),...g(`palette-toggle`,`item`,{state:r?`active`:`inactive`}),children:n?.[t]??c(`paletteToggle.${t}`)},t)})})}})))()}function ve(){return(0,I.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:12},children:m.flatMap(e=>L.map(t=>{let n=te[e][t];return(0,I.jsxs)(`figure`,{style:{margin:0,padding:14,borderRadius:10,border:`1px solid ${n[`border-color`]}`,background:n[`background-color`],color:n[`text-color`],fontFamily:n[`font-family-sans`]},children:[(0,I.jsxs)(`figcaption`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:10,fontWeight:600},children:[(0,I.jsx)(`span`,{children:e}),(0,I.jsx)(`span`,{style:{color:n[`text-muted-color`]},children:t})]}),(0,I.jsx)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`},children:R.map(e=>(0,I.jsx)(`span`,{title:`--${e}: ${n[e]}`,style:{width:22,height:22,borderRadius:6,background:n[e],border:`1px solid ${n[`border-strong-color`]}`}},e))}),(0,I.jsxs)(`div`,{style:{marginTop:10,padding:`6px 8px`,borderRadius:6,background:n[`surface-subtle-color`],color:n[`text-secondary-color`],fontSize:12},children:[n[`primary-color`],` / `,n[`accent-color`]]})]},`${e}-${t}`)}))})}var I,L,R;function z(){return(z=e((()=>{p(),I=n(),L=[`light`,`dark`],R=[`primary-color`,`accent-color`,`success-color`,`warning-color`,`danger-color`,`info-color`,`border-color`]})))()}function ye(){let{resolvedTheme:e,palette:t}=E();return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:16,padding:20,borderRadius:12,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`,fontFamily:`var(--font-family-sans)`},children:[(0,B.jsxs)(T,{gap:4,wrap:!0,children:[(0,B.jsx)(j,{}),(0,B.jsx)(P,{})]}),(0,B.jsxs)(T,{gap:4,wrap:!0,children:[(0,B.jsx)(ae,{color:`primary`,children:`Primary`}),(0,B.jsx)(ae,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,B.jsx)(b,{color:`primary`,children:t??`default`}),(0,B.jsx)(b,{color:`info`,children:e}),(0,B.jsx)(se,{label:`Switch`,defaultChecked:!0})]}),(0,B.jsxs)(`p`,{style:{margin:0,color:`var(--text-muted-color)`},children:[`Theme: `,e,`; palette: `,t??`default`]})]})}function be(){return(0,B.jsx)(_e,{defaultTheme:`system`,defaultPalette:`editorial`,children:(0,B.jsx)(ye,{})})}var B;function V(){return(V=e((()=>{re(),fe(),F(),oe(),y(),k(),M(),B=n()})))()}function xe(){let{theme:e,resolvedTheme:t,palette:n}=E(),r=ue(),i=[[`useTheme().theme`,e],[`useTheme().resolvedTheme`,t],[`useTheme().palette`,n??`null`],[`useConfig().mode`,r.mode??`undefined`],[`useConfig().resolvedMode`,r.resolvedMode??`undefined`],[`useConfig().palette`,r.palette??`null`]];return(0,H.jsx)(`dl`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,gap:`8px 16px`,margin:0},children:i.map(([e,t])=>(0,H.jsxs)(`div`,{style:{display:`contents`},children:[(0,H.jsx)(`dt`,{children:(0,H.jsx)(`code`,{children:e})}),(0,H.jsx)(`dd`,{style:{margin:0},children:(0,H.jsx)(b,{color:`primary`,children:t})})]},e))})}var H;function U(){return(U=e((()=>{y(),S(),k(),H=n()})))()}var W;function G(){return(G=e((()=>{W=`import { palettes } from "minerva-design";
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
`})))()}var K;function q(){return(q=e((()=>{K=`import {
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Tag, useConfig, useTheme } from "minerva-design";

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
`})))()}var X,Z,Q,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne;function $(){return($=e((()=>{z(),V(),U(),G(),q(),Y(),i(),t(),f(),ce(),me(),s(),ge(),X=n(),Z=pe(Object.assign({"./demos/palette-swatches.tsx":ve,"./demos/toggles.tsx":be,"./demos/use-theme.tsx":xe}),Object.assign({"./demos/palette-swatches.tsx":W,"./demos/toggles.tsx":K,"./demos/use-theme.tsx":J})),Q=`import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
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
}`,Se=`import { ConfigProvider, ToastProvider, toast } from "minerva-design";

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
</ConfigProvider>;`,Ce=`import { Button, useTheme } from "minerva-design";

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
}`,we=`<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">`,Te=`import {
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
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));`,Ee=`// app/layout.tsx: a Server Component (no "use client")
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
}`,De=`// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
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
});`,Oe=`import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});`,ke=`// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>`,Ae=[`surface-subtle-color`,`canvas-color`,`control-color`,`hover-color`,`selected-color`,`text-muted-color`,`accent-color`],je=[{key:`spacing`,tokens:`--space-0 … --space-24 (--space-0-5, --space-1-5, --space-2-5)`},{key:`radius`,tokens:`--radius-none, --radius-xl, --radius-2xl, --radius-full`},{key:`fontSize`,tokens:`--font-size-xs, -sm, -md, -lg, -xl, -2xl … -6xl`},{key:`fontWeight`,tokens:`--font-weight-regular | medium | semibold | bold, --line-height-tight | base | relaxed`},{key:`fontFamily`,tokens:`--font-family-sans, --font-family-display, --font-family-mono`},{key:`zIndex`,tokens:`--z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast`},{key:`motion`,tokens:`--transition-fast | base | slow, --ease-out, --ease-spring, --ease-in`},{key:`rhythm`,tokens:`--rhythm-section | block | tight, --elevation-flat | subtle | raised | floating`},{key:`focus`,tokens:`--focus-ring-width, --focus-ring-offset`}],Me=({token:e})=>(0,X.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:20,height:20,marginRight:8,verticalAlign:`middle`,border:`1px solid var(--border-color)`,borderRadius:4,background:`var(--${e})`}}),Ne=()=>{let{t:e}=ee(),t=t=>e(`docs.theme-palette.${t}`),n=[{value:`"light" | "dark"`,text:t(`axes.modeFixed`)},{value:`"system"`,text:t(`axes.modeSystem`)},{value:`"editorial"`,text:t(`axes.editorial`)},{value:`"tech"`,text:t(`axes.tech`)},{value:`"graphite"`,text:t(`axes.graphite`)},{value:`"cool"`,text:t(`axes.cool`)},{value:`null`,text:t(`axes.none`)}],i=[{name:`THEME_INIT_SCRIPT`,text:t(`helpers.initScript`)},{name:`createThemeInitScript(options?)`,text:t(`helpers.create`)},{name:`parseThemeCookies(cookieHeader, defaults?)`,text:t(`helpers.parseAll`)},{name:`parseThemeCookie(value, fallback?)`,text:t(`helpers.parseTheme`)},{name:`parsePaletteCookie(value, fallback?)`,text:t(`helpers.parsePalette`)},{name:`readCookieValue(cookieHeader, name)`,text:t(`helpers.read`)},{name:`serializeThemeCookie(name, value)`,text:t(`helpers.serialize`)},{name:`isThemeMode(value) / isPalette(value)`,text:t(`helpers.guards`)},{name:`PALETTES`,text:t(`helpers.palettes`)},{name:`THEME_COOKIE_NAME / PALETTE_COOKIE_NAME / THEME_COOKIE_MAX_AGE`,text:t(`helpers.cookieNames`)}],s=[{name:`defaultTheme`,value:`"system"`,text:t(`init.defaultTheme`)},{name:`defaultPalette`,value:`null`,text:t(`init.defaultPalette`)}],f=(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`axes`,children:[(0,X.jsx)(`h2`,{id:`axes`,children:t(`axes.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`axes.text`)}),(0,X.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`axes.title`),children:(0,X.jsxs)(c,{className:l.propsTable,children:[(0,X.jsx)(o,{children:(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`col`,children:t(`axes.value`)}),(0,X.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,X.jsx)(u,{children:n.map(e=>(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`row`,children:(0,X.jsx)(`code`,{className:l.propName,children:e.value})}),(0,X.jsx)(d,{children:e.text})]},e.value))})]})})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`provider`,children:[(0,X.jsx)(`h2`,{id:`provider`,children:t(`provider.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`provider.text`)}),(0,X.jsx)(x,{code:Q,language:`tsx`}),(0,X.jsx)(`p`,{className:l.prose,children:t(`provider.config`)}),(0,X.jsx)(x,{code:Se,language:`tsx`}),(0,X.jsx)(`p`,{className:l.prose,children:t(`provider.hook`)}),(0,X.jsx)(x,{code:Ce,language:`tsx`})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`applied`,children:[(0,X.jsx)(`h2`,{id:`applied`,children:t(`applied.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`applied.text`)}),(0,X.jsx)(x,{code:we,language:`html`}),(0,X.jsx)(`p`,{className:l.prose,children:t(`applied.precedence`)}),(0,X.jsxs)(`ol`,{className:l.prose,children:[(0,X.jsx)(`li`,{children:t(`applied.p1`)}),(0,X.jsx)(`li`,{children:t(`applied.p2`)}),(0,X.jsx)(`li`,{children:t(`applied.p3`)}),(0,X.jsx)(`li`,{children:t(`applied.p4`)})]}),(0,X.jsx)(`p`,{className:l.callout,children:t(`applied.global`)})]})]});return(0,X.jsxs)(he,{id:`theme-palette`,demos:Z,intro:f,children:[(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`persistence`,children:[(0,X.jsx)(`h2`,{id:`persistence`,children:t(`persistence.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`persistence.text`)}),(0,X.jsx)(x,{code:Te,language:`tsx`})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`ssr`,children:[(0,X.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`ssr.text`)}),(0,X.jsx)(`h3`,{children:t(`ssr.next`)}),(0,X.jsx)(x,{code:Ee,language:`tsx`,title:`app/layout.tsx`}),(0,X.jsx)(`h3`,{children:t(`ssr.generic`)}),(0,X.jsx)(x,{code:De,language:`tsx`,title:`server.tsx`}),(0,X.jsx)(`p`,{className:l.callout,children:t(`ssr.hydration`)})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`init-script`,children:[(0,X.jsx)(`h2`,{id:`init-script`,children:t(`init.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`init.text`)}),(0,X.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`init.title`),children:(0,X.jsxs)(c,{className:l.propsTable,children:[(0,X.jsx)(o,{children:(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`col`,children:t(`init.option`)}),(0,X.jsx)(r,{scope:`col`,children:t(`init.default`)}),(0,X.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,X.jsx)(u,{children:s.map(e=>(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`row`,children:(0,X.jsx)(`code`,{className:l.propName,children:e.name})}),(0,X.jsx)(d,{children:(0,X.jsx)(`code`,{className:l.propType,children:e.value})}),(0,X.jsx)(d,{children:e.text})]},e.name))})]})}),(0,X.jsx)(x,{code:Oe,language:`tsx`}),(0,X.jsx)(`p`,{className:l.prose,children:t(`init.order`)})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`helpers`,children:[(0,X.jsx)(`h2`,{id:`helpers`,children:t(`helpers.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`helpers.text`)}),(0,X.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`helpers.title`),children:(0,X.jsxs)(c,{className:l.propsTable,children:[(0,X.jsx)(o,{children:(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`col`,children:t(`helpers.name`)}),(0,X.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,X.jsx)(u,{children:i.map(e=>(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`row`,children:(0,X.jsx)(`code`,{className:l.propName,children:e.name})}),(0,X.jsx)(d,{children:e.text})]},e.name))})]})})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`scoped`,children:[(0,X.jsx)(`h2`,{id:`scoped`,children:t(`scoped.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`scoped.text`)}),(0,X.jsx)(x,{code:ke,language:`tsx`})]}),(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`tokens`,children:[(0,X.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`tokens.text`)}),(0,X.jsx)(`h3`,{children:t(`tokens.semantic`)}),(0,X.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.semantic`),children:(0,X.jsxs)(c,{className:l.propsTable,children:[(0,X.jsx)(o,{children:(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`col`,children:t(`tokens.variable`)}),(0,X.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,X.jsx)(u,{children:Ae.map(e=>(0,X.jsxs)(a,{children:[(0,X.jsxs)(r,{scope:`row`,children:[(0,X.jsx)(Me,{token:e}),(0,X.jsxs)(`code`,{className:l.propName,children:[`--`,e]})]}),(0,X.jsx)(d,{children:t(`tokens.items.${e}`)})]},e))})]})}),(0,X.jsx)(`p`,{className:l.prose,children:t(`tokens.accentRole`)}),(0,X.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:t(`tokens.scales`)}),(0,X.jsx)(`p`,{className:l.prose,children:t(`tokens.scalesText`)}),(0,X.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.scales`),children:(0,X.jsxs)(c,{className:l.propsTable,children:[(0,X.jsx)(o,{children:(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`col`,children:t(`tokens.group`)}),(0,X.jsx)(r,{scope:`col`,children:t(`tokens.variables`)}),(0,X.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,X.jsx)(u,{children:je.map(e=>(0,X.jsxs)(a,{children:[(0,X.jsx)(r,{scope:`row`,children:t(`tokens.groups.${e.key}.name`)}),(0,X.jsx)(d,{children:(0,X.jsx)(`code`,{className:l.propType,children:e.tokens})}),(0,X.jsx)(d,{children:t(`tokens.groups.${e.key}.text`)})]},e.key))})]})})]})]})}})))()}$();export{Ne as default};