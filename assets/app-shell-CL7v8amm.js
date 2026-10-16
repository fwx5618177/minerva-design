import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,J as i,St as ee,q as a}from"./io5-BMMdBk1L.js";import{It as te,ut as ne}from"./angular-preview-l4x8c_2r.js";import{B as o,H as re,R as s,T as c,U as l,c as ie,f as ae,o as oe,s as se,w as ce,z as u}from"./ProgressIndicator-BhPa7d9i.js";import{n as d,t as f}from"./Badge-CjXT4_l5.js";import{i as p,n as m,r as h,t as g}from"./Radio-BHEPkSTO.js";import{a as _,i as le,n as ue,o as de,r as fe,t as pe}from"./Dialog-B_pfN3bE.js";import{a as v,i as y,t as b}from"./Page-Cot7PzbH.js";import{n as x,t as S}from"./appShell.module.scss-bPSQ8Ior.js";import{n as C,t as w}from"./NavTree-CVymi2wg.js";import{l as T,n as E,t as me,u as D}from"./DocPage-D-H5cPcd.js";import{E as O,f as k,m as A,n as j,v as M}from"./lu-C7cV6_vw.js";var N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{te(),l(),c(),r(),i(),_(),S(),N=t(),P=n(),F=`(max-width: 768px)`,I=()=>typeof window<`u`&&typeof window.matchMedia==`function`,L=e=>{if(!I())return()=>{};let t=window.matchMedia(F);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},R=()=>I()&&window.matchMedia(F).matches,z=()=>!1,B=({brand:e,brandIcon:t,navigation:n,navigationLabel:r,navigationKey:i,headerActions:te,pageNavigation:s,children:c,sidebarMode:l,defaultSidebarMode:u,onSidebarModeChange:d,labels:f,skipLink:p=!0,className:m,...h})=>{let{t:g}=re(),_={expand:f?.expand??g(`appShell.expand`),collapse:f?.collapse??g(`appShell.collapse`),enableFloating:f?.enableFloating??g(`appShell.enableFloating`),disableFloating:f?.disableFloating??g(`appShell.disableFloating`),openNavigation:f?.openNavigation??g(`appShell.openNavigation`),closeNavigation:f?.closeNavigation??g(`appShell.closeNavigation`)},v=r??g(`appShell.navigation`),[y,b]=ee({value:l,defaultValue:u??`expanded`,onChange:d,name:`AppShell`,prop:`sidebarMode`}),S=(0,N.useSyncExternalStore)(L,R,z),[C,w]=(0,N.useState)(!1),[T,E]=(0,N.useState)(!1),[me,D]=(0,N.useState)(!1),[O,k]=(0,N.useState)({navigationKey:i,isMobile:S});(O.navigationKey!==i||O.isMobile!==S)&&(k({navigationKey:i,isMobile:S}),w(!1),O.isMobile!==S&&(E(!1),D(!1)));let A=(0,N.useRef)(null),j=(0,N.useId)(),M=(0,N.useId)(),F=(0,N.useRef)(null),I=typeof p==`string`?p:g(`appShell.skipToContent`),B=S&&C,V=(0,N.useRef)(!1);(0,N.useEffect)(()=>{!S&&V.current&&A.current?.focus()},[S]),(0,N.useEffect)(()=>{V.current=B});let H=!S&&y!==`expanded`&&(y!==`floating`||!T&&!me),U=y!==`expanded`,W={collapsed:H,isMobile:S,closeNavigation:()=>w(!1),expandNavigation:()=>b(`expanded`)},G=e=>(0,P.jsx)(a,{ref:e?A:void 0,size:`small`,shape:`square`,className:x.control,"aria-label":U?_.expand:_.collapse,"aria-controls":j,"aria-expanded":!H,onClick:()=>b(U?`expanded`:`compact`),icon:(0,P.jsx)(U?oe:ae,{"aria-hidden":`true`})});return(0,P.jsxs)(le,{open:B,onOpenChange:w,children:[(0,P.jsxs)(`div`,{className:ne(x.shell,m),"data-sidebar-mode":y,"data-sidebar-expanded":!H||void 0,...h,...o(`app-shell`,`root`,{state:B?`open`:`closed`}),children:[p!==!1&&(0,P.jsx)(`a`,{className:x.skipLink,href:`#${M}`,...o(`app-shell`,`skip-link`),onClick:e=>{e.preventDefault(),F.current?.focus()},children:I}),!S&&(0,P.jsxs)(`aside`,{id:j,className:x.sidebar,"aria-label":v,...o(`app-shell`,`sidebar`),onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1),onFocusCapture:e=>{e.target.matches(`:focus-visible`)&&D(!0)},onKeyDownCapture:e=>{e.key===`Tab`&&D(!0)},onPointerDownCapture:()=>D(!1),onBlurCapture:e=>{e.currentTarget.contains(e.relatedTarget)||D(!1)},children:[(0,P.jsxs)(`div`,{className:x.brand,children:[t&&(0,P.jsx)(`span`,{className:x.brandIcon,"aria-hidden":`true`,children:t}),(0,P.jsx)(`span`,{className:x.brandLabel,children:e})]}),(0,P.jsx)(`div`,{className:x.navigation,children:n(W)}),(0,P.jsxs)(`div`,{className:x.sidebarActions,children:[G(!1),(0,P.jsx)(a,{size:`small`,shape:`square`,className:x.control,"aria-pressed":y===`floating`,"aria-label":y===`floating`?_.disableFloating:_.enableFloating,onClick:()=>b(y===`floating`?`compact`:`floating`),icon:(0,P.jsx)(y===`floating`?ie:se,{"aria-hidden":`true`})})]})]}),(0,P.jsxs)(`div`,{className:x.workspace,children:[(0,P.jsxs)(`header`,{className:x.header,...o(`app-shell`,`header`),children:[S?(0,P.jsx)(ue,{asChild:!0,children:(0,P.jsx)(a,{ref:A,size:`small`,shape:`square`,className:x.control,"aria-label":_.openNavigation,icon:(0,P.jsx)(oe,{"aria-hidden":`true`})})}):G(!0),(0,P.jsx)(`div`,{className:x.headerActions,children:te})]}),s,(0,P.jsx)(`main`,{ref:F,id:M,tabIndex:-1,className:x.content,...o(`app-shell`,`main`),children:c})]})]}),S&&(0,P.jsxs)(de,{overlayClassName:x.overlay,overlayAttributes:o(`app-shell`,`overlay`),className:x.drawer,...o(`app-shell`,`content`),onCloseAutoFocus:e=>{e.preventDefault(),A.current?.focus()},children:[(0,P.jsx)(fe,{className:x.drawerHeader,children:v}),(0,P.jsx)(`div`,{className:x.drawerBody,children:n(W)}),(0,P.jsx)(pe,{className:x.drawerClose,"aria-label":_.closeNavigation,...o(`app-shell`,`close-button`),children:(0,P.jsx)(ce,{"aria-hidden":`true`})})]})]})}})))()}function H(){let[e,t]=(0,U.useState)(`dashboard`);return(0,W.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,W.jsx)(B,{brand:`Publishing Admin`,brandIcon:(0,W.jsx)(k,{}),navigationLabel:`Workspace navigation`,style:{minHeight:`100%`},headerActions:(0,W.jsx)(f,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,W.jsx)(C,{sections:[{id:`workspace`,items:G}],activeId:e,collapsed:n,onItemSelect:e=>{t(e.id),r()}}),children:(0,W.jsx)(b,{children:(0,W.jsx)(v,{title:G.find(t=>t.id===e)?.label,description:`Select a section from the sidebar. Collapse it to keep more room for your content.`})})})})}var U,W,G;function K(){return(K=e((()=>{U=t(),V(),d(),w(),y(),O(),W=n(),G=[{id:`dashboard`,label:`Dashboard`,icon:(0,W.jsx)(k,{})},{id:`books`,label:`Books`,icon:(0,W.jsx)(j,{})},{id:`reviews`,label:`Reviews`,icon:(0,W.jsx)(A,{})},{id:`settings`,label:`Settings`,icon:(0,W.jsx)(M,{})}]})))()}function he(){let[e,t]=(0,q.useState)(`floating`),[n,r]=(0,q.useState)(`overview`);return(0,J.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,J.jsx)(B,{brand:`Workspace`,brandIcon:(0,J.jsx)(k,{}),sidebarMode:e,onSidebarModeChange:t,style:{minHeight:`100%`},navigation:({collapsed:e,closeNavigation:t})=>(0,J.jsx)(C,{sections:[{id:`workspace`,items:Y}],activeId:n,collapsed:e,onItemSelect:e=>{r(e.id),t()}}),children:(0,J.jsxs)(b,{children:[(0,J.jsx)(v,{title:Y.find(e=>e.id===n)?.label,description:`Control the sidebar from the header or the options below.`}),(0,J.jsxs)(p,{label:`Sidebar mode`,value:e,onChange:e=>{(e===`floating`||e===`compact`||e===`expanded`)&&t(e)},children:[(0,J.jsx)(g,{value:`floating`,children:`Floating`}),(0,J.jsx)(g,{value:`compact`,children:`Compact`}),(0,J.jsx)(g,{value:`expanded`,children:`Expanded`})]})]})})})}var q,J,Y;function ge(){return(ge=e((()=>{q=t(),V(),w(),y(),m(),h(),O(),J=n(),Y=[{id:`overview`,label:`Overview`,icon:(0,J.jsx)(k,{})},{id:`settings`,label:`Settings`,icon:(0,J.jsx)(M,{})}]})))()}function _e(){let[e,t]=(0,X.useState)(`books`),[n,r]=(0,X.useState)(0);return(0,Z.jsx)(`div`,{style:{height:320,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,Z.jsx)(B,{brand:`Publishing Admin`,brandIcon:(0,Z.jsx)(k,{}),skipLink:`Skip to the book list`,style:{minHeight:`100%`},headerActions:(0,Z.jsx)(f,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,Z.jsx)(C,{sections:[{id:`workspace`,items:Q}],collapsed:n,activeId:e,onItemSelect:e=>{t(e.id),r()}}),children:(0,Z.jsxs)(b,{children:[(0,Z.jsx)(v,{title:Q.find(t=>t.id===e)?.label,description:`Focus the frame and press Tab: the skip link appears first`}),(0,Z.jsx)(u,{size:`small`,onClick:()=>r(n+1),children:`First action of the content`}),(0,Z.jsxs)(`output`,{"aria-live":`polite`,children:[`Activated `,n,` times`]})]})})})}var X,Z,Q;function ve(){return(ve=e((()=>{X=t(),V(),s(),d(),w(),y(),O(),Z=n(),Q=[`Dashboard`,`Books`,`Reviews`,`Settings`].map(e=>({id:e.toLowerCase(),label:e,icon:(0,Z.jsx)(k,{})}))})))()}var ye;function be(){return(be=e((()=>{ye=`import { useState } from "react";
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
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useState } from "react";
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
`})))()}var Te,Ee,De;function $(){return($=e((()=>{K(),ge(),ve(),be(),Se(),we(),t(),E(),D(),Te=n(),Ee=T(Object.assign({"./demos/basic.tsx":H,"./demos/controlled.tsx":he,"./demos/skip-link.tsx":_e}),Object.assign({"./demos/basic.tsx":ye,"./demos/controlled.tsx":xe,"./demos/skip-link.tsx":Ce})),De=()=>(0,Te.jsx)(me,{id:`app-shell`,demos:Ee})})))()}$();export{De as default};