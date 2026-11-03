import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,Dt as ee,G as te,In as ne,K as re,Mn as i,Nt as ie,Rt as ae,ct as oe,gt as se,kt as ce,rt as a,ut as o,zn as le}from"./angular-preview-B7Uzpk8P.js";import{B as ue,V as s}from"./ProgressIndicator-CLQ5GhV8.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{i as de,n as l,t as fe}from"./context-ESLv39g4.js";import{$ as pe,St as me,xt as he}from"./io5-BsjRfO9T.js";import{t as ge}from"./dataAttributes-CDHeJa9q.js";import{n as _e,t as u}from"./slider.module.scss-B_WXpAXe.js";import{a as d,n as ve,o as ye,t as f}from"./FormControl-CQnw3MB7.js";import{l as p,n as be,t as xe,u as m}from"./DocPage-BhzHP-B1.js";var h,g,Se,_;function v(){return(v=e((()=>{i(),s(),me(),l(),pe(),_e(),h=t(),g=n(),Se=e=>String(e),_=({value:e,defaultValue:t,range:n=!1,min:i=0,max:s=100,step:l=1,marks:pe,snapToMarks:me=!1,onChange:_e,onChangeEnd:d,disabled:ve,readOnly:ye,size:f=`medium`,color:p=`primary`,showValue:be=!1,tooltip:xe=!1,formatValue:m=Se,orientation:_=`horizontal`,name:v,"aria-label":y,"aria-labelledby":b,"aria-describedby":x,getAriaValueText:S,className:Ce,style:C,ref:w,...T})=>{let{t:we}=ue(),E=de(),D=fe({id:void 0,"aria-describedby":x}),O=ve??E?.disabled??!1,k=ye??E?.readOnly??!1,A=O||k,j=_===`vertical`,M=oe(pe,i,s,l),N={min:i,max:s,step:l,marks:M,snapToMarks:me},[P,F]=he({value:e,defaultValue:t,name:`Slider`}),I=ce(P,n,N),L=ie(I),R=(0,h.useRef)(null),z=(0,h.useRef)([]),B=(0,h.useRef)(I);(0,h.useLayoutEffect)(()=>{B.current=I});let[V,H]=(0,h.useState)(null),U=e=>!r(e,B.current)&&(B.current=e,F(e),_e?.(e),!0),W=e=>{let t=R.current.getBoundingClientRect(),n;return j?n=t.height?(t.bottom-e.clientY)/t.height:0:(n=t.width?(e.clientX-t.left)/t.width:0,re(R.current)===`rtl`&&(n=1-n)),ne(n,N)},G=e=>{if(A||e.button!==0)return;e.preventDefault();let t=W(e),n=e.target.closest(`[data-index]`)?.dataset.index,r=n===void 0?se(B.current,t):Number(n);e.currentTarget.setPointerCapture?.(e.pointerId),H(r),z.current[r]?.focus(),n===void 0&&U(o(B.current,r,t))},K=e=>{V!==null&&U(o(B.current,V,W(e)))},q=e=>{V!==null&&(e.currentTarget.hasPointerCapture?.(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),H(null),d?.(B.current))},J=(e,t)=>{if(A)return;let n=j?e.key:te(e.key,e.currentTarget),r=ee(n,L[t],N);r!==null&&(e.preventDefault(),U(o(B.current,t,r))&&d?.(B.current))},Y=e=>{if(!n)return y;let t=we(e===0?`slider.minimum`:`slider.maximum`);return y?`${y} ${t}`:t},Te=b??(E&&!y?E.labelId:void 0),X=e=>le(e,i,s),Z=n?X(L[0]):0,Q=X(L[L.length-1]),$=e=>j?{bottom:`${e}%`}:{insetInlineStart:`${e}%`},Ee=j?{bottom:`${Z}%`,height:`${Q-Z}%`}:{insetInlineStart:`${Z}%`,width:`${Q-Z}%`},De=M.some(e=>e.label),Oe=L.map(m).join(` – `);return(0,g.jsxs)(`div`,{...ge(T),ref:w,className:a(u.slider,u[f],u[p],j&&u.vertical,De&&u.labelled,O&&u.disabled,k&&u.readOnly,V!==null&&u.dragging,Ce),style:C,...c(`slider`,`root`,{disabled:O,readonly:k,invalid:!!E?.invalid,dragging:V!==null,size:f,color:p,orientation:_,variant:n?`range`:`single`}),children:[(0,g.jsxs)(`div`,{ref:R,className:u.control,onPointerDown:G,onPointerMove:K,onPointerUp:q,onPointerCancel:q,...c(`slider`,`control`),children:[(0,g.jsx)(`span`,{className:u.rail,...c(`slider`,`rail`)}),(0,g.jsx)(`span`,{className:u.range,style:Ee,...c(`slider`,`range`)}),M.map(e=>{let t=ae(e.value,I);return(0,g.jsx)(`span`,{className:a(u.mark,t&&u.markActive),style:$(X(e.value)),"aria-hidden":!0,...c(`slider`,`mark`,{state:t?`active`:`inactive`}),children:e.label&&(0,g.jsx)(`span`,{className:a(u.markLabel,e.value<=i&&u.markLabelStart,e.value>=s&&u.markLabelEnd),...c(`slider`,`mark-label`),children:e.label})},e.value)}),L.map((e,t)=>{let r=V===t;return(0,g.jsx)(`span`,{ref:e=>{z.current[t]=e},"data-index":t,role:`slider`,tabIndex:O?-1:0,id:t===0?D.id:void 0,className:a(u.thumb,r&&u.thumbDragging),style:$(X(e)),"aria-label":Y(t),"aria-labelledby":Te,"aria-describedby":D[`aria-describedby`],"aria-valuemin":n&&t===1?L[0]:i,"aria-valuemax":n&&t===0?L[1]:s,"aria-valuenow":e,"aria-valuetext":S?S(e,t):m(e),"aria-orientation":_,"aria-disabled":O||void 0,"aria-readonly":k||void 0,"aria-invalid":D[`aria-invalid`],onKeyDown:e=>J(e,t),...c(`slider`,`thumb`,{dragging:r,disabled:O}),children:xe&&(0,g.jsx)(`span`,{className:u.tooltip,"aria-hidden":!0,...c(`slider`,`tooltip`),children:m(e)})},t)})]}),be&&(0,g.jsx)(`span`,{className:u.value,"aria-hidden":!0,...c(`slider`,`value`),children:Oe}),v&&L.map((e,t)=>(0,g.jsx)(`input`,{type:`hidden`,name:v,value:e,disabled:O,...c(`slider`,`input`)},t))]})}})))()}function y(){let[e,t]=(0,b.useState)(40);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,x.jsx)(_,{"aria-label":`Volume`,value:e,onChange:t,showValue:!0,tooltip:!0}),(0,x.jsx)(_,{"aria-label":`Opacity`,defaultValue:.6,min:0,max:1,step:.05,showValue:!0})]})}var b,x;function S(){return(S=e((()=>{b=t(),v(),x=n()})))()}function Ce(){let[e,t]=(0,C.useState)(50),[n,r]=(0,C.useState)(50),[ee,te]=(0,C.useState)(0);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,w.jsx)(_,{"aria-label":`Brightness`,value:e,onChange:t,onChangeEnd:e=>{r(e),te(e=>e+1)}}),(0,w.jsxs)(`p`,{style:{margin:0},children:[`While dragging: `,String(e),` · Saved on release: `,String(n),` (`,ee,` saves)`]})]})}var C,w;function T(){return(T=e((()=>{C=t(),v(),w=n()})))()}function we(){return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,E.jsx)(_,{"aria-label":`Disabled`,defaultValue:40,disabled:!0}),(0,E.jsx)(_,{"aria-label":`Read only`,defaultValue:60,readOnly:!0,showValue:!0}),(0,E.jsxs)(f,{invalid:!0,children:[(0,E.jsx)(ve,{children:`Daily goal (minutes)`}),(0,E.jsx)(_,{defaultValue:5,max:120,step:5,showValue:!0}),(0,E.jsx)(ye,{children:`Pick at least 10 minutes.`})]})]})}var E;function D(){return(D=e((()=>{d(),v(),E=n()})))()}function O(){return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:32,width:`100%`,maxWidth:420},children:[(0,k.jsx)(_,{"aria-label":`Rating`,defaultValue:6,max:10,marks:!0,showValue:!0}),(0,k.jsx)(_,{"aria-label":`Fan speed`,defaultValue:50,step:null,marks:A,getAriaValueText:e=>A.find(t=>t.value===e)?.label??String(e)})]})}var k,A;function j(){return(j=e((()=>{v(),k=n(),A=[{value:0,label:`Off`},{value:25,label:`Low`},{value:50,label:`Medium`},{value:75,label:`High`},{value:100,label:`Max`}]})))()}function M(){let[e,t]=(0,N.useState)([20,80]),[n,r]=e;return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,P.jsx)(_,{"aria-label":`Price`,range:!0,value:e,onChange:t,step:5,formatValue:e=>`$${e}`,tooltip:!0,name:`price`}),(0,P.jsxs)(`p`,{style:{margin:0},children:[`From $`,n,` to $`,r]})]})}var N,P;function F(){return(F=e((()=>{N=t(),v(),P=n()})))()}function I(){return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,L.jsx)(_,{"aria-label":`Small`,size:`small`,defaultValue:30}),(0,L.jsx)(_,{"aria-label":`Medium`,size:`medium`,defaultValue:50}),(0,L.jsx)(_,{"aria-label":`Large`,size:`large`,defaultValue:70}),R.map((e,t)=>(0,L.jsx)(_,{"aria-label":e,color:e,defaultValue:20+t*15},e))]})}var L,R;function z(){return(z=e((()=>{v(),L=n(),R=[`primary`,`success`,`info`,`warning`,`danger`]})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
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
`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
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
`})))()}var W;function G(){return(G=e((()=>{W=`import { FormControl, FormHelperText, FormLabel, Slider } from "minerva-design";

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
`})))()}var K;function q(){return(q=e((()=>{K=`import { Slider } from "minerva-design";

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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
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
`})))()}var Te;function X(){return(X=e((()=>{Te=`import { Slider } from "minerva-design";

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
`})))()}var Z,Q,$;function Ee(){return(Ee=e((()=>{S(),T(),D(),j(),F(),z(),V(),U(),G(),q(),Y(),X(),t(),be(),m(),Z=n(),Q=p(Object.assign({"./demos/basic.tsx":y,"./demos/committed.tsx":Ce,"./demos/disabled.tsx":we,"./demos/marks.tsx":O,"./demos/range.tsx":M,"./demos/sizes-colors.tsx":I}),Object.assign({"./demos/basic.tsx":B,"./demos/committed.tsx":H,"./demos/disabled.tsx":W,"./demos/marks.tsx":K,"./demos/range.tsx":J,"./demos/sizes-colors.tsx":Te})),$=()=>(0,Z.jsx)(xe,{id:`slider`,demos:Q})})))()}Ee();export{$ as default};