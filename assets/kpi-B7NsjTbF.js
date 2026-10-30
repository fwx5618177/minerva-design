import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersLabel = root.querySelector<HTMLElement>("#orders-label")!;
  const revenueLabel = root.querySelector<HTMLElement>("#revenue-label")!;
  const signupsLabel = root.querySelector<HTMLElement>("#signups-label")!;
  const orders = root.querySelector<MinervaSparkline>("#orders")!;
  const revenue = root.querySelector<MinervaSparkline>("#revenue")!;
  const signups = root.querySelector<MinervaSparkline>("#signups")!;
  ordersLabel.textContent = text.orders;
  revenueLabel.textContent = text.revenue;
  signupsLabel.textContent = text.signups;
  orders.data = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  orders.valueName = text.orders;
  revenue.data = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenue.valueName = text.revenue;
  signups.data = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signups.valueName = text.signups;
}
`})))()}n();export{t as default};