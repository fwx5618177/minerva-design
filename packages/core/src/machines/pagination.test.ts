import { describe, expect, it, vi } from "vitest";
import {
  canGoToPage,
  createPaginationMachine,
  getPaginationItems,
  getPaginationKeyTarget,
  getPaginationVisibleRange,
  getTotalPages,
} from "./pagination";

const keys = (items: { key: string }[]) => items.map((i) => i.key);

describe("pagination helpers", () => {
  it("counts pages (at least one)", () => {
    expect(getTotalPages(0, 10)).toBe(1);
    expect(getTotalPages(95, 10)).toBe(10);
    expect(getTotalPages(100, 0)).toBe(1);
  });

  it("visible range", () => {
    expect(getPaginationVisibleRange(2, 10, 95)).toEqual([11, 20]);
    expect(getPaginationVisibleRange(99, 10, 95)).toEqual([91, 95]);
    expect(getPaginationVisibleRange(0, 10, 95)).toEqual([1, 10]);
    expect(getPaginationVisibleRange(1, 10, 0)).toEqual([0, 0]);
  });

  it("canGoToPage / key targets", () => {
    expect(canGoToPage(1, 2, 3)).toBe(true);
    expect(canGoToPage(1, 1, 3)).toBe(false);
    expect(canGoToPage(1, 0, 3)).toBe(false);
    expect(canGoToPage(1, 4, 3)).toBe(false);
    expect(canGoToPage(1, 2, 3, true)).toBe(false);
    expect(getPaginationKeyTarget("ArrowLeft", 3, 9)).toBe(2);
    expect(getPaginationKeyTarget("ArrowRight", 3, 9)).toBe(4);
    expect(getPaginationKeyTarget("Home", 3, 9)).toBe(1);
    expect(getPaginationKeyTarget("End", 3, 9)).toBe(9);
    expect(getPaginationKeyTarget("a", 3, 9)).toBeNull();
  });

  it("window items with first / last pages and jumps", () => {
    expect(keys(getPaginationItems({ page: 1, totalPages: 3 }))).toEqual([
      "prev",
      "page-1",
      "page-2",
      "page-3",
      "next",
    ]);
    const middle = getPaginationItems({ page: 10, totalPages: 20 });
    expect(keys(middle)).toEqual([
      "prev",
      "page-1",
      "jump-prev",
      "page-8",
      "page-9",
      "page-10",
      "page-11",
      "page-12",
      "jump-next",
      "page-20",
      "next",
    ]);
    expect(middle.find((i) => i.kind === "jump-prev")?.page).toBe(5);
    expect(middle.find((i) => i.kind === "jump-next")?.page).toBe(15);
    expect(middle[0]).toEqual({ key: "prev", kind: "prev", page: 9 });
    // adjacent first / last page: no jump item
    expect(
      keys(getPaginationItems({ page: 4, totalPages: 7, hideEdges: true })),
    ).toEqual([
      "page-1",
      "page-2",
      "page-3",
      "page-4",
      "page-5",
      "page-6",
      "page-7",
    ]);
    expect(
      keys(getPaginationItems({ page: 4, totalPages: 8, hideEdges: true })),
    ).toEqual([
      "page-1",
      "page-2",
      "page-3",
      "page-4",
      "page-5",
      "page-6",
      "jump-next",
      "page-8",
    ]);
  });

  it("compact items with ellipses", () => {
    const items = getPaginationItems({
      page: 10,
      totalPages: 20,
      siblingCount: 1,
    });
    expect(keys(items)).toEqual([
      "prev",
      "page-1",
      "ellipsis-start",
      "page-9",
      "page-10",
      "page-11",
      "ellipsis-end",
      "page-20",
      "next",
    ]);
    expect(items[2]).toEqual({
      key: "ellipsis-start",
      kind: "ellipsis",
      page: 0,
    });
    expect(
      keys(
        getPaginationItems({
          page: 1,
          totalPages: 3,
          boundaryCount: 0,
          siblingCount: -1,
          hideEdges: true,
        }),
      ),
    ).toEqual(["page-1", "page-2", "page-3"]);
  });
});

describe("pagination machine", () => {
  it("navigates within range", () => {
    const onChange = vi.fn();
    const machine = createPaginationMachine({ total: 50, onChange });
    expect(machine.getState()).toEqual({ page: 1, pageSize: 10 });
    machine.send({ type: "PREV" });
    machine.send({ type: "NEXT" });
    machine.send({ type: "LAST" });
    machine.send({ type: "GOTO", page: 9 });
    machine.send({ type: "KEY", key: "ArrowLeft" });
    machine.send({ type: "KEY", key: "Tab" });
    machine.send({ type: "FIRST" });
    expect(onChange.mock.calls).toEqual([
      [2, 10],
      [5, 10],
      [4, 10],
      [1, 10],
    ]);
    machine.send({ type: "UNKNOWN" } as never);
  });

  it("page size changes go back to the first page", () => {
    const onChange = vi.fn();
    const machine = createPaginationMachine({
      total: 100,
      defaultPage: 3,
      defaultPageSize: 20,
      onChange,
    });
    machine.send({ type: "SET_PAGE_SIZE", pageSize: 50 });
    expect(machine.getState()).toEqual({ page: 1, pageSize: 50 });
    expect(onChange).toHaveBeenCalledWith(1, 50);
    machine.send({ type: "SET_PAGE_SIZE", pageSize: 50 });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("disabled ignores events", () => {
    const onChange = vi.fn();
    const machine = createPaginationMachine({
      total: 100,
      disabled: true,
      onChange,
    });
    machine.send({ type: "NEXT" });
    machine.send({ type: "SET_PAGE_SIZE", pageSize: 20 });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("controlled page and page size", () => {
    const onChange = vi.fn();
    const machine = createPaginationMachine({
      total: 100,
      page: 2,
      pageSize: 10,
      onChange,
    });
    machine.send({ type: "NEXT" });
    expect(onChange).toHaveBeenCalledWith(3, 10);
    expect(machine.getState().page).toBe(2);
    machine.setProps({ page: 3 });
    expect(machine.getState().page).toBe(3);
  });
});
