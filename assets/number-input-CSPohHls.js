import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{$t as ee,Bt as r,It as i,St as a,rn as o,ut as s}from"./angular-preview-l4x8c_2r.js";import{B as c,H as l,T as u,U as d,j as f,k as te}from"./ProgressIndicator-BhPa7d9i.js";import{n as p,t as ne}from"./context-ESLv39g4.js";import{Ct as m,St as re}from"./io5-DF7HdQ2g.js";import{n as h,t as ie}from"./forms-field-D-OFnNqk.js";import{a as g,r as _}from"./FormControl-BkwPT394.js";import{n as v,t as y}from"./numberInput.module.scss-NaiJnmu4.js";import{l as b,n as x,t as S,u as C}from"./DocPage-B2iACtLP.js";var w,T,E;function D(){return(D=e((()=>{i(),d(),u(),m(),p(),h(),v(),w=t(),T=n(),E=({value:e,defaultValue:t,onChange:n,min:i,max:u,step:d=1,precision:p,size:m=`medium`,invalid:h=!1,disabled:g,readOnly:_,showStepper:v=!1,allowEmpty:b=!0,className:x,incrementLabel:S,decrementLabel:C,notANumberMessage:E,belowMinMessage:D,aboveMaxMessage:O,onBlur:k,onKeyDown:A,ref:j,...M})=>{let{t:N}=l(),P=ne({...M,disabled:g,readOnly:_}),F=!!P.disabled,I=F||!!P.readOnly,L=p??ee(d),[R,z]=re({value:e,defaultValue:t??null,onChange:n,name:`NumberInput`}),[B,V]=(0,w.useState)(()=>r(R,L)),[H,U]=(0,w.useState)({current:R,precision:L});if(H.current!==R||H.precision!==L){U({current:R,precision:L});let e=o(B);(e===null||e!==R)&&V(r(R,L))}let W=e=>{let t=Number(e.toFixed(L));z(t),V(t.toFixed(L))},G=e=>{if(I)return;let t=e.trim();if(t===``||t===`-`){b?(z(null),V(``)):W(a(i??0,i,u));return}let n=o(t);if(n===null){V(r(R,L));return}W(a(n,i,u))},K=e=>{if(I)return;let t=o(B)??R??0;W(a(t+e,i,u))},q=e=>{A?.(e),!(I||e.defaultPrevented)&&(e.key===`ArrowUp`?(e.preventDefault(),K(d)):e.key===`ArrowDown`?(e.preventDefault(),K(-d)):e.key===`PageUp`||e.key===`PageDown`?(e.preventDefault(),K((e.key===`PageUp`?10:-10)*d)):e.key===`Home`&&i!==void 0?(e.preventDefault(),W(i)):e.key===`End`&&u!==void 0?(e.preventDefault(),W(u)):e.key===`Enter`&&e.currentTarget.blur())},J=e=>{G(e.currentTarget.value),k?.(e)},Y=B.trim(),X=o(Y),Z;Y&&Y!==`-`&&Y!==`.`&&(X===null?Z=E??N(`numberInput.notANumber`):i!==void 0&&X<i?Z=D??N(`numberInput.belowMin`,{min:i}):u!==void 0&&X>u&&(Z=O??N(`numberInput.aboveMax`,{max:u})));let Q=Z!==void 0,$=h||Q||ie(P[`aria-invalid`]);return(0,T.jsxs)(`div`,{className:s(y.root,y[m],$&&y.invalid,Q&&y.shake,F&&y.disabled,x),title:Z,...c(`number-input`,`root`,{disabled:F,invalid:$,readonly:!!P.readOnly,required:!!(P.required||P[`aria-required`]),size:m}),children:[(0,T.jsx)(`input`,{ref:j,inputMode:`decimal`,type:`text`,className:y.field,...P,role:`spinbutton`,"aria-valuemin":i,"aria-valuemax":u,"aria-valuenow":R??void 0,"aria-invalid":$||P[`aria-invalid`]||void 0,value:B,onChange:e=>V(e.currentTarget.value),onBlur:J,onKeyDown:q,...c(`number-input`,`input`)}),v&&(0,T.jsxs)(`div`,{className:y.stepper,"aria-hidden":`true`,...c(`number-input`,`stepper`),children:[(0,T.jsx)(`button`,{type:`button`,className:s(y.step,y.stepUp),tabIndex:-1,disabled:I||u!==void 0&&(R??0)>=u,onClick:()=>K(d),"aria-label":S??N(`numberInput.increment`),...c(`number-input`,`increment`),children:(0,T.jsx)(te,{size:12,strokeWidth:2.5,"aria-hidden":!0})}),(0,T.jsx)(`button`,{type:`button`,className:s(y.step,y.stepDown),tabIndex:-1,disabled:I||i!==void 0&&(R??0)<=i,onClick:()=>K(-d),"aria-label":C??N(`numberInput.decrement`),...c(`number-input`,`decrement`),children:(0,T.jsx)(f,{size:12,strokeWidth:2.5,"aria-hidden":!0})})]})]})}})))()}function O(){let[e,t]=(0,k.useState)(1);return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(E,{"aria-label":`Quantity`,min:0,max:10,value:e,onChange:t}),(0,A.jsxs)(`p`,{children:[`Value: `,e===null?`empty`:e]})]})}var k,A;function j(){return(j=e((()=>{D(),k=t(),A=n()})))()}function M(){return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(_,{label:`HTTP status`,helperText:`Between 100 and 599.`,required:!0,children:(0,N.jsx)(E,{defaultValue:200,min:100,max:599})}),(0,N.jsx)(_,{label:`Retries`,readOnly:!0,children:(0,N.jsx)(E,{defaultValue:3})})]})}var N;function P(){return(P=e((()=>{g(),D(),N=n()})))()}function F(){return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(E,{"aria-label":`Rate`,defaultValue:.5,min:0,max:1,step:.01,showStepper:!0}),(0,I.jsx)(E,{"aria-label":`Price`,defaultValue:9.9,precision:2,size:`large`}),(0,I.jsx)(E,{"aria-label":`Latency`,defaultValue:100,step:50,allowEmpty:!1,size:`small`})]})}var I;function L(){return(L=e((()=>{D(),I=n()})))()}var R;function z(){return(z=e((()=>{R=`import { NumberInput } from "minerva-design";
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
`})))()}var B;function V(){return(V=e((()=>{B=`import { FormField, NumberInput } from "minerva-design";

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
`})))()}var H;function U(){return(U=e((()=>{H=`import { NumberInput } from "minerva-design";

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
`})))()}var W,G,K;function q(){return(q=e((()=>{j(),P(),L(),z(),V(),U(),t(),x(),C(),W=n(),G=b(Object.assign({"./demos/basic.tsx":O,"./demos/form-control.tsx":M,"./demos/stepper-precision.tsx":F}),Object.assign({"./demos/basic.tsx":R,"./demos/form-control.tsx":B,"./demos/stepper-precision.tsx":H})),K=()=>(0,W.jsx)(S,{id:`number-input`,demos:G})})))()}q();export{K as default};