// <minerva-order-book>: asks above the spread row, bids below, depth bars
// and a large order highlight; minerva-level-click reports the clicked row
// (e.g. to fill a price in an order form).
import type {
  MinervaOrderBook,
  OrderBookLevelEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
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
  const ladder = root.querySelector<MinervaOrderBook>("#ladder")!;
  const level = root.querySelector<HTMLOutputElement>("#level")!;
  ladder.book = { bids: side(-1, 1), asks: side(1, 2) };
  ladder.options = { largeOrderThreshold: 50 };
  level.textContent = text.hint;
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
    level.textContent = `${text.price} ${row.price} · ${text.size} ${row.size}`;
  };
  ladder.addEventListener("minerva-level-click", onClick);
  return () => ladder.removeEventListener("minerva-level-click", onClick);
}
