import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-rkoeN8eS.js";import{n as a,t as o}from"./Checkbox-Xe4Vj-fa.js";import{i as s,n as c,r as l,t as ee}from"./Radio-L-_0EAus.js";import{i as te,r as u}from"./Stack-B3Kr9X_e.js";import{l as d,n as f,t as p,u as m}from"./DocPage-BbPSunu1.js";import{c as h,p as g,u as _}from"./shapes-8zuLWo7l.js";function ne(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,v.useState)(null),o=(0,v.useMemo)(()=>b.map(({key:t,value:n})=>({name:e(`sources.${t}`),value:n})),[e]),s=(0,v.useMemo)(()=>new Intl.NumberFormat(n),[n]),c=(0,v.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,y.jsx)(_,{data:o,format:e=>s.format(e),percentFormat:e=>c.format(e),renderTooltip:t=>(0,y.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,y.jsx)(`strong`,{children:t.name}),(0,y.jsx)(`span`,{children:e(`sessionsShare`,{sessions:s.format(t.value),share:c.format(t.percent)})})]}),onClick:a,height:320,ariaLabel:e(`sessionsAria`)}),(0,y.jsx)(`p`,{role:`status`,children:i?e(`selectedSource`,{source:i.name,sessions:s.format(i.value),share:c.format(i.percent)}):e(`clickSlice`)})]})}var v,y,b;function x(){return(x=e((()=>{v=t(),i(),h(),y=n(),b=[{key:`organic`,value:48200},{key:`direct`,value:23100},{key:`social`,value:16400},{key:`paid`,value:12700},{key:`referral`,value:9800},{key:`email`,value:6100}]})))()}function re(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,S.useState)(null),o=(0,S.useMemo)(()=>C.map(({key:t,value:n})=>({name:e(`plans.${t}`),value:n})),[e]),s=(0,S.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),[n]),c=new Intl.NumberFormat(n,{style:`percent`}),l=e=>s.format(e);return(0,ie.jsx)(g,{data:o,format:l,centerValue:l(i?i.value:ae),centerLabel:i?`${i.name} · ${c.format(i.percent)}`:e(`monthlyRevenue`),onHover:a,tooltip:!1,legend:T,labelContent:w,height:320,ariaLabel:e(`mrrAria`)})}var S,ie,C,ae,w,T;function E(){return(E=e((()=>{S=t(),i(),h(),ie=n(),C=[{key:`enterprise`,value:48200},{key:`business`,value:31500},{key:`pro`,value:22800},{key:`starter`,value:9400}],ae=C.reduce((e,t)=>e+t.value,0),w=[`name`,`value`],T={toggle:!1}})))()}function oe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,D.useState)(`outside`),[c,l]=(0,D.useState)([`name`,`percent`]),u=(0,D.useMemo)(()=>se.map(({key:t,value:n})=>({name:e(`channels.${t}`),value:n})),[e]),d=(0,D.useMemo)(()=>k.filter(e=>c.includes(e)),[c]),f=(0,D.useMemo)(()=>new Intl.NumberFormat(n),[n]),p=(0,D.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),m=(e,t)=>l(n=>t?[...n,e]:n.filter(t=>t!==e));return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,O.jsx)(s,{"aria-label":e(`labelPlacement`),direction:`horizontal`,value:i,onChange:e=>a(e),children:A.map(t=>(0,O.jsx)(ee,{value:t,label:e(`placements.${t}`)},t))}),(0,O.jsx)(te,{gap:16,role:`group`,"aria-label":e(`labelContent`),children:k.map(t=>(0,O.jsx)(o,{label:e(`parts.${t}`),checked:c.includes(t),disabled:i===`none`||c.length===1&&c[0]===t,onChange:e=>m(t,e)},t))}),(0,O.jsx)(_,{data:u,labels:i,labelContent:d,format:e=>f.format(e),percentFormat:e=>p.format(e),renderTooltip:t=>(0,O.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,O.jsx)(`strong`,{children:t.name}),(0,O.jsx)(`span`,{children:e(`ticketsShare`,{tickets:f.format(t.value),share:p.format(t.percent)})})]}),height:340,ariaLabel:e(`ticketsAria`)})]})}var D,O,se,k,A;function j(){return(j=e((()=>{D=t(),i(),a(),u(),c(),l(),h(),O=n(),se=[{key:`email`,value:1240},{key:`chat`,value:980},{key:`form`,value:610},{key:`phone`,value:430},{key:`social`,value:150},{key:`community`,value:90}],k=[`name`,`value`,`percent`],A=[`outside`,`inside`,`none`]})))()}function ce(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,i=(0,M.useMemo)(()=>{let t=[...P].sort((e,t)=>t[1]-e[1]),n=t.slice(F).reduce((e,[,t])=>e+t,0);return[...t.slice(0,F).map(([e,t])=>({name:e,value:t})),{name:e(`others`),value:n,color:`var(--border-strong-color)`}]},[e]),a=P.reduce((e,[,t])=>e+t,0),o=(0,M.useMemo)(()=>{let e=new Intl.NumberFormat(n,{notation:`compact`});return t=>e.format(t*1e6)},[n]),s=(0,M.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,N.jsx)(g,{data:i,format:o,percentFormat:e=>s.format(e),centerValue:o(a),centerLabel:e(`unitsShipped`),renderTooltip:t=>(0,N.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,N.jsx)(`strong`,{children:t.name}),(0,N.jsx)(`span`,{children:e(`unitsShare`,{units:o(t.value),share:s.format(t.percent)})})]}),height:340,ariaLabel:e(`marketAria`)})}var M,N,P,F;function I(){return(I=e((()=>{M=t(),i(),h(),N=n(),P=[[`Aurora`,231],[`Borealis`,226],[`Cobalt`,146],[`Dynamo`,92],[`Ember`,87],[`Flux`,38],[`Gale`,31],[`Halo`,22],[`Ion`,17],[`Juno`,12],[`Kepler`,9],[`Lumen`,6]],F=5})))()}function le(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,[i,a]=(0,L.useState)(null),{categories:o,items:s}=(0,L.useMemo)(()=>({categories:z.map(t=>({name:e(`budget.${t.key}`),value:t.items.reduce((e,[,t])=>e+t,0),color:t.color})),items:z.flatMap(t=>t.items.map(([n,r],i)=>({name:e(`budget.${n}`),value:r,color:B(t.color,.1+i*.25)})))}),[e]),c=(0,L.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),[n]),l=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1});return(0,R.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,R.jsxs)(`div`,{style:{position:`relative`,height:H},children:[(0,R.jsx)(g,{data:s,innerRadius:.7,labels:`none`,legend:!1,tooltip:!1,onHover:a,height:H,ariaLabel:e(`itemsAria`)}),(0,R.jsx)(`div`,{style:{position:`absolute`,top:`50%`,left:`50%`,width:U,height:U,transform:`translate(-50%, -50%)`,clipPath:`circle(50%)`},children:(0,R.jsx)(_,{data:o,labels:`inside`,labelContent:V,legend:!1,tooltip:!1,onHover:a,height:U,ariaLabel:e(`categoriesAria`)})})]}),(0,R.jsx)(`p`,{role:`status`,children:i?e(`budgetLine`,{name:i.name,amount:c.format(i.value),share:l.format(i.percent)}):e(`hoverRing`)})]})}var L,R,z,B,V,H,U;function W(){return(W=e((()=>{L=t(),i(),h(),R=n(),z=[{key:`housing`,color:`#6366f1`,items:[[`rent`,1150],[`energy`,140],[`insurance`,45]]},{key:`food`,color:`#f59e0b`,items:[[`groceries`,420],[`restaurants`,160]]},{key:`transport`,color:`#14b8a6`,items:[[`transit`,86],[`car`,210]]},{key:`leisure`,color:`#ec4899`,items:[[`travel`,180],[`subscriptions`,42],[`sport`,55]]}],B=(e,t)=>{let n=n=>{let r=parseInt(e.slice(n,n+2),16);return Math.round(r+(255-r)*t).toString(16).padStart(2,`0`)};return`#${n(1)}${n(3)}${n(5)}`},V=[`name`],H=340,U=219})))()}function ue(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=t.language,i=(0,G.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{month:`short`});return q.map((t,n)=>({name:e.format(new Date(2026,n,1)),value:t,color:J[Math.floor((n+1)%12/3)]}))},[n]),a=(0,G.useMemo)(()=>new Intl.NumberFormat(n,{style:`unit`,unit:`millimeter`}),[n]);return(0,K.jsx)(_,{data:i,rose:!0,innerRadius:.18,padAngle:2,cornerRadius:4,labelContent:Y,legend:!1,format:e=>a.format(e),renderTooltip:e=>(0,K.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,K.jsx)(`strong`,{children:e.name}),(0,K.jsx)(`span`,{children:a.format(e.value)})]}),height:360,ariaLabel:e(`rainfallAria`)})}var G,K,q,J,Y;function de(){return(de=e((()=>{G=t(),i(),h(),K=n(),q=[78,61,72,58,49,37,28,34,52,86,97,92],J=[`var(--primary-color)`,`var(--success-color)`,`var(--warning-color)`,`var(--danger-color)`],Y=[`name`]})))()}function fe(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.pie-chart.data`}),n=new Intl.NumberFormat(t.language,{style:`percent`}),i=(0,pe.useMemo)(()=>me.map(([t,n])=>({region:e(`regions.${t}`),mobile:n[0]/100,data:Z.map((t,r)=>({name:e(`devices.${t}`),value:n[r],color:Q[r]}))})),[e]);return(0,X.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,X.jsx)(`div`,{style:{display:`flex`,gap:16,flexWrap:`wrap`},children:Z.map((t,n)=>(0,X.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,X.jsx)(`span`,{style:{width:10,height:10,borderRadius:5,background:Q[n]}}),e(`devices.${t}`)]},t))}),(0,X.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(150px, 1fr))`,gap:16},children:i.map(t=>(0,X.jsx)(g,{data:t.data,labels:`none`,legend:!1,centerValue:n.format(t.mobile),centerLabel:t.region,percentFormat:e=>n.format(e),renderTooltip:e=>(0,X.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,X.jsx)(`strong`,{children:e.name}),(0,X.jsx)(`span`,{children:n.format(e.percent)})]}),height:170,ariaLabel:e(`devicesAria`,{region:t.region})},t.region))})]})}var pe,X,Z,Q,me;function he(){return(he=e((()=>{pe=t(),i(),h(),X=n(),Z=[`mobile`,`desktop`,`tablet`],Q=[`var(--primary-color)`,`#14b8a6`,`#f59e0b`],me=[[`asiaPacific`,[71,24,5]],[`europe`,[52,41,7]],[`northAmerica`,[48,44,8]],[`latinAmerica`,[66,29,5]]]})))()}var ge;function _e(){return(_e=e((()=>{ge=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Website sessions over the last 30 days, by traffic source
const sessions = [
  { key: "organic", value: 48200 },
  { key: "direct", value: 23100 },
  { key: "social", value: 16400 },
  { key: "paid", value: 12700 },
  { key: "referral", value: 9800 },
  { key: "email", value: 6100 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      sessions.map(({ key, value }) => ({ name: t(\`sources.\${key}\`), value })),
    [t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
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
      <PieChart
        data={data}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("sessionsShare", {
                sessions: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={320}
        ariaLabel={t("sessionsAria")}
      />
      <p role="status">
        {selected
          ? t("selectedSource", {
              source: selected.name,
              sessions: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickSlice")}
      </p>
    </div>
  );
}
`})))()}var ve;function ye(){return(ye=e((()=>{ve=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly recurring revenue by plan, in US dollars
const revenue = [
  { key: "enterprise", value: 48200 },
  { key: "business", value: 31500 },
  { key: "pro", value: 22800 },
  { key: "starter", value: 9400 },
];
const total = revenue.reduce((sum, d) => sum + d.value, 0);

const labelContent = ["name", "value"] as const;
// The total in the hole always covers every plan, so slices stay visible
const legend = { toggle: false } as const;

export default function DonutDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // The hovered (or keyboard-highlighted) plan replaces the total in the hole
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      revenue.map(({ key, value }) => ({ name: t(\`plans.\${key}\`), value })),
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
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const format = (value: number) => currency.format(value);

  return (
    <DonutChart
      data={data}
      format={format}
      centerValue={format(hovered ? hovered.value : total)}
      centerLabel={
        hovered
          ? \`\${hovered.name} · \${percent.format(hovered.percent)}\`
          : t("monthlyRevenue")
      }
      onHover={setHovered}
      tooltip={false}
      legend={legend}
      labelContent={labelContent}
      height={320}
      ariaLabel={t("mrrAria")}
    />
  );
}
`})))()}var be;function xe(){return(xe=e((()=>{be=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack, Radio, RadioGroup } from "minerva-design";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

type Placement = "outside" | "inside" | "none";
type Part = "name" | "value" | "percent";

// Support tickets opened this quarter, by channel
const tickets = [
  { key: "email", value: 1240 },
  { key: "chat", value: 980 },
  { key: "form", value: 610 },
  { key: "phone", value: 430 },
  { key: "social", value: 150 },
  { key: "community", value: 90 },
];

const PARTS: Part[] = ["name", "value", "percent"];
const PLACEMENTS: Placement[] = ["outside", "inside", "none"];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState<Placement>("outside");
  const [parts, setParts] = useState<Part[]>(["name", "percent"]);

  const data = useMemo(
    (): ShapeDatum[] =>
      tickets.map(({ key, value }) => ({ name: t(\`channels.\${key}\`), value })),
    [t],
  );
  // Keep the array stable between renders: a new one would redraw the labels
  const labelContent = useMemo(
    () => PARTS.filter((part) => parts.includes(part)),
    [parts],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const togglePart = (part: Part, checked: boolean) =>
    setParts((current) =>
      checked ? [...current, part] : current.filter((p) => p !== part),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("labelPlacement")}
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Placement)}
      >
        {PLACEMENTS.map((placement) => (
          <Radio
            key={placement}
            value={placement}
            label={t(\`placements.\${placement}\`)}
          />
        ))}
      </RadioGroup>
      <HStack gap={16} role="group" aria-label={t("labelContent")}>
        {PARTS.map((part) => (
          <Checkbox
            key={part}
            label={t(\`parts.\${part}\`)}
            checked={parts.includes(part)}
            // at least one part stays selected
            disabled={
              labels === "none" || (parts.length === 1 && parts[0] === part)
            }
            onChange={(checked) => togglePart(part, checked)}
          />
        ))}
      </HStack>
      <PieChart
        data={data}
        labels={labels}
        labelContent={labelContent}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("ticketsShare", {
                tickets: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("ticketsAria")}
      />
    </div>
  );
}
`})))()}var $;function Se(){return(Se=e((()=>{$=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Smartphone shipments by vendor (millions of units); the long tail is
// grouped into "Others" so the chart keeps a handful of readable slices
const shipments: [string, number][] = [
  ["Aurora", 231],
  ["Borealis", 226],
  ["Cobalt", 146],
  ["Dynamo", 92],
  ["Ember", 87],
  ["Flux", 38],
  ["Gale", 31],
  ["Halo", 22],
  ["Ion", 17],
  ["Juno", 12],
  ["Kepler", 9],
  ["Lumen", 6],
];
const TOP = 5;

export default function MarketShareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const sorted = [...shipments].sort((a, b) => b[1] - a[1]);
    const others = sorted.slice(TOP).reduce((sum, [, value]) => sum + value, 0);
    return [
      ...sorted.slice(0, TOP).map(([name, value]) => ({ name, value })),
      // a neutral color: "Others" is not a competitor
      { name: t("others"), value: others, color: "var(--border-strong-color)" },
    ];
  }, [t]);
  const total = shipments.reduce((sum, [, value]) => sum + value, 0);
  // values are in millions of units
  const units = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1_000_000);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <DonutChart
      data={data}
      format={units}
      percentFormat={(share) => percent.format(share)}
      centerValue={units(total)}
      centerLabel={t("unitsShipped")}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>
            {t("unitsShare", {
              units: units(slice.value),
              share: percent.format(slice.percent),
            })}
          </span>
        </div>
      )}
      height={340}
      ariaLabel={t("marketAria")}
    />
  );
}
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Household budget per month (EUR): categories inside, items outside
const budget = [
  {
    key: "housing",
    color: "#6366f1",
    items: [
      ["rent", 1150],
      ["energy", 140],
      ["insurance", 45],
    ],
  },
  {
    key: "food",
    color: "#f59e0b",
    items: [
      ["groceries", 420],
      ["restaurants", 160],
    ],
  },
  {
    key: "transport",
    color: "#14b8a6",
    items: [
      ["transit", 86],
      ["car", 210],
    ],
  },
  {
    key: "leisure",
    color: "#ec4899",
    items: [
      ["travel", 180],
      ["subscriptions", 42],
      ["sport", 55],
    ],
  },
] as const;

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return \`#\${channel(1)}\${channel(3)}\${channel(5)}\`;
};

const nameOnly = ["name"] as const;
const HEIGHT = 340;
// the inner pie fills the hole of the outer donut (innerRadius 0.7)
const INNER = Math.round((HEIGHT - 16) * 0.7) - 8;

export default function NestedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const { categories, items } = useMemo(() => {
    const categories: ShapeDatum[] = budget.map((category) => ({
      name: t(\`budget.\${category.key}\`),
      value: category.items.reduce((sum, [, value]) => sum + value, 0),
      color: category.color,
    }));
    // the items of a category take lighter shades of its color
    const items: ShapeDatum[] = budget.flatMap((category) =>
      category.items.map(([key, value], i) => ({
        name: t(\`budget.\${key}\`),
        value,
        color: lighten(category.color, 0.1 + i * 0.25),
      })),
    );
    return { categories, items };
  }, [t]);
  const euros = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ position: "relative", height: HEIGHT }}>
        <DonutChart
          data={items}
          innerRadius={0.7}
          labels="none"
          legend={false}
          tooltip={false}
          onHover={setHovered}
          height={HEIGHT}
          ariaLabel={t("itemsAria")}
        />
        {/* the clip keeps the corners of the square free for the outer ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: INNER,
            height: INNER,
            transform: "translate(-50%, -50%)",
            clipPath: "circle(50%)",
          }}
        >
          <PieChart
            data={categories}
            labels="inside"
            labelContent={nameOnly}
            legend={false}
            tooltip={false}
            onHover={setHovered}
            height={INNER}
            ariaLabel={t("categoriesAria")}
          />
        </div>
      </div>
      <p role="status">
        {hovered
          ? t("budgetLine", {
              name: hovered.name,
              amount: euros.format(hovered.value),
              share: percent.format(hovered.percent),
            })
          : t("hoverRing")}
      </p>
    </div>
  );
}
`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

// Average rainfall per month (January to December), in millimeters
const rainfall = [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92];

// One color per season (Dec-Feb, Mar-May, Jun-Aug, Sep-Nov)
const seasons = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

const labelContent = ["name"] as const;

export default function RoseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return rainfall.map((value, i) => ({
      name: month.format(new Date(2026, i, 1)),
      value,
      color: seasons[Math.floor(((i + 1) % 12) / 3)],
    }));
  }, [locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <PieChart
      data={data}
      rose
      innerRadius={0.18}
      padAngle={2}
      cornerRadius={4}
      labelContent={labelContent}
      legend={false}
      format={(value) => millimeters.format(value)}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>{millimeters.format(slice.value)}</span>
        </div>
      )}
      height={360}
      ariaLabel={t("rainfallAria")}
    />
  );
}
`})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Share of sessions by device, per region
const devices = ["mobile", "desktop", "tablet"] as const;
const colors = ["var(--primary-color)", "#14b8a6", "#f59e0b"];
const regions: [string, number[]][] = [
  ["asiaPacific", [71, 24, 5]],
  ["europe", [52, 41, 7]],
  ["northAmerica", [48, 44, 8]],
  ["latinAmerica", [66, 29, 5]],
];

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  // the same colors and order in every chart, so one legend serves them all
  const charts = useMemo(
    () =>
      regions.map(([region, values]) => ({
        region: t(\`regions.\${region}\`),
        mobile: values[0] / 100,
        data: devices.map((device, i): ShapeDatum => ({
          name: t(\`devices.\${device}\`),
          value: values[i],
          color: colors[i],
        })),
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {devices.map((device, i) => (
          <span
            key={device}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors[i],
              }}
            />
            {t(\`devices.\${device}\`)}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 16,
        }}
      >
        {charts.map((chart) => (
          <DonutChart
            key={chart.region}
            data={chart.data}
            labels="none"
            legend={false}
            centerValue={percent.format(chart.mobile)}
            centerLabel={chart.region}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(slice) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{slice.name}</strong>
                <span>{percent.format(slice.percent)}</span>
              </div>
            )}
            height={170}
            ariaLabel={t("devicesAria", { region: chart.region })}
          />
        ))}
      </div>
    </div>
  );
}
`})))()}var ke,Ae,je;function Me(){return(Me=e((()=>{x(),E(),j(),I(),W(),de(),he(),_e(),ye(),xe(),Se(),we(),Ee(),Oe(),t(),f(),m(),ke=n(),Ae=d(Object.assign({"./demos/basic.tsx":ne,"./demos/donut.tsx":re,"./demos/labels.tsx":oe,"./demos/market-share.tsx":ce,"./demos/nested.tsx":le,"./demos/rose.tsx":ue,"./demos/small-multiples.tsx":fe}),Object.assign({"./demos/basic.tsx":ge,"./demos/donut.tsx":ve,"./demos/labels.tsx":be,"./demos/market-share.tsx":$,"./demos/nested.tsx":Ce,"./demos/rose.tsx":Te,"./demos/small-multiples.tsx":De})),je=()=>(0,ke.jsx)(p,{id:`pie-chart`,demos:Ae})})))()}Me();export{je as default};