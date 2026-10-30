import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{l as a,n as o,t as s,u as c}from"./DocPage-JhXgs5p-.js";import{c as l,d as u}from"./shapes-LryspZMN.js";function d(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,[i,a]=(0,f.useState)(null),o=(0,f.useMemo)(()=>{let t=n=>({name:n.key?e(`folders.${n.key}`):n.name??``,value:n.value,children:n.children?.map(t)});return m.map(t)},[e]),s=(0,f.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`gigabyte`,maximumFractionDigits:1}),[n]),c=(0,f.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,p.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,p.jsx)(u,{data:o,format:e=>s.format(e),percentFormat:e=>c.format(e),renderTooltip:e=>(0,p.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,p.jsx)(`strong`,{children:(e.path??[e.name]).join(` › `)}),(0,p.jsxs)(`span`,{children:[s.format(e.value),` · `,c.format(e.percent)]})]}),onClick:a,height:380,ariaLabel:e(`diskAria`)}),(0,p.jsx)(`p`,{role:`status`,children:i?e(`diskSelected`,{path:(i.path??[i.name]).join(` › `),size:s.format(i.value),share:c.format(i.percent)}):e(`clickCell`)})]})}var f,p,m;function h(){return(h=e((()=>{f=t(),i(),l(),p=n(),m=[{key:`media`,children:[{key:`videos`,value:31.2},{key:`photos`,value:24.3},{key:`music`,value:6.4}]},{key:`applications`,children:[{name:`Xcode`,value:12.4},{name:`Docker`,value:9.8},{name:`Figma`,value:1.2},{name:`Chrome`,value:1.1},{name:`Slack`,value:.6}]},{key:`projects`,children:[{name:`monorepo`,value:14.2},{name:`design-assets`,value:4.3},{name:`side-project`,value:1.6}]},{key:`system`,children:[{key:`library`,value:11.8},{key:`caches`,value:7.6},{key:`logs`,value:2.1}]},{key:`downloads`,children:[{key:`installers`,value:5.3},{key:`archives`,value:3.9}]}]})))()}function g(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,i=(0,_.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`kilobyte`}),[n]),a=(0,_.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),o=y.reduce((e,t)=>e+x(t),0),s=(y[0].children??[]).filter(e=>x(e)>=b);return(0,v.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,v.jsx)(u,{data:y,format:e=>i.format(e),percentFormat:e=>a.format(e),renderTooltip:t=>(0,v.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,v.jsx)(`strong`,{children:(t.path??[t.name]).join(`/`)}),(0,v.jsxs)(`span`,{children:[i.format(t.value),` ·`,` `,e(`ofBundle`,{share:a.format(t.percent)})]})]}),height:360,ariaLabel:e(`bundleAria`)}),(0,v.jsx)(`p`,{children:e(`bundleSummary`,{size:i.format(o),modules:s.map(e=>e.name).join(`, `)})})]})}var _,v,y,b,x;function S(){return(S=e((()=>{_=t(),i(),l(),v=n(),y=[{name:`node_modules`,children:[{name:`react-dom`,value:131},{name:`lodash`,value:72},{name:`moment`,value:67},{name:`moment/locale`,value:160},{name:`chart.js`,value:204},{name:`axios`,value:14},{name:`zod`,value:57},{name:`react`,value:7}]},{name:`src`,children:[{name:`pages`,children:[{name:`dashboard`,value:48},{name:`settings`,value:22},{name:`reports`,value:36}]},{name:`components`,value:61},{name:`i18n`,value:28},{name:`utils`,value:9}]}],b=100,x=e=>e.value??(e.children??[]).reduce((e,t)=>e+x(t),0)})))()}function C(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,i=(0,w.useMemo)(()=>E.map(({key:t,value:n})=>({name:e(`departments.${t}`),value:n})),[e]),a=(0,w.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),[n]),o=(0,w.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`}),[n]);return(0,T.jsx)(u,{data:i,format:e=>a.format(e),percentFormat:e=>o.format(e),renderTooltip:e=>(0,T.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,T.jsx)(`strong`,{children:e.name}),(0,T.jsxs)(`span`,{children:[a.format(e.value),` · `,o.format(e.percent)]})]}),gap:4,height:320,ariaLabel:e(`budgetAria`)})}var w,T,E;function D(){return(D=e((()=>{w=t(),i(),l(),T=n(),E=[{key:`engineering`,value:42e5},{key:`sales`,value:28e5},{key:`marketing`,value:19e5},{key:`success`,value:12e5},{key:`operations`,value:9e5},{key:`finance`,value:6e5},{key:`people`,value:5e5},{key:`legal`,value:3e5}]})))()}function O(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.treemap-chart.data`}),n=t.language,i=(0,k.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,minimumFractionDigits:1,maximumFractionDigits:1,signDisplay:`exceptZero`}),[n]),a=(0,k.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e9)},[n]),o=(0,k.useMemo)(()=>j.map(({sector:t,stocks:n})=>({name:e(`sectors.${t}`),color:`#262931`,children:n.map(([e,t,n])=>({name:`${e} ${i.format(n/100)}`,value:t,color:F(n)}))})),[e,i]);return(0,A.jsx)(u,{data:o,gap:1,format:a,renderTooltip:t=>(0,A.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,A.jsx)(`strong`,{children:(t.path??[t.name]).join(` › `)}),(0,A.jsx)(`span`,{children:e(`marketCap`,{value:a(t.value)})})]}),legend:!1,height:400,ariaLabel:e(`marketAria`)})}var k,A,j,M,N,P,F;function I(){return(I=e((()=>{k=t(),i(),l(),A=n(),j=[{sector:`technology`,stocks:[[`ACME`,2950,1.8],[`LUMA`,2610,-.6],[`QBIT`,1420,3.2],[`NOVA`,610,-2.4],[`CHIP`,380,.4]]},{sector:`finance`,stocks:[[`BANK`,540,-.3],[`PAYX`,470,.9],[`SAFE`,260,-1.1]]},{sector:`health`,stocks:[[`CURE`,720,-1.7],[`GENE`,410,2.6],[`MEDI`,300,.1]]},{sector:`energy`,stocks:[[`PETR`,450,-3.1],[`SOLR`,120,4.4]]},{sector:`consumer`,stocks:[[`SHOP`,1850,.7],[`DRNK`,280,-.4],[`CARS`,690,-2.2]]}],M=[246,53,56],N=[65,69,84],P=[48,204,90],F=e=>{let t=Math.min(1,Math.abs(e)/3),n=e<0?M:P;return`rgb(${N.map((e,r)=>Math.round(e+(n[r]-e)*t)).join(`, `)})`}})))()}var L;function R(){return(R=e((()=>{L=`import { useMemo, useState } from "react";
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
`})))()}var z;function B(){return(B=e((()=>{z=`import { useMemo } from "react";
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
`})))()}var V;function H(){return(H=e((()=>{V=`import { useMemo } from "react";
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
`})))()}var U;function W(){return(W=e((()=>{U=`import { useMemo } from "react";
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
`})))()}var G,K,q;function J(){return(J=e((()=>{h(),S(),D(),I(),R(),B(),H(),W(),t(),o(),c(),G=n(),K=a(Object.assign({"./demos/basic.tsx":d,"./demos/bundle.tsx":g,"./demos/flat.tsx":C,"./demos/market-map.tsx":O}),Object.assign({"./demos/basic.tsx":L,"./demos/bundle.tsx":z,"./demos/flat.tsx":V,"./demos/market-map.tsx":U})),q=()=>(0,G.jsx)(s,{id:`treemap-chart`,demos:K})})))()}J();export{q as default};