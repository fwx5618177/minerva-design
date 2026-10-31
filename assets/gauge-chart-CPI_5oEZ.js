import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Tag-D6SUzaZT.js";import{n as p,t as ee}from"./Switch-CHbzff3y.js";import{i as m,r as h}from"./Stack-B3Kr9X_e.js";import{i as te,o as ne,t as re}from"./Select-CRoh0AwC.js";import{l as ie,n as ae,t as oe,u as se}from"./DocPage-BdPOW9nQ.js";import{c as g,o as _}from"./shapes-B5QcpBlT.js";function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=new Intl.NumberFormat(t.language,{maximumFractionDigits:0,signDisplay:`exceptZero`}),i=e=>n.format(e);return(0,v.jsx)(_,{value:42,min:-100,max:100,bands:le,needle:!0,label:e(`nps`),format:i,renderTooltip:t=>(0,v.jsxs)(`span`,{children:[e(`nps`),` · `,i(t.value)]}),height:280,ariaLabel:e(`nps`)})}var v,le;function ue(){return(ue=e((()=>{i(),g(),v=n(),le=[{to:0,color:`var(--danger-color)`},{to:30,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}]})))()}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=new Intl.NumberFormat(t.language,{style:`percent`}),i=e=>n.format(e/100);return(0,y.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(180px, 1fr))`,gap:16,width:`100%`},children:fe.map(t=>(0,y.jsx)(_,{value:t.value,label:e(`metrics.${t.key}`),color:t.color,format:i,renderTooltip:n=>(0,y.jsxs)(`span`,{children:[e(`metrics.${t.key}`),` · `,i(n.value)]}),height:200,ariaLabel:e(`usageAria`,{metric:e(`metrics.${t.key}`)})},t.key))})}var y,fe;function pe(){return(pe=e((()=>{i(),g(),y=n(),fe=[{key:`cpu`,value:68,color:`var(--primary-color)`},{key:`memory`,value:82,color:`var(--warning-color)`},{key:`disk`,value:41,color:`var(--success-color)`}]})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=t.language,[i,a]=(0,b.useState)(S),[s,c]=(0,b.useState)(!0),l=s&&i<100;(0,b.useEffect)(()=>{if(!l)return;let e=window.setInterval(()=>{a(e=>Math.min(100,e+(e<80?C:he)))},400);return()=>window.clearInterval(e)},[l]);let u=(0,b.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),t=new Intl.NumberFormat(n,{style:`unit`,unit:`kilometer`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,unitDisplay:`long`,maximumFractionDigits:0});return{percent:t=>e.format(t/100),km:e=>t.format(e),minutes:e=>r.format(e)}},[n]),d=Math.floor(i),f=d>=100?`full`:s?d<80?`charging`:`topping`:`unplugged`;return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsx)(_,{value:i,bands:ge,sweep:180,thickness:.22,label:e(`battery.label`),format:u.percent,renderTooltip:()=>(0,x.jsx)(`span`,{children:e(`battery.range`,{range:u.km(i/100*w)})}),height:240,ariaLabel:e(`battery.aria`)}),(0,x.jsxs)(m,{gap:12,wrap:!0,align:`center`,justify:`center`,children:[(0,x.jsx)(ee,{checked:s,onChange:c,label:e(`battery.plugged`)}),(0,x.jsx)(o,{size:`small`,variant:`ghost`,onClick:()=>a(S),children:e(`battery.reset`)})]}),(0,x.jsxs)(`p`,{style:{margin:0,textAlign:`center`},children:[(0,x.jsx)(`output`,{"aria-live":`polite`,children:e(`battery.phases.${f}`)}),` · `,e(`battery.range`,{range:u.km(d/100*w)}),f===`charging`&&` · ${e(`battery.toEighty`,{minutes:u.minutes(Math.ceil((80-i)/C))})}`]})]})}var b,x,S,C,he,w,ge;function _e(){return(_e=e((()=>{b=t(),i(),a(),h(),p(),g(),x=n(),S=18,C=.8,he=.3,w=420,ge=[{to:20,color:`var(--danger-color)`},{to:50,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}]})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),[n,i]=(0,T.useState)(0),a=(0,T.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{useGrouping:!1});return t=>e.format(Math.round(t))},[t.language]),[o,s]=k[n],c=A(s),l=new Intl.NumberFormat(t.language,{style:`percent`});return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,E.jsx)(ne,{size:`small`,style:{width:200},"aria-label":e(`credit.applicant`),value:String(n),onChange:e=>i(Number(e)),children:k.map(([e],t)=>(0,E.jsx)(re,{value:String(t),children:e},e))}),(0,E.jsx)(_,{value:s,min:ye,max:D,bands:be,needle:!0,thickness:.2,label:e(`credit.score`),format:a,renderTooltip:t=>(0,E.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,E.jsx)(`strong`,{children:e(`credit.ratings.${A(t.value).key}`)}),(0,E.jsx)(`span`,{children:e(`credit.position`,{share:l.format(t.percent)})})]}),height:260,ariaLabel:e(`credit.aria`,{name:o})}),(0,E.jsxs)(m,{gap:8,align:`center`,justify:`center`,wrap:!0,children:[(0,E.jsx)(f,{color:c.tag,variant:`subtle`,children:e(`credit.ratings.${c.key}`)}),(0,E.jsx)(`output`,{"aria-live":`polite`,children:e(`credit.result`,{name:o,score:a(s),advice:e(`credit.advice.${c.key}`)})})]})]})}var T,E,ye,D,O,be,k,A;function xe(){return(xe=e((()=>{T=t(),i(),h(),te(),d(),g(),E=n(),ye=300,D=850,O=[{key:`poor`,to:580,color:`var(--danger-color)`,tag:`danger`},{key:`fair`,to:670,color:`var(--warning-color)`,tag:`warning`},{key:`good`,to:740,color:`#84cc16`,tag:`info`},{key:`veryGood`,to:800,color:`var(--success-color)`,tag:`success`},{key:`exceptional`,to:D,color:`#0d9488`,tag:`primary`}],be=O.map(({to:e,color:t})=>({to:e,color:t})),k=[[`Nora Lind`,812],[`Theo Martin`,724],[`Ada Okoye`,651],[`Ravi Patel`,548]],A=e=>O.find(t=>e<t.to)??O[O.length-1]})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=t.language,[i,a]=(0,j.useState)(!0),o=(0,j.useRef)([]);(0,j.useEffect)(()=>{o.current.forEach(e=>e?.getInstance()?.refreshTheme())},[i]);let s=(0,j.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1}),r=new Intl.NumberFormat(n,{style:`unit`,unit:`celsius`,maximumFractionDigits:0});return{rotor:n=>e(`turbine.rpm`,{value:t.format(n)}),power:n=>e(`turbine.mw`,{value:t.format(n)}),nacelle:e=>r.format(e)}},[n,e]);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsx)(ee,{checked:i,onChange:a,label:e(`turbine.dark`)}),(0,M.jsx)(`div`,{style:i?{...N,...Ce}:N,children:we.map((t,n)=>(0,M.jsx)(_,{ref:e=>{o.current[n]=e},value:t.value,max:t.max,bands:t.bands,thickness:.1,needle:!0,label:e(`turbine.${t.key}`),format:s[t.key],renderTooltip:n=>(0,M.jsxs)(`span`,{children:[e(`turbine.${t.key}`),` · `,s[t.key](n.value)]}),height:200,ariaLabel:e(`turbine.aria`,{reading:e(`turbine.${t.key}`),value:s[t.key](t.value)})},t.key))})]})}var j,M,Ce,N,we;function Te(){return(Te=e((()=>{j=t(),i(),p(),g(),M=n(),Ce={"--background-color":`#0b1020`,"--surface-color":`#0b1020`,"--text-color":`#e2e8f0`,"--text-secondary-color":`#8a94ad`,"--border-color":`#1f2a44`,background:`#0b1020`,color:`#e2e8f0`},N={display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(170px, 1fr))`,gap:16,padding:12,borderRadius:12,border:`1px solid var(--border-color)`,width:`100%`,boxSizing:`border-box`},we=[{key:`rotor`,value:14.2,max:20,bands:[{to:16,color:`#22d3ee`},{to:20,color:`#f472b6`}]},{key:`power`,value:3.1,max:4.2,bands:[{to:4.2,color:`#34d399`}]},{key:`nacelle`,value:58,max:90,bands:[{to:60,color:`#34d399`},{to:75,color:`#facc15`},{to:90,color:`#fb7185`}]}]})))()}function Ee(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function De(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),[n,i]=(0,P.useState)(640),[a,s]=(0,P.useState)(!0),c=(0,P.useRef)(Ee(42));(0,P.useEffect)(()=>{if(!a)return;let e=window.setInterval(()=>{i(e=>{let t=(c.current()-.5)*360+(650-e)*.2;return Math.min(I,Math.max(0,e+t))})},1500);return()=>window.clearInterval(e)},[a]);let l=new Intl.NumberFormat(t.language,{maximumFractionDigits:0}),u=e=>l.format(e);return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(_,{value:n,max:I,bands:Oe,sweep:180,thickness:.22,needle:!0,label:e(`requestsPerSecond`),format:u,renderTooltip:t=>(0,F.jsxs)(`span`,{children:[e(`requestsPerSecond`),` · `,u(t.value)]}),height:260,ariaLabel:e(`liveAria`)}),(0,F.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`},children:(0,F.jsx)(o,{variant:`outline`,size:`small`,onClick:()=>s(e=>!e),children:e(a?`pause`:`resume`)})})]})}var P,F,I,Oe;function ke(){return(ke=e((()=>{P=t(),i(),a(),g(),F=n(),I=1200,Oe=[{to:800,color:`var(--primary-color)`},{to:1e3,color:`var(--warning-color)`},{to:I,color:`var(--danger-color)`}]})))()}function Ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=t.language,i=new Intl.NumberFormat(n,{style:`percent`});return(0,L.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(170px, 1fr))`,gap:16,width:`100%`},children:je.map(t=>{let r=t.unit?new Intl.NumberFormat(n,{style:`unit`,unit:t.unit,notation:`compact`}):new Intl.NumberFormat(n,{notation:`compact`}),a=e(`quotas.${t.key}`);return(0,L.jsxs)(`figure`,{style:{margin:0,textAlign:`center`},children:[(0,L.jsx)(_,{value:t.used,max:t.limit,bands:Me(t.limit),label:a,format:e=>i.format(e/t.limit),ticks:!1,renderTooltip:()=>(0,L.jsx)(`span`,{children:e(`quotaUsed`,{used:r.format(t.used),limit:r.format(t.limit)})}),height:180,ariaLabel:e(`quotaAria`,{quota:a,share:i.format(t.used/t.limit)})}),(0,L.jsx)(`figcaption`,{style:{fontSize:12,color:`var(--text-secondary-color)`},children:e(`quotaUsed`,{used:r.format(t.used),limit:r.format(t.limit)})})]},t.key)})})}var L,je,Me;function Ne(){return(Ne=e((()=>{i(),g(),L=n(),je=[{key:`storage`,used:412,limit:500,unit:`gigabyte`},{key:`apiCalls`,used:184e4,limit:5e6},{key:`seats`,used:48,limit:50},{key:`minutes`,used:2310,limit:3e3,unit:`minute`}],Me=e=>[{to:e*.75,color:`var(--success-color)`},{to:e*.9,color:`var(--warning-color)`},{to:e,color:`var(--danger-color)`}]})))()}function Pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),n=t.language,i=new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:2}),a=new Intl.NumberFormat(n,{style:`unit`,unit:`minute`,maximumFractionDigits:0}),o=new Intl.NumberFormat(n,{style:`percent`}),s=1-U/H;return(0,R.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(220px, 1fr))`,gap:16,width:`100%`},children:[(0,R.jsx)(_,{value:B,min:99.5,max:100,bands:Fe,needle:!0,ticks:!1,label:e(`availability`),format:e=>i.format(e/100),renderTooltip:()=>(0,R.jsx)(`span`,{children:e(`objective`,{value:i.format(z/100)})}),height:240,ariaLabel:e(`availabilityAria`)}),(0,R.jsx)(_,{value:s*100,bands:[{to:25,color:`var(--danger-color)`},{to:50,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}],label:e(`budgetLeft`),format:e=>o.format(e/100),renderTooltip:()=>(0,R.jsx)(`span`,{children:e(`budgetDetail`,{used:a.format(U),budget:a.format(H)})}),height:240,ariaLabel:e(`budgetAria`)})]})}var R,z,B,V,H,U,Fe;function Ie(){return(Ie=e((()=>{i(),g(),R=n(),z=99.9,B=99.94,V=43200,H=V*(1-z/100),U=V*(1-B/100),Fe=[{to:z,color:`var(--danger-color)`},{to:99.95,color:`var(--warning-color)`},{to:100,color:`var(--success-color)`}]})))()}function Le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),[n,i]=(0,W.useState)(0),[a,s]=(0,W.useState)(null);(0,W.useEffect)(()=>{if(!a)return;let e=window.setInterval(()=>{i(e=>a===`accelerate`?Math.min(K,e+Math.max(1,(K-e)/40)):Math.max(0,e-6))},50);return()=>window.clearInterval(e)},[a]);let c=new Intl.NumberFormat(t.language,{style:`unit`,unit:`kilometer-per-hour`,maximumFractionDigits:0}),l=e=>({onPointerDown:()=>s(e),onPointerUp:()=>s(null),onPointerLeave:()=>s(null),onKeyDown:t=>{(t.key===` `||t.key===`Enter`)&&s(e)},onKeyUp:()=>s(null)});return(0,G.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,G.jsx)(_,{value:n,max:K,bands:Re,thickness:.1,needle:!0,label:e(`speed`),format:e=>c.format(e),animation:!1,tooltip:!1,height:300,ariaLabel:e(`speedAria`,{speed:c.format(n)})}),(0,G.jsxs)(`div`,{style:{display:`flex`,gap:8,justifyContent:`center`},children:[(0,G.jsx)(o,{variant:`outline`,...l(`brake`),children:e(`brake`)}),(0,G.jsx)(o,{...l(`accelerate`),children:e(`accelerate`)})]})]})}var W,G,K,Re;function ze(){return(ze=e((()=>{W=t(),i(),a(),g(),G=n(),K=240,Re=[{to:130,color:`var(--primary-color)`},{to:180,color:`var(--warning-color)`},{to:K,color:`var(--danger-color)`}]})))()}function Be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gauge-chart.data`}),[n,i]=(0,q.useState)(21),[a,c]=(0,q.useState)(`celsius`),l=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{style:`unit`,unit:a,maximumFractionDigits:1});return t=>e.format(t)},[t.language,a]),d=(0,q.useMemo)(()=>Ue.map(e=>({...e,to:Q(e.to,a)})),[a]),f=n>19.75?`heating`:n<19.25?`cooling`:`holding`,p=e=>i(t=>Math.min(X,Math.max(Y,t+e)));return(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,J.jsx)(s,{"aria-label":e(`thermostat.unit`),direction:`horizontal`,value:a,onChange:e=>c(e),children:Ve.map(t=>(0,J.jsx)(u,{value:t,label:e(`thermostat.units.${t}`)},t))}),(0,J.jsx)(_,{value:Q(n,a),min:Q(Y,a),max:Q(X,a),bands:d,sweep:270,thickness:.12,label:e(`thermostat.target`),format:l,renderTooltip:()=>(0,J.jsx)(`span`,{children:e(`thermostat.room`,{value:l(Q(Z,a))})}),height:260,ariaLabel:e(`thermostat.aria`)}),(0,J.jsxs)(m,{gap:8,justify:`center`,align:`center`,children:[(0,J.jsx)(o,{variant:`outline`,shape:`circle`,"aria-label":e(`thermostat.lower`),disabled:n<=Y,onClick:()=>p(-.5),children:`−`}),(0,J.jsx)(`output`,{"aria-live":`polite`,style:{minWidth:220,textAlign:`center`},children:e(`thermostat.modes.${f}`,{room:l(Q(Z,a)),target:l(Q(n,a))})}),(0,J.jsx)(o,{variant:`outline`,shape:`circle`,"aria-label":e(`thermostat.raise`),disabled:n>=X,onClick:()=>p(He),children:`+`})]})]})}var q,J,Ve,Y,X,He,Z,Ue,Q;function We(){return(We=e((()=>{q=t(),i(),a(),h(),c(),l(),g(),J=n(),Ve=[`celsius`,`fahrenheit`],Y=10,X=30,He=.5,Z=19.5,Ue=[{to:18,color:`#3b82f6`},{to:23,color:`var(--success-color)`},{to:X,color:`#f97316`}],Q=(e,t)=>t===`celsius`?e:e*9/5+32})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useTranslation } from "react-i18next";
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
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useTranslation } from "react-i18next";
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
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Switch } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Electric car charging session: one tick is one simulated minute; the
// charger slows down above 80% to protect the battery
const START = 18;
const FAST = 0.8; // % per minute below 80%
const SLOW = 0.3; // % per minute above 80%
const RANGE = 420; // km on a full battery
const bands: GaugeBand[] = [
  { to: 20, color: "var(--danger-color)" },
  { to: 50, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function BatteryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const [charge, setCharge] = useState(START);
  const [plugged, setPlugged] = useState(true);
  const charging = plugged && charge < 100;

  useEffect(() => {
    if (!charging) return;
    const timer = window.setInterval(() => {
      setCharge((current) =>
        Math.min(100, current + (current < 80 ? FAST : SLOW)),
      );
    }, 400);
    return () => window.clearInterval(timer);
  }, [charging]);

  const formats = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const km = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "kilometer",
      maximumFractionDigits: 0,
    });
    const minutes = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
      maximumFractionDigits: 0,
    });
    return {
      percent: (value: number) => percent.format(value / 100),
      km: (value: number) => km.format(value),
      minutes: (value: number) => minutes.format(value),
    };
  }, [locale]);

  const level = Math.floor(charge);
  const phase =
    level >= 100
      ? "full"
      : !plugged
        ? "unplugged"
        : level < 80
          ? "charging"
          : "topping";

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={charge}
        bands={bands}
        sweep={180}
        thickness={0.22}
        label={t("battery.label")}
        format={formats.percent}
        renderTooltip={() => (
          <span>
            {t("battery.range", { range: formats.km((charge / 100) * RANGE) })}
          </span>
        )}
        height={240}
        ariaLabel={t("battery.aria")}
      />
      <HStack gap={12} wrap align="center" justify="center">
        <Switch
          checked={plugged}
          onChange={setPlugged}
          label={t("battery.plugged")}
        />
        <Button size="small" variant="ghost" onClick={() => setCharge(START)}>
          {t("battery.reset")}
        </Button>
      </HStack>
      <p style={{ margin: 0, textAlign: "center" }}>
        {/* only the phase is announced, not every simulated minute */}
        <output aria-live="polite">{t(\`battery.phases.\${phase}\`)}</output>
        {" · "}
        {t("battery.range", { range: formats.km((level / 100) * RANGE) })}
        {phase === "charging" &&
          \` · \${t("battery.toEighty", {
            minutes: formats.minutes(Math.ceil((80 - charge) / FAST)),
          })}\`}
      </p>
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem, Tag } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

type Rating = "poor" | "fair" | "good" | "veryGood" | "exceptional";

// Credit scores range from 300 to 850; five rating bands
const MIN = 300;
const MAX = 850;
const RATINGS: {
  key: Rating;
  to: number;
  color: string;
  tag: "danger" | "warning" | "info" | "success" | "primary";
}[] = [
  { key: "poor", to: 580, color: "var(--danger-color)", tag: "danger" },
  { key: "fair", to: 670, color: "var(--warning-color)", tag: "warning" },
  { key: "good", to: 740, color: "#84cc16", tag: "info" },
  { key: "veryGood", to: 800, color: "var(--success-color)", tag: "success" },
  { key: "exceptional", to: MAX, color: "#0d9488", tag: "primary" },
];
const BANDS: GaugeBand[] = RATINGS.map(({ to, color }) => ({ to, color }));
const APPLICANTS: [name: string, score: number][] = [
  ["Nora Lind", 812],
  ["Theo Martin", 724],
  ["Ada Okoye", 651],
  ["Ravi Patel", 548],
];

const ratingOf = (score: number) =>
  RATINGS.find((rating) => score < rating.to) ?? RATINGS[RATINGS.length - 1];

export default function CreditScoreDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [applicant, setApplicant] = useState(0);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, { useGrouping: false });
    return (value: number) => number.format(Math.round(value));
  }, [i18n.language]);

  const [name, score] = APPLICANTS[applicant];
  const rating = ratingOf(score);
  // event.percent: position of the score within the 300-850 range
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("credit.applicant")}
        value={String(applicant)}
        onChange={(value) => setApplicant(Number(value))}
      >
        {APPLICANTS.map(([applicantName], i) => (
          <SelectItem key={applicantName} value={String(i)}>
            {applicantName}
          </SelectItem>
        ))}
      </Select>
      <GaugeChart
        value={score}
        min={MIN}
        max={MAX}
        bands={BANDS}
        needle
        thickness={0.2}
        label={t("credit.score")}
        format={format}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{t(\`credit.ratings.\${ratingOf(event.value).key}\`)}</strong>
            <span>
              {t("credit.position", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={260}
        ariaLabel={t("credit.aria", { name })}
      />
      <HStack gap={8} align="center" justify="center" wrap>
        <Tag color={rating.tag} variant="subtle">
          {t(\`credit.ratings.\${rating.key}\`)}
        </Tag>
        <output aria-live="polite">
          {t("credit.result", {
            name,
            score: format(score),
            advice: t(\`credit.advice.\${rating.key}\`),
          })}
        </output>
      </HStack>
    </div>
  );
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GaugeChart,
  type GaugeBand,
  type ShapeChartHandle,
} from "minerva-design/charts";

// a dark control-room theme, read by the charts from these variables
const DARK = {
  "--background-color": "#0b1020",
  "--surface-color": "#0b1020",
  "--text-color": "#e2e8f0",
  "--text-secondary-color": "#8a94ad",
  "--border-color": "#1f2a44",
  background: "#0b1020",
  color: "#e2e8f0",
} as CSSProperties;
const PANEL: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 16,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--border-color)",
  width: "100%",
  boxSizing: "border-box",
};

// Live readings of a wind turbine
const GAUGES: {
  key: "rotor" | "power" | "nacelle";
  value: number;
  max: number;
  bands: GaugeBand[];
}[] = [
  {
    key: "rotor",
    value: 14.2,
    max: 20,
    bands: [
      { to: 16, color: "#22d3ee" },
      { to: 20, color: "#f472b6" },
    ],
  },
  {
    key: "power",
    value: 3.1,
    max: 4.2,
    bands: [{ to: 4.2, color: "#34d399" }],
  },
  {
    key: "nacelle",
    value: 58,
    max: 90,
    bands: [
      { to: 60, color: "#34d399" },
      { to: 75, color: "#facc15" },
      { to: 90, color: "#fb7185" },
    ],
  },
];

export default function DarkPanelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const [dark, setDark] = useState(true);
  const charts = useRef<(ShapeChartHandle | null)[]>([]);

  // the charts watch <html> and <body> only: after restyling their
  // container, ask them to read the CSS variables again
  useEffect(() => {
    charts.current.forEach((chart) => chart?.getInstance()?.refreshTheme());
  }, [dark]);

  const formats = useMemo(() => {
    const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const celsius = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 0,
    });
    return {
      rotor: (value: number) =>
        t("turbine.rpm", { value: decimal.format(value) }),
      power: (value: number) =>
        t("turbine.mw", { value: decimal.format(value) }),
      nacelle: (value: number) => celsius.format(value),
    };
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={dark} onChange={setDark} label={t("turbine.dark")} />
      <div style={dark ? { ...PANEL, ...DARK } : PANEL}>
        {GAUGES.map((gauge, i) => (
          <GaugeChart
            key={gauge.key}
            ref={(handle) => {
              charts.current[i] = handle;
            }}
            value={gauge.value}
            max={gauge.max}
            bands={gauge.bands}
            thickness={0.1}
            needle
            label={t(\`turbine.\${gauge.key}\`)}
            format={formats[gauge.key]}
            renderTooltip={(event) => (
              <span>
                {t(\`turbine.\${gauge.key}\`)} · {formats[gauge.key](event.value)}
              </span>
            )}
            height={200}
            ariaLabel={t("turbine.aria", {
              reading: t(\`turbine.\${gauge.key}\`),
              value: formats[gauge.key](gauge.value),
            })}
          />
        ))}
      </div>
    </div>
  );
}
`})))()}var tt;function $(){return($=e((()=>{tt=`import { useEffect, useRef, useState } from "react";
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
`})))()}var nt;function rt(){return(rt=e((()=>{nt=`import { useTranslation } from "react-i18next";
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
`})))()}var it;function at(){return(at=e((()=>{it=`import { useTranslation } from "react-i18next";
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
`})))()}var ot;function st(){return(st=e((()=>{ot=`import { useEffect, useState, type KeyboardEvent } from "react";
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
`})))()}var ct;function lt(){return(lt=e((()=>{ct=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Radio, RadioGroup } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

type Unit = "celsius" | "fahrenheit";
const UNITS: Unit[] = ["celsius", "fahrenheit"];

// Smart thermostat: the settings are stored in °C and shown in either unit
const MIN = 10;
const MAX = 30;
const STEP = 0.5;
const ROOM = 19.5;
const BANDS_C = [
  { to: 18, color: "#3b82f6" },
  { to: 23, color: "var(--success-color)" },
  { to: MAX, color: "#f97316" },
];

const convert = (celsius: number, unit: Unit) =>
  unit === "celsius" ? celsius : (celsius * 9) / 5 + 32;

export default function ThermostatDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [target, setTarget] = useState(21);
  const [unit, setUnit] = useState<Unit>("celsius");

  // "21 °C", "69.8 °F"... in the reader's conventions
  const format = useMemo(() => {
    const temperature = new Intl.NumberFormat(i18n.language, {
      style: "unit",
      unit,
      maximumFractionDigits: 1,
    });
    return (value: number) => temperature.format(value);
  }, [i18n.language, unit]);
  const bands = useMemo(
    (): GaugeBand[] =>
      BANDS_C.map((band) => ({ ...band, to: convert(band.to, unit) })),
    [unit],
  );

  const mode =
    target > ROOM + 0.25
      ? "heating"
      : target < ROOM - 0.25
        ? "cooling"
        : "holding";
  const change = (delta: number) =>
    setTarget((current) => Math.min(MAX, Math.max(MIN, current + delta)));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("thermostat.unit")}
        direction="horizontal"
        value={unit}
        onChange={(value) => setUnit(value as Unit)}
      >
        {UNITS.map((u) => (
          <Radio key={u} value={u} label={t(\`thermostat.units.\${u}\`)} />
        ))}
      </RadioGroup>
      <GaugeChart
        value={convert(target, unit)}
        min={convert(MIN, unit)}
        max={convert(MAX, unit)}
        bands={bands}
        sweep={270}
        thickness={0.12}
        label={t("thermostat.target")}
        format={format}
        renderTooltip={() => (
          <span>
            {t("thermostat.room", { value: format(convert(ROOM, unit)) })}
          </span>
        )}
        height={260}
        ariaLabel={t("thermostat.aria")}
      />
      <HStack gap={8} justify="center" align="center">
        <Button
          variant="outline"
          shape="circle"
          aria-label={t("thermostat.lower")}
          disabled={target <= MIN}
          onClick={() => change(-STEP)}
        >
          −
        </Button>
        <output
          aria-live="polite"
          style={{ minWidth: 220, textAlign: "center" }}
        >
          {t(\`thermostat.modes.\${mode}\`, {
            room: format(convert(ROOM, unit)),
            target: format(convert(target, unit)),
          })}
        </output>
        <Button
          variant="outline"
          shape="circle"
          aria-label={t("thermostat.raise")}
          disabled={target >= MAX}
          onClick={() => change(STEP)}
        >
          +
        </Button>
      </HStack>
    </div>
  );
}
`})))()}var ut,dt,ft;function pt(){return(pt=e((()=>{ue(),pe(),_e(),xe(),Te(),ke(),Ne(),Ie(),ze(),We(),Ke(),Je(),Xe(),Qe(),et(),$(),rt(),at(),st(),lt(),t(),ae(),se(),ut=n(),dt=ie(Object.assign({"./demos/bands.tsx":ce,"./demos/basic.tsx":de,"./demos/battery.tsx":me,"./demos/credit-score.tsx":ve,"./demos/dark-panel.tsx":Se,"./demos/live.tsx":De,"./demos/quota.tsx":Ae,"./demos/slo.tsx":Pe,"./demos/speedometer.tsx":Le,"./demos/thermostat.tsx":Be}),Object.assign({"./demos/bands.tsx":Ge,"./demos/basic.tsx":qe,"./demos/battery.tsx":Ye,"./demos/credit-score.tsx":Ze,"./demos/dark-panel.tsx":$e,"./demos/live.tsx":tt,"./demos/quota.tsx":nt,"./demos/slo.tsx":it,"./demos/speedometer.tsx":ot,"./demos/thermostat.tsx":ct})),ft=()=>(0,ut.jsx)(oe,{id:`gauge-chart`,demos:dt})})))()}pt();export{ft as default};