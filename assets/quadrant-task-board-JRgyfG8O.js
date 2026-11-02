import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DCfTAA6w.js";import{B as a,R as o,V as s,z as c}from"./ProgressIndicator-Har2Rnl4.js";import{i as l,r as u}from"./CodeBlock-BJ07eATS.js";import{n as ee,t as d}from"./Input-vrV6fRUF.js";import{a as f,c as te,l as p,n as ne}from"./Modal-DYBJeGz_.js";import{a as m,i as h}from"./Confirm-D9okUmXp.js";import{i as g,o as _,t as v}from"./Select-DPf5fWSY.js";import{n as y,t as b}from"./quadrantTaskBoard.module.scss-D1tnodxC.js";import{E as x,M as re,x as ie}from"./angular-preview-DI1xkB30.js";import{a as S,c as C,d as ae,i as oe,l as w,n as se,o as T,r as E,s as D,t as ce,u as le,w as ue,x as O}from"./angular-preview-XjhBQxNR.js";import{i as de,p as k}from"./charts-ByEzoY4T.js";import{l as A,n as j,t as fe,u as pe}from"./DocPage-B9A8Jzu-.js";function M({kind:e}){return(0,F.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,F.jsx)(`path`,{d:w[e]})})}function N({points:e,onPointsChange:t,labels:n,...r}){let{language:i}=a(),o=r.locale??i,[s,l]=(0,P.useState)(null),[d,f]=(0,P.useState)(null),[m,g]=(0,P.useState)(null),b=S(o,n),x={xDomain:r.xDomain,yDomain:r.yDomain,xSplit:r.xSplit,ySplit:r.ySplit,reverseX:r.reverseX},w=ie(o),T=e=>r.quadrants?.[e]?.label||w[e],O=g,k=t=>l(le(x,e,t)),A=n=>{n.preventDefault();let r=D(x,e,s);r&&(t(r.points),O(r.index),l(null))},j=s!==null&&(s.index===null||!!e[s.index]);return(0,F.jsxs)(`div`,{className:y.board,children:[(0,F.jsx)(de,{...r,locale:o,points:e,selectedIndex:r.selectedIndex===void 0?m:r.selectedIndex,onPointClick:(e,t)=>{O(t),r.onPointClick?.(e,t)},onPointDrop:(n,r,i)=>{t(ae(e,r,i)),O(r)},onQuadrantClick:(e,t)=>l(C(x,e,t)),onPointDoubleClick:(e,t)=>k(t),renderPointActions:(e,t)=>(0,F.jsxs)(`div`,{role:`toolbar`,"aria-label":b.actions,className:y.actions,onPointerDown:e=>e.stopPropagation(),children:[(0,F.jsx)(u,{size:`small`,variant:`ghost`,label:b.edit,icon:(0,F.jsx)(M,{kind:`edit`}),onClick:()=>k(t)}),(0,F.jsx)(u,{size:`small`,variant:`ghost`,color:`danger`,label:b.delete,icon:(0,F.jsx)(M,{kind:`delete`}),onClick:()=>f(t)})]}),renderQuadrantHeader:(e,t)=>(0,F.jsxs)(`div`,{className:y.header,"data-corner":e,children:[t.region?.badge?(0,F.jsx)(`span`,{className:y.badge,children:t.region.badge}):null,(0,F.jsx)(`span`,{className:y.title,children:T(e)}),r.showCounts===!1?null:(0,F.jsx)(`span`,{className:y.count,children:re(r.showCounts??!0,t.points,o)}),(0,F.jsx)(u,{size:`xsmall`,variant:`ghost`,className:y.add,label:`${b.add} · ${T(e)}`,icon:(0,F.jsx)(M,{kind:`add`}),onClick:()=>l(C(x,e))})]})}),(0,F.jsx)(ne,{open:j,onOpenChange:e=>{e||l(null)},title:s?.index===null?b.add:b.edit,size:`small`,children:(0,F.jsxs)(`form`,{onSubmit:A,children:[(0,F.jsxs)(te,{className:y.form,children:[(0,F.jsxs)(`label`,{className:y.field,children:[(0,F.jsx)(`span`,{children:b.name}),(0,F.jsx)(ee,{required:!0,value:s?.label??``,"aria-label":b.name,onChange:e=>{let t=e.target.value;l(e=>e&&{...e,label:t})}})]}),(0,F.jsxs)(`label`,{className:y.field,children:[(0,F.jsx)(`span`,{children:b.quadrant}),(0,F.jsx)(_,{value:s?.quadrant??`topLeft`,"aria-label":b.quadrant,onChange:e=>l(t=>t&&{...t,quadrant:e}),children:ue.map(e=>(0,F.jsx)(v,{value:e,children:T(e)},e))})]})]}),(0,F.jsxs)(p,{children:[(0,F.jsx)(c,{color:`neutral`,variant:`outline`,onClick:()=>l(null),children:b.cancel}),(0,F.jsx)(c,{type:`submit`,disabled:!se(s,e),children:b.save})]})]})}),(0,F.jsx)(h,{open:d!==null&&!!e[d],onOpenChange:e=>{e||f(null)},title:b.delete,description:ce(b,d===null?void 0:e[d]),cancelLabel:b.cancel,color:`danger`,onConfirm:()=>{d!==null&&e[d]&&(t(E(e,d)),O(oe(m,d))),f(null)}})]})}var P,F;function I(){return(I=e((()=>{s(),o(),l(),d(),f(),m(),g(),b(),P=t(),F=n(),k(),O(),T(),x()})))()}function L(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-task-board.data`}),[t,n]=(0,R.useState)(B),i=(0,R.useMemo)(()=>t.map(t=>t.key?{...t,label:e(`tasks.${t.key}`)}:t),[t,e]);return(0,z.jsx)(N,{points:i,onPointsChange:t=>n(t.map(t=>{let n=t;return n.key&&n.label!==e(`tasks.${n.key}`)?{...n,key:void 0}:n})),quadrants:{topLeft:{label:e(`doFirst`),color:`var(--danger-color, #ef4444)`},topRight:{label:e(`schedule`),color:`var(--primary-color, #4f46e5)`},bottomLeft:{label:e(`delegate`),color:`var(--warning-color, #f59e0b)`},bottomRight:{label:e(`eliminate`),color:`var(--text-secondary-color, #64748b)`}},reverseX:!0,showTicks:!1,axisLabels:{top:e(`important`),bottom:e(`notImportant`),left:e(`urgent`),right:e(`notUrgent`)},height:380,ariaLabel:e(`boardAria`)})}var R,z,B;function V(){return(V=e((()=>{R=t(),i(),I(),z=n(),B=[{key:`loginOutage`,x:9,y:8},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`bookTravel`,x:8,y:3},{key:`inboxZero`,x:2.5,y:2}]})))()}function me(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-task-board.data.roadmap`}),[t,n]=(0,H.useState)(W),[i,a]=(0,H.useState)(0),o=(0,H.useMemo)(()=>t.map(t=>t.key?{...t,label:e(`features.${t.key}`)}:t),[t,e]);return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,U.jsx)(N,{points:o,onPointsChange:t=>{n(t.map(t=>{let n=t;return n.key&&n.label!==e(`features.${n.key}`)?{...n,key:void 0}:n})),a(e=>e+1)},labels:{add:e(`add`),edit:e(`edit`),delete:e(`delete`),name:e(`name`),deleteConfirm:e(`deleteConfirm`)},quadrants:{topLeft:{label:e(`quickWins`),badge:`1`},topRight:{label:e(`bigBets`),badge:`2`},bottomLeft:{label:e(`fillIns`),badge:`3`},bottomRight:{label:e(`moneyPits`),badge:`4`}},xLabel:e(`effort`),yLabel:e(`impact`),height:360,ariaLabel:e(`aria`)}),(0,U.jsx)(`small`,{style:{color:`var(--text-secondary-color)`},children:e(`summary`,{features:t.length,changes:i})})]})}var H,U,W;function G(){return(G=e((()=>{H=t(),i(),I(),U=n(),W=[{key:`darkMode`,x:2.5,y:7.5},{key:`sso`,x:7.5,y:8.5},{key:`csvExport`,x:3,y:3},{key:`rewriteBilling`,x:8.5,y:3.5}]})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantTaskBoard } from "minerva-design";
import type { QuadrantPoint } from "minerva-design/charts";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left.
// Sample tasks keep a translation key until they are renamed.
type Task = QuadrantPoint & { key?: string };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data",
  });
  const [tasks, setTasks] = useState(initial);
  const points = useMemo(
    () =>
      tasks.map((task) =>
        task.key ? { ...task, label: t(\`tasks.\${task.key}\`) } : task,
      ),
    [tasks, t],
  );
  return (
    <QuadrantTaskBoard
      points={points}
      // a renamed sample task drops its translation key
      onPointsChange={(next) =>
        setTasks(
          next.map((point) => {
            const task = point as Task;
            return task.key && task.label !== t(\`tasks.\${task.key}\`)
              ? { ...task, key: undefined }
              : task;
          }),
        )
      }
      quadrants={{
        topLeft: { label: t("doFirst"), color: "var(--danger-color, #ef4444)" },
        topRight: {
          label: t("schedule"),
          color: "var(--primary-color, #4f46e5)",
        },
        bottomLeft: {
          label: t("delegate"),
          color: "var(--warning-color, #f59e0b)",
        },
        bottomRight: {
          label: t("eliminate"),
          color: "var(--text-secondary-color, #64748b)",
        },
      }}
      reverseX
      showTicks={false}
      axisLabels={{
        top: t("important"),
        bottom: t("notImportant"),
        left: t("urgent"),
        right: t("notUrgent"),
      }}
      height={380}
      ariaLabel={t("boardAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantTaskBoard } from "minerva-design";
import type { QuadrantPoint } from "minerva-design/charts";

// A product roadmap: effort on x, impact on y. \`labels\` renames the
// buttons and dialogs; every change is counted. Sample features keep a
// translation key until they are renamed.
type Feature = QuadrantPoint & { key?: string };
const initial: Feature[] = [
  { key: "darkMode", x: 2.5, y: 7.5 },
  { key: "sso", x: 7.5, y: 8.5 },
  { key: "csvExport", x: 3, y: 3 },
  { key: "rewriteBilling", x: 8.5, y: 3.5 },
];

export default function CustomLabelsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data.roadmap",
  });
  const [items, setItems] = useState(initial);
  const [changes, setChanges] = useState(0);
  const points = useMemo(
    () =>
      items.map((item) =>
        item.key ? { ...item, label: t(\`features.\${item.key}\`) } : item,
      ),
    [items, t],
  );
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantTaskBoard
        points={points}
        // a renamed sample feature drops its translation key
        onPointsChange={(next) => {
          setItems(
            next.map((point) => {
              const item = point as Feature;
              return item.key && item.label !== t(\`features.\${item.key}\`)
                ? { ...item, key: undefined }
                : item;
            }),
          );
          setChanges((n) => n + 1);
        }}
        labels={{
          add: t("add"),
          edit: t("edit"),
          delete: t("delete"),
          name: t("name"),
          // {name} is replaced by the board, not by i18next
          deleteConfirm: t("deleteConfirm"),
        }}
        quadrants={{
          topLeft: { label: t("quickWins"), badge: "1" },
          topRight: { label: t("bigBets"), badge: "2" },
          bottomLeft: { label: t("fillIns"), badge: "3" },
          bottomRight: { label: t("moneyPits"), badge: "4" },
        }}
        xLabel={t("effort")}
        yLabel={t("impact")}
        height={360}
        ariaLabel={t("aria")}
      />
      <small style={{ color: "var(--text-secondary-color)" }}>
        {t("summary", { features: items.length, changes })}
      </small>
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{V(),G(),q(),Y(),t(),j(),pe(),X=n(),Z=A(Object.assign({"./demos/basic.tsx":L,"./demos/custom-labels.tsx":me}),Object.assign({"./demos/basic.tsx":K,"./demos/custom-labels.tsx":J})),Q=()=>(0,X.jsx)(fe,{id:`quadrant-task-board`,demos:Z})})))()}$();export{Q as default};