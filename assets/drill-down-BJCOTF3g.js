import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.
import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#org")!;
  const path = root.querySelector<HTMLOutputElement>("#path")!;
  chart.data = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  path.textContent = \`\${text.root} · \${text.hint}\`;
  const onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    path.textContent = [text.root, ...names].join(" › ");
  };
  chart.addEventListener("minerva-drill", onDrill);
  return () => chart.removeEventListener("minerva-drill", onDrill);
}
`})))()}n();export{t as default};