import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-eGG0J4pK.js";import{R as a,z as o}from"./ProgressIndicator-CQZAxIX3.js";import{i as s,n as c,r as l,t as u}from"./Radio-D2wZ9q6z.js";import{n as d,t as f}from"./Switch-BCh7GKwc.js";import{i as p,r as m}from"./Stack-DOPoCF_W.js";import{i as h,o as g,t as ee}from"./Select-BIYfjWQ3.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-CHJwIegD.js";import{c as _,r as v}from"./shapes-B5QcpBlT.js";function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),[n,i]=(0,y.useState)(0),a=t.language,o=(0,y.useMemo)(()=>{let e=new Intl.DateTimeFormat(a,{weekday:`short`,timeZone:`UTC`});return S.map((t,n)=>e.format(Date.UTC(2026,2,2+n)))},[a]),c=S[n],l=(0,y.useMemo)(()=>C.map(t=>({name:e(`rings.${t}`),value:c[t],max:x[t],color:oe[t]})),[e,c]),d=C.filter(e=>c[e]>=x[e]).length;return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,b.jsx)(s,{"aria-label":e(`dayLabel`),direction:`horizontal`,value:n,onChange:e=>i(Number(e)),children:o.map((e,t)=>(0,b.jsx)(u,{value:t,label:e},e))}),(0,b.jsx)(v,{data:l,sweep:360,innerRadius:.34,gap:.12,centerValue:`${d}/3`,centerLabel:e(`closed`),percentFormat:se,height:320,ariaLabel:e(`activityAria`)})]})}var y,b,x,oe,S,C,se;function ce(){return(ce=e((()=>{y=t(),i(),c(),l(),_(),b=n(),x={move:600,exercise:30,stand:12},oe={move:`#fa114f`,exercise:`#92e82a`,stand:`#1eeaef`},S=[{move:520,exercise:34,stand:11},{move:610,exercise:41,stand:12},{move:380,exercise:12,stand:8},{move:705,exercise:55,stand:13},{move:450,exercise:28,stand:10},{move:820,exercise:72,stand:9},{move:290,exercise:6,stand:6}],C=[`move`,`exercise`,`stand`],se=e=>`${Math.round(e*100)}%`})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),n=t.language,[i,a]=(0,w.useState)(`goals`),o=(0,w.useMemo)(()=>{let e=i===`goals`?1:2;return[...ue].sort((t,n)=>n[e]-t[e])},[i]),c=(0,w.useMemo)(()=>o.map(([t,n,r],a)=>({name:e(`leaderboard.players.${t}`),value:i===`goals`?n:r,color:D[a]??de})),[o,i,e]),l=(0,w.useMemo)(()=>new Intl.NumberFormat(n),[n]),d=(0,w.useMemo)(()=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}),[n]),f=e(`leaderboard.stats.${i}`);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,T.jsx)(s,{"aria-label":e(`leaderboard.stat`),direction:`horizontal`,value:i,onChange:e=>a(e),children:E.map(t=>(0,T.jsx)(u,{value:t,label:e(`leaderboard.stats.${t}`)},t))}),(0,T.jsx)(v,{data:c,startAngle:-90,sweep:270,innerRadius:.25,gap:.18,format:e=>l.format(e),renderTooltip:t=>{let n=o[t.index][3];return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,T.jsx)(`strong`,{children:e(`leaderboard.rank`,{rank:l.format(t.index+1),name:t.name})}),(0,T.jsx)(`span`,{children:e(`leaderboard.tally`,{value:l.format(t.value),stat:f,games:l.format(n)})}),(0,T.jsx)(`span`,{children:e(`leaderboard.perGame`,{ratio:d.format(t.value/n)})})]})},height:360,ariaLabel:e(`leaderboard.aria`,{stat:f})}),(0,T.jsx)(`output`,{"aria-live":`polite`,children:e(`leaderboard.leader`,{name:c[0].name,value:l.format(c[0].value),stat:f})})]})}var w,T,ue,E,D,de;function fe(){return(fe=e((()=>{w=t(),i(),c(),l(),_(),T=n(),ue=[[`silva`,24,7,33],[`kowalski`,19,12,34],[`okafor`,17,4,30],[`moreau`,11,15,32],[`tanaka`,9,13,31],[`jensen`,14,9,28]],E=[`goals`,`assists`],D=[`#d4a72c`,`#9ca3af`,`#b4713d`],de=`#64748b`})))()}function pe(){let{t:e}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),t=(0,me.useMemo)(()=>O.map(([t,n])=>({name:e(`okr.${t}`),value:n})),[e]),n=Math.round(O.reduce((e,[,t])=>e+t,0)/O.length);return(0,he.jsx)(v,{data:t,max:100,innerRadius:.4,labelContent:[`name`,`percent`],percentFormat:k,centerValue:`${n}%`,centerLabel:e(`average`),height:340,ariaLabel:e(`okrAria`)})}var me,he,O,k;function A(){return(A=e((()=>{me=t(),i(),_(),he=n(),O=[[`activation`,82],[`retention`,64],[`nps`,91],[`latency`,47],[`churn`,58]],k=e=>`${Math.round(e*100)}%`})))()}function ge(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),n=t.language,i=(0,j.useMemo)(()=>N.map(([t,n,r])=>({name:e(`regions.${t}`),value:n,max:r})),[e]),a=(0,j.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2});return t=>e.format(t*1e3)},[n]),o=N.reduce((e,[,t])=>e+t,0),s=N.reduce((e,[,,t])=>e+t,0);return(0,M.jsx)(v,{data:i,sweep:180,startAngle:-90,innerRadius:.45,gap:.2,labels:!1,format:a,centerValue:`${Math.round(o/s*100)}%`,centerLabel:e(`ofQuota`),padding:{top:8,bottom:0,left:8,right:8},height:300,ariaLabel:e(`quotaAria`)})}var j,M,N;function P(){return(P=e((()=>{j=t(),i(),_(),M=n(),N=[[`north`,1840,2e3],[`south`,1260,1100],[`east`,980,1400],[`west`,1520,1600]]})))()}function _e(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),n=t.language,[i,a]=(0,F.useState)(null),o=(0,F.useMemo)(()=>L.map(([t,n,r])=>({name:e(`savings.goals.${t}`),value:n,max:r})),[e]),s=(0,F.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),[n]),c=(0,F.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),l=(0,F.useMemo)(()=>new Intl.NumberFormat(n),[n]),u=L.reduce((e,[,t])=>e+t,0),d=L.reduce((e,[,,t])=>e+t,0);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,I.jsx)(v,{data:o,innerRadius:.36,labelContent:R,format:e=>s.format(e),percentFormat:e=>c.format(e),centerValue:c.format(u/d),centerLabel:e(`savings.overall`),onClick:e=>a(e.index),height:340,ariaLabel:e(`savings.aria`)}),(0,I.jsx)(`output`,{"aria-live":`polite`,children:(()=>{if(i===null)return e(`savings.hint`);let[,t,n,r]=L[i],a=n-t;return e(`savings.detail`,{goal:o[i].name,saved:s.format(t),target:s.format(n),remaining:s.format(a),months:l.format(Math.ceil(a/r)),monthly:s.format(r)})})()})]})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),i(),_(),I=n(),L=[[`emergency`,7400,9e3,400],[`holiday`,1850,3200,250],[`laptop`,1100,1600,150],[`deposit`,12600,4e4,900]],R=[`name`,`percent`]})))()}function ve(){let{t:e}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),[t,n]=(0,B.useState)(`threeQuarter`),[i,a]=(0,B.useState)(!0),[o,c]=(0,B.useState)(!0),l=(0,B.useMemo)(()=>ye.map(([t,n])=>({name:e(`resources.${t}`),value:n})),[e]);return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,V.jsxs)(p,{gap:16,wrap:!0,align:`center`,children:[(0,V.jsx)(s,{"aria-label":e(`shapeLabel`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Object.keys(H).map(t=>(0,V.jsx)(u,{value:t,label:e(`shapes.${t}`)},t))}),(0,V.jsx)(f,{checked:i,onChange:a,label:e(`rounded`)}),(0,V.jsx)(f,{checked:o,onChange:c,label:e(`track`)})]}),(0,V.jsx)(v,{data:l,max:100,...H[t],rounded:i,track:o,labelContent:[`name`,`value`],format:be,height:320,ariaLabel:e(`resourcesAria`)})]})}var B,V,ye,H,be;function xe(){return(xe=e((()=>{B=t(),i(),m(),c(),l(),d(),_(),V=n(),ye=[[`cpu`,72],[`memory`,58],[`disk`,86],[`network`,31]],H={threeQuarter:{sweep:270,startAngle:0},full:{sweep:360,startAngle:0},half:{sweep:180,startAngle:-90}},be=e=>`${e}%`})))()}function Se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),n=t.language,[i,a]=(0,U.useState)(`survey`),o=(0,U.useMemo)(()=>{if(i===`survey`)return G;let e=i===`highest`?-1:1;return[...G].sort((t,n)=>e*(K(t)-K(n)))},[i]),s=(0,U.useMemo)(()=>o.map(([t,n,r])=>({name:e(`survey.statements.${t}`),value:n,max:r})),[o,e]),c=(0,U.useMemo)(()=>new Intl.NumberFormat(n),[n]),l=(0,U.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),u=G.reduce((e,t)=>e+K(t),0)/G.length;return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsx)(g,{size:`small`,style:{width:220},"aria-label":e(`survey.order`),value:i,onChange:e=>a(e),children:Ce.map(t=>(0,W.jsx)(ee,{value:t,children:e(`survey.orders.${t}`)},t))}),(0,W.jsx)(v,{data:s,innerRadius:.3,gap:.22,labelContent:q,percentFormat:e=>l.format(e),centerValue:l.format(u),centerLabel:e(`survey.average`),renderTooltip:t=>(0,W.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,W.jsx)(`strong`,{children:t.name}),(0,W.jsx)(`span`,{children:e(`survey.agree`,{agree:c.format(t.value),answered:c.format(o[t.index][2]),share:l.format(t.percent)})})]}),height:360,ariaLabel:e(`survey.aria`)})]})}var U,W,G,Ce,K,q;function we(){return(we=e((()=>{U=t(),i(),h(),_(),W=n(),G=[[`valued`,312,418],[`goals`,351,420],[`growth`,226,409],[`balance`,268,415],[`manager`,334,412],[`recommend`,297,417]],Ce=[`survey`,`highest`,`lowest`],K=([,e,t])=>e/t,q=[`name`,`percent`]})))()}function Te(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),n=t.language,[i,a]=(0,J.useState)(Q),s=(0,J.useRef)(Te(Z)),c=i.filter((e,t)=>e>=X[t][1]).length,l=c===X.length;(0,J.useEffect)(()=>{if(l)return;let e=window.setInterval(()=>{let e=X.map(()=>20+s.current()*40);a(t=>{let n=De;return t.map((t,r)=>{let i=X[r][1];return t>=i||n===0?t:(n--,Math.min(i,t+e[r]))})})},400);return()=>window.clearInterval(e)},[l]);let u=(0,J.useMemo)(()=>X.map(([t,n],r)=>({name:e(`uploads.files.${t}`),value:i[r],max:n})),[i,e]),d=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`megabyte`,maximumFractionDigits:0}),[n]),f=(0,J.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),m=(0,J.useMemo)(()=>new Intl.NumberFormat(n),[n]),h=X.reduce((e,[,t])=>e+t,0),g=i.reduce((e,t)=>e+t,0);return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsx)(v,{data:u,sweep:360,innerRadius:.42,gap:.2,labels:!1,legend:Oe,animation:!1,format:e=>d.format(e),percentFormat:e=>f.format(e),centerValue:f.format(g/h),centerLabel:e(`uploads.uploaded`),height:320,ariaLabel:e(`uploads.aria`)}),(0,Y.jsxs)(p,{gap:8,wrap:!0,align:`center`,children:[(0,Y.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>{s.current=Te(Z),a(Q)},children:e(`uploads.restart`)}),(0,Y.jsx)(`output`,{"aria-live":`polite`,children:l?e(`uploads.finished`,{size:d.format(h)}):e(`uploads.progress`,{done:m.format(c),files:m.format(X.length)})})]})]})}var J,Y,X,Z,De,Q,Oe;function ke(){return(ke=e((()=>{J=t(),i(),a(),m(),_(),Y=n(),X=[[`video`,840],[`photos`,420],[`slides`,96],[`backup`,1200]],Z=3,De=2,Q=X.map(()=>0),Oe={toggle:!1}})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Ring = "move" | "exercise" | "stand";

// Daily goals and a week of activity: Move in kcal, Exercise in minutes,
// Stand in hours with at least one minute of standing
const GOALS: Record<Ring, number> = { move: 600, exercise: 30, stand: 12 };
const COLORS: Record<Ring, string> = {
  move: "#fa114f",
  exercise: "#92e82a",
  stand: "#1eeaef",
};
const WEEK: Record<Ring, number>[] = [
  { move: 520, exercise: 34, stand: 11 },
  { move: 610, exercise: 41, stand: 12 },
  { move: 380, exercise: 12, stand: 8 },
  { move: 705, exercise: 55, stand: 13 },
  { move: 450, exercise: 28, stand: 10 },
  { move: 820, exercise: 72, stand: 9 },
  { move: 290, exercise: 6, stand: 6 },
];
const RINGS: Ring[] = ["move", "exercise", "stand"];
const percent = (share: number) => \`\${Math.round(share * 100)}%\`;

export default function ActivityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [day, setDay] = useState(0);
  const locale = i18n.language;

  // Monday to Sunday, in the reader's language (2026-03-02 is a Monday)
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    return WEEK.map((_, i) => format.format(Date.UTC(2026, 2, 2 + i)));
  }, [locale]);

  const values = WEEK[day];
  const data = useMemo(
    (): RadialBarDatum[] =>
      RINGS.map((ring) => ({
        name: t(\`rings.\${ring}\`),
        value: values[ring],
        max: GOALS[ring],
        color: COLORS[ring],
      })),
    [t, values],
  );
  const closed = RINGS.filter((ring) => values[ring] >= GOALS[ring]).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("dayLabel")}
        direction="horizontal"
        value={day}
        onChange={(value) => setDay(Number(value))}
      >
        {days.map((name, i) => (
          <Radio key={name} value={i} label={name} />
        ))}
      </RadioGroup>
      <RadialBarChart
        data={data}
        sweep={360}
        innerRadius={0.34}
        gap={0.12}
        centerValue={\`\${closed}/3\`}
        centerLabel={t("closed")}
        percentFormat={percent}
        height={320}
        ariaLabel={t("activityAria")}
      />
    </div>
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Stat = "goals" | "assists";

// Season statistics of a football league's top players
const PLAYERS: [key: string, goals: number, assists: number, games: number][] =
  [
    ["silva", 24, 7, 33],
    ["kowalski", 19, 12, 34],
    ["okafor", 17, 4, 30],
    ["moreau", 11, 15, 32],
    ["tanaka", 9, 13, 31],
    ["jensen", 14, 9, 28],
  ];
const STATS: Stat[] = ["goals", "assists"];
// gold, silver and bronze for the podium, a neutral color for the others
const PODIUM = ["#d4a72c", "#9ca3af", "#b4713d"];
const OTHERS = "#64748b";

export default function LeaderboardDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [stat, setStat] = useState<Stat>("goals");

  const ranked = useMemo(() => {
    const column = stat === "goals" ? 1 : 2;
    return [...PLAYERS].sort((a, b) => b[column] - a[column]);
  }, [stat]);
  // the leader is the outermost ring, and the scale is the leader's tally
  const data = useMemo(
    (): RadialBarDatum[] =>
      ranked.map(([key, goals, assists], rank) => ({
        name: t(\`leaderboard.players.\${key}\`),
        value: stat === "goals" ? goals : assists,
        color: PODIUM[rank] ?? OTHERS,
      })),
    [ranked, stat, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const ratio = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );

  const statName = t(\`leaderboard.stats.\${stat}\`);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("leaderboard.stat")}
        direction="horizontal"
        value={stat}
        onChange={(value) => setStat(value as Stat)}
      >
        {STATS.map((key) => (
          <Radio key={key} value={key} label={t(\`leaderboard.stats.\${key}\`)} />
        ))}
      </RadioGroup>
      <RadialBarChart
        data={data}
        startAngle={-90}
        sweep={270}
        innerRadius={0.25}
        gap={0.18}
        format={(value) => number.format(value)}
        renderTooltip={(bar) => {
          const games = ranked[bar.index][3];
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>
                {t("leaderboard.rank", {
                  rank: number.format(bar.index + 1),
                  name: bar.name,
                })}
              </strong>
              <span>
                {t("leaderboard.tally", {
                  value: number.format(bar.value),
                  stat: statName,
                  games: number.format(games),
                })}
              </span>
              <span>
                {t("leaderboard.perGame", {
                  ratio: ratio.format(bar.value / games),
                })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("leaderboard.aria", { stat: statName })}
      />
      <output aria-live="polite">
        {t("leaderboard.leader", {
          name: data[0].name,
          value: number.format(data[0].value),
          stat: statName,
        })}
      </output>
    </div>
  );
}
`})))()}var Pe;function Fe(){return(Fe=e((()=>{Pe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Key results of a quarter's objective, in percent of their target
const KEY_RESULTS: [key: string, progress: number][] = [
  ["activation", 82],
  ["retention", 64],
  ["nps", 91],
  ["latency", 47],
  ["churn", 58],
];

const percent = (share: number) => \`\${Math.round(share * 100)}%\`;

export default function OkrDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });

  const data = useMemo(
    (): RadialBarDatum[] =>
      KEY_RESULTS.map(([key, progress]) => ({
        name: t(\`okr.\${key}\`),
        value: progress,
      })),
    [t],
  );
  const average = Math.round(
    KEY_RESULTS.reduce((sum, [, progress]) => sum + progress, 0) /
      KEY_RESULTS.length,
  );

  return (
    <RadialBarChart
      data={data}
      max={100}
      innerRadius={0.4}
      labelContent={["name", "percent"]}
      percentFormat={percent}
      centerValue={\`\${average}%\`}
      centerLabel={t("average")}
      height={340}
      ariaLabel={t("okrAria")}
    />
  );
}
`})))()}var Ie;function Le(){return(Le=e((()=>{Ie=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Quarterly sales against each region's quota, in thousands of dollars
const REGIONS: [key: string, sales: number, quota: number][] = [
  ["north", 1840, 2000],
  ["south", 1260, 1100],
  ["east", 980, 1400],
  ["west", 1520, 1600],
];

export default function QuotaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): RadialBarDatum[] =>
      REGIONS.map(([key, sales, quota]) => ({
        name: t(\`regions.\${key}\`),
        value: sales,
        max: quota,
      })),
    [t],
  );
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return (value: number) => money.format(value * 1000);
  }, [locale]);
  const total = REGIONS.reduce((sum, [, sales]) => sum + sales, 0);
  const quota = REGIONS.reduce((sum, [, , q]) => sum + q, 0);

  return (
    <RadialBarChart
      data={data}
      sweep={180}
      startAngle={-90}
      innerRadius={0.45}
      gap={0.2}
      labels={false}
      format={format}
      centerValue={\`\${Math.round((total / quota) * 100)}%\`}
      centerLabel={t("ofQuota")}
      padding={{ top: 8, bottom: 0, left: 8, right: 8 }}
      height={300}
      ariaLabel={t("quotaAria")}
    />
  );
}
`})))()}var Re;function ze(){return(ze=e((()=>{Re=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Savings goals of a household, in euros: saved so far, the goal and the
// monthly transfer to each pot
const GOALS: [key: string, saved: number, goal: number, monthly: number][] = [
  ["emergency", 7400, 9000, 400],
  ["holiday", 1850, 3200, 250],
  ["laptop", 1100, 1600, 150],
  ["deposit", 12600, 40000, 900],
];

const labelContent = ["name", "percent"] as const;

export default function SavingsGoalsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const data = useMemo(
    (): RadialBarDatum[] =>
      GOALS.map(([key, saved, goal]) => ({
        name: t(\`savings.goals.\${key}\`),
        value: saved,
        max: goal,
      })),
    [t],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const saved = GOALS.reduce((sum, [, value]) => sum + value, 0);
  const goal = GOALS.reduce((sum, [, , value]) => sum + value, 0);

  const detail = () => {
    if (selected === null) return t("savings.hint");
    const [, value, target, monthly] = GOALS[selected];
    const remaining = target - value;
    return t("savings.detail", {
      goal: data[selected].name,
      saved: money.format(value),
      target: money.format(target),
      remaining: money.format(remaining),
      months: number.format(Math.ceil(remaining / monthly)),
      monthly: money.format(monthly),
    });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadialBarChart
        data={data}
        innerRadius={0.36}
        labelContent={labelContent}
        format={(value) => money.format(value)}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(saved / goal)}
        centerLabel={t("savings.overall")}
        onClick={(event) => setSelected(event.index)}
        height={340}
        ariaLabel={t("savings.aria")}
      />
      <output aria-live="polite">{detail()}</output>
    </div>
  );
}
`})))()}var Be;function Ve(){return(Ve=e((()=>{Be=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Shape = "threeQuarter" | "full" | "half";

// Use of a server's resources, in percent of their capacity
const RESOURCES: [key: string, used: number][] = [
  ["cpu", 72],
  ["memory", 58],
  ["disk", 86],
  ["network", 31],
];

const SHAPES: Record<Shape, { sweep: number; startAngle: number }> = {
  threeQuarter: { sweep: 270, startAngle: 0 },
  full: { sweep: 360, startAngle: 0 },
  half: { sweep: 180, startAngle: -90 },
};

const percent = (value: number) => \`\${value}%\`;

export default function StylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [shape, setShape] = useState<Shape>("threeQuarter");
  const [rounded, setRounded] = useState(true);
  const [track, setTrack] = useState(true);

  const data = useMemo(
    (): RadialBarDatum[] =>
      RESOURCES.map(([key, used]) => ({
        name: t(\`resources.\${key}\`),
        value: used,
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("shapeLabel")}
          direction="horizontal"
          value={shape}
          onChange={(value) => setShape(value as Shape)}
        >
          {(Object.keys(SHAPES) as Shape[]).map((key) => (
            <Radio key={key} value={key} label={t(\`shapes.\${key}\`)} />
          ))}
        </RadioGroup>
        <Switch checked={rounded} onChange={setRounded} label={t("rounded")} />
        <Switch checked={track} onChange={setTrack} label={t("track")} />
      </HStack>
      <RadialBarChart
        data={data}
        max={100}
        {...SHAPES[shape]}
        rounded={rounded}
        track={track}
        labelContent={["name", "value"]}
        format={percent}
        height={320}
        ariaLabel={t("resourcesAria")}
      />
    </div>
  );
}
`})))()}var He;function Ue(){return(Ue=e((()=>{He=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Order = "survey" | "highest" | "lowest";

// Employee engagement survey: respondents who agree with each statement,
// out of those who answered it
const STATEMENTS: [key: string, agree: number, answered: number][] = [
  ["valued", 312, 418],
  ["goals", 351, 420],
  ["growth", 226, 409],
  ["balance", 268, 415],
  ["manager", 334, 412],
  ["recommend", 297, 417],
];
const ORDERS: Order[] = ["survey", "highest", "lowest"];
const share = ([, agree, answered]: (typeof STATEMENTS)[number]) =>
  agree / answered;

const labelContent = ["name", "percent"] as const;

export default function SurveyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [order, setOrder] = useState<Order>("survey");

  const rows = useMemo(() => {
    if (order === "survey") return STATEMENTS;
    const sign = order === "highest" ? -1 : 1;
    return [...STATEMENTS].sort((a, b) => sign * (share(a) - share(b)));
  }, [order]);
  const data = useMemo(
    (): RadialBarDatum[] =>
      rows.map(([key, agree, answered]) => ({
        name: t(\`survey.statements.\${key}\`),
        value: agree,
        max: answered,
      })),
    [rows, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const average =
    STATEMENTS.reduce((sum, row) => sum + share(row), 0) / STATEMENTS.length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("survey.order")}
        value={order}
        onChange={(value) => setOrder(value as Order)}
      >
        {ORDERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(\`survey.orders.\${key}\`)}
          </SelectItem>
        ))}
      </Select>
      <RadialBarChart
        data={data}
        innerRadius={0.3}
        gap={0.22}
        labelContent={labelContent}
        percentFormat={(value) => percent.format(value)}
        centerValue={percent.format(average)}
        centerLabel={t("survey.average")}
        renderTooltip={(bar) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{bar.name}</strong>
            <span>
              {t("survey.agree", {
                agree: number.format(bar.value),
                answered: number.format(rows[bar.index][2]),
                share: percent.format(bar.percent),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("survey.aria")}
      />
    </div>
  );
}
`})))()}var We;function Ge(){return(Ge=e((()=>{We=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

/** Small seeded random generator: the same upload speeds on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Files being uploaded, with their size in MB
const FILES: [key: string, size: number][] = [
  ["video", 840],
  ["photos", 420],
  ["slides", 96],
  ["backup", 1200],
];
const SEED = 3;
// at most two files are sent at the same time, in this order
const PARALLEL = 2;
const START = FILES.map(() => 0);

const legend = { toggle: false } as const;

export default function UploadsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [sent, setSent] = useState(START);
  const random = useRef(mulberry32(SEED));

  const done = sent.filter((value, i) => value >= FILES[i][1]).length;
  const finished = done === FILES.length;

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      // 20 to 60 MB per tick for each file being sent
      const speeds = FILES.map(() => 20 + random.current() * 40);
      setSent((current) => {
        let slots = PARALLEL;
        return current.map((value, i) => {
          const size = FILES[i][1];
          if (value >= size || slots === 0) return value;
          slots--;
          return Math.min(size, value + speeds[i]);
        });
      });
    }, 400);
    return () => window.clearInterval(timer);
  }, [finished]);

  const data = useMemo(
    (): RadialBarDatum[] =>
      FILES.map(([key, size], i) => ({
        name: t(\`uploads.files.\${key}\`),
        value: sent[i],
        max: size,
      })),
    [sent, t],
  );
  const megabytes = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "megabyte",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const total = FILES.reduce((sum, [, size]) => sum + size, 0);
  const uploaded = sent.reduce((sum, value) => sum + value, 0);

  const restart = () => {
    random.current = mulberry32(SEED);
    setSent(START);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadialBarChart
        data={data}
        sweep={360}
        innerRadius={0.42}
        gap={0.2}
        labels={false}
        legend={legend}
        animation={false}
        format={(value) => megabytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(uploaded / total)}
        centerLabel={t("uploads.uploaded")}
        height={320}
        ariaLabel={t("uploads.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button size="small" variant="outline" onClick={restart}>
          {t("uploads.restart")}
        </Button>
        {/* announced when a file completes, not on every progress tick */}
        <output aria-live="polite">
          {finished
            ? t("uploads.finished", { size: megabytes.format(total) })
            : t("uploads.progress", {
                done: number.format(done),
                files: number.format(FILES.length),
              })}
        </output>
      </HStack>
    </div>
  );
}
`})))()}var Ke,qe,Je;function $(){return($=e((()=>{ce(),fe(),A(),P(),z(),xe(),we(),ke(),je(),Ne(),Fe(),Le(),ze(),Ve(),Ue(),Ge(),t(),ne(),ie(),Ke=n(),qe=te(Object.assign({"./demos/activity.tsx":ae,"./demos/leaderboard.tsx":le,"./demos/okr.tsx":pe,"./demos/quota.tsx":ge,"./demos/savings-goals.tsx":_e,"./demos/styles.tsx":ve,"./demos/survey.tsx":Se,"./demos/uploads.tsx":Ee}),Object.assign({"./demos/activity.tsx":Ae,"./demos/leaderboard.tsx":Me,"./demos/okr.tsx":Pe,"./demos/quota.tsx":Ie,"./demos/savings-goals.tsx":Re,"./demos/styles.tsx":Be,"./demos/survey.tsx":He,"./demos/uploads.tsx":We})),Je=()=>(0,Ke.jsx)(re,{id:`radial-bar-chart`,demos:qe})})))()}$();export{Je as default};