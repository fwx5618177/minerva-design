import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Streaming updates: \`applyDeltas\` changes a few levels (drawn once per
// frame, eased); the book is not passed again.
import type { MinervaDepthChart } from "minerva-design/web-components/order-book";

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

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

export function setup(root: HTMLElement) {
  const chart = root.querySelector<MinervaDepthChart>("#live")!;
  chart.book = { bids: side(-1, 3), asks: side(1, 4) };
  chart.options = { range: 0.012 };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    chart.applyDeltas(delta(tick));
  }, 400);
  return () => window.clearInterval(timer);
}
`})))()}n();export{t as default};