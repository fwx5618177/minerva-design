import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,Dt as i,Ot as a,St as o}from"./io5-BqFjv7-4.js";import{It as s,T as ee,_ as te,ut as c,w as ne,z as re}from"./angular-preview-DpazifeG.js";import{H as ie,K as l,R as u,U as ae,X as oe,Y as se,q as d,z as f}from"./ProgressIndicator-vVpDij6t.js";import{n as ce,t as le}from"./Empty-x96XqOLN.js";import{n as ue,t as de}from"./Alert-BG5G94IQ.js";import{n as p,t as m}from"./Tag-2CAtIxcH.js";import{n as fe,t as pe}from"./CodeBlock-C3JALRK0.js";import{n as me,r as h,t as g}from"./ConfigProvider-C8dYhtUo.js";import{i as _,n as he,r as v}from"./Stack-Dm06KfNV.js";import{a as y,c as ge,d as b,f as _e,i as ve,l as ye,r as x,s as be,u as S}from"./DemoBlock-BLFoxU1o.js";import{l as xe,n as Se,t as Ce,u as we}from"./DocPage-DpI9GKki.js";var C,w,T,Te,E,D;function O(){return(O=e((()=>{l(),C=t(),ee(),w=`(prefers-color-scheme: dark)`,T=e=>{if(typeof window>`u`||!window.matchMedia)return()=>{};let t=window.matchMedia(w);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},Te=()=>()=>{},E=()=>`light`,D=(e=`auto`)=>{let[t,n]=(0,C.useState)(e),[r,i]=(0,C.useState)(e);e!==r&&(i(e),n(e));let a=t===`auto`||t===`system`||te(t),o=(0,C.useSyncExternalStore)(a?T:Te,ne,E),s=(0,C.useContext)(d)!==null;return(0,C.useEffect)(()=>{s||re(t,o)},[s,t,o]),[t,n,o]}})))()}var k,A;function j(){return(j=e((()=>{oe(),l(),k=t(),A=(e={language:`en`})=>{let[t,n]=(0,k.useState)(e),[r,i]=(0,k.useState)(e.language);e.language!==r&&(i(e.language),n({language:e.language}));let a=(0,k.useContext)(d)!==null;return(0,k.useEffect)(()=>{a||se(t.language??`en`)},[a,t.language]),[t,n]}})))()}function Ee(e={}){let{isOpen:t,defaultIsOpen:n,onChange:r}=e,[i,a]=o({value:t,defaultValue:n??!1,onChange:r,name:`useDisclosure`,prop:`isOpen`,defaultProp:`defaultIsOpen`});return{isOpen:i,onOpen:(0,M.useCallback)(()=>a(!0),[a]),onClose:(0,M.useCallback)(()=>a(!1),[a]),onToggle:(0,M.useCallback)(()=>a(e=>!e),[a])}}var M;function N(){return(N=e((()=>{r(),M=t()})))()}function De(){let{theme:e=`auto`}=me(),[t,n,r]=D(e);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,P.jsxs)(`div`,{role:`group`,"aria-label":`Theme`,style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[F.map(e=>(0,P.jsx)(f,{size:`small`,color:e===t?`primary`:`neutral`,variant:e===t?`solid`:`outline`,"aria-pressed":e===t,onClick:()=>n(e),children:String(e)},String(e))),(0,P.jsx)(f,{size:`small`,color:`neutral`,variant:`ghost`,onClick:()=>n(e),children:`Reset`})]}),(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[`theme:`,` `,(0,P.jsx)(m,{color:`primary`,children:typeof t==`string`?t:`custom`}),` `,`systemTheme: `,(0,P.jsx)(m,{color:`info`,children:r})]}),(0,P.jsx)(g,{theme:t,children:(0,P.jsx)(`div`,{style:{padding:16,borderRadius:8,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`},children:(0,P.jsxs)(_,{gap:4,wrap:!0,children:[(0,P.jsx)(f,{color:`primary`,children:`Primary`}),(0,P.jsx)(f,{color:`neutral`,variant:`outline`,children:`Secondary`}),(0,P.jsx)(m,{color:`success`,children:`preview`})]})})})]})}var P,F;function I(){return(I=e((()=>{u(),h(),v(),p(),O(),P=n(),F=[`auto`,`light`,`dark`,`github-dark`]})))()}function Oe(){let e=Ee({defaultIsOpen:!0});return(0,L.jsxs)(he,{gap:4,children:[(0,L.jsxs)(_,{gap:4,wrap:!0,children:[(0,L.jsx)(f,{size:`small`,color:`primary`,onClick:e.onToggle,children:`Toggle`}),(0,L.jsx)(f,{size:`small`,color:`neutral`,variant:`outline`,onClick:e.onOpen,children:`Open`}),(0,L.jsx)(f,{size:`small`,color:`neutral`,variant:`outline`,onClick:e.onClose,children:`Close`}),`isOpen:`,` `,(0,L.jsx)(m,{color:e.isOpen?`success`:`info`,children:String(e.isOpen)})]}),e.isOpen&&(0,L.jsxs)(de,{color:`info`,title:`Details`,className:c(`disclosure-panel`,e.isOpen&&`is-open`),children:[`className = "`,c(`disclosure-panel`,e.isOpen&&`is-open`),`"`]})]})}var L;function R(){return(R=e((()=>{ue(),u(),s(),v(),p(),N(),L=n()})))()}function ke(){let{t:e,language:t}=ie();return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[`useI18n().language: `,(0,z.jsx)(m,{color:`primary`,children:t}),` `,B,`:`,` `,(0,z.jsx)(m,{color:`info`,children:e(B)})]}),(0,z.jsx)(le,{size:`small`})]})}function Ae(){let[e,t]=A({language:`en`});return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,z.jsx)(`div`,{role:`group`,"aria-label":`Language`,style:{display:`flex`,gap:8},children:V.map(n=>(0,z.jsx)(f,{size:`small`,color:n===e.language?`primary`:`neutral`,variant:n===e.language?`solid`:`outline`,"aria-pressed":n===e.language,onClick:()=>t({language:n}),children:n},n))}),(0,z.jsx)(g,{locale:e,children:(0,z.jsx)(ke,{})})]})}var z,B,V;function H(){return(H=e((()=>{u(),h(),ce(),p(),ae(),j(),z=n(),B=`avatar.default`,V=[`en`,`zh`,`ja`,`fr`]})))()}var U;function W(){return(W=e((()=>{U=`import {
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
`})))()}var Y,X,Z,Q;function $(){return($=e((()=>{I(),R(),H(),W(),K(),J(),ge(),t(),i(),fe(),Se(),ve(),we(),Y=n(),X=xe(Object.assign({"./demos/use-auto-theme.tsx":De,"./demos/use-disclosure.tsx":Oe,"./demos/use-locale.tsx":Ae}),Object.assign({"./demos/use-auto-theme.tsx":U,"./demos/use-disclosure.tsx":G,"./demos/use-locale.tsx":q})),Z=`import { Button, useAutoTheme, useLocale } from "minerva-design";

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
}`,Q=()=>{let{t:e}=a(),t=[{name:`useAutoTheme`,signature:`(initialTheme?: Theme) => [theme: Theme, setTheme: Dispatch<SetStateAction<Theme>>, systemTheme: "light" | "dark"]`,description:e(`docs.hooks.reference.useAutoTheme`)},{name:`useLocale`,signature:`(initialLocale?: Locale) => [locale: Locale, setLocale: Dispatch<SetStateAction<Locale>>]`,description:e(`docs.hooks.reference.useLocale`)},{name:`useI18n`,signature:`() => { t: (key: string, options?: TranslateOptions) => string; language: SupportedLanguage }`,description:e(`docs.hooks.reference.useI18n`)},{name:`useDisclosure`,signature:`(props?: { isOpen?: boolean; defaultIsOpen?: boolean; onChange?: (isOpen: boolean) => void }) => { isOpen: boolean; onOpen: () => void; onClose: () => void; onToggle: () => void }`,description:e(`docs.hooks.reference.useDisclosure`)},{name:`cn`,signature:`(...inputs: ClassValue[]) => string`,description:e(`docs.hooks.reference.cn`)}],n=(0,Y.jsxs)(`section`,{className:x.section,"aria-labelledby":`reference`,children:[(0,Y.jsx)(`h2`,{id:`reference`,children:e(`docs.hooks.reference.title`)}),(0,Y.jsx)(`p`,{className:x.prose,children:e(`docs.hooks.reference.text`)}),(0,Y.jsx)(`div`,{className:x.tableWrapper,tabIndex:0,role:`region`,"aria-label":e(`docs.hooks.reference.title`),children:(0,Y.jsxs)(ye,{className:x.propsTable,children:[(0,Y.jsx)(_e,{children:(0,Y.jsxs)(b,{children:[(0,Y.jsx)(y,{scope:`col`,children:e(`docs.hooks.reference.hook`)}),(0,Y.jsx)(y,{scope:`col`,children:e(`docs.hooks.reference.signature`)}),(0,Y.jsx)(y,{scope:`col`,children:e(`doc.description`)})]})}),(0,Y.jsx)(be,{children:t.map(e=>(0,Y.jsxs)(b,{children:[(0,Y.jsx)(y,{scope:`row`,children:(0,Y.jsx)(`code`,{className:x.propName,children:e.name})}),(0,Y.jsx)(S,{children:(0,Y.jsx)(`code`,{className:x.propType,children:e.signature})}),(0,Y.jsx)(S,{children:e.description})]},e.name))})]})}),(0,Y.jsx)(`p`,{className:x.callout,children:e(`docs.hooks.reference.global`)})]});return(0,Y.jsx)(Ce,{id:`hooks`,demos:X,intro:n,children:(0,Y.jsxs)(`section`,{className:x.section,"aria-labelledby":`standalone`,children:[(0,Y.jsx)(`h2`,{id:`standalone`,children:e(`docs.hooks.standalone.title`)}),(0,Y.jsx)(`p`,{className:x.prose,children:e(`docs.hooks.standalone.text`)}),(0,Y.jsx)(pe,{code:Z,language:`tsx`})]})})}})))()}$();export{Q as default};