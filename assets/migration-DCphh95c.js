import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; minerva-hover reads both directions of a
// ribbon (\`value\` and \`reverseValue\`).
import type {
  MinervaChordChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChordChart>("#migration")!;
  const output = root.querySelector<HTMLOutputElement>("#flow")!;
  chart.groups = text.regions;
  chart.links = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  output.textContent = text.hint;
  const onHover = (event: Event) => {
    const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
    if (!hovered) output.textContent = text.hint;
    else if (hovered.source === undefined)
      output.textContent = text.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    else
      output.textContent = text.flow
        .replace("{source}", hovered.source)
        .replace("{target}", hovered.target ?? "")
        .replace("{value}", String(hovered.value))
        .replace("{reverse}", String(hovered.reverseValue ?? 0));
  };
  chart.addEventListener("minerva-hover", onHover);
  return () => chart.removeEventListener("minerva-hover", onHover);
}
`})))()}n();export{t as default};