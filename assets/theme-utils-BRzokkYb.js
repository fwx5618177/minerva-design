import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,c as i,d as a,f as o,i as s,l as c,r as l,s as ee,u}from"./DemoBlock-BJ0_y9F8.js";import{n as te,t as d}from"./useTranslation-BzoVi22c.js";import{I as f,It as p,T as m,_ as h,b as ne,ct as g,w as _}from"./angular-preview-l4x8c_2r.js";import{R as v,z as y}from"./ProgressIndicator-BhPa7d9i.js";import{n as re,t as ie}from"./Checkbox-CideRWaf.js";import{n as b,t as x}from"./Input-DboHcSJW.js";import{n as S,t as C}from"./Tag-vE6Ajh98.js";import{n as w,t as ae}from"./Switch-DyBWzlhy.js";import{n as oe,t as T}from"./CodeBlock-BXt_Axjy.js";import{i as se,r as ce}from"./Stack-CiM4m4jI.js";import{i as le,o as E,t as D}from"./Select-BfUcg0dC.js";import{l as ue,n as de,t as fe,u as pe}from"./DocPage-B2iACtLP.js";function me(){let[e,t]=(0,O.useState)(`"auto"`),[n,r]=(0,O.useState)(_),i=A[e],a=f(i,n);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,k.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,k.jsxs)(`label`,{children:[`theme`,` `,(0,k.jsx)(E,{"aria-label":`theme`,value:e,onChange:t,children:Object.keys(A).map(e=>(0,k.jsx)(D,{value:e,children:e},e))})]}),(0,k.jsxs)(`label`,{children:[`systemTheme`,` `,(0,k.jsxs)(E,{"aria-label":`systemTheme`,value:n,onChange:e=>r(e),children:[(0,k.jsx)(D,{value:`light`,children:`light`}),(0,k.jsx)(D,{value:`dark`,children:`dark`})]})]})]}),(0,k.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[`getSystemTheme(): `,(0,k.jsx)(C,{color:`info`,children:_()}),` `,`isBilingualTheme(theme):`,` `,(0,k.jsx)(C,{color:`info`,children:String(h(i))})]}),(0,k.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,padding:12,borderRadius:8,background:a[`background-color`],color:a[`foreground-color`],border:`1px solid ${a[`border-color`]}`},children:[(0,k.jsx)(`span`,{"aria-hidden":`true`,style:{width:24,height:24,borderRadius:`50%`,background:a[`primary-color`]}}),(0,k.jsxs)(`span`,{style:{fontFamily:`monospace`,fontSize:13},children:[`primary-color: `,a[`primary-color`],` · background-color:`,` `,a[`background-color`]]})]})]})}var O,k,A;function j(){return(j=e((()=>{O=t(),S(),le(),m(),p(),k=n(),A={'"auto"':`auto`,'"light"':`light`,'"dark"':`dark`,'"github-dark"':`github-dark`,"{ light, dark } pair":{light:{...g.light,"primary-color":`#7c3aed`},dark:{...g.dark,"primary-color":`#a78bfa`}},"custom object":{...g.light,"primary-color":`#0d9488`}}})))()}function M(){let e=(0,N.useRef)(null),[t,n]=(0,N.useState)(`github-dark`);return(0,N.useEffect)(()=>{e.current&&ne(e.current.style,f(t))},[t]),(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,P.jsx)(`div`,{role:`group`,"aria-label":`Theme`,style:{display:`flex`,gap:8},children:F.map(e=>(0,P.jsx)(y,{size:`small`,color:e===t?`primary`:`neutral`,variant:e===t?`solid`:`outline`,"aria-pressed":e===t,onClick:()=>n(e),children:e},e))}),(0,P.jsx)(`div`,{ref:e,style:{padding:16,borderRadius:8,background:`var(--background-color)`,color:`var(--text-color)`,border:`1px solid var(--border-color)`},children:(0,P.jsxs)(se,{gap:4,wrap:!0,children:[(0,P.jsx)(y,{color:`primary`,children:`Primary`}),(0,P.jsx)(y,{color:`success`,children:`Success`}),(0,P.jsx)(ae,{label:`Switch`,defaultChecked:!0}),(0,P.jsx)(ie,{label:`Checkbox`,defaultChecked:!0}),(0,P.jsx)(`div`,{style:{width:220},children:(0,P.jsx)(b,{name:`preview`,"aria-label":`Name`,placeholder:`Jane Doe`})})]})})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),v(),re(),m(),ce(),x(),w(),p(),P=n(),F=Object.keys(g)})))()}function L(){return(0,R.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:16,width:`100%`},children:Object.entries(g).map(([e,t])=>(0,R.jsxs)(`figure`,{style:{margin:0,padding:12,borderRadius:8,background:t[`background-color`],color:t[`foreground-color`],border:`1px solid ${t[`border-color`]}`},children:[(0,R.jsx)(`figcaption`,{style:{fontWeight:600,marginBottom:8},children:e}),(0,R.jsx)(`ul`,{style:{listStyle:`none`,margin:0,padding:0},children:z.map(e=>(0,R.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:8,fontSize:12,lineHeight:`22px`},children:[(0,R.jsx)(`span`,{"aria-hidden":`true`,style:{width:16,height:16,borderRadius:4,background:t[e],border:`1px solid ${t[`border-color`]}`}}),(0,R.jsx)(`span`,{style:{flex:1,fontFamily:`monospace`},children:e}),(0,R.jsx)(`span`,{style:{fontFamily:`monospace`},children:t[e]})]},e))})]},e))})}var R,z;function B(){return(B=e((()=>{p(),R=n(),z=[`primary-color`,`secondary-color`,`success-color`,`warning-color`,`danger-color`,`info-color`,`background-color`,`foreground-color`,`border-color`]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
import {
  Tag,
  Select,
  SelectItem,
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
  type DefaultTheme,
  type Theme,
} from "minerva-design";

const INPUTS: Record<string, Theme> = {
  '"auto"': "auto",
  '"light"': "light",
  '"dark"': "dark",
  '"github-dark"': "github-dark",
  "{ light, dark } pair": {
    light: { ...themes.light, "primary-color": "#7c3aed" },
    dark: { ...themes.dark, "primary-color": "#a78bfa" },
  },
  "custom object": { ...themes.light, "primary-color": "#0d9488" },
};

// resolveTheme / isBilingualTheme / getSystemTheme are pure helpers:
// they compute values and never touch the DOM.
export default function ResolveThemeDemo() {
  const [input, setInput] = useState('"auto"');
  const [scheme, setScheme] = useState<DefaultTheme>(getSystemTheme);

  const theme = INPUTS[input];
  const resolved = resolveTheme(theme, scheme);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <label>
          theme{" "}
          <Select aria-label="theme" value={input} onChange={setInput}>
            {Object.keys(INPUTS).map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </Select>
        </label>
        <label>
          systemTheme{" "}
          <Select
            aria-label="systemTheme"
            value={scheme}
            onChange={(value) => setScheme(value as DefaultTheme)}
          >
            <SelectItem value="light">light</SelectItem>
            <SelectItem value="dark">dark</SelectItem>
          </Select>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        getSystemTheme(): <Tag color="info">{getSystemTheme()}</Tag>{" "}
        isBilingualTheme(theme):{" "}
        <Tag color="info">{String(isBilingualTheme(theme))}</Tag>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 12,
          borderRadius: 8,
          background: resolved["background-color"],
          color: resolved["foreground-color"],
          border: \`1px solid \${resolved["border-color"]}\`,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: resolved["primary-color"],
          }}
        />
        <span style={{ fontFamily: "monospace", fontSize: 13 }}>
          primary-color: {resolved["primary-color"]} · background-color:{" "}
          {resolved["background-color"]}
        </span>
      </div>
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  generateCSSVariables,
  HStack,
  Input,
  resolveTheme,
  Switch,
  themes,
  type ThemeName,
} from "minerva-design";

const NAMES = Object.keys(themes) as ThemeName[];

// generateCSSVariables writes a theme to any style declaration. Pointing it
// at an element (instead of <html>, like applyThemeStyles does) previews a
// theme inside that element only.
export default function ScopedPreviewDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<ThemeName>("github-dark");

  useEffect(() => {
    if (ref.current)
      generateCSSVariables(ref.current.style, resolveTheme(name));
  }, [name]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div role="group" aria-label="Theme" style={{ display: "flex", gap: 8 }}>
        {NAMES.map((n) => (
          <Button
            key={n}
            size="small"
            color={n === name ? "primary" : "neutral"}
            variant={n === name ? "solid" : "outline"}
            aria-pressed={n === name}
            onClick={() => setName(n)}
          >
            {n}
          </Button>
        ))}
      </div>
      <div
        ref={ref}
        style={{
          padding: 16,
          borderRadius: 8,
          background: "var(--background-color)",
          color: "var(--text-color)",
          border: "1px solid var(--border-color)",
        }}
      >
        <HStack gap={4} wrap>
          <Button color="primary">Primary</Button>
          <Button color="success">Success</Button>
          <Switch label="Switch" defaultChecked />
          <Checkbox label="Checkbox" defaultChecked />
          <div style={{ width: 220 }}>
            <Input name="preview" aria-label="Name" placeholder="Jane Doe" />
          </div>
        </HStack>
      </div>
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { themes } from "minerva-design";

const TOKENS = [
  "primary-color",
  "secondary-color",
  "success-color",
  "warning-color",
  "danger-color",
  "info-color",
  "background-color",
  "foreground-color",
  "border-color",
] as const;

// \`themes\` is a plain object: reading it has no side effects
export default function ThemeSwatchesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {Object.entries(themes).map(([name, theme]) => (
        <figure
          key={name}
          style={{
            margin: 0,
            padding: 12,
            borderRadius: 8,
            background: theme["background-color"],
            color: theme["foreground-color"],
            border: \`1px solid \${theme["border-color"]}\`,
          }}
        >
          <figcaption style={{ fontWeight: 600, marginBottom: 8 }}>
            {name}
          </figcaption>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {TOKENS.map((token) => (
              <li
                key={token}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  lineHeight: "22px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: theme[token],
                    border: \`1px solid \${theme["border-color"]}\`,
                  }}
                />
                <span style={{ flex: 1, fontFamily: "monospace" }}>
                  {token}
                </span>
                <span style={{ fontFamily: "monospace" }}>{theme[token]}</span>
              </li>
            ))}
          </ul>
        </figure>
      ))}
    </div>
  );
}
`})))()}var q,J,Y,X,Z,Q;function $(){return($=e((()=>{j(),I(),B(),H(),W(),K(),i(),t(),d(),oe(),de(),s(),pe(),q=n(),J=ue(Object.assign({"./demos/resolve-theme.tsx":me,"./demos/scoped-preview.tsx":M,"./demos/theme-swatches.tsx":L}),Object.assign({"./demos/resolve-theme.tsx":V,"./demos/scoped-preview.tsx":U,"./demos/theme-swatches.tsx":G})),Y=`import { applyThemeStyles, themes } from "minerva-design";

// Without React (or before the first render): write a theme on <html>
applyThemeStyles("dark");
applyThemeStyles({ ...themes.light, "primary-color": "#7c3aed" });

// "auto" and { light, dark } pairs need the scheme to resolve against
// (defaults to the current prefers-color-scheme)
applyThemeStyles("auto", "dark");`,X=`import { generateCSSVariables, resolveTheme } from "minerva-design";

// Theme a single element (e.g. an embedded widget) instead of the page
const widget = document.querySelector<HTMLElement>("#widget")!;
generateCSSVariables(widget.style, resolveTheme("github-dark"));`,Z=`import {
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
} from "minerva-design";

getSystemTheme(); // "light" | "dark" ("light" during SSR)

const pair = { light: themes.light, dark: themes.dark };
isBilingualTheme(pair); // true
isBilingualTheme("dark"); // false

resolveTheme("auto", "dark") === themes.dark; // true
resolveTheme("github-dark")["background-color"]; // "#0d1117"
resolveTheme(pair, "light") === themes.light; // true`,Q=()=>{let{t:e}=te(),t=[{name:`applyThemeStyles`,signature:`(theme: Theme | ThemeName, systemTheme?: DefaultTheme) => void`,description:e(`docs.theme-utils.reference.applyThemeStyles`)},{name:`generateCSSVariables`,signature:`(style: CSSStyleDeclaration, theme: ComponentTheme | ThemeMap) => void`,description:e(`docs.theme-utils.reference.generateCSSVariables`)},{name:`resolveTheme`,signature:`(theme: Theme, systemTheme?: DefaultTheme) => ComponentTheme | ThemeMap`,description:e(`docs.theme-utils.reference.resolveTheme`)},{name:`getSystemTheme`,signature:`() => "light" | "dark"`,description:e(`docs.theme-utils.reference.getSystemTheme`)},{name:`isBilingualTheme`,signature:`(theme: unknown) => theme is CustomBilingualTheme`,description:e(`docs.theme-utils.reference.isBilingualTheme`)},{name:`themes`,signature:`{ light: ComponentTheme; dark: ComponentTheme; "github-dark": ComponentTheme }`,description:e(`docs.theme-utils.reference.themes`)},{name:`light / dark / githubDark`,signature:`ComponentTheme`,description:e(`docs.theme-utils.reference.builtIns`)}],n=(0,q.jsxs)(`section`,{className:l.section,"aria-labelledby":`reference`,children:[(0,q.jsx)(`h2`,{id:`reference`,children:e(`docs.theme-utils.reference.title`)}),(0,q.jsx)(`p`,{className:l.prose,children:e(`docs.theme-utils.reference.text`)}),(0,q.jsx)(`div`,{className:l.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.theme-utils.reference.title`),children:(0,q.jsxs)(c,{className:l.propsTable,children:[(0,q.jsx)(o,{children:(0,q.jsxs)(a,{children:[(0,q.jsx)(r,{scope:`col`,children:e(`docs.theme-utils.reference.name`)}),(0,q.jsx)(r,{scope:`col`,children:e(`docs.theme-utils.reference.signature`)}),(0,q.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,q.jsx)(ee,{children:t.map(e=>(0,q.jsxs)(a,{children:[(0,q.jsx)(r,{scope:`row`,children:(0,q.jsx)(`code`,{className:l.propName,children:e.name})}),(0,q.jsx)(u,{children:(0,q.jsx)(`code`,{className:l.propType,children:e.signature})}),(0,q.jsx)(u,{children:e.description})]},e.name))})]})}),(0,q.jsx)(`h3`,{style:{marginTop:`var(--spacing-8)`},children:e(`docs.theme-utils.usage.apply`)}),(0,q.jsx)(`p`,{className:l.prose,children:e(`docs.theme-utils.usage.applyText`)}),(0,q.jsx)(T,{code:Y,language:`tsx`}),(0,q.jsx)(`h3`,{children:e(`docs.theme-utils.usage.generate`)}),(0,q.jsx)(`p`,{className:l.prose,children:e(`docs.theme-utils.usage.generateText`)}),(0,q.jsx)(T,{code:X,language:`tsx`}),(0,q.jsx)(`h3`,{children:e(`docs.theme-utils.usage.resolve`)}),(0,q.jsx)(`p`,{className:l.prose,children:e(`docs.theme-utils.usage.resolveText`)}),(0,q.jsx)(T,{code:Z,language:`tsx`})]});return(0,q.jsx)(fe,{id:`theme-utils`,demos:J,intro:n})}})))()}$();export{Q as default};