import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-DxNxqLAt.js";import{c as a,s as o}from"./renderer.module-D9QNJ_X7.js";import{n as s,t as c}from"./useTranslation-6aaLoXIt.js";import{n as l,t as u}from"./Input-vrV6fRUF.js";import{i as d,n as f,r as p,t as m}from"./Radio-B_5YyC0f.js";import{n as h,t as g}from"./Empty-D3XradJm.js";import{n as _,t as v}from"./CodeBlock-CrrB2MCp.js";import{i as y,r as b}from"./DemoBlock-oNTJ0QHK.js";import{i as x,o as S,t as C}from"./Select-DPf5fWSY.js";import{a as w,i as T,n as E,t as D}from"./angular-preview-DKTVr4S_.js";import{l as O,n as k,t as A,u as j}from"./DocPage-CmI5o3x2.js";import{n as M,t as N}from"./Icon-Ci415t6c.js";import{n as P,t as F}from"./icons.module-Bp0voVzQ.js";function I(){let{t:e}=s(`common`,{keyPrefix:`docs.icons.data`}),[t,n]=(0,L.useState)(``),[r,i]=(0,L.useState)(`all`),[a,o]=(0,L.useState)(24),[c,u]=(0,L.useState)(2),[f,p]=(0,L.useState)(`svg`),[h,_]=(0,L.useState)(null),v=(0,L.useMemo)(()=>{let e=E(t).filter(e=>r===`all`||e.category===r);return w.map(t=>({key:t,icons:e.filter(e=>e.category===t)})).filter(e=>e.icons.length>0)},[t,r]),y=v.reduce((e,{icons:t})=>e+t.length,0),b=e=>{let t=V(e);navigator.clipboard?.writeText(t).then(()=>_(t),()=>_(null))};return(0,R.jsxs)(`div`,{className:F.stage,children:[(0,R.jsxs)(`div`,{className:F.toolbar,children:[(0,R.jsx)(l,{type:`search`,className:F.search,size:`small`,clearable:!0,value:t,onChange:e=>n(e.target.value),onClear:()=>n(``),placeholder:e(`searchPlaceholder`),"aria-label":e(`search`)}),(0,R.jsxs)(S,{size:`small`,style:{width:170},"aria-label":e(`category`),value:r,onChange:i,children:[(0,R.jsx)(C,{value:`all`,children:e(`all`)}),w.map(t=>(0,R.jsx)(C,{value:t,children:e(`categories.${t}`)},t))]}),(0,R.jsx)(d,{"aria-label":e(`size`),direction:`horizontal`,size:`small`,value:String(a),onChange:e=>o(Number(e)),children:z.map(e=>(0,R.jsx)(m,{value:String(e),label:`${e}px`},e))}),(0,R.jsx)(d,{"aria-label":e(`stroke`),direction:`horizontal`,size:`small`,value:String(c),onChange:e=>u(Number(e)),children:B.map(e=>(0,R.jsx)(m,{value:String(e),label:String(e)},e))}),(0,R.jsxs)(d,{"aria-label":e(`render`),direction:`horizontal`,size:`small`,value:f,onChange:e=>p(e),children:[(0,R.jsx)(m,{value:`svg`,label:e(`svg`)}),(0,R.jsx)(m,{value:`canvas`,label:e(`canvas`)})]})]}),(0,R.jsx)(`div`,{className:F.body,children:v.length?v.map(({key:t,icons:n})=>(0,R.jsxs)(`section`,{className:F.categoryGroup,children:[(0,R.jsxs)(`h3`,{className:F.categoryTitle,children:[e(`categories.${t}`),(0,R.jsx)(`span`,{className:F.categoryCount,children:n.length})]}),(0,R.jsx)(`div`,{className:F.grid,children:n.map(t=>(0,R.jsxs)(`button`,{type:`button`,className:F.tile,title:e(`copy`,{code:V(t)}),onClick:()=>b(t),children:[(0,R.jsx)(N,{icon:t,size:a,strokeWidth:c,renderer:f===`svg`?`svg`:`auto`}),(0,R.jsx)(`span`,{className:F.tileName,children:t.name})]},t.name))})]},t)):(0,R.jsx)(g,{description:e(`empty`,{query:t})})}),(0,R.jsxs)(`div`,{className:F.footer,children:[(0,R.jsx)(`p`,{children:e(`count`,{n:y})}),(0,R.jsx)(`p`,{role:`status`,children:h?e(`copied`,{code:h}):``})]})]})}var L,R,z,B,V;function H(){return(H=e((()=>{L=t(),c(),h(),u(),f(),p(),x(),M(),T(),P(),R=n(),z=[16,20,24,32],B=[1.5,2,2.5],V=e=>`<${e.name.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())}Icon />`})))()}var U;function W(){return(W=e((()=>{U=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Empty,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "minerva-design";
import { Icon, type IconDefinition } from "minerva-design/icons";
import { iconCategories, searchIcons } from "minerva-design/icons/core";
import styles from "../icons.module.scss";

const SIZES = [16, 20, 24, 32];
const STROKES = [1.5, 2, 2.5];

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
  const [copied, setCopied] = useState<string | null>(null);

  // the whole set, grouped by category: the page scrolls, nothing is clipped
  const sections = useMemo(() => {
    const matches = searchIcons(query).filter(
      (icon) => category === "all" || icon.category === category,
    );
    return iconCategories
      .map((key) => ({
        key,
        icons: matches.filter((icon) => icon.category === key),
      }))
      .filter((section) => section.icons.length > 0);
  }, [query, category]);

  const total = sections.reduce((sum, { icons }) => sum + icons.length, 0);

  const copy = (icon: IconDefinition) => {
    const code = snippet(icon);
    void navigator.clipboard?.writeText(code).then(
      () => setCopied(code),
      () => setCopied(null),
    );
  };

  return (
    <div className={styles.stage}>
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
                    onClick={() => copy(icon)}
                  >
                    <Icon
                      icon={icon}
                      size={size}
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
        <p role="status">{copied ? t("copied", { code: copied }) : ""}</p>
      </div>
    </div>
  );
}
`})))()}var G,K,q,J,Y,X;function Z(){return(Z=e((()=>{H(),W(),t(),a(),c(),r(),_(),T(),k(),y(),j(),G=n(),K=O(Object.assign({"./demos/gallery.tsx":I}),Object.assign({"./demos/gallery.tsx":U})),q=`// React: one component per icon, the generic Icon and the GPU IconCanvas
import { SearchIcon, Icon, IconCanvas } from "minerva-design/icons";
// framework-free: icon data, SVG strings, Canvas2D and GPU drawing
import { searchIcon, toSvg, createIconCanvas } from "minerva-design/icons/core";`,J=`import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas`,Y=[`design`,`svg`,`renderers`,`treeShaking`,`frameworks`],X=()=>{let{t:e}=s(),t=(0,G.jsx)(G.Fragment,{children:(0,G.jsxs)(`section`,{className:b.section,"aria-labelledby":`icons-overview`,children:[(0,G.jsx)(`h2`,{id:`icons-overview`,children:e(`docs.icons.intro.title`)}),(0,G.jsx)(`p`,{className:b.prose,children:e(`docs.icons.intro.text`,{count:D.length,categories:w.length})}),(0,G.jsx)(`ul`,{className:b.prose,children:Y.map(t=>(0,G.jsx)(`li`,{children:e(`docs.icons.intro.${t}`)},t))}),(0,G.jsx)(v,{language:`tsx`,code:J}),(0,G.jsx)(`p`,{className:b.prose,children:(0,G.jsx)(o,{i18nKey:`docs.icons.intro.pages`,components:{icon:(0,G.jsx)(i,{to:`/icon`}),canvas:(0,G.jsx)(i,{to:`/icon-canvas`}),core:(0,G.jsx)(i,{to:`/icons-core`})}})})]})});return(0,G.jsx)(A,{id:`icons`,demos:K,intro:t,importCode:q})}})))()}Z();export{X as default};