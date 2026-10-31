import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{C as a,E as ee,G as te,K as ne,S as o,T as re,_ as ie,b as ae,c as oe,d as se,g as ce,h as le,i as ue,l as de,m as fe,n as pe,u as me,w as he,x as ge}from"./angular-preview-CSWPEDZG.js";import{R as _e,z as s}from"./ProgressIndicator-CQZAxIX3.js";import{i as ve,r as ye}from"./CodeBlock-BAcNaQ2n.js";import{i as be,r as c}from"./DemoBlock-BXdX6oLT.js";import{l as xe,n as Se,t as Ce,u as we}from"./DocPage-CHJwIegD.js";import{n as l,t as u}from"./Icon-B3VFPnuy.js";import{n as Te,t as d}from"./icons.module-CofXGdmT.js";function Ee(e){let{name:t,paths:n,category:r,tags:i}=e;if(!f.test(t))throw TypeError(`Invalid icon name "${t}": use kebab-case (e.g. "my-icon")`);if(!n.length)throw TypeError(`Icon "${t}" has no paths`);for(let e of n)ne(e);return Object.freeze({name:t,paths:Object.freeze([...n]),...r!==void 0&&{category:r},...i!==void 0&&{tags:Object.freeze([...i])}})}var f;function p(){return(p=e((()=>{te(),f=/^[a-z0-9]+(?:-[a-z0-9]+)*$/})))()}function m({name:e,...t}){let n=ue(e);return n?(0,h.jsx)(u,{...t,icon:n}):null}var h;function g(){return(g=e((()=>{l(),pe(),h=n()})))()}function _(e){function t(t){return(0,v.jsx)(u,{...t,icon:e})}return t.displayName=`${y(e.name)}Icon`,t}var v,y;function b(){return(b=e((()=>{l(),v=n(),y=e=>e.replace(/(^|-)([a-z0-9])/g,(e,t,n)=>n.toUpperCase())})))()}var x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{a(),ae(),ce(),se(),b(),x=_(ge),S=_(he),C=_(ee),w=_(re),T=_(o),E=_(me),D=_(fe),O=_(de),k=_(oe),A=_(le),j=_(ie)})))()}function De(){return(0,N.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24},children:[(0,N.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,N.jsx)(A,{size:18,color:`var(--success-color)`}),`Saved`]}),(0,N.jsx)(k,{color:`var(--warning-color)`,title:`Warning`}),(0,N.jsx)(ye,{icon:(0,N.jsx)(T,{size:18}),"aria-label":`Settings`})]})}var N;function P(){return(P=e((()=>{ve(),M(),N=n()})))()}function Oe(){return(0,F.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,F.jsx)(x,{}),(0,F.jsx)(S,{}),(0,F.jsx)(T,{}),(0,F.jsx)(s,{startIcon:(0,F.jsx)(w,{size:16}),children:`Download`}),(0,F.jsx)(s,{color:`danger`,variant:`outline`,startIcon:(0,F.jsx)(C,{size:16}),children:`Delete`})]})}var F;function I(){return(I=e((()=>{_e(),M(),F=n()})))()}function ke({renderer:e}){let{t}=r(`common`,{keyPrefix:`docs.icon.data`}),[n,i]=(0,L.useState)(null);return(0,R.jsxs)(`span`,{className:d.cell,children:[(0,R.jsx)(u,{icon:o,size:40,color:`var(--primary-color)`,renderer:e,onRendererChange:i}),(0,R.jsx)(`code`,{children:e}),(0,R.jsx)(`span`,{className:d.kind,children:e===`svg`?`SVG`:n??t(`starting`)})]})}function Ae(){return(0,R.jsx)(`div`,{className:d.row,children:z.map(e=>(0,R.jsx)(ke,{renderer:e},e))})}var L,R,z;function je(){return(je=e((()=>{L=t(),i(),l(),a(),Te(),R=n(),z=[`svg`,`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`]})))()}function Me(){return(0,B.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,B.jsx)(H,{}),(0,B.jsx)(H,{size:40,color:`var(--primary-color)`}),(0,B.jsx)(u,{icon:V,size:40,renderer:`auto`})]})}var B,V,H;function U(){return(U=e((()=>{b(),p(),l(),B=n(),V=Ee({name:`rocket`,category:`custom`,tags:[`launch`,`ship`],paths:[`M12 3c3 2 5 5.5 5 9.5V16H7v-3.5C7 8.5 9 5 12 3z`,`M12 9.5h.01`,`M7 13l-3 3v3h3`,`M17 13l3 3v3h-3`,`M10 19.5l2 1.5 2-1.5`]}),H=_(V)})))()}function Ne(){return(0,W.jsx)(`ul`,{style:{display:`grid`,gap:8,margin:0,padding:0},children:G.map(e=>(0,W.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,W.jsx)(m,{name:e.icon,size:18}),(0,W.jsx)(`span`,{style:{minWidth:80},children:e.name}),(0,W.jsx)(m,{name:e.status,size:18,color:K[e.status],title:e.status})]},e.name))})}var W,G,K;function q(){return(q=e((()=>{g(),W=n(),G=[{name:`Storage`,icon:`database`,status:`check-circle`},{name:`Mail`,icon:`mail`,status:`alert-triangle`},{name:`Payments`,icon:`credit-card`,status:`x-circle`}],K={"check-circle":`var(--success-color)`,"alert-triangle":`var(--warning-color)`,"x-circle":`var(--danger-color)`}})))()}function Pe(){return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,J.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:Y.map(e=>(0,J.jsx)(D,{size:e},e))}),(0,J.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,J.jsx)(O,{color:`var(--danger-color)`}),(0,J.jsx)(D,{color:`var(--warning-color)`}),(0,J.jsx)(E,{color:`var(--primary-color)`}),(0,J.jsxs)(`span`,{style:{color:`var(--link-color)`,fontSize:20},children:[(0,J.jsx)(E,{size:`1em`}),` 1em follows the font size`]})]})]})}var J,Y;function X(){return(X=e((()=>{M(),J=n(),Y=[16,20,24,32,48]})))()}function Fe(){return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,Z.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:Ie.map(e=>(0,Z.jsx)(j,{size:32,strokeWidth:e},e))}),(0,Z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[Q.map(e=>(0,Z.jsx)(j,{size:e,strokeWidth:1.5},e)),Q.map(e=>(0,Z.jsx)(j,{size:e,strokeWidth:1.5,absoluteStrokeWidth:!0},`absolute-${e}`))]})]})}var Z,Ie,Q;function Le(){return(Le=e((()=>{M(),Z=n(),Ie=[1,1.5,2,2.5,3],Q=[16,24,48]})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { IconButton } from "minerva-design";
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
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { Button } from "minerva-design";
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
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useState } from "react";
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
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { createIcon, defineIcon, Icon } from "minerva-design/icons";

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
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { DynamicIcon } from "minerva-design/icons";

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
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { BellIcon, HeartIcon, StarIcon } from "minerva-design/icons";

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
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { CloudIcon } from "minerva-design/icons";

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
`})))()}var $,Qe,$e,et;function tt(){return(tt=e((()=>{P(),I(),je(),U(),q(),X(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),t(),i(),Se(),be(),we(),$=n(),Qe=xe(Object.assign({"./demos/accessibility.tsx":De,"./demos/basic.tsx":Oe,"./demos/canvas.tsx":Ae,"./demos/custom.tsx":Me,"./demos/dynamic.tsx":Ne,"./demos/size-color.tsx":Pe,"./demos/stroke.tsx":Fe}),Object.assign({"./demos/accessibility.tsx":Re,"./demos/basic.tsx":Be,"./demos/canvas.tsx":He,"./demos/custom.tsx":We,"./demos/dynamic.tsx":Ke,"./demos/size-color.tsx":Je,"./demos/stroke.tsx":Xe})),$e=`import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`,et=()=>{let{t:e}=r(),t=(0,$.jsxs)(`section`,{className:c.section,"aria-labelledby":`icon-rendering`,children:[(0,$.jsx)(`h2`,{id:`icon-rendering`,children:e(`docs.icon.intro.title`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.svg`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.canvas`)}),(0,$.jsx)(`p`,{className:c.prose,children:e(`docs.icon.intro.bundle`)})]});return(0,$.jsx)(Ce,{id:`icon`,demos:Qe,intro:t,importCode:$e})}})))()}tt();export{et as default};