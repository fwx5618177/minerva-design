import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{l as a,n as o,t as s,u as ee}from"./DocPage-JhXgs5p-.js";import{i as c,t as l}from"./three-d-isGCf2Yj.js";function te(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,i=(0,u.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),a=(0,u.useMemo)(()=>new Intl.NumberFormat(n,{style:`percent`,maximumFractionDigits:0}),[n]),o=(0,u.useMemo)(()=>{let t=f.flatMap((e,t)=>p.map((e,n)=>({x:t,y:n,z:m[t][n],value:h[t][n]})));return[{name:e(`revenue`),data:t,colorBy:`value`,format:e=>a.format(e/100)}]},[e,a]);return(0,d.jsx)(l,{series:o,colorScale:`spectral`,xAxis:{title:e(`product`),categories:f.map(t=>e(`productNames.${t}`))},yAxis:{title:e(`market`),categories:p.map(t=>e(`markets.${t}`))},zAxis:{title:e(`revenue`),format:e=>i.format(e*1e6)},colorBar:{title:e(`margin`),format:e=>a.format(e/100)},camera:{azimuth:38,elevation:24},height:440,ariaLabel:e(`marginAria`)})}var u,d,f,p,m,h;function g(){return(g=e((()=>{u=t(),i(),c(),d=n(),f=[`laptops`,`phones`,`tablets`,`watches`,`audio`],p=[`americas`,`europe`,`asia`,`oceania`],m=[[42,31,38,6],[55,40,61,8],[18,14,22,3],[12,11,9,2],[16,13,15,3]],h=[[8,11,6,12],[21,24,17,25],[14,16,9,18],[34,31,28,36],[27,29,22,30]]})))()}function ne(){let{t:e}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),t=(0,_.useMemo)(()=>[{name:e(`women`),color:`var(--chart-series-5, #ec4899)`,data:y.flatMap((e,t)=>b.map((n,r)=>[r,t,x(e,n,!0)]))},{name:e(`men`),color:`var(--chart-series-1, #3b82f6)`,data:y.flatMap((e,t)=>b.map((n,r)=>[r,t,-x(e,n,!1)]))}],[e]),n=b.map((t,n)=>n===b.length-1?e(`ageOver`,{from:t}):e(`ageGroup`,{from:t,to:t+9}));return(0,v.jsx)(l,{series:t,barWidth:.8,xAxis:{title:e(`age`),categories:n},yAxis:{title:e(`year`),categories:y.map(String)},zAxis:{title:e(`population`),format:t=>e(`millions`,{value:Math.abs(t)})},aspect:[1.2,.8,.8],camera:{azimuth:28,elevation:14},height:440,ariaLabel:e(`pyramidAria`)})}var _,v,y,b,x;function S(){return(S=e((()=>{_=t(),i(),c(),v=n(),y=[1960,1980,2e3,2020],b=[0,10,20,30,40,50,60,70,80],x=(e,t,n)=>{let r=4.2-(e-1960)*.025,i=Math.exp(-((t/(62+(e-1960)*.2))**4)),a=1+Math.max(0,.6-Math.abs(e-1960-t-10)/25),o=r*i*a*(n?1+t/400:1);return Math.round(o*100)/100}})))()}function re(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,i=(0,C.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{month:`short`,timeZone:`UTC`});return Array.from({length:12},(t,n)=>e.format(Date.UTC(2026,n,1)))},[n]),a=(0,C.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),o=(0,C.useMemo)(()=>[{name:e(`sales`),data:O}],[e]);return(0,w.jsx)(l,{series:o,xAxis:{title:e(`region`),categories:T.map(t=>e(`regions.${t}`))},yAxis:{title:e(`month`),categories:i},zAxis:{title:e(`sales`),format:e=>a.format(e*1e3)},aspect:[.75,1.2,.6],camera:{azimuth:50,elevation:28},height:440,ariaLabel:e(`salesAria`)})}var C,w,T,E,D,O;function k(){return(k=e((()=>{C=t(),i(),c(),w=n(),T=[`north`,`south`,`east`,`west`,`central`],E=[1.3,.8,1.1,.95,.6],D=re(8),O=T.flatMap((e,t)=>Array.from({length:12},(e,n)=>{let r=1+.35*Math.cos((n-11)/12*Math.PI*2);return[t,n,Math.round(120*E[t]*r*(.85+D()*.3))]}))})))()}function ae(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,i=(0,A.useMemo)(()=>new Intl.NumberFormat(n,{style:`currency`,currency:`USD`,notation:`compact`}),[n]),a=(0,A.useMemo)(()=>Object.keys(P).map(t=>({name:e(`products.${t}`),data:P[t].flatMap((e,t)=>e.map((e,n)=>[t,n,e]))})),[e]);return(0,j.jsx)(l,{series:a,barWidth:.6,xAxis:{title:e(`quarter`),categories:M.map(t=>e(`quarters.${t}`))},yAxis:{title:e(`market`),categories:N.map(t=>e(`markets.${t}`))},zAxis:{title:e(`revenue`),format:e=>i.format(e*1e6)},legend:{position:`bottom`},camera:{azimuth:40,elevation:26},height:440,ariaLabel:e(`stackedAria`)})}var A,j,M,N,P;function F(){return(F=e((()=>{A=t(),i(),c(),j=n(),M=[`q1`,`q2`,`q3`,`q4`],N=[`americas`,`europe`,`asia`,`oceania`],P={hardware:[[4.2,3.1,3.8,.9],[4.5,3,4.1,1],[4.1,2.8,4.6,1.1],[5.6,3.9,5.2,1.4]],software:[[2.8,2.2,1.6,.5],[3.1,2.4,1.9,.6],[3.4,2.5,2.3,.6],[3.9,2.9,2.6,.8]],services:[[1.2,1.4,.7,.3],[1.3,1.5,.8,.3],[1.5,1.6,.9,.4],[1.7,1.8,1.1,.4]]}})))()}function oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function se(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.bar-3d-chart.data`}),n=t.language,{days:i,hours:a}=(0,I.useMemo)(()=>{let e=new Intl.DateTimeFormat(n,{weekday:`short`,timeZone:`UTC`}),t=new Intl.DateTimeFormat(n,{hour:`numeric`,timeZone:`UTC`});return{days:Array.from({length:7},(t,n)=>e.format(Date.UTC(2026,0,5+n))),hours:Array.from({length:24},(e,n)=>t.format(Date.UTC(2026,0,5,n)))}},[n]),o=(0,I.useMemo)(()=>new Intl.NumberFormat(n),[n]),s=(0,I.useMemo)(()=>[{name:e(`visits`),data:R,colorBy:`z`,barWidth:.82}],[e]);return(0,ce.jsx)(l,{series:s,colorScale:`plasma`,xAxis:{title:e(`hour`),categories:a},yAxis:{title:e(`weekday`),categories:i},zAxis:{title:e(`visits`),format:e=>o.format(e)},colorBar:{title:e(`visits`)},aspect:[1.6,.7,.45],camera:{azimuth:20,elevation:34},height:420,ariaLabel:e(`trafficAria`)})}var I,ce,L,R;function z(){return(z=e((()=>{I=t(),i(),c(),ce=n(),L=oe(14),R=Array.from({length:7},(e,t)=>Array.from({length:24},(e,n)=>{let r=t>=5?1.35:1,i=Math.exp(-((n-10)**2)/8)*.6,a=Math.exp(-((n-20)**2)/6),o=n<6?.08:.2;return Math.round(1e3*r*(o+i+a)*(.9+L()*.2))})).flatMap((e,t)=>e.map((e,n)=>[n,t,e]))})))()}var B;function V(){return(V=e((()=>{B=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

// Revenue (bar height) and margin (bar color) of five products in four
// markets: the tallest bars are not the most profitable ones
const PRODUCTS = ["laptops", "phones", "tablets", "watches", "audio"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = [
  [42, 31, 38, 6],
  [55, 40, 61, 8],
  [18, 14, 22, 3],
  [12, 11, 9, 2],
  [16, 13, 15, 3],
];
const MARGIN = [
  [8, 11, 6, 12],
  [21, 24, 17, 25],
  [14, 16, 9, 18],
  [34, 31, 28, 36],
  [27, 29, 22, 30],
];

export default function MarginDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
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

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = PRODUCTS.flatMap((_, p) =>
      MARKETS.map((_, m) => ({
        x: p,
        y: m,
        z: REVENUE[p]![m]!,
        value: MARGIN[p]![m]!,
      })),
    );
    return [
      {
        name: t("revenue"),
        data,
        colorBy: "value",
        format: (value) => percent.format(value / 100),
      },
    ];
  }, [t, percent]);

  return (
    <Bar3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("product"),
        categories: PRODUCTS.map((key) => t(\`productNames.\${key}\`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((key) => t(\`markets.\${key}\`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      colorBar={{
        title: t("margin"),
        format: (value) => percent.format(value / 100),
      }}
      camera={{ azimuth: 38, elevation: 24 }}
      height={440}
      ariaLabel={t("marginAria")}
    />
  );
}
`})))()}var H;function U(){return(U=e((()=>{H=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Population (millions) by age group in four census years: women above the
// floor, men below it (negative heights), like a population pyramid laid on
// its side and repeated over time
const YEARS = [1960, 1980, 2000, 2020];
const GROUPS = [0, 10, 20, 30, 40, 50, 60, 70, 80];
const population = (year: number, group: number, women: boolean) => {
  // births shrink over the decades while people live longer
  const birth = 4.2 - (year - 1960) * 0.025;
  const survival = Math.exp(-((group / (62 + (year - 1960) * 0.2)) ** 4));
  const shift = 1 + Math.max(0, 0.6 - Math.abs(year - 1960 - group - 10) / 25);
  const value = birth * survival * shift * (women ? 1 + group / 400 : 1);
  return Math.round(value * 100) / 100;
};

export default function PyramidDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });

  const series = useMemo(
    (): Bar3DSeries[] => [
      {
        name: t("women"),
        color: "var(--chart-series-5, #ec4899)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, population(year, group, true)] as const,
          ),
        ),
      },
      {
        name: t("men"),
        color: "var(--chart-series-1, #3b82f6)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, -population(year, group, false)] as const,
          ),
        ),
      },
    ],
    [t],
  );
  const ages = GROUPS.map((from, i) =>
    i === GROUPS.length - 1
      ? t("ageOver", { from })
      : t("ageGroup", { from, to: from + 9 }),
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.8}
      xAxis={{ title: t("age"), categories: ages }}
      yAxis={{ title: t("year"), categories: YEARS.map(String) }}
      zAxis={{
        title: t("population"),
        format: (value) => t("millions", { value: Math.abs(value) }),
      }}
      aspect={[1.2, 0.8, 0.8]}
      camera={{ azimuth: 28, elevation: 14 }}
      height={440}
      ariaLabel={t("pyramidAria")}
    />
  );
}
`})))()}var W;function G(){return(G=e((()=>{W=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const REGIONS = ["north", "south", "east", "west", "central"] as const;
// monthly sales in k$: a seasonal curve peaking in December, scaled per region
const SCALE = [1.3, 0.8, 1.1, 0.95, 0.6];
const random = mulberry32(8);
const sales = REGIONS.flatMap((_, r) =>
  Array.from({ length: 12 }, (_, month) => {
    const season = 1 + 0.35 * Math.cos(((month - 11) / 12) * Math.PI * 2);
    return [
      r,
      month,
      Math.round(120 * SCALE[r]! * season * (0.85 + random() * 0.3)),
    ] as const;
  }),
);

export default function SalesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // "Jan", "janv.", "1月", ...
  const months = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) =>
      format.format(Date.UTC(2026, m, 1)),
    );
  }, [locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] => [{ name: t("sales"), data: sales }],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      xAxis={{
        title: t("region"),
        categories: REGIONS.map((key) => t(\`regions.\${key}\`)),
      }}
      yAxis={{ title: t("month"), categories: months }}
      zAxis={{ title: t("sales"), format: (value) => usd.format(value * 1000) }}
      aspect={[0.75, 1.2, 0.6]}
      camera={{ azimuth: 50, elevation: 28 }}
      height={440}
      ariaLabel={t("salesAria")}
    />
  );
}
`})))()}var K;function q(){return(q=e((()=>{K=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Quarterly revenue (M$) of three product lines in four markets: the bars of
// the same quarter and market are stacked
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = {
  hardware: [
    [4.2, 3.1, 3.8, 0.9],
    [4.5, 3.0, 4.1, 1.0],
    [4.1, 2.8, 4.6, 1.1],
    [5.6, 3.9, 5.2, 1.4],
  ],
  software: [
    [2.8, 2.2, 1.6, 0.5],
    [3.1, 2.4, 1.9, 0.6],
    [3.4, 2.5, 2.3, 0.6],
    [3.9, 2.9, 2.6, 0.8],
  ],
  services: [
    [1.2, 1.4, 0.7, 0.3],
    [1.3, 1.5, 0.8, 0.3],
    [1.5, 1.6, 0.9, 0.4],
    [1.7, 1.8, 1.1, 0.4],
  ],
};
type Product = keyof typeof REVENUE;

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] =>
      (Object.keys(REVENUE) as Product[]).map((product) => ({
        name: t(\`products.\${product}\`),
        data: REVENUE[product].flatMap((row, q) =>
          row.map((value, m) => [q, m, value] as const),
        ),
      })),
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.6}
      xAxis={{
        title: t("quarter"),
        categories: QUARTERS.map((q) => t(\`quarters.\${q}\`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((m) => t(\`markets.\${m}\`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      legend={{ position: "bottom" }}
      camera={{ azimuth: 40, elevation: 26 }}
      height={440}
      ariaLabel={t("stackedAria")}
    />
  );
}
`})))()}var J;function Y(){return(Y=e((()=>{J=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Visits per hour of the week on a shop website: a morning bump, an evening
// peak and busier weekends; heights and colors both show the visits
const random = mulberry32(14);
const visits = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const weekend = day >= 5 ? 1.35 : 1;
    const morning = Math.exp(-((hour - 10) ** 2) / 8) * 0.6;
    const evening = Math.exp(-((hour - 20) ** 2) / 6);
    const night = hour < 6 ? 0.08 : 0.2;
    return Math.round(
      1000 * weekend * (night + morning + evening) * (0.9 + random() * 0.2),
    );
  }),
).flatMap((hours, day) => hours.map((v, hour) => [hour, day, v] as const));

export default function TrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // localized weekday names (Monday first) and hours
  const { days, hours } = useMemo(() => {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      timeZone: "UTC",
    });
    return {
      // 2026-01-05 is a Monday
      days: Array.from({ length: 7 }, (_, d) =>
        weekday.format(Date.UTC(2026, 0, 5 + d)),
      ),
      hours: Array.from({ length: 24 }, (_, h) =>
        hour.format(Date.UTC(2026, 0, 5, h)),
      ),
    };
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): Bar3DSeries[] => [
      { name: t("visits"), data: visits, colorBy: "z", barWidth: 0.82 },
    ],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      colorScale="plasma"
      xAxis={{ title: t("hour"), categories: hours }}
      yAxis={{ title: t("weekday"), categories: days }}
      zAxis={{ title: t("visits"), format: (value) => number.format(value) }}
      colorBar={{ title: t("visits") }}
      aspect={[1.6, 0.7, 0.45]}
      camera={{ azimuth: 20, elevation: 34 }}
      height={420}
      ariaLabel={t("trafficAria")}
    />
  );
}
`})))()}var X,Z,Q;function $(){return($=e((()=>{g(),S(),k(),F(),z(),V(),U(),G(),q(),Y(),t(),o(),ee(),X=n(),Z=a(Object.assign({"./demos/margin.tsx":te,"./demos/pyramid.tsx":ne,"./demos/sales.tsx":ie,"./demos/stacked.tsx":ae,"./demos/traffic.tsx":se}),Object.assign({"./demos/margin.tsx":B,"./demos/pyramid.tsx":H,"./demos/sales.tsx":W,"./demos/stacked.tsx":K,"./demos/traffic.tsx":J})),Q=()=>(0,X.jsx)(s,{id:`bar-3d-chart`,demos:Z})})))()}$();export{Q as default};