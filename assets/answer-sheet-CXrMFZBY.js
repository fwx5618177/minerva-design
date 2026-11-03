import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{An as r,Dt as i,Et as a,I as o,N as ee,S as te,pt as ne,t as re,yt as ie,zt as ae}from"./angular-preview-IwZi912s.js";import{B as oe,V as s}from"./ProgressIndicator-DJBhmBkg.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{$ as l,St as u,xt as se}from"./io5-CaMdkTnG.js";import{n as d,t as f}from"./answerSheet.module.scss-CnaPEgPL.js";import{l as p,n as m,t as h,u as g}from"./DocPage-Cww2i8I2.js";var _,v,y,b;function x(){return(x=e((()=>{r(),s(),u(),l(),f(),_=t(),v=n(),o(),y={ArrowLeft:`previous`,ArrowRight:`next`,ArrowUp:`up`,ArrowDown:`down`,Home:`first`,End:`last`},b=({items:e,groups:t,value:n,defaultValue:r,onChange:o,size:s=`medium`,layout:l=`wrap`,columns:u,showLegend:f=!1,showSummary:p=!1,getItemLabel:m,disabled:h=!1,"aria-label":g,className:b,ref:x})=>{let{t:S}=oe(),[C,w]=se({value:n,defaultValue:r,onChange:e=>{e!==void 0&&o?.(e)},name:`AnswerSheet`}),T=(0,_.useId)(),[E,D]=(0,_.useState)(``),O=(0,_.useRef)(new Map),k=(0,_.useRef)(null),A=ae(e,t),j=A.flatMap(e=>e.entries).map(e=>e.item.key),M=[E,C].find(e=>e&&j.includes(e))??j[0],N=l===`wrap`&&u&&u>0?Math.floor(u):void 0;(0,_.useEffect)(()=>{if(!k.current)return;let e=O.current.get(k.current);k.current=null,e?.focus()},[E]);let P=C!==void 0&&j.includes(C);(0,_.useEffect)(()=>{if(l!==`scroll`||!P||C===void 0)return;let e=O.current.get(C);e?.parentElement&&ee(e.parentElement,e)},[l,C,P]);let F=e=>{h||e.disabled||w(e.key)},I=e=>{k.current=e,D(e),e===E&&O.current.get(e)?.focus()},L=(e,t,n)=>{if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||F(t);return}let r=y[re(e.key,e.currentTarget)];if(!r)return;e.preventDefault();let a;if((r===`up`||r===`down`)&&!N){if(l===`scroll`)return;let t=j.map(e=>O.current.get(e)).filter(e=>!!e);a=te(t,e.currentTarget,r===`down`?1:-1)?.dataset.key}else{let e=i(A,n,r,N);e!==null&&(a=j[e])}a&&I(a)},R=(e,t,n)=>m?m(e,t):S(e.flagged?`answerSheet.itemFlagged`:`answerSheet.item`,{number:e.label??t+1,status:S(`answerSheet.status.${n}`)}),z=ne(e),B=f?ie(e):[];return(0,v.jsxs)(`nav`,{ref:x,"aria-label":g??S(`answerSheet.label`),className:a(d.answerSheet,d[s],l===`scroll`&&d.scroll,b),...c(`answer-sheet`,`root`,{disabled:h,size:s,layout:l}),children:[p?(0,v.jsx)(`p`,{className:d.summary,...c(`answer-sheet`,`total`),children:S(`answerSheet.summary`,z)}):null,A.map((e,t)=>{let n=e.title?`${T}-group-${t}`:void 0;return(0,v.jsxs)(`div`,{className:d.section,role:e.title?`group`:void 0,"aria-labelledby":n,...c(`answer-sheet`,`group`),children:[e.title?(0,v.jsx)(`div`,{id:n,className:d.sectionTitle,...c(`answer-sheet`,`group-label`),children:e.title}):null,(0,v.jsx)(`div`,{className:a(d.grid,N&&d.columns),style:N?{gridTemplateColumns:`repeat(${N}, minmax(0, 1fr))`}:void 0,...c(`answer-sheet`,`grid`),children:e.entries.map(({item:e,index:t,status:n,label:r})=>{let i=C===e.key,o=h||!!e.disabled;return(0,v.jsxs)(`button`,{type:`button`,ref:t=>{t?O.current.set(e.key,t):O.current.delete(e.key)},className:a(d.item,d[n]),...c(`answer-sheet`,`item`,{current:i,disabled:o,flagged:!!e.flagged,status:n}),"data-key":e.key,"aria-label":R(e,t,n),"aria-current":i?`step`:void 0,"aria-disabled":o||void 0,tabIndex:e.key===M?0:-1,onFocus:()=>D(e.key),onClick:()=>F(e),onKeyDown:n=>L(n,e,t),children:[r,e.flagged?(0,v.jsx)(`span`,{className:d.flag,"aria-hidden":!0,...c(`answer-sheet`,`indicator`)}):null]},e.key)})})]},e.key||`-`)}),B.length?(0,v.jsx)(`ul`,{className:d.legend,...c(`answer-sheet`,`legend`),children:B.map(e=>(0,v.jsxs)(`li`,{className:d.legendItem,...c(`answer-sheet`,`legend-item`),children:[(0,v.jsx)(`span`,{className:a(d.swatch,d[e]),"aria-hidden":!0}),S(`answerSheet.legend.${e}`)]},e))}):null]})}})))()}function S(){let[e,t]=(0,C.useState)(`q6`);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,w.jsx)(b,{items:T,value:e,onChange:t}),(0,w.jsxs)(`p`,{style:{margin:0},children:[`Current question: `,e.slice(1)]})]})}var C,w,T;function E(){return(E=e((()=>{C=t(),x(),w=n(),T=Array.from({length:12},(e,t)=>({key:`q${t+1}`,status:t<5?`answered`:`unanswered`}))})))()}function D(){let[e,t]=(0,O.useState)(`s3`);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:420},children:[(0,k.jsx)(b,{items:j,groups:A,value:e,onChange:t,showSummary:!0,showLegend:!0,"aria-label":`Review questions`}),(0,k.jsxs)(`p`,{style:{margin:0},children:[`Reviewing: `,e]})]})}var O,k,A,j;function M(){return(M=e((()=>{O=t(),x(),k=n(),A=[{key:`single`,title:`Single choice`},{key:`multiple`,title:`Multiple choice`},{key:`short`,title:`Short answer`}],j=[{key:`s1`,group:`single`,status:`correct`},{key:`s2`,group:`single`,status:`correct`},{key:`s3`,group:`single`,status:`wrong`,flagged:!0},{key:`s4`,group:`single`,status:`correct`},{key:`s5`,group:`single`,status:`skipped`},{key:`s6`,group:`single`,status:`correct`},{key:`m1`,group:`multiple`,status:`wrong`},{key:`m2`,group:`multiple`,status:`correct`},{key:`m3`,group:`multiple`,status:`answered`,flagged:!0},{key:`a1`,group:`short`,status:`answered`},{key:`a2`,group:`short`},{key:`a3`,group:`short`,disabled:!0}]})))()}function N(){let[e,t]=(0,P.useState)(`q16`);return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:360},children:[(0,F.jsx)(b,{items:I,value:e,onChange:t,layout:`scroll`,size:`small`}),(0,F.jsxs)(`p`,{style:{margin:0},children:[`Current question: `,e.slice(1)]})]})}var P,F,I;function L(){return(L=e((()=>{P=t(),x(),F=n(),I=Array.from({length:40},(e,t)=>({key:`q${t+1}`,status:t<14?`answered`:t===14?`skipped`:`unanswered`,flagged:t===8}))})))()}function R(){return(0,z.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:420},children:[(0,z.jsx)(b,{items:B,size:`small`,defaultValue:`q5`,"aria-label":`Small sheet`}),(0,z.jsx)(b,{items:B,columns:5,defaultValue:`q5`,"aria-label":`Five columns`}),(0,z.jsx)(b,{items:B,disabled:!0,"aria-label":`Disabled sheet`})]})}var z,B;function V(){return(V=e((()=>{x(),z=n(),B=Array.from({length:10},(e,t)=>({key:`q${t+1}`,status:t<4?`answered`:`unanswered`}))})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 5 ? "answered" : "unanswered",
}));

export default function BasicDemo() {
  const [value, setValue] = useState("q6");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet items={items} value={value} onChange={setValue} />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import {
  AnswerSheet,
  type AnswerSheetGroup,
  type AnswerSheetItem,
} from "minerva-design";

const groups: AnswerSheetGroup[] = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];

const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];

export default function GroupsDemo() {
  const [value, setValue] = useState("s3");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        groups={groups}
        value={value}
        onChange={setValue}
        showSummary
        showLegend
        aria-label="Review questions"
      />
      <p style={{ margin: 0 }}>Reviewing: {value}</p>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 40 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));

export default function ScrollDemo() {
  const [value, setValue] = useState("q16");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 360 }}>
      <AnswerSheet
        items={items}
        value={value}
        onChange={setValue}
        layout="scroll"
        size="small"
      />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 4 ? "answered" : "unanswered",
}));

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        size="small"
        defaultValue="q5"
        aria-label="Small sheet"
      />
      <AnswerSheet
        items={items}
        columns={5}
        defaultValue="q5"
        aria-label="Five columns"
      />
      <AnswerSheet items={items} disabled aria-label="Disabled sheet" />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{E(),M(),L(),V(),U(),G(),q(),Y(),t(),m(),g(),X=n(),Z=p(Object.assign({"./demos/basic.tsx":S,"./demos/groups.tsx":D,"./demos/scroll.tsx":N,"./demos/sizes.tsx":R}),Object.assign({"./demos/basic.tsx":H,"./demos/groups.tsx":W,"./demos/scroll.tsx":K,"./demos/sizes.tsx":J})),Q=()=>(0,X.jsx)(h,{id:`answer-sheet`,demos:Z})})))()}$();export{Q as default};