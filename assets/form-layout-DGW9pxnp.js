import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{It as r,ut as i}from"./angular-preview-l4x8c_2r.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{n as c,t as l}from"./Input-LfOOMgLE.js";import{n as u,t as d}from"./Alert-DYH-oD8D.js";import{n as f,t as p}from"./ResponsiveGrid-BNPVBS0V.js";import{n as m,t as h}from"./GridItem-Bi4pAmj7.js";import{a as g,r as _}from"./FormControl-4On8EIM5.js";import{n as v,t as y}from"./formLayout.module.scss-R7acduwA.js";import{n as b,t as x}from"./Textarea-C7p22TtF.js";import{l as S,n as C,t as w,u as T}from"./DocPage-CmQtD5jg.js";var E,D;function O(){return(O=e((()=>{r(),p(),y(),E=n(),D=({columns:e,gap:t,rowGap:n,columnGap:r,className:a,children:o,ref:c,...l})=>(0,E.jsx)(`form`,{ref:c,className:i(v.root,a),...l,...s(`form-layout`,`root`),children:(0,E.jsx)(f,{columns:e,gap:t,rowGap:n,columnGap:r,children:o})})})))()}function k(){let[e,t]=(0,A.useState)(null);return(0,j.jsxs)(D,{columns:{base:1,sm:2},onSubmit:e=>{e.preventDefault(),t(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))))},children:[(0,j.jsx)(h,{fullWidth:!0,asChild:!0,children:(0,j.jsx)(_,{label:`Title`,children:(0,j.jsx)(c,{name:`title`,defaultValue:`Draft`,required:!0})})}),(0,j.jsx)(_,{label:`Language`,children:(0,j.jsx)(c,{name:`language`})}),(0,j.jsx)(_,{label:`Category`,children:(0,j.jsx)(c,{name:`category`})}),(0,j.jsx)(h,{fullWidth:!0,asChild:!0,children:(0,j.jsx)(_,{label:`Summary`,children:(0,j.jsx)(b,{name:`summary`,rows:3})})}),(0,j.jsx)(h,{fullWidth:!0,children:(0,j.jsx)(o,{type:`submit`,children:`Save`})}),e&&(0,j.jsx)(h,{fullWidth:!0,children:(0,j.jsx)(d,{color:`success`,title:`Saved`,children:(0,j.jsx)(`code`,{children:e})})})]})}var A,j;function M(){return(M=e((()=>{A=t(),u(),a(),g(),O(),m(),l(),x(),j=n()})))()}function N(){return(0,P.jsxs)(D,{columns:3,rowGap:2,columnGap:`24px`,children:[(0,P.jsx)(_,{label:`First name`,children:(0,P.jsx)(c,{name:`first`})}),(0,P.jsx)(_,{label:`Last name`,children:(0,P.jsx)(c,{name:`last`})}),(0,P.jsx)(_,{label:`Nickname`,children:(0,P.jsx)(c,{name:`nickname`})})]})}var P;function F(){return(F=e((()=>{g(),O(),l(),P=n()})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import {
  Alert,
  Button,
  FormField,
  FormLayout,
  GridItem,
  Input,
  Textarea,
} from "minerva-design";

export default function BasicDemo() {
  const [saved, setSaved] = useState<string | null>(null);
  return (
    <FormLayout
      columns={{ base: 1, sm: 2 }}
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(
          JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
        );
      }}
    >
      <GridItem fullWidth asChild>
        <FormField label="Title">
          <Input name="title" defaultValue="Draft" required />
        </FormField>
      </GridItem>
      <FormField label="Language">
        <Input name="language" />
      </FormField>
      <FormField label="Category">
        <Input name="category" />
      </FormField>
      <GridItem fullWidth asChild>
        <FormField label="Summary">
          <Textarea name="summary" rows={3} />
        </FormField>
      </GridItem>
      <GridItem fullWidth>
        <Button type="submit">Save</Button>
      </GridItem>
      {saved && (
        <GridItem fullWidth>
          <Alert color="success" title="Saved">
            <code>{saved}</code>
          </Alert>
        </GridItem>
      )}
    </FormLayout>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { FormField, FormLayout, Input } from "minerva-design";

export default function GapsDemo() {
  return (
    <FormLayout columns={3} rowGap={2} columnGap="24px">
      <FormField label="First name">
        <Input name="first" />
      </FormField>
      <FormField label="Last name">
        <Input name="last" />
      </FormField>
      <FormField label="Nickname">
        <Input name="nickname" />
      </FormField>
    </FormLayout>
  );
}
`})))()}var B,V,H;function U(){return(U=e((()=>{M(),F(),L(),z(),t(),C(),T(),B=n(),V=S(Object.assign({"./demos/basic.tsx":k,"./demos/gaps.tsx":N}),Object.assign({"./demos/basic.tsx":I,"./demos/gaps.tsx":R})),H=()=>(0,B.jsx)(w,{id:`form-layout`,demos:V})})))()}U();export{H as default};