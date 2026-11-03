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
    // in the document: the name field of a panel gets the focus
    attachTo: document.body,
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
    expect(headers[0]!.text()).toBe("Q1Do first1");
    expect(headers[1]!.text()).toBe("Top right quadrant0");
    // compact pills styled by the shared stylesheet (no inline layout)
    expect(
      w.get(".mn-quadrant-task-board__quadrants").attributes("style"),
    ).toBeUndefined();
    for (const header of headers) {
      expect(header.attributes("style")).toBeUndefined();
      expect(header.attributes("role")).toBe("group");
      expect(
        header.get(".mn-quadrant-task-board__title").attributes("style"),
      ).toBeUndefined();
    }
    expect(headers[0]!.attributes("aria-label")).toBe("Do first");
    expect(headers[0]!.get(".mn-quadrant-task-board__badge").text()).toBe("Q1");
    expect(headers[0]!.get(".mn-quadrant-task-board__count").text()).toBe("1");
    const add = headers[0]!.get("button");
    expect(add.attributes("aria-label")).toBe("Add task · Do first");
    // a plus icon image, not a "+" glyph
    expect(add.text()).not.toContain("+");
    const src = add
      .get("img.mn-quadrant-task-board__add-icon")
      .attributes("src")!;
    expect(src).toMatch(/^data:image\/svg\+xml;base64,/);
    const svg = atob(src.split(",")[1]!);
    expect(svg).toContain("<svg");
    expect(svg).toContain('d="M12 5v14M5 12h14"');
    expect(toolbar(w).exists()).toBe(false);
    await w.setProps({ showCounts: false });
    expect(w.find(".mn-quadrant-task-board__count").exists()).toBe(false);
    w.unmount();
  });

  it("adds a task in an inline panel: cancel leaves the data, save appends it", async () => {
    const w = await mountBoard();
    const add = (corner = "Top right quadrant") =>
      w.get(`button[aria-label="Add task · ${corner}"]`).trigger("click");
    await add();
    expect(dialog(w).text()).toContain("Add task");
    // inline in the board, right below the headers: no modal
    const panel = dialog(w);
    expect(panel.classes()).toEqual(
      expect.arrayContaining([
        "mn-quadrant-task-board__panel",
        "mn-quadrant-task-board__panel--add",
        "mn-quadrant-task-board__panel--caret-end",
      ]),
    );
    expect(panel.attributes("data-quadrant-task-panel")).toBe("add");
    expect(
      w.get(".mn-quadrant-task-board__quadrants").element.nextElementSibling,
    ).toBe(panel.element);
    expect(document.querySelector(".mn-modal, .mn-overlay-mask")).toBeNull();
    expect(w.find(".mn-modal").exists()).toBe(false);
    await flushPromises();
    expect(document.activeElement).toBe(
      panel.get('input[aria-label="Task name"]').element,
    );
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

    // the quadrant chips pick where the task goes
    await add("Top left quadrant");
    expect(dialog(w).classes()).toContain(
      "mn-quadrant-task-board__panel--caret-start",
    );
    await typeName(w, "Later");
    const chip = () =>
      dialog(w).get('[role="radio"][aria-label="Bottom right quadrant"]');
    await chip().trigger("click");
    expect(chip().attributes("aria-checked")).toBe("true");
    expect(chip().classes()).toContain("mn-quadrant-task-board__chip--checked");
    await save().trigger("click");
    expect(lastPoints(w)?.at(-1)).toEqual({ x: 7.5, y: 2.5, label: "Later" });
    expect(dialog(w).exists()).toBe(false);
    // the new task is selected
    expect(pointButton(w, "Later").attributes("aria-selected")).toBe("true");
    expect(toolbar(w).attributes("aria-label")).toBe("Task actions");
    expect(toolbar(w).text()).toContain("Later");
    w.unmount();
  });

  it("edits the selected task, keeping its other fields", async () => {
    const w = await mountBoard();
    await pointButton(w, "Write report,").trigger("click");
    expect(w.emitted("pointClick")).toEqual([[TASKS[0], 0]]);
    await toolbar(w).get('[data-action="edit"]').trigger("click");
    expect(dialog(w).text()).toContain("Edit task");
    // inline, right below the actions, the caret at Edit
    expect(dialog(w).attributes("data-quadrant-task-panel")).toBe("edit");
    expect(dialog(w).classes()).toContain(
      "mn-quadrant-task-board__panel--caret-edit",
    );
    expect(toolbar(w).element.nextElementSibling).toBe(dialog(w).element);
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
    expect(confirm.attributes("data-quadrant-task-panel")).toBe("delete");
    expect(confirm.classes()).toContain(
      "mn-quadrant-task-board__panel--caret-delete",
    );
    expect(toolbar(w).element.nextElementSibling).toBe(confirm.element);
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

  it("opening another panel replaces the open one", async () => {
    const w = await mountBoard();
    await w
      .get('button[aria-label="Add task · Top left quadrant"]')
      .trigger("click");
    expect(dialog(w).exists()).toBe(true);
    // a tap on a task closes it, like a press outside a popover
    await pointButton(w, "Reply mail,").trigger("click");
    expect(dialog(w).exists()).toBe(false);
    await toolbar(w).get('[data-action="edit"]').trigger("click");
    await toolbar(w).get('[data-action="delete"]').trigger("click");
    expect(dialog(w).exists()).toBe(false);
    expect(w.find('[role="alertdialog"]').exists()).toBe(true);
    expect(w.findAll(".mn-quadrant-task-board__panel")).toHaveLength(1);
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
