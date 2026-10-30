import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-B4Hi58ku.js";import{l as a,n as o,t as s,u as c}from"./DocPage-6WUEs69-.js";import{m as l,o as u}from"./charts-D752pe3-.js";function d(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,f.useMemo)(()=>[...h.map(([t,n,r,i])=>({name:e(`release.${t}`),start:n,end:r,progress:i})),{name:e(`release.launch`),start:m(3,10),milestone:!0}],[e]);return(0,p.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:16,width:`100%`},children:g.map(({locale:n,key:r})=>(0,p.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,p.jsx)(`figcaption`,{style:{marginBottom:4,fontSize:13,color:`var(--text-secondary-color)`},children:e(`locales.${r}`)}),(0,p.jsx)(u,{locale:n,tasks:t,yAxis:{timeZone:`utc`},legend:{position:`bottom`},height:260,ariaLabel:e(`localeAria`,{locale:e(`locales.${r}`)})})]},n))})}var f,p,m,h,g;function _(){return(_=e((()=>{f=t(),i(),l(),p=n(),m=(e,t)=>Date.UTC(2026,e-1,t),h=[[`specs`,m(1,5),m(1,16),1],[`build`,m(1,12),m(2,13),.7],[`translation`,m(2,2),m(2,20),.35],[`beta`,m(2,16),m(3,6),0]],g=[{locale:`zh-CN`,key:`chinese`},{locale:`fr-FR`,key:`french`}]})))()}function v(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,y.useMemo)(()=>S.map(([t,n,r,i,a,o])=>n===null?{name:e(`tasks.${t}`),start:r,milestone:!0}:{name:e(`tasks.${t}`),group:e(`phases.${n}`),start:r,end:i??r,progress:a,dependencies:o.map(t=>e(`tasks.${t}`))}),[e]);return(0,b.jsx)(u,{tasks:t,today:x(4,22),todayLabel:e(`today`),progressName:e(`progress`),milestoneName:e(`milestones`),height:420,ariaLabel:e(`projectAria`)})}var y,b,x,S;function C(){return(C=e((()=>{y=t(),i(),l(),b=n(),x=(e,t)=>new Date(2026,e-1,t),S=[[`research`,`discovery`,x(3,2),x(3,13),1,[]],[`interviews`,`discovery`,x(3,9),x(3,20),1,[]],[`kickoff`,null,x(3,23),null,0,[]],[`wireframes`,`design`,x(3,23),x(4,7),1,[`research`,`interviews`]],[`visualDesign`,`design`,x(4,1),x(4,24),.7,[`wireframes`]],[`designSystem`,`design`,x(4,13),x(5,8),.35,[`visualDesign`]],[`frontend`,`build`,x(4,20),x(5,29),.2,[`designSystem`]],[`backend`,`build`,x(4,13),x(5,22),.3,[`wireframes`]],[`contentMigration`,`build`,x(5,11),x(6,5),0,[`backend`]],[`qa`,`launch`,x(5,25),x(6,12),0,[`frontend`,`backend`]],[`launch`,null,x(6,15),null,0,[]]]})))()}function w(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,T.useMemo)(()=>D.map(([t,n,[r,i],[a,o]])=>({name:e(`roadmap.${t}`),group:e(`teams.${n}`),start:new Date(2026,r-1,i),end:new Date(2026,a-1,o)})),[e]);return(0,E.jsx)(u,{tasks:t,today:new Date(2026,5,15),todayLabel:e(`today`),yAxis:{min:new Date(2026,0,1).getTime(),max:new Date(2026,11,31).getTime()},legend:{position:`bottom`},height:360,ariaLabel:e(`roadmapAria`)})}var T,E,D;function O(){return(O=e((()=>{T=t(),i(),l(),E=n(),D=[[`mobileRedesign`,`mobile`,[1,5],[4,30]],[`offlineSync`,`mobile`,[5,4],[8,28]],[`widgets`,`mobile`,[9,1],[11,20]],[`searchV2`,`platform`,[1,12],[3,27]],[`multiRegion`,`platform`,[3,2],[7,31]],[`publicApi`,`platform`,[8,3],[12,18]],[`onboarding`,`growth`,[2,2],[4,10]],[`referrals`,`growth`,[4,20],[6,30]],[`pricingPage`,`growth`,[7,6],[9,25]]]})))()}function k(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,[i,a]=(0,A.useState)(null),o=(0,A.useMemo)(()=>N.map(([t,n,r,i,a])=>({name:e(`sprint.${t}`),group:e(`people.${n}`),start:r,end:i,progress:a})),[e]),s=(0,A.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`short`,day:`numeric`}),[n]);return(0,j.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:`100%`},children:[(0,j.jsx)(u,{tasks:o,today:M(5,12),todayLabel:e(`today`),progressName:e(`progress`),legend:{position:`bottom`},onPointClick:t=>{let n=N.find(([n])=>e(`sprint.${n}`)===t.xLabel);if(!n)return;let[,r,i,o,c]=n;a(e(`taskStatus`,{task:t.xLabel,owner:e(`people.${r}`),start:s.format(i),end:s.format(o),progress:Math.round(c*100)}))},height:320,ariaLabel:e(`sprintAria`)}),(0,j.jsx)(`div`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:i??e(`clickTask`)})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),i(),l(),j=n(),M=(e,t=9)=>new Date(2026,5,e,t),N=[[`loginPage`,`ana`,M(1),M(3,18),1],[`passwordReset`,`ana`,M(4),M(5,18),.6],[`profileApi`,`ben`,M(1),M(4,18),1],[`avatarUpload`,`ben`,M(5),M(9,18),.25],[`emailTemplates`,`chen`,M(2),M(8,13),.5],[`notifications`,`chen`,M(8,14),M(12,18),0],[`e2eTests`,`dara`,M(3),M(11,18),.4]]})))()}var F;function I(){return(I=e((()=>{F=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Release plan in UTC dates: \`yAxis.timeZone: "utc"\` aligns the ticks on
// UTC midnights wherever the reader is
const utc = (month: number, date: number) => Date.UTC(2026, month - 1, date);
const plan = [
  ["specs", utc(1, 5), utc(1, 16), 1],
  ["build", utc(1, 12), utc(2, 13), 0.7],
  ["translation", utc(2, 2), utc(2, 20), 0.35],
  ["beta", utc(2, 16), utc(3, 6), 0],
] as const;

const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  // no group, progress or milestone names: the defaults of the locale
  const tasks = useMemo(
    (): GanttTask[] => [
      ...plan.map(([key, start, end, progress]) => ({
        name: t(\`release.\${key}\`),
        start,
        end,
        progress,
      })),
      { name: t("release.launch"), start: utc(3, 10), milestone: true },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {LOCALES.map(({ locale, key }) => (
        <figure key={locale} style={{ margin: 0, minWidth: 0 }}>
          <figcaption
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--text-secondary-color)",
            }}
          >
            {t(\`locales.\${key}\`)}
          </figcaption>
          <GanttChart
            locale={locale}
            tasks={tasks}
            yAxis={{ timeZone: "utc" }}
            legend={{ position: "bottom" }}
            height={260}
            ariaLabel={t("localeAria", { locale: t(\`locales.\${key}\`) })}
          />
        </figure>
      ))}
    </div>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: phases, tasks with their progress, what they wait
// for, and milestones
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1, []],
  ["interviews", "discovery", day(3, 9), day(3, 20), 1, []],
  ["kickoff", null, day(3, 23), null, 0, []],
  [
    "wireframes",
    "design",
    day(3, 23),
    day(4, 7),
    1,
    ["research", "interviews"],
  ],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7, ["wireframes"]],
  ["designSystem", "design", day(4, 13), day(5, 8), 0.35, ["visualDesign"]],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2, ["designSystem"]],
  ["backend", "build", day(4, 13), day(5, 22), 0.3, ["wireframes"]],
  ["contentMigration", "build", day(5, 11), day(6, 5), 0, ["backend"]],
  ["qa", "launch", day(5, 25), day(6, 12), 0, ["frontend", "backend"]],
  ["launch", null, day(6, 15), null, 0, []],
] as const;

export default function ProjectDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, phase, start, end, progress, after]) =>
        phase === null
          ? { name: t(\`tasks.\${key}\`), start, milestone: true }
          : {
              name: t(\`tasks.\${key}\`),
              group: t(\`phases.\${phase}\`),
              start,
              end: end ?? start,
              progress,
              // listed in the tooltip of the task
              dependencies: after.map((task) => t(\`tasks.\${task}\`)),
            },
      ),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={day(4, 22)}
      todayLabel={t("today")}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      height={420}
      ariaLabel={t("projectAria")}
    />
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

// Product roadmap of 2026 by team; zoom along the time with Ctrl / ⌘ + wheel
// (or a pinch) and drag to pan
const items = [
  ["mobileRedesign", "mobile", [1, 5], [4, 30]],
  ["offlineSync", "mobile", [5, 4], [8, 28]],
  ["widgets", "mobile", [9, 1], [11, 20]],
  ["searchV2", "platform", [1, 12], [3, 27]],
  ["multiRegion", "platform", [3, 2], [7, 31]],
  ["publicApi", "platform", [8, 3], [12, 18]],
  ["onboarding", "growth", [2, 2], [4, 10]],
  ["referrals", "growth", [4, 20], [6, 30]],
  ["pricingPage", "growth", [7, 6], [9, 25]],
] as const;

export default function RoadmapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] =>
      items.map(([key, team, [m0, d0], [m1, d1]]) => ({
        name: t(\`roadmap.\${key}\`),
        group: t(\`teams.\${team}\`),
        start: new Date(2026, m0 - 1, d0),
        end: new Date(2026, m1 - 1, d1),
      })),
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      today={new Date(2026, 5, 15)}
      todayLabel={t("today")}
      yAxis={{
        min: new Date(2026, 0, 1).getTime(),
        max: new Date(2026, 11, 31).getTime(),
      }}
      legend={{ position: "bottom" }}
      height={360}
      ariaLabel={t("roadmapAria")}
    />
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (date: number, hour = 9) => new Date(2026, 5, date, hour);

// Two-week sprint: one color per developer, click a task for its details
const sprint = [
  ["loginPage", "ana", day(1), day(3, 18), 1],
  ["passwordReset", "ana", day(4), day(5, 18), 0.6],
  ["profileApi", "ben", day(1), day(4, 18), 1],
  ["avatarUpload", "ben", day(5), day(9, 18), 0.25],
  ["emailTemplates", "chen", day(2), day(8, 13), 0.5],
  ["notifications", "chen", day(8, 14), day(12, 18), 0],
  ["e2eTests", "dara", day(3), day(11, 18), 0.4],
] as const;

export default function SprintDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<string | null>(null);

  const tasks = useMemo(
    (): GanttTask[] =>
      sprint.map(([key, dev, start, end, progress]) => ({
        name: t(\`sprint.\${key}\`),
        group: t(\`people.\${dev}\`),
        start,
        end,
        progress,
      })),
    [t],
  );
  const dates = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric" }),
    [locale],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <GanttChart
        tasks={tasks}
        today={day(5, 12)}
        todayLabel={t("today")}
        progressName={t("progress")}
        legend={{ position: "bottom" }}
        onPointClick={(event) => {
          const task = sprint.find(
            ([key]) => t(\`sprint.\${key}\`) === event.xLabel,
          );
          if (!task) return;
          const [, dev, start, end, progress] = task;
          setSelected(
            t("taskStatus", {
              task: event.xLabel,
              owner: t(\`people.\${dev}\`),
              start: dates.format(start),
              end: dates.format(end),
              progress: Math.round(progress * 100),
            }),
          );
        }}
        height={320}
        ariaLabel={t("sprintAria")}
      />
      <div role="status" style={{ color: "var(--text-secondary-color)" }}>
        {selected ?? t("clickTask")}
      </div>
    </div>
  );
}
`})))()}var U,W,G;function K(){return(K=e((()=>{_(),C(),O(),P(),I(),R(),B(),H(),t(),o(),c(),U=n(),W=a(Object.assign({"./demos/locale.tsx":d,"./demos/project.tsx":v,"./demos/roadmap.tsx":w,"./demos/sprint.tsx":k}),Object.assign({"./demos/locale.tsx":F,"./demos/project.tsx":L,"./demos/roadmap.tsx":z,"./demos/sprint.tsx":V})),G=()=>(0,U.jsx)(s,{id:`gantt-chart`,demos:W})})))()}K();export{G as default};