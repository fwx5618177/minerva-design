import {
  createTypeahead,
  getNextIndex,
  type Direction,
  type Orientation,
  type TypeaheadOptions,
} from "@minerva/core";
import { contains, focusElement, getEventTarget } from "./dom";

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
    return items.find((item) => contains(item, target)) ?? null;
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
