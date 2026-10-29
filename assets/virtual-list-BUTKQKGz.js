import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{Et as i,Tt as a}from"./io5-CvrBnF9y.js";import{It as o,Jt as ee,ut as s}from"./angular-preview-l4x8c_2r.js";import{B as c,n as l,t as te}from"./ProgressIndicator-BhPa7d9i.js";import{n as u,t as d}from"./virtualList.module.scss-BY5oxRRP.js";import{l as f,n as p,t as m,u as h}from"./DocPage-DCMfehF7.js";var g,_,v;function y(){return(y=t((()=>{o(),l(),a(),u(),g=e(n(),1),_=r(),v=g.memo(({items:e,itemHeight:t,maxHeight:n,overscan:r=5,renderItem:a,className:o=``,style:l,onLoadMore:u,loadMoreThreshold:f=100,highPerformance:p=!1,loading:m=!1,itemPadding:h=8,onItemClick:v,"aria-label":y,onScroll:b,ref:x,...S})=>{let[C,w]=(0,g.useState)(0),[T,E]=(0,g.useState)(0),D=(0,g.useRef)(0),O=(0,g.useRef)(!1),k=(0,g.useRef)(void 0),A=(0,g.useRef)(void 0),[j,M]=(0,g.useState)(null),N=(0,g.useMemo)(()=>j===null?null:e.findIndex(e=>e.id===j),[j,e]),[P,F]=(0,g.useState)(0),I=!t&&P===0&&e.length>0,L=(0,g.useCallback)(e=>{if(!e||(E(e.clientHeight),typeof ResizeObserver>`u`))return;let t=new ResizeObserver(e=>{for(let t of e)E(t.contentRect.height)});return t.observe(e),()=>t.disconnect()},[]),R=i(L,x),z=(0,g.useCallback)(e=>{if(!e)return;let t=()=>{let t=e.offsetHeight;t>0&&F(t)};if(t(),typeof ResizeObserver>`u`)return;let n=new ResizeObserver(t);return n.observe(e),()=>n.disconnect()},[]),B=t||(P>0?P+h*2:0),V=(0,g.useMemo)(()=>B?ee({scrollTop:C,viewportHeight:T,itemHeight:B,itemCount:e.length,overscan:r}):{start:0,end:1,visibleCount:1},[C,T,B,r,e.length]),H=(0,g.useCallback)(()=>{k.current!==void 0&&(cancelAnimationFrame(k.current),k.current=void 0),A.current!==void 0&&(`cancelIdleCallback`in window&&cancelIdleCallback(A.current),A.current=void 0)},[]),U=(0,g.useCallback)(e=>{p?(H(),k.current=requestAnimationFrame(()=>{k.current=void 0,`requestIdleCallback`in window?A.current=requestIdleCallback(()=>{A.current=void 0,e()},{timeout:100}):e()})):e()},[p,H]),W=(0,g.useMemo)(()=>{let e=[];for(let t=V.start;t<V.end;t++)e.push({index:t,start:t*B,height:B});if(N!==null&&N>=0&&(N<V.start||N>=V.end)){let t={index:N,start:N*B,height:B};N<V.start?e.unshift(t):e.push(t)}return e},[V,B,N]),G=(0,g.useCallback)(e=>{let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>D.current;D.current=t,U(()=>{w(t),i&&u&&!O.current&&!m&&n-t-r<f&&n>r&&(O.current=!0,Promise.resolve(u()).finally(()=>{O.current=!1}))})},[u,m,f,U]),K=e=>{b?.(e),G(e)};return(0,g.useEffect)(()=>H,[H]),(0,_.jsxs)(`div`,{...S,ref:R,role:`region`,"aria-label":y,tabIndex:0,"aria-busy":m||void 0,className:s(d.virtualList,o),style:{...l,maxHeight:n,overflow:`auto`,position:`relative`},onScroll:K,...c(`virtual-list`,`root`,{loading:m}),children:[I&&(0,_.jsx)(`div`,{ref:z,className:d.measureItem,"aria-hidden":`true`,children:a(e[0],0)}),(0,_.jsx)(`div`,{style:{height:B?e.length*B:`auto`,position:`relative`,willChange:`transform`},className:d.virtualListContent,role:`list`,"aria-label":y,...c(`virtual-list`,`list`),children:B>0&&W.map(t=>(0,_.jsx)(`div`,{style:{position:`absolute`,top:0,transform:`translateY(${t.start}px)`,width:`100%`,height:B,willChange:`transform`,padding:h},className:s(d.virtualListItem,v&&d.clickable),tabIndex:v?0:void 0,onClick:v?n=>v(e[t.index],t.index,n):void 0,onKeyDown:v?n=>{n.target===n.currentTarget&&(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),v(e[t.index],t.index,n))}:void 0,role:`listitem`,...c(`virtual-list`,`item`),"aria-setsize":e.length,"aria-posinset":t.index+1,onFocus:()=>M(e[t.index].id),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||M(null)},children:a(e[t.index],t.index)},e[t.index].id))}),m&&(0,_.jsx)(`div`,{className:d.loadingWrapper,...c(`virtual-list`,`loading`),children:(0,_.jsx)(te,{variant:`wave`,size:`small`})})]})})})))()}function b(){return(0,x.jsx)(`div`,{style:{width:`100%`},children:(0,x.jsx)(v,{items:S,maxHeight:300,itemPadding:12,renderItem:e=>(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`strong`,{children:e.metadata?.name}),(0,x.jsx)(`div`,{style:{fontSize:12,opacity:.7},children:e.metadata?.email})]})})})}var x,S;function C(){return(C=t((()=>{y(),x=r(),S=Array.from({length:1e3},(e,t)=>({id:`user-${t}`,metadata:{name:`User ${t+1}`,email:`user${t+1}@example.com`}}))})))()}function w(){return(0,T.jsx)(`div`,{style:{width:`100%`},children:(0,T.jsx)(v,{items:E,itemHeight:40,maxHeight:300,"aria-label":`Rows`,renderItem:e=>(0,T.jsx)(`span`,{children:e.metadata?.title})})})}var T,E;function D(){return(D=t((()=>{y(),T=r(),E=Array.from({length:1e4},(e,t)=>({id:t,metadata:{title:`Row ${t+1}`}}))})))()}function O(){let[e,t]=(0,k.useState)();return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,A.jsx)(v,{items:j,itemHeight:40,maxHeight:240,"aria-label":`Invoices`,id:`invoice-list`,"data-section":`billing`,onItemClick:e=>t(String(e.metadata?.title)),renderItem:e=>(0,A.jsx)(`span`,{children:e.metadata?.title})}),(0,A.jsxs)(`span`,{"aria-live":`polite`,children:[`Selected: `,e??`none`]})]})}var k,A,j;function M(){return(M=t((()=>{k=n(),y(),A=r(),j=Array.from({length:1e3},(e,t)=>({id:t,metadata:{title:`Invoice #${1e3+t}`}}))})))()}function N(){return(0,P.jsx)(`div`,{style:{width:`100%`},children:(0,P.jsx)(v,{items:F,itemHeight:36,maxHeight:300,overscan:10,highPerformance:!0,renderItem:(e,t)=>(0,P.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,P.jsxs)(`span`,{children:[`#`,t+1,` `,e.metadata?.title]}),(0,P.jsx)(`code`,{children:e.metadata?.value})]})})})}var P,F;function I(){return(I=t((()=>{y(),P=r(),F=Array.from({length:1e5},(e,t)=>({id:t,metadata:{title:`Item ${t+1}`,value:Math.round(Math.random()*1e3)}}))})))()}function L(){let[e,t]=(0,R.useState)(()=>H(0)),[n,r]=(0,R.useState)(!1),i=(0,R.useCallback)(async()=>{e.length>=V||(r(!0),await new Promise(e=>setTimeout(e,800)),t(e=>[...e,...H(e.length)]),r(!1))},[e.length]);return(0,z.jsxs)(`div`,{style:{width:`100%`},children:[(0,z.jsxs)(`p`,{style:{marginTop:0},children:[e.length,` / `,V,` loaded`]}),(0,z.jsx)(v,{items:e,itemHeight:40,maxHeight:300,loading:n,onLoadMore:i,loadMoreThreshold:120,renderItem:e=>(0,z.jsx)(`span`,{children:e.metadata?.title})})]})}var R,z,B,V,H;function U(){return(U=t((()=>{R=n(),y(),z=r(),B=30,V=300,H=e=>Array.from({length:B},(t,n)=>({id:e+n,metadata:{title:`Message ${e+n+1}`}}))})))()}var W;function G(){return(G=t((()=>{W=`import { VirtualList, type VirtualListItem } from "minerva-design";

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
`})))()}var K;function q(){return(q=t((()=>{K=`import { VirtualList, type VirtualListItem } from "minerva-design";

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
`})))()}var J;function Y(){return(Y=t((()=>{J=`import { useState } from "react";
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
`})))()}var X;function Z(){return(Z=t((()=>{X=`import { VirtualList, type VirtualListItem } from "minerva-design";

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
`})))()}var Q;function $(){return($=t((()=>{Q=`import { useCallback, useState } from "react";
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
`})))()}var ne,re,ie;function ae(){return(ae=t((()=>{C(),D(),M(),I(),U(),G(),q(),Y(),Z(),$(),n(),p(),h(),ne=r(),re=f(Object.assign({"./demos/auto-height.tsx":b,"./demos/basic.tsx":w,"./demos/clickable-rows.tsx":O,"./demos/high-performance.tsx":N,"./demos/infinite-scroll.tsx":L}),Object.assign({"./demos/auto-height.tsx":W,"./demos/basic.tsx":K,"./demos/clickable-rows.tsx":J,"./demos/high-performance.tsx":X,"./demos/infinite-scroll.tsx":Q})),ie=()=>(0,ne.jsx)(m,{id:`virtual-list`,demos:re})})))()}ae();export{ie as default};