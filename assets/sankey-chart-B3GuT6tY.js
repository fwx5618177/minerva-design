import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{i as a,n as o,r as s,t as c}from"./Radio-L-_0EAus.js";import{n as l,t as u}from"./Switch-CHbzff3y.js";import{i as ee,r as d}from"./Stack-B3Kr9X_e.js";import{l as f,n as te,t as p,u as ne}from"./DocPage-BbPSunu1.js";import{c as m,s as h}from"./shapes-8zuLWo7l.js";function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),n=t.language,i=(0,g.useMemo)(()=>v.map(({key:t,color:n})=>({name:e(`budget.${t}`),...n?{color:n}:{}})),[e]),a=(0,g.useMemo)(()=>y.map(([e,t,n])=>({source:b.indexOf(e),target:b.indexOf(t),value:n})),[]),o=(0,g.useMemo)(()=>{let e=new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1});return t=>e.format(t*1e6)},[n]);return(0,_.jsx)(h,{nodes:i,links:a,format:o,linkColor:`target`,linkOpacity:.35,nodeWidth:10,height:440,ariaLabel:e(`budgetAria`)})}var g,_,v,y,b;function x(){return(x=e((()=>{g=t(),i(),m(),_=n(),v=[{key:`licenses`},{key:`subscriptions`},{key:`services`},{key:`grants`},{key:`budget`,color:`#64748b`},{key:`rnd`,color:`#6366f1`},{key:`sales`,color:`#f59e0b`},{key:`operations`,color:`#10b981`},{key:`admin`,color:`#ec4899`},{key:`platform`,color:`#818cf8`},{key:`mobile`,color:`#818cf8`},{key:`ai`,color:`#818cf8`},{key:`campaigns`,color:`#fbbf24`},{key:`salesTeam`,color:`#fbbf24`},{key:`infrastructure`,color:`#34d399`},{key:`support`,color:`#34d399`},{key:`finance`,color:`#f472b6`},{key:`offices`,color:`#f472b6`}],y=[[`licenses`,`budget`,18.4],[`subscriptions`,`budget`,42.6],[`services`,`budget`,9.2],[`grants`,`budget`,2.8],[`budget`,`rnd`,29.5],[`budget`,`sales`,21.3],[`budget`,`operations`,13.7],[`budget`,`admin`,8.5],[`rnd`,`platform`,12.8],[`rnd`,`mobile`,7.9],[`rnd`,`ai`,8.8],[`sales`,`campaigns`,9.6],[`sales`,`salesTeam`,11.7],[`operations`,`infrastructure`,8.1],[`operations`,`support`,5.6],[`admin`,`finance`,4.4],[`admin`,`offices`,4.1]],b=v.map(e=>e.key)})))()}function S(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),n=t.language,i=(0,C.useMemo)(()=>T.map(({key:t,color:n})=>({name:e(`energy.${t}`),color:n})),[e]),a=(0,C.useMemo)(()=>E.map(([e,t,n])=>({source:D(e),target:D(t),value:n})),[]),o=(0,C.useMemo)(()=>{let t=new Intl.NumberFormat(n);return n=>e(`twh`,{value:t.format(n)})},[n,e]);return(0,w.jsx)(h,{nodes:i,links:a,format:o,height:420,ariaLabel:e(`energyAria`)})}var C,w,T,E,D;function O(){return(O=e((()=>{C=t(),i(),m(),w=n(),T=[{key:`solar`,color:`#f59e0b`},{key:`wind`,color:`#38bdf8`},{key:`hydro`,color:`#0284c7`},{key:`nuclear`,color:`#a855f7`},{key:`gas`,color:`#f97316`},{key:`coal`,color:`#64748b`},{key:`oil`,color:`#92400e`},{key:`electricity`,color:`#eab308`},{key:`heat`,color:`#ef4444`},{key:`fuels`,color:`#b45309`},{key:`homes`,color:`#10b981`},{key:`industry`,color:`#6366f1`},{key:`services`,color:`#14b8a6`},{key:`transport`,color:`#ec4899`},{key:`losses`,color:`#94a3b8`}],E=[[`solar`,`electricity`,62],[`wind`,`electricity`,138],[`hydro`,`electricity`,54],[`nuclear`,`electricity`,182],[`gas`,`electricity`,96],[`coal`,`electricity`,48],[`gas`,`heat`,58],[`gas`,`homes`,142],[`gas`,`industry`,104],[`coal`,`industry`,36],[`oil`,`fuels`,420],[`electricity`,`homes`,168],[`electricity`,`industry`,152],[`electricity`,`services`,124],[`electricity`,`transport`,22],[`electricity`,`losses`,114],[`heat`,`homes`,36],[`heat`,`services`,22],[`fuels`,`transport`,348],[`fuels`,`industry`,42],[`fuels`,`losses`,30]],D=e=>T.findIndex(t=>t.key===e)})))()}function k(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[n,i]=(0,A.useState)(null),a=(0,A.useMemo)(()=>new Intl.NumberFormat(t.language),[t.language]),o=(0,A.useMemo)(()=>e=>a.format(e),[a]),s=(0,A.useMemo)(()=>M.map(t=>({name:e(`journey.${t}`)})),[e]),c=(0,A.useMemo)(()=>N.map(([e,t,n])=>({source:M.indexOf(e),target:M.indexOf(t),value:n})),[]);return(0,j.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,j.jsx)(h,{nodes:s,links:c,align:`left`,linkColor:`source`,format:o,onClick:i,height:400,ariaLabel:e(`journeyAria`)}),(0,j.jsx)(`p`,{role:`status`,style:{margin:0},children:n?n.source&&n.target?e(`journeyLink`,{source:n.source,target:n.target,value:a.format(n.value),share:(n.percent*100).toFixed(1)}):e(`journeyNode`,{name:n.name,value:a.format(n.value)}):e(`journeyHint`)})]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),i(),m(),j=n(),M=[`searchAds`,`organic`,`newsletter`,`social`,`home`,`pricing`,`blog`,`signup`,`left`,`trial`,`abandoned`,`paid`,`expired`],N=[[`searchAds`,`home`,4200],[`searchAds`,`pricing`,2600],[`organic`,`home`,3800],[`organic`,`blog`,5200],[`newsletter`,`blog`,1900],[`newsletter`,`pricing`,900],[`social`,`blog`,2400],[`social`,`home`,1100],[`home`,`signup`,3100],[`home`,`left`,6e3],[`pricing`,`signup`,2100],[`pricing`,`left`,1400],[`blog`,`signup`,1300],[`blog`,`left`,8200],[`signup`,`trial`,4700],[`signup`,`abandoned`,1800],[`trial`,`paid`,1300],[`trial`,`expired`,3400]]})))()}function ie(){let{t:e}=r(`common`,{keyPrefix:`docs.sankey-chart.data`}),[t,n]=(0,F.useState)(`justify`),[i,o]=(0,F.useState)(`gradient`),[s,l]=(0,F.useState)(!0),d=(0,F.useMemo)(()=>L.map(t=>({name:e(`support.${t}`)})),[e]),f=(0,F.useMemo)(()=>R.map(([e,t,n])=>({source:L.indexOf(e),target:L.indexOf(t),value:n})),[]);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(a,{"aria-label":e(`alignLabel`),direction:`horizontal`,value:t,onChange:e=>n(e),children:z.map(t=>(0,I.jsx)(c,{value:t,label:e(`align.${t}`)},t))}),(0,I.jsxs)(ee,{gap:16,wrap:!0,align:`center`,children:[(0,I.jsx)(a,{"aria-label":e(`linkColorLabel`),direction:`horizontal`,value:i,onChange:e=>o(e),children:B.map(t=>(0,I.jsx)(c,{value:t,label:e(`linkColor.${t}`)},t))}),(0,I.jsx)(u,{checked:s,onChange:l,label:e(`labelValues`)})]}),(0,I.jsx)(h,{nodes:d,links:f,align:t,linkColor:i,labelValues:s,height:340,ariaLabel:e(`supportAria`)})]})}var F,I,L,R,z,B;function V(){return(V=e((()=>{F=t(),i(),d(),o(),s(),l(),m(),I=n(),L=[`email`,`chat`,`phone`,`bot`,`tier1`,`tier2`,`engineering`,`solved`,`refunded`,`escalated`],R=[[`email`,`tier1`,820],[`chat`,`bot`,1400],[`phone`,`tier1`,520],[`bot`,`solved`,760],[`bot`,`tier1`,640],[`tier1`,`solved`,1310],[`tier1`,`refunded`,210],[`tier1`,`tier2`,460],[`tier2`,`solved`,280],[`tier2`,`engineering`,180],[`engineering`,`escalated`,180]],z=[`justify`,`left`,`right`,`center`],B=[`gradient`,`source`,`target`,`neutral`]})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Item =
  | "licenses"
  | "subscriptions"
  | "services"
  | "grants"
  | "budget"
  | "rnd"
  | "sales"
  | "operations"
  | "admin"
  | "platform"
  | "mobile"
  | "ai"
  | "campaigns"
  | "salesTeam"
  | "infrastructure"
  | "support"
  | "finance"
  | "offices";

// Yearly budget of a software company, in millions of dollars: where the
// money comes from, then how it is split between departments and programs
const ITEMS: { key: Item; color?: string }[] = [
  { key: "licenses" },
  { key: "subscriptions" },
  { key: "services" },
  { key: "grants" },
  { key: "budget", color: "#64748b" },
  { key: "rnd", color: "#6366f1" },
  { key: "sales", color: "#f59e0b" },
  { key: "operations", color: "#10b981" },
  { key: "admin", color: "#ec4899" },
  { key: "platform", color: "#818cf8" },
  { key: "mobile", color: "#818cf8" },
  { key: "ai", color: "#818cf8" },
  { key: "campaigns", color: "#fbbf24" },
  { key: "salesTeam", color: "#fbbf24" },
  { key: "infrastructure", color: "#34d399" },
  { key: "support", color: "#34d399" },
  { key: "finance", color: "#f472b6" },
  { key: "offices", color: "#f472b6" },
];

const ALLOCATIONS: [Item, Item, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
  ["rnd", "platform", 12.8],
  ["rnd", "mobile", 7.9],
  ["rnd", "ai", 8.8],
  ["sales", "campaigns", 9.6],
  ["sales", "salesTeam", 11.7],
  ["operations", "infrastructure", 8.1],
  ["operations", "support", 5.6],
  ["admin", "finance", 4.4],
  ["admin", "offices", 4.1],
];

const keys = ITEMS.map((item) => item.key);

export default function BudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  const nodes = useMemo(
    (): SankeyNode[] =>
      ITEMS.map(({ key, color }) => ({
        name: t(\`budget.\${key}\`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );
  // millions of dollars, in the reader's number format
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1e6);
  }, [locale]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      linkColor="target"
      linkOpacity={0.35}
      nodeWidth={10}
      height={440}
      ariaLabel={t("budgetAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Key =
  | "solar"
  | "wind"
  | "hydro"
  | "nuclear"
  | "gas"
  | "coal"
  | "oil"
  | "electricity"
  | "heat"
  | "fuels"
  | "homes"
  | "industry"
  | "services"
  | "transport"
  | "losses";

// A national energy balance, in TWh per year (rounded): primary sources,
// carriers, then end uses. Every carrier gives out what it receives.
const NODES: { key: Key; color: string }[] = [
  { key: "solar", color: "#f59e0b" },
  { key: "wind", color: "#38bdf8" },
  { key: "hydro", color: "#0284c7" },
  { key: "nuclear", color: "#a855f7" },
  { key: "gas", color: "#f97316" },
  { key: "coal", color: "#64748b" },
  { key: "oil", color: "#92400e" },
  { key: "electricity", color: "#eab308" },
  { key: "heat", color: "#ef4444" },
  { key: "fuels", color: "#b45309" },
  { key: "homes", color: "#10b981" },
  { key: "industry", color: "#6366f1" },
  { key: "services", color: "#14b8a6" },
  { key: "transport", color: "#ec4899" },
  { key: "losses", color: "#94a3b8" },
];

const FLOWS: [Key, Key, number][] = [
  ["solar", "electricity", 62],
  ["wind", "electricity", 138],
  ["hydro", "electricity", 54],
  ["nuclear", "electricity", 182],
  ["gas", "electricity", 96],
  ["coal", "electricity", 48],
  ["gas", "heat", 58],
  ["gas", "homes", 142],
  ["gas", "industry", 104],
  ["coal", "industry", 36],
  ["oil", "fuels", 420],
  ["electricity", "homes", 168],
  ["electricity", "industry", 152],
  ["electricity", "services", 124],
  ["electricity", "transport", 22],
  ["electricity", "losses", 114],
  ["heat", "homes", 36],
  ["heat", "services", 22],
  ["fuels", "transport", 348],
  ["fuels", "industry", 42],
  ["fuels", "losses", 30],
];

const index = (key: Key) => NODES.findIndex((n) => n.key === key);

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  // translated names; the links refer to the nodes by index
  const nodes = useMemo(
    (): SankeyNode[] =>
      NODES.map(({ key, color }) => ({ name: t(\`energy.\${key}\`), color })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([source, target, value]) => ({
        source: index(source),
        target: index(target),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("twh", { value: number.format(value) });
  }, [locale, t]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      height={420}
      ariaLabel={t("energyAria")}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Step =
  | "searchAds"
  | "organic"
  | "newsletter"
  | "social"
  | "home"
  | "pricing"
  | "blog"
  | "signup"
  | "left"
  | "trial"
  | "abandoned"
  | "paid"
  | "expired";

const STEPS: Step[] = [
  "searchAds",
  "organic",
  "newsletter",
  "social",
  "home",
  "pricing",
  "blog",
  "signup",
  "left",
  "trial",
  "abandoned",
  "paid",
  "expired",
];

// Sessions of one week, from the acquisition channel to the subscription
const PATHS: [Step, Step, number][] = [
  ["searchAds", "home", 4200],
  ["searchAds", "pricing", 2600],
  ["organic", "home", 3800],
  ["organic", "blog", 5200],
  ["newsletter", "blog", 1900],
  ["newsletter", "pricing", 900],
  ["social", "blog", 2400],
  ["social", "home", 1100],
  ["home", "signup", 3100],
  ["home", "left", 6000],
  ["pricing", "signup", 2100],
  ["pricing", "left", 1400],
  ["blog", "signup", 1300],
  ["blog", "left", 8200],
  ["signup", "trial", 4700],
  ["signup", "abandoned", 1800],
  ["trial", "paid", 1300],
  ["trial", "expired", 3400],
];

export default function JourneyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  const nodes = useMemo(
    (): SankeyNode[] => STEPS.map((step) => ({ name: t(\`journey.\${step}\`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      PATHS.map(([from, to, value]) => ({
        source: STEPS.indexOf(from),
        target: STEPS.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        align="left"
        linkColor="source"
        format={format}
        onClick={setSelected}
        height={400}
        ariaLabel={t("journeyAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.source && selected.target
            ? t("journeyLink", {
                source: selected.source,
                target: selected.target,
                value: number.format(selected.value),
                share: (selected.percent * 100).toFixed(1),
              })
            : t("journeyNode", {
                name: selected.name,
                value: number.format(selected.value),
              })
          : t("journeyHint")}
      </p>
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  SankeyChart,
  type SankeyChartProps,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Align = NonNullable<SankeyChartProps["align"]>;
type LinkColor = NonNullable<SankeyChartProps["linkColor"]>;
type Stage =
  | "email"
  | "chat"
  | "phone"
  | "bot"
  | "tier1"
  | "tier2"
  | "engineering"
  | "solved"
  | "refunded"
  | "escalated";

const STAGES: Stage[] = [
  "email",
  "chat",
  "phone",
  "bot",
  "tier1",
  "tier2",
  "engineering",
  "solved",
  "refunded",
  "escalated",
];

// Support tickets of a month: the chatbot solves some directly, which skips
// a column; that is where \`align\` makes a difference
const ROUTES: [Stage, Stage, number][] = [
  ["email", "tier1", 820],
  ["chat", "bot", 1400],
  ["phone", "tier1", 520],
  ["bot", "solved", 760],
  ["bot", "tier1", 640],
  ["tier1", "solved", 1310],
  ["tier1", "refunded", 210],
  ["tier1", "tier2", 460],
  ["tier2", "solved", 280],
  ["tier2", "engineering", 180],
  ["engineering", "escalated", 180],
];

const ALIGNS: Align[] = ["justify", "left", "right", "center"];
const COLORS: LinkColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [align, setAlign] = useState<Align>("justify");
  const [linkColor, setLinkColor] = useState<LinkColor>("gradient");
  const [labelValues, setLabelValues] = useState(true);

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map((stage) => ({ name: t(\`support.\${stage}\`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ROUTES.map(([from, to, value]) => ({
        source: STAGES.indexOf(from),
        target: STAGES.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("alignLabel")}
        direction="horizontal"
        value={align}
        onChange={(value) => setAlign(value as Align)}
      >
        {ALIGNS.map((value) => (
          <Radio key={value} value={value} label={t(\`align.\${value}\`)} />
        ))}
      </RadioGroup>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("linkColorLabel")}
          direction="horizontal"
          value={linkColor}
          onChange={(value) => setLinkColor(value as LinkColor)}
        >
          {COLORS.map((value) => (
            <Radio key={value} value={value} label={t(\`linkColor.\${value}\`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labelValues}
          onChange={setLabelValues}
          label={t("labelValues")}
        />
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        align={align}
        linkColor={linkColor}
        labelValues={labelValues}
        height={340}
        ariaLabel={t("supportAria")}
      />
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{x(),O(),P(),V(),U(),G(),q(),Y(),t(),te(),ne(),X=n(),Z=f(Object.assign({"./demos/budget.tsx":re,"./demos/energy.tsx":S,"./demos/journey.tsx":k,"./demos/options.tsx":ie}),Object.assign({"./demos/budget.tsx":H,"./demos/energy.tsx":W,"./demos/journey.tsx":K,"./demos/options.tsx":J})),Q=()=>(0,X.jsx)(p,{id:`sankey-chart`,demos:Z})})))()}$();export{Q as default};