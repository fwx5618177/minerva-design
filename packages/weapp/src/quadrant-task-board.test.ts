import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { button, iconButton, quadrantChart, quadrantTaskBoard } from "./index";
import { quadrantTaskBoardComponents } from "./quadrant-task-board";
import type { NativeQuadrantPoint } from "./public-types";

type Wrapper = simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>;
const mounted: Wrapper[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));

const load = (c: {
  template: string;
  definition: WechatMiniprogram.IAnyObject;
}) => simulate.load({ template: c.template, ...c.definition });
const TASKS: NativeQuadrantPoint[] = [
  { x: 2, y: 8, label: "Write spec", color: "#7c3aed", size: 16 },
  { x: 8, y: 2, label: "Inbox zero" },
];

// A controlled host page: it stores every pointschange in `points`
function mountBoard(data: Record<string, unknown> = {}) {
  const board = simulate.load({
    template: quadrantTaskBoard.template,
    ...quadrantTaskBoard.definition,
    usingComponents: {
      "mn-quadrant-chart": load(quadrantChart),
      "mn-icon-button": load(iconButton),
      "mn-button": load(button),
    },
  });
  const changes: NativeQuadrantPoint[][] = [];
  const host = simulate.load({
    tagName: "quadrant-task-board-case",
    usingComponents: { "mn-board": board },
    data: { points: TASKS, ...data },
    template: `<mn-board id="board" points="{{points}}" bind:pointschange="onChange"/>`,
    methods: {
      onChange(
        this: WechatMiniprogram.Component.TrivialInstance,
        event: { detail: { points: NativeQuadrantPoint[] } },
      ) {
        changes.push(event.detail.points);
        this.setData({ points: event.detail.points });
      },
    },
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  const boardOf = () => w.querySelector("#board")!;
  return { w, board: boardOf, changes };
}
const tick = () => simulate.sleep(0);
type Node = NonNullable<ReturnType<Wrapper["querySelector"]>>;
const all = (node: Node, selector: string) => node.querySelectorAll(selector);
/** Taps the native element at the root of a Minerva child component */
async function tap(component: Node, selector = ".mn-button") {
  component.querySelector(selector)!.dispatchEvent("tap");
  await tick();
}

it("quadrant task board shows the headers with counts and a plus icon on the add buttons", async () => {
  const { board } = mountBoard();
  await tick();
  const headers = board().data.headers as {
    title: string;
    count: string;
    addLabel: string;
  }[];
  expect(headers.map((h) => h.title)).toEqual([
    "Top left quadrant",
    "Top right quadrant",
    "Bottom left quadrant",
    "Bottom right quadrant",
  ]);
  expect(all(board(), ".mn-quadrant-task-board__header")).toHaveLength(4);
  expect(board().data.headers[0].count).toBe("1");
  expect(headers[1].addLabel).toBe("Add task · Top right quadrant");

  // the add buttons show a plus image (no "+" glyph) and keep their label
  const add = all(board(), ".mn-quadrant-task-board__add")[1];
  expect(add.dom!.textContent).not.toContain("+");
  expect(add.data.label).toBe("Add task · Top right quadrant");
  expect(add.data.icon).toBeFalsy();
  const icon = add.dom!.querySelector(".mn-quadrant-task-board__add-icon");
  expect(icon).toBeTruthy();
  // the image sits inside the native button of the icon button
  expect(icon!.closest("wx-button")).toBeTruthy();
  expect(quadrantTaskBoard.template).toContain('src="{{addIcon}}"');
  const src = board().data.addIcon as string;
  expect(src).toMatch(/^data:image\/svg\+xml;base64,/);
  const svg = atob(src.split(",")[1]);
  expect(svg).toContain('d="M12 5v14M5 12h14"');
  expect(svg).toMatch(/stroke="#[0-9a-f]{3,8}"/i);
  // (the simulator drops the aria attributes: checked on the template)
  expect(quadrantTaskBoard.template).toContain(
    `role="{{panel.kind === 'delete' ? 'alertdialog' : 'dialog'}}"`,
  );
  expect(quadrantTaskBoard.template).toContain(
    'aria-checked="{{item.checked}}"',
  );
  expect(quadrantTaskBoard.template).toContain('focus="{{panelFocus}}"');
  expect(quadrantTaskBoard.template).not.toMatch(/mn-modal|mn-confirm-dialog/);
  expect(Object.keys(quadrantTaskBoardComponents)).toEqual([
    "mn-quadrant-chart",
    "mn-icon-button",
    "mn-button",
  ]);
});

it("quadrant task board adds a task in an inline panel below the headers, after save only", async () => {
  const { board, changes } = mountBoard();
  await tick();
  const panel = () => board().querySelector(".mn-quadrant-task-board__panel");
  expect(panel()).toBeFalsy();

  // Cancel leaves the data alone
  const adds = all(board(), ".mn-quadrant-task-board__add");
  expect(adds).toHaveLength(4);
  await tap(adds[1]);
  expect(board().data).toMatchObject({
    panel: { kind: "add", at: "headers", caret: "end", title: "Add task" },
    panelFocus: true,
    canSave: false,
  });
  // inline, right below the headers: no modal
  const opened = panel()!;
  expect(opened.dom!.className).toContain(
    "mn-quadrant-task-board__panel--caret-end",
  );
  expect(opened.dom!.getAttribute("data-quadrant-task-panel")).toBe("add");
  expect(
    board().querySelector(".mn-quadrant-task-board__headers")!.dom!
      .nextElementSibling,
  ).toBe(opened.dom);
  expect(board().querySelector(".mn-modal")).toBeFalsy();
  expect(
    opened.dom!.querySelector(".mn-quadrant-task-board__name"),
  ).toBeTruthy();
  expect(
    (board().data.chips as { checked: boolean }[]).map((c) => c.checked),
  ).toEqual([false, true, false, false]);
  expect(
    opened
      .dom!.querySelector(".mn-quadrant-task-board__chip--checked")!
      .getAttribute("data-corner"),
  ).toBe("topRight");
  board()
    .querySelector(".mn-quadrant-task-board__name")!
    .dispatchEvent("input", { detail: { value: "Plan sprint" } });
  await tick();
  expect(board().data.canSave).toBe(true);
  await tap(board().querySelector(".mn-quadrant-task-board__cancel")!);
  expect(board().data.panel).toBe(null);
  expect(panel()).toBeFalsy();
  expect(changes).toEqual([]);

  // Save appends the task in the picked quadrant and selects it
  await tap(all(board(), ".mn-quadrant-task-board__add")[0]);
  expect(board().data).toMatchObject({
    panel: { kind: "add", caret: "start" },
    draftLabel: "",
  });
  board()
    .querySelector(".mn-quadrant-task-board__name")!
    .dispatchEvent("input", { detail: { value: "  Plan sprint " } });
  await tick();
  all(board(), ".mn-quadrant-task-board__chip")[1].dispatchEvent("tap");
  await tick();
  expect(
    (board().data.chips as { corner: string; checked: boolean }[]).find(
      (chip) => chip.checked,
    )?.corner,
  ).toBe("topRight");
  expect(
    all(board(), ".mn-quadrant-task-board__chip")[1].dom!.className,
  ).toContain("mn-quadrant-task-board__chip--checked");
  await tap(board().querySelector(".mn-quadrant-task-board__save")!);
  expect(changes).toHaveLength(1);
  const [added] = changes[0].slice(2);
  expect(changes[0].slice(0, 2)).toEqual(TASKS);
  expect(added.label).toBe("Plan sprint");
  expect(added.x).toBeGreaterThan(5);
  expect(added.y).toBeGreaterThan(5);
  expect(board().data).toMatchObject({
    panel: null,
    active: { index: 2, label: "Plan sprint" },
  });
  expect(board().data.headers[1].count).toBe("1");
});

it("quadrant task board edits the selected task in a panel below its actions", async () => {
  const { board, changes } = mountBoard();
  await tick();
  expect(board().querySelector(".mn-quadrant-task-board__actions")).toBeFalsy();
  // the chart's accessible point button selects the task
  const chart = board().querySelector("#chart")!;
  chart.querySelectorAll(".mn-chart-quadrant-point")[0].dispatchEvent("tap");
  await tick();
  expect(board().data.active).toEqual({ index: 0, label: "Write spec" });
  expect(
    board().querySelector(".mn-quadrant-task-board__active")!.dom!.textContent,
  ).toBe("Write spec");

  await tap(board().querySelector(".mn-quadrant-task-board__edit")!);
  expect(board().data).toMatchObject({
    panel: { kind: "edit", at: "actions", caret: "edit", title: "Edit task" },
    draftLabel: "Write spec",
  });
  const panel = board().querySelector(".mn-quadrant-task-board__panel")!;
  expect(
    board().querySelector(".mn-quadrant-task-board__actions")!.dom!
      .nextElementSibling,
  ).toBe(panel.dom);
  expect(panel.dom!.className).toContain(
    "mn-quadrant-task-board__panel--caret-edit",
  );
  board()
    .querySelector(".mn-quadrant-task-board__name")!
    .dispatchEvent("input", { detail: { value: "Write the spec" } });
  await tick();
  await tap(board().querySelector(".mn-quadrant-task-board__save")!);
  expect(changes).toEqual([
    [{ ...TASKS[0], label: "Write the spec" }, TASKS[1]],
  ]);

  // Changing the quadrant moves the task into it
  await tap(board().querySelector(".mn-quadrant-task-board__edit")!);
  all(board(), ".mn-quadrant-task-board__chip")[3].dispatchEvent("tap");
  await tick();
  await tap(board().querySelector(".mn-quadrant-task-board__save")!);
  const moved = changes[1][0];
  expect(moved).toMatchObject({
    label: "Write the spec",
    color: "#7c3aed",
    size: 16,
  });
  expect(moved.x).toBeGreaterThan(5);
  expect(moved.y).toBeLessThan(5);
});

it("quadrant task board deletes the selected task after an inline danger confirmation", async () => {
  const { board, changes } = mountBoard();
  await tick();
  const chart = board().querySelector("#chart")!;
  chart.querySelectorAll(".mn-chart-quadrant-point")[1].dispatchEvent("tap");
  await tick();
  await tap(board().querySelector(".mn-quadrant-task-board__delete")!);
  expect(board().data).toMatchObject({
    panel: { kind: "delete", at: "actions", caret: "delete" },
    deleteText: "“Inbox zero” will be removed from the board.",
  });
  const panel = board().querySelector(".mn-quadrant-task-board__panel")!;
  expect(panel.dom!.getAttribute("data-quadrant-task-panel")).toBe("delete");
  expect(panel.dom!.className).toContain(
    "mn-quadrant-task-board__panel--caret-delete",
  );
  expect(panel.dom!.querySelector(".mn-quadrant-task-board__name")).toBeFalsy();
  // Cancel keeps the task
  await tap(board().querySelector(".mn-quadrant-task-board__cancel")!);
  expect(board().data.panel).toBe(null);
  expect(changes).toEqual([]);

  await tap(board().querySelector(".mn-quadrant-task-board__delete")!);
  const confirm = board().querySelector(".mn-quadrant-task-board__confirm")!;
  expect(confirm.dom!.textContent).toContain("Delete");
  await tap(confirm);
  expect(changes).toEqual([[TASKS[0]]]);
  expect(board().data).toMatchObject({ panel: null, active: null });
  expect(board().querySelector(".mn-quadrant-task-board__actions")).toBeFalsy();
});

it("quadrant task board opens one panel at a time", async () => {
  const { board } = mountBoard();
  await tick();
  await tap(all(board(), ".mn-quadrant-task-board__add")[2]);
  expect(board().data.panel).toMatchObject({ kind: "add", caret: "start" });
  // a tap on a task closes it, like a press outside a popover
  const chart = board().querySelector("#chart")!;
  chart.querySelectorAll(".mn-chart-quadrant-point")[1].dispatchEvent("tap");
  await tick();
  expect(board().data.panel).toBe(null);
  await tap(board().querySelector(".mn-quadrant-task-board__edit")!);
  await tap(board().querySelector(".mn-quadrant-task-board__delete")!);
  expect(board().data.panel).toMatchObject({ kind: "delete" });
  expect(all(board(), ".mn-quadrant-task-board__panel")).toHaveLength(1);
});

it("quadrant task board moves a task with the chart's move to actions", async () => {
  const { board, changes } = mountBoard();
  await tick();
  expect(board().data.scrollLocked).toBe(true);
  const chart = board().querySelector("#chart")!;
  const move = chart
    .querySelectorAll(".mn-chart-quadrant-move")
    .find(
      (node) =>
        node.dom!.getAttribute("data-index") === "0" &&
        node.dom!.getAttribute("data-quadrant") === "topRight",
    );
  expect(move).toBeTruthy();
  move!.dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
  const [task, other] = changes[0];
  expect(other).toEqual(TASKS[1]);
  expect(task).toMatchObject({
    label: "Write spec",
    color: "#7c3aed",
    size: 16,
  });
  expect(task.x).toBeGreaterThan(5);
  expect(task.y).toBeGreaterThan(5);
  expect(board().data.active).toEqual({ index: 0, label: "Write spec" });
});

it("quadrant task board applies the label overrides and the locale", async () => {
  const { board } = mountBoard();
  await tick();
  board().setData({ labels: { add: "New" }, locale: "fr" });
  await tick();
  expect(board().data.texts.add).toBe("New");
  expect(board().data.texts.edit).not.toBe("Edit task");
  expect(board().data.chartLocale).toBe("fr");
});
