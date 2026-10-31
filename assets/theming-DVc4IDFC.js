import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{n as s,t as c}from"./Checkbox-Xe4Vj-fa.js";import{n as ee,t as te}from"./Input-LfOOMgLE.js";import{n as ne,t as re}from"./Alert-DYH-oD8D.js";import{n as l,t as u}from"./Tag-D6SUzaZT.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{n as ie,t as p}from"./CodeBlock-DoGcue8j.js";import{i as m,n as h,r as g}from"./Stack-B3Kr9X_e.js";import{a as _,c as v,d as y,f as b,i as ae,l as x,r as S,s as C,u as w}from"./DemoBlock-CrPVu7R1.js";import{a as oe,i as T,n as E}from"./ThemeModeContext-pG_f3xNq.js";import{a as D,c as O}from"./PropsTable-DRWrw0UR.js";import{l as k,n as A,t as se,u as ce}from"./DocPage-BdPOW9nQ.js";function le(){let[e,t]=(0,j.useState)(`violet`);return(0,M.jsxs)(h,{gap:4,align:`start`,children:[(0,M.jsx)(`div`,{role:`group`,"aria-label":`Brand color`,style:{display:`flex`,gap:8},children:Object.keys(N).map(n=>(0,M.jsx)(o,{size:`small`,color:n===e?`primary`:`neutral`,variant:n===e?`solid`:`outline`,"aria-pressed":n===e,onClick:()=>t(n),children:n},n))}),(0,M.jsx)(`div`,{style:P(N[e]),children:(0,M.jsxs)(m,{gap:4,wrap:!0,children:[(0,M.jsx)(o,{color:`primary`,children:`Scoped primary`}),(0,M.jsx)(f,{label:`Switch`,defaultChecked:!0}),(0,M.jsx)(c,{label:`Checkbox`,defaultChecked:!0}),(0,M.jsx)(u,{color:`primary`,children:`Tag`})]})})]})}var j,M,N,P;function F(){return(F=e((()=>{j=t(),a(),s(),g(),d(),l(),M=n(),N={violet:`#7c3aed`,teal:`#0d9488`,orange:`#c2410c`},P=e=>({"--primary-color":e,"--primary-color-hover":`color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))`,"--primary-color-active":`color-mix(in srgb, var(--primary-color) 72%, var(--foreground-color))`,"--primary-color-subtle":`color-mix(in srgb, var(--primary-color) 12%, var(--surface-color))`,"--primary-color-text":`color-mix(in srgb, var(--primary-color) 80%, var(--foreground-color))`,"--focus-ring-color":`color-mix(in srgb, var(--primary-color) 45%, transparent)`,padding:16,borderRadius:8,border:`1px dashed var(--border-color)`})})))()}var I;function L(){return(L=e((()=>{I=`import type React from "react";
import { useState } from "react";
import { Button, Checkbox, HStack, Switch, Tag, VStack } from "minerva-design";

const BRANDS = {
  violet: "#7c3aed",
  teal: "#0d9488",
  orange: "#c2410c",
};

type Brand = keyof typeof BRANDS;

// Theme tokens are plain CSS custom properties, so they can be overridden
// for a single subtree. Derived tokens (hover, subtle, focus ring...) are
// computed on :root, so redeclare them to make them follow the new value.
const brandStyle = (primary: string) =>
  ({
    "--primary-color": primary,
    "--primary-color-hover":
      "color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))",
    "--primary-color-active":
      "color-mix(in srgb, var(--primary-color) 72%, var(--foreground-color))",
    "--primary-color-subtle":
      "color-mix(in srgb, var(--primary-color) 12%, var(--surface-color))",
    "--primary-color-text":
      "color-mix(in srgb, var(--primary-color) 80%, var(--foreground-color))",
    "--focus-ring-color":
      "color-mix(in srgb, var(--primary-color) 45%, transparent)",
    padding: 16,
    borderRadius: 8,
    border: "1px dashed var(--border-color)",
  }) as React.CSSProperties;

export default function ScopedThemeDemo() {
  const [brand, setBrand] = useState<Brand>("violet");

  return (
    <VStack gap={4} align="start">
      <div
        role="group"
        aria-label="Brand color"
        style={{ display: "flex", gap: 8 }}
      >
        {(Object.keys(BRANDS) as Brand[]).map((name) => (
          <Button
            key={name}
            size="small"
            color={name === brand ? "primary" : "neutral"}
            variant={name === brand ? "solid" : "outline"}
            aria-pressed={name === brand}
            onClick={() => setBrand(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div style={brandStyle(BRANDS[brand])}>
        <HStack gap={4} wrap>
          <Button color="primary">Scoped primary</Button>
          <Switch label="Switch" defaultChecked />
          <Checkbox label="Checkbox" defaultChecked />
          <Tag color="primary">Tag</Tag>
        </HStack>
      </div>
    </VStack>
  );
}
`})))()}var R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{F(),L(),v(),t(),i(),ne(),a(),s(),g(),te(),d(),l(),ie(),A(),ae(),ce(),O(),T(),R=n(),z=k(Object.assign({"./demos/scoped-theme.tsx":le}),Object.assign({"./demos/scoped-theme.tsx":I})),B={auto:`header.theme.auto`,light:`header.theme.light`,dark:`header.theme.dark`,"github-dark":`header.theme.githubDark`},V=[`primary`,`secondary`,`success`,`warning`,`danger`,`info`],H=[``,`-hover`,`-active`,`-subtle`,`-border`,`-text`],U=`import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // "auto" (default) follows the operating system's color scheme
  return <ConfigProvider theme="github-dark">{/* your app */}</ConfigProvider>;
}`,W=`<!-- what ConfigProvider writes on the document root -->
<html style="--primary-color: #58a6ff; --background-color: #0d1117; ...">`,G=`/* Component-level tokens are not set by the built-in themes,
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
}`,K=`import { ConfigProvider, themes, type ComponentTheme } from "minerva-design";

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
}`,q=e=>!e.startsWith(`shadow-`)&&!e.startsWith(`radius-`),J=({token:e})=>{let t=e.startsWith(`shadow-`)?{boxShadow:`var(--${e})`,background:`var(--surface-color)`}:e.startsWith(`radius-`)?{borderRadius:`var(--${e})`,background:`var(--primary-color-subtle)`}:{background:`var(--${e})`};return(0,R.jsx)(`span`,{"aria-hidden":`true`,style:{display:`inline-block`,width:20,height:20,marginRight:8,verticalAlign:`middle`,border:q(e)?`1px solid var(--border-color)`:0,borderRadius:4,...t}})},Y=({name:e})=>{let{t}=r(),n=D(e);return!n||n.kind!==`interface`?null:(0,R.jsx)(`div`,{className:S.tableWrapper,tabIndex:0,role:`region`,"aria-label":e,children:(0,R.jsxs)(x,{className:S.propsTable,children:[(0,R.jsx)(b,{children:(0,R.jsxs)(y,{children:[(0,R.jsx)(_,{scope:`col`,children:t(`docs.theming.tokens.variable`)}),(0,R.jsx)(_,{scope:`col`,children:t(`doc.description`)})]})}),(0,R.jsx)(C,{children:n.props.map(n=>(0,R.jsxs)(y,{children:[(0,R.jsxs)(_,{scope:`row`,children:[(0,R.jsx)(J,{token:n.name}),(0,R.jsxs)(`code`,{className:S.propName,children:[`--`,n.name]})]}),(0,R.jsx)(w,{children:t(`docs.theme-utils.api.${e}.${n.name}`,{defaultValue:n.description??``})})]},n.name))})]})})},X=()=>{let{t:e}=r(),{mode:t,setMode:n,resolved:i}=oe();return(0,R.jsxs)(`div`,{className:S.demoFrame,children:[(0,R.jsxs)(`div`,{className:S.demoHeader,children:[(0,R.jsx)(`div`,{role:`group`,"aria-label":e(`header.theme.label`),style:{display:`flex`,flexWrap:`wrap`,gap:8},children:E.map(r=>(0,R.jsx)(o,{size:`small`,color:r===t?`primary`:`neutral`,variant:r===t?`solid`:`outline`,"aria-pressed":r===t,onClick:()=>n(r),children:e(B[r])},r))}),(0,R.jsxs)(`p`,{className:S.demoDescription,children:[e(`docs.theming.live.current`),` `,(0,R.jsx)(`code`,{children:i})]})]}),(0,R.jsx)(`div`,{className:S.demoPreview,"data-demo-preview":!0,children:(0,R.jsxs)(h,{gap:4,children:[(0,R.jsxs)(m,{gap:4,wrap:!0,children:[(0,R.jsx)(o,{color:`primary`,children:`Primary`}),(0,R.jsx)(o,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,R.jsx)(o,{color:`success`,children:`Success`}),(0,R.jsx)(o,{color:`danger`,children:`Danger`}),(0,R.jsx)(u,{color:`primary`,children:`Tag`}),(0,R.jsx)(u,{color:`success`,children:`Success`})]}),(0,R.jsxs)(m,{gap:4,wrap:!0,children:[(0,R.jsx)(f,{label:`Switch`,defaultChecked:!0}),(0,R.jsx)(c,{label:`Checkbox`,defaultChecked:!0}),(0,R.jsx)(`div`,{style:{width:220},children:(0,R.jsx)(ee,{name:`theming-showcase`,"aria-label":`Text field`,placeholder:`Type here`})})]}),(0,R.jsx)(re,{color:`info`,title:`Alert`,children:e(`docs.theming.live.alert`)})]})})]})},Z=`import { Button, Badge, Alert, Tooltip, toast } from "minerva-design";
import type { ColorScheme } from "minerva-design";
// "primary" | "neutral" | "success" | "warning" | "danger" | "info"

<Button color="danger" variant="outline">Delete</Button>
<Badge color="success" variant="subtle" content="Live" />
<Alert color="warning" variant="solid" title="Quota almost reached" />
<Tooltip color="info" content="Synced"><Button>Status</Button></Tooltip>
toast.success("Saved"); // toast({ color: "success", title: "Saved" })`,Q=()=>{let{t:e}=r(),t=[{value:`"auto"`,text:e(`docs.theming.values.auto`)},{value:`"light"`,text:e(`docs.theming.values.light`)},{value:`"dark"`,text:e(`docs.theming.values.dark`)},{value:`"github-dark"`,text:e(`docs.theming.values.githubDark`)},{value:`ThemeMap`,text:e(`docs.theming.values.object`)},{value:`{ light, dark }`,text:e(`docs.theming.values.pair`)}],n=(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`built-in`,children:[(0,R.jsx)(`h2`,{id:`built-in`,children:e(`docs.theming.builtIn.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.builtIn.text`)}),(0,R.jsx)(p,{code:U,language:`tsx`})]}),(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`live`,children:[(0,R.jsx)(`h2`,{id:`live`,children:e(`docs.theming.live.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.live.text`)}),(0,R.jsx)(X,{})]}),(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`theme-values`,children:[(0,R.jsx)(`h2`,{id:`theme-values`,children:e(`docs.theming.values.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.values.text`)}),(0,R.jsx)(`div`,{className:S.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.theming.values.title`),children:(0,R.jsxs)(x,{className:S.propsTable,children:[(0,R.jsx)(b,{children:(0,R.jsxs)(y,{children:[(0,R.jsx)(_,{scope:`col`,children:e(`docs.theming.values.value`)}),(0,R.jsx)(_,{scope:`col`,children:e(`doc.description`)})]})}),(0,R.jsx)(C,{children:t.map(e=>(0,R.jsxs)(y,{children:[(0,R.jsx)(_,{scope:`row`,children:(0,R.jsx)(`code`,{className:S.propName,children:e.value})}),(0,R.jsx)(w,{children:e.text})]},e.value))})]})})]}),(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`how-it-works`,children:[(0,R.jsx)(`h2`,{id:`how-it-works`,children:e(`docs.theming.how.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.how.p1`)}),(0,R.jsx)(p,{code:W,language:`html`}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.how.p2`)})]})]});return(0,R.jsxs)(se,{id:`theming`,demos:z,intro:n,children:[(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`custom-theme`,children:[(0,R.jsx)(`h2`,{id:`custom-theme`,children:e(`docs.theming.custom.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.custom.text`)}),(0,R.jsx)(p,{code:K,language:`tsx`})]}),(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`color-variant`,children:[(0,R.jsx)(`h2`,{id:`color-variant`,children:e(`docs.theming.colorProps.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.colorProps.color`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.colorProps.variant`)}),(0,R.jsx)(p,{code:Z,language:`tsx`})]}),(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`css-overrides`,children:[(0,R.jsx)(`h2`,{id:`css-overrides`,children:e(`docs.theming.css.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.css.text`)}),(0,R.jsx)(p,{code:G,language:`scss`}),(0,R.jsx)(`p`,{className:S.callout,children:e(`docs.theming.css.note`)})]}),(0,R.jsxs)(`section`,{className:S.section,"aria-labelledby":`tokens`,children:[(0,R.jsx)(`h2`,{id:`tokens`,children:e(`docs.theming.tokens.title`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.tokens.text`)}),(0,R.jsx)(`h3`,{children:e(`docs.theming.tokens.base`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.tokens.baseText`)}),(0,R.jsx)(Y,{name:`ThemeProps`}),(0,R.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:e(`docs.theming.tokens.semantic`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.tokens.semanticText`)}),(0,R.jsx)(Y,{name:`SemanticThemeProps`}),(0,R.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:e(`docs.theming.tokens.roles`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.tokens.rolesText`)}),(0,R.jsx)(`div`,{className:S.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.theming.tokens.roles`),children:(0,R.jsxs)(x,{className:S.propsTable,children:[(0,R.jsx)(b,{children:(0,R.jsxs)(y,{children:[(0,R.jsx)(_,{scope:`col`,children:e(`docs.theming.tokens.role`)}),H.map(e=>(0,R.jsx)(_,{scope:`col`,children:(0,R.jsx)(`code`,{children:`--<role>-color${e}`})},e))]})}),(0,R.jsx)(C,{children:V.map(e=>(0,R.jsxs)(y,{children:[(0,R.jsx)(_,{scope:`row`,children:(0,R.jsx)(`code`,{className:S.propName,children:e})}),H.map(t=>(0,R.jsx)(w,{title:`--${e}-color${t}`,children:(0,R.jsx)(J,{token:`${e}-color${t}`})},t))]},e))})]})}),(0,R.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:e(`docs.theming.tokens.component`)}),(0,R.jsx)(`p`,{className:S.prose,children:e(`docs.theming.tokens.componentText`)}),(0,R.jsx)(Y,{name:`ComponentThemeProps`})]})]})}})))()}$();export{Q as default};