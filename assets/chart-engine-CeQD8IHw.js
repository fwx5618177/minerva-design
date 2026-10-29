import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BhPa7d9i.js";import{l as a,n as o,t as s,u as c}from"./DocPage-DCMfehF7.js";import{i as l,n as u,r as d,t as f}from"./chart-DhK1qY0T.js";function p(){let e=(0,m.useRef)(null),[t,n]=(0,m.useState)(`…`),[r,i]=(0,m.useState)(null);(0,m.useEffect)(()=>{let t=e.current;if(!t)return;let r=u(t,{series:[{name:`Downloads`,type:`bar`,data:g.map((e,t)=>[e,_[t]])}],yAxis:{format:e=>l(e)},ariaLabel:`Downloads per release`}),a=!0;r.ready.then(e=>{a&&n(e??`unsupported`)});let o=r.on(`click`,i);return()=>{a=!1,o(),r.destroy()}},[]);let a=r?.items[0],o=r&&a?`${r.xLabel}: ${l(a.y)} downloads`:`Click a bar`;return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,h.jsx)(`div`,{ref:e,style:{height:300}}),(0,h.jsxs)(`p`,{role:`status`,children:[`Renderer: `,t,` · `,o]})]})}var m,h,g,_;function v(){return(v=e((()=>{m=t(),f(),d(),h=n(),g=[`v1.0`,`v1.1`,`v1.2`,`v2.0`,`v2.1`,`v2.2`,`v3.0`],_=[12e4,185e3,24e4,61e4,72e4,83e4,142e4]})))()}function y(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function b(){let e=(0,x.useRef)(null),t=(0,x.useRef)(null),n=(0,x.useRef)([]),r=(0,x.useRef)(y(17)),[a,o]=(0,x.useState)(!1),[s,c]=(0,x.useState)(0);return(0,x.useEffect)(()=>{let i=e.current;if(!i)return;let a=y(17);r.current=a;let o=[];for(let e=0;e<20;e++)o.push(C(a,o[e-1]));n.current=o;let s=u(i,w(o));return t.current=s,c(o.length),()=>{s.destroy(),t.current=null}},[]),(0,x.useEffect)(()=>{if(a)return;let e=setInterval(()=>{let e=n.current,i=[...e.slice(-119),C(r.current,e[e.length-1])];n.current=i,t.current?.setOptions(w(i)),c(e=>e+1)},500);return()=>clearInterval(e)},[a]),(0,S.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`,justifyItems:`start`},children:[(0,S.jsx)(`div`,{ref:e,style:{height:300,width:`100%`}}),(0,S.jsx)(i,{variant:`outline`,onClick:()=>o(e=>!e),children:a?`Resume`:`Pause`}),(0,S.jsxs)(`p`,{role:`status`,children:[a?`Paused`:`Streaming`,` · `,s,` points received`]})]})}var x,S,C,w;function T(){return(T=e((()=>{x=t(),r(),f(),S=n(),C=(e,t)=>{let[n,r]=t??[0,50];return[n+.5,Math.min(100,Math.max(0,r+(e()-.5)*8))]},w=e=>({series:[{name:`CPU (%)`,type:`area`,data:e,opacity:.2}],xAxis:{title:`Seconds`},yAxis:{min:0,max:100},interaction:!1,ariaLabel:`Live CPU usage`})})))()}var E;function D(){return(D=e((()=>{E=`import { useEffect, useRef, useState } from "react";
import {
  createChart,
  formatCompact,
  type ChartHoverEvent,
} from "minerva-design/charts/core";

const releases = ["v1.0", "v1.1", "v1.2", "v2.0", "v2.1", "v2.2", "v3.0"];
const downloads = [120e3, 185e3, 240e3, 610e3, 720e3, 830e3, 1.42e6];

export default function BasicDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState("…");
  const [clicked, setClicked] = useState<ChartHoverEvent | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createChart(container, {
      series: [
        {
          name: "Downloads",
          type: "bar",
          data: releases.map((release, i) => [release, downloads[i]] as const),
        },
      ],
      yAxis: { format: (value) => formatCompact(value) },
      ariaLabel: "Downloads per release",
    });
    let active = true;
    void chart.ready.then((kind) => {
      if (active) setRenderer(kind ?? "unsupported");
    });
    const off = chart.on("click", setClicked);
    return () => {
      active = false;
      off();
      chart.destroy();
    };
  }, []);

  const item = clicked?.items[0];
  const result =
    clicked && item
      ? \`\${clicked.xLabel}: \${formatCompact(item.y)} downloads\`
      : "Click a bar";
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        Renderer: {renderer} · {result}
      </p>
    </div>
  );
}
`})))()}var O;function k(){return(k=e((()=>{O=`import { useEffect, useRef, useState } from "react";
import { Button } from "minerva-design";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
} from "minerva-design/charts/core";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = readonly [number, number];

const WINDOW = 120;

const nextPoint = (random: () => number, previous?: Point): Point => {
  const [x, y] = previous ?? [0, 50];
  return [x + 0.5, Math.min(100, Math.max(0, y + (random() - 0.5) * 8))];
};

const optionsFor = (data: readonly Point[]): ChartOptions => ({
  series: [{ name: "CPU (%)", type: "area", data, opacity: 0.2 }],
  xAxis: { title: "Seconds" },
  yAxis: { min: 0, max: 100 },
  interaction: false,
  ariaLabel: "Live CPU usage",
});

export default function StreamingDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const dataRef = useRef<readonly Point[]>([]);
  const randomRef = useRef(mulberry32(17));
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    // same sequence on every mount
    const random = mulberry32(17);
    randomRef.current = random;
    const initial: Point[] = [];
    for (let i = 0; i < 20; i++)
      initial.push(nextPoint(random, initial[i - 1]));
    dataRef.current = initial;
    const chart = createChart(container, optionsFor(initial));
    chartRef.current = chart;
    setCount(initial.length);
    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const data = dataRef.current;
      // a new array each time: setOptions only reprocesses changed data
      const next = [
        ...data.slice(-(WINDOW - 1)),
        nextPoint(randomRef.current, data[data.length - 1]),
      ];
      dataRef.current = next;
      chartRef.current?.setOptions(optionsFor(next));
      setCount((value) => value + 1);
    }, 500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      style={{ display: "grid", gap: 8, width: "100%", justifyItems: "start" }}
    >
      <div ref={ref} style={{ height: 300, width: "100%" }} />
      <Button variant="outline" onClick={() => setPaused((value) => !value)}>
        {paused ? "Resume" : "Pause"}
      </Button>
      <p role="status">
        {paused ? "Paused" : "Streaming"} · {count} points received
      </p>
    </div>
  );
}
`})))()}var A,j,M;function N(){return(N=e((()=>{v(),T(),D(),k(),t(),o(),c(),A=n(),j=a(Object.assign({"./demos/basic.tsx":p,"./demos/streaming.tsx":b}),Object.assign({"./demos/basic.tsx":E,"./demos/streaming.tsx":O})),M=()=>(0,A.jsx)(s,{id:`chart-engine`,demos:j})})))()}N();export{M as default};