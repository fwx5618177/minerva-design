import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,Dt as i,E as a,Et as ee,N as o,Ot as s,R as te,X as c,b as ne,bt as re,et as l,ht as u,kt as d,ot as ie,pt as ae,s as f}from"./icons-BnhBUHMa.js";import{n as p,t as m}from"./useTranslation-StcUNaFZ.js";import{R as oe,z as h}from"./ProgressIndicator-CXNTCbma.js";import{i as se,r as ce}from"./CodeBlock-CuxMOUBV.js";import{n as le,t as g}from"./CodeBlock-Caszo6Fo.js";import{i as ue,r as _}from"./DemoBlock-cKdBOOtK.js";import{Mt as de,i as fe,ln as pe,r as me,un as he,zt as ge}from"./angular-preview-Dbp_07Jo.js";import{l as _e,n as ve,t as ye,u as be}from"./DocPage--2U8TgOE.js";import{n as xe,t as v}from"./icons.module-Bp0voVzQ.js";function y({name:e,...t}){let n=me(e);return n?(0,b.jsx)(s,{...t,icon:n}):null}var b;function x(){return(x=e((()=>{d(),fe(),b=n()})))()}function Se(e){let{name:t,paths:n,colors:r,category:i,tags:a}=e;if(!S.test(t))throw TypeError(`Invalid icon name "${t}": use kebab-case (e.g. "my-icon")`);if(!n.length)throw TypeError(`Icon "${t}" has no paths`);for(let e of n)he(e);if(r!==void 0&&r.length!==n.length)throw TypeError(`Icon "${t}" has ${r.length} colors for ${n.length} paths`);return Object.freeze({name:t,paths:Object.freeze([...n]),...r!==void 0&&{colors:Object.freeze([...r])},...i!==void 0&&{category:i},...a!==void 0&&{tags:Object.freeze([...a])}})}var S;function C(){return(C=e((()=>{pe(),S=/^[a-z0-9]+(?:-[a-z0-9]+)*$/})))()}function Ce(){return(0,w.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,w.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,w.jsx)(a,{size:18,color:`var(--success-color)`}),`Saved`]}),(0,w.jsx)(r,{color:`var(--warning-color)`,title:`Warning`}),(0,w.jsx)(ce,{icon:(0,w.jsx)(f,{size:18}),"aria-label":`Settings`})]})}var w;function T(){return(T=e((()=>{se(),c(),w=n()})))()}function we(){return(0,E.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,E.jsx)(ae,{}),(0,E.jsx)(te,{}),(0,E.jsx)(f,{}),(0,E.jsx)(h,{startIcon:(0,E.jsx)(ne,{size:16}),children:`Download`}),(0,E.jsx)(h,{color:`danger`,variant:`outline`,startIcon:(0,E.jsx)(re,{size:16}),children:`Delete`})]})}var E;function D(){return(D=e((()=>{oe(),c(),E=n()})))()}function Te({renderer:e}){let{t}=p(`common`,{keyPrefix:`docs.icon.data`}),[n,r]=(0,O.useState)(null);return(0,k.jsxs)(`span`,{className:v.cell,children:[(0,k.jsx)(s,{icon:de,size:40,color:`var(--primary-color)`,renderer:e,onRendererChange:r}),(0,k.jsx)(`code`,{children:e}),(0,k.jsx)(`span`,{className:v.kind,children:e===`svg`?`SVG`:n??t(`starting`)})]})}function Ee(){return(0,k.jsx)(`div`,{className:v.row,children:A.map(e=>(0,k.jsx)(Te,{renderer:e},e))})}var O,k,A;function j(){return(j=e((()=>{O=t(),m(),d(),ge(),xe(),k=n(),A=[`svg`,`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`]})))()}function De(){return(0,M.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,M.jsx)(P,{}),(0,M.jsx)(P,{size:40,color:`var(--primary-color)`}),(0,M.jsx)(s,{icon:N,size:40,renderer:`auto`})]})}var M,N,P;function F(){return(F=e((()=>{ee(),C(),d(),M=n(),N=Se({name:`rocket`,category:`custom`,tags:[`launch`,`ship`],paths:[`M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z`,`M12 9.5h.01`,`M7 13l-3 3v3h3`,`M17 13l3 3v3h-3`,`M10 19.5l2 1.5 2-1.5`]}),P=i(N)})))()}function Oe(){return(0,I.jsx)(`ul`,{style:{display:`grid`,gap:8,margin:0,padding:0},children:L.map(e=>(0,I.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,I.jsx)(y,{name:e.icon,size:18}),(0,I.jsx)(`span`,{style:{minWidth:80},children:e.name}),(0,I.jsx)(y,{name:e.status,size:18,color:R[e.status],title:e.status})]},e.name))})}var I,L,R;function z(){return(z=e((()=>{x(),I=n(),L=[{name:`Storage`,icon:`database`,status:`check-circle`},{name:`Mail`,icon:`mail`,status:`alert-triangle`},{name:`Payments`,icon:`credit-card`,status:`x-circle`}],R={"check-circle":`var(--success-color)`,"alert-triangle":`var(--warning-color)`,"x-circle":`var(--danger-color)`}})))()}function ke(){return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,B.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:V.map(e=>(0,B.jsx)(l,{size:e},e))}),(0,B.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,B.jsx)(ie,{color:`var(--danger-color)`}),(0,B.jsx)(l,{color:`var(--warning-color)`}),(0,B.jsx)(o,{color:`var(--primary-color)`}),(0,B.jsxs)(`span`,{style:{color:`var(--link-color)`,fontSize:20},children:[(0,B.jsx)(o,{size:`1em`}),` 1em follows the font size`]})]})]})}var B,V;function Ae(){return(Ae=e((()=>{c(),B=n(),V=[16,20,24,32,48]})))()}function je(){return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,H.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:U.map(e=>(0,H.jsx)(u,{size:32,strokeWidth:e},e))}),(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[W.map(e=>(0,H.jsx)(u,{size:e,strokeWidth:1.5},e)),W.map(e=>(0,H.jsx)(u,{size:e,strokeWidth:1.5,absoluteStrokeWidth:!0},`absolute-${e}`))]})]})}var H,U,W;function G(){return(G=e((()=>{c(),H=n(),U=[1,1.5,2,2.5,3],W=[16,24,48]})))()}var K;function q(){return(q=e((()=>{K=`import { IconButton } from "minerva-design";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  SettingsIcon,
} from "minerva-design/icons";

export default function AccessibilityDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      {/* decorative: the text says it all (aria-hidden) */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <CheckCircleIcon size={18} color="var(--success-color)" />
        Saved
      </span>
      {/* meaningful on its own: a title makes it role="img" */}
      <AlertTriangleIcon color="var(--warning-color)" title="Warning" />
      {/* inside a control: the control carries the name */}
      <IconButton icon={<SettingsIcon size={18} />} aria-label="Settings" />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Button } from "minerva-design";
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "minerva-design/icons";

export default function BasicDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <HomeIcon />
      <SearchIcon />
      <SettingsIcon />
      <Button startIcon={<DownloadIcon size={16} />}>Download</Button>
      <Button
        color="danger"
        variant="outline"
        startIcon={<TrashIcon size={16} />}
      >
        Delete
      </Button>
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Icon,
  settingsIcon,
  type IconRenderer,
  type IconRendererKind,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const RENDERERS: IconRenderer[] = [
  "svg",
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

function Cell({ renderer }: { renderer: IconRenderer }) {
  const { t } = useTranslation("common", { keyPrefix: "docs.icon.data" });
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  return (
    <span className={styles.cell}>
      <Icon
        icon={settingsIcon}
        size={40}
        color="var(--primary-color)"
        renderer={renderer}
        onRendererChange={setDrawn}
      />
      <code>{renderer}</code>
      <span className={styles.kind}>
        {renderer === "svg" ? "SVG" : (drawn ?? t("starting"))}
      </span>
    </span>
  );
}

// "auto" follows the renderer bar at the top of the page; a forced backend
// that cannot start here falls back to the next one
export default function CanvasDemo() {
  return (
    <div className={styles.row}>
      {RENDERERS.map((renderer) => (
        <Cell key={renderer} renderer={renderer} />
      ))}
    </div>
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { createIcon, defineIcon, Icon } from "minerva-design/icons";

// a custom icon on the same 24×24 grid (strokes only, round caps and joins)
const rocketIcon = defineIcon({
  name: "rocket",
  category: "custom",
  tags: ["launch", "ship"],
  paths: [
    "M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z",
    "M12 9.5h.01",
    "M7 13l-3 3v3h3",
    "M17 13l3 3v3h-3",
    "M10 19.5l2 1.5 2-1.5",
  ],
});

// a component like the built-in ones
const RocketIcon = createIcon(rocketIcon);

export default function CustomDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <RocketIcon />
      <RocketIcon size={40} color="var(--primary-color)" />
      {/* or through the generic Icon, on any renderer */}
      <Icon icon={rocketIcon} size={40} renderer="auto" />
    </div>
  );
}
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import { DynamicIcon } from "minerva-design/icons";

// icon names coming from data (an API, a CMS, a settings file…)
const services = [
  { name: "Storage", icon: "database", status: "check-circle" },
  { name: "Mail", icon: "mail", status: "alert-triangle" },
  { name: "Payments", icon: "credit-card", status: "x-circle" },
];

const COLORS: Record<string, string> = {
  "check-circle": "var(--success-color)",
  "alert-triangle": "var(--warning-color)",
  "x-circle": "var(--danger-color)",
};

export default function DynamicDemo() {
  return (
    <ul style={{ display: "grid", gap: 8, margin: 0, padding: 0 }}>
      {services.map((service) => (
        <li
          key={service.name}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <DynamicIcon name={service.icon} size={18} />
          <span style={{ minWidth: 80 }}>{service.name}</span>
          <DynamicIcon
            name={service.status}
            size={18}
            color={COLORS[service.status]}
            title={service.status}
          />
        </li>
      ))}
    </ul>
  );
}
`})))()}var Q;function Ie(){return(Ie=e((()=>{Q=`import { BellIcon, HeartIcon, StarIcon } from "minerva-design/icons";

const SIZES = [16, 20, 24, 32, 48];

export default function SizeColorDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {SIZES.map((size) => (
          <StarIcon key={size} size={size} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <HeartIcon color="var(--danger-color)" />
        <StarIcon color="var(--warning-color)" />
        <BellIcon color="var(--primary-color)" />
        {/* currentColor: follows the text color, here a link color */}
        <span style={{ color: "var(--link-color)", fontSize: 20 }}>
          <BellIcon size="1em" /> 1em follows the font size
        </span>
      </div>
    </div>
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { CloudIcon } from "minerva-design/icons";

const STROKES = [1, 1.5, 2, 2.5, 3];
const SIZES = [16, 24, 48];

export default function StrokeDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {STROKES.map((strokeWidth) => (
          <CloudIcon key={strokeWidth} size={32} strokeWidth={strokeWidth} />
        ))}
      </div>
      {/* scaled stroke (default) vs. a constant 1.5px stroke */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {SIZES.map((size) => (
          <CloudIcon key={size} size={size} strokeWidth={1.5} />
        ))}
        {SIZES.map((size) => (
          <CloudIcon
            key={\`absolute-\${size}\`}
            size={size}
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        ))}
      </div>
    </div>
  );
}
`})))()}var $,ze,Be,Ve,He,Ue,We;function Ge(){return(Ge=e((()=>{T(),D(),j(),F(),z(),Ae(),G(),q(),Y(),Z(),Ne(),Fe(),Ie(),Re(),t(),m(),le(),ve(),ue(),be(),$=n(),ze=_e(Object.assign({"./demos/accessibility.tsx":Ce,"./demos/basic.tsx":we,"./demos/canvas.tsx":Ee,"./demos/custom.tsx":De,"./demos/dynamic.tsx":Oe,"./demos/size-color.tsx":ke,"./demos/stroke.tsx":je}),Object.assign({"./demos/accessibility.tsx":K,"./demos/basic.tsx":J,"./demos/canvas.tsx":X,"./demos/custom.tsx":Me,"./demos/dynamic.tsx":Pe,"./demos/size-color.tsx":Q,"./demos/stroke.tsx":Le})),Be=`import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`,Ve=`// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set`,He=`import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode`,Ue=`// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(\`src/assets/tab-home-\${state}.png\`, await rasterize(svg));
}`,We=()=>{let{t:e}=p(),t=(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:_.section,"aria-labelledby":`icon-rendering`,children:[(0,$.jsx)(`h2`,{id:`icon-rendering`,children:e(`docs.icon.intro.title`)}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.icon.intro.svg`)}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.icon.intro.canvas`)}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.icon.intro.bundle`)})]}),(0,$.jsxs)(`section`,{className:_.section,"aria-labelledby":`icon-platforms`,children:[(0,$.jsx)(`h2`,{id:`icon-platforms`,children:e(`docs.icon.platforms.title`)}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.icon.platforms.native`)}),(0,$.jsx)(g,{language:`tsx`,code:Ve}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.icon.platforms.taro`)}),(0,$.jsx)(g,{language:`tsx`,code:He}),(0,$.jsx)(`p`,{className:_.prose,children:e(`docs.icon.platforms.tabBar`)}),(0,$.jsx)(g,{language:`ts`,code:Ue})]})]});return(0,$.jsx)(ye,{id:`icon`,demos:ze,intro:t,importCode:Be})}})))()}Ge();export{We as default};