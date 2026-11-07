import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{_t as r,vt as ee}from"./io5-DGxLJ5Qx.js";import{Mn as i,rt as te}from"./angular-preview-CxN7u9Fp.js";import{B as ne,R as re,T as ie,V as ae,c as oe,f as se,o as a,s as ce,w as le,z as o}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{n as c,t as l}from"./Badge-QwSC7XST.js";import{i as u,r as d}from"./CodeBlock-Y-lIOv3H.js";import{i as f,n as p,r as m,t as h}from"./Radio-DZ0GJqPj.js";import{a as g,i as ue,n as de,o as fe,r as pe,t as me}from"./Dialog-CCGgD5QX.js";import{a as _,i as v,t as y}from"./Page-BVQwINwF.js";import{n as b,t as x}from"./appShell.module.scss-bPSQ8Ior.js";import{n as S,t as C}from"./NavTree-CQcvlP1E.js";import{l as w,n as T,t as he,u as E}from"./DocPage-BC6BZEJM.js";import{A as D,S as O,_ as k,n as A,p as j}from"./lu-BQw33M53.js";var M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{i(),ae(),ie(),ee(),u(),g(),x(),M=t(),N=n(),P=`(max-width: 768px)`,F=()=>typeof window<`u`&&typeof window.matchMedia==`function`,I=e=>{if(!F())return()=>{};let t=window.matchMedia(P);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},L=()=>F()&&window.matchMedia(P).matches,R=()=>!1,z=({brand:e,brandIcon:t,navigation:n,navigationLabel:ee,navigationKey:i,headerActions:re,pageNavigation:ie,children:ae,sidebarMode:o,defaultSidebarMode:c,onSidebarModeChange:l,labels:u,skipLink:f=!0,className:p,...m})=>{let{t:h}=ne(),g={expand:u?.expand??h(`appShell.expand`),collapse:u?.collapse??h(`appShell.collapse`),enableFloating:u?.enableFloating??h(`appShell.enableFloating`),disableFloating:u?.disableFloating??h(`appShell.disableFloating`),openNavigation:u?.openNavigation??h(`appShell.openNavigation`),closeNavigation:u?.closeNavigation??h(`appShell.closeNavigation`)},_=ee??h(`appShell.navigation`),[v,y]=r({value:o,defaultValue:c??`expanded`,onChange:l,name:`AppShell`,prop:`sidebarMode`}),x=(0,M.useSyncExternalStore)(I,L,R),[S,C]=(0,M.useState)(!1),[w,T]=(0,M.useState)(!1),[he,E]=(0,M.useState)(!1),[D,O]=(0,M.useState)({navigationKey:i,isMobile:x});(D.navigationKey!==i||D.isMobile!==x)&&(O({navigationKey:i,isMobile:x}),C(!1),D.isMobile!==x&&(T(!1),E(!1)));let k=(0,M.useRef)(null),A=(0,M.useId)(),j=(0,M.useId)(),P=(0,M.useRef)(null),F=typeof f==`string`?f:h(`appShell.skipToContent`),z=x&&S,B=(0,M.useRef)(!1);(0,M.useEffect)(()=>{!x&&B.current&&k.current?.focus()},[x]),(0,M.useEffect)(()=>{B.current=z});let V=!x&&v!==`expanded`&&(v!==`floating`||!w&&!he),H=v!==`expanded`,U={collapsed:V,isMobile:x,closeNavigation:()=>C(!1),expandNavigation:()=>y(`expanded`)},W=e=>(0,N.jsx)(d,{ref:e?k:void 0,size:`small`,shape:`square`,className:b.control,"aria-label":H?g.expand:g.collapse,"aria-controls":A,"aria-expanded":!V,onClick:()=>y(H?`expanded`:`compact`),icon:(0,N.jsx)(H?a:se,{"aria-hidden":`true`})});return(0,N.jsxs)(ue,{open:z,onOpenChange:C,children:[(0,N.jsxs)(`div`,{className:te(b.shell,p),"data-sidebar-mode":v,"data-sidebar-expanded":!V||void 0,...m,...s(`app-shell`,`root`,{state:z?`open`:`closed`}),children:[f!==!1&&(0,N.jsx)(`a`,{className:b.skipLink,href:`#${j}`,...s(`app-shell`,`skip-link`),onClick:e=>{e.preventDefault(),P.current?.focus()},children:F}),!x&&(0,N.jsxs)(`aside`,{id:A,className:b.sidebar,"aria-label":_,...s(`app-shell`,`sidebar`),onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),onFocusCapture:e=>{e.target.matches(`:focus-visible`)&&E(!0)},onKeyDownCapture:e=>{e.key===`Tab`&&E(!0)},onPointerDownCapture:()=>E(!1),onBlurCapture:e=>{e.currentTarget.contains(e.relatedTarget)||E(!1)},children:[(0,N.jsxs)(`div`,{className:b.brand,children:[t&&(0,N.jsx)(`span`,{className:b.brandIcon,"aria-hidden":`true`,children:t}),(0,N.jsx)(`span`,{className:b.brandLabel,children:e})]}),(0,N.jsx)(`div`,{className:b.navigation,children:n(U)}),(0,N.jsxs)(`div`,{className:b.sidebarActions,children:[W(!1),(0,N.jsx)(d,{size:`small`,shape:`square`,className:b.control,"aria-pressed":v===`floating`,"aria-label":v===`floating`?g.disableFloating:g.enableFloating,onClick:()=>y(v===`floating`?`compact`:`floating`),icon:(0,N.jsx)(v===`floating`?oe:ce,{"aria-hidden":`true`})})]})]}),(0,N.jsxs)(`div`,{className:b.workspace,children:[(0,N.jsxs)(`header`,{className:b.header,...s(`app-shell`,`header`),children:[x?(0,N.jsx)(de,{asChild:!0,children:(0,N.jsx)(d,{ref:k,size:`small`,shape:`square`,className:b.control,"aria-label":g.openNavigation,icon:(0,N.jsx)(a,{"aria-hidden":`true`})})}):W(!0),(0,N.jsx)(`div`,{className:b.headerActions,children:re})]}),ie,(0,N.jsx)(`main`,{ref:P,id:j,tabIndex:-1,className:b.content,...s(`app-shell`,`main`),children:ae})]})]}),x&&(0,N.jsxs)(fe,{overlayClassName:b.overlay,overlayAttributes:s(`app-shell`,`overlay`),className:b.drawer,...s(`app-shell`,`content`),onCloseAutoFocus:e=>{e.preventDefault(),k.current?.focus()},children:[(0,N.jsx)(pe,{className:b.drawerHeader,children:_}),(0,N.jsx)(`div`,{className:b.drawerBody,children:n(U)}),(0,N.jsx)(me,{className:b.drawerClose,"aria-label":g.closeNavigation,...s(`app-shell`,`close-button`),children:(0,N.jsx)(le,{"aria-hidden":`true`})})]})]})}})))()}function V(){let[e,t]=(0,H.useState)(`dashboard`);return(0,U.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,U.jsx)(z,{brand:`Publishing Admin`,brandIcon:(0,U.jsx)(j,{}),navigationLabel:`Workspace navigation`,style:{minHeight:`100%`},headerActions:(0,U.jsx)(l,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,U.jsx)(S,{sections:[{id:`workspace`,items:W}],activeId:e,collapsed:n,onItemSelect:e=>{t(e.id),r()}}),children:(0,U.jsx)(y,{children:(0,U.jsx)(_,{title:W.find(t=>t.id===e)?.label,description:`Select a section from the sidebar. Collapse it to keep more room for your content.`})})})})}var H,U,W;function G(){return(G=e((()=>{H=t(),B(),c(),C(),v(),D(),U=n(),W=[{id:`dashboard`,label:`Dashboard`,icon:(0,U.jsx)(j,{})},{id:`books`,label:`Books`,icon:(0,U.jsx)(A,{})},{id:`reviews`,label:`Reviews`,icon:(0,U.jsx)(k,{})},{id:`settings`,label:`Settings`,icon:(0,U.jsx)(O,{})}]})))()}function ge(){let[e,t]=(0,K.useState)(`floating`),[n,r]=(0,K.useState)(`overview`);return(0,q.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,q.jsx)(z,{brand:`Workspace`,brandIcon:(0,q.jsx)(j,{}),sidebarMode:e,onSidebarModeChange:t,style:{minHeight:`100%`},navigation:({collapsed:e,closeNavigation:t})=>(0,q.jsx)(S,{sections:[{id:`workspace`,items:J}],activeId:n,collapsed:e,onItemSelect:e=>{r(e.id),t()}}),children:(0,q.jsxs)(y,{children:[(0,q.jsx)(_,{title:J.find(e=>e.id===n)?.label,description:`Control the sidebar from the header or the options below.`}),(0,q.jsxs)(f,{label:`Sidebar mode`,value:e,onChange:e=>{(e===`floating`||e===`compact`||e===`expanded`)&&t(e)},children:[(0,q.jsx)(h,{value:`floating`,children:`Floating`}),(0,q.jsx)(h,{value:`compact`,children:`Compact`}),(0,q.jsx)(h,{value:`expanded`,children:`Expanded`})]})]})})})}var K,q,J;function Y(){return(Y=e((()=>{K=t(),B(),C(),v(),p(),m(),D(),q=n(),J=[{id:`overview`,label:`Overview`,icon:(0,q.jsx)(j,{})},{id:`settings`,label:`Settings`,icon:(0,q.jsx)(O,{})}]})))()}function _e(){let[e,t]=(0,X.useState)(`books`),[n,r]=(0,X.useState)(0);return(0,Z.jsx)(`div`,{style:{height:320,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,Z.jsx)(z,{brand:`Publishing Admin`,brandIcon:(0,Z.jsx)(j,{}),skipLink:`Skip to the book list`,style:{minHeight:`100%`},headerActions:(0,Z.jsx)(l,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,Z.jsx)(S,{sections:[{id:`workspace`,items:Q}],collapsed:n,activeId:e,onItemSelect:e=>{t(e.id),r()}}),children:(0,Z.jsxs)(y,{children:[(0,Z.jsx)(_,{title:Q.find(t=>t.id===e)?.label,description:`Focus the frame and press Tab: the skip link appears first`}),(0,Z.jsx)(o,{size:`small`,onClick:()=>r(n+1),children:`First action of the content`}),(0,Z.jsxs)(`output`,{"aria-live":`polite`,children:[`Activated `,n,` times`]})]})})})}var X,Z,Q;function ve(){return(ve=e((()=>{X=t(),B(),re(),c(),C(),v(),D(),Z=n(),Q=[`Dashboard`,`Books`,`Reviews`,`Settings`].map(e=>({id:e.toLowerCase(),label:e,icon:(0,Z.jsx)(j,{})}))})))()}var ye;function be(){return(be=e((()=>{ye=`import { useState } from "react";
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
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { useState } from "react";
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
`})))()}var Ce;function $(){return($=e((()=>{Ce=`import { useState } from "react";
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
`})))()}var we,Te,Ee;function De(){return(De=e((()=>{G(),Y(),ve(),be(),Se(),$(),t(),T(),E(),we=n(),Te=w(Object.assign({"./demos/basic.tsx":V,"./demos/controlled.tsx":ge,"./demos/skip-link.tsx":_e}),Object.assign({"./demos/basic.tsx":ye,"./demos/controlled.tsx":xe,"./demos/skip-link.tsx":Ce})),Ee=()=>(0,we.jsx)(he,{id:`app-shell`,demos:Te})})))()}De();export{Ee as default};