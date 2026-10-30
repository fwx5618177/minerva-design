import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,c as i,d as a,f as ee,i as o,l as te,r as s,s as ne,u as c}from"./DemoBlock-BJ0_y9F8.js";import{n as l,t as u}from"./useTranslation-BzoVi22c.js";import{R as d,z as f}from"./ProgressIndicator-BhPa7d9i.js";import{a as re,i as ie,r as ae,s as p,t as oe}from"./Card-BqfTCY3r.js";import{n as se,t as ce}from"./Input-DboHcSJW.js";import{i as le,n as m,r as h,t as g}from"./Radio-DnNachfg.js";import{n as ue,t as de}from"./Alert-BbTmm8g-.js";import{n as fe,t as _}from"./Tag-vE6Ajh98.js";import{n as pe,t as me}from"./Switch-DyBWzlhy.js";import{n as he,t as v}from"./CodeBlock-BXt_Axjy.js";import{r as y,t as b}from"./ConfigProvider-DZkhWQzR.js";import{i as x,n as S,r as C}from"./Stack-CiM4m4jI.js";import{i as ge,o as _e,t as w}from"./Select-BfUcg0dC.js";import{l as T,n as E,t as D,u as O}from"./DocPage-B2iACtLP.js";function k(){return(0,A.jsxs)(oe,{style:{maxWidth:520,width:`100%`},children:[(0,A.jsx)(re,{children:(0,A.jsx)(p,{children:`Weekly digest`})}),(0,A.jsx)(ae,{children:(0,A.jsxs)(S,{gap:3,children:[(0,A.jsx)(`p`,{style:{margin:0,lineHeight:`var(--line-height-base)`},children:`A restrained, reading-oriented look keeps long texts comfortable; a compact one fits more data on dense screens.`}),(0,A.jsxs)(x,{gap:2,wrap:!0,children:[(0,A.jsx)(_,{color:`primary`,children:`Essay`}),(0,A.jsx)(_,{color:`success`,children:`Published`})]}),(0,A.jsx)(se,{name:`design-title`,"aria-label":`Title`,defaultValue:`On craft`}),(0,A.jsxs)(_e,{"aria-label":`Section`,defaultValue:`essays`,children:[(0,A.jsx)(w,{value:`essays`,children:`Essays`}),(0,A.jsx)(w,{value:`notes`,children:`Notes`})]}),(0,A.jsx)(me,{label:`Send as newsletter`,defaultChecked:!0}),(0,A.jsx)(de,{color:`info`,title:`Scheduled for Monday`}),(0,A.jsxs)(x,{gap:2,children:[(0,A.jsx)(f,{children:`Publish`}),(0,A.jsx)(f,{color:`neutral`,variant:`outline`,children:`Save draft`})]})]})})]})}var A;function j(){return(j=e((()=>{ue(),d(),ie(),C(),ce(),ge(),pe(),fe(),A=n()})))()}function M(){let[e,t]=(0,N.useState)({density:`standard`,radius:`medium`,shadow:`standard`,fontScale:`standard`});return(0,P.jsxs)(S,{gap:4,align:`start`,children:[Object.keys(F).map(n=>(0,P.jsx)(le,{label:n,direction:`horizontal`,value:e[n],onChange:e=>t(t=>({...t,[n]:String(e)})),children:F[n].map(e=>(0,P.jsx)(g,{value:e,label:e},e))},n)),(0,P.jsx)(b,{...e,children:(0,P.jsx)(k,{})})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),y(),m(),h(),C(),j(),P=n(),F={density:[`compact`,`standard`,`comfortable`],radius:[`none`,`small`,`medium`,`large`],shadow:[`none`,`subtle`,`standard`],fontScale:[`small`,`standard`,`large`]}})))()}function ve(){let[e,t]=(0,L.useState)(`editorial`);return(0,R.jsxs)(S,{gap:4,align:`start`,children:[(0,R.jsx)(x,{gap:2,role:`group`,"aria-label":`Design preset`,children:z.map(n=>(0,R.jsx)(f,{size:`small`,color:n===e?`primary`:`neutral`,variant:n===e?`solid`:`outline`,"aria-pressed":n===e,onClick:()=>t(n),children:n},n))}),(0,R.jsx)(b,{preset:e,children:(0,R.jsx)(k,{})})]})}var L,R,z;function B(){return(B=e((()=>{L=t(),d(),y(),C(),j(),R=n(),z=[`minerva`,`editorial`,`compact`,`touch`]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
import { ConfigProvider, Radio, RadioGroup, VStack } from "minerva-design";
import type {
  Density,
  FontScale,
  RadiusScale,
  ShadowScale,
} from "minerva-design";
import { Showcase } from "../Showcase";

const AXES = {
  density: ["compact", "standard", "comfortable"],
  radius: ["none", "small", "medium", "large"],
  shadow: ["none", "subtle", "standard"],
  fontScale: ["small", "standard", "large"],
} as const;

type Design = {
  density: Density;
  radius: RadiusScale;
  shadow: ShadowScale;
  fontScale: FontScale;
};

// Each axis can be set on its own (and overrides the preset's value)
export default function AxesDemo() {
  const [design, setDesign] = useState<Design>({
    density: "standard",
    radius: "medium",
    shadow: "standard",
    fontScale: "standard",
  });
  return (
    <VStack gap={4} align="start">
      {(Object.keys(AXES) as Array<keyof Design>).map((axis) => (
        <RadioGroup
          key={axis}
          label={axis}
          direction="horizontal"
          value={design[axis]}
          onChange={(value) =>
            setDesign(
              (current) => ({ ...current, [axis]: String(value) }) as Design,
            )
          }
        >
          {AXES[axis].map((value) => (
            <Radio key={value} value={value} label={value} />
          ))}
        </RadioGroup>
      ))}
      <ConfigProvider {...design}>
        <Showcase />
      </ConfigProvider>
    </VStack>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
import { Button, ConfigProvider, HStack, VStack } from "minerva-design";
import type { DesignPreset } from "minerva-design";
import { Showcase } from "../Showcase";

const PRESETS: DesignPreset[] = ["minerva", "editorial", "compact", "touch"];

// A nested ConfigProvider scopes the design to its subtree; at the root of
// an app the same props switch the whole document (<html data-*>).
export default function PresetsDemo() {
  const [preset, setPreset] = useState<DesignPreset>("editorial");
  return (
    <VStack gap={4} align="start">
      <HStack gap={2} role="group" aria-label="Design preset">
        {PRESETS.map((name) => (
          <Button
            key={name}
            size="small"
            color={name === preset ? "primary" : "neutral"}
            variant={name === preset ? "solid" : "outline"}
            aria-pressed={name === preset}
            onClick={() => setPreset(name)}
          >
            {name}
          </Button>
        ))}
      </HStack>
      <ConfigProvider preset={preset}>
        <Showcase />
      </ConfigProvider>
    </VStack>
  );
}
`})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{I(),B(),H(),W(),i(),t(),u(),he(),E(),o(),O(),G=n(),K=T(Object.assign({"./demos/axes.tsx":M,"./demos/presets.tsx":ve}),Object.assign({"./demos/axes.tsx":V,"./demos/presets.tsx":U})),q=`import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}`,J=`// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "minerva-design/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`,Y=`<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>`,X=`/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}`,Z=[{axis:`preset`,attribute:`-`,values:`"minerva" | "editorial" | "compact" | "touch"`},{axis:`density`,attribute:`data-density`,values:`"compact" | "standard" | "comfortable"`},{axis:`radius`,attribute:`data-radius`,values:`"none" | "small" | "medium" | "large"`},{axis:`shadow`,attribute:`data-shadow`,values:`"none" | "subtle" | "standard"`},{axis:`fontScale`,attribute:`data-font-scale`,values:`"small" | "standard" | "large"`}],Q=()=>{let{t:e}=l(),t=(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(`section`,{className:s.section,"aria-labelledby":`design-axes`,children:[(0,G.jsx)(`h2`,{id:`design-axes`,children:e(`docs.design-presets.axes.title`)}),(0,G.jsx)(`p`,{className:s.prose,children:e(`docs.design-presets.axes.text`)}),(0,G.jsx)(`div`,{className:s.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.design-presets.axes.title`),children:(0,G.jsxs)(te,{className:s.propsTable,children:[(0,G.jsx)(ee,{children:(0,G.jsxs)(a,{children:[(0,G.jsx)(r,{scope:`col`,children:e(`doc.prop`)}),(0,G.jsx)(r,{scope:`col`,children:e(`docs.design-presets.axes.attribute`)}),(0,G.jsx)(r,{scope:`col`,children:e(`doc.type`)}),(0,G.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,G.jsx)(ne,{children:Z.map(({axis:t,attribute:n,values:i})=>(0,G.jsxs)(a,{children:[(0,G.jsx)(r,{scope:`row`,children:(0,G.jsx)(`code`,{className:s.propName,children:t})}),(0,G.jsx)(c,{children:(0,G.jsx)(`code`,{children:n})}),(0,G.jsx)(c,{children:(0,G.jsx)(`code`,{className:s.propType,children:i})}),(0,G.jsx)(c,{children:e(`docs.design-presets.axes.${t}`)})]},t))})]})})]}),(0,G.jsxs)(`section`,{className:s.section,"aria-labelledby":`design-root`,children:[(0,G.jsx)(`h2`,{id:`design-root`,children:e(`docs.design-presets.root.title`)}),(0,G.jsx)(`p`,{className:s.prose,children:e(`docs.design-presets.root.text`)}),(0,G.jsx)(v,{code:q,language:`tsx`})]}),(0,G.jsxs)(`section`,{className:s.section,"aria-labelledby":`design-ssr`,children:[(0,G.jsx)(`h2`,{id:`design-ssr`,children:e(`docs.design-presets.ssr.title`)}),(0,G.jsx)(`p`,{className:s.prose,children:e(`docs.design-presets.ssr.text`)}),(0,G.jsx)(v,{code:J,language:`tsx`})]}),(0,G.jsxs)(`section`,{className:s.section,"aria-labelledby":`design-nested`,children:[(0,G.jsx)(`h2`,{id:`design-nested`,children:e(`docs.design-presets.nested.title`)}),(0,G.jsx)(`p`,{className:s.prose,children:e(`docs.design-presets.nested.text`)}),(0,G.jsx)(v,{code:Y,language:`tsx`})]})]});return(0,G.jsx)(D,{id:`design-presets`,demos:K,intro:t,children:(0,G.jsxs)(`section`,{className:s.section,"aria-labelledby":`design-css`,children:[(0,G.jsx)(`h2`,{id:`design-css`,children:e(`docs.design-presets.css.title`)}),(0,G.jsx)(`p`,{className:s.prose,children:e(`docs.design-presets.css.text`)}),(0,G.jsx)(v,{code:X,language:`css`})]})})}})))()}$();export{Q as default};