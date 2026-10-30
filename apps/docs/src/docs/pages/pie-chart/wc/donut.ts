// <minerva-donut-chart>: a pie with a hole and center texts;
// minerva-click reports the clicked slice.
import type {
  MinervaDonutChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDonutChart>("#plans")!;
  const plan = root.querySelector<HTMLOutputElement>("#plan")!;
  chart.data = [2, 18, 46, 34].map((value, i) => ({
    name: text.plans[i],
    value,
  }));
  chart.centerValue = "€100k";
  chart.centerLabel = text.total;
  chart.options = { format: (value) => `€${value}k` };
  plan.textContent = text.hint;
  const onClick = (event: Event) => {
    const slice = (event as CustomEvent<ShapeHoverEvent>).detail;
    plan.textContent = `${slice.name}: €${slice.value}k`;
  };
  chart.addEventListener("minerva-click", onClick);
  return () => chart.removeEventListener("minerva-click", onClick);
}
