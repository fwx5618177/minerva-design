// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the element's methods
// (resetZoom, getView, setView) drive the view from outside.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLineChart>("#signal")!;
  const reset = root.querySelector<HTMLButtonElement>("#reset")!;
  chart.series = [
    {
      name: text.sensor,
      data: Array.from({ length: 2000 }, (_, i) =>
        Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
      ),
    },
  ];
  chart.options = { crosshair: true, interaction: { zoom: "x" } };
  reset.textContent = text.reset;
  const onReset = () => chart.resetZoom();
  reset.addEventListener("click", onReset);
  return () => reset.removeEventListener("click", onReset);
}
