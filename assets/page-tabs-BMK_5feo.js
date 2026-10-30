import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,O as i,ut as a}from"./angular-preview-l4x8c_2r.js";import{B as o,S as s,T as c,V as l,g as u}from"./ProgressIndicator-BMZ0rR7D.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{J as f,Q as p,q as m}from"./io5-BlmswBy7.js";import{i as h,r as g}from"./CodeBlock-CJOpG7_Q.js";import{n as _,t as v}from"./Menu-C7vUCxP3.js";import{n as y,t as b}from"./ContextMenu-WUWcOkts.js";import{n as x,t as S}from"./pageTabs.module.scss-DmXFZDyy.js";import{l as C,n as w,t as T,u as E}from"./DocPage-JhXgs5p-.js";import{D,E as O,o as k,s as A,u as j}from"./lu-BxR8fmLv.js";var M,N,P,F,I;function L(){return(L=e((()=>{r(),l(),c(),p(),f(),h(),S(),M=t(),N=n(),P=`.${x.pageTab}`,F=({"aria-label":e,activeValue:t,children:n,actions:r,scrollLeftLabel:c,scrollRightLabel:l,className:f,onFocusCapture:p,onContextMenuCapture:m,...h})=>{let{t:_}=o(),v=(0,M.useRef)(null),y=(0,M.useRef)(null),b=(0,M.useRef)(null),S=(0,M.useRef)(null),C=(0,M.useRef)(null),w=(0,M.useRef)(null),T=(0,M.useRef)(null),[E,D]=(0,M.useState)({overflow:!1,left:!1,right:!1,rtl:!1}),O=(0,M.useCallback)(()=>{let e=v.current;if(!e)return;let t=i(e)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t};D(e=>e.overflow===r.overflow&&e.left===r.left&&e.right===r.right&&e.rtl===r.rtl?e:r)},[]),k=(0,M.useCallback)(()=>{let e=v.current;if(!e)return;let t=y.current?.querySelector(`${P}[data-current]`);if(t){let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.width>n.width?e.scrollLeft+=r.left-n.left:r.left<n.left?e.scrollLeft-=n.left-r.left:r.right>n.right&&(e.scrollLeft+=r.right-n.right)}O()},[O]);(0,M.useEffect)(()=>{let e=JSON.stringify([t,...Array.from(y.current?.querySelectorAll(P)??[],e=>[e.dataset.value,e.dataset.active])]);e!==S.current&&(S.current=e,k()),b.current&&!b.current.isConnected&&document.activeElement===document.body&&y.current?.querySelector(`[aria-current="page"]`)?.focus({preventScroll:!0});let n=T.current;n?.disabled&&(T.current=null,(document.activeElement===n||document.activeElement===document.body)&&(n===C.current?w:C).current?.focus({preventScroll:!0}))}),(0,M.useEffect)(()=>{if(typeof ResizeObserver>`u`)return;let e=new ResizeObserver(()=>k());return v.current&&e.observe(v.current),y.current&&e.observe(y.current),()=>e.disconnect()},[k]);let A=e=>{let t=v.current;t&&(T.current=e<0?C.current:w.current,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),O())},j=(0,N.jsx)(g,{ref:C,className:x.scroll,"aria-label":c??_(`pageTabs.scrollLeft`),size:`small`,shape:`square`,disabled:!E.left,onClick:()=>A(-1),icon:(0,N.jsx)(s,{size:18,"aria-hidden":`true`})}),F=(0,N.jsx)(g,{ref:w,className:x.scroll,"aria-label":l??_(`pageTabs.scrollRight`),size:`small`,shape:`square`,disabled:!E.right,onClick:()=>A(1),icon:(0,N.jsx)(u,{size:18,"aria-hidden":`true`})});return(0,N.jsxs)(`nav`,{...h,"aria-label":e,className:a(x.pageTabs,f),onFocusCapture:e=>{e.currentTarget.contains(e.target)&&(b.current=e.target.closest(P)?e.target:null),p?.(e)},onContextMenuCapture:e=>{let t=e.target.closest(P);t&&(b.current=t.querySelector(`.${x.trigger}`)),m?.(e)},...d(`page-tabs`,`root`),children:[E.overflow&&(E.rtl?F:j),(0,N.jsx)(`div`,{ref:v,className:x.viewport,onScroll:O,...d(`page-tabs`,`viewport`),children:(0,N.jsx)(`div`,{ref:y,className:x.list,...d(`page-tabs`,`list`),children:n})}),E.overflow&&(E.rtl?j:F),r&&(0,N.jsx)(`div`,{className:x.actions,...d(`page-tabs`,`actions`),children:r})]})},I=({ref:e,value:t,label:n,active:r=!1,disabled:i=!1,icon:o,action:s,onSelect:c,className:l,...u})=>(0,N.jsxs)(`div`,{...u,ref:e,className:a(x.pageTab,l),"data-value":t,...d(`page-tab`,`root`,{current:r,disabled:i}),children:[(0,N.jsx)(m,{content:n,placement:`bottom-start`,variant:`glass`,disabled:i,asChild:!0,children:(0,N.jsxs)(`button`,{type:`button`,className:x.trigger,...d(`page-tab`,`trigger`),"aria-current":r?`page`:void 0,disabled:i,onClick:c,children:[o&&(0,N.jsx)(`span`,{className:x.icon,"aria-hidden":`true`,...d(`page-tab`,`icon`),children:o}),(0,N.jsx)(`span`,{className:x.label,...d(`page-tab`,`label`),children:n})]})}),s&&(0,N.jsx)(`span`,{className:x.action,...d(`page-tab`,`action`),children:s})]})})))()}function ee(){let[e,t]=(0,R.useState)(B),[n,r]=(0,R.useState)(`books`),i=i=>{let a=e.filter(e=>e.value!==i);t(a),i===n&&r(a[0]?.value??``)};return(0,z.jsx)(F,{"aria-label":`Open pages`,activeValue:n,children:e.map(e=>(0,z.jsx)(I,{value:e.value,label:e.label,icon:e.value===`home`?(0,z.jsx)(j,{}):(0,z.jsx)(A,{}),active:e.value===n,onSelect:()=>r(e.value),action:e.value!==`home`&&(0,z.jsx)(g,{size:`small`,"aria-label":`Close ${e.label}`,icon:(0,z.jsx)(O,{}),onClick:()=>i(e.value)})},e.value))})}var R,z,B;function V(){return(V=e((()=>{R=t(),h(),L(),D(),z=n(),B=[{value:`home`,label:`Dashboard`},{value:`books`,label:`Books`},{value:`article`,label:`A very long article title that gets truncated`}]})))()}function te(){let[e,t]=(0,H.useState)(W),[n,r]=(0,H.useState)(`Reports`),i=e=>{t([e]),r(e)};return(0,U.jsx)(F,{"aria-label":`Open pages`,activeValue:n,actions:(0,U.jsx)(v,{items:[{key:`reset`,label:`Reopen all pages`}],onSelect:()=>t(W),children:(0,U.jsx)(g,{size:`small`,"aria-label":`Page menu`,icon:(0,U.jsx)(k,{})})}),children:e.map(e=>(0,U.jsx)(b,{items:[{key:`close-others`,label:`Close other pages`}],onSelect:()=>i(e),children:(0,U.jsx)(I,{value:e,label:e,active:e===n,onSelect:()=>r(e)})},e))})}var H,U,W;function G(){return(G=e((()=>{H=t(),y(),h(),_(),L(),D(),U=n(),W=[`Overview`,`Reports`,`Settings`,`Users`,`Billing`]})))()}function ne(){let[e,t]=(0,K.useState)(J[9]);return(0,q.jsx)(`div`,{style:{maxWidth:520},children:(0,q.jsx)(F,{"aria-label":`Chapters`,activeValue:e,children:J.map(n=>(0,q.jsx)(I,{value:n,label:n,active:n===e,disabled:n===`Chapter 3`,onSelect:()=>t(n)},n))})})}var K,q,J;function Y(){return(Y=e((()=>{K=t(),L(),q=n(),J=Array.from({length:12},(e,t)=>`Chapter ${t+1}`)})))()}var X;function Z(){return(Z=e((()=>{X=`import { useState } from "react";
import { IconButton, PageTab, PageTabs } from "minerva-design";
import { LuFileText, LuHouse, LuX } from "react-icons/lu";

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
          icon={page.value === "home" ? <LuHouse /> : <LuFileText />}
          active={page.value === active}
          onSelect={() => setActive(page.value)}
          action={
            page.value !== "home" && (
              <IconButton
                size="small"
                aria-label={\`Close \${page.label}\`}
                icon={<LuX />}
                onClick={() => close(page.value)}
              />
            )
          }
        />
      ))}
    </PageTabs>
  );
}
`})))()}var Q;function $(){return($=e((()=>{Q=`import { useState } from "react";
import {
  ContextMenu,
  IconButton,
  Menu,
  PageTab,
  PageTabs,
} from "minerva-design";
import { LuEllipsis } from "react-icons/lu";

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
            icon={<LuEllipsis />}
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
`})))()}var re;function ie(){return(ie=e((()=>{re=`import { useState } from "react";
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
`})))()}var ae,oe,se;function ce(){return(ce=e((()=>{V(),G(),Y(),Z(),$(),ie(),t(),w(),E(),ae=n(),oe=C(Object.assign({"./demos/basic.tsx":ee,"./demos/context-menu.tsx":te,"./demos/overflow.tsx":ne}),Object.assign({"./demos/basic.tsx":X,"./demos/context-menu.tsx":Q,"./demos/overflow.tsx":re})),se=()=>(0,ae.jsx)(T,{id:`page-tabs`,demos:oe})})))()}ce();export{se as default};