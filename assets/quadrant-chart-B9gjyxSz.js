import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DNQTyaNH.js";import{i as a,r as o}from"./CodeBlock-CJOpG7_Q.js";import{N as ee,w as s}from"./angular-preview-CI0B6PFx.js";import{l as c,n as l,t as u,u as d}from"./DocPage-CfPUO8JU.js";import{D as f,g as te}from"./lu-BxR8fmLv.js";import{m as p,u as m}from"./charts-BgGG_T8i.js";function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,h.useMemo)(()=>_.map(({key:t,x:n,y:r})=>({label:e(`features.${t}`),x:n,y:r})),[e]),n=(0,h.useMemo)(()=>({topLeft:{label:e(`quickWins`)},topRight:{label:e(`bigBets`)},bottomLeft:{label:e(`fillIns`)},bottomRight:{label:e(`timeSinks`)}}),[e]);return(0,g.jsx)(m,{points:t,quadrants:n,xLabel:e(`effort`),yLabel:e(`impact`),name:e(`feature`),height:320,ariaLabel:e(`featuresAria`)})}var h,g,_;function v(){return(v=e((()=>{h=t(),i(),p(),g=n(),_=[{key:`darkMode`,x:2,y:7.5},{key:`sso`,x:6.5,y:9},{key:`csvExport`,x:1.5,y:6},{key:`offlineSync`,x:9,y:8},{key:`newIcons`,x:2.5,y:2},{key:`pluginApi`,x:8,y:6.5},{key:`customFonts`,x:7,y:2.5},{key:`tooltips`,x:1,y:3.5}]})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,y.useMemo)(()=>x.map(({key:t,share:n,growth:r,revenue:i})=>({label:e(`products.${t}`),x:n,y:r,size:8+Math.sqrt(i)*1.2})),[e]),n=(0,y.useMemo)(()=>({topLeft:{label:e(`stars`),color:`var(--success-color)`},topRight:{label:e(`questionMarks`),color:`var(--warning-color)`},bottomLeft:{label:e(`cashCows`),color:`var(--primary-color)`},bottomRight:{label:e(`dogs`),color:`var(--danger-color)`}}),[e]);return(0,b.jsx)(m,{points:t,quadrants:n,xDomain:[0,2],xSplit:1,yDomain:[-5,25],ySplit:10,reverseX:!0,xLabel:e(`relativeShare`),yLabel:e(`marketGrowth`),name:e(`product`),height:360,ariaLabel:e(`bcgAria`)})}var y,b,x;function ie(){return(ie=e((()=>{y=t(),i(),p(),b=n(),x=[{key:`cloud`,share:1.6,growth:18,revenue:420},{key:`analytics`,share:.45,growth:22,revenue:95},{key:`mobile`,share:.3,growth:14,revenue:60},{key:`licenses`,share:1.8,growth:3,revenue:610},{key:`support`,share:1.2,growth:5,revenue:280},{key:`hardware`,share:.4,growth:-2,revenue:70},{key:`training`,share:.6,growth:4,revenue:40}]})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,S.useState)(D),[a,s]=(0,S.useState)(null),c=t=>e(T[t]),l=t=>t.key?e(`tasks.${t.key}`):e(`newTask`,{n:t.n}),u=n.map(e=>({label:l(e),x:e.x,y:e.y})),d=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),f=(t,r)=>{let a=ee(w,t),o=n.length%3-1,u={n:n.length+1,x:O(r?.x??a.x+o),y:O(r?.y??a.y+o)};i(e=>[...e,u]),s(e(`taskAdded`,{task:l(u),quadrant:c(t)}))},p=t=>{let n=t.endsWith(`Right`),r=t.startsWith(`top`);return(0,C.jsxs)(`div`,{style:{position:`absolute`,[r?`top`:`bottom`]:6,[n?`right`:`left`]:8,display:`flex`,flexDirection:n?`row-reverse`:`row`,alignItems:`center`,gap:6,fontSize:12,fontWeight:600,color:E[t]},children:[(0,C.jsx)(`span`,{children:c(t)}),(0,C.jsx)(o,{size:`xsmall`,variant:`ghost`,label:e(`addTask`,{quadrant:c(t)}),icon:(0,C.jsx)(te,{}),onClick:()=>f(t),style:{pointerEvents:`auto`}})]})};return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,C.jsx)(m,{points:u,quadrants:{topLeft:{color:E.topLeft},topRight:{color:E.topRight},bottomLeft:{color:E.bottomLeft},bottomRight:{color:E.bottomRight}},reverseX:!0,showTicks:!1,axisLabels:{top:e(`important`),bottom:e(`notImportant`),left:e(`urgent`),right:e(`notUrgent`)},onPointDrop:(t,n,r)=>{i(e=>e.map((e,t)=>t===n?{...e,x:O(r.x),y:O(r.y)}:e)),s(e(`taskMoved`,{task:t.label,quadrant:c(r.quadrant)}))},onQuadrantClick:(e,t)=>f(e,t),quadrantContent:{topLeft:p(`topLeft`),topRight:p(`topRight`),bottomLeft:p(`bottomLeft`),bottomRight:p(`bottomRight`)},renderTooltip:t=>(0,C.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,C.jsx)(`strong`,{children:t.label}),(0,C.jsx)(`span`,{children:e(`taskScores`,{urgency:d.format(t.x),importance:d.format(t.y)})})]}),height:360,ariaLabel:e(`boardAria`)}),(0,C.jsx)(`p`,{role:`status`,children:a??e(`dragHint`)})]})}var S,C,w,T,E,D,O;function k(){return(k=e((()=>{S=t(),i(),a(),p(),s(),f(),C=n(),w={reverseX:!0},T={topLeft:`doFirst`,topRight:`schedule`,bottomLeft:`delegate`,bottomRight:`eliminate`},E={topLeft:`var(--danger-color, #ef4444)`,topRight:`var(--primary-color, #4f46e5)`,bottomLeft:`var(--warning-color, #f59e0b)`,bottomRight:`var(--text-secondary-color, #64748b)`},D=[{key:`loginOutage`,x:9,y:8},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`bookTravel`,x:8,y:3},{key:`inboxZero`,x:2.5,y:2}],O=e=>Math.min(9.5,Math.max(.5,e))})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,A.useState)(null),i=(0,A.useMemo)(()=>M.map(({key:t,x:n,y:r})=>({label:e(`tasks.${t}`),x:n,y:r})),[e]),a=(0,A.useMemo)(()=>({topLeft:{label:e(`doFirst`)},topRight:{label:e(`schedule`)},bottomLeft:{label:e(`delegate`)},bottomRight:{label:e(`eliminate`)}}),[e]);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(m,{points:i,quadrants:a,reverseX:!0,xLabel:e(`urgency`),yLabel:e(`importance`),name:e(`task`),onPointClick:e=>n(e),height:320,ariaLabel:e(`eisenhowerAria`)}),(0,j.jsx)(`p`,{role:`status`,children:t?e(`taskStatus`,{task:t.label,urgency:t.x,importance:t.y}):e(`clickTask`)})]})}var A,j,M;function N(){return(N=e((()=>{A=t(),i(),p(),j=n(),M=[{key:`loginOutage`,x:9,y:7.2},{key:`taxFiling`,x:7.5,y:8.6},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`mentoring`,x:2,y:7},{key:`bookTravel`,x:8.5,y:3},{key:`meetings`,x:7,y:2},{key:`inboxZero`,x:3,y:2.5},{key:`socialMedia`,x:1.5,y:1}]})))()}function se(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,P.useMemo)(()=>I.map(({name:t,x:n,y:r,ours:i})=>i?{label:e(`ourBrand`,{name:t}),x:n,y:r,color:`var(--primary-color)`,size:18}:{label:t,x:n,y:r,color:`var(--text-secondary-color)`}),[e]);return(0,F.jsx)(m,{points:t,quadrants:{topLeft:{label:e(`bestValue`)},topRight:{label:e(`premium`)},bottomLeft:{label:e(`budget`)},bottomRight:{label:e(`overpriced`)}},showTicks:!1,axisLabels:{top:e(`highQuality`),bottom:e(`lowQuality`),left:e(`lowPrice`),right:e(`highPrice`)},name:e(`brand`),height:340,ariaLabel:e(`positioningAria`)})}var P,F,I;function L(){return(L=e((()=>{P=t(),i(),p(),F=n(),I=[{name:`Northwind`,x:3.5,y:7.6,ours:!0},{name:`Contoso`,x:8,y:8.5},{name:`Fabrikam`,x:6.5,y:5.5},{name:`Tailspin`,x:2,y:3},{name:`Litware`,x:4.5,y:4},{name:`Adatum`,x:8.8,y:6.2},{name:`Proseware`,x:1.5,y:5.2}]})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,R.useState)(null),i=(0,R.useMemo)(()=>B.map(({key:t,likelihood:n,impact:r})=>({label:e(`risks.${t}`),x:n,y:r})),[e]),a=(0,R.useMemo)(()=>({topLeft:{label:e(`monitor`),color:`var(--warning-color)`},topRight:{label:e(`actNow`),color:`var(--danger-color)`},bottomLeft:{label:e(`accept`),color:`var(--success-color)`},bottomRight:{label:e(`mitigate`),color:`var(--warning-color)`}}),[e]);return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,z.jsx)(m,{points:i,quadrants:a,xDomain:[1,5],yDomain:[1,5],xSplit:3,ySplit:3,xLabel:e(`likelihood`),yLabel:e(`severity`),name:e(`risk`),onPointClick:e=>n(e.label??null),onQuadrantClick:()=>n(null),height:340,ariaLabel:e(`riskAria`)}),(0,z.jsx)(`p`,{role:`status`,children:t?e(`riskSelected`,{risk:t}):e(`clickRisk`)})]})}var R,z,B;function V(){return(V=e((()=>{R=t(),i(),p(),z=n(),B=[{key:`keyPerson`,likelihood:2,impact:4.5},{key:`vendorDelay`,likelihood:4,impact:3.5},{key:`dataBreach`,likelihood:1.5,impact:5},{key:`scopeCreep`,likelihood:4.5,impact:2.5},{key:`budgetCut`,likelihood:2.5,impact:3.5},{key:`regulation`,likelihood:3.5,impact:4.2},{key:`outage`,likelihood:3,impact:2},{key:`turnover`,likelihood:1.5,impact:1.5}]})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: effort, y: impact (0-10)
const features = [
  { key: "darkMode", x: 2, y: 7.5 },
  { key: "sso", x: 6.5, y: 9 },
  { key: "csvExport", x: 1.5, y: 6 },
  { key: "offlineSync", x: 9, y: 8 },
  { key: "newIcons", x: 2.5, y: 2 },
  { key: "pluginApi", x: 8, y: 6.5 },
  { key: "customFonts", x: 7, y: 2.5 },
  { key: "tooltips", x: 1, y: 3.5 },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      features.map(({ key, x, y }) => ({ label: t(\`features.\${key}\`), x, y })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("quickWins") },
      topRight: { label: t("bigBets") },
      bottomLeft: { label: t("fillIns") },
      bottomRight: { label: t("timeSinks") },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xLabel={t("effort")}
      yLabel={t("impact")}
      name={t("feature")}
      height={320}
      ariaLabel={t("featuresAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// BCG matrix of a product portfolio. x: relative market share (our share /
// the leader's share, 1 = leader), y: market growth (% per year), revenue in
// million USD sets the size of the dots
const products = [
  { key: "cloud", share: 1.6, growth: 18, revenue: 420 },
  { key: "analytics", share: 0.45, growth: 22, revenue: 95 },
  { key: "mobile", share: 0.3, growth: 14, revenue: 60 },
  { key: "licenses", share: 1.8, growth: 3, revenue: 610 },
  { key: "support", share: 1.2, growth: 5, revenue: 280 },
  { key: "hardware", share: 0.4, growth: -2, revenue: 70 },
  { key: "training", share: 0.6, growth: 4, revenue: 40 },
];

export default function BcgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      products.map(({ key, share, growth, revenue }) => ({
        label: t(\`products.\${key}\`),
        x: share,
        y: growth,
        size: 8 + Math.sqrt(revenue) * 1.2,
      })),
    [t],
  );
  // reverseX: by convention the high shares are on the left
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("stars"), color: "var(--success-color)" },
      topRight: { label: t("questionMarks"), color: "var(--warning-color)" },
      bottomLeft: { label: t("cashCows"), color: "var(--primary-color)" },
      bottomRight: { label: t("dogs"), color: "var(--danger-color)" },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xDomain={[0, 2]}
      xSplit={1}
      yDomain={[-5, 25]}
      ySplit={10}
      reverseX
      xLabel={t("relativeShare")}
      yLabel={t("marketGrowth")}
      name={t("product")}
      height={360}
      ariaLabel={t("bcgAria")}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

// translation keys of the quadrant titles
const titleKeys: Record<Corner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// Same tints as the default quadrant colors
const colors: Record<Corner, string> = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
};

// task names are translated when rendered (\`key\`), added tasks are numbered
type Task = { key?: string; n?: number; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function DraggableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: Corner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.key ? t(\`tasks.\${task.key}\`) : t("newTask", { n: task.n });
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: Corner, at?: { x: number; y: number }) => {
    const center = quadrantCenter(geometry, corner);
    // Offset new tasks a little so they do not stack on the same spot
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(at?.x ?? center.x + jitter),
      y: clamp(at?.y ?? center.y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  // Title + add button drawn over each quadrant, in its outer corner
  const header = (corner: Corner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 6,
          [right ? "right" : "left"]: 8,
          display: "flex",
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: colors[corner],
        }}
      >
        <span>{title(corner)}</span>
        <IconButton
          size="xsmall"
          variant="ghost"
          label={t("addTask", { quadrant: title(corner) })}
          icon={<LuPlus />}
          onClick={() => add(corner)}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: colors.topLeft },
          topRight: { color: colors.topRight },
          bottomLeft: { color: colors.bottomLeft },
          bottomRight: { color: colors.bottomRight },
        }}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onQuadrantClick={(corner, at) => add(corner, at)}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
        renderTooltip={(point) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{point.label}</strong>
            <span>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("boardAria")}
      />
      <p role="status">{status ?? t("dragHint")}</p>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// x: urgency, y: importance (0-10)
const tasks = [
  { key: "loginOutage", x: 9, y: 7.2 },
  { key: "taxFiling", x: 7.5, y: 8.6 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "mentoring", x: 2, y: 7 },
  { key: "bookTravel", x: 8.5, y: 3 },
  { key: "meetings", x: 7, y: 2 },
  { key: "inboxZero", x: 3, y: 2.5 },
  { key: "socialMedia", x: 1.5, y: 1 },
];

export default function EisenhowerDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<QuadrantPoint | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      tasks.map(({ key, x, y }) => ({ label: t(\`tasks.\${key}\`), x, y })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("doFirst") },
      topRight: { label: t("schedule") },
      bottomLeft: { label: t("delegate") },
      bottomRight: { label: t("eliminate") },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        reverseX
        xLabel={t("urgency")}
        yLabel={t("importance")}
        name={t("task")}
        onPointClick={(point) => setSelected(point)}
        height={320}
        ariaLabel={t("eisenhowerAria")}
      />
      <p role="status">
        {selected
          ? t("taskStatus", {
              task: selected.label,
              urgency: selected.x,
              importance: selected.y,
            })
          : t("clickTask")}
      </p>
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

// Perceptual map from a customer survey. x: price, y: perceived quality (0-10)
const brands = [
  { name: "Northwind", x: 3.5, y: 7.6, ours: true },
  { name: "Contoso", x: 8, y: 8.5 },
  { name: "Fabrikam", x: 6.5, y: 5.5 },
  { name: "Tailspin", x: 2, y: 3 },
  { name: "Litware", x: 4.5, y: 4 },
  { name: "Adatum", x: 8.8, y: 6.2 },
  { name: "Proseware", x: 1.5, y: 5.2 },
];

export default function PositioningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  // our brand gets its own color and a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      brands.map(({ name, x, y, ours }) =>
        ours
          ? {
              label: t("ourBrand", { name }),
              x,
              y,
              color: "var(--primary-color)",
              size: 18,
            }
          : { label: name, x, y, color: "var(--text-secondary-color)" },
      ),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={{
        topLeft: { label: t("bestValue") },
        topRight: { label: t("premium") },
        bottomLeft: { label: t("budget") },
        bottomRight: { label: t("overpriced") },
      }}
      showTicks={false}
      axisLabels={{
        top: t("highQuality"),
        bottom: t("lowQuality"),
        left: t("lowPrice"),
        right: t("highPrice"),
      }}
      name={t("brand")}
      height={340}
      ariaLabel={t("positioningAria")}
    />
  );
}
`})))()}var Q;function le(){return(le=e((()=>{Q=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// Project risks scored from 1 to 5. x: likelihood, y: impact
const risks = [
  { key: "keyPerson", likelihood: 2, impact: 4.5 },
  { key: "vendorDelay", likelihood: 4, impact: 3.5 },
  { key: "dataBreach", likelihood: 1.5, impact: 5 },
  { key: "scopeCreep", likelihood: 4.5, impact: 2.5 },
  { key: "budgetCut", likelihood: 2.5, impact: 3.5 },
  { key: "regulation", likelihood: 3.5, impact: 4.2 },
  { key: "outage", likelihood: 3, impact: 2 },
  { key: "turnover", likelihood: 1.5, impact: 1.5 },
];

export default function RiskDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<string | null>(null);

  const points = useMemo(
    (): QuadrantPoint[] =>
      risks.map(({ key, likelihood, impact }) => ({
        label: t(\`risks.\${key}\`),
        x: likelihood,
        y: impact,
      })),
    [t],
  );
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("monitor"), color: "var(--warning-color)" },
      topRight: { label: t("actNow"), color: "var(--danger-color)" },
      bottomLeft: { label: t("accept"), color: "var(--success-color)" },
      bottomRight: { label: t("mitigate"), color: "var(--warning-color)" },
    }),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={quadrants}
        xDomain={[1, 5]}
        yDomain={[1, 5]}
        xSplit={3}
        ySplit={3}
        xLabel={t("likelihood")}
        yLabel={t("severity")}
        name={t("risk")}
        onPointClick={(point) => setSelected(point.label ?? null)}
        onQuadrantClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("riskAria")}
      />
      <p role="status">
        {selected ? t("riskSelected", { risk: selected }) : t("clickRisk")}
      </p>
    </div>
  );
}
`})))()}var ue,de,fe;function $(){return($=e((()=>{v(),ie(),k(),N(),L(),V(),U(),G(),q(),Y(),Z(),le(),t(),l(),d(),ue=n(),de=c(Object.assign({"./demos/basic.tsx":ne,"./demos/bcg.tsx":re,"./demos/draggable.tsx":ae,"./demos/eisenhower.tsx":oe,"./demos/positioning.tsx":se,"./demos/risk.tsx":ce}),Object.assign({"./demos/basic.tsx":H,"./demos/bcg.tsx":W,"./demos/draggable.tsx":K,"./demos/eisenhower.tsx":J,"./demos/positioning.tsx":X,"./demos/risk.tsx":Q})),fe=()=>(0,ue.jsx)(u,{id:`quadrant-chart`,demos:de})})))()}$();export{fe as default};