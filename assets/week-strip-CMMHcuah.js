import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ft as r,L as i,Z as a,er as o,gt as s,mn as c,st as ee}from"./angular-preview-DXAccp5O.js";import{B as te,S as ne,T as re,V as ie,g as ae}from"./ProgressIndicator-DMdtmsv7.js";import{t as l}from"./stylingHooks-PqiNJdev.js";import{$ as u,St as d,xt as oe}from"./io5-nkQQnVMp.js";import{n as f,t as p}from"./weekStrip.module.scss-DPhYFxV1.js";import{l as m,n as se,t as h,u as g}from"./DocPage-tb4CAOXP.js";var _,v,ce,y,b;function x(){return(x=e((()=>{c(),ie(),re(),d(),u(),p(),_=t(),v=n(),ce=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],y=e=>typeof e==`number`&&Number.isFinite(e)&&e>0?Math.floor(e):0,b=({value:e,defaultValue:t,onChange:n,week:c,defaultWeek:re,onWeekChange:ie,firstDayOfWeek:u=1,today:d,markers:p,getDayLabel:m,showNavigation:se=!1,previousWeekLabel:h,nextWeekLabel:g,weekdayLabels:b,locale:x,disabled:S=!1,size:C=`medium`,"aria-label":w,className:T,ref:E})=>{let{t:D,language:O}=te(),k=d&&s(d)?d:o(new Date),[A,j]=oe({value:e,defaultValue:t,onChange:e=>{e!==void 0&&n?.(e)},name:`WeekStrip`}),[M,N]=oe({value:c,defaultValue:()=>r(re??s(e??t??``)??s(k)??new Date,u),onChange:ie,name:`WeekStrip`,prop:`week`}),[P,F]=(0,_.useState)(``),I=(0,_.useRef)(new Map),L=(0,_.useRef)(null),R=r(M,u),z=o(R),B=Array.from({length:7},(e,t)=>a(R,t)),V=B.map(o),H=[P,A,k].find(e=>e&&V.includes(e))??z,U=e=>{let t=r(e,u);o(t)!==z&&N(t)},W=(0,_.useRef)(A);(0,_.useEffect)(()=>{if(W.current===A)return;W.current=A;let e=A?s(A):null;c===void 0&&e&&U(e)}),(0,_.useEffect)(()=>{if(S||!L.current)return;let e=I.current.get(L.current);e&&(L.current=null,e.focus())},[z,P,S]);let G=e=>{S||(j(o(e)),U(e))},K=(e,t)=>{if(S)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||G(t);return}let n;switch(i(e.key,e.currentTarget)){case`ArrowLeft`:n=a(t,-1);break;case`ArrowRight`:n=a(t,1);break;case`Home`:n=R;break;case`End`:n=B[6];break;case`PageUp`:n=a(t,-7);break;case`PageDown`:n=a(t,7);break;default:return}e.preventDefault(),L.current=o(n),F(o(n)),U(n)},q=x??O,J=new Intl.DateTimeFormat(q,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}),Y=new Intl.DateTimeFormat(q,{year:`numeric`,month:`long`}),X=B[6],Z=R.getMonth()===X.getMonth()?Y.format(R):`${new Intl.DateTimeFormat(q,{month:`long`,...R.getFullYear()!==X.getFullYear()&&{year:`numeric`}}).format(R)} – ${Y.format(X)}`,Q=(e,t)=>{let n=p?.[e];if(m)return m(e,n);let r=J.format(t),i=y(n);return i?D(`weekStrip.dayWithMarkers`,{date:r,count:i}):n===!0?D(`weekStrip.dayMarked`,{date:r}):r},$=(0,v.jsx)(`div`,{role:`listbox`,"aria-label":w??D(`weekStrip.label`),"aria-orientation":`horizontal`,"aria-disabled":S||void 0,className:f.days,...l(`week-strip`,`list`),children:B.map(e=>{let t=o(e),n=A===t,r=t===k,i=p?.[t],a=y(i),s=ce[(e.getDay()+6)%7];return(0,v.jsxs)(`div`,{role:`option`,ref:e=>{e?I.current.set(t,e):I.current.delete(t)},className:f.day,...l(`week-strip`,`day`,{selected:n,today:r,disabled:S}),"data-date":t,"aria-label":Q(t,e),"aria-selected":n,"aria-current":r?`date`:void 0,"aria-disabled":S||void 0,tabIndex:!S&&t===H?0:-1,onFocus:()=>F(t),onClick:()=>G(e),onKeyDown:t=>K(t,e),children:[(0,v.jsx)(`span`,{className:f.weekday,"aria-hidden":!0,children:b?.[(e.getDay()+6)%7]??D(`monthCalendar.weekdays.${s}`)}),(0,v.jsx)(`span`,{className:f.dayNumber,"aria-hidden":!0,children:e.getDate()}),(0,v.jsx)(`span`,{className:ee(f.marker,a>0&&f.count,!a&&i===!0&&f.dot),...l(`week-strip`,`indicator`),"aria-hidden":!0,children:a?a>99?`99+`:a:null})]},t)})});return(0,v.jsxs)(`div`,{ref:E,className:ee(f.weekStrip,f[C],T),...l(`week-strip`,`root`,{disabled:S,size:C}),children:[se?(0,v.jsxs)(`div`,{className:f.toolbar,children:[(0,v.jsx)(`button`,{type:`button`,className:f.navButton,"aria-label":h??D(`weekStrip.previousWeek`),disabled:S,...l(`week-strip`,`nav-button`),onClick:()=>U(a(R,-7)),children:(0,v.jsx)(ne,{"aria-hidden":!0,focusable:!1})}),(0,v.jsx)(`span`,{className:f.heading,"aria-live":`polite`,...l(`week-strip`,`heading`),children:Z}),(0,v.jsx)(`button`,{type:`button`,className:f.navButton,"aria-label":g??D(`weekStrip.nextWeek`),disabled:S,...l(`week-strip`,`nav-button`),onClick:()=>U(a(R,7)),children:(0,v.jsx)(ae,{"aria-hidden":!0,focusable:!1})})]}):null,$]})}})))()}function S(){let[e,t]=(0,C.useState)(D);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:480},children:[(0,w.jsx)(b,{value:e,onChange:t,"aria-label":`Study days`}),(0,w.jsxs)(`p`,{style:{margin:0},children:[`Selected: `,e]})]})}var C,w,T,E,D;function O(){return(O=e((()=>{C=t(),x(),w=n(),T=e=>String(e).padStart(2,`0`),E=new Date,D=`${E.getFullYear()}-${T(E.getMonth()+1)}-${T(E.getDate())}`})))()}function k(){return(0,A.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:480},children:[(0,A.jsx)(b,{defaultValue:N(0),markers:P}),(0,A.jsx)(b,{defaultValue:N(0),markers:P,firstDayOfWeek:0,getDayLabel:(e,t)=>typeof t==`number`?`${e}: ${t} tasks`:t?`${e}: reminder`:e,"aria-label":`Tasks this week (Sunday first)`})]})}var A,j,M,N,P;function F(){return(F=e((()=>{x(),A=n(),j=e=>String(e).padStart(2,`0`),M=e=>`${e.getFullYear()}-${j(e.getMonth()+1)}-${j(e.getDate())}`,N=e=>{let t=new Date;return t.setDate(t.getDate()+e),M(t)},P={[N(-1)]:2,[N(0)]:3,[N(1)]:!0,[N(3)]:1}})))()}function I(){let[e,t]=(0,L.useState)(),[n,r]=(0,L.useState)(()=>new Date);return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:480},children:[(0,R.jsx)(b,{showNavigation:!0,value:e,onChange:t,week:n,onWeekChange:r}),(0,R.jsxs)(`p`,{style:{margin:0},children:[`Week of `,n.toLocaleDateString(),e?` · selected ${e}`:``]})]})}var L,R;function z(){return(z=e((()=>{L=t(),x(),R=n()})))()}function B(){return(0,V.jsxs)(`div`,{style:{display:`grid`,gap:24,maxWidth:480},children:[(0,V.jsx)(b,{size:`small`,markers:H,"aria-label":`Small week`}),(0,V.jsx)(b,{markers:H,"aria-label":`Medium week`}),(0,V.jsx)(b,{size:`large`,markers:H,"aria-label":`Large week`}),(0,V.jsx)(b,{disabled:!0,markers:H,"aria-label":`Disabled week`})]})}var V,H;function U(){return(U=e((()=>{x(),V=n(),H=(()=>{let e=new Date,t=e=>String(e).padStart(2,`0`);return{[`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`]:4}})()})))()}var W;function G(){return(G=e((()=>{W=`import { useState } from "react";
import { WeekStrip } from "minerva-design";

const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const today = \`\${now.getFullYear()}-\${pad(now.getMonth() + 1)}-\${pad(now.getDate())}\`;

export default function BasicDemo() {
  const [value, setValue] = useState(today);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <WeekStrip value={value} onChange={setValue} aria-label="Study days" />
      <p style={{ margin: 0 }}>Selected: {value}</p>
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { WeekStrip } from "minerva-design";

const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return key(date);
};

// A number shows a count badge, true shows a dot
const markers = {
  [inDays(-1)]: 2,
  [inDays(0)]: 3,
  [inDays(1)]: true,
  [inDays(3)]: 1,
};

export default function MarkersDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <WeekStrip defaultValue={inDays(0)} markers={markers} />
      <WeekStrip
        defaultValue={inDays(0)}
        markers={markers}
        firstDayOfWeek={0}
        getDayLabel={(day, marker) =>
          typeof marker === "number"
            ? \`\${day}: \${marker} tasks\`
            : marker
              ? \`\${day}: reminder\`
              : day
        }
        aria-label="Tasks this week (Sunday first)"
      />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useState } from "react";
import { WeekStrip } from "minerva-design";

export default function NavigationDemo() {
  const [value, setValue] = useState<string>();
  const [week, setWeek] = useState(() => new Date());

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <WeekStrip
        showNavigation
        value={value}
        onChange={setValue}
        week={week}
        onWeekChange={setWeek}
      />
      <p style={{ margin: 0 }}>
        Week of {week.toLocaleDateString()}
        {value ? \` · selected \${value}\` : ""}
      </p>
    </div>
  );
}
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { WeekStrip } from "minerva-design";

const markers = (() => {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    [\`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`]: 4,
  };
})();

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <WeekStrip size="small" markers={markers} aria-label="Small week" />
      <WeekStrip markers={markers} aria-label="Medium week" />
      <WeekStrip size="large" markers={markers} aria-label="Large week" />
      <WeekStrip disabled markers={markers} aria-label="Disabled week" />
    </div>
  );
}
`})))()}var Q,$,le;function ue(){return(ue=e((()=>{O(),F(),z(),U(),G(),q(),Y(),Z(),t(),se(),g(),Q=n(),$=m(Object.assign({"./demos/basic.tsx":S,"./demos/markers.tsx":k,"./demos/navigation.tsx":I,"./demos/sizes.tsx":B}),Object.assign({"./demos/basic.tsx":W,"./demos/markers.tsx":K,"./demos/navigation.tsx":J,"./demos/sizes.tsx":X})),le=()=>(0,Q.jsx)(h,{id:`week-strip`,demos:$})})))()}ue();export{le as default};