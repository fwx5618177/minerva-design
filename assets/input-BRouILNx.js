import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-pHdeSZBa.js";import{R as a,z as o}from"./ProgressIndicator-CXNTCbma.js";import{n as s,t as c}from"./Input-DpAzl0V0.js";import{a as l,r as u}from"./FormControl-Ftl_hIhJ.js";import{l as ee,n as te,t as ne,u as re}from"./DocPage-Bp8RrfyP.js";import{A as d,D as f,h as p,x as ie}from"./lu-CnQO_dK_.js";function ae(){return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c,{"aria-label":`Search`,prefix:(0,m.jsx)(ie,{}),placeholder:`Search`}),(0,m.jsx)(c,{"aria-label":`Handle`,prefix:`@`,defaultValue:`minerva`}),(0,m.jsx)(c,{"aria-label":`Price`,prefix:`$`,suffix:`USD`,inputMode:`decimal`})]})}var m;function h(){return(h=e((()=>{s(),d(),m=n()})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.input.login`}),[t,n]=(0,g.useState)(!1);return(0,_.jsxs)(`form`,{style:{display:`grid`,gap:12,maxWidth:360},onSubmit:e=>{e.preventDefault(),n(!0)},children:[(0,_.jsx)(u,{label:e(`username`),required:!0,children:(0,_.jsx)(c,{name:`username`,autoComplete:`username`,prefix:(0,_.jsx)(f,{}),required:!0})}),(0,_.jsx)(u,{label:e(`password`),required:!0,children:(0,_.jsx)(c,{name:`password`,type:`password`,autoComplete:`current-password`,prefix:(0,_.jsx)(p,{}),required:!0})}),(0,_.jsx)(o,{type:`submit`,children:e(`submit`)}),(0,_.jsx)(`output`,{"aria-live":`polite`,children:e(t?`feedback`:`notice`)})]})}var g,_;function v(){return(v=e((()=>{g=t(),i(),a(),l(),s(),d(),_=n()})))()}function se(){let[e,t]=(0,y.useState)(``);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(c,{"aria-label":`Name`,placeholder:`Uncontrolled`}),(0,b.jsx)(c,{"aria-label":`Controlled`,placeholder:`Controlled`,value:e,onChange:e=>t(e.target.value)})]})}var y,b;function x(){return(x=e((()=>{s(),y=t(),b=n()})))()}function ce(){return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(c,{"aria-label":`Search`,placeholder:`Search`,clearable:!0}),(0,S.jsx)(c,{"aria-label":`Short bio`,defaultValue:`Frontend developer`,clearable:!0,showCharCount:!0,maxLength:40})]})}var S;function C(){return(C=e((()=>{s(),S=n()})))()}function le(){return(0,w.jsx)(u,{label:`Password`,helperText:`At least 8 characters.`,children:(0,w.jsx)(c,{type:`password`,prefix:(0,w.jsx)(p,{}),autoComplete:`new-password`,minLength:8})})}var w;function T(){return(T=e((()=>{l(),s(),d(),w=n()})))()}function ue(){return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(c,{"aria-label":`Small`,size:`small`,placeholder:`small`}),(0,E.jsx)(c,{"aria-label":`Medium`,placeholder:`medium (outline)`}),(0,E.jsx)(c,{"aria-label":`Large`,size:`large`,placeholder:`large`}),(0,E.jsx)(c,{"aria-label":`Filled`,variant:`filled`,placeholder:`filled`}),(0,E.jsx)(c,{"aria-label":`Unstyled`,variant:`unstyled`,placeholder:`unstyled`})]})}var E;function D(){return(D=e((()=>{s(),E=n()})))()}function O(){return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(c,{"aria-label":`Invalid`,invalid:!0,defaultValue:`Invalid`}),(0,k.jsx)(c,{"aria-label":`Disabled`,disabled:!0,defaultValue:`Disabled`}),(0,k.jsx)(c,{"aria-label":`Read-only`,readOnly:!0,defaultValue:`Project Atlas`}),(0,k.jsx)(u,{label:`Inside a FormField`,errorMessage:`Inherits the error`,children:(0,k.jsx)(c,{})})]})}var k;function A(){return(A=e((()=>{l(),s(),k=n()})))()}function de(){let[e,t]=(0,j.useState)(``),[n,r]=(0,j.useState)(),i=()=>{r(/^\S+@\S+\.\S+$/.test(e)?void 0:`Please enter a valid email address`)};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(u,{label:`Email`,errorMessage:n,required:!0,children:(0,M.jsx)(c,{type:`email`,value:e,onChange:e=>{t(e.target.value),r(void 0)},onKeyDown:e=>e.key===`Enter`&&i()})}),(0,M.jsx)(o,{onClick:i,children:`Submit`})]})}var j,M;function N(){return(N=e((()=>{j=t(),a(),l(),s(),M=n()})))()}var P;function F(){return(F=e((()=>{P=`import { Input } from "minerva-design";
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
`})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, FormField, Input } from "minerva-design";
import { LuLock, LuUser } from "react-icons/lu";

export default function AutofillDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.input.login" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      style={{ display: "grid", gap: 12, maxWidth: 360 }}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FormField label={t("username")} required>
        <Input
          name="username"
          autoComplete="username"
          prefix={<LuUser />}
          required
        />
      </FormField>
      <FormField label={t("password")} required>
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          prefix={<LuLock />}
          required
        />
      </FormField>
      <Button type="submit">{t("submit")}</Button>
      <output aria-live="polite">
        {submitted ? t("feedback") : t("notice")}
      </output>
    </form>
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
      <Input aria-label="Read-only" readOnly defaultValue="Project Atlas" />
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
`})))()}var X,Z,Q;function $(){return($=e((()=>{h(),v(),x(),C(),T(),D(),A(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),te(),re(),X=n(),Z=ee(Object.assign({"./demos/addons.tsx":ae,"./demos/autofill.tsx":oe,"./demos/basic.tsx":se,"./demos/clearable-and-count.tsx":ce,"./demos/password.tsx":le,"./demos/sizes-variants.tsx":ue,"./demos/states.tsx":O,"./demos/validation.tsx":de}),Object.assign({"./demos/addons.tsx":P,"./demos/autofill.tsx":I,"./demos/basic.tsx":R,"./demos/clearable-and-count.tsx":B,"./demos/password.tsx":H,"./demos/sizes-variants.tsx":W,"./demos/states.tsx":K,"./demos/validation.tsx":J})),Q=()=>(0,X.jsx)(ne,{id:`input`,demos:Z})})))()}$();export{Q as default};