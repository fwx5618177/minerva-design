import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{i as d,r as f}from"./Stack-B3Kr9X_e.js";import{c as p,o as ee}from"./DemoBlock-Ev3eU-vB.js";import{i as m,o as te,t as h}from"./Select-CRoh0AwC.js";import{l as ne,n as re,t as ie,u as ae}from"./DocPage-BNEhhzRL.js";import{c as g,n as _}from"./shapes-B5QcpBlT.js";function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),[n,i]=(0,v.useState)(`descending`),a=(0,v.useMemo)(()=>ce.map(({key:t,value:n})=>({name:e(`features.${t}`),value:n})),[e]),o=new Intl.NumberFormat(t.language);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsx)(s,{"aria-label":e(`sortOrder`),direction:`horizontal`,value:n,onChange:e=>i(e),children:se.map(t=>(0,y.jsx)(u,{value:t,label:e(`sorts.${t}`)},t))}),(0,y.jsx)(_,{data:a,shape:`bar`,sort:n,conversion:!1,gap:6,legend:!1,format:e=>o.format(e),renderTooltip:t=>(0,y.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,y.jsx)(`strong`,{children:t.name}),(0,y.jsx)(`span`,{children:e(`weeklyUsers`,{users:o.format(t.value)})})]}),height:300,ariaLabel:e(`featuresAria`)})]})}var v,y,se,ce;function le(){return(le=e((()=>{v=t(),i(),c(),l(),g(),y=n(),se=[`descending`,`ascending`,`none`],ce=[{key:`alerts`,value:3900},{key:`dashboards`,value:8400},{key:`integrations`,value:1600},{key:`reports`,value:5200},{key:`api`,value:2100}]})))()}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,i=(0,b.useMemo)(()=>de.map(({key:t,value:n})=>({name:e(`signup.${t}`),value:n})),[e]),a=(0,b.useMemo)(()=>new Intl.NumberFormat(n),[n]),o=(0,b.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,x.jsx)(_,{data:i,format:e=>a.format(e),percentFormat:e=>o.format(e),renderTooltip:t=>{let n=t.index>0?i[t.index-1]:null;return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,x.jsx)(`strong`,{children:t.name}),(0,x.jsx)(`span`,{children:e(`users`,{users:a.format(t.value)})}),(0,x.jsx)(`span`,{children:e(`ofVisitors`,{share:o.format(t.percent)})}),n&&(0,x.jsx)(`span`,{children:e(`droppedSince`,{users:a.format(n.value-t.value),stage:n.name})})]})},height:360,ariaLabel:e(`signupAria`)})}var b,x,de;function fe(){return(fe=e((()=>{b=t(),i(),g(),x=n(),de=[{key:`pricing`,value:24e3},{key:`started`,value:9600},{key:`verified`,value:6850},{key:`project`,value:4100},{key:`invited`,value:1720},{key:`upgraded`,value:640}]})))()}function pe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,[i,a]=(0,S.useState)(`all`),{values:o,spend:s}=i===`all`?me:T[i],c=(0,S.useMemo)(()=>w.map((t,n)=>({name:e(`campaigns.stages.${t}`),value:o[n]})),[e,o]),l=(0,S.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`}),t=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:2}),r=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:2}),i=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0});return{number:t=>e.format(t),money:e=>t.format(e),budget:e=>i.format(e),percent:e=>r.format(e)}},[n]);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,C.jsxs)(te,{size:`small`,style:{width:200},"aria-label":e(`campaigns.channel`),value:i,onChange:e=>a(e),children:[(0,C.jsx)(h,{value:`all`,children:e(`campaigns.channels.all`)}),E.map(t=>(0,C.jsx)(h,{value:t,children:e(`campaigns.channels.${t}`)},t))]}),(0,C.jsx)(_,{data:c,legend:!1,format:l.number,percentFormat:l.percent,renderTooltip:t=>(0,C.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,C.jsx)(`strong`,{children:t.name}),(0,C.jsx)(`span`,{children:l.number(t.value)}),t.index>0&&(0,C.jsx)(`span`,{children:e(`campaigns.fromPrevious`,{share:l.percent(t.value/o[t.index-1])})}),(0,C.jsx)(`span`,{children:e(`campaigns.costPer`,{cost:l.money(s/t.value)})})]}),height:340,ariaLabel:e(`campaigns.aria`,{channel:e(`campaigns.channels.${i}`)})}),(0,C.jsx)(`output`,{"aria-live":`polite`,children:e(`campaigns.summary`,{spend:l.budget(s),customers:l.number(o[o.length-1]),cac:l.money(s/o[o.length-1])})})]})}var S,C,w,T,E,me;function he(){return(he=e((()=>{S=t(),i(),m(),g(),C=n(),w=[`impressions`,`clicks`,`leads`,`qualified`,`customers`],T={search:{values:[42e4,18900,2270,910,182],spend:48e3},social:{values:[125e4,21300,1490,450,63],spend:36e3},email:{values:[86e3,9460,1700,820,148],spend:6500},partners:{values:[64e3,3840,960,510,121],spend:21e3}},E=Object.keys(T),me={values:w.map((e,t)=>E.reduce((e,n)=>e+T[n].values[t],0)),spend:E.reduce((e,t)=>e+T[t].spend,0)}})))()}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,i=(0,D.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),a=(0,D.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),o=(0,D.useMemo)(()=>ve.map(t=>({...t,data:_e.map((n,r)=>({name:e(`shop.${n}`),value:t.values[r],color:t.color}))})),[e]);return(0,O.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`,gap:16,width:`100%`},children:o.map(t=>(0,O.jsxs)(`figure`,{style:{margin:0},children:[(0,O.jsxs)(`figcaption`,{style:{fontWeight:600,marginBottom:4},children:[e(`devices.${t.key}`),` ·`,` `,e(`conversionRate`,{rate:a.format(t.values[3]/t.values[0])})]}),(0,O.jsx)(_,{data:t.data,legend:!1,format:e=>i.format(e),percentFormat:e=>a.format(e),renderTooltip:t=>(0,O.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,O.jsx)(`strong`,{children:t.name}),(0,O.jsx)(`span`,{children:i.format(t.value)}),(0,O.jsx)(`span`,{children:e(`conversionOverall`,{share:a.format(t.percent)})})]}),height:280,ariaLabel:e(`deviceFunnelAria`,{device:e(`devices.${t.key}`)})})]},t.key))})}var D,O,_e,ve;function ye(){return(ye=e((()=>{D=t(),i(),g(),O=n(),_e=[`product`,`cart`,`checkout`,`order`],ve=[{key:`desktop`,values:[42e3,12600,7900,5300],color:`#0ea5e9`},{key:`mobile`,values:[61e3,13400,5200,2700],color:`#f97316`}]})))()}function be(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,i=(0,k.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),a=(0,k.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),o=(0,k.useMemo)(()=>M.map(t=>({name:e(`shop.${t.key}`),value:t.value,color:t===N?`var(--danger-color)`:void 0})),[e]),s=(0,k.useMemo)(()=>[{key:`stage`,header:e(`stage`),render:t=>e(`shop.${t.key}`)},{key:`value`,header:e(`visitors`),align:`right`,render:e=>i.format(e.value)},{key:`dropOff`,header:e(`dropOff`),align:`right`,render:e=>e.dropOff===0?`–`:(0,A.jsx)(`span`,{style:{color:e===N?`var(--danger-color)`:void 0,fontWeight:e===N?600:void 0},children:a.format(-e.dropOff)})}],[e,i,a]);return(0,A.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16,alignItems:`center`,width:`100%`},children:[(0,A.jsx)(_,{data:o,legend:!1,format:e=>i.format(e),percentFormat:e=>a.format(e),renderTooltip:t=>(0,A.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,A.jsx)(`strong`,{children:t.name}),(0,A.jsx)(`span`,{children:i.format(t.value)}),(0,A.jsx)(`span`,{children:e(`conversionOverall`,{share:a.format(t.percent)})})]}),height:340,ariaLabel:e(`shopAria`)}),(0,A.jsx)(ee,{"aria-label":e(`dropOffTable`),columns:s,data:M,rowKey:e=>e.key,size:`small`})]})}var k,A,j,M,N;function xe(){return(xe=e((()=>{k=t(),i(),p(),g(),A=n(),j=[{key:`visits`,value:182400},{key:`product`,value:96300},{key:`cart`,value:21700},{key:`checkout`,value:11900},{key:`payment`,value:8350},{key:`order`,value:7480}],M=j.map((e,t)=>({...e,dropOff:t===0?0:1-e.value/j[t-1].value})),N=M.reduce((e,t)=>t.dropOff>e.dropOff?t:e)})))()}function Se(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,[i,a]=(0,P.useState)(R),[s,c]=(0,P.useState)(0),[l,u]=(0,P.useState)(!0),f=(0,P.useRef)(Se(L)),p=s>=Te;(0,P.useEffect)(()=>{if(!l||p)return;let e=window.setInterval(()=>{let e=[];e[0]=Math.round(300+f.current()*500);for(let t=1;t<I.length;t++){let n=we[t-1]*(.85+f.current()*.3);e[t]=Math.round(e[t-1]*n)}a(t=>t.map((t,n)=>t+e[n])),c(e=>e+1)},1e3);return()=>window.clearInterval(e)},[l,p]);let ee=(0,P.useMemo)(()=>I.map((t,n)=>({name:e(`sale.stages.${t}`),value:i[n]})),[i,e]),m=(0,P.useMemo)(()=>{let e=new Intl.NumberFormat(n),t=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),r=new Intl.DateTimeFormat(n,{hour:`numeric`,minute:`2-digit`,timeZone:`UTC`});return{number:t=>e.format(t),percent:e=>t.format(e),clock:e=>r.format(Date.UTC(2026,10,27,10,e*Ee))}},[n]),te=()=>{f.current=Se(L),a(R),c(0),u(!0)},h=i[i.length-1];return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(_,{data:ee,format:m.number,percentFormat:m.percent,legend:!1,height:320,ariaLabel:e(`sale.aria`)}),(0,F.jsxs)(d,{gap:8,wrap:!0,align:`center`,children:[(0,F.jsx)(o,{size:`small`,variant:`outline`,disabled:p,onClick:()=>u(e=>!e),children:e(l?`sale.pause`:`sale.resume`)}),(0,F.jsx)(o,{size:`small`,variant:`ghost`,onClick:te,children:e(`sale.restart`)}),(0,F.jsx)(`span`,{children:e(`sale.status`,{time:m.clock(s),orders:m.number(h),rate:m.percent(h/i[0])})})]}),(0,F.jsx)(`output`,{"aria-live":`polite`,children:p&&e(`sale.ended`,{orders:m.number(h)})})]})}var P,F,I,we,Te,Ee,L,R;function De(){return(De=e((()=>{P=t(),i(),a(),f(),g(),F=n(),I=[`visitors`,`product`,`cart`,`checkout`,`orders`],we=[.62,.28,.6,.78],Te=30,Ee=2,L=2026,R=[420,260,74,45,35]})))()}function Oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,[i,a]=(0,z.useState)(null),o=(0,z.useMemo)(()=>V.map(({key:t,value:n},r)=>({name:e(`hiring.${t}`),value:n,color:ke[r]})),[e]),s=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),c=new Intl.NumberFormat(n,{style:`unit`,unit:`day`}),l=V.reduce((e,t)=>e+t.days,0);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,B.jsx)(_,{data:o,shape:`bar`,gap:6,legend:!1,percentFormat:e=>s.format(e),renderTooltip:t=>(0,B.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,B.jsx)(`strong`,{children:t.name}),(0,B.jsx)(`span`,{children:e(`candidates`,{candidates:t.value})}),(0,B.jsx)(`span`,{children:e(`stageTime`,{days:c.format(V[t.index].days)})})]}),onClick:a,height:340,ariaLabel:e(`hiringAria`)}),(0,B.jsx)(`p`,{role:`status`,children:i?e(`hiringSelected`,{stage:i.name,candidates:i.value,share:s.format(i.percent)}):e(`hiringSummary`,{rate:s.format(V[5].value/V[0].value),days:c.format(l)})})]})}var z,B,V,ke;function Ae(){return(Ae=e((()=>{z=t(),i(),g(),B=n(),V=[{key:`applied`,value:640,days:0},{key:`screened`,value:212,days:4},{key:`technical`,value:74,days:9},{key:`onsite`,value:21,days:12},{key:`offer`,value:6,days:5},{key:`hired`,value:4,days:7}],ke=[`#64748b`,`#6366f1`,`#8b5cf6`,`#d946ef`,`#f43f5e`,`#16a34a`]})))()}function je(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,[i,a]=(0,H.useState)(null),o=(0,H.useMemo)(()=>W.map(({key:t,deals:n})=>({name:e(`pipeline.stages.${t}`),value:G(n)})),[e]),s=(0,H.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),t=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),r=new Intl.NumberFormat(n,{style:`percent`});return{compact:t=>e.format(t),full:e=>t.format(e),percent:e=>r.format(e)}},[n]),c=i===null?null:W[i];return(0,U.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:16,alignItems:`start`,width:`100%`},children:[(0,U.jsx)(_,{data:o,conversion:!1,legend:!1,format:s.compact,renderTooltip:t=>(0,U.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,U.jsx)(`strong`,{children:t.name}),(0,U.jsx)(`span`,{children:e(`pipeline.dealsAmount`,{deals:W[t.index].deals.length,amount:s.full(t.value)})}),(0,U.jsx)(`span`,{children:e(`pipeline.probability`,{share:s.percent(W[t.index].probability)})})]}),onClick:e=>a(e.index),height:320,ariaLabel:e(`pipeline.aria`)}),(0,U.jsxs)(`section`,{"aria-live":`polite`,style:{display:`grid`,gap:8},children:[(0,U.jsx)(`strong`,{children:c&&i!==null?e(`pipeline.stageTitle`,{stage:o[i].name,deals:c.deals.length}):e(`pipeline.forecast`,{amount:s.full(K)})}),c?(0,U.jsx)(`ul`,{style:{margin:0,paddingInlineStart:20},children:[...c.deals].sort((e,t)=>t[1]-e[1]).map(([e,t])=>(0,U.jsxs)(`li`,{children:[e,` · `,s.full(t)]},e))}):(0,U.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:e(`pipeline.hint`)})]})]})}var H,U,W,G,K;function Me(){return(Me=e((()=>{H=t(),i(),g(),U=n(),W=[{key:`lead`,probability:.1,deals:[[`Acme Corp`,12e3],[`Brightline`,8e3],[`Cobalt Labs`,15e3],[`Dunmore`,6e3],[`Evergreen`,9e3],[`Fieldstone`,11e3],[`Granite & Co`,7e3]]},{key:`qualified`,probability:.25,deals:[[`Harbor Health`,14e3],[`Ironwood`,18e3],[`Juniper`,9e3],[`Keystone`,12e3],[`Lakeside`,7e3]]},{key:`demo`,probability:.4,deals:[[`Meridian`,21e3],[`Northwind`,16e3],[`Oakridge`,11e3]]},{key:`proposal`,probability:.6,deals:[[`Pinnacle`,24e3],[`Quarry Works`,13e3]]},{key:`negotiation`,probability:.8,deals:[[`Redwood`,19e3],[`Summit Bank`,9e3]]}],G=e=>e.reduce((e,[,t])=>e+t,0),K=W.reduce((e,t)=>e+G(t.deals)*t.probability,0)})))()}function Ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,[i,a]=(0,q.useState)(Q),s=(0,q.useMemo)(()=>{let t=[Y];for(let e=1;e<Z.length;e++)t.push(t[e-1]*i[e-1]/100);return Z.map((n,r)=>({name:e(`whatIf.stages.${n}`),value:Math.round(t[r])}))},[i,e]),c=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{maximumFractionDigits:0}),t=new Intl.NumberFormat(n,{maximumFractionDigits:0,signDisplay:`exceptZero`}),r=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),i=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0,signDisplay:`exceptZero`}),a=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return{number:t=>e.format(t),signed:e=>t.format(e),money:e=>r.format(e),signedMoney:e=>i.format(e),percent:e=>a.format(e)}},[n]),l=(e,t)=>a(n=>n.map((n,r)=>r===e?Math.min(95,Math.max(1,n+t)):n)),u=$(i),f=$(Q);return(0,J.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:16,alignItems:`center`,width:`100%`},children:[(0,J.jsx)(_,{data:s,legend:!1,format:c.number,percentFormat:c.percent,height:320,ariaLabel:e(`whatIf.aria`)}),(0,J.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[i.map((t,n)=>{let r=e(`whatIf.step`,{from:s[n].name,to:s[n+1].name});return(0,J.jsxs)(d,{gap:8,align:`center`,justify:`between`,children:[(0,J.jsxs)(`span`,{children:[r,`: `,(0,J.jsx)(`strong`,{children:c.percent(t/100)})]}),(0,J.jsxs)(d,{gap:4,children:[(0,J.jsx)(o,{size:`small`,variant:`outline`,"aria-label":e(`whatIf.lower`,{step:r}),onClick:()=>l(n,-1),children:`−1`}),(0,J.jsx)(o,{size:`small`,variant:`outline`,"aria-label":e(`whatIf.raise`,{step:r}),onClick:()=>l(n,1),children:`+1`})]})]},Z[n])}),(0,J.jsx)(o,{size:`small`,variant:`ghost`,disabled:i.every((e,t)=>e===Q[t]),onClick:()=>a(Q),children:e(`whatIf.reset`)}),(0,J.jsx)(`output`,{"aria-live":`polite`,children:e(`whatIf.summary`,{orders:c.number(u),ordersDelta:c.signed(u-f),revenue:c.money(u*X),revenueDelta:c.signedMoney((u-f)*X)})})]})]})}var q,J,Y,X,Z,Q,$;function Pe(){return(Pe=e((()=>{q=t(),i(),a(),f(),g(),J=n(),Y=5e4,X=68,Z=[`visits`,`cart`,`checkout`,`paid`],Q=[12,55,62],$=e=>e.reduce((e,t)=>e*t/100,Y)})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

type Sort = "descending" | "ascending" | "none";
const SORTS: Sort[] = ["descending", "ascending", "none"];

// Weekly active users of each feature (not a sequential process)
const features = [
  { key: "alerts", value: 3900 },
  { key: "dashboards", value: 8400 },
  { key: "integrations", value: 1600 },
  { key: "reports", value: 5200 },
  { key: "api", value: 2100 },
];

export default function BarsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const [sort, setSort] = useState<Sort>("descending");

  const data = useMemo(
    (): ShapeDatum[] =>
      features.map(({ key, value }) => ({ name: t(\`features.\${key}\`), value })),
    [t],
  );
  const number = new Intl.NumberFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sortOrder")}
        direction="horizontal"
        value={sort}
        onChange={(value) => setSort(value as Sort)}
      >
        {SORTS.map((value) => (
          <Radio key={value} value={value} label={t(\`sorts.\${value}\`)} />
        ))}
      </RadioGroup>
      <FunnelChart
        data={data}
        shape="bar"
        sort={sort}
        conversion={false}
        gap={6}
        legend={false}
        format={(value) => number.format(value)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("weeklyUsers", { users: number.format(event.value) })}
            </span>
          </div>
        )}
        height={300}
        ariaLabel={t("featuresAria")}
      />
    </div>
  );
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Sign-up funnel of a SaaS product over one month
const stages = [
  { key: "pricing", value: 24000 },
  { key: "started", value: 9600 },
  { key: "verified", value: 6850 },
  { key: "project", value: 4100 },
  { key: "invited", value: 1720 },
  { key: "upgraded", value: 640 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): ShapeDatum[] =>
      stages.map(({ key, value }) => ({ name: t(\`signup.\${key}\`), value })),
    [t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  // The data is not sorted by the chart (sort="none"), so the event index
  // is also the index in \`data\`
  const tooltip = (event: ShapeHoverEvent) => {
    const previous = event.index > 0 ? data[event.index - 1] : null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{t("users", { users: number.format(event.value) })}</span>
        <span>{t("ofVisitors", { share: percent.format(event.percent) })}</span>
        {previous && (
          <span>
            {t("droppedSince", {
              users: number.format(previous.value - event.value),
              stage: previous.name,
            })}
          </span>
        )}
      </div>
    );
  };

  return (
    <FunnelChart
      data={data}
      format={(value) => number.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={tooltip}
      height={360}
      ariaLabel={t("signupAria")}
    />
  );
}
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Channel = "search" | "social" | "email" | "partners";

// Marketing funnel of one month per acquisition channel, with its spend (USD)
const STAGES = ["impressions", "clicks", "leads", "qualified", "customers"];
const CHANNELS: Record<Channel, { values: number[]; spend: number }> = {
  search: { values: [420_000, 18_900, 2_270, 910, 182], spend: 48_000 },
  social: { values: [1_250_000, 21_300, 1_490, 450, 63], spend: 36_000 },
  email: { values: [86_000, 9_460, 1_700, 820, 148], spend: 6_500 },
  partners: { values: [64_000, 3_840, 960, 510, 121], spend: 21_000 },
};
const KEYS = Object.keys(CHANNELS) as Channel[];
const ALL = {
  values: STAGES.map((_, i) =>
    KEYS.reduce((sum, key) => sum + CHANNELS[key].values[i], 0),
  ),
  spend: KEYS.reduce((sum, key) => sum + CHANNELS[key].spend, 0),
};

export default function CampaignsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [channel, setChannel] = useState<Channel | "all">("all");

  const { values, spend } = channel === "all" ? ALL : CHANNELS[channel];
  const data = useMemo(
    (): ShapeDatum[] =>
      STAGES.map((stage, i) => ({
        name: t(\`campaigns.stages.\${stage}\`),
        value: values[i],
      })),
    [t, values],
  );
  const formats = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
    });
    const budget = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return {
      number: (value: number) => compact.format(value),
      money: (value: number) => money.format(value),
      budget: (value: number) => budget.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  // conversion from the previous stage and cost of each result
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2 }}>
      <strong>{event.name}</strong>
      <span>{formats.number(event.value)}</span>
      {event.index > 0 && (
        <span>
          {t("campaigns.fromPrevious", {
            share: formats.percent(event.value / values[event.index - 1]),
          })}
        </span>
      )}
      <span>
        {t("campaigns.costPer", { cost: formats.money(spend / event.value) })}
      </span>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("campaigns.channel")}
        value={channel}
        onChange={(value) => setChannel(value as Channel | "all")}
      >
        <SelectItem value="all">{t("campaigns.channels.all")}</SelectItem>
        {KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(\`campaigns.channels.\${key}\`)}
          </SelectItem>
        ))}
      </Select>
      <FunnelChart
        data={data}
        legend={false}
        format={formats.number}
        percentFormat={formats.percent}
        renderTooltip={tooltip}
        height={340}
        ariaLabel={t("campaigns.aria", {
          channel: t(\`campaigns.channels.\${channel}\`),
        })}
      />
      <output aria-live="polite">
        {t("campaigns.summary", {
          spend: formats.budget(spend),
          customers: formats.number(values[values.length - 1]),
          cac: formats.money(spend / values[values.length - 1]),
        })}
      </output>
    </div>
  );
}
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// The same checkout funnel split by device: where does mobile lose people?
const stages = ["product", "cart", "checkout", "order"];
const devices = [
  { key: "desktop", values: [42_000, 12_600, 7_900, 5_300], color: "#0ea5e9" },
  { key: "mobile", values: [61_000, 13_400, 5_200, 2_700], color: "#f97316" },
];

export default function CompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  // one color per funnel, the stages in the same order
  const funnels = useMemo(
    () =>
      devices.map((device) => ({
        ...device,
        data: stages.map((stage, i): ShapeDatum => ({
          name: t(\`shop.\${stage}\`),
          value: device.values[i],
          color: device.color,
        })),
      })),
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {funnels.map((funnel) => (
        <figure key={funnel.key} style={{ margin: 0 }}>
          <figcaption style={{ fontWeight: 600, marginBottom: 4 }}>
            {t(\`devices.\${funnel.key}\`)} ·{" "}
            {t("conversionRate", {
              rate: percent.format(funnel.values[3] / funnel.values[0]),
            })}
          </figcaption>
          <FunnelChart
            data={funnel.data}
            legend={false}
            format={(value) => number.format(value)}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(event) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{event.name}</strong>
                <span>{number.format(event.value)}</span>
                <span>
                  {t("conversionOverall", {
                    share: percent.format(event.percent),
                  })}
                </span>
              </div>
            )}
            height={280}
            ariaLabel={t("deviceFunnelAria", {
              device: t(\`devices.\${funnel.key}\`),
            })}
          />
        </figure>
      ))}
    </div>
  );
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Checkout funnel of an online shop over one week
const stages = [
  { key: "visits", value: 182_400 },
  { key: "product", value: 96_300 },
  { key: "cart", value: 21_700 },
  { key: "checkout", value: 11_900 },
  { key: "payment", value: 8_350 },
  { key: "order", value: 7_480 },
];

interface Step {
  key: string;
  value: number;
  /** Visitors lost since the previous stage, 0-1 */
  dropOff: number;
}

const steps: Step[] = stages.map((stage, i) => ({
  ...stage,
  dropOff: i === 0 ? 0 : 1 - stage.value / stages[i - 1].value,
}));
// the stage that loses the most visitors
const worst = steps.reduce((a, b) => (b.dropOff > a.dropOff ? b : a));

export default function EcommerceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  // the stage with the biggest drop-off is highlighted in red
  const data = useMemo(
    (): ShapeDatum[] =>
      steps.map((step) => ({
        name: t(\`shop.\${step.key}\`),
        value: step.value,
        color: step === worst ? "var(--danger-color)" : undefined,
      })),
    [t],
  );
  const columns = useMemo(
    (): TableColumn<Step>[] => [
      { key: "stage", header: t("stage"), render: (s) => t(\`shop.\${s.key}\`) },
      {
        key: "value",
        header: t("visitors"),
        align: "right",
        render: (s) => number.format(s.value),
      },
      {
        key: "dropOff",
        header: t("dropOff"),
        align: "right",
        render: (s) =>
          s.dropOff === 0 ? (
            "–"
          ) : (
            <span
              style={{
                color: s === worst ? "var(--danger-color)" : undefined,
                fontWeight: s === worst ? 600 : undefined,
              }}
            >
              {percent.format(-s.dropOff)}
            </span>
          ),
      },
    ],
    [t, number, percent],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{number.format(event.value)}</span>
            <span>
              {t("conversionOverall", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("shopAria")}
      />
      <Table
        aria-label={t("dropOffTable")}
        columns={columns}
        data={steps}
        rowKey={(s) => s.key}
        size="small"
      />
    </div>
  );
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

/** Small seeded random generator: the same "sale" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A one-hour flash sale, replayed fast: one tick is two minutes of the
// sale. Each tick brings new visitors, and a share of each stage's
// newcomers moves on to the next stage
const STAGES = ["visitors", "product", "cart", "checkout", "orders"];
const RATES = [0.62, 0.28, 0.6, 0.78];
const TICKS = 30;
const MINUTES_PER_TICK = 2;
const SEED = 2026;
// the first minutes of the sale, before the replay starts
const START = [420, 260, 74, 45, 35];

export default function LiveSaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [counts, setCounts] = useState(START);
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));
  const ended = tick >= TICKS;

  useEffect(() => {
    if (!running || ended) return;
    const timer = window.setInterval(() => {
      // draw the newcomers outside the state updaters
      const added: number[] = [];
      added[0] = Math.round(300 + random.current() * 500);
      for (let i = 1; i < STAGES.length; i++) {
        const rate = RATES[i - 1] * (0.85 + random.current() * 0.3);
        added[i] = Math.round(added[i - 1] * rate);
      }
      setCounts((current) => current.map((value, i) => value + added[i]));
      setTick((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, ended]);

  const data = useMemo(
    (): ShapeDatum[] =>
      STAGES.map((stage, i) => ({
        name: t(\`sale.stages.\${stage}\`),
        value: counts[i],
      })),
    [counts, t],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
    return {
      number: (value: number) => number.format(value),
      percent: (share: number) => percent.format(share),
      // the sale starts at 10:00
      clock: (ticks: number) =>
        time.format(Date.UTC(2026, 10, 27, 10, ticks * MINUTES_PER_TICK)),
    };
  }, [locale]);

  const restart = () => {
    random.current = mulberry32(SEED);
    setCounts(START);
    setTick(0);
    setRunning(true);
  };
  const orders = counts[counts.length - 1];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <FunnelChart
        data={data}
        format={formats.number}
        percentFormat={formats.percent}
        legend={false}
        height={320}
        ariaLabel={t("sale.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          disabled={ended}
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("sale.pause") : t("sale.resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={restart}>
          {t("sale.restart")}
        </Button>
        <span>
          {t("sale.status", {
            time: formats.clock(tick),
            orders: formats.number(orders),
            rate: formats.percent(orders / counts[0]),
          })}
        </span>
      </HStack>
      {/* announced once, when the sale is over */}
      <output aria-live="polite">
        {ended && t("sale.ended", { orders: formats.number(orders) })}
      </output>
    </div>
  );
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Hiring pipeline of one engineering role, with the typical time per stage
const pipeline = [
  { key: "applied", value: 640, days: 0 },
  { key: "screened", value: 212, days: 4 },
  { key: "technical", value: 74, days: 9 },
  { key: "onsite", value: 21, days: 12 },
  { key: "offer", value: 6, days: 5 },
  { key: "hired", value: 4, days: 7 },
];
// cool to warm colors along the process
const colors = [
  "#64748b",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#f43f5e",
  "#16a34a",
];

export default function RecruitingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      pipeline.map(({ key, value }, i) => ({
        name: t(\`hiring.\${key}\`),
        value,
        color: colors[i],
      })),
    [t],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });
  const days = new Intl.NumberFormat(locale, { style: "unit", unit: "day" });
  const totalDays = pipeline.reduce((sum, stage) => sum + stage.days, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <FunnelChart
        data={data}
        shape="bar"
        gap={6}
        legend={false}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{t("candidates", { candidates: event.value })}</span>
            <span>
              {t("stageTime", {
                days: days.format(pipeline[event.index].days),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={340}
        ariaLabel={t("hiringAria")}
      />
      <p role="status">
        {selected
          ? t("hiringSelected", {
              stage: selected.name,
              candidates: selected.value,
              share: percent.format(selected.percent),
            })
          : t("hiringSummary", {
              rate: percent.format(pipeline[5].value / pipeline[0].value),
              days: days.format(totalDays),
            })}
      </p>
    </div>
  );
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Open B2B deals by pipeline stage (amounts in USD) and the win
// probability of each stage, used for the weighted forecast
const PIPELINE: {
  key: string;
  probability: number;
  deals: [string, number][];
}[] = [
  {
    key: "lead",
    probability: 0.1,
    deals: [
      ["Acme Corp", 12_000],
      ["Brightline", 8_000],
      ["Cobalt Labs", 15_000],
      ["Dunmore", 6_000],
      ["Evergreen", 9_000],
      ["Fieldstone", 11_000],
      ["Granite & Co", 7_000],
    ],
  },
  {
    key: "qualified",
    probability: 0.25,
    deals: [
      ["Harbor Health", 14_000],
      ["Ironwood", 18_000],
      ["Juniper", 9_000],
      ["Keystone", 12_000],
      ["Lakeside", 7_000],
    ],
  },
  {
    key: "demo",
    probability: 0.4,
    deals: [
      ["Meridian", 21_000],
      ["Northwind", 16_000],
      ["Oakridge", 11_000],
    ],
  },
  {
    key: "proposal",
    probability: 0.6,
    deals: [
      ["Pinnacle", 24_000],
      ["Quarry Works", 13_000],
    ],
  },
  {
    key: "negotiation",
    probability: 0.8,
    deals: [
      ["Redwood", 19_000],
      ["Summit Bank", 9_000],
    ],
  },
];

const amountOf = (deals: [string, number][]) =>
  deals.reduce((sum, [, amount]) => sum + amount, 0);
const FORECAST = PIPELINE.reduce(
  (sum, stage) => sum + amountOf(stage.deals) * stage.probability,
  0,
);

export default function SalesPipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [stage, setStage] = useState<number | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      PIPELINE.map(({ key, deals }) => ({
        name: t(\`pipeline.stages.\${key}\`),
        value: amountOf(deals),
      })),
    [t],
  );
  const formats = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const full = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      compact: (value: number) => compact.format(value),
      full: (value: number) => full.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const open = stage === null ? null : PIPELINE[stage];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "start",
        width: "100%",
      }}
    >
      {/* the stages hold different deals: a conversion rate between them
          would be misleading, so it is hidden */}
      <FunnelChart
        data={data}
        conversion={false}
        legend={false}
        format={formats.compact}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("pipeline.dealsAmount", {
                deals: PIPELINE[event.index].deals.length,
                amount: formats.full(event.value),
              })}
            </span>
            <span>
              {t("pipeline.probability", {
                share: formats.percent(PIPELINE[event.index].probability),
              })}
            </span>
          </div>
        )}
        onClick={(event) => setStage(event.index)}
        height={320}
        ariaLabel={t("pipeline.aria")}
      />
      <section aria-live="polite" style={{ display: "grid", gap: 8 }}>
        <strong>
          {open && stage !== null
            ? t("pipeline.stageTitle", {
                stage: data[stage].name,
                deals: open.deals.length,
              })
            : t("pipeline.forecast", { amount: formats.full(FORECAST) })}
        </strong>
        {open ? (
          <ul style={{ margin: 0, paddingInlineStart: 20 }}>
            {[...open.deals]
              .sort((a, b) => b[1] - a[1])
              .map(([company, amount]) => (
                <li key={company}>
                  {company} · {formats.full(amount)}
                </li>
              ))}
          </ul>
        ) : (
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("pipeline.hint")}
          </span>
        )}
      </section>
    </div>
  );
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// What-if model of a checkout: monthly visits, today's conversion rate of
// each step and the average order value (USD)
const VISITS = 50_000;
const ORDER_VALUE = 68;
const STAGES = ["visits", "cart", "checkout", "paid"];
const BASE_RATES = [12, 55, 62]; // in percent, changed one point at a time

const ordersOf = (rates: number[]) =>
  rates.reduce((count, rate) => (count * rate) / 100, VISITS);

export default function WhatIfDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [rates, setRates] = useState(BASE_RATES);

  const data = useMemo((): ShapeDatum[] => {
    // each stage keeps its rate of the previous one
    const counts = [VISITS];
    for (let i = 1; i < STAGES.length; i++) {
      counts.push((counts[i - 1] * rates[i - 1]) / 100);
    }
    return STAGES.map((stage, i) => ({
      name: t(\`whatIf.stages.\${stage}\`),
      value: Math.round(counts[i]),
    }));
  }, [rates, t]);
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const signed = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const signedMoney = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return {
      number: (value: number) => number.format(value),
      signed: (value: number) => signed.format(value),
      money: (value: number) => money.format(value),
      signedMoney: (value: number) => signedMoney.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const change = (step: number, delta: number) =>
    setRates((current) =>
      current.map((rate, i) =>
        i === step ? Math.min(95, Math.max(1, rate + delta)) : rate,
      ),
    );
  const orders = ordersOf(rates);
  const baseOrders = ordersOf(BASE_RATES);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={formats.number}
        percentFormat={formats.percent}
        height={320}
        ariaLabel={t("whatIf.aria")}
      />
      <div style={{ display: "grid", gap: 12 }}>
        {rates.map((rate, i) => {
          const step = t("whatIf.step", {
            from: data[i].name,
            to: data[i + 1].name,
          });
          return (
            <HStack key={STAGES[i]} gap={8} align="center" justify="between">
              <span>
                {step}: <strong>{formats.percent(rate / 100)}</strong>
              </span>
              <HStack gap={4}>
                <Button
                  size="small"
                  variant="outline"
                  aria-label={t("whatIf.lower", { step })}
                  onClick={() => change(i, -1)}
                >
                  −1
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  aria-label={t("whatIf.raise", { step })}
                  onClick={() => change(i, 1)}
                >
                  +1
                </Button>
              </HStack>
            </HStack>
          );
        })}
        <Button
          size="small"
          variant="ghost"
          disabled={rates.every((rate, i) => rate === BASE_RATES[i])}
          onClick={() => setRates(BASE_RATES)}
        >
          {t("whatIf.reset")}
        </Button>
        <output aria-live="polite">
          {t("whatIf.summary", {
            orders: formats.number(orders),
            ordersDelta: formats.signed(orders - baseOrders),
            revenue: formats.money(orders * ORDER_VALUE),
            revenueDelta: formats.signedMoney(
              (orders - baseOrders) * ORDER_VALUE,
            ),
          })}
        </output>
      </div>
    </div>
  );
}
`})))()}var $e,et,tt;function nt(){return(nt=e((()=>{le(),fe(),he(),ye(),xe(),De(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),t(),re(),ae(),$e=n(),et=ne(Object.assign({"./demos/bars.tsx":oe,"./demos/basic.tsx":ue,"./demos/campaigns.tsx":pe,"./demos/compare.tsx":ge,"./demos/ecommerce.tsx":be,"./demos/live-sale.tsx":Ce,"./demos/recruiting.tsx":Oe,"./demos/sales-pipeline.tsx":je,"./demos/what-if.tsx":Ne}),Object.assign({"./demos/bars.tsx":Fe,"./demos/basic.tsx":Le,"./demos/campaigns.tsx":ze,"./demos/compare.tsx":Ve,"./demos/ecommerce.tsx":Ue,"./demos/live-sale.tsx":Ge,"./demos/recruiting.tsx":qe,"./demos/sales-pipeline.tsx":Ye,"./demos/what-if.tsx":Ze})),tt=()=>(0,$e.jsx)(ie,{id:`funnel-chart`,demos:et})})))()}nt();export{tt as default};