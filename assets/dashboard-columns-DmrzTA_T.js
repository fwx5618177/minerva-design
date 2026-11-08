import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{bt as r,xt as i}from"./io5-DGxLJ5Qx.js";import{F as a,Hn as o,Mn as s,Xn as c,_ as ee,l,mn as u,on as d,rt as f}from"./angular-preview-CxN7u9Fp.js";import{B as te,R as p,V as m,z as h}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as g}from"./stylingHooks-PqiNJdev.js";import{i as _,n as v,s as y,t as b}from"./Card-BACH_PxY.js";import{n as x,t as S}from"./Tag-C1W_tDEL.js";import{n as C,t as w}from"./dashboardColumns.module.scss-CDBcVg4G.js";import{l as T,n as E,t as D,u as O}from"./DocPage-CH5Y1w5M.js";var k,A,j,M,N,ne;function P(){return(P=e((()=>{s(),m(),r(),C(),k=t(),A=n(),a(),j=(0,k.createContext)({draggable:!1}),M=({children:e,columnWidth:t,fill:n=!1,gap:r,height:a,maxHeight:s,draggable:c=!1,onCardMove:u,canDrop:d,"aria-label":p,"aria-labelledby":m,className:h,style:_,id:v,ref:y})=>{let{t:b}=te(),x=(0,k.useId)(),S=(0,k.useRef)(null),C=i(S,y),T=(0,k.useRef)(null),E=(0,k.useRef)({draggable:c,onCardMove:u,canDrop:d,t:b});(0,k.useLayoutEffect)(()=>{E.current={draggable:c,onCardMove:u,canDrop:d,t:b},T.current?.refresh()}),(0,k.useLayoutEffect)(()=>{let e=S.current;if(!e)return;let t=ee(e,{...l(e),scroller:()=>e,hintId:x,enabled:()=>E.current.draggable,canDrop:e=>E.current.canDrop?.(e)??!0,onMove:e=>E.current.onCardMove?.(e),t:(e,t)=>E.current.t(e,t)});return T.current=t,()=>{t.destroy(),T.current=null}},[x]);let D=(0,k.useMemo)(()=>({draggable:c,hintId:x}),[c,x]),O={"--dashboard-column-width":o(t),"--dashboard-gap":o(r),height:o(a),maxHeight:o(s),..._};return(0,A.jsx)(`div`,{ref:C,id:v,role:`region`,"aria-label":m?p:p??b(`dashboard.label`),"aria-labelledby":m,tabIndex:0,className:f(w.board,n&&w.fill,h),style:O,...g(`dashboard-columns`,`root`),children:(0,A.jsx)(j.Provider,{value:D,children:e})})},N=({title:e,value:t,count:n,color:r,description:i,actions:a,empty:o,footer:s,children:ee,"aria-label":l,className:d,style:p,id:m,ref:h})=>{let{t:_}=te(),v=(0,k.useId)(),y=u(n),{scheme:b,custom:x}=c(r),S=k.Children.toArray(ee),C=typeof e==`string`||typeof e==`number`?String(e):void 0,T=l??(C!==void 0&&y!==void 0?_(`dashboard.columnLabel`,{title:C,count:y}):C),E={"--dashboard-column-color":x,...p};return(0,A.jsxs)(`section`,{ref:h,id:m,role:`group`,"aria-label":T,"aria-labelledby":T===void 0?y===void 0?v:`${v} ${v}-count`:void 0,className:f(w.column,b&&w[b],d),style:E,"data-dashboard-column":t||void 0,...g(`dashboard-column`,`root`,{color:b}),children:[(0,A.jsxs)(`div`,{className:w.header,...g(`dashboard-column`,`header`),children:[b||x?(0,A.jsx)(`span`,{className:w.indicator,"aria-hidden":!0,...g(`dashboard-column`,`indicator`)}):null,(0,A.jsx)(`span`,{id:v,className:w.title,...g(`dashboard-column`,`title`),children:e}),y===void 0?null:(0,A.jsx)(`span`,{id:`${v}-count`,className:w.count,"aria-hidden":T!==void 0||void 0,...g(`dashboard-column`,`count`),children:y}),a!=null&&a!==!1?(0,A.jsx)(`div`,{className:w.actions,...g(`dashboard-column`,`actions`),children:a}):null]}),i!=null&&i!==!1?(0,A.jsx)(`p`,{className:w.description,...g(`dashboard-column`,`description`),children:i}):null,S.length>0?(0,A.jsx)(`div`,{role:`list`,className:w.list,...g(`dashboard-column`,`list`),children:S.map((e,t)=>(0,A.jsx)(`div`,{role:`listitem`,className:w.item,children:e},typeof e==`object`&&`key`in e&&e.key!=null?e.key:t))}):(0,A.jsx)(`div`,{className:w.empty,...g(`dashboard-column`,`empty`),children:o??_(`dashboard.empty`)}),s!=null&&s!==!1?(0,A.jsx)(`div`,{className:w.footer,...g(`dashboard-column`,`footer`),children:s}):null]})},ne=({value:e,label:t,children:n,className:r,style:i,id:a,ref:o})=>{let{draggable:s,hintId:c}=(0,k.useContext)(j);return(0,A.jsx)(`div`,{ref:o,id:a,...s?{role:`button`,tabIndex:0,"aria-label":t,"aria-describedby":c,"data-draggable":!0}:null,"data-dashboard-card":e,className:f(w.card,r),style:i,...g(`dashboard-card`,`root`),children:n})}})))()}function re(){let[e,t]=(0,F.useState)([{id:1,title:`Write the onboarding guide`,owner:`Ada`,status:`todo`},{id:2,title:`Audit color contrast`,owner:`Lin`,status:`todo`},{id:3,title:`Ship the billing page`,owner:`Sam`,status:`doing`},{id:4,title:`Set up error tracking`,owner:`Ada`,status:`done`}]),n=e=>t(t=>t.map(t=>t.id===e&&R[t.status]?{...t,status:R[t.status]}:t));return(0,I.jsx)(M,{"aria-label":`Sprint 12`,children:L.map(t=>{let r=e.filter(e=>e.status===t.status);return(0,I.jsx)(N,{title:t.title,count:r.length,children:r.map(e=>(0,I.jsxs)(b,{padding:`small`,children:[(0,I.jsx)(y,{as:`h4`,children:e.title}),(0,I.jsx)(v,{children:(0,I.jsx)(S,{size:`small`,children:e.owner})}),R[e.status]?(0,I.jsxs)(h,{size:`small`,variant:`ghost`,onClick:()=>n(e.id),"aria-label":`Move to ${z(R[e.status])}: ${e.title}`,children:[`Move to `,z(R[e.status])]}):null]},e.id))},t.status)})})}var F,I,L,R,z;function B(){return(B=e((()=>{F=t(),p(),_(),P(),x(),I=n(),L=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],R={todo:`doing`,doing:`done`,done:void 0},z=e=>L.find(t=>t.status===e).title})))()}function ie(){return(0,V.jsx)(M,{"aria-label":`Product roadmap`,columnWidth:220,gap:8,children:H.map(e=>(0,V.jsx)(N,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,V.jsx)(b,{padding:`small`,children:e},e))},e.title))})}var V,H;function U(){return(U=e((()=>{_(),P(),V=n(),H=[{title:`Backlog`,color:`neutral`,cards:[`Collect feedback`]},{title:`Ready`,color:`info`,cards:[`Pricing page copy`]},{title:`In progress`,color:`primary`,cards:[`Search API`,`Avatars`]},{title:`Review`,color:`warning`,cards:[`Dark mode`]},{title:`Blocked`,color:`danger`,cards:[`SSO with Okta`]},{title:`Done`,color:`success`,cards:[`Release 2.4`]},{title:`Research`,color:`#7c3aed`,cards:[`Interview users`]}]})))()}function ae(){let[e,t]=(0,W.useState)({todo:[{id:`guide`,title:`Write the onboarding guide`,owner:`Ada`},{id:`contrast`,title:`Audit color contrast`,owner:`Lin`},{id:`search`,title:`Index the docs search`,owner:`Sam`}],doing:[{id:`billing`,title:`Ship the billing page`,owner:`Sam`}],done:[{id:`errors`,title:`Set up error tracking`,owner:`Ada`}]});return(0,G.jsx)(M,{"aria-label":`Sprint 12`,draggable:!0,onCardMove:e=>t(t=>d(t,e,e=>e.id)),canDrop:t=>t.toColumn!==`doing`||t.fromColumn===`doing`||e.doing.length<q,children:K.map(t=>(0,G.jsx)(N,{value:t.status,title:t.title,count:e[t.status].length,description:t.status===`doing`?`At most ${q} cards`:void 0,children:e[t.status].map(e=>(0,G.jsx)(ne,{value:e.id,label:e.title,children:(0,G.jsxs)(b,{padding:`small`,children:[(0,G.jsx)(y,{as:`h4`,children:e.title}),(0,G.jsx)(v,{children:(0,G.jsx)(S,{size:`small`,children:e.owner})})]})},e.id))},t.status))})}var W,G,K,q;function J(){return(J=e((()=>{W=t(),_(),P(),x(),s(),G=n(),K=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],q=2})))()}function oe(){let[e,t]=(0,Y.useState)([]);return(0,X.jsxs)(M,{"aria-label":`Ideas`,fill:!0,children:[(0,X.jsx)(N,{title:`Ideas`,count:e.length,description:`Anything worth exploring`,actions:(0,X.jsx)(h,{size:`small`,variant:`ghost`,onClick:()=>t(e=>[...e,`Idea ${e.length+1}`]),children:`Add`}),empty:`No ideas yet: use Add to create one.`,footer:e.length>0?(0,X.jsx)(h,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t([]),children:`Clear column`}):null,children:e.map(e=>(0,X.jsx)(b,{padding:`small`,children:e},e))}),(0,X.jsx)(N,{title:`Archived`,count:0})]})}var Y,X;function Z(){return(Z=e((()=>{Y=t(),p(),_(),P(),X=n()})))()}function se(){return(0,Q.jsx)(M,{"aria-label":`Support queue`,height:320,children:ce.map(e=>(0,Q.jsx)(N,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,Q.jsx)(b,{padding:`small`,children:e},e))},e.title))})}var Q,$,ce;function le(){return(le=e((()=>{_(),P(),Q=n(),$=(e,t)=>Array.from({length:t},(t,n)=>`${e} ${n+1}`),ce=[{title:`Inbox`,color:`info`,cards:$(`Ticket`,12)},{title:`Triaged`,color:`warning`,cards:$(`Bug`,5)},{title:`Fixed`,color:`success`,cards:$(`Fix`,8)}]})))()}var ue;function de(){return(de=e((()=>{ue=`import { useState } from "react";
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
`})))()}var be,xe,Se;function Ce(){return(Ce=e((()=>{B(),U(),J(),Z(),le(),de(),pe(),he(),_e(),ye(),t(),E(),O(),be=n(),xe=T(Object.assign({"./demos/basic.tsx":re,"./demos/colors.tsx":ie,"./demos/drag-drop.tsx":ae,"./demos/empty-actions.tsx":oe,"./demos/fixed-height.tsx":se}),Object.assign({"./demos/basic.tsx":ue,"./demos/colors.tsx":fe,"./demos/drag-drop.tsx":me,"./demos/empty-actions.tsx":ge,"./demos/fixed-height.tsx":ve})),Se=()=>(0,be.jsx)(D,{id:`dashboard-columns`,demos:xe})})))()}Ce();export{Se as default};