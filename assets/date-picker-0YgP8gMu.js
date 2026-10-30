import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{i,r as a}from"./DemoBlock-BJ0_y9F8.js";import{n as o,t as ee}from"./useTranslation-BzoVi22c.js";import{Et as s,H as te,It as ne,Wt as c,Zt as l,qt as u,tn as d,ut as re,x as ie}from"./angular-preview-l4x8c_2r.js";import{B as ae,H as oe,R as se,S as ce,T as le,U as ue,g as de,r as fe,w as pe,z as me}from"./ProgressIndicator-BhPa7d9i.js";import{i as he,n as ge,r as _e,t as ve}from"./context-ESLv39g4.js";import{$ as ye,Ct as be,Et as xe,J as Se,Q as Ce,St as we,Tt as Te,ct as Ee,et as De,lt as Oe,q as ke}from"./io5-DF7HdQ2g.js";import{t as Ae}from"./dataAttributes-CDHeJa9q.js";import{n as je,t as Me}from"./Input-DboHcSJW.js";import{n as Ne,r as Pe,t as Fe}from"./tabbing-BcZx0LHW.js";import{a as Ie,r as f}from"./FormControl-BkwPT394.js";import{n as p,t as m}from"./datePicker.module.scss-DX9bDRIx.js";import{l as Le,n as h,t as g,u as _}from"./DocPage-B2iACtLP.js";var v,y,Re,b,x;function S(){return(S=t((()=>{ne(),ue(),le(),Te(),be(),ge(),Ee(),De(),ye(),Se(),Me(),Fe(),p(),v=e(n(),1),y=r(),Re=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],b=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":o,"aria-labelledby":ee,"aria-describedby":ne,id:se,required:le,readOnly:ue,invalid:me,name:ge=`date-picker`,disabled:ye,clearable:be=!0,size:Se=`medium`,minDate:Te,maxDate:Ee,locale:De,className:Me=``,style:Fe,onOpenChange:Ie,...f})=>{let{t:p,language:Le}=oe(),h=(0,v.useId)(),g=he(),_=ve({id:se,"aria-describedby":ne}),b=ye??g?.disabled??!1,x=ue??g?.readOnly??!1,S=le??g?.required??!1,C=me??g?.invalid??!1,w=a??o??p(`datePicker.label`),T=ee??(g&&!a&&!o?g.labelId:void 0),[E,ze]=we({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[D,O]=we({defaultValue:!1,onChange:Ie,name:`DatePicker`,prop:`open`}),[k,A]=(0,v.useState)(null),[j,Be]=(0,v.useState)(null),[Ve,M]=(0,v.useState)(null),He=xe(Be,e),Ue=(0,v.useRef)(null),N=Oe(),We=u(E||``)??new Date,[P,F]=(0,v.useState)(()=>c(We)),[I,L]=(0,v.useState)(``),[R,z]=(0,v.useState)(!1),B=(0,v.useRef)(new Map),V=(0,v.useRef)(null),H=e=>!!(Te&&e<Te||Ee&&e>Ee),U=e=>{ze(e),r?.(e)},W=e=>{let t=u(e);t&&F(c(t))},Ge=e=>{if(A(e),e===``){U(``);return}let t=u(e,!0);if(t){let e=s(t);H(e)||(U(e),F(c(t)))}},Ke=()=>{if(k===null)return;let e=k.trim();if(e===``)E&&U(``);else{let t=u(e,!1);if(t){let e=s(t);!H(e)&&e!==E&&(U(e),F(c(t)))}}A(null)},G=()=>{A(null),U(``),j?.focus()},K=e=>{let t=s(e);b||x||H(t)||(A(null),U(t),F(c(e)),O(!1),j?.focus())},q=()=>{b||x||(z(!1),D||W(E),O(e=>!e))},J=c(P),qe=d(J,-((J.getDay()+6)%7)),Y=Array.from({length:42},(e,t)=>d(qe,t)),Je=Y.map(s),X=new Date,Z=s(X),Q=[I,E,l(X,P)?Z:``,s(J)].find(e=>e&&Je.includes(e)),$=s(J);(0,v.useEffect)(()=>{if(!D||b||!V.current)return;let e=B.current.get(V.current);e&&(V.current=null,e.focus())},[D,$,I,b]);let Ye=(e,t)=>{if(b||x)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||K(t);return}let n,r=(t.getDay()+6)%7;switch(ie(e.key,e.currentTarget)){case`ArrowLeft`:n=d(t,-1);break;case`ArrowRight`:n=d(t,1);break;case`ArrowUp`:n=d(t,-7);break;case`ArrowDown`:n=d(t,7);break;case`Home`:n=d(t,-r);break;case`End`:n=d(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=c(t,r),a=d(c(i,1),-1).getDate();n=te(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=s(n);V.current=i,L(i),l(n,P)||F(c(n))},Xe=e=>{let t=e.currentTarget;!j||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Ne(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?j:Pe(j,N??j.ownerDocument.body,!1)??j).focus(),O(!1))},Ze=new Intl.DateTimeFormat(De??Le,{year:`numeric`,month:`long`}).format(J),Qe=k??E;return(0,y.jsxs)(`div`,{...Ae(f),...ae(`date-picker`,`root`,{state:D&&!b&&!x?`open`:`closed`,disabled:b,readonly:x,invalid:C,size:Se}),ref:M,className:re(m.datePicker,Me),style:Fe,onClick:e=>{e.target===j&&q()},children:[(0,y.jsx)(_e.Provider,{value:null,children:(0,y.jsx)(je,{ref:He,value:Qe,placeholder:i??p(`datePicker.placeholder`),id:_.id,"aria-label":w,"aria-labelledby":T,"aria-describedby":_[`aria-describedby`],"aria-invalid":C||void 0,"aria-readonly":x||void 0,required:S,readOnly:x,onChange:e=>Ge(e.target.value),onBlur:Ke,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),D?Ue.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(W(E),L(E||Z),z(!0),O(!0)))},name:ge,disabled:b,size:Se,suffix:be&&E&&!b&&!x?(0,y.jsx)(ke,{icon:(0,y.jsx)(pe,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":p(`datePicker.clear`),onClick:G,className:m.clearButton}):(0,y.jsx)(`span`,{className:m.calendarIcon,"aria-hidden":`true`,...ae(`date-picker`,`icon`),children:(0,y.jsx)(fe,{})})})}),(0,y.jsx)(Ce,{ref:Ue,open:D&&!b&&!x,anchor:j,placement:`bottom-start`,branches:()=>[Ve],onDismiss:()=>O(!1),returnFocusOnEscape:()=>j,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":w,"aria-labelledby":T,className:m.popup,onKeyDown:Xe,...ae(`date-picker`,`content`,{state:`open`}),children:(0,y.jsxs)(`div`,{className:m.panel,children:[(0,y.jsxs)(`div`,{className:m.header,children:[(0,y.jsx)(`h2`,{id:h,className:m.heading,"aria-live":`polite`,children:Ze}),(0,y.jsxs)(`div`,{className:m.navGroup,children:[(0,y.jsx)(`button`,{type:`button`,className:m.navButton,"aria-label":p(`monthCalendar.previousMonth`),onClick:()=>F(c(P,-1)),children:(0,y.jsx)(ce,{"aria-hidden":!0,focusable:!1})}),(0,y.jsx)(`button`,{type:`button`,className:m.navButton,"aria-label":p(`monthCalendar.nextMonth`),onClick:()=>F(c(P,1)),children:(0,y.jsx)(de,{"aria-hidden":!0,focusable:!1})})]})]}),(0,y.jsxs)(`div`,{role:`grid`,"aria-labelledby":h,className:m.grid,children:[(0,y.jsx)(`div`,{role:`row`,className:m.week,children:Re.map(e=>(0,y.jsx)(`div`,{role:`columnheader`,className:m.weekday,children:p(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,y.jsx)(`div`,{role:`row`,className:m.week,children:Y.slice(t*7,t*7+7).map(e=>{let t=s(e),n=E===t,r=!l(e,P),i=t===Z,a=H(t);return(0,y.jsx)(`div`,{role:`gridcell`,className:m.day,ref:e=>{e?(B.current.set(t,e),(R&&t===Q||V.current===t)&&(V.current=null,e.focus())):B.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===Q?0:-1,onFocus:()=>L(t),onClick:()=>K(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,y.jsxs)(`div`,{className:m.footer,children:[(0,y.jsx)(`button`,{type:`button`,className:m.footerButton,disabled:H(Z),onClick:()=>K(X),children:p(`datePicker.today`)}),be&&E&&(0,y.jsx)(`button`,{type:`button`,className:m.footerButton,onClick:()=>{G(),O(!1)},children:p(`datePicker.clear`)})]})]})})]})},x=v.memo(b)})))()}function C(){let[e,t]=(0,w.useState)(``);return(0,T.jsxs)(`div`,{style:{maxWidth:280},children:[(0,T.jsx)(x,{onChange:t}),(0,T.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var w,T;function E(){return(E=t((()=>{w=n(),S(),T=r()})))()}function ze(){let[e,t]=(0,D.useState)(`2026-04-17`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,O.jsx)(x,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,O.jsx)(me,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,O.jsx)(me,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,O.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var D,O;function k(){return(k=t((()=>{D=n(),se(),S(),O=r()})))()}function A(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,j.jsx)(x,{defaultValue:`2026-04-17`}),(0,j.jsx)(x,{defaultValue:`2026-04-17`,clearable:!1})]})}var j;function Be(){return(Be=t((()=>{S(),j=r()})))()}function Ve(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,M.jsx)(x,{defaultValue:`2026-04-17`,disabled:!0}),(0,M.jsx)(x,{defaultValue:`2026-04-17`,readOnly:!0})]})}var M;function He(){return(He=t((()=>{S(),M=r()})))()}function Ue(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,N.jsx)(f,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,N.jsx)(x,{})}),(0,N.jsx)(f,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,N.jsx)(x,{defaultValue:`2026-01-01`})})]})}var N;function We(){return(We=t((()=>{S(),Ie(),N=r()})))()}function P(){return(0,F.jsx)(`div`,{style:{maxWidth:280},children:(0,F.jsx)(x,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var F;function I(){return(I=t((()=>{S(),F=r()})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,R.jsx)(x,{size:`small`,placeholder:`Small`}),(0,R.jsx)(x,{size:`medium`,placeholder:`Medium`}),(0,R.jsx)(x,{size:`large`,placeholder:`Large`})]})}var R;function z(){return(z=t((()=>{S(),R=r()})))()}var B;function V(){return(V=t((()=>{B=`import { useState } from "react";
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
`})))()}var K;function q(){return(q=t((()=>{K=`import { DatePicker, FormField } from "minerva-design";

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
`})))()}var J;function qe(){return(qe=t((()=>{J=`import { DatePicker } from "minerva-design";

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
`})))()}var Y;function Je(){return(Je=t((()=>{Y=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=t((()=>{E(),k(),Be(),He(),We(),I(),z(),V(),U(),Ge(),G(),q(),qe(),Je(),n(),ee(),h(),_(),i(),X=r(),Z=Le(Object.assign({"./demos/basic.tsx":C,"./demos/controlled.tsx":ze,"./demos/default-value.tsx":A,"./demos/disabled.tsx":Ve,"./demos/form-control.tsx":Ue,"./demos/min-max.tsx":P,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":B,"./demos/controlled.tsx":H,"./demos/default-value.tsx":W,"./demos/disabled.tsx":Ke,"./demos/form-control.tsx":K,"./demos/min-max.tsx":J,"./demos/sizes.tsx":Y})),Q=()=>{let{t:e}=o();return(0,X.jsx)(g,{id:`date-picker`,demos:Z,children:(0,X.jsxs)(`section`,{className:a.section,"aria-labelledby":`keyboard`,children:[(0,X.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,X.jsxs)(`ul`,{className:a.prose,children:[(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}$();export{Q as default};