// Framework-neutral part of the keyboard and screen reader layer of the
// quadrant matrices: names and labels of the points, Shift + arrow moves to
// the neighbouring quadrants, arrow navigation between the points, focus
// (hover) events. Shared by every renderer (React, Vue, Web Components,
// Angular, React Native, mini-programs) so their behaviour cannot drift.
// No DOM here: the DOM layer is in `quadrant-layer.ts`.

import { formatValue } from "./format";
import {
  DEFAULT_QUADRANT_COLORS,
  quadrantCenter,
  quadrantGroups,
  quadrantLabels,
  quadrantOf,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantLabels,
  type QuadrantPoint,
} from "./presets";
import type { ChartHoverEvent } from "./types";

/** The quadrants in reading order (the order of the accessible lists) */
export const QUADRANT_CORNERS: readonly QuadrantCorner[] = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

/** `aria-keyshortcuts` of the points that can be moved */
export const QUADRANT_MOVE_SHORTCUTS =
  "Shift+ArrowUp Shift+ArrowDown Shift+ArrowLeft Shift+ArrowRight";

/** Quadrant reached from another with Shift + an arrow key */
const MOVES: Record<string, (corner: QuadrantCorner) => QuadrantCorner> = {
  ArrowUp: (c) => c.replace("bottom", "top") as QuadrantCorner,
  ArrowDown: (c) => c.replace("top", "bottom") as QuadrantCorner,
  ArrowLeft: (c) => c.replace("Right", "Left") as QuadrantCorner,
  ArrowRight: (c) => c.replace("Left", "Right") as QuadrantCorner,
};

/** The keys of a keyboard event the quadrant layer reads */
export interface QuadrantKeyInput {
  key: string;
  shiftKey?: boolean;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
}

/** Whether a key moves the focused point to another quadrant (Shift + an arrow) */
export const isQuadrantMoveKey = (event: QuadrantKeyInput): boolean =>
  !!event.shiftKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  event.key in MOVES;

/**
 * Quadrant a point of `corner` moves to with a key (Shift + an arrow);
 * `null` for the other keys and towards the outside of the matrix
 */
export const quadrantKeyTarget = (
  event: QuadrantKeyInput,
  corner: QuadrantCorner,
): QuadrantCorner | null => {
  if (!isQuadrantMoveKey(event)) return null;
  const target = MOVES[event.key]!(corner);
  return target === corner ? null : target;
};

/** The quadrants next to `corner` (vertical neighbour, then horizontal one) */
export const quadrantMoveTargets = (
  corner: QuadrantCorner,
): QuadrantCorner[] => [
  MOVES[corner.startsWith("top") ? "ArrowDown" : "ArrowUp"]!(corner),
  MOVES[corner.endsWith("Left") ? "ArrowRight" : "ArrowLeft"]!(corner),
];

/**
 * Position in `order` (the indices of the points in list order) reached
 * from the point `current` with a plain arrow / Home / End key; `null` for
 * the other keys. Down / Right: next point, Up / Left: previous one.
 */
export const quadrantNavTarget = (
  event: QuadrantKeyInput,
  order: readonly number[],
  current: number,
): number | null => {
  if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey)
    return null;
  const at = order.indexOf(current);
  if (at < 0 || !order.length) return null;
  switch (event.key) {
    case "ArrowDown":
    case "ArrowRight":
      return order[Math.min(order.length - 1, at + 1)]!;
    case "ArrowUp":
    case "ArrowLeft":
      return order[Math.max(0, at - 1)]!;
    case "Home":
      return order[0]!;
    case "End":
      return order[order.length - 1]!;
    default:
      return null;
  }
};

/** Name of a quadrant: its title, else the built-in name */
export const quadrantName = (
  corner: QuadrantCorner,
  config: Pick<QuadrantConfig, "quadrants">,
  texts: QuadrantLabels,
): string => config.quadrants?.[corner]?.label || texts[corner];

/** Name of a point: its label, else "Point {n}" */
export const quadrantPointName = (
  point: QuadrantPoint,
  index: number,
  texts: QuadrantLabels,
): string => point.label || texts.point.replace("{n}", String(index + 1));

/** Where a point moved to `corner` with the keyboard lands: its center */
export const quadrantMoveDrop = (
  config: Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  >,
  corner: QuadrantCorner,
): { x: number; y: number; quadrant: QuadrantCorner } => ({
  ...quadrantCenter(config, corner),
  quadrant: corner,
});

/** Announcement of a point moved to another quadrant */
export const quadrantMovedText = (
  texts: QuadrantLabels,
  pointName: string,
  quadrant: string,
): string =>
  texts.moved.replace("{point}", pointName).replace("{quadrant}", quadrant);

/** Name of the action moving a point to a quadrant ("Move to …") */
export const quadrantMoveLabel = (
  texts: QuadrantLabels,
  quadrant: string,
): string => texts.moveTo.replace("{quadrant}", quadrant);

/** Settings read by the accessible point layer */
export type QuadrantAccessibleConfig = Pick<
  QuadrantConfig,
  | "points"
  | "xDomain"
  | "yDomain"
  | "xSplit"
  | "ySplit"
  | "reverseX"
  | "quadrants"
  | "xLabel"
  | "yLabel"
  | "name"
>;

/** An action moving a point to another quadrant */
export interface QuadrantAccessibleMove {
  quadrant: QuadrantCorner;
  /** "Move to {quadrant}" */
  label: string;
}

/** A point as exposed to the assistive technologies */
export interface QuadrantAccessiblePoint {
  index: number;
  point: QuadrantPoint;
  quadrant: QuadrantCorner;
  /** Label of the point, else "Point {n}" */
  name: string;
  /** "{name}, {quadrant}" (the label of the DOM buttons) */
  label: string;
  /** "{name}, {quadrant}, {x axis}: {x}, {y axis}: {y}" (touch screen readers) */
  description: string;
  /** Moves to the neighbouring quadrants */
  moves: QuadrantAccessibleMove[];
}

/** The accessible points of a quadrant */
export interface QuadrantAccessibleGroup {
  quadrant: QuadrantCorner;
  name: string;
  points: QuadrantAccessiblePoint[];
}

/**
 * The points of a matrix as exposed to the assistive technologies, grouped
 * by quadrant in reading order (empty quadrants left out)
 */
export const quadrantAccessibleGroups = (
  config: QuadrantAccessibleConfig,
  locale?: string,
  texts: QuadrantLabels = quadrantLabels(locale),
): QuadrantAccessibleGroup[] => {
  const groups = quadrantGroups(config);
  const names = Object.fromEntries(
    QUADRANT_CORNERS.map((c) => [c, quadrantName(c, config, texts)]),
  ) as Record<QuadrantCorner, string>;
  const xAxis = config.xLabel || "x";
  const yAxis = config.yLabel || "y";
  return QUADRANT_CORNERS.filter((c) => groups[c].indices.length).map(
    (quadrant) => ({
      quadrant,
      name: names[quadrant],
      points: groups[quadrant].indices.map((index) => {
        const point = config.points[index]!;
        const name = quadrantPointName(point, index, texts);
        const label = `${name}, ${names[quadrant]}`;
        return {
          index,
          point,
          quadrant,
          name,
          label,
          description: `${label}, ${xAxis}: ${formatValue(point.x, locale)}, ${yAxis}: ${formatValue(point.y, locale)}`,
          moves: quadrantMoveTargets(quadrant).map((target) => ({
            quadrant: target,
            label: quadrantMoveLabel(texts, names[target]),
          })),
        };
      }),
    }),
  );
};

/**
 * Hover event of a point focused through the accessible layer (the payload
 * of the `hover` events of the renderers); `null` without such a point
 */
export const quadrantHoverEvent = (
  config: QuadrantAccessibleConfig,
  index: number | null,
  locale?: string,
): ChartHoverEvent | null => {
  const point = index === null ? undefined : config.points[index];
  if (index === null || !point) return null;
  const color =
    point.color ??
    config.quadrants?.[quadrantOf(config, point.x, point.y)]?.color ??
    DEFAULT_QUADRANT_COLORS[quadrantOf(config, point.x, point.y)];
  return {
    items: [
      {
        seriesIndex: 0,
        seriesId: "0",
        seriesName: config.name ?? "",
        index,
        x: point.x,
        y: point.y,
        color,
        ...(point.label !== undefined ? { label: point.label } : {}),
      },
    ],
    x: point.x,
    xLabel: formatValue(point.x, locale),
  };
};
