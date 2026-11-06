import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./Slider-ChO8afiA.js";import{a,n as o,o as s,t as c}from"./FormControl-CQnw3MB7.js";import{l,n as u,t as d,u as f}from"./DocPage-D44lbP9L.js";function p(){let[e,t]=(0,m.useState)(40);return(0,h.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,h.jsx)(i,{"aria-label":`Volume`,value:e,onChange:t,showValue:!0,tooltip:!0}),(0,h.jsx)(i,{"aria-label":`Opacity`,defaultValue:.6,min:0,max:1,step:.05,showValue:!0})]})}var m,h;function g(){return(g=e((()=>{m=t(),r(),h=n()})))()}function _(){let[e,t]=(0,v.useState)(50),[n,r]=(0,v.useState)(50),[a,o]=(0,v.useState)(0);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,y.jsx)(i,{"aria-label":`Brightness`,value:e,onChange:t,onChangeEnd:e=>{r(e),o(e=>e+1)}}),(0,y.jsxs)(`p`,{style:{margin:0},children:[`While dragging: `,String(e),` · Saved on release: `,String(n),` (`,a,` saves)`]})]})}var v,y;function b(){return(b=e((()=>{v=t(),r(),y=n()})))()}function x(){return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,S.jsx)(i,{"aria-label":`Disabled`,defaultValue:40,disabled:!0}),(0,S.jsx)(i,{"aria-label":`Read only`,defaultValue:60,readOnly:!0,showValue:!0}),(0,S.jsxs)(c,{invalid:!0,children:[(0,S.jsx)(o,{children:`Daily goal (minutes)`}),(0,S.jsx)(i,{defaultValue:5,max:120,step:5,showValue:!0}),(0,S.jsx)(s,{children:`Pick at least 10 minutes.`})]})]})}var S;function C(){return(C=e((()=>{a(),r(),S=n()})))()}function w(){return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:32,width:`100%`,maxWidth:420},children:[(0,T.jsx)(i,{"aria-label":`Rating`,defaultValue:6,max:10,marks:!0,showValue:!0}),(0,T.jsx)(i,{"aria-label":`Fan speed`,defaultValue:50,step:null,marks:E,getAriaValueText:e=>E.find(t=>t.value===e)?.label??String(e)})]})}var T,E;function D(){return(D=e((()=>{r(),T=n(),E=[{value:0,label:`Off`},{value:25,label:`Low`},{value:50,label:`Medium`},{value:75,label:`High`},{value:100,label:`Max`}]})))()}function O(){let[e,t]=(0,k.useState)([20,80]),[n,r]=e;return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,A.jsx)(i,{"aria-label":`Price`,range:!0,value:e,onChange:t,step:5,formatValue:e=>`$${e}`,tooltip:!0,name:`price`}),(0,A.jsxs)(`p`,{style:{margin:0},children:[`From $`,n,` to $`,r]})]})}var k,A;function j(){return(j=e((()=>{k=t(),r(),A=n()})))()}function M(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,N.jsx)(i,{"aria-label":`Small`,size:`small`,defaultValue:30}),(0,N.jsx)(i,{"aria-label":`Medium`,size:`medium`,defaultValue:50}),(0,N.jsx)(i,{"aria-label":`Large`,size:`large`,defaultValue:70}),P.map((e,t)=>(0,N.jsx)(i,{"aria-label":e,color:e,defaultValue:20+t*15},e))]})}var N,P;function F(){return(F=e((()=>{r(),N=n(),P=[`primary`,`success`,`info`,`warning`,`danger`]})))()}var I;function L(){return(L=e((()=>{I=`import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function BasicDemo() {
  const [volume, setVolume] = useState<SliderValue>(40);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Volume"
        value={volume}
        onChange={setVolume}
        showValue
        tooltip
      />
      <Slider
        aria-label="Opacity"
        defaultValue={0.6}
        min={0}
        max={1}
        step={0.05}
        showValue
      />
    </div>
  );
}
`})))()}var R;function z(){return(z=e((()=>{R=`import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function CommittedDemo() {
  const [live, setLive] = useState<SliderValue>(50);
  const [saved, setSaved] = useState<SliderValue>(50);
  const [saves, setSaves] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Brightness"
        value={live}
        onChange={setLive}
        onChangeEnd={(value) => {
          setSaved(value);
          setSaves((n) => n + 1);
        }}
      />
      <p style={{ margin: 0 }}>
        While dragging: {String(live)} · Saved on release: {String(saved)} (
        {saves} saves)
      </p>
    </div>
  );
}
`})))()}var B;function V(){return(V=e((()=>{B=`import { FormControl, FormHelperText, FormLabel, Slider } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Disabled" defaultValue={40} disabled />
      <Slider aria-label="Read only" defaultValue={60} readOnly showValue />
      <FormControl invalid>
        <FormLabel>Daily goal (minutes)</FormLabel>
        <Slider defaultValue={5} max={120} step={5} showValue />
        <FormHelperText>Pick at least 10 minutes.</FormHelperText>
      </FormControl>
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { Slider } from "minerva-design";

const levels = [
  { value: 0, label: "Off" },
  { value: 25, label: "Low" },
  { value: 50, label: "Medium" },
  { value: 75, label: "High" },
  { value: 100, label: "Max" },
];

export default function MarksDemo() {
  return (
    <div style={{ display: "grid", gap: 32, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Rating" defaultValue={6} max={10} marks showValue />
      <Slider
        aria-label="Fan speed"
        defaultValue={50}
        step={null}
        marks={levels}
        getAriaValueText={(v) =>
          levels.find((level) => level.value === v)?.label ?? String(v)
        }
      />
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function RangeDemo() {
  const [price, setPrice] = useState<SliderValue>([20, 80]);
  const [low, high] = price as [number, number];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Price"
        range
        value={price}
        onChange={setPrice}
        step={5}
        formatValue={(v) => \`$\${v}\`}
        tooltip
        name="price"
      />
      <p style={{ margin: 0 }}>
        From \${low} to \${high}
      </p>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { Slider } from "minerva-design";

const colors = ["primary", "success", "info", "warning", "danger"] as const;

export default function SizesColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Small" size="small" defaultValue={30} />
      <Slider aria-label="Medium" size="medium" defaultValue={50} />
      <Slider aria-label="Large" size="large" defaultValue={70} />
      {colors.map((color, index) => (
        <Slider
          key={color}
          aria-label={color}
          color={color}
          defaultValue={20 + index * 15}
        />
      ))}
    </div>
  );
}
`})))()}var J,Y,X;function Z(){return(Z=e((()=>{g(),b(),C(),D(),j(),F(),L(),z(),V(),U(),G(),q(),t(),u(),f(),J=n(),Y=l(Object.assign({"./demos/basic.tsx":p,"./demos/committed.tsx":_,"./demos/disabled.tsx":x,"./demos/marks.tsx":w,"./demos/range.tsx":O,"./demos/sizes-colors.tsx":M}),Object.assign({"./demos/basic.tsx":I,"./demos/committed.tsx":R,"./demos/disabled.tsx":B,"./demos/marks.tsx":H,"./demos/range.tsx":W,"./demos/sizes-colors.tsx":K})),X=()=>(0,J.jsx)(d,{id:`slider`,demos:Y})})))()}Z();export{X as default};