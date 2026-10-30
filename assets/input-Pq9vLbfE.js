import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BMZ0rR7D.js";import{n as a,t as o}from"./Input-BNZ0fzl-.js";import{a as s,r as c}from"./FormControl-4On8EIM5.js";import{l,n as u,t as d,u as ee}from"./DocPage-6WUEs69-.js";import{D as f,p,v as m}from"./lu-BxR8fmLv.js";function h(){return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(a,{"aria-label":`Search`,prefix:(0,g.jsx)(m,{}),placeholder:`Search`}),(0,g.jsx)(a,{"aria-label":`Handle`,prefix:`@`,defaultValue:`minerva`}),(0,g.jsx)(a,{"aria-label":`Price`,prefix:`$`,suffix:`USD`,inputMode:`decimal`})]})}var g;function _(){return(_=e((()=>{o(),f(),g=n()})))()}function v(){let[e,t]=(0,y.useState)(``);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(a,{"aria-label":`Name`,placeholder:`Uncontrolled`}),(0,b.jsx)(a,{"aria-label":`Controlled`,placeholder:`Controlled`,value:e,onChange:e=>t(e.target.value)})]})}var y,b;function x(){return(x=e((()=>{o(),y=t(),b=n()})))()}function te(){return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(a,{"aria-label":`Search`,placeholder:`Search`,clearable:!0}),(0,S.jsx)(a,{"aria-label":`Short bio`,defaultValue:`Frontend developer`,clearable:!0,showCharCount:!0,maxLength:40})]})}var S;function C(){return(C=e((()=>{o(),S=n()})))()}function w(){return(0,T.jsx)(c,{label:`Password`,helperText:`At least 8 characters.`,children:(0,T.jsx)(a,{type:`password`,prefix:(0,T.jsx)(p,{}),autoComplete:`new-password`,minLength:8})})}var T;function E(){return(E=e((()=>{s(),o(),f(),T=n()})))()}function ne(){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(a,{"aria-label":`Small`,size:`small`,placeholder:`small`}),(0,D.jsx)(a,{"aria-label":`Medium`,placeholder:`medium (outline)`}),(0,D.jsx)(a,{"aria-label":`Large`,size:`large`,placeholder:`large`}),(0,D.jsx)(a,{"aria-label":`Filled`,variant:`filled`,placeholder:`filled`}),(0,D.jsx)(a,{"aria-label":`Unstyled`,variant:`unstyled`,placeholder:`unstyled`})]})}var D;function O(){return(O=e((()=>{o(),D=n()})))()}function k(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(a,{"aria-label":`Invalid`,invalid:!0,defaultValue:`Invalid`}),(0,A.jsx)(a,{"aria-label":`Disabled`,disabled:!0,defaultValue:`Disabled`}),(0,A.jsx)(a,{"aria-label":`Read-only`,readOnly:!0,defaultValue:`Read-only`}),(0,A.jsx)(c,{label:`Inside a FormField`,errorMessage:`Inherits the error`,children:(0,A.jsx)(a,{})})]})}var A;function j(){return(j=e((()=>{s(),o(),A=n()})))()}function M(){let[e,t]=(0,N.useState)(``),[n,r]=(0,N.useState)(),o=()=>{r(/^\S+@\S+\.\S+$/.test(e)?void 0:`Please enter a valid email address`)};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(c,{label:`Email`,errorMessage:n,required:!0,children:(0,P.jsx)(a,{type:`email`,value:e,onChange:e=>{t(e.target.value),r(void 0)},onKeyDown:e=>e.key===`Enter`&&o()})}),(0,P.jsx)(i,{onClick:o,children:`Submit`})]})}var N,P;function F(){return(F=e((()=>{N=t(),r(),s(),o(),P=n()})))()}var I;function L(){return(L=e((()=>{I=`import { Input } from "minerva-design";
import { LuSearch } from "react-icons/lu";

export default function AddonsDemo() {
  return (
    <>
      <Input aria-label="Search" prefix={<LuSearch />} placeholder="Search" />
      <Input aria-label="Handle" prefix="@" defaultValue="minerva" />
      <Input aria-label="Price" prefix="$" suffix="USD" inputMode="decimal" />
    </>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { Input } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input aria-label="Name" placeholder="Uncontrolled" />
      <Input
        aria-label="Controlled"
        placeholder="Controlled"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { Input } from "minerva-design";

export default function ClearableAndCountDemo() {
  return (
    <>
      <Input aria-label="Search" placeholder="Search" clearable />
      <Input
        aria-label="Short bio"
        defaultValue="Frontend developer"
        clearable
        showCharCount
        maxLength={40}
      />
    </>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { FormField, Input } from "minerva-design";
import { LuLock } from "react-icons/lu";

export default function PasswordDemo() {
  return (
    <FormField label="Password" helperText="At least 8 characters.">
      <Input
        type="password"
        prefix={<LuLock />}
        autoComplete="new-password"
        minLength={8}
      />
    </FormField>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Input } from "minerva-design";

export default function SizesVariantsDemo() {
  return (
    <>
      <Input aria-label="Small" size="small" placeholder="small" />
      <Input aria-label="Medium" placeholder="medium (outline)" />
      <Input aria-label="Large" size="large" placeholder="large" />
      <Input aria-label="Filled" variant="filled" placeholder="filled" />
      <Input aria-label="Unstyled" variant="unstyled" placeholder="unstyled" />
    </>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { FormField, Input } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <Input aria-label="Invalid" invalid defaultValue="Invalid" />
      <Input aria-label="Disabled" disabled defaultValue="Disabled" />
      <Input aria-label="Read-only" readOnly defaultValue="Read-only" />
      <FormField label="Inside a FormField" errorMessage="Inherits the error">
        <Input />
      </FormField>
    </>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
import { Button, FormField, Input } from "minerva-design";

export default function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  const submit = () => {
    setError(
      /^\\S+@\\S+\\.\\S+$/.test(email)
        ? undefined
        : "Please enter a valid email address",
    );
  };

  return (
    <>
      <FormField label="Email" errorMessage={error} required>
        <Input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(undefined);
          }}
          onKeyDown={(event) => event.key === "Enter" && submit()}
        />
      </FormField>
      <Button onClick={submit}>Submit</Button>
    </>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{_(),x(),C(),E(),O(),j(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),u(),ee(),X=n(),Z=l(Object.assign({"./demos/addons.tsx":h,"./demos/basic.tsx":v,"./demos/clearable-and-count.tsx":te,"./demos/password.tsx":w,"./demos/sizes-variants.tsx":ne,"./demos/states.tsx":k,"./demos/validation.tsx":M}),Object.assign({"./demos/addons.tsx":I,"./demos/basic.tsx":R,"./demos/clearable-and-count.tsx":B,"./demos/password.tsx":H,"./demos/sizes-variants.tsx":W,"./demos/states.tsx":K,"./demos/validation.tsx":J})),Q=()=>(0,X.jsx)(d,{id:`input`,demos:Z})})))()}$();export{Q as default};