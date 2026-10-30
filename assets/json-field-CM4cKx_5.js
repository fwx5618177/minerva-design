import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{_ as r,g as i,h as a,m as o}from"./native-preview-C-OsNMso.js";import{It as s,ut as c}from"./angular-preview-l4x8c_2r.js";import{B as l,I as ee,L as te,T as u,V as d,x as f}from"./ProgressIndicator-BMZ0rR7D.js";import{t as p}from"./stylingHooks-PqiNJdev.js";import{i as m,n as h}from"./context-ESLv39g4.js";import{bt as ne,xt as g}from"./io5-BlmswBy7.js";import{i as _,r as re}from"./CodeBlock-CJOpG7_Q.js";import{a as v,r as y}from"./FormControl-4On8EIM5.js";import{n as b,t as x}from"./Textarea-C7p22TtF.js";import{n as S,t as C}from"./jsonField.module.scss-BtPR-0-M.js";import{l as w,n as T,t as E,u as D}from"./DocPage-JhXgs5p-.js";function O(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function k(e,t){let n=Math.min(10,Math.max(0,Math.trunc(t)||0));if(n>0)return o(e,i(e,void 0,{tabSize:n,insertSpaces:!0,eol:`
`}));let r=a(e,!0),s=[];for(;r.getPosition()<e.length;){r.scan();let t=r.getTokenOffset();s.push(e.slice(t,t+r.getTokenLength()))}return s.join(``)}var A,j,M;function N(){return(N=e((()=>{s(),d(),u(),g(),h(),_(),x(),S(),A=t(),j=n(),r(),M=({value:e,defaultValue:t,onChange:n,rows:r=8,hideToolbar:i=!1,indent:a=2,className:o,formatLabel:s,validLabel:u,invalidLabel:d,disabled:h,readOnly:g,required:_,invalid:v=!1,onFocus:y,onBlur:x,"aria-describedby":S,"aria-invalid":w,spellCheck:T=!1,...E})=>{let{t:D}=l(),M=m(),N=!!(h||M?.disabled),P=!!(g||M?.readOnly),F=!!(_||M?.required),I=`json-status-${(0,A.useId)()}`,[L,R]=ne({value:e,defaultValue:t??``,onChange:n,name:`JsonField`}),[z,B]=(0,A.useState)(!1),V=z?{status:`empty`}:O(L),H=V.status===`invalid`,U=()=>{N||P||O(L).status!==`valid`||R(k(L,a))};return(0,j.jsxs)(`div`,{className:c(C.root,o),...p(`json-field`,`root`,{disabled:N,invalid:H||v||!!M?.invalid,readonly:P,required:F}),children:[!i&&(0,j.jsx)(`div`,{className:C.toolbar,...p(`json-field`,`toolbar`),children:(0,j.jsx)(re,{type:`button`,label:s??D(`jsonField.format`),size:`small`,shape:`square`,icon:(0,j.jsx)(f,{size:18,"aria-hidden":!0}),disabled:N||P||!L.trim(),onClick:U})}),(0,j.jsx)(b,{...E,rows:r,value:L,disabled:N,readOnly:P,required:F,spellCheck:T,className:C.textarea,"aria-invalid":H||v?!0:w!==`false`&&w,"aria-describedby":[S,H?I:void 0].filter(Boolean).join(` `)||void 0,onChange:e=>{!N&&!P&&R(e.target.value)},onFocus:e=>{B(!0),y?.(e)},onBlur:e=>{B(!1),x?.(e)}}),(0,j.jsxs)(`div`,{id:I,role:`status`,"aria-live":`polite`,className:c(C.status,H&&C.statusInvalid),...p(`json-field`,`status`),children:[V.status===`valid`&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(te,{size:16,"aria-hidden":!0}),(0,j.jsx)(`span`,{children:u??D(`jsonField.valid`)})]}),V.status===`invalid`&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(ee,{size:16,"aria-hidden":!0}),(0,j.jsxs)(`span`,{children:[d??D(`jsonField.invalid`),`: `,V.error]})]})]})]})}})))()}function P(){let[e,t]=(0,F.useState)(`{"title":"Draft","tags":["a","b"]}`);return(0,I.jsx)(M,{"aria-label":`Response body`,value:e,onChange:t,rows:6})}var F,I;function L(){return(L=e((()=>{N(),F=t(),I=n()})))()}function R(){return(0,z.jsx)(y,{label:`Dictionary`,helperText:`Public translation dictionary.`,required:!0,children:(0,z.jsx)(M,{name:`dictionary`,defaultValue:`{"hello":"world"}`,rows:5})})}var z;function B(){return(B=e((()=>{v(),N(),z=n()})))()}function V(){return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(M,{"aria-label":`Four spaces`,defaultValue:`{"a":[1,2]}`,indent:4,rows:4}),(0,H.jsx)(M,{"aria-label":`Compact`,defaultValue:`{
  "a": [1, 2]
}`,indent:0,rows:4}),(0,H.jsx)(M,{"aria-label":`Without toolbar`,defaultValue:`{`,hideToolbar:!0,rows:2})]})}var H;function U(){return(U=e((()=>{N(),H=n()})))()}var W;function G(){return(G=e((()=>{W=`import { JsonField } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [text, setText] = useState('{"title":"Draft","tags":["a","b"]}');
  return (
    <JsonField
      aria-label="Response body"
      value={text}
      onChange={setText}
      rows={6}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { FormField, JsonField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <FormField
      label="Dictionary"
      helperText="Public translation dictionary."
      required
    >
      <JsonField name="dictionary" defaultValue='{"hello":"world"}' rows={5} />
    </FormField>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { JsonField } from "minerva-design";

export default function IndentDemo() {
  return (
    <>
      <JsonField
        aria-label="Four spaces"
        defaultValue='{"a":[1,2]}'
        indent={4}
        rows={4}
      />
      <JsonField
        aria-label="Compact"
        defaultValue={'{\\n  "a": [1, 2]\\n}'}
        indent={0}
        rows={4}
      />
      <JsonField
        aria-label="Without toolbar"
        defaultValue="{"
        hideToolbar
        rows={2}
      />
    </>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{L(),B(),U(),G(),q(),Y(),t(),T(),D(),X=n(),Z=w(Object.assign({"./demos/basic.tsx":P,"./demos/form-control.tsx":R,"./demos/indent.tsx":V}),Object.assign({"./demos/basic.tsx":W,"./demos/form-control.tsx":K,"./demos/indent.tsx":J})),Q=()=>(0,X.jsx)(E,{id:`json-field`,demos:Z})})))()}$();export{Q as default};