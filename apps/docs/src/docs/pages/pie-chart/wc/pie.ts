// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.
import type { MinervaPieChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

export function setup(root: HTMLElement) {
  const names =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaPieChart>("#sources")!;
  chart.data = [1048, 735, 580, 484, 300].map((value, i) => ({
    name: names[i],
    value,
  }));
}
