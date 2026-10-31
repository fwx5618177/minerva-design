import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{n as l,t as u}from"./Switch-CHbzff3y.js";import{i as d,r as f}from"./Stack-B3Kr9X_e.js";import{l as ee,n as te,t as ne,u as p}from"./DocPage-CmQtD5jg.js";import{c as m,r as h}from"./shapes-8zuLWo7l.js";function g(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),[n,i]=(0,_.useState)(0),o=t.language,s=(0,_.useMemo)(()=>{let e=new Intl.DateTimeFormat(o,{weekday:`short`,timeZone:`UTC`});return x.map((t,n)=>e.format(Date.UTC(2026,2,2+n)))},[o]),l=x[n],u=(0,_.useMemo)(()=>S.map(t=>({name:e(`rings.${t}`),value:l[t],max:y[t],color:b[t]})),[e,l]),d=S.filter(e=>l[e]>=y[e]).length;return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsx)(a,{"aria-label":e(`dayLabel`),direction:`horizontal`,value:n,onChange:e=>i(Number(e)),children:s.map((e,t)=>(0,v.jsx)(c,{value:t,label:e},e))}),(0,v.jsx)(h,{data:u,sweep:360,innerRadius:.34,gap:.12,centerValue:`${d}/3`,centerLabel:e(`closed`),percentFormat:C,height:320,ariaLabel:e(`activityAria`)})]})}var _,v,y,b,x,S,C;function w(){return(w=e((()=>{_=t(),i(),o(),s(),m(),v=n(),y={move:600,exercise:30,stand:12},b={move:`#fa114f`,exercise:`#92e82a`,stand:`#1eeaef`},x=[{move:520,exercise:34,stand:11},{move:610,exercise:41,stand:12},{move:380,exercise:12,stand:8},{move:705,exercise:55,stand:13},{move:450,exercise:28,stand:10},{move:820,exercise:72,stand:9},{move:290,exercise:6,stand:6}],S=[`move`,`exercise`,`stand`],C=e=>`${Math.round(e*100)}%`})))()}function T(){let{t:e}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),t=(0,E.useMemo)(()=>O.map(([t,n])=>({name:e(`okr.${t}`),value:n})),[e]),n=Math.round(O.reduce((e,[,t])=>e+t,0)/O.length);return(0,D.jsx)(h,{data:t,max:100,innerRadius:.4,labelContent:[`name`,`percent`],percentFormat:k,centerValue:`${n}%`,centerLabel:e(`average`),height:340,ariaLabel:e(`okrAria`)})}var E,D,O,k;function A(){return(A=e((()=>{E=t(),i(),m(),D=n(),O=[[`activation`,82],[`retention`,64],[`nps`,91],[`latency`,47],[`churn`,58]],k=e=>`${Math.round(e*100)}%`})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),n=t.language,i=(0,j.useMemo)(()=>N.map(([t,n,r])=>({name:e(`regions.${t}`),value:n,max:r})),[e]),a=(0,j.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:2});return t=>e.format(t*1e3)},[n]),o=N.reduce((e,[,t])=>e+t,0),s=N.reduce((e,[,,t])=>e+t,0);return(0,M.jsx)(h,{data:i,sweep:180,startAngle:-90,innerRadius:.45,gap:.2,labels:!1,format:a,centerValue:`${Math.round(o/s*100)}%`,centerLabel:e(`ofQuota`),padding:{top:8,bottom:0,left:8,right:8},height:300,ariaLabel:e(`quotaAria`)})}var j,M,N;function P(){return(P=e((()=>{j=t(),i(),m(),M=n(),N=[[`north`,1840,2e3],[`south`,1260,1100],[`east`,980,1400],[`west`,1520,1600]]})))()}function F(){let{t:e}=r(`common`,{keyPrefix:`docs.radial-bar-chart.data`}),[t,n]=(0,I.useState)(`threeQuarter`),[i,o]=(0,I.useState)(!0),[s,l]=(0,I.useState)(!0),f=(0,I.useMemo)(()=>R.map(([t,n])=>({name:e(`resources.${t}`),value:n})),[e]);return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,L.jsxs)(d,{gap:16,wrap:!0,align:`center`,children:[(0,L.jsx)(a,{"aria-label":e(`shapeLabel`),direction:`horizontal`,value:t,onChange:e=>n(e),children:Object.keys(z).map(t=>(0,L.jsx)(c,{value:t,label:e(`shapes.${t}`)},t))}),(0,L.jsx)(u,{checked:i,onChange:o,label:e(`rounded`)}),(0,L.jsx)(u,{checked:s,onChange:l,label:e(`track`)})]}),(0,L.jsx)(h,{data:f,max:100,...z[t],rounded:i,track:s,labelContent:[`name`,`value`],format:B,height:320,ariaLabel:e(`resourcesAria`)})]})}var I,L,R,z,B;function V(){return(V=e((()=>{I=t(),i(),f(),o(),s(),l(),m(),L=n(),R=[[`cpu`,72],[`memory`,58],[`disk`,86],[`network`,31]],z={threeQuarter:{sweep:270,startAngle:0},full:{sweep:360,startAngle:0},half:{sweep:180,startAngle:-90}},B=e=>`${e}%`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo, useState } from "react";
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
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
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
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo, useState } from "react";
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
`})))()}var X,Z,Q;function $(){return($=e((()=>{w(),A(),P(),V(),U(),G(),q(),Y(),t(),te(),p(),X=n(),Z=ee(Object.assign({"./demos/activity.tsx":g,"./demos/okr.tsx":T,"./demos/quota.tsx":re,"./demos/styles.tsx":F}),Object.assign({"./demos/activity.tsx":H,"./demos/okr.tsx":W,"./demos/quota.tsx":K,"./demos/styles.tsx":J})),Q=()=>(0,X.jsx)(ne,{id:`radial-bar-chart`,demos:Z})})))()}$();export{Q as default};