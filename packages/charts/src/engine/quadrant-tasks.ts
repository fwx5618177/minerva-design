// Task workflow of the quadrant matrices (QuadrantTaskBoard on every
// renderer): the drafts of the add / edit dialog, the controlled updates
// of the point list and the built-in texts. Pure functions: the renderers
// own their dialogs and only call these.

import { localeLabels, type LabelDictionary } from "./locale";
import {
  DEFAULT_QUADRANT_COLORS,
  quadrantCenter,
  quadrantOf,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantPoint,
} from "./presets";

/** Geometry of a matrix (what places a point in a quadrant) */
export type QuadrantTaskGeometry = Pick<
  QuadrantConfig,
  "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
>;

/** Content of the add / edit dialog of a task board */
export interface QuadrantTaskDraft {
  /** Index of the edited point; `null` for a new one */
  index: number | null;
  /** Name typed in the dialog */
  label: string;
  /** Quadrant picked in the dialog */
  quadrant: QuadrantCorner;
  /** Position kept while the quadrant does not change */
  x: number;
  y: number;
}

/** Built-in texts of the task boards */
export interface QuadrantTaskLabels {
  /** Add button of a quadrant and title of the add dialog */
  add: string;
  /** Edit button of the active point and title of the edit dialog */
  edit: string;
  /** Delete button of the active point and title of its confirmation */
  delete: string;
  /** Text of the delete confirmation: `{name}` is the task */
  deleteConfirm: string;
  /** Confirm button of the delete confirmation */
  confirmDelete: string;
  /** Label of the name field */
  name: string;
  /** Label of the quadrant field */
  quadrant: string;
  save: string;
  cancel: string;
  /** Name of the actions toolbar of the active point */
  actions: string;
}

const QUADRANT_TASK_LABELS: LabelDictionary<QuadrantTaskLabels> = {
  en: {
    add: "Add task",
    edit: "Edit task",
    delete: "Delete task",
    deleteConfirm: "“{name}” will be removed from the board.",
    confirmDelete: "Delete",
    name: "Task name",
    quadrant: "Quadrant",
    save: "Save",
    cancel: "Cancel",
    actions: "Task actions",
  },
  zh: {
    add: "添加任务",
    edit: "编辑任务",
    delete: "删除任务",
    deleteConfirm: "将从看板中移除“{name}”。",
    confirmDelete: "删除",
    name: "任务名称",
    quadrant: "所属象限",
    save: "保存",
    cancel: "取消",
    actions: "任务操作",
  },
  ja: {
    add: "タスクを追加",
    edit: "タスクを編集",
    delete: "タスクを削除",
    deleteConfirm: "「{name}」をボードから削除します。",
    confirmDelete: "削除",
    name: "タスク名",
    quadrant: "象限",
    save: "保存",
    cancel: "キャンセル",
    actions: "タスクの操作",
  },
  fr: {
    add: "Ajouter une tâche",
    edit: "Modifier la tâche",
    delete: "Supprimer la tâche",
    deleteConfirm: "« {name} » sera retirée du tableau.",
    confirmDelete: "Supprimer",
    name: "Nom de la tâche",
    quadrant: "Quadrant",
    save: "Enregistrer",
    cancel: "Annuler",
    actions: "Actions de la tâche",
  },
};

/**
 * Built-in texts of the task boards in a locale (the page language by
 * default), with `overrides` applied
 */
export const quadrantTaskLabels = (
  locale?: string,
  overrides?: Partial<QuadrantTaskLabels>,
): QuadrantTaskLabels => ({
  ...localeLabels(QUADRANT_TASK_LABELS, locale),
  ...overrides,
});

/** Text of the delete confirmation of a task */
export const quadrantTaskDeleteText = (
  labels: QuadrantTaskLabels,
  point: QuadrantPoint | undefined,
): string => labels.deleteConfirm.replace("{name}", point?.label ?? "");

/** Draft of a new task in a quadrant (at its center, or at `at`) */
export const newQuadrantTaskDraft = (
  geometry: QuadrantTaskGeometry,
  quadrant: QuadrantCorner,
  at?: { x: number; y: number },
): QuadrantTaskDraft => {
  const p =
    at && quadrantOf(geometry, at.x, at.y) === quadrant
      ? at
      : quadrantCenter(geometry, quadrant);
  return { index: null, label: "", quadrant, x: p.x, y: p.y };
};

/** Draft editing the point at `index`, or `null` when there is none */
export const editQuadrantTaskDraft = (
  geometry: QuadrantTaskGeometry,
  points: readonly QuadrantPoint[],
  index: number,
): QuadrantTaskDraft | null => {
  const point = points[index];
  if (!point) return null;
  return {
    index,
    label: point.label ?? "",
    quadrant: quadrantOf(geometry, point.x, point.y),
    x: point.x,
    y: point.y,
  };
};

/** A draft can be saved: it has a name and its point still exists */
export const canSaveQuadrantTask = (
  draft: QuadrantTaskDraft | null,
  points: readonly QuadrantPoint[],
): draft is QuadrantTaskDraft =>
  !!draft &&
  draft.label.trim() !== "" &&
  (draft.index === null || !!points[draft.index]);

/**
 * The points with a draft saved: a new point appended or the edited one
 * replaced (its other fields kept). A point whose quadrant changed moves
 * to the center of the new quadrant. `null` when the draft cannot be
 * saved; `index` is the index of the saved point.
 */
export const applyQuadrantTaskDraft = (
  geometry: QuadrantTaskGeometry,
  points: readonly QuadrantPoint[],
  draft: QuadrantTaskDraft | null,
): { points: QuadrantPoint[]; index: number } | null => {
  if (!canSaveQuadrantTask(draft, points)) return null;
  const moved = quadrantOf(geometry, draft.x, draft.y) !== draft.quadrant;
  const at = moved
    ? quadrantCenter(geometry, draft.quadrant)
    : { x: draft.x, y: draft.y };
  const label = draft.label.trim();
  if (draft.index === null)
    return {
      points: [...points, { ...at, label }],
      index: points.length,
    };
  const index = draft.index;
  return {
    points: points.map((p, i) => (i === index ? { ...p, ...at, label } : p)),
    index,
  };
};

/** The points with the one at `index` moved to `at` (a drop, a keyboard move) */
export const moveQuadrantTask = (
  points: readonly QuadrantPoint[],
  index: number,
  at: { x: number; y: number },
): QuadrantPoint[] =>
  points.map((p, i) => (i === index ? { ...p, x: at.x, y: at.y } : p));

/** The points without the one at `index` */
export const removeQuadrantTask = (
  points: readonly QuadrantPoint[],
  index: number,
): QuadrantPoint[] => points.filter((_, i) => i !== index);

/**
 * Index of the selection after the point at `removed` is deleted: the
 * same point (shifted), or `null` when it was the removed one
 */
export const selectionAfterRemove = (
  selected: number | null,
  removed: number,
): number | null =>
  selected === null || selected === removed
    ? null
    : selected > removed
      ? selected - 1
      : selected;

/** Paths (24 x 24, stroked) of the icons of the task boards */
export const QUADRANT_TASK_ICONS = {
  add: "M12 5v14M5 12h14",
  edit: "m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15v5Z",
  delete: "M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 10v7M14 10v7",
} as const;

/** A box in pixels, relative to the task board */
export interface QuadrantTaskBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Where the inline panel of a task board goes */
export interface QuadrantTaskPanelPlacement {
  /** Top left corner of the panel, relative to the board */
  x: number;
  y: number;
  /** Side of the anchor the panel opens on */
  placement: "bottom" | "top";
  /** The anchor seen from the panel (its transform origin) */
  origin: { x: number; y: number };
}

/**
 * Place of the inline add / edit / delete panel of a task board: below its
 * anchor (the + button of a quadrant, a task, a clicked spot), above it when
 * there is no room below, centered on it and kept inside the board.
 */
export const placeQuadrantTaskPanel = (
  anchor: QuadrantTaskBox,
  panel: { width: number; height: number },
  board: { width: number; height: number },
  gap = 8,
): QuadrantTaskPanelPlacement => {
  const below = anchor.y + anchor.height + gap;
  const above = anchor.y - gap - panel.height;
  const roomBelow = board.height - below;
  const roomAbove = anchor.y - gap;
  const placement =
    roomBelow >= panel.height || (above < 0 && roomBelow >= roomAbove)
      ? "bottom"
      : "top";
  const clamp = (v: number, max: number) => Math.max(0, Math.min(v, max));
  const y = clamp(
    placement === "bottom" ? below : above,
    Math.max(0, board.height - panel.height),
  );
  const cx = anchor.x + anchor.width / 2;
  const x = clamp(cx - panel.width / 2, Math.max(0, board.width - panel.width));
  return {
    x,
    y,
    placement,
    origin: {
      x: Math.max(0, Math.min(panel.width, cx - x)),
      y: placement === "bottom" ? 0 : panel.height,
    },
  };
};

/** Color of a quadrant (its `color`, or the default of its corner) */
export const quadrantTaskColor = (
  quadrants: QuadrantConfig["quadrants"],
  corner: QuadrantCorner,
): string => quadrants?.[corner]?.color ?? DEFAULT_QUADRANT_COLORS[corner];

const BASE64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** UTF-8 bytes of a string as base64 (mini programs have no `btoa`) */
const base64 = (text: string) => {
  const bytes = encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const chunk =
      (bytes.charCodeAt(i) << 16) |
      ((bytes.charCodeAt(i + 1) || 0) << 8) |
      (bytes.charCodeAt(i + 2) || 0);
    out +=
      BASE64[chunk >> 18]! +
      BASE64[(chunk >> 12) & 63]! +
      (i + 1 < bytes.length ? BASE64[(chunk >> 6) & 63]! : "=") +
      (i + 2 < bytes.length ? BASE64[chunk & 63]! : "=");
  }
  return out;
};

/**
 * An icon of the task boards as a base64 SVG data URI stroked with `color`,
 * for hosts drawing it in an image (mini programs reject percent-encoded
 * SVG and an image does not inherit `currentColor`)
 */
export const quadrantTaskIconUri = (
  kind: keyof typeof QUADRANT_TASK_ICONS,
  color: string,
  size = 16,
): string =>
  `data:image/svg+xml;base64,${base64(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="${color.replace(/["<>&]/g, "")}" stroke-width="2" aria-hidden="true"><path d="${QUADRANT_TASK_ICONS[kind]}"/></svg>`,
  )}`;
