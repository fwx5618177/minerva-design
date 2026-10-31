import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{n as l,t as u}from"./Switch-CHbzff3y.js";import{l as d,n as ee,t as te,u as ne}from"./DocPage-CmQtD5jg.js";import{i as f,n as p}from"./three-d-Dooj_2YE.js";function m(e,t,n){let r=Float64Array.from({length:t},(n,r)=>-e+2*e*r/(t-1)),i=new Float32Array(t*t);for(let e=0;e<t;e++)for(let a=0;a<t;a++)i[e*t+a]=n(r[a],r[e]);return{rows:t,cols:t,x:r,y:r,z:i}}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[t,n]=(0,h.useState)(`sinc`),i=(0,h.useMemo)(()=>[{name:e(`functions.${t}`),data:_[t]}],[e,t]);return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,g.jsx)(a,{"aria-label":e(`function`),direction:`horizontal`,size:`small`,value:t,onChange:e=>n(e),children:Object.keys(_).map(t=>(0,g.jsx)(c,{value:t,label:e(`functions.${t}`)},t))}),(0,g.jsx)(p,{series:i,xAxis:{title:e(`x`)},yAxis:{title:e(`y`)},zAxis:{title:e(`z`)},height:420,ariaLabel:e(`functionsAria`,{name:e(`functions.${t}`)})})]})}var h,g,_;function v(){return(v=e((()=>{h=t(),i(),o(),s(),f(),g=n(),_={sinc:m(10,90,(e,t)=>{let n=Math.hypot(e,t);return n===0?1:Math.sin(n)/n}),peaks:m(3,90,(e,t)=>3*(1-e)**2*Math.exp(-(e**2)-(t+1)**2)-10*(e/5-e**3-t**5)*Math.exp(-(e**2)-t**2)-Math.exp(-((e+1)**2)-t**2)/3),saddle:m(1,60,(e,t)=>e*e-t*t)}})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[t,n]=(0,y.useState)(!0),[i,a]=(0,y.useState)(()=>w(0)),o=(0,y.useRef)(null);(0,y.useEffect)(()=>{let e=o.current;if(!t||!e)return;let n=0,r=!1,i=0,s=0,c=e=>{n=0,r&&!document.hidden&&(e-i>=33&&(s+=i?Math.min(.1,(e-i)/1e3):0,i=e,a(w(s))),n=requestAnimationFrame(c))},l=()=>{!n&&r&&!document.hidden&&(i=0,n=requestAnimationFrame(c))},u=new IntersectionObserver(([e])=>{r=!!e?.isIntersecting,l()});return u.observe(e),document.addEventListener(`visibilitychange`,l),()=>{u.disconnect(),document.removeEventListener(`visibilitychange`,l),cancelAnimationFrame(n)}},[t]);let s=(0,y.useMemo)(()=>[{name:e(`wave`),data:i}],[e,i]);return(0,b.jsxs)(`div`,{ref:o,style:{display:`grid`,gap:12,width:`100%`},children:[(0,b.jsx)(u,{size:`small`,checked:t,label:e(`play`),onChange:n}),(0,b.jsx)(p,{series:s,zAxis:{min:-1,max:1,title:e(`amplitude`)},valueRange:[-1,1],colorScale:`coolwarm`,colorBar:!1,aspect:[1,1,.45],camera:{elevation:32},height:420,ariaLabel:e(`waveAria`)})]})}var y,b,x,S,C,w;function T(){return(T=e((()=>{y=t(),i(),l(),f(),b=n(),x=100,S=Float64Array.from({length:x},(e,t)=>-6+12*t/99),C=new Float32Array(1e4);for(let e=0;e<x;e++)for(let t=0;t<x;t++)C[e*x+t]=Math.hypot(S[t],S[e]);w=e=>{let t=new Float32Array(1e4);for(let n=0;n<t.length;n++){let r=C[n];t[n]=Math.sin(r*2.2-e*3)*Math.exp(-r*.22)}return{rows:x,cols:x,x:S,y:S,z:t}}})))()}function ae(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),t=(0,se.useMemo)(()=>[{name:e(`island`),data:j}],[e]),n=t=>e(`km`,{value:t}),i=t=>e(`meters`,{value:Math.round(t)});return(0,ce.jsx)(p,{series:t,aspect:[1,1,.28],colorScale:`terrain`,xAxis:{title:e(`east`),format:n},yAxis:{title:e(`north`),format:n},zAxis:{title:e(`elevation`),format:i},colorBar:{title:e(`elevation`),format:i},lighting:{ambient:.35,diffuse:.8,specular:.08},camera:{azimuth:30,elevation:38},height:440,ariaLabel:e(`terrainAria`)})}var se,ce,E,le,ue,de,fe,D,O,k,A,j;function M(){return(M=e((()=>{se=t(),i(),f(),ce=n(),E=180,le=20,ue=ae(2026),de=64,fe=Float64Array.from({length:4096},()=>ue()),D=e=>e*e*(3-2*e),O=(e,t)=>{let n=Math.floor(e),r=Math.floor(t),i=D(e-n),a=D(t-r),o=(e,t)=>fe[(t&63)*de+(e&63)|0],s=o(n,r)+(o(n+1,r)-o(n,r))*i;return s+(o(n,r+1)+(o(n+1,r+1)-o(n,r+1))*i-s)*a},k=Float64Array.from({length:E},(e,t)=>Math.round(t*le/179*100)/100),A=new Float32Array(32400);for(let e=0;e<E;e++)for(let t=0;t<E;t++){let n=0,r=1,i=5/E;for(let a=0;a<6;a++)n+=O(t*i,e*i)*r,r*=.5,i*=2;let a=t/179-.5,o=e/179-.5,s=1-Math.min(1,Math.hypot(a,o)*2.1);A[e*E+t]=Math.max(0,(n*.9-1+s*1.3)*1400)}j={rows:E,cols:E,x:k,y:k,z:A}})))()}function pe(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),t=(0,N.useMemo)(()=>[{name:e(`bowl`),data:R,colorBy:`series`,opacity:.7},{name:e(`plane`),data:z,colorBy:`series`,opacity:.55,wireframe:{step:6}}],[e]);return(0,P.jsx)(p,{series:t,xAxis:{title:e(`x`)},yAxis:{title:e(`y`)},zAxis:{title:e(`z`)},camera:{azimuth:-30,elevation:22},height:420,ariaLabel:e(`transparencyAria`)})}var N,P,F,I,L,R,z;function B(){return(B=e((()=>{N=t(),i(),f(),P=n(),F=60,I=Float64Array.from({length:F},(e,t)=>-2+4*t/59),L=e=>{let t=new Float32Array(3600);for(let n=0;n<F;n++)for(let r=0;r<F;r++)t[n*F+r]=e(I[r],I[n]);return{rows:F,cols:F,x:I,y:I,z:t}},R=L((e,t)=>(e*e+t*t)/2),z=L((e,t)=>1.4+.6*e-.3*t)})))()}function me(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),t=(0,V.useMemo)(()=>[{name:e(`impliedVol`),data:K,wireframe:{width:.75}}],[e]);return(0,H.jsx)(p,{series:t,colorScale:`spectral`,xAxis:{title:e(`strike`),format:t=>e(`percent`,{value:Math.round(t)})},yAxis:{title:e(`expiry`),format:t=>e(`days`,{value:Math.round(t)})},zAxis:{title:e(`impliedVol`),format:t=>e(`percent`,{value:t.toFixed(1)})},colorBar:{format:t=>e(`percent`,{value:t})},camera:{azimuth:-28,elevation:24},height:440,ariaLabel:e(`volatilityAria`)})}var V,H,U,W,G,K;function he(){return(he=e((()=>{V=t(),i(),f(),H=n(),U=Array.from({length:33},(e,t)=>60+t*2.5),W=[7,14,30,60,90,120,180,270,365,540,730],G=new Float32Array(U.length*W.length),W.forEach((e,t)=>{let n=e/365,r=21-5*Math.exp(-n*1.4),i=-12/Math.sqrt(n+.25),a=25/Math.sqrt(n+.25);U.forEach((e,n)=>{let o=Math.log(e/100);G[t*U.length+n]=r+i*o+a*o*o})}),K={rows:W.length,cols:U.length,x:U,y:W,z:G}})))()}function ge(){let{t:e}=r(`common`,{keyPrefix:`docs.surface-3d-chart.data`}),[t,n]=(0,q.useState)(!0),[i,a]=(0,q.useState)(!0),[o,s]=(0,q.useState)(!0),[c,l]=(0,q.useState)(!1),d=(0,q.useMemo)(()=>[{name:e(`functions.peaks`),data:_e,fill:t,opacity:.92,wireframe:i&&{step:4},contours:(o||c)&&{count:14,floor:o,surface:c,width:1.25}}],[e,t,i,o,c]);return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,J.jsx)(u,{size:`small`,checked:t,label:e(`fill`),onChange:n}),(0,J.jsx)(u,{size:`small`,checked:i,label:e(`wireframe`),onChange:a}),(0,J.jsx)(u,{size:`small`,checked:o,label:e(`floorContours`),onChange:s}),(0,J.jsx)(u,{size:`small`,checked:c,label:e(`surfaceContours`),onChange:l})]}),(0,J.jsx)(p,{series:d,colorScale:`viridis`,camera:{azimuth:-50,elevation:30},height:440,ariaLabel:e(`contoursAria`)})]})}var q,J,Y,X,Z,_e;function ve(){return(ve=e((()=>{q=t(),i(),l(),f(),J=n(),Y=120,X=Float64Array.from({length:Y},(e,t)=>-3+6*t/119),Z=new Float32Array(14400);for(let e=0;e<Y;e++)for(let t=0;t<Y;t++){let n=X[t],r=X[e];Z[e*Y+t]=3*(1-n)**2*Math.exp(-(n**2)-(r+1)**2)-10*(n/5-n**3-r**5)*Math.exp(-(n**2)-r**2)-Math.exp(-((n+1)**2)-r**2)/3}_e={rows:Y,cols:Y,x:X,y:X,z:Z}})))()}var ye;function be(){return(be=e((()=>{ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

/** Samples z = f(x, y) on a size × size grid over [-extent, extent]² */
function sample(
  extent: number,
  size: number,
  f: (x: number, y: number) => number,
): Surface3DData {
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -extent + (2 * extent * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) z[r * size + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
}

const FUNCTIONS = {
  // sin(r) / r: ripples fading away from a central peak
  sinc: sample(10, 90, (x, y) => {
    const r = Math.hypot(x, y);
    return r === 0 ? 1 : Math.sin(r) / r;
  }),
  // MATLAB's peaks: three peaks and two pits
  peaks: sample(
    3,
    90,
    (x, y) =>
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3,
  ),
  // a hyperbolic paraboloid
  saddle: sample(1, 60, (x, y) => x * x - y * y),
};
type FunctionKey = keyof typeof FUNCTIONS;

export default function FunctionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [key, setKey] = useState<FunctionKey>("sinc");
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t(\`functions.\${key}\`), data: FUNCTIONS[key] },
    ],
    [t, key],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("function")}
        direction="horizontal"
        size="small"
        value={key}
        onChange={(value) => setKey(value as FunctionKey)}
      >
        {(Object.keys(FUNCTIONS) as FunctionKey[]).map((name) => (
          <Radio key={name} value={name} label={t(\`functions.\${name}\`)} />
        ))}
      </RadioGroup>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("x") }}
        yAxis={{ title: t("y") }}
        zAxis={{ title: t("z") }}
        height={420}
        ariaLabel={t("functionsAria", { name: t(\`functions.\${key}\`) })}
      />
    </div>
  );
}
`})))()}var xe;function Q(){return(Q=e((()=>{xe=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// Ripples spreading from the center, recomputed ~30 times per second
const SIZE = 100;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -6 + (12 * i) / (SIZE - 1),
);
const radius = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++)
    radius[r * SIZE + c] = Math.hypot(axis[c]!, axis[r]!);
}
const wave = (time: number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < z.length; i++) {
    const d = radius[i]!;
    z[i] = Math.sin(d * 2.2 - time * 3) * Math.exp(-d * 0.22);
  }
  // a new object every frame: the chart only re-processes changed data
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};

export default function LiveWaveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [data, setData] = useState(() => wave(0));
  const host = useRef<HTMLDivElement>(null);

  // the animation runs only while playing, on-screen and in a visible tab
  useEffect(() => {
    const element = host.current;
    if (!playing || !element) return;
    let frame = 0;
    let visible = false;
    let last = 0;
    let time = 0;
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 33) {
        time += last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        setData(wave(time));
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      start();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", start);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      cancelAnimationFrame(frame);
    };
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("wave"), data }],
    [t, data],
  );

  return (
    <div ref={host} style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("play")}
        onChange={setPlaying}
      />
      <Surface3DChart
        series={series}
        zAxis={{ min: -1, max: 1, title: t("amplitude") }}
        valueRange={[-1, 1]}
        colorScale="coolwarm"
        colorBar={false}
        aspect={[1, 1, 0.45]}
        camera={{ elevation: 32 }}
        height={420}
        ariaLabel={t("waveAria")}
      />
    </div>
  );
}
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A 20 × 20 km island: fractal value noise (6 octaves) under a radial
// falloff, the sea clamped at 0 m
const SIZE = 180;
const KM = 20;
const random = mulberry32(2026);
const LATTICE = 64;
const lattice = Float64Array.from({ length: LATTICE * LATTICE }, () =>
  random(),
);
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = smooth(x - xi);
  const fy = smooth(y - yi);
  const at = (i: number, j: number) =>
    lattice[((j & (LATTICE - 1)) * LATTICE + (i & (LATTICE - 1))) | 0]!;
  const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * fx;
  const bottom = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * fx;
  return top + (bottom - top) * fy;
};
const coords = Float64Array.from(
  { length: SIZE },
  (_, i) => Math.round(((i * KM) / (SIZE - 1)) * 100) / 100,
);
const heights = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    let h = 0;
    let amplitude = 1;
    let frequency = 5 / SIZE;
    for (let octave = 0; octave < 6; octave++) {
      h += noise(c * frequency, r * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    const dx = c / (SIZE - 1) - 0.5;
    const dy = r / (SIZE - 1) - 0.5;
    const falloff = 1 - Math.min(1, Math.hypot(dx, dy) * 2.1);
    heights[r * SIZE + c] = Math.max(0, (h * 0.9 - 1.0 + falloff * 1.3) * 1400);
  }
}
const island = { rows: SIZE, cols: SIZE, x: coords, y: coords, z: heights };

export default function TerrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("island"), data: island }],
    [t],
  );
  const km = (value: number) => t("km", { value });
  const meters = (value: number) => t("meters", { value: Math.round(value) });

  return (
    <Surface3DChart
      series={series}
      aspect={[1, 1, 0.28]}
      colorScale="terrain"
      xAxis={{ title: t("east"), format: km }}
      yAxis={{ title: t("north"), format: km }}
      zAxis={{ title: t("elevation"), format: meters }}
      colorBar={{ title: t("elevation"), format: meters }}
      lighting={{ ambient: 0.35, diffuse: 0.8, specular: 0.08 }}
      camera={{ azimuth: 30, elevation: 38 }}
      height={440}
      ariaLabel={t("terrainAria")}
    />
  );
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

const SIZE = 60;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -2 + (4 * i) / (SIZE - 1),
);
const grid = (f: (x: number, y: number) => number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) z[r * SIZE + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};
// a bowl crossed by a tilted plane: transparency shows where they meet
const bowl = grid((x, y) => (x * x + y * y) / 2);
const plane = grid((x, y) => 1.4 + 0.6 * x - 0.3 * y);

export default function TransparencyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t("bowl"), data: bowl, colorBy: "series", opacity: 0.7 },
      {
        name: t("plane"),
        data: plane,
        colorBy: "series",
        opacity: 0.55,
        wireframe: { step: 6 },
      },
    ],
    [t],
  );

  return (
    <Surface3DChart
      series={series}
      xAxis={{ title: t("x") }}
      yAxis={{ title: t("y") }}
      zAxis={{ title: t("z") }}
      camera={{ azimuth: -30, elevation: 22 }}
      height={420}
      ariaLabel={t("transparencyAria")}
    />
  );
}
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// Implied volatility of index options by strike (moneyness, % of spot) and
// time to expiry: a smile that is steepest for short expiries (skew towards
// low strikes) and a term structure rising from 16% to 21%
const STRIKES = Array.from({ length: 33 }, (_, i) => 60 + i * 2.5);
const EXPIRIES = [7, 14, 30, 60, 90, 120, 180, 270, 365, 540, 730];
const vol = new Float32Array(STRIKES.length * EXPIRIES.length);
EXPIRIES.forEach((days, r) => {
  const years = days / 365;
  const atm = 21 - 5 * Math.exp(-years * 1.4);
  const skew = -12 / Math.sqrt(years + 0.25);
  const smile = 25 / Math.sqrt(years + 0.25);
  STRIKES.forEach((strike, c) => {
    const k = Math.log(strike / 100);
    vol[r * STRIKES.length + c] = atm + skew * k + smile * k * k;
  });
});
const surface = {
  rows: EXPIRIES.length,
  cols: STRIKES.length,
  x: STRIKES,
  y: EXPIRIES,
  z: vol,
};

export default function VolatilityDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("impliedVol"),
        data: surface,
        wireframe: { width: 0.75 },
      },
    ],
    [t],
  );
  const percent = (value: number) => t("percent", { value: value.toFixed(1) });

  return (
    <Surface3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("strike"),
        format: (value) => t("percent", { value: Math.round(value) }),
      }}
      yAxis={{
        title: t("expiry"),
        format: (value) => t("days", { value: Math.round(value) }),
      }}
      zAxis={{ title: t("impliedVol"), format: percent }}
      colorBar={{ format: (value) => t("percent", { value }) }}
      camera={{ azimuth: -28, elevation: 24 }}
      height={440}
      ariaLabel={t("volatilityAria")}
    />
  );
}
`})))()}var Oe;function ke(){return(ke=e((()=>{Oe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// MATLAB's peaks function on a 120 × 120 grid
const SIZE = 120;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -3 + (6 * i) / (SIZE - 1),
);
const z = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    const x = axis[c]!;
    const y = axis[r]!;
    z[r * SIZE + c] =
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3;
  }
}
const peaks = { rows: SIZE, cols: SIZE, x: axis, y: axis, z };

export default function WireframeContoursDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [fill, setFill] = useState(true);
  const [wireframe, setWireframe] = useState(true);
  const [floor, setFloor] = useState(true);
  const [onSurface, setOnSurface] = useState(false);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("functions.peaks"),
        data: peaks,
        fill,
        opacity: 0.92,
        wireframe: wireframe && { step: 4 },
        contours: (floor || onSurface) && {
          count: 14,
          floor,
          surface: onSurface,
          width: 1.25,
        },
      },
    ],
    [t, fill, wireframe, floor, onSurface],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={fill}
          label={t("fill")}
          onChange={setFill}
        />
        <Switch
          size="small"
          checked={wireframe}
          label={t("wireframe")}
          onChange={setWireframe}
        />
        <Switch
          size="small"
          checked={floor}
          label={t("floorContours")}
          onChange={setFloor}
        />
        <Switch
          size="small"
          checked={onSurface}
          label={t("surfaceContours")}
          onChange={setOnSurface}
        />
      </div>
      <Surface3DChart
        series={series}
        colorScale="viridis"
        camera={{ azimuth: -50, elevation: 30 }}
        height={440}
        ariaLabel={t("contoursAria")}
      />
    </div>
  );
}
`})))()}var Ae,je,Me;function $(){return($=e((()=>{v(),T(),M(),B(),he(),ve(),be(),Q(),Ce(),Te(),De(),ke(),t(),ee(),ne(),Ae=n(),je=d(Object.assign({"./demos/functions.tsx":re,"./demos/live-wave.tsx":ie,"./demos/terrain.tsx":oe,"./demos/transparency.tsx":pe,"./demos/volatility.tsx":me,"./demos/wireframe-contours.tsx":ge}),Object.assign({"./demos/functions.tsx":ye,"./demos/live-wave.tsx":xe,"./demos/terrain.tsx":Se,"./demos/transparency.tsx":we,"./demos/volatility.tsx":Ee,"./demos/wireframe-contours.tsx":Oe})),Me=()=>(0,Ae.jsx)(te,{id:`surface-3d-chart`,demos:je})})))()}$();export{Me as default};