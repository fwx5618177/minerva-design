import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Zt as r,wn as i}from"./angular-preview-BdNkX8l5.js";import{B as ee,R as a,T as te,V as ne,c as re,f as ie,o,s as ae,w as oe,z as s}from"./ProgressIndicator-Har2Rnl4.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{n as l,t as u}from"./Badge-OPvCd3eJ.js";import{St as d,xt as se}from"./io5-Bd77grqv.js";import{i as f,r as p}from"./CodeBlock-BJ07eATS.js";import{i as m,n as h,r as g,t as _}from"./Radio-B_5YyC0f.js";import{a as v,i as ce,n as le,o as ue,r as de,t as fe}from"./Dialog-DqqLNj9d.js";import{a as y,i as b,t as x}from"./Page-BphVscPj.js";import{n as S,t as C}from"./appShell.module.scss-bPSQ8Ior.js";import{n as w,t as T}from"./NavTree-DrVfo-lY.js";import{l as pe,n as E,t as me,u as D}from"./DocPage-B9A8Jzu-.js";import{A as O,S as k,_ as A,n as j,p as M}from"./lu-BPPcRwEl.js";var N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{i(),ne(),te(),d(),f(),v(),C(),N=t(),P=n(),F=`(max-width: 768px)`,I=()=>typeof window<`u`&&typeof window.matchMedia==`function`,L=e=>{if(!I())return()=>{};let t=window.matchMedia(F);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},R=()=>I()&&window.matchMedia(F).matches,z=()=>!1,B=({brand:e,brandIcon:t,navigation:n,navigationLabel:i,navigationKey:a,headerActions:te,pageNavigation:ne,children:s,sidebarMode:l,defaultSidebarMode:u,onSidebarModeChange:d,labels:f,skipLink:m=!0,className:h,...g})=>{let{t:_}=ee(),v={expand:f?.expand??_(`appShell.expand`),collapse:f?.collapse??_(`appShell.collapse`),enableFloating:f?.enableFloating??_(`appShell.enableFloating`),disableFloating:f?.disableFloating??_(`appShell.disableFloating`),openNavigation:f?.openNavigation??_(`appShell.openNavigation`),closeNavigation:f?.closeNavigation??_(`appShell.closeNavigation`)},y=i??_(`appShell.navigation`),[b,x]=se({value:l,defaultValue:u??`expanded`,onChange:d,name:`AppShell`,prop:`sidebarMode`}),C=(0,N.useSyncExternalStore)(L,R,z),[w,T]=(0,N.useState)(!1),[pe,E]=(0,N.useState)(!1),[me,D]=(0,N.useState)(!1),[O,k]=(0,N.useState)({navigationKey:a,isMobile:C});(O.navigationKey!==a||O.isMobile!==C)&&(k({navigationKey:a,isMobile:C}),T(!1),O.isMobile!==C&&(E(!1),D(!1)));let A=(0,N.useRef)(null),j=(0,N.useId)(),M=(0,N.useId)(),F=(0,N.useRef)(null),I=typeof m==`string`?m:_(`appShell.skipToContent`),B=C&&w,V=(0,N.useRef)(!1);(0,N.useEffect)(()=>{!C&&V.current&&A.current?.focus()},[C]),(0,N.useEffect)(()=>{V.current=B});let H=!C&&b!==`expanded`&&(b!==`floating`||!pe&&!me),U=b!==`expanded`,W={collapsed:H,isMobile:C,closeNavigation:()=>T(!1),expandNavigation:()=>x(`expanded`)},G=e=>(0,P.jsx)(p,{ref:e?A:void 0,size:`small`,shape:`square`,className:S.control,"aria-label":U?v.expand:v.collapse,"aria-controls":j,"aria-expanded":!H,onClick:()=>x(U?`expanded`:`compact`),icon:(0,P.jsx)(U?o:ie,{"aria-hidden":`true`})});return(0,P.jsxs)(ce,{open:B,onOpenChange:T,children:[(0,P.jsxs)(`div`,{className:r(S.shell,h),"data-sidebar-mode":b,"data-sidebar-expanded":!H||void 0,...g,...c(`app-shell`,`root`,{state:B?`open`:`closed`}),children:[m!==!1&&(0,P.jsx)(`a`,{className:S.skipLink,href:`#${M}`,...c(`app-shell`,`skip-link`),onClick:e=>{e.preventDefault(),F.current?.focus()},children:I}),!C&&(0,P.jsxs)(`aside`,{id:j,className:S.sidebar,"aria-label":y,...c(`app-shell`,`sidebar`),onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1),onFocusCapture:e=>{e.target.matches(`:focus-visible`)&&D(!0)},onKeyDownCapture:e=>{e.key===`Tab`&&D(!0)},onPointerDownCapture:()=>D(!1),onBlurCapture:e=>{e.currentTarget.contains(e.relatedTarget)||D(!1)},children:[(0,P.jsxs)(`div`,{className:S.brand,children:[t&&(0,P.jsx)(`span`,{className:S.brandIcon,"aria-hidden":`true`,children:t}),(0,P.jsx)(`span`,{className:S.brandLabel,children:e})]}),(0,P.jsx)(`div`,{className:S.navigation,children:n(W)}),(0,P.jsxs)(`div`,{className:S.sidebarActions,children:[G(!1),(0,P.jsx)(p,{size:`small`,shape:`square`,className:S.control,"aria-pressed":b===`floating`,"aria-label":b===`floating`?v.disableFloating:v.enableFloating,onClick:()=>x(b===`floating`?`compact`:`floating`),icon:(0,P.jsx)(b===`floating`?re:ae,{"aria-hidden":`true`})})]})]}),(0,P.jsxs)(`div`,{className:S.workspace,children:[(0,P.jsxs)(`header`,{className:S.header,...c(`app-shell`,`header`),children:[C?(0,P.jsx)(le,{asChild:!0,children:(0,P.jsx)(p,{ref:A,size:`small`,shape:`square`,className:S.control,"aria-label":v.openNavigation,icon:(0,P.jsx)(o,{"aria-hidden":`true`})})}):G(!0),(0,P.jsx)(`div`,{className:S.headerActions,children:te})]}),ne,(0,P.jsx)(`main`,{ref:F,id:M,tabIndex:-1,className:S.content,...c(`app-shell`,`main`),children:s})]})]}),C&&(0,P.jsxs)(ue,{overlayClassName:S.overlay,overlayAttributes:c(`app-shell`,`overlay`),className:S.drawer,...c(`app-shell`,`content`),onCloseAutoFocus:e=>{e.preventDefault(),A.current?.focus()},children:[(0,P.jsx)(de,{className:S.drawerHeader,children:y}),(0,P.jsx)(`div`,{className:S.drawerBody,children:n(W)}),(0,P.jsx)(fe,{className:S.drawerClose,"aria-label":v.closeNavigation,...c(`app-shell`,`close-button`),children:(0,P.jsx)(oe,{"aria-hidden":`true`})})]})]})}})))()}function H(){let[e,t]=(0,U.useState)(`dashboard`);return(0,W.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,W.jsx)(B,{brand:`Publishing Admin`,brandIcon:(0,W.jsx)(M,{}),navigationLabel:`Workspace navigation`,style:{minHeight:`100%`},headerActions:(0,W.jsx)(u,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,W.jsx)(w,{sections:[{id:`workspace`,items:G}],activeId:e,collapsed:n,onItemSelect:e=>{t(e.id),r()}}),children:(0,W.jsx)(x,{children:(0,W.jsx)(y,{title:G.find(t=>t.id===e)?.label,description:`Select a section from the sidebar. Collapse it to keep more room for your content.`})})})})}var U,W,G;function K(){return(K=e((()=>{U=t(),V(),l(),T(),b(),O(),W=n(),G=[{id:`dashboard`,label:`Dashboard`,icon:(0,W.jsx)(M,{})},{id:`books`,label:`Books`,icon:(0,W.jsx)(j,{})},{id:`reviews`,label:`Reviews`,icon:(0,W.jsx)(A,{})},{id:`settings`,label:`Settings`,icon:(0,W.jsx)(k,{})}]})))()}function he(){let[e,t]=(0,q.useState)(`floating`),[n,r]=(0,q.useState)(`overview`);return(0,J.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,J.jsx)(B,{brand:`Workspace`,brandIcon:(0,J.jsx)(M,{}),sidebarMode:e,onSidebarModeChange:t,style:{minHeight:`100%`},navigation:({collapsed:e,closeNavigation:t})=>(0,J.jsx)(w,{sections:[{id:`workspace`,items:Y}],activeId:n,collapsed:e,onItemSelect:e=>{r(e.id),t()}}),children:(0,J.jsxs)(x,{children:[(0,J.jsx)(y,{title:Y.find(e=>e.id===n)?.label,description:`Control the sidebar from the header or the options below.`}),(0,J.jsxs)(m,{label:`Sidebar mode`,value:e,onChange:e=>{(e===`floating`||e===`compact`||e===`expanded`)&&t(e)},children:[(0,J.jsx)(_,{value:`floating`,children:`Floating`}),(0,J.jsx)(_,{value:`compact`,children:`Compact`}),(0,J.jsx)(_,{value:`expanded`,children:`Expanded`})]})]})})})}var q,J,Y;function ge(){return(ge=e((()=>{q=t(),V(),T(),b(),h(),g(),O(),J=n(),Y=[{id:`overview`,label:`Overview`,icon:(0,J.jsx)(M,{})},{id:`settings`,label:`Settings`,icon:(0,J.jsx)(k,{})}]})))()}function _e(){let[e,t]=(0,X.useState)(`books`),[n,r]=(0,X.useState)(0);return(0,Z.jsx)(`div`,{style:{height:320,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,Z.jsx)(B,{brand:`Publishing Admin`,brandIcon:(0,Z.jsx)(M,{}),skipLink:`Skip to the book list`,style:{minHeight:`100%`},headerActions:(0,Z.jsx)(u,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,Z.jsx)(w,{sections:[{id:`workspace`,items:Q}],collapsed:n,activeId:e,onItemSelect:e=>{t(e.id),r()}}),children:(0,Z.jsxs)(x,{children:[(0,Z.jsx)(y,{title:Q.find(t=>t.id===e)?.label,description:`Focus the frame and press Tab: the skip link appears first`}),(0,Z.jsx)(s,{size:`small`,onClick:()=>r(n+1),children:`First action of the content`}),(0,Z.jsxs)(`output`,{"aria-live":`polite`,children:[`Activated `,n,` times`]})]})})})}var X,Z,Q;function ve(){return(ve=e((()=>{X=t(),V(),a(),l(),T(),b(),O(),Z=n(),Q=[`Dashboard`,`Books`,`Reviews`,`Settings`].map(e=>({id:e.toLowerCase(),label:e,icon:(0,Z.jsx)(M,{})}))})))()}var ye;function be(){return(be=e((()=>{ye=`import { useState } from "react";
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
`})))()}var we,Te,Ee;function De(){return(De=e((()=>{K(),ge(),ve(),be(),Se(),$(),t(),E(),D(),we=n(),Te=pe(Object.assign({"./demos/basic.tsx":H,"./demos/controlled.tsx":he,"./demos/skip-link.tsx":_e}),Object.assign({"./demos/basic.tsx":ye,"./demos/controlled.tsx":xe,"./demos/skip-link.tsx":Ce})),Ee=()=>(0,we.jsx)(me,{id:`app-shell`,demos:Te})})))()}De();export{Ee as default};