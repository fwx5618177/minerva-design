import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// A user journey with drop-offs: \`align="left"\` keeps every step in its
// column, \`link-color="source"\` colors a flow like the page it leaves.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
];

export function setup(root: HTMLElement) {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chart = root.querySelector<MinervaSankeyChart>("#journey")!;
  chart.nodes = steps.map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  }));
  chart.links = FLOWS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
}
`})))()}n();export{t as default};