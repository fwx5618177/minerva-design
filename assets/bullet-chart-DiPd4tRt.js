import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{n as l,t as u}from"./Switch-CHbzff3y.js";import{i as d,o as f,t as p}from"./Select-CRoh0AwC.js";import{l as m,n as h,t as g,u as _}from"./DocPage-BNEhhzRL.js";import{c as v,l as y}from"./shapes-B5QcpBlT.js";function ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),n=t.language,[i,a]=(0,b.useState)(null),o=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,maximumFractionDigits:1}),[n]),s=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,maximumFractionDigits:1,signDisplay:`exceptZero`}),[n]),c=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),l=e=>o.format(e*1e3),u=(0,b.useMemo)(()=>S.map(([t,n,r])=>{let i=r*C;return{name:e(`budget.departments.${t}`),subtitle:e(`budget.yearly`,{budget:o.format(r*1e3)}),value:n,target:i,ranges:[i*.9,i,i*1.25],color:n>i?`var(--danger-color)`:`var(--success-color)`}}),[o,e]),d=(0,b.useMemo)(()=>[e(`budget.ranges.comfortable`),e(`budget.ranges.tight`),e(`budget.ranges.over`)],[e]),f=S.filter(([,e,t])=>e>t*C).length;return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(y,{data:u,rangeLabels:d,format:l,onClick:e=>a(e.index),height:360,ariaLabel:e(`budget.aria`)}),(0,x.jsx)(`output`,{"aria-live":`polite`,children:(()=>{if(i===null)return e(`budget.hint`,{over:f});let[,t,n]=S[i],r=n*C;return e(t>r?`budget.overPlan`:`budget.underPlan`,{department:u[i].name,variance:s.format((t-r)*1e3),share:c.format(t/n),left:o.format(Math.max(0,n-t)*1e3)})})()})]})}var b,x,S,C;function te(){return(te=e((()=>{b=t(),i(),v(),x=n(),S=[[`marketing`,1380,1600],[`engineering`,3920,5400],[`sales`,1010,1500],[`people`,560,680],[`facilities`,702,900],[`travel`,205,320]],C=.75})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),n=t.language,[i,a]=(0,w.useState)(`plan`),[o,s]=(0,w.useState)([]),c=(0,w.useMemo)(()=>{if(i===`plan`)return E;let e=i===`behind`?1:-1;return[...E].sort((t,n)=>e*(O(t)-O(n)))},[i]),l=(0,w.useMemo)(()=>new Intl.NumberFormat(n),[n]),u=(0,w.useMemo)(()=>c.map(([t,n,r])=>({name:e(`hiring.teams.${t}`),subtitle:e(`hiring.planned`,{plan:l.format(r)}),value:n,target:r*D,ranges:[r*.5,r*D,r],max:r})),[l,c,e]),d=c.map(([e],t)=>o.includes(e)?t:-1).filter(e=>e>=0),m=(0,w.useMemo)(()=>[e(`hiring.ranges.behind`),e(`hiring.ranges.catchingUp`),e(`hiring.ranges.onTrack`)],[e]),h=(0,w.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),g=E.filter(([e])=>!o.includes(e)),_=g.reduce((e,[,t])=>e+t,0),v=g.reduce((e,[,,t])=>e+t,0);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsx)(f,{size:`small`,style:{width:220},"aria-label":e(`hiring.order`),value:i,onChange:e=>a(e),children:re.map(t=>(0,T.jsx)(p,{value:t,children:e(`hiring.orders.${t}`)},t))}),(0,T.jsx)(y,{data:u,legend:!0,hidden:d,onToggle:e=>s(e.hiddenIndexes.map(e=>c[e][0])),rangeLabels:m,format:e=>l.format(e),height:380,ariaLabel:e(`hiring.aria`)}),(0,T.jsx)(`output`,{"aria-live":`polite`,children:g.length?e(`hiring.summary`,{hired:l.format(_),planned:l.format(v),share:h.format(_/v),teams:l.format(g.length)}):e(`hiring.none`)})]})}var w,T,E,D,re,O;function ie(){return(ie=e((()=>{w=t(),i(),d(),v(),T=n(),E=[[`engineering`,31,48],[`sales`,19,22],[`support`,14,16],[`marketing`,4,9],[`product`,7,8],[`finance`,2,4]],D=.75,re=[`plan`,`behind`,`ahead`],O=([,e,t])=>e/(t*D)})))()}function ae(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),n=t.language,[i,a]=(0,k.useState)(!0),[o,s]=(0,k.useState)(ce),c=(0,k.useRef)(ae(se));(0,k.useEffect)(()=>{if(!i)return;let e=window.setInterval(()=>{let e=j.map(e=>(c.current()-.42)*2*e.step);s(t=>t.map((t,n)=>{let r=j[n],i=t+e[n]+(r.setpoint-t)*.08;return Math.min(r.max,Math.max(0,i))}))},1e3);return()=>window.clearInterval(e)},[i]);let l=(0,k.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:1}),[n]),d=o.map((e,t)=>M(e,j[t])),f=(0,k.useMemo)(()=>j.map((t,n)=>({name:e(`sensors.names.${t.key}`),subtitle:e(`sensors.units.${t.key}`),value:o[n],target:t.setpoint,ranges:[t.warning,t.critical,t.max],max:t.max,color:le[M(o[n],t)]})),[o,e]),p=(0,k.useMemo)(()=>[e(`sensors.status.ok`),e(`sensors.status.warning`),e(`sensors.status.critical`)],[e]),m=j.filter((e,t)=>d[t]!==`ok`).map(t=>e(`sensors.names.${t.key}`)),h=new Intl.ListFormat(n,{type:`conjunction`});return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsx)(u,{checked:i,onChange:a,label:e(`sensors.live`)}),(0,A.jsx)(y,{data:f,rangeLabels:p,animation:!1,format:e=>l.format(e),height:300,ariaLabel:e(`sensors.aria`)}),(0,A.jsx)(`output`,{"aria-live":`polite`,children:m.length?e(`sensors.alerts`,{sensors:h.format(m)}):e(`sensors.allOk`)})]})}var k,A,j,se,ce,le,M;function ue(){return(ue=e((()=>{k=t(),i(),l(),v(),A=n(),j=[{key:`inlet`,setpoint:22,warning:27,critical:32,max:40,step:1.6},{key:`humidity`,setpoint:45,warning:60,critical:70,max:100,step:4},{key:`power`,setpoint:6,warning:8,critical:9.5,max:12,step:.7},{key:`fans`,setpoint:50,warning:80,critical:95,max:100,step:7}],se=11,ce=[24.5,52,7.1,62],le={ok:`var(--success-color)`,warning:`#f59e0b`,critical:`var(--danger-color)`},M=(e,t)=>e>=t.critical?`critical`:e>=t.warning?`warning`:`ok`})))()}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,N.useMemo)(()=>P.map(({key:t,...n})=>({name:e(`long.${t}`),subtitle:e(`long.${t}Unit`),...n})),[e]),n=(0,N.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]);return(0,fe.jsx)(y,{data:t,rangeLabels:n,ariaLabel:e(`longAria`)})}var N,fe,P;function F(){return(F=e((()=>{N=t(),i(),v(),fe=n(),P=[{key:`onboarding`,value:78,target:85,ranges:[60,75,100]},{key:`support`,value:87,target:90,ranges:[70,85,100]},{key:`deployments`,value:96.4,target:98,ranges:[90,95,100]},{key:`renewals`,value:1.18,target:1.1,ranges:[.9,1.05,1.3]}]})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),[n,i]=(0,I.useState)(2),o=t.language,s=(0,I.useMemo)(()=>{let e=new Intl.DateTimeFormat(o,{month:`short`,timeZone:`UTC`});return V.map((t,n)=>e.format(Date.UTC(2026,n,1)))},[o]),l=(0,I.useMemo)(()=>R.map(t=>({name:e(`growth.${t}`),subtitle:e(`growth.${t}Unit`),value:V[n][t],target:z[t],ranges:B[t]})),[n,e]);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsx)(a,{"aria-label":e(`monthLabel`),direction:`horizontal`,value:n,onChange:e=>i(Number(e)),children:s.map((e,t)=>(0,L.jsx)(c,{value:t,label:e},e))}),(0,L.jsx)(y,{data:l,legend:!0,ariaLabel:e(`growthAria`)})]})}var I,L,R,z,B,V;function H(){return(H=e((()=>{I=t(),i(),o(),s(),v(),L=n(),R=[`visitors`,`signups`,`activation`,`mrr`],z={visitors:120,signups:4800,activation:45,mrr:210},B={visitors:[80,110,150],signups:[3e3,4500,6e3],activation:[30,40,60],mrr:[150,200,260]},V=[{visitors:86,signups:3100,activation:34,mrr:162},{visitors:94,signups:3550,activation:37,mrr:171},{visitors:108,signups:4020,activation:41,mrr:184},{visitors:117,signups:4410,activation:43,mrr:196},{visitors:129,signups:4930,activation:46,mrr:207},{visitors:141,signups:5380,activation:49,mrr:223}]})))()}function me(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,U.useMemo)(()=>G.map(({key:t,...n})=>({name:e(`sales.${t}`),subtitle:e(`sales.${t}Unit`),...n})),[e]),n=(0,U.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]);return(0,W.jsx)(y,{data:t,rangeLabels:n,ariaLabel:e(`salesAria`)})}var U,W,G;function he(){return(he=e((()=>{U=t(),i(),v(),W=n(),G=[{key:`revenue`,value:270,target:250,ranges:[150,225,300]},{key:`profit`,value:22.5,target:26,ranges:[20,25,30]},{key:`orderSize`,value:320,target:550,ranges:[350,500,600]},{key:`customers`,value:1650,target:2100,ranges:[1400,2e3,2500]},{key:`satisfaction`,value:4.6,target:4.4,ranges:[3.5,4.25,5]}]})))()}function ge(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,K.useMemo)(()=>ve.map(t=>({...t,name:e(`slo.${t.name}`),subtitle:e(`slo.${t.name}Unit`),color:`var(--text-color)`})),[e]),n=(0,K.useMemo)(()=>[e(`ranges.breach`),e(`ranges.atRisk`),e(`ranges.healthy`)],[e]);return(0,_e.jsx)(y,{data:t,rangeColors:ye,rangeLabels:n,targetColor:`#2563eb`,barSize:.3,format:be,ariaLabel:e(`sloAria`)})}var K,_e,ve,ye,be;function xe(){return(xe=e((()=>{K=t(),i(),v(),_e=n(),ve=[{name:`availability`,value:99.95,target:99.9,ranges:[99.5,99.9,100],min:99},{name:`apdex`,value:.91,target:.94,ranges:[.7,.85,1]},{name:`throughput`,value:1240,target:1e3,ranges:[800,1200,1600]},{name:`budget`,value:38,target:50,ranges:[25,50,100]}],ye=[`rgba(239, 68, 68, 0.3)`,`rgba(245, 158, 11, 0.3)`,`rgba(34, 197, 94, 0.3)`],be=e=>String(e>=100?Math.round(e):+e.toFixed(2))})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),n=t.language,[i,a]=(0,q.useState)(`amara`),o=(0,q.useMemo)(()=>Object.fromEntries(Y.map(e=>{let t=Ce[e];return[e,new Intl.NumberFormat(n,t?{style:`unit`,unit:t,unitDisplay:`short`}:{})]})),[n]),s=(0,q.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),c=(0,q.useMemo)(()=>Y.map(t=>{let n=X[i][t];return{name:e(`training.metrics.${t}`),subtitle:e(`training.plan`,{plan:o[t].format(n)}),value:Z[i][t],target:n,ranges:[n*.8,n,n*1.25]}}),[o,i,e]),l=(0,q.useMemo)(()=>[e(`training.ranges.under`),e(`training.ranges.onPlan`),e(`training.ranges.above`)],[e]),u=Y.filter(e=>Z[i][e]>=X[i][e]).length;return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsx)(f,{size:`small`,style:{width:200},"aria-label":e(`training.runner`),value:i,onChange:e=>a(e),children:we.map(t=>(0,J.jsx)(p,{value:t,children:e(`training.runners.${t}`)},t))}),(0,J.jsx)(y,{data:c,rangeLabels:l,ticks:!1,renderTooltip:t=>{let n=Y[t.index];return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,J.jsx)(`strong`,{children:t.name}),(0,J.jsx)(`span`,{children:e(`training.tooltip`,{value:o[n].format(t.value),plan:o[n].format(X[i][n]),share:s.format(t.percent)})})]})},height:320,ariaLabel:e(`training.aria`,{runner:e(`training.runners.${i}`)})}),(0,J.jsx)(`output`,{"aria-live":`polite`,children:e(`training.summary`,{runner:e(`training.runners.${i}`),met:u,metrics:Y.length})})]})}var q,J,Y,Ce,X,Z,we;function Te(){return(Te=e((()=>{q=t(),i(),d(),v(),J=n(),Y=[`distance`,`longRun`,`elevation`,`sessions`,`sleep`],Ce={distance:`kilometer`,longRun:`kilometer`,elevation:`meter`,sessions:null,sleep:`hour`},X={amara:{distance:85,longRun:30,elevation:900,sessions:6,sleep:56},lucas:{distance:60,longRun:24,elevation:500,sessions:5,sleep:52},mei:{distance:72,longRun:28,elevation:1200,sessions:6,sleep:56}},Z={amara:{distance:88,longRun:31,elevation:760,sessions:6,sleep:49},lucas:{distance:47,longRun:18,elevation:540,sessions:4,sleep:54},mei:{distance:74,longRun:26,elevation:1310,sessions:5,sleep:58}},we=Object.keys(X)})))()}function Ee(){let{t:e}=r(`common`,{keyPrefix:`docs.bullet-chart.data`}),t=(0,Q.useMemo)(()=>Oe.map(([t,n,r])=>({name:e(`teams.${t}`),value:n,target:r})),[e]),n=(0,Q.useMemo)(()=>[e(`ranges.poor`),e(`ranges.fair`),e(`ranges.good`)],[e]);return(0,De.jsx)(y,{data:t,orientation:`vertical`,ranges:[25,35,50],rangeLabels:n,barSize:.5,height:320,ariaLabel:e(`teamsAria`)})}var Q,De,Oe;function ke(){return(ke=e((()=>{Q=t(),i(),v(),De=n(),Oe=[[`checkout`,42,40],[`search`,31,38],[`mobile`,46,45],[`platform`,24,30],[`growth`,37,34],[`data`,28,32]]})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Spending of each department at the end of Q3, against its yearly budget
// (thousands of euros); the marker is the budget expected by now (75 %)
const DEPARTMENTS: [key: string, spent: number, budget: number][] = [
  ["marketing", 1380, 1600],
  ["engineering", 3920, 5400],
  ["sales", 1010, 1500],
  ["people", 560, 680],
  ["facilities", 702, 900],
  ["travel", 205, 320],
];
const ELAPSED = 0.75;

export default function BudgetTrackerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const signed = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const format = (value: number) => money.format(value * 1000);

  // ranges: comfortable up to 90 % of the plan, then tight, then over plan;
  // departments spending faster than planned get a red bar
  const data = useMemo(
    (): BulletDatum[] =>
      DEPARTMENTS.map(([key, spent, budget]) => {
        const plan = budget * ELAPSED;
        return {
          name: t(\`budget.departments.\${key}\`),
          subtitle: t("budget.yearly", {
            budget: money.format(budget * 1000),
          }),
          value: spent,
          target: plan,
          ranges: [plan * 0.9, plan, plan * 1.25],
          color: spent > plan ? "var(--danger-color)" : "var(--success-color)",
        };
      }),
    [money, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("budget.ranges.comfortable"),
      t("budget.ranges.tight"),
      t("budget.ranges.over"),
    ],
    [t],
  );
  const over = DEPARTMENTS.filter(
    ([, spent, budget]) => spent > budget * ELAPSED,
  ).length;

  const detail = () => {
    if (selected === null) return t("budget.hint", { over });
    const [, spent, budget] = DEPARTMENTS[selected];
    const plan = budget * ELAPSED;
    return t(spent > plan ? "budget.overPlan" : "budget.underPlan", {
      department: data[selected].name,
      variance: signed.format((spent - plan) * 1000),
      share: percent.format(spent / budget),
      left: money.format(Math.max(0, budget - spent) * 1000),
    });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        format={format}
        onClick={(event) => setSelected(event.index)}
        height={360}
        ariaLabel={t("budget.aria")}
      />
      <output aria-live="polite">{detail()}</output>
    </div>
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Order = "plan" | "behind" | "ahead";

// Hires made so far this year by each team, against the yearly headcount
// plan; the marker is where the team should be by October (75 %)
const TEAMS: [key: string, hired: number, plan: number][] = [
  ["engineering", 31, 48],
  ["sales", 19, 22],
  ["support", 14, 16],
  ["marketing", 4, 9],
  ["product", 7, 8],
  ["finance", 2, 4],
];
const ON_TRACK = 0.75;
const ORDERS: Order[] = ["plan", "behind", "ahead"];
const pace = ([, hired, plan]: (typeof TEAMS)[number]) =>
  hired / (plan * ON_TRACK);

export default function HiringPlanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [order, setOrder] = useState<Order>("plan");
  // hidden teams are kept by key: the row indexes change with the order
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

  const rows = useMemo(() => {
    if (order === "plan") return TEAMS;
    const sign = order === "behind" ? 1 : -1;
    return [...TEAMS].sort((a, b) => sign * (pace(a) - pace(b)));
  }, [order]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const data = useMemo(
    (): BulletDatum[] =>
      rows.map(([key, hired, plan]) => ({
        name: t(\`hiring.teams.\${key}\`),
        subtitle: t("hiring.planned", { plan: number.format(plan) }),
        value: hired,
        target: plan * ON_TRACK,
        ranges: [plan * 0.5, plan * ON_TRACK, plan],
        max: plan,
      })),
    [number, rows, t],
  );
  const hidden = rows
    .map(([key], index) => (hiddenKeys.includes(key) ? index : -1))
    .filter((index) => index >= 0);
  const rangeLabels = useMemo(
    () => [
      t("hiring.ranges.behind"),
      t("hiring.ranges.catchingUp"),
      t("hiring.ranges.onTrack"),
    ],
    [t],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  const visible = TEAMS.filter(([key]) => !hiddenKeys.includes(key));
  const hired = visible.reduce((sum, [, value]) => sum + value, 0);
  const planned = visible.reduce((sum, [, , value]) => sum + value, 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("hiring.order")}
        value={order}
        onChange={(value) => setOrder(value as Order)}
      >
        {ORDERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(\`hiring.orders.\${key}\`)}
          </SelectItem>
        ))}
      </Select>
      <BulletChart
        data={data}
        legend
        hidden={hidden}
        onToggle={(event) =>
          setHiddenKeys(event.hiddenIndexes.map((index) => rows[index][0]))
        }
        rangeLabels={rangeLabels}
        format={(value) => number.format(value)}
        height={380}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {visible.length
          ? t("hiring.summary", {
              hired: number.format(hired),
              planned: number.format(planned),
              share: percent.format(hired / planned),
              teams: number.format(visible.length),
            })
          : t("hiring.none")}
      </output>
    </div>
  );
}
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

/** Small seeded random generator: the same readings on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sensors of a server room: the setpoint (target), the warning and critical
// thresholds, and how much a reading can move per tick
const SENSORS: {
  key: string;
  setpoint: number;
  warning: number;
  critical: number;
  max: number;
  step: number;
}[] = [
  { key: "inlet", setpoint: 22, warning: 27, critical: 32, max: 40, step: 1.6 },
  {
    key: "humidity",
    setpoint: 45,
    warning: 60,
    critical: 70,
    max: 100,
    step: 4,
  },
  { key: "power", setpoint: 6, warning: 8, critical: 9.5, max: 12, step: 0.7 },
  { key: "fans", setpoint: 50, warning: 80, critical: 95, max: 100, step: 7 },
];
const SEED = 11;
const START = [24.5, 52, 7.1, 62];
const STATUS_COLORS = {
  ok: "var(--success-color)",
  warning: "#f59e0b",
  critical: "var(--danger-color)",
};

type Status = keyof typeof STATUS_COLORS;
const statusOf = (value: number, sensor: (typeof SENSORS)[number]): Status =>
  value >= sensor.critical
    ? "critical"
    : value >= sensor.warning
      ? "warning"
      : "ok";

export default function LiveSensorsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [readings, setReadings] = useState(START);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // a random walk with a slight upward drift, pulled back to the setpoint
      const moves = SENSORS.map(
        (sensor) => (random.current() - 0.42) * 2 * sensor.step,
      );
      setReadings((current) =>
        current.map((value, i) => {
          const sensor = SENSORS[i];
          const next = value + moves[i] + (sensor.setpoint - value) * 0.08;
          return Math.min(sensor.max, Math.max(0, next));
        }),
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [live]);

  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const statuses = readings.map((value, i) => statusOf(value, SENSORS[i]));
  const data = useMemo(
    (): BulletDatum[] =>
      SENSORS.map((sensor, i) => ({
        name: t(\`sensors.names.\${sensor.key}\`),
        subtitle: t(\`sensors.units.\${sensor.key}\`),
        value: readings[i],
        target: sensor.setpoint,
        ranges: [sensor.warning, sensor.critical, sensor.max],
        max: sensor.max,
        color: STATUS_COLORS[statusOf(readings[i], sensor)],
      })),
    [readings, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("sensors.status.ok"),
      t("sensors.status.warning"),
      t("sensors.status.critical"),
    ],
    [t],
  );
  const alerts = SENSORS.filter((_, i) => statuses[i] !== "ok").map((sensor) =>
    t(\`sensors.names.\${sensor.key}\`),
  );
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("sensors.live")} />
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        animation={false}
        format={(value) => number.format(value)}
        height={300}
        ariaLabel={t("sensors.aria")}
      />
      {/* only the set of sensors out of range is announced */}
      <output aria-live="polite">
        {alerts.length
          ? t("sensors.alerts", { sensors: list.format(alerts) })
          : t("sensors.allOk")}
      </output>
    </div>
  );
}
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useMemo } from "react";
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
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useMemo, useState } from "react";
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
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useMemo } from "react";
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
`})))()}var $;function He(){return(He=e((()=>{$=`import { useMemo } from "react";
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
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Runner = "amara" | "lucas" | "mei";
type Metric = "distance" | "longRun" | "elevation" | "sessions" | "sleep";

// Weekly training of three marathon runners against their coach's plan
const METRICS: Metric[] = [
  "distance",
  "longRun",
  "elevation",
  "sessions",
  "sleep",
];
// unit of each metric, formatted with Intl.NumberFormat (null: a plain count)
const UNITS: Record<Metric, string | null> = {
  distance: "kilometer",
  longRun: "kilometer",
  elevation: "meter",
  sessions: null,
  sleep: "hour",
};
const PLANS: Record<Runner, Record<Metric, number>> = {
  amara: { distance: 85, longRun: 30, elevation: 900, sessions: 6, sleep: 56 },
  lucas: { distance: 60, longRun: 24, elevation: 500, sessions: 5, sleep: 52 },
  mei: { distance: 72, longRun: 28, elevation: 1200, sessions: 6, sleep: 56 },
};
const WEEKS: Record<Runner, Record<Metric, number>> = {
  amara: { distance: 88, longRun: 31, elevation: 760, sessions: 6, sleep: 49 },
  lucas: { distance: 47, longRun: 18, elevation: 540, sessions: 4, sleep: 54 },
  mei: { distance: 74, longRun: 26, elevation: 1310, sessions: 5, sleep: 58 },
};
const RUNNERS = Object.keys(PLANS) as Runner[];

export default function TrainingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [runner, setRunner] = useState<Runner>("amara");

  const formats = useMemo(
    () =>
      Object.fromEntries(
        METRICS.map((metric) => {
          const unit = UNITS[metric];
          return [
            metric,
            new Intl.NumberFormat(
              locale,
              unit ? { style: "unit", unit, unitDisplay: "short" } : {},
            ),
          ];
        }),
      ) as Record<Metric, Intl.NumberFormat>,
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  // every row is scaled on its own plan: below 80 %, 80-100 %, above
  const data = useMemo(
    (): BulletDatum[] =>
      METRICS.map((metric) => {
        const plan = PLANS[runner][metric];
        return {
          name: t(\`training.metrics.\${metric}\`),
          subtitle: t("training.plan", {
            plan: formats[metric].format(plan),
          }),
          value: WEEKS[runner][metric],
          target: plan,
          ranges: [plan * 0.8, plan, plan * 1.25],
        };
      }),
    [formats, runner, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("training.ranges.under"),
      t("training.ranges.onPlan"),
      t("training.ranges.above"),
    ],
    [t],
  );
  const met = METRICS.filter(
    (metric) => WEEKS[runner][metric] >= PLANS[runner][metric],
  ).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("training.runner")}
        value={runner}
        onChange={(value) => setRunner(value as Runner)}
      >
        {RUNNERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(\`training.runners.\${key}\`)}
          </SelectItem>
        ))}
      </Select>
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        ticks={false}
        renderTooltip={(row) => {
          const metric = METRICS[row.index];
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{row.name}</strong>
              <span>
                {t("training.tooltip", {
                  value: formats[metric].format(row.value),
                  plan: formats[metric].format(PLANS[runner][metric]),
                  share: percent.format(row.percent),
                })}
              </span>
            </div>
          );
        }}
        height={320}
        ariaLabel={t("training.aria", {
          runner: t(\`training.runners.\${runner}\`),
        })}
      />
      <output aria-live="polite">
        {t("training.summary", {
          runner: t(\`training.runners.\${runner}\`),
          met,
          metrics: METRICS.length,
        })}
      </output>
    </div>
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useMemo } from "react";
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
`})))()}var qe,Je,Ye;function Xe(){return(Xe=e((()=>{te(),ie(),ue(),F(),H(),he(),xe(),Te(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),He(),We(),Ke(),t(),h(),_(),qe=n(),Je=m(Object.assign({"./demos/budget-tracker.tsx":ee,"./demos/hiring-plan.tsx":ne,"./demos/live-sensors.tsx":oe,"./demos/long-names.tsx":de,"./demos/monthly.tsx":pe,"./demos/sales.tsx":me,"./demos/traffic-lights.tsx":ge,"./demos/training.tsx":Se,"./demos/vertical.tsx":Ee}),Object.assign({"./demos/budget-tracker.tsx":Ae,"./demos/hiring-plan.tsx":Me,"./demos/live-sensors.tsx":Pe,"./demos/long-names.tsx":Ie,"./demos/monthly.tsx":Re,"./demos/sales.tsx":Be,"./demos/traffic-lights.tsx":$,"./demos/training.tsx":Ue,"./demos/vertical.tsx":Ge})),Ye=()=>(0,qe.jsx)(g,{id:`bullet-chart`,demos:Je})})))()}Xe();export{Ye as default};