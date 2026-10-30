// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#cpu")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.bands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gauge.options = { format: (value) => `${value}%` };
}
