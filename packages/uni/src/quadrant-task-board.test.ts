import { mount, flushPromises, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuadrantPoint } from "@minerva/charts/canvas";
import QuadrantTaskBoard from "./QuadrantTaskBoard.vue";

const TASKS: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Write report", color: "#e11d48", size: 9 },
  { x: 7, y: 3, label: "Reply mail" },
];

// the chart draws on a 2D canvas: a context double ignoring the calls
const previousUni = uni;
beforeEach(() => {
  const ctx = new Proxy(
    {},
    {
      get: (_target, key) =>
        key === "measureText"
          ? (text: string) => ({ width: text.length * 6 })
          : key === "createLinearGradient"
            ? () => ({ addColorStop() {} })
            : () => {},
      set: () => true,
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (() => ctx) as unknown as HTMLCanvasElement["getContext"],
  );
  vi.stubGlobal("uni", {
    ...previousUni,
    getWindowInfo: () => ({ pixelRatio: 2 }),
    onWindowResize: vi.fn(),
    offWindowResize: vi.fn(),
  });
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.stubGlobal("uni", previousUni);
});

type Board = VueWrapper<InstanceType<typeof QuadrantTaskBoard>>;

/** A controlled board: `update:points` is written back to `points` */
const mountBoard = async (props: Record<string, unknown> = {}) => {
  const w: Board = mount(QuadrantTaskBoard, {
    props: {
      locale: "en",
      points: TASKS,
      "onUpdate:points": (points: QuadrantPoint[]) => w.setProps({ points }),
      ...props,
    },
  });
  await flushPromises();
  return w;
};

const lastPoints = (w: Board) => {
  const changes = w.emitted("pointsChange") ?? [];
  expect(w.emitted("update:points")).toEqual(changes);
  return changes.at(-1)?.[0] as QuadrantPoint[] | undefined;
};

const pointButton = (w: Board, label: string) => {
  const button = w
    .findAll('.mn-chart-quadrant-points [aria-role="button"]')
    .find((b) => b.attributes("aria-label")?.startsWith(label));
  if (!button) throw new Error(`no point button ${label}`);
  return button;
};

const dialog = (w: Board) => w.find('[role="dialog"]');
const toolbar = (w: Board) => w.find('[role="toolbar"]');

const typeName = (w: Board, value: string) =>
  dialog(w)
    .get('input[aria-label="Task name"]')
    .trigger("input", { detail: { value } });

describe("uni QuadrantTaskBoard", () => {
  it("renders a header per quadrant with its count and add button", async () => {
    const w = await mountBoard({
      quadrants: { topLeft: { label: "Do first", badge: "Q1" } },
    });
    const headers = w.findAll(".mn-quadrant-task-board__header");
    expect(headers.map((h) => h.attributes("data-corner"))).toEqual([
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
    ]);
    expect(headers[0]!.text()).toBe("Q1Do first1+");
    expect(headers[1]!.text()).toBe("Top right quadrant0+");
    expect(headers[0]!.get("button").attributes("aria-label")).toBe(
      "Add task · Do first",
    );
    expect(toolbar(w).exists()).toBe(false);
    await w.setProps({ showCounts: false });
    expect(w.find(".mn-quadrant-task-board__count").exists()).toBe(false);
    w.unmount();
  });

  it("adds a task: cancel leaves the data, save appends it", async () => {
    const w = await mountBoard();
    const add = () =>
      w
        .get('button[aria-label="Add task · Top right quadrant"]')
        .trigger("click");
    await add();
    expect(dialog(w).text()).toContain("Add task");
    expect(
      dialog(w)
        .get('[role="radio"][aria-label="Top right quadrant"]')
        .attributes("aria-checked"),
    ).toBe("true");
    await typeName(w, "Plan sprint");
    await dialog(w).get('[data-action="cancel"]').trigger("click");
    expect(dialog(w).exists()).toBe(false);
    expect(w.emitted("pointsChange")).toBeUndefined();

    await add();
    const save = () => dialog(w).get('[data-action="save"]');
    // empty name: save is disabled
    expect(save().attributes("disabled")).toBeDefined();
    await save().trigger("click");
    expect(w.emitted("pointsChange")).toBeUndefined();
    await typeName(w, "  Plan sprint ");
    await save().trigger("click");
    expect(lastPoints(w)).toEqual([
      ...TASKS,
      { x: 7.5, y: 7.5, label: "Plan sprint" },
    ]);
    expect(dialog(w).exists()).toBe(false);
    // the new task is selected
    expect(pointButton(w, "Plan sprint").attributes("aria-selected")).toBe(
      "true",
    );
    expect(toolbar(w).attributes("aria-label")).toBe("Task actions");
    expect(toolbar(w).text()).toContain("Plan sprint");
    w.unmount();
  });

  it("edits the selected task, keeping its other fields", async () => {
    const w = await mountBoard();
    await pointButton(w, "Write report,").trigger("click");
    expect(w.emitted("pointClick")).toEqual([[TASKS[0], 0]]);
    await toolbar(w).get('[data-action="edit"]').trigger("click");
    expect(dialog(w).text()).toContain("Edit task");
    expect(
      (
        dialog(w).get('input[aria-label="Task name"]')
          .element as HTMLInputElement
      ).value,
    ).toBe("Write report");
    await typeName(w, "Write the report");
    // the keyboard confirm key saves
    await dialog(w).get('input[aria-label="Task name"]').trigger("confirm");
    expect(lastPoints(w)).toEqual([
      { ...TASKS[0], label: "Write the report" },
      TASKS[1],
    ]);
    expect(dialog(w).exists()).toBe(false);

    // picking another quadrant moves the task to its center
    await toolbar(w).get('[data-action="edit"]').trigger("click");
    await dialog(w)
      .get('[role="radio"][aria-label="Bottom right quadrant"]')
      .trigger("click");
    await dialog(w).get('[data-action="save"]').trigger("click");
    expect(lastPoints(w)).toEqual([
      { ...TASKS[0], label: "Write the report", x: 7.5, y: 2.5 },
      TASKS[1],
    ]);
    w.unmount();
  });

  it("deletes the selected task after a confirmation", async () => {
    const w = await mountBoard();
    await pointButton(w, "Reply mail,").trigger("click");
    await toolbar(w).get('[data-action="delete"]').trigger("click");
    let confirm = w.get('[role="alertdialog"]');
    expect(confirm.text()).toContain("Reply mail");
    await confirm.get('[data-action="cancel"]').trigger("click");
    expect(w.find('[role="alertdialog"]').exists()).toBe(false);
    expect(w.emitted("pointsChange")).toBeUndefined();

    await toolbar(w).get('[data-action="delete"]').trigger("click");
    confirm = w.get('[role="alertdialog"]');
    expect(confirm.get('[data-action="confirm"]').text()).toBe("Delete");
    await confirm.get('[data-action="confirm"]').trigger("click");
    await flushPromises();
    expect(lastPoints(w)).toEqual([TASKS[0]]);
    expect(w.find('[role="alertdialog"]').exists()).toBe(false);
    expect(toolbar(w).exists()).toBe(false);
    w.unmount();
  });

  it("moves a task with the move to actions, updating x and y", async () => {
    const w = await mountBoard();
    await pointButton(w, "Write report, Move to Bottom left quadrant").trigger(
      "click",
    );
    expect(lastPoints(w)).toEqual([{ ...TASKS[0], x: 2.5, y: 2.5 }, TASKS[1]]);
    expect(toolbar(w).text()).toContain("Write report");
    w.unmount();
  });

  it("uses the label overrides and a controlled selection", async () => {
    const w = await mountBoard({
      selectedIndex: 1,
      labels: { edit: "Rename", actions: "Card" },
    });
    expect(toolbar(w).attributes("aria-label")).toBe("Card");
    expect(toolbar(w).text()).toContain("Reply mail");
    await toolbar(w).get('[data-action="edit"]').trigger("click");
    expect(dialog(w).text()).toContain("Rename");
    w.unmount();
  });
});
