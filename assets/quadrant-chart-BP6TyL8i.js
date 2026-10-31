import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,r as c}from"./CodeBlock-D5dsgj-R.js";import{n as l,t as u}from"./Input-LfOOMgLE.js";import{i as d,o as ee,t as te}from"./Select-CRoh0AwC.js";import{M as f,N as p,w as m}from"./angular-preview-CI0B6PFx.js";import{l as h,n as g,t as _,u as v}from"./DocPage-BbPSunu1.js";import{D as y,g as ne}from"./lu-C56zB3NB.js";import{m as b,o as x}from"./charts-D1JmjIcg.js";function S(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,C.useMemo)(()=>T.map(({key:t,x:n,y:r})=>({label:e(`features.${t}`),x:n,y:r})),[e]),n=(0,C.useMemo)(()=>({topLeft:{label:e(`quickWins`)},topRight:{label:e(`bigBets`)},bottomLeft:{label:e(`fillIns`)},bottomRight:{label:e(`timeSinks`)}}),[e]);return(0,w.jsx)(x,{points:t,quadrants:n,xLabel:e(`effort`),yLabel:e(`impact`),name:e(`feature`),height:320,ariaLabel:e(`featuresAria`)})}var C,w,T;function E(){return(E=e((()=>{C=t(),i(),b(),w=n(),T=[{key:`darkMode`,x:2,y:7.5},{key:`sso`,x:6.5,y:9},{key:`csvExport`,x:1.5,y:6},{key:`offlineSync`,x:9,y:8},{key:`newIcons`,x:2.5,y:2},{key:`pluginApi`,x:8,y:6.5},{key:`customFonts`,x:7,y:2.5},{key:`tooltips`,x:1,y:3.5}]})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,D.useMemo)(()=>O.map(({key:t,share:n,growth:r,revenue:i})=>({label:e(`products.${t}`),x:n,y:r,size:8+Math.sqrt(i)*1.2})),[e]),n=(0,D.useMemo)(()=>({topLeft:{label:e(`stars`),color:`var(--success-color)`},topRight:{label:e(`questionMarks`),color:`var(--warning-color)`},bottomLeft:{label:e(`cashCows`),color:`var(--primary-color)`},bottomRight:{label:e(`dogs`),color:`var(--danger-color)`}}),[e]);return(0,ie.jsx)(x,{points:t,quadrants:n,xDomain:[0,2],xSplit:1,yDomain:[-5,25],ySplit:10,reverseX:!0,xLabel:e(`relativeShare`),yLabel:e(`marketGrowth`),name:e(`product`),height:360,ariaLabel:e(`bcgAria`)})}var D,ie,O;function k(){return(k=e((()=>{D=t(),i(),b(),ie=n(),O=[{key:`cloud`,share:1.6,growth:18,revenue:420},{key:`analytics`,share:.45,growth:22,revenue:95},{key:`mobile`,share:.3,growth:14,revenue:60},{key:`licenses`,share:1.8,growth:3,revenue:610},{key:`support`,share:1.2,growth:5,revenue:280},{key:`hardware`,share:.4,growth:-2,revenue:70},{key:`training`,share:.6,growth:4,revenue:40}]})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[n,i]=(0,A.useState)(I),[a,s]=(0,A.useState)(null),[u,d]=(0,A.useState)({name:``,quadrant:`topLeft`}),[m,h]=(0,A.useState)(null),g=t=>e(P[t]),_=t=>t.label??(t.key?e(`tasks.${t.key}`):e(`newTask`,{n:t.n})),v=n.map(e=>({label:_(e),x:e.x,y:e.y})),y=new Intl.NumberFormat(t.language,{minimumFractionDigits:1,maximumFractionDigits:1}),b=(t,r)=>{let a=p(M,t),o=n.length%3-1,s={n:n.length+1,x:L(r?.x??a.x+o),y:L(r?.y??a.y+o)};i(e=>[...e,s]),h(e(`taskAdded`,{task:_(s),quadrant:g(t)}))},S=e=>{let t=n[e];s(e),d({name:_(t),quadrant:f(M,t.x,t.y)})},C=t=>{if(t.preventDefault(),a===null)return;let r=n[a],o=u.name.trim()||_(r),c=f(M,r.x,r.y)!==u.quadrant,l=p(M,u.quadrant);i(e=>e.map((e,t)=>t===a?{...e,label:o,x:c?l.x:e.x,y:c?l.y:e.y}:e)),h(e(`taskSaved`,{task:o,quadrant:g(u.quadrant)})),s(null)},w=t=>{let r=_(n[t]);i(e=>e.filter((e,n)=>n!==t)),s(null),h(e(`taskRemoved`,{task:r}))},T=t=>{let n=t.endsWith(`Right`),r=t.startsWith(`top`);return(0,j.jsxs)(`div`,{style:{position:`absolute`,[r?`top`:`bottom`]:6,[n?`right`:`left`]:8,display:`flex`,flexDirection:n?`row-reverse`:`row`,alignItems:`center`,gap:6,fontSize:12,fontWeight:600,color:F[t]},children:[(0,j.jsx)(`span`,{children:g(t)}),(0,j.jsx)(c,{size:`xsmall`,variant:`ghost`,label:e(`addTask`,{quadrant:g(t)}),icon:(0,j.jsx)(ne,{}),onClick:()=>b(t),style:{pointerEvents:`auto`}})]})};return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(x,{points:v,quadrants:{topLeft:{color:F.topLeft},topRight:{color:F.topRight},bottomLeft:{color:F.bottomLeft},bottomRight:{color:F.bottomRight}},reverseX:!0,showTicks:!1,axisLabels:{top:e(`important`),bottom:e(`notImportant`),left:e(`urgent`),right:e(`notUrgent`)},onPointDrag:(t,n,r)=>h(e(`taskMoving`,{task:t.label,quadrant:g(r.quadrant)})),onPointDrop:(t,n,r)=>{i(e=>e.map((e,t)=>t===n?{...e,x:L(r.x),y:L(r.y)}:e)),h(e(`taskMoved`,{task:t.label,quadrant:g(r.quadrant)}))},onPointDoubleClick:(e,t)=>S(t),onQuadrantClick:(e,t)=>b(e,t),quadrantContent:{topLeft:T(`topLeft`),topRight:T(`topRight`),bottomLeft:T(`bottomLeft`),bottomRight:T(`bottomRight`)},renderTooltip:t=>(0,j.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,j.jsx)(`strong`,{children:t.label}),(0,j.jsx)(`span`,{children:e(`taskScores`,{urgency:y.format(t.x),importance:y.format(t.y)})})]}),height:360,ariaLabel:e(`boardAria`)}),a!==null&&n[a]&&(0,j.jsxs)(`form`,{onSubmit:C,"aria-label":e(`editTaskAria`,{task:_(n[a])}),style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:8},children:[(0,j.jsx)(l,{"aria-label":e(`taskName`),value:u.name,onChange:e=>d({...u,name:e.target.value})}),(0,j.jsx)(ee,{"aria-label":e(`taskQuadrant`),value:u.quadrant,onChange:e=>d({...u,quadrant:e}),children:N.map(e=>(0,j.jsx)(te,{value:e,children:g(e)},e))}),(0,j.jsx)(o,{type:`submit`,children:e(`save`)}),(0,j.jsx)(o,{type:`button`,color:`neutral`,variant:`outline`,onClick:()=>s(null),children:e(`cancel`)}),(0,j.jsx)(o,{type:`button`,color:`danger`,variant:`outline`,onClick:()=>w(a),children:e(`remove`)})]}),(0,j.jsx)(`p`,{role:`status`,children:m??e(`dragHint`)})]})}var A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{A=t(),i(),a(),s(),u(),d(),b(),m(),y(),j=n(),M={reverseX:!0},N=[`topLeft`,`topRight`,`bottomLeft`,`bottomRight`],P={topLeft:`doFirst`,topRight:`schedule`,bottomLeft:`delegate`,bottomRight:`eliminate`},F={topLeft:`var(--danger-color, #ef4444)`,topRight:`var(--primary-color, #4f46e5)`,bottomLeft:`var(--warning-color, #f59e0b)`,bottomRight:`var(--text-secondary-color, #64748b)`},I=[{key:`loginOutage`,x:9,y:8},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`bookTravel`,x:8,y:3},{key:`inboxZero`,x:2.5,y:2}],L=e=>Math.min(9.5,Math.max(.5,e))})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,z.useState)(null),i=(0,z.useMemo)(()=>V.map(({key:t,x:n,y:r})=>({label:e(`tasks.${t}`),x:n,y:r})),[e]),a=(0,z.useMemo)(()=>({topLeft:{label:e(`doFirst`)},topRight:{label:e(`schedule`)},bottomLeft:{label:e(`delegate`)},bottomRight:{label:e(`eliminate`)}}),[e]);return(0,B.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,B.jsx)(x,{points:i,quadrants:a,reverseX:!0,xLabel:e(`urgency`),yLabel:e(`importance`),name:e(`task`),onPointClick:e=>n(e),height:320,ariaLabel:e(`eisenhowerAria`)}),(0,B.jsx)(`p`,{role:`status`,children:t?e(`taskStatus`,{task:t.label,urgency:t.x,importance:t.y}):e(`clickTask`)})]})}var z,B,V;function H(){return(H=e((()=>{z=t(),i(),b(),B=n(),V=[{key:`loginOutage`,x:9,y:7.2},{key:`taxFiling`,x:7.5,y:8.6},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`mentoring`,x:2,y:7},{key:`bookTravel`,x:8.5,y:3},{key:`meetings`,x:7,y:2},{key:`inboxZero`,x:3,y:2.5},{key:`socialMedia`,x:1.5,y:1}]})))()}function se(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),t=(0,U.useMemo)(()=>W.map(({name:t,x:n,y:r,ours:i})=>i?{label:e(`ourBrand`,{name:t}),x:n,y:r,color:`var(--primary-color)`,size:18}:{label:t,x:n,y:r,color:`var(--text-secondary-color)`}),[e]);return(0,ce.jsx)(x,{points:t,quadrants:{topLeft:{label:e(`bestValue`)},topRight:{label:e(`premium`)},bottomLeft:{label:e(`budget`)},bottomRight:{label:e(`overpriced`)}},showTicks:!1,axisLabels:{top:e(`highQuality`),bottom:e(`lowQuality`),left:e(`lowPrice`),right:e(`highPrice`)},name:e(`brand`),height:340,ariaLabel:e(`positioningAria`)})}var U,ce,W;function G(){return(G=e((()=>{U=t(),i(),b(),ce=n(),W=[{name:`Northwind`,x:3.5,y:7.6,ours:!0},{name:`Contoso`,x:8,y:8.5},{name:`Fabrikam`,x:6.5,y:5.5},{name:`Tailspin`,x:2,y:3},{name:`Litware`,x:4.5,y:4},{name:`Adatum`,x:8.8,y:6.2},{name:`Proseware`,x:1.5,y:5.2}]})))()}function le(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-chart.data`}),[t,n]=(0,K.useState)(null),i=(0,K.useMemo)(()=>J.map(({key:t,likelihood:n,impact:r})=>({label:e(`risks.${t}`),x:n,y:r})),[e]),a=(0,K.useMemo)(()=>({topLeft:{label:e(`monitor`),color:`var(--warning-color)`},topRight:{label:e(`actNow`),color:`var(--danger-color)`},bottomLeft:{label:e(`accept`),color:`var(--success-color)`},bottomRight:{label:e(`mitigate`),color:`var(--warning-color)`}}),[e]);return(0,q.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,q.jsx)(x,{points:i,quadrants:a,xDomain:[1,5],yDomain:[1,5],xSplit:3,ySplit:3,xLabel:e(`likelihood`),yLabel:e(`severity`),name:e(`risk`),onPointClick:e=>n(e.label??null),onQuadrantClick:()=>n(null),height:340,ariaLabel:e(`riskAria`)}),(0,q.jsx)(`p`,{role:`status`,children:t?e(`riskSelected`,{risk:t}):e(`clickRisk`)})]})}var K,q,J;function Y(){return(Y=e((()=>{K=t(),i(),b(),q=n(),J=[{key:`keyPerson`,likelihood:2,impact:4.5},{key:`vendorDelay`,likelihood:4,impact:3.5},{key:`dataBreach`,likelihood:1.5,impact:5},{key:`scopeCreep`,likelihood:4.5,impact:2.5},{key:`budgetCut`,likelihood:2.5,impact:3.5},{key:`regulation`,likelihood:3.5,impact:4.2},{key:`outage`,likelihood:3,impact:2},{key:`turnover`,likelihood:1.5,impact:1.5}]})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo } from "react";
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
`})))()}var Q;function ue(){return(ue=e((()=>{Q=`import { useMemo } from "react";
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
`})))()}var de;function fe(){return(fe=e((()=>{de=`import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, Input, Select, SelectItem } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

const corners: Corner[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

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
// (\`n\`) until they are renamed in the editor (\`label\`)
type Task = { key?: string; n?: number; label?: string; x: number; y: number };
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
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ name: string; quadrant: Corner }>({
    name: "",
    quadrant: "topLeft",
  });
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: Corner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.label ??
    (task.key ? t(\`tasks.\${task.key}\`) : t("newTask", { n: task.n }));
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

  const edit = (index: number) => {
    const task = tasks[index];
    setEditing(index);
    setDraft({
      name: name(task),
      quadrant: quadrantOf(geometry, task.x, task.y),
    });
  };

  // Moving a task to another quadrant puts it at that quadrant's center
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (editing === null) return;
    const task = tasks[editing];
    const label = draft.name.trim() || name(task);
    const moved = quadrantOf(geometry, task.x, task.y) !== draft.quadrant;
    const center = quadrantCenter(geometry, draft.quadrant);
    setTasks((current) =>
      current.map((item, i) =>
        i === editing
          ? {
              ...item,
              label,
              x: moved ? center.x : item.x,
              y: moved ? center.y : item.y,
            }
          : item,
      ),
    );
    setStatus(t("taskSaved", { task: label, quadrant: title(draft.quadrant) }));
    setEditing(null);
  };

  const remove = (index: number) => {
    const label = name(tasks[index]);
    setTasks((current) => current.filter((_, i) => i !== index));
    setEditing(null);
    setStatus(t("taskRemoved", { task: label }));
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
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("taskMoving", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          )
        }
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
        onPointDoubleClick={(_point, index) => edit(index)}
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
      {editing !== null && tasks[editing] && (
        <form
          onSubmit={save}
          aria-label={t("editTaskAria", { task: name(tasks[editing]) })}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Input
            aria-label={t("taskName")}
            value={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <Select
            aria-label={t("taskQuadrant")}
            value={draft.quadrant}
            onChange={(value) =>
              setDraft({ ...draft, quadrant: value as Corner })
            }
          >
            {corners.map((corner) => (
              <SelectItem key={corner} value={corner}>
                {title(corner)}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit">{t("save")}</Button>
          <Button
            type="button"
            color="neutral"
            variant="outline"
            onClick={() => setEditing(null)}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            color="danger"
            variant="outline"
            onClick={() => remove(editing)}
          >
            {t("remove")}
          </Button>
        </form>
      )}
      <p role="status">{status ?? t("dragHint")}</p>
    </div>
  );
}
`})))()}var pe;function me(){return(me=e((()=>{pe=`import { useMemo, useState } from "react";
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
`})))()}var he;function $(){return($=e((()=>{he=`import { useMemo } from "react";
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
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useMemo, useState } from "react";
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
`})))()}var ve,ye,be;function xe(){return(xe=e((()=>{E(),k(),R(),H(),G(),Y(),Z(),ue(),fe(),me(),$(),_e(),t(),g(),v(),ve=n(),ye=h(Object.assign({"./demos/basic.tsx":S,"./demos/bcg.tsx":re,"./demos/draggable.tsx":ae,"./demos/eisenhower.tsx":oe,"./demos/positioning.tsx":se,"./demos/risk.tsx":le}),Object.assign({"./demos/basic.tsx":X,"./demos/bcg.tsx":Q,"./demos/draggable.tsx":de,"./demos/eisenhower.tsx":pe,"./demos/positioning.tsx":he,"./demos/risk.tsx":ge})),be=()=>(0,ve.jsx)(_,{id:`quadrant-chart`,demos:ye})})))()}xe();export{be as default};