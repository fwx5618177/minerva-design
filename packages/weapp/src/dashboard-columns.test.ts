import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { dashboardColumns, dashboardCard, dashboardColumn } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(
  control: typeof dashboardColumns,
  tagName: string,
  props: Record<string, unknown>,
) {
  const id = simulate.load({
    tagName,
    template: control.template,
    ...control.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);

it("DashboardColumns renders a translated region around a scroll-x view with the sizes", async () => {
  const w = mount(dashboardColumns, "dashboard-columns-case", {
    columnWidth: 240,
    gap: "1rem",
    maxHeight: 400,
    fill: true,
  });
  await tick();
  expect(w.data).toMatchObject({
    boardLabel: "Board",
    boardStyle: "--dashboard-column-width:240px;--dashboard-gap:1rem",
    scrollStyle: "max-height:400px",
  });
  const board = w.querySelector(".mn-dashboard-columns")!;
  expect(board.dom!.className).toContain("mn-fill");
  expect(w.querySelector(".mn-dashboard-columns__track")).toBeTruthy();
  w.setData({ ariaLabel: "Sprint" });
  await tick();
  expect(w.data.boardLabel).toBe("Sprint");
});

it("dashboard column names its group by title and count and shows the accent", async () => {
  const w = mount(dashboardColumn, "dashboard-column-case", {
    title: "To do",
    count: 2,
    color: "success",
    description: "Not triaged",
  });
  await tick();
  expect(w.data).toMatchObject({
    shown: 2,
    scheme: "success",
    hasAccent: true,
    columnLabel: "To do, 2 items",
  });
  expect(w.querySelector(".mn-dashboard-column")!.dom!.className).toContain(
    "mn-color-success",
  );
  expect(w.querySelector(".mn-dashboard-column__indicator")).toBeTruthy();
  expect(w.querySelector(".mn-dashboard-column__count")!.dom!.textContent).toBe(
    "2",
  );
  expect(
    w.querySelector(".mn-dashboard-column__description")!.dom!.textContent,
  ).toBe("Not triaged");
  expect(w.querySelector(".mn-dashboard-column__list")).toBeTruthy();
  expect(w.querySelector(".mn-dashboard-column__empty")).toBeFalsy();
});

it("dashboard column shows the empty text with count 0, a custom color and no badge without count", async () => {
  const w = mount(dashboardColumn, "dashboard-column-empty-case", {
    title: "Done",
    count: 0,
    color: "#7c3aed",
  });
  await tick();
  expect(w.querySelector(".mn-dashboard-column__list")).toBeFalsy();
  expect(w.querySelector(".mn-dashboard-column__empty")!.dom!.textContent).toBe(
    "No items",
  );
  expect(w.data).toMatchObject({
    scheme: "",
    hasAccent: true,
    accentStyle: "--dashboard-column-color:#7c3aed",
    columnLabel: "Done, 0 items",
  });
  w.setData({ count: null, empty: "Nothing shipped" });
  await tick();
  expect(w.data.shown).toBe(-1);
  expect(w.data.columnLabel).toBe("Done");
  expect(w.data.emptyText).toBe("Nothing shipped");
  expect(w.querySelector(".mn-dashboard-column__count")).toBeFalsy();
});

// Drag and drop: a host page with a board, three keyed columns and cards.
// j-component has no layout, so every root reports a stubbed rect.
type Wrapper = (typeof mounted)[number];
const load = (c: typeof dashboardColumns) =>
  simulate.load({ template: c.template, ...c.definition });
function mountBoard(data: Record<string, unknown> = {}) {
  const host = simulate.load({
    tagName: "dashboard-drag-case",
    usingComponents: {
      "mn-board": load(dashboardColumns),
      "mn-column": load(dashboardColumn),
      "mn-card": load(dashboardCard),
    },
    data: { draggable: true, locked: false, ...data },
    template: `<mn-board id="board" draggable="{{draggable}}"><mn-column id="todo" title="To do" value="todo"><mn-card id="a" value="a" label="Write spec">A</mn-card><mn-card id="b" value="b" label="Review">B</mn-card></mn-column><mn-column id="doing" title="Doing" value="doing"><mn-card id="c" value="c" label="Ship">C</mn-card></mn-column><mn-column id="done" title="Done" value="done" drop-disabled="{{locked}}"></mn-column></mn-board>`,
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  const stub = (
    id: string,
    selector: string,
    left: number,
    top: number,
    width: number,
    height: number,
  ) => {
    const dom = w.querySelector(id)!.querySelector(selector)!.dom!;
    dom.getBoundingClientRect = () =>
      ({
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        x: left,
        y: top,
      }) as DOMRect;
  };
  stub("#board", ".mn-dashboard-columns", 0, 0, 660, 400);
  stub("#todo", ".mn-dashboard-column", 0, 0, 200, 400);
  stub("#doing", ".mn-dashboard-column", 220, 0, 200, 400);
  stub("#done", ".mn-dashboard-column", 440, 0, 200, 400);
  // b is above a on screen: the board orders cards by position
  stub("#a", ".mn-dashboard-card", 10, 90, 180, 40);
  stub("#b", ".mn-dashboard-card", 10, 40, 180, 40);
  stub("#c", ".mn-dashboard-card", 230, 40, 180, 40);
  const moves: unknown[] = [];
  w.querySelector("#board")!.addEventListener("cardmove", (e) =>
    moves.push(e.detail),
  );
  return { w, moves };
}
const settle = () => simulate.sleep(10);
const root = (w: Wrapper, id: string) =>
  w.querySelector(id)!.querySelector(".mn-dashboard-card")!;
async function pick(w: Wrapper, id: string, x: number, y: number) {
  root(w, id).dispatchEvent("longpress", { touches: [{ x, y }] });
  await settle();
}
async function moveTo(w: Wrapper, id: string, x: number, y: number) {
  root(w, id).dispatchEvent("touchmove", { touches: [{ x, y }] });
  await settle();
}
async function release(w: Wrapper, id: string, x: number, y: number) {
  root(w, id).dispatchEvent("touchend", { changedTouches: [{ x, y }] });
  await settle();
}

it("dashboard card follows the draggable flag of its board", async () => {
  const { w } = mountBoard({ draggable: false });
  await settle();
  const card = root(w, "#a");
  expect(card.dom!.className).not.toContain("mn-draggable");
  expect(w.querySelector("#a")!.data.draggable).toBe(false);
  w.setData({ draggable: true });
  await settle();
  expect(w.querySelector("#a")!.data.draggable).toBe(true);
  expect(root(w, "#a").dom!.className).toContain("mn-draggable");
});

it("DashboardColumns drags a card into another column with a copy and a drop indicator", async () => {
  const { w, moves } = mountBoard();
  await settle();
  await pick(w, "#a", 100, 110);
  const board = w.querySelector("#board")!;
  expect(board.data.dragging).toBe(true);
  expect(board.data.dragLabel).toBe("Write spec");
  expect(board.data.dropTarget).toEqual({ column: "todo", index: 1 });
  expect(root(w, "#a").dom!.className).toContain("mn-dragging");
  expect(
    board.querySelector(".mn-dashboard-columns")!.dom!.className,
  ).toContain("mn-dragging");
  await moveTo(w, "#a", 320, 100);
  expect(board.data.dropTarget).toEqual({ column: "doing", index: 1 });
  const ghost = board.querySelector(".mn-dashboard-columns__ghost")!;
  expect(ghost.dom!.textContent).toBe("Write spec");
  // the copy keeps the grab offset (90, 20) and the card width
  expect(board.data.ghostStyle).toBe("left:230px;top:80px;width:180px");
  expect(board.querySelector(".mn-dashboard-columns__drop-line")).toBeTruthy();
  expect(board.data.lineStyle).toBe("left:230px;top:83px;width:180px");
  expect(
    w.querySelector("#doing")!.querySelector(".mn-dashboard-column")!.dom!
      .className,
  ).toContain("mn-drop-target");
  expect(
    w.querySelector("#todo")!.querySelector(".mn-dashboard-column")!.dom!
      .className,
  ).not.toContain("mn-drop-target");
  expect(moves).toEqual([]);
  await release(w, "#a", 320, 100);
  expect(moves).toEqual([
    {
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 1,
      toColumn: "doing",
      toIndex: 1,
    },
  ]);
  expect(board.data).toMatchObject({
    dragging: false,
    ghostStyle: "",
    lineStyle: "",
    dropTarget: null,
  });
  expect(board.querySelector(".mn-dashboard-columns__ghost")).toBeFalsy();
  expect(w.querySelector("#doing")!.data.dropTarget).toBe(false);
  expect(w.querySelector("#a")!.data.dragging).toBe(false);
});

it("DashboardColumns reorders within a column and drops into an empty column", async () => {
  const { w, moves } = mountBoard();
  await settle();
  await pick(w, "#a", 100, 110);
  await moveTo(w, "#a", 100, 30);
  await release(w, "#a", 100, 30);
  await pick(w, "#c", 300, 60);
  await moveTo(w, "#c", 540, 200);
  expect(w.querySelector("#board")!.data.lineStyle).toBe(
    "left:448px;top:200px;width:184px",
  );
  await release(w, "#c", 540, 200);
  expect(moves).toEqual([
    {
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 1,
      toColumn: "todo",
      toIndex: 0,
    },
    {
      cardKey: "c",
      fromColumn: "doing",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 0,
    },
  ]);
});

it("DashboardColumns emits nothing for a drop in place, a cancel or a refused column", async () => {
  const { w, moves } = mountBoard({ locked: true });
  await settle();
  await pick(w, "#a", 100, 110);
  await moveTo(w, "#a", 300, 60);
  await moveTo(w, "#a", 110, 115);
  await release(w, "#a", 110, 115);
  await pick(w, "#a", 100, 110);
  await moveTo(w, "#a", 320, 100);
  root(w, "#a").dispatchEvent("touchcancel");
  await settle();
  expect(w.querySelector("#board")!.data.dragging).toBe(false);
  // done refuses drops (drop-disabled): no target, no line, no event
  await pick(w, "#b", 100, 60);
  await moveTo(w, "#b", 540, 200);
  const board = w.querySelector("#board")!;
  expect(board.data.dropTarget).toBeNull();
  expect(board.data.lineStyle).toBe("");
  expect(
    w.querySelector("#done")!.querySelector(".mn-dashboard-column")!.dom!
      .className,
  ).not.toContain("mn-drop-target");
  await release(w, "#b", 540, 200);
  expect(moves).toEqual([]);
});

it("DashboardColumns ignores long presses while not draggable and touches of other cards", async () => {
  const { w, moves } = mountBoard({ draggable: false });
  await settle();
  await pick(w, "#a", 100, 110);
  expect(w.querySelector("#board")!.data.dragging).toBe(false);
  await moveTo(w, "#a", 320, 100);
  await release(w, "#a", 320, 100);
  w.setData({ draggable: true });
  await settle();
  await pick(w, "#a", 100, 110);
  await moveTo(w, "#b", 320, 100);
  expect(w.querySelector("#board")!.data.dropTarget).toEqual({
    column: "todo",
    index: 1,
  });
  // turning dragging off cancels the drag
  w.setData({ draggable: false });
  await settle();
  expect(w.querySelector("#board")!.data.dragging).toBe(false);
  await release(w, "#a", 320, 100);
  expect(moves).toEqual([]);
});
