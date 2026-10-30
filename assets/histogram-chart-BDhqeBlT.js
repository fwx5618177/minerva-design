import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{i as a,n as o,r as s,t as c}from"./Radio-Bpw4i9zQ.js";import{h as l,m as u,w as d}from"./angular-preview-C1iguEH5.js";import{l as f,n as p,t as m,u as h}from"./DocPage-6WUEs69-.js";import{_ as g,m as _,v as ee,y as te}from"./charts-D752pe3-.js";function ne(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function v(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,i=(0,y.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`year`,unitDisplay:`long`});return t=>e.format(t)},[n]);return(0,b.jsx)(g,{values:x,domain:[15,85],bins:14,name:e(`customers`),color:`var(--chart-series-2, #10b981)`,formatBin:i,xAxis:{title:e(`age`)},height:280,ariaLabel:e(`agesAria`)})}var y,b,x;function S(){return(S=e((()=>{y=t(),i(),_(),b=n(),x=(()=>{let e=ne(21),t=new Int32Array(2e4);for(let n=0;n<t.length;n++){let r=e();t[n]=Math.round(r<.6?22+e()*18+e()*6:35+e()*40)}return t})()})))()}function C(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function w(){let{t:e}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),[t,n]=(0,T.useState)(`auto`);return(0,E.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,width:`100%`},children:[(0,E.jsxs)(a,{"aria-label":e(`binning`),direction:`horizontal`,value:t,onChange:e=>n(String(e)),children:[(0,E.jsx)(c,{value:`auto`,label:e(`rules.auto`)}),(0,E.jsx)(c,{value:`sturges`,label:e(`rules.sturges`)}),(0,E.jsx)(c,{value:`ten`,label:e(`rules.ten`)}),(0,E.jsx)(c,{value:`forty`,label:e(`rules.forty`)})]}),(0,E.jsx)(g,{values:D,bins:O[t],domain:[0,100],name:e(`students`),color:`var(--chart-series-6, #8b5cf6)`,xAxis:{title:e(`score`)},height:280,ariaLabel:e(`scoresAria`)})]})}var T,E,D,O;function k(){return(k=e((()=>{T=t(),i(),o(),s(),_(),E=n(),D=(()=>{let e=C(5);return Array.from({length:600},(t,n)=>{let r=Math.sqrt(-2*Math.log(e()||1e-12))*Math.cos(2*Math.PI*e()),i=n%3==0?48:71;return Math.max(0,Math.min(100,i+r*9))})})(),O={auto:`auto`,sturges:`sturges`,ten:10,forty:40}})))()}function A(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function j(){let{t:e}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),t=(0,M.useMemo)(()=>{let t={domain:[0,30],bins:15};return[{...l(F,{...t,name:e(`control`)}),id:`a`},{...l(I,{...t,name:e(`variant`)}),id:`b`,color:`var(--chart-series-3, #f59e0b)`}]},[e]);return(0,N.jsx)(te,{series:t,xAxis:{title:e(`minutes`)},height:300,ariaLabel:e(`abAria`)})}var M,N,P,F,I;function L(){return(L=e((()=>{M=t(),i(),ee(),d(),N=n(),P=(e,t)=>{let n=A(e);return Float64Array.from({length:8e3},()=>-Math.log(1-n())*t)},F=P(1,6),I=P(2,7.4)})))()}function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.histogram-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`,maximumFractionDigits:0});return t=>e.format(t)},[n]),a=(0,R.useMemo)(()=>u(B,[.5,.95,.99]),[]),o=(0,R.useMemo)(()=>[`p50`,`p95`,`p99`].map((e,t)=>({type:`line`,axis:`x`,value:a[t]??0,color:t===0?`var(--success-color, #16a34a)`:t===1?`var(--warning-color, #f59e0b)`:`var(--danger-color, #dc2626)`,label:`${e} ${i(a[t]??0)}`})),[a,i]);return(0,z.jsx)(g,{values:B,domain:[0,400],bins:80,name:e(`requests`),formatBin:i,xAxis:{format:i},annotations:o,height:320,ariaLabel:e(`latencyAria`)})}var R,z,B;function V(){return(V=e((()=>{R=t(),i(),_(),d(),z=n(),B=(()=>{let e=re(11),t=new Float64Array(1e6);for(let n=0;n<t.length;n++){let r=Math.sqrt(-2*Math.log(e()||1e-12))*Math.cos(2*Math.PI*e());t[n]=Math.exp(4.1+.42*r)+(e()<.02?250*e():0)}return t})()})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HistogramChart } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ages of 20,000 customers, in an Int32Array (any array of numbers works)
const ages = (() => {
  const random = mulberry32(21);
  const out = new Int32Array(20_000);
  for (let i = 0; i < out.length; i++) {
    const r = random();
    out[i] = Math.round(
      r < 0.6 ? 22 + random() * 18 + random() * 6 : 35 + random() * 40,
    );
  }
  return out;
})();

export default function AgesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const years = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "year",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // a fixed domain and 14 bins: one bin per 5 years from 15 to 85
  return (
    <HistogramChart
      values={ages}
      domain={[15, 85]}
      bins={14}
      name={t("customers")}
      color="var(--chart-series-2, #10b981)"
      formatBin={years}
      xAxis={{ title: t("age") }}
      height={280}
      ariaLabel={t("agesAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HistogramChart, type HistogramBinning } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Scores of 600 students in an exam out of 100: two groups of levels
const scores = (() => {
  const random = mulberry32(5);
  return Array.from({ length: 600 }, (_, i) => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const mean = i % 3 === 0 ? 48 : 71;
    return Math.max(0, Math.min(100, mean + z * 9));
  });
})();

const rules: Record<string, HistogramBinning> = {
  auto: "auto",
  sturges: "sturges",
  ten: 10,
  forty: 40,
};

export default function BinningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const [rule, setRule] = useState("auto");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      <RadioGroup
        aria-label={t("binning")}
        direction="horizontal"
        value={rule}
        onChange={(value) => setRule(String(value))}
      >
        <Radio value="auto" label={t("rules.auto")} />
        <Radio value="sturges" label={t("rules.sturges")} />
        <Radio value="ten" label={t("rules.ten")} />
        <Radio value="forty" label={t("rules.forty")} />
      </RadioGroup>
      <HistogramChart
        values={scores}
        bins={rules[rule]}
        domain={[0, 100]}
        name={t("students")}
        color="var(--chart-series-6, #8b5cf6)"
        xAxis={{ title: t("score") }}
        height={280}
        ariaLabel={t("scoresAria")}
      />
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  histogramSeries,
  type ChartSeries,
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

// Session duration (minutes) of an A/B test: the new onboarding keeps the
// users a little longer
const sample = (seed: number, scale: number) => {
  const random = mulberry32(seed);
  return Float64Array.from(
    { length: 8000 },
    () => -Math.log(1 - random()) * scale,
  );
};
const control = sample(1, 6);
const variant = sample(2, 7.4);

export default function ComparisonDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });

  // the same domain and bin count: both samples get the same bins, and the
  // bars of each bin sit side by side
  const series = useMemo((): ChartSeries[] => {
    const options = { domain: [0, 30] as const, bins: 15 };
    return [
      {
        ...histogramSeries(control, { ...options, name: t("control") }),
        id: "a",
      },
      {
        ...histogramSeries(variant, { ...options, name: t("variant") }),
        id: "b",
        color: "var(--chart-series-3, #f59e0b)",
      },
    ];
  }, [t]);

  return (
    <Chart
      series={series}
      xAxis={{ title: t("minutes") }}
      height={300}
      ariaLabel={t("abAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
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

// One million request latencies (ms): log-normal, with a slow tail
const latencies = (() => {
  const random = mulberry32(11);
  const values = new Float64Array(1_000_000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] =
      Math.exp(4.1 + 0.42 * z) + (random() < 0.02 ? 250 * random() : 0);
  }
  return values;
})();

export default function LatencyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // exact percentiles: one sort of the million values
  const marks = useMemo(() => quantiles(latencies, [0.5, 0.95, 0.99]), []);
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      (["p50", "p95", "p99"] as const).map((name, i) => ({
        type: "line",
        axis: "x",
        value: marks[i] ?? 0,
        color:
          i === 0
            ? "var(--success-color, #16a34a)"
            : i === 1
              ? "var(--warning-color, #f59e0b)"
              : "var(--danger-color, #dc2626)",
        label: \`\${name} \${ms(marks[i] ?? 0)}\`,
      })),
    [marks, ms],
  );

  return (
    <HistogramChart
      values={latencies}
      domain={[0, 400]}
      bins={80}
      name={t("requests")}
      formatBin={ms}
      xAxis={{ format: ms }}
      annotations={annotations}
      height={320}
      ariaLabel={t("latencyAria")}
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{S(),k(),L(),V(),U(),G(),q(),Y(),t(),p(),h(),X=n(),Z=f(Object.assign({"./demos/ages.tsx":v,"./demos/binning.tsx":w,"./demos/comparison.tsx":j,"./demos/latency.tsx":ie}),Object.assign({"./demos/ages.tsx":H,"./demos/binning.tsx":W,"./demos/comparison.tsx":K,"./demos/latency.tsx":J})),Q=()=>(0,X.jsx)(m,{id:`histogram-chart`,demos:Z})})))()}$();export{Q as default};