import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CsvLrYUR.js";import{n as a,t as o}from"./Switch-CHbzff3y.js";import{i as s,r as c}from"./DemoBlock-DnM97CAJ.js";import{i as l,r as u}from"./angular-preview-CI0B6PFx.js";import{l as d,n as f,t as p,u as m}from"./DocPage-CmQtD5jg.js";import{n as h,r as g}from"./graph-MY42gkE8.js";function _(){let{t:e}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[t,n]=(0,v.useState)([`fct_orders`]),i=(0,v.useMemo)(()=>b.map(([t,n])=>({id:t,label:n===`dashboard`?e(`dashboards.${t}`):t,group:n})),[e]),a=(0,v.useMemo)(()=>x.map(([e,t])=>({source:e,target:t})),[]),o=(0,v.useMemo)(()=>S.map(t=>({id:t,name:e(`layers.${t}`)})),[e]),s=t[0],c=i.find(e=>e.id===s)?.label;return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,y.jsx)(g,{nodes:i,edges:a,groups:o,direction:`LR`,selected:t,highlight:`lineage`,height:420,ariaLabel:e(`lineageAria`),onSelectionChange:n}),(0,y.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:s?e(`lineageSummary`,{name:c,upstream:C(s,!1),downstream:C(s,!0)}):e(`lineageHint`)})]})}var v,y,b,x,S,C;function w(){return(w=e((()=>{v=t(),i(),h(),y=n(),b=[[`raw.orders`,`source`],[`raw.payments`,`source`],[`raw.customers`,`source`],[`raw.events`,`source`],[`stg_orders`,`staging`],[`stg_payments`,`staging`],[`stg_customers`,`staging`],[`stg_sessions`,`staging`],[`fct_orders`,`mart`],[`dim_customers`,`mart`],[`fct_revenue`,`mart`],[`fct_engagement`,`mart`],[`revenue`,`dashboard`],[`retention`,`dashboard`],[`growth`,`dashboard`]],x=[[`raw.orders`,`stg_orders`],[`raw.payments`,`stg_payments`],[`raw.customers`,`stg_customers`],[`raw.events`,`stg_sessions`],[`stg_orders`,`fct_orders`],[`stg_payments`,`fct_orders`],[`stg_customers`,`dim_customers`],[`stg_orders`,`dim_customers`],[`fct_orders`,`fct_revenue`],[`stg_payments`,`fct_revenue`],[`stg_sessions`,`fct_engagement`],[`dim_customers`,`fct_engagement`],[`fct_revenue`,`revenue`],[`dim_customers`,`retention`],[`fct_engagement`,`retention`],[`fct_revenue`,`growth`],[`fct_engagement`,`growth`]],S=[`source`,`staging`,`mart`,`dashboard`],C=(e,t)=>{let n=new Set([e]),r=[e];for(;r.length;){let e=r.shift();for(let[i,a]of x){let[o,s]=t?[i,a]:[a,i];o===e&&!n.has(s)&&(n.add(s),r.push(s))}}return n.size-1}})))()}function T(){let{t:e}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),t=(0,E.useMemo)(()=>O.map(([e,t,n])=>({id:e,label:e,subtitle:`v${n}`,group:t})),[]),n=(0,E.useMemo)(()=>[...k.map(([t,n,r])=>({source:t,target:n,dashed:!!r,label:r?e(`devDependency`):void 0})),{source:A[0],target:A[1],color:`var(--danger-color, #ef4444)`,label:e(`circularDependency`)}],[e]),i=(0,E.useMemo)(()=>j.map(t=>({id:t,name:e(`kinds.${t}`)})),[e]);return(0,D.jsx)(g,{nodes:t,edges:n,groups:i,height:520,edgeLabels:`hover`,ariaLabel:e(`packagesAria`)})}var E,D,O,k,A,j;function M(){return(M=e((()=>{E=t(),i(),h(),D=n(),O=[[`docs`,`app`,`2.4.0`],[`playground`,`app`,`0.9.1`],[`admin-console`,`app`,`1.6.0`],[`react`,`framework`,`3.2.0`],[`vue`,`framework`,`3.2.0`],[`angular`,`framework`,`3.2.0`],[`web-components`,`framework`,`3.2.0`],[`charts`,`library`,`1.8.0`],[`core`,`library`,`3.2.0`],[`i18n`,`library`,`1.1.0`],[`icons`,`library`,`2.0.3`],[`tokens`,`library`,`1.4.2`],[`utils`,`library`,`1.0.7`],[`build-scripts`,`tooling`,`0.5.0`],[`eslint-config`,`tooling`,`4.1.0`],[`tsconfig`,`tooling`,`1.0.0`]],k=[[`docs`,`react`],[`docs`,`vue`],[`docs`,`angular`],[`docs`,`web-components`],[`docs`,`charts`],[`docs`,`i18n`],[`playground`,`react`],[`playground`,`charts`],[`admin-console`,`react`],[`admin-console`,`charts`],[`admin-console`,`i18n`],[`react`,`core`],[`vue`,`core`],[`angular`,`core`],[`web-components`,`core`],[`react`,`icons`],[`vue`,`icons`],[`web-components`,`icons`],[`charts`,`core`],[`charts`,`utils`],[`core`,`tokens`],[`core`,`utils`],[`icons`,`tokens`],[`i18n`,`utils`],[`core`,`build-scripts`,!0],[`charts`,`build-scripts`,!0],[`react`,`eslint-config`,!0],[`build-scripts`,`tsconfig`,!0],[`eslint-config`,`tsconfig`,!0]],A=[`utils`,`i18n`],j=[`app`,`framework`,`library`,`tooling`]})))()}function N(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.dependency-graph.data`}),[n,i]=(0,P.useState)(!0),a=(0,P.useMemo)(()=>I.map(([t,n,r])=>({id:t,label:e(`tasks.${t}`),subtitle:e(`taskSubtitle`,{status:e(`statuses.${n}`),minutes:r}),group:n,value:r})),[e]),s=(0,P.useMemo)(()=>L.map(([t,n,r])=>({source:t,target:n,label:r?e(`edgeKinds.${r}`):void 0,dashed:r===`retry`})),[e]),c=(0,P.useMemo)(()=>z.map(t=>({id:t,name:e(`statuses.${t}`),color:R[t]})),[e]),u=(0,P.useMemo)(()=>l(a,s),[a,s]),d=e(`pathSeparator`);return(0,F.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,F.jsx)(o,{checked:n,onChange:i,label:e(`showCritical`)}),(0,F.jsx)(g,{nodes:a,edges:s,groups:c,direction:`LR`,edgeStyle:`orthogonal`,criticalPath:n,arrowStyle:`filled`,edgeLabels:`hover`,dag:{criticalColor:`var(--primary-color, #4f46e5)`,layerGap:48},height:420,ariaLabel:e(`pipelineAria`)}),(0,F.jsx)(`span`,{role:`status`,style:{color:`var(--text-secondary-color)`},children:e(`criticalSummary`,{minutes:new Intl.NumberFormat(t.language).format(u.length),path:u.nodes.map(t=>e(`tasks.${t}`)).join(d)})})]})}var P,F,I,L,R,z;function B(){return(B=e((()=>{P=t(),i(),a(),h(),u(),F=n(),I=[[`install`,`success`,3],[`lint`,`success`,2],[`typecheck`,`success`,3],[`unit`,`success`,6],[`security`,`success`,3],[`buildWeb`,`success`,5],[`buildDocs`,`success`,4],[`e2e`,`running`,9],[`visual`,`failed`,5],[`package`,`pending`,2],[`staging`,`pending`,3],[`production`,`pending`,4]],L=[[`install`,`lint`],[`install`,`typecheck`],[`install`,`unit`],[`install`,`security`],[`typecheck`,`buildWeb`],[`install`,`buildDocs`],[`buildWeb`,`e2e`],[`buildWeb`,`visual`],[`buildDocs`,`visual`],[`unit`,`package`],[`buildWeb`,`package`,`bundle`],[`buildWeb`,`package`,`types`],[`lint`,`package`],[`package`,`staging`],[`e2e`,`staging`],[`security`,`staging`],[`visual`,`staging`],[`staging`,`production`],[`visual`,`visual`,`retry`]],R={success:`var(--success-color, #16a34a)`,running:`var(--info-color, #0ea5e9)`,failed:`var(--danger-color, #ef4444)`,pending:`var(--text-secondary-color, #9ca3af)`},z=[`success`,`running`,`failed`,`pending`]})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Layer = "source" | "staging" | "mart" | "dashboard";

const TABLES: [string, Layer][] = [
  ["raw.orders", "source"],
  ["raw.payments", "source"],
  ["raw.customers", "source"],
  ["raw.events", "source"],
  ["stg_orders", "staging"],
  ["stg_payments", "staging"],
  ["stg_customers", "staging"],
  ["stg_sessions", "staging"],
  ["fct_orders", "mart"],
  ["dim_customers", "mart"],
  ["fct_revenue", "mart"],
  ["fct_engagement", "mart"],
  ["revenue", "dashboard"],
  ["retention", "dashboard"],
  ["growth", "dashboard"],
];

const FEEDS: [string, string][] = [
  ["raw.orders", "stg_orders"],
  ["raw.payments", "stg_payments"],
  ["raw.customers", "stg_customers"],
  ["raw.events", "stg_sessions"],
  ["stg_orders", "fct_orders"],
  ["stg_payments", "fct_orders"],
  ["stg_customers", "dim_customers"],
  ["stg_orders", "dim_customers"],
  ["fct_orders", "fct_revenue"],
  ["stg_payments", "fct_revenue"],
  ["stg_sessions", "fct_engagement"],
  ["dim_customers", "fct_engagement"],
  ["fct_revenue", "revenue"],
  ["dim_customers", "retention"],
  ["fct_engagement", "retention"],
  ["fct_revenue", "growth"],
  ["fct_engagement", "growth"],
];

const LAYERS: Layer[] = ["source", "staging", "mart", "dashboard"];

/** Nodes reachable from \`id\` following the edges forward or backward */
const reach = (id: string, forward: boolean): number => {
  const seen = new Set([id]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of FEEDS) {
      const [from, to] = forward ? [a, b] : [b, a];
      if (from === current && !seen.has(to)) {
        seen.add(to);
        queue.push(to);
      }
    }
  }
  return seen.size - 1;
};

export default function LineageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [selected, setSelected] = useState<string[]>(["fct_orders"]);
  const nodes = useMemo(
    (): GraphNode[] =>
      TABLES.map(([id, layer]) => ({
        id,
        label: layer === "dashboard" ? t(\`dashboards.\${id}\`) : id,
        group: layer,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] => FEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => LAYERS.map((id) => ({ id, name: t(\`layers.\${id}\`) })),
    [t],
  );
  const current = selected[0];
  const label = nodes.find((node) => node.id === current)?.label;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        selected={selected}
        highlight="lineage"
        height={420}
        ariaLabel={t("lineageAria")}
        onSelectionChange={setSelected}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {current
          ? t("lineageSummary", {
              name: label,
              upstream: reach(current, false),
              downstream: reach(current, true),
            })
          : t("lineageHint")}
      </span>
    </div>
  );
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "app" | "framework" | "library" | "tooling";

const PACKAGES: [string, Kind, string][] = [
  ["docs", "app", "2.4.0"],
  ["playground", "app", "0.9.1"],
  ["admin-console", "app", "1.6.0"],
  ["react", "framework", "3.2.0"],
  ["vue", "framework", "3.2.0"],
  ["angular", "framework", "3.2.0"],
  ["web-components", "framework", "3.2.0"],
  ["charts", "library", "1.8.0"],
  ["core", "library", "3.2.0"],
  ["i18n", "library", "1.1.0"],
  ["icons", "library", "2.0.3"],
  ["tokens", "library", "1.4.2"],
  ["utils", "library", "1.0.7"],
  ["build-scripts", "tooling", "0.5.0"],
  ["eslint-config", "tooling", "4.1.0"],
  ["tsconfig", "tooling", "1.0.0"],
];

// "a depends on b"; dev dependencies are dashed
const DEPENDS: [string, string, boolean?][] = [
  ["docs", "react"],
  ["docs", "vue"],
  ["docs", "angular"],
  ["docs", "web-components"],
  ["docs", "charts"],
  ["docs", "i18n"],
  ["playground", "react"],
  ["playground", "charts"],
  ["admin-console", "react"],
  ["admin-console", "charts"],
  ["admin-console", "i18n"],
  ["react", "core"],
  ["vue", "core"],
  ["angular", "core"],
  ["web-components", "core"],
  ["react", "icons"],
  ["vue", "icons"],
  ["web-components", "icons"],
  ["charts", "core"],
  ["charts", "utils"],
  ["core", "tokens"],
  ["core", "utils"],
  ["icons", "tokens"],
  ["i18n", "utils"],
  ["core", "build-scripts", true],
  ["charts", "build-scripts", true],
  ["react", "eslint-config", true],
  ["build-scripts", "tsconfig", true],
  ["eslint-config", "tsconfig", true],
];

// a circular dependency (both directions between two packages), drawn in red
const CYCLE: [string, string] = ["utils", "i18n"];

const KINDS: Kind[] = ["app", "framework", "library", "tooling"];

export default function PackagesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const nodes = useMemo(
    (): GraphNode[] =>
      PACKAGES.map(([id, kind, version]) => ({
        id,
        label: id,
        subtitle: \`v\${version}\`,
        group: kind,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] => [
      ...DEPENDS.map(([source, target, dev]) => ({
        source,
        target,
        dashed: !!dev,
        label: dev ? t("devDependency") : undefined,
      })),
      {
        source: CYCLE[0],
        target: CYCLE[1],
        color: "var(--danger-color, #ef4444)",
        label: t("circularDependency"),
      },
    ],
    [t],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(\`kinds.\${id}\`) })),
    [t],
  );

  return (
    <DependencyGraph
      nodes={nodes}
      edges={edges}
      groups={groups}
      height={520}
      edgeLabels="hover"
      ariaLabel={t("packagesAria")}
    />
  );
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  DependencyGraph,
  criticalPath,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "running" | "failed" | "pending";

// task, status, duration in minutes
const TASKS: [string, Status, number][] = [
  ["install", "success", 3],
  ["lint", "success", 2],
  ["typecheck", "success", 3],
  ["unit", "success", 6],
  ["security", "success", 3],
  ["buildWeb", "success", 5],
  ["buildDocs", "success", 4],
  ["e2e", "running", 9],
  ["visual", "failed", 5],
  ["package", "pending", 2],
  ["staging", "pending", 3],
  ["production", "pending", 4],
];

const NEEDS: [string, string, string?][] = [
  ["install", "lint"],
  ["install", "typecheck"],
  ["install", "unit"],
  ["install", "security"],
  ["typecheck", "buildWeb"],
  ["install", "buildDocs"],
  ["buildWeb", "e2e"],
  ["buildWeb", "visual"],
  ["buildDocs", "visual"],
  ["unit", "package"],
  // two artifacts between the same jobs: parallel routes
  ["buildWeb", "package", "bundle"],
  ["buildWeb", "package", "types"],
  ["lint", "package"],
  ["package", "staging"],
  ["e2e", "staging"],
  ["security", "staging"],
  ["visual", "staging"],
  ["staging", "production"],
  // a failed job retries itself: a self-loop
  ["visual", "visual", "retry"],
];

const STATUS_COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  running: "var(--info-color, #0ea5e9)",
  failed: "var(--danger-color, #ef4444)",
  pending: "var(--text-secondary-color, #9ca3af)",
};

const STATUSES: Status[] = ["success", "running", "failed", "pending"];

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [showCritical, setShowCritical] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map(([id, status, minutes]) => ({
        id,
        label: t(\`tasks.\${id}\`),
        subtitle: t("taskSubtitle", {
          status: t(\`statuses.\${status}\`),
          minutes,
        }),
        group: status,
        value: minutes,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      NEEDS.map(([source, target, kind]) => ({
        source,
        target,
        label: kind ? t(\`edgeKinds.\${kind}\`) : undefined,
        dashed: kind === "retry",
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(\`statuses.\${id}\`),
        color: STATUS_COLORS[id],
      })),
    [t],
  );
  // the same longest path the chart highlights, for the summary below
  const path = useMemo(() => criticalPath(nodes, edges), [nodes, edges]);
  const separator = t("pathSeparator");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={showCritical}
        onChange={setShowCritical}
        label={t("showCritical")}
      />
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        edgeStyle="orthogonal"
        criticalPath={showCritical}
        arrowStyle="filled"
        edgeLabels="hover"
        dag={{ criticalColor: "var(--primary-color, #4f46e5)", layerGap: 48 }}
        height={420}
        ariaLabel={t("pipelineAria")}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t("criticalSummary", {
          minutes: new Intl.NumberFormat(i18n.language).format(path.length),
          path: path.nodes.map((id) => t(\`tasks.\${id}\`)).join(separator),
        })}
      </span>
    </div>
  );
}
`})))()}var q,J,Y,X;function Z(){return(Z=e((()=>{w(),M(),B(),H(),W(),K(),t(),i(),f(),s(),m(),q=n(),J=d(Object.assign({"./demos/lineage.tsx":_,"./demos/packages.tsx":T,"./demos/pipeline.tsx":N}),Object.assign({"./demos/lineage.tsx":V,"./demos/packages.tsx":U,"./demos/pipeline.tsx":G})),Y=`import { DependencyGraph } from "minerva-design/charts";
// pure layered layout, crossing count and critical path (no DOM)
import { dagLayout, countCrossings, criticalPath } from "minerva-design/charts/core";`,X=()=>{let{t:e}=r(),t=(0,q.jsxs)(`section`,{className:c.section,"aria-labelledby":`dag-overview`,children:[(0,q.jsx)(`h2`,{id:`dag-overview`,children:e(`docs.dependency-graph.intro.overview.title`)}),(0,q.jsx)(`p`,{className:c.prose,children:e(`docs.dependency-graph.intro.overview.text`)}),(0,q.jsxs)(`ul`,{className:c.prose,children:[(0,q.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.layers`)}),(0,q.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.crossings`)}),(0,q.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.coordinates`)}),(0,q.jsx)(`li`,{children:e(`docs.dependency-graph.intro.overview.highlight`)})]})]});return(0,q.jsx)(p,{id:`dependency-graph`,demos:J,intro:t,importCode:Y})}})))()}Z();export{X as default};