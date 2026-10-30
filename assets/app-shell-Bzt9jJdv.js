import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as ee}from"./angular-preview-l4x8c_2r.js";import{B as i,H as te,R as a,T as ne,U as o,c as re,f as ie,o as s,s as ae,w as oe,z as se}from"./ProgressIndicator-BhPa7d9i.js";import{n as c,t as l}from"./Badge-CjXT4_l5.js";import{Ct as u,J as d,St as ce,q as f}from"./io5-DF7HdQ2g.js";import{i as p,n as m,r as h,t as g}from"./Radio-DnNachfg.js";import{a as _,i as le,n as ue,o as de,r as fe,t as pe}from"./Dialog-DhOxr9BH.js";import{a as v,i as y,t as b}from"./Page-B6ndZBbW.js";import{n as x,t as S}from"./appShell.module.scss-bPSQ8Ior.js";import{n as C,t as w}from"./NavTree-ByR0t6dr.js";import{l as T,n as E,t as D,u as O}from"./DocPage-B2iACtLP.js";import{D as k,f as A,m as j,n as M,y as N}from"./lu-ChIsH8jw.js";var P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{r(),o(),ne(),u(),d(),_(),S(),P=t(),F=n(),I=`(max-width: 768px)`,L=()=>typeof window<`u`&&typeof window.matchMedia==`function`,R=e=>{if(!L())return()=>{};let t=window.matchMedia(I);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},z=()=>L()&&window.matchMedia(I).matches,B=()=>!1,V=({brand:e,brandIcon:t,navigation:n,navigationLabel:r,navigationKey:a,headerActions:ne,pageNavigation:o,children:se,sidebarMode:c,defaultSidebarMode:l,onSidebarModeChange:u,labels:d,skipLink:p=!0,className:m,...h})=>{let{t:g}=te(),_={expand:d?.expand??g(`appShell.expand`),collapse:d?.collapse??g(`appShell.collapse`),enableFloating:d?.enableFloating??g(`appShell.enableFloating`),disableFloating:d?.disableFloating??g(`appShell.disableFloating`),openNavigation:d?.openNavigation??g(`appShell.openNavigation`),closeNavigation:d?.closeNavigation??g(`appShell.closeNavigation`)},v=r??g(`appShell.navigation`),[y,b]=ce({value:c,defaultValue:l??`expanded`,onChange:u,name:`AppShell`,prop:`sidebarMode`}),S=(0,P.useSyncExternalStore)(R,z,B),[C,w]=(0,P.useState)(!1),[T,E]=(0,P.useState)(!1),[D,O]=(0,P.useState)(!1),[k,A]=(0,P.useState)({navigationKey:a,isMobile:S});(k.navigationKey!==a||k.isMobile!==S)&&(A({navigationKey:a,isMobile:S}),w(!1),k.isMobile!==S&&(E(!1),O(!1)));let j=(0,P.useRef)(null),M=(0,P.useId)(),N=(0,P.useId)(),I=(0,P.useRef)(null),L=typeof p==`string`?p:g(`appShell.skipToContent`),V=S&&C,H=(0,P.useRef)(!1);(0,P.useEffect)(()=>{!S&&H.current&&j.current?.focus()},[S]),(0,P.useEffect)(()=>{H.current=V});let U=!S&&y!==`expanded`&&(y!==`floating`||!T&&!D),W=y!==`expanded`,G={collapsed:U,isMobile:S,closeNavigation:()=>w(!1),expandNavigation:()=>b(`expanded`)},K=e=>(0,F.jsx)(f,{ref:e?j:void 0,size:`small`,shape:`square`,className:x.control,"aria-label":W?_.expand:_.collapse,"aria-controls":M,"aria-expanded":!U,onClick:()=>b(W?`expanded`:`compact`),icon:(0,F.jsx)(W?s:ie,{"aria-hidden":`true`})});return(0,F.jsxs)(le,{open:V,onOpenChange:w,children:[(0,F.jsxs)(`div`,{className:ee(x.shell,m),"data-sidebar-mode":y,"data-sidebar-expanded":!U||void 0,...h,...i(`app-shell`,`root`,{state:V?`open`:`closed`}),children:[p!==!1&&(0,F.jsx)(`a`,{className:x.skipLink,href:`#${N}`,...i(`app-shell`,`skip-link`),onClick:e=>{e.preventDefault(),I.current?.focus()},children:L}),!S&&(0,F.jsxs)(`aside`,{id:M,className:x.sidebar,"aria-label":v,...i(`app-shell`,`sidebar`),onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1),onFocusCapture:e=>{e.target.matches(`:focus-visible`)&&O(!0)},onKeyDownCapture:e=>{e.key===`Tab`&&O(!0)},onPointerDownCapture:()=>O(!1),onBlurCapture:e=>{e.currentTarget.contains(e.relatedTarget)||O(!1)},children:[(0,F.jsxs)(`div`,{className:x.brand,children:[t&&(0,F.jsx)(`span`,{className:x.brandIcon,"aria-hidden":`true`,children:t}),(0,F.jsx)(`span`,{className:x.brandLabel,children:e})]}),(0,F.jsx)(`div`,{className:x.navigation,children:n(G)}),(0,F.jsxs)(`div`,{className:x.sidebarActions,children:[K(!1),(0,F.jsx)(f,{size:`small`,shape:`square`,className:x.control,"aria-pressed":y===`floating`,"aria-label":y===`floating`?_.disableFloating:_.enableFloating,onClick:()=>b(y===`floating`?`compact`:`floating`),icon:(0,F.jsx)(y===`floating`?re:ae,{"aria-hidden":`true`})})]})]}),(0,F.jsxs)(`div`,{className:x.workspace,children:[(0,F.jsxs)(`header`,{className:x.header,...i(`app-shell`,`header`),children:[S?(0,F.jsx)(ue,{asChild:!0,children:(0,F.jsx)(f,{ref:j,size:`small`,shape:`square`,className:x.control,"aria-label":_.openNavigation,icon:(0,F.jsx)(s,{"aria-hidden":`true`})})}):K(!0),(0,F.jsx)(`div`,{className:x.headerActions,children:ne})]}),o,(0,F.jsx)(`main`,{ref:I,id:N,tabIndex:-1,className:x.content,...i(`app-shell`,`main`),children:se})]})]}),S&&(0,F.jsxs)(de,{overlayClassName:x.overlay,overlayAttributes:i(`app-shell`,`overlay`),className:x.drawer,...i(`app-shell`,`content`),onCloseAutoFocus:e=>{e.preventDefault(),j.current?.focus()},children:[(0,F.jsx)(fe,{className:x.drawerHeader,children:v}),(0,F.jsx)(`div`,{className:x.drawerBody,children:n(G)}),(0,F.jsx)(pe,{className:x.drawerClose,"aria-label":_.closeNavigation,...i(`app-shell`,`close-button`),children:(0,F.jsx)(oe,{"aria-hidden":`true`})})]})]})}})))()}function U(){let[e,t]=(0,W.useState)(`dashboard`);return(0,G.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,G.jsx)(V,{brand:`Publishing Admin`,brandIcon:(0,G.jsx)(A,{}),navigationLabel:`Workspace navigation`,style:{minHeight:`100%`},headerActions:(0,G.jsx)(l,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,G.jsx)(C,{sections:[{id:`workspace`,items:K}],activeId:e,collapsed:n,onItemSelect:e=>{t(e.id),r()}}),children:(0,G.jsx)(b,{children:(0,G.jsx)(v,{title:K.find(t=>t.id===e)?.label,description:`Select a section from the sidebar. Collapse it to keep more room for your content.`})})})})}var W,G,K;function q(){return(q=e((()=>{W=t(),H(),c(),w(),y(),k(),G=n(),K=[{id:`dashboard`,label:`Dashboard`,icon:(0,G.jsx)(A,{})},{id:`books`,label:`Books`,icon:(0,G.jsx)(M,{})},{id:`reviews`,label:`Reviews`,icon:(0,G.jsx)(j,{})},{id:`settings`,label:`Settings`,icon:(0,G.jsx)(N,{})}]})))()}function me(){let[e,t]=(0,J.useState)(`floating`),[n,r]=(0,J.useState)(`overview`);return(0,Y.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,Y.jsx)(V,{brand:`Workspace`,brandIcon:(0,Y.jsx)(A,{}),sidebarMode:e,onSidebarModeChange:t,style:{minHeight:`100%`},navigation:({collapsed:e,closeNavigation:t})=>(0,Y.jsx)(C,{sections:[{id:`workspace`,items:X}],activeId:n,collapsed:e,onItemSelect:e=>{r(e.id),t()}}),children:(0,Y.jsxs)(b,{children:[(0,Y.jsx)(v,{title:X.find(e=>e.id===n)?.label,description:`Control the sidebar from the header or the options below.`}),(0,Y.jsxs)(p,{label:`Sidebar mode`,value:e,onChange:e=>{(e===`floating`||e===`compact`||e===`expanded`)&&t(e)},children:[(0,Y.jsx)(g,{value:`floating`,children:`Floating`}),(0,Y.jsx)(g,{value:`compact`,children:`Compact`}),(0,Y.jsx)(g,{value:`expanded`,children:`Expanded`})]})]})})})}var J,Y,X;function he(){return(he=e((()=>{J=t(),H(),w(),y(),m(),h(),k(),Y=n(),X=[{id:`overview`,label:`Overview`,icon:(0,Y.jsx)(A,{})},{id:`settings`,label:`Settings`,icon:(0,Y.jsx)(N,{})}]})))()}function ge(){let[e,t]=(0,Z.useState)(`books`),[n,r]=(0,Z.useState)(0);return(0,Q.jsx)(`div`,{style:{height:320,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,Q.jsx)(V,{brand:`Publishing Admin`,brandIcon:(0,Q.jsx)(A,{}),skipLink:`Skip to the book list`,style:{minHeight:`100%`},headerActions:(0,Q.jsx)(l,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,Q.jsx)(C,{sections:[{id:`workspace`,items:$}],collapsed:n,activeId:e,onItemSelect:e=>{t(e.id),r()}}),children:(0,Q.jsxs)(b,{children:[(0,Q.jsx)(v,{title:$.find(t=>t.id===e)?.label,description:`Focus the frame and press Tab: the skip link appears first`}),(0,Q.jsx)(se,{size:`small`,onClick:()=>r(n+1),children:`First action of the content`}),(0,Q.jsxs)(`output`,{"aria-live":`polite`,children:[`Activated `,n,` times`]})]})})})}var Z,Q,$;function _e(){return(_e=e((()=>{Z=t(),H(),a(),c(),w(),y(),k(),Q=n(),$=[`Dashboard`,`Books`,`Reviews`,`Settings`].map(e=>({id:e.toLowerCase(),label:e,icon:(0,Q.jsx)(A,{})}))})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useState } from "react";
import { AppShell, Badge, NavTree, Page, PageHeader } from "minerva-design";
import {
  LuBookOpen,
  LuLayoutDashboard,
  LuMessageSquare,
  LuSettings,
} from "react-icons/lu";

const items = [
  { id: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
  { id: "books", label: "Books", icon: <LuBookOpen /> },
  { id: "reviews", label: "Reviews", icon: <LuMessageSquare /> },
  { id: "settings", label: "Settings", icon: <LuSettings /> },
];

export default function BasicDemo() {
  const [active, setActive] = useState("dashboard");
  return (
    // The transform makes the fixed sidebar relative to this preview frame.
    <div
      style={{
        height: 360,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Publishing Admin"
        brandIcon={<LuLayoutDashboard />}
        navigationLabel="Workspace navigation"
        style={{ minHeight: "100%" }}
        headerActions={
          <Badge color="neutral" variant="subtle">
            Workspace
          </Badge>
        }
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            activeId={active}
            collapsed={collapsed}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Select a section from the sidebar. Collapse it to keep more room for your content."
          />
        </Page>
      </AppShell>
    </div>
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useState } from "react";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  Radio,
  RadioGroup,
  type AppShellSidebarMode,
} from "minerva-design";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";

const items = [
  { id: "overview", label: "Overview", icon: <LuLayoutDashboard /> },
  { id: "settings", label: "Settings", icon: <LuSettings /> },
];

export default function ControlledDemo() {
  const [mode, setMode] = useState<AppShellSidebarMode>("floating");
  const [active, setActive] = useState("overview");
  return (
    <div
      style={{
        height: 360,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Workspace"
        brandIcon={<LuLayoutDashboard />}
        sidebarMode={mode}
        onSidebarModeChange={setMode}
        style={{ minHeight: "100%" }}
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            activeId={active}
            collapsed={collapsed}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Control the sidebar from the header or the options below."
          />
          <RadioGroup
            label="Sidebar mode"
            value={mode}
            onChange={(value) => {
              if (
                value === "floating" ||
                value === "compact" ||
                value === "expanded"
              )
                setMode(value);
            }}
          >
            <Radio value="floating">Floating</Radio>
            <Radio value="compact">Compact</Radio>
            <Radio value="expanded">Expanded</Radio>
          </RadioGroup>
        </Page>
      </AppShell>
    </div>
  );
}
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useState } from "react";
import {
  AppShell,
  Button,
  Badge,
  NavTree,
  Page,
  PageHeader,
} from "minerva-design";
import { LuLayoutDashboard } from "react-icons/lu";

const items = ["Dashboard", "Books", "Reviews", "Settings"].map((label) => ({
  id: label.toLowerCase(),
  label,
  icon: <LuLayoutDashboard />,
}));

export default function SkipLinkDemo() {
  const [active, setActive] = useState("books");
  const [count, setCount] = useState(0);
  return (
    // The transform makes the fixed sidebar relative to this preview frame.
    <div
      style={{
        height: 320,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Publishing Admin"
        brandIcon={<LuLayoutDashboard />}
        skipLink="Skip to the book list"
        style={{ minHeight: "100%" }}
        headerActions={
          <Badge color="neutral" variant="subtle">
            Workspace
          </Badge>
        }
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            collapsed={collapsed}
            activeId={active}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Focus the frame and press Tab: the skip link appears first"
          />
          <Button size="small" onClick={() => setCount(count + 1)}>
            First action of the content
          </Button>
          <output aria-live="polite">Activated {count} times</output>
        </Page>
      </AppShell>
    </div>
  );
}
`})))()}var we,Te,Ee;function De(){return(De=e((()=>{q(),he(),_e(),ye(),xe(),Ce(),t(),E(),O(),we=n(),Te=T(Object.assign({"./demos/basic.tsx":U,"./demos/controlled.tsx":me,"./demos/skip-link.tsx":ge}),Object.assign({"./demos/basic.tsx":ve,"./demos/controlled.tsx":be,"./demos/skip-link.tsx":Se})),Ee=()=>(0,we.jsx)(D,{id:`app-shell`,demos:Te})})))()}De();export{Ee as default};