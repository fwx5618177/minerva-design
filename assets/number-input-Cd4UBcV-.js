import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{a as r,r as i}from"./FormControl-4On8EIM5.js";import{n as a,t as o}from"./NumberInput-BHmNKshL.js";import{l as s,n as c,t as l,u}from"./DocPage-BdPOW9nQ.js";function d(){let[e,t]=(0,f.useState)(1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{"aria-label":`Quantity`,min:0,max:10,value:e,onChange:t}),(0,p.jsxs)(`p`,{children:[`Value: `,e===null?`empty`:e]})]})}var f,p;function m(){return(m=e((()=>{a(),f=t(),p=n()})))()}function h(){return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{label:`HTTP status`,helperText:`Between 100 and 599.`,required:!0,children:(0,g.jsx)(o,{defaultValue:200,min:100,max:599})}),(0,g.jsx)(i,{label:`Retries`,readOnly:!0,children:(0,g.jsx)(o,{defaultValue:3})})]})}var g;function _(){return(_=e((()=>{r(),a(),g=n()})))()}function v(){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{"aria-label":`Rate`,defaultValue:.5,min:0,max:1,step:.01,showStepper:!0}),(0,y.jsx)(o,{"aria-label":`Price`,defaultValue:9.9,precision:2,size:`large`}),(0,y.jsx)(o,{"aria-label":`Latency`,defaultValue:100,step:50,allowEmpty:!1,size:`small`})]})}var y;function b(){return(b=e((()=>{a(),y=n()})))()}var x;function S(){return(S=e((()=>{x=`import { NumberInput } from "minerva-design";
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
`})))()}var C;function w(){return(w=e((()=>{C=`import { FormField, NumberInput } from "minerva-design";

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
`})))()}var T;function E(){return(E=e((()=>{T=`import { NumberInput } from "minerva-design";

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
`})))()}var D,O,k;function A(){return(A=e((()=>{m(),_(),b(),S(),w(),E(),t(),c(),u(),D=n(),O=s(Object.assign({"./demos/basic.tsx":d,"./demos/form-control.tsx":h,"./demos/stepper-precision.tsx":v}),Object.assign({"./demos/basic.tsx":x,"./demos/form-control.tsx":C,"./demos/stepper-precision.tsx":T})),k=()=>(0,D.jsx)(l,{id:`number-input`,demos:O})})))()}A();export{k as default};