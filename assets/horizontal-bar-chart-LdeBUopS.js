import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{l as a,n as o,t as s,u as c}from"./DocPage-JhXgs5p-.js";import{a as l,m as u}from"./charts-D2ZjxGuy.js";function ee(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,d.useMemo)(()=>[{name:e(`developers`),data:p}],[e]),a=(0,d.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t/100)},[n]);return(0,f.jsx)(l,{series:i,labels:!0,yAxis:{format:a},height:340,ariaLabel:e(`languagesAria`)})}var d,f,p;function m(){return(m=e((()=>{d=t(),i(),u(),f=n(),p=[[`JavaScript`,62.3],[`Python`,51],[`TypeScript`,43.4],[`Java`,30.3],[`C#`,27.1],[`Go`,17.7],[`Rust`,15.2],[`Kotlin`,10.1],[`Swift`,8.4],[`Ruby`,5.9]]})))()}function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,h.useMemo)(()=>{let t=_.map(t=>e(`statements.${t}`)),n=[{key:`stronglyDisagree`,sign:-1,index:0,color:`#dc2626`},{key:`disagree`,sign:-1,index:1,color:`#f87171`},{key:`agree`,sign:1,index:2,color:`#34d399`},{key:`stronglyAgree`,sign:1,index:3,color:`#059669`}];return[n[1],n[0],n[2],n[3]].map(n=>({name:e(`likert.${n.key}`),color:n.color,data:_.map((e,r)=>[t[r]??e,n.sign*v[e][n.index]])}))},[e]),a=(0,h.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`});return t=>e.format(Math.abs(t)/100)},[n]);return(0,g.jsx)(l,{series:i,stacked:!0,yAxis:{format:a},annotations:[{type:`line`,axis:`y`,value:0,dash:[]}],legend:{position:`bottom`},height:320,ariaLabel:e(`surveyAria`)})}var h,g,_,v;function y(){return(y=e((()=>{h=t(),i(),u(),g=n(),_=[`career`,`workload`,`tools`,`manager`,`pay`],v={career:[12,24,41,15],workload:[18,30,36,9],tools:[5,14,49,27],manager:[4,9,44,39],pay:[21,33,31,8]}})))()}function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,b.useMemo)(()=>{let t=Object.keys(S);return[`budget`,`actual`].map((n,r)=>({name:e(n),data:t.map(t=>[e(`departments.${t}`),S[t][r]??0])}))},[e]),a=(0,b.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`});return t=>e.format(t*1e3)},[n]);return(0,x.jsx)(l,{series:i,yAxis:{format:a},height:340,ariaLabel:e(`budgetAria`)})}var b,x,S;function C(){return(C=e((()=>{b=t(),i(),u(),x=n(),S={engineering:[1450,1520],marketing:[620,540],sales:[880,910],support:[310,295],finance:[240,228]}})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>[{name:e(`votes`),color:`var(--chart-series-5, #0ea5e9)`,data:E.map(([t,n])=>[e(`features.${t}`),n])}],[e]),a=(0,w.useMemo)(()=>new Intl.NumberFormat(n),[n]);return(0,T.jsx)(l,{series:i,labels:!0,yAxis:{format:e=>a.format(e),title:e(`votes`)},height:300,ariaLabel:e(`featuresAria`)})}var w,T,E;function D(){return(D=e((()=>{w=t(),i(),u(),T=n(),E=[[`darkMode`,1842],[`offlineMode`,1310],[`exportPdf`,1104],[`sso`,960],[`calendarSync`,712],[`bulkEdit`,655],[`customFields`,489]]})))()}function O(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),n=t.language,i=(0,k.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1,signDisplay:`exceptZero`});return t=>e.format(t/100)},[n]),a=(0,k.useMemo)(()=>[{name:e(`growth`),format:i,data:j.map(([t,n])=>({x:e(`regions.${t}`),y:n,color:n>=0?`var(--success-color, #16a34a)`:`var(--danger-color, #dc2626)`}))}],[e,i]);return(0,A.jsx)(l,{series:a,labels:!0,yAxis:{format:i},height:300,ariaLabel:e(`growthAria`)})}var k,A,j;function M(){return(M=e((()=>{k=t(),i(),u(),A=n(),j=[[`northAmerica`,6.4],[`europe`,3.1],[`asiaPacific`,11.8],[`latinAmerica`,-2.7],[`middleEast`,-5.2],[`africa`,8.9]]})))()}function N(){let{t:e}=r(`common`,{keyPrefix:`docs.horizontal-bar-chart.data`}),t=(0,P.useMemo)(()=>{let t=Object.keys(I);return[{key:`done`,color:`var(--success-color, #16a34a)`},{key:`review`,color:`var(--warning-color, #f59e0b)`},{key:`todo`,color:`var(--border-color, #cbd5e1)`}].map((n,r)=>({name:e(`status.${n.key}`),color:n.color,data:t.map(t=>[e(`teams.${t}`),I[t][r]??0])}))},[e]);return(0,F.jsx)(l,{series:t,percent:!0,height:280,ariaLabel:e(`progressAria`)})}var P,F,I;function L(){return(L=e((()=>{P=t(),i(),u(),F=n(),I={platform:[42,6,12],payments:[18,9,21],mobile:[30,4,4],growth:[11,7,26],design:[24,2,3]}})))()}var R;function z(){return(z=e((()=>{R=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Share of developers using each language (%), survey of 2026
const languages: [string, number][] = [
  ["JavaScript", 62.3],
  ["Python", 51.0],
  ["TypeScript", 43.4],
  ["Java", 30.3],
  ["C#", 27.1],
  ["Go", 17.7],
  ["Rust", 15.2],
  ["Kotlin", 10.1],
  ["Swift", 8.4],
  ["Ruby", 5.9],
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // ranked from the top: the first category is drawn at the top
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("developers"), data: languages }],
    [t],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={340}
      ariaLabel={t("languagesAria")}
    />
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Answers to an employee survey (% of respondents); disagreement is drawn
// to the left of zero, agreement to the right
const statements = ["career", "workload", "tools", "manager", "pay"] as const;
const answers: Record<
  (typeof statements)[number],
  [number, number, number, number]
> = {
  // strongly disagree, disagree, agree, strongly agree
  career: [12, 24, 41, 15],
  workload: [18, 30, 36, 9],
  tools: [5, 14, 49, 27],
  manager: [4, 9, 44, 39],
  pay: [21, 33, 31, 8],
};

export default function DivergingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const rows = statements.map((s) => t(\`statements.\${s}\`));
    const scale = [
      { key: "stronglyDisagree", sign: -1, index: 0, color: "#dc2626" },
      { key: "disagree", sign: -1, index: 1, color: "#f87171" },
      { key: "agree", sign: 1, index: 2, color: "#34d399" },
      { key: "stronglyAgree", sign: 1, index: 3, color: "#059669" },
    ] as const;
    // the inner answers first, so that they touch zero
    return [scale[1], scale[0], scale[2], scale[3]].map((level) => ({
      name: t(\`likert.\${level.key}\`),
      color: level.color,
      data: statements.map(
        (s, i) => [rows[i] ?? s, level.sign * answers[s][level.index]] as const,
      ),
    }));
  }, [t]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    // both sides are positive shares
    return (value: number) => format.format(Math.abs(value) / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      stacked
      yAxis={{ format: percent }}
      annotations={[{ type: "line", axis: "y", value: 0, dash: [] }]}
      legend={{ position: "bottom" }}
      height={320}
      ariaLabel={t("surveyAria")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Yearly budget and actual spend per department (k€)
const departments = {
  engineering: [1450, 1520],
  marketing: [620, 540],
  sales: [880, 910],
  support: [310, 295],
  finance: [240, 228],
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(departments) as (keyof typeof departments)[];
    return (["budget", "actual"] as const).map((name, k) => ({
      name: t(name),
      data: keys.map(
        (d) => [t(\`departments.\${d}\`), departments[d][k] ?? 0] as const,
      ),
    }));
  }, [t]);
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      yAxis={{ format: euros }}
      height={340}
      ariaLabel={t("budgetAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Votes of the most requested features of a public roadmap
const requests = [
  ["darkMode", 1842],
  ["offlineMode", 1310],
  ["exportPdf", 1104],
  ["sso", 960],
  ["calendarSync", 712],
  ["bulkEdit", 655],
  ["customFields", 489],
] as const;

export default function LongLabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // long names read naturally on the left, without rotated labels
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("votes"),
        color: "var(--chart-series-5, #0ea5e9)",
        data: requests.map(
          ([key, votes]) => [t(\`features.\${key}\`), votes] as const,
        ),
      },
    ],
    [t],
  );
  const integer = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: (value) => integer.format(value), title: t("votes") }}
      height={300}
      ariaLabel={t("featuresAria")}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Change of the monthly active users per region since last quarter (%)
const changes = [
  ["northAmerica", 6.4],
  ["europe", 3.1],
  ["asiaPacific", 11.8],
  ["latinAmerica", -2.7],
  ["middleEast", -5.2],
  ["africa", 8.9],
] as const;

export default function NegativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  // negative values grow to the left of zero; each bar sets its color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("growth"),
        format: percent,
        data: changes.map(([region, value]) => ({
          x: t(\`regions.\${region}\`),
          y: value,
          color:
            value >= 0
              ? "var(--success-color, #16a34a)"
              : "var(--danger-color, #dc2626)",
        })),
      },
    ],
    [t, percent],
  );

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={300}
      ariaLabel={t("growthAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Issues of the current milestone per team: done, in review, to do
const teams = {
  platform: [42, 6, 12],
  payments: [18, 9, 21],
  mobile: [30, 4, 4],
  growth: [11, 7, 26],
  design: [24, 2, 3],
};

export default function ProgressDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(teams) as (keyof typeof teams)[];
    const status = [
      { key: "done", color: "var(--success-color, #16a34a)" },
      { key: "review", color: "var(--warning-color, #f59e0b)" },
      { key: "todo", color: "var(--border-color, #cbd5e1)" },
    ] as const;
    return status.map((s, k) => ({
      name: t(\`status.\${s.key}\`),
      color: s.color,
      data: keys.map(
        (team) => [t(\`teams.\${team}\`), teams[team][k] ?? 0] as const,
      ),
    }));
  }, [t]);

  // percent: every team fills the width; the tooltip keeps the counts
  return (
    <HorizontalBarChart
      series={series}
      percent
      height={280}
      ariaLabel={t("progressAria")}
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{m(),y(),C(),D(),M(),L(),z(),V(),U(),G(),q(),Y(),t(),o(),c(),X=n(),Z=a(Object.assign({"./demos/basic.tsx":ee,"./demos/diverging.tsx":te,"./demos/grouped.tsx":ne,"./demos/long-labels.tsx":re,"./demos/negative.tsx":O,"./demos/progress.tsx":N}),Object.assign({"./demos/basic.tsx":R,"./demos/diverging.tsx":B,"./demos/grouped.tsx":H,"./demos/long-labels.tsx":W,"./demos/negative.tsx":K,"./demos/progress.tsx":J})),Q=()=>(0,X.jsx)(s,{id:`horizontal-bar-chart`,demos:Z})})))()}$();export{Q as default};