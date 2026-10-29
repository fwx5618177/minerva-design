import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{Ct as r,St as i,et as a}from"./io5-CqGZWNm2.js";import{Et as o,H as s,It as ee,Wt as c,Zt as l,tn as u,ut as d,x as te}from"./angular-preview-l4x8c_2r.js";import{B as f,H as ne,S as re,T as p,U as m,g as ie,r as ae}from"./ProgressIndicator-BhPa7d9i.js";import{n as h,t as g}from"./monthCalendar.module.scss-DNVdVxZw.js";import{l as _,n as v,t as y,u as b}from"./DocPage-BoAp0gXb.js";var x,S,oe,C,w,T;function E(){return(E=e((()=>{ee(),m(),p(),r(),a(),g(),x=t(),S=n(),oe=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],C=[],w=/^\d{4}-\d{2}-\d{2}$/,T=({month:e,defaultMonth:t,onMonthChange:n,value:r,defaultValue:a,onChange:ee,events:p=C,onEventClick:m,rangeStart:g,rangeEnd:_,size:v=`medium`,disabled:y=!1,showSelectedDayEvents:b=!0,"aria-label":T,previousMonthLabel:E,nextMonthLabel:se,todayLabel:D,emptyEventsText:O,locale:k,weekdayLabels:A,getDayLabel:j,getEventsLabel:M,className:ce,ref:N})=>{let{t:P,language:F}=ne(),I=(0,x.useId)(),[L,R]=i({value:e,defaultValue:()=>c(t??new Date),onChange:n,name:`MonthCalendar`,prop:`month`}),[z,B]=i({value:r,defaultValue:a,onChange:e=>{e!==void 0&&ee?.(e)},name:`MonthCalendar`}),[V,H]=(0,x.useState)(``),U=(0,x.useRef)(new Map),W=(0,x.useRef)(null),G=c(L),K=u(G,-((G.getDay()+6)%7)),q=Array.from({length:42},(e,t)=>u(K,t)),J=q.map(o),Y=new Date,X=o(Y),le=[V,z,l(Y,L)?X:``,o(G)].find(e=>e&&J.includes(e)),ue=o(G),Z=new Map;for(let e of p)Z.set(e.date,(Z.get(e.date)??0)+1);let de=p.filter(e=>e.date===z),Q=g&&_&&w.test(g)&&w.test(_)?[g,_].sort():void 0;(0,x.useEffect)(()=>{if(y||!W.current)return;let e=U.current.get(W.current);e&&(W.current=null,e.focus())},[ue,V,y]);let $=e=>R(c(e)),fe=e=>{y||(B(o(e)),l(e,L)||$(e))},pe=(e,t)=>{if(y)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||fe(t);return}let n,r=(t.getDay()+6)%7;switch(te(e.key,e.currentTarget)){case`ArrowLeft`:n=u(t,-1);break;case`ArrowRight`:n=u(t,1);break;case`ArrowUp`:n=u(t,-7);break;case`ArrowDown`:n=u(t,7);break;case`Home`:n=u(t,-r);break;case`End`:n=u(t,6-r);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=c(t,r),a=u(c(i,1),-1).getDate();n=s(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault(),W.current=o(n),H(o(n)),l(n,L)||$(n)},me=new Intl.DateTimeFormat(k??F,{year:`numeric`,month:`long`}).format(G);return(0,S.jsxs)(`section`,{ref:N,className:d(h.monthCalendar,h[v],ce),"aria-label":T??P(`monthCalendar.label`),...f(`month-calendar`,`root`,{disabled:y,size:v}),children:[(0,S.jsxs)(`div`,{className:h.toolbar,children:[(0,S.jsx)(`h2`,{id:I,className:h.heading,"aria-live":`polite`,...f(`month-calendar`,`heading`),children:me}),(0,S.jsxs)(`div`,{className:h.navigation,children:[(0,S.jsx)(`button`,{type:`button`,className:d(h.navButton,h.iconButton),"aria-label":E??P(`monthCalendar.previousMonth`),disabled:y,...f(`month-calendar`,`nav-button`),onClick:()=>$(c(L,-1)),children:(0,S.jsx)(re,{"aria-hidden":!0,focusable:!1})}),(0,S.jsxs)(`button`,{type:`button`,className:h.navButton,disabled:y,...f(`month-calendar`,`nav-button`),onClick:()=>$(new Date),children:[(0,S.jsx)(ae,{"aria-hidden":!0,focusable:!1}),D??P(`monthCalendar.today`)]}),(0,S.jsx)(`button`,{type:`button`,className:d(h.navButton,h.iconButton),"aria-label":se??P(`monthCalendar.nextMonth`),disabled:y,...f(`month-calendar`,`nav-button`),onClick:()=>$(c(L,1)),children:(0,S.jsx)(ie,{"aria-hidden":!0,focusable:!1})})]})]}),(0,S.jsxs)(`div`,{role:`grid`,"aria-labelledby":I,"aria-disabled":y||void 0,className:h.grid,...f(`month-calendar`,`grid`),children:[(0,S.jsx)(`div`,{role:`row`,className:h.week,children:oe.map((e,t)=>(0,S.jsx)(`div`,{role:`columnheader`,className:h.weekday,children:A?.[t]??P(`monthCalendar.weekdays.${e}`)},e))}),Array.from({length:6},(e,t)=>(0,S.jsx)(`div`,{role:`row`,className:h.week,children:q.slice(t*7,t*7+7).map(e=>{let t=o(e),n=Z.get(t)??0,r=z===t,i=!l(e,L),a=t===X,s=!!Q&&t>=Q[0]&&t<=Q[1];return(0,S.jsxs)(`div`,{role:`gridcell`,className:d(h.day,s&&h.inRange,s&&t===Q?.[0]&&h.rangeStart,s&&t===Q?.[1]&&h.rangeEnd),...f(`month-calendar`,`day`,{selected:r,today:a,outside:i,disabled:y}),ref:e=>{e?U.current.set(t,e):U.current.delete(t)},"data-date":t,"aria-label":j?j(t,n):n?P(`monthCalendar.dayWithEvents`,{date:t,count:n}):t,"aria-selected":r,"aria-current":a?`date`:void 0,"aria-disabled":y||void 0,tabIndex:!y&&t===le?0:-1,onFocus:()=>H(t),onClick:()=>fe(e),onKeyDown:t=>pe(t,e),children:[(0,S.jsx)(`span`,{className:h.dayNumber,children:e.getDate()}),(0,S.jsx)(`span`,{className:d(h.count,n>0&&h.hasEvents),"aria-hidden":!0,children:n?n>99?`99+`:n:` `})]},t)})},t))]}),b&&z&&(0,S.jsxs)(`section`,{className:h.events,...f(`month-calendar`,`events`),"aria-label":M?M(z):P(`monthCalendar.eventsLabel`,{date:z}),children:[(0,S.jsx)(`h3`,{className:h.eventsHeading,children:z}),de.length?(0,S.jsx)(`ul`,{className:h.eventList,children:de.map(e=>(0,S.jsx)(`li`,{className:h.eventItem,children:m?(0,S.jsx)(`button`,{type:`button`,className:h.eventButton,...f(`month-calendar`,`event`),disabled:y,onClick:()=>m(e),children:e.title}):(0,S.jsx)(`span`,{...f(`month-calendar`,`event`),children:e.title})},e.id))}):(0,S.jsx)(`p`,{className:h.empty,...f(`month-calendar`,`empty`),children:O??P(`monthCalendar.noEvents`)})]})]})}})))()}function se(){let[e,t]=(0,D.useState)(A(3)),[n,r]=(0,D.useState)(``);return(0,O.jsxs)(`div`,{style:{maxWidth:560},children:[(0,O.jsx)(T,{value:e,onChange:t,events:j,onEventClick:e=>r(e.title)}),n&&(0,O.jsxs)(`p`,{children:[`Clicked: `,n]})]})}var D,O,k,A,j;function M(){return(M=e((()=>{D=t(),E(),O=n(),k=new Date,A=e=>`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,j=[{id:`1`,date:A(3),title:`Release v2.0`},{id:`2`,date:A(3),title:`Retrospective`},{id:`3`,date:A(12),title:`Design review`}]})))()}function ce(){let[e,t]=(0,N.useState)([`2026-03-09`,`2026-03-13`]),[n,r]=e;return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,P.jsx)(T,{defaultMonth:new Date(2026,2,1),value:r??n,onChange:e=>t(r===void 0?[n,e]:[e]),rangeStart:n,rangeEnd:r??n,events:F,showSelectedDayEvents:!1}),(0,P.jsx)(`output`,{children:r===void 0?`From ${n}: pick the last day`:`From ${[n,r].sort().join(` to `)}`})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),E(),P=n(),F=[{id:`1`,date:`2026-03-10`,title:`Offsite day 1`},{id:`2`,date:`2026-03-11`,title:`Offsite day 2`}]})))()}function L(){return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:24,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,alignItems:`start`},children:[(0,R.jsx)(T,{size:`small`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:z,showSelectedDayEvents:!1,"aria-label":`Compact calendar`}),(0,R.jsx)(T,{size:`large`,defaultMonth:new Date(2026,2,1),defaultValue:`2026-03-12`,events:z,"aria-label":`Comfortable calendar`})]})}var R,z;function B(){return(B=e((()=>{E(),R=n(),z=[{id:`1`,date:`2026-03-02`,title:`Sprint planning`},{id:`2`,date:`2026-03-12`,title:`Design review`},{id:`3`,date:`2026-03-12`,title:`Customer call`},{id:`4`,date:`2026-03-19`,title:`Release 2.4`}]})))()}var V;function H(){return(H=e((()=>{V=`import { useState } from "react";
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
`})))()}var q,J,Y;function X(){return(X=e((()=>{M(),I(),B(),H(),W(),K(),t(),v(),b(),q=n(),J=_(Object.assign({"./demos/basic.tsx":se,"./demos/range.tsx":ce,"./demos/sizes.tsx":L}),Object.assign({"./demos/basic.tsx":V,"./demos/range.tsx":U,"./demos/sizes.tsx":G})),Y=()=>(0,q.jsx)(y,{id:`month-calendar`,demos:J})})))()}X();export{Y as default};