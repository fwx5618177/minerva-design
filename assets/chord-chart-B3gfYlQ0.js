import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-CYxqj30Z.js";import{i as a,n as o,r as s,t as c}from"./Radio-Bpw4i9zQ.js";import{n as l,t as u}from"./Switch-DL9RsLtd.js";import{i as d,r as f}from"./Stack-B3Kr9X_e.js";import{l as p,n as m,t as h,u as g}from"./DocPage-4JD4uRu8.js";import{c as _,t as v}from"./shapes-CNzyZo__.js";function ee(){let{t:e}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),t=(0,y.useMemo)(()=>ne.map(t=>e(`teams.${t}`)),[e]);return(0,te.jsx)(v,{groups:t,matrix:re,ariaLabel:e(`teamsAria`)})}var y,te,ne,re;function b(){return(b=e((()=>{y=t(),i(),_(),te=n(),ne=[`design`,`engineering`,`product`,`marketing`],re=[[0,42,28,14],[36,0,54,8],[30,48,0,22],[12,6,26,0]]})))()}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,i=(0,x.useMemo)(()=>T.map(t=>e(`datacenters.${t}`)),[e]),a=(0,x.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`gbps`,{value:t.format(n)})},[n,e]);return(0,S.jsx)(`div`,{style:C,children:(0,S.jsx)(v,{groups:i,matrix:E,palette:w,format:a,padAngle:4,arcWidth:10,ribbonOpacity:.55,height:440,ariaLabel:e(`datacentersAria`)})})}var x,S,C,w,T,E;function D(){return(D=e((()=>{x=t(),i(),_(),S=n(),C={"--background-color":`#0b1020`,"--surface-color":`#0b1020`,"--surface-elevated-color":`#141b2e`,"--text-color":`#e2e8f0`,"--text-secondary-color":`#8a94ad`,"--border-color":`#1f2a44`,background:`#0b1020`,color:`#e2e8f0`,borderRadius:12,padding:12,width:`100%`,boxSizing:`border-box`},w=[`#22d3ee`,`#a78bfa`,`#f472b6`,`#facc15`,`#34d399`,`#fb923c`],T=[`usEast`,`usWest`,`euCentral`,`apSoutheast`,`apNortheast`,`saEast`],E=[[0,42,36,12,14,9],[38,0,11,18,22,3],[31,9,0,14,7,4],[10,16,12,0,26,1],[12,20,6,24,0,1],[8,2,3,1,1,0]]})))()}function ae(){let{t:e}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),t=(0,O.useMemo)(()=>A.map(t=>e(`modules.${t}`)),[e]);return(0,k.jsx)(v,{groups:t,matrix:j,directed:!0,ribbonColor:`source`,sortGroups:`descending`,labels:`radial`,ticks:!1,height:440,ariaLabel:e(`modulesAria`)})}var O,k,A,j;function M(){return(M=e((()=>{O=t(),i(),_(),k=n(),A=[`app`,`router`,`store`,`uiKit`,`apiClient`,`auth`,`i18n`,`utils`],j=[[0,12,9,24,6,5,7,10],[0,0,2,3,0,4,1,5],[0,0,0,0,14,3,0,8],[0,1,4,0,0,0,9,16],[0,0,2,0,0,7,0,11],[0,2,3,2,6,0,1,6],[0,0,0,0,0,0,0,4],[0,0,0,0,0,0,0,0]]})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,[i,a]=(0,N.useState)(null),o=(0,N.useMemo)(()=>F.map(t=>e(`pages.${t}`)),[e]),s=(0,N.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`visits`,{value:t.format(n)})},[n,e]),c=i?i.source!==void 0&&i.target!==void 0?e(`navFlow`,{source:i.source,target:i.target,value:s(i.value),reverse:s(i.reverseValue??0)}):e(`navPage`,{name:i.name,value:s(i.value)}):e(`navHint`);return(0,P.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,P.jsx)(v,{groups:o,matrix:I,directed:!0,format:s,ribbonOpacity:.7,padAngle:3,height:440,onHover:a,ariaLabel:e(`navAria`)}),(0,P.jsx)(`div`,{"aria-live":`polite`,style:{minHeight:22,textAlign:`center`,color:`var(--text-secondary-color)`,fontSize:13},children:c})]})}var N,P,F,I;function L(){return(L=e((()=>{N=t(),i(),_(),P=n(),F=[`home`,`search`,`category`,`product`,`cart`,`checkout`],I=[[0,18.4,12.6,6.2,1.4,0],[2.8,0,3.1,21.5,.6,0],[3.4,2.2,0,14.8,.4,0],[4.1,6.3,5.2,0,9.6,.8],[1.2,.5,.3,3.9,0,6.4],[.9,0,0,.2,1.6,0]]})))()}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,i=(0,R.useMemo)(()=>B.map(({key:t,color:n})=>({name:e(`regions.${t}`),color:n})),[e]),a=(0,R.useMemo)(()=>{let t=new Intl.NumberFormat(n,{maximumFractionDigits:1});return n=>e(`migrationValue`,{value:t.format(n)})},[n,e]);return(0,z.jsx)(v,{groups:i,matrix:V,format:a,padAngle:3,height:460,ariaLabel:e(`migrationAria`)})}var R,z,B,V;function H(){return(H=e((()=>{R=t(),i(),_(),z=n(),B=[{key:`northAmerica`,color:`#3b82f6`},{key:`latinAmerica`,color:`#10b981`},{key:`europe`,color:`#8b5cf6`},{key:`africa`,color:`#f59e0b`},{key:`westAsia`,color:`#ef4444`},{key:`southAsia`,color:`#ec4899`},{key:`eastAsia`,color:`#06b6d4`},{key:`oceania`,color:`#84cc16`}],V=[[.4,.6,.5,.1,.1,.2,.4,.1],[3.2,.9,1.1,0,0,0,.1,.1],[.8,.3,2.6,.3,.4,.1,.2,.3],[.5,0,2.2,1.8,1.4,0,.1,.1],[.4,0,1.9,.2,1.2,.1,0,.1],[1.1,0,1,.1,4.6,.6,.2,.4],[1.2,.1,.6,.1,.2,.1,.9,.5],[.1,0,.2,0,0,0,.1,.1]]})))()}function ce(){let{t:e}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),[t,n]=(0,U.useState)(`auto`),[i,o]=(0,U.useState)(`none`),[s,l]=(0,U.useState)(`gradient`),[f,p]=(0,U.useState)(!1),[m,h]=(0,U.useState)(!0),g=(0,U.useMemo)(()=>G.map(t=>e(`teams.${t}`)),[e]);return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsxs)(d,{gap:16,wrap:!0,align:`center`,children:[(0,W.jsx)(a,{"aria-label":e(`labelsLabel`),direction:`horizontal`,value:t,onChange:e=>n(e),children:q.map(t=>(0,W.jsx)(c,{value:t,label:e(`labels.${t}`)},t))}),(0,W.jsx)(a,{"aria-label":e(`sortLabel`),direction:`horizontal`,value:i,onChange:e=>o(e),children:J.map(t=>(0,W.jsx)(c,{value:t,label:e(`sort.${t}`)},t))})]}),(0,W.jsxs)(d,{gap:16,wrap:!0,align:`center`,children:[(0,W.jsx)(a,{"aria-label":e(`ribbonColorLabel`),direction:`horizontal`,value:s,onChange:e=>l(e),children:Y.map(t=>(0,W.jsx)(c,{value:t,label:e(`ribbonColor.${t}`)},t))}),(0,W.jsx)(u,{checked:f,onChange:p,label:e(`directed`)}),(0,W.jsx)(u,{checked:m,onChange:h,label:e(`ticks`)})]}),(0,W.jsx)(v,{groups:g,matrix:K,labels:t,sortGroups:i,ribbonColor:s,directed:f,ticks:m,height:400,ariaLabel:e(`teamsAria`)})]})}var U,W,G,K,q,J,Y;function X(){return(X=e((()=>{U=t(),i(),f(),o(),s(),l(),_(),W=n(),G=[`design`,`engineering`,`product`,`marketing`],K=[[0,42,28,14],[36,0,54,8],[30,48,0,22],[12,6,26,0]],q=[`auto`,`tangential`,`radial`,`none`],J=[`none`,`descending`,`ascending`],Y=[`gradient`,`source`,`target`,`neutral`]})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.chord-chart.data`}),n=t.language,i=(0,Z.useMemo)(()=>Q.map(t=>e(`economies.${t}`)),[e]),a=(0,Z.useMemo)(()=>de.map(([e,t,n])=>({source:Q.indexOf(e),target:Q.indexOf(t),value:n})),[]),o=(0,Z.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e9)},[n]);return(0,ue.jsx)(v,{groups:i,links:a,format:o,tickFormat:o,sortGroups:`descending`,height:460,ariaLabel:e(`tradeAria`)})}var Z,ue,Q,de;function fe(){return(fe=e((()=>{Z=t(),i(),_(),ue=n(),Q=[`us`,`china`,`eu`,`mexico`,`canada`,`japan`,`korea`],de=[[`us`,`china`,148],[`china`,`us`,427],[`us`,`eu`,368],[`eu`,`us`,576],[`us`,`mexico`,323],[`mexico`,`us`,475],[`us`,`canada`,354],[`canada`,`us`,421],[`us`,`japan`,76],[`japan`,`us`,148],[`us`,`korea`,65],[`korea`,`us`,116],[`china`,`eu`,550],[`eu`,`china`,245],[`china`,`japan`,158],[`japan`,`china`,135],[`china`,`korea`,149],[`korea`,`china`,125],[`china`,`mexico`,82],[`mexico`,`china`,10],[`canada`,`eu`,32],[`eu`,`canada`,52],[`japan`,`eu`,80],[`eu`,`japan`,75],[`korea`,`eu`,68],[`eu`,`korea`,57]]})))()}var pe;function me(){return(me=e((()=>{pe=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

const TEAMS = ["design", "engineering", "product", "marketing"] as const;

// Messages sent in a week: row = sender, column = recipient
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(() => TEAMS.map((team) => t(\`teams.\${team}\`)), [t]);

  return (
    <ChordChart groups={groups} matrix={MATRIX} ariaLabel={t("teamsAria")} />
  );
}
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

// a dark operations-console palette, read by the chart from these variables
const CONSOLE = {
  "--background-color": "#0b1020",
  "--surface-color": "#0b1020",
  "--surface-elevated-color": "#141b2e",
  "--text-color": "#e2e8f0",
  "--text-secondary-color": "#8a94ad",
  "--border-color": "#1f2a44",
  background: "#0b1020",
  color: "#e2e8f0",
  borderRadius: 12,
  padding: 12,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

const NEON = ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#34d399", "#fb923c"];

const REGIONS = [
  "usEast",
  "usWest",
  "euCentral",
  "apSoutheast",
  "apNortheast",
  "saEast",
] as const;

// Replication traffic between data centers, in Gbit/s (average of a day)
const TRAFFIC = [
  [0, 42, 36, 12, 14, 9],
  [38, 0, 11, 18, 22, 3],
  [31, 9, 0, 14, 7, 4],
  [10, 16, 12, 0, 26, 1],
  [12, 20, 6, 24, 0, 1],
  [8, 2, 3, 1, 1, 0],
];

export default function DarkDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    () => REGIONS.map((region) => t(\`datacenters.\${region}\`)),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gbps", { value: number.format(value) });
  }, [locale, t]);

  return (
    <div style={CONSOLE}>
      <ChordChart
        groups={groups}
        matrix={TRAFFIC}
        palette={NEON}
        format={format}
        padAngle={4}
        arcWidth={10}
        ribbonOpacity={0.55}
        height={440}
        ariaLabel={t("datacentersAria")}
      />
    </div>
  );
}
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

const MODULES = [
  "app",
  "router",
  "store",
  "uiKit",
  "apiClient",
  "auth",
  "i18n",
  "utils",
] as const;

// Import statements of a front-end codebase: row = importing module,
// column = imported module. store ⇄ apiClient and auth ⇄ apiClient are
// import cycles: their ribbons have both a value and a reverse value.
const IMPORTS = [
  [0, 12, 9, 24, 6, 5, 7, 10],
  [0, 0, 2, 3, 0, 4, 1, 5],
  [0, 0, 0, 0, 14, 3, 0, 8],
  [0, 1, 4, 0, 0, 0, 9, 16],
  [0, 0, 2, 0, 0, 7, 0, 11],
  [0, 2, 3, 2, 6, 0, 1, 6],
  [0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(
    () => MODULES.map((module) => t(\`modules.\${module}\`)),
    [t],
  );

  return (
    <ChordChart
      groups={groups}
      matrix={IMPORTS}
      directed
      ribbonColor="source"
      sortGroups="descending"
      labels="radial"
      ticks={false}
      height={440}
      ariaLabel={t("modulesAria")}
    />
  );
}
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ShapeHoverEvent } from "minerva-design/charts";

const PAGES = [
  "home",
  "search",
  "category",
  "product",
  "cart",
  "checkout",
] as const;

// Page-to-page navigations of a shop app in a day, in thousands: row = page
// left, column = page opened next
const NAVIGATIONS = [
  [0, 18.4, 12.6, 6.2, 1.4, 0],
  [2.8, 0, 3.1, 21.5, 0.6, 0],
  [3.4, 2.2, 0, 14.8, 0.4, 0],
  [4.1, 6.3, 5.2, 0, 9.6, 0.8],
  [1.2, 0.5, 0.3, 3.9, 0, 6.4],
  [0.9, 0, 0, 0.2, 1.6, 0],
];

export default function DirectedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const groups = useMemo(() => PAGES.map((page) => t(\`pages.\${page}\`)), [t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("visits", { value: number.format(value) });
  }, [locale, t]);

  const caption = !hovered
    ? t("navHint")
    : hovered.source !== undefined && hovered.target !== undefined
      ? t("navFlow", {
          source: hovered.source,
          target: hovered.target,
          value: format(hovered.value),
          reverse: format(hovered.reverseValue ?? 0),
        })
      : t("navPage", { name: hovered.name, value: format(hovered.value) });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ChordChart
        groups={groups}
        matrix={NAVIGATIONS}
        directed
        format={format}
        ribbonOpacity={0.7}
        padAngle={3}
        height={440}
        onHover={setHovered}
        ariaLabel={t("navAria")}
      />
      <div
        aria-live="polite"
        style={{
          minHeight: 22,
          textAlign: "center",
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        {caption}
      </div>
    </div>
  );
}
`})))()}var $;function xe(){return(xe=e((()=>{$=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ChordGroup } from "minerva-design/charts";

const REGIONS = [
  { key: "northAmerica", color: "#3b82f6" },
  { key: "latinAmerica", color: "#10b981" },
  { key: "europe", color: "#8b5cf6" },
  { key: "africa", color: "#f59e0b" },
  { key: "westAsia", color: "#ef4444" },
  { key: "southAsia", color: "#ec4899" },
  { key: "eastAsia", color: "#06b6d4" },
  { key: "oceania", color: "#84cc16" },
];

// Migrants over five years, in millions (rounded, illustrative): row = region
// of origin, column = region of destination; the diagonal is migration
// within a region, drawn as a loop
const MATRIX = [
  [0.4, 0.6, 0.5, 0.1, 0.1, 0.2, 0.4, 0.1],
  [3.2, 0.9, 1.1, 0, 0, 0, 0.1, 0.1],
  [0.8, 0.3, 2.6, 0.3, 0.4, 0.1, 0.2, 0.3],
  [0.5, 0, 2.2, 1.8, 1.4, 0, 0.1, 0.1],
  [0.4, 0, 1.9, 0.2, 1.2, 0.1, 0, 0.1],
  [1.1, 0, 1, 0.1, 4.6, 0.6, 0.2, 0.4],
  [1.2, 0.1, 0.6, 0.1, 0.2, 0.1, 0.9, 0.5],
  [0.1, 0, 0.2, 0, 0, 0, 0.1, 0.1],
];

export default function MigrationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    (): ChordGroup[] =>
      REGIONS.map(({ key, color }) => ({
        name: t(\`regions.\${key}\`),
        color,
      })),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) =>
      t("migrationValue", { value: number.format(value) });
  }, [locale, t]);

  return (
    <ChordChart
      groups={groups}
      matrix={MATRIX}
      format={format}
      padAngle={3}
      height={460}
      ariaLabel={t("migrationAria")}
    />
  );
}
`})))()}var Se;function Ce(){return(Ce=e((()=>{Se=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import { ChordChart, type ChordChartProps } from "minerva-design/charts";

type Labels = NonNullable<ChordChartProps["labels"]>;
type Sort = NonNullable<ChordChartProps["sortGroups"]>;
type RibbonColor = NonNullable<ChordChartProps["ribbonColor"]>;

const TEAMS = ["design", "engineering", "product", "marketing"] as const;
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

const LABELS: Labels[] = ["auto", "tangential", "radial", "none"];
const SORTS: Sort[] = ["none", "descending", "ascending"];
const COLORS: RibbonColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [labels, setLabels] = useState<Labels>("auto");
  const [sortGroups, setSortGroups] = useState<Sort>("none");
  const [ribbonColor, setRibbonColor] = useState<RibbonColor>("gradient");
  const [directed, setDirected] = useState(false);
  const [ticks, setTicks] = useState(true);

  const groups = useMemo(() => TEAMS.map((team) => t(\`teams.\${team}\`)), [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("labelsLabel")}
          direction="horizontal"
          value={labels}
          onChange={(value) => setLabels(value as Labels)}
        >
          {LABELS.map((value) => (
            <Radio key={value} value={value} label={t(\`labels.\${value}\`)} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("sortLabel")}
          direction="horizontal"
          value={sortGroups}
          onChange={(value) => setSortGroups(value as Sort)}
        >
          {SORTS.map((value) => (
            <Radio key={value} value={value} label={t(\`sort.\${value}\`)} />
          ))}
        </RadioGroup>
      </HStack>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("ribbonColorLabel")}
          direction="horizontal"
          value={ribbonColor}
          onChange={(value) => setRibbonColor(value as RibbonColor)}
        >
          {COLORS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t(\`ribbonColor.\${value}\`)}
            />
          ))}
        </RadioGroup>
        <Switch
          checked={directed}
          onChange={setDirected}
          label={t("directed")}
        />
        <Switch checked={ticks} onChange={setTicks} label={t("ticks")} />
      </HStack>
      <ChordChart
        groups={groups}
        matrix={MATRIX}
        labels={labels}
        sortGroups={sortGroups}
        ribbonColor={ribbonColor}
        directed={directed}
        ticks={ticks}
        height={400}
        ariaLabel={t("teamsAria")}
      />
    </div>
  );
}
`})))()}var we;function Te(){return(Te=e((()=>{we=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ChordLink } from "minerva-design/charts";

type Economy = "us" | "china" | "eu" | "mexico" | "canada" | "japan" | "korea";

const ECONOMIES: Economy[] = [
  "us",
  "china",
  "eu",
  "mexico",
  "canada",
  "japan",
  "korea",
];

// Goods exports of a year, in billions of US$ (rounded, illustrative)
const EXPORTS: [Economy, Economy, number][] = [
  ["us", "china", 148],
  ["china", "us", 427],
  ["us", "eu", 368],
  ["eu", "us", 576],
  ["us", "mexico", 323],
  ["mexico", "us", 475],
  ["us", "canada", 354],
  ["canada", "us", 421],
  ["us", "japan", 76],
  ["japan", "us", 148],
  ["us", "korea", 65],
  ["korea", "us", 116],
  ["china", "eu", 550],
  ["eu", "china", 245],
  ["china", "japan", 158],
  ["japan", "china", 135],
  ["china", "korea", 149],
  ["korea", "china", 125],
  ["china", "mexico", 82],
  ["mexico", "china", 10],
  ["canada", "eu", 32],
  ["eu", "canada", 52],
  ["japan", "eu", 80],
  ["eu", "japan", 75],
  ["korea", "eu", 68],
  ["eu", "korea", 57],
];

export default function TradeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    () => ECONOMIES.map((economy) => t(\`economies.\${economy}\`)),
    [t],
  );
  const links = useMemo(
    (): ChordLink[] =>
      EXPORTS.map(([from, to, value]) => ({
        source: ECONOMIES.indexOf(from),
        target: ECONOMIES.indexOf(to),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => usd.format(value * 1e9);
  }, [locale]);

  return (
    <ChordChart
      groups={groups}
      links={links}
      format={format}
      tickFormat={format}
      sortGroups="descending"
      height={460}
      ariaLabel={t("tradeAria")}
    />
  );
}
`})))()}var Ee,De,Oe;function ke(){return(ke=e((()=>{b(),D(),M(),L(),H(),X(),fe(),me(),ge(),ve(),be(),xe(),Ce(),Te(),t(),m(),g(),Ee=n(),De=p(Object.assign({"./demos/basic.tsx":ee,"./demos/dark.tsx":ie,"./demos/dependencies.tsx":ae,"./demos/directed.tsx":oe,"./demos/migration.tsx":se,"./demos/options.tsx":ce,"./demos/trade.tsx":le}),Object.assign({"./demos/basic.tsx":pe,"./demos/dark.tsx":he,"./demos/dependencies.tsx":_e,"./demos/directed.tsx":ye,"./demos/migration.tsx":$,"./demos/options.tsx":Se,"./demos/trade.tsx":we})),Oe=()=>(0,Ee.jsx)(h,{id:`chord-chart`,demos:De})})))()}ke();export{Oe as default};