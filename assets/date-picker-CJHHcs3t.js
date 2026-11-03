import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{n as i,t as a}from"./useTranslation-cnaiU8lD.js";import{An as o,Et as ee,Gt as te,W as ne,Zt as s,_t as c,at as l,gr as u,wt as d}from"./angular-preview-BpSZEUAh.js";import{B as re,R as ie,S as ae,T as oe,V as se,g as ce,r as le,w as ue,z as f}from"./ProgressIndicator-Cb-rwq_6.js";import{t as de}from"./stylingHooks-PqiNJdev.js";import{i as fe,n as pe,r as me,t as he}from"./context-ESLv39g4.js";import{$ as ge,Q as _e,St as ve,Tt as ye,Z as be,ct as xe,st as Se,wt as Ce,xt as we}from"./io5-CKBSkZ-c.js";import{t as Te}from"./dataAttributes-CDHeJa9q.js";import{i as Ee,r as De}from"./CodeBlock-B78Bjupm.js";import{n as Oe,t as ke}from"./Input-DXlE9Ewg.js";import{n as Ae,r as je,t as Me}from"./tabbing-Cg0WP6-s.js";import{a as Ne,r as Pe}from"./FormControl-DmxBuS79.js";import{i as Fe,r as p}from"./DemoBlock-8y3JioRL.js";import{n as m,t as h}from"./datePicker.module.scss-DX9bDRIx.js";import{l as Ie,n as g,t as _,u as v}from"./DocPage-BwFTDz_-.js";var y,b,Le,x,S;function C(){return(C=t((()=>{o(),se(),oe(),Ce(),ve(),pe(),Se(),ge(),_e(),Ee(),ke(),Me(),m(),y=e(n(),1),b=r(),Le=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],x=({ref:e,value:t,defaultValue:n,onChange:r,placeholder:i,label:a,"aria-label":o,"aria-labelledby":ie,"aria-describedby":oe,id:se,required:f,readOnly:pe,invalid:ge,name:_e=`date-picker`,disabled:ve,clearable:Se=!0,size:Ce=`medium`,minDate:Ee,maxDate:ke,locale:Me,className:Ne=``,style:Pe,onOpenChange:Fe,...p})=>{let{t:m,language:Ie}=re(),g=(0,y.useId)(),_=fe(),v=he({id:se,"aria-describedby":oe}),x=ve??_?.disabled??!1,S=pe??_?.readOnly??!1,C=f??_?.required??!1,Re=ge??_?.invalid??!1,w=a??o??m(`datePicker.label`),T=ie??(_&&!a&&!o?_.labelId:void 0),[E,ze]=we({value:t===null?``:t,defaultValue:n??``,name:`DatePicker`}),[D,O]=we({defaultValue:!1,onChange:Fe,name:`DatePicker`,prop:`open`}),[k,A]=(0,y.useState)(null),[j,Be]=(0,y.useState)(null),[Ve,M]=(0,y.useState)(null),He=ye(Be,e),Ue=(0,y.useRef)(null),N=xe(),We=d(E||``)??new Date,[P,F]=(0,y.useState)(()=>s(We)),[I,L]=(0,y.useState)(``),[R,z]=(0,y.useState)(!1),B=(0,y.useRef)(new Map),V=(0,y.useRef)(null),H=e=>!!(Ee&&e<Ee||ke&&e>ke),U=e=>{ze(e),r?.(e)},W=e=>{let t=d(e);t&&F(s(t))},Ge=e=>{if(A(e),e===``){U(``);return}let t=d(e,!0);if(t){let e=u(t);H(e)||(U(e),F(s(t)))}},Ke=()=>{if(k===null)return;let e=k.trim();if(e===``)E&&U(``);else{let t=d(e,!1);if(t){let e=u(t);!H(e)&&e!==E&&(U(e),F(s(t)))}}A(null)},G=()=>{A(null),U(``),j?.focus()},K=e=>{let t=u(e);x||S||H(t)||(A(null),U(t),F(s(e)),O(!1),j?.focus())},q=()=>{x||S||(z(!1),D||W(E),O(e=>!e))},J=s(P),qe=l(J,-((J.getDay()+6)%7)),Y=Array.from({length:42},(e,t)=>l(qe,t)),X=Y.map(u),Z=new Date,Q=u(Z),$=[I,E,c(Z,P)?Q:``,u(J),...X].find(e=>e&&X.includes(e)&&!H(e)),Je=u(J);(0,y.useEffect)(()=>{if(!D||x||!V.current)return;let e=B.current.get(V.current);e&&(V.current=null,e.focus())},[D,Je,I,x]);let Ye=(e,t)=>{if(x||S)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||K(t);return}let n,r=(t.getDay()+6)%7;switch(ne(e.key,e.currentTarget)){case`ArrowLeft`:n=l(t,-1);break;case`ArrowRight`:n=l(t,1);break;case`ArrowUp`:n=l(t,-7);break;case`ArrowDown`:n=l(t,7);break;case`Home`:n=l(t,-r);break;case`End`:n=l(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=s(t,r),a=l(s(i,1),-1).getDate();n=te(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault();let i=u(n);V.current=i,L(i),c(n,P)||F(s(n))},Xe=e=>{let t=e.currentTarget;!j||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||!Ae(t,e.target,e.shiftKey)||(e.preventDefault(),(e.shiftKey?j:je(j,N??j.ownerDocument.body,!1)??j).focus(),O(!1))},Ze=new Intl.DateTimeFormat(Me??Ie,{year:`numeric`,month:`long`}).format(J),Qe=k??E;return(0,b.jsxs)(`div`,{...Te(p),...de(`date-picker`,`root`,{state:D&&!x&&!S?`open`:`closed`,disabled:x,readonly:S,invalid:Re,size:Ce}),ref:M,className:ee(h.datePicker,Ne),style:Pe,onClick:e=>{e.target===j&&q()},children:[(0,b.jsx)(me.Provider,{value:null,children:(0,b.jsx)(Oe,{ref:He,value:Qe,placeholder:i??m(`datePicker.placeholder`),id:v.id,"aria-label":w,"aria-labelledby":T,"aria-describedby":v[`aria-describedby`],"aria-invalid":Re||void 0,"aria-readonly":S||void 0,required:C,readOnly:S,onChange:e=>Ge(e.target.value),onBlur:Ke,onKeyDown:e=>{e.key===`ArrowDown`&&(e.preventDefault(),D?Ue.current?.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus():(W(E),L(E||Q),z(!0),O(!0)))},name:_e,disabled:x,size:Ce,suffix:Se&&E&&!x&&!S?(0,b.jsx)(De,{icon:(0,b.jsx)(ue,{"aria-hidden":!0,focusable:!1}),size:`small`,"aria-label":m(`datePicker.clear`),onClick:G,className:h.clearButton}):(0,b.jsx)(`span`,{className:h.calendarIcon,"aria-hidden":`true`,...de(`date-picker`,`icon`),children:(0,b.jsx)(le,{})})})}),(0,b.jsx)(be,{ref:Ue,open:D&&!x&&!S,anchor:j,placement:`bottom-start`,branches:()=>[Ve],onDismiss:()=>O(!1),returnFocusOnEscape:()=>j,focusable:!0,role:`dialog`,tabIndex:-1,"aria-label":w,"aria-labelledby":T,className:h.popup,onKeyDown:Xe,...de(`date-picker`,`content`,{state:`open`}),children:(0,b.jsxs)(`div`,{className:h.panel,children:[(0,b.jsxs)(`div`,{className:h.header,children:[(0,b.jsx)(`h2`,{id:g,className:h.heading,"aria-live":`polite`,children:Ze}),(0,b.jsxs)(`div`,{className:h.navGroup,children:[(0,b.jsx)(`button`,{type:`button`,className:h.navButton,"aria-label":m(`monthCalendar.previousMonth`),onClick:()=>F(s(P,-1)),children:(0,b.jsx)(ae,{"aria-hidden":!0,focusable:!1})}),(0,b.jsx)(`button`,{type:`button`,className:h.navButton,"aria-label":m(`monthCalendar.nextMonth`),onClick:()=>F(s(P,1)),children:(0,b.jsx)(ce,{"aria-hidden":!0,focusable:!1})})]})]}),(0,b.jsxs)(`div`,{role:`grid`,"aria-labelledby":g,className:h.grid,children:[(0,b.jsx)(`div`,{role:`row`,className:h.week,children:Le.map(e=>(0,b.jsx)(`div`,{role:`columnheader`,className:h.weekday,children:m(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,b.jsx)(`div`,{role:`row`,className:h.week,children:Y.slice(t*7,t*7+7).map(e=>{let t=u(e),n=E===t,r=!c(e,P),i=t===Q,a=H(t);return(0,b.jsx)(`div`,{role:`gridcell`,className:h.day,ref:e=>{e?(B.current.set(t,e),(R&&t===$||V.current===t)&&(V.current=null,e.focus())):B.current.delete(t)},"data-date":t,"data-outside":r?``:void 0,"aria-label":t,"aria-selected":n,"aria-current":i?`date`:void 0,"aria-disabled":a||void 0,tabIndex:!a&&t===$?0:-1,onFocus:()=>L(t),onClick:()=>K(e),onKeyDown:t=>Ye(t,e),children:e.getDate()},t)})},t))]}),(0,b.jsxs)(`div`,{className:h.footer,children:[(0,b.jsx)(`button`,{type:`button`,className:h.footerButton,disabled:H(Q),onClick:()=>K(Z),children:m(`datePicker.today`)}),Se&&E&&(0,b.jsx)(`button`,{type:`button`,className:h.footerButton,onClick:()=>{G(),O(!1)},children:m(`datePicker.clear`)})]})]})})]})},S=y.memo(x)})))()}function Re(){let[e,t]=(0,w.useState)(``);return(0,T.jsxs)(`div`,{style:{maxWidth:280},children:[(0,T.jsx)(S,{onChange:t}),(0,T.jsxs)(`p`,{children:[`Selected: `,e||`none`]})]})}var w,T;function E(){return(E=t((()=>{w=n(),C(),T=r()})))()}function ze(){let[e,t]=(0,D.useState)(`2026-04-17`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,justifyItems:`start`,maxWidth:280},children:[(0,O.jsx)(S,{label:`Target date`,value:e,onChange:e=>t(e||null)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,O.jsx)(f,{size:`small`,onClick:()=>t(`2026-05-01`),children:`Set to 2026-05-01`}),(0,O.jsx)(f,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t(null),children:`Reset`})]}),(0,O.jsxs)(`p`,{children:[`Value: `,e??`null`]})]})}var D,O;function k(){return(k=t((()=>{D=n(),ie(),C(),O=r()})))()}function A(){return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,j.jsx)(S,{defaultValue:`2026-04-17`}),(0,j.jsx)(S,{defaultValue:`2026-04-17`,clearable:!1})]})}var j;function Be(){return(Be=t((()=>{C(),j=r()})))()}function Ve(){return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,M.jsx)(S,{defaultValue:`2026-04-17`,disabled:!0}),(0,M.jsx)(S,{defaultValue:`2026-04-17`,readOnly:!0})]})}var M;function He(){return(He=t((()=>{C(),M=r()})))()}function Ue(){return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:16,maxWidth:320},children:[(0,N.jsx)(Pe,{label:`Start date`,helperText:`Format: YYYY-MM-DD`,required:!0,children:(0,N.jsx)(S,{})}),(0,N.jsx)(Pe,{label:`Deadline`,errorMessage:`Please choose a date in the future.`,children:(0,N.jsx)(S,{defaultValue:`2026-01-01`})})]})}var N;function We(){return(We=t((()=>{C(),Ne(),N=r()})))()}function P(){return(0,F.jsx)(`div`,{style:{maxWidth:280},children:(0,F.jsx)(S,{defaultValue:`2026-04-15`,minDate:`2026-04-10`,maxDate:`2026-04-20`,placeholder:`2026-04-10 – 2026-04-20`})})}var F;function I(){return(I=t((()=>{C(),F=r()})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:280},children:[(0,R.jsx)(S,{size:`small`,placeholder:`Small`}),(0,R.jsx)(S,{size:`medium`,placeholder:`Medium`}),(0,R.jsx)(S,{size:`large`,placeholder:`Large`})]})}var R;function z(){return(z=t((()=>{C(),R=r()})))()}var B;function V(){return(V=t((()=>{B=`import { useState } from "react";
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
`})))()}var Y;function X(){return(X=t((()=>{Y=`import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}
`})))()}var Z,Q,$;function Je(){return(Je=t((()=>{E(),k(),Be(),He(),We(),I(),z(),V(),U(),Ge(),G(),q(),qe(),X(),n(),a(),g(),v(),Fe(),Z=r(),Q=Ie(Object.assign({"./demos/basic.tsx":Re,"./demos/controlled.tsx":ze,"./demos/default-value.tsx":A,"./demos/disabled.tsx":Ve,"./demos/form-control.tsx":Ue,"./demos/min-max.tsx":P,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":B,"./demos/controlled.tsx":H,"./demos/default-value.tsx":W,"./demos/disabled.tsx":Ke,"./demos/form-control.tsx":K,"./demos/min-max.tsx":J,"./demos/sizes.tsx":Y})),$=()=>{let{t:e}=i();return(0,Z.jsx)(_,{id:`date-picker`,demos:Q,children:(0,Z.jsxs)(`section`,{className:p.section,"aria-labelledby":`keyboard`,children:[(0,Z.jsx)(`h2`,{id:`keyboard`,children:e(`docs.date-picker.keyboard.title`)}),(0,Z.jsxs)(`ul`,{className:p.prose,children:[(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.open`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.navigate`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.select`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.close`)}),(0,Z.jsx)(`li`,{children:e(`docs.date-picker.keyboard.typing`)})]})]})})}})))()}Je();export{$ as default};