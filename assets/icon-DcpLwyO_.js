import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CwX9iNKD.js";import{C as a,E as ee,J as te,S as o,T as ne,_ as re,b as ie,c as ae,d as oe,g as se,h as ce,i as le,l as ue,m as de,q as fe,r as pe,u as me,w as he,x as ge}from"./angular-preview-CDGnma-W.js";import{R as _e,z as s}from"./ProgressIndicator-DFLRjI1q.js";import{i as ve,r as ye}from"./CodeBlock-CML6qu3s.js";import{i as be,r as c}from"./DemoBlock-DqagUkhM.js";import{l as xe,n as Se,t as Ce,u as we}from"./DocPage-BZlunoBE.js";import{n as l,t as u}from"./Icon-Bea6t7pY.js";import{n as Te,t as d}from"./icons.module-Bp0voVzQ.js";function Ee(e){let{name:t,paths:n,colors:r,category:i,tags:a}=e;if(!f.test(t))throw TypeError(`Invalid icon name "${t}": use kebab-case (e.g. "my-icon")`);if(!n.length)throw TypeError(`Icon "${t}" has no paths`);for(let e of n)te(e);if(r!==void 0&&r.length!==n.length)throw TypeError(`Icon "${t}" has ${r.length} colors for ${n.length} paths`);return Object.freeze({name:t,paths:Object.freeze([...n]),...r!==void 0&&{colors:Object.freeze([...r])},...i!==void 0&&{category:i},...a!==void 0&&{tags:Object.freeze([...a])}})}var f;function p(){return(p=e((()=>{fe(),f=/^[a-z0-9]+(?:-[a-z0-9]+)*$/})))()}function m({name:e,...t}){let n=pe(e);return n?(0,h.jsx)(u,{...t,icon:n}):null}var h;function De(){return(De=e((()=>{l(),le(),h=n()})))()}function g(e){function t(t){return(0,_.jsx)(u,{...t,icon:e})}return t.displayName=`${v(e.name)}Icon`,t}var _,v;function y(){return(y=e((()=>{l(),_=n(),v=e=>e.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())})))()}var b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{a(),ie(),se(),oe(),y(),b=g(ge),x=g(he),S=g(ee),C=g(ne),w=g(o),T=g(me),E=g(de),D=g(ue),O=g(ae),k=g(ce),A=g(re)})))()}function Oe(){return(0,M.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,M.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,M.jsx)(k,{size:18,color:`var(--success-color)`}),`Saved`]}),(0,M.jsx)(O,{color:`var(--warning-color)`,title:`Warning`}),(0,M.jsx)(ye,{icon:(0,M.jsx)(w,{size:18}),"aria-label":`Settings`})]})}var M;function N(){return(N=e((()=>{ve(),j(),M=n()})))()}function ke(){return(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,P.jsx)(b,{}),(0,P.jsx)(x,{}),(0,P.jsx)(w,{}),(0,P.jsx)(s,{startIcon:(0,P.jsx)(C,{size:16}),children:`Download`}),(0,P.jsx)(s,{color:`danger`,variant:`outline`,startIcon:(0,P.jsx)(S,{size:16}),children:`Delete`})]})}var P;function F(){return(F=e((()=>{_e(),j(),P=n()})))()}function Ae({renderer:e}){let{t}=r(`common`,{keyPrefix:`docs.icon.data`}),[n,i]=(0,I.useState)(null);return(0,L.jsxs)(`span`,{className:d.cell,children:[(0,L.jsx)(u,{icon:o,size:40,color:`var(--primary-color)`,renderer:e,onRendererChange:i}),(0,L.jsx)(`code`,{children:e}),(0,L.jsx)(`span`,{className:d.kind,children:e===`svg`?`SVG`:n??t(`starting`)})]})}function je(){return(0,L.jsx)(`div`,{className:d.row,children:R.map(e=>(0,L.jsx)(Ae,{renderer:e},e))})}var I,L,R;function z(){return(z=e((()=>{I=t(),i(),l(),a(),Te(),L=n(),R=[`svg`,`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`]})))()}function Me(){return(0,B.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,B.jsx)(H,{}),(0,B.jsx)(H,{size:40,color:`var(--primary-color)`}),(0,B.jsx)(u,{icon:V,size:40,renderer:`auto`})]})}var B,V,H;function Ne(){return(Ne=e((()=>{y(),p(),l(),B=n(),V=Ee({name:`rocket`,category:`custom`,tags:[`launch`,`ship`],paths:[`M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z`,`M12 9.5h.01`,`M7 13l-3 3v3h3`,`M17 13l3 3v3h-3`,`M10 19.5l2 1.5 2-1.5`]}),H=g(V)})))()}function Pe(){return(0,U.jsx)(`ul`,{style:{display:`grid`,gap:8,margin:0,padding:0},children:W.map(e=>(0,U.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,U.jsx)(m,{name:e.icon,size:18}),(0,U.jsx)(`span`,{style:{minWidth:80},children:e.name}),(0,U.jsx)(m,{name:e.status,size:18,color:G[e.status],title:e.status})]},e.name))})}var U,W,G;function K(){return(K=e((()=>{De(),U=n(),W=[{name:`Storage`,icon:`database`,status:`check-circle`},{name:`Mail`,icon:`mail`,status:`alert-triangle`},{name:`Payments`,icon:`credit-card`,status:`x-circle`}],G={"check-circle":`var(--success-color)`,"alert-triangle":`var(--warning-color)`,"x-circle":`var(--danger-color)`}})))()}function Fe(){return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,q.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:J.map(e=>(0,q.jsx)(E,{size:e},e))}),(0,q.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,q.jsx)(D,{color:`var(--danger-color)`}),(0,q.jsx)(E,{color:`var(--warning-color)`}),(0,q.jsx)(T,{color:`var(--primary-color)`}),(0,q.jsxs)(`span`,{style:{color:`var(--link-color)`,fontSize:20},children:[(0,q.jsx)(T,{size:`1em`}),` 1em follows the font size`]})]})]})}var q,J;function Y(){return(Y=e((()=>{j(),q=n(),J=[16,20,24,32,48]})))()}function Ie(){return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,X.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:Le.map(e=>(0,X.jsx)(A,{size:32,strokeWidth:e},e))}),(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[Z.map(e=>(0,X.jsx)(A,{size:e,strokeWidth:1.5},e)),Z.map(e=>(0,X.jsx)(A,{size:e,strokeWidth:1.5,absoluteStrokeWidth:!0},`absolute-${e}`))]})]})}var X,Le,Z;function Re(){return(Re=e((()=>{j(),X=n(),Le=[1,1.5,2,2.5,3],Z=[16,24,48]})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { IconButton } from "minerva-design";
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
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { Button } from "minerva-design";
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
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useState } from "react";
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
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { createIcon, defineIcon, Icon } from "minerva-design/icons";

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
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { DynamicIcon } from "minerva-design/icons";

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
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { BellIcon, HeartIcon, StarIcon } from "minerva-design/icons";

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
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { CloudIcon } from "minerva-design/icons";

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
`})))()}var Q,$e,et,tt;function $(){return($=e((()=>{N(),F(),z(),Ne(),K(),Y(),Re(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),t(),i(),Se(),be(),we(),Q=n(),$e=xe(Object.assign({"./demos/accessibility.tsx":Oe,"./demos/basic.tsx":ke,"./demos/canvas.tsx":je,"./demos/custom.tsx":Me,"./demos/dynamic.tsx":Pe,"./demos/size-color.tsx":Fe,"./demos/stroke.tsx":Ie}),Object.assign({"./demos/accessibility.tsx":ze,"./demos/basic.tsx":Ve,"./demos/canvas.tsx":Ue,"./demos/custom.tsx":Ge,"./demos/dynamic.tsx":qe,"./demos/size-color.tsx":Ye,"./demos/stroke.tsx":Ze})),et=`import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`,tt=()=>{let{t:e}=r(),t=(0,Q.jsxs)(`section`,{className:c.section,"aria-labelledby":`icon-rendering`,children:[(0,Q.jsx)(`h2`,{id:`icon-rendering`,children:e(`docs.icon.intro.title`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.svg`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.canvas`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.bundle`)})]});return(0,Q.jsx)(Ce,{id:`icon`,demos:$e,intro:t,importCode:et})}})))()}$();export{tt as default};