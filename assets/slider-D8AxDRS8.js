import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{An as r,At as i,Et as a,Fn as ee,Lt as te,Mn as ne,Mt as re,Pt as ie,dr as ae,dt as oe,et as se,lt as ce,t as le,x as ue}from"./angular-preview-IwZi912s.js";import{B as de,V as o}from"./ProgressIndicator-DJBhmBkg.js";import{t as s}from"./stylingHooks-PqiNJdev.js";import{i as fe,n as c,t as pe}from"./context-ESLv39g4.js";import{$ as me,St as he,xt as ge}from"./io5-CaMdkTnG.js";import{t as _e}from"./dataAttributes-CDHeJa9q.js";import{n as ve,t as l}from"./slider.module.scss-B_WXpAXe.js";import{a as u,n as ye,o as be,t as d}from"./FormControl-DluDCCKh.js";import{l as f,n as xe,t as Se,u as p}from"./DocPage-D5zg4-3g.js";var m,h,Ce,g;function _(){return(_=e((()=>{r(),o(),he(),c(),me(),ve(),m=t(),h=n(),Ce=e=>String(e),g=({value:e,defaultValue:t,range:n=!1,min:r=0,max:o=100,step:c=1,marks:me,snapToMarks:he=!1,onChange:ve,onChangeEnd:u,disabled:ye,readOnly:be,size:d=`medium`,color:f=`primary`,showValue:xe=!1,tooltip:Se=!1,formatValue:p=Ce,orientation:g=`horizontal`,name:_,"aria-label":v,"aria-labelledby":y,"aria-describedby":b,getAriaValueText:x,className:we,style:S,ref:C,...w})=>{let{t:Te}=de(),T=fe(),E=pe({id:void 0,"aria-describedby":b}),D=ye??T?.disabled??!1,O=be??T?.readOnly??!1,k=D||O,A=g===`vertical`,j=ae(me,r,o,c),M={min:r,max:o,step:c,marks:j,snapToMarks:he},[N,P]=ge({value:e,defaultValue:t,name:`Slider`}),F=se(N,n,M),I=ne(F),L=(0,m.useRef)(null),R=(0,m.useRef)([]),z=(0,m.useRef)(F);(0,m.useLayoutEffect)(()=>{z.current=F});let[B,V]=(0,m.useState)(null),H=e=>!te(e,z.current)&&(z.current=e,P(e),ve?.(e),!0),U=e=>{let t=L.current.getBoundingClientRect(),n;return A?n=t.height?(t.bottom-e.clientY)/t.height:0:(n=t.width?(e.clientX-t.left)/t.width:0,ue(L.current)===`rtl`&&(n=1-n)),ie(n,M)},W=e=>{if(k||e.button!==0)return;e.preventDefault();let t=U(e),n=e.target.closest(`[data-index]`)?.dataset.index,r=n===void 0?re(z.current,t):Number(n);e.currentTarget.setPointerCapture?.(e.pointerId),V(r),R.current[r]?.focus(),n===void 0&&H(i(z.current,r,t))},G=e=>{B!==null&&H(i(z.current,B,U(e)))},K=e=>{B!==null&&(e.currentTarget.hasPointerCapture?.(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),V(null),u?.(z.current))},q=(e,t)=>{if(k)return;let n=A?e.key:le(e.key,e.currentTarget),r=ee(n,I[t],M);r!==null&&(e.preventDefault(),H(i(z.current,t,r))&&u?.(z.current))},J=e=>{if(!n)return v;let t=Te(e===0?`slider.minimum`:`slider.maximum`);return v?`${v} ${t}`:t},Y=y??(T&&!v?T.labelId:void 0),X=e=>ce(e,r,o),Z=n?X(I[0]):0,Q=X(I[I.length-1]),$=e=>A?{bottom:`${e}%`}:{insetInlineStart:`${e}%`},Ee=A?{bottom:`${Z}%`,height:`${Q-Z}%`}:{insetInlineStart:`${Z}%`,width:`${Q-Z}%`},De=j.some(e=>e.label),Oe=I.map(p).join(` – `);return(0,h.jsxs)(`div`,{..._e(w),ref:C,className:a(l.slider,l[d],l[f],A&&l.vertical,De&&l.labelled,D&&l.disabled,O&&l.readOnly,B!==null&&l.dragging,we),style:S,...s(`slider`,`root`,{disabled:D,readonly:O,invalid:!!T?.invalid,dragging:B!==null,size:d,color:f,orientation:g,variant:n?`range`:`single`}),children:[(0,h.jsxs)(`div`,{ref:L,className:l.control,onPointerDown:W,onPointerMove:G,onPointerUp:K,onPointerCancel:K,...s(`slider`,`control`),children:[(0,h.jsx)(`span`,{className:l.rail,...s(`slider`,`rail`)}),(0,h.jsx)(`span`,{className:l.range,style:Ee,...s(`slider`,`range`)}),j.map(e=>{let t=oe(e.value,F);return(0,h.jsx)(`span`,{className:a(l.mark,t&&l.markActive),style:$(X(e.value)),"aria-hidden":!0,...s(`slider`,`mark`,{state:t?`active`:`inactive`}),children:e.label&&(0,h.jsx)(`span`,{className:a(l.markLabel,e.value<=r&&l.markLabelStart,e.value>=o&&l.markLabelEnd),...s(`slider`,`mark-label`),children:e.label})},e.value)}),I.map((e,t)=>{let i=B===t;return(0,h.jsx)(`span`,{ref:e=>{R.current[t]=e},"data-index":t,role:`slider`,tabIndex:D?-1:0,id:t===0?E.id:void 0,className:a(l.thumb,i&&l.thumbDragging),style:$(X(e)),"aria-label":J(t),"aria-labelledby":Y,"aria-describedby":E[`aria-describedby`],"aria-valuemin":n&&t===1?I[0]:r,"aria-valuemax":n&&t===0?I[1]:o,"aria-valuenow":e,"aria-valuetext":x?x(e,t):p(e),"aria-orientation":g,"aria-disabled":D||void 0,"aria-readonly":O||void 0,"aria-invalid":E[`aria-invalid`],onKeyDown:e=>q(e,t),...s(`slider`,`thumb`,{dragging:i,disabled:D}),children:Se&&(0,h.jsx)(`span`,{className:l.tooltip,"aria-hidden":!0,...s(`slider`,`tooltip`),children:p(e)})},t)})]}),xe&&(0,h.jsx)(`span`,{className:l.value,"aria-hidden":!0,...s(`slider`,`value`),children:Oe}),_&&I.map((e,t)=>(0,h.jsx)(`input`,{type:`hidden`,name:_,value:e,disabled:D,...s(`slider`,`input`)},t))]})}})))()}function v(){let[e,t]=(0,y.useState)(40);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,b.jsx)(g,{"aria-label":`Volume`,value:e,onChange:t,showValue:!0,tooltip:!0}),(0,b.jsx)(g,{"aria-label":`Opacity`,defaultValue:.6,min:0,max:1,step:.05,showValue:!0})]})}var y,b;function x(){return(x=e((()=>{y=t(),_(),b=n()})))()}function we(){let[e,t]=(0,S.useState)(50),[n,r]=(0,S.useState)(50),[i,a]=(0,S.useState)(0);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,C.jsx)(g,{"aria-label":`Brightness`,value:e,onChange:t,onChangeEnd:e=>{r(e),a(e=>e+1)}}),(0,C.jsxs)(`p`,{style:{margin:0},children:[`While dragging: `,String(e),` · Saved on release: `,String(n),` (`,i,` saves)`]})]})}var S,C;function w(){return(w=e((()=>{S=t(),_(),C=n()})))()}function Te(){return(0,T.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,T.jsx)(g,{"aria-label":`Disabled`,defaultValue:40,disabled:!0}),(0,T.jsx)(g,{"aria-label":`Read only`,defaultValue:60,readOnly:!0,showValue:!0}),(0,T.jsxs)(d,{invalid:!0,children:[(0,T.jsx)(ye,{children:`Daily goal (minutes)`}),(0,T.jsx)(g,{defaultValue:5,max:120,step:5,showValue:!0}),(0,T.jsx)(be,{children:`Pick at least 10 minutes.`})]})]})}var T;function E(){return(E=e((()=>{u(),_(),T=n()})))()}function D(){return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:32,width:`100%`,maxWidth:420},children:[(0,O.jsx)(g,{"aria-label":`Rating`,defaultValue:6,max:10,marks:!0,showValue:!0}),(0,O.jsx)(g,{"aria-label":`Fan speed`,defaultValue:50,step:null,marks:k,getAriaValueText:e=>k.find(t=>t.value===e)?.label??String(e)})]})}var O,k;function A(){return(A=e((()=>{_(),O=n(),k=[{value:0,label:`Off`},{value:25,label:`Low`},{value:50,label:`Medium`},{value:75,label:`High`},{value:100,label:`Max`}]})))()}function j(){let[e,t]=(0,M.useState)([20,80]),[n,r]=e;return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,maxWidth:420},children:[(0,N.jsx)(g,{"aria-label":`Price`,range:!0,value:e,onChange:t,step:5,formatValue:e=>`$${e}`,tooltip:!0,name:`price`}),(0,N.jsxs)(`p`,{style:{margin:0},children:[`From $`,n,` to $`,r]})]})}var M,N;function P(){return(P=e((()=>{M=t(),_(),N=n()})))()}function F(){return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:16,width:`100%`,maxWidth:420},children:[(0,I.jsx)(g,{"aria-label":`Small`,size:`small`,defaultValue:30}),(0,I.jsx)(g,{"aria-label":`Medium`,size:`medium`,defaultValue:50}),(0,I.jsx)(g,{"aria-label":`Large`,size:`large`,defaultValue:70}),L.map((e,t)=>(0,I.jsx)(g,{"aria-label":e,color:e,defaultValue:20+t*15},e))]})}var I,L;function R(){return(R=e((()=>{_(),I=n(),L=[`primary`,`success`,`info`,`warning`,`danger`]})))()}var z;function B(){return(B=e((()=>{z=`import { useState } from "react";
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
`})))()}var Y;function X(){return(X=e((()=>{Y=`import { Slider } from "minerva-design";

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
`})))()}var Z,Q,$;function Ee(){return(Ee=e((()=>{x(),w(),E(),A(),P(),R(),B(),H(),W(),K(),J(),X(),t(),xe(),p(),Z=n(),Q=f(Object.assign({"./demos/basic.tsx":v,"./demos/committed.tsx":we,"./demos/disabled.tsx":Te,"./demos/marks.tsx":D,"./demos/range.tsx":j,"./demos/sizes-colors.tsx":F}),Object.assign({"./demos/basic.tsx":z,"./demos/committed.tsx":V,"./demos/disabled.tsx":U,"./demos/marks.tsx":G,"./demos/range.tsx":q,"./demos/sizes-colors.tsx":Y})),$=()=>(0,Z.jsx)(Se,{id:`slider`,demos:Q})})))()}Ee();export{$ as default};