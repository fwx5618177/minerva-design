import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{An as r,Bn as i,Et as a,I as o,Qn as s,Wn as c,h as l,ln as u,m as d}from"./angular-preview-IwZi912s.js";import{B as ee,R as f,V as p,z as m}from"./ProgressIndicator-DJBhmBkg.js";import{t as h}from"./stylingHooks-PqiNJdev.js";import{i as g,n as _,s as v,t as y}from"./Card-D6L3Ihk1.js";import{Tt as b,wt as x}from"./io5-CaMdkTnG.js";import{n as S,t as C}from"./Tag-fDOVIW7c.js";import{n as w,t as T}from"./dashboardColumns.module.scss-CDBcVg4G.js";import{l as E,n as D,t as te,u as O}from"./DocPage-D5zg4-3g.js";var k,A,j,M,N,ne;function P(){return(P=e((()=>{r(),p(),x(),w(),k=t(),A=n(),o(),j=(0,k.createContext)({draggable:!1}),M=({children:e,columnWidth:t,fill:n=!1,gap:r,height:i,maxHeight:o,draggable:s=!1,onCardMove:u,canDrop:f,"aria-label":p,"aria-labelledby":m,className:g,style:_,id:v,ref:y})=>{let{t:x}=ee(),S=(0,k.useId)(),C=(0,k.useRef)(null),w=b(C,y),E=(0,k.useRef)(null),D=(0,k.useRef)({draggable:s,onCardMove:u,canDrop:f,t:x});(0,k.useLayoutEffect)(()=>{D.current={draggable:s,onCardMove:u,canDrop:f,t:x},E.current?.refresh()}),(0,k.useLayoutEffect)(()=>{let e=C.current;if(!e)return;let t=l(e,{...d(e),scroller:()=>e,hintId:S,enabled:()=>D.current.draggable,canDrop:e=>D.current.canDrop?.(e)??!0,onMove:e=>D.current.onCardMove?.(e),t:(e,t)=>D.current.t(e,t)});return E.current=t,()=>{t.destroy(),E.current=null}},[S]);let te=(0,k.useMemo)(()=>({draggable:s,hintId:S}),[s,S]),O={"--dashboard-column-width":c(t),"--dashboard-gap":c(r),height:c(i),maxHeight:c(o),..._};return(0,A.jsx)(`div`,{ref:w,id:v,role:`region`,"aria-label":m?p:p??x(`dashboard.label`),"aria-labelledby":m,tabIndex:0,className:a(T.board,n&&T.fill,g),style:O,...h(`dashboard-columns`,`root`),children:(0,A.jsx)(j.Provider,{value:te,children:e})})},N=({title:e,value:t,count:n,color:r,description:i,actions:o,empty:c,footer:l,children:d,"aria-label":f,className:p,style:m,id:g,ref:_})=>{let{t:v}=ee(),y=(0,k.useId)(),b=u(n),{scheme:x,custom:S}=s(r),C=k.Children.toArray(d),w=typeof e==`string`||typeof e==`number`?String(e):void 0,E=f??(w!==void 0&&b!==void 0?v(`dashboard.columnLabel`,{title:w,count:b}):w),D={"--dashboard-column-color":S,...m};return(0,A.jsxs)(`section`,{ref:_,id:g,role:`group`,"aria-label":E,"aria-labelledby":E===void 0?b===void 0?y:`${y} ${y}-count`:void 0,className:a(T.column,x&&T[x],p),style:D,"data-dashboard-column":t||void 0,...h(`dashboard-column`,`root`,{color:x}),children:[(0,A.jsxs)(`div`,{className:T.header,...h(`dashboard-column`,`header`),children:[x||S?(0,A.jsx)(`span`,{className:T.indicator,"aria-hidden":!0,...h(`dashboard-column`,`indicator`)}):null,(0,A.jsx)(`span`,{id:y,className:T.title,...h(`dashboard-column`,`title`),children:e}),b===void 0?null:(0,A.jsx)(`span`,{id:`${y}-count`,className:T.count,"aria-hidden":E!==void 0||void 0,...h(`dashboard-column`,`count`),children:b}),o!=null&&o!==!1?(0,A.jsx)(`div`,{className:T.actions,...h(`dashboard-column`,`actions`),children:o}):null]}),i!=null&&i!==!1?(0,A.jsx)(`p`,{className:T.description,...h(`dashboard-column`,`description`),children:i}):null,C.length>0?(0,A.jsx)(`div`,{role:`list`,className:T.list,...h(`dashboard-column`,`list`),children:C.map((e,t)=>(0,A.jsx)(`div`,{role:`listitem`,className:T.item,children:e},typeof e==`object`&&`key`in e&&e.key!=null?e.key:t))}):(0,A.jsx)(`div`,{className:T.empty,...h(`dashboard-column`,`empty`),children:c??v(`dashboard.empty`)}),l!=null&&l!==!1?(0,A.jsx)(`div`,{className:T.footer,...h(`dashboard-column`,`footer`),children:l}):null]})},ne=({value:e,label:t,children:n,className:r,style:i,id:o,ref:s})=>{let{draggable:c,hintId:l}=(0,k.useContext)(j);return(0,A.jsx)(`div`,{ref:s,id:o,...c?{role:`button`,tabIndex:0,"aria-label":t,"aria-describedby":l,"data-draggable":!0}:null,"data-dashboard-card":e,className:a(T.card,r),style:i,...h(`dashboard-card`,`root`),children:n})}})))()}function re(){let[e,t]=(0,ie.useState)([{id:1,title:`Write the onboarding guide`,owner:`Ada`,status:`todo`},{id:2,title:`Audit color contrast`,owner:`Lin`,status:`todo`},{id:3,title:`Ship the billing page`,owner:`Sam`,status:`doing`},{id:4,title:`Set up error tracking`,owner:`Ada`,status:`done`}]),n=e=>t(t=>t.map(t=>t.id===e&&L[t.status]?{...t,status:L[t.status]}:t));return(0,F.jsx)(M,{"aria-label":`Sprint 12`,children:I.map(t=>{let r=e.filter(e=>e.status===t.status);return(0,F.jsx)(N,{title:t.title,count:r.length,children:r.map(e=>(0,F.jsxs)(y,{padding:`small`,children:[(0,F.jsx)(v,{as:`h4`,children:e.title}),(0,F.jsx)(_,{children:(0,F.jsx)(C,{size:`small`,children:e.owner})}),L[e.status]?(0,F.jsxs)(m,{size:`small`,variant:`ghost`,onClick:()=>n(e.id),"aria-label":`Move to ${R(L[e.status])}: ${e.title}`,children:[`Move to `,R(L[e.status])]}):null]},e.id))},t.status)})})}var ie,F,I,L,R;function z(){return(z=e((()=>{ie=t(),f(),g(),P(),S(),F=n(),I=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],L={todo:`doing`,doing:`done`,done:void 0},R=e=>I.find(t=>t.status===e).title})))()}function ae(){return(0,B.jsx)(M,{"aria-label":`Product roadmap`,columnWidth:220,gap:8,children:V.map(e=>(0,B.jsx)(N,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,B.jsx)(y,{padding:`small`,children:e},e))},e.title))})}var B,V;function H(){return(H=e((()=>{g(),P(),B=n(),V=[{title:`Backlog`,color:`neutral`,cards:[`Collect feedback`]},{title:`Ready`,color:`info`,cards:[`Pricing page copy`]},{title:`In progress`,color:`primary`,cards:[`Search API`,`Avatars`]},{title:`Review`,color:`warning`,cards:[`Dark mode`]},{title:`Blocked`,color:`danger`,cards:[`SSO with Okta`]},{title:`Done`,color:`success`,cards:[`Release 2.4`]},{title:`Research`,color:`#7c3aed`,cards:[`Interview users`]}]})))()}function oe(){let[e,t]=(0,U.useState)({todo:[{id:`guide`,title:`Write the onboarding guide`,owner:`Ada`},{id:`contrast`,title:`Audit color contrast`,owner:`Lin`},{id:`search`,title:`Index the docs search`,owner:`Sam`}],doing:[{id:`billing`,title:`Ship the billing page`,owner:`Sam`}],done:[{id:`errors`,title:`Set up error tracking`,owner:`Ada`}]});return(0,W.jsx)(M,{"aria-label":`Sprint 12`,draggable:!0,onCardMove:e=>t(t=>i(t,e,e=>e.id)),canDrop:t=>t.toColumn!==`doing`||t.fromColumn===`doing`||e.doing.length<K,children:G.map(t=>(0,W.jsx)(N,{value:t.status,title:t.title,count:e[t.status].length,description:t.status===`doing`?`At most ${K} cards`:void 0,children:e[t.status].map(e=>(0,W.jsx)(ne,{value:e.id,label:e.title,children:(0,W.jsxs)(y,{padding:`small`,children:[(0,W.jsx)(v,{as:`h4`,children:e.title}),(0,W.jsx)(_,{children:(0,W.jsx)(C,{size:`small`,children:e.owner})})]})},e.id))},t.status))})}var U,W,G,K;function q(){return(q=e((()=>{U=t(),g(),P(),S(),r(),W=n(),G=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],K=2})))()}function se(){let[e,t]=(0,J.useState)([]);return(0,Y.jsxs)(M,{"aria-label":`Ideas`,fill:!0,children:[(0,Y.jsx)(N,{title:`Ideas`,count:e.length,description:`Anything worth exploring`,actions:(0,Y.jsx)(m,{size:`small`,variant:`ghost`,onClick:()=>t(e=>[...e,`Idea ${e.length+1}`]),children:`Add`}),empty:`No ideas yet: use Add to create one.`,footer:e.length>0?(0,Y.jsx)(m,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t([]),children:`Clear column`}):null,children:e.map(e=>(0,Y.jsx)(y,{padding:`small`,children:e},e))}),(0,Y.jsx)(N,{title:`Archived`,count:0})]})}var J,Y;function X(){return(X=e((()=>{J=t(),f(),g(),P(),Y=n()})))()}function ce(){return(0,Z.jsx)(M,{"aria-label":`Support queue`,height:320,children:le.map(e=>(0,Z.jsx)(N,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,Z.jsx)(y,{padding:`small`,children:e},e))},e.title))})}var Z,Q,le;function ue(){return(ue=e((()=>{g(),P(),Z=n(),Q=(e,t)=>Array.from({length:t},(t,n)=>`${e} ${n+1}`),le=[{title:`Inbox`,color:`info`,cards:Q(`Ticket`,12)},{title:`Triaged`,color:`warning`,cards:Q(`Bug`,5)},{title:`Fixed`,color:`success`,cards:Q(`Fix`,8)}]})))()}var de;function fe(){return(fe=e((()=>{de=`import { useState } from "react";
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
`})))()}var pe;function me(){return(me=e((()=>{pe=`import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

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
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { useState } from "react";
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
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`import { useState } from "react";
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
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

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
`})))()}var xe,Se,Ce;function $(){return($=e((()=>{z(),H(),q(),X(),ue(),fe(),me(),ge(),ve(),be(),t(),D(),O(),xe=n(),Se=E(Object.assign({"./demos/basic.tsx":re,"./demos/colors.tsx":ae,"./demos/drag-drop.tsx":oe,"./demos/empty-actions.tsx":se,"./demos/fixed-height.tsx":ce}),Object.assign({"./demos/basic.tsx":de,"./demos/colors.tsx":pe,"./demos/drag-drop.tsx":he,"./demos/empty-actions.tsx":_e,"./demos/fixed-height.tsx":ye})),Ce=()=>(0,xe.jsx)(te,{id:`dashboard-columns`,demos:Se})})))()}$();export{Ce as default};