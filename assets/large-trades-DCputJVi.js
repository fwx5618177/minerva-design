import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (\`aggregate\`), small ones hidden (\`minSize\`), large ones
// highlighted; minerva-trade-click reports the clicked row.
import type {
  MinervaTimeAndSales,
  TimeAndSalesRowEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const tape = root.querySelector<MinervaTimeAndSales>("#trades")!;
  const output = root.querySelector<HTMLOutputElement>("#trade")!;
  tape.trades = Array.from({ length: 2000 }, (_, i) => trade(i));
  tape.options = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  output.textContent = text.hint;
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
    output.textContent = \`\${row.trade.price} × \${row.trade.size} \${text.size} (\${row.count})\`;
  };
  tape.addEventListener("minerva-trade-click", onClick);
  return () => tape.removeEventListener("minerva-trade-click", onClick);
}
`})))()}n();export{t as default};