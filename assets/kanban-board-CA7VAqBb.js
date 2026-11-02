import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Cn as r,V as i,Xn as a,Zt as o,fn as s,g as c,m as l,nr as u,wn as d}from"./angular-preview-BdNkX8l5.js";import{B as f,R as p,V as m,z as h}from"./ProgressIndicator-Har2Rnl4.js";import{t as g}from"./stylingHooks-PqiNJdev.js";import{i as _,n as v,s as y,t as b}from"./Card-AZdSJt1H.js";import{Tt as x,wt as S}from"./io5-Bd77grqv.js";import{n as C,t as w}from"./Tag-D7vyv6Q2.js";import{n as T,t as E}from"./kanbanBoard.module.scss-DsKLHXLl.js";import{l as D,n as O,t as ee,u as k}from"./DocPage-CmI5o3x2.js";var A,j,M,N,P,te;function F(){return(F=e((()=>{d(),m(),S(),T(),A=t(),j=n(),i(),M=(0,A.createContext)({draggable:!1}),N=({children:e,columnWidth:t,fill:n=!1,gap:i,height:a,maxHeight:s,draggable:u=!1,onCardMove:d,canDrop:p,"aria-label":m,"aria-labelledby":h,className:_,style:v,id:y,ref:b})=>{let{t:S}=f(),C=(0,A.useId)(),w=(0,A.useRef)(null),T=x(w,b),D=(0,A.useRef)(null),O=(0,A.useRef)({draggable:u,onCardMove:d,canDrop:p,t:S});(0,A.useLayoutEffect)(()=>{O.current={draggable:u,onCardMove:d,canDrop:p,t:S},D.current?.refresh()}),(0,A.useLayoutEffect)(()=>{let e=w.current;if(!e)return;let t=c(e,{...l(e),scroller:()=>e,hintId:C,enabled:()=>O.current.draggable,canDrop:e=>O.current.canDrop?.(e)??!0,onMove:e=>O.current.onCardMove?.(e),t:(e,t)=>O.current.t(e,t)});return D.current=t,()=>{t.destroy(),D.current=null}},[C]);let ee=(0,A.useMemo)(()=>({draggable:u,hintId:C}),[u,C]),k={"--kanban-column-width":r(t),"--kanban-gap":r(i),height:r(a),maxHeight:r(s),...v};return(0,j.jsx)(`div`,{ref:T,id:y,role:`region`,"aria-label":h?m:m??S(`kanban.label`),"aria-labelledby":h,tabIndex:0,className:o(E.board,n&&E.fill,_),style:k,...g(`kanban-board`,`root`),children:(0,j.jsx)(M.Provider,{value:ee,children:e})})},P=({title:e,value:t,count:n,color:r,description:i,actions:s,empty:c,footer:l,children:d,"aria-label":p,className:m,style:h,id:_,ref:v})=>{let{t:y}=f(),b=(0,A.useId)(),x=a(n),{scheme:S,custom:C}=u(r),w=A.Children.toArray(d),T=typeof e==`string`||typeof e==`number`?String(e):void 0,D=p??(T!==void 0&&x!==void 0?y(`kanban.columnLabel`,{title:T,count:x}):T),O={"--kanban-column-color":C,...h};return(0,j.jsxs)(`section`,{ref:v,id:_,role:`group`,"aria-label":D,"aria-labelledby":D===void 0?x===void 0?b:`${b} ${b}-count`:void 0,className:o(E.column,S&&E[S],m),style:O,"data-kanban-column":t||void 0,...g(`kanban-column`,`root`,{color:S}),children:[(0,j.jsxs)(`div`,{className:E.header,...g(`kanban-column`,`header`),children:[S||C?(0,j.jsx)(`span`,{className:E.indicator,"aria-hidden":!0,...g(`kanban-column`,`indicator`)}):null,(0,j.jsx)(`span`,{id:b,className:E.title,...g(`kanban-column`,`title`),children:e}),x===void 0?null:(0,j.jsx)(`span`,{id:`${b}-count`,className:E.count,"aria-hidden":D!==void 0||void 0,...g(`kanban-column`,`count`),children:x}),s!=null&&s!==!1?(0,j.jsx)(`div`,{className:E.actions,...g(`kanban-column`,`actions`),children:s}):null]}),i!=null&&i!==!1?(0,j.jsx)(`p`,{className:E.description,...g(`kanban-column`,`description`),children:i}):null,w.length>0?(0,j.jsx)(`div`,{role:`list`,className:E.list,...g(`kanban-column`,`list`),children:w.map((e,t)=>(0,j.jsx)(`div`,{role:`listitem`,className:E.item,children:e},typeof e==`object`&&`key`in e&&e.key!=null?e.key:t))}):(0,j.jsx)(`div`,{className:E.empty,...g(`kanban-column`,`empty`),children:c??y(`kanban.empty`)}),l!=null&&l!==!1?(0,j.jsx)(`div`,{className:E.footer,...g(`kanban-column`,`footer`),children:l}):null]})},te=({value:e,label:t,children:n,className:r,style:i,id:a,ref:s})=>{let{draggable:c,hintId:l}=(0,A.useContext)(M);return(0,j.jsx)(`div`,{ref:s,id:a,...c?{role:`button`,tabIndex:0,"aria-label":t,"aria-describedby":l,"data-draggable":!0}:null,"data-kanban-card":e,className:o(E.card,r),style:i,...g(`kanban-card`,`root`),children:n})}})))()}function ne(){let[e,t]=(0,re.useState)([{id:1,title:`Write the onboarding guide`,owner:`Ada`,status:`todo`},{id:2,title:`Audit color contrast`,owner:`Lin`,status:`todo`},{id:3,title:`Ship the billing page`,owner:`Sam`,status:`doing`},{id:4,title:`Set up error tracking`,owner:`Ada`,status:`done`}]),n=e=>t(t=>t.map(t=>t.id===e&&R[t.status]?{...t,status:R[t.status]}:t));return(0,I.jsx)(N,{"aria-label":`Sprint 12`,children:L.map(t=>{let r=e.filter(e=>e.status===t.status);return(0,I.jsx)(P,{title:t.title,count:r.length,children:r.map(e=>(0,I.jsxs)(b,{padding:`small`,children:[(0,I.jsx)(y,{as:`h4`,children:e.title}),(0,I.jsx)(v,{children:(0,I.jsx)(w,{size:`small`,children:e.owner})}),R[e.status]?(0,I.jsxs)(h,{size:`small`,variant:`ghost`,onClick:()=>n(e.id),"aria-label":`Move to ${z(R[e.status])}: ${e.title}`,children:[`Move to `,z(R[e.status])]}):null]},e.id))},t.status)})})}var re,I,L,R,z;function B(){return(B=e((()=>{re=t(),p(),_(),F(),C(),I=n(),L=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],R={todo:`doing`,doing:`done`,done:void 0},z=e=>L.find(t=>t.status===e).title})))()}function ie(){return(0,V.jsx)(N,{"aria-label":`Product roadmap`,columnWidth:220,gap:8,children:H.map(e=>(0,V.jsx)(P,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,V.jsx)(b,{padding:`small`,children:e},e))},e.title))})}var V,H;function U(){return(U=e((()=>{_(),F(),V=n(),H=[{title:`Backlog`,color:`neutral`,cards:[`Collect feedback`]},{title:`Ready`,color:`info`,cards:[`Pricing page copy`]},{title:`In progress`,color:`primary`,cards:[`Search API`,`Avatars`]},{title:`Review`,color:`warning`,cards:[`Dark mode`]},{title:`Blocked`,color:`danger`,cards:[`SSO with Okta`]},{title:`Done`,color:`success`,cards:[`Release 2.4`]},{title:`Research`,color:`#7c3aed`,cards:[`Interview users`]}]})))()}function ae(){let[e,t]=(0,W.useState)({todo:[{id:`guide`,title:`Write the onboarding guide`,owner:`Ada`},{id:`contrast`,title:`Audit color contrast`,owner:`Lin`},{id:`search`,title:`Index the docs search`,owner:`Sam`}],doing:[{id:`billing`,title:`Ship the billing page`,owner:`Sam`}],done:[{id:`errors`,title:`Set up error tracking`,owner:`Ada`}]});return(0,G.jsx)(N,{"aria-label":`Sprint 12`,draggable:!0,onCardMove:e=>t(t=>s(t,e,e=>e.id)),canDrop:t=>t.toColumn!==`doing`||t.fromColumn===`doing`||e.doing.length<q,children:K.map(t=>(0,G.jsx)(P,{value:t.status,title:t.title,count:e[t.status].length,description:t.status===`doing`?`At most ${q} cards`:void 0,children:e[t.status].map(e=>(0,G.jsx)(te,{value:e.id,label:e.title,children:(0,G.jsxs)(b,{padding:`small`,children:[(0,G.jsx)(y,{as:`h4`,children:e.title}),(0,G.jsx)(v,{children:(0,G.jsx)(w,{size:`small`,children:e.owner})})]})},e.id))},t.status))})}var W,G,K,q;function J(){return(J=e((()=>{W=t(),_(),F(),C(),d(),G=n(),K=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],q=2})))()}function oe(){let[e,t]=(0,Y.useState)([]);return(0,X.jsxs)(N,{"aria-label":`Ideas`,fill:!0,children:[(0,X.jsx)(P,{title:`Ideas`,count:e.length,description:`Anything worth exploring`,actions:(0,X.jsx)(h,{size:`small`,variant:`ghost`,onClick:()=>t(e=>[...e,`Idea ${e.length+1}`]),children:`Add`}),empty:`No ideas yet: use Add to create one.`,footer:e.length>0?(0,X.jsx)(h,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t([]),children:`Clear column`}):null,children:e.map(e=>(0,X.jsx)(b,{padding:`small`,children:e},e))}),(0,X.jsx)(P,{title:`Archived`,count:0})]})}var Y,X;function Z(){return(Z=e((()=>{Y=t(),p(),_(),F(),X=n()})))()}function se(){return(0,Q.jsx)(N,{"aria-label":`Support queue`,height:320,children:ce.map(e=>(0,Q.jsx)(P,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,Q.jsx)(b,{padding:`small`,children:e},e))},e.title))})}var Q,$,ce;function le(){return(le=e((()=>{_(),F(),Q=n(),$=(e,t)=>Array.from({length:t},(t,n)=>`${e} ${n+1}`),ce=[{title:`Inbox`,color:`info`,cards:$(`Ticket`,12)},{title:`Triaged`,color:`warning`,cards:$(`Bug`,5)},{title:`Fixed`,color:`success`,cards:$(`Fix`,8)}]})))()}var ue;function de(){return(de=e((()=>{ue=`import { useState } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  KanbanBoard,
  KanbanColumn,
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
    <KanbanBoard aria-label="Sprint 12">
      {COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.status);
        return (
          <KanbanColumn
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
          </KanbanColumn>
        );
      })}
    </KanbanBoard>
  );
}
`})))()}var fe;function pe(){return(pe=e((()=>{fe=`import { Card, KanbanBoard, KanbanColumn } from "minerva-design";

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
    <KanbanBoard aria-label="Product roadmap" columnWidth={220} gap={8}>
      {columns.map((column) => (
        <KanbanColumn
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
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
`})))()}var me;function he(){return(he=e((()=>{me=`import { useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  Tag,
  type KanbanCardMove,
} from "minerva-design";
import { moveKanbanCard } from "minerva-design/core";

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
  const onCardMove = (move: KanbanCardMove) =>
    setLists(
      (current) =>
        moveKanbanCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  // A full "Doing" column takes no more cards (it can still be reordered).
  const canDrop = (move: KanbanCardMove) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    lists.doing.length < LIMIT;

  return (
    <KanbanBoard
      aria-label="Sprint 12"
      draggable
      onCardMove={onCardMove}
      canDrop={canDrop}
    >
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
          description={
            column.status === "doing" ? \`At most \${LIMIT} cards\` : undefined
          }
        >
          {lists[column.status].map((task) => (
            <KanbanCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
              </Card>
            </KanbanCard>
          ))}
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
`})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useState } from "react";
import { Button, Card, KanbanBoard, KanbanColumn } from "minerva-design";

export default function EmptyActionsDemo() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const add = () => setIdeas((all) => [...all, \`Idea \${all.length + 1}\`]);

  return (
    <KanbanBoard aria-label="Ideas" fill>
      <KanbanColumn
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
      </KanbanColumn>
      <KanbanColumn title="Archived" count={0} />
    </KanbanBoard>
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { Card, KanbanBoard, KanbanColumn } from "minerva-design";

const cards = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => \`\${prefix} \${index + 1}\`);

const columns = [
  { title: "Inbox", color: "info", cards: cards("Ticket", 12) },
  { title: "Triaged", color: "warning", cards: cards("Bug", 5) },
  { title: "Fixed", color: "success", cards: cards("Fix", 8) },
];

export default function FixedHeightDemo() {
  return (
    <KanbanBoard aria-label="Support queue" height={320}>
      {columns.map((column) => (
        <KanbanColumn
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
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
`})))()}var be,xe,Se;function Ce(){return(Ce=e((()=>{B(),U(),J(),Z(),le(),de(),pe(),he(),_e(),ye(),t(),O(),k(),be=n(),xe=D(Object.assign({"./demos/basic.tsx":ne,"./demos/colors.tsx":ie,"./demos/drag-drop.tsx":ae,"./demos/empty-actions.tsx":oe,"./demos/fixed-height.tsx":se}),Object.assign({"./demos/basic.tsx":ue,"./demos/colors.tsx":fe,"./demos/drag-drop.tsx":me,"./demos/empty-actions.tsx":ge,"./demos/fixed-height.tsx":ve})),Se=()=>(0,be.jsx)(ee,{id:`kanban-board`,demos:xe})})))()}Ce();export{Se as default};