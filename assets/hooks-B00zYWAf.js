import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,c as i,d as a,f as o,i as s,l as ee,r as c,s as te,u as l}from"./DemoBlock-BJ0_y9F8.js";import{n as ne,t as re}from"./useTranslation-BzoVi22c.js";import{It as ie,T as ae,_ as oe,ut as u,w as se,z as d}from"./angular-preview-l4x8c_2r.js";import{H as ce,K as f,R as p,U as le,X as ue,Y as de,q as m,z as h}from"./ProgressIndicator-BhPa7d9i.js";import{Ct as fe,St as pe}from"./io5-DF7HdQ2g.js";import{n as me,t as he}from"./Empty-CH2Z71iV.js";import{n as ge,t as _e}from"./Alert-BbTmm8g-.js";import{n as g,t as _}from"./Tag-vE6Ajh98.js";import{n as ve,t as ye}from"./CodeBlock-BXt_Axjy.js";import{n as be,r as v,t as y}from"./ConfigProvider-DZkhWQzR.js";import{i as b,n as xe,r as x}from"./Stack-CiM4m4jI.js";import{l as Se,n as Ce,t as we,u as Te}from"./DocPage-B2iACtLP.js";var S,C,w,T,E,D;function O(){return(O=e((()=>{f(),S=t(),ae(),C=`(prefers-color-scheme: dark)`,w=e=>{if(typeof window>`u`||!window.matchMedia)return()=>{};let t=window.matchMedia(C);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},T=()=>()=>{},E=()=>`light`,D=(e=`auto`)=>{let[t,n]=(0,S.useState)(e),[r,i]=(0,S.useState)(e);e!==r&&(i(e),n(e));let a=t===`auto`||t===`system`||oe(t),o=(0,S.useSyncExternalStore)(a?w:T,se,E),s=(0,S.useContext)(m)!==null;return(0,S.useEffect)(()=>{s||d(t,o)},[s,t,o]),[t,n,o]}})))()}var k,A;function j(){return(j=e((()=>{ue(),f(),k=t(),A=(e={language:`en`})=>{let[t,n]=(0,k.useState)(e),[r,i]=(0,k.useState)(e.language);e.language!==r&&(i(e.language),n({language:e.language}));let a=(0,k.useContext)(m)!==null;return(0,k.useEffect)(()=>{a||de(t.language??`en`)},[a,t.language]),[t,n]}})))()}function Ee(e={}){let{isOpen:t,defaultIsOpen:n,onChange:r}=e,[i,a]=pe({value:t,defaultValue:n??!1,onChange:r,name:`useDisclosure`,prop:`isOpen`,defaultProp:`defaultIsOpen`});return{isOpen:i,onOpen:(0,M.useCallback)(()=>a(!0),[a]),onClose:(0,M.useCallback)(()=>a(!1),[a]),onToggle:(0,M.useCallback)(()=>a(e=>!e),[a])}}var M;function N(){return(N=e((()=>{fe(),M=t()})))()}function De(){let{theme:e=`auto`}=be(),[t,n,r]=D(e);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,P.jsxs)(`div`,{role:`group`,"aria-label":`Theme`,style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[F.map(e=>(0,P.jsx)(h,{size:`small`,color:e===t?`primary`:`neutral`,variant:e===t?`solid`:`outline`,"aria-pressed":e===t,onClick:()=>n(e),children:String(e)},String(e))),(0,P.jsx)(h,{size:`small`,color:`neutral`,variant:`ghost`,onClick:()=>n(e),children:`Reset`})]}),(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[`theme:`,` `,(0,P.jsx)(_,{color:`primary`,children:typeof t==`string`?t:`custom`}),` `,`systemTheme: `,(0,P.jsx)(_,{color:`info`,children:r})]}),(0,P.jsx)(y,{theme:t,children:(0,P.jsx)(`div`,{style:{padding:16,borderRadius:8,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`},children:(0,P.jsxs)(b,{gap:4,wrap:!0,children:[(0,P.jsx)(h,{color:`primary`,children:`Primary`}),(0,P.jsx)(h,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,P.jsx)(_,{color:`success`,children:`preview`})]})})})]})}var P,F;function I(){return(I=e((()=>{p(),v(),x(),g(),O(),P=n(),F=[`auto`,`light`,`dark`,`github-dark`]})))()}function Oe(){let e=Ee({defaultIsOpen:!0});return(0,L.jsxs)(xe,{gap:4,children:[(0,L.jsxs)(b,{gap:4,wrap:!0,children:[(0,L.jsx)(h,{size:`small`,color:`primary`,onClick:e.onToggle,children:`Toggle`}),(0,L.jsx)(h,{size:`small`,color:`neutral`,variant:`outline`,onClick:e.onOpen,children:`Open`}),(0,L.jsx)(h,{size:`small`,color:`neutral`,variant:`outline`,onClick:e.onClose,children:`Close`}),`isOpen:`,` `,(0,L.jsx)(_,{color:e.isOpen?`success`:`info`,children:String(e.isOpen)})]}),e.isOpen&&(0,L.jsxs)(_e,{color:`info`,title:`Details`,className:u(`disclosure-panel`,e.isOpen&&`is-open`),children:[`className = "`,u(`disclosure-panel`,e.isOpen&&`is-open`),`"`]})]})}var L;function R(){return(R=e((()=>{ge(),p(),ie(),x(),g(),N(),L=n()})))()}function ke(){let{t:e,language:t}=ce();return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[`useI18n().language: `,(0,z.jsx)(_,{color:`primary`,children:t}),` `,B,`:`,` `,(0,z.jsx)(_,{color:`info`,children:e(B)})]}),(0,z.jsx)(he,{size:`small`})]})}function Ae(){let[e,t]=A({language:`en`});return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,z.jsx)(`div`,{role:`group`,"aria-label":`Language`,style:{display:`flex`,gap:8},children:V.map(n=>(0,z.jsx)(h,{size:`small`,color:n===e.language?`primary`:`neutral`,variant:n===e.language?`solid`:`outline`,"aria-pressed":n===e.language,onClick:()=>t({language:n}),children:n},n))}),(0,z.jsx)(y,{locale:e,children:(0,z.jsx)(ke,{})})]})}var z,B,V;function H(){return(H=e((()=>{p(),v(),me(),g(),le(),j(),z=n(),B=`avatar.default`,V=[`en`,`zh`,`ja`,`fr`]})))()}var U;function W(){return(W=e((()=>{U=`import {
  Button,
  ConfigProvider,
  HStack,
  Tag,
  type Theme,
  useAutoTheme,
  useConfig,
} from "minerva-design";

const OPTIONS: Theme[] = ["auto", "light", "dark", "github-dark"];

// Inside a ConfigProvider (this site has one at the root) useAutoTheme only
// manages the state: the root provider owns <html>. The chosen theme is
// applied to the preview below with a nested, scoped ConfigProvider.
export default function UseAutoThemeDemo() {
  const { theme: appTheme = "auto" } = useConfig();
  const [theme, setTheme, systemTheme] = useAutoTheme(appTheme);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Theme"
        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
      >
        {OPTIONS.map((option) => (
          <Button
            key={String(option)}
            size="small"
            color={option === theme ? "primary" : "neutral"}
            variant={option === theme ? "solid" : "outline"}
            aria-pressed={option === theme}
            onClick={() => setTheme(option)}
          >
            {String(option)}
          </Button>
        ))}
        <Button
          size="small"
          color="neutral"
          variant="ghost"
          onClick={() => setTheme(appTheme)}
        >
          Reset
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        theme:{" "}
        <Tag color="primary">
          {typeof theme === "string" ? theme : "custom"}
        </Tag>{" "}
        systemTheme: <Tag color="info">{systemTheme}</Tag>
      </div>
      <ConfigProvider theme={theme}>
        <div
          style={{
            padding: 16,
            borderRadius: 8,
            border: "1px solid var(--border-color)",
            background: "var(--background-color)",
            color: "var(--text-color)",
          }}
        >
          <HStack gap={4} wrap>
            <Button color="primary">Primary</Button>
            <Button color="neutral" variant="outline">
              Secondary
            </Button>
            <Tag color="success">preview</Tag>
          </HStack>
        </div>
      </ConfigProvider>
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import {
  Alert,
  Button,
  cn,
  HStack,
  Tag,
  useDisclosure,
  VStack,
} from "minerva-design";

// useDisclosure keeps an open / closed state (uncontrolled here; pass isOpen
// and onChange to control it). cn joins class names and skips falsy values.
export default function UseDisclosureDemo() {
  const panel = useDisclosure({ defaultIsOpen: true });

  return (
    <VStack gap={4}>
      <HStack gap={4} wrap>
        <Button size="small" color="primary" onClick={panel.onToggle}>
          Toggle
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={panel.onOpen}
        >
          Open
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={panel.onClose}
        >
          Close
        </Button>
        isOpen:{" "}
        <Tag color={panel.isOpen ? "success" : "info"}>
          {String(panel.isOpen)}
        </Tag>
      </HStack>
      {panel.isOpen && (
        <Alert
          color="info"
          title="Details"
          className={cn("disclosure-panel", panel.isOpen && "is-open")}
        >
          className = &quot;{cn("disclosure-panel", panel.isOpen && "is-open")}
          &quot;
        </Alert>
      )}
    </VStack>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import {
  Button,
  ConfigProvider,
  Empty,
  Tag,
  useI18n,
  useLocale,
  type SupportedLanguage,
} from "minerva-design";

// a key from the React library's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "ja", "fr"];

function Preview() {
  // t() translates the React library's own strings with its built-in translator,
  // in the language of the closest ConfigProvider
  const { t, language } = useI18n();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        useI18n().language: <Tag color="primary">{language}</Tag> {AVATAR_KEY}:{" "}
        <Tag color="info">{t(AVATAR_KEY)}</Tag>
      </div>
      {/* built-in component labels follow the language too */}
      <Empty size="small" />
    </>
  );
}

// Inside a ConfigProvider (this site has one at the root) useLocale only
// manages the state: the root provider owns the React library's global language. The
// chosen locale is applied to the preview with a nested ConfigProvider.
export default function UseLocaleDemo() {
  const [locale, setLocale] = useLocale({ language: "en" });

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8 }}
      >
        {LANGUAGES.map((language) => (
          <Button
            key={language}
            size="small"
            color={language === locale.language ? "primary" : "neutral"}
            variant={language === locale.language ? "solid" : "outline"}
            aria-pressed={language === locale.language}
            onClick={() => setLocale({ language })}
          >
            {language}
          </Button>
        ))}
      </div>
      <ConfigProvider locale={locale}>
        <Preview />
      </ConfigProvider>
    </div>
  );
}
`})))()}var Y,X,Z,Q;function $(){return($=e((()=>{I(),R(),H(),W(),K(),J(),i(),t(),re(),ve(),Ce(),s(),Te(),Y=n(),X=Se(Object.assign({"./demos/use-auto-theme.tsx":De,"./demos/use-disclosure.tsx":Oe,"./demos/use-locale.tsx":Ae}),Object.assign({"./demos/use-auto-theme.tsx":U,"./demos/use-disclosure.tsx":G,"./demos/use-locale.tsx":q})),Z=`import { Button, useAutoTheme, useLocale } from "minerva-design";

// This is what ConfigProvider does internally. Use the hooks instead of
// (not inside) a ConfigProvider: both write the same global state.
export function ThemeAndLanguage() {
  const [theme, setTheme] = useAutoTheme("auto");
  const [locale, setLocale] = useLocale({ language: "fr" });

  return (
    <>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme
      </Button>
      <Button onClick={() => setLocale({ language: "en" })}>
        {locale.language}
      </Button>
    </>
  );
}`,Q=()=>{let{t:e}=ne(),t=[{name:`useAutoTheme`,signature:`(initialTheme?: Theme) => [theme: Theme, setTheme: Dispatch<SetStateAction<Theme>>, systemTheme: "light" | "dark"]`,description:e(`docs.hooks.reference.useAutoTheme`)},{name:`useLocale`,signature:`(initialLocale?: Locale) => [locale: Locale, setLocale: Dispatch<SetStateAction<Locale>>]`,description:e(`docs.hooks.reference.useLocale`)},{name:`useI18n`,signature:`() => { t: (key: string, options?: TranslateOptions) => string; language: SupportedLanguage }`,description:e(`docs.hooks.reference.useI18n`)},{name:`useDisclosure`,signature:`(props?: { isOpen?: boolean; defaultIsOpen?: boolean; onChange?: (isOpen: boolean) => void }) => { isOpen: boolean; onOpen: () => void; onClose: () => void; onToggle: () => void }`,description:e(`docs.hooks.reference.useDisclosure`)},{name:`cn`,signature:`(...inputs: ClassValue[]) => string`,description:e(`docs.hooks.reference.cn`)}],n=(0,Y.jsxs)(`section`,{className:c.section,"aria-labelledby":`reference`,children:[(0,Y.jsx)(`h2`,{id:`reference`,children:e(`docs.hooks.reference.title`)}),(0,Y.jsx)(`p`,{className:c.prose,children:e(`docs.hooks.reference.text`)}),(0,Y.jsx)(`div`,{className:c.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.hooks.reference.title`),children:(0,Y.jsxs)(ee,{className:c.propsTable,children:[(0,Y.jsx)(o,{children:(0,Y.jsxs)(a,{children:[(0,Y.jsx)(r,{scope:`col`,children:e(`docs.hooks.reference.hook`)}),(0,Y.jsx)(r,{scope:`col`,children:e(`docs.hooks.reference.signature`)}),(0,Y.jsx)(r,{scope:`col`,children:e(`doc.description`)})]})}),(0,Y.jsx)(te,{children:t.map(e=>(0,Y.jsxs)(a,{children:[(0,Y.jsx)(r,{scope:`row`,children:(0,Y.jsx)(`code`,{className:c.propName,children:e.name})}),(0,Y.jsx)(l,{children:(0,Y.jsx)(`code`,{className:c.propType,children:e.signature})}),(0,Y.jsx)(l,{children:e.description})]},e.name))})]})}),(0,Y.jsx)(`p`,{className:c.callout,children:e(`docs.hooks.reference.global`)})]});return(0,Y.jsx)(we,{id:`hooks`,demos:X,intro:n,children:(0,Y.jsxs)(`section`,{className:c.section,"aria-labelledby":`standalone`,children:[(0,Y.jsx)(`h2`,{id:`standalone`,children:e(`docs.hooks.standalone.title`)}),(0,Y.jsx)(`p`,{className:c.prose,children:e(`docs.hooks.standalone.text`)}),(0,Y.jsx)(ye,{code:Z,language:`tsx`})]})})}})))()}$();export{Q as default};