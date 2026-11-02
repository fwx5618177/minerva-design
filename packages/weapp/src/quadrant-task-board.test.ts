import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import {
  button,
  confirmDialog,
  iconButton,
  input,
  modal,
  quadrantChart,
  quadrantTaskBoard,
  select,
} from "./index";
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
      "mn-modal": load(modal),
      "mn-input": load(input),
      "mn-select": load(select),
      "mn-confirm-dialog": load(confirmDialog),
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

it("quadrant task board shows the headers with counts and adds a task after save only", async () => {
  const { board, changes } = mountBoard();
  await tick();
  const headers = board().data.headers as { title: string; count: string }[];
  expect(headers.map((h) => h.title)).toEqual([
    "Top left quadrant",
    "Top right quadrant",
    "Bottom left quadrant",
    "Bottom right quadrant",
  ]);
  expect(all(board(), ".mn-quadrant-task-board__header")).toHaveLength(4);
  expect(board().data.headers[0].count).toBe("1");

  // Cancel leaves the data alone
  const adds = all(board(), ".mn-quadrant-task-board__add");
  expect(adds).toHaveLength(4);
  await tap(adds[1]);
  expect(board().data).toMatchObject({
    draftOpen: true,
    draftTitle: "Add task",
    draftQuadrant: "topRight",
    canSave: false,
  });
  board()
    .querySelector(".mn-quadrant-task-board__name")!
    .querySelector(".mn-input")!
    .dispatchEvent("input", { detail: { value: "Plan sprint" } });
  await tick();
  expect(board().data.canSave).toBe(true);
  await tap(board().querySelector(".mn-quadrant-task-board__cancel")!);
  expect(board().data.draftOpen).toBe(false);
  expect(changes).toEqual([]);

  // Save appends the task in the chosen quadrant and selects it
  await tap(all(board(), ".mn-quadrant-task-board__add")[1]);
  expect(board().data.draftLabel).toBe("");
  board()
    .querySelector(".mn-quadrant-task-board__name")!
    .querySelector(".mn-input")!
    .dispatchEvent("input", { detail: { value: "  Plan sprint " } });
  await tick();
  await tap(board().querySelector(".mn-quadrant-task-board__save")!);
  expect(changes).toHaveLength(1);
  const [added] = changes[0].slice(2);
  expect(changes[0].slice(0, 2)).toEqual(TASKS);
  expect(added.label).toBe("Plan sprint");
  expect(added.x).toBeGreaterThan(5);
  expect(added.y).toBeGreaterThan(5);
  expect(board().data).toMatchObject({
    draftOpen: false,
    active: { index: 2, label: "Plan sprint" },
  });
  expect(board().data.headers[1].count).toBe("1");
});

it("quadrant task board edits the selected task and keeps its other fields", async () => {
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
    draftOpen: true,
    draftTitle: "Edit task",
    draftLabel: "Write spec",
    draftQuadrant: "topLeft",
  });
  board()
    .querySelector(".mn-quadrant-task-board__name")!
    .querySelector(".mn-input")!
    .dispatchEvent("input", { detail: { value: "Write the spec" } });
  await tick();
  await tap(board().querySelector(".mn-quadrant-task-board__save")!);
  expect(changes).toEqual([
    [{ ...TASKS[0], label: "Write the spec" }, TASKS[1]],
  ]);

  // Changing the quadrant moves the task into it
  await tap(board().querySelector(".mn-quadrant-task-board__edit")!);
  const quadrant = board().querySelector(".mn-quadrant-task-board__quadrant")!;
  await tap(quadrant, ".mn-select-trigger");
  quadrant.querySelectorAll(".mn-option")[3].dispatchEvent("tap");
  await tick();
  expect(board().data.draftQuadrant).toBe("bottomRight");
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

it("quadrant task board deletes the selected task after the danger confirmation", async () => {
  const { board, changes } = mountBoard();
  await tick();
  const chart = board().querySelector("#chart")!;
  chart.querySelectorAll(".mn-chart-quadrant-point")[1].dispatchEvent("tap");
  await tick();
  await tap(board().querySelector(".mn-quadrant-task-board__delete")!);
  expect(board().data).toMatchObject({
    deleteOpen: true,
    deleteText: "“Inbox zero” will be removed from the board.",
  });
  const confirm = board().querySelector(".mn-quadrant-task-board__confirm")!;
  // Cancel keeps the task
  await tap(confirm, ".mn-confirm-cancel");
  expect(board().data.deleteOpen).toBe(false);
  expect(changes).toEqual([]);

  await tap(board().querySelector(".mn-quadrant-task-board__delete")!);
  await tap(
    board().querySelector(".mn-quadrant-task-board__confirm")!,
    ".mn-confirm-accept",
  );
  expect(changes).toEqual([[TASKS[0]]]);
  expect(board().data).toMatchObject({ deleteOpen: false, active: null });
  expect(board().querySelector(".mn-quadrant-task-board__actions")).toBeFalsy();
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
