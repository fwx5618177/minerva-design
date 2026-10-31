import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{i as d,r as f}from"./Stack-B3Kr9X_e.js";import{l as p,n as m,t as h,u as g}from"./DocPage-BbPSunu1.js";import{c as _,i as v}from"./shapes-8zuLWo7l.js";function y(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),[n,i]=(0,b.useState)([]),a=(0,b.useMemo)(()=>{let t=n=>n.map(n=>({name:n.folder?e(`disk.${n.folder}`):n.name??``,value:n.size,...n.children?{children:t(n.children)}:{}}));return t(S)},[e]),o=(0,b.useMemo)(()=>{let n=new Intl.NumberFormat(t.language,{maximumFractionDigits:1});return t=>e(`gb`,{value:n.format(t)})},[t.language,e]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,x.jsx)(v,{data:a,format:o,onDrill:e=>i(e.path),height:400,ariaLabel:e(`diskAria`)}),(0,x.jsx)(`p`,{role:`status`,style:{margin:0},children:n.length?e(`diskPath`,{path:[e(`disk.root`),...n].join(` / `)}):e(`diskHint`)})]})}var b,x,S;function C(){return(C=e((()=>{b=t(),i(),_(),x=n(),S=[{folder:`applications`,children:[{name:`Xcode`,size:12.4},{name:`Docker`,size:9.8},{name:`Figma`,size:1.2},{name:`Chrome`,size:1.1},{name:`Slack`,size:.6},{folder:`other`,size:3.4}]},{folder:`photos`,children:[{name:`2024`,size:18.5},{name:`2025`,size:22.1},{name:`2026`,size:9.6}]},{folder:`developer`,children:[{name:`node_modules`,size:14.2},{folder:`caches`,children:[{name:`npm`,size:3.1},{name:`pnpm`,size:6.4},{name:`Gradle`,size:2.2}]},{folder:`simulators`,size:11.5}]},{folder:`documents`,children:[{folder:`projects`,children:[{name:`minerva`,size:4.2},{name:`client-site`,size:2.7},{folder:`archive`,size:6.1}]},{folder:`pdfs`,size:2.3},{folder:`spreadsheets`,size:.8}]},{folder:`system`,size:18},{folder:`music`,size:7.4}]})))()}function w(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),[n,i]=(0,T.useState)([]),a=(0,T.useMemo)(()=>{let t=n=>n.map(([n,r])=>typeof r==`number`?{name:e(`catalog.${n}`),value:r}:{name:e(`catalog.${n}`),children:t(r)});return t(D)},[e]),s=(0,T.useMemo)(()=>{let e=new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e3)},[t.language]),c=[e(`catalog.all`),...n];return(0,E.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,E.jsx)(d,{gap:4,align:`center`,wrap:!0,as:`nav`,"aria-label":e(`breadcrumb`),children:c.map((e,t)=>(0,E.jsxs)(d,{gap:4,align:`center`,children:[t>0&&(0,E.jsx)(`span`,{"aria-hidden":!0,children:`/`}),(0,E.jsx)(o,{size:`small`,variant:t===n.length?`solid`:`ghost`,"aria-current":t===n.length?`location`:void 0,onClick:()=>i(n.slice(0,t)),children:e})]},`${t}-${e}`))}),(0,E.jsx)(v,{data:a,drillPath:n,onDrill:e=>i(e.path),format:s,cornerRadius:4,padAngle:2,height:400,ariaLabel:e(`catalogAria`)})]})}var T,E,D;function O(){return(O=e((()=>{T=t(),i(),a(),f(),_(),E=n(),D=[[`electronics`,[[`phones`,[[`flagship`,420],[`midRange`,310],[`accessories`,140]]],[`laptops`,520],[`audio`,[[`headphones`,190],[`speakers`,110]]]]],[`home`,[[`kitchen`,260],[`furniture`,340],[`decor`,120]]],[`fashion`,[[`men`,210],[`women`,330],[`kids`,150]]],[`sports`,[[`outdoor`,180],[`fitness`,160]]]]})))()}function k(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),[n,i]=(0,A.useState)(`auto`),a=t.language,o=(0,A.useMemo)(()=>{let t=new Intl.DisplayNames([a],{type:`region`});return M.map(([n,r])=>({name:e(`world.${n}`),children:r.map(([n,r])=>({name:n===`other`?e(`world.other`):t.of(n)??n,value:r}))}))},[a,e]),c=(0,A.useMemo)(()=>{let t=new Intl.NumberFormat(a);return n=>e(`millions`,{value:t.format(n)})},[a,e]);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,j.jsx)(s,{"aria-label":e(`labelsLabel`),direction:`horizontal`,value:n,onChange:e=>i(e),children:N.map(t=>(0,j.jsx)(u,{value:t,label:e(`labels.${t}`)},t))}),(0,j.jsx)(v,{data:o,labels:n,format:c,legend:!0,startAngle:-30,height:440,ariaLabel:e(`worldAria`)})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),i(),c(),l(),_(),j=n(),M=[[`asia`,[[`IN`,1429],[`CN`,1410],[`ID`,278],[`PK`,240],[`BD`,173],[`JP`,124],[`PH`,117],[`VN`,99],[`other`,856]]],[`africa`,[[`NG`,224],[`ET`,127],[`EG`,113],[`CD`,102],[`TZ`,67],[`other`,827]]],[`europe`,[[`RU`,144],[`DE`,84],[`GB`,68],[`FR`,68],[`IT`,59],[`other`,319]]],[`americas`,[[`US`,335],[`BR`,216],[`MX`,128],[`CO`,52],[`AR`,46],[`other`,263]]],[`oceania`,[[`AU`,27],[`PG`,10],[`NZ`,5],[`other`,3]]]],N=[`auto`,`tangential`,`radial`,`none`]})))()}function F(){let{t:e}=r(`common`,{keyPrefix:`docs.sunburst-chart.data`}),t=(0,I.useMemo)(()=>{let t=n=>n.map(([n,r])=>typeof r==`number`?{name:e(`org.${n}`),value:r}:{name:e(`org.${n}`),children:t(r)});return t(R)},[e]),n=(0,I.useMemo)(()=>t=>e(`people`,{value:t}),[e]);return(0,L.jsx)(v,{data:t,levels:2,labels:`radial`,innerRadius:.3,format:n,height:400,ariaLabel:e(`orgAria`)})}var I,L,R;function z(){return(z=e((()=>{I=t(),i(),_(),L=n(),R=[[`engineering`,[[`platform`,[[`infrastructure`,18],[`security`,9],[`devtools`,11]]],[`product`,[[`web`,24],[`mobile`,16],[`payments`,12]]],[`data`,[[`analytics`,10],[`ml`,8]]]]],[`sales`,[[`emea`,22],[`americas`,31],[`apac`,14]]],[`success`,[[`support`,26],[`onboarding`,9]]],[`marketing`,[[`brand`,7],[`growth`,12],[`content`,6]]],[`operations`,[[`finance`,8],[`people`,7],[`legal`,4],[`it`,6]]]]})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo, useState } from "react";
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
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo, useState } from "react";
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
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo, useState } from "react";
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
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
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
`})))()}var J,Y,X;function Z(){return(Z=e((()=>{C(),O(),P(),z(),V(),U(),G(),q(),t(),m(),g(),J=n(),Y=p(Object.assign({"./demos/disk-usage.tsx":y,"./demos/drill-down.tsx":w,"./demos/labels.tsx":k,"./demos/org.tsx":F}),Object.assign({"./demos/disk-usage.tsx":B,"./demos/drill-down.tsx":H,"./demos/labels.tsx":W,"./demos/org.tsx":K})),X=()=>(0,J.jsx)(h,{id:`sunburst-chart`,demos:Y})})))()}Z();export{X as default};