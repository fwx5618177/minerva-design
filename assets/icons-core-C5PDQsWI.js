import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DFfJWCfl.js";import{R as a,z as o}from"./ProgressIndicator-CLQ5GhV8.js";import{i as s,n as c,r as l,t as ee}from"./Radio-y1-55x53.js";import{n as u,t as d}from"./CodeBlock-B9zPv3_p.js";import{i as te,r as f}from"./DemoBlock-BzrkhUxt.js";import{i as ne,o as re,t as ie}from"./Select-CFOiLa6C.js";import{B as ae,D as oe,G as se,K as ce,L as p,O as le,R as ue,S as m,T as de,U as fe,W as pe,_ as h,d as g,f as me,g as he,i as ge,m as _,o as _e,p as v,q as ve,s as ye,t as y,u as b,z as be}from"./angular-preview-DKTVr4S_.js";import{l as xe,n as Se,t as Ce,u as we}from"./DocPage-CkWG9x5k.js";import{n as x,t as S}from"./icons.module-Bp0voVzQ.js";function Te(){let e=(0,C.useRef)(null);return(0,C.useEffect)(()=>{let t=e.current,n=t?.getContext(`2d`);if(!t||!n)return;let r=window.devicePixelRatio||1;t.width=T*r,t.height=E*r,n.scale(r,r);let i=[v,me,_,ye],a=[`#f59e0b`,`#eab308`,`#ef4444`,`#6366f1`];i.forEach((e,t)=>{ae(n,e,{x:16+t*76,y:16,size:64,color:a[t],rotation:t*12,strokeWidth:1.5})})},[]),(0,w.jsx)(`canvas`,{ref:e,className:S.canvasFrame,style:{width:T,height:E},role:`img`,"aria-label":`Sun, star, heart and lightning icons drawn with drawIcon`})}var C,w,T,E;function D(){return(D=e((()=>{C=t(),be(),b(),_e(),x(),w=n(),T=320,E=96})))()}function Ee(){let{t:e}=r(`common`,{keyPrefix:`docs.icons-core.data`}),t=(0,O.useRef)(null),n=(0,O.useRef)(null),[i,a]=(0,O.useState)(null),[s,c]=(0,O.useState)(0);return(0,O.useEffect)(()=>{if(!t.current)return;let e=le(t.current,{height:120,onRendererChange:a});return n.current=e,()=>e.destroy()},[]),(0,O.useEffect)(()=>{n.current?.setItems(y.slice(s,s+30).map((e,t)=>({icon:e,x:12+t%15*36,y:16+Math.floor(t/15)*48,size:28,color:`currentColor`})))},[s]),(0,k.jsxs)(`div`,{className:S.stage,children:[(0,k.jsx)(`div`,{ref:t,style:{height:120},role:`img`,"aria-label":e(`controllerAria`)}),(0,k.jsxs)(`div`,{className:S.footer,children:[(0,k.jsx)(`p`,{role:`status`,children:i?e(`status`,{backend:i}):e(`starting`)}),(0,k.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>c(e=>(e+30)%y.length),children:e(`next`)})]})]})}var O,k;function A(){return(A=e((()=>{O=t(),i(),a(),oe(),ge(),x(),k=n()})))()}function De(){let{t:e}=r(`common`,{keyPrefix:`docs.icons-core.data`}),t=(0,j.useRef)(null),[n,i]=(0,j.useState)(`settings`),[a,o]=(0,j.useState)(`0.1`),c=N[n],l=(0,j.useMemo)(()=>ue(c,{tolerance:Number(a)}),[c,a]),u=(0,j.useMemo)(()=>c.paths.flatMap(e=>ce(e,Number(a))),[c,a]);(0,j.useEffect)(()=>{let e=t.current,n=e?.getContext(`2d`);if(!e||!n)return;let r=window.devicePixelRatio||1;e.width=I*r,e.height=I*r,n.setTransform(r*F,0,0,r*F,0,0),n.clearRect(0,0,24,24);let i=getComputedStyle(e);n.lineWidth=1/F,n.fillStyle=`rgba(99, 102, 241, 0.18)`,n.strokeStyle=`rgba(99, 102, 241, 0.75)`;for(let e=0;e<l.length;e+=6)n.beginPath(),n.moveTo(l[e],l[e+1]),n.lineTo(l[e+2],l[e+3]),n.lineTo(l[e+4],l[e+5]),n.closePath(),n.fill(),n.stroke();n.fillStyle=i.color;for(let e of u)for(let t=0;t<e.points.length;t+=2)n.beginPath(),n.arc(e.points[t],e.points[t+1],1.6/F,0,7),n.fill()},[l,u]);let d=u.reduce((e,t)=>e+t.points.length/2,0);return(0,M.jsxs)(`div`,{className:S.stage,children:[(0,M.jsxs)(`div`,{className:S.toolbar,children:[(0,M.jsx)(re,{size:`small`,style:{width:140},"aria-label":e(`icon`),value:n,onChange:i,children:Object.keys(N).map(e=>(0,M.jsx)(ie,{value:e,children:e},e))}),(0,M.jsx)(s,{"aria-label":e(`tolerance`),direction:`horizontal`,size:`small`,value:a,onChange:e=>o(String(e)),children:P.map(e=>(0,M.jsx)(ee,{value:e,label:e},e))})]}),(0,M.jsx)(`div`,{className:S.body,children:(0,M.jsx)(`canvas`,{ref:t,className:S.canvasFrame,style:{width:I,height:I,maxWidth:`100%`},role:`img`,"aria-label":e(`geometryAria`,{name:n})})}),(0,M.jsx)(`div`,{className:S.footer,children:(0,M.jsx)(`p`,{className:S.kind,children:e(`geometryStats`,{triangles:l.length/6,points:d})})})]})}var j,M,N,P,F,I;function L(){return(L=e((()=>{j=t(),i(),c(),l(),ne(),he(),ve(),b(),de(),p(),x(),M=n(),N={settings:m,heart:_,cloud:h},P=[`0.5`,`0.1`,`0.02`],F=12,I=288})))()}function Oe(){let e=(0,R.useMemo)(()=>pe(g,{size:32,title:`Done`,strokeWidth:1.5}),[]),t=(0,R.useMemo)(()=>fe(g,{size:48,color:`#16a34a`}),[]);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,z.jsxs)(`div`,{className:S.row,children:[(0,z.jsx)(`img`,{src:t,width:48,height:48,alt:`Done`}),(0,z.jsx)(`code`,{children:`toSvgDataUri(checkCircleIcon, …)`})]}),(0,z.jsx)(`pre`,{className:S.code,children:e})]})}var R,z;function B(){return(B=e((()=>{R=t(),b(),se(),x(),z=n()})))()}var V;function H(){return(H=e((()=>{V=`import { useEffect, useRef } from "react";
import {
  drawIcon,
  heartIcon,
  starIcon,
  sunIcon,
  zapIcon,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

const WIDTH = 320;
const HEIGHT = 96;

// a plain 2D context (a game, a map, a mini-program canvas): native strokes,
// identical to the SVG
export default function Canvas2dDemo() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    const icons = [sunIcon, starIcon, heartIcon, zapIcon];
    const colors = ["#f59e0b", "#eab308", "#ef4444", "#6366f1"];
    icons.forEach((icon, i) => {
      drawIcon(ctx, icon, {
        x: 16 + i * 76,
        y: 16,
        size: 64,
        color: colors[i],
        rotation: i * 12,
        strokeWidth: 1.5,
      });
    });
  }, []);
  return (
    <canvas
      ref={ref}
      className={styles.canvasFrame}
      style={{ width: WIDTH, height: HEIGHT }}
      role="img"
      aria-label="Sun, star, heart and lightning icons drawn with drawIcon"
    />
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createIconCanvas,
  icons,
  type IconCanvasController,
  type IconRendererKind,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

// the framework-free controller under IconCanvas: any element, any framework
export default function ControllerDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons-core.data" });
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<IconCanvasController | null>(null);
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!host.current) return;
    const instance = createIconCanvas(host.current, {
      height: 120,
      onRendererChange: setDrawn,
    });
    controller.current = instance;
    return () => instance.destroy();
  }, []);

  // new items: drawn on the next animation frame
  useEffect(() => {
    controller.current?.setItems(
      icons.slice(offset, offset + 30).map((icon, i) => ({
        icon,
        x: 12 + (i % 15) * 36,
        y: 16 + Math.floor(i / 15) * 48,
        size: 28,
        color: "currentColor",
      })),
    );
  }, [offset]);

  return (
    <div className={styles.stage}>
      <div
        ref={host}
        style={{ height: 120 }}
        role="img"
        aria-label={t("controllerAria")}
      />
      <div className={styles.footer}>
        <p role="status">
          {drawn ? t("status", { backend: drawn }) : t("starting")}
        </p>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setOffset((value) => (value + 30) % icons.length)}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Select, SelectItem } from "minerva-design";
import {
  cloudIcon,
  flattenIconPath,
  heartIcon,
  settingsIcon,
  tessellateIcon,
  type IconDefinition,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

const ICONS: Record<string, IconDefinition> = {
  settings: settingsIcon,
  heart: heartIcon,
  cloud: cloudIcon,
};
const TOLERANCES = ["0.5", "0.1", "0.02"];
const SCALE = 12;
const SIDE = 24 * SCALE;

// what the GPU backends draw: the stroke as triangles (quads per segment,
// round joins and caps as fans), from curves flattened within a tolerance
export default function GeometryDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.icons-core.data" });
  const ref = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("settings");
  const [tolerance, setTolerance] = useState("0.1");
  const icon = ICONS[name]!;

  const mesh = useMemo(
    () => tessellateIcon(icon, { tolerance: Number(tolerance) }),
    [icon, tolerance],
  );
  const lines = useMemo(
    () => icon.paths.flatMap((d) => flattenIconPath(d, Number(tolerance))),
    [icon, tolerance],
  );

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIDE * dpr;
    canvas.height = SIDE * dpr;
    ctx.setTransform(dpr * SCALE, 0, 0, dpr * SCALE, 0, 0);
    ctx.clearRect(0, 0, 24, 24);
    const style = getComputedStyle(canvas);
    ctx.lineWidth = 1 / SCALE;
    ctx.fillStyle = "rgba(99, 102, 241, 0.18)";
    ctx.strokeStyle = "rgba(99, 102, 241, 0.75)";
    for (let i = 0; i < mesh.length; i += 6) {
      ctx.beginPath();
      ctx.moveTo(mesh[i]!, mesh[i + 1]!);
      ctx.lineTo(mesh[i + 2]!, mesh[i + 3]!);
      ctx.lineTo(mesh[i + 4]!, mesh[i + 5]!);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = style.color;
    for (const line of lines) {
      for (let i = 0; i < line.points.length; i += 2) {
        ctx.beginPath();
        ctx.arc(line.points[i]!, line.points[i + 1]!, 1.6 / SCALE, 0, 7);
        ctx.fill();
      }
    }
  }, [mesh, lines]);

  const points = lines.reduce((sum, line) => sum + line.points.length / 2, 0);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <Select
          size="small"
          style={{ width: 140 }}
          aria-label={t("icon")}
          value={name}
          onChange={setName}
        >
          {Object.keys(ICONS).map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </Select>
        <RadioGroup
          aria-label={t("tolerance")}
          direction="horizontal"
          size="small"
          value={tolerance}
          onChange={(value) => setTolerance(String(value))}
        >
          {TOLERANCES.map((value) => (
            <Radio key={value} value={value} label={value} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.body}>
        <canvas
          ref={ref}
          className={styles.canvasFrame}
          style={{ width: SIDE, height: SIDE, maxWidth: "100%" }}
          role="img"
          aria-label={t("geometryAria", { name })}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.kind}>
          {t("geometryStats", { triangles: mesh.length / 6, points })}
        </p>
      </div>
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useMemo } from "react";
import {
  checkCircleIcon,
  toSvg,
  toSvgDataUri,
} from "minerva-design/icons/core";
import styles from "../../icons/icons.module.scss";

export default function SvgStringDemo() {
  const svg = useMemo(
    () => toSvg(checkCircleIcon, { size: 32, title: "Done", strokeWidth: 1.5 }),
    [],
  );
  // an <img>, a CSS background or a favicon: no currentColor there
  const uri = useMemo(
    () => toSvgDataUri(checkCircleIcon, { size: 48, color: "#16a34a" }),
    [],
  );
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div className={styles.row}>
        <img src={uri} width={48} height={48} alt="Done" />
        <code>toSvgDataUri(checkCircleIcon, …)</code>
      </div>
      <pre className={styles.code}>{svg}</pre>
    </div>
  );
}
`})))()}var Y,X,Z,Q;function $(){return($=e((()=>{D(),A(),L(),B(),H(),W(),K(),J(),t(),i(),u(),Se(),te(),we(),Y=n(),X=xe(Object.assign({"./demos/canvas2d.tsx":Te,"./demos/controller.tsx":Ee,"./demos/geometry.tsx":De,"./demos/svg-string.tsx":Oe}),Object.assign({"./demos/canvas2d.tsx":V,"./demos/controller.tsx":U,"./demos/geometry.tsx":G,"./demos/svg-string.tsx":q})),Z=`// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context`,Q=()=>{let{t:e}=r(),t=(0,Y.jsxs)(`section`,{className:f.section,"aria-labelledby":`icons-core-overview`,children:[(0,Y.jsx)(`h2`,{id:`icons-core-overview`,children:e(`docs.icons-core.intro.title`)}),(0,Y.jsx)(`p`,{className:f.prose,children:e(`docs.icons-core.intro.text`)}),(0,Y.jsx)(d,{language:`ts`,code:Z}),(0,Y.jsx)(`p`,{className:f.prose,children:e(`docs.icons-core.intro.frameworks`)})]});return(0,Y.jsx)(Ce,{id:`icons-core`,demos:X,intro:t})}})))()}$();export{Q as default};