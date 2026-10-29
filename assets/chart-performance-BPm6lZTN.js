import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{m as a,p as o}from"./PropsTable-B26XjU8N.js";import{Dt as s,Ot as c}from"./io5-cgJxWOM4.js";import{R as l,z as u}from"./ProgressIndicator-BhPa7d9i.js";import{n as d,t as f}from"./CodeBlock-DJyqRdLm.js";import{i as p,n as m,r as h,t as g}from"./DemoBlock-HPs0QNwO.js";import{n as _,t as v}from"./DocPage-DmpxYJhU.js";import{n as y,t as b}from"./chart-B6Gh_UJN.js";function x(e){let{count:t,label:n}=E[e],r=e===`scatter100k`,i=new Float64Array(t),a=new Float64Array(t),o=1,s=0;for(let e=0;e<t;e++){o=o*16807%2147483647;let t=o/2147483647;r?(i[e]=t*100,a[e]=Math.sin(i[e]/8)*30+(o>>8)%1e3/25):(s+=t-.5,i[e]=e,a[e]=s)}return{series:[{id:e,name:n,type:r?`scatter`:`line`,data:{x:i,y:a},pointSize:r?2:void 0,lineWidth:r?void 0:1}],legend:!1,ariaLabel:`Benchmark: ${n} points`}}async function S(e,t){let n=performance.now();return e.setOptions(t),{update:performance.now()-n,frame:await D()-n}}function C(){let e=(0,w.useRef)(null),t=(0,w.useRef)(null),[n,r]=(0,w.useState)(null),[i,a]=(0,w.useState)(`…`),[o,s]=(0,w.useState)(!1),[c,l]=(0,w.useState)(`Pick a data set`);(0,w.useEffect)(()=>{let n=e.current;if(!n)return;let r=y(n,{series:[],ariaLabel:`Benchmark chart`});t.current=r;let i=!0;r.ready.then(e=>{i&&a(e??`unsupported`)});let o=r.on(`renderer`,a);return()=>{i=!1,o(),r.destroy(),t.current=null}},[]);let d=async e=>{let n=t.current;if(!n)return;s(!0),l(`Generating ${E[e].label} points…`),await D();let i=x(e),{update:a,frame:o}=await S(n,i);r(i),l(`${E[e].label}: setOptions ${a.toFixed(1)} ms · on screen after ${o.toFixed(0)} ms`),s(!1)},f=async()=>{let e=t.current;if(!e||!n)return;let{update:r}=await S(e,{...n});l(`Identical setOptions: ${r.toFixed(2)} ms`)};return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,T.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[Object.keys(E).map(e=>(0,T.jsx)(u,{size:`small`,variant:`outline`,disabled:o,onClick:()=>void d(e),children:E[e].label},e)),(0,T.jsx)(u,{size:`small`,variant:`ghost`,disabled:o||!n,onClick:()=>void f(),children:`Same options again`})]}),(0,T.jsx)(`div`,{ref:e,style:{height:280}}),(0,T.jsxs)(`p`,{role:`status`,children:[`Renderer: `,i,` · `,c]})]})}var w,T,E,D;function O(){return(O=e((()=>{w=t(),l(),b(),T=n(),E={line100k:{label:`Line · 100k`,count:1e5},line1m:{label:`Line · 1M`,count:1e6},scatter100k:{label:`Scatter · 100k`,count:1e5}},D=()=>new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e(performance.now()))))})))()}var k;function A(){return(A=e((()=>{k=`import { useEffect, useRef, useState } from "react";
import { Button } from "minerva-design";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
} from "minerva-design/charts/core";

type Dataset = "line100k" | "line1m" | "scatter100k";

const DATASETS: Record<Dataset, { label: string; count: number }> = {
  line100k: { label: "Line · 100k", count: 100_000 },
  line1m: { label: "Line · 1M", count: 1_000_000 },
  scatter100k: { label: "Scatter · 100k", count: 100_000 },
};

/** Typed-array columns: the fastest input of the engine */
function generate(dataset: Dataset): ChartOptions {
  const { count, label } = DATASETS[dataset];
  const scatter = dataset === "scatter100k";
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  let seed = 1;
  let value = 0;
  for (let i = 0; i < count; i++) {
    seed = (seed * 16807) % 2147483647;
    const r = seed / 2147483647;
    if (scatter) {
      x[i] = r * 100;
      y[i] = Math.sin(x[i] / 8) * 30 + ((seed >> 8) % 1000) / 25;
    } else {
      value += r - 0.5;
      x[i] = i;
      y[i] = value;
    }
  }
  return {
    series: [
      {
        id: dataset,
        name: label,
        type: scatter ? "scatter" : "line",
        data: { x, y },
        pointSize: scatter ? 2 : undefined,
        lineWidth: scatter ? undefined : 1,
      },
    ],
    legend: false,
    ariaLabel: \`Benchmark: \${label} points\`,
  };
}

/** Resolves once the next frame has been painted */
const nextFrame = () =>
  new Promise<number>((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => resolve(performance.now())),
    ),
  );

/** Duration of setOptions, and time until the result is on screen */
async function measure(chart: ChartInstance, options: ChartOptions) {
  const start = performance.now();
  chart.setOptions(options);
  const update = performance.now() - start;
  const frame = (await nextFrame()) - start;
  return { update, frame };
}

export default function Benchmark() {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const [options, setOptions] = useState<ChartOptions | null>(null);
  const [renderer, setRenderer] = useState("…");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("Pick a data set");

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createChart(container, {
      series: [],
      ariaLabel: "Benchmark chart",
    });
    chartRef.current = chart;
    let active = true;
    void chart.ready.then((kind) => {
      if (active) setRenderer(kind ?? "unsupported");
    });
    const off = chart.on("renderer", setRenderer);
    return () => {
      active = false;
      off();
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  const run = async (dataset: Dataset) => {
    const chart = chartRef.current;
    if (!chart) return;
    setBusy(true);
    setResult(\`Generating \${DATASETS[dataset].label} points…\`);
    await nextFrame();
    const next = generate(dataset);
    const { update, frame } = await measure(chart, next);
    setOptions(next);
    setResult(
      \`\${DATASETS[dataset].label}: setOptions \${update.toFixed(1)} ms · on screen after \${frame.toFixed(0)} ms\`,
    );
    setBusy(false);
  };

  const repeat = async () => {
    const chart = chartRef.current;
    if (!chart || !options) return;
    // a new options object with the same data reference: nothing is reprocessed
    const { update } = await measure(chart, { ...options });
    setResult(\`Identical setOptions: \${update.toFixed(2)} ms\`);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(DATASETS) as Dataset[]).map((dataset) => (
          <Button
            key={dataset}
            size="small"
            variant="outline"
            disabled={busy}
            onClick={() => void run(dataset)}
          >
            {DATASETS[dataset].label}
          </Button>
        ))}
        <Button
          size="small"
          variant="ghost"
          disabled={busy || !options}
          onClick={() => void repeat()}
        >
          Same options again
        </Button>
      </div>
      <div ref={ref} style={{ height: 280 }} />
      <p role="status">
        Renderer: {renderer} · {result}
      </p>
    </div>
  );
}
`})))()}function j(){let{t:e}=c();return(0,M.jsxs)(v,{id:`chart-performance`,children:[(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-intro`,children:[(0,M.jsx)(`h2`,{id:`perf-intro`,children:e(`docs.chart-performance.intro.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.intro.text`)}),(0,M.jsx)(`p`,{className:h.prose,children:(0,M.jsx)(o,{i18nKey:`docs.chart-performance.intro.pages`,components:{charts:(0,M.jsx)(i,{to:`/charts`}),engine:(0,M.jsx)(i,{to:`/chart-engine`})}})})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-renderers`,children:[(0,M.jsx)(`h2`,{id:`perf-renderers`,children:e(`docs.chart-performance.renderers.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.renderers.text`)}),(0,M.jsxs)(`ul`,{className:h.prose,children:[(0,M.jsx)(`li`,{children:e(`docs.chart-performance.renderers.auto`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.renderers.software`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.renderers.forced`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.renderers.lost`)})]}),(0,M.jsx)(f,{language:`ts`,code:N})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-data`,children:[(0,M.jsx)(`h2`,{id:`perf-data`,children:e(`docs.chart-performance.data.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.data.text`)}),(0,M.jsxs)(`ol`,{className:h.prose,children:[(0,M.jsx)(`li`,{children:e(`docs.chart-performance.data.typed`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.data.columns`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.data.tuples`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.data.objects`)})]}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.data.identity`)}),(0,M.jsx)(f,{language:`ts`,code:P})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-visible`,children:[(0,M.jsx)(`h2`,{id:`perf-visible`,children:e(`docs.chart-performance.visible.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.visible.text`)}),(0,M.jsxs)(`ul`,{className:h.prose,children:[(0,M.jsx)(`li`,{children:e(`docs.chart-performance.visible.sorted`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.visible.unsorted`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.visible.decimation`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.visible.scatter`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.visible.hit`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.visible.dom`)})]})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-zoom`,children:[(0,M.jsx)(`h2`,{id:`perf-zoom`,children:e(`docs.chart-performance.zoom.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.zoom.gpu`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.zoom.canvas`)})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-scale`,children:[(0,M.jsx)(`h2`,{id:`perf-scale`,children:e(`docs.chart-performance.scale.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.scale.text`)}),(0,M.jsxs)(`ul`,{className:h.prose,children:[(0,M.jsx)(`li`,{children:e(`docs.chart-performance.scale.line`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.scale.scatter`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.scale.update`)})]}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.scale.guidance`)}),(0,M.jsx)(g,{id:`perf-benchmark`,title:e(`docs.chart-performance.benchmark.title`),description:e(`docs.chart-performance.benchmark.description`),source:k,children:(0,M.jsx)(C,{})})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-react`,children:[(0,M.jsx)(`h2`,{id:`perf-react`,children:e(`docs.chart-performance.react.title`)}),(0,M.jsxs)(`ul`,{className:h.prose,children:[(0,M.jsx)(`li`,{children:e(`docs.chart-performance.react.memo`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.react.shallow`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.react.typed`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.react.shapes`)})]}),(0,M.jsx)(f,{language:`tsx`,code:F})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-streaming`,children:[(0,M.jsx)(`h2`,{id:`perf-streaming`,children:e(`docs.chart-performance.streaming.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.streaming.text`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.streaming.batch`)}),(0,M.jsx)(f,{language:`ts`,code:I})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-shapes`,children:[(0,M.jsx)(`h2`,{id:`perf-shapes`,children:e(`docs.chart-performance.shapes.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.shapes.text`)}),(0,M.jsxs)(`ul`,{className:h.prose,children:[(0,M.jsx)(`li`,{children:e(`docs.chart-performance.shapes.gpu`)}),(0,M.jsx)(`li`,{children:e(`docs.chart-performance.shapes.canvas`)})]})]}),(0,M.jsxs)(`section`,{className:h.section,"aria-labelledby":`perf-platforms`,children:[(0,M.jsx)(`h2`,{id:`perf-platforms`,children:e(`docs.chart-performance.platforms.title`)}),(0,M.jsx)(`p`,{className:h.prose,children:(0,M.jsx)(o,{i18nKey:`docs.chart-performance.platforms.mini`,components:{mini:(0,M.jsx)(i,{to:`/mini-program-charts`})}})}),(0,M.jsx)(`p`,{className:h.prose,children:(0,M.jsx)(o,{i18nKey:`docs.chart-performance.platforms.native`,components:{native:(0,M.jsx)(i,{to:`/react-native`})}})}),(0,M.jsx)(`p`,{className:h.prose,children:e(`docs.chart-performance.platforms.primitives`)}),(0,M.jsx)(f,{language:`ts`,code:L})]})]})}var M,N,P,F,I,L;function R(){return(R=e((()=>{a(),s(),r(),d(),m(),_(),p(),O(),A(),M=n(),N=`import { createChart } from "minerva-design/charts/core";

// "auto" (default): WebGPU, then WebGL2, then Canvas2D
const chart = createChart(container, { series, renderer: "auto" });
chart.ready.then((kind) => showRenderer(kind)); // "webgpu" | "webgl2" | "canvas2d" | null
// fired again when the GPU is lost and the chart falls back
chart.on("renderer", (kind) => showRenderer(kind));

// force a backend (also accepted on every React chart: renderer="canvas2d")
createChart(other, { series, renderer: "canvas2d" });`,P=`const n = 1_000_000;
const x = new Float64Array(n); // timestamps or indexes, sorted
const y = new Float32Array(n);
// ...fill x and y once

// fastest: typed-array columns, copied in one go (no per-point conversion)
const fast = [{ id: "signal", name: "Signal", data: { x, y } }];

// slower: plain arrays in columns, then [x, y] tuples,
// then { x, y } objects (converted point by point)
const slow = [{ name: "Signal", data: points.map((p) => ({ x: p.t, y: p.v })) }];`,F=`import { useMemo } from "react";
import { LineChart } from "minerva-design/charts";

function Telemetry({ samples }: { samples: Samples }) {
  // build the columns once per data set, not on every render
  const series = useMemo(
    () => [{ id: "cpu", name: "CPU", data: { x: samples.time, y: samples.cpu } }],
    [samples],
  );
  // inline props are fine: they are compared shallowly and skip setOptions
  return <LineChart series={series} yAxis={{ min: 0, max: 100 }} height={320} />;
}`,I=`let data: [number, number][] = [];
let queued: [number, number][] = [];

socket.onmessage = (event) => {
  queued.push(JSON.parse(event.data));
};

// one update per frame, however many samples arrived
function flush() {
  if (queued.length) {
    // a new array: arrays mutated in place are not read again
    data = [...data, ...queued].slice(-50_000);
    queued = [];
    chart.setOptions({ ...base, series: [{ id: "cpu", name: "CPU", data }] });
  }
  requestAnimationFrame(flush);
}
requestAnimationFrame(flush);`,L=`import {
  createChartController,
  scenePrimitives,
} from "minerva-design/charts/core";

const controller = createChartController({
  options,
  measureText: (text, font) => measure(text, font),
  onInvalidate: () => draw(),
});
controller.setSize(360, 240);

function draw() {
  const scene = controller.getScene();
  if (!scene) return;
  // fewer, coarser shapes for a slow host (e.g. one native view per shape)
  const shapes = scenePrimitives(scene, {
    maxDots: 1500, // per series: then merged per cell
    maxBars: 600, // per series: then merged per pixel column
    columnWidth: 3, // lines: at most 4 points per 3 px column
  });
  paint(shapes);
}`})))()}R();export{j as default};