import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{At as r,Ft as i,G as a,I as o,X as s,it as c,jt as l,pt as u}from"./icons-BnhBUHMa.js";import{Nn as d,T as ee,it as f}from"./angular-preview-Bvv51cL-.js";import{B as te,S as ne,T as p,V as m,g as re}from"./ProgressIndicator-CXNTCbma.js";import{t as h}from"./stylingHooks-PqiNJdev.js";import{i as g,r as _}from"./CodeBlock-CuxMOUBV.js";import{n as v,t as y}from"./Menu-CKWq-3_6.js";import{n as b,t as x}from"./ContextMenu-Bon7Cnp8.js";import{n as S,t as C}from"./pageTabs.module.scss-DmXFZDyy.js";import{l as w,n as T,t as E,u as D}from"./DocPage--2U8TgOE.js";var O,k,A,j,M;function N(){return(N=e((()=>{d(),m(),p(),i(),l(),g(),C(),O=t(),k=n(),A=`.${S.pageTab}`,j=({"aria-label":e,activeValue:t,children:n,actions:r,scrollLeftLabel:i,scrollRightLabel:a,className:o,onFocusCapture:s,onContextMenuCapture:c,...l})=>{let{t:u}=te(),d=(0,O.useRef)(null),p=(0,O.useRef)(null),m=(0,O.useRef)(null),g=(0,O.useRef)(null),v=(0,O.useRef)(null),y=(0,O.useRef)(null),b=(0,O.useRef)(null),[x,C]=(0,O.useState)({overflow:!1,left:!1,right:!1,rtl:!1}),w=(0,O.useCallback)(()=>{let e=d.current;if(!e)return;let t=ee(e)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t};C(e=>e.overflow===r.overflow&&e.left===r.left&&e.right===r.right&&e.rtl===r.rtl?e:r)},[]),T=(0,O.useCallback)(()=>{let e=d.current;if(!e)return;let t=p.current?.querySelector(`${A}[data-current]`);if(t){let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.width>n.width?e.scrollLeft+=r.left-n.left:r.left<n.left?e.scrollLeft-=n.left-r.left:r.right>n.right&&(e.scrollLeft+=r.right-n.right)}w()},[w]);(0,O.useEffect)(()=>{let e=JSON.stringify([t,...Array.from(p.current?.querySelectorAll(A)??[],e=>[e.dataset.value,e.dataset.active])]);e!==g.current&&(g.current=e,T()),m.current&&!m.current.isConnected&&document.activeElement===document.body&&p.current?.querySelector(`[aria-current="page"]`)?.focus({preventScroll:!0});let n=b.current;n?.disabled&&(b.current=null,(document.activeElement===n||document.activeElement===document.body)&&(n===v.current?y:v).current?.focus({preventScroll:!0}))}),(0,O.useEffect)(()=>{if(typeof ResizeObserver>`u`)return;let e=new ResizeObserver(()=>T());return d.current&&e.observe(d.current),p.current&&e.observe(p.current),()=>e.disconnect()},[T]);let E=e=>{let t=d.current;t&&(b.current=e<0?v.current:y.current,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),w())},D=(0,k.jsx)(_,{ref:v,className:S.scroll,"aria-label":i??u(`pageTabs.scrollLeft`),size:`small`,shape:`square`,disabled:!x.left,onClick:()=>E(-1),icon:(0,k.jsx)(ne,{size:18,"aria-hidden":`true`})}),j=(0,k.jsx)(_,{ref:y,className:S.scroll,"aria-label":a??u(`pageTabs.scrollRight`),size:`small`,shape:`square`,disabled:!x.right,onClick:()=>E(1),icon:(0,k.jsx)(re,{size:18,"aria-hidden":`true`})});return(0,k.jsxs)(`nav`,{...l,"aria-label":e,className:f(S.pageTabs,o),onFocusCapture:e=>{e.currentTarget.contains(e.target)&&(m.current=e.target.closest(A)?e.target:null),s?.(e)},onContextMenuCapture:e=>{let t=e.target.closest(A);t&&(m.current=t.querySelector(`.${S.trigger}`)),c?.(e)},...h(`page-tabs`,`root`),children:[x.overflow&&(x.rtl?j:D),(0,k.jsx)(`div`,{ref:d,className:S.viewport,onScroll:w,...h(`page-tabs`,`viewport`),children:(0,k.jsx)(`div`,{ref:p,className:S.list,...h(`page-tabs`,`list`),children:n})}),x.overflow&&(x.rtl?D:j),r&&(0,k.jsx)(`div`,{className:S.actions,...h(`page-tabs`,`actions`),children:r})]})},M=({ref:e,value:t,label:n,active:i=!1,disabled:a=!1,icon:o,action:s,onSelect:c,className:l,...u})=>(0,k.jsxs)(`div`,{...u,ref:e,className:f(S.pageTab,l),"data-value":t,...h(`page-tab`,`root`,{current:i,disabled:a}),children:[(0,k.jsx)(r,{content:n,placement:`bottom-start`,variant:`glass`,disabled:a,asChild:!0,children:(0,k.jsxs)(`button`,{type:`button`,className:S.trigger,...h(`page-tab`,`trigger`),"aria-current":i?`page`:void 0,disabled:a,onClick:c,children:[o&&(0,k.jsx)(`span`,{className:S.icon,"aria-hidden":`true`,...h(`page-tab`,`icon`),children:o}),(0,k.jsx)(`span`,{className:S.label,...h(`page-tab`,`label`),children:n})]})}),s&&(0,k.jsx)(`span`,{className:S.action,...h(`page-tab`,`action`),children:s})]})})))()}function ie(){let[e,t]=(0,P.useState)(I),[n,r]=(0,P.useState)(`books`),i=i=>{let a=e.filter(e=>e.value!==i);t(a),i===n&&r(a[0]?.value??``)};return(0,F.jsx)(j,{"aria-label":`Open pages`,activeValue:n,children:e.map(e=>(0,F.jsx)(M,{value:e.value,label:e.label,icon:e.value===`home`?(0,F.jsx)(u,{size:`1em`}):(0,F.jsx)(c,{size:`1em`}),active:e.value===n,onSelect:()=>r(e.value),action:e.value!==`home`&&(0,F.jsx)(_,{size:`small`,"aria-label":`Close ${e.label}`,icon:(0,F.jsx)(o,{size:`1em`}),onClick:()=>i(e.value)})},e.value))})}var P,F,I;function L(){return(L=e((()=>{s(),P=t(),g(),N(),F=n(),I=[{value:`home`,label:`Dashboard`},{value:`books`,label:`Books`},{value:`article`,label:`A very long article title that gets truncated`}]})))()}function ae(){let[e,t]=(0,R.useState)(B),[n,r]=(0,R.useState)(`Reports`),i=e=>{t([e]),r(e)};return(0,z.jsx)(j,{"aria-label":`Open pages`,activeValue:n,actions:(0,z.jsx)(y,{items:[{key:`reset`,label:`Reopen all pages`}],onSelect:()=>t(B),children:(0,z.jsx)(_,{size:`small`,"aria-label":`Page menu`,icon:(0,z.jsx)(a,{size:`1em`})})}),children:e.map(e=>(0,z.jsx)(x,{items:[{key:`close-others`,label:`Close other pages`}],onSelect:()=>i(e),children:(0,z.jsx)(M,{value:e,label:e,active:e===n,onSelect:()=>r(e)})},e))})}var R,z,B;function V(){return(V=e((()=>{s(),R=t(),b(),g(),v(),N(),z=n(),B=[`Overview`,`Reports`,`Settings`,`Users`,`Billing`]})))()}function oe(){let[e,t]=(0,H.useState)(W[9]);return(0,U.jsx)(`div`,{style:{maxWidth:520},children:(0,U.jsx)(j,{"aria-label":`Chapters`,activeValue:e,children:W.map(n=>(0,U.jsx)(M,{value:n,label:n,active:n===e,disabled:n===`Chapter 3`,onSelect:()=>t(n)},n))})})}var H,U,W;function G(){return(G=e((()=>{H=t(),N(),U=n(),W=Array.from({length:12},(e,t)=>`Chapter ${t+1}`)})))()}var K;function q(){return(q=e((()=>{K=`import { FileTextIcon, HomeIcon, CloseIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton, PageTab, PageTabs } from "minerva-design";

const initial = [
  { value: "home", label: "Dashboard" },
  { value: "books", label: "Books" },
  { value: "article", label: "A very long article title that gets truncated" },
];

export default function BasicDemo() {
  const [pages, setPages] = useState(initial);
  const [active, setActive] = useState("books");

  const close = (value: string) => {
    const rest = pages.filter((page) => page.value !== value);
    setPages(rest);
    if (value === active) setActive(rest[0]?.value ?? "");
  };

  return (
    <PageTabs aria-label="Open pages" activeValue={active}>
      {pages.map((page) => (
        <PageTab
          key={page.value}
          value={page.value}
          label={page.label}
          icon={
            page.value === "home" ? (
              <HomeIcon size="1em" />
            ) : (
              <FileTextIcon size="1em" />
            )
          }
          active={page.value === active}
          onSelect={() => setActive(page.value)}
          action={
            page.value !== "home" && (
              <IconButton
                size="small"
                aria-label={\`Close \${page.label}\`}
                icon={<CloseIcon size="1em" />}
                onClick={() => close(page.value)}
              />
            )
          }
        />
      ))}
    </PageTabs>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { MoreHorizontalIcon } from "minerva-design/icons";
import { useState } from "react";
import {
  ContextMenu,
  IconButton,
  Menu,
  PageTab,
  PageTabs,
} from "minerva-design";

const all = ["Overview", "Reports", "Settings", "Users", "Billing"];

export default function ContextMenuDemo() {
  const [pages, setPages] = useState(all);
  const [active, setActive] = useState("Reports");

  const closeOthers = (keep: string) => {
    setPages([keep]);
    setActive(keep);
  };

  return (
    <PageTabs
      aria-label="Open pages"
      activeValue={active}
      actions={
        <Menu
          items={[{ key: "reset", label: "Reopen all pages" }]}
          onSelect={() => setPages(all)}
        >
          <IconButton
            size="small"
            aria-label="Page menu"
            icon={<MoreHorizontalIcon size="1em" />}
          />
        </Menu>
      }
    >
      {pages.map((page) => (
        <ContextMenu
          key={page}
          items={[{ key: "close-others", label: "Close other pages" }]}
          onSelect={() => closeOthers(page)}
        >
          <PageTab
            value={page}
            label={page}
            active={page === active}
            onSelect={() => setActive(page)}
          />
        </ContextMenu>
      ))}
    </PageTabs>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useState } from "react";
import { PageTab, PageTabs } from "minerva-design";

const pages = Array.from({ length: 12 }, (_, i) => \`Chapter \${i + 1}\`);

export default function OverflowDemo() {
  const [active, setActive] = useState(pages[9]);
  return (
    <div style={{ maxWidth: 520 }}>
      <PageTabs aria-label="Chapters" activeValue={active}>
        {pages.map((page) => (
          <PageTab
            key={page}
            value={page}
            label={page}
            active={page === active}
            disabled={page === "Chapter 3"}
            onSelect={() => setActive(page)}
          />
        ))}
      </PageTabs>
    </div>
  );
}
`})))()}var Q,$,se;function ce(){return(ce=e((()=>{L(),V(),G(),q(),Y(),Z(),t(),T(),D(),Q=n(),$=w(Object.assign({"./demos/basic.tsx":ie,"./demos/context-menu.tsx":ae,"./demos/overflow.tsx":oe}),Object.assign({"./demos/basic.tsx":K,"./demos/context-menu.tsx":J,"./demos/overflow.tsx":X})),se=()=>(0,Q.jsx)(E,{id:`page-tabs`,demos:$})})))()}ce();export{se as default};