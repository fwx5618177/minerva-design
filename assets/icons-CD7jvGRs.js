import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{Ot as ee,kt as a}from"./icons-BnhBUHMa.js";import{n as o,t as s}from"./Trans-9P08kyxI.js";import{n as c,t as l}from"./useTranslation-BuRShUHp.js";import{n as u,t as te}from"./Input-CczNyxGC.js";import{i as d,n as f,r as p,t as m}from"./Radio-DwPyGyYW.js";import{n as h,t as ne}from"./Empty-5f-PTXG1.js";import{a as g,n as _,o as v}from"./Select-VJRJGrLe.js";import{n as y,t as b}from"./CodeBlock-cZcVWW5w.js";import{n as x,t as S}from"./Box-BDXEFwki.js";import{i as re,n as C,r as ie}from"./Stack-NslbKtAY.js";import{a as ae,i as w,n as oe,r as se}from"./Toast-BKAfqc-H.js";import{i as ce,r as T}from"./DemoBlock-yJ6oj9cP.js";import{a as E,i as D,n as le,t as ue}from"./angular-preview-Dbp_07Jo.js";import{_ as de,c as fe,d as pe,f as me,g as he,h as ge,l as _e,m as ve,p as ye,s as be,u as xe,v as Se,y as Ce}from"./registry-CP0mr4tn.js";import{l as O,n as k,t as A,u as we}from"./DocPage-B93OiV4a.js";import{n as Te,t as j}from"./icons.module-Bp0voVzQ.js";function Ee(){return(0,M.jsx)(re,{wrap:!0,gap:6,align:`center`,children:N.map(({name:e,Icon:t,color:n})=>(0,M.jsxs)(C,{gap:2,align:`center`,style:{minWidth:80},children:[(0,M.jsx)(t,{size:32,color:n}),(0,M.jsx)(x,{as:`span`,children:e})]},e))})}var M,N;function P(){return(P=e((()=>{ie(),S(),ge(),M=n(),N=[{name:`GitHub`,Icon:ve,color:`currentColor`},{name:`React`,Icon:me,color:`#0898bb`},{name:`Vue`,Icon:he,color:`#269b70`},{name:`Angular`,Icon:Ce,color:`#ed426b`},{name:`WeChat`,Icon:ye,color:`#18ad63`},{name:`Svelte`,Icon:Se,color:`#ef653d`},{name:`Solid`,Icon:xe,color:`#589bd1`},{name:`HTML5`,Icon:be,color:`#e87737`},{name:`Apple`,Icon:de,color:`currentColor`},{name:`Android`,Icon:pe,color:`#269b70`},{name:`Linux`,Icon:_e,color:`currentColor`},{name:`Windows`,Icon:fe,color:`#0078d4`}]})))()}function De(){let{t:e}=c(`common`,{keyPrefix:`docs.icons.data`}),[t,n]=(0,F.useState)(``),[r,i]=(0,F.useState)(`all`),[a,o]=(0,F.useState)(24),[s,l]=(0,F.useState)(2),[u,f]=(0,F.useState)(`svg`),[p,h]=(0,F.useState)(`all`),[g,y]=(0,F.useState)(`text`),b=(0,F.useMemo)(()=>{let e=le(t).filter(e=>(r===`all`||e.category===r)&&(p===`all`||p===`multicolor`===B(e)));return E.map(t=>({key:t,icons:e.filter(e=>e.category===t)})).filter(e=>e.icons.length>0)},[t,r,p]),x=b.reduce((e,{icons:t})=>e+t.length,0),S=async t=>{let n=V(t);try{if(!navigator.clipboard)throw Error(`clipboard unavailable`);await navigator.clipboard.writeText(n),w.success(e(`copied`,{code:n}),{id:`icon-copy`})}catch{w.danger(e(`copyFailed`,{code:n}),{id:`icon-copy`})}};return(0,I.jsxs)(`div`,{className:j.stage,children:[(0,I.jsx)(oe,{position:`top-center`}),(0,I.jsxs)(`div`,{className:j.toolbar,children:[(0,I.jsx)(te,{type:`search`,className:j.search,size:`small`,clearable:!0,value:t,onChange:e=>n(e.target.value),onClear:()=>n(``),placeholder:e(`searchPlaceholder`),"aria-label":e(`search`)}),(0,I.jsxs)(_,{size:`small`,style:{width:170},"aria-label":e(`category`),value:r,onChange:i,children:[(0,I.jsx)(v,{value:`all`,children:e(`all`)}),E.map(t=>(0,I.jsx)(v,{value:t,children:e(`categories.${t}`)},t))]}),(0,I.jsxs)(_,{size:`small`,style:{width:130},"aria-label":e(`kind`),value:p,onChange:h,children:[(0,I.jsx)(v,{value:`all`,children:e(`kinds.all`)}),(0,I.jsx)(v,{value:`monochrome`,children:e(`kinds.monochrome`)}),(0,I.jsx)(v,{value:`multicolor`,children:e(`kinds.multicolor`)})]}),(0,I.jsx)(_,{size:`small`,style:{width:130},"aria-label":e(`color`),value:g,onChange:e=>y(e),children:Object.keys(z).map(t=>(0,I.jsx)(v,{value:t,children:e(`tones.${t}`)},t))}),(0,I.jsx)(d,{"aria-label":e(`size`),direction:`horizontal`,size:`small`,value:String(a),onChange:e=>o(Number(e)),children:L.map(e=>(0,I.jsx)(m,{value:String(e),label:`${e}px`},e))}),(0,I.jsx)(d,{"aria-label":e(`stroke`),direction:`horizontal`,size:`small`,value:String(s),onChange:e=>l(Number(e)),children:R.map(e=>(0,I.jsx)(m,{value:String(e),label:String(e)},e))}),(0,I.jsxs)(d,{"aria-label":e(`render`),direction:`horizontal`,size:`small`,value:u,onChange:e=>f(e),children:[(0,I.jsx)(m,{value:`svg`,label:e(`svg`)}),(0,I.jsx)(m,{value:`canvas`,label:e(`canvas`)})]})]}),(0,I.jsx)(`div`,{className:j.body,children:b.length?b.map(({key:t,icons:n})=>(0,I.jsxs)(`section`,{className:j.categoryGroup,children:[(0,I.jsxs)(`h3`,{className:j.categoryTitle,children:[e(`categories.${t}`),(0,I.jsx)(`span`,{className:j.categoryCount,children:n.length})]}),(0,I.jsx)(`div`,{className:j.grid,children:n.map(t=>(0,I.jsxs)(`button`,{type:`button`,className:j.tile,title:e(`copy`,{code:V(t)}),onClick:()=>void S(t),children:[(0,I.jsx)(ee,{icon:t,size:a,color:z[g],strokeWidth:s,renderer:u===`svg`?`svg`:`auto`}),(0,I.jsx)(`span`,{className:j.tileName,children:t.name})]},t.name))})]},t)):(0,I.jsx)(ne,{description:e(`empty`,{query:t})})}),(0,I.jsx)(`div`,{className:j.footer,children:(0,I.jsx)(`p`,{children:e(`count`,{n:x})})})]})}var F,I,L,R,z,B,V;function H(){return(H=e((()=>{F=t(),l(),h(),u(),f(),p(),g(),se(),ae(),a(),D(),Te(),I=n(),L=[16,20,24,32],R=[1.5,2,2.5],z={text:void 0,primary:`var(--primary-color)`,success:`var(--success-color)`,warning:`var(--warning-color)`,danger:`var(--danger-color)`},B=e=>!!e.colors?.some(Boolean),V=e=>`<${e.name.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())}Icon />`})))()}var U;function W(){return(W=e((()=>{U=`import { HStack, VStack, Box } from "minerva-design";
import {
  BrandGithubIcon,
  BrandReactIcon,
  BrandVueIcon,
  BrandAngularIcon,
  BrandWechatIcon,
  BrandSvelteIcon,
  BrandSolidIcon,
  BrandHtml5Icon,
  BrandAppleIcon,
  BrandAndroidIcon,
  BrandLinuxIcon,
  BrandWindowsIcon,
} from "minerva-design/icons";

const brands = [
  { name: "GitHub", Icon: BrandGithubIcon, color: "currentColor" },
  { name: "React", Icon: BrandReactIcon, color: "#0898bb" },
  { name: "Vue", Icon: BrandVueIcon, color: "#269b70" },
  { name: "Angular", Icon: BrandAngularIcon, color: "#ed426b" },
  { name: "WeChat", Icon: BrandWechatIcon, color: "#18ad63" },
  { name: "Svelte", Icon: BrandSvelteIcon, color: "#ef653d" },
  { name: "Solid", Icon: BrandSolidIcon, color: "#589bd1" },
  { name: "HTML5", Icon: BrandHtml5Icon, color: "#e87737" },
  { name: "Apple", Icon: BrandAppleIcon, color: "currentColor" },
  { name: "Android", Icon: BrandAndroidIcon, color: "#269b70" },
  { name: "Linux", Icon: BrandLinuxIcon, color: "currentColor" },
  { name: "Windows", Icon: BrandWindowsIcon, color: "#0078d4" },
];
export default function BrandsDemo() {
  return (
    <HStack wrap gap={6} align="center">
      {brands.map(({ name, Icon, color }) => (
        <VStack key={name} gap={2} align="center" style={{ minWidth: 80 }}>
          <Icon size={32} color={color} />
          <Box as="span">{name}</Box>
        </VStack>
      ))}
    </HStack>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Empty,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  ToastProvider,
  toast,
} from "minerva-design";
import { Icon, type IconDefinition } from "minerva-design/icons";
import { iconCategories, searchIcons } from "minerva-design/icons/core";
import styles from "../icons.module.scss";

const SIZES = [16, 20, 24, 32];
const STROKES = [1.5, 2, 2.5];
// the drawing color: what the paths without a color of their own follow
const TONES = {
  text: undefined,
  primary: "var(--primary-color)",
  success: "var(--success-color)",
  warning: "var(--warning-color)",
  danger: "var(--danger-color)",
} as const;
type Tone = keyof typeof TONES;

/** Icons whose paths carry colors of their own (\`colors\`) */
const isMulticolor = (icon: IconDefinition) =>
  Boolean(icon.colors?.some(Boolean));

/** \`arrow-up\` -> \`<ArrowUpIcon />\` */
const snippet = (icon: IconDefinition) =>
  \`<\${icon.name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) =>
    c.toUpperCase(),
  )}Icon />\`;

export default function GalleryDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons.data" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState(24);
  const [stroke, setStroke] = useState(2);
  // "canvas": every tile drawn by the backend of the renderer bar
  const [mode, setMode] = useState<"svg" | "canvas">("svg");
  // monochrome icons follow the color; multicolor ones keep their accents
  const [kind, setKind] = useState("all");
  const [tone, setTone] = useState<Tone>("text");

  // the whole set, grouped by category: the page scrolls, nothing is clipped
  const sections = useMemo(() => {
    const matches = searchIcons(query).filter(
      (icon) =>
        (category === "all" || icon.category === category) &&
        (kind === "all" || (kind === "multicolor") === isMulticolor(icon)),
    );
    return iconCategories
      .map((key) => ({
        key,
        icons: matches.filter((icon) => icon.category === key),
      }))
      .filter((section) => section.icons.length > 0);
  }, [query, category, kind]);

  const total = sections.reduce((sum, { icons }) => sum + icons.length, 0);

  const copy = async (icon: IconDefinition) => {
    const code = snippet(icon);
    try {
      // no clipboard outside secure contexts: report it instead of nothing
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(code);
      // one id: a new copy replaces the toast instead of stacking them
      toast.success(t("copied", { code }), { id: "icon-copy" });
    } catch {
      toast.danger(t("copyFailed", { code }), { id: "icon-copy" });
    }
  };

  return (
    <div className={styles.stage}>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="top-center" />
      <div className={styles.toolbar}>
        <Input
          type="search"
          className={styles.search}
          size="small"
          clearable
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder={t("searchPlaceholder")}
          aria-label={t("search")}
        />
        <Select
          size="small"
          style={{ width: 170 }}
          aria-label={t("category")}
          value={category}
          onChange={setCategory}
        >
          <SelectItem value="all">{t("all")}</SelectItem>
          {iconCategories.map((key) => (
            <SelectItem key={key} value={key}>
              {t(\`categories.\${key}\`)}
            </SelectItem>
          ))}
        </Select>
        <Select
          size="small"
          style={{ width: 130 }}
          aria-label={t("kind")}
          value={kind}
          onChange={setKind}
        >
          <SelectItem value="all">{t("kinds.all")}</SelectItem>
          <SelectItem value="monochrome">{t("kinds.monochrome")}</SelectItem>
          <SelectItem value="multicolor">{t("kinds.multicolor")}</SelectItem>
        </Select>
        <Select
          size="small"
          style={{ width: 130 }}
          aria-label={t("color")}
          value={tone}
          onChange={(value) => setTone(value as Tone)}
        >
          {Object.keys(TONES).map((key) => (
            <SelectItem key={key} value={key}>
              {t(\`tones.\${key}\`)}
            </SelectItem>
          ))}
        </Select>
        <RadioGroup
          aria-label={t("size")}
          direction="horizontal"
          size="small"
          value={String(size)}
          onChange={(value) => setSize(Number(value))}
        >
          {SIZES.map((value) => (
            <Radio key={value} value={String(value)} label={\`\${value}px\`} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("stroke")}
          direction="horizontal"
          size="small"
          value={String(stroke)}
          onChange={(value) => setStroke(Number(value))}
        >
          {STROKES.map((value) => (
            <Radio key={value} value={String(value)} label={String(value)} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("render")}
          direction="horizontal"
          size="small"
          value={mode}
          onChange={(value) => setMode(value as "svg" | "canvas")}
        >
          <Radio value="svg" label={t("svg")} />
          <Radio value="canvas" label={t("canvas")} />
        </RadioGroup>
      </div>
      <div className={styles.body}>
        {sections.length ? (
          sections.map(({ key, icons }) => (
            <section key={key} className={styles.categoryGroup}>
              <h3 className={styles.categoryTitle}>
                {t(\`categories.\${key}\`)}
                <span className={styles.categoryCount}>{icons.length}</span>
              </h3>
              <div className={styles.grid}>
                {icons.map((icon) => (
                  <button
                    key={icon.name}
                    type="button"
                    className={styles.tile}
                    title={t("copy", { code: snippet(icon) })}
                    onClick={() => void copy(icon)}
                  >
                    <Icon
                      icon={icon}
                      size={size}
                      color={TONES[tone]}
                      strokeWidth={stroke}
                      renderer={mode === "svg" ? "svg" : "auto"}
                    />
                    <span className={styles.tileName}>{icon.name}</span>
                  </button>
                ))}
              </div>
            </section>
          ))
        ) : (
          <Empty description={t("empty", { query })} />
        )}
      </div>
      <div className={styles.footer}>
        <p>{t("count", { n: total })}</p>
      </div>
    </div>
  );
}
`})))()}var q,J,Y,X,Z,Q;function $(){return($=e((()=>{P(),H(),W(),K(),t(),o(),l(),r(),y(),D(),k(),ce(),we(),q=n(),J=O(Object.assign({"./demos/brands.tsx":Ee,"./demos/gallery.tsx":De}),Object.assign({"./demos/brands.tsx":U,"./demos/gallery.tsx":G})),Y=`// React: one component per icon, the generic Icon and the GPU IconCanvas
import { SearchIcon, Icon, IconCanvas } from "minerva-design/icons";
// framework-free: icon data, SVG strings, Canvas2D and GPU drawing
import { searchIcon, toSvg, createIconCanvas } from "minerva-design/icons/core";`,X=`import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas`,Z=[`design`,`svg`,`renderers`,`treeShaking`,`frameworks`],Q=()=>{let{t:e}=c(),t=(0,q.jsx)(q.Fragment,{children:(0,q.jsxs)(`section`,{className:T.section,"aria-labelledby":`icons-overview`,children:[(0,q.jsx)(`h2`,{id:`icons-overview`,children:e(`docs.icons.intro.title`)}),(0,q.jsx)(`p`,{className:T.prose,children:e(`docs.icons.intro.text`,{count:ue.length,categories:E.length})}),(0,q.jsx)(`ul`,{className:T.prose,children:Z.map(t=>(0,q.jsx)(`li`,{children:e(`docs.icons.intro.${t}`)},t))}),(0,q.jsx)(b,{language:`tsx`,code:X}),(0,q.jsx)(`p`,{className:T.prose,children:(0,q.jsx)(s,{i18nKey:`docs.icons.intro.pages`,components:{icon:(0,q.jsx)(i,{to:`/icon`}),canvas:(0,q.jsx)(i,{to:`/icon-canvas`}),core:(0,q.jsx)(i,{to:`/icons-core`})}})})]})});return(0,q.jsx)(A,{id:`icons`,demos:J,intro:t,importCode:Y})}})))()}$();export{Q as default};