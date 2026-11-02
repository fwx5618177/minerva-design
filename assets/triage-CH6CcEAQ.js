import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; \`selectedIndex\` rings the clicked task
// and minerva-point-drop moves it (update \`points\`).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    selected: "Selected: {task}",
    moved: "{task} moved to “{quadrant}”",
    count: (n: number) => (n === 1 ? "1 task" : \`\${n} tasks\`),
    corners: {
      topLeft: ["Do first", "Do it now"],
      topRight: ["Schedule", "Plan a time"],
      bottomLeft: ["Delegate", "Hand it off"],
      bottomRight: ["Eliminate", "Drop it"],
    },
    tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
  },
  zh: {
    hint: "点击任务以选中，拖到其他象限即可移动",
    selected: "已选中：{task}",
    moved: "{task} 已移到“{quadrant}”",
    count: (n: number) => \`\${n} 项\`,
    corners: {
      topLeft: ["立即处理", "立即做"],
      topRight: ["计划安排", "安排时间"],
      bottomLeft: ["委派他人", "交给别人"],
      bottomRight: ["放弃", "不做"],
    },
    tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
  },
  ja: {
    hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
    selected: "選択中：{task}",
    moved: "{task} を「{quadrant}」に移動しました",
    count: (n: number) => \`\${n} 件\`,
    corners: {
      topLeft: ["すぐ実行", "今すぐやる"],
      topRight: ["計画", "時間を確保"],
      bottomLeft: ["委任", "人に任せる"],
      bottomRight: ["削除", "やらない"],
    },
    tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
  },
  fr: {
    hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
    selected: "Sélection : {task}",
    moved: "{task} déplacée vers « {quadrant} »",
    count: (n: number) => (n <= 1 ? \`\${n} tâche\` : \`\${n} tâches\`),
    corners: {
      topLeft: ["À faire", "Maintenant"],
      topRight: ["À planifier", "Réserver un créneau"],
      bottomLeft: ["À déléguer", "Confier"],
      bottomRight: ["À abandonner", "Laisser tomber"],
    },
    tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
  },
};

const BADGES: Record<QuadrantCorner, string> = {
  topLeft: "Q1",
  topRight: "Q2",
  bottomLeft: "Q3",
  bottomRight: "Q4",
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaQuadrantChart>("#triage")!;
  const status = root.querySelector<HTMLOutputElement>("#triage-status")!;
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  chart.quadrants = Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.corners[corner][0],
        description: text.corners[corner][1],
      },
    ]),
  );
  // a function (property only) writes the count; the attribute shows the number
  chart.showCounts = (count) => text.count(count);
  status.textContent = text.hint;
  const onClick = (event: Event) => {
    const { point, index } = (
      event as CustomEvent<{ point: QuadrantPoint; index: number }>
    ).detail;
    chart.selectedIndex = index;
    status.textContent = text.selected.replace("{task}", \`\${point.label}\`);
  };
  const onDrop = (event: Event) => {
    const { point, index, x, y, quadrant } = (
      event as CustomEvent<{
        point: QuadrantPoint;
        index: number;
        x: number;
        y: number;
        quadrant: QuadrantCorner;
      }>
    ).detail;
    chart.points = chart.points!.map((p, i) =>
      i === index ? { ...p, x, y } : p,
    );
    chart.selectedIndex = index;
    status.textContent = text.moved
      .replace("{task}", \`\${point.label}\`)
      .replace("{quadrant}", text.corners[quadrant][0]);
  };
  chart.addEventListener("minerva-point-click", onClick);
  chart.addEventListener("minerva-point-drop", onDrop);
  return () => {
    chart.removeEventListener("minerva-point-click", onClick);
    chart.removeEventListener("minerva-point-drop", onDrop);
  };
}
`})))()}n();export{t as default};