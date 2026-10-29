import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{l as a,n as o,t as s,u as c}from"./DocPage-DmpxYJhU.js";import{r as l,t as u}from"./shapes-BpdzBut9.js";function d(){return(0,f.jsx)(u,{value:42,min:-100,max:100,bands:p,needle:!0,label:`Net Promoter Score`,format:m,height:280,ariaLabel:`Net Promoter Score`})}var f,p,m;function h(){return(h=e((()=>{l(),f=n(),p=[{to:0,color:`var(--danger-color)`},{to:30,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}],m=e=>{let t=Math.round(e);return t>0?`+${t}`:`${t}`}})))()}function g(){return(0,_.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:16,width:`100%`},children:v.map(e=>(0,_.jsx)(u,{value:e.value,label:e.label,color:e.color,format:y,height:200,ariaLabel:`${e.label} usage`},e.label))})}var _,v,y;function b(){return(b=e((()=>{l(),_=n(),v=[{label:`CPU`,value:68,color:`var(--primary-color)`},{label:`Memory`,value:82,color:`var(--warning-color)`},{label:`Disk`,value:41,color:`var(--success-color)`}],y=e=>`${Math.round(e)}%`})))()}function x(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function S(){let[e,t]=(0,C.useState)(640),[n,r]=(0,C.useState)(!0),a=(0,C.useRef)(x(42));return(0,C.useEffect)(()=>{if(!n)return;let e=window.setInterval(()=>{t(e=>{let t=(a.current()-.5)*360+(650-e)*.2;return Math.min(T,Math.max(0,e+t))})},1500);return()=>window.clearInterval(e)},[n]),(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,w.jsx)(u,{value:e,max:T,bands:E,sweep:180,thickness:.22,needle:!0,label:`Requests / s`,format:D,height:260,ariaLabel:`Requests per second, updated live`}),(0,w.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`},children:(0,w.jsx)(i,{variant:`outline`,size:`small`,onClick:()=>r(e=>!e),children:n?`Pause updates`:`Resume updates`})})]})}var C,w,T,E,D;function O(){return(O=e((()=>{C=t(),r(),l(),w=n(),T=1200,E=[{to:800,color:`var(--primary-color)`},{to:1e3,color:`var(--warning-color)`},{to:T,color:`var(--danger-color)`}],D=e=>Math.round(e).toLocaleString(`en-US`)})))()}var k;function A(){return(A=e((()=>{k=`import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

const signed = (value: number) => {
  const rounded = Math.round(value);
  return rounded > 0 ? \`+\${rounded}\` : \`\${rounded}\`;
};

export default function BandsDemo() {
  return (
    <GaugeChart
      value={42}
      min={-100}
      max={100}
      bands={bands}
      needle
      label="Net Promoter Score"
      format={signed}
      height={280}
      ariaLabel="Net Promoter Score"
    />
  );
}
`})))()}var j;function M(){return(M=e((()=>{j=`import { GaugeChart } from "minerva-design/charts";

// Resource usage of a server, in percent
const metrics = [
  { label: "CPU", value: 68, color: "var(--primary-color)" },
  { label: "Memory", value: 82, color: "var(--warning-color)" },
  { label: "Disk", value: 41, color: "var(--success-color)" },
];

const percent = (value: number) => \`\${Math.round(value)}%\`;

export default function BasicDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {metrics.map((metric) => (
        <GaugeChart
          key={metric.label}
          value={metric.value}
          label={metric.label}
          color={metric.color}
          format={percent}
          height={200}
          ariaLabel={\`\${metric.label} usage\`}
        />
      ))}
    </div>
  );
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { useEffect, useRef, useState } from "react";
import { Button } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

/** Small seeded random generator: the same "traffic" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MAX = 1200;
const bands: GaugeBand[] = [
  { to: 800, color: "var(--primary-color)" },
  { to: 1000, color: "var(--warning-color)" },
  { to: MAX, color: "var(--danger-color)" },
];

const rps = (value: number) => Math.round(value).toLocaleString("en-US");

export default function LiveDemo() {
  const [value, setValue] = useState(640);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(42));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // random walk that drifts back toward ~650 requests / s
      setValue((current) => {
        const step = (random.current() - 0.5) * 360 + (650 - current) * 0.2;
        return Math.min(MAX, Math.max(0, current + step));
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={value}
        max={MAX}
        bands={bands}
        sweep={180}
        thickness={0.22}
        needle
        label="Requests / s"
        format={rps}
        height={260}
        ariaLabel="Requests per second, updated live"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Pause updates" : "Resume updates"}
        </Button>
      </div>
    </div>
  );
}
`})))()}var F,I,L;function R(){return(R=e((()=>{h(),b(),O(),A(),M(),P(),t(),o(),c(),F=n(),I=a(Object.assign({"./demos/bands.tsx":d,"./demos/basic.tsx":g,"./demos/live.tsx":S}),Object.assign({"./demos/bands.tsx":k,"./demos/basic.tsx":j,"./demos/live.tsx":N})),L=()=>(0,F.jsx)(s,{id:`gauge-chart`,demos:I})})))()}R();export{L as default};