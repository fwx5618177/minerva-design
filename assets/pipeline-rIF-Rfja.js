import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const toggle = root.querySelector<MinervaSwitch>("#critical")!;
  const chart = root.querySelector<MinervaDependencyGraph>("#pipeline")!;
  toggle.label = text.critical;
  chart.nodes = text.jobs.map((label, i) => ({
    id: \`j\${i}\`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  chart.edges = NEEDS.map(([a, b]) => ({ source: \`j\${a}\`, target: \`j\${b}\` }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };
  toggle.addEventListener("minerva-change", onChange);
  return () => toggle.removeEventListener("minerva-change", onChange);
}
`})))()}n();export{t as default};