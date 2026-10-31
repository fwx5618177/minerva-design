import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{$t as ee,Bt as r,It as i,St as a,rn as o,ut as s}from"./angular-preview-l4x8c_2r.js";import{B as c,T as l,V as u,j as te,k as ne}from"./ProgressIndicator-BMZ0rR7D.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{n as f,t as p}from"./context-ESLv39g4.js";import{bt as m,xt as h}from"./io5-BlmswBy7.js";import{n as g,t as re}from"./forms-field-D-OFnNqk.js";import{a as _,r as v}from"./FormControl-4On8EIM5.js";import{n as y,t as b}from"./numberInput.module.scss-NaiJnmu4.js";import{l as x,n as S,t as C,u as w}from"./DocPage-CfPUO8JU.js";var T,E,D;function O(){return(O=e((()=>{i(),u(),l(),h(),f(),g(),y(),T=t(),E=n(),D=({value:e,defaultValue:t,onChange:n,min:i,max:l,step:u=1,precision:f,size:h=`medium`,invalid:g=!1,disabled:_,readOnly:v,showStepper:y=!1,allowEmpty:x=!0,className:S,incrementLabel:C,decrementLabel:w,notANumberMessage:D,belowMinMessage:O,aboveMaxMessage:k,onBlur:A,onKeyDown:j,ref:M,...N})=>{let{t:P}=c(),F=p({...N,disabled:_,readOnly:v}),I=!!F.disabled,L=I||!!F.readOnly,R=f??ee(u),[z,B]=m({value:e,defaultValue:t??null,onChange:n,name:`NumberInput`}),[V,H]=(0,T.useState)(()=>r(z,R)),[U,W]=(0,T.useState)({current:z,precision:R});if(U.current!==z||U.precision!==R){W({current:z,precision:R});let e=o(V);(e===null||e!==z)&&H(r(z,R))}let G=e=>{let t=Number(e.toFixed(R));B(t),H(t.toFixed(R))},K=e=>{if(L)return;let t=e.trim();if(t===``||t===`-`){x?(B(null),H(``)):G(a(i??0,i,l));return}let n=o(t);if(n===null){H(r(z,R));return}G(a(n,i,l))},q=e=>{if(L)return;let t=o(V)??z??0;G(a(t+e,i,l))},J=e=>{j?.(e),!(L||e.defaultPrevented)&&(e.key===`ArrowUp`?(e.preventDefault(),q(u)):e.key===`ArrowDown`?(e.preventDefault(),q(-u)):e.key===`PageUp`||e.key===`PageDown`?(e.preventDefault(),q((e.key===`PageUp`?10:-10)*u)):e.key===`Home`&&i!==void 0?(e.preventDefault(),G(i)):e.key===`End`&&l!==void 0?(e.preventDefault(),G(l)):e.key===`Enter`&&e.currentTarget.blur())},ie=e=>{K(e.currentTarget.value),A?.(e)},Y=V.trim(),X=o(Y),Z;Y&&Y!==`-`&&Y!==`.`&&(X===null?Z=D??P(`numberInput.notANumber`):i!==void 0&&X<i?Z=O??P(`numberInput.belowMin`,{min:i}):l!==void 0&&X>l&&(Z=k??P(`numberInput.aboveMax`,{max:l})));let Q=Z!==void 0,$=g||Q||re(F[`aria-invalid`]);return(0,E.jsxs)(`div`,{className:s(b.root,b[h],$&&b.invalid,Q&&b.shake,I&&b.disabled,S),title:Z,...d(`number-input`,`root`,{disabled:I,invalid:$,readonly:!!F.readOnly,required:!!(F.required||F[`aria-required`]),size:h}),children:[(0,E.jsx)(`input`,{ref:M,inputMode:`decimal`,type:`text`,className:b.field,...F,role:`spinbutton`,"aria-valuemin":i,"aria-valuemax":l,"aria-valuenow":z??void 0,"aria-invalid":$||F[`aria-invalid`]||void 0,value:V,onChange:e=>H(e.currentTarget.value),onBlur:ie,onKeyDown:J,...d(`number-input`,`input`)}),y&&(0,E.jsxs)(`div`,{className:b.stepper,"aria-hidden":`true`,...d(`number-input`,`stepper`),children:[(0,E.jsx)(`button`,{type:`button`,className:s(b.step,b.stepUp),tabIndex:-1,disabled:L||l!==void 0&&(z??0)>=l,onClick:()=>q(u),"aria-label":C??P(`numberInput.increment`),...d(`number-input`,`increment`),children:(0,E.jsx)(ne,{size:12,strokeWidth:2.5,"aria-hidden":!0})}),(0,E.jsx)(`button`,{type:`button`,className:s(b.step,b.stepDown),tabIndex:-1,disabled:L||i!==void 0&&(z??0)<=i,onClick:()=>q(-u),"aria-label":w??P(`numberInput.decrement`),...d(`number-input`,`decrement`),children:(0,E.jsx)(te,{size:12,strokeWidth:2.5,"aria-hidden":!0})})]})]})}})))()}function k(){let[e,t]=(0,A.useState)(1);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(D,{"aria-label":`Quantity`,min:0,max:10,value:e,onChange:t}),(0,j.jsxs)(`p`,{children:[`Value: `,e===null?`empty`:e]})]})}var A,j;function M(){return(M=e((()=>{O(),A=t(),j=n()})))()}function N(){return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(v,{label:`HTTP status`,helperText:`Between 100 and 599.`,required:!0,children:(0,P.jsx)(D,{defaultValue:200,min:100,max:599})}),(0,P.jsx)(v,{label:`Retries`,readOnly:!0,children:(0,P.jsx)(D,{defaultValue:3})})]})}var P;function F(){return(F=e((()=>{_(),O(),P=n()})))()}function I(){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(D,{"aria-label":`Rate`,defaultValue:.5,min:0,max:1,step:.01,showStepper:!0}),(0,L.jsx)(D,{"aria-label":`Price`,defaultValue:9.9,precision:2,size:`large`}),(0,L.jsx)(D,{"aria-label":`Latency`,defaultValue:100,step:50,allowEmpty:!1,size:`small`})]})}var L;function R(){return(R=e((()=>{O(),L=n()})))()}var z;function B(){return(B=e((()=>{z=`import { NumberInput } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [quantity, setQuantity] = useState<number | null>(1);
  return (
    <>
      <NumberInput
        aria-label="Quantity"
        min={0}
        max={10}
        value={quantity}
        onChange={setQuantity}
      />
      <p>Value: {quantity === null ? "empty" : quantity}</p>
    </>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { FormField, NumberInput } from "minerva-design";

export default function FormControlDemo() {
  return (
    <>
      <FormField label="HTTP status" helperText="Between 100 and 599." required>
        <NumberInput defaultValue={200} min={100} max={599} />
      </FormField>
      <FormField label="Retries" readOnly>
        <NumberInput defaultValue={3} />
      </FormField>
    </>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { NumberInput } from "minerva-design";

export default function StepperPrecisionDemo() {
  return (
    <>
      <NumberInput
        aria-label="Rate"
        defaultValue={0.5}
        min={0}
        max={1}
        step={0.01}
        showStepper
      />
      <NumberInput
        aria-label="Price"
        defaultValue={9.9}
        precision={2}
        size="large"
      />
      <NumberInput
        aria-label="Latency"
        defaultValue={100}
        step={50}
        allowEmpty={false}
        size="small"
      />
    </>
  );
}
`})))()}var G,K,q;function J(){return(J=e((()=>{M(),F(),R(),B(),H(),W(),t(),S(),w(),G=n(),K=x(Object.assign({"./demos/basic.tsx":k,"./demos/form-control.tsx":N,"./demos/stepper-precision.tsx":I}),Object.assign({"./demos/basic.tsx":z,"./demos/form-control.tsx":V,"./demos/stepper-precision.tsx":U})),q=()=>(0,G.jsx)(C,{id:`number-input`,demos:K})})))()}J();export{q as default};