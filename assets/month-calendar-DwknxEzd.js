import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Et as r,H as i,It as a,Wt as o,Zt as s,tn as c,ut as l,x as ee}from"./angular-preview-l4x8c_2r.js";import{B as te,S as ne,T as re,V as ie,g as ae,r as oe}from"./ProgressIndicator-BMZ0rR7D.js";import{t as u}from"./stylingHooks-PqiNJdev.js";import{$ as d,St as f,xt as p}from"./io5-DWV9qlxB.js";import{n as m,t as h}from"./monthCalendar.module.scss-DNVdVxZw.js";import{l as g,n as _,t as v,u as se}from"./DocPage-CmQtD5jg.js";var y,b,x,S,C,w;function T(){return(T=e((()=>{a(),ie(),re(),f(),d(),h(),y=t(),b=n(),x=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],S=[],C=/^\d{4}-\d{2}-\d{2}$/,w=({month:e,defaultMonth:t,onMonthChange:n,value:a,defaultValue:re,onChange:ie,events:d=S,onEventClick:f,rangeStart:h,rangeEnd:g,size:_=`medium`,disabled:v=!1,showSelectedDayEvents:se=!0,"aria-label":w,previousMonthLabel:T,nextMonthLabel:ce,todayLabel:E,emptyEventsText:D,locale:O,weekdayLabels:k,getDayLabel:A,getEventsLabel:j,className:M,ref:N})=>{let{t:P,language:F}=te(),I=(0,y.useId)(),[L,R]=p({value:e,defaultValue:()=>o(t??new Date),onChange:n,name:`MonthCalendar`,prop:`month`}),[z,B]=p({value:a,defaultValue:re,onChange:e=>{e!==void 0&&ie?.(e)},name:`MonthCalendar`}),[V,H]=(0,y.useState)(``),U=(0,y.useRef)(new Map),W=(0,y.useRef)(null),G=o(L),K=c(G,-((G.getDay()+6)%7)),q=Array.from({length:42},(e,t)=>c(K,t)),J=q.map(r),Y=new Date,X=r(Y),le=[V,z,s(Y,L)?X:``,r(G)].find(e=>e&&J.includes(e)),ue=r(G),Z=new Map;for(let e of d)Z.set(e.date,(Z.get(e.date)??0)+1);let de=d.filter(e=>e.date===z),Q=h&&g&&C.test(h)&&C.test(g)?[h,g].sort():void 0;(0,y.useEffect)(()=>{if(v||!W.current)return;let e=U.current.get(W.current);e&&(W.current=null,e.focus())},[ue,V,v]);let $=e=>R(o(e)),fe=e=>{v||(B(r(e)),s(e,L)||$(e))},pe=(e,t)=>{if(v)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||fe(t);return}let n,a=(t.getDay()+6)%7;switch(ee(e.key,e.currentTarget)){case`ArrowLeft`:n=c(t,-1);break;case`ArrowRight`:n=c(t,1);break;case`ArrowUp`:n=c(t,-7);break;case`ArrowDown`:n=c(t,7);break;case`Home`:n=c(t,-a);break;case`End`:n=c(t,6-a);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),a=o(t,r),s=c(o(a,1),-1).getDate();n=i(a.getFullYear(),a.getMonth(),Math.min(t.getDate(),s));break}default:return}e.preventDefault(),W.current=r(n),H(r(n)),s(n,L)||$(n)},me=new Intl.DateTimeFormat(O??F,{year:`numeric`,month:`long`}).format(G);return(0,b.jsxs)(`section`,{ref:N,className:l(m.monthCalendar,m[_],M),"aria-label":w??P(`monthCalendar.label`),...u(`month-calendar`,`root`,{disabled:v,size:_}),children:[(0,b.jsxs)(`div`,{className:m.toolbar,children:[(0,b.jsx)(`h2`,{id:I,className:m.heading,"aria-live":`polite`,...u(`month-calendar`,`heading`),children:me}),(0,b.jsxs)(`div`,{className:m.navigation,children:[(0,b.jsx)(`button`,{type:`button`,className:l(m.navButton,m.iconButton),"aria-label":T??P(`monthCalendar.previousMonth`),disabled:v,...u(`month-calendar`,`nav-button`),onClick:()=>$(o(L,-1)),children:(0,b.jsx)(ne,{"aria-hidden":!0,focusable:!1})}),(0,b.jsxs)(`button`,{type:`button`,className:m.navButton,disabled:v,...u(`month-calendar`,`nav-button`),onClick:()=>$(new Date),children:[(0,b.jsx)(oe,{"aria-hidden":!0,focusable:!1}),E??P(`monthCalendar.today`)]}),(0,b.jsx)(`button`,{type:`button`,className:l(m.navButton,m.iconButton),"aria-label":ce??P(`monthCalendar.nextMonth`),disabled:v,...u(`month-calendar`,`nav-button`),onClick:()=>$(o(L,1)),children:(0,b.jsx)(ae,{"aria-hidden":!0,focusable:!1})})]})]}),(0,b.jsxs)(`div`,{role:`grid`,"aria-labelledby":I,"aria-disabled":v||void 0,className:m.grid,...u(`month-calendar`,`grid`),children:[(0,b.jsx)(`div`,{role:`row`,className:m.week,children:x.map((e,t)=>(0,b.jsx)(`div`,{role:`columnheader`,className:m.weekday,children:k?.[t]??P(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,b.jsx)(`div`,{role:`row`,className:m.week,children:q.slice(t*7,t*7+7).map(e=>{let t=r(e),n=Z.get(t)??0,i=z===t,a=!s(e,L),o=t===X,c=!!Q&&t>=Q[0]&&t<=Q[1];return(0,b.jsxs)(`div`,{role:`gridcell`,className:l(m.day,c&&m.inRange,c&&t===Q?.[0]&&m.rangeStart,c&&t===Q?.[1]&&m.rangeEnd),...u(`month-calendar`,`day`,{selected:i,today:o,outside:a,disabled:v}),ref:e=>{e?U.current.set(t,e):U.current.delete(t)},"data-date":t,"aria-label":A?A(t,n):n?P(`monthCalendar.dayWithEvents`,{date:t,count:n}):t,"aria-selected":i,"aria-current":o?`date`:void 0,"aria-disabled":v||void 0,tabIndex:!v&&t===le?0:-1,onFocus:()=>H(t),onClick:()=>fe(e),onKeyDown:t=>pe(t,e),children:[(0,b.jsx)(`span`,{className:m.dayNumber,children:e.getDate()}),(0,b.jsx)(`span`,{className:l(m.count,n>0&&m.hasEvents),"aria-hidden":!0,children:n?n>99?`99+`:n:` `})]},t)})},t))]}),se&&z&&(0,b.jsxs)(`section`,{className:m.events,...u(`month-calendar`,`events`),"aria-label":j?j(z):P(`monthCalendar.eventsLabel`,{date:z}),children:[(0,b.jsx)(`h3`,{className:m.eventsHeading,children:z}),de.length?(0,b.jsx)(`ul`,{className:m.eventList,children:de.map(e=>(0,b.jsx)(`li`,{className:m.eventItem,children:f?(0,b.jsx)(`button`,{type:`button`,className:m.eventButton,...u(`month-calendar`,`event`),disabled:v,onClick:()=>f(e),children:e.title}):(0,b.jsx)(`span`,{...u(`month-calendar`,`event`),children:e.title})},e.id))}):(0,b.jsx)(`p`,{className:m.empty,...u(`month-calendar`,`empty`),children:D??P(`monthCalendar.noEvents`)})]})]})}})))()}function ce(){let[e,t]=(0,E.useState)(k(3)),[n,r]=(0,E.useState)(``);return(0,D.jsxs)(`div`,{style:{maxWidth:560},children:[(0,D.jsx)(w,{value:e,onChange:t,events:A,onEventClick:e=>r(e.title)}),n&&(0,D.jsxs)(`p`,{children:[`Clicked: `,n]})]})}var E,D,O,k,A;function j(){return(j=e((()=>{E=t(),T(),D=n(),O=new Date,k=e=>`${O.getFullYear()}-${String(O.getMonth()+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,A=[{id:`1`,date:k(3),title:`Release v2.0`},{id:`2`,date:k(3),title:`Retrospective`},{id:`3`,date:k(12),title:`Design review`}]})))()}function M(){let[e,t]=(0,N.useState)([`2026-03-09`,`2026-03-13`]),[n,r]=e;return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,P.jsx)(w,{defaultMonth:new Date(2026,2,1),value:r??n,onChange:e=>t(r===void 0?[n,e]:[e]),rangeStart:n,rangeEnd:r??n,events:F,showSelectedDayEvents:!1}),(0,P.jsx)(`output`,{children:r===void 0?`From ${n}: pick the last day`:`From ${[n,r].sort().join(` to `)}`})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),T(),P=n(),F=[{id:`1`,date:`2026-03-10`,title:`Offsite day 1`},{id:`2`,date:`2026-03-11`,title:`Offsite day 2`}]})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,alignItems:`start`},children:[(0,R.jsx)(w,{size:`small`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:z,showSelectedDayEvents:!1,"aria-label":`Compact calendar`}),(0,R.jsx)(w,{size:`large`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:z,"aria-label":`Comfortable calendar`})]})}var R,z;function B(){return(B=e((()=>{T(),R=n(),z=[{id:`1`,date:`2026-03-02`,title:`Sprint planning`},{id:`2`,date:`2026-03-12`,title:`Design review`},{id:`3`,date:`2026-03-12`,title:`Customer call`},{id:`4`,date:`2026-03-19`,title:`Release 2.4`}]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useState } from "react";
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
`})))()}var G;function K(){return(K=e((()=>{G=`import { MonthCalendar } from "minerva-design";

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
`})))()}var q,J,Y;function X(){return(X=e((()=>{j(),I(),B(),H(),W(),K(),t(),_(),se(),q=n(),J=g(Object.assign({"./demos/basic.tsx":ce,"./demos/range.tsx":M,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":V,"./demos/range.tsx":U,"./demos/sizes.tsx":G})),Y=()=>(0,q.jsx)(v,{id:`month-calendar`,demos:J})})))()}X();export{Y as default};