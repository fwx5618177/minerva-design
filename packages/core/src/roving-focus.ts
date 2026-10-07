import { focusElement, getEventTarget } from "./dom";

export type Orientation = "horizontal" | "vertical" | "both";
export type Direction = "ltr" | "rtl";

export interface GetNextIndexOptions {
  /** Index of the current item (`-1` when none). */
  currentIndex: number;
  /** Number of items. */
  count: number;
  /** `KeyboardEvent.key`. */
  key: string;
  /** Which arrow keys move. @default "vertical" */
  orientation?: Orientation;
  /** Reading direction; `"rtl"` swaps ArrowLeft / ArrowRight. @default "ltr" */
  dir?: Direction;
  /** Wrap around at both ends. @default true */
  loop?: boolean;
  /** Disabled items are skipped. */
  isDisabled?: (index: number) => boolean;
  /** Enables PageUp / PageDown, moving by this many items. */
  pageSize?: number;
}

type Move = "next" | "prev" | "first" | "last" | "pageNext" | "pagePrev";

function keyToMove(
  key: string,
  orientation: Orientation,
  dir: Direction,
  pageSize: number | undefined,
): Move | null {
  const vertical = orientation !== "horizontal";
  const horizontal = orientation !== "vertical";
  switch (key) {
    case "ArrowDown":
      return vertical ? "next" : null;
    case "ArrowUp":
      return vertical ? "prev" : null;
    case "ArrowRight":
      return horizontal ? (dir === "rtl" ? "prev" : "next") : null;
    case "ArrowLeft":
      return horizontal ? (dir === "rtl" ? "next" : "prev") : null;
    case "Home":
      return "first";
    case "End":
      return "last";
    case "PageDown":
      return pageSize ? "pageNext" : null;
    case "PageUp":
      return pageSize ? "pagePrev" : null;
    default:
      return null;
  }
}

/** First enabled index scanning from `start` by `step`, within bounds. */
function scan(
  start: number,
  step: 1 | -1,
  count: number,
  isDisabled: (index: number) => boolean,
): number | null {
  for (let i = start; i >= 0 && i < count; i += step) {
    if (!isDisabled(i)) return i;
  }
  return null;
}

/**
 * Pure keyboard navigation for lists, menus, tabs, radio groups...
 *
 * Returns the index to move to for `key`, or `null` when the key is not a
 * navigation key for this orientation, or there is nowhere to go (edge
 * reached without `loop`, or every other item disabled).
 *
 * - ArrowUp / ArrowDown: vertical and both orientations.
 * - ArrowLeft / ArrowRight: horizontal and both (swapped in RTL).
 * - Home / End: first / last enabled item.
 * - PageUp / PageDown: only with `pageSize` (clamped, never wraps).
 */
export function getNextIndex({
  currentIndex,
  count,
  key,
  orientation = "vertical",
  dir = "ltr",
  loop = true,
  isDisabled = () => false,
  pageSize,
}: GetNextIndexOptions): number | null {
  if (count <= 0) return null;
  const move = keyToMove(key, orientation, dir, pageSize);
  if (!move) return null;

  switch (move) {
    case "first":
      return scan(0, 1, count, isDisabled);
    case "last":
      return scan(count - 1, -1, count, isDisabled);
    case "pageNext":
    case "pagePrev": {
      const step = move === "pageNext" ? 1 : -1;
      const from = currentIndex < 0 ? (step === 1 ? -1 : count) : currentIndex;
      const target = Math.min(
        count - 1,
        Math.max(0, from + step * (pageSize as number)),
      );
      const found =
        scan(target, step === 1 ? -1 : 1, count, isDisabled) ??
        scan(target, step, count, isDisabled);
      return found === currentIndex ? null : found;
    }
    default: {
      const step = move === "next" ? 1 : -1;
      if (currentIndex < 0 || currentIndex >= count) {
        return scan(step === 1 ? 0 : count - 1, step, count, isDisabled);
      }
      for (let n = 1; n < count; n++) {
        let i = currentIndex + step * n;
        if (i < 0 || i >= count) {
          if (!loop) return null;
          i = (i + count) % count;
        }
        if (!isDisabled(i)) return i;
      }
      return null;
    }
  }
}

export interface TypeaheadItem {
  /** Text matched against the typed characters. */
  text: string;
  /** Disabled items are never matched. */
  disabled?: boolean;
}

export interface TypeaheadOptions {
  /** Idle time (ms) after which the typed buffer resets. @default 500 */
  timeout?: number;
}

export interface Typeahead {
  /**
   * Feeds a key and returns the matching index, or `-1` (non-printable key,
   * or no match).
   */
  search(key: string, items: TypeaheadItem[], currentIndex: number): number;
  /** Clears the typed buffer. */
  reset(): void;
  /** Current typed buffer (lower case). */
  getBuffer(): string;
}

/**
 * Typeahead ("type to select") for menus, listboxes and selects.
 *
 * - Characters typed within `timeout` ms accumulate ("ap" -> "apple"),
 *   matched case-insensitively against the start of each item's text,
 *   starting from the current item.
 * - Repeating the same character ("a", "a", "a") cycles through the items
 *   starting with it, starting after the current item.
 * - Space only counts while a search is in progress (otherwise it is left
 *   for activation).
 */
export function createTypeahead(options: TypeaheadOptions = {}): Typeahead {
  const { timeout = 500 } = options;
  let buffer = "";
  let lastTime = 0;

  return {
    search(key, items, currentIndex) {
      if (key.length !== 1) return -1;
      const now = Date.now();
      if (now - lastTime > timeout) buffer = "";
      if (key === " " && buffer === "") return -1;
      lastTime = now;
      buffer += key.toLowerCase();

      const isRepeated =
        buffer.length > 1 && buffer.split("").every((c) => c === buffer[0]);
      const query = isRepeated ? buffer[0] : buffer;
      const count = items.length;
      // single character: start after the current item; otherwise include it
      const startOffset = query.length === 1 ? 1 : 0;
      const start = currentIndex < 0 ? 0 : currentIndex + startOffset;
      for (let n = 0; n < count; n++) {
        const i = (start + n) % count;
        const item = items[i];
        if (item.disabled) continue;
        if (query.length === 1 && i === currentIndex) continue;
        if (item.text.trim().toLowerCase().startsWith(query)) return i;
      }
      return -1;
    },
    reset() {
      buffer = "";
      lastTime = 0;
    },
    getBuffer() {
      return buffer;
    },
  };
}

export interface RovingFocusOptions {
  /** Selector for items inside the container. @default "[data-minerva-item]" */
  itemSelector?: string;
  /** Custom item getter (takes precedence over `itemSelector`). */
  getItems?: () => HTMLElement[];
  /** @default "vertical" */
  orientation?: Orientation;
  /** @default "ltr" */
  dir?: Direction;
  /** @default true */
  loop?: boolean;
  /** Enable typeahead (`true` or typeahead options). @default false */
  typeahead?: boolean | TypeaheadOptions;
  /** Item text for typeahead. @default `data-text-value` or textContent */
  getItemText?: (item: HTMLElement) => string;
  /**
   * Disabled items are skipped by keyboard navigation.
   * @default `disabled`, `aria-disabled="true"` or `data-disabled`
   */
  isItemDisabled?: (item: HTMLElement) => boolean;
  /** Called when the active item changes. */
  onActiveChange?: (item: HTMLElement, index: number) => void;
  /** Move DOM focus to the newly active item. @default true */
  focusOnMove?: boolean;
  /** Enables PageUp / PageDown with this step. */
  pageSize?: number;
}

export interface RovingFocus {
  /** Makes an item (element or index) the active one (tabindex 0). */
  setActive(item: HTMLElement | number, options?: { focus?: boolean }): void;
  /** The active item (`tabindex="0"`), if any. */
  getActive(): HTMLElement | null;
  /** Re-applies tabindex after items were added / removed. */
  refresh(): void;
  /** Removes the listeners (tabindex attributes are left as they are). */
  destroy(): void;
}

const defaultIsDisabled = (item: HTMLElement) =>
  item.hasAttribute("disabled") ||
  item.getAttribute("aria-disabled") === "true" ||
  item.hasAttribute("data-disabled");

const defaultGetText = (item: HTMLElement) =>
  item.dataset.textValue ?? item.textContent ?? "";

/**
 * Roving tabindex controller: exactly one item has `tabindex="0"`, the
 * others `-1`; arrow keys / Home / End (and optional typeahead) move the
 * active item. Clicking / focusing an item makes it active.
 */
export function createRovingFocus(
  container: HTMLElement,
  options: RovingFocusOptions = {},
): RovingFocus {
  const {
    itemSelector = "[data-minerva-item]",
    orientation = "vertical",
    dir = "ltr",
    loop = true,
    getItemText = defaultGetText,
    isItemDisabled = defaultIsDisabled,
    onActiveChange,
    focusOnMove = true,
    pageSize,
  } = options;
  const typeahead = options.typeahead
    ? createTypeahead(options.typeahead === true ? {} : options.typeahead)
    : null;

  const getItems = (): HTMLElement[] =>
    options.getItems
      ? options.getItems()
      : Array.from(container.querySelectorAll<HTMLElement>(itemSelector));

  let active: HTMLElement | null = null;

  const sync = (items = getItems()) => {
    if (!active || !items.includes(active)) {
      active =
        items.find((item) => item.getAttribute("tabindex") === "0") ??
        items.find((item) => !isItemDisabled(item)) ??
        null;
    }
    for (const item of items) {
      item.setAttribute("tabindex", item === active ? "0" : "-1");
    }
  };

  const activate = (
    item: HTMLElement,
    items: HTMLElement[],
    focus: boolean,
  ) => {
    const changed = item !== active;
    active = item;
    sync(items);
    if (focus) focusElement(item);
    if (changed) onActiveChange?.(item, items.indexOf(item));
  };

  const itemFromEvent = (event: Event, items: HTMLElement[]) => {
    const target = getEventTarget(event);
    if (!(target instanceof Node)) return null;
    return (
      items.find((item) => item === target || item.contains(target)) ?? null
    );
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    const items = getItems();
    if (items.length === 0) return;
    const current = itemFromEvent(event, items) ?? active;
    const currentIndex = current ? items.indexOf(current) : -1;
    const isDisabled = (i: number) => isItemDisabled(items[i]);

    if (!event.altKey && !event.ctrlKey && !event.metaKey) {
      const next = getNextIndex({
        currentIndex,
        count: items.length,
        key: event.key,
        orientation,
        dir,
        loop,
        isDisabled,
        pageSize,
      });
      if (next !== null) {
        event.preventDefault();
        typeahead?.reset();
        activate(items[next], items, focusOnMove);
        return;
      }
      if (typeahead) {
        const index = typeahead.search(
          event.key,
          items.map((item) => ({
            text: getItemText(item),
            disabled: isItemDisabled(item),
          })),
          currentIndex,
        );
        if (index !== -1) {
          event.preventDefault();
          activate(items[index], items, focusOnMove);
        }
      }
    }
  };

  const onFocusIn = (event: FocusEvent) => {
    const items = getItems();
    const item = itemFromEvent(event, items);
    if (item && item !== active) activate(item, items, false);
  };

  container.addEventListener("keydown", onKeyDown);
  container.addEventListener("focusin", onFocusIn);
  sync();

  return {
    setActive(item, opts = {}) {
      const items = getItems();
      const el = typeof item === "number" ? items[item] : item;
      if (!el || !items.includes(el)) return;
      activate(el, items, opts.focus ?? focusOnMove);
    },
    getActive() {
      return active;
    },
    refresh() {
      sync();
    },
    destroy() {
      container.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("focusin", onFocusIn);
      typeahead?.reset();
    },
  };
}
