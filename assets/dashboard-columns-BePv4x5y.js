import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{An as r,I as i,Wn as a,Xn as o,dn as s,h as c,jn as l,m as u,yt as d}from"./angular-preview-Bdrfw4jj.js";import{B as ee,R as f,V as p,z as m}from"./ProgressIndicator-BJJnPlYO.js";import{t as h}from"./stylingHooks-PqiNJdev.js";import{i as g,n as _,s as v,t as y}from"./Card-zyNP00Ba.js";import{Tt as b,wt as x}from"./io5-D53wwnzn.js";import{n as S,t as C}from"./Tag-C3T1GIy1.js";import{n as w,t as T}from"./dashboardColumns.module.scss-CDBcVg4G.js";import{l as E,n as D,t as O,u as k}from"./DocPage-DaycmzeX.js";var A,j,M,N,P,te;function F(){return(F=e((()=>{l(),p(),x(),w(),A=t(),j=n(),i(),M=(0,A.createContext)({draggable:!1}),N=({children:e,columnWidth:t,fill:n=!1,gap:r,height:i,maxHeight:a,draggable:o=!1,onCardMove:l,canDrop:f,"aria-label":p,"aria-labelledby":m,className:g,style:_,id:v,ref:y})=>{let{t:x}=ee(),S=(0,A.useId)(),C=(0,A.useRef)(null),w=b(C,y),E=(0,A.useRef)(null),D=(0,A.useRef)({draggable:o,onCardMove:l,canDrop:f,t:x});(0,A.useLayoutEffect)(()=>{D.current={draggable:o,onCardMove:l,canDrop:f,t:x},E.current?.refresh()}),(0,A.useLayoutEffect)(()=>{let e=C.current;if(!e)return;let t=c(e,{...u(e),scroller:()=>e,hintId:S,enabled:()=>D.current.draggable,canDrop:e=>D.current.canDrop?.(e)??!0,onMove:e=>D.current.onCardMove?.(e),t:(e,t)=>D.current.t(e,t)});return E.current=t,()=>{t.destroy(),E.current=null}},[S]);let O=(0,A.useMemo)(()=>({draggable:o,hintId:S}),[o,S]),k={"--dashboard-column-width":s(t),"--dashboard-gap":s(r),height:s(i),maxHeight:s(a),..._};return(0,j.jsx)(`div`,{ref:w,id:v,role:`region`,"aria-label":m?p:p??x(`dashboard.label`),"aria-labelledby":m,tabIndex:0,className:d(T.board,n&&T.fill,g),style:k,...h(`dashboard-columns`,`root`),children:(0,j.jsx)(M.Provider,{value:O,children:e})})},P=({title:e,value:t,count:n,color:i,description:o,actions:s,empty:c,footer:l,children:u,"aria-label":f,className:p,style:m,id:g,ref:_})=>{let{t:v}=ee(),y=(0,A.useId)(),b=r(n),{scheme:x,custom:S}=a(i),C=A.Children.toArray(u),w=typeof e==`string`||typeof e==`number`?String(e):void 0,E=f??(w!==void 0&&b!==void 0?v(`dashboard.columnLabel`,{title:w,count:b}):w),D={"--dashboard-column-color":S,...m};return(0,j.jsxs)(`section`,{ref:_,id:g,role:`group`,"aria-label":E,"aria-labelledby":E===void 0?b===void 0?y:`${y} ${y}-count`:void 0,className:d(T.column,x&&T[x],p),style:D,"data-dashboard-column":t||void 0,...h(`dashboard-column`,`root`,{color:x}),children:[(0,j.jsxs)(`div`,{className:T.header,...h(`dashboard-column`,`header`),children:[x||S?(0,j.jsx)(`span`,{className:T.indicator,"aria-hidden":!0,...h(`dashboard-column`,`indicator`)}):null,(0,j.jsx)(`span`,{id:y,className:T.title,...h(`dashboard-column`,`title`),children:e}),b===void 0?null:(0,j.jsx)(`span`,{id:`${y}-count`,className:T.count,"aria-hidden":E!==void 0||void 0,...h(`dashboard-column`,`count`),children:b}),s!=null&&s!==!1?(0,j.jsx)(`div`,{className:T.actions,...h(`dashboard-column`,`actions`),children:s}):null]}),o!=null&&o!==!1?(0,j.jsx)(`p`,{className:T.description,...h(`dashboard-column`,`description`),children:o}):null,C.length>0?(0,j.jsx)(`div`,{role:`list`,className:T.list,...h(`dashboard-column`,`list`),children:C.map((e,t)=>(0,j.jsx)(`div`,{role:`listitem`,className:T.item,children:e},typeof e==`object`&&`key`in e&&e.key!=null?e.key:t))}):(0,j.jsx)(`div`,{className:T.empty,...h(`dashboard-column`,`empty`),children:c??v(`dashboard.empty`)}),l!=null&&l!==!1?(0,j.jsx)(`div`,{className:T.footer,...h(`dashboard-column`,`footer`),children:l}):null]})},te=({value:e,label:t,children:n,className:r,style:i,id:a,ref:o})=>{let{draggable:s,hintId:c}=(0,A.useContext)(M);return(0,j.jsx)(`div`,{ref:o,id:a,...s?{role:`button`,tabIndex:0,"aria-label":t,"aria-describedby":c,"data-draggable":!0}:null,"data-dashboard-card":e,className:d(T.card,r),style:i,...h(`dashboard-card`,`root`),children:n})}})))()}function ne(){let[e,t]=(0,I.useState)([{id:1,title:`Write the onboarding guide`,owner:`Ada`,status:`todo`},{id:2,title:`Audit color contrast`,owner:`Lin`,status:`todo`},{id:3,title:`Ship the billing page`,owner:`Sam`,status:`doing`},{id:4,title:`Set up error tracking`,owner:`Ada`,status:`done`}]),n=e=>t(t=>t.map(t=>t.id===e&&z[t.status]?{...t,status:z[t.status]}:t));return(0,L.jsx)(N,{"aria-label":`Sprint 12`,children:R.map(t=>{let r=e.filter(e=>e.status===t.status);return(0,L.jsx)(P,{title:t.title,count:r.length,children:r.map(e=>(0,L.jsxs)(y,{padding:`small`,children:[(0,L.jsx)(v,{as:`h4`,children:e.title}),(0,L.jsx)(_,{children:(0,L.jsx)(C,{size:`small`,children:e.owner})}),z[e.status]?(0,L.jsxs)(m,{size:`small`,variant:`ghost`,onClick:()=>n(e.id),"aria-label":`Move to ${B(z[e.status])}: ${e.title}`,children:[`Move to `,B(z[e.status])]}):null]},e.id))},t.status)})})}var I,L,R,z,B;function V(){return(V=e((()=>{I=t(),f(),g(),F(),S(),L=n(),R=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],z={todo:`doing`,doing:`done`,done:void 0},B=e=>R.find(t=>t.status===e).title})))()}function re(){return(0,H.jsx)(N,{"aria-label":`Product roadmap`,columnWidth:220,gap:8,children:U.map(e=>(0,H.jsx)(P,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,H.jsx)(y,{padding:`small`,children:e},e))},e.title))})}var H,U;function W(){return(W=e((()=>{g(),F(),H=n(),U=[{title:`Backlog`,color:`neutral`,cards:[`Collect feedback`]},{title:`Ready`,color:`info`,cards:[`Pricing page copy`]},{title:`In progress`,color:`primary`,cards:[`Search API`,`Avatars`]},{title:`Review`,color:`warning`,cards:[`Dark mode`]},{title:`Blocked`,color:`danger`,cards:[`SSO with Okta`]},{title:`Done`,color:`success`,cards:[`Release 2.4`]},{title:`Research`,color:`#7c3aed`,cards:[`Interview users`]}]})))()}function ie(){let[e,t]=(0,G.useState)({todo:[{id:`guide`,title:`Write the onboarding guide`,owner:`Ada`},{id:`contrast`,title:`Audit color contrast`,owner:`Lin`},{id:`search`,title:`Index the docs search`,owner:`Sam`}],doing:[{id:`billing`,title:`Ship the billing page`,owner:`Sam`}],done:[{id:`errors`,title:`Set up error tracking`,owner:`Ada`}]});return(0,K.jsx)(N,{"aria-label":`Sprint 12`,draggable:!0,onCardMove:e=>t(t=>o(t,e,e=>e.id)),canDrop:t=>t.toColumn!==`doing`||t.fromColumn===`doing`||e.doing.length<J,children:q.map(t=>(0,K.jsx)(P,{value:t.status,title:t.title,count:e[t.status].length,description:t.status===`doing`?`At most ${J} cards`:void 0,children:e[t.status].map(e=>(0,K.jsx)(te,{value:e.id,label:e.title,children:(0,K.jsxs)(y,{padding:`small`,children:[(0,K.jsx)(v,{as:`h4`,children:e.title}),(0,K.jsx)(_,{children:(0,K.jsx)(C,{size:`small`,children:e.owner})})]})},e.id))},t.status))})}var G,K,q,J;function Y(){return(Y=e((()=>{G=t(),g(),F(),S(),l(),K=n(),q=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],J=2})))()}function ae(){let[e,t]=(0,X.useState)([]);return(0,Z.jsxs)(N,{"aria-label":`Ideas`,fill:!0,children:[(0,Z.jsx)(P,{title:`Ideas`,count:e.length,description:`Anything worth exploring`,actions:(0,Z.jsx)(m,{size:`small`,variant:`ghost`,onClick:()=>t(e=>[...e,`Idea ${e.length+1}`]),children:`Add`}),empty:`No ideas yet: use Add to create one.`,footer:e.length>0?(0,Z.jsx)(m,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t([]),children:`Clear column`}):null,children:e.map(e=>(0,Z.jsx)(y,{padding:`small`,children:e},e))}),(0,Z.jsx)(P,{title:`Archived`,count:0})]})}var X,Z;function oe(){return(oe=e((()=>{X=t(),f(),g(),F(),Z=n()})))()}function se(){return(0,Q.jsx)(N,{"aria-label":`Support queue`,height:320,children:ce.map(e=>(0,Q.jsx)(P,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,Q.jsx)(y,{padding:`small`,children:e},e))},e.title))})}var Q,$,ce;function le(){return(le=e((()=>{g(),F(),Q=n(),$=(e,t)=>Array.from({length:t},(t,n)=>`${e} ${n+1}`),ce=[{title:`Inbox`,color:`info`,cards:$(`Ticket`,12)},{title:`Triaged`,color:`warning`,cards:$(`Bug`,5)},{title:`Fixed`,color:`success`,cards:$(`Fix`,8)}]})))()}var ue;function de(){return(de=e((()=>{ue=`import { useState } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  DashboardColumns,
  DashboardColumn,
  Tag,
} from "minerva-design";

type Status = "todo" | "doing" | "done";
interface Task {
  id: number;
  title: string;
  owner: string;
  status: Status;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
const NEXT: Record<Status, Status | undefined> = {
  todo: "doing",
  doing: "done",
  done: undefined,
};
const titleOf = (status: Status) =>
  COLUMNS.find((column) => column.status === status)!.title;

export default function BasicDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Write the onboarding guide",
      owner: "Ada",
      status: "todo",
    },
    { id: 2, title: "Audit color contrast", owner: "Lin", status: "todo" },
    { id: 3, title: "Ship the billing page", owner: "Sam", status: "doing" },
    { id: 4, title: "Set up error tracking", owner: "Ada", status: "done" },
  ]);
  // Cards move with their own actions here (draggable boards: drag-drop demo).
  const advance = (id: number) =>
    setTasks((all) =>
      all.map((task) =>
        task.id === id && NEXT[task.status]
          ? { ...task, status: NEXT[task.status]! }
          : task,
      ),
    );

  return (
    <DashboardColumns aria-label="Sprint 12">
      {COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.status);
        return (
          <DashboardColumn
            key={column.status}
            title={column.title}
            count={items.length}
          >
            {items.map((task) => (
              <Card key={task.id} padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
                {NEXT[task.status] ? (
                  <Button
                    size="small"
                    variant="ghost"
                    onClick={() => advance(task.id)}
                    aria-label={\`Move to \${titleOf(NEXT[task.status]!)}: \${task.title}\`}
                  >
                    Move to {titleOf(NEXT[task.status]!)}
                  </Button>
                ) : null}
              </Card>
            ))}
          </DashboardColumn>
        );
      })}
    </DashboardColumns>
  );
}
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

const columns = [
  { title: "Backlog", color: "neutral", cards: ["Collect feedback"] },
  { title: "Ready", color: "info", cards: ["Pricing page copy"] },
  { title: "In progress", color: "primary", cards: ["Search API", "Avatars"] },
  { title: "Review", color: "warning", cards: ["Dark mode"] },
  { title: "Blocked", color: "danger", cards: ["SSO with Okta"] },
  { title: "Done", color: "success", cards: ["Release 2.4"] },
  { title: "Research", color: "#7c3aed", cards: ["Interview users"] },
];

export default function ColorsDemo() {
  return (
    <DashboardColumns aria-label="Product roadmap" columnWidth={220} gap={8}>
      {columns.map((column) => (
        <DashboardColumn
          key={column.title}
          title={column.title}
          count={column.cards.length}
          color={column.color}
        >
          {column.cards.map((card) => (
            <Card key={card} padding="small">
              {card}
            </Card>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  Tag,
  type DashboardCardMove,
} from "minerva-design";
import { moveDashboardCard } from "minerva-design/core";

type Status = "todo" | "doing" | "done";
interface Task {
  id: string;
  title: string;
  owner: string;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
/** Work in progress limit of "Doing" */
const LIMIT = 2;

export default function DragDropDemo() {
  const [lists, setLists] = useState<Record<Status, Task[]>>({
    todo: [
      { id: "guide", title: "Write the onboarding guide", owner: "Ada" },
      { id: "contrast", title: "Audit color contrast", owner: "Lin" },
      { id: "search", title: "Index the docs search", owner: "Sam" },
    ],
    doing: [{ id: "billing", title: "Ship the billing page", owner: "Sam" }],
    done: [{ id: "errors", title: "Set up error tracking", owner: "Ada" }],
  });

  // The board is controlled: it reports the move, the app applies it.
  const onCardMove = (move: DashboardCardMove) =>
    setLists(
      (current) =>
        moveDashboardCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  // A full "Doing" column takes no more cards (it can still be reordered).
  const canDrop = (move: DashboardCardMove) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    lists.doing.length < LIMIT;

  return (
    <DashboardColumns
      aria-label="Sprint 12"
      draggable
      onCardMove={onCardMove}
      canDrop={canDrop}
    >
      {COLUMNS.map((column) => (
        <DashboardColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
          description={
            column.status === "doing" ? \`At most \${LIMIT} cards\` : undefined
          }
        >
          {lists[column.status].map((task) => (
            <DashboardCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
              </Card>
            </DashboardCard>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useState } from "react";
import {
  Button,
  Card,
  DashboardColumns,
  DashboardColumn,
} from "minerva-design";

export default function EmptyActionsDemo() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const add = () => setIdeas((all) => [...all, \`Idea \${all.length + 1}\`]);

  return (
    <DashboardColumns aria-label="Ideas" fill>
      <DashboardColumn
        title="Ideas"
        count={ideas.length}
        description="Anything worth exploring"
        actions={
          <Button size="small" variant="ghost" onClick={add}>
            Add
          </Button>
        }
        empty="No ideas yet: use Add to create one."
        footer={
          ideas.length > 0 ? (
            <Button
              size="small"
              variant="outline"
              color="neutral"
              onClick={() => setIdeas([])}
            >
              Clear column
            </Button>
          ) : null
        }
      >
        {ideas.map((idea) => (
          <Card key={idea} padding="small">
            {idea}
          </Card>
        ))}
      </DashboardColumn>
      <DashboardColumn title="Archived" count={0} />
    </DashboardColumns>
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

const cards = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => \`\${prefix} \${index + 1}\`);

const columns = [
  { title: "Inbox", color: "info", cards: cards("Ticket", 12) },
  { title: "Triaged", color: "warning", cards: cards("Bug", 5) },
  { title: "Fixed", color: "success", cards: cards("Fix", 8) },
];

export default function FixedHeightDemo() {
  return (
    <DashboardColumns aria-label="Support queue" height={320}>
      {columns.map((column) => (
        <DashboardColumn
          key={column.title}
          title={column.title}
          count={column.cards.length}
          color={column.color}
        >
          {column.cards.map((card) => (
            <Card key={card} padding="small">
              {card}
            </Card>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}
`})))()}var be,xe,Se;function Ce(){return(Ce=e((()=>{V(),W(),Y(),oe(),le(),de(),pe(),he(),_e(),ye(),t(),D(),k(),be=n(),xe=E(Object.assign({"./demos/basic.tsx":ne,"./demos/colors.tsx":re,"./demos/drag-drop.tsx":ie,"./demos/empty-actions.tsx":ae,"./demos/fixed-height.tsx":se}),Object.assign({"./demos/basic.tsx":ue,"./demos/colors.tsx":fe,"./demos/drag-drop.tsx":me,"./demos/empty-actions.tsx":ge,"./demos/fixed-height.tsx":ve})),Se=()=>(0,be.jsx)(O,{id:`dashboard-columns`,demos:xe})})))()}Ce();export{Se as default};