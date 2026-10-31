import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{C as a,D as o,O as s,S as c,a as l,b as u,d,n as f,p,u as m,v as h,w as g,x as _,y as v}from"./angular-preview-CSWPEDZG.js";import{R as ee,z as te}from"./ProgressIndicator-CQZAxIX3.js";import{i as ne,n as re,r as ie,t as ae}from"./Radio-D2wZ9q6z.js";import{i as oe,r as y}from"./DemoBlock-BXdX6oLT.js";import{l as se,n as ce,t as le,u as ue}from"./DocPage-CHJwIegD.js";import{n as b,t as x}from"./icons.module-CofXGdmT.js";function S(e){let{items:t,renderer:n,width:r=`100%`,height:i=240,pixelRatio:a,title:o,onRendererChange:c,ref:l,style:u,className:d,...f}=e,p=(0,C.useRef)(null),m=(0,C.useRef)(null),h=(0,C.useRef)(c),g=(0,C.useRef)({items:t,renderer:n,pixelRatio:a});(0,C.useEffect)(()=>{h.current=c},[c]),(0,C.useEffect)(()=>{let e=p.current;if(!e)return;let t=s(e,{...g.current,onRendererChange:e=>h.current?.(e)});return m.current=t,()=>{t.destroy(),m.current=null}},[]),(0,C.useEffect)(()=>{g.current={...g.current,renderer:n,pixelRatio:a},m.current?.setOptions({renderer:n,pixelRatio:a})},[n,a]),(0,C.useEffect)(()=>{g.current={...g.current,items:t},m.current?.setItems(t)},[t]),(0,C.useImperativeHandle)(l,()=>({getRenderer:()=>m.current?.renderer??null,getCanvas:()=>m.current?.canvas??null,ready:()=>m.current?.ready()??Promise.reject(Error(`IconCanvas is not mounted`))}),[]);let _=d?`minerva-icon-canvas ${d}`:`minerva-icon-canvas`,v=!!o||!!f[`aria-label`]||!!f[`aria-labelledby`];return(0,w.jsx)(`div`,{...f,ref:p,className:_,...v?{role:f.role??`img`,...o&&{"aria-label":o}}:{"aria-hidden":f[`aria-hidden`]??!0},style:{position:`relative`,width:T(r),height:T(i),...u}})}var C,w,T;function E(){return(E=e((()=>{o(),C=t(),w=n(),T=e=>typeof e==`number`?`${e}px`:e})))()}function de(){return(0,D.jsx)(S,{items:k,height:160,title:`Six icons, three ways`})}var D,O,k;function A(){return(A=e((()=>{E(),d(),u(),h(),a(),D=n(),O=[_,g,v,m,p,c],k=[...O.map((e,t)=>({icon:e,x:16+t*48,y:16})),...O.map((e,t)=>({icon:e,x:16+t*48,y:64,size:32,color:`var(--primary-color)`,rotation:t*15})),...O.map((e,t)=>({icon:e,x:16+t*48,y:112,strokeWidth:1.5,opacity:.35+t*.13}))]})))()}function fe({renderer:e}){let{t}=r(`common`,{keyPrefix:`docs.icon-canvas.data`}),[n,i]=(0,j.useState)(null);return(0,M.jsxs)(`figure`,{style:{margin:0},children:[(0,M.jsx)(S,{className:x.canvasFrame,items:P,renderer:e,width:256,height:160,onRendererChange:i,title:t(`panelAria`,{backend:e})}),(0,M.jsxs)(`figcaption`,{className:x.cell,style:{marginTop:6},children:[(0,M.jsxs)(`code`,{children:[`renderer="`,e,`"`]}),(0,M.jsx)(`span`,{className:x.kind,children:n===null?t(`starting`):t(n===e?`drawnBy`:`fellBack`,{backend:n})})]})]})}function pe(){return(0,M.jsx)(`div`,{className:x.row,children:N.map(e=>(0,M.jsx)(fe,{renderer:e},e))})}var j,M,N,P;function F(){return(F=e((()=>{j=t(),i(),E(),f(),b(),M=n(),N=[`webgpu`,`webgl2`,`webgl`,`canvas2d`],P=l.slice(0,40).map((e,t)=>({icon:e,x:8+t%8*30,y:8+Math.floor(t/8)*30,size:24}))})))()}function me(){let{t:e}=r(`common`,{keyPrefix:`docs.icon-canvas.data`}),t=(0,I.useRef)(null),[n,i]=(0,I.useState)(5e3),[a,o]=(0,I.useState)(!0),[s,c]=(0,I.useState)(640),[l,u]=(0,I.useState)(0),[d,f]=(0,I.useState)(null),[p,m]=(0,I.useState)(null);(0,I.useEffect)(()=>{let e=t.current;if(!e)return;let n=new ResizeObserver(()=>c(e.clientWidth||640));return n.observe(e),()=>n.disconnect()},[]),(0,I.useEffect)(()=>{if(!a)return;let e=0,t=0,n=performance.now(),r=i=>{u(i/1e3),t++,i-n>=500&&(f(Math.round(t*1e3/(i-n))),t=0,n=i),e=requestAnimationFrame(r)};return e=requestAnimationFrame(r),()=>cancelAnimationFrame(e)},[a]);let h=(0,I.useMemo)(()=>H(n,s,l),[n,s,l]);return(0,L.jsxs)(`div`,{className:x.stage,children:[(0,L.jsxs)(`div`,{className:x.toolbar,children:[(0,L.jsx)(ne,{"aria-label":e(`count`),direction:`horizontal`,size:`small`,value:String(n),onChange:e=>i(Number(e)),children:R.map(e=>(0,L.jsx)(ae,{value:String(e),label:e.toLocaleString()},e))}),(0,L.jsx)(te,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>o(e=>!e),children:e(a?`pause`:`play`)})]}),(0,L.jsx)(`div`,{ref:t,children:(0,L.jsx)(S,{items:h,height:z,onRendererChange:m,title:e(`aria`,{n:n.toLocaleString()})})}),(0,L.jsxs)(`div`,{className:x.footer,children:[(0,L.jsx)(`p`,{role:`status`,children:p?e(`status`,{backend:p}):e(`starting`)}),(0,L.jsx)(`p`,{className:x.kind,children:a&&d!==null?e(`fps`,{fps:d}):e(`paused`)})]})]})}var I,L,R,z,B,V,H;function U(){return(U=e((()=>{I=t(),i(),ee(),re(),ie(),E(),f(),b(),L=n(),R=[1e3,5e3,2e4],z=360,B=l.filter((e,t)=>t%8==0),V=Array.from({length:36},(e,t)=>`hsl(${t*10} 70% 55%)`),H=(e,t,n)=>{let r=Math.max(6,Math.sqrt(t*z/e)),i=Math.max(1,Math.floor(t/r)),a=r*.8,o=[],s=Math.ceil(e/B.length);for(let t=0;t<e;t++){let e=Math.floor(t/s),c=t%s*B.length+e,l=c%i,u=Math.floor(c/i),d=Math.sin(n*2+l*.25+u*.35);o.push({icon:B[e],x:l*r+(r-a)/2,y:u*r+(r-a)/2,size:a*(.85+.15*d),rotation:d*25,color:V[(l+u)%V.length],opacity:.55+.45*d*d})}return o}})))()}var W;function G(){return(G=e((()=>{W=`import {
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
`})))()}var K;function q(){return(q=e((()=>{K=`import { useState } from "react";
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useEffect, useMemo, useRef, useState } from "react";
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
`})))()}var X,Z,Q,he;function $(){return($=e((()=>{A(),F(),U(),G(),q(),Y(),t(),i(),ce(),oe(),ue(),X=n(),Z=se(Object.assign({"./demos/basic.tsx":de,"./demos/renderers.tsx":pe,"./demos/thousands.tsx":me}),Object.assign({"./demos/basic.tsx":W,"./demos/renderers.tsx":K,"./demos/thousands.tsx":J})),Q=[`tessellate`,`batch`,`depth`,`fallback`],he=()=>{let{t:e}=r(),t=(0,X.jsxs)(`section`,{className:y.section,"aria-labelledby":`icon-canvas-how`,children:[(0,X.jsx)(`h2`,{id:`icon-canvas-how`,children:e(`docs.icon-canvas.intro.title`)}),(0,X.jsx)(`p`,{className:y.prose,children:e(`docs.icon-canvas.intro.text`)}),(0,X.jsx)(`ul`,{className:y.prose,children:Q.map(t=>(0,X.jsx)(`li`,{children:e(`docs.icon-canvas.intro.${t}`)},t))}),(0,X.jsx)(`p`,{className:y.prose,children:e(`docs.icon-canvas.intro.when`)})]});return(0,X.jsx)(le,{id:`icon-canvas`,demos:Z,intro:t})}})))()}$();export{he as default};