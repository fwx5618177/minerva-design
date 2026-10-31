import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{i as p,r as m}from"./Stack-B3Kr9X_e.js";import{l as h,n as ee,t as te,u as ne}from"./DocPage-BdPOW9nQ.js";import{c as g,i as _}from"./shapes-B5QcpBlT.js";function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),n=t.language,[i,a]=(0,v.useState)(null),{data:o,areaTotals:s}=(0,v.useMemo)(()=>{let t=new Map;return{data:b.map(([n,r])=>{let i=e(`budget.areas.${n}`);return typeof r==`number`?(t.set(i,r),{name:i,value:r}):(t.set(i,r.reduce((e,[,t])=>e+t,0)),{name:i,children:r.map(([t,n])=>({name:e(`budget.programs.${t}`),value:n}))})}),areaTotals:t}},[e]),c=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e6)},[n]),l=(0,v.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),u=e=>{let t=e.path??[e.name],n=t.length>1?t[0]:null;return{path:t.join(` › `),amount:c(e.value),share:l(e.value/x),area:n,areaShare:n?l(e.value/(s.get(n)??e.value)):null}},d=t=>{let n=u(t);return n.area?e(`budget.programLine`,n):e(`budget.areaLine`,{path:n.path,amount:n.amount,share:n.share})};return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,y.jsx)(_,{data:o,drill:!1,innerRadius:.32,format:c,percentFormat:l,renderTooltip:e=>(0,y.jsx)(`span`,{children:d(e)}),onClick:a,height:400,ariaLabel:e(`budget.aria`)}),(0,y.jsx)(`p`,{role:`status`,style:{margin:0},children:i?d(i):e(`budget.hint`,{total:c(x)})})]})}var v,y,b,x;function ie(){return(ie=e((()=>{v=t(),i(),g(),y=n(),b=[[`education`,[[`schools`,412],[`universities`,96],[`libraries`,38]]],[`health`,[[`hospitals`,288],[`prevention`,64]]],[`transport`,[[`transit`,236],[`roads`,118],[`cycling`,42]]],[`safety`,[[`police`,154],[`fire`,87]]],[`environment`,[[`parks`,71],[`waste`,109],[`water`,83]]],[`administration`,132]],x=b.reduce((e,[,t])=>e+(typeof t==`number`?t:t.reduce((e,[,t])=>e+t,0)),0)})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),[n,i]=(0,S.useState)([]),a=(0,S.useMemo)(()=>{let t=n=>n.map(n=>({name:n.folder?e(`disk.${n.folder}`):n.name??``,value:n.size,...n.children?{children:t(n.children)}:{}}));return t(w)},[e]),o=(0,S.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:1});return t=>e(`gb`,{value:n.format(t)})},[t.language,e]);return(0,C.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,C.jsx)(_,{data:a,format:o,onDrill:e=>i(e.path),height:400,ariaLabel:e(`diskAria`)}),(0,C.jsx)(`p`,{role:`status`,style:{margin:0},children:n.length?e(`diskPath`,{path:[e(`disk.root`),...n].join(` / `)}):e(`diskHint`)})]})}var S,C,w;function T(){return(T=e((()=>{S=t(),i(),g(),C=n(),w=[{folder:`applications`,children:[{name:`Xcode`,size:12.4},{name:`Docker`,size:9.8},{name:`Figma`,size:1.2},{name:`Chrome`,size:1.1},{name:`Slack`,size:.6},{folder:`other`,size:3.4}]},{folder:`photos`,children:[{name:`2024`,size:18.5},{name:`2025`,size:22.1},{name:`2026`,size:9.6}]},{folder:`developer`,children:[{name:`node_modules`,size:14.2},{folder:`caches`,children:[{name:`npm`,size:3.1},{name:`pnpm`,size:6.4},{name:`Gradle`,size:2.2}]},{folder:`simulators`,size:11.5}]},{folder:`documents`,children:[{folder:`projects`,children:[{name:`minerva`,size:4.2},{name:`client-site`,size:2.7},{folder:`archive`,size:6.1}]},{folder:`pdfs`,size:2.3},{folder:`spreadsheets`,size:.8}]},{folder:`system`,size:18},{folder:`music`,size:7.4}]})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),[n,i]=(0,E.useState)([]),a=(0,E.useMemo)(()=>{let t=n=>n.map(([n,r])=>typeof r==`number`?{name:e(`catalog.${n}`),value:r}:{name:e(`catalog.${n}`),children:t(r)});return t(O)},[e]),s=(0,E.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[t.language]),c=[e(`catalog.all`),...n];return(0,D.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,D.jsx)(p,{gap:4,align:`center`,wrap:!0,as:`nav`,"aria-label":e(`breadcrumb`),children:c.map((e,t)=>(0,D.jsxs)(p,{gap:4,align:`center`,children:[t>0&&(0,D.jsx)(`span`,{"aria-hidden":!0,children:`/`}),(0,D.jsx)(o,{size:`small`,variant:t===n.length?`solid`:`ghost`,"aria-current":t===n.length?`location`:void 0,onClick:()=>i(n.slice(0,t)),children:e})]},`${t}-${e}`))}),(0,D.jsx)(_,{data:a,drillPath:n,onDrill:e=>i(e.path),format:s,cornerRadius:4,padAngle:2,height:400,ariaLabel:e(`catalogAria`)})]})}var E,D,O;function k(){return(k=e((()=>{E=t(),i(),a(),m(),g(),D=n(),O=[[`electronics`,[[`phones`,[[`flagship`,420],[`midRange`,310],[`accessories`,140]]],[`laptops`,520],[`audio`,[[`headphones`,190],[`speakers`,110]]]]],[`home`,[[`kitchen`,260],[`furniture`,340],[`decor`,120]]],[`fashion`,[[`men`,210],[`women`,330],[`kids`,150]]],[`sports`,[[`outdoor`,180],[`fitness`,160]]]]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),n=t.language,[i,a]=(0,A.useState)([]),o=(0,A.useMemo)(()=>M.map(([t,n,r])=>typeof r==`number`?{name:e(`energy.sources.${t}`),color:n,value:r}:{name:e(`energy.sources.${t}`),color:n,children:r.map(([t,n])=>({name:e(`energy.fuels.${t}`),value:n}))}),[e]),s=(0,A.useMemo)(()=>new Intl.NumberFormat(n,{maximumFractionDigits:0}),[n]),c=(0,A.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),l=t=>e(`energy.twh`,{value:s.format(t)}),u=M.reduce((e,[,,t],n)=>i.includes(n)?e:e+F(t),0),d=F(M[P][2]),p=i.includes(N);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsx)(f,{checked:p,onChange:e=>a(t=>e?[...t,N]:t.filter(e=>e!==N)),label:e(`energy.hideFossil`)}),(0,j.jsx)(_,{data:o,legend:!0,hidden:i,onToggle:e=>a(e.hiddenIndexes),innerRadius:.3,format:l,height:420,ariaLabel:e(`energy.aria`)}),(0,j.jsx)(`output`,{"aria-live":`polite`,children:i.includes(P)?e(`energy.shownOnly`,{total:l(u)}):e(`energy.share`,{share:c.format(u?d/u:0),total:l(u)})})]})}var A,j,M,N,P,F;function I(){return(I=e((()=>{A=t(),i(),d(),g(),j=n(),M=[[`renewables`,`#16a34a`,[[`wind`,136],[`solar`,62],[`hydro`,19],[`biomass`,44]]],[`nuclear`,`#7c3aed`,34],[`fossil`,`#78716c`,[[`gas`,79],[`coal`,128],[`oil`,4]]]],N=M.findIndex(([e])=>e===`fossil`),P=M.findIndex(([e])=>e===`renewables`),F=e=>typeof e==`number`?e:e.reduce((e,[,t])=>e+t,0)})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),[n,i]=(0,L.useState)(`auto`),a=t.language,o=(0,L.useMemo)(()=>{let t=new Intl.DisplayNames([a],{type:`region`});return z.map(([n,r])=>({name:e(`world.${n}`),children:r.map(([n,r])=>({name:n===`other`?e(`world.other`):t.of(n)??n,value:r}))}))},[a,e]),c=(0,L.useMemo)(()=>{let t=new Intl.NumberFormat(a);return n=>e(`millions`,{value:t.format(n)})},[a,e]);return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,R.jsx)(s,{"aria-label":e(`labelsLabel`),direction:`horizontal`,value:n,onChange:e=>i(e),children:B.map(t=>(0,R.jsx)(u,{value:t,label:e(`labels.${t}`)},t))}),(0,R.jsx)(_,{data:o,labels:n,format:c,legend:!0,startAngle:-30,height:440,ariaLabel:e(`worldAria`)})]})}var L,R,z,B;function V(){return(V=e((()=>{L=t(),i(),c(),l(),g(),R=n(),z=[[`asia`,[[`IN`,1429],[`CN`,1410],[`ID`,278],[`PK`,240],[`BD`,173],[`JP`,124],[`PH`,117],[`VN`,99],[`other`,856]]],[`africa`,[[`NG`,224],[`ET`,127],[`EG`,113],[`CD`,102],[`TZ`,67],[`other`,827]]],[`europe`,[[`RU`,144],[`DE`,84],[`GB`,68],[`FR`,68],[`IT`,59],[`other`,319]]],[`americas`,[[`US`,335],[`BR`,216],[`MX`,128],[`CO`,52],[`AR`,46],[`other`,263]]],[`oceania`,[[`AU`,27],[`PG`,10],[`NZ`,5],[`other`,3]]]],B=[`auto`,`tangential`,`radial`,`none`]})))()}function le(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),n=t.language,[i,a]=(0,H.useState)(G),[s,c]=(0,H.useState)(!0),l=(0,H.useRef)(le(K));(0,H.useEffect)(()=>{if(!s)return;let e=window.setInterval(()=>{let e=G.map(()=>l.current()*.3-.15);a(t=>t.map((t,n)=>Math.max(20,Math.round(t*(1+e[n])+(G[n]-t)*.25))))},1500);return()=>window.clearInterval(e)},[s]);let{data:u,totals:d}=(0,H.useMemo)(()=>{let t=W.map((e,t)=>W.slice(0,t).reduce((e,[,t])=>e+t.length,0));return{data:W.map(([n,r],a)=>({name:e(`requests.services.${n}`),children:r.map(([n],r)=>({name:e(`requests.endpoints.${n}`),value:i[t[a]+r]}))})),totals:W.map(([,e],n)=>e.reduce((e,r,a)=>e+i[t[n]+a],0))}},[i,e]),f=(0,H.useMemo)(()=>new Intl.NumberFormat(n),[n]),m=t=>e(`requests.rpm`,{value:f.format(t)}),h=d.reduce((e,t)=>e+t,0),ee=d.indexOf(Math.max(...d));return(0,U.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,U.jsx)(_,{data:u,innerRadius:.4,cornerRadius:3,padAngle:1,format:m,height:380,ariaLabel:e(`requests.aria`)}),(0,U.jsxs)(p,{gap:8,wrap:!0,align:`center`,children:[(0,U.jsx)(o,{size:`small`,variant:`outline`,onClick:()=>c(e=>!e),children:e(s?`requests.pause`:`requests.resume`)}),(0,U.jsx)(`span`,{style:{color:`var(--text-muted-color)`},children:e(`requests.total`,{value:m(h)})})]}),(0,U.jsx)(`output`,{"aria-live":`polite`,children:e(`requests.busiest`,{service:u[ee].name})})]})}var H,U,W,G,K;function q(){return(q=e((()=>{H=t(),i(),a(),m(),g(),U=n(),W=[[`checkout`,[[`cart`,820],[`payment`,410],[`shipping`,260]]],[`search`,[[`query`,980],[`suggest`,540]]],[`accounts`,[[`login`,360],[`profile`,220]]],[`catalog`,[[`product`,690],[`reviews`,240]]]],G=W.flatMap(([,e])=>e.map(([,e])=>e)),K=21})))()}function de(){let{t:e}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),t=(0,J.useMemo)(()=>{let t=n=>n.map(([n,r])=>typeof r==`number`?{name:e(`org.${n}`),value:r}:{name:e(`org.${n}`),children:t(r)});return t(fe)},[e]),n=(0,J.useMemo)(()=>t=>e(`people`,{value:t}),[e]);return(0,Y.jsx)(_,{data:t,levels:2,labels:`radial`,innerRadius:.3,format:n,height:400,ariaLabel:e(`orgAria`)})}var J,Y,fe;function pe(){return(pe=e((()=>{J=t(),i(),g(),Y=n(),fe=[[`engineering`,[[`platform`,[[`infrastructure`,18],[`security`,9],[`devtools`,11]]],[`product`,[[`web`,24],[`mobile`,16],[`payments`,12]]],[`data`,[[`analytics`,10],[`ml`,8]]]]],[`sales`,[[`emea`,22],[`americas`,31],[`apac`,14]]],[`success`,[[`support`,26],[`onboarding`,9]]],[`marketing`,[[`brand`,7],[`growth`,12],[`content`,6]]],[`operations`,[[`finance`,8],[`people`,7],[`legal`,4],[`it`,6]]]]})))()}function me(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),n=t.language,[i,a]=(0,X.useState)(`week`),{data:o,total:c,billable:l}=(0,X.useMemo)(()=>{let t=(e,t)=>i===`week`?t:_e(t*he[e]),n=Q.map(([n,r])=>({name:e(`time.clients.${n}`),children:r.map(([r,i])=>({name:e(`time.projects.${r}`),children:i.map(([r,i])=>({name:e(`time.activities.${r}`),value:t(n,i)}))}))})),r=Q.flatMap(([e,n])=>n.flatMap(([,n])=>n.map(([,n])=>[e,t(e,n)]))),a=e=>e.reduce((e,[,t])=>e+t,0);return{data:n,total:a(r),billable:a(r.filter(([e])=>e!==`internal`))}},[i,e]),d=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`hour`,unitDisplay:`short`,maximumFractionDigits:1}),[n]),f=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),[n]);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsx)(s,{"aria-label":e(`time.period`),direction:`horizontal`,value:i,onChange:e=>a(e),children:ge.map(t=>(0,Z.jsx)(u,{value:t,label:e(`time.periods.${t}`)},t))}),(0,Z.jsx)(_,{data:o,innerRadius:.28,padAngle:1,format:e=>d.format(e),renderTooltip:t=>(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,Z.jsx)(`strong`,{children:(t.path??[t.name]).join(` › `)}),(0,Z.jsx)(`span`,{children:e(`time.tooltip`,{hours:d.format(t.value),share:f.format(t.value/c)})})]}),height:400,ariaLabel:e(`time.aria`,{period:e(`time.periods.${i}`)})}),(0,Z.jsx)(`output`,{"aria-live":`polite`,children:e(`time.summary`,{billable:d.format(l),total:d.format(c),share:f.format(l/c)})})]})}var X,Z,Q,he,ge,_e;function ve(){return(ve=e((()=>{X=t(),i(),c(),l(),g(),Z=n(),Q=[[`bakery`,[[`website`,[[`design`,6],[`development`,9],[`meetings`,2]]],[`branding`,[[`design`,5],[`meetings`,1.5]]]]],[`clinic`,[[`booking`,[[`development`,12],[`review`,3],[`meetings`,2]]]]],[`school`,[[`app`,[[`design`,3],[`development`,8],[`review`,2]]]]],[`internal`,[[`admin`,[[`meetings`,3],[`support`,2]]],[`training`,[[`learning`,2.5]]]]]],he={bakery:3.6,clinic:4.5,school:4.2,internal:3.8},ge=[`week`,`month`],_e=e=>Math.round(e*2)/2})))()}var ye;function be(){return(be=e((()=>{ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SunburstChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

type Area = [key: string, programs: [string, number][] | number];

// Yearly budget of a city, in million euros: policy areas and programs
const BUDGET: Area[] = [
  [
    "education",
    [
      ["schools", 412],
      ["universities", 96],
      ["libraries", 38],
    ],
  ],
  [
    "health",
    [
      ["hospitals", 288],
      ["prevention", 64],
    ],
  ],
  [
    "transport",
    [
      ["transit", 236],
      ["roads", 118],
      ["cycling", 42],
    ],
  ],
  [
    "safety",
    [
      ["police", 154],
      ["fire", 87],
    ],
  ],
  [
    "environment",
    [
      ["parks", 71],
      ["waste", 109],
      ["water", 83],
    ],
  ],
  ["administration", 132],
];

const TOTAL = BUDGET.reduce(
  (sum, [, programs]) =>
    sum +
    (typeof programs === "number"
      ? programs
      : programs.reduce((s, [, value]) => s + value, 0)),
  0,
);

export default function CityBudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const { data, areaTotals } = useMemo(() => {
    const areaTotals = new Map<string, number>();
    const data: TreemapNode[] = BUDGET.map(([key, programs]) => {
      const name = t(\`budget.areas.\${key}\`);
      if (typeof programs === "number") {
        areaTotals.set(name, programs);
        return { name, value: programs };
      }
      areaTotals.set(
        name,
        programs.reduce((sum, [, value]) => sum + value, 0),
      );
      return {
        name,
        children: programs.map(([program, value]) => ({
          name: t(\`budget.programs.\${program}\`),
          value,
        })),
      };
    });
    return { data, areaTotals };
  }, [t]);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1_000_000);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  // share of the city budget, and of the policy area for a program
  const describe = (node: ShapeHoverEvent) => {
    const path = node.path ?? [node.name];
    const area = path.length > 1 ? path[0] : null;
    return {
      path: path.join(" › "),
      amount: format(node.value),
      share: percentFormat(node.value / TOTAL),
      area,
      areaShare: area
        ? percentFormat(node.value / (areaTotals.get(area) ?? node.value))
        : null,
    };
  };

  const line = (node: ShapeHoverEvent) => {
    const d = describe(node);
    return d.area
      ? t("budget.programLine", d)
      : t("budget.areaLine", {
          path: d.path,
          amount: d.amount,
          share: d.share,
        });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      {/* drill is off: a click selects a sector instead of zooming in */}
      <SunburstChart
        data={data}
        drill={false}
        innerRadius={0.32}
        format={format}
        percentFormat={percentFormat}

        renderTooltip={(node) => <span>{line(node)}</span>}
        onClick={setSelected}
        height={400}
        ariaLabel={t("budget.aria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected ? line(selected) : t("budget.hint", { total: format(TOTAL) })}
      </p>
    </div>
  );
}
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

// Disk usage of a laptop, in GB. App and project names are proper nouns;
// the folder names come from the translations.
type Folder =
  | "applications"
  | "documents"
  | "projects"
  | "archive"
  | "pdfs"
  | "spreadsheets"
  | "photos"
  | "developer"
  | "caches"
  | "simulators"
  | "system"
  | "music"
  | "other";

interface Entry {
  name?: string;
  folder?: Folder;
  size?: number;
  children?: Entry[];
}

const DISK: Entry[] = [
  {
    folder: "applications",
    children: [
      { name: "Xcode", size: 12.4 },
      { name: "Docker", size: 9.8 },
      { name: "Figma", size: 1.2 },
      { name: "Chrome", size: 1.1 },
      { name: "Slack", size: 0.6 },
      { folder: "other", size: 3.4 },
    ],
  },
  {
    folder: "photos",
    children: [
      { name: "2024", size: 18.5 },
      { name: "2025", size: 22.1 },
      { name: "2026", size: 9.6 },
    ],
  },
  {
    folder: "developer",
    children: [
      { name: "node_modules", size: 14.2 },
      {
        folder: "caches",
        children: [
          { name: "npm", size: 3.1 },
          { name: "pnpm", size: 6.4 },
          { name: "Gradle", size: 2.2 },
        ],
      },
      { folder: "simulators", size: 11.5 },
    ],
  },
  {
    folder: "documents",
    children: [
      {
        folder: "projects",
        children: [
          { name: "minerva", size: 4.2 },
          { name: "client-site", size: 2.7 },
          { folder: "archive", size: 6.1 },
        ],
      },
      { folder: "pdfs", size: 2.3 },
      { folder: "spreadsheets", size: 0.8 },
    ],
  },
  { folder: "system", size: 18 },
  { folder: "music", size: 7.4 },
];

export default function DiskUsageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const [path, setPath] = useState<string[]>([]);

  const data = useMemo(() => {
    const convert = (entries: Entry[]): TreemapNode[] =>
      entries.map((entry) => ({
        name: entry.folder ? t(\`disk.\${entry.folder}\`) : (entry.name ?? ""),
        value: entry.size,
        ...(entry.children ? { children: convert(entry.children) } : {}),
      }));
    return convert(DISK);
  }, [t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    return (value: number) => t("gb", { value: number.format(value) });
  }, [i18n.language, t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SunburstChart
        data={data}
        format={format}
        onDrill={(event) => setPath(event.path)}
        height={400}
        ariaLabel={t("diskAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {path.length
          ? t("diskPath", { path: [t("disk.root"), ...path].join(" / ") })
          : t("diskHint")}
      </p>
    </div>
  );
}
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Category = [key: string, revenue: number | Category[]];

// Online store revenue of a quarter, in thousands of dollars
const CATALOG: Category[] = [
  [
    "electronics",
    [
      [
        "phones",
        [
          ["flagship", 420],
          ["midRange", 310],
          ["accessories", 140],
        ],
      ],
      ["laptops", 520],
      [
        "audio",
        [
          ["headphones", 190],
          ["speakers", 110],
        ],
      ],
    ],
  ],
  [
    "home",
    [
      ["kitchen", 260],
      ["furniture", 340],
      ["decor", 120],
    ],
  ],
  [
    "fashion",
    [
      ["men", 210],
      ["women", 330],
      ["kids", 150],
    ],
  ],
  [
    "sports",
    [
      ["outdoor", 180],
      ["fitness", 160],
    ],
  ],
];

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  // controlled: the chart only proposes paths, the breadcrumb owns the state
  const [path, setPath] = useState<string[]>([]);

  const data = useMemo(() => {
    const convert = (items: Category[]): TreemapNode[] =>
      items.map(([key, revenue]) =>
        typeof revenue === "number"
          ? { name: t(\`catalog.\${key}\`), value: revenue }
          : { name: t(\`catalog.\${key}\`), children: convert(revenue) },
      );
    return convert(CATALOG);
  }, [t]);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1000);
  }, [i18n.language]);

  const crumbs = [t("catalog.all"), ...path];

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack gap={4} align="center" wrap as="nav" aria-label={t("breadcrumb")}>
        {crumbs.map((name, depth) => (
          <HStack key={\`\${depth}-\${name}\`} gap={4} align="center">
            {depth > 0 && <span aria-hidden>/</span>}
            <Button
              size="small"
              variant={depth === path.length ? "solid" : "ghost"}
              aria-current={depth === path.length ? "location" : undefined}
              onClick={() => setPath(path.slice(0, depth))}
            >
              {name}
            </Button>
          </HStack>
        ))}
      </HStack>
      <SunburstChart
        data={data}
        drillPath={path}
        onDrill={(event) => setPath(event.path)}
        format={format}
        cornerRadius={4}
        padAngle={2}
        height={400}
        ariaLabel={t("catalogAria")}
      />
    </div>
  );
}
`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Source = [key: string, color: string, value: number | [string, number][]];

// Yearly electricity generation of a country, in TWh
const MIX: Source[] = [
  [
    "renewables",
    "#16a34a",
    [
      ["wind", 136],
      ["solar", 62],
      ["hydro", 19],
      ["biomass", 44],
    ],
  ],
  ["nuclear", "#7c3aed", 34],
  [
    "fossil",
    "#78716c",
    [
      ["gas", 79],
      ["coal", 128],
      ["oil", 4],
    ],
  ],
];
const FOSSIL = MIX.findIndex(([key]) => key === "fossil");
const RENEWABLES = MIX.findIndex(([key]) => key === "renewables");

const sum = (value: Source[2]) =>
  typeof value === "number"
    ? value
    : value.reduce((total, [, twh]) => total + twh, 0);

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  // controlled: the legend and the switch edit the same hidden list
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): TreemapNode[] =>
      MIX.map(([key, color, value]) =>
        typeof value === "number"
          ? { name: t(\`energy.sources.\${key}\`), color, value }
          : {
              name: t(\`energy.sources.\${key}\`),
              color,
              children: value.map(([fuel, twh]) => ({
                name: t(\`energy.fuels.\${fuel}\`),
                value: twh,
              })),
            },
      ),
    [t],
  );
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = (value: number) =>
    t("energy.twh", { value: number.format(value) });

  const shown = MIX.reduce(
    (total, [, , value], i) =>
      hidden.includes(i) ? total : total + sum(value),
    0,
  );
  const renewables = sum(MIX[RENEWABLES][2]);
  const fossilHidden = hidden.includes(FOSSIL);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={fossilHidden}
        onChange={(checked) =>
          setHidden((current) =>
            checked
              ? [...current, FOSSIL]
              : current.filter((index) => index !== FOSSIL),
          )
        }
        label={t("energy.hideFossil")}
      />
      <SunburstChart
        data={data}
        legend
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        innerRadius={0.3}
        format={format}
        height={420}
        ariaLabel={t("energy.aria")}
      />
      <output aria-live="polite">
        {hidden.includes(RENEWABLES)
          ? t("energy.shownOnly", { total: format(shown) })
          : t("energy.share", {
              share: percent.format(shown ? renewables / shown : 0),
              total: format(shown),
            })}
      </output>
    </div>
  );
}
`})))()}var De;function $(){return($=e((()=>{De=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  SunburstChart,
  type SunburstChartProps,
  type TreemapNode,
} from "minerva-design/charts";

type Labels = NonNullable<SunburstChartProps["labels"]>;

// Population in millions (2023, rounded), by continent and country (ISO code)
const WORLD: [continent: string, countries: [string, number][]][] = [
  [
    "asia",
    [
      ["IN", 1429],
      ["CN", 1410],
      ["ID", 278],
      ["PK", 240],
      ["BD", 173],
      ["JP", 124],
      ["PH", 117],
      ["VN", 99],
      ["other", 856],
    ],
  ],
  [
    "africa",
    [
      ["NG", 224],
      ["ET", 127],
      ["EG", 113],
      ["CD", 102],
      ["TZ", 67],
      ["other", 827],
    ],
  ],
  [
    "europe",
    [
      ["RU", 144],
      ["DE", 84],
      ["GB", 68],
      ["FR", 68],
      ["IT", 59],
      ["other", 319],
    ],
  ],
  [
    "americas",
    [
      ["US", 335],
      ["BR", 216],
      ["MX", 128],
      ["CO", 52],
      ["AR", 46],
      ["other", 263],
    ],
  ],
  [
    "oceania",
    [
      ["AU", 27],
      ["PG", 10],
      ["NZ", 5],
      ["other", 3],
    ],
  ],
];

const MODES: Labels[] = ["auto", "tangential", "radial", "none"];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const [labels, setLabels] = useState<Labels>("auto");
  const locale = i18n.language;

  const data = useMemo((): TreemapNode[] => {
    // country names in the reader's language
    const regions = new Intl.DisplayNames([locale], { type: "region" });
    return WORLD.map(([continent, countries]) => ({
      name: t(\`world.\${continent}\`),
      children: countries.map(([code, value]) => ({
        name: code === "other" ? t("world.other") : (regions.of(code) ?? code),
        value,
      })),
    }));
  }, [locale, t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("millions", { value: number.format(value) });
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("labelsLabel")}
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Labels)}
      >
        {MODES.map((mode) => (
          <Radio key={mode} value={mode} label={t(\`labels.\${mode}\`)} />
        ))}
      </RadioGroup>
      <SunburstChart
        data={data}
        labels={labels}
        format={format}
        legend
        startAngle={-30}
        height={440}
        ariaLabel={t("worldAria")}
      />
    </div>
  );
}
`})))()}var Oe;function ke(){return(ke=e((()=>{Oe=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

/** Small seeded random generator: the same traffic on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// API requests per minute, by service and endpoint, around these baselines
const SERVICES: [service: string, endpoints: [string, number][]][] = [
  [
    "checkout",
    [
      ["cart", 820],
      ["payment", 410],
      ["shipping", 260],
    ],
  ],
  [
    "search",
    [
      ["query", 980],
      ["suggest", 540],
    ],
  ],
  [
    "accounts",
    [
      ["login", 360],
      ["profile", 220],
    ],
  ],
  [
    "catalog",
    [
      ["product", 690],
      ["reviews", 240],
    ],
  ],
];
const BASELINE = SERVICES.flatMap(([, endpoints]) =>
  endpoints.map(([, rate]) => rate),
);
const SEED = 21;

export default function LiveRequestsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [rates, setRates] = useState(BASELINE);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // each endpoint drifts by up to ±15 %, pulled back toward its baseline
      const noise = BASELINE.map(() => random.current() * 0.3 - 0.15);
      setRates((current) =>
        current.map((rate, i) =>
          Math.max(
            20,
            Math.round(rate * (1 + noise[i]) + (BASELINE[i] - rate) * 0.25),
          ),
        ),
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [running]);

  const { data, totals } = useMemo(() => {
    // index of the first endpoint of each service in the flat rates
    const offsets = SERVICES.map((_, s) =>
      SERVICES.slice(0, s).reduce(
        (n, [, endpoints]) => n + endpoints.length,
        0,
      ),
    );
    const data: TreemapNode[] = SERVICES.map(([service, endpoints], s) => ({
      name: t(\`requests.services.\${service}\`),
      children: endpoints.map(([endpoint], e) => ({
        name: t(\`requests.endpoints.\${endpoint}\`),
        value: rates[offsets[s] + e],
      })),
    }));
    const totals = SERVICES.map(([, endpoints], s) =>
      endpoints.reduce((sum, _, e) => sum + rates[offsets[s] + e], 0),
    );
    return { data, totals };
  }, [rates, t]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const format = (value: number) =>
    t("requests.rpm", { value: number.format(value) });

  const total = totals.reduce((sum, value) => sum + value, 0);
  const busiest = totals.indexOf(Math.max(...totals));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <SunburstChart
        data={data}
        innerRadius={0.4}
        cornerRadius={3}
        padAngle={1}
        format={format}
        height={380}
        ariaLabel={t("requests.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("requests.pause") : t("requests.resume")}
        </Button>
        <span style={{ color: "var(--text-muted-color)" }}>
          {t("requests.total", { value: format(total) })}
        </span>
      </HStack>
      {/* only the busiest service is announced, not every refresh */}
      <output aria-live="polite">
        {t("requests.busiest", { service: data[busiest].name })}
      </output>
    </div>
  );
}
`})))()}var Ae;function je(){return(je=e((()=>{Ae=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Unit = [key: string, headcount: number | Unit[]];

// Headcount of a 300-person company: departments, groups and teams
const ORG: Unit[] = [
  [
    "engineering",
    [
      [
        "platform",
        [
          ["infrastructure", 18],
          ["security", 9],
          ["devtools", 11],
        ],
      ],
      [
        "product",
        [
          ["web", 24],
          ["mobile", 16],
          ["payments", 12],
        ],
      ],
      [
        "data",
        [
          ["analytics", 10],
          ["ml", 8],
        ],
      ],
    ],
  ],
  [
    "sales",
    [
      ["emea", 22],
      ["americas", 31],
      ["apac", 14],
    ],
  ],
  [
    "success",
    [
      ["support", 26],
      ["onboarding", 9],
    ],
  ],
  [
    "marketing",
    [
      ["brand", 7],
      ["growth", 12],
      ["content", 6],
    ],
  ],
  [
    "operations",
    [
      ["finance", 8],
      ["people", 7],
      ["legal", 4],
      ["it", 6],
    ],
  ],
];

export default function OrgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });

  const data = useMemo(() => {
    const convert = (units: Unit[]): TreemapNode[] =>
      units.map(([key, size]) =>
        typeof size === "number"
          ? { name: t(\`org.\${key}\`), value: size }
          : { name: t(\`org.\${key}\`), children: convert(size) },
      );
    return convert(ORG);
  }, [t]);
  const format = useMemo(() => (value: number) => t("people", { value }), [t]);

  return (
    <SunburstChart
      data={data}
      levels={2}
      labels="radial"
      innerRadius={0.3}
      format={format}
      height={400}
      ariaLabel={t("orgAria")}
    />
  );
}
`})))()}var Me;function Ne(){return(Ne=e((()=>{Me=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Project = [key: string, activities: [string, number][]];
type Client = [key: string, projects: Project[]];

// Hours logged by a freelance studio during one week:
// client › project › activity
const WEEK: Client[] = [
  [
    "bakery",
    [
      [
        "website",
        [
          ["design", 6],
          ["development", 9],
          ["meetings", 2],
        ],
      ],
      [
        "branding",
        [
          ["design", 5],
          ["meetings", 1.5],
        ],
      ],
    ],
  ],
  [
    "clinic",
    [
      [
        "booking",
        [
          ["development", 12],
          ["review", 3],
          ["meetings", 2],
        ],
      ],
    ],
  ],
  [
    "school",
    [
      [
        "app",
        [
          ["design", 3],
          ["development", 8],
          ["review", 2],
        ],
      ],
    ],
  ],
  [
    "internal",
    [
      [
        "admin",
        [
          ["meetings", 3],
          ["support", 2],
        ],
      ],
      ["training", [["learning", 2.5]]],
    ],
  ],
];

// the month is not just 4 weeks: some clients had a busier month than others
const MONTH_FACTORS: Record<string, number> = {
  bakery: 3.6,
  clinic: 4.5,
  school: 4.2,
  internal: 3.8,
};

const PERIODS = ["week", "month"] as const;
type Period = (typeof PERIODS)[number];

/** Rounds to the nearest half hour */
const half = (hours: number) => Math.round(hours * 2) / 2;

export default function TimeTrackingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [period, setPeriod] = useState<Period>("week");

  const { data, total, billable } = useMemo(() => {
    const hoursOf = (client: string, hours: number) =>
      period === "week" ? hours : half(hours * MONTH_FACTORS[client]);
    const data: TreemapNode[] = WEEK.map(([client, projects]) => ({
      name: t(\`time.clients.\${client}\`),
      children: projects.map(([project, activities]) => ({
        name: t(\`time.projects.\${project}\`),
        children: activities.map(([activity, hours]) => ({
          name: t(\`time.activities.\${activity}\`),
          value: hoursOf(client, hours),
        })),
      })),
    }));
    const entries = WEEK.flatMap(([client, projects]) =>
      projects.flatMap(([, activities]) =>
        activities.map(
          ([, hours]) => [client, hoursOf(client, hours)] as const,
        ),
      ),
    );
    const sum = (list: (typeof entries)[number][]) =>
      list.reduce((acc, [, hours]) => acc + hours, 0);
    return {
      data,
      total: sum(entries),
      billable: sum(entries.filter(([client]) => client !== "internal")),
    };
  }, [period, t]);

  const hours = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "short",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("time.period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(value as Period)}
      >
        {PERIODS.map((key) => (
          <Radio key={key} value={key} label={t(\`time.periods.\${key}\`)} />
        ))}
      </RadioGroup>
      <SunburstChart
        data={data}
        innerRadius={0.28}
        padAngle={1}
        format={(value) => hours.format(value)}
        renderTooltip={(node) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(node.path ?? [node.name]).join(" › ")}</strong>
            <span>
              {t("time.tooltip", {
                hours: hours.format(node.value),
                share: percent.format(node.value / total),
              })}
            </span>
          </div>
        )}
        height={400}
        ariaLabel={t("time.aria", { period: t(\`time.periods.\${period}\`) })}
      />
      <output aria-live="polite">
        {t("time.summary", {
          billable: hours.format(billable),
          total: hours.format(total),
          share: percent.format(billable / total),
        })}
      </output>
    </div>
  );
}
`})))()}var Pe,Fe,Ie;function Le(){return(Le=e((()=>{ie(),T(),k(),I(),V(),q(),pe(),ve(),be(),Se(),we(),Ee(),$(),ke(),je(),Ne(),t(),ee(),ne(),Pe=n(),Fe=h(Object.assign({"./demos/city-budget.tsx":re,"./demos/disk-usage.tsx":ae,"./demos/drill-down.tsx":oe,"./demos/energy-mix.tsx":se,"./demos/labels.tsx":ce,"./demos/live-requests.tsx":ue,"./demos/org.tsx":de,"./demos/time-tracking.tsx":me}),Object.assign({"./demos/city-budget.tsx":ye,"./demos/disk-usage.tsx":xe,"./demos/drill-down.tsx":Ce,"./demos/energy-mix.tsx":Te,"./demos/labels.tsx":De,"./demos/live-requests.tsx":Oe,"./demos/org.tsx":Ae,"./demos/time-tracking.tsx":Me})),Ie=()=>(0,Pe.jsx)(te,{id:`sunburst-chart`,demos:Fe})})))()}Le();export{Ie as default};