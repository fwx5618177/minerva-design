import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{G as r,Gt as i,Mn as a,Yt as o,ht as s,pt as c,qt as ee,rt as l}from"./angular-preview-B7Uzpk8P.js";import{B as te,S as ne,T as u,V as re,g as ie,r as ae}from"./ProgressIndicator-CLQ5GhV8.js";import{t as d}from"./stylingHooks-PqiNJdev.js";import{$ as f,St as p,xt as oe}from"./io5-BsjRfO9T.js";import{n as m,t as h}from"./monthCalendar.module.scss-DpCTSlwr.js";import{l as g,n as _,t as v,u as y}from"./DocPage-B3QbO8Wp.js";var b,x,se,ce,S,C;function w(){return(w=e((()=>{a(),re(),u(),p(),f(),h(),b=t(),x=n(),se=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],ce=[],S=/^\d{4}-\d{2}-\d{2}$/,C=({month:e,defaultMonth:t,onMonthChange:n,value:a,defaultValue:u,onChange:re,events:f=ce,onEventClick:p,rangeStart:h,rangeEnd:g,size:_=`medium`,disabled:v=!1,showSelectedDayEvents:y=!0,"aria-label":C,previousMonthLabel:w,nextMonthLabel:le,todayLabel:T,emptyEventsText:E,locale:D,weekdayLabels:O,getDayLabel:k,getEventsLabel:A,className:j,ref:M})=>{let{t:N,language:P}=te(),F=(0,b.useId)(),[I,L]=oe({value:e,defaultValue:()=>o(t??new Date),onChange:n,name:`MonthCalendar`,prop:`month`}),[R,z]=oe({value:a,defaultValue:u,onChange:e=>{e!==void 0&&re?.(e)},name:`MonthCalendar`}),[B,V]=(0,b.useState)(``),H=(0,b.useRef)(new Map),U=(0,b.useRef)(null),W=o(I),G=i(W,-((W.getDay()+6)%7)),K=Array.from({length:42},(e,t)=>i(G,t)),q=K.map(s),J=new Date,Y=s(J),ue=[B,R,c(J,I)?Y:``,s(W)].find(e=>e&&q.includes(e)),de=s(W),X=new Map;for(let e of f)X.set(e.date,(X.get(e.date)??0)+1);let Z=f.filter(e=>e.date===R),Q=h&&g&&S.test(h)&&S.test(g)?[h,g].sort():void 0;(0,b.useEffect)(()=>{if(v||!U.current)return;let e=H.current.get(U.current);e&&(U.current=null,e.focus())},[de,B,v]);let $=e=>L(o(e)),fe=e=>{v||(z(s(e)),c(e,I)||$(e))},pe=(e,t)=>{if(v)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||fe(t);return}let n,a=(t.getDay()+6)%7;switch(r(e.key,e.currentTarget)){case`ArrowLeft`:n=i(t,-1);break;case`ArrowRight`:n=i(t,1);break;case`ArrowUp`:n=i(t,-7);break;case`ArrowDown`:n=i(t,7);break;case`Home`:n=i(t,-a);break;case`End`:n=i(t,6-a);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),a=o(t,r),s=i(o(a,1),-1).getDate();n=ee(a.getFullYear(),a.getMonth(),Math.min(t.getDate(),s));break}default:return}e.preventDefault(),U.current=s(n),V(s(n)),c(n,I)||$(n)},me=new Intl.DateTimeFormat(D??P,{year:`numeric`,month:`long`}).format(W);return(0,x.jsxs)(`section`,{ref:M,className:l(m.monthCalendar,m[_],j),"aria-label":C??N(`monthCalendar.label`),...d(`month-calendar`,`root`,{disabled:v,size:_}),children:[(0,x.jsxs)(`div`,{className:m.toolbar,children:[(0,x.jsx)(`h2`,{id:F,className:m.heading,"aria-live":`polite`,...d(`month-calendar`,`heading`),children:me}),(0,x.jsxs)(`div`,{className:m.navigation,children:[(0,x.jsx)(`button`,{type:`button`,className:l(m.navButton,m.iconButton),"aria-label":w??N(`monthCalendar.previousMonth`),disabled:v,...d(`month-calendar`,`nav-button`),onClick:()=>$(o(I,-1)),children:(0,x.jsx)(ne,{"aria-hidden":!0,focusable:!1})}),(0,x.jsxs)(`button`,{type:`button`,className:m.navButton,disabled:v,...d(`month-calendar`,`nav-button`),onClick:()=>$(new Date),children:[(0,x.jsx)(ae,{"aria-hidden":!0,focusable:!1}),T??N(`monthCalendar.today`)]}),(0,x.jsx)(`button`,{type:`button`,className:l(m.navButton,m.iconButton),"aria-label":le??N(`monthCalendar.nextMonth`),disabled:v,...d(`month-calendar`,`nav-button`),onClick:()=>$(o(I,1)),children:(0,x.jsx)(ie,{"aria-hidden":!0,focusable:!1})})]})]}),(0,x.jsxs)(`div`,{role:`grid`,"aria-labelledby":F,"aria-disabled":v||void 0,className:m.grid,...d(`month-calendar`,`grid`),children:[(0,x.jsx)(`div`,{role:`row`,className:m.week,children:se.map((e,t)=>(0,x.jsx)(`div`,{role:`columnheader`,className:m.weekday,children:O?.[t]??N(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,x.jsx)(`div`,{role:`row`,className:m.week,children:K.slice(t*7,t*7+7).map(e=>{let t=s(e),n=X.get(t)??0,r=R===t,i=!c(e,I),a=t===Y,o=!!Q&&t>=Q[0]&&t<=Q[1];return(0,x.jsxs)(`div`,{role:`gridcell`,className:l(m.day,o&&m.inRange,o&&t===Q?.[0]&&m.rangeStart,o&&t===Q?.[1]&&m.rangeEnd),...d(`month-calendar`,`day`,{selected:r,today:a,outside:i,disabled:v}),ref:e=>{e?H.current.set(t,e):H.current.delete(t)},"data-date":t,"aria-label":k?k(t,n):n?N(`monthCalendar.dayWithEvents`,{date:t,count:n}):t,"aria-selected":r,"aria-current":a?`date`:void 0,"aria-disabled":v||void 0,tabIndex:!v&&t===ue?0:-1,onFocus:()=>V(t),onClick:()=>fe(e),onKeyDown:t=>pe(t,e),children:[(0,x.jsx)(`span`,{className:m.dayNumber,children:e.getDate()}),(0,x.jsx)(`span`,{className:l(m.count,n>0&&m.hasEvents),"aria-hidden":!0,children:n?n>99?`99+`:n:` `})]},t)})},t))]}),y&&R&&(0,x.jsxs)(`section`,{className:m.events,...d(`month-calendar`,`events`),"aria-label":A?A(R):N(`monthCalendar.eventsLabel`,{date:R}),children:[(0,x.jsx)(`h3`,{className:m.eventsHeading,children:R}),Z.length?(0,x.jsx)(`ul`,{className:m.eventList,children:Z.map(e=>(0,x.jsx)(`li`,{className:m.eventItem,children:p?(0,x.jsx)(`button`,{type:`button`,className:m.eventButton,...d(`month-calendar`,`event`),disabled:v,onClick:()=>p(e),children:e.title}):(0,x.jsx)(`span`,{...d(`month-calendar`,`event`),children:e.title})},e.id))}):(0,x.jsx)(`p`,{className:m.empty,...d(`month-calendar`,`empty`),children:E??N(`monthCalendar.noEvents`)})]})]})}})))()}function le(){let[e,t]=(0,T.useState)(O(3)),[n,r]=(0,T.useState)(``);return(0,E.jsxs)(`div`,{style:{maxWidth:560},children:[(0,E.jsx)(C,{value:e,onChange:t,events:k,onEventClick:e=>r(e.title)}),n&&(0,E.jsxs)(`p`,{children:[`Clicked: `,n]})]})}var T,E,D,O,k;function A(){return(A=e((()=>{T=t(),w(),E=n(),D=new Date,O=e=>`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,k=[{id:`1`,date:O(3),title:`Release v2.0`},{id:`2`,date:O(3),title:`Retrospective`},{id:`3`,date:O(12),title:`Design review`}]})))()}function j(){let[e,t]=(0,M.useState)([`2026-03-09`,`2026-03-13`]),[n,r]=e;return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,N.jsx)(C,{defaultMonth:new Date(2026,2,1),value:r??n,onChange:e=>t(r===void 0?[n,e]:[e]),rangeStart:n,rangeEnd:r??n,events:P,showSelectedDayEvents:!1}),(0,N.jsx)(`output`,{children:r===void 0?`From ${n}: pick the last day`:`From ${[n,r].sort().join(` to `)}`})]})}var M,N,P;function F(){return(F=e((()=>{M=t(),w(),N=n(),P=[{id:`1`,date:`2026-03-10`,title:`Offsite day 1`},{id:`2`,date:`2026-03-11`,title:`Offsite day 2`}]})))()}function I(){return(0,L.jsxs)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,alignItems:`start`},children:[(0,L.jsx)(C,{size:`small`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:R,showSelectedDayEvents:!1,"aria-label":`Compact calendar`}),(0,L.jsx)(C,{size:`large`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:R,"aria-label":`Comfortable calendar`})]})}var L,R;function z(){return(z=e((()=>{w(),L=n(),R=[{id:`1`,date:`2026-03-02`,title:`Sprint planning`},{id:`2`,date:`2026-03-12`,title:`Design review`},{id:`3`,date:`2026-03-12`,title:`Customer call`},{id:`4`,date:`2026-03-19`,title:`Release 2.4`}]})))()}var B;function V(){return(V=e((()=>{B=`import { useState } from "react";
import { MonthCalendar } from "minerva-design";

const today = new Date();
const day = (d: number) =>
  \`\${today.getFullYear()}-\${String(today.getMonth() + 1).padStart(2, "0")}-\${String(d).padStart(2, "0")}\`;

const events = [
  { id: "1", date: day(3), title: "Release v2.0" },
  { id: "2", date: day(3), title: "Retrospective" },
  { id: "3", date: day(12), title: "Design review" },
];

export default function BasicDemo() {
  const [value, setValue] = useState(day(3));
  const [clicked, setClicked] = useState("");

  return (
    <div style={{ maxWidth: 560 }}>
      <MonthCalendar
        value={value}
        onChange={setValue}
        events={events}
        onEventClick={(event) => setClicked(event.title)}
      />
      {clicked && <p>Clicked: {clicked}</p>}
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useState } from "react";
import { MonthCalendar } from "minerva-design";

const events = [
  { id: "1", date: "2026-03-10", title: "Offsite day 1" },
  { id: "2", date: "2026-03-11", title: "Offsite day 2" },
];

export default function RangeDemo() {
  const [range, setRange] = useState<[string, string?]>([
    "2026-03-09",
    "2026-03-13",
  ]);
  const [start, end] = range;

  // First click starts a new range, the second one closes it.
  const pick = (day: string) =>
    setRange(end === undefined ? [start, day] : [day]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MonthCalendar
        defaultMonth={new Date(2026, 2, 1)}
        value={end ?? start}
        onChange={pick}
        rangeStart={start}
        rangeEnd={end ?? start}
        events={events}
        showSelectedDayEvents={false}
      />
      <output>
        {end === undefined
          ? \`From \${start}: pick the last day\`
          : \`From \${[start, end].sort().join(" to ")}\`}
      </output>
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { MonthCalendar } from "minerva-design";

const events = [
  { id: "1", date: "2026-03-02", title: "Sprint planning" },
  { id: "2", date: "2026-03-12", title: "Design review" },
  { id: "3", date: "2026-03-12", title: "Customer call" },
  { id: "4", date: "2026-03-19", title: "Release 2.4" },
];

export default function SizesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        alignItems: "start",
      }}
    >
      <MonthCalendar
        size="small"
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue="2026-03-12"
        events={events}
        showSelectedDayEvents={false}
        aria-label="Compact calendar"
      />
      <MonthCalendar
        size="large"
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue="2026-03-12"
        events={events}
        aria-label="Comfortable calendar"
      />
    </div>
  );
}
`})))()}var K,q,J;function Y(){return(Y=e((()=>{A(),F(),z(),V(),U(),G(),t(),_(),y(),K=n(),q=g(Object.assign({"./demos/basic.tsx":le,"./demos/range.tsx":j,"./demos/sizes.tsx":I}),Object.assign({"./demos/basic.tsx":B,"./demos/range.tsx":H,"./demos/sizes.tsx":W})),J=()=>(0,K.jsx)(v,{id:`month-calendar`,demos:q})})))()}Y();export{J as default};