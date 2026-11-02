// DOM part of the keyboard and screen reader layer of the quadrant matrices
// (Vue, Web Components, Angular; React renders the same DOM with JSX): a
// visually hidden list of point buttons per quadrant, a description of the
// Shift + arrow moves and a live region announcing them. The behaviour comes
// from `quadrant-keyboard.ts`.

import { quadrantLabels } from "./presets";
import {
  QUADRANT_MOVE_SHORTCUTS,
  isQuadrantMoveKey,
  quadrantAccessibleGroups,
  quadrantHoverEvent,
  quadrantKeyTarget,
  quadrantMoveDrop,
  quadrantMovedText,
  quadrantName,
  quadrantNavTarget,
  type QuadrantAccessibleConfig,
} from "./quadrant-keyboard";
import type { QuadrantCorner } from "./presets";
import type { ChartHoverEvent } from "./types";

/** Where a point moved with the keyboard lands */
export interface QuadrantPointMove {
  x: number;
  y: number;
  quadrant: QuadrantCorner;
}

/** Settings of the accessible point layer of a quadrant matrix */
export interface QuadrantPointLayerOptions {
  /** The points and the geometry of the matrix */
  config: QuadrantAccessibleConfig;
  /** Language of the built-in texts and of the values */
  locale?: string;
  /** Shift + arrows move the focused point (`onMove`) */
  movable?: boolean;
  /** Indices of the selected points (`aria-current`) */
  selected?: readonly number[];
  /** A point button got (index) or lost (`null`) the focus */
  onFocusChange?: (index: number | null, hover: ChartHoverEvent | null) => void;
  /** A point button was activated (click, Enter, Space) */
  onClick?: (index: number) => void;
  /** A point was moved to another quadrant with Shift + an arrow */
  onMove?: (index: number, target: QuadrantPointMove) => void;
}

/** The accessible point layer of a quadrant matrix */
export interface QuadrantPointLayer {
  /** Root of the layer (`.minerva-chart-quadrant-points`) */
  readonly element: HTMLElement;
  /** Index of the focused point button, or `null` */
  readonly focusedIndex: number | null;
  /** Applies new settings (the focused point keeps the focus) */
  update(options: QuadrantPointLayerOptions): void;
  /** Reads a text in the live region */
  announce(text: string): void;
  destroy(): void;
}

const VISUALLY_HIDDEN =
  "position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;" +
  "overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap";

let hints = 0;

/**
 * Mounts the accessible point layer of a quadrant matrix in `host`: one
 * visually hidden list of buttons per quadrant; arrows move between the
 * points, Shift + arrows move the focused point to the neighbouring
 * quadrant (when `movable`), announced in a live region
 */
export const createQuadrantPointLayer = (
  host: HTMLElement,
  initial: QuadrantPointLayerOptions,
): QuadrantPointLayer => {
  let options = initial;
  let focused: number | null = null;
  let rebuilding = false;
  let signature = "";
  let order: number[] = [];
  const corners = new Map<number, QuadrantCorner>();
  const names = new Map<number, string>();
  const hintId = `minerva-quadrant-hint-${++hints}`;

  const root = document.createElement("div");
  root.className = "minerva-chart-quadrant-points";
  root.style.cssText = "position:absolute;inset:0;pointer-events:none";
  const lists = document.createElement("div");
  lists.style.display = "contents";
  const hint = document.createElement("span");
  hint.id = hintId;
  hint.style.cssText = VISUALLY_HIDDEN;
  const live = document.createElement("div");
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");
  live.style.cssText = VISUALLY_HIDDEN;
  root.append(lists, hint, live);
  host.appendChild(root);

  const texts = () => quadrantLabels(options.locale);
  const buttonOf = (index: number) =>
    lists.querySelector<HTMLButtonElement>(
      `button[data-point-index="${index}"]`,
    );
  const indexOf = (target: EventTarget | null) => {
    const button =
      target instanceof Element
        ? target.closest<HTMLButtonElement>("button[data-point-index]")
        : null;
    return button && lists.contains(button)
      ? Number(button.dataset.pointIndex)
      : null;
  };
  const setFocused = (index: number | null) => {
    if (index === focused) return;
    focused = index;
    options.onFocusChange?.(
      index,
      quadrantHoverEvent(options.config, index, options.locale),
    );
  };

  const render = () => {
    const groups = quadrantAccessibleGroups(
      options.config,
      options.locale,
      texts(),
    );
    const movable = !!options.movable;
    const selected = new Set(options.selected ?? []);
    const next = JSON.stringify([
      movable,
      groups.map((g) => [
        g.quadrant,
        g.name,
        g.points.map((p) => [p.index, p.label, selected.has(p.index)]),
      ]),
    ]);
    hint.textContent = movable ? texts().moveHint : "";
    hint.hidden = !movable;
    if (next === signature) return;
    signature = next;
    order = [];
    corners.clear();
    names.clear();
    // in a shadow root, the document only sees its host as active
    const scope = root.getRootNode() as Partial<DocumentOrShadowRoot>;
    const keep = indexOf(scope.activeElement ?? null);
    rebuilding = true;
    lists.replaceChildren(
      ...groups.map((group) => {
        const list = document.createElement("div");
        list.setAttribute("role", "list");
        list.dataset.quadrant = group.quadrant;
        list.setAttribute("aria-label", group.name);
        list.style.cssText = VISUALLY_HIDDEN;
        for (const p of group.points) {
          order.push(p.index);
          corners.set(p.index, p.quadrant);
          names.set(p.index, p.name);
          const item = document.createElement("div");
          item.setAttribute("role", "listitem");
          const button = document.createElement("button");
          button.type = "button";
          button.dataset.pointIndex = String(p.index);
          button.setAttribute("aria-label", p.label);
          if (selected.has(p.index))
            button.setAttribute("aria-current", "true");
          if (movable) {
            button.setAttribute("aria-keyshortcuts", QUADRANT_MOVE_SHORTCUTS);
            button.setAttribute("aria-describedby", hintId);
          }
          button.textContent = p.name;
          item.appendChild(button);
          list.appendChild(item);
        }
        return list;
      }),
    );
    // the focused point keeps the focus, in the list of its new quadrant
    if (keep !== null) buttonOf(keep)?.focus();
    rebuilding = false;
    if (keep !== null && !buttonOf(keep)) setFocused(null);
  };

  const onFocusIn = (event: FocusEvent) => {
    const index = indexOf(event.target);
    if (index !== null) setFocused(index);
  };
  const onFocusOut = (event: FocusEvent) => {
    if (rebuilding || indexOf(event.relatedTarget) !== null) return;
    setFocused(null);
  };
  const onClick = (event: MouseEvent) => {
    const index = indexOf(event.target);
    if (index !== null) options.onClick?.(index);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const index = indexOf(event.target);
    if (index === null) return;
    const corner = corners.get(index)!;
    if (options.movable && isQuadrantMoveKey(event)) {
      event.preventDefault();
      const target = quadrantKeyTarget(event, corner);
      if (!target) return;
      options.onMove?.(index, quadrantMoveDrop(options.config, target));
      layer.announce(
        quadrantMovedText(
          texts(),
          names.get(index)!,
          quadrantName(target, options.config, texts()),
        ),
      );
      return;
    }
    const next = quadrantNavTarget(event, order, index);
    if (next === null) return;
    event.preventDefault();
    buttonOf(next)?.focus();
  };
  root.addEventListener("focusin", onFocusIn);
  root.addEventListener("focusout", onFocusOut);
  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKeyDown);

  const layer: QuadrantPointLayer = {
    element: root,
    get focusedIndex() {
      return focused;
    },
    update(next) {
      options = next;
      render();
    },
    announce(text) {
      live.textContent = text;
    },
    destroy() {
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKeyDown);
      root.remove();
      // a removed focused button does not report its blur
      setFocused(null);
    },
  };
  render();
  return layer;
};
