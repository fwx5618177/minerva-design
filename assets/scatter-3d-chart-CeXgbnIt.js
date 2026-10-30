import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-Bpw4i9zQ.js";import{n as d,t as f}from"./Switch-DL9RsLtd.js";import{l as p,n as m,t as h,u as g}from"./DocPage-6WUEs69-.js";import{a as _,i as v,r as ee}from"./three-d-CR5r0W6K.js";function te(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,y.useState)(!0),[i,a]=(0,y.useState)(`perspective`),o=(0,y.useMemo)(()=>[{name:e(`backbone1`),data:x,pointSize:9},{name:e(`backbone2`),data:S,pointSize:9},{name:e(`basePairs`),data:C,pointSize:5,color:`var(--text-secondary-color, #94a3b8)`}],[e]),c=(0,y.useMemo)(()=>({elevation:12,zoom:1.15,projection:i}),[i]);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,b.jsx)(f,{size:`small`,checked:t,label:e(`autoRotate`),onChange:n}),(0,b.jsxs)(s,{"aria-label":e(`projection`),direction:`horizontal`,size:`small`,value:i,onChange:e=>a(e),children:[(0,b.jsx)(u,{value:`perspective`,label:e(`perspective`)}),(0,b.jsx)(u,{value:`orthographic`,label:e(`orthographic`)})]})]}),(0,b.jsx)(_,{series:o,autoRotate:t?24:!1,aspect:[.5,.5,1],box:!1,camera:c,height:420,ariaLabel:e(`helixAria`)})]})}var y,b,x,S,C;function ne(){return(ne=e((()=>{y=t(),i(),c(),l(),d(),v(),b=n(),x=[],S=[],C=[];for(let e=0;e<=240;e++){let t=e/6,n=t/10*Math.PI*2,r=t*.34;if(x.push([Math.cos(n),Math.sin(n),r]),S.push([Math.cos(n+2.4),Math.sin(n+2.4),r]),e%6==0)for(let e=1;e<8;e++){let t=n+2.4*e/8,i=1-.25*Math.sin(Math.PI*e/8);C.push([i*Math.cos(t),i*Math.sin(t),r])}}})))()}function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,w.useRef)(null),[n,i]=(0,w.useState)(null),a=(0,w.useMemo)(()=>[{name:e(`roll`),data:{x:O,y:k,z:ae,value:oe},pointSize:4,format:e=>e.toFixed(2)}],[e]);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[Object.keys(se).map(n=>(0,T.jsx)(o,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t.current?.setCamera({...se[n],zoom:1,pan:[0,0]}),children:e(`views.${n}`)},n)),(0,T.jsx)(o,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t.current?.resetCamera(),children:e(`views.reset`)})]}),(0,T.jsx)(_,{ref:t,series:a,colorScale:`spectral`,colorBar:{title:e(`position`)},aspect:[1,1,1],onCameraChange:i,height:420,ariaLabel:e(`rollAria`)}),(0,T.jsx)(`p`,{"aria-live":`polite`,style:{margin:0,color:`var(--text-secondary-color)`},children:n?e(`cameraState`,{azimuth:Math.round(n.azimuth),elevation:Math.round(n.elevation),zoom:n.zoom.toFixed(2)}):e(`cameraHint`)})]})}var w,T,E,D,O,k,ae,oe,se;function ce(){return(ce=e((()=>{w=t(),i(),a(),v(),T=n(),E=4e3,D=re(21),O=new Float64Array(E),k=new Float64Array(E),ae=new Float64Array(E),oe=new Float64Array(E);for(let e=0;e<E;e++){let t=1.5*Math.PI*(1+2*D());O[e]=t*Math.cos(t),k[e]=D()*21,ae[e]=t*Math.sin(t),oe[e]=t}se={front:{azimuth:0,elevation:0},side:{azimuth:90,elevation:0},top:{azimuth:0,elevation:89}}})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,de.useMemo)(()=>pe.map(({key:t},n)=>({name:e(`species.${t}`),data:me[n]??[],pointSize:8})),[e]);return(0,fe.jsx)(_,{series:t,xAxis:{title:e(`sepalLength`)},yAxis:{title:e(`sepalWidth`)},zAxis:{title:e(`petalLength`)},height:420,ariaLabel:e(`clustersAria`)})}var de,fe,pe,A,j,M,me;function he(){return(he=e((()=>{de=t(),i(),v(),fe=n(),pe=[{key:`setosa`,mean:[5,3.4,1.5],spread:[.35,.38,.17]},{key:`versicolor`,mean:[5.9,2.8,4.3],spread:[.52,.31,.47]},{key:`virginica`,mean:[6.6,3,5.6],spread:[.64,.32,.55]}],A=le(11),j=()=>Math.sqrt(-2*Math.log(1-A()))*Math.cos(2*Math.PI*A()),M=e=>Math.round(e*10)/10,me=pe.map(({mean:e,spread:t})=>Array.from({length:60},()=>[M(e[0]+j()*t[0]),M(e[1]+j()*t[1]),M(e[2]+j()*t[2])]))})))()}function ge(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function _e(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,ve.useMemo)(()=>{let t=B.map((t,n)=>e(`sensorLabel`,{id:n+1,humidity:t}));return[{name:e(`sensors`),data:{x:F,y:I,z:L,value:R,size:z,label:t},colorBy:`value`,format:t=>e(`celsius`,{value:t})}]},[e]);return(0,ye.jsx)(_,{series:t,aspect:[40,24,9],xAxis:{title:e(`lengthM`)},yAxis:{title:e(`widthM`)},zAxis:{title:e(`heightM`)},colorScale:`coolwarm`,colorBar:{title:e(`temperature`),format:t=>e(`celsius`,{value:t})},camera:{azimuth:25,elevation:28},height:420,ariaLabel:e(`sensorsAria`)})}var ve,ye,N,P,F,I,L,R,z,B;function be(){return(be=e((()=>{ve=t(),i(),v(),ye=n(),N=300,P=ge(5),F=new Float64Array(N),I=new Float64Array(N),L=new Float64Array(N),R=new Float64Array(N),z=new Float64Array(N),B=[];for(let e=0;e<N;e++){F[e]=Math.round(P()*400)/10,I[e]=Math.round(P()*240)/10,L[e]=Math.round((.5+P()*8.5)*10)/10;let t=Math.hypot(F[e]-30,I[e]-6,L[e]-1.5);R[e]=Math.round((14+L[e]*.9+9*Math.exp(-(t*t)/60)+P())*10)/10;let n=Math.round(70-R[e]*1.2+P()*8);B.push(n),z[e]=4+(n-35)/4}})))()}function xe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Se(e){let t=e/100,n=e=>Math.max(0,Math.min(255,e)),r=t<=66?255:329.698727446*(t-60)**-.1332047592,i=t<=66?99.4708025861*Math.log(t)-161.1195681661:288.1221695283*(t-60)**-.0755148492,a=t>=66?255:t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307;return[n(r),n(i),n(a)]}function Ce([e,t,n],r){let i=Math.max(0,Math.min(1,r));return Math.round(e*i)<<16|Math.round(t*i)<<8|Math.round(n*i)}function we(){let e=xe(7),t=()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e()),n=t=>(e()<.5?-t:t)*Math.log(1-e()),r=(t,n)=>t+(n-t)*e(),i=(e,t)=>{for(;;){let n=e();if(t(n))return n}},a=(e,t,n)=>e<1.6?0:Math.exp(-(((t-.2)/.14)**2))*Math.exp(-Math.abs(n)/.2)*Math.min(1,(e-1.6)/1.5)*.95,o=(e,t,n,r,i,a,o,s)=>{e.x[t]=n,e.y[t]=r,e.z[t]=i,e.size[t]=a,e.color[t]=Ce(Se(o),s)},s=(e,t,n,r,i,s,c,l)=>{let u=a(n,G(n,r),i);o(e,t,n*Math.cos(r),n*Math.sin(r),i,s,c*(1-.5*u),l*(1-u))},c=H(16e4),l=25*Math.PI/180;for(let t=0;t<16e4;t++){let n=-.42*Math.log(e()*e()),i=2*e()-1,a=2*Math.PI*e(),s=Math.sqrt(1-i*i),u=n*s*Math.cos(a),d=n*s*Math.sin(a);t%2==0&&(u*=2.1,d*=.75),o(c,t,u*Math.cos(l)-d*Math.sin(l),u*Math.sin(l)+d*Math.cos(l),n*i*.55,1.1,r(3e3,4600),r(.4,.85))}let u=H(48e4);for(let t=0;t<48e4;t++){let a=i(()=>-3*Math.log(e()*e()),e=>e>=.6&&e<=16),o=i(()=>2*Math.PI*e(),t=>e()<=.5+.5*Math.exp(-((G(a,t)/.7)**2))),c=n(.18+a*.012),l=e()<.01;s(u,t,a,o,c,l?2:1,l?r(3200,4200):r(3800,6500),l?.9:r(.3,.7))}let d=H(26e4),f={x:0,y:0,spread:0,left:0};for(let i=0;i<26e4;i++){let a=3+12.5*e()**.8,o;if(i%20<9){if(f.left<=0){let n=t()*(.3+.025*a),o=W(i%2,a)+n/(a*Math.sin(U))+t()*.04;f={x:a*Math.cos(o),y:a*Math.sin(o),spread:r(.12,.45),left:20+Math.floor(e()*120)}}f.left--;let n=f.x+t()*f.spread,s=f.y+t()*f.spread;a=Math.hypot(n,s),o=Math.atan2(s,n)}else{let e=t()*(.4+.03*a);o=W(i%2,a)+e/(a*Math.sin(U))+t()*.03}let c=e()<.04;s(d,i,a,o,n(.06),c?2.4:1.2,9e3+21e3*e()**1.5,c?1:r(.4,.8))}let p=H(4e4),m=[255,70,150],h=[255,130,190];for(let n=0;n<500;n++){let i=3.2+10.5*e()**.85,a=-.1+t()*.35,o=W(n%2,i)+a/(i*Math.sin(U)),s=i*Math.cos(o),c=i*Math.sin(o),l=r(.04,.12);for(let i=0;i<80;i++){let a=n*80+i,o=e();p.x[a]=s+t()*l,p.y[a]=c+t()*l,p.z[a]=t()*l*.4,p.size[a]=1.8,p.color[a]=Ce([m[0]+(h[0]-m[0])*o,m[1]+(h[1]-m[1])*o,m[2]+(h[2]-m[2])*o],r(.5,1))}}let g=H(6e4);for(let t=0;t<6e4;t++){let n=i(()=>-4.5*Math.log(e()*e()),e=>e<=22),a=2*e()-1,s=2*Math.PI*e(),c=Math.sqrt(1-a*a);o(g,t,n*c*Math.cos(s),n*c*Math.sin(s),n*a*.8,1.1,r(3800,5600),r(.2,.45))}return{bulge:c,disk:u,young:d,nebulae:p,halo:g}}function Te(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,V.useMemo)(()=>we(),[]),n=(0,V.useMemo)(()=>{let n={pointStyle:`glow`,blend:`additive`};return[{...n,name:e(`galaxy.bulge`),color:`#ffc477`,data:t.bulge,opacity:.08},{...n,name:e(`galaxy.disk`),color:`#ffe2b8`,data:t.disk,opacity:.06},{...n,name:e(`galaxy.arms`),color:`#9cc4ff`,data:t.young,opacity:.07},{...n,name:e(`galaxy.nebulae`),color:`#ff6aa9`,data:t.nebulae,opacity:.1},{...n,name:e(`galaxy.halo`),color:`#c9a77f`,data:t.halo,opacity:.5}]},[e,t]),i=t=>e(`kiloparsecs`,{value:t.toFixed(1)});return(0,Ee.jsx)(_,{series:n,box:!1,aspect:[1,1,.35],xAxis:{min:-16,max:16,format:i},yAxis:{min:-16,max:16,format:i},zAxis:{min:-5.6,max:5.6,format:i},camera:{azimuth:20,elevation:34,zoom:1.75,fov:28},autoRotate:4,height:500,style:ke,ariaLabel:e(`galaxyAria`)})}var V,Ee,H,U,De,Oe,W,G,ke;function Ae(){return(Ae=e((()=>{V=t(),i(),v(),Ee=n(),H=e=>({x:new Float32Array(e),y:new Float32Array(e),z:new Float32Array(e),size:new Float32Array(e),color:new Uint32Array(e)}),U=16*Math.PI/180,De=1/Math.tan(U),Oe=2.2,W=(e,t)=>e*Math.PI+Math.log(t/Oe)*De,G=(e,t)=>{let n=(t-W(0,e))%Math.PI;return n>Math.PI/2&&(n-=Math.PI),n<-Math.PI/2&&(n+=Math.PI),n*e*Math.sin(U)},ke={background:`radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)`,borderRadius:12,"--surface-color":`#05070f`,"--surface-elevated-color":`#111729`,"--text-color":`#e6e9f2`,"--text-secondary-color":`#9aa3b8`,"--border-color":`#2a3247`}})))()}function je(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Me(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,K.useState)(`auto`),[i,a]=(0,K.useState)(null),o=(0,K.useMemo)(()=>[{name:e(`knot`),data:{x:Pe,y:Fe,z:Ie},colorBy:`z`,pointSize:2}],[e]),c=e(`starting`);if(i){let n=e(`renderers.${i}`);c=t===`auto`||t===i?e(`rendererInUse`,{backend:n}):e(`rendererFallback`,{requested:e(`renderers.${t}`),backend:n})}return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,q.jsx)(s,{"aria-label":e(`renderer`),direction:`horizontal`,size:`small`,value:t,onChange:e=>{n(e),a(null)},children:Ne.map(t=>(0,q.jsx)(u,{value:t,label:e(`renderers.${t}`)},t))}),(0,q.jsx)(_,{series:o,renderer:t,onRendererChange:a,colorScale:`turbo`,aspect:[1,1,.45],height:400,ariaLabel:e(`knotAria`)}),(0,q.jsx)(`p`,{role:`status`,style:{margin:0,color:`var(--text-secondary-color)`},children:c})]})}var K,q,Ne,J,Y,Pe,Fe,Ie;function Le(){return(Le=e((()=>{K=t(),i(),c(),l(),v(),q=n(),Ne=[`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],J=2e5,Y=je(9),Pe=new Float32Array(J),Fe=new Float32Array(J),Ie=new Float32Array(J);for(let e=0;e<J;e++){let t=Y()*Math.PI*2,n=2+Math.cos(7*t),r=.18*Math.sqrt(-2*Math.log(1-Y())),i=Y()*Math.PI*2;Pe[e]=n*Math.cos(3*t)+r*Math.cos(i),Fe[e]=n*Math.sin(3*t)+r*Math.sin(i),Ie[e]=Math.sin(7*t)+r*Math.cos(i+1)}})))()}function Re(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,ze.useMemo)(()=>[{name:e(`trajectory`),data:{x:Ve,y:He,z:Ue,value:We},lineWidth:1.5,format:t=>e(`seconds`,{value:t.toFixed(2)})}],[e]);return(0,Be.jsx)(ee,{series:t,colorScale:`plasma`,colorBar:{title:e(`time`),format:t=>e(`seconds`,{value:t})},camera:{azimuth:20,elevation:18},height:440,ariaLabel:e(`lorenzAria`)})}var ze,Be,X,Z,Ve,He,Ue,We,Q,$;function Ge(){return(Ge=e((()=>{ze=t(),i(),v(),Be=n(),X=12e3,Z=.006,Ve=new Float64Array(X),He=new Float64Array(X),Ue=new Float64Array(X),We=new Float64Array(X),Q=e=>[10*(e[1]-e[0]),e[0]*(28-e[2])-e[1],e[0]*e[1]-8/3*e[2]],$=[1,1,1];for(let e=0;e<X;e++){let t=Q($),n=Q([$[0]+t[0]*Z/2,$[1]+t[1]*Z/2,$[2]+t[2]*Z/2]),r=Q([$[0]+n[0]*Z/2,$[1]+n[1]*Z/2,$[2]+n[2]*Z/2]),i=Q([$[0]+r[0]*Z,$[1]+r[1]*Z,$[2]+r[2]*Z]);$=[$[0]+(t[0]+2*n[0]+2*r[0]+i[0])*Z/6,$[1]+(t[1]+2*n[1]+2*r[1]+i[1])*Z/6,$[2]+(t[2]+2*n[2]+2*r[2]+i[2])*Z/6],Ve[e]=$[0],He[e]=$[1],Ue[e]=$[2],We[e]=e*Z}})))()}var Ke;function qe(){return(qe=e((()=>{Ke=`import { useMemo, useState } from "react";
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
`})))()}var Je;function Ye(){return(Ye=e((()=>{Je=`import { useMemo, useRef, useState } from "react";
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
`})))()}var Xe;function Ze(){return(Ze=e((()=>{Xe=`import { useMemo } from "react";
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
`})))()}var Qe;function $e(){return($e=e((()=>{Qe=`import { useMemo } from "react";
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
`})))()}var et;function tt(){return(tt=e((()=>{et=`import { useMemo, type CSSProperties } from "react";
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

/** Color of a black body at \`kelvin\` (0-255 channels, Tanner Helland's fit) */
function blackbody(kelvin: number): [number, number, number] {
  const t = kelvin / 100;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b =
    t >= 66
      ? 255
      : t <= 19
        ? 0
        : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [clamp(r), clamp(g), clamp(b)];
}

/** \`0xRRGGBB\` of a color scaled by a brightness (additive light) */
function rgb([r, g, b]: [number, number, number], brightness: number) {
  const k = Math.max(0, Math.min(1, brightness));
  return (
    (Math.round(r * k) << 16) | (Math.round(g * k) << 8) | Math.round(b * k)
  );
}

interface Population {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  size: Float32Array;
  color: Uint32Array;
}

const population = (count: number): Population => ({
  x: new Float32Array(count),
  y: new Float32Array(count),
  z: new Float32Array(count),
  size: new Float32Array(count),
  color: new Uint32Array(count),
});

/** Two logarithmic arms (kpc): pitch angle and radius where they start */
const PITCH = (16 * Math.PI) / 180;
const WIND = 1 / Math.tan(PITCH);
const ARM_START = 2.2;
/** Angle of arm \`k\` (0 or 1) at radius \`r\` */
const armAngle = (k: number, r: number) =>
  k * Math.PI + Math.log(r / ARM_START) * WIND;
/**
 * Signed distance (kpc) to the nearest arm across it; positive on the
 * inner (concave) side, where the dust lanes lie
 */
const armOffset = (r: number, angle: number) => {
  let d = (angle - armAngle(0, r)) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  if (d < -Math.PI / 2) d += Math.PI;
  return d * r * Math.sin(PITCH);
};

/**
 * A barred spiral galaxy of 1,000,000 stars (deterministic): a warm bulge,
 * an old disk, young blue stars and pink HII regions along two logarithmic
 * arms, dust lanes on the inner edge of the arms, and a faint halo.
 */
function galaxy() {
  const random = mulberry32(7);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  // two-sided exponential (thin disk heights)
  const laplace = (h: number) =>
    (random() < 0.5 ? -h : h) * Math.log(1 - random());
  const between = (a: number, b: number) => a + (b - a) * random();
  /** Draws until \`accept\` takes the value (rejection sampling) */
  const sample = (draw: () => number, accept: (value: number) => boolean) => {
    for (;;) {
      const value = draw();
      if (accept(value)) return value;
    }
  };
  /** Dust absorption (0-1) at a radius, offset to the arm and height */
  const dust = (r: number, offset: number, z: number) =>
    r < 1.6
      ? 0
      : Math.exp(-(((offset - 0.2) / 0.14) ** 2)) *
        Math.exp(-Math.abs(z) / 0.2) *
        Math.min(1, (r - 1.6) / 1.5) *
        0.95;
  const place = (
    p: Population,
    i: number,
    x: number,
    y: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    p.x[i] = x;
    p.y[i] = y;
    p.z[i] = z;
    p.size[i] = size;
    p.color[i] = rgb(blackbody(kelvin), brightness);
  };
  /** A disk star: dimmed and reddened inside a dust lane */
  const diskStar = (
    p: Population,
    i: number,
    r: number,
    angle: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    const a = dust(r, armOffset(r, angle), z);
    place(
      p,
      i,
      r * Math.cos(angle),
      r * Math.sin(angle),
      z,
      size,
      kelvin * (1 - 0.5 * a),
      brightness * (1 - a),
    );
  };

  // bulge and bar: old K / G stars
  const bulge = population(160_000);
  const bar = (25 * Math.PI) / 180;
  for (let i = 0; i < 160_000; i++) {
    const r = -0.42 * Math.log(random() * random());
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    let x = r * s * Math.cos(phi);
    let y = r * s * Math.sin(phi);
    if (i % 2 === 0) {
      // the bar: stretched along its axis
      x *= 2.1;
      y *= 0.75;
    }
    place(
      bulge,
      i,
      x * Math.cos(bar) - y * Math.sin(bar),
      x * Math.sin(bar) + y * Math.cos(bar),
      r * u * 0.55,
      1.1,
      between(3000, 4600),
      between(0.4, 0.85),
    );
  }

  // old disk: exponential, slightly crowded on the arms
  const disk = population(480_000);
  for (let i = 0; i < 480_000; i++) {
    const r = sample(
      () => -3 * Math.log(random() * random()),
      (v) => v >= 0.6 && v <= 16,
    );
    const angle = sample(
      () => 2 * Math.PI * random(),
      (a) => random() <= 0.5 + 0.5 * Math.exp(-((armOffset(r, a) / 0.7) ** 2)),
    );
    const z = laplace(0.18 + r * 0.012);
    const giant = random() < 0.01;
    diskStar(
      disk,
      i,
      r,
      angle,
      z,
      giant ? 2 : 1,
      giant ? between(3200, 4200) : between(3800, 6500),
      giant ? 0.9 : between(0.3, 0.7),
    );
  }

  // young stars along the arms: blue-white, a very thin disk, mostly in
  // associations (knots) strung along the arms
  const young = population(260_000);
  let knot = { x: 0, y: 0, spread: 0, left: 0 };
  for (let i = 0; i < 260_000; i++) {
    let r = ARM_START + 0.8 + 12.5 * random() ** 0.8;
    let angle: number;
    if (i % 20 < 9) {
      if (knot.left <= 0) {
        const across = normal() * (0.3 + 0.025 * r);
        const center =
          armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.04;
        knot = {
          x: r * Math.cos(center),
          y: r * Math.sin(center),
          spread: between(0.12, 0.45),
          left: 20 + Math.floor(random() * 120),
        };
      }
      knot.left--;
      const kx = knot.x + normal() * knot.spread;
      const ky = knot.y + normal() * knot.spread;
      r = Math.hypot(kx, ky);
      angle = Math.atan2(ky, kx);
    } else {
      const across = normal() * (0.4 + 0.03 * r);
      angle =
        armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.03;
    }
    const bright = random() < 0.04;
    diskStar(
      young,
      i,
      r,
      angle,
      laplace(0.06),
      bright ? 2.4 : 1.2,
      9000 + 21000 * random() ** 1.5,
      bright ? 1 : between(0.4, 0.8),
    );
  }

  // HII regions: pink clumps just outside the dust lanes
  const nebulae = population(40_000);
  const pink: [number, number, number] = [255, 70, 150];
  const rose: [number, number, number] = [255, 130, 190];
  for (let c = 0; c < 500; c++) {
    const r = 3.2 + 10.5 * random() ** 0.85;
    const across = -0.1 + normal() * 0.35;
    const center = armAngle(c % 2, r) + across / (r * Math.sin(PITCH));
    const cx = r * Math.cos(center);
    const cy = r * Math.sin(center);
    const spread = between(0.04, 0.12);
    for (let k = 0; k < 80; k++) {
      const i = c * 80 + k;
      const mix = random();
      nebulae.x[i] = cx + normal() * spread;
      nebulae.y[i] = cy + normal() * spread;
      nebulae.z[i] = normal() * spread * 0.4;
      nebulae.size[i] = 1.8;
      nebulae.color[i] = rgb(
        [
          pink[0] + (rose[0] - pink[0]) * mix,
          pink[1] + (rose[1] - pink[1]) * mix,
          pink[2] + (rose[2] - pink[2]) * mix,
        ],
        between(0.5, 1),
      );
    }
  }

  // halo: a faint sphere of old stars
  const halo = population(60_000);
  for (let i = 0; i < 60_000; i++) {
    const r = sample(
      () => -4.5 * Math.log(random() * random()),
      (v) => v <= 22,
    );
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    place(
      halo,
      i,
      r * s * Math.cos(phi),
      r * s * Math.sin(phi),
      r * u * 0.8,
      1.1,
      between(3800, 5600),
      between(0.2, 0.45),
    );
  }

  return { bulge, disk, young, nebulae, halo };
}

/** Night-sky colors of the chart (its theme reads these variables) */
const SPACE = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 12,
  "--surface-color": "#05070f",
  "--surface-elevated-color": "#111729",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;

export default function GalaxyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  // ~150 ms: generated once, when the demo mounts
  const stars = useMemo(() => galaxy(), []);
  const series = useMemo((): Scatter3DSeries[] => {
    const common = {
      pointStyle: "glow",
      blend: "additive",
    } as const;
    return [
      {
        ...common,
        name: t("galaxy.bulge"),
        color: "#ffc477",
        data: stars.bulge,
        opacity: 0.08,
      },
      {
        ...common,
        name: t("galaxy.disk"),
        color: "#ffe2b8",
        data: stars.disk,
        opacity: 0.06,
      },
      {
        ...common,
        name: t("galaxy.arms"),
        color: "#9cc4ff",
        data: stars.young,
        opacity: 0.07,
      },
      {
        ...common,
        name: t("galaxy.nebulae"),
        color: "#ff6aa9",
        data: stars.nebulae,
        opacity: 0.1,
      },
      {
        ...common,
        name: t("galaxy.halo"),
        color: "#c9a77f",
        data: stars.halo,
        opacity: 0.5,
      },
    ];
  }, [t, stars]);

  const kpc = (value: number) => t("kiloparsecs", { value: value.toFixed(1) });
  return (
    <Scatter3DChart
      series={series}
      box={false}
      aspect={[1, 1, 0.35]}
      xAxis={{ min: -16, max: 16, format: kpc }}
      yAxis={{ min: -16, max: 16, format: kpc }}
      zAxis={{ min: -5.6, max: 5.6, format: kpc }}
      camera={{ azimuth: 20, elevation: 34, zoom: 1.75, fov: 28 }}
      autoRotate={4}
      height={500}
      style={SPACE}
      ariaLabel={t("galaxyAria")}
    />
  );
}
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useMemo, useState } from "react";
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
`})))()}var it;function at(){return(at=e((()=>{it=`import { useMemo } from "react";
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
`})))()}var ot,st,ct;function lt(){return(lt=e((()=>{ne(),ce(),he(),be(),Ae(),Le(),Ge(),qe(),Ye(),Ze(),$e(),tt(),rt(),at(),t(),m(),g(),ot=n(),st=p(Object.assign({"./demos/auto-rotate.tsx":te,"./demos/camera.tsx":ie,"./demos/clusters.tsx":ue,"./demos/color-by-value.tsx":_e,"./demos/galaxy.tsx":Te,"./demos/renderer.tsx":Me,"./demos/trajectory.tsx":Re}),Object.assign({"./demos/auto-rotate.tsx":Ke,"./demos/camera.tsx":Je,"./demos/clusters.tsx":Xe,"./demos/color-by-value.tsx":Qe,"./demos/galaxy.tsx":et,"./demos/renderer.tsx":nt,"./demos/trajectory.tsx":it})),ct=()=>(0,ot.jsx)(h,{id:`scatter-3d-chart`,demos:st})})))()}lt();export{ct as default};