import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{a as ee,i as te,r as ne,s as re,t as ie}from"./Card-Cm83NXvy.js";import{n as ae,t as oe}from"./Input-LfOOMgLE.js";import{i as se,n as ce,r as le,t as ue}from"./Radio-L-_0EAus.js";import{n as de,t as s}from"./Alert-DYH-oD8D.js";import{n as c,t as l}from"./Tag-D6SUzaZT.js";import{n as u,t as d}from"./Switch-CHbzff3y.js";import{n as f,t as p}from"./CodeBlock-DoGcue8j.js";import{r as m,t as h}from"./ConfigProvider-DxH0x8eF.js";import{i as g,n as _,r as v}from"./Stack-B3Kr9X_e.js";import{a as y,c as fe,d as b,f as pe,i as me,l as he,r as x,s as ge,u as S}from"./DemoBlock-CrPVu7R1.js";import{i as C,o as _e,t as w}from"./Select-CRoh0AwC.js";import{l as T,n as E,t as D,u as O}from"./DocPage-BdPOW9nQ.js";function k(){return(0,A.jsxs)(ie,{style:{maxWidth:520,width:`100%`},children:[(0,A.jsx)(ee,{children:(0,A.jsx)(re,{children:`Weekly digest`})}),(0,A.jsx)(ne,{children:(0,A.jsxs)(_,{gap:3,children:[(0,A.jsx)(`p`,{style:{margin:0,lineHeight:`var(--line-height-base)`},children:`A restrained, reading-oriented look keeps long texts comfortable; a compact one fits more data on dense screens.`}),(0,A.jsxs)(g,{gap:2,wrap:!0,children:[(0,A.jsx)(l,{color:`primary`,children:`Essay`}),(0,A.jsx)(l,{color:`success`,children:`Published`})]}),(0,A.jsx)(ae,{name:`design-title`,"aria-label":`Title`,defaultValue:`On craft`}),(0,A.jsxs)(_e,{"aria-label":`Section`,defaultValue:`essays`,children:[(0,A.jsx)(w,{value:`essays`,children:`Essays`}),(0,A.jsx)(w,{value:`notes`,children:`Notes`})]}),(0,A.jsx)(d,{label:`Send as newsletter`,defaultChecked:!0}),(0,A.jsx)(s,{color:`info`,title:`Scheduled for Monday`}),(0,A.jsxs)(g,{gap:2,children:[(0,A.jsx)(o,{children:`Publish`}),(0,A.jsx)(o,{color:`neutral`,variant:`outline`,children:`Save draft`})]})]})})]})}var A;function j(){return(j=e((()=>{de(),a(),te(),v(),oe(),C(),u(),c(),A=n()})))()}function M(){let[e,t]=(0,N.useState)({density:`standard`,radius:`medium`,shadow:`standard`,fontScale:`standard`});return(0,P.jsxs)(_,{gap:4,align:`start`,children:[Object.keys(F).map(n=>(0,P.jsx)(se,{label:n,direction:`horizontal`,value:e[n],onChange:e=>t(t=>({...t,[n]:String(e)})),children:F[n].map(e=>(0,P.jsx)(ue,{value:e,label:e},e))},n)),(0,P.jsx)(h,{...e,children:(0,P.jsx)(k,{})})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),m(),ce(),le(),v(),j(),P=n(),F={density:[`compact`,`standard`,`comfortable`],radius:[`none`,`small`,`medium`,`large`],shadow:[`none`,`subtle`,`standard`],fontScale:[`small`,`standard`,`large`]}})))()}function ve(){let[e,t]=(0,L.useState)(`editorial`);return(0,R.jsxs)(_,{gap:4,align:`start`,children:[(0,R.jsx)(g,{gap:2,role:`group`,"aria-label":`Design preset`,children:z.map(n=>(0,R.jsx)(o,{size:`small`,color:n===e?`primary`:`neutral`,variant:n===e?`solid`:`outline`,"aria-pressed":n===e,onClick:()=>t(n),children:n},n))}),(0,R.jsx)(h,{preset:e,children:(0,R.jsx)(k,{})})]})}var L,R,z;function B(){return(B=e((()=>{L=t(),a(),m(),v(),j(),R=n(),z=[`minerva`,`editorial`,`compact`,`touch`]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
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
`})))()}var G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{I(),B(),H(),W(),fe(),t(),i(),f(),E(),me(),O(),G=n(),K=T(Object.assign({"./demos/axes.tsx":M,"./demos/presets.tsx":ve}),Object.assign({"./demos/axes.tsx":V,"./demos/presets.tsx":U})),q=`import { ConfigProvider } from "minerva-design";
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
}`,Z=[{axis:`preset`,attribute:`-`,values:`"minerva" | "editorial" | "compact" | "touch"`},{axis:`density`,attribute:`data-density`,values:`"compact" | "standard" | "comfortable"`},{axis:`radius`,attribute:`data-radius`,values:`"none" | "small" | "medium" | "large"`},{axis:`shadow`,attribute:`data-shadow`,values:`"none" | "subtle" | "standard"`},{axis:`fontScale`,attribute:`data-font-scale`,values:`"small" | "standard" | "large"`}],Q=()=>{let{t:e}=r(),t=(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(`section`,{className:x.section,"aria-labelledby":`design-axes`,children:[(0,G.jsx)(`h2`,{id:`design-axes`,children:e(`docs.design-presets.axes.title`)}),(0,G.jsx)(`p`,{className:x.prose,children:e(`docs.design-presets.axes.text`)}),(0,G.jsx)(`div`,{className:x.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.design-presets.axes.title`),children:(0,G.jsxs)(he,{className:x.propsTable,children:[(0,G.jsx)(pe,{children:(0,G.jsxs)(b,{children:[(0,G.jsx)(y,{scope:`col`,children:e(`doc.prop`)}),(0,G.jsx)(y,{scope:`col`,children:e(`docs.design-presets.axes.attribute`)}),(0,G.jsx)(y,{scope:`col`,children:e(`doc.type`)}),(0,G.jsx)(y,{scope:`col`,children:e(`doc.description`)})]})}),(0,G.jsx)(ge,{children:Z.map(({axis:t,attribute:n,values:r})=>(0,G.jsxs)(b,{children:[(0,G.jsx)(y,{scope:`row`,children:(0,G.jsx)(`code`,{className:x.propName,children:t})}),(0,G.jsx)(S,{children:(0,G.jsx)(`code`,{children:n})}),(0,G.jsx)(S,{children:(0,G.jsx)(`code`,{className:x.propType,children:r})}),(0,G.jsx)(S,{children:e(`docs.design-presets.axes.${t}`)})]},t))})]})})]}),(0,G.jsxs)(`section`,{className:x.section,"aria-labelledby":`design-root`,children:[(0,G.jsx)(`h2`,{id:`design-root`,children:e(`docs.design-presets.root.title`)}),(0,G.jsx)(`p`,{className:x.prose,children:e(`docs.design-presets.root.text`)}),(0,G.jsx)(p,{code:q,language:`tsx`})]}),(0,G.jsxs)(`section`,{className:x.section,"aria-labelledby":`design-ssr`,children:[(0,G.jsx)(`h2`,{id:`design-ssr`,children:e(`docs.design-presets.ssr.title`)}),(0,G.jsx)(`p`,{className:x.prose,children:e(`docs.design-presets.ssr.text`)}),(0,G.jsx)(p,{code:J,language:`tsx`})]}),(0,G.jsxs)(`section`,{className:x.section,"aria-labelledby":`design-nested`,children:[(0,G.jsx)(`h2`,{id:`design-nested`,children:e(`docs.design-presets.nested.title`)}),(0,G.jsx)(`p`,{className:x.prose,children:e(`docs.design-presets.nested.text`)}),(0,G.jsx)(p,{code:Y,language:`tsx`})]})]});return(0,G.jsx)(D,{id:`design-presets`,demos:K,intro:t,children:(0,G.jsxs)(`section`,{className:x.section,"aria-labelledby":`design-css`,children:[(0,G.jsx)(`h2`,{id:`design-css`,children:e(`docs.design-presets.css.title`)}),(0,G.jsx)(`p`,{className:x.prose,children:e(`docs.design-presets.css.text`)}),(0,G.jsx)(p,{code:X,language:`css`})]})})}})))()}$();export{Q as default};