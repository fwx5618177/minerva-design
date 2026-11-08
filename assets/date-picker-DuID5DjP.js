import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{J as i,Y as a,_t as ee,bt as te,it as ne,q as re,rt as ie,vt as ae,xt as oe}from"./io5-DGxLJ5Qx.js";import{n as se,t as ce}from"./useTranslation-yaxzPbGb.js";import{G as le,Gt as o,Mn as ue,Yt as s,ht as c,nn as l,pt as de,qt as fe,rt as pe}from"./angular-preview-CxN7u9Fp.js";import{B as me,R as he,S as ge,T as _e,V as ve,g as ye,r as be,w as xe,z as u}from"./ProgressIndicator-Ve8Z1qBV.js";import{t as Se}from"./stylingHooks-PqiNJdev.js";import{i as Ce,n as we,r as Te,t as Ee}from"./context-ESLv39g4.js";import{t as De}from"./dataAttributes-CDHeJa9q.js";import{i as Oe,r as ke}from"./CodeBlock-Y-lIOv3H.js";import{n as Ae,t as je}from"./Input-7FBYvGJB.js";import{n as Me,r as Ne,t as Pe}from"./tabbing-2MXSv0Wd.js";import{a as Fe,r as Ie}from"./FormControl-DV6JijA1.js";import{i as Le,r as Re}from"./DemoBlock-BbGk4iaH.js";import{n as d,t as f}from"./datePicker.module.scss-B4HCcXeV.js";import{l as ze,n as p,t as m,u as h}from"./DocPage-C8sgoG-d.js";var g,_,Be,v,y;function b(){return(b=t((()=>{ue(),ve(),_e(),te(),ae(),we(),ie(),a(),i(),Oe(),je(),Pe(),d(),g=e(n(),1),_=r(),Be=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],v=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":te,"aria-labelledby":ie,"aria-describedby":ae,id:se,required:ce,readOnly:ue,invalid:he,name:_e=`date-picker`,disabled:ve,clearable:u=!0,size:we=`medium`,minDate:Oe,maxDate:je,locale:Pe,className:Fe=``,style:Ie,onOpenChange:Le,...Re})=>{let{t:d,language:ze}=me(),p=(0,g.useId)(),m=Ce(),h=Ee({id:se,"aria-describedby":ae}),v=ve??m?.disabled??!1,y=ue??m?.readOnly??!1,b=ce??m?.required??!1,x=he??m?.invalid??!1,S=a??te??d(`datePicker.label`),C=ie??(m&&!a&&!te?m.labelId:void 0),[w,Ve]=ee({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[T,E]=ee({defaultValue:!1,onChange:Le,name:`DatePicker`,prop:`open`}),[D,O]=(0,g.useState)(null),[k,A]=(0,g.useState)(null),[He,j]=(0,g.useState)(null),Ue=oe(A,e),We=(0,g.useRef)(null),M=ne(),Ge=l(w||``)??new Date,[N,P]=(0,g.useState)(()=>s(Ge)),[F,I]=(0,g.useState)(``),[L,R]=(0,g.useState)(!1),z=(0,g.useRef)(new Map),B=(0,g.useRef)(null),V=e=>!!(Oe&&e<Oe||je&&e>je),H=e=>{Ve(e),r?.(e)},U=e=>{let t=l(e);t&&P(s(t))},Ke=e=>{if(O(e),e===``){H(``);return}let t=l(e,!0);if(t){let e=c(t);V(e)||(H(e),P(s(t)))}},qe=()=>{if(D===null)return;let e=D.trim();if(e===``)w&&H(``);else{let t=l(e,!1);if(t){let e=c(t);!V(e)&&e!==w&&(H(e),P(s(t)))}}O(null)},W=()=>{O(null),H(``),k?.focus()},G=e=>{let t=c(e);v||y||V(t)||(O(null),H(t),P(s(e)),E(!1),k?.focus())},K=()=>{v||y||(R(!1),T||U(w),E(e=>!e))},q=s(N),Je=o(q,-((q.getDay()+6)%7)),J=Array.from({length:42},(e,t)=>o(Je,t)),Y=J.map(c),X=new Date,Z=c(X),Q=[F,w,de(X,N)?Z:``,c(q),...Y].find(e=>e&&Y.includes(e)&&!V(e)),$=c(q);(0,g.useEffect)(()=>{if(!T||v||!B.current)return;let e=z.current.get(B.current);e&&(B.current=null,e.focus())},[T,$,F,v]);let Ye=(e,t)=>{if(v||y)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||G(t);return}let n,r=(t.getDay()+6)%7;switch(le(e.key,e.currentTarget)){case`ArrowLeft`:n=o(t,-1);break;case`ArrowRight`:n=o(t,1);break;case`ArrowUp`:n=o(t,-7);break;case`ArrowDown`:n=o(t,7);break;case`Home`:n=o(t,-r);break;case`End`:n=o(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=s(t,r),a=o(s(i,1),-1).getDate();n=fe(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=c(n);B.current=i,I(i),de(n,N)||P(s(n))},Xe=e=>{let t=e.currentTarget;!k||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Me(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?k:Ne(k,M??k.ownerDocument.body,!1)??k).focus(),E(!1))},Ze=new Intl.DateTimeFormat(Pe??ze,{year:`numeric`,month:`long`}).format(q),Qe=D??w;return(0,_.jsxs)(`div`,{...De(Re),...Se(`date-picker`,`root`,{state:T&&!v&&!y?`open`:`closed`,disabled:v,readonly:y,invalid:x,size:we}),ref:j,className:pe(f.datePicker,Fe),style:Ie,onClick:e=>{e.target===k&&K()},children:[(0,_.jsx)(Te.Provider,{value:null,children:(0,_.jsx)(Ae,{ref:Ue,value:Qe,placeholder:i??d(`datePicker.placeholder`),id:h.id,"aria-label":S,"aria-labelledby":C,"aria-describedby":h[`aria-describedby`],"aria-invalid":x||void 0,"aria-readonly":y||void 0,required:b,readOnly:y,onChange:e=>Ke(e.target.value),onBlur:qe,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),T?We.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(U(w),I(w||Z),R(!0),E(!0)))},name:_e,disabled:v,size:we,suffix:u&&w&&!v&&!y?(0,_.jsx)(ke,{icon:(0,_.jsx)(xe,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":d(`datePicker.clear`),onClick:W,className:f.clearButton}):(0,_.jsx)(`span`,{className:f.calendarIcon,"aria-hidden":`true`,...Se(`date-picker`,`icon`),children:(0,_.jsx)(be,{})})})}),(0,_.jsx)(re,{ref:We,open:T&&!v&&!y,anchor:k,placement:`bottom-start`,branches:()=>[He],onDismiss:()=>E(!1),returnFocusOnEscape:()=>k,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":S,"aria-labelledby":C,className:f.popup,onKeyDown:Xe,...Se(`date-picker`,`content`,{state:`open`}),children:(0,_.jsxs)(`div`,{className:f.panel,children:[(0,_.jsxs)(`div`,{className:f.header,children:[(0,_.jsx)(`h2`,{id:p,className:f.heading,"aria-live":`polite`,children:Ze}),(0,_.jsxs)(`div`,{className:f.navGroup,children:[(0,_.jsx)(`button`,{type:`button`,className:f.navButton,"aria-label":d(`monthCalendar.previousMonth`),onClick:()=>P(s(N,-1)),children:(0,_.jsx)(ge,{"aria-hidden":!0,focusable:!1})}),(0,_.jsx)(`button`,{type:`button`,className:f.navButton,"aria-label":d(`monthCalendar.nextMonth`),onClick:()=>P(s(N,1)),children:(0,_.jsx)(ye,{"aria-hidden":!0,focusable:!1})})]})]}),(0,_.jsxs)(`div`,{role:`grid`,"aria-labelledby":p,className:f.grid,children:[(0,_.jsx)(`div`,{role:`row`,className:f.week,children:Be.map(e=>(0,_.jsx)(`div`,{role:`columnheader`,className:f.weekday,children:d(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,_.jsx)(`div`,{role:`row`,className:f.week,children:J.slice(t*7,t*7+7).map(e=>{let t=c(e),n=w===t,r=!de(e,N),i=t===Z,a=V(t);return(0,_.jsx)(`div`,{role:`gridcell`,className:f.day,ref:e=>{e?(z.current.set(t,e),(L&&t===Q||B.current===t)&&(B.current=null,e.focus())):z.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===Q?0:-1,onFocus:()=>I(t),onClick:()=>G(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,_.jsxs)(`div`,{className:f.footer,children:[(0,_.jsx)(`button`,{type:`button`,className:f.footerButton,disabled:V(Z),onClick:()=>G(X),children:d(`datePicker.today`)}),u&&w&&(0,_.jsx)(`button`,{type:`button`,className:f.footerButton,onClick:()=>{W(),E(!1)},children:d(`datePicker.clear`)})]})]})})]})},y=g.memo(v)})))()}function x(){let[e,t]=(0,S.useState)(``);return(0,C.jsxs)(`div`,{style:{maxWidth:280},children:[(0,C.jsx)(y,{onChange:t}),(0,C.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var S,C;function w(){return(w=t((()=>{S=n(),b(),C=r()})))()}function Ve(){let[e,t]=(0,T.useState)(`2026-04-17`);return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,E.jsx)(y,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,E.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,E.jsx)(u,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,E.jsx)(u,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,E.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var T,E;function D(){return(D=t((()=>{T=n(),he(),b(),E=r()})))()}function O(){return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,k.jsx)(y,{defaultValue:`2026-04-17`}),(0,k.jsx)(y,{defaultValue:`2026-04-17`,clearable:!1})]})}var k;function A(){return(A=t((()=>{b(),k=r()})))()}function He(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,j.jsx)(y,{defaultValue:`2026-04-17`,disabled:!0}),(0,j.jsx)(y,{defaultValue:`2026-04-17`,readOnly:!0})]})}var j;function Ue(){return(Ue=t((()=>{b(),j=r()})))()}function We(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,M.jsx)(Ie,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,M.jsx)(y,{})}),(0,M.jsx)(Ie,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,M.jsx)(y,{defaultValue:`2026-01-01`})})]})}var M;function Ge(){return(Ge=t((()=>{b(),Fe(),M=r()})))()}function N(){return(0,P.jsx)(`div`,{style:{maxWidth:280},children:(0,P.jsx)(y,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var P;function F(){return(F=t((()=>{b(),P=r()})))()}function I(){return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,L.jsx)(y,{size:`small`,placeholder:`Small`}),(0,L.jsx)(y,{size:`medium`,placeholder:`Medium`}),(0,L.jsx)(y,{size:`large`,placeholder:`Large`})]})}var L;function R(){return(R=t((()=>{b(),L=r()})))()}var z;function B(){return(B=t((()=>{z=`import { useState } from "react";
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
`})))()}var V;function H(){return(H=t((()=>{V=`import { useState } from "react";
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
`})))()}var U;function Ke(){return(Ke=t((()=>{U=`import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}
`})))()}var qe;function W(){return(W=t((()=>{qe=`import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}
`})))()}var G;function K(){return(K=t((()=>{G=`import { DatePicker, FormField } from "minerva-design";

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
`})))()}var q;function Je(){return(Je=t((()=>{q=`import { DatePicker } from "minerva-design";

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
`})))()}var J;function Y(){return(Y=t((()=>{J=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=t((()=>{w(),D(),A(),Ue(),Ge(),F(),R(),B(),H(),Ke(),W(),K(),Je(),Y(),n(),ce(),p(),h(),Le(),X=r(),Z=ze(Object.assign({"./demos/basic.tsx":x,"./demos/controlled.tsx":Ve,"./demos/default-value.tsx":O,"./demos/disabled.tsx":He,"./demos/form-control.tsx":We,"./demos/min-max.tsx":N,"./demos/sizes.tsx":I}),Object.assign({"./demos/basic.tsx":z,"./demos/controlled.tsx":V,"./demos/default-value.tsx":U,"./demos/disabled.tsx":qe,"./demos/form-control.tsx":G,"./demos/min-max.tsx":q,"./demos/sizes.tsx":J})),Q=()=>{let{t:e}=se();return(0,X.jsx)(m,{id:`date-picker`,demos:Z,children:(0,X.jsxs)(`section`,{className:Re.section,"aria-labelledby":`keyboard`,children:[(0,X.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,X.jsxs)(`ul`,{className:Re.prose,children:[(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}$();export{Q as default};