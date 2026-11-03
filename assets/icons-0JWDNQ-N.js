import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{c as a,s as o}from"./renderer.module-CrbCsaDg.js";import{n as s,t as c}from"./useTranslation-BG92nugL.js";import{n as l,t as u}from"./Input-B-_C7F3z.js";import{i as d,n as f,r as p,t as m}from"./Radio-y1-55x53.js";import{n as h,t as g}from"./Empty-DwRDS5tj.js";import{n as _,t as v}from"./CodeBlock-BxRzDT4x.js";import{a as y,i as b,n as ee,r as x}from"./Toast-WJFH_Vm7.js";import{i as S,r as C}from"./DemoBlock-ChlHcr0e.js";import{i as te,o as w,t as T}from"./Select-CFOiLa6C.js";import{a as E,i as D,n as ne,t as re}from"./angular-preview-DKTVr4S_.js";import{l as O,n as k,t as A,u as j}from"./DocPage-DcuZLbHF.js";import{n as M,t as N}from"./Icon-Ci415t6c.js";import{n as P,t as F}from"./icons.module-Bp0voVzQ.js";function I(){let{t:e}=s(`common`,{keyPrefix:`docs.icons.data`}),[t,n]=(0,L.useState)(``),[r,i]=(0,L.useState)(`all`),[a,o]=(0,L.useState)(24),[c,u]=(0,L.useState)(2),[f,p]=(0,L.useState)(`svg`),[h,_]=(0,L.useState)(`all`),[v,y]=(0,L.useState)(`text`),x=(0,L.useMemo)(()=>{let e=ne(t).filter(e=>(r===`all`||e.category===r)&&(h===`all`||h===`multicolor`===H(e)));return E.map(t=>({key:t,icons:e.filter(e=>e.category===t)})).filter(e=>e.icons.length>0)},[t,r,h]),S=x.reduce((e,{icons:t})=>e+t.length,0),C=async t=>{let n=U(t);try{if(!navigator.clipboard)throw Error(`clipboard unavailable`);await navigator.clipboard.writeText(n),b.success(e(`copied`,{code:n}),{id:`icon-copy`})}catch{b.danger(e(`copyFailed`,{code:n}),{id:`icon-copy`})}};return(0,R.jsxs)(`div`,{className:F.stage,children:[(0,R.jsx)(ee,{position:`top-center`}),(0,R.jsxs)(`div`,{className:F.toolbar,children:[(0,R.jsx)(l,{type:`search`,className:F.search,size:`small`,clearable:!0,value:t,onChange:e=>n(e.target.value),onClear:()=>n(``),placeholder:e(`searchPlaceholder`),"aria-label":e(`search`)}),(0,R.jsxs)(w,{size:`small`,style:{width:170},"aria-label":e(`category`),value:r,onChange:i,children:[(0,R.jsx)(T,{value:`all`,children:e(`all`)}),E.map(t=>(0,R.jsx)(T,{value:t,children:e(`categories.${t}`)},t))]}),(0,R.jsxs)(w,{size:`small`,style:{width:130},"aria-label":e(`kind`),value:h,onChange:_,children:[(0,R.jsx)(T,{value:`all`,children:e(`kinds.all`)}),(0,R.jsx)(T,{value:`monochrome`,children:e(`kinds.monochrome`)}),(0,R.jsx)(T,{value:`multicolor`,children:e(`kinds.multicolor`)})]}),(0,R.jsx)(w,{size:`small`,style:{width:130},"aria-label":e(`color`),value:v,onChange:e=>y(e),children:Object.keys(V).map(t=>(0,R.jsx)(T,{value:t,children:e(`tones.${t}`)},t))}),(0,R.jsx)(d,{"aria-label":e(`size`),direction:`horizontal`,size:`small`,value:String(a),onChange:e=>o(Number(e)),children:z.map(e=>(0,R.jsx)(m,{value:String(e),label:`${e}px`},e))}),(0,R.jsx)(d,{"aria-label":e(`stroke`),direction:`horizontal`,size:`small`,value:String(c),onChange:e=>u(Number(e)),children:B.map(e=>(0,R.jsx)(m,{value:String(e),label:String(e)},e))}),(0,R.jsxs)(d,{"aria-label":e(`render`),direction:`horizontal`,size:`small`,value:f,onChange:e=>p(e),children:[(0,R.jsx)(m,{value:`svg`,label:e(`svg`)}),(0,R.jsx)(m,{value:`canvas`,label:e(`canvas`)})]})]}),(0,R.jsx)(`div`,{className:F.body,children:x.length?x.map(({key:t,icons:n})=>(0,R.jsxs)(`section`,{className:F.categoryGroup,children:[(0,R.jsxs)(`h3`,{className:F.categoryTitle,children:[e(`categories.${t}`),(0,R.jsx)(`span`,{className:F.categoryCount,children:n.length})]}),(0,R.jsx)(`div`,{className:F.grid,children:n.map(t=>(0,R.jsxs)(`button`,{type:`button`,className:F.tile,title:e(`copy`,{code:U(t)}),onClick:()=>void C(t),children:[(0,R.jsx)(N,{icon:t,size:a,color:V[v],strokeWidth:c,renderer:f===`svg`?`svg`:`auto`}),(0,R.jsx)(`span`,{className:F.tileName,children:t.name})]},t.name))})]},t)):(0,R.jsx)(g,{description:e(`empty`,{query:t})})}),(0,R.jsx)(`div`,{className:F.footer,children:(0,R.jsx)(`p`,{children:e(`count`,{n:S})})})]})}var L,R,z,B,V,H,U;function W(){return(W=e((()=>{L=t(),c(),h(),u(),f(),p(),te(),x(),y(),M(),D(),P(),R=n(),z=[16,20,24,32],B=[1.5,2,2.5],V={text:void 0,primary:`var(--primary-color)`,success:`var(--success-color)`,warning:`var(--warning-color)`,danger:`var(--danger-color)`},H=e=>!!e.colors?.some(Boolean),U=e=>`<${e.name.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())}Icon />`})))()}var G;function K(){return(K=e((()=>{G=`import { useMemo, useState } from "react";
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
`})))()}var q,J,Y,X,Z,Q;function $(){return($=e((()=>{W(),K(),t(),a(),c(),r(),_(),D(),k(),S(),j(),q=n(),J=O(Object.assign({"./demos/gallery.tsx":I}),Object.assign({"./demos/gallery.tsx":G})),Y=`// React: one component per icon, the generic Icon and the GPU IconCanvas
import { SearchIcon, Icon, IconCanvas } from "minerva-design/icons";
// framework-free: icon data, SVG strings, Canvas2D and GPU drawing
import { searchIcon, toSvg, createIconCanvas } from "minerva-design/icons/core";`,X=`import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas`,Z=[`design`,`svg`,`renderers`,`treeShaking`,`frameworks`],Q=()=>{let{t:e}=s(),t=(0,q.jsx)(q.Fragment,{children:(0,q.jsxs)(`section`,{className:C.section,"aria-labelledby":`icons-overview`,children:[(0,q.jsx)(`h2`,{id:`icons-overview`,children:e(`docs.icons.intro.title`)}),(0,q.jsx)(`p`,{className:C.prose,children:e(`docs.icons.intro.text`,{count:re.length,categories:E.length})}),(0,q.jsx)(`ul`,{className:C.prose,children:Z.map(t=>(0,q.jsx)(`li`,{children:e(`docs.icons.intro.${t}`)},t))}),(0,q.jsx)(v,{language:`tsx`,code:X}),(0,q.jsx)(`p`,{className:C.prose,children:(0,q.jsx)(o,{i18nKey:`docs.icons.intro.pages`,components:{icon:(0,q.jsx)(i,{to:`/icon`}),canvas:(0,q.jsx)(i,{to:`/icon-canvas`}),core:(0,q.jsx)(i,{to:`/icons-core`})}})})]})});return(0,q.jsx)(A,{id:`icons`,demos:J,intro:t,importCode:Y})}})))()}$();export{Q as default};