import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{n as a,t as o}from"./Switch-CHbzff3y.js";import{l as s,n as c,t as ee,u as te}from"./DocPage-BbPSunu1.js";import{i as l,m as u}from"./charts-D1JmjIcg.js";function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,d.useMemo)(()=>[...m.map(([t,n,r,i,a,o])=>({id:t,name:e(`works.${t}`),row:e(`crews.${n}`),group:e(`site.${r}`),start:i,end:a,dependencies:[...o]})),{id:`inspectFootings`,name:e(`works.inspectFootings`),row:e(`crews.inspector`),start:p(3,27),milestone:!0,dependencies:[`footings`]},{id:`inspectFrame`,name:e(`works.inspectFrame`),row:e(`crews.inspector`),start:p(5,12),milestone:!0,dependencies:[`frame2`,`deck`]}],[e]);return(0,f.jsx)(l,{tasks:t,milestoneName:e(`inspections`),height:300,ariaLabel:e(`crewsAria`)})}var d,f,p,m;function h(){return(h=e((()=>{d=t(),i(),u(),f=n(),p=(e,t)=>new Date(2026,e-1,t),m=[[`clearing`,`excavation`,`groundwork`,p(3,2),p(3,6),[]],[`dig`,`excavation`,`groundwork`,p(3,9),p(3,16),[`clearing`]],[`rebar`,`steel`,`groundwork`,p(3,10),p(3,21),[]],[`footings`,`concrete`,`groundwork`,p(3,18),p(3,25),[`dig`]],[`backfill`,`excavation`,`groundwork`,p(3,30),p(4,7),[`footings`]],[`slab`,`concrete`,`structure`,p(4,1),p(4,10),[`inspectFootings`]],[`frame1`,`steel`,`structure`,p(4,13),p(4,24),[`slab`]],[`deck`,`concrete`,`structure`,p(4,27),p(5,5),[`frame1`]],[`frame2`,`steel`,`structure`,p(4,27),p(5,8),[`frame1`]]]})))()}function re(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),[t,n]=(0,g.useState)(!0),i=(0,g.useMemo)(()=>[{name:e(`pipeline.kickoff`),start:v(9,1),milestone:!0},...y.map(([t,n,r,i,a])=>({name:e(`pipeline.${t}`),group:e(`streams.${n}`),start:r,end:i,dependencies:a.map(t=>e(`pipeline.${t}`))})),{name:e(`pipeline.release`),start:v(11,9),milestone:!0,dependencies:[e(`pipeline.beta`),e(`pipeline.storeAssets`)]}],[e]);return(0,_.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,_.jsx)(o,{checked:t,onChange:n,label:e(`showDependencies`)}),(0,_.jsx)(l,{tasks:i,dependencyArrows:t,milestoneName:e(`milestones`),height:380,ariaLabel:e(`pipelineAria`)})]})}var g,_,v,y;function b(){return(b=e((()=>{g=t(),i(),a(),u(),_=n(),v=(e,t)=>new Date(2026,e-1,t),y=[[`spec`,`product`,v(9,4),v(9,14),[`kickoff`]],[`api`,`backend`,v(9,11),v(10,2),[`spec`]],[`ui`,`mobile`,v(9,16),v(10,9),[`spec`]],[`integration`,`mobile`,v(10,5),v(10,20),[`api`,`ui`]],[`security`,`backend`,v(10,5),v(10,16),[`api`]],[`storeAssets`,`product`,v(10,12),v(10,23),[`ui`]],[`beta`,`mobile`,v(10,21),v(11,4),[`integration`,`security`]]]})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,x.useMemo)(()=>[...w.map(([t,n,r,i])=>({name:e(`release.${t}`),start:n,end:r,progress:i})),{name:e(`release.launch`),start:C(3,10),milestone:!0}],[e]);return(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:16,width:`100%`},children:T.map(({locale:n,key:r})=>(0,S.jsxs)(`figure`,{style:{margin:0,minWidth:0},children:[(0,S.jsx)(`figcaption`,{style:{marginBottom:4,fontSize:13,color:`var(--text-secondary-color)`},children:e(`locales.${r}`)}),(0,S.jsx)(l,{locale:n,tasks:t,yAxis:{timeZone:`utc`},legend:{position:`bottom`},height:260,ariaLabel:e(`localeAria`,{locale:e(`locales.${r}`)})})]},n))})}var x,S,C,w,T;function E(){return(E=e((()=>{x=t(),i(),u(),S=n(),C=(e,t)=>Date.UTC(2026,e-1,t),w=[[`specs`,C(1,5),C(1,16),1],[`build`,C(1,12),C(2,13),.7],[`translation`,C(2,2),C(2,20),.35],[`beta`,C(2,16),C(3,6),0]],T=[{locale:`zh-CN`,key:`chinese`},{locale:`fr-FR`,key:`french`}]})))()}function ae(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,D.useMemo)(()=>A.map(([t,n,r,i,a,o])=>n===null?{name:e(`tasks.${t}`),start:r,milestone:!0}:{name:e(`tasks.${t}`),group:e(`phases.${n}`),start:r,end:i??r,progress:a,dependencies:o.map(t=>e(`tasks.${t}`))}),[e]);return(0,O.jsx)(l,{tasks:t,today:k(4,22),todayLabel:e(`today`),progressName:e(`progress`),milestoneName:e(`milestones`),height:420,ariaLabel:e(`projectAria`)})}var D,O,k,A;function j(){return(j=e((()=>{D=t(),i(),u(),O=n(),k=(e,t)=>new Date(2026,e-1,t),A=[[`research`,`discovery`,k(3,2),k(3,13),1,[]],[`interviews`,`discovery`,k(3,9),k(3,20),1,[]],[`kickoff`,null,k(3,23),null,0,[]],[`wireframes`,`design`,k(3,23),k(4,7),1,[`research`,`interviews`]],[`visualDesign`,`design`,k(4,1),k(4,24),.7,[`wireframes`]],[`designSystem`,`design`,k(4,13),k(5,8),.35,[`visualDesign`]],[`frontend`,`build`,k(4,20),k(5,29),.2,[`designSystem`]],[`backend`,`build`,k(4,13),k(5,22),.3,[`wireframes`]],[`contentMigration`,`build`,k(5,11),k(6,5),0,[`backend`]],[`qa`,`launch`,k(5,25),k(6,12),0,[`frontend`,`backend`]],[`launch`,null,k(6,15),null,0,[]]]})))()}function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),t=(0,M.useMemo)(()=>P.map(([t,n,[r,i],[a,o]])=>({name:e(`roadmap.${t}`),group:e(`teams.${n}`),start:new Date(2026,r-1,i),end:new Date(2026,a-1,o)})),[e]);return(0,N.jsx)(l,{tasks:t,today:new Date(2026,5,15),todayLabel:e(`today`),yAxis:{min:new Date(2026,0,1).getTime(),max:new Date(2026,11,31).getTime()},legend:{position:`bottom`},height:360,ariaLabel:e(`roadmapAria`)})}var M,N,P;function se(){return(se=e((()=>{M=t(),i(),u(),N=n(),P=[[`mobileRedesign`,`mobile`,[1,5],[4,30]],[`offlineSync`,`mobile`,[5,4],[8,28]],[`widgets`,`mobile`,[9,1],[11,20]],[`searchV2`,`platform`,[1,12],[3,27]],[`multiRegion`,`platform`,[3,2],[7,31]],[`publicApi`,`platform`,[8,3],[12,18]],[`onboarding`,`growth`,[2,2],[4,10]],[`referrals`,`growth`,[4,20],[6,30]],[`pricingPage`,`growth`,[7,6],[9,25]]]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.gantt-chart.data`}),n=t.language,[i,a]=(0,F.useState)(null),o=(0,F.useMemo)(()=>R.map(([t,n,r,i,a])=>({name:e(`sprint.${t}`),group:e(`people.${n}`),start:r,end:i,progress:a})),[e]),s=(0,F.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`short`,day:`numeric`}),[n]);return(0,I.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:`100%`},children:[(0,I.jsx)(l,{tasks:o,today:L(5,12),todayLabel:e(`today`),progressName:e(`progress`),legend:{position:`bottom`},onPointClick:t=>{let n=R.find(([n])=>e(`sprint.${n}`)===t.xLabel);if(!n)return;let[,r,i,o,c]=n;a(e(`taskStatus`,{task:t.xLabel,owner:e(`people.${r}`),start:s.format(i),end:s.format(o),progress:Math.round(c*100)}))},height:320,ariaLabel:e(`sprintAria`)}),(0,I.jsx)(`div`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:i??e(`clickTask`)})]})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),i(),u(),I=n(),L=(e,t=9)=>new Date(2026,5,e,t),R=[[`loginPage`,`ana`,L(1),L(3,18),1],[`passwordReset`,`ana`,L(4),L(5,18),.6],[`profileApi`,`ben`,L(1),L(4,18),1],[`avatarUpload`,`ben`,L(5),L(9,18),.25],[`emailTemplates`,`chen`,L(2),L(8,13),.5],[`notifications`,`chen`,L(8,14),L(12,18),0],[`e2eTests`,`dara`,L(3),L(11,18),.4]]})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Construction schedule by crew: one row per crew with several tasks in it,
// so the dependencies use task ids. The arrow from the dig to the footings
// crosses the busy steel row: it jogs through the gap between the rows
// instead of drawing over the rebar task.
const works = [
  ["clearing", "excavation", "groundwork", day(3, 2), day(3, 6), []],
  ["dig", "excavation", "groundwork", day(3, 9), day(3, 16), ["clearing"]],
  ["rebar", "steel", "groundwork", day(3, 10), day(3, 21), []],
  ["footings", "concrete", "groundwork", day(3, 18), day(3, 25), ["dig"]],
  ["backfill", "excavation", "groundwork", day(3, 30), day(4, 7), ["footings"]],
  ["slab", "concrete", "structure", day(4, 1), day(4, 10), ["inspectFootings"]],
  ["frame1", "steel", "structure", day(4, 13), day(4, 24), ["slab"]],
  ["deck", "concrete", "structure", day(4, 27), day(5, 5), ["frame1"]],
  ["frame2", "steel", "structure", day(4, 27), day(5, 8), ["frame1"]],
] as const;

export default function CrewsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });

  const tasks = useMemo(
    (): GanttTask[] => [
      ...works.map(([id, crew, phase, start, end, after]) => ({
        id,
        name: t(\`works.\${id}\`),
        row: t(\`crews.\${crew}\`),
        group: t(\`site.\${phase}\`),
        start,
        end,
        dependencies: [...after],
      })),
      {
        id: "inspectFootings",
        name: t("works.inspectFootings"),
        row: t("crews.inspector"),
        start: day(3, 27),
        milestone: true,
        dependencies: ["footings"],
      },
      {
        id: "inspectFrame",
        name: t("works.inspectFrame"),
        row: t("crews.inspector"),
        start: day(5, 12),
        milestone: true,
        dependencies: ["frame2", "deck"],
      },
    ],
    [t],
  );

  return (
    <GanttChart
      tasks={tasks}
      milestoneName={t("inspections")}
      height={300}
      ariaLabel={t("crewsAria")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { GanttChart, type GanttTask } from "minerva-design/charts";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Release of a mobile app: every task waits for the ones listed after it;
// the arrows go from the end of a task to the start of the next, and turn
// around when a task starts before the end of what it waits for
const plan = [
  ["spec", "product", day(9, 4), day(9, 14), ["kickoff"]],
  ["api", "backend", day(9, 11), day(10, 2), ["spec"]],
  ["ui", "mobile", day(9, 16), day(10, 9), ["spec"]],
  ["integration", "mobile", day(10, 5), day(10, 20), ["api", "ui"]],
  ["security", "backend", day(10, 5), day(10, 16), ["api"]],
  ["storeAssets", "product", day(10, 12), day(10, 23), ["ui"]],
  ["beta", "mobile", day(10, 21), day(11, 4), ["integration", "security"]],
] as const;

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const [arrows, setArrows] = useState(true);

  const tasks = useMemo(
    (): GanttTask[] => [
      { name: t("pipeline.kickoff"), start: day(9, 1), milestone: true },
      ...plan.map(([key, team, start, end, after]) => ({
        name: t(\`pipeline.\${key}\`),
        group: t(\`streams.\${team}\`),
        start,
        end,
        dependencies: after.map((task) => t(\`pipeline.\${task}\`)),
      })),
      {
        name: t("pipeline.release"),
        start: day(11, 9),
        milestone: true,
        dependencies: [t("pipeline.beta"), t("pipeline.storeAssets")],
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={arrows}
        onChange={setArrows}
        label={t("showDependencies")}
      />
      <GanttChart
        tasks={tasks}
        dependencyArrows={arrows}
        milestoneName={t("milestones")}
        height={380}
        ariaLabel={t("pipelineAria")}
      />
    </div>
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
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
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
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
              // listed in the tooltip, drawn as arrows from their ends
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
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
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
`})))()}var X;function Z(){return(Z=e((()=>{X=`import { useMemo, useState } from "react";
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
`})))()}var Q,$,le;function ue(){return(ue=e((()=>{h(),b(),E(),j(),se(),z(),V(),U(),G(),q(),Y(),Z(),t(),c(),te(),Q=n(),$=s(Object.assign({"./demos/crews.tsx":ne,"./demos/dependencies.tsx":re,"./demos/locale.tsx":ie,"./demos/project.tsx":ae,"./demos/roadmap.tsx":oe,"./demos/sprint.tsx":ce}),Object.assign({"./demos/crews.tsx":B,"./demos/dependencies.tsx":H,"./demos/locale.tsx":W,"./demos/project.tsx":K,"./demos/roadmap.tsx":J,"./demos/sprint.tsx":X})),le=()=>(0,Q.jsx)(ee,{id:`gantt-chart`,demos:$})})))()}ue();export{le as default};