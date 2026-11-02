import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { kanbanBoard, kanbanColumn } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(
  control: typeof kanbanBoard,
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

it("kanban board renders a translated region around a scroll-x view with the sizes", async () => {
  const w = mount(kanbanBoard, "kanban-board-case", {
    columnWidth: 240,
    gap: "1rem",
    maxHeight: 400,
    fill: true,
  });
  await tick();
  expect(w.data).toMatchObject({
    boardLabel: "Board",
    boardStyle: "--kanban-column-width:240px;--kanban-gap:1rem",
    scrollStyle: "max-height:400px",
  });
  const board = w.querySelector(".mn-kanban-board")!;
  expect(board.dom!.className).toContain("mn-fill");
  expect(w.querySelector(".mn-kanban-board__track")).toBeTruthy();
  w.setData({ ariaLabel: "Sprint" });
  await tick();
  expect(w.data.boardLabel).toBe("Sprint");
});

it("kanban column names its group by title and count and shows the accent", async () => {
  const w = mount(kanbanColumn, "kanban-column-case", {
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
  expect(w.querySelector(".mn-kanban-column")!.dom!.className).toContain(
    "mn-color-success",
  );
  expect(w.querySelector(".mn-kanban-column__indicator")).toBeTruthy();
  expect(w.querySelector(".mn-kanban-column__count")!.dom!.textContent).toBe(
    "2",
  );
  expect(
    w.querySelector(".mn-kanban-column__description")!.dom!.textContent,
  ).toBe("Not triaged");
  expect(w.querySelector(".mn-kanban-column__list")).toBeTruthy();
  expect(w.querySelector(".mn-kanban-column__empty")).toBeFalsy();
});

it("kanban column shows the empty text with count 0, a custom color and no badge without count", async () => {
  const w = mount(kanbanColumn, "kanban-column-empty-case", {
    title: "Done",
    count: 0,
    color: "#7c3aed",
  });
  await tick();
  expect(w.querySelector(".mn-kanban-column__list")).toBeFalsy();
  expect(w.querySelector(".mn-kanban-column__empty")!.dom!.textContent).toBe(
    "No items",
  );
  expect(w.data).toMatchObject({
    scheme: "",
    hasAccent: true,
    accentStyle: "--kanban-column-color:#7c3aed",
    columnLabel: "Done, 0 items",
  });
  w.setData({ count: null, empty: "Nothing shipped" });
  await tick();
  expect(w.data.shown).toBe(-1);
  expect(w.data.columnLabel).toBe("Done");
  expect(w.data.emptyText).toBe("Nothing shipped");
  expect(w.querySelector(".mn-kanban-column__count")).toBeFalsy();
});
