import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{l as s,n as c,t as l,u}from"./DocPage-CmQtD5jg.js";import{c as d,o as f}from"./shapes-8zuLWo7l.js";function ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=new Intl.NumberFormat(t.language,{maximumFractionDigits:0,signDisplay:`exceptZero`}),i=e=>n.format(e);return(0,p.jsx)(f,{value:42,min:-100,max:100,bands:m,needle:!0,label:e(`nps`),format:i,renderTooltip:t=>(0,p.jsxs)(`span`,{children:[e(`nps`),` · `,i(t.value)]}),height:280,ariaLabel:e(`nps`)})}var p,m;function te(){return(te=e((()=>{i(),d(),p=n(),m=[{to:0,color:`var(--danger-color)`},{to:30,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}]})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=new Intl.NumberFormat(t.language,{style:`percent`}),i=e=>n.format(e/100);return(0,h.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:16,width:`100%`},children:g.map(t=>(0,h.jsx)(f,{value:t.value,label:e(`metrics.${t.key}`),color:t.color,format:i,renderTooltip:n=>(0,h.jsxs)(`span`,{children:[e(`metrics.${t.key}`),` · `,i(n.value)]}),height:200,ariaLabel:e(`usageAria`,{metric:e(`metrics.${t.key}`)})},t.key))})}var h,g;function _(){return(_=e((()=>{i(),d(),h=n(),g=[{key:`cpu`,value:68,color:`var(--primary-color)`},{key:`memory`,value:82,color:`var(--warning-color)`},{key:`disk`,value:41,color:`var(--success-color)`}]})))()}function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),[n,i]=(0,v.useState)(640),[a,s]=(0,v.useState)(!0),c=(0,v.useRef)(re(42));(0,v.useEffect)(()=>{if(!a)return;let e=window.setInterval(()=>{i(e=>{let t=(c.current()-.5)*360+(650-e)*.2;return Math.min(b,Math.max(0,e+t))})},1500);return()=>window.clearInterval(e)},[a]);let l=new Intl.NumberFormat(t.language,{maximumFractionDigits:0}),u=e=>l.format(e);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsx)(f,{value:n,max:b,bands:x,sweep:180,thickness:.22,needle:!0,label:e(`requestsPerSecond`),format:u,renderTooltip:t=>(0,y.jsxs)(`span`,{children:[e(`requestsPerSecond`),` · `,u(t.value)]}),height:260,ariaLabel:e(`liveAria`)}),(0,y.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`},children:(0,y.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>s(e=>!e),children:e(a?`pause`:`resume`)})})]})}var v,y,b,x;function S(){return(S=e((()=>{v=t(),i(),a(),d(),y=n(),b=1200,x=[{to:800,color:`var(--primary-color)`},{to:1e3,color:`var(--warning-color)`},{to:b,color:`var(--danger-color)`}]})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=t.language,i=new Intl.NumberFormat(n,{style:`percent`});return(0,C.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(170px, 1fr))`,gap:16,width:`100%`},children:w.map(t=>{let r=t.unit?new Intl.NumberFormat(n,{style:`unit`,unit:t.unit,notation:`compact`}):new Intl.NumberFormat(n,{notation:`compact`}),a=e(`quotas.${t.key}`);return(0,C.jsxs)(`figure`,{style:{margin:0,textAlign:`center`},children:[(0,C.jsx)(f,{value:t.used,max:t.limit,bands:T(t.limit),label:a,format:e=>i.format(e/t.limit),ticks:!1,renderTooltip:()=>(0,C.jsx)(`span`,{children:e(`quotaUsed`,{used:r.format(t.used),limit:r.format(t.limit)})}),height:180,ariaLabel:e(`quotaAria`,{quota:a,share:i.format(t.used/t.limit)})}),(0,C.jsx)(`figcaption`,{style:{fontSize:12,color:`var(--text-secondary-color)`},children:e(`quotaUsed`,{used:r.format(t.used),limit:r.format(t.limit)})})]},t.key)})})}var C,w,T;function E(){return(E=e((()=>{i(),d(),C=n(),w=[{key:`storage`,used:412,limit:500,unit:`gigabyte`},{key:`apiCalls`,used:184e4,limit:5e6},{key:`seats`,used:48,limit:50},{key:`minutes`,used:2310,limit:3e3,unit:`minute`}],T=e=>[{to:e*.75,color:`var(--success-color)`},{to:e*.9,color:`var(--warning-color)`},{to:e,color:`var(--danger-color)`}]})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=t.language,i=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2}),a=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,maximumFractionDigits:0}),o=new Intl.NumberFormat(n,{style:`percent`}),s=1-M/j;return(0,D.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:16,width:`100%`},children:[(0,D.jsx)(f,{value:k,min:99.5,max:100,bands:N,needle:!0,ticks:!1,label:e(`availability`),format:e=>i.format(e/100),renderTooltip:()=>(0,D.jsx)(`span`,{children:e(`objective`,{value:i.format(O/100)})}),height:240,ariaLabel:e(`availabilityAria`)}),(0,D.jsx)(f,{value:s*100,bands:[{to:25,color:`var(--danger-color)`},{to:50,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}],label:e(`budgetLeft`),format:e=>o.format(e/100),renderTooltip:()=>(0,D.jsx)(`span`,{children:e(`budgetDetail`,{used:a.format(M),budget:a.format(j)})}),height:240,ariaLabel:e(`budgetAria`)})]})}var D,O,k,A,j,M,N;function P(){return(P=e((()=>{i(),d(),D=n(),O=99.9,k=99.94,A=43200,j=A*(1-O/100),M=A*(1-k/100),N=[{to:O,color:`var(--danger-color)`},{to:99.95,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),[n,i]=(0,F.useState)(0),[a,s]=(0,F.useState)(null);(0,F.useEffect)(()=>{if(!a)return;let e=window.setInterval(()=>{i(e=>a===`accelerate`?Math.min(L,e+Math.max(1,(L-e)/40)):Math.max(0,e-6))},50);return()=>window.clearInterval(e)},[a]);let c=new Intl.NumberFormat(t.language,{style:`unit`,unit:`kilometer-per-hour`,maximumFractionDigits:0}),l=e=>({onPointerDown:()=>s(e),onPointerUp:()=>s(null),onPointerLeave:()=>s(null),onKeyDown:t=>{(t.key===` `||t.key===`Enter`)&&s(e)},onKeyUp:()=>s(null)});return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(f,{value:n,max:L,bands:R,thickness:.1,needle:!0,label:e(`speed`),format:e=>c.format(e),animation:!1,tooltip:!1,height:300,ariaLabel:e(`speedAria`,{speed:c.format(n)})}),(0,I.jsxs)(`div`,{style:{display:`flex`,gap:8,justifyContent:`center`},children:[(0,I.jsx)(o,{variant:`outline`,...l(`brake`),children:e(`brake`)}),(0,I.jsx)(o,{...l(`accelerate`),children:e(`accelerate`)})]})]})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),i(),a(),d(),I=n(),L=240,R=[{to:130,color:`var(--primary-color)`},{to:180,color:`var(--warning-color)`},{to:L,color:`var(--danger-color)`}]})))()}var B;function V(){return(V=e((()=>{B=`import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function BandsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  // "+42", "−12"...
  const signed = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });
  const format = (value: number) => signed.format(value);

  return (
    <GaugeChart
      value={42}
      min={-100}
      max={100}
      bands={bands}
      needle
      label={t("nps")}
      format={format}
      renderTooltip={(event) => (
        <span>
          {t("nps")} · {format(event.value)}
        </span>
      )}
      height={280}
      ariaLabel={t("nps")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useTranslation } from "react-i18next";
import { GaugeChart } from "minerva-design/charts";

// Resource usage of a server, in percent
const metrics = [
  { key: "cpu", value: 68, color: "var(--primary-color)" },
  { key: "memory", value: 82, color: "var(--warning-color)" },
  { key: "disk", value: 41, color: "var(--success-color)" },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  // "68%", "68 %"...: the values are percents, Intl expects ratios
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
  const format = (value: number) => percent.format(value / 100);

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
          key={metric.key}
          value={metric.value}
          label={t(\`metrics.\${metric.key}\`)}
          color={metric.color}
          format={format}
          renderTooltip={(event) => (
            <span>
              {t(\`metrics.\${metric.key}\`)} · {format(event.value)}
            </span>
          )}
          height={200}
          ariaLabel={t("usageAria", { metric: t(\`metrics.\${metric.key}\`) })}
        />
      ))}
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
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

  const number = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 0,
  });
  const rps = (requests: number) => number.format(requests);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={value}
        max={MAX}
        bands={bands}
        sweep={180}
        thickness={0.22}
        needle
        label={t("requestsPerSecond")}
        format={rps}
        renderTooltip={(event) => (
          <span>
            {t("requestsPerSecond")} · {rps(event.value)}
          </span>
        )}
        height={260}
        ariaLabel={t("liveAria")}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
      </div>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Usage of the plan's quotas this month
const quotas = [
  { key: "storage", used: 412, limit: 500, unit: "gigabyte" },
  { key: "apiCalls", used: 1_840_000, limit: 5_000_000 },
  { key: "seats", used: 48, limit: 50 },
  { key: "minutes", used: 2_310, limit: 3_000, unit: "minute" },
];

// the arc turns orange at 75% and red at 90% of the quota
const bandsFor = (limit: number): GaugeBand[] => [
  { to: limit * 0.75, color: "var(--success-color)" },
  { to: limit * 0.9, color: "var(--warning-color)" },
  { to: limit, color: "var(--danger-color)" },
];

export default function QuotaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {quotas.map((quota) => {
        // "412 GB", "1.8M", "2.3K min"...
        const amount = quota.unit
          ? new Intl.NumberFormat(locale, {
              style: "unit",
              unit: quota.unit,
              notation: "compact",
            })
          : new Intl.NumberFormat(locale, { notation: "compact" });
        const label = t(\`quotas.\${quota.key}\`);
        return (
          <figure key={quota.key} style={{ margin: 0, textAlign: "center" }}>
            <GaugeChart
              value={quota.used}
              max={quota.limit}
              bands={bandsFor(quota.limit)}
              label={label}
              // the center shows the share of the quota
              format={(value) => percent.format(value / quota.limit)}
              ticks={false}
              renderTooltip={() => (
                <span>
                  {t("quotaUsed", {
                    used: amount.format(quota.used),
                    limit: amount.format(quota.limit),
                  })}
                </span>
              )}
              height={180}
              ariaLabel={t("quotaAria", {
                quota: label,
                share: percent.format(quota.used / quota.limit),
              })}
            />
            <figcaption
              style={{ fontSize: 12, color: "var(--text-secondary-color)" }}
            >
              {t("quotaUsed", {
                used: amount.format(quota.used),
                limit: amount.format(quota.limit),
              })}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// 30-day availability of a service against its 99.9% objective
const OBJECTIVE = 99.9;
const AVAILABILITY = 99.94;
const MINUTES = 30 * 24 * 60;
// error budget: the downtime the objective allows over 30 days
const BUDGET = MINUTES * (1 - OBJECTIVE / 100);
const DOWNTIME = MINUTES * (1 - AVAILABILITY / 100);

// a zoomed scale from 99.5% to 100%: red below the objective
const bands: GaugeBand[] = [
  { to: OBJECTIVE, color: "var(--danger-color)" },
  { to: 99.95, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function SloDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const availability = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
  });
  const minutes = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    maximumFractionDigits: 0,
  });
  const share = new Intl.NumberFormat(locale, { style: "percent" });
  const left = 1 - DOWNTIME / BUDGET;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      <GaugeChart
        value={AVAILABILITY}
        min={99.5}
        max={100}
        bands={bands}
        needle
        // the band bounds would crowd the zoomed scale
        ticks={false}
        label={t("availability")}
        format={(value) => availability.format(value / 100)}
        renderTooltip={() => (
          <span>
            {t("objective", { value: availability.format(OBJECTIVE / 100) })}
          </span>
        )}
        height={240}
        ariaLabel={t("availabilityAria")}
      />
      <GaugeChart
        value={left * 100}
        bands={[
          { to: 25, color: "var(--danger-color)" },
          { to: 50, color: "var(--warning-color)" },
          { to: 100, color: "var(--success-color)" },
        ]}
        label={t("budgetLeft")}
        format={(value) => share.format(value / 100)}
        renderTooltip={() => (
          <span>
            {t("budgetDetail", {
              used: minutes.format(DOWNTIME),
              budget: minutes.format(BUDGET),
            })}
          </span>
        )}
        height={240}
        ariaLabel={t("budgetAria")}
      />
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useEffect, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

const MAX = 240; // km/h
const bands: GaugeBand[] = [
  { to: 130, color: "var(--primary-color)" },
  { to: 180, color: "var(--warning-color)" },
  { to: MAX, color: "var(--danger-color)" },
];

export default function SpeedometerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [speed, setSpeed] = useState(0);
  const [pedal, setPedal] = useState<"accelerate" | "brake" | null>(null);

  // while a pedal is held, the speed changes every 50 ms
  useEffect(() => {
    if (!pedal) return;
    const timer = window.setInterval(() => {
      setSpeed((current) =>
        pedal === "accelerate"
          ? Math.min(MAX, current + Math.max(1, (MAX - current) / 40))
          : Math.max(0, current - 6),
      );
    }, 50);
    return () => window.clearInterval(timer);
  }, [pedal]);

  // "120 km/h" with the reader's conventions
  const kmh = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "kilometer-per-hour",
    maximumFractionDigits: 0,
  });
  // press and hold, with the pointer or with Space / Enter
  const hold = (next: "accelerate" | "brake") => ({
    onPointerDown: () => setPedal(next),
    onPointerUp: () => setPedal(null),
    onPointerLeave: () => setPedal(null),
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") setPedal(next);
    },
    onKeyUp: () => setPedal(null),
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={speed}
        max={MAX}
        bands={bands}
        thickness={0.1}
        needle
        label={t("speed")}
        format={(value) => kmh.format(value)}
        // the needle follows the state: no entry animation on every change
        animation={false}
        tooltip={false}
        height={300}
        ariaLabel={t("speedAria", { speed: kmh.format(speed) })}
      />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <Button variant="outline" {...hold("brake")}>
          {t("brake")}
        </Button>
        <Button {...hold("accelerate")}>{t("accelerate")}</Button>
      </div>
    </div>
  );
}
`})))()}var Q,$,ce;function le(){return(le=e((()=>{te(),_(),S(),E(),P(),z(),V(),U(),G(),q(),Y(),Z(),t(),c(),u(),Q=n(),$=s(Object.assign({"./demos/bands.tsx":ee,"./demos/basic.tsx":ne,"./demos/live.tsx":ie,"./demos/quota.tsx":ae,"./demos/slo.tsx":oe,"./demos/speedometer.tsx":se}),Object.assign({"./demos/bands.tsx":B,"./demos/basic.tsx":H,"./demos/live.tsx":W,"./demos/quota.tsx":K,"./demos/slo.tsx":J,"./demos/speedometer.tsx":X})),ce=()=>(0,Q.jsx)(l,{id:`gauge-chart`,demos:$})})))()}le();export{ce as default};