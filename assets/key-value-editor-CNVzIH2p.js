import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as i}from"./angular-preview-l4x8c_2r.js";import{B as a,H as o,M as s,R as c,T as l,U as u,w as d,z as f}from"./ProgressIndicator-BhPa7d9i.js";import{Ct as p,J as m,St as h,q as g}from"./io5-DF7HdQ2g.js";import{a as _,r as v}from"./FormControl-BkwPT394.js";import{n as y,t as b}from"./Textarea-a_5o3gYH.js";import{n as x,t as S}from"./keyValueEditor.module.scss-BoWLNL6h.js";import{l as C,n as w,t as T,u as E}from"./DocPage-B2iACtLP.js";var D,O,k,A;function j(){return(j=e((()=>{r(),u(),c(),l(),p(),m(),_(),b(),S(),D=t(),O=n(),k=[],A=({entries:e,defaultEntries:t,onChange:n,disabled:r=!1,keyLabel:c,valueLabel:l,addLabel:u,removeLabel:p,errors:m,className:_,ref:b,...S})=>{let{t:C}=o(),w=(0,D.useId)(),T=(0,D.useRef)(0),[E,A]=h({value:e,defaultValue:t??k,onChange:n,name:`KeyValueEditor`,prop:`entries`}),j=c??C(`keyValueEditor.key`),M=l??C(`keyValueEditor.value`),N=p??C(`keyValueEditor.remove`),P=(0,D.useRef)(new Map),F=(0,D.useRef)(new Map),I=(0,D.useRef)(null),L=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=L.current;if(!e)return;L.current=null;let t=e=>E.some(t=>t.id===e);e.kind===`add`?t(e.id)&&P.current.get(e.id)?.focus():t(e.id)||(e.nextId&&F.current.get(e.nextId)||I.current)?.focus()},[E]);let R=()=>{if(r)return;let e;do e=`key-value-${w}-${T.current++}`;while(E.some(t=>t.id===e));L.current={kind:`add`,id:e},A([...E,{id:e,key:``,value:``}])},z=(e,t,n)=>{r||A(E.map(r=>r.id===e?{...r,[t]:n}:r))},B=e=>{if(r)return;let t=E.findIndex(t=>t.id===e),n=E[t+1]??E[t-1];L.current={kind:`remove`,id:e,nextId:n?.id},A(E.filter(t=>t.id!==e))},V=(e,t)=>(0,O.jsxs)(O.Fragment,{children:[e,(0,O.jsxs)(`span`,{className:x.srOnly,children:[` `,t+1]})]});return(0,O.jsxs)(`div`,{ref:b,...S,className:i(x.root,_),...a(`key-value-editor`,`root`,{disabled:r}),children:[E.map((e,t)=>{let n=m?.[e.id];return(0,O.jsxs)(`div`,{className:x.row,...a(`key-value-editor`,`row`,{invalid:!!(n?.key||n?.value)}),children:[(0,O.jsx)(v,{label:V(j,t),disabled:r,invalid:!!n?.key,errorMessage:n?.key,children:(0,O.jsx)(y,{ref:t=>{t?P.current.set(e.id,t):P.current.delete(e.id)},className:x.key,size:`small`,rows:1,value:e.key,onChange:t=>z(e.id,`key`,t.target.value)})}),(0,O.jsx)(v,{label:V(M,t),disabled:r,invalid:!!n?.value,errorMessage:n?.value,children:(0,O.jsx)(y,{size:`small`,rows:2,value:e.value,onChange:t=>z(e.id,`value`,t.target.value)})}),(0,O.jsx)(g,{ref:t=>{t?F.current.set(e.id,t):F.current.delete(e.id)},className:x.remove,type:`button`,label:`${N} ${t+1}`,size:`small`,shape:`square`,icon:(0,O.jsx)(d,{size:16,"aria-hidden":!0}),disabled:r,onClick:()=>B(e.id)})]},e.id)}),(0,O.jsxs)(f,{ref:I,className:x.add,type:`button`,color:`neutral`,variant:`outline`,size:`small`,disabled:r,onClick:R,children:[(0,O.jsx)(s,{size:16,"aria-hidden":!0}),(0,O.jsx)(`span`,{children:u??C(`keyValueEditor.add`)})]})]})}})))()}function M(){let[e,t]=(0,N.useState)([{id:`greeting`,key:`greeting`,value:`Hello
world`}]);return(0,P.jsx)(A,{entries:e,onChange:t,keyLabel:`Translation key`,valueLabel:`Translation`,addLabel:`Add translation`,removeLabel:`Remove translation`})}var N,P;function F(){return(F=e((()=>{j(),N=t(),P=n()})))()}function I(){let[e,t]=(0,L.useState)([{id:`a`,key:`Accept`,value:`application/json`},{id:`b`,key:`Accept`,value:``}]),n=Object.fromEntries(e.map(t=>[t.id,{key:e.some(e=>e!==t&&e.key===t.key)?`Duplicate header`:void 0,value:t.value?void 0:`Value required`}]));return(0,R.jsx)(A,{entries:e,onChange:t,errors:n})}var L,R;function z(){return(z=e((()=>{j(),L=t(),R=n()})))()}var B;function V(){return(V=e((()=>{B=`import { KeyValueEditor, type KeyValueEntry } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "greeting", key: "greeting", value: "Hello\\nworld" },
  ]);
  return (
    <KeyValueEditor
      entries={entries}
      onChange={setEntries}
      keyLabel="Translation key"
      valueLabel="Translation"
      addLabel="Add translation"
      removeLabel="Remove translation"
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { KeyValueEditor, type KeyValueEntry } from "minerva-design";
import { useState } from "react";

export default function ErrorsDemo() {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "a", key: "Accept", value: "application/json" },
    { id: "b", key: "Accept", value: "" },
  ]);
  const errors = Object.fromEntries(
    entries.map((entry) => [
      entry.id,
      {
        key: entries.some((other) => other !== entry && other.key === entry.key)
          ? "Duplicate header"
          : undefined,
        value: entry.value ? undefined : "Value required",
      },
    ]),
  );
  return (
    <KeyValueEditor entries={entries} onChange={setEntries} errors={errors} />
  );
}
`})))()}var W,G,K;function q(){return(q=e((()=>{F(),z(),V(),U(),t(),w(),E(),W=n(),G=C(Object.assign({"./demos/basic.tsx":M,"./demos/errors.tsx":I}),Object.assign({"./demos/basic.tsx":B,"./demos/errors.tsx":H})),K=()=>(0,W.jsx)(T,{id:`key-value-editor`,demos:G})})))()}q();export{K as default};