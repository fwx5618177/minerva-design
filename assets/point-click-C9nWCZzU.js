import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// minerva-point-click gives the clicked point, minerva-quadrant-click the
// quadrant of a click on the empty area (\`reverse-x\`: urgent on the left).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    urgency: "Urgency",
    importance: "Importance",
    hint: "Click a task or a quadrant",
    corners: {
      topLeft: "Do first",
      topRight: "Schedule",
      bottomLeft: "Delegate",
      bottomRight: "Eliminate",
    },
    tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
  },
  zh: {
    urgency: "紧急程度",
    importance: "重要程度",
    hint: "点击任务或象限",
    corners: {
      topLeft: "立即处理",
      topRight: "计划安排",
      bottomLeft: "委派他人",
      bottomRight: "放弃",
    },
    tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
  },
  ja: {
    urgency: "緊急度",
    importance: "重要度",
    hint: "タスクまたは象限をクリックします",
    corners: {
      topLeft: "すぐ実行",
      topRight: "計画",
      bottomLeft: "委任",
      bottomRight: "削除",
    },
    tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
  },
  fr: {
    urgency: "Urgence",
    importance: "Importance",
    hint: "Cliquez sur une tâche ou un quadrant",
    corners: {
      topLeft: "À faire",
      topRight: "À planifier",
      bottomLeft: "À déléguer",
      bottomRight: "À abandonner",
    },
    tasks: [
      "Correctif",
      "Feuille de route",
      "E-mails",
      "Newsletter",
      "Entretien",
    ],
  },
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
  [6.5, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaQuadrantChart>("#tasks")!;
  const task = root.querySelector<HTMLOutputElement>("#task")!;
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  chart.quadrants = {
    topLeft: { label: text.corners.topLeft },
    topRight: { label: text.corners.topRight },
    bottomLeft: { label: text.corners.bottomLeft },
    bottomRight: { label: text.corners.bottomRight },
  };
  chart.xLabel = text.urgency;
  chart.yLabel = text.importance;
  task.textContent = text.hint;
  const onPoint = (event: Event) => {
    const { point } = (event as CustomEvent<{ point: QuadrantPoint }>).detail;
    task.textContent = \`\${point.label}\`;
  };
  const onQuadrant = (event: Event) => {
    const { quadrant } = (event as CustomEvent<{ quadrant: QuadrantCorner }>)
      .detail;
    task.textContent = text.corners[quadrant];
  };
  chart.addEventListener("minerva-point-click", onPoint);
  chart.addEventListener("minerva-quadrant-click", onQuadrant);
  return () => {
    chart.removeEventListener("minerva-point-click", onPoint);
    chart.removeEventListener("minerva-quadrant-click", onQuadrant);
  };
}
`})))()}n();export{t as default};