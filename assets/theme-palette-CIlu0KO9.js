import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CnuDHjq3.js";import{Mn as a,cr as o,en as s,rt as c}from"./angular-preview-CxN7u9Fp.js";import{B as l,R as u,V as d,z as f}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as p}from"./stylingHooks-PqiNJdev.js";import{n as m,t as h}from"./Tag-C1W_tDEL.js";import{n as ee,t as te}from"./Switch-DyiiEE7x.js";import{n as ne,t as g}from"./CodeBlock-C12DCux3.js";import{n as re,t as ie}from"./ConfigProvider-hfZxH_FH.js";import{n as _,r as ae,t as v}from"./ThemeProvider-SQ0AS8YY.js";import{n as y,t as b}from"./themeToggle.module.scss-5xxQn6bi.js";import{i as oe,r as se}from"./Stack-9U3ZPLnH.js";import{c as x,d as S,f as C,i as ce,l as le,o as w,r as T,s as E,u as D}from"./DemoBlock-Bfx9edyv.js";import{l as ue,n as de,t as fe,u as pe}from"./DocPage-CH5Y1w5M.js";var O,k;function A(){return(A=e((()=>{a(),d(),_(),b(),O=n(),k=({showSystem:e=!0,labels:t,className:n,ref:r,...i})=>{let{theme:a,resolvedTheme:o,setTheme:s}=v(),{t:u}=l(),d=e?[`light`,`dark`,`system`]:[`light`,`dark`];return(0,O.jsx)(`div`,{ref:r,className:c(y.group,n),role:`group`,"aria-label":u(`themeToggle.label`,{theme:o}),...i,...p(`theme-toggle`,`root`),children:d.map(e=>(0,O.jsx)(`button`,{type:`button`,className:y.item,"aria-pressed":a===e,onClick:()=>s(e),...p(`theme-toggle`,`item`,{state:a===e?`active`:`inactive`}),children:t?.[e]??u(`themeToggle.${e}`)},e))})}})))()}var j,M;function N(){return(N=e((()=>{a(),d(),_(),b(),j=n(),M=({palettes:e=[...o],showDefault:t=!1,labels:n,className:r,ref:i,...a})=>{let{palette:s,setPalette:u}=v(),{t:d}=l(),f=t?[null,...e]:e;return(0,j.jsx)(`div`,{ref:i,className:c(y.group,r),role:`group`,"aria-label":d(`paletteToggle.label`,{palette:s??d(`paletteToggle.default`)}),...a,...p(`palette-toggle`,`root`),children:f.map(e=>{let t=e??`default`,r=s===e;return(0,j.jsx)(`button`,{type:`button`,className:y.item,"aria-pressed":r,onClick:()=>u(e),...p(`palette-toggle`,`item`,{state:r?`active`:`inactive`}),children:n?.[t]??d(`paletteToggle.${t}`)},t)})})}})))()}function me(){return(0,P.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:12},children:o.flatMap(e=>F.map(t=>{let n=s[e][t];return(0,P.jsxs)(`figure`,{style:{margin:0,padding:14,borderRadius:10,border:`1px solid ${n[`border-color`]}`,background:n[`background-color`],color:n[`text-color`],fontFamily:n[`font-family-sans`]},children:[(0,P.jsxs)(`figcaption`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:10,fontWeight:600},children:[(0,P.jsx)(`span`,{children:e}),(0,P.jsx)(`span`,{style:{color:n[`text-muted-color`]},children:t})]}),(0,P.jsx)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`},children:I.map(e=>(0,P.jsx)(`span`,{title:`--${e}: ${n[e]}`,style:{width:22,height:22,borderRadius:6,background:n[e],border:`1px solid ${n[`border-strong-color`]}`}},e))}),(0,P.jsxs)(`div`,{style:{marginTop:10,padding:`6px 8px`,borderRadius:6,background:n[`surface-subtle-color`],color:n[`text-secondary-color`],fontSize:12},children:[n[`primary-color`],` / `,n[`accent-color`]]})]},`${e}-${t}`)}))})}var P,F,I;function L(){return(L=e((()=>{a(),P=n(),F=[`light`,`dark`],I=[`primary-color`,`accent-color`,`success-color`,`warning-color`,`danger-color`,`info-color`,`border-color`]})))()}function he(){let{resolvedTheme:e,palette:t}=v();return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:16,padding:20,borderRadius:12,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`,fontFamily:`var(--font-family-sans)`},children:[(0,R.jsxs)(oe,{gap:4,wrap:!0,children:[(0,R.jsx)(k,{}),(0,R.jsx)(M,{})]}),(0,R.jsxs)(oe,{gap:4,wrap:!0,children:[(0,R.jsx)(f,{color:`primary`,children:`Primary`}),(0,R.jsx)(f,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,R.jsx)(h,{color:`primary`,children:t??`default`}),(0,R.jsx)(h,{color:`info`,children:e}),(0,R.jsx)(te,{label:`Switch`,defaultChecked:!0})]}),(0,R.jsxs)(`p`,{style:{margin:0,color:`var(--text-muted-color)`},children:[`Theme: `,e,`; palette: `,t??`default`]})]})}function ge(){return(0,R.jsx)(ae,{defaultTheme:`system`,defaultPalette:`editorial`,children:(0,R.jsx)(he,{})})}var R;function z(){return(z=e((()=>{u(),se(),N(),ee(),m(),_(),A(),R=n()})))()}function _e(){let{theme:e,resolvedTheme:t,palette:n}=v(),r=ie(),i=[[`useTheme().theme`,e],[`useTheme().resolvedTheme`,t],[`useTheme().palette`,n??`null`],[`useConfig().mode`,r.mode??`undefined`],[`useConfig().resolvedMode`,r.resolvedMode??`undefined`],[`useConfig().palette`,r.palette??`null`]];return(0,B.jsx)(`dl`,{style:{display:`grid`,gridTemplateColumns:`auto 1fr`,gap:`8px 16px`,margin:0},children:i.map(([e,t])=>(0,B.jsxs)(`div`,{style:{display:`contents`},children:[(0,B.jsx)(`dt`,{children:(0,B.jsx)(`code`,{children:e})}),(0,B.jsx)(`dd`,{style:{margin:0},children:(0,B.jsx)(h,{color:`primary`,children:t})})]},e))})}var B;function V(){return(V=e((()=>{m(),re(),_(),B=n()})))()}var H;function U(){return(U=e((()=>{H=`import { palettes } from "minerva-design";
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
`})))()}var W;function G(){return(G=e((()=>{W=`import {
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
`})))()}var J,Y,X,Z,ve,ye,be,xe,Q,Se,Ce,we,Te,Ee,De;function $(){return($=e((()=>{L(),z(),V(),U(),G(),q(),le(),t(),i(),ne(),de(),ce(),pe(),J=n(),Y=ue(Object.assign({"./demos/palette-swatches.tsx":me,"./demos/toggles.tsx":ge,"./demos/use-theme.tsx":_e}),Object.assign({"./demos/palette-swatches.tsx":H,"./demos/toggles.tsx":W,"./demos/use-theme.tsx":K})),X=`import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
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
</div>`,we=[`surface-subtle-color`,`canvas-color`,`control-color`,`hover-color`,`selected-color`,`text-muted-color`,`accent-color`],Te=[{key:`spacing`,tokens:`--space-0 … --space-24 (--space-0-5, --space-1-5, --space-2-5)`},{key:`radius`,tokens:`--radius-none, --radius-xl, --radius-2xl, --radius-full`},{key:`fontSize`,tokens:`--font-size-xs, -sm, -md, -lg, -xl, -2xl … -6xl`},{key:`fontWeight`,tokens:`--font-weight-regular | medium | semibold | bold, --line-height-tight | base | relaxed`},{key:`fontFamily`,tokens:`--font-family-sans, --font-family-display, --font-family-mono`},{key:`zIndex`,tokens:`--z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast`},{key:`motion`,tokens:`--transition-fast | base | slow, --ease-out, --ease-spring, --ease-in`},{key:`rhythm`,tokens:`--rhythm-section | block | tight, --elevation-flat | subtle | raised | floating`},{key:`focus`,tokens:`--focus-ring-width, --focus-ring-offset`}],Ee=({token:e})=>(0,J.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:20,height:20,marginRight:8,verticalAlign:`middle`,border:`1px solid var(--border-color)`,borderRadius:4,background:`var(--${e})`}}),De=()=>{let{t:e}=r(),t=t=>e(`docs.theme-palette.${t}`),n=[{value:`"light" | "dark"`,text:t(`axes.modeFixed`)},{value:`"system"`,text:t(`axes.modeSystem`)},{value:`"editorial"`,text:t(`axes.editorial`)},{value:`"tech"`,text:t(`axes.tech`)},{value:`"graphite"`,text:t(`axes.graphite`)},{value:`"cool"`,text:t(`axes.cool`)},{value:`null`,text:t(`axes.none`)}],i=[{name:`THEME_INIT_SCRIPT`,text:t(`helpers.initScript`)},{name:`createThemeInitScript(options?)`,text:t(`helpers.create`)},{name:`parseThemeCookies(cookieHeader, defaults?)`,text:t(`helpers.parseAll`)},{name:`parseThemeCookie(value, fallback?)`,text:t(`helpers.parseTheme`)},{name:`parsePaletteCookie(value, fallback?)`,text:t(`helpers.parsePalette`)},{name:`readCookieValue(cookieHeader, name)`,text:t(`helpers.read`)},{name:`serializeThemeCookie(name, value)`,text:t(`helpers.serialize`)},{name:`isThemeMode(value) / isPalette(value)`,text:t(`helpers.guards`)},{name:`PALETTES`,text:t(`helpers.palettes`)},{name:`THEME_COOKIE_NAME / PALETTE_COOKIE_NAME / THEME_COOKIE_MAX_AGE`,text:t(`helpers.cookieNames`)}],a=[{name:`defaultTheme`,value:`"system"`,text:t(`init.defaultTheme`)},{name:`defaultPalette`,value:`null`,text:t(`init.defaultPalette`)}],o=(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`axes`,children:[(0,J.jsx)(`h2`,{id:`axes`,children:t(`axes.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`axes.text`)}),(0,J.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`axes.title`),children:(0,J.jsxs)(C,{className:T.propsTable,children:[(0,J.jsx)(x,{children:(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`col`,children:t(`axes.value`)}),(0,J.jsx)(D,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(S,{children:n.map(e=>(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`row`,children:(0,J.jsx)(`code`,{className:T.propName,children:e.value})}),(0,J.jsx)(E,{children:e.text})]},e.value))})]})})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`provider`,children:[(0,J.jsx)(`h2`,{id:`provider`,children:t(`provider.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`provider.text`)}),(0,J.jsx)(g,{code:X,language:`tsx`}),(0,J.jsx)(`p`,{className:T.prose,children:t(`provider.config`)}),(0,J.jsx)(g,{code:Z,language:`tsx`}),(0,J.jsx)(`p`,{className:T.prose,children:t(`provider.hook`)}),(0,J.jsx)(g,{code:ve,language:`tsx`})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`applied`,children:[(0,J.jsx)(`h2`,{id:`applied`,children:t(`applied.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`applied.text`)}),(0,J.jsx)(g,{code:ye,language:`html`}),(0,J.jsx)(`p`,{className:T.prose,children:t(`applied.precedence`)}),(0,J.jsxs)(`ol`,{className:T.prose,children:[(0,J.jsx)(`li`,{children:t(`applied.p1`)}),(0,J.jsx)(`li`,{children:t(`applied.p2`)}),(0,J.jsx)(`li`,{children:t(`applied.p3`)}),(0,J.jsx)(`li`,{children:t(`applied.p4`)})]}),(0,J.jsx)(`p`,{className:T.callout,children:t(`applied.global`)})]})]});return(0,J.jsxs)(fe,{id:`theme-palette`,demos:Y,intro:o,children:[(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`persistence`,children:[(0,J.jsx)(`h2`,{id:`persistence`,children:t(`persistence.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`persistence.text`)}),(0,J.jsx)(g,{code:be,language:`tsx`})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`ssr`,children:[(0,J.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`ssr.text`)}),(0,J.jsx)(`h3`,{children:t(`ssr.next`)}),(0,J.jsx)(g,{code:xe,language:`tsx`,title:`app/layout.tsx`}),(0,J.jsx)(`h3`,{children:t(`ssr.generic`)}),(0,J.jsx)(g,{code:Q,language:`tsx`,title:`server.tsx`}),(0,J.jsx)(`p`,{className:T.callout,children:t(`ssr.hydration`)})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`init-script`,children:[(0,J.jsx)(`h2`,{id:`init-script`,children:t(`init.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`init.text`)}),(0,J.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`init.title`),children:(0,J.jsxs)(C,{className:T.propsTable,children:[(0,J.jsx)(x,{children:(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`col`,children:t(`init.option`)}),(0,J.jsx)(D,{scope:`col`,children:t(`init.default`)}),(0,J.jsx)(D,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(S,{children:a.map(e=>(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`row`,children:(0,J.jsx)(`code`,{className:T.propName,children:e.name})}),(0,J.jsx)(E,{children:(0,J.jsx)(`code`,{className:T.propType,children:e.value})}),(0,J.jsx)(E,{children:e.text})]},e.name))})]})}),(0,J.jsx)(g,{code:Se,language:`tsx`}),(0,J.jsx)(`p`,{className:T.prose,children:t(`init.order`)})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`helpers`,children:[(0,J.jsx)(`h2`,{id:`helpers`,children:t(`helpers.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`helpers.text`)}),(0,J.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`helpers.title`),children:(0,J.jsxs)(C,{className:T.propsTable,children:[(0,J.jsx)(x,{children:(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`col`,children:t(`helpers.name`)}),(0,J.jsx)(D,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(S,{children:i.map(e=>(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`row`,children:(0,J.jsx)(`code`,{className:T.propName,children:e.name})}),(0,J.jsx)(E,{children:e.text})]},e.name))})]})})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`scoped`,children:[(0,J.jsx)(`h2`,{id:`scoped`,children:t(`scoped.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`scoped.text`)}),(0,J.jsx)(g,{code:Ce,language:`tsx`})]}),(0,J.jsxs)(`section`,{className:T.section,"aria-labelledby":`tokens`,children:[(0,J.jsx)(`h2`,{id:`tokens`,children:t(`tokens.title`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`tokens.text`)}),(0,J.jsx)(`h3`,{children:t(`tokens.semantic`)}),(0,J.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.semantic`),children:(0,J.jsxs)(C,{className:T.propsTable,children:[(0,J.jsx)(x,{children:(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`col`,children:t(`tokens.variable`)}),(0,J.jsx)(D,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(S,{children:we.map(e=>(0,J.jsxs)(w,{children:[(0,J.jsxs)(D,{scope:`row`,children:[(0,J.jsx)(Ee,{token:e}),(0,J.jsxs)(`code`,{className:T.propName,children:[`--`,e]})]}),(0,J.jsx)(E,{children:t(`tokens.items.${e}`)})]},e))})]})}),(0,J.jsx)(`p`,{className:T.prose,children:t(`tokens.accentRole`)}),(0,J.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:t(`tokens.scales`)}),(0,J.jsx)(`p`,{className:T.prose,children:t(`tokens.scalesText`)}),(0,J.jsx)(`div`,{className:T.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`tokens.scales`),children:(0,J.jsxs)(C,{className:T.propsTable,children:[(0,J.jsx)(x,{children:(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`col`,children:t(`tokens.group`)}),(0,J.jsx)(D,{scope:`col`,children:t(`tokens.variables`)}),(0,J.jsx)(D,{scope:`col`,children:e(`doc.description`)})]})}),(0,J.jsx)(S,{children:Te.map(e=>(0,J.jsxs)(w,{children:[(0,J.jsx)(D,{scope:`row`,children:t(`tokens.groups.${e.key}.name`)}),(0,J.jsx)(E,{children:(0,J.jsx)(`code`,{className:T.propType,children:e.tokens})}),(0,J.jsx)(E,{children:t(`tokens.groups.${e.key}.text`)})]},e.key))})]})})]})]})}})))()}$();export{De as default};