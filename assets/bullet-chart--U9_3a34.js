import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{i as a,n as o,r as s,t as ee}from"./Radio-L-_0EAus.js";import{l as c,n as l,t as te,u as ne}from"./DocPage-BbPSunu1.js";import{c as u,l as d}from"./shapes-8zuLWo7l.js";function f(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,p.useMemo)(()=>h.map(({key:t,...n})=>({name:e(`long.${t}`),subtitle:e(`long.${t}Unit`),...n})),[e]),n=(0,p.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]);return(0,m.jsx)(d,{data:t,rangeLabels:n,ariaLabel:e(`longAria`)})}var p,m,h;function g(){return(g=e((()=>{p=t(),i(),u(),m=n(),h=[{key:`onboarding`,value:78,target:85,ranges:[60,75,100]},{key:`support`,value:87,target:90,ranges:[70,85,100]},{key:`deployments`,value:96.4,target:98,ranges:[90,95,100]},{key:`renewals`,value:1.18,target:1.1,ranges:[.9,1.05,1.3]}]})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),[n,i]=(0,_.useState)(2),o=t.language,s=(0,_.useMemo)(()=>{let e=new Intl.DateTimeFormat(o,{month:`short`,timeZone:`UTC`});return S.map((t,n)=>e.format(Date.UTC(2026,n,1)))},[o]),c=(0,_.useMemo)(()=>y.map(t=>({name:e(`growth.${t}`),subtitle:e(`growth.${t}Unit`),value:S[n][t],target:b[t],ranges:x[t]})),[n,e]);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsx)(a,{"aria-label":e(`monthLabel`),direction:`horizontal`,value:n,onChange:e=>i(Number(e)),children:s.map((e,t)=>(0,v.jsx)(ee,{value:t,label:e},e))}),(0,v.jsx)(d,{data:c,legend:!0,ariaLabel:e(`growthAria`)})]})}var _,v,y,b,x,S;function C(){return(C=e((()=>{_=t(),i(),o(),s(),u(),v=n(),y=[`visitors`,`signups`,`activation`,`mrr`],b={visitors:120,signups:4800,activation:45,mrr:210},x={visitors:[80,110,150],signups:[3e3,4500,6e3],activation:[30,40,60],mrr:[150,200,260]},S=[{visitors:86,signups:3100,activation:34,mrr:162},{visitors:94,signups:3550,activation:37,mrr:171},{visitors:108,signups:4020,activation:41,mrr:184},{visitors:117,signups:4410,activation:43,mrr:196},{visitors:129,signups:4930,activation:46,mrr:207},{visitors:141,signups:5380,activation:49,mrr:223}]})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,w.useMemo)(()=>E.map(({key:t,...n})=>({name:e(`sales.${t}`),subtitle:e(`sales.${t}Unit`),...n})),[e]),n=(0,w.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]);return(0,T.jsx)(d,{data:t,rangeLabels:n,ariaLabel:e(`salesAria`)})}var w,T,E;function D(){return(D=e((()=>{w=t(),i(),u(),T=n(),E=[{key:`revenue`,value:270,target:250,ranges:[150,225,300]},{key:`profit`,value:22.5,target:26,ranges:[20,25,30]},{key:`orderSize`,value:320,target:550,ranges:[350,500,600]},{key:`customers`,value:1650,target:2100,ranges:[1400,2e3,2500]},{key:`satisfaction`,value:4.6,target:4.4,ranges:[3.5,4.25,5]}]})))()}function O(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,k.useMemo)(()=>j.map(t=>({...t,name:e(`slo.${t.name}`),subtitle:e(`slo.${t.name}Unit`),color:`var(--text-color)`})),[e]),n=(0,k.useMemo)(()=>[e(`ranges.breach`),e(`ranges.atRisk`),e(`ranges.healthy`)],[e]);return(0,A.jsx)(d,{data:t,rangeColors:M,rangeLabels:n,targetColor:`#2563eb`,barSize:.3,format:N,ariaLabel:e(`sloAria`)})}var k,A,j,M,N;function P(){return(P=e((()=>{k=t(),i(),u(),A=n(),j=[{name:`availability`,value:99.95,target:99.9,ranges:[99.5,99.9,100],min:99},{name:`apdex`,value:.91,target:.94,ranges:[.7,.85,1]},{name:`throughput`,value:1240,target:1e3,ranges:[800,1200,1600]},{name:`budget`,value:38,target:50,ranges:[25,50,100]}],M=[`rgba(239, 68, 68, 0.3)`,`rgba(245, 158, 11, 0.3)`,`rgba(34, 197, 94, 0.3)`],N=e=>String(e>=100?Math.round(e):+e.toFixed(2))})))()}function F(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,I.useMemo)(()=>R.map(([t,n,r])=>({name:e(`teams.${t}`),value:n,target:r})),[e]),n=(0,I.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]);return(0,L.jsx)(d,{data:t,orientation:`vertical`,ranges:[25,35,50],rangeLabels:n,barSize:.5,height:320,ariaLabel:e(`teamsAria`)})}var I,L,R;function z(){return(z=e((()=>{I=t(),i(),u(),L=n(),R=[[`checkout`,42,40],[`search`,31,38],[`mobile`,46,45],[`platform`,24,30],[`growth`,37,34],[`data`,28,32]]})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Operational KPIs with long, descriptive names: the label column grows to
// fit them (up to 40% of the width), then the names wrap to two lines with
// an ellipsis; the tooltip shows the full name
const KPIS: {
  key: string;
  value: number;
  target: number;
  ranges: number[];
}[] = [
  { key: "onboarding", value: 78, target: 85, ranges: [60, 75, 100] },
  { key: "support", value: 87, target: 90, ranges: [70, 85, 100] },
  { key: "deployments", value: 96.4, target: 98, ranges: [90, 95, 100] },
  { key: "renewals", value: 1.18, target: 1.1, ranges: [0.9, 1.05, 1.3] },
];

export default function LongNamesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      KPIS.map(({ key, ...kpi }) => ({
        name: t(\`long.\${key}\`),
        subtitle: t(\`long.\${key}Unit\`),
        ...kpi,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeLabels={rangeLabels}
      ariaLabel={t("longAria")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Metric = "visitors" | "signups" | "activation" | "mrr";

// Growth KPIs of the first half of 2026 against their monthly targets
const METRICS: Metric[] = ["visitors", "signups", "activation", "mrr"];
const TARGETS: Record<Metric, number> = {
  visitors: 120,
  signups: 4800,
  activation: 45,
  mrr: 210,
};
const RANGES: Record<Metric, number[]> = {
  visitors: [80, 110, 150],
  signups: [3000, 4500, 6000],
  activation: [30, 40, 60],
  mrr: [150, 200, 260],
};
const MONTHS: Record<Metric, number>[] = [
  { visitors: 86, signups: 3100, activation: 34, mrr: 162 },
  { visitors: 94, signups: 3550, activation: 37, mrr: 171 },
  { visitors: 108, signups: 4020, activation: 41, mrr: 184 },
  { visitors: 117, signups: 4410, activation: 43, mrr: 196 },
  { visitors: 129, signups: 4930, activation: 46, mrr: 207 },
  { visitors: 141, signups: 5380, activation: 49, mrr: 223 },
];

export default function MonthlyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const [month, setMonth] = useState(2);
  const locale = i18n.language;

  const monthNames = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return MONTHS.map((_, i) => format.format(Date.UTC(2026, i, 1)));
  }, [locale]);
  const data = useMemo(
    (): BulletDatum[] =>
      METRICS.map((metric) => ({
        name: t(\`growth.\${metric}\`),
        subtitle: t(\`growth.\${metric}Unit\`),
        value: MONTHS[month][metric],
        target: TARGETS[metric],
        ranges: RANGES[metric],
      })),
    [month, t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("monthLabel")}
        direction="horizontal"
        value={month}
        onChange={(value) => setMonth(Number(value))}
      >
        {monthNames.map((name, i) => (
          <Radio key={name} value={i} label={name} />
        ))}
      </RadioGroup>
      <BulletChart data={data} legend ariaLabel={t("growthAria")} />
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Quarter-to-date sales KPIs, each on its own scale: ranges are the
// poor / fair / good bounds, the marker is the quarter's target
const KPIS: {
  key: string;
  value: number;
  target: number;
  ranges: number[];
}[] = [
  { key: "revenue", value: 270, target: 250, ranges: [150, 225, 300] },
  { key: "profit", value: 22.5, target: 26, ranges: [20, 25, 30] },
  { key: "orderSize", value: 320, target: 550, ranges: [350, 500, 600] },
  { key: "customers", value: 1650, target: 2100, ranges: [1400, 2000, 2500] },
  { key: "satisfaction", value: 4.6, target: 4.4, ranges: [3.5, 4.25, 5] },
];

export default function SalesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      KPIS.map(({ key, ...kpi }) => ({
        name: t(\`sales.\${key}\`),
        subtitle: t(\`sales.\${key}Unit\`),
        ...kpi,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeLabels={rangeLabels}
      ariaLabel={t("salesAria")}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Service level objectives of an API this month. Availability starts its
// scale at 99% (min) so that the interesting part is visible.
const SLOS: BulletDatum[] = [
  {
    name: "availability",
    value: 99.95,
    target: 99.9,
    ranges: [99.5, 99.9, 100],
    min: 99,
  },
  { name: "apdex", value: 0.91, target: 0.94, ranges: [0.7, 0.85, 1] },
  { name: "throughput", value: 1240, target: 1000, ranges: [800, 1200, 1600] },
  { name: "budget", value: 38, target: 50, ranges: [25, 50, 100] },
];

// red / amber / green, translucent so that they suit both themes
const TRAFFIC_LIGHTS = [
  "rgba(239, 68, 68, 0.3)",
  "rgba(245, 158, 11, 0.3)",
  "rgba(34, 197, 94, 0.3)",
];

const format = (value: number) =>
  value >= 100 ? String(Math.round(value)) : String(+value.toFixed(2));

export default function TrafficLightsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      SLOS.map((slo) => ({
        ...slo,
        name: t(\`slo.\${slo.name}\`),
        subtitle: t(\`slo.\${slo.name}Unit\`),
        color: "var(--text-color)",
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.breach"), t("ranges.atRisk"), t("ranges.healthy")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeColors={TRAFFIC_LIGHTS}
      rangeLabels={rangeLabels}
      targetColor="#2563eb"
      barSize={0.3}
      format={format}
      ariaLabel={t("sloAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Story points delivered by each team in the last sprint, against its
// commitment; the qualitative ranges are shared by every team
const TEAMS: [key: string, delivered: number, committed: number][] = [
  ["checkout", 42, 40],
  ["search", 31, 38],
  ["mobile", 46, 45],
  ["platform", 24, 30],
  ["growth", 37, 34],
  ["data", 28, 32],
];

export default function VerticalDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      TEAMS.map(([key, value, target]) => ({
        name: t(\`teams.\${key}\`),
        value,
        target,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      orientation="vertical"
      ranges={[25, 35, 50]}
      rangeLabels={rangeLabels}
      barSize={0.5}
      height={320}
      ariaLabel={t("teamsAria")}
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{g(),C(),D(),P(),z(),V(),U(),G(),q(),Y(),t(),l(),ne(),X=n(),Z=c(Object.assign({"./demos/long-names.tsx":f,"./demos/monthly.tsx":re,"./demos/sales.tsx":ie,"./demos/traffic-lights.tsx":O,"./demos/vertical.tsx":F}),Object.assign({"./demos/long-names.tsx":B,"./demos/monthly.tsx":H,"./demos/sales.tsx":W,"./demos/traffic-lights.tsx":K,"./demos/vertical.tsx":J})),Q=()=>(0,X.jsx)(te,{id:`bullet-chart`,demos:Z})})))()}$();export{Q as default};