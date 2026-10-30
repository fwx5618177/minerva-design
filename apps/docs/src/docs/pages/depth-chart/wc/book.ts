// <minerva-depth-chart>: the cumulative bids and asks of a book (`book`,
// levels as `[price, size]` pairs or columns); minerva-hover reports the
// hovered price and the cumulative amount.
import type {
  DepthChartHoverEvent,
  MinervaDepthChart,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", total: "Total", hint: "Hover the curves" },
  zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
  ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
  fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
};

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDepthChart>("#depth")!;
  const readout = root.querySelector<HTMLOutputElement>("#readout")!;
  chart.book = { bids: side(-1, 1), asks: side(1, 2) };
  readout.textContent = text.hint;
  const onHover = (event: Event) => {
    const point = (event as CustomEvent<DepthChartHoverEvent | null>).detail;
    readout.textContent = point
      ? `${text.price} ${point.price} · ${text.total} ${point.amount}`
      : text.hint;
  };
  chart.addEventListener("minerva-hover", onHover);
  return () => chart.removeEventListener("minerva-hover", onHover);
}
