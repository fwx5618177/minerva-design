import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Q as r,W as i,X as a,in as o,rn as ee,s,vt as te}from"./icons-BnhBUHMa.js";import{Nn as ne,it as re}from"./angular-preview-Bvv51cL-.js";import{B as ie,R as c,T as l,V as u,c as ae,f as oe,o as d,s as se,w as ce,z as f}from"./ProgressIndicator-CXNTCbma.js";import{t as p}from"./stylingHooks-PqiNJdev.js";import{n as m,t as h}from"./Badge-DZQiOR_5.js";import{i as g,r as _}from"./CodeBlock-CuxMOUBV.js";import{i as v,n as y,r as b,t as x}from"./Radio-DwPyGyYW.js";import{a as S,i as le,n as ue,o as de,r as fe,t as pe}from"./Dialog-BjcWSmt1.js";import{a as C,i as w,t as T}from"./Page-D7K14BNL.js";import{n as E,t as D}from"./appShell.module.scss-bPSQ8Ior.js";import{n as O,t as k}from"./NavTree-BJKSqzVr.js";import{l as me,n as A,t as j,u as M}from"./DocPage--2U8TgOE.js";var N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{ne(),u(),l(),o(),g(),S(),D(),N=t(),P=n(),F=`(max-width: 768px)`,I=()=>typeof window<`u`&&typeof window.matchMedia==`function`,L=e=>{if(!I())return()=>{};let t=window.matchMedia(F);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)},R=()=>I()&&window.matchMedia(F).matches,z=()=>!1,B=({brand:e,brandIcon:t,navigation:n,navigationLabel:r,navigationKey:i,headerActions:a,pageNavigation:o,children:s,sidebarMode:te,defaultSidebarMode:ne,onSidebarModeChange:c,labels:l,skipLink:u=!0,className:f,...m})=>{let{t:h}=ie(),g={expand:l?.expand??h(`appShell.expand`),collapse:l?.collapse??h(`appShell.collapse`),enableFloating:l?.enableFloating??h(`appShell.enableFloating`),disableFloating:l?.disableFloating??h(`appShell.disableFloating`),openNavigation:l?.openNavigation??h(`appShell.openNavigation`),closeNavigation:l?.closeNavigation??h(`appShell.closeNavigation`)},v=r??h(`appShell.navigation`),[y,b]=ee({value:te,defaultValue:ne??`expanded`,onChange:c,name:`AppShell`,prop:`sidebarMode`}),x=(0,N.useSyncExternalStore)(L,R,z),[S,C]=(0,N.useState)(!1),[w,T]=(0,N.useState)(!1),[D,O]=(0,N.useState)(!1),[k,me]=(0,N.useState)({navigationKey:i,isMobile:x});(k.navigationKey!==i||k.isMobile!==x)&&(me({navigationKey:i,isMobile:x}),C(!1),k.isMobile!==x&&(T(!1),O(!1)));let A=(0,N.useRef)(null),j=(0,N.useId)(),M=(0,N.useId)(),F=(0,N.useRef)(null),I=typeof u==`string`?u:h(`appShell.skipToContent`),B=x&&S,V=(0,N.useRef)(!1);(0,N.useEffect)(()=>{!x&&V.current&&A.current?.focus()},[x]),(0,N.useEffect)(()=>{V.current=B});let H=!x&&y!==`expanded`&&(y!==`floating`||!w&&!D),U=y!==`expanded`,W={collapsed:H,isMobile:x,closeNavigation:()=>C(!1),expandNavigation:()=>b(`expanded`)},G=e=>(0,P.jsx)(_,{ref:e?A:void 0,size:`small`,shape:`square`,className:E.control,"aria-label":U?g.expand:g.collapse,"aria-controls":j,"aria-expanded":!H,onClick:()=>b(U?`expanded`:`compact`),icon:(0,P.jsx)(U?d:oe,{"aria-hidden":`true`})});return(0,P.jsxs)(le,{open:B,onOpenChange:C,children:[(0,P.jsxs)(`div`,{className:re(E.shell,f),"data-sidebar-mode":y,"data-sidebar-expanded":!H||void 0,...m,...p(`app-shell`,`root`,{state:B?`open`:`closed`}),children:[u!==!1&&(0,P.jsx)(`a`,{className:E.skipLink,href:`#${M}`,...p(`app-shell`,`skip-link`),onClick:e=>{e.preventDefault(),F.current?.focus()},children:I}),!x&&(0,P.jsxs)(`aside`,{id:j,className:E.sidebar,"aria-label":v,...p(`app-shell`,`sidebar`),onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),onFocusCapture:e=>{e.target.matches(`:focus-visible`)&&O(!0)},onKeyDownCapture:e=>{e.key===`Tab`&&O(!0)},onPointerDownCapture:()=>O(!1),onBlurCapture:e=>{e.currentTarget.contains(e.relatedTarget)||O(!1)},children:[(0,P.jsxs)(`div`,{className:E.brand,children:[t&&(0,P.jsx)(`span`,{className:E.brandIcon,"aria-hidden":`true`,children:t}),(0,P.jsx)(`span`,{className:E.brandLabel,children:e})]}),(0,P.jsx)(`div`,{className:E.navigation,children:n(W)}),(0,P.jsxs)(`div`,{className:E.sidebarActions,children:[G(!1),(0,P.jsx)(_,{size:`small`,shape:`square`,className:E.control,"aria-pressed":y===`floating`,"aria-label":y===`floating`?g.disableFloating:g.enableFloating,onClick:()=>b(y===`floating`?`compact`:`floating`),icon:(0,P.jsx)(y===`floating`?ae:se,{"aria-hidden":`true`})})]})]}),(0,P.jsxs)(`div`,{className:E.workspace,children:[(0,P.jsxs)(`header`,{className:E.header,...p(`app-shell`,`header`),children:[x?(0,P.jsx)(ue,{asChild:!0,children:(0,P.jsx)(_,{ref:A,size:`small`,shape:`square`,className:E.control,"aria-label":g.openNavigation,icon:(0,P.jsx)(d,{"aria-hidden":`true`})})}):G(!0),(0,P.jsx)(`div`,{className:E.headerActions,children:a})]}),o,(0,P.jsx)(`main`,{ref:F,id:M,tabIndex:-1,className:E.content,...p(`app-shell`,`main`),children:s})]})]}),x&&(0,P.jsxs)(de,{overlayClassName:E.overlay,overlayAttributes:p(`app-shell`,`overlay`),className:E.drawer,...p(`app-shell`,`content`),onCloseAutoFocus:e=>{e.preventDefault(),A.current?.focus()},children:[(0,P.jsx)(fe,{className:E.drawerHeader,children:v}),(0,P.jsx)(`div`,{className:E.drawerBody,children:n(W)}),(0,P.jsx)(pe,{className:E.drawerClose,"aria-label":g.closeNavigation,...p(`app-shell`,`close-button`),children:(0,P.jsx)(ce,{"aria-hidden":`true`})})]})]})}})))()}function H(){let[e,t]=(0,U.useState)(`dashboard`);return(0,W.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,W.jsx)(B,{brand:`Publishing Admin`,brandIcon:(0,W.jsx)(r,{size:`1em`}),navigationLabel:`Workspace navigation`,style:{minHeight:`100%`},headerActions:(0,W.jsx)(h,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,W.jsx)(O,{sections:[{id:`workspace`,items:G}],activeId:e,collapsed:n,onItemSelect:e=>{t(e.id),r()}}),children:(0,W.jsx)(T,{children:(0,W.jsx)(C,{title:G.find(t=>t.id===e)?.label,description:`Select a section from the sidebar. Collapse it to keep more room for your content.`})})})})}var U,W,G;function K(){return(K=e((()=>{a(),U=t(),V(),m(),k(),w(),W=n(),G=[{id:`dashboard`,label:`Dashboard`,icon:(0,W.jsx)(r,{size:`1em`})},{id:`books`,label:`Books`,icon:(0,W.jsx)(i,{size:`1em`})},{id:`reviews`,label:`Reviews`,icon:(0,W.jsx)(te,{size:`1em`})},{id:`settings`,label:`Settings`,icon:(0,W.jsx)(s,{size:`1em`})}]})))()}function he(){let[e,t]=(0,q.useState)(`floating`),[n,i]=(0,q.useState)(`overview`);return(0,J.jsx)(`div`,{style:{height:360,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,J.jsx)(B,{brand:`Workspace`,brandIcon:(0,J.jsx)(r,{size:`1em`}),sidebarMode:e,onSidebarModeChange:t,style:{minHeight:`100%`},navigation:({collapsed:e,closeNavigation:t})=>(0,J.jsx)(O,{sections:[{id:`workspace`,items:Y}],activeId:n,collapsed:e,onItemSelect:e=>{i(e.id),t()}}),children:(0,J.jsxs)(T,{children:[(0,J.jsx)(C,{title:Y.find(e=>e.id===n)?.label,description:`Control the sidebar from the header or the options below.`}),(0,J.jsxs)(v,{label:`Sidebar mode`,value:e,onChange:e=>{(e===`floating`||e===`compact`||e===`expanded`)&&t(e)},children:[(0,J.jsx)(x,{value:`floating`,children:`Floating`}),(0,J.jsx)(x,{value:`compact`,children:`Compact`}),(0,J.jsx)(x,{value:`expanded`,children:`Expanded`})]})]})})})}var q,J,Y;function ge(){return(ge=e((()=>{a(),q=t(),V(),k(),w(),y(),b(),J=n(),Y=[{id:`overview`,label:`Overview`,icon:(0,J.jsx)(r,{size:`1em`})},{id:`settings`,label:`Settings`,icon:(0,J.jsx)(s,{size:`1em`})}]})))()}function _e(){let[e,t]=(0,X.useState)(`books`),[n,i]=(0,X.useState)(0);return(0,Z.jsx)(`div`,{style:{height:320,overflow:`auto`,transform:`translateZ(0)`,width:`100%`},children:(0,Z.jsx)(B,{brand:`Publishing Admin`,brandIcon:(0,Z.jsx)(r,{size:`1em`}),skipLink:`Skip to the book list`,style:{minHeight:`100%`},headerActions:(0,Z.jsx)(h,{color:`neutral`,variant:`subtle`,children:`Workspace`}),navigation:({collapsed:n,closeNavigation:r})=>(0,Z.jsx)(O,{sections:[{id:`workspace`,items:Q}],collapsed:n,activeId:e,onItemSelect:e=>{t(e.id),r()}}),children:(0,Z.jsxs)(T,{children:[(0,Z.jsx)(C,{title:Q.find(t=>t.id===e)?.label,description:`Focus the frame and press Tab: the skip link appears first`}),(0,Z.jsx)(f,{size:`small`,onClick:()=>i(n+1),children:`First action of the content`}),(0,Z.jsxs)(`output`,{"aria-live":`polite`,children:[`Activated `,n,` times`]})]})})})}var X,Z,Q;function ve(){return(ve=e((()=>{a(),X=t(),V(),c(),m(),k(),w(),Z=n(),Q=[`Dashboard`,`Books`,`Reviews`,`Settings`].map(e=>({id:e.toLowerCase(),label:e,icon:(0,Z.jsx)(r,{size:`1em`})}))})))()}var ye;function be(){return(be=e((()=>{ye=`import {
  BookOpenIcon,
  LayoutGridIcon,
  MessageSquareIcon,
  SettingsIcon,
} from "minerva-design/icons";
import { useState } from "react";
import { AppShell, Badge, NavTree, Page, PageHeader } from "minerva-design";

const items = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutGridIcon size="1em" /> },
  { id: "books", label: "Books", icon: <BookOpenIcon size="1em" /> },
  { id: "reviews", label: "Reviews", icon: <MessageSquareIcon size="1em" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size="1em" /> },
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
        brandIcon={<LayoutGridIcon size="1em" />}
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
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { LayoutGridIcon, SettingsIcon } from "minerva-design/icons";
import { useState } from "react";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  Radio,
  RadioGroup,
  type AppShellSidebarMode,
} from "minerva-design";

const items = [
  { id: "overview", label: "Overview", icon: <LayoutGridIcon size="1em" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size="1em" /> },
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
        brandIcon={<LayoutGridIcon size="1em" />}
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
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { LayoutGridIcon } from "minerva-design/icons";
import { useState } from "react";
import {
  AppShell,
  Button,
  Badge,
  NavTree,
  Page,
  PageHeader,
} from "minerva-design";

const items = ["Dashboard", "Books", "Reviews", "Settings"].map((label) => ({
  id: label.toLowerCase(),
  label,
  icon: <LayoutGridIcon size="1em" />,
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
        brandIcon={<LayoutGridIcon size="1em" />}
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
`})))()}var Te,Ee,De;function $(){return($=e((()=>{K(),ge(),ve(),be(),Se(),we(),t(),A(),M(),Te=n(),Ee=me(Object.assign({"./demos/basic.tsx":H,"./demos/controlled.tsx":he,"./demos/skip-link.tsx":_e}),Object.assign({"./demos/basic.tsx":ye,"./demos/controlled.tsx":xe,"./demos/skip-link.tsx":Ce})),De=()=>(0,Te.jsx)(j,{id:`app-shell`,demos:Ee})})))()}$();export{De as default};