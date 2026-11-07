import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{G as r,W as i,Y as a}from"./io5-DGxLJ5Qx.js";import{K as o,Mn as s,rt as c}from"./angular-preview-CxN7u9Fp.js";import{B as l,S as u,T as d,V as f,g as ee}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as p}from"./stylingHooks-PqiNJdev.js";import{i as m,r as h}from"./CodeBlock-Y-lIOv3H.js";import{n as g,t as _}from"./Menu-BSuchTho.js";import{n as v,t as y}from"./ContextMenu-Ct9z36qA.js";import{n as b,t as x}from"./pageTabs.module.scss-DmXFZDyy.js";import{l as S,n as C,t as w,u as T}from"./DocPage-HJVoVnnH.js";import{A as E,d as D,k as O,o as k,s as A}from"./lu-BQw33M53.js";var j,M,N,P,F;function I(){return(I=e((()=>{s(),f(),d(),a(),r(),m(),x(),j=t(),M=n(),N=`.${b.pageTab}`,P=({"aria-label":e,activeValue:t,children:n,actions:r,scrollLeftLabel:i,scrollRightLabel:a,className:s,onFocusCapture:d,onContextMenuCapture:f,...m})=>{let{t:g}=l(),_=(0,j.useRef)(null),v=(0,j.useRef)(null),y=(0,j.useRef)(null),x=(0,j.useRef)(null),S=(0,j.useRef)(null),C=(0,j.useRef)(null),w=(0,j.useRef)(null),[T,E]=(0,j.useState)({overflow:!1,left:!1,right:!1,rtl:!1}),D=(0,j.useCallback)(()=>{let e=_.current;if(!e)return;let t=o(e)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t};E(e=>e.overflow===r.overflow&&e.left===r.left&&e.right===r.right&&e.rtl===r.rtl?e:r)},[]),O=(0,j.useCallback)(()=>{let e=_.current;if(!e)return;let t=v.current?.querySelector(`${N}[data-current]`);if(t){let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.width>n.width?e.scrollLeft+=r.left-n.left:r.left<n.left?e.scrollLeft-=n.left-r.left:r.right>n.right&&(e.scrollLeft+=r.right-n.right)}D()},[D]);(0,j.useEffect)(()=>{let e=JSON.stringify([t,...Array.from(v.current?.querySelectorAll(N)??[],e=>[e.dataset.value,e.dataset.active])]);e!==x.current&&(x.current=e,O()),y.current&&!y.current.isConnected&&document.activeElement===document.body&&v.current?.querySelector(`[aria-current="page"]`)?.focus({preventScroll:!0});let n=w.current;n?.disabled&&(w.current=null,(document.activeElement===n||document.activeElement===document.body)&&(n===S.current?C:S).current?.focus({preventScroll:!0}))}),(0,j.useEffect)(()=>{if(typeof ResizeObserver>`u`)return;let e=new ResizeObserver(()=>O());return _.current&&e.observe(_.current),v.current&&e.observe(v.current),()=>e.disconnect()},[O]);let k=e=>{let t=_.current;t&&(w.current=e<0?S.current:C.current,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),D())},A=(0,M.jsx)(h,{ref:S,className:b.scroll,"aria-label":i??g(`pageTabs.scrollLeft`),size:`small`,shape:`square`,disabled:!T.left,onClick:()=>k(-1),icon:(0,M.jsx)(u,{size:18,"aria-hidden":`true`})}),P=(0,M.jsx)(h,{ref:C,className:b.scroll,"aria-label":a??g(`pageTabs.scrollRight`),size:`small`,shape:`square`,disabled:!T.right,onClick:()=>k(1),icon:(0,M.jsx)(ee,{size:18,"aria-hidden":`true`})});return(0,M.jsxs)(`nav`,{...m,"aria-label":e,className:c(b.pageTabs,s),onFocusCapture:e=>{e.currentTarget.contains(e.target)&&(y.current=e.target.closest(N)?e.target:null),d?.(e)},onContextMenuCapture:e=>{let t=e.target.closest(N);t&&(y.current=t.querySelector(`.${b.trigger}`)),f?.(e)},...p(`page-tabs`,`root`),children:[T.overflow&&(T.rtl?P:A),(0,M.jsx)(`div`,{ref:_,className:b.viewport,onScroll:D,...p(`page-tabs`,`viewport`),children:(0,M.jsx)(`div`,{ref:v,className:b.list,...p(`page-tabs`,`list`),children:n})}),T.overflow&&(T.rtl?A:P),r&&(0,M.jsx)(`div`,{className:b.actions,...p(`page-tabs`,`actions`),children:r})]})},F=({ref:e,value:t,label:n,active:r=!1,disabled:a=!1,icon:o,action:s,onSelect:l,className:u,...d})=>(0,M.jsxs)(`div`,{...d,ref:e,className:c(b.pageTab,u),"data-value":t,...p(`page-tab`,`root`,{current:r,disabled:a}),children:[(0,M.jsx)(i,{content:n,placement:`bottom-start`,variant:`glass`,disabled:a,asChild:!0,children:(0,M.jsxs)(`button`,{type:`button`,className:b.trigger,...p(`page-tab`,`trigger`),"aria-current":r?`page`:void 0,disabled:a,onClick:l,children:[o&&(0,M.jsx)(`span`,{className:b.icon,"aria-hidden":`true`,...p(`page-tab`,`icon`),children:o}),(0,M.jsx)(`span`,{className:b.label,...p(`page-tab`,`label`),children:n})]})}),s&&(0,M.jsx)(`span`,{className:b.action,...p(`page-tab`,`action`),children:s})]})})))()}function te(){let[e,t]=(0,L.useState)(z),[n,r]=(0,L.useState)(`books`),i=i=>{let a=e.filter(e=>e.value!==i);t(a),i===n&&r(a[0]?.value??``)};return(0,R.jsx)(P,{"aria-label":`Open pages`,activeValue:n,children:e.map(e=>(0,R.jsx)(F,{value:e.value,label:e.label,icon:e.value===`home`?(0,R.jsx)(D,{}):(0,R.jsx)(A,{}),active:e.value===n,onSelect:()=>r(e.value),action:e.value!==`home`&&(0,R.jsx)(h,{size:`small`,"aria-label":`Close ${e.label}`,icon:(0,R.jsx)(O,{}),onClick:()=>i(e.value)})},e.value))})}var L,R,z;function B(){return(B=e((()=>{L=t(),m(),I(),E(),R=n(),z=[{value:`home`,label:`Dashboard`},{value:`books`,label:`Books`},{value:`article`,label:`A very long article title that gets truncated`}]})))()}function ne(){let[e,t]=(0,V.useState)(U),[n,r]=(0,V.useState)(`Reports`),i=e=>{t([e]),r(e)};return(0,H.jsx)(P,{"aria-label":`Open pages`,activeValue:n,actions:(0,H.jsx)(_,{items:[{key:`reset`,label:`Reopen all pages`}],onSelect:()=>t(U),children:(0,H.jsx)(h,{size:`small`,"aria-label":`Page menu`,icon:(0,H.jsx)(k,{})})}),children:e.map(e=>(0,H.jsx)(y,{items:[{key:`close-others`,label:`Close other pages`}],onSelect:()=>i(e),children:(0,H.jsx)(F,{value:e,label:e,active:e===n,onSelect:()=>r(e)})},e))})}var V,H,U;function W(){return(W=e((()=>{V=t(),v(),m(),g(),I(),E(),H=n(),U=[`Overview`,`Reports`,`Settings`,`Users`,`Billing`]})))()}function re(){let[e,t]=(0,G.useState)(q[9]);return(0,K.jsx)(`div`,{style:{maxWidth:520},children:(0,K.jsx)(P,{"aria-label":`Chapters`,activeValue:e,children:q.map(n=>(0,K.jsx)(F,{value:n,label:n,active:n===e,disabled:n===`Chapter 3`,onSelect:()=>t(n)},n))})})}var G,K,q;function J(){return(J=e((()=>{G=t(),I(),K=n(),q=Array.from({length:12},(e,t)=>`Chapter ${t+1}`)})))()}var Y;function X(){return(X=e((()=>{Y=`import { useState } from "react";
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
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { useState } from "react";
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
`})))()}var $;function ie(){return(ie=e((()=>{$=`import { useState } from "react";
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
`})))()}var ae,oe,se;function ce(){return(ce=e((()=>{B(),W(),J(),X(),Q(),ie(),t(),C(),T(),ae=n(),oe=S(Object.assign({"./demos/basic.tsx":te,"./demos/context-menu.tsx":ne,"./demos/overflow.tsx":re}),Object.assign({"./demos/basic.tsx":Y,"./demos/context-menu.tsx":Z,"./demos/overflow.tsx":$})),se=()=>(0,ae.jsx)(w,{id:`page-tabs`,demos:oe})})))()}ce();export{se as default};