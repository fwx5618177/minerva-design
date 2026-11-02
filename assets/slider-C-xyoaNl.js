import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{$n as r,It as ee,L as te,Ot as ne,Pt as re,X as i,bt as ie,dt as ae,it as oe,lt as se,mn as a,o as ce,st as o,vt as le}from"./angular-preview-DXAccp5O.js";import{B as ue,V as s}from"./ProgressIndicator-DMdtmsv7.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{i as de,n as l,t as fe}from"./context-ESLv39g4.js";import{$ as pe,St as me,xt as he}from"./io5-nkQQnVMp.js";import{t as ge}from"./dataAttributes-CDHeJa9q.js";import{n as _e,t as u}from"./slider.module.scss-B_WXpAXe.js";import{a as d,n as ve,o as ye,t as f}from"./FormControl-CdgmUsAy.js";import{l as p,n as be,t as xe,u as m}from"./DocPage-tb4CAOXP.js";var h,g,Se,_;function v(){return(v=e((()=>{a(),s(),me(),l(),pe(),_e(),h=t(),g=n(),Se=e=>String(e),_=({value:e,defaultValue:t,range:n=!1,min:a=0,max:s=100,step:l=1,marks:pe,snapToMarks:me=!1,onChange:_e,onChangeEnd:d,disabled:ve,readOnly:ye,size:f=`medium`,color:p=`primary`,showValue:be=!1,tooltip:xe=!1,formatValue:m=Se,orientation:_=`horizontal`,name:v,"aria-label":y,"aria-labelledby":Ce,"aria-describedby":b,getAriaValueText:x,className:we,style:S,ref:C,...w})=>{let{t:Te}=ue(),T=de(),E=fe({id:void 0,"aria-describedby":b}),D=ve??T?.disabled??!1,O=ye??T?.readOnly??!1,k=D||O,A=_===`vertical`,j=ie(pe,a,s,l),M={min:a,max:s,step:l,marks:j,snapToMarks:me},[N,P]=he({value:e,defaultValue:t,name:`Slider`}),F=ne(N,n,M),I=r(F),L=(0,h.useRef)(null),R=(0,h.useRef)([]),z=(0,h.useRef)(F);(0,h.useLayoutEffect)(()=>{z.current=F});let[B,V]=(0,h.useState)(null),H=e=>!se(e,z.current)&&(z.current=e,P(e),_e?.(e),!0),U=e=>{let t=L.current.getBoundingClientRect(),n;return A?n=t.height?(t.bottom-e.clientY)/t.height:0:(n=t.width?(e.clientX-t.left)/t.width:0,ce(L.current)===`rtl`&&(n=1-n)),ae(n,M)},W=e=>{if(k||e.button!==0)return;e.preventDefault();let t=U(e),n=e.target.closest(`[data-index]`)?.dataset.index,r=n===void 0?ee(z.current,t):Number(n);e.currentTarget.setPointerCapture?.(e.pointerId),V(r),R.current[r]?.focus(),n===void 0&&H(i(z.current,r,t))},G=e=>{B!==null&&H(i(z.current,B,U(e)))},K=e=>{B!==null&&(e.currentTarget.hasPointerCapture?.(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),V(null),d?.(z.current))},q=(e,t)=>{if(k)return;let n=A?e.key:te(e.key,e.currentTarget),r=le(n,I[t],M);r!==null&&(e.preventDefault(),H(i(z.current,t,r))&&d?.(z.current))},J=e=>{if(!n)return y;let t=Te(e===0?`slider.minimum`:`slider.maximum`);return y?`${y} ${t}`:t},Ee=Ce??(T&&!y?T.labelId:void 0),Y=e=>oe(e,a,s),X=n?Y(I[0]):0,Z=Y(I[I.length-1]),Q=e=>A?{bottom:`${e}%`}:{insetInlineStart:`${e}%`},$=A?{bottom:`${X}%`,height:`${Z-X}%`}:{insetInlineStart:`${X}%`,width:`${Z-X}%`},De=j.some(e=>e.label),Oe=I.map(m).join(` – `);return(0,g.jsxs)(`div`,{...ge(w),ref:C,className:o(u.slider,u[f],u[p],A&&u.vertical,De&&u.labelled,D&&u.disabled,O&&u.readOnly,B!==null&&u.dragging,we),style:S,...c(`slider`,`root`,{disabled:D,readonly:O,invalid:!!T?.invalid,dragging:B!==null,size:f,color:p,orientation:_,variant:n?`range`:`single`}),children:[(0,g.jsxs)(`div`,{ref:L,className:u.control,onPointerDown:W,onPointerMove:G,onPointerUp:K,onPointerCancel:K,...c(`slider`,`control`),children:[(0,g.jsx)(`span`,{className:u.rail,...c(`slider`,`rail`)}),(0,g.jsx)(`span`,{className:u.range,style:$,...c(`slider`,`range`)}),j.map(e=>{let t=re(e.value,F);return(0,g.jsx)(`span`,{className:o(u.mark,t&&u.markActive),style:Q(Y(e.value)),"aria-hidden":!0,...c(`slider`,`mark`,{state:t?`active`:`inactive`}),children:e.label&&(0,g.jsx)(`span`,{className:o(u.markLabel,e.value<=a&&u.markLabelStart,e.value>=s&&u.markLabelEnd),...c(`slider`,`mark-label`),children:e.label})},e.value)}),I.map((e,t)=>{let r=B===t;return(0,g.jsx)(`span`,{ref:e=>{R.current[t]=e},"data-index":t,role:`slider`,tabIndex:D?-1:0,id:t===0?E.id:void 0,className:o(u.thumb,r&&u.thumbDragging),style:Q(Y(e)),"aria-label":J(t),"aria-labelledby":Ee,"aria-describedby":E[`aria-describedby`],"aria-valuemin":n&&t===1?I[0]:a,"aria-valuemax":n&&t===0?I[1]:s,"aria-valuenow":e,"aria-valuetext":x?x(e,t):m(e),"aria-orientation":_,"aria-disabled":D||void 0,"aria-readonly":O||void 0,"aria-invalid":E[`aria-invalid`],onKeyDown:e=>q(e,t),...c(`slider`,`thumb`,{dragging:r,disabled:D}),children:xe&&(0,g.jsx)(`span`,{className:u.tooltip,"aria-hidden":!0,...c(`slider`,`tooltip`),children:m(e)})},t)})]}),be&&(0,g.jsx)(`span`,{className:u.value,"aria-hidden":!0,...c(`slider`,`value`),children:Oe}),v&&I.map((e,t)=>(0,g.jsx)(`input`,{type:`hidden`,name:v,value:e,disabled:D,...c(`slider`,`input`)},t))]})}})))()}function y(){let[e,t]=(0,Ce.useState)(40);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,b.jsx)(_,{"aria-label":`Volume`,value:e,onChange:t,showValue:!0,tooltip:!0}),(0,b.jsx)(_,{"aria-label":`Opacity`,defaultValue:.6,min:0,max:1,step:.05,showValue:!0})]})}var Ce,b;function x(){return(x=e((()=>{Ce=t(),v(),b=n()})))()}function we(){let[e,t]=(0,S.useState)(50),[n,r]=(0,S.useState)(50),[ee,te]=(0,S.useState)(0);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,C.jsx)(_,{"aria-label":`Brightness`,value:e,onChange:t,onChangeEnd:e=>{r(e),te(e=>e+1)}}),(0,C.jsxs)(`p`,{style:{margin:0},children:[`While dragging: `,String(e),` · Saved on release: `,String(n),` (`,ee,` saves)`]})]})}var S,C;function w(){return(w=e((()=>{S=t(),v(),C=n()})))()}function Te(){return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,T.jsx)(_,{"aria-label":`Disabled`,defaultValue:40,disabled:!0}),(0,T.jsx)(_,{"aria-label":`Read only`,defaultValue:60,readOnly:!0,showValue:!0}),(0,T.jsxs)(f,{invalid:!0,children:[(0,T.jsx)(ve,{children:`Daily goal (minutes)`}),(0,T.jsx)(_,{defaultValue:5,max:120,step:5,showValue:!0}),(0,T.jsx)(ye,{children:`Pick at least 10 minutes.`})]})]})}var T;function E(){return(E=e((()=>{d(),v(),T=n()})))()}function D(){return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:32,width:`100%`,maxWidth:420},children:[(0,O.jsx)(_,{"aria-label":`Rating`,defaultValue:6,max:10,marks:!0,showValue:!0}),(0,O.jsx)(_,{"aria-label":`Fan speed`,defaultValue:50,step:null,marks:k,getAriaValueText:e=>k.find(t=>t.value===e)?.label??String(e)})]})}var O,k;function A(){return(A=e((()=>{v(),O=n(),k=[{value:0,label:`Off`},{value:25,label:`Low`},{value:50,label:`Medium`},{value:75,label:`High`},{value:100,label:`Max`}]})))()}function j(){let[e,t]=(0,M.useState)([20,80]),[n,r]=e;return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,N.jsx)(_,{"aria-label":`Price`,range:!0,value:e,onChange:t,step:5,formatValue:e=>`$${e}`,tooltip:!0,name:`price`}),(0,N.jsxs)(`p`,{style:{margin:0},children:[`From $`,n,` to $`,r]})]})}var M,N;function P(){return(P=e((()=>{M=t(),v(),N=n()})))()}function F(){return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,I.jsx)(_,{"aria-label":`Small`,size:`small`,defaultValue:30}),(0,I.jsx)(_,{"aria-label":`Medium`,size:`medium`,defaultValue:50}),(0,I.jsx)(_,{"aria-label":`Large`,size:`large`,defaultValue:70}),L.map((e,t)=>(0,I.jsx)(_,{"aria-label":e,color:e,defaultValue:20+t*15},e))]})}var I,L;function R(){return(R=e((()=>{v(),I=n(),L=[`primary`,`success`,`info`,`warning`,`danger`]})))()}var z;function B(){return(B=e((()=>{z=`import { useState } from "react";
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
`})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { FormControl, FormHelperText, FormLabel, Slider } from "minerva-design";

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
`})))()}var G;function K(){return(K=e((()=>{G=`import { Slider } from "minerva-design";

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
`})))()}var q;function J(){return(J=e((()=>{q=`import { useState } from "react";
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
`})))()}var Ee;function Y(){return(Y=e((()=>{Ee=`import { Slider } from "minerva-design";

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
`})))()}var X,Z,Q;function $(){return($=e((()=>{x(),w(),E(),A(),P(),R(),B(),H(),W(),K(),J(),Y(),t(),be(),m(),X=n(),Z=p(Object.assign({"./demos/basic.tsx":y,"./demos/committed.tsx":we,"./demos/disabled.tsx":Te,"./demos/marks.tsx":D,"./demos/range.tsx":j,"./demos/sizes-colors.tsx":F}),Object.assign({"./demos/basic.tsx":z,"./demos/committed.tsx":V,"./demos/disabled.tsx":U,"./demos/marks.tsx":G,"./demos/range.tsx":q,"./demos/sizes-colors.tsx":Ee})),Q=()=>(0,X.jsx)(xe,{id:`slider`,demos:Z})})))()}$();export{Q as default};