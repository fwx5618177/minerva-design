import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{i as r,n as i,r as a,t as o}from"./Radio-DKdkHhxv.js";import{l as s,n as c,t as l,u}from"./DocPage-DmpxYJhU.js";import{o as d,r as f}from"./shapes-BpdzBut9.js";function p(){let[e,t]=(0,m.useState)(`descending`);return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,h.jsxs)(r,{"aria-label":`Sort order`,direction:`horizontal`,value:e,onChange:e=>t(e),children:[(0,h.jsx)(o,{value:`descending`,label:`Descending`}),(0,h.jsx)(o,{value:`ascending`,label:`Ascending`}),(0,h.jsx)(o,{value:`none`,label:`Data order`})]}),(0,h.jsx)(d,{data:g,shape:`bar`,sort:e,conversion:!1,gap:6,legend:!1,height:300,ariaLabel:`Weekly active users per feature`})]})}var m,h,g;function _(){return(_=e((()=>{m=t(),i(),a(),f(),h=n(),g=[{name:`Alerts`,value:3900},{name:`Dashboards`,value:8400},{name:`Integrations`,value:1600},{name:`Reports`,value:5200},{name:`Public API`,value:2100}]})))()}function v({event:e}){let t=e.index>0?x[e.index-1]:null;return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,b.jsx)(`strong`,{children:e.name}),(0,b.jsxs)(`span`,{children:[S(e.value),` users`]}),(0,b.jsxs)(`span`,{children:[C(e.percent),` of the visitors`]}),t&&(0,b.jsxs)(`span`,{children:[S(t.value-e.value),` dropped since “`,t.name,`”`]})]})}function y(){return(0,b.jsx)(d,{data:x,format:S,renderTooltip:e=>(0,b.jsx)(v,{event:e}),height:360,ariaLabel:`Sign-up funnel`})}var b,x,S,C;function w(){return(w=e((()=>{f(),b=n(),x=[{name:`Pricing page`,value:24e3},{name:`Started sign-up`,value:9600},{name:`Verified email`,value:6850},{name:`Created project`,value:4100},{name:`Invited teammate`,value:1720},{name:`Upgraded to paid`,value:640}],S=e=>e.toLocaleString(`en-US`),C=e=>`${(e*100).toFixed(1)}%`})))()}var T;function E(){return(E=e((()=>{T=`import { useState } from "react";
import { Radio, RadioGroup } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

type Sort = "descending" | "ascending" | "none";

// Weekly active users of each feature (not a sequential process)
const features: ShapeDatum[] = [
  { name: "Alerts", value: 3900 },
  { name: "Dashboards", value: 8400 },
  { name: "Integrations", value: 1600 },
  { name: "Reports", value: 5200 },
  { name: "Public API", value: 2100 },
];

export default function BarsDemo() {
  const [sort, setSort] = useState<Sort>("descending");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label="Sort order"
        direction="horizontal"
        value={sort}
        onChange={(value) => setSort(value as Sort)}
      >
        <Radio value="descending" label="Descending" />
        <Radio value="ascending" label="Ascending" />
        <Radio value="none" label="Data order" />
      </RadioGroup>
      <FunnelChart
        data={features}
        shape="bar"
        sort={sort}
        conversion={false}
        gap={6}
        legend={false}
        height={300}
        ariaLabel="Weekly active users per feature"
      />
    </div>
  );
}
`})))()}var D;function O(){return(O=e((()=>{D=`import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Sign-up funnel of a SaaS product over one month
const stages: ShapeDatum[] = [
  { name: "Pricing page", value: 24000 },
  { name: "Started sign-up", value: 9600 },
  { name: "Verified email", value: 6850 },
  { name: "Created project", value: 4100 },
  { name: "Invited teammate", value: 1720 },
  { name: "Upgraded to paid", value: 640 },
];

const format = (value: number) => value.toLocaleString("en-US");
const pct = (ratio: number) => \`\${(ratio * 100).toFixed(1)}%\`;

// The data is not sorted by the chart (sort="none"), so the event index
// is also the index in \`stages\`
function StageTooltip({ event }: { event: ShapeHoverEvent }) {
  const previous = event.index > 0 ? stages[event.index - 1] : null;
  return (
    <div style={{ display: "grid", gap: 2 }}>
      <strong>{event.name}</strong>
      <span>{format(event.value)} users</span>
      <span>{pct(event.percent)} of the visitors</span>
      {previous && (
        <span>
          {format(previous.value - event.value)} dropped since “{previous.name}”
        </span>
      )}
    </div>
  );
}

export default function BasicDemo() {
  return (
    <FunnelChart
      data={stages}
      format={format}
      renderTooltip={(event) => <StageTooltip event={event} />}
      height={360}
      ariaLabel="Sign-up funnel"
    />
  );
}
`})))()}var k,A,j;function M(){return(M=e((()=>{_(),w(),E(),O(),t(),c(),u(),k=n(),A=s(Object.assign({"./demos/bars.tsx":p,"./demos/basic.tsx":y}),Object.assign({"./demos/bars.tsx":T,"./demos/basic.tsx":D})),j=()=>(0,k.jsx)(l,{id:`funnel-chart`,demos:A})})))()}M();export{j as default};