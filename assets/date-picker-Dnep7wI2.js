import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-B-h_BENN.js";import{G as ee,Gt as o,Mn as s,Yt as c,ht as l,nn as u,pt as d,qt as te,rt as ne}from"./angular-preview-B7Uzpk8P.js";import{B as re,R as ie,S as ae,T as oe,V as se,g as ce,r as le,w as ue,z as f}from"./ProgressIndicator-CLQ5GhV8.js";import{t as p}from"./stylingHooks-PqiNJdev.js";import{i as de,n as fe,r as pe,t as me}from"./context-ESLv39g4.js";import{$ as he,Q as ge,St as _e,Tt as ve,Z as ye,ct as be,st as xe,wt as m,xt as Se}from"./io5-BsjRfO9T.js";import{t as Ce}from"./dataAttributes-CDHeJa9q.js";import{i as we,r as Te}from"./CodeBlock-BfjU5DKs.js";import{n as Ee,t as De}from"./Input-B-_C7F3z.js";import{n as Oe,r as ke,t as Ae}from"./tabbing-CfbH4yxf.js";import{a as je,r as Me}from"./FormControl-CQnw3MB7.js";import{i as Ne,r as Pe}from"./DemoBlock-dtxy0yga.js";import{n as h,t as g}from"./datePicker.module.scss-B4HCcXeV.js";import{l as Fe,n as Ie,t as _,u as Le}from"./DocPage-ys66mjfR.js";var v,y,Re,b,x;function S(){return(S=t((()=>{s(),se(),oe(),m(),_e(),fe(),xe(),he(),ge(),we(),De(),Ae(),h(),v=e(n(),1),y=r(),Re=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],b=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":s,"aria-labelledby":ie,"aria-describedby":oe,id:se,required:f,readOnly:fe,invalid:he,name:ge=`date-picker`,disabled:_e,clearable:xe=!0,size:m=`medium`,minDate:we,maxDate:De,locale:Ae,className:je=``,style:Me,onOpenChange:Ne,...Pe})=>{let{t:h,language:Fe}=re(),Ie=(0,v.useId)(),_=de(),Le=me({id:se,"aria-describedby":oe}),b=_e??_?.disabled??!1,x=fe??_?.readOnly??!1,S=f??_?.required??!1,C=he??_?.invalid??!1,w=a??s??h(`datePicker.label`),T=ie??(_&&!a&&!s?_.labelId:void 0),[E,ze]=Se({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[D,O]=Se({defaultValue:!1,onChange:Ne,name:`DatePicker`,prop:`open`}),[k,A]=(0,v.useState)(null),[j,Be]=(0,v.useState)(null),[Ve,M]=(0,v.useState)(null),He=ve(Be,e),Ue=(0,v.useRef)(null),N=be(),We=u(E||``)??new Date,[P,F]=(0,v.useState)(()=>c(We)),[I,L]=(0,v.useState)(``),[R,z]=(0,v.useState)(!1),B=(0,v.useRef)(new Map),V=(0,v.useRef)(null),H=e=>!!(we&&e<we||De&&e>De),U=e=>{ze(e),r?.(e)},W=e=>{let t=u(e);t&&F(c(t))},Ge=e=>{if(A(e),e===``){U(``);return}let t=u(e,!0);if(t){let e=l(t);H(e)||(U(e),F(c(t)))}},Ke=()=>{if(k===null)return;let e=k.trim();if(e===``)E&&U(``);else{let t=u(e,!1);if(t){let e=l(t);!H(e)&&e!==E&&(U(e),F(c(t)))}}A(null)},G=()=>{A(null),U(``),j?.focus()},K=e=>{let t=l(e);b||x||H(t)||(A(null),U(t),F(c(e)),O(!1),j?.focus())},qe=()=>{b||x||(z(!1),D||W(E),O(e=>!e))},q=c(P),Je=o(q,-((q.getDay()+6)%7)),J=Array.from({length:42},(e,t)=>o(Je,t)),Y=J.map(l),X=new Date,Z=l(X),Q=[I,E,d(X,P)?Z:``,l(q),...Y].find(e=>e&&Y.includes(e)&&!H(e)),$=l(q);(0,v.useEffect)(()=>{if(!D||b||!V.current)return;let e=B.current.get(V.current);e&&(V.current=null,e.focus())},[D,$,I,b]);let Ye=(e,t)=>{if(b||x)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||K(t);return}let n,r=(t.getDay()+6)%7;switch(ee(e.key,e.currentTarget)){case`ArrowLeft`:n=o(t,-1);break;case`ArrowRight`:n=o(t,1);break;case`ArrowUp`:n=o(t,-7);break;case`ArrowDown`:n=o(t,7);break;case`Home`:n=o(t,-r);break;case`End`:n=o(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=c(t,r),a=o(c(i,1),-1).getDate();n=te(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=l(n);V.current=i,L(i),d(n,P)||F(c(n))},Xe=e=>{let t=e.currentTarget;!j||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Oe(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?j:ke(j,N??j.ownerDocument.body,!1)??j).focus(),O(!1))},Ze=new Intl.DateTimeFormat(Ae??Fe,{year:`numeric`,month:`long`}).format(q),Qe=k??E;return(0,y.jsxs)(`div`,{...Ce(Pe),...p(`date-picker`,`root`,{state:D&&!b&&!x?`open`:`closed`,disabled:b,readonly:x,invalid:C,size:m}),ref:M,className:ne(g.datePicker,je),style:Me,onClick:e=>{e.target===j&&qe()},children:[(0,y.jsx)(pe.Provider,{value:null,children:(0,y.jsx)(Ee,{ref:He,value:Qe,placeholder:i??h(`datePicker.placeholder`),id:Le.id,"aria-label":w,"aria-labelledby":T,"aria-describedby":Le[`aria-describedby`],"aria-invalid":C||void 0,"aria-readonly":x||void 0,required:S,readOnly:x,onChange:e=>Ge(e.target.value),onBlur:Ke,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),D?Ue.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(W(E),L(E||Z),z(!0),O(!0)))},name:ge,disabled:b,size:m,suffix:xe&&E&&!b&&!x?(0,y.jsx)(Te,{icon:(0,y.jsx)(ue,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":h(`datePicker.clear`),onClick:G,className:g.clearButton}):(0,y.jsx)(`span`,{className:g.calendarIcon,"aria-hidden":`true`,...p(`date-picker`,`icon`),children:(0,y.jsx)(le,{})})})}),(0,y.jsx)(ye,{ref:Ue,open:D&&!b&&!x,anchor:j,placement:`bottom-start`,branches:()=>[Ve],onDismiss:()=>O(!1),returnFocusOnEscape:()=>j,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":w,"aria-labelledby":T,className:g.popup,onKeyDown:Xe,...p(`date-picker`,`content`,{state:`open`}),children:(0,y.jsxs)(`div`,{className:g.panel,children:[(0,y.jsxs)(`div`,{className:g.header,children:[(0,y.jsx)(`h2`,{id:Ie,className:g.heading,"aria-live":`polite`,children:Ze}),(0,y.jsxs)(`div`,{className:g.navGroup,children:[(0,y.jsx)(`button`,{type:`button`,className:g.navButton,"aria-label":h(`monthCalendar.previousMonth`),onClick:()=>F(c(P,-1)),children:(0,y.jsx)(ae,{"aria-hidden":!0,focusable:!1})}),(0,y.jsx)(`button`,{type:`button`,className:g.navButton,"aria-label":h(`monthCalendar.nextMonth`),onClick:()=>F(c(P,1)),children:(0,y.jsx)(ce,{"aria-hidden":!0,focusable:!1})})]})]}),(0,y.jsxs)(`div`,{role:`grid`,"aria-labelledby":Ie,className:g.grid,children:[(0,y.jsx)(`div`,{role:`row`,className:g.week,children:Re.map(e=>(0,y.jsx)(`div`,{role:`columnheader`,className:g.weekday,children:h(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,y.jsx)(`div`,{role:`row`,className:g.week,children:J.slice(t*7,t*7+7).map(e=>{let t=l(e),n=E===t,r=!d(e,P),i=t===Z,a=H(t);return(0,y.jsx)(`div`,{role:`gridcell`,className:g.day,ref:e=>{e?(B.current.set(t,e),(R&&t===Q||V.current===t)&&(V.current=null,e.focus())):B.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===Q?0:-1,onFocus:()=>L(t),onClick:()=>K(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,y.jsxs)(`div`,{className:g.footer,children:[(0,y.jsx)(`button`,{type:`button`,className:g.footerButton,disabled:H(Z),onClick:()=>K(X),children:h(`datePicker.today`)}),xe&&E&&(0,y.jsx)(`button`,{type:`button`,className:g.footerButton,onClick:()=>{G(),O(!1)},children:h(`datePicker.clear`)})]})]})})]})},x=v.memo(b)})))()}function C(){let[e,t]=(0,w.useState)(``);return(0,T.jsxs)(`div`,{style:{maxWidth:280},children:[(0,T.jsx)(x,{onChange:t}),(0,T.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var w,T;function E(){return(E=t((()=>{w=n(),S(),T=r()})))()}function ze(){let[e,t]=(0,D.useState)(`2026-04-17`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,O.jsx)(x,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,O.jsx)(f,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,O.jsx)(f,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,O.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var D,O;function k(){return(k=t((()=>{D=n(),ie(),S(),O=r()})))()}function A(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,j.jsx)(x,{defaultValue:`2026-04-17`}),(0,j.jsx)(x,{defaultValue:`2026-04-17`,clearable:!1})]})}var j;function Be(){return(Be=t((()=>{S(),j=r()})))()}function Ve(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,M.jsx)(x,{defaultValue:`2026-04-17`,disabled:!0}),(0,M.jsx)(x,{defaultValue:`2026-04-17`,readOnly:!0})]})}var M;function He(){return(He=t((()=>{S(),M=r()})))()}function Ue(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,N.jsx)(Me,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,N.jsx)(x,{})}),(0,N.jsx)(Me,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,N.jsx)(x,{defaultValue:`2026-01-01`})})]})}var N;function We(){return(We=t((()=>{S(),je(),N=r()})))()}function P(){return(0,F.jsx)(`div`,{style:{maxWidth:280},children:(0,F.jsx)(x,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var F;function I(){return(I=t((()=>{S(),F=r()})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,R.jsx)(x,{size:`small`,placeholder:`Small`}),(0,R.jsx)(x,{size:`medium`,placeholder:`Medium`}),(0,R.jsx)(x,{size:`large`,placeholder:`Large`})]})}var R;function z(){return(z=t((()=>{S(),R=r()})))()}var B;function V(){return(V=t((()=>{B=`import { useState } from "react";
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
`})))()}var H;function U(){return(U=t((()=>{H=`import { useState } from "react";
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
`})))()}var W;function Ge(){return(Ge=t((()=>{W=`import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}
`})))()}var Ke;function G(){return(G=t((()=>{Ke=`import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}
`})))()}var K;function qe(){return(qe=t((()=>{K=`import { DatePicker, FormField } from "minerva-design";

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
`})))()}var X,Z,Q;function $(){return($=t((()=>{E(),k(),Be(),He(),We(),I(),z(),V(),U(),Ge(),G(),qe(),Je(),Y(),n(),a(),Ie(),Le(),Ne(),X=r(),Z=Fe(Object.assign({"./demos/basic.tsx":C,"./demos/controlled.tsx":ze,"./demos/default-value.tsx":A,"./demos/disabled.tsx":Ve,"./demos/form-control.tsx":Ue,"./demos/min-max.tsx":P,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":B,"./demos/controlled.tsx":H,"./demos/default-value.tsx":W,"./demos/disabled.tsx":Ke,"./demos/form-control.tsx":K,"./demos/min-max.tsx":q,"./demos/sizes.tsx":J})),Q=()=>{let{t:e}=i();return(0,X.jsx)(_,{id:`date-picker`,demos:Z,children:(0,X.jsxs)(`section`,{className:Pe.section,"aria-labelledby":`keyboard`,children:[(0,X.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,X.jsxs)(`ul`,{className:Pe.prose,children:[(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}$();export{Q as default};