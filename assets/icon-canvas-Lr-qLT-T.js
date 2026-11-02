import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CWFjHSSV.js";import{R as a,z as o}from"./ProgressIndicator-DMdtmsv7.js";import{i as s,n as c,r as l,t as u}from"./Radio-BJ7FnRqD.js";import{i as d,r as f}from"./DemoBlock-B9Rbq7oB.js";import{D as p,E as m,O as h,S as g,T as _,b as v,h as ee,i as y,l as te,t as b,u as ne,v as re,x as ie,y as ae}from"./angular-preview-DKTVr4S_.js";import{l as oe,n as se,t as ce,u as le}from"./DocPage-tb4CAOXP.js";import{n as x,t as S}from"./icons.module-Bp0voVzQ.js";function C(e){let{items:t,renderer:n,width:r=`100%`,height:i=240,pixelRatio:a,title:o,onRendererChange:s,ref:c,style:l,className:u,...d}=e,f=(0,w.useRef)(null),p=(0,w.useRef)(null),m=(0,w.useRef)(s),g=(0,w.useRef)({items:t,renderer:n,pixelRatio:a});(0,w.useEffect)(()=>{m.current=s},[s]),(0,w.useEffect)(()=>{let e=f.current;if(!e)return;let t=h(e,{...g.current,onRendererChange:e=>m.current?.(e)});return p.current=t,()=>{t.destroy(),p.current=null}},[]),(0,w.useEffect)(()=>{g.current={...g.current,renderer:n,pixelRatio:a},p.current?.setOptions({renderer:n,pixelRatio:a})},[n,a]),(0,w.useEffect)(()=>{g.current={...g.current,items:t},p.current?.setItems(t)},[t]),(0,w.useImperativeHandle)(c,()=>({getRenderer:()=>p.current?.renderer??null,getCanvas:()=>p.current?.canvas??null,ready:()=>p.current?.ready()??Promise.reject(Error(`IconCanvas is not mounted`))}),[]);let _=u?`minerva-icon-canvas ${u}`:`minerva-icon-canvas`,v=!!o||!!d[`aria-label`]||!!d[`aria-labelledby`];return(0,T.jsx)(`div`,{...d,ref:f,className:_,...v?{role:d.role??`img`,...o&&{"aria-label":o}}:{"aria-hidden":d[`aria-hidden`]??!0},style:{position:`relative`,width:E(r),height:E(i),...l}})}var w,T,E;function D(){return(D=e((()=>{p(),w=t(),T=n(),E=e=>typeof e==`number`?`${e}px`:e})))()}function ue(){return(0,O.jsx)(C,{items:A,height:160,title:`Six icons, three ways`})}var O,k,A;function j(){return(j=e((()=>{D(),ne(),ie(),re(),_(),O=n(),k=[v,m,ae,te,ee,g],A=[...k.map((e,t)=>({icon:e,x:16+t*48,y:16})),...k.map((e,t)=>({icon:e,x:16+t*48,y:64,size:32,color:`var(--primary-color)`,rotation:t*15})),...k.map((e,t)=>({icon:e,x:16+t*48,y:112,strokeWidth:1.5,opacity:.35+t*.13}))]})))()}function de({renderer:e}){let{t}=r(`common`,{keyPrefix:`docs.icon-canvas.data`}),[n,i]=(0,M.useState)(null);return(0,N.jsxs)(`figure`,{style:{margin:0},children:[(0,N.jsx)(C,{className:S.canvasFrame,items:F,renderer:e,width:256,height:160,onRendererChange:i,title:t(`panelAria`,{backend:e})}),(0,N.jsxs)(`figcaption`,{className:S.cell,style:{marginTop:6},children:[(0,N.jsxs)(`code`,{children:[`renderer="`,e,`"`]}),(0,N.jsx)(`span`,{className:S.kind,children:n===null?t(`starting`):t(n===e?`drawnBy`:`fellBack`,{backend:n})})]})]})}function fe(){return(0,N.jsx)(`div`,{className:S.row,children:P.map(e=>(0,N.jsx)(de,{renderer:e},e))})}var M,N,P,F;function I(){return(I=e((()=>{M=t(),i(),D(),y(),x(),N=n(),P=[`webgpu`,`webgl2`,`webgl`,`canvas2d`],F=b.slice(0,40).map((e,t)=>({icon:e,x:8+t%8*30,y:8+Math.floor(t/8)*30,size:24}))})))()}function pe(){let{t:e}=r(`common`,{keyPrefix:`docs.icon-canvas.data`}),t=(0,L.useRef)(null),[n,i]=(0,L.useState)(5e3),[a,c]=(0,L.useState)(!0),[l,d]=(0,L.useState)(640),[f,p]=(0,L.useState)(0),[m,h]=(0,L.useState)(null),[g,_]=(0,L.useState)(null);(0,L.useEffect)(()=>{let e=t.current;if(!e)return;let n=new ResizeObserver(()=>d(e.clientWidth||640));return n.observe(e),()=>n.disconnect()},[]),(0,L.useEffect)(()=>{if(!a)return;let e=0,t=0,n=performance.now(),r=i=>{p(i/1e3),t++,i-n>=500&&(h(Math.round(t*1e3/(i-n))),t=0,n=i),e=requestAnimationFrame(r)};return e=requestAnimationFrame(r),()=>cancelAnimationFrame(e)},[a]);let v=(0,L.useMemo)(()=>U(n,l,f),[n,l,f]);return(0,R.jsxs)(`div`,{className:S.stage,children:[(0,R.jsxs)(`div`,{className:S.toolbar,children:[(0,R.jsx)(s,{"aria-label":e(`count`),direction:`horizontal`,size:`small`,value:String(n),onChange:e=>i(Number(e)),children:z.map(e=>(0,R.jsx)(u,{value:String(e),label:e.toLocaleString()},e))}),(0,R.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>c(e=>!e),children:e(a?`pause`:`play`)})]}),(0,R.jsx)(`div`,{ref:t,children:(0,R.jsx)(C,{items:v,height:B,onRendererChange:_,title:e(`aria`,{n:n.toLocaleString()})})}),(0,R.jsxs)(`div`,{className:S.footer,children:[(0,R.jsx)(`p`,{role:`status`,children:g?e(`status`,{backend:g}):e(`starting`)}),(0,R.jsx)(`p`,{className:S.kind,children:a&&m!==null?e(`fps`,{fps:m}):e(`paused`)})]})]})}var L,R,z,B,V,H,U;function W(){return(W=e((()=>{L=t(),i(),a(),c(),l(),D(),y(),x(),R=n(),z=[1e3,5e3,2e4],B=360,V=b.filter((e,t)=>t%8==0),H=Array.from({length:36},(e,t)=>`hsl(${t*10} 70% 55%)`),U=(e,t,n)=>{let r=Math.max(6,Math.sqrt(t*B/e)),i=Math.max(1,Math.floor(t/r)),a=r*.8,o=[],s=Math.ceil(e/V.length);for(let t=0;t<e;t++){let e=Math.floor(t/s),c=t%s*V.length+e,l=c%i,u=Math.floor(c/i),d=Math.sin(n*2+l*.25+u*.35);o.push({icon:V[e],x:l*r+(r-a)/2,y:u*r+(r-a)/2,size:a*(.85+.15*d),rotation:d*25,color:H[(l+u)%H.length],opacity:.55+.45*d*d})}return o}})))()}var G;function K(){return(K=e((()=>{G=`import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
} from "minerva-design/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

// one canvas, one GPU draw per run of identical icons; positions in CSS px
const items: IconCanvasItem[] = [
  ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 64,
    size: 32,
    color: "var(--primary-color)",
    rotation: i * 15,
  })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 112,
    strokeWidth: 1.5,
    opacity: 0.35 + i * 0.13,
  })),
];

export default function BasicDemo() {
  return (
    <IconCanvas items={items} height={160} title="Six icons, three ways" />
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCanvas,
  icons,
  type IconCanvasItem,
  type IconRendererKind,
  type IconRendererPreference,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const BACKENDS: IconRendererPreference[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// the same 40 icons on every backend: the geometry is shared, only the
// rasterizer differs (MSAA triangles on the GPU, native strokes on Canvas2D)
const items: IconCanvasItem[] = icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}));

function Panel({ renderer }: { renderer: IconRendererPreference }) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.icon-canvas.data",
  });
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);
  return (
    <figure style={{ margin: 0 }}>
      <IconCanvas
        className={styles.canvasFrame}
        items={items}
        renderer={renderer}
        width={256}
        height={160}
        onRendererChange={setDrawn}
        title={t("panelAria", { backend: renderer })}
      />
      <figcaption className={styles.cell} style={{ marginTop: 6 }}>
        <code>renderer=&quot;{renderer}&quot;</code>
        <span className={styles.kind}>
          {drawn === null
            ? t("starting")
            : drawn === renderer
              ? t("drawnBy", { backend: drawn })
              : t("fellBack", { backend: drawn })}
        </span>
      </figcaption>
    </figure>
  );
}

export default function RenderersDemo() {
  return (
    <div className={styles.row}>
      {BACKENDS.map((renderer) => (
        <Panel key={renderer} renderer={renderer} />
      ))}
    </div>
  );
}
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup } from "minerva-design";
import {
  IconCanvas,
  icons,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/icons";
import styles from "../../icons/icons.module.scss";

const COUNTS = [1000, 5000, 20000];
const HEIGHT = 360;
const PICKED = icons.filter((_, i) => i % 8 === 0);
// a few dozen distinct colors: resolved once each, not once per icon
const HUES = Array.from({ length: 36 }, (_, i) => \`hsl(\${i * 10} 70% 55%)\`);

/** Icons grouped by kind so each kind is one instanced draw */
const layout = (count: number, width: number, time: number) => {
  const cell = Math.max(6, Math.sqrt((width * HEIGHT) / count));
  const columns = Math.max(1, Math.floor(width / cell));
  const size = cell * 0.8;
  const items: IconCanvasItem[] = [];
  const perKind = Math.ceil(count / PICKED.length);
  for (let i = 0; i < count; i++) {
    const kind = Math.floor(i / perKind);
    const slot = (i % perKind) * PICKED.length + kind;
    const column = slot % columns;
    const row = Math.floor(slot / columns);
    const wave = Math.sin(time * 2 + column * 0.25 + row * 0.35);
    items.push({
      icon: PICKED[kind]!,
      x: column * cell + (cell - size) / 2,
      y: row * cell + (cell - size) / 2,
      size: size * (0.85 + 0.15 * wave),
      rotation: wave * 25,
      color: HUES[(column + row) % HUES.length],
      opacity: 0.55 + 0.45 * wave * wave,
    });
  }
  return items;
};

export default function ThousandsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.icon-canvas.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(5000);
  const [running, setRunning] = useState(true);
  const [width, setWidth] = useState(640);
  const [time, setTime] = useState(0);
  const [fps, setFps] = useState<number | null>(null);
  const [drawn, setDrawn] = useState<IconRendererKind | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(() =>
      setWidth(element.clientWidth || 640),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let frames = 0;
    let since = performance.now();
    const tick = (now: number) => {
      setTime(now / 1000);
      frames++;
      if (now - since >= 500) {
        setFps(Math.round((frames * 1000) / (now - since)));
        frames = 0;
        since = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const items = useMemo(() => layout(count, width, time), [count, width, time]);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("count")}
          direction="horizontal"
          size="small"
          value={String(count)}
          onChange={(value) => setCount(Number(value))}
        >
          {COUNTS.map((value) => (
            <Radio
              key={value}
              value={String(value)}
              label={value.toLocaleString()}
            />
          ))}
        </RadioGroup>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("play")}
        </Button>
      </div>
      <div ref={host}>
        <IconCanvas
          items={items}
          height={HEIGHT}
          onRendererChange={setDrawn}
          title={t("aria", { n: count.toLocaleString() })}
        />
      </div>
      <div className={styles.footer}>
        <p role="status">
          {drawn ? t("status", { backend: drawn }) : t("starting")}
        </p>
        <p className={styles.kind}>
          {running && fps !== null ? t("fps", { fps }) : t("paused")}
        </p>
      </div>
    </div>
  );
}
`})))()}var Z,Q,me,he;function $(){return($=e((()=>{j(),I(),W(),K(),J(),X(),t(),i(),se(),d(),le(),Z=n(),Q=oe(Object.assign({"./demos/basic.tsx":ue,"./demos/renderers.tsx":fe,"./demos/thousands.tsx":pe}),Object.assign({"./demos/basic.tsx":G,"./demos/renderers.tsx":q,"./demos/thousands.tsx":Y})),me=[`tessellate`,`batch`,`depth`,`fallback`],he=()=>{let{t:e}=r(),t=(0,Z.jsxs)(`section`,{className:f.section,"aria-labelledby":`icon-canvas-how`,children:[(0,Z.jsx)(`h2`,{id:`icon-canvas-how`,children:e(`docs.icon-canvas.intro.title`)}),(0,Z.jsx)(`p`,{className:f.prose,children:e(`docs.icon-canvas.intro.text`)}),(0,Z.jsx)(`ul`,{className:f.prose,children:me.map(t=>(0,Z.jsx)(`li`,{children:e(`docs.icon-canvas.intro.${t}`)},t))}),(0,Z.jsx)(`p`,{className:f.prose,children:e(`docs.icon-canvas.intro.when`)})]});return(0,Z.jsx)(ce,{id:`icon-canvas`,demos:Q,intro:t})}})))()}$();export{he as default};