// The engine events are DOM events: minerva-hover (null when the pointer
// leaves), minerva-point-click, minerva-zoom... with the engine's payload.
import type {
  ChartHoverEvent,
  MinervaChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "Latency (ms)",
    hint: "Hover or click a point",
    clicked: "Clicked",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    latency: "延迟（毫秒）",
    hint: "悬停或点击一个数据点",
    clicked: "已点击",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    latency: "レイテンシ（ms）",
    hint: "ポイントにカーソルを合わせるかクリックします",
    clicked: "クリック",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    latency: "Latence (ms)",
    hint: "Survolez ou cliquez sur un point",
    clicked: "Cliqué",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChart>("#chart")!;
  const readout = root.querySelector<HTMLOutputElement>("#readout")!;
  chart.options = {
    series: [
      { name: text.latency, type: "line", data: [42, 38, 65, 120, 96, 54] },
    ],
    xAxis: { type: "category", categories: text.hours },
    crosshair: true,
  };
  readout.textContent = text.hint;
  const describe = (event: ChartHoverEvent) =>
    `${event.xLabel} · ${event.items[0]?.seriesName}: ${event.items[0]?.y}`;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    readout.textContent = hover ? describe(hover) : text.hint;
  };
  const onClick = (event: Event) => {
    const click = (event as CustomEvent<ChartHoverEvent>).detail;
    readout.textContent = `${text.clicked} — ${describe(click)}`;
  };
  chart.addEventListener("minerva-hover", onHover);
  chart.addEventListener("minerva-point-click", onClick);
  return () => {
    chart.removeEventListener("minerva-hover", onHover);
    chart.removeEventListener("minerva-point-click", onClick);
  };
}
