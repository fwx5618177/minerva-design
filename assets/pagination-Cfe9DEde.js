import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{A as r,Dt as ee,H as te,Ot as ne,i as re,j as ie,r as ae}from"./io5-CqGZWNm2.js";import{n as i,t as a}from"./Pagination-CVYdvuLK.js";import{i as oe,r as o}from"./DemoBlock-C9Su3C5u.js";import{l as se,n as ce,t as le,u as ue}from"./DocPage-BoAp0gXb.js";function de(){return(0,s.jsx)(i,{defaultCurrent:1,total:50})}var s;function c(){return(c=e((()=>{a(),s=n()})))()}function fe(){return(0,l.jsxs)(`div`,{style:{display:`grid`,gap:16},children:[(0,l.jsx)(i,{total:300,defaultCurrent:8,siblingCount:1,boundaryCount:1}),(0,l.jsx)(i,{total:300,defaultCurrent:8,siblingCount:2,boundaryCount:2}),(0,l.jsx)(i,{total:300,defaultCurrent:3,hideNumbers:!0,showTotal:!0}),(0,l.jsx)(i,{total:70,defaultCurrent:2,hideEdges:!0})]})}var l;function u(){return(u=e((()=>{a(),l=n()})))()}function pe(){let[e,t]=(0,d.useState)(1);return(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,f.jsx)(i,{current:e,total:100,onChange:t,icons:{prev:(0,f.jsx)(ae,{}),next:(0,f.jsx)(re,{}),jumpPrev:(0,f.jsx)(r,{}),jumpNext:(0,f.jsx)(ie,{})}}),(0,f.jsx)(i,{current:e,total:100,onChange:t,itemRender:(e,t)=>t===`prev`?`Prev`:t===`next`?`Next`:t===`page`?e:`…`})]})}var d,f;function p(){return(p=e((()=>{d=t(),a(),te(),f=n()})))()}function me(){return(0,m.jsx)(i,{current:2,total:50,disabled:!0})}var m;function h(){return(h=e((()=>{a(),m=n()})))()}function he(){let[e,t]=(0,g.useState)(6);return(0,_.jsx)(i,{current:e,total:500,onChange:t})}var g,_;function v(){return(v=e((()=>{g=t(),a(),_=n()})))()}function ge(){let[e,t]=(0,y.useState)(1);return(0,b.jsx)(i,{responsive:!0,current:e,total:300,onChange:t,showTotal:!0,showSizeChanger:!0})}var y,b;function x(){return(x=e((()=>{y=t(),a(),b=n()})))()}function _e(){let[e,t]=(0,S.useState)(2),n={current:e,total:50,onChange:t};return(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,C.jsx)(i,{...n,shape:`rounded`,variant:`solid`}),(0,C.jsx)(i,{...n,shape:`circle`,variant:`outline`}),(0,C.jsx)(i,{...n,shape:`square`,variant:`ghost`})]})}var S,C;function w(){return(w=e((()=>{S=t(),a(),C=n()})))()}function ve(){let[e,t]=(0,T.useState)(1);return(0,E.jsx)(i,{simple:!0,current:e,total:120,onChange:t})}var T,E;function D(){return(D=e((()=>{T=t(),a(),E=n()})))()}function ye(){let[e,t]=(0,O.useState)(1),[n,r]=(0,O.useState)(20);return(0,be.jsx)(i,{current:e,pageSize:n,total:500,showSizeChanger:!0,pageSizeOptions:[10,20,50],onChange:(e,n)=>{t(e),r(n)}})}var O,be;function k(){return(k=e((()=>{O=t(),a(),be=n()})))()}function xe(){let[e,t]=(0,A.useState)(2);return(0,j.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:M.map(n=>(0,j.jsx)(i,{size:n,current:e,total:50,onChange:t},n))})}var A,j,M;function N(){return(N=e((()=>{A=t(),a(),j=n(),M=[`small`,`medium`,`large`]})))()}function Se(){let[e,t]=(0,P.useState)(1);return(0,F.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,F.jsx)(i,{current:e,total:200,onChange:t,showTotal:!0,showQuickJumper:!0}),(0,F.jsx)(i,{current:e,total:200,onChange:t,showTotal:!0,totalRender:(e,[t,n])=>`${t}-${n} of ${e} items`})]})}var P,F;function I(){return(I=e((()=>{P=t(),a(),F=n()})))()}var L;function R(){return(R=e((()=>{L=`import { Pagination } from "minerva-design";

export default function BasicDemo() {
  return <Pagination defaultCurrent={1} total={50} />;
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { Pagination } from "minerva-design";

export default function CompactDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Pagination
        total={300}
        defaultCurrent={8}
        siblingCount={1}
        boundaryCount={1}
      />
      <Pagination
        total={300}
        defaultCurrent={8}
        siblingCount={2}
        boundaryCount={2}
      />
      <Pagination total={300} defaultCurrent={3} hideNumbers showTotal />
      <Pagination total={70} defaultCurrent={2} hideEdges />
    </div>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
import { Pagination } from "minerva-design";
import {
  IoArrowBack,
  IoArrowForward,
  IoPlayBack,
  IoPlayForward,
} from "react-icons/io5";

export default function CustomRenderDemo() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination
        current={page}
        total={100}
        onChange={setPage}
        icons={{
          prev: <IoArrowBack />,
          next: <IoArrowForward />,
          jumpPrev: <IoPlayBack />,
          jumpNext: <IoPlayForward />,
        }}
      />
      <Pagination
        current={page}
        total={100}
        onChange={setPage}
        itemRender={(p, type) =>
          type === "prev"
            ? "Prev"
            : type === "next"
              ? "Next"
              : type === "page"
                ? p
                : "…"
        }
      />
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { Pagination } from "minerva-design";

export default function DisabledDemo() {
  return <Pagination current={2} total={50} disabled />;
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useState } from "react";
import { Pagination } from "minerva-design";

export default function ManyPagesDemo() {
  const [page, setPage] = useState(6);

  return <Pagination current={page} total={500} onChange={setPage} />;
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
import { Pagination } from "minerva-design";

export default function ResponsiveDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      responsive
      current={page}
      total={300}
      onChange={setPage}
      showTotal
      showSizeChanger
    />
  );
}
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { useState } from "react";
import { Pagination } from "minerva-design";

export default function ShapesAndVariantsDemo() {
  const [page, setPage] = useState(2);
  const common = { current: page, total: 50, onChange: setPage };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination {...common} shape="rounded" variant="solid" />
      <Pagination {...common} shape="circle" variant="outline" />
      <Pagination {...common} shape="square" variant="ghost" />
    </div>
  );
}
`})))()}var Z;function Ce(){return(Ce=e((()=>{Z=`import { useState } from "react";
import { Pagination } from "minerva-design";

export default function SimpleDemo() {
  const [page, setPage] = useState(1);

  return <Pagination simple current={page} total={120} onChange={setPage} />;
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useState } from "react";
import { Pagination } from "minerva-design";

export default function SizeChangerDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      total={500}
      showSizeChanger
      pageSizeOptions={[10, 20, 50]}
      onChange={(nextPage, nextSize) => {
        setPage(nextPage);
        setPageSize(nextSize);
      }}
    />
  );
}
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { useState } from "react";
import { Pagination } from "minerva-design";

const sizes = ["small", "medium", "large"] as const;

export default function SizesDemo() {
  const [page, setPage] = useState(2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {sizes.map((size) => (
        <Pagination
          key={size}
          size={size}
          current={page}
          total={50}
          onChange={setPage}
        />
      ))}
    </div>
  );
}
`})))()}var Oe;function ke(){return(ke=e((()=>{Oe=`import { useState } from "react";
import { Pagination } from "minerva-design";

export default function TotalAndJumperDemo() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination
        current={page}
        total={200}
        onChange={setPage}
        showTotal
        showQuickJumper
      />
      <Pagination
        current={page}
        total={200}
        onChange={setPage}
        showTotal
        totalRender={(total, [from, to]) => \`\${from}-\${to} of \${total} items\`}
      />
    </div>
  );
}
`})))()}var Q,Ae,je;function $(){return($=e((()=>{c(),u(),p(),h(),v(),x(),w(),D(),k(),N(),I(),R(),B(),H(),W(),K(),J(),X(),Ce(),Te(),De(),ke(),t(),ee(),ce(),ue(),oe(),Q=n(),Ae=se(Object.assign({"./demos/basic.tsx":de,"./demos/compact.tsx":fe,"./demos/custom-render.tsx":pe,"./demos/disabled.tsx":me,"./demos/many-pages.tsx":he,"./demos/responsive.tsx":ge,"./demos/shapes-and-variants.tsx":_e,"./demos/simple.tsx":ve,"./demos/size-changer.tsx":ye,"./demos/sizes.tsx":xe,"./demos/total-and-jumper.tsx":Se}),Object.assign({"./demos/basic.tsx":L,"./demos/compact.tsx":z,"./demos/custom-render.tsx":V,"./demos/disabled.tsx":U,"./demos/many-pages.tsx":G,"./demos/responsive.tsx":q,"./demos/shapes-and-variants.tsx":Y,"./demos/simple.tsx":Z,"./demos/size-changer.tsx":we,"./demos/sizes.tsx":Ee,"./demos/total-and-jumper.tsx":Oe})),je=()=>{let{t:e}=ne();return(0,Q.jsx)(le,{id:`pagination`,demos:Ae,children:(0,Q.jsxs)(`section`,{className:o.section,"aria-labelledby":`accessibility`,children:[(0,Q.jsx)(`h2`,{id:`accessibility`,children:e(`docs.pagination.a11y.title`)}),(0,Q.jsx)(`p`,{className:o.prose,children:e(`docs.pagination.a11y.body`)})]})})}})))()}$();export{je as default};