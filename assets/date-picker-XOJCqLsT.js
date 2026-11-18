import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-BpmzGvUc.js";import{R as ee,z as a}from"./ProgressIndicator-CXNTCbma.js";import{a as o,r as s}from"./FormControl-Ftl_hIhJ.js";import{i as c,r as l}from"./DemoBlock-uYj_xXDS.js";import{n as u,t as d}from"./DatePicker-DJg92Acz.js";import{l as te,n as f,t as p,u as ne}from"./DocPage-Bv-A_aZo.js";function m(){let[e,t]=(0,h.useState)(``);return(0,g.jsxs)(`div`,{style:{maxWidth:280},children:[(0,g.jsx)(u,{onChange:t}),(0,g.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var h,g;function _(){return(_=e((()=>{h=t(),d(),g=n()})))()}function v(){let[e,t]=(0,y.useState)(`2026-04-17`);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,b.jsx)(u,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,b.jsx)(a,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,b.jsx)(a,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,b.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var y,b;function x(){return(x=e((()=>{y=t(),ee(),d(),b=n()})))()}function S(){return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,C.jsx)(u,{defaultValue:`2026-04-17`}),(0,C.jsx)(u,{defaultValue:`2026-04-17`,clearable:!1})]})}var C;function w(){return(w=e((()=>{d(),C=n()})))()}function T(){return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,E.jsx)(u,{defaultValue:`2026-04-17`,disabled:!0}),(0,E.jsx)(u,{defaultValue:`2026-04-17`,readOnly:!0})]})}var E;function D(){return(D=e((()=>{d(),E=n()})))()}function re(){return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,O.jsx)(s,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,O.jsx)(u,{})}),(0,O.jsx)(s,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,O.jsx)(u,{defaultValue:`2026-01-01`})})]})}var O;function k(){return(k=e((()=>{d(),o(),O=n()})))()}function A(){return(0,j.jsx)(`div`,{style:{maxWidth:280},children:(0,j.jsx)(u,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var j;function M(){return(M=e((()=>{d(),j=n()})))()}function N(){return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,P.jsx)(u,{size:`small`,placeholder:`Small`}),(0,P.jsx)(u,{size:`medium`,placeholder:`Medium`}),(0,P.jsx)(u,{size:`large`,placeholder:`Large`})]})}var P;function F(){return(F=e((()=>{d(),P=n()})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import { DatePicker } from "minerva-design";

export default function BasicDemo() {
  const [date, setDate] = useState("");

  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker onChange={setDate} />
      <p>Selected: {date || "none"}</p>
    </div>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Button, DatePicker } from "minerva-design";

export default function ControlledDemo() {
  const [date, setDate] = useState<string | null>("2026-04-17");

  return (
    <div
      style={{ display: "grid", gap: 12, justifyItems: "start", maxWidth: 280 }}
    >
      <DatePicker
        label="Target date"
        value={date}
        onChange={(next) => setDate(next || null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setDate("2026-05-01")}>
          Set to 2026-05-01
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setDate(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {date ?? "null"}</p>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { DatePicker, FormField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <FormField label="Start date" helperText="Format: YYYY-MM-DD" required>
        <DatePicker />
      </FormField>
      <FormField
        label="Deadline"
        errorMessage="Please choose a date in the future."
      >
        <DatePicker defaultValue="2026-01-01" />
      </FormField>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { DatePicker } from "minerva-design";

export default function MinMaxDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue="2026-04-15"
        minDate="2026-04-10"
        maxDate="2026-04-20"
        placeholder="2026-04-10 – 2026-04-20"
      />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{_(),x(),w(),D(),k(),M(),F(),L(),z(),V(),U(),G(),q(),Y(),t(),i(),f(),ne(),c(),X=n(),Z=te(Object.assign({"./demos/basic.tsx":m,"./demos/controlled.tsx":v,"./demos/default-value.tsx":S,"./demos/disabled.tsx":T,"./demos/form-control.tsx":re,"./demos/min-max.tsx":A,"./demos/sizes.tsx":N}),Object.assign({"./demos/basic.tsx":I,"./demos/controlled.tsx":R,"./demos/default-value.tsx":B,"./demos/disabled.tsx":H,"./demos/form-control.tsx":W,"./demos/min-max.tsx":K,"./demos/sizes.tsx":J})),Q=()=>{let{t:e}=r();return(0,X.jsx)(p,{id:`date-picker`,demos:Z,children:(0,X.jsxs)(`section`,{className:l.section,"aria-labelledby":`keyboard`,children:[(0,X.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,X.jsxs)(`ul`,{className:l.prose,children:[(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}$();export{Q as default};