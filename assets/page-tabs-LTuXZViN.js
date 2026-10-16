import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{J as r,X as i,Y as a,et as o,q as s}from"./io5-BMMdBk1L.js";import{It as c,O as l,ut as u}from"./angular-preview-l4x8c_2r.js";import{B as d,H as f,S as ee,T as p,U as m,g as te}from"./ProgressIndicator-BhPa7d9i.js";import{n as h,t as g}from"./Menu-DB-ghk5t.js";import{n as _,t as v}from"./ContextMenu-D8yKj2_T.js";import{n as y,t as b}from"./pageTabs.module.scss-DmXFZDyy.js";import{l as x,n as S,t as C,u as w}from"./DocPage-D-H5cPcd.js";import{E as T,T as E,o as D,s as O,u as k}from"./lu-C7cV6_vw.js";var A,j,M,N,P;function F(){return(F=e((()=>{c(),m(),p(),o(),i(),r(),b(),A=t(),j=n(),M=`.${y.pageTab}`,N=({"aria-label":e,activeValue:t,children:n,actions:r,scrollLeftLabel:i,scrollRightLabel:a,className:o,onFocusCapture:c,onContextMenuCapture:p,...m})=>{let{t:h}=f(),g=(0,A.useRef)(null),_=(0,A.useRef)(null),v=(0,A.useRef)(null),b=(0,A.useRef)(null),x=(0,A.useRef)(null),S=(0,A.useRef)(null),C=(0,A.useRef)(null),[w,T]=(0,A.useState)({overflow:!1,left:!1,right:!1,rtl:!1}),E=(0,A.useCallback)(()=>{let e=g.current;if(!e)return;let t=l(e)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t};T(e=>e.overflow===r.overflow&&e.left===r.left&&e.right===r.right&&e.rtl===r.rtl?e:r)},[]),D=(0,A.useCallback)(()=>{let e=g.current;if(!e)return;let t=_.current?.querySelector(`${M}[data-current]`);if(t){let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.width>n.width?e.scrollLeft+=r.left-n.left:r.left<n.left?e.scrollLeft-=n.left-r.left:r.right>n.right&&(e.scrollLeft+=r.right-n.right)}E()},[E]);(0,A.useEffect)(()=>{let e=JSON.stringify([t,...Array.from(_.current?.querySelectorAll(M)??[],e=>[e.dataset.value,e.dataset.active])]);e!==b.current&&(b.current=e,D()),v.current&&!v.current.isConnected&&document.activeElement===document.body&&_.current?.querySelector(`[aria-current="page"]`)?.focus({preventScroll:!0});let n=C.current;n?.disabled&&(C.current=null,(document.activeElement===n||document.activeElement===document.body)&&(n===x.current?S:x).current?.focus({preventScroll:!0}))}),(0,A.useEffect)(()=>{if(typeof ResizeObserver>`u`)return;let e=new ResizeObserver(()=>D());return g.current&&e.observe(g.current),_.current&&e.observe(_.current),()=>e.disconnect()},[D]);let O=e=>{let t=g.current;t&&(C.current=e<0?x.current:S.current,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),E())},k=(0,j.jsx)(s,{ref:x,className:y.scroll,"aria-label":i??h(`pageTabs.scrollLeft`),size:`small`,shape:`square`,disabled:!w.left,onClick:()=>O(-1),icon:(0,j.jsx)(ee,{size:18,"aria-hidden":`true`})}),N=(0,j.jsx)(s,{ref:S,className:y.scroll,"aria-label":a??h(`pageTabs.scrollRight`),size:`small`,shape:`square`,disabled:!w.right,onClick:()=>O(1),icon:(0,j.jsx)(te,{size:18,"aria-hidden":`true`})});return(0,j.jsxs)(`nav`,{...m,"aria-label":e,className:u(y.pageTabs,o),onFocusCapture:e=>{e.currentTarget.contains(e.target)&&(v.current=e.target.closest(M)?e.target:null),c?.(e)},onContextMenuCapture:e=>{let t=e.target.closest(M);t&&(v.current=t.querySelector(`.${y.trigger}`)),p?.(e)},...d(`page-tabs`,`root`),children:[w.overflow&&(w.rtl?N:k),(0,j.jsx)(`div`,{ref:g,className:y.viewport,onScroll:E,...d(`page-tabs`,`viewport`),children:(0,j.jsx)(`div`,{ref:_,className:y.list,...d(`page-tabs`,`list`),children:n})}),w.overflow&&(w.rtl?k:N),r&&(0,j.jsx)(`div`,{className:y.actions,...d(`page-tabs`,`actions`),children:r})]})},P=({ref:e,value:t,label:n,active:r=!1,disabled:i=!1,icon:o,action:s,onSelect:c,className:l,...f})=>(0,j.jsxs)(`div`,{...f,ref:e,className:u(y.pageTab,l),"data-value":t,...d(`page-tab`,`root`,{current:r,disabled:i}),children:[(0,j.jsx)(a,{content:n,placement:`bottom-start`,variant:`glass`,disabled:i,asChild:!0,children:(0,j.jsxs)(`button`,{type:`button`,className:y.trigger,...d(`page-tab`,`trigger`),"aria-current":r?`page`:void 0,disabled:i,onClick:c,children:[o&&(0,j.jsx)(`span`,{className:y.icon,"aria-hidden":`true`,...d(`page-tab`,`icon`),children:o}),(0,j.jsx)(`span`,{className:y.label,...d(`page-tab`,`label`),children:n})]})}),s&&(0,j.jsx)(`span`,{className:y.action,...d(`page-tab`,`action`),children:s})]})})))()}function ne(){let[e,t]=(0,I.useState)(R),[n,r]=(0,I.useState)(`books`),i=i=>{let a=e.filter(e=>e.value!==i);t(a),i===n&&r(a[0]?.value??``)};return(0,L.jsx)(N,{"aria-label":`Open pages`,activeValue:n,children:e.map(e=>(0,L.jsx)(P,{value:e.value,label:e.label,icon:e.value===`home`?(0,L.jsx)(k,{}):(0,L.jsx)(O,{}),active:e.value===n,onSelect:()=>r(e.value),action:e.value!==`home`&&(0,L.jsx)(s,{size:`small`,"aria-label":`Close ${e.label}`,icon:(0,L.jsx)(E,{}),onClick:()=>i(e.value)})},e.value))})}var I,L,R;function z(){return(z=e((()=>{I=t(),r(),F(),T(),L=n(),R=[{value:`home`,label:`Dashboard`},{value:`books`,label:`Books`},{value:`article`,label:`A very long article title that gets truncated`}]})))()}function re(){let[e,t]=(0,B.useState)(H),[n,r]=(0,B.useState)(`Reports`),i=e=>{t([e]),r(e)};return(0,V.jsx)(N,{"aria-label":`Open pages`,activeValue:n,actions:(0,V.jsx)(g,{items:[{key:`reset`,label:`Reopen all pages`}],onSelect:()=>t(H),children:(0,V.jsx)(s,{size:`small`,"aria-label":`Page menu`,icon:(0,V.jsx)(D,{})})}),children:e.map(e=>(0,V.jsx)(v,{items:[{key:`close-others`,label:`Close other pages`}],onSelect:()=>i(e),children:(0,V.jsx)(P,{value:e,label:e,active:e===n,onSelect:()=>r(e)})},e))})}var B,V,H;function U(){return(U=e((()=>{B=t(),_(),r(),h(),F(),T(),V=n(),H=[`Overview`,`Reports`,`Settings`,`Users`,`Billing`]})))()}function ie(){let[e,t]=(0,W.useState)(K[9]);return(0,G.jsx)(`div`,{style:{maxWidth:520},children:(0,G.jsx)(N,{"aria-label":`Chapters`,activeValue:e,children:K.map(n=>(0,G.jsx)(P,{value:n,label:n,active:n===e,disabled:n===`Chapter 3`,onSelect:()=>t(n)},n))})})}var W,G,K;function q(){return(q=e((()=>{W=t(),F(),G=n(),K=Array.from({length:12},(e,t)=>`Chapter ${t+1}`)})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useState } from "react";
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
`})))()}var Q;function $(){return($=e((()=>{Q=`import { useState } from "react";
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
`})))()}var ae,oe,se;function ce(){return(ce=e((()=>{z(),U(),q(),Y(),Z(),$(),t(),S(),w(),ae=n(),oe=x(Object.assign({"./demos/basic.tsx":ne,"./demos/context-menu.tsx":re,"./demos/overflow.tsx":ie}),Object.assign({"./demos/basic.tsx":J,"./demos/context-menu.tsx":X,"./demos/overflow.tsx":Q})),se=()=>(0,ae.jsx)(C,{id:`page-tabs`,demos:oe})})))()}ce();export{se as default};