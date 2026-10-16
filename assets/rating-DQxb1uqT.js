import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{et as r}from"./io5-BqFjv7-4.js";import{It as i,Vt as a,jt as o,ut as s,wt as c,x as l}from"./angular-preview-DpazifeG.js";import{B as u,D as d,T as f,d as p}from"./ProgressIndicator-vVpDij6t.js";import{c as m,l as h}from"./CodeBlock-C3JALRK0.js";import{n as g,t as _}from"./rating.module.scss-DQknn8Z6.js";import{l as v,n as y,t as b,u as x}from"./DocPage-DpI9GKki.js";var S,C,w,T,E,D;function O(){return(O=e((()=>{i(),f(),r(),m(),g(),t(),S=n(),C={small:12,medium:16,large:20},w=Array.from({length:5},(e,t)=>t),T=({fill:e,size:t})=>{let n=s(_.star,_[e]);return e===`half`?(0,S.jsxs)(`span`,{className:n,style:{width:t,height:t},...u(`rating`,`star`,{fill:e}),children:[(0,S.jsx)(p,{size:t,strokeWidth:1.5,className:_.halfBase}),(0,S.jsx)(d,{size:t,fill:`currentColor`,strokeWidth:1.5,className:_.halfFill})]}):(0,S.jsx)(p,{size:t,className:n,fill:e===`full`?`currentColor`:`none`,strokeWidth:1.5,"aria-hidden":!0,focusable:!1,...u(`rating`,`star`,{fill:e})})},E=({value:e,max:t=10,size:n=`medium`,showValue:r=!1,ratingCount:i,onChange:d,readOnly:f=!1,"aria-label":p,onKeyDown:m,className:g,style:v,ref:y,...b})=>{let x=!!d&&!f,[E,D]=h(o,{value:e,max:t,readOnly:!x,onValueChange:d}),O=a(E,t),k=e=>O[e],A=(e,t)=>{let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;D({type:`PICK`,index:t,half:r})},j=n=>{if(m?.(n),n.defaultPrevented||!x)return;let r=l(n.key,n.currentTarget);c(r,e,t)!==null&&(n.preventDefault(),D({type:`KEY`,key:r}))},M=C[n],N=p??`${e.toFixed(1)} / ${t}`,P=s(_.rating,_[n],x&&_.interactive,g),F=u(`rating`,`root`,{readonly:!x,size:n}),I=(0,S.jsx)(`span`,{className:_.stars,"aria-hidden":!0,...u(`rating`,`stars`),children:w.map(e=>x?(0,S.jsx)(`button`,{type:`button`,tabIndex:-1,className:_.starButton,onClick:t=>A(t,e),onMouseEnter:()=>D({type:`HOVER`,index:e}),children:(0,S.jsx)(T,{fill:k(e),size:M})},e):(0,S.jsx)(T,{fill:k(e),size:M},e))}),L=r&&(0,S.jsxs)(`span`,{className:_.value,...u(`rating`,`value`),children:[(0,S.jsx)(`strong`,{children:e.toFixed(1)}),i!==void 0&&(0,S.jsxs)(`span`,{className:_.count,...u(`rating`,`count`),children:[`(`,i.toLocaleString(`en-US`),`)`]})]});return x?(0,S.jsxs)(`span`,{...b,ref:y,className:P,style:v,role:`slider`,"aria-label":N,"aria-valuenow":e,"aria-valuemin":0,"aria-valuemax":t,tabIndex:0,onKeyDown:j,onMouseLeave:()=>D({type:`HOVER_END`}),...F,children:[I,L]}):(0,S.jsxs)(`span`,{...b,ref:y,className:P,style:v,"aria-label":N,role:`img`,...F,children:[I,L]})},D=({dimensions:e,max:t=10,size:n=`medium`,onChange:r,readOnly:i,showValue:a=!0,className:o,ref:c})=>(0,S.jsx)(`div`,{ref:c,className:s(_.scale,o),...u(`rating-scale`,`root`,{readonly:!r||!!i,size:n}),children:e.map(e=>(0,S.jsxs)(`div`,{className:_.scaleRow,title:typeof e.hint==`string`?e.hint:void 0,...u(`rating-scale`,`row`),children:[(0,S.jsx)(`span`,{className:_.scaleLabel,...u(`rating-scale`,`label`),children:e.label}),(0,S.jsx)(E,{value:e.value,max:t,size:n,showValue:a,readOnly:i,onChange:r?t=>r(e.key,t):void 0,"aria-label":`${e.label} ${e.value.toFixed(1)} / ${t}`})]},e.key))})})))()}function k(){return(0,A.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,A.jsx)(E,{value:8.6,size:`small`}),(0,A.jsx)(E,{value:7,showValue:!0,ratingCount:3214}),(0,A.jsx)(E,{value:3.5,max:5,size:`large`,showValue:!0})]})}var A;function j(){return(j=e((()=>{O(),A=n()})))()}function M(){let[e,t]=(0,N.useState)(6);return(0,P.jsx)(E,{value:e,onChange:t,showValue:!0,size:`large`})}var N,P;function F(){return(F=e((()=>{N=t(),O(),P=n()})))()}function I(){let[e,t]=(0,L.useState)({plot:8.2,characters:7.5,writing:9});return(0,R.jsx)(D,{dimensions:[{key:`plot`,label:`Plot`,value:e.plot,hint:`Story and pacing`},{key:`characters`,label:`Characters`,value:e.characters},{key:`writing`,label:`Writing`,value:e.writing}],onChange:(e,n)=>t(t=>({...t,[e]:n}))})}var L,R;function z(){return(z=e((()=>{L=t(),O(),R=n()})))()}var B;function V(){return(V=e((()=>{B=`import { Rating } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Rating value={8.6} size="small" />
      <Rating value={7} showValue ratingCount={3214} />
      <Rating value={3.5} max={5} size="large" showValue />
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import { Rating } from "minerva-design";

export default function InteractiveDemo() {
  const [value, setValue] = useState(6);

  return <Rating value={value} onChange={setValue} showValue size="large" />;
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { RatingScale } from "minerva-design";

export default function ScaleDemo() {
  const [scores, setScores] = useState({
    plot: 8.2,
    characters: 7.5,
    writing: 9,
  });

  return (
    <RatingScale
      dimensions={[
        {
          key: "plot",
          label: "Plot",
          value: scores.plot,
          hint: "Story and pacing",
        },
        { key: "characters", label: "Characters", value: scores.characters },
        { key: "writing", label: "Writing", value: scores.writing },
      ]}
      onChange={(key, value) =>
        setScores((prev) => ({ ...prev, [key]: value }))
      }
    />
  );
}
`})))()}var K,q,J;function Y(){return(Y=e((()=>{j(),F(),z(),V(),U(),G(),t(),y(),x(),K=n(),q=v(Object.assign({"./demos/basic.tsx":k,"./demos/interactive.tsx":M,"./demos/scale.tsx":I}),Object.assign({"./demos/basic.tsx":B,"./demos/interactive.tsx":H,"./demos/scale.tsx":W})),J=()=>(0,K.jsx)(b,{id:`rating`,demos:q})})))()}Y();export{J as default};