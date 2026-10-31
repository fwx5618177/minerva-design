import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./Switch-BCh7GKwc.js";import{l as ee,n as te,t as a,u as o}from"./DocPage-CHJwIegD.js";import{a as ne,d as re,g as s}from"./fa-BvFqnURM.js";function ie(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{label:`Wi-Fi`,defaultChecked:!0}),(0,c.jsx)(i,{label:`Bluetooth`})]})}var c;function l(){return(l=e((()=>{r(),c=n()})))()}function ae(){let[e,t]=(0,u.useState)(!1);return(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,d.jsx)(i,{"aria-label":`Data source`,offLabel:`Business BFF`,onLabel:`Mock response`,checked:e,onChange:t}),(0,d.jsx)(i,{variant:`segmented`,"aria-label":`Data source`,offLabel:`Business BFF`,onLabel:`Mock response`,checked:e,onChange:t})]})}var u,d;function f(){return(f=e((()=>{u=t(),r(),d=n()})))()}function oe(){return(0,p.jsx)(p.Fragment,{children:m.map(e=>(0,p.jsx)(i,{color:e,label:e,defaultChecked:!0},e))})}var p,m;function h(){return(h=e((()=>{r(),p=n(),m=[`primary`,`success`,`info`,`warning`,`danger`]})))()}function se(){let[e,t]=(0,g.useState)(!1);return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(i,{label:`Email notifications`,checked:e,onChange:e=>t(e)}),(0,_.jsxs)(`span`,{children:[`Notifications are `,e?`on`:`off`]})]})}var g,_;function v(){return(v=e((()=>{g=t(),r(),_=n()})))()}function ce(){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(i,{shape:`square`,label:`Square`,defaultChecked:!0}),(0,y.jsx)(i,{label:`No ripple`,ripple:!1}),(0,y.jsx)(i,{label:`Custom track & thumb`,defaultChecked:!0,trackStyle:{background:`linear-gradient(90deg, #06b6d4, #3b82f6)`},thumbStyle:{boxShadow:`0 0 0 2px #3b82f6`}})]})}var y;function b(){return(b=e((()=>{r(),y=n()})))()}function le(){return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(i,{label:`Dark mode`,icon:(0,x.jsx)(re,{size:10}),defaultChecked:!0}),(0,x.jsx)(i,{label:`Auto-save`,icon:(0,x.jsx)(ne,{size:10})})]})}var x;function S(){return(S=e((()=>{r(),s(),x=n()})))()}function C(){return(0,w.jsx)(w.Fragment,{children:T.map(e=>(0,w.jsx)(i,{label:`Label at ${e}`,labelPlacement:e,defaultChecked:!0},e))})}var w,T;function E(){return(E=e((()=>{r(),w=n(),T=[`start`,`end`,`top`,`bottom`]})))()}function D(){return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(i,{size:`small`,label:`Small`,defaultChecked:!0}),(0,O.jsx)(i,{size:`medium`,label:`Medium`,defaultChecked:!0}),(0,O.jsx)(i,{size:`large`,label:`Large`,defaultChecked:!0})]})}var O;function k(){return(k=e((()=>{r(),O=n()})))()}function ue(){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(i,{label:`Loading`,loading:!0,defaultChecked:!0}),(0,A.jsx)(i,{label:`Disabled`,disabled:!0}),(0,A.jsx)(i,{label:`Disabled (on)`,disabled:!0,defaultChecked:!0})]})}var A;function j(){return(j=e((()=>{r(),A=n()})))()}var M;function N(){return(N=e((()=>{M=`import { Switch } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Switch label="Wi-Fi" defaultChecked />
      <Switch label="Bluetooth" />
    </>
  );
}
`})))()}var P;function F(){return(F=e((()=>{P=`import { useState } from "react";
import { Switch } from "minerva-design";

export default function BilateralAndSegmentedDemo() {
  const [mock, setMock] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Switch
        aria-label="Data source"
        offLabel="Business BFF"
        onLabel="Mock response"
        checked={mock}
        onChange={setMock}
      />
      <Switch
        variant="segmented"
        aria-label="Data source"
        offLabel="Business BFF"
        onLabel="Mock response"
        checked={mock}
        onChange={setMock}
      />
    </div>
  );
}
`})))()}var I;function L(){return(L=e((()=>{I=`import { Switch } from "minerva-design";

const colors = ["primary", "success", "info", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <Switch key={color} color={color} label={color} defaultChecked />
      ))}
    </>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Switch } from "minerva-design";

export default function ControlledDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Switch
        label="Email notifications"
        checked={enabled}
        onChange={(checked) => setEnabled(checked)}
      />
      <span>Notifications are {enabled ? "on" : "off"}</span>
    </>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { Switch } from "minerva-design";

export default function CustomStyleDemo() {
  return (
    <>
      <Switch shape="square" label="Square" defaultChecked />
      <Switch label="No ripple" ripple={false} />
      <Switch
        label="Custom track & thumb"
        defaultChecked
        trackStyle={{ background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }}
        thumbStyle={{ boxShadow: "0 0 0 2px #3b82f6" }}
      />
    </>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Switch } from "minerva-design";
import { FaCheck, FaMoon } from "react-icons/fa";

export default function IconsDemo() {
  return (
    <>
      <Switch label="Dark mode" icon={<FaMoon size={10} />} defaultChecked />
      <Switch label="Auto-save" icon={<FaCheck size={10} />} />
    </>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { Switch } from "minerva-design";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <>
      {placements.map((placement) => (
        <Switch
          key={placement}
          label={\`Label at \${placement}\`}
          labelPlacement={placement}
          defaultChecked
        />
      ))}
    </>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Switch } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Switch size="small" label="Small" defaultChecked />
      <Switch size="medium" label="Medium" defaultChecked />
      <Switch size="large" label="Large" defaultChecked />
    </>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { Switch } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <Switch label="Loading" loading defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled (on)" disabled defaultChecked />
    </>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{l(),f(),h(),v(),b(),S(),E(),k(),j(),N(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),te(),o(),X=n(),Z=ee(Object.assign({"./demos/basic.tsx":ie,"./demos/bilateral-and-segmented.tsx":ae,"./demos/colors.tsx":oe,"./demos/controlled.tsx":se,"./demos/custom-style.tsx":ce,"./demos/icons.tsx":le,"./demos/label-placement.tsx":C,"./demos/sizes.tsx":D,"./demos/states.tsx":ue}),Object.assign({"./demos/basic.tsx":M,"./demos/bilateral-and-segmented.tsx":P,"./demos/colors.tsx":I,"./demos/controlled.tsx":R,"./demos/custom-style.tsx":B,"./demos/icons.tsx":H,"./demos/label-placement.tsx":W,"./demos/sizes.tsx":K,"./demos/states.tsx":J})),Q=()=>(0,X.jsx)(a,{id:`switch`,demos:Z})})))()}$();export{Q as default};