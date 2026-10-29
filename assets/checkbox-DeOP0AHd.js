import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{H as r,b as i}from"./io5-CsJcK0E2.js";import{n as a,t as o}from"./Checkbox-BUFXJlPP.js";import{a as ee,i as te,n as ne,t as re}from"./FormControl-BkwPT394.js";import{l as s,n as ie,t as ae,u as oe}from"./DocPage-PfpTBKws.js";function se(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o,{label:`Remember me`}),(0,c.jsx)(o,{label:`Checked by default`,defaultChecked:!0})]})}var c;function l(){return(l=e((()=>{a(),c=n()})))()}function ce(){return(0,u.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,u.jsx)(o,{defaultChecked:!0,children:`Primary`}),(0,u.jsx)(o,{color:`success`,defaultChecked:!0,children:`Success`}),(0,u.jsx)(o,{color:`info`,defaultChecked:!0,children:`Info`}),(0,u.jsx)(o,{color:`warning`,defaultChecked:!0,children:`Warning`}),(0,u.jsx)(o,{color:`danger`,defaultChecked:!0,children:`Danger`})]}),(0,u.jsxs)(re,{invalid:!0,required:!0,children:[(0,u.jsx)(ne,{children:`Terms`}),(0,u.jsx)(o,{children:`I accept the terms`}),(0,u.jsx)(te,{children:`You must accept the terms`})]})]})}var u;function d(){return(d=e((()=>{a(),ee(),u=n()})))()}function le(){let[e,t]=(0,f.useState)(!0);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{label:`Subscribe to the newsletter`,checked:e,onChange:t}),(0,p.jsx)(`span`,{children:e?`Subscribed`:`Not subscribed`})]})}var f,p;function m(){return(m=e((()=>{f=t(),a(),p=n()})))()}function ue(){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(`span`,{style:g,children:(0,h.jsx)(o,{label:`Custom colors`,defaultChecked:!0})}),(0,h.jsx)(o,{label:`Custom icon`,defaultChecked:!0,icon:(0,h.jsx)(i,{color:`#e11d48`})})]})}var h,g;function _(){return(_=e((()=>{a(),r(),h=n(),g={"--checkbox-checked-color":`#7c3aed`,"--checkbox-checkmark-color":`#fde68a`,"--checkbox-border-color":`#7c3aed`}})))()}function de(){let[e,t]=(0,v.useState)(!1);return(0,y.jsx)(o,{label:`I accept the terms and conditions`,checked:e,onChange:t,error:!e,helperText:e?`Thanks!`:`You must accept the terms to continue`})}var v,y;function b(){return(b=e((()=>{v=t(),a(),y=n()})))()}function fe(){let[e,t]=(0,x.useState)([`Apple`]),n=e.length===C.length,r=e.length>0&&!n,i=(e,n)=>t(t=>n?[...t,e]:t.filter(t=>t!==e));return(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,S.jsx)(o,{label:`Select all`,checked:n,indeterminate:r,onChange:e=>t(e?C:[])}),(0,S.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,paddingLeft:24},children:C.map(t=>(0,S.jsx)(o,{label:t,checked:e.includes(t),onChange:e=>i(t,e)},t))})]})}var x,S,C;function w(){return(w=e((()=>{x=t(),a(),S=n(),C=[`Apple`,`Banana`,`Cherry`]})))()}function pe(){return(0,T.jsx)(T.Fragment,{children:E.map(e=>(0,T.jsx)(o,{label:e,labelPlacement:e},e))})}var T,E;function D(){return(D=e((()=>{a(),T=n(),E=[`start`,`end`,`top`,`bottom`]})))()}function me(){return(0,O.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,O.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,O.jsx)(o,{label:`Small`,size:`small`,defaultChecked:!0}),(0,O.jsx)(o,{label:`Medium`,size:`medium`,defaultChecked:!0}),(0,O.jsx)(o,{label:`Large`,size:`large`,defaultChecked:!0})]}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:24,alignItems:`center`},children:[(0,O.jsx)(o,{label:`Square`,shape:`square`,defaultChecked:!0}),(0,O.jsx)(o,{label:`Rounded`,shape:`rounded`,defaultChecked:!0}),(0,O.jsx)(o,{label:`Circle`,shape:`circle`,defaultChecked:!0})]})]})}var O;function k(){return(k=e((()=>{a(),O=n()})))()}function he(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(o,{label:`Disabled`,disabled:!0}),(0,A.jsx)(o,{label:`Disabled and checked`,disabled:!0,defaultChecked:!0}),(0,A.jsx)(o,{label:`Required`,name:`terms`,required:!0})]})}var A;function j(){return(j=e((()=>{a(),A=n()})))()}var M;function N(){return(N=e((()=>{M=`import { Checkbox } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Checkbox label="Remember me" />
      <Checkbox label="Checked by default" defaultChecked />
    </>
  );
}
`})))()}var P;function F(){return(F=e((()=>{P=`import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "minerva-design";

export default function ColorsAndFormControlDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Checkbox defaultChecked>Primary</Checkbox>
        <Checkbox color="success" defaultChecked>
          Success
        </Checkbox>
        <Checkbox color="info" defaultChecked>
          Info
        </Checkbox>
        <Checkbox color="warning" defaultChecked>
          Warning
        </Checkbox>
        <Checkbox color="danger" defaultChecked>
          Danger
        </Checkbox>
      </div>
      <FormControl invalid required>
        <FormLabel>Terms</FormLabel>
        <Checkbox>I accept the terms</Checkbox>
        <FormErrorMessage>You must accept the terms</FormErrorMessage>
      </FormControl>
    </div>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import { Checkbox } from "minerva-design";

export default function ControlledDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Checkbox
        label="Subscribe to the newsletter"
        checked={checked}
        onChange={setChecked}
      />
      <span>{checked ? "Subscribed" : "Not subscribed"}</span>
    </>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import type { CSSProperties } from "react";
import { Checkbox } from "minerva-design";
import { IoHeart } from "react-icons/io5";

// The --checkbox-* custom properties recolor the box; set them on className
// or on any ancestor (here an inline style on the wrapper).
const violet = {
  "--checkbox-checked-color": "#7c3aed",
  "--checkbox-checkmark-color": "#fde68a",
  "--checkbox-border-color": "#7c3aed",
} as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <>
      <span style={violet}>
        <Checkbox label="Custom colors" defaultChecked />
      </span>
      <Checkbox
        label="Custom icon"
        defaultChecked
        icon={<IoHeart color="#e11d48" />}
      />
    </>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { Checkbox } from "minerva-design";

export default function ErrorDemo() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={setAccepted}
      error={!accepted}
      helperText={
        accepted ? "Thanks!" : "You must accept the terms to continue"
      }
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import { Checkbox } from "minerva-design";

const fruits = ["Apple", "Banana", "Cherry"];

export default function IndeterminateDemo() {
  const [selected, setSelected] = useState<string[]>(["Apple"]);
  const allChecked = selected.length === fruits.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (fruit: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, fruit] : prev.filter((f) => f !== fruit),
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(checked) => setSelected(checked ? fruits : [])}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          paddingLeft: 24,
        }}
      >
        {fruits.map((fruit) => (
          <Checkbox
            key={fruit}
            label={fruit}
            checked={selected.includes(fruit)}
            onChange={(checked) => toggle(fruit, checked)}
          />
        ))}
      </div>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Checkbox } from "minerva-design";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <>
      {placements.map((placement) => (
        <Checkbox
          key={placement}
          label={placement}
          labelPlacement={placement}
        />
      ))}
    </>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Checkbox } from "minerva-design";

export default function SizesAndShapesDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Checkbox label="Small" size="small" defaultChecked />
        <Checkbox label="Medium" size="medium" defaultChecked />
        <Checkbox label="Large" size="large" defaultChecked />
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Checkbox label="Square" shape="square" defaultChecked />
        <Checkbox label="Rounded" shape="rounded" defaultChecked />
        <Checkbox label="Circle" shape="circle" defaultChecked />
      </div>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Checkbox } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" disabled defaultChecked />
      <Checkbox label="Required" name="terms" required />
    </>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{l(),d(),m(),_(),b(),w(),D(),k(),j(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),ie(),oe(),X=n(),Z=s(Object.assign({"./demos/basic.tsx":se,"./demos/colors-and-form-control.tsx":ce,"./demos/controlled.tsx":le,"./demos/custom-style.tsx":ue,"./demos/error.tsx":de,"./demos/indeterminate.tsx":fe,"./demos/label-placement.tsx":pe,"./demos/sizes-and-shapes.tsx":me,"./demos/states.tsx":he}),Object.assign({"./demos/basic.tsx":M,"./demos/colors-and-form-control.tsx":P,"./demos/controlled.tsx":I,"./demos/custom-style.tsx":R,"./demos/error.tsx":B,"./demos/indeterminate.tsx":H,"./demos/label-placement.tsx":W,"./demos/sizes-and-shapes.tsx":K,"./demos/states.tsx":J})),Q=()=>(0,X.jsx)(ae,{id:`checkbox`,demos:Z})})))()}$();export{Q as default};