import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{c as r,o as i}from"./DemoBlock-BJ0_y9F8.js";import{n as a,t as o}from"./useTranslation-BzoVi22c.js";import{i as s,n as c,r as l,t as ee}from"./Radio-DnNachfg.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-B2iACtLP.js";import{s as u,t as d}from"./shapes-s9T5lCRi.js";function f(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.funnel-chart.data`}),[n,r]=(0,p.useState)(`descending`),i=(0,p.useMemo)(()=>g.map(({key:t,value:n})=>({name:e(`features.${t}`),value:n})),[e]),o=new Intl.NumberFormat(t.language);return(0,m.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,m.jsx)(s,{"aria-label":e(`sortOrder`),direction:`horizontal`,value:n,onChange:e=>r(e),children:h.map(t=>(0,m.jsx)(ee,{value:t,label:e(`sorts.${t}`)},t))}),(0,m.jsx)(d,{data:i,shape:`bar`,sort:n,conversion:!1,gap:6,legend:!1,format:e=>o.format(e),renderTooltip:t=>(0,m.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,m.jsx)(`strong`,{children:t.name}),(0,m.jsx)(`span`,{children:e(`weeklyUsers`,{users:o.format(t.value)})})]}),height:300,ariaLabel:e(`featuresAria`)})]})}var p,m,h,g;function _(){return(_=e((()=>{p=t(),o(),c(),l(),u(),m=n(),h=[`descending`,`ascending`,`none`],g=[{key:`alerts`,value:3900},{key:`dashboards`,value:8400},{key:`integrations`,value:1600},{key:`reports`,value:5200},{key:`api`,value:2100}]})))()}function v(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,r=(0,y.useMemo)(()=>x.map(({key:t,value:n})=>({name:e(`signup.${t}`),value:n})),[e]),i=(0,y.useMemo)(()=>new Intl.NumberFormat(n),[n]),o=(0,y.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]);return(0,b.jsx)(d,{data:r,format:e=>i.format(e),percentFormat:e=>o.format(e),renderTooltip:t=>{let n=t.index>0?r[t.index-1]:null;return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,b.jsx)(`strong`,{children:t.name}),(0,b.jsx)(`span`,{children:e(`users`,{users:i.format(t.value)})}),(0,b.jsx)(`span`,{children:e(`ofVisitors`,{share:o.format(t.percent)})}),n&&(0,b.jsx)(`span`,{children:e(`droppedSince`,{users:i.format(n.value-t.value),stage:n.name})})]})},height:360,ariaLabel:e(`signupAria`)})}var y,b,x;function S(){return(S=e((()=>{y=t(),o(),u(),b=n(),x=[{key:`pricing`,value:24e3},{key:`started`,value:9600},{key:`verified`,value:6850},{key:`project`,value:4100},{key:`invited`,value:1720},{key:`upgraded`,value:640}]})))()}function ae(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,r=(0,C.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),i=(0,C.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),o=(0,C.useMemo)(()=>E.map(t=>({...t,data:T.map((n,r)=>({name:e(`shop.${n}`),value:t.values[r],color:t.color}))})),[e]);return(0,w.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(240px, 1fr))`,gap:16,width:`100%`},children:o.map(t=>(0,w.jsxs)(`figure`,{style:{margin:0},children:[(0,w.jsxs)(`figcaption`,{style:{fontWeight:600,marginBottom:4},children:[e(`devices.${t.key}`),` ·`,` `,e(`conversionRate`,{rate:i.format(t.values[3]/t.values[0])})]}),(0,w.jsx)(d,{data:t.data,legend:!1,format:e=>r.format(e),percentFormat:e=>i.format(e),renderTooltip:t=>(0,w.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,w.jsx)(`strong`,{children:t.name}),(0,w.jsx)(`span`,{children:r.format(t.value)}),(0,w.jsx)(`span`,{children:e(`conversionOverall`,{share:i.format(t.percent)})})]}),height:280,ariaLabel:e(`deviceFunnelAria`,{device:e(`devices.${t.key}`)})})]},t.key))})}var C,w,T,E;function D(){return(D=e((()=>{C=t(),o(),u(),w=n(),T=[`product`,`cart`,`checkout`,`order`],E=[{key:`desktop`,values:[42e3,12600,7900,5300],color:`#0ea5e9`},{key:`mobile`,values:[61e3,13400,5200,2700],color:`#f97316`}]})))()}function oe(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,r=(0,O.useMemo)(()=>new Intl.NumberFormat(n,{notation:`compact`}),[n]),o=(0,O.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),[n]),s=(0,O.useMemo)(()=>j.map(t=>({name:e(`shop.${t.key}`),value:t.value,color:t===M?`var(--danger-color)`:void 0})),[e]),c=(0,O.useMemo)(()=>[{key:`stage`,header:e(`stage`),render:t=>e(`shop.${t.key}`)},{key:`value`,header:e(`visitors`),align:`right`,render:e=>r.format(e.value)},{key:`dropOff`,header:e(`dropOff`),align:`right`,render:e=>e.dropOff===0?`–`:(0,k.jsx)(`span`,{style:{color:e===M?`var(--danger-color)`:void 0,fontWeight:e===M?600:void 0},children:o.format(-e.dropOff)})}],[e,r,o]);return(0,k.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16,alignItems:`center`,width:`100%`},children:[(0,k.jsx)(d,{data:s,legend:!1,format:e=>r.format(e),percentFormat:e=>o.format(e),renderTooltip:t=>(0,k.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,k.jsx)(`strong`,{children:t.name}),(0,k.jsx)(`span`,{children:r.format(t.value)}),(0,k.jsx)(`span`,{children:e(`conversionOverall`,{share:o.format(t.percent)})})]}),height:340,ariaLabel:e(`shopAria`)}),(0,k.jsx)(i,{"aria-label":e(`dropOffTable`),columns:c,data:j,rowKey:e=>e.key,size:`small`})]})}var O,k,A,j,M;function N(){return(N=e((()=>{O=t(),o(),r(),u(),k=n(),A=[{key:`visits`,value:182400},{key:`product`,value:96300},{key:`cart`,value:21700},{key:`checkout`,value:11900},{key:`payment`,value:8350},{key:`order`,value:7480}],j=A.map((e,t)=>({...e,dropOff:t===0?0:1-e.value/A[t-1].value})),M=j.reduce((e,t)=>t.dropOff>e.dropOff?t:e)})))()}function P(){let{t:e,i18n:t}=a(`common`,{keyPrefix:`docs.funnel-chart.data`}),n=t.language,[r,i]=(0,F.useState)(null),o=(0,F.useMemo)(()=>L.map(({key:t,value:n},r)=>({name:e(`hiring.${t}`),value:n,color:R[r]})),[e]),s=new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:1}),c=new Intl.NumberFormat(n,{style:`unit`,unit:`day`}),l=L.reduce((e,t)=>e+t.days,0);return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:8,width:`100%`},children:[(0,I.jsx)(d,{data:o,shape:`bar`,gap:6,legend:!1,percentFormat:e=>s.format(e),renderTooltip:t=>(0,I.jsxs)(`div`,{style:{display:`grid`,gap:2},children:[(0,I.jsx)(`strong`,{children:t.name}),(0,I.jsx)(`span`,{children:e(`candidates`,{candidates:t.value})}),(0,I.jsx)(`span`,{children:e(`stageTime`,{days:c.format(L[t.index].days)})})]}),onClick:i,height:340,ariaLabel:e(`hiringAria`)}),(0,I.jsx)(`p`,{role:`status`,children:r?e(`hiringSelected`,{stage:r.name,candidates:r.value,share:s.format(r.percent)}):e(`hiringSummary`,{rate:s.format(L[5].value/L[0].value),days:c.format(l)})})]})}var F,I,L,R;function z(){return(z=e((()=>{F=t(),o(),u(),I=n(),L=[{key:`applied`,value:640,days:0},{key:`screened`,value:212,days:4},{key:`technical`,value:74,days:9},{key:`onsite`,value:21,days:12},{key:`offer`,value:6,days:5},{key:`hired`,value:4,days:7}],R=[`#64748b`,`#6366f1`,`#8b5cf6`,`#d946ef`,`#f43f5e`,`#16a34a`]})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

type Sort = "descending" | "ascending" | "none";
const SORTS: Sort[] = ["descending", "ascending", "none"];

// Weekly active users of each feature (not a sequential process)
const features = [
  { key: "alerts", value: 3900 },
  { key: "dashboards", value: 8400 },
  { key: "integrations", value: 1600 },
  { key: "reports", value: 5200 },
  { key: "api", value: 2100 },
];

export default function BarsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const [sort, setSort] = useState<Sort>("descending");

  const data = useMemo(
    (): ShapeDatum[] =>
      features.map(({ key, value }) => ({ name: t(\`features.\${key}\`), value })),
    [t],
  );
  const number = new Intl.NumberFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sortOrder")}
        direction="horizontal"
        value={sort}
        onChange={(value) => setSort(value as Sort)}
      >
        {SORTS.map((value) => (
          <Radio key={value} value={value} label={t(\`sorts.\${value}\`)} />
        ))}
      </RadioGroup>
      <FunnelChart
        data={data}
        shape="bar"
        sort={sort}
        conversion={false}
        gap={6}
        legend={false}
        format={(value) => number.format(value)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("weeklyUsers", { users: number.format(event.value) })}
            </span>
          </div>
        )}
        height={300}
        ariaLabel={t("featuresAria")}
      />
    </div>
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Sign-up funnel of a SaaS product over one month
const stages = [
  { key: "pricing", value: 24000 },
  { key: "started", value: 9600 },
  { key: "verified", value: 6850 },
  { key: "project", value: 4100 },
  { key: "invited", value: 1720 },
  { key: "upgraded", value: 640 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): ShapeDatum[] =>
      stages.map(({ key, value }) => ({ name: t(\`signup.\${key}\`), value })),
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

  // The data is not sorted by the chart (sort="none"), so the event index
  // is also the index in \`data\`
  const tooltip = (event: ShapeHoverEvent) => {
    const previous = event.index > 0 ? data[event.index - 1] : null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{t("users", { users: number.format(event.value) })}</span>
        <span>{t("ofVisitors", { share: percent.format(event.percent) })}</span>
        {previous && (
          <span>
            {t("droppedSince", {
              users: number.format(previous.value - event.value),
              stage: previous.name,
            })}
          </span>
        )}
      </div>
    );
  };

  return (
    <FunnelChart
      data={data}
      format={(value) => number.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={tooltip}
      height={360}
      ariaLabel={t("signupAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// The same checkout funnel split by device: where does mobile lose people?
const stages = ["product", "cart", "checkout", "order"];
const devices = [
  { key: "desktop", values: [42_000, 12_600, 7_900, 5_300], color: "#0ea5e9" },
  { key: "mobile", values: [61_000, 13_400, 5_200, 2_700], color: "#f97316" },
];

export default function CompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
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

  // one color per funnel, the stages in the same order
  const funnels = useMemo(
    () =>
      devices.map((device) => ({
        ...device,
        data: stages.map((stage, i): ShapeDatum => ({
          name: t(\`shop.\${stage}\`),
          value: device.values[i],
          color: device.color,
        })),
      })),
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {funnels.map((funnel) => (
        <figure key={funnel.key} style={{ margin: 0 }}>
          <figcaption style={{ fontWeight: 600, marginBottom: 4 }}>
            {t(\`devices.\${funnel.key}\`)} ·{" "}
            {t("conversionRate", {
              rate: percent.format(funnel.values[3] / funnel.values[0]),
            })}
          </figcaption>
          <FunnelChart
            data={funnel.data}
            legend={false}
            format={(value) => number.format(value)}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(event) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{event.name}</strong>
                <span>{number.format(event.value)}</span>
                <span>
                  {t("conversionOverall", {
                    share: percent.format(event.percent),
                  })}
                </span>
              </div>
            )}
            height={280}
            ariaLabel={t("deviceFunnelAria", {
              device: t(\`devices.\${funnel.key}\`),
            })}
          />
        </figure>
      ))}
    </div>
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Checkout funnel of an online shop over one week
const stages = [
  { key: "visits", value: 182_400 },
  { key: "product", value: 96_300 },
  { key: "cart", value: 21_700 },
  { key: "checkout", value: 11_900 },
  { key: "payment", value: 8_350 },
  { key: "order", value: 7_480 },
];

interface Step {
  key: string;
  value: number;
  /** Visitors lost since the previous stage, 0-1 */
  dropOff: number;
}

const steps: Step[] = stages.map((stage, i) => ({
  ...stage,
  dropOff: i === 0 ? 0 : 1 - stage.value / stages[i - 1].value,
}));
// the stage that loses the most visitors
const worst = steps.reduce((a, b) => (b.dropOff > a.dropOff ? b : a));

export default function EcommerceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
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

  // the stage with the biggest drop-off is highlighted in red
  const data = useMemo(
    (): ShapeDatum[] =>
      steps.map((step) => ({
        name: t(\`shop.\${step.key}\`),
        value: step.value,
        color: step === worst ? "var(--danger-color)" : undefined,
      })),
    [t],
  );
  const columns = useMemo(
    (): TableColumn<Step>[] => [
      { key: "stage", header: t("stage"), render: (s) => t(\`shop.\${s.key}\`) },
      {
        key: "value",
        header: t("visitors"),
        align: "right",
        render: (s) => number.format(s.value),
      },
      {
        key: "dropOff",
        header: t("dropOff"),
        align: "right",
        render: (s) =>
          s.dropOff === 0 ? (
            "–"
          ) : (
            <span
              style={{
                color: s === worst ? "var(--danger-color)" : undefined,
                fontWeight: s === worst ? 600 : undefined,
              }}
            >
              {percent.format(-s.dropOff)}
            </span>
          ),
      },
    ],
    [t, number, percent],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{number.format(event.value)}</span>
            <span>
              {t("conversionOverall", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("shopAria")}
      />
      <Table
        aria-label={t("dropOffTable")}
        columns={columns}
        data={steps}
        rowKey={(s) => s.key}
        size="small"
      />
    </div>
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Hiring pipeline of one engineering role, with the typical time per stage
const pipeline = [
  { key: "applied", value: 640, days: 0 },
  { key: "screened", value: 212, days: 4 },
  { key: "technical", value: 74, days: 9 },
  { key: "onsite", value: 21, days: 12 },
  { key: "offer", value: 6, days: 5 },
  { key: "hired", value: 4, days: 7 },
];
// cool to warm colors along the process
const colors = [
  "#64748b",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#f43f5e",
  "#16a34a",
];

export default function RecruitingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      pipeline.map(({ key, value }, i) => ({
        name: t(\`hiring.\${key}\`),
        value,
        color: colors[i],
      })),
    [t],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });
  const days = new Intl.NumberFormat(locale, { style: "unit", unit: "day" });
  const totalDays = pipeline.reduce((sum, stage) => sum + stage.days, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <FunnelChart
        data={data}
        shape="bar"
        gap={6}
        legend={false}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{t("candidates", { candidates: event.value })}</span>
            <span>
              {t("stageTime", {
                days: days.format(pipeline[event.index].days),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={340}
        ariaLabel={t("hiringAria")}
      />
      <p role="status">
        {selected
          ? t("hiringSelected", {
              stage: selected.name,
              candidates: selected.value,
              share: percent.format(selected.percent),
            })
          : t("hiringSummary", {
              rate: percent.format(pipeline[5].value / pipeline[0].value),
              days: days.format(totalDays),
            })}
      </p>
    </div>
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{_(),S(),D(),N(),z(),V(),U(),G(),q(),Y(),t(),ne(),ie(),X=n(),Z=te(Object.assign({"./demos/bars.tsx":f,"./demos/basic.tsx":v,"./demos/compare.tsx":ae,"./demos/ecommerce.tsx":oe,"./demos/recruiting.tsx":P}),Object.assign({"./demos/bars.tsx":B,"./demos/basic.tsx":H,"./demos/compare.tsx":W,"./demos/ecommerce.tsx":K,"./demos/recruiting.tsx":J})),Q=()=>(0,X.jsx)(re,{id:`funnel-chart`,demos:Z})})))()}$();export{Q as default};