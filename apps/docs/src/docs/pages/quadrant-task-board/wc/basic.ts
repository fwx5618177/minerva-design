// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. The board is controlled:
// minerva-points-change gives the next list, set it back as `points`. The
// built-in buttons and dialogs follow the page language.
import type {
  MinervaQuadrantTaskBoard,
  QuadrantPoint,
} from "minerva-design/web-components/quadrant-task-board";

const TEXT = {
  en: {
    doFirst: "Do first",
    schedule: "Schedule",
    delegate: "Delegate",
    eliminate: "Eliminate",
    important: "Important",
    notImportant: "Not important",
    urgent: "Urgent",
    notUrgent: "Not urgent",
    boardAria: "Task matrix: drag tasks between quadrants",
    tasks: {
      loginOutage: "Fix login outage",
      quarterlyPlanning: "Quarterly planning",
      bookTravel: "Book travel",
      inboxZero: "Inbox zero",
    },
  },
  zh: {
    doFirst: "立即做",
    schedule: "计划做",
    delegate: "委派",
    eliminate: "删除",
    important: "重要",
    notImportant: "不重要",
    urgent: "紧急",
    notUrgent: "不紧急",
    boardAria: "任务矩阵：在象限之间拖动任务",
    tasks: {
      loginOutage: "修复登录故障",
      quarterlyPlanning: "季度规划",
      bookTravel: "预订差旅",
      inboxZero: "清空收件箱",
    },
  },
  ja: {
    doFirst: "すぐやる",
    schedule: "計画する",
    delegate: "任せる",
    eliminate: "やめる",
    important: "重要",
    notImportant: "重要でない",
    urgent: "緊急",
    notUrgent: "緊急でない",
    boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
    tasks: {
      loginOutage: "ログイン障害の修正",
      quarterlyPlanning: "四半期計画",
      bookTravel: "出張の予約",
      inboxZero: "受信トレイの整理",
    },
  },
  fr: {
    doFirst: "À faire tout de suite",
    schedule: "À planifier",
    delegate: "À déléguer",
    eliminate: "À abandonner",
    important: "Important",
    notImportant: "Pas important",
    urgent: "Urgent",
    notUrgent: "Pas urgent",
    boardAria:
      "Matrice des tâches : faites glisser les tâches entre les quadrants",
    tasks: {
      loginOutage: "Réparer la connexion",
      quarterlyPlanning: "Planification trimestrielle",
      bookTravel: "Réserver le voyage",
      inboxZero: "Boîte de réception vide",
    },
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const board = root.querySelector<MinervaQuadrantTaskBoard>("#board")!;
  board.points = [
    { x: 9, y: 8, label: text.tasks.loginOutage },
    { x: 3, y: 8.5, label: text.tasks.quarterlyPlanning },
    { x: 8, y: 3, label: text.tasks.bookTravel },
    { x: 2.5, y: 2, label: text.tasks.inboxZero },
  ];
  board.quadrants = {
    topLeft: { label: text.doFirst, color: "var(--danger-color, #ef4444)" },
    topRight: { label: text.schedule, color: "var(--primary-color, #4f46e5)" },
    bottomLeft: {
      label: text.delegate,
      color: "var(--warning-color, #f59e0b)",
    },
    bottomRight: {
      label: text.eliminate,
      color: "var(--text-secondary-color, #64748b)",
    },
  };
  board.axisLabels = {
    top: text.important,
    bottom: text.notImportant,
    left: text.urgent,
    right: text.notUrgent,
  };
  board.setAttribute("aria-label", text.boardAria);
  const onPointsChange = (event: Event) => {
    board.points = (
      event as CustomEvent<{ points: QuadrantPoint[] }>
    ).detail.points;
  };
  board.addEventListener("minerva-points-change", onPointsChange);
  return () => {
    board.removeEventListener("minerva-points-change", onPointsChange);
  };
}
