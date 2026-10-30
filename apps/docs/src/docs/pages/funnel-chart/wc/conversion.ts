// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#signup")!;
  chart.data = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
}
