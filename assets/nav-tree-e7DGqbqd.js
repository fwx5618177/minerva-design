import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{K as r,X as i,it as a,pt as o,r as s,s as c,v as l}from"./icons-BnhBUHMa.js";import{R as u,z as d}from"./ProgressIndicator-CXNTCbma.js";import{n as f,t as p}from"./NavTree-BJKSqzVr.js";import{l as m,n as h,t as g,u as _}from"./DocPage-B93OiV4a.js";function v(){let[e,t]=(0,y.useState)(`traffic`);return(0,b.jsx)(`div`,{style:{maxWidth:260},children:(0,b.jsx)(f,{"aria-label":`Main navigation`,sections:x,activeId:e,onItemSelect:e=>{e.children||t(e.id)}})})}var y,b,x;function S(){return(S=e((()=>{i(),y=t(),p(),b=n(),x=[{id:`main`,items:[{id:`home`,label:`Home`,href:`#home`,icon:(0,b.jsx)(o,{size:`1em`})},{id:`analytics`,label:`Analytics`,description:`Traffic and conversions`,icon:(0,b.jsx)(l,{size:`1em`}),children:[{id:`traffic`,label:`Traffic`,href:`#traffic`},{id:`funnels`,label:`Funnels`,href:`#funnels`}]}]},{id:`admin`,title:`Administration`,items:[{id:`users`,label:`Users`,href:`#users`,icon:(0,b.jsx)(r,{size:`1em`}),endContent:(0,b.jsx)(`small`,{children:`12`})},{id:`settings`,label:`Settings`,href:`#settings`,icon:(0,b.jsx)(c,{size:`1em`}),disabled:!0}]}]})))()}function C(){let[e,t]=(0,w.useState)(!1);return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`},children:[(0,T.jsx)(d,{color:`neutral`,variant:`outline`,size:`small`,onClick:()=>t(e=>!e),children:e?`Expand sidebar`:`Collapse sidebar`}),(0,T.jsx)(`div`,{style:{width:e?56:220},children:(0,T.jsx)(f,{sections:E,activeId:`inbox`,collapsed:e,wrapLabels:!0})})]})}var w,T,E;function D(){return(D=e((()=>{i(),w=t(),u(),p(),T=n(),E=[{id:`main`,items:[{id:`home`,label:`Home`,href:`#home`,icon:(0,T.jsx)(o,{size:`1em`})},{id:`inbox`,label:`Inbox`,href:`#inbox`,icon:(0,T.jsx)(s,{size:`1em`})},{id:`docs`,label:`Documents with a rather long name`,description:`Shared with the whole team`,href:`#docs`,icon:(0,T.jsx)(a,{size:`1em`})}]}]})))()}function O(){let[e,t]=(0,k.useState)(`/ssr`),[n,r]=(0,k.useState)([`advanced`]);return(0,A.jsx)(`div`,{style:{maxWidth:260},children:(0,A.jsx)(f,{sections:j,activeId:j[0].items.flatMap(e=>[e,...e.children??[]]).find(t=>t.href===e)?.id,expandedIds:n,onExpandedChange:r,renderLink:(e,n,r)=>(0,A.jsx)(`a`,{href:`#${e.href}`,className:r.className,"aria-current":r.active?`page`:void 0,onClick:n=>{n.preventDefault(),t(e.href??`/`)},children:n},e.id)})})}var k,A,j;function M(){return(M=e((()=>{k=t(),p(),A=n(),j=[{id:`docs`,title:`Guides`,items:[{id:`intro`,label:`Introduction`,href:`/intro`},{id:`advanced`,label:`Advanced`,children:[{id:`ssr`,label:`Server rendering`,href:`/ssr`},{id:`theming`,label:`Theming`,href:`/theming`}]}]}]})))()}var N;function P(){return(P=e((()=>{N=`import {
  BarChartIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "minerva-design/icons";
import { useState } from "react";
import { NavTree, type NavTreeSection } from "minerva-design";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: <HomeIcon size="1em" />,
      },
      {
        id: "analytics",
        label: "Analytics",
        description: "Traffic and conversions",
        icon: <BarChartIcon size="1em" />,
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
        icon: <UsersIcon size="1em" />,
        endContent: <small>12</small>,
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
        icon: <SettingsIcon size="1em" />,
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
`})))()}var F;function I(){return(I=e((()=>{F=`import { FileTextIcon, HomeIcon, InboxIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button, NavTree, type NavTreeSection } from "minerva-design";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: <HomeIcon size="1em" />,
      },
      {
        id: "inbox",
        label: "Inbox",
        href: "#inbox",
        icon: <InboxIcon size="1em" />,
      },
      {
        id: "docs",
        label: "Documents with a rather long name",
        description: "Shared with the whole team",
        href: "#docs",
        icon: <FileTextIcon size="1em" />,
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
`})))()}var z,B,V;function H(){return(H=e((()=>{S(),D(),M(),P(),I(),R(),t(),h(),_(),z=n(),B=m(Object.assign({"./demos/basic.tsx":v,"./demos/collapsed.tsx":C,"./demos/custom-link.tsx":O}),Object.assign({"./demos/basic.tsx":N,"./demos/collapsed.tsx":F,"./demos/custom-link.tsx":L})),V=()=>(0,z.jsx)(g,{id:`nav-tree`,demos:B})})))()}H();export{V as default};