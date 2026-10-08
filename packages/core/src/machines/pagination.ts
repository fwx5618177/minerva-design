// Pagination: current page and page size (each controlled or not), the page
// count and the page items (numbers, jump / ellipsis items) of the React
// Pagination and <minerva-pagination>.
import {
  getCompactPageItems,
  getPageRange,
  PAGINATION_JUMP_SIZE,
} from "../pagination";
import { createMachine, type Machine } from "./store";

export interface PaginationMachineProps {
  /** Controlled current page, 1-based (`undefined`: uncontrolled). */
  page?: number;
  /** @default 1 */
  defaultPage?: number;
  /** Controlled page size (`undefined`: uncontrolled). */
  pageSize?: number;
  /** @default 10 */
  defaultPageSize?: number;
  /** Total number of items. @default 0 */
  total?: number;
  /** Ignores every event. @default false */
  disabled?: boolean;
  /** Called with the requested page and page size (controlled or not). */
  onChange?: (page: number, pageSize: number) => void;
}

export interface PaginationMachineState {
  page: number;
  pageSize: number;
}

export type PaginationMachineEvent =
  | { type: "GOTO"; page: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "FIRST" }
  | { type: "LAST" }
  /**
   * A key pressed on a page item: ArrowLeft / ArrowRight (logical, i.e.
   * already swapped in RTL) move by one page, Home / End to the first /
   * last page.
   */
  | { type: "KEY"; key: string }
  /** Changes the page size and goes back to the first page. */
  | { type: "SET_PAGE_SIZE"; pageSize: number };

export type PaginationMachine = Machine<
  PaginationMachineState,
  PaginationMachineEvent,
  PaginationMachineProps
>;

/** Number of pages, at least 1 (there is always a possibly empty page). */
export const getTotalPages = (total: number, pageSize: number): number =>
  Math.max(1, pageSize > 0 ? Math.ceil(total / pageSize) : 0);

/**
 * `[first, last]` item numbers shown on `page` (1-based, the page clamped to
 * the valid range); `[0, 0]` without items.
 */
export function getPaginationVisibleRange(
  page: number,
  pageSize: number,
  total: number,
): [number, number] {
  if (total <= 0) return [0, 0];
  const shown = Math.min(Math.max(1, page), getTotalPages(total, pageSize));
  return [(shown - 1) * pageSize + 1, Math.min(shown * pageSize, total)];
}

/** Whether moving to `target` is a change within range. */
export const canGoToPage = (
  page: number,
  target: number,
  totalPages: number,
  disabled = false,
): boolean =>
  !disabled && target !== page && target >= 1 && target <= totalPages;

/**
 * Page a navigation key leads to (ArrowLeft / ArrowRight: previous / next,
 * Home / End: first / last), or `null` for other keys. Not clamped.
 */
export function getPaginationKeyTarget(
  key: string,
  page: number,
  totalPages: number,
): number | null {
  switch (key) {
    case "ArrowLeft":
      return page - 1;
    case "ArrowRight":
      return page + 1;
    case "Home":
      return 1;
    case "End":
      return totalPages;
    default:
      return null;
  }
}

export type PaginationItemKind =
  "page" | "prev" | "next" | "jump-prev" | "jump-next" | "ellipsis";

/** An entry of the page list. */
export interface PaginationItem {
  /** Stable key (a focused button survives page changes). */
  key: string;
  kind: PaginationItemKind;
  /** Page the item leads to (0 for ellipses). */
  page: number;
}

export interface PaginationItemsOptions {
  page: number;
  totalPages: number;
  /**
   * Pages on each side of the current one: switches to the compact list
   * (boundary pages + "…" gaps). Compact when this or `boundaryCount` is set.
   */
  siblingCount?: number;
  /** Pages kept at both ends of the compact list. */
  boundaryCount?: number;
  /** Leaves out the prev / next items. @default false */
  hideEdges?: boolean;
}

/**
 * Items of the page list: prev, the pages (a window of 5 around the current
 * page with first / last pages and jump items, or the compact list with
 * ellipses), next.
 */
export function getPaginationItems({
  page,
  totalPages,
  siblingCount,
  boundaryCount,
  hideEdges = false,
}: PaginationItemsOptions): PaginationItem[] {
  const edge = (kind: "prev" | "next"): PaginationItem[] =>
    hideEdges
      ? []
      : [{ key: kind, kind, page: kind === "prev" ? page - 1 : page + 1 }];
  const pageItem = (p: number): PaginationItem => ({
    key: `page-${p}`,
    kind: "page",
    page: p,
  });

  if (siblingCount !== undefined || boundaryCount !== undefined) {
    const compact = getCompactPageItems(
      totalPages,
      page,
      Math.max(0, siblingCount ?? 1),
      Math.max(1, boundaryCount ?? 1),
    );
    return [
      ...edge("prev"),
      ...compact.map((item) =>
        typeof item === "number"
          ? pageItem(item)
          : { key: item, kind: "ellipsis" as const, page: 0 },
      ),
      ...edge("next"),
    ];
  }

  const range = getPageRange(page, totalPages);
  const items: PaginationItem[] = [...edge("prev")];
  if (range.length > 0 && range[0] > 1) {
    items.push(pageItem(1));
    if (range[0] > 2) {
      items.push({
        key: "jump-prev",
        kind: "jump-prev",
        page: Math.max(1, page - PAGINATION_JUMP_SIZE),
      });
    }
  }
  for (const p of range) items.push(pageItem(p));
  const last = range[range.length - 1];
  if (range.length > 0 && last < totalPages) {
    if (last < totalPages - 1) {
      items.push({
        key: "jump-next",
        kind: "jump-next",
        page: Math.min(totalPages, page + PAGINATION_JUMP_SIZE),
      });
    }
    items.push(pageItem(totalPages));
  }
  items.push(...edge("next"));
  return items;
}

/** Creates a pagination machine. */
export function createPaginationMachine(
  props: PaginationMachineProps = {},
): PaginationMachine {
  return createMachine<
    PaginationMachineState,
    PaginationMachineEvent,
    PaginationMachineProps
  >(
    {
      controlled: ["page", "pageSize"],
      initial: (p) => ({
        page: p.page ?? p.defaultPage ?? 1,
        pageSize: p.pageSize ?? p.defaultPageSize ?? 10,
      }),
      reduce(state, event, p) {
        if (p.disabled) return state;
        const totalPages = getTotalPages(p.total ?? 0, state.pageSize);
        const goTo = (target: number | null) =>
          target !== null && canGoToPage(state.page, target, totalPages)
            ? { ...state, page: target }
            : state;
        switch (event.type) {
          case "GOTO":
            return goTo(event.page);
          case "NEXT":
            return goTo(state.page + 1);
          case "PREV":
            return goTo(state.page - 1);
          case "FIRST":
            return goTo(1);
          case "LAST":
            return goTo(totalPages);
          case "KEY":
            return goTo(
              getPaginationKeyTarget(event.key, state.page, totalPages),
            );
          case "SET_PAGE_SIZE":
            return { page: 1, pageSize: event.pageSize };
          default:
            return state;
        }
      },
      changed(requested, prev, p) {
        if (
          requested.page !== prev.page ||
          requested.pageSize !== prev.pageSize
        ) {
          p.onChange?.(requested.page, requested.pageSize);
        }
      },
    },
    props,
  );
}
