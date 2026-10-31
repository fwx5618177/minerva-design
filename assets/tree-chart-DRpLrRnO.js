import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-DNQTyaNH.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,r as c}from"./Stack-B3Kr9X_e.js";import{i as l,r as u}from"./DemoBlock-CUoEzVo9.js";import{l as d,n as f,t as ee,u as p}from"./DocPage-CfPUO8JU.js";import{n as m,t as h}from"./graph-MY42gkE8.js";function g(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),t=(0,_.useRef)(null),n=(0,_.useMemo)(()=>y.map(e=>({id:e,label:e.replace(/\/$/,``).split(`/`).pop(),group:b(e),collapsed:e.endsWith(`/`)&&e.split(`/`).length>4})),[]),i=(0,_.useMemo)(()=>y.filter(e=>x(e)).map(e=>({source:x(e),target:e})),[]),a=(0,_.useMemo)(()=>S.map(t=>({id:t,name:e(`fileKinds.${t}`)})),[e]);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,v.jsxs)(s,{gap:8,wrap:!0,children:[(0,v.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t.current?.expand(),children:e(`expandAll`)}),(0,v.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t.current?.collapse(),children:e(`collapseAll`)}),(0,v.jsx)(o,{size:`small`,variant:`outline`,color:`neutral`,onClick:()=>t.current?.fit(),children:e(`fit`)})]}),(0,v.jsx)(h,{ref:t,nodes:n,edges:i,groups:a,layout:`tree`,direction:`LR`,nodeSize:9,height:480,ariaLabel:e(`filesAria`)})]})}var _,v,y,b,x,S;function C(){return(C=e((()=>{_=t(),i(),a(),c(),m(),v=n(),y=`minerva-design/,minerva-design/packages/,minerva-design/packages/charts/,minerva-design/packages/charts/src/,minerva-design/packages/charts/src/core.ts,minerva-design/packages/charts/src/index.ts,minerva-design/packages/charts/src/engine/,minerva-design/packages/charts/src/engine/chart.ts,minerva-design/packages/charts/src/engine/theme.ts,minerva-design/packages/charts/src/engine/graph/,minerva-design/packages/charts/src/engine/graph/force.ts,minerva-design/packages/charts/src/engine/graph/dag.ts,minerva-design/packages/charts/src/engine/graph/tree.ts,minerva-design/packages/charts/package.json,minerva-design/packages/react/,minerva-design/packages/react/src/,minerva-design/packages/react/src/Button.tsx,minerva-design/packages/react/src/Button.module.scss,minerva-design/packages/react/src/Tree.tsx,minerva-design/packages/react/package.json,minerva-design/apps/,minerva-design/apps/docs/,minerva-design/apps/docs/src/,minerva-design/apps/docs/src/main.tsx,minerva-design/apps/docs/src/styles.css,minerva-design/apps/docs/README.md,minerva-design/package.json,minerva-design/README.md`.split(`,`),b=e=>e.endsWith(`/`)?`folder`:/\.(tsx?|js)$/.test(e)?`code`:/\.(s?css)$/.test(e)?`style`:e.endsWith(`.json`)?`data`:`doc`,x=e=>{let t=e.replace(/\/$/,``),n=t.lastIndexOf(`/`);return n<0?null:`${t.slice(0,n)}/`},S=[`folder`,`code`,`style`,`data`,`doc`]})))()}function w(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),t=(0,T.useMemo)(()=>{let t=[{id:`launch`,label:e(`mind.launch`)}];for(let[n,r]of Object.entries(D)){t.push({id:n,label:e(`mind.${n}`)});for(let n of r)t.push({id:n,label:e(`mind.${n}`)})}return t},[e]),n=(0,T.useMemo)(()=>{let e=[];for(let[t,n]of Object.entries(D)){e.push({source:`launch`,target:t});for(let r of n)e.push({source:t,target:r})}return e},[]);return(0,E.jsx)(h,{nodes:t,edges:n,layout:`mindmap`,height:460,ariaLabel:e(`mindAria`)})}var T,E,D;function O(){return(O=e((()=>{T=t(),i(),m(),E=n(),D={goals:[`revenue`,`awareness`,`retention`],audience:[`teams`,`freelancers`,`students`],channels:[`launchEvent`,`newsletter`,`partners`,`social`],timeline:[`beta`,`pressKit`,`launchDay`],risks:[`delays`,`pricing`],budget:[`ads`,`events`]}})))()}function k(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),[t,n]=(0,A.useState)(``),i=(0,A.useMemo)(()=>M.map(([t,n])=>({id:t,label:e(`people.${t}`),subtitle:e(`roles.${t}`),group:n,collapsed:t===`backend`})),[e]),a=(0,A.useMemo)(()=>M.filter(([,,e])=>e).map(([e,,t])=>({source:t,target:e})),[]),o=(0,A.useMemo)(()=>N.map(t=>({id:t,name:e(`departments.${t}`)})),[e]);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(h,{nodes:i,edges:a,groups:o,layout:`org`,height:560,ariaLabel:e(`orgAria`),onToggle:t=>n(e(t.collapsed?`teamCollapsed`:`teamExpanded`,{name:e(`people.${t.id}`)}))}),(0,j.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:t||e(`orgHint`)})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),i(),m(),j=n(),M=[[`ceo`,`executive`,null],[`cto`,`engineering`,`ceo`],[`cfo`,`finance`,`ceo`],[`coo`,`operations`,`ceo`],[`cmo`,`marketing`,`ceo`],[`frontend`,`engineering`,`cto`],[`backend`,`engineering`,`cto`],[`web1`,`engineering`,`frontend`],[`web2`,`engineering`,`frontend`],[`api1`,`engineering`,`backend`],[`api2`,`engineering`,`backend`],[`api3`,`engineering`,`backend`],[`controller`,`finance`,`cfo`],[`analyst`,`finance`,`cfo`],[`support`,`operations`,`coo`],[`logistics`,`operations`,`coo`],[`brand`,`marketing`,`cmo`],[`growth`,`marketing`,`cmo`]],N=[`executive`,`engineering`,`finance`,`operations`,`marketing`]})))()}function F(){let{t:e}=r(`common`,{keyPrefix:`docs.tree-chart.data`}),t=(0,I.useMemo)(()=>{let t=[{id:`root`,label:`Minerva`,size:16}];return Object.entries(R).forEach(([n,r])=>{t.push({id:n,label:e(`categories.${n}`),group:n,size:12});for(let e of r)t.push({id:e,label:e,group:n})}),t},[e]),n=(0,I.useMemo)(()=>{let e=[];for(let[t,n]of Object.entries(R)){e.push({source:`root`,target:t});for(let r of n)e.push({source:t,target:r})}return e},[]),i=(0,I.useMemo)(()=>Object.keys(R).map((t,n)=>({id:t,name:e(`categories.${t}`),color:z[n]})),[e]);return(0,L.jsx)(h,{nodes:t,edges:n,groups:i,layout:`radial`,nodeSize:8,legend:!1,height:560,ariaLabel:e(`radialAria`)})}var I,L,R,z;function B(){return(B=e((()=>{I=t(),i(),m(),L=n(),R={inputs:[`Button`,`Input`,`Select`,`Checkbox`,`Radio`,`Switch`,`Slider`,`DatePicker`,`Upload`],navigation:[`Tabs`,`Menu`,`Breadcrumb`,`Pagination`,`Steps`],feedback:[`Alert`,`Toast`,`Modal`,`Drawer`,`Progress`,`Skeleton`],display:[`Table`,`List`,`Card`,`Avatar`,`Badge`,`Tag`,`Tooltip`,`Tree`],layout:[`Grid`,`Stack`,`Divider`,`AppShell`],charts:[`LineChart`,`BarChart`,`PieChart`,`SankeyChart`,`TradingChart`,`GraphChart`,`TreeChart`]},z=[`var(--chart-series-1, #4f46e5)`,`var(--chart-series-2, #10b981)`,`var(--chart-series-3, #f59e0b)`,`var(--chart-series-4, #ef4444)`,`var(--chart-series-5, #0ea5e9)`,`var(--chart-series-6, #8b5cf6)`]})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "folder" | "code" | "style" | "data" | "doc";

// path → kind; folders end with "/"
const FILES: string[] = [
  "minerva-design/",
  "minerva-design/packages/",
  "minerva-design/packages/charts/",
  "minerva-design/packages/charts/src/",
  "minerva-design/packages/charts/src/core.ts",
  "minerva-design/packages/charts/src/index.ts",
  "minerva-design/packages/charts/src/engine/",
  "minerva-design/packages/charts/src/engine/chart.ts",
  "minerva-design/packages/charts/src/engine/theme.ts",
  "minerva-design/packages/charts/src/engine/graph/",
  "minerva-design/packages/charts/src/engine/graph/force.ts",
  "minerva-design/packages/charts/src/engine/graph/dag.ts",
  "minerva-design/packages/charts/src/engine/graph/tree.ts",
  "minerva-design/packages/charts/package.json",
  "minerva-design/packages/react/",
  "minerva-design/packages/react/src/",
  "minerva-design/packages/react/src/Button.tsx",
  "minerva-design/packages/react/src/Button.module.scss",
  "minerva-design/packages/react/src/Tree.tsx",
  "minerva-design/packages/react/package.json",
  "minerva-design/apps/",
  "minerva-design/apps/docs/",
  "minerva-design/apps/docs/src/",
  "minerva-design/apps/docs/src/main.tsx",
  "minerva-design/apps/docs/src/styles.css",
  "minerva-design/apps/docs/README.md",
  "minerva-design/package.json",
  "minerva-design/README.md",
];

const kindOf = (path: string): Kind =>
  path.endsWith("/")
    ? "folder"
    : /\\.(tsx?|js)$/.test(path)
      ? "code"
      : /\\.(s?css)$/.test(path)
        ? "style"
        : path.endsWith(".json")
          ? "data"
          : "doc";

const parentOf = (path: string) => {
  const trimmed = path.replace(/\\/$/, "");
  const cut = trimmed.lastIndexOf("/");
  return cut < 0 ? null : \`\${trimmed.slice(0, cut)}/\`;
};

const KINDS: Kind[] = ["folder", "code", "style", "data", "doc"];

export default function FileTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const nodes = useMemo(
    (): GraphNode[] =>
      FILES.map((path) => ({
        id: path,
        label: path.replace(/\\/$/, "").split("/").pop(),
        group: kindOf(path),
        // deep folders start collapsed
        collapsed: path.endsWith("/") && path.split("/").length > 4,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      FILES.filter((path) => parentOf(path)).map((path) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(\`fileKinds.\${id}\`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.expand()}
        >
          {t("expandAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.collapse()}
        >
          {t("collapseAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.fit()}
        >
          {t("fit")}
        </Button>
      </HStack>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={9}
        height={480}
        ariaLabel={t("filesAria")}
      />
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// branch → ideas (keys of the locale file)
const MAP: Record<string, string[]> = {
  goals: ["revenue", "awareness", "retention"],
  audience: ["teams", "freelancers", "students"],
  channels: ["launchEvent", "newsletter", "partners", "social"],
  timeline: ["beta", "pressKit", "launchDay"],
  risks: ["delays", "pricing"],
  budget: ["ads", "events"],
};

export default function MindMapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "launch", label: t("mind.launch") }];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ id: branch, label: t(\`mind.\${branch}\`) });
      for (const idea of ideas)
        list.push({ id: idea, label: t(\`mind.\${idea}\`) });
    }
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ source: "launch", target: branch });
      for (const idea of ideas) list.push({ source: branch, target: idea });
    }
    return list;
  }, []);

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      layout="mindmap"
      height={460}
      ariaLabel={t("mindAria")}
    />
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Department =
  "executive" | "engineering" | "finance" | "operations" | "marketing";

// person, department, manager
const PEOPLE: [string, Department, string | null][] = [
  ["ceo", "executive", null],
  ["cto", "engineering", "ceo"],
  ["cfo", "finance", "ceo"],
  ["coo", "operations", "ceo"],
  ["cmo", "marketing", "ceo"],
  ["frontend", "engineering", "cto"],
  ["backend", "engineering", "cto"],
  ["web1", "engineering", "frontend"],
  ["web2", "engineering", "frontend"],
  ["api1", "engineering", "backend"],
  ["api2", "engineering", "backend"],
  ["api3", "engineering", "backend"],
  ["controller", "finance", "cfo"],
  ["analyst", "finance", "cfo"],
  ["support", "operations", "coo"],
  ["logistics", "operations", "coo"],
  ["brand", "marketing", "cmo"],
  ["growth", "marketing", "cmo"],
];

const DEPARTMENTS: Department[] = [
  "executive",
  "engineering",
  "finance",
  "operations",
  "marketing",
];

export default function OrgChartDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [status, setStatus] = useState("");
  const nodes = useMemo(
    (): GraphNode[] =>
      PEOPLE.map(([id, department]) => ({
        id,
        label: t(\`people.\${id}\`),
        subtitle: t(\`roles.\${id}\`),
        group: department,
        // the backend team starts collapsed
        collapsed: id === "backend",
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PEOPLE.filter(([, , manager]) => manager).map(([id, , manager]) => ({
        source: manager!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => DEPARTMENTS.map((id) => ({ id, name: t(\`departments.\${id}\`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={560}
        ariaLabel={t("orgAria")}
        onToggle={(event) =>
          setStatus(
            t(event.collapsed ? "teamCollapsed" : "teamExpanded", {
              name: t(\`people.\${event.id}\`),
            }),
          )
        }
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {status || t("orgHint")}
      </span>
    </div>
  );
}
`})))()}var q;function J(){return(J=e((()=>{q=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// the components of the library, by category
const CATEGORIES: Record<string, string[]> = {
  inputs: [
    "Button",
    "Input",
    "Select",
    "Checkbox",
    "Radio",
    "Switch",
    "Slider",
    "DatePicker",
    "Upload",
  ],
  navigation: ["Tabs", "Menu", "Breadcrumb", "Pagination", "Steps"],
  feedback: ["Alert", "Toast", "Modal", "Drawer", "Progress", "Skeleton"],
  display: [
    "Table",
    "List",
    "Card",
    "Avatar",
    "Badge",
    "Tag",
    "Tooltip",
    "Tree",
  ],
  layout: ["Grid", "Stack", "Divider", "AppShell"],
  charts: [
    "LineChart",
    "BarChart",
    "PieChart",
    "SankeyChart",
    "TradingChart",
    "GraphChart",
    "TreeChart",
  ],
};

const CATEGORY_COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
];

export default function RadialDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "root", label: "Minerva", size: 16 }];
    Object.entries(CATEGORIES).forEach(([category, components]) => {
      list.push({
        id: category,
        label: t(\`categories.\${category}\`),
        group: category,
        size: 12,
      });
      for (const name of components)
        list.push({ id: name, label: name, group: category });
    });
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [category, components] of Object.entries(CATEGORIES)) {
      list.push({ source: "root", target: category });
      for (const name of components)
        list.push({ source: category, target: name });
    }
    return list;
  }, []);
  const groups = useMemo(
    () =>
      Object.keys(CATEGORIES).map((id, i) => ({
        id,
        name: t(\`categories.\${id}\`),
        color: CATEGORY_COLORS[i],
      })),
    [t],
  );

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      groups={groups}
      layout="radial"
      nodeSize={8}
      legend={false}
      height={560}
      ariaLabel={t("radialAria")}
    />
  );
}
`})))()}var Y,X,Z,Q;function $(){return($=e((()=>{C(),O(),P(),B(),H(),W(),K(),J(),t(),i(),f(),l(),p(),Y=n(),X=d(Object.assign({"./demos/file-tree.tsx":g,"./demos/mind-map.tsx":w,"./demos/org-chart.tsx":k,"./demos/radial.tsx":F}),Object.assign({"./demos/file-tree.tsx":V,"./demos/mind-map.tsx":U,"./demos/org-chart.tsx":G,"./demos/radial.tsx":q})),Z=`import { TreeChart } from "minerva-design/charts";
// pure tree layouts: tidy tree, radial, mind map, org chart (no DOM)
import { treeLayout } from "minerva-design/charts/core";`,Q=()=>{let{t:e}=r(),t=(0,Y.jsxs)(`section`,{className:u.section,"aria-labelledby":`tree-overview`,children:[(0,Y.jsx)(`h2`,{id:`tree-overview`,children:e(`docs.tree-chart.intro.overview.title`)}),(0,Y.jsx)(`p`,{className:u.prose,children:e(`docs.tree-chart.intro.overview.text`)}),(0,Y.jsxs)(`ul`,{className:u.prose,children:[(0,Y.jsx)(`li`,{children:e(`docs.tree-chart.intro.overview.tidy`)}),(0,Y.jsx)(`li`,{children:e(`docs.tree-chart.intro.overview.layouts`)}),(0,Y.jsx)(`li`,{children:e(`docs.tree-chart.intro.overview.collapse`)})]})]});return(0,Y.jsx)(ee,{id:`tree-chart`,demos:X,intro:t,importCode:Z})}})))()}$();export{Q as default};