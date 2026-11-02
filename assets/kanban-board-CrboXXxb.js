import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Kt as r,Tn as i,mn as a,pn as o,st as s}from"./angular-preview-DXAccp5O.js";import{B as c,R as l,V as u,z as d}from"./ProgressIndicator-DMdtmsv7.js";import{t as f}from"./stylingHooks-PqiNJdev.js";import{i as p,n as m,s as h,t as g}from"./Card-CWqgbi-5.js";import{n as _,t as v}from"./Tag-CuwZeKEw.js";import{n as y,t as b}from"./kanbanBoard.module.scss-DtpOXSdo.js";import{l as x,n as S,t as C,u as w}from"./DocPage-BetfypGI.js";var T,E,D,O;function k(){return(k=e((()=>{a(),u(),b(),T=t(),E=n(),D=({children:e,columnWidth:t,fill:n=!1,gap:i,height:a,maxHeight:o,"aria-label":l,"aria-labelledby":u,className:d,style:p,id:m,ref:h})=>{let{t:g}=c(),_={"--kanban-column-width":r(t),"--kanban-gap":r(i),height:r(a),maxHeight:r(o),...p};return(0,E.jsx)(`div`,{ref:h,id:m,role:`region`,"aria-label":u?l:l??g(`kanban.label`),"aria-labelledby":u,tabIndex:0,className:s(y.board,n&&y.fill,d),style:_,...f(`kanban-board`,`root`),children:e})},O=({title:e,count:t,color:n,description:r,actions:a,empty:l,footer:u,children:d,"aria-label":p,className:m,style:h,id:g,ref:_})=>{let{t:v}=c(),b=(0,T.useId)(),x=o(t),{scheme:S,custom:C}=i(n),w=T.Children.toArray(d),D=typeof e==`string`||typeof e==`number`?String(e):void 0,O=p??(D!==void 0&&x!==void 0?v(`kanban.columnLabel`,{title:D,count:x}):D),k={"--kanban-column-color":C,...h};return(0,E.jsxs)(`section`,{ref:_,id:g,role:`group`,"aria-label":O,"aria-labelledby":O===void 0?x===void 0?b:`${b} ${b}-count`:void 0,className:s(y.column,S&&y[S],m),style:k,...f(`kanban-column`,`root`,{color:S}),children:[(0,E.jsxs)(`div`,{className:y.header,...f(`kanban-column`,`header`),children:[S||C?(0,E.jsx)(`span`,{className:y.indicator,"aria-hidden":!0,...f(`kanban-column`,`indicator`)}):null,(0,E.jsx)(`span`,{id:b,className:y.title,...f(`kanban-column`,`title`),children:e}),x===void 0?null:(0,E.jsx)(`span`,{id:`${b}-count`,className:y.count,"aria-hidden":O!==void 0||void 0,...f(`kanban-column`,`count`),children:x}),a!=null&&a!==!1?(0,E.jsx)(`div`,{className:y.actions,...f(`kanban-column`,`actions`),children:a}):null]}),r!=null&&r!==!1?(0,E.jsx)(`p`,{className:y.description,...f(`kanban-column`,`description`),children:r}):null,w.length>0?(0,E.jsx)(`div`,{role:`list`,className:y.list,...f(`kanban-column`,`list`),children:w.map((e,t)=>(0,E.jsx)(`div`,{role:`listitem`,className:y.item,children:e},typeof e==`object`&&`key`in e&&e.key!=null?e.key:t))}):(0,E.jsx)(`div`,{className:y.empty,...f(`kanban-column`,`empty`),children:l??v(`kanban.empty`)}),u!=null&&u!==!1?(0,E.jsx)(`div`,{className:y.footer,...f(`kanban-column`,`footer`),children:u}):null]})}})))()}function ee(){let[e,t]=(0,A.useState)([{id:1,title:`Write the onboarding guide`,owner:`Ada`,status:`todo`},{id:2,title:`Audit color contrast`,owner:`Lin`,status:`todo`},{id:3,title:`Ship the billing page`,owner:`Sam`,status:`doing`},{id:4,title:`Set up error tracking`,owner:`Ada`,status:`done`}]),n=e=>t(t=>t.map(t=>t.id===e&&N[t.status]?{...t,status:N[t.status]}:t));return(0,j.jsx)(D,{"aria-label":`Sprint 12`,children:M.map(t=>{let r=e.filter(e=>e.status===t.status);return(0,j.jsx)(O,{title:t.title,count:r.length,children:r.map(e=>(0,j.jsxs)(g,{padding:`small`,children:[(0,j.jsx)(h,{as:`h4`,children:e.title}),(0,j.jsx)(m,{children:(0,j.jsx)(v,{size:`small`,children:e.owner})}),N[e.status]?(0,j.jsxs)(d,{size:`small`,variant:`ghost`,onClick:()=>n(e.id),"aria-label":`Move to ${P(N[e.status])}: ${e.title}`,children:[`Move to `,P(N[e.status])]}):null]},e.id))},t.status)})})}var A,j,M,N,P;function F(){return(F=e((()=>{A=t(),l(),p(),k(),_(),j=n(),M=[{status:`todo`,title:`To do`},{status:`doing`,title:`Doing`},{status:`done`,title:`Done`}],N={todo:`doing`,doing:`done`,done:void 0},P=e=>M.find(t=>t.status===e).title})))()}function te(){return(0,I.jsx)(D,{"aria-label":`Product roadmap`,columnWidth:220,gap:8,children:L.map(e=>(0,I.jsx)(O,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,I.jsx)(g,{padding:`small`,children:e},e))},e.title))})}var I,L;function R(){return(R=e((()=>{p(),k(),I=n(),L=[{title:`Backlog`,color:`neutral`,cards:[`Collect feedback`]},{title:`Ready`,color:`info`,cards:[`Pricing page copy`]},{title:`In progress`,color:`primary`,cards:[`Search API`,`Avatars`]},{title:`Review`,color:`warning`,cards:[`Dark mode`]},{title:`Blocked`,color:`danger`,cards:[`SSO with Okta`]},{title:`Done`,color:`success`,cards:[`Release 2.4`]},{title:`Research`,color:`#7c3aed`,cards:[`Interview users`]}]})))()}function ne(){let[e,t]=(0,z.useState)([]);return(0,B.jsxs)(D,{"aria-label":`Ideas`,fill:!0,children:[(0,B.jsx)(O,{title:`Ideas`,count:e.length,description:`Anything worth exploring`,actions:(0,B.jsx)(d,{size:`small`,variant:`ghost`,onClick:()=>t(e=>[...e,`Idea ${e.length+1}`]),children:`Add`}),empty:`No ideas yet: use Add to create one.`,footer:e.length>0?(0,B.jsx)(d,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t([]),children:`Clear column`}):null,children:e.map(e=>(0,B.jsx)(g,{padding:`small`,children:e},e))}),(0,B.jsx)(O,{title:`Archived`,count:0})]})}var z,B;function V(){return(V=e((()=>{z=t(),l(),p(),k(),B=n()})))()}function re(){return(0,H.jsx)(D,{"aria-label":`Support queue`,height:320,children:W.map(e=>(0,H.jsx)(O,{title:e.title,count:e.cards.length,color:e.color,children:e.cards.map(e=>(0,H.jsx)(g,{padding:`small`,children:e},e))},e.title))})}var H,U,W;function G(){return(G=e((()=>{p(),k(),H=n(),U=(e,t)=>Array.from({length:t},(t,n)=>`${e} ${n+1}`),W=[{title:`Inbox`,color:`info`,cards:U(`Ticket`,12)},{title:`Triaged`,color:`warning`,cards:U(`Bug`,5)},{title:`Fixed`,color:`success`,cards:U(`Fix`,8)}]})))()}var K;function q(){return(q=e((()=>{K=`import { useState } from "react";
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
  // No drag and drop: cards move with your own actions.
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Card, KanbanBoard, KanbanColumn } from "minerva-design";

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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useState } from "react";
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
`})))()}var Q;function $(){return($=e((()=>{Q=`import { Card, KanbanBoard, KanbanColumn } from "minerva-design";

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
`})))()}var ie,ae,oe;function se(){return(se=e((()=>{F(),R(),V(),G(),q(),Y(),Z(),$(),t(),S(),w(),ie=n(),ae=x(Object.assign({"./demos/basic.tsx":ee,"./demos/colors.tsx":te,"./demos/empty-actions.tsx":ne,"./demos/fixed-height.tsx":re}),Object.assign({"./demos/basic.tsx":K,"./demos/colors.tsx":J,"./demos/empty-actions.tsx":X,"./demos/fixed-height.tsx":Q})),oe=()=>(0,ie.jsx)(C,{id:`kanban-board`,demos:ae})})))()}se();export{oe as default};