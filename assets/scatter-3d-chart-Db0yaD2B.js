import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BzoVi22c.js";import{R as a,z as o}from"./ProgressIndicator-BhPa7d9i.js";import{i as s,n as c,r as l,t as u}from"./Radio-DnNachfg.js";import{n as ee,t as te}from"./Switch-DyBWzlhy.js";import{l as ne,n as re,t as ie,u as ae}from"./DocPage-B2iACtLP.js";import{a as d,i as f,r as oe}from"./three-d-nENKeh9v.js";function se(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,p.useState)(!0),[i,a]=(0,p.useState)(`perspective`),o=(0,p.useMemo)(()=>[{name:e(`backbone1`),data:h,pointSize:9},{name:e(`backbone2`),data:g,pointSize:9},{name:e(`basePairs`),data:_,pointSize:5,color:`var(--text-secondary-color, #94a3b8)`}],[e]),c=(0,p.useMemo)(()=>({elevation:12,zoom:1.15,projection:i}),[i]);return(0,m.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,m.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,m.jsx)(te,{size:`small`,checked:t,label:e(`autoRotate`),onChange:n}),(0,m.jsxs)(s,{"aria-label":e(`projection`),direction:`horizontal`,size:`small`,value:i,onChange:e=>a(e),children:[(0,m.jsx)(u,{value:`perspective`,label:e(`perspective`)}),(0,m.jsx)(u,{value:`orthographic`,label:e(`orthographic`)})]})]}),(0,m.jsx)(d,{series:o,autoRotate:t?24:!1,aspect:[.5,.5,1],box:!1,camera:c,height:420,ariaLabel:e(`helixAria`)})]})}var p,m,h,g,_;function ce(){return(ce=e((()=>{p=t(),i(),c(),l(),ee(),f(),m=n(),h=[],g=[],_=[];for(let e=0;e<=240;e++){let t=e/6,n=t/10*Math.PI*2,r=t*.34;if(h.push([Math.cos(n),Math.sin(n),r]),g.push([Math.cos(n+2.4),Math.sin(n+2.4),r]),e%6==0)for(let e=1;e<8;e++){let t=n+2.4*e/8,i=1-.25*Math.sin(Math.PI*e/8);_.push([i*Math.cos(t),i*Math.sin(t),r])}}})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,v.useRef)(null),[n,i]=(0,v.useState)(null),a=(0,v.useMemo)(()=>[{name:e(`roll`),data:{x:de,y:fe,z:S,value:C},pointSize:4,format:e=>e.toFixed(2)}],[e]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[Object.keys(w).map(n=>(0,y.jsx)(o,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t.current?.setCamera({...w[n],zoom:1,pan:[0,0]}),children:e(`views.${n}`)},n)),(0,y.jsx)(o,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t.current?.resetCamera(),children:e(`views.reset`)})]}),(0,y.jsx)(d,{ref:t,series:a,colorScale:`spectral`,colorBar:{title:e(`position`)},aspect:[1,1,1],onCameraChange:i,height:420,ariaLabel:e(`rollAria`)}),(0,y.jsx)(`p`,{"aria-live":`polite`,style:{margin:0,color:`var(--text-secondary-color)`},children:n?e(`cameraState`,{azimuth:Math.round(n.azimuth),elevation:Math.round(n.elevation),zoom:n.zoom.toFixed(2)}):e(`cameraHint`)})]})}var v,y,b,x,de,fe,S,C,w;function pe(){return(pe=e((()=>{v=t(),i(),a(),f(),y=n(),b=4e3,x=le(21),de=new Float64Array(b),fe=new Float64Array(b),S=new Float64Array(b),C=new Float64Array(b);for(let e=0;e<b;e++){let t=1.5*Math.PI*(1+2*x());de[e]=t*Math.cos(t),fe[e]=x()*21,S[e]=t*Math.sin(t),C[e]=t}w={front:{azimuth:0,elevation:0},side:{azimuth:90,elevation:0},top:{azimuth:0,elevation:89}}})))()}function me(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function he(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,ge.useMemo)(()=>T.map(({key:t},n)=>({name:e(`species.${t}`),data:ve[n]??[],pointSize:8})),[e]);return(0,_e.jsx)(d,{series:t,xAxis:{title:e(`sepalLength`)},yAxis:{title:e(`sepalWidth`)},zAxis:{title:e(`petalLength`)},height:420,ariaLabel:e(`clustersAria`)})}var ge,_e,T,E,D,O,ve;function ye(){return(ye=e((()=>{ge=t(),i(),f(),_e=n(),T=[{key:`setosa`,mean:[5,3.4,1.5],spread:[.35,.38,.17]},{key:`versicolor`,mean:[5.9,2.8,4.3],spread:[.52,.31,.47]},{key:`virginica`,mean:[6.6,3,5.6],spread:[.64,.32,.55]}],E=me(11),D=()=>Math.sqrt(-2*Math.log(1-E()))*Math.cos(2*Math.PI*E()),O=e=>Math.round(e*10)/10,ve=T.map(({mean:e,spread:t})=>Array.from({length:60},()=>[O(e[0]+D()*t[0]),O(e[1]+D()*t[1]),O(e[2]+D()*t[2])]))})))()}function be(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function xe(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,Se.useMemo)(()=>{let t=I.map((t,n)=>e(`sensorLabel`,{id:n+1,humidity:t}));return[{name:e(`sensors`),data:{x:j,y:M,z:N,value:P,size:F,label:t},colorBy:`value`,format:t=>e(`celsius`,{value:t})}]},[e]);return(0,Ce.jsx)(d,{series:t,aspect:[40,24,9],xAxis:{title:e(`lengthM`)},yAxis:{title:e(`widthM`)},zAxis:{title:e(`heightM`)},colorScale:`coolwarm`,colorBar:{title:e(`temperature`),format:t=>e(`celsius`,{value:t})},camera:{azimuth:25,elevation:28},height:420,ariaLabel:e(`sensorsAria`)})}var Se,Ce,k,A,j,M,N,P,F,I;function we(){return(we=e((()=>{Se=t(),i(),f(),Ce=n(),k=300,A=be(5),j=new Float64Array(k),M=new Float64Array(k),N=new Float64Array(k),P=new Float64Array(k),F=new Float64Array(k),I=[];for(let e=0;e<k;e++){j[e]=Math.round(A()*400)/10,M[e]=Math.round(A()*240)/10,N[e]=Math.round((.5+A()*8.5)*10)/10;let t=Math.hypot(j[e]-30,M[e]-6,N[e]-1.5);P[e]=Math.round((14+N[e]*.9+9*Math.exp(-(t*t)/60)+A())*10)/10;let n=Math.round(70-P[e]*1.2+A()*8);I.push(n),F[e]=4+(n-35)/4}})))()}function Te(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ee(){let e=Te(42),t=()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e()),n=new Float32Array(R),r=new Float32Array(R),i=new Float32Array(R),a=new Float32Array(R);for(let o=0;o<R;o++){let s,c,l;if(o%7==0)s=t()*1.1,c=t()*1.1,l=t()*.6;else{let n=Math.min(15,-Math.log(1-e())*4+.5),r=o%2*Math.PI+Math.log(n)*2.4+t()*(.32+.6/n);s=n*Math.cos(r)+t()*.25,c=n*Math.sin(r)+t()*.25,l=t()*.25*Math.exp(-n/8)}n[o]=s,r[o]=c,i[o]=l,a[o]=Math.hypot(s,c,l)}return{x:n,y:r,z:i,value:a}}function De(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,L.useMemo)(()=>Ee(),[]),n=(0,L.useMemo)(()=>[{name:e(`stars`),data:t,pointSize:1.25,opacity:.7}],[e,t]);return(0,Oe.jsx)(d,{series:n,box:!1,aspect:[1,1,.3],xAxis:{min:-16,max:16},yAxis:{min:-16,max:16},zAxis:{min:-5,max:5},camera:{elevation:38,zoom:1.25},colorScale:[`#fff4d6`,`#ffb067`,`#ef5da8`,`#7c6cff`,`#3a7bd5`],valueRange:[0,14],colorBar:{title:e(`distance`),format:t=>e(`kiloparsecs`,{value:t})},height:460,ariaLabel:e(`galaxyAria`)})}var L,Oe,R;function ke(){return(ke=e((()=>{L=t(),i(),f(),Oe=n(),R=1e6})))()}function Ae(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function je(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,z.useState)(`auto`),[i,a]=(0,z.useState)(null),o=(0,z.useMemo)(()=>[{name:e(`knot`),data:{x:U,y:W,z:G},colorBy:`z`,pointSize:2}],[e]),c=e(`starting`);if(i){let n=e(`renderers.${i}`);c=t===`auto`||t===i?e(`rendererInUse`,{backend:n}):e(`rendererFallback`,{requested:e(`renderers.${t}`),backend:n})}return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,B.jsx)(s,{"aria-label":e(`renderer`),direction:`horizontal`,size:`small`,value:t,onChange:e=>{n(e),a(null)},children:Me.map(t=>(0,B.jsx)(u,{value:t,label:e(`renderers.${t}`)},t))}),(0,B.jsx)(d,{series:o,renderer:t,onRendererChange:a,colorScale:`turbo`,aspect:[1,1,.45],height:400,ariaLabel:e(`knotAria`)}),(0,B.jsx)(`p`,{role:`status`,style:{margin:0,color:`var(--text-secondary-color)`},children:c})]})}var z,B,Me,V,H,U,W,G;function Ne(){return(Ne=e((()=>{z=t(),i(),c(),l(),f(),B=n(),Me=[`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],V=2e5,H=Ae(9),U=new Float32Array(V),W=new Float32Array(V),G=new Float32Array(V);for(let e=0;e<V;e++){let t=H()*Math.PI*2,n=2+Math.cos(7*t),r=.18*Math.sqrt(-2*Math.log(1-H())),i=H()*Math.PI*2;U[e]=n*Math.cos(3*t)+r*Math.cos(i),W[e]=n*Math.sin(3*t)+r*Math.sin(i),G[e]=Math.sin(7*t)+r*Math.cos(i+1)}})))()}function Pe(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,Fe.useMemo)(()=>[{name:e(`trajectory`),data:{x:J,y:Y,z:X,value:Z},lineWidth:1.5,format:t=>e(`seconds`,{value:t.toFixed(2)})}],[e]);return(0,Ie.jsx)(oe,{series:t,colorScale:`plasma`,colorBar:{title:e(`time`),format:t=>e(`seconds`,{value:t})},camera:{azimuth:20,elevation:18},height:440,ariaLabel:e(`lorenzAria`)})}var Fe,Ie,K,q,J,Y,X,Z,Q,$;function Le(){return(Le=e((()=>{Fe=t(),i(),f(),Ie=n(),K=12e3,q=.006,J=new Float64Array(K),Y=new Float64Array(K),X=new Float64Array(K),Z=new Float64Array(K),Q=e=>[10*(e[1]-e[0]),e[0]*(28-e[2])-e[1],e[0]*e[1]-8/3*e[2]],$=[1,1,1];for(let e=0;e<K;e++){let t=Q($),n=Q([$[0]+t[0]*q/2,$[1]+t[1]*q/2,$[2]+t[2]*q/2]),r=Q([$[0]+n[0]*q/2,$[1]+n[1]*q/2,$[2]+n[2]*q/2]),i=Q([$[0]+r[0]*q,$[1]+r[1]*q,$[2]+r[2]*q]);$=[$[0]+(t[0]+2*n[0]+2*r[0]+i[0])*q/6,$[1]+(t[1]+2*n[1]+2*r[1]+i[1])*q/6,$[2]+(t[2]+2*n[2]+2*r[2]+i[2])*q/6],J[e]=$[0],Y[e]=$[1],X[e]=$[2],Z[e]=e*q}})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DProjection,
  type Scatter3DSeries,
} from "minerva-design/charts";

// A DNA double helix: two backbones and the base pairs between them
const TURNS = 4;
const STEPS = 10 * TURNS;
const strandA: [number, number, number][] = [];
const strandB: [number, number, number][] = [];
const pairs: [number, number, number][] = [];
for (let i = 0; i <= STEPS * 6; i++) {
  const t = i / 6;
  const angle = (t / 10) * Math.PI * 2;
  const z = t * 0.34;
  strandA.push([Math.cos(angle), Math.sin(angle), z]);
  strandB.push([Math.cos(angle + 2.4), Math.sin(angle + 2.4), z]);
  if (i % 6 === 0) {
    for (let k = 1; k < 8; k++) {
      const a = angle + (2.4 * k) / 8;
      const r = 1 - 0.25 * Math.sin((Math.PI * k) / 8);
      pairs.push([r * Math.cos(a), r * Math.sin(a), z]);
    }
  }
}

export default function AutoRotateDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [rotate, setRotate] = useState(true);
  const [projection, setProjection] =
    useState<Chart3DProjection>("perspective");

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("backbone1"), data: strandA, pointSize: 9 },
      { name: t("backbone2"), data: strandB, pointSize: 9 },
      {
        name: t("basePairs"),
        data: pairs,
        pointSize: 5,
        color: "var(--text-secondary-color, #94a3b8)",
      },
    ],
    [t],
  );
  const camera = useMemo(
    () => ({ elevation: 12, zoom: 1.15, projection }),
    [projection],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={rotate}
          label={t("autoRotate")}
          onChange={setRotate}
        />
        <RadioGroup
          aria-label={t("projection")}
          direction="horizontal"
          size="small"
          value={projection}
          onChange={(value) => setProjection(value as Chart3DProjection)}
        >
          <Radio value="perspective" label={t("perspective")} />
          <Radio value="orthographic" label={t("orthographic")} />
        </RadioGroup>
      </div>
      <Scatter3DChart
        series={series}
        autoRotate={rotate ? 24 : false}
        aspect={[0.5, 0.5, 1]}
        box={false}
        camera={camera}
        height={420}
        ariaLabel={t("helixAria")}
      />
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DCameraState,
  type Chart3DHandle,
  type Scatter3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A "Swiss roll": a sheet rolled up in 3D, colored by its position along
// the roll (the classic test set of manifold learning)
const COUNT = 4000;
const random = mulberry32(21);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const along = new Float64Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = 1.5 * Math.PI * (1 + 2 * random());
  x[i] = t * Math.cos(t);
  y[i] = random() * 21;
  z[i] = t * Math.sin(t);
  along[i] = t;
}

const VIEWS = {
  front: { azimuth: 0, elevation: 0 },
  side: { azimuth: 90, elevation: 0 },
  top: { azimuth: 0, elevation: 89 },
} as const;

export default function CameraDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const chart = useRef<Chart3DHandle>(null);
  const [camera, setCamera] = useState<Chart3DCameraState | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("roll"),
        data: { x, y, z, value: along },
        pointSize: 4,
        format: (value) => value.toFixed(2),
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(VIEWS) as (keyof typeof VIEWS)[]).map((view) => (
          <Button
            key={view}
            size="small"
            color="neutral"
            variant="outline"
            onClick={() =>
              chart.current?.setCamera({ ...VIEWS[view], zoom: 1, pan: [0, 0] })
            }
          >
            {t(\`views.\${view}\`)}
          </Button>
        ))}
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => chart.current?.resetCamera()}
        >
          {t("views.reset")}
        </Button>
      </div>
      <Scatter3DChart
        ref={chart}
        series={series}
        colorScale="spectral"
        colorBar={{ title: t("position") }}
        aspect={[1, 1, 1]}
        onCameraChange={setCamera}
        height={420}
        ariaLabel={t("rollAria")}
      />
      <p
        aria-live="polite"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {camera
          ? t("cameraState", {
              azimuth: Math.round(camera.azimuth),
              elevation: Math.round(camera.elevation),
              zoom: camera.zoom.toFixed(2),
            })
          : t("cameraHint")}
      </p>
    </div>
  );
}
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Three flower species measured on three features (an iris-like data set):
// mean and spread of the sepal length, sepal width and petal length, in cm
const SPECIES = [
  { key: "setosa", mean: [5.0, 3.4, 1.5], spread: [0.35, 0.38, 0.17] },
  { key: "versicolor", mean: [5.9, 2.8, 4.3], spread: [0.52, 0.31, 0.47] },
  { key: "virginica", mean: [6.6, 3.0, 5.6], spread: [0.64, 0.32, 0.55] },
] as const;

const random = mulberry32(11);
// Box-Muller transform: normally distributed samples
const normal = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const round = (value: number) => Math.round(value * 10) / 10;
const flowers = SPECIES.map(({ mean, spread }) =>
  Array.from(
    { length: 60 },
    () =>
      [
        round(mean[0] + normal() * spread[0]),
        round(mean[1] + normal() * spread[1]),
        round(mean[2] + normal() * spread[2]),
      ] as const,
  ),
);

export default function ClustersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SPECIES.map(({ key }, i) => ({
        name: t(\`species.\${key}\`),
        data: flowers[i] ?? [],
        pointSize: 8,
      })),
    [t],
  );

  return (
    <Scatter3DChart
      series={series}
      xAxis={{ title: t("sepalLength") }}
      yAxis={{ title: t("sepalWidth") }}
      zAxis={{ title: t("petalLength") }}
      height={420}
      ariaLabel={t("clustersAria")}
    />
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 300 sensors in a 40 × 24 × 9 m warehouse: warmer under the roof and
// around a heater; the dot size shows the relative humidity
const COUNT = 300;
const random = mulberry32(5);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const temperature = new Float64Array(COUNT);
const size = new Float64Array(COUNT);
const humidity: number[] = [];
for (let i = 0; i < COUNT; i++) {
  x[i] = Math.round(random() * 400) / 10;
  y[i] = Math.round(random() * 240) / 10;
  z[i] = Math.round((0.5 + random() * 8.5) * 10) / 10;
  const heater = Math.hypot(x[i]! - 30, y[i]! - 6, z[i]! - 1.5);
  temperature[i] =
    Math.round(
      (14 + z[i]! * 0.9 + 9 * Math.exp(-(heater * heater) / 60) + random()) *
        10,
    ) / 10;
  const rh = Math.round(70 - temperature[i]! * 1.2 + random() * 8);
  humidity.push(rh);
  size[i] = 4 + (rh - 35) / 4;
}

export default function ColorByValueDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo((): Scatter3DSeries[] => {
    const label = humidity.map((rh, i) =>
      t("sensorLabel", { id: i + 1, humidity: rh }),
    );
    return [
      {
        name: t("sensors"),
        data: { x, y, z, value: temperature, size, label },
        colorBy: "value",
        format: (value) => t("celsius", { value }),
      },
    ];
  }, [t]);

  return (
    <Scatter3DChart
      series={series}
      aspect={[40, 24, 9]}
      xAxis={{ title: t("lengthM") }}
      yAxis={{ title: t("widthM") }}
      zAxis={{ title: t("heightM") }}
      colorScale="coolwarm"
      colorBar={{
        title: t("temperature"),
        format: (value) => t("celsius", { value }),
      }}
      camera={{ azimuth: 25, elevation: 28 }}
      height={420}
      ariaLabel={t("sensorsAria")}
    />
  );
}
`})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 1_000_000;

/** A two-armed spiral galaxy: a bulge, a thin disk and dust between the arms */
function galaxy() {
  const random = mulberry32(42);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const x = new Float32Array(COUNT);
  const y = new Float32Array(COUNT);
  const z = new Float32Array(COUNT);
  const distance = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    let px: number;
    let py: number;
    let pz: number;
    if (i % 7 === 0) {
      // bulge: a flattened ball of old stars
      px = normal() * 1.1;
      py = normal() * 1.1;
      pz = normal() * 0.6;
    } else {
      // disk: stars around two logarithmic spiral arms
      const r = Math.min(15, -Math.log(1 - random()) * 4 + 0.5);
      const arm = (i % 2) * Math.PI;
      const angle = arm + Math.log(r) * 2.4 + normal() * (0.32 + 0.6 / r);
      px = r * Math.cos(angle) + normal() * 0.25;
      py = r * Math.sin(angle) + normal() * 0.25;
      pz = normal() * 0.25 * Math.exp(-r / 8);
    }
    x[i] = px;
    y[i] = py;
    z[i] = pz;
    distance[i] = Math.hypot(px, py, pz);
  }
  return { x, y, z, value: distance };
}

export default function GalaxyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  // ~60 ms: generated once, when the demo mounts
  const data = useMemo(() => galaxy(), []);
  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("stars"), data, pointSize: 1.25, opacity: 0.7 },
    ],
    [t, data],
  );

  return (
    <Scatter3DChart
      series={series}
      box={false}
      aspect={[1, 1, 0.3]}
      xAxis={{ min: -16, max: 16 }}
      yAxis={{ min: -16, max: 16 }}
      zAxis={{ min: -5, max: 5 }}
      camera={{ elevation: 38, zoom: 1.25 }}
      colorScale={["#fff4d6", "#ffb067", "#ef5da8", "#7c6cff", "#3a7bd5"]}
      valueRange={[0, 14]}
      colorBar={{
        title: t("distance"),
        format: (value) => t("kiloparsecs", { value }),
      }}
      height={460}
      ariaLabel={t("galaxyAria")}
    />
  );
}
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Scatter3DChart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type Scatter3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PREFERENCES: ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// 200,000 points scattered around a (3, 7) torus knot
const COUNT = 200_000;
const random = mulberry32(9);
const x = new Float32Array(COUNT);
const y = new Float32Array(COUNT);
const z = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = random() * Math.PI * 2;
  const r = 2 + Math.cos(7 * t);
  const spread = 0.18 * Math.sqrt(-2 * Math.log(1 - random()));
  const a = random() * Math.PI * 2;
  x[i] = r * Math.cos(3 * t) + spread * Math.cos(a);
  y[i] = r * Math.sin(3 * t) + spread * Math.sin(a);
  z[i] = Math.sin(7 * t) + spread * Math.cos(a + 1);
}

export default function RendererDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("knot"), data: { x, y, z }, colorBy: "z", pointSize: 2 },
    ],
    [t],
  );

  let status = t("starting");
  if (actual) {
    const backend = t(\`renderers.\${actual}\`);
    status =
      preference === "auto" || preference === actual
        ? t("rendererInUse", { backend })
        : t("rendererFallback", {
            requested: t(\`renderers.\${preference}\`),
            backend,
          });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("renderer")}
        direction="horizontal"
        size="small"
        value={preference}
        onChange={(value) => {
          setPreference(value as ChartRendererPreference);
          setActual(null);
        }}
      >
        {PREFERENCES.map((kind) => (
          <Radio key={kind} value={kind} label={t(\`renderers.\${kind}\`)} />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        renderer={preference}
        onRendererChange={setActual}
        colorScale="turbo"
        aspect={[1, 1, 0.45]}
        height={400}
        ariaLabel={t("knotAria")}
      />
      <p
        role="status"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {status}
      </p>
    </div>
  );
}
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Line3DChart, type Line3DSeries } from "minerva-design/charts";

// The Lorenz attractor (σ = 10, ρ = 28, β = 8/3), integrated with RK4
const STEPS = 12_000;
const DT = 0.006;
const x = new Float64Array(STEPS);
const y = new Float64Array(STEPS);
const z = new Float64Array(STEPS);
const time = new Float64Array(STEPS);
const derivative = (p: readonly [number, number, number]) =>
  [
    10 * (p[1] - p[0]),
    p[0] * (28 - p[2]) - p[1],
    p[0] * p[1] - (8 / 3) * p[2],
  ] as const;
let p: [number, number, number] = [1, 1, 1];
for (let i = 0; i < STEPS; i++) {
  const k1 = derivative(p);
  const k2 = derivative([
    p[0] + (k1[0] * DT) / 2,
    p[1] + (k1[1] * DT) / 2,
    p[2] + (k1[2] * DT) / 2,
  ]);
  const k3 = derivative([
    p[0] + (k2[0] * DT) / 2,
    p[1] + (k2[1] * DT) / 2,
    p[2] + (k2[2] * DT) / 2,
  ]);
  const k4 = derivative([
    p[0] + k3[0] * DT,
    p[1] + k3[1] * DT,
    p[2] + k3[2] * DT,
  ]);
  p = [
    p[0] + ((k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) * DT) / 6,
    p[1] + ((k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) * DT) / 6,
    p[2] + ((k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) * DT) / 6,
  ];
  x[i] = p[0];
  y[i] = p[1];
  z[i] = p[2];
  time[i] = i * DT;
}

export default function TrajectoryDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Line3DSeries[] => [
      {
        name: t("trajectory"),
        data: { x, y, z, value: time },
        lineWidth: 1.5,
        format: (value) => t("seconds", { value: value.toFixed(2) }),
      },
    ],
    [t],
  );

  return (
    <Line3DChart
      series={series}
      colorScale="plasma"
      colorBar={{
        title: t("time"),
        format: (value) => t("seconds", { value }),
      }}
      camera={{ azimuth: 20, elevation: 18 }}
      height={440}
      ariaLabel={t("lorenzAria")}
    />
  );
}
`})))()}var Qe,$e,et;function tt(){return(tt=e((()=>{ce(),pe(),ye(),we(),ke(),Ne(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),t(),re(),ae(),Qe=n(),$e=ne(Object.assign({"./demos/auto-rotate.tsx":se,"./demos/camera.tsx":ue,"./demos/clusters.tsx":he,"./demos/color-by-value.tsx":xe,"./demos/galaxy.tsx":De,"./demos/renderer.tsx":je,"./demos/trajectory.tsx":Pe}),Object.assign({"./demos/auto-rotate.tsx":Re,"./demos/camera.tsx":Be,"./demos/clusters.tsx":He,"./demos/color-by-value.tsx":We,"./demos/galaxy.tsx":Ke,"./demos/renderer.tsx":Je,"./demos/trajectory.tsx":Xe})),et=()=>(0,Qe.jsx)(ie,{id:`scatter-3d-chart`,demos:$e})})))()}tt();export{et as default};