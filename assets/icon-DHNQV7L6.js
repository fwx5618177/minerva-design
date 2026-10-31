import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as ee,z as a}from"./ProgressIndicator-BMZ0rR7D.js";import{i as te,r as ne}from"./CodeBlock-D5dsgj-R.js";import{i as re,r as o}from"./DemoBlock-CrPVu7R1.js";import{l as ie,n as ae,t as oe,u as se}from"./DocPage-BdPOW9nQ.js";import{n as s,t as c}from"./Icon-BQtpTFA2.js";import{n as ce,r as le}from"./path-C13Lj7jV.js";import{C as ue,D as de,E as fe,O as pe,S as me,T as he,_ as ge,d as _e,f as ve,g as ye,i as be,n as xe,o as Se,p as Ce,t as l,u as we,v as Te,w as u,y as Ee}from"./icons.module-DpZs9fUp.js";function d({name:e,...t}){let n=Se(e);return n?(0,f.jsx)(c,{...t,icon:n}):null}var f;function p(){return(p=e((()=>{s(),be(),f=n()})))()}function m(e){function t(t){return(0,h.jsx)(c,{...t,icon:e})}return t.displayName=`${g(e.name)}Icon`,t}var h,g;function _(){return(_=e((()=>{s(),h=n(),g=e=>e.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())})))()}var v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{he(),me(),Te(),Ce(),_(),v=m(ue),y=m(fe),b=m(pe),x=m(de),S=m(u),C=m(ve),w=m(ye),T=m(_e),E=m(we),D=m(ge),O=m(Ee)})))()}function De(e){let{name:t,paths:n,category:r,tags:i}=e;if(!A.test(t))throw TypeError(`Invalid icon name "${t}": use kebab-case (e.g. "my-icon")`);if(!n.length)throw TypeError(`Icon "${t}" has no paths`);for(let e of n)le(e);return Object.freeze({name:t,paths:Object.freeze([...n]),...r!==void 0&&{category:r},...i!==void 0&&{tags:Object.freeze([...i])}})}var A;function j(){return(j=e((()=>{ce(),A=/^[a-z0-9]+(?:-[a-z0-9]+)*$/})))()}function Oe(){return(0,M.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,M.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,M.jsx)(D,{size:18,color:`var(--success-color)`}),`Saved`]}),(0,M.jsx)(E,{color:`var(--warning-color)`,title:`Warning`}),(0,M.jsx)(ne,{icon:(0,M.jsx)(S,{size:18}),"aria-label":`Settings`})]})}var M;function N(){return(N=e((()=>{te(),k(),M=n()})))()}function ke(){return(0,P.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,P.jsx)(v,{}),(0,P.jsx)(y,{}),(0,P.jsx)(S,{}),(0,P.jsx)(a,{startIcon:(0,P.jsx)(x,{size:16}),children:`Download`}),(0,P.jsx)(a,{color:`danger`,variant:`outline`,startIcon:(0,P.jsx)(b,{size:16}),children:`Delete`})]})}var P;function F(){return(F=e((()=>{ee(),k(),P=n()})))()}function Ae({renderer:e}){let{t}=r(`common`,{keyPrefix:`docs.icon.data`}),[n,i]=(0,I.useState)(null);return(0,L.jsxs)(`span`,{className:l.cell,children:[(0,L.jsx)(c,{icon:u,size:40,color:`var(--primary-color)`,renderer:e,onRendererChange:i}),(0,L.jsx)(`code`,{children:e}),(0,L.jsx)(`span`,{className:l.kind,children:e===`svg`?`SVG`:n??t(`starting`)})]})}function je(){return(0,L.jsx)(`div`,{className:l.row,children:Me.map(e=>(0,L.jsx)(Ae,{renderer:e},e))})}var I,L,Me;function R(){return(R=e((()=>{I=t(),i(),s(),he(),xe(),L=n(),Me=[`svg`,`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`]})))()}function Ne(){return(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,z.jsx)(V,{}),(0,z.jsx)(V,{size:40,color:`var(--primary-color)`}),(0,z.jsx)(c,{icon:B,size:40,renderer:`auto`})]})}var z,B,V;function H(){return(H=e((()=>{_(),j(),s(),z=n(),B=De({name:`rocket`,category:`custom`,tags:[`launch`,`ship`],paths:[`M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z`,`M12 9.5h.01`,`M7 13l-3 3v3h3`,`M17 13l3 3v3h-3`,`M10 19.5l2 1.5 2-1.5`]}),V=m(B)})))()}function Pe(){return(0,U.jsx)(`ul`,{style:{display:`grid`,gap:8,margin:0,padding:0},children:W.map(e=>(0,U.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,U.jsx)(d,{name:e.icon,size:18}),(0,U.jsx)(`span`,{style:{minWidth:80},children:e.name}),(0,U.jsx)(d,{name:e.status,size:18,color:G[e.status],title:e.status})]},e.name))})}var U,W,G;function K(){return(K=e((()=>{p(),U=n(),W=[{name:`Storage`,icon:`database`,status:`check-circle`},{name:`Mail`,icon:`mail`,status:`alert-triangle`},{name:`Payments`,icon:`credit-card`,status:`x-circle`}],G={"check-circle":`var(--success-color)`,"alert-triangle":`var(--warning-color)`,"x-circle":`var(--danger-color)`}})))()}function Fe(){return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,q.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:J.map(e=>(0,q.jsx)(w,{size:e},e))}),(0,q.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,q.jsx)(T,{color:`var(--danger-color)`}),(0,q.jsx)(w,{color:`var(--warning-color)`}),(0,q.jsx)(C,{color:`var(--primary-color)`}),(0,q.jsxs)(`span`,{style:{color:`var(--link-color)`,fontSize:20},children:[(0,q.jsx)(C,{size:`1em`}),` 1em follows the font size`]})]})]})}var q,J;function Ie(){return(Ie=e((()=>{k(),q=n(),J=[16,20,24,32,48]})))()}function Le(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,Y.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:Re.map(e=>(0,Y.jsx)(O,{size:32,strokeWidth:e},e))}),(0,Y.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[X.map(e=>(0,Y.jsx)(O,{size:e,strokeWidth:1.5},e)),X.map(e=>(0,Y.jsx)(O,{size:e,strokeWidth:1.5,absoluteStrokeWidth:!0},`absolute-${e}`))]})]})}var Y,Re,X;function ze(){return(ze=e((()=>{k(),Y=n(),Re=[1,1.5,2,2.5,3],X=[16,24,48]})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { IconButton } from "minerva-design";
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
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { Button } from "minerva-design";
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
`})))()}var Z;function We(){return(We=e((()=>{Z=`import { useState } from "react";
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
`})))()}var Q,$e,et,tt;function $(){return($=e((()=>{N(),F(),R(),H(),K(),Ie(),ze(),Ve(),Ue(),We(),Ke(),Je(),Xe(),Qe(),t(),i(),ae(),re(),se(),Q=n(),$e=ie(Object.assign({"./demos/accessibility.tsx":Oe,"./demos/basic.tsx":ke,"./demos/canvas.tsx":je,"./demos/custom.tsx":Ne,"./demos/dynamic.tsx":Pe,"./demos/size-color.tsx":Fe,"./demos/stroke.tsx":Le}),Object.assign({"./demos/accessibility.tsx":Be,"./demos/basic.tsx":He,"./demos/canvas.tsx":Z,"./demos/custom.tsx":Ge,"./demos/dynamic.tsx":qe,"./demos/size-color.tsx":Ye,"./demos/stroke.tsx":Ze})),et=`import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`,tt=()=>{let{t:e}=r(),t=(0,Q.jsxs)(`section`,{className:o.section,"aria-labelledby":`icon-rendering`,children:[(0,Q.jsx)(`h2`,{id:`icon-rendering`,children:e(`docs.icon.intro.title`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.icon.intro.svg`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.icon.intro.canvas`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.icon.intro.bundle`)})]});return(0,Q.jsx)(oe,{id:`icon`,demos:$e,intro:t,importCode:et})}})))()}$();export{tt as default};