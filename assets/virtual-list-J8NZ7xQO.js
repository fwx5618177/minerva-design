import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{Mn as i,Wn as ee,on as a}from"./angular-preview-CSWPEDZG.js";import{n as o,t as te}from"./ProgressIndicator-CQZAxIX3.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{Tt as ne,wt as c}from"./io5-BR_mMpVE.js";import{n as l,t as u}from"./virtualList.module.scss-BY5oxRRP.js";import{l as d,n as f,t as p,u as m}from"./DocPage-CHJwIegD.js";var h,g,_;function v(){return(v=t((()=>{i(),o(),c(),l(),h=e(n(),1),g=r(),_=h.memo(({items:e,itemHeight:t,maxHeight:n,overscan:r=5,renderItem:i,className:o=``,style:c,onLoadMore:l,loadMoreThreshold:d=100,highPerformance:f=!1,loading:p=!1,itemPadding:m=8,onItemClick:_,"aria-label":v,onScroll:y,ref:b,...x})=>{let[S,C]=(0,h.useState)(0),[w,T]=(0,h.useState)(0),E=(0,h.useRef)(0),D=(0,h.useRef)(!1),O=(0,h.useRef)(void 0),k=(0,h.useRef)(void 0),[A,j]=(0,h.useState)(null),M=(0,h.useMemo)(()=>A===null?null:e.findIndex(e=>e.id===A),[A,e]),[N,P]=(0,h.useState)(0),F=!t&&N===0&&e.length>0,I=(0,h.useCallback)(e=>{if(!e||(T(e.clientHeight),typeof ResizeObserver>`u`))return;let t=new ResizeObserver(e=>{for(let t of e)T(t.contentRect.height)});return t.observe(e),()=>t.disconnect()},[]),L=ne(I,b),R=(0,h.useCallback)(e=>{if(!e)return;let t=()=>{let t=e.offsetHeight;t>0&&P(t)};if(t(),typeof ResizeObserver>`u`)return;let n=new ResizeObserver(t);return n.observe(e),()=>n.disconnect()},[]),z=t||(N>0?N+m*2:0),B=(0,h.useMemo)(()=>z?ee({scrollTop:S,viewportHeight:w,itemHeight:z,itemCount:e.length,overscan:r}):{start:0,end:1,visibleCount:1},[S,w,z,r,e.length]),V=(0,h.useCallback)(()=>{O.current!==void 0&&(cancelAnimationFrame(O.current),O.current=void 0),k.current!==void 0&&(`cancelIdleCallback`in window&&cancelIdleCallback(k.current),k.current=void 0)},[]),H=(0,h.useCallback)(e=>{f?(V(),O.current=requestAnimationFrame(()=>{O.current=void 0,`requestIdleCallback`in window?k.current=requestIdleCallback(()=>{k.current=void 0,e()},{timeout:100}):e()})):e()},[f,V]),U=(0,h.useMemo)(()=>{let e=[];for(let t=B.start;t<B.end;t++)e.push({index:t,start:t*z,height:z});if(M!==null&&M>=0&&(M<B.start||M>=B.end)){let t={index:M,start:M*z,height:z};M<B.start?e.unshift(t):e.push(t)}return e},[B,z,M]),W=(0,h.useCallback)(e=>{let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>E.current;E.current=t,H(()=>{C(t),i&&l&&!D.current&&!p&&n-t-r<d&&n>r&&(D.current=!0,Promise.resolve(l()).finally(()=>{D.current=!1}))})},[l,p,d,H]),G=e=>{y?.(e),W(e)};return(0,h.useEffect)(()=>V,[V]),(0,g.jsxs)(`div`,{...x,ref:L,role:`region`,"aria-label":v,tabIndex:0,"aria-busy":p||void 0,className:a(u.virtualList,o),style:{...c,maxHeight:n,overflow:`auto`,position:`relative`},onScroll:G,...s(`virtual-list`,`root`,{loading:p}),children:[F&&(0,g.jsx)(`div`,{ref:R,className:u.measureItem,"aria-hidden":`true`,children:i(e[0],0)}),(0,g.jsx)(`div`,{style:{height:z?e.length*z:`auto`,position:`relative`,willChange:`transform`},className:u.virtualListContent,role:`list`,"aria-label":v,...s(`virtual-list`,`list`),children:z>0&&U.map(t=>(0,g.jsx)(`div`,{style:{position:`absolute`,top:0,transform:`translateY(${t.start}px)`,width:`100%`,height:z,willChange:`transform`,padding:m},className:a(u.virtualListItem,_&&u.clickable),tabIndex:_?0:void 0,onClick:_?n=>_(e[t.index],t.index,n):void 0,onKeyDown:_?n=>{n.target===n.currentTarget&&(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),_(e[t.index],t.index,n))}:void 0,role:`listitem`,...s(`virtual-list`,`item`),"aria-setsize":e.length,"aria-posinset":t.index+1,onFocus:()=>j(e[t.index].id),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||j(null)},children:i(e[t.index],t.index)},e[t.index].id))}),p&&(0,g.jsx)(`div`,{className:u.loadingWrapper,...s(`virtual-list`,`loading`),children:(0,g.jsx)(te,{variant:`wave`,size:`small`})})]})})})))()}function y(){return(0,b.jsx)(`div`,{style:{width:`100%`},children:(0,b.jsx)(_,{items:x,maxHeight:300,itemPadding:12,renderItem:e=>(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:e.metadata?.name}),(0,b.jsx)(`div`,{style:{fontSize:12,opacity:.7},children:e.metadata?.email})]})})})}var b,x;function S(){return(S=t((()=>{v(),b=r(),x=Array.from({length:1e3},(e,t)=>({id:`user-${t}`,metadata:{name:`User ${t+1}`,email:`user${t+1}@example.com`}}))})))()}function C(){return(0,w.jsx)(`div`,{style:{width:`100%`},children:(0,w.jsx)(_,{items:T,itemHeight:40,maxHeight:300,"aria-label":`Rows`,renderItem:e=>(0,w.jsx)(`span`,{children:e.metadata?.title})})})}var w,T;function E(){return(E=t((()=>{v(),w=r(),T=Array.from({length:1e4},(e,t)=>({id:t,metadata:{title:`Row ${t+1}`}}))})))()}function D(){let[e,t]=(0,O.useState)();return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,k.jsx)(_,{items:A,itemHeight:40,maxHeight:240,"aria-label":`Invoices`,id:`invoice-list`,"data-section":`billing`,onItemClick:e=>t(String(e.metadata?.title)),renderItem:e=>(0,k.jsx)(`span`,{children:e.metadata?.title})}),(0,k.jsxs)(`span`,{"aria-live":`polite`,children:[`Selected: `,e??`none`]})]})}var O,k,A;function j(){return(j=t((()=>{O=n(),v(),k=r(),A=Array.from({length:1e3},(e,t)=>({id:t,metadata:{title:`Invoice #${1e3+t}`}}))})))()}function M(){return(0,N.jsx)(`div`,{style:{width:`100%`},children:(0,N.jsx)(_,{items:P,itemHeight:36,maxHeight:300,overscan:10,highPerformance:!0,renderItem:(e,t)=>(0,N.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,N.jsxs)(`span`,{children:[`#`,t+1,` `,e.metadata?.title]}),(0,N.jsx)(`code`,{children:e.metadata?.value})]})})})}var N,P;function F(){return(F=t((()=>{v(),N=r(),P=Array.from({length:1e5},(e,t)=>({id:t,metadata:{title:`Item ${t+1}`,value:Math.round(Math.random()*1e3)}}))})))()}function I(){let[e,t]=(0,L.useState)(()=>V(0)),[n,r]=(0,L.useState)(!1),i=(0,L.useCallback)(async()=>{e.length>=B||(r(!0),await new Promise(e=>setTimeout(e,800)),t(e=>[...e,...V(e.length)]),r(!1))},[e.length]);return(0,R.jsxs)(`div`,{style:{width:`100%`},children:[(0,R.jsxs)(`p`,{style:{marginTop:0},children:[e.length,` / `,B,` loaded`]}),(0,R.jsx)(_,{items:e,itemHeight:40,maxHeight:300,loading:n,onLoadMore:i,loadMoreThreshold:120,renderItem:e=>(0,R.jsx)(`span`,{children:e.metadata?.title})})]})}var L,R,z,B,V;function H(){return(H=t((()=>{L=n(),v(),R=r(),z=30,B=300,V=e=>Array.from({length:z},(t,n)=>({id:e+n,metadata:{title:`Message ${e+n+1}`}}))})))()}var U;function W(){return(W=t((()=>{U=`import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: \`user-\${i}\`,
  metadata: { name: \`User \${i + 1}\`, email: \`user\${i + 1}@example.com\` },
}));

export default function AutoHeightDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        maxHeight={300}
        itemPadding={12}
        renderItem={(item) => (
          <div>
            <strong>{item.metadata?.name}</strong>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {item.metadata?.email}
            </div>
          </div>
        )}
      />
    </div>
  );
}
`})))()}var G;function K(){return(K=t((()=>{G=`import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  metadata: { title: \`Row \${i + 1}\` },
}));

export default function BasicDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={300}
        aria-label="Rows"
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
    </div>
  );
}
`})))()}var q;function J(){return(J=t((()=>{q=`import { useState } from "react";
import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  metadata: { title: \`Invoice #\${1000 + i}\` },
}));

export default function ClickableRowsDemo() {
  const [selected, setSelected] = useState<string>();

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={240}
        aria-label="Invoices"
        id="invoice-list"
        data-section="billing"
        onItemClick={(item) => setSelected(String(item.metadata?.title))}
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
      <span aria-live="polite">Selected: {selected ?? "none"}</span>
    </div>
  );
}
`})))()}var Y;function X(){return(X=t((()=>{Y=`import { VirtualList, type VirtualListItem } from "minerva-design";

const items: VirtualListItem[] = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  metadata: { title: \`Item \${i + 1}\`, value: Math.round(Math.random() * 1000) },
}));

export default function HighPerformanceDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={36}
        maxHeight={300}
        overscan={10}
        highPerformance
        renderItem={(item, index) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              #{index + 1} {item.metadata?.title}
            </span>
            <code>{item.metadata?.value}</code>
          </div>
        )}
      />
    </div>
  );
}
`})))()}var Z;function Q(){return(Q=t((()=>{Z=`import { useCallback, useState } from "react";
import { VirtualList, type VirtualListItem } from "minerva-design";

const PAGE_SIZE = 30;
const MAX_ITEMS = 300;

const createPage = (start: number): VirtualListItem[] =>
  Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: start + i,
    metadata: { title: \`Message \${start + i + 1}\` },
  }));

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState(() => createPage(0));
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (items.length >= MAX_ITEMS) return;
    setLoading(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setItems((prev) => [...prev, ...createPage(prev.length)]);
    setLoading(false);
  }, [items.length]);

  return (
    <div style={{ width: "100%" }}>
      <p style={{ marginTop: 0 }}>
        {items.length} / {MAX_ITEMS} loaded
      </p>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={300}
        loading={loading}
        onLoadMore={loadMore}
        loadMoreThreshold={120}
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
    </div>
  );
}
`})))()}var $,re,ie;function ae(){return(ae=t((()=>{S(),E(),j(),F(),H(),W(),K(),J(),X(),Q(),n(),f(),m(),$=r(),re=d(Object.assign({"./demos/auto-height.tsx":y,"./demos/basic.tsx":C,"./demos/clickable-rows.tsx":D,"./demos/high-performance.tsx":M,"./demos/infinite-scroll.tsx":I}),Object.assign({"./demos/auto-height.tsx":U,"./demos/basic.tsx":G,"./demos/clickable-rows.tsx":q,"./demos/high-performance.tsx":Y,"./demos/infinite-scroll.tsx":Z})),ie=()=>(0,$.jsx)(p,{id:`virtual-list`,demos:re})})))()}ae();export{ie as default};