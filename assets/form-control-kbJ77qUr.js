import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,n as i,t as a}from"./context-ESLv39g4.js";import{n as o,t as s}from"./Input-gaYbdyz5.js";import{a as c,i as l,n as u,o as d,r as f,t as p}from"./FormControl-BkwPT394.js";import{n as m,t as h}from"./Textarea-a_5o3gYH.js";import{l as g,n as _,t as v,u as y}from"./DocPage-D-H5cPcd.js";function b(){let[e,t]=(0,x.useState)(``),n=e!==``&&!e.includes(`@`);return(0,S.jsxs)(p,{invalid:n,required:!0,children:[(0,S.jsx)(u,{children:`Email`}),(0,S.jsx)(o,{type:`email`,value:e,onChange:e=>t(e.target.value)}),(0,S.jsx)(d,{children:`Used to sign in.`}),(0,S.jsx)(l,{children:`Enter a valid email address.`})]})}var x,S;function C(){return(C=e((()=>{c(),s(),x=t(),S=n()})))()}function w(){let e=a({}),t=r();return(0,E.jsx)(`input`,{type:`color`,defaultValue:`#2563eb`,...e,style:{outline:t?.invalid?`2px solid red`:void 0}})}function T(){return(0,E.jsx)(f,{label:`Brand color`,helperText:`Wired by useFormControlProps.`,children:(0,E.jsx)(w,{})})}var E;function D(){return(D=e((()=>{c(),i(),E=n()})))()}function O(){return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(f,{label:`Title`,helperText:`Shown on the public page.`,children:(0,k.jsx)(o,{defaultValue:`Draft`})}),(0,k.jsx)(f,{label:`Summary`,errorMessage:`The summary is required.`,children:(0,k.jsx)(m,{rows:3})})]})}var k;function A(){return(A=e((()=>{c(),s(),h(),k=n()})))()}function j(){return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Required`,required:!0,children:(0,M.jsx)(o,{})}),(0,M.jsx)(f,{label:`Disabled`,disabled:!0,children:(0,M.jsx)(o,{defaultValue:`Disabled value`})}),(0,M.jsx)(f,{label:`Read-only`,readOnly:!0,children:(0,M.jsx)(o,{defaultValue:`Read-only value`})})]})}var M;function N(){return(N=e((()=>{c(),s(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [email, setEmail] = useState("");
  const invalid = email !== "" && !email.includes("@");
  return (
    <FormControl invalid={invalid} required>
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormHelperText>Used to sign in.</FormHelperText>
      <FormErrorMessage>Enter a valid email address.</FormErrorMessage>
    </FormControl>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import {
  FormField,
  useFormControlContext,
  useFormControlProps,
} from "minerva-design";

function ColorInput() {
  // id, aria-describedby, aria-invalid, aria-required, disabled, readOnly
  const props = useFormControlProps({});
  const field = useFormControlContext();
  return (
    <input
      type="color"
      defaultValue="#2563eb"
      {...props}
      style={{ outline: field?.invalid ? "2px solid red" : undefined }}
    />
  );
}

export default function CustomControlDemo() {
  return (
    <FormField label="Brand color" helperText="Wired by useFormControlProps.">
      <ColorInput />
    </FormField>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { FormField, Input, Textarea } from "minerva-design";

export default function FormFieldDemo() {
  return (
    <>
      <FormField label="Title" helperText="Shown on the public page.">
        <Input defaultValue="Draft" />
      </FormField>
      <FormField label="Summary" errorMessage="The summary is required.">
        <Textarea rows={3} />
      </FormField>
    </>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { FormField, Input } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <FormField label="Required" required>
        <Input />
      </FormField>
      <FormField label="Disabled" disabled>
        <Input defaultValue="Disabled value" />
      </FormField>
      <FormField label="Read-only" readOnly>
        <Input defaultValue="Read-only value" />
      </FormField>
    </>
  );
}
`})))()}var H,U,W;function G(){return(G=e((()=>{C(),D(),A(),N(),F(),L(),z(),V(),t(),_(),y(),H=n(),U=g(Object.assign({"./demos/basic.tsx":b,"./demos/custom-control.tsx":T,"./demos/form-field.tsx":O,"./demos/states.tsx":j}),Object.assign({"./demos/basic.tsx":P,"./demos/custom-control.tsx":I,"./demos/form-field.tsx":R,"./demos/states.tsx":B})),W=()=>(0,H.jsx)(v,{id:`form-control`,demos:U})})))()}G();export{W as default};