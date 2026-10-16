import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-vVpDij6t.js";import{n as a,t as o}from"./NavTree-E-0IV_5G.js";import{l as s,n as c,t as l,u}from"./DocPage-DpI9GKki.js";import{E as d,d as f,r as p,s as m,u as h,v as g,w as _}from"./lu-Cx_I1hrG.js";function v(){let[e,t]=(0,y.useState)(`traffic`);return(0,b.jsx)(`div`,{style:{maxWidth:260},children:(0,b.jsx)(a,{"aria-label":`Main navigation`,sections:x,activeId:e,onItemSelect:e=>{e.children||t(e.id)}})})}var y,b,x;function S(){return(S=e((()=>{y=t(),o(),d(),b=n(),x=[{id:`main`,items:[{id:`home`,label:`Home`,href:`#home`,icon:(0,b.jsx)(h,{})},{id:`analytics`,label:`Analytics`,description:`Traffic and conversions`,icon:(0,b.jsx)(p,{}),children:[{id:`traffic`,label:`Traffic`,href:`#traffic`},{id:`funnels`,label:`Funnels`,href:`#funnels`}]}]},{id:`admin`,title:`Administration`,items:[{id:`users`,label:`Users`,href:`#users`,icon:(0,b.jsx)(_,{}),endContent:(0,b.jsx)(`small`,{children:`12`})},{id:`settings`,label:`Settings`,href:`#settings`,icon:(0,b.jsx)(g,{}),disabled:!0}]}]})))()}function C(){let[e,t]=(0,w.useState)(!1);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,T.jsx)(i,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>t(e=>!e),children:e?`Expand sidebar`:`Collapse sidebar`}),(0,T.jsx)(`div`,{style:{width:e?56:220},children:(0,T.jsx)(a,{sections:E,activeId:`inbox`,collapsed:e,wrapLabels:!0})})]})}var w,T,E;function D(){return(D=e((()=>{w=t(),r(),o(),d(),T=n(),E=[{id:`main`,items:[{id:`home`,label:`Home`,href:`#home`,icon:(0,T.jsx)(h,{})},{id:`inbox`,label:`Inbox`,href:`#inbox`,icon:(0,T.jsx)(f,{})},{id:`docs`,label:`Documents with a rather long name`,description:`Shared with the whole team`,href:`#docs`,icon:(0,T.jsx)(m,{})}]}]})))()}function O(){let[e,t]=(0,k.useState)(`/ssr`),[n,r]=(0,k.useState)([`advanced`]);return(0,A.jsx)(`div`,{style:{maxWidth:260},children:(0,A.jsx)(a,{sections:j,activeId:j[0].items.flatMap(e=>[e,...e.children??[]]).find(t=>t.href===e)?.id,expandedIds:n,onExpandedChange:r,renderLink:(e,n,r)=>(0,A.jsx)(`a`,{href:`#${e.href}`,className:r.className,"aria-current":r.active?`page`:void 0,onClick:n=>{n.preventDefault(),t(e.href??`/`)},children:n},e.id)})})}var k,A,j;function M(){return(M=e((()=>{k=t(),o(),A=n(),j=[{id:`docs`,title:`Guides`,items:[{id:`intro`,label:`Introduction`,href:`/intro`},{id:`advanced`,label:`Advanced`,children:[{id:`ssr`,label:`Server rendering`,href:`/ssr`},{id:`theming`,label:`Theming`,href:`/theming`}]}]}]})))()}var N;function P(){return(P=e((()=>{N=`import { useState } from "react";
import { NavTree, type NavTreeSection } from "minerva-design";
import { LuChartBar, LuHouse, LuSettings, LuUsers } from "react-icons/lu";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", href: "#home", icon: <LuHouse /> },
      {
        id: "analytics",
        label: "Analytics",
        description: "Traffic and conversions",
        icon: <LuChartBar />,
        children: [
          { id: "traffic", label: "Traffic", href: "#traffic" },
          { id: "funnels", label: "Funnels", href: "#funnels" },
        ],
      },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    items: [
      {
        id: "users",
        label: "Users",
        href: "#users",
        icon: <LuUsers />,
        endContent: <small>12</small>,
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
        icon: <LuSettings />,
        disabled: true,
      },
    ],
  },
];

export default function BasicDemo() {
  const [active, setActive] = useState("traffic");
  return (
    <div style={{ maxWidth: 260 }}>
      <NavTree
        aria-label="Main navigation"
        sections={sections}
        activeId={active}
        onItemSelect={(item) => {
          if (!item.children) setActive(item.id);
        }}
      />
    </div>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { useState } from "react";
import { Button, NavTree, type NavTreeSection } from "minerva-design";
import { LuFileText, LuHouse, LuInbox } from "react-icons/lu";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", href: "#home", icon: <LuHouse /> },
      { id: "inbox", label: "Inbox", href: "#inbox", icon: <LuInbox /> },
      {
        id: "docs",
        label: "Documents with a rather long name",
        description: "Shared with the whole team",
        href: "#docs",
        icon: <LuFileText />,
      },
    ],
  },
];

export default function CollapsedDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </Button>
      <div style={{ width: collapsed ? 56 : 220 }}>
        <NavTree
          sections={sections}
          activeId="inbox"
          collapsed={collapsed}
          wrapLabels
        />
      </div>
    </div>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { useState } from "react";
import { NavTree, type NavTreeSection } from "minerva-design";

const sections: NavTreeSection[] = [
  {
    id: "docs",
    title: "Guides",
    items: [
      { id: "intro", label: "Introduction", href: "/intro" },
      {
        id: "advanced",
        label: "Advanced",
        children: [
          { id: "ssr", label: "Server rendering", href: "/ssr" },
          { id: "theming", label: "Theming", href: "/theming" },
        ],
      },
    ],
  },
];

export default function CustomLinkDemo() {
  const [path, setPath] = useState("/ssr");
  const [expanded, setExpanded] = useState<string[]>(["advanced"]);
  return (
    <div style={{ maxWidth: 260 }}>
      <NavTree
        sections={sections}
        activeId={
          sections[0].items
            .flatMap((i) => [i, ...(i.children ?? [])])
            .find((i) => i.href === path)?.id
        }
        expandedIds={expanded}
        onExpandedChange={setExpanded}
        // Render your router's link component; keep state.className on it.
        renderLink={(item, content, state) => (
          <a
            key={item.id}
            href={\`#\${item.href}\`}
            className={state.className}
            aria-current={state.active ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              setPath(item.href ?? "/");
            }}
          >
            {content}
          </a>
        )}
      />
    </div>
  );
}
`})))()}var z,B,V;function H(){return(H=e((()=>{S(),D(),M(),P(),I(),R(),t(),c(),u(),z=n(),B=s(Object.assign({"./demos/basic.tsx":v,"./demos/collapsed.tsx":C,"./demos/custom-link.tsx":O}),Object.assign({"./demos/basic.tsx":N,"./demos/collapsed.tsx":F,"./demos/custom-link.tsx":L})),V=()=>(0,z.jsx)(l,{id:`nav-tree`,demos:B})})))()}H();export{V as default};