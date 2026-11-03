import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BV71gcWC.js";import{B as a,R as o,V as s,z as c}from"./ProgressIndicator-CLQ5GhV8.js";import{i as l,r as u}from"./CodeBlock-BfjU5DKs.js";import{n as d,t as f}from"./Input-B-_C7F3z.js";import{n as p,t as m}from"./quadrantTaskBoard.module.scss-BJGqzPqZ.js";import{E as h,M as g,x as _}from"./angular-preview-BrYDyM0M.js";import{E as v,a as ee,c as te,d as ne,f as y,i as re,k as ie,l as b,n as ae,o as oe,p as x,r as S,s as C,t as se,u as ce}from"./angular-preview-CF5RJLp8.js";import{i as w,p as T}from"./charts-CfhbCDNc.js";import{l as E,n as D,t as O,u as k}from"./DocPage-BhzHP-B1.js";function A({kind:e,size:t=16}){return(0,N.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,N.jsx)(`path`,{d:b[e]})})}function j({points:e,onPointsChange:t,labels:n,...r}){let{language:i}=a(),o=r.locale??i,[s,l]=(0,M.useState)(null),[f,m]=(0,M.useState)(null),h=(0,M.useRef)(null),v=(0,M.useRef)(null),b=(0,M.useRef)(null),C=(0,M.useRef)(null),T=(0,M.useId)(),E=se(o,n),D={xDomain:r.xDomain,yDomain:r.yDomain,xSplit:r.xSplit,ySplit:r.ySplit,reverseX:r.reverseX},O=_(o),k=e=>r.quadrants?.[e]?.label||O[e],j=m,F=e=>{let t=h.current;if(!e||!t)return null;let n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return{x:r.left-n.left,y:r.top-n.top,width:r.width,height:r.height}},I=e=>{let t=F(h.current?.querySelector(`.minerva-chart-quadrant-point[data-point-index="${e}"]`));return t?{x:t.x-P,y:t.y-P,width:20,height:20}:b.current??{x:0,y:0,width:0,height:0}},L=e=>{if(!s){let e=document.activeElement;C.current=e instanceof HTMLElement?e:null}l(e)},R=(0,M.useCallback)(()=>{l(null);let e=C.current;C.current=null,e?.isConnected&&e.focus()},[]),z=(t,n=I(t))=>{let r=ae(D,e,t);r&&L({kind:`draft`,draft:r,anchor:n})},B=e=>l(t=>t?.kind===`draft`?{...t,draft:{...t.draft,...e}}:t),V=s?.kind===`draft`?s.draft:null,H=s?.kind===`delete`?s.index:null,U=s!==null&&(V?V.index===null||!!e[V.index]:H!==null&&!!e[H]),W=n=>{n.preventDefault();let r=x(D,e,V);r&&(t(r.points),j(r.index),R())},G=()=>{H!==null&&e[H]&&(t(re(e,H)),j(ne(f,H))),R()},K=U?s.anchor:null,q=U?s.kind:null;return(0,M.useLayoutEffect)(()=>{let e=v.current,t=h.current;if(!e||!t||!K)return;let n=oe(K,{width:e.offsetWidth,height:e.offsetHeight},{width:t.clientWidth,height:t.clientHeight});e.style.left=`${n.x}px`,e.style.top=`${n.y}px`,e.style.transformOrigin=`${n.origin.x}px ${n.origin.y}px`,e.dataset.placement=n.placement},[K,q]),(0,M.useEffect)(()=>{K&&v.current?.querySelector(`[data-autofocus]`)?.focus({preventScroll:!0})},[K,q]),(0,M.useEffect)(()=>{if(!U)return;let e=e=>{let t=e.target;t&&v.current?.contains(t)||(l(null),C.current=null)},t=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),R())},n=v.current;return document.addEventListener(`pointerdown`,e,!0),n?.addEventListener(`keydown`,t),()=>{document.removeEventListener(`pointerdown`,e,!0),n?.removeEventListener(`keydown`,t)}},[U,q,R]),(0,N.jsxs)(`div`,{ref:h,className:p.board,"data-panel":U?s.kind:void 0,onPointerDownCapture:e=>{let t=h.current;if(!t)return;let n=t.getBoundingClientRect();b.current={x:e.clientX-n.left,y:e.clientY-n.top,width:0,height:0}},children:[(0,N.jsx)(w,{...r,locale:o,points:e,selectedIndex:r.selectedIndex===void 0?f:r.selectedIndex,onPointClick:(e,t)=>{j(t),r.onPointClick?.(e,t)},onPointDrop:(n,r,i)=>{t(S(e,r,i)),j(r)},onQuadrantClick:(e,t)=>L({kind:`draft`,draft:y(D,e,t),anchor:b.current??{x:0,y:0,width:0,height:0}}),onPointDoubleClick:(e,t)=>z(t),renderPointActions:(e,t)=>(0,N.jsxs)(`div`,{role:`toolbar`,"aria-label":E.actions,className:p.cardActions,onPointerDown:e=>e.stopPropagation(),children:[(0,N.jsx)(u,{size:`xsmall`,variant:`ghost`,label:E.edit,icon:(0,N.jsx)(A,{kind:`edit`,size:14}),onClick:()=>z(t)}),(0,N.jsx)(u,{size:`xsmall`,variant:`ghost`,color:`danger`,label:E.delete,icon:(0,N.jsx)(A,{kind:`delete`,size:14}),onClick:()=>L({kind:`delete`,index:t,anchor:I(t)})})]}),renderQuadrantHeader:(e,t)=>(0,N.jsxs)(`div`,{className:p.header,"data-corner":e,children:[t.region?.badge?(0,N.jsx)(`span`,{className:p.badge,children:t.region.badge}):null,(0,N.jsx)(`span`,{className:p.title,children:k(e)}),r.showCounts===!1?null:(0,N.jsx)(`span`,{className:p.count,children:g(r.showCounts??!0,t.points,o)}),(0,N.jsx)(u,{size:`xsmall`,variant:`ghost`,className:p.add,label:`${E.add} · ${k(e)}`,icon:(0,N.jsx)(A,{kind:`add`}),"aria-expanded":U&&V?.index===null&&V.quadrant===e,onClick:t=>L({kind:`draft`,draft:y(D,e),anchor:F(t.currentTarget)??{x:0,y:0,width:0,height:0}})})]})}),U&&V?(0,N.jsx)(`div`,{ref:v,role:`dialog`,"aria-labelledby":`${T}-title`,className:p.panel,"data-quadrant-task-panel":V.index===null?`add`:`edit`,children:(0,N.jsxs)(`form`,{className:p.form,onSubmit:W,children:[(0,N.jsx)(`h3`,{id:`${T}-title`,className:p.panelTitle,children:V.index===null?E.add:E.edit}),(0,N.jsxs)(`label`,{className:p.field,children:[(0,N.jsx)(`span`,{children:E.name}),(0,N.jsx)(d,{required:!0,size:`small`,"data-autofocus":``,value:V.label,"aria-label":E.name,onChange:e=>B({label:e.target.value})})]}),(0,N.jsxs)(`fieldset`,{className:p.quadrants,children:[(0,N.jsx)(`legend`,{children:E.quadrant}),(0,N.jsx)(`div`,{className:p.quadrantGrid,children:ie.map(e=>(0,N.jsxs)(`label`,{className:p.quadrant,"data-corner":e,children:[(0,N.jsx)(`input`,{type:`radio`,name:`${T}-quadrant`,value:e,checked:V.quadrant===e,onChange:()=>B({quadrant:e})}),(0,N.jsx)(`span`,{className:p.swatch,style:{background:ee(r.quadrants,e)},"aria-hidden":`true`}),(0,N.jsx)(`span`,{className:p.quadrantName,children:k(e)})]},e))})]}),(0,N.jsxs)(`div`,{className:p.footer,children:[(0,N.jsx)(c,{size:`small`,color:`neutral`,variant:`ghost`,onClick:R,children:E.cancel}),(0,N.jsx)(c,{size:`small`,type:`submit`,disabled:!te(V,e),children:E.save})]})]})}):null,U&&H!==null?(0,N.jsxs)(`div`,{ref:v,role:`alertdialog`,"aria-labelledby":`${T}-title`,"aria-describedby":`${T}-text`,className:p.panel,"data-quadrant-task-panel":`delete`,children:[(0,N.jsx)(`h3`,{id:`${T}-title`,className:p.panelTitle,children:E.delete}),(0,N.jsx)(`p`,{id:`${T}-text`,className:p.panelText,children:ce(E,e[H])}),(0,N.jsxs)(`div`,{className:p.footer,children:[(0,N.jsx)(c,{size:`small`,color:`neutral`,variant:`ghost`,"data-autofocus":``,onClick:R,children:E.cancel}),(0,N.jsx)(c,{size:`small`,color:`danger`,onClick:G,children:E.confirmDelete})]})]}):null]})}var M,N,P;function F(){return(F=e((()=>{s(),o(),l(),f(),m(),M=t(),N=n(),T(),v(),C(),h(),P=10})))()}function I(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-task-board.data`}),[t,n]=(0,L.useState)(z),i=(0,L.useMemo)(()=>t.map(t=>t.key?{...t,label:e(`tasks.${t.key}`)}:t),[t,e]);return(0,R.jsx)(j,{points:i,onPointsChange:t=>n(t.map(t=>{let n=t;return n.key&&n.label!==e(`tasks.${n.key}`)?{...n,key:void 0}:n})),quadrants:{topLeft:{label:e(`doFirst`),color:`var(--danger-color, #ef4444)`},topRight:{label:e(`schedule`),color:`var(--primary-color, #4f46e5)`},bottomLeft:{label:e(`delegate`),color:`var(--warning-color, #f59e0b)`},bottomRight:{label:e(`eliminate`),color:`var(--text-secondary-color, #64748b)`}},reverseX:!0,showTicks:!1,axisLabels:{top:e(`important`),bottom:e(`notImportant`),left:e(`urgent`),right:e(`notUrgent`)},height:380,ariaLabel:e(`boardAria`)})}var L,R,z;function B(){return(B=e((()=>{L=t(),i(),F(),R=n(),z=[{key:`loginOutage`,x:9,y:8},{key:`quarterlyPlanning`,x:3,y:8.5},{key:`bookTravel`,x:8,y:3},{key:`inboxZero`,x:2.5,y:2}]})))()}function V(){let{t:e}=r(`common`,{keyPrefix:`docs.quadrant-task-board.data.roadmap`}),[t,n]=(0,H.useState)(W),[i,a]=(0,H.useState)(0),o=(0,H.useMemo)(()=>t.map(t=>t.key?{...t,label:e(`features.${t.key}`)}:t),[t,e]);return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,U.jsx)(j,{points:o,onPointsChange:t=>{n(t.map(t=>{let n=t;return n.key&&n.label!==e(`features.${n.key}`)?{...n,key:void 0}:n})),a(e=>e+1)},labels:{add:e(`add`),edit:e(`edit`),delete:e(`delete`),name:e(`name`),deleteConfirm:e(`deleteConfirm`)},quadrants:{topLeft:{label:e(`quickWins`),badge:`1`},topRight:{label:e(`bigBets`),badge:`2`},bottomLeft:{label:e(`fillIns`),badge:`3`},bottomRight:{label:e(`moneyPits`),badge:`4`}},xLabel:e(`effort`),yLabel:e(`impact`),height:360,ariaLabel:e(`aria`)}),(0,U.jsx)(`small`,{style:{color:`var(--text-secondary-color)`},children:e(`summary`,{features:t.length,changes:i})})]})}var H,U,W;function G(){return(G=e((()=>{H=t(),i(),F(),U=n(),W=[{key:`darkMode`,x:2.5,y:7.5},{key:`sso`,x:7.5,y:8.5},{key:`csvExport`,x:3,y:3},{key:`rewriteBilling`,x:8.5,y:3.5}]})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo, useState } from "react";
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
// buttons and panels; every change is counted. Sample features keep a
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
`})))()}var X,Z,Q;function $(){return($=e((()=>{B(),G(),q(),Y(),t(),D(),k(),X=n(),Z=E(Object.assign({"./demos/basic.tsx":I,"./demos/custom-labels.tsx":V}),Object.assign({"./demos/basic.tsx":K,"./demos/custom-labels.tsx":J})),Q=()=>(0,X.jsx)(O,{id:`quadrant-task-board`,demos:Z})})))()}$();export{Q as default};