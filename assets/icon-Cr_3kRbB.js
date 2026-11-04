import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-H48cQemk.js";import{R as a,z as o}from"./ProgressIndicator-CLQ5GhV8.js";import{i as ee,r as te}from"./CodeBlock-BfjU5DKs.js";import{n as ne,t as s}from"./CodeBlock-DZiHGYLn.js";import{i as re,r as c}from"./DemoBlock-DI0dn9QQ.js";import{C as ie,E as ae,J as oe,S as se,T as l,_ as ce,b as le,c as ue,d as de,f as fe,g as pe,i as me,l as he,m as ge,q as _e,r as ve,u as ye,w as be,x as xe}from"./angular-preview-DKTVr4S_.js";import{l as Se,n as Ce,t as we,u as Te}from"./DocPage-H_eicMmS.js";import{n as u,t as d}from"./Icon-Ci415t6c.js";import{n as Ee,t as f}from"./icons.module-Bp0voVzQ.js";function De(e){let{name:t,paths:n,colors:r,category:i,tags:a}=e;if(!Oe.test(t))throw TypeError(`Invalid icon name "${t}": use kebab-case (e.g. "my-icon")`);if(!n.length)throw TypeError(`Icon "${t}" has no paths`);for(let e of n)oe(e);if(r!==void 0&&r.length!==n.length)throw TypeError(`Icon "${t}" has ${r.length} colors for ${n.length} paths`);return Object.freeze({name:t,paths:Object.freeze([...n]),...r!==void 0&&{colors:Object.freeze([...r])},...i!==void 0&&{category:i},...a!==void 0&&{tags:Object.freeze([...a])}})}var Oe;function p(){return(p=e((()=>{_e(),Oe=/^[a-z0-9]+(?:-[a-z0-9]+)*$/})))()}function m({name:e,...t}){let n=ve(e);return n?(0,h.jsx)(d,{...t,icon:n}):null}var h;function g(){return(g=e((()=>{u(),me(),h=n()})))()}function _(e){function t(t){return(0,v.jsx)(d,{...t,icon:e})}return t.displayName=`${y(e.name)}Icon`,t}var v,y;function b(){return(b=e((()=>{u(),v=n(),y=e=>e.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())})))()}var x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{l(),xe(),pe(),ye(),b(),x=_(le),S=_(ae),C=_(ie),w=_(be),T=_(se),E=_(he),D=_(fe),O=_(ge),k=_(ue),A=_(de),j=_(ce)})))()}function ke(){return(0,N.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,N.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,N.jsx)(A,{size:18,color:`var(--success-color)`}),`Saved`]}),(0,N.jsx)(k,{color:`var(--warning-color)`,title:`Warning`}),(0,N.jsx)(te,{icon:(0,N.jsx)(T,{size:18}),"aria-label":`Settings`})]})}var N;function P(){return(P=e((()=>{ee(),M(),N=n()})))()}function Ae(){return(0,F.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,F.jsx)(x,{}),(0,F.jsx)(S,{}),(0,F.jsx)(T,{}),(0,F.jsx)(o,{startIcon:(0,F.jsx)(w,{size:16}),children:`Download`}),(0,F.jsx)(o,{color:`danger`,variant:`outline`,startIcon:(0,F.jsx)(C,{size:16}),children:`Delete`})]})}var F;function I(){return(I=e((()=>{a(),M(),F=n()})))()}function je({renderer:e}){let{t}=r(`common`,{keyPrefix:`docs.icon.data`}),[n,i]=(0,L.useState)(null);return(0,R.jsxs)(`span`,{className:f.cell,children:[(0,R.jsx)(d,{icon:se,size:40,color:`var(--primary-color)`,renderer:e,onRendererChange:i}),(0,R.jsx)(`code`,{children:e}),(0,R.jsx)(`span`,{className:f.kind,children:e===`svg`?`SVG`:n??t(`starting`)})]})}function Me(){return(0,R.jsx)(`div`,{className:f.row,children:z.map(e=>(0,R.jsx)(je,{renderer:e},e))})}var L,R,z;function B(){return(B=e((()=>{L=t(),i(),u(),l(),Ee(),R=n(),z=[`svg`,`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`]})))()}function Ne(){return(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,V.jsx)(U,{}),(0,V.jsx)(U,{size:40,color:`var(--primary-color)`}),(0,V.jsx)(d,{icon:H,size:40,renderer:`auto`})]})}var V,H,U;function W(){return(W=e((()=>{b(),p(),u(),V=n(),H=De({name:`rocket`,category:`custom`,tags:[`launch`,`ship`],paths:[`M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z`,`M12 9.5h.01`,`M7 13l-3 3v3h3`,`M17 13l3 3v3h-3`,`M10 19.5l2 1.5 2-1.5`]}),U=_(H)})))()}function Pe(){return(0,G.jsx)(`ul`,{style:{display:`grid`,gap:8,margin:0,padding:0},children:K.map(e=>(0,G.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,G.jsx)(m,{name:e.icon,size:18}),(0,G.jsx)(`span`,{style:{minWidth:80},children:e.name}),(0,G.jsx)(m,{name:e.status,size:18,color:q[e.status],title:e.status})]},e.name))})}var G,K,q;function J(){return(J=e((()=>{g(),G=n(),K=[{name:`Storage`,icon:`database`,status:`check-circle`},{name:`Mail`,icon:`mail`,status:`alert-triangle`},{name:`Payments`,icon:`credit-card`,status:`x-circle`}],q={"check-circle":`var(--success-color)`,"alert-triangle":`var(--warning-color)`,"x-circle":`var(--danger-color)`}})))()}function Fe(){return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,Y.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:Ie.map(e=>(0,Y.jsx)(D,{size:e},e))}),(0,Y.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,Y.jsx)(O,{color:`var(--danger-color)`}),(0,Y.jsx)(D,{color:`var(--warning-color)`}),(0,Y.jsx)(E,{color:`var(--primary-color)`}),(0,Y.jsxs)(`span`,{style:{color:`var(--link-color)`,fontSize:20},children:[(0,Y.jsx)(E,{size:`1em`}),` 1em follows the font size`]})]})]})}var Y,Ie;function Le(){return(Le=e((()=>{M(),Y=n(),Ie=[16,20,24,32,48]})))()}function Re(){return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,X.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:ze.map(e=>(0,X.jsx)(j,{size:32,strokeWidth:e},e))}),(0,X.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[Z.map(e=>(0,X.jsx)(j,{size:e,strokeWidth:1.5},e)),Z.map(e=>(0,X.jsx)(j,{size:e,strokeWidth:1.5,absoluteStrokeWidth:!0},`absolute-${e}`))]})]})}var X,ze,Z;function Be(){return(Be=e((()=>{M(),X=n(),ze=[1,1.5,2,2.5,3],Z=[16,24,48]})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { IconButton } from "minerva-design";
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
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { Button } from "minerva-design";
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
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useState } from "react";
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
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { createIcon, defineIcon, Icon } from "minerva-design/icons";

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
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { DynamicIcon } from "minerva-design/icons";

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
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { BellIcon, HeartIcon, StarIcon } from "minerva-design/icons";

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
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { CloudIcon } from "minerva-design/icons";

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
`})))()}var Q,tt,nt,rt,it,at,ot;function $(){return($=e((()=>{P(),I(),B(),W(),J(),Le(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),t(),i(),ne(),Ce(),re(),Te(),Q=n(),tt=Se(Object.assign({"./demos/accessibility.tsx":ke,"./demos/basic.tsx":Ae,"./demos/canvas.tsx":Me,"./demos/custom.tsx":Ne,"./demos/dynamic.tsx":Pe,"./demos/size-color.tsx":Fe,"./demos/stroke.tsx":Re}),Object.assign({"./demos/accessibility.tsx":Ve,"./demos/basic.tsx":Ue,"./demos/canvas.tsx":Ge,"./demos/custom.tsx":qe,"./demos/dynamic.tsx":Ye,"./demos/size-color.tsx":Ze,"./demos/stroke.tsx":$e})),nt=`import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`,rt=`// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set`,it=`import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode`,at=`// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(\`src/assets/tab-home-\${state}.png\`, await rasterize(svg));
}`,ot=()=>{let{t:e}=r(),t=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`section`,{className:c.section,"aria-labelledby":`icon-rendering`,children:[(0,Q.jsx)(`h2`,{id:`icon-rendering`,children:e(`docs.icon.intro.title`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.svg`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.canvas`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.bundle`)})]}),(0,Q.jsxs)(`section`,{className:c.section,"aria-labelledby":`icon-platforms`,children:[(0,Q.jsx)(`h2`,{id:`icon-platforms`,children:e(`docs.icon.platforms.title`)}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.platforms.native`)}),(0,Q.jsx)(s,{language:`tsx`,code:rt}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.platforms.taro`)}),(0,Q.jsx)(s,{language:`tsx`,code:it}),(0,Q.jsx)(`p`,{className:c.prose,children:e(`docs.icon.platforms.tabBar`)}),(0,Q.jsx)(s,{language:`ts`,code:at})]})]});return(0,Q.jsx)(we,{id:`icon`,demos:tt,intro:t,importCode:nt})}})))()}$();export{ot as default};