import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CMgCbIEj.js";import{a,n as o,o as s,t as c}from"./FormControl-Ftl_hIhJ.js";import{i as l,r as u}from"./DemoBlock-DXMxbf4H.js";import{a as d,i as f,n as p,o as m,r as h,t as g}from"./Select-I6y89_0c.js";import{l as _,n as v,t as y,u as b}from"./DocPage-BCo6GMe1.js";function x(){let[e,t]=(0,S.useState)(`en`);return(0,C.jsx)(`div`,{style:{width:240},children:(0,C.jsxs)(p,{"aria-label":`Language`,value:e,onChange:t,children:[(0,C.jsx)(m,{value:`en`,children:`English`}),(0,C.jsx)(m,{value:`zh`,children:`Chinese`}),(0,C.jsx)(m,{value:`fr`,children:`French`})]})})}var S,C;function w(){return(w=e((()=>{S=t(),d(),C=n()})))()}function T(){return(0,E.jsx)(`div`,{style:{width:240},children:(0,E.jsxs)(p,{"aria-label":`Fruit`,placeholder:`Pick a fruit`,children:[(0,E.jsxs)(f,{children:[(0,E.jsx)(h,{children:`Fruits`}),(0,E.jsx)(m,{value:`apple`,children:`Apple`}),(0,E.jsx)(m,{value:`banana`,children:`Banana`})]}),(0,E.jsx)(g,{}),(0,E.jsxs)(f,{children:[(0,E.jsx)(h,{children:`Out of season`}),(0,E.jsx)(m,{value:`cherry`,disabled:!0,children:`Cherry`})]})]})})}var E;function D(){return(D=e((()=>{d(),E=n()})))()}function O(){return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,width:260},children:[(0,k.jsx)(p,{"aria-label":`Small`,size:`small`,placeholder:`Small`,children:A}),(0,k.jsx)(p,{"aria-label":`Large`,size:`large`,placeholder:`Large`,children:A}),(0,k.jsx)(p,{"aria-label":`Invalid`,invalid:!0,placeholder:`Invalid`,children:A}),(0,k.jsx)(p,{"aria-label":`Disabled`,disabled:!0,placeholder:`Disabled`,children:A}),(0,k.jsxs)(c,{required:!0,children:[(0,k.jsx)(o,{children:`Genre`}),(0,k.jsx)(p,{placeholder:`Pick a genre`,name:`genre`,children:A}),(0,k.jsx)(s,{children:`Shown on the book page`})]})]})}var k,A;function j(){return(j=e((()=>{a(),d(),k=n(),A=(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(m,{value:`a`,children:`Option A`}),(0,k.jsx)(m,{value:`b`,children:`Option B`})]})})))()}var M;function N(){return(N=e((()=>{M=`import { useState } from "react";
import { Select, SelectItem } from "minerva-design";

export default function BasicDemo() {
  const [language, setLanguage] = useState("en");

  return (
    <div style={{ width: 240 }}>
      <Select aria-label="Language" value={language} onChange={setLanguage}>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">Chinese</SelectItem>
        <SelectItem value="fr">French</SelectItem>
      </Select>
    </div>
  );
}
`})))()}var P;function F(){return(F=e((()=>{P=`import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "minerva-design";

export default function GroupsDemo() {
  return (
    <div style={{ width: 240 }}>
      <Select aria-label="Fruit" placeholder="Pick a fruit">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Out of season</SelectLabel>
          <SelectItem value="cherry" disabled>
            Cherry
          </SelectItem>
        </SelectGroup>
      </Select>
    </div>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  SelectItem,
} from "minerva-design";

const items = (
  <>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </>
);

export default function SizesAndStatesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 260 }}>
      <Select aria-label="Small" size="small" placeholder="Small">
        {items}
      </Select>
      <Select aria-label="Large" size="large" placeholder="Large">
        {items}
      </Select>
      <Select aria-label="Invalid" invalid placeholder="Invalid">
        {items}
      </Select>
      <Select aria-label="Disabled" disabled placeholder="Disabled">
        {items}
      </Select>
      <FormControl required>
        <FormLabel>Genre</FormLabel>
        <Select placeholder="Pick a genre" name="genre">
          {items}
        </Select>
        <FormHelperText>Shown on the book page</FormHelperText>
      </FormControl>
    </div>
  );
}
`})))()}var R,z,B;function V(){return(V=e((()=>{w(),D(),j(),N(),F(),L(),t(),i(),v(),b(),l(),R=n(),z=_(Object.assign({"./demos/basic.tsx":x,"./demos/groups.tsx":T,"./demos/sizes-and-states.tsx":O}),Object.assign({"./demos/basic.tsx":M,"./demos/groups.tsx":P,"./demos/sizes-and-states.tsx":I})),B=()=>{let{t:e}=r();return(0,R.jsx)(y,{id:`select`,demos:z,children:(0,R.jsxs)(`section`,{className:u.section,"aria-labelledby":`behavior`,children:[(0,R.jsx)(`h2`,{id:`behavior`,children:e(`docs.select.behavior.title`)}),(0,R.jsxs)(`ul`,{className:u.prose,children:[(0,R.jsx)(`li`,{children:e(`docs.select.behavior.keyboard`)}),(0,R.jsx)(`li`,{children:e(`docs.select.behavior.typeahead`)}),(0,R.jsx)(`li`,{children:e(`docs.select.behavior.positioning`)}),(0,R.jsx)(`li`,{children:e(`docs.select.behavior.forms`)}),(0,R.jsx)(`li`,{children:e(`docs.select.behavior.layers`)})]})]})})}})))()}V();export{B as default};