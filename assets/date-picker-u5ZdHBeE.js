import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-wxAap2cZ.js";import{Et as o,H as ee,It as s,Wt as c,Zt as l,qt as u,tn as d,ut as te,x as ne}from"./angular-preview-l4x8c_2r.js";import{B as re,R as ie,S as ae,T as oe,V as se,g as ce,r as le,w as ue,z as f}from"./ProgressIndicator-BMZ0rR7D.js";import{t as de}from"./stylingHooks-PqiNJdev.js";import{i as fe,n as pe,r as me,t as he}from"./context-ESLv39g4.js";import{Ct as ge,Q as _e,X as ve,Z as ye,bt as be,ot as xe,st as Se,wt as Ce,xt as we}from"./io5-BlmswBy7.js";import{t as Te}from"./dataAttributes-CDHeJa9q.js";import{i as Ee,r as De}from"./CodeBlock-CJOpG7_Q.js";import{n as Oe,t as ke}from"./Input-BNZ0fzl-.js";import{n as Ae,r as je,t as Me}from"./tabbing-BcZx0LHW.js";import{a as Ne,r as Pe}from"./FormControl-4On8EIM5.js";import{i as Fe,r as p}from"./DemoBlock-C9SrrBKM.js";import{n as m,t as h}from"./datePicker.module.scss-DX9bDRIx.js";import{l as Ie,n as g,t as _,u as v}from"./DocPage-JhXgs5p-.js";var y,b,Le,x,S;function C(){return(C=t((()=>{s(),se(),oe(),ge(),we(),pe(),xe(),_e(),ye(),Ee(),ke(),Me(),m(),y=e(n(),1),b=r(),Le=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],x=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":s,"aria-labelledby":ie,"aria-describedby":oe,id:se,required:f,readOnly:pe,invalid:ge,name:_e=`date-picker`,disabled:ye,clearable:xe=!0,size:we=`medium`,minDate:Ee,maxDate:ke,locale:Me,className:Ne=``,style:Pe,onOpenChange:Fe,...p})=>{let{t:m,language:Ie}=re(),g=(0,y.useId)(),_=fe(),v=he({id:se,"aria-describedby":oe}),x=ye??_?.disabled??!1,S=pe??_?.readOnly??!1,C=f??_?.required??!1,Re=ge??_?.invalid??!1,w=a??s??m(`datePicker.label`),T=ie??(_&&!a&&!s?_.labelId:void 0),[E,ze]=be({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[D,O]=be({defaultValue:!1,onChange:Fe,name:`DatePicker`,prop:`open`}),[k,A]=(0,y.useState)(null),[j,Be]=(0,y.useState)(null),[Ve,M]=(0,y.useState)(null),He=Ce(Be,e),Ue=(0,y.useRef)(null),N=Se(),We=u(E||``)??new Date,[P,F]=(0,y.useState)(()=>c(We)),[I,L]=(0,y.useState)(``),[R,z]=(0,y.useState)(!1),B=(0,y.useRef)(new Map),V=(0,y.useRef)(null),H=e=>!!(Ee&&e<Ee||ke&&e>ke),U=e=>{ze(e),r?.(e)},W=e=>{let t=u(e);t&&F(c(t))},Ge=e=>{if(A(e),e===``){U(``);return}let t=u(e,!0);if(t){let e=o(t);H(e)||(U(e),F(c(t)))}},Ke=()=>{if(k===null)return;let e=k.trim();if(e===``)E&&U(``);else{let t=u(e,!1);if(t){let e=o(t);!H(e)&&e!==E&&(U(e),F(c(t)))}}A(null)},G=()=>{A(null),U(``),j?.focus()},K=e=>{let t=o(e);x||S||H(t)||(A(null),U(t),F(c(e)),O(!1),j?.focus())},q=()=>{x||S||(z(!1),D||W(E),O(e=>!e))},J=c(P),qe=d(J,-((J.getDay()+6)%7)),Y=Array.from({length:42},(e,t)=>d(qe,t)),Je=Y.map(o),X=new Date,Z=o(X),Q=[I,E,l(X,P)?Z:``,o(J)].find(e=>e&&Je.includes(e)),$=o(J);(0,y.useEffect)(()=>{if(!D||x||!V.current)return;let e=B.current.get(V.current);e&&(V.current=null,e.focus())},[D,$,I,x]);let Ye=(e,t)=>{if(x||S)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||K(t);return}let n,r=(t.getDay()+6)%7;switch(ne(e.key,e.currentTarget)){case`ArrowLeft`:n=d(t,-1);break;case`ArrowRight`:n=d(t,1);break;case`ArrowUp`:n=d(t,-7);break;case`ArrowDown`:n=d(t,7);break;case`Home`:n=d(t,-r);break;case`End`:n=d(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=c(t,r),a=d(c(i,1),-1).getDate();n=ee(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=o(n);V.current=i,L(i),l(n,P)||F(c(n))},Xe=e=>{let t=e.currentTarget;!j||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Ae(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?j:je(j,N??j.ownerDocument.body,!1)??j).focus(),O(!1))},Ze=new Intl.DateTimeFormat(Me??Ie,{year:`numeric`,month:`long`}).format(J),Qe=k??E;return(0,b.jsxs)(`div`,{...Te(p),...de(`date-picker`,`root`,{state:D&&!x&&!S?`open`:`closed`,disabled:x,readonly:S,invalid:Re,size:we}),ref:M,className:te(h.datePicker,Ne),style:Pe,onClick:e=>{e.target===j&&q()},children:[(0,b.jsx)(me.Provider,{value:null,children:(0,b.jsx)(Oe,{ref:He,value:Qe,placeholder:i??m(`datePicker.placeholder`),id:v.id,"aria-label":w,"aria-labelledby":T,"aria-describedby":v[`aria-describedby`],"aria-invalid":Re||void 0,"aria-readonly":S||void 0,required:C,readOnly:S,onChange:e=>Ge(e.target.value),onBlur:Ke,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),D?Ue.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(W(E),L(E||Z),z(!0),O(!0)))},name:_e,disabled:x,size:we,suffix:xe&&E&&!x&&!S?(0,b.jsx)(De,{icon:(0,b.jsx)(ue,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":m(`datePicker.clear`),onClick:G,className:h.clearButton}):(0,b.jsx)(`span`,{className:h.calendarIcon,"aria-hidden":`true`,...de(`date-picker`,`icon`),children:(0,b.jsx)(le,{})})})}),(0,b.jsx)(ve,{ref:Ue,open:D&&!x&&!S,anchor:j,placement:`bottom-start`,branches:()=>[Ve],onDismiss:()=>O(!1),returnFocusOnEscape:()=>j,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":w,"aria-labelledby":T,className:h.popup,onKeyDown:Xe,...de(`date-picker`,`content`,{state:`open`}),children:(0,b.jsxs)(`div`,{className:h.panel,children:[(0,b.jsxs)(`div`,{className:h.header,children:[(0,b.jsx)(`h2`,{id:g,className:h.heading,"aria-live":`polite`,children:Ze}),(0,b.jsxs)(`div`,{className:h.navGroup,children:[(0,b.jsx)(`button`,{type:`button`,className:h.navButton,"aria-label":m(`monthCalendar.previousMonth`),onClick:()=>F(c(P,-1)),children:(0,b.jsx)(ae,{"aria-hidden":!0,focusable:!1})}),(0,b.jsx)(`button`,{type:`button`,className:h.navButton,"aria-label":m(`monthCalendar.nextMonth`),onClick:()=>F(c(P,1)),children:(0,b.jsx)(ce,{"aria-hidden":!0,focusable:!1})})]})]}),(0,b.jsxs)(`div`,{role:`grid`,"aria-labelledby":g,className:h.grid,children:[(0,b.jsx)(`div`,{role:`row`,className:h.week,children:Le.map(e=>(0,b.jsx)(`div`,{role:`columnheader`,className:h.weekday,children:m(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,b.jsx)(`div`,{role:`row`,className:h.week,children:Y.slice(t*7,t*7+7).map(e=>{let t=o(e),n=E===t,r=!l(e,P),i=t===Z,a=H(t);return(0,b.jsx)(`div`,{role:`gridcell`,className:h.day,ref:e=>{e?(B.current.set(t,e),(R&&t===Q||V.current===t)&&(V.current=null,e.focus())):B.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===Q?0:-1,onFocus:()=>L(t),onClick:()=>K(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,b.jsxs)(`div`,{className:h.footer,children:[(0,b.jsx)(`button`,{type:`button`,className:h.footerButton,disabled:H(Z),onClick:()=>K(X),children:m(`datePicker.today`)}),xe&&E&&(0,b.jsx)(`button`,{type:`button`,className:h.footerButton,onClick:()=>{G(),O(!1)},children:m(`datePicker.clear`)})]})]})})]})},S=y.memo(x)})))()}function Re(){let[e,t]=(0,w.useState)(``);return(0,T.jsxs)(`div`,{style:{maxWidth:280},children:[(0,T.jsx)(S,{onChange:t}),(0,T.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var w,T;function E(){return(E=t((()=>{w=n(),C(),T=r()})))()}function ze(){let[e,t]=(0,D.useState)(`2026-04-17`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,O.jsx)(S,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,O.jsx)(f,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,O.jsx)(f,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,O.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var D,O;function k(){return(k=t((()=>{D=n(),ie(),C(),O=r()})))()}function A(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,j.jsx)(S,{defaultValue:`2026-04-17`}),(0,j.jsx)(S,{defaultValue:`2026-04-17`,clearable:!1})]})}var j;function Be(){return(Be=t((()=>{C(),j=r()})))()}function Ve(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,M.jsx)(S,{defaultValue:`2026-04-17`,disabled:!0}),(0,M.jsx)(S,{defaultValue:`2026-04-17`,readOnly:!0})]})}var M;function He(){return(He=t((()=>{C(),M=r()})))()}function Ue(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,N.jsx)(Pe,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,N.jsx)(S,{})}),(0,N.jsx)(Pe,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,N.jsx)(S,{defaultValue:`2026-01-01`})})]})}var N;function We(){return(We=t((()=>{C(),Ne(),N=r()})))()}function P(){return(0,F.jsx)(`div`,{style:{maxWidth:280},children:(0,F.jsx)(S,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var F;function I(){return(I=t((()=>{C(),F=r()})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,R.jsx)(S,{size:`small`,placeholder:`Small`}),(0,R.jsx)(S,{size:`medium`,placeholder:`Medium`}),(0,R.jsx)(S,{size:`large`,placeholder:`Large`})]})}var R;function z(){return(z=t((()=>{C(),R=r()})))()}var B;function V(){return(V=t((()=>{B=`import { useState } from "react";
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
`})))()}var X,Z,Q;function $(){return($=t((()=>{E(),k(),Be(),He(),We(),I(),z(),V(),U(),Ge(),G(),q(),qe(),Je(),n(),a(),g(),v(),Fe(),X=r(),Z=Ie(Object.assign({"./demos/basic.tsx":Re,"./demos/controlled.tsx":ze,"./demos/default-value.tsx":A,"./demos/disabled.tsx":Ve,"./demos/form-control.tsx":Ue,"./demos/min-max.tsx":P,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":B,"./demos/controlled.tsx":H,"./demos/default-value.tsx":W,"./demos/disabled.tsx":Ke,"./demos/form-control.tsx":K,"./demos/min-max.tsx":J,"./demos/sizes.tsx":Y})),Q=()=>{let{t:e}=i();return(0,X.jsx)(_,{id:`date-picker`,demos:Z,children:(0,X.jsxs)(`section`,{className:p.section,"aria-labelledby":`keyboard`,children:[(0,X.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,X.jsxs)(`ul`,{className:p.prose,children:[(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,X.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}$();export{Q as default};