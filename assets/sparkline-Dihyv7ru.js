import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{c as r,o as i}from"./DemoBlock-BJ0_y9F8.js";import{n as a,t as o}from"./useTranslation-BzoVi22c.js";import{a as s,i as ee,n as te,r as ne,s as re,t as ie}from"./Card-BqfTCY3r.js";import{n as c,t as l}from"./Tag-vE6Ajh98.js";import{l as ae,n as oe,t as se,u as ce}from"./DocPage-B2iACtLP.js";import{m as u,t as d}from"./charts-eaEG_eJd.js";function le(){let{t:e}=a(`common`,{keyPrefix:`docs.sparkline.data`});return(0,f.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(160px, 1fr))`,gap:24,width:`100%`},children:m.map(({caption:t,props:n})=>(0,f.jsxs)(`figure`,{style:{margin:0},children:[(0,f.jsx)(d,{data:p,name:e(`orders`),ariaLabel:e(`ordersAria`,{variant:t}),...n}),(0,f.jsx)(`figcaption`,{style:{marginTop:6,fontSize:12,color:`var(--text-secondary-color)`},children:(0,f.jsx)(`code`,{children:t})})]},t))})}var f,p,m;function h(){return(h=e((()=>{o(),u(),f=n(),p=[42,47,45,52,49,58,61,57,64,60,68,73,70,76,74,81,79,85,88,84],m=[{caption:`type="line"`,props:{}},{caption:`type="area"`,props:{type:`area`}},{caption:`type="bar"`,props:{type:`bar`}},{caption:`reference={average}`,props:{reference:p.reduce((e,t)=>e+t,0)/p.length,color:`var(--success-color)`}}]})))()}function ue(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.sparkline.data`}),n=new Intl.NumberFormat(t.language),r=new Intl.NumberFormat(t.language,{style:`unit`,unit:`celsius`});return(0,g.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,lineHeight:1.8},children:[(0,g.jsxs)(`div`,{children:[e(`inlineVisits`),(0,g.jsx)(d,{data:_,name:e(`visits`),format:e=>n.format(e),width:80,height:20,style:y,ariaLabel:e(`visitsAria`)}),(0,g.jsx)(`strong`,{children:n.format(_[_.length-1])})]}),(0,g.jsxs)(`div`,{children:[e(`inlineErrors`),(0,g.jsx)(d,{data:de,type:`bar`,name:e(`errors`),color:`var(--danger-color)`,width:80,height:20,style:y,ariaLabel:e(`errorsAria`)})]}),(0,g.jsxs)(`div`,{children:[e(`inlineTemperature`),(0,g.jsx)(d,{data:v,type:`area`,name:e(`temperature`),format:e=>r.format(e),color:`var(--warning-color)`,width:80,height:20,style:y,ariaLabel:e(`temperatureAria`)}),(0,g.jsx)(`strong`,{children:r.format(v[v.length-1])})]})]})}var g,_,de,v,y;function b(){return(b=e((()=>{o(),u(),g=n(),_=[820,870,910,860,990,1040,1010,1120,1180,1150,1260,1310,1290,1380],de=[12,9,14,11,10,8,26,31,18,9,7,8,6,7],v=[14,15,13,12,16,18,19,21,20,18,17,19,22,23],y={display:`inline-block`,verticalAlign:`middle`,margin:`0 4px`}})))()}function fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function pe(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,r=(0,x.useMemo)(()=>{let t=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),i=new Intl.NumberFormat(n),a=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`});return[{label:e(`revenue`),value:r.format(128400),delta:.125,good:!0,spark:{data:C(1,3600,4400,.12),type:`area`,name:e(`revenue`),format:e=>t.format(e)}},{label:e(`activeUsers`),value:i.format(24310),delta:.041,good:!0,spark:{data:C(2,23e3,24300,.04),name:e(`activeUsers`),format:e=>i.format(e)}},{label:e(`signups`),value:i.format(1842),delta:-.032,good:!1,spark:{data:C(3,66,58,.3),type:`bar`,name:e(`signups`),color:`var(--warning-color)`}},{label:e(`p95`),value:a.format(182),delta:-.08,good:!0,spark:{data:C(4,205,180,.08),name:e(`p95`),format:e=>a.format(e),reference:200,color:`var(--success-color)`}}]},[e,n]),i=(0,x.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,signDisplay:`exceptZero`}),[n]);return(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(200px, 1fr))`,gap:16,width:`100%`},children:r.map(t=>(0,S.jsxs)(ie,{padding:`medium`,children:[(0,S.jsxs)(s,{children:[(0,S.jsx)(te,{children:t.label}),(0,S.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:8},children:[(0,S.jsx)(re,{style:{fontSize:24},children:t.value}),(0,S.jsx)(l,{size:`small`,color:t.good?`success`:`danger`,children:i.format(t.delta)})]})]}),(0,S.jsx)(ne,{children:(0,S.jsx)(d,{...t.spark,height:56,ariaLabel:e(`last30Aria`,{metric:t.label})})})]},t.label))})}var x,S,C;function w(){return(w=e((()=>{x=t(),o(),ee(),c(),u(),S=n(),C=(e,t,n,r)=>{let i=fe(e),a=[],o=0;for(let e=0;e<30;e++)o=o*.6+(i()-.5)*r,a.push(Math.round((t+(n-t)*e/29)*(1+o)));return a}})))()}function me(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.sparkline.data`}),[n,r]=(0,T.useState)(j);(0,T.useEffect)(()=>{let e=setInterval(()=>{r(e=>e.map((e,t)=>[...e.slice(1),A(e[e.length-1],k[t].base)]))},1e3);return()=>clearInterval(e)},[]);let i=new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:0});return(0,E.jsx)(`ul`,{style:{listStyle:`none`,margin:0,padding:0,display:`grid`,gap:8,width:`100%`},children:k.map((t,r)=>{let a=n[r],o=a[a.length-1],s=o>=D;return(0,E.jsxs)(`li`,{style:{display:`grid`,gridTemplateColumns:`110px 1fr 64px 90px`,alignItems:`center`,gap:12},children:[(0,E.jsx)(`code`,{children:t.name}),(0,E.jsx)(d,{data:a,type:`bar`,name:e(`cpu`),format:e=>i.format(e/100),color:s?`var(--danger-color)`:`var(--primary-color)`,height:28,ariaLabel:e(`cpuAria`,{server:t.name})}),(0,E.jsx)(`span`,{style:{textAlign:`end`,fontVariantNumeric:`tabular-nums`},children:i.format(o/100)}),(0,E.jsx)(l,{size:`small`,color:s?`danger`:`success`,children:e(s?`alert`:`healthy`)})]},t.name)})})}var T,E,D,O,k,A,j;function M(){return(M=e((()=>{T=t(),o(),c(),u(),E=n(),D=80,O=40,k=[{name:`web-01`,base:35},{name:`web-02`,base:42},{name:`db-primary`,base:66},{name:`worker-01`,base:55}],A=(e,t)=>{let n=Math.random()<.05?30:0,r=e+(t-e)*.3+(Math.random()-.5)*14+n;return Math.max(2,Math.min(100,r))},j=()=>k.map(({base:e})=>Array.from({length:O},()=>e))})))()}function he(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ge(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,r=(0,N.useMemo)(()=>{let t=new Intl.NumberFormat(n),r=new Intl.NumberFormat(n,{style:`unit`,unit:`millisecond`}),i=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,signDisplay:`exceptZero`});return[{key:`name`,header:e(`service`),render:t=>e(`services.${t.id}`)},{key:`requests`,header:e(`requestsPerMin`),align:`right`,render:e=>t.format(e.requests)},{key:`trend`,header:e(`latency30`),width:180,render:t=>(0,P.jsx)(d,{data:t.latency,name:e(`p95`),format:e=>r.format(e),color:R(t.latency)>0?`var(--danger-color)`:`var(--success-color)`,width:150,height:32,ariaLabel:e(`latencyAria`,{service:e(`services.${t.id}`)})})},{key:`latency`,header:e(`today`),align:`right`,render:e=>r.format(e.latency[e.latency.length-1])},{key:`change`,header:e(`change`),align:`right`,render:e=>{let t=R(e.latency);return(0,P.jsx)(l,{size:`small`,color:t>0?`danger`:`success`,children:i.format(t)})}}]},[e,n]);return(0,P.jsx)(i,{"aria-label":e(`serviceLatency`),columns:r,data:L,rowKey:e=>e.id,hoverable:!0})}var N,P,F,I,L,R;function z(){return(z=e((()=>{N=t(),o(),r(),c(),u(),P=n(),F=[[`gateway`,48200,96,88],[`auth`,12900,64,71],[`search`,8400,210,162],[`payments`,2150,320,395],[`notifications`,5600,140,138]],I=he(30),L=F.map(([e,t,n,r])=>{let i=Array.from({length:30},(e,t)=>{let i=n+(r-n)*t/29;return Math.round(i*(1+(I()-.5)*.14))});return i[0]=n,i[29]=r,{id:e,requests:t,latency:i}}),R=e=>e[e.length-1]/e[0]-1})))()}function _e(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ve(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.sparkline.data`}),n=t.language,r=(0,B.useMemo)(()=>{let t=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2,signDisplay:`exceptZero`}),r=e=>new Intl.NumberFormat(n,{style:`currency`,currency:e}),i=e=>K(e)>=0?`var(--success-color)`:`var(--danger-color)`;return[{key:`symbol`,header:e(`symbol`),render:t=>(0,V.jsxs)(`div`,{style:{display:`grid`},children:[(0,V.jsx)(`strong`,{children:t.symbol}),(0,V.jsx)(`small`,{style:{color:`var(--text-secondary-color)`},children:e(`companies.${t.symbol}`)})]})},{key:`chart`,header:e(`today`),width:140,render:t=>(0,V.jsx)(d,{data:t.prices,type:`area`,color:i(t),reference:t.previous,name:t.symbol,format:e=>r(t.currency).format(e),width:120,height:36,ariaLabel:e(`intradayAria`,{symbol:t.symbol})})},{key:`price`,header:e(`price`),align:`right`,render:e=>r(e.currency).format(G(e))},{key:`change`,header:e(`change`),align:`right`,render:e=>(0,V.jsx)(`span`,{style:{color:i(e),fontWeight:600},children:t.format(K(e))})}]},[e,n]);return(0,V.jsx)(i,{"aria-label":e(`watchlist`),columns:r,data:W,rowKey:e=>e.symbol,hoverable:!0})}var B,V,H,U,W,G,K;function q(){return(q=e((()=>{B=t(),o(),r(),u(),V=n(),H=[[`ACME`,`USD`,182.4,.021],[`NOVA`,`USD`,64.15,-.034],[`ORBT`,`EUR`,47.9,.006],[`KITE`,`JPY`,2845,-.012],[`LUMA`,`USD`,312.7,.047]],U=_e(78),W=H.map(([e,t,n,r])=>{let i=n;return{symbol:e,currency:t,previous:n,prices:Array.from({length:78},(e,t)=>(i*=1+r/78+(U()-.5)*.006,t===0?n:i))}}),G=e=>e.prices[e.prices.length-1],K=e=>G(e)/e.previous-1})))()}var J;function Y(){return(Y=e((()=>{J=`import { useTranslation } from "react-i18next";
import { Sparkline } from "minerva-design/charts";

const weekly = [
  42, 47, 45, 52, 49, 58, 61, 57, 64, 60, 68, 73, 70, 76, 74, 81, 79, 85, 88,
  84,
];
const average = weekly.reduce((sum, v) => sum + v, 0) / weekly.length;

const variants = [
  { caption: 'type="line"', props: {} },
  { caption: 'type="area"', props: { type: "area" as const } },
  { caption: 'type="bar"', props: { type: "bar" as const } },
  {
    caption: "reference={average}",
    props: { reference: average, color: "var(--success-color)" },
  },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.sparkline.data" });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 24,
        width: "100%",
      }}
    >
      {variants.map(({ caption, props }) => (
        <figure key={caption} style={{ margin: 0 }}>
          <Sparkline
            data={weekly}
            name={t("orders")}
            ariaLabel={t("ordersAria", { variant: caption })}
            {...props}
          />
          <figcaption
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "var(--text-secondary-color)",
            }}
          >
            <code>{caption}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useTranslation } from "react-i18next";
import { Sparkline } from "minerva-design/charts";

// Last 14 days
const visits = [
  820, 870, 910, 860, 990, 1040, 1010, 1120, 1180, 1150, 1260, 1310, 1290, 1380,
];
const errors = [12, 9, 14, 11, 10, 8, 26, 31, 18, 9, 7, 8, 6, 7];
const temperature = [14, 15, 13, 12, 16, 18, 19, 21, 20, 18, 17, 19, 22, 23];

// A sparkline inside a sentence: inline-block, about the height of a line
const inline = {
  display: "inline-block",
  verticalAlign: "middle",
  margin: "0 4px",
};

export default function InlineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const celsius = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "celsius",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", lineHeight: 1.8 }}>
      <div>
        {t("inlineVisits")}
        <Sparkline
          data={visits}
          name={t("visits")}
          format={(value) => number.format(value)}
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("visitsAria")}
        />
        <strong>{number.format(visits[visits.length - 1])}</strong>
      </div>
      <div>
        {t("inlineErrors")}
        <Sparkline
          data={errors}
          type="bar"
          name={t("errors")}
          color="var(--danger-color)"
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("errorsAria")}
        />
      </div>
      <div>
        {t("inlineTemperature")}
        <Sparkline
          data={temperature}
          type="area"
          name={t("temperature")}
          format={(value) => celsius.format(value)}
          color="var(--warning-color)"
          width={80}
          height={20}
          style={inline}
          ariaLabel={t("temperatureAria")}
        />
        <strong>{celsius.format(temperature[temperature.length - 1])}</strong>
      </div>
    </div>
  );
}
`})))()}var Q;function $(){return($=e((()=>{Q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tag,
} from "minerva-design";
import { Sparkline, type SparklineConfig } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30 daily values drifting from \`from\` to \`to\`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

interface Kpi {
  label: string;
  value: string;
  /** Change over the period, 0.125 = +12.5% */
  delta: number;
  /** The change is good news (an increase is not always one) */
  good: boolean;
  spark: SparklineConfig;
}

export default function KpiCardsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const kpis = useMemo((): Kpi[] => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const compactUsd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    return [
      {
        label: t("revenue"),
        value: compactUsd.format(128_400),
        delta: 0.125,
        good: true,
        spark: {
          data: trend(1, 3600, 4400, 0.12),
          type: "area",
          name: t("revenue"),
          format: (v) => usd.format(v),
        },
      },
      {
        label: t("activeUsers"),
        value: number.format(24_310),
        delta: 0.041,
        good: true,
        spark: {
          data: trend(2, 23_000, 24_300, 0.04),
          name: t("activeUsers"),
          format: (v) => number.format(v),
        },
      },
      {
        label: t("signups"),
        value: number.format(1_842),
        delta: -0.032,
        good: false,
        spark: {
          data: trend(3, 66, 58, 0.3),
          type: "bar",
          name: t("signups"),
          color: "var(--warning-color)",
        },
      },
      {
        label: t("p95"),
        value: ms.format(182),
        delta: -0.08,
        good: true,
        spark: {
          data: trend(4, 205, 180, 0.08),
          name: t("p95"),
          format: (v) => ms.format(v),
          reference: 200,
          color: "var(--success-color)",
        },
      },
    ];
  }, [t, locale]);
  // "+12.5%", "-3.2 %"...
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {kpis.map((kpi) => (
        <Card key={kpi.label} padding="medium">
          <CardHeader>
            <CardDescription>{kpi.label}</CardDescription>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <CardTitle style={{ fontSize: 24 }}>{kpi.value}</CardTitle>
              <Tag size="small" color={kpi.good ? "success" : "danger"}>
                {percent.format(kpi.delta)}
              </Tag>
            </div>
          </CardHeader>
          <CardContent>
            <Sparkline
              {...kpi.spark}
              height={56}
              ariaLabel={t("last30Aria", { metric: kpi.label })}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

const LIMIT = 80; // % CPU before the alert
const POINTS = 40;

const servers = [
  { name: "web-01", base: 35 },
  { name: "web-02", base: 42 },
  { name: "db-primary", base: 66 },
  { name: "worker-01", base: 55 },
];

/** Next CPU sample: a random walk around \`base\`, with occasional spikes */
const next = (previous: number, base: number) => {
  const spike = Math.random() < 0.05 ? 30 : 0;
  const value =
    previous + (base - previous) * 0.3 + (Math.random() - 0.5) * 14 + spike;
  return Math.max(2, Math.min(100, value));
};

const initial = () =>
  servers.map(({ base }) => Array.from({ length: POINTS }, () => base));

export default function ServersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const [cpu, setCpu] = useState(initial);

  // a new sample per server every second, the oldest one drops out
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu((current) =>
        current.map((samples, i) => [
          ...samples.slice(1),
          next(samples[samples.length - 1], servers[i].base),
        ]),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gap: 8,
        width: "100%",
      }}
    >
      {servers.map((server, i) => {
        const samples = cpu[i];
        const current = samples[samples.length - 1];
        const hot = current >= LIMIT;
        return (
          <li
            key={server.name}
            style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr 64px 90px",
              alignItems: "center",
              gap: 12,
            }}
          >
            <code>{server.name}</code>
            <Sparkline
              data={samples}
              type="bar"
              name={t("cpu")}
              format={(value) => percent.format(value / 100)}
              // red while the server is above the alert threshold
              color={hot ? "var(--danger-color)" : "var(--primary-color)"}
              height={28}
              ariaLabel={t("cpuAria", { server: server.name })}
            />
            <span
              style={{ textAlign: "end", fontVariantNumeric: "tabular-nums" }}
            >
              {percent.format(current / 100)}
            </span>
            <Tag size="small" color={hot ? "danger" : "success"}>
              {hot ? t("alert") : t("healthy")}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, Tag, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Service {
  id: string;
  requests: number;
  /** p95 latency of the last 30 days, in ms */
  latency: number[];
}

const services: [string, number, number, number][] = [
  // translation key, requests / min, latency 30 days ago, latency today
  ["gateway", 48_200, 96, 88],
  ["auth", 12_900, 64, 71],
  ["search", 8_400, 210, 162],
  ["payments", 2_150, 320, 395],
  ["notifications", 5_600, 140, 138],
];

const random = mulberry32(30);
const data: Service[] = services.map(([id, requests, from, to]) => {
  const latency = Array.from({ length: 30 }, (_, i) => {
    const value = from + ((to - from) * i) / 29;
    return Math.round(value * (1 + (random() - 0.5) * 0.14));
  });
  latency[0] = from;
  latency[29] = to;
  return { id, requests, latency };
});

const change = (latency: number[]) =>
  latency[latency.length - 1] / latency[0] - 1;

export default function TableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const columns = useMemo((): TableColumn<Service>[] => {
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return [
      {
        key: "name",
        header: t("service"),
        render: (row) => t(\`services.\${row.id}\`),
      },
      {
        key: "requests",
        header: t("requestsPerMin"),
        align: "right",
        render: (row) => number.format(row.requests),
      },
      {
        key: "trend",
        header: t("latency30"),
        width: 180,
        render: (row) => (
          <Sparkline
            data={row.latency}
            name={t("p95")}
            format={(value) => ms.format(value)}
            // rising latency is bad news
            color={
              change(row.latency) > 0
                ? "var(--danger-color)"
                : "var(--success-color)"
            }
            width={150}
            height={32}
            ariaLabel={t("latencyAria", { service: t(\`services.\${row.id}\`) })}
          />
        ),
      },
      {
        key: "latency",
        header: t("today"),
        align: "right",
        render: (row) => ms.format(row.latency[row.latency.length - 1]),
      },
      {
        key: "change",
        header: t("change"),
        align: "right",
        render: (row) => {
          const value = change(row.latency);
          return (
            <Tag size="small" color={value > 0 ? "danger" : "success"}>
              {percent.format(value)}
            </Tag>
          );
        },
      },
    ];
  }, [t, locale]);

  return (
    <Table
      aria-label={t("serviceLatency")}
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      hoverable
    />
  );
}
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Quote {
  symbol: string;
  currency: string;
  /** Previous close, then one price every 5 minutes of the session */
  previous: number;
  prices: number[];
}

// symbol, currency, previous close, drift over the session
const symbols: [string, string, number, number][] = [
  ["ACME", "USD", 182.4, 0.021],
  ["NOVA", "USD", 64.15, -0.034],
  ["ORBT", "EUR", 47.9, 0.006],
  ["KITE", "JPY", 2_845, -0.012],
  ["LUMA", "USD", 312.7, 0.047],
];

const random = mulberry32(78);
const quotes: Quote[] = symbols.map(([symbol, currency, previous, drift]) => {
  let price = previous;
  const prices = Array.from({ length: 78 }, (_, i) => {
    price *= 1 + drift / 78 + (random() - 0.5) * 0.006;
    return i === 0 ? previous : price;
  });
  return { symbol, currency, previous, prices };
});

const last = (quote: Quote) => quote.prices[quote.prices.length - 1];
const change = (quote: Quote) => last(quote) / quote.previous - 1;

export default function WatchlistDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const columns = useMemo((): TableColumn<Quote>[] => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    const money = (currency: string) =>
      new Intl.NumberFormat(locale, { style: "currency", currency });
    // green or red, like the trading apps
    const color = (quote: Quote) =>
      change(quote) >= 0 ? "var(--success-color)" : "var(--danger-color)";
    return [
      {
        key: "symbol",
        header: t("symbol"),
        render: (quote) => (
          <div style={{ display: "grid" }}>
            <strong>{quote.symbol}</strong>
            <small style={{ color: "var(--text-secondary-color)" }}>
              {t(\`companies.\${quote.symbol}\`)}
            </small>
          </div>
        ),
      },
      {
        key: "chart",
        header: t("today"),
        width: 140,
        render: (quote) => (
          <Sparkline
            data={quote.prices}
            type="area"
            color={color(quote)}
            // dashed line at the previous close
            reference={quote.previous}
            name={quote.symbol}
            format={(value) => money(quote.currency).format(value)}
            width={120}
            height={36}
            ariaLabel={t("intradayAria", { symbol: quote.symbol })}
          />
        ),
      },
      {
        key: "price",
        header: t("price"),
        align: "right",
        render: (quote) => money(quote.currency).format(last(quote)),
      },
      {
        key: "change",
        header: t("change"),
        align: "right",
        render: (quote) => (
          <span style={{ color: color(quote), fontWeight: 600 }}>
            {percent.format(change(quote))}
          </span>
        ),
      },
    ];
  }, [t, locale]);

  return (
    <Table
      aria-label={t("watchlist")}
      columns={columns}
      data={quotes}
      rowKey={(quote) => quote.symbol}
      hoverable
    />
  );
}
`})))()}var Te,Ee,De;function Oe(){return(Oe=e((()=>{h(),b(),w(),M(),z(),q(),Y(),Z(),$(),be(),Se(),we(),t(),oe(),ce(),Te=n(),Ee=ae(Object.assign({"./demos/basic.tsx":le,"./demos/inline.tsx":ue,"./demos/kpi-cards.tsx":pe,"./demos/servers.tsx":me,"./demos/table.tsx":ge,"./demos/watchlist.tsx":ve}),Object.assign({"./demos/basic.tsx":J,"./demos/inline.tsx":X,"./demos/kpi-cards.tsx":Q,"./demos/servers.tsx":ye,"./demos/table.tsx":xe,"./demos/watchlist.tsx":Ce})),De=()=>(0,Te.jsx)(se,{id:`sparkline`,demos:Ee})})))()}Oe();export{De as default};