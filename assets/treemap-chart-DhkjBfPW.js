import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Bje1gMIU.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{i as p,r as m}from"./Stack-B3Kr9X_e.js";import{l as h,n as g,t as ee,u as te}from"./DocPage-BdPOW9nQ.js";import{c as _,d as v}from"./shapes-B5QcpBlT.js";function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,[i,a]=(0,y.useState)(null),o=(0,y.useMemo)(()=>{let t=n=>({name:n.key?e(`folders.${n.key}`):n.name??``,value:n.value,children:n.children?.map(t)});return x.map(t)},[e]),s=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`gigabyte`,maximumFractionDigits:1}),[n]),c=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,b.jsx)(v,{data:o,format:e=>s.format(e),percentFormat:e=>c.format(e),renderTooltip:e=>(0,b.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,b.jsx)(`strong`,{children:(e.path??[e.name]).join(` › `)}),(0,b.jsxs)(`span`,{children:[s.format(e.value),` · `,c.format(e.percent)]})]}),onClick:a,height:380,ariaLabel:e(`diskAria`)}),(0,b.jsx)(`p`,{role:`status`,children:i?e(`diskSelected`,{path:(i.path??[i.name]).join(` › `),size:s.format(i.value),share:c.format(i.percent)}):e(`clickCell`)})]})}var y,b,x;function S(){return(S=e((()=>{y=t(),i(),_(),b=n(),x=[{key:`media`,children:[{key:`videos`,value:31.2},{key:`photos`,value:24.3},{key:`music`,value:6.4}]},{key:`applications`,children:[{name:`Xcode`,value:12.4},{name:`Docker`,value:9.8},{name:`Figma`,value:1.2},{name:`Chrome`,value:1.1},{name:`Slack`,value:.6}]},{key:`projects`,children:[{name:`monorepo`,value:14.2},{name:`design-assets`,value:4.3},{name:`side-project`,value:1.6}]},{key:`system`,children:[{key:`library`,value:11.8},{key:`caches`,value:7.6},{key:`logs`,value:2.1}]},{key:`downloads`,children:[{key:`installers`,value:5.3},{key:`archives`,value:3.9}]}]})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,i=(0,C.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`kilobyte`}),[n]),a=(0,C.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),o=T.reduce((e,t)=>e+E(t),0),s=(T[0].children??[]).filter(e=>E(e)>=ie);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,w.jsx)(v,{data:T,format:e=>i.format(e),percentFormat:e=>a.format(e),renderTooltip:t=>(0,w.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,w.jsx)(`strong`,{children:(t.path??[t.name]).join(`/`)}),(0,w.jsxs)(`span`,{children:[i.format(t.value),` ·`,` `,e(`ofBundle`,{share:a.format(t.percent)})]})]}),height:360,ariaLabel:e(`bundleAria`)}),(0,w.jsx)(`p`,{children:e(`bundleSummary`,{size:i.format(o),modules:s.map(e=>e.name).join(`, `)})})]})}var C,w,T,ie,E;function D(){return(D=e((()=>{C=t(),i(),_(),w=n(),T=[{name:`node_modules`,children:[{name:`react-dom`,value:131},{name:`lodash`,value:72},{name:`moment`,value:67},{name:`moment/locale`,value:160},{name:`chart.js`,value:204},{name:`axios`,value:14},{name:`zod`,value:57},{name:`react`,value:7}]},{name:`src`,children:[{name:`pages`,children:[{name:`dashboard`,value:48},{name:`settings`,value:22},{name:`reports`,value:36}]},{name:`components`,value:61},{name:`i18n`,value:28},{name:`utils`,value:9}]}],ie=100,E=e=>e.value??(e.children??[]).reduce((e,t)=>e+E(t),0)})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,[i,a]=(0,O.useState)([]),s=(0,O.useMemo)(()=>A.map(([t,n])=>({name:e(`cloud.services.${t}`),children:n.map(([e,t])=>({name:e,value:t}))})),[e]),c=(0,O.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,maximumFractionDigits:0});return t=>e.format(t)},[n]),l=(0,O.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),u=j.reduce((e,t,n)=>i.includes(n)?e:e+t,0);return(0,k.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,k.jsx)(v,{data:s,legend:oe,hidden:i,onToggle:e=>a(e.hiddenIndexes),format:c,renderTooltip:t=>(0,k.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,k.jsx)(`strong`,{children:(t.path??[t.name]).join(` › `)}),(0,k.jsx)(`span`,{children:c(t.value)}),(0,k.jsx)(`span`,{children:e(`cloud.ofBill`,{share:l.format(t.value/M)})})]}),height:400,ariaLabel:e(`cloud.aria`)}),(0,k.jsxs)(p,{gap:8,wrap:!0,align:`center`,children:[(0,k.jsx)(`output`,{"aria-live":`polite`,children:i.length?e(`cloud.filtered`,{visible:c(u),share:l.format(u/M),total:c(M)}):e(`cloud.total`,{total:c(M)})}),(0,k.jsx)(o,{size:`small`,variant:`ghost`,disabled:i.length===0,onClick:()=>a([]),children:e(`cloud.showAll`)})]})]})}var O,k,A,j,M,oe;function se(){return(se=e((()=>{O=t(),i(),a(),m(),_(),k=n(),A=[[`compute`,[[`api-prod`,6200],[`workers`,3400],[`batch-jobs`,1800],[`staging`,900]]],[`databases`,[[`analytics-warehouse`,4600],[`orders-db`,3800],[`session-cache`,650]]],[`storage`,[[`media-bucket`,2100],[`backups`,1300],[`logs-archive`,700]]],[`network`,[[`egress`,2400],[`cdn`,1250],[`nat-gateway`,420]]],[`observability`,[[`logs`,1640],[`metrics`,1150],[`traces`,820]]]],j=A.map(([,e])=>e.reduce((e,[,t])=>e+t,0)),M=j.reduce((e,t)=>e+t,0),oe={position:`top`}})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,[i,a]=(0,N.useState)(null),[s,c]=(0,N.useState)(null),l=(0,N.useMemo)(()=>F.map(([t,n])=>({name:e(`store.categories.${t}`),children:n.map(([t,n])=>({name:e(`store.subcategories.${t}`),children:n.map(([e,t])=>({name:e,value:t}))}))})),[e]),u=i===null?l:l[i].children??[],d=(0,N.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[n]),f=(0,N.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return t=>e.format(t)},[n]),m=e=>{a(e),c(null)},h=e=>{if(i!==null)return c(e);let t=l.findIndex(t=>t.name===e.path?.[0]);t>=0&&m(t)},g=e=>[...i===null?[]:[l[i].name],...e.path??[e.name]].join(` › `);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,P.jsxs)(p,{gap:4,align:`center`,wrap:!0,as:`nav`,"aria-label":e(`store.breadcrumb`),children:[(0,P.jsx)(o,{size:`small`,variant:i===null?`solid`:`ghost`,"aria-current":i===null?`location`:void 0,onClick:()=>m(null),children:e(`store.all`)}),i!==null&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`span`,{"aria-hidden":!0,children:`/`}),(0,P.jsx)(`strong`,{"aria-current":`location`,children:l[i].name})]})]}),(0,P.jsx)(v,{data:u,format:d,percentFormat:f,renderTooltip:e=>(0,P.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,P.jsx)(`strong`,{children:g(e)}),(0,P.jsxs)(`span`,{children:[d(e.value),` · `,f(e.percent)]})]}),onClick:h,height:380,ariaLabel:i===null?e(`store.aria`):e(`store.categoryAria`,{category:l[i].name})}),(0,P.jsx)(`p`,{role:`status`,style:{margin:0},children:s?e(`store.selected`,{path:g(s),revenue:d(s.value),share:f(s.percent)}):e(i===null?`store.hint`:`store.hintBrand`)})]})}var N,P,F;function I(){return(I=e((()=>{N=t(),i(),a(),m(),_(),P=n(),F=[[`electronics`,[[`phones`,[[`Aurora`,420],[`Nimbus`,260],[`Vertex`,180]]],[`laptops`,[[`Aurora`,380],[`Kite`,240]]],[`audio`,[[`Echo`,150],[`Pulse`,90]]]]],[`home`,[[`kitchen`,[[`Brava`,140],[`Cuisio`,95]]],[`furniture`,[[`Loft`,210],[`Nordik`,160]]],[`decor`,[[`Lumo`,70],[`Terra`,45]]]]],[`fashion`,[[`women`,[[`Mira`,230],[`Sola`,120]]],[`men`,[[`Atlas`,150],[`Rivet`,80]]],[`kids`,[[`Pip`,75]]]]],[`sports`,[[`outdoor`,[[`Trek`,160],[`Summit`,90]]],[`fitness`,[[`Core`,110],[`Stride`,65]]]]]]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,i=(0,L.useMemo)(()=>z.map(({key:t,value:n})=>({name:e(`departments.${t}`),value:n})),[e]),a=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),[n]),o=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]);return(0,R.jsx)(v,{data:i,format:e=>a.format(e),percentFormat:e=>o.format(e),renderTooltip:e=>(0,R.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,R.jsx)(`strong`,{children:e.name}),(0,R.jsxs)(`span`,{children:[a.format(e.value),` · `,o.format(e.percent)]})]}),gap:4,height:320,ariaLabel:e(`budgetAria`)})}var L,R,z;function B(){return(B=e((()=>{L=t(),i(),_(),R=n(),z=[{key:`engineering`,value:42e5},{key:`sales`,value:28e5},{key:`marketing`,value:19e5},{key:`success`,value:12e5},{key:`operations`,value:9e5},{key:`finance`,value:6e5},{key:`people`,value:5e5},{key:`legal`,value:3e5}]})))()}function ue(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function de(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,[i,a]=(0,V.useState)(!0),[o,s]=(0,V.useState)(()=>U.map(e=>e.used)),c=(0,V.useRef)(ue(5));(0,V.useEffect)(()=>{if(!i)return;let e=window.setInterval(()=>{let e=U.map(e=>(c.current()-.48)*e.limit*.08);s(t=>t.map((t,n)=>Math.min(U[n].limit,Math.max(U[n].limit*.15,t+e[n]))))},2e3);return()=>window.clearInterval(e)},[i]);let l=(0,V.useMemo)(()=>W.map(e=>({name:e,children:U.flatMap((t,n)=>t.namespace===e?[{name:t.pod,value:o[n],color:o[n]/t.limit>=G?`var(--danger-color)`:void 0}]:[])})),[o]),u=(0,V.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`unit`,unit:`megabyte`,maximumFractionDigits:0});return t=>e.format(t)},[n]),d=(0,V.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]),p=U.filter((e,t)=>o[t]/e.limit>=G);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,H.jsx)(f,{checked:i,onChange:a,label:e(`cluster.live`)}),(0,H.jsx)(v,{data:l,gap:2,format:u,renderTooltip:t=>{let n=U.findIndex(e=>e.pod===t.name);return(0,H.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,H.jsx)(`strong`,{children:(t.path??[t.name]).join(` / `)}),(0,H.jsx)(`span`,{children:n<0?u(t.value):e(`cluster.usage`,{used:u(t.value),limit:u(U[n].limit),share:d.format(t.value/U[n].limit)})})]})},height:360,ariaLabel:e(`cluster.aria`)}),(0,H.jsx)(`output`,{"aria-live":`polite`,style:{color:p.length?`var(--danger-color)`:void 0},children:p.length?e(`cluster.nearLimit`,{pods:p.map(e=>e.pod).join(`, `),threshold:d.format(G)}):e(`cluster.healthy`,{threshold:d.format(G)})})]})}var V,H,U,W,G;function K(){return(K=e((()=>{V=t(),i(),d(),_(),H=n(),U=[{namespace:`checkout`,pod:`api-7f9c`,used:820,limit:1024},{namespace:`checkout`,pod:`api-b21d`,used:760,limit:1024},{namespace:`checkout`,pod:`worker-5a0e`,used:410,limit:512},{namespace:`search`,pod:`indexer-0`,used:1650,limit:2048},{namespace:`search`,pod:`query-88c1`,used:540,limit:1024},{namespace:`search`,pod:`query-3e47`,used:500,limit:1024},{namespace:`data`,pod:`postgres-0`,used:2900,limit:4096},{namespace:`data`,pod:`redis-0`,used:610,limit:1024},{namespace:`monitoring`,pod:`prometheus-0`,used:1380,limit:2048},{namespace:`monitoring`,pod:`grafana-6d2f`,used:230,limit:512}],W=[...new Set(U.map(e=>e.namespace))],G=.85})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,i=(0,q.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,maximumFractionDigits:1,signDisplay:`exceptZero`}),[n]),a=(0,q.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e9)},[n]),o=(0,q.useMemo)(()=>Y.map(({sector:t,stocks:n})=>({name:e(`sectors.${t}`),color:`#262931`,children:n.map(([e,t,n])=>({name:`${e} ${i.format(n/100)}`,value:t,color:ge(n)}))})),[e,i]);return(0,J.jsx)(v,{data:o,gap:1,format:a,renderTooltip:t=>(0,J.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,J.jsx)(`strong`,{children:(t.path??[t.name]).join(` › `)}),(0,J.jsx)(`span`,{children:e(`marketCap`,{value:a(t.value)})})]}),legend:!1,height:400,ariaLabel:e(`marketAria`)})}var q,J,Y,pe,me,he,ge;function _e(){return(_e=e((()=>{q=t(),i(),_(),J=n(),Y=[{sector:`technology`,stocks:[[`ACME`,2950,1.8],[`LUMA`,2610,-.6],[`QBIT`,1420,3.2],[`NOVA`,610,-2.4],[`CHIP`,380,.4]]},{sector:`finance`,stocks:[[`BANK`,540,-.3],[`PAYX`,470,.9],[`SAFE`,260,-1.1]]},{sector:`health`,stocks:[[`CURE`,720,-1.7],[`GENE`,410,2.6],[`MEDI`,300,.1]]},{sector:`energy`,stocks:[[`PETR`,450,-3.1],[`SOLR`,120,4.4]]},{sector:`consumer`,stocks:[[`SHOP`,1850,.7],[`DRNK`,280,-.4],[`CARS`,690,-2.2]]}],pe=[246,53,56],me=[65,69,84],he=[48,204,90],ge=e=>{let t=Math.min(1,Math.abs(e)/3),n=e<0?pe:he;return`rgb(${me.map((e,r)=>Math.round(e+(n[r]-e)*t)).join(`, `)})`}})))()}function ve(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,[i,a]=(0,X.useState)(`revenue`),{data:o,byName:c}=(0,X.useMemo)(()=>{let t=new Intl.DisplayNames([n],{type:`region`}),r=new Map;return{data:ye.map(([n,a])=>({name:e(`sales.regions.${n}`),children:a.map(([e,...n])=>{let a=t.of(e)??e;return r.set(a,n),{name:a,value:n[be[i]-1]}})})),byName:r}},[n,i,e]),l=(0,X.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),t=new Intl.NumberFormat(n,{notation:`compact`,maximumFractionDigits:1});return{revenue:t=>e.format(t*1e3),orders:e=>t.format(e),profit:t=>e.format(t*1e3)}},[n]),d=(0,X.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Z.jsx)(s,{"aria-label":e(`sales.metric`),direction:`horizontal`,value:i,onChange:e=>a(e),children:Q.map(t=>(0,Z.jsx)(u,{value:t,label:e(`sales.metrics.${t}`)},t))}),(0,Z.jsx)(v,{data:o,format:l[i],renderTooltip:t=>{let n=c.get(t.name);return(0,Z.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,Z.jsx)(`strong`,{children:(t.path??[t.name]).join(` › `)}),n?Q.map((t,r)=>(0,Z.jsxs)(`span`,{style:{fontWeight:t===i?600:void 0},children:[e(`sales.metrics.${t}`),`: `,l[t](n[r])]},t)):(0,Z.jsx)(`span`,{children:l[i](t.value)}),(0,Z.jsx)(`span`,{children:e(`sales.shareOf`,{share:d.format(t.percent),metric:e(`sales.metrics.${i}`)})})]})},height:380,ariaLabel:e(`sales.aria`,{metric:e(`sales.metrics.${i}`)})})]})}var X,Z,Q,ye,be;function xe(){return(xe=e((()=>{X=t(),i(),c(),l(),_(),Z=n(),Q=[`revenue`,`orders`,`profit`],ye=[[`europe`,[[`FR`,1840,21400,310],[`DE`,2260,19800,420],[`GB`,1630,24900,190],[`ES`,780,12300,95],[`IT`,910,11100,160]]],[`americas`,[[`US`,4120,38600,690],[`CA`,960,9800,170],[`BR`,720,15200,60],[`MX`,540,10400,70]]],[`asiaPacific`,[[`JP`,1480,13200,330],[`AU`,870,8100,150],[`KR`,690,9900,120],[`SG`,420,3600,110]]]],be={revenue:1,orders:2,profit:3}})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Disk usage of a laptop, in gigabytes. \`key\`s are translated, the
// application and project names are kept as they are
type Folder = {
  key?: string;
  name?: string;
  value?: number;
  children?: Folder[];
};
const disk: Folder[] = [
  {
    key: "media",
    children: [
      { key: "videos", value: 31.2 },
      { key: "photos", value: 24.3 },
      { key: "music", value: 6.4 },
    ],
  },
  {
    key: "applications",
    children: [
      { name: "Xcode", value: 12.4 },
      { name: "Docker", value: 9.8 },
      { name: "Figma", value: 1.2 },
      { name: "Chrome", value: 1.1 },
      { name: "Slack", value: 0.6 },
    ],
  },
  {
    key: "projects",
    children: [
      { name: "monorepo", value: 14.2 },
      { name: "design-assets", value: 4.3 },
      { name: "side-project", value: 1.6 },
    ],
  },
  {
    key: "system",
    children: [
      { key: "library", value: 11.8 },
      { key: "caches", value: 7.6 },
      { key: "logs", value: 2.1 },
    ],
  },
  {
    key: "downloads",
    children: [
      { key: "installers", value: 5.3 },
      { key: "archives", value: 3.9 },
    ],
  },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo((): TreemapNode[] => {
    const translate = (folder: Folder): TreemapNode => ({
      name: folder.key ? t(\`folders.\${folder.key}\`) : (folder.name ?? ""),
      value: folder.value,
      children: folder.children?.map(translate),
    });
    return disk.map(translate);
  }, [t]);
  const gigabytes = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "gigabyte",
        maximumFractionDigits: 1,
      }),
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

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={data}
        format={(value) => gigabytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
            <span>
              {gigabytes.format(cell.value)} · {percent.format(cell.percent)}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={380}
        ariaLabel={t("diskAria")}
      />
      <p role="status">
        {selected
          ? t("diskSelected", {
              path: (selected.path ?? [selected.name]).join(" › "),
              size: gigabytes.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickCell")}
      </p>
    </div>
  );
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Minified size (KB) of a web application's JavaScript bundle, by module
const bundle: TreemapNode[] = [
  {
    name: "node_modules",
    children: [
      { name: "react-dom", value: 131 },
      { name: "lodash", value: 72 },
      { name: "moment", value: 67 },
      { name: "moment/locale", value: 160 },
      { name: "chart.js", value: 204 },
      { name: "axios", value: 14 },
      { name: "zod", value: 57 },
      { name: "react", value: 7 },
    ],
  },
  {
    name: "src",
    children: [
      {
        name: "pages",
        children: [
          { name: "dashboard", value: 48 },
          { name: "settings", value: 22 },
          { name: "reports", value: 36 },
        ],
      },
      { name: "components", value: 61 },
      { name: "i18n", value: 28 },
      { name: "utils", value: 9 },
    ],
  },
];

// what a bundle analyzer would point out
const HEAVY = 100; // KB

const total = (node: TreemapNode): number =>
  node.value ?? (node.children ?? []).reduce((sum, c) => sum + total(c), 0);

export default function BundleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const kilobytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
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
  const size = bundle.reduce((sum, node) => sum + total(node), 0);
  const heavy = (bundle[0].children ?? []).filter((m) => total(m) >= HEAVY);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={bundle}
        format={(value) => kilobytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join("/")}</strong>
            <span>
              {kilobytes.format(cell.value)} ·{" "}
              {t("ofBundle", { share: percent.format(cell.percent) })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("bundleAria")}
      />
      <p>
        {t("bundleSummary", {
          size: kilobytes.format(size),
          modules: heavy.map((m) => m.name).join(", "),
        })}
      </p>
    </div>
  );
}
`})))()}var Ee;function De(){return(De=e((()=>{Ee=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Cloud costs of one month (USD): services, then the resources (named as
// in the console) that make up each bill
const COSTS: [service: string, [string, number][]][] = [
  [
    "compute",
    [
      ["api-prod", 6200],
      ["workers", 3400],
      ["batch-jobs", 1800],
      ["staging", 900],
    ],
  ],
  [
    "databases",
    [
      ["analytics-warehouse", 4600],
      ["orders-db", 3800],
      ["session-cache", 650],
    ],
  ],
  [
    "storage",
    [
      ["media-bucket", 2100],
      ["backups", 1300],
      ["logs-archive", 700],
    ],
  ],
  [
    "network",
    [
      ["egress", 2400],
      ["cdn", 1250],
      ["nat-gateway", 420],
    ],
  ],
  [
    "observability",
    [
      ["logs", 1640],
      ["metrics", 1150],
      ["traces", 820],
    ],
  ],
];
const totals = COSTS.map(([, resources]) =>
  resources.reduce((sum, [, cost]) => sum + cost, 0),
);
const TOTAL = totals.reduce((sum, cost) => sum + cost, 0);

const legend = { position: "top" } as const;

export default function CloudCostsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  // controlled: the legend proposes, this state decides
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): TreemapNode[] =>
      COSTS.map(([service, resources]) => ({
        name: t(\`cloud.services.\${service}\`),
        children: resources.map(([name, value]) => ({ name, value })),
      })),
    [t],
  );
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (value: number) => money.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const visible = totals.reduce(
    (sum, cost, i) => (hidden.includes(i) ? sum : sum + cost),
    0,
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={data}
        legend={legend}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        format={format}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
            <span>{format(cell.value)}</span>
            <span>
              {t("cloud.ofBill", { share: percent.format(cell.value / TOTAL) })}
            </span>
          </div>
        )}
        height={400}
        ariaLabel={t("cloud.aria")}
      />
      <HStack gap={8} wrap align="center">
        <output aria-live="polite">
          {hidden.length
            ? t("cloud.filtered", {
                visible: format(visible),
                share: percent.format(visible / TOTAL),
                total: format(TOTAL),
              })
            : t("cloud.total", { total: format(TOTAL) })}
        </output>
        <Button
          size="small"
          variant="ghost"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("cloud.showAll")}
        </Button>
      </HStack>
    </div>
  );
}
`})))()}var $;function Oe(){return(Oe=e((()=>{$=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Quarterly revenue of an online store (thousand USD): categories,
// subcategories (translated) and brands (proper nouns)
const STORE: [category: string, [subcategory: string, [string, number][]][]][] =
  [
    [
      "electronics",
      [
        [
          "phones",
          [
            ["Aurora", 420],
            ["Nimbus", 260],
            ["Vertex", 180],
          ],
        ],
        [
          "laptops",
          [
            ["Aurora", 380],
            ["Kite", 240],
          ],
        ],
        [
          "audio",
          [
            ["Echo", 150],
            ["Pulse", 90],
          ],
        ],
      ],
    ],
    [
      "home",
      [
        [
          "kitchen",
          [
            ["Brava", 140],
            ["Cuisio", 95],
          ],
        ],
        [
          "furniture",
          [
            ["Loft", 210],
            ["Nordik", 160],
          ],
        ],
        [
          "decor",
          [
            ["Lumo", 70],
            ["Terra", 45],
          ],
        ],
      ],
    ],
    [
      "fashion",
      [
        [
          "women",
          [
            ["Mira", 230],
            ["Sola", 120],
          ],
        ],
        [
          "men",
          [
            ["Atlas", 150],
            ["Rivet", 80],
          ],
        ],
        ["kids", [["Pip", 75]]],
      ],
    ],
    [
      "sports",
      [
        [
          "outdoor",
          [
            ["Trek", 160],
            ["Summit", 90],
          ],
        ],
        [
          "fitness",
          [
            ["Core", 110],
            ["Stride", 65],
          ],
        ],
      ],
    ],
  ];

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  // index of the opened category, null on the overview
  const [category, setCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const tree = useMemo(
    (): TreemapNode[] =>
      STORE.map(([key, subcategories]) => ({
        name: t(\`store.categories.\${key}\`),
        children: subcategories.map(([sub, brands]) => ({
          name: t(\`store.subcategories.\${sub}\`),
          children: brands.map(([name, value]) => ({ name, value })),
        })),
      })),
    [t],
  );
  // inside a category, its subcategories become the top level
  const data = category === null ? tree : (tree[category].children ?? []);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1000);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const open = (index: number | null) => {
    setCategory(index);
    setSelected(null);
  };
  const onClick = (cell: ShapeHoverEvent) => {
    if (category !== null) return setSelected(cell);
    // the first name of the path is the clicked cell's category
    const index = tree.findIndex((node) => node.name === cell.path?.[0]);
    if (index >= 0) open(index);
  };
  const path = (cell: ShapeHoverEvent) =>
    [
      ...(category === null ? [] : [tree[category].name]),
      ...(cell.path ?? [cell.name]),
    ].join(" › ");

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack
        gap={4}
        align="center"
        wrap
        as="nav"
        aria-label={t("store.breadcrumb")}
      >
        <Button
          size="small"
          variant={category === null ? "solid" : "ghost"}
          aria-current={category === null ? "location" : undefined}
          onClick={() => open(null)}
        >
          {t("store.all")}
        </Button>
        {category !== null && (
          <>
            <span aria-hidden>/</span>
            <strong aria-current="location">{tree[category].name}</strong>
          </>
        )}
      </HStack>
      <TreemapChart
        data={data}
        format={format}
        percentFormat={percentFormat}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{path(cell)}</strong>
            <span>
              {format(cell.value)} · {percentFormat(cell.percent)}
            </span>
          </div>
        )}
        onClick={onClick}
        height={380}
        ariaLabel={
          category === null
            ? t("store.aria")
            : t("store.categoryAria", { category: tree[category].name })
        }
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? t("store.selected", {
              path: path(selected),
              revenue: format(selected.value),
              share: percentFormat(selected.percent),
            })
          : category === null
            ? t("store.hint")
            : t("store.hintBrand")}
      </p>
    </div>
  );
}
`})))()}var ke;function Ae(){return(Ae=e((()=>{ke=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Annual budget by department, in US dollars
const budget = [
  { key: "engineering", value: 4_200_000 },
  { key: "sales", value: 2_800_000 },
  { key: "marketing", value: 1_900_000 },
  { key: "success", value: 1_200_000 },
  { key: "operations", value: 900_000 },
  { key: "finance", value: 600_000 },
  { key: "people", value: 500_000 },
  { key: "legal", value: 300_000 },
];

export default function FlatDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): TreemapNode[] =>
      budget.map(({ key, value }) => ({
        name: t(\`departments.\${key}\`),
        value,
      })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <TreemapChart
      data={data}
      format={(value) => currency.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={(cell) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{cell.name}</strong>
          <span>
            {currency.format(cell.value)} · {percent.format(cell.percent)}
          </span>
        </div>
      )}
      gap={4}
      height={320}
      ariaLabel={t("budgetAria")}
    />
  );
}
`})))()}var je;function Me(){return(Me=e((()=>{je=`import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

/** Small seeded random generator: the same "cluster" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Memory used by the pods of a Kubernetes cluster (MB), by namespace;
// every pod has a memory limit
const PODS: { namespace: string; pod: string; used: number; limit: number }[] =
  [
    { namespace: "checkout", pod: "api-7f9c", used: 820, limit: 1024 },
    { namespace: "checkout", pod: "api-b21d", used: 760, limit: 1024 },
    { namespace: "checkout", pod: "worker-5a0e", used: 410, limit: 512 },
    { namespace: "search", pod: "indexer-0", used: 1650, limit: 2048 },
    { namespace: "search", pod: "query-88c1", used: 540, limit: 1024 },
    { namespace: "search", pod: "query-3e47", used: 500, limit: 1024 },
    { namespace: "data", pod: "postgres-0", used: 2900, limit: 4096 },
    { namespace: "data", pod: "redis-0", used: 610, limit: 1024 },
    { namespace: "monitoring", pod: "prometheus-0", used: 1380, limit: 2048 },
    { namespace: "monitoring", pod: "grafana-6d2f", used: 230, limit: 512 },
  ];
const NAMESPACES = [...new Set(PODS.map((p) => p.namespace))];
const NEAR_LIMIT = 0.85;

export default function LiveClusterDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [used, setUsed] = useState(() => PODS.map((p) => p.used));
  const random = useRef(mulberry32(5));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // each pod drifts up or down by up to 8% of its limit
      const steps = PODS.map((p) => (random.current() - 0.48) * p.limit * 0.08);
      setUsed((current) =>
        current.map((value, i) =>
          Math.min(
            PODS[i].limit,
            Math.max(PODS[i].limit * 0.15, value + steps[i]),
          ),
        ),
      );
    }, 2000);
    return () => window.clearInterval(timer);
  }, [live]);

  // pods close to their limit turn red; the others take shades of their
  // namespace color
  const data = useMemo(
    (): TreemapNode[] =>
      NAMESPACES.map((namespace) => ({
        name: namespace,
        children: PODS.flatMap((p, i) =>
          p.namespace === namespace
            ? [
                {
                  name: p.pod,
                  value: used[i],
                  color:
                    used[i] / p.limit >= NEAR_LIMIT
                      ? "var(--danger-color)"
                      : undefined,
                },
              ]
            : [],
        ),
      })),
    [used],
  );
  const format = useMemo(() => {
    const megabytes = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabyte",
      maximumFractionDigits: 0,
    });
    return (value: number) => megabytes.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  const pressured = PODS.filter((p, i) => used[i] / p.limit >= NEAR_LIMIT);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("cluster.live")} />
      <TreemapChart
        data={data}
        gap={2}
        format={format}
        renderTooltip={(cell) => {
          const pod = PODS.findIndex((p) => p.pod === cell.name);
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{(cell.path ?? [cell.name]).join(" / ")}</strong>
              <span>
                {pod < 0
                  ? format(cell.value)
                  : t("cluster.usage", {
                      used: format(cell.value),
                      limit: format(PODS[pod].limit),
                      share: percent.format(cell.value / PODS[pod].limit),
                    })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("cluster.aria")}
      />
      {/* announced when the list of pods near their limit changes */}
      <output
        aria-live="polite"
        style={{ color: pressured.length ? "var(--danger-color)" : undefined }}
      >
        {pressured.length
          ? t("cluster.nearLimit", {
              pods: pressured.map((p) => p.pod).join(", "),
              threshold: percent.format(NEAR_LIMIT),
            })
          : t("cluster.healthy", { threshold: percent.format(NEAR_LIMIT) })}
      </output>
    </div>
  );
}
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Stocks by sector: the area is the market capitalization (billion USD),
// the color the change of the day (%), like the market maps of finance sites
const market: { sector: string; stocks: [string, number, number][] }[] = [
  {
    sector: "technology",
    stocks: [
      ["ACME", 2_950, 1.8],
      ["LUMA", 2_610, -0.6],
      ["QBIT", 1_420, 3.2],
      ["NOVA", 610, -2.4],
      ["CHIP", 380, 0.4],
    ],
  },
  {
    sector: "finance",
    stocks: [
      ["BANK", 540, -0.3],
      ["PAYX", 470, 0.9],
      ["SAFE", 260, -1.1],
    ],
  },
  {
    sector: "health",
    stocks: [
      ["CURE", 720, -1.7],
      ["GENE", 410, 2.6],
      ["MEDI", 300, 0.1],
    ],
  },
  {
    sector: "energy",
    stocks: [
      ["PETR", 450, -3.1],
      ["SOLR", 120, 4.4],
    ],
  },
  {
    sector: "consumer",
    stocks: [
      ["SHOP", 1_850, 0.7],
      ["DRNK", 280, -0.4],
      ["CARS", 690, -2.2],
    ],
  },
];

const RED = [246, 53, 56];
const GREY = [65, 69, 84];
const GREEN = [48, 204, 90];

/** -3% (or less) = red, 0 = grey, +3% (or more) = green */
const changeColor = (change: number) => {
  const amount = Math.min(1, Math.abs(change) / 3);
  const end = change < 0 ? RED : GREEN;
  const rgb = GREY.map((c, i) => Math.round(c + (end[i] - c) * amount));
  return \`rgb(\${rgb.join(", ")})\`;
};

export default function MarketMapDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const change = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const capitalization = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (billions: number) => format.format(billions * 1e9);
  }, [locale]);

  // the change is part of the name, so the cells show "ACME +1.8%"
  const data = useMemo(
    (): TreemapNode[] =>
      market.map(({ sector, stocks }) => ({
        name: t(\`sectors.\${sector}\`),
        color: "#262931",
        children: stocks.map(([symbol, cap, pct]) => ({
          name: \`\${symbol} \${change.format(pct / 100)}\`,
          value: cap,
          color: changeColor(pct),
        })),
      })),
    [t, change],
  );

  return (
    <TreemapChart
      data={data}
      gap={1}
      format={capitalization}
      renderTooltip={(cell) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
          <span>{t("marketCap", { value: capitalization(cell.value) })}</span>
        </div>
      )}
      legend={false}
      height={400}
      ariaLabel={t("marketAria")}
    />
  );
}
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

type Metric = "revenue" | "orders" | "profit";
const METRICS: Metric[] = ["revenue", "orders", "profit"];

// Yearly sales by region and country (ISO code): revenue and profit in
// thousand USD, orders in units. The metrics rank the countries differently
const SALES: [
  region: string,
  [country: string, revenue: number, orders: number, profit: number][],
][] = [
  [
    "europe",
    [
      ["FR", 1840, 21_400, 310],
      ["DE", 2260, 19_800, 420],
      ["GB", 1630, 24_900, 190],
      ["ES", 780, 12_300, 95],
      ["IT", 910, 11_100, 160],
    ],
  ],
  [
    "americas",
    [
      ["US", 4120, 38_600, 690],
      ["CA", 960, 9_800, 170],
      ["BR", 720, 15_200, 60],
      ["MX", 540, 10_400, 70],
    ],
  ],
  [
    "asiaPacific",
    [
      ["JP", 1480, 13_200, 330],
      ["AU", 870, 8_100, 150],
      ["KR", 690, 9_900, 120],
      ["SG", 420, 3_600, 110],
    ],
  ],
];
const COLUMN: Record<Metric, 1 | 2 | 3> = { revenue: 1, orders: 2, profit: 3 };

export default function MetricSwitchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");

  // country names in the reader's language; the same tree for every
  // metric, so the cells move and resize instead of being redrawn
  const { data, byName } = useMemo(() => {
    const regions = new Intl.DisplayNames([locale], { type: "region" });
    const byName = new Map<string, [number, number, number]>();
    const data: TreemapNode[] = SALES.map(([region, countries]) => ({
      name: t(\`sales.regions.\${region}\`),
      children: countries.map(([code, ...values]) => {
        const name = regions.of(code) ?? code;
        byName.set(name, values);
        return { name, value: values[COLUMN[metric] - 1] };
      }),
    }));
    return { data, byName };
  }, [locale, metric, t]);
  const formats = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return {
      revenue: (value: number) => money.format(value * 1000),
      orders: (value: number) => number.format(value),
      profit: (value: number) => money.format(value * 1000),
    };
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sales.metric")}
        direction="horizontal"
        value={metric}
        onChange={(value) => setMetric(value as Metric)}
      >
        {METRICS.map((m) => (
          <Radio key={m} value={m} label={t(\`sales.metrics.\${m}\`)} />
        ))}
      </RadioGroup>
      <TreemapChart
        data={data}
        format={formats[metric]}
        renderTooltip={(cell) => {
          const values = byName.get(cell.name);
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
              {values ? (
                METRICS.map((m, i) => (
                  <span
                    key={m}
                    style={{ fontWeight: m === metric ? 600 : undefined }}
                  >
                    {t(\`sales.metrics.\${m}\`)}: {formats[m](values[i])}
                  </span>
                ))
              ) : (
                <span>{formats[metric](cell.value)}</span>
              )}
              <span>
                {t("sales.shareOf", {
                  share: percent.format(cell.percent),
                  metric: t(\`sales.metrics.\${metric}\`),
                })}
              </span>
            </div>
          );
        }}
        height={380}
        ariaLabel={t("sales.aria", { metric: t(\`sales.metrics.\${metric}\`) })}
      />
    </div>
  );
}
`})))()}var Le,Re,ze;function Be(){return(Be=e((()=>{S(),D(),se(),I(),B(),K(),_e(),xe(),Ce(),Te(),De(),Oe(),Ae(),Me(),Pe(),Ie(),t(),g(),te(),Le=n(),Re=h(Object.assign({"./demos/basic.tsx":ne,"./demos/bundle.tsx":re,"./demos/cloud-costs.tsx":ae,"./demos/drill-down.tsx":ce,"./demos/flat.tsx":le,"./demos/live-cluster.tsx":de,"./demos/market-map.tsx":fe,"./demos/metric-switch.tsx":ve}),Object.assign({"./demos/basic.tsx":Se,"./demos/bundle.tsx":we,"./demos/cloud-costs.tsx":Ee,"./demos/drill-down.tsx":$,"./demos/flat.tsx":ke,"./demos/live-cluster.tsx":je,"./demos/market-map.tsx":Ne,"./demos/metric-switch.tsx":Fe})),ze=()=>(0,Le.jsx)(ee,{id:`treemap-chart`,demos:Re})})))()}Be();export{ze as default};