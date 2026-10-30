// A flat list: one rectangle per node, its area proportional to the value.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

export function setup(root: HTMLElement) {
  const regions =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#markets")!;
  chart.data = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  chart.options = { format: (millions) => `${millions}M` };
}
